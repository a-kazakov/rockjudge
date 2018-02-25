import _ from "l10n";

import Api from "common/server/Api";
import rules_set from "rules_sets/loader";
import showConfirm from "common/dialogs/showConfirm";
import makeClassName from "common/makeClassName";

import ActionButton from "./ActionButton";

export default class JudgeHeaderCell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
                judge: PT.shape({
                    name: PT.string.isRequired,
                    number: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            opened: PT.bool.isRequired,
            onEditRequest: PT.func.isRequired,
            onStopEditing: PT.func.isRequired,
        };
    }

    handleToggleMenu = () => {
        if (this.props.opened) {
            this.props.onStopEditing();
        } else {
            this.props.onEditRequest({
                type: "judge_actions",
                discipline_judge_id: this.props.disciplineJudge.id,
            });
        }
    };
    handleConfirmAll = () => {
        const judge = this.props.disciplineJudge.judge;
        showConfirm(
            [
                _("judging.confirms.confirm_all"),
                `${_("global.phrases.judge_n", judge.number)}: ${judge.name}`,
            ],
            () => {
                Api("tour.confirm_all", {
                    tour_id: this.props.tour.id,
                    discipline_judge_id: this.props.disciplineJudge.id,
                })
                    .send();
            },
        );
        this.props.onStopEditing();
    };
    handleUnconfirmAll = () => {
        const judge = this.props.disciplineJudge.judge;
        showConfirm(
            [
                _("judging.confirms.unconfirm_all"),
                `${_("global.phrases.judge_n", judge.number)}: ${judge.name}`,
            ],
            () => {
                Api("tour.unconfirm_all", {
                    tour_id: this.props.tour.id,
                    discipline_judge_id: this.props.disciplineJudge.id,
                })
                    .send();
            },
        );
        this.props.onStopEditing();
    };
    handleResetJudgeScores = () => {
        const judge = this.props.disciplineJudge.judge;
        showConfirm(
            [
                _("judging.confirms.reset_judge_scores"),
                `${_("global.phrases.judge_n", judge.number)}: ${judge.name}`,
            ],
            () => {
                Api("tour.reset_judge_scores", {
                    tour_id: this.props.tour.id,
                    discipline_judge_id: this.props.disciplineJudge.id,
                })
                    .send();
            },
        );
        this.props.onStopEditing();
    };

    getClassName() {
        return makeClassName({
            "judge": true,
            "opened": this.props.opened,
        });
    }
    renderClosedState() {
        return (
            <span>
                { rules_set.get_judge_table_mark(this.props.disciplineJudge) }&nbsp;&#9660;
            </span>
        );
    }
    renderOpenedState() {
        return (
            <div className="menu">
                <ActionButton
                    text={ _("judging.buttons.confirm_all") }
                    onClick={ this.handleConfirmAll }
                />
                <ActionButton
                    text={ _("judging.buttons.unconfirm_all") }
                    onClick={ this.handleUnconfirmAll }
                />
                <br />
                <ActionButton
                    style="red"
                    text={ _("judging.buttons.reset_score") }
                    onClick={ this.handleResetJudgeScores }
                />
                <br />
                <ActionButton
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
            <th
                className={ this.getClassName() }
                onClick={ this.handleToggleMenu }
            >
                { this.renderBody() }
            </th>
        );
    }
}