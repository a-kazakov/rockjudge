class ParticipantEditorRow extends React.Component {
    constructor(props) {
        super(props);
        let state = $.extend({}, this.props.participant);
        state.club_id = state.club.id;
        this.state = state;
        this.latest_added = "base";
    }
    onChange(group, idx, field, type, event) {
        let new_value = event.target.value;
        let state = $.extend({}, this.state, true);
        switch (type) {
        case "number":
            new_value = new_value.replace(/\D+/, "");
            break;
        case "score":
            new_value = new_value.replace(/[^\d.]+/, "");
            break;
        }
        switch (group) {
        case "sp":
            state.sportsmen[idx][field] = new_value;
            break;
        case "acro":
            state.acrobatics[idx][field] = new_value;
            break;
        case "":
            state[field] = new_value;
        }
        this.setState(state);
    }
    addSportsman() {
        let sportsmen = $.extend([], this.state.sportsmen);
        let new_idx = sportsmen.length;
        sportsmen.push({
            last_name: "",
            first_name: "",
            year_of_birth: 2000,
            gender: "F",
        });
        this.latest_added = "sp" + new_idx;
        this.setState({
            sportsmen: sportsmen,
        });
    }
    addAcrobatic() {
        let acrobatics = $.extend([], this.state.acrobatics);
        let new_idx = acrobatics.length;
        acrobatics.push({
            description: "",
            score: 0,
        });
        this.latest_added = "acro" + new_idx;
        this.setState({
            acrobatics: acrobatics,
        });
    }
    removeSportsman(idx) {
        let sportsmen = $.extend([], this.state.sportsmen);
        sportsmen.splice(idx, 1);
        this.setState({
            sportsmen: sportsmen,
        });
    }
    removeAcrobatic(idx) {
        let acrobatics = $.extend([], this.state.acrobatics);
        acrobatics.splice(idx, 1);
        this.setState({
            acrobatics: acrobatics,
        });
    }
    sertialize() {
        return {
            number: this.state.number,
            club_id: this.state.club_id,
            formation_name: this.state.formation_name,
            acrobatics: this.state.acrobatics.map(function(acro) {
                return {
                    description: acro.description,
                    score: acro.score,
                };
            }),
            sportsmen: this.state.sportsmen.map(function(sp) {
                return {
                    last_name: sp.last_name,
                    first_name: sp.first_name,
                    year_of_birth: sp.year_of_birth,
                    gender: sp.gender,
                };
            }),
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if (!this.props.newParticipant) {
            Api("tournaments.participant.set", {
                participant_id: this.state.id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        } else {
            Api("tournaments.participant.create", {
                inner_competition_id: this.props.inner_competition_id,
                data: this.sertialize(),
            }).onSuccess(this.props.stopEditing).send();
        }
    }
    render() {
        let sportsmen = this.state.sportsmen.map(function(sp, idx) {
            return <div className="sportsman" key={ idx }>
                <input
                    tabIndex={ 1000 + 10 * idx + 1 }
                    ref={ function(e) {
                        if (e && this.latest_added == "sp" + idx.toString()) {
                            e.getDOMNode().select();
                            this.latest_added = null;
                        };
                    }.bind(this)}
                    type="text"
                    className="last-name"
                    placeholder="Last name"
                    value={ sp.last_name }
                    onChange={ this.onChange.bind(this, "sp", idx, "last_name", "any") } />
                <input
                    tabIndex={ 1000 + 10 * idx + 2 }
                    type="text"
                    className="first-name"
                    placeholder="First name"
                    value={ sp.first_name }
                    onChange={ this.onChange.bind(this, "sp", idx, "first_name", "any") } />
                <input
                    tabIndex={ 1000 + 10 * idx + 3 }
                    type="text"
                    className="yob"
                    placeholder="YOB"
                    value={ sp.year_of_birth }
                    onChange={ this.onChange.bind(this, "sp", idx, "year_of_birth", "number") } />
                <select
                        tabIndex={ 1000 + 10 * idx + 3 }
                        className="gender"
                        value={ sp.gender }
                        onChange={ this.onChange.bind(this, "sp", idx, "gender", "any") }>
                    <option value="F">F</option>
                    <option value="M">M</option>
                </select>
                <button
                    type="button"
                    className="del"
                    onClick={ this.removeSportsman.bind(this, idx) }>X</button>
            </div>;
        }.bind(this));
        let acrobatics = this.state.acrobatics.map(function(acro, idx) {
            return <div className="acrobatic" key={ idx }>
                <input
                    tabIndex={ 2000 + 10 * idx + 1 }
                    ref={ function(e) {
                        if (e && this.latest_added == "acro" + idx.toString()) {
                            e.getDOMNode().select();
                            this.latest_added = null;
                        };
                    }.bind(this)}
                    type="text"
                    className="description"
                    placeholder="Description"
                    value={ acro.description }
                    onChange={ this.onChange.bind(this, "acro", idx, "description", "any") } />
                <input
                    tabIndex={ 2000 + 10 * idx + 2 }
                    type="text"
                    className="score"
                    placeholder="Score"
                    value={ acro.score }
                    onChange={ this.onChange.bind(this, "acro", idx, "score", "score") } />
                <button
                    type="button"
                    className="del"
                    onClick={ this.removeAcrobatic.bind(this, idx) }>X</button>
            </div>;
        }.bind(this));
        let clubs = this.props.clubs.map(function(club) {
            return <option value={ club.id } key={ club.id }>{ club.name }</option>
        });
        return <tr className={ "editor" + (this.props.newParticipant ? " create" : "" ) }>
            <td colSpan="5">
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="row">
                        <div className="col-md-3 general-info">
                            <h4>General info</h4>
                            <input
                                tabIndex="1"
                                ref={ function(e) {
                                    if (e && this.latest_added == "base") {
                                        e.getDOMNode().select();
                                        this.latest_added = null;
                                    };
                                }.bind(this)}
                                placeholder="Number"
                                className="full-width"
                                value={ this.state.number }
                                onChange={ this.onChange.bind(this, "", null, "number", "number") } />
                            <select
                                    tabIndex="2"
                                    className="full-width"
                                    value={ this.state.club_id }
                                    onChange={ this.onChange.bind(this, "", null, "club_id", "any") }>
                                { clubs }
                            </select>
                            <input
                                tabIndex="3"
                                placeholder="Formation name"
                                className="full-width"
                                value={ this.state.formation_name }
                                onChange={ this.onChange.bind(this, "", null, "formation_name", "any") } />
                            <div className="buttons">
                                <button
                                    tabIndex="10000"
                                    type="submit"
                                    className="btn btn-primary">Submit</button>
                                <button
                                    tabIndex="10001"
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={ this.props.stopEditing }>Discard</button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h4>Sportsmen</h4>
                            { sportsmen }
                            <button
                                tabIndex="1999"
                                type="button"
                                className="full-width btn btn-sm btn-default"
                                onClick={ this.addSportsman.bind(this) }>Add</button>
                        </div>
                        <div className="col-md-5">
                            <h4>Acrobatics</h4>
                            { acrobatics }
                            <button
                                tabIndex="2999"
                                type="button"
                                className="full-width btn btn-sm btn-default"
                                onClick={ this.addAcrobatic.bind(this) }>Add</button>
                        </div>
                    </div>
                </form>
            </td>
        </tr>
    }
}

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
        if (confirm("Are you sure want to delete this participant?")) {
            Api("tournaments.participant.delete", {
                participant_id: this.props.participant.id,
            }).send();
        }
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
}

class CreationRow extends React.Component {
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
            "number": "",
            "club": { "id": null },
            "sportsmen": [],
            "acrobatics": [],
        }
        return <ParticipantEditorRow
            newParticipant={ true }
            stopEditing={ this.stopEditing.bind(this) }
            participant={ empty_data }
            { ...this.props } />;
    }
    renderButton() {
        return <tr><td colSpan="5">
            <button
                type="button"
                className="btn btn-default full-width"
                onClick={ this.startEditing.bind(this) }>Add new participant</button>
        </td></tr>
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

class ParticipantsManager extends React.Component {
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
        let serialized = storage.get("InnerCompetition")
            .by_id(this.props.inner_competition_id)
            .serialize();
        this.setState(serialized);
    }
    loadData() {
        Api("tournaments.inner_competition.get", {
            inner_competition_id: this.props.inner_competition_id,
            children: {
                competition: {
                    clubs: {},
                },
                participants: {
                    acrobatics: {},
                    club: {},
                    sportsmen: {},
                },
            }
        })
        .updateDB("InnerCompetition", this.props.inner_competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    renderTable() {
        let rows = this.state.participants.map(function(participant) {
            return <ParticipantRow
                key={ participant.id }
                participant={ participant }
                clubs={ this.state.competition.clubs } />;
        }.bind(this));
        return <div className="manage-participants">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="number">Number</th>
                        <th className="name">Participant</th>
                        <th className="club-name">Club</th>
                        <th className="club-city">City</th>
                        <th className="delete">Delete</th>
                    </tr>
                    { rows }
                    <CreationRow
                        clubs={ this.state.competition.clubs }
                        inner_competition_id={ this.props.inner_competition_id } />
                </tbody>
            </table>
        </div>
    }
    render() {
        if (this.state.name === null) {
            return <span>Loading ...</span>;
        }
        return <div>
            <header>
                <h1>{ this.state.name }</h1>
                <h2>Participants management</h2>
            </header>
            { this.renderTable() }
        </div>;
    }
}
