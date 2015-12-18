class TourInputForm extends React.Component {
    render() {
        let classes = ["tour", ""].concat(this.props.classes || []).join(" ");
        let tour = this.props.tour || { id: "new" }
        return <form className={ classes } key={ tour.id } onSubmit={ this.submitTour.bind(this) }>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-group-sm">
                        <label className="control-label">{ _("models.tour.name") }</label>
                        <input
                            list="dl_tours"
                            type="text"
                            className="form-control"
                            ref="name"
                            defaultValue={ tour.name } />
                    </div>
                    <div className="form-group form-group-sm row">
                        <div className="col-lg-4">
                            <label className="control-label">{ _("models.tour.num_advances") }</label>
                            <input
                                type="text"
                                className="form-control"
                                ref="num_advances"
                                disabled={ tour.finalized }
                                defaultValue={ tour.num_advances }  />
                        </div>
                        <div className="col-lg-4">
                            <label className="control-label">{ _("models.tour.participants_per_heat") }</label>
                            <input
                                type="text"
                                className="form-control"
                                ref="participants_per_heat"
                                defaultValue={ tour.participants_per_heat || 2 } />
                        </div>
                        <div div className="col-lg-4">
                            <label className="control-label">{ _("models.tour.is_hope_tour") }</label>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        ref="hope_tour"
                                        disabled={ tour.finalized }
                                        defaultChecked={ tour.hope_tour } />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group form-group-sm">
                        <label className="control-label">{ _("models.tour.scoring_system_name") }</label>
                        <select
                            className="form-control"
                            ref="scoring_system_name"
                            disabled={ tour.finalized }
                            defaultValue={ tour.scoring_system_name || GL.scoring_systems[0] } >
                            { GL.scoring_systems.map((sn) => <option key={ sn } value={ sn }>{ _("scoring_systems_names." + sn) }</option>) }
                        </select>
                    </div>
                    <div className="form-group form-group-sm row">
                        <div className="col-lg-6">
                            <label className="control-label">{ _("models.tour.default_program") }</label>
                            <input
                                type="text"
                                list="dl_programs"
                                className="form-control"
                                ref="default_program"
                                defaultValue={ tour.default_program || "" } />
                        </div>
                        <div className="col-lg-6">
                            <label className="control-label">&nbsp;</label>
                            <div className="text-right">
                                <button className="btn btn-primary btn-sm" type="submit">{ _("global.buttons.submit") }</button>&nbsp;
                                <button className="btn btn-primary btn-sm" type="button" onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    }
    submitTour(event) {
        event.preventDefault();
        this.props.submitTour(this.serialize());
    }
    serialize() {
        let result = {
            name: this.refs.name.value,
            participants_per_heat: this.refs.participants_per_heat.value,
            default_program: this.refs.default_program.value,
        };
        if (!this.props.tour || !this.props.tour.finalized) {
            $.extend(result, {
                num_advances: this.refs.num_advances.value,
                scoring_system_name: this.refs.scoring_system_name.value,
                hope_tour: this.refs.hope_tour.checked,
            })
        }
        return result;
    }
}

class TourEditingUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }
    startEditing() {
        this.setState({
            editing: true,
        });
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
    }
    renderEditor() {
        return <TourInputForm
            tour={ this.props.tour }
            submitTour={ this.submitTour.bind(this) }
            stopEditing={ this.stopEditing.bind(this) } />
    }
    renderViewer() {
        return <div className="tour" key={ this.props.tour.id }>
            <h3>{ this.props.tour.name }</h3>
            <div className="row">
                <div className="col-md-5">
                    <p><strong>{ _("models.tour.num_advances") }:</strong> { this.props.tour.num_advances } </p>
                    <p><strong>{ _("models.tour.participants_per_heat") }:</strong> { this.props.tour.participants_per_heat } </p>
                    <p><strong>{ _("models.tour.is_hope_tour") }:</strong> { this.props.tour.hope_tour ? _("global.labels.yes") :  _("global.labels.no") } </p>
                </div>
                <div className="col-md-5">
                    <p><strong>{ _("models.tour.scoring_system_name") }:</strong> { _("scoring_systems_names." + this.props.tour.scoring_system_name) } </p>
                    <p><strong>{ _("models.tour.default_program") }:</strong> { this.props.tour.default_program } </p>
                </div>
                <div className="col-md-2">
                    <button className="full-width btn btn-primary btn-sm" onClick={ this.startEditing.bind(this) }>{ _("global.buttons.edit") }</button><br />
                    <button className="full-width btn btn-danger btn-sm" onClick={ this.deleteTour.bind(this) }>{ _("global.buttons.delete") }</button>
                </div>
            </div>
        </div>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderViewer();
    }
    submitTour(data) {
        Api("tour.set", {
            tour_id: this.props.tour.id,
            data: data,
        }).onSuccess(function(response) {
            this.stopEditing();
        }.bind(this)).send();
    }
    deleteTour() {
        if (!confirm(_("admin.confirms.delete_tour"))) {
            return false;
        }
        Api("tour.delete", { tour_id: this.props.tour.id }).send();
    }
}

class TourCreatingUI extends React.Component {
    render() {
        return <TourInputForm
            classes={ ["tour-create"] }
            submitTour={ this.submitTour.bind(this) }
            stopEditing={ this.props.stopEditing } />

    }
    submitTour(data) {
        Api("tour.create", {
            discipline_id: this.props.discipline_id,
            add_after: this.props.add_after,
            data: data,
        }).onSuccess(function(response) {
            this.props.stopEditing();
        }.bind(this)).send();
    }
}

class ToursManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_tour_after_id: -1,
        }
    }
    addTourAfter(tour_id) {
        this.setState({
            new_tour_after_id: tour_id,
        });
    }
    renderTourCreation(after_id, next_tour) {
        if (next_tour && next_tour.finalized) {
            return null;
        }
        if (after_id === this.state.new_tour_after_id) {
            return <TourCreatingUI
                discipline_id={ this.props.discipline.id }
                add_after={ after_id }
                stopEditing={ this.addTourAfter.bind(this, -1) } />
        } else {
            return <button className="btn btn-default full-width" onClick={ this.addTourAfter.bind(this, after_id) }>
                { _("admin.buttons.add_tour") }
            </button>
        }
    }
    renderTours() {
        return this.props.discipline.tours.map(function(tour, idx, arr) {
            return [
                <TourEditingUI tour={ tour } key={ tour.id } />,
                this.renderTourCreation(tour.id, arr[idx + 1])
            ];
        }.bind(this));
    }
    render() {
        return <div className="app-content">
            <header className="app-header">
                <h1>{ this.props.discipline.name }</h1>
            </header>
            <div className="app-body ic-management-ui">
                { this.renderTourCreation(null, this.props.discipline.tours[0]) }
                { this.renderTours() }
            </div>
            <datalist id="dl_tours">
                { _getPossibleTourNames().map((n, idx) => <option key={ idx } value={ n } />) }
            </datalist>
            <datalist id="dl_programs">
                { GL.suggested_programs.map((n, idx) => <option key={ idx } value={ n } />) }
            </datalist>
        </div>
    }
}
