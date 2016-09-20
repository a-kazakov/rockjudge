import CacheMixin from "common/CacheMixin";

import Header from "JudgeTablet/Header";
import Grid from "JudgeTablet/Grid";
import Participant from "./Participant";

export default class GeneralLayout extends CacheMixin(React.Component) {
    constructor(props) {
        super(props);
        this.state = {
            heat: this.first_non_confirmed_heat,
        };
    }
    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.resetCache();
            this.setState({
                heat: this.first_non_confirmed_heat,
            });
            this.props = prev_props;
        }
    }
    get heats_count() {
        return this.fetchFromCache("heats_count", () =>
            Math.max(...this.props.tour.runs.map(run => run.heat))
        );
    }
    get runs() {
        return this.fetchFromCache("runs", () =>
            this.props.tour.runs.filter(run => run.heat === this.state.heat)
        );
    }
    get first_non_confirmed_heat() {
        for (const run of this.props.tour.runs) {
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id && !score.confirmed && run.performed) {
                    return run.heat;
                }
            }
        }
        return this.heats_count;
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
    render() {
        return (
            <div className="rosfarr-JudgeTablet GeneralLayout">
                <Header
                    judge={ this.props.disciplineJudge.judge }
                    tour={ this.props.tour }
                    heat={ this.state.heat }
                    heatsCount={ this.heats_count }
                    maxHeat={ this.first_non_confirmed_heat }
                    onPrevHeatClick={ this.onPrevHeatClick }
                    onNextHeatClick={ this.onNextHeatClick }
                />
                <div className="body">
                    <Grid>
                        { this.props.tour.runs.filter(run => run.heat === this.state.heat).map(run =>
                            <Participant
                                key={ run.id }
                                run={ run }
                                layoutClass={ this.props.layoutClass }
                                disciplineJudge={ this.props.disciplineJudge }
                                onScoreUpdate={ this.props.onScoreUpdate }
                                onScoreConfirm={ this.props.onScoreConfirm }
                            />
                        )}
                    </Grid>
                </div>
            </div>
        );
    }
}
