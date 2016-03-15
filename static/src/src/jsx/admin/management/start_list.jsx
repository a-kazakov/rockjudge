import { _ } from "i10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { DisciplinesControls } from "ui/admin_components";
import { Loader } from "ui/components";
import { Printable } from "ui/printable";
import { Docx } from "common/docx";
import { clone, CmpChain } from "common/tools";


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
    render() {  // eslint-disable-line react/sort-comp
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

export class StartList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: null,
            config: {
                include_formation_sportsmen: false,
                include_acrobatics: false,
                group_by_clubs: false,
                show_summary: false,
                disciplines: {},
            }
        }
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
            disciplines: {
                participants: {
                    club: {},
                    programs: {},
                },
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
                disciplines: {
                    participants: {
                        club: {},
                        programs: {},
                    },
                },
            }
        })
        .addToDB("Competition", this.props.competition_id, this.storage)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    onConfigChange = new_config => {
        this.setState({
            config: new_config,
        });
    }
    renderBody() {
        let props = {
            competition: this.state.competition,
            config: this.state.config,
        }
        if (this.state.config.show_summary) {
            if (this.state.config.group_by_clubs) {
                return <ClubsSummaryTable { ...props } />
            }
            return <DisciplinesSummaryTable { ...props } />
        }
        if (this.state.config.group_by_clubs) {
            return <Clubs { ...props } />
        }
        return <Disciplines { ...props } />
    }
    renderParticipantNumbers() {
        let disciplines = this.state.competition.disciplines.filter(dis => this.state.config.disciplines[dis.id])
        return (
            <ParticipantNumbers
                competition_name={ this.state.competition.name }
                disciplines={ disciplines }
                ref="numbers" />
        )
    }
    getTitle() {
        if (this.state.config.show_summary) {
            if (this.state.config.group_by_clubs) {
                return _("admin.headers.clubs_summary");
            }
            return _("admin.headers.disciplines_summary");
        }
        return _("admin.headers.start_list");
    }
    render() {  // eslint-disable-line react/sort-comp
        if (this.state.competition === null) {
            return <Loader />
        }
        return <div className="app-content">
            <header className="app-header">
                <div className="controls">
                    <button className="btn btn-primary" onClick={ () => this.createDocx() }>DOCX</button>
                    <button className="btn btn-primary" onClick={ () => this.refs.numbers.createDocx() }>{ _("admin.buttons.docx_numbers") }</button>
                </div>
                <h1>{ _("admin.headers.start_list") }</h1>
            </header>
            <div className="app-body start-list">
                <DisciplinesControls
                    custom_controls={[
                        {key: "include_acrobatics",            label: _("admin.labels.include_acrobatics")},
                        {key: "include_formation_sportsmen",   label: _("admin.labels.include_formation_sportsmen")},
                        {key: "group_by_clubs",                label: _("admin.labels.group_by_clubs")},
                        {key: "show_summary",                  label: _("admin.labels.show_summary")}
                    ]}
                    config={ this.state.config }
                    disciplines={ this.state.competition.disciplines }
                    onChange={ this.onConfigChange } />
                <Printable
                    ref="printable"
                    header={ this.state.competition.name + ", " + this.state.competition.date }
                    title1={ this.getTitle() }
                    body={ this.renderBody() } />
                { this.renderParticipantNumbers() }
            </div>
        </div>;
    }
    createDocx(filename="start-list.docx") {
        Docx(filename)
            .setMargins([10, 15, 10, 25])
            .setHeader(this.state.competition.name + ", " + this.state.competition.date)
            .setTitle1(this.getTitle())
            .setBody(this.refs.printable.fetchPrintableData())
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "border", "none")
            .addStyle(".bordered-table .inner td, .bordered-table .inner th", "padding", "0")
            .addStyle(".inner", "width", "100%")
            .addStyle(".acro", "border-top", "none !important")
            .addStyle(".has-acro td", "border-bottom", "1px solid #555 !important")
            .addStyle(".has-acro td td", "border-bottom", "none !important")
            .addStyle("tr.tr-acro", "page-break-inside", "auto")
            .save();
    }
}

class DisciplinesSummaryTable extends React.Component {
    render() {
        let all_participants = [].concat.apply([], this.props.competition.disciplines.map(d => d.participants));
        let disciplines = this.props.competition.disciplines.filter(d => this.props.config.disciplines[d.id]);
        return (
            <div className="summary">
                <table className="bordered-table"><tbody>
                    { disciplines.map(discipline =>
                        <ParticipantsStats
                            table_row
                            key={ discipline.id }
                            label={ discipline.name }
                            participants={ discipline.participants } />
                    ) }
                </tbody></table>
                <p>&nbsp;</p>
                <ParticipantsStats
                    participants={ all_participants } />
            </div>
        );
    }
}

