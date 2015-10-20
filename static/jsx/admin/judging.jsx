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
                    <div className="scroller">
                        <CompetitionSchema
                            inner_competitions={ this.props.inner_competitions }
                            updateTourId={ this.updateTourId.bind(this) }
                            current_tour_id={ this.state.tour_id } />
                    </div>
                </td>
                <td>
                    { this.state.tour_id === null ? <br />
                        : <iframe className="judging-frame" src={ "/tour/" + this.state.tour_id } /> }
                </td>
            </tr></tbody>
        </table>;
    }
}
