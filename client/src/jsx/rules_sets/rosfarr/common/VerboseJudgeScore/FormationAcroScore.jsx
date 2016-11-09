import _ from "l10n";

import formatScore from "./formatScore";

export default class FormationAcroScore extends React.PureComponent {
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
                        acrobatics: PT.number,
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

    render() {
        return (
            <table className="score-breakdown"><tbody>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.a") }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.acrobatics, "@") }</p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <p>{ _("results.breakdown.dt") }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.dance_tech, "@") }</p>
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
                        <p>{ _("results.breakdown.i")  }:</p>
                    </th>
                    <td>
                        <p>{ formatScore(this.props.score.data.raw_data.impression, "@") }</p>
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
                { this.props.additionalData
                    ? (
                        <tr>
                            <th>
                                <p>{ _("results.breakdown.p")  }:</p>
                            </th>
                            <td className="total-score">
                                <p>{ this.props.additionalData.places[this.props.score.id] }</p>
                            </td>
                        </tr>
                    ) : null
                }

            </tbody></table>
        );
    }
}

FormationAcroScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_FormationAcroScore";
