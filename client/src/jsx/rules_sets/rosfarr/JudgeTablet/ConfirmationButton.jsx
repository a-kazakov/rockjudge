import _ from "l10n";

import Slider from "tablet_ui/Slider";

export default class ConfirmationButton extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            canConfirm: PT.bool.isRequired,
            confirmed: PT.bool.isRequired,
            onConfirm: PT.func.isRequired,
        };
    }

    static get defaultProps() {
        return {
            canConfirm: true,
        }
    }

    render() {
        if (!this.props.canConfirm) {
            return (
                <div className="confirm" />
            );
        }
        return (
            <div className="confirm">
                <Slider
                    done={ this.props.confirmed }
                    slideText={ _("tablet.global.confirm_score") }
                    doneText={ _("tablet.global.confirmed") }
                    onActivate={ this.props.onConfirm }
                />
            </div>
        );
    }
}
