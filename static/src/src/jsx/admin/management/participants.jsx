import { _ } from "l10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";
import { showConfirm, showError } from "ui/dialogs";
import { clone } from "common/tools";


export class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
        };
    }
    componentWillMount() {
        this.storage = storage.getDomain(`participants_${this.props.discipline_id}`);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.loadData();
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        storage.delDomain(`participants_${this.props.discipline_id}`);
    }
    reloadFromStorage() {
        var SCHEMA = {
            competition: {
                clubs: {},
            },
            participants: {
                club: {},
                programs: {},
            },
        };
        let serialized = this.storage.get("Discipline")
            .by_id(this.props.discipline_id)
            .serialize(SCHEMA);
        this.setState(serialized);
    }
    loadData() {
        Api("discipline.get", {
            discipline_id: this.props.discipline_id,
            children: {
                competition: {
                    clubs: {},
                },
                participants: {
                    club: {},
                    programs: {},
                },
            }
        })
        .addToDB("Discipline", this.props.discipline_id, this.storage)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    renderTable() {
        let rows = this.state.participants.map((participant) =>
            <ParticipantRow
                key={ participant.id }
                participant={ participant }
                clubs={ this.state.competition.clubs } />
        );
        return <div className="manage-participants">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="number">{ _("models.participant.number") }</th>
                        <th className="name">{ _("models.participant.name") }</th>
                        <th className="club-name">{ _("models.participant.club_name") }</th>
                        <th className="club-city">{ _("models.participant.club_city") }</th>
                        <th className="delete"></th>
                    </tr>
                    { rows }
                    <ParticipantCreationRow
                        clubs={ this.state.competition.clubs }
                        discipline_id={ this.props.discipline_id } />
                </tbody>
            </table>
            <div className="total-participants">
                { _("admin.phrases.total_n_participants", this.state.participants.length) }
            </div>
        </div>
    }
    render() {
        if (this.state.name === null) {
            return <Loader />
        }
        return <div className="app-content">
            <header className="app-header">
                <h1>{ this.state.name }</h1>
                <h2>{ _("admin.headers.participants_management") }</h2>
            </header>
            <div className="app-body">
                { this.renderTable() }
            </div>
        </div>
    }
} // DONE

class ClubsSelector extends React.Component {
    renderList() {
        return this.props.clubs.map((club) =>
            <option value={ club.id } key={ club.id }>{ club.name }</option>
        );
    }
    render() {
        return <select
                className="full-width"
                value={ this.props.club_id }
                onChange={ this.props.onChange }>
            { this.renderList() }
        </select>
    }
} // DONE

class ParticipantEditorRowGeneralInfo extends React.Component {
    genOnChange(field) {
        return (event) => this.props.onChange(field, event.target.value);
    }
    render() {
        return <div>
            <h4>{ _("models.participant.general_info") }</h4>
            <input
                placeholder={ _("models.participant.number") }
                className="full-width"
                value={ this.props.participant.number }
                onChange={ this.genOnChange("number") } />
            <ClubsSelector
                className="full-width"
                participant={ this.props.participant }
                club_id={ this.props.participant.club_id }
                clubs={ this.props.clubs }
                onChange={ this.genOnChange("club_id") } />
            <input
                placeholder={ _("models.participant.coaches") }
                className="full-width"
                value={ this.props.participant.coaches }
                onChange={ this.genOnChange("coaches") } />
            <input
                placeholder={ _("models.participant.formation_name") }
                className="full-width"
                value={ this.props.participant.formation_name }
                onChange={ this.genOnChange("formation_name") } />
        </div>
    }
} // DONE

