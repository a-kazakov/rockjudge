import Grid from "JudgeTablet/Grid";

import ScoringLayout from "./ScoringLayout";

export default class AcroPage extends React.PureComponent {
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
            onAcroOverride: PT.func.isRequired,
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
