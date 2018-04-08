import _ from "l10n";

import formatScore from "./formatScore";

export default class FormationSimplifiedScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            additionalData: PT.shape({
                places: PT.object.isRequired,
            }),
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    total_score: PT.string.isRequired,
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
                { this.renderRow("fw", "-$%") }
                { this.renderRow("dance_figs") }
                { this.renderRow("composition") }
                { this.renderRow("figures") }
                { this.renderRow("small_mistakes", "$") }
                { this.renderRow("big_mistakes", "$") }
            </tbody></table>
        );
    }
}

