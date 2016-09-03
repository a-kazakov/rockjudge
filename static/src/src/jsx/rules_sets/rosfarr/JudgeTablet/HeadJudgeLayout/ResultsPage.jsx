import Api from "server/api";

import { Loader } from "ui/components";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";

import ResultsTable2 from "ResultsTable2";

export default class ResultsPage extends React.Component {
    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
            results: null,
        }
        this.TOUR_SCHEMA = {
            discipline: {
                competition: {},
                discipline_judges: {
                    judge: {},
                },
            },
            runs: {
                acrobatics: {},
                scores: {},
                participant: {
                    club: {},
                },
            },
        };
    }
    componentWillMount() {
        this.storage = storage.getDomain("results_" + this.props.tour.id);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.results_change_listener = message_dispatcher.addListener("tour_results_changed reload_data", function(message) {
            if (!message || message.tour_id === this.props.tour.id) {
                this.loadResults();
            }
        }.bind(this));
        this.loadData();
        this.loadResults();
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.results_change_listener);
        storage.delDomain("results_" + this.props.tour.id);
    }
    reloadFromStorage() {
        let serialized = this.storage.get("Tour")
            .by_id(this.props.tour.id)
            .serialize(this.TOUR_SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadResults() {
        Api("tour.get_results", {tour_id: this.props.tour.id})
        .onSuccess(function(new_results) {
            this.setState({
                "results": new_results,
            });
            this.reloadFromStorage();
        }.bind(this))
        .send();
    }
    loadData() {
        Api("tour.get", { tour_id: this.props.tour.id, children: this.TOUR_SCHEMA})
            .addToDB("Tour", this.props.tour.id, this.storage)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }
    render() {
        if (this.state.tour === null || this.state.results === null) {
            return (
                <div className="body results">
                    <Loader />
                </div>
            );
        }
        return (
            <div className="body results">
                <div className="tour-results">
                    <ResultsTable2
                        {...this.state}
                    />
                </div>
            </div>
        )
    }
}
