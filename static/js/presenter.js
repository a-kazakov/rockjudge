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
                                        s.last_name + " " + s.first_name,
                                        s.substitute ? React.createElement(
                                            "i",
                                            null,
                                            " (",
                                            (0, _loader._)("admin.labels.sub"),
                                            ".)"
                                        ) : null
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
            "li": { "margin-top": 0, "padding-top": 0 },
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
                "about": function about(version, date) {
                    return React.createElement(
                        "div",
                        { className: "about" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "b",
                                null,
                                "RockJudge ",
                                version
                            ),
                            " (от ",
                            date,
                            ") — система для подсчета результатов соревнований по акробатическому рок-н-роллу."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Авторские права на систему RockJudge полностью принадлежат разработчику Артему Казакову. Соавтор системы Антон Амелин."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Система распространяется по лицензии Linum d.o.o (info@linum.hr). Для использования системы судейства RockJudge необходимо и достаточно иметь право использования системы Linum LPS."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Официальный сайт: ",
                            React.createElement(
                                "a",
                                { href: "https://rockjudge.com/", target: "_blank" },
                                "https://rockjudge.com/"
                            )
                        )
                    );
                },
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
                "heats": "Заходы сл. тура",
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
                "about": "О программе",
                "auto_printer": "Автоматическая печать",
                "clients_management": "Управление подключенными устройствами",
                "clubs": "Клубы-участники",
                "clubs_management": "Управление клубами",
                "clubs_summary": "Сводка по клубам",
                "competition_plan": "Программа соревнований",
                "competition_plan_management": "Программа соревнований",
                "competition_report": "Протокол соревнований",
                "competition_results": "Результаты соревнований",
                "competitions_management": "Управление соревнованиями",
                "discipline_results": "Результаты дисциплины",
                "disciplines_management": "Управление дисциплинами",
                "disciplines_shown": "Информация только по следующим дисциплинам:",
                "disciplines_summary": "Сводка по дисциплинам",
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
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "no_files_selected": "Выберите файл...",
                "paste_acro": "Вставьте данные из калькулятора акробатики",
                "show_summary": "Показывать только количество",
                "sub": "зап" },
            // substitute
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
                "n_participants": function n_participants(n) {
                    return n.toString() + " участник" + chooseEnding(n, "", "а", "ов");
                },
                "n_sportsmen": function n_sportsmen(n) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов");
                },
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
                "discipline_name": "Дисциплина",
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
                "substitute_n": "Осн.",
                "substitute_y": "Зап.",
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
            interval: null
        };
        if (_this8.state.active) {
            _this8.state.interval = setInterval(_this8.tick.bind(_this8), 10); // eslint-disable-line react/no-direct-mutation-state
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHJvc2ZhcnJcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcY2xpZW50c1xccHJlc2VudGVyXFxtYWluLmpzeCIsInNyY1xcanN4XFxjb21tb25cXGRvY3guanN4Iiwic3JjXFxqc3hcXGkxMG5cXGxvYWRlci5qc3giLCJzcmNcXGpzeFxcaTEwblxccnUuanN4Iiwic3JjXFxqc3hcXHByZXNlbnRlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxhcGkuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcbWVzc2FnZV9kaXNwYXRjaGVyLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXHN0b3JhZ2UuanN4Iiwic3JjXFxqc3hcXHVpXFxjb21wb25lbnRzLmpzeCIsInNyY1xcanN4XFx1aVxcZGlhbG9ncy5qc3giLCJzcmNcXGpzeFxcdWlcXHByaW50YWJsZS5qc3giLCJzcmNcXGpzeFxcdWlcXHRhYmxldF9jb21wb25lbnRzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDY2E7Ozs7Ozs7Ozt1Q0FDVCx5QkFBTyxTQUFTOzs7QUFDWixlQUFPO21CQUFPLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsT0FBcEI7U0FBTixDQUFvQyxJQUFyQyxDQUEwQyxJQUExQyxDQUFQLENBRFk7OztBQURQLHVDQUlULDJCQUFTO0FBQ0wsZUFBTzs7O1lBQ0g7O2tCQUFRLFdBQVUsaUJBQVYsRUFBNEIsU0FBVSxLQUFLLE1BQUwsQ0FBWSxNQUFaLENBQVYsRUFBcEM7O2FBREc7U0FBUCxDQURLOzs7V0FKQTtFQUFpQyxNQUFNLFNBQU47O0lBYWpDOzs7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QUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBckM7bUJBQ1IsZUFBZSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQWYsRUFGUjtnQkFJTSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLGVBQUUsK0JBQUYsQ0FBcEIsR0FBeUQsZUFBRSxnQ0FBRixDQUF6RDthQVhWO1lBYUk7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNNLEtBQUssV0FBTCxFQUROO2FBYko7U0FESixDQURLOzs7V0E3RUE7RUFBa0IsTUFBTSxTQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBQcmludGFibGUgfSBmcm9tIFwidWkvcHJpbnRhYmxlXCI7XHJcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxyXG4gICAgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSxcclxuICAgIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZSxcclxufSBmcm9tIFwiLi9yb3NmYXJyL2Rpc2NpcGxpbmVfcmVzdWx0c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XHJcbiAgICAgICAgICAgICAgICBET0NYXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyOiBcInBhZ2VcIixcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBsb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ydW5zX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcclxuICAgICAgICB0aGlzLnJlbG9hZF9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRTdGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdG91cl9zdG9yYWdlID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIikuYnlfaWQobWVzc2FnZVtcInRvdXJfaWRcIl0pO1xyXG4gICAgICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuZGlzY2lwbGluZS5pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsX2lkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmcy5wcmludGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xyXG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcclxuICAgIH1cclxuICAgIHJlbG9hZFN0YXRlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMucnVuc19sb2FkZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RvcmFnZV9ydW5zID0gdGhpcy5zdG9yYWdlLmdldChcIlJ1blwiKVxyXG4gICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHM7XHJcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IFtdXHJcbiAgICAgICAgdmFyIFNDSEVNQSA9IHtcclxuICAgICAgICAgICAgdG91cjoge30sXHJcbiAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICBzcG9ydHNtZW46IHt9LFxyXG4gICAgICAgICAgICAgICAgY2x1Yjoge30sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBuZXdfc3RhdGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwbGFjZTogcmVzdWx0c1tpXS5wbGFjZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogc3RvcmFnZV9ydW5zLmJ5X2lkKHJlc3VsdHNbaV0ucnVuX2lkKS5zZXJpYWxpemUoU0NIRU1BKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBsb2FkZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHRhYmxlOiBuZXdfc3RhdGUsXHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHRoaXMuc3RvcmFnZS5nZXQoXCJEaXNjaXBsaW5lXCIpLmJ5X2lkKHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCkuc2VyaWFsaXplKHtcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2FkUmVzdWx0cygpIHtcclxuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldF9yZXN1bHRzXCIsIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uU3VjY2VzcyhyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9yZXN1bHRzOiByZXNwb25zZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU3RhdGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldFwiLCB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IHtcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcclxuICAgICAgICAgICAgICAgIHRvdXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkVG9EQihcIkRpc2NpcGxpbmVcIiwgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLCB0aGlzLnN0b3JhZ2UpXHJcbiAgICAgICAgLm9uU3VjY2VzcygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuc19sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFN0YXRlKHRoaXMpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExpc3RlbmVyc1xyXG5cclxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcclxuICAgICAgICBjYXNlIFwiZG9jeFwiOlxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbmRlcmluZ1xyXG5cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnJlbmRlcmVyKSB7XHJcbiAgICAgICAgY2FzZSBcInByZXNlbnRlclwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH0gcmVmPVwibWFpbl90YWJsZVwiIC8+XHJcbiAgICAgICAgY2FzZSBcInNjcmVlbl9vcGVyYXRvclwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVxyXG4gICAgICAgICAgICAgICAgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH1cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGxhY2U9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgb25QbGFjZVNlbGVjdD17IHRoaXMucHJvcHMub25QbGFjZVNlbGVjdCB9XHJcbiAgICAgICAgICAgICAgICByZWY9XCJtYWluX3RhYmxlXCIgLz5cclxuICAgICAgICBjYXNlIFwicGFnZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPFByaW50YWJsZVxyXG4gICAgICAgICAgICAgICAgcmVmPVwicHJpbnRhYmxlXCJcclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMuZGlzY2lwbGluZV9yZXN1bHRzXCIpIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIGJvZHk9eyA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSAvPiB9IC8+XHJcbiAgICAgICAgY2FzZSBcInRhYmxlXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSByZWY9XCJtYWluX3RhYmxlXCIgLz5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5sb2FkZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+PExvYWRlciAvPjwvZGl2PlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcclxuICAgICAgICAgICAgLnNldFRpdGxlMShfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS5kaXNjaXBsaW5lLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRCb2R5KHRoaXMucmVmcy5wcmludGFibGUuZmV0Y2hQcmludGFibGVEYXRhKCkpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3VyLW5hbWVcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcInBhZGRpbmdcIiwgXCIwXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zcG9ydHNtZW5cIiwgXCJ3aWR0aFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgLnNhdmUoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IG9uVG91Y2hFbmRPckNsaWNrIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcblxyXG5cclxuZnVuY3Rpb24gX18oKSB7XHJcbiAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF8oXCJzY29yaW5nX3N5c3RlbXMucm9zZmFyci5cIiArIGFyZ3VtZW50c1swXSwgLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcclxuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cucnVuLnRvdXIuaWQgIT09IG5leHRfcm93LnJ1bi50b3VyLmlkKVxyXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT48dGggY2xhc3NOYW1lPVwidG91ci1uYW1lXCIgY29sU3Bhbj1cIjZcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfTwvcD5cclxuICAgICAgICA8L3RoPjwvdHI+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KHJvdykge1xyXG4gICAgICAgIGxldCBwID0gcm93LnJ1bi5wYXJ0aWNpcGFudDtcclxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IHBsYWNlXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHJvdy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOiByb3cucGxhY2UgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IG51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBwLm51bWJlciB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTM2XCIgY29sU3Bhbj1cIjJcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzcG9ydHNtZW5cIj48dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBwLmZvcm1hdGlvbl9uYW1lID8gPHRyPjx0aCBjb2xTcGFuPVwiMlwiPjxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgcC5mb3JtYXRpb25fbmFtZSB9PC9wPjwvdGg+PC90cj4gOiBudWxsIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHAuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PiA8dHIga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTc1XCI+PHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHMubGFzdF9uYW1lICsgXCIgXCIgKyBzLmZpcnN0X25hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLnN1YnN0aXR1dGUgPyA8aT4gKHsgXyhcImFkbWluLmxhYmVscy5zdWJcIikgfS4pPC9pPiA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcy55ZWFyX29mX2JpcnRoIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPiApIH1cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY2x1YlwiPjxwPnsgcC5jbHViLm5hbWUgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjb2FjaGVzXCI+PHA+eyBwLmNvYWNoZXMuc3BsaXQoXCIsXCIpLm1hcCgoYykgPT4gW2MudHJpbSgpLCA8YnIga2V5PVwiWFwiIC8+XSkgfTwvcD48L3RkPlxyXG4gICAgICAgIDwvdHI+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93cygpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpIC0gMV0sIHRhYmxlW2ldKTtcclxuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjdcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOVwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jb2FjaGVzXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9nZ2xlQWN0aXZlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6ICF0aGlzLnN0YXRlLmFjdGl2ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMudG9nZ2xlQWN0aXZlLmJpbmQodGhpcykpfT48dGJvZHk+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBsYWNlID09PSBudWxsID8gXCJcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBwLm5hbWUgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCIgY29sU3Bhbj1cIjJcIj57IHAuY2x1Yi5uYW1lIH08L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY29hY2hlc1wiIGNvbFNwYW49XCIyXCI+eyBwLmNvYWNoZXMgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XHJcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcclxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KHJvdykge1xyXG4gICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZVJvdyBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudD17IHJvdy5ydW4ucGFydGljaXBhbnQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9IC8+XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3dzKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0YWJsZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSArIDFdLCB0YWJsZVtpXSk7XHJcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnByb3BzLnNlbGVjdGVkID8gXCIgc2VsZWN0ZWRcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uQ2xpY2spfT48dGJvZHk+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBsYWNlID09PSBudWxsID8gXCJcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBwLm5hbWUgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCIgY29sU3Bhbj1cIjJcIj57IHAuY2x1Yi5uYW1lIH08L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XHJcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcclxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KHJvdywgcGxhY2UpIHtcclxuICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVJvd1xyXG4gICAgICAgICAgICBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfVxyXG4gICAgICAgICAgICBwYXJ0aWNpcGFudD17IHJvdy5ydW4ucGFydGljaXBhbnQgfVxyXG4gICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLm9uUGxhY2VTZWxlY3QocGxhY2UpIH1cclxuICAgICAgICAgICAgc2VsZWN0ZWQ9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgIT09IG51bGwgJiYgcGxhY2UgPj0gdGhpcy5wcm9wcy5zZWxlY3RlZFBsYWNlIH0gLz5cclxuICAgIH1cclxuICAgIHJlbmRlclJvd3MoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhYmxlLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpICsgMV0sIHRhYmxlW2ldKTtcclxuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldLCBpICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgb25Ub3VjaE9yQ2xpY2sgfSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgRGlzY2lwbGluZVJlc3VsdHMgfSBmcm9tIFwiYWRtaW4vanVkZ2luZy9kaXNjaXBsaW5lX3Jlc3VsdHNcIjtcclxuXHJcblxyXG5jbGFzcyBQcmVzZW50ZXJUYWJsZXRMZWZ0QmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcImluZm9cIiwgXCJoZWF0c1wiLCBcInJlc3VsdHNcIl0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uUGFnZVN3aXRjaDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtYmFyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJpdGVtXCIgKyAodGhpcy5wcm9wcy5hY3RpdmUgPT09IFwiaW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljaygoKSA9PiB0aGlzLnByb3BzLm9uUGFnZVN3aXRjaChcImluZm9cIikpIH0+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57IF8oXCJwcmVzZW50ZXIuaGVhZGVycy5pbmZvXCIpIH08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiaXRlbVwiICsgKHRoaXMucHJvcHMuYWN0aXZlID09PSBcImhlYXRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKCgpID0+IHRoaXMucHJvcHMub25QYWdlU3dpdGNoKFwiaGVhdHNcIikpIH0+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57IF8oXCJwcmVzZW50ZXIuaGVhZGVycy5oZWF0c1wiKSB9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcIml0ZW1cIiArICh0aGlzLnByb3BzLmFjdGl2ZSA9PT0gXCJyZXN1bHRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKCgpID0+IHRoaXMucHJvcHMub25QYWdlU3dpdGNoKFwicmVzdWx0c1wiKSkgfT5cclxuICAgICAgICAgICAgICAgIDxzcGFuPnsgXyhcInByZXNlbnRlci5oZWFkZXJzLnJlc3VsdHNcIikgfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFByZXNlbnRlclRhYmxldEluZm9Db21wZXRpdGlvbkluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KHJvdywgaWR4KSB7XHJcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBpZHggfT5cclxuICAgICAgICAgICAgPHRoPnsgcm93WzBdIH08L3RoPlxyXG4gICAgICAgICAgICA8dGQ+eyByb3dbMV0gfTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cImNvbXBldGl0aW9uLWluZm9cIj48dGJvZHk+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5pbmZvLm1hcCh0aGlzLnJlbmRlclJvdy5iaW5kKHRoaXMpKSB9XHJcbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQcmVzZW50ZXJUYWJsZXRJbmZvSnVkZ2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGp1ZGdlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlclJvdyhqdWRnZSkge1xyXG4gICAgICAgIHJldHVybiA8dHIga2V5PXsganVkZ2UuaWQgfT5cclxuICAgICAgICAgICAgPHRoPnsganVkZ2Uucm9sZV9kZXNjcmlwdGlvbiB8fCBfKFwiZ2xvYmFsLnBocmFzZXMuanVkZ2VfblwiLCBqdWRnZS5udW1iZXIpIH08L3RoPlxyXG4gICAgICAgICAgICA8dGQ+eyBqdWRnZS5uYW1lIH0gJm1kYXNoOyB7IGp1ZGdlLmNhdGVnb3J5IH08L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJqdWRnZXNcIj48dGJvZHk+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5qdWRnZXMubWFwKHRoaXMucmVuZGVyUm93LmJpbmQodGhpcykpIH1cclxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFByZXNlbnRlclRhYmxldEluZm9DbHVicyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjbHViczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlclJvdyhjaXR5KSB7XHJcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBjaXR5Lm5hbWUgfT5cclxuICAgICAgICAgICAgPHRoPnsgY2l0eS5uYW1lIH08L3RoPlxyXG4gICAgICAgICAgICA8dGQ+eyBjaXR5LmNsdWJzLm1hcCgoY2x1YikgPT4gPGRpdiBrZXk9eyBjbHViLmlkIH0+eyBjbHViLm5hbWUgfTwvZGl2PikgfTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgIH1cclxuICAgIHJlZ3JvdXBDbHVicygpIHtcclxuICAgICAgICBsZXQgY2l0aWVzID0ge307XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbHVicy5mb3JFYWNoKChjbHViKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY2l0aWVzW2NsdWIuY2l0eV0pIHtcclxuICAgICAgICAgICAgICAgIGNpdGllc1tjbHViLmNpdHldID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2l0aWVzW2NsdWIuY2l0eV0ucHVzaChjbHViKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjaXRpZXMpLm1hcCgoY2l0eSkgPT4gKHtcclxuICAgICAgICAgICAgbmFtZTogY2l0eSxcclxuICAgICAgICAgICAgY2x1YnM6IGNpdGllc1tjaXR5XSxcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJqdWRnZXNcIj48dGJvZHk+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZWdyb3VwQ2x1YnMoKS5tYXAodGhpcy5yZW5kZXJSb3cuYmluZCh0aGlzKSkgfVxyXG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUHJlc2VudGVyVGFibGV0SW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1wiPlxyXG4gICAgICAgICAgICA8aDI+eyB0aGlzLnByb3BzLmNvbXBldGl0aW9uLm5hbWUgfTwvaDI+XHJcbiAgICAgICAgICAgIDxQcmVzZW50ZXJUYWJsZXRJbmZvQ29tcGV0aXRpb25JbmZvIGNvbXBldGl0aW9uPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbiB9IC8+XHJcbiAgICAgICAgICAgIDxoMz57IF8oXCJwcmVzZW50ZXIuaGVhZGVycy5qdWRnZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgIDxQcmVzZW50ZXJUYWJsZXRJbmZvSnVkZ2VzIGp1ZGdlcz17IHRoaXMucHJvcHMuY29tcGV0aXRpb24uanVkZ2VzIH0gLz5cclxuICAgICAgICAgICAgPGgzPnsgXyhcInByZXNlbnRlci5oZWFkZXJzLmNsdWJzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICA8UHJlc2VudGVyVGFibGV0SW5mb0NsdWJzIGNsdWJzPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5jbHVicyB9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFByZXNlbnRlclRhYmxldEhlYXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBJbnRpaWFsaXphdGlvblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogMSxcclxuICAgICAgICAgICAgYWN0aXZlX3RvdXJfaWQ6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImFjdGl2ZV90b3VyX3VwZGF0ZVwiLCB0aGlzLmRpc3BhdGNoQWN0aXZlVG91clVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcclxuICAgICAgICBsZXQgYWN0aXZlX3RvdXJfaWQgPSB0aGlzLnN0YXRlLmFjdGl2ZV90b3VyX2lkO1xyXG4gICAgICAgIGlmIChhY3RpdmVfdG91cl9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhY3RpdmVfdG91cl9tb2RlbCA9IHN0b3JhZ2UuZ2V0KFwiVG91clwiKS5ieV9pZChhY3RpdmVfdG91cl9pZCk7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVfdG91cl9tb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB0b3VyOiBhY3RpdmVfdG91cl9tb2RlbC5zZXJpYWxpemUoe1xyXG4gICAgICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2x1YlwiOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiB7fSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcInRvdXIuZmluZF9hY3RpdmVcIiwge30pLm9uU3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoQWN0aXZlVG91clVwZGF0ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzcGF0Y2hlcnNcclxuXHJcbiAgICBkaXNwYXRjaEFjdGl2ZVRvdXJVcGRhdGUocmVzcG9uc2UpIHtcclxuICAgICAgICB2YXIgdG91cl9pZCA9IHJlc3BvbnNlLnRvdXJfaWQ7XHJcbiAgICAgICAgaWYgKCh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwgJiYgdG91cl9pZCA9PT0gbnVsbCkgfHwgKHRoaXMuc3RhdGUudG91ciAhPT0gbnVsbCAmJiB0aGlzLnN0YXRlLnRvdXIuaWQgPT09IHRvdXJfaWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIFwiYWN0aXZlX3RvdXJfaWRcIjogdG91cl9pZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodG91cl9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlRvdXJcIik7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiUnVuXCIpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlBhcnRpY2lwYW50XCIpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlNwb3J0c21hblwiKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJDbHViXCIpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIkRpc2NpcGxpbmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdG91cjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogMSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwgeyB0b3VyX2lkOiB0b3VyX2lkLCBjaGlsZHJlbjp7XHJcbiAgICAgICAgICAgIHJ1bnM6IHtcclxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjbHViXCI6IHt9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlzY2lwbGluZToge30sXHJcbiAgICAgICAgfX0pXHJcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0b3VyX2lkKVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSh0b3VyX2lkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogMSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWN0aW9uc1xyXG5cclxuICAgIHRvUHJldkhlYXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogdGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQgLSAxLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdG9OZXh0SGVhdCgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY3VycmVudF9oZWF0OiB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCArIDEsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVscGVyc1xyXG5cclxuICAgIGdldEhlYXRzQ291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLnRoaXMuc3RhdGUudG91ci5ydW5zLm1hcCgocnVuKSA9PiBydW4uaGVhdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbmRlcmluZ1xyXG5cclxuICAgIHJlbmRlckhlYWRlcigpIHtcclxuICAgICAgICB2YXIgYnRuX3ByZXYgPSBudWxsO1xyXG4gICAgICAgIHZhciBidG5fbmV4dCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBidG5fcHJldiA9IDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvUHJldkhlYXQuYmluZCh0aGlzKSl9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnByZXZfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IDwgdGhpcy5nZXRIZWF0c0NvdW50KCkpIHtcclxuICAgICAgICAgICAgICAgIGJ0bl9uZXh0ID0gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvTmV4dEhlYXQuYmluZCh0aGlzKSl9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLm5leHRfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRfdG91ciA9ICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpID8gbnVsbCA6XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aDE+eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH08L2gxPlxyXG4gICAgICAgICAgICAgICAgPGgyPnsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfTwvaDI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHJldHVybiA8aGVhZGVyPlxyXG4gICAgICAgICAgICB7IGJ0bl9wcmV2IH1cclxuICAgICAgICAgICAgeyBidG5fbmV4dCB9XHJcbiAgICAgICAgICAgIHsgY3VycmVudF90b3VyIH1cclxuICAgICAgICA8L2hlYWRlcj5cclxuICAgIH1cclxuICAgIHJlbmRlclNwbGFzaFNjcmVlbigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzcGxhc2gtc2NyZWVuXCI+XHJcbiAgICAgICAgICAgIDxkaXY+eyBfKFwicHJlc2VudGVyLmxhYmVscy5ub19hY3RpdmVfdG91clwiKSB9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhdCgpIHtcclxuICAgICAgICBsZXQgcnVucyA9IHRoaXMuc3RhdGUudG91ci5ydW5zLmZpbHRlcigocnVuKSA9PiBydW4uaGVhdCA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQpO1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImhlYXRcIj5cclxuICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5oZWFkZXJzLmhlYXRcIikgfTogeyB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCB9IC8geyB0aGlzLmdldEhlYXRzQ291bnQoKSB9PC9oMz5cclxuICAgICAgICAgICAgeyBydW5zLm1hcCgocnVuKSA9PlxyXG4gICAgICAgICAgICAgICAgPHRhYmxlIGtleT17IHJ1bi5pZCB9Pjx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIiByb3dTcGFuPVwiMlwiPnsgcnVuLnBhcnRpY2lwYW50Lm51bWJlciB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHJ1bi5wYXJ0aWNpcGFudC5uYW1lIH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+PHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiPnsgcnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9LCB7IHJ1bi5wYXJ0aWNpcGFudC5jbHViLmNpdHkgfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmp1ZGdlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaGVhdHNcIj57IHRoaXMucmVuZGVyU3BsYXNoU2NyZWVuKCkgfTwvZGl2PjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaGVhdHNcIj5cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYXQoKSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFByZXNlbnRlclRhYmxldFJlc3VsdHNEaXNjaXBsaW5lU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25EaXNjaXBsaW5lQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZXNcIj5cclxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRpc2NpcGxpbmVzLm1hcCgoZGlzY2lwbGluZSkgPT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJpdGVtXCIgKyAodGhpcy5wcm9wcy5hY3RpdmUgPT09IGRpc2NpcGxpbmUuaWQgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICBrZXk9eyBkaXNjaXBsaW5lLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKCgpID0+IHRoaXMucHJvcHMub25EaXNjaXBsaW5lQ2hhbmdlKGRpc2NpcGxpbmUuaWQpKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBkaXNjaXBsaW5lLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQcmVzZW50ZXJUYWJsZXRSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZV9kaXNjaXBsaW5lOiBudWxsLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzXCI+XHJcbiAgICAgICAgICAgIDxQcmVzZW50ZXJUYWJsZXRSZXN1bHRzRGlzY2lwbGluZVNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU9eyB0aGlzLnN0YXRlLmFjdGl2ZV9kaXNjaXBsaW5lIH1cclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVzPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5kaXNjaXBsaW5lcyB9XHJcbiAgICAgICAgICAgICAgICBvbkRpc2NpcGxpbmVDaGFuZ2U9eyAobmV3X2Rpc2NpcGxpbmUpID0+IHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVfZGlzY2lwbGluZTogbmV3X2Rpc2NpcGxpbmUgfSkgfSAvPlxyXG4gICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlX2Rpc2NpcGxpbmUgIT09IG51bGxcclxuICAgICAgICAgICAgICAgID8gPERpc2NpcGxpbmVSZXN1bHRzIGRpc2NpcGxpbmVfaWQ9eyB0aGlzLnN0YXRlLmFjdGl2ZV9kaXNjaXBsaW5lIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyPVwicHJlc2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHRoaXMuc3RhdGUuYWN0aXZlX2Rpc2NpcGxpbmUgfSAvPlxyXG4gICAgICAgICAgICAgICAgOiA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPjwvZGl2PiB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcGFnZTogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHN0b3JhZ2UuZ2V0KFwiQ29tcGV0aXRpb25cIilcclxuICAgICAgICAgICAgICAgIC5ieV9pZCh0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkKVxyXG4gICAgICAgICAgICAgICAgLnNlcmlhbGl6ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1YnM6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVzOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBqdWRnZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5nZXRcIiwgeyBjb21wZXRpdGlvbl9pZDogdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZCwgY2hpbGRyZW46IHtcclxuICAgICAgICAgICAgY2x1YnM6IHt9LFxyXG4gICAgICAgICAgICBkaXNjaXBsaW5lczoge30sXHJcbiAgICAgICAgICAgIGp1ZGdlczoge30sXHJcbiAgICAgICAgfSB9KVxyXG4gICAgICAgICAgICAuYWRkVG9EQihcIkNvbXBldGl0aW9uXCIsIHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpXHJcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoUGFnZShuZXdfcGFnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwYWdlOiBuZXdfcGFnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcGV0aXRpb24gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBhZ2UpIHtcclxuICAgICAgICBjYXNlIFwiaW5mb1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gPFByZXNlbnRlclRhYmxldEluZm8gY29tcGV0aXRpb249eyB0aGlzLnN0YXRlLmNvbXBldGl0aW9uIH0gLz5cclxuICAgICAgICBjYXNlIFwiaGVhdHNcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxQcmVzZW50ZXJUYWJsZXRIZWF0cyAvPlxyXG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8UHJlc2VudGVyVGFibGV0UmVzdWx0cyBjb21wZXRpdGlvbj17IHRoaXMuc3RhdGUuY29tcGV0aXRpb24gfSAvPlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcmVzZW50ZXItdGFibGV0XCI+XHJcbiAgICAgICAgICAgIDxQcmVzZW50ZXJUYWJsZXRMZWZ0QmFyXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU9eyB0aGlzLnN0YXRlLnBhZ2UgfVxyXG4gICAgICAgICAgICAgICAgb25QYWdlU3dpdGNoPXsgdGhpcy5zd2l0Y2hQYWdlLmJpbmQodGhpcykgfSAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG4iLCJjbGFzcyBEb2N4SW1wbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihmaWxlbmFtZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcclxuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50aXRsZTEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGl0bGUyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRpdGxlMyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tYXJnaW5zID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJvZHkgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBcInBvcnRyYWl0XCI7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMgPSB7XHJcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC1mYW1pbHlcIjogXCJDYWxpYnJpLCBUYWhvbWEsIEFyaWFsLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidGFibGVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJib3JkZXItY29sbGFwc2VcIjogXCJjb2xsYXBzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstaW5zaWRlXCI6IFwiYXZvaWRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0ZCwgdGhcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IFwiMXB0IDNwdFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImgxLCBoMiwgaDMsIGg0LCBoNSwgaDZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IFwiYXZvaWRcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImgxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMjBwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcclxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiMTBwdFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImgyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcclxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNnB0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaDNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNnB0XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCI0cHRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoNCBwXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiMTBwdCAwIDZwdFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImg1IHBcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMnB0XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogXCI2cHQgMFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIi5oZWFkZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJib3JkZXItYm90dG9tXCI6IFwiMXB4IHNvbGlkIGJsYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nLWJvdHRvbVwiOiBcIjJwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGlcIjogeyBcIm1hcmdpbi10b3BcIjogMCwgXCJwYWRkaW5nLXRvcFwiOiAwIH0sXHJcbiAgICAgICAgICAgIFwiLnNwYWNlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCIudmEtdG9wXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0b3BcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCIudGV4dC1sZWZ0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiIH0sXHJcbiAgICAgICAgICAgIFwiLnRleHQtcmlnaHRcIjogeyBcInRleHQtYWxpZ25cIjogXCJyaWdodFwiIH0sXHJcbiAgICAgICAgICAgIFwiLnRleHQtY2VudGVyXCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIgfSxcclxuICAgICAgICAgICAgXCIuYm9yZGVyZWQtdGFibGUgdGQsIC5ib3JkZXJlZC10YWJsZSB0aFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFwdCBzb2xpZCBibGFja1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFdpZHRoQ3NzKCk7XHJcbiAgICB9XHJcbiAgICBhZGRXaWR0aENzcygpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDA7ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN0eWxlKFwiLnctXCIgKyBpLCBcIndpZHRoXCIsIGkgKyBcIiVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFN0eWxlKHNlbGVjdG9yLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZXNbc2VsZWN0b3JdID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRIZWFkZXIoaGVhZGVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRUaXRsZTEodGl0bGUxKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZTEgPSB0aXRsZTE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRUaXRsZTIodGl0bGUyKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZTIgPSB0aXRsZTI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRUaXRsZTModGl0bGUzKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZTMgPSB0aXRsZTM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRNYXJnaW5zKG1hcmdpbnMpIHtcclxuICAgICAgICB0aGlzLm1hcmdpbnMgPSBtYXJnaW5zO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0Qm9keShib2R5KSB7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIGRhdGEpIHtcclxuICAgICAgICBsZXQgY3NzX3BhaXJzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubWFwKChrZXkpID0+IGtleSArICc6ICcgKyBkYXRhW2tleV0gKyAnOyAnKVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RvciArIFwiIHsgXCIgKyBjc3NfcGFpcnMuam9pbihcIiBcIikgKyBcIiB9XCI7XHJcbiAgICB9XHJcbiAgICByZW5kZXJTdHlsZXMoKSB7XHJcbiAgICAgICAgbGV0IGNzc19ibG9ja3MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLnN0eWxlcykubWFwKChcclxuICAgICAgICAgICAgKHNlbGVjdG9yKSA9PiB0aGlzLnJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSlcclxuICAgICAgICApLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiBjc3NfYmxvY2tzLmpvaW4oXCJcXG5cIik7XHJcbiAgICB9XHJcbiAgICByZW5kZXJIVE1MKCkge1xyXG4gICAgICAgIGxldCBjc3MgPSB0aGlzLnJlbmRlclN0eWxlcygpO1xyXG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLmhlYWRlciA/ICc8cCBjbGFzcz1cImhlYWRlclwiPicgKyB0aGlzLmhlYWRlciArICc8L3A+JyA6IFwiXCI7XHJcbiAgICAgICAgbGV0IHRpdGxlMSA9IHRoaXMudGl0bGUxID8gJzxoMT4nICsgdGhpcy50aXRsZTEgKyAnPC9oMT4nIDogXCJcIjtcclxuICAgICAgICBsZXQgdGl0bGUyID0gdGhpcy50aXRsZTIgPyAnPGgyPicgKyB0aGlzLnRpdGxlMiArICc8L2gyPicgOiBcIlwiO1xyXG4gICAgICAgIGxldCB0aXRsZTMgPSB0aGlzLnRpdGxlMyA/ICc8aDM+JyArIHRoaXMudGl0bGUzICsgJzwvaDM+JyA6IFwiXCI7XHJcbiAgICAgICAgbGV0IHNwYWNlciA9IChoZWFkZXIgfHwgdGl0bGUxIHx8IHRpdGxlMiB8fCB0aXRsZTMpID8gJzxwIGNsYXNzPVwic3BhY2VyXCI+Jm5ic3A7PC9wPicgOiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBcIjwhRE9DVFlQRSBodG1sPlxcblwiICtcclxuICAgICAgICAgICAgXCI8aHRtbD48aGVhZD5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxzdHlsZT5cXG5cIiArIGNzcyArIFwiXFxuPC9zdHlsZT5cXG5cIiArXHJcbiAgICAgICAgICAgIFwiPC9oZWFkPjxib2R5PlxcblwiICtcclxuICAgICAgICAgICAgICAgIGhlYWRlciArXHJcbiAgICAgICAgICAgICAgICB0aXRsZTEgK1xyXG4gICAgICAgICAgICAgICAgdGl0bGUyICtcclxuICAgICAgICAgICAgICAgIHRpdGxlMyArXHJcbiAgICAgICAgICAgICAgICBzcGFjZXIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5ICtcclxuICAgICAgICAgICAgXCI8L2JvZHk+PC9odG1sPlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlckhUTUwoKTtcclxuICAgICAgICBsZXQgbWFyZ2lucyA9IHRoaXMubWFyZ2lucyB8fCAodGhpcy5vcmllbnRhdGlvbiA9PT0gXCJwb3J0cmFpdFwiID8gWzEwLCAxNSwgMTAsIDE1XSA6IFs3LCAxMCwgNywgMTBdKTtcclxuICAgICAgICBsZXQgY29udmVydGVkID0gaHRtbERvY3guYXNCbG9iKGh0bWwsIHtcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IHRoaXMub3JpZW50YXRpb24sXHJcbiAgICAgICAgICAgIG1hcmdpbnM6IHtcclxuICAgICAgICAgICAgICAgIHRvcDogICAgTWF0aC5mbG9vcihtYXJnaW5zWzBdICogNTYuNjU5KS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICBNYXRoLmZsb29yKG1hcmdpbnNbMV0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBib3R0b206IE1hdGguZmxvb3IobWFyZ2luc1syXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIGxlZnQ6ICAgTWF0aC5mbG9vcihtYXJnaW5zWzNdICogNTYuNjU5KS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2F2ZUFzKGNvbnZlcnRlZCwgdGhpcy5maWxlbmFtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgdmFyIERvY3ggPSAoZm4pID0+IG5ldyBEb2N4SW1wbChmbik7XHJcbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xyXG5cclxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xyXG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xyXG4gICAgICAgIGxldCB4ID0gbiAlIDEwMDtcclxuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogKHZlcnNpb24sIGRhdGUpID0+IDxkaXYgY2xhc3NOYW1lPVwiYWJvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48Yj5Sb2NrSnVkZ2Uge3ZlcnNpb259PC9iPiAo0L7RgiB7ZGF0ZX0pICZtZGFzaDsg0YHQuNGB0YLQtdC80LAg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0L/QviDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQvtC80YMg0YDQvtC6LdC9LdGA0L7Qu9C70YMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCQ0LLRgtC+0YDRgdC60LjQtSDQv9GA0LDQstCwINC90LAg0YHQuNGB0YLQtdC80YMgUm9ja0p1ZGdlINC/0L7Qu9C90L7RgdGC0YzRjiDQv9GA0LjQvdCw0LTQu9C10LbQsNGCINGA0LDQt9GA0LDQsdC+0YLRh9C40LrRgyDQkNGA0YLQtdC80YMg0JrQsNC30LDQutC+0LLRgy4g0KHQvtCw0LLRgtC+0YAg0YHQuNGB0YLQtdC80Ysg0JDQvdGC0L7QvSDQkNC80LXQu9C40L0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCh0LjRgdGC0LXQvNCwINGA0LDRgdC/0YDQvtGB0YLRgNCw0L3Rj9C10YLRgdGPINC/0L4g0LvQuNGG0LXQvdC30LjQuCBMaW51bSBkLm8ubyAoaW5mb0BsaW51bS5ocikuINCU0LvRjyDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LAgUm9ja0p1ZGdlINC90LXQvtCx0YXQvtC00LjQvNC+INC4INC00L7RgdGC0LDRgtC+0YfQvdC+INC40LzQtdGC0Ywg0L/RgNCw0LLQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyBMaW51bSBMUFMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCe0YTQuNGG0LjQsNC70YzQvdGL0Lkg0YHQsNC50YI6IDxhIGhyZWY9XCJodHRwczovL3JvY2tqdWRnZS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+aHR0cHM6Ly9yb2NranVkZ2UuY29tLzwvYT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wcm9ncmFtc19hZnRlcl9jcmVhdGlvblwiOiBcItCf0YDQvtCz0YDQsNC80LzRiyDQvNC+0LbQvdC+INCx0YPQtNC10YIg0LTQvtCx0LDQstC40YLRjCDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRgdC+0YXRgNCw0L3QtdC90LjRjyDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC60L7RgNGA0LXQutGC0L3QviDQvdCw0YHRgtGA0L7QtdC90LAg0Lgg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LAuXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9ub3RfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0L3QtdC00L7RgdGC0YPQv9C90LAg0L3QsCDRjdGC0L7QvCDQutC+0LzQv9GM0YLQtdGA0LUuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbmFsaXplZFwiOiBcItCe0YLRgdGD0YLRgdGC0LLRg9GO0YIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV93YXJuaW5nXCI6IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz7QpNC40L3QsNC70LjQt9Cw0YbQuNGPINC00L7Qu9C20L3QsCDQvtGC0LzQtdC90Y/RgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0LjRgdC60LvRjtGH0LjRgtC10LvRjNC90YvRhSDRgdC70YPRh9Cw0Y/RhSE8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JXRgdC70Lgg0LbQtSDRjdGC0L4g0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0L3QtdC+0LHRhdC+0LTQuNC80L4sINC+0LHRgNCw0YLQuNGC0LUg0LLQvdC40LzQsNC90LjQtSwg0YfRgtC+INC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YHQv9C40YHQvtC6INGD0YfQsNGB0YLQvdC40LrQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAg0YHQu9C10LTRg9GO0YnQtdCz0L4g0YLRg9GA0LAg0LHRg9C00LXRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQv9C10YDQtdGB0L7Qt9C00LDQvS4g0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YPRh9Cw0YHRgtC90LjQutC+0LIsINC/0YDQvtGI0LXQtNGI0LjRhSDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC/0L7RgdC70LUg0L/QtdGA0LLQvtC5XHJcbiAgICAgICAgICAgICAgICAgICAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDQuCDQvdC1INC/0YDQvtGI0LXQtNGI0LjRhSDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDQsdGD0LTRg9GCINCx0LXQt9Cy0L7Qt9Cy0YDQsNGC0L3QviDRg9GC0LXRgNGP0L3RiyE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0Jgg0L3QtSDQt9Cw0LHRg9C00YzRgtC1INC30LDQvdC+0LLQviDQvdCw0L/QtdGH0LDRgtCw0YLRjCDQstGB0LUg0YLQsdC70LjRhtGLLjwvcD48L2Rpdj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGB0LsuwqDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVcIjogXCLQntGH0LXRgNC10LTRjCDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jbHViXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0LrQu9GD0LE/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jb21wZXRpdGlvblwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQviDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LU/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9kaXNjaXBsaW5lXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC00LjRgdGG0LjQv9C70LjQvdGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfanVkZ2VcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGB0YPQtNGM0Y4/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQv9GA0L7Qs9GA0LDQvNC80YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDRgdGC0YDQsNC90LjRhtGDINC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjiDRgtGD0YDQsD8g0JLQstC10LTQuNGC0LUgwqt1bmZpbmFsaXplwrssINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogXCLQniDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xpZW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90L3Ri9C80Lgg0YPRgdGC0YDQvtC50YHRgtCy0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9tYW5hZ2VtZW50XCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC00LjRgdGG0LjQv9C70LjQvdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9jb21wZXRpdGlvblwiOiBcItCY0LzQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbWVudVwiOiBcItCh0LXRgNCy0LjRgdC90L7QtSDQvNC10L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fZGF0ZVwiOiBcItCU0LDRgtCwINC/0YDQvtCy0LXQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmlsZXNfc2VsZWN0ZWRcIjogXCLQktGL0LHQtdGA0LjRgtC1INGE0LDQudC7Li4uXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3Nwb3J0c21lblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L/QvtGA0YLRgdC80LXQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuX3BhcnRpY2lwYW50c1wiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5cIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogbiA9PiBcItCY0YLQvtCz0L4gXCIgKyBuICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvdXItYWRtaW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcclxuICAgICAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhcGlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcclxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLIFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9lcnJvclwiOiBcItCf0L7RhdC+0LbQtSwg0LjQvNC10Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImVycm9yX2hlYWRlclwiOiBcItCe0YjQuNCx0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWNjZXNzXCI6IFwi0J7Qv9C10YDQsNGG0LjRjyDRg9GB0L/QtdGI0L3QviDQt9Cw0LLQtdGA0YjQtdC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9uXCI6IChuKSA9PiBcItCX0LDRhdC+0LQg4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IFwi0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIChuX3NwID4gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQn9Cw0YDQsCDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2luZ1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQn9C10YDQtdGB0L7Qt9C00LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQn9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfdG91clwiOiBcItCd0LDRh9Cw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0J7RgdGC0LDQvdC+0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQv9GA0L7Qs9GA0LDQvNC80YMg0LTQu9GPINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsdCw0LfQvtCy0YvRhSDQvtGG0LXQvdC+0Log0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9faWR4XCI6IFwi4oSWINGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXdfc2NvcmVcIjogXCLQmtC+0YDRgC5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICBcIm9sZF9zY29yZVwiOiBcItCR0LDQt9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCSXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW9kZWxzXCI6IHtcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQu9GD0LHQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3RpdmVcIjogXCLQkNC60YLQuNCy0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwi0JTQsNGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LTQu9GPINC/0YDQvtGC0L7QutC+0LvQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdGl0bGVcIjogXCLQl9Cw0LPQvtC70L7QstC+0LpcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3ZhbHVlXCI6IFwi0JfQvdCw0YfQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IFwi0JrQsNGC0LXQs9C+0YDQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvS4gSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCkLiDQmC4g0J4uXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcItCg0L7Qu9GMINCyINGB0YPQtNC10LnRgdGC0LLQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlX2Rlc2NyaXB0aW9uXCI6IFwi0JTQvtC70LbQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25zXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9uYW1lXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9jaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9uYW1lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcItCY0LzRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJcIjogXCLQn9C+0LtcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX2ZcIjogXCLQllwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfbVwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmVyYWxfaW5mb1wiOiBcItCe0YHQvdC+0LLQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60L7QvNCw0L3QtNGLINGE0L7RgNC80LXQudGI0L1cIixcclxuICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwi0KTQsNC80LjQu9C40Y9cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9ncmFtc1wiOiBcItCf0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfZmluYWxpemVkXCI6IFwi0JTQsNC90L3Ri9C1INGA0LXQt9GD0LvRjNGC0LDRgtGLINC90LUg0Y/QstC70Y/RjtGC0YHRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90YvQvNC4LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwcmludFwiOiBcItCf0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGVfdmlld1wiOiBcItCj0L/RgNC+0YnQtdC90L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2Vfdmlld1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzdGFydF9wYWdlXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2NvbXBldGl0aW9uXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUg0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3JvbGVcIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0LLQvtGOINGA0L7Qu9GMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19jb21wZXRpdGlvbnNcIjogXCLQndC10YIg0LDQutGC0LjQstC90YvRhSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRfbGlua1wiOiAobGluaykgPT4gPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAg0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuCDQvdCw0YXQvtC00LjRgtGB0Y8g0L/QviDQsNC00YDQtdGB0YMmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgbGluayB9PnsgbGluayB9PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkbWluaXN0cmF0b3JcIjogXCLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5cIjogXCLQrdC60YDQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiBcItCe0L/QtdGA0LDRgtC+0YAg0Y3QutGA0LDQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfc3RvcHdhdGNoXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQn9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gXCJjbGllbnRzL3ByZXNlbnRlci9tYWluXCI7XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFByZXNlbnRlciB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXHJcbiAgICB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXHJcbik7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNfY250ID0gMDtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcclxuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XHJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF91cGRhdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QuYmluZCh0aGlzKSwgNTAwKTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBpZiAoZGF0YVtcImNsaWVudF9pZFwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xpZW50X2lkID0gZGF0YVtcImNsaWVudF9pZFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXNnX3R5cGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICBsZXQgbXNnX2RhdGEgPSBkYXRhWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAobXNnX3R5cGUgPT09IFwiZm9yY2VfcmVmcmVzaFwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fSkuZm9yRWFjaCgoa2V5KSA9PiBsaXN0ZW5lcnNba2V5XShtc2dfZGF0YSkpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEubW9kZWxfdXBkYXRlcy5mb3JFYWNoKChtb2RlbF9pbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHN0b3JhZ2UudXBkYXRlTW9kZWwobW9kZWxfaW5mby5tb2RlbCwgbW9kZWxfaW5mby5pZCwgbW9kZWxfaW5mby5kYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRhdGFfY2hhbmdlZCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbXCJkYl91cGRhdGVcIl0gfHwge307XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcklkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc19jbnQrKztcclxuICAgIH1cclxuICAgIGFkZExpc3RlbmVyKG1zZ190eXBlcywgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldExpc3RlbmVySWQoKTtcclxuICAgICAgICBtc2dfdHlwZXMuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24obXNnX3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXVtpZF0gPSBjYWxsYmFjaztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyX2lkKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1trZXldW2xpc3RlbmVyX2lkXTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIG1lc3NhZ2VfZGlzcGF0Y2hlciA9IG5ldyBNZXNzYWdlRGlzcGF0Y2hlcigpO1xyXG4iLCJjbGFzcyBSZWYge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSwgaWQpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubW9kZWxfbmFtZSkuYnlfaWQodGhpcy5pZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkLCBtb2RlbF9zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX19zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzID0ge307XHJcbiAgICAgICAgdGhpcy5fX21vZGVsX3N0b3JhZ2UgPSBtb2RlbF9zdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkQmFja1JlZihrZXksIHJlZikge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHJlZjtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkYXRhLCBjcmVhdGU9dHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIiB8fCBpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUgJiYgdHlwZW9mIHRoaXNbaWR4LnNsaWNlKDEpXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IFtdXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCB0aGlzLl9fbW9kZWxfc3RvcmFnZS5tb2RlbF9uYW1lLCB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZl9rZXkgPSBkYXRhW2lkeF0uYmFja19yZWY7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2lkeF0uY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihuZXN0ZWRfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEuZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZi5nZXQoKS5hZGRCYWNrUmVmKGJhY2tfcmVmX2tleSwgYmFja19yZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHJlZik7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCIqXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkX2RhdGEgPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpZHhdID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1tpZHhdID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNlcmlhbGl6ZShzY2hlbWEpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge31cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fX2tleV90eXBlcykgaWYgKHRoaXMuX19rZXlfdHlwZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX19rZXlfdHlwZXNba2V5XSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5tYXAoZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiXlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQuaWQgPSB0aGlzLmlkXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWxzU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGQoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxzW2lkXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0gPSBuZXcgTW9kZWwodGhpcy5zdG9yYWdlLCBpZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbHNbaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYnlfaWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaWRdO1xyXG4gICAgfVxyXG4gICAgYWxsKCkge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tb2RlbHMpO1xyXG4gICAgICAgIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2tleV07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZG9tYWlucyA9IHt9XHJcbiAgICB9XHJcbiAgICBnZXREb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvbWFpbnNbZG9tYWluXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRvbWFpbnNbZG9tYWluXSA9IG5ldyBTdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGRlbERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBnZXQobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID0gbmV3IE1vZGVsc1N0b3JhZ2UodGhpcywgbW9kZWxfbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgZGVsKG1vZGVsX25hbWUpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX3R5cGVdKSB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmRvbWFpbnMpLmZvckVhY2goKGtleSkgPT5cclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5kb21haW5zW2tleV0udXBkYXRlTW9kZWwoLi4uYXJndW1lbnRzKSB8fCBkYXRhX2NoYW5nZWQpO1xyXG4gICAgICAgIC8vIHJldHVybiBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcclxuIiwiZXhwb3J0IGNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBzdHlsZT17eyBcImhlaWdodFwiOiBcIjEwMCVcIiwgXCJ3aWR0aFwiOiBcIjEwMCVcIiB9fT48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIiB9fT5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9pbWcvYWpheC1sb2FkZXIuZ2lmXCIgLz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcclxuICAgIGxldCB0aXRsZSA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1swXSA6IF8oXCJnbG9iYWwubWVzc2FnZXMuZXJyb3JfaGVhZGVyXCIpO1xyXG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XHJcbiAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XHJcbiAgICByZXR1cm4gc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXHJcbiAgICAgICAgY2xvc2VPbkNvbmZpcm06IGNsb3NlX29uX2NvbmZpcm0sXHJcbiAgICB9LCBhY3Rpb24pO1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBQcmludGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICB0aXRsZTE6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIHRpdGxlMjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgdGl0bGUzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZmV0Y2hQcmludGFibGVEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5LmlubmVySFRNTDtcclxuICAgIH1cclxuICAgIHJlbmRlckhlYWRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5oZWFkZXIgPyA8ZGl2IGNsYXNzTmFtZT1cInAtaGVhZGVyXCI+eyB0aGlzLnByb3BzLmhlYWRlciB9PC9kaXY+IDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbmRlclRpdGxlMSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTEgPyA8aDE+eyB0aGlzLnByb3BzLnRpdGxlMSB9PC9oMT4gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyVGl0bGUyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMiA/IDxoMj57IHRoaXMucHJvcHMudGl0bGUyIH08L2gyPiA6IG51bGw7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUaXRsZTMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUzID8gPGgzPnsgdGhpcy5wcm9wcy50aXRsZTMgfTwvaDM+IDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC1jb250ZW50XCJcclxuICAgICAgICAgICAgICAgIHJlZj17IGUgPT4gdGhpcy5fYm9keSA9IGUgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYm9keSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcmludGFibGVcIj5cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMigpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMygpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoT3JDbGljayhoYW5kbGVyKSB7XHJcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBmLFxyXG4gICAgICAgIG9uQ2xpY2s6IGYsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoRW5kT3JDbGljayhoYW5kbGVyLCBwcmV2ZW50X2RlZmF1bHQpIHtcclxuICAgIGxldCBfaGFuZGxlciA9ICgpID0+IHt9O1xyXG4gICAgbGV0IGRpc3RhbmNlID0gMDtcclxuICAgIGxldCBsYXRlc3RfcG9zID0gWzAsIDBdO1xyXG4gICAgbGV0IGZpcmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBfaGFuZGxlcigpO1xyXG4gICAgfVxyXG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XHJcbiAgICAgICAgX2hhbmRsZXIgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xyXG4gICAgICAgIGxldCBzcXIgPSAoeCkgPT4geCAqIHg7XHJcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xyXG4gICAgICAgIGxhdGVzdF9wb3MgPSBjdXJyZW50X3BvcztcclxuICAgICAgICBpZiAoZGlzdGFuY2UgPiAyMCkge1xyXG4gICAgICAgICAgICBkaXNjYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgIGRpc3RhbmNlID0gMDtcclxuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgIG9uVG91Y2hFbmQ6IGZpcmUsXHJcbiAgICAgICAgb25Ub3VjaE1vdmU6IG1vdmUsXHJcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVyLFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvbmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICBkb25lVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgc2xpZGVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBvbkFjdGl2YXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5waW4gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNGcmVlKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS50b3VjaCAmJiAhdGhpcy5wcm9wcy5kb25lICYmICF0aGlzLnN0YXRlLmZpbmlzaGVkO1xyXG4gICAgfVxyXG4gICAgZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5taW4oTWF0aC5tYXgoMTAwIC0gdGhpcy5zdGF0ZS5wb3NpdGlvbiwgMCksIDEwMCk7XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAvIDEwMCkudG9GaXhlZCgzKTtcclxuICAgIH1cclxuICAgIGdldEVsZW1lbnRPZmZzZXQoZWxlbWVudCkge1xyXG4gICAgICAgIGxldCByZXMgPSAwO1xyXG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJlcyArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICAgIGdldFRvdWNoKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XHJcbiAgICB9XHJcbiAgICBnZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2xpZGVyUG9zKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0VG91Y2goZXZlbnQpIC0gdGhpcy5waW47XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIDIwMCk7XHJcbiAgICB9XHJcbiAgICBvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBvc2lzaW9uOiAyMDAsXHJcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcclxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wb3NpdGlvbiA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzbGlkZXIgbm9zZWxlY3RcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5uZXJcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIil9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiAodGhpcy5wcm9wcy5kb25lIHx8IHRoaXMuc3RhdGUuZmluaXNoZWQpID8gXCIyMDBweFwiIDogdGhpcy5zdGF0ZS5wb3NpdGlvbiArIFwicHhcIiB9fVxyXG4gICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKSB9XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKSB9XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcykgfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMub25DbGljay5iaW5kKHRoaXMpIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAg4oaSXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVxyXG4gICAgICAgICAgICAgICAgPyA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYigxMDAsMTAwLDEwMClcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiZG9uZS10ZXh0XCIgfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lVGV4dCB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA6IDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiYSgxMDAsMTAwLDEwMCxcIiArIHRoaXMuZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpICsgXCIpXCIgfX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInNsaWRlLXRleHRcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zbGlkZVRleHQgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0U2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgY2hvaWNlczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByb3dfc2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRCdXR0b25zQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvd19zaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIG9uQ2xpY2sobikge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShuKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jaG9pY2VzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGVsWzBdO1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IGVsWzFdO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlX2NsYXNzX25hbWUgPSAodGhpcy5wcm9wcy5hY3RpdmUgPT09IGtleSkgPyBcIiBhY3RpdmVcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGtleSB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25DbGljay5iaW5kKHRoaXMsIGtleSkpfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBzY29yZS1idG5cIiArIGFjdGl2ZV9jbGFzc19uYW1lIH1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7dGV4dH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIiAmJiAoaWR4ICsgMSkgJSB0aGlzLnByb3BzLnJvd19zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCg8YnIga2V5PXsgXCJiclwiICsgaWR4IH0gLz4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbGF5b3V0X2NsYXNzID0gKHRoaXMucHJvcHMuc3R5bGUgIT09IFwidHdvLWxpbmVzXCIpID8gXCJzZWxlY3Rvci1sYXlvdXRcIiA6IFwic2VsZWN0b3ItbGF5b3V0LTJyb3dzXCI7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkX2NsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmUgPT09IG51bGwgPyBcIlwiIDogXCIgc2VsZWN0ZWRcIlxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJzY29yaW5nLWxheW91dCBcIiArIGxheW91dF9jbGFzcyArIHNlbGVjdGVkX2NsYXNzICsgXCIgbi1cIiArIHRoaXMuZ2V0QnV0dG9uc0NvdW50KCkudG9TdHJpbmcoKSB9PnsgcmVzdWx0IH08L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IG1pbjsgaWR4IDw9IG1heDsgKytpZHgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCwgaWR4LnRvU3RyaW5nKCldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldFBvaW50NVNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gTWF0aC5yb3VuZCgyICogbWluKTsgaWR4IDw9IE1hdGgucm91bmQoMiAqIG1heCk7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHggLyAyLCAoaWR4ICUgMikgPyAoaWR4IC8gMikudG9GaXhlZCgxKSA6IE1hdGguZmxvb3IoaWR4IC8gMikudG9TdHJpbmcoKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cclxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbk1pbnVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0xfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblBsdXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICtcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VuZERlbHRhczogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25NaW51cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMC41fSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAwLjUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUGx1cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAwLjV9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDAuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICtcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBzdG9wd2F0Y2hlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3BXYXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yZV9pZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSB8fCB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxyXG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlyZWN0LW11dGF0aW9uLXN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcclxuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSA9IHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcbiAgICBub3coKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbiAgICB0b2dnbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPyB0aGlzLnN0b3AoKSA6IHRoaXMuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIHN0YXJ0X2F0OiB0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS52YWx1ZSxcclxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxyXG4gICAgICAgICAgICA/ICh0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS5zdGFydF9hdClcclxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGljaygpIHtcclxuICAgICAgICB2YXIgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZSgpO1xyXG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYWQobnVtLCBzaXplKSB7XHJcbiAgICAgICAgdmFyIHMgPSBcIjAwMDBcIiArIG51bS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBzLnN1YnN0cihzLmxlbmd0aCAtIHNpemUpO1xyXG4gICAgfVxyXG4gICAgZ2V0U3RyVmFsdWUoKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWUoKTtcclxuICAgICAgICB2YXIgbSA9IDAsIHMgPSAwO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgICAgICBtID0gTWF0aC5mbG9vcih2YWwgLyAoNjAgKiAxMDAwKSk7XHJcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcclxuICAgICAgICBzID0gTWF0aC5mbG9vcih2YWwgLyAxMDAwKTtcclxuICAgICAgICByZXR1cm4gbS50b1N0cmluZygpICsgJzonICsgdGhpcy5wYWQocywgMik7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXNldCBpZ25vcmUtcmVhZG9ubHlcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0LmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnJlc2V0X3N0b3B3YXRjaFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gYnRuLXRvZ2dsZSBpZ25vcmUtcmVhZG9ubHlcIiArICh0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlID8gXyhcInRhYmxldC5idXR0b25zLnN0b3Bfc3RvcHdhdGNoXCIpIDogXyhcInRhYmxldC5idXR0b25zLnN0YXJ0X3N0b3B3YXRjaFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdHJWYWx1ZSgpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIl19
