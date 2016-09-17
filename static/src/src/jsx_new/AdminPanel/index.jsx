import _ from "l10n";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";

import NavigationButton from "./NavigationButton";
import Management from "./Management";
import Judging from "./Judging";
import Service from "./Service";

export default class AdminPanel extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
        };
    }

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            activeApp: this.getActiveAppFromHash(),
            competition: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage);
        message_dispatcher.addListener("reload_data", this.loadData);
        this.loadData();
    }

    get SCHEMA() {
        return {
            clients: {},
            clubs: {},
            judges: {},
            plan: {},
            disciplines: {
                discipline_judges: {
                    judge: {},
                },
                tours: {},
            },
        };
    }

    reloadFromStorage = () => {
        const competition = storage.get("Competition")
            .by_id(this.props.competitionId)
            .serialize(this.SCHEMA);
        this.setState({
            competition: competition,
        });
    }
    loadData = () => {
        Api("competition.get", {
            competition_id: this.props.competitionId,
            children: this.SCHEMA,
        })
            .addToDB("Competition", this.props.competitionId)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

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
    }

    // Rendering

    renderActiveApp() {
        switch (this.state.activeApp) {
        case "management":
            return (
                <Management competition={ this.state.competition } />
            );
        case "judging":
            return (
                <Judging competition={ this.state.competition } />
            );
        case "service":
            return (
                <Service competition={ this.state.competition } />
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
        if (this.state.competition === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="wrapper">
                <div className="header">
                    <div className="caption">
                        { `${this.state.competition.name} (${this.state.competition.date})` }
                    </div>
                </div>
                <div className="body">
                    <div className="left-col noselect">
                        { this.renderButton("management", "Management") }
                        { this.renderButton("judging", "Judging") }
                        { this.renderButton("service", "Service") }
                        <div className="spacer" />
                        <div className="bottom-cell">
                            <a className="btn-back" href="/">
                                { _("admin.buttons.to_start_page") }
                            </a>
                        </div>
                    </div>
                    { this.renderActiveApp() }
                </div>
            </div>
        );
    }
}

AdminPanel.displayName = "AdminPanel";
