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
    renderDiscipline(ic) {
        return <details className="block" key={ ic.id } open={ !!parseInt(sessionStorage.getItem("D_J_" + ic.id)) }>
            <summary className="level-1" onClick={ (e) => sessionStorage.setItem("D_J_" + ic.id, e.target.parentNode.open ? 0 : 1) }>
                { ic.name }
            </summary>
            { ic.tours.map(this.renderTour.bind(this)) }
        </details>
    }
    render() {
        var data = this.props.disciplines.map(function(ic) {
            return this.renderDiscipline(ic);
        }.bind(this));
        return <div className="noselect">{ data }</div>;
    }
}

class JudgingUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tour_id: this.getTourIdFromHash(),
        };
    }
    updateTourId(new_tour_id) {
        this.setState({
            tour_id: new_tour_id,
        });
        window.location.hash = "#judging/" + new_tour_id;
    }
    getTourIdFromHash(app) {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[1] && /^\d+$/.test(chunks[1])) {
            return parseInt(chunks[1]);
        }
        return null;
    }
    render() {
        return <table className="app-content">
            <tbody><tr>
                <td className="side-panel">
                    <div className="scroller">
                        <CompetitionSchema
                            disciplines={ this.props.disciplines }
                            updateTourId={ this.updateTourId.bind(this) }
                            current_tour_id={ this.state.tour_id } />
                    </div>
                </td>
                <td>
                    <div className="app-page">
                        { this.state.tour_id === null ? <br />
                            // : <iframe className="judging-frame" src={ "/tour/" + this.state.tour_id } /> }
                            : <TourAdminScoresTable tour_id={ this.state.tour_id } key={ this.state.tour_id } /> }
                    </div>
                </td>
            </tr></tbody>
        </table>;
    }
}
