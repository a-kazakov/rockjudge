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
        return <div className={ className } onClick={ this.activateTour.bind(this, tour.id) }>
            { tour.name }
        </div>
    }
    renderInnerCompetition(ic) {
        return <details open="true" className="block">
            <summary className="level-1">{ ic.name }</summary>
            { ic.tours.map(this.renderTour.bind(this)) }
        </details>
    }
    render() {
        var data = this.props.schema.map(function(ic) {
            return this.renderInnerCompetition(ic);
        }.bind(this));
        return <div className="noselect">{ data }</div>;
    }
}

class JudgingUI extends React.Component {
    constructor(props) {
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
                        schema={ this.props.schema }
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
        return <form onSubmit={ this.onSubmit.bind(this) } className="load-competition">
            <textarea
                defaultValue=""
                ref={(c) => this._input = c}
                placeholder="Insert serialized data here ..." />
            <button type="submit">Apply</button>
        </form>
    }
    onSubmit(event) {
        event.preventDefault();
        (new Api("tournaments.competition.load", {
            competition_id: this.props.competition_id,
            data: JSON.parse(this._input.getDOMNode().value),
        })).onSuccess(function() { alert("Success."); }).send();
    }
}

class InnerCompetitionManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
        }
        loadData();
    }
    loadData() {
        (new Api("tournaments.inner_competition.get", {
            inner_competition_id: this.props.competition_id,
            recursive: true,
        })).onSuccess(function(response) {
            this.setState(response);
        }.bind(this)).send();
    }
    render() {
        if (this.state.id === null) {
            return <span>Loading ...</span>
        }
        return <header>
            <h1>{ this.state.name }</h1>
        </header>
    }
}

class ManagmentUI extends React.Component {
    renderInnerCompetition(ic) {
        return <div className="level-2">
            { ic.name }
        </div>
    }
    render() {
        var ics = this.props.schema.map(function(ic) {
            return this.renderInnerCompetition(ic);
        }.bind(this));
        return <table className="app-content">
            <tbody><tr>
                <td className="side-panel">
                    <div className="block">
                        <div className="level-1 active">
                            Load competition data
                        </div>
                    </div>
                    <details className="block">
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
                    <CompetitionLoadingUI
                        competition_id={ this.props.competition_id } />
                </td>
            </tr></tbody>
        </table>;
    }
    createInnerCommpetition() {
        var name = prompt("Enter the name of new competition:");
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
                schema={ this.state.inner_competitions } />;
        case "management":
            return <ManagmentUI
                schema={ this.state.inner_competitions }
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
