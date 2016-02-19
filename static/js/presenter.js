(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.DisciplineResults = exports.DisciplineResultsButtons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _printable = require("ui/printable");

var _docx = require("common/docx");

var _discipline_results = require("./rosfarr/discipline_results");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineResultsButtons = exports.DisciplineResultsButtons = function (_React$Component) {
    _inherits(DisciplineResultsButtons, _React$Component);

    function DisciplineResultsButtons() {
        _classCallCheck(this, DisciplineResultsButtons);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    DisciplineResultsButtons.prototype.signal = function signal(message) {
        var _this2 = this;

        return function () {
            return _this2.props.onSignal(message);
        }.bind(this);
    };

    DisciplineResultsButtons.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                { className: "btn btn-primary", onClick: this.signal("docx") },
                "DOCX"
            )
        );
    };

    return DisciplineResultsButtons;
}(React.Component);

var DisciplineResults = exports.DisciplineResults = function (_React$Component2) {
    _inherits(DisciplineResults, _React$Component2);

    _createClass(DisciplineResults, null, [{
        key: "defaultProps",
        get: function get() {
            return {
                renderer: "page"
            };
        }

        // Initialization

    }]);

    function DisciplineResults(props) {
        _classCallCheck(this, DisciplineResults);

        var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this3.state = {
            loaded: false
        };
        _this3.runs_loaded = false;
        return _this3;
    }

    DisciplineResults.prototype.componentWillMount = function componentWillMount() {
        var _this4 = this;

        this.storage = _storage.storage.getDomain("discipline_results_" + this.props.discipline_id);
        this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadState.bind(this));
        this.results_change_listener = _message_dispatcher.message_dispatcher.addListener("tour_results_changed reload_data", function (message) {
            if (!message) {
                this.loadResults();
                return;
            }
            var tour_storage = this.storage.get("Tour").by_id(message["tour_id"]);
            if (!tour_storage) {
                return;
            }
            if (tour_storage.discipline.id === this.props.discipline_id) {
                this.loadResults();
            }
        }.bind(this));
        this.loadData();
        this.loadResults();
        if (this.props.autoDocx) {
            (function () {
                var interval_id = setInterval(function () {
                    if (_this4.refs.printable) {
                        clearInterval(interval_id);
                        _this4.createDocx(_this4.props.autoDocx.filename);
                        _this4.props.autoDocx.callback(_this4.props.autoDocx.filename);
                    }
                }, 500);
            })();
        }
    };

    DisciplineResults.prototype.componentWillUnmount = function componentWillUnmount() {
        _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.results_change_listener);
        _storage.storage.delDomain("discipline_results_" + this.props.discipline_id);
    };

    DisciplineResults.prototype.reloadState = function reloadState() {
        if (!this.state.discipline_results) {
            return;
        }
        if (!this.runs_loaded) {
            return;
        }
        var storage_runs = this.storage.get("Run");
        var results = this.state.discipline_results;
        var new_state = [];
        var SCHEMA = {
            tour: {},
            participant: {
                sportsmen: {},
                club: {}
            }
        };
        for (var i = 0; i < results.length; ++i) {
            new_state.push({
                place: results[i].place,
                run: storage_runs.by_id(results[i].run_id).serialize(SCHEMA)
            });
        }
        this.setState({
            loaded: true,
            table: new_state,
            discipline: this.storage.get("Discipline").by_id(this.props.discipline_id).serialize({
                competition: {}
            })
        });
    };

    DisciplineResults.prototype.loadResults = function loadResults() {
        var _this5 = this;

        (0, _api.Api)("discipline.get_results", {
            discipline_id: this.props.discipline_id
        }).onSuccess(function (response) {
            _this5.setState({
                discipline_results: response
            });
            _this5.reloadState();
        }).send();
    };

    DisciplineResults.prototype.loadData = function loadData() {
        var _this6 = this;

        (0, _api.Api)("discipline.get", {
            discipline_id: this.props.discipline_id,
            children: {
                competition: {},
                tours: {
                    runs: {
                        participant: {
                            club: {}
                        }
                    }
                }
            }
        }).addToDB("Discipline", this.props.discipline_id, this.storage).onSuccess(function () {
            _this6.runs_loaded = true;
            _this6.reloadState(_this6);
        }).send();
    };

    // Listeners

    DisciplineResults.prototype.onSignal = function onSignal(message) {
        switch (message) {
            case "docx":
                this.createDocx();
                break;
            default:
                console.log("Unknown message:", message);
        }
    };

    // Rendering

    DisciplineResults.prototype.renderBody = function renderBody() {
        switch (this.props.renderer) {
            case "presenter":
                return React.createElement(_discipline_results.DisciplineResultsPresenterTable, { table: this.state.table, ref: "main_table" });
            case "screen_operator":
                return React.createElement(_discipline_results.DisciplineResultsScreenOperatorTable, {
                    table: this.state.table,
                    selectedPlace: this.props.selectedPlace,
                    onPlaceSelect: this.props.onPlaceSelect,
                    ref: "main_table" });
            case "page":
                return React.createElement(_printable.Printable, {
                    ref: "printable",
                    header: this.state.discipline.competition.name + ", " + this.state.discipline.competition.date,
                    title1: (0, _loader._)("admin.headers.discipline_results"),
                    title3: this.state.discipline.name,
                    body: React.createElement(_discipline_results.DisciplineResultsTable, { table: this.state.table }) });
            case "table":
                return React.createElement(_discipline_results.DisciplineResultsTable, { table: this.state.table, ref: "main_table" });
            default:
        }
    };

    DisciplineResults.prototype.render = function render() {
        // eslint-disable-line react/sort-comp
        if (!this.state.loaded) {
            return React.createElement(
                "div",
                { className: "discipline-results" },
                React.createElement(_components.Loader, null)
            );
        }
        return React.createElement(
            "div",
            { className: "discipline-results" },
            this.renderBody()
        );
    };

    DisciplineResults.prototype.createDocx = function createDocx() {
        var filename = arguments.length <= 0 || arguments[0] === undefined ? "discipline-results.docx" : arguments[0];

        (0, _docx.Docx)(filename).setHeader(this.state.discipline.competition.name + ", " + this.state.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.discipline_results")).setTitle3(this.state.discipline.name).setBody(this.refs.printable.fetchPrintableData()).addStyle(".tour-name", "background", "#ddd").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%").save();
    };

    return DisciplineResults;
}(React.Component);

},{"./rosfarr/discipline_results":2,"common/docx":4,"i10n/loader":5,"server/api":8,"server/message_dispatcher":9,"server/storage":10,"ui/components":11,"ui/printable":13}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.DisciplineResultsScreenOperatorTable = exports.DisciplineResultsPresenterTable = exports.DisciplineResultsTable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _loader = require("i10n/loader");

var _tablet_components = require("ui/tablet_components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _loader._.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

var DisciplineResultsTable = exports.DisciplineResultsTable = function (_React$Component) {
    _inherits(DisciplineResultsTable, _React$Component);

    function DisciplineResultsTable() {
        _classCallCheck(this, DisciplineResultsTable);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    DisciplineResultsTable.prototype.renderRowHeader = function renderRowHeader(prev_row, next_row) {
        var need_render = typeof prev_row === "undefined" || prev_row.run.tour.id !== next_row.run.tour.id;
        if (!need_render) {
            return null;
        }
        return React.createElement(
            "tr",
            { key: "H" + next_row.run.id },
            React.createElement(
                "th",
                { className: "tour-name", colSpan: "6" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    next_row.run.tour.name
                )
            )
        );
    };

    DisciplineResultsTable.prototype.renderRow = function renderRow(row) {
        var p = row.run.participant;
        return React.createElement(
            "tr",
            { key: "R" + row.run.id },
            React.createElement(
                "td",
                { className: "w-8 place" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    row.place === null ? "" : row.place
                )
            ),
            React.createElement(
                "td",
                { className: "w-8 number" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    p.number
                )
            ),
            React.createElement(
                "td",
                { className: "w-36", colSpan: "2" },
                React.createElement(
                    "table",
                    { className: "sportsmen" },
                    React.createElement(
                        "tbody",
                        null,
                        p.formation_name ? React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { colSpan: "2" },
                                React.createElement(
                                    "p",
                                    { className: "text-left" },
                                    p.formation_name
                                )
                            )
                        ) : null,
                        p.sportsmen.map(function (s, idx) {
                            return React.createElement(
                                "tr",
                                { key: idx },
                                React.createElement(
                                    "td",
                                    { className: "w-75" },
                                    React.createElement(
                                        "p",
                                        null,
                                        s.last_name + " " + s.first_name
                                    )
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-25" },
                                    React.createElement(
                                        "p",
                                        { className: "text-center" },
                                        s.year_of_birth
                                    )
                                )
                            );
                        })
                    )
                )
            ),
            React.createElement(
                "td",
                { className: "w-24 club" },
                React.createElement(
                    "p",
                    null,
                    p.club.name
                )
            ),
            React.createElement(
                "td",
                { className: "w-24 coaches" },
                React.createElement(
                    "p",
                    null,
                    p.coaches.split(",").map(function (c) {
                        return [c.trim(), React.createElement("br", { key: "X" })];
                    })
                )
            )
        );
    };

    DisciplineResultsTable.prototype.renderRows = function renderRows() {
        var result = [];
        var table = this.props.table;
        for (var i = 0; i < table.length; ++i) {
            var header = this.renderRowHeader(table[i - 1], table[i]);
            header && result.push(header);
            result.push(this.renderRow(table[i]));
        }
        return result;
    };

    DisciplineResultsTable.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "discipline-results" },
            React.createElement(
                "table",
                { className: "bordered-table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "w-8" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.place")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-8" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.number")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-27" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.sportsmen")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-9" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.sportsmen_year_of_birth")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-24" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.participant_club")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-24" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.participant_coaches")
                            )
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.renderRows()
                )
            )
        );
    };

    return DisciplineResultsTable;
}(React.Component);

var DisciplineResultsPresenterTableRow = function (_React$Component2) {
    _inherits(DisciplineResultsPresenterTableRow, _React$Component2);

    function DisciplineResultsPresenterTableRow(props) {
        _classCallCheck(this, DisciplineResultsPresenterTableRow);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = {
            active: false
        };
        return _this2;
    }

    DisciplineResultsPresenterTableRow.prototype.toggleActive = function toggleActive() {
        this.setState({
            active: !this.state.active
        });
    };

    DisciplineResultsPresenterTableRow.prototype.render = function render() {
        var p = this.props.participant;
        return React.createElement(
            "table",
            _extends({ className: "row" + (this.state.active ? " active" : "")
            }, (0, _tablet_components.onTouchEndOrClick)(this.toggleActive.bind(this))),
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { className: "place", rowSpan: "3" },
                        this.props.place === null ? "" : React.createElement(
                            "div",
                            null,
                            this.props.place,
                            React.createElement(
                                "div",
                                { className: "place-label" },
                                (0, _loader._)("presenter.labels.place")
                            )
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "number" },
                        p.number
                    ),
                    React.createElement(
                        "td",
                        { className: "name" },
                        p.name
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { className: "club", colSpan: "2" },
                        p.club.name
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { className: "coaches", colSpan: "2" },
                        p.coaches
                    )
                )
            )
        );
    };

    return DisciplineResultsPresenterTableRow;
}(React.Component);

var DisciplineResultsPresenterTable = exports.DisciplineResultsPresenterTable = function (_React$Component3) {
    _inherits(DisciplineResultsPresenterTable, _React$Component3);

    function DisciplineResultsPresenterTable() {
        _classCallCheck(this, DisciplineResultsPresenterTable);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    DisciplineResultsPresenterTable.prototype.renderRowHeader = function renderRowHeader(prev_row, next_row) {
        var need_render = typeof prev_row === "undefined" || prev_row.run.tour.id !== next_row.run.tour.id;
        if (!need_render) {
            return null;
        }
        return React.createElement(
            "div",
            { className: "tour-name", key: "H" + next_row.run.id },
            next_row.run.tour.name
        );
    };

    DisciplineResultsPresenterTable.prototype.renderRow = function renderRow(row) {
        return React.createElement(DisciplineResultsPresenterTableRow, { key: "R" + row.run.id,
            participant: row.run.participant,
            place: row.place });
    };

    DisciplineResultsPresenterTable.prototype.renderRows = function renderRows() {
        var result = [];
        var table = this.props.table;
        for (var i = table.length - 1; i >= 0; --i) {
            var header = this.renderRowHeader(table[i + 1], table[i]);
            header && result.push(header);
            result.push(this.renderRow(table[i]));
        }
        return result;
    };

    DisciplineResultsPresenterTable.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            this.renderRows()
        );
    };

    return DisciplineResultsPresenterTable;
}(React.Component);

var DisciplineResultsScreenOperatorTableRow = function (_React$Component4) {
    _inherits(DisciplineResultsScreenOperatorTableRow, _React$Component4);

    function DisciplineResultsScreenOperatorTableRow() {
        _classCallCheck(this, DisciplineResultsScreenOperatorTableRow);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    DisciplineResultsScreenOperatorTableRow.prototype.render = function render() {
        var p = this.props.participant;
        return React.createElement(
            "table",
            _extends({ className: "row" + (this.props.selected ? " selected" : "")
            }, (0, _tablet_components.onTouchEndOrClick)(this.props.onClick)),
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { className: "place", rowSpan: "2" },
                        this.props.place === null ? "" : React.createElement(
                            "div",
                            null,
                            this.props.place,
                            React.createElement(
                                "div",
                                { className: "place-label" },
                                (0, _loader._)("presenter.labels.place")
                            )
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "number" },
                        p.number
                    ),
                    React.createElement(
                        "td",
                        { className: "name" },
                        p.name
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { className: "club", colSpan: "2" },
                        p.club.name
                    )
                )
            )
        );
    };

    return DisciplineResultsScreenOperatorTableRow;
}(React.Component);

var DisciplineResultsScreenOperatorTable = exports.DisciplineResultsScreenOperatorTable = function (_React$Component5) {
    _inherits(DisciplineResultsScreenOperatorTable, _React$Component5);

    function DisciplineResultsScreenOperatorTable() {
        _classCallCheck(this, DisciplineResultsScreenOperatorTable);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    DisciplineResultsScreenOperatorTable.prototype.renderRowHeader = function renderRowHeader(prev_row, next_row) {
        var need_render = typeof prev_row === "undefined" || prev_row.run.tour.id !== next_row.run.tour.id;
        if (!need_render) {
            return null;
        }
        return React.createElement(
            "div",
            { className: "tour-name", key: "H" + next_row.run.id },
            next_row.run.tour.name
        );
    };

    DisciplineResultsScreenOperatorTable.prototype.renderRow = function renderRow(row, place) {
        var _this6 = this;

        return React.createElement(DisciplineResultsScreenOperatorTableRow, {
            key: "R" + row.run.id,
            participant: row.run.participant,
            place: row.place,
            onClick: function onClick() {
                return _this6.props.onPlaceSelect(place);
            },
            selected: this.props.selectedPlace !== null && place >= this.props.selectedPlace });
    };

    DisciplineResultsScreenOperatorTable.prototype.renderRows = function renderRows() {
        var result = [];
        var table = this.props.table;
        for (var i = table.length - 1; i >= 0; --i) {
            var header = this.renderRowHeader(table[i + 1], table[i]);
            header && result.push(header);
            result.push(this.renderRow(table[i], i + 1));
        }
        return result;
    };

    DisciplineResultsScreenOperatorTable.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            this.renderRows()
        );
    };

    return DisciplineResultsScreenOperatorTable;
}(React.Component);

},{"i10n/loader":5,"ui/tablet_components":14}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Presenter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _tablet_components = require("ui/tablet_components");

var _discipline_results = require("admin/judging/discipline_results");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresenterTabletLeftBar = function (_React$Component) {
    _inherits(PresenterTabletLeftBar, _React$Component);

    function PresenterTabletLeftBar() {
        _classCallCheck(this, PresenterTabletLeftBar);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    PresenterTabletLeftBar.prototype.render = function render() {
        var _this2 = this;

        return React.createElement(
            "div",
            { className: "left-bar" },
            React.createElement(
                "div",
                _extends({ className: "item" + (this.props.active === "info" ? " active" : "")
                }, (0, _tablet_components.onTouchOrClick)(function () {
                    return _this2.props.onPageSwitch("info");
                })),
                React.createElement(
                    "span",
                    null,
                    (0, _loader._)("presenter.headers.info")
                )
            ),
            React.createElement(
                "div",
                _extends({ className: "item" + (this.props.active === "heats" ? " active" : "")
                }, (0, _tablet_components.onTouchOrClick)(function () {
                    return _this2.props.onPageSwitch("heats");
                })),
                React.createElement(
                    "span",
                    null,
                    (0, _loader._)("presenter.headers.heats")
                )
            ),
            React.createElement(
                "div",
                _extends({ className: "item" + (this.props.active === "results" ? " active" : "")
                }, (0, _tablet_components.onTouchOrClick)(function () {
                    return _this2.props.onPageSwitch("results");
                })),
                React.createElement(
                    "span",
                    null,
                    (0, _loader._)("presenter.headers.results")
                )
            )
        );
    };

    _createClass(PresenterTabletLeftBar, null, [{
        key: "propTypes",
        get: function get() {
            return {
                active: React.PropTypes.oneOf(["info", "heats", "results"]).isRequired,
                onPageSwitch: React.PropTypes.func.isRequired
            };
        }
    }]);

    return PresenterTabletLeftBar;
}(React.Component);

var PresenterTabletInfoCompetitionInfo = function (_React$Component2) {
    _inherits(PresenterTabletInfoCompetitionInfo, _React$Component2);

    function PresenterTabletInfoCompetitionInfo() {
        _classCallCheck(this, PresenterTabletInfoCompetitionInfo);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    PresenterTabletInfoCompetitionInfo.prototype.renderRow = function renderRow(row, idx) {
        return React.createElement(
            "tr",
            { key: idx },
            React.createElement(
                "th",
                null,
                row[0]
            ),
            React.createElement(
                "td",
                null,
                row[1]
            )
        );
    };

    PresenterTabletInfoCompetitionInfo.prototype.render = function render() {
        return React.createElement(
            "table",
            { className: "competition-info" },
            React.createElement(
                "tbody",
                null,
                this.props.competition.info.map(this.renderRow.bind(this))
            )
        );
    };

    _createClass(PresenterTabletInfoCompetitionInfo, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition: React.PropTypes.object.isRequired
            };
        }
    }]);

    return PresenterTabletInfoCompetitionInfo;
}(React.Component);

