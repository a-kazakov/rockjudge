import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import rules_set from "rules_sets/loader";

export default class DisciplineJudgeRow extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        disabled: PT.bool.isRequired,
        idx: PT.number.isRequired,
        value: PT.shape({
            judge_id: PT.number.isRequired,
            role: PT.string.isRequired,
        }).isRequired,
        onChange: PT.func.isRequired,
        onDelete: PT.func.isRequired,
    };

    handleChange = (field, value) => {
        this.props.onChange(
            this.props.idx,
            Object.assign(
                {},
                this.props.value,
                {[field]: value},
            ),
        );
    };
    handleJudgeIdChange = (event) => {
        this.handleChange("judge_id", Number(event.target.value));
    };
    handleRoleChange = (event) => {
        this.handleChange("role", event.target.value);
    };
    handleDeletion = () => {
        this.props.onDelete(this.props.idx);
    };

    renderJudgeOption = (judge) => {
        return (
            <option
                key={ judge.id }
                value={ judge.id }
            >
                { judge.name }
            </option>
        );
    };
    renderRoleOption = (role) => {
        return (
            <option
                key={ role }
                value={ role }
            >
                { rules_set.translate(`judge_roles.${role}`) }
            </option>
        );
    };
    render() {
        return (
            <div>
                <select
                    className="judge"
                    disabled={ this.props.disabled }
                    value={ this.props.value.judge_id }
                    onChange={ this.handleJudgeIdChange }
                >
                    { this.props.competition.judges.map(this.renderJudgeOption) }
                </select>
                <select
                    className="judge-role"
                    disabled={ this.props.disabled }
                    value={ this.props.value.role }
                    onChange={ this.handleRoleChange }
                >
                    { rules_set.meta.judge_roles.map(this.renderRoleOption) }
                </select>
                <button
                    className="delete"
                    disabled={ this.props.disabled }
                    type="button"
                    onClick={ this.handleDeletion }
                >
                    X
                </button>
            </div>
        );
    }
}

