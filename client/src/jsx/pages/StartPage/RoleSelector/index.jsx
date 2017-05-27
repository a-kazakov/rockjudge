import Loader from "common/components/Loader";
import LoadingComponent from "common/server/LoadingComponent";

import AccessRequest from "./AccessRequest";
import NoAccess from "./NoAccess";
import Presenter from "./Presenter";
import SingleJudge from "./SingleJudge";
import UniversalSelector from "./UniversalSelector";


export default class RoleSelector extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            accessLevel: PT.string,
            competition: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
        };
    }

    CLASS_ID = "start_page_role_selector";
    API_MODELS = {
        competition: {
            model_type: "Competition",
            model_id_getter: props => props.competition.id,
            schema: {
                judges: {
                    discipline_judges: {},
                },
            }
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            competition: null,
        };
    }

    get has_access() {
        if (window.location.hostname === "127.0.0.1") {
            return true;
        }
        return this.props.accessLevel && this.props.accessLevel !== "none";
    }

    reloadFromStorage = () => {
        if (!this.has_access) {
            return
        }
        const serialized = this.storage.get("Competition")
            .by_id(this.props.competition.id)
            .serialize(this.SCHEMA);
        this.setState({
            competition: serialized,
        });
    }
    loadData = () => {
        if (!this.has_access) {
            return
        }
        Api("competition.get", {
            competition_id: this.props.competition.id,
            children: this.SCHEMA,
        })
            .addToDB("Competition", this.props.competition.id, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    renderBody() {
        if (window.location.hostname !== "127.0.0.1") {
            if (!this.props.accessLevel) {
                return (
                    <AccessRequest
                        competitionId={ this.props.competition.id }
                    />
                );
            }
            if (this.props.accessLevel === "none") {
                return (
                    <NoAccess />
                );
            }
        }
        if (this.state.competition === null) {
            return (
                <Loader />
            );
        }
        if (window.location.hostname === "127.0.0.1" || this.props.accessLevel === "admin") {
            return (
                <UniversalSelector
                    showAdmin
                    competition={ this.state.competition }
                />
            );
        }
        if (this.props.accessLevel === "any_judge") {
            return (
                <UniversalSelector
                    competition={ this.state.competition }
                />
            );
        }
        if (this.props.accessLevel.startsWith("judge_")) {
            return (
                <SingleJudge
                    accessLevel={ this.props.accessLevel }
                    competition={ this.state.competition }
                />
            );
        }
        if (this.props.accessLevel === "presenter") {
            return (
                <Presenter
                    competition={ this.state.competition }
                />
            );
        }
        return (
            <h3>Not implemented</h3>
        );
    }
    render() {
        return (
            <div className="RoleSelector">
                <header>
                    <h1>
                        { this.props.competition.name }
                    </h1>
                </header>
                <div className="body">
                    { this.renderBody() }
                </div>
            </div>
        );
    }
}

RoleSelector.displayName = "StartPage_RoleSelector";
