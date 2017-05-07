import Header from "JudgeTablet/Header";
import Grid from "JudgeTablet/Grid";
import Participant from "./Participant";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

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
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                        scores: PT.arrayOf(
                            PT.shape({
                                discipline_judge_id: PT.number.isRequired,
                            }).isRequired,
                        ).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            onHeatConfirm: PT.func.isRequired,
            onScoreConfirm: PT.func.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            heat: this.getFirstNonConfirmedHeat(),
        };
        this.setupCache();
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

    canConfirm() {
        for (const run of this.runs) {
            const score = this.scores.get(run.id);
            if (!score) {
                return false;
            }
            const score_data = score.data.raw_data;
            if (score.confirmed) {
                continue;
            }
            if (this.props.layoutClass.canConfirm) {
                if (!this.props.layoutClass.canConfirm(score_data, run)) {
                    return false;
                }
            } else {
                for (const key of Object.keys(score_data)) {
                    const value = score_data[key];
                    if (value === null) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    handleConfirm = () => {
        this.props.onHeatConfirm(this.state.heat);
    }

    getFirstNonConfirmedHeat() {
        for (const run of this.props.tour.runs) {
            let found = false;
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    if (!score.confirmed && run.status === "OK") {
                        return run.heat;
                    }
                    found = true;
                    continue;
                }
            }
            if (!found) {
                return run.heat;
            }
        }
        return this.heats_count || Math.max(1, ...this.props.tour.runs.map(run => run.heat));
    }
    getScores() {
        let result = new Map();
        for (const run of this.runs) {
            result.set(run.id, null);
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    result.set(run.id, score);
                    break;
                }
            }
        }
        return result;
    }
    setupCache() {
        this.heats_count = Math.max(1, ...this.props.tour.runs.map(run => run.heat));
        this.runs = this.props.tour.runs.filter(run => run.heat === this.state.heat);
        this.first_non_confirmed_heat = this.getFirstNonConfirmedHeat();
        this.scores = this.getScores();
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
                        { this.runs.map(run =>
                            <Participant
                                disciplineJudge={ this.props.disciplineJudge }
                                key={ run.id }
                                layoutClass={ this.props.layoutClass }
                                run={ run }
                                score={ this.scores.get(run.id) }
                                onScoreConfirm={ this.props.onScoreConfirm }
                                onScoreUpdate={ this.props.onScoreUpdate }
                            />
                        )}
                    </Grid>
                    <ConfirmationButton
                        canConfirm={ this.canConfirm() }
                        confirmed={ Array.from(this.scores.values()).every(s => s && s.confirmed) }
                        key={ this.state.heat }
                        onConfirm={ this.handleConfirm }
                    />
                </div>
            </div>
        );
    }
}
