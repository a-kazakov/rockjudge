import "babel-polyfill";

import { _ } from "i10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";
import { onTouchOrClick } from "ui/tablet_components";
import { DisciplineResults } from "admin/judging/discipline_results";


class PresenterTabletLeftBar extends React.Component {
    static get propTypes() {
        return {
            active: React.PropTypes.oneOf(["info", "plan", "heats", "results"]).isRequired,
            onPageSwitch: React.PropTypes.func.isRequired,
        };
    }
    render() {
        return <div className="left-bar">
            <div className={ "item" + (this.props.active === "info" ? " active" : "") }
                 { ...onTouchOrClick(() => this.props.onPageSwitch("info")) }>
                <span>{ _("presenter.headers.info") }</span>
            </div>
            <div className={ "item" + (this.props.active === "plan" ? " active" : "") }
                 { ...onTouchOrClick(() => this.props.onPageSwitch("plan")) }>
                <span>{ _("presenter.headers.plan") }</span>
            </div>
            <div className={ "item" + (this.props.active === "heats" ? " active" : "") }
                 { ...onTouchOrClick(() => this.props.onPageSwitch("heats")) }>
                <span>{ _("presenter.headers.heats") }</span>
            </div>
            <div className={ "item" + (this.props.active === "results" ? " active" : "") }
                 { ...onTouchOrClick(() => this.props.onPageSwitch("results")) }>
                <span>{ _("presenter.headers.results") }</span>
            </div>
        </div>
    }
}

class PresenterTabletInfoCompetitionInfo extends React.Component {
    static get propTypes() {
        return {
            competition: React.PropTypes.object.isRequired,
        };
    }
    renderRow(row, idx) {
        return <tr key={ idx }>
            <th>{ row[0] }</th>
            <td>{ row[1] }</td>
        </tr>
    }
    render() {
        return <table className="competition-info"><tbody>
            { this.props.competition.info.map(this.renderRow.bind(this)) }
        </tbody></table>
    }
}

class PresenterTabletInfoJudges extends React.Component {
    static get propTypes() {
        return {
            judges: React.PropTypes.array.isRequired,
        };
    }
    renderRow(judge) {
        return <tr key={ judge.id }>
            <th>{ judge.role_description || _("global.phrases.judge_n", judge.number) }</th>
            <td>{ judge.name } &mdash; { judge.category }</td>
        </tr>
    }
    render() {
        return <table className="judges"><tbody>
            { this.props.judges.map(this.renderRow.bind(this)) }
        </tbody></table>
    }
}

class PresenterTabletInfoClubs extends React.Component {
    static get propTypes() {
        return {
            clubs: React.PropTypes.array.isRequired,
        };
    }
    renderRow(city) {
        return <tr key={ city.name }>
            <th>{ city.name }</th>
            <td>{ city.clubs.map((club) => <div key={ club.id }>{ club.name }</div>) }</td>
        </tr>
    }
    regroupClubs() {
        let cities = {};
        this.props.clubs.forEach((club) => {
            if (!cities[club.city]) {
                cities[club.city] = [];
            }
            cities[club.city].push(club);
        })
        return Object.keys(cities).map((city) => ({
            name: city,
            clubs: cities[city],
        }));
    }
    render() {
        return <table className="judges"><tbody>
            { this.regroupClubs().map(this.renderRow.bind(this)) }
        </tbody></table>
    }
}

class PresenterTabletInfo extends React.Component {
    static get propTypes() {
        return {
            competition: React.PropTypes.object.isRequired,
        };
    }
    render() {
        return (
            <div className="info">
                <h2>{ this.props.competition.name }</h2>
                <PresenterTabletInfoCompetitionInfo competition={ this.props.competition } />
                <h3>{ _("presenter.headers.judges") }</h3>
                <PresenterTabletInfoJudges judges={ this.props.competition.judges } />
                <h3>{ _("presenter.headers.clubs") }</h3>
                <PresenterTabletInfoClubs clubs={ this.props.competition.clubs } />
            </div>
        );
    }
}

class PresenterTabletPlanItem extends React.Component {
    makeRef = (ref) => {
        if (this._scrolled || !ref) {
            return;
        }
        this._scrolled = true;
        const tour = this.props.tours.get(this.props.item.tour_id);
        if (tour.tour.active) {
            ref.scrollIntoView();
        }
    }
    renderVerbose() {
        return (
            <tr>
                <td className="estimated-beginning">
                    { this.props.item.estimated_beginning }
                </td>
                <td className="verbose-name" colSpan="2">
                    { this.props.item.verbose_name }
                </td>
                <td className="estimated-duration">
                    { this.props.item.estimated_duration }
                </td>
            </tr>
        );
    }
    renderNormal() {
        if (this.props.item.tour_id === null) {
            return this.renderVerbose();
        }
        const tour = this.props.tours.get(this.props.item.tour_id);
        const class_name =
            tour.tour.finalized ? "finalized" :
            tour.tour.active ? "active" : "";
        return (
            <tr className={ class_name } ref={ this.makeRef }>
                <td className="estimated-beginning">
                    { this.props.item.estimated_beginning }
                </td>
                <td className="discipline">
                    { tour.discipline.name }
                </td>
                <td className="tour">
                    { tour.tour.name }
                </td>
                <td className="estimated-duration">
                    { this.props.item.estimated_duration }
                </td>
            </tr>
        );
    }
    render() {
        return this.props.item.verbose_name !== ""
            ? this.renderVerbose()
            : this.renderNormal();
    }
}

