import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

export default class ConfirmationButton extends React.Component {
    static propTypes = {
        confirmed: PT.bool.isRequired,
        onConfirmationToggle: PT.func.isRequired,
    };
    getClassName() {
        let result = "confirmation-button";
        result += this.props.confirmed ? " confirmed" : " not-confirmed";
        return result;
    }
    render() {
        return (
            <button
                className={ this.getClassName() }
                type="button"
                onClick={ this.props.onConfirmationToggle }
            >
                { this.props.confirmed
                    ? _("admin.buttons.unconfirm_score")
                    : _("admin.buttons.confirm_score") }
            </button>
        );
    }
}
