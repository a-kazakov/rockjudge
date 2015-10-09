class TourResultsVerboseTableRow extends React.Component {
    renderDanceScore(score) {
        return <table className="score-breakdown">
            <tr><th>FW:</th><td>-{ score.raw_data.fw_woman }%</td></tr>
            <tr><th>FM:</th><td>-{ score.raw_data.fw_man }%</td></tr>
            <tr><th>DF:</th><td>{ score.raw_data.dance_figs }</td></tr>
            <tr><th>C:</th><td>{ score.raw_data.composition }</td></tr>
            <tr><th>BM:</th><td>{ score.raw_data.big_mistakes }</td></tr>
            <tr><th>SM:</th><td>{ score.raw_data.small_mistakes }</td></tr>
            <tr><th>T:</th><td className="total-score">{ score.total_score }</td></tr>
        </table>
    }
    renderAcroScore(score) {
        var acro_scores = score.raw_data.deductions.map(function(score, idx) {
            return <tr key={ idx }>
                <th>A{ idx + 1 }:</th>
                <td>-{ score }%</td>
            </tr>
        }.bind(this));
        return <table className="score-breakdown">
            { acro_scores }
            <tr><th>FD:</th><td>{ score.raw_data.mistakes }</td></tr>
            <tr><th>T:</th><td className="total-score">{ score.total_score }</td></tr>
        </table>
    }
    renderScore(judge, score) {
        if (judge.role == "dance_judge") {
            return this.renderDanceScore(score);
        }
        if (judge.role == "acro_judge") {
            if (this.props.scoring_system == "rosfarr.acro") {
                return this.renderAcroScore(score);
            } else {
                return this.renderDanceScore(score);
            }
        }
        return <span>{ score.total_score} </span>
    }
    render() {
        var next_tour_cell = this.props.has_next_tour
            ? <td className="next-tour">{ this.props.row.advances ? "Yes" : "No" }</td>
            : null;
        var judges_scores = this.props.judges.map(function(judge) {
            var score = this.props.row.scores.scores[judge.id];
            return <td key={ judge.id } >{ this.renderScore(judge, score) }</td>;
        }.bind(this))
        return <tr>
            <td className="place">{ this.props.row.place }</td>
            <td className="number">{ this.props.row.participant.number }</td>
            <td className="participant">{ this.props.row.participant.name }</td>
            <td className="score">{ this.props.row.scores.total_run_score }</td>
            { judges_scores }
            { next_tour_cell }
        </tr>
    }
}

class TourResultsVerboseTable extends React.Component {
    render() {
        var rows = this.props.data.map(function(row) {
            return <TourResultsVerboseTableRow
                row={ row }
                key={ row.participant.id }
                has_next_tour={ this.props.has_next_tour }
                judges={ this.props.judges }
                scoring_system={ this.props.scoring_system } />
        }.bind(this));
        var judges_header = this.props.judges.map(function(judge) {
            return <th key={ judge.id }><div>{ judge.number }</div></th>
        });
        return <table className="scores-table no-break">
            <thead>
                <tr>
                    <th className="place"><div>Place</div></th>
                    <th className="number"><div>Number</div></th>
                    <th className="participant"><div>Participant</div></th>
                    <th className="score"><div>Score</div></th>
                    { judges_header }
                    { this.props.has_next_tour ? <th className="next-tour"><div>Next tour</div></th> : null }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}

class TourResultsTableRow extends React.Component {
    render() {
        var next_tour_cell = this.props.has_next_tour
            ? <td className="next-tour">{ this.props.row.advances ? "Yes" : "No" }</td>
            : null;
        return <tr>
            <td className="place">{ this.props.row.place }</td>
            <td className="number">{ this.props.row.participant.number }</td>
            <td className="participant">{ this.props.row.participant.name }</td>
            <td className="score">{ this.props.row.scores.total_run_score }</td>
            { next_tour_cell }
        </tr>
    }
}

class TourResultsTable extends React.Component {
    render() {
        var rows = this.props.data.map(function(row) {
            return <TourResultsTableRow
                row={ row }
                key={ row.participant.id }
                has_next_tour={ this.props.has_next_tour } />
        }.bind(this));
        return <table className="scores-table">
            <thead>
                <tr>
                    <th className="place">Place</th>
                    <th className="number">Number</th>
                    <th className="participant">Participant</th>
                    <th className="score">Score</th>
                    { this.props.has_next_tour ? <th className="next-tour">Next tour</th> : null }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