class PresenterTabletPlan extends React.Component {
    static get propTypes() {
        return {
            competition: React.PropTypes.object.isRequired,
        };
    }
    componentWillReceiveProps(next_props) {
        this._tours = null;
    }
    get tours() {
        if (!this._tours) {
            this._tours = new Map();
            for (let discipline of this.props.competition.disciplines) {
                for (let tour of discipline.tours) {
                    this._tours.set(tour.id, {
                        discipline: discipline,
                        tour: tour,
                    });
                }
            }
        }
        return this._tours;
    }
    renderItems() {
        return this.props.competition.plan.map(item =>
            <PresenterTabletPlanItem
                key={ item.id }
                item={ item }
                tours={ this.tours } />
        )
    }
    render() {
        return (
            <div className="plan">
                <table><tbody>
                    <tr>
                        <th className="estimated-beginning">
                            { _("presenter.labels.estimated_beginning") }
                        </th>
                        <th className="discipline">
                            { _("presenter.labels.discipline") }
                        </th>
                        <th className="tour">
                            { _("presenter.labels.tour") }
                        </th>
                        <th className="estimated-duration">
                            { _("presenter.labels.estimated_duration") }
                        </th>
                    </tr>
                    { this.renderItems() }
                </tbody></table>
            </div>
        );
    }
}

class PresenterTabletHeats extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
        this.listeners = [];
    }
    componentDidMount() {
        this.storage = storage.getDomain("heats");
        this.addListener("db_update", this.reloadFromStorage.bind(this));
        this.addListener("reload_data", this.loadData.bind(this));
        this.addListener("active_tour_update", this.dispatchActiveTourUpdate.bind(this));
        this.loadData();
    }
    componentWillUnmount() {
        for (let listener_id of this.listeners) {
            message_dispatcher.removeListener(listener_id);
        }
        storage.delDomain("heats");
    }
    addListener(event, dispatcher) {
        const listener_id = message_dispatcher.addListener(event, dispatcher);
        this.listeners.push(listener_id);
    }
    reloadFromStorage() {
        const active_tour_id = this.props.active_tour_id;
        if (active_tour_id === null) {
            this.setState({
                tour: null,
            });
            return;
        }
        const active_tour_model = this.storage.get("Tour").by_id(active_tour_id);
        if (!active_tour_model) {
            this.setState({
                tour: null,
            });
            return;
        }
        this.setState({
            tour: active_tour_model.serialize({
                runs: {
                    participant: {
                        "club": {},
                        "sportsmen": {},
                    },
                },
                discipline: {},
            }),
        })
    }
    loadData() {
        Api("tour.find_active", {}).onSuccess(response => {
            this.dispatchActiveTourUpdate(response);
        }).send();
    }

    // Dispatchers

    dispatchActiveTourUpdate(response) {
        const tour_id = response.tour_id;
        if ((this.state.tour === null && tour_id === null) || (this.state.tour !== null && this.state.tour.id === tour_id)) {
            return;
        }
        this.props.updateActiveTour(tour_id);
        if (tour_id === null) {
            storage.delDomain("heats");
            this.storage = storage.getDomain("heats");
            this.setState({
                tour: null,
            });
            return;
        }
        Api("tour.get", { tour_id: tour_id, children:{
            runs: {
                participant: {
                    "club": {},
                },
            },
            discipline: {},
        }})
            .addToDB("Tour", tour_id, this.storage)
            .onSuccess(() => {
                this.reloadFromStorage(tour_id);
            })
            .send();
    }

    // Actions

    toPrevHeat() {
        this.props.updateCurrentHeat(this.props.current_heat - 1);
    }
    toNextHeat() {
        this.props.updateCurrentHeat(this.props.current_heat + 1);
    }

    // Helpers

    getHeatsCount() {
        return Math.max(...this.state.tour.runs.map((run) => run.heat));
    }

    // Rendering

    renderHeader() {
        var btn_prev = null;
        var btn_next = null;
        if (this.state.tour !== null) {
            if (this.props.current_heat > 1) {
                btn_prev = <button className="btn btn-primary pull-left" {...onTouchOrClick(this.toPrevHeat.bind(this))}>
                    { _("tablet.buttons.prev_heat") }
                </button>;
            }
            if (this.props.current_heat < this.getHeatsCount()) {
                btn_next = <button className="btn btn-primary pull-right" {...onTouchOrClick(this.toNextHeat.bind(this))}>
                    { _("tablet.buttons.next_heat") }
                </button>;
            }
        }
        var current_tour = (this.state.tour === null) ? null :
            <div className="header">
                <h1>{ this.state.tour.discipline.name }</h1>
                <h2>{ this.state.tour.name }</h2>
            </div>
        return <header>
            { btn_prev }
            { btn_next }
            { current_tour }
        </header>
    }
    renderSplashScreen() {
        return <div className="splash-screen">
            <div>{ _("presenter.labels.no_active_tour") }</div>
            <div className="spacer"></div>
        </div>;
    }
    renderHeat() {
        let runs = this.state.tour.runs.filter((run) => run.heat === this.props.current_heat);
        return <div className="heat">
            <h3>{ _("tablet.headers.heat") }: { this.props.current_heat } / { this.getHeatsCount() }</h3>
            { runs.map((run) =>
                <table key={ run.id }><tbody>
                    <tr>
                        <td className="number" rowSpan="2">{ run.participant.number }</td>
                        <td className="name">{ run.participant.name }</td>
                    </tr><tr>
                        <td className="club">{ run.participant.club.name }, { run.participant.club.city }</td>
                    </tr>
                </tbody></table>
            ) }
            <div className="spacer"></div>
        </div>;
    }
    render() {
        if (this.state.judge === null) {
            return <Loader />
        }
        if (this.state.tour === null) {
            return <div className="heats">{ this.renderSplashScreen() }</div>;
        }
        return <div className="heats">
            { this.renderHeader() }
            { this.renderHeat() }
        </div>
    }
}

