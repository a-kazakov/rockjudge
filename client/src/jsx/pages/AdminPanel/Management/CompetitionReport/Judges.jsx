import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";

export default class Judges extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            include_judges: PT.shape.isRequired,
            include_discipline_judges: PT.bool.isRequired,
        }).isRequired,
    };

    static genJudgesNumbers(competition) {
        let result = [];
        let numbers_used = {};
        competition.judges.forEach(j => {
            const number = j.number;
            let appendix = "";
            let cnt = 0;
            while (numbers_used[number + appendix]) {
                appendix = number === "" ? cnt.toString() : `-${++cnt}`;
            }
            numbers_used[number + appendix] = true;
            result.push(number + appendix);
        });
        return result;
    }

    renderIdx(idx, numbers) {
        if (!this.props.config.include_discipline_judges) {
            return null;
        }
        return (
            <td className="w-10">
                <p className="text-right">{numbers[idx]}</p>
            </td>
        );
    }
    render() {
        if (!this.props.config.include_judges) {
            return null;
        }
        const numbers = Judges.genJudgesNumbers(this.props.competition);
        return (
            <div>
                <h4>
                    <p>{_("admin.headers.judges")}</p>
                </h4>
                <table className="judges">
                    <tbody>
                        {this.props.competition.judges.map((judge, idx) => (
                            <tr key={judge.id}>
                                {this.renderIdx(idx, numbers)}
                                <th className="w-35">
                                    <p className="text-left">
                                        {judge.role_description ||
                                            _("global.phrases.judge_n", judge.number)}
                                    </p>
                                </th>
                                <td className="w-55">
                                    <p>{`${judge.name}, ${judge.category}`}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
