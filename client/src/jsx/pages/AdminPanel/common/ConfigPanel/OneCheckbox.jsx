import React from "react";

import PT from "prop-types";

export default class OneCheckbox extends React.Component {
    static propTypes = {
        label: PT.string.isRequired,
        mkey: PT.oneOfType([PT.string.isRequired, PT.number.isRequired]).isRequired,
        value: PT.bool.isRequired,
        onChange: PT.func.isRequired,
    };

    handleChange = event => {
        this.props.onChange(this.props.mkey, event.target.checked);
    };

    render() {
        return (
            <div className="OneCheckbox">
                <label>
                    <input
                        checked={this.props.value}
                        type="checkbox"
                        onChange={this.handleChange}
                    />
                    {this.props.label}
                </label>
            </div>
        );
    }
}
