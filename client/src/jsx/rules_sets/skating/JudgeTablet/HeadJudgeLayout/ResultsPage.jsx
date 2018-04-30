import _ from "l10n";

import { Api } from "HostModules";

import ResultsTable2 from "ResultsTable2";
import SelectorInput from "tablet_ui/SelectorInput";

export default class ResultsPage extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                id: PT.number.isRequired,
                results: PT.arrayOf(
                    PT.shape({
                        place: PT.number,
                    }).isRequired,
                ).isRequired,
                next_tour_id: PT.number,
                num_advances: PT.number.isRequired,
                scoring_system_name: PT.string.isRequired,
                discipline: PT.shape({
                    discipline_judges: PT.arrayOf(
                        PT.shape({
                            id: PT.number.isRequired,
                            role: PT.string.isRequired,
                        }).isRequired,
                    ).isRequired,
                }).isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        scores: PT.arrayOf(
                            PT.shape({
                                confirmed: PT.bool.isRequired,
                            }),
                        ),
                    }),
                ).isRequired,
            }).isRequired,
        };
    }

    handleNumAdvancesChange = (num_advances) => {
        Api("tour.set", {
            tour_id: this.props.tour.id,
            data: { num_advances },
        })
            .send();
    };

    renderNumAdvancesSelector() {
        const djs_map = new Map(this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]));
        for (const run of this.props.tour.runs) {
            for (const score of run.scores) {
                if (djs_map.get(score.discipline_judge_id).role === "dance_judge" && !score.confirmed) {
                    return (
                        <div className="selector-not-available">
                            { _("tablet.head_judge.num_advances_selector_not_avaliable") }
                        </div>
                    )
                }
            }
        }
        let possible_advances_values = new Set(this.props.tour.results
            .map(r => r.place)
            .filter(p => p)
            .map(p => p - 1)
        );
        possible_advances_values = Array.from(possible_advances_values)
        possible_advances_values.sort((a, b) => a - b);
        return (
            <div>
                <h3>
                    { _("tablet.head_judge.set_num_advances") }
                </h3>
                <SelectorInput
                    compact
                    choices={ possible_advances_values.map(v => [v, v.toString()]) }
                    style="one-line"
                    value={ this.props.tour.num_advances }
                    onChange={ this.handleNumAdvancesChange }
                />
            </div>
        )
    }
    renderAdvancedInfo() {
        if (this.props.tour.next_tour_id === null || this.props.tour.scoring_system_name.includes("final")) {
            return null;
        }
        return (
            <div className="advances-info">
                <div className="info">
                    <div>
                        { _("tablet.head_judge.advances_quota", this.props.tour.num_advances) }
                    </div>
                    <div>
                        { _("tablet.head_judge.advances_actual", this.props.tour.results.filter(r => r.advances).length) }
                    </div>
                </div>
                <div className="controls">
                    { this.renderNumAdvancesSelector() }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="body results">
                { this.renderAdvancedInfo() }
                <ResultsTable2
                    tour={ this.props.tour }
                />
            </div>
        )
    }
}
