import CacheMixin from "common/CacheMixin";

import Grid from "JudgeTablet/Grid";

import ScoringLayout from "./ScoringLayout";

export default class HeatsPage extends CacheMixin(React.Component) {
    get runs() {
        return this.fetchFromCache("runs", () =>
            this.props.tour.runs.filter(run => run.heat === this.props.heat));
    }
    renderScores() {
        return this.runs.map(run =>
            <ScoringLayout
                key={ run.id }
                run={ run }
                tour={ this.props.tour }
                disciplineJudge={ this.props.disciplineJudge }
                onScoreUpdate={ this.props.onScoreUpdate } />
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
