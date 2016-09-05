import { _ } from "l10n/loader";
import { CmpChain } from "common/tools";

import StatInfo from "./StatInfo";

export default class SportsmenList extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
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
        };
    }

    render() {
        let sportsmen = StatInfo.getUniqueSportsmen(this.props.participants);
        sportsmen.sort((a, b) => CmpChain()
            .cmp(a.last_name, b.last_name)
            .cmp(a.first_name, b.first_name)
            .cmp(a.gender, b.gender)
            .cmp(a.year_of_birth, b.year_of_birth)
            .end()
        )
        return (
            <table className="bordered-table"><tbody>
                <tr>
                    <th className="w-5">
                        <p>
                            &nbsp;
                        </p>
                    </th>
                    <th className="w-35">
                        <p className="text-left">
                            { _("models.participant.sportsman") }
                        </p>
                    </th>
                    <th className="w-15">
                        <p className="text-center">
                            { _("models.participant.yob") }
                        </p>
                    </th>
                    <th className="w-15">
                        <p className="text-center">
                            { _("models.participant.gender") }
                        </p>
                    </th>
                    <th className="w-15">
                        <p className="text-center">
                            { _("models.participant.substitute_n") }
                        </p>
                    </th>
                    <th className="w-15">
                        <p className="text-center">
                            { _("models.participant.substitute_y") }
                        </p>
                    </th>
                </tr>
                { sportsmen.map((s, idx) =>
                    <tr key={ idx }>
                        <td className="w-5">
                            <p className="text-right">
                                { idx + 1 }
                            </p>
                        </td>
                        <td className="w-35">
                            <p className="text-left">
                                { `${s.last_name} ${s.first_name}` }
                            </p>
                        </td>
                        <td className="w-15">
                            <p className="text-center">
                                { s.year_of_birth }
                            </p>
                        </td>
                        <td className="w-15">
                            <p className="text-center">
                                { s.gender === "F"
                                    ? _("models.participant.gender_f")
                                    : _("models.participant.gender_m")
                                }
                            </p>
                        </td>
                        <td className="w-15">
                            <p className="text-center">
                                { s.p_count }
                            </p>
                        </td>
                        <td className="w-15">
                            <p className="text-center">
                                { s.s_count }
                            </p>
                        </td>
                    </tr>
                ) }
            </tbody></table>
        );
    }
}

SportsmenList.displayName = "AdminPanel_Management_StartList_SportsmenList";
