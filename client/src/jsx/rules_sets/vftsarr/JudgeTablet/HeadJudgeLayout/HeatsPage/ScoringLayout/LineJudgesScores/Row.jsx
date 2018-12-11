import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import Cell from "./Cell";

export default class Row extends React.Component {
    static propTypes = {
        criteria: PT.string.isRequired,
        lineJudgesIndex: PT.instanceOf(Map).isRequired,
        medians: PT.instanceOf(Map).isRequired,
        scores: PT.arrayOf(PT.object.isRequired).isRequired,
        table: PT.instanceOf(Map).isRequired,
    };

    renderCells() {
        return this.props.scores.map(score => {
            const dj = this.props.lineJudgesIndex.get(score.discipline_judge_id);
            return (
                <Cell
                    criteria={this.props.criteria}
                    disciplineJudge={dj}
                    key={dj.id}
                    medians={this.props.medians}
                    score={score}
                    table={this.props.table}
                />
            );
        });
    }
    render() {
        return (
            <tr className="scores">
                <th className="criteria-name">
                    {_(`score_parts.components.short.${this.props.criteria}`)}
                </th>
                {this.renderCells()}
            </tr>
        );
    }
}
