import { Api, React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import ResultsTable2 from "ResultsTable2";
import SelectorInput from "tablet_ui/SelectorInput";
import makeTourResultsTable from "common/makeTourResultsTable";
import lastOf from "common/tools/lastOf";

export default class ResultsPage extends React.Component {
    static propTypes = {
        tour: PT.object.isRequired,
    };

    handleNumAdvancesChange = num_advances => {
        Api("model/update", {
            model_name: "Tour",
            model_id: this.props.tour.id,
            data: { num_advances },
        }).send();
    };

    renderNumAdvancesSelector() {
        const djs_map = new Map(
            this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]),
        );
        for (const run of this.props.tour.runs) {
            for (const score of run.scores) {
                if (
                    djs_map.get(score.discipline_judge_id).role === "dance_judge" &&
                    !score.confirmed
                ) {
                    return (
                        <div className="selector-not-available">
                            {_("tablet.head_judge.num_advances_selector_not_avaliable")}
                        </div>
                    );
                }
            }
        }
        let possible_advances_values = new Set(
            Object.values(this.props.tour.results.runs_results)
                .map(r => r.place)
                .filter(p => p)
                .map(p => p - 1),
        );
        possible_advances_values = Array.from(possible_advances_values).sort(
            (a, b) => a - b,
        );
        return (
            <div>
                <h3>{_("tablet.head_judge.set_num_advances")}</h3>
                <SelectorInput
                    compact
                    choices={possible_advances_values.map(v => [v, v.toString()])}
                    style="one-line"
                    value={this.props.tour.num_advances}
                    onChange={this.handleNumAdvancesChange}
                />
            </div>
        );
    }
    renderAdvancedInfo() {
        const { tour } = this.props;
        if (
            lastOf(tour.discipline.tours).id === tour.id ||
            tour.scoring_system_name.includes("final")
        ) {
            return null;
        }
        return (
            <div className="advances-info">
                <div className="info">
                    <div>
                        {_("tablet.head_judge.advances_quota", tour.num_advances)}
                    </div>
                    <div>
                        {_(
                            "tablet.head_judge.advances_actual",
                            Object.values(tour.results.runs_results).filter(
                                r => r.advanced,
                            ).length,
                        )}
                    </div>
                </div>
                <div className="controls">{this.renderNumAdvancesSelector()}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="body results">
                {this.renderAdvancedInfo()}
                <ResultsTable2 computedTour={makeTourResultsTable(this.props.tour)} />
            </div>
        );
    }
}
