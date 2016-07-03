import _ from "l10n";

import { Api } from "server/api";

import { onTouchOrClick } from "ui/tablet_components";

export default class NotPerformedSwitch extends React.Component {
    markNotPerformed() {
        Api("run.mark_not_performed", { run_id: this.props.run.id }).send();
    }
    markPerformed() {
        Api("run.mark_performed", { run_id: this.props.run.id }).send();
    }
    renderButton() {
        if (this.props.run.performed) {
            return (
                <button type="button" className="btn btn-sm btn-danger" { ...onTouchOrClick(this.markNotPerformed.bind(this)) }>
                    { _("tablet.global.mark_not_performed") }
                </button>
            );
        } else {
            return (
                <button type="button" className="btn btn-sm btn-success" { ...onTouchOrClick(this.markPerformed.bind(this)) }>
                    { _("tablet.global.discard_not_performed") }
                </button>
            );
        }
    }
    render() {
        return (
            <div className="not-performed-control">
                { this.renderButton() }
            </div>
        );
    }
}
