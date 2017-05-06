import _ from "l10n";
import Docx from "common/Docx";

import rules_set from "rules_sets/loader";

import Paper from "pages/AdminPanel/common/Paper";

export default class Renderer extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.shape({
                filename: PT.string.isRequired,
                onDone: PT.func.isRequired,
            }),
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
    renderNonFinalizedWarning() {
        if (this.props.tour.finalized) {
            return null;
        }
        return (
            <div className="non-finalized-warning">
                { _("results.alerts.not_finalized") }
            </div>
        );
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
                margins={ [10, 10, 15, 10] }
                ref={ this.makePrintableRef }
                title1={ _("admin.headers.tour_results") }
                title2={ this.props.tour.discipline.name }
                title3={ this.props.tour.name }
            >
                { this.renderNonFinalizedWarning() }
                { this.renderBody() }
            </Paper>
        );
    }

    createDocx(filename="tour-results.docx") {
        const docx = Docx(filename)
            .setMargins([10, 10, 15, 10])
            .setHeader(`${this.props.tour.discipline.competition.name}, ${this.props.tour.discipline.competition.date}`)
            .setTitle1(_("admin.headers.tour_results"))
            .setTitle2(this.props.tour.discipline.name)
            .setTitle3(this.props.tour.name)
            .setBody(this._printable.getPrintableHTML());
        if (this.getRenderingComponent().transformDocx) {
            this.getRenderingComponent().transformDocx(docx);
        }
        docx.save();
    }
}

Renderer.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab_Renderer";
