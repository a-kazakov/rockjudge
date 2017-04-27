import Grid from "JudgeTablet/Grid";

import ScoringLayout from "./ScoringLayout";

export default class DancingPage extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            runs: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                }).isRequired,
            ).isRequired,
            scores: PT.instanceOf(Map).isRequired,
            tour: PT.object.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    renderScores() {
        return this.props.runs.map(run =>
            <ScoringLayout
                disciplineJudge={ this.props.disciplineJudge }
                key={ run.id }
                run={ run }
                score={ this.props.scores.get(run.id) }
                tour={ this.props.tour }
                onScoreUpdate={ this.props.onScoreUpdate }
            />
        );
    }
    render() {
        return (
            <Grid>
                { this.renderScores() }
            </Grid>
        );
    }
}
