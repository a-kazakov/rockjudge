import { _ } from "i10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";
import { showConfirm } from "ui/dialogs";
import { clone } from "common/tools";
import { Docx } from "common/docx";
import { HeatsBody } from "../judging/heats";
import { TourResultsBody } from "../judging/tour_results";
import { DisciplineResults } from "../judging/discipline_results";


class AutoPrinterTableCell extends React.Component {
    render() {
        return <td className="input">
            <input
                type="text"
                value={ this.props.value }
                onChange={ (e) => this.props.onChange(parseInt(e.target.value.replace(/[^\d]/, "")) || 0) } />
        </td>
    }
}

class AutoPrinterTableRow extends React.Component {
    onChange(action, new_value) {
        let new_row = clone(this.props.row);
        new_row[action] = new_value;
        this.props.onChange(new_row);
    }
    render() {
        return <tr>
            <td className="discipline">{ `${this.props.tour.discipline.name} — ${this.props.tour.name}` }</td>
            { this.props.possibleActions.map((action) =>
                <AutoPrinterTableCell
                    key={ action }
                    value={ this.props.row[action] || "" }
                    onChange={ this.onChange.bind(this, action) } />
            ) }
        </tr>
    }
}

class AutoPrinterTable extends React.Component {
    onChange(tour_id, new_value) {
        let new_actions = clone(this.props.actions);
        new_actions[tour_id] = new_value;
        this.props.onChange(new_actions);
    }
    render() {
        return <table className="tours-table"><tbody>
            <tr>
                <th className="discipline">{ _("admin.auto_printer.discipline") }</th>
                <th>{ _("admin.auto_printer.heats") }</th>
                <th>{ _("admin.auto_printer.results_1") }</th>
                <th>{ _("admin.auto_printer.results_2") }</th>
                <th>{ _("admin.auto_printer.results_3") }</th>
                <th>{ _("admin.auto_printer.discipline_results") }</th>
            </tr>
            { this.props.tours.map((tour) =>
                <AutoPrinterTableRow
                    key={ tour.id }
                    tour={ tour }
                    row={ this.props.actions[tour.id] || {} }
                    possibleActions={ this.props.possibleActions }
                    onChange={ this.onChange.bind(this, tour.id) } />
            ) }
        </tbody></table>
    }
}

class AutoPrinterJobQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            nowRendering: null,
        };
        this.scheduleJob();
    }
    addJob(job_type, tour, copies) {
        let new_queue = clone(this.state.queue);
        new_queue.push({
            type: job_type,
            tour: tour,
            copies: copies,
            id: Math.random(),
        });
        this.setState({
            queue: new_queue,
        });
    }
    scheduleJob() {
        setTimeout(() => this.processJob(), 1000);
    }
    processJob() {
        if (this.state.nowRendering) {
            return;
        }
        let job = this.state.queue[0];
        if (!job) {
            this.scheduleJob();
            return;
        }
        this.timer = setTimeout(this.retryJob.bind(this), 10000);
        this.setState({
            queue: this.state.queue.slice(1),
            nowRendering: job,
        });
    }
    retryJob() {
        this.setState({
            queue: [this.state.nowRendering].concat(this.state.queue),
            nowRendering: null,
        });
        this.scheduleJob();
    }
    continueJob(filename) {
        clearTimeout(this.timer);
        setTimeout(() => {
            let job = this.state.nowRendering;
            let xhr = new XMLHttpRequest();
            let address = `http://127.0.0.1:5949/print-docx?filename=${ filename }&copies=${ job.copies }`;
            xhr.open("GET", address, true);
            xhr.onload = () => {};
            xhr.onerror = () => this.addJob(job.type, job.tour, job.copies);
            xhr.send();
            this.setState({
                nowRendering: null,
            });
            this.scheduleJob();
        }, 1000);
    }
    createFilename() {
        return Math.random().toString().replace(/[^0-9]/, "") + ".tmp";
    }
    renderActiveJob() {
        if (!this.state.nowRendering) {
            return null;
        }
        switch (this.state.nowRendering.type) {
        case "heats":
            return <HeatsBody
                tour_id={ this.state.nowRendering.tour.id}
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "results_1":
            return <TourResultsBody
                tour_id={ this.state.nowRendering.tour.id}
                verbosity="1"
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "results_2":
            return <TourResultsBody
                tour_id={ this.state.nowRendering.tour.id}
                verbosity="2"
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "results_3":
            return <TourResultsBody
                tour_id={ this.state.nowRendering.tour.id}
                verbosity="3"
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "discipline_results":
            return <DisciplineResults
                discipline_id={ this.state.nowRendering.tour.discipline.id }
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "test":
            return <AutoPrinterTestPage
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        default:
            console.error("Invalid job type:", this.state.nowRendering.type);
        }
        return null;
    }
    render() {
        if (this.state.queue.length === 0) {
            return <div className="queue queue-empty">
                { _("admin.auto_printer.queue_empty") }
                <div className="hidden-container">
                    { this.renderActiveJob() }
                </div>
            </div>
        }
        return <div className="queue">
            { this.state.queue.map((item) =>
                <div className="row" key={ item.id }>
                    <div className="name">
                        { item.type === "test"
                            ? _("admin.auto_printer.test_page")
                            : `${item.tour.discipline.name} — ${item.tour.name}` }
                    </div>
                    <div className="type">
                        { _("admin.auto_printer." + item.type) }
                    </div>
                    <div className="copies">
                        { item.copies }
                    </div>
                </div>
            ) }
            <div className="hidden-container">
                { this.renderActiveJob() }
            </div>
        </div>
    }
}

export class AutoPrinter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: null,
            actions: {},
        };
        this.SCHEMA = {
            disciplines: {
                tours: {},
            },
        };
        this.POSSIBLE_ACTIONS = ["heats", "results_1", "results_2", "results_3", "discipline_results"];
    }
    componentWillMount() {
        this.loadData();
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.reload_data_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.reload_data_listener);
    }
    loadData() {
        Api("competition.get", { competition_id: this.props.competition_id, children: this.SCHEMA })
            .addToDB("Competition", this.props.competition_id)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }
    reloadFromStorage() {
        let new_competition = storage.get("Competition").by_id(this.props.competition_id);
        if (!new_competition) {
            return;
        }
        new_competition = new_competition.serialize(this.SCHEMA);
        if (this.state.competition) {
            this.dispatchCompetitionUpdate(this.state.competition, new_competition);
        }
        this.setState({
            competition: new_competition,
        });
    }
    printTestPage() {
        showConfirm(_("admin.auto_printer.print_test_page"), () => {
            saveAs(new Blob(["dummy"], {type : 'text/plain'}), `dummy_${Math.random()}.tmp`);
            saveAs(new Blob(["dummy"], {type : 'text/plain'}), `dummy_${Math.random()}.tmp`);
            saveAs(new Blob(["dummy"], {type : 'text/plain'}), `dummy_${Math.random()}.tmp`);
            this.refs.queue.addJob("test", null, 1);
        }, true);
    }
    getToursFromCompetition(competition) {
        let result = [];
        competition.disciplines.forEach((discipline) =>
            discipline.tours.forEach((tour) => {
                let r = clone(tour);
                r.discipline = discipline;
                result.push(r);
            } )
        )
        return result;
    }
    getToursMap(tours) {
        let result = {};
        tours.forEach((tour) => result[tour.id] = tour);
        return result;
    }
    dispatchCompetitionUpdate(old_competition, new_competition) {
        let old_tours = this.getToursMap(this.getToursFromCompetition(old_competition));
        let new_tours = this.getToursMap(this.getToursFromCompetition(new_competition));
        Object.keys(old_tours).forEach((tour_id) => {
            if (!new_tours[tour_id]) {
                return;
            }
            if (!old_tours[tour_id].finalized && new_tours[tour_id].finalized) {
                this.doActionsForTour(new_tours[tour_id]);
            }
        });
    }
    getNextTour(tour) {
        let result = null;
        this.state.competition.disciplines.forEach((discipline) => {
            let found = false;
            discipline.tours.forEach((d_tour) => {
                if (d_tour.id === tour.id) {
                    found = true;
                } else if (found) {
                    let r = clone(d_tour);
                    r.discipline = discipline;
                    result = r;
                    found = false;
                }
            } )
        } )
        return result;
    }
    doTheJob(tour, action_type, copies) {
        if (action_type === "heats") {
            tour = this.getNextTour(tour);
        }
        if (!tour) {
            return;
        }
        this.refs.queue.addJob(action_type, tour, copies);
    }
    doActionsForTour(tour) {
        let actions = this.state.actions[tour.id];
        if (!actions) {
            return;
        }
        this.POSSIBLE_ACTIONS.forEach((action_type) => {
            if (actions[action_type]) {
                this.doTheJob(tour, action_type, actions[action_type]);
            }
        } );
    }
    render() {
        if (!this.state.competition) {
            return <Loader />
        }
        return <div className="auto-printer">
            <header>
                <h1>{ _("admin.headers.auto_printer") }</h1>
            </header>
            <div>
                <div className="section-table">
                    <h3>{ _("admin.auto_printer.rules") }</h3>
                    <AutoPrinterTable
                        tours={ this.getToursFromCompetition(this.state.competition) }
                        actions={ this.state.actions }
                        onChange={ (new_actions) => this.setState({ actions: new_actions }) }
                        possibleActions={ this.POSSIBLE_ACTIONS } />
                </div>
                <div className="section-queue">
                    <h3>{ _("admin.auto_printer.queue") }</h3>
                    <AutoPrinterJobQueue ref="queue" />
                    <div className="test-page-button">
                        <button type="button" onClick={ this.printTestPage.bind(this) } className="btn btn-primary">
                            Печать тестовой страницы
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}

class AutoPrinterTestPage extends React.Component {
    componentDidMount() {
        this.createDocx(this.props.autoDocx.filename);
        this.props.autoDocx.callback(this.props.autoDocx.filename);
    }
    render() {  // eslint-disable-line react/sort-comp
        return <div ref="content">
            <p>{ _("admin.auto_printer.test_text") }</p>
        </div>
    }
    createDocx(filename="tour-results.docx") {
        Docx(filename)
            .setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML)
            .save();
    }
}
