import _ from "l10n";
import { Api } from "server/api";
import { Loader } from "ui/components";
import { Docx } from "common/docx";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";

import ConfigPanel from "AdminPanel/common/ConfigPanel";
import Paper from "AdminPanel/common/Paper";

import Clubs from "./Clubs";
import ClubsSummary from "./ClubsSummary";
import Disciplines from "./Disciplines";
import DisciplinesSummary from "./DisciplinesSummary";
import Numbers from "./Numbers";
import groupParticipants from "./groupParticipants";

export default class StartList extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

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
    componentWillMount() {
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.competition.id !== next_props.competition.id) {
            this.setState({
                competition: null,
            });
            this.freeStorage(this.props.competition.id);
            this.setupStorage(next_props.competition.id);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.competition.id !== this.props.competition.id) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
            disciplines: {
                participants: {
                    club: {},
                    programs: {},
                },
            },
            clubs: {},
        };
    }

    setupStorage(competition_id=null) {
        if (competition_id === null) {
            competition_id = this.props.competition.id;
        }
        this.storage = storage.getDomain(`start_list_${competition_id}`);
    }
    freeStorage(competition_id=null) {
        if (competition_id === null) {
            competition_id = this.props.competition.id;
        }
        storage.delDomain(`start_list_${competition_id}`);
    }

    reloadFromStorage = () => {
        const competition = this.storage.get("Competition")
            .by_id(this.props.competition.id)
            .serialize(this.SCHEMA);
        let config = Object.assign({}, this.state.config); // clone
        let new_disciplines_config = {};
        let new_clubs_config = {};
        for (const discipline of competition.disciplines) {
            new_disciplines_config[discipline.id] = (discipline.id in config.disciplines)
                ? config.disciplines[discipline.id]
                : true;
        }
        competition.clubs.forEach(club => {
            new_clubs_config[club.id] = (club.id in config.clubs)
                ? config.clubs[club.id]
                : true;
        });
        config.disciplines = new_disciplines_config;
        config.clubs = new_clubs_config;
        this.setState({
            config: config,
            competition: competition,
        });
    }

    loadData = () => {
        Api("competition.get", {
            competition_id: this.props.competition.id,
            children: this.SCHEMA,
        })
            .addToDB("Competition", this.props.competition.id, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
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
            <div className="app-content">
                <header className="app-header">
                    <div className="controls">
                        <button
                            className="btn btn-primary"
                            onClick={ this.handleDocxCreation }
                        >
                            DOCX
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={ this.handleNumbersDocxCreation }
                        >
                            { _("admin.buttons.docx_numbers") }
                        </button>
                    </div>
                    <h1>{ _("admin.headers.start_list") }</h1>
                </header>
                <div className="app-body start-list">
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
