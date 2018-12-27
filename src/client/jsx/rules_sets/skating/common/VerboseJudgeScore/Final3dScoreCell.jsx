import { React } from "HostModules";

import _ from "l10n";
import PT from "prop-types";
import formatScore from "./formatScore";

export default class Final3dScoreCell extends React.Component {
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
                    {this.renderRow("tech", "$")}
                    {this.renderRow("composition", "$")}
                    {this.renderRow("art", "$")}
                    {this.renderRow("place", "$")}
                </tbody>
            </table>
        );
    }
}
