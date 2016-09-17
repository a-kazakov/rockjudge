import _ from "l10n";
import { Api } from "server/api";
import { Loader } from "ui/components";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";

import rules_set from "rules_sets/loader";

import Row from "./Row";

export default class ScoresTab extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            onPageSwitch: PT.func.isRequired,
        };
    }

    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
            nowEditing: {},
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
            runs: {
                acrobatics: {},
                scores: {},
                participant: {
                    programs: {},
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

    // Listeners

    initTour() {
        showConfirm(
            _("judging.confirms.init_tour"),
            () => {
                Api("tour.init", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        );
    }
    finalizeTour() {
        showConfirm(
            _("judging.confirms.finalize_tour"),
            () => {
                Api("tour.finalize", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(() => {
                        closeDialog();
                        this.props.onPageSwitch("results-1");
                    })
                    .send();
            }
        );
    }
    shuffleHeats() {
        showConfirm(
            _("judging.confirms.shuffle_heats"),
            () => {
                Api("tour.shuffle_heats", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        );
    }
    startTour() {
        Api("tour.start", {
            tour_id: this.props.tour.id,
        })
            .send();
    }
    stopTour() {
        Api("tour.stop", {
            tour_id: this.props.tour.id,
        })
            .send();
    }

    handleSignal = (message) => {
        switch (message) {
        case "init_tour":     return this.initTour();
        case "finalize_tour": return this.finalizeTour();
        case "shuffle_heats": return this.shuffleHeats();
        case "start_tour":    return this.startTour();
        case "stop_tour":     return this.stopTour();
        default:
            console.error("Unknown signal received:", message);
        }
    }
    handleEditRequest = (info) => {
        this.setState({
            nowEditing: info,
        });
    }
    handleStopEditing = () => {
        this.setState({
            nowEditing: {},
        });
    }

    // Rendering

    renderTableHeaderCell(code) {
        return (
            <th className={ code }>
                { _(`judging.labels.${code}`) }
            </th>
        );
    }
    render() {
        if (this.state.tour === null) {
            return (
                <Loader />
            );
        }
        const discipline_judges = this.state.tour.discipline.discipline_judges;
        return (
            <div className="tour-admin">
                <table className="bordered-table">
                    <tbody>
                        <tr>
                            { this.renderTableHeaderCell("heat") }
                            { this.renderTableHeaderCell("number") }
                            { this.renderTableHeaderCell("participant_name") }
                            { this.renderTableHeaderCell("acrobatics") }
                            { this.renderTableHeaderCell("performed") }
                            { this.renderTableHeaderCell("total_score") }
                            { discipline_judges.map(discipline_judge =>
                                <th
                                    className="judge"
                                    key={ discipline_judge.id }
                                >
                                    { rules_set.get_judge_table_mark(discipline_judge) }
                                </th>
                            ) }
                        </tr>
                        { this.state.tour.runs.map(run =>
                            <Row
                                key={ run.id }
                                nowEditing={ this.state.nowEditing }
                                readOnly={ this.state.tour.finalized }
                                run={ run }
                                tour={ this.state.tour }
                                onEditRequest={ this.handleEditRequest }
                                onStopEditing={ this.handleStopEditing }
                            />
                        ) }
                    </tbody>
                </table>
            </div>
        );
    }
}

ScoresTab.displayName = "AdminPanel_Judging_TourPanel_ScoresTab";
