"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionImportExportUI = (function (_React$Component) {
    _inherits(CompetitionImportExportUI, _React$Component);

    function CompetitionImportExportUI(props) {
        _classCallCheck(this, CompetitionImportExportUI);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CompetitionImportExportUI).call(this, props));

        _this.state = {
            import_files: [],
            submitting: false
        };
        return _this;
    }

    _createClass(CompetitionImportExportUI, [{
        key: "import",
        value: function _import() {
            var _this2 = this;

            var reader = new FileReader();
            reader.onload = function (f) {
                _this2.setState({
                    submitting: true
                });
                Api("competition.load", {
                    competition_id: _this2.props.competition_id,
                    data: f.target.result
                }).onSuccess(function () {
                    swal({
                        title: _("global.messages.success"),
                        type: "success",
                        animation: false
                    });
                }).onDone(function () {
                    _this2.setState({
                        submitting: false
                    });
                }).send();
            };
            reader.readAsText(this.state.import_files[0]);
        }
    }, {
        key: "export",
        value: function _export() {
            Api("competition.export", { competition_id: this.props.competition_id }).onSuccess(function (r) {
                return saveAs(new Blob([JSON.stringify(r)], { type: 'application/json' }), "rockjudge.export.json");
            }).send();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "app-content load-competition-page" },
                React.createElement(
                    "header",
                    { className: "app-head" },
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.import_export")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "import-export" },
                    React.createElement(
                        "h3",
                        null,
                        _("admin.headers.import_competition")
                    ),
                    React.createElement(
                        "form",
                        { className: "import-form", onSubmit: function onSubmit(e) {
                                e.preventDefault();_this3.import();
                            } },
                        React.createElement(
                            "label",
                            null,
                            React.createElement(
                                "div",
                                null,
                                _("global.labels.browse")
                            ),
                            this.state.import_files.length == 0 ? _("admin.labels.no_files_selected") : this.state.import_files[0].name,
                            React.createElement("input", { type: "file",
                                onChange: function onChange(e) {
                                    return _this3.setState({ import_files: e.target.files });
                                } })
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { type: "submit",
                                className: "btn btn-primary",
                                disabled: this.state.import_files.length !== 1 || this.state.submitting },
                            _("admin.buttons.import")
                        )
                    ),
                    React.createElement(
                        "h3",
                        null,
                        _("admin.headers.export_competition")
                    ),
                    React.createElement(
                        "button",
                        { type: "button",
                            className: "btn btn-primary",
                            onClick: this.export.bind(this) },
                        _("admin.buttons.export")
                    )
                )
            );
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            var data = this._input.value;
        }
    }]);

    return CompetitionImportExportUI;
})(React.Component);

