import PT from "prop-types";
import _ from "l10n";

import MultipleSelectorBlock from "./MultipleSelectorBlock";
import getCardReasons from "../../../../common/getCardReasons";

export default class CardReasonsBlock extends MultipleSelectorBlock {
    static get propTypes() {
        const prev = super.constructor.propTypes || {};
        return Object.assign({}, prev, {
            scoringSystemName: PT.string.isRequired,
        });
    }

    getOptions() {
        return getCardReasons(this.props.scoringSystemName).map(cr => [
            cr,
            _(`card_reasons.long.${cr.toLowerCase()}`),
        ]);
    }
}
