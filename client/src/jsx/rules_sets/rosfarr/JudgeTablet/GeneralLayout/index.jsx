import Header from "JudgeTablet/Header";
import Grid from "JudgeTablet/Grid";
import Participant from "./Participant";

export default class GeneralLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
                judge: PT.object.isRequired,
            }).isRequired,
            layoutClass: PT.func.isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        heat: PT.number.isRequired,
                        scores: PT.arrayOf(
                            PT.shape({
                                discipline_judge_id: PT.number.isRequired,
                            }).isRequired,
                        ).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            onScoreConfirm: PT.func.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            heat: this.getFirstNonConfirmedHeat(),
        };
    }

    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.setState({
                heat: this.getFirstNonConfirmedHeat(),
            });
            this.props = prev_props;
        }
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
    setupCache() {
        this.heats_count = Math.max(1, ...this.props.tour.runs.map(run => run.heat));
        this.runs = this.props.tour.runs.filter(run => run.heat === this.state.heat);
        this.first_non_confirmed_heat = this.getFirstNonConfirmedHeat();
    }


    setHeat = (heat) => this.setState({ heat });
    updateHeat = (delta) => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);

    render() {
        this.setupCache();
        return (
            <div className="rosfarr-JudgeTablet GeneralLayout">
                <Header
                    heat={ this.state.heat }
                    heatsCount={ this.heats_count }
                    judge={ this.props.disciplineJudge.judge }
                    maxHeat={ this.first_non_confirmed_heat }
                    tour={ this.props.tour }
                    onNextHeatClick={ this.handleNextHeatClick }
                    onPrevHeatClick={ this.handlePrevHeatClick }
                />
                <div className="body">
                    <Grid>
                        { this.props.tour.runs.filter(run => run.heat === this.state.heat).map(run =>
                            <Participant
                                disciplineJudge={ this.props.disciplineJudge }
                                key={ run.id }
                                layoutClass={ this.props.layoutClass }
                                run={ run }
                                onScoreConfirm={ this.props.onScoreConfirm }
                                onScoreUpdate={ this.props.onScoreUpdate }
                            />
                        )}
                    </Grid>
                </div>
            </div>
        );
    }
}
