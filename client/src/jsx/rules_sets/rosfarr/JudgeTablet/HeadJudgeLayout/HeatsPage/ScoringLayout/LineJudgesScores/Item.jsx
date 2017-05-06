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
                    disciplineJudge={ this.props.disciplineJudge }
                    run={ this.props.run }
                    score={ this.props.score }
                    tour={ this.props.tour }
                />
                <div className="triangle" />
            </div>
        );
    }
    render() {
        const confirmed = this.props.score && this.props.score.confirmed;
        return (
            <td className={ confirmed ? "confirmed" : "" }>
                { this.props.score
                    ? this.props.score.data.total_score.toFixed(2)
                    : "—" }
                { this.renderVerboseScore() }
            </td>
        );
    }
}
