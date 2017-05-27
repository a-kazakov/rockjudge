import _ from "l10n";
import LoadingComponent from "common/server/LoadingComponent";
import Loader from "common/components/Loader";
import Docx from "common/Docx";

import ConfigPanel from "pages/AdminPanel/common/ConfigPanel";
import Paper from "pages/AdminPanel/common/Paper";

import Info from "./Info";
import Clubs from "./Clubs";
import Judges from "./Judges";
import DisciplineJudges from "./DisciplineJudges";
import Results from "./Results";

export default class CompetitionReport extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

    CLASS_ID = "competition_report";
    API_MODELS = {
        competition: {
            model_type: "Competition",
            model_id_getter: props => props.competition.id,
            schema: {
                disciplines: {
                    discipline_judges: {
                        judge: {},
                    },
                    results: {},
                    tours: {
                        runs: {
                            participant: {
                                club: {},
                            },
                        },
                    },
                },
                judges: {},
                clubs: {
                    participants: {},
                },
            }
        }
    };


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

    getAdditionalStateUpdate(nextState) {
        if (nextState.competition === null) {
            return {};
        }
        let config = Object.assign({}, nextState.config); // clone
        let new_disciplines = {};
        for (const discipline of nextState.competition.disciplines)  {
            new_disciplines[discipline.id] = (discipline.id in config.disciplines)
                ? config.disciplines[discipline.id]
                : true;
        }
        config.disciplines = new_disciplines;
        return { config };
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
            <div className="CompetitionReport">
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
                <div className="body">
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
                        margins={ [10, 15, 10, 25] }
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