var ManagementUI = (function (_React$Component2) {
    _inherits(ManagementUI, _React$Component2);

    function ManagementUI(props) {
        _classCallCheck(this, ManagementUI);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(ManagementUI).call(this, props));

        _this4.state = {
            "page": _this4.getPageFromHash(),
            "page_props": _this4.getPagePropsFromHash()
        };
        return _this4;
    }

    _createClass(ManagementUI, [{
        key: "switchPage",
        value: function switchPage(page, props) {
            this.setState({
                page: page,
                page_props: props
            });
            var props_pairs = [];
            Object.getOwnPropertyNames(props).forEach(function (key) {
                props_pairs.push([key, props[key]]);
            });
            window.location.hash = "#management/" + page + "/" + props_pairs.map(function (p) {
                return p.join("=");
            }).join("$");
        }
    }, {
        key: "getPageFromHash",
        value: function getPageFromHash() {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[1] && ["import_export", "manage_competition_plan", "manage_tours", "manage_participants", "manage_judges", "manage_clubs", "manage_disciplines", "start_list", "competition_report"].indexOf(chunks[1]) >= 0) {
                return chunks[1];
            }
            return null;
        }
    }, {
        key: "getPagePropsFromHash",
        value: function getPagePropsFromHash() {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[2]) {
                var _ret = (function () {
                    var result = {};
                    chunks[2].split("$").forEach(function (pair_str) {
                        var pair = pair_str.split("=");
                        result[pair[0]] = pair[1];
                    });
                    return {
                        v: result
                    };
                })();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            }
            return {};
        }
    }, {
        key: "renderDiscipline",
        value: function renderDiscipline(ic, page) {
            return React.createElement(
                "div",
                {
                    className: "level-2" + (this.state.page == page && this.state.page_props.discipline_id == ic.id ? " active" : ""),
                    key: ic.id,
                    onClick: this.switchPage.bind(this, page, { discipline_id: ic.id }) },
                ic.name
            );
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            switch (this.state.page) {
                case "import_export":
                    return React.createElement(CompetitionImportExportUI, { competition_id: this.props.competition_id });
                case "manage_tours":
                    // Seeking for discipline with given ID
                    var ic = null;
                    this.props.disciplines.forEach((function (el) {
                        if (el.id == this.state.page_props.discipline_id) {
                            ic = el;
                        }
                    }).bind(this));
                    return React.createElement(ToursManagementUI, {
                        key: this.state.page_props.discipline_id,
                        discipline: ic });
                case "manage_participants":
                    return React.createElement(
                        "div",
                        { className: "app-content" },
                        React.createElement("iframe", { src: "/participants/" + this.state.page_props.discipline_id.toString() })
                    );
                case "manage_judges":
                    return React.createElement(JudgesManagementUI, {
                        judges: this.props.judges,
                        competition_id: this.props.competition_id });
                case "manage_clubs":
                    return React.createElement(ClubsManagementUI, {
                        clubs: this.props.clubs,
                        competition_id: this.props.competition_id });
                case "manage_competition_plan":
                    return React.createElement(CompetitionPlanManagementUI, {
                        items: this.props.competition_plan,
                        disciplines: this.props.disciplines,
                        competition_name: this.props.competition_name,
                        competition_date: this.props.competition_date,
                        competition_id: this.props.competition_id });
                case "manage_disciplines":
                    return React.createElement(DisciplinesManagementUI, {
                        disciplines: this.props.disciplines,
                        judges: this.props.judges,
                        competition_id: this.props.competition_id });
                case "start_list":
                    return React.createElement(
                        "div",
                        { className: "app-content" },
                        React.createElement("iframe", { src: "/start_list/" + this.props.competition_id })
                    );
                case "competition_report":
                    return React.createElement(
                        "div",
                        { className: "app-content" },
                        React.createElement("iframe", { src: "/report/" + this.props.competition_id })
                    );
            }
        }
    }, {
        key: "renderSideMenu",
        value: function renderSideMenu() {
            var ics_tours = this.props.disciplines.map((function (ic) {
                return this.renderDiscipline(ic, "manage_tours");
            }).bind(this));
            var ics_participants = this.props.disciplines.map((function (ic) {
                return this.renderDiscipline(ic, "manage_participants");
            }).bind(this));
            return React.createElement(
                "div",
                { className: "side-menu" },
                React.createElement(
                    "div",
                    { className: "block" },
                    React.createElement(
                        "div",
                        {
                            className: "level-1" + (this.state.page == "import_export" ? " active" : ""),
                            onClick: this.switchPage.bind(this, "import_export", {}) },
                        _("admin.menu.import_export")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "block" },
                    React.createElement(
                        "div",
                        {
                            className: "level-1" + (this.state.page == "manage_judges" ? " active" : ""),
                            onClick: this.switchPage.bind(this, "manage_judges", {}) },
                        _("admin.menu.manage_judges")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "block" },
                    React.createElement(
                        "div",
                        {
                            className: "level-1" + (this.state.page == "manage_disciplines" ? " active" : ""),
                            onClick: this.switchPage.bind(this, "manage_disciplines", {}) },
                        _("admin.menu.manage_disciplines")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "block" },
                    React.createElement(
                        "div",
                        {
                            className: "level-1" + (this.state.page == "manage_clubs" ? " active" : ""),
                            onClick: this.switchPage.bind(this, "manage_clubs", {}) },
                        _("admin.menu.manage_clubs")
                    )
                ),
                React.createElement(
                    "details",
                    { className: "block", open: !!parseInt(sessionStorage.getItem("D_SPORTSMEN")) },
                    React.createElement(
                        "summary",
                        { className: "level-1", onClick: function onClick(e) {
                                return sessionStorage.setItem("D_SPORTSMEN", e.target.parentNode.open ? 0 : 1);
                            } },
                        _("admin.menu.manage_sportsmen")
                    ),
                    ics_participants
                ),
                React.createElement(
                    "details",
                    { className: "block", open: !!parseInt(sessionStorage.getItem("D_TOURS")) },
                    React.createElement(
                        "summary",
                        { className: "level-1", onClick: function onClick(e) {
                                return sessionStorage.setItem("D_TOURS", e.target.parentNode.open ? 0 : 1);
                            } },
                        _("admin.menu.manage_tours")
                    ),
                    ics_tours
                ),
                React.createElement(
                    "div",
                    { className: "block" },
                    React.createElement(
                        "div",
                        {
                            className: "level-1" + (this.state.page == "manage_competition_plan" ? " active" : ""),
                            onClick: this.switchPage.bind(this, "manage_competition_plan", {}) },
                        _("admin.menu.manage_competition_plan")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "block" },
                    React.createElement(
                        "div",
                        {
                            className: "level-1" + (this.state.page == "start_list" ? " active" : ""),
                            onClick: this.switchPage.bind(this, "start_list", {}) },
                        _("admin.menu.start_list")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "block" },
                    React.createElement(
                        "div",
                        {
                            className: "level-1" + (this.state.page == "competition_report" ? " active" : ""),
                            onClick: this.switchPage.bind(this, "competition_report", {}) },
                        _("admin.menu.competition_report")
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "app" },
                this.renderSideMenu(),
                this.renderContent()
            );
        }
    }]);

    return ManagementUI;
})(React.Component);

