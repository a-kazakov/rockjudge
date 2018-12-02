import React from "react";

import Loader from "common/components/Loader";
import Model from "common/server/Storage/models/Model";
import CompetitionSubscription from "common/server/Storage/subscriptions/CompetitionSubscription";
import PT from "prop-types";
import AccessRequest from "./AccessRequest";
import NoAccess from "./NoAccess";
import Presenter from "./Presenter";
import SingleJudge from "./SingleJudge";
import UniversalSelector from "./UniversalSelector";


export default class RoleSelector extends React.Component {
    static propTypes = {
        auth: PT.instanceOf(Model),
        competition: PT.instanceOf(Model).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            competitionStorage: null,
        };
    }

    componentDidMount() {
        if (this.has_access) {
            this.subscribe();
        }
    }
    componentDidUpdate() {
        if (!this._subscription && this.has_access) {
            this.subscribe();
        }
    }

    subscribe = () => {
        this._subscription = new CompetitionSubscription(this.props.competition.id);
        this.props.competition.global_storage.subscribe(this._subscription).then(this.updateCompetitionStorage);
    };

    updateCompetitionStorage = (competitionStorage) => {
        this.setState({competitionStorage});
    };

    get has_access() {
        if (window.location.hostname === "127.0.0.1") {
            return true;
        }
        return this.props.auth && this.props.auth.access_level !== "none";
    }

    renderBody() {
        if (window.location.hostname !== "127.0.0.1") {
            if (!this.props.auth) {
                return (
                    <AccessRequest
                        competitionId={ this.props.competition.id }
                    />
                );
            }
            if (this.props.auth.access_level === "none") {
                return (
                    <NoAccess />
                );
            }
        }
        if (this.state.competitionStorage == null) {
            return (
                <Loader />
            );
        }
        const competition = this.state.competitionStorage.get("Competition", this.props.competition.id);
        if (window.location.hostname === "127.0.0.1" || this.props.auth.access_level === "admin") {
            return (
                <UniversalSelector
                    showAdmin
                    competition={ competition }
                />
            );
        }
        if (this.props.auth.access_level === "any_judge") {
            return (
                <UniversalSelector
                    competition={ competition }
                />
            );
        }
        if (this.props.auth.access_level === "judge") {
            return (
                <SingleJudge
                    judge={ competition.global_storage.get("Judge", this.props.auth.judge_id) }
                />
            );
        }
        if (this.props.auth.access_level === "presenter") {
            return (
                <Presenter
                    competition={ competition }
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
