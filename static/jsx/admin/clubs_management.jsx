class ClubEditorRow extends React.Component {
    sertialize() {
        return {
            name: this._name.value,
            city: this._city.value,
            external_id: this._external_id.value,
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newClub) {
            Api("club.set", {
                club_id: this.props.club.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("club.create", {
                competition_id: this.props.competition_id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        return <tr className={ "editor" + (this.props.newClub ? " create" : "" ) }>
            <td colSpan="4">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="rows">
                        <div className="col-md-5">
                            <label className="full-width">
                                { _("models.club.name") }
                                <input
                                    ref={ function(e) { if (e) { e.select(); this._name = e; } }.bind(this) }
                                    className="full-width"
                                    defaultValue={ this.props.club.name } />
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.club.city") }
                                <input
                                    ref={ (e) => e && (this._city = e) }
                                    className="full-width"
                                    defaultValue={ this.props.club.city } />
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.club.external_id") }<br />
                                <input
                                    ref={ (e) => e && (this._external_id = e) }
                                    defaultValue={ this.props.club.external_id } />
                            </label>
                        </div>
                        <div className="col-md-3">
                            <div className="buttons">
                                <button
                                    type="submit"
                                    className="btn btn-primary">{ _("global.buttons.submit") }</button>
                                <button
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

class ClubRow extends React.Component {
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
        swal_confirm(_("admin.confirms.delete_club"), () => {
            Api("club.delete", {
                club_id: this.props.club.id,
            }).onSuccess(() => swal.close()).send();
        });
    }
    renderEditor() {
        return <ClubEditorRow
            newClub={ false }
            stopEditing={ this.stopEditing.bind(this) }
            { ...this.props } />
    }
    renderViewer() {
        let c = this.props.club;
        return <tr className="viewer" onClick={ this.startEditing.bind(this) }>
            <td className="name">{ c.name }</td>
            <td className="city">{ c.city }</td>
            <td className="external-id">{ c.external_id }</td>
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

class ClubCreationRow extends React.Component {
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
            "city": "",
            "external_id": "",
        }
        return <ClubEditorRow
            newClub={ true }
            stopEditing={ this.stopEditing.bind(this) }
            club={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="4">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>{ _("admin.buttons.add_club") }</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

class ClubsManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    renderTable() {
        let rows = this.props.clubs.map(function(club) {
            return <ClubRow
                key={ club.id }
                club={ club } />;
        }.bind(this));
        return <div className="manage-clubs">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="name">{ _("models.club.name") }</th>
                        <th className="city">{ _("models.club.city") }</th>
                        <th className="external-id">{ _("models.club.external_id") }</th>
                        <th className="delete"></th>
                    </tr>
                    { rows }
                    <ClubCreationRow competition_id={ this.props.competition_id } />
                </tbody>
            </table>
        </div>
    }
    render() {
        return <div className="app-content">
            <header className="app-header">
                <h1>{ _("admin.headers.clubs_management") }</h1>
            </header>
            <div className="app-body">
                { this.renderTable() }
            </div>
        </div>;
    }
}