class ParticipantEditorRowSportsman extends React.Component {
    genOnChange(field) {
        return event => this.props.onChange(field, event.target.value);
    }
    genOnSubstituteChange() {
        return event => this.props.onChange("substitute", event.target.value === "Y");
    }
    render() {
        return <div className="sportsman">
            <input
                type="text"
                className="last-name"
                placeholder={ _("models.participant.last_name") }
                value={ this.props.sportsman.last_name }
                onChange={ this.genOnChange("last_name") } />
            <input
                type="text"
                className="first-name"
                placeholder={ _("models.participant.first_name") }
                value={ this.props.sportsman.first_name }
                onChange={ this.genOnChange("first_name") } />
            <input
                type="text"
                className="yob"
                placeholder={ _("models.participant.yob") }
                value={ this.props.sportsman.year_of_birth }
                onChange={ this.genOnChange("year_of_birth") } />
            <select
                    className="gender"
                    value={ this.props.sportsman.gender }
                    onChange={ this.genOnChange("gender") }>
                <option value="F">{ _("models.participant.gender_f") }</option>
                <option value="M">{ _("models.participant.gender_m") }</option>
            </select>
            <select
                    className="substitute"
                    value={ this.props.sportsman.substitute ? "Y" : "N" }
                    onChange={ this.genOnSubstituteChange() }>
                <option value="N">{ _("models.participant.substitute_n") }</option>
                <option value="Y">{ _("models.participant.substitute_y") }</option>
            </select>
            <button
                type="button"
                className="del btn btn-danger"
                onClick={ this.props.onSportsmanRemove }>X</button>
        </div>
    }
} // DONE

class ParticipantEditorRowSportsmenList extends React.Component {
    genOnChange(idx) {
        return (field, value) => {
            let list = clone(this.props.sportsmen);
            list[idx][field] = value;
            this.props.onChange("sportsmen", list);
        }
    }
    addSportsman() {
        let list = clone(this.props.sportsmen);
        list.push({
            "last_name": "",
            "first_name": "",
            "year_of_birth": "0",
            "gender": "F",
            "substitute": false,
        });
        this.props.onChange("sportsmen", list);
    }
    removeSportsman(idx) {
        let list = clone(this.props.sportsmen);
        list.splice(idx, 1);
        this.props.onChange("sportsmen", list);
    }
    render() {
        return <div>
            <h4>{ _("models.participant.sportsmen") }</h4>
            { this.props.sportsmen.map((sp, idx) =>
                <ParticipantEditorRowSportsman
                    key={ idx }
                    sportsman={ sp }
                    onSportsmanRemove={ this.removeSportsman.bind(this, idx) }
                    onChange={ this.genOnChange(idx) } />
            ) }
            <button
                type="button"
                className="full-width btn btn-sm btn-default"
                onClick={ this.addSportsman.bind(this) }>{ _("global.buttons.add") }</button>
        </div>
    }
} // DONE

class ParticipantEditorRowProgramEditorElement extends React.Component {
    genOnChange(field) {
        return (event) => this.props.onChange(field, event.target.value);
    }
    render() {
        return <div className="acrobatic">
            <input
                type="text"
                className="description"
                placeholder={ _("models.participant.acro_description") }
                value={ this.props.element.description }
                onChange={ this.genOnChange("description") } />
            <input
                type="text"
                className="score"
                placeholder={ _("models.participant.acro_score") }
                value={ this.props.element.score }
                onChange={ this.genOnChange("score") } />
            <button
                type="button"
                className="del btn btn-danger"
                onClick={ this.props.onElementRemove }>X</button>
        </div>
    }
} // DONE

class ParticipantEditorRowProgramEditorElements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: clone(this.props.elements),
        };
    }
    changeElements(func) {
        let elements = clone(this.state.elements);
        elements = func(elements);
        this.setState({elements});
    }
    onChange(idx, field, value) {
        this.changeElements((elements) => {
            elements[idx][field] = value;
            return elements;
        });
    }
    addElement() {
        this.changeElements((elements) => {
            elements.push({
                description: "",
                score: 0,
            });
            return elements;
        });
    }
    removeElement(idx) {
        this.changeElements((elements) => {
            elements.splice(idx, 1);
            return elements;
        });
    }
    load(data) {
        this.setState({
            elements: data.map(e => ({
                description: e[0],
                score: e[1],
            })),
        });
    }
    serialize() {
        return this.state.elements.map(element => ({
            description: element.description,
            score: parseFloat(element.score) || 0,
        }));
    }
    render() {
        return <div className="elements">
            { this.state.elements.map((element, idx) =>
                <ParticipantEditorRowProgramEditorElement
                    key={ idx }
                    element={ element }
                    onChange={ this.onChange.bind(this, idx) }
                    onElementRemove={ this.removeElement.bind(this, idx) }/>
            ) }
            <button type="button" className="btn btn-sm btn-default full-width" onClick={ this.addElement.bind(this) }>
                { _("global.buttons.add") }
            </button>
        </div>
    }
} // DONE

