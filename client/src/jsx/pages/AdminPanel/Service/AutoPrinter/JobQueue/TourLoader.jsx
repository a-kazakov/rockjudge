import LoadingComponent from "common/server/LoadingComponent";


export default class TourLoader extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tourId: PT.number.isRequired,
            renderer: PT.func.isRequired,
        };
    }

    CLASS_ID = "auto_printer_tour_loader";
    API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: props => props.tourId,
            schema: {
                results: {},
                discipline: {
                    competition: {},
                    discipline_judges: {
                        judge: {},
                    },
                },
                runs: {
                    participant: {
                        club: {},
                    },
                    scores: {},
                    acrobatics: {},
                },
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }

    render() {
        if (this.state.tour === null) {
            return null;
        }
        // eslint-disable-next-line no-unused-vars
        const { tourId, renderer: RenderingComponent, ...props } = this.props;
        return (
            <RenderingComponent
                tour={ this.state.tour }
                { ...props }
            />
        );
    }
}
