class CompetitionEditorRow extends React.Component {
    constructor(props) {
        super(props);
        let state = $.extend({}, this.props.competition);
        this.state = state;
        this.latest_added = "base";
    }
    onChange(group, idx, field, type, event) {
        let new_value = field === "active" ? event.target.checked : event.target.value;
        let state = $.extend({}, this.state, true);
        switch (group) {
        case "info":
            state.info[idx][field] = new_value;
            break;
        case "":
            state[field] = new_value;
        }
        this.setState(state);
    }
    addInfoItem() {
        let info = $.extend([], this.state.info);
        let new_idx = info.length;
        info.push(["", ""]);
        this.latest_added = "info" + new_idx;
        this.setState({
            info: info,
        });
    }
    removeInfoItem(idx) {
        let info = $.extend([], this.state.info);
        info.splice(idx, 1);
        this.setState({
            info: info,
        });
    }
    moveInfoItemUp(idx) {
        let info = $.extend([], this.state.info);
        let current = info[idx];
        let upper = info[idx - 1];
        info[idx] = upper;
        info[idx - 1] = current;
        this.setState({
            info: info,
        });
    }
    moveInfoItemDown(idx) {
        this.moveInfoItemUp(idx + 1);
    }
    sertialize() {
        return {
            name: this.state.name,
            date: this.state.date,
            active: this.state.active,
            info: this.state.info,
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newCompetition) {
            Api("competition.set", {
                competition_id: this.state.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("competition.create", {
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        let bti = (this.props.idx || 1000) * 10000;
        let info = this.state.info.map(function(item, idx) {
            return <div className="info-item" key={ idx }>
                <input
                    tabIndex={ bti + 1000 + 10 * idx + 1 }
                    ref={ function(e) {
                        if (e && this.latest_added == "info" + idx.toString()) {
                            e.select();
                            this.latest_added = null;
                        };
                    }.bind(this)}
                    type="text"
                    className="title"
                    placeholder={ _("models.competition.info_item_title") }
                    value={ item[0] }
                    onChange={ this.onChange.bind(this, "info", idx, 0, "any") } />
                <input
                    tabIndex={ bti + 1000 + 10 * idx + 2 }
                    type="text"
                    className="value"
                    placeholder={ _("models.competition.info_item_value") }
                    value={ item[1] }
                    onChange={ this.onChange.bind(this, "info", idx, 1, "any") } />
                <button
                    type="button"
                    className="down btn btn-primary"
                    disabled={ idx === this.state.info.length - 1 }
                    onClick={ this.moveInfoItemDown.bind(this, idx) }>↓</button>
                <button
                    type="button"
                    className="up btn btn-primary"
                    disabled={ idx === 0 }
                    onClick={ this.moveInfoItemUp.bind(this, idx) }>↑</button>
                <button
                    type="button"
                    className="del btn btn-danger"
                    onClick={ this.removeInfoItem.bind(this, idx) }>X</button>
            </div>;
        }.bind(this));
        return <tr className={ "editor" + (this.props.newCompetition ? " create" : "" ) }>
            <td colSpan="4">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="row">
                        <div className="col-md-3 general-info">
                            <label className="full-width">
                                { _("models.competition.name") }
                                <input
                                    tabIndex={ bti + 1}
                                    ref={ function(e) {
                                        if (e && this.latest_added == "base") {
                                            e.select();
                                            this.latest_added = null;
                                        };
                                    }.bind(this)}
                                    className="full-width"
                                    value={ this.state.name }
                                    onChange={ this.onChange.bind(this, "", null, "name", "any") } />
                            </label>
                            <label className="full-width">
                                { _("models.competition.date") }
                                <input
                                    tabIndex={ bti + 2}
                                    className="full-width"
                                    value={ this.state.date }
                                    onChange={ this.onChange.bind(this, "", null, "date", "any") } />
                            </label>
                            <label className="full-width">
                                { _("models.competition.active") }<br />
                                <input
                                    tabIndex={ bti + 3}
                                    type="checkbox"
                                    checked={ this.state.active }
                                    onChange={ this.onChange.bind(this, "", null, "active", "any") } />
                            </label>
                        </div>
                        <div className="col-md-7">
                            <label>{ _("models.competition.info") }</label>
                            { info }
                            <button
                                tabIndex={ bti + 1999}
                                type="button"
                                className="full-width btn btn-sm btn-default"
                                onClick={ this.addInfoItem.bind(this) }>{ _("global.buttons.add") }</button>
                        </div>
                        <div className="col-md-2">
                            <label>&nbsp;</label>
                            <div className="buttons">
                                <button
                                    tabIndex={ bti + 10000}
                                    type="submit"
                                    className="btn btn-primary">{ _("global.buttons.submit") }</button>
                                <button
                                    tabIndex={ bti + 10001}
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
                            </div>
                        </div>
                    </div>
                </form>
            </td>
        </tr>
    }
}

class CompetitionRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }
    startEditing() {
        this.setState({
            editing: true,
        });
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
    }
    onDelete(event) {
        event.stopPropagation();
        swal_confirm(_("admin.confirms.delete_competition"), () => {
            Api("competition.delete", {
                competition_id: this.props.competition.id,
            }).onSuccess(() => swal.close()).send();
        })
    }
    renderEditor() {
        return <CompetitionEditorRow
            newCompetition={ false }
            stopEditing={ this.stopEditing.bind(this) }
            { ...this.props } />
    }
    renderViewer() {
        let p = this.props.competition;
        return <tr className="viewer" onClick={ this.startEditing.bind(this) }>
            <td className="name">{ p.name }</td>
            <td className="date">{ p.date }</td>
            <td className="is-active">{ p.active ? _("global.labels.yes") : _("global.labels.no") }</td>
            <td className="delete">
                <button className="btn btn-danger" onClick={ this.onDelete.bind(this) }>X</button>
            </td>
        </tr>;
    }
    render() {
        if (this.state.editing) {
            return this.renderEditor();
        } else {
            return this.renderViewer();
        }
    }
}

class CompetitionCreationRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }
    startEditing() {
        this.setState({
            editing: true,
        });
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
    }
    renderEditor() {
        let empty_data = {
            "name": "",
            "date": "",
            "active": true,
            "info": [],
        }
        return <CompetitionEditorRow
            newCompetition={ true }
            stopEditing={ this.stopEditing.bind(this) }
            competition={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="5">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>{ _("admin.buttons.add_competition") }</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

class CompetitionsManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competitions: null,
        }
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("competition_list_update", this.loadData.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        let serialized = storage
            .get("Competition")
            .all()
            .map((c) => c.serialize({}))
        this.setState({
            competitions: serialized,
        });
    }
    loadData() {
        Api("competition.get_all", {
            children: {},
        })
        .onSuccess(function(response) {
            storage.del("Competition");
            response.forEach((c) => storage.get("Competition").add(c.id, c.data));
            this.reloadFromStorage();
        }.bind(this))
        .send();
    }
    renderTable() {
        let rows = this.state.competitions.map(function(competition) {
            return <CompetitionRow
                key={ competition.id }
                competition={ competition } />;
        }.bind(this));
        return <div className="manage-competitions">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="name">{ _("models.competition.name") }</th>
                        <th className="date">{ _("models.competition.date") }</th>
                        <th className="is-active">{ _("models.competition.active") }</th>
                        <th className="delete"></th>
                    </tr>
                    { rows }
                    <CompetitionCreationRow
                        discipline_id={ this.props.discipline_id } />
                </tbody>
            </table>
        </div>
    }
    render() {
        if (this.state.competitions === null) {
            return <Loader />
        }
        return <div>
            <header>
                <h1>{ _("admin.headers.competitions_management") }</h1>
            </header>
            { this.renderTable() }
        </div>;
    }
}
