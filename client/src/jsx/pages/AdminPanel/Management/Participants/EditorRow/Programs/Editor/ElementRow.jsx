import _ from "l10n";

export default class ElementRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            element: PT.shape({
                description: PT.string.isRequired,
                score: PT.oneOfType([PT.number, PT.string]).isRequired,
            }).isRequired,
            idx: PT.number.isRequired,
            onChange: PT.func.isRequired,
            onDelete: PT.func.isRequired,
        };
    }

    handleChange(field, value) {
        let new_element = Object.assign({}, this.props.element); // clone
        new_element[field] = value;
        this.props.onChange(this.props.idx, new_element);
    }
    handleDescriptionChange = (event) => this.handleChange("description", event.target.value);
    handleScoreChange       = (event) => this.handleChange("score",       event.target.value);
    handleDeletion = () => {
        this.props.onDelete(this.props.idx);
    }

    render() {
        return (
            <div className="acrobatic">
                <input
                    className="description"
                    placeholder={ _("models.participant.acro_description") }
                    type="text"
                    value={ this.props.element.description }
                    onChange={ this.handleDescriptionChange }
                />
                <input
                    className="score"
                    placeholder={ _("models.participant.acro_score") }
                    type="text"
                    value={ this.props.element.score }
                    onChange={ this.handleScoreChange }
                />
                <button
                    className="delete"
                    type="button"
                    onClick={ this.handleDeletion }
                >
                    X
                </button>
            </div>
        );
    }
}

ElementRow.displayName = "AdminPanel_Management_Participants_EditorRow_Programs_Editor_ElementRow";
