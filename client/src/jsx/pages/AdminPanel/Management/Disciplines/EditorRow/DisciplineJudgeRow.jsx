import rules_set from "rules_sets/loader";

export default class DisciplineJudgeRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                judge_id: PT.number.isRequired,
                role: PT.oneOf(rules_set.meta.judge_roles),
            }).isRequired,
            idx: PT.number.isRequired,
            judges: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                    name: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            onChange: PT.func.isRequired,
            onDelete: PT.func.isRequired,
        };
    }
    handleChange = (field, value) => {
        let new_value = Object.assign({}, this.props.disciplineJudge);
        new_value[field] = value;
        this.props.onChange(this.props.idx, new_value);
    }
    handleJudgeIdChange = (event) => {
        this.handleChange("judge_id", Number(event.target.value));
    }
    handleRoleChange = (event) => {
        this.handleChange("role", event.target.value);
    }
    handleDeletion = () => {
        this.props.onDelete(this.props.idx);
    }

    render() {
        return (
            <div>
                <select
                    className="judge"
                    value={ this.props.disciplineJudge.judge_id }
                    onChange={ this.handleJudgeIdChange }
                >
                    { this.props.judges.map(j =>
                        <option key={ j.id } value={ j.id } >
                            { j.name }
                        </option>
                    ) }
                </select>
                <select
                    className="judge-role"
                    value={ this.props.disciplineJudge.role }
                    onChange={ this.handleRoleChange }
                >
                    { rules_set.meta.judge_roles.map(jr =>
                        <option key={ jr } value={ jr }>
                            { rules_set.translate(`judge_roles.${jr}`) }
                        </option>
                    ) }
                </select>
                <button
                    className="del btn btn-danger"
                    type="button"
                    onClick={ this.handleDeletion }
                >
                    X
                </button>
            </div>
        );
    }
}

DisciplineJudgeRow.displayName = "AdminPanel_Management_Disciplines_EditorRow_DisciplineJudgeRow";
