import onTouchOrClick from "tablet_ui/onTouchOrClick";

import makeClassName from "common/makeClassName";

export default class Button extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            label: PT.string.isRequired,
            mkey: PT.any.isRequired,
            onClick: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onClick(this.props.mkey);
    }

    getClassName() {
        return makeClassName({
            "btn": true,
            "active": this.props.active,
        });
    }
    render() {
        return (
            <button
                className={ this.getClassName() }
                { ...onTouchOrClick(this.handleClick) }
            >
                { this.props.label }
            </button>
        )
    }
}
