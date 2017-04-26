import _ from "l10n";
import Api from "common/server/Api";

import makeClassName from "common/makeClassName";

import showConfirm from "common/dialogs/showConfirm";

import Button from "./Button"


export default class ActionsCell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            opened: PT.bool.isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
                participant: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            onEditRequest: PT.func.isRequired,
            onStopEditing: PT.func.isRequired,
        };
    }

    handleToggleMenu = () => {
        if (this.props.opened) {
            this.props.onStopEditing();
        } else {
            this.props.onEditRequest({
                type: "actions",
                run_id: this.props.run.id,
            });
        }
    }
    handleResetScore = () => {
        showConfirm(
            [_("judging.confirms.reset_score"), this.props.run.participant.name],
            () => {
                Api("run.reset", {
                    run_id: this.props.run.id,
                })
                    .send();
            },
            true
        );
        this.props.onStopEditing();
    }

    getClassName() {
        return makeClassName({
            "actions": true,
            "opened": this.props.opened,
        });
    }
    renderClosedState() {
        return (
            <span>&#9660;</span>
        );
    }
    renderOpenedState() {
        return (
            <div className="menu">
                <Button
                    text={ _("judging.buttons.reset_score") }
                    onClick={ this.handleResetScore }
                />
                <Button
                    text={ _("judging.buttons.close_actions_menu") }
                    onClick={ this.props.onStopEditing }
                />
            </div>
        )
    }
    renderBody() {
        return this.props.opened
            ? this.renderOpenedState()
            : this.renderClosedState();
    }
    render() {
        return (
            <td
                className={ this.getClassName() }
                onClick={ this.handleToggleMenu }
            >
                { this.renderBody() }
            </td>
        );
    }
}

ActionsCell.displayName = "pages_AdminPanel_Judging_TourPanel_ScoresTab_Row_ActionsCell";
