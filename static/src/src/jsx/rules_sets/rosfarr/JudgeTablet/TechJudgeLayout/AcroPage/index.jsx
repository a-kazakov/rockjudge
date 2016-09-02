import Grid from "JudgeTablet/Grid";

import ScoringLayout from "./ScoringLayout";

export default class AcroPage extends React.Component {
    renderScores() {
        return this.props.runs.map(run =>
            <ScoringLayout
                key={ run.id }
                run={ run }
                tour={ this.props.tour }
                disciplineJudge={ this.props.disciplineJudge }
                onAcroOverride={ this.props.onAcroOverride }
                onScoreConfirm={ this.props.onScoreConfirm } />
        );
    }
    render() {
        return (
            <div className="body heats">
                <Grid>
                    { this.renderScores() }
                </Grid>
            </div>
        );
    }
}
