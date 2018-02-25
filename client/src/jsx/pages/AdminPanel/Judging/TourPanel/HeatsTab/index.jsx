import _ from "l10n";
import Docx from "common/Docx";

import Paper from "pages/AdminPanel/common/Paper";

import Row from "./Row";

export default class HeatsTab extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.shape({
                filename: PT.string.isRequired,
                onDone: PT.func.isRequired,
            }),
            tour: PT.shape({
                id: PT.number.isRequired,
                finalized: PT.bool.isRequired,
                name: PT.string.isRequired,
                discipline: PT.shape({
                    name: PT.string.isRequired,
                    competition: PT.shape({
                        name: PT.string.isRequired,
                        date: PT.string.isRequired,
                    }).isRequired,
                    discipline_judges: PT.arrayOf(
                        PT.shape({
                            id: PT.number.isRequired,
                        }).isRequired,
                    ).isRequired,
                }).isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        heat: PT.number.isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
        };
    }

    componentDidMount() {
        this.checkAutoDocx();
    }
    componentDidUpdate() {
        this.checkAutoDocx();
    }

    checkAutoDocx() {
        if (this.props.autoDocx && !this._docx_done && this.props.tour !== null) {
            this._docx_done = true;
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.onDone(this.props.autoDocx.filename);
        }
    }

    makePrintableRef = (ref) => this._printable = ref;

    handleSignal = (message) => {
        switch (message) {
        case "docx":
            this.createDocx();
            break;
        default:
            console.error("Unknown message:", message)
        }
    };

    checkHeatsDiffer(prev_row, next_row) {
        return (
            (typeof prev_row === "undefined") ||
            (typeof next_row === "undefined") ||
            (prev_row.heat !== next_row.heat)
        );
    }

    renderRows() {
        const runs = this.props.tour.runs;
        let counts = new Map();
        for (const run of runs) {
            counts.set(run.heat, (counts.get(run.heat) || 0) + 1)
        }
        let result = [];
        for (let i = 0; i < runs.length; ++i) {
            if (runs[i].heat <= 0) {
                continue;
            }
            result.push(
                <Row
                    headerCells={ counts.get(runs[i].heat)  }
                    heat={ runs[i].heat }
                    isFirstCell={ this.checkHeatsDiffer(runs[i - 1], runs[i]) }
                    isLastCell={ this.checkHeatsDiffer(runs[i], runs[i + 1]) }
                    key={ runs[i].id }
                    participant={ runs[i].participant }
                />
            );
        }
        return result;
    }
    render() {  // eslint-disable-line react/sort-comp
        return (
            <div className="HeatsTab">
                <Paper
                    header={ `${this.props.tour.discipline.competition.name}, ${this.props.tour.discipline.competition.date}` }
                    ref={ this.makePrintableRef }
                    title1={ _("admin.headers.tour_heats") }
                    title2={ `${this.props.tour.discipline.name} — ${this.props.tour.name}` }
                >
                    <table>
                        <thead>
                            <tr>
                                <th className="w-8">
                                    <p className="text-center">
                                        { _("judging.labels.heat") }
                                    </p>
                                </th>
                                <th className="w-8">
                                    <p className="text-center">
                                        { _("judging.labels.number") }
                                    </p>
                                </th>
                                <th>
                                    <p className="text-left">
                                        { _("judging.labels.participant_name") }
                                    </p>
                                </th>
                                <th>
                                    <p className="text-left">
                                        { _("judging.labels.club") }
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderRows() }
                        </tbody>
                    </table>
                </Paper>
            </div>
        );
    }

    createDocx(filename="tour-heats.docx") {
        Docx(filename)
            .setHeader(`${this.props.tour.discipline.competition.name}, ${this.props.tour.discipline.competition.date}`)
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
