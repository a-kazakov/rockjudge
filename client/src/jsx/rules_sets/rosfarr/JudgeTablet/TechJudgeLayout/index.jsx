import _ from "l10n";

import Header from "JudgeTablet/Header";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";

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
            onScoreConfirm: PT.func.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
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
    setupCache() {
        this.heats_count = Math.max(1, ...this.props.tour.runs.map(run => run.heat));
        this.runs = this.props.tour.runs.filter(run => run.heat === this.state.heat);
        this.first_non_confirmed_heat = this.getFirstNonConfirmedHeat();
    }


    setHeat = (heat) => this.setState({ heat });
    updateHeat = (delta) => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);
    handlePageChange = (page) => this.setState({ page });

    renderDancing() {
        return (
            <DancingPage
                disciplineJudge={ this.props.disciplineJudge }
                runs={ this.runs }
                tour={ this.props.tour }
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
                tour={ this.props.tour }
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
        this.setupCache();
        return (
            <div className="rosfarr-JudgeTablet TechJudgeLayout">
                { this.renderHeader() }
                { this.renderBody() }
                { this.renderFooter() }
            </div>
        );
    }
}