var AutoPrinterStatus = (function (_React$Component3) {
    _inherits(AutoPrinterStatus, _React$Component3);

    function AutoPrinterStatus(props) {
        _classCallCheck(this, AutoPrinterStatus);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterStatus).call(this, props));

        _this5.state = {
            available: null
        };
        return _this5;
    }

    _createClass(AutoPrinterStatus, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this6 = this;

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://127.0.0.1:5949", true);
            xhr.onload = function () {
                return _this6.setState({ available: true });
            };
            xhr.onerror = function () {
                return _this6.setState({ available: false });
            };
            xhr.send();
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            if (this.state.available === null) {
                return React.createElement(Loader, null);
            }
            if (!this.state.available) {
                return React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    React.createElement(
                        "p",
                        null,
                        _("admin.alerts.auto_printer_not_available")
                    )
                );
            }
            return React.createElement(
                "div",
                { className: "alert alert-success" },
                React.createElement(
                    "p",
                    null,
                    _("admin.alerts.auto_printer_available")
                ),
                React.createElement("br", null),
                React.createElement(
                    "button",
                    { className: "btn btn-default",
                        type: "button",
                        onClick: function onClick() {
                            return window.printer_window ? window.printer_window.focus() : window.printer_window = window.open("/printer/" + _this7.props.competition_id, "printer", "resizable=yes,location=no");
                        } },
                    _("admin.buttons.launch_auto_printer")
                )
            );
        }
    }]);

    return AutoPrinterStatus;
})(React.Component);

