import React from "react";
import ReactDOM from "react-dom";

import Docx from "common/Docx";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";
import PT from "prop-types";
import CreationButton from "./CreationButton";
import EditorRow from "./EditorRow";
import PrintablePlan from "./PrintablePlan";
import Row from "./Row";

export default class CompetitionPlan extends UniversalTable {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "CompetitionPlanItem";
    static FIELDS = [
        FieldTypes.makeSpField(),
        FieldTypes.makeTextField("verbose_name"),
        {
            name: "tour_id",
            defaultValueGetter: () => "null",
            toFormValue: (value) => value == null ? "null" : value.toString(),
            fromFormValue: (value) => value === "null" ? null : parseInt(value),
        },
        FieldTypes.makeTextField("estimated_beginning"),
        FieldTypes.makeTextField("estimated_duration"),
    ];

    getEntries() {
        return this.props.competition.plan;
    }
    getCreateParams() {
        return {
            competition_id: this.props.competition.id,
        };
    }
    getContext() {
        return {
            tours: this.getAllTours(),
            errors: this.getItemIdsWithErrors(),
        };
    }

    static getTours = (entry) => entry.tours;
    static getTourId = (entry) => entry.tour_id;
    static filterValidId = (value) => typeof value === "number";

    makePrintableRef = (ref) => this._printable = ref;

    handleDocxCreation = () => this.createDocx();

    getItemIdsWithErrors() {
        let result = new Set();
        const tour_to_idx = new Map();
        for (const discipline of this.props.competition.disciplines) {
            let idx = 1;
            for (const tour of discipline.tours) {
                tour_to_idx.set(tour.id, idx++);
            }
        }
        let latest_discipline_idx = new Map();
        for (const plan_item of this.props.competition.plan) {
            const tour = plan_item.tour;
            if (!tour) {
                continue;
            }
            const discipline = tour.discipline;
            const prev_idx = latest_discipline_idx.get(discipline.id) || 0;
            const current_idx = tour_to_idx.get(tour.id);
            if (current_idx !== prev_idx + 1) {
                result.add(plan_item.id);
            }
            latest_discipline_idx.set(discipline.id, current_idx);
        }
        return result;
    }
    getAllTours() {
        const unflattened = this.props.competition.disciplines.map(this.constructor.getTours);
        return [].concat(...unflattened);
    }
    getUnpickedTours() {
        const picked_tours = new Set(
            this.props.competition.plan
                .map(this.constructor.getTourId)
                .filter(this.constructor.filterValidId)
        );
        return this.getAllTours().filter(tour => !picked_tours.has(tour.id));
    }
    renderUnpickedTours() {
        const unpicked_tours = this.getUnpickedTours();
        if (unpicked_tours.length === 0) {
            return null;
        }
        return (
            <div className="unpicked-tours">
                <h4>
                    { _("admin.headers.unpicked_tours") }
                </h4>
                <ul className="unpicked-tours">
                    { unpicked_tours.map((tour) =>
                        <li className="item" key={ tour.id }>
                            { `${tour.discipline.name} — ${tour.name}` }
                        </li>
                    ) }
                </ul>
            </div>
        );
    }
    renderTable() {
        return (
            <div className="wrapper">
                { this.renderUnpickedTours() }
                <table>
                    <tbody>
                        <tr>
                            <th className="sp">
                                { _("models.competition_plan_item.sp") }
                            </th>
                            <th className="discipline">
                                { _("models.competition_plan_item.discipline") }
                            </th>
                            <th className="tour">
                                { _("models.competition_plan_item.tour") }
                            </th>
                            <th className="estimated_beginning">
                                { _("models.competition_plan_item.estimated_beginning") }
                            </th>
                            <th className="estimated_duration">
                                { _("models.competition_plan_item.estimated_duration") }
                            </th>
                            <th className="delete" />
                        </tr>
                        { this.renderRows() }
                        { this.renderCreationButton() }
                    </tbody>
                </table>
            </div>
        );
    }
    render() {  // eslint-disable-line react/sort-comp
        return (
            <div className="CompetitionPlan">
                <header>
                    <div className="controls">
                        <button onClick={ this.handleDocxCreation }>
                            DOCX
                        </button>
                    </div>
                    <h1>
                        { _("admin.headers.competition_plan_management") }
                    </h1>
                </header>
                <div className="body">
                    { this.renderTable() }
                    <PrintablePlan
                        competition={ this.props.competition }
                        ref={ this.makePrintableRef }
                    />
                </div>
            </div>
        );
    }

    createDocx(filename="program.docx") {
        Docx(filename)
            .setMargins([10, 15, 10, 15])
            .setHeader(`${this.props.competition.name}, ${this.props.competition.date}`)
            .setTitle2(_("admin.headers.competition_plan"))
            .setBody(ReactDOM.findDOMNode(this._printable).innerHTML)
            .addStyle("th", "border-bottom", "1pt solid black")
            .addStyle("td", "border-bottom", "0.5pt solid #aaa")
            .save();
    }
}
