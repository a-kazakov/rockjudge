import { React } from "HostModules";

import PT from "prop-types";
import BaseBlock from "./BaseBlock";

export default class CheckboxBlock extends BaseBlock {
    static get propTypes() {
        const prev = super.constructor.propTypes ?? {};
        return Object.assign({}, prev, {
            label: PT.string,
        });
    }

    handleChange = event => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(this.props.field, event.target.checked);
    };

    render() {
        return (
            <div className="item item-large">
                <div className="score-value">
                    <label>
                        <div className="input">
                            <input
                                checked={this.props.value}
                                type="checkbox"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="text">{this.props.label}</div>
                    </label>
                </div>
            </div>
        );
    }
}
