import { React } from "HostModules";

import PT from "prop-types";
import Button from "./Button";

export default class Footer extends React.Component {
    static propTypes = {
        children: PT.node.isRequired,
        value: PT.any.isRequired,
        onChange: PT.func.isRequired,
    };

    render() {
        return (
            <footer>
                {React.Children.map(this.props.children, btn => (
                    <Button
                        active={this.props.value === btn.props.mkey}
                        key={btn.props.mkey}
                        onClick={this.props.onChange}
                        {...btn.props}
                    />
                ))}
            </footer>
        );
    }
}
