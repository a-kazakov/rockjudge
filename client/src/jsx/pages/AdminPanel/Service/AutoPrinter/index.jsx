import React from "react";

import Loader from "common/components/Loader";
import showConfirm from "common/dialogs/showConfirm";
import Storage from "common/server/Storage";
import CompetitionSubscription from "common/server/Storage/subscriptions/CompetitionSubscription";
import makeRandomString from "common/tools/makeRandomString";
import {saveAs} from "file-saver";
import _ from "l10n";
import PT from "prop-types";
import JobQueue from "./JobQueue";
import Table from "./Table";

export default class AutoPrinter extends React.Component {
    static propTypes = {
        competitionId: PT.number.isRequired,
    };
    static POSSIBLE_ACTIONS = ["heats", "results_1", "results_2", "results_3", "discipline_results"];

    static extractToursFromCompetition(competition) {
        return [].concat(...competition.disciplines.map(d => d.tours));
    }
    static getToursMapping(competition) {
        if (competition == null) {
            return null;
        }
        let result = new Map();
        for (const tour of this.extractToursFromCompetition(competition)) {
            result.set(tour.id, tour.finalized);
        }
        return result;
    }
    static getNewlyFinalizedTourIds(old_mapping, new_mapping) {
        if (old_mapping == null || new_mapping == null) {
            return [];
        }
        let result = [];
        for (const [tour_id, old_finalized] of old_mapping.entries()){
            const new_finalized = new_mapping.get(tour_id);
            if (!old_finalized && new_finalized) {
                result.push(tour_id);
            }
        }
        return result;
    }

    constructor(props) {
        super(props);
        const old_actions_str = localStorage.getItem(`auto_printer_${this.props.competitionId}`);
        const initial_actions = old_actions_str ? JSON.parse(old_actions_str) : {};
        this._tours_mapping = null;
        this.state = {
            actions: initial_actions,
            competitionStorage: null,
            toursStatuses: {},
        };
    }

    componentDidMount() {
        this._storage = new Storage();
        this._storage.init(this.reload).then(this.subscribe).catch(console.error.bind(console));
    }

    subscribe = () => {
        this._competition_subscription = new CompetitionSubscription(this.props.competitionId);
        this._storage.subscribe(this._competition_subscription)
            .then(this.updateCompetitionStorage)
            .catch(console.error.bind(console));
    };

    updateCompetitionStorage = (competitionStorage) => {
        this.setState({competitionStorage});
        this.checkForToursUpdates();
    };
    reload = () => {
        this.forceUpdate();
        this.checkForToursUpdates();
    };
    checkForToursUpdates() {
        const next_tours_mapping = this.constructor.getToursMapping(this.competition);
        const new_tours_ids = this.constructor.getNewlyFinalizedTourIds(this._tours_mapping, next_tours_mapping);
        for (const tour_id of new_tours_ids) {
            const tour = this.state.competitionStorage.get("Tour", tour_id);
            this.doActionsForTour(tour);
        }
        this._tours_mapping = next_tours_mapping;
    }

    get competition() {
        return this.state.competitionStorage?.get("Competition", this.props.competitionId) || null;
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
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${makeRandomString()}.tmp`);
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${makeRandomString()}.tmp`);
                saveAs(new Blob(["dummy"], {type : 'text/plain'}), `autoprinter_dummy_${makeRandomString()}.tmp`);
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

    handlePrintAllDocs = () => {
        showConfirm(
            _("admin.auto_printer.confirm_print_all_docs"),
            this.printAllDocs
        );
    };

    getNextTour(tour) {
        const all_tours = tour.discipline.tours;
        const idx = all_tours.indexOf(tour);
        const next_tour = all_tours[idx + 1];
        return next_tour || null;
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
        const next_tour_actions = next_tour != null ? this.state.actions[next_tour.id] : null;
        for (const action_type of this.constructor.POSSIBLE_ACTIONS) {
            const action_tour = action_type === "heats" ? next_tour : tour;
            const actions_row = action_type === "heats" ? next_tour_actions : actions;
            const count = actions_row?.[action_type];
            if (count) {
                this.doTheJob(action_tour, action_type, actions_row[action_type], false);
            }
        }
        this._queue.submitJobs();
    }

    printFirstToursHeats = () => {
        for (const discipline of this.competition.disciplines) {
            const tour = discipline.tours[0];
            const count = this.state.actions[tour.id]?.heats;
            if (!count) {
                continue;
            }
            this.doTheJob(tour, "heats", count, false);
        }
        this._queue.submitJobs();
    };

    printAllDocs = () => {
        for (const discipline of this.competition.disciplines) {
            const tour = discipline.tours[0];
            const actions_row = this.state.actions[tour.id];
            if (!actions_row) {
                continue;
            }
            for (const action of this.constructor.POSSIBLE_ACTIONS) {
                if (actions_row[action]) {
                    this.doTheJob(tour, action, actions_row[action], false);
                }
            }
        }
        this._queue.submitJobs();
    };

    render() {
        if (!this.competition) {
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
                            possibleActions={ this.constructor.POSSIBLE_ACTIONS }
                            tours={ this.constructor.extractToursFromCompetition(this.competition) }
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
                            <button
                                type="button"
                                onClick={ this.handlePrintAllDocs }
                            >
                                { _("admin.auto_printer.print_all_docs") }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
