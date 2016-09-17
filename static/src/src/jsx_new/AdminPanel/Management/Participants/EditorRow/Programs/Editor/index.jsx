import _ from "l10n";
import { showError } from "ui/dialogs";

import Elements from "./Elements";

export default class Editor extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            creating: PT.bool,
            program: PT.shape({
                name: PT.string.isRequired,
                default_for: PT.string.isRequired,
                acrobatics: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            creating: false,
        }
    }

    makeElementsRef   = (ref) => this._elements = ref;
    makeNameRef       = (ref) => this._name = ref;
    makeDefaultForRef = (ref) => this._default_for = ref;

    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.serialize());
    }
    handleLoadAcrobatics = () => {
        swal({
            title: _("admin.headers.load_acrobatics"),
            text: _("admin.labels.paste_acro"),
            showCancelButton: true,
            closeOnConfirm: false,
            type: "input",
            animation: false,
        }, value => {
            try {
                const data = JSON.parse(value);
                this._elements.load(data);
                swal.close();
            }
            catch (ex) {
                showError(_("errors.admin.load_syntax_error"));
            }
        });
    }

    serialize() {
        return {
            name: this._name.value,
            default_for: this._default_for.value,
            acrobatics: this._elements.serialize(),
        }
    }
    getClassName() {
        let result = "program-editor";
        if (this.props.creating) {
            result += " create"
        }
        return result;
    }
    render() {
        return (
            <form
                className={ this.getClassName() }
                onSubmit={ this.handleSubmission }
            >
                <input
                    className="name"
                    defaultValue={ this.props.program.name }
                    placeholder={ _("models.program.name") }
                    ref={ this.makeNameRef }
                />
                <input
                    className="default-for"
                    defaultValue={ this.props.program.default_for }
                    placeholder={ _("models.program.default_for") }
                    ref={ this.makeDefaultForRef }
                />
                <Elements
                    elements={ this.props.program.acrobatics }
                    ref={ this.makeElementsRef }
                />
                <div className="pull-right">
                    <button
                        className="btn btn-sm btn-default"
                        type="button"
                        onClick={ this.handleLoadAcrobatics }
                    >
                        { _("admin.buttons.load_acro") }
                    </button>
                </div>
                <button className="btn btn-sm btn-primary">
                    { _("global.buttons.submit") }
                </button>
                <button
                    className="btn btn-sm btn-danger"
                    type="button"
                    onClick={ this.props.onStopEditing }
                >
                    { _("global.buttons.discard") }
                </button>
            </form>
        );
    }
}

Editor.displayName = "AdminPanel_Management_Participants_EditorRow_Programs_Editor";
