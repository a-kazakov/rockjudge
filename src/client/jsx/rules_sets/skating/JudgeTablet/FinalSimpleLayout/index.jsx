import { Api, React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import PlaceButton from "./PlaceButton";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";

const MULTIPLE_RUNS = Symbol();

export default class FinalSimpleLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
        onHeatConfirm: PT.func.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handlePlaceSelect = (run_id, place) => {
        this.props.onScoreUpdate(this.score_ids.get(run_id), { place });
    };

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
    }

    renderTableHeader() {
        let cells = [];
        for (const run of this.props.tour.runs) {
            cells.push(
                <th key={run.id}>
                    <div className="number">{run.participant.number}</div>
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
            </tr>
        );
    }

    renderParticipant(place) {
        if (!this.place_to_runs.has(place)) {
            return <td className="participant" colSpan={2} />;
        }
        const runs = this.place_to_runs.get(place);
        if (runs.length > 1) {
            const numbers = runs.map(r => `№${r.participant.number}`).join(", ");
            return (
                <td className="multiple participant" colSpan={2}>
                    {`${_("tablet.dance_judge.multiple_participants")} (${numbers})`}
                </td>
            );
        }
        const run = runs[0];
        return (
            <>
                <td className="number-right">{run.participant.number}</td>
                <td className="participant">{run.participant.name}</td>
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
                        runHasSelected={this.places.get(run.id) != null}
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

    render() {
        this.setupCache();
        const judge_number =
            this.props.disciplineJudge.judge.role_description ||
            _("global.phrases.judge_n", this.props.disciplineJudge.judge.number);
        return (
            <div className="skating-JudgeTablet GeneralLayout">
                <header>
                    <div className="data">
                        <div className="box">
                            <h1>{judge_number}</h1>
                            <h2>{this.props.disciplineJudge.judge.name}</h2>
                        </div>
                        <div className="box">
                            <h1>{this.props.tour.discipline.name}</h1>
                            <h2>{this.props.tour.name}</h2>
                        </div>
                    </div>
                </header>
                <div className="body">
                    <table className="places-table">
                        <tbody>
                            {this.renderTableHeader()}
                            {this.renderTableRows()}
                        </tbody>
                    </table>
                    <ConfirmationButton
                        canConfirm={this.can_confirm}
                        confirmed={Array.from(this.scores.values()).every(
                            s => s.confirmed,
                        )}
                        onConfirm={this.handleConfirm}
                    />
                </div>
            </div>
        );
    }
}
