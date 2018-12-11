import { React } from "HostModules";

import _ from "l10n";
import PT from "prop-types";
import formatScore from "./formatScore";

export default class AcroScore extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        scoreResult: PT.object.isRequired,
    };

    render() {
        const run = this.props.score.run;
        if (run.acrobatics.length === 0) {
            return null;
        }
        return (
            <table className="score-breakdown">
                <tbody>
                    {run.acrobatics.slice(0, 8).map((acro, idx) => (
                        <tr key={idx}>
                            <th>
                                <p>{_("results.breakdown.acro_n", idx + 1)}:</p>
                            </th>
                            <td>
                                <p>
                                    {formatScore(
                                        this.props.scoreResult.extra_data.parts[
                                            `a${idx + 1}`
                                        ],
                                        "-$%",
                                    )}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
