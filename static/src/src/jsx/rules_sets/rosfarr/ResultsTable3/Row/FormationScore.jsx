import _ from "l10n";

import formatScore from "./formatScore";

export default class FormationScore extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            row: PT.shape({
                additional_data: PT.shape({
                    places: PT.object.isRequired,
                }).isRequired,
            }).isRequired,
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    total_score: PT.number.isRequired,
                    raw_data: PT.shape({
                        dance_tech: PT.number,
                        dance_figs: PT.number,
                        impression: PT.number,
                        mistakes: PT.number,
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
                        <p>{ _("results.breakdown.m") }:</p>
                    </th>
                    <td>
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
                <tr>
                    <th>
                        <p>{ _("results.breakdown.p")  }:</p>
                    </th>
                    <td className="total-score">
                        <p>{ this.props.row.additional_data.places[this.props.score.id] }</p>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}

FormationScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_FormationScore";
