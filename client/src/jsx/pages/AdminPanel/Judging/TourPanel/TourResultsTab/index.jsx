import storage from "common/server/storage";
import Api from "common/server/Api";

import Renderer from "./Renderer";

export default class TourResultsTab extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.object,
            tour: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            verbosity: PT.number.isRequired,
        };
    }

    componentDidMount() {
        this.checkAutoDocx();
    }
    componentDidUpdate() {
        this.checkAutoDocx();
    }

    checkAutoDocx() {
        if (this.props.autoDocx && !this._docx_done && this.props.tour !== null) {
            this._docx_done = true;
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.onDone(this.props.autoDocx.filename);
        }
    }

    get SCHEMA() {
        return {
            discipline: {
                competition: {},
                discipline_judges: {
                    judge: {},
                },
            },
            results: {},
            runs: {
                acrobatics: {},
                scores: {},
                participant: {
                    club: {},
                },
            },
        };
    }

    setupStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tour.id;
        }
        this.storage = storage.getDomain(`heats_${tour_id}`);
    }
    freeStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tour.id;
        }
        storage.delDomain(`heats_${tour_id}`);
    }

    reloadFromStorage = () => {
        const serialized = this.storage.get("Tour")
            .by_id(this.props.tour.id)
            .serialize(this.SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadData = () => {
        Api("tour.get", {
            tour_id: this.props.tour.id,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.props.tour.id, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    }

    // Rendering

    getClassName() {
        return `TourResultsTab rules-set`;
    }
    render() {
        return (
            <div className={ this.getClassName() }>
                <Renderer
                    autoDocx={ this.props.autoDocx }
                    ref={ this.makeResultsRef }
                    tour={ this.props.tour }
                    verbosity={ this.props.verbosity }
                />
            </div>
        );
    }
}


TourResultsTab.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab";
