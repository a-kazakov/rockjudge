class AutoPrinterTableCell extends React.Component {
    render() {
        return <td className="input">
            <input
                type="text"
                value={ this.props.value }
                onChange={ (e) => this.props.onChange(parseInt(e.target.value.replace(/[^\d]/, "")) || 0) } />
        </td>
    }
}

class AutoPrinterTableRow extends React.Component {
    onChange(action, new_value) {
        let new_row = clone(this.props.row);
        new_row[action] = new_value;
        this.props.onChange(new_row);
    }
    render() {
        return <tr>
            <td className="discipline">{ `${this.props.tour.discipline.name} — ${this.props.tour.name}` }</td>
            { this.props.possibleActions.map((action) =>
                <AutoPrinterTableCell
                    key={ action }
                    value={ this.props.row[action] || "" }
                    onChange={ this.onChange.bind(this, action) } />
            ) }
        </tr>
    }
}

class AutoPrinterTable extends React.Component {
    onChange(tour_id, new_value) {
        let new_actions = clone(this.props.actions);
        new_actions[tour_id] = new_value;
        this.props.onChange(new_actions);
    }
    render() {
        return <table className="tours-table"><tbody>
            <tr>
                <th className="discipline">{ _("admin.auto_printer.discipline") }</th>
                <th>{ _("admin.auto_printer.heats") }</th>
                <th>{ _("admin.auto_printer.results_1") }</th>
                <th>{ _("admin.auto_printer.results_2") }</th>
                <th>{ _("admin.auto_printer.results_3") }</th>
                <th>{ _("admin.auto_printer.discipline_results") }</th>
            </tr>
            { this.props.tours.map((tour) =>
                <AutoPrinterTableRow
                    key={ tour.id }
                    tour={ tour }
                    row={ this.props.actions[tour.id] || {} }
                    possibleActions={ this.props.possibleActions }
                    onChange={ this.onChange.bind(this, tour.id) } />
            ) }
        </tbody></table>
    }
}

class AutoPrinterJobQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            nowRendering: null,
        };
        this.scheduleJob();
    }
    addJob(job_type, tour, copies) {
        let new_queue = clone(this.state.queue);
        new_queue.push({
            type: job_type,
            tour: tour,
            copies: copies,
            id: Math.random(),
        });
        this.setState({
            queue: new_queue,
        });
    }
    scheduleJob() {
        setTimeout(() => this.processJob(), 1000);
    }
    processJob() {
        if (this.state.nowRendering) {
            return;
        }
        let job = this.state.queue[0];
        if (!job) {
            this.scheduleJob();
            return;
        }
        this.setState({
            queue: this.state.queue.slice(1),
            nowRendering: job,
        });
        this.timer = setTimeout(this.retryJob.bind(this), 10000);
    }
    retryJob() {
        this.setState({
            queue: [this.state.nowRendering].concat(this.state.queue),
            nowRendering: null,
        });
        this.scheduleJob();
    }
    continueJob(filename) {
        clearTimeout(this.timer);
        this.setState({
            nowRendering: {
                type: "send-data",
                filename: filename,
                copies: this.state.nowRendering.copies,
            },
        });
        setTimeout(this.endJob.bind(this), 5000);
    }
    endJob() {
        this.setState({
            nowRendering: null,
        });
        this.scheduleJob();
    }
    createFilename() {
        return Math.random().toString().replace(/[^0-9]/, "") + ".tmp";
    }
    renderActiveJob() {
        if (!this.state.nowRendering) {
            return null;
        }
        switch (this.state.nowRendering.type) {
        case "send-data":
            return <iframe src={ "http://127.0.0.1:5949/print-docx?filename=" +
                this.state.nowRendering.filename + "&copies=" + this.state.nowRendering.copies } />
        case "heats":
            return <HeatsBody
                tour_id={ this.state.nowRendering.tour.id}
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "results_1":
            return <TourResultsBody
                tour_id={ this.state.nowRendering.tour.id}
                verbosity="1"
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "results_2":
            return <TourResultsBody
                tour_id={ this.state.nowRendering.tour.id}
                verbosity="2"
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "results_3":
            return <TourResultsBody
                tour_id={ this.state.nowRendering.tour.id}
                verbosity="3"
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        case "discipline_results":
            return <DisciplineResults
                discipline_id={ this.state.nowRendering.tour.discipline.id }
                autoDocx={{ filename: this.createFilename(), callback: this.continueJob.bind(this) }} />
        }
        return null;
    }
    render() {
        return <div className="queue">
            { this.state.queue.map((item) =>
                <div className="row" key={ item.id }>
                    <div className="name">
                        { `${item.tour.discipline.name} — ${item.tour.name}` }
                    </div>
                    <div className="type">
                        { _("admin.auto_printer." + item.type) }
                    </div>
                    <div className="copies">
                        { item.copies }
                    </div>
                </div>
            ) }
            <div className="hidden-container">
                { this.renderActiveJob() }
            </div>
        </div>
    }
}

