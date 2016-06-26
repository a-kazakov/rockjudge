import Header from "JudgeTablet/Header";
import Grid from "JudgeTablet/Grid";
import Participant from "./Participant";

export default class GeneralLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heat: this.getFirstNonConfirmedHeat(),
        };
    }
    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            this.setState({
                heat: this.getFirstNonConfirmedHeat(),
            });
        }
    }
    get heats_count() {
        return Math.max(...this.props.tour.runs.map(run => run.heat));
    }
    updateHeat(value) {
        this.setState({
            heat: value,
        });
    }
    onPrevHeatClick = () => {
        this.updateHeat(this.state.heat - 1);
    }
    onNextHeatClick = () => {
        this.updateHeat(this.state.heat + 1);
    }
    getFirstNonConfirmedHeat() {
        for (const run of this.props.tour.runs) {
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id && !score.confirmed && run.performed) {
                    return run.heat;
                }
            }
        }
        return this.heats_count;
    }
    render() {
        return (
            <div className="judge-tablet">
                <Header
                    judge={ this.props.disciplineJudge.judge }
                    tour={ this.props.tour }
                    heat={ this.state.heat }
                    heatsCount={ this.heats_count }
                    maxHeat={ this.getFirstNonConfirmedHeat() }
                    onPrevHeatClick={ this.onPrevHeatClick }
                    onNextHeatClick={ this.onNextHeatClick } />
                <div className="body">
                    <Grid>
                        { this.props.tour.runs.filter(run => run.heat === this.state.heat).map(run =>
                            <Participant
                                key={ run.id }
                                run={ run }
                                layoutClass={ this.props.layoutClass }
                                disciplineJudge={ this.props.disciplineJudge }
                                onScoreUpdate={ this.props.onScoreUpdate }
                                onScoreConfirm={ this.props.onScoreConfirm } />
                        )}
                    </Grid>
                </div>
            </div>
        );
    }
}
