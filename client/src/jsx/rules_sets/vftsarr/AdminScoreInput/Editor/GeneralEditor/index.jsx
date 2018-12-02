import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

export default class GeneralEditor extends React.Component {
    static propTypes = {
        children: PT.arrayOf(PT.node).isRequired,
        initialData: PT.object.isRequired,
        readOnly: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            values: this.props.initialData,
        };
    }

    handleChange = (key, value) => {
        this.setState({
            values: Object.assign(
                {},
                this.state.values,
                {[key]: value},
            ),
        });
    };

    handleDiscardClick = (event) => {
        event.stopPropagation();
        this.props.onDiscard();
    };
    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.values);
    };

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
        const self = this;
        function prepareChild(child) {
            if (!child) {
                return null;
            }
            return React.cloneElement(
                child,
                {
                    key: child.props.field,
                    readOnly: self.props.readOnly,
                    value: self.state.values[child.props.field],
                    onChange: self.handleChange,
                },
            );
        }
        return (
            <form
                className="score-editor"
                onSubmit={ this.handleSubmission }
            >
                <div className="fields">
                    { React.Children.map(this.props.children, prepareChild) }
                </div>
                { this.renderButtons() }
            </form>
        );
    }
}
