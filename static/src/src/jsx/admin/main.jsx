import { _ } from "l10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Management } from "./management/main";
import { Judging } from "./judging/main";
import { Service } from "./service/main";
import { Loader } from "ui/components";


export class Admin extends React.Component {

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            active_app: this.getActiveAppFromHash(),
            name: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        var SCHEMA = {
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
        this.setState(
            storage.get("Competition")
                .by_id(this.props.competition_id)
                .serialize(SCHEMA));
    }
    loadData() {
        Api("competition.get", {
            competition_id: this.props.competition_id,
            children: {
                clubs: {},
                judges: {},
                plan: {},
                disciplines: {
                    discipline_judges: {
                        judge: {},
                    },
                    tours: {},
                }
            }
        })
        .addToDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }

    // Navigation

    setApp(app) {
        this.setState({
            active_app: app,
        });
        window.location.hash = "#" + app;
    }
    getActiveAppFromHash(app) {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[0] && ["judging", "management", "service"].indexOf(chunks[0]) >= 0) {
            return chunks[0];
        }
        return "management";
    }

    // Rendering

    renderActiveApp() {
        switch (this.state.active_app) {
        case "judging":
            return <Judging
                competition_plan={ this.state.plan }
                disciplines={ this.state.disciplines } />;
        case "management":
            return <Management
                disciplines={ this.state.disciplines }
                clubs={ this.state.clubs }
                judges={ this.state.judges }
                competition_plan={ this.state.plan }
                competition_name={ this.state.name }
                competition_date={ this.state.date }
                competition_id={ this.props.competition_id } />;
        case "service":
            return <Service
                competition_id={ this.props.competition_id }
                disciplines={ this.state.disciplines } />
        }
    }
    render() {
        if (this.state.name === null) {
            return <Loader />;
        }
        return <div className="wrapper">
            <div className="header">
                <div className="caption">
                    { this.state.name } ({this.state.date})
                </div>
            </div>
            <div className="body">
                <div className="left-col noselect">
                    <div className={ "button" + (this.state.active_app === "management" ? " active" : "") } onClick={ this.setApp.bind(this, "management") }>
                        <div className="icon">M</div>
                        <div className="label">Management</div>
                    </div>
                    <div className={ "button" + (this.state.active_app === "judging" ? " active" : "") } onClick={ this.setApp.bind(this, "judging") }>
                        <div className="icon">J</div>
                        <div className="label">Judging</div>
                    </div>
                    <div className={ "button" + (this.state.active_app === "service" ? " active" : "") } onClick={ this.setApp.bind(this, "service") }>
                        <div className="icon">S</div>
                        <div className="label">Service</div>
                    </div>
                    <div className="spacer"></div>
                    <div className="bottom-cell">
                        <a className="btn-back" href="/">
                            { _("admin.buttons.to_start_page") }
                        </a>
                    </div>
                </div>
                { this.renderActiveApp() }
            </div>
        </div>
    }
}
