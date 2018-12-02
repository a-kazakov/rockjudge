import React from "react";

import Api from "common/server/Api";
import Row from "./Row";
import CreationRow from "./CreationRow";

export default class UniversalTable extends React.Component {
    static DISPLAY_COMPONENT = null;
    static EDITOR_COMPONENT = null;
    static CREATION_BUTTON_COMPONENT = null;
    static MODEL_NAME = null;
    static FIELDS = null;

    getEntries() {
        throw new Error("Not implemented");
    }
    getCreateParams() {
        return {};
    }
    getContext() {
        return this.props;
    }

    handleCreate = (form_data, success_callback, done_callback, context) => {
        Api("model/create", {
            model_name: this.constructor.MODEL_NAME,
            data: Object.assign({}, this.getCreateParams(context), form_data),
        })
            .onSuccess(success_callback)
            .onDone(done_callback)
            .send();
    };
    handleUpdate = (model_id, form_data, success_callback, done_callback) => {
        Api("model/update", {
            model_name: this.constructor.MODEL_NAME,
            model_id: model_id,
            data: form_data,
        })
            .onSuccess(success_callback)
            .onDone(done_callback)
            .send();
    };
    handleDelete = (model_id, success_callback, done_callback) => {
        Api("model/delete", {
            model_name: this.constructor.MODEL_NAME,
            model_id: model_id,
        })
            .onSuccess(success_callback)
            .onDone(done_callback)
            .send();
    };

    renderEntry = (entry) => {
        return (
            <Row
                context={ this._context }
                displayComponent={ this.constructor.DISPLAY_COMPONENT }
                editingComponent={ this.constructor.EDITOR_COMPONENT }
                entry={ entry }
                fields={ this.constructor.FIELDS }
                key={ entry.id }
                onDelete={ this.handleDelete }
                onSubmit={ this.handleUpdate }
            />
        );
    };
    renderRows(context_params=null) {
        this._context = this.getContext(context_params);
        return this.getEntries().map(this.renderEntry);
    }
    renderCreationButton(context_params = null, key = null) {
        return (
            <CreationRow
                context={ this.getContext(context_params) }
                createButtonComponent={ this.constructor.CREATION_BUTTON_COMPONENT }
                editingComponent={ this.constructor.EDITOR_COMPONENT }
                fields={ this.constructor.FIELDS }
                key={ key }
                onSubmit={ this.handleCreate }
            />
        );
    }
    render() {
        throw new Error("Not implemented");
    }
}
