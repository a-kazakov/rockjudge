export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                finalized: PT.bool.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
            discipline: PT.shape({
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
                <small>
                    <strong>
                        { this.props.discipline.name }
                    </strong>
                    <br />
                </small>
                { this.props.tour.name }
            </div>
        );
    }
}

Item.displayName = "AdminPanel_Judging_SideMenu_PlanSorted_Item";
