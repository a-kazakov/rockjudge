import _ from "l10n";

export default class ConfirmationButton extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            confirmed: PT.bool.isRequired,
            onConfirmationToggle: PT.func.isRequired,
        };
    }
    getClassName() {
        let result = "btn btn-sm btn-confirmation";
        result += this.props.confirmed ? " btn-danger" : " btn-success";
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

ConfirmationButton.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_ConfirmationButton";
