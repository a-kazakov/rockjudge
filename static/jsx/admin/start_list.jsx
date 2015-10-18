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
            inner_competitions: {
                participants: {
                    club: {},
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
                inner_competitions: {
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
    renderInnerCompetition(ic) {
        return <div key={ ic.id }>
            <h4>{ ic.name }</h4>
            <div className="inner-competition">
                <table className="bordered-table"><thead>
                    <tr>
                        <th className="w-8 number"><p>{ _("models.participant.number") }</p></th>
                        <th className="w-40 name"><p>{ _("models.participant.name") }</p></th>
                        <th className="w-32 club"><p>{ _("models.participant.club_name") }</p></th>
                        <th className="w-20 coaches"><p>{ _("models.participant.coaches") }</p></th>
                    </tr>
                </thead><tbody>
                    { ic.participants.map((p) =>
                        <tr key={ p.id }>
                            <td className="w-8 number"><p className="text-center">{ p.number }</p></td>
                            <td className="w-40 name"><p>{ p.name }</p></td>
                            <td className="w-32 club"><p>{ p.club.name }{", "}{ p.club.city }</p></td>
                            <td className="w-20 coaches"><p>{ p.coaches.split(",").map((c) => [c.trim(), <br />]) }</p></td>
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
                    { this.state.inner_competitions.map((ic) => this.renderInnerCompetition(ic)) }
                </div>
            </div>
        </div>;
    }
    createDocx() {
        Docx("start-list")
            .setHeader(_("admin.headers.start_list"))
            .setBody(React.findDOMNode(this.refs.content).innerHTML)
            .save();
    }
}
