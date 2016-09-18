import _ from "l10n";

export default class Info extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                name: PT.string.isRequired,
                date: PT.string.isRequired,
                info: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired).isRequired,
            }).isRequired,
            config: PT.shape({
                include_extended_info: PT.bool.isRequired,
            }).isRequired,
        };
    }
    renderExtendedInfo() {
        if (!this.props.config.include_extended_info) {
            return null;
        }
        return this.props.competition.info.map((row, idx) =>
            <tr key={ idx }>
                <th className="w-40">
                    <p className="text-left">
                        { row[0] }
                    </p>
                </th>
                <td className="w-60">
                    <p>
                        { row[1] }
                    </p>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <table className="info"><tbody>
                <tr>
                    <th className="w-40">
                        <p className="text-left">
                            { _("admin.labels.competition_name") }
                        </p>
                    </th>
                    <td className="w-60">
                        <p>
                            <strong>
                                { this.props.competition.name }
                            </strong>
                        </p>
                    </td>
                </tr>
                <tr>
                    <th className="w-40">
                        <p className="text-left">
                            { _("admin.labels.competition_date") }
                        </p>
                    </th>
                    <td className="w-60">
                        <p>
                            <strong>
                                { this.props.competition.date }
                            </strong>
                        </p>
                    </td>
                </tr>
                { this.renderExtendedInfo() }
            </tbody></table>
        );
    }
}

Info.displayName = "AdminPanel_Management_CompetitionReport_Info";
