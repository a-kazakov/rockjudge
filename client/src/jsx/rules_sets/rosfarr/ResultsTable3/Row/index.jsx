import _ from "l10n";

import getScoringType from "common/getScoringType";

import InfoCell from "./InfoCell";
import AcroScore from "./AcroScore";
import DanceScore from "./DanceScore";
import FormationAcroScore from "./FormationAcroScore";
import FormationScore from "./FormationScore";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
            lineDisciplineJudges: PT.arrayOf(
                PT.shape({
                    role: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            row: PT.shape({
                additional_data: PT.object.isRequired,
                place: PT.number,
                run: PT.shape({
                    performed: PT.bool.isRequired,
                    scores: PT.arrayOf(
                        PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                    verbose_total_score: PT.shape({
                        primary_score: PT.number,
                        secondary_score: PT.number,
                        previous_tour: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                        }),
                    }),
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    renderScore(discipline_judge, score) {
        if (!this.props.row.run.performed) {
            return (
                <p className="text-center">
                    &mdash;
                </p>
            );
        }
        let ScoreComponent = null;
        const scoring_type = getScoringType(discipline_judge, this.props.tour.scoring_system_name);
        switch (scoring_type) {
        case "dance":
        case "dance_halved":
            ScoreComponent = DanceScore;
            break;
        case "acro":
            ScoreComponent = AcroScore;
            break;
        case "formation":
            ScoreComponent = FormationScore;
            break;
        case "formation_acro":
            ScoreComponent = FormationAcroScore;
            break;
        default:
            return (
                <p className="text-center">
                    { score.data.total_score.toFixed(2) }
                </p>
            );
        }
        const props = {
            score: score,
            row: this.props.row,
            scoringType: scoring_type,
        };
        return (
            <ScoreComponent { ...props } />
        );
    }
    renderJudgesScores() {
        const scores_map = new Map(this.props.row.run.scores.map(score => [score.discipline_judge_id, score]));
        return this.props.lineDisciplineJudges.map((dj, idx) =>
            <td key={ dj ? dj.id : `I${idx}` }>
                { this.renderScore(dj, scores_map.get(dj.id)) }
            </td>
        );
    }
    render() {
        return (
            <tr>
                <td className="place">
                    <p className="text-center">
                        { this.props.row.place }
                    </p>
                </td>
                <InfoCell
                    disciplineJudgesMap={ this.props.disciplineJudgesMap }
                    row={ this.props.row }
                    tour={ this.props.tour }
                />
                { this.renderJudgesScores() }
            </tr>
        );
    }
}

Row.displayName = "rules_sets_rosfarr_ResultsTable3_Row";
