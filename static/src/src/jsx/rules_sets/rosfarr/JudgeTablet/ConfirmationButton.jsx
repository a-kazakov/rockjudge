import _ from "l10n";

import { Slider } from "ui/tablet_components";

export default class ConfirmationButton extends React.Component {
    static get defaultProps() {
        return {
            canConfirm: true,
        }
    }
    render() {
        if (!this.props.canConfirm) {
            return <div className="confirm"></div>;
        }
        return <div className="confirm">
            <Slider
                onActivate={ this.props.onConfirm }
                done={ this.props.confirmed }
                slideText={ _("tablet.global.confirm_score") }
                doneText={ _("tablet.global.confirmed") } />
        </div>;
    }
}
