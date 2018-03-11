import _ from "l10n";

import formatScore from "./formatScore";

export default class DanceScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    raw_data: PT.shape({
                        fw: PT.number,
                        dance_figs: PT.number,
                        composition: PT.number,
                        small_mistakes: PT.number,
                        big_mistakes: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
            scoringType: PT.string.isRequired,
        };
    }

    renderRow(component, fmt="@") {
        return (
            <tr>
                <th>
                    <p>{ _(`score_parts.components.short.${component}`) }:</p>
                </th>
                <td>
                    <p>{ formatScore(this.props.score.data.raw_data[component], fmt) }</p>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <table className="score-breakdown"><tbody>
                { this.renderRow("fw", "-$%") }
                { this.renderRow("dance_figs") }
                { this.renderRow("composition") }
                { this.renderRow("small_mistakes", "$") }
                { this.renderRow("big_mistakes", "$") }
            </tbody></table>
        );
    }
}

