import React from "react";

import PT from "prop-types";
import _ from "l10n";

export default class StatInfo extends React.Component {
    static propTypes = {
        label: PT.string,
        participants: PT.arrayOf(
            PT.shape({
                sportsmen: PT.arrayOf(
                    PT.shape({
                        last_name: PT.string.isRequired,
                        first_name: PT.string.isRequired,
                        year_of_birth: PT.number.isRequired,
                        gender: PT.oneOf(["M", "F"]).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
        ).isRequired,
        tableRow: PT.bool,
    };
    static get defaultProps() {
        return {
            tableRow: false,
        };
    }

    static hashSportsman(s) {
        return `${s.last_name}\n${s.first_name}\n${s.year_of_birth}\n${s.gender}`;
    }
    static getUniqueSportsmen(participants) {
        let found = new Map();
        for (const p of participants) {
            for (const s of p.sportsmen) {
                const hash = StatInfo.hashSportsman(s);
                if (!found.has(hash)) {
                    found.set(hash, {
                        sportsman: s,
                        s_count: 0,
                        p_count: 0,
                    });
                }
                if (s.substitute) {
                    ++found.get(hash).s_count;
                } else {
                    ++found.get(hash).p_count;
                }
            }
        }
        return Array.from(found.values());
    }
    static countSportsmen(participants) {
        const sportsmen = StatInfo.getUniqueSportsmen(participants);
        return {
            total: sportsmen.length,
            substitute_only: sportsmen.filter(s => s.p_count === 0).length,
        };
    }

    render() {
        const sp_count = StatInfo.countSportsmen(this.props.participants);
        const p_count = sp_count.total - sp_count.substitute_only;
        const s_count = sp_count.substitute_only;
        const pt_count = this.props.participants.reduce(
            (acc, part) => acc + part.sportsmen.length,
            0,
        );
        if (this.props.tableRow) {
            return (
                <tr>
                    <td
                        className="w-45"
                        style={{ borderRight: "1pt solid black", fontWeight: "bold" }}
                    >
                        <p className="text-left">{this.props.label}</p>
                    </td>
                    <td className="w-15">
                        <p className="text-left">
                            {_(
                                "admin.phrases.n_participants",
                                this.props.participants.length,
                            )}
                        </p>
                    </td>
                    <td className="w-15">
                        <p className="text-left">
                            {_("admin.phrases.n_participations", pt_count)}
                        </p>
                    </td>
                    <td className="w-25">
                        <p className="text-left">
                            {_("admin.phrases.n_sportsmen_short", p_count, s_count)}
                        </p>
                    </td>
                </tr>
            );
        }
        const n_participants_str = _(
            "admin.phrases.total_n_participants",
            this.props.participants.length,
        );
        const n_sportsmen_str = _("admin.phrases.n_sportsmen", p_count, s_count);
        const n_participations_str = _("admin.phrases.n_participations", pt_count);
        return (
            <p className="text-right">
                <strong>
                    {`${n_participants_str}, ${n_participations_str}, ${n_sportsmen_str}`}
                </strong>
            </p>
        );
    }
}