class ParticipantEditorRowProgramEditor extends React.Component {
    loadAcrobatics() {
        swal({
            title: _("admin.headers.load_acrobatics"),
            text: _("admin.labels.paste_acro"),
            showCancelButton: true,
            closeOnConfirm: false,
            type: "input",
            animation: false,
        }, value => {
            try {
                let data = JSON.parse(value);
                this.refs.elements_editor.load(data);
                swal.close();
            }
            catch (SyntaxError) {
                showError(_("errors.admin.load_syntax_error"));
            }
        });
    }
    serialize() {
        return {
            name: this.refs.name.value,
            default_for: this.refs.default_for.value,
            acrobatics: this.refs.elements_editor.serialize(),
        }
    }
    render() {
        let classes = ["program-editor"];
        if (this.props.creating) {
            classes.push("create")
        }
        return <form className={ classes.join(" ") } onSubmit={ e => { e.preventDefault(); this.props.onSubmit(this.serialize()) } }>
            <input
                ref="name"
                className="name"
                defaultValue={ this.props.program.name || "" }
                placeholder={ _("models.program.name") } />
            <input
                ref="default_for"
                className="default-for"
                defaultValue={ this.props.program.default_for || "" }
                placeholder={ _("models.program.default_for") } />
            <ParticipantEditorRowProgramEditorElements
                ref="elements_editor"
                elements={ this.props.program.acrobatics || [] } />
            <div className="pull-right">
                <button type="button" className="btn btn-sm btn-default" onClick={ this.loadAcrobatics.bind(this) }>
                    { _("admin.buttons.load_acro") }
                </button>
            </div>
            <button className="btn btn-sm btn-primary">
                { _("global.buttons.submit") }
            </button>
            <button type="button" className="btn btn-sm btn-danger" onClick={ this.props.onStopEditing }>
                { _("global.buttons.discard") }
            </button>
        </form>
    }
} // DONE

class ParticipantEditorRowProgramCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
    }
    startEditing() {
        this.setState({
            editing: true,
        });
    }
    onSubmit(data) {
        Api("program.create", { participant_id: this.props.participant_id, data: data })
            .onSuccess(this.stopEditing.bind(this))
            .send();
    }
    renderBody() {
        if (this.state.editing) {
            return <ParticipantEditorRowProgramEditor
                creating
                onSubmit={ this.onSubmit.bind(this) }
                onStopEditing={ this.stopEditing.bind(this) }
                program={ {} } />
        }
        return <button type="button" className="btn btn-sm btn-default full-width" onClick={ this.startEditing.bind(this) }>
            { _("global.buttons.add") }
        </button>
    }
    render() {
        return <div className="program-creator">
            { this.renderBody() }
        </div>
    }
} // DONE

class ParticipantEditorRowProgram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
    }
    startEditing() {
        this.setState({
            editing: true,
        });
    }
    onDelClick(event) {
        event.preventDefault();
        showConfirm(_("admin.confirms.delete_program"), () => {
            Api("program.delete", { program_id: this.props.program.id }).onSuccess(() => swal.close()).send();
        });
    }
    onSubmit(data) {
        Api("program.set", { program_id: this.props.program.id, data: data })
            .onSuccess(this.stopEditing.bind(this))
            .send();
    }
    render() {
        if (this.state.editing) {
            return <ParticipantEditorRowProgramEditor
                onSubmit={ this.onSubmit.bind(this) }
                onStopEditing={ this.stopEditing.bind(this) }
                {...this.props} />
        }
        return <div>
            <h5>
                { this.props.program.name }
                { this.props.program.default_for ? <em>&nbsp;({ this.props.program.default_for })</em> : null }
                &nbsp;/&nbsp;<a href="#" onClick={ (e) => { e.preventDefault(); this.startEditing(); } }>Редактировать</a>
                &nbsp;/&nbsp;<a href="#" onClick={ this.onDelClick.bind(this) }>Удалить</a>
            </h5>
            <table className="full-width program"><tbody>
            { this.props.program.acrobatics.map((element, idx) =>
                <tr key={ idx }>
                    <td>{ element.description }</td>
                    <td className="text-right">{ element.score.toFixed(1) }</td>
                </tr>
            ) }
            </tbody></table>
        </div>
    }
} // DONE

