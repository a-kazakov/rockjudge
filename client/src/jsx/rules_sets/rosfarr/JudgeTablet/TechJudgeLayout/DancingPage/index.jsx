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
            tour: PT.object.isRequired,
            onScoreUpdate: PT.func.isRequired,
            onScoreConfirm: PT.func.isRequired,
        };
    }

    renderScores() {
        return this.props.runs.map(run =>
            <ScoringLayout
                disciplineJudge={ this.props.disciplineJudge }
                key={ run.id }
                run={ run }
                tour={ this.props.tour }
                onScoreConfirm={ this.props.onScoreConfirm }
                onScoreUpdate={ this.props.onScoreUpdate }
            />
        );
    }
    render() {
        return (
            <div className="body">
                <Grid>
                    { this.renderScores() }
                </Grid>
            </div>
        );
    }
}
