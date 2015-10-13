class JudgeInputForm extends React.Component {
    render() {
        var classes = ["judge", "form-horizontal"].concat(this.props.classes || []).join(" ");
        var judge = this.props.judge || { id: "new" }
        return <form className={ classes } key={ judge.id } onSubmit={ this.submitJudge.bind(this) }>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">{ _("models.judge.name") }</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="name"
                                defaultValue={ judge.name } />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">{ _("models.judge.role") }</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="role"
                                defaultValue={ judge.role }  />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">{ _("models.judge.category") }</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="category"
                                defaultValue={ judge.category } />
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">{ _("models.judge.number") }</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                ref="number"
                                defaultValue={ judge.number } />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group form-group-sm">
                        <label className="col-sm-4 control-label">{ _("models.judge.hide_from_results") }</label>
                        <div className="col-sm-8">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        ref="hide_from_results"
                                        defaultChecked={ judge.hide_from_results } />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <div className="col-sm-offset-4 col-sm-8">
                            <button className="btn btn-primary btn-sm" type="submit">{ _("global.buttons.submit") }</button>&nbsp;
                            <button className="btn btn-primary btn-sm" type="button" onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>;
    }
    submitJudge(event) {
        event.preventDefault();
        this.props.submitJudge(this.serialize());
    }
    serialize() {
        return {
            name: this.refs.name.getDOMNode().value,
            role: this.refs.role.getDOMNode().value,
            category: this.refs.category.getDOMNode().value,
            number: this.refs.number.getDOMNode().value,
            hide_from_results: this.refs.hide_from_results.getDOMNode().checked,
        };
    }
}

class JudgeEditingUI extends React.Component {
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
        return <JudgeInputForm
            judge={ this.props.judge }
            submitJudge={ this.submitJudge.bind(this) }
            stopEditing={ this.stopEditing.bind(this) } />
    }
    renderViewer() {
        return <div className="judge" key={ this.props.judge.id }>
            <h3>{ this.props.judge.name }</h3>
            <div className="row">
                <div className="col-md-5">
                    <p><strong>{ _("models.judge.category") }:</strong> {this.props.judge.category } </p>
                    <p><strong>{ _("models.judge.role") }:</strong> {this.props.judge.role } </p>
                </div>
                <div className="col-md-5">
                    <p><strong>{ _("models.judge.number") }:</strong> {this.props.judge.number } </p>
                    <p><strong>{ _("models.judge.hide_from_results") }:</strong> { this.props.judge.hide_from_results ? _("global.labels.yes") : _("global.labels.no") } </p>
                </div>
                <div className="col-md-2">
                    <button className="full-width btn btn-primary btn-sm" onClick={ this.startEditing.bind(this) }>{ _("global.buttons.edit") }</button><br />
                    <button className="full-width btn btn-danger btn-sm" onClick={ this.deleteJudge.bind(this) }>{ _("global.buttons.delete") }</button>
                </div>
            </div>
        </div>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderViewer();
    }
    submitJudge(data) {
        Api("tournaments.judge.set", {
            judge_id: this.props.judge.id,
            data: data,
        }).onSuccess(function(response) {
            this.stopEditing();
        }.bind(this)).send();
    }
    deleteJudge() {
        if (!confirm(_("admin.confirms.delete_judge"))) {
            return false;
        }
        Api("tournaments.judge.delete", { judge_id: this.props.judge.id }).send();
    }
}

class JudgeCreatingUI extends React.Component {
    render() {
        return <JudgeInputForm
            classes={ ["judge-create"] }
            submitJudge={ this.submitJudge.bind(this) }
            stopEditing={ this.props.stopEditing } />

    }
    submitJudge(data) {
        Api("tournaments.judge.create", {
            competition_id: this.props.competition_id,
            data: data,
        }).onSuccess(function(response) {
            this.props.stopEditing();
        }.bind(this)).send();
    }
}

class JudgesManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    startCreating() {
        this.setState({
            creating: true,
        });
    }
    stopCreating() {
        this.setState({
            creating: false,
        });
    }
    renderTourCreation() {
        if (this.state.creating) {
            return <JudgeCreatingUI
                competition_id={ this.props.competition_id }
                stopEditing={ this.stopCreating.bind(this) } />
        } else {
            return <button className="btn btn-default full-width" onClick={ this.startCreating.bind(this) }>
                { _("global.buttons.add") }
            </button>
        }
    }
    render() {
        var judges = this.props.judges.map(function(judge) {
            return <JudgeEditingUI
                judge={ judge }
                key={ judge.id } />
        }.bind(this));
        return <div>
            <header>
                <h1>{ _("admin.headers.judges_management") }</h1>
            </header>
            <div className="judges-management-ui">
                { judges }
                { this.renderTourCreation() }
            </div>
        </div>
    }
}
