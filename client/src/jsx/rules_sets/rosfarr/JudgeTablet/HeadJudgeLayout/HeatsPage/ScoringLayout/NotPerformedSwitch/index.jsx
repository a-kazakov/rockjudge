import _ from "l10n";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import { Api } from "HostModules";

export default class NotPerformedSwitch extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                id: PT.number.isRequired,
                performed: PT.bool.isRequired,
            }).isRequired,
        };
    }

    handleMarkNotPerformed = () => {
        Api("run.mark_not_performed", { run_id: this.props.run.id }).send();
    }
    handleMarkPerformed = () => {
        Api("run.mark_performed", { run_id: this.props.run.id }).send();
    }

    renderButton() {
        if (this.props.run.performed) {
            return (
                <button
                    className="not-performed"
                    type="button"
                    { ...onTouchEndOrClick(this.handleMarkNotPerformed) }
                >
                    { _("tablet.global.mark_not_performed") }
                </button>
            );
        } else {
            return (
                <button
                    className="performed"
                    type="button"
                    { ...onTouchEndOrClick(this.handleMarkPerformed) }
                >
                    { _("tablet.global.discard_not_performed") }
                </button>
            );
        }
    }
    render() {
        return (
            <div className="not-performed-switch">
                { this.renderButton() }
            </div>
        );
    }
}