class PresenterTabletResultsDisciplineSelector extends React.Component {
    static get propTypes() {
        return {
            disciplines: React.PropTypes.array.isRequired,
            active: React.PropTypes.number.isRequired,
            onDisciplineChange: React.PropTypes.func.isRequired,
        };
    }
    render() {
        return <div className="disciplines">
            { this.props.disciplines.map((discipline) =>
                <div className={ "item" + (this.props.active === discipline.id ? " active" : "")}
                     key={ discipline.id }
                     {...onTouchOrClick(() => this.props.onDisciplineChange(discipline.id))}>
                    { discipline.name }
                </div>
            ) }
        </div>
    }
}

class PresenterTabletResults extends React.Component {
    static get propTypes() {
        return {
            competition: React.PropTypes.object.isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            active_discipline: null,
        }
    }
    render() {
        return <div className="results">
            <PresenterTabletResultsDisciplineSelector
                active={ this.state.active_discipline }
                disciplines={ this.props.competition.disciplines }
                onDisciplineChange={ (new_discipline) => this.setState({ active_discipline: new_discipline }) } />
            { this.state.active_discipline !== null
                ? <DisciplineResults discipline_id={ this.state.active_discipline }
                                     renderer="presenter"
                                     key={ this.state.active_discipline } />
                : <div className="discipline-results"></div> }
        </div>
    }
}

export class Presenter extends React.Component {
    static get propTypes() {
        return {
            competition_id: React.PropTypes.number.isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            page: "info",
            competition: null,
            current_heat: 1,
            active_tour_id: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        this.setState({
            "competition": storage.get("Competition")
                .by_id(this.props.competition_id)
                .serialize({
                    clubs: {},
                    disciplines: {
                        tours: {},
                    },
                    judges: {},
                    plan: {},
                }),
        });
    }
    loadData() {
        Api("competition.get", { competition_id: this.props.competition_id, children: {
            clubs: {},
            disciplines: {
                tours: {},
            },
            judges: {},
            plan: {},
        } })
            .addToDB("Competition", this.props.competition_id)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }
    updateActiveTour = (new_tour_id) => {
        if (this.state.active_tour_id !== new_tour_id) {
            this.setState({
                active_tour_id: new_tour_id,
                current_heat: 1,
            });
        }
    }
    updateCurrentHeat = (new_heat) => {
        this.setState({
            current_heat: new_heat,
        });
    }
    switchPage(new_page) {
        this.setState({
            page: new_page,
        });
    }
    renderBody() {
        if (this.state.competition === null) {
            return <Loader />
        }
        switch (this.state.page) {
        case "info":
            return <PresenterTabletInfo competition={ this.state.competition } />
        case "heats":
            return (
                <PresenterTabletHeats
                    current_heat={ this.state.current_heat }
                    active_tour_id={ this.state.active_tour_id }
                    updateCurrentHeat={ this.updateCurrentHeat }
                    updateActiveTour={ this.updateActiveTour } />
            );
        case "plan":
            return <PresenterTabletPlan competition={ this.state.competition } />
        case "results":
            return <PresenterTabletResults competition={ this.state.competition } />
        }
    }
    render() {
        return (
            <div className="presenter-tablet">
                <PresenterTabletLeftBar
                    active={ this.state.page }
                    onPageSwitch={ this.switchPage.bind(this) } />
                <div className="content">
                    { this.renderBody() }
                </div>
            </div>
        );
    }
}
