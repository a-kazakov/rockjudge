class PrintableCompetitionPlanRow extends React.Component {
    renderName() {
        if (this.props.item.verbose_name) {
            return <td colSpan="2"><p><strong>{ this.props.item.verbose_name }</strong></p></td>
        }
        if (this.props.item.tour_id) {
            let result = "";
            this.props.tours.forEach((tour) => {
                if (tour.id == this.props.item.tour_id) {
                    result = tour;
                }
            })
            return [<td key="D"><p>{ result.discipline_name }</p></td>,
                    <td key="T"><p className="text-center">{ result.tour_name }</p></td>];
        }
        return <td colSpan="2"><p></p></td>
    }
    render() {
        return <tr>
            <td><p className="text-center">{ this.props.item.estimated_beginning || <span>&nbsp;</span> }</p></td>
            { this.renderName() }
            <td><p className="text-center">{ this.props.item.estimated_duration || <span>&nbsp;</span> }</p></td>
        </tr>
    }
}

class PrintableCompetitionPlan extends React.Component {
    render() {
        return <div className="print-only">
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th><p>{ _("models.competition_plan_item.estimated_beginning") }</p></th>
                        <th><p>{ _("models.competition_plan_item.discipline") }</p></th>
                        <th><p>{ _("models.competition_plan_item.tour") }</p></th>
                        <th><p>{ _("models.competition_plan_item.estimated_duration") }</p></th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.items.map((item) =>
                        <PrintableCompetitionPlanRow item={ item } tours={ this.props.tours } key={ item.id } />
                    ) }
                </tbody>
            </table>
        </div>
    }
}

