import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            page: PT.oneOf(["info", "plan", "heats", "results"]).isRequired,
            title: PT.string.isRequired,
            onPageChange: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onPageChange(this.props.page);
    }

    getClassName() {
        let result = "item";
        if (this.props.active) {
            result += " active";
        }
        return result;
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                { ...onTouchOrClick(this.handleClick) }
            >
                <span>{ this.props.title }</span>
            </div>
        );
    }
}

Item.displayName = "PresenterTablet_LeftBar_Item";
