import _ from "l10n";

import CardInput from "JudgeTablet/components/CardInput";
import TechJudgesScores from "./TechJudgesScores";
import LineJudgesScores from "./LineJudgesScores";
import AcrobaticOverrides from "./AcrobaticOverrides";
import PreviousCards from "JudgeTablet/components/PreviousCards";
import StatusSwitch from "./StatusSwitch";
import makeClassName from "common/makeClassName";
import RunMetrics from "./RunMetrics";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            isSingle: PT.bool.isRequired,
            run: PT.shape({
                status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
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

    handleCardChange = (value) => {
        this.props.onScoreUpdate(this.score.id, value);
    };

    render() {
        this.setupCache();
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
        if (this.props.run.status !== "OK") {
            return (
                <div className="layout-participant">
                    <h2>
                        { header }
                    </h2>
                    <StatusSwitch
                        run={ this.props.run }
                    />
                </div>
            )
        }
        if (this.score === null) {
            return (
                <div className="layout-participant">
                    <h2>
                        { header }
                    </h2>
                    <div className="not-performing">
                        { _("tablet.global.no_score") }
                    </div>
                </div>
            );
        }
        const class_name = makeClassName({
            "layout-participant": true,
            "single": this.props.isSingle,
        });
        return (
            <div className={ class_name }>
                <h2>
                    { header }
                </h2>
                <div className="panes">
                    <div className="left-pane">
                        <StatusSwitch
                            run={ this.props.run }
                        />
                        <div className="spacer" />
                        <LineJudgesScores
                            disciplineJudges={ this.props.tour.discipline.discipline_judges }
                            run={ this.props.run }
                            tour={ this.props.tour }
                        />
                        <TechJudgesScores
                            disciplineJudges={ this.props.tour.discipline.discipline_judges }
                            run={ this.props.run }
                            tour={ this.props.tour }
                        />
                        <div className="spacer" />
                    </div>
                    <div className="right-pane">
                        <RunMetrics
                            run={ this.props.run }
                            tour={ this.props.tour }
                        />
                        <div className="spacer" />
                        <CardInput
                            readOnly={ false }
                            scoreData={ this.score.data.raw_data }
                            tour={ this.props.tour }
                            onChange={ this.handleCardChange }
                        />
                        <PreviousCards
                            run={ this.props.run }
                        />
                        <AcrobaticOverrides
                            run={ this.props.run }
                        />
                    </div>
                </div>
            </div>
        );
    }
}
