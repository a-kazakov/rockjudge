import _ from "l10n";
import { Api } from "server/api";
import { showConfirm } from "ui/dialogs";

import InputForm from "./InputForm";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            tour: PT.object.isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    // Handlers

    handleStartEditing = () => {
        this.setState({
            editing: true,
        });
    }
    handleStopEditing = () => {
        this.setState({
            editing: false,
        });
    }
    handleSubmission = (data) => {
        Api("tour.set", {
            tour_id: this.props.tour.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    handleTourDeletion = () => {
        showConfirm(
            _("admin.confirms.delete_tour"),
            () => {
                Api("tour.delete", { tour_id: this.props.tour.id })
                    .onSuccess(() => swal.close())
                    .send();
            }
        );
    }
    // Render

    renderEditor() {
        return (
            <InputForm
                competition={ this.props.competition }
                tour={ this.props.tour }
                onStopEditing={ this.handleStopEditing }
                onSubmit={ this.handleSubmission }
            />
        )
    }
    renderViewer() {
        return (
            <div className="tour" key={ this.props.tour.id }>
                <h3>{ this.props.tour.name }</h3>
                <div className="row">
                    <div className="col-md-5">
                        <p>
                            <strong>
                                { `${_("models.tour.num_advances")}: ` }
                            </strong>
                            { this.props.tour.num_advances }
                        </p>
                        <p>
                            <strong>
                                { `${_("models.tour.participants_per_heat")}: ` }
                            </strong>
                            { this.props.tour.participants_per_heat }
                        </p>
                        <p>
                            <strong>
                                { `${_("models.tour.is_hope_tour")}: ` }
                            </strong>
                            { this.props.tour.hope_tour
                                ? _("global.labels.yes")
                                : _("global.labels.no")
                            }
                        </p>
                    </div>
                    <div className="col-md-5">
                        <p>
                            <strong>
                                { `${_("models.tour.scoring_system_name")}: ` }
                            </strong>
                            { _(`scoring_systems_names.${this.props.tour.scoring_system_name}`) }
                        </p>
                        <p>
                            <strong>
                                { `${_("models.tour.default_program")}: ` }
                            </strong>
                            { this.props.tour.default_program }
                        </p>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="full-width btn btn-primary btn-sm"
                            onClick={ this.handleStartEditing }
                        >
                            { _("global.buttons.edit") }
                        </button>
                        <br />
                        <button
                            className="full-width btn btn-danger btn-sm"
                            onClick={ this.handleTourDeletion }
                        >
                            { _("global.buttons.delete") }
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderViewer();
    }
}

Row.displayName = "AdminPanel_Management_Tours_Row";
