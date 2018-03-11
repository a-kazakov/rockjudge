import _ from "l10n";
import Api from "common/server/Api";
import websocket from "common/server/websocket";
import storage from "common/server/storage";

import Loader from "common/components/Loader";

import Row from "./Row";
import CreationRow from "./CreationRow";

export default class CompetitionsManager extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            rulesSets: PT.arrayOf(
                PT.arrayOf(
                    PT.string.isRequired,
                ).isRequired,
            ).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            competitions: null,
        };
        websocket.addListener("db_update", this.reloadFromStorage);
        websocket.addListener("competition_list_update", this.loadData);
        websocket.addListener("reload_data", this.loadData);
        this.loadData();
    }
    reloadFromStorage = () => {
        const serialized = storage.get("Competition").all().map(c => c.serialize({}));
        this.setState({
            competitions: serialized,
        });
    };
    loadData = () => {
        Api("competition.get_all", {
            children: {},
        })
            .onSuccess(response => {
                storage.del("Competition");
                for (const competition of response) {
                    storage.addModel("Competition", competition.id, competition.data, {});
                }
                this.reloadFromStorage();
            })
            .send();
    };

    renderTable() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="name">
                            { _("models.competition.name") }
                        </th>
                        <th className="date">
                            { _("models.competition.date") }
                        </th>
                        <th className="is-active">
                            { _("models.competition.active") }
                        </th>
                        <th className="delete" />
                    </tr>
                    { this.state.competitions.map((competition, idx) =>
                        <Row
                            competition={ competition }
                            idx={ idx }
                            key={ competition.id }
                            rulesSets={ this.props.rulesSets }
                        />
                    ) }
                    <CreationRow
                        rulesSets={ this.props.rulesSets }
                    />
                </tbody>
            </table>
        );
    }
    render() {
        if (this.state.competitions === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="CompetitionsManager">
                <header>
                    <h1>
                        { _("admin.headers.competitions_management") }
                    </h1>
                </header>
                <div className="body">
                    { this.renderTable() }
                </div>
            </div>
        );
    }
}

CompetitionsManager.displayName = "CompetitionsManager";
