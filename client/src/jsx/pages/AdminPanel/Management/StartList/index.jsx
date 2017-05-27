import _ from "l10n";
import Api from "common/server/Api";
import Loader from "common/components/Loader";
import Docx from "common/Docx";
import storage from "common/server/storage";
import websocket from "common/server/websocket";

import ConfigPanel from "pages/AdminPanel/common/ConfigPanel";
import Paper from "pages/AdminPanel/common/Paper";

import Clubs from "./Clubs";
import ClubsSummary from "./ClubsSummary";
import Disciplines from "./Disciplines";
import DisciplinesSummary from "./DisciplinesSummary";
import Numbers from "./Numbers";
import groupParticipants from "./groupParticipants";

export default class StartList extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

    CLASS_ID = "start_list";
    API_MODELS = {
        competition: {
            model_type: "Competition",
            model_id_getter: props => props.competition.id,
            schema: {
                disciplines: {
                    participants: {
                        club: {},
                        programs: {},
                    },
                },
                clubs: {},
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            competition: null,
            config: {
                include_formation_sportsmen: false,
                include_acrobatics: false,
                group_by_clubs: false,
                show_sportsmen_only: false,
                show_summary: false,
                disciplines: {},
                clubs: {},
            },
        }
    }

    getAdditionalStateUpdate(nextState) {
        if (nextState.competition === null) {
            return {};
        }
        let config = Object.assign({}, nextState.config); // clone
        let new_disciplines_config = {};
        let new_clubs_config = {};
        for (const discipline of nextState.competition.disciplines) {
            new_disciplines_config[discipline.id] = (discipline.id in config.disciplines)
                ? config.disciplines[discipline.id]
                : true;
        }
        for (const club of nextState.competition.clubs) {
            new_clubs_config[club.id] = (club.id in config.clubs)
                ? config.clubs[club.id]
                : true;
        };
        config.disciplines = new_disciplines_config;
        config.clubs = new_clubs_config;
        return { config };
    }

    makeNumbersRef = (ref) => this._numbers = ref;
    makePrintableRef = (ref) => this._printable = ref;

    handleConfigChange = (config) => this.setState({ config });

    handleDocxCreation = () => this.createDocx();
    handleNumbersDocxCreation = () => this._numbers.createDocx();

    getTitle() {
        if (this.state.config.show_summary) {
            if (this.state.config.group_by_clubs) {
                return _("admin.headers.clubs_summary");
            }
            return _("admin.headers.disciplines_summary");
        }
        if (this.state.config.show_sportsmen_only) {
            return _("admin.headers.sportsmen_list")
        }
        return _("admin.headers.start_list");
    }
    renderBody() {
        const props = {
            competition: this.state.competition,
            config: this.state.config,
        }
        if (this.state.config.show_summary) {
            if (this.state.config.group_by_clubs) {
                return (
                    <ClubsSummary { ...props } />
                );
            }
            return (
                <DisciplinesSummary { ...props } />
            );
        }
        if (this.state.config.group_by_clubs) {
            return (
                <Clubs { ...props } />
            );
        }
        return (
            <Disciplines { ...props } />
        );
    }
    renderNumbers() {
        const participants_groups = groupParticipants(this.state.competition, this.state.config);
        return (
            <Numbers
                competition={ this.state.competition }
                participantsGroups={ participants_groups }
                ref={ this.makeNumbersRef }
            />
        )
    }
    render() {  // eslint-disable-line react/sort-comp
        if (this.state.competition === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="StartList">
                <header>
                    <div className="controls">
                        <button onClick={ this.handleDocxCreation }>
                            DOCX
                        </button>
                        <button onClick={ this.handleNumbersDocxCreation }>
                            { _("admin.buttons.docx_numbers") }
                        </button>
                    </div>
                    <h1>
                        { _("admin.headers.start_list") }
                    </h1>
                </header>
                <div className="body">
                    <ConfigPanel
                        clubs={ this.state.competition.clubs }
                        config={ this.state.config }
                        customControls={ [
                            {key: "include_acrobatics",            label: _("admin.labels.include_acrobatics")},
                            {key: "include_formation_sportsmen",   label: _("admin.labels.include_formation_sportsmen")},
                            {key: "group_by_clubs",                label: _("admin.labels.group_by_clubs")},
                            {key: "show_sportsmen_only",           label: _("admin.labels.show_sportsmen_only")},
                            {key: "show_summary",                  label: _("admin.labels.show_summary")},
                        ] }
                        disciplines={ this.state.competition.disciplines }
                        onChange={ this.handleConfigChange }
                    />
                    <Paper
                        header={ `${this.state.competition.name}, ${this.state.competition.date}` }
                        margins={ [10, 15, 10, 25] }
                        ref={ this.makePrintableRef }
                        title1={ this.getTitle() }
                    >
                        { this.renderBody() }
                    </Paper>
                    { this.renderNumbers() }
                </div>
            </div>
        );
    }

    createDocx(filename="start-list.docx") {
        Docx(filename)
            .setMargins([10, 15, 10, 25])
            .setHeader(`${this.state.competition.name}, ${this.state.competition.date}`)
            .setTitle1(this.getTitle())
            .setBody(this._printable.getPrintableHTML())
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "border", "none")
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "padding", "0")
            .addStyle(".inner", "width", "100%")
            .addStyle(".acro", "border-top", "none !important")
            .addStyle(".has-acro td", "border-bottom", "1px solid #555 !important")
            .addStyle(".has-acro td td", "border-bottom", "none !important")
            .addStyle("tr.tr-acro", "page-break-inside", "auto")
            .save();
    }
}

StartList.displayName = "AdminPanel_Management_StartList";
