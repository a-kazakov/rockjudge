import { _ } from "i10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { DisciplinesControls } from "ui/admin_components";
import { Loader } from "ui/components";
import { Printable } from "ui/printable";
import { Docx } from "common/docx";
import { clone } from "common/tools";
import { DisciplineResults } from "../judging/discipline_results";


export class CompetitionReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: null,
            config: {
                include_extended_info: true,
                include_clubs: true,
                include_judges: true,
                disciplines: {},
            }
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
    }
    componentWillMount() {
        this.storage = storage.getDomain("start_list_" + this.props.competition_id);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.loadData();
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        storage.delDomain("start_list_" + this.props.competition_id);
    }
    reloadFromStorage() {
        const SCHEMA = {
            disciplines: {},
            judges: {},
            clubs: {
                participants: {},
            },
        };
        let competition = this.storage.get("Competition")
            .by_id(this.props.competition_id)
            .serialize(SCHEMA);
        let config = clone(this.state.config);
        let new_disciplines = {};
        competition.disciplines.forEach(discipline => {
            new_disciplines[discipline.id] = (discipline.id in config.disciplines)
                ? config.disciplines[discipline.id]
                : true;
        })
        config.disciplines = new_disciplines;
        this.setState({
            config: config,
            competition: competition,
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
        .addToDB("Competition", this.props.competition_id, this.storage)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    onConfigChange = (new_config) => {
        this.setState({
            config: new_config,
        });
    }
    render() {  // eslint-disable-line react/sort-comp
        if (this.state.competition === null) {
            return <Loader />
        }
        let body = <div>
            <Info { ...this.state } />
            <Clubs { ...this.state } />
            <Judges { ...this.state } />
            <Results { ...this.state } />
        </div>;
        return <div className="app-content">
            <header className="app-header">
                <div className="controls">
                    <button className="btn btn-primary" onClick={ this.createDocx }>DOCX</button>
                </div>
                <h1>{ _("admin.headers.competition_report") }</h1>
            </header>
            <div className="app-body competition-report">
                <DisciplinesControls
                    custom_controls={[
                        {key: "include_extended_info",  label: _("admin.labels.include_extended_info")},
                        {key: "include_clubs",          label: _("admin.labels.include_clubs")},
                        {key: "include_judges",         label: _("admin.labels.include_judges")}
                    ]}
                    config={ this.state.config }
                    disciplines={ this.state.competition.disciplines }
                    onChange={ this.onConfigChange } />
                <Printable
                    ref="printable"
                    title1={ _("admin.headers.competition_report") }
                    body={ body } />
            </div>
        </div>
    }
    createDocx = (filename="report.docx") => {
        Docx(filename)
            .setMargins([10, 15, 10, 25])
            .setTitle1(_("admin.headers.competition_report"))
            .setBody(this.refs.printable.fetchPrintableData())
            .addStyle(".spacer td", "height", "5pt")
            .addStyle(".tour-name", "background", "#ddd")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%")
            .save();
    }
}

class Info extends React.Component {
    renderExtendedInfo() {
        if (!this.props.config.include_extended_info) {
            return null;
        }
        return this.props.competition.info.map((row, idx) =>
            <tr key={ idx }>
                <th className="w-40"><p className="text-left">{ row[0] }</p></th>
                <td className="w-60"><p>{ row[1] }</p></td>
            </tr>
        );
    }
    render() {
        return (
            <table className="info"><tbody>
                <tr>
                    <th className="w-40"><p className="text-left">{ _("admin.labels.competition_name") }</p></th>
                    <td className="w-60"><p><strong>{ this.props.competition.name }</strong></p></td>
                </tr>
                <tr>
                    <th className="w-40"><p className="text-left">{ _("admin.labels.competition_date") }</p></th>
                    <td className="w-60"><p><strong>{ this.props.competition.date }</strong></p></td>
                </tr>
                { this.renderExtendedInfo() }
            </tbody></table>
        );
    }
}

class Clubs extends React.Component {
    render() {
        if (!this.props.config.include_clubs) {
            return null;
        }
        let clubs = this.props.competition.clubs.filter((club) => club.participants.length > 0)
        let clubs_dict = {}
        let cities = []
        clubs.forEach((club) => clubs_dict[club.city] = [] )
        clubs.forEach((club) => clubs_dict[club.city].push(club.name) )
        clubs.forEach((club) => clubs_dict[club.city].sort )
        Object.getOwnPropertyNames(clubs_dict).forEach((city) => cities.push(city))
        cities.sort()
        return (
            <div>
                <h4><p>{ _("admin.headers.clubs") }</p></h4>
                <table className="clubs"><tbody>
                    { cities.map((city) =>
                        <tr key={ city } className="va-top">
                            <th className="w-20"><p className="text-left">{ city }</p></th>
                            <td className="w-80"><p>{ clubs_dict[city].join(", ") }</p></td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}

class Judges extends React.Component {
    render() {
        if (!this.props.config.include_judges) {
            return null;
        }
        return (
            <div>
                <h4><p>{ _("admin.headers.judges") }</p></h4>
                <table className="judges"><tbody>
                    { this.props.competition.judges.map((judge) =>
                        <tr key={ judge.id }>
                            <th className="w-40"><p className="text-left">{ judge.role_description || _("global.phrases.judge_n", judge.number) }</p></th>
                            <td className="w-60"><p>{ judge.name }, { judge.category }</p></td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}

class Results extends React.Component {
    renderDiscipline = (discipline) => {
        if (!this.props.config.disciplines[discipline.id]) {
            return null;
        }
        return (
            <div key={ discipline.id }>
                <h5><p>{ discipline.name }</p></h5>
                <DisciplineResults
                    discipline_id={ discipline.id }
                    renderer="table" />
            </div>
        )
    }
    render() {
        let has_disciplines = false;
        for (let i = 0; i < this.props.competition.disciplines.length; ++i) {
            let discipline_id = this.props.competition.disciplines[i].id;
            if (this.props.config.disciplines[discipline_id]) {
                has_disciplines = true;
                break;
            }
        }
        if (!has_disciplines) {
            return null;
        }
        return (
            <div>
                <h4><p>{ _("admin.headers.competition_results") }</p></h4>
                { this.props.competition.disciplines.map(this.renderDiscipline) }
            </div>
        )
    }
}