import Editor from "./Editor";

export default class AdminScoreInput extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                role: PT.string.isRequired,
            }).isRequired,
            editing: PT.bool.isRequired,
            readOnly: PT.bool.isRequired,
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.object.isRequired,
                    total_score: PT.number.isRequired,
                }).isRequired,
            }).isRequired,
            tour: PT.object.isRequired,
            onConfirmationToggle: PT.func.isRequired,
            onDiscard: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    render() {
        if (!this.props.editing) {
            if (
                this.props.disciplineJudge.role === "head_judge" &&
                this.props.score.data.raw_data.nexttour
            ) {
                return (
                    <span>
                        { `[${this.props.score.data.total_score.toFixed(2)}]` }
                    </span>
                );
            }
            if (this.props.disciplineJudge.role === "tech_judge") {
                const tv_str = this.props.score.data.raw_data.timing_violation === null
                    ? "?" : this.props.score.data.raw_data.timing_violation
                        ? "✗" : "✓";
                return (
                    <span>
                        { `${this.props.score.data.raw_data.jump_steps} ${tv_str}` }
                    </span>
                );
            }
            return (
                <span>
                    { this.props.score.data.total_score.toFixed(2) }
                </span>
            );
        } else {
            return (
                <Editor
                    disciplineJudge={ this.props.disciplineJudge }
                    readOnly={ this.props.readOnly }
                    score={ this.props.score }
                    tour={ this.props.tour }
                    onConfirmationToggle={ this.props.onConfirmationToggle }
                    onDiscard={ this.props.onDiscard }
                    onSubmit={ this.props.onSubmit }
                />
            );
        }
    }
}

AdminScoreInput.displayName = "rules_sets_rosfarr_AdminScoreInput";
