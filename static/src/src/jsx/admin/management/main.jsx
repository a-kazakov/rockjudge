import { _ } from "l10n/loader";
import { Clubs } from "./clubs";
import { CompetitionPlan } from "./competition_plan";
import { CompetitionReport } from "./competition_report";
import { Disciplines } from "./disciplines";
import { ImportExport } from "./import_export";
import { Judges } from "./judges";
import { Participants  } from "./participants";
import { StartList } from "./start_list";
import { Tours } from "./tours";


export class Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "page": this.getPageFromHash(),
            "page_props": this.getPagePropsFromHash(),
        };
    }
    switchPage(page, props) {
        this.setState({
            page: page,
            page_props: props,
        });
        let props_pairs = [];
        Object.getOwnPropertyNames(props).forEach((key) => {
            props_pairs.push([key, props[key]]);
        });
        window.location.hash = "#management/" + page + "/" + props_pairs.map((p) => p.join("=")).join("$");
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[1] && [
                "import_export",
                "manage_competition_plan",
                "manage_tours",
                "manage_participants",
                "manage_judges",
                "manage_clubs",
                "manage_disciplines",
                "start_list",
                "competition_report"].indexOf(chunks[1]) >= 0) {
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
                result[pair[0]] = pair[1];
            });
            return result;
        }
        return {};
    }
    renderDiscipline(ic, page) {
        return <div
                className={ "level-2" + (
                    this.state.page === page
                        && this.state.page_props.discipline_id === ic.id
                        ? " active" : "") }
                key={ ic.id }
                onClick={ this.switchPage.bind(this, page, { discipline_id: ic.id }) }>
            { ic.name }
        </div>
    }
    renderContent() {
        switch (this.state.page) {
        case "import_export":
            return <ImportExport competition_id={ this.props.competition_id } />
        case "manage_tours":
            // Seeking for discipline with given ID
            let ic = null;
            this.props.disciplines.forEach(function(el) {
                if (el.id === this.state.page_props.discipline_id) {
                    ic = el;
                }
            }.bind(this));
            return <Tours
                key={ this.state.page_props.discipline_id }
                discipline={ ic } />
        case "manage_participants":
            return <Participants
                key={ this.state.page_props.discipline_id }
                discipline_id={ this.state.page_props.discipline_id } />
        case "manage_judges":
            return <Judges
                judges={ this.props.judges }
                competition_id={ this.props.competition_id } />
        case "manage_clubs":
            return <Clubs
                clubs={ this.props.clubs }
                competition_id={ this.props.competition_id } />
        case "manage_competition_plan":
            return <CompetitionPlan
                items={ this.props.competition_plan }
                disciplines={ this.props.disciplines }
                competition_name={ this.props.competition_name }
                competition_date={ this.props.competition_date }
                competition_id={ this.props.competition_id } />
        case "manage_disciplines":
            return <Disciplines
                disciplines={ this.props.disciplines }
                judges={ this.props.judges }
                competition_id={ this.props.competition_id } />
        case "start_list":
            return <StartList
                competition_id={ this.props.competition_id } />
        case "competition_report":
            return <CompetitionReport
                competition_id={ this.props.competition_id } />
        }
    }
    renderSideMenu() {
        var ics_tours = this.props.disciplines.map(function(ic) {
            return this.renderDiscipline(ic, "manage_tours");
        }.bind(this));
        var ics_participants = this.props.disciplines.map(function(ic) {
            return this.renderDiscipline(ic, "manage_participants");
        }.bind(this));
        return <div className="side-menu">
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page === "import_export" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "import_export", {}) } >
                    { _("admin.menu.import_export") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page === "manage_judges" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_judges", {}) }>
                    { _("admin.menu.manage_judges") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page === "manage_disciplines" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_disciplines", {}) }>
                    { _("admin.menu.manage_disciplines") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page === "manage_clubs" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_clubs", {}) }>
                    { _("admin.menu.manage_clubs") }
                </div>
            </div>
            <details className="block" open={ !!parseInt(sessionStorage.getItem("D_SPORTSMEN")) }>
                <summary className="level-1" onClick={ (e) => sessionStorage.setItem("D_SPORTSMEN", e.target.parentNode.open ? 0 : 1) }>
                    { _("admin.menu.manage_sportsmen") }
                </summary>
                { ics_participants }
            </details>
            <details className="block" open={ !!parseInt(sessionStorage.getItem("D_TOURS")) }>
                <summary className="level-1" onClick={ (e) => sessionStorage.setItem("D_TOURS", e.target.parentNode.open ? 0 : 1) }>
                    { _("admin.menu.manage_tours") }
                </summary>
                { ics_tours }
            </details>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page === "manage_competition_plan" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_competition_plan", {}) }>
                    { _("admin.menu.manage_competition_plan") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page === "start_list" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "start_list", {}) }>
                    { _("admin.menu.start_list") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page === "competition_report" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "competition_report", {}) }>
                    { _("admin.menu.competition_report") }
                </div>
            </div>
        </div>
    }
    render() {
        return <div className="app">
            { this.renderSideMenu() }
            { this.renderContent() }
        </div>
    }
}
