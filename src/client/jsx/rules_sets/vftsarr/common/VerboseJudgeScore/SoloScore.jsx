import { React } from "HostModules";

import _ from "l10n";
import PT from "prop-types";
import formatScore from "./formatScore";

export default class DanceScore extends React.Component {
    static propTypes = {
        scoreResult: PT.object.isRequired,
    };

    renderRow(component, fmt = "@") {
        return (
            <tr>
                <th>
                    <p>{_(`score_parts.components.short.${component}`)}:</p>
                </th>
                <td>
                    <p>
                        {formatScore(
                            this.props.scoreResult.extra_data.parts[component],
                            fmt,
                        )}
                    </p>
                </td>
            </tr>
        );
    }
    render() {
        return (
            <table className="score-breakdown">
                <tbody>
                    {this.renderRow("fw", "-$%")}
                    {this.renderRow("dance_figs")}
                    {this.renderRow("small_mistakes", "$")}
                    {this.renderRow("big_mistakes", "$")}
                </tbody>
            </table>
        );
    }
}
