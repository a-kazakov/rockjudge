import {React} from "HostModules";

import PT from "prop-types";
import Header from "JudgeTablet/Header";
import Grid from "JudgeTablet/Grid";
import Participant from "./Participant";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";
import lastOf from "common/tools/lastOf";


export default class GeneralLayout extends React.Component {
    static propTypes = {
        confirmationClass: PT.func.isRequired,
        disciplineJudge: PT.object.isRequired,
        footerText: PT.string,
        layoutClass: PT.func.isRequired,
        scoreCompletionChecker: PT.func.isRequired,
        tour: PT.object.isRequired,
        onHeatConfirm: PT.func.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    static get defaultProps() {
        return {
            footerText: null,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            heat: this.getStartingHeat(),
            showResults: false,
        };
        this.setupCache();
    }

    UNSAFE_componentWIllReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.setState({
                heat: this.getStartingHeat(),
                showResults: false,
            });
            this.props = prev_props;
        }
    }

    getStartingHeat() {
        const completed_heats = [].concat(...this.props.tour.runs.map(run => run.scores))
            .filter(score => score.discipline_judge_id === this.props.disciplineJudge.id)
            .filter(this.props.scoreCompletionChecker)
            .map(score => score.run.heat);
        return Math.max(1, ...completed_heats);
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
        this.scores = this.getScores();
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
            if (ConfirmationClass == null) {
                return null;
            }
            return (
                <ConfirmationClass
                    disciplineJudge={ this.props.disciplineJudge }
                    tour={ this.props.tour }
                    onScoreUpdate={ this.props.onScoreUpdate }
                />
            );
        }
        return this.renderScoringLayout();
    }
    renderFooter() {
        if (this.props.footerText == null) {
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
                    canFinish={ !this.state.showResults && !this.props.tour.global_storage.hasOverrides() }
                    canReturn={ this.state.showResults }
                    heat={ this.state.heat }
                    heatsCount={ this.heats_count }
                    hideHeatsButtons={ this.state.showResults }
                    judge={ this.props.disciplineJudge.judge }
                    maxHeat={ lastOf(this.props.tour.runs)?.heat ?? 1 }
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