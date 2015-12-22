class ScreenOperatorTourSelector extends React.Component {
    expandSelect(original_event) {
        original_event.preventDefault();
        original_event.stopPropagation();
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        this.refs.select.dispatchEvent(e);
    }
    render() {
        let options = [];
        this.props.competition.disciplines.forEach((discipline) =>
            discipline.tours.forEach((tour) =>
                options.push(<option value={ tour.id } key={ tour.id }>
                    { discipline.name } &mdash; { tour.name + (tour.finalized ? " [over]" : "") }
                </option>)
            )
        );
        return <select value={ this.props.value }
                       className="form-control"
                       ref="select"
                       onChange={ (e) => this.props.onChange(e.target.value || null ) }
                       onTouchStart={ this.expandSelect.bind(this) }>
            <option value="">----------</option>
            { options }
        </select>
    }
}

class ScreenOperatorDisciplinePlaceSelector extends React.Component {
    render() {
        let options = [];
        this.props.competition.disciplines.forEach((discipline) =>
            options.push(<option value={ discipline.id } key={ discipline.id }>
                { discipline.name }
            </option>)
        );
        return <select value={ this.props.value }
                       className="form-control"
                       onChange={ (e) => this.props.onChange(e.target.value || null) }>
            <option value="">----------</option>
            { options }
        </select>
    }
}

class ScreenOperatorHeatSelectorRow extends React.Component {
    render() {
        return <table className={ "heat" + (this.props.selected ? " selected" : "") }
                {...onTouchEndOrClick(this.props.onClick)}>
            <tbody><tr>
                <td className="heat-number">
                    <div>{ this.props.heat }</div>
                    <div className="heat-label">{ _("screen_operator.labels.heat") }</div>
                </td>
                <td className="participants">
                    { this.props.runs.map((run) =>
                        <div className="participant" key={ run.id }>
                            <div className="number">{ run.participant.number }</div>
                            <div className="name">{ run.participant.name }</div>
                        </div>
                    ) }
                </td>
            </tr></tbody>
        </table>
    }
}

class ScreenOperatorHeatSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }
    componentWillMount() {
        if (this.props.tour_id === null) {
            return;
        }
        this.storage = storage.getDomain("tour_" + this.props.tour_id);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.loadData();
    }
    componentWillUnmount() {
        if (this.props.tour_id === null) {
            return;
        }
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        storage.delDomain("tour_" + this.props.tour_id);
    }
    reloadFromStorage() {
        var SCHEMA = {
            runs: {
                participant: {}
            },
        }
        let serialized = this.storage.get("Tour")
            .by_id(this.props.tour_id)
            .serialize(SCHEMA);
        this.setState({ tour: serialized });
    }
    loadData() {
        Api("tour.get", {
            tour_id: this.props.tour_id,
            children: {
                runs: {
                    participant: {}
                },
            }
        })
        .addToDB("Tour", this.props.tour_id, this.storage)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    render() {
        if (this.props.tour_id === null) {
            return null;
        }
        if (this.state.tour === null) {
            return <Loader />
        }
        let result = [];
        let max_heat = Math.max(...this.state.tour.runs.map((run) => run.heat));
        for (let heat = 1; heat <= max_heat; ++heat) {
            result.push(<ScreenOperatorHeatSelectorRow
                key={ heat }
                runs={ this.state.tour.runs.filter((run) => run.heat == heat) }
                heat={ heat }
                selected={ this.props.value == heat }
                onClick={ () => this.props.onHeatSelect(heat) } />)
        }
        return <div className="heat-selector">
            <button className="btn btn-sm btn-warning btn-reset-heat"
                    type="button"
                    { ...onTouchEndOrClick(() => this.props.onHeatSelect(null)) }>
                { _("screen_operator.buttons.reset_heat") }
            </button>
            { result }
        </div>
    }
}

class ScreenOperatorPlaceSelector extends React.Component {
    render() {
        if (this.props.discipline_id === null) {
            return null;
        }
        return <div>
            <button className="btn btn-sm btn-warning btn-reset-place"
                    type="button"
                    { ...onTouchEndOrClick(() => this.props.onChange(null)) }>
                { _("screen_operator.buttons.reset_place") }
            </button>
            <DisciplineResults
                discipline_id={ this.props.discipline_id }
                renderer="screen_operator"
                onPlaceSelect={ (place) => this.props.onChange(place) }
                selectedPlace={ this.props.value }
                key={ this.props.discipline_id } />
        </div>
    }
}

class ScreenOperatorTourHeatControls extends React.Component {
    onTourChange(new_value) {
        let new_state = clone(this.props.controls_state);
        new_state.tour_id = new_value;
        new_state.heat = null;
        this.props.onChange(new_state);
    }
    onHeatChange(new_value) {
        let new_state = clone(this.props.controls_state);
        new_state.heat = new_value;
        this.props.onChange(new_state);
    }
    render() {
        return <div>
            <h3>{ _("screen_operator.headers.tour") }</h3>
            <ScreenOperatorTourSelector
                competition={ this.props.competition }
                value={ this.props.controls_state.tour_id }
                onChange={ this.onTourChange.bind(this) } />
            <h3>{ _("screen_operator.headers.heat") }</h3>
            <ScreenOperatorHeatSelector
                key={ this.props.controls_state.tour_id }
                tour_id={ this.props.controls_state.tour_id }
                value={ this.props.controls_state.heat }
                onHeatSelect={ this.onHeatChange.bind(this) } />
        </div>
    }
}