var PresenterTabletInfoJudges = function (_React$Component3) {
    _inherits(PresenterTabletInfoJudges, _React$Component3);

    function PresenterTabletInfoJudges() {
        _classCallCheck(this, PresenterTabletInfoJudges);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    PresenterTabletInfoJudges.prototype.renderRow = function renderRow(judge) {
        return React.createElement(
            "tr",
            { key: judge.id },
            React.createElement(
                "th",
                null,
                judge.role_description || (0, _loader._)("global.phrases.judge_n", judge.number)
            ),
            React.createElement(
                "td",
                null,
                judge.name,
                " — ",
                judge.category
            )
        );
    };

    PresenterTabletInfoJudges.prototype.render = function render() {
        return React.createElement(
            "table",
            { className: "judges" },
            React.createElement(
                "tbody",
                null,
                this.props.judges.map(this.renderRow.bind(this))
            )
        );
    };

    _createClass(PresenterTabletInfoJudges, null, [{
        key: "propTypes",
        get: function get() {
            return {
                judges: React.PropTypes.array.isRequired
            };
        }
    }]);

    return PresenterTabletInfoJudges;
}(React.Component);

var PresenterTabletInfoClubs = function (_React$Component4) {
    _inherits(PresenterTabletInfoClubs, _React$Component4);

    function PresenterTabletInfoClubs() {
        _classCallCheck(this, PresenterTabletInfoClubs);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    PresenterTabletInfoClubs.prototype.renderRow = function renderRow(city) {
        return React.createElement(
            "tr",
            { key: city.name },
            React.createElement(
                "th",
                null,
                city.name
            ),
            React.createElement(
                "td",
                null,
                city.clubs.map(function (club) {
                    return React.createElement(
                        "div",
                        { key: club.id },
                        club.name
                    );
                })
            )
        );
    };

    PresenterTabletInfoClubs.prototype.regroupClubs = function regroupClubs() {
        var cities = {};
        this.props.clubs.forEach(function (club) {
            if (!cities[club.city]) {
                cities[club.city] = [];
            }
            cities[club.city].push(club);
        });
        return Object.keys(cities).map(function (city) {
            return {
                name: city,
                clubs: cities[city]
            };
        });
    };

    PresenterTabletInfoClubs.prototype.render = function render() {
        return React.createElement(
            "table",
            { className: "judges" },
            React.createElement(
                "tbody",
                null,
                this.regroupClubs().map(this.renderRow.bind(this))
            )
        );
    };

    _createClass(PresenterTabletInfoClubs, null, [{
        key: "propTypes",
        get: function get() {
            return {
                clubs: React.PropTypes.array.isRequired
            };
        }
    }]);

    return PresenterTabletInfoClubs;
}(React.Component);

var PresenterTabletInfo = function (_React$Component5) {
    _inherits(PresenterTabletInfo, _React$Component5);

    function PresenterTabletInfo() {
        _classCallCheck(this, PresenterTabletInfo);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    PresenterTabletInfo.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "info" },
            React.createElement(
                "h2",
                null,
                this.props.competition.name
            ),
            React.createElement(PresenterTabletInfoCompetitionInfo, { competition: this.props.competition }),
            React.createElement(
                "h3",
                null,
                (0, _loader._)("presenter.headers.judges")
            ),
            React.createElement(PresenterTabletInfoJudges, { judges: this.props.competition.judges }),
            React.createElement(
                "h3",
                null,
                (0, _loader._)("presenter.headers.clubs")
            ),
            React.createElement(PresenterTabletInfoClubs, { clubs: this.props.competition.clubs })
        );
    };

    _createClass(PresenterTabletInfo, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition: React.PropTypes.object.isRequired
            };
        }
    }]);

    return PresenterTabletInfo;
}(React.Component);

var PresenterTabletHeats = function (_React$Component6) {
    _inherits(PresenterTabletHeats, _React$Component6);

    // Intiialization

    function PresenterTabletHeats(props) {
        _classCallCheck(this, PresenterTabletHeats);

        var _this7 = _possibleConstructorReturn(this, _React$Component6.call(this, props));

        _this7.state = {
            tour: null,
            current_heat: 1,
            active_tour_id: null
        };
        _message_dispatcher.message_dispatcher.addListener("db_update", _this7.reloadFromStorage.bind(_this7));
        _message_dispatcher.message_dispatcher.addListener("reload_data", _this7.loadData.bind(_this7));
        _message_dispatcher.message_dispatcher.addListener("active_tour_update", _this7.dispatchActiveTourUpdate.bind(_this7));
        _this7.loadData();
        return _this7;
    }

    PresenterTabletHeats.prototype.reloadFromStorage = function reloadFromStorage() {
        var active_tour_id = this.state.active_tour_id;
        if (active_tour_id === null) {
            this.setState({
                tour: null
            });
            return;
        }
        var active_tour_model = _storage.storage.get("Tour").by_id(active_tour_id);
        if (!active_tour_model) {
            this.setState({
                tour: null
            });
            return;
        }
        this.setState({
            tour: active_tour_model.serialize({
                runs: {
                    participant: {
                        "club": {},
                        "sportsmen": {}
                    }
                },
                discipline: {}
            })
        });
    };

    PresenterTabletHeats.prototype.loadData = function loadData() {
        (0, _api.Api)("tour.find_active", {}).onSuccess(function (response) {
            this.dispatchActiveTourUpdate(response);
        }.bind(this)).send();
    };

    // Dispatchers

    PresenterTabletHeats.prototype.dispatchActiveTourUpdate = function dispatchActiveTourUpdate(response) {
        var tour_id = response.tour_id;
        if (this.state.tour === null && tour_id === null || this.state.tour !== null && this.state.tour.id === tour_id) {
            return;
        }
        this.setState({
            "active_tour_id": tour_id
        });
        if (tour_id === null) {
            _storage.storage.del("Tour");
            _storage.storage.del("Run");
            _storage.storage.del("Participant");
            _storage.storage.del("Sportsman");
            _storage.storage.del("Club");
            _storage.storage.del("Discipline");
            this.setState({
                tour: null,
                current_heat: 1
            });
            return;
        }
        (0, _api.Api)("tour.get", { tour_id: tour_id, children: {
                runs: {
                    participant: {
                        "club": {}
                    }
                },
                discipline: {}
            } }).addToDB("Tour", tour_id).onSuccess(function () {
            this.reloadFromStorage(tour_id);
            this.setState({
                current_heat: 1
            });
        }.bind(this)).send();
    };

    // Actions

    PresenterTabletHeats.prototype.toPrevHeat = function toPrevHeat() {
        this.setState({
            current_heat: this.state.current_heat - 1
        });
    };

    PresenterTabletHeats.prototype.toNextHeat = function toNextHeat() {
        this.setState({
            current_heat: this.state.current_heat + 1
        });
    };

    // Helpers

    PresenterTabletHeats.prototype.getHeatsCount = function getHeatsCount() {
        var _Math;

        return (_Math = Math).max.apply(_Math, this.state.tour.runs.map(function (run) {
            return run.heat;
        }));
    };

    // Rendering

    PresenterTabletHeats.prototype.renderHeader = function renderHeader() {
        var btn_prev = null;
        var btn_next = null;
        if (this.state.tour !== null) {
            if (this.state.current_heat > 1) {
                btn_prev = React.createElement(
                    "button",
                    _extends({ className: "btn btn-primary pull-left" }, (0, _tablet_components.onTouchOrClick)(this.toPrevHeat.bind(this))),
                    (0, _loader._)("tablet.buttons.prev_heat")
                );
            }
            if (this.state.current_heat < this.getHeatsCount()) {
                btn_next = React.createElement(
                    "button",
                    _extends({ className: "btn btn-primary pull-right" }, (0, _tablet_components.onTouchOrClick)(this.toNextHeat.bind(this))),
                    (0, _loader._)("tablet.buttons.next_heat")
                );
            }
        }
        var current_tour = this.state.tour === null ? null : React.createElement(
            "div",
            { className: "header" },
            React.createElement(
                "h1",
                null,
                this.state.tour.discipline.name
            ),
            React.createElement(
                "h2",
                null,
                this.state.tour.name
            )
        );
        return React.createElement(
            "header",
            null,
            btn_prev,
            btn_next,
            current_tour
        );
    };

    PresenterTabletHeats.prototype.renderSplashScreen = function renderSplashScreen() {
        return React.createElement(
            "div",
            { className: "splash-screen" },
            React.createElement(
                "div",
                null,
                (0, _loader._)("presenter.labels.no_active_tour")
            ),
            React.createElement("div", { className: "spacer" })
        );
    };

    PresenterTabletHeats.prototype.renderHeat = function renderHeat() {
        var _this8 = this;

        var runs = this.state.tour.runs.filter(function (run) {
            return run.heat === _this8.state.current_heat;
        });
        return React.createElement(
            "div",
            { className: "heat" },
            React.createElement(
                "h3",
                null,
                (0, _loader._)("tablet.headers.heat"),
                ": ",
                this.state.current_heat,
                " / ",
                this.getHeatsCount()
            ),
            runs.map(function (run) {
                return React.createElement(
                    "table",
                    { key: run.id },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { className: "number", rowSpan: "2" },
                                run.participant.number
                            ),
                            React.createElement(
                                "td",
                                { className: "name" },
                                run.participant.name
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { className: "club" },
                                run.participant.club.name,
                                ", ",
                                run.participant.club.city
                            )
                        )
                    )
                );
            }),
            React.createElement("div", { className: "spacer" })
        );
    };

    PresenterTabletHeats.prototype.render = function render() {
        if (this.state.judge === null) {
            return React.createElement(_components.Loader, null);
        }
        if (this.state.tour === null) {
            return React.createElement(
                "div",
                { className: "heats" },
                this.renderSplashScreen()
            );
        }
        return React.createElement(
            "div",
            { className: "heats" },
            this.renderHeader(),
            this.renderHeat()
        );
    };

    return PresenterTabletHeats;
}(React.Component);

var PresenterTabletResultsDisciplineSelector = function (_React$Component7) {
    _inherits(PresenterTabletResultsDisciplineSelector, _React$Component7);

    function PresenterTabletResultsDisciplineSelector() {
        _classCallCheck(this, PresenterTabletResultsDisciplineSelector);

        return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
    }

    PresenterTabletResultsDisciplineSelector.prototype.render = function render() {
        var _this10 = this;

        return React.createElement(
            "div",
            { className: "disciplines" },
            this.props.disciplines.map(function (discipline) {
                return React.createElement(
                    "div",
                    _extends({ className: "item" + (_this10.props.active === discipline.id ? " active" : ""),
                        key: discipline.id
                    }, (0, _tablet_components.onTouchOrClick)(function () {
                        return _this10.props.onDisciplineChange(discipline.id);
                    })),
                    discipline.name
                );
            })
        );
    };

    _createClass(PresenterTabletResultsDisciplineSelector, null, [{
        key: "propTypes",
        get: function get() {
            return {
                disciplines: React.PropTypes.array.isRequired,
                active: React.PropTypes.number.isRequired,
                onDisciplineChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return PresenterTabletResultsDisciplineSelector;
}(React.Component);

var PresenterTabletResults = function (_React$Component8) {
    _inherits(PresenterTabletResults, _React$Component8);

    _createClass(PresenterTabletResults, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition: React.PropTypes.object.isRequired
            };
        }
    }]);

    function PresenterTabletResults(props) {
        _classCallCheck(this, PresenterTabletResults);

        var _this11 = _possibleConstructorReturn(this, _React$Component8.call(this, props));

        _this11.state = {
            active_discipline: null
        };
        return _this11;
    }

    PresenterTabletResults.prototype.render = function render() {
        var _this12 = this;

        return React.createElement(
            "div",
            { className: "results" },
            React.createElement(PresenterTabletResultsDisciplineSelector, {
                active: this.state.active_discipline,
                disciplines: this.props.competition.disciplines,
                onDisciplineChange: function onDisciplineChange(new_discipline) {
                    return _this12.setState({ active_discipline: new_discipline });
                } }),
            this.state.active_discipline !== null ? React.createElement(_discipline_results.DisciplineResults, { discipline_id: this.state.active_discipline,
                renderer: "presenter",
                key: this.state.active_discipline }) : React.createElement("div", { className: "discipline-results" })
        );
    };

    return PresenterTabletResults;
}(React.Component);

var Presenter = exports.Presenter = function (_React$Component9) {
    _inherits(Presenter, _React$Component9);

    _createClass(Presenter, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition_id: React.PropTypes.number.isRequired
            };
        }
    }]);

    function Presenter(props) {
        _classCallCheck(this, Presenter);

        var _this13 = _possibleConstructorReturn(this, _React$Component9.call(this, props));

        _this13.state = {
            page: "info",
            competition: null
        };
        _message_dispatcher.message_dispatcher.addListener("db_update", _this13.reloadFromStorage.bind(_this13));
        _message_dispatcher.message_dispatcher.addListener("reload_data", _this13.loadData.bind(_this13));
        _this13.loadData();
        return _this13;
    }

    Presenter.prototype.reloadFromStorage = function reloadFromStorage() {
        this.setState({
            "competition": _storage.storage.get("Competition").by_id(this.props.competition_id).serialize({
                clubs: {},
                disciplines: {},
                judges: {}
            })
        });
    };

    Presenter.prototype.loadData = function loadData() {
        (0, _api.Api)("competition.get", { competition_id: this.props.competition_id, children: {
                clubs: {},
                disciplines: {},
                judges: {}
            } }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    Presenter.prototype.switchPage = function switchPage(new_page) {
        this.setState({
            page: new_page
        });
    };

    Presenter.prototype.renderBody = function renderBody() {
        if (this.state.competition === null) {
            return React.createElement(_components.Loader, null);
        }
        switch (this.state.page) {
            case "info":
                return React.createElement(PresenterTabletInfo, { competition: this.state.competition });
            case "heats":
                return React.createElement(PresenterTabletHeats, null);
            case "results":
                return React.createElement(PresenterTabletResults, { competition: this.state.competition });
        }
    };

    Presenter.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "presenter-tablet" },
            React.createElement(PresenterTabletLeftBar, {
                active: this.state.page,
                onPageSwitch: this.switchPage.bind(this) }),
            React.createElement(
                "div",
                { className: "content" },
                this.renderBody()
            )
        );
    };

    return Presenter;
}(React.Component);

},{"admin/judging/discipline_results":1,"i10n/loader":5,"server/api":8,"server/message_dispatcher":9,"server/storage":10,"ui/components":11,"ui/tablet_components":14}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocxImpl = function () {
    function DocxImpl(filename) {
        _classCallCheck(this, DocxImpl);

        this.filename = filename;
        this.header = null;
        this.title1 = null;
        this.title2 = null;
        this.title3 = null;
        this.margins = null;
        this.body = "";
        this.orientation = "portrait";
        this.styles = {
            "body": {
                "font-size": "10pt",
                "font-family": "Calibri, Tahoma, Arial, sans-serif"
            },
            "table": {
                "border-collapse": "collapse",
                "width": "100%"
            },
            "tr": {
                "page-break-inside": "avoid"
            },
            "td, th": {
                "padding": "1pt 3pt"
            },
            "h1, h2, h3, h4, h5, h6": {
                "page-break-after": "avoid",
                "margin-bottom": 0
            },
            "h1": {
                "font-size": "20pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "10pt"
            },
            "h2": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "6pt"
            },
            "h3": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "4pt"
            },
            "h4 p": {
                "font-size": "14pt",
                "font-weight": "bold",
                "margin": "10pt 0 6pt"
            },
            "h5 p": {
                "font-size": "12pt",
                "font-weight": "bold",
                "margin": "6pt 0"
            },
            ".header": {
                "border-bottom": "1px solid black",
                "font-size": "10pt",
                "font-weight": "bold",
                "margin": 0,
                "padding-bottom": "2pt",
                "margin-bottom": "20pt",
                "text-align": "center"
            },
            "p": {
                "margin": 0,
                "padding": 0
            },
            ".spacer": {
                "font-size": "14pt"
            },
            ".va-top": {
                "vertical-align": "top"
            },
            ".text-left": { "text-align": "left" },
            ".text-right": { "text-align": "right" },
            ".text-center": { "text-align": "center" },
            ".bordered-table td, .bordered-table th": {
                "border": "1pt solid black"
            }
        };
        this.addWidthCss();
    }

    DocxImpl.prototype.addWidthCss = function addWidthCss() {
        for (var i = 1; i <= 100; ++i) {
            this.addStyle(".w-" + i, "width", i + "%");
        }
    };

    DocxImpl.prototype.addStyle = function addStyle(selector, key, value) {
        if (!this.styles[selector]) {
            this.styles[selector] = {};
        }
        this.styles[selector][key] = value;
        return this;
    };

    DocxImpl.prototype.setHeader = function setHeader(header) {
        this.header = header;
        return this;
    };

    DocxImpl.prototype.setTitle1 = function setTitle1(title1) {
        this.title1 = title1;
        return this;
    };

    DocxImpl.prototype.setTitle2 = function setTitle2(title2) {
        this.title2 = title2;
        return this;
    };

    DocxImpl.prototype.setTitle3 = function setTitle3(title3) {
        this.title3 = title3;
        return this;
    };

    DocxImpl.prototype.setMargins = function setMargins(margins) {
        this.margins = margins;
        return this;
    };

    DocxImpl.prototype.setBody = function setBody(body) {
        this.body = body;
        return this;
    };

    DocxImpl.prototype.setOrientation = function setOrientation(orientation) {
        this.orientation = orientation;
        return this;
    };

    DocxImpl.prototype.renderStyleBlock = function renderStyleBlock(selector, data) {
        var css_pairs = Object.getOwnPropertyNames(data).map(function (key) {
            return key + ': ' + data[key] + '; ';
        });
        return selector + " { " + css_pairs.join(" ") + " }";
    };

    DocxImpl.prototype.renderStyles = function renderStyles() {
        var _this = this;

        var css_blocks = Object.getOwnPropertyNames(this.styles).map(function (selector) {
            return _this.renderStyleBlock(selector, _this.styles[selector]);
        }.bind(this));
        return css_blocks.join("\n");
    };

    DocxImpl.prototype.renderHTML = function renderHTML() {
        var css = this.renderStyles();
        var header = this.header ? '<p class="header">' + this.header + '</p>' : "";
        var title1 = this.title1 ? '<h1>' + this.title1 + '</h1>' : "";
        var title2 = this.title2 ? '<h2>' + this.title2 + '</h2>' : "";
        var title3 = this.title3 ? '<h3>' + this.title3 + '</h3>' : "";
        var spacer = header || title1 || title2 || title3 ? '<p class="spacer">&nbsp;</p>' : "";
        return "<!DOCTYPE html>\n" + "<html><head>" + "<meta charset=\"utf-8\">" + "<style>\n" + css + "\n</style>\n" + "</head><body>\n" + header + title1 + title2 + title3 + spacer + this.body + "</body></html>";
    };

    DocxImpl.prototype.save = function save() {
        var html = this.renderHTML();
        var margins = this.margins || (this.orientation === "portrait" ? [10, 15, 10, 15] : [7, 10, 7, 10]);
        var converted = htmlDocx.asBlob(html, {
            orientation: this.orientation,
            margins: {
                top: Math.floor(margins[0] * 56.659).toString(),
                right: Math.floor(margins[1] * 56.659).toString(),
                bottom: Math.floor(margins[2] * 56.659).toString(),
                left: Math.floor(margins[3] * 56.659).toString()
            }
        });
        saveAs(converted, this.filename);
    };

    return DocxImpl;
}();

var Docx = exports.Docx = function Docx(fn) {
    return new DocxImpl(fn);
};

},{}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":6}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.translate = translate;
function translate(src, arg) {
    function chooseEnding(n, e1, e2, e5) {
        var x = n % 100;
        if (Math.floor(x / 10) === 1) {
            return e5;
        }
        if (x % 10 === 1) {
            return e1;
        }
        if (x % 10 >= 5 || x % 10 === 0) {
            return e5;
        }
        return e2;
    }

    var PHRASES = {
        "admin": {
            "alerts": {
                "add_programs_after_creation": "Программы можно будет добавить только после сохранения участника",
                "auto_printer_available": "Автоматическая печать корректно настроена и может быть использована.",
                "auto_printer_not_available": "Автоматическая печать недоступна на этом компьтере.",
                "no_finalized": "Отсутствуют финализированные туры",
                "unfinalize_warning": React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "strong",
                            null,
                            "Финализация должна отменяться только в исключительных случаях!"
                        )
                    ),
                    React.createElement(
                        "p",
                        null,
                        "Если же это действительно необходимо, обратите внимание, что после повторной финализации список участников следующего тура будет автоматически пересоздан. Результаты участников, прошедших в следующий тур после первой финализации и не прошедших после повторной будут безвозвратно утеряны!"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "И не забудьте заново напечатать все тблицы."
                    )
                )
            },
            "auto_printer": {
                "discipline": "Дисциплина",
                "discipline_results": "Результаты дисциплины",
                "heats": "Заходы",
                "print_test_page": "Напечатать тестовую страницу",
                "queue": "Очередь печати",
                "queue_empty": "Очередь пуста",
                "results_1": "Краткая таблица",
                "results_2": "Средняя таблица",
                "results_3": "Подробная таблица",
                "rules": "Задания",
                "test": "",
                "test_page": "Тестовая страница",
                "test_text": "Это тестовая страница RockJudge"
            },
            "buttons": {
                "add_club": "Добавить клуб",
                "add_competition": "Создать соревнование",
                "add_competition_plan_item": "Добавить элемент",
                "add_discipline": "Добавить дисциплину",
                "add_judge": "Добавить судью",
                "add_participant": "Добавить участника",
                "add_tour": "Добавить тур",
                "confirm_score": "Зафиксировать",
                "docx_heats": "Заходы в DOCX",
                "docx_numbers": "Номера в DOCX",
                "docx_results": "Результаты в DOCX",
                "export": "Экспортировать",
                "import": "Импортировать",
                "launch_auto_printer": "Запуск автоматической печати",
                "load_acro": "Загрузить акробатику",
                "refresh_clients": "Перезагрузить все устройства",
                "reload_clients": "Обновить данные на всех устройствах",
                "switch_to_plan": "Сортирока по программе",
                "switch_to_disciplines": "Сортирока по дисциплинам",
                "to_start_page": "На главную",
                "unconfirm_score": "Отмена фиксации",
                "unfinalize": "Отменить финализацию"
            },
            "confirms": {
                "delete_club": "Вы действительно хотите удалить этот клуб?",
                "delete_competition": "Вы действительно хотите удалить это соревнование?",
                "delete_discipline": "Вы действительно хотите удалить эту дисциплину?",
                "delete_judge": "Вы действительно хотите удалить этого судью?",
                "delete_participant": "Вы действительно хотите удалить этого участника?",
                "delete_program": "Вы действительно хотите удалить эту программу?",
                "delete_tour": "Вы действительно хотите удалить этот тур?",
                "refresh_clients": "Вы действительно хотите перезагрузить страницу на всех клиентах?",
                "reload_clients": "Вы действительно хотите обновить данные на всех клиентах?",
                "unfinalize_tour": "Вы действительно хотите отменить финализацию тура? Введите «unfinalize», чтобы продолжить"
            },
            "headers": {
                "auto_printer": "Автоматическая печать",
                "clients_management": "Управление подключенными устройствами",
                "clubs": "Клубы-участники",
                "clubs_management": "Управление клубами",
                "competition_plan": "Программа соревнований",
                "competition_plan_management": "Программа соревнований",
                "competition_report": "Протокол соревнований",
                "competition_results": "Результаты соревнований",
                "competitions_management": "Управление соревнованиями",
                "discipline_results": "Результаты дисциплины",
                "disciplines_management": "Управление дисциплинами",
                "export_competition": "Экспорт данных турнира и результатов",
                "import_competition": "Импорт данных турнира",
                "import_export": "Импорт / экспорт",
                "judges": "Судейская бригада",
                "judges_management": "Управление судьями",
                "load_acrobatics": "Загрузка акробатики",
                "participants_management": "Управление участниками",
                "service_menu": "Сервисное меню",
                "start_list": "Стартовый лист",
                "tour_heats": "Заходы участников",
                "tour_results": "Результаты тура",
                "unfinalize_tour": "Отмена финализации тура",
                "unpicked_tours": "Не включены в программу"
            },
            "labels": {
                "competition_name": "Наименование соревнования",
                "competition_date": "Дата проведения",
                "include_acrobatics": "Включить акробатику",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "no_files_selected": "Выберите файл...",
                "paste_acro": "Вставьте данные из калькулятора акробатики"
            },
            "messages": {
                "invalid_passcode": "Введён неверный код потверждения"
            },
            "menu": {
                "competition_report": "Протокол соревнований",
                "discipline_results": "Результаты дисциплины",
                "import_export": "Импорт / экспорт",
                "manage_clubs": "Управление клубами",
                "manage_competition_plan": "Программа соревнований",
                "manage_disciplines": "Управление дисциплинами",
                "manage_judges": "Управление судьями",
                "manage_sportsmen": "Управление спортсменами",
                "manage_tours": "Управление турами",
                "start_list": "Стартовый лист"
            },
            "phrases": {
                "total_n_participants": function total_n_participants(n) {
                    return "Итого " + n + " участник" + chooseEnding(n, "", "а", "ов");
                }
            },
            "judging-tabs": {
                "tour-admin": "Управление",
                "heats": "Заходы",
                "results-1": "Краткая таблица",
                "results-2": "Средняя таблица",
                "results-3": "Подробная таблица",
                "discipline-results": "Результаты дисциплины"
            }
        },
        "errors": {
            "admin": {
                "load_syntax_error": "Некорректный формат данных"
            },
            "api": {
                "duplicated_external_id": "В данных имеются записи с повторяющимимся external_id",
                "unable_to_get": function unable_to_get(wanted) {
                    return "Невозможно получить " + wanted + " из запроса";
                }
            },
            "club": {
                "delete_with_participants": "Невозможно удалить клуб, к которому привязаны участники"
            },
            "competition": {
                "delete_non_empty": "Невозможно удалить соревнование, содержащее дисциплины, клубы или судей"
            },
            "competition_plan": {
                "too_many_tours": function too_many_tours(d) {
                    return ["Ошибка в программе соревнований", "В дисциплине " + d + " содержится больше туров, чем создано в системе"];
                }
            },
            "discipline": {
                "change_judges_with_finalized_tour": "Невозможно изменить состав судей для дисциплины, содержащей финализированные туры ",
                "delete_with_participants": "Невозможно удалить дисциплину, содержащую участников",
                "delete_with_tours": "Невозможно удалить дисциплину, содержащую туры"
            },
            "discipline_judge": {
                "delete_with_finalized": "Невозможно удалить судью, у корого есть финализированне туры",
                "delete_with_scores": "Невозможно удалить судью принявшего участие в судействе хотя бы одного тура",
                "repeating_judge": function repeating_judge(name) {
                    return name + " встречается в списке судей более одного раза";
                }
            },
            "global": {
                "internal_server_error": ["Ошибка на сервере", "проверьте логи для информации"]
            },
            "judge": {
                "delete_with_disciplines": "Невозможно удалить судью, входящего в судейскую бригаду хотя бы одной дисциплины"
            },
            "run": {
                "set_performed_flag_on_finalized": "Невозможно изменить статус захода финализинованного тура"
            },
            "score": {
                "score_not_exist": "Попытка получить значение несуществующей оценки судьи",
                "update_on_finalized_tour": "Невозможно изменить оценку в финализированном туре"
            },
            "tour": {
                "add_before_finalized": "Невозможно добавить новый тур перед финализированным",
                "delete_finalized": "Невозможно удалить финализированный тур",
                "delete_in_competition_plan": "Невозможно удалить тур, присутствующий в программе соревнований",
                "init_finailzed": "Невозможно пересоздать финализированный тур",
                "invalid_add_after_id": "Попытка добаить тур в несуществующее место",
                "load_to_non_empty": function load_to_non_empty(d) {
                    return ["Невозможно загрузить туры для дисциплины", "Дисциплина " + d + " уже содержит туры"];
                },
                "next_is_finailzed": "Следующий тур не должен быть финализирован",
                "no_next_tour": "Данный тур последний в программе соревнований",
                "not_in_competition_plan": "Данный тур не содержится в программе соревнований",
                "prev_not_finailzed": "Предыдущий тур должен быть финализирован",
                "start_finalized": "Невозможно запустить финализированный тур",
                "update_finalized": "Для финализированного тура не допускается изменение квоты вывода, типа тура или системы судейства"
            }
        },
        "global": {
            "buttons": {
                "add": "Добавить",
                "close": "Закрыть",
                "deselect_all": "Снять все",
                "edit": "Редактировать",
                "delete": "Удалить",
                "discard": "Отменить",
                "load": "Загрузить",
                "save": "Сохранить",
                "select_all": "Выбрать все",
                "submit": "Сохранить"
            },
            "labels": {
                "browse": "Обзор...",
                "yes": "Да",
                "no": "Нет"
            },
            "messages": {
                "connection_error": "Похоже, имеются проблемы с сетью",
                "error_header": "Ошибка",
                "success": "Операция успешно завершена"
            },
            "phrases": {
                "heat_n": function heat_n(n) {
                    return "Заход №" + n.toString();
                },
                "judge_n": function judge_n(n) {
                    return "Линейный судья №" + n.toString();
                },
                "participant_n": function participant_n(n, name, n_sp) {
                    return n_sp > 2 ? "Формейшн №" + n.toString() + (name ? ": " + name : "") : (n_sp === 2 ? "Пара №" : "Участник №") + n.toString();
                }
            }
        },
        "judging": {
            "buttons": {
                "confirm_score": "Зафиксировать",
                "init_tour": "Пересоздать тур",
                "finalize_tour": "Финализировать",
                "reset_acrobatic_override": "Сброс",
                "shuffle_heats": "Перемешать заходы",
                "start_tour": "Начать тур",
                "stop_tour": "Остановить тур"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "init_tour": "Вы действительно хотите пересоздать этот тур?",
                "load_program": "Вы действительно хотите перезагрузить программу для этого участника?",
                "shuffle_heats": "Вы действительно хотите перемешать заходы?",
                "stop_tour": "Вы действительно хотите остановить этот тур?"
            },
            "headers": {
                "acrobatic_overrides": "Корректировки базовых оценок акробатики"
            },
            "labels": {
                "acro_description": "Описание трюка",
                "acro_idx": "№ трюка",
                "acrobatics": "Акробатика",
                "club": "Клуб",
                "confirmed": "Зафиксировано",
                "heat": "Заход",
                "new_score": "Корр.",
                "number": "№",
                "old_score": "База",
                "participant_name": "Участник",
                "performed": "В",
                "total_score": "Сумма баллов"
            }
        },
        "models": {
            "club": {
                "name": "Название клуба",
                "city": "Город",
                "external_id": "Внешний ID"
            },
            "competition": {
                "active": "Активно",
                "date": "Дата",
                "info": "Дополнительная информация для протокола",
                "info_item_title": "Заголовок",
                "info_item_value": "Значение",
                "name": "Название"
            },
            "competition_plan_item": {
                "discipline": "Дисциплина",
                "estimated_beginning": "Начало",
                "estimated_duration": "Длительность",
                "name": "Название",
                "sp": "Приоритет",
                "tour": "Тур",
                "verbose_name": "Название"
            },
            "discipline": {
                "discipline_judges": "Судьи",
                "external_id": "Внешний ID",
                "name": "Название дисциплины",
                "sp": "Приоритет"
            },
            "judge": {
                "category": "Категория",
                "external_id": "Вн. ID",
                "name": "Ф. И. О.",
                "number": "Номер",
                "role": "Роль в судействе",
                "role_description": "Должность",
                "sp": "Приоритет"
            },
            "participant": {
                "acro_description": "Описание трюка",
                "acro_descriptions": "Описание трюков",
                "acro_score": "Оценка",
                "acrobatics": "Акробатика",
                "club_name": "Клуб",
                "club_city": "Город",
                "coaches": "Тренеры",
                "first_name": "Имя",
                "gender": "Пол",
                "gender_f": "Ж",
                "gender_m": "М",
                "general_info": "Основная информация",
                "formation_name": "Название команды формейшн",
                "last_name": "Фамилия",
                "name": "Участник",
                "number": "Номер",
                "programs": "Программы",
                "sportsmen": "Спортсмены",
                "sportsmen_year_of_birth": "Г.р.",
                "year_of_birth": "Год рождения",
                "yob": "Г.р."
            },
            "program": {
                "default_for": "По умолчанию",
                "name": "Название программы"
            },
            "tour": {
                "default_program": "Акробатика по умолчанию",
                "is_hope_tour": "Тур «Надежды»",
                "name": "Название тура",
                "num_advances": "Квота вывода",
                "participants_per_heat": "Участников в заходе",
                "scoring_system_name": "Система судейства"
            }
        },
        "screen_operator": {
            "buttons": {
                "reset_heat": "Сброс номера захода",
                "reset_place": "Сброс места"
            },
            "headers": {
                "discipline": "Дисциплина",
                "heat": "Заход",
                "places": "Места для вывода",
                "tour": "Тур"
            },
            "labels": {
                "place": "место",
                "heat": "заход"
            }
        },
        "presenter": {
            "headers": {
                "clubs": "Клубы-участники",
                "heats": "Заходы",
                "info": "Информация",
                "judges": "Судьи",
                "results": "Результаты"
            },
            "labels": {
                "no_active_tour": "Нет активного тура",
                "place": "место"
            }
        },
        "results": {
            "alerts": {
                "not_finalized": "Данные результаты не являются окончательными."
            },
            "buttons": {
                "print": "Печать",
                "simple_view": "Упрощенная таблица",
                "verbose_view": "Подробная таблица"
            }
        },
        "start_page": {
            "headers": {
                "select_competition": "Выберите соревнование для продолжения",
                "select_role": "Выберите свою роль"
            },
            "messages": {
                "no_competitions": "Нет активных соревнований",
                "competitions_management_link": function competitions_management_link(link) {
                    return React.createElement(
                        "span",
                        null,
                        "Управление соревнованиями находится по адресу ",
                        React.createElement(
                            "a",
                            { href: link },
                            link
                        )
                    );
                }
            },
            "roles": {
                "administrator": "Администратор",
                "presenter": "Ведущий",
                "screen": "Экран",
                "screen_operator": "Оператор экрана"
            }
        },
        "tablet": {
            "buttons": {
                "finalize_tour": "Финализировать тур",
                "finalize_tour_and_start_next": "Финализировать тур и перейти к следующему",
                "next_heat": "След. заход",
                "not_performed": "Невыход на площадку",
                "performed": "Отмена невыхода на площадку",
                "prev_heat": "Пред. заход",
                "reset_stopwatch": "Сброс",
                "start_stopwatch": "Старт",
                "stop_stopwatch": "Стоп",
                "stop_tour": "Завершить тур",
                "stop_tour_and_start_next": "Перейти к следующему туру",
                "to_start_page": "На главную"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "finalize_tour_and_start_next": "Вы действительно хотите финализировать этот тур и перейти к следующему туру?",
                "stop_tour": "Вы действительно хотите остановить этот тур?",
                "stop_tour_and_start_next": "Вы действительно хотите перейти к следующему туру?"
            },
            "headers": {
                "acro_n": function acro_n(n) {
                    return "Акробатика №" + (n + 1);
                },
                "heat": "Заход",
                "presenter": "Ведущий",
                "select_page": "Страница"
            },
            "messages": {
                "not_judging_discipline": "Вы не участвуете в судействе данной дисциплины",
                "not_judging_participant": "Вы не оцениваете этого участника",
                "not_judging_tour": "Вы не оцениваете этот тур",
                "not_performing": "Не выступает"
            },
            "pages": {
                "acrobatics": "Акробатика",
                "actions": "Действия",
                "dance": "Танец",
                "heats": "Заходы",
                "results": "Результаты"
            }
        },

        "scoring_systems": {
            "rosfarr": {
                "tablet": {
                    "acro_judge": {
                        "fall_down": "Падения (-30)"
                    },
                    "dance_judge": {
                        "acrobatics": "Акробатика",
                        "big_mistakes": "Большие ошибки (-30)",
                        "composition": "Композиция",
                        "dance_figs": "Танцевальные фигуры",
                        "dance_tech": "Техника танцевания",
                        "form_fall_down": "Падения (-3)",
                        "form_mistakes": "Ошибки (-2)",
                        "form_small_mistakes": "Маленькие ошибки (-2)",
                        "form_big_mistakes": "Большие ошибки (-3)",
                        "fw_man": "Основной ход, партнёр (сбавка в %)",
                        "fw_woman": "Основной ход, партнёрша (сбавка в %)",
                        "impression": "Общее впечатление",
                        "points": "Оценка",
                        "small_mistakes": "Маленькие ошибки (-5)"
                    },
                    "global": {
                        "total_score": "Сумма баллов"
                    },
                    "head_judge": {
                        "acrobatic_overrides": "Корректировки акробатики",
                        "black_card": "-100",
                        "dance_judge_scores": "Оценки линейных судей",
                        "ok": "OK",
                        "penalty_type": "Штрафные санкции",
                        "previous_penalties": "Предыдущие штрафы",
                        "red_card": "-30",
                        "yellow_card": "-3",
                        "form_yellow_card": "-5",
                        "form_red_card": "-15"
                    },
                    "tech_judge": {
                        "jump_steps": "Основные ходы",
                        "reset_to_n": function reset_to_n(n) {
                            return "Сброс на " + n.toString();
                        },
                        "timing": "Длительность"
                    }
                },
                "results": {
                    "breakdown": {
                        "a": "A",
                        "acro_n": function acro_n(n) {
                            return "A" + n.toString();
                        },
                        "bm": "БО",
                        "c": "К",
                        "df": "ТФ",
                        "dt": "ТT",
                        "fd": "П",
                        "fm": "ОХм",
                        "fw": "ОХж",
                        "i": "ОВ",
                        "m": "Ош",
                        "p": "М",
                        "sm": "МО",
                        "t": "Σ"
                    },
                    "headers": {
                        "participants_advanced": "Прошли в следующий тур",
                        "participants_not_advanced": "Не прошли в следующий тур",
                        "participants_not_performed": "Не выступали"
                    },
                    "labels": {
                        "acro_score": "Результат акро",
                        "acrobatics": "Акробатика",
                        "acrobatics_verbose": "Акробатика (заявка/факт)",
                        "card": "Штраф",
                        "fw_score": "Результат ТН",
                        "fw_score_short": "ТН",
                        "info": "Участник, результат",
                        "next_tour": "Следующий тур",
                        "not_performed": "Не принимал участие",
                        "number": "№",
                        "participant_club": "Клуб",
                        "participant_coaches": "Тренеры",
                        "participant_name": "Участник",
                        "penalty": "Штраф главного судьи",
                        "place": "Место",
                        "sportsmen": "Спортсмены",
                        "sportsmen_year_of_birth": "Г.р.",
                        "total_score": "Итог"
                    }
                }
            }
        },

        "scoring_systems_names": {
            "rosfarr": {
                "acro": "РосФАРР, акробатические программы",
                "am_final_acro": "РосФАРР, A и M классы, финал, акробатика",
                "am_final_fw": "РосФАРР, A и M классы, финал, техника ног",
                "formation": "РосФАРР, формейшн без акробатики",
                "formation_acro": "РосФАРР, формейшн с акробатикой",
                "no_acro": "РосФАРР, танцевальные программы",
                "simplified": "РосФАРР, упрощенная система (1–40)"
            }
        },
        "judge_roles": {
            "": "-",
            "acro_judge": "Судья акробатики",
            "dance_judge": "Судья танца",
            "head_judge": "Главный судья",
            "tech_judge": "Технический судья"
        }
    };
    var path = src.split(".");
    var phrase_ptr = PHRASES;
    path.forEach(function (chunk) {
        return phrase_ptr = phrase_ptr[chunk];
    });
    if (typeof phrase_ptr === "undefined") {
        console.error("Unable to find translation for " + src);
        return;
    }
    if (typeof phrase_ptr === "function") {
        var args = [];
        for (var idx = 1; idx < arguments.length; ++idx) {
            args.push(arguments[idx]);
        }
        return phrase_ptr.apply(undefined, args);
    }
    return phrase_ptr;
}

var getPossibleTourNames = exports.getPossibleTourNames = function getPossibleTourNames() {
    return ["Финал", "Тур «Надежды»", "Отборочный тур", "1/2 финала", "1/4 финала", "1/8 финала", "1/16 финала", "Финал, техника ног", "Финал, акробатика"];
};

},{}],7:[function(require,module,exports){
"use strict";

var _main = require("clients/presenter/main");

ReactDOM.render(React.createElement(_main.Presenter, window.page_props), window.document.getElementById("content"));

},{"clients/presenter/main":3}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Api = undefined;

var _loader = require("i10n/loader");

var _storage = require("server/storage");

var _dialogs = require("ui/dialogs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiImpl = function () {
    function ApiImpl(method, data) {
        _classCallCheck(this, ApiImpl);

        this.method = method;
        this.data = data;
        this.cb_success = function () {};
        this.cb_error = function (msg, code, args) {
            return (0, _dialogs.showError)(code ? _loader._.apply(undefined, [code].concat(args)) : msg);
        };
        this.cb_fail = function () {
            var _console;

            for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
                data[_key] = arguments[_key];
            }

            return (_console = console).error.apply(_console, ["API fail"].concat(data));
        };
        this.cb_done = function () {};
        this.update_db = function () {};
    }

    ApiImpl.prototype.onDone = function onDone(callback) {
        this.cb_done = callback;
        return this;
    };

    ApiImpl.prototype.onSuccess = function onSuccess(callback) {
        this.cb_success = callback;
        return this;
    };

    ApiImpl.prototype.onError = function onError(callback) {
        this.cb_error = callback;
        return this;
    };

    ApiImpl.prototype.onFail = function onFail(callback) {
        this.cb_fail = callback;
        return this;
    };

    ApiImpl.prototype.addToDB = function addToDB(model_type, model_id) {
        var st = arguments.length <= 2 || arguments[2] === undefined ? _storage.storage : arguments[2];

        this.update_db = function (response) {
            st.get(model_type).add(model_id, response);
        };
        return this;
    };

    ApiImpl.prototype.send = function send() {
        var _this = this;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api", true);
        xhr.onload = function () {
            _this.cb_done();
            if (xhr.status !== 200) {
                _this.cb_fail();
                return;
            }
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                _this.update_db(response.response);
                _this.cb_success(response.response);
            } else {
                _this.cb_error(response.message, response.code, response.args);
            }
        };
        xhr.onerror = function () {
            _this.cb_done();
            _this.cb_fail();
        };
        var data = new FormData();
        data.append("client_id", window.client_id);
        data.append("data", JSON.stringify(this.data));
        data.append("method", this.method);
        xhr.send(data);
    };

    return ApiImpl;
}();

var Api = exports.Api = function Api() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(ApiImpl, [null].concat(args)))();
};

},{"i10n/loader":5,"server/storage":10,"ui/dialogs":12}],9:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.message_dispatcher = undefined;

var _storage = require("server/storage");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageDispatcher = function () {
    function MessageDispatcher() {
        _classCallCheck(this, MessageDispatcher);

        this.closed = false;
        this.listeners = {};
        this.listeners_cnt = 0;
        this.connect();
    }

    MessageDispatcher.prototype.connect = function connect() {
        console.log("Connecting to websocket...");
        this.ws = new SockJS("http://" + window.location.host + "/ws");
        this.ws.onopen = function () {
            console.log("Connected.");
            if (this.closed) {
                this.onMessage({
                    data: JSON.stringify({
                        messages: [["reload_data", null]],
                        model_updates: []
                    })
                });
            }
        }.bind(this);
        this.ws.onclose = function () {
            console.log("Connection closed.");
            this.closed = true;
            setTimeout(this.connect.bind(this), 500);
        }.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
    };

    MessageDispatcher.prototype.onMessage = function onMessage(message) {
        var _this = this;

        var data = JSON.parse(message.data);
        if (data["client_id"]) {
            window.client_id = data["client_id"];
            return;
        }
        data.messages.forEach(function (data) {
            var msg_type = data[0];
            var msg_data = data[1];
            var listeners = this.listeners[msg_type] || {};
            if (msg_type === "force_refresh") {
                window.location.reload(true);
            }
            Object.keys(this.listeners[msg_type] || {}).forEach(function (key) {
                return listeners[key](msg_data);
            });
        }.bind(this));
        var data_changed = false;
        data.model_updates.forEach(function (model_info) {
            data_changed = _storage.storage.updateModel(model_info.model, model_info.id, model_info.data) || data_changed;
        });
        if (data_changed) {
            (function () {
                var listeners = _this.listeners["db_update"] || {};
                Object.keys(listeners).forEach(function (key) {
                    if (listeners[key]) {
                        listeners[key]();
                    }
                });
            })();
        }
    };

    MessageDispatcher.prototype.getListenerId = function getListenerId() {
        return this.listeners_cnt++;
    };

    MessageDispatcher.prototype.addListener = function addListener(msg_types, callback) {
        var id = this.getListenerId();
        msg_types.split(" ").forEach(function (msg_type) {
            if (!this.listeners[msg_type]) {
                this.listeners[msg_type] = {};
            }
            this.listeners[msg_type][id] = callback;
        }.bind(this));
        return id;
    };

    MessageDispatcher.prototype.removeListener = function removeListener(listener_id) {
        Object.keys(this.listeners).forEach(function (key) {
            delete this.listeners[key][listener_id];
        }.bind(this));
    };

    return MessageDispatcher;
}();

var message_dispatcher = exports.message_dispatcher = new MessageDispatcher();

},{"server/storage":10}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ref = function () {
    function Ref(storage, model_name, id) {
        _classCallCheck(this, Ref);

        this.model_name = model_name;
        this.id = id;
        this.storage = storage;
    }

    Ref.prototype.get = function get() {
        return this.storage.get(this.model_name).by_id(this.id);
    };

    return Ref;
}();

var Model = function () {
    function Model(storage, id, model_storage) {
        _classCallCheck(this, Model);

        this.id = id;
        this.__storage = storage;
        this.__key_types = {};
        this.__model_storage = model_storage;
    }

    Model.prototype.addBackRef = function addBackRef(key, ref) {
        this[key] = ref;
        this.__key_types[key] = "^";
    };

    Model.prototype.update = function update(data) {
        var _this = this;

        var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        for (var idx in data) {
            if (data.hasOwnProperty(idx)) {
                if (idx.charAt(0) === "*" || idx.charAt(0) === "^") {
                    if (!create && typeof this[idx.slice(1)] === "undefined") {
                        continue;
                    }
                }
                if (idx.charAt(0) === "*") {
                    (function () {
                        var key = idx.slice(1);
                        _this[key] = [];
                        var back_ref = new Ref(_this.__storage, _this.__model_storage.model_name, _this.id);
                        var back_ref_key = data[idx].back_ref;
                        data[idx].children.forEach(function (nested_data) {
                            if (_typeof(nested_data.data) === "object") {
                                this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                            }
                            var ref = new Ref(this.__storage, nested_data.model, nested_data.id);
                            ref.get().addBackRef(back_ref_key, back_ref);
                            this[key].push(ref);
                        }.bind(_this));
                        _this.__key_types[key] = "*";
                    })();
                } else if (idx.charAt(0) === "^") {
                    var key = idx.slice(1);
                    var nested_data = data[idx];
                    if ((typeof nested_data === "undefined" ? "undefined" : _typeof(nested_data)) === "object") {
                        this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                    }
                    this[key] = new Ref(this.__storage, nested_data.model, nested_data.id);
                    this.__key_types[key] = "^";
                } else {
                    this[idx] = data[idx];
                    this.__key_types[idx] = "";
                }
            }
        }
    };

    Model.prototype.serialize = function serialize(schema) {
        var _this2 = this;

        var result = {};

        var _loop = function _loop(key) {
            if (_this2.__key_types.hasOwnProperty(key)) {
                switch (_this2.__key_types[key]) {
                    case "*":
                        if (key in schema) {
                            result[key] = _this2[key].map(function (ref) {
                                return ref.get().serialize(schema[key]);
                            });
                        }
                        break;
                    case "^":
                        if (key in schema) {
                            result[key] = _this2[key].get().serialize(schema[key]);
                        }
                        break;
                    default:
                        result[key] = _this2[key];
                }
            }
        };

        for (var key in this.__key_types) {
            _loop(key);
        }result.id = this.id;
        return result;
    };

    return Model;
}();

var ModelsStorage = function () {
    function ModelsStorage(storage, model_name) {
        _classCallCheck(this, ModelsStorage);

        this.model_name = model_name;
        this.models = {};
        this.storage = storage;
    }

    ModelsStorage.prototype.add = function add(id, data) {
        if (typeof this.models[id] === "undefined") {
            this.models[id] = new Model(this.storage, id, this);
        }
        this.models[id].update(data);
    };

    ModelsStorage.prototype.update = function update(id, data) {
        if (this.models[id]) {
            this.models[id].update(data, false);
            return true;
        }
        return false;
    };

    ModelsStorage.prototype.by_id = function by_id(id) {
        return this.models[id];
    };

    ModelsStorage.prototype.all = function all() {
        var keys = Object.getOwnPropertyNames(this.models);
        return keys.map(function (key) {
            return this.models[key];
        }.bind(this));
    };

    return ModelsStorage;
}();

var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.model_storages = {};
        this.domains = {};
    }

    Storage.prototype.getDomain = function getDomain(domain) {
        if (typeof this.domains[domain] === "undefined") {
            this.domains[domain] = new Storage();
        }
        return this.domains[domain];
    };

    Storage.prototype.delDomain = function delDomain(domain) {
        delete this.domains[domain];
    };

    Storage.prototype.get = function get(model_name) {
        if (typeof this.model_storages[model_name] === "undefined") {
            this.model_storages[model_name] = new ModelsStorage(this, model_name);
        }
        return this.model_storages[model_name];
    };

    Storage.prototype.del = function del(model_name) {
        delete this.model_storages[model_name];
    };

    Storage.prototype.updateModel = function updateModel(model_type, model_id, data) {
        var _this3 = this,
            _arguments = arguments;

        var data_changed = false;
        if (this.model_storages[model_type]) {
            data_changed = this.get(model_type).add(model_id, data) || data_changed;
        }
        Object.keys(this.domains).forEach(function (key) {
            var _domains$key;

            return data_changed = (_domains$key = _this3.domains[key]).updateModel.apply(_domains$key, _arguments) || data_changed;
        });
        // return data_changed;
        return true;
    };

    return Storage;
}();

var storage = exports.storage = new Storage();

},{}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = exports.Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader() {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Loader.prototype.render = function render() {
        return React.createElement(
            "table",
            { style: { "height": "100%", "width": "100%" } },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { style: { "textAlign": "center" } },
                        React.createElement("img", { src: "/static/img/ajax-loader.gif" })
                    )
                )
            )
        );
    };

    return Loader;
}(React.Component);

},{}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.showError = showError;
exports.showConfirm = showConfirm;

var _loader = require("i10n/loader");

function showError(msg) {
    var title = (typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" ? msg[0] : (0, _loader._)("global.messages.error_header");
    var text = (typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" ? msg[1] : msg;
    swal({
        title: title,
        text: text,
        type: "error",
        animation: false
    });
}

function showConfirm(message, action) {
    var close_on_confirm = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return swal({
        title: message,
        animation: false,
        showCancelButton: true,
        confirmButtonText: (0, _loader._)("global.labels.yes"),
        cancelButtonText: (0, _loader._)("global.labels.no"),
        closeOnConfirm: close_on_confirm
    }, action);
}

},{"i10n/loader":5}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Printable = exports.Printable = function (_React$Component) {
    _inherits(Printable, _React$Component);

    function Printable() {
        _classCallCheck(this, Printable);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Printable.prototype.fetchPrintableData = function fetchPrintableData() {
        return this._body.innerHTML;
    };

    Printable.prototype.renderHeader = function renderHeader() {
        return this.props.header ? React.createElement(
            "div",
            { className: "p-header" },
            this.props.header
        ) : null;
    };

    Printable.prototype.renderTitle1 = function renderTitle1() {
        return this.props.title1 ? React.createElement(
            "h1",
            null,
            this.props.title1
        ) : null;
    };

    Printable.prototype.renderTitle2 = function renderTitle2() {
        return this.props.title2 ? React.createElement(
            "h2",
            null,
            this.props.title2
        ) : null;
    };

    Printable.prototype.renderTitle3 = function renderTitle3() {
        return this.props.title3 ? React.createElement(
            "h3",
            null,
            this.props.title3
        ) : null;
    };

    Printable.prototype.renderBody = function renderBody() {
        var _this2 = this;

        return React.createElement(
            "div",
            {
                className: "p-content",
                ref: function ref(e) {
                    return _this2._body = e;
                }
            },
            this.props.body
        );
    };

    Printable.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "printable" },
            this.renderHeader(),
            this.renderTitle1(),
            this.renderTitle2(),
            this.renderTitle3(),
            this.renderBody()
        );
    };

    _createClass(Printable, null, [{
        key: "propTypes",
        get: function get() {
            return {
                header: React.PropTypes.string,
                title1: React.PropTypes.string,
                title2: React.PropTypes.string,
                title3: React.PropTypes.string,
                body: React.PropTypes.node.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }]);

    return Printable;
}(React.Component);

},{}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.StopWatch = exports.TabletPoint5Input = exports.TabletIntegerInput = exports.TabletPoint5SelectInput = exports.TabletIntegerSelectInput = exports.TabletSelectorInput = exports.Slider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onTouchOrClick = onTouchOrClick;
exports.onTouchEndOrClick = onTouchEndOrClick;

var _loader = require("i10n/loader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function onTouchOrClick(handler) {
    var f = function f(event) {
        event.preventDefault();
        return handler(event);
    };
    return {
        onTouchStart: f,
        onClick: f
    };
}

function onTouchEndOrClick(handler, prevent_default) {
    var _handler = function _handler() {};
    var distance = 0;
    var latest_pos = [0, 0];
    var fire = function fire(event) {
        event.preventDefault();
        return _handler();
    };
    var discard = function discard() {
        _handler = function _handler() {};
    };
    var move = function move(event) {
        var current_pos = [event.touches[0].pageX, event.touches[0].pageY];
        var sqr = function sqr(x) {
            return x * x;
        };
        distance += Math.sqrt(sqr(current_pos[0] - latest_pos[0]) + sqr(current_pos[1] - latest_pos[1]));
        latest_pos = current_pos;
        if (distance > 20) {
            discard();
        }
    };
    var start = function start(event) {
        _handler = handler;
        distance = 0;
        latest_pos = [event.touches[0].pageX, event.touches[0].pageY];
    };
    return {
        onTouchStart: start,
        onTouchEnd: fire,
        onTouchMove: move,
        onTouchCancel: discard,
        onClick: handler
    };
}

var Slider = exports.Slider = function (_React$Component) {
    _inherits(Slider, _React$Component);

    _createClass(Slider, null, [{
        key: "propTypes",
        get: function get() {
            return {
                done: React.PropTypes.bool,
                doneText: React.PropTypes.string,
                slideText: React.PropTypes.string,
                onActivate: React.PropTypes.func
            };
        }
    }]);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            position: 0,
            touch: false,
            finished: false
        };
        _this.pin = null;
        return _this;
    }

    Slider.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
        if (!this.props.done && nextProps.done) {
            this.setState({
                finished: false
            });
        }
    };

    Slider.prototype.isFree = function isFree() {
        return !this.state.touch && !this.props.done && !this.state.finished;
    };

    Slider.prototype.getOuterTextOpacity = function getOuterTextOpacity() {
        if (this.state.finished) {
            return 0;
        }
        var value = Math.min(Math.max(100 - this.state.position, 0), 100);
        return (value / 100).toFixed(3);
    };

    Slider.prototype.getElementOffset = function getElementOffset(element) {
        var res = 0;
        while (element) {
            res += element.offsetLeft || 0;
            element = element.parentNode;
        }
        return res;
    };

    Slider.prototype.getTouch = function getTouch(event) {
        var touch = event.touches[0];
        var parent = event.target.parentNode;
        return touch.pageX - this.getElementOffset(parent);
    };

    Slider.prototype.getRelativeTouch = function getRelativeTouch(event) {
        var touch = event.touches[0];
        var parent = event.target;
        return touch.pageX - this.getElementOffset(parent);
    };

    Slider.prototype.getSliderPos = function getSliderPos(event) {
        var pos = this.getTouch(event) - this.pin;
        return Math.min(Math.max(pos, 0), 200);
    };

    Slider.prototype.onClick = function onClick(event) {
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            posision: 200,
            touch: false,
            finished: true
        });
        this.props.onActivate();
    };

    Slider.prototype.onTouchStart = function onTouchStart(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.pin = this.getRelativeTouch(event);
        this.setState({
            position: this.getSliderPos(event),
            touch: true
        });
    };

    Slider.prototype.onTouchMove = function onTouchMove(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            position: this.getSliderPos(event)
        });
    };

    Slider.prototype.onTouchEnd = function onTouchEnd(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        if (this.state.position === 200) {
            this.setState({
                position: 0,
                finished: true,
                touch: false
            });
            this.props.onActivate();
        } else {
            this.setState({
                position: 0,
                touch: false
            });
        }
    };

    Slider.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "slider noselect" },
            React.createElement(
                "div",
                { className: "inner" + (this.isFree() ? " free" : ""),
                    style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                    onTouchStart: this.onTouchStart.bind(this),
                    onTouchMove: this.onTouchMove.bind(this),
                    onTouchEnd: this.onTouchEnd.bind(this),
                    onClick: this.onClick.bind(this)
                },
                "→"
            ),
            this.props.done ? React.createElement(
                "span",
                {
                    style: { color: "rgb(100,100,100)" },
                    className: "done-text"
                },
                this.props.doneText
            ) : React.createElement(
                "span",
                {
                    style: { color: "rgba(100,100,100," + this.getOuterTextOpacity() + ")" },
                    className: "slide-text" + (this.isFree() ? " free" : "")
                },
                this.props.slideText
            )
        );
    };

    return Slider;
}(React.Component);

var TabletSelectorInput = exports.TabletSelectorInput = function (_React$Component2) {
    _inherits(TabletSelectorInput, _React$Component2);

    function TabletSelectorInput() {
        _classCallCheck(this, TabletSelectorInput);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    TabletSelectorInput.prototype.getButtonsCount = function getButtonsCount() {
        if (this.props.style === "grid") {
            return this.props.row_size;
        }
        return this.props.choices.length;
    };

    TabletSelectorInput.prototype.onClick = function onClick(n) {
        this.props.onValueUpdate(n);
    };

    TabletSelectorInput.prototype.render = function render() {
        var _this3 = this;

        var result = [];
        this.props.choices.forEach(function (el, idx) {
            var key = el[0];
            var text = el[1];
            var active_class_name = _this3.props.active === key ? " active" : "";
            result.push(React.createElement(
                "button",
                _extends({
                    key: key
                }, onTouchOrClick(_this3.onClick.bind(_this3, key)), {
                    className: "tbtn score-btn" + active_class_name
                }),
                text
            ));
            if (_this3.props.style === "grid" && (idx + 1) % _this3.props.row_size === 0) {
                result.push(React.createElement("br", { key: "br" + idx }));
            }
        });
        var layout_class = this.props.style !== "two-lines" ? "selector-layout" : "selector-layout-2rows";
        var selected_class = this.props.active === null ? "" : " selected";
        return React.createElement(
            "div",
            { className: "scoring-layout " + layout_class + selected_class + " n-" + this.getButtonsCount().toString() },
            result
        );
    };

    _createClass(TabletSelectorInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                style: React.PropTypes.string,
                choices: React.PropTypes.string.isRequired,
                row_size: React.PropTypes.number,
                active: React.PropTypes.number,
                onValueUpdate: React.PropTypes.func.isRequired
            };
        }
    }]);

    return TabletSelectorInput;
}(React.Component);

var TabletIntegerSelectInput = exports.TabletIntegerSelectInput = function (_React$Component3) {
    _inherits(TabletIntegerSelectInput, _React$Component3);

    function TabletIntegerSelectInput() {
        _classCallCheck(this, TabletIntegerSelectInput);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    TabletIntegerSelectInput.prototype.createArray = function createArray(min, max) {
        var result = [];
        for (var idx = min; idx <= max; ++idx) {
            result.push([idx, idx.toString()]);
        }
        return result;
    };

    TabletIntegerSelectInput.prototype.render = function render() {
        return React.createElement(TabletSelectorInput, _extends({
            choices: this.createArray(this.props.min, this.props.max)
        }, this.props));
    };

    _createClass(TabletIntegerSelectInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                min: React.PropTypes.number.isRequired,
                max: React.PropTypes.number.isRequired
            };
        }
    }]);

    return TabletIntegerSelectInput;
}(React.Component);

var TabletPoint5SelectInput = exports.TabletPoint5SelectInput = function (_React$Component4) {
    _inherits(TabletPoint5SelectInput, _React$Component4);

    function TabletPoint5SelectInput() {
        _classCallCheck(this, TabletPoint5SelectInput);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    TabletPoint5SelectInput.prototype.createArray = function createArray(min, max) {
        var result = [];
        for (var idx = Math.round(2 * min); idx <= Math.round(2 * max); ++idx) {
            result.push([idx / 2, idx % 2 ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
        }
        return result;
    };

    TabletPoint5SelectInput.prototype.render = function render() {
        return React.createElement(TabletSelectorInput, _extends({
            choices: this.createArray(this.props.min, this.props.max)
        }, this.props));
    };

    _createClass(TabletPoint5SelectInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                min: React.PropTypes.number.isRequired,
                max: React.PropTypes.number.isRequired
            };
        }
    }]);

    return TabletPoint5SelectInput;
}(React.Component);

var TabletIntegerInput = exports.TabletIntegerInput = function (_React$Component5) {
    _inherits(TabletIntegerInput, _React$Component5);

    function TabletIntegerInput() {
        _classCallCheck(this, TabletIntegerInput);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    TabletIntegerInput.prototype.onMinus = function onMinus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": -1 });
        } else {
            this.props.onValueUpdate(this.props.value - 1);
        }
    };

    TabletIntegerInput.prototype.onPlus = function onPlus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": 1 });
        } else {
            this.props.onValueUpdate(this.props.value + 1);
        }
    };

    TabletIntegerInput.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "tablet-integer-input" },
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-minus"
                }, onTouchOrClick(this.onMinus.bind(this))),
                "−"
            ),
            React.createElement(
                "div",
                { className: "value" },
                this.props.value
            ),
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-plus"
                }, onTouchOrClick(this.onPlus.bind(this))),
                "+"
            )
        );
    };

    _createClass(TabletIntegerInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                value: React.PropTypes.number.isRequired,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                sendDeltas: false
            };
        }
    }]);

    return TabletIntegerInput;
}(React.Component);

var TabletPoint5Input = exports.TabletPoint5Input = function (_React$Component6) {
    _inherits(TabletPoint5Input, _React$Component6);

    function TabletPoint5Input() {
        _classCallCheck(this, TabletPoint5Input);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    TabletPoint5Input.prototype.onMinus = function onMinus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": -0.5 });
        } else {
            this.props.onValueUpdate(this.props.value - 0.5);
        }
    };

    TabletPoint5Input.prototype.onPlus = function onPlus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": 0.5 });
        } else {
            this.props.onValueUpdate(this.props.value + 0.5);
        }
    };

    TabletPoint5Input.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "tablet-integer-input" },
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-minus"
                }, onTouchOrClick(this.onMinus.bind(this))),
                "−"
            ),
            React.createElement(
                "div",
                { className: "value" },
                this.props.value
            ),
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-plus"
                }, onTouchOrClick(this.onPlus.bind(this))),
                "+"
            )
        );
    };

    _createClass(TabletPoint5Input, null, [{
        key: "propTypes",
        get: function get() {
            return {
                value: React.PropTypes.number.isRequired,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                sendDeltas: false
            };
        }
    }]);

    return TabletPoint5Input;
}(React.Component);

var stopwatches = {};

