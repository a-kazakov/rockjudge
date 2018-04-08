import _ from "l10n";

import formatScore from "./formatScore";

export default class DanceExtendedScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    raw_data: PT.shape({
                        fw_woman: PT.number,
                        fw_man: PT.number,
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
                { this.renderRow("fw_woman", "-$%") }
                { this.renderRow("fw_man", "-$%") }
                { this.renderRow("df_accuracy") }
                { this.renderRow("df_complexity") }
                { this.renderRow("df_art") }
                { this.renderRow("c_idea") }
                { this.renderRow("c_performance") }
                { this.renderRow("c_bonus") }
                { this.renderRow("small_mistakes", "$") }
                { this.renderRow("big_mistakes", "$") }
            </tbody></table>
        );
    }
}

