import React from "react";

import Docx from "common/Docx";
import makeTourResultsTable from "common/makeTourResultsTable";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import Paper from "pages/AdminPanel/common/Paper";
import PT from "prop-types";
import rules_set from "rules_sets/loader";
import SafeTimeout from "common/SafeTimeout";

export default class Renderer extends React.Component {
    static propTypes = {
        autoDocx: PT.shape({
            filename: PT.string.isRequired,
            onDone: PT.func.isRequired,
        }),
        tour: PT.instanceOf(Model).isRequired,
        verbosity: PT.number.isRequired,
    };

    componentDidMount() {
        if (this.props.autoDocx) {
            this.st.setRepeatingTimeout(this.tryAutoDocx, 500);
        }
    }

    componentWillUnmount() {
        this.st.clear();
    }
    st = new SafeTimeout();

    tryAutoDocx = () => {
        const {
            tour,
            autoDocx: { filename, onDone },
        } = this.props;
        if (tour.finalized !== tour.results.finalized) {
            return false;
        }
        this.createDocx(filename);
        onDone(filename);
        return true;
    };

    makePrintableRef = ref => (this._printable = ref);

    handleSignal = message => {
        switch (message) {
            case "docx":
                this.createDocx();
                break;
            default:
                console.error("Unknown message:", message);
        }
    };

    getRenderingComponent() {
        switch (this.props.verbosity) {
            case 1:
                return rules_set.tour_results_table_1;
            case 2:
                return rules_set.tour_results_table_2;
            case 3:
                return rules_set.tour_results_table_3;
        }
    }
    renderNonFinalizedWarning() {
        if (this.props.tour.finalized) {
            return null;
        }
        return (
            <div className="non-finalized-warning">
                {_("results.alerts.not_finalized")}
            </div>
        );
    }
    renderBody() {
        const RenderingComponent = this.getRenderingComponent();
        const computedTour = makeTourResultsTable(this.props.tour);
        return <RenderingComponent computedTour={computedTour} />;
    }

    // eslint-disable-next-line react/sort-comp
    render() {
        const Component = this.getRenderingComponent();
        const orientation =
            Component.getPaperOrientation?.(this.props.tour) ?? "portrait";
        return (
            <Paper
                header={`${this.props.tour.discipline.competition.name}, ${
                    this.props.tour.discipline.competition.date
                }`}
                margins={[10, 10, 15, 10]}
                orientation={orientation}
                ref={this.makePrintableRef}
                title1={_("admin.headers.tour_results")}
                title2={`${this.props.tour.discipline.name} — ${this.props.tour.name}`}
            >
                {this.renderNonFinalizedWarning()}
                {this.renderBody()}
            </Paper>
        );
    }

    createDocx(filename = "tour-results.docx") {
        const docx = Docx(filename)
            .setMargins([10, 10, 15, 10])
            .setHeader(
                `${this.props.tour.discipline.competition.name}, ${
                    this.props.tour.discipline.competition.date
                }`,
            )
            .setTitle1(_("admin.headers.tour_results"))
            .setTitle2(`${this.props.tour.discipline.name} — ${this.props.tour.name}`)
            .setBody(this._printable.getPrintableHTML());
        // eslint-disable-next-line no-unused-expressions
        this.getRenderingComponent().transformDocx?.(docx, this.props.tour);
        docx.save();
    }
}
