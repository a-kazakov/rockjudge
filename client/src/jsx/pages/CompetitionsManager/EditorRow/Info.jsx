import React from "react";

import PT from "prop-types";
import _ from "l10n";

import InfoItem from "./InfoItem";

export default class Info extends React.Component {
    static propTypes = {
        value: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired).isRequired,
        onChange: PT.func.isRequired,
    };

    handleAddition = () => {
        let value = this.props.value.slice();
        value.push(["", ""]);
        this.props.onChange(value);
    };

    handleChange = (idx, new_item) => {
        let value = this.props.value.slice();
        value[idx] = new_item;
        this.props.onChange(value);
    };

    handleMoveUp = idx => {
        let value = this.props.value.slice();
        const [row] = value.splice(idx, 1);
        value.splice(idx - 1, 0, row);
        this.props.onChange(value);
    };

    handleMoveDown = idx => {
        let value = this.props.value.slice();
        const [row] = value.splice(idx, 1);
        value.splice(idx + 1, 0, row);
        this.props.onChange(value);
    };

    handleDeletion = idx => {
        let value = this.props.value.slice();
        value.splice(idx, 1);
        this.props.onChange(value);
    };

    render() {
        return (
            <div className="info">
                {this.props.value.map((item, idx) => (
                    <InfoItem
                        idx={idx}
                        item={item}
                        itemsCount={this.props.value.length}
                        key={idx}
                        onChange={this.handleChange}
                        onDelete={this.handleDeletion}
                        onMoveDown={this.handleMoveDown}
                        onMoveUp={this.handleMoveUp}
                    />
                ))}
                <button
                    className="add-button"
                    type="button"
                    onClick={this.handleAddition}
                >
                    {_("global.buttons.add")}
                </button>
            </div>
        );
    }
}
