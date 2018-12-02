import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import getCardReasons from "common/getCardReasons";

export default class RunMetrics extends React.Component {
    static propTypes = {
        run: PT.object.isRequired,
        tourResults: PT.object.isRequired,
    };

    renderFinalCard() {
        const card = this.run_result?.extra_data.card || "OK";
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
        const card_reasons = this.run_result?.extra_data.card_reasons || {};
        const texts = getCardReasons(this.props.run.tour.scoring_system_name)
            .filter(cr => card_reasons[cr])
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
        const undercount = this.run_result?.extra_data.undercount;
        if (typeof undercount !== "number") {
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
        const fall_down = this.run_result?.extra_data.fall_down;
        if (typeof fall_down !== "number") {
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
        this.run_result = this.props.tourResults.runs_results[this.props.run.id];
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