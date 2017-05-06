import _ from "l10n";
import Api from "common/server/Api";
import Docx from "common/Docx";
import storage from "common/server/storage";

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
                discipline: PT.shape({
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

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
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

    get SCHEMA() {
        return {
            discipline: {
                competition: {},
            },
            runs: {
                participant: {
                    club: {},
                },
            },
        };
    }

    setupStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tour.id;
        }
        this.storage = storage.getDomain(`heats_${tour_id}`);
    }
    freeStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tour.id;
        }
        storage.delDomain(`heats_${tour_id}`);
    }

    reloadFromStorage = () => {
        const serialized = this.storage.get("Tour")
            .by_id(this.props.tour.id)
            .serialize(this.SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadData = () => {
        Api("tour.get", {
            tour_id: this.props.tour.id,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.props.tour.id, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
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
    }

    renderHeatHeader(prev_row, next_row) {
        const need_render = (typeof prev_row === "undefined") || (prev_row.heat !== next_row.heat)
        if (!need_render) {
            return null;
        }
        return (
            <tr key={ `H${next_row.heat}` }>
                <th className="heat-number" colSpan="3">
                    <p>
                        { _("global.phrases.heat_n", next_row.heat) }
                    </p>
                </th>
            </tr>
        );
    }
    renderRows() {
        let result = [];
        let runs = this.props.tour.runs;
        for (let i = 0; i < runs.length; ++i) {
            const header = this.renderHeatHeader(runs[i - 1], runs[i]);
            if (header) {
                result.push(header);
            }
            result.push(
                <Row
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
                    title2={ this.props.tour.discipline.name }
                    title3={ this.props.tour.name }
                >
                    <table className="bordered-table">
                        <thead>
                            <tr>
                                <th className="w-8">
                                    <p>
                                        { _("judging.labels.number") }
                                    </p>
                                </th>
                                <th>
                                    <p>
                                        { _("judging.labels.participant_name") }
                                    </p>
                                </th>
                                <th>
                                    <p>
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
            .setTitle2(this.props.tour.discipline.name)
            .setTitle3(this.props.tour.name)
            .setBody(this._printable.getPrintableHTML())
            .addStyle(".heat-number", "background", "#ccc")
            .addStyle(".heat-number", "text-align", "left")
            .addStyle("td, th", "font-size", "12pt")
            .save();
    }
}

HeatsTab.displayName = "AdminPanel_Judging_TourPanel_HeatsTab";
