import { React } from "HostModules";

import PT from "prop-types";
import { consoleError } from "common/logging";

export default class BaseBlock extends React.Component {
    static propTypes = {
        field: PT.string.isRequired,
        readOnly: PT.bool,
        value: PT.any,
        onChange: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            readOnly: false,
        };
    }

    render() {
        consoleError("render() for block is not implemented");
        return null;
    }
}
