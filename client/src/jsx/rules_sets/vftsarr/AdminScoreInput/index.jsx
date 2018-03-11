import Editor from "./Editor";

export default class AdminScoreInput extends React.PureComponent {
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
                    total_score: PT.string.isRequired,
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
            return (
                <span>
                    { this.props.score.data.total_score }
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

