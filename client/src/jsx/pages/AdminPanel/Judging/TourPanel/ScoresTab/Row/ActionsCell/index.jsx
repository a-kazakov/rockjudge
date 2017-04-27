import _ from "l10n";
import Api from "common/server/Api";

import makeClassName from "common/makeClassName";

import showConfirm from "common/dialogs/showConfirm";

import Button from "./Button"


export default class ActionsCell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            heatPosition: PT.number.isRequired,
            heatSize: PT.number.isRequired,
            opened: PT.bool.isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
                heat: PT.number.isRequired,
                participant: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            onEditRequest: PT.func.isRequired,
            onPositionMove: PT.func.isRequired,
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
    handleMoveToPos = (next_pos) => {
        this.props.onPositionMove(this.props.run.heat, this.props.heatPosition, next_pos);
        this.props.onStopEditing();
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
    renderMoveToPositionButtons() {
        let result = [];
        for (let idx = 0; idx < this.props.heatSize; ++idx) {
            if (this.props.heatPosition !== idx) {
                result.push(
                    <Button
                        mkey={ idx }
                        text={ _("judging.buttons.move_to_position", idx + 1) }
                        onClick={ this.handleMoveToPos }
                    />
                );
            }
        }
        if (this.props.heatSize > 1) {
            result.push(<br key="br" />);
        }
        return result;
    }
    renderOpenedState() {
        return (
            <div className="menu">
                { this.renderMoveToPositionButtons() }
                <Button
                    style="red"
                    text={ _("judging.buttons.reset_score") }
                    onClick={ this.handleResetScore }
                />
                <br />
                <Button
                    style="dark"
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
