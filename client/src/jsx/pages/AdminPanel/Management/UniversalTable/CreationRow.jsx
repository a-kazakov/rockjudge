import React from "react";

import PT from "prop-types";
import Row from "./Row";

export default class CreationRow extends Row {
    static propTypes = {
        context: PT.any,
        createButtonComponent: PT.func.isRequired,
        editingComponent: PT.func.isRequired,
        fields: PT.arrayOf(
            PT.shape({
                name: PT.string.isRequired,
                toFormValue: PT.func,
                fromFormValue: PT.func,
                modifyFormValue: PT.func,
                validate: PT.func,
                defaultValue: PT.any,
                defaultValueGetter: PT.func,
            }).isRequired,
        ).isRequired,
        onSubmit: PT.func.isRequired,
    };

    makeInitialEditingState() {
        let result = {};
        for (const field of this.props.fields) {
            result[field.name] =
                field.defaultValueGetter?.(this.props.context) || field.defaultValue;
        }
        return result;
    }

    renderDisplay() {
        const Component = this.props.createButtonComponent;
        return (
            <Component context={this.props.context} onClick={this.handleStartEditing} />
        );
    }
}
