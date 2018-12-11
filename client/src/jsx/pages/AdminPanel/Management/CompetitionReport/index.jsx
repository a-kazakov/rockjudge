import React from "react";

import Docx from "common/Docx";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import ConfigPanel from "pages/AdminPanel/common/ConfigPanel";
import Paper from "pages/AdminPanel/common/Paper";
import PT from "prop-types";
import rules_set from "rules_sets/loader";
import Clubs from "./Clubs";
import DisciplineJudges from "./DisciplineJudges";
import Info from "./Info";
import Judges from "./Judges";
import Results from "./Results";

export default class CompetitionReport extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            config: {
                include_extended_info: true,
                include_clubs: true,
                include_judges: true,
                include_discipline_judges: false,
                disciplines: {},
            },
        };
    }

    getConfig() {
        const config = this.state.config;
        let new_disciplines_config = {};
        for (const discipline of this.props.competition.disciplines) {
            new_disciplines_config[discipline.id] =
                discipline.id in config.disciplines
                    ? config.disciplines[discipline.id]
                    : true;
        }
        return Object.assign(config, { disciplines: new_disciplines_config });
    }

    makePrintableRef = ref => (this._printable = ref);

    handleConfigChange = config => this.setState({ config });

    handleDocxCreation = () => this.createDocx();

    getTitle(config) {
        const n_disciplines = Object.keys(config.disciplines).filter(
            key => config.disciplines[key],
        ).length;
        return n_disciplines > 0
            ? _("admin.headers.competition_report")
            : _("admin.headers.competition_info");
    }
    // eslint-disable-next-line react/sort-comp
    render() {
        const config = this.getConfig();
        const title = this.getTitle(config);
        return (
            <div className="CompetitionReport">
                <header className="app-header">
                    <div className="controls">
                        <button
                            className="btn btn-primary"
                            onClick={this.handleDocxCreation}
                        >
                            DOCX
                        </button>
                    </div>
                    <h1>{title}</h1>
                </header>
                <div className="body">
                    <ConfigPanel
                        config={config}
                        customControls={[
                            {
                                key: "include_extended_info",
                                label: _("admin.labels.include_extended_info"),
                            },
                            {
                                key: "include_clubs",
                                label: _("admin.labels.include_clubs"),
                            },
                            {
                                key: "include_judges",
                                label: _("admin.labels.include_judges"),
                            },
                            {
                                key: "include_discipline_judges",
                                label: _("admin.labels.include_discipline_judges"),
                            },
                        ]}
                        disciplines={this.props.competition.disciplines}
                        onChange={this.handleConfigChange}
                    />
                    <Paper
                        margins={[10, 15, 10, 25]}
                        ref={this.makePrintableRef}
                        title2={title}
                    >
                        <div>
                            <Info
                                competition={this.props.competition}
                                config={config}
                            />
                            <Clubs
                                competition={this.props.competition}
                                config={config}
                            />
                            <Judges
                                competition={this.props.competition}
                                config={config}
                            />
                            <DisciplineJudges
                                competition={this.props.competition}
                                config={config}
                            />
                            <Results
                                competition={this.props.competition}
                                config={config}
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }

    createDocx = () => {
        let docx = Docx("report.docx")
            .setMargins([10, 15, 10, 25])
            .setTitle2(this.getTitle())
            .setBody(this._printable.getPrintableHTML())
            .addStyle("table.discipline-judges td", "border-bottom", "0.5pt solid #aaa")
            .addStyle(
                "table.discipline-judges tr.header th",
                "border-bottom",
                "1pt solid black",
            );
        if (rules_set.discipline_results_table.transformDocx) {
            rules_set.discipline_results_table.transformDocx(docx);
        }
        docx.save();
    };
}
