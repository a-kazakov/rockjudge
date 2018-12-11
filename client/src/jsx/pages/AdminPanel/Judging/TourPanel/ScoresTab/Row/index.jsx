import React from "react";

import makeClassName from "common/makeClassName";
import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import AcrobaticsCell from "./AcrobaticsCell";
import ActionsCell from "./ActionsCell";
import HeatCell from "./HeatCell";
import ScoreCell from "./ScoreCell";
import StatusCell from "./StatusCell";

export default class Row extends React.Component {
    static propTypes = {
        heatPosition: PT.number.isRequired,
        heatSize: PT.number.isRequired,
        nowEditing: PT.shape({
            type: PT.string,
            score_id: PT.number,
            run_id: PT.number,
        }).isRequired,
        readOnly: PT.bool.isRequired,
        run: PT.instanceOf(Model).isRequired,
        onEditRequest: PT.func.isRequired,
        onPositionMove: PT.func.isRequired,
        onStopEditing: PT.func.isRequired,
    };

    getClassName() {
        return makeClassName({
            "odd-heat": this.props.run.heat % 2 === 1,
            "even-heat": this.props.run.heat % 2 === 0,
            "not-performed": this.props.run.status === "NP",
            disqualified: this.props.run.status === "DQ",
            "zero-heat": this.props.run.heat <= 0,
        });
    }
    renderActionsCell() {
        if (this.props.readOnly) {
            return null;
        }
        return (
            <ActionsCell
                heatPosition={this.props.heatPosition}
                heatSize={this.props.heatSize}
                opened={
                    this.props.nowEditing.type === "actions" &&
                    this.props.nowEditing.run_id === this.props.run.id
                }
                readOnly={this.props.readOnly}
                run={this.props.run}
                onEditRequest={this.props.onEditRequest}
                onPositionMove={this.props.onPositionMove}
                onStopEditing={this.props.onStopEditing}
            />
        );
    }
    renderScores() {
        let scores_map = new Map();
        for (const score of this.props.run.scores) {
            scores_map.set(score.discipline_judge_id, score);
        }
        return this.props.run.tour.discipline.discipline_judges.map(
            (discipline_judge, idx) => {
                const score = scores_map.get(discipline_judge.id);
                return (
                    <ScoreCell
                        disciplineJudge={discipline_judge}
                        editing={
                            this.props.nowEditing.type === "score" &&
                            this.props.nowEditing.score_id === score?.id
                        }
                        key={score?.id || `I${idx}`}
                        readOnly={this.props.readOnly}
                        score={score}
                        onEditRequest={this.props.onEditRequest}
                        onStopEditing={this.props.onStopEditing}
                    />
                );
            },
        );
    }
    render() {
        return (
            <tr className={this.getClassName()}>
                <HeatCell
                    editing={
                        this.props.nowEditing.type === "heat" &&
                        this.props.nowEditing.run_id === this.props.run.id
                    }
                    readOnly={this.props.readOnly}
                    run={this.props.run}
                    onEditRequest={this.props.onEditRequest}
                    onStopEditing={this.props.onStopEditing}
                />
                <td className="number">{this.props.run.participant.number}</td>
                <td className="name">{this.props.run.participant.name}</td>
                <AcrobaticsCell
                    editing={
                        this.props.nowEditing.type === "acrobatics" &&
                        this.props.nowEditing.run_id === this.props.run.id
                    }
                    participant={this.props.run.participant}
                    readOnly={this.props.readOnly}
                    run={this.props.run}
                    onEditRequest={this.props.onEditRequest}
                    onStopEditing={this.props.onStopEditing}
                />
                <StatusCell readOnly={this.props.readOnly} run={this.props.run} />
                <td className="total">
                    {this.props.run.tour.results.runs_results[this.props.run.id]
                        ?.total_score_str || "..."}
                </td>
                {this.renderScores()}
                {this.renderActionsCell()}
            </tr>
        );
    }
}
