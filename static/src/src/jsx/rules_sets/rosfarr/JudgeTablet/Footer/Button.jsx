import { onTouchOrClick } from "ui/tablet_components";

export default class Button extends React.Component {
    onClick = () => {
        this.props.onClick(this.props.mkey);
    }
    render() {
        return (
            <button
                className={ "btn" + (this.props.active ? " active" : "") }
                { ...onTouchOrClick(this.onClick) }>
                    { this.props.label }
            </button>
        )
    }
}
