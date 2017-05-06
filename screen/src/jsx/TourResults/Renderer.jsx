import { Api, storage, message_dispatcher, makeTourResultsTable } from "HostModules";

const PARTICIPANTS_PER_PAGE = 15;
const REFRESH_INTERVAL = 7000;

export default class Renderer extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tourId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            tour: null,
        };
    }

    componentWillMount() {
        this._interval = setInterval(() => this.setState({
            page: this.state.page + 1,
        }), REFRESH_INTERVAL);
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.tourId !== next_props.tourId) {
            this.setState({
                page: 0,
                tour: null,
            });
            this.freeStorage(this.props.tourId);
            this.setupStorage(next_props.tourId);
            clearInterval(this._interval);
            this._interval = setInterval(() => this.setState({
                page: this.state.page + 1,
            }), REFRESH_INTERVAL);
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
        clearInterval(this._interval);
    }

    get SCHEMA() {
        return {
            results: {},
            discipline: {},
            runs: {
                participant: {
                    club: {},
                },
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

    renderRow = (row) => {
        return (
            <tr key={ row.run.id }>
                <td className="place">
                    { row.place }
                </td>
                <td className="number">
                    { row.run.participant.number }
                </td>
                <td className="participant">
                    { row.run.participant.name }
                </td>
                <td className="score">
                    { row.run.total_score }
                </td>
                { this.state.tour.next_tour_id !== null ? (
                    <td className="next-tour">
                        { row.advances ? <b>Да</b> : "Нет" }
                    </td>
                ) : null }
            </tr>
        );
    }
    renderEmptyRow(key) {
        return (
            <tr className="empty" key={ `ER-${key}` }>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                { this.state.tour.next_tour_id !== null ? <td>&nbsp;</td> : null }
            </tr>
        );
    }
    renderRows(rows, page_size) {
        let result = rows.map(this.renderRow);
        for (let i = rows.length; i < page_size; ++i) {
            result.push(this.renderEmptyRow(i));
        }
        return result;
    }
    render() {
        if (this.state.tour === null) {
            return null;
        }
        const table = makeTourResultsTable(this.state.tour);
        const n_pages = Math.max(1,
            Math.floor(table.length / PARTICIPANTS_PER_PAGE) +
            !!(table.length % PARTICIPANTS_PER_PAGE));
        const page_size = Math.min(PARTICIPANTS_PER_PAGE, table.length);
        const corr_page = this.state.page % n_pages;
        const rows = table.slice(corr_page * PARTICIPANTS_PER_PAGE, (corr_page + 1) * PARTICIPANTS_PER_PAGE);
        return (
            <div className="TourResults tour-results">
                <div className="discipline-name">
                    { this.state.tour.discipline.name }
                </div>
                <div className="tour-name">
                    { this.state.tour.name }
                </div>
                <div className="header">
                    Результаты тура
                </div>
                <table><tbody>
                    <tr>
                        <th className="place">
                            М
                        </th>
                        <th className="number">
                            №
                        </th>
                        <th className="participant">
                            Участник
                        </th>
                        <th className="score">
                            Баллы
                        </th>
                        { this.state.tour.next_tour_id !== null ? (
                            <th className="next-tour">
                                Сл. тур
                            </th>
                        ) : null }
                    </tr>
                    { this.renderRows(rows, page_size) }
                </tbody></table>
            </div>
        );
    }
}

Renderer.displayName = "TourResults_Renderer";
