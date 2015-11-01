"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionLoadingUI = (function (_React$Component) {
    _inherits(CompetitionLoadingUI, _React$Component);

    function CompetitionLoadingUI(props) {
        _classCallCheck(this, CompetitionLoadingUI);

        _get(Object.getPrototypeOf(CompetitionLoadingUI.prototype), "constructor", this).call(this, props);
        this.state = {
            raw_text: ""
        };
    }

    _createClass(CompetitionLoadingUI, [{
        key: "render",
        value: function render() {
            var _this = this;

            return React.createElement(
                "div",
                { className: "load-competition-page" },
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.load_competition")
                    )
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.onSubmit.bind(this), className: "load-competition" },
                    React.createElement("textarea", {
                        defaultValue: "",
                        ref: function (c) {
                            return _this._input = c;
                        },
                        placeholder: "Insert serialized data here ..." }),
                    React.createElement(
                        "button",
                        { className: "btn btn-primary", type: "submit" },
                        _("admin.buttons.import")
                    )
                )
            );
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            Api("competition.load", {
                competition_id: this.props.competition_id,
                data: JSON.parse(this._input.getDOMNode().value)
            }).onSuccess(function () {
                alert(_("global.messages.success"));
            }).send();
        }
    }]);

    return CompetitionLoadingUI;
})(React.Component);

