import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Docx from "common/Docx";

import rules_set from "rules_sets/loader";

import Paper from "pages/AdminPanel/common/Paper";

export default class Renderer extends React.Component {
    static propTypes = {
        autoDocx: PT.shape({
            filename: PT.string.isRequired,
            onDone: PT.func.isRequired,
        }),
        discipline: PT.object.isRequired,
    };

    componentDidMount() {
        if (this.props.autoDocx) {
            this.tryAutoDocx();
        }
    }

    tryAutoDocx = () => {
        const results_ft = this.props.discipline.results.finalized_tours.sort((a, b) => a - b).toString();
        const props_ft = this.props.discipline.tours.map(tour => tour.id).sort((a, b) => a - b).toString();
        if (results_ft !== props_ft) {
            setTimeout(this.tryAutoDocx, 500);
            return;
        }
        this.createDocx(this.props.autoDocx.filename);
        this.props.autoDocx.onDone(this.props.autoDocx.filename);
    };

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

    renderBody() {
        const RenderingComponent = rules_set.discipline_results_table;
        return (
            <RenderingComponent discipline={ this.props.discipline } />
        );
    }
    render() { // eslint-disable-line react/sort-comp
        return (
            <Paper
                header={ `${this.props.discipline.competition.name}, ${this.props.discipline.competition.date}` }
                ref={ this.makePrintableRef }
                title1={ _("admin.headers.discipline_results") }
                title3={ this.props.discipline.name }
            >
                { this.renderBody() }
            </Paper>
        );
    }

    createDocx(filename="discipline-results.docx") {
        const docx = Docx(filename)
            .setHeader(`${this.props.discipline.competition.name}, ${this.props.discipline.competition.date}`)
            .setTitle1(_("admin.headers.discipline_results"))
            .setTitle3(this.props.discipline.name)
            .setBody(this._printable.getPrintableHTML());
        if (rules_set.discipline_results_table.transformDocx) {
            rules_set.discipline_results_table.transformDocx(docx)
        }
        docx.save();
    }
}
