export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            tour: PT.shape({
                finalized: PT.bool.isRequired,
                id: PT.number.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
            onActiveTourChange: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onActiveTourChange(this.props.tour.id);
    }

    getClassName() {
        let result = "level-2";
        if (this.props.tour.finalized) {
            result += " grey";
        }
        if (this.props.active) {
            result += " active";
        }
        return result;
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                onClick={ this.handleClick }
            >
                { this.props.tour.name }
            </div>
        );
    }
}

Item.displayName = "AdminPanel_Judging_SideMenu_DisciplinesSorted_Item";
