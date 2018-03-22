import _ from "l10n";
import getCardReasons from "common/getCardReasons";

export default class RunMetrics extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                verbose_total_score: PT.shape({
                    card: PT.oneOf(["OK", "YC", "RC"]),
                    card_reasons: PT.object,
                    mistakes: PT.number,
                    fall_down: PT.number,
                }),
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    renderFinalCard() {
        const card = this.props.run.verbose_total_score.card;
        return (
            <tr>
                <th>
                    { _("tablet.head_judge.final_card") }
                </th>
                <td className={ `card-${card}` }>
                    { _(`cards.long.${card}`) }
                </td>
            </tr>
        );
    }
    renderCardReasons() {
        const texts = getCardReasons(this.props.tour.scoring_system_name)
            .filter(cr => this.props.run.verbose_total_score.card_reasons[cr])
            .map(cr => _(`card_reasons.short.${cr.toLowerCase()}`));
        if (texts.length === 0) {
            return null;
        }
        return (
            <tr>
                <th>
                    { _("tablet.head_judge.card_reasons") }
                </th>
                <td className="card-reasons">
                    { texts.map((text, idx) => (
                        <div key={ idx }>
                            { text }
                        </div>
                    )) }
                </td>
            </tr>
        );
    }
    renderFormationUndercount() {
        const undercount = this.props.run.verbose_total_score.undercount;
        if (typeof undercount === "undefined") {
            return null;
        }
        return (
            <tr>
                <th>
                    { _("tablet.head_judge.undercount") }
                </th>
                <td>
                    { undercount }
                </td>
            </tr>
        );
    }
    renderAcroFalldown() {
        const fall_down = this.props.run.verbose_total_score.fall_down;
        if (typeof fall_down === "undefined") {
            return null;
        }
        return (
            <tr>
                <th>
                    { _("tablet.head_judge.fall_down") }
                </th>
                <td>
                    { fall_down }
                </td>
            </tr>
        );
    }
    render() {
        return (
            <table className="run-metrics">
                <tbody>
                    { this.renderFinalCard() }
                    { this.renderCardReasons() }
                    { this.renderFormationUndercount() }
                    { this.renderAcroFalldown() }
                </tbody>
            </table>
        );
    }
}