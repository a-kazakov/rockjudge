import React from "react";

import showError from "common/dialogs/showError";
import Api from "common/server/Api";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";
import PT from "prop-types";
import CreationButton from "./CreationButton";
import EditorRow from "./EditorRow";
import Row from "./Row";

export default class Disciplines extends UniversalTable {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "Discipline";
    static FIELDS = [
        FieldTypes.makeNonEmptyTextField("name", "errors.discipline.empty_name"),
        FieldTypes.makeSpField(),
        FieldTypes.makeExternalIdField(),
        {
            name: "discipline_judges",
            defaultValue: [],
            toFormValue: dj_models =>
                dj_models.map(dj => ({ judge_id: dj.judge_id, role: dj.role })),
            validator: (value, context) => {
                const subscription_storage = context.competition.subscription_storage;
                let used_judges = new Set();
                for (const dj of value) {
                    if (used_judges.has(dj.judge_id)) {
                        const judge = subscription_storage.get("Judge", dj.judge_id);
                        showError(
                            _("errors.discipline_judge.repeating_judge", judge.name),
                        );
                        return false;
                    }
                    used_judges.add(dj.judge_id);
                }
                return true;
            },
        },
    ];

    getEntries() {
        return this.props.competition.disciplines;
    }
    getCreateParams() {
        return {
            competition_id: this.props.competition.id,
        };
    }

    handleCreate = (form_data, success_callback, done_callback) => {
        Api("discipline/create_with_judges", {
            data: Object.assign({}, this.getCreateParams(), form_data),
        })
            .onSuccess(success_callback)
            .onDone(done_callback)
            .send();
    };
    handleUpdate = (model_id, form_data, success_callback, done_callback) => {
        Api("discipline/update_with_judges", {
            discipline_id: model_id,
            data: form_data,
        })
            .onSuccess(success_callback)
            .onDone(done_callback)
            .send();
    };

    renderTable() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="name">{_("models.discipline.name")}</th>
                        <th className="sp">{_("models.discipline.sp")}</th>
                        <th className="external-id">
                            {_("models.discipline.external_id")}
                        </th>
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
            <div className="Disciplines">
                <header>
                    <h1>{_("admin.headers.disciplines_management")}</h1>
                </header>
                <div className="body">{this.renderTable()}</div>
            </div>
        );
    }
}
