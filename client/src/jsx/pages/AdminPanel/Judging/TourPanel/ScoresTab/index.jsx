import _ from "l10n";
import Api from "common/server/Api";
import Loader from "common/components/Loader";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

import rules_set from "rules_sets/loader";

import Row from "./Row";

export default class ScoresTab extends React.PureComponent {
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
    handlePositionMove = (heat, old_pos, new_pos) => {
        const heat_runs = this.state.tour.runs.filter(r => r.heat === heat);
        const old_ids = heat_runs.map(r => r.id)
        const new_ids = old_pos <= new_pos
            ? [].concat(
                old_ids.slice(0, old_pos),
                old_ids.slice(old_pos + 1, new_pos + 1),
                [old_ids[old_pos]],
                old_ids.slice(new_pos + 1)
            )
            : [].concat(
                old_ids.slice(0, new_pos),
                [old_ids[old_pos]],
                old_ids.slice(new_pos, old_pos),
                old_ids.slice(old_pos + 1)
            )
        console.log(heat_runs, old_ids, new_ids)
        Api("tour.permute_within_heat", {
            "tour_id": this.props.tour.id,
            "run_ids": new_ids,
        })
            .send();
    }

    // Rendering

    renderTableHeaderCell(code) {
        return (
            <th className={ code }>
                { _(`judging.labels.${code}`) }
            </th>
        );
    }
    renderRuns() {
        const runs = this.state.tour.runs;
        let heat_positions = runs.map(() => 0);
        let heat_sizes = runs.map(() => 0);
        for (let i = 1; i < runs.length; ++i) {
            heat_positions[i] = runs[i].heat === runs[i - 1].heat
                ? heat_positions[i - 1] + 1
                : 0;
        }
        for (let i = runs.length - 1; i >= 0; --i) {
            heat_sizes[i] = i === runs.length - 1 || heat_positions[i + 1] <= heat_positions[i]
                ? heat_positions[i] + 1
                : heat_sizes[i + 1];
        }
        let result = [];
        for (let i = 0; i < runs.length; ++i) {
            result.push(
                <Row
                    heatPosition={ heat_positions[i] }
                    heatSize={ heat_sizes[i] }
                    key={ runs[i].id }
                    nowEditing={ this.state.nowEditing }
                    readOnly={ this.state.tour.finalized }
                    run={ runs[i] }
                    tour={ this.state.tour }
                    onEditRequest={ this.handleEditRequest }
                    onPositionMove={ this.handlePositionMove }
                    onStopEditing={ this.handleStopEditing }
                />
            );
        }
        return result;
    }
    render() {
        if (this.state.tour === null) {
            return (
                <Loader />
            );
        }
        const discipline_judges = this.state.tour.discipline.discipline_judges;
        return (
            <div className="ScoresTab">
                <table className="scores-table">
                    <tbody>
                        <tr>
                            { this.renderTableHeaderCell("heat") }
                            { this.renderTableHeaderCell("number") }
                            { this.renderTableHeaderCell("participant_name") }
                            { this.renderTableHeaderCell("acrobatics") }
                            { this.renderTableHeaderCell("status") }
                            { this.renderTableHeaderCell("total_score") }
                            { discipline_judges.map(discipline_judge =>
                                <th
                                    className="judge"
                                    key={ discipline_judge.id }
                                >
                                    { rules_set.get_judge_table_mark(discipline_judge) }
                                </th>
                            ) }
                            { this.state.tour.finalized
                                ? null
                                : this.renderTableHeaderCell("actions") }
                        </tr>
                        { this.renderRuns() }
                    </tbody>
                </table>
            </div>
        );
    }
}

ScoresTab.displayName = "AdminPanel_Judging_TourPanel_ScoresTab";
