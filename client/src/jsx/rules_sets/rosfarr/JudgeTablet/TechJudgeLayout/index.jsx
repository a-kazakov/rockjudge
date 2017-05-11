import _ from "l10n";

import Header from "JudgeTablet/Header";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import DancingPage from "./DancingPage";
import AcroPage from "./AcroPage";
import ResultsTable2 from "ResultsTable2";

export default class TechJudgeLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
                judge: PT.object.isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                scoring_system_name: PT.string.isRequired,
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
            onScoreUpdate: PT.func.isRequired,
        };
    }

    static canConfirm() {
        return true;
    }

    constructor(props) {
        super(props);
        this.state = {
            heat: this.getFirstNonConfirmedHeat(),
            page: "dancing",
            showResults: false,
        };
    }
    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.setState({
                heat: this.getFirstNonConfirmedHeat(),
                page: "dancing",
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
    checkCanFinish(props=null) {
        if (props === null) {
            props = this.props;
        }
        function checkScoreIsBad(s) {
            return s.discipline_judge_id === props.disciplineJudge.id &&
                   !s.confirmed;
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


    setHeat = (heat) => this.setState({ heat });
    updateHeat = (delta) => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);
    handlePageChange = (page) => this.setState({ page });
    handleFinishClick = () => this.setState({ showResults: true });
    handleReturnClick = () => this.setState({ showResults: false });

    handleConfirm = () => {
        this.props.onHeatConfirm(this.state.heat);
    }

    renderDancing() {
        return (
            <DancingPage
                disciplineJudge={ this.props.disciplineJudge }
                runs={ this.runs }
                scores={ this.scores }
                tour={ this.props.tour }
                onScoreUpdate={ this.props.onScoreUpdate }
            />
        );
    }
    renderAcro() {
        return (
            <AcroPage
                disciplineJudge={ this.props.disciplineJudge }
                runs={ this.runs }
                scores={ this.scores }
                tour={ this.props.tour }
                onScoreUpdate={ this.props.onScoreUpdate }
            />
        );
    }
    renderHeader() {
        const heats_count = this.heats_count;
        return (
            <Header
                canFinish={ !this.state.showResults && this.can_finish }
                canReturn={ this.state.showResults }
                heat={ this.state.heat }
                heatsCount={ heats_count }
                hideHeatsButtons={ this.state.showResults }
                judge={ this.props.disciplineJudge.judge }
                maxHeat={ this.first_non_confirmed_heat }
                tour={ this.props.tour }
                onFinishClick={ this.handleFinishClick }
                onNextHeatClick={ this.handleNextHeatClick }
                onPrevHeatClick={ this.handlePrevHeatClick }
                onReturnClick={ this.handleReturnClick }
            />
        );
    }
    renderBody() {
        if (this.state.showResults) {
            return (
                <ResultsTable2 tour={ this.props.tour } />
            );
        }
        switch (this.state.page) {
        case "dancing":
            return this.renderDancing();
        case "acro":
            return this.renderAcro();
        }
    }
    renderFooter() {
        if (["rosfarr.acro", "rosfarr.am_qual", "rosfarr.am_final_acro"].indexOf(this.props.tour.scoring_system_name) < 0) {
            return null;
        }
        return (
            <Footer value={ this.state.page } onChange={ this.handlePageChange }>
                <FooterItem
                    label={ _("tablet.pages.dancing") }
                    mkey="dancing"
                />
                <FooterItem
                    label={ _("tablet.pages.acro") }
                    mkey="acro"
                />
            </Footer>
        );
    }
    renderConfirmation() {
        if (this.state.showResults) {
            return null;
        }
        return (
            <ConfirmationButton
                canConfirm
                confirmed={ Array.from(this.scores.values()).every(s => s.confirmed) }
                key={ this.state.heat }
                onConfirm={ this.handleConfirm }
            />
        );
    }
    render() {
        this.setupCache();
        return (
            <div className="rosfarr-JudgeTablet TechJudgeLayout">
                { this.renderHeader() }
                <div className="body">
                    { this.renderBody() }
                    { this.renderConfirmation() }
                </div>
                { this.renderFooter() }
            </div>
        );
    }
}
