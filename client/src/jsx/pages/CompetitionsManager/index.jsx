import React from "react";

import Loader from "common/components/Loader";
import _ from "l10n";
import PT from "prop-types";
import Row from "./Row";
import Storage from "common/server/Storage";
import AllCompetitionsSubscription from "common/server/Storage/subscriptions/AllCompetitionsSubscription";
import UniversalTable from "pages/AdminPanel/Management/UniversalTable";
import EditorRow from "./EditorRow";
import CreationButton from "./CreationButton";
import FieldTypes from "pages/AdminPanel/Management/UniversalTable/FieldTypes";

export default class CompetitionsManager extends UniversalTable {
    static propTypes = {
        rulesSets: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired).isRequired,
    };

    static DISPLAY_COMPONENT = Row;
    static EDITOR_COMPONENT = EditorRow;
    static CREATION_BUTTON_COMPONENT = CreationButton;
    static MODEL_NAME = "Competition";
    static FIELDS = [
        FieldTypes.makeTextField("name"),
        FieldTypes.makeTextField("date"),
        { name: "active", defaultValue: true },
        {
            name: "rules_set",
            defaultValueGetter: context => context.rulesSets[0]?.[0] || "",
        },
        { name: "info", defaultValueGetter: () => [] },
    ];

    state = {
        competitionsStorage: null,
    };

    componentDidMount() {
        this._storage = new Storage();
        this._storage
            .init(this.reload)
            .then(this.subscribe)
            .catch(console.error.bind(console));
    }

    subscribe = () => {
        this._competitions_subscription = new AllCompetitionsSubscription();
        this._storage
            .subscribe(this._competitions_subscription)
            .then(this.updateCompetitionsStorage)
            .catch(console.error.bind(console));
    };

    updateCompetitionsStorage = competitionsStorage => {
        this.setState({ competitionsStorage });
    };

    reload = () => this.forceUpdate();

    getEntries() {
        return this.state.competitionsStorage.getType("Competition");
    }

    renderTable() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="name">{_("models.competition.name")}</th>
                        <th className="date">{_("models.competition.date")}</th>
                        <th className="is-active">{_("models.competition.active")}</th>
                        <th className="delete" />
                    </tr>
                    {this.renderRows()}
                    {this.renderCreationButton()}
                </tbody>
            </table>
        );
    }
    render() {
        if (this.state.competitionsStorage == null) {
            return <Loader />;
        }
        return (
            <div className="CompetitionsManager">
                <header>
                    <h1>{_("admin.headers.competitions_management")}</h1>
                </header>
                <div className="body">{this.renderTable()}</div>
            </div>
        );
    }
}
