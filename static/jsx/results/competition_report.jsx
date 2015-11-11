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
            disciplines: {},
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
        Api("competition.get", {
            competition_id: this.props.competition_id,
            children: {
                clubs: {
                    participants: {},
                },
                disciplines: {},
                judges: {},
            }
        })
        .addToDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    renderInfoTable() {
        return <table className="info"><tbody>
            <tr>
                <th className="w-40"><p className="text-left">{ _("admin.labels.competition_name") }</p></th>
                <td className="w-60"><p><strong>{ this.state.competition.name }</strong></p></td>
            </tr>
            <tr>
                <th className="w-40"><p className="text-left">{ _("admin.labels.competition_date") }</p></th>
                <td className="w-60"><p><strong>{ this.state.competition.date }</strong></p></td>
            </tr>
            {
                this.state.competition.info.map((row) =>
                    <tr key={ row[0] }>
                        <th className="w-40"><p className="text-left">{ row[0] }</p></th>
                        <td className="w-60"><p>{ row[1] }</p></td>
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
        Object.getOwnPropertyNames(clubs_dict).forEach((city) => cities.push(city))
        cities.sort()
        return <table className="clubs"><tbody>{
            cities.map((city) =>
                <tr key={ city } className="va-top">
                    <th className="w-20"><p className="text-left">{ city }</p></th>
                    <td className="w-80"><p>{ clubs_dict[city].join(", ") }</p></td>
                </tr>
            )
        }</tbody></table>;
    }
    renderJudges() {
        return <table className="judges"><tbody>{
            this.state.competition.judges.map((judge) =>
                <tr key={ judge.id }>
                    <th className="w-40"><p className="text-left">{ judge.role_description || _("global.phrases.judge_n", judge.number) }</p></th>
                    <td className="w-60"><p>{ judge.name }, { judge.category }</p></td>
                </tr>
            )
        }</tbody></table>
    }
    renderResults() {
        return this.state.competition.disciplines.map((ic) =>
            <div key={ ic.id }>
                <h5><p>{ ic.name }</p></h5>
                <DisciplineResults
                    discipline_id={ ic.id }
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
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) }>DOCX</button>
                </div>
                <h1>{ _("admin.headers.competition_report") }</h1>
            </header>
            <div className="competition-report" ref="main_table">
                { this.renderInfoTable() }
                <h4><p>{ _("admin.headers.clubs") }</p></h4>
                { this.renderClubs() }
                <h4><p>{ _("admin.headers.judges") }</p></h4>
                { this.renderJudges() }
                <h4><p>{ _("admin.headers.competition_results") }</p></h4>
                { this.renderResults() }
            </div>
        </div>
    }
    createDocx() {
        Docx("report")
            .setMargins([10, 15, 10, 25])
            .setTitle1(_("admin.headers.competition_report"))
            .setBody(this.refs.main_table.innerHTML)
            .addStyle(".spacer td", "height", "5pt")
            .addStyle(".tour-name", "background", "#ddd")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%")
            .save();
    }
}