var StopWatch = exports.StopWatch = function (_React$Component7) {
    _inherits(StopWatch, _React$Component7);

    _createClass(StopWatch, null, [{
        key: "propTypes",
        get: function get() {
            return {
                score_id: React.PropTypes.number,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }]);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this8 = _possibleConstructorReturn(this, _React$Component7.call(this, props));

        _this8.state = stopwatches[_this8.props.score_id] || {
            active: false,
            value: 0,
            str_value: "0:00",
            interval: _this8.state.active ? setInterval(_this8.tick.bind(_this8), 10) : null
        };
        return _this8;
    }

    StopWatch.prototype.componentWillUnmount = function componentWillUnmount() {
        clearInterval(this.state.interval);
        stopwatches[this.props.score_id] = this.state;
    };

    StopWatch.prototype.now = function now() {
        return new Date().getTime();
    };

    StopWatch.prototype.toggle = function toggle() {
        this.state.active ? this.stop() : this.start();
    };

    StopWatch.prototype.start = function start() {
        this.setState({
            active: true,
            start_at: this.now() - this.state.value,
            interval: setInterval(this.tick.bind(this), 10)
        });
    };

    StopWatch.prototype.stop = function stop() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: this.value()
        });
    };

    StopWatch.prototype.reset = function reset() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: 0
        });
    };

    StopWatch.prototype.value = function value() {
        return this.state.active ? this.now() - this.state.start_at : this.state.value;
    };

    StopWatch.prototype.tick = function tick() {
        var new_value = this.value();
        if (new_value !== this.state.value) {
            this.setState({
                value: this.value()
            });
        }
    };

    StopWatch.prototype.pad = function pad(num, size) {
        var s = "0000" + num.toString();
        return s.substr(s.length - size);
    };

    StopWatch.prototype.getStrValue = function getStrValue() {
        var val = this.value();
        var m = 0,
            s = 0;
        var result = '';
        m = Math.floor(val / (60 * 1000));
        val %= 60 * 1000;
        s = Math.floor(val / 1000);
        return m.toString() + ':' + this.pad(s, 2);
    };

    StopWatch.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "stopwatch" },
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-reset ignore-readonly"
                }, onTouchOrClick(this.reset.bind(this))),
                (0, _loader._)("tablet.buttons.reset_stopwatch")
            ),
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-toggle ignore-readonly" + (this.state.active ? " active" : "")
                }, onTouchOrClick(this.toggle.bind(this))),
                this.state.active ? (0, _loader._)("tablet.buttons.stop_stopwatch") : (0, _loader._)("tablet.buttons.start_stopwatch")
            ),
            React.createElement(
                "div",
                { className: "time" },
                this.getStrValue()
            )
        );
    };

    return StopWatch;
}(React.Component);

},{"i10n/loader":5}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHJvc2ZhcnJcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcY2xpZW50c1xccHJlc2VudGVyXFxtYWluLmpzeCIsInNyY1xcanN4XFxjb21tb25cXGRvY3guanN4Iiwic3JjXFxqc3hcXGkxMG5cXGxvYWRlci5qc3giLCJzcmNcXGpzeFxcaTEwblxccnUuanN4Iiwic3JjXFxqc3hcXHByZXNlbnRlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxhcGkuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcbWVzc2FnZV9kaXNwYXRjaGVyLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXHN0b3JhZ2UuanN4Iiwic3JjXFxqc3hcXHVpXFxjb21wb25lbnRzLmpzeCIsInNyY1xcanN4XFx1aVxcZGlhbG9ncy5qc3giLCJzcmNcXGpzeFxcdWlcXHByaW50YWJsZS5qc3giLCJzcmNcXGpzeFxcdWlcXHRhYmxldF9jb21wb25lbnRzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDY2E7Ozs7Ozs7Ozt1Q0FDVCx5QkFBTyxTQUFTOzs7QUFDWixlQUFPO21CQUFPLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsT0FBcEI7U0FBTixDQUFvQyxJQUFyQyxDQUEwQyxJQUExQyxDQUFQLENBRFk7OztBQURQLHVDQUlULDJCQUFTO0FBQ0wsZUFBTzs7O1lBQ0g7O2tCQUFRLFdBQVUsaUJBQVYsRUFBNEIsU0FBVSxLQUFLLE1BQUwsQ0FBWSxNQUFaLENBQVYsRUFBcEM7O2FBREc7U0FBUCxDQURLOzs7V0FKQTtFQUFpQyxNQUFNLFNBQU47O0lBYWpDOzs7Ozs0QkFFaUI7QUFDdEIsbUJBQU87QUFD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LENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFmLEVBRlI7Z0JBSU0sZUFBRSxnQ0FBRixDQUpOO2FBREo7WUFPSTs7O0FBQ0ksK0JBQVkscUNBQXFDLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBckM7bUJBQ1IsZUFBZSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQWYsRUFGUjtnQkFJTSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLGVBQUUsK0JBQUYsQ0FBcEIsR0FBeUQsZUFBRSxnQ0FBRixDQUF6RDthQVhWO1lBYUk7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNNLEtBQUssV0FBTCxFQUROO2FBYko7U0FESixDQURLOzs7V0E1RUE7RUFBa0IsTUFBTSxTQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcblxuaW1wb3J0IHtcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxuICAgIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUsXG4gICAgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlLFxufSBmcm9tIFwiLi9yb3NmYXJyL2Rpc2NpcGxpbmVfcmVzdWx0c1wiO1xuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzaWduYWwobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gKCgpID0+IHRoaXMucHJvcHMub25TaWduYWwobWVzc2FnZSkpLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyB0aGlzLnNpZ25hbChcImRvY3hcIikgfT5cbiAgICAgICAgICAgICAgICBET0NYXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW5kZXJlcjogXCJwYWdlXCIsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ydW5zX2xvYWRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZFN0YXRlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0b3VyX3N0b3JhZ2UgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKS5ieV9pZChtZXNzYWdlW1widG91cl9pZFwiXSk7XG4gICAgICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuZGlzY2lwbGluZS5pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzLnByaW50YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4LmNhbGxiYWNrKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyKTtcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJkaXNjaXBsaW5lX3Jlc3VsdHNfXCIgKyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpO1xuICAgIH1cbiAgICByZWxvYWRTdGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmRpc2NpcGxpbmVfcmVzdWx0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5ydW5zX2xvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdG9yYWdlX3J1bnMgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiUnVuXCIpXG4gICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHM7XG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBbXVxuICAgICAgICB2YXIgU0NIRU1BID0ge1xuICAgICAgICAgICAgdG91cjoge30sXG4gICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgIHNwb3J0c21lbjoge30sXG4gICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbmV3X3N0YXRlLnB1c2goe1xuICAgICAgICAgICAgICAgIHBsYWNlOiByZXN1bHRzW2ldLnBsYWNlLFxuICAgICAgICAgICAgICAgIHJ1bjogc3RvcmFnZV9ydW5zLmJ5X2lkKHJlc3VsdHNbaV0ucnVuX2lkKS5zZXJpYWxpemUoU0NIRU1BKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbG9hZGVkOiB0cnVlLFxuICAgICAgICAgICAgdGFibGU6IG5ld19zdGF0ZSxcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHRoaXMuc3RvcmFnZS5nZXQoXCJEaXNjaXBsaW5lXCIpLmJ5X2lkKHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCkuc2VyaWFsaXplKHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWRSZXN1bHRzKCkge1xuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldF9yZXN1bHRzXCIsIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uU3VjY2VzcyhyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX3Jlc3VsdHM6IHJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZFN0YXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldFwiLCB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQsXG4gICAgICAgICAgICBjaGlsZHJlbjoge1xuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgICAgICB0b3Vyczoge1xuICAgICAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFkZFRvREIoXCJEaXNjaXBsaW5lXCIsIHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucnVuc19sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRTdGF0ZSh0aGlzKVxuICAgICAgICB9KVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cblxuICAgIC8vIExpc3RlbmVyc1xuXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbmRlcmluZ1xuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnJlbmRlcmVyKSB7XG4gICAgICAgIGNhc2UgXCJwcmVzZW50ZXJcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSByZWY9XCJtYWluX3RhYmxlXCIgLz5cbiAgICAgICAgY2FzZSBcInNjcmVlbl9vcGVyYXRvclwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGVcbiAgICAgICAgICAgICAgICB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGxhY2U9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfVxuICAgICAgICAgICAgICAgIG9uUGxhY2VTZWxlY3Q9eyB0aGlzLnByb3BzLm9uUGxhY2VTZWxlY3QgfVxuICAgICAgICAgICAgICAgIHJlZj1cIm1haW5fdGFibGVcIiAvPlxuICAgICAgICBjYXNlIFwicGFnZVwiOlxuICAgICAgICAgICAgcmV0dXJuIDxQcmludGFibGVcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSB9XG4gICAgICAgICAgICAgICAgdGl0bGUzPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgICAgIGJvZHk9eyA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSAvPiB9IC8+XG4gICAgICAgIGNhc2UgXCJ0YWJsZVwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9IHJlZj1cIm1haW5fdGFibGVcIiAvPlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmxvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+PExvYWRlciAvPjwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlKVxuICAgICAgICAgICAgLnNldFRpdGxlMShfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikpXG4gICAgICAgICAgICAuc2V0VGl0bGUzKHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lKVxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5yZWZzLnByaW50YWJsZS5mZXRjaFByaW50YWJsZURhdGEoKSlcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3VyLW5hbWVcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwicGFkZGluZ1wiLCBcIjBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zcG9ydHNtZW5cIiwgXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgIC5zYXZlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgb25Ub3VjaEVuZE9yQ2xpY2sgfSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcblxuXG5mdW5jdGlvbiBfXygpIHtcbiAgICBsZXQgYXJncyA9IFtdO1xuICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XG4gICAgfVxuICAgIHJldHVybiBfKFwic2NvcmluZ19zeXN0ZW1zLnJvc2ZhcnIuXCIgKyBhcmd1bWVudHNbMF0sIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyUm93SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cucnVuLnRvdXIuaWQgIT09IG5leHRfcm93LnJ1bi50b3VyLmlkKVxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiSFwiICsgbmV4dF9yb3cucnVuLmlkIH0+PHRoIGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGNvbFNwYW49XCI2XCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9PC9wPlxuICAgICAgICA8L3RoPjwvdHI+O1xuICAgIH1cbiAgICByZW5kZXJSb3cocm93KSB7XG4gICAgICAgIGxldCBwID0gcm93LnJ1bi5wYXJ0aWNpcGFudDtcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfT5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggcGxhY2VcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcm93LnBsYWNlID09PSBudWxsID8gXCJcIiA6IHJvdy5wbGFjZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IG51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBwLm51bWJlciB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zNlwiIGNvbFNwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNwb3J0c21lblwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgeyBwLmZvcm1hdGlvbl9uYW1lID8gPHRyPjx0aCBjb2xTcGFuPVwiMlwiPjxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgcC5mb3JtYXRpb25fbmFtZSB9PC9wPjwvdGg+PC90cj4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgeyBwLnNwb3J0c21lbi5tYXAoKHMsIGlkeCkgPT4gPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNzVcIj48cD57IHMubGFzdF9uYW1lICsgXCIgXCIgKyBzLmZpcnN0X25hbWUgfTwvcD48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcy55ZWFyX29mX2JpcnRoIH08L3A+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj4gKSB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI0IGNsdWJcIj48cD57IHAuY2x1Yi5uYW1lIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI0IGNvYWNoZXNcIj48cD57IHAuY29hY2hlcy5zcGxpdChcIixcIikubWFwKChjKSA9PiBbYy50cmltKCksIDxiciBrZXk9XCJYXCIgLz5dKSB9PC9wPjwvdGQ+XG4gICAgICAgIDwvdHI+O1xuICAgIH1cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpIC0gMV0sIHRhYmxlW2ldKTtcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI3XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnNwb3J0c21lblwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy05XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY29hY2hlc1wiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufVxuXG5jbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIHRvZ2dsZUFjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6ICF0aGlzLnN0YXRlLmFjdGl2ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnByb3BzLnBhcnRpY2lwYW50O1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT17IFwicm93XCIgKyAoIHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMudG9nZ2xlQWN0aXZlLmJpbmQodGhpcykpfT48dGJvZHk+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgcm93U3Bhbj1cIjNcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBsYWNlID09PSBudWxsID8gXCJcIiA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PnsgdGhpcy5wcm9wcy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZS1sYWJlbFwiPnsgXyhcInByZXNlbnRlci5sYWJlbHMucGxhY2VcIikgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj57IHAubnVtYmVyIH08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBwLm5hbWUgfTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCIgY29sU3Bhbj1cIjJcIj57IHAuY2x1Yi5uYW1lIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY29hY2hlc1wiIGNvbFNwYW49XCIyXCI+eyBwLmNvYWNoZXMgfTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyUm93SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cucnVuLnRvdXIuaWQgIT09IG5leHRfcm93LnJ1bi50b3VyLmlkKVxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9PlxuICAgICAgICAgICAgeyBuZXh0X3Jvdy5ydW4udG91ci5uYW1lIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlclJvdyhyb3cpIHtcbiAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlUm93IGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudD17IHJvdy5ydW4ucGFydGljaXBhbnQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2U9eyByb3cucGxhY2UgfSAvPlxuICAgIH1cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XG4gICAgICAgIGZvciAobGV0IGkgPSB0YWJsZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgKyAxXSwgdGFibGVbaV0pO1xuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnByb3BzLnBhcnRpY2lwYW50O1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT17IFwicm93XCIgKyAoIHRoaXMucHJvcHMuc2VsZWN0ZWQgPyBcIiBzZWxlY3RlZFwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uQ2xpY2spfT48dGJvZHk+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgcm93U3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBsYWNlID09PSBudWxsID8gXCJcIiA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PnsgdGhpcy5wcm9wcy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZS1sYWJlbFwiPnsgXyhcInByZXNlbnRlci5sYWJlbHMucGxhY2VcIikgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj57IHAubnVtYmVyIH08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBwLm5hbWUgfTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCIgY29sU3Bhbj1cIjJcIj57IHAuY2x1Yi5uYW1lIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyUm93SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cucnVuLnRvdXIuaWQgIT09IG5leHRfcm93LnJ1bi50b3VyLmlkKVxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9PlxuICAgICAgICAgICAgeyBuZXh0X3Jvdy5ydW4udG91ci5uYW1lIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlclJvdyhyb3csIHBsYWNlKSB7XG4gICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlUm93XG4gICAgICAgICAgICBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfVxuICAgICAgICAgICAgcGFydGljaXBhbnQ9eyByb3cucnVuLnBhcnRpY2lwYW50IH1cbiAgICAgICAgICAgIHBsYWNlPXsgcm93LnBsYWNlIH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLm9uUGxhY2VTZWxlY3QocGxhY2UpIH1cbiAgICAgICAgICAgIHNlbGVjdGVkPXsgdGhpcy5wcm9wcy5zZWxlY3RlZFBsYWNlICE9PSBudWxsICYmIHBsYWNlID49IHRoaXMucHJvcHMuc2VsZWN0ZWRQbGFjZSB9IC8+XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhYmxlLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSArIDFdLCB0YWJsZVtpXSk7XG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldLCBpICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgb25Ub3VjaE9yQ2xpY2sgfSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERpc2NpcGxpbmVSZXN1bHRzIH0gZnJvbSBcImFkbWluL2p1ZGdpbmcvZGlzY2lwbGluZV9yZXN1bHRzXCI7XG5cblxuY2xhc3MgUHJlc2VudGVyVGFibGV0TGVmdEJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXCJpbmZvXCIsIFwiaGVhdHNcIiwgXCJyZXN1bHRzXCJdKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25QYWdlU3dpdGNoOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtYmFyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiaXRlbVwiICsgKHRoaXMucHJvcHMuYWN0aXZlID09PSBcImluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKCgpID0+IHRoaXMucHJvcHMub25QYWdlU3dpdGNoKFwiaW5mb1wiKSkgfT5cbiAgICAgICAgICAgICAgICA8c3Bhbj57IF8oXCJwcmVzZW50ZXIuaGVhZGVycy5pbmZvXCIpIH08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJpdGVtXCIgKyAodGhpcy5wcm9wcy5hY3RpdmUgPT09IFwiaGVhdHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKCgpID0+IHRoaXMucHJvcHMub25QYWdlU3dpdGNoKFwiaGVhdHNcIikpIH0+XG4gICAgICAgICAgICAgICAgPHNwYW4+eyBfKFwicHJlc2VudGVyLmhlYWRlcnMuaGVhdHNcIikgfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcIml0ZW1cIiArICh0aGlzLnByb3BzLmFjdGl2ZSA9PT0gXCJyZXN1bHRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljaygoKSA9PiB0aGlzLnByb3BzLm9uUGFnZVN3aXRjaChcInJlc3VsdHNcIikpIH0+XG4gICAgICAgICAgICAgICAgPHNwYW4+eyBfKFwicHJlc2VudGVyLmhlYWRlcnMucmVzdWx0c1wiKSB9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgUHJlc2VudGVyVGFibGV0SW5mb0NvbXBldGl0aW9uSW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXJSb3cocm93LCBpZHgpIHtcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgIDx0aD57IHJvd1swXSB9PC90aD5cbiAgICAgICAgICAgIDx0ZD57IHJvd1sxXSB9PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cImNvbXBldGl0aW9uLWluZm9cIj48dGJvZHk+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuY29tcGV0aXRpb24uaW5mby5tYXAodGhpcy5yZW5kZXJSb3cuYmluZCh0aGlzKSkgfVxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuXG5jbGFzcyBQcmVzZW50ZXJUYWJsZXRJbmZvSnVkZ2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGp1ZGdlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlclJvdyhqdWRnZSkge1xuICAgICAgICByZXR1cm4gPHRyIGtleT17IGp1ZGdlLmlkIH0+XG4gICAgICAgICAgICA8dGg+eyBqdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIHx8IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIGp1ZGdlLm51bWJlcikgfTwvdGg+XG4gICAgICAgICAgICA8dGQ+eyBqdWRnZS5uYW1lIH0gJm1kYXNoOyB7IGp1ZGdlLmNhdGVnb3J5IH08L3RkPlxuICAgICAgICA8L3RyPlxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwianVkZ2VzXCI+PHRib2R5PlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmp1ZGdlcy5tYXAodGhpcy5yZW5kZXJSb3cuYmluZCh0aGlzKSkgfVxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuXG5jbGFzcyBQcmVzZW50ZXJUYWJsZXRJbmZvQ2x1YnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2x1YnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXJSb3coY2l0eSkge1xuICAgICAgICByZXR1cm4gPHRyIGtleT17IGNpdHkubmFtZSB9PlxuICAgICAgICAgICAgPHRoPnsgY2l0eS5uYW1lIH08L3RoPlxuICAgICAgICAgICAgPHRkPnsgY2l0eS5jbHVicy5tYXAoKGNsdWIpID0+IDxkaXYga2V5PXsgY2x1Yi5pZCB9PnsgY2x1Yi5uYW1lIH08L2Rpdj4pIH08L3RkPlxuICAgICAgICA8L3RyPlxuICAgIH1cbiAgICByZWdyb3VwQ2x1YnMoKSB7XG4gICAgICAgIGxldCBjaXRpZXMgPSB7fTtcbiAgICAgICAgdGhpcy5wcm9wcy5jbHVicy5mb3JFYWNoKChjbHViKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNpdGllc1tjbHViLmNpdHldKSB7XG4gICAgICAgICAgICAgICAgY2l0aWVzW2NsdWIuY2l0eV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNpdGllc1tjbHViLmNpdHldLnB1c2goY2x1Yik7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjaXRpZXMpLm1hcCgoY2l0eSkgPT4gKHtcbiAgICAgICAgICAgIG5hbWU6IGNpdHksXG4gICAgICAgICAgICBjbHViczogY2l0aWVzW2NpdHldLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJqdWRnZXNcIj48dGJvZHk+XG4gICAgICAgICAgICB7IHRoaXMucmVncm91cENsdWJzKCkubWFwKHRoaXMucmVuZGVyUm93LmJpbmQodGhpcykpIH1cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgUHJlc2VudGVyVGFibGV0SW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImluZm9cIj5cbiAgICAgICAgICAgIDxoMj57IHRoaXMucHJvcHMuY29tcGV0aXRpb24ubmFtZSB9PC9oMj5cbiAgICAgICAgICAgIDxQcmVzZW50ZXJUYWJsZXRJbmZvQ29tcGV0aXRpb25JbmZvIGNvbXBldGl0aW9uPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbiB9IC8+XG4gICAgICAgICAgICA8aDM+eyBfKFwicHJlc2VudGVyLmhlYWRlcnMuanVkZ2VzXCIpIH08L2gzPlxuICAgICAgICAgICAgPFByZXNlbnRlclRhYmxldEluZm9KdWRnZXMganVkZ2VzPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5qdWRnZXMgfSAvPlxuICAgICAgICAgICAgPGgzPnsgXyhcInByZXNlbnRlci5oZWFkZXJzLmNsdWJzXCIpIH08L2gzPlxuICAgICAgICAgICAgPFByZXNlbnRlclRhYmxldEluZm9DbHVicyBjbHVicz17IHRoaXMucHJvcHMuY29tcGV0aXRpb24uY2x1YnMgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFByZXNlbnRlclRhYmxldEhlYXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIC8vIEludGlpYWxpemF0aW9uXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICAgICAgY3VycmVudF9oZWF0OiAxLFxuICAgICAgICAgICAgYWN0aXZlX3RvdXJfaWQ6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJhY3RpdmVfdG91cl91cGRhdGVcIiwgdGhpcy5kaXNwYXRjaEFjdGl2ZVRvdXJVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgIGxldCBhY3RpdmVfdG91cl9pZCA9IHRoaXMuc3RhdGUuYWN0aXZlX3RvdXJfaWQ7XG4gICAgICAgIGlmIChhY3RpdmVfdG91cl9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhY3RpdmVfdG91cl9tb2RlbCA9IHN0b3JhZ2UuZ2V0KFwiVG91clwiKS5ieV9pZChhY3RpdmVfdG91cl9pZCk7XG4gICAgICAgIGlmICghYWN0aXZlX3RvdXJfbW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRvdXI6IGFjdGl2ZV90b3VyX21vZGVsLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbHViXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjoge30sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiB7fSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KVxuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwidG91ci5maW5kX2FjdGl2ZVwiLCB7fSkub25TdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoQWN0aXZlVG91clVwZGF0ZShyZXNwb25zZSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSkuc2VuZCgpO1xuICAgIH1cblxuICAgIC8vIERpc3BhdGNoZXJzXG5cbiAgICBkaXNwYXRjaEFjdGl2ZVRvdXJVcGRhdGUocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHRvdXJfaWQgPSByZXNwb25zZS50b3VyX2lkO1xuICAgICAgICBpZiAoKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCAmJiB0b3VyX2lkID09PSBudWxsKSB8fCAodGhpcy5zdGF0ZS50b3VyICE9PSBudWxsICYmIHRoaXMuc3RhdGUudG91ci5pZCA9PT0gdG91cl9pZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIFwiYWN0aXZlX3RvdXJfaWRcIjogdG91cl9pZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlRvdXJcIik7XG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlJ1blwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiUGFydGljaXBhbnRcIik7XG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlNwb3J0c21hblwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiQ2x1YlwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiRGlzY2lwbGluZVwiKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudF9oZWF0OiAxLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwgeyB0b3VyX2lkOiB0b3VyX2lkLCBjaGlsZHJlbjp7XG4gICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbHViXCI6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzY2lwbGluZToge30sXG4gICAgICAgIH19KVxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRvdXJfaWQpXG4gICAgICAgICAgICAub25TdWNjZXNzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UodG91cl9pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogMSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuXG4gICAgLy8gQWN0aW9uc1xuXG4gICAgdG9QcmV2SGVhdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50X2hlYXQ6IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IC0gMSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRvTmV4dEhlYXQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudF9oZWF0OiB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCArIDEsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEhlbHBlcnNcblxuICAgIGdldEhlYXRzQ291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnN0YXRlLnRvdXIucnVucy5tYXAoKHJ1bikgPT4gcnVuLmhlYXQpKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXJpbmdcblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgdmFyIGJ0bl9wcmV2ID0gbnVsbDtcbiAgICAgICAgdmFyIGJ0bl9uZXh0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudF9oZWF0ID4gMSkge1xuICAgICAgICAgICAgICAgIGJ0bl9wcmV2ID0gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1sZWZ0XCIgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMudG9QcmV2SGVhdC5iaW5kKHRoaXMpKX0+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnByZXZfaGVhdFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IDwgdGhpcy5nZXRIZWF0c0NvdW50KCkpIHtcbiAgICAgICAgICAgICAgICBidG5fbmV4dCA9IDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy50b05leHRIZWF0LmJpbmQodGhpcykpfT5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMubmV4dF9oZWF0XCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnRfdG91ciA9ICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpID8gbnVsbCA6XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoMT57IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfTwvaDE+XG4gICAgICAgICAgICAgICAgPGgyPnsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfTwvaDI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgcmV0dXJuIDxoZWFkZXI+XG4gICAgICAgICAgICB7IGJ0bl9wcmV2IH1cbiAgICAgICAgICAgIHsgYnRuX25leHQgfVxuICAgICAgICAgICAgeyBjdXJyZW50X3RvdXIgfVxuICAgICAgICA8L2hlYWRlcj5cbiAgICB9XG4gICAgcmVuZGVyU3BsYXNoU2NyZWVuKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzcGxhc2gtc2NyZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PnsgXyhcInByZXNlbnRlci5sYWJlbHMubm9fYWN0aXZlX3RvdXJcIikgfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbiAgICByZW5kZXJIZWF0KCkge1xuICAgICAgICBsZXQgcnVucyA9IHRoaXMuc3RhdGUudG91ci5ydW5zLmZpbHRlcigocnVuKSA9PiBydW4uaGVhdCA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQpO1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJoZWF0XCI+XG4gICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRlcnMuaGVhdFwiKSB9OiB7IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IH0gLyB7IHRoaXMuZ2V0SGVhdHNDb3VudCgpIH08L2gzPlxuICAgICAgICAgICAgeyBydW5zLm1hcCgocnVuKSA9PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBrZXk9eyBydW4uaWQgfT48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIiByb3dTcGFuPVwiMlwiPnsgcnVuLnBhcnRpY2lwYW50Lm51bWJlciB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBydW4ucGFydGljaXBhbnQubmFtZSB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj48dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiPnsgcnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9LCB7IHJ1bi5wYXJ0aWNpcGFudC5jbHViLmNpdHkgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuanVkZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaGVhdHNcIj57IHRoaXMucmVuZGVyU3BsYXNoU2NyZWVuKCkgfTwvZGl2PjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJoZWF0c1wiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWF0KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFByZXNlbnRlclRhYmxldFJlc3VsdHNEaXNjaXBsaW5lU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NpcGxpbmVDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZXNcIj5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lcy5tYXAoKGRpc2NpcGxpbmUpID0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcIml0ZW1cIiArICh0aGlzLnByb3BzLmFjdGl2ZSA9PT0gZGlzY2lwbGluZS5pZCA/IFwiIGFjdGl2ZVwiIDogXCJcIil9XG4gICAgICAgICAgICAgICAgICAgICBrZXk9eyBkaXNjaXBsaW5lLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljaygoKSA9PiB0aGlzLnByb3BzLm9uRGlzY2lwbGluZUNoYW5nZShkaXNjaXBsaW5lLmlkKSl9PlxuICAgICAgICAgICAgICAgICAgICB7IGRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBQcmVzZW50ZXJUYWJsZXRSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFjdGl2ZV9kaXNjaXBsaW5lOiBudWxsLFxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0c1wiPlxuICAgICAgICAgICAgPFByZXNlbnRlclRhYmxldFJlc3VsdHNEaXNjaXBsaW5lU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBhY3RpdmU9eyB0aGlzLnN0YXRlLmFjdGl2ZV9kaXNjaXBsaW5lIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lcz17IHRoaXMucHJvcHMuY29tcGV0aXRpb24uZGlzY2lwbGluZXMgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2lwbGluZUNoYW5nZT17IChuZXdfZGlzY2lwbGluZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZV9kaXNjaXBsaW5lOiBuZXdfZGlzY2lwbGluZSB9KSB9IC8+XG4gICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlX2Rpc2NpcGxpbmUgIT09IG51bGxcbiAgICAgICAgICAgICAgICA/IDxEaXNjaXBsaW5lUmVzdWx0cyBkaXNjaXBsaW5lX2lkPXsgdGhpcy5zdGF0ZS5hY3RpdmVfZGlzY2lwbGluZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI9XCJwcmVzZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHRoaXMuc3RhdGUuYWN0aXZlX2Rpc2NpcGxpbmUgfSAvPlxuICAgICAgICAgICAgICAgIDogPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj48L2Rpdj4gfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGFnZTogXCJpbmZvXCIsXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHN0b3JhZ2UuZ2V0KFwiQ29tcGV0aXRpb25cIilcbiAgICAgICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZClcbiAgICAgICAgICAgICAgICAuc2VyaWFsaXplKHtcbiAgICAgICAgICAgICAgICAgICAgY2x1YnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lczoge30sXG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwiY29tcGV0aXRpb24uZ2V0XCIsIHsgY29tcGV0aXRpb25faWQ6IHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQsIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICBjbHViczoge30sXG4gICAgICAgICAgICBkaXNjaXBsaW5lczoge30sXG4gICAgICAgICAgICBqdWRnZXM6IHt9LFxuICAgICAgICB9IH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIkNvbXBldGl0aW9uXCIsIHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHN3aXRjaFBhZ2UobmV3X3BhZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwYWdlOiBuZXdfcGFnZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbXBldGl0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gPExvYWRlciAvPlxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS5wYWdlKSB7XG4gICAgICAgIGNhc2UgXCJpbmZvXCI6XG4gICAgICAgICAgICByZXR1cm4gPFByZXNlbnRlclRhYmxldEluZm8gY29tcGV0aXRpb249eyB0aGlzLnN0YXRlLmNvbXBldGl0aW9uIH0gLz5cbiAgICAgICAgY2FzZSBcImhlYXRzXCI6XG4gICAgICAgICAgICByZXR1cm4gPFByZXNlbnRlclRhYmxldEhlYXRzIC8+XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXCI6XG4gICAgICAgICAgICByZXR1cm4gPFByZXNlbnRlclRhYmxldFJlc3VsdHMgY29tcGV0aXRpb249eyB0aGlzLnN0YXRlLmNvbXBldGl0aW9uIH0gLz5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByZXNlbnRlci10YWJsZXRcIj5cbiAgICAgICAgICAgIDxQcmVzZW50ZXJUYWJsZXRMZWZ0QmFyXG4gICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5zdGF0ZS5wYWdlIH1cbiAgICAgICAgICAgICAgICBvblBhZ2VTd2l0Y2g9eyB0aGlzLnN3aXRjaFBhZ2UuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJjbGFzcyBEb2N4SW1wbCB7XG4gICAgY29uc3RydWN0b3IoZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUxID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMyA9IG51bGw7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYm9keSA9IFwiXCI7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBcInBvcnRyYWl0XCI7XG4gICAgICAgIHRoaXMuc3R5bGVzID0ge1xuICAgICAgICAgICAgXCJib2R5XCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtZmFtaWx5XCI6IFwiQ2FsaWJyaSwgVGFob21hLCBBcmlhbCwgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGFibGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IFwiY29sbGFwc2VcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJcIjoge1xuICAgICAgICAgICAgICAgIFwicGFnZS1icmVhay1pbnNpZGVcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGQsIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogXCIxcHQgM3B0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2XCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstYWZ0ZXJcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDFcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDJcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoM1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCI0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImg0IHBcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogXCIxMHB0IDAgNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNSBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEycHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiNnB0IDBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi5oZWFkZXJcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWJvdHRvbVwiOiBcIjFweCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmctYm90dG9tXCI6IFwiMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicFwiOiB7XG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi5zcGFjZXJcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiLnZhLXRvcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInRvcFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiLnRleHQtbGVmdFwiOiB7IFwidGV4dC1hbGlnblwiOiBcImxlZnRcIiB9LFxuICAgICAgICAgICAgXCIudGV4dC1yaWdodFwiOiB7IFwidGV4dC1hbGlnblwiOiBcInJpZ2h0XCIgfSxcbiAgICAgICAgICAgIFwiLnRleHQtY2VudGVyXCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgIFwiLmJvcmRlcmVkLXRhYmxlIHRkLCAuYm9yZGVyZWQtdGFibGUgdGhcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB0IHNvbGlkIGJsYWNrXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkV2lkdGhDc3MoKTtcbiAgICB9XG4gICAgYWRkV2lkdGhDc3MoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwMDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFN0eWxlKFwiLnctXCIgKyBpLCBcIndpZHRoXCIsIGkgKyBcIiVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRTdHlsZShzZWxlY3Rvciwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuc3R5bGVzW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZXNbc2VsZWN0b3JdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdHlsZXNbc2VsZWN0b3JdW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTEodGl0bGUxKSB7XG4gICAgICAgIHRoaXMudGl0bGUxID0gdGl0bGUxO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUyKHRpdGxlMikge1xuICAgICAgICB0aGlzLnRpdGxlMiA9IHRpdGxlMjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMyh0aXRsZTMpIHtcbiAgICAgICAgdGhpcy50aXRsZTMgPSB0aXRsZTM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRNYXJnaW5zKG1hcmdpbnMpIHtcbiAgICAgICAgdGhpcy5tYXJnaW5zID0gbWFyZ2lucztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEJvZHkoYm9keSkge1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pIHtcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZW5kZXJTdHlsZUJsb2NrKHNlbGVjdG9yLCBkYXRhKSB7XG4gICAgICAgIGxldCBjc3NfcGFpcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5tYXAoKGtleSkgPT4ga2V5ICsgJzogJyArIGRhdGFba2V5XSArICc7ICcpXG4gICAgICAgIHJldHVybiBzZWxlY3RvciArIFwiIHsgXCIgKyBjc3NfcGFpcnMuam9pbihcIiBcIikgKyBcIiB9XCI7XG4gICAgfVxuICAgIHJlbmRlclN0eWxlcygpIHtcbiAgICAgICAgbGV0IGNzc19ibG9ja3MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLnN0eWxlcykubWFwKChcbiAgICAgICAgICAgIChzZWxlY3RvcikgPT4gdGhpcy5yZW5kZXJTdHlsZUJsb2NrKHNlbGVjdG9yLCB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pXG4gICAgICAgICkuYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiBjc3NfYmxvY2tzLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuICAgIHJlbmRlckhUTUwoKSB7XG4gICAgICAgIGxldCBjc3MgPSB0aGlzLnJlbmRlclN0eWxlcygpO1xuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5oZWFkZXIgPyAnPHAgY2xhc3M9XCJoZWFkZXJcIj4nICsgdGhpcy5oZWFkZXIgKyAnPC9wPicgOiBcIlwiO1xuICAgICAgICBsZXQgdGl0bGUxID0gdGhpcy50aXRsZTEgPyAnPGgxPicgKyB0aGlzLnRpdGxlMSArICc8L2gxPicgOiBcIlwiO1xuICAgICAgICBsZXQgdGl0bGUyID0gdGhpcy50aXRsZTIgPyAnPGgyPicgKyB0aGlzLnRpdGxlMiArICc8L2gyPicgOiBcIlwiO1xuICAgICAgICBsZXQgdGl0bGUzID0gdGhpcy50aXRsZTMgPyAnPGgzPicgKyB0aGlzLnRpdGxlMyArICc8L2gzPicgOiBcIlwiO1xuICAgICAgICBsZXQgc3BhY2VyID0gKGhlYWRlciB8fCB0aXRsZTEgfHwgdGl0bGUyIHx8IHRpdGxlMykgPyAnPHAgY2xhc3M9XCJzcGFjZXJcIj4mbmJzcDs8L3A+JyA6IFwiXCI7XG4gICAgICAgIHJldHVybiBcIjwhRE9DVFlQRSBodG1sPlxcblwiICtcbiAgICAgICAgICAgIFwiPGh0bWw+PGhlYWQ+XCIgK1xuICAgICAgICAgICAgICAgIFwiPG1ldGEgY2hhcnNldD1cXFwidXRmLThcXFwiPlwiICtcbiAgICAgICAgICAgICAgICBcIjxzdHlsZT5cXG5cIiArIGNzcyArIFwiXFxuPC9zdHlsZT5cXG5cIiArXG4gICAgICAgICAgICBcIjwvaGVhZD48Ym9keT5cXG5cIiArXG4gICAgICAgICAgICAgICAgaGVhZGVyICtcbiAgICAgICAgICAgICAgICB0aXRsZTEgK1xuICAgICAgICAgICAgICAgIHRpdGxlMiArXG4gICAgICAgICAgICAgICAgdGl0bGUzICtcbiAgICAgICAgICAgICAgICBzcGFjZXIgK1xuICAgICAgICAgICAgICAgIHRoaXMuYm9keSArXG4gICAgICAgICAgICBcIjwvYm9keT48L2h0bWw+XCI7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlckhUTUwoKTtcbiAgICAgICAgbGV0IG1hcmdpbnMgPSB0aGlzLm1hcmdpbnMgfHwgKHRoaXMub3JpZW50YXRpb24gPT09IFwicG9ydHJhaXRcIiA/IFsxMCwgMTUsIDEwLCAxNV0gOiBbNywgMTAsIDcsIDEwXSk7XG4gICAgICAgIGxldCBjb252ZXJ0ZWQgPSBodG1sRG9jeC5hc0Jsb2IoaHRtbCwge1xuICAgICAgICAgICAgb3JpZW50YXRpb246IHRoaXMub3JpZW50YXRpb24sXG4gICAgICAgICAgICBtYXJnaW5zOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAgICBNYXRoLmZsb29yKG1hcmdpbnNbMF0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICBNYXRoLmZsb29yKG1hcmdpbnNbMV0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgYm90dG9tOiBNYXRoLmZsb29yKG1hcmdpbnNbMl0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgbGVmdDogICBNYXRoLmZsb29yKG1hcmdpbnNbM10gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzYXZlQXMoY29udmVydGVkLCB0aGlzLmZpbGVuYW1lKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHZhciBEb2N4ID0gKGZuKSA9PiBuZXcgRG9jeEltcGwoZm4pO1xuIiwiaW1wb3J0IHsgdHJhbnNsYXRlLCBnZXRQb3NzaWJsZVRvdXJOYW1lcyB9IGZyb20gXCIuL3J1XCI7XG5cbmV4cG9ydCB2YXIgXyA9IHRyYW5zbGF0ZTtcbmV4cG9ydCB2YXIgdG91cl9uYW1lcyA9IGdldFBvc3NpYmxlVG91ck5hbWVzKCk7XG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcbiAgICAgICAgbGV0IHggPSBuICUgMTAwO1xuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZTU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGUxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBlNTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTI7XG4gICAgfVxuXG4gICAgbGV0IFBIUkFTRVMgPSB7XG4gICAgICAgIFwiYWRtaW5cIjoge1xuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC60L7RgNGA0LXQutGC0L3QviDQvdCw0YHRgtGA0L7QtdC90LAg0Lgg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LAuXCIsXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfbm90X2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC90LXQtNC+0YHRgtGD0L/QvdCwINC90LAg0Y3RgtC+0Lwg0LrQvtC80L/RjNGC0LXRgNC1LlwiLFxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV93YXJuaW5nXCI6IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+0KTQuNC90LDQu9C40LfQsNGG0LjRjyDQtNC+0LvQttC90LAg0L7RgtC80LXQvdGP0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINC40YHQutC70Y7Rh9C40YLQtdC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YUhPC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcbiAgICAgICAgICAgICAgICAgICAg0YHQu9C10LTRg9GO0YnQtdCz0L4g0YLRg9GA0LAg0LHRg9C00LXRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQv9C10YDQtdGB0L7Qt9C00LDQvS4g0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YPRh9Cw0YHRgtC90LjQutC+0LIsINC/0YDQvtGI0LXQtNGI0LjRhSDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC/0L7RgdC70LUg0L/QtdGA0LLQvtC5XG4gICAgICAgICAgICAgICAgICAgINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0Lgg0L3QtSDQv9GA0L7RiNC10LTRiNC40YUg0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0LHRg9C00YPRgiDQsdC10LfQstC+0LfQstGA0LDRgtC90L4g0YPRgtC10YDRj9C90YshPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXG4gICAgICAgICAgICAgICAgXCJxdWV1ZVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0LXRh9Cw0YLQuFwiLFxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxuICAgICAgICAgICAgICAgIFwidGVzdFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvblwiOiBcItCh0L7Qt9C00LDRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtVwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2p1ZGdlXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgdGD0LTRjNGOXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXG4gICAgICAgICAgICAgICAgXCJkb2N4X3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQsiBET0NYXCIsXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxuICAgICAgICAgICAgICAgIFwibGF1bmNoX2F1dG9fcHJpbnRlclwiOiBcItCX0LDQv9GD0YHQuiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC5INC/0LXRh9Cw0YLQuFwiLFxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0J7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFXCIsXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY2x1YlwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINC60LvRg9CxP1wiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9kaXNjaXBsaW5lXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC00LjRgdGG0LjQv9C70LjQvdGDP1wiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2p1ZGdlXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRgdGD0LTRjNGOP1wiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQv9GA0L7Qs9GA0LDQvNC80YM/XCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y4g0YLRg9GA0LA/INCS0LLQtdC00LjRgtC1IMKrdW5maW5hbGl6ZcK7LCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcbiAgICAgICAgICAgICAgICBcImNsdWJzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5fbWFuYWdlbWVudFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80LhcIixcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2NvbXBldGl0aW9uXCI6IFwi0JjQvNC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsFwiLFxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcbiAgICAgICAgICAgICAgICBcImp1ZGdlc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxuICAgICAgICAgICAgICAgIFwic2VydmljZV9tZW51XCI6IFwi0KHQtdGA0LLQuNGB0L3QvtC1INC80LXQvdGOXCIsXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXG4gICAgICAgICAgICAgICAgXCJ0b3VyX2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXG4gICAgICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFwiLFxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcbiAgICAgICAgICAgICAgICBcInVucGlja2VkX3RvdXJzXCI6IFwi0J3QtSDQstC60LvRjtGH0LXQvdGLINCyINC/0YDQvtCz0YDQsNC80LzRg1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX25hbWVcIjogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9kYXRlXCI6IFwi0JTQsNGC0LAg0L/RgNC+0LLQtdC00LXQvdC40Y9cIixcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZm9ybWF0aW9uX3Nwb3J0c21lblwiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YHQvtGB0YLQsNCyINGE0L7RgNC80LXQudGI0L3QvtCyXCIsXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9wYXNzY29kZVwiOiBcItCS0LLQtdC00ZHQvSDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQv9C+0YLQstC10YDQttC00LXQvdC40Y9cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jbHVic1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2p1ZGdlc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2Vfc3BvcnRzbWVuXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQv9C+0YDRgtGB0LzQtdC90LDQvNC4XCIsXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogKG4pID0+IFwi0JjRgtC+0LPQviBcIiArIG4gKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJqdWRnaW5nLXRhYnNcIjoge1xuICAgICAgICAgICAgICAgIFwidG91ci1hZG1pblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmUtcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcImVycm9yc1wiOiB7XG4gICAgICAgICAgICBcImFkbWluXCI6IHtcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFwaVwiOiB7XG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcbiAgICAgICAgICAgICAgICBcInVuYWJsZV90b19nZXRcIjogKHdhbnRlZCkgPT4gXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C+0LvRg9GH0LjRgtGMIFwiICsgd2FudGVkICsgXCIg0LjQtyDQt9Cw0L/RgNC+0YHQsFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQutC70YPQsSwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90Ysg0YPRh9Cw0YHRgtC90LjQutC4XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWxldGVfbm9uX2VtcHR5XCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1LCDRgdC+0LTQtdGA0LbQsNGJ0LXQtSDQtNC40YHRhtC40L/Qu9C40L3Riywg0LrQu9GD0LHRiyDQuNC70Lgg0YHRg9C00LXQuVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0b29fbWFueV90b3Vyc1wiOiAoZCkgPT4gW1wi0J7RiNC40LHQutCwINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIiwgYNCSINC00LjRgdGG0LjQv9C70LjQvdC1ICR7ZH0g0YHQvtC00LXRgNC20LjRgtGB0Y8g0LHQvtC70YzRiNC1INGC0YPRgNC+0LIsINGH0LXQvCDRgdC+0LfQtNCw0L3QviDQsiDRgdC40YHRgtC10LzQtWBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcImNoYW5nZV9qdWRnZXNfd2l0aF9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHQvtGB0YLQsNCyINGB0YPQtNC10Lkg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLLCDRgdC+0LTQtdGA0LbQsNGJ0LXQuSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRiyBcIixcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfc2NvcmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtCz0L4g0YLRg9GA0LBcIixcbiAgICAgICAgICAgICAgICBcInJlcGVhdGluZ19qdWRnZVwiOiAobmFtZSkgPT4gbmFtZSArIFwiINCy0YHRgtGA0LXRh9Cw0LXRgtGB0Y8g0LIg0YHQv9C40YHQutC1INGB0YPQtNC10Lkg0LHQvtC70LXQtSDQvtC00L3QvtCz0L4g0YDQsNC30LBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdsb2JhbFwiOiB7XG4gICAgICAgICAgICAgICAgXCJpbnRlcm5hbF9zZXJ2ZXJfZXJyb3JcIjogW1wi0J7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LVcIiwgXCLQv9GA0L7QstC10YDRjNGC0LUg0LvQvtCz0Lgg0LTQu9GPINC40L3RhNC+0YDQvNCw0YbQuNC4XCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZGlzY2lwbGluZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDQstGF0L7QtNGP0YnQtdCz0L4g0LIg0YHRg9C00LXQudGB0LrRg9GOINCx0YDQuNCz0LDQtNGDINGF0L7RgtGPINCx0Ysg0L7QtNC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicnVuXCI6IHtcbiAgICAgICAgICAgICAgICBcInNldF9wZXJmb3JtZWRfZmxhZ19vbl9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0YLQsNGC0YPRgSDQt9Cw0YXQvtC00LAg0YTQuNC90LDQu9C40LfQuNC90L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2NvcmVcIjoge1xuICAgICAgICAgICAgICAgIFwic2NvcmVfbm90X2V4aXN0XCI6IFwi0J/QvtC/0YvRgtC60LAg0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1INC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10Lkg0L7RhtC10L3QutC4INGB0YPQtNGM0LhcIixcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGC0YPRgCwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGJ0LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2FkZF9hZnRlcl9pZFwiOiBcItCf0L7Qv9GL0YLQutCwINC00L7QsdCw0LjRgtGMINGC0YPRgCDQsiDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC1INC80LXRgdGC0L5cIixcbiAgICAgICAgICAgICAgICBcImxvYWRfdG9fbm9uX2VtcHR5XCI6IChkKSA9PiBbXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YLRg9GA0Ysg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLXCIsIGDQlNC40YHRhtC40L/Qu9C40L3QsCAke2R9INGD0LbQtSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLYF0sXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcbiAgICAgICAgICAgICAgICBcIm5vX25leHRfdG91clwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L/QvtGB0LvQtdC00L3QuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcIm5vdF9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQvdC1INGB0L7QtNC10YDQttC40YLRgdGPINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQv9GD0YHRgtC40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9maW5hbGl6ZWRcIjogXCLQlNC70Y8g0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsCDQvdC1INC00L7Qv9GD0YHQutCw0LXRgtGB0Y8g0LjQt9C80LXQvdC10L3QuNC1INC60LLQvtGC0Ysg0LLRi9Cy0L7QtNCwLCDRgtC40L/QsCDRgtGD0YDQsCDQuNC70Lgg0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcImdsb2JhbFwiOiB7XG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkXCI6IFwi0JTQvtCx0LDQstC40YLRjFwiLFxuICAgICAgICAgICAgICAgIFwiY2xvc2VcIjogXCLQl9Cw0LrRgNGL0YLRjFwiLFxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcbiAgICAgICAgICAgICAgICBcImVkaXRcIjogXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwi0KPQtNCw0LvQuNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJsb2FkXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJzYXZlXCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJicm93c2VcIjogXCLQntCx0LfQvtGALi4uXCIsXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9lcnJvclwiOiBcItCf0L7RhdC+0LbQtSwg0LjQvNC10Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcbiAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogXCLQntC/0LXRgNCw0YbQuNGPINGD0YHQv9C10YjQvdC+INC30LDQstC10YDRiNC10L3QsFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJoZWF0X25cIjogKG4pID0+IFwi0JfQsNGF0L7QtCDihJZcIiArIG4udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IFwi0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEllwiICsgbi50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cbiAgICAgICAgICAgICAgICAgICAgKG5fc3AgPiAyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCf0LDRgNCwIOKEllwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJqdWRnaW5nXCI6IHtcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjFwiLFxuICAgICAgICAgICAgICAgIFwicmVzZXRfYWNyb2JhdGljX292ZXJyaWRlXCI6IFwi0KHQsdGA0L7RgVwiLFxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxuICAgICAgICAgICAgICAgIFwic3RhcnRfdG91clwiOiBcItCd0LDRh9Cw0YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCe0YHRgtCw0L3QvtCy0LjRgtGMINGC0YPRgFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXG4gICAgICAgICAgICAgICAgXCJsb2FkX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQv9GA0L7Qs9GA0LDQvNC80YMg0LTQu9GPINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRiz9cIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcbiAgICAgICAgICAgICAgICBcImFjcm9faWR4XCI6IFwi4oSWINGC0YDRjtC60LBcIixcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXG4gICAgICAgICAgICAgICAgXCJvbGRfc2NvcmVcIjogXCLQkdCw0LfQsFwiLFxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCSXCIsXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcIm1vZGVsc1wiOiB7XG4gICAgICAgICAgICBcImNsdWJcIjoge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQu9GD0LHQsFwiLFxuICAgICAgICAgICAgICAgIFwiY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXG4gICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwi0JTQsNGC0LBcIixcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPINC00LvRjyDQv9GA0L7RgtC+0LrQvtC70LBcIixcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3ZhbHVlXCI6IFwi0JfQvdCw0YfQtdC90LjQtVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCkLiDQmC4g0J4uXCIsXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXG4gICAgICAgICAgICAgICAgXCJyb2xlX2Rlc2NyaXB0aW9uXCI6IFwi0JTQvtC70LbQvdC+0YHRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCe0YbQtdC90LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxuICAgICAgICAgICAgICAgIFwiY2x1Yl9jaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJcIjogXCLQn9C+0LtcIixcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcbiAgICAgICAgICAgICAgICBcImdlbmVyYWxfaW5mb1wiOiBcItCe0YHQvdC+0LLQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y9cIixcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcbiAgICAgICAgICAgICAgICBcInllYXJfb2ZfYmlydGhcIjogXCLQk9C+0LQg0YDQvtC20LTQtdC90LjRj1wiLFxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9ncmFtXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidG91clwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxuICAgICAgICAgICAgICAgIFwiaXNfaG9wZV90b3VyXCI6IFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfcGVyX2hlYXRcIjogXCLQo9GH0LDRgdGC0L3QuNC60L7QsiDQsiDQt9Cw0YXQvtC00LVcIixcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJyZXNldF9oZWF0XCI6IFwi0KHQsdGA0L7RgSDQvdC+0LzQtdGA0LAg0LfQsNGF0L7QtNCwXCIsXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXG4gICAgICAgICAgICAgICAgXCJwbGFjZXNcIjogXCLQnNC10YHRgtCwINC00LvRjyDQstGL0LLQvtC00LBcIixcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInByZXNlbnRlclwiOiB7XG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRj1wiLFxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVzdWx0c1wiOiB7XG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJub3RfZmluYWxpemVkXCI6IFwi0JTQsNC90L3Ri9C1INGA0LXQt9GD0LvRjNGC0LDRgtGLINC90LUg0Y/QstC70Y/RjtGC0YHRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90YvQvNC4LlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJwcmludFwiOiBcItCf0LXRh9Cw0YLRjFwiLFxuICAgICAgICAgICAgICAgIFwic2ltcGxlX3ZpZXdcIjogXCLQo9C/0YDQvtGJ0LXQvdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9jb21wZXRpdGlvblwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1INC00LvRjyDQv9GA0L7QtNC+0LvQttC10L3QuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRfbGlua1wiOiAobGluaykgPT4gPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgINCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80Lgg0L3QsNGF0L7QtNC40YLRgdGPINC/0L4g0LDQtNGA0LXRgdGDJm5ic3A7XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XG4gICAgICAgICAgICAgICAgPC9zcGFuPixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkbWluaXN0cmF0b3JcIjogXCLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgFwiLFxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcbiAgICAgICAgICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiBcItCe0L/QtdGA0LDRgtC+0YAg0Y3QutGA0LDQvdCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInRhYmxldFwiOiB7XG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtdCy0YvRhdC+0LQg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXG4gICAgICAgICAgICAgICAgXCJyZXNldF9zdG9wd2F0Y2hcIjogXCLQodCx0YDQvtGBXCIsXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQn9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg4oSWXCIgKyAobiArIDEpLFxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfcGFnZVwiOiBcItCh0YLRgNCw0L3QuNGG0LBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIjogXCLQktGLINC90LUg0YPRh9Cw0YHRgtCy0YPQtdGC0LUg0LIg0YHRg9C00LXQudGB0YLQstC1INC00LDQvdC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfcGFydGljaXBhbnRcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LBcIixcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcbiAgICAgICAgICAgICAgICBcInRhYmxldFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INC70LjQvdC10LnQvdGL0YUg0YHRg9C00LXQuVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJva1wiOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldmlvdXNfcGVuYWx0aWVzXCI6IFwi0J/RgNC10LTRi9C00YPRidC40LUg0YjRgtGA0LDRhNGLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZF9jYXJkXCI6IFwiLTMwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fcmVkX2NhcmRcIjogXCItMTVcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianVtcF9zdGVwc1wiOiBcItCe0YHQvdC+0LLQvdGL0LUg0YXQvtC00YtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpbWluZ1wiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwiQVwiICsgbi50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibVwiOiBcItCR0J5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkdFwiOiBcItCiVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3XCI6IFwi0J7QpdC2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBcIjogXCLQnFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIjogXCLQndC1INC/0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzX3ZlcmJvc2VcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCAo0LfQsNGP0LLQutCwL9GE0LDQutGCKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlX3Nob3J0XCI6IFwi0KLQnVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0L/RgNC40L3QuNC80LDQuyDRg9GH0LDRgdGC0LjQtVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0JjRgtC+0LNcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNfbmFtZXNcIjoge1xuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INGBINCw0LrRgNC+0LHQsNGC0LjQutC+0LlcIixcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImp1ZGdlX3JvbGVzXCI6IHtcbiAgICAgICAgICAgIFwiXCI6IFwiLVwiLFxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0YLQsNC90YbQsFwiLFxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRj1wiLFxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xuICAgIHBhdGguZm9yRWFjaCgoY2h1bmspID0+IHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXSk7XG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgXCIgKyBzcmMpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gcGhyYXNlX3B0cjtcbn1cblxuZXhwb3J0IHZhciBnZXRQb3NzaWJsZVRvdXJOYW1lcyA9ICgpID0+IFtcbiAgICBcItCk0LjQvdCw0LtcIixcbiAgICBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcbiAgICBcItCe0YLQsdC+0YDQvtGH0L3Ri9C5INGC0YPRgFwiLFxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxuICAgIFwiMS80INGE0LjQvdCw0LvQsFwiLFxuICAgIFwiMS84INGE0LjQvdCw0LvQsFwiLFxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcbiAgICBcItCk0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxuICAgIFwi0KTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcbl07XG4iLCJpbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiY2xpZW50cy9wcmVzZW50ZXIvbWFpblwiO1xuXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8UHJlc2VudGVyIHsgLi4ud2luZG93LnBhZ2VfcHJvcHMgfSAvPixcbiAgICB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXG4pO1xuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuXG5jbGFzcyBBcGlJbXBsIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9ICgpID0+IHt9O1xuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gKC4uLmRhdGEpID0+IGNvbnNvbGUuZXJyb3IoXCJBUEkgZmFpbFwiLCAuLi5kYXRhKTtcbiAgICAgICAgdGhpcy5jYl9kb25lID0gKCkgPT4ge307XG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XG4gICAgfVxuICAgIG9uRG9uZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9uRXJyb3IoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb25GYWlsKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBzdC5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNlbmQoKSB7XG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiL2FwaVwiLCB0cnVlKTtcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX2RiKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2Vycm9yKHJlc3BvbnNlLm1lc3NhZ2UsIHJlc3BvbnNlLmNvZGUsIHJlc3BvbnNlLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGRhdGEuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHdpbmRvdy5jbGllbnRfaWQpO1xuICAgICAgICBkYXRhLmFwcGVuZChcImRhdGFcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSk7XG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcbiAgICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIEFwaSA9ICguLi5hcmdzKSA9PiBuZXcgQXBpSW1wbCguLi5hcmdzKTtcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcblxuXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMubGlzdGVuZXJzX2NudCA9IDA7XG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0Li4uXCIpO1xuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC5cIik7XG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxfdXBkYXRlczogW10sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuXCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QuYmluZCh0aGlzKSwgNTAwKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIG9uTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgICAgICBpZiAoZGF0YVtcImNsaWVudF9pZFwiXSkge1xuICAgICAgICAgICAgd2luZG93LmNsaWVudF9pZCA9IGRhdGFbXCJjbGllbnRfaWRcIl07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBtc2dfdHlwZSA9IGRhdGFbMF07XG4gICAgICAgICAgICBsZXQgbXNnX2RhdGEgPSBkYXRhWzFdO1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fTtcbiAgICAgICAgICAgIGlmIChtc2dfdHlwZSA9PT0gXCJmb3JjZV9yZWZyZXNoXCIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9KS5mb3JFYWNoKChrZXkpID0+IGxpc3RlbmVyc1trZXldKG1zZ19kYXRhKSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgZGF0YS5tb2RlbF91cGRhdGVzLmZvckVhY2goKG1vZGVsX2luZm8pID0+IHtcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHN0b3JhZ2UudXBkYXRlTW9kZWwobW9kZWxfaW5mby5tb2RlbCwgbW9kZWxfaW5mby5pZCwgbW9kZWxfaW5mby5kYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YV9jaGFuZ2VkKSB7XG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbXCJkYl91cGRhdGVcIl0gfHwge307XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldExpc3RlbmVySWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc19jbnQrKztcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIobXNnX3R5cGVzLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldExpc3RlbmVySWQoKTtcbiAgICAgICAgbXNnX3R5cGVzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZ190eXBlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW21zZ190eXBlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdW2lkXSA9IGNhbGxiYWNrO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyX2lkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW2tleV1bbGlzdGVuZXJfaWRdO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBuZXcgTWVzc2FnZURpc3BhdGNoZXIoKTtcbiIsImNsYXNzIFJlZiB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSwgaWQpIHtcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIH1cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubW9kZWxfbmFtZSkuYnlfaWQodGhpcy5pZCk7XG4gICAgfVxufVxuXG5jbGFzcyBNb2RlbCB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fX21vZGVsX3N0b3JhZ2UgPSBtb2RlbF9zdG9yYWdlO1xuICAgIH1cbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IHJlZjtcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XG4gICAgfVxuICAgIHVwZGF0ZShkYXRhLCBjcmVhdGU9dHJ1ZSkge1xuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUgJiYgdHlwZW9mIHRoaXNbaWR4LnNsaWNlKDEpXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IFtdXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcbiAgICAgICAgICAgICAgICBkYXRhW2lkeF0uY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihuZXN0ZWRfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHJlZik7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1tpZHhdID0gZGF0YVtpZHhdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge31cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIl5cIjpcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuY2xhc3MgTW9kZWxzU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIH1cbiAgICBhZGQoaWQsIGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xuICAgIH1cbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGJ5X2lkKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XG4gICAgfVxuICAgIGFsbCgpIHtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XG4gICAgICAgIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxufVxuXG5jbGFzcyBTdG9yYWdlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XG4gICAgICAgIHRoaXMuZG9tYWlucyA9IHt9XG4gICAgfVxuICAgIGdldERvbWFpbihkb21haW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvbWFpbnNbZG9tYWluXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbnNbZG9tYWluXTtcbiAgICB9XG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xuICAgICAgICBkZWxldGUgdGhpcy5kb21haW5zW2RvbWFpbl07XG4gICAgfVxuICAgIGdldChtb2RlbF9uYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xuICAgIH1cbiAgICBkZWwobW9kZWxfbmFtZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcbiAgICB9XG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XG4gICAgICAgIC8vIHJldHVybiBkYXRhX2NoYW5nZWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxuIiwiZXhwb3J0IGNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL2FqYXgtbG9hZGVyLmdpZlwiIC8+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcbiAgICBsZXQgdGl0bGUgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMF0gOiBfKFwiZ2xvYmFsLm1lc3NhZ2VzLmVycm9yX2hlYWRlclwiKTtcbiAgICBsZXQgdGV4dCA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1sxXSA6IG1zZztcbiAgICBzd2FsKHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93Q29uZmlybShtZXNzYWdlLCBhY3Rpb24sIGNsb3NlX29uX2NvbmZpcm09ZmFsc2UpIHtcbiAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKSxcbiAgICAgICAgY2xvc2VPbkNvbmZpcm06IGNsb3NlX29uX2NvbmZpcm0sXG4gICAgfSwgYWN0aW9uKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBQcmludGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdGl0bGUxOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdGl0bGUyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdGl0bGUzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgYm9keTogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmZXRjaFByaW50YWJsZURhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5LmlubmVySFRNTDtcbiAgICB9XG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5oZWFkZXIgPyA8ZGl2IGNsYXNzTmFtZT1cInAtaGVhZGVyXCI+eyB0aGlzLnByb3BzLmhlYWRlciB9PC9kaXY+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUxKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTEgPyA8aDE+eyB0aGlzLnByb3BzLnRpdGxlMSB9PC9oMT4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMiA/IDxoMj57IHRoaXMucHJvcHMudGl0bGUyIH08L2gyPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUzID8gPGgzPnsgdGhpcy5wcm9wcy50aXRsZTMgfTwvaDM+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIHJlZj17IGUgPT4gdGhpcy5fYm9keSA9IGUgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5ib2R5IH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicHJpbnRhYmxlXCI+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTIoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUzKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaE9yQ2xpY2soaGFuZGxlcikge1xuICAgIGxldCBmID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBoYW5kbGVyKGV2ZW50KTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogZixcbiAgICAgICAgb25DbGljazogZixcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoRW5kT3JDbGljayhoYW5kbGVyLCBwcmV2ZW50X2RlZmF1bHQpIHtcbiAgICBsZXQgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICBsZXQgZGlzdGFuY2UgPSAwO1xuICAgIGxldCBsYXRlc3RfcG9zID0gWzAsIDBdO1xuICAgIGxldCBmaXJlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBfaGFuZGxlcigpO1xuICAgIH1cbiAgICBsZXQgZGlzY2FyZCA9ICgpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICB9XG4gICAgbGV0IG1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnRfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgICAgICBsZXQgc3FyID0gKHgpID0+IHggKiB4O1xuICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnNxcnQoc3FyKGN1cnJlbnRfcG9zWzBdIC0gbGF0ZXN0X3Bvc1swXSkgKyBzcXIoY3VycmVudF9wb3NbMV0gLSBsYXRlc3RfcG9zWzFdKSk7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBjdXJyZW50X3BvcztcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMjApIHtcbiAgICAgICAgICAgIGRpc2NhcmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICBkaXN0YW5jZSA9IDA7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogc3RhcnQsXG4gICAgICAgIG9uVG91Y2hFbmQ6IGZpcmUsXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBtb3ZlLFxuICAgICAgICBvblRvdWNoQ2FuY2VsOiBkaXNjYXJkLFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVyLFxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb25lOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIGRvbmVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgc2xpZGVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25BY3RpdmF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBpbiA9IG51bGw7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kb25lICYmIG5leHRQcm9wcy5kb25lKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0ZyZWUoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS50b3VjaCAmJiAhdGhpcy5wcm9wcy5kb25lICYmICF0aGlzLnN0YXRlLmZpbmlzaGVkO1xuICAgIH1cbiAgICBnZXRPdXRlclRleHRPcGFjaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5taW4oTWF0aC5tYXgoMTAwIC0gdGhpcy5zdGF0ZS5wb3NpdGlvbiwgMCksIDEwMCk7XG4gICAgICAgIHJldHVybiAodmFsdWUgLyAxMDApLnRvRml4ZWQoMyk7XG4gICAgfVxuICAgIGdldEVsZW1lbnRPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICBsZXQgcmVzID0gMDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJlcyArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZ2V0VG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0UmVsYXRpdmVUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0U2xpZGVyUG9zKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldFRvdWNoKGV2ZW50KSAtIHRoaXMucGluO1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgMjAwKTtcbiAgICB9XG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2lzaW9uOiAyMDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xuICAgIH1cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waW4gPSB0aGlzLmdldFJlbGF0aXZlVG91Y2goZXZlbnQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgICAgICB0b3VjaDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucG9zaXRpb24gPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyIG5vc2VsZWN0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpbm5lclwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiAodGhpcy5wcm9wcy5kb25lIHx8IHRoaXMuc3RhdGUuZmluaXNoZWQpID8gXCIyMDBweFwiIDogdGhpcy5zdGF0ZS5wb3NpdGlvbiArIFwicHhcIiB9fVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMub25Ub3VjaFN0YXJ0LmJpbmQodGhpcykgfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAg4oaSXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lXG4gICAgICAgICAgICAgICAgPyA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2IoMTAwLDEwMCwxMDApXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA6IDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYmEoMTAwLDEwMCwxMDAsXCIgKyB0aGlzLmdldE91dGVyVGV4dE9wYWNpdHkoKSArIFwiKVwiIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwic2xpZGUtdGV4dFwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2xpZGVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVGFibGV0U2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGNob2ljZXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvd19zaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0QnV0dG9uc0NvdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvd19zaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xuICAgIH1cbiAgICBvbkNsaWNrKG4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKG4pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9wcy5jaG9pY2VzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBlbFswXTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZWxbMV07XG4gICAgICAgICAgICBsZXQgYWN0aXZlX2NsYXNzX25hbWUgPSAodGhpcy5wcm9wcy5hY3RpdmUgPT09IGtleSkgPyBcIiBhY3RpdmVcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGtleSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uQ2xpY2suYmluZCh0aGlzLCBrZXkpKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIHNjb3JlLWJ0blwiICsgYWN0aXZlX2NsYXNzX25hbWUgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIiAmJiAoaWR4ICsgMSkgJSB0aGlzLnByb3BzLnJvd19zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goPGJyIGtleT17IFwiYnJcIiArIGlkeCB9IC8+KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGxheW91dF9jbGFzcyA9ICh0aGlzLnByb3BzLnN0eWxlICE9PSBcInR3by1saW5lc1wiKSA/IFwic2VsZWN0b3ItbGF5b3V0XCIgOiBcInNlbGVjdG9yLWxheW91dC0ycm93c1wiO1xuICAgICAgICBsZXQgc2VsZWN0ZWRfY2xhc3MgPSB0aGlzLnByb3BzLmFjdGl2ZSA9PT0gbnVsbCA/IFwiXCIgOiBcIiBzZWxlY3RlZFwiXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJzY29yaW5nLWxheW91dCBcIiArIGxheW91dF9jbGFzcyArIHNlbGVjdGVkX2NsYXNzICsgXCIgbi1cIiArIHRoaXMuZ2V0QnV0dG9uc0NvdW50KCkudG9TdHJpbmcoKSB9PnsgcmVzdWx0IH08L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSBtaW47IGlkeCA8PSBtYXg7ICsraWR4KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4LCBpZHgudG9TdHJpbmcoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IE1hdGgucm91bmQoMiAqIG1pbik7IGlkeCA8PSBNYXRoLnJvdW5kKDIgKiBtYXgpOyArK2lkeCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCAvIDIsIChpZHggJSAyKSA/IChpZHggLyAyKS50b0ZpeGVkKDEpIDogTWF0aC5mbG9vcihpZHggLyAyKS50b1N0cmluZygpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWludXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblBsdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAxfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWludXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMC41fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDAuNSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMC41fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDAuNSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxudmFyIHN0b3B3YXRjaGVzID0ge307XG5cbmV4cG9ydCBjbGFzcyBTdG9wV2F0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmVfaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdIHx8IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIHN0cl92YWx1ZTogXCIwOjAwXCIsXG4gICAgICAgICAgICBpbnRlcnZhbDogdGhpcy5zdGF0ZS5hY3RpdmVcbiAgICAgICAgICAgICAgICA/IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMClcbiAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSA9IHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIG5vdygpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPyB0aGlzLnN0b3AoKSA6IHRoaXMuc3RhcnQoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuICAgIHRpY2soKSB7XG4gICAgICAgIHZhciBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYWQobnVtLCBzaXplKSB7XG4gICAgICAgIHZhciBzID0gXCIwMDAwXCIgKyBudW0udG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gc2l6ZSk7XG4gICAgfVxuICAgIGdldFN0clZhbHVlKCkge1xuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICB2YXIgbSA9IDAsIHMgPSAwO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XG4gICAgICAgIHJldHVybiBtLnRvU3RyaW5nKCkgKyAnOicgKyB0aGlzLnBhZChzLCAyKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBidG4tdG9nZ2xlIGlnbm9yZS1yZWFkb25seVwiICsgKHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmUgPyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF9zdG9wd2F0Y2hcIikgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=