class ClubsSummaryTable extends React.Component {
    render() {
        let all_participants = [].concat.apply([], this.props.competition.disciplines.map(d => d.participants));
        let clubs = Clubs.getParticipantsByClubs(this.props.competition, this.props.config);
        return (
            <div className="summary">
                <DisciplinesShown { ...this.props } />
                <table className="bordered-table"><tbody>
                    { clubs.map(club =>
                        <ParticipantsStats
                            table_row
                            key={ club.id }
                            label={ `${club.name}, ${club.city}` }
                            participants={ club.participants } />
                    ) }
                </tbody></table>
                <p>&nbsp;</p>
                <ParticipantsStats
                    participants={ all_participants } />
            </div>
        );
    }
}

class DisciplinesShown extends React.Component {
    hasDisabledDisciplines() {
        return this.props.competition.disciplines.filter(d => !this.props.config.disciplines[d.id]).length > 0;
    }
    getEnabledDisciplines() {
        return this.props.competition.disciplines.filter(d => this.props.config.disciplines[d.id]);
    }
    render() {
        if (!this.hasDisabledDisciplines()) {
            return null;
        }
        let disciplines = this.getEnabledDisciplines();
        if (disciplines.length === 0) {
            return null;
        }
        return (
            <div className="disciplines-shown">
                <p><strong>{ _("admin.headers.disciplines_shown") }</strong></p>
                <ul>
                    { disciplines.map(d =>
                        <li key={ d.id }>{ d.name }</li>
                    ) }
                </ul>
            </div>
        )
    }
}

class Disciplines extends React.Component {
    render() {
        return <div>
            { this.props.competition.disciplines.map(discipline =>
                <DisciplineSection
                    key={ discipline.id }
                    discipline={ discipline }
                    { ...this.props } />
            ) }
        </div>
    }
}

class DisciplineSection extends React.Component {
    renderRows() {
        let result = [];
        this.props.discipline.participants.forEach(p => {
            let include_acrobatics = this.props.config.include_acrobatics && p.programs.length !== 0;
            result.push(
                <DisciplineSectionRow
                    key={ `P${p.id}` }
                    config={ this.props.config }
                    acro_included={ include_acrobatics }
                    participant={ p } />
            );
            if (include_acrobatics) {
                result.push(
                    <Acrobatics
                        key={ `A${p.id}` }
                        config={ this.props.config }
                        participant={ p } />
                )
            }
        });
        return result;
    }
    render() {
        if (!this.props.config.disciplines[this.props.discipline.id]) {
            return null;
        }
        return <div>
            <h5><p>{ this.props.discipline.name }</p></h5>
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
                    { this.renderRows() }
                </tbody></table>
                <ParticipantsStats
                    participants={ this.props.discipline.participants } />
            </div>
        </div>;
    }
}

class DisciplineSectionRow extends React.Component {
    render() {
        let class_name = this.props.acro_included ? "has-acro" : "";
        let p = this.props.participant;
        return (
            <tr className={ class_name }>
                <td className="w-8 number"><p className="text-center">{ p.number }</p></td>
                <td className="w-36 name" colSpan="2">
                    <SportsmenTable
                        config={ this.props.config }
                        participant={ p } />
                </td>
                <td className="w-28 club"><p>{ p.club.name }</p></td>
                <td className="w-28 coaches"><p>{ p.coaches.split(",").map((c) => [c.trim(), <br key="X" />]) }</p></td>
            </tr>
        );
    }
}

class Clubs extends React.Component {
    static getParticipantsByClubs(competition, config) {
        let disciplines = clone(competition.disciplines);
        let grouped = {};
        let clubs = {};
        disciplines.forEach(discipline => {
            if (!config.disciplines[discipline.id]) {
                return;
            }
            discipline.participants.forEach(participant => {
                let club_id = participant.club.id;
                if (!(club_id in grouped)) {
                    grouped[club_id] = [];
                }
                participant.discipline = discipline;
                grouped[club_id].push(participant);
                clubs[club_id] = participant.club;
            });
        });
        let clubs_list = Object.keys(clubs).map(key => clubs[key]);
        clubs_list.sort((a, b) => a.name.localeCompare(b.name));
        return clubs_list.map(club => {
            club.participants = grouped[club.id];
            return club;
        });
    }
    render() {
        let clubs = Clubs.getParticipantsByClubs(this.props.competition, this.props.config);
        return <div>
            <DisciplinesShown { ...this.props } />
            { clubs.map(club =>
                <ClubSection
                    key={ club.id }
                    club={ club }
                    { ...this.props } />
            ) }
        </div>
    }
}

