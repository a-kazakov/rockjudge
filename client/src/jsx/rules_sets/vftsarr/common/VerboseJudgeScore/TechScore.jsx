import _ from "l10n";

import formatScore from "./formatScore";
import getCardReasons from "common/getCardReasons";
import checkSS from "common/checkSS";

export default class TechScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                id: PT.number.isRequired,
                confirmed: PT.bool.isRequired,
                data: PT.shape({
                    total_score: PT.string.isRequired,
                    raw_data: PT.shape({
                        jump_steps: PT.number,
                        card: PT.string,
                        time: PT.number,
                        mistakes: PT.number,
                        undercount: PT.number,
                        card_reasons: PT.object.isRequired,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    static pad(num, size) {
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
        return `${m}:${this.constructor.pad(s, 2)}`;
    }

    renderFallDowns() {
        if (!checkSS(this.props.tour.scoring_system_name, "acro")) {
            return null;
        }
        return (
            <tr>
                <th>
                    <p>{ _("score_parts.components.short.fall_down") }:</p>
                </th>
                <td>
                    <p>{ formatScore(this.props.score.data.raw_data.fall_down, "$") }</p>
                </td>
            </tr>
        );
    }
    renderUndercount() {
        if (!checkSS(this.props.tour.scoring_system_name, "formation")) {
            return null;
        }
        return (
            <tr>
                <th>
                    <p>{ _("score_parts.components.short.undercount") }:</p>
                </th>
                <td>
                    <p>{ formatScore(this.props.score.data.raw_data.undercount, "$") }</p>
                </td>
            </tr>
        );
    }
    renderCardsReasons() {
        const texts = getCardReasons(this.props.tour.scoring_system_name)
            .filter(cr => this.props.score.data.raw_data.card_reasons[cr])
            .map(cr => _(`card_reasons.short.${cr.toLowerCase()}`));
        if (texts.length === 0) {
            return null;
        }
        return (
            <tr>
                <td
                    className="card-reason"
                    colSpan={ 2 }
                >
                    { texts.map((text, idx) => (
                        <div key={ idx }>
                            { text }
                        </div>
                    )) }
                </td>
            </tr>
        );
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
                { this.renderFallDowns() }
                { this.renderUndercount() }
                <tr>
                    <th>
                        <p>{ _("score_parts.components.short.card") }:</p>
                    </th>
                    <td>
                        <p>{ _(`cards.short.${this.props.score.data.raw_data.card}`) }</p>
                    </td>
                </tr>
                { this.renderCardsReasons() }
            </tbody></table>
        );
    }
}