var ManagementUI = (function (_React$Component2) {
    _inherits(ManagementUI, _React$Component2);

    function ManagementUI(props) {
        _classCallCheck(this, ManagementUI);

        _get(Object.getPrototypeOf(ManagementUI.prototype), "constructor", this).call(this, props);
        this.state = {
            "page": this.getPageFromHash(),
            "page_props": this.getPagePropsFromHash()
        };
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
            if (chunks[1] && ["load_competition", "manage_tours", "manage_participants", "manage_judges", "manage_clubs", "manage_disciplines"].indexOf(chunks[1]) >= 0) {
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

                if (typeof _ret === "object") return _ret.v;
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
                case "load_competition":
                    return React.createElement(CompetitionLoadingUI, { competition_id: this.props.competition_id });
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
                        { className: "ifw" },
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
                case "manage_disciplines":
                    return React.createElement(DisciplinesManagementUI, {
                        disciplines: this.props.disciplines,
                        judges: this.props.judges,
                        competition_id: this.props.competition_id });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var ics_tours = this.props.disciplines.map((function (ic) {
                return this.renderDiscipline(ic, "manage_tours");
            }).bind(this));
            var ics_participants = this.props.disciplines.map((function (ic) {
                return this.renderDiscipline(ic, "manage_participants");
            }).bind(this));
            return React.createElement(
                "table",
                { className: "app-content" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "side-panel" },
                            React.createElement(
                                "div",
                                { className: "scroller" },
                                React.createElement(
                                    "div",
                                    { className: "block" },
                                    React.createElement(
                                        "div",
                                        {
                                            className: "level-1" + (this.state.page == "load_competition" ? " active" : ""),
                                            onClick: this.switchPage.bind(this, "load_competition", {}) },
                                        _("admin.menu.load_competition")
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
                                    "details",
                                    { className: "block", open: !!parseInt(sessionStorage.getItem("D_TOURS")) },
                                    React.createElement(
                                        "summary",
                                        { className: "level-1", onClick: function (e) {
                                                return sessionStorage.setItem("D_TOURS", e.target.parentNode.open ? 0 : 1);
                                            } },
                                        _("admin.menu.manage_tours")
                                    ),
                                    ics_tours
                                ),
                                React.createElement(
                                    "details",
                                    { className: "block", open: !!parseInt(sessionStorage.getItem("D_SPORTSMEN")) },
                                    React.createElement(
                                        "summary",
                                        { className: "level-1", onClick: function (e) {
                                                return sessionStorage.setItem("D_SPORTSMEN", e.target.parentNode.open ? 0 : 1);
                                            } },
                                        _("admin.menu.manage_sportsmen")
                                    ),
                                    ics_participants
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
                                    "div",
                                    { className: "block" },
                                    React.createElement(
                                        "div",
                                        {
                                            className: "level-1" + (this.state.page == "manage_judges" ? " active" : ""),
                                            onClick: this.switchPage.bind(this, "manage_judges", {}) },
                                        _("admin.menu.manage_judges")
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "div",
                                { className: "app-page" },
                                this.renderContent()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ManagementUI;
})(React.Component);

var ServiceUI = (function (_React$Component3) {
    _inherits(ServiceUI, _React$Component3);

    function ServiceUI(props) {
        _classCallCheck(this, ServiceUI);

        _get(Object.getPrototypeOf(ServiceUI.prototype), "constructor", this).call(this, props);
    }

    _createClass(ServiceUI, [{
        key: "reloadClients",
        value: function reloadClients() {
            if (confirm(_("admin.confirms.reload_clients"))) {
                Api("service.reload_clients", {}).send();
            }
        }
    }, {
        key: "refreshClients",
        value: function refreshClients() {
            if (confirm(_("admin.confirms.refresh_clients"))) {
                Api("service.refresh_clients", {}).send();
            }
        }
    }, {
        key: "unfinalizeTour",
        value: function unfinalizeTour(event) {
            event.preventDefault();
            if (prompt(_("admin.confirms.unfinalize_tour")) == "unfinalize") {
                Api("tour.unfinalize", {
                    tour_id: this.refs.select_unfinalize.getDOMNode().value
                }).onSuccess(function (event) {
                    alert(_("global.messages.success"));
                }).send();
            } else {
                alert(_("admin.messages.invalid_passcode"));
            }
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
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.service_menu")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "service-menu" },
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
                    this.renderUnfinalize()
                )
            );
        }
    }]);

    return ServiceUI;
})(React.Component);

var AdminUI = (function (_React$Component4) {
    _inherits(AdminUI, _React$Component4);

    // Intialization

    function AdminUI(props) {
        _classCallCheck(this, AdminUI);

        _get(Object.getPrototypeOf(AdminUI.prototype), "constructor", this).call(this, props);
        this.state = {
            active_app: this.getActiveAppFromHash(),
            name: null
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }

    _createClass(AdminUI, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                clubs: {},
                judges: {},
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
                    disciplines: {
                        discipline_judges: {
                            judge: {}
                        },
                        tours: {}
                    }
                }
            }).updateDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
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
            if (chunks[0] && ["judging", "management", "reports", "service"].indexOf(chunks[0]) >= 0) {
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
                        disciplines: this.state.disciplines });
                case "management":
                    return React.createElement(ManagementUI, {
                        disciplines: this.state.disciplines,
                        clubs: this.state.clubs,
                        judges: this.state.judges,
                        competition_id: this.props.competition_id });
                case "reports":
                    return React.createElement(ReportsUI, {
                        disciplines: this.state.disciplines,
                        competition_id: this.props.competition_id });
                case "service":
                    return React.createElement(ServiceUI, {
                        disciplines: this.state.disciplines });
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.name === null) {
                return React.createElement(
                    "span",
                    null,
                    "Loading..."
                );
            }
            return React.createElement(
                "table",
                { className: "outer-table" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { colSpan: "2", className: "caption" },
                            this.state.name,
                            " (",
                            this.state.date,
                            ")"
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "left-col noselect" },
                            React.createElement(
                                "div",
                                { className: "app" + (this.state.active_app == "management" ? " active" : ""), onClick: this.setApp.bind(this, "management") },
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
                                { className: "app" + (this.state.active_app == "judging" ? " active" : ""), onClick: this.setApp.bind(this, "judging") },
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
                                { className: "app" + (this.state.active_app == "reports" ? " active" : ""), onClick: this.setApp.bind(this, "reports") },
                                React.createElement(
                                    "div",
                                    { className: "icon" },
                                    "R"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "label" },
                                    "Reports"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "app" + (this.state.active_app == "service" ? " active" : ""), onClick: this.setApp.bind(this, "service") },
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
                            )
                        ),
                        React.createElement(
                            "td",
                            { rowSpan: "2" },
                            this.renderActiveApp()
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "bottom-cell" },
                            React.createElement(
                                "a",
                                { className: "btn-back", href: "/" },
                                _("admin.buttons.to_start_page")
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AdminUI;
})(React.Component);
//# sourceMappingURL=admin.js.map