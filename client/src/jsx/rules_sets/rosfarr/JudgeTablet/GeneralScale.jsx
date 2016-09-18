import NumberSelectorInput from "tablet_ui/NumberSelectorInput";
import SelectorInput from "tablet_ui/SelectorInput";

export default class GeneralScale extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            header: PT.string,
            scale: PT.oneOf(["point5", "integer", "grid", "reduction"]).isRequired,
        };
    }

    static get defaultProps() {
        return {
            header: null,
        };
    }

    get POSSIBLIE_REDUCTIONS() {
        return [
            [100, "-100%"],
            [75,  "-75%"],
            [50,  "-50%"],
            [25,  "-25%"],
            [10,  "-10%"],
            [5,   "-5%"],
            [0,   "-0%"],
        ]
    }

    renderHeader() {
        if (this.props.header === null) {
            return null;
        }
        return (
            <h3>
                { this.props.header }
            </h3>
        );

    }
    renderBody() {
        const { scale, ...other_props } = this.props;
        switch (scale) {
        case "point5":
            return (
                <NumberSelectorInput
                    decimalSize={ 1 }
                    step={ 0.5 }
                    style="two-lines"
                    { ...other_props }
                />
            );
        case "integer":
            return (
                <NumberSelectorInput
                    style="two-lines"
                    { ...other_props }
                />
            );
        case "grid":
            return (
                <NumberSelectorInput
                    style="grid"
                    { ...other_props }
                />
            );
        case "reduction":
            return (
                <SelectorInput
                    choices={ this.POSSIBLIE_REDUCTIONS }
                    style="one-line"
                    { ...this.props }
                />
            );
        default:
            console.error(`Unknowd scale type: ${scale}`);
            return null;
        }
    }
    render() {
        return (
            <div>
                { this.renderHeader() }
                { this.renderBody() }
            </div>
        );
    }
}
