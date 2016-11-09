import SideMenu from "./SideMenu";
import TourPanel from "./TourPanel";

export default class Judging extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        tours: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                            }).isRequired
                        ).isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTourId: this.getTourIdFromHash(),
        };
    }

    getTourIdFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[1] && /^\d+$/.test(chunks[1])) {
            return Number(chunks[1]);
        }
        return null;
    }

    getActiveTourAndDiscipline() {
        for (const discipline of this.props.competition.disciplines) {
            for (const tour of discipline.tours) {
                if (tour.id === this.state.activeTourId) {
                    return { tour, discipline };
                }
            }
        }
        return {
            tour: null,
            discipline: null,
        };
    }

    handleActiveTourChange = (activeTourId) => {
        this.setState({ activeTourId });
        window.location.hash = `#judging/${activeTourId}`;
    }

    renderTourPanel() {
        if (this.state.activeTourId === null) {
            return null;
        }
        const { tour, discipline } = this.getActiveTourAndDiscipline();
        if (this.state.tour === null) {
            return null;
        }
        return (
            <TourPanel
                discipline={ discipline }
                tour={ tour }
            />
        );
    }
    render() {
        return (
            <div className="Judging">
                <SideMenu
                    activeTourId={ this.state.activeTourId }
                    competition={ this.props.competition }
                    onActiveTourChange={ this.handleActiveTourChange }
                />
                { this.renderTourPanel() }
            </div>
        );
    }
}

Judging.displayName = "AdminPanel_Judging";
