class JudgeEditorRow extends React.Component {
    sertialize() {
        return {
            name: this._name.value,
            number: this._number.value,
            category: this._category.value,
            role_description: this._role_description.value,
            sp: this._sp.value,
            external_id: this._external_id.value,
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newJudge) {
            Api("judge.set", {
                judge_id: this.props.judge.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("judge.create", {
                competition_id: this.props.competition_id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        return <tr className={ "editor" + (this.props.newJudge ? " create" : "" ) }>
            <td colSpan="5">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="row">
                        <div className="col-lg-1">
                            <label className="full-width">
                                { _("models.judge.number") }
                                <input
                                    ref={ function(e) { if (e) { e.getDOMNode().select(); this._number = e.getDOMNode(); } }.bind(this) }
                                    className="full-width"
                                    defaultValue={ this.props.judge.number } />
                            </label>
                        </div>
                        <div className="col-lg-1">
                            <label className="full-width">
                                { _("models.judge.category") }
                                <input
                                    ref={ (e) => e && (this._category = e.getDOMNode()) }
                                    className="full-width"
                                    defaultValue={ this.props.judge.category } />
                            </label>
                        </div>
                        <div className="col-lg-3">
                            <label className="full-width">
                                { _("models.judge.name") }
                                <input
                                    ref={ (e) => e && (this._name = e.getDOMNode()) }
                                    className="full-width"
                                    defaultValue={ this.props.judge.name } />
                            </label>
                        </div>
                        <div className="col-lg-3">
                            <label className="full-width">
                                { _("models.judge.role_description") }
                                <input
                                    ref={ (e) => e && (this._role_description = e.getDOMNode()) }
                                    className="full-width"
                                    defaultValue={ this.props.judge.role_description } />
                            </label>
                        </div>
                        <div className="col-lg-1">
                            <label className="full-width">
                                { _("models.judge.external_id") }
                                <input
                                    ref={ (e) => e && (this._external_id = e.getDOMNode()) }
                                    className="full-width"
                                    defaultValue={ this.props.judge.external_id } />
                            </label>
                        </div>
                        <div className="col-lg-1">
                            <label className="full-width">
                                { _("models.judge.sp") }
                                <input
                                    ref={ (e) => e && (this._sp = e.getDOMNode()) }
                                    className="full-width"
                                    defaultValue={ this.props.judge.sp } />
                            </label>
                        </div>
                        <div className="col-lg-2">
                            <div className="buttons">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary">{ _("global.buttons.submit") }</button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
                            </div>
                        </div>
                    </div>
                </form>
            </td>
        </tr>
    }
}

class JudgeRow extends React.Component {
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
        if (confirm(_("admin.confirms.delete_judge"))) {
            Api("judge.delete", {
                judge_id: this.props.judge.id,
            }).send();
        }
    }
    renderEditor() {
        return <JudgeEditorRow
            newJudge={ false }
            stopEditing={ this.stopEditing.bind(this) }
            { ...this.props } />
    }
    renderViewer() {
        let j = this.props.judge;
        return <tr className="viewer" onClick={ this.startEditing.bind(this) }>
            <td className="role-description">{ j.role_description || _("global.phrases.judge_n", j.number) }</td>
            <td className="name">{ j.name }</td>
            <td className="category">{ j.category }</td>
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

class JudgeCreationRow extends React.Component {
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
            "number": "",
            "role_description": "",
            "category": "",
        }
        return <JudgeEditorRow
            newJudge={ true }
            stopEditing={ this.stopEditing.bind(this) }
            judge={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="5">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>{ _("admin.buttons.add_judge") }</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

class JudgesManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    renderTable() {
        let rows = this.props.judges.map(function(judge) {
            return <JudgeRow
                key={ judge.id }
                judge={ judge } />;
        }.bind(this));
        return <div className="manage-judges">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="role_description">{ _("models.judge.role_description") }</th>
                        <th className="name">{ _("models.judge.name") }</th>
                        <th className="category">{ _("models.judge.category") }</th>
                        <th className="delete"></th>
                    </tr>
                    { rows }
                    <JudgeCreationRow competition_id={ this.props.competition_id } />
                </tbody>
            </table>
        </div>
    }
    render() {
        return <div>
            <header>
                <h1>{ _("admin.headers.judges_management") }</h1>
            </header>
            { this.renderTable() }
        </div>;
    }
}
