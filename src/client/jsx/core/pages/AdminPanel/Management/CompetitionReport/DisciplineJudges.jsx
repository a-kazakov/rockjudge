import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import Judges from "./Judges";

export default class DisciplineJudges extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            include_discipline_judges: PT.bool.isRequired,
        }).isRequired,
    };

    getJudgesDisciplines() {
        let judges_used = new Set();
        let roles = {};
        for (const discipline of this.props.competition.disciplines) {
            for (const discipline_judge of discipline.discipline_judges) {
                roles[`${discipline.id}_${discipline_judge.judge.id}`] =
                    discipline_judge.role;
                judges_used.add(discipline_judge.judge.id);
            }
        }
        let judges = [];
        const judges_numbers = Judges.genJudgesNumbers(this.props.competition);
        this.props.competition.judges.forEach((j, idx) => {
            if (judges_used.has(j.id)) {
                judges.push({
                    number: judges_numbers[idx],
                    idx: idx,
                });
            }
        });
        const table = this.props.competition.disciplines.map(discipline =>
            judges.map(
                judge =>
                    roles[
                        `${discipline.id}_${
                            this.props.competition.judges[judge.idx].id
                        }`
                    ] || null,
            ),
        );
        return { judges, table };
    }

    render() {
        if (!this.props.config.include_discipline_judges) {
            return null;
        }
        const data = this.getJudgesDisciplines();
        const style = { width: `${(60 / data.judges.length).toFixed(3)}%` };
        return (
            <div className="discipline-judges">
                <h4>
                    <p>{_("admin.headers.discipline_judges")}</p>
                </h4>
                <table className="discipline-judges">
                    <tbody>
                        <tr className="header">
                            <th className="w-40">
                                <p className="text-left">
                                    {_("admin.labels.discipline")}
                                </p>
                            </th>
                            {data.judges.map(judge => (
                                <th key={judge.idx} style={style}>
                                    <p className="text-center">{judge.number}</p>
                                </th>
                            ))}
                        </tr>
                        {data.table.map((row, idx) => {
                            const discipline = this.props.competition.disciplines[idx];
                            return (
                                <tr key={discipline.id}>
                                    <td
                                        className="w-40"
                                        style={{
                                            borderRight: "1pt solid black",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <p className="text-left">{discipline.name}</p>
                                    </td>
                                    {row.map((cell, row_idx) => (
                                        <td key={row_idx} style={style}>
                                            <p className="text-center">
                                                {cell
                                                    ? _(
                                                          `models.discipline_judge.roles.${cell}`,
                                                      )
                                                    : "—"}
                                            </p>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {_("models.discipline_judge.roles_legend")}
            </div>
        );
    }
}
