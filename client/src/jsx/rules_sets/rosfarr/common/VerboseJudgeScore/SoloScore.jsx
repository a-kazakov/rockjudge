import _ from "l10n";

import formatScore from "./formatScore";

export default class SoloScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    total_score: PT.number.isRequired,
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

    render() {
        return (
            <table className="score-breakdown"><tbody>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.fw_solo") }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.fw, "-$%") }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.df") }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.dance_figs, "@") }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.c")  }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.composition, "@") }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.sm") }:</p>
                    </th>
                    <td className="mistakes">
                        <p>{ formatScore(this.props.score.data.raw_data.small_mistakes) }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.bm") }:</p>
                    </th>
                    <td className="mistakes">
                        <p>{ formatScore(this.props.score.data.raw_data.big_mistakes) }</p>
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

SoloScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_SoloScore";
