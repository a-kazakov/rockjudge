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
    static get defaultProps() {
        return {
            header: null,
        };
    }
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
        switch (this.props.scale) {
        case "point5":
            return (
                <TabletPoint5SelectInput
                    style="two-lines"
                    {...this.props}
                />
            );
        case "integer":
            return (
                <TabletIntegerSelectInput
                    style="two-lines"
                    {...this.props}
                />
            );
        case "grid":
            return (
                <TabletIntegerSelectInput
                    style="grid"
                    {...this.props}
                />
            );
        case "reduction":
            return (
                <TabletSelectorInput
                    style="one-line"
                    choices={ this.possiblie_reductions }
                    {...this.props}
                />
            );
        default:
            console.error(`Unknowd scale type: ${this.props.scale}`);
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
