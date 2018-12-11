import { React } from "HostModules";

import PT from "prop-types";

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
        console.error("render() for block is not implemented");
        return null;
    }
}
