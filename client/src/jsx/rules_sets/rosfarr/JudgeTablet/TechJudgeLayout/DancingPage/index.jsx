import Grid from "JudgeTablet/Grid";

import ScoringLayout from "./ScoringLayout";

export default class DancingPage extends React.Component {
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