var ServiceUI = (function (_React$Component4) {
    _inherits(ServiceUI, _React$Component4);

    function ServiceUI(props) {
        _classCallCheck(this, ServiceUI);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ServiceUI).call(this, props));
    }

    _createClass(ServiceUI, [{
        key: "reloadClients",
        value: function reloadClients() {
            swal_confirm(_("admin.confirms.reload_clients"), function () {
                Api("service.reload_clients", {}).onSuccess(function () {
                    return swal.close();
                }).send();
            });
        }
    }, {
        key: "refreshClients",
        value: function refreshClients() {
            swal_confirm(_("admin.confirms.refresh_clients"), function () {
                Api("service.refresh_clients", {}).onSuccess(function () {
                    return swal.close();
                }).send();
            });
        }
    }, {
        key: "unfinalizeTour",
        value: function unfinalizeTour(event) {
            var _this9 = this;

            event.preventDefault();
            var passcode = swal({
                title: _("admin.headers.unfinalize_tour"),
                text: _("admin.confirms.unfinalize_tour"),
                showCancelButton: true,
                closeOnConfirm: false,
                type: "input",
                animation: false
            }, function (value) {
                if (value !== "unfinalize") {
                    swal.showInputError(_("admin.messages.invalid_passcode"));
                    return false;
                }
                Api("tour.unfinalize", {
                    tour_id: _this9.refs.select_unfinalize.value
                }).onSuccess(function (event) {
                    swal({
                        title: _("global.messages.success"),
                        animation: false,
                        type: "success"
                    });
                }).send();
            });
        }
    }, {
        key: "renderUnfinalize",
        value: function renderUnfinalize() {
            var eligible_tours = [];
            this.props.disciplines.forEach(function (ic) {
                for (var idx = ic.tours.length - 1; idx >= 0; --idx) {
                    var tour = ic.tours[idx];
                    if (tour.finalized) {
                        eligible_tours.push(React.createElement(
                            "option",
                            { value: tour.id, key: tour.id },
                            ic.name,
                            " — ",
                            tour.name
                        ));
                        break;
                    }
                }
            });
            if (eligible_tours.length == 0) {
                return React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    _("admin.alerts.no_finalized")
                );
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    _("admin.alerts.unfinalize_warning")
                ),
                React.createElement(
                    "form",
                    { className: "unfinalization", onSubmit: this.unfinalizeTour.bind(this) },
                    React.createElement(
                        "select",
                        { className: "form-control", ref: "select_unfinalize" },
                        eligible_tours
                    ),
                    React.createElement(
                        "button",
                        { className: "btn btn-primary", type: "submit" },
                        _("admin.buttons.unfinalize")
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "app" },
                React.createElement(
                    "div",
                    { className: "app-content" },
                    React.createElement(
                        "header",
                        { className: "app-header" },
                        React.createElement(
                            "h1",
                            null,
                            _("admin.headers.service_menu")
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "service-menu app-body" },
                        React.createElement(
                            "h3",
                            null,
                            _("admin.headers.clients_management")
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-primary control-btn", onClick: this.reloadClients.bind(this) },
                            _("admin.buttons.reload_clients")
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-primary control-btn", onClick: this.refreshClients.bind(this) },
                            _("admin.buttons.refresh_clients")
                        ),
                        React.createElement(
                            "h3",
                            null,
                            _("admin.headers.unfinalize_tour")
                        ),
                        this.renderUnfinalize(),
                        React.createElement(
                            "h3",
                            null,
                            _("admin.headers.auto_printer")
                        ),
                        React.createElement(AutoPrinterStatus, { competition_id: this.props.competition_id })
                    )
                )
            );
        }
    }]);

    return ServiceUI;
})(React.Component);

