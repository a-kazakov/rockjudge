class CompetitionLoadingUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raw_text: "",
        }
    }
    render() {
        return <div className="app-content load-competition-page">
            <header className="app-head">
                <h1>{ _("admin.headers.load_competition") }</h1>
            </header>
            <form onSubmit={ this.onSubmit.bind(this) } className="load-competition app-body">
                <textarea
                    defaultValue=""
                    ref={(c) => this._input = c}
                    placeholder="Insert serialized data here ..." />
                <button className="btn btn-primary" type="submit">{ _("admin.buttons.import") }</button>
            </form>
        </div>
    }
    onSubmit(event) {
        event.preventDefault();
        try {
            let data = JSON.parse(this._input.value);
            Api("competition.load", {
                competition_id: this.props.competition_id,
                data: data,
            }).onSuccess(() => swal({
                title: _("global.messages.success"),
                type: "success",
                "animation": false
            })).send();
        }
        catch (SyntaxError) {
            showError(_("errors.admin.load_syntax_error"));
        }
    }
}

class ManagementUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "page": this.getPageFromHash(),
            "page_props": this.getPagePropsFromHash(),
        };
    }
    switchPage(page, props) {
        this.setState({
            page: page,
            page_props: props,
        });
        let props_pairs = [];
        Object.getOwnPropertyNames(props).forEach((key) => {
            props_pairs.push([key, props[key]]);
        });
        window.location.hash = "#management/" + page + "/" + props_pairs.map((p) => p.join("=")).join("$");
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[1] && [
                "load_competition",
                "manage_competition_plan",
                "manage_tours",
                "manage_participants",
                "manage_judges",
                "manage_clubs",
                "manage_disciplines",
                "start_list",
                "competition_report"].indexOf(chunks[1]) >= 0) {
            return chunks[1];
        }
        return null;
    }
    getPagePropsFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[2]) {
            let result = {};
            chunks[2].split("$").forEach(function(pair_str) {
                let pair = pair_str.split("=");
                result[pair[0]] = pair[1];
            });
            return result;
        }
        return {};
    }
    renderDiscipline(ic, page) {
        return <div
                className={ "level-2" + (
                    this.state.page == page
                        && this.state.page_props.discipline_id == ic.id
                        ? " active" : "") }
                key={ ic.id }
                onClick={ this.switchPage.bind(this, page, { discipline_id: ic.id }) }>
            { ic.name }
        </div>
    }
    renderContent() {
        switch (this.state.page) {
        case "load_competition":
            return <CompetitionLoadingUI competition_id={ this.props.competition_id } />
        case "manage_tours":
            // Seeking for discipline with given ID
            let ic = null;
            this.props.disciplines.forEach(function(el) {
                if (el.id == this.state.page_props.discipline_id) {
                    ic = el;
                }
            }.bind(this));
            return <ToursManagementUI
                key={ this.state.page_props.discipline_id }
                discipline={ ic } />
        case "manage_participants":
            return <div className="app-content">
                <iframe src={ "/participants/" + this.state.page_props.discipline_id.toString() } />
            </div>
        case "manage_judges":
            return <JudgesManagementUI
                judges={ this.props.judges }
                competition_id={ this.props.competition_id } />
        case "manage_clubs":
            return <ClubsManagementUI
                clubs={ this.props.clubs }
                competition_id={ this.props.competition_id } />
        case "manage_competition_plan":
            return <CompetitionPlanManagementUI
                items={ this.props.competition_plan }
                disciplines={ this.props.disciplines }
                competition_name={ this.props.competition_name }
                competition_date={ this.props.competition_date }
                competition_id={ this.props.competition_id } />
        case "manage_disciplines":
            return <DisciplinesManagementUI
                disciplines={ this.props.disciplines }
                judges={ this.props.judges }
                competition_id={ this.props.competition_id } />
        case "start_list":
            return <div className="app-content"><iframe src={ "/start_list/" + this.props.competition_id } /></div>
        case "competition_report":
            return <div className="app-content"><iframe src={ "/report/" + this.props.competition_id } /></div>
        }
    }
    renderSideMenu() {
        var ics_tours = this.props.disciplines.map(function(ic) {
            return this.renderDiscipline(ic, "manage_tours");
        }.bind(this));
        var ics_participants = this.props.disciplines.map(function(ic) {
            return this.renderDiscipline(ic, "manage_participants");
        }.bind(this));
        return <div className="side-menu">
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page == "load_competition" ? " active" : "") }
                        onClick= { this.switchPage.bind(this, "load_competition", {}) } >
                    { _("admin.menu.load_competition") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page == "manage_disciplines" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_disciplines", {}) }>
                    { _("admin.menu.manage_disciplines") }
                </div>
            </div>
            <details className="block" open={ !!parseInt(sessionStorage.getItem("D_TOURS")) }>
                <summary className="level-1" onClick={ (e) => sessionStorage.setItem("D_TOURS", e.target.parentNode.open ? 0 : 1) }>
                    { _("admin.menu.manage_tours") }
                </summary>
                { ics_tours }
            </details>
            <details className="block" open={ !!parseInt(sessionStorage.getItem("D_SPORTSMEN")) }>
                <summary className="level-1" onClick={ (e) => sessionStorage.setItem("D_SPORTSMEN", e.target.parentNode.open ? 0 : 1) }>
                    { _("admin.menu.manage_sportsmen") }
                </summary>
                { ics_participants }
            </details>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page == "manage_clubs" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_clubs", {}) }>
                    { _("admin.menu.manage_clubs") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page == "manage_judges" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_judges", {}) }>
                    { _("admin.menu.manage_judges") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page == "manage_competition_plan" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "manage_competition_plan", {}) }>
                    { _("admin.menu.manage_competition_plan") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page == "start_list" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "start_list", {}) }>
                    { _("admin.menu.start_list") }
                </div>
            </div>
            <div className="block">
                <div
                        className={ "level-1" + (this.state.page == "competition_report" ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "competition_report", {}) }>
                    { _("admin.menu.competition_report") }
                </div>
            </div>
        </div>
    }
    render() {
        return <div className="app">
            { this.renderSideMenu() }
            { this.renderContent() }
        </div>
    }
}

class AutoPrinterStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            available: null,
        };
    }
    componentDidMount() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5949", true);
        xhr.onload = () => this.setState({ available: true });
        xhr.onerror = () => this.setState({ available: false });
        xhr.send();
    }
    render() {
        if (this.state.available === null) {
            return <Loader />
        }
        if (!this.state.available) {
            return <div className="alert alert-danger">
                <p>{ _("admin.alerts.auto_printer_not_available") }</p>
            </div>
        }
        return <div className="alert alert-success">
            <p>{ _("admin.alerts.auto_printer_available") }</p><br />
            <button className="btn btn-default"
                    type="button"
                    onClick={ () => window.printer_window ? window.printer_window.focus() :
                        (window.printer_window = window.open(`/printer/${ this.props.competition_id }`,
                            "printer", "resizable=yes,location=no")) }>
                { _("admin.buttons.launch_auto_printer") }
            </button>
        </div>
    }
}

class ServiceUI extends React.Component {
    constructor(props) {
        super(props);
    }
    reloadClients() {
        swal_confirm(_("admin.confirms.reload_clients"), () => {
            Api("service.reload_clients", {}).onSuccess(() => swal.close()).send();
        });
    }
    refreshClients() {
        swal_confirm(_("admin.confirms.refresh_clients"), () => {
            Api("service.refresh_clients", {}).onSuccess(() => swal.close()).send();
        });
    }
    unfinalizeTour(event) {
        event.preventDefault();
        let passcode = swal({
            title: _("admin.headers.unfinalize_tour"),
            text: _("admin.confirms.unfinalize_tour"),
            showCancelButton: true,
            closeOnConfirm: false,
            type: "input",
            animation: false,
        }, (value) => {
            if (value !== "unfinalize") {
                swal.showInputError(_("admin.messages.invalid_passcode"));
                return false;
            }
            Api("tour.unfinalize", {
                tour_id: this.refs.select_unfinalize.value,
            }).onSuccess(function(event) {
                swal({
                    title: _("global.messages.success"),
                    animation: false,
                    type: "success",
                });
            }).send();
        });
    }
    renderUnfinalize() {
        let eligible_tours = [];
        this.props.disciplines.forEach(function(ic) {
            for (var idx = ic.tours.length - 1; idx >= 0; --idx) {
                let tour = ic.tours[idx];
                if (tour.finalized) {
                    eligible_tours.push(<option value={ tour.id } key={ tour.id }>
                            { ic.name } &mdash; { tour.name }
                        </option>);
                    break;
                }
            }
        });
        if (eligible_tours.length == 0) {
            return <div className="alert alert-danger">
                { _("admin.alerts.no_finalized") }
            </div>
        }
        return <div>
            <div className="alert alert-danger">
                { _("admin.alerts.unfinalize_warning") }
            </div>
            <form className="unfinalization" onSubmit={ this.unfinalizeTour.bind(this) }>
                <select className="form-control" ref="select_unfinalize">
                    { eligible_tours }
                </select>
                <button className="btn btn-primary" type="submit">{ _("admin.buttons.unfinalize") }</button>
            </form>
        </div>
    }
    render() {
        return <div className="app">
            <div className="app-content">
                <header className="app-header">
                    <h1>{ _("admin.headers.service_menu") }</h1>
                </header>
                <div className="service-menu app-body">
                    <h3>{ _("admin.headers.clients_management") }</h3>
                    <button className="btn btn-primary control-btn" onClick={ this.reloadClients.bind(this) } >
                        { _("admin.buttons.reload_clients") }
                    </button>
                    <button className="btn btn-primary control-btn" onClick={ this.refreshClients.bind(this) }>
                        { _("admin.buttons.refresh_clients") }
                    </button>
                    <h3>{ _("admin.headers.unfinalize_tour") }</h3>
                    { this.renderUnfinalize() }
                    <h3>{ _("admin.headers.auto_printer") }</h3>
                    <AutoPrinterStatus competition_id={ this.props.competition_id } />
                </div>
            </div>
        </div>
    }
}

class AdminUI extends React.Component {

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            active_app: this.getActiveAppFromHash(),
            name: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        var SCHEMA = {
            clubs: {},
            judges: {},
            plan: {},
            disciplines: {
                discipline_judges: {
                    judge: {},
                },
                tours: {},
            },
        };
        this.setState(
            storage.get("Competition")
                .by_id(this.props.competition_id)
                .serialize(SCHEMA));
    }
    loadData() {
        Api("competition.get", {
            competition_id: this.props.competition_id,
            children: {
                clubs: {},
                judges: {},
                plan: {},
                disciplines: {
                    discipline_judges: {
                        judge: {},
                    },
                    tours: {},
                }
            }
        })
        .addToDB("Competition", this.props.competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }

    // Navigation

    setApp(app) {
        this.setState({
            active_app: app,
        });
        window.location.hash = "#" + app;
    }
    getActiveAppFromHash(app) {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[0] && ["judging", "management", "service"].indexOf(chunks[0]) >= 0) {
            return chunks[0];
        }
        return "management";
    }

    // Rendering

    renderActiveApp() {
        switch (this.state.active_app) {
        case "judging":
            return <JudgingUI
                competition_plan={ this.state.plan }
                disciplines={ this.state.disciplines } />;
        case "management":
            return <ManagementUI
                disciplines={ this.state.disciplines }
                clubs={ this.state.clubs }
                judges={ this.state.judges }
                disciplines={ this.state.disciplines }
                competition_plan={ this.state.plan }
                competition_name={ this.state.name }
                competition_date={ this.state.date }
                competition_id={ this.props.competition_id } />;
        case "service":
            return <ServiceUI
                competition_id={ this.props.competition_id }
                disciplines={ this.state.disciplines } />
        }
    }
    render() {
        if (this.state.name === null) {
            return <Loader />;
        }
        return <div className="wrapper">
            <div className="header">
                <div className="caption">
                    { this.state.name } ({this.state.date})
                </div>
            </div>
            <div className="body">
                <div className="left-col noselect">
                    <div className={ "button" + (this.state.active_app == "management" ? " active" : "") } onClick={ this.setApp.bind(this, "management") }>
                        <div className="icon">M</div>
                        <div className="label">Management</div>
                    </div>
                    <div className={ "button" + (this.state.active_app == "judging" ? " active" : "") } onClick={ this.setApp.bind(this, "judging") }>
                        <div className="icon">J</div>
                        <div className="label">Judging</div>
                    </div>
                    <div className={ "button" + (this.state.active_app == "service" ? " active" : "") } onClick={ this.setApp.bind(this, "service") }>
                        <div className="icon">S</div>
                        <div className="label">Service</div>
                    </div>
                    <div className="spacer"></div>
                    <div className="bottom-cell">
                        <a className="btn-back" href="/">
                            { _("admin.buttons.to_start_page") }
                        </a>
                    </div>
                </div>
                { this.renderActiveApp() }
            </div>
        </div>
    }
}
