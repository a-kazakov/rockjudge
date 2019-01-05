import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";
import ResultsPage from "./ResultsPage";
import ActionsPage from "./ActionsPage";
import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "JudgeTablet/HeadJudgeLayout/ScoringLayout";
import GeneralHeat from "JudgeTablet/GeneralLayout/GeneralHeat";

export default class HeadJudgeLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    static checkScoreCompletition() {
        return true;
    }

    state = {
        page: "heats",
    };

    componentDidUpdate(prevProps) {
        if (prevProps.tour.id !== this.props.tour.id) {
            this.setState({
                page: "heats",
            });
        }
    }

    handlePageChange = page => this.setState({ page });

    getHeatRenderer() {
        switch (this.state.page) {
            case "heats":
                return GeneralHeat;
            case "results":
                return ResultsPage;
            case "actions":
                return ActionsPage;
        }
    }
    renderFooter = () => {
        return (
            <Footer value={this.state.page} onChange={this.handlePageChange}>
                <FooterItem
                    label={_("tablet.pages.heats")}
                    mkey="heats"
                    type="button"
                />
                <FooterItem
                    label={_("tablet.pages.results")}
                    mkey="results"
                    type="button"
                />
                <FooterItem
                    label={_("tablet.pages.actions")}
                    mkey="actions"
                    type="button"
                />
            </Footer>
        );
    };

    render() {
        return (
            <GeneralLayout
                alwaysRenderParticipantLayout
                classNames={{ HeadJudgeLayout: true }}
                disciplineJudge={this.props.disciplineJudge}
                footerRenderer={this.renderFooter}
                heatRenderer={this.getHeatRenderer()}
                initialHeatMode="first"
                participantLayoutRenderer={ScoringLayout}
                scoreCompletionChecker={this.constructor.checkScoreCompletition}
                tour={this.props.tour}
                onScoreUpdate={this.props.onScoreUpdate}
            />
        );
    }
}
