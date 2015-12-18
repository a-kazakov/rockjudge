class CompetitionSchema extends React.Component {
    constructor(props) {
        super(props);
    }
    activateTour(tour) {
        this.props.updateTour(tour.id);
    }
    renderTour(tour) {
        var className = "level-2" +
            (tour.finalized ? " grey" : "") +
            (tour.id == this.props.current_tour_id ? " active" : "");
        return <div className={ className } onClick={ this.activateTour.bind(this, tour) } key={ tour.id } >
            { tour.name }
        </div>
    }
    renderDiscipline(ic) {
        return <details className="block" key={ ic.id } open={ !!parseInt(sessionStorage.getItem("D_J_" + ic.id)) }>
            <summary className="level-1" onClick={ (e) => sessionStorage.setItem("D_J_" + ic.id, e.target.parentNode.open ? 0 : 1) }>
                { ic.name }
            </summary>
            { ic.tours.map(this.renderTour.bind(this)) }
        </details>
    }
    render() {
        var data = this.props.disciplines.map(function(ic) {
            return this.renderDiscipline(ic);
        }.bind(this));
        return <div className="noselect">{ data }</div>;
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
    getPage() {
        return (this.state.page === "tour-admin" && this.getActiveTour().finalized) ? "results-1" : this.state.page;
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
        switch (this.getPage()) {
        case "tour-admin":
            if (this.getActiveTour().finalized) {
                return null;
            }
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
            console.log("Unknown page:", this.getPage());
        }
    }
    renderBody() {
        if (this.state.active_tour_id === null) {
            return null;
        }
        let props = {
            tour_id: this.state.active_tour_id,
            ref: "active_body",
            key: this.state.active_tour_id,
        };
        switch (this.getPage()) {
        case "tour-admin":
            return <TourAdminBody {...props} />
        case "heats":
            return <HeatsBody {...props} />
        case "results-1":
            return <TourResultsBody verbosity="1" {...props} />
        case "results-2":
            return <TourResultsBody verbosity="2" {...props} />
        case "results-3":
            return <TourResultsBody verbosity="3" {...props} />
        case "discipline-results":
            return <DisciplineResults discipline_id={ this.getActiveDiscipline().id } ref="active_body" />
        default:
            console.log("Unknown page:", this.getPage());
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
                { !active_tour.finalized
                    ? <li className={ this.getPage() == "tour-admin" ? "active" : ""}>
                        <a href="#" onClick={ this.switchPage.bind(this, "tour-admin") }>{ _("admin.judging-tabs.tour-admin") }</a>
                    </li>
                    : null
                }
                <li className={ this.getPage() == "heats" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "heats") }>{ _("admin.judging-tabs.heats") }</a>
                </li>
                <li className={ this.getPage() == "results-1" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "results-1") }>{ _("admin.judging-tabs.results-1") }</a>
                </li>
                <li className={ this.getPage() == "results-2" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "results-2") }>{ _("admin.judging-tabs.results-2") }</a>
                </li>
                <li className={ this.getPage() == "results-3" ? "active" : ""}>
                    <a href="#" onClick={ this.switchPage.bind(this, "results-3") }>{ _("admin.judging-tabs.results-3") }</a>
                </li>
                <li className={ this.getPage() == "discipline-results" ? "active" : ""}>
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