import _ from "l10n";

import formatScore from "./formatScore";

export default class AcroScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    total_score: PT.number.isRequired,
                    raw_data: PT.shape({
                        reductions: PT.arrayOf(PT.number).isRequired,
                        mistakes: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        return (
            <table className="score-breakdown"><tbody>
                { this.props.score.data.raw_data.reductions.map((score, idx) =>
                    <tr key={ idx }>
                        <th>
                            <p>{ _("results.breakdown.acro_n", idx + 1) }:</p>
                        </th>
                        <td>
                            <p>{ formatScore(score, "-$%") }</p>
                        </td>
                    </tr>
                ) }
                <tr>
                    <th>
                        <p>{ _("results.breakdown.fd") }:</p>
                    </th>
                    <td className="mistakes">
                        <p>{ formatScore(this.props.score.data.raw_data.mistakes) }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.t")  }:</p>
                    </th>
                    <td className="total-score">
                        <p>{ this.props.score.data.total_score }</p>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}

AcroScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_AcroScore";
