import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";
import PT from "prop-types";
import CreationButton from "./CreationButton";
import EditorRow from "./EditorRow";
import Row from "./Row";

export default class Clubs extends UniversalTable {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "Club";
    static FIELDS = [
        FieldTypes.makeNonEmptyTextField("name", "errors.tour.empty_name"),
        FieldTypes.makeTextField("city"),
        FieldTypes.makeExternalIdField(),
    ];

    getEntries() {
        return this.props.competition.clubs;
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
                        <th className="name">{_("models.club.name")}</th>
                        <th className="city">{_("models.club.city")}</th>
                        <th className="external-id">{_("models.club.external_id")}</th>
                        <th className="delete" />
                    </tr>
                    {this.renderRows()}
                    {this.renderCreationButton()}
                </tbody>
            </table>
        );
    }
    render() {
        return (
            <div className="Clubs">
                <header>
                    <h1>{_("admin.headers.clubs_management")}</h1>
                </header>
                <div className="body">{this.renderTable()}</div>
            </div>
        );
    }
}
