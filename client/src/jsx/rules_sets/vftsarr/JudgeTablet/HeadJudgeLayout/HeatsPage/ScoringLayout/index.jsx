import {React} from "HostModules";

import makeClassName from "common/makeClassName";
import CardInput from "JudgeTablet/components/CardInput";
import PreviousCards from "JudgeTablet/components/PreviousCards";
import _ from "l10n";
import PT from "prop-types";
import AcrobaticOverrides from "./AcrobaticOverrides";
import LineJudgesScores from "./LineJudgesScores";
import RunMetrics from "./RunMetrics";
import StatusSwitch from "./StatusSwitch";
import TechJudgesScores from "./TechJudgesScores";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        isSingle: PT.bool.isRequired,
        run: PT.object.isRequired,
        tourResults: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    getScore() {
        return this.props.run.scores.find(score => score.discipline_judge_id === this.props.disciplineJudge.id) || null;
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
                    <StatusSwitch run={ this.props.run } />
                </div>
            )
        }
        if (this.score == null) {
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
        const discipline_judges = this.props.run.tour.discipline.discipline_judges;
        return (
            <div className={ class_name }>
                <h2>
                    { header }
                </h2>
                <div className="panes">
                    <div className="left-pane">
                        <StatusSwitch run={ this.props.run } />
                        <div className="spacer" />
                        <LineJudgesScores
                            disciplineJudges={ discipline_judges }
                            run={ this.props.run }
                            tourResults={ this.props.tourResults }
                        />
                        <TechJudgesScores
                            disciplineJudges={ discipline_judges }
                            run={ this.props.run }
                            tourResults={ this.props.tourResults }
                        />
                        <div className="spacer" />
                    </div>
                    <div className="right-pane">
                        <RunMetrics
                            run={ this.props.run }
                            tourResults={ this.props.tourResults }
                        />
                        <div className="spacer" />
                        <CardInput
                            readOnly={ false }
                            score={ this.score }
                            onChange={ this.handleCardChange }
                        />
                        <PreviousCards
                            run={ this.props.run }
                            tourResults={ this.props.tourResults }
                        />
                        <AcrobaticOverrides
                            run={ this.props.run }
                            tourResults={ this.props.tourResults }
                        />
                    </div>
                </div>
            </div>
        );
    }
}