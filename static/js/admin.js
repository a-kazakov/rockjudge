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
            Api("tournaments.competition.load", {
                competition_id: this.props.competition_id,
                data: JSON.parse(this._input.getDOMNode().value)
            }).onSuccess(function () {
                alert(_("global.messages.success"));
            }).send();
        }
    }]);

    return CompetitionLoadingUI;
})(React.Component);

var ManagmentUI = (function (_React$Component2) {
    _inherits(ManagmentUI, _React$Component2);

    function ManagmentUI(props) {
        _classCallCheck(this, ManagmentUI);

        _get(Object.getPrototypeOf(ManagmentUI.prototype), "constructor", this).call(this, props);
        this.state = {
            "page": null
        };
    }

    _createClass(ManagmentUI, [{
        key: "switchPage",
        value: function switchPage(page, props) {
            this.setState({
                page: page,
                page_props: props
            });
        }
    }, {
        key: "renderInnerCompetition",
        value: function renderInnerCompetition(ic, page) {
            return React.createElement(
                "div",
                {
                    className: "level-2" + (this.state.page == page && this.state.page_props.inner_competition_id == ic.id ? " active" : ""),
                    key: ic.id,
                    onClick: this.switchPage.bind(this, page, { inner_competition_id: ic.id }) },
                ic.name
            );
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            switch (this.state.page) {
                case "load_competition":
                    return React.createElement(CompetitionLoadingUI, { competition_id: this.props.competition_id });
                case "manage_inner_competition":
                    // Seeking for inner competition with give ID
                    var ic = null;
                    this.props.inner_competitions.forEach((function (el) {
                        if (el.id == this.state.page_props.inner_competition_id) {
                            ic = el;
                        }
                    }).bind(this));
                    return React.createElement(InnerCompetitionManagementUI, {
                        key: this.state.page_props.inner_competition_id,
                        inner_competition: ic });
                case "manage_participants":
                    return React.createElement("iframe", { src: "/participants/" + this.state.page_props.inner_competition_id.toString() });
                case "manage_judges":
                    return React.createElement(JudgesManagementUI, {
                        judges: this.props.judges,
                        competition_id: this.props.competition_id });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var ics_management = this.props.inner_competitions.map((function (ic) {
                return this.renderInnerCompetition(ic, "manage_inner_competition");
            }).bind(this));
            var ics_participants = this.props.inner_competitions.map((function (ic) {
                return this.renderInnerCompetition(ic, "manage_participants");
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
                                { className: "block" },
                                React.createElement(
                                    "div",
                                    {
                                        className: "level-1" + (this.state.page == "load_competition" ? " active" : ""),
                                        onClick: this.switchPage.bind(this, "load_competition") },
                                    _("admin.menu.load_competition")
                                )
                            ),
                            React.createElement(
                                "details",
                                { open: "true", className: "block" },
                                React.createElement(
                                    "summary",
                                    { className: "level-1" },
                                    _("admin.menu.manage_inner_competitions")
                                ),
                                ics_management,
                                React.createElement(
                                    "div",
                                    { className: "level-2 new-ic", onClick: this.createInnerCommpetition.bind(this) },
                                    _("admin.menu.add_inner_competition")
                                )
                            ),
                            React.createElement(
                                "details",
                                { open: "true", className: "block" },
                                React.createElement(
                                    "summary",
                                    { className: "level-1" },
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
                                        className: "level-1" + (this.state.page == "manage_judges" ? " active" : ""),
                                        onClick: this.switchPage.bind(this, "manage_judges") },
                                    _("admin.menu.manage_judges")
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
    }, {
        key: "createInnerCommpetition",
        value: function createInnerCommpetition() {
            var name = prompt(_("admin.prompts.new_inner_competition_name"));
            if (name === null) {
                return;
            }
            Api("tournaments.inner_competition.create", {
                name: name,
                competition_id: this.props.competition_id
            }).send();
        }
    }]);

    return ManagmentUI;
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
                Api("tournaments.service.reload_clients", {}).send();
            }
        }
    }, {
        key: "refreshClients",
        value: function refreshClients() {
            if (_("admin.confirms.refresh_clients")) {
                Api("tournaments.service.refresh_clients", {}).send();
            }
        }
    }, {
        key: "unfinalizeTour",
        value: function unfinalizeTour(event) {
            event.preventDefault();
            if (prompt(_("admin.confirms.unfinalize_tour")) == "unfinalize") {
                Api("tournaments.tour.unfinalize", {
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
            this.props.inner_competitions.forEach(function (ic) {
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
            active_app: "management",
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
                judges: {},
                inner_competitions: {
                    tours: {}
                }
            };
            this.setState(storage.get("Competition").by_id(this.props.competition_id).serialize(SCHEMA));
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tournaments.competition.get", {
                competition_id: this.props.competition_id,
                children: {
                    judges: {},
                    inner_competitions: {
                        tours: {}
                    }
                }
            }).updateDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }

        // Listeners

    }, {
        key: "setApp",
        value: function setApp(app) {
            this.setState({
                active_app: app
            });
        }

        // Rendering

    }, {
        key: "renderActiveApp",
        value: function renderActiveApp() {
            switch (this.state.active_app) {
                case "judging":
                    return React.createElement(JudgingUI, {
                        inner_competitions: this.state.inner_competitions });
                case "management":
                    return React.createElement(ManagmentUI, {
                        inner_competitions: this.state.inner_competitions,
                        judges: this.state.judges,
                        competition_id: this.props.competition_id });
                case "results":
                    return React.createElement(ResultsUI, {
                        inner_competitions: this.state.inner_competitions });
                case "service":
                    return React.createElement(ServiceUI, {
                        inner_competitions: this.state.inner_competitions });
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
                            { colSpan: "2" },
                            this.state.name
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
                                { className: "app" + (this.state.active_app == "results" ? " active" : ""), onClick: this.setApp.bind(this, "results") },
                                React.createElement(
                                    "div",
                                    { className: "icon" },
                                    "R"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "label" },
                                    "Results"
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
                            null,
                            this.renderActiveApp()
                        )
                    )
                )
            );
        }
    }]);

    return AdminUI;
})(React.Component);
//# sourceMappingURL=admin.js.map