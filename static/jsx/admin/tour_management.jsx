class TourInputForm extends React.Component {
    render() {
        var classes = ["tour", "form-horizontal"].concat(this.props.classes || []).join(" ");
        var tour = this.props.tour || { id: "new" }
        return <form className={ classes } key={ tour.id } onSubmit={ this.submitTour.bind(this) }>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Name</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="name"
                                defaultValue={ tour.name } />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Participants advances</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="num_advances"
                                defaultValue={ tour.num_advances }  />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Participants per heat</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="participants_per_heat"
                                defaultValue={ tour.participants_per_heat } />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Scoring system</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="scoring_system"
                                defaultValue={ tour.scoring_system } />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Is hope tour</label>
                        <div className="col-sm-8">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        ref="hope_tour"
                                        defaultChecked={ tour.hope_tour } />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <div className="col-sm-offset-4 col-sm-8">
                            <button className="btn btn-primary btn-sm" type="submit">Submit</button>&nbsp;
                            <button className="btn btn-primary btn-sm" type="button" onClick={ this.props.stopEditing }>Discard</button>
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
        return {
            name: this.refs.name.getDOMNode().value,
            num_advances: this.refs.num_advances.getDOMNode().value,
            participants_per_heat: this.refs.participants_per_heat.getDOMNode().value,
            scoring_system: this.refs.scoring_system.getDOMNode().value,
            hope_tour: this.refs.hope_tour.getDOMNode().checked,
        };
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
                    <p><strong>Participants advances:</strong> {this.props.tour.num_advances } </p>
                    <p><strong>Participants per heat:</strong> {this.props.tour.participants_per_heat } </p>
                </div>
                <div className="col-md-5">
                    <p><strong>Is hope tour:</strong> { this.props.tour.hope_tour ? "Yes" : "No" } </p>
                    <p><strong>Scoring system:</strong> {this.props.tour.scoring_system } </p>
                </div>
                <div className="col-md-2">
                    <button className="full-width btn btn-primary btn-sm" onClick={ this.startEditing.bind(this) }>Edit</button><br />
                    <button className="full-width btn btn-danger btn-sm" onClick={ this.deleteTour.bind(this) }>Delete</button>
                </div>
            </div>
        </div>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderViewer();
    }
    submitTour(data) {
        Api("tournaments.tour.set", {
            tour_id: this.props.tour.id,
            data: data,
        }).onSuccess(function(response) {
            this.stopEditing();
        }.bind(this)).send();
    }
    deleteTour() {
        if (!confirm("Are you sure want to delete this tour?")) {
            return false;
        }
        Api("tournaments.tour.delete", { tour_id: this.props.tour.id }).send();
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
        Api("tournaments.tour.create", {
            inner_competition_id: this.props.inner_competition_id,
            add_after: this.props.add_after,
            data: data,
        }).onSuccess(function(response) {
            this.props.stopEditing();
        }.bind(this)).send();
    }
}

class InnerCompetitionManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_tour_after_id: -1,
        }
    }
    submitBaseData(event) {
        event.preventDefault();
        Api("tournaments.inner_competition.set", {
            inner_competition_id: this.props.inner_competition.id,
            data: {
                name: this.refs.name.getDOMNode().value,
                external_id: this.refs.external_id.getDOMNode().value,
            }
        }).onSuccess(function() {
            alert("Success.");
        }).send();
    }
    addTourAfter(tour_id) {
        this.setState({
            new_tour_after_id: tour_id,
        });
    }
    renderTourCreation(after_id) {
        if (after_id === this.state.new_tour_after_id) {
            return <TourCreatingUI
                inner_competition_id={ this.props.inner_competition.id }
                add_after={ after_id }
                stopEditing={ this.addTourAfter.bind(this, -1) } />
        } else {
            return <button className="btn btn-default full-width" onClick={ this.addTourAfter.bind(this, after_id) }>
                Add another tour here
            </button>
        }
    }
    renderTours() {
        return this.props.inner_competition.tours.map(function(tour) {
            return [
                <TourEditingUI tour={ tour } key={ tour.id } />,
                this.renderTourCreation(tour.id)
            ];
        }.bind(this));
    }
    render() {
        return <div>
            <header>
                <h1>{ this.props.inner_competition.name }</h1>
            </header>
            <div className="ic-management-ui">
                <h2>Basic info</h2>
                <form className="form-horizontal" onSubmit={ this.submitBaseData.bind(this) }>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" ref="name" className="form-control" defaultValue={ this.props.inner_competition.name } />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">External ID</label>
                        <div className="col-sm-10">
                            <input type="text" ref="external_id" className="form-control" defaultValue={ this.props.inner_competition.external_id } />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
                <h2>Tours</h2>
                { this.renderTourCreation(null) }
                { this.renderTours() }
            </div>
        </div>
    }
}
