import { React } from "HostModules";

import PT from "prop-types";

export default class Item extends React.Component {
    static propTypes = {
        label: PT.string.isRequired,
        selected: PT.bool.isRequired,
        value: PT.string.isRequired,
        onChange: PT.func.isRequired,
    };

    handleChange = event => {
        this.props.onChange(this.props.value, event.target.checked);
    };

    render() {
        return (
            <label>
                <div className="input">
                    <input
                        checked={this.props.selected}
                        type="checkbox"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="text">{this.props.label}</div>
            </label>
        );
    }
}
