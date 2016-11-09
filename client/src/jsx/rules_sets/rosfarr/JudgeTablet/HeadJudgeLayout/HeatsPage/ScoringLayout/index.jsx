import _ from "l10n";

import PenaltyInput from "./PenaltyInput";
import TechJudgesScores from "./TechJudgesScores";
import LineJudgesScores from "./LineJudgesScores";
import AcrobaticOverrides from "./AcrobaticOverrides";
import PreviousPenalties from "./PreviousPenalties";
import NotPerformedSwitch from "./NotPerformedSwitch";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            run: PT.shape({
                performed: PT.bool.isRequired,
                participant: PT.shape({
                    number: PT.number.isRequired,
                    name: PT.string.isRequired,
                    sportsmen: PT.array.isRequired,
                }).isRequired,
                scores: PT.arrayOf(
                    PT.shape({
                        discipline_judge_id: PT.number.isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
                discipline: PT.shape({
                    discipline_judges: PT.array.isRequired,
                }).isRequired,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    getScore() {
        for (const score of this.props.run.scores) {
            if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                return score;
            }
        }
        return null;
    }
    setupCache() {
        this.score = this.getScore();
    }

    handleScoreUpdate = (key, value) => {
        let score_data = {};
        score_data[key] = value;
        this.props.onScoreUpdate(this.score.id, score_data);
    }

    render() {
        this.setupCache();
        if (this.score === null) {
            return (
                <div />
            );
        }
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
        if (!this.props.run.performed) {
            return (
                <div className="layout-participant">
                    <h2>
                        { header }
                    </h2>
                    <NotPerformedSwitch
                        run={ this.props.run }
                    />
                </div>
            )
        }
        return (
            <div className="layout-participant">
                <h2>
                    { header }
                </h2>
                <PenaltyInput
                    score={ this.score }
                    scoringSystemName={ this.props.tour.scoring_system_name }
                    onScoreUpdate={ this.handleScoreUpdate }
                />
                <PreviousPenalties
                    run={ this.props.run }
                />
                <TechJudgesScores
                    disciplineJudges={ this.props.tour.discipline.discipline_judges }
                    run={ this.props.run }
                    tour={ this.props.tour }
                />
                <LineJudgesScores
                    disciplineJudges={ this.props.tour.discipline.discipline_judges }
                    run={ this.props.run }
                    tour={ this.props.tour }
                />
                <AcrobaticOverrides
                    run={ this.props.run }
                />
                <NotPerformedSwitch
                    run={ this.props.run }
                />
            </div>
        );
    }
}
