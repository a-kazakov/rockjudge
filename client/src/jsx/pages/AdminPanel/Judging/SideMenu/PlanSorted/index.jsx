import Item from "./Item";

export default class PlanSorted extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activeTourId: PT.number,
            competition: PT.shape({
                plan: PT.arrayOf(
                    PT.shape({
                        tour_id: PT.number,
                    }).isRequired
                ).isRequired,
                disciplines: PT.arrayOf(
                    PT.shape({
                        tours: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                            })
                        ).isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            onActiveTourChange: PT.func.isRequired,
        };
    }

    render() {
        let tours = new Map();
        for (const discipline of this.props.competition.disciplines) {
            for (const tour of discipline.tours) {
                tours.set(tour.id, {
                    tour: tour,
                    discipline: discipline,
                });
            }
        }
        const plan = this.props.competition.plan.filter(item => item.tour_id !== null);
        return (
            <div>
                { plan.map(item => {
                    const { tour, discipline } = tours.get(item.tour_id);
                    return (
                        <Item
                            active={ tour.id === this.props.activeTourId }
                            discipline={ discipline }
                            key={ tour.id }
                            tour={ tour }
                            onActiveTourChange={ this.props.onActiveTourChange }
                        />
                    );
                }) }
            </div>
        );
    }
}

PlanSorted.displayName = "AdminPanel_Judging_SideMenu_PlanSorted";
