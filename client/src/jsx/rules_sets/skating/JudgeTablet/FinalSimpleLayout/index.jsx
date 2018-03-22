import _ from "l10n";

import PlaceButton from "./PlaceButton";


const MULTIPLE_RUNS = Symbol();


export default class FinalSimpleLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
                judge: PT.object.isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        heat: PT.number.isRequired,
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            onHeatConfirm: PT.func.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handlePlaceSelect = (run_id, place) => {
        this.props.onScoreUpdate(this.score_ids.get(run_id), {place});
    };

    setupCache() {
        this.places = new Map();
        this.score_ids = new Map();
        this.place_to_run = new Map();
        for (const run of this.props.tour.runs) {
            for (const score of run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    this.places.set(run.id, score.data.raw_data.place);
                    this.score_ids.set(run.id, score.id);
                    this.place_to_run.set(
                        score.data.raw_data.place,
                        this.place_to_run.has(score.data.raw_data.place)
                            ? MULTIPLE_RUNS
                            : run,
                    );
                }
            }
        }
    }

    renderTableHeader() {
        let cells = [];
        for (const run of this.props.tour.runs) {
            cells.push(
                <th key={ run.id }>
                    { run.participant.number }
                </th>
            );
        }
        return (
            <tr>
                { cells }
                <th className="participant">
                    { _("tablet.dance_judge.participant") }
                </th>
            </tr>
        );
    }

    renderParticipant(place) {
        if (!this.place_to_run.has(place)) {
            return null;
        }
        const run = this.place_to_run.get(place);
        if (run === MULTIPLE_RUNS) {
            return (
                <span className="multiple-participants">
                    { _("tablet.dance_judge.multiple_participants") }
                </span>
            )
        }
        return `№${run.participant.number}: ${run.participant.name}`;
    }

    renderTableRows() {
        let rows = [];
        const n_places = this.props.tour.runs.length;
        for (let place = 1; place <= n_places; ++place) {
            let cells = [];
            for (const run of this.props.tour.runs) {
                cells.push(
                    <PlaceButton
                        key={ run.id }
                        place={ place }
                        run={ run }
                        runHasSelected={ this.places.get(run.id) !== null }
                        selected={ this.places.get(run.id) === place }
                        onSelect={ this.handlePlaceSelect }
                    />
                )
            }
            rows.push(
                <tr key={ place }>
                    { cells }
                    <td className="participant">
                        { this.renderParticipant(place) }
                    </td>
                </tr>
            );
        }
        return rows;
    }

    render() {
        this.setupCache();
        const judge_number = this.props.disciplineJudge.judge.role_description ||
            _("global.phrases.judge_n", this.props.disciplineJudge.judge.number);
        return (
            <div className="skating-JudgeTablet GeneralLayout">
                <header>
                    <div className="data">
                        <div className="box">
                            <h1>{ judge_number }</h1>
                            <h2>{ this.props.disciplineJudge.judge.name }</h2>
                        </div>
                        <div className="box">
                            <h1>{ this.props.tour.discipline.name }</h1>
                            <h2>
                                { this.props.tour.name }
                            </h2>
                        </div>
                    </div>
                </header>
                <div className="body">
                    <table className="places-table">
                        <tbody>
                            { this.renderTableHeader() }
                            { this.renderTableRows() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
