import makeClassName from "common/makeClassName";

export default class PlaceButton extends React.PureComponent {
    handleClick = () => {
        this.props.onSelect(this.props.run.id, this.props.place);
    };

    getClassName() {
        return makeClassName({
            "active": this.props.selected,
            "btn": true,
            "disabled": this.props.disabled,
            "in-active-col": this.props.runHasSelected,
            "read-only": this.props.readOnly,
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
