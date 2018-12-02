import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Header from "JudgeTablet/Header";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";

import HeatsPage from "./HeatsPage";
import ResultsPage from "./ResultsPage";
import ActionsPage from "./ActionsPage";

export default class HeadJudgeLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            heat: 1,
            page: "heats",
        };
    }

    UNSAFE_componentWIllReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            this.setState({
                heat: 1,
                page: "heats",
            });
        }
    }

    getHeatsCount() {
        return Math.max(1, ...this.props.tour.runs.map(run => run.heat));
    }

    setHeat = (heat) => this.setState({ heat });
    updateHeat = (delta) => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);
    handlePageChange = (page) => this.setState({ page });

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
        const heats_count = this.getHeatsCount();
        return (
            <Header
                heat={ this.state.heat }
                heatsCount={ heats_count }
                hideHeatsButtons={ this.state.page !== "heats" }
                judge={ this.props.disciplineJudge.judge }
                maxHeat={ heats_count }
                tour={ this.props.tour }
                onNextHeatClick={ this.handleNextHeatClick }
                onPrevHeatClick={ this.handlePrevHeatClick }
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
            <Footer
                value={ this.state.page }
                onChange={ this.handlePageChange }
            >
                <FooterItem
                    label={ _("tablet.pages.heats") }
                    mkey="heats"
                    type="button"
                />
                <FooterItem
                    label={ _("tablet.pages.results") }
                    mkey="results"
                    type="button"
                />
                <FooterItem
                    label={ _("tablet.pages.actions") }
                    mkey="actions"
                    type="button"
                />
            </Footer>
        );
    }
    render() {
        return (
            <div className="skating-JudgeTablet HeadJudgeLayout">
                { this.renderHeader() }
                { this.renderBody() }
                { this.renderFooter() }
            </div>
        );
    }
}