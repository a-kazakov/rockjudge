import { Api } from "server/api";
import { Loader } from "ui/components";
import { message_dispatcher } from "server/message_dispatcher";

import keys_storage from "common/keys_storage";

import CompetitionSelector from "./CompetitionSelector";
import RoleSelector from "./RoleSelector";

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionAccesses: null,
            activeCompetitionId: null,
            competitionsNames: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage);
        message_dispatcher.addListener("reload_data", this.loadData);
        message_dispatcher.addListener("access_levels_changed", this.handleAccessLevelsChange);
        message_dispatcher.addListener("competition_list_update", this.loadCompetitionsNames);
        this.loadData();
    }

    loadAccessLevels = () => {
        Api("auth.get_access_levels", {})
            .onSuccess(competitionAccesses => this.setState({ competitionAccesses }))
            .send();
    }
    loadCompetitionsNames = () => {
        Api("competition.get_active_names", {})
            .onSuccess(competitionsNames => this.setState({ competitionsNames }))
            .send();
    }
    loadData = () => {
        this.loadAccessLevels();
        this.loadCompetitionsNames();
    }

    handleAccessLevelsChange = (data) => {
        if (data.client_id === keys_storage.client_id) {
            this.loadAccessLevels();
        }
    }

    handleCompetitionSelect = (activeCompetitionId) => this.setState({ activeCompetitionId });

    renderBody() {
        if (this.state.competitionsNames === null || this.state.competitionAccesses === null)  {
            return (
                <Loader />
            );
        }
        const active_comeptition_id = this.state.activeCompetitionId || (
            this.state.competitionsNames.length === 1
                ? this.state.competitionsNames[0]
                : null
        )
        if (active_comeptition_id === null) {
            return (
                <CompetitionSelector
                    competitionsNames={ this.state.competitionsNames }
                    onSelect={ this.handleCompetitionSelect }
                />
            )
        }
        return (
            <RoleSelector
                accessLevel={ this.state.competitionAccesses[active_comeptition_id] }
                competitionId={ active_comeptition_id }
            />
        );
    }
    render() {
        return (
            <div className="start-screen">
                { this.renderBody() }
            </div>
        );
    }
}

StartPage.displayName = "StartPage";
