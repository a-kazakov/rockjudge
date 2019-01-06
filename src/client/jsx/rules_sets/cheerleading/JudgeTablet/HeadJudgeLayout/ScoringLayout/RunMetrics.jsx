import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

const POSSIBLE_PENALTIES = [
    "time_penalty",
    "music_violated",
    "entry_exit_violated",
    "dress_violated",
    "cheer_block_violated",
    "accessories_violated",
    "complexity_violations",
    "other_penalties",
];

export default class RunMetrics extends React.Component {
    static propTypes = {
        run: PT.object.isRequired,
        tourResults: PT.object.isRequired,
    };

    renderFinalPenalty() {
        const value = this.run_result?.extra_data.penalty ?? 0;
        return (
            <tr>
                <th>{_("tablet.head_judge.final_penalty")}</th>
                <td className={value === 0 ? "green" : "red"}>{value}</td>
            </tr>
        );
    }
    renderAccumulatedPenalties() {
        const values = this.run_result?.extra_data.accumulated_penalties;
        const applicable_penalties = POSSIBLE_PENALTIES.filter(
            p => (values[p] ?? 0) !== 0,
        );
        if (applicable_penalties.length === 0) {
            return null;
        }
        return (
            <>
                {applicable_penalties.map(p => (
                    <tr key={p}>
                        <th>{_(`score_parts.components.medium.${p}`)}</th>
                        <td className="light-red">{values[p]}</td>
                    </tr>
                ))}
            </>
        );
    }
    render() {
        this.run_result = this.props.tourResults.runs_results[this.props.run.id];
        return (
            <table className="run-metrics">
                <tbody>
                    {this.renderFinalPenalty()}
                    {this.renderAccumulatedPenalties()}
                </tbody>
            </table>
        );
    }
}
