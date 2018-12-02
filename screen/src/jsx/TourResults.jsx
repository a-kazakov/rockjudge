import {React} from "HostModules";

import PT from "prop-types";
import makeTourResultsTable from "common/makeTourResultsTable";
import lastOf from "common/tools/lastOf";

const PARTICIPANTS_PER_PAGE = 15;
const REFRESH_INTERVAL = 7000;

export default class TourResults extends React.Component {
    static propTypes = {
        activeTour: PT.object,
        competition: PT.object.isRequired,
        onActiveTourIdChange: PT.func.isRequired,
    };

    state = {
        page: 0,
        interval: null,
    };

    componentDidMount() {
        this.ensureCorrectTour();
        this.maybeUpdateLoop();
    }
    componentDidUpdate() {
        this.ensureCorrectTour();
        this.maybeUpdateLoop();
    }

    ensureCorrectTour() {
        if (!this.is_tour_loaded) {
            setTimeout(() => this.props.onActiveTourIdChange(this.controls.tour_id || null));
        }
    }

    get controls() {
        return this.props.competition.screen_data.controls_state;
    }
    get is_tour_loaded() {
        return (this.props.activeTour?.id || null) === (this.controls.tour_id || null);
    }

    maybeUpdateLoop() {
        const no_tour = this.props.activeTour == null;
        const no_loop = this.state.interval == null;
        if (no_tour === no_loop) {
            return;
        }
        if (no_tour) {
            clearInterval(this.state.interval);
            this.setState({
                interval: null,
            });
        } else {
            const interval = setInterval(
                () => this.setState(state => ({page: state.page + 1})),
                REFRESH_INTERVAL,
            );
            this.setState({interval, page: 0});
        }
    }
    sliceComputedTour(computedTour) {
        let {tour, tour_result, rows} = computedTour;
        const n_pages = Math.max(1,
            Math.floor(rows.length / PARTICIPANTS_PER_PAGE) +
            !!(rows.length % PARTICIPANTS_PER_PAGE)
        );
        const corr_page = this.state.page % n_pages;
        rows = rows.slice(
            corr_page * PARTICIPANTS_PER_PAGE,
            (corr_page + 1) * PARTICIPANTS_PER_PAGE
        );
        return {tour, tour_result, rows};
    }

    renderRow = (row) => {
        const is_last_tour = lastOf(this.props.activeTour.discipline.tours).id === this.props.activeTour.id;
        const total_score = row.run.tour.results.runs_results[row.run.id]?.total_score_str ?? "";
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
                    { total_score }
                </td>
                { is_last_tour ? (
                    <td className="next-tour">
                        { row.advances ? <b>Да</b> : "Нет" }
                    </td>
                ) : null }
            </tr>
        );
    };
    renderEmptyRow(key) {
        const is_last_tour = lastOf(this.props.activeTour.discipline.tours).id === this.props.activeTour.id;
        return (
            <tr className="empty" key={ `ER-${key}` }>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                { is_last_tour ? <td>&nbsp;</td> : null }
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
        if (!this.is_tour_loaded) {
            return null;
        }
        const computed_tour = makeTourResultsTable(this.props.activeTour);
        const sliced_computed_tour = this.sliceComputedTour(computed_tour);
        const page_size = Math.min(PARTICIPANTS_PER_PAGE, computed_tour.rows.length);
        const is_last_tour = lastOf(this.props.activeTour.discipline.tours).id === this.props.activeTour.id;
        return (
            <div className="TourResults tour-results">
                <div className="discipline-name">
                    { this.props.activeTour.discipline.name }
                </div>
                <div className="tour-name">
                    { this.props.activeTour.name }
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
                        { is_last_tour ? (
                            <th className="next-tour">
                                Сл. тур
                            </th>
                        ) : null }
                    </tr>
                    { this.renderRows(sliced_computed_tour.rows, page_size, is_last_tour) }
                </tbody></table>
            </div>
        );
    }
}

