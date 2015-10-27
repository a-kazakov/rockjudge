class StartList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            include_formation_sportsmen: false,
            include_acrobatics: false,
        }
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        var SCHEMA = {
            disciplines: {
                participants: {
                    club: {},
                    sportsmen: {},
                },
            },
        };
        this.setState(
            storage.get("Competition")
                .by_id(this.props.competition_id)
                .serialize(SCHEMA));
    }
    loadData() {
        Api("competition.get", {
            competition_id: this.props.competition_id,
            children: {
                disciplines: {
                    participants: {
                        club: {},
                    },
                },
            }
        })
        .updateDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    onCbChange() {
        this.setState({
            include_acrobatics: this.refs.cb_acro.getDOMNode().checked,
            include_formation_sportsmen: this.refs.cb_forms.getDOMNode().checked,
        });
    }
    onDisciplineCbChange(discipline_id, event) {
        let upd = {}
        upd["hide_" + discipline_id] = !event.target.checked;
        this.setState(upd);
    }
    setAllDisciplines(selected, event) {
        event.preventDefault();
        let upd = {}
        this.state.disciplines.forEach((d) => upd["hide_" + d.id] = selected);
        this.setState(upd);
    }
    renderDiscipline(ic) {
        if (this.state["hide_" + ic.id]) {
            return null;
        }
        return <div key={ ic.id }>
            <h4>{ ic.name }</h4>
            <div className="discipline">
                <table className="bordered-table"><thead>
                    <tr>
                        <th className="w-8 number"><p>{ _("models.participant.number") }</p></th>
                        <th className="w-21 name"><p>{ _("models.participant.sportsmen") }</p></th>
                        <th className="w-9 year-of-birth"><p>{ _("models.participant.sportsmen_year_of_birth") }</p></th>
                        <th className="w-37 club"><p>{ _("models.participant.club_name") }</p></th>
                        <th className="w-25 coaches"><p>{ _("models.participant.coaches") }</p></th>
                    </tr>
                </thead><tbody>
                    { ic.participants.map((p) => [
                        <tr key={ p.id } className={ !this.state.include_acrobatics || p.acrobatics.length == 0 ? "" : "has-acro" }>
                            <td className="w-8 number"><p className="text-center">{ p.number }</p></td>
                            <td className="w-30 name" colSpan="2"><p>
                                <table className="inner"><tbody>
                                    { p.formation_name ? <th colSpan="2"><p className="text-left">{ p.formation_name }</p></th> : null }
                                    { this.state.include_formation_sportsmen || !p.formation_name ? p.sportsmen.map((s, idx) => <tr key={ idx }>
                                        <td className="w-70"><p>{ s.last_name + " " + s.first_name }</p></td>
                                        <td className="w-30"><p className="text-center">{ s.year_of_birth }</p></td>
                                    </tr> ) : null }
                                </tbody></table>
                            </p></td>
                            <td className="w-37 club"><p>{ p.club.name }{", "}{ p.club.city }</p></td>
                            <td className="w-25 coaches"><p>{ p.coaches.split(",").map((c) => [c.trim(), <br />]) }</p></td>
                        </tr>,
                        !this.state.include_acrobatics || p.acrobatics.length == 0 ? null :
                            <tr key={ "Acro" + p.id } ><td className="acro" colSpan="5">
                                <table className="inner"><tbody>
                                    <tr>
                                        <th className="w-93"><p className="text-left">{ _("models.participant.acro_description") }</p></th>
                                        <th className="w-7"><p className="text-right">{ _("models.participant.acro_score") }</p></th>
                                    </tr>
                                    { p.acrobatics.map((a, idx) =>
                                        <tr key={ idx }>
                                            <td className="w-93"><p className="text-left">{ a.description }</p></td>
                                            <td className="w-7"><p className="text-right">{ a.score.toFixed(1) }</p></td>
                                        </tr>
                                    ) }
                                </tbody></table>
                            </td></tr>
                    ] ) }
                </tbody></table>
                <p className="text-right">
                    <strong>{ _("admin.phrases.total_n_participants", ic.participants.length) }</strong>
                </p>
            </div>
        </div>;
    }
    render() {
        if (this.state.name === null) {
            return <span>Loading ...</span>;
        }
        return <div>
            <header>
                <div className="controls">
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) }>DOCX</button>
                </div>
                <h1>{ _("admin.headers.start_list") }</h1>
            </header>
            <div className="start-list">
                <h3>{ this.state.name }, { this.state.date }</h3>
                <div className="row">
                    <div className="col-md-6">
                        { this.state.disciplines.map((d) =>
                            <div className="switch" key={ d.id }>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={ !this.state["hide_" + d.id] }
                                        onChange={ this.onDisciplineCbChange.bind(this, d.id) } />
                                    { d.name }
                                </label>
                            </div>
                        ) }
                        <a href="#" onClick={ this.setAllDisciplines.bind(this, false) }>{ _("global.buttons.select_all") }</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="#" onClick={ this.setAllDisciplines.bind(this, true) }>{ _("global.buttons.deselect_all") }</a>
                    </div>
                    <div className="col-md-6">
                        <div className="switch">
                            <label>
                                <input type="checkbox" ref="cb_acro" onChange={ this.onCbChange.bind(this) } />
                                { _("admin.labels.include_acrobatics") }
                            </label>
                        </div>
                        <div className="switch">
                            <label>
                                <input type="checkbox" ref="cb_forms" onChange={ this.onCbChange.bind(this) } />
                                { _("admin.labels.include_formation_sportsmen") }
                            </label>
                        </div>
                    </div>
                </div>
                <div ref="content">
                    { this.state.disciplines.map((ic) => this.renderDiscipline(ic)) }
                </div>
            </div>
        </div>;
    }
    createDocx() {
        Docx("start-list")
            .setHeader(_("admin.headers.start_list"))
            .setBody(React.findDOMNode(this.refs.content).innerHTML)
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "border", "none")
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "padding", "0")
            .addStyle(".inner", "width", "100%")
            .addStyle(".acro", "border-top", "none !important")
            .addStyle(".has-acro td", "border-bottom", "1px solid #555 !important")
            .addStyle(".has-acro td td", "border-bottom", "none !important")
            .save();
    }
}
