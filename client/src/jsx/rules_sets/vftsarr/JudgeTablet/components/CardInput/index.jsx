import _ from "l10n";

import getCardReasons from "common/getCardReasons";

import Item from "./Item";
import SelectorInput from "tablet_ui/SelectorInput";

export default class CardInput extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            scoreData: PT.shape({
                card: PT.oneOf(["OK", "YC", "RC"]),
                card_reasons: PT.object,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
            onChange: PT.func.isRequired,
        };
    }

    static checkReasons(reasons) {
        return Object.keys(reasons)
            .map(key => reasons[key])
            .reduce(((a, b) => a || b), false);
    }
    static getUpdatedCard(card, reasons) {
        const has_reasons = this.checkReasons(reasons);
        if (card === "OK" && has_reasons) {
            return "YC";
        }
        if (card !== "OK" && !has_reasons) {
            return "OK";
        }
        // return undefined;
    }

    get card_reasons() {
        return getCardReasons(this.props.tour.scoring_system_name);
    }

    handleReasonsChange = (reason, value) => {
        const card_reasons = Object.assign(
            {},
            this.props.scoreData.card_reasons,
            {[reason]: value},
        );
        const card = this.constructor.getUpdatedCard(this.props.scoreData.card, card_reasons);
        this.props.onChange({card, card_reasons});
    };
    handleCardChange = (card) => {
        this.props.onChange({card});
    };
    renderCardReasons() {
        return (
            <div className="card_reasons">
                <h3>
                    { _("tablet.tech_judge.violations") }
                </h3>
                { this.card_reasons.map(reason => (
                    <Item
                        key={ reason }
                        readOnly={ this.props.readOnly }
                        reason={ reason }
                        selected={ this.props.scoreData.card_reasons[reason] }
                        onChange={ this.handleReasonsChange }
                    />
                ) ) }
            </div>
        );
    }
    renderCardType() {
        const has_reasons = this.constructor.checkReasons(this.props.scoreData.card_reasons);
        if (!has_reasons) {
            return null;
        }
        return (
            <div className="card">
                <h3>
                    { _("tablet.tech_judge.card_type") }
                </h3>
                <SelectorInput
                    jumbo
                    choices={ [
                        ["YC", _("tablet.tech_judge.yellow_card"), "active-yellow"],
                        ["RC", _("tablet.tech_judge.red_card"), "active-red"],
                    ] }
                    readOnly={ this.props.readOnly }
                    value={ this.props.scoreData.card }
                    onChange={ this.handleCardChange }
                />
            </div>
        );
    }
    render() {
        return (
            <div className="card">
                { this.renderCardReasons() }
                { this.renderCardType() }
            </div>
        );
    }
}
