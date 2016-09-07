import { _ } from "l10n/loader";
import { Api } from "server/api";
import { showConfirm } from "ui/dialogs";

export default class Loader extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                id: PT.number.isRequired,
                participant: PT.shape({
                    programs: PT.arrayOf(
                        PT.shape({
                            id: PT.number.isRequired,
                            name: PT.string.isRequired,
                        }).isRequired
                    ).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    makeSelectorRef = (ref) => this._selector = ref;

    handleSubmission = (e) => {
        e.preventDefault();
        const program_id_str = this._selector.value;
        const program_id = program_id_str === ""
            ? null
            : parseInt(program_id_str);
        showConfirm(
            _("judging.confirms.load_program"),
            () => {
                Api("run.load_program", {
                    program_id: program_id,
                    run_id: this.props.run.id,
                })
                    .onSuccess(() => swal.close())
                    .send();
            }
        );
    }

    renderSelector() {
        return (
            <select
                defaultValue=""
                ref={ this.makeSelectorRef }
            >
                <option value="">&mdash;</option>
                { this.props.run.participant.programs.map(program =>
                    <option key={ program.id }  value={ program.id }>
                        { program.name }
                    </option>
                ) }
            </select>
        );
    }
    render() {
        return (
            <form
                className="acro-loader pull-left"
                onSubmit={ this.handleSubmission }
            >
                { this.renderSelector() }
                <button
                    className="btn btn-primary btn-sm"
                    type="submit"
                >
                    { _("global.buttons.load") }
                </button>
            </form>
        );
    }
}

Loader.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Row_AcrobaticsCell_Editor_Loader";
