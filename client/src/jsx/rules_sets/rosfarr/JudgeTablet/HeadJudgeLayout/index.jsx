import _ from "l10n";

import Header from "JudgeTablet/Header";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";

import HeatsPage from "./HeatsPage";
import ResultsPage from "./ResultsPage";
import ActionsPage from "./ActionsPage";

export default class HeadJudgeLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heat: 1,
            page: "heats",
        };
    }
    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            this.setState({
                heat: 1,
                page: "heats",
            });
        }
    }
    get heats_count() {
        return Math.max(...this.props.tour.runs.map(run => run.heat));
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
    renderHeats() {
        return (
            <HeatsPage
                disciplineJudge={ this.props.disciplineJudge }
                heat={ this.state.heat }
                tour={ this.props.tour }
                onScoreUpdate={ this.props.onScoreUpdate }
            />
        );
    }
    renderResults() {
        return (
            <ResultsPage
                tour={ this.props.tour }
            />
        );
    }
    renderActions() {
        return (
            <ActionsPage
                tour={ this.props.tour }
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
                maxHeat={ heats_count }
                onPrevHeatClick={ this.onPrevHeatClick }
                onNextHeatClick={ this.onNextHeatClick }
            />
        );
    }
    renderBody() {
        switch (this.state.page) {
        case "heats":
            return this.renderHeats();
        case "results":
            return this.renderResults();
        case "actions":
            return this.renderActions();
        }
    }
    renderFooter() {
        return (
            <Footer value={ this.state.page } onChange={ this.onPageChange }>
                <FooterItem
                    label={ _("tablet.pages.heats") }
                    mkey="heats"
                />
                <FooterItem
                    label={ _("tablet.pages.results") }
                    mkey="results"
                />
                <FooterItem
                    label={ _("tablet.pages.actions") }
                    mkey="actions"
                />
            </Footer>
        );
    }
    render() {
        return (
            <div className="rosfarr-JudgeTablet HeadJudgeLayout">
                { this.renderHeader() }
                { this.renderBody() }
                { this.renderFooter() }
            </div>
        );
    }
}
