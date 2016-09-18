import onTouchOrClick from "../onTouchOrClick";

import makeClassName from "common/makeClassName";

export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            text: PT.string.isRequired,
            value: PT.oneOfType([
                PT.string.isRequired,
                PT.number.isRequired,
                PT.bool.isRequired,
            ]),
            onClick: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onClick(this.props.value);
    }

    getClassName() {
        return makeClassName({
            "tbtn": true,
            "score-btn": true,
            "active": this.props.active,
        });
    }
    render() {
        return (
            <button
                className={ this.getClassName() }
                { ...onTouchOrClick(this.handleClick) }
            >
                { this.props.text }
            </button>
        );
    }
}

Item.displayName = "tablet_ui_SelectorInput_Item";
