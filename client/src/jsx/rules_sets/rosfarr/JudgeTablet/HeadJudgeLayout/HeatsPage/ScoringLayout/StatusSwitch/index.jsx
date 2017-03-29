import _ from "l10n";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import { Api } from "HostModules";

export default class StatusSwitch extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                id: PT.number.isRequired,
                performed: PT.bool.isRequired,
                disqualified: PT.bool.isRequired,
            }).isRequired,
        };
    }

    changeStatus(new_status) {
        Api("run.set_status", {
            run_id: this.props.run.id,
            status: new_status,
        }).send();
    }

    handleSetStatusOK = () => this.changeStatus("OK");
    handleSetStatusNP = () => this.changeStatus("NP");
    handleSetStatusDQ = () => this.changeStatus("DQ");

    renderButton() {
        if (!this.props.run.performed) {
            return (
                <button
                    className="performed"
                    type="button"
                    { ...onTouchEndOrClick(this.handleSetStatusOK) }
                >
                    { _("tablet.global.discard_not_performed") }
                </button>
            );
        }
        if (this.props.run.disqualified) {
            return (
                <button
                    className="not-disqualified"
                    type="button"
                    { ...onTouchEndOrClick(this.handleSetStatusOK) }
                >
                    { _("tablet.global.discard_disqualified") }
                </button>
            );
        }
        return (
            <div>
                <button
                    className="not-performed"
                    type="button"
                    { ...onTouchEndOrClick(this.handleSetStatusNP) }
                >
                    { _("tablet.global.mark_not_performed") }
                </button>
                &nbsp;
                <button
                    className="disqualified"
                    type="button"
                    { ...onTouchEndOrClick(this.handleSetStatusDQ) }
                >
                    { _("tablet.global.mark_disqualified") }
                </button>
            </div>
        );
    }
    render() {
        return (
            <div className="status-switch">
                { this.renderButton() }
            </div>
        );
    }
}
