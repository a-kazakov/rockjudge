import Grid from "JudgeTablet/Grid";

import ScoringLayout from "./ScoringLayout";

export default class HeatsPage extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            heat: PT.number.isRequired,
            tour: PT.object.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    setupCache() {
        this.runs = this.props.tour.runs.filter(run => run.heat === this.props.heat);
    }

    renderScores() {
        return this.runs.map(run =>
            <ScoringLayout
                disciplineJudge={ this.props.disciplineJudge }
                key={ run.id }
                run={ run }
                tour={ this.props.tour }
                onScoreUpdate={ this.props.onScoreUpdate }
            />
        );
    }
    render() {
        this.setupCache();
        return (
            <div className="body heats">
                <Grid>
                    { this.renderScores() }
                </Grid>
            </div>
        );
    }
}
