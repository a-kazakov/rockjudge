import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import rules_set from "rules_sets/loader";
import DisciplineJudgeRow from "./DisciplineJudgeRow";

export default class DisciplineJudges extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        disabled: PT.bool.isRequired,
        value: PT.arrayOf(
            PT.shape({
                judge_id: PT.number.isRequired,
                role: PT.string.isRequired,
            }).isRequired,
        ).isRequired,
        onChange: PT.func.isRequired,
    };

    handleAdd = () => {
        const new_item = {
            judge_id: this.props.competition.judges[0]?.id,
            role: rules_set.meta.judge_roles[0],
        };
        const next_value = [].concat(this.props.value, [new_item]);
        this.props.onChange(next_value);
    };
    handleChange = (idx, value) => {
        let next_value = this.props.value.slice();
        next_value[idx] = value;
        this.props.onChange(next_value);
    };
    handleDelete = (idx) => {
        let next_value = this.props.value.slice();
        next_value.splice(idx, 1);
        this.props.onChange(next_value);
    };

    render() {
        return (
            <div className="discipline-judges">
                { this.props.value.map((dj, idx) =>
                    <DisciplineJudgeRow
                        competition={ this.props.competition }
                        disabled={ this.props.disabled }
                        idx={ idx }
                        key={ idx }
                        value={ dj }
                        onChange={ this.handleChange }
                        onDelete={ this.handleDelete }
                    />
                ) }
                <button
                    className="add"
                    disabled={ this.props.disabled }
                    type="button"
                    onClick={ this.handleAdd }
                >
                    { _("global.buttons.add") }
                </button>
            </div>
        );
    }
}

