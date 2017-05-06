import _ from "l10n";
import Api from "common/server/Api";
import Loader from "common/components/Loader";

import NavButton from "./NavButton";

import ScoresTab from "./ScoresTab";
import HeatsTab from "./HeatsTab";
import TourResultsTab from "./TourResultsTab";
import DisciplineResultsTab from "./DisciplineResultsTab";

import ScoresTabButtons from "./ScoresTab/Buttons";
import HeatsTabButtons from "./HeatsTab/Buttons";
import TourResultsTabButtons from "./TourResultsTab/Buttons";
import DisciplineResultsTabButtons from "./DisciplineResultsTab/Buttons";

import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

export default class TourPanel extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            discipline: PT.shape({
                name: PT.string.isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
        };
    }

    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
            page: this.getPageFromHash(),
        };
    }

    componentWillMount() {
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.tour.id !== next_props.tour.id) {
            this.setState({
                tour: null,
                page: this.getDefaultPage(next_props.tour),
            });
            this.freeStorage(this.props.tour.id);
            this.setupStorage(next_props.tour.id);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.tour.id !== this.props.tour.id) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
            discipline: {
                competition: {},
                discipline_judges: {
                    judge: {},
                },
            },
            results: {},
            runs: {
                acrobatics: {},
                scores: {},
                participant: {
                    programs: {},
                    club: {},
                },
            },
        };
    }

    setupStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tour.id;
        }
        this.storage = storage.getDomain(`juding_scores_${tour_id}`);
    }
    freeStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tour.id;
        }
        storage.delDomain(`juding_scores_${tour_id}`);
    }

    reloadFromStorage = () => {
        const serialized = this.storage.get("Tour")
            .by_id(this.props.tour.id)
            .serialize(this.SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadData = () => {
        Api("tour.get", {
            tour_id: this.props.tour.id,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.props.tour.id, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    getDefaultPage(tour) {
        return (tour && tour.finalized)
            ? "results-1"
            : "tour-admin";
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[2]) {
            return chunks[2];
        }
        return this.getDefaultPage(this.props.tour);
    }

    handlePageSwitch = (page) => {
        this.setState({ page });
    }

    makeBodyRef = (ref) => this._body = ref;

    handleSignal = (message) => {
        if (this._body) {
            this._body.handleSignal(message);
        }
    }

    renderNavButton(code) {
        return (
            <NavButton
                active={ this.state.page === code }
                label={ _(`admin.judging-tabs.${code}`) }
                mkey={ code }
                onPageSwitch={ this.handlePageSwitch }
            />
        );
    }
    renderButtons() {
        const props = {
            tour: this.props.tour,
            onSignal: this.handleSignal,
        };
        switch (this.state.page) {
        case "tour-admin":
            return (
                <ScoresTabButtons { ...props } />
            );
        case "heats":
            return (
                <HeatsTabButtons { ...props } />
            )
        case "results-1":
        case "results-2":
        case "results-3":
            return (
                <TourResultsTabButtons { ...props } />
            );
        case "discipline-results":
            return (
                <DisciplineResultsTabButtons { ...props } />
            );
        default:
            console.error("Unknown page:", this.state.page);
        }
    }
    renderHeader() {
        return (
            <header>
                <div className="controls">
                    { this.renderButtons(this.props.tour) }
                </div>
                <h1>
                    { this.props.discipline.name }
                </h1>
                <h2>
                    { this.props.tour.name }
                </h2>
                <div className="clearfix" />
                <nav>
                    { this.renderNavButton("tour-admin") }
                    { this.renderNavButton("heats") }
                    { this.renderNavButton("results-1") }
                    { this.renderNavButton("results-2") }
                    { this.renderNavButton("results-3") }
                    { this.renderNavButton("discipline-results") }
                </nav>
                <div className="clearfix" />
            </header>
        );
    }
    renderBody() {
        const props = {
            tour: this.state.tour,
            ref: this.makeBodyRef,
            onPageSwitch: this.handlePageSwitch,
        };
        switch (this.state.page) {
        case "tour-admin":
            return <ScoresTab { ...props } />
        case "heats":
            return <HeatsTab { ...props } />
        case "results-1":
            return <TourResultsTab verbosity={ 1 } { ...props } />
        case "results-2":
            return <TourResultsTab verbosity={ 2 } { ...props } />
        case "results-3":
            return <TourResultsTab verbosity={ 3 } { ...props } />
        case "discipline-results":
            return (
                <DisciplineResultsTab
                    discipline={ this.props.discipline }
                    ref={ this.makeBodyRef }
                />
            );
        default:
            console.error("Unknown page:", this.state.page);
        }
    }
    render() {
        if (this.state.tour === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="TourPanel">
                { this.renderHeader() }
                <div className="body">
                    { this.renderBody() }
                </div>
            </div>
        );
    }
}

TourPanel.displayName = "AdminPanel_Judging_TourPanel";
