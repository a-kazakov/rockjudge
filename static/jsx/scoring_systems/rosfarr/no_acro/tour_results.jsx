function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}


class TourResultsVerboseTableRow extends React.Component {
    renderDanceScore(score) {
        return <table className="score-breakdown"><tbody>
            <tr><th>{ __("results.breakdown.fw") }:</th><td>-{ score.raw_data.fw_woman }%</td></tr>
            <tr><th>{ __("results.breakdown.fm") }:</th><td>-{ score.raw_data.fw_man }%</td></tr>
            <tr><th>{ __("results.breakdown.df") }:</th><td>{ score.raw_data.dance_figs }</td></tr>
            <tr><th>{ __("results.breakdown.c")  }:</th><td>{ score.raw_data.composition }</td></tr>
            <tr><th>{ __("results.breakdown.sm") }:</th><td>{ score.raw_data.small_mistakes }</td></tr>
            <tr><th>{ __("results.breakdown.bm") }:</th><td>{ score.raw_data.big_mistakes }</td></tr>
            <tr><th>{ __("results.breakdown.t")  }:</th><td className="total-score">{ score.total_score }</td></tr>
        </tbody></table>
    }
    renderAcroScore(score) {
        let acro_scores = score.raw_data.deductions.map(function(score, idx) {
            return <tr key={ idx }>
                <th>{ __("results.breakdown.acro_n", idx + 1) }:</th>
                <td>-{ score }%</td>
            </tr>
        }.bind(this));
        return <table className="score-breakdown"><tbody>
            { acro_scores }
            <tr><th>{ __("results.breakdown.fd")  }:</th><td className="total-score">{ score.raw_data.mistakes }</td></tr>
            <tr><th>{ __("results.breakdown.t")  }:</th><td className="total-score">{ score.total_score }</td></tr>
        </tbody></table>
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
        let next_tour_cell = this.props.has_next_tour
            ? <td className="next-tour">{ this.props.row.advances ? _("global.labels.yes") : _("global.labels.no") }</td>
            : null;
        let judges_scores = this.props.judges.map(function(judge) {
            let score = this.props.row.scores.scores[judge.id].data;
            return <td key={ judge.id } >{ this.renderScore(judge, score) }</td>;
        }.bind(this));
        let acro_scores_cell = null;
        if (this.props.scoring_system == "rosfarr.acro") {
            let acro_scores = this.props.row.acrobatics.map(function(acro, idx) {
                return <tr key={ idx }>
                    <th>{ __("results.breakdown.acro_n", idx + 1) }:</th>
                    <td>{ acro.score.toFixed(1) }</td>
                </tr>
            }.bind(this));
            acro_scores_cell = <td className="acro_scores">
                <table className="score-breakdown"><tbody>
                    { acro_scores }
                </tbody></table>
            </td>;
        }
        return <tr>
            <td className="place">{ this.props.row.place }</td>
            <td className="number">{ this.props.row.participant.number }</td>
            <td className="participant">
                <p>{ this.props.row.participant.name }</p>
            <p><em>{ this.props.row.participant.club.name }{", "}<nobr>{ this.props.row.participant.club.city }</nobr></em></p>
            </td>
            <td className="score">{ this.props.row.scores.total_run_score }</td>
            { acro_scores_cell }
            { judges_scores }
            { next_tour_cell }
        </tr>
    }
}

class TourResultsVerboseTable extends React.Component {
    render() {
        let rows = this.props.data.map(function(row) {
            return <TourResultsVerboseTableRow
                row={ row }
                key={ row.participant.id }
                has_next_tour={ this.props.has_next_tour }
                judges={ this.props.judges }
                scoring_system={ this.props.scoring_system } />
        }.bind(this));
        let judges_header = this.props.judges.map(function(judge) {
            return <th key={ judge.id }>{ judge.number }</th>
        });
        let acro_header = this.props.scoring_system == "rosfarr.acro"
            ? <th className="acro">{ __("results.labels.acrobatics") }</th> : null;
        return <table className="scores-table no-break">
            <thead>
                <tr>
                    <th className="place">{ __("results.labels.place") }</th>
                    <th className="number">{ __("results.labels.number") }</th>
                    <th className="participant">
                        { __("results.labels.participant_name") },
                        { __("results.labels.participant_club") }
                    </th>
                    <th className="score">{ __("results.labels.total_score") }</th>
                    { acro_header }
                    { judges_header }
                    { this.props.has_next_tour ? <th className="next-tour"><div>{ __("results.labels.next_tour") }</div></th> : null }
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
            ? <td className="next-tour">{ this.props.row.advances ? _("global.labels.yes") : _("global.labels.no") }</td>
            : null;
        return <tr>
            <td className="place">{ this.props.row.place }</td>
            <td className="number">{ this.props.row.participant.number }</td>
            <td className="participant">{ this.props.row.participant.name }</td>
            <td className="club">{ this.props.row.participant.club.name }{", "}
                <nobr>{ this.props.row.participant.club.city }</nobr></td>
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
                    <th className="place">{ __("results.labels.place") }</th>
                    <th className="number">{ __("results.labels.number") }</th>
                    <th className="participant">{ __("results.labels.participant_name") }</th>
                    <th className="club">{ __("results.labels.participant_club") }</th>
                    <th className="score">{ __("results.labels.total_score") }</th>
                    { this.props.has_next_tour ? <th className="next-tour">{ __("results.labels.next_tour") }</th> : null }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
