import React from "react";

import Loader from "common/components/Loader";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";
import PT from "prop-types";
import CreationButton from "./CreationButton";
import EditorRow from "./EditorRow";
import Row from "./Row";

export default class Participants extends UniversalTable {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        disciplineId: PT.number.isRequired,
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "Participant";
    static FIELDS = [
        FieldTypes.makeIntegerField("number", "errors.participant.invalid_number", [0, null]),
        {
            name: "club_id",
            defaultValueGetter: (context) => context.competition.clubs[0]?.id || 0,
            toFormValue: (value) => value.toString(),
            fromFormValue: (value) => parseInt(value),
        },
        FieldTypes.makeTextField("coaches"),
        FieldTypes.makeTextField("formation_name"),
        {
            name: "sportsmen",
            defaultValue: [],
            toFormValue: (value) => {
                return value.map(sportsman => {
                    let {year_of_birth, ...other} = sportsman;
                    year_of_birth = year_of_birth.toString();
                    return {year_of_birth, ...other};
                });
            },
            fromFormValue: (value) => {
                return value.map(sportsman => {
                    let {year_of_birth, ...other} = sportsman;
                    year_of_birth = parseInt(year_of_birth) || 0;
                    return {year_of_birth, ...other};
                });
            },
        },
    ];

    getEntries() {
        const discipline = this.discipline;
        if (discipline == null) {
            return [];
        }
        return discipline.participants;
    }
    getCreateParams() {
        return {
            discipline_id: this.props.disciplineId,
        };
    }

    get discipline() {
        return this.props.competition.subscription_storage.get("Discipline", this.props.disciplineId) || null;
    }

    renderTable() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="number">
                            { _("models.participant.number") }
                        </th>
                        <th className="name">
                            { _("models.participant.name") }
                        </th>
                        <th className="club-name">
                            { _("models.participant.club_name") }
                        </th>
                        <th className="club-city">
                            { _("models.participant.club_city") }
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
        const discipline = this.discipline;
        if (discipline == null) {
            return (
                <Loader />  // TODO: replace with error message
            );
        }
        return (
            <div className="Participants">
                <header>
                    <h1>
                        { discipline.name }
                    </h1>
                    <h2>
                        { _("admin.headers.participants_management") }
                    </h2>
                </header>
                <div className="body">
                    { this.renderTable() }
                    <div className="total-participants">
                        { _("admin.phrases.total_n_participants", discipline.participants.length) }
                    </div>
                </div>
            </div>
        );
    }
}
