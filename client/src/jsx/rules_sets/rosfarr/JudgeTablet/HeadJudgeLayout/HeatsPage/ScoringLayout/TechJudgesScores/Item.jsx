import _ from "l10n";

import makeClassName from "common/makeClassName";
import VerboseJudgeScore from "common/VerboseJudgeScore";

export default class Item extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            judge: PT.shape({
                name: PT.string.isRequired,
            }).isRequired,
            run: PT.object.isRequired,
            score: PT.shape({
                confirmed: PT.bool.isRequired,
                data: PT.shape({
                    raw_data: PT.shape({
                        card: PT.string,
                    }).isRequired,
                    total_score: PT.oneOfType([
                        PT.number.isRequired,
                        PT.string.isRequired,
                    ]).isRequired,
                }).isRequired,
            }).isRequired,
            showVerbose: PT.bool.isRequired,
            tour: PT.object.isRequired,
        };
    }

    renderVerboseScore() {
        if (!this.props.showVerbose) {
            return null;
        }
        return (
            <div className="verbose-score">
                <div className="judge-name">
                    { this.props.judge.name }
                </div>
                <VerboseJudgeScore
                    disciplineJudge={ this.props.disciplineJudge }
                    run={ this.props.run }
                    score={ this.props.score }
                    tour={ this.props.tour }
                />
                <div className="triangle" />
            </div>
        );
    }
    getClassName() {
        const total_score = this.props.score ? this.props.score.data.total_score : 0;
        return makeClassName({
            "confirmed": this.props.score && this.props.score.confirmed,
            "green": total_score === "OK",
            "yellow": total_score === "YC",
            "red": total_score === "RC",
        });
    }
    render() {
        const is_formation = ["rosfarr.formation", "rosfarr.formation_acro"].includes(this.props.tour.scoring_system_name);
        const cards = is_formation
            ? {
                "OK": _("tablet.tech_judge.ok"),
                "YC": _("tablet.tech_judge.form_yellow_card"),
                "RC": _("tablet.tech_judge.form_red_card"),
            }
            : {
                "OK": _("tablet.tech_judge.ok"),
                "YC": _("tablet.tech_judge.yellow_card"),
                "RC": _("tablet.tech_judge.red_card"),
            };
        return (
            <td className={ this.getClassName() }>
                { this.props.score.data.raw_data.card
                    ? cards[this.props.score.data.raw_data.card]
                    : "—" }
                { this.renderVerboseScore() }
            </td>
        );
    }
}

Item.displayName = "rules_sets_rosfarr_JudgeTablet_HeadJudgeLayout_HeatsPage_ScoringLayout_TechJudgesScores_Item";
