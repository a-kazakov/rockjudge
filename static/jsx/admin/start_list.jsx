class StartList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
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
        Api("tournaments.competition.get", {
            competition_id: this.props.competition_id,
            children: {
                disciplines: {
                    participants: {
                        club: {},
                        sportsmen: {},
                    },
                },
            }
        })
        .updateDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    renderDiscipline(ic) {
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
                    { ic.participants.map((p) =>
                        <tr key={ p.id }>
                            <td className="w-8 number"><p className="text-center">{ p.number }</p></td>
                            <td className="w-30 name" colSpan="2"><p>
                                <table className="sportsmen"><tbody>
                                    { p.formation_name ? <th colSpan="2"><p className="text-left">{ p.formation_name }</p></th> : null }
                                    { p.sportsmen.map((s, idx) => <tr key={ idx }>
                                        <td className="w-70"><p>{ s.last_name + " " + s.first_name }</p></td>
                                        <td className="w-30"><p className="text-center">{ s.year_of_birth }</p></td>
                                    </tr> ) }
                                </tbody></table>
                            </p></td>
                            <td className="w-37 club"><p>{ p.club.name }{", "}{ p.club.city }</p></td>
                            <td className="w-25 coaches"><p>{ p.coaches.split(",").map((c) => [c.trim(), <br />]) }</p></td>
                        </tr>
                    ) }
                </tbody></table>
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
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%")
            .save();
    }
}
