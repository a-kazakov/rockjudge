import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

const OPTIONS_2 = ["left", "right"].map(x => _(`tablet.tech_judge.judging_positions.${x}`));
const OPTIONS_3 = ["left", "central", "right"].map(x => _(`tablet.tech_judge.judging_positions.${x}`));

export default class Button extends React.Component {
    static propTypes = {
        numOptions: PT.number.isRequired,
        position: PT.number.isRequired,
        onSelected: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onSelected(this.props.position);
    };

    renderButtonText() {
        switch (this.props.numOptions) {
        case 2:
            return OPTIONS_2[this.props.position];
        case 3:
            return OPTIONS_3[this.props.position];
        default:
            return _(`tablet.tech_judge.judging_positions.custom`, this.props.position + 1);
        }
    }
    render() {
        return (
            <button
                type="button"
                { ...onTouchEndOrClick(this.handleClick) }
            >
                { this.renderButtonText() }
            </button>
        );
    }
}