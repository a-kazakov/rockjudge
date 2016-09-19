import _ from "l10n";

import Item from "./Item";

export default class GeneralEditor extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            fields: PT.arrayOf(
                PT.shape({
                    key: PT.string.isRequired,
                    label: PT.string.isRequired,
                    options: PT.arrayOf(
                        PT.arrayOf(PT.string.isRequired).isRequired
                    ).isRequired,
                    defaultValue: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            readOnly: PT.bool.isRequired,
            onDiscard: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }

    constructor(props) {
        super(props);
        let initial_values = {};
        for (const f of this.props.fields) {
            initial_values[f.key] = f.defaultValue;
        }
        this.state = {
            values: initial_values,
        };
    }

    handleChange = (key, value) => {
        let values = Object.assign({}, this.state.values);
        values[key] = value;
        this.setState({ values });
    }
    handleDiscardClick = (event) => {
        event.stopPropagation();
        this.props.onDiscard();
    }
    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.values);
    }

    renderButtons() {
        if (this.props.readOnly) {
            return (
                <div className="buttons">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={ this.handleDiscardClick }
                    >
                    { _("global.buttons.close") }
                    </button>
                </div>
            );
        }
        return (
            <div className="buttons">
                <button
                    className="submit-button"
                    type="submit"
                >
                    { _("global.buttons.submit") }
                </button>
                &nbsp;
                <button
                    className="discard-button"
                    type="button"
                    onClick={ this.handleDiscardClick }
                >
                    { _("global.buttons.discard") }
                </button>
            </div>
        );
    }
    render() {
        return (
            <form
                className="score-editor"
                onSubmit={ this.handleSubmission }
            >
                <div className="fields">
                    { this.props.fields.map((f, idx) =>
                        <Item
                            field={ f }
                            key={ f.key }
                            readOnly={ this.props.readOnly }
                            value={ this.state.values[f.key] }
                            onChange={ this.handleChange }
                        />
                    ) }
                </div>
                { this.renderButtons() }
            </form>
        );
    }
}

GeneralEditor.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_GeneralEditor";
