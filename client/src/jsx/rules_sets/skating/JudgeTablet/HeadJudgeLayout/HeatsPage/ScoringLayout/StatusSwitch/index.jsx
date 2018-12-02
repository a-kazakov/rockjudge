import {Api, React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

export default class StatusSwitch extends React.Component {
    static propTypes = {
        run: PT.shape({
            id: PT.number.isRequired,
            status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
        }).isRequired,
    };

    changeStatus(status) {
        Api("model/update", {
            model_name: "Run",
            model_id: this.props.run.id,
            data: {status},
        }).send();
    }

    handleSetStatusOK = () => this.changeStatus("OK");
    handleSetStatusNP = () => this.changeStatus("NP");
    handleSetStatusDQ = () => this.changeStatus("DQ");

    renderButton() {
        if (this.props.run.status === "NP") {
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
        if (this.props.run.status === "DQ") {
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