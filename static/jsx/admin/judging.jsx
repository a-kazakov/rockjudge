class CompetitionSchema extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort_by_plan: !!parseInt(sessionStorage["sort_by_plan"]),
        };
    }
    activateTour(tour) {
        this.props.updateTour(tour.id);
    }
    switchToPlan() {
        this.setState({
            sort_by_plan: true,
        });
        sessionStorage["sort_by_plan"] = "1";
    }
    switchToDisciplines() {
        this.setState({
            sort_by_plan: false,
        });
        sessionStorage["sort_by_plan"] = "0";
    }
    renderTour(tour, discipline_name=null) {
        var className = "level-2" +
            (tour.finalized ? " grey" : "") +
            (tour.id == this.props.current_tour_id ? " active" : "");
        return <div className={ className } onClick={ this.activateTour.bind(this, tour) } key={ tour.id } >
            { discipline_name ? <small><strong>{ discipline_name }</strong><br /></small> : null}
            { tour.name }
        </div>
    }
    renderDiscipline(ic) {
        return <details className="block" key={ ic.id } open={ !!parseInt(sessionStorage.getItem("D_J_" + ic.id)) }>
            <summary className="level-1" onClick={ (e) => sessionStorage.setItem("D_J_" + ic.id, e.target.parentNode.open ? 0 : 1) }>
                { ic.name }
            </summary>
            { ic.tours.map((tour) => this.renderTour(tour)) }
        </details>
    }
    renderByDiscipline() {
        var data = this.props.disciplines.map(function(ic) {
            return this.renderDiscipline(ic);
        }.bind(this));
        return <div className="noselect">{ data }</div>;
    }
    renderByPlan() {
        let tours = {};
        this.props.disciplines.forEach((discipline) =>
            discipline.tours.forEach((tour) => tours[tour.id] = {
                tour: tour,
                discipline_name: discipline.name,
            })
        )
        let result = this.props.competition_plan.filter((item) => item.tour_id !== null).map((item) =>
            this.renderTour(tours[item.tour_id].tour, tours[item.tour_id].discipline_name)
        );
        return <div>{ result }</div>;
    }
    renderList() {
        return <div>
            { this.state.sort_by_plan ? this.renderByPlan() : this.renderByDiscipline() }
        </div>
    }
    renderButton() {
        return this.state.sort_by_plan
            ? <button className="btn btn-default btn-sm full-width" onClick={ this.switchToDisciplines.bind(this) }>
                { _("admin.buttons.switch_to_disciplines") }
            </button>
            : <button className="btn btn-default btn-sm full-width" onClick={ this.switchToPlan.bind(this) }>
                { _("admin.buttons.switch_to_plan") }
            </button>
    }
    render() {
        return <div className="competition-schema">
            { this.renderList() }
            { this.renderButton() }
        </div>
    }
}

class JudgingUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tour_id: this.getTourIdFromHash(),
            page: this.getPageFromHash(),
        };
    }
    switchActiveTour(new_tour_id) {
        this.setState({
            active_tour_id: new_tour_id,
            page: this.getActiveTour(new_tour_id).finalized ? "results-1" : "tour-admin",
        });
        window.location.hash = "#judging/" + new_tour_id;
    }
    switchPage(new_page, event) {
        event.preventDefault();
        this.setState({
            page: new_page,
        });
        window.location.hash = "#judging/" + this.state.active_tour_id + "/" + new_page;
    }
    getTourIdFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[1] && /^\d+$/.test(chunks[1])) {
            return parseInt(chunks[1]);
        }
        return null;
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[2]) {
            return chunks[2];
        }
        let active_tour = this.getActiveTour(this.getTourIdFromHash());
        return (active_tour && active_tour.finalized) ? "results-1" : "tour-admin";
    }
    getActiveTour(active_tour_id=this.state.active_tour_id) {
        if (active_tour_id === null) {
            return null;
        }
        let result = null;
        this.props.disciplines.forEach((discipline) => {
            discipline.tours.forEach((tour) => {
                if (tour.id == active_tour_id) {
                    result = tour;
                }
            })
        });
        return result;
    }
    getActiveDiscipline() {
        let result = null;
        this.props.disciplines.forEach((discipline) => {
            discipline.tours.forEach((tour) => {
                if (tour.id == this.state.active_tour_id) {
                    result = discipline;
                }
            })
        });
        return result;
    }
    passSignal(message) {
        if (this.refs.active_body) {
            this.refs.active_body.onSignal(message);
        }
    }
    renderButtons() {
        if (this.state.active_tour_id === null) {
            return null;
        }
        let props = {
            tour: this.getActiveTour(),
            onSignal: this.passSignal.bind(this),
            key: this.state.active_tour_id,
        };
        switch (this.state.page) {
        case "tour-admin":
            return <TourAdminButtons {...props} />
        case "heats":
            return <HeatsButtons {...props} />
        case "results-1":
        case "results-2":
        case "results-3":
            return <TourResultsButtons {...props} />
        case "discipline-results":
            return <DisciplineResultsButtons {...props} />
        default:
            console.log("Unknown page:", this.state.page);
        }
    }
    renderBody() {
        if (this.state.active_tour_id === null) {
            return null;
        }
        let props = {
            tour_id: this.state.active_tour_id,
            ref: "active_body",
            switchPage: page => this.setState({ page }),
            key: this.state.active_tour_id,
        };
        switch (this.state.page) {
        case "tour-admin":
            return <TourAdminBody {...props} />
        case "heats":
            return <HeatsBody {...props} />
        case "results-1":
            return <TourResultsBody printable={ true } verbosity="1" {...props} />
        case "results-2":
            return <TourResultsBody printable={ true } verbosity="2" {...props} />
        case "results-3":
            return <TourResultsBody printable={ true } verbosity="3" {...props} />
        case "discipline-results":
            return <DisciplineResults
                discipline_id={ this.getActiveDiscipline().id }
                ref="active_body"
                renderer="page" />
        default:
            console.log("Unknown page:", this.state.page);
        }
    }
    renderHeader() {
        let active_tour = this.getActiveTour();
        if (!active_tour) {
            return null;
        }
        return <header className="app-header with-tabs">
            <div className="controls">
                { this.renderButtons() }
            </div>
            <h1>{ this.getActiveDiscipline().name }</h1>
            <h2>{ active_tour.name }</h2>
            <div className="clearfix"></div>
            <ul className="pull-right nav nav-tabs">
                <li className={ this.state.page == "tour-admin" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "tour-admin") }>{ _("admin.judging-tabs.tour-admin") }</a>
                </li>
                <li className={ this.state.page == "heats" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "heats") }>{ _("admin.judging-tabs.heats") }</a>
                </li>
                <li className={ this.state.page == "results-1" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "results-1") }>{ _("admin.judging-tabs.results-1") }</a>
                </li>
                <li className={ this.state.page == "results-2" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "results-2") }>{ _("admin.judging-tabs.results-2") }</a>
                </li>
                <li className={ this.state.page == "results-3" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "results-3") }>{ _("admin.judging-tabs.results-3") }</a>
                </li>
                <li className={ this.state.page == "discipline-results" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "discipline-results") }>{ _("admin.judging-tabs.discipline-results") }</a>
                </li>
            </ul>
            <div className="clearfix"></div>
        </header>
    }
    render() {
        return <div className="app">
            <div className="side-menu">
                <CompetitionSchema
                    updateTour={ this.switchActiveTour.bind(this) }
                    current_tour_id={ this.state.active_tour_id }
                    competition_plan={ this.props.competition_plan }
                    disciplines={ this.props.disciplines } />
            </div>
            <div className="app-content">
                { this.renderHeader() }
                <div className="app-body">
                    { this.renderBody() }
                </div>
            </div>
        </div>
    }
}