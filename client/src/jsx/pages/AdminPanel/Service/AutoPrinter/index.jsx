import { saveAs } from "file-saver";

import _ from "l10n";
import Api from "common/server/Api";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";
import Loader from "common/components/Loader";
import showConfirm from "common/dialogs/showConfirm";

import JobQueue from "./JobQueue";
import Table from "./Table";

export default class AutoPrinter extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        const old_actions_str = localStorage.getItem(`auto_printer_${this.props.competitionId}`);
        const initial_actions = old_actions_str ? JSON.parse(old_actions_str) : {};
        this.state = {
            competition: null,
            actions: initial_actions,
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
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.reload_data_listener = message_dispatcher.addListener("reload_data", this.loadData);
    }
    componentDidUpdate() {
        localStorage.setItem(`auto_printer_${this.props.competitionId}`, JSON.stringify(this.state.actions));
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.reload_data_listener);
    }

    loadData = () => {
        Api("competition.get", {
            competition_id: this.props.competitionId,
            children: this.SCHEMA,
        })
            .addToDB("Competition", this.props.competitionId)
            .onSuccess(this.reloadFromStorage)
            .send();
    }
    reloadFromStorage = () => {
        const new_competition_ref = storage.get("Competition").by_id(this.props.competitionId);
        if (!new_competition_ref) {
            return;
        }
        const new_competition = new_competition_ref.serialize(this.SCHEMA);
        if (this.state.competition) {
            this.dispatchCompetitionUpdate(this.state.competition, new_competition);
        }
        this.setState({
            competition: new_competition,
        });
    }

    makeQueueRef = (ref) => this._queue = ref;

    handleActionsChange = (actions) => this.setState({ actions });

    handlePrintTestPage = () => {
        showConfirm(
            _("admin.auto_printer.confirm_print_test_page"),
            () => {
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${Math.random()}.tmp`);
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${Math.random()}.tmp`);
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${Math.random()}.tmp`);
                this._queue.addJob("test", null, 1);
            },
            true
        );
    }
    handlePrintFirstToursHeats = () =>
        showConfirm(
            _("admin.auto_printer.confirm_print_first_tours_heats"),
            this.printFirstToursHeats,
            true
        );

    getToursFromCompetition(competition) {
        let result = [];
        for (const discipline of competition.disciplines) {
            for (const tour of discipline.tours) {
                let r = Object.assign({}, tour);
                r.discipline = discipline;
                result.push(r);
            }
        }
        return result;
    }
    getToursMap(competition) {
        return new Map(this.getToursFromCompetition(competition).map(tour => [tour.id, tour]));
    }
    dispatchCompetitionUpdate(old_competition, new_competition) {
        let old_tours = this.getToursMap(old_competition);
        let new_tours = this.getToursMap(new_competition);
        for (const tour_id of old_tours.keys()) {
            if (!new_tours.has(tour_id)) {
                return;
            }
            if (!old_tours.get(tour_id).finalized && new_tours.get(tour_id).finalized) {
                this.doActionsForTour(new_tours.get(tour_id));
            }
        }
    }
    getNextTour(tour) {
        const tours = this.getToursFromCompetition(this.state.competition);
        const current_idx = tours.findIndex(t => t.id === tour.id);
        const next_idx = current_idx + 1;
        if (!tours[next_idx]) {
            return null;
        }
        if (tours[current_idx].discipline.id !== tours[next_idx].discipline.id) {
            return null;
        }
        return tours[next_idx];
    }

    doTheJob(tour, action_type, copies) {
        if (!tour) {
            return;
        }
        this._queue.addJob(action_type, tour, copies);
    }
    doActionsForTour(tour) {
        const actions = this.state.actions[tour.id];
        const next_tour = this.getNextTour(tour);
        const next_tour_actions = next_tour !== null ? this.state.actions[next_tour.id] : null;
        for (const action_type of this.POSSIBLE_ACTIONS) {
            const action_tour = action_type === "heats" ? next_tour : tour;
            const actions_row = action_type === "heats" ? next_tour_actions : actions;
            if (actions_row && actions_row[action_type]) {
                this.doTheJob(action_tour, action_type, actions_row[action_type]);
            }
        }
    }

    printFirstToursHeats = () => {
        for (const discipline of this.state.competition.disciplines) {
            let tour = Object.assign({}, discipline.tours[0]);
            tour.discipline = discipline;
            if (!tour || !this.state.actions[tour.id] || !this.state.actions[tour.id]["heats"]) {
                continue;
            }
            this.doTheJob(tour, "heats", this.state.actions[tour.id]["heats"]);
        }
    }

    render() {
        if (!this.state.competition) {
            return (
                <Loader />
            );
        }
        return (
            <div className="AutoPrinter">
                <header>
                    <h1>
                        { _("admin.headers.auto_printer") }
                    </h1>
                </header>
                <div className="body">
                    <div className="section-table">
                        <h3>
                            { _("admin.auto_printer.rules") }
                        </h3>
                        <Table
                            actions={ this.state.actions }
                            possibleActions={ this.POSSIBLE_ACTIONS }
                            tours={ this.getToursFromCompetition(this.state.competition) }
                            onChange={ this.handleActionsChange }
                        />
                    </div>
                    <div className="section-queue">
                        <h3>
                            { _("admin.auto_printer.queue") }
                        </h3>
                        <JobQueue ref={ this.makeQueueRef } />
                        <div className="actions">
                            <button
                                type="button"
                                onClick={ this.handlePrintTestPage }
                            >
                                { _("admin.auto_printer.print_test_page") }
                            </button>
                            <button
                                type="button"
                                onClick={ this.handlePrintFirstToursHeats }
                            >
                                { _("admin.auto_printer.print_fitst_tours_heats") }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AutoPrinter.displayName = "AdminPanel_Service_AutoPrinter";
