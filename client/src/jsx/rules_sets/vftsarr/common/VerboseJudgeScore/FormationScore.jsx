import {React} from "HostModules";

import _ from "l10n";
import PT from "prop-types";
import formatScore from "./formatScore";

export default class FormationScore extends React.Component {
    static propTypes = {
        scoreResult: PT.object.isRequired,
    };

    renderRow(component, fmt="@") {
        return (
            <tr>
                <th>
                    <p>{ _(`score_parts.components.short.${component}`) }:</p>
                </th>
                <td>
                    <p>{ formatScore(this.props.scoreResult.extra_data.parts[component], fmt) }</p>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <table className="score-breakdown"><tbody>
                { this.renderRow("fw", "-$%") }
                { this.renderRow("df_accuracy") }
                { this.renderRow("df_difficulty") }
                { this.renderRow("df_art") }
                { this.renderRow("c_ideas") }
                { this.renderRow("c_structure") }
                { this.renderRow("c_bonus") }
                { this.renderRow("fig_execution") }
                { this.renderRow("fig_patterns") }
                { this.renderRow("fig_transitions") }
                { this.renderRow("small_mistakes", "$") }
                { this.renderRow("big_mistakes", "$") }
            </tbody></table>
        );
    }
}

