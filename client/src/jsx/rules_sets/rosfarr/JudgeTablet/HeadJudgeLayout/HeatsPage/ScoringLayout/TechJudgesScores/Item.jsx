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
            score: PT.shape({
                confirmed: PT.bool.isRequired,
                data: PT.shape({
                    total_score: PT.number.isRequired,
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
                    performed
                    disciplineJudge={ this.props.disciplineJudge }
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
            "green": -total_score < 1,
            "yellow": 1 <= -total_score && -total_score < 10,
            "red": 10 <= -total_score && -total_score < 50,
            "black": 50 <= -total_score,
        });
    }
    render() {
        return (
            <td className={ this.getClassName() }>
                { this.props.score
                    ? this.props.score.data.total_score.toFixed()
                    : "—" }
                { this.renderVerboseScore() }
            </td>
        );
    }
}

Item.displayName = "rules_sets_rosfarr_JudgeTablet_HeadJudgeLayout_HeatsPage_ScoringLayout_TechJudgesScores_Item";
