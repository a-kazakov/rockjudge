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
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.total_score }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.p")  }:</p></th><td className="total-score"><p>{ score.place }</p></td></tr>
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
        if (judge.role == "head_judge" && score.raw_data.nexttour) {
            return <span>{ score.total_score } (+)</span>;
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
            return <td className={ judge.role } key={ judge.id }><p className="text-center">{ this.renderScore(judge, score) }</p></td>;
        }.bind(this));
        let acro_scores_cell = null;
        if (this.props.scoring_system_name == "rosfarr.acro") {
            let acro_scores = this.props.row.acrobatics.map(function(acro, idx) {
                return <tr key={ idx }>
                    <th><p>{ __("results.breakdown.acro_n", idx + 1) }:</p></th>
                    <td><p>{ acro.original_score.toFixed(1) } / { acro.score.toFixed(1) }</p></td>
                </tr>
            }.bind(this));
            if (acro_scores.length == 0) {
                acro_scores = <tr><td><p>&nbsp;</p></td></tr>; // Hack for MS Word
            }
            acro_scores_cell = <td className="w-10 acro_scores">
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
            ? <th className="w-10 acro"><p>{ __("results.labels.acrobatics") }</p></th> : null;
        return <table className="bordered-table" style={{ width: "100%" }}>
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
        let name = this.props.row.participant.formation_name ||
            this.props.row.participant.sportsmen.map((s, idx) => <p key={ idx }>{ s.last_name + " " + s.first_name }</p>)
        let card = this.props.head_judge ? this.props.row.scores.scores[this.props.head_judge.id].data.total_score : "0";
        return <tr>
            <td className="w-7 place"><p className="text-center">{ this.props.row.place }</p></td>
            <td className="w-6 number"><p className="text-center">{ this.props.row.participant.number }</p></td>
            <td className="participant"><p>{ name }</p></td>
            <td className="club"><p>{ this.props.row.participant.club.name }</p></td>
            <td className="w-18 score"><p className="text-center">{ this.props.row.scores.total_run_score }</p></td>
            <td className="w-8 card"><p className="text-center">{ card }</p></td>
        </tr>
    }
}

class TourResultsTable extends React.Component {
    renderAdvancesHeader(prev_row, next_row, idx) {
        if (prev_row && prev_row.advances == next_row.advances) {
            return null;
        }
        if (!this.props.has_next_tour) {
            return null;
        }
        return <th className="advances-header" colSpan="6" >
            { next_row.advances
                ? <p className="text-left">{ __("results.headers.participants_advanced") }</p>
                : <p className="text-left">{ __("results.headers.participants_not_advanced") }</p>
            }
        </th>
    }
    render() {
        let head_judge = this.props.judges.filter((j) => j.role == "head_judge")[0];
        var rows = this.props.data.map(function(row, idx, arr) {
            return [
                this.renderAdvancesHeader(arr[idx - 1], row),
                <TourResultsTableRow
                    row={ row }
                    key={ row.participant.id }
                    head_judge={ head_judge }
                    has_next_tour={ this.props.has_next_tour } />
            ]
        }.bind(this));
        return <table className="bordered-table">
            <thead>
                <tr>
                    <th className="w-7 place"><p>{ __("results.labels.place") }</p></th>
                    <th className="w-6 number"><p>{ __("results.labels.number") }</p></th>
                    <th className="participant"><p>{ __("results.labels.participant_name") }</p></th>
                    <th className="club"><p>{ __("results.labels.participant_club") }</p></th>
                    <th className="w-18 score"><p>{ __("results.labels.total_score") }</p></th>
                    <th className="w-8 card"><p className="text-center">{ __("results.labels.card") }</p></th>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
