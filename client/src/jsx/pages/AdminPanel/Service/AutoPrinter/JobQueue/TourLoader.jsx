import message_dispatcher from "common/server/message_dispatcher";
import storage from "common/server/storage";
import Api from "common/server/Api";


export default class TourLoader extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tourId: PT.number.isRequired,
            renderer: PT.func.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }

    componentWillMount() {
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.tourId !== next_props.tourId) {
            this.setState({
                tour: null,
            });
            this.freeStorage(this.props.tourId);
            this.setupStorage(next_props.tourId);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.tourId !== this.props.tourId) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
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
            },
        };
    }

    setupStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tourId;
        }
        this.storage = storage.getDomain(`juding_scores_${tour_id}`);
    }
    freeStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tourId;
        }
        storage.delDomain(`juding_scores_${tour_id}`);
    }

    reloadFromStorage = () => {
        const serialized = this.storage.get("Tour")
            .by_id(this.props.tourId)
            .serialize(this.SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadData = () => {
        Api("tour.get", {
            tour_id: this.props.tourId,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.props.tourId, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
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
