function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}

class TourResultsVerboseTableRow extends React.Component {
    formatScore(score, template) {
        if (!template) {
            template = "$";
        }
        if (score === null) {
            return <span>&mdash;</span>
        }
        return template.replace("$", score).replace("@", score.toFixed(1));
    }
    renderFormationScore(score, additiolal_data) {
        return <table className="score-breakdown"><tbody>
            <tr><th><p>{ __("results.breakdown.dt") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_tech, "@") }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.df") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_figs, "@") }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.i")  }:</p></th><td><p>{ this.formatScore(score.data.raw_data.impression, "@") }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.sm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.small_mistakes) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.bm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.big_mistakes) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.p")  }:</p></th><td className="total-score"><p>{ additiolal_data.places[score.id] }</p></td></tr>
        </tbody></table>
    }
    renderDanceScore(score) {
        return <table className="score-breakdown"><tbody>
            <tr><th><p>{ __("results.breakdown.fw") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.fw_woman, "-$%") }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.fm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.fw_man, "-$%") }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.df") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_figs) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.c")  }:</p></th><td><p>{ this.formatScore(score.data.raw_data.composition) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.sm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.small_mistakes) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.bm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.big_mistakes) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
        </tbody></table>
    }
    renderAcroScore(score) {
        let acro_scores = score.data.raw_data.reductions.map(function(score, idx) {
            return <tr key={ idx }>
                <th><p>{ __("results.breakdown.acro_n", idx + 1) }:</p></th>
                <td><p>{ this.formatScore(score, "-$%") }</p></td>
            </tr>
        }.bind(this));
        return <table className="score-breakdown"><tbody>
            { acro_scores }
            <tr><th><p>{ __("results.breakdown.fd")  }:</p></th><td><p>{ this.formatScore(score.data.raw_data.mistakes) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
        </tbody></table>
    }
    renderScore(judge, score, additiolal_data) {
        switch (getScoringType(judge, this.props.tour.scoring_system_name)) {
        case "dance":
            return this.renderDanceScore(score, additiolal_data);
        case "acro":
            return this.renderAcroScore(score, additiolal_data);
        case "formation":
            return this.renderFormationScore(score, additiolal_data);
        default:
            return <span>{ score.data.total_score.toFixed(2) }</span>;
        }
    }
    renderInfoBlock() {
        let has_acro_overrides = false;
        this.props.run.acrobatics.forEach(function(acro) {
            if (acro.score !== acro.original_score) {
                has_acro_overrides = true;
            }
        });
        let acro_cell_width = (100 / this.props.run.acrobatics.length) + "%";
        return <td className="info-block">
            <p><strong>{ _("global.phrases.participant_n",
                this.props.run.participant.number,
                null,
                this.props.run.participant.sportsmen.length
            )}</strong></p>
            { getParticipantDisplay(this.props.run.participant) }
            <p><strong>{ __("results.labels.penalty") }: </strong>{ this.props.head_judge_score ? this.props.head_judge_score.data.total_score : <span>&mdash;</span> }</p>
            { this.props.tour.scoring_system_name == "rosfarr.acro" && this.props.run.acrobatics.length > 0 ?
                <div>
                    <p><strong>{ has_acro_overrides ? __("results.labels.acrobatics_verbose") : __("results.labels.acrobatics") }:</strong></p>
                    <table className="acro-table"><tbody>
                        <tr>{
                            this.props.run.acrobatics.map((acro, idx) => <td key={ idx } style={{ width: acro_cell_width }}><p className="text-center">
                                { acro.original_score.toFixed(1) }
                            </p></td>)
                        }</tr>
                        {
                            has_acro_overrides ? <tr>{
                                this.props.run.acrobatics.map((acro, idx) => <td key={ idx } style={{ width: acro_cell_width }}><p className="text-center">
                                    { acro.score.toFixed(1) }
                                </p></td>)
                            }</tr> : null
                        }
                    </tbody></table>
                </div>
            : null }
            { this.props.tour.scoring_system_name === "rosfarr.am_final_acro"
                ? <p><strong>{ __("results.labels.fw_score") }</strong>: {
                    this.props.run.verbose_total_score.previous_tour.primary_score.toFixed(2) + " / " +
                    this.props.run.verbose_total_score.previous_tour.secondary_score.toFixed(2)
                }</p>
                : null }
            { this.props.tour.scoring_system_name === "rosfarr.am_final_acro"
                ? <p><strong>{ __("results.labels.acro_score") }</strong>: {
                    this.props.run.verbose_total_score.current_tour.primary_score.toFixed(2) + " / " +
                    this.props.run.verbose_total_score.current_tour.secondary_score.toFixed(2)
                }</p>
                : null }
            { this.props.tour.scoring_system_name !== "rosfarr.formation"
                ? <p><strong>{ __("results.labels.total_score") }: { this.props.run.total_score }</strong></p>
                : null }
            { this.props.has_next_tour ?
                <p><strong>{ __("results.labels.next_tour") }: </strong>{
                    this.props.results_info.advances ? _("global.labels.yes") : _("global.labels.no")
                }</p>
            : null }
        </td>
    }
    render() {
        let judges_scores = this.props.scores.map(((score, idx) => <td className="w-13" key={ idx }> {
            this.renderScore(this.props.discipline_judges[idx], score, this.props.results_info.additional_data)
        } </td>).bind(this));
        return <tr>
            <td className="w-3 place"><p className="text-center">{ this.props.results_info.place }</p></td>
            { this.renderInfoBlock() }
            { judges_scores }
        </tr>
    }
}

class TourResultsVerboseTable extends React.Component {
    render() {
        let tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        let discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        let scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        let head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        let results_info = tour_wrapper.getResultsInfo();
        let runs = tour_wrapper.getRuns();
        let has_next_tour = this.props.tour.next_tour_id !== null;
        let rows = [];
        for (let idx = 0; idx < runs.length; ++idx) {
            rows.push(<TourResultsVerboseTableRow
                key={ runs[idx].id }
                tour={ this.props.tour }
                run={ runs[idx] }
                scores={ scores_table[idx] }
                head_judge_score={ head_judge_scores[idx] }
                results_info={ results_info[idx] }
                discipline_judges={ discipline_judges }
                has_next_tour={ has_next_tour } />
            );
        };
        let judges_header = discipline_judges.map(function(dj) {
            return <th key={ dj.id }><p>{ dj.judge.number }</p></th>
        });
        return <table className="bordered-table" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th className="w-3 place"><p>{ __("results.labels.place") }</p></th>
                    <th className="participant"><p>
                        { __("results.labels.info") }
                    </p></th>
                    { judges_header }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}

class TourResultsSemiVerboseTableRow extends React.Component {
    renderFormationScore(score, additiolal_data) {
        return <p className="text-center"><strong>{ additiolal_data.places[score.id] }</strong> ({ score.data.total_score.toFixed(1) })</p>
    }
    renderScore(judge, score, additiolal_data) {
        if (judge.role == "dance_judge") {
            if (this.props.tour.scoring_system_name == "rosfarr.formation") {
                return this.renderFormationScore(score, additiolal_data)
            }
        }
        return <p className="text-center">{ score.data.total_score.toFixed(2) }</p>;
    }
    render() {
        let judges_scores = this.props.scores.map(((score, idx) => <td className="w-9" key={ idx }> {
            this.renderScore(this.props.discipline_judges[idx], score, this.props.results_info.additional_data)
        } </td>).bind(this));
        let total_score = this.props.run.verbose_total_score;
        return <tr>
            <td className="w-5 place"><p className="text-center">{ this.props.results_info.place }</p></td>
            <td className="w-5 number"><p className="text-center">{ this.props.run.participant.number }</p></td>
            <td className="participant">{ getParticipantDisplay(this.props.run.participant) }</td>
            { this.props.tour.scoring_system_name !== "rosfarr.formation"
                ? <td className="w-14 total-score"><p className="text-center">
                    {
                        this.props.tour.scoring_system_name == "rosfarr.am_final_acro"
                            ? <em>
                                { __("results.labels.fw_score_short") }{": "}
                                { total_score.previous_tour.primary_score.toFixed(2) }{" / "}
                                { total_score.previous_tour.secondary_score.toFixed(2) }<br /></em>
                            : null
                    }
                    <strong>{ total_score.primary_score.toFixed(2) }</strong>
                    &nbsp;/{" "}{ total_score.secondary_score.toFixed(2) }
                </p></td> : null }
            { judges_scores }
            <td className="w-7 card"><p className="text-center">{
                this.props.head_judge_score ? this.props.head_judge_score.data.total_score : <span>&mdash;</span>
            }</p></td>
        </tr>
    }
}

class TourSemiVerboseResultsTable extends React.Component {
    renderAdvancesHeader(prev_row, next_row, idx, n_cols) {
        if (prev_row && prev_row.advances == next_row.advances) {
            return null;
        }
        return <tr key={ "H" + idx }><th className="advances-header" colSpan={ n_cols } key={ "NT" + idx }>
            { next_row.advances
                ? <p className="text-left">{ __("results.headers.participants_advanced") }</p>
                : <p className="text-left">{ __("results.headers.participants_not_advanced") }</p>
            }
        </th></tr>
    }
    render() {
        let tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        let discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        let scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        let head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        let results_info = tour_wrapper.getResultsInfo();
        let runs = tour_wrapper.getRuns();
        let has_next_tour = this.props.tour.next_tour_id !== null;
        let has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation";
        let judges_header = discipline_judges.map(function(dj) {
            let suffix = getScoringType(dj, this.props.tour.scoring_system_name) == "acro" ? " (A)" : "";
            return <th key={ dj.id } className="w-9"><p>{ dj.judge.number + suffix }</p></th>
        }.bind(this));
        let rows = [];
        for (let idx = 0; idx < runs.length; ++idx) {
            if (has_next_tour) {
                rows.push(this.renderAdvancesHeader(results_info[idx - 1], results_info[idx], idx, 4 + discipline_judges.length + has_total_score));
            }
            rows.push(<TourResultsSemiVerboseTableRow
                key={ runs[idx].id }
                head_judge_score={ head_judge_scores[idx] }
                results_info={ results_info[idx] }
                tour={ this.props.tour }
                run={ runs[idx] }
                scores={ scores_table[idx] }
                discipline_judges={ discipline_judges }
                has_next_tour={ has_next_tour }
                has_total_score={ has_total_score } />
            );
        };
        return <table className="bordered-table">
            <thead>
                <tr>
                    <th className="w-5 place"><p>{ __("results.labels.place") }</p></th>
                    <th className="w-5 number"><p>{ __("results.labels.number") }</p></th>
                    <th className="participant"><p>{ __("results.labels.participant_name") }</p></th>
                    { has_total_score ? <th className="w-14 total-score"><p>{ __("results.labels.total_score") }</p></th> : null }
                    { judges_header }
                    <th className="w-7 card"><p className="text-center">{ __("results.labels.card") }</p></th>
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
        let card = this.props.head_judge_score ? this.props.head_judge_score.data.total_score : "0";
        return <tr>
            <td className="w-7 place"><p className="text-center">{ this.props.results_info.place }</p></td>
            <td className="w-6 number"><p className="text-center">{ this.props.run.participant.number }</p></td>
            <td className="w-30 participant">{ getParticipantDisplay(this.props.run.participant) }</td>
            <td className="club"><p>{ this.props.run.participant.club.name }</p></td>
            { this.props.has_total_score ? <td className="w-18 score"><p className="text-center">
                <strong>{ this.props.run.verbose_total_score.primary_score.toFixed(2) }</strong>
                &nbsp;/{" "}{ this.props.run.verbose_total_score.secondary_score.toFixed(2) }
            </p></td> : null }
            <td className="w-8 card"><p className="text-center">{ card }</p></td>
        </tr>
    }
}

class TourResultsTable extends React.Component {
    renderAdvancesHeader(prev_row, next_row, idx) {
        if (prev_row && prev_row.advances == next_row.advances) {
            return null;
        }
        return <tr><th className="advances-header" colSpan="6" key={ "NT" + idx }>
            { next_row.advances
                ? <p className="text-left">{ __("results.headers.participants_advanced") }</p>
                : <p className="text-left">{ __("results.headers.participants_not_advanced") }</p>
            }
        </th></tr>
    }
    render() {
        let tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        let head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        let results_info = tour_wrapper.getResultsInfo();
        let runs = tour_wrapper.getRuns();
        let has_next_tour = this.props.tour.next_tour_id !== null;
        let has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation";
        let rows = [];
        for (let idx = 0; idx < runs.length; ++idx) {
            if (has_next_tour) {
                rows.push(this.renderAdvancesHeader(results_info[idx - 1], results_info[idx], idx));
            }
            rows.push(<TourResultsTableRow
                key={ runs[idx].id }
                head_judge_score={ head_judge_scores[idx] }
                results_info={ results_info[idx] }
                run={ runs[idx] }
                has_next_tour={ has_next_tour }
                has_total_score={ has_total_score } />
            );
        };
        return <table className="bordered-table">
            <thead>
                <tr>
                    <th className="w-7 place"><p>{ __("results.labels.place") }</p></th>
                    <th className="w-6 number"><p>{ __("results.labels.number") }</p></th>
                    <th className="w-30 participant"><p>{ __("results.labels.participant_name") }</p></th>
                    <th className="club"><p>{ __("results.labels.participant_club") }</p></th>
                    { has_total_score ? <th className="w-18 score"><p>{ __("results.labels.total_score") }</p></th> : null }
                    <th className="w-8 card"><p className="text-center">{ __("results.labels.card") }</p></th>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
