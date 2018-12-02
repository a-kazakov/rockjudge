import React from "react";

import _ from "l10n";
import PT from "prop-types";
import ElementRow from "./ElementRow";

export default class Elements extends React.Component {
    static propTypes = {
        loading: PT.bool.isRequired,
        value: PT.arrayOf(PT.shape({
            description: PT.string.isRequired,
            score: PT.string.isRequired,
        })).isRequired,
        onChange: PT.func.isRequired,
    };

    handleElementChange = (idx, value) => {
        let new_value = this.props.value.slice();
        new_value[idx] = value;
        this.props.onChange(new_value);
    };
    handleElementAdd = () => {
        let new_value = this.props.value.slice();
        new_value.push({
            description: "",
            score: "0",
        });
        this.props.onChange(new_value);
    };
    handleElementDelete = (idx) => {
        let new_value = this.props.value.slice();
        new_value.splice(idx, 1);
        this.props.onChange(new_value);
    };

    render() {
        return (
            <div className="elements">
                { this.props.value.map((element, idx) =>
                    <ElementRow
                        element={ element }
                        idx={ idx }
                        key={ idx }
                        loading={ this.props.loading }
                        onChange={ this.handleElementChange }
                        onDelete={ this.handleElementDelete }
                    />
                ) }
                <button
                    className="add-element-button"
                    disabled={ this.props.loading }
                    type="button"
                    onClick={ this.handleElementAdd }
                >
                    { _("admin.buttons.add_element") }
                </button>
            </div>
        );
    }
}

