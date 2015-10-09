class CompetitionSchema extends React.Component {
    constructor(props) {
        super(props);
    }
    activateTour(tour_id) {
        this.props.updateTourId(tour_id);
    }
    renderTour(tour) {
        var className = "level-2" +
            (tour.finalized ? " grey" : "") +
            (tour.id == this.props.current_tour_id ? " active" : "");
        return <div className={ className } onClick={ this.activateTour.bind(this, tour.id) } key={ tour.id } >
            { tour.name }
        </div>
    }
    renderInnerCompetition(ic) {
        return <details open="true" className="block" key={ ic.id }>
            <summary className="level-1">{ ic.name }</summary>
            { ic.tours.map(this.renderTour.bind(this)) }
        </details>
    }
    render() {
        var data = this.props.inner_competitions.map(function(ic) {
            return this.renderInnerCompetition(ic);
        }.bind(this));
        return <div className="noselect">{ data }</div>;
    }
}

class JudgingUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tour_id: null,
        };
    }
    updateTourId(new_tour_id) {
        this.setState({
            tour_id: new_tour_id,
        });
    }
    render() {
        return <table className="app-content">
            <tbody><tr>
                <td className="side-panel">
                    <CompetitionSchema
                        inner_competitions={ this.props.inner_competitions }
                        updateTourId={ this.updateTourId.bind(this) }
                        current_tour_id={ this.state.tour_id } />
                </td>
                <td>
                    { this.state.tour_id === null ? <br />
                        : <iframe className="judging-frame" src={ "/tour/" + this.state.tour_id } /> }
                </td>
            </tr></tbody>
        </table>;
    }
}

class CompetitionLoadingUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raw_text: "",
        }
    }
    render() {
        return <div className="load-competition-page">
            <header>
                <h1>Load competition data</h1>
            </header>
            <form onSubmit={ this.onSubmit.bind(this) } className="load-competition">
                <textarea
                    defaultValue=""
                    ref={(c) => this._input = c}
                    placeholder="Insert serialized data here ..." />
                <button className="btn btn-primary" type="submit">Apply</button>
            </form>
        </div>
    }
    onSubmit(event) {
        event.preventDefault();
        (new Api("tournaments.competition.load", {
            competition_id: this.props.competition_id,
            data: JSON.parse(this._input.getDOMNode().value),
        })).onSuccess(function() { alert("Success."); }).send();
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
    renderEditor(tour) {
        return <form className="tour form-horizontal" key={ this.props.tour.id } onSubmit={ this.submitTour.bind(this) }>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Name</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="name"
                                defaultValue={ this.props.tour.name } />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Participants advances</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="num_advances"
                                defaultValue={ this.props.tour.num_advances } />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Participants per heat</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="participants_per_heat"
                                defaultValue={ this.props.tour.participants_per_heat } />
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
                                defaultValue={ this.props.tour.scoring_system } />
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
                                        defaultChecked={ this.props.tour.hope_tour } />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <div className="col-sm-offset-4 col-sm-8">
                            <button className="btn btn-primary btn-sm" type="submit">Submit</button>&nbsp;
                            <button className="btn btn-primary btn-sm" type="button" onClick={ this.stopEditing.bind(this) }>Discard</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
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
    submitTour(event) {
        event.preventDefault();
        (new Api("tournaments.tour.set", {
            tour_id: this.props.tour.id,
            data: {
                name: this.refs.name.getDOMNode().value,
                num_advances: this.refs.num_advances.getDOMNode().value,
                participants_per_heat: this.refs.participants_per_heat.getDOMNode().value,
                scoring_system: this.refs.scoring_system.getDOMNode().value,
                hope_tour: this.refs.hope_tour.getDOMNode().checked,
            }
        })).onSuccess(function(response) {
            this.stopEditing();
        }.bind(this)).send();
    }
    deleteTour() {
        if (!confirm("Are you sure want to delete this tour?")) {
            return false;
        }
        (new Api("tournaments.tour.delete", { tour_id: this.props.tour.id })).send();
    }

}

class TourCreatingUI extends React.Component {
    render() {

        return <form className="tour tour-create form-horizontal" onSubmit={ this.submitTour.bind(this) }>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Name</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="name" />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Participants advances</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="num_advances" />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Participants per heat</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="participants_per_heat" />
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
                                ref="scoring_system" />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">Is hope tour</label>
                        <div className="col-sm-8">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        ref="hope_tour" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <div className="col-sm-offset-4 col-sm-8">
                            <button className="btn btn-primary btm-sm" type="submit">Submit</button>&nbsp;
                            <button className="btn btn-primary btm-sm" type="button" onClick={ this.props.stopEditing }>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    }
    submitTour(event) {
        event.preventDefault();
        (new Api("tournaments.tour.create", {
            inner_competition_id: this.props.inner_competition_id,
            add_after: this.props.add_after,
            data: {
                name: this.refs.name.getDOMNode().value,
                num_advances: this.refs.num_advances.getDOMNode().value,
                participants_per_heat: this.refs.participants_per_heat.getDOMNode().value,
                scoring_system: this.refs.scoring_system.getDOMNode().value,
                hope_tour: this.refs.hope_tour.getDOMNode().checked,
            }
        })).onSuccess(function(response) {
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
        (new Api("tournaments.inner_competition.set", {
            inner_competition_id: this.props.inner_competition.id,
            data: {
                name: this.refs.name.getDOMNode().value,
                external_id: this.refs.external_id.getDOMNode().value,
            }
        })).onSuccess(function() {
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

class ManagmentUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "page": "load_competition",
        };
    }
    switchPage(page, props) {
        this.setState({
            page: page,
            page_props: props,
        });
    }
    renderInnerCompetition(ic) {
        return <div
                className={ "level-2" + (
                    this.state.page == "manage_inner_competition"
                        && this.state.page_props.inner_competition_id == ic.id
                        ? " active" : "") }
                key={ ic.id }
                onClick={ this.switchPage.bind(this, "manage_inner_competition", { inner_competition_id: ic.id }) }>
            { ic.name }
        </div>
    }
    renderContent() {
        switch (this.state.page) {
        case "load_competition":
            return <CompetitionLoadingUI competition_id={ this.props.competition_id } />
        case "manage_inner_competition":
            var ic = null;
            this.props.inner_competitions.forEach(function(el) {
                if (el.id == this.state.page_props.inner_competition_id) {
                    ic = el;
                }
            }.bind(this));
            return <InnerCompetitionManagementUI
                key={ this.state.page_props.inner_competition_id }
                inner_competition={ ic } />
        }
    }
    render() {
        var ics = this.props.inner_competitions.map(function(ic) {
            return this.renderInnerCompetition(ic);
        }.bind(this));
        return <table className="app-content">
            <tbody><tr>
                <td className="side-panel">
                    <div className="block">
                        <div
                                className={ "level-1" + (this.state.page == "load_competition" ? " active" : "") }
                                onClick= { this.switchPage.bind(this, "load_competition") } >
                            Load competition data
                        </div>
                    </div>
                    <details open="true" className="block">
                        <summary className="level-1">
                            Manage categories
                        </summary>
                        { ics }
                    </details>
                    <div className="block">
                        <div className="level-1" onClick={ this.createInnerCommpetition.bind(this) }>
                            Add new catagory
                        </div>
                    </div>
                </td>
                <td>
                    <div className="app-page">
                        { this.renderContent() }
                    </div>
                </td>
            </tr></tbody>
        </table>;
    }
    createInnerCommpetition() {
        var name = prompt("Enter the name of new category:");
        if (name === null) {
            return;
        }
        (new Api("tournaments.inner_competition.create", {
            name: name,
            competition_id: this.props.competition_id,
        })).send();
    }
}

class AdminUI extends React.Component {

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            active_app: "judging",
            id: null,
        };
        window.message_dispatcher.addListener("competition_update inner_competition_update tour_update tour_full_update competition_full_update")
            .setCallback(this.loadData.bind(this))
        this.loadData();
    }
    loadData() {
        (new Api("tournaments.competition.get", {competition_id: this.props.competition_id, recursive:true}))
            .onSuccess(function(response) {
                this.setState(response);
            }.bind(this)).send();
    }

    // Listeners

    setApp(app) {
        this.setState({
            active_app: app,
        });
    }

    // Rendering

    renderActiveApp() {
        switch (this.state.active_app) {
        case "judging":
            return <JudgingUI
                inner_competitions={ this.state.inner_competitions } />;
        case "management":
            return <ManagmentUI
                inner_competitions={ this.state.inner_competitions }
                competition_id={ this.props.competition_id } />;
        }
    }
    render() {
        if (this.state.id === null) {
            return <span>Loading...</span>;
        }
        return <table className="outer-table">
            <tbody><tr>
                <th colSpan="2">
                    { this.state.name }
                </th>
            </tr><tr>
                <td className="left-col noselect">
                    <div className={ "app" + (this.state.active_app == "management" ? " active" : "") } onClick={ this.setApp.bind(this, "management") }>
                        <div className="icon">M</div>
                        <div className="label">Management</div>
                    </div>
                    <div className={ "app" + (this.state.active_app == "judging" ? " active" : "") } onClick={ this.setApp.bind(this, "judging") }>
                        <div className="icon">J</div>
                        <div className="label">Judging</div>
                    </div>
                    <div className="app">
                        <div className="icon">R</div>
                        <div className="label">Results</div>
                    </div>
                    <div className="app">
                        <div className="icon">S</div>
                        <div className="label">Service</div>
                    </div>
                </td>
                <td>
                    { this.renderActiveApp() }
                </td>
            </tr></tbody>
        </table>;
    }
}
