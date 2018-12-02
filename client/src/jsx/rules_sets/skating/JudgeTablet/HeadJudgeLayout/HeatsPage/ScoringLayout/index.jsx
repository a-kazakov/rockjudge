import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import LineJudgesScores from "./LineJudgesScores";
import StatusSwitch from "./StatusSwitch";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        run: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

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
        return (
            <div className="layout-participant">
                <h2>
                    { header }
                </h2>
                <div className="spacer" />
                <LineJudgesScores
                    disciplineJudges={ this.props.run.tour.discipline.discipline_judges }
                    run={ this.props.run }
                />
                <StatusSwitch
                    run={ this.props.run }
                />
            </div>
        );
    }
}