import { React } from "HostModules";

import PT from "prop-types";
import NumberSelectorInput from "tablet_ui/NumberSelectorInput";
import SelectorInput from "tablet_ui/SelectorInput";
import { consoleError } from "common/logging";

export default class GeneralScale extends React.Component {
    static propTypes = {
        code: PT.any,
        header: PT.string,
        scale: PT.oneOf(["number", "integer", "grid", "reduction"]).isRequired,
        onChange: PT.func.isRequired,
    };

    static get defaultProps() {
        return {
            code: null,
            header: null,
        };
    }

    get POSSIBLIE_REDUCTIONS() {
        return [
            [100, "-100"],
            [75, "-75"],
            [50, "-50"],
            [35, "-35"],
            [25, "-25"],
            [15, "-15"],
            [10, "-10"],
            [5, "-5"],
            [0, "-0"],
        ];
    }

    handleChange = value => {
        if (this.props.code != null) {
            this.props.onChange(this.props.code, value);
        } else {
            this.props.onChange(value);
        }
    };

    renderHeader() {
        if (this.props.header == null) {
            return null;
        }
        return <h3>{this.props.header}</h3>;
    }
    renderBody() {
        // eslint-disable-next-line no-unused-vars
        const { scale, onChange, ...other_props } = this.props;
        switch (scale) {
            case "number":
                return (
                    <NumberSelectorInput
                        highlightLower
                        jumbo
                        style="one-line"
                        onChange={this.handleChange}
                        {...other_props}
                    />
                );
            case "grid":
                return (
                    <NumberSelectorInput
                        highlightLower
                        jumbo
                        style="grid"
                        onChange={this.handleChange}
                        {...other_props}
                    />
                );
            case "reduction":
                return (
                    <SelectorInput
                        highlightLower
                        jumbo
                        choices={this.POSSIBLIE_REDUCTIONS}
                        style="one-line"
                        onChange={this.handleChange}
                        {...other_props}
                    />
                );
            default:
                consoleError(`Unknowd scale type: ${scale}`);
                return null;
        }
    }
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }
}
