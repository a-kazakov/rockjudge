import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Docx from "common/Docx";
import ConfigPanel from "pages/AdminPanel/common/ConfigPanel";
import Paper from "pages/AdminPanel/common/Paper";
import Clubs from "./Clubs";
import ClubsSummary from "./ClubsSummary";
import Disciplines from "./Disciplines";
import DisciplinesSummary from "./DisciplinesSummary";
import Numbers from "./Numbers";
import Model from "common/server/Storage/models/Model";

export default class StartList extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            config: {
                include_formation_sportsmen: false,
                include_acrobatics: false,
                group_by_clubs: false,
                show_sportsmen_only: false,
                show_summary: false,
                disciplines: {},
                clubs: {},
            },
        };
    }

    getConfig() {
        const config = this.state.config;
        let new_disciplines_config = {};
        let new_clubs_config = {};
        for (const discipline of this.props.competition.disciplines) {
            new_disciplines_config[discipline.id] =
                discipline.id in config.disciplines
                    ? config.disciplines[discipline.id]
                    : true;
        }
        for (const club of this.props.competition.clubs) {
            new_clubs_config[club.id] =
                club.id in config.clubs ? config.clubs[club.id] : true;
        }
        return Object.assign(config, {
            disciplines: new_disciplines_config,
            clubs: new_clubs_config,
        });
    }

    makeNumbersRef = ref => (this._numbers = ref);
    makePrintableRef = ref => (this._printable = ref);

    handleConfigChange = config => this.setState({ config });

    handleDocxCreation = () => this.createDocx();
    handleNumbersDocxCreation = () => this._numbers.createDocx();

    getTitle(config) {
        if (config.show_summary) {
            if (config.group_by_clubs) {
                return _("admin.headers.clubs_summary");
            }
            return _("admin.headers.disciplines_summary");
        }
        if (config.show_sportsmen_only) {
            return _("admin.headers.sportsmen_list");
        }
        return _("admin.headers.start_list");
    }
    renderBody(config) {
        const props = {
            competition: this.props.competition,
            config: config,
        };
        if (config.show_summary) {
            if (config.group_by_clubs) {
                return <ClubsSummary {...props} />;
            }
            return <DisciplinesSummary {...props} />;
        }
        if (config.group_by_clubs) {
            return <Clubs {...props} />;
        }
        return <Disciplines {...props} />;
    }
    renderNumbers(config) {
        return (
            <Numbers
                competition={this.props.competition}
                config={config}
                ref={this.makeNumbersRef}
            />
        );
    }
    // eslint-disable-next-line react/sort-comp
    render() {
        const config = this.getConfig();
        return (
            <div className="StartList">
                <header>
                    <div className="controls">
                        <button onClick={this.handleDocxCreation}>DOCX</button>
                        <button onClick={this.handleNumbersDocxCreation}>
                            {_("admin.buttons.docx_numbers")}
                        </button>
                    </div>
                    <h1>{_("admin.headers.start_list")}</h1>
                </header>
                <div className="body">
                    <ConfigPanel
                        clubs={this.props.competition.clubs}
                        config={config}
                        customControls={[
                            {
                                key: "include_acrobatics",
                                label: _("admin.labels.include_acrobatics"),
                            },
                            {
                                key: "include_formation_sportsmen",
                                label: _("admin.labels.include_formation_sportsmen"),
                            },
                            {
                                key: "group_by_clubs",
                                label: _("admin.labels.group_by_clubs"),
                            },
                            {
                                key: "show_sportsmen_only",
                                label: _("admin.labels.show_sportsmen_only"),
                            },
                            {
                                key: "show_summary",
                                label: _("admin.labels.show_summary"),
                            },
                        ]}
                        disciplines={this.props.competition.disciplines}
                        onChange={this.handleConfigChange}
                    />
                    <Paper
                        header={`${this.props.competition.name}, ${
                            this.props.competition.date
                        }`}
                        margins={[10, 15, 10, 25]}
                        ref={this.makePrintableRef}
                        title2={this.getTitle(config)}
                    >
                        {this.renderBody(config)}
                    </Paper>
                    {this.renderNumbers(config)}
                </div>
            </div>
        );
    }

    createDocx(filename = "start-list.docx") {
        const config = this.getConfig();
        Docx(filename)
            .setMargins([10, 15, 10, 25])
            .setHeader(`${this.props.competition.name}, ${this.props.competition.date}`)
            .setTitle2(this.getTitle(config))
            .setBody(this._printable.getPrintableHTML())
            .addStyle("table.outer .inner td, table.outer .inner th", "border", "none")
            .addStyle("table.outer .inner td, table.outer .inner th", "padding", "0")
            .addStyle("table.outer th", "border-bottom", "1pt solid black")
            .addStyle("table.outer td", "border-bottom", "0.5pt solid #aaa")
            .addStyle(".inner", "width", "100%")
            .addStyle(".acro", "border-top", "none !important")
            .addStyle(".has-acro td", "border-bottom", "0.5pt solid #aaa !important")
            .addStyle(".has-acro td td", "border-bottom", "none !important")
            .addStyle("tr.tr-acro", "page-break-inside", "auto")
            .save();
    }
}
