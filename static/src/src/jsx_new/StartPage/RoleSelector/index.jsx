import { Api } from "server/api";
import { Loader } from "ui/components";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";

import AccessRequest from "./AccessRequest";
import NoAccess from "./NoAccess";
import Presenter from "./Presenter";
import SingleJudge from "./SingleJudge";
import UniversalSelector from "./UniversalSelector";

export default class RoleSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            accessLevel: PT.string,
            competitionId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            competition: null,
        };
    }

    componentWillMount() {
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.competitionId !== next_props.competitionId) {
            this.setState({
                competition: null,
            });
            this.freeStorage(this.props.competitionId);
            this.setupStorage(next_props.competitionId);
        }
    }
    componentDidUpdate(prev_props) {
        if (
            prev_props.competitionId !== this.props.competitionId &&
            (
                window.location.hostname === "127.0.0.1" ||
                (prev_props.accessLevel && prev_props.accessLevel !== "none")
            )
        ) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
            judges: {
                discipline_judges: {},
            },
        };
    }

    setupStorage(competition_id=null) {
        if (competition_id === null) {
            competition_id = this.props.competitionId;
        }
        this.storage = storage.getDomain(`heats_${competition_id}`);
    }
    freeStorage(competition_id=null) {
        if (competition_id === null) {
            competition_id = this.props.competitionId;
        }
        storage.delDomain(`heats_${competition_id}`);
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
            .by_id(this.props.competitionId)
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
            competition_id: this.props.competitionId,
            children: this.SCHEMA,
        })
            .addToDB("Competition", this.props.competitionId, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    render() {
        if (window.location.hostname !== "127.0.0.1") {
            if (!this.props.accessLevel) {
                return (
                    <AccessRequest
                        competitionId={ this.props.competitionId }
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
}

RoleSelector.displayName = "StartPage_RoleSelector";
