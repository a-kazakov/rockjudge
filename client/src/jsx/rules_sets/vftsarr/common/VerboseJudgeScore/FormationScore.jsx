import _ from "l10n";

import formatScore from "./formatScore";

export default class FormationScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            additionalData: PT.shape({
                places: PT.object.isRequired,
            }),
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    total_score: PT.number.isRequired,
                    raw_data: PT.shape({
                        dance_tech: PT.number,
                        dance_figs: PT.number,
                        impression: PT.number,
                        small_mistakes: PT.number,
                        big_mistakes: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
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
                { this.renderRow("df_accuracy") }
                { this.renderRow("df_difficulty") }
                { this.renderRow("df_art") }
                { this.renderRow("c_ideas") }
                { this.renderRow("c_structure") }
                { this.renderRow("c_bonus") }
                { this.renderRow("fig_execution") }
                { this.renderRow("fig_patterns") }
                { this.renderRow("fig_transitions") }
                { this.renderRow("small_mistakes", "$") }
                { this.renderRow("big_mistakes", "$") }
            </tbody></table>
        );
    }
}

