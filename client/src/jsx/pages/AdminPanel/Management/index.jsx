import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import Clubs from "./clubs";
import CompetitionPlan from "./CompetitionPlan";
import CompetitionReport from "./CompetitionReport";
import Disciplines from "./Disciplines";
import ImportExport from "./ImportExport";
import Judges from "./Judges";
import Participants from "./Participants";
import SideMenu from "./SideMenu";
import StartList from "./StartList";
import Tours from "./Tours";

export default class Management extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            page: this.getPageFromHash(),
            pageProps: this.getPagePropsFromHash(),
        };
    }

    // Navigation

    switchPage(page, props) {
        this.setState({
            page: page,
            pageProps: props,
        });
        let props_pairs = [];
        Object.getOwnPropertyNames(props).forEach(key => {
            props_pairs.push([key, props[key]]);
        });
        const props_pairs_str = props_pairs.map(p => p.join("=")).join("$");
        window.location.hash = `#management/${page}/${props_pairs_str}`;
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (
            chunks[1] &&
            [
                "import_export",
                "manage_competition_plan",
                "manage_tours",
                "manage_participants",
                "manage_judges",
                "manage_clubs",
                "manage_disciplines",
                "start_list",
                "competition_report",
            ].indexOf(chunks[1]) >= 0
        ) {
            return chunks[1];
        }
        return null;
    }
    getPagePropsFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[2]) {
            let result = {};
            chunks[2].split("$").forEach(function(pair_str) {
                let pair = pair_str.split("=");
                if (Number.isSafeInteger(Number(pair[1]))) {
                    pair[1] = Number(pair[1]);
                }
                result[pair[0]] = pair[1];
            });
            return result;
        }
        return {};
    }

    // Handlers

    handleNavigation = (page, page_props) => this.switchPage(page, page_props);

    // Rendering

    renderContent() {
        const Component = {
            import_export: ImportExport,
            manage_tours: Tours,
            manage_participants: Participants,
            manage_judges: Judges,
            manage_clubs: Clubs,
            manage_competition_plan: CompetitionPlan,
            manage_disciplines: Disciplines,
            start_list: StartList,
            competition_report: CompetitionReport,
        }[this.state.page];
        if (!Component) {
            return null;
        }
        return (
            <Component competition={this.props.competition} {...this.state.pageProps} />
        );
    }
    render() {
        return (
            <div className="Management">
                <SideMenu
                    activePage={this.state.page}
                    activePageProps={this.state.pageProps}
                    competition={this.props.competition}
                    onNavigate={this.handleNavigation}
                />
                {this.renderContent()}
            </div>
        );
    }
}
