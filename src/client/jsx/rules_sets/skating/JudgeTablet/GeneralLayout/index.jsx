import { React } from "HostModules";

import PT from "prop-types";
import Header from "JudgeTablet/Header";
import lastOf from "common/tools/lastOf";
import GeneralHeat from "JudgeTablet/GeneralLayout/GeneralHeat";
import makeClassName from "common/makeClassName";

export default class GeneralLayout extends React.Component {
    static propTypes = {
        allowIncompleteScores: PT.bool,
        classNames: PT.object,
        disciplineJudge: PT.object.isRequired,
        footerRenderer: PT.func,
        heatRenderer: PT.func,
        initialHeatMode: PT.oneOf(["first", "max"]),
        lastPageRenderer: PT.func,
        scoreCompletionChecker: PT.func.isRequired,
        tour: PT.object.isRequired,
    };

    static defaultProps = {
        allowIncompleteScores: false,
        classNames: {},
        footerRenderer: null,
        initialHeatMode: "max",
        heatRenderer: GeneralHeat,
    };

    state = this._makeInitialState();

    componentDidUpdate(prevProps) {
        if (prevProps.tour.id !== this.props.tour.id) {
            this.setState({
                heat: this.getMaxHeat(),
                showLastPage: false,
            });
        }
    }

    _makeInitialState() {
        switch (this.props.initialHeatMode) {
            case "first":
                return {
                    heat: 1,
                    showLastPage: false,
                };
            case "max": {
                const [max_heat, completed] = this.getMaxHeatAndCompletion();
                return {
                    heat: max_heat,
                    showLastPage: completed && this.props.lastPageRenderer != null,
                };
            }
            default:
                throw new Error(
                    `Invalid initial heat mode: ${this.props.initialHeatMode}`,
                );
        }
    }

    getMaxHeatAndCompletion() {
        const incomplete_heats = []
            .concat(...this.props.tour.runs.map(run => run.scores))
            .filter(
                score => score.discipline_judge_id === this.props.disciplineJudge.id,
            )
            .filter(
                score =>
                    score.run.status === "OK" &&
                    !this.props.scoreCompletionChecker(score),
            )
            .map(score => score.run.heat);
        if (incomplete_heats.length === 0) {
            return [lastOf(this.props.tour.runs)?.heat ?? 1, true];
        }
        return [Math.min(...incomplete_heats), false];
    }

    setHeat = heat => this.setState({ heat });
    updateHeat = delta => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);
    handleFinishClick = () => this.setState({ showLastPage: true });
    handleReturnClick = () => this.setState({ showLastPage: false });

    getHeaderPropsOverrides() {
        return {};
    }

    getClassName() {
        return makeClassName({
            "skating-JudgeTablet": true,
            GeneralLayout: true,
            ...this.props.classNames,
        });
    }

    renderScoringLayout() {
        const {
            heatRenderer: Renderer,
            lastPageRenderer,
            footerRenderer,
            scoreCompletionChecker,
            ...other_props
        } = this.props;
        return <Renderer heat={this.state.heat} {...other_props} />;
    }
    renderLastPage() {
        const {
            lastPageRenderer: Renderer,
            footerRenderer,
            heatRenderer,
            scoreCompletionChecker,
            ...other_props
        } = this.props;
        return <Renderer {...other_props} />;
    }

    renderHeader() {
        const { tour, disciplineJudge } = this.props;
        const heats_count = lastOf(tour.runs)?.heat ?? 1;
        const [max_heat, completed] = this.getMaxHeatAndCompletion();
        return (
            <Header
                canFinish={
                    !this.state.showLastPage &&
                    this.props.lastPageRenderer != null &&
                    (completed || this.props.allowIncompleteScores)
                }
                canReturn={this.state.showLastPage}
                heat={this.state.heat}
                heatsCount={heats_count}
                hideHeatsButtons={this.state.showLastPage}
                judge={disciplineJudge.judge}
                maxHeat={this.props.allowIncompleteScores ? null : max_heat}
                tour={tour}
                onFinishClick={this.handleFinishClick}
                onNextHeatClick={this.handleNextHeatClick}
                onPrevHeatClick={this.handlePrevHeatClick}
                onReturnClick={this.handleReturnClick}
                {...this.getHeaderPropsOverrides()}
            />
        );
    }
    renderBody() {
        return this.state.showLastPage
            ? this.renderLastPage()
            : this.renderScoringLayout();
    }
    renderFooter() {
        const { tour, disciplineJudge, footerRenderer: Renderer } = this.props;
        if (Renderer == null) {
            return null;
        }
        return <Renderer disciplineJudge={disciplineJudge} tour={tour} />;
    }

    render() {
        return (
            <div className={this.getClassName()}>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </div>
        );
    }
}
