class DisciplineEditorRow extends React.Component {
    sertialize() {
        return {
            name: this._name.value,
            sp: this._sp.value,
            external_id: this._external_id.value,
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newDiscipline) {
            Api("tournaments.discipline.set", {
                discipline_id: this.props.discipline.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("tournaments.discipline.create", {
                competition_id: this.props.competition_id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        return <tr className={ "editor" + (this.props.newDiscipline ? " create" : "" ) }>
            <td colSpan="5">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="row">
                        <div className="col-md-5">
                            <label className="full-width">
                                { _("models.discipline.name") }
                                <input
                                    ref={ function(e) { if (e) { e.getDOMNode().select(); this._name = e.getDOMNode(); } }.bind(this) }
                                    className="full-width"
                                    defaultValue={ this.props.discipline.name } />
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.discipline.sp") }
                                <input
                                    ref={ (e) => e && (this._sp = e.getDOMNode()) }
                                    className="full-width"
                                    defaultValue={ this.props.discipline.sp } />
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.discipline.external_id") }<br />
                                <input
                                    ref={ (e) => e && (this._external_id = e.getDOMNode()) }
                                    defaultValue={ this.props.discipline.external_id } />
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

class DisciplineRow extends React.Component {
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
        if (confirm(_("admin.confirms.delete_discipline"))) {
            Api("tournaments.discipline.delete", {
                discipline_id: this.props.discipline.id,
            }).send();
        }
    }
    renderEditor() {
        return <DisciplineEditorRow
            newDiscipline={ false }
            stopEditing={ this.stopEditing.bind(this) }
            { ...this.props } />
    }
    renderViewer() {
        let c = this.props.discipline;
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

class DisciplineCreationRow extends React.Component {
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
        return <DisciplineEditorRow
            newDiscipline={ true }
            stopEditing={ this.stopEditing.bind(this) }
            discipline={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="5">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>{ _("admin.buttons.add_discipline") }</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

class DisciplinesManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    renderTable() {
        let rows = this.props.disciplines.map(function(discipline) {
            return <DisciplineRow
                key={ discipline.id }
                discipline={ discipline } />;
        }.bind(this));
        return <div className="manage-disciplines">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="name">{ _("models.discipline.name") }</th>
                        <th className="sp">{ _("models.discipline.sp") }</th>
                        <th className="external-id">{ _("models.discipline.external_id") }</th>
                        <th className="delete"></th>
                    </tr>
                    { rows }
                    <DisciplineCreationRow competition_id={ this.props.competition_id } />
                </tbody>
            </table>
        </div>
    }
    render() {
        return <div>
            <header>
                <h1>{ _("admin.headers.disciplines_management") }</h1>
            </header>
            { this.renderTable() }
        </div>;
    }
}
