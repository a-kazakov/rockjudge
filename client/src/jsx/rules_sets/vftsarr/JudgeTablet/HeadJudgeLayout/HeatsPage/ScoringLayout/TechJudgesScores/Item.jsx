import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import makeClassName from "common/makeClassName";
import VerboseJudgeScore from "common/VerboseJudgeScore";

export default class Item extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        score: PT.object.isRequired,
        showVerbose: PT.bool.isRequired,
        tourResults: PT.object.isRequired,
    };

    renderVerboseScore() {
        if (!this.props.showVerbose) {
            return null;
        }
        const score_result = this.props.tourResults.scores_results[this.props.score.id];
        if (!score_result) {
            return null;
        }
        return (
            <div className="verbose-score">
                <div className="judge-name">
                    { this.props.disciplineJudge.judge.name }
                </div>
                <VerboseJudgeScore
                    disciplineJudge={ this.props.disciplineJudge }
                    score={ this.props.score }
                    scoreResult={ score_result }
                />
                <div className="triangle" />
            </div>
        );
    }
    getClassName() {
        return makeClassName({
            "confirmed": this.props.score && this.props.score.confirmed,
            "green": this.props.score && this.props.score.data.card === "OK",
            "yellow": this.props.score && this.props.score.data.card === "YC",
            "red": this.props.score && this.props.score.data.card === "RC",
        });
    }
    render() {
        const cards = {
            "OK": _("tablet.tech_judge.ok"),
            "YC": _("tablet.tech_judge.yellow_card"),
            "RC": _("tablet.tech_judge.red_card"),
        };
        return (
            <td className={ this.getClassName() }>
                { this.props.score && this.props.score.data.card
                    ? cards[this.props.score.data.card]
                    : "—" }
                { this.renderVerboseScore() }
            </td>
        );
    }
}
