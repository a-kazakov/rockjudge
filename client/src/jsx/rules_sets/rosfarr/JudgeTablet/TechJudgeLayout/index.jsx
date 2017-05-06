import _ from "l10n";

import Header from "JudgeTablet/Header";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import DancingPage from "./DancingPage";
import AcroPage from "./AcroPage";

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
        };
    }
    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.setState({
                heat: this.getFirstNonConfirmedHeat(),
                page: "dancing",
            });
            this.props = prev_props;
        }
    }

    getFirstNonConfirmedHeat() {
        for (const run of this.props.tour.runs) {
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id && !score.confirmed && run.status === "OK") {
                    return run.heat;
                }
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
    handlePageChange = (page) => this.setState({ page });

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
                heat={ this.state.heat }
                heatsCount={ heats_count }
                judge={ this.props.disciplineJudge.judge }
                maxHeat={ this.first_non_confirmed_heat }
                tour={ this.props.tour }
                onNextHeatClick={ this.handleNextHeatClick }
                onPrevHeatClick={ this.handlePrevHeatClick }
            />
        );
    }
    renderBody() {
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
    render() {
        this.setupCache();
        return (
            <div className="rosfarr-JudgeTablet TechJudgeLayout">
                { this.renderHeader() }
                <div className="body">
                    { this.renderBody() }
                    <ConfirmationButton
                        canConfirm
                        confirmed={ Array.from(this.scores.values()).every(s => s.confirmed) }
                        key={ this.state.heat }
                        onConfirm={ this.handleConfirm }
                    />
                </div>
                { this.renderFooter() }
            </div>
        );
    }
}