class ParticipantEditorRowPrograms extends React.Component {
    render() {
        return <div>
            <h4>{ _("models.participant.programs") }</h4>
            { this.props.programs.map((p) =>
                <ParticipantEditorRowProgram
                    key={ p.id }
                    program={ p } />
            ) }
            { this.props.newParticipant
                ? <div className="alert alert-info">{ _("admin.alerts.add_programs_after_creation") }</div>
                : <ParticipantEditorRowProgramCreator
                    participant_id={ this.props.participant_id }/>
            }
        </div>
    }
} // DONE

class ParticipantEditorRow extends React.Component {
    constructor(props) {
        super(props);
        let p = this.props.participant;
        this.state = {
            participant: {
                number: p.number,
                club_id: p.club.id,
                coaches: p.coaches,
                formation_name: p.formation_name,
                sportsmen: clone(p.sportsmen),
            }
        };
    }
    onChange(field, value) {
        let participant = clone(this.state.participant);
        participant[field] = value;
        this.setState({
            participant: participant,
        });
    }
    sertialize() {
        return this.state.participant;
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newParticipant) {
            Api("participant.set", {
                participant_id: this.props.participant.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("participant.create", {
                discipline_id: this.props.discipline_id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        return <tr className={ "editor" + (this.props.newParticipant ? " create" : "" ) }>
            <td colSpan="6">
                <div className="row">
                    <div className="col-md-7">
                        <form onSubmit={ this.onSubmit.bind(this) } className="row">
                            <div className="col-md-5 general-info">
                                <ParticipantEditorRowGeneralInfo
                                    participant={ this.state.participant }
                                    clubs={ this.props.clubs }
                                    onChange={ this.onChange.bind(this) } />
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
                            <div className="col-md-7">
                                <ParticipantEditorRowSportsmenList
                                    sportsmen={ this.state.participant.sportsmen }
                                    onChange={ this.onChange.bind(this) } />
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5">
                        <ParticipantEditorRowPrograms
                            newParticipant={ this.props.newParticipant }
                            participant_id={ this.props.participant.id }
                            programs={ this.props.participant.programs }
                            onChange={ this.onChange.bind(this) } />
                    </div>
                </div>
            </td>
        </tr>
    }
} // DONE

class ParticipantRow extends React.Component {
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
        showConfirm(_("admin.confirms.delete_participant"), () => {
            Api("participant.delete", {
                participant_id: this.props.participant.id,
            }).onSuccess(() => swal.close()).send();
        });
    }
    renderEditor() {
        return <ParticipantEditorRow
            newParticipant={ false }
            stopEditing={ this.stopEditing.bind(this) }
            { ...this.props } />
    }
    renderViewer() {
        let p = this.props.participant;
        return <tr className="viewer" onClick={ this.startEditing.bind(this) }>
            <td className="number">{ p.number }</td>
            <td className="name">{ p.name }</td>
            <td className="club-name">{ p.club.name }</td>
            <td className="club-city">{ p.club.city }</td>
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
} // DONE

class ParticipantCreationRow extends React.Component {
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
            "formation_name": "",
            "coaches": "",
            "number": "",
            "club": { "id": this.props.clubs[0] ? this.props.clubs[0].id : null },
            "sportsmen": [],
            "acrobatics": [],
            "programs": [],
        }
        return <ParticipantEditorRow
            newParticipant
            stopEditing={ this.stopEditing.bind(this) }
            participant={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="6">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>{ _("admin.buttons.add_participant") }</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
} // DONE
