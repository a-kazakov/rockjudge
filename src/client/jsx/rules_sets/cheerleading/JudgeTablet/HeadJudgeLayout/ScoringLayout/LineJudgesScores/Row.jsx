import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import Cell from "./Cell";

export default class Row extends React.Component {
    static propTypes = {
        lineJudgesIndex: PT.instanceOf(Map).isRequired,
        medians: PT.instanceOf(Map).isRequired,
        part: PT.string.isRequired,
        scores: PT.arrayOf(PT.object.isRequired).isRequired,
        showPartName: PT.bool,
        table: PT.instanceOf(Map).isRequired,
    };
    static defaultProps = {
        showPartName: false,
    };

    renderCells() {
        return this.props.scores.map(score => {
            const dj = this.props.lineJudgesIndex.get(score.discipline_judge_id);
            return (
                <Cell
                    disciplineJudge={dj}
                    key={dj.id}
                    medians={this.props.medians}
                    part={this.props.part}
                    score={score}
                    table={this.props.table}
                />
            );
        });
    }
    renderPartName() {
        if (!this.props.showPartName) {
            return null;
        }
        return (
            <th className="criteria-name">
                {_(`score_parts.components.medium.${this.props.part}`)}
            </th>
        );
    }
    render() {
        return (
            <tr className="scores">
                {this.renderPartName()}
                {this.renderCells()}
            </tr>
        );
    }
}
