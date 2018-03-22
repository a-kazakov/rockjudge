import Header from "JudgeTablet/Header";
import Grid from "JudgeTablet/Grid";
import Participant from "./Participant";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";


export default class GeneralLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            confirmationClass: PT.func.isRequired,
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
                judge: PT.object.isRequired,
            }).isRequired,
            footerText: PT.string,
            layoutClass: PT.func.isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        heat: PT.number.isRequired,
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            onHeatConfirm: PT.func.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    static get defaultProps() {
        return {
            footerText: null,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            heat: this.getFirstUncompletedHeat(),
            showResults: false,
        };
        this.setupCache();
    }

    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.setState({
                heat: this.getFirstUncompletedHeat(),
                showResults: false,
            });
            this.props = prev_props;
        }
        if (this.state.showResults) {
            if (!this.checkCanFinish(next_props)) {
                this.setState({
                    showResults: false,
                });
            }
        }
    }

    getFirstUncompletedHeat() {
        for (const run of this.props.tour.runs) {
            if (run.heat <= 0) {
                continue;
            }
            let found = false;
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    if (!score.data.raw_data.completed && run.status === "OK") {
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
    checkCanFinish(props=null) {
        if (props === null) {
            props = this.props;
        }
        function checkScoreIsBad(s) {
            return s.discipline_judge_id === props.disciplineJudge.id &&
                   !s.data.raw_data.completed;
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
        this.first_uncompleted_heat = this.getFirstUncompletedHeat();
        this.scores = this.getScores();
        this.can_finish = this.checkCanFinish();
    }


    setHeat = (heat) => this.setState({ heat });
    updateHeat = (delta) => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);
    handleFinishClick = () => this.setState({ showResults: true });
    handleReturnClick = () => this.setState({ showResults: false });

    renderScoringLayout() {
        return (
            <div className="body">
                <Grid>
                    { this.runs.map(run =>
                        <Participant
                            disciplineJudge={ this.props.disciplineJudge }
                            key={ run.id }
                            layoutClass={ this.props.layoutClass }
                            run={ run }
                            score={ this.scores.get(run.id) }
                            onScoreUpdate={ this.props.onScoreUpdate }
                        />
                    )}
                </Grid>
            </div>
        );
    }
    renderBody() {
        if (this.state.showResults) {
            const ConfirmationClass = this.props.confirmationClass;
            if (ConfirmationClass === null) {
                return null;
            }
            return (
                <ConfirmationClass
                    disciplineJudge={ this.props.disciplineJudge }
                    tour={ this.props.tour }
                />
            );
        }
        return this.renderScoringLayout();
    }
    renderFooter() {
        if (this.props.footerText === null) {
            return null;
        }
        return (
            <Footer>
                <FooterItem
                    type="text"
                    value={ this.props.footerText }
                />
            </Footer>
        );
    }

    render() {
        this.setupCache();
        return (
            <div className="skating-JudgeTablet GeneralLayout">
                <Header
                    canFinish={ !this.state.showResults && this.can_finish }
                    canReturn={ this.state.showResults }
                    heat={ this.state.heat }
                    heatsCount={ this.heats_count }
                    hideHeatsButtons={ this.state.showResults }
                    judge={ this.props.disciplineJudge.judge }
                    maxHeat={ this.first_uncompleted_heat }
                    tour={ this.props.tour }
                    onFinishClick={ this.handleFinishClick }
                    onNextHeatClick={ this.handleNextHeatClick }
                    onPrevHeatClick={ this.handlePrevHeatClick }
                    onReturnClick={ this.handleReturnClick }
                />
                { this.renderBody() }
                { this.renderFooter() }
            </div>
        );
    }
}
