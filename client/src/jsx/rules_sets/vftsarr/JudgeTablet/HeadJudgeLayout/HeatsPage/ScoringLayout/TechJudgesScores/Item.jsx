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
        return makeClassName({
            "confirmed": this.props.score && this.props.score.confirmed,
            "green": this.props.score && this.props.score.data.raw_data.card === "OK",
            "yellow": this.props.score && this.props.score.data.raw_data.card === "YC",
            "red": this.props.score && this.props.score.data.raw_data.card === "RC",
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
                { this.props.score && this.props.score.data.raw_data.card
                    ? cards[this.props.score.data.raw_data.card]
                    : "—" }
                { this.renderVerboseScore() }
            </td>
        );
    }
}

