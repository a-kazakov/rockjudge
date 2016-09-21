const PARTICIPANTS_PER_PAGE = 15;
const REFRESH_INTERVAL = 7000;

export default class Renderer extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            table: PT.arrayOf(
                PT.shape({
                    place: PT.number.isRequired,
                    advances: PT.bool.isRequired,
                    run: PT.shape({
                        participant: PT.shape({
                            number: PT.number.isRequired,
                            name: PT.string.isRequired,
                        }).isRequired,
                        total_score: PT.string.isRequired,
                    }).isRequired,
                }).isRequired,
            ).isRequired,
            tour: PT.shape({
                name: PT.string.isRequired,
                next_tour_id: PT.number,
                discipline: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        };
        setInterval(() => this.setState({
            page: this.state.page + 1,
        }), REFRESH_INTERVAL);
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
                { this.props.tour.next_tour_id !== null ? (
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
                { this.props.tour.next_tour_id !== null ? <td>&nbsp;</td> : null }
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
        const n_pages = Math.max(1,
            Math.floor(this.props.table.length / PARTICIPANTS_PER_PAGE) +
            !!(this.props.table.length % PARTICIPANTS_PER_PAGE));
        const page_size = Math.min(PARTICIPANTS_PER_PAGE, this.props.table.length);
        const corr_page = this.state.page % n_pages;
        const rows = this.props.table.slice(corr_page * PARTICIPANTS_PER_PAGE, (corr_page + 1) * PARTICIPANTS_PER_PAGE);
        return (
            <div className="TourResults">
                <div className="discipline-name">
                    { this.props.tour.discipline.name }
                </div>
                <div className="tour-name">
                    { this.props.tour.name }
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
                        { this.props.tour.next_tour_id !== null ? (
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
