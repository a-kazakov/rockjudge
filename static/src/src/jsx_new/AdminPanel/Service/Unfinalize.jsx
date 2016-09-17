import { _ } from "l10n/loader";
import { Api } from "server/api";

export default class Unfinalize extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        name: PT.string.isRequired,
                        tours: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                                finalized: PT.bool.isRequired,
                                name: PT.string.isRequired,
                            }).isRequired
                        ).isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    makeSelectRef = (ref) => this._select = ref;

    handleFormSubmit = (event) => {
        event.preventDefault();
        swal({
            title: _("admin.headers.unfinalize_tour"),
            text: _("admin.confirms.unfinalize_tour"),
            showCancelButton: true,
            closeOnConfirm: false,
            type: "input",
            animation: false,
        }, (value) => {
            if (value !== "unfinalize") {
                swal.showInputError(_("admin.messages.invalid_passcode"));
                return false;
            }
            Api("tour.unfinalize", {
                tour_id: Number(this._select.value),
            })
                .onSuccess(() => {
                    swal({
                        title: _("global.messages.success"),
                        animation: false,
                        type: "success",
                    });
                })
                .send();
        });
    }

    render() {
        let eligible_tours = [];
        for (const discipline of this.props.competition.disciplines) {
            for (let idx = discipline.tours.length - 1; idx >= 0; --idx) {
                const tour = discipline.tours[idx];
                if (tour.finalized) {
                    eligible_tours.push(
                        <option key={ tour.id } value={ tour.id }>
                            { `${discipline.name} — ${tour.name}` }
                        </option>
                    );
                    break;
                }
            }
        }
        if (eligible_tours.length === 0) {
            return (
                <div className="alert alert-danger">
                    { _("admin.alerts.no_finalized") }
                </div>
            );
        }
        return (
            <div>
                <div className="alert alert-danger">
                    { _("admin.alerts.unfinalize_warning") }
                </div>
                <form
                    className="unfinalization"
                    onSubmit={ this.handleFormSubmit }
                >
                    <select
                        className="form-control"
                        ref={ this.makeSelectRef }
                    >
                        { eligible_tours }
                    </select>
                    <button className="btn btn-primary" type="submit">
                        { _("admin.buttons.unfinalize") }
                    </button>
                </form>
            </div>
        );
    }
}

Unfinalize.displayName = "AdminPanel_Service_Unfinalize";
