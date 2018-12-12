import { React } from "HostModules";

import ConfirmationButton from "JudgeTablet/components/ConfirmationButton";
import Grid from "JudgeTablet/components/Grid";
import Header from "JudgeTablet/components/Header";
import PT from "prop-types";
import LastPage from "../components/LastPage";
import Participant from "./Participant";

export default class GeneralLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        layoutClass: PT.func.isRequired,
        smallBlocks: PT.bool,
        tour: PT.object.isRequired,
        onHeatConfirm: PT.func.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            smallBlocks: false,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            heat: this.getFirstNonConfirmedHeat(),
            showLastPage: false,
        };
        this.setupCache();
    }

    UNSAFE_componentWIllReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.setState({
                heat: this.getFirstNonConfirmedHeat(),
                showLastPage: false,
            });
            this.props = prev_props;
        }
        if (this.state.showLastPage) {
            if (!this.checkCanFinish(next_props)) {
                this.setState({
                    showLastPage: false,
                });
            }
        }
    }

    canConfirm() {
        for (const run of this.runs) {
            const score = this.scores.get(run.id);
            if (!score) {
                return false;
            }
            const score_data = score.data;
            if (score.confirmed) {
                continue;
            }
            if (run.status !== "OK") {
                continue;
            }
            if (this.props.layoutClass.canConfirm) {
                if (!this.props.layoutClass.canConfirm(score_data, run)) {
                    return false;
                }
            } else {
                for (const key of Object.keys(score_data)) {
                    const value = score_data[key];
                    if (value == null) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    handleConfirm = () => {
        this.props.onHeatConfirm(this.state.heat);
    };

    getFirstNonConfirmedHeat() {
        for (const run of this.props.tour.runs) {
            if (run.heat <= 0) {
                continue;
            }
            let found = false;
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    if (!score.confirmed && run.status === "OK") {
                        return run.heat;
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                return run.heat;
            }
        }
        return (
            this.heats_count ||
            Math.max(1, ...this.props.tour.runs.map(run => run.heat))
        );
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
    checkCanFinish(props = null) {
        if (props == null) {
            props = this.props;
        }
        if (this.state.heat !== this.heats_count) {
            return false;
        }
        function checkScoreIsBad(s) {
            return s.discipline_judge_id === props.disciplineJudge.id && !s.confirmed;
        }
        for (const run of props.tour.runs) {
            if (run.status !== "OK" || run.heat <= 0) {
                continue;
            }
            if (run.scores.some(checkScoreIsBad)) {
                return false;
            }
        }
        return true;
    }
    setupCache() {
        this.heats_count = Math.max(1, ...this.props.tour.runs.map(run => run.heat));
        this.runs = this.props.tour.runs.filter(run => run.heat === this.state.heat);
        this.first_non_confirmed_heat = this.getFirstNonConfirmedHeat();
        this.scores = this.getScores();
        this.can_finish = this.checkCanFinish();
    }

    setHeat = heat => this.setState({ heat });
    updateHeat = delta => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);
    handleFinishClick = () => this.setState({ showLastPage: true });
    handleReturnClick = () => this.setState({ showLastPage: false });

    checkRunConfirmed = run => {
        const score = this.scores.get(run.id);
        return run.status !== "OK" || score?.confirmed;
    };

    renderBody() {
        if (this.state.showLastPage) {
            return <LastPage />;
        }
        return (
            <div className="body">
                <Grid smallBlocks={this.props.smallBlocks}>
                    {this.runs.map(run => (
                        <Participant
                            disciplineJudge={this.props.disciplineJudge}
                            key={run.id}
                            layoutClass={this.props.layoutClass}
                            run={run}
                            score={this.scores.get(run.id)}
                            tour={this.props.tour}
                            onScoreUpdate={this.props.onScoreUpdate}
                        />
                    ))}
                </Grid>
                <ConfirmationButton
                    canConfirm={this.canConfirm()}
                    confirmed={this.runs.every(this.checkRunConfirmed)}
                    key={this.state.heat}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }

    render() {
        this.setupCache();
        return (
            <div className="vftsarr-JudgeTablet GeneralLayout">
                <Header
                    canFinish={!this.state.showLastPage && this.can_finish}
                    canReturn={this.state.showLastPage}
                    heat={this.state.heat}
                    heatsCount={this.heats_count}
                    hideHeatsButtons={this.state.showLastPage}
                    judge={this.props.disciplineJudge.judge}
                    maxHeat={this.first_non_confirmed_heat}
                    tour={this.props.tour}
                    onFinishClick={this.handleFinishClick}
                    onNextHeatClick={this.handleNextHeatClick}
                    onPrevHeatClick={this.handlePrevHeatClick}
                    onReturnClick={this.handleReturnClick}
                />
                {this.renderBody()}
            </div>
        );
    }
}
