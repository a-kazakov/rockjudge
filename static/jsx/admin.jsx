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
        Api("tournaments.competition.load", {
            competition_id: this.props.competition_id,
            data: JSON.parse(this._input.getDOMNode().value),
        }).onSuccess(function() { alert("Success."); }).send();
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
    renderInnerCompetition(ic, page) {
        return <div
                className={ "level-2" + (
                    this.state.page == page
                        && this.state.page_props.inner_competition_id == ic.id
                        ? " active" : "") }
                key={ ic.id }
                onClick={ this.switchPage.bind(this, page, { inner_competition_id: ic.id }) }>
            { ic.name }
        </div>
    }
    renderContent() {
        switch (this.state.page) {
        case "load_competition":
            return <CompetitionLoadingUI competition_id={ this.props.competition_id } />
        case "manage_inner_competition":
            // Seeking for inner competition with give ID
            let ic = null;
            this.props.inner_competitions.forEach(function(el) {
                if (el.id == this.state.page_props.inner_competition_id) {
                    ic = el;
                }
            }.bind(this));
            return <InnerCompetitionManagementUI
                key={ this.state.page_props.inner_competition_id }
                inner_competition={ ic } />
        case "manage_participants":
            return <iframe src={ "/participants/" + this.state.page_props.inner_competition_id.toString() } />
        case "manage_judges":
            return <JudgesManagementUI
                judges={ this.props.judges }
                competition_id={ this.props.competition_id } />
        }
    }
    render() {
        var ics_management = this.props.inner_competitions.map(function(ic) {
            return this.renderInnerCompetition(ic, "manage_inner_competition");
        }.bind(this));
        var ics_participants = this.props.inner_competitions.map(function(ic) {
            return this.renderInnerCompetition(ic, "manage_participants");
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
                        { ics_management }
                        <div className="level-2 new-ic" onClick={ this.createInnerCommpetition.bind(this) }>
                            Add new catagory
                        </div>
                    </details>
                    <details open="true" className="block">
                        <summary className="level-1">
                            Manage participants
                        </summary>
                        { ics_participants }
                    </details>
                    <div className="block">
                        <div
                                className={ "level-1" + (this.state.page == "manage_judges" ? " active" : "") }
                                onClick={ this.switchPage.bind(this, "manage_judges") }>
                            Manage judges
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
        Api("tournaments.inner_competition.create", {
            name: name,
            competition_id: this.props.competition_id,
        }).send();
    }
}

class ServiceUI extends React.Component {
    constructor(props) {
        super(props);
    }
    reloadClients() {
        if (confirm("Are you sure want to reload all clients?")) {
            Api("tournaments.service.reload_clients", {}).send();
        }
    }
    refreshClients() {
        if (confirm("Are you sure want to refresh all clients?")) {
            Api("tournaments.service.refresh_clients", {}).send();
        }
    }
    unfinalizeTour(event) {
        event.preventDefault();
        if (prompt("Are you sure want to unfinalize this tour? Type \"unfinalize\" below if you are") == "unfinalize") {
            Api("tournaments.tour.unfinalize", {
                tour_id: this.refs.select_unfinalize.getDOMNode().value,
            }).onSuccess(function(event) {
                alert("Success.");
            }).send();
        } else {
            alert("Incorrect passcode.");
        }
    }
    renderUnfinalize() {
        let eligible_tours = [];
        this.props.inner_competitions.forEach(function(ic) {
            for (var idx = ic.tours.length - 1; idx >= 0; --idx) {
                let tour = ic.tours[idx];
                if (tour.finalized) {
                    eligible_tours.push(<option value={ tour.id } key={ tour.id }>
                            { ic.name } &mdash; { tour.name }
                        </option>);
                    break;
                }
            }
        });
        if (eligible_tours.length == 0) {
            return <div className="alert alert-danger">
                No finalized rounds found.
            </div>
        }
        return <div>
            <div className="alert alert-danger">
                <p><strong>Please note, that rounds should be unfinalized in exceptional cases only!</strong></p>
                <p>Anyway, if you need to do that, keep track on participants that advance to the next round.
                After repeated finalization list of participants of the next round will be automatically recreated.
                If some participants advanced to the next round during first finalization are not advanced after
                    repeated one theirs scores for the next round will be lost forever!</p>
                <p>And don't forget to re-print all the tables of this and next rounds.</p>
            </div>
            <form className="unfinalization" onSubmit={ this.unfinalizeTour.bind(this) }>
                <select className="form-control" ref="select_unfinalize">
                    { eligible_tours }
                </select>
                <button className="btn btn-primary" type="submit">Unfinalize</button>
            </form>
        </div>
    }
    render() {
        return <div>
            <header>
                <h1>Service menu</h1>
            </header>
            <div className="service-menu">
                <h3>Clients management</h3>
                <button className="btn btn-primary control-btn" onClick={ this.reloadClients.bind(this) } >
                    Reload data on all clients
                </button>
                <button className="btn btn-primary control-btn" onClick={ this.refreshClients.bind(this) }>
                    Refresh all clients
                </button>
                <h3>Unfinalize round</h3>
                { this.renderUnfinalize() }
            </div>
        </div>;
    }
}

class AdminUI extends React.Component {

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            active_app: "management",
            name: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        this.setState(
            storage.get("Competition")
                .by_id(this.props.competition_id)
                .serialize());
    }
    loadData() {
        Api("tournaments.competition.get", {
            competition_id: this.props.competition_id,
            children: {
                judges: {},
                inner_competitions: {
                    tours: {},
                }
            }
        })
        .updateDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
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
                judges={ this.state.judges }
                competition_id={ this.props.competition_id } />;
        case "service":
            return <ServiceUI
                inner_competitions={ this.state.inner_competitions } />
        }
    }
    render() {
        if (this.state.name === null) {
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
                    <div className={ "app" + (this.state.active_app == "service" ? " active" : "") } onClick={ this.setApp.bind(this, "service") }>
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
