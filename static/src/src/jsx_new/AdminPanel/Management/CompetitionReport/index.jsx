import _ from "l10n";
import Api from "common/server/Api";
import { Loader } from "ui/components";
import Docx from "common/Docx";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

import ConfigPanel from "AdminPanel/common/ConfigPanel";
import Paper from "AdminPanel/common/Paper";

import Info from "./Info";
import Clubs from "./Clubs";
import Judges from "./Judges";
import DisciplineJudges from "./DisciplineJudges";
import Results from "./Results";

export default class CompetitionReport extends React.Component {
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
                include_extended_info: true,
                include_clubs: true,
                include_judges: true,
                include_discipline_judges: false,
                disciplines: {},
            },
        };
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
                discipline_judges: {
                    judge: {},
                },
            },
            judges: {},
            clubs: {
                participants: {},
            },
        };
    }

    setupStorage(competition_id=null) {
        if (competition_id === null) {
            competition_id = this.props.competition.id;
        }
        this.storage = storage.getDomain(`competition_report_${competition_id}`);
    }
    freeStorage(competition_id=null) {
        if (competition_id === null) {
            competition_id = this.props.competition.id;
        }
        storage.delDomain(`competition_report_${competition_id}`);
    }

    reloadFromStorage = () => {
        const competition = this.storage.get("Competition")
            .by_id(this.props.competition.id)
            .serialize(this.SCHEMA);
        let config = Object.assign({}, this.state.config); // clone
        let new_disciplines = {};
        competition.disciplines.forEach(discipline => {
            new_disciplines[discipline.id] = (discipline.id in config.disciplines)
                ? config.disciplines[discipline.id]
                : true;
        })
        config.disciplines = new_disciplines;
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

    makePrintableRef = (ref) => this._printable = ref;

    handleConfigChange = (config) => this.setState({ config });

    handleDocxCreation = () => this.createDocx();

    getTitle() {
        const n_disciplines = Object.keys(this.state.config.disciplines)
                                    .filter(key => this.state.config.disciplines[key]).length;
        const title = n_disciplines > 0
            ? _("admin.headers.competition_report")
            : _("admin.headers.competition_info");
        return title;
    }
    render() {  // eslint-disable-line react/sort-comp
        if (this.state.competition === null) {
            return (
                <Loader />
            );
        }
        const title = this.getTitle();
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
                    </div>
                    <h1>{ title }</h1>
                </header>
                <div className="app-body competition-report">
                    <ConfigPanel
                        config={ this.state.config }
                        customControls={ [
                            {key: "include_extended_info",      label: _("admin.labels.include_extended_info")},
                            {key: "include_clubs",              label: _("admin.labels.include_clubs")},
                            {key: "include_judges",             label: _("admin.labels.include_judges")},
                            {key: "include_discipline_judges",  label: _("admin.labels.include_discipline_judges")},
                        ] }
                        disciplines={ this.state.competition.disciplines }
                        onChange={ this.handleConfigChange }
                    />
                    <Paper
                        ref={ this.makePrintableRef }
                        title1={ title }
                    >
                        <div>
                            <Info { ...this.state } />
                            <Clubs { ...this.state } />
                            <Judges { ...this.state } />
                            <DisciplineJudges { ...this.state } />
                            <Results { ...this.state } />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }

    createDocx = () => {
        Docx("report.docx")
            .setMargins([10, 15, 10, 25])
            .setTitle1(this.getTitle())
            .setBody(this._printable.getPrintableHTML())
            .addStyle(".spacer td", "height", "5pt")
            .addStyle(".tour-name", "background", "#ddd")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%")
            .save();
    }
}

CompetitionReport.displayName = "AdminPanel_Management_CompetitionReport";
