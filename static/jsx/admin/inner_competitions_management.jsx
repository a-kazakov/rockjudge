class InnerCompetitionEditorRow extends React.Component {
    sertialize() {
        return {
            name: this._name.value,
            sp: this._sp.value,
            external_id: this._external_id.value,
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newInnerCompetition) {
            Api("tournaments.inner_competition.set", {
                inner_competition_id: this.props.inner_competition.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("tournaments.inner_competition.create", {
                competition_id: this.props.competition_id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        return <tr className={ "editor" + (this.props.newInnerCompetition ? " create" : "" ) }>
            <td colSpan="5">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="row">
                        <div className="col-md-5">
                            <label className="full-width">
                                { _("models.inner_competition.name") }
                                <input
                                    ref={ function(e) { if (e) { e.getDOMNode().select(); this._name = e.getDOMNode(); } }.bind(this) }
                                    className="full-width"
                                    defaultValue={ this.props.inner_competition.name } />
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.inner_competition.sp") }
                                <input
                                    ref={ (e) => e && (this._sp = e.getDOMNode()) }
                                    className="full-width"
                                    defaultValue={ this.props.inner_competition.sp } />
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.inner_competition.external_id") }<br />
                                <input
                                    ref={ (e) => e && (this._external_id = e.getDOMNode()) }
                                    defaultValue={ this.props.inner_competition.external_id } />
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

class InnerCompetitionRow extends React.Component {
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
        if (confirm(_("admin.confirms.delete_inner_competition"))) {
            Api("tournaments.inner_competition.delete", {
                inner_competition_id: this.props.inner_competition.id,
            }).send();
        }
    }
    renderEditor() {
        return <InnerCompetitionEditorRow
            newInnerCompetition={ false }
            stopEditing={ this.stopEditing.bind(this) }
            { ...this.props } />
    }
    renderViewer() {
        let c = this.props.inner_competition;
        return <tr className="viewer" onClick={ this.startEditing.bind(this) }>
            <td className="name">{ c.name }</td>
            <td className="sp">{ c.sp }</td>
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

class InnerCompetitionCreationRow extends React.Component {
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
            "sp": "0",
            "external_id": "",
        }
        return <InnerCompetitionEditorRow
            newInnerCompetition={ true }
            stopEditing={ this.stopEditing.bind(this) }
            inner_competition={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="5">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>{ _("admin.buttons.add_inner_competition") }</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

class InnerCompetitionsManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    renderTable() {
        let rows = this.props.inner_competitions.map(function(inner_competition) {
            return <InnerCompetitionRow
                key={ inner_competition.id }
                inner_competition={ inner_competition } />;
        }.bind(this));
        return <div className="manage-inner-competitions">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="name">{ _("models.inner_competition.name") }</th>
                        <th className="sp">{ _("models.inner_competition.sp") }</th>
                        <th className="external-id">{ _("models.inner_competition.external_id") }</th>
                        <th className="delete"></th>
                    </tr>
                    { rows }
                    <InnerCompetitionCreationRow competition_id={ this.props.competition_id } />
                </tbody>
            </table>
        </div>
    }
    render() {
        return <div>
            <header>
                <h1>{ _("admin.headers.inner_competitions_management") }</h1>
            </header>
            { this.renderTable() }
        </div>;
    }
}
