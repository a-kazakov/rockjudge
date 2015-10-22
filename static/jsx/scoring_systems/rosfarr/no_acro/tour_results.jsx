function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}


class TourResultsVerboseTableRow extends React.Component {
    renderFormationScore(score) {
        return <table className="score-breakdown"><tbody>
            <tr><th><p>{ __("results.breakdown.dt") }:</p></th><td><p>{ score.raw_data.dance_tech }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.df") }:</p></th><td><p>{ score.raw_data.dance_figs }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.i")  }:</p></th><td><p>{ score.raw_data.impression }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.sm") }:</p></th><td><p>{ score.raw_data.small_mistakes }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.bm") }:</p></th><td><p>{ score.raw_data.big_mistakes }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score">{ score.total_score }</td></tr>
        </tbody></table>
    }
    renderDanceScore(score) {
        return <table className="score-breakdown"><tbody>
            <tr><th><p>{ __("results.breakdown.fw") }:</p></th><td><p>-{ score.raw_data.fw_woman }%</p></td></tr>
            <tr><th><p>{ __("results.breakdown.fm") }:</p></th><td><p>-{ score.raw_data.fw_man }%</p></td></tr>
            <tr><th><p>{ __("results.breakdown.df") }:</p></th><td><p>{ score.raw_data.dance_figs }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.c")  }:</p></th><td><p>{ score.raw_data.composition }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.sm") }:</p></th><td><p>{ score.raw_data.small_mistakes }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.bm") }:</p></th><td><p>{ score.raw_data.big_mistakes }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.total_score }</p></td></tr>
        </tbody></table>
    }
    renderAcroScore(score) {
        let acro_scores = score.raw_data.deductions.map(function(score, idx) {
            return <tr key={ idx }>
                <th><p>{ __("results.breakdown.acro_n", idx + 1) }:</p></th>
                <td><p>-{ score }%</p></td>
            </tr>
        }.bind(this));
        return <table className="score-breakdown"><tbody>
            { acro_scores }
            <tr><th><p>{ __("results.breakdown.fd")  }:</p></th><td><p>{ score.raw_data.mistakes }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.total_score }</p></td></tr>
        </tbody></table>
    }
    renderScore(judge, score) {
        if (judge.role == "dance_judge") {
            if (this.props.scoring_system_name == "rosfarr.formation") {
                return this.renderFormationScore(score)
            }
            return this.renderDanceScore(score);
        }
        if (judge.role == "acro_judge") {
            if (this.props.scoring_system_name == "rosfarr.formation") {
                return this.renderFormationScore(score);
            }
            if (this.props.scoring_system_name == "rosfarr.acro") {
                return this.renderAcroScore(score);
            }
            return this.renderDanceScore(score);
        }
        return <span>{ score.total_score }</span>;
    }
    render() {
        let next_tour_cell = this.props.has_next_tour
            ? <td className="w-3 next-tour"><p className="text-center">
                { this.props.row.advances ? _("global.labels.yes") : _("global.labels.no") }</p></td>
            : null;
        let judges_scores = this.props.judges.map(function(judge) {
            let score = this.props.row.scores.scores[judge.id].data;
            return <td key={ judge.id } ><p className="text-center">{ this.renderScore(judge, score) }</p></td>;
        }.bind(this));
        let acro_scores_cell = null;
        if (this.props.scoring_system_name == "rosfarr.acro") {
            let acro_scores = this.props.row.acrobatics.map(function(acro, idx) {
                return <tr key={ idx }>
                    <th><p>{ __("results.breakdown.acro_n", idx + 1) }:</p></th>
                    <td><p>{ acro.score.toFixed(1) }</p></td>
                </tr>
            }.bind(this));
            acro_scores_cell = <td className="w-4 acro_scores">
                <table className="score-breakdown"><tbody>
                    { acro_scores }
                </tbody></table>
            </td>;
        }
        return <tr>
            <td className="w-3 place"><p className="text-center">{ this.props.row.place }</p></td>
            { next_tour_cell }
            <td className="w-1 number"><p className="text-center">{ this.props.row.participant.number }</p></td>
            <td className="participant">
                <p>{ this.props.row.participant.name }</p>
                <p><em>{ this.props.row.participant.club.name }{", "}<nobr>{ this.props.row.participant.club.city }</nobr></em></p>
            </td>
            <td className="w-5 score"><p className="text-center">{ this.props.row.scores.total_run_score }</p></td>
            { acro_scores_cell }
            { judges_scores }
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
                scoring_system_name={ this.props.scoring_system_name } />
        }.bind(this));
        let judges_header = this.props.judges.map(function(judge) {
            return <th key={ judge.id }><p>{ judge.number }</p></th>
        });
        let acro_header = this.props.scoring_system_name == "rosfarr.acro"
            ? <th className="w-4 acro"><p>{ __("results.labels.acrobatics") }</p></th> : null;
        return <table className="bordered-table">
            <thead>
                <tr>
                    <th className="w-3 place"><p>{ __("results.labels.place") }</p></th>
                    { this.props.has_next_tour ? <th className="w-3 next-tour"><p>{ __("results.labels.next_tour") }</p></th> : null }
                    <th className="w-1 number"><p>{ __("results.labels.number") }</p></th>
                    <th className="participant"><p>
                        { __("results.labels.participant_name") }{", "}
                        { __("results.labels.participant_club") }
                    </p></th>
                    <th className="w-5 score"><p>{ __("results.labels.total_score") }</p></th>
                    { acro_header }
                    { judges_header }
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
            ? <td className="w-7 next-tour"><p className="text-center">
                    { this.props.row.advances ? _("global.labels.yes") : _("global.labels.no") }
                </p></td>
            : null;
        return <tr>
            <td className="w-7 place"><p className="text-center">{ this.props.row.place }</p></td>
            { next_tour_cell }
            <td className="w-4 number"><p className="text-center">{ this.props.row.participant.number }</p></td>
            <td className="participant"><p>{ this.props.row.participant.name }</p></td>
            <td className="club"><p>{ this.props.row.participant.club.name }{", "}
                <nobr>{ this.props.row.participant.club.city }</nobr></p></td>
            <td className="w-13 score"><p className="text-center">{ this.props.row.scores.total_run_score }</p></td>
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
        return <table className="bordered-table">
            <thead>
                <tr>
                    <th className="w-7 place"><p>{ __("results.labels.place") }</p></th>
                    { this.props.has_next_tour ? <th className="next-tour"><p>{ __("results.labels.next_tour") }</p></th> : null }
                    <th className="w-4 number"><p>{ __("results.labels.number") }</p></th>
                    <th className="participant"><p>{ __("results.labels.participant_name") }</p></th>
                    <th className="club"><p>{ __("results.labels.participant_club") }</p></th>
                    <th className="w-13 score"><p>{ __("results.labels.total_score") }</p></th>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
