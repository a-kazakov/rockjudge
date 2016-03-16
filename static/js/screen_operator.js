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

},{"./rosfarr/discipline_results":2,"common/docx":5,"i10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12,"ui/components":13,"ui/printable":15}],2:[function(require,module,exports){
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

},{"i10n/loader":7,"ui/tablet_components":16}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Screen = exports.ScreenManifest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenManifest = exports.ScreenManifest = function () {
    function ScreenManifest(raw_manifest) {
        var _this = this;

        _classCallCheck(this, ScreenManifest);

        this.raw_data = raw_manifest;
        this.idx_by_id = {};
        this.raw_data.screens.forEach(function (item, idx) {
            return _this.idx_by_id[item.id] = idx;
        });
    }

    ScreenManifest.prototype.getScreenDataById = function getScreenDataById(id) {
        var is_default = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        var result = this.raw_data.screens[this.idx_by_id[id]];
        if (!result) {
            if (is_default) {
                return this.raw_data.screens[0];
            }
            return this.getDefaultScreenData();
        }
        return result;
    };

    ScreenManifest.prototype.getDefaultScreenData = function getDefaultScreenData() {
        return this.getScreenDataById(this.raw_data["default"], true);
    };

    return ScreenManifest;
}();

var Screen = exports.Screen = function (_React$Component) {
    _inherits(Screen, _React$Component);

    _createClass(Screen, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition_id: React.PropTypes.number.isRequired,
                manifest: React.PropTypes.object.isRequired
            };
        }
    }]);

    function Screen(props) {
        _classCallCheck(this, Screen);

        var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this2.manifest = new ScreenManifest(_this2.props.manifest);
        _this2.state = {
            current_screen: _this2.manifest.getDefaultScreenData(),
            next_screen: null
        };
        _this2.loadData();
        _message_dispatcher.message_dispatcher.addListener("db_update", _this2.reloadFromStorage.bind(_this2));
        _message_dispatcher.message_dispatcher.addListener("reload_data", _this2.loadData.bind(_this2));
        return _this2;
    }

    Screen.prototype.loadData = function loadData() {
        (0, _api.Api)("competition.get", { competition_id: this.props.competition_id, children: {} }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    Screen.prototype.reloadFromStorage = function reloadFromStorage() {
        var new_data = _storage.storage.get("Competition").by_id(this.props.competition_id).serialize({}).screen_data;
        if (new_data.screen_id !== this.state.current_screen.id && new_data.screen_id) {
            this.changeScreen(new_data.screen_id);
        }
    };

    Screen.prototype.getUrlByScreenData = function getUrlByScreenData(data) {
        return "/media/screen/" + data.template + "#" + this.props.competition_id;
    };

    Screen.prototype.changeScreen = function changeScreen(new_id) {
        this.setState({
            next_screen: this.manifest.getScreenDataById(new_id)
        });
    };

    Screen.prototype.switchFrames = function switchFrames() {
        this.setState({
            current_screen: this.state.next_screen,
            next_screen: null
        });
    };

    Screen.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "outer" },
            React.createElement("iframe", { src: this.getUrlByScreenData(this.state.current_screen),
                key: this.getUrlByScreenData(this.state.current_screen) }),
            this.state.next_screen ? React.createElement("iframe", { src: this.getUrlByScreenData(this.state.next_screen),
                key: this.getUrlByScreenData(this.state.next_screen),
                onLoad: this.switchFrames.bind(this) }) : null
        );
    };

    return Screen;
}(React.Component);

},{"i10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.ScreenOperator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _tablet_components = require("ui/tablet_components");

var _tools = require("common/tools");

var _main = require("clients/screen/main");

var _discipline_results = require("admin/judging/discipline_results");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScreenOperatorTourSelector = function (_React$Component) {
    _inherits(ScreenOperatorTourSelector, _React$Component);

    function ScreenOperatorTourSelector() {
        _classCallCheck(this, ScreenOperatorTourSelector);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    ScreenOperatorTourSelector.prototype.expandSelect = function expandSelect(original_event) {
        original_event.preventDefault();
        original_event.stopPropagation();
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        this._select.dispatchEvent(e);
    };

    ScreenOperatorTourSelector.prototype.render = function render() {
        var _this2 = this;

        var options = [];
        this.props.competition.disciplines.forEach(function (discipline) {
            return discipline.tours.forEach(function (tour) {
                return options.push(React.createElement(
                    "option",
                    { value: tour.id, key: tour.id },
                    discipline.name,
                    " — ",
                    tour.name + (tour.finalized ? " [over]" : "")
                ));
            });
        });
        return React.createElement(
            "select",
            { value: this.props.value,
                className: "form-control",
                ref: function ref(c) {
                    return _this2._select = c;
                },
                onChange: function onChange(e) {
                    return _this2.props.onChange(e.target.value || null);
                },
                onTouchStart: this.expandSelect.bind(this) },
            React.createElement(
                "option",
                { value: "" },
                "----------"
            ),
            options
        );
    };

    _createClass(ScreenOperatorTourSelector, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition: React.PropTypes.object.isRequired,
                value: React.PropTypes.string,
                onChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorTourSelector;
}(React.Component);

var ScreenOperatorDisciplinePlaceSelector = function (_React$Component2) {
    _inherits(ScreenOperatorDisciplinePlaceSelector, _React$Component2);

    function ScreenOperatorDisciplinePlaceSelector() {
        _classCallCheck(this, ScreenOperatorDisciplinePlaceSelector);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    ScreenOperatorDisciplinePlaceSelector.prototype.render = function render() {
        var _this4 = this;

        var options = [];
        this.props.competition.disciplines.forEach(function (discipline) {
            return options.push(React.createElement(
                "option",
                { value: discipline.id, key: discipline.id },
                discipline.name
            ));
        });
        return React.createElement(
            "select",
            { value: this.props.value,
                className: "form-control",
                onChange: function onChange(e) {
                    return _this4.props.onChange(e.target.value || null);
                } },
            React.createElement(
                "option",
                { value: "" },
                "----------"
            ),
            options
        );
    };

    _createClass(ScreenOperatorDisciplinePlaceSelector, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition: React.PropTypes.object.isRequired,
                value: React.PropTypes.string,
                onChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorDisciplinePlaceSelector;
}(React.Component);

var ScreenOperatorHeatSelectorRow = function (_React$Component3) {
    _inherits(ScreenOperatorHeatSelectorRow, _React$Component3);

    function ScreenOperatorHeatSelectorRow() {
        _classCallCheck(this, ScreenOperatorHeatSelectorRow);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    ScreenOperatorHeatSelectorRow.prototype.render = function render() {
        return React.createElement(
            "table",
            _extends({ className: "heat" + (this.props.selected ? " selected" : "")
            }, (0, _tablet_components.onTouchEndOrClick)(this.props.onClick)),
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { className: "heat-number" },
                        React.createElement(
                            "div",
                            null,
                            this.props.heat
                        ),
                        React.createElement(
                            "div",
                            { className: "heat-label" },
                            (0, _loader._)("screen_operator.labels.heat")
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "participants" },
                        this.props.runs.map(function (run) {
                            return React.createElement(
                                "div",
                                { className: "participant", key: run.id },
                                React.createElement(
                                    "div",
                                    { className: "number" },
                                    run.participant.number
                                ),
                                React.createElement(
                                    "div",
                                    { className: "name" },
                                    run.participant.name
                                )
                            );
                        })
                    )
                )
            )
        );
    };

    _createClass(ScreenOperatorHeatSelectorRow, null, [{
        key: "propTypes",
        get: function get() {
            return {
                selected: React.PropTypes.bool.isRequired,
                heat: React.PropTypes.number.isRequired,
                runs: React.PropTypes.array.isRequired,
                onClick: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorHeatSelectorRow;
}(React.Component);

var ScreenOperatorHeatSelector = function (_React$Component4) {
    _inherits(ScreenOperatorHeatSelector, _React$Component4);

    _createClass(ScreenOperatorHeatSelector, null, [{
        key: "propTypes",
        get: function get() {
            return {
                tour_id: React.PropTypes.number,
                value: React.PropTypes.string,
                onHeatSelect: React.PropTypes.func.isRequired
            };
        }
    }]);

    function ScreenOperatorHeatSelector(props) {
        _classCallCheck(this, ScreenOperatorHeatSelector);

        var _this6 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

        _this6.state = {
            tour: null
        };
        return _this6;
    }

    ScreenOperatorHeatSelector.prototype.componentWillMount = function componentWillMount() {
        if (this.props.tour_id === null) {
            return;
        }
        this.storage = _storage.storage.getDomain("tour_" + this.props.tour_id);
        this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.loadData();
    };

    ScreenOperatorHeatSelector.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.props.tour_id === null) {
            return;
        }
        _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
        _storage.storage.delDomain("tour_" + this.props.tour_id);
    };

    ScreenOperatorHeatSelector.prototype.reloadFromStorage = function reloadFromStorage() {
        var SCHEMA = {
            runs: {
                participant: {}
            }
        };
        var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(SCHEMA);
        this.setState({ tour: serialized });
    };

    ScreenOperatorHeatSelector.prototype.loadData = function loadData() {
        (0, _api.Api)("tour.get", {
            tour_id: this.props.tour_id,
            children: {
                runs: {
                    participant: {}
                }
            }
        }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    ScreenOperatorHeatSelector.prototype.render = function render() {
        var _Math,
            _this7 = this;

        if (this.props.tour_id === null) {
            return null;
        }
        if (this.state.tour === null) {
            return React.createElement(_components.Loader, null);
        }
        var result = [];
        var max_heat = (_Math = Math).max.apply(_Math, this.state.tour.runs.map(function (run) {
            return run.heat;
        }));

        var _loop = function _loop(heat) {
            result.push(React.createElement(ScreenOperatorHeatSelectorRow, {
                key: heat,
                runs: _this7.state.tour.runs.filter(function (run) {
                    return run.heat === heat;
                }),
                heat: heat,
                selected: _this7.props.value === heat,
                onClick: function onClick() {
                    return _this7.props.onHeatSelect(heat);
                } }));
        };

        for (var heat = 1; heat <= max_heat; ++heat) {
            _loop(heat);
        }
        return React.createElement(
            "div",
            { className: "heat-selector" },
            React.createElement(
                "button",
                _extends({ className: "btn btn-sm btn-warning btn-reset-heat",
                    type: "button"
                }, (0, _tablet_components.onTouchEndOrClick)(function () {
                    return _this7.props.onHeatSelect(null);
                })),
                (0, _loader._)("screen_operator.buttons.reset_heat")
            ),
            result
        );
    };

    return ScreenOperatorHeatSelector;
}(React.Component);

var ScreenOperatorPlaceSelector = function (_React$Component5) {
    _inherits(ScreenOperatorPlaceSelector, _React$Component5);

    function ScreenOperatorPlaceSelector() {
        _classCallCheck(this, ScreenOperatorPlaceSelector);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    ScreenOperatorPlaceSelector.prototype.render = function render() {
        var _this9 = this;

        if (this.props.discipline_id === null) {
            return null;
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                _extends({ className: "btn btn-sm btn-warning btn-reset-place",
                    type: "button"
                }, (0, _tablet_components.onTouchEndOrClick)(function () {
                    return _this9.props.onChange(null);
                })),
                (0, _loader._)("screen_operator.buttons.reset_place")
            ),
            React.createElement(_discipline_results.DisciplineResults, {
                discipline_id: this.props.discipline_id,
                renderer: "screen_operator",
                onPlaceSelect: function onPlaceSelect(place) {
                    return _this9.props.onChange(place);
                },
                selectedPlace: this.props.value,
                key: this.props.discipline_id })
        );
    };

    _createClass(ScreenOperatorPlaceSelector, null, [{
        key: "propTypes",
        get: function get() {
            return {
                discipline_id: React.PropTypes.number,
                value: React.PropTypes.number,
                onChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorPlaceSelector;
}(React.Component);

var ScreenOperatorTourHeatControls = function (_React$Component6) {
    _inherits(ScreenOperatorTourHeatControls, _React$Component6);

    function ScreenOperatorTourHeatControls() {
        _classCallCheck(this, ScreenOperatorTourHeatControls);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    ScreenOperatorTourHeatControls.prototype.onTourChange = function onTourChange(new_value) {
        var new_state = (0, _tools.clone)(this.props.controls_state);
        new_state.tour_id = new_value;
        new_state.heat = null;
        this.props.onChange(new_state);
    };

    ScreenOperatorTourHeatControls.prototype.onHeatChange = function onHeatChange(new_value) {
        var new_state = (0, _tools.clone)(this.props.controls_state);
        new_state.heat = new_value;
        this.props.onChange(new_state);
    };

    ScreenOperatorTourHeatControls.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                (0, _loader._)("screen_operator.headers.tour")
            ),
            React.createElement(ScreenOperatorTourSelector, {
                competition: this.props.competition,
                value: this.props.controls_state.tour_id,
                onChange: this.onTourChange.bind(this) }),
            React.createElement(
                "h3",
                null,
                (0, _loader._)("screen_operator.headers.heat")
            ),
            React.createElement(ScreenOperatorHeatSelector, {
                key: this.props.controls_state.tour_id,
                tour_id: this.props.controls_state.tour_id,
                value: this.props.controls_state.heat,
                onHeatSelect: this.onHeatChange.bind(this) })
        );
    };

    _createClass(ScreenOperatorTourHeatControls, null, [{
        key: "propTypes",
        get: function get() {
            return {
                controls_state: React.PropTypes.object.isRequired,
                competition: React.PropTypes.object.isRequired,
                onChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorTourHeatControls;
}(React.Component);

var ScreenOperatorTourControls = function (_React$Component7) {
    _inherits(ScreenOperatorTourControls, _React$Component7);

    function ScreenOperatorTourControls() {
        _classCallCheck(this, ScreenOperatorTourControls);

        return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
    }

    ScreenOperatorTourControls.prototype.onTourChange = function onTourChange(new_value) {
        var new_state = (0, _tools.clone)(this.props.controls_state);
        new_state.tour_id = new_value;
        this.props.onChange(new_state);
    };

    ScreenOperatorTourControls.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                (0, _loader._)("screen_operator.headers.tour")
            ),
            React.createElement(ScreenOperatorTourSelector, {
                competition: this.props.competition,
                value: this.props.controls_state.tour_id,
                onChange: this.onTourChange.bind(this) })
        );
    };

    _createClass(ScreenOperatorTourControls, null, [{
        key: "propTypes",
        get: function get() {
            return {
                controls_state: React.PropTypes.object.isRequired,
                competition: React.PropTypes.object.isRequired,
                onChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorTourControls;
}(React.Component);

var ScreenOperatorDisciplinePlaceControls = function (_React$Component8) {
    _inherits(ScreenOperatorDisciplinePlaceControls, _React$Component8);

    function ScreenOperatorDisciplinePlaceControls() {
        _classCallCheck(this, ScreenOperatorDisciplinePlaceControls);

        return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
    }

    ScreenOperatorDisciplinePlaceControls.prototype.onDisciplineChange = function onDisciplineChange(new_value) {
        var new_state = (0, _tools.clone)(this.props.controls_state);
        new_state.discipline_id = new_value;
        new_state.place = null;
        this.props.onChange(new_state);
    };

    ScreenOperatorDisciplinePlaceControls.prototype.onPlaceChange = function onPlaceChange(new_value) {
        var new_state = (0, _tools.clone)(this.props.controls_state);
        new_state.place = new_value;
        this.props.onChange(new_state);
    };

    ScreenOperatorDisciplinePlaceControls.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                (0, _loader._)("screen_operator.headers.discipline")
            ),
            React.createElement(ScreenOperatorDisciplinePlaceSelector, {
                competition: this.props.competition,
                value: this.props.controls_state.discipline_id,
                onChange: this.onDisciplineChange.bind(this) }),
            React.createElement(
                "h3",
                null,
                (0, _loader._)("screen_operator.headers.places")
            ),
            React.createElement(ScreenOperatorPlaceSelector, {
                discipline_id: this.props.controls_state.discipline_id,
                value: this.props.controls_state.place,
                onChange: this.onPlaceChange.bind(this) })
        );
    };

    _createClass(ScreenOperatorDisciplinePlaceControls, null, [{
        key: "propTypes",
        get: function get() {
            return {
                controls_state: React.PropTypes.object.isRequired,
                competition: React.PropTypes.object.isRequired,
                onChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorDisciplinePlaceControls;
}(React.Component);

var ScreenOperator = exports.ScreenOperator = function (_React$Component9) {
    _inherits(ScreenOperator, _React$Component9);

    _createClass(ScreenOperator, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition_id: React.PropTypes.number.isRequired,
                manifest: React.PropTypes.object.isRequired
            };
        }
    }]);

    function ScreenOperator(props) {
        _classCallCheck(this, ScreenOperator);

        var _this13 = _possibleConstructorReturn(this, _React$Component9.call(this, props));

        _this13.manifest = new _main.ScreenManifest(_this13.props.manifest);
        _this13.state = {
            competition: null,
            pending_data: null
        };
        _this13.loadData();
        _message_dispatcher.message_dispatcher.addListener("db_update", _this13.reloadFromStorage.bind(_this13));
        _message_dispatcher.message_dispatcher.addListener("reload_data", _this13.loadData.bind(_this13));
        return _this13;
    }

    ScreenOperator.prototype.loadData = function loadData() {
        (0, _api.Api)("competition.get", { competition_id: this.props.competition_id, children: {
                disciplines: {
                    tours: {}
                }
            } }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    ScreenOperator.prototype.submitData = function submitData() {
        var _this14 = this;

        var data = this.state.pending_data || this.state.competition.screen_data;
        if (!this.validateControls(data)) {
            return;
        }
        (0, _api.Api)("competition.set", {
            competition_id: this.props.competition_id,
            data: { screen_data: this.state.pending_data }
        }).onSuccess(function () {
            return _this14.setState({
                pending_data: null
            });
        }).send();
    };

    ScreenOperator.prototype.resetData = function resetData() {
        this.setState({
            pending_data: null
        });
    };

    ScreenOperator.prototype.reloadFromStorage = function reloadFromStorage() {
        this.setState({
            competition: _storage.storage.get("Competition").by_id(this.props.competition_id).serialize({
                disciplines: {
                    tours: {}
                }
            })
        });
    };

    ScreenOperator.prototype.getDefaultControlsState = function getDefaultControlsState(controls_type) {
        switch (controls_type) {
            case "none":
                return {};
            case "tour-heat":
                return {
                    tour_id: null,
                    heat: 1
                };
            case "tour":
                return {
                    tour_id: null
                };
            case "discipline-place":
                return {
                    discipline_id: null,
                    place: null
                };
        }
    };

    ScreenOperator.prototype.updateData = function updateData(updater) {
        var data = this.state.pending_data ? (0, _tools.clone)(this.state.pending_data) : (0, _tools.clone)(this.state.competition.screen_data);
        data = updater(data);
        this.setState({
            pending_data: data
        });
    };

    ScreenOperator.prototype.switchScreen = function switchScreen(new_id) {
        var _this15 = this;

        this.updateData(function (data) {
            if (data.screen_id !== new_id) {
                var screen_data = _this15.manifest.getScreenDataById(new_id);
                var controls_type = screen_data.controls;
                data = {
                    screen_id: new_id,
                    controls_state: _this15.getDefaultControlsState(controls_type)
                };
            }
            return data;
        });
    };

    ScreenOperator.prototype.onControlsStateChange = function onControlsStateChange(new_value) {
        this.updateData(function (data) {
            data.controls_state = new_value;
            return data;
        });
    };

    ScreenOperator.prototype.validateControls = function validateControls(data) {
        var controls_type = this.manifest.getScreenDataById(data.screen_id).controls;
        switch (controls_type) {
            case "none":
                return true;
            case "tour":
            case "tour-heat":
                return data.controls_state.tour_id !== null;
            case "discipline-place":
                return data.controls_state.discipline_id !== null;
        }
    };

    ScreenOperator.prototype.renderContols = function renderContols(data) {
        var controls_type = this.manifest.getScreenDataById(data.screen_id).controls;
        switch (controls_type) {
            case "none":
                return null;
            case "tour-heat":
                return React.createElement(ScreenOperatorTourHeatControls, {
                    key: data.screen_id,
                    competition: this.state.competition,
                    controls_state: data.controls_state,
                    onChange: this.onControlsStateChange.bind(this) });
            case "tour":
                return React.createElement(ScreenOperatorTourControls, {
                    key: data.screen_id,
                    competition: this.state.competition,
                    controls_state: data.controls_state,
                    onChange: this.onControlsStateChange.bind(this) });
            case "discipline-place":
                return React.createElement(ScreenOperatorDisciplinePlaceControls, {
                    key: data.screen_id,
                    competition: this.state.competition,
                    controls_state: data.controls_state,
                    onChange: this.onControlsStateChange.bind(this) });
        }
    };

    ScreenOperator.prototype.render = function render() {
        var _this16 = this;

        if (this.state.competition === null) {
            return React.createElement(_components.Loader, null);
        }
        var data = this.state.pending_data || this.state.competition.screen_data;
        return React.createElement(
            "div",
            { className: "screen-operator" },
            React.createElement(
                "div",
                { className: "left-col" },
                this.manifest.raw_data.screens.map(function (screen_data) {
                    return React.createElement(
                        "div",
                        _extends({ className: "item" + (screen_data.id === data.screen_id ? " active" : ""),
                            key: screen_data.id
                        }, (0, _tablet_components.onTouchOrClick)(function () {
                            return _this16.switchScreen(screen_data.id);
                        })),
                        screen_data.name
                    );
                })
            ),
            React.createElement(
                "div",
                { className: "body" },
                React.createElement(
                    "div",
                    { className: "controls" },
                    this.renderContols(data)
                ),
                this.state.pending_data ? React.createElement(
                    "div",
                    { className: "buttons" },
                    React.createElement(
                        "button",
                        _extends({ type: "button",
                            className: "btn btn-danger"
                        }, (0, _tablet_components.onTouchOrClick)(this.resetData.bind(this))),
                        (0, _loader._)("global.buttons.discard")
                    ),
                    React.createElement(
                        "button",
                        _extends({ type: "button",
                            className: "btn btn-primary",
                            disabled: !this.validateControls(data)
                        }, (0, _tablet_components.onTouchOrClick)(this.submitData.bind(this))),
                        (0, _loader._)("global.buttons.submit")
                    )
                ) : null
            )
        );
    };

    return ScreenOperator;
}(React.Component);

},{"admin/judging/discipline_results":1,"clients/screen/main":3,"common/tools":6,"i10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12,"ui/components":13,"ui/tablet_components":16}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.clone = clone;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clone(obj) {
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}

var CmpChainImpl = function () {
    function CmpChainImpl() {
        _classCallCheck(this, CmpChainImpl);

        this.result = 0;
    }

    CmpChainImpl.prototype.cmp = function cmp(a, b) {
        if (this.result === 0) {
            if (a < b) {
                this.result = -1;
            } else if (a > b) {
                this.result = 1;
            }
        }
        return this;
    };

    CmpChainImpl.prototype.end = function end() {
        return this.result;
    };

    return CmpChainImpl;
}();

var CmpChain = exports.CmpChain = function CmpChain() {
    return new CmpChainImpl();
};

},{}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":8}],8:[function(require,module,exports){
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
                "discipline_judges": "Распределение судей по дисциплинам",
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
                "sportsmen_list": "Список спортсменов",
                "start_list": "Стартовый лист",
                "tour_heats": "Заходы участников",
                "tour_results": "Результаты тура",
                "unfinalize_tour": "Отмена финализации тура",
                "unpicked_tours": "Не включены в программу"
            },
            "labels": {
                "clubs": "Клубы",
                "competition_date": "Дата проведения",
                "competition_name": "Наименование соревнования",
                "discipline": "Дисциплина",
                "discipline_judges": "Распределение судей по дисциплинам",
                "disciplines": "Дисциплины",
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_clubs": "Включить данные о клубах",
                "include_discipline_judges": "Включить распределение судей по дисциплинам",
                "include_extended_info": "Включить расширенную информацию",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "include_judges": "Включить данные о судьях",
                "judges": "Судьи",
                "no_files_selected": "Выберите файл...",
                "participants": "Участники",
                "paste_acro": "Вставьте данные из калькулятора акробатики",
                "plan": "Программа турнира",
                "show_sportsmen_only": "Показывать только спортсменов",
                "show_summary": "Показывать только количество",
                "sub": "зап", // substitute
                "tours": "Туры"
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
                "n_participants": function n_participants(n) {
                    return n.toString() + " участник" + chooseEnding(n, "", "а", "ов");
                },
                "n_sportsmen": function n_sportsmen(n, s) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов") + (s > 0 ? " (+" + s + " запасн" + chooseEnding(s, "ой", "ых", "ых") + ")" : "");
                },
                "n_sportsmen_short": function n_sportsmen_short(n, s) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов") + (s > 0 ? " (+" + s + " зап.)" : "");
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
                },
                "invalid_discipline_found": "Программа соревнований содержит туры, отсутствующие в системе"
            },
            "discipline": {
                "change_judges_with_finalized_tour": "Невозможно изменить состав судей для дисциплины, содержащей финализированные туры",
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
            "participant": {
                "delete_with_finalized_tours": "Невозможно удалить участника, принявшего участие хотя бы в одном финализированном туре"
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
                "connecting": "Подключение к сети",
                "connection_problem": "Проблемы с сетью",
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
            "discipline_judge": {
                "roles": {
                    "acro_judge": "А",
                    "dance_judge": "T",
                    "head_judge": "Гл",
                    "tech_judge": "Тех"
                },
                "roles_legend": React.createElement(
                    "table",
                    { className: "w-100" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Гл — главный судья"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Т — судья танца"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "А — судья акробатики"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Тex — технический судья"
                            )
                        )
                    )
                )
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
                "sportsman": "Спортсмен",
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
            "alerts": {
                "has_unconfirmed_scores": "Имеются незафиксированные оценки судей в последнем заходе."
            },
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
                "stop_tour_and_start_next": "Завершить тур и перейти к следующему туру",
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

},{}],9:[function(require,module,exports){
"use strict";

var _main = require("clients/screen_operator/main");

ReactDOM.render(React.createElement(_main.ScreenOperator, window.page_props), window.document.getElementById("content"));

},{"clients/screen_operator/main":4}],10:[function(require,module,exports){
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

},{"i10n/loader":7,"server/storage":12,"ui/dialogs":14}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.message_dispatcher = undefined;

var _storage = require("server/storage");

var _components = require("ui/components");

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
            _components.connection_status.setOk();
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
            _components.connection_status.setFail();
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

},{"server/storage":12,"ui/components":13}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.connection_status = exports.Loader = undefined;

var _loader = require("i10n/loader");

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

var ConnectionStatusMock = function () {
    function ConnectionStatusMock() {
        _classCallCheck(this, ConnectionStatusMock);
    }

    ConnectionStatusMock.prototype.setOk = function setOk() {};

    ConnectionStatusMock.prototype.setFail = function setFail() {};

    return ConnectionStatusMock;
}();

var ConnectionStatus = function (_React$Component2) {
    _inherits(ConnectionStatus, _React$Component2);

    function ConnectionStatus(props) {
        _classCallCheck(this, ConnectionStatus);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = {
            "connected": null
        };
        return _this2;
    }

    ConnectionStatus.prototype.componentWillUnmount = function componentWillUnmount() {
        this.stopInterval();
    };

    ConnectionStatus.init = function init() {
        var element = window.document.getElementById("connection_status");
        if (element) {
            return ReactDOM.render(React.createElement(ConnectionStatus, null), element);
        }
        return new ConnectionStatusMock();
    };

    ConnectionStatus.prototype.startInterval = function startInterval() {
        var _this3 = this;

        if (this.interval) {
            return;
        }
        this.interval = setInterval(function () {
            _this3.setState({
                tick: !_this3.state.tick
            });
        }, 750);
    };

    ConnectionStatus.prototype.stopInterval = function stopInterval() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
    };

    ConnectionStatus.prototype.setOk = function setOk() {
        this.stopInterval();
        this.setState({ connected: true, tick: false });
    };

    ConnectionStatus.prototype.setFail = function setFail() {
        this.startInterval();
        this.setState({ connected: false });
    };

    ConnectionStatus.prototype.render = function render() {
        if (this.state.connected) {
            return React.createElement("div", { className: "connection-status ok" });
        }
        if (this.state.connected === null) {
            return React.createElement(
                "div",
                { className: "connection-status alert-warning" },
                (0, _loader._)("global.labels.connecting")
            );
        }
        return React.createElement(
            "div",
            { className: "connection-status alert-danger" + (this.state.tick ? " tick" : "") },
            (0, _loader._)("global.labels.connection_problem")
        );
    };

    return ConnectionStatus;
}(React.Component);

var connection_status = exports.connection_status = ConnectionStatus.init();

},{"i10n/loader":7}],14:[function(require,module,exports){
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

},{"i10n/loader":7}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"i10n/loader":7}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHJvc2ZhcnJcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcY2xpZW50c1xcc2NyZWVuXFxtYWluLmpzeCIsInNyY1xcanN4XFxjbGllbnRzXFxzY3JlZW5fb3BlcmF0b3JcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcZG9jeC5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFx0b29scy5qc3giLCJzcmNcXGpzeFxcaTEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxpMTBuXFxydS5qc3giLCJzcmNcXGpzeFxcc2NyZWVuX29wZXJhdG9yLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxccHJpbnRhYmxlLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNjYTs7Ozs7Ozs7O3VDQUNULHlCQUFPLFNBQVM7OztBQUNaLGVBQU87bUJBQU8sT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixPQUFwQjtTQUFOLENBQW9DLElBQXJDLENBQTBDLElBQTFDLENBQVAsQ0FEWTs7O0FBRFAsdUNBSVQsMkJBQVM7QUFDTCxlQUFPOzs7WUFDSDs7a0JBQVEsV0FBVSxpQkFBVixFQUE0QixTQUFVLEtBQUssTUFBTCxDQUFZLE1BQVosQ0FBVixFQUFwQzs7YUFERztTQUFQLENBREs7OztXQUpBO0VBQWlDLE1BQU0sU0FBTjs7SUFhakM7Ozs7OzRCQUVpQjtBQUN0QixtQkFBTztBQUNILDBCQUFVLE1BQVY7YUFESixDQURzQjs7Ozs7OztBQVExQixhQVZTLGlCQVVULENBQVksS0FBWixFQUFtQjs4QkFWVixtQkFVVTs7c0RBQ2YsNkJBQU0sS0FBTixHQURlOztBQUVmLGVBQUssS0FBTCxHQUFhO0FBQ1Qsb0JBQVEsS0FBUjtTQURKLENBRmU7QUFLZixlQUFLLFdBQUwsR0FBbUIsS0FBbkIsQ0FMZTs7S0FBbkI7O0FBVlMsZ0NBaUJULG1EQUFxQjs7O0FBQ2pCLGFBQUssT0FBTCxHQUFlLGlCQUFRLFNBQVIsQ0FBa0Isd0JBQXdCLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBekQsQ0FEaUI7QUFFakIsYUFBSyxlQUFMLEdBQXVCLHVDQUFtQixXQUFuQixDQUErQixhQUEvQixFQUE4QyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQTlDLENBQXZCLENBRmlCO0FBR2pCLGFBQUssa0JBQUwsR0FBMEIsdUNBQW1CLFdBQW5CLENBQStCLFdBQS9CLEVBQTRDLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUE1QyxDQUExQixDQUhpQjtBQUlqQixhQUFLLHVCQUFMLEdBQStCLHVDQUFtQixXQUFuQixDQUErQixrQ0FBL0IsRUFBbUUsVUFBUyxPQUFULEVBQWtCO0FBQ2hILGdCQUFJLENBQUMsT0FBRCxFQUFVO0FBQ1YscUJBQUssV0FBTCxHQURVO0FBRVYsdUJBRlU7YUFBZDtBQUlBLGdCQUFJLGVBQWUsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixNQUFqQixFQUF5QixLQUF6QixDQUErQixRQUFRLFNBQVIsQ0FBL0IsQ0FBZixDQUw0RztBQU1oSCxnQkFBSSxDQUFDLFlBQUQsRUFBZTtBQUNmLHVCQURlO2FBQW5CO0FBR0EsZ0JBQUksYUFBYSxVQUFiLENBQXdCLEVBQXhCLEtBQStCLEtBQUssS0FBTCxDQUFXLGFBQVgsRUFBMEI7QUFDekQscUJBQUssV0FBTCxHQUR5RDthQUE3RDtTQVQ4RixDQVloRyxJQVpnRyxDQVkzRixJQVoyRixDQUFuRSxDQUEvQixDQUppQjtBQWlCakIsYUFBSyxRQUFMLEdBakJpQjtBQWtCakIsYUFBSyxXQUFMLEdBbEJpQjtBQW1CakIsWUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCOztBQUNyQixvQkFBSSxjQUFjLFlBQVksWUFBTTtBQUNoQyx3QkFBSSxPQUFLLElBQUwsQ0FBVSxTQUFWLEVBQXFCO0FBQ3JCLHNDQUFjLFdBQWQsRUFEcUI7QUFFckIsK0JBQUssVUFBTCxDQUFnQixPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLFFBQXBCLENBQWhCLENBRnFCO0FBR3JCLCtCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLFFBQXBCLENBQTZCLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsUUFBcEIsQ0FBN0IsQ0FIcUI7cUJBQXpCO2lCQUQwQixFQU0zQixHQU5lLENBQWQ7aUJBRGlCO1NBQXpCOzs7QUFwQ0ssZ0NBOENULHVEQUF1QjtBQUNuQiwrQ0FBbUIsY0FBbkIsQ0FBa0MsS0FBSyxlQUFMLENBQWxDLENBRG1CO0FBRW5CLCtDQUFtQixjQUFuQixDQUFrQyxLQUFLLGtCQUFMLENBQWxDLENBRm1CO0FBR25CLCtDQUFtQixjQUFuQixDQUFrQyxLQUFLLHVCQUFMLENBQWxDLENBSG1CO0FBSW5CLHlCQUFRLFNBQVIsQ0FBa0Isd0JBQXdCLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBMUMsQ0FKbUI7OztBQTlDZCxnQ0FvRFQscUNBQWM7QUFDVixZQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsa0JBQVgsRUFBK0I7QUFDaEMsbUJBRGdDO1NBQXBDO0FBR0EsWUFBSSxDQUFDLEtBQUssV0FBTCxFQUFrQjtBQUNuQixtQkFEbUI7U0FBdkI7QUFHQSxZQUFJLGVBQWUsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixLQUFqQixDQUFmLENBUE07QUFRVixZQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FSSjtBQVNWLFlBQUksWUFBWSxFQUFaLENBVE07QUFVVixZQUFJLFNBQVM7QUFDVCxrQkFBTSxFQUFOO0FBQ0EseUJBQWE7QUFDVCwyQkFBVyxFQUFYO0FBQ0Esc0JBQU0sRUFBTjthQUZKO1NBRkEsQ0FWTTtBQWlCVixhQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxRQUFRLE1BQVIsRUFBZ0IsRUFBRSxDQUFGLEVBQUs7QUFDckMsc0JBQVUsSUFBVixDQUFlO0FBQ1gsdUJBQU8sUUFBUSxDQUFSLEVBQVcsS0FBWDtBQUNQLHFCQUFLLGFBQWEsS0FBYixDQUFtQixRQUFRLENBQVIsRUFBVyxNQUFYLENBQW5CLENBQXNDLFNBQXRDLENBQWdELE1BQWhELENBQUw7YUFGSixFQURxQztTQUF6QztBQU1BLGFBQUssUUFBTCxDQUFjO0FBQ1Ysb0JBQVEsSUFBUjtBQUNBLG1CQUFPLFNBQVA7QUFDQSx3QkFBWSxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLFlBQWpCLEVBQStCLEtBQS9CLENBQXFDLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBckMsQ0FBK0QsU0FBL0QsQ0FBeUU7QUFDakYsNkJBQWEsRUFBYjthQURRLENBQVo7U0FISixFQXZCVTs7O0FBcERMLGdDQW1GVCxxQ0FBYzs7O0FBQ1Ysc0JBQUksd0JBQUosRUFBOEI7QUFDMUIsMkJBQWUsS0FBSyxLQUFMLENBQVcsYUFBWDtTQURuQixFQUdDLFNBSEQsQ0FHVyxvQkFBWTtBQUNuQixtQkFBSyxRQUFMLENBQWM7QUFDVixvQ0FBb0IsUUFBcEI7YUFESixFQURtQjtBQUluQixtQkFBSyxXQUFMLEdBSm1CO1NBQVosQ0FIWCxDQVNDLElBVEQsR0FEVTs7O0FBbkZMLGdDQStGVCwrQkFBVzs7O0FBQ1Asc0JBQUksZ0JBQUosRUFBc0I7QUFDbEIsMkJBQWUsS0FBSyxLQUFMLENBQVcsYUFBWDtBQUNmLHNCQUFVO0FBQ04sNkJBQWEsRUFBYjtBQUNBLHVCQUFPO0FBQ0gsMEJBQU07QUFDRixxQ0FBYTtBQUNULGtDQUFNLEVBQU47eUJBREo7cUJBREo7aUJBREo7YUFGSjtTQUZKLEVBYUMsT0FiRCxDQWFTLFlBYlQsRUFhdUIsS0FBSyxLQUFMLENBQVcsYUFBWCxFQUEwQixLQUFLLE9BQUwsQ0FiakQsQ0FjQyxTQWRELENBY1csWUFBTTtBQUNiLG1CQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FEYTtBQUViLG1CQUFLLFdBQUwsU0FGYTtTQUFOLENBZFgsQ0FrQkMsSUFsQkQsR0FETzs7Ozs7QUEvRkYsZ0NBdUhULDZCQUFTLFNBQVM7QUFDZCxnQkFBUSxPQUFSO0FBQ0EsaUJBQUssTUFBTDtBQUNJLHFCQUFLLFVBQUwsR0FESjtBQUVJLHNCQUZKO0FBREE7QUFLSSx3QkFBUSxHQUFSLENBQVksa0JBQVosRUFBZ0MsT0FBaEMsRUFESjtBQUpBLFNBRGM7Ozs7O0FBdkhULGdDQW1JVCxtQ0FBYTtBQUNULGdCQUFRLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDUixpQkFBSyxXQUFMO0FBQ0ksdUJBQU8sMkVBQWlDLE9BQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFtQixLQUFJLFlBQUosRUFBNUQsQ0FBUCxDQURKO0FBREEsaUJBR0ssaUJBQUw7QUFDSSx1QkFBTztBQUNILDJCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDUixtQ0FBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDtBQUNoQixtQ0FBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDtBQUNoQix5QkFBSSxZQUFKLEVBSkcsQ0FBUCxDQURKO0FBSEEsaUJBU0ssTUFBTDtBQUNJLHVCQUFPO0FBQ0gseUJBQUksV0FBSjtBQUNBLDRCQUFTLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBa0MsSUFBbEMsR0FBeUMsSUFBekMsR0FBZ0QsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixXQUF0QixDQUFrQyxJQUFsQztBQUN6RCw0QkFBUyxlQUFFLGtDQUFGLENBQVQ7QUFDQSw0QkFBUyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCO0FBQ1QsMEJBQU8sa0VBQXdCLE9BQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFoQyxDQUFQLEVBTEcsQ0FBUCxDQURKO0FBVEEsaUJBZ0JLLE9BQUw7QUFDSSx1QkFBTyxrRUFBd0IsT0FBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQW1CLEtBQUksWUFBSixFQUFuRCxDQUFQLENBREo7QUFoQkE7U0FEUzs7O0FBbklKLGdDQTBKVCwyQkFBUzs7QUFDTCxZQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsTUFBWCxFQUFtQjtBQUNwQixtQkFBTzs7a0JBQUssV0FBVSxvQkFBVixFQUFMO2dCQUFvQyw2Q0FBcEM7YUFBUCxDQURvQjtTQUF4QjtBQUdBLGVBQU87O2NBQUssV0FBVSxvQkFBVixFQUFMO1lBQ0QsS0FBSyxVQUFMLEVBREM7U0FBUCxDQUpLOzs7QUExSkEsZ0NBa0tULG1DQUErQztZQUFwQyxpRUFBUyx5Q0FBMkI7O0FBQzNDLHdCQUFLLFFBQUwsRUFDSyxTQURMLENBQ2UsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixXQUF0QixDQUFrQyxJQUFsQyxHQUF5QyxJQUF6QyxHQUFnRCxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFdBQXRCLENBQWtDLElBQWxDLENBRC9ELENBRUssU0FGTCxDQUVlLGVBQUUsa0NBQUYsQ0FGZixFQUdLLFNBSEwsQ0FHZSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCLENBSGYsQ0FJSyxPQUpMLENBSWEsS0FBSyxJQUFMLENBQVUsU0FBVixDQUFvQixrQkFBcEIsRUFKYixFQUtLLFFBTEwsQ0FLYyxZQUxkLEVBSzRCLFlBTDVCLEVBSzBDLE1BTDFDLEVBTUssUUFOTCxDQU1jLDhEQU5kLEVBTThFLFFBTjlFLEVBTXdGLE1BTnhGLEVBT0ssUUFQTCxDQU9jLDhEQVBkLEVBTzhFLFNBUDlFLEVBT3lGLEdBUHpGLEVBUUssUUFSTCxDQVFjLFlBUmQsRUFRNEIsT0FSNUIsRUFRcUMsTUFSckMsRUFTSyxJQVRMLEdBRDJDOzs7V0FsS3RDO0VBQTBCLE1BQU0sU0FBTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QnZDLFNBQVMsRUFBVCxHQUFjO0FBQ1YsUUFBSSxPQUFPLEVBQVAsQ0FETTtBQUVWLFNBQUssSUFBSSxNQUFNLENBQU4sRUFBUyxNQUFNLFVBQVUsTUFBVixFQUFrQixFQUFFLEdBQUYsRUFBTztBQUM3QyxhQUFLLElBQUwsQ0FBVSxVQUFVLEdBQVYsQ0FBVixFQUQ2QztLQUFqRDtBQUdBLFdBQU8sNEJBQUUsNkJBQTZCLFVBQVUsQ0FBVixDQUE3QixTQUE4QyxLQUFoRCxDQUFQLENBTFU7Q0FBZDs7SUFRYTs7Ozs7Ozs7O3FDQUNULDJDQUFnQixVQUFVLFVBQVU7QUFDaEMsWUFBSSxjQUFjLE9BQVEsUUFBUCxLQUFvQixXQUFwQixJQUFxQyxTQUFTLEdBQVQsQ0FBYSxJQUFiLENBQWtCLEVBQWxCLEtBQXlCLFNBQVMsR0FBVCxDQUFhLElBQWIsQ0FBa0IsRUFBbEIsQ0FEakQ7QUFFaEMsWUFBSSxDQUFDLFdBQUQsRUFBYztBQUNkLG1CQUFPLElBQVAsQ0FEYztTQUFsQjtBQUdBLGVBQU87O2NBQUksS0FBTSxNQUFNLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBaEI7WUFBa0M7O2tCQUFJLFdBQVUsV0FBVixFQUFzQixTQUFRLEdBQVIsRUFBMUI7Z0JBQ3JDOztzQkFBRyxXQUFVLGFBQVYsRUFBSDtvQkFBNkIsU0FBUyxHQUFULENBQWEsSUFBYixDQUFrQixJQUFsQjtpQkFEUTthQUFsQztTQUFQLENBTGdDOzs7QUFEM0IscUNBVVQsK0JBQVUsS0FBSztBQUNYLFlBQUksSUFBSSxJQUFJLEdBQUosQ0FBUSxXQUFSLENBREc7QUFFWCxlQUFPOztjQUFJLEtBQU0sTUFBTSxJQUFJLEdBQUosQ0FBUSxFQUFSLEVBQWhCO1lBQ0g7O2tCQUFJLFdBQVUsV0FBVixFQUFKO2dCQUEwQjs7c0JBQUcsV0FBVSxhQUFWLEVBQUg7b0JBQTZCLElBQUksS0FBSixLQUFjLElBQWQsR0FBcUIsRUFBckIsR0FBMEIsSUFBSSxLQUFKO2lCQUFqRjthQURHO1lBRUg7O2tCQUFJLFdBQVUsWUFBVixFQUFKO2dCQUEyQjs7c0JBQUcsV0FBVSxhQUFWLEVBQUg7b0JBQTZCLEVBQUUsTUFBRjtpQkFBeEQ7YUFGRztZQUdIOztrQkFBSSxXQUFVLE1BQVYsRUFBaUIsU0FBUSxHQUFSLEVBQXJCO2dCQUNJOztzQkFBTyxXQUFVLFdBQVYsRUFBUDtvQkFBNkI7Ozt3QkFDdkIsRUFBRSxjQUFGLEdBQW1COzs7NEJBQUk7O2tDQUFJLFNBQVEsR0FBUixFQUFKO2dDQUFnQjs7c0NBQUcsV0FBVSxXQUFWLEVBQUg7b0NBQTJCLEVBQUUsY0FBRjtpQ0FBM0M7NkJBQUo7eUJBQW5CLEdBQXFHLElBQXJHO3dCQUNBLEVBQUUsU0FBRixDQUFZLEdBQVosQ0FBZ0IsVUFBQyxDQUFELEVBQUksR0FBSjttQ0FBWTs7a0NBQUksS0FBTSxHQUFOLEVBQUo7Z0NBQzFCOztzQ0FBSSxXQUFVLE1BQVYsRUFBSjtvQ0FBcUI7Ozt3Q0FDZixFQUFFLFNBQUYsR0FBYyxHQUFkLEdBQW9CLEVBQUUsVUFBRjt3Q0FDcEIsRUFBRSxVQUFGLEdBQWU7Ozs7NENBQU8sZUFBRSxrQkFBRixDQUFQOzt5Q0FBZixHQUFzRCxJQUF0RDtxQ0FGTjtpQ0FEMEI7Z0NBSzFCOztzQ0FBSSxXQUFVLE1BQVYsRUFBSjtvQ0FBcUI7OzBDQUFHLFdBQVUsYUFBVixFQUFIO3dDQUE2QixFQUFFLGFBQUY7cUNBQWxEO2lDQUwwQjs7eUJBQVosQ0FGTztxQkFBN0I7aUJBREo7YUFIRztZQWVIOztrQkFBSSxXQUFVLFdBQVYsRUFBSjtnQkFBMEI7OztvQkFBSyxFQUFFLElBQUYsQ0FBTyxJQUFQO2lCQUEvQjthQWZHO1lBZ0JIOztrQkFBSSxXQUFVLGNBQVYsRUFBSjtnQkFBNkI7OztvQkFBSyxFQUFFLE9BQUYsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBQXlCLFVBQUMsQ0FBRDsrQkFBTyxDQUFDLEVBQUUsSUFBRixFQUFELEVBQVcsNEJBQUksS0FBSSxHQUFKLEVBQUosQ0FBWDtxQkFBUCxDQUE5QjtpQkFBN0I7YUFoQkc7U0FBUCxDQUZXOzs7QUFWTixxQ0ErQlQsbUNBQWE7QUFDVCxZQUFJLFNBQVMsRUFBVCxDQURLO0FBRVQsWUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FGSDtBQUdULGFBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLE1BQU0sTUFBTixFQUFjLEVBQUUsQ0FBRixFQUFLO0FBQ25DLGdCQUFJLFNBQVMsS0FBSyxlQUFMLENBQXFCLE1BQU0sSUFBSSxDQUFKLENBQTNCLEVBQW1DLE1BQU0sQ0FBTixDQUFuQyxDQUFULENBRCtCO0FBRW5DLHNCQUFVLE9BQU8sSUFBUCxDQUFZLE1BQVosQ0FBVixDQUZtQztBQUduQyxtQkFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsTUFBTSxDQUFOLENBQWYsQ0FBWixFQUhtQztTQUF2QztBQUtBLGVBQU8sTUFBUCxDQVJTOzs7QUEvQkoscUNBeUNULDJCQUFTO0FBQ0wsZUFBTzs7Y0FBSyxXQUFVLG9CQUFWLEVBQUw7WUFDSDs7a0JBQU8sV0FBVSxnQkFBVixFQUFQO2dCQUNJOzs7b0JBQ0k7Ozt3QkFDSTs7OEJBQUksV0FBVSxLQUFWLEVBQUo7NEJBQW9COzs7Z0NBQUssR0FBRyxzQkFBSCxDQUFMOzZCQUFwQjt5QkFESjt3QkFFSTs7OEJBQUksV0FBVSxLQUFWLEVBQUo7NEJBQW9COzs7Z0NBQUssR0FBRyx1QkFBSCxDQUFMOzZCQUFwQjt5QkFGSjt3QkFHSTs7OEJBQUksV0FBVSxNQUFWLEVBQUo7NEJBQXFCOzs7Z0NBQUssR0FBRywwQkFBSCxDQUFMOzZCQUFyQjt5QkFISjt3QkFJSTs7OEJBQUksV0FBVSxLQUFWLEVBQUo7NEJBQW9COzs7Z0NBQUssR0FBRyx3Q0FBSCxDQUFMOzZCQUFwQjt5QkFKSjt3QkFLSTs7OEJBQUksV0FBVSxNQUFWLEVBQUo7NEJBQXFCOzs7Z0NBQUssR0FBRyxpQ0FBSCxDQUFMOzZCQUFyQjt5QkFMSjt3QkFNSTs7OEJBQUksV0FBVSxNQUFWLEVBQUo7NEJBQXFCOzs7Z0NBQUssR0FBRyxvQ0FBSCxDQUFMOzZCQUFyQjt5QkFOSjtxQkFESjtpQkFESjtnQkFXSTs7O29CQUNNLEtBQUssVUFBTCxFQUROO2lCQVhKO2FBREc7U0FBUCxDQURLOzs7V0F6Q0E7RUFBK0IsTUFBTSxTQUFOOztJQThEdEM7OztBQUNGLGFBREUsa0NBQ0YsQ0FBWSxLQUFaLEVBQW1COzhCQURqQixvQ0FDaUI7O3NEQUNmLDZCQUFNLEtBQU4sR0FEZTs7QUFFZixlQUFLLEtBQUwsR0FBYTtBQUNULG9CQUFRLEtBQVI7U0FESixDQUZlOztLQUFuQjs7QUFERSxpREFPRix1Q0FBZTtBQUNYLGFBQUssUUFBTCxDQUFjO0FBQ1Ysb0JBQVEsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxNQUFYO1NBRGIsRUFEVzs7O0FBUGIsaURBWUYsMkJBQVM7QUFDTCxZQUFJLElBQUksS0FBSyxLQUFMLENBQVcsV0FBWCxDQURIO0FBRUwsZUFBTzs7dUJBQU8sV0FBWSxTQUFVLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBVjtlQUNSLDBDQUFrQixLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbEIsRUFEWDtZQUM0RDs7O2dCQUMvRDs7O29CQUNJOzswQkFBSSxXQUFVLE9BQVYsRUFBa0IsU0FBUSxHQUFSLEVBQXRCO3dCQUNNLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsSUFBckIsR0FBNEIsRUFBNUIsR0FDRTs7OzRCQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7NEJBQ0g7O2tDQUFLLFdBQVUsYUFBVixFQUFMO2dDQUErQixlQUFFLHdCQUFGLENBQS9COzZCQURKO3lCQURGO3FCQUZWO29CQU9JOzswQkFBSSxXQUFVLFFBQVYsRUFBSjt3QkFBeUIsRUFBRSxNQUFGO3FCQVA3QjtvQkFRSTs7MEJBQUksV0FBVSxNQUFWLEVBQUo7d0JBQXVCLEVBQUUsSUFBRjtxQkFSM0I7aUJBRCtEO2dCQVcvRDs7O29CQUNJOzswQkFBSSxXQUFVLE1BQVYsRUFBaUIsU0FBUSxHQUFSLEVBQXJCO3dCQUFtQyxFQUFFLElBQUYsQ0FBTyxJQUFQO3FCQUR2QztpQkFYK0Q7Z0JBYy9EOzs7b0JBQ0k7OzBCQUFJLFdBQVUsU0FBVixFQUFvQixTQUFRLEdBQVIsRUFBeEI7d0JBQXNDLEVBQUUsT0FBRjtxQkFEMUM7aUJBZCtEO2FBRDVEO1NBQVAsQ0FGSzs7O1dBWlA7RUFBMkMsTUFBTSxTQUFOOztJQW9DcEM7Ozs7Ozs7Ozs4Q0FDVCwyQ0FBZ0IsVUFBVSxVQUFVO0FBQ2hDLFlBQUksY0FBYyxPQUFRLFFBQVAsS0FBb0IsV0FBcEIsSUFBcUMsU0FBUyxHQUFULENBQWEsSUFBYixDQUFrQixFQUFsQixLQUF5QixTQUFTLEdBQVQsQ0FBYSxJQUFiLENBQWtCLEVBQWxCLENBRGpEO0FBRWhDLFlBQUksQ0FBQyxXQUFELEVBQWM7QUFDZCxtQkFBTyxJQUFQLENBRGM7U0FBbEI7QUFHQSxlQUFPOztjQUFLLFdBQVUsV0FBVixFQUFzQixLQUFNLE1BQU0sU0FBUyxHQUFULENBQWEsRUFBYixFQUF2QztZQUNELFNBQVMsR0FBVCxDQUFhLElBQWIsQ0FBa0IsSUFBbEI7U0FETixDQUxnQzs7O0FBRDNCLDhDQVVULCtCQUFVLEtBQUs7QUFDWCxlQUFPLG9CQUFDLGtDQUFELElBQW9DLEtBQU0sTUFBTSxJQUFJLEdBQUosQ0FBUSxFQUFSO0FBQ1oseUJBQWMsSUFBSSxHQUFKLENBQVEsV0FBUjtBQUNkLG1CQUFRLElBQUksS0FBSixFQUY1QyxDQUFQLENBRFc7OztBQVZOLDhDQWVULG1DQUFhO0FBQ1QsWUFBSSxTQUFTLEVBQVQsQ0FESztBQUVULFlBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBRkg7QUFHVCxhQUFLLElBQUksSUFBSSxNQUFNLE1BQU4sR0FBZSxDQUFmLEVBQWtCLEtBQUssQ0FBTCxFQUFRLEVBQUUsQ0FBRixFQUFLO0FBQ3hDLGdCQUFJLFNBQVMsS0FBSyxlQUFMLENBQXFCLE1BQU0sSUFBSSxDQUFKLENBQTNCLEVBQW1DLE1BQU0sQ0FBTixDQUFuQyxDQUFULENBRG9DO0FBRXhDLHNCQUFVLE9BQU8sSUFBUCxDQUFZLE1BQVosQ0FBVixDQUZ3QztBQUd4QyxtQkFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsTUFBTSxDQUFOLENBQWYsQ0FBWixFQUh3QztTQUE1QztBQUtBLGVBQU8sTUFBUCxDQVJTOzs7QUFmSiw4Q0F5QlQsMkJBQVM7QUFDTCxlQUFPOzs7WUFDRCxLQUFLLFVBQUwsRUFEQztTQUFQLENBREs7OztXQXpCQTtFQUF3QyxNQUFNLFNBQU47O0lBZ0MvQzs7Ozs7Ozs7O3NEQUNGLDJCQUFTO0FBQ0wsWUFBSSxJQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FESDtBQUVMLGVBQU87O3VCQUFPLFdBQVksU0FBVSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQXNCLFdBQXRCLEdBQW9DLEVBQXBDLENBQVY7ZUFDUiwwQ0FBa0IsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUQ3QjtZQUNrRDs7O2dCQUNyRDs7O29CQUNJOzswQkFBSSxXQUFVLE9BQVYsRUFBa0IsU0FBUSxHQUFSLEVBQXRCO3dCQUNNLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsSUFBckIsR0FBNEIsRUFBNUIsR0FDRTs7OzRCQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7NEJBQ0g7O2tDQUFLLFdBQVUsYUFBVixFQUFMO2dDQUErQixlQUFFLHdCQUFGLENBQS9COzZCQURKO3lCQURGO3FCQUZWO29CQU9JOzswQkFBSSxXQUFVLFFBQVYsRUFBSjt3QkFBeUIsRUFBRSxNQUFGO3FCQVA3QjtvQkFRSTs7MEJBQUksV0FBVSxNQUFWLEVBQUo7d0JBQXVCLEVBQUUsSUFBRjtxQkFSM0I7aUJBRHFEO2dCQVdyRDs7O29CQUNJOzswQkFBSSxXQUFVLE1BQVYsRUFBaUIsU0FBUSxHQUFSLEVBQXJCO3dCQUFtQyxFQUFFLElBQUYsQ0FBTyxJQUFQO3FCQUR2QztpQkFYcUQ7YUFEbEQ7U0FBUCxDQUZLOzs7V0FEUDtFQUFnRCxNQUFNLFNBQU47O0lBc0J6Qzs7Ozs7Ozs7O21EQUNULDJDQUFnQixVQUFVLFVBQVU7QUFDaEMsWUFBSSxjQUFjLE9BQVEsUUFBUCxLQUFvQixXQUFwQixJQUFxQyxTQUFTLEdBQVQsQ0FBYSxJQUFiLENBQWtCLEVBQWxCLEtBQXlCLFNBQVMsR0FBVCxDQUFhLElBQWIsQ0FBa0IsRUFBbEIsQ0FEakQ7QUFFaEMsWUFBSSxDQUFDLFdBQUQsRUFBYztBQUNkLG1CQUFPLElBQVAsQ0FEYztTQUFsQjtBQUdBLGVBQU87O2NBQUssV0FBVSxXQUFWLEVBQXNCLEtBQU0sTUFBTSxTQUFTLEdBQVQsQ0FBYSxFQUFiLEVBQXZDO1lBQ0QsU0FBUyxHQUFULENBQWEsSUFBYixDQUFrQixJQUFsQjtTQUROLENBTGdDOzs7QUFEM0IsbURBVVQsK0JBQVUsS0FBSyxPQUFPOzs7QUFDbEIsZUFBTyxvQkFBQyx1Q0FBRDtBQUNILGlCQUFNLE1BQU0sSUFBSSxHQUFKLENBQVEsRUFBUjtBQUNaLHlCQUFjLElBQUksR0FBSixDQUFRLFdBQVI7QUFDZCxtQkFBUSxJQUFJLEtBQUo7QUFDUixxQkFBVTt1QkFBTSxPQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLEtBQXpCO2FBQU47QUFDVixzQkFBVyxLQUFLLEtBQUwsQ0FBVyxhQUFYLEtBQTZCLElBQTdCLElBQXFDLFNBQVMsS0FBSyxLQUFMLENBQVcsYUFBWCxFQUx0RCxDQUFQLENBRGtCOzs7QUFWYixtREFrQlQsbUNBQWE7QUFDVCxZQUFJLFNBQVMsRUFBVCxDQURLO0FBRVQsWUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FGSDtBQUdULGFBQUssSUFBSSxJQUFJLE1BQU0sTUFBTixHQUFlLENBQWYsRUFBa0IsS0FBSyxDQUFMLEVBQVEsRUFBRSxDQUFGLEVBQUs7QUFDeEMsZ0JBQUksU0FBUyxLQUFLLGVBQUwsQ0FBcUIsTUFBTSxJQUFJLENBQUosQ0FBM0IsRUFBbUMsTUFBTSxDQUFOLENBQW5DLENBQVQsQ0FEb0M7QUFFeEMsc0JBQVUsT0FBTyxJQUFQLENBQVksTUFBWixDQUFWLENBRndDO0FBR3hDLG1CQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxNQUFNLENBQU4sQ0FBZixFQUF5QixJQUFJLENBQUosQ0FBckMsRUFId0M7U0FBNUM7QUFLQSxlQUFPLE1BQVAsQ0FSUzs7O0FBbEJKLG1EQTRCVCwyQkFBUztBQUNMLGVBQU87OztZQUNELEtBQUssVUFBTCxFQURDO1NBQVAsQ0FESzs7O1dBNUJBO0VBQTZDLE1BQU0sU0FBTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDOUo3QztBQUNULGFBRFMsY0FDVCxDQUFZLFlBQVosRUFBMEI7Ozs4QkFEakIsZ0JBQ2lCOztBQUN0QixhQUFLLFFBQUwsR0FBZ0IsWUFBaEIsQ0FEc0I7QUFFdEIsYUFBSyxTQUFMLEdBQWlCLEVBQWpCLENBRnNCO0FBR3RCLGFBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsT0FBdEIsQ0FBOEIsVUFBQyxJQUFELEVBQU8sR0FBUDttQkFBZSxNQUFLLFNBQUwsQ0FBZSxLQUFLLEVBQUwsQ0FBZixHQUEwQixHQUExQjtTQUFmLENBQTlCLENBSHNCO0tBQTFCOztBQURTLDZCQU1ULCtDQUFrQixJQUFzQjtZQUFsQixtRUFBVyxxQkFBTzs7QUFDcEMsWUFBSSxTQUFTLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBSyxTQUFMLENBQWUsRUFBZixDQUF0QixDQUFULENBRGdDO0FBRXBDLFlBQUksQ0FBQyxNQUFELEVBQVM7QUFDVCxnQkFBSSxVQUFKLEVBQWdCO0FBQ1osdUJBQU8sS0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixDQUF0QixDQUFQLENBRFk7YUFBaEI7QUFHQSxtQkFBTyxLQUFLLG9CQUFMLEVBQVAsQ0FKUztTQUFiO0FBTUEsZUFBTyxNQUFQLENBUm9DOzs7QUFOL0IsNkJBZ0JULHVEQUF1QjtBQUNuQixlQUFPLEtBQUssaUJBQUwsQ0FBdUIsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF2QixFQUFpRCxJQUFqRCxDQUFQLENBRG1COzs7V0FoQmQ7OztJQXNCQTs7Ozs7NEJBQ2M7QUFDbkIsbUJBQU87QUFDSCxnQ0FBZ0IsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2hCLDBCQUFVLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjthQUZkLENBRG1COzs7O0FBTXZCLGFBUFMsTUFPVCxDQUFZLEtBQVosRUFBbUI7OEJBUFYsUUFPVTs7c0RBQ2YsNEJBQU0sS0FBTixHQURlOztBQUVmLGVBQUssUUFBTCxHQUFnQixJQUFJLGNBQUosQ0FBbUIsT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFuQyxDQUZlO0FBR2YsZUFBSyxLQUFMLEdBQWE7QUFDVCw0QkFBZ0IsT0FBSyxRQUFMLENBQWMsb0JBQWQsRUFBaEI7QUFDQSx5QkFBYSxJQUFiO1NBRkosQ0FIZTtBQU9mLGVBQUssUUFBTCxHQVBlO0FBUWYsK0NBQW1CLFdBQW5CLENBQStCLFdBQS9CLEVBQTRDLE9BQUssaUJBQUwsQ0FBdUIsSUFBdkIsUUFBNUMsRUFSZTtBQVNmLCtDQUFtQixXQUFuQixDQUErQixhQUEvQixFQUE4QyxPQUFLLFFBQUwsQ0FBYyxJQUFkLFFBQTlDLEVBVGU7O0tBQW5COztBQVBTLHFCQWtCVCwrQkFBVztBQUNQLHNCQUFJLGlCQUFKLEVBQXVCLEVBQUUsZ0JBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsRUFBMkIsVUFBVSxFQUFWLEVBQXBFLEVBQ0ssT0FETCxDQUNhLGFBRGIsRUFDNEIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUQ1QixDQUVLLFNBRkwsQ0FFZSxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBRmYsRUFHSyxJQUhMLEdBRE87OztBQWxCRixxQkF3QlQsaURBQW9CO0FBQ2hCLFlBQUksV0FBVyxpQkFBUSxHQUFSLENBQVksYUFBWixFQUEyQixLQUEzQixDQUFpQyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQWpDLENBQTRELFNBQTVELENBQXNFLEVBQXRFLEVBQTBFLFdBQTFFLENBREM7QUFFaEIsWUFBSSxTQUFTLFNBQVQsS0FBdUIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixFQUExQixJQUFnQyxTQUFTLFNBQVQsRUFBb0I7QUFDM0UsaUJBQUssWUFBTCxDQUFrQixTQUFTLFNBQVQsQ0FBbEIsQ0FEMkU7U0FBL0U7OztBQTFCSyxxQkE4QlQsaURBQW1CLE1BQU07QUFDckIsZUFBTyxtQkFBbUIsS0FBSyxRQUFMLEdBQWdCLEdBQW5DLEdBQXlDLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FEM0I7OztBQTlCaEIscUJBaUNULHFDQUFhLFFBQVE7QUFDakIsYUFBSyxRQUFMLENBQWM7QUFDVix5QkFBYSxLQUFLLFFBQUwsQ0FBYyxpQkFBZCxDQUFnQyxNQUFoQyxDQUFiO1NBREosRUFEaUI7OztBQWpDWixxQkFzQ1QsdUNBQWU7QUFDWCxhQUFLLFFBQUwsQ0FBYztBQUNWLDRCQUFnQixLQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2hCLHlCQUFhLElBQWI7U0FGSixFQURXOzs7QUF0Q04scUJBNENULDJCQUFTO0FBQ0wsZUFBTzs7Y0FBSyxXQUFVLE9BQVYsRUFBTDtZQUNILGdDQUFRLEtBQU0sS0FBSyxrQkFBTCxDQUF3QixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTlCO0FBQ0EscUJBQU0sS0FBSyxrQkFBTCxDQUF3QixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTlCLEVBRFIsQ0FERztZQUdELEtBQUssS0FBTCxDQUFXLFdBQVgsR0FDSSxnQ0FBUSxLQUFNLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUE5QjtBQUNBLHFCQUFNLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUE5QjtBQUNBLHdCQUFTLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFULEVBRlIsQ0FESixHQUlJLElBSko7U0FITixDQURLOzs7V0E1Q0E7RUFBZSxNQUFNLFNBQU47Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2pCdEI7Ozs7Ozs7Ozt5Q0FRRixxQ0FBYSxnQkFBZ0I7QUFDekIsdUJBQWUsY0FBZixHQUR5QjtBQUV6Qix1QkFBZSxlQUFmLEdBRnlCO0FBR3pCLFlBQUksSUFBSSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBSixDQUhxQjtBQUl6QixVQUFFLGNBQUYsQ0FBaUIsV0FBakIsRUFBOEIsSUFBOUIsRUFBb0MsSUFBcEMsRUFBMEMsTUFBMUMsRUFBa0QsQ0FBbEQsRUFBcUQsQ0FBckQsRUFBd0QsQ0FBeEQsRUFBMkQsQ0FBM0QsRUFBOEQsQ0FBOUQsRUFBaUUsS0FBakUsRUFBd0UsS0FBeEUsRUFBK0UsS0FBL0UsRUFBc0YsS0FBdEYsRUFBNkYsQ0FBN0YsRUFBZ0csSUFBaEcsRUFKeUI7QUFLekIsYUFBSyxPQUFMLENBQWEsYUFBYixDQUEyQixDQUEzQixFQUx5Qjs7O0FBUjNCLHlDQWVGLDJCQUFTOzs7QUFDTCxZQUFJLFVBQVUsRUFBVixDQURDO0FBRUwsYUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFtQyxPQUFuQyxDQUEyQyxVQUFDLFVBQUQ7bUJBQ3ZDLFdBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFDLElBQUQ7dUJBQ3JCLFFBQVEsSUFBUixDQUFhOztzQkFBUSxPQUFRLEtBQUssRUFBTCxFQUFVLEtBQU0sS0FBSyxFQUFMLEVBQWhDO29CQUNQLFdBQVcsSUFBWDt5QkFETztvQkFDcUIsS0FBSyxJQUFMLElBQWEsS0FBSyxTQUFMLEdBQWlCLFNBQWpCLEdBQTZCLEVBQTdCLENBQWI7aUJBRGxDO2FBRHFCO1NBRGMsQ0FBM0MsQ0FGSztBQVNMLGVBQU87O2NBQVEsT0FBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ1IsMkJBQVUsY0FBVjtBQUNBLHFCQUFNOzJCQUFLLE9BQUssT0FBTCxHQUFlLENBQWY7aUJBQUw7QUFDTiwwQkFBVyxrQkFBQyxDQUFEOzJCQUFPLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsRUFBRSxNQUFGLENBQVMsS0FBVCxJQUFrQixJQUFsQjtpQkFBM0I7QUFDWCw4QkFBZSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBZixFQUpSO1lBS0g7O2tCQUFRLE9BQU0sRUFBTixFQUFSOzthQUxHO1lBTUQsT0FOQztTQUFQLENBVEs7OztpQkFmUDs7NEJBQ3FCO0FBQ25CLG1CQUFPO0FBQ0gsNkJBQWEsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2IsdUJBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AsMEJBQVUsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO2FBSGQsQ0FEbUI7Ozs7V0FEckI7RUFBbUMsTUFBTSxTQUFOOztJQW1DbkM7Ozs7Ozs7OztvREFRRiwyQkFBUzs7O0FBQ0wsWUFBSSxVQUFVLEVBQVYsQ0FEQztBQUVMLGFBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsT0FBbkMsQ0FBMkMsVUFBQyxVQUFEO21CQUN2QyxRQUFRLElBQVIsQ0FBYTs7a0JBQVEsT0FBUSxXQUFXLEVBQVgsRUFBZ0IsS0FBTSxXQUFXLEVBQVgsRUFBdEM7Z0JBQ1AsV0FBVyxJQUFYO2FBRE47U0FEdUMsQ0FBM0MsQ0FGSztBQU9MLGVBQU87O2NBQVEsT0FBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ1IsMkJBQVUsY0FBVjtBQUNBLDBCQUFXLGtCQUFDLENBQUQ7MkJBQU8sT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixFQUFFLE1BQUYsQ0FBUyxLQUFULElBQWtCLElBQWxCO2lCQUEzQixFQUZuQjtZQUdIOztrQkFBUSxPQUFNLEVBQU4sRUFBUjs7YUFIRztZQUlELE9BSkM7U0FBUCxDQVBLOzs7aUJBUlA7OzRCQUNxQjtBQUNuQixtQkFBTztBQUNILDZCQUFhLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNiLHVCQUFPLE1BQU0sU0FBTixDQUFnQixNQUFoQjtBQUNQLDBCQUFVLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjthQUhkLENBRG1COzs7O1dBRHJCO0VBQThDLE1BQU0sU0FBTjs7SUF3QjlDOzs7Ozs7Ozs7NENBU0YsMkJBQVM7QUFDTCxlQUFPOzt1QkFBTyxXQUFZLFVBQVUsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixXQUF0QixHQUFvQyxFQUFwQyxDQUFWO2VBQ2QsMENBQWtCLEtBQUssS0FBTCxDQUFXLE9BQVgsRUFEdkI7WUFFSDs7O2dCQUFPOzs7b0JBQ0g7OzBCQUFJLFdBQVUsYUFBVixFQUFKO3dCQUNJOzs7NEJBQU8sS0FBSyxLQUFMLENBQVcsSUFBWDt5QkFEWDt3QkFFSTs7OEJBQUssV0FBVSxZQUFWLEVBQUw7NEJBQThCLGVBQUUsNkJBQUYsQ0FBOUI7eUJBRko7cUJBREc7b0JBS0g7OzBCQUFJLFdBQVUsY0FBVixFQUFKO3dCQUNNLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsR0FBaEIsQ0FBb0IsVUFBQyxHQUFEO21DQUNsQjs7a0NBQUssV0FBVSxhQUFWLEVBQXdCLEtBQU0sSUFBSSxFQUFKLEVBQW5DO2dDQUNJOztzQ0FBSyxXQUFVLFFBQVYsRUFBTDtvQ0FBMEIsSUFBSSxXQUFKLENBQWdCLE1BQWhCO2lDQUQ5QjtnQ0FFSTs7c0NBQUssV0FBVSxNQUFWLEVBQUw7b0NBQXdCLElBQUksV0FBSixDQUFnQixJQUFoQjtpQ0FGNUI7O3lCQURrQixDQUQxQjtxQkFMRztpQkFBUDthQUZHO1NBQVAsQ0FESzs7O2lCQVRQOzs0QkFDcUI7QUFDbkIsbUJBQU87QUFDSCwwQkFBVSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7QUFDVixzQkFBTSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTixzQkFBTSxNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsVUFBdEI7QUFDTix5QkFBUyxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7YUFKYixDQURtQjs7OztXQURyQjtFQUFzQyxNQUFNLFNBQU47O0lBOEJ0Qzs7Ozs7NEJBQ3FCO0FBQ25CLG1CQUFPO0FBQ0gseUJBQVMsTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1QsdUJBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AsOEJBQWMsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO2FBSGxCLENBRG1COzs7O0FBT3ZCLGFBUkUsMEJBUUYsQ0FBWSxLQUFaLEVBQW1COzhCQVJqQiw0QkFRaUI7O3NEQUNmLDZCQUFNLEtBQU4sR0FEZTs7QUFFZixlQUFLLEtBQUwsR0FBYTtBQUNULGtCQUFNLElBQU47U0FESixDQUZlOztLQUFuQjs7QUFSRSx5Q0FjRixtREFBcUI7QUFDakIsWUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLEtBQXVCLElBQXZCLEVBQTZCO0FBQzdCLG1CQUQ2QjtTQUFqQztBQUdBLGFBQUssT0FBTCxHQUFlLGlCQUFRLFNBQVIsQ0FBa0IsVUFBVSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQTNDLENBSmlCO0FBS2pCLGFBQUssZUFBTCxHQUF1Qix1Q0FBbUIsV0FBbkIsQ0FBK0IsYUFBL0IsRUFBOEMsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUE5QyxDQUF2QixDQUxpQjtBQU1qQixhQUFLLGtCQUFMLEdBQTBCLHVDQUFtQixXQUFuQixDQUErQixXQUEvQixFQUE0QyxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQTVDLENBQTFCLENBTmlCO0FBT2pCLGFBQUssUUFBTCxHQVBpQjs7O0FBZG5CLHlDQXVCRix1REFBdUI7QUFDbkIsWUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLEtBQXVCLElBQXZCLEVBQTZCO0FBQzdCLG1CQUQ2QjtTQUFqQztBQUdBLCtDQUFtQixjQUFuQixDQUFrQyxLQUFLLGVBQUwsQ0FBbEMsQ0FKbUI7QUFLbkIsK0NBQW1CLGNBQW5CLENBQWtDLEtBQUssa0JBQUwsQ0FBbEMsQ0FMbUI7QUFNbkIseUJBQVEsU0FBUixDQUFrQixVQUFVLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBNUIsQ0FObUI7OztBQXZCckIseUNBK0JGLGlEQUFvQjtBQUNoQixZQUFJLFNBQVM7QUFDVCxrQkFBTTtBQUNGLDZCQUFhLEVBQWI7YUFESjtTQURBLENBRFk7QUFNaEIsWUFBSSxhQUFhLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsTUFBakIsRUFDWixLQURZLENBQ04sS0FBSyxLQUFMLENBQVcsT0FBWCxDQURNLENBRVosU0FGWSxDQUVGLE1BRkUsQ0FBYixDQU5ZO0FBU2hCLGFBQUssUUFBTCxDQUFjLEVBQUUsTUFBTSxVQUFOLEVBQWhCLEVBVGdCOzs7QUEvQmxCLHlDQTBDRiwrQkFBVztBQUNQLHNCQUFJLFVBQUosRUFBZ0I7QUFDWixxQkFBUyxLQUFLLEtBQUwsQ0FBVyxPQUFYO0FBQ1Qsc0JBQVU7QUFDTixzQkFBTTtBQUNGLGlDQUFhLEVBQWI7aUJBREo7YUFESjtTQUZKLEVBUUMsT0FSRCxDQVFTLE1BUlQsRUFRaUIsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFvQixLQUFLLE9BQUwsQ0FSckMsQ0FTQyxTQVRELENBU1csS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQVRYLEVBVUMsSUFWRCxHQURPOzs7QUExQ1QseUNBdURGLDJCQUFTOzs7O0FBQ0wsWUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLEtBQXVCLElBQXZCLEVBQTZCO0FBQzdCLG1CQUFPLElBQVAsQ0FENkI7U0FBakM7QUFHQSxZQUFJLEtBQUssS0FBTCxDQUFXLElBQVgsS0FBb0IsSUFBcEIsRUFBMEI7QUFDMUIsbUJBQU8sNkNBQVAsQ0FEMEI7U0FBOUI7QUFHQSxZQUFJLFNBQVMsRUFBVCxDQVBDO0FBUUwsWUFBSSxXQUFXLGVBQUssR0FBTCxjQUFZLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBeUIsVUFBQyxHQUFEO21CQUFTLElBQUksSUFBSjtTQUFULENBQXJDLENBQVgsQ0FSQzs7bUNBU0k7QUFDTCxtQkFBTyxJQUFQLENBQVksb0JBQUMsNkJBQUQ7QUFDUixxQkFBTSxJQUFOO0FBQ0Esc0JBQU8sT0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixNQUFyQixDQUE0QixVQUFDLEdBQUQ7MkJBQVMsSUFBSSxJQUFKLEtBQWEsSUFBYjtpQkFBVCxDQUFuQztBQUNBLHNCQUFPLElBQVA7QUFDQSwwQkFBVyxPQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLElBQXJCO0FBQ1gseUJBQVU7MkJBQU0sT0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixJQUF4QjtpQkFBTixFQUxGLENBQVo7VUFWQzs7QUFTTCxhQUFLLElBQUksT0FBTyxDQUFQLEVBQVUsUUFBUSxRQUFSLEVBQWtCLEVBQUUsSUFBRixFQUFRO2tCQUFwQyxNQUFvQztTQUE3QztBQVFBLGVBQU87O2NBQUssV0FBVSxlQUFWLEVBQUw7WUFDSDs7MkJBQVEsV0FBVSx1Q0FBVjtBQUNBLDBCQUFLLFFBQUw7bUJBQ0ssMENBQWtCOzJCQUFNLE9BQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsSUFBeEI7aUJBQU4sRUFGL0I7Z0JBR00sZUFBRSxvQ0FBRixDQUhOO2FBREc7WUFNRCxNQU5DO1NBQVAsQ0FqQks7OztXQXZEUDtFQUFtQyxNQUFNLFNBQU47O0lBbUZuQzs7Ozs7Ozs7OzBDQVFGLDJCQUFTOzs7QUFDTCxZQUFJLEtBQUssS0FBTCxDQUFXLGFBQVgsS0FBNkIsSUFBN0IsRUFBbUM7QUFDbkMsbUJBQU8sSUFBUCxDQURtQztTQUF2QztBQUdBLGVBQU87OztZQUNIOzsyQkFBUSxXQUFVLHdDQUFWO0FBQ0EsMEJBQUssUUFBTDttQkFDSywwQ0FBa0I7MkJBQU0sT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixJQUFwQjtpQkFBTixFQUYvQjtnQkFHTSxlQUFFLHFDQUFGLENBSE47YUFERztZQU1IO0FBQ0ksK0JBQWdCLEtBQUssS0FBTCxDQUFXLGFBQVg7QUFDaEIsMEJBQVMsaUJBQVQ7QUFDQSwrQkFBZ0IsdUJBQUMsS0FBRDsyQkFBVyxPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCO2lCQUFYO0FBQ2hCLCtCQUFnQixLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ2hCLHFCQUFNLEtBQUssS0FBTCxDQUFXLGFBQVgsRUFMVixDQU5HO1NBQVAsQ0FKSzs7O2lCQVJQOzs0QkFDcUI7QUFDbkIsbUJBQU87QUFDSCwrQkFBZSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDZix1QkFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUCwwQkFBVSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7YUFIZCxDQURtQjs7OztXQURyQjtFQUFvQyxNQUFNLFNBQU47O0lBNEJwQzs7Ozs7Ozs7OzZDQVFGLHFDQUFhLFdBQVc7QUFDcEIsWUFBSSxZQUFZLGtCQUFNLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBbEIsQ0FEZ0I7QUFFcEIsa0JBQVUsT0FBVixHQUFvQixTQUFwQixDQUZvQjtBQUdwQixrQkFBVSxJQUFWLEdBQWlCLElBQWpCLENBSG9CO0FBSXBCLGFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsU0FBcEIsRUFKb0I7OztBQVJ0Qiw2Q0FjRixxQ0FBYSxXQUFXO0FBQ3BCLFlBQUksWUFBWSxrQkFBTSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQWxCLENBRGdCO0FBRXBCLGtCQUFVLElBQVYsR0FBaUIsU0FBakIsQ0FGb0I7QUFHcEIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixTQUFwQixFQUhvQjs7O0FBZHRCLDZDQW1CRiwyQkFBUztBQUNMLGVBQU87OztZQUNIOzs7Z0JBQU0sZUFBRSw4QkFBRixDQUFOO2FBREc7WUFFSCxvQkFBQywwQkFBRDtBQUNJLDZCQUFjLEtBQUssS0FBTCxDQUFXLFdBQVg7QUFDZCx1QkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLE9BQTFCO0FBQ1IsMEJBQVcsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQVgsRUFISixDQUZHO1lBTUg7OztnQkFBTSxlQUFFLDhCQUFGLENBQU47YUFORztZQU9ILG9CQUFDLDBCQUFEO0FBQ0kscUJBQU0sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixPQUExQjtBQUNOLHlCQUFVLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsT0FBMUI7QUFDVix1QkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLElBQTFCO0FBQ1IsOEJBQWUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQWYsRUFKSixDQVBHO1NBQVAsQ0FESzs7O2lCQW5CUDs7NEJBQ3FCO0FBQ25CLG1CQUFPO0FBQ0gsZ0NBQWdCLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNoQiw2QkFBYSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDYiwwQkFBVSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7YUFIZCxDQURtQjs7OztXQURyQjtFQUF1QyxNQUFNLFNBQU47O0lBb0N2Qzs7Ozs7Ozs7O3lDQVFGLHFDQUFhLFdBQVc7QUFDcEIsWUFBSSxZQUFZLGtCQUFNLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBbEIsQ0FEZ0I7QUFFcEIsa0JBQVUsT0FBVixHQUFvQixTQUFwQixDQUZvQjtBQUdwQixhQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLFNBQXBCLEVBSG9COzs7QUFSdEIseUNBYUYsMkJBQVM7QUFDTCxlQUFPOzs7WUFDSDs7O2dCQUFNLGVBQUUsOEJBQUYsQ0FBTjthQURHO1lBRUgsb0JBQUMsMEJBQUQ7QUFDSSw2QkFBYyxLQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2QsdUJBQVEsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixPQUExQjtBQUNSLDBCQUFXLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFYLEVBSEosQ0FGRztTQUFQLENBREs7OztpQkFiUDs7NEJBQ3FCO0FBQ25CLG1CQUFPO0FBQ0gsZ0NBQWdCLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNoQiw2QkFBYSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDYiwwQkFBVSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7YUFIZCxDQURtQjs7OztXQURyQjtFQUFtQyxNQUFNLFNBQU47O0lBd0JuQzs7Ozs7Ozs7O29EQVFGLGlEQUFtQixXQUFXO0FBQzFCLFlBQUksWUFBWSxrQkFBTSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQWxCLENBRHNCO0FBRTFCLGtCQUFVLGFBQVYsR0FBMEIsU0FBMUIsQ0FGMEI7QUFHMUIsa0JBQVUsS0FBVixHQUFrQixJQUFsQixDQUgwQjtBQUkxQixhQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLFNBQXBCLEVBSjBCOzs7QUFSNUIsb0RBY0YsdUNBQWMsV0FBVztBQUNyQixZQUFJLFlBQVksa0JBQU0sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUFsQixDQURpQjtBQUVyQixrQkFBVSxLQUFWLEdBQWtCLFNBQWxCLENBRnFCO0FBR3JCLGFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsU0FBcEIsRUFIcUI7OztBQWR2QixvREFtQkYsMkJBQVM7QUFDTCxlQUFPOzs7WUFDSDs7O2dCQUFNLGVBQUUsb0NBQUYsQ0FBTjthQURHO1lBRUgsb0JBQUMscUNBQUQ7QUFDSSw2QkFBYyxLQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2QsdUJBQVEsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixhQUExQjtBQUNSLDBCQUFXLEtBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBWCxFQUhKLENBRkc7WUFNSDs7O2dCQUFNLGVBQUUsZ0NBQUYsQ0FBTjthQU5HO1lBT0gsb0JBQUMsMkJBQUQ7QUFDSSwrQkFBZ0IsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixhQUExQjtBQUNoQix1QkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLEtBQTFCO0FBQ1IsMEJBQVcsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQVgsRUFISixDQVBHO1NBQVAsQ0FESzs7O2lCQW5CUDs7NEJBQ3FCO0FBQ25CLG1CQUFPO0FBQ0gsZ0NBQWdCLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNoQiw2QkFBYSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDYiwwQkFBVSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7YUFIZCxDQURtQjs7OztXQURyQjtFQUE4QyxNQUFNLFNBQU47O0lBbUN2Qzs7Ozs7NEJBQ2M7QUFDbkIsbUJBQU87QUFDSCxnQ0FBZ0IsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2hCLDBCQUFVLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjthQUZkLENBRG1COzs7O0FBTXZCLGFBUFMsY0FPVCxDQUFZLEtBQVosRUFBbUI7OEJBUFYsZ0JBT1U7O3VEQUNmLDZCQUFNLEtBQU4sR0FEZTs7QUFFZixnQkFBSyxRQUFMLEdBQWdCLHlCQUFtQixRQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW5DLENBRmU7QUFHZixnQkFBSyxLQUFMLEdBQWE7QUFDVCx5QkFBYSxJQUFiO0FBQ0EsMEJBQWMsSUFBZDtTQUZKLENBSGU7QUFPZixnQkFBSyxRQUFMLEdBUGU7QUFRZiwrQ0FBbUIsV0FBbkIsQ0FBK0IsV0FBL0IsRUFBNEMsUUFBSyxpQkFBTCxDQUF1QixJQUF2QixTQUE1QyxFQVJlO0FBU2YsK0NBQW1CLFdBQW5CLENBQStCLGFBQS9CLEVBQThDLFFBQUssUUFBTCxDQUFjLElBQWQsU0FBOUMsRUFUZTs7S0FBbkI7O0FBUFMsNkJBa0JULCtCQUFXO0FBQ1Asc0JBQUksaUJBQUosRUFBdUIsRUFBRSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsY0FBWCxFQUEyQixVQUFVO0FBQzFFLDZCQUFhO0FBQ1QsMkJBQU8sRUFBUDtpQkFESjthQURnRSxFQUFwRSxFQUtLLE9BTEwsQ0FLYSxhQUxiLEVBSzRCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FMNUIsQ0FNSyxTQU5MLENBTWUsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQU5mLEVBT0ssSUFQTCxHQURPOzs7QUFsQkYsNkJBNEJULG1DQUFhOzs7QUFDVCxZQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsWUFBWCxJQUEyQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBRDdCO0FBRVQsWUFBSSxDQUFDLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBRCxFQUE4QjtBQUM5QixtQkFEOEI7U0FBbEM7QUFHQSxzQkFBSSxpQkFBSixFQUF1QjtBQUNuQiw0QkFBZ0IsS0FBSyxLQUFMLENBQVcsY0FBWDtBQUNoQixrQkFBTSxFQUFFLGFBQWEsS0FBSyxLQUFMLENBQVcsWUFBWCxFQUFyQjtTQUZKLEVBR0csU0FISCxDQUdhO21CQUFNLFFBQUssUUFBTCxDQUFjO0FBQzdCLDhCQUFjLElBQWQ7YUFEZTtTQUFOLENBSGIsQ0FLSSxJQUxKLEdBTFM7OztBQTVCSiw2QkF3Q1QsaUNBQVk7QUFDUixhQUFLLFFBQUwsQ0FBYztBQUNWLDBCQUFjLElBQWQ7U0FESixFQURROzs7QUF4Q0gsNkJBNkNULGlEQUFvQjtBQUNoQixhQUFLLFFBQUwsQ0FBYztBQUNWLHlCQUFhLGlCQUFRLEdBQVIsQ0FBWSxhQUFaLEVBQ1IsS0FEUSxDQUNGLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FERSxDQUVSLFNBRlEsQ0FFRTtBQUNQLDZCQUFhO0FBQ1QsMkJBQU8sRUFBUDtpQkFESjthQUhLLENBQWI7U0FESixFQURnQjs7O0FBN0NYLDZCQXdEVCwyREFBd0IsZUFBZTtBQUNuQyxnQkFBUSxhQUFSO0FBQ0ksaUJBQUssTUFBTDtBQUNJLHVCQUFPLEVBQVAsQ0FESjtBQURKLGlCQUdTLFdBQUw7QUFDSSx1QkFBTztBQUNILDZCQUFTLElBQVQ7QUFDQSwwQkFBTSxDQUFOO2lCQUZKLENBREo7QUFISixpQkFRUyxNQUFMO0FBQ0ksdUJBQU87QUFDSCw2QkFBUyxJQUFUO2lCQURKLENBREo7QUFSSixpQkFZUyxrQkFBTDtBQUNJLHVCQUFPO0FBQ0gsbUNBQWUsSUFBZjtBQUNBLDJCQUFPLElBQVA7aUJBRkosQ0FESjtBQVpKLFNBRG1DOzs7QUF4RDlCLDZCQTRFVCxpQ0FBVyxTQUFTO0FBQ2hCLFlBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxZQUFYLEdBQTBCLGtCQUFNLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBaEMsR0FBMkQsa0JBQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFqRSxDQURLO0FBRWhCLGVBQU8sUUFBUSxJQUFSLENBQVAsQ0FGZ0I7QUFHaEIsYUFBSyxRQUFMLENBQWM7QUFDViwwQkFBYyxJQUFkO1NBREosRUFIZ0I7OztBQTVFWCw2QkFtRlQscUNBQWEsUUFBUTs7O0FBQ2pCLGFBQUssVUFBTCxDQUFnQixVQUFDLElBQUQsRUFBVTtBQUN0QixnQkFBSSxLQUFLLFNBQUwsS0FBbUIsTUFBbkIsRUFBMkI7QUFDM0Isb0JBQUksY0FBYyxRQUFLLFFBQUwsQ0FBYyxpQkFBZCxDQUFnQyxNQUFoQyxDQUFkLENBRHVCO0FBRTNCLG9CQUFJLGdCQUFnQixZQUFZLFFBQVosQ0FGTztBQUczQix1QkFBTztBQUNILCtCQUFXLE1BQVg7QUFDQSxvQ0FBZ0IsUUFBSyx1QkFBTCxDQUE2QixhQUE3QixDQUFoQjtpQkFGSixDQUgyQjthQUEvQjtBQVFBLG1CQUFPLElBQVAsQ0FUc0I7U0FBVixDQUFoQixDQURpQjs7O0FBbkZaLDZCQWdHVCx1REFBc0IsV0FBVztBQUM3QixhQUFLLFVBQUwsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsaUJBQUssY0FBTCxHQUFzQixTQUF0QixDQURzQjtBQUV0QixtQkFBTyxJQUFQLENBRnNCO1NBQVYsQ0FBaEIsQ0FENkI7OztBQWhHeEIsNkJBc0dULDZDQUFpQixNQUFNO0FBQ25CLFlBQUksZ0JBQWdCLEtBQUssUUFBTCxDQUFjLGlCQUFkLENBQWdDLEtBQUssU0FBTCxDQUFoQyxDQUFnRCxRQUFoRCxDQUREO0FBRW5CLGdCQUFRLGFBQVI7QUFDQSxpQkFBSyxNQUFMO0FBQ0ksdUJBQU8sSUFBUCxDQURKO0FBREEsaUJBR0ssTUFBTCxDQUhBO0FBSUEsaUJBQUssV0FBTDtBQUNJLHVCQUFPLEtBQUssY0FBTCxDQUFvQixPQUFwQixLQUFnQyxJQUFoQyxDQURYO0FBSkEsaUJBTUssa0JBQUw7QUFDSSx1QkFBTyxLQUFLLGNBQUwsQ0FBb0IsYUFBcEIsS0FBc0MsSUFBdEMsQ0FEWDtBQU5BLFNBRm1COzs7QUF0R2QsNkJBa0hULHVDQUFjLE1BQU07QUFDaEIsWUFBSSxnQkFBZ0IsS0FBSyxRQUFMLENBQWMsaUJBQWQsQ0FBZ0MsS0FBSyxTQUFMLENBQWhDLENBQWdELFFBQWhELENBREo7QUFFaEIsZ0JBQVEsYUFBUjtBQUNJLGlCQUFLLE1BQUw7QUFDSSx1QkFBTyxJQUFQLENBREo7QUFESixpQkFHUyxXQUFMO0FBQ0ksdUJBQU8sb0JBQUMsOEJBQUQ7QUFDSCx5QkFBTSxLQUFLLFNBQUw7QUFDTixpQ0FBYyxLQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2Qsb0NBQWlCLEtBQUssY0FBTDtBQUNqQiw4QkFBVyxLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQWdDLElBQWhDLENBQVgsRUFKRyxDQUFQLENBREo7QUFISixpQkFTUyxNQUFMO0FBQ0ksdUJBQU8sb0JBQUMsMEJBQUQ7QUFDSCx5QkFBTSxLQUFLLFNBQUw7QUFDTixpQ0FBYyxLQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2Qsb0NBQWlCLEtBQUssY0FBTDtBQUNqQiw4QkFBVyxLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQWdDLElBQWhDLENBQVgsRUFKRyxDQUFQLENBREo7QUFUSixpQkFlUyxrQkFBTDtBQUNJLHVCQUFPLG9CQUFDLHFDQUFEO0FBQ0gseUJBQU0sS0FBSyxTQUFMO0FBQ04saUNBQWMsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNkLG9DQUFpQixLQUFLLGNBQUw7QUFDakIsOEJBQVcsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUFnQyxJQUFoQyxDQUFYLEVBSkcsQ0FBUCxDQURKO0FBZkosU0FGZ0I7OztBQWxIWCw2QkEySVQsMkJBQVM7OztBQUNMLFlBQUksS0FBSyxLQUFMLENBQVcsV0FBWCxLQUEyQixJQUEzQixFQUFpQztBQUNqQyxtQkFBTyw2Q0FBUCxDQURpQztTQUFyQztBQUdBLFlBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxZQUFYLElBQTJCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FKakM7QUFLTCxlQUFPOztjQUFLLFdBQVUsaUJBQVYsRUFBTDtZQUNIOztrQkFBSyxXQUFVLFVBQVYsRUFBTDtnQkFDTSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE9BQXZCLENBQStCLEdBQS9CLENBQW1DLFVBQUMsV0FBRDsyQkFDakM7O21DQUFLLFdBQVksVUFBVSxZQUFZLEVBQVosS0FBbUIsS0FBSyxTQUFMLEdBQWlCLFNBQXBDLEdBQWdELEVBQWhELENBQVY7QUFDWixpQ0FBTSxZQUFZLEVBQVo7MkJBQ0YsdUNBQWU7bUNBQU0sUUFBSyxZQUFMLENBQWtCLFlBQVksRUFBWjt5QkFBeEIsRUFGeEI7d0JBR00sWUFBWSxJQUFaOztpQkFKMkIsQ0FEekM7YUFERztZQVVIOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDSTs7c0JBQUssV0FBVSxVQUFWLEVBQUw7b0JBQ00sS0FBSyxhQUFMLENBQW1CLElBQW5CLENBRE47aUJBREo7Z0JBSU0sS0FBSyxLQUFMLENBQVcsWUFBWCxHQUNJOztzQkFBSyxXQUFVLFNBQVYsRUFBTDtvQkFDRTs7bUNBQVEsTUFBSyxRQUFMO0FBQ0EsdUNBQVUsZ0JBQVY7MkJBQ0ksdUNBQWUsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQixJQUFwQixDQUFmLEVBRlo7d0JBR00sZUFBRSx3QkFBRixDQUhOO3FCQURGO29CQU1FOzttQ0FBUSxNQUFLLFFBQUw7QUFDQSx1Q0FBVSxpQkFBVjtBQUNBLHNDQUFXLENBQUMsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixDQUFEOzJCQUNQLHVDQUFlLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixJQUFyQixDQUFmLEVBSFo7d0JBSU0sZUFBRSx1QkFBRixDQUpOO3FCQU5GO2lCQURKLEdBY0ksSUFkSjthQWRIO1NBQVAsQ0FMSzs7O1dBM0lBO0VBQXVCLE1BQU0sU0FBTjs7Ozs7Ozs7O0lDbFQ5QjtBQUNGLGFBREUsUUFDRixDQUFZLFFBQVosRUFBc0I7OEJBRHBCLFVBQ29COztBQUNsQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FEa0I7QUFFbEIsYUFBSyxNQUFMLEdBQWMsSUFBZCxDQUZrQjtBQUdsQixhQUFLLE1BQUwsR0FBYyxJQUFkLENBSGtCO0FBSWxCLGFBQUssTUFBTCxHQUFjLElBQWQsQ0FKa0I7QUFLbEIsYUFBSyxNQUFMLEdBQWMsSUFBZCxDQUxrQjtBQU1sQixhQUFLLE9BQUwsR0FBZSxJQUFmLENBTmtCO0FBT2xCLGFBQUssSUFBTCxHQUFZLEVBQVosQ0FQa0I7QUFRbEIsYUFBSyxXQUFMLEdBQW1CLFVBQW5CLENBUmtCO0FBU2xCLGFBQUssTUFBTCxHQUFjO0FBQ1Ysb0JBQVE7QUFDSiw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsb0NBQWY7YUFGSjtBQUlBLHFCQUFTO0FBQ0wsbUNBQW1CLFVBQW5CO0FBQ0EseUJBQVMsTUFBVDthQUZKO0FBSUEsa0JBQU07QUFDRixxQ0FBcUIsT0FBckI7YUFESjtBQUdBLHNCQUFVO0FBQ04sMkJBQVcsU0FBWDthQURKO0FBR0Esc0NBQTBCO0FBQ3RCLG9DQUFvQixPQUFwQjtBQUNBLGlDQUFpQixDQUFqQjthQUZKO0FBSUEsa0JBQU07QUFDRiw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsTUFBZjtBQUNBLDhCQUFjLFFBQWQ7QUFDQSw4QkFBYyxNQUFkO2FBSko7QUFNQSxrQkFBTTtBQUNGLDZCQUFhLE1BQWI7QUFDQSwrQkFBZSxNQUFmO0FBQ0EsOEJBQWMsUUFBZDtBQUNBLDhCQUFjLEtBQWQ7YUFKSjtBQU1BLGtCQUFNO0FBQ0YsNkJBQWEsTUFBYjtBQUNBLCtCQUFlLE1BQWY7QUFDQSw4QkFBYyxRQUFkO0FBQ0EsOEJBQWMsS0FBZDthQUpKO0FBTUEsb0JBQVE7QUFDSiw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsTUFBZjtBQUNBLDBCQUFVLFlBQVY7YUFISjtBQUtBLG9CQUFRO0FBQ0osNkJBQWEsTUFBYjtBQUNBLCtCQUFlLE1BQWY7QUFDQSwwQkFBVSxPQUFWO2FBSEo7QUFLQSx1QkFBVztBQUNQLGlDQUFpQixpQkFBakI7QUFDQSw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsTUFBZjtBQUNBLDBCQUFVLENBQVY7QUFDQSxrQ0FBa0IsS0FBbEI7QUFDQSxpQ0FBaUIsTUFBakI7QUFDQSw4QkFBYyxRQUFkO2FBUEo7QUFTQSxpQkFBSztBQUNELDBCQUFVLENBQVY7QUFDQSwyQkFBVyxDQUFYO2FBRko7QUFJQSxrQkFBTSxFQUFFLGNBQWMsQ0FBZCxFQUFpQixlQUFlLENBQWYsRUFBekI7QUFDQSx1QkFBVztBQUNQLDZCQUFhLE1BQWI7YUFESjtBQUdBLHVCQUFXO0FBQ1Asa0NBQWtCLEtBQWxCO2FBREo7QUFHQSwwQkFBYyxFQUFFLGNBQWMsTUFBZCxFQUFoQjtBQUNBLDJCQUFlLEVBQUUsY0FBYyxPQUFkLEVBQWpCO0FBQ0EsNEJBQWdCLEVBQUUsY0FBYyxRQUFkLEVBQWxCO0FBQ0Esc0RBQTBDO0FBQ3RDLDBCQUFVLGlCQUFWO2FBREo7U0F0RUosQ0FUa0I7QUFtRmxCLGFBQUssV0FBTCxHQW5Ga0I7S0FBdEI7O0FBREUsdUJBc0ZGLHFDQUFjO0FBQ1YsYUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLEtBQUssR0FBTCxFQUFVLEVBQUUsQ0FBRixFQUFLO0FBQzNCLGlCQUFLLFFBQUwsQ0FBYyxRQUFRLENBQVIsRUFBVyxPQUF6QixFQUFrQyxJQUFJLEdBQUosQ0FBbEMsQ0FEMkI7U0FBL0I7OztBQXZGRix1QkE0RkYsNkJBQVMsVUFBVSxLQUFLLE9BQU87QUFDM0IsWUFBSSxDQUFDLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBRCxFQUF3QjtBQUN4QixpQkFBSyxNQUFMLENBQVksUUFBWixJQUF3QixFQUF4QixDQUR3QjtTQUE1QjtBQUdBLGFBQUssTUFBTCxDQUFZLFFBQVosRUFBc0IsR0FBdEIsSUFBNkIsS0FBN0IsQ0FKMkI7QUFLM0IsZUFBTyxJQUFQLENBTDJCOzs7QUE1RjdCLHVCQW1HRiwrQkFBVSxRQUFRO0FBQ2QsYUFBSyxNQUFMLEdBQWMsTUFBZCxDQURjO0FBRWQsZUFBTyxJQUFQLENBRmM7OztBQW5HaEIsdUJBdUdGLCtCQUFVLFFBQVE7QUFDZCxhQUFLLE1BQUwsR0FBYyxNQUFkLENBRGM7QUFFZCxlQUFPLElBQVAsQ0FGYzs7O0FBdkdoQix1QkEyR0YsK0JBQVUsUUFBUTtBQUNkLGFBQUssTUFBTCxHQUFjLE1BQWQsQ0FEYztBQUVkLGVBQU8sSUFBUCxDQUZjOzs7QUEzR2hCLHVCQStHRiwrQkFBVSxRQUFRO0FBQ2QsYUFBSyxNQUFMLEdBQWMsTUFBZCxDQURjO0FBRWQsZUFBTyxJQUFQLENBRmM7OztBQS9HaEIsdUJBbUhGLGlDQUFXLFNBQVM7QUFDaEIsYUFBSyxPQUFMLEdBQWUsT0FBZixDQURnQjtBQUVoQixlQUFPLElBQVAsQ0FGZ0I7OztBQW5IbEIsdUJBdUhGLDJCQUFRLE1BQU07QUFDVixhQUFLLElBQUwsR0FBWSxJQUFaLENBRFU7QUFFVixlQUFPLElBQVAsQ0FGVTs7O0FBdkhaLHVCQTJIRix5Q0FBZSxhQUFhO0FBQ3hCLGFBQUssV0FBTCxHQUFtQixXQUFuQixDQUR3QjtBQUV4QixlQUFPLElBQVAsQ0FGd0I7OztBQTNIMUIsdUJBZ0lGLDZDQUFpQixVQUFVLE1BQU07QUFDN0IsWUFBSSxZQUFZLE9BQU8sbUJBQVAsQ0FBMkIsSUFBM0IsRUFBaUMsR0FBakMsQ0FBcUMsVUFBQyxHQUFEO21CQUFTLE1BQU0sSUFBTixHQUFhLEtBQUssR0FBTCxDQUFiLEdBQXlCLElBQXpCO1NBQVQsQ0FBakQsQ0FEeUI7QUFFN0IsZUFBTyxXQUFXLEtBQVgsR0FBbUIsVUFBVSxJQUFWLENBQWUsR0FBZixDQUFuQixHQUF5QyxJQUF6QyxDQUZzQjs7O0FBaEkvQix1QkFvSUYsdUNBQWU7OztBQUNYLFlBQUksYUFBYSxPQUFPLG1CQUFQLENBQTJCLEtBQUssTUFBTCxDQUEzQixDQUF3QyxHQUF4QyxDQUE0QyxVQUN4RCxRQUFEO21CQUFjLE1BQUssZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBZ0MsTUFBSyxNQUFMLENBQVksUUFBWixDQUFoQztTQUFkLENBQ0YsSUFGMkQsQ0FFdEQsSUFGc0QsQ0FBNUMsQ0FBYixDQURPO0FBSVgsZUFBTyxXQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBUCxDQUpXOzs7QUFwSWIsdUJBMElGLG1DQUFhO0FBQ1QsWUFBSSxNQUFNLEtBQUssWUFBTCxFQUFOLENBREs7QUFFVCxZQUFJLFNBQVMsS0FBSyxNQUFMLEdBQWMsdUJBQXVCLEtBQUssTUFBTCxHQUFjLE1BQXJDLEdBQThDLEVBQTVELENBRko7QUFHVCxZQUFJLFNBQVMsS0FBSyxNQUFMLEdBQWMsU0FBUyxLQUFLLE1BQUwsR0FBYyxPQUF2QixHQUFpQyxFQUEvQyxDQUhKO0FBSVQsWUFBSSxTQUFTLEtBQUssTUFBTCxHQUFjLFNBQVMsS0FBSyxNQUFMLEdBQWMsT0FBdkIsR0FBaUMsRUFBL0MsQ0FKSjtBQUtULFlBQUksU0FBUyxLQUFLLE1BQUwsR0FBYyxTQUFTLEtBQUssTUFBTCxHQUFjLE9BQXZCLEdBQWlDLEVBQS9DLENBTEo7QUFNVCxZQUFJLFNBQVMsTUFBQyxJQUFVLE1BQVYsSUFBb0IsTUFBcEIsSUFBOEIsTUFBOUIsR0FBd0MsOEJBQXpDLEdBQTBFLEVBQTFFLENBTko7QUFPVCxlQUFPLHNCQUNILGNBREcsR0FFQywwQkFGRCxHQUdDLFdBSEQsR0FHZSxHQUhmLEdBR3FCLGNBSHJCLEdBSUgsaUJBSkcsR0FLQyxNQUxELEdBTUMsTUFORCxHQU9DLE1BUEQsR0FRQyxNQVJELEdBU0MsTUFURCxHQVVDLEtBQUssSUFBTCxHQUNKLGdCQVhHLENBUEU7OztBQTFJWCx1QkErSkYsdUJBQU87QUFDSCxZQUFJLE9BQU8sS0FBSyxVQUFMLEVBQVAsQ0FERDtBQUVILFlBQUksVUFBVSxLQUFLLE9BQUwsS0FBaUIsS0FBSyxXQUFMLEtBQXFCLFVBQXJCLEdBQWtDLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixDQUFsQyxHQUFxRCxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsQ0FBUixFQUFXLEVBQVgsQ0FBckQsQ0FBakIsQ0FGWDtBQUdILFlBQUksWUFBWSxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFDbEMseUJBQWEsS0FBSyxXQUFMO0FBQ2IscUJBQVM7QUFDTCxxQkFBUSxLQUFLLEtBQUwsQ0FBVyxRQUFRLENBQVIsSUFBYSxNQUFiLENBQVgsQ0FBZ0MsUUFBaEMsRUFBUjtBQUNBLHVCQUFRLEtBQUssS0FBTCxDQUFXLFFBQVEsQ0FBUixJQUFhLE1BQWIsQ0FBWCxDQUFnQyxRQUFoQyxFQUFSO0FBQ0Esd0JBQVEsS0FBSyxLQUFMLENBQVcsUUFBUSxDQUFSLElBQWEsTUFBYixDQUFYLENBQWdDLFFBQWhDLEVBQVI7QUFDQSxzQkFBUSxLQUFLLEtBQUwsQ0FBVyxRQUFRLENBQVIsSUFBYSxNQUFiLENBQVgsQ0FBZ0MsUUFBaEMsRUFBUjthQUpKO1NBRlksQ0FBWixDQUhEO0FBWUgsZUFBTyxTQUFQLEVBQWtCLEtBQUssUUFBTCxDQUFsQixDQVpHOzs7V0EvSkw7OztBQWdMQyxJQUFJLHNCQUFPLFNBQVAsSUFBTyxDQUFDLEVBQUQ7V0FBUSxJQUFJLFFBQUosQ0FBYSxFQUFiO0NBQVI7Ozs7Ozs7OztRQ2hMRjs7OztBQUFULFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0I7QUFDdkIsUUFBSSxRQUFPLGlEQUFQLEtBQWUsUUFBZixFQUF5QjtBQUN6QixlQUFPLEdBQVAsQ0FEeUI7S0FBN0I7QUFHQSxXQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBWCxDQUFQLENBSnVCO0NBQXBCOztJQU9EO0FBQ0YsYUFERSxZQUNGLEdBQWM7OEJBRFosY0FDWTs7QUFDVixhQUFLLE1BQUwsR0FBYyxDQUFkLENBRFU7S0FBZDs7QUFERSwyQkFJRixtQkFBSSxHQUFHLEdBQUc7QUFDTixZQUFJLEtBQUssTUFBTCxLQUFnQixDQUFoQixFQUFtQjtBQUNuQixnQkFBSSxJQUFJLENBQUosRUFBTztBQUNQLHFCQUFLLE1BQUwsR0FBYyxDQUFDLENBQUQsQ0FEUDthQUFYLE1BRU8sSUFBSSxJQUFJLENBQUosRUFBTztBQUNkLHFCQUFLLE1BQUwsR0FBYyxDQUFkLENBRGM7YUFBWDtTQUhYO0FBT0EsZUFBTyxJQUFQLENBUk07OztBQUpSLDJCQWNGLHFCQUFNO0FBQ0YsZUFBTyxLQUFLLE1BQUwsQ0FETDs7O1dBZEo7OztBQW1CQyxJQUFJLDhCQUFXLFNBQVgsUUFBVztXQUFNLElBQUksWUFBSjtDQUFOOzs7Ozs7Ozs7O0FDeEJmLElBQUksNkJBQUo7QUFDQSxJQUFJLGtDQUFhLCtCQUFiOzs7Ozs7UUNISztBQUFULFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUNoQyxhQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakMsRUFBcUM7QUFDakMsWUFBSSxJQUFJLElBQUksR0FBSixDQUR5QjtBQUVqQyxZQUFJLEtBQUssS0FBTCxDQUFXLElBQUksRUFBSixDQUFYLEtBQXVCLENBQXZCLEVBQTBCO0FBQzFCLG1CQUFPLEVBQVAsQ0FEMEI7U0FBOUI7QUFHQSxZQUFJLElBQUksRUFBSixLQUFXLENBQVgsRUFBYztBQUNkLG1CQUFPLEVBQVAsQ0FEYztTQUFsQjtBQUdBLFlBQUksSUFBSSxFQUFKLElBQVUsQ0FBVixJQUFlLElBQUksRUFBSixLQUFXLENBQVgsRUFBYztBQUM3QixtQkFBTyxFQUFQLENBRDZCO1NBQWpDO0FBR0EsZUFBTyxFQUFQLENBWGlDO0tBQXJDOztBQWNBLFFBQUksVUFBVTtBQUNWLGlCQUFTO0FBQ0wsc0JBQVU7QUFDTix5QkFBUyxlQUFDLE9BQUQsRUFBVSxJQUFWOzJCQUFtQjs7MEJBQUssV0FBVSxPQUFWLEVBQUw7d0JBQ3hCOzs7NEJBQUc7Ozs7Z0NBQWMsT0FBZDs2QkFBSDs7NEJBQW1DLElBQW5DOzt5QkFEd0I7d0JBRXhCOzs7O3lCQUZ3Qjt3QkFHeEI7Ozs7eUJBSHdCO3dCQUl4Qjs7Ozs0QkFBcUI7O2tDQUFHLE1BQUssd0JBQUwsRUFBOEIsUUFBTyxRQUFQLEVBQWpDOzs2QkFBckI7eUJBSndCOztpQkFBbkI7QUFNVCwrQ0FBK0Isa0VBQS9CO0FBQ0EsMENBQTBCLHNFQUExQjtBQUNBLDhDQUE4QixxREFBOUI7QUFDQSxnQ0FBZ0IsbUNBQWhCO0FBQ0Esc0NBQXNCOzs7b0JBQ2xCOzs7d0JBQUc7Ozs7eUJBQUg7cUJBRGtCO29CQUVsQjs7OztxQkFGa0I7b0JBS2xCOzs7O3FCQUxrQjtpQkFBdEI7YUFYSjtBQWtCQSw0QkFBZ0I7QUFDWiw4QkFBYyxZQUFkO0FBQ0Esc0NBQXNCLHVCQUF0QjtBQUNBLHlCQUFTLGlCQUFUO0FBQ0EsbUNBQW1CLDhCQUFuQjtBQUNBLHlCQUFTLGdCQUFUO0FBQ0EsK0JBQWUsZUFBZjtBQUNBLDZCQUFhLGlCQUFiO0FBQ0EsNkJBQWEsaUJBQWI7QUFDQSw2QkFBYSxtQkFBYjtBQUNBLHlCQUFTLFNBQVQ7QUFDQSx3QkFBUSxFQUFSO0FBQ0EsNkJBQWEsbUJBQWI7QUFDQSw2QkFBYSxpQ0FBYjthQWJKO0FBZUEsdUJBQVc7QUFDUCw0QkFBWSxlQUFaO0FBQ0EsbUNBQW1CLHNCQUFuQjtBQUNBLDZDQUE2QixrQkFBN0I7QUFDQSxrQ0FBa0IscUJBQWxCO0FBQ0EsNkJBQWEsZ0JBQWI7QUFDQSxtQ0FBbUIsb0JBQW5CO0FBQ0EsNEJBQVksY0FBWjtBQUNBLGlDQUFpQixlQUFqQjtBQUNBLDhCQUFjLGVBQWQ7QUFDQSxnQ0FBZ0IsZUFBaEI7QUFDQSxnQ0FBZ0IsbUJBQWhCO0FBQ0EsMEJBQVUsZ0JBQVY7QUFDQSwwQkFBVSxlQUFWO0FBQ0EsdUNBQXVCLDhCQUF2QjtBQUNBLDZCQUFhLHNCQUFiO0FBQ0EsbUNBQW1CLDhCQUFuQjtBQUNBLGtDQUFrQixxQ0FBbEI7QUFDQSxrQ0FBa0Isd0JBQWxCO0FBQ0EseUNBQXlCLDBCQUF6QjtBQUNBLGlDQUFpQixZQUFqQjtBQUNBLG1DQUFtQixpQkFBbkI7QUFDQSw4QkFBYyxzQkFBZDthQXRCSjtBQXdCQSx3QkFBWTtBQUNSLCtCQUFlLDRDQUFmO0FBQ0Esc0NBQXNCLG1EQUF0QjtBQUNBLHFDQUFxQixpREFBckI7QUFDQSxnQ0FBZ0IsOENBQWhCO0FBQ0Esc0NBQXNCLGtEQUF0QjtBQUNBLGtDQUFrQixnREFBbEI7QUFDQSwrQkFBZSwyQ0FBZjtBQUNBLG1DQUFtQixrRUFBbkI7QUFDQSxrQ0FBa0IsMkRBQWxCO0FBQ0EsbUNBQW1CLDJGQUFuQjthQVZKO0FBWUEsdUJBQVc7QUFDUCx5QkFBUyxhQUFUO0FBQ0EsZ0NBQWdCLHVCQUFoQjtBQUNBLHNDQUFzQix1Q0FBdEI7QUFDQSx5QkFBUyxpQkFBVDtBQUNBLG9DQUFvQixvQkFBcEI7QUFDQSxpQ0FBaUIsa0JBQWpCO0FBQ0Esb0NBQW9CLHdCQUFwQjtBQUNBLCtDQUErQix3QkFBL0I7QUFDQSxzQ0FBc0IsdUJBQXRCO0FBQ0EsdUNBQXVCLHlCQUF2QjtBQUNBLDJDQUEyQiwyQkFBM0I7QUFDQSxxQ0FBcUIsb0NBQXJCO0FBQ0Esc0NBQXNCLHVCQUF0QjtBQUNBLDBDQUEwQix5QkFBMUI7QUFDQSxxQ0FBcUIsNkNBQXJCO0FBQ0EsdUNBQXVCLHVCQUF2QjtBQUNBLHNDQUFzQixzQ0FBdEI7QUFDQSxzQ0FBc0IsdUJBQXRCO0FBQ0EsaUNBQWlCLGtCQUFqQjtBQUNBLDBCQUFVLG1CQUFWO0FBQ0EscUNBQXFCLG9CQUFyQjtBQUNBLG1DQUFtQixxQkFBbkI7QUFDQSwyQ0FBMkIsd0JBQTNCO0FBQ0EsZ0NBQWdCLGdCQUFoQjtBQUNBLGtDQUFrQixvQkFBbEI7QUFDQSw4QkFBYyxnQkFBZDtBQUNBLDhCQUFjLG1CQUFkO0FBQ0EsZ0NBQWdCLGlCQUFoQjtBQUNBLG1DQUFtQix5QkFBbkI7QUFDQSxrQ0FBa0IseUJBQWxCO2FBOUJKO0FBZ0NBLHNCQUFVO0FBQ04seUJBQVMsT0FBVDtBQUNBLG9DQUFvQixpQkFBcEI7QUFDQSxvQ0FBb0IsMkJBQXBCO0FBQ0EsOEJBQWMsWUFBZDtBQUNBLHFDQUFxQixvQ0FBckI7QUFDQSwrQkFBZSxZQUFmO0FBQ0Esa0NBQWtCLHdCQUFsQjtBQUNBLHNDQUFzQixxQkFBdEI7QUFDQSxpQ0FBaUIsMEJBQWpCO0FBQ0EsNkNBQTZCLDZDQUE3QjtBQUNBLHlDQUF5QixpQ0FBekI7QUFDQSwrQ0FBK0IsNEJBQS9CO0FBQ0Esa0NBQWtCLDBCQUFsQjtBQUNBLDBCQUFVLE9BQVY7QUFDQSxxQ0FBcUIsa0JBQXJCO0FBQ0EsZ0NBQWdCLFdBQWhCO0FBQ0EsOEJBQWMsNENBQWQ7QUFDQSx3QkFBUSxtQkFBUjtBQUNBLHVDQUF1QiwrQkFBdkI7QUFDQSxnQ0FBZ0IsOEJBQWhCO0FBQ0EsdUJBQU8sS0FBUDtBQUNBLHlCQUFTLE1BQVQ7YUF0Qko7QUF3QkEsd0JBQVk7QUFDUixvQ0FBb0Isa0NBQXBCO2FBREo7QUFHQSxvQkFBUTtBQUNKLHNDQUFzQix1QkFBdEI7QUFDQSxzQ0FBc0IsdUJBQXRCO0FBQ0EsaUNBQWlCLGtCQUFqQjtBQUNBLGdDQUFnQixvQkFBaEI7QUFDQSwyQ0FBMkIsd0JBQTNCO0FBQ0Esc0NBQXNCLHlCQUF0QjtBQUNBLGlDQUFpQixvQkFBakI7QUFDQSxvQ0FBb0IseUJBQXBCO0FBQ0EsZ0NBQWdCLG1CQUFoQjtBQUNBLDhCQUFjLGdCQUFkO2FBVko7QUFZQSx1QkFBVztBQUNQLGtDQUFrQjsyQkFBSyxFQUFFLFFBQUYsS0FBZSxXQUFmLEdBQTZCLGFBQWEsQ0FBYixFQUFnQixFQUFoQixFQUFvQixHQUFwQixFQUF5QixJQUF6QixDQUE3QjtpQkFBTDtBQUNsQiwrQkFBZSxxQkFBQyxDQUFELEVBQUksQ0FBSjsyQkFBVSxFQUFFLFFBQUYsS0FBZSxZQUFmLEdBQThCLGFBQWEsQ0FBYixFQUFnQixFQUFoQixFQUFvQixHQUFwQixFQUF5QixJQUF6QixDQUE5QixJQUFnRSxJQUFJLENBQUosV0FBYyxnQkFBWSxhQUFhLENBQWIsRUFBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBNEIsSUFBNUIsT0FBMUIsR0FBa0UsRUFBbEUsQ0FBaEU7aUJBQVY7QUFDZixxQ0FBcUIsMkJBQUMsQ0FBRCxFQUFJLENBQUo7MkJBQVUsRUFBRSxRQUFGLEtBQWUsWUFBZixHQUE4QixhQUFhLENBQWIsRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsSUFBekIsQ0FBOUIsSUFBZ0UsSUFBSSxDQUFKLFdBQWMsWUFBZCxHQUEwQixFQUExQixDQUFoRTtpQkFBVjtBQUNyQix3Q0FBd0I7MkJBQUssV0FBVyxDQUFYLEdBQWUsV0FBZixHQUE2QixhQUFhLENBQWIsRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsSUFBekIsQ0FBN0I7aUJBQUw7YUFKNUI7QUFNQSw0QkFBZ0I7QUFDWiw4QkFBYyxZQUFkO0FBQ0EseUJBQVMsUUFBVDtBQUNBLDZCQUFhLGlCQUFiO0FBQ0EsNkJBQWEsaUJBQWI7QUFDQSw2QkFBYSxtQkFBYjtBQUNBLHNDQUFzQix1QkFBdEI7YUFOSjtTQW5KSjtBQTRKQSxrQkFBVTtBQUNOLHFCQUFTO0FBQ0wscUNBQXFCLDRCQUFyQjthQURKO0FBR0EsbUJBQU87QUFDSCwwQ0FBMEIsdURBQTFCO0FBQ0EsaUNBQWlCLHVCQUFDLE1BQUQ7MkJBQVkseUJBQXlCLE1BQXpCLEdBQWtDLGFBQWxDO2lCQUFaO2FBRnJCO0FBSUEsb0JBQVE7QUFDSiw0Q0FBNEIseURBQTVCO2FBREo7QUFHQSwyQkFBZTtBQUNYLG9DQUFvQix5RUFBcEI7YUFESjtBQUdBLGdDQUFvQjtBQUNoQixrQ0FBa0Isd0JBQUMsQ0FBRDsyQkFBTyxDQUFDLGlDQUFELG9CQUFvRCxxREFBcEQ7aUJBQVA7QUFDbEIsNENBQTRCLCtEQUE1QjthQUZKO0FBSUEsMEJBQWM7QUFDVixxREFBcUMsbUZBQXJDO0FBQ0EsNENBQTRCLHNEQUE1QjtBQUNBLHFDQUFxQixnREFBckI7YUFISjtBQUtBLGdDQUFvQjtBQUNoQix5Q0FBeUIsOERBQXpCO0FBQ0Esc0NBQXNCLDZFQUF0QjtBQUNBLG1DQUFtQix5QkFBQyxJQUFEOzJCQUFVLE9BQU8sK0NBQVA7aUJBQVY7YUFIdkI7QUFLQSxzQkFBVTtBQUNOLHlDQUF5QixDQUFDLG1CQUFELEVBQXNCLCtCQUF0QixDQUF6QjthQURKO0FBR0EscUJBQVM7QUFDTCwyQ0FBMkIsa0ZBQTNCO2FBREo7QUFHQSwyQkFBZTtBQUNYLCtDQUErQix3RkFBL0I7YUFESjtBQUdBLG1CQUFPO0FBQ0gsbURBQW1DLDBEQUFuQzthQURKO0FBR0EscUJBQVM7QUFDTCxtQ0FBbUIsdURBQW5CO0FBQ0EsNENBQTRCLG9EQUE1QjthQUZKO0FBSUEsb0JBQVE7QUFDSix3Q0FBd0Isc0RBQXhCO0FBQ0Esb0NBQW9CLHlDQUFwQjtBQUNBLDhDQUE4QixpRUFBOUI7QUFDQSxrQ0FBa0IsNkNBQWxCO0FBQ0Esd0NBQXdCLDRDQUF4QjtBQUNBLHFDQUFxQiwyQkFBQyxDQUFEOzJCQUFPLENBQUMsMENBQUQsa0JBQTJELHdCQUEzRDtpQkFBUDtBQUNyQixxQ0FBcUIsNENBQXJCO0FBQ0EsZ0NBQWdCLCtDQUFoQjtBQUNBLDJDQUEyQixtREFBM0I7QUFDQSxzQ0FBc0IsMENBQXRCO0FBQ0EsbUNBQW1CLDJDQUFuQjtBQUNBLG9DQUFvQixtR0FBcEI7YUFaSjtTQTVDSjtBQTJEQSxrQkFBVTtBQUNOLHVCQUFXO0FBQ1AsdUJBQU8sVUFBUDtBQUNBLHlCQUFTLFNBQVQ7QUFDQSxnQ0FBZ0IsV0FBaEI7QUFDQSx3QkFBUSxlQUFSO0FBQ0EsMEJBQVUsU0FBVjtBQUNBLDJCQUFXLFVBQVg7QUFDQSx3QkFBUSxXQUFSO0FBQ0Esd0JBQVEsV0FBUjtBQUNBLDhCQUFjLGFBQWQ7QUFDQSwwQkFBVSxXQUFWO2FBVko7QUFZQSxzQkFBVTtBQUNOLDBCQUFVLFVBQVY7QUFDQSw4QkFBYyxvQkFBZDtBQUNBLHNDQUFzQixrQkFBdEI7QUFDQSx1QkFBTyxJQUFQO0FBQ0Esc0JBQU0sS0FBTjthQUxKO0FBT0Esd0JBQVk7QUFDUixvQ0FBb0Isa0NBQXBCO0FBQ0EsZ0NBQWdCLFFBQWhCO0FBQ0EsMkJBQVcsNEJBQVg7YUFISjtBQUtBLHVCQUFXO0FBQ1AsMEJBQVUsZ0JBQUMsQ0FBRDsyQkFBTyxZQUFZLEVBQUUsUUFBRixFQUFaO2lCQUFQO0FBQ1YsMkJBQVcsaUJBQUMsQ0FBRDsyQkFBTyxxQkFBcUIsRUFBRSxRQUFGLEVBQXJCO2lCQUFQO0FBQ1gsaUNBQWlCLHVCQUFDLENBQUQsRUFBSSxJQUFKLEVBQVUsSUFBVjsyQkFDWixPQUFPLENBQVAsR0FDSyxlQUFlLEVBQUUsUUFBRixFQUFmLElBQStCLE9BQU8sT0FBTyxJQUFQLEdBQWMsRUFBckIsQ0FBL0IsR0FDQSxDQUFDLFNBQVMsQ0FBVCxHQUNHLFFBREgsR0FFRyxZQUZILENBQUQsR0FHRSxFQUFFLFFBQUYsRUFIRjtpQkFITzthQUhyQjtTQXpCSjtBQXNDQSxtQkFBVztBQUNQLHVCQUFXO0FBQ1AsaUNBQWlCLGVBQWpCO0FBQ0EsNkJBQWEsaUJBQWI7QUFDQSxpQ0FBaUIsZ0JBQWpCO0FBQ0EsNENBQTRCLE9BQTVCO0FBQ0EsaUNBQWlCLG1CQUFqQjtBQUNBLDhCQUFjLFlBQWQ7QUFDQSw2QkFBYSxnQkFBYjthQVBKO0FBU0Esd0JBQVk7QUFDUixpQ0FBaUIsa0RBQWpCO0FBQ0EsNkJBQWEsK0NBQWI7QUFDQSxnQ0FBZ0Isc0VBQWhCO0FBQ0EsaUNBQWlCLDRDQUFqQjtBQUNBLDZCQUFhLDhDQUFiO2FBTEo7QUFPQSx1QkFBVztBQUNQLHVDQUF1Qix5Q0FBdkI7YUFESjtBQUdBLHNCQUFVO0FBQ04sb0NBQW9CLGdCQUFwQjtBQUNBLDRCQUFZLFNBQVo7QUFDQSw4QkFBYyxZQUFkO0FBQ0Esd0JBQVEsTUFBUjtBQUNBLDZCQUFhLGVBQWI7QUFDQSx3QkFBUSxPQUFSO0FBQ0EsNkJBQWEsT0FBYjtBQUNBLDBCQUFVLEdBQVY7QUFDQSw2QkFBYSxNQUFiO0FBQ0Esb0NBQW9CLFVBQXBCO0FBQ0EsNkJBQWEsR0FBYjtBQUNBLCtCQUFlLGNBQWY7YUFaSjtTQXBCSjtBQW1DQSxrQkFBVTtBQUNOLG9CQUFRO0FBQ0osd0JBQVEsZ0JBQVI7QUFDQSx3QkFBUSxPQUFSO0FBQ0EsK0JBQWUsWUFBZjthQUhKO0FBS0EsMkJBQWU7QUFDWCwwQkFBVSxTQUFWO0FBQ0Esd0JBQVEsTUFBUjtBQUNBLHdCQUFRLHlDQUFSO0FBQ0EsbUNBQW1CLFdBQW5CO0FBQ0EsbUNBQW1CLFVBQW5CO0FBQ0Esd0JBQVEsVUFBUjthQU5KO0FBUUEscUNBQXlCO0FBQ3JCLDhCQUFjLFlBQWQ7QUFDQSx1Q0FBdUIsUUFBdkI7QUFDQSxzQ0FBc0IsY0FBdEI7QUFDQSx3QkFBUSxVQUFSO0FBQ0Esc0JBQU0sV0FBTjtBQUNBLHdCQUFRLEtBQVI7QUFDQSxnQ0FBZ0IsVUFBaEI7YUFQSjtBQVNBLDBCQUFjO0FBQ1YscUNBQXFCLE9BQXJCO0FBQ0EsK0JBQWUsWUFBZjtBQUNBLHdCQUFRLHFCQUFSO0FBQ0Esc0JBQU0sV0FBTjthQUpKO0FBTUEsZ0NBQW9CO0FBQ2hCLHlCQUFTO0FBQ0wsa0NBQWMsR0FBZDtBQUNBLG1DQUFlLEdBQWY7QUFDQSxrQ0FBYyxJQUFkO0FBQ0Esa0NBQWMsS0FBZDtpQkFKSjtBQU1BLGdDQUNJOztzQkFBTyxXQUFVLE9BQVYsRUFBUDtvQkFBeUI7Ozt3QkFBTzs7OzRCQUM1Qjs7a0NBQUksV0FBVSxNQUFWLEVBQUo7OzZCQUQ0Qjs0QkFFNUI7O2tDQUFJLFdBQVUsTUFBVixFQUFKOzs2QkFGNEI7NEJBRzVCOztrQ0FBSSxXQUFVLE1BQVYsRUFBSjs7NkJBSDRCOzRCQUk1Qjs7a0NBQUksV0FBVSxNQUFWLEVBQUo7OzZCQUo0Qjt5QkFBUDtxQkFBekI7aUJBREo7YUFQSjtBQWdCQSxxQkFBUztBQUNMLDRCQUFZLFdBQVo7QUFDQSwrQkFBZSxRQUFmO0FBQ0Esd0JBQVEsVUFBUjtBQUNBLDBCQUFVLE9BQVY7QUFDQSx3QkFBUSxrQkFBUjtBQUNBLG9DQUFvQixXQUFwQjtBQUNBLHNCQUFNLFdBQU47YUFQSjtBQVNBLDJCQUFlO0FBQ1gsb0NBQW9CLGdCQUFwQjtBQUNBLHFDQUFxQixpQkFBckI7QUFDQSw4QkFBYyxRQUFkO0FBQ0EsOEJBQWMsWUFBZDtBQUNBLDZCQUFhLE1BQWI7QUFDQSw2QkFBYSxPQUFiO0FBQ0EsMkJBQVcsU0FBWDtBQUNBLG1DQUFtQixZQUFuQjtBQUNBLDhCQUFjLEtBQWQ7QUFDQSwwQkFBVSxLQUFWO0FBQ0EsNEJBQVksR0FBWjtBQUNBLDRCQUFZLEdBQVo7QUFDQSxnQ0FBZ0IscUJBQWhCO0FBQ0Esa0NBQWtCLDJCQUFsQjtBQUNBLDZCQUFhLFNBQWI7QUFDQSx3QkFBUSxVQUFSO0FBQ0EsMEJBQVUsT0FBVjtBQUNBLDRCQUFZLFdBQVo7QUFDQSw2QkFBYSxXQUFiO0FBQ0EsNkJBQWEsWUFBYjtBQUNBLDJDQUEyQixNQUEzQjtBQUNBLGdDQUFnQixNQUFoQjtBQUNBLGdDQUFnQixNQUFoQjtBQUNBLGlDQUFpQixjQUFqQjtBQUNBLHVCQUFPLE1BQVA7YUF6Qko7QUEyQkEsdUJBQVc7QUFDUCwrQkFBZSxjQUFmO0FBQ0Esd0JBQVEsb0JBQVI7YUFGSjtBQUlBLG9CQUFRO0FBQ0osbUNBQW1CLHlCQUFuQjtBQUNBLGdDQUFnQixlQUFoQjtBQUNBLHdCQUFRLGVBQVI7QUFDQSxnQ0FBZ0IsY0FBaEI7QUFDQSx5Q0FBeUIscUJBQXpCO0FBQ0EsdUNBQXVCLG1CQUF2QjthQU5KO1NBckZKO0FBOEZBLDJCQUFtQjtBQUNmLHVCQUFXO0FBQ1AsOEJBQWMscUJBQWQ7QUFDQSwrQkFBZSxhQUFmO2FBRko7QUFJQSx1QkFBVztBQUNQLDhCQUFjLFlBQWQ7QUFDQSx3QkFBUSxPQUFSO0FBQ0EsMEJBQVUsa0JBQVY7QUFDQSx3QkFBUSxLQUFSO2FBSko7QUFNQSxzQkFBVTtBQUNOLHlCQUFTLE9BQVQ7QUFDQSx3QkFBUSxPQUFSO2FBRko7U0FYSjtBQWdCQSxxQkFBYTtBQUNULHVCQUFXO0FBQ1AseUJBQVMsaUJBQVQ7QUFDQSx5QkFBUyxRQUFUO0FBQ0Esd0JBQVEsWUFBUjtBQUNBLDBCQUFVLE9BQVY7QUFDQSwyQkFBVyxZQUFYO2FBTEo7QUFPQSxzQkFBVTtBQUNOLGtDQUFrQixvQkFBbEI7QUFDQSx5QkFBUyxPQUFUO2FBRko7U0FSSjtBQWFBLG1CQUFXO0FBQ1Asc0JBQVU7QUFDTixpQ0FBaUIsK0NBQWpCO2FBREo7QUFHQSx1QkFBVztBQUNQLHlCQUFTLFFBQVQ7QUFDQSwrQkFBZSxvQkFBZjtBQUNBLGdDQUFnQixtQkFBaEI7YUFISjtTQUpKO0FBVUEsc0JBQWM7QUFDVix1QkFBVztBQUNQLHNDQUFzQix1Q0FBdEI7QUFDQSwrQkFBZSxvQkFBZjthQUZKO0FBSUEsd0JBQVk7QUFDUixtQ0FBbUIsMkJBQW5CO0FBQ0EsZ0RBQWdDLHNDQUFDLElBQUQ7MkJBQVU7Ozs7d0JBRXRDOzs4QkFBRyxNQUFPLElBQVAsRUFBSDs0QkFBbUIsSUFBbkI7eUJBRnNDOztpQkFBVjthQUZwQztBQU9BLHFCQUFTO0FBQ0wsaUNBQWlCLGVBQWpCO0FBQ0EsNkJBQWEsU0FBYjtBQUNBLDBCQUFVLE9BQVY7QUFDQSxtQ0FBbUIsaUJBQW5CO2FBSko7U0FaSjtBQW1CQSxrQkFBVTtBQUNOLHNCQUFVO0FBQ04sMENBQTBCLDREQUExQjthQURKO0FBR0EsdUJBQVc7QUFDUCxpQ0FBaUIsb0JBQWpCO0FBQ0EsZ0RBQWdDLDJDQUFoQztBQUNBLDZCQUFhLGFBQWI7QUFDQSxpQ0FBaUIscUJBQWpCO0FBQ0EsNkJBQWEsNkJBQWI7QUFDQSw2QkFBYSxhQUFiO0FBQ0EsbUNBQW1CLE9BQW5CO0FBQ0EsbUNBQW1CLE9BQW5CO0FBQ0Esa0NBQWtCLE1BQWxCO0FBQ0EsNkJBQWEsZUFBYjtBQUNBLDRDQUE0QiwyQ0FBNUI7QUFDQSxpQ0FBaUIsWUFBakI7YUFaSjtBQWNBLHdCQUFZO0FBQ1IsaUNBQWlCLGtEQUFqQjtBQUNBLGdEQUFnQyw4RUFBaEM7QUFDQSw2QkFBYSw4Q0FBYjtBQUNBLDRDQUE0QixvREFBNUI7YUFKSjtBQU1BLHVCQUFXO0FBQ1AsMEJBQVUsZ0JBQUMsQ0FBRDsyQkFBTyxrQkFBa0IsSUFBSSxDQUFKLENBQWxCO2lCQUFQO0FBQ1Ysd0JBQVEsT0FBUjtBQUNBLDZCQUFhLFNBQWI7QUFDQSwrQkFBZSxVQUFmO2FBSko7QUFNQSx3QkFBWTtBQUNSLDBDQUEwQixnREFBMUI7QUFDQSwyQ0FBMkIsa0NBQTNCO0FBQ0Esb0NBQW9CLDJCQUFwQjtBQUNBLGtDQUFrQixjQUFsQjthQUpKO0FBTUEscUJBQVM7QUFDTCw4QkFBYyxZQUFkO0FBQ0EsMkJBQVcsVUFBWDtBQUNBLHlCQUFTLE9BQVQ7QUFDQSx5QkFBUyxRQUFUO0FBQ0EsMkJBQVcsWUFBWDthQUxKO1NBcENKOztBQTZDQSwyQkFBbUI7QUFDZix1QkFBVztBQUNQLDBCQUFVO0FBQ04sa0NBQWM7QUFDVixxQ0FBYSxlQUFiO3FCQURKO0FBR0EsbUNBQWU7QUFDWCxzQ0FBYyxZQUFkO0FBQ0Esd0NBQWdCLHNCQUFoQjtBQUNBLHVDQUFlLFlBQWY7QUFDQSxzQ0FBYyxxQkFBZDtBQUNBLHNDQUFjLG9CQUFkO0FBQ0EsMENBQWtCLGNBQWxCO0FBQ0EseUNBQWlCLGFBQWpCO0FBQ0EsK0NBQXVCLHVCQUF2QjtBQUNBLDZDQUFxQixxQkFBckI7QUFDQSxrQ0FBVSxvQ0FBVjtBQUNBLG9DQUFZLHNDQUFaO0FBQ0Esc0NBQWMsbUJBQWQ7QUFDQSxrQ0FBVSxRQUFWO0FBQ0EsMENBQWtCLHVCQUFsQjtxQkFkSjtBQWdCQSw4QkFBVTtBQUNOLHVDQUFlLGNBQWY7cUJBREo7QUFHQSxrQ0FBYztBQUNWLCtDQUF1QiwwQkFBdkI7QUFDQSxzQ0FBYyxNQUFkO0FBQ0EsOENBQXNCLHVCQUF0QjtBQUNBLDhCQUFNLElBQU47QUFDQSx3Q0FBZ0Isa0JBQWhCO0FBQ0EsOENBQXNCLG1CQUF0QjtBQUNBLG9DQUFZLEtBQVo7QUFDQSx1Q0FBZSxJQUFmO0FBQ0EsNENBQW9CLElBQXBCO0FBQ0EseUNBQWlCLEtBQWpCO3FCQVZKO0FBWUEsa0NBQWM7QUFDVixzQ0FBYyxlQUFkO0FBQ0Esc0NBQWMsb0JBQUMsQ0FBRDttQ0FBTyxjQUFjLEVBQUUsUUFBRixFQUFkO3lCQUFQO0FBQ2Qsa0NBQVUsY0FBVjtxQkFISjtpQkFuQ0o7QUF5Q0EsMkJBQVc7QUFDUCxpQ0FBYTtBQUNULDZCQUFLLEdBQUw7QUFDQSxrQ0FBVSxnQkFBQyxDQUFEO21DQUFPLE1BQU0sRUFBRSxRQUFGLEVBQU47eUJBQVA7QUFDViw4QkFBTSxJQUFOO0FBQ0EsNkJBQUssR0FBTDtBQUNBLDhCQUFNLElBQU47QUFDQSw4QkFBTSxJQUFOO0FBQ0EsOEJBQU0sR0FBTjtBQUNBLDhCQUFNLEtBQU47QUFDQSw4QkFBTSxLQUFOO0FBQ0EsNkJBQUssSUFBTDtBQUNBLDZCQUFLLElBQUw7QUFDQSw2QkFBSyxHQUFMO0FBQ0EsOEJBQU0sSUFBTjtBQUNBLDZCQUFLLEdBQUw7cUJBZEo7QUFnQkEsK0JBQVc7QUFDUCxpREFBeUIsd0JBQXpCO0FBQ0EscURBQTZCLDJCQUE3QjtBQUNBLHNEQUE4QixjQUE5QjtxQkFISjtBQUtBLDhCQUFVO0FBQ04sc0NBQWMsZ0JBQWQ7QUFDQSxzQ0FBYyxZQUFkO0FBQ0EsOENBQXNCLDBCQUF0QjtBQUNBLGdDQUFRLE9BQVI7QUFDQSxvQ0FBWSxjQUFaO0FBQ0EsMENBQWtCLElBQWxCO0FBQ0EsZ0NBQVEscUJBQVI7QUFDQSxxQ0FBYSxlQUFiO0FBQ0EseUNBQWlCLHFCQUFqQjtBQUNBLGtDQUFVLEdBQVY7QUFDQSw0Q0FBb0IsTUFBcEI7QUFDQSwrQ0FBdUIsU0FBdkI7QUFDQSw0Q0FBb0IsVUFBcEI7QUFDQSxtQ0FBVyxzQkFBWDtBQUNBLGlDQUFTLE9BQVQ7QUFDQSxxQ0FBYSxZQUFiO0FBQ0EsbURBQTJCLE1BQTNCO0FBQ0EsdUNBQWUsTUFBZjtxQkFsQko7aUJBdEJKO2FBMUNKO1NBREo7O0FBeUZBLGlDQUF5QjtBQUNyQix1QkFBVztBQUNQLHdCQUFRLG1DQUFSO0FBQ0EsaUNBQWlCLDBDQUFqQjtBQUNBLCtCQUFlLDJDQUFmO0FBQ0EsNkJBQWEsa0NBQWI7QUFDQSxrQ0FBa0IsaUNBQWxCO0FBQ0EsMkJBQVcsaUNBQVg7QUFDQSw4QkFBYyxvQ0FBZDthQVBKO1NBREo7QUFXQSx1QkFBZTtBQUNYLGdCQUFJLEdBQUo7QUFDQSwwQkFBYyxrQkFBZDtBQUNBLDJCQUFlLGFBQWY7QUFDQSwwQkFBYyxlQUFkO0FBQ0EsMEJBQWMsbUJBQWQ7U0FMSjtLQTFrQkEsQ0FmNEI7QUFpbUJoQyxRQUFJLE9BQU8sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFQLENBam1CNEI7QUFrbUJoQyxRQUFJLGFBQWEsT0FBYixDQWxtQjRCO0FBbW1CaEMsU0FBSyxPQUFMLENBQWEsVUFBQyxLQUFEO2VBQVcsYUFBYSxXQUFXLEtBQVgsQ0FBYjtLQUFYLENBQWIsQ0FubUJnQztBQW9tQmhDLFFBQUksT0FBTyxVQUFQLEtBQXNCLFdBQXRCLEVBQW1DO0FBQ25DLGdCQUFRLEtBQVIsQ0FBYyxvQ0FBb0MsR0FBcEMsQ0FBZCxDQURtQztBQUVuQyxlQUZtQztLQUF2QztBQUlBLFFBQUksT0FBTyxVQUFQLEtBQXNCLFVBQXRCLEVBQWtDO0FBQ2xDLFlBQUksT0FBTyxFQUFQLENBRDhCO0FBRWxDLGFBQUssSUFBSSxNQUFNLENBQU4sRUFBUyxNQUFNLFVBQVUsTUFBVixFQUFrQixFQUFFLEdBQUYsRUFBTztBQUM3QyxpQkFBSyxJQUFMLENBQVUsVUFBVSxHQUFWLENBQVYsRUFENkM7U0FBakQ7QUFHQSxlQUFPLDRCQUFjLElBQWQsQ0FBUCxDQUxrQztLQUF0QztBQU9BLFdBQU8sVUFBUCxDQS9tQmdDO0NBQTdCOztBQWtuQkEsSUFBSSxzREFBdUIsU0FBdkIsb0JBQXVCO1dBQU0sQ0FDcEMsT0FEb0MsRUFFcEMsZUFGb0MsRUFHcEMsZ0JBSG9DLEVBSXBDLFlBSm9DLEVBS3BDLFlBTG9DLEVBTXBDLFlBTm9DLEVBT3BDLGFBUG9DLEVBUXBDLG9CQVJvQyxFQVNwQyxtQkFUb0M7Q0FBTjs7Ozs7OztBQy9tQmxDLFNBQVMsTUFBVCxDQUNJLDBDQUFxQixPQUFPLFVBQVAsQ0FEekIsRUFFSSxPQUFPLFFBQVAsQ0FBZ0IsY0FBaEIsQ0FBK0IsU0FBL0IsQ0FGSjs7Ozs7Ozs7Ozs7Ozs7OztJQ0VNO0FBQ0YsYUFERSxPQUNGLENBQVksTUFBWixFQUFvQixJQUFwQixFQUEwQjs4QkFEeEIsU0FDd0I7O0FBQ3RCLGFBQUssTUFBTCxHQUFjLE1BQWQsQ0FEc0I7QUFFdEIsYUFBSyxJQUFMLEdBQVksSUFBWixDQUZzQjtBQUd0QixhQUFLLFVBQUwsR0FBa0IsWUFBTSxFQUFOLENBSEk7QUFJdEIsYUFBSyxRQUFMLEdBQWdCLFVBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxJQUFaO21CQUFxQix3QkFBVSxPQUFPLDRCQUFFLGFBQVMsS0FBWCxDQUFQLEdBQTBCLEdBQTFCO1NBQS9CLENBSk07QUFLdEIsYUFBSyxPQUFMLEdBQWU7Ozs4Q0FBSTs7OzttQkFBUyxxQkFBUSxLQUFSLGtCQUFjLG1CQUFlLEtBQTdCO1NBQWIsQ0FMTztBQU10QixhQUFLLE9BQUwsR0FBZSxZQUFNLEVBQU4sQ0FOTztBQU90QixhQUFLLFNBQUwsR0FBaUIsWUFBTSxFQUFOLENBUEs7S0FBMUI7O0FBREUsc0JBVUYseUJBQU8sVUFBVTtBQUNiLGFBQUssT0FBTCxHQUFlLFFBQWYsQ0FEYTtBQUViLGVBQU8sSUFBUCxDQUZhOzs7QUFWZixzQkFjRiwrQkFBVSxVQUFVO0FBQ2hCLGFBQUssVUFBTCxHQUFrQixRQUFsQixDQURnQjtBQUVoQixlQUFPLElBQVAsQ0FGZ0I7OztBQWRsQixzQkFrQkYsMkJBQVEsVUFBVTtBQUNkLGFBQUssUUFBTCxHQUFnQixRQUFoQixDQURjO0FBRWQsZUFBTyxJQUFQLENBRmM7OztBQWxCaEIsc0JBc0JGLHlCQUFPLFVBQVU7QUFDYixhQUFLLE9BQUwsR0FBZSxRQUFmLENBRGE7QUFFYixlQUFPLElBQVAsQ0FGYTs7O0FBdEJmLHNCQTBCRiwyQkFBUSxZQUFZLFVBQXNCO1lBQVosMkZBQVk7O0FBQ3RDLGFBQUssU0FBTCxHQUFpQixVQUFTLFFBQVQsRUFBbUI7QUFDaEMsZUFBRyxHQUFILENBQU8sVUFBUCxFQUFtQixHQUFuQixDQUF1QixRQUF2QixFQUFpQyxRQUFqQyxFQURnQztTQUFuQixDQURxQjtBQUl0QyxlQUFPLElBQVAsQ0FKc0M7OztBQTFCeEMsc0JBZ0NGLHVCQUFPOzs7QUFDSCxZQUFJLE1BQU0sSUFBSSxjQUFKLEVBQU4sQ0FERDtBQUVILFlBQUksSUFBSixDQUFTLE1BQVQsRUFBaUIsTUFBakIsRUFBeUIsSUFBekIsRUFGRztBQUdILFlBQUksTUFBSixHQUFhLFlBQU07QUFDZixrQkFBSyxPQUFMLEdBRGU7QUFFZixnQkFBSSxJQUFJLE1BQUosS0FBZSxHQUFmLEVBQW9CO0FBQ3BCLHNCQUFLLE9BQUwsR0FEb0I7QUFFcEIsdUJBRm9CO2FBQXhCO0FBSUEsZ0JBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxJQUFJLFlBQUosQ0FBdEIsQ0FOVztBQU9mLGdCQUFJLFNBQVMsT0FBVCxFQUFrQjtBQUNsQixzQkFBSyxTQUFMLENBQWUsU0FBUyxRQUFULENBQWYsQ0FEa0I7QUFFbEIsc0JBQUssVUFBTCxDQUFnQixTQUFTLFFBQVQsQ0FBaEIsQ0FGa0I7YUFBdEIsTUFHTztBQUNILHNCQUFLLFFBQUwsQ0FBYyxTQUFTLE9BQVQsRUFBa0IsU0FBUyxJQUFULEVBQWUsU0FBUyxJQUFULENBQS9DLENBREc7YUFIUDtTQVBTLENBSFY7QUFpQkgsWUFBSSxPQUFKLEdBQWMsWUFBTTtBQUNoQixrQkFBSyxPQUFMLEdBRGdCO0FBRWhCLGtCQUFLLE9BQUwsR0FGZ0I7U0FBTixDQWpCWDtBQXFCSCxZQUFJLE9BQU8sSUFBSSxRQUFKLEVBQVAsQ0FyQkQ7QUFzQkgsYUFBSyxNQUFMLENBQVksV0FBWixFQUF5QixPQUFPLFNBQVAsQ0FBekIsQ0F0Qkc7QUF1QkgsYUFBSyxNQUFMLENBQVksTUFBWixFQUFvQixLQUFLLFNBQUwsQ0FBZSxLQUFLLElBQUwsQ0FBbkMsRUF2Qkc7QUF3QkgsYUFBSyxNQUFMLENBQVksUUFBWixFQUFzQixLQUFLLE1BQUwsQ0FBdEIsQ0F4Qkc7QUF5QkgsWUFBSSxJQUFKLENBQVMsSUFBVCxFQXpCRzs7O1dBaENMOzs7QUE2REMsSUFBSSxvQkFBTSxTQUFOLEdBQU07dUNBQUk7Ozs7OENBQWEsdUJBQVc7Q0FBNUI7Ozs7Ozs7Ozs7Ozs7O0lDOURYO0FBQ0YsYUFERSxpQkFDRixHQUFjOzhCQURaLG1CQUNZOztBQUNWLGFBQUssTUFBTCxHQUFjLEtBQWQsQ0FEVTtBQUVWLGFBQUssU0FBTCxHQUFpQixFQUFqQixDQUZVO0FBR1YsYUFBSyxhQUFMLEdBQXFCLENBQXJCLENBSFU7QUFJVixhQUFLLE9BQUwsR0FKVTtLQUFkOztBQURFLGdDQU9GLDZCQUFVO0FBQ04sZ0JBQVEsR0FBUixDQUFZLDRCQUFaLEVBRE07QUFFTixhQUFLLEVBQUwsR0FBVSxJQUFJLE1BQUosQ0FBVyxZQUFZLE9BQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixLQUFuQyxDQUFyQixDQUZNO0FBR04sYUFBSyxFQUFMLENBQVEsTUFBUixHQUFpQixZQUFXO0FBQ3hCLDBDQUFrQixLQUFsQixHQUR3QjtBQUV4QixvQkFBUSxHQUFSLENBQVksWUFBWixFQUZ3QjtBQUd4QixnQkFBSSxLQUFLLE1BQUwsRUFBYTtBQUNiLHFCQUFLLFNBQUwsQ0FBZTtBQUNYLDBCQUFNLEtBQUssU0FBTCxDQUFlO0FBQ2pCLGtDQUFVLENBQUMsQ0FBQyxhQUFELEVBQWdCLElBQWhCLENBQUQsQ0FBVjtBQUNBLHVDQUFlLEVBQWY7cUJBRkUsQ0FBTjtpQkFESixFQURhO2FBQWpCO1NBSGEsQ0FXZixJQVhlLENBV1YsSUFYVSxDQUFqQixDQUhNO0FBZU4sYUFBSyxFQUFMLENBQVEsT0FBUixHQUFrQixZQUFXO0FBQ3pCLDBDQUFrQixPQUFsQixHQUR5QjtBQUV6QixvQkFBUSxHQUFSLENBQVksb0JBQVosRUFGeUI7QUFHekIsaUJBQUssTUFBTCxHQUFjLElBQWQsQ0FIeUI7QUFJekIsdUJBQVcsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFYLEVBQW9DLEdBQXBDLEVBSnlCO1NBQVgsQ0FLaEIsSUFMZ0IsQ0FLWCxJQUxXLENBQWxCLENBZk07QUFxQk4sYUFBSyxFQUFMLENBQVEsU0FBUixHQUFvQixLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBQXBCLENBckJNOzs7QUFQUixnQ0E4QkYsK0JBQVUsU0FBUzs7O0FBQ2YsWUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLFFBQVEsSUFBUixDQUFsQixDQURXO0FBRWYsWUFBSSxLQUFLLFdBQUwsQ0FBSixFQUF1QjtBQUNuQixtQkFBTyxTQUFQLEdBQW1CLEtBQUssV0FBTCxDQUFuQixDQURtQjtBQUVuQixtQkFGbUI7U0FBdkI7QUFJQSxhQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLFVBQVMsSUFBVCxFQUFlO0FBQ2pDLGdCQUFJLFdBQVcsS0FBSyxDQUFMLENBQVgsQ0FENkI7QUFFakMsZ0JBQUksV0FBVyxLQUFLLENBQUwsQ0FBWCxDQUY2QjtBQUdqQyxnQkFBSSxZQUFZLEtBQUssU0FBTCxDQUFlLFFBQWYsS0FBNEIsRUFBNUIsQ0FIaUI7QUFJakMsZ0JBQUksYUFBYSxlQUFiLEVBQThCO0FBQzlCLHVCQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsSUFBdkIsRUFEOEI7YUFBbEM7QUFHQSxtQkFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsUUFBZixLQUE0QixFQUE1QixDQUFaLENBQTRDLE9BQTVDLENBQW9ELFVBQUMsR0FBRDt1QkFBUyxVQUFVLEdBQVYsRUFBZSxRQUFmO2FBQVQsQ0FBcEQsQ0FQaUM7U0FBZixDQVFwQixJQVJvQixDQVFmLElBUmUsQ0FBdEIsRUFOZTtBQWVmLFlBQUksZUFBZSxLQUFmLENBZlc7QUFnQmYsYUFBSyxhQUFMLENBQW1CLE9BQW5CLENBQTJCLFVBQUMsVUFBRCxFQUFnQjtBQUN2QywyQkFBZSxpQkFBUSxXQUFSLENBQW9CLFdBQVcsS0FBWCxFQUFrQixXQUFXLEVBQVgsRUFBZSxXQUFXLElBQVgsQ0FBckQsSUFBeUUsWUFBekUsQ0FEd0I7U0FBaEIsQ0FBM0IsQ0FoQmU7QUFtQmYsWUFBSSxZQUFKLEVBQWtCOztBQUNkLG9CQUFJLFlBQVksTUFBSyxTQUFMLENBQWUsV0FBZixLQUErQixFQUEvQjtBQUNoQix1QkFBTyxJQUFQLENBQVksU0FBWixFQUF1QixPQUF2QixDQUErQixVQUFDLEdBQUQsRUFBUztBQUNwQyx3QkFBSSxVQUFVLEdBQVYsQ0FBSixFQUFvQjtBQUNoQixrQ0FBVSxHQUFWLElBRGdCO3FCQUFwQjtpQkFEMkIsQ0FBL0I7aUJBRmM7U0FBbEI7OztBQWpERixnQ0EwREYseUNBQWdCO0FBQ1osZUFBTyxLQUFLLGFBQUwsRUFBUCxDQURZOzs7QUExRGQsZ0NBNkRGLG1DQUFZLFdBQVcsVUFBVTtBQUM3QixZQUFJLEtBQUssS0FBSyxhQUFMLEVBQUwsQ0FEeUI7QUFFN0Isa0JBQVUsS0FBVixDQUFnQixHQUFoQixFQUFxQixPQUFyQixDQUE2QixVQUFTLFFBQVQsRUFBbUI7QUFDNUMsZ0JBQUksQ0FBQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQUQsRUFBMkI7QUFDM0IscUJBQUssU0FBTCxDQUFlLFFBQWYsSUFBMkIsRUFBM0IsQ0FEMkI7YUFBL0I7QUFHQSxpQkFBSyxTQUFMLENBQWUsUUFBZixFQUF5QixFQUF6QixJQUErQixRQUEvQixDQUo0QztTQUFuQixDQUszQixJQUwyQixDQUt0QixJQUxzQixDQUE3QixFQUY2QjtBQVE3QixlQUFPLEVBQVAsQ0FSNkI7OztBQTdEL0IsZ0NBdUVGLHlDQUFlLGFBQWE7QUFDeEIsZUFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQVosQ0FBNEIsT0FBNUIsQ0FBb0MsVUFBUyxHQUFULEVBQWM7QUFDOUMsbUJBQU8sS0FBSyxTQUFMLENBQWUsR0FBZixFQUFvQixXQUFwQixDQUFQLENBRDhDO1NBQWQsQ0FFbEMsSUFGa0MsQ0FFN0IsSUFGNkIsQ0FBcEMsRUFEd0I7OztXQXZFMUI7OztBQThFQyxJQUFJLGtEQUFxQixJQUFJLGlCQUFKLEVBQXJCOzs7Ozs7Ozs7OztJQ2xGTDtBQUNGLGFBREUsR0FDRixDQUFZLE9BQVosRUFBcUIsVUFBckIsRUFBaUMsRUFBakMsRUFBcUM7OEJBRG5DLEtBQ21DOztBQUNqQyxhQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FEaUM7QUFFakMsYUFBSyxFQUFMLEdBQVUsRUFBVixDQUZpQztBQUdqQyxhQUFLLE9BQUwsR0FBZSxPQUFmLENBSGlDO0tBQXJDOztBQURFLGtCQU1GLHFCQUFNO0FBQ0YsZUFBTyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLEtBQUssVUFBTCxDQUFqQixDQUFrQyxLQUFsQyxDQUF3QyxLQUFLLEVBQUwsQ0FBL0MsQ0FERTs7O1dBTko7OztJQVdBO0FBQ0YsYUFERSxLQUNGLENBQVksT0FBWixFQUFxQixFQUFyQixFQUF5QixhQUF6QixFQUF3Qzs4QkFEdEMsT0FDc0M7O0FBQ3BDLGFBQUssRUFBTCxHQUFVLEVBQVYsQ0FEb0M7QUFFcEMsYUFBSyxTQUFMLEdBQWlCLE9BQWpCLENBRm9DO0FBR3BDLGFBQUssV0FBTCxHQUFtQixFQUFuQixDQUhvQztBQUlwQyxhQUFLLGVBQUwsR0FBdUIsYUFBdkIsQ0FKb0M7S0FBeEM7O0FBREUsb0JBT0YsaUNBQVcsS0FBSyxLQUFLO0FBQ2pCLGFBQUssR0FBTCxJQUFZLEdBQVosQ0FEaUI7QUFFakIsYUFBSyxXQUFMLENBQWlCLEdBQWpCLElBQXdCLEdBQXhCLENBRmlCOzs7QUFQbkIsb0JBV0YseUJBQU8sTUFBbUI7OztZQUFiLCtEQUFPLG9CQUFNOztBQUN0QixhQUFLLElBQUksR0FBSixJQUFXLElBQWhCO0FBQXNCLGdCQUFJLEtBQUssY0FBTCxDQUFvQixHQUFwQixDQUFKLEVBQThCO0FBQ2hELG9CQUFJLElBQUksTUFBSixDQUFXLENBQVgsTUFBa0IsR0FBbEIsSUFBeUIsSUFBSSxNQUFKLENBQVcsQ0FBWCxNQUFrQixHQUFsQixFQUF1QjtBQUNoRCx3QkFBSSxDQUFDLE1BQUQsSUFBVyxPQUFPLEtBQUssSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFMLENBQVAsS0FBOEIsV0FBOUIsRUFBMkM7QUFDdEQsaUNBRHNEO3FCQUExRDtpQkFESjtBQUtBLG9CQUFJLElBQUksTUFBSixDQUFXLENBQVgsTUFBa0IsR0FBbEIsRUFBdUI7O0FBQ3ZCLDRCQUFJLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFOO0FBQ0osOEJBQUssR0FBTCxJQUFZLEVBQVo7QUFDQSw0QkFBSSxXQUFXLElBQUksR0FBSixDQUFRLE1BQUssU0FBTCxFQUFnQixNQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsTUFBSyxFQUFMLENBQXBFO0FBQ0osNEJBQUksZUFBZSxLQUFLLEdBQUwsRUFBVSxRQUFWO0FBQ25CLDZCQUFLLEdBQUwsRUFBVSxRQUFWLENBQW1CLE9BQW5CLENBQTJCLFVBQVMsV0FBVCxFQUFzQjtBQUM3QyxnQ0FBSSxRQUFPLFlBQVksSUFBWixDQUFQLEtBQTRCLFFBQTVCLEVBQXNDO0FBQ3RDLHFDQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFlBQVksS0FBWixDQUFuQixDQUFzQyxHQUF0QyxDQUEwQyxZQUFZLEVBQVosRUFBZ0IsWUFBWSxJQUFaLENBQTFELENBRHNDOzZCQUExQztBQUdBLGdDQUFJLE1BQU0sSUFBSSxHQUFKLENBQVEsS0FBSyxTQUFMLEVBQWdCLFlBQVksS0FBWixFQUFtQixZQUFZLEVBQVosQ0FBakQsQ0FKeUM7QUFLN0MsZ0NBQUksR0FBSixHQUFVLFVBQVYsQ0FBcUIsWUFBckIsRUFBbUMsUUFBbkMsRUFMNkM7QUFNN0MsaUNBQUssR0FBTCxFQUFVLElBQVYsQ0FBZSxHQUFmLEVBTjZDO3lCQUF0QixDQU96QixJQVB5QixPQUEzQjtBQVFBLDhCQUFLLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsR0FBeEI7eUJBYnVCO2lCQUEzQixNQWNPLElBQUksSUFBSSxNQUFKLENBQVcsQ0FBWCxNQUFrQixHQUFsQixFQUF1QjtBQUM5Qix3QkFBSSxNQUFNLElBQUksS0FBSixDQUFVLENBQVYsQ0FBTixDQUQwQjtBQUU5Qix3QkFBSSxjQUFjLEtBQUssR0FBTCxDQUFkLENBRjBCO0FBRzlCLHdCQUFJLFFBQU8saUVBQVAsS0FBdUIsUUFBdkIsRUFBaUM7QUFDakMsNkJBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsWUFBWSxLQUFaLENBQW5CLENBQXNDLEdBQXRDLENBQTBDLFlBQVksRUFBWixFQUFnQixZQUFZLElBQVosQ0FBMUQsQ0FEaUM7cUJBQXJDO0FBR0EseUJBQUssR0FBTCxJQUFZLElBQUksR0FBSixDQUFRLEtBQUssU0FBTCxFQUFnQixZQUFZLEtBQVosRUFBbUIsWUFBWSxFQUFaLENBQXZELENBTjhCO0FBTzlCLHlCQUFLLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsR0FBeEIsQ0FQOEI7aUJBQTNCLE1BUUE7QUFDSCx5QkFBSyxHQUFMLElBQVksS0FBSyxHQUFMLENBQVosQ0FERztBQUVILHlCQUFLLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsRUFBeEIsQ0FGRztpQkFSQTthQXBCVztTQUF0Qjs7O0FBWkYsb0JBOENGLCtCQUFVLFFBQVE7OztBQUNkLFlBQUksU0FBUyxFQUFULENBRFU7O21DQUVMO0FBQXlCLGdCQUFJLE9BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxHQUFoQyxDQUFKLEVBQTBDO0FBQ3hFLHdCQUFRLE9BQUssV0FBTCxDQUFpQixHQUFqQixDQUFSO0FBQ0EseUJBQUssR0FBTDtBQUNJLDRCQUFJLE9BQU8sTUFBUCxFQUFlO0FBQ2YsbUNBQU8sR0FBUCxJQUFjLE9BQUssR0FBTCxFQUFVLEdBQVYsQ0FBYyxVQUFTLEdBQVQsRUFBYztBQUN0Qyx1Q0FBTyxJQUFJLEdBQUosR0FBVSxTQUFWLENBQW9CLE9BQU8sR0FBUCxDQUFwQixDQUFQLENBRHNDOzZCQUFkLENBQTVCLENBRGU7eUJBQW5CO0FBS0EsOEJBTko7QUFEQSx5QkFRSyxHQUFMO0FBQ0ksNEJBQUksT0FBTyxNQUFQLEVBQWU7QUFDZixtQ0FBTyxHQUFQLElBQWMsT0FBSyxHQUFMLEVBQVUsR0FBVixHQUFnQixTQUFoQixDQUEwQixPQUFPLEdBQVAsQ0FBMUIsQ0FBZCxDQURlO3lCQUFuQjtBQUdBLDhCQUpKO0FBUkE7QUFjSSwrQkFBTyxHQUFQLElBQWMsT0FBSyxHQUFMLENBQWQsQ0FESjtBQWJBLGlCQUR3RTthQUExQztVQUZwQjs7QUFFZCxhQUFLLElBQUksR0FBSixJQUFXLEtBQUssV0FBTDtrQkFBUDtTQUFULE1Ba0JBLENBQU8sRUFBUCxHQUFZLEtBQUssRUFBTCxDQXBCRTtBQXFCZCxlQUFPLE1BQVAsQ0FyQmM7OztXQTlDaEI7OztJQXVFQTtBQUNGLGFBREUsYUFDRixDQUFZLE9BQVosRUFBcUIsVUFBckIsRUFBaUM7OEJBRC9CLGVBQytCOztBQUM3QixhQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FENkI7QUFFN0IsYUFBSyxNQUFMLEdBQWMsRUFBZCxDQUY2QjtBQUc3QixhQUFLLE9BQUwsR0FBZSxPQUFmLENBSDZCO0tBQWpDOztBQURFLDRCQU1GLG1CQUFJLElBQUksTUFBTTtBQUNWLFlBQUksT0FBTyxLQUFLLE1BQUwsQ0FBWSxFQUFaLENBQVAsS0FBMkIsV0FBM0IsRUFBd0M7QUFDeEMsaUJBQUssTUFBTCxDQUFZLEVBQVosSUFBa0IsSUFBSSxLQUFKLENBQVUsS0FBSyxPQUFMLEVBQWMsRUFBeEIsRUFBNEIsSUFBNUIsQ0FBbEIsQ0FEd0M7U0FBNUM7QUFHQSxhQUFLLE1BQUwsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLENBQXVCLElBQXZCLEVBSlU7OztBQU5aLDRCQVlGLHlCQUFPLElBQUksTUFBTTtBQUNiLFlBQUksS0FBSyxNQUFMLENBQVksRUFBWixDQUFKLEVBQXFCO0FBQ2pCLGlCQUFLLE1BQUwsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLENBQXVCLElBQXZCLEVBQTZCLEtBQTdCLEVBRGlCO0FBRWpCLG1CQUFPLElBQVAsQ0FGaUI7U0FBckI7QUFJQSxlQUFPLEtBQVAsQ0FMYTs7O0FBWmYsNEJBbUJGLHVCQUFNLElBQUk7QUFDTixlQUFPLEtBQUssTUFBTCxDQUFZLEVBQVosQ0FBUCxDQURNOzs7QUFuQlIsNEJBc0JGLHFCQUFNO0FBQ0YsWUFBSSxPQUFPLE9BQU8sbUJBQVAsQ0FBMkIsS0FBSyxNQUFMLENBQWxDLENBREY7QUFFRixlQUFPLEtBQUssR0FBTCxDQUFTLFVBQVMsR0FBVCxFQUFjO0FBQzFCLG1CQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBUCxDQUQwQjtTQUFkLENBRWQsSUFGYyxDQUVULElBRlMsQ0FBVCxDQUFQLENBRkU7OztXQXRCSjs7O0lBOEJBO0FBQ0YsYUFERSxPQUNGLEdBQWM7OEJBRFosU0FDWTs7QUFDVixhQUFLLGNBQUwsR0FBc0IsRUFBdEIsQ0FEVTtBQUVWLGFBQUssT0FBTCxHQUFlLEVBQWYsQ0FGVTtLQUFkOztBQURFLHNCQUtGLCtCQUFVLFFBQVE7QUFDZCxZQUFJLE9BQU8sS0FBSyxPQUFMLENBQWEsTUFBYixDQUFQLEtBQWdDLFdBQWhDLEVBQTZDO0FBQzdDLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLElBQXVCLElBQUksT0FBSixFQUF2QixDQUQ2QztTQUFqRDtBQUdBLGVBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixDQUFQLENBSmM7OztBQUxoQixzQkFXRiwrQkFBVSxRQUFRO0FBQ2QsZUFBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQVAsQ0FEYzs7O0FBWGhCLHNCQWNGLG1CQUFJLFlBQVk7QUFDWixZQUFJLE9BQU8sS0FBSyxjQUFMLENBQW9CLFVBQXBCLENBQVAsS0FBMkMsV0FBM0MsRUFBd0Q7QUFDeEQsaUJBQUssY0FBTCxDQUFvQixVQUFwQixJQUFrQyxJQUFJLGFBQUosQ0FBa0IsSUFBbEIsRUFBd0IsVUFBeEIsQ0FBbEMsQ0FEd0Q7U0FBNUQ7QUFHQSxlQUFPLEtBQUssY0FBTCxDQUFvQixVQUFwQixDQUFQLENBSlk7OztBQWRkLHNCQW9CRixtQkFBSSxZQUFZO0FBQ1osZUFBTyxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBUCxDQURZOzs7QUFwQmQsc0JBdUJGLG1DQUFZLFlBQVksVUFBVSxNQUFNOzs7O0FBQ3BDLFlBQUksZUFBZSxLQUFmLENBRGdDO0FBRXBDLFlBQUksS0FBSyxjQUFMLENBQW9CLFVBQXBCLENBQUosRUFBcUM7QUFDakMsMkJBQWUsS0FBSyxHQUFMLENBQVMsVUFBVCxFQUFxQixHQUFyQixDQUF5QixRQUF6QixFQUFtQyxJQUFuQyxLQUE0QyxZQUE1QyxDQURrQjtTQUFyQztBQUdBLGVBQU8sSUFBUCxDQUFZLEtBQUssT0FBTCxDQUFaLENBQTBCLE9BQTFCLENBQWtDLFVBQUMsR0FBRDs7O21CQUM5QixlQUFlLHVCQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQWtCLFdBQWxCLG9DQUErQyxZQUEvQztTQURlLENBQWxDOztBQUxvQyxlQVE3QixJQUFQLENBUm9DOzs7V0F2QnRDOzs7QUFtQ0MsSUFBSSw0QkFBVSxJQUFJLE9BQUosRUFBVjs7Ozs7Ozs7Ozs7Ozs7OztJQ2hKRTs7Ozs7Ozs7O3FCQUNULDJCQUFTO0FBQ0wsZUFBTzs7Y0FBTyxPQUFPLEVBQUUsVUFBVSxNQUFWLEVBQWtCLFNBQVMsTUFBVCxFQUEzQixFQUFQO1lBQXFEOzs7Z0JBQU87OztvQkFDL0Q7OzBCQUFJLE9BQU8sRUFBRSxhQUFhLFFBQWIsRUFBVCxFQUFKO3dCQUNJLDZCQUFLLEtBQUksNkJBQUosRUFBTCxDQURKO3FCQUQrRDtpQkFBUDthQUFyRDtTQUFQLENBREs7OztXQURBO0VBQWUsTUFBTSxTQUFOOztJQVV0Qjs7Ozs7bUNBQ0YseUJBQVE7O0FBRE4sbUNBRUYsNkJBQVU7O1dBRlI7OztJQUtBOzs7QUFDRixhQURFLGdCQUNGLENBQVksS0FBWixFQUFtQjs4QkFEakIsa0JBQ2lCOztzREFDZiw2QkFBTSxLQUFOLEdBRGU7O0FBRWYsZUFBSyxLQUFMLEdBQWE7QUFDVCx5QkFBYSxJQUFiO1NBREosQ0FGZTs7S0FBbkI7O0FBREUsK0JBT0YsdURBQXVCO0FBQ25CLGFBQUssWUFBTCxHQURtQjs7O0FBUHJCLHFCQVVLLHVCQUFPO0FBQ1YsWUFBSSxVQUFVLE9BQU8sUUFBUCxDQUFnQixjQUFoQixDQUErQixtQkFBL0IsQ0FBVixDQURNO0FBRVYsWUFBSSxPQUFKLEVBQWE7QUFDVCxtQkFBTyxTQUFTLE1BQVQsQ0FDSCxvQkFBQyxnQkFBRCxPQURHLEVBRUgsT0FGRyxDQUFQLENBRFM7U0FBYjtBQU1BLGVBQU8sSUFBSSxvQkFBSixFQUFQLENBUlU7OztBQVZaLCtCQW9CRix5Q0FBZ0I7OztBQUNaLFlBQUksS0FBSyxRQUFMLEVBQWU7QUFDZixtQkFEZTtTQUFuQjtBQUdBLGFBQUssUUFBTCxHQUFnQixZQUFZLFlBQU07QUFDOUIsbUJBQUssUUFBTCxDQUFjO0FBQ1Ysc0JBQU0sQ0FBQyxPQUFLLEtBQUwsQ0FBVyxJQUFYO2FBRFgsRUFEOEI7U0FBTixFQUl6QixHQUphLENBQWhCLENBSlk7OztBQXBCZCwrQkE4QkYsdUNBQWU7QUFDWCxZQUFJLENBQUMsS0FBSyxRQUFMLEVBQWU7QUFDaEIsbUJBRGdCO1NBQXBCO0FBR0Esc0JBQWMsS0FBSyxRQUFMLENBQWQsQ0FKVztBQUtYLGFBQUssUUFBTCxHQUFnQixJQUFoQixDQUxXOzs7QUE5QmIsK0JBcUNGLHlCQUFRO0FBQ0osYUFBSyxZQUFMLEdBREk7QUFFSixhQUFLLFFBQUwsQ0FBYyxFQUFFLFdBQVcsSUFBWCxFQUFpQixNQUFNLEtBQU4sRUFBakMsRUFGSTs7O0FBckNOLCtCQXlDRiw2QkFBVTtBQUNOLGFBQUssYUFBTCxHQURNO0FBRU4sYUFBSyxRQUFMLENBQWMsRUFBRSxXQUFXLEtBQVgsRUFBaEIsRUFGTTs7O0FBekNSLCtCQTZDRiwyQkFBUztBQUNMLFlBQUksS0FBSyxLQUFMLENBQVcsU0FBWCxFQUFzQjtBQUN0QixtQkFBTyw2QkFBSyxXQUFVLHNCQUFWLEVBQUwsQ0FBUCxDQURzQjtTQUExQjtBQUdBLFlBQUksS0FBSyxLQUFMLENBQVcsU0FBWCxLQUF5QixJQUF6QixFQUErQjtBQUMvQixtQkFDSTs7a0JBQUssV0FBVSxpQ0FBVixFQUFMO2dCQUNNLGVBQUUsMEJBQUYsQ0FETjthQURKLENBRCtCO1NBQW5DO0FBT0EsZUFDSTs7Y0FBSyxXQUFZLG9DQUFvQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLE9BQWxCLEdBQTRCLEVBQTVCLENBQXBDLEVBQWpCO1lBQ1UsZUFBRSxrQ0FBRixDQURWO1NBREosQ0FYSzs7O1dBN0NQO0VBQXlCLE1BQU0sU0FBTjs7QUFnRXhCLElBQUksZ0RBQW9CLGlCQUFpQixJQUFqQixFQUFwQjs7Ozs7Ozs7O1FDL0VLO1FBV0E7Ozs7QUFYVCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDM0IsUUFBSSxRQUFRLFFBQVEsaURBQVAsS0FBZSxRQUFmLEdBQTJCLElBQUksQ0FBSixDQUE1QixHQUFxQyxlQUFFLDhCQUFGLENBQXJDLENBRGU7QUFFM0IsUUFBSSxPQUFPLFFBQVEsaURBQVAsS0FBZSxRQUFmLEdBQTJCLElBQUksQ0FBSixDQUE1QixHQUFxQyxHQUFyQyxDQUZnQjtBQUczQixTQUFLO0FBQ0QsZUFBTyxLQUFQO0FBQ0EsY0FBTSxJQUFOO0FBQ0EsY0FBTSxPQUFOO0FBQ0EsbUJBQVcsS0FBWDtLQUpKLEVBSDJCO0NBQXhCOztBQVdBLFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QixNQUE5QixFQUE4RDtRQUF4Qix5RUFBaUIscUJBQU87O0FBQ2pFLFdBQU8sS0FBSztBQUNSLGVBQU8sT0FBUDtBQUNBLG1CQUFXLEtBQVg7QUFDQSwwQkFBa0IsSUFBbEI7QUFDQSwyQkFBbUIsZUFBRSxtQkFBRixDQUFuQjtBQUNBLDBCQUFrQixlQUFFLGtCQUFGLENBQWxCO0FBQ0Esd0JBQWdCLGdCQUFoQjtLQU5HLEVBT0osTUFQSSxDQUFQLENBRGlFO0NBQTlEOzs7Ozs7Ozs7Ozs7Ozs7SUNkTTs7Ozs7Ozs7O3dCQVdULG1EQUFxQjtBQUNqQixlQUFPLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FEVTs7O0FBWFosd0JBY1QsdUNBQWU7QUFDWCxlQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0I7O2NBQUssV0FBVSxVQUFWLEVBQUw7WUFBNEIsS0FBSyxLQUFMLENBQVcsTUFBWDtTQUFoRCxHQUE0RSxJQUE1RSxDQURJOzs7QUFkTix3QkFpQlQsdUNBQWU7QUFDWCxlQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0I7OztZQUFNLEtBQUssS0FBTCxDQUFXLE1BQVg7U0FBMUIsR0FBcUQsSUFBckQsQ0FESTs7O0FBakJOLHdCQW9CVCx1Q0FBZTtBQUNYLGVBQU8sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQjs7O1lBQU0sS0FBSyxLQUFMLENBQVcsTUFBWDtTQUExQixHQUFxRCxJQUFyRCxDQURJOzs7QUFwQk4sd0JBdUJULHVDQUFlO0FBQ1gsZUFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9COzs7WUFBTSxLQUFLLEtBQUwsQ0FBVyxNQUFYO1NBQTFCLEdBQXFELElBQXJELENBREk7OztBQXZCTix3QkEwQlQsbUNBQWE7OztBQUNULGVBQ0k7OztBQUNJLDJCQUFVLFdBQVY7QUFDQSxxQkFBTTsyQkFBSyxPQUFLLEtBQUwsR0FBYSxDQUFiO2lCQUFMO2FBRlY7WUFJTSxLQUFLLEtBQUwsQ0FBVyxJQUFYO1NBTFYsQ0FEUzs7O0FBMUJKLHdCQW9DVCwyQkFBUztBQUNMLGVBQU87O2NBQUssV0FBVSxXQUFWLEVBQUw7WUFDRCxLQUFLLFlBQUwsRUFEQztZQUVELEtBQUssWUFBTCxFQUZDO1lBR0QsS0FBSyxZQUFMLEVBSEM7WUFJRCxLQUFLLFlBQUwsRUFKQztZQUtELEtBQUssVUFBTCxFQUxDO1NBQVAsQ0FESzs7O2lCQXBDQTs7NEJBQ2M7QUFDbkIsbUJBQU87QUFDSCx3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUix3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUix3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUix3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUixzQkFBTSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7QUFDTiw0QkFBWSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7YUFOaEIsQ0FEbUI7Ozs7V0FEZDtFQUFrQixNQUFNLFNBQU47Ozs7Ozs7Ozs7OztRQ0dmO1FBV0E7Ozs7Ozs7Ozs7QUFYVCxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUM7QUFDcEMsUUFBSSxJQUFJLFNBQUosQ0FBSSxDQUFDLEtBQUQsRUFBVztBQUNmLGNBQU0sY0FBTixHQURlO0FBRWYsZUFBTyxRQUFRLEtBQVIsQ0FBUCxDQUZlO0tBQVgsQ0FENEI7QUFLcEMsV0FBTztBQUNILHNCQUFjLENBQWQ7QUFDQSxpQkFBUyxDQUFUO0tBRkosQ0FMb0M7Q0FBakM7O0FBV0EsU0FBUyxpQkFBVCxDQUEyQixPQUEzQixFQUFvQyxlQUFwQyxFQUFxRDtBQUN4RCxRQUFJLFdBQVcsb0JBQU0sRUFBTixDQUR5QztBQUV4RCxRQUFJLFdBQVcsQ0FBWCxDQUZvRDtBQUd4RCxRQUFJLGFBQWEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFiLENBSG9EO0FBSXhELFFBQUksT0FBTyxTQUFQLElBQU8sQ0FBQyxLQUFELEVBQVc7QUFDbEIsY0FBTSxjQUFOLEdBRGtCO0FBRWxCLGVBQU8sVUFBUCxDQUZrQjtLQUFYLENBSjZDO0FBUXhELFFBQUksVUFBVSxTQUFWLE9BQVUsR0FBTTtBQUNoQixtQkFBVyxvQkFBTSxFQUFOLENBREs7S0FBTixDQVIwQztBQVd4RCxRQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ2xCLFlBQUksY0FBYyxDQUFDLE1BQU0sT0FBTixDQUFjLENBQWQsRUFBaUIsS0FBakIsRUFBd0IsTUFBTSxPQUFOLENBQWMsQ0FBZCxFQUFpQixLQUFqQixDQUF2QyxDQURjO0FBRWxCLFlBQUksTUFBTSxTQUFOLEdBQU0sQ0FBQyxDQUFEO21CQUFPLElBQUksQ0FBSjtTQUFQLENBRlE7QUFHbEIsb0JBQVksS0FBSyxJQUFMLENBQVUsSUFBSSxZQUFZLENBQVosSUFBaUIsV0FBVyxDQUFYLENBQWpCLENBQUosR0FBc0MsSUFBSSxZQUFZLENBQVosSUFBaUIsV0FBVyxDQUFYLENBQWpCLENBQTFDLENBQXRCLENBSGtCO0FBSWxCLHFCQUFhLFdBQWIsQ0FKa0I7QUFLbEIsWUFBSSxXQUFXLEVBQVgsRUFBZTtBQUNmLHNCQURlO1NBQW5CO0tBTE8sQ0FYNkM7QUFvQnhELFFBQUksUUFBUSxTQUFSLEtBQVEsQ0FBQyxLQUFELEVBQVc7QUFDbkIsbUJBQVcsT0FBWCxDQURtQjtBQUVuQixtQkFBVyxDQUFYLENBRm1CO0FBR25CLHFCQUFhLENBQUMsTUFBTSxPQUFOLENBQWMsQ0FBZCxFQUFpQixLQUFqQixFQUF3QixNQUFNLE9BQU4sQ0FBYyxDQUFkLEVBQWlCLEtBQWpCLENBQXRDLENBSG1CO0tBQVgsQ0FwQjRDO0FBeUJ4RCxXQUFPO0FBQ0gsc0JBQWMsS0FBZDtBQUNBLG9CQUFZLElBQVo7QUFDQSxxQkFBYSxJQUFiO0FBQ0EsdUJBQWUsT0FBZjtBQUNBLGlCQUFTLE9BQVQ7S0FMSixDQXpCd0Q7Q0FBckQ7O0lBa0NNOzs7Ozs0QkFDYztBQUNuQixtQkFBTztBQUNILHNCQUFNLE1BQU0sU0FBTixDQUFnQixJQUFoQjtBQUNOLDBCQUFVLE1BQU0sU0FBTixDQUFnQixNQUFoQjtBQUNWLDJCQUFXLE1BQU0sU0FBTixDQUFnQixNQUFoQjtBQUNYLDRCQUFZLE1BQU0sU0FBTixDQUFnQixJQUFoQjthQUpoQixDQURtQjs7OztBQVF2QixhQVRTLE1BU1QsQ0FBWSxLQUFaLEVBQW1COzhCQVRWLFFBU1U7O3FEQUNmLDRCQUFNLEtBQU4sR0FEZTs7QUFFZixjQUFLLEtBQUwsR0FBYTtBQUNULHNCQUFVLENBQVY7QUFDQSxtQkFBTyxLQUFQO0FBQ0Esc0JBQVUsS0FBVjtTQUhKLENBRmU7QUFPZixjQUFLLEdBQUwsR0FBVyxJQUFYLENBUGU7O0tBQW5COztBQVRTLHFCQWtCVCxtREFBb0IsV0FBVztBQUMzQixZQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixVQUFVLElBQVYsRUFBZ0I7QUFDcEMsaUJBQUssUUFBTCxDQUFjO0FBQ1YsMEJBQVUsS0FBVjthQURKLEVBRG9DO1NBQXhDOzs7QUFuQksscUJBeUJULDJCQUFTO0FBQ0wsZUFBTyxDQUFDLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLElBQW1CLENBQUMsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUQ1Qzs7O0FBekJBLHFCQTRCVCxxREFBc0I7QUFDbEIsWUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLG1CQUFPLENBQVAsQ0FEcUI7U0FBekI7QUFHQSxZQUFJLFFBQVEsS0FBSyxHQUFMLENBQVMsS0FBSyxHQUFMLENBQVMsTUFBTSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLENBQXBDLENBQVQsRUFBaUQsR0FBakQsQ0FBUixDQUpjO0FBS2xCLGVBQU8sQ0FBQyxRQUFRLEdBQVIsQ0FBRCxDQUFjLE9BQWQsQ0FBc0IsQ0FBdEIsQ0FBUCxDQUxrQjs7O0FBNUJiLHFCQW1DVCw2Q0FBaUIsU0FBUztBQUN0QixZQUFJLE1BQU0sQ0FBTixDQURrQjtBQUV0QixlQUFPLE9BQVAsRUFBZ0I7QUFDWixtQkFBTyxRQUFRLFVBQVIsSUFBc0IsQ0FBdEIsQ0FESztBQUVaLHNCQUFVLFFBQVEsVUFBUixDQUZFO1NBQWhCO0FBSUEsZUFBTyxHQUFQLENBTnNCOzs7QUFuQ2pCLHFCQTJDVCw2QkFBUyxPQUFPO0FBQ1osWUFBSSxRQUFRLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBUixDQURRO0FBRVosWUFBSSxTQUFTLE1BQU0sTUFBTixDQUFhLFVBQWIsQ0FGRDtBQUdaLGVBQU8sTUFBTSxLQUFOLEdBQWMsS0FBSyxnQkFBTCxDQUFzQixNQUF0QixDQUFkLENBSEs7OztBQTNDUCxxQkFnRFQsNkNBQWlCLE9BQU87QUFDcEIsWUFBSSxRQUFRLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBUixDQURnQjtBQUVwQixZQUFJLFNBQVMsTUFBTSxNQUFOLENBRk87QUFHcEIsZUFBTyxNQUFNLEtBQU4sR0FBYyxLQUFLLGdCQUFMLENBQXNCLE1BQXRCLENBQWQsQ0FIYTs7O0FBaERmLHFCQXFEVCxxQ0FBYSxPQUFPO0FBQ2hCLFlBQUksTUFBTSxLQUFLLFFBQUwsQ0FBYyxLQUFkLElBQXVCLEtBQUssR0FBTCxDQURqQjtBQUVoQixlQUFPLEtBQUssR0FBTCxDQUFTLEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxDQUFkLENBQVQsRUFBMkIsR0FBM0IsQ0FBUCxDQUZnQjs7O0FBckRYLHFCQXlEVCwyQkFBUSxPQUFPO0FBQ1gsWUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUI7QUFDeEMsbUJBRHdDO1NBQTVDO0FBR0EsYUFBSyxRQUFMLENBQWM7QUFDVixzQkFBVSxHQUFWO0FBQ0EsbUJBQU8sS0FBUDtBQUNBLHNCQUFVLElBQVY7U0FISixFQUpXO0FBU1gsYUFBSyxLQUFMLENBQVcsVUFBWCxHQVRXOzs7QUF6RE4scUJBb0VULHFDQUFhLE9BQU87QUFDaEIsY0FBTSxjQUFOLEdBRGdCO0FBRWhCLFlBQUksS0FBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ3hDLG1CQUR3QztTQUE1QztBQUdBLGFBQUssR0FBTCxHQUFXLEtBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsQ0FBWCxDQUxnQjtBQU1oQixhQUFLLFFBQUwsQ0FBYztBQUNWLHNCQUFVLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUFWO0FBQ0EsbUJBQU8sSUFBUDtTQUZKLEVBTmdCOzs7QUFwRVgscUJBK0VULG1DQUFZLE9BQU87QUFDZixjQUFNLGNBQU4sR0FEZTtBQUVmLFlBQUksS0FBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ3hDLG1CQUR3QztTQUE1QztBQUdBLGFBQUssUUFBTCxDQUFjO0FBQ1Ysc0JBQVUsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVY7U0FESixFQUxlOzs7QUEvRVYscUJBd0ZULGlDQUFXLE9BQU87QUFDZCxjQUFNLGNBQU4sR0FEYztBQUVkLFlBQUksS0FBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ3hDLG1CQUR3QztTQUE1QztBQUdBLFlBQUksS0FBSyxLQUFMLENBQVcsUUFBWCxLQUF3QixHQUF4QixFQUE2QjtBQUM3QixpQkFBSyxRQUFMLENBQWM7QUFDViwwQkFBVSxDQUFWO0FBQ0EsMEJBQVUsSUFBVjtBQUNBLHVCQUFPLEtBQVA7YUFISixFQUQ2QjtBQU03QixpQkFBSyxLQUFMLENBQVcsVUFBWCxHQU42QjtTQUFqQyxNQU9PO0FBQ0gsaUJBQUssUUFBTCxDQUFjO0FBQ1YsMEJBQVUsQ0FBVjtBQUNBLHVCQUFPLEtBQVA7YUFGSixFQURHO1NBUFA7OztBQTdGSyxxQkEyR1QsMkJBQVM7QUFDTCxlQUFPOztjQUFLLFdBQVUsaUJBQVYsRUFBTDtZQUNIOztrQkFBSyxXQUFXLFdBQVcsS0FBSyxNQUFMLEtBQWdCLE9BQWhCLEdBQTBCLEVBQTFCLENBQVg7QUFDWiwyQkFBTyxFQUFFLE1BQU0sSUFBQyxDQUFLLEtBQUwsQ0FBVyxJQUFYLElBQW1CLEtBQUssS0FBTCxDQUFXLFFBQVgsR0FBdUIsT0FBM0MsR0FBcUQsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixJQUF0QixFQUFwRTtBQUNBLGtDQUFlLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFmO0FBQ0EsaUNBQWMsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQWQ7QUFDQSxnQ0FBYSxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBYjtBQUNBLDZCQUFVLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBVjtpQkFMSjs7YUFERztZQVVELEtBQUssS0FBTCxDQUFXLElBQVgsR0FDSTs7O0FBQ0UsMkJBQU8sRUFBRSxPQUFPLGtCQUFQLEVBQVQ7QUFDQSwrQkFBWSxXQUFaO2lCQUZGO2dCQUlRLEtBQUssS0FBTCxDQUFXLFFBQVg7YUFMWixHQU9JOzs7QUFDRSwyQkFBTyxFQUFFLE9BQU8sc0JBQXNCLEtBQUssbUJBQUwsRUFBdEIsR0FBbUQsR0FBbkQsRUFBaEI7QUFDQSwrQkFBWSxnQkFBZ0IsS0FBSyxNQUFMLEtBQWdCLE9BQWhCLEdBQTBCLEVBQTFCLENBQWhCO2lCQUZkO2dCQUlRLEtBQUssS0FBTCxDQUFXLFNBQVg7YUFYWjtTQVZOLENBREs7OztXQTNHQTtFQUFlLE1BQU0sU0FBTjs7SUF5SWY7Ozs7Ozs7OztrQ0FVVCw2Q0FBa0I7QUFDZCxZQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsTUFBckIsRUFBNkI7QUFDN0IsbUJBQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxDQURzQjtTQUFqQztBQUdBLGVBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixDQUpPOzs7QUFWVCxrQ0FnQlQsMkJBQVEsR0FBRztBQUNQLGFBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsQ0FBekIsRUFETzs7O0FBaEJGLGtDQW1CVCwyQkFBUzs7O0FBQ0wsWUFBSSxTQUFTLEVBQVQsQ0FEQztBQUVMLGFBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsT0FBbkIsQ0FBMkIsVUFBQyxFQUFELEVBQUssR0FBTCxFQUFhO0FBQ3BDLGdCQUFJLE1BQU0sR0FBRyxDQUFILENBQU4sQ0FEZ0M7QUFFcEMsZ0JBQUksT0FBTyxHQUFHLENBQUgsQ0FBUCxDQUZnQztBQUdwQyxnQkFBSSxvQkFBb0IsTUFBQyxDQUFLLEtBQUwsQ0FBVyxNQUFYLEtBQXNCLEdBQXRCLEdBQTZCLFNBQTlCLEdBQTBDLEVBQTFDLENBSFk7QUFJcEMsbUJBQU8sSUFBUCxDQUNJOzs7QUFDSSx5QkFBTSxHQUFOO21CQUNJLGVBQWUsT0FBSyxPQUFMLENBQWEsSUFBYixTQUF3QixHQUF4QixDQUFmO0FBQ0osK0JBQVksbUJBQW1CLGlCQUFuQjtrQkFIaEI7Z0JBS0ssSUFMTDthQURKLEVBSm9DO0FBWXBDLGdCQUFJLE9BQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsTUFBckIsSUFBK0IsQ0FBQyxNQUFNLENBQU4sQ0FBRCxHQUFZLE9BQUssS0FBTCxDQUFXLFFBQVgsS0FBd0IsQ0FBcEMsRUFBdUM7QUFDdEUsdUJBQU8sSUFBUCxDQUFZLDRCQUFJLEtBQU0sT0FBTyxHQUFQLEVBQVYsQ0FBWixFQURzRTthQUExRTtTQVp1QixDQUEzQixDQUZLO0FBa0JMLFlBQUksZUFBZSxJQUFDLENBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsV0FBckIsR0FBb0MsaUJBQXJDLEdBQXlELHVCQUF6RCxDQWxCZDtBQW1CTCxZQUFJLGlCQUFpQixLQUFLLEtBQUwsQ0FBVyxNQUFYLEtBQXNCLElBQXRCLEdBQTZCLEVBQTdCLEdBQWtDLFdBQWxDLENBbkJoQjtBQW9CTCxlQUFPOztjQUFLLFdBQVcsb0JBQW9CLFlBQXBCLEdBQW1DLGNBQW5DLEdBQW9ELEtBQXBELEdBQTRELEtBQUssZUFBTCxHQUF1QixRQUF2QixFQUE1RCxFQUFoQjtZQUFrSCxNQUFsSDtTQUFQLENBcEJLOzs7aUJBbkJBOzs0QkFDYztBQUNuQixtQkFBTztBQUNILHVCQUFPLE1BQU0sU0FBTixDQUFnQixNQUFoQjtBQUNQLHlCQUFTLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNULDBCQUFVLE1BQU0sU0FBTixDQUFnQixNQUFoQjtBQUNWLHdCQUFRLE1BQU0sU0FBTixDQUFnQixNQUFoQjtBQUNSLCtCQUFlLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjthQUxuQixDQURtQjs7OztXQURkO0VBQTRCLE1BQU0sU0FBTjs7SUEyQzVCOzs7Ozs7Ozs7dUNBT1QsbUNBQVksS0FBSyxLQUFLO0FBQ2xCLFlBQUksU0FBUyxFQUFULENBRGM7QUFFbEIsYUFBSyxJQUFJLE1BQU0sR0FBTixFQUFXLE9BQU8sR0FBUCxFQUFZLEVBQUUsR0FBRixFQUFPO0FBQ25DLG1CQUFPLElBQVAsQ0FBWSxDQUFDLEdBQUQsRUFBTSxJQUFJLFFBQUosRUFBTixDQUFaLEVBRG1DO1NBQXZDO0FBR0EsZUFBTyxNQUFQLENBTGtCOzs7QUFQYix1Q0FjVCwyQkFBUztBQUNMLGVBQ0ksb0JBQUMsbUJBQUQ7QUFDSSxxQkFBVSxLQUFLLFdBQUwsQ0FBaUIsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQTNDO1dBQ0ssS0FBSyxLQUFMLENBRlQsQ0FESixDQURLOzs7aUJBZEE7OzRCQUNjO0FBQ25CLG1CQUFPO0FBQ0gscUJBQUssTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ0wscUJBQUssTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO2FBRlQsQ0FEbUI7Ozs7V0FEZDtFQUFpQyxNQUFNLFNBQU47O0lBd0JqQzs7Ozs7Ozs7O3NDQU9ULG1DQUFZLEtBQUssS0FBSztBQUNsQixZQUFJLFNBQVMsRUFBVCxDQURjO0FBRWxCLGFBQUssSUFBSSxNQUFNLEtBQUssS0FBTCxDQUFXLElBQUksR0FBSixDQUFqQixFQUEyQixPQUFPLEtBQUssS0FBTCxDQUFXLElBQUksR0FBSixDQUFsQixFQUE0QixFQUFFLEdBQUYsRUFBTztBQUNuRSxtQkFBTyxJQUFQLENBQVksQ0FBQyxNQUFNLENBQU4sRUFBUyxHQUFDLEdBQU0sQ0FBTixHQUFXLENBQUMsTUFBTSxDQUFOLENBQUQsQ0FBVSxPQUFWLENBQWtCLENBQWxCLENBQVosR0FBbUMsS0FBSyxLQUFMLENBQVcsTUFBTSxDQUFOLENBQVgsQ0FBb0IsUUFBcEIsRUFBbkMsQ0FBdEIsRUFEbUU7U0FBdkU7QUFHQSxlQUFPLE1BQVAsQ0FMa0I7OztBQVBiLHNDQWNULDJCQUFTO0FBQ0wsZUFDSSxvQkFBQyxtQkFBRDtBQUNJLHFCQUFVLEtBQUssV0FBTCxDQUFpQixLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBM0M7V0FDSyxLQUFLLEtBQUwsQ0FGVCxDQURKLENBREs7OztpQkFkQTs7NEJBQ2M7QUFDbkIsbUJBQU87QUFDSCxxQkFBSyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTCxxQkFBSyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7YUFGVCxDQURtQjs7OztXQURkO0VBQWdDLE1BQU0sU0FBTjs7SUF3QmhDOzs7Ozs7Ozs7aUNBYVQsNkJBQVU7QUFDTixZQUFJLEtBQUssS0FBTCxDQUFXLFVBQVgsRUFBdUI7QUFDdkIsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsRUFBQyxTQUFTLENBQUMsQ0FBRCxFQUFuQyxFQUR1QjtTQUEzQixNQUVPO0FBQ0gsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixDQUFuQixDQUF6QixDQURHO1NBRlA7OztBQWRLLGlDQW9CVCwyQkFBUztBQUNMLFlBQUksS0FBSyxLQUFMLENBQVcsVUFBWCxFQUF1QjtBQUN2QixpQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixFQUFDLFNBQVMsQ0FBVCxFQUExQixFQUR1QjtTQUEzQixNQUVPO0FBQ0gsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixDQUFuQixDQUF6QixDQURHO1NBRlA7OztBQXJCSyxpQ0EyQlQsMkJBQVM7QUFDTCxlQUNJOztjQUFLLFdBQVUsc0JBQVYsRUFBTDtZQUNJOzs7QUFDSSwrQkFBVSxnQkFBVjttQkFDSSxlQUFlLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBZixFQUZSOzthQURKO1lBT0k7O2tCQUFLLFdBQVUsT0FBVixFQUFMO2dCQUNNLEtBQUssS0FBTCxDQUFXLEtBQVg7YUFSVjtZQVVJOzs7QUFDSSwrQkFBVSxlQUFWO21CQUNJLGVBQWUsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFmLEVBRlI7O2FBVko7U0FESixDQURLOzs7aUJBM0JBOzs0QkFDYztBQUNuQixtQkFBTztBQUNILHVCQUFPLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNQLCtCQUFlLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjtBQUNmLDRCQUFZLE1BQU0sU0FBTixDQUFnQixJQUFoQjthQUhoQixDQURtQjs7Ozs0QkFPRztBQUN0QixtQkFBTztBQUNILDRCQUFZLEtBQVo7YUFESixDQURzQjs7OztXQVJqQjtFQUEyQixNQUFNLFNBQU47O0lBa0QzQjs7Ozs7Ozs7O2dDQWFULDZCQUFVO0FBQ04sWUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFYLEVBQXVCO0FBQ3ZCLGlCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLEVBQUMsU0FBUyxDQUFDLEdBQUQsRUFBbkMsRUFEdUI7U0FBM0IsTUFFTztBQUNILGlCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsR0FBbkIsQ0FBekIsQ0FERztTQUZQOzs7QUFkSyxnQ0FvQlQsMkJBQVM7QUFDTCxZQUFJLEtBQUssS0FBTCxDQUFXLFVBQVgsRUFBdUI7QUFDdkIsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsRUFBQyxTQUFTLEdBQVQsRUFBMUIsRUFEdUI7U0FBM0IsTUFFTztBQUNILGlCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsR0FBbkIsQ0FBekIsQ0FERztTQUZQOzs7QUFyQkssZ0NBMkJULDJCQUFTO0FBQ0wsZUFDSTs7Y0FBSyxXQUFVLHNCQUFWLEVBQUw7WUFDSTs7O0FBQ0ksK0JBQVUsZ0JBQVY7bUJBQ0ksZUFBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWYsRUFGUjs7YUFESjtZQU9JOztrQkFBSyxXQUFVLE9BQVYsRUFBTDtnQkFDTSxLQUFLLEtBQUwsQ0FBVyxLQUFYO2FBUlY7WUFVSTs7O0FBQ0ksK0JBQVUsZUFBVjttQkFDSSxlQUFlLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBZixFQUZSOzthQVZKO1NBREosQ0FESzs7O2lCQTNCQTs7NEJBQ2M7QUFDbkIsbUJBQU87QUFDSCx1QkFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDUCwrQkFBZSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7QUFDZiw0QkFBWSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7YUFIaEIsQ0FEbUI7Ozs7NEJBT0c7QUFDdEIsbUJBQU87QUFDSCw0QkFBWSxLQUFaO2FBREosQ0FEc0I7Ozs7V0FSakI7RUFBMEIsTUFBTSxTQUFOOztBQWtEdkMsSUFBSSxjQUFjLEVBQWQ7O0lBRVM7Ozs7OzRCQUNjO0FBQ25CLG1CQUFPO0FBQ0gsMEJBQVUsTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1YsK0JBQWUsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO0FBQ2YsNEJBQVksTUFBTSxTQUFOLENBQWdCLElBQWhCO2FBSGhCLENBRG1COzs7O0FBT3ZCLGFBUlMsU0FRVCxDQUFZLEtBQVosRUFBbUI7OEJBUlYsV0FRVTs7c0RBQ2YsNkJBQU0sS0FBTixHQURlOztBQUVmLGVBQUssS0FBTCxHQUFhLFlBQVksT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFaLElBQW9DO0FBQzdDLG9CQUFRLEtBQVI7QUFDQSxtQkFBTyxDQUFQO0FBQ0EsdUJBQVcsTUFBWDtBQUNBLHNCQUFVLElBQVY7U0FKUyxDQUZFO0FBUWYsWUFBSSxPQUFLLEtBQUwsQ0FBVyxNQUFYLEVBQW1CO0FBQ25CLG1CQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQXNCLFlBQVksT0FBSyxJQUFMLENBQVUsSUFBVixRQUFaLEVBQWtDLEVBQWxDLENBQXRCO0FBRG1CLFNBQXZCO3NCQVJlO0tBQW5COztBQVJTLHdCQW9CVCx1REFBdUI7QUFDbkIsc0JBQWMsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFkLENBRG1CO0FBRW5CLG9CQUFZLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBWixHQUFtQyxLQUFLLEtBQUwsQ0FGaEI7OztBQXBCZCx3QkF3QlQscUJBQU07QUFDRixlQUFPLElBQUssSUFBSixFQUFELENBQWEsT0FBYixFQUFQLENBREU7OztBQXhCRyx3QkEyQlQsMkJBQVM7QUFDTCxhQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLEtBQUssSUFBTCxFQUFwQixHQUFrQyxLQUFLLEtBQUwsRUFBbEMsQ0FESzs7O0FBM0JBLHdCQThCVCx5QkFBUTtBQUNKLGFBQUssUUFBTCxDQUFjO0FBQ1Ysb0JBQVEsSUFBUjtBQUNBLHNCQUFVLEtBQUssR0FBTCxLQUFhLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDdkIsc0JBQVUsWUFBWSxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZixDQUFaLEVBQWtDLEVBQWxDLENBQVY7U0FISixFQURJOzs7QUE5QkMsd0JBcUNULHVCQUFPO0FBQ0gsc0JBQWMsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFkLENBREc7QUFFSCxhQUFLLFFBQUwsQ0FBYztBQUNWLG9CQUFRLEtBQVI7QUFDQSxtQkFBTyxLQUFLLEtBQUwsRUFBUDtTQUZKLEVBRkc7OztBQXJDRSx3QkE0Q1QseUJBQVE7QUFDSixzQkFBYyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQWQsQ0FESTtBQUVKLGFBQUssUUFBTCxDQUFjO0FBQ1Ysb0JBQVEsS0FBUjtBQUNBLG1CQUFPLENBQVA7U0FGSixFQUZJOzs7QUE1Q0Msd0JBbURULHlCQUFRO0FBQ0osZUFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQ0EsS0FBSyxHQUFMLEtBQWEsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUNkLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FIRjs7O0FBbkRDLHdCQXdEVCx1QkFBTztBQUNILFlBQUksWUFBWSxLQUFLLEtBQUwsRUFBWixDQUREO0FBRUgsWUFBSSxjQUFjLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0I7QUFDaEMsaUJBQUssUUFBTCxDQUFjO0FBQ1YsdUJBQU8sS0FBSyxLQUFMLEVBQVA7YUFESixFQURnQztTQUFwQzs7O0FBMURLLHdCQWdFVCxtQkFBSSxLQUFLLE1BQU07QUFDWCxZQUFJLElBQUksU0FBUyxJQUFJLFFBQUosRUFBVCxDQURHO0FBRVgsZUFBTyxFQUFFLE1BQUYsQ0FBUyxFQUFFLE1BQUYsR0FBVyxJQUFYLENBQWhCLENBRlc7OztBQWhFTix3QkFvRVQscUNBQWM7QUFDVixZQUFJLE1BQU0sS0FBSyxLQUFMLEVBQU4sQ0FETTtBQUVWLFlBQUksSUFBSSxDQUFKO1lBQU8sSUFBSSxDQUFKLENBRkQ7QUFHVixZQUFJLFNBQVMsRUFBVCxDQUhNO0FBSVYsWUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFPLEtBQUssSUFBTCxDQUFQLENBQWYsQ0FKVTtBQUtWLGVBQU8sS0FBSyxJQUFMLENBTEc7QUFNVixZQUFJLEtBQUssS0FBTCxDQUFXLE1BQU0sSUFBTixDQUFmLENBTlU7QUFPVixlQUFPLEVBQUUsUUFBRixLQUFlLEdBQWYsR0FBcUIsS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFZLENBQVosQ0FBckIsQ0FQRzs7O0FBcEVMLHdCQTZFVCwyQkFBUztBQUNMLGVBQ0k7O2NBQUssV0FBVSxXQUFWLEVBQUw7WUFDSTs7O0FBQ0ksK0JBQVUsZ0NBQVY7bUJBQ0ksZUFBZSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQWYsRUFGUjtnQkFJTSxlQUFFLGdDQUFGLENBSk47YUFESjtZQU9JOzs7QUFDSSwrQkFBWSxxQ0FBcUMsS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixTQUFwQixHQUFnQyxFQUFoQyxDQUFyQzttQkFDUixlQUFlLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBZixFQUZSO2dCQUlNLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsZUFBRSwrQkFBRixDQUFwQixHQUF5RCxlQUFFLGdDQUFGLENBQXpEO2FBWFY7WUFhSTs7a0JBQUssV0FBVSxNQUFWLEVBQUw7Z0JBQ00sS0FBSyxXQUFMLEVBRE47YUFiSjtTQURKLENBREs7OztXQTdFQTtFQUFrQixNQUFNLFNBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xuXG5pbXBvcnQge1xuICAgIERpc2NpcGxpbmVSZXN1bHRzVGFibGUsXG4gICAgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSxcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGUsXG59IGZyb20gXCIuL3Jvc2ZhcnIvZGlzY2lwbGluZV9yZXN1bHRzXCI7XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c0J1dHRvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHNpZ25hbChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17IHRoaXMuc2lnbmFsKFwiZG9jeFwiKSB9PlxuICAgICAgICAgICAgICAgIERPQ1hcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcmVyOiBcInBhZ2VcIixcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemF0aW9uXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJ1bnNfbG9hZGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZS5nZXREb21haW4oXCJkaXNjaXBsaW5lX3Jlc3VsdHNfXCIgKyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpO1xuICAgICAgICB0aGlzLnJlbG9hZF9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkU3RhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJ0b3VyX3Jlc3VsdHNfY2hhbmdlZCByZWxvYWRfZGF0YVwiLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRvdXJfc3RvcmFnZSA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpLmJ5X2lkKG1lc3NhZ2VbXCJ0b3VyX2lkXCJdKTtcbiAgICAgICAgICAgIGlmICghdG91cl9zdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRvdXJfc3RvcmFnZS5kaXNjaXBsaW5lLmlkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hdXRvRG9jeCkge1xuICAgICAgICAgICAgbGV0IGludGVydmFsX2lkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZnMucHJpbnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihcImRpc2NpcGxpbmVfcmVzdWx0c19cIiArIHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCk7XG4gICAgfVxuICAgIHJlbG9hZFN0YXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuZGlzY2lwbGluZV9yZXN1bHRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnJ1bnNfbG9hZGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0b3JhZ2VfcnVucyA9IHRoaXMuc3RvcmFnZS5nZXQoXCJSdW5cIilcbiAgICAgICAgbGV0IHJlc3VsdHMgPSB0aGlzLnN0YXRlLmRpc2NpcGxpbmVfcmVzdWx0cztcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IFtdXG4gICAgICAgIHZhciBTQ0hFTUEgPSB7XG4gICAgICAgICAgICB0b3VyOiB7fSxcbiAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgc3BvcnRzbWVuOiB7fSxcbiAgICAgICAgICAgICAgICBjbHViOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBuZXdfc3RhdGUucHVzaCh7XG4gICAgICAgICAgICAgICAgcGxhY2U6IHJlc3VsdHNbaV0ucGxhY2UsXG4gICAgICAgICAgICAgICAgcnVuOiBzdG9yYWdlX3J1bnMuYnlfaWQocmVzdWx0c1tpXS5ydW5faWQpLnNlcmlhbGl6ZShTQ0hFTUEpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsb2FkZWQ6IHRydWUsXG4gICAgICAgICAgICB0YWJsZTogbmV3X3N0YXRlLFxuICAgICAgICAgICAgZGlzY2lwbGluZTogdGhpcy5zdG9yYWdlLmdldChcIkRpc2NpcGxpbmVcIikuYnlfaWQodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKS5zZXJpYWxpemUoe1xuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZFJlc3VsdHMoKSB7XG4gICAgICAgIEFwaShcImRpc2NpcGxpbmUuZ2V0X3Jlc3VsdHNcIiwge1xuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLFxuICAgICAgICB9KVxuICAgICAgICAub25TdWNjZXNzKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfcmVzdWx0czogcmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU3RhdGUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIEFwaShcImRpc2NpcGxpbmUuZ2V0XCIsIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxuICAgICAgICAgICAgICAgIHRvdXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuYWRkVG9EQihcIkRpc2NpcGxpbmVcIiwgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLCB0aGlzLnN0b3JhZ2UpXG4gICAgICAgIC5vblN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ydW5zX2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZFN0YXRlKHRoaXMpXG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuXG4gICAgLy8gTGlzdGVuZXJzXG5cbiAgICBvblNpZ25hbChtZXNzYWdlKSB7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZSkge1xuICAgICAgICBjYXNlIFwiZG9jeFwiOlxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBtZXNzYWdlOlwiLCBtZXNzYWdlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyaW5nXG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMucmVuZGVyZXIpIHtcbiAgICAgICAgY2FzZSBcInByZXNlbnRlclwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9IHJlZj1cIm1haW5fdGFibGVcIiAvPlxuICAgICAgICBjYXNlIFwic2NyZWVuX29wZXJhdG9yXCI6XG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVxuICAgICAgICAgICAgICAgIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQbGFjZT17IHRoaXMucHJvcHMuc2VsZWN0ZWRQbGFjZSB9XG4gICAgICAgICAgICAgICAgb25QbGFjZVNlbGVjdD17IHRoaXMucHJvcHMub25QbGFjZVNlbGVjdCB9XG4gICAgICAgICAgICAgICAgcmVmPVwibWFpbl90YWJsZVwiIC8+XG4gICAgICAgIGNhc2UgXCJwYWdlXCI6XG4gICAgICAgICAgICByZXR1cm4gPFByaW50YWJsZVxuICAgICAgICAgICAgICAgIHJlZj1cInByaW50YWJsZVwiXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSB9XG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMuZGlzY2lwbGluZV9yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgYm9keT17IDxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9IC8+IH0gLz5cbiAgICAgICAgY2FzZSBcInRhYmxlXCI6XG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzVGFibGUgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH0gcmVmPVwibWFpbl90YWJsZVwiIC8+XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUubG9hZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj48TG9hZGVyIC8+PC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHMuZG9jeFwiKSB7XG4gICAgICAgIERvY3goZmlsZW5hbWUpXG4gICAgICAgICAgICAuc2V0SGVhZGVyKHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXG4gICAgICAgICAgICAuc2V0VGl0bGUxKF8oXCJhZG1pbi5oZWFkZXJzLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS5kaXNjaXBsaW5lLm5hbWUpXG4gICAgICAgICAgICAuc2V0Qm9keSh0aGlzLnJlZnMucHJpbnRhYmxlLmZldGNoUHJpbnRhYmxlRGF0YSgpKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdXItbmFtZVwiLCBcImJhY2tncm91bmRcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJwYWRkaW5nXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNwb3J0c21lblwiLCBcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLnNhdmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBvblRvdWNoRW5kT3JDbGljayB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuXG5cbmZ1bmN0aW9uIF9fKCkge1xuICAgIGxldCBhcmdzID0gW107XG4gICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcbiAgICB9XG4gICAgcmV0dXJuIF8oXCJzY29yaW5nX3N5c3RlbXMucm9zZmFyci5cIiArIGFyZ3VtZW50c1swXSwgLi4uYXJncyk7XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGxldCBuZWVkX3JlbmRlciA9ICh0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIpIHx8IChwcmV2X3Jvdy5ydW4udG91ci5pZCAhPT0gbmV4dF9yb3cucnVuLnRvdXIuaWQpXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT48dGggY2xhc3NOYW1lPVwidG91ci1uYW1lXCIgY29sU3Bhbj1cIjZcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBuZXh0X3Jvdy5ydW4udG91ci5uYW1lIH08L3A+XG4gICAgICAgIDwvdGg+PC90cj47XG4gICAgfVxuICAgIHJlbmRlclJvdyhyb3cpIHtcbiAgICAgICAgbGV0IHAgPSByb3cucnVuLnBhcnRpY2lwYW50O1xuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9PlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyByb3cucGxhY2UgPT09IG51bGwgPyBcIlwiIDogcm93LnBsYWNlIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggbnVtYmVyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHAubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTM2XCIgY29sU3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic3BvcnRzbWVuXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IHAuZm9ybWF0aW9uX25hbWUgPyA8dHI+PHRoIGNvbFNwYW49XCIyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBwLmZvcm1hdGlvbl9uYW1lIH08L3A+PC90aD48L3RyPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICB7IHAuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PiA8dHIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy03NVwiPjxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLnN1YnN0aXR1dGUgPyA8aT4gKHsgXyhcImFkbWluLmxhYmVscy5zdWJcIikgfS4pPC9pPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBzLnllYXJfb2ZfYmlydGggfTwvcD48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPiApIH1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY2x1YlwiPjxwPnsgcC5jbHViLm5hbWUgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY29hY2hlc1wiPjxwPnsgcC5jb2FjaGVzLnNwbGl0KFwiLFwiKS5tYXAoKGMpID0+IFtjLnRyaW0oKSwgPGJyIGtleT1cIlhcIiAvPl0pIH08L3A+PC90ZD5cbiAgICAgICAgPC90cj47XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgLSAxXSwgdGFibGVbaV0pO1xuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjdcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTlcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jb2FjaGVzXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG5cbmNsYXNzIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9nZ2xlQWN0aXZlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogIXRoaXMuc3RhdGUuYWN0aXZlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPXsgXCJyb3dcIiArICggdGhpcy5zdGF0ZS5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy50b2dnbGVBY3RpdmUuYmluZCh0aGlzKSl9Pjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGxhY2VcIiByb3dTcGFuPVwiM1wiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucGxhY2UgPT09IG51bGwgPyBcIlwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlLWxhYmVsXCI+eyBfKFwicHJlc2VudGVyLmxhYmVscy5wbGFjZVwiKSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm51bWJlclwiPnsgcC5udW1iZXIgfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHAubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIiBjb2xTcGFuPVwiMlwiPnsgcC5jbHViLm5hbWUgfTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjb2FjaGVzXCIgY29sU3Bhbj1cIjJcIj57IHAuY29hY2hlcyB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGxldCBuZWVkX3JlbmRlciA9ICh0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIpIHx8IChwcmV2X3Jvdy5ydW4udG91ci5pZCAhPT0gbmV4dF9yb3cucnVuLnRvdXIuaWQpXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGtleT17IFwiSFwiICsgbmV4dF9yb3cucnVuLmlkIH0+XG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdykge1xuICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGVSb3cga2V5PXsgXCJSXCIgKyByb3cucnVuLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcm93LnJ1bi5wYXJ0aWNpcGFudCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9IC8+XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhYmxlLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSArIDFdLCB0YWJsZVtpXSk7XG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPXsgXCJyb3dcIiArICggdGhpcy5wcm9wcy5zZWxlY3RlZCA/IFwiIHNlbGVjdGVkXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMucHJvcHMub25DbGljayl9Pjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGxhY2VcIiByb3dTcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucGxhY2UgPT09IG51bGwgPyBcIlwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlLWxhYmVsXCI+eyBfKFwicHJlc2VudGVyLmxhYmVscy5wbGFjZVwiKSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm51bWJlclwiPnsgcC5udW1iZXIgfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHAubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIiBjb2xTcGFuPVwiMlwiPnsgcC5jbHViLm5hbWUgfTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGxldCBuZWVkX3JlbmRlciA9ICh0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIpIHx8IChwcmV2X3Jvdy5ydW4udG91ci5pZCAhPT0gbmV4dF9yb3cucnVuLnRvdXIuaWQpXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGtleT17IFwiSFwiICsgbmV4dF9yb3cucnVuLmlkIH0+XG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdywgcGxhY2UpIHtcbiAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGVSb3dcbiAgICAgICAgICAgIGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9XG4gICAgICAgICAgICBwYXJ0aWNpcGFudD17IHJvdy5ydW4ucGFydGljaXBhbnQgfVxuICAgICAgICAgICAgcGxhY2U9eyByb3cucGxhY2UgfVxuICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMub25QbGFjZVNlbGVjdChwbGFjZSkgfVxuICAgICAgICAgICAgc2VsZWN0ZWQ9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgIT09IG51bGwgJiYgcGxhY2UgPj0gdGhpcy5wcm9wcy5zZWxlY3RlZFBsYWNlIH0gLz5cbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gdGFibGUubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpICsgMV0sIHRhYmxlW2ldKTtcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0sIGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcblxuXG5leHBvcnQgY2xhc3MgU2NyZWVuTWFuaWZlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHJhd19tYW5pZmVzdCkge1xuICAgICAgICB0aGlzLnJhd19kYXRhID0gcmF3X21hbmlmZXN0O1xuICAgICAgICB0aGlzLmlkeF9ieV9pZCA9IHt9O1xuICAgICAgICB0aGlzLnJhd19kYXRhLnNjcmVlbnMuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB0aGlzLmlkeF9ieV9pZFtpdGVtLmlkXSA9IGlkeCk7XG4gICAgfVxuICAgIGdldFNjcmVlbkRhdGFCeUlkKGlkLCBpc19kZWZhdWx0PWZhbHNlKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnJhd19kYXRhLnNjcmVlbnNbdGhpcy5pZHhfYnlfaWRbaWRdXTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChpc19kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3X2RhdGEuc2NyZWVuc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRTY3JlZW5EYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZ2V0RGVmYXVsdFNjcmVlbkRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNjcmVlbkRhdGFCeUlkKHRoaXMucmF3X2RhdGFbXCJkZWZhdWx0XCJdLCB0cnVlKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFNjcmVlbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbl9pZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWFuaWZlc3Q6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLm1hbmlmZXN0ID0gbmV3IFNjcmVlbk1hbmlmZXN0KHRoaXMucHJvcHMubWFuaWZlc3QpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY3VycmVudF9zY3JlZW46IHRoaXMubWFuaWZlc3QuZ2V0RGVmYXVsdFNjcmVlbkRhdGEoKSxcbiAgICAgICAgICAgIG5leHRfc2NyZWVuOiBudWxsLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5nZXRcIiwgeyBjb21wZXRpdGlvbl9pZDogdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZCwgY2hpbGRyZW46IHt9IH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIkNvbXBldGl0aW9uXCIsIHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgbmV3X2RhdGEgPSBzdG9yYWdlLmdldChcIkNvbXBldGl0aW9uXCIpLmJ5X2lkKHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpLnNlcmlhbGl6ZSh7fSkuc2NyZWVuX2RhdGE7XG4gICAgICAgIGlmIChuZXdfZGF0YS5zY3JlZW5faWQgIT09IHRoaXMuc3RhdGUuY3VycmVudF9zY3JlZW4uaWQgJiYgbmV3X2RhdGEuc2NyZWVuX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNjcmVlbihuZXdfZGF0YS5zY3JlZW5faWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFVybEJ5U2NyZWVuRGF0YShkYXRhKSB7XG4gICAgICAgIHJldHVybiBcIi9tZWRpYS9zY3JlZW4vXCIgKyBkYXRhLnRlbXBsYXRlICsgXCIjXCIgKyB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkO1xuICAgIH1cbiAgICBjaGFuZ2VTY3JlZW4obmV3X2lkKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbmV4dF9zY3JlZW46IHRoaXMubWFuaWZlc3QuZ2V0U2NyZWVuRGF0YUJ5SWQobmV3X2lkKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN3aXRjaEZyYW1lcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50X3NjcmVlbjogdGhpcy5zdGF0ZS5uZXh0X3NjcmVlbixcbiAgICAgICAgICAgIG5leHRfc2NyZWVuOiBudWxsLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJvdXRlclwiPlxuICAgICAgICAgICAgPGlmcmFtZSBzcmM9eyB0aGlzLmdldFVybEJ5U2NyZWVuRGF0YSh0aGlzLnN0YXRlLmN1cnJlbnRfc2NyZWVuKSB9XG4gICAgICAgICAgICAgICAgICAgIGtleT17IHRoaXMuZ2V0VXJsQnlTY3JlZW5EYXRhKHRoaXMuc3RhdGUuY3VycmVudF9zY3JlZW4pIH0gLz5cbiAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5uZXh0X3NjcmVlblxuICAgICAgICAgICAgICAgID8gPGlmcmFtZSBzcmM9eyB0aGlzLmdldFVybEJ5U2NyZWVuRGF0YSh0aGlzLnN0YXRlLm5leHRfc2NyZWVuKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHRoaXMuZ2V0VXJsQnlTY3JlZW5EYXRhKHRoaXMuc3RhdGUubmV4dF9zY3JlZW4pIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2FkPXsgdGhpcy5zd2l0Y2hGcmFtZXMuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgICAgICAgICAgOiBudWxsIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgb25Ub3VjaE9yQ2xpY2ssIG9uVG91Y2hFbmRPckNsaWNrIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBjbG9uZSB9IGZyb20gXCJjb21tb24vdG9vbHNcIjtcbmltcG9ydCB7IFNjcmVlbk1hbmlmZXN0IH0gZnJvbSBcImNsaWVudHMvc2NyZWVuL21haW5cIjtcbmltcG9ydCB7IERpc2NpcGxpbmVSZXN1bHRzIH0gZnJvbSBcImFkbWluL2p1ZGdpbmcvZGlzY2lwbGluZV9yZXN1bHRzXCI7XG5cblxuY2xhc3MgU2NyZWVuT3BlcmF0b3JUb3VyU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGV0aXRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cGFuZFNlbGVjdChvcmlnaW5hbF9ldmVudCkge1xuICAgICAgICBvcmlnaW5hbF9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvcmlnaW5hbF9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRzXCIpO1xuICAgICAgICBlLmluaXRNb3VzZUV2ZW50KFwibW91c2Vkb3duXCIsIHRydWUsIHRydWUsIHdpbmRvdywgMCwgMCwgMCwgMCwgMCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICB0aGlzLl9zZWxlY3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnByb3BzLmNvbXBldGl0aW9uLmRpc2NpcGxpbmVzLmZvckVhY2goKGRpc2NpcGxpbmUpID0+XG4gICAgICAgICAgICBkaXNjaXBsaW5lLnRvdXJzLmZvckVhY2goKHRvdXIpID0+XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9eyB0b3VyLmlkIH0ga2V5PXsgdG91ci5pZCB9PlxuICAgICAgICAgICAgICAgICAgICB7IGRpc2NpcGxpbmUubmFtZSB9ICZtZGFzaDsgeyB0b3VyLm5hbWUgKyAodG91ci5maW5hbGl6ZWQgPyBcIiBbb3Zlcl1cIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj4pXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiA8c2VsZWN0IHZhbHVlPXsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj17IGMgPT4gdGhpcy5fc2VsZWN0ID0gYyB9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKGUpID0+IHRoaXMucHJvcHMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUgfHwgbnVsbCApIH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgdGhpcy5leHBhbmRTZWxlY3QuYmluZCh0aGlzKSB9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPi0tLS0tLS0tLS08L29wdGlvbj5cbiAgICAgICAgICAgIHsgb3B0aW9ucyB9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgIH1cbn1cblxuY2xhc3MgU2NyZWVuT3BlcmF0b3JEaXNjaXBsaW5lUGxhY2VTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnByb3BzLmNvbXBldGl0aW9uLmRpc2NpcGxpbmVzLmZvckVhY2goKGRpc2NpcGxpbmUpID0+XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17IGRpc2NpcGxpbmUuaWQgfSBrZXk9eyBkaXNjaXBsaW5lLmlkIH0+XG4gICAgICAgICAgICAgICAgeyBkaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgPC9vcHRpb24+KVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gPHNlbGVjdCB2YWx1ZT17IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IChlKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlIHx8IG51bGwpIH0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+LS0tLS0tLS0tLTwvb3B0aW9uPlxuICAgICAgICAgICAgeyBvcHRpb25zIH1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgfVxufVxuXG5jbGFzcyBTY3JlZW5PcGVyYXRvckhlYXRTZWxlY3RvclJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGhlYXQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJ1bnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT17IFwiaGVhdFwiICsgKHRoaXMucHJvcHMuc2VsZWN0ZWQgPyBcIiBzZWxlY3RlZFwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uQ2xpY2spfT5cbiAgICAgICAgICAgIDx0Ym9keT48dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImhlYXQtbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLmhlYXQgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYXQtbGFiZWxcIj57IF8oXCJzY3JlZW5fb3BlcmF0b3IubGFiZWxzLmhlYXRcIikgfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50c1wiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucnVucy5tYXAoKHJ1bikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIiBrZXk9eyBydW4uaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm51bWJlclwiPnsgcnVuLnBhcnRpY2lwYW50Lm51bWJlciB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+eyBydW4ucGFydGljaXBhbnQubmFtZSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICB9XG59XG5cbmNsYXNzIFNjcmVlbk9wZXJhdG9ySGVhdFNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdXJfaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uSGVhdFNlbGVjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZS5nZXREb21haW4oXCJ0b3VyX1wiICsgdGhpcy5wcm9wcy50b3VyX2lkKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJ0b3VyX1wiICsgdGhpcy5wcm9wcy50b3VyX2lkKTtcbiAgICB9XG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgIHZhciBTQ0hFTUEgPSB7XG4gICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIGxldCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIilcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLnByb3BzLnRvdXJfaWQpXG4gICAgICAgICAgICAuc2VyaWFsaXplKFNDSEVNQSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b3VyOiBzZXJpYWxpemVkIH0pO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyX2lkLFxuICAgICAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7fVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJfaWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91cl9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBtYXhfaGVhdCA9IE1hdGgubWF4KC4uLnRoaXMuc3RhdGUudG91ci5ydW5zLm1hcCgocnVuKSA9PiBydW4uaGVhdCkpO1xuICAgICAgICBmb3IgKGxldCBoZWF0ID0gMTsgaGVhdCA8PSBtYXhfaGVhdDsgKytoZWF0KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCg8U2NyZWVuT3BlcmF0b3JIZWF0U2VsZWN0b3JSb3dcbiAgICAgICAgICAgICAgICBrZXk9eyBoZWF0IH1cbiAgICAgICAgICAgICAgICBydW5zPXsgdGhpcy5zdGF0ZS50b3VyLnJ1bnMuZmlsdGVyKChydW4pID0+IHJ1bi5oZWF0ID09PSBoZWF0KSB9XG4gICAgICAgICAgICAgICAgaGVhdD17IGhlYXQgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsgdGhpcy5wcm9wcy52YWx1ZSA9PT0gaGVhdCB9XG4gICAgICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMub25IZWF0U2VsZWN0KGhlYXQpIH0gLz4pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaGVhdC1zZWxlY3RvclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi13YXJuaW5nIGJ0bi1yZXNldC1oZWF0XCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaEVuZE9yQ2xpY2soKCkgPT4gdGhpcy5wcm9wcy5vbkhlYXRTZWxlY3QobnVsbCkpIH0+XG4gICAgICAgICAgICAgICAgeyBfKFwic2NyZWVuX29wZXJhdG9yLmJ1dHRvbnMucmVzZXRfaGVhdFwiKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHsgcmVzdWx0IH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBTY3JlZW5PcGVyYXRvclBsYWNlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXdhcm5pbmcgYnRuLXJlc2V0LXBsYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaEVuZE9yQ2xpY2soKCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsKSkgfT5cbiAgICAgICAgICAgICAgICB7IF8oXCJzY3JlZW5fb3BlcmF0b3IuYnV0dG9ucy5yZXNldF9wbGFjZVwiKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxEaXNjaXBsaW5lUmVzdWx0c1xuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQgfVxuICAgICAgICAgICAgICAgIHJlbmRlcmVyPVwic2NyZWVuX29wZXJhdG9yXCJcbiAgICAgICAgICAgICAgICBvblBsYWNlU2VsZWN0PXsgKHBsYWNlKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKHBsYWNlKSB9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQbGFjZT17IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIGtleT17IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgU2NyZWVuT3BlcmF0b3JUb3VySGVhdENvbnRyb2xzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIG9uVG91ckNoYW5nZShuZXdfdmFsdWUpIHtcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IGNsb25lKHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUpO1xuICAgICAgICBuZXdfc3RhdGUudG91cl9pZCA9IG5ld192YWx1ZTtcbiAgICAgICAgbmV3X3N0YXRlLmhlYXQgPSBudWxsO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld19zdGF0ZSk7XG4gICAgfVxuICAgIG9uSGVhdENoYW5nZShuZXdfdmFsdWUpIHtcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IGNsb25lKHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUpO1xuICAgICAgICBuZXdfc3RhdGUuaGVhdCA9IG5ld192YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfc3RhdGUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGgzPnsgXyhcInNjcmVlbl9vcGVyYXRvci5oZWFkZXJzLnRvdXJcIikgfTwvaDM+XG4gICAgICAgICAgICA8U2NyZWVuT3BlcmF0b3JUb3VyU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IHRoaXMucHJvcHMuY29tcGV0aXRpb24gfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5jb250cm9sc19zdGF0ZS50b3VyX2lkIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25Ub3VyQ2hhbmdlLmJpbmQodGhpcykgfSAvPlxuICAgICAgICAgICAgPGgzPnsgXyhcInNjcmVlbl9vcGVyYXRvci5oZWFkZXJzLmhlYXRcIikgfTwvaDM+XG4gICAgICAgICAgICA8U2NyZWVuT3BlcmF0b3JIZWF0U2VsZWN0b3JcbiAgICAgICAgICAgICAgICBrZXk9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQgfVxuICAgICAgICAgICAgICAgIHRvdXJfaWQ9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5jb250cm9sc19zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICBvbkhlYXRTZWxlY3Q9eyB0aGlzLm9uSGVhdENoYW5nZS5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBTY3JlZW5PcGVyYXRvclRvdXJDb250cm9scyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250cm9sc19zdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgY29tcGV0aXRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBvblRvdXJDaGFuZ2UobmV3X3ZhbHVlKSB7XG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBjbG9uZSh0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlKTtcbiAgICAgICAgbmV3X3N0YXRlLnRvdXJfaWQgPSBuZXdfdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3X3N0YXRlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxoMz57IF8oXCJzY3JlZW5fb3BlcmF0b3IuaGVhZGVycy50b3VyXCIpIH08L2gzPlxuICAgICAgICAgICAgPFNjcmVlbk9wZXJhdG9yVG91clNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb249eyB0aGlzLnByb3BzLmNvbXBldGl0aW9uIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUudG91cl9pZCB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uVG91ckNoYW5nZS5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBTY3JlZW5PcGVyYXRvckRpc2NpcGxpbmVQbGFjZUNvbnRyb2xzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIG9uRGlzY2lwbGluZUNoYW5nZShuZXdfdmFsdWUpIHtcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IGNsb25lKHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUpO1xuICAgICAgICBuZXdfc3RhdGUuZGlzY2lwbGluZV9pZCA9IG5ld192YWx1ZTtcbiAgICAgICAgbmV3X3N0YXRlLnBsYWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfc3RhdGUpO1xuICAgIH1cbiAgICBvblBsYWNlQ2hhbmdlKG5ld192YWx1ZSkge1xuICAgICAgICBsZXQgbmV3X3N0YXRlID0gY2xvbmUodGhpcy5wcm9wcy5jb250cm9sc19zdGF0ZSk7XG4gICAgICAgIG5ld19zdGF0ZS5wbGFjZSA9IG5ld192YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfc3RhdGUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGgzPnsgXyhcInNjcmVlbl9vcGVyYXRvci5oZWFkZXJzLmRpc2NpcGxpbmVcIikgfTwvaDM+XG4gICAgICAgICAgICA8U2NyZWVuT3BlcmF0b3JEaXNjaXBsaW5lUGxhY2VTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbiB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLmRpc2NpcGxpbmVfaWQgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkRpc2NpcGxpbmVDaGFuZ2UuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgICAgICA8aDM+eyBfKFwic2NyZWVuX29wZXJhdG9yLmhlYWRlcnMucGxhY2VzXCIpIH08L2gzPlxuICAgICAgICAgICAgPFNjcmVlbk9wZXJhdG9yUGxhY2VTZWxlY3RvclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLmRpc2NpcGxpbmVfaWQgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5jb250cm9sc19zdGF0ZS5wbGFjZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uUGxhY2VDaGFuZ2UuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlbk9wZXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYW5pZmVzdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBuZXcgU2NyZWVuTWFuaWZlc3QodGhpcy5wcm9wcy5tYW5pZmVzdClcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBudWxsLFxuICAgICAgICAgICAgcGVuZGluZ19kYXRhOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwiY29tcGV0aXRpb24uZ2V0XCIsIHsgY29tcGV0aXRpb25faWQ6IHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQsIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lczoge1xuICAgICAgICAgICAgICAgIHRvdXJzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0gfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiQ29tcGV0aXRpb25cIiwgdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZClcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgc3VibWl0RGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLnBlbmRpbmdfZGF0YSB8fCB0aGlzLnN0YXRlLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhO1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGVDb250cm9scyhkYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLnNldFwiLCB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbl9pZDogdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZCxcbiAgICAgICAgICAgIGRhdGE6IHsgc2NyZWVuX2RhdGE6IHRoaXMuc3RhdGUucGVuZGluZ19kYXRhIH1cbiAgICAgICAgfSkub25TdWNjZXNzKCgpID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcGVuZGluZ19kYXRhOiBudWxsLFxuICAgICAgICB9KSkuc2VuZCgpO1xuICAgIH1cbiAgICByZXNldERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcGVuZGluZ19kYXRhOiBudWxsLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29tcGV0aXRpb246IHN0b3JhZ2UuZ2V0KFwiQ29tcGV0aXRpb25cIilcbiAgICAgICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZClcbiAgICAgICAgICAgICAgICAuc2VyaWFsaXplKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBnZXREZWZhdWx0Q29udHJvbHNTdGF0ZShjb250cm9sc190eXBlKSB7XG4gICAgICAgIHN3aXRjaCAoY29udHJvbHNfdHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm5vbmVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgIGNhc2UgXCJ0b3VyLWhlYXRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBoZWF0OiAxLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ0b3VyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogbnVsbCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiZGlzY2lwbGluZS1wbGFjZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlOiBudWxsLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVEYXRhKHVwZGF0ZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLnBlbmRpbmdfZGF0YSA/IGNsb25lKHRoaXMuc3RhdGUucGVuZGluZ19kYXRhKSA6IGNsb25lKHRoaXMuc3RhdGUuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEpO1xuICAgICAgICBkYXRhID0gdXBkYXRlcihkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwZW5kaW5nX2RhdGE6IGRhdGEsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzd2l0Y2hTY3JlZW4obmV3X2lkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEuc2NyZWVuX2lkICE9PSBuZXdfaWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NyZWVuX2RhdGEgPSB0aGlzLm1hbmlmZXN0LmdldFNjcmVlbkRhdGFCeUlkKG5ld19pZClcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbHNfdHlwZSA9IHNjcmVlbl9kYXRhLmNvbnRyb2xzO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbl9pZDogbmV3X2lkLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc19zdGF0ZTogdGhpcy5nZXREZWZhdWx0Q29udHJvbHNTdGF0ZShjb250cm9sc190eXBlKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkNvbnRyb2xzU3RhdGVDaGFuZ2UobmV3X3ZhbHVlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZGF0YS5jb250cm9sc19zdGF0ZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsaWRhdGVDb250cm9scyhkYXRhKSB7XG4gICAgICAgIGxldCBjb250cm9sc190eXBlID0gdGhpcy5tYW5pZmVzdC5nZXRTY3JlZW5EYXRhQnlJZChkYXRhLnNjcmVlbl9pZCkuY29udHJvbHM7XG4gICAgICAgIHN3aXRjaCAoY29udHJvbHNfdHlwZSkge1xuICAgICAgICBjYXNlIFwibm9uZVwiOlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgXCJ0b3VyXCI6XG4gICAgICAgIGNhc2UgXCJ0b3VyLWhlYXRcIjpcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGNhc2UgXCJkaXNjaXBsaW5lLXBsYWNlXCI6XG4gICAgICAgICAgICByZXR1cm4gZGF0YS5jb250cm9sc19zdGF0ZS5kaXNjaXBsaW5lX2lkICE9PSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckNvbnRvbHMoZGF0YSkge1xuICAgICAgICBsZXQgY29udHJvbHNfdHlwZSA9IHRoaXMubWFuaWZlc3QuZ2V0U2NyZWVuRGF0YUJ5SWQoZGF0YS5zY3JlZW5faWQpLmNvbnRyb2xzO1xuICAgICAgICBzd2l0Y2ggKGNvbnRyb2xzX3R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJub25lXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIGNhc2UgXCJ0b3VyLWhlYXRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPFNjcmVlbk9wZXJhdG9yVG91ckhlYXRDb250cm9sc1xuICAgICAgICAgICAgICAgICAgICBrZXk9eyBkYXRhLnNjcmVlbl9pZCB9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgdGhpcy5zdGF0ZS5jb21wZXRpdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlPXsgZGF0YS5jb250cm9sc19zdGF0ZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNvbnRyb2xzU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgICAgICBjYXNlIFwidG91clwiOlxuICAgICAgICAgICAgICAgIHJldHVybiA8U2NyZWVuT3BlcmF0b3JUb3VyQ29udHJvbHNcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgZGF0YS5zY3JlZW5faWQgfVxuICAgICAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IHRoaXMuc3RhdGUuY29tcGV0aXRpb24gfVxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc19zdGF0ZT17IGRhdGEuY29udHJvbHNfc3RhdGUgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25Db250cm9sc1N0YXRlQ2hhbmdlLmJpbmQodGhpcykgfSAvPlxuICAgICAgICAgICAgY2FzZSBcImRpc2NpcGxpbmUtcGxhY2VcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPFNjcmVlbk9wZXJhdG9yRGlzY2lwbGluZVBsYWNlQ29udHJvbHNcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgZGF0YS5zY3JlZW5faWQgfVxuICAgICAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IHRoaXMuc3RhdGUuY29tcGV0aXRpb24gfVxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc19zdGF0ZT17IGRhdGEuY29udHJvbHNfc3RhdGUgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25Db250cm9sc1N0YXRlQ2hhbmdlLmJpbmQodGhpcykgfSAvPlxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcGV0aXRpb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLnBlbmRpbmdfZGF0YSB8fCB0aGlzLnN0YXRlLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhO1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzY3JlZW4tb3BlcmF0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVmdC1jb2xcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMubWFuaWZlc3QucmF3X2RhdGEuc2NyZWVucy5tYXAoKHNjcmVlbl9kYXRhKSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiaXRlbVwiICsgKHNjcmVlbl9kYXRhLmlkID09PSBkYXRhLnNjcmVlbl9pZCA/IFwiIGFjdGl2ZVwiIDogXCJcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgc2NyZWVuX2RhdGEuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljaygoKSA9PiB0aGlzLnN3aXRjaFNjcmVlbihzY3JlZW5fZGF0YS5pZCkpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc2NyZWVuX2RhdGEubmFtZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2xzXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb250b2xzKGRhdGEpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUucGVuZGluZ19kYXRhXG4gICAgICAgICAgICAgICAgICAgID8gPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0RGF0YS5iaW5kKHRoaXMpKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmJ1dHRvbnMuZGlzY2FyZFwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgIXRoaXMudmFsaWRhdGVDb250cm9scyhkYXRhKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN1Ym1pdERhdGEuYmluZCh0aGlzKSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5idXR0b25zLnN1Ym1pdFwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiY2xhc3MgRG9jeEltcGwge1xuICAgIGNvbnN0cnVjdG9yKGZpbGVuYW1lKSB7XG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMSA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUyID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTMgPSBudWxsO1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmJvZHkgPSBcIlwiO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJwb3J0cmFpdFwiO1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHtcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LWZhbWlseVwiOiBcIkNhbGlicmksIFRhaG9tYSwgQXJpYWwsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRhYmxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xsYXBzZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstaW5zaWRlXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRkLCB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IFwiMXB0IDNwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDEsIGgyLCBoMywgaDQsIGg1LCBoNlwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgxXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDNcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNCBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiMTBwdCAwIDZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDUgcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjZwdCAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIuaGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nLWJvdHRvbVwiOiBcIjJwdFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBcIjoge1xuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsaVwiOiB7IFwibWFyZ2luLXRvcFwiOiAwLCBcInBhZGRpbmctdG9wXCI6IDAgfSxcbiAgICAgICAgICAgIFwiLnNwYWNlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudmEtdG9wXCI6IHtcbiAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwidG9wXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudGV4dC1sZWZ0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LXJpZ2h0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIiB9LFxuICAgICAgICAgICAgXCIudGV4dC1jZW50ZXJcIjogeyBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgXCIuYm9yZGVyZWQtdGFibGUgdGQsIC5ib3JkZXJlZC10YWJsZSB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXJcIjogXCIxcHQgc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRXaWR0aENzcygpO1xuICAgIH1cbiAgICBhZGRXaWR0aENzcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTAwOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU3R5bGUoXCIudy1cIiArIGksIFwid2lkdGhcIiwgaSArIFwiJVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFN0eWxlKHNlbGVjdG9yLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZXNbc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl1ba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMSh0aXRsZTEpIHtcbiAgICAgICAgdGhpcy50aXRsZTEgPSB0aXRsZTE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTIodGl0bGUyKSB7XG4gICAgICAgIHRoaXMudGl0bGUyID0gdGl0bGUyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUzKHRpdGxlMykge1xuICAgICAgICB0aGlzLnRpdGxlMyA9IHRpdGxlMztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE1hcmdpbnMobWFyZ2lucykge1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Qm9keShib2R5KSB7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIGRhdGEpIHtcbiAgICAgICAgbGV0IGNzc19wYWlycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLm1hcCgoa2V5KSA9PiBrZXkgKyAnOiAnICsgZGF0YVtrZXldICsgJzsgJylcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yICsgXCIgeyBcIiArIGNzc19wYWlycy5qb2luKFwiIFwiKSArIFwiIH1cIjtcbiAgICB9XG4gICAgcmVuZGVyU3R5bGVzKCkge1xuICAgICAgICBsZXQgY3NzX2Jsb2NrcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuc3R5bGVzKS5tYXAoKFxuICAgICAgICAgICAgKHNlbGVjdG9yKSA9PiB0aGlzLnJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSlcbiAgICAgICAgKS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIGNzc19ibG9ja3Muam9pbihcIlxcblwiKTtcbiAgICB9XG4gICAgcmVuZGVySFRNTCgpIHtcbiAgICAgICAgbGV0IGNzcyA9IHRoaXMucmVuZGVyU3R5bGVzKCk7XG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLmhlYWRlciA/ICc8cCBjbGFzcz1cImhlYWRlclwiPicgKyB0aGlzLmhlYWRlciArICc8L3A+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTEgPSB0aGlzLnRpdGxlMSA/ICc8aDE+JyArIHRoaXMudGl0bGUxICsgJzwvaDE+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTIgPSB0aGlzLnRpdGxlMiA/ICc8aDI+JyArIHRoaXMudGl0bGUyICsgJzwvaDI+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTMgPSB0aGlzLnRpdGxlMyA/ICc8aDM+JyArIHRoaXMudGl0bGUzICsgJzwvaDM+JyA6IFwiXCI7XG4gICAgICAgIGxldCBzcGFjZXIgPSAoaGVhZGVyIHx8IHRpdGxlMSB8fCB0aXRsZTIgfHwgdGl0bGUzKSA/ICc8cCBjbGFzcz1cInNwYWNlclwiPiZuYnNwOzwvcD4nIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIFwiPCFET0NUWVBFIGh0bWw+XFxuXCIgK1xuICAgICAgICAgICAgXCI8aHRtbD48aGVhZD5cIiArXG4gICAgICAgICAgICAgICAgXCI8bWV0YSBjaGFyc2V0PVxcXCJ1dGYtOFxcXCI+XCIgK1xuICAgICAgICAgICAgICAgIFwiPHN0eWxlPlxcblwiICsgY3NzICsgXCJcXG48L3N0eWxlPlxcblwiICtcbiAgICAgICAgICAgIFwiPC9oZWFkPjxib2R5PlxcblwiICtcbiAgICAgICAgICAgICAgICBoZWFkZXIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMSArXG4gICAgICAgICAgICAgICAgdGl0bGUyICtcbiAgICAgICAgICAgICAgICB0aXRsZTMgK1xuICAgICAgICAgICAgICAgIHNwYWNlciArXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5ICtcbiAgICAgICAgICAgIFwiPC9ib2R5PjwvaHRtbD5cIjtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVySFRNTCgpO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IHRoaXMubWFyZ2lucyB8fCAodGhpcy5vcmllbnRhdGlvbiA9PT0gXCJwb3J0cmFpdFwiID8gWzEwLCAxNSwgMTAsIDE1XSA6IFs3LCAxMCwgNywgMTBdKTtcbiAgICAgICAgbGV0IGNvbnZlcnRlZCA9IGh0bWxEb2N4LmFzQmxvYihodG1sLCB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbjogdGhpcy5vcmllbnRhdGlvbixcbiAgICAgICAgICAgIG1hcmdpbnM6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICAgIE1hdGguZmxvb3IobWFyZ2luc1swXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICByaWdodDogIE1hdGguZmxvb3IobWFyZ2luc1sxXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBib3R0b206IE1hdGguZmxvb3IobWFyZ2luc1syXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAgIE1hdGguZmxvb3IobWFyZ2luc1szXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNhdmVBcyhjb252ZXJ0ZWQsIHRoaXMuZmlsZW5hbWUpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgdmFyIERvY3ggPSAoZm4pID0+IG5ldyBEb2N4SW1wbChmbik7XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbmNsYXNzIENtcENoYWluSW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gMDtcbiAgICB9XG4gICAgY21wKGEsIGIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIENtcENoYWluID0gKCkgPT4gbmV3IENtcENoYWluSW1wbCgpO1xuIiwiaW1wb3J0IHsgdHJhbnNsYXRlLCBnZXRQb3NzaWJsZVRvdXJOYW1lcyB9IGZyb20gXCIuL3J1XCI7XG5cbmV4cG9ydCB2YXIgXyA9IHRyYW5zbGF0ZTtcbmV4cG9ydCB2YXIgdG91cl9uYW1lcyA9IGdldFBvc3NpYmxlVG91ck5hbWVzKCk7XG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xyXG4gICAgICAgIGxldCB4ID0gbiAlIDEwMDtcclxuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogKHZlcnNpb24sIGRhdGUpID0+IDxkaXYgY2xhc3NOYW1lPVwiYWJvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48Yj5Sb2NrSnVkZ2Uge3ZlcnNpb259PC9iPiAo0L7RgiB7ZGF0ZX0pICZtZGFzaDsg0YHQuNGB0YLQtdC80LAg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0L/QviDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQvtC80YMg0YDQvtC6LdC9LdGA0L7Qu9C70YMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCQ0LLRgtC+0YDRgdC60LjQtSDQv9GA0LDQstCwINC90LAg0YHQuNGB0YLQtdC80YMgUm9ja0p1ZGdlINC/0L7Qu9C90L7RgdGC0YzRjiDQv9GA0LjQvdCw0LTQu9C10LbQsNGCINGA0LDQt9GA0LDQsdC+0YLRh9C40LrRgyDQkNGA0YLQtdC80YMg0JrQsNC30LDQutC+0LLRgy4g0KHQvtCw0LLRgtC+0YAg0YHQuNGB0YLQtdC80Ysg0JDQvdGC0L7QvSDQkNC80LXQu9C40L0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCh0LjRgdGC0LXQvNCwINGA0LDRgdC/0YDQvtGB0YLRgNCw0L3Rj9C10YLRgdGPINC/0L4g0LvQuNGG0LXQvdC30LjQuCBMaW51bSBkLm8ubyAoaW5mb0BsaW51bS5ocikuINCU0LvRjyDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LAgUm9ja0p1ZGdlINC90LXQvtCx0YXQvtC00LjQvNC+INC4INC00L7RgdGC0LDRgtC+0YfQvdC+INC40LzQtdGC0Ywg0L/RgNCw0LLQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyBMaW51bSBMUFMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCe0YTQuNGG0LjQsNC70YzQvdGL0Lkg0YHQsNC50YI6IDxhIGhyZWY9XCJodHRwczovL3JvY2tqdWRnZS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+aHR0cHM6Ly9yb2NranVkZ2UuY29tLzwvYT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wcm9ncmFtc19hZnRlcl9jcmVhdGlvblwiOiBcItCf0YDQvtCz0YDQsNC80LzRiyDQvNC+0LbQvdC+INCx0YPQtNC10YIg0LTQvtCx0LDQstC40YLRjCDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRgdC+0YXRgNCw0L3QtdC90LjRjyDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC60L7RgNGA0LXQutGC0L3QviDQvdCw0YHRgtGA0L7QtdC90LAg0Lgg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LAuXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9ub3RfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0L3QtdC00L7RgdGC0YPQv9C90LAg0L3QsCDRjdGC0L7QvCDQutC+0LzQv9GM0YLQtdGA0LUuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbmFsaXplZFwiOiBcItCe0YLRgdGD0YLRgdGC0LLRg9GO0YIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV93YXJuaW5nXCI6IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz7QpNC40L3QsNC70LjQt9Cw0YbQuNGPINC00L7Qu9C20L3QsCDQvtGC0LzQtdC90Y/RgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0LjRgdC60LvRjtGH0LjRgtC10LvRjNC90YvRhSDRgdC70YPRh9Cw0Y/RhSE8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JXRgdC70Lgg0LbQtSDRjdGC0L4g0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0L3QtdC+0LHRhdC+0LTQuNC80L4sINC+0LHRgNCw0YLQuNGC0LUg0LLQvdC40LzQsNC90LjQtSwg0YfRgtC+INC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YHQv9C40YHQvtC6INGD0YfQsNGB0YLQvdC40LrQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAg0YHQu9C10LTRg9GO0YnQtdCz0L4g0YLRg9GA0LAg0LHRg9C00LXRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQv9C10YDQtdGB0L7Qt9C00LDQvS4g0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YPRh9Cw0YHRgtC90LjQutC+0LIsINC/0YDQvtGI0LXQtNGI0LjRhSDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC/0L7RgdC70LUg0L/QtdGA0LLQvtC5XHJcbiAgICAgICAgICAgICAgICAgICAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDQuCDQvdC1INC/0YDQvtGI0LXQtNGI0LjRhSDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDQsdGD0LTRg9GCINCx0LXQt9Cy0L7Qt9Cy0YDQsNGC0L3QviDRg9GC0LXRgNGP0L3RiyE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0Jgg0L3QtSDQt9Cw0LHRg9C00YzRgtC1INC30LDQvdC+0LLQviDQvdCw0L/QtdGH0LDRgtCw0YLRjCDQstGB0LUg0YLQsdC70LjRhtGLLjwvcD48L2Rpdj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGB0LsuwqDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVcIjogXCLQntGH0LXRgNC10LTRjCDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jbHViXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0LrQu9GD0LE/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jb21wZXRpdGlvblwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQviDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LU/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9kaXNjaXBsaW5lXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC00LjRgdGG0LjQv9C70LjQvdGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfanVkZ2VcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGB0YPQtNGM0Y4/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQv9GA0L7Qs9GA0LDQvNC80YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDRgdGC0YDQsNC90LjRhtGDINC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjiDRgtGD0YDQsD8g0JLQstC10LTQuNGC0LUgwqt1bmZpbmFsaXplwrssINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogXCLQniDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xpZW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90L3Ri9C80Lgg0YPRgdGC0YDQvtC50YHRgtCy0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9tYW5hZ2VtZW50XCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCg0LDRgdC/0YDQtdC00LXQu9C10L3QuNC1INGB0YPQtNC10Lkg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LTQuNGB0YbQuNC/0LvQuNC90LDQvDpcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0X2NvbXBldGl0aW9uXCI6IFwi0K3QutGB0L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwINC4INGA0LXQt9GD0LvRjNGC0LDRgtC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2NvbXBldGl0aW9uXCI6IFwi0JjQvNC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00LXQudGB0LrQsNGPINCx0YDQuNCz0LDQtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvYmF0aWNzXCI6IFwi0JfQsNCz0YDRg9C30LrQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGD0YfQsNGB0YLQvdC40LrQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic2VydmljZV9tZW51XCI6IFwi0KHQtdGA0LLQuNGB0L3QvtC1INC80LXQvdGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl9saXN0XCI6IFwi0KHQv9C40YHQvtC6INGB0L/QvtGA0YLRgdC80LXQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyX2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCe0YLQvNC10L3QsCDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInVucGlja2VkX3RvdXJzXCI6IFwi0J3QtSDQstC60LvRjtGH0LXQvdGLINCyINC/0YDQvtCz0YDQsNC80LzRg1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9kYXRlXCI6IFwi0JTQsNGC0LAg0L/RgNC+0LLQtdC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNcIjogXCLQlNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJncm91cF9ieV9jbHVic1wiOiBcItCT0YDRg9C/0L/QuNGA0L7QstCw0YLRjCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Fjcm9iYXRpY3NcIjogXCLQktC60LvRjtGH0LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfY2x1YnNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDQutC70YPQsdCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9kaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9leHRlbmRlZF9pbmZvXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHRiNC40YDQtdC90L3Rg9GOINC40L3RhNC+0YDQvNCw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZm9ybWF0aW9uX3Nwb3J0c21lblwiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YHQvtGB0YLQsNCyINGE0L7RgNC80LXQudGI0L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0YHRg9C00YzRj9GFXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmlsZXNfc2VsZWN0ZWRcIjogXCLQktGL0LHQtdGA0LjRgtC1INGE0LDQudC7Li4uXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c1wiOiBcItCj0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXN0ZV9hY3JvXCI6IFwi0JLRgdGC0LDQstGM0YLQtSDQtNCw0L3QvdGL0LUg0LjQtyDQutCw0LvRjNC60YPQu9GP0YLQvtGA0LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgtGD0YDQvdC40YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3Nwb3J0c21lbl9vbmx5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INGB0L/QvtGA0YLRgdC80LXQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zdW1tYXJ5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INC60L7Qu9C40YfQtdGB0YLQstC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLCAgLy8gc3Vic3RpdHV0ZVxyXG4gICAgICAgICAgICAgICAgXCJ0b3Vyc1wiOiBcItCi0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3Nwb3J0c21lblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L/QvtGA0YLRgdC80LXQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuX3BhcnRpY2lwYW50c1wiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5cIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/0LDRgdC9JHsgY2hvb3NlRW5kaW5nKHMsIFwi0L7QuVwiLCBcItGL0YVcIiwgXCLRi9GFXCIpIH0pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lbl9zaG9ydFwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L8uKWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogbiA9PiBcItCY0YLQvtCz0L4gXCIgKyBuICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvdXItYWRtaW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcclxuICAgICAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhcGlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcclxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF0sXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfZGlzY2lwbGluZV9mb3VuZFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRiywg0L7RgtGB0YPRgtGB0YLQstGD0Y7RidC40LUg0LIg0YHQuNGB0YLQtdC80LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDRgyDQutC+0YDQvtCz0L4g0LXRgdGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3Njb3Jlc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4g0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0LIg0YHRg9C00LXQudGB0YLQstC1INGF0L7RgtGPINCx0Ysg0L7QtNC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlcGVhdGluZ19qdWRnZVwiOiAobmFtZSkgPT4gbmFtZSArIFwiINCy0YHRgtGA0LXRh9Cw0LXRgtGB0Y8g0LIg0YHQv9C40YHQutC1INGB0YPQtNC10Lkg0LHQvtC70LXQtSDQvtC00L3QvtCz0L4g0YDQsNC30LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnRlcm5hbF9zZXJ2ZXJfZXJyb3JcIjogW1wi0J7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LVcIiwgXCLQv9GA0L7QstC10YDRjNGC0LUg0LvQvtCz0Lgg0LTQu9GPINC40L3RhNC+0YDQvNCw0YbQuNC4XCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZGlzY2lwbGluZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDQstGF0L7QtNGP0YnQtdCz0L4g0LIg0YHRg9C00LXQudGB0LrRg9GOINCx0YDQuNCz0LDQtNGDINGF0L7RgtGPINCx0Ysg0L7QtNC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwLCDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDRhdC+0YLRjyDQsdGLINCyINC+0LTQvdC+0Lwg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJ1blwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNldF9wZXJmb3JtZWRfZmxhZ19vbl9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0YLQsNGC0YPRgSDQt9Cw0YXQvtC00LAg0YTQuNC90LDQu9C40LfQuNC90L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNjb3JlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2NvcmVfbm90X2V4aXN0XCI6IFwi0J/QvtC/0YvRgtC60LAg0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1INC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10Lkg0L7RhtC10L3QutC4INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX29uX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDQvtGG0LXQvdC60YMg0LIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2JlZm9yZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQtNC+0LHQsNCy0LjRgtGMINC90L7QstGL0Lkg0YLRg9GAINC/0LXRgNC10LQg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGC0YPRgCwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGJ0LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfZmluYWlsemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9hZGRfYWZ0ZXJfaWRcIjogXCLQn9C+0L/Ri9GC0LrQsCDQtNC+0LHQsNC40YLRjCDRgtGD0YAg0LIg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQtSDQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfdG9fbm9uX2VtcHR5XCI6IChkKSA9PiBbXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YLRg9GA0Ysg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLXCIsIGDQlNC40YHRhtC40L/Qu9C40L3QsCAke2R9INGD0LbQtSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLYF0sXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaXNfZmluYWlsemVkXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQvdC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19uZXh0X3RvdXJcIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC/0L7RgdC70LXQtNC90LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQvdC1INGB0L7QtNC10YDQttC40YLRgdGPINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9ub3RfZmluYWlsemVkXCI6IFwi0J/RgNC10LTRi9C00YPRidC40Lkg0YLRg9GAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9maW5hbGl6ZWRcIjogXCLQlNC70Y8g0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsCDQvdC1INC00L7Qv9GD0YHQutCw0LXRgtGB0Y8g0LjQt9C80LXQvdC10L3QuNC1INC60LLQvtGC0Ysg0LLRi9Cy0L7QtNCwLCDRgtC40L/QsCDRgtGD0YDQsCDQuNC70Lgg0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZFwiOiBcItCU0L7QsdCw0LLQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvc2VcIjogXCLQl9Cw0LrRgNGL0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNlbGVjdF9hbGxcIjogXCLQodC90Y/RgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlZGl0XCI6IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwi0KPQtNCw0LvQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZFwiOiBcItCe0YLQvNC10L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZFwiOiBcItCX0LDQs9GA0YPQt9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzYXZlXCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9hbGxcIjogXCLQktGL0LHRgNCw0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYnJvd3NlXCI6IFwi0J7QsdC30L7RgC4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW5nXCI6IFwi0J/QvtC00LrQu9GO0YfQtdC90LjQtSDQuiDRgdC10YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX3Byb2JsZW1cIjogXCLQn9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9lcnJvclwiOiBcItCf0L7RhdC+0LbQtSwg0LjQvNC10Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImVycm9yX2hlYWRlclwiOiBcItCe0YjQuNCx0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWNjZXNzXCI6IFwi0J7Qv9C10YDQsNGG0LjRjyDRg9GB0L/QtdGI0L3QviDQt9Cw0LLQtdGA0YjQtdC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9uXCI6IChuKSA9PiBcItCX0LDRhdC+0LQg4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IFwi0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIChuX3NwID4gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQn9Cw0YDQsCDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2luZ1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQn9C10YDQtdGB0L7Qt9C00LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQn9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfdG91clwiOiBcItCd0LDRh9Cw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0J7RgdGC0LDQvdC+0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQv9GA0L7Qs9GA0LDQvNC80YMg0LTQu9GPINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsdCw0LfQvtCy0YvRhSDQvtGG0LXQvdC+0Log0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9faWR4XCI6IFwi4oSWINGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXdfc2NvcmVcIjogXCLQmtC+0YDRgC5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICBcIm9sZF9zY29yZVwiOiBcItCR0LDQt9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCSXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW9kZWxzXCI6IHtcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQu9GD0LHQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3RpdmVcIjogXCLQkNC60YLQuNCy0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwi0JTQsNGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LTQu9GPINC/0YDQvtGC0L7QutC+0LvQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdGl0bGVcIjogXCLQl9Cw0LPQvtC70L7QstC+0LpcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3ZhbHVlXCI6IFwi0JfQvdCw0YfQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcIlRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C7XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGFXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlc19sZWdlbmRcIjogKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LTEwMFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JPQuyDigJQg0LPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KIg4oCUINGB0YPQtNGM0Y8g0YLQsNC90YbQsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JAg4oCUINGB0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60Lg8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiZXgg4oCUINGC0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCLQmtCw0YLQtdCz0L7RgNC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX25hbWVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfZlwiOiBcItCWXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQvtC80LDQvdC00Ysg0YTQvtGA0LzQtdC50YjQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21hblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfZmluYWxpemVkXCI6IFwi0JTQsNC90L3Ri9C1INGA0LXQt9GD0LvRjNGC0LDRgtGLINC90LUg0Y/QstC70Y/RjtGC0YHRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90YvQvNC4LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwcmludFwiOiBcItCf0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGVfdmlld1wiOiBcItCj0L/RgNC+0YnQtdC90L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2Vfdmlld1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzdGFydF9wYWdlXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2NvbXBldGl0aW9uXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUg0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3JvbGVcIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0LLQvtGOINGA0L7Qu9GMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19jb21wZXRpdGlvbnNcIjogXCLQndC10YIg0LDQutGC0LjQstC90YvRhSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRfbGlua1wiOiAobGluaykgPT4gPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAg0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuCDQvdCw0YXQvtC00LjRgtGB0Y8g0L/QviDQsNC00YDQtdGB0YMmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgbGluayB9PnsgbGluayB9PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkbWluaXN0cmF0b3JcIjogXCLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5cIjogXCLQrdC60YDQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiBcItCe0L/QtdGA0LDRgtC+0YAg0Y3QutGA0LDQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGFzX3VuY29uZmlybWVkX3Njb3Jlc1wiOiBcItCY0LzQtdGO0YLRgdGPINC90LXQt9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvdGL0LUg0L7RhtC10L3QutC4INGB0YPQtNC10Lkg0LIg0L/QvtGB0LvQtdC00L3QtdC8INC30LDRhdC+0LTQtS5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2hlYXRcIjogXCLQodC70LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtdCy0YvRhdC+0LQg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X2hlYXRcIjogXCLQn9GA0LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9zdG9wd2F0Y2hcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3N0b3B3YXRjaFwiOiBcItCh0YLQsNGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF9zdG9wd2F0Y2hcIjogXCLQodGC0L7Qv1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YNcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg4oSWXCIgKyAobiArIDEpLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfcGFnZVwiOiBcItCh0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIjogXCLQktGLINC90LUg0YPRh9Cw0YHRgtCy0YPQtdGC0LUg0LIg0YHRg9C00LXQudGB0YLQstC1INC00LDQvdC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ190b3VyXCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtGCINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uc1wiOiBcItCU0LXQudGB0YLQstC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VcIjogXCLQotCw0L3QtdGGXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wb3NpdGlvblwiOiBcItCa0L7QvNC/0L7Qt9C40YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2ZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9iaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbXByZXNzaW9uXCI6IFwi0J7QsdGJ0LXQtSDQstC/0LXRh9Cw0YLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INC70LjQvdC10LnQvdGL0YUg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5X3R5cGVcIjogXCLQqNGC0YDQsNGE0L3Ri9C1INGB0LDQvdC60YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldmlvdXNfcGVuYWx0aWVzXCI6IFwi0J/RgNC10LTRi9C00YPRidC40LUg0YjRgtGA0LDRhNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5ZWxsb3dfY2FyZFwiOiBcIi0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IFwi0KHQsdGA0L7RgSDQvdCwIFwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpbWluZ1wiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJyZWFrZG93blwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwiQVwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNcIjogXCLQmlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmRcIjogXCLQn1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpXCI6IFwi0J7QklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21cIjogXCLQnNCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQu9C4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQsNC60YDQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FyZFwiOiBcItCo0YLRgNCw0YRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCj0YfQsNGB0YLQvdC40LosINGA0LXQt9GD0LvRjNGC0LDRglwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdlX3JvbGVzXCI6IHtcclxuICAgICAgICAgICAgXCJcIjogXCItXCIsXHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0YLQsNC90YbQsFwiLFxyXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgbGV0IHBhdGggPSBzcmMuc3BsaXQoXCIuXCIpO1xyXG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xyXG4gICAgcGF0aC5mb3JFYWNoKChjaHVuaykgPT4gcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdKTtcclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgXCIgKyBzcmMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGhyYXNlX3B0ciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGdldFBvc3NpYmxlVG91ck5hbWVzID0gKCkgPT4gW1xyXG4gICAgXCLQpNC40L3QsNC7XCIsXHJcbiAgICBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgIFwi0J7RgtCx0L7RgNC+0YfQvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICBcIjEvMiDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS80INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzgg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvMTYg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG5dO1xyXG4iLCJpbXBvcnQgeyBTY3JlZW5PcGVyYXRvciB9IGZyb20gXCJjbGllbnRzL3NjcmVlbl9vcGVyYXRvci9tYWluXCI7XG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxTY3JlZW5PcGVyYXRvciB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXG4gICAgd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKVxuKTtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvbl9zdGF0dXMgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc19jbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0Li4uXCIpO1xyXG4gICAgICAgIHRoaXMud3MgPSBuZXcgU29ja0pTKFwiaHR0cDovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi93c1wiKTtcclxuICAgICAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRPaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC5cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtbXCJyZWxvYWRfZGF0YVwiLCBudWxsXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsX3VwZGF0ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRGYWlsKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGFbXCJjbGllbnRfaWRcIl0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsaWVudF9pZCA9IGRhdGFbXCJjbGllbnRfaWRcIl07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1zZ190eXBlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgbGV0IG1zZ19kYXRhID0gZGF0YVsxXTtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKG1zZ190eXBlID09PSBcImZvcmNlX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge30pLmZvckVhY2goKGtleSkgPT4gbGlzdGVuZXJzW2tleV0obXNnX2RhdGEpKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBkYXRhLm1vZGVsX3VwZGF0ZXMuZm9yRWFjaCgobW9kZWxfaW5mbykgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSBzdG9yYWdlLnVwZGF0ZU1vZGVsKG1vZGVsX2luZm8ubW9kZWwsIG1vZGVsX2luZm8uaWQsIG1vZGVsX2luZm8uZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkYXRhX2NoYW5nZWQpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW1wiZGJfdXBkYXRlXCJdIHx8IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TGlzdGVuZXJJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnNfY250Kys7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcihtc2dfdHlwZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRMaXN0ZW5lcklkKCk7XHJcbiAgICAgICAgbXNnX3R5cGVzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZ190eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV1baWRdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcl9pZCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNba2V5XVtsaXN0ZW5lcl9pZF07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBuZXcgTWVzc2FnZURpc3BhdGNoZXIoKTtcclxuIiwiY2xhc3MgUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBpZCwgbW9kZWxfc3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZEJhY2tSZWYoa2V5LCByZWYpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSByZWY7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIgfHwgaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWZfa2V5ID0gZGF0YVtpZHhdLmJhY2tfcmVmO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWYuZ2V0KCkuYWRkQmFja1JlZihiYWNrX3JlZl9rZXksIGJhY2tfcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiKlwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZF9kYXRhID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXJpYWxpemUoc2NoZW1hKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9fa2V5X3R5cGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBcIipcIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0ubWFwKGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl5cIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdID0gbmV3IE1vZGVsKHRoaXMuc3RvcmFnZSwgaWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGJ5X2lkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2lkXTtcclxuICAgIH1cclxuICAgIGFsbCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubW9kZWxzKTtcclxuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzID0ge31cclxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxyXG4gICAgfVxyXG4gICAgZ2V0RG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBkZWxEb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZ2V0KG1vZGVsX25hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIGRlbChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGVNb2RlbChtb2RlbF90eXBlLCBtb2RlbF9pZCwgZGF0YSkge1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIGRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZG9tYWluc1trZXldLnVwZGF0ZU1vZGVsKC4uLmFyZ3VtZW50cykgfHwgZGF0YV9jaGFuZ2VkKTtcclxuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBcInRleHRBbGlnblwiOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzTW9jayB7XHJcbiAgICBzZXRPaygpIHt9XHJcbiAgICBzZXRGYWlsKCkge31cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBcImNvbm5lY3RlZFwiOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uX3N0YXR1c1wiKTtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XG4gICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XG4gICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxuICAgIH0sIGFjdGlvbik7XG59XG4iLCJleHBvcnQgY2xhc3MgUHJpbnRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZmV0Y2hQcmludGFibGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVhZGVyID8gPGRpdiBjbGFzc05hbWU9XCJwLWhlYWRlclwiPnsgdGhpcy5wcm9wcy5oZWFkZXIgfTwvZGl2PiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUxID8gPGgxPnsgdGhpcy5wcm9wcy50aXRsZTEgfTwvaDE+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTIgPyA8aDI+eyB0aGlzLnByb3BzLnRpdGxlMiB9PC9oMj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMyA/IDxoMz57IHRoaXMucHJvcHMudGl0bGUzIH08L2gzPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICByZWY9eyBlID0+IHRoaXMuX2JvZHkgPSBlIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYm9keSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByaW50YWJsZVwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTEoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUyKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXG4gICAgICAgIG9uQ2xpY2s6IGYsXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaEVuZE9yQ2xpY2soaGFuZGxlciwgcHJldmVudF9kZWZhdWx0KSB7XG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcbiAgICB9XG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgfVxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XG4gICAgICAgICAgICBkaXNjYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBkb25lVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5waW4gPSBudWxsO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNGcmVlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcbiAgICB9XG4gICAgZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KDEwMCAtIHRoaXMuc3RhdGUucG9zaXRpb24sIDApLCAxMDApO1xuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xuICAgIH1cbiAgICBnZXRFbGVtZW50T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXMgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGdldFRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFNsaWRlclBvcyhldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIDIwMCk7XG4gICAgfVxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICB9XG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlciBub3NlbGVjdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5uZXJcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIil9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IHRoaXMuc3RhdGUucG9zaXRpb24gKyBcInB4XCIgfX1cbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKSB9XG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKGklxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVxuICAgICAgICAgICAgICAgID8gPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiKDEwMCwxMDAsMTAwKVwiIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiZG9uZS10ZXh0XCIgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgOiA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2JhKDEwMCwxMDAsMTAwLFwiICsgdGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCkgKyBcIilcIiB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInNsaWRlLXRleHRcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRhYmxldFNlbGVjdG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBjaG9pY2VzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3dfc2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dfc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcbiAgICB9XG4gICAgb25DbGljayhuKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShuKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMucHJvcHMuY2hvaWNlcy5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0gZWxbMF07XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGVsWzFdO1xuICAgICAgICAgICAgbGV0IGFjdGl2ZV9jbGFzc19uYW1lID0gKHRoaXMucHJvcHMuYWN0aXZlID09PSBrZXkpID8gXCIgYWN0aXZlXCIgOiBcIlwiO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBrZXkgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrLmJpbmQodGhpcywga2V5KSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBzY29yZS1idG5cIiArIGFjdGl2ZV9jbGFzc19uYW1lIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiYgKGlkeCArIDEpICUgdGhpcy5wcm9wcy5yb3dfc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxiciBrZXk9eyBcImJyXCIgKyBpZHggfSAvPilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBsYXlvdXRfY2xhc3MgPSAodGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIikgPyBcInNlbGVjdG9yLWxheW91dFwiIDogXCJzZWxlY3Rvci1sYXlvdXQtMnJvd3NcIjtcbiAgICAgICAgbGV0IHNlbGVjdGVkX2NsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmUgPT09IG51bGwgPyBcIlwiIDogXCIgc2VsZWN0ZWRcIlxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wic2NvcmluZy1sYXlvdXQgXCIgKyBsYXlvdXRfY2xhc3MgKyBzZWxlY3RlZF9jbGFzcyArIFwiIG4tXCIgKyB0aGlzLmdldEJ1dHRvbnNDb3VudCgpLnRvU3RyaW5nKCkgfT57IHJlc3VsdCB9PC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlclNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gbWluOyBpZHggPD0gbWF4OyArK2lkeCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCwgaWR4LnRvU3RyaW5nKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSBNYXRoLnJvdW5kKDIgKiBtaW4pOyBpZHggPD0gTWF0aC5yb3VuZCgyICogbWF4KTsgKytpZHgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHggLyAyLCAoaWR4ICUgMikgPyAoaWR4IC8gMikudG9GaXhlZCgxKSA6IE1hdGguZmxvb3IoaWR4IC8gMikudG9TdHJpbmcoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1pbnRlZ2VyLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTAuNX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAwLjUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uUGx1cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDAuNX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAwLjUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbnZhciBzdG9wd2F0Y2hlcyA9IHt9O1xuXG5leHBvcnQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSB8fCB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpcmVjdC1tdXRhdGlvbi1zdGF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSA9IHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIG5vdygpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPyB0aGlzLnN0b3AoKSA6IHRoaXMuc3RhcnQoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuICAgIHRpY2soKSB7XG4gICAgICAgIHZhciBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYWQobnVtLCBzaXplKSB7XG4gICAgICAgIHZhciBzID0gXCIwMDAwXCIgKyBudW0udG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gc2l6ZSk7XG4gICAgfVxuICAgIGdldFN0clZhbHVlKCkge1xuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICB2YXIgbSA9IDAsIHMgPSAwO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XG4gICAgICAgIHJldHVybiBtLnRvU3RyaW5nKCkgKyAnOicgKyB0aGlzLnBhZChzLCAyKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBidG4tdG9nZ2xlIGlnbm9yZS1yZWFkb25seVwiICsgKHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmUgPyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF9zdG9wd2F0Y2hcIikgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=
