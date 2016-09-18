import _ from "l10n";
import Docx from "common/Docx";

import rules_set from "rules_sets/loader";

import Paper from "pages/AdminPanel/common/Paper";

export default class Wrapper extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.shape({
                filename: PT.string.isRequired,
                onDone: PT.func.isRequired,
            }),
            table: PT.arrayOf(PT.object.isRequired).isRequired,
            tour: PT.object.isRequired,
            verbosity: PT.number.isRequired,
        };
    }

    componentDidMount() {
        if (this.props.autoDocx) {
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
    }

    getRenderingComponent() {
        switch (this.props.verbosity) {
            case 1: return rules_set.tour_results_table_1;
            case 2: return rules_set.tour_results_table_2;
            case 3: return rules_set.tour_results_table_3;
        }
    }
    renderBody() {
        const RenderingComponent = this.getRenderingComponent();
        return (
            <RenderingComponent { ...this.props } />
        );
    }
    render() { // eslint-disable-line react/sort-comp
        return (
            <Paper
                header={ `${this.props.tour.discipline.competition.name}, ${this.props.tour.discipline.competition.date}` }
                ref={ this.makePrintableRef }
                title1={ _("admin.headers.tour_results") }
                title2={ this.props.tour.discipline.name }
                title3={ this.props.tour.name }
            >
                { this.renderBody() }
            </Paper>
        );
    }

    createDocx(filename="tour-results.docx") {
        Docx(filename)
            .setMargins([10, 10, 15, 10])
            .setHeader(`${this.props.tour.discipline.competition.name}, ${this.props.tour.discipline.competition.date}`)
            .setTitle1(_("admin.headers.tour_results"))
            .setTitle2(this.props.tour.discipline.name)
            .setTitle3(this.props.tour.name)
            .setBody(this._printable.getPrintableHTML())
            .addStyle(".bordered-table", "font-size", this.props.verbosity === 1 ? "12pt" : "9pt")
            .addStyle(".bordered-table .acro-table td", "font-size", "9pt")
            .addStyle(".bordered-table .acro-table td", "padding", "0 3pt")
            .addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black")
            .addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt")
            .addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none")
            .addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0")
            .addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt")
            .addStyle(".score-breakdown th", "text-align", "right")
            .addStyle(".score-breakdown td", "text-align", "left")
            .addStyle(".score-breakdown td", "text-align", "left")
            .addStyle(".score-breakdown", "width", "50pt")
            .addStyle(".advances-header", "background-color", "#ddd")
            .addStyle(".total-score", "font-weight", "bold")
            .addStyle(".head_judge", "width", "5%")
            .addStyle(".dance_judge", "width", "8%")
            .addStyle(".acro_judge", "width", "8%")
            .save();
    }
}

Wrapper.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab_Wrapper";
