import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import Header from "JudgeTablet/Header";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";

import DancingPage from "./DancingPage";
import AcroPage from "./AcroPage";

export default class HeadJudgeLayout extends CacheMixin(React.Component) {
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
    onPrevHeatClick = () => {
        this.updateHeat(this.state.heat - 1);
    }
    onNextHeatClick = () => {
        this.updateHeat(this.state.heat + 1);
    }
    onPageChange = (page) => {
        this.setState({ page });
    }
    renderDancing() {
        return (
            <DancingPage
                runs={ this.runs }
                disciplineJudge={ this.props.disciplineJudge }
                onScoreUpdate={ this.props.onScoreUpdate }
                onScoreConfirm={ this.props.onScoreConfirm }
            />
        );
    }
    renderAcro() {
        return (
            <AcroPage
                runs={ this.runs }
                disciplineJudge={ this.props.disciplineJudge }
                onScoreUpdate={ this.props.onScoreUpdate }
                onScoreConfirm={ this.props.onScoreConfirm }
            />
        );
    }
    renderHeader() {
        const heats_count = this.heats_count;
        return (
            <Header
                judge={ this.props.disciplineJudge.judge }
                tour={ this.props.tour }
                heat={ this.state.heat }
                heatsCount={ heats_count }
                maxHeat={ this.first_non_confirmed_heat }
                onPrevHeatClick={ this.onPrevHeatClick }
                onNextHeatClick={ this.onNextHeatClick }
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
            <Footer value={ this.state.page } onChange={ this.onPageChange }>
                <FooterItem
                    label={ _("tablet.pages.dancing") }
                    mkey="dancing" />
                <FooterItem
                    label={ _("tablet.pages.acro") }
                    mkey="acro" />
            </Footer>
        );
    }
    render() {
        return (
            <div className="judge-tablet">
                { this.renderHeader() }
                { this.renderBody() }
                { this.renderFooter() }
            </div>
        );
    }
}
