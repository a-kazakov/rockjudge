import React from "react";

import PT from "prop-types";

export default class ImportItemsCheckbox extends React.Component {
    static propTypes = {
        disabled: PT.bool.isRequired,
        label: PT.string.isRequired,
        type: PT.string.isRequired,
        value: PT.bool.isRequired,
        onChange: PT.func.isRequired,
    };

    handleChange = (e) => {
        this.props.onChange(this.props.type, e.target.checked);
    }

    render() {
        return (
            <div className="switch">
                <label>
                    <input
                        checked={ this.props.value }
                        disabled={ this.props.disabled }
                        type="checkbox"
                        onChange={ this.handleChange }
                    />
                    { this.props.label }
                </label>
            </div>
        );
    }
}
