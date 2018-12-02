import React from "react";

import Loader from "common/components/Loader";
import Model from "common/server/Storage/models/Model";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";
import PT from "prop-types";
import rules_set from "rules_sets/loader";
import CreationButton from "./CreationButton";
import EditorRow from "./EditorRow";
import Row from "./Row";

export default class Tours extends UniversalTable {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        disciplineId: PT.number.isRequired,
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "Tour";
    static FIELDS = [
        FieldTypes.makeNonEmptyTextField("name", "errors.tour.empty_name"),
        FieldTypes.makeIntegerField("num_advances", "errors.tour.invalid_num_advances", [0, null]),
        FieldTypes.makeIntegerField("participants_per_heat", "errors.tour.participants_per_heat", [1, null]),
        {name: "hope_tour", defaultValue: false},
        {name: "scoring_system_name", defaultValueGetter: () => rules_set.meta.scoring_systems[0]},
        FieldTypes.makeTextField("default_program"),
    ];

    getEntries() {
        const discipline = this.discipline;
        if (discipline == null) {
            return [];
        }
        return discipline.tours;
    }
    getCreateParams(context) {
        return {
            discipline_id: this.props.disciplineId,
            add_after: context.afterId,
        };
    }
    getContext(context_params) {
        return context_params;
    }

    get discipline() {
        return this.props.competition.subscription_storage.get("Discipline", this.props.disciplineId) || null;
    }

    renderRows(discipline) {
        let result = [];
        const tours = discipline.tours;
        for (let idx = 0; idx < tours.length; ++idx) {
            const this_tour = tours[idx];
            const next_tour = tours[idx + 1] || null;
            result.push(this.renderEntry(this_tour));
            result.push(this.renderCreationButton({
                afterId: this_tour.id,
                nextTour: next_tour,
            }, `button_${this_tour.id}`))
        }
        return result;
    }
    render() {
        const discipline = this.discipline;
        if (discipline == null) {
            return (
                <Loader />  // TODO: replace with error message
            );
        }
        return (
            <div className="Tours">
                <header>
                    <h1>
                        { discipline.name }
                    </h1>
                </header>
                <div className="body">
                    { this.renderCreationButton({
                        afterId: null,
                        nextTour: discipline.tours[0] || null,
                    }, "button") }
                    { this.renderRows(discipline) }
                </div>
                <datalist id="dl_tours">
                    { rules_set.translate.tour_name_suggestions.map((n, idx) =>
                        <option key={ idx } value={ n } />
                    ) }
                </datalist>
                <datalist id="dl_programs">
                    { rules_set.meta.suggested_programs.map((n, idx) =>
                        <option key={ idx } value={ n } />
                    ) }
                </datalist>
            </div>
        );
    }
}

