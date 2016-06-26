import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";
import getScoringType from "common/getScoringType";

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
            <tr><th><p>{ _("results.breakdown.dt") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_tech, "@") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.df") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_figs, "@") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.i")  }:</p></th><td><p>{ this.formatScore(score.data.raw_data.impression, "@") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.m") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.mistakes) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.p")  }:</p></th><td className="total-score"><p>{ additiolal_data.places[score.id] }</p></td></tr>
        </tbody></table>
    }
    renderFormationAcroScore(score, additiolal_data) {
        return <table className="score-breakdown"><tbody>
            <tr><th><p>{ _("results.breakdown.a") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.acrobatics, "@") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.dt") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_tech, "@") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.df") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_figs, "@") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.i")  }:</p></th><td><p>{ this.formatScore(score.data.raw_data.impression, "@") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.sm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.small_mistakes) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.bm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.big_mistakes) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.p")  }:</p></th><td className="total-score"><p>{ additiolal_data.places[score.id] }</p></td></tr>
        </tbody></table>
    }
    renderDanceScore(score) {
        return <table className="score-breakdown"><tbody>
            <tr><th><p>{ _("results.breakdown.fw") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.fw_woman, "-$%") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.fm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.fw_man, "-$%") }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.df") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.dance_figs) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.c")  }:</p></th><td><p>{ this.formatScore(score.data.raw_data.composition) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.sm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.small_mistakes) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.bm") }:</p></th><td><p>{ this.formatScore(score.data.raw_data.big_mistakes) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
        </tbody></table>
    }
    renderAcroScore(score) {
        let acro_scores = score.data.raw_data.reductions.map(function(score, idx) {
            return <tr key={ idx }>
                <th><p>{ _("results.breakdown.acro_n", idx + 1) }:</p></th>
                <td><p>{ this.formatScore(score, "-$%") }</p></td>
            </tr>
        }.bind(this));
        return <table className="score-breakdown"><tbody>
            { acro_scores }
            <tr><th><p>{ _("results.breakdown.fd")  }:</p></th><td><p>{ this.formatScore(score.data.raw_data.mistakes) }</p></td></tr>
            <tr><th><p>{ _("results.breakdown.t")  }:</p></th><td className="total-score"><p>{ score.data.total_score }</p></td></tr>
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
        return <p><strong>{ _("results.labels.penalty") }: </strong>
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
            <p><strong>{ has_acro_overrides ? _("results.labels.acrobatics_verbose") : _("results.labels.acrobatics") }:</strong></p>
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
        return <p><strong>{ _("results.labels.fw_score") }</strong>: {
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
        return <p><strong>{ _("results.labels.acro_score") }</strong>: {
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
        return <p><strong>{ _("results.labels.total_score") }: { this.props.run.total_score }</strong></p>;
    }
    renderNotPerformedLabel() {
        if (this.props.run.performed) {
            return null;
        }
        return <p><em>
            { _("results.labels.not_performed") }
        </em></p>
    }
    renderNextTourLabel() {
        if (!this.props.has_next_tour) {
            return null;
        }
        <p><strong>{ _("results.labels.next_tour") }: </strong>{
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
