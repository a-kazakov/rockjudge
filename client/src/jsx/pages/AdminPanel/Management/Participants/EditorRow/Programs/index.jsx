import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";
import PT from "prop-types";
import CreationButton from "./CreationButton";
import EditorRow from "./EditorRow";
import Row from "./Row";

export default class Programs extends UniversalTable {
    static propTypes = {
        participant: PT.instanceOf(Model),
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "Program";
    static FIELDS = [
        FieldTypes.makeNonEmptyTextField("name", "errors.program.empty_name"),
        FieldTypes.makeTextField("default_for"),
        {
            name: "elements",
            defaultValue: [],
            toFormValue: (value) => {
                return value.map(element => {
                    let {score, ...other} = element;
                    score = score.toFixed(1);
                    return {score, ...other};
                });
            },
            fromFormValue: (value) => {
                return value.map(element=> {
                    let {score, ...other} = element;
                    score = parseFloat(score.replace(" ", "").replace(",", ".")) || 0;
                    return {score, ...other};
                });
            },
        },
    ];
    getEntries() {
        return this.props.participant.programs;
    }
    getCreateParams() {
        return {
            participant_id: this.props.participant.id,
        };
    }

    static renderNewParticipant() {
        return (
            <div className="add-programs-after-creation-alert">
                { _("admin.alerts.add_programs_after_creation") }
            </div>
        );
    }
    renderBody() {
        if (!this.props.participant) {
            return this.constructor.renderNewParticipant();
        }
        return (
            <div>
                <label>
                    { _("models.participant.programs") }
                </label>
                { this.renderRows() }
                { this.renderCreationButton() }
            </div>
        )
    }
    render() {
        return (
            <div className="programs">
                { this.renderBody() }
            </div>
        );
    }
}
