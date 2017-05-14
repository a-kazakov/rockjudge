import Api from "common/server/Api";
import Loader from "common/components/Loader";

import storage from "common/server/storage";
import websocket from "common/server/websocket";

import makeDisciplineResultsTable from "common/makeDisciplineResultsTable";

import Row from "./Row";

export default class ResultsRenderer extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            discipline: null,
        };
    }

    componentWillMount() {
        this.setupStorage();
        this.reload_listener = websocket.addListener("reload_data", this.loadData);
        this.db_update_listener = websocket.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.disciplineId !== next_props.disciplineId) {
            this.setState({
                discipline: null,
            });
            this.freeStorage(this.props.disciplineId);
            this.setupStorage(next_props.disciplineId);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.disciplineId !== this.props.disciplineId) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        websocket.removeListener(this.reload_listener);
        websocket.removeListener(this.db_update_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
            results: {},
            discipline_judges: {
                judge: {},
            },
            tours: {
                runs: {
                    participant: {
                        club: {},
                    },
                },
            },
        };
    }

    setupStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.disciplineId;
        }
        this.storage = storage.getDomain(`juding_scores_${discipline_id}`);
    }
    freeStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.disciplineId;
        }
        storage.delDomain(`juding_scores_${discipline_id}`);
    }

    reloadFromStorage = () => {
        const serialized = this.storage.get("Discipline")
            .by_id(this.props.disciplineId)
            .serialize(this.SCHEMA);
        this.setState({
            discipline: serialized,
        });
    }
    loadData = () => {
        Api("discipline.get", {
            discipline_id: this.props.disciplineId,
            children: this.SCHEMA,
        })
            .addToDB("Discipline", this.props.disciplineId, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    renderRowHeader(prev_row, next_row) {
        if (
            typeof prev_row !== "undefined" &&
            prev_row.tour.id === next_row.tour.id
        ) {
            return null;
        }
        return (
            <div
                className="tour-name"
                key={ `H${next_row.run.id}` }
            >
                { next_row.tour.name }
            </div>
        );
    }
    renderRow(row) {
        return (
            <Row
                key={ `R${row.run.id}` }
                participant={ row.run.participant }
                place={ row.place }
            />
        );
    }
    renderRows() {
        const table = makeDisciplineResultsTable(this.state.discipline);
        let result = [];
        for (let i = table.length - 1; i >= 0; --i) {
            const header = this.renderRowHeader(table[i + 1], table[i]);
            if (header) {
                result.push(header);
            }
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        if (this.state.discipline === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="discipline-results">
                { this.renderRows() }
            </div>
        );
    }
}

ResultsRenderer.displayName = "PresenterTablet_ResultsPage_ResultsRenderer";
