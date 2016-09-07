import Editor from "./Editor";

export default class AcrobaticsCell extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            editing: PT.bool.isRequired,
            readOnly: PT.bool.isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
                program_name: PT.string,
                acrobatics: PT.arrayOf(
                    PT.shape({
                        score: PT.number.isRequired,
                        original_score: PT.number.isRequired,
                    }).isRequired
                ),
            }).isRequired,
            onEditRequest: PT.func.isRequired,
            onStopEditing: PT.func.isRequired,
        };
    }

    handleStartEditing = () => {
        this.props.onEditRequest({
            type: "acrobatics",
            run_id: this.props.run.id,
        });
    }

    render() {
        if (this.props.editing) {
            return (
                <td className="acrobatics editing">
                    <Editor
                        readOnly={ this.props.readOnly }
                        run={ this.props.run }
                        onStopEditing={ this.props.onStopEditing }
                    />
                </td>
            );
        }
        if (this.props.run.program_name === null) {
            return (
                <td
                    className="acrobatics"
                    onClick={ this.handleStartEditing }
                >
                    &mdash;
                </td>
            );
        }
        let has_overrides = false;
        let original_score = 0;
        let score = 0;
        for (const acro of this.props.run.acrobatics) {
            original_score += acro.original_score;
            score += acro.score;
            has_overrides = has_overrides || acro.score !== acro.original_score;
        }
        return (
            <td
                className="acrobatics"
                onClick={ this.handleStartEditing }
            >
               { has_overrides
                    ? original_score.toFixed(1) + " → " + score.toFixed(1)
                    : score.toFixed(1) }
            </td>
        );
    }
}

AcrobaticsCell.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Row_AcrobaticsCell";
