import React from "react";

import Loader from "common/components/Loader";
import Storage from "common/server/Storage";
import CompetitionSubscription from "common/server/Storage/subscriptions/CompetitionSubscription";
import _ from "l10n";
import PT from "prop-types";
import Judging from "./Judging";
import Management from "./Management";
import NavigationButton from "./NavigationButton";
import Service from "./Service";

export default class AdminPanel extends React.Component {
    static propTypes = {
        competitionId: PT.number.isRequired,
    };

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            activeApp: this.getActiveAppFromHash(),
            competitionStorage: null,
        };
    }

    componentDidMount() {
        this._storage = new Storage();
        this._storage.init(this.reload).then(this.subscribe).catch(console.error.bind(console));
    }

    subscribe = () => {
        this._competition_subscription = new CompetitionSubscription(this.props.competitionId);
        this._storage.subscribe(this._competition_subscription)
            .then(this.updateCompetitionStorage)
            .catch(console.error.bind(console));
    };

    updateCompetitionStorage = (competitionStorage) => {
        this.setState({competitionStorage});
    };
    reload = () => this.forceUpdate();

    // Navigation

    getActiveAppFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[0] && ["judging", "management", "service"].indexOf(chunks[0]) >= 0) {
            return chunks[0];
        }
        return "management";
    }

    // Handlers

    handleAppChange = (app) => {
        this.setState({
            activeApp: app,
        });
        window.location.hash = `#${app}`;
    };

    // Rendering

    renderActiveApp(competition) {
        switch (this.state.activeApp) {
        case "management":
            return (
                <Management competition={ competition } />
            );
        case "judging":
            return (
                <Judging competition={ competition } />
            );
        case "service":
            return (
                <Service competition={ competition } />
            );
        }
    }
    renderButton(mkey, title) {
        return (
            <NavigationButton
                active={ this.state.activeApp === mkey }
                mkey={ mkey }
                title={ title }
                onClick={ this.handleAppChange }
            />
        );
    }
    render() {
        const competition = this.state.competitionStorage?.get("Competition", this.props.competitionId);
        if (!competition) {
            return (
                <Loader />
            );
        }
        return (
            <div className="AdminPanel">
                <div className="header">
                    <div className="caption">
                        { `${competition.name} (${competition.date})` }
                    </div>
                </div>
                <div className="body">
                    <div className="left-col noselect">
                        { this.renderButton("management", "Management") }
                        { this.renderButton("judging", "Judging") }
                        { this.renderButton("service", "Service") }
                        <div className="spacer" />
                        <div className="bottom-cell">
                            <a className="back-button" href="/">
                                { _("admin.buttons.to_start_page") }
                            </a>
                        </div>
                    </div>
                    { this.renderActiveApp(competition) }
                </div>
            </div>
        );
    }
}
