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

    render() {
        return (
            <table className="score-breakdown"><tbody>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.fw") }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.fw_woman, "-$%") }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.fm") }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.fw_man, "-$%") }</p>
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
            </tbody></table>
        );
    }
}

