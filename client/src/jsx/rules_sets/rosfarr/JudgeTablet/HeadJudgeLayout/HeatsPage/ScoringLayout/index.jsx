import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import PenaltyInput from "./PenaltyInput";
import TechJudgesScores from "./TechJudgesScores";
import LineJudgesScores from "./LineJudgesScores";
import AcrobaticOverrides from "./AcrobaticOverrides";
import PreviousPenalties from "./PreviousPenalties";
import NotPerformedSwitch from "./NotPerformedSwitch";

export default class ScoringLayout extends CacheMixin(React.Component) {
    get score() {
        return this.fetchFromCache("score", () => {
            for (const score of this.props.run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    return score;
                }
            }
            return null;
        });
    }
    handleScoreUpdate = (key, value) => {
        let score_data = {};
        score_data[key] = value;
        this.props.onScoreUpdate(this.score.id, score_data);
    }
    render() {
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
