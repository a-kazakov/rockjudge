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
            <table className="inner-competition"><tbody>
                <tr>
                    <th className="number">{ _("models.participant.number") }</th>
                    <th className="name">{ _("models.participant.name") }</th>
                    <th className="club">{ _("models.participant.club_name") }</th>
                    <th className="coaches">{ _("models.participant.coaches") }</th>
                </tr>
                { ic.participants.map((p) =>
                    <tr key={ p.id }>
                        <td className="number">{ p.number }</td>
                        <td className="name">{ p.name }</td>
                        <td className="club">{ p.club.name }{", "}{ p.club.city }</td>
                        <td className="coaches">{ p.coaches.split(",").map((c) => [c.trim(), <br />]) }</td>
                    </tr>
                ) }
            </tbody></table>
        </div>;
    }
    render() {
        if (this.state.name === null) {
            return <span>Loading ...</span>;
        }
        return <div>
            <header>
                <div className="controls">
                    <button className="btn btn-primary" onClick={ () => print() }>{ _("results.buttons.print") }</button>
                </div>
                <h1>{ _("admin.headers.start_list") }</h1>
            </header>
            <div className="start-list">
                <h3>{ this.state.name }, { this.state.date }</h3>
                { this.state.inner_competitions.map((ic) => this.renderInnerCompetition(ic)) }
            </div>
        </div>;
    }
}