class ClubSection extends React.Component {
    renderRows() {
        let result = [];
        this.props.club.participants.forEach(p => {
            let include_acrobatics = this.props.config.include_acrobatics && p.programs.length !== 0;
            result.push(
                <ClubSectionRow
                    key={ `P${p.id}` }
                    config={ this.props.config }
                    acro_included={ include_acrobatics }
                    participant={ p } />
            );
            if (include_acrobatics) {
                result.push(
                    <Acrobatics
                        key={ `A${p.id}` }
                        config={ this.props.config }
                        participant={ p } />
                )
            }
        });
        return result;
    }
    render() {
        return <div>
            <h5><p>{ this.props.club.name }, { this.props.club.city }</p></h5>
            <div className="club">
                <table className="bordered-table"><thead>
                    <tr>
                        <th className="w-8 number"><p>{ _("models.participant.number") }</p></th>
                        <th className="w-27 name"><p>{ _("models.participant.sportsmen") }</p></th>
                        <th className="w-9 year-of-birth"><p>{ _("models.participant.sportsmen_year_of_birth") }</p></th>
                        <th className="w-28 discipline"><p>{ _("models.participant.discipline_name") }</p></th>
                        <th className="w-28 coaches"><p>{ _("models.participant.coaches") }</p></th>
                    </tr>
                </thead><tbody>
                    { this.renderRows() }
                </tbody></table>
                <ParticipantsStats
                    participants={ this.props.club.participants } />
            </div>
        </div>;
    }
}

class ClubSectionRow extends React.Component {
    render() {
        let class_name = this.props.acro_included ? "has-acro" : "";
        let p = this.props.participant;
        return (
            <tr className={ class_name }>
                <td className="w-8 number"><p className="text-center">{ p.number }</p></td>
                <td className="w-36 name" colSpan="2">
                    <SportsmenTable
                        config={ this.props.config }
                        participant={ p } />
                </td>
                <td className="w-28 discipline"><p>{ p.discipline.name }</p></td>
                <td className="w-28 coaches"><p>{ p.coaches.split(",").map((c) => [c.trim(), <br key="X" />]) }</p></td>
            </tr>
        );
    }
}

class SportsmenTable extends React.Component {
    renderFormationName() {
        let formation_name = this.props.participant.formation_name;
        if (formation_name !== "") {
            return (
                <tr key="FN">
                    <th colSpan="2"><p className="text-left">{ formation_name }</p></th>
                </tr>
            );
        }
        return null;
    }
    renderSportsmen() {
        if (this.props.config.include_formation_sportsmen || this.props.participant.formation_name === "") {
            return this.props.participant.sportsmen.map((s, idx) =>
                <tr key={ idx }>
                    <td className="w-75"><p>
                        { s.last_name + " " + s.first_name }
                        { s.substitute ? <i> ({ _("admin.labels.sub") }.)</i> : null }
                    </p></td>
                    <td className="w-25"><p className="text-center">{ s.year_of_birth }</p></td>
                </tr>
            )
        }
    }
    render() {
        let p = this.props.participant;
        return (
            <table className="inner"><tbody>
                { this.renderFormationName() }
                { this.renderSportsmen() }
            </tbody></table>
        );
    }
}

class ParticipantsStats extends React.Component {
    hashSportsman(s) {
        return `${s.last_name}\n${s.first_name}\n${s.year_of_birth}\n${s.gender}`;
    }
    countSportsmen(participants) {
        let found = {};
        participants.forEach(p => {
            p.sportsmen.forEach(s => {
                let hash = this.hashSportsman(s);
                found[hash] = true;
            })
        });
        return Object.keys(found).length;
    }
    render() {
        if (this.props.table_row) {
            return (
                <tr>
                    <th className="w-66"><p className="text-left">{ this.props.label }</p></th>
                    <td className="w-17"><p className="text-left">{ _("admin.phrases.n_participants", this.props.participants.length) }</p></td>
                    <td className="w-17"><p className="text-left">{ _("admin.phrases.n_sportsmen", this.countSportsmen(this.props.participants)) }</p></td>
                </tr>
            )
        }
        return (
            <p className="text-right">
                <strong>
                    { _("admin.phrases.total_n_participants", this.props.participants.length) }{", "}
                    { _("admin.phrases.n_sportsmen", this.countSportsmen(this.props.participants)) }
                </strong>
            </p>
        );
    }
}

class Acrobatics extends React.Component {
    render() {
        let p = this.props.participant;
        return (
            <tr className="tr-acro"><td className="acro" colSpan="5">
                <table className="inner"><tbody>
                    { p.programs.map((pr, pr_idx) =>
                        [<tr key={ "H" + pr_idx }>
                            <th colSpan="3"><p className="text-left">{ pr.name }</p></th>
                        </tr>].concat(
                            pr.acrobatics.map((a, a_idx) =>
                                <tr key={ `A_${pr_idx}_${a_idx}` }>
                                    <td className="w-3"><p className="text-left">{ a_idx + 1 }</p></td>
                                    <td className="w-90"><p className="text-left">{ a.description }</p></td>
                                    <td className="w-7"><p className="text-right">{ a.score.toFixed(1) }</p></td>
                                </tr>
                            )
                        )
                    ) }
                </tbody></table>
            </td></tr>
        );
    }
}
