import React from "react";

import PT from "prop-types";
import SelectorInput from "./SelectorInput";

export default class MultipleOptionsInput extends React.Component {
    static propTypes = {
        value: PT.string,
        onChange: PT.func.isRequired,
    };

    handleChange = item => {
        const new_value = this.props.value.includes(item)
            ? this.props.value.replace(item, "")
            : this.props.value + item;
        this.props.onChange(new_value);
    };

    render() {
        const { value, onChange, ...other_props } = this.props; // eslint-disable-line no-unused-vars
        return (
            <SelectorInput
                multiple
                value={value}
                onChange={this.handleChange}
                {...other_props}
            />
        );
    }
}
