import _ from "l10n";

import formatScore from "./formatScore";

export default class TechScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                id: PT.number.isRequired,
                data: PT.shape({
                    total_score: PT.string.isRequired,
                    raw_data: PT.shape({
                        jump_steps: PT.number,
                        card: PT.string,
                        time: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    pad(num, size) {
        const s = `0000${num}`;
        return s.substr(s.length - size);
    }
    getTime() {
        let val = this.props.score.data.raw_data.time;
        if (val === null) {
            return "—"
        }
        let m = 0, s = 0;
        m = Math.floor(val / 60);
        val %= 60;
        s = Math.floor(val);
        return `${m}:${this.pad(s, 2)}`;
    }

    render() {
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
                        <p>{ _("results.breakdown.time") }:</p>
                    </th>
                    <td>
                        <p>{ this.getTime() }</p>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}

TechScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_TechScore";
