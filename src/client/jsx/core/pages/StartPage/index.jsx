import React from "react";

import Loader from "common/components/Loader";
import keys_storage from "common/keys_storage";
import Storage from "common/server/Storage";
import AllCompetitionsSubscription from "common/server/Storage/subscriptions/AllCompetitionsSubscription";
import ClientSubscription from "common/server/Storage/subscriptions/ClientSubscription";
import _ from "l10n";
import CompetitionSelector from "./CompetitionSelector";
import RoleSelector from "./RoleSelector";
import SafeTimeout from "common/SafeTimeout";
import { consoleError } from "common/logging";

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCompetitionId: null,
            competitionsStorage: null,
            clientStorage: null,
        };
    }

    componentDidMount() {
        this._storage = new Storage();
        this._storage
            .init(this.reload)
            .then(this.subscribe)
            .catch(consoleError);
    }
    componentWillUnmount() {
        this.st.clear();
    }
    st = new SafeTimeout();

    subscribe = () => {
        this._competitions_subscription = new AllCompetitionsSubscription();
        this._storage
            .subscribe(this._competitions_subscription)
            .then(this.updateCompetitionsStorage)
            .catch(consoleError);
        this.trySubscribeClient();
    };
    trySubscribeClient = () => {
        const client_id = keys_storage.client_id;
        if (client_id == null) {
            this.st.setTimeout(this.trySubscribeClient, 100);
            return;
        }
        this._client_subscription = new ClientSubscription(client_id);
        this._storage
            .subscribe(this._client_subscription)
            .then(this.updateClientStorage);
    };

    updateCompetitionsStorage = competitionsStorage => {
        this.setState({ competitionsStorage });
    };
    updateClientStorage = clientStorage => {
        this.setState({ clientStorage });
    };
    reload = () => this.forceUpdate();

    handleCompetitionSelect = activeCompetitionId =>
        this.setState({ activeCompetitionId });

    renderBody() {
        if (
            this.state.competitionsStorage == null ||
            this.state.clientStorage == null
        ) {
            return <Loader />;
        }
        const competitions = this.state.competitionsStorage
            .getType("Competition")
            .filter(c => c.active);
        const active_competition = this.state.activeCompetitionId
            ? this.state.competitionsStorage.get(
                  "Competition",
                  this.state.activeCompetitionId,
              )
            : competitions.length === 1
            ? competitions[0]
            : null;
        if (active_competition == null) {
            return (
                <CompetitionSelector
                    clientStorage={this.state.clientStorage}
                    competitions={competitions}
                    onSelect={this.handleCompetitionSelect}
                />
            );
        }
        const auth = this.state.clientStorage
            .getType("ClientAuth")
            .find(a => a.competition_id === active_competition.id);
        return <RoleSelector auth={auth} competition={active_competition} />;
    }
    render() {
        return (
            <div className="StartPage">
                {this.renderBody()}
                <div className="client-id">
                    {_("start_page.messages.client_id", keys_storage.client_id)}
                </div>
            </div>
        );
    }
}
