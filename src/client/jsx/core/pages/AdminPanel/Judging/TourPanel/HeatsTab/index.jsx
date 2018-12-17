import React from "react";

import Docx from "common/Docx";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import Paper from "pages/AdminPanel/common/Paper";
import PT from "prop-types";
import Row from "./Row";
import { consoleError } from "common/logging";

export default class HeatsTab extends React.Component {
    static propTypes = {
        autoDocx: PT.shape({
            filename: PT.string.isRequired,
            onDone: PT.func.isRequired,
        }),
        tour: PT.instanceOf(Model).isRequired,
    };

    componentDidMount() {
        this.checkAutoDocx();
    }

    checkAutoDocx() {
        if (this.props.autoDocx) {
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.onDone(this.props.autoDocx.filename);
        }
    }

    makePrintableRef = ref => (this._printable = ref);

    handleSignal = message => {
        switch (message) {
            case "docx":
                this.createDocx();
                break;
            default:
                consoleError("Unknown message:", message);
        }
    };

    checkHeatsDiffer(prev_row, next_row) {
        return (
            typeof prev_row === "undefined" ||
            typeof next_row === "undefined" ||
            prev_row.heat !== next_row.heat
        );
    }

    renderRows() {
        const runs = this.props.tour.runs;
        let counts = new Map();
        for (const run of runs) {
            counts.set(run.heat, (counts.get(run.heat) || 0) + 1);
        }
        let result = [];
        for (let i = 0; i < runs.length; ++i) {
            if (runs[i].heat <= 0) {
                continue;
            }
            result.push(
                <Row
                    headerCells={counts.get(runs[i].heat)}
                    heat={runs[i].heat}
                    isFirstCell={this.checkHeatsDiffer(runs[i - 1], runs[i])}
                    isLastCell={this.checkHeatsDiffer(runs[i], runs[i + 1])}
                    key={runs[i].id}
                    participant={runs[i].participant}
                />,
            );
        }
        return result;
    }

    // eslint-disable-next-line react/sort-comp
    render() {
        return (
            <div className="HeatsTab">
                <Paper
                    header={`${this.props.tour.discipline.competition.name}, ${
                        this.props.tour.discipline.competition.date
                    }`}
                    ref={this.makePrintableRef}
                    title1={_("admin.headers.tour_heats")}
                    title2={`${this.props.tour.discipline.name} — ${
                        this.props.tour.name
                    }`}
                >
                    <table>
                        <thead>
                            <tr>
                                <th className="w-8">
                                    <p className="text-center">
                                        {_("judging.labels.heat")}
                                    </p>
                                </th>
                                <th className="w-8">
                                    <p className="text-center">
                                        {_("judging.labels.number")}
                                    </p>
                                </th>
                                <th>
                                    <p className="text-left">
                                        {_("judging.labels.participant_name")}
                                    </p>
                                </th>
                                <th>
                                    <p className="text-left">
                                        {_("judging.labels.club")}
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>{this.renderRows()}</tbody>
                    </table>
                </Paper>
            </div>
        );
    }

    createDocx(filename = "tour-heats.docx") {
        Docx(filename)
            .setHeader(
                `${this.props.tour.discipline.competition.name}, ${
                    this.props.tour.discipline.competition.date
                }`,
            )
            .setTitle1(_("admin.headers.tour_heats"))
            .setTitle2(`${this.props.tour.discipline.name} — ${this.props.tour.name}`)
            .setBody(this._printable.getPrintableHTML())
            .addStyle("td, th", "font-size", "12pt")
            .addStyle("td, th", "line-height", "15pt")
            .addStyle("th", "border-bottom", "1pt solid black")
            .addStyle(".club-name", "font-size", "10pt")
            .addStyle(".club-name", "line-height", "15pt")
            .save();
    }
}
