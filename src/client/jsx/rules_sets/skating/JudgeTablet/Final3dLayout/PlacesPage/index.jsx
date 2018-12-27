import { Api, React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import PlaceButton from "./PlaceButton";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";
import showConfirm from "common/dialogs/showConfirm";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";
import Loader from "common/components/Loader";

export default class PlacesPage extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    state = { inited: !this.props.tour.global_storage.hasOverrides() };

    componentDidUpdate() {
        if (!this.state.inited && !this.props.tour.global_storage.hasOverrides()) {
            this.setState({ inited: true });
        }
    }

    handleConfirm = () => {
        const api = Api("tour/confirm_judge", {
            discipline_judge_id: this.props.disciplineJudge.id,
            tour_id: this.props.tour.id,
        });
        this.props.tour.runs
            .map(run =>
                run.scores.find(
                    score =>
                        score.discipline_judge_id === this.props.disciplineJudge.id,
                ),
            )
            .filter(score => score != null)
            .forEach(score =>
                api.setPendingMutation(
                    this.props.tour.global_storage,
                    "Score",
                    score.id,
                    { confirmed: true },
                ),
            );
        api.send();
    };
    handlePlaceSelect = (run_id, place) => {
        this.props.onScoreUpdate(this.score_ids.get(run_id), { place });
    };
    handleAutoAssignClick = () => {
        showConfirm(_("tablet.messages.confirm_auto_assign"), this.autoAssignPlaces);
    };

    getRunScoresSum(run) {
        const score = this.scores.get(run.id);
        const score_data = this.props.tour.results.scores_results[score?.id ?? ""];
        return score_data?.extra_data?.scores_sum ?? "-";
    }

    autoAssignPlaces = () => {
        let scores = {};
        for (const [run_id, place] of this.auto_places.entries()) {
            const score_id = this.scores.get(run_id)?.id;
            if (score_id == null) {
                continue;
            }
            scores[score_id] = { data: { place } };
        }
        if (Object.keys(scores).length > 0) {
            const api = Api("model/batch_update", {
                model_name: "Score",
                data: scores,
            });
            for (const [run_id, place] of this.auto_places.entries()) {
                const score_id = this.scores.get(run_id)?.id;
                if (score_id == null) {
                    continue;
                }
                api.setPendingMutation(
                    this.props.tour.global_storage,
                    "Score",
                    score_id,
                    { data: { place } },
                );
            }
            api.send();
        }
    };

    setupExpectedPlaces() {
        this.expected_places = new Map();
        this.auto_places = new Map();
        const sorted_runs = this.props.tour.runs
            .slice()
            .sort(
                (a, b) =>
                    (this.getRunScoresSum(b) ?? 0) - (this.getRunScoresSum(a) ?? 0),
            );
        let latest_sum = null;
        let current_place = 1;
        let places_buf = [];
        let runs_buf = [];
        for (const run of sorted_runs) {
            if (run.status !== "OK") {
                continue;
            }
            const scores_sum = this.getRunScoresSum(run);
            if (scores_sum !== latest_sum) {
                for (const run_id of runs_buf) {
                    this.expected_places.set(run_id, new Set(places_buf));
                    this.auto_places.set(run_id, places_buf[0]);
                }
                places_buf = [];
                runs_buf = [];
            }
            places_buf.push(current_place);
            runs_buf.push(run.id);
            latest_sum = scores_sum;
            current_place += 1;
        }
        for (const run_id of runs_buf) {
            this.expected_places.set(run_id, new Set(places_buf));
            this.auto_places.set(run_id, places_buf[0]);
        }
    }
    setupCache() {
        this.places = new Map();
        this.scores = new Map();
        this.score_ids = new Map();
        this.place_to_runs = new Map();
        this.can_confirm = true;
        this.places_count = this.props.tour.runs.filter(r => r.status === "OK").length;
        for (const run of this.props.tour.runs) {
            if (run.status !== "OK") {
                continue;
            }
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    if (!score.data.place || score.data.place > this.places_count) {
                        this.can_confirm = false;
                    }
                    this.places.set(run.id, score.data.place);
                    this.scores.set(run.id, score);
                    this.score_ids.set(run.id, score.id);
                    if (!this.place_to_runs.has(score.data.place)) {
                        this.place_to_runs.set(score.data.place, [run]);
                    } else {
                        this.place_to_runs.get(score.data.place).push(run);
                        this.can_confirm = false;
                    }
                }
            }
        }
        this.setupExpectedPlaces();
    }

    renderTableHeader() {
        let cells = [];
        for (const run of this.props.tour.runs) {
            const scores_sum = this.getRunScoresSum(run);
            cells.push(
                <th key={run.id}>
                    <div className="number">{run.participant.number}</div>
                    <div className="score">
                        {run.status === "OK" ? `(${scores_sum})` : <span>&nbsp;</span>}
                    </div>
                </th>,
            );
        }
        return (
            <tr>
                {cells}
                <th className="number-right">
                    {_("tablet.dance_judge.participant_number")}
                </th>
                <th className="participant">{_("tablet.dance_judge.participant")}</th>
                <th className="score-right">{_("tablet.dance_judge.score")}</th>
            </tr>
        );
    }

    renderParticipant(place) {
        if (!this.place_to_runs.has(place)) {
            return <td className="participant" colSpan={3} />;
        }
        const runs = this.place_to_runs.get(place);
        if (runs.length > 1) {
            const numbers = runs.map(r => `№${r.participant.number}`).join(", ");
            return (
                <td className="multiple participant" colSpan={3}>
                    {`${_("tablet.dance_judge.multiple_participants")} (${numbers})`}
                </td>
            );
        }
        const run = runs[0];
        const scores_sum = this.getRunScoresSum(run) ?? 0;
        return (
            <>
                <td className="number-right">{run.participant.number}</td>
                <td className="participant">{run.participant.name}</td>
                <td className="score-right">{scores_sum}</td>
            </>
        );
    }

    renderTableRows() {
        let rows = [];
        for (let place = 1; place <= this.places_count; ++place) {
            let cells = [];
            for (const run of this.props.tour.runs) {
                cells.push(
                    <PlaceButton
                        disabled={run.status !== "OK"}
                        key={run.id}
                        place={place}
                        readOnly={this.scores.get(run.id)?.confirmed}
                        run={run}
                        runHasSelected={!this.expected_places.get(run.id)?.has(place)}
                        selected={this.places.get(run.id) === place}
                        onSelect={this.handlePlaceSelect}
                    />,
                );
            }
            rows.push(
                <tr key={place}>
                    {cells}
                    {this.renderParticipant(place)}
                </tr>,
            );
        }
        return rows;
    }

    renderAutoAssignButton(scores) {
        if (scores.some(s => s.confirmed)) {
            return null;
        }
        return (
            <button
                className="auto-assign-button"
                type="button"
                {...onTouchEndOrClick(this.handleAutoAssignClick)}
            >
                {_("tablet.buttons.auto_assign_places")}
            </button>
        );
    }
    render() {
        this.setupCache();
        if (!this.state.inited) {
            return (
                <div className="body">
                    <Loader />
                </div>
            );
        }
        const scores = this.props.tour.runs
            .filter(run => run.status === "OK")
            .map(run =>
                run.scores.find(
                    score =>
                        score?.discipline_judge_id === this.props.disciplineJudge.id,
                ),
            )
            .filter(score => score); // Case if score not found
        return (
            <div className="body">
                <table className="places-table">
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableRows()}
                    </tbody>
                </table>
                {this.renderAutoAssignButton(scores)}
                <ConfirmationButton
                    canConfirm={this.can_confirm}
                    confirmed={scores.every(s => s.confirmed)}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}
