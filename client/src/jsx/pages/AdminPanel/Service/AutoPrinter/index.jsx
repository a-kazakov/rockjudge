import { saveAs } from "file-saver";

import _ from "l10n";
import LoadingComponent from "common/server/LoadingComponent";
import Loader from "common/components/Loader";
import showConfirm from "common/dialogs/showConfirm";

import JobQueue from "./JobQueue";
import Table from "./Table";

export default class AutoPrinter extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
        };
    }

    CLASS_ID = "auto_printer";
    API_MODELS = {
        competition: {
            model_type: "Competition",
            model_id_getter: props => props.competitionId,
            schema: {
                disciplines: {
                    tours: {},
                },
            },
        },
    };

    constructor(props) {
        super(props);
        const old_actions_str = localStorage.getItem(`auto_printer_${this.props.competitionId}`);
        const initial_actions = old_actions_str ? JSON.parse(old_actions_str) : {};
        this.state = {
            competition: null,
            actions: initial_actions,
        };
        this.POSSIBLE_ACTIONS = ["heats", "results_1", "results_2", "results_3", "discipline_results"];
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.competition && nextState.competition) {
            this.dispatchCompetitionUpdate(this.state.competition, nextState.competition);
        }
    }

    makeQueueRef = (ref) => this._queue = ref;

    handleActionsChange = (actions) => {
        localStorage.setItem(`auto_printer_${this.props.competitionId}`, JSON.stringify(actions));
        this.setState({ actions });
    };

    handlePrintTestPage = () => {
        showConfirm(
            _("admin.auto_printer.confirm_print_test_page"),
            () => {
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${Math.random()}.tmp`);
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${Math.random()}.tmp`);
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${Math.random()}.tmp`);
                this._queue.addJob("test", null, 1);
            }
        );
    };

    handlePrintFirstToursHeats = () => {
        showConfirm(
            _("admin.auto_printer.confirm_print_first_tours_heats"),
            this.printFirstToursHeats
        );
    };

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

    doTheJob(tour, action_type, copies, submit=true) {
        if (!tour) {
            return;
        }
        this._queue.addJob(action_type, tour, copies, submit);
    }
    doActionsForTour(tour) {
        const actions = this.state.actions[tour.id];
        const next_tour = this.getNextTour(tour);
        const next_tour_actions = next_tour !== null ? this.state.actions[next_tour.id] : null;
        for (const action_type of this.POSSIBLE_ACTIONS) {
            const action_tour = action_type === "heats" ? next_tour : tour;
            const actions_row = action_type === "heats" ? next_tour_actions : actions;
            if (actions_row && actions_row[action_type]) {
                this.doTheJob(action_tour, action_type, actions_row[action_type], false);
            }
        }
        this._queue.submitJobs();
    }

    printFirstToursHeats = () => {
        for (const discipline of this.state.competition.disciplines) {
            let tour = Object.assign({}, discipline.tours[0]);
            tour.discipline = discipline;
            if (!tour || !this.state.actions[tour.id] || !this.state.actions[tour.id]["heats"]) {
                continue;
            }
            this.doTheJob(tour, "heats", this.state.actions[tour.id]["heats"], false);
        }
        this._queue.submitJobs();
    };

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
