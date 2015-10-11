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
        case "manage_judges":
            return <JudgesManagementUI
                judges={ this.props.judges }
                competition_id={ this.props.competition_id } />
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
                        <div className="level-2 new-ic" onClick={ this.createInnerCommpetition.bind(this) }>
                            Add new catagory
                        </div>
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

class AdminUI extends React.Component {

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            active_app: "judging",
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
        console.log(this.state);
        switch (this.state.active_app) {
        case "judging":
            return <JudgingUI
                inner_competitions={ this.state.inner_competitions } />;
        case "management":
            return <ManagmentUI
                inner_competitions={ this.state.inner_competitions }
                judges={ this.state.judges }
                competition_id={ this.props.competition_id } />;
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
