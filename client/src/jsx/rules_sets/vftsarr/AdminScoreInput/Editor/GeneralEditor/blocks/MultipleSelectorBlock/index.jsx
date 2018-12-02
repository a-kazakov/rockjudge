import {React} from "HostModules";

import PT from "prop-types";
import SelectorBlock from "../SelectorBlock";
import Item from "./Item";

export default class MultipleSelectorBlock extends SelectorBlock {
    static get propTypes() {
        const prev = super.constructor.propTypes || {};
        return Object.assign({}, prev, {
            value: PT.object.isRequired,
        });
    }

    handleChange = (key, value) => {
        this.props.onChange(
            this.props.field,
            Object.assign(
                {},
                this.props.value,
                {[key]: value},
            ),
        );
    };

    _getOptionValue = (opt) => this.props.value[opt[0]];
    _getOptionLabel = (opt) => opt[1];

    renderOptions() {
        return this.getOptions().map(([key, label], idx) => (
            <Item
                key={ idx }
                label={ label }
                selected={ this.props.value[key] }
                value={ key }
                onChange={ this.handleChange }
            />
        ));
    }
    renderValue() {
        if (this.props.readOnly) {
            const texts = this.getOptions()
                .filter(this._getOptionValue)
                .map(this._getOptionLabel);
            return (
                <div className="score-value">
                    <div className="read-only">
                        { texts.map((text, idx) => (
                            <div key={ idx }>
                                { text }
                            </div>
                        )) }
                    </div>
                </div>
            );
        }
        return (
            <div className="score-value">
                { this.renderOptions() }
            </div>
        );
    }
    render() {
        return (
            <div className="item item-large">
                <div className="score-label">
                    { this.props.label }
                </div>
                { this.renderValue() }
            </div>
        )
    }
}