import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import Header from "JudgeTablet/Header";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";

import DancingPage from "./DancingPage";
import AcroPage from "./AcroPage";

export default class TechJudgeLayout extends CacheMixin(React.Component) {
    constructor(props) {
        super(props);
        this.state = {
            heat: this.first_non_confirmed_heat,
            page: "dancing",
        };
    }
    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            const prev_props = this.props;
            this.props = next_props;
            this.resetCache();
            this.setState({
                heat: this.first_non_confirmed_heat,
                page: "dancing",
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
    handlePrevHeatClick = () => {
        this.updateHeat(this.state.heat - 1);
    }
    handleNextHeatClick = () => {
        this.updateHeat(this.state.heat + 1);
    }
    handlePageChange = (page) => {
        this.setState({ page });
    }
    renderDancing() {
        return (
            <DancingPage
                disciplineJudge={ this.props.disciplineJudge }
                tour={ this.props.tour }
                runs={ this.runs }
                onScoreConfirm={ this.props.onScoreConfirm }
                onScoreUpdate={ this.props.onScoreUpdate }
            />
        );
    }
    renderAcro() {
        return (
            <AcroPage
                disciplineJudge={ this.props.disciplineJudge }
                runs={ this.runs }
                onScoreConfirm={ this.props.onScoreConfirm }
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
        if (["rosfarr.acro", "rosfarr.am_final_acro"].indexOf(this.props.tour.scoring_system_name) < 0) {
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
        return (
            <div className="rosfarr-JudgeTablet TechJudgeLayout">
                { this.renderHeader() }
                { this.renderBody() }
                { this.renderFooter() }
            </div>
        );
    }
}
