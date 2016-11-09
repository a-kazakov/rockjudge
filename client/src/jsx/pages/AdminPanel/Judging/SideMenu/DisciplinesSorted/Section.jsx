import Item from "./Item";

export default class Section extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activeTourId: PT.number,
            discipline: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                tours: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            onActiveTourChange: PT.func.isRequired,
        };
    }

    handleOpenClose = (event) => {
        sessionStorage.setItem(`D_J_${this.props.discipline.id}`, event.target.parentNode.open ? 0 : 1);
    }

    isOpen() {
        return !!Number(sessionStorage.getItem(`D_J_${this.props.discipline.id}`));
    }
    render() {
        return (
            <details
                className="block"
                open={ this.isOpen() }
            >
                <summary
                    className="level-1"
                    onClick={ this.handleOpenClose }
                >
                    { this.props.discipline.name }
                </summary>
                { this.props.discipline.tours.map(tour =>
                    <Item
                        active={ tour.id === this.props.activeTourId }
                        key={ tour.id }
                        tour={ tour }
                        onActiveTourChange={ this.props.onActiveTourChange }
                    />
                ) }
            </details>
        );
    }
}

Section.displayName = "AdminPanel_Judging_SideMenu_DisciplinesSorted_Section";
