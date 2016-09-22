import makeClassName from "common/makeClassName";

export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                confirmed: PT.bool.isRequired,
                data: PT.shape({
                    total_score: PT.number.isRequired,
                }).isRequired,
            }),
        };
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
            </td>
        );
    }
}

Item.displayName = "rules_sets_rosfarr_JudgeTablet_HeadJudgeLayout_HeatsPage_ScoringLayout_TechJudgesScores_Item";
