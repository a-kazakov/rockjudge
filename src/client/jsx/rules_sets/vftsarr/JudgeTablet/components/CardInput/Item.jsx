import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import CheckboxInput from "tablet_ui/CheckboxInput";

export default class Item extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        reason: PT.string.isRequired,
        selected: PT.bool.isRequired,
        onChange: PT.func.isRequired,
    };

    handleChange = value => {
        this.props.onChange(this.props.reason, value);
    };

    render() {
        return (
            <CheckboxInput
                label={_(`card_reasons.long.${this.props.reason.toLowerCase()}`)}
                readOnly={this.props.readOnly}
                value={this.props.selected}
                onChange={this.handleChange}
            />
        );
    }
}
