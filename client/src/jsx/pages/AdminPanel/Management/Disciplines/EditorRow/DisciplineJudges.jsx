import _ from "l10n";
import rules_set from "rules_sets/loader";

import DisciplineJudgeRow from "./DisciplineJudgeRow";

export default class DisciplineJudges extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            defaultValue: PT.arrayOf(PT.object.isRequired).isRequired,
            judges: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                }).isRequired
            ).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            disciplineJudges: this.props.defaultValue.map(dj => ({
                judge_id: dj.judge.id,
                role: dj.role,
            })),
        };
    }

    get value() {
        return this.state.disciplineJudges;
    }

    modifyValue(func) {
        let djs = this.state.disciplineJudges.slice();
        func(djs);
        this.setState({
            disciplineJudges: djs,
        });
    }

    handleAddition = () => {
        this.modifyValue(discipline_judges => {
            discipline_judges.push({
                judge_id: this.props.judges[0] && this.props.judges[0].id,
                role: rules_set.meta.judge_roles[0],
            });
        });
    }
    handleChange = (idx, value) => {
        this.modifyValue(discipline_judges => {
            discipline_judges[idx] = value;
        });
    }
    handleDeletion = (idx) => {
        this.modifyValue(discipline_judges => {
            discipline_judges.splice(idx, 1);
        });
    }

    render() {
        return (
            <div className="discipline-judges">
                { this.state.disciplineJudges.map((dj, idx) =>
                    <DisciplineJudgeRow
                        disciplineJudge={ dj }
                        idx={ idx }
                        judges={ this.props.judges }
                        key={ idx }
                        onChange={ this.handleChange }
                        onDelete={ this.handleDeletion }
                    />
                ) }
                <button
                    className="add"
                    type="button"
                    onClick={ this.handleAddition }
                >
                    { _("global.buttons.add") }
                </button>
            </div>
        );
    }
}

DisciplineJudges.displayName = "AdminPanel_Management_Disciplines_EditorRow_DisciplineJudges";
