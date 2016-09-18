import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import makeClassName from "common/makeClassName";

export default class Tour extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            selected: PT.bool.isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                active: PT.bool.isRequired,
                finalized: PT.bool.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
            onTourSelect: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onTourSelect(this.props.tour.id);
    }

    getClassName() {
        return makeClassName({
            "tour": true,
            "selected": this.props.selected,
            "active": this.props.tour.active,
            "finalized": this.props.tour.finalized,
        });
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                { ...onTouchEndOrClick(this.handleClick) }
            >
                { this.props.tour.name }
            </div>
        );
    }
}

Tour.displayName = "ScreenOperator_TourSelector_Tour";
