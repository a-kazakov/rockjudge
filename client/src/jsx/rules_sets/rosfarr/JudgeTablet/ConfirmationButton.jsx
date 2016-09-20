import _ from "l10n";
import makeClassName from "common/makeClassName";

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

    getClassName() {
        return makeClassName({
            "confirm": true,
            "hidden": !this.props.canConfirm,
        });
    }
    render() {
        return (
            <div className={ this.getClassName() }>
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
