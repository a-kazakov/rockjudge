import {React} from "HostModules";
import PT from "prop-types";
import makeClassName from "common/makeClassName";

export default class PlaceButton extends React.Component {
    static propTypes = {
        place: PT.number.isRequired,
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
            "btn": true,
            "active": this.props.selected,
            "in-active-col": this.props.runHasSelected,
        });
    }
    render() {
        return (
            <td
                className={ this.getClassName() }
                onClick={ this.handleClick }
            >
                { this.props.place }
            </td>
        )
    }
}
