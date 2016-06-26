import {
    onTouchOrClick,
    TabletIntegerInput,
    TabletIntegerSelectInput,
    TabletSelectorInput,
    TabletPoint5SelectInput,
    TabletAcroOverrideInput,
    StopWatch,
    Slider,
} from "ui/tablet_components";

export default class GeneralScale extends React.Component {
    get possiblie_reductions() {
        return [
            [100, "X"],
            [75,  "-75%"],
            [50,  "-50%"],
            [25,  "-25%"],
            [10,  "-10%"],
            [5,   "-5%"],
            [0,   "OK"],
        ]
    }
    renderBody() {
        switch (this.props.scale) {
        case "point5":
            return (
                <TabletPoint5SelectInput
                    style="two-lines"
                    {...this.props} />
            );
        case "integer":
            return (
                <TabletIntegerSelectInput
                    style="two-lines"
                    {...this.props} />
            );
        case "grid":
            return (
                <TabletIntegerSelectInput
                    style="grid"
                    {...this.props} />
            );
        case "reduction":
            return (
                <TabletSelectorInput
                    style="one-line"
                    choices={ this.possiblie_reductions }
                    {...this.props} />
            );
        default:
            console.error(`Unknowd scale type: ${this.props.scale}`);
            return null;
        }
    }
    render() {
        return (
            <div>
                <h3>{ this.props.header }</h3>
                { this.renderBody() }
            </div>
        );
    }
}
