import _ from "l10n";
import Cell from "./Cell";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            criteria: PT.string.isRequired,
            lineJudgesIndex: PT.instanceOf(Map).isRequired,
            medians: PT.instanceOf(Map).isRequired,
            run: PT.object.isRequired,
            scores: PT.arrayOf(
                PT.shape({
                    discipline_judge_id: PT.number.isRequired,
                }).isRequired,
            ).isRequired,
            table: PT.instanceOf(Map).isRequired,
        };
    }

    renderCells() {
        return this.props.scores.map(score => {
            const dj = this.props.lineJudgesIndex.get(score.discipline_judge_id);
            return (
                <Cell
                    criteria={ this.props.criteria }
                    disciplineJudge={ dj }
                    key={ dj.id }
                    medians={ this.props.medians }
                    run={ this.props.run }
                    score={ score }
                    table={ this.props.table }
                />
            );
        });
    }
    render() {
        return (
            <tr className="scores">
                <th className="criteria-name">
                    { _(`score_parts.components.short.${this.props.criteria}`) }
                </th>
                { this.renderCells() }
            </tr>
        );
    }
}
