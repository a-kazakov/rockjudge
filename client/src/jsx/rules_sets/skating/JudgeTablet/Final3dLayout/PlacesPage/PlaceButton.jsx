import { React } from "HostModules";

import PT from "prop-types";

import makeClassName from "common/makeClassName";

export default class PlaceButton extends React.Component {
    static propTypes = {
        disabled: PT.bool.isRequired,
        place: PT.number.isRequired,
        readOnly: PT.bool.isRequired,
        run: PT.object.isRequired,
        runHasSelected: PT.bool.isRequired,
        selected: PT.bool.isRequired,
        onSelect: PT.func.isRequired,
    };
    handleClick = () => {
        this.props.onSelect(this.props.run.id, this.props.place);
    };

    getClassName() {
        return makeClassName({
            active: this.props.selected,
            btn: true,
            disabled: this.props.disabled,
            "in-active-col": this.props.runHasSelected,
            "read-only": this.props.readOnly,
        });
    }
    render() {
        return (
            <td className={this.getClassName()} onClick={this.handleClick}>
                {this.props.place}
            </td>
        );
    }
}