class ScreenOperatorTourControls extends React.Component {
    onTourChange(new_value) {
        let new_state = clone(this.props.controls_state);
        new_state.tour_id = new_value;
        this.props.onChange(new_state);
    }
    render() {
        return <div>
            <h3>{ _("screen_operator.headers.tour") }</h3>
            <ScreenOperatorTourSelector
                competition={ this.props.competition }
                value={ this.props.controls_state.tour_id }
                onChange={ this.onTourChange.bind(this) } />
        </div>
    }
}

class ScreenOperatorDisciplinePlaceControls extends React.Component {
    onDisciplineChange(new_value) {
        let new_state = clone(this.props.controls_state);
        new_state.discipline_id = new_value;
        new_state.place = null;
        this.props.onChange(new_state);
    }
    onPlaceChange(new_value) {
        let new_state = clone(this.props.controls_state);
        new_state.place = new_value;
        this.props.onChange(new_state);
    }
    render() {
        return <div>
            <h3>{ _("screen_operator.headers.discipline") }</h3>
            <ScreenOperatorDisciplinePlaceSelector
                competition={ this.props.competition }
                value={ this.props.controls_state.discipline_id }
                onChange={ this.onDisciplineChange.bind(this) } />
            <h3>{ _("screen_operator.headers.places") }</h3>
            <ScreenOperatorPlaceSelector
                discipline_id={ this.props.controls_state.discipline_id }
                value={ this.props.controls_state.place }
                onChange={ this.onPlaceChange.bind(this) } />
        </div>
    }
}

class ScreenOperator extends React.Component {
    constructor(props) {
        super(props);
        this.manifest = new ScreenManifest(this.props.manifest)
        this.state = {
            competition: null,
            pending_data: null,
        };
        this.loadData();
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
    }
    loadData() {
        Api("competition.get", { competition_id: this.props.competition_id, children: {
            disciplines: {
                tours: {},
            },
        } })
            .addToDB("Competition", this.props.competition_id)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }
    submitData() {
        let data = this.state.pending_data || this.state.competition.screen_data;
        if (!this.validateControls(data)) {
            return;
        }
        Api("competition.set", {
            competition_id: this.props.competition_id,
            data: { screen_data: this.state.pending_data }
        }).onSuccess(() => this.setState({
            pending_data: null,
        })).send();
    }
    resetData() {
        this.setState({
            pending_data: null,
        });
    }
    reloadFromStorage() {
        this.setState({
            competition: storage.get("Competition")
                .by_id(this.props.competition_id)
                .serialize({
                    disciplines: {
                        tours: {},
                    },
                })
        })
    }
    getDefaultControlsState(controls_type) {
        switch (controls_type) {
            case "none":
                return {}
            case "tour-heat":
                return {
                    tour_id: null,
                    heat: 1,
                }
            case "tour":
                return {
                    tour_id: null,
                }
            case "discipline-place":
                return {
                    discipline_id: null,
                    place: null,
                }
        }
    }
    updateData(updater) {
        let data = this.state.pending_data ? clone(this.state.pending_data) : clone(this.state.competition.screen_data);
        data = updater(data);
        this.setState({
            pending_data: data,
        });
    }
    switchScreen(new_id) {
        this.updateData((data) => {
            if (data.screen_id != new_id) {
                let screen_data = this.manifest.getScreenDataById(new_id)
                let controls_type = screen_data.controls;
                data = {
                    screen_id: new_id,
                    controls_state: this.getDefaultControlsState(controls_type),
                };
            }
            return data;
        });
    }
    onControlsStateChange(new_value) {
        this.updateData((data) => {
            data.controls_state = new_value;
            return data;
        });
    }
    validateControls(data) {
        let controls_type = this.manifest.getScreenDataById(data.screen_id).controls;
        switch (controls_type) {
        case "none":
            return true;
        case "tour":
        case "tour-heat":
            return data.controls_state.tour_id !== null;
        case "discipline-place":
            return data.controls_state.discipline_id !== null;
        }
    }
    renderContols(data) {
        let controls_type = this.manifest.getScreenDataById(data.screen_id).controls;
        switch (controls_type) {
            case "none":
                return null
            case "tour-heat":
                return <ScreenOperatorTourHeatControls
                    key={ data.screen_id }
                    competition={ this.state.competition }
                    controls_state={ data.controls_state }
                    onChange={ this.onControlsStateChange.bind(this) } />
            case "tour":
                return <ScreenOperatorTourControls
                    key={ data.screen_id }
                    competition={ this.state.competition }
                    controls_state={ data.controls_state }
                    onChange={ this.onControlsStateChange.bind(this) } />
            case "discipline-place":
                return <ScreenOperatorDisciplinePlaceControls
                    key={ data.screen_id }
                    competition={ this.state.competition }
                    controls_state={ data.controls_state }
                    onChange={ this.onControlsStateChange.bind(this) } />
        }
    }
    render() {
        if (this.state.competition === null) {
            return <Loader />
        }
        let data = this.state.pending_data || this.state.competition.screen_data;
        return <div className="screen-operator">
            <div className="left-col">
                { this.manifest.raw_data.screens.map((screen_data) =>
                    <div className={ "item" + (screen_data.id == data.screen_id ? " active" : "")}
                         key={ screen_data.id }
                         {...onTouchOrClick(() => this.switchScreen(screen_data.id))}>
                        { screen_data.name }
                    </div>
                ) }
            </div>
            <div className="body">
                <div className="controls">
                    { this.renderContols(data) }
                </div>
                { this.state.pending_data
                    ? <div className="buttons">
                        <button type="button"
                                className="btn btn-danger"
                                {...onTouchOrClick(this.resetData.bind(this))}>
                            Reset
                        </button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={ !this.validateControls(data) }
                                {...onTouchOrClick(this.submitData.bind(this))}>
                            Submit
                        </button>
                    </div>
                    : null }
            </div>
        </div>
    }
}
