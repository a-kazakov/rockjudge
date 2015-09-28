class CompetitionSchema extends React.Component {
    constructor(props) {
        super(props);
    }
    activateTour(tour_id) {
        this.props.updateTourId(tour_id);
    }
    renderTour(tour) {
        var className = "tour" +
            (tour.finalized ? " finalized" : "") +
            (tour.id == this.props.current_tour_id ? " current" : "");
        return <div className={ "tour " + className } onClick={ this.activateTour.bind(this, tour.id) }>
            { tour.name }
        </div>
    }
    renderInnerCompetition(ic) {
        return <details open="true" className="inner-competition">
            <summary className="name">{ ic.name }</summary>
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
        return <table className="judging-ui">
            <tbody><tr>
                <td className="competition-schema">
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

class AdminUI extends React.Component {

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            active_app: "judging",
            id: null,
        };
        window.message_dispatcher.subscribe("competition_update", this.onConmeptitionUpdate.bind(this));
        window.message_dispatcher.subscribe("tour_update", this.onTourUpdate.bind(this));
        this.loadData();
    }
    loadData() {
        Api.get_competition(this.props.competition_id, function(response) {
            this.setState(response);
        }.bind(this));
    }

    // Dispatchers

    onConmeptitionUpdate(competition_id, new_comp) {
        if (this.state.id == competition_id) {
            this.setState(new_comp);
        }
    }
    onTourUpdate(tour_id, new_tour) {
        var updated = false;
        var new_inners = this.state.inner_competitions.map(function(inner) {
            var new_inner = $.extend(true, {}, inner);
            new_inner.tours = new_inner.tours.map(function(tour) {
                if (tour.id == tour_id) {
                    updated = true;
                    return new_tour;
                }
                return tour;
            });
            return new_inner;
        });
        if (updated) {
            this.setState({
                inner_competitions: new_inners,
            });
        }
    }

    // Rendering

    renderActiveApp() {
        switch (this.state.active_app) {
        case "judging":
            return <JudgingUI
                schema={ this.state.inner_competitions } />;
        }
    }
    render() {
        if (this.state.id === null) {
            return <span>Loading...</span>;
        }
        return <table className="outer-table">
            <tbody><tr>
                <td className="left-col noselect">
                    <div className="app">
                        <div className="icon">R</div>
                        <div className="label">Results</div>
                    </div>
                    <div className="app active">
                        <div className="icon">J</div>
                        <div className="label">Judging</div>
                    </div>
                    <div className="app">
                        <div className="icon">M</div>
                        <div className="label">Management</div>
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
