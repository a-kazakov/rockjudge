import _ from "l10n";

export default class StatInfo extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            label: PT.string,
            participants: PT.arrayOf(
                PT.shape({
                    sportsmen: PT.arrayOf(
                        PT.shape({
                            last_name: PT.string.isRequired,
                            first_name: PT.string.isRequired,
                            year_of_birth: PT.number.isRequired,
                            gender: PT.oneOf(["M", "F"]).isRequired,
                        }).isRequired
                    ).isRequired,
                }).isRequired
            ).isRequired,
            tableRow: PT.bool,
        };
    }
    static get defaultProps() {
        return {
            tableRow: false,
        };
    }

    static hashSportsman(s) {
        return `${s.last_name}\n${s.first_name}\n${s.year_of_birth}\n${s.gender}`;
    }
    static getUniqueSportsmen(participants) {
        let found = {};
        for (const p of participants) {
            for (const s of p.sportsmen) {
                let hash = StatInfo.hashSportsman(s);
                if (!found[hash]) {
                    found[hash] = Object.assign({}, s);
                    found[hash].s_count = 0;
                    found[hash].p_count = 0;
                }
                if (s.substitute) {
                    ++found[hash].s_count;
                } else {
                    ++found[hash].p_count;
                }
            }
        }
        return Object.keys(found).map(key => found[key]);
    }
    static countSportsmen(participants) {
        let sportsmen = StatInfo.getUniqueSportsmen(participants);
        return {
            total: sportsmen.length,
            substitute_only: sportsmen.filter(s => s.p_count === 0).length,
        }
    }

    render() {
        const sp_count = StatInfo.countSportsmen(this.props.participants);
        const p_count = sp_count.total - sp_count.substitute_only;
        const s_count = sp_count.substitute_only;
        const pt_count = this.props.participants.reduce((acc, part) => acc + part.sportsmen.length, 0);
        if (this.props.tableRow) {
            return (
                <tr>
                    <th className="w-45">
                        <p className="text-left">
                            { this.props.label }
                        </p>
                    </th>
                    <td className="w-15">
                        <p className="text-left">
                            { _("admin.phrases.n_participants", this.props.participants.length) }
                        </p>
                    </td>
                    <td className="w-15">
                        <p className="text-left">
                            { _("admin.phrases.n_participations", pt_count) }
                        </p>
                    </td>
                    <td className="w-25">
                        <p className="text-left">
                            { _("admin.phrases.n_sportsmen_short", p_count, s_count) }
                        </p>
                    </td>
                </tr>
            );
        }
        const n_participants_str = _("admin.phrases.total_n_participants", this.props.participants.length);
        const n_sportsmen_str = _("admin.phrases.n_sportsmen", p_count, s_count);
        const n_participations_str = _("admin.phrases.n_participations", pt_count);
        return (
            <p className="text-right">
                <strong>
                    { `${n_participants_str}, ${n_participations_str}, ${n_sportsmen_str}` }
                </strong>
            </p>
        );
    }
}

StatInfo.displayName = "AdminPanel_Management_StartList_StatInfo";