class AutoPrinter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: null,
            actions: {},
        };
        this.SCHEMA = {
            disciplines: {
                tours: {},
            },
        };
        this.POSSIBLE_ACTIONS = ["heats", "results_1", "results_2", "results_3", "discipline_results"];
        this.loadData();
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
    }
    loadData() {
        Api("competition.get", { competition_id: this.props.competition_id, children: this.SCHEMA })
            .addToDB("Competition", this.props.competition_id)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }
    reloadFromStorage() {
        let new_competition = storage.get("Competition").by_id(this.props.competition_id);
        if (!new_competition) {
            return;
        }
        new_competition = new_competition.serialize(this.SCHEMA);
        if (this.state.competition) {
            this.dispatchCompetitionUpdate(this.state.competition, new_competition);
        }
        this.setState({
            competition: new_competition,
        });
    }
    getToursFromCompetition(competition) {
        let result = [];
        competition.disciplines.forEach((discipline) =>
            discipline.tours.forEach((tour) => {
                let r = clone(tour);
                r.discipline = discipline;
                result.push(r);
            } )
        )
        return result;
    }
    getToursMap(tours) {
        let result = {};
        tours.forEach((tour) => result[tour.id] = tour);
        return result;
    }
    dispatchCompetitionUpdate(old_competition, new_competition) {
        let old_tours = this.getToursMap(this.getToursFromCompetition(old_competition));
        let new_tours = this.getToursMap(this.getToursFromCompetition(new_competition));
        Object.keys(old_tours).forEach((tour_id) => {
            if (!new_tours[tour_id]) {
                return;
            }
            if (!old_tours[tour_id].finalized && new_tours[tour_id].finalized) {
                this.doActionsForTour(new_tours[tour_id]);
            }
        });
    }
    getNextTour(tour) {
        let result = null;
        this.state.competition.disciplines.forEach((discipline) => {
            let found = false;
            discipline.tours.forEach((d_tour) => {
                if (d_tour.id == tour.id) {
                    found = true;
                } else if (found) {
                    let r = clone(d_tour);
                    r.discipline = discipline;
                    result = r;
                    found = false;
                }
            } )
        } )
        return result;
    }
    doTheJob(tour, action_type, copies) {
        if (action_type == "heats") {
            tour = this.getNextTour(tour);
        }
        if (!tour) {
            return;
        }
        this.refs.queue.addJob(action_type, tour, copies);
    }
    doActionsForTour(tour) {
        let actions = this.state.actions[tour.id];
        if (!actions) {
            return;
        }
        this.POSSIBLE_ACTIONS.forEach((action_type) => {
            if (actions[action_type]) {
                this.doTheJob(tour, action_type, actions[action_type]);
            }
        } );
    }
    render() {
        if (!this.state.competition) {
            return <Loader />
        }
        return <div className="auto-printer">
            <div className="section-table">
                <AutoPrinterTable
                    tours={ this.getToursFromCompetition(this.state.competition) }
                    actions={ this.state.actions }
                    onChange={ (new_actions) => this.setState({ actions: new_actions }) }
                    possibleActions={ this.POSSIBLE_ACTIONS } />
            </div>
            <div className="section-queue">
                <AutoPrinterJobQueue ref="queue" />
            </div>
        </div>
    }
}