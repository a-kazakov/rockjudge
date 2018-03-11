import _ from "l10n";

import formatScore from "./formatScore";

export default class AcroScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                acrobatics: PT.array.isRequired,
            }).isRequired,
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    raw_data: PT.shape({
                        mistakes: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        if (this.props.run.acrobatics.length === 0) {
            return null;
        }
        return (
            <table className="score-breakdown"><tbody>
                { this.props.run.acrobatics.slice(0, 6).map((acro, idx) =>
                    <tr key={ idx }>
                        <th>
                            <p>{ _("results.breakdown.acro_n", idx + 1) }:</p>
                        </th>
                        <td>
                            <p>{ formatScore(this.props.score.data.raw_data[`a${idx + 1}`], "-$%") }</p>
                        </td>
                    </tr>
                ) }
            </tbody></table>
        );
    }
}

