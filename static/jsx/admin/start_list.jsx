class ParticipantNumbersNumber extends React.Component {
    render() {
        return <div className="participant">
            <p className="spacer-top">&nbsp;</p>
            <div className="competition"><p>{ this.props.competition_name }&nbsp;</p></div>
            <p className="spacer-top2">&nbsp;</p>
            <p className="number">{ this.props.participant.number }</p>
            <p className="name">{ this.props.participant.name }&nbsp;</p>
            <p className="discipline">{ this.props.participant.discipline_name }&nbsp;</p>
            <p className="club">{ this.props.participant.club.name } &mdash; { this.props.participant.club.city }</p>
            <p className="spacer-bottom">&nbsp;</p>
        </div>
    }
}

class ParticipantNumbers extends React.Component {
    makeParticipantsList() {
        let res = [];
        this.props.disciplines.forEach((discipline, idx) =>
            res = res.concat(discipline.participants.map((participant) => ({
                id: participant.id,
                number: participant.number,
                name: participant.name,
                club: participant.club,
                discipline_idx: idx,
                discipline_name: discipline.name,
            })))
        );
        res.sort((a, b) => CmpChain()
            .cmp(a.club.city, b.club.city)
            .cmp(a.club.name, b.club.name)
            .cmp(a.discipline_idx, b.discipline_idx)
            .cmp(a.number, b.number)
            .end()
        )
        return res;
    }
    render() {
        return <div ref="content" className="print-only">
            { this.makeParticipantsList().map((participant) =>
                <ParticipantNumbersNumber
                    participant={ participant }
                    competition_name={ this.props.competition_name }
                    key={ participant.id } />
            ) }
        </div>
    }
    createDocx(filename="numbers.docx") {
        Docx(filename)
            .setMargins([0, 10, 0, 10])
            .setBody(this.refs.content.innerHTML)
            .addStyle("div", "margin", "0")
            .addStyle("div", "padding", "0")
            .addStyle("p", "mso-line-height-rule", "exactly")
            .addStyle("div", "mso-line-height-rule", "exactly")
            .addStyle(".participant", "text-align", "center")

            .addStyle(".spacer-top", "line-height", "20pt")
            .addStyle(".competition", "line-height", "15pt")
            .addStyle(".spacer-top2", "line-height", "30pt")
            .addStyle(".number", "line-height", "300pt")
            .addStyle(".name", "line-height", "10pt")
            .addStyle(".club", "line-height", "10pt")
            .addStyle(".discipline", "line-height", "10pt")
            .addStyle(".spacer-bottom", "line-height", "16pt")

            .addStyle(".number", "font-size", "350pt")
            .addStyle(".number", "letter-spacing:", "-20.0pt")
            .addStyle(".competition", "font-size", "12pt")
            .addStyle(".competition", "font-weight", "bold")
            .addStyle(".competition", "border-bottom", "1pt solid black")
            .addStyle(".name", "font-size", "12pt")
            .addStyle(".name", "font-weight", "bold")
            .addStyle(".club", "font-size", "12pt")
            .addStyle(".discipline", "font-size", "12pt")
            .save();
    }
}

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
                    programs: {},
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
                        programs: {},
                    },
                },
            }
        })
        .addToDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    onCbChange() {
        this.setState({
            include_acrobatics: this.refs.cb_acro.checked,
            include_formation_sportsmen: this.refs.cb_forms.checked,
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
            <h5><p>{ ic.name }</p></h5>
            <div className="discipline">
                <table className="bordered-table"><thead>
                    <tr>
                        <th className="w-8 number"><p>{ _("models.participant.number") }</p></th>
                        <th className="w-27 name"><p>{ _("models.participant.sportsmen") }</p></th>
                        <th className="w-9 year-of-birth"><p>{ _("models.participant.sportsmen_year_of_birth") }</p></th>
                        <th className="w-28 club"><p>{ _("models.participant.club_name") }</p></th>
                        <th className="w-28 coaches"><p>{ _("models.participant.coaches") }</p></th>
                    </tr>
                </thead><tbody>
                    { ic.participants.map((p) => [
                        <tr key={ p.id } className={ !this.state.include_acrobatics || p.programs.length == 0 ? "" : "has-acro" }>
                            <td className="w-8 number"><p className="text-center">{ p.number }</p></td>
                            <td className="w-36 name" colSpan="2">
                                <table className="inner"><tbody>
                                    { p.formation_name ? <tr><th colSpan="2"><p className="text-left">{ p.formation_name }</p></th></tr> : null }
                                    { this.state.include_formation_sportsmen || !p.formation_name ? p.sportsmen.map((s, idx) => <tr key={ idx }>
                                        <td className="w-75"><p>{ s.last_name + " " + s.first_name }</p></td>
                                        <td className="w-25"><p className="text-center">{ s.year_of_birth }</p></td>
                                    </tr> ) : null }
                                </tbody></table>
                            </td>
                            <td className="w-28 club"><p>{ p.club.name }</p></td>
                            <td className="w-28 coaches"><p>{ p.coaches.split(",").map((c) => [c.trim(), <br />]) }</p></td>
                        </tr>,
                        !this.state.include_acrobatics || p.programs.length == 0 ? null :
                            <tr key={ "Acro" + p.id } ><td className="acro" colSpan="5">
                                <table className="inner"><tbody>
                                    { p.programs.map((pr, pr_idx) =>
                                        [<tr key={ "H" + pr_idx }>
                                            <th colSpan="2"><p className="text-left">{ pr.name }</p></th>
                                        </tr>].concat(
                                            pr.acrobatics.map((a, a_idx) =>
                                                <tr key={ `A_${pr_idx}_${a_idx}` }>
                                                    <td className="w-93"><p className="text-left">{ a.description }</p></td>
                                                    <td className="w-7"><p className="text-right">{ a.score.toFixed(1) }</p></td>
                                                </tr>
                                            )
                                        )
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
            return <Loader />
        }
        return <div>
            <header>
                <div className="controls">
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) }>DOCX</button>
                    <button className="btn btn-primary" onClick={ () => this.refs.numbers.createDocx() }>{ _("admin.buttons.docx_numbers") }</button>
                </div>
                <h1>{ _("admin.headers.start_list") }</h1>
            </header>
            <div className="start-list">
                <div className="controls">
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
                </div>
                <Printable
                    ref="printable"
                    header={ this.state.name + ", " + this.state.date }
                    title1={ _("admin.headers.start_list") }
                    body={ this.state.disciplines.map((dis) => this.renderDiscipline(dis)) } />
            </div>
            <ParticipantNumbers
                competition_name={ this.state.name }
                disciplines={ this.state.disciplines.filter((dis) => !this.state["hide_" + dis.id]) }
                ref="numbers" />
        </div>;
    }
    createDocx(filename="start-list.docx") {
        Docx(filename)
            .setMargins([10, 15, 10, 25])
            .setHeader(this.state.name + ", " + this.state.date)
            .setTitle1(_("admin.headers.start_list"))
            .setBody(this.refs.printable.fetchPrintableData())
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "border", "none")
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "padding", "0")
            .addStyle(".inner", "width", "100%")
            .addStyle(".acro", "border-top", "none !important")
            .addStyle(".has-acro td", "border-bottom", "1px solid #555 !important")
            .addStyle(".has-acro td td", "border-bottom", "none !important")
            .save();
    }
}
