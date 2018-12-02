import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import CreationButton from "pages/AdminPanel/Management/Judges/CreationButton";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";
import PT from "prop-types";
import EditorRow from "./EditorRow";
import Row from "./Row";


export default class Judges extends UniversalTable {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "Judge";
    static FIELDS = [
        FieldTypes.makeTextField("number"),
        FieldTypes.makeTextField("category"),
        FieldTypes.makeNonEmptyTextField("name", "errors.judge.empty_name"),
        FieldTypes.makeTextField("role_description"),
        FieldTypes.makeExternalIdField(),
        FieldTypes.makeSpField(),
    ];

    getEntries() {
        return this.props.competition.judges;
    }
    getCreateParams() {
        return {
            competition_id: this.props.competition.id,
        };
    }

    renderTable() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="role_description">
                            { _("models.judge.role_description") }
                        </th>
                        <th className="name">
                            { _("models.judge.name") }
                        </th>
                        <th className="category">
                            { _("models.judge.category") }
                        </th>
                        <th className="delete" />
                    </tr>
                    { this.renderRows() }
                    { this.renderCreationButton() }
                </tbody>
            </table>
        );
    }
    render() {
        return (
            <div className="Judges">
                <header>
                    <h1>
                        { _("admin.headers.judges_management") }
                    </h1>
                </header>
                <div className="body">
                    { this.renderTable() }
                </div>
            </div>
        );
    }
}