class CompetitionPlanItemEditorRow extends React.Component {
    sertialize() {
        return {
            sp: parseInt(this._sp.value) || 0,
            tour_id: this._tour_id.value == "" ? null : parseInt(this._tour_id.value),
            verbose_name: this._verbose_name.value,
            estimated_beginning: this._estimated_beginning.value,
            estimated_duration: this._estimated_duration.value,
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newCompetitionPlanItem) {
            Api("competition_plan_item.set", {
                competition_plan_item_id: this.props.item.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("competition_plan_item.create", {
                competition_id: this.props.competition_id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        return <tr className={ "editor" + (this.props.newCompetitionPlanItem ? " create" : "" ) }>
            <td colSpan="6">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="rows">
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.competition_plan_item.sp") }
                                <input
                                    ref={ function(e) { if (e) { e.select(); this._sp = e; } }.bind(this) }
                                    className="full-width"
                                    defaultValue={ this.props.item.sp } />
                            </label>
                        </div>
                        <div className="col-md-5">
                            <label className="full-width">
                                { _("models.competition_plan_item.verbose_name") }
                                <input
                                    ref={ (e) => e && (this._verbose_name = e) }
                                    className="full-width"
                                    defaultValue={ this.props.item.verbose_name } />
                            </label>
                            <label className="full-width">
                                { _("models.competition_plan_item.tour") }
                                <select
                                    ref={ (e) => e && (this._tour_id = e) }
                                    className="full-width"
                                    defaultValue={ this.props.item.tour_id || "" }>
                                        <option value="">----------</option>
                                        { this.props.tours.map((tour) =>
                                            <option value={ tour.id } key={ tour.id }>{ tour.name }</option>
                                        ) }
                                </select>
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="full-width">
                                { _("models.competition_plan_item.estimated_beginning") }
                                <input
                                    ref={ (e) => e && (this._estimated_beginning = e) }
                                    className="full-width"
                                    defaultValue={ this.props.item.estimated_beginning } />
                            </label>
                            <label className="full-width">
                                { _("models.competition_plan_item.estimated_duration") }
                                <input
                                    ref={ (e) => e && (this._estimated_duration = e) }
                                    className="full-width"
                                    defaultValue={ this.props.item.estimated_duration } />
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

class CompetitionPlanItemRow extends React.Component {
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
        Api("competition_plan_item.delete", {
            competition_plan_item_id: this.props.item.id,
        }).send();
    }
    getName() {
        let c = this.props.item;
        if (c.verbose_name) {
            return <td colSpan="2"><b>{ c.verbose_name }</b></td>;
        }
        let result = <td colSpan="2"></td>;
        this.props.tours.forEach((tour) => {
            if (tour.id == c.tour_id) {
                result = [<td key="D">{ tour.discipline_name }</td>, <td key="T">{ tour.tour_name }</td>];
            }
        })
        return result;
    }
    renderEditor() {
        return <CompetitionPlanItemEditorRow
            newCompetitionPlanItem={ false }
            stopEditing={ this.stopEditing.bind(this) }
            { ...this.props } />
    }
    renderViewer() {
        let c = this.props.item;
        return <tr className={ "viewer" + (this.props.error ? " error" : "") } onClick={ this.startEditing.bind(this) }>
            <td className="sp">{ c.sp }</td>
            { this.getName() }
            <td className="estimated_beginning">{ c.estimated_beginning }</td>
            <td className="estimated_duration">{ c.estimated_duration }</td>
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

class CompetitionPlanItemCreationRow extends React.Component {
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
            "sp": "",
            "verbose_name": "",
            "tour_id": null,
            "estimated_duration": "",
            "estimated_beginning": "",
        }
        return <CompetitionPlanItemEditorRow
            newCompetitionPlanItem={ true }
            stopEditing={ this.stopEditing.bind(this) }
            item={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="6">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>{ _("admin.buttons.add_competition_plan_item") }</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

class CompetitionPlanManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    genTours() {
        let result = [];
        this.props.disciplines.forEach((discipline) =>
            discipline.tours.forEach((tour) =>
                result.push({
                    id: tour.id,
                    name: `${discipline.name} — ${tour.name}`,
                    discipline_id: discipline.id,
                    discipline_name: discipline.name,
                    tour_name: tour.name,
                })
            )
        )
        return result;
    }
    renderTable(tours) {
        let tours_count = {};
        let tours_index = {};
        let disciplines_index = {};
        tours.forEach((tour) => tours_index[tour.id] = tour);
        this.props.items.forEach((item) => {
            if (item.tour_id) {
                tours_count[item.tour_id] = tours_count[item.tour_id] ? tours_count[item.tour_id] + 1 : 1;
            }
        });
        let discipline_cursors = {};
        this.props.disciplines.forEach((discipline) => discipline_cursors[discipline.id] = 0);
        this.props.disciplines.forEach((discipline) => disciplines_index[discipline.id] = discipline);
        let rows = this.props.items.map((item) => {
            let error = (tours_count[item.tour_id] || 0) > 2;
            if (item.tour_id) {
                let discipline_id = tours_index[item.tour_id].discipline_id;
                let tour_idx = discipline_cursors[discipline_id];
                if (!disciplines_index[discipline_id].tours[tour_idx] ||
                        item.tour_id != disciplines_index[discipline_id].tours[tour_idx].id) {
                    error = true;
                    disciplines_index[discipline_id].tours.forEach((tour, idx) => {
                        if (tour.id == item.tour_id) {
                            tour_idx = idx;
                        }
                    });
                }
                discipline_cursors[discipline_id] = tour_idx + 1;
            }
            return <CompetitionPlanItemRow
                key={ item.id }
                error={ error }
                tours={ tours }
                item={ item } />;
        });
        let unpicked_tours = tours.filter((tour) => !tours_count[tour.id]);
        let unpicked_tours_html = !unpicked_tours.length ? null :
            <div>
                <h4>{ _("admin.headers.unpicked_tours") }</h4>
                <ul className="unpicked-tours">
                    { unpicked_tours.map((tour) =>
                        <li className="item" key={ tour.id }>
                            { tour.name }
                        </li>
                    ) }
                </ul>
            </div>;
        return <div className="manage-competition-plan">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="sp">{ _("models.competition_plan_item.sp") }</th>
                        <th className="discipline">{ _("models.competition_plan_item.discipline") }</th>
                        <th className="tour">{ _("models.competition_plan_item.tour") }</th>
                        <th className="estimated_beginning">{ _("models.competition_plan_item.estimated_beginning") }</th>
                        <th className="estimated_duration">{ _("models.competition_plan_item.estimated_duration") }</th>
                        <th className="delete"></th>
                    </tr>
                    { rows }
                    <CompetitionPlanItemCreationRow competition_id={ this.props.competition_id } tours={ tours } />
                </tbody>
            </table>
            { unpicked_tours_html }
        </div>
    }
    render() {
        let tours = this.genTours();
        return <div className="app-content">
            <header className="app-header">
                <div className="controls">
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) } key="btn-init-tour">
                        DOCX
                    </button>
                </div>
                <h1>{ _("admin.headers.competition_plan_management") }</h1>
            </header>
            <div className="app-body">
                { this.renderTable(tours) }
                <PrintableCompetitionPlan ref="printable_competition_plan" tours={ tours } {...this.props} />
            </div>
        </div>;
    }
    createDocx() {
        Docx("program")
            .setMargins([10, 15, 10, 15])
            .setHeader(this.props.competition_name + ", " + this.props.competition_date)
            .setTitle1(_("admin.headers.competition_plan"))
            .setBody(ReactDOM.findDOMNode(this.refs.printable_competition_plan).innerHTML)
            .save();
    }
}
