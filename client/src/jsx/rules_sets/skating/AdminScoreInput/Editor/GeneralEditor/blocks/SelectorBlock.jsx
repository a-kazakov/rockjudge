import {React} from "HostModules";

import PT from "prop-types";
import BaseBlock from "./BaseBlock";

export default class SelectorBlock extends BaseBlock {
    static get propTypes() {
        const prev = super.constructor.propTypes || {};
        return Object.assign({}, prev, {
            label: PT.string,
            options: PT.arrayOf(
                PT.array.isRequired,
            ),
        });
    }

    handleChange = (event) => {
        const value = JSON.parse(event.target.value);
        this.props.onChange(this.props.field, value);
    };

    getOptions() {
        if (typeof this.props.options === "undefined") {
            console.error("getOptions() is not implemented");
            return [];
        }
        return this.props.options;
    }
    renderOptions(json=false) {
        return this.getOptions().map(([key, value], idx) => (
            <option
                key={ idx }
                value={ json ? JSON.stringify(key) : key }
            >
                { value }
            </option>
        ));
    }
    renderValue() {
        if (this.props.readOnly) {
            const opt = this.getOptions().find(o => o[0] === this.props.value);
            return (
                <div className="score-value">
                    <div className="read-only">
                        { opt ? opt[1] : "???" }
                    </div>
                </div>
            );
        }
        return (
            <div className="score-value">
                <select
                    value={ JSON.stringify(this.props.value) }
                    onChange={ this.handleChange }
                >
                    { this.renderOptions(true) }
                </select>
            </div>
        );
    }
    render() {
        return (
            <div className="item">
                <div className="score-label">
                    { this.props.label }
                </div>
                { this.renderValue() }
            </div>
        )
    }
}