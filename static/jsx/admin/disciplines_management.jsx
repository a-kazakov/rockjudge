class DisciplineEditorRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discipline_judges: props.discipline.discipline_judges.map(function(dj) {
                return {
                    judge_id: dj.judge.id,
                    role: dj.role,
                };
            }),
        };
    }
    addDisciplineJudge() {
        let discipline_judges = $.extend([], this.state.discipline_judges);
        let new_idx = discipline_judges.length;
        discipline_judges.push({
            judge_id: this.props.judges[0] && this.props.judges[0].id,
            role: GL.judge_roles[0],
        });
        this.latest_added = "j" + new_idx;
        this.setState({
            discipline_judges: discipline_judges,
        });
    }
    removeDisciplineJudge(idx) {
        let discipline_judges = $.extend([], this.state.discipline_judges);
        discipline_judges.splice(idx, 1);
        this.setState({
            discipline_judges: discipline_judges,
        });
    }
    validate() {
        let used_judges = {};
        this.state.discipline_judges.forEach(function(dj) {
            if (used_judges[dj.judge_id]) {
                let judge = this.props.judges.filter((j) => j.id == dj.judge_id)[0];
                throw _("errors.discipline_judge.repeating_judge", judge.name);
            }
            used_judges[dj.judge_id] = true;
        }.bind(this));
    }
    serialize() {
        return {
            name: this._name.value,
            sp: this._sp.value,
            discipline_judges: this.state.discipline_judges.map(function(dj) {
                return {
                    judge_id: parseInt(dj.judge_id),
                    role: dj.role,
                };
            }),
            external_id: this._external_id.value,
        }
    }
    onDisciplineJudgeChange(idx, field, event) {
        let discipline_judges = $.extend([], this.state.discipline_judges);
        discipline_judges[idx][field] = event.target.value;
        this.setState({
            discipline_judges: discipline_judges,
        });
    }
    onSubmit(event) {
        event.preventDefault();
        try {
            this.validate();
            if (!this.props.newDiscipline) {
                Api("discipline.set", {
                    discipline_id: this.props.discipline.id,
                    data: this.serialize(),
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("discipline.create", {
                    competition_id: this.props.competition_id,
                    data: this.serialize(),
                }).onSuccess(this.props.stopEditing).send();
            }
        } catch (ex) {
            showError(ex);
        }
    }
    render() {
        return <tr className={ "editor" + (this.props.newDiscipline ? " create" : "" ) }>
            <td colSpan="5">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="row">
                        <div className="col-lg-4">
                            <label className="full-width">
                                { _("models.discipline.name") }
                                <input
                                    ref={ function(e) { if (e) { this._name = e; } }.bind(this) }
                                    className="full-width"
                                    defaultValue={ this.props.discipline.name } />
                            </label>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label className="full-width">
                                        { _("models.discipline.sp") }
                                        <input
                                            ref={ (e) => e && (this._sp = e) }
                                            className="full-width"
                                            defaultValue={ this.props.discipline.sp } />
                                    </label>
                                </div>
                                <div className="col-lg-6">
                                    <label className="full-width">
                                        { _("models.discipline.external_id") }<br />
                                        <input
                                            ref={ (e) => e && (this._external_id = e) }
                                            className="full-width"
                                            defaultValue={ this.props.discipline.external_id } />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="full-width">
                                { _("models.discipline.discipline_judges") }
                            </label>
                            { this.state.discipline_judges.map((dj, idx) =>
                                <div key={ idx }>
                                    <select value={ dj.judge_id } className="judge" onChange={ this.onDisciplineJudgeChange.bind(this, idx, "judge_id") }>
                                        { this.props.judges.map((j) =>
                                            <option value={ j.id } key={ j.id }>{ j.name }</option>
                                        ) }
                                    </select>
                                    <select value={ dj.role } className="judge-role" onChange={ this.onDisciplineJudgeChange.bind(this, idx, "role") }>
                                        { GL.judge_roles.map((jr) =>
                                            <option value={ jr } key={ jr }>{ _("judge_roles." + jr) }</option>
                                        ) }
                                    </select>
                                    <button
                                        type="button"
                                        className="del btn btn-danger"
                                        onClick={ this.removeDisciplineJudge.bind(this, idx) }>X</button>
                                </div>
                            ) }
                            <button
                                type="button"
                                className="full-width btn btn-sm btn-default"
                                onClick={ this.addDisciplineJudge.bind(this) }>{ _("global.buttons.add") }</button>
                        </div>
                        <div className="col-lg-2">
                            <label>&nbsp;</label>
                            <div className="buttons">
                                <button
                                    type="submit"
                                    className="btn btn-primary">{ _("global.buttons.submit") }</button>
                                <br />
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
        swal_confirm(_("admin.confirms.delete_discipline"), () => {
            Api("discipline.delete", {
                discipline_id: this.props.discipline.id,
            }).onSuccess(() => swal.close()).send();
        });
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
            "discipline_judges": [],
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
                judges={ this.props.judges }
                discipline={ discipline }
                all_disciplines={ this.props.disciplines } />;
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
                    <DisciplineCreationRow
                        judges={ this.props.judges }
                        competition_id={ this.props.competition_id } />
                </tbody>
            </table>
        </div>
    }
    render() {
        return <div className="app-content">
            <header className="app-header">
                <h1>{ _("admin.headers.disciplines_management") }</h1>
            </header>
            <div className="app-body">
                { this.renderTable() }
            </div>
        </div>;
    }
}
