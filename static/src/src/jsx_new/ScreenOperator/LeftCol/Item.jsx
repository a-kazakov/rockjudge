import makeClassName from "common/makeClassName";

import { onTouchEndOrClick } from "ui/tablet_components";

export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            screenData: PT.shape({
                id: PT.string.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
            onScreenChange: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onScreenChange(this.props.screenData.id);
    }

    getClassName() {
        return makeClassName({
            "item": true,
            "active": this.props.active,
        });
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                { ...onTouchEndOrClick(this.handleClick) }
            >
                { this.props.screenData.name }
            </div>
        );
    }
}

Item.displayName = "ScreenOperator_LeftCol_Item";