var AdminUI = (function (_React$Component5) {
    _inherits(AdminUI, _React$Component5);

    // Intialization

    function AdminUI(props) {
        _classCallCheck(this, AdminUI);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(AdminUI).call(this, props));

        _this10.state = {
            active_app: _this10.getActiveAppFromHash(),
            name: null
        };
        message_dispatcher.addListener("db_update", _this10.reloadFromStorage.bind(_this10));
        message_dispatcher.addListener("reload_data", _this10.loadData.bind(_this10));
        _this10.loadData();
        return _this10;
    }

    _createClass(AdminUI, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                clubs: {},
                judges: {},
                plan: {},
                disciplines: {
                    discipline_judges: {
                        judge: {}
                    },
                    tours: {}
                }
            };
            this.setState(storage.get("Competition").by_id(this.props.competition_id).serialize(SCHEMA));
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("competition.get", {
                competition_id: this.props.competition_id,
                children: {
                    clubs: {},
                    judges: {},
                    plan: {},
                    disciplines: {
                        discipline_judges: {
                            judge: {}
                        },
                        tours: {}
                    }
                }
            }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }

        // Navigation

    }, {
        key: "setApp",
        value: function setApp(app) {
            this.setState({
                active_app: app
            });
            window.location.hash = "#" + app;
        }
    }, {
        key: "getActiveAppFromHash",
        value: function getActiveAppFromHash(app) {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[0] && ["judging", "management", "service"].indexOf(chunks[0]) >= 0) {
                return chunks[0];
            }
            return "management";
        }

        // Rendering

    }, {
        key: "renderActiveApp",
        value: function renderActiveApp() {
            switch (this.state.active_app) {
                case "judging":
                    return React.createElement(JudgingUI, {
                        competition_plan: this.state.plan,
                        disciplines: this.state.disciplines });
                case "management":
                    return React.createElement(ManagementUI, {
                        disciplines: this.state.disciplines,
                        clubs: this.state.clubs,
                        judges: this.state.judges,
                        disciplines: this.state.disciplines,
                        competition_plan: this.state.plan,
                        competition_name: this.state.name,
                        competition_date: this.state.date,
                        competition_id: this.props.competition_id });
                case "service":
                    return React.createElement(ServiceUI, {
                        competition_id: this.props.competition_id,
                        disciplines: this.state.disciplines });
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.name === null) {
                return React.createElement(Loader, null);
            }
            return React.createElement(
                "div",
                { className: "wrapper" },
                React.createElement(
                    "div",
                    { className: "header" },
                    React.createElement(
                        "div",
                        { className: "caption" },
                        this.state.name,
                        " (",
                        this.state.date,
                        ")"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "body" },
                    React.createElement(
                        "div",
                        { className: "left-col noselect" },
                        React.createElement(
                            "div",
                            { className: "button" + (this.state.active_app == "management" ? " active" : ""), onClick: this.setApp.bind(this, "management") },
                            React.createElement(
                                "div",
                                { className: "icon" },
                                "M"
                            ),
                            React.createElement(
                                "div",
                                { className: "label" },
                                "Management"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "button" + (this.state.active_app == "judging" ? " active" : ""), onClick: this.setApp.bind(this, "judging") },
                            React.createElement(
                                "div",
                                { className: "icon" },
                                "J"
                            ),
                            React.createElement(
                                "div",
                                { className: "label" },
                                "Judging"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "button" + (this.state.active_app == "service" ? " active" : ""), onClick: this.setApp.bind(this, "service") },
                            React.createElement(
                                "div",
                                { className: "icon" },
                                "S"
                            ),
                            React.createElement(
                                "div",
                                { className: "label" },
                                "Service"
                            )
                        ),
                        React.createElement("div", { className: "spacer" }),
                        React.createElement(
                            "div",
                            { className: "bottom-cell" },
                            React.createElement(
                                "a",
                                { className: "btn-back", href: "/" },
                                _("admin.buttons.to_start_page")
                            )
                        )
                    ),
                    this.renderActiveApp()
                )
            );
        }
    }]);

    return AdminUI;
})(React.Component);
//# sourceMappingURL=admin.js.map