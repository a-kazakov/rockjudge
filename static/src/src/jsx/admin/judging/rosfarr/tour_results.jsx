import { _ } from "i10n/loader";
import { TourScoresWrapper, getParticipantDisplay, getScoringType } from "common/rosfarr/base";


function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}

class TourResultsVerboseTableColumnWidths {
    constructor(n_judges) {
        this.judge_width = Math.round(70 / n_judges);
        this.place_width = 7
        this.info_width = 100 - this.judge_width * n_judges - this.place_width;
    }
    genPlaceStyle() {
        return {
            width: `${this.place_width}%`,
        }
    }
    genInfoStyle() {
        return {
            width: `${this.info_width}%`,
        }
    }
    genJudgeStyle() {
        return {
            width: `${this.judge_width}%`,
        }
    }
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
            <tr><th><p>{ __("results.breakdown.m") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.mistakes) }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
            <tr><th><p>{ __("results.breakdown.p")  }:</p></th><td className="total-score"><p>{ additiolal_data.places[score.id] }</p></td></tr>
        </tbody></table>
    }
    renderFormationAcroScore(score, additiolal_data) {
        return <table className="score-breakdown"><tbody>
            <tr><th><p>{ __("results.breakdown.a") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.acrobatics, "@") }</p></td></tr>
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
        case "formation_acro":
            return this.renderFormationAcroScore(score, additiolal_data);
        default:
            return <p className="text-center">{ score.data.total_score.toFixed(2) }</p>;
        }
    }
    renderParticipantInfo() {
        return <div>
            <p><strong>{ _("global.phrases.participant_n",
                this.props.run.participant.number,
                null,
                this.props.run.participant.sportsmen.length
            )}</strong></p>
            { getParticipantDisplay(this.props.run.participant) }
        </div>
    }
    renderHeadJudgePenalty() {
        if (!this.props.run.performed) {
            return null;
        }
        return <p><strong>{ __("results.labels.penalty") }: </strong>
            { this.props.head_judge_score ? this.props.head_judge_score.data.total_score : <span>&mdash;</span> }</p>
    }
    renderAcroTable() {
        if (!this.props.run.performed) {
            return null;
        }
        let has_acro_overrides = false;
        let render_acro_table = this.props.tour.scoring_system_name === "rosfarr.acro" ||
            this.props.tour.scoring_system_name === "rosfarr.am_final_acro";
        if (!render_acro_table) {
            return null;
        }
        this.props.run.acrobatics.forEach(function(acro) {
            if (acro.score !== acro.original_score) {
                has_acro_overrides = true;
            }
        });
        if (this.props.run.acrobatics.length === 0) {
            return null;
        }
        let acro_cell_width = (100 / this.props.run.acrobatics.length) + "%";
        return <div>
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
    }
    renderAmClassFwScore() {
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        return <p><strong>{ __("results.labels.fw_score") }</strong>: {
            this.props.run.verbose_total_score.previous_tour.primary_score.toFixed(2) + " / " +
            this.props.run.verbose_total_score.previous_tour.secondary_score.toFixed(2)
        } </p>
    }
    renderAmClassAcroScore() {
        if (!this.props.run.performed) {
            return null;
        }
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        return <p><strong>{ __("results.labels.acro_score") }</strong>: {
            this.props.run.verbose_total_score.current_tour.primary_score.toFixed(2) + " / " +
            this.props.run.verbose_total_score.current_tour.secondary_score.toFixed(2)
        } </p>
    }
    renderTotalScore() {
        if (!this.props.run.performed) {
            return null;
        }
        if (this.props.tour.scoring_system_name === "rosfarr.formation") {
            return null;
        }
        if (this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
            return null;
        }
        return <p><strong>{ __("results.labels.total_score") }: { this.props.run.total_score }</strong></p>;
    }
    renderNotPerformedLabel() {
        if (this.props.run.performed) {
            return null;
        }
        return <p><em>
            { __("results.labels.not_performed") }
        </em></p>
    }
    renderNextTourLabel() {
        if (!this.props.has_next_tour) {
            return null;
        }
        <p><strong>{ __("results.labels.next_tour") }: </strong>{
            this.props.results_info.advances ? _("global.labels.yes") : _("global.labels.no")
        }</p>
    }
    renderInfoBlock() {
        return <td className="info-block" style={ this.props.widths.genInfoStyle() }>
            { this.renderParticipantInfo() }
            { this.renderHeadJudgePenalty() }
            { this.renderAcroTable() }
            { this.renderAmClassFwScore() }
            { this.renderAmClassAcroScore() }
            { this.renderTotalScore() }
            { this.renderNotPerformedLabel() }
            { this.renderNextTourLabel() }
        </td>
    }
    render() {
        let judges_scores = this.props.scores.map((score, idx) =>
            <td key={ idx } style={ this.props.widths.genJudgeStyle() }>
                { this.renderScore(this.props.discipline_judges[idx], score, this.props.results_info.additional_data) }
            </td>);
        if (!this.props.run.performed) {
            judges_scores = this.props.scores.map((score, idx) =>
                <td style={ this.props.widths.genJudgeStyle() } key={ idx }>
                    <p className="text-center">&mdash;</p></td>);
        }
        return <tr>
            <td className="place" style={ this.props.widths.genPlaceStyle() }>
                <p className="text-center">{ this.props.results_info.place }</p>
            </td>
            { this.renderInfoBlock() }
            { judges_scores }
        </tr>
    }
}

export class TourResultsVerboseTable extends React.Component {
    render() {
        let tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        let discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        let scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        let head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        let results_info = tour_wrapper.getResultsInfo();
        let runs = tour_wrapper.getRuns();
        let has_next_tour = this.props.tour.next_tour_id !== null;
        let rows = [];
        let widths = new TourResultsVerboseTableColumnWidths(discipline_judges.length);
        for (let idx = 0; idx < runs.length; ++idx) {
            rows.push(<TourResultsVerboseTableRow
                key={ runs[idx].id }
                tour={ this.props.tour }
                run={ runs[idx] }
                scores={ scores_table[idx] }
                widths={ widths }
                head_judge_score={ head_judge_scores[idx] }
                results_info={ results_info[idx] }
                discipline_judges={ discipline_judges }
                has_next_tour={ has_next_tour } />
            );
        };
        let judges_header = discipline_judges.map(function(dj) {
            return <th key={ dj.id } width={ widths.genJudgeStyle() }><p>{ dj.judge.number }</p></th>
        });
        return <table className="bordered-table" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th className="place" width={ widths.genPlaceStyle() }><p>{ __("results.labels.place") }</p></th>
                    <th className="participant" width={ widths.genInfoStyle() }><p>
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

class TourResultsSemiVerboseTableColumnWidths {
    constructor(n_judges) {
        this.judge_width = Math.round(55 / n_judges);
        this.total_score_width = 14;
        this.place_width = 6;
        this.number_width = 3;
        this.name_width = 100 - this.judge_width * n_judges -
            this.total_score_width - this.place_width - this.number_width;
    }
    genPlaceStyle() {
        return {
            width: `${this.place_width}%`,
        }
    }
    genNumberStyle() {
        return {
            width: `${this.number_width}%`,
        }
    }
    genNameStyle() {
        return {
            width: `${this.name_width}%`,
        }
    }
    genTotalScoreStyle() {
        return {
            width: `${this.total_score_width}%`,
        }
    }
    genJudgeStyle() {
        return {
            width: `${this.judge_width}%`,
        }
    }
}

class TourResultsSemiVerboseTableRow extends React.Component {
    renderFormationScore(score, additiolal_data) {
        return <p className="text-center"><strong>{ additiolal_data.places[score.id] }</strong> ({ score.data.total_score.toFixed(1) })</p>
    }
    renderScore(judge, score, additiolal_data) {
        if (judge.role === "dance_judge") {
            if (this.props.tour.scoring_system_name === "rosfarr.formation" || this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
                return this.renderFormationScore(score, additiolal_data)
            }
        }
        return <p className="text-center">{ score.data.total_score.toFixed(2) }</p>;
    }
    render() {
        let judges_scores = this.props.scores.map((score, idx) => <td key={ idx }> {
            this.renderScore(this.props.discipline_judges[idx], score, this.props.results_info.additional_data)
        } </td>);
        if (!this.props.run.performed) {
            judges_scores = this.props.scores.map((score, idx) =>
                <td key={ idx }><p className="text-center">&mdash;</p></td>);
        }
        let total_score = this.props.run.verbose_total_score;
        return <tr>
            <td className="place"><p className="text-center">{ this.props.results_info.place }</p></td>
            <td className="number"><p className="text-center">{ this.props.run.participant.number }</p></td>
            <td className="participant">{ getParticipantDisplay(this.props.run.participant) }</td>
            { this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro"
                ? <td className="total-score">
                    { (() => {
                        if (!this.props.run.performed) {
                            return <p className="text-center">&mdash;</p>;
                        }
                        if (this.props.tour.scoring_system_name === "rosfarr.am_final_acro") {
                            return <p className="text-center">
                                <em>
                                    { __("results.labels.fw_score_short") }{": "}
                                    { total_score.previous_tour.primary_score.toFixed(2) }{" / "}
                                    { total_score.previous_tour.secondary_score.toFixed(2) }<br />
                                </em>
                                <strong>{ total_score.primary_score.toFixed(2) }</strong>
                                &nbsp;/{" "}{ total_score.secondary_score.toFixed(2) }
                            </p>;
                        }
                        return <p className="text-center">
                            <strong>{ total_score.primary_score.toFixed(2) }</strong>
                            &nbsp;/{" "}{ total_score.secondary_score.toFixed(2) }
                        </p>;
                    })() }
                </td> : null }
            { judges_scores }
            <td className="card"><p className="text-center">{
                this.props.head_judge_score && this.props.run.performed
                    ? this.props.head_judge_score.data.total_score
                    : <span>&mdash;</span>
            }</p></td>
        </tr>
    }
}

export class TourResultsSemiVerboseTable extends React.Component {
    renderAdvancesHeader(has_next_tour ,prev_row, next_row, prev_run, next_run, idx, n_cols) {
        let prev_status = prev_row
            ? prev_run.performed
                ? prev_row.advances
                    ? "advanced"
                    : "not_advanced"
                : "not_performed"
            : null;
        let next_status = next_run.performed
            ? next_row.advances
                ? "advanced"
                : "not_advanced"
            : "not_performed";
        let result = prev_status !== next_status
            ? next_status === "not_performed"
                ? <p className="text-left">{ __("results.headers.participants_not_performed") }</p>
                : has_next_tour
                    ? next_status === "not_advanced"
                        ? <p className="text-left">{ __("results.headers.participants_not_advanced") }</p>
                        : <p className="text-left">{ __("results.headers.participants_advanced") }</p>
                    : null
            : null;
        if (result === null) {
            return null;
        }
        return <tr key={ "NT" + idx }><th className="advances-header" colSpan={ n_cols }>
            { result }
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
        let has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        let widths = new TourResultsSemiVerboseTableColumnWidths(discipline_judges.length + 1);
        let judges_header = discipline_judges.map(function(dj) {
            let suffix = getScoringType(dj, this.props.tour.scoring_system_name) === "acro" ? " (A)" : "";
            return <th key={ dj.id } style={ widths.genJudgeStyle() }><p>{ dj.judge.number + suffix }</p></th>
        }.bind(this));
        let rows = [];
        for (let idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                has_next_tour,
                results_info[idx - 1],
                results_info[idx],
                runs[idx - 1],
                runs[idx],
                idx,
                4 + discipline_judges.length + has_total_score
            ));
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
                    <th className="place" style={ widths.genPlaceStyle() }><p>{ __("results.labels.place") }</p></th>
                    <th className="number" style={ widths.genNumberStyle() }><p>{ __("results.labels.number") }</p></th>
                    <th className="participant" style={ widths.genNameStyle() }><p>{ __("results.labels.participant_name") }</p></th>
                    { has_total_score ? <th className="total-score" style={ widths.genTotalScoreStyle() }><p>{ __("results.labels.total_score") }</p></th> : null }
                    { judges_header }
                    <th className="card" style={ widths.genJudgeStyle() }><p className="text-center">{ __("results.labels.card") }</p></th>
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
        let card = this.props.run.performed
            ? this.props.head_judge_score
                ? this.props.head_judge_score.data.total_score
                : "0"
            : <span>&mdash;</span>;
        let total_score = this.props.has_total_score ?
            this.props.run.performed
                ? <p className="text-center">
                    <strong>{ this.props.run.verbose_total_score.primary_score.toFixed(2) }</strong>
                    &nbsp;/{" "}{ this.props.run.verbose_total_score.secondary_score.toFixed(2) }
                </p>
                : <p className="text-center">&mdash;</p>
            : null;
        return <tr>
            <td className="w-7 place"><p className="text-center">{ this.props.results_info.place }</p></td>
            <td className="w-6 number"><p className="text-center">{ this.props.run.participant.number }</p></td>
            <td className="w-30 participant">{ getParticipantDisplay(this.props.run.participant) }</td>
            <td className="club"><p>{ this.props.run.participant.club.name }</p></td>
            { this.props.has_total_score ? <td className="w-18 score">{ total_score }</td> : null }
            <td className="w-8 card"><p className="text-center">{ card }</p></td>
        </tr>
    }
}

export class TourResultsTable extends React.Component {
    renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
        let prev_status = prev_row
            ? prev_run.performed
                ? prev_row.advances
                    ? "advanced"
                    : "not_advanced"
                : "not_performed"
            : null;
        let next_status = next_run.performed
            ? next_row.advances
                ? "advanced"
                : "not_advanced"
            : "not_performed";
        let result = prev_status !== next_status
            ? next_status === "not_performed"
                ? <p className="text-left">{ __("results.headers.participants_not_performed") }</p>
                : has_next_tour
                    ? next_status === "not_advanced"
                        ? <p className="text-left">{ __("results.headers.participants_not_advanced") }</p>
                        : <p className="text-left">{ __("results.headers.participants_advanced") }</p>
                    : null
            : null;
        if (result === null) {
            return null;
        }
        return <tr key={ "NT" + idx }><th className="advances-header" colSpan={ n_cols }>
            { result }
        </th></tr>
    }
    render() {
        let tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        let head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        let results_info = tour_wrapper.getResultsInfo();
        let runs = tour_wrapper.getRuns();
        let has_next_tour = this.props.tour.next_tour_id !== null;
        let has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        let rows = [];
        for (let idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                has_next_tour,
                results_info[idx - 1],
                results_info[idx],
                runs[idx - 1],
                runs[idx],
                idx,
                5 + has_total_score
            ));
            rows.push(<TourResultsTableRow
                key={ runs[idx].id }
                head_judge_score={ head_judge_scores[idx] }
                results_info={ results_info[idx] }
                run={ runs[idx] }
                has_next_tour={ has_next_tour }
                has_total_score={ has_total_score } />
            );
        };
        return <div className="brief-table">
            <table className="bordered-table">
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
        </div>
    }
}
