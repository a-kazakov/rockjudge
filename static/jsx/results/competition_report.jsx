class CompetitionReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        let data = storage.get("Competition").by_id(this.props.competition_id).serialize({
            inner_competitions: {},
            judges: {},
            clubs: {
                participants: {},
            },
        });
        this.setState({
            competition: data,
        });
    }
    loadData() {
        Api("tournaments.competition.get", {
            competition_id: this.props.competition_id,
            children: {
                clubs: {
                    participants: {},
                },
                inner_competitions: {},
                judges: {},
            }
        })
        .updateDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    renderInfoTable() {
        return <table className="info"><tbody>
            <tr>
                <th>{ _("admin.labels.competition_name") }</th>
                <td>{ this.state.competition.name }</td>
            </tr>
            <tr>
                <th>{ _("admin.labels.competition_data") }</th>
                <td>{ this.state.competition.date }</td>
            </tr>
            {
                this.state.competition.info.map((row) =>
                    <tr key={ row[0] }>
                        <th>{ row[0] }</th>
                        <td>{ row[1] }</td>
                    </tr>
                )
            }
        </tbody></table>
    }
    renderClubs() {
        let clubs = this.state.competition.clubs.filter((club) => club.participants.length > 0)
        let clubs_dict = {}
        let cities = []
        clubs.forEach((club) => clubs_dict[club.city] = [] )
        clubs.forEach((club) => clubs_dict[club.city].push(club.name) )
        clubs.forEach((club) => clubs_dict[club.city].sort )
        Object.keys(clubs_dict).forEach((city) => cities.push(city))
        cities.sort()
        return <table className="clubs"><tbody> {
            cities.map((city) =>
                <tr key={ city }>
                    <th>{ city }</th>
                    <td>{ clubs_dict[city].join(", ") }</td>
                </tr>
            )
        } </tbody></table>;
    }
    renderJudges() {
        let judges = this.state.competition.judges.filter((judge) => judge.role_description === "");
        let staff = this.state.competition.judges.filter((judge) => judge.role_description !== "");
        return <table className="judges"><tbody> {
            judges.map((judge) =>
                <tr key={ judge.id }>
                    <th>{ _("global.phrases.judge_n", judge.number) }</th>
                    <td>{ judge.name } &mdash; { judge.category }</td>
                </tr>
            )
        }
        <tr className="spacer"><td></td><td></td></tr>
        {
            staff.map((judge) =>
                <tr key={ judge.id }>
                    <th>{ judge.role_description }</th>
                    <td>{ judge.name } &mdash; { judge.category }</td>
                </tr>
            )
        }
        </tbody></table>
    }
    renderResults() {
        return this.state.competition.inner_competitions.map((ic) =>
            <div key={ ic.id }>
                <h4>{ ic.name }</h4>
                <InnerCompetitionResults
                    inner_competition_id={ ic.id }
                    table_only={ true } />
            </div>
        );
    }
    render() {
        if (this.state.competition === null) {
            return <span>Loading...</span>
        }
        return <div>
            <header>
                <div className="controls">
                    <button className="btn btn-primary" onClick={ function() { window.print(); } }>{ _("results.buttons.print") }</button>
                </div>
                <h1>{ _("admin.headers.competition_report") }</h1>
            </header>
            <div className="competition-report">
                { this.renderInfoTable() }
                <h3>{ _("admin.headers.clubs") }</h3>
                { this.renderClubs() }
                <h3>{ _("admin.headers.judges") }</h3>
                { this.renderJudges() }
                <h3>{ _("admin.headers.competition_results") }</h3>
                { this.renderResults() }
            </div>
        </div>
    }
}
