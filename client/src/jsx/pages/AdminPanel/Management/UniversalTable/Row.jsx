import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        context: PT.any,
        displayComponent: PT.func.isRequired,
        editingComponent: PT.func.isRequired,
        entry: PT.instanceOf(Model),
        fields: PT.arrayOf(
            PT.shape({
                name: PT.string.isRequired,
                toFormValue: PT.func,
                fromFormValue: PT.func,
                modifyFormValue: PT.func,
                validate: PT.func,
            }).isRequired,
        ).isRequired,
        onDelete: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    static dummyFunction = value => value;
    static alwaysTrueFunction = () => true;

    constructor(props) {
        super(props);
        this.state = {
            editingState: null,
            isLoading: false,
        };
    }

    handleStartEditing = () =>
        this.setState({ editingState: this.makeInitialEditingState() });
    handleStopEditing = () => this.setState({ editingState: null });
    handleStopLoading = () => this.setState({ isLoading: false });
    handleDelete = () => {
        this.props.onDelete(
            this.props.entry.id,
            this.handleStopEditing,
            this.handleStopLoading,
            this.props.context,
        );
        this.setState({ isLoading: true });
    };
    handleSubmit = () => {
        const final_state = {};
        for (const field of this.props.fields) {
            const transformer = field.fromFormValue || this.constructor.dummyFunction;
            const validator = field.validator || this.constructor.alwaysTrueFunction;
            const field_result = transformer(
                this.state.editingState[field.name],
                this.props.context,
            );
            if (!validator(field_result, this.props.context)) {
                return;
            }
            final_state[field.name] = field_result;
        }
        if (this.props.entry) {
            this.props.onSubmit(
                this.props.entry.id,
                final_state,
                this.handleStopEditing,
                this.handleStopLoading,
                this.props.context,
            );
        } else {
            this.props.onSubmit(
                final_state,
                this.handleStopEditing,
                this.handleStopLoading,
                this.props.context,
            );
        }
        this.setState({ isLoading: true });
    };
    handleFieldChange = (field_name, value) => {
        const field = this.props.fields.find(f => f.name === field_name);
        const transformer = field.modifyFormValue || this.constructor.dummyFunction;
        const filtered_value = transformer(value, this.props.context);
        this.setState({
            editingState: Object.assign({}, this.state.editingState, {
                [field.name]: filtered_value,
            }),
        });
    };

    makeInitialEditingState() {
        let result = {};
        for (const field of this.props.fields) {
            const transformer = field.toFormValue || this.constructor.dummyFunction;
            result[field.name] = transformer(
                this.props.entry[field.name],
                this.props.context,
            );
        }
        return result;
    }

    renderDisplay() {
        const Component = this.props.displayComponent;
        return (
            <Component
                context={this.props.context}
                entry={this.props.entry}
                loading={this.state.isLoading}
                onDelete={this.handleDelete}
                onStartEditing={this.handleStartEditing}
            />
        );
    }
    renderEditing() {
        const Component = this.props.editingComponent;
        return (
            <Component
                context={this.props.context}
                creating={!this.props.entry}
                entry={this.props.entry}
                formData={this.state.editingState}
                loading={this.state.isLoading}
                onDiscard={this.handleStopEditing}
                onFieldChange={this.handleFieldChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
    render() {
        if (this.state.editingState == null) {
            return this.renderDisplay();
        }
        return this.renderEditing();
    }
}
