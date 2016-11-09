import _ from "l10n";

import formatScore from "./formatScore";

export default class TechScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    total_score: PT.number.isRequired,
                    raw_data: PT.shape({
                        jump_steps: PT.number,
                        penalty: PT.number,
                        timing_violation: PT.bool,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        const tv = this.props.score.data.raw_data.timing_violation;
        return (
            <table className="score-breakdown"><tbody>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.js") }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.jump_steps, "$") }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.tv") }:</p>
                    </th>
                    <td>
                        <p>{ tv === true ? "✗" : tv === false ? "✓" : "?" }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.penalty")  }:</p>
                    </th>
                    <td className="total-score">
                        <p>{ formatScore(this.props.score.data.raw_data.penalty, "$") }</p>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}

TechScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_TechScore";
