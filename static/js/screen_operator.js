(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DisciplineResults = exports.DisciplineResultsButtons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsButtons).apply(this, arguments));
    }

    _createClass(DisciplineResultsButtons, [{
        key: "signal",
        value: function signal(message) {
            var _this2 = this;

            return function () {
                return _this2.props.onSignal(message);
            }.bind(this);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    { className: "btn btn-primary", onClick: this.signal("docx") },
                    "DOCX"
                )
            );
        }
    }]);

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

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResults).call(this, props));

        _this3.state = {
            loaded: false
        };
        _this3.runs_loaded = false;
        return _this3;
    }

    _createClass(DisciplineResults, [{
        key: "componentWillMount",
        value: function componentWillMount() {
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
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.results_change_listener);
            _storage.storage.delDomain("discipline_results_" + this.props.discipline_id);
        }
    }, {
        key: "reloadState",
        value: function reloadState() {
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
        }
    }, {
        key: "loadResults",
        value: function loadResults() {
            var _this5 = this;

            (0, _api.Api)("discipline.get_results", {
                discipline_id: this.props.discipline_id
            }).onSuccess(function (response) {
                _this5.setState({
                    discipline_results: response
                });
                _this5.reloadState();
            }).send();
        }
    }, {
        key: "loadData",
        value: function loadData() {
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
        }

        // Listeners

    }, {
        key: "onSignal",
        value: function onSignal(message) {
            switch (message) {
                case "docx":
                    this.createDocx();
                    break;
                default:
                    console.log("Unknown message:", message);
            }
        }

        // Rendering

    }, {
        key: "renderBody",
        value: function renderBody() {
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
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "discipline-results.docx" : arguments[0];

            (0, _docx.Docx)(filename).setHeader(this.state.discipline.competition.name + ", " + this.state.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.discipline_results")).setTitle3(this.state.discipline.name).setBody(this.refs.printable.fetchPrintableData()).addStyle(".tour-name", "background", "#ddd").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%").save();
        }
    }]);

    return DisciplineResults;
}(React.Component);

},{"./rosfarr/discipline_results":2,"common/docx":5,"l10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12,"ui/components":13,"ui/printable":15}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DisciplineResultsScreenOperatorTable = exports.DisciplineResultsPresenterTable = exports.DisciplineResultsTable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsTable).apply(this, arguments));
    }

    _createClass(DisciplineResultsTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
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
        }
    }, {
        key: "renderRow",
        value: function renderRow(row) {
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
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = 0; i < table.length; ++i) {
                var header = this.renderRowHeader(table[i - 1], table[i]);
                header && result.push(header);
                result.push(this.renderRow(table[i]));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }]);

    return DisciplineResultsTable;
}(React.Component);

var DisciplineResultsPresenterTableRow = function (_React$Component2) {
    _inherits(DisciplineResultsPresenterTableRow, _React$Component2);

    function DisciplineResultsPresenterTableRow(props) {
        _classCallCheck(this, DisciplineResultsPresenterTableRow);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsPresenterTableRow).call(this, props));

        _this2.state = {
            active: false
        };
        return _this2;
    }

    _createClass(DisciplineResultsPresenterTableRow, [{
        key: "toggleActive",
        value: function toggleActive() {
            this.setState({
                active: !this.state.active
            });
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }]);

    return DisciplineResultsPresenterTableRow;
}(React.Component);

var DisciplineResultsPresenterTable = exports.DisciplineResultsPresenterTable = function (_React$Component3) {
    _inherits(DisciplineResultsPresenterTable, _React$Component3);

    function DisciplineResultsPresenterTable() {
        _classCallCheck(this, DisciplineResultsPresenterTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsPresenterTable).apply(this, arguments));
    }

    _createClass(DisciplineResultsPresenterTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
            var need_render = typeof prev_row === "undefined" || prev_row.run.tour.id !== next_row.run.tour.id;
            if (!need_render) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "tour-name", key: "H" + next_row.run.id },
                next_row.run.tour.name
            );
        }
    }, {
        key: "renderRow",
        value: function renderRow(row) {
            return React.createElement(DisciplineResultsPresenterTableRow, { key: "R" + row.run.id,
                participant: row.run.participant,
                place: row.place });
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = table.length - 1; i >= 0; --i) {
                var header = this.renderRowHeader(table[i + 1], table[i]);
                header && result.push(header);
                result.push(this.renderRow(table[i]));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderRows()
            );
        }
    }]);

    return DisciplineResultsPresenterTable;
}(React.Component);

var DisciplineResultsScreenOperatorTableRow = function (_React$Component4) {
    _inherits(DisciplineResultsScreenOperatorTableRow, _React$Component4);

    function DisciplineResultsScreenOperatorTableRow() {
        _classCallCheck(this, DisciplineResultsScreenOperatorTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsScreenOperatorTableRow).apply(this, arguments));
    }

    _createClass(DisciplineResultsScreenOperatorTableRow, [{
        key: "render",
        value: function render() {
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
        }
    }]);

    return DisciplineResultsScreenOperatorTableRow;
}(React.Component);

var DisciplineResultsScreenOperatorTable = exports.DisciplineResultsScreenOperatorTable = function (_React$Component5) {
    _inherits(DisciplineResultsScreenOperatorTable, _React$Component5);

    function DisciplineResultsScreenOperatorTable() {
        _classCallCheck(this, DisciplineResultsScreenOperatorTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsScreenOperatorTable).apply(this, arguments));
    }

    _createClass(DisciplineResultsScreenOperatorTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
            var need_render = typeof prev_row === "undefined" || prev_row.run.tour.id !== next_row.run.tour.id;
            if (!need_render) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "tour-name", key: "H" + next_row.run.id },
                next_row.run.tour.name
            );
        }
    }, {
        key: "renderRow",
        value: function renderRow(row, place) {
            var _this6 = this;

            return React.createElement(DisciplineResultsScreenOperatorTableRow, {
                key: "R" + row.run.id,
                participant: row.run.participant,
                place: row.place,
                onClick: function onClick() {
                    return _this6.props.onPlaceSelect(place);
                },
                selected: this.props.selectedPlace !== null && place >= this.props.selectedPlace });
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = table.length - 1; i >= 0; --i) {
                var header = this.renderRowHeader(table[i + 1], table[i]);
                header && result.push(header);
                result.push(this.renderRow(table[i], i + 1));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderRows()
            );
        }
    }]);

    return DisciplineResultsScreenOperatorTable;
}(React.Component);

},{"l10n/loader":7,"ui/tablet_components":16}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Screen = exports.ScreenManifest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

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

    _createClass(ScreenManifest, [{
        key: "getScreenDataById",
        value: function getScreenDataById(id) {
            var is_default = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var result = this.raw_data.screens[this.idx_by_id[id]];
            if (!result) {
                if (is_default) {
                    return this.raw_data.screens[0];
                }
                return this.getDefaultScreenData();
            }
            return result;
        }
    }, {
        key: "getDefaultScreenData",
        value: function getDefaultScreenData() {
            return this.getScreenDataById(this.raw_data["default"], true);
        }
    }]);

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

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Screen).call(this, props));

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

    _createClass(Screen, [{
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("competition.get", { competition_id: this.props.competition_id, children: {} }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var new_data = _storage.storage.get("Competition").by_id(this.props.competition_id).serialize({}).screen_data;
            if (new_data.screen_id !== this.state.current_screen.id && new_data.screen_id) {
                this.changeScreen(new_data.screen_id);
            }
        }
    }, {
        key: "getUrlByScreenData",
        value: function getUrlByScreenData(data) {
            return "/media/screen/" + data.template + "#" + this.props.competition_id;
        }
    }, {
        key: "changeScreen",
        value: function changeScreen(new_id) {
            this.setState({
                next_screen: this.manifest.getScreenDataById(new_id)
            });
        }
    }, {
        key: "switchFrames",
        value: function switchFrames() {
            this.setState({
                current_screen: this.state.next_screen,
                next_screen: null
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "outer" },
                React.createElement("iframe", { src: this.getUrlByScreenData(this.state.current_screen),
                    key: this.getUrlByScreenData(this.state.current_screen) }),
                this.state.next_screen ? React.createElement("iframe", { src: this.getUrlByScreenData(this.state.next_screen),
                    key: this.getUrlByScreenData(this.state.next_screen),
                    onLoad: this.switchFrames.bind(this) }) : null
            );
        }
    }]);

    return Screen;
}(React.Component);

},{"l10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScreenOperator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _tablet_components = require("ui/tablet_components");

var _tools = require("common/tools");

var _main = require("clients/screen/main");

var _discipline_results = require("admin/judging/discipline_results");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScreenOperatorTourSelector = function (_React$Component) {
    _inherits(ScreenOperatorTourSelector, _React$Component);

    function ScreenOperatorTourSelector() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScreenOperatorTourSelector);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScreenOperatorTourSelector)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onSelectTour = function (tour_id) {
            _this.props.onChange(tour_id);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScreenOperatorTourSelector, [{
        key: "renderDiscipline",
        value: function renderDiscipline(discipline) {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "discipline", key: discipline.id },
                React.createElement(
                    "div",
                    { className: "name" },
                    discipline.name
                ),
                React.createElement(
                    "div",
                    { className: "tours" },
                    React.createElement(
                        "div",
                        { className: "inner" },
                        discipline.tours.map(function (tour) {
                            return React.createElement(ScreenOperatorTourSelectorTour, {
                                key: tour.id,
                                tour: tour,
                                selected_tour: _this2.props.value,
                                onSelect: _this2.onSelectTour });
                        })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "tour-selector" },
                this.props.competition.disciplines.map(function (discipline) {
                    return _this3.renderDiscipline(discipline);
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                competition: React.PropTypes.object.isRequired,
                value: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.number]),
                onChange: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorTourSelector;
}(React.Component);

var ScreenOperatorTourSelectorTour = function (_React$Component2) {
    _inherits(ScreenOperatorTourSelectorTour, _React$Component2);

    function ScreenOperatorTourSelectorTour() {
        var _Object$getPrototypeO2;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, ScreenOperatorTourSelectorTour);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(ScreenOperatorTourSelectorTour)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this4), _this4.onSelect = function () {
            _this4.props.onSelect(_this4.props.tour.id);
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(ScreenOperatorTourSelectorTour, [{
        key: "render",
        value: function render() {
            var class_name = "tour";
            if (this.props.tour.id === this.props.selected_tour) {
                class_name += " selected";
            }
            if (this.props.tour.active) {
                class_name += " active";
            }
            if (this.props.tour.finalized) {
                class_name += " finalized";
            }
            return React.createElement(
                "div",
                _extends({ className: class_name }, (0, _tablet_components.onTouchEndOrClick)(this.onSelect)),
                this.props.tour.name
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                tour: React.PropTypes.object.isRequired,
                selected_tour: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.number]),
                onSelect: React.PropTypes.func.isRequired
            };
        }
    }]);

    return ScreenOperatorTourSelectorTour;
}(React.Component);

var ScreenOperatorDisciplinePlaceSelector = function (_React$Component3) {
    _inherits(ScreenOperatorDisciplinePlaceSelector, _React$Component3);

    function ScreenOperatorDisciplinePlaceSelector() {
        _classCallCheck(this, ScreenOperatorDisciplinePlaceSelector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorDisciplinePlaceSelector).apply(this, arguments));
    }

    _createClass(ScreenOperatorDisciplinePlaceSelector, [{
        key: "render",
        value: function render() {
            var _this6 = this;

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
                        return _this6.props.onChange(e.target.value || null);
                    } },
                React.createElement(
                    "option",
                    { value: "" },
                    "----------"
                ),
                options
            );
        }
    }], [{
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

var ScreenOperatorHeatSelectorRow = function (_React$Component4) {
    _inherits(ScreenOperatorHeatSelectorRow, _React$Component4);

    function ScreenOperatorHeatSelectorRow() {
        _classCallCheck(this, ScreenOperatorHeatSelectorRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorHeatSelectorRow).apply(this, arguments));
    }

    _createClass(ScreenOperatorHeatSelectorRow, [{
        key: "render",
        value: function render() {
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
        }
    }], [{
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

var ScreenOperatorHeatSelector = function (_React$Component5) {
    _inherits(ScreenOperatorHeatSelector, _React$Component5);

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

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorHeatSelector).call(this, props));

        _this8.state = {
            tour: null
        };
        return _this8;
    }

    _createClass(ScreenOperatorHeatSelector, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (this.props.tour_id === null) {
                return;
            }
            this.storage = _storage.storage.getDomain("tour_" + this.props.tour_id);
            this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.loadData();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.props.tour_id === null) {
                return;
            }
            _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            _storage.storage.delDomain("tour_" + this.props.tour_id);
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                runs: {
                    participant: {}
                }
            };
            var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(SCHEMA);
            this.setState({ tour: serialized });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("tour.get", {
                tour_id: this.props.tour_id,
                children: {
                    runs: {
                        participant: {}
                    }
                }
            }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "render",
        value: function render() {
            var _Math,
                _this9 = this;

            if (this.props.tour_id === null) {
                return null;
            }
            if (this.state.tour === null) {
                return React.createElement(_components.Loader, null);
            }
            var result = [];
            var max_heat = (_Math = Math).max.apply(_Math, _toConsumableArray(this.state.tour.runs.map(function (run) {
                return run.heat;
            })));

            var _loop = function _loop(heat) {
                result.push(React.createElement(ScreenOperatorHeatSelectorRow, {
                    key: heat,
                    runs: _this9.state.tour.runs.filter(function (run) {
                        return run.heat === heat;
                    }),
                    heat: heat,
                    selected: _this9.props.value === heat,
                    onClick: function onClick() {
                        return _this9.props.onHeatSelect(heat);
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
                        return _this9.props.onHeatSelect(null);
                    })),
                    (0, _loader._)("screen_operator.buttons.reset_heat")
                ),
                result
            );
        }
    }]);

    return ScreenOperatorHeatSelector;
}(React.Component);

var ScreenOperatorPlaceSelector = function (_React$Component6) {
    _inherits(ScreenOperatorPlaceSelector, _React$Component6);

    function ScreenOperatorPlaceSelector() {
        _classCallCheck(this, ScreenOperatorPlaceSelector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorPlaceSelector).apply(this, arguments));
    }

    _createClass(ScreenOperatorPlaceSelector, [{
        key: "render",
        value: function render() {
            var _this11 = this;

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
                        return _this11.props.onChange(null);
                    })),
                    (0, _loader._)("screen_operator.buttons.reset_place")
                ),
                React.createElement(_discipline_results.DisciplineResults, {
                    discipline_id: this.props.discipline_id,
                    renderer: "screen_operator",
                    onPlaceSelect: function onPlaceSelect(place) {
                        return _this11.props.onChange(place);
                    },
                    selectedPlace: this.props.value,
                    key: this.props.discipline_id })
            );
        }
    }], [{
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

var ScreenOperatorTourHeatControls = function (_React$Component7) {
    _inherits(ScreenOperatorTourHeatControls, _React$Component7);

    function ScreenOperatorTourHeatControls() {
        _classCallCheck(this, ScreenOperatorTourHeatControls);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorTourHeatControls).apply(this, arguments));
    }

    _createClass(ScreenOperatorTourHeatControls, [{
        key: "onTourChange",
        value: function onTourChange(new_value) {
            var new_state = (0, _tools.clone)(this.props.controls_state);
            new_state.tour_id = new_value;
            new_state.heat = null;
            this.props.onChange(new_state);
        }
    }, {
        key: "onHeatChange",
        value: function onHeatChange(new_value) {
            var new_state = (0, _tools.clone)(this.props.controls_state);
            new_state.heat = new_value;
            this.props.onChange(new_state);
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }], [{
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

var ScreenOperatorTourControls = function (_React$Component8) {
    _inherits(ScreenOperatorTourControls, _React$Component8);

    function ScreenOperatorTourControls() {
        _classCallCheck(this, ScreenOperatorTourControls);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorTourControls).apply(this, arguments));
    }

    _createClass(ScreenOperatorTourControls, [{
        key: "onTourChange",
        value: function onTourChange(new_value) {
            var new_state = (0, _tools.clone)(this.props.controls_state);
            new_state.tour_id = new_value;
            this.props.onChange(new_state);
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }], [{
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

var ScreenOperatorDisciplinePlaceControls = function (_React$Component9) {
    _inherits(ScreenOperatorDisciplinePlaceControls, _React$Component9);

    function ScreenOperatorDisciplinePlaceControls() {
        _classCallCheck(this, ScreenOperatorDisciplinePlaceControls);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorDisciplinePlaceControls).apply(this, arguments));
    }

    _createClass(ScreenOperatorDisciplinePlaceControls, [{
        key: "onDisciplineChange",
        value: function onDisciplineChange(new_value) {
            var new_state = (0, _tools.clone)(this.props.controls_state);
            new_state.discipline_id = new_value;
            new_state.place = null;
            this.props.onChange(new_state);
        }
    }, {
        key: "onPlaceChange",
        value: function onPlaceChange(new_value) {
            var new_state = (0, _tools.clone)(this.props.controls_state);
            new_state.place = new_value;
            this.props.onChange(new_state);
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }], [{
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

var ScreenOperator = exports.ScreenOperator = function (_React$Component10) {
    _inherits(ScreenOperator, _React$Component10);

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

        var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperator).call(this, props));

        _this15.manifest = new _main.ScreenManifest(_this15.props.manifest);
        _this15.state = {
            competition: null,
            pending_data: null
        };
        _this15.loadData();
        _message_dispatcher.message_dispatcher.addListener("db_update", _this15.reloadFromStorage.bind(_this15));
        _message_dispatcher.message_dispatcher.addListener("reload_data", _this15.loadData.bind(_this15));
        return _this15;
    }

    _createClass(ScreenOperator, [{
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("competition.get", { competition_id: this.props.competition_id, children: {
                    disciplines: {
                        tours: {}
                    }
                } }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "submitData",
        value: function submitData() {
            var _this16 = this;

            var data = this.state.pending_data || this.state.competition.screen_data;
            if (!this.validateControls(data)) {
                return;
            }
            (0, _api.Api)("competition.set", {
                competition_id: this.props.competition_id,
                data: { screen_data: this.state.pending_data }
            }).onSuccess(function () {
                return _this16.setState({
                    pending_data: null
                });
            }).send();
        }
    }, {
        key: "resetData",
        value: function resetData() {
            this.setState({
                pending_data: null
            });
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            this.setState({
                competition: _storage.storage.get("Competition").by_id(this.props.competition_id).serialize({
                    disciplines: {
                        tours: {}
                    }
                })
            });
        }
    }, {
        key: "getDefaultControlsState",
        value: function getDefaultControlsState(controls_type) {
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
        }
    }, {
        key: "updateData",
        value: function updateData(updater) {
            var data = this.state.pending_data ? (0, _tools.clone)(this.state.pending_data) : (0, _tools.clone)(this.state.competition.screen_data);
            data = updater(data);
            this.setState({
                pending_data: data
            });
        }
    }, {
        key: "switchScreen",
        value: function switchScreen(new_id) {
            var _this17 = this;

            this.updateData(function (data) {
                if (data.screen_id !== new_id) {
                    var screen_data = _this17.manifest.getScreenDataById(new_id);
                    var controls_type = screen_data.controls;
                    data = {
                        screen_id: new_id,
                        controls_state: _this17.getDefaultControlsState(controls_type)
                    };
                }
                return data;
            });
        }
    }, {
        key: "onControlsStateChange",
        value: function onControlsStateChange(new_value) {
            this.updateData(function (data) {
                data.controls_state = new_value;
                return data;
            });
        }
    }, {
        key: "validateControls",
        value: function validateControls(data) {
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
        }
    }, {
        key: "renderContols",
        value: function renderContols(data) {
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
        }
    }, {
        key: "render",
        value: function render() {
            var _this18 = this;

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
                                return _this18.switchScreen(screen_data.id);
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
        }
    }]);

    return ScreenOperator;
}(React.Component);

},{"admin/judging/discipline_results":1,"clients/screen/main":3,"common/tools":6,"l10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12,"ui/components":13,"ui/tablet_components":16}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(DocxImpl, [{
        key: "addWidthCss",
        value: function addWidthCss() {
            for (var i = 1; i <= 100; ++i) {
                this.addStyle(".w-" + i, "width", i + "%");
            }
        }
    }, {
        key: "addStyle",
        value: function addStyle(selector, key, value) {
            if (!this.styles[selector]) {
                this.styles[selector] = {};
            }
            this.styles[selector][key] = value;
            return this;
        }
    }, {
        key: "setHeader",
        value: function setHeader(header) {
            this.header = header;
            return this;
        }
    }, {
        key: "setTitle1",
        value: function setTitle1(title1) {
            this.title1 = title1;
            return this;
        }
    }, {
        key: "setTitle2",
        value: function setTitle2(title2) {
            this.title2 = title2;
            return this;
        }
    }, {
        key: "setTitle3",
        value: function setTitle3(title3) {
            this.title3 = title3;
            return this;
        }
    }, {
        key: "setMargins",
        value: function setMargins(margins) {
            this.margins = margins;
            return this;
        }
    }, {
        key: "setBody",
        value: function setBody(body) {
            this.body = body;
            return this;
        }
    }, {
        key: "setOrientation",
        value: function setOrientation(orientation) {
            this.orientation = orientation;
            return this;
        }
    }, {
        key: "renderStyleBlock",
        value: function renderStyleBlock(selector, data) {
            var css_pairs = Object.getOwnPropertyNames(data).map(function (key) {
                return key + ': ' + data[key] + '; ';
            });
            return selector + " { " + css_pairs.join(" ") + " }";
        }
    }, {
        key: "renderStyles",
        value: function renderStyles() {
            var _this = this;

            var css_blocks = Object.getOwnPropertyNames(this.styles).map(function (selector) {
                return _this.renderStyleBlock(selector, _this.styles[selector]);
            }.bind(this));
            return css_blocks.join("\n");
        }
    }, {
        key: "renderHTML",
        value: function renderHTML() {
            var css = this.renderStyles();
            var header = this.header ? '<p class="header">' + this.header + '</p>' : "";
            var title1 = this.title1 ? '<h1>' + this.title1 + '</h1>' : "";
            var title2 = this.title2 ? '<h2>' + this.title2 + '</h2>' : "";
            var title3 = this.title3 ? '<h3>' + this.title3 + '</h3>' : "";
            var spacer = header || title1 || title2 || title3 ? '<p class="spacer">&nbsp;</p>' : "";
            return "<!DOCTYPE html>\n" + "<html><head>" + "<meta charset=\"utf-8\">" + "<style>\n" + css + "\n</style>\n" + "</head><body>\n" + header + title1 + title2 + title3 + spacer + this.body + "</body></html>";
        }
    }, {
        key: "save",
        value: function save() {
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
        }
    }]);

    return DocxImpl;
}();

var Docx = exports.Docx = function Docx(fn) {
    return new DocxImpl(fn);
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(CmpChainImpl, [{
        key: "cmp",
        value: function cmp(a, b) {
            if (this.result === 0) {
                if (a < b) {
                    this.result = -1;
                } else if (a > b) {
                    this.result = 1;
                }
            }
            return this;
        }
    }, {
        key: "end",
        value: function end() {
            return this.result;
        }
    }]);

    return CmpChainImpl;
}();

var CmpChain = exports.CmpChain = function CmpChain() {
    return new CmpChainImpl();
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
                            " (закрытая версия для ограниченного использования) — система для подсчета результатов соревнований по акробатическому рок-н-роллу."
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
                "switch_to_plan": "Сортировка по программе",
                "switch_to_disciplines": "Сортировка по дисциплинам",
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
                "clubs_shown": "Информация только по следующим клубам:",
                "clubs_summary": "Сводка по клубам",
                "competition_info": "Информация о турнире",
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
                "no_program_loaded": "Акробатика не загружена",
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
                "manage_participants": "Управление спортсменами",
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
                "invalid_scoring_system": "Выбрана недопустимая система судейства",
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
                "edit_acrobatic_override": "Изменить",
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
                "name": "Название",
                "rules_set": "Система судейства"
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
                "plan": "Программа",
                "results": "Результаты"
            },
            "labels": {
                "discipline": "Дисциплина",
                "estimated_beginning": "Начало",
                "estimated_duration": "Длит.",
                "no_active_tour": "Нет активного тура",
                "place": "место",
                "tour": "Тур"
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
                "base_name": "РосФАРР",
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Api = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _storage = require("server/storage");

var _dialogs = require("ui/dialogs");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiImpl = function () {
    function ApiImpl(method, data) {
        _classCallCheck(this, ApiImpl);

        this.method = method;
        this.data = data;
        this.cb_success = function () {};
        this.cb_error = function (msg, code, args) {
            return (0, _dialogs.showError)(code ? _loader._.apply(undefined, [code].concat(_toConsumableArray(args))) : msg);
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

    _createClass(ApiImpl, [{
        key: "onDone",
        value: function onDone(callback) {
            this.cb_done = callback;
            return this;
        }
    }, {
        key: "onSuccess",
        value: function onSuccess(callback) {
            this.cb_success = callback;
            return this;
        }
    }, {
        key: "onError",
        value: function onError(callback) {
            this.cb_error = callback;
            return this;
        }
    }, {
        key: "onFail",
        value: function onFail(callback) {
            this.cb_fail = callback;
            return this;
        }
    }, {
        key: "addToDB",
        value: function addToDB(model_type, model_id) {
            var st = arguments.length <= 2 || arguments[2] === undefined ? _storage.storage : arguments[2];

            this.update_db = function (response) {
                st.get(model_type).add(model_id, response);
            };
            return this;
        }
    }, {
        key: "send",
        value: function send() {
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
                if (response === null) {
                    _this.cb_fail();
                } else if (response.success) {
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
            if (window.client_id) {
                data.append("client_id", window.client_id);
            }
            data.append("data", JSON.stringify(this.data));
            data.append("method", this.method);
            xhr.send(data);
        }
    }]);

    return ApiImpl;
}();

var Api = exports.Api = function Api() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(ApiImpl, [null].concat(args)))();
};
exports.default = Api;

},{"l10n/loader":7,"server/storage":12,"ui/dialogs":14}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.message_dispatcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(MessageDispatcher, [{
        key: "connect",
        value: function connect() {
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
        }
    }, {
        key: "onMessage",
        value: function onMessage(message) {
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
        }
    }, {
        key: "getListenerId",
        value: function getListenerId() {
            return this.listeners_cnt++;
        }
    }, {
        key: "addListener",
        value: function addListener(msg_types, callback) {
            var id = this.getListenerId();
            msg_types.split(" ").forEach(function (msg_type) {
                if (!this.listeners[msg_type]) {
                    this.listeners[msg_type] = {};
                }
                this.listeners[msg_type][id] = callback;
            }.bind(this));
            return id;
        }
    }, {
        key: "removeListener",
        value: function removeListener(listener_id) {
            Object.keys(this.listeners).forEach(function (key) {
                delete this.listeners[key][listener_id];
            }.bind(this));
        }
    }]);

    return MessageDispatcher;
}();

if (!window.message_dispatcher) {
    window.message_dispatcher = new MessageDispatcher();
}
var message_dispatcher = exports.message_dispatcher = window.message_dispatcher;

},{"server/storage":12,"ui/components":13}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ref = function () {
    function Ref(storage, model_name, id) {
        _classCallCheck(this, Ref);

        this.model_name = model_name;
        this.id = id;
        this.storage = storage;
    }

    _createClass(Ref, [{
        key: "get",
        value: function get() {
            return this.storage.get(this.model_name).by_id(this.id);
        }
    }]);

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

    _createClass(Model, [{
        key: "addBackRef",
        value: function addBackRef(key, ref) {
            this[key] = ref;
            this.__key_types[key] = "^";
        }
    }, {
        key: "update",
        value: function update(data) {
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
        }
    }, {
        key: "serialize",
        value: function serialize(schema) {
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
        }
    }]);

    return Model;
}();

var ModelsStorage = function () {
    function ModelsStorage(storage, model_name) {
        _classCallCheck(this, ModelsStorage);

        this.model_name = model_name;
        this.models = {};
        this.storage = storage;
    }

    _createClass(ModelsStorage, [{
        key: "add",
        value: function add(id, data) {
            if (typeof this.models[id] === "undefined") {
                this.models[id] = new Model(this.storage, id, this);
            }
            this.models[id].update(data);
        }
    }, {
        key: "update",
        value: function update(id, data) {
            if (this.models[id]) {
                this.models[id].update(data, false);
                return true;
            }
            return false;
        }
    }, {
        key: "by_id",
        value: function by_id(id) {
            return this.models[id];
        }
    }, {
        key: "all",
        value: function all() {
            var keys = Object.getOwnPropertyNames(this.models);
            return keys.map(function (key) {
                return this.models[key];
            }.bind(this));
        }
    }]);

    return ModelsStorage;
}();

var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.model_storages = {};
        this.domains = {};
    }

    _createClass(Storage, [{
        key: "getDomain",
        value: function getDomain(domain) {
            if (typeof this.domains[domain] === "undefined") {
                this.domains[domain] = new Storage();
            }
            return this.domains[domain];
        }
    }, {
        key: "delDomain",
        value: function delDomain(domain) {
            delete this.domains[domain];
        }
    }, {
        key: "get",
        value: function get(model_name) {
            if (typeof this.model_storages[model_name] === "undefined") {
                this.model_storages[model_name] = new ModelsStorage(this, model_name);
            }
            return this.model_storages[model_name];
        }
    }, {
        key: "del",
        value: function del(model_name) {
            delete this.model_storages[model_name];
        }
    }, {
        key: "updateModel",
        value: function updateModel(model_type, model_id, data) {
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
        }
    }]);

    return Storage;
}();

var storage = exports.storage = new Storage();

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connection_status = exports.Loader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = exports.Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader() {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Loader).apply(this, arguments));
    }

    _createClass(Loader, [{
        key: "render",
        value: function render() {
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
        }
    }]);

    return Loader;
}(React.Component);

var ConnectionStatusMock = function () {
    function ConnectionStatusMock() {
        _classCallCheck(this, ConnectionStatusMock);
    }

    _createClass(ConnectionStatusMock, [{
        key: "setOk",
        value: function setOk() {}
    }, {
        key: "setFail",
        value: function setFail() {}
    }]);

    return ConnectionStatusMock;
}();

var ConnectionStatus = function (_React$Component2) {
    _inherits(ConnectionStatus, _React$Component2);

    function ConnectionStatus(props) {
        _classCallCheck(this, ConnectionStatus);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectionStatus).call(this, props));

        _this2.state = {
            "connected": null
        };
        return _this2;
    }

    _createClass(ConnectionStatus, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.stopInterval();
        }
    }, {
        key: "startInterval",
        value: function startInterval() {
            var _this3 = this;

            if (this.interval) {
                return;
            }
            this.interval = setInterval(function () {
                _this3.setState({
                    tick: !_this3.state.tick
                });
            }, 750);
        }
    }, {
        key: "stopInterval",
        value: function stopInterval() {
            if (!this.interval) {
                return;
            }
            clearInterval(this.interval);
            this.interval = null;
        }
    }, {
        key: "setOk",
        value: function setOk() {
            this.stopInterval();
            this.setState({ connected: true, tick: false });
        }
    }, {
        key: "setFail",
        value: function setFail() {
            this.startInterval();
            this.setState({ connected: false });
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }], [{
        key: "init",
        value: function init() {
            var element = window.document.getElementById("connection_status");
            if (element && !element.hasChildNodes()) {
                return ReactDOM.render(React.createElement(ConnectionStatus, null), element);
            }
            return new ConnectionStatusMock();
        }
    }]);

    return ConnectionStatus;
}(React.Component);

var connection_status = exports.connection_status = ConnectionStatus.init();

},{"l10n/loader":7}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.showError = showError;
exports.showConfirm = showConfirm;

var _loader = require("l10n/loader");

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

},{"l10n/loader":7}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Printable = exports.Printable = function (_React$Component) {
    _inherits(Printable, _React$Component);

    function Printable() {
        _classCallCheck(this, Printable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Printable).apply(this, arguments));
    }

    _createClass(Printable, [{
        key: "fetchPrintableData",
        value: function fetchPrintableData() {
            return this._body.innerHTML;
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            return this.props.header ? React.createElement(
                "div",
                { className: "p-header" },
                this.props.header
            ) : null;
        }
    }, {
        key: "renderTitle1",
        value: function renderTitle1() {
            return this.props.title1 ? React.createElement(
                "h1",
                null,
                this.props.title1
            ) : null;
        }
    }, {
        key: "renderTitle2",
        value: function renderTitle2() {
            return this.props.title2 ? React.createElement(
                "h2",
                null,
                this.props.title2
            ) : null;
        }
    }, {
        key: "renderTitle3",
        value: function renderTitle3() {
            return this.props.title3 ? React.createElement(
                "h3",
                null,
                this.props.title3
            ) : null;
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
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
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "printable" },
                this.renderHeader(),
                this.renderTitle1(),
                this.renderTitle2(),
                this.renderTitle3(),
                this.renderBody()
            );
        }
    }], [{
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StopWatch = exports.TabletAcroOverrideInput = exports.TabletIntegerInput = exports.TabletPoint5SelectInput = exports.TabletIntegerSelectInput = exports.TabletSelectorInput = exports.Slider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onTouchOrClick = onTouchOrClick;
exports.onTouchEndOrClick = onTouchEndOrClick;

var _loader = require("l10n/loader");

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

        _this.onClick = function (event) {
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                posision: 200,
                touch: false,
                finished: true
            });
            _this.props.onActivate();
        };

        _this.onTouchStart = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.pin = _this.getRelativeTouch(event);
            _this.setState({
                position: _this.getSliderPos(event),
                touch: true
            });
        };

        _this.onTouchMove = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                position: _this.getSliderPos(event)
            });
        };

        _this.onTouchEnd = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            if (_this.state.position === 200) {
                _this.setState({
                    position: 0,
                    finished: true,
                    touch: false
                });
                _this.props.onActivate();
            } else {
                _this.setState({
                    position: 0,
                    touch: false
                });
            }
        };

        _this.state = {
            position: 0,
            touch: false,
            finished: false
        };
        _this.pin = null;
        return _this;
    }

    _createClass(Slider, [{
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps) {
            if (!this.props.done && nextProps.done) {
                this.setState({
                    finished: false
                });
            }
        }
    }, {
        key: "isFree",
        value: function isFree() {
            return !this.state.touch && !this.props.done && !this.state.finished;
        }
    }, {
        key: "getOuterTextOpacity",
        value: function getOuterTextOpacity() {
            if (this.state.finished) {
                return 0;
            }
            var value = Math.min(Math.max(100 - this.state.position, 0), 100);
            return (value / 100).toFixed(3);
        }
    }, {
        key: "getElementOffset",
        value: function getElementOffset(element) {
            var res = 0;
            while (element) {
                res += element.offsetLeft || 0;
                element = element.parentNode;
            }
            return res;
        }
    }, {
        key: "getTouch",
        value: function getTouch(event) {
            var touch = event.touches[0];
            var parent = event.target.parentNode;
            return touch.pageX - this.getElementOffset(parent);
        }
    }, {
        key: "getRelativeTouch",
        value: function getRelativeTouch(event) {
            var touch = event.touches[0];
            var parent = event.target;
            return touch.pageX - this.getElementOffset(parent);
        }
    }, {
        key: "getSliderPos",
        value: function getSliderPos(event) {
            var pos = this.getTouch(event) - this.pin;
            return Math.min(Math.max(pos, 0), 200);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "slider noselect" },
                React.createElement(
                    "div",
                    { className: "inner" + (this.isFree() ? " free" : ""),
                        style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                        onTouchStart: this.onTouchStart,
                        onTouchMove: this.onTouchMove,
                        onTouchEnd: this.onTouchEnd,
                        onClick: this.onClick
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
        }
    }]);

    return Slider;
}(React.Component);

var TabletSelectorInput = exports.TabletSelectorInput = function (_React$Component2) {
    _inherits(TabletSelectorInput, _React$Component2);

    function TabletSelectorInput() {
        _classCallCheck(this, TabletSelectorInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletSelectorInput).apply(this, arguments));
    }

    _createClass(TabletSelectorInput, [{
        key: "getButtonsCount",
        value: function getButtonsCount() {
            if (this.props.style === "grid") {
                return this.props.rowSize;
            }
            return this.props.choices.length;
        }
    }, {
        key: "onClick",
        value: function onClick(n) {
            this.props.onValueUpdate(n);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var result = [];
            this.props.choices.forEach(function (el, idx) {
                var key = el[0];
                var text = el[1];
                var active_class_name = _this3.props.value === key ? " active" : "";
                result.push(React.createElement(
                    "button",
                    _extends({
                        key: key
                    }, onTouchOrClick(_this3.onClick.bind(_this3, key)), {
                        className: "tbtn score-btn" + active_class_name
                    }),
                    text
                ));
                if (_this3.props.style === "grid" && (idx + 1) % _this3.props.rowSize === 0) {
                    result.push(React.createElement("br", { key: "br" + idx }));
                }
            });
            var layout_class = this.props.style !== "two-lines" ? "selector-layout" : "selector-layout-2rows";
            var selected_class = this.props.value === null ? "" : " selected";
            return React.createElement(
                "div",
                { className: "scoring-layout " + layout_class + selected_class + " n-" + this.getButtonsCount().toString() },
                result
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                style: React.PropTypes.string,
                choices: React.PropTypes.array.isRequired,
                rowSize: React.PropTypes.number,
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletIntegerSelectInput).apply(this, arguments));
    }

    _createClass(TabletIntegerSelectInput, [{
        key: "createArray",
        value: function createArray(min, max) {
            var result = [];
            for (var idx = min; idx <= max; ++idx) {
                result.push([idx, idx.toString()]);
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(TabletSelectorInput, _extends({
                choices: this.createArray(this.props.min, this.props.max)
            }, this.props));
        }
    }], [{
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletPoint5SelectInput).apply(this, arguments));
    }

    _createClass(TabletPoint5SelectInput, [{
        key: "createArray",
        value: function createArray(min, max) {
            var result = [];
            for (var idx = Math.round(2 * min); idx <= Math.round(2 * max); ++idx) {
                result.push([idx / 2, idx % 2 ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(TabletSelectorInput, _extends({
                choices: this.createArray(this.props.min, this.props.max)
            }, this.props));
        }
    }], [{
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletIntegerInput).apply(this, arguments));
    }

    _createClass(TabletIntegerInput, [{
        key: "onMinus",
        value: function onMinus() {
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": -1 });
            } else {
                this.props.onValueUpdate(this.props.value - 1);
            }
        }
    }, {
        key: "onPlus",
        value: function onPlus() {
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": 1 });
            } else {
                this.props.onValueUpdate(this.props.value + 1);
            }
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }], [{
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

var TabletAcroOverrideInput = exports.TabletAcroOverrideInput = function (_React$Component6) {
    _inherits(TabletAcroOverrideInput, _React$Component6);

    function TabletAcroOverrideInput() {
        var _Object$getPrototypeO;

        var _temp, _this7, _ret;

        _classCallCheck(this, TabletAcroOverrideInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this7 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TabletAcroOverrideInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this7), _this7.onMinus = function () {
            if (_this7.props.send_deltas) {
                _this7.props.onValueUpdate({ "delta": -0.5 });
            } else {
                _this7.props.onValueUpdate(Math.max(_this7.props.value - 0.5, 0));
            }
        }, _this7.onPlus = function () {
            if (_this7.props.send_deltas) {
                _this7.props.onValueUpdate({ "delta": 0.5 });
            } else {
                _this7.props.onValueUpdate(Math.min(_this7.props.value + 0.5, _this7.props.original_value));
            }
        }, _this7.onZero = function () {
            _this7.props.onValueUpdate(0);
        }, _this7.onRestore = function () {
            _this7.props.onValueUpdate(_this7.props.original_value);
        }, _temp), _possibleConstructorReturn(_this7, _ret);
    }

    _createClass(TabletAcroOverrideInput, [{
        key: "render",
        value: function render() {
            var value_changed = Math.abs(this.props.value - this.props.original_value);
            return React.createElement(
                "div",
                { className: "tablet-acro-override-input" },
                React.createElement(
                    "div",
                    { className: "buttons" },
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-zero",
                            disabled: this.props.value < 0.05
                        }, onTouchOrClick(this.onZero)),
                        "↓0"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-restore",
                            disabled: value_changed < 0.05
                        }, onTouchOrClick(this.onRestore)),
                        "↑"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-minus",
                            disabled: this.props.value < 0.05
                        }, onTouchOrClick(this.onMinus)),
                        "−"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-plus",
                            disabled: this.props.original_value < this.props.value + 0.05
                        }, onTouchOrClick(this.onPlus)),
                        "+"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    value_changed ? this.props.original_value.toFixed(1) + " → " + this.props.value.toFixed(1) : this.props.value.toFixed(1)
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                value: React.PropTypes.number.isRequired,
                original_value: React.PropTypes.number.isRequired,
                send_deltas: React.PropTypes.bool,
                onValueUpdate: React.PropTypes.func.isRequired
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                send_deltas: false
            };
        }
    }]);

    return TabletAcroOverrideInput;
}(React.Component);

var stopwatches = {};

var StopWatch = exports.StopWatch = function (_React$Component7) {
    _inherits(StopWatch, _React$Component7);

    _createClass(StopWatch, null, [{
        key: "propTypes",
        get: function get() {
            return {
                score_id: React.PropTypes.number
            };
        }
    }]);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(StopWatch).call(this, props));

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

    _createClass(StopWatch, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.state.interval);
            stopwatches[this.props.score_id] = this.state;
        }
    }, {
        key: "now",
        value: function now() {
            return new Date().getTime();
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.state.active ? this.stop() : this.start();
        }
    }, {
        key: "start",
        value: function start() {
            this.setState({
                active: true,
                start_at: this.now() - this.state.value,
                interval: setInterval(this.tick.bind(this), 10)
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.state.interval);
            this.setState({
                active: false,
                value: this.value()
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            clearInterval(this.state.interval);
            this.setState({
                active: false,
                value: 0
            });
        }
    }, {
        key: "value",
        value: function value() {
            return this.state.active ? this.now() - this.state.start_at : this.state.value;
        }
    }, {
        key: "tick",
        value: function tick() {
            var new_value = this.value();
            if (new_value !== this.state.value) {
                this.setState({
                    value: this.value()
                });
            }
        }
    }, {
        key: "pad",
        value: function pad(num, size) {
            var s = "0000" + num.toString();
            return s.substr(s.length - size);
        }
    }, {
        key: "getStrValue",
        value: function getStrValue() {
            var val = this.value();
            var m = 0,
                s = 0;
            var result = '';
            m = Math.floor(val / (60 * 1000));
            val %= 60 * 1000;
            s = Math.floor(val / 1000);
            return m.toString() + ':' + this.pad(s, 2);
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }]);

    return StopWatch;
}(React.Component);

},{"l10n/loader":7}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHJvc2ZhcnJcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcY2xpZW50c1xcc2NyZWVuXFxtYWluLmpzeCIsInNyY1xcanN4XFxjbGllbnRzXFxzY3JlZW5fb3BlcmF0b3JcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcZG9jeC5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFx0b29scy5qc3giLCJzcmNcXGpzeFxcbDEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxsMTBuXFxydS5qc3giLCJzcmNcXGpzeFxcc2NyZWVuX29wZXJhdG9yLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxccHJpbnRhYmxlLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2NhOzs7Ozs7Ozs7OzsrQkFDRixTQUFTOzs7QUFDWixtQkFBTzt1QkFBTyxPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLE9BQXBCO2FBQU4sQ0FBb0MsSUFBckMsQ0FBMEMsSUFBMUMsQ0FBUCxDQURZOzs7O2lDQUdQO0FBQ0wsbUJBQU87OztnQkFDSDs7c0JBQVEsV0FBVSxpQkFBVixFQUE0QixTQUFVLEtBQUssTUFBTCxDQUFZLE1BQVosQ0FBVixFQUFwQzs7aUJBREc7YUFBUCxDQURLOzs7O1dBSkE7RUFBaUMsTUFBTSxTQUFOOztJQWFqQzs7Ozs7NEJBRWlCO0FBQ3RCLG1CQUFPO0FBQ0gsMEJBQVUsTUFBVjthQURKLENBRHNCOzs7Ozs7O0FBUTFCLGFBVlMsaUJBVVQsQ0FBWSxLQUFaLEVBQW1COzhCQVZWLG1CQVVVOzs0RUFWViw4QkFXQyxRQURTOztBQUVmLGVBQUssS0FBTCxHQUFhO0FBQ1Qsb0JBQVEsS0FBUjtTQURKLENBRmU7QUFLZixlQUFLLFdBQUwsR0FBbUIsS0FBbkIsQ0FMZTs7S0FBbkI7O2lCQVZTOzs2Q0FpQlk7OztBQUNqQixpQkFBSyxPQUFMLEdBQWUsaUJBQVEsU0FBUixDQUFrQix3QkFBd0IsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF6RCxDQURpQjtBQUVqQixpQkFBSyxlQUFMLEdBQXVCLHVDQUFtQixXQUFuQixDQUErQixhQUEvQixFQUE4QyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQTlDLENBQXZCLENBRmlCO0FBR2pCLGlCQUFLLGtCQUFMLEdBQTBCLHVDQUFtQixXQUFuQixDQUErQixXQUEvQixFQUE0QyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBNUMsQ0FBMUIsQ0FIaUI7QUFJakIsaUJBQUssdUJBQUwsR0FBK0IsdUNBQW1CLFdBQW5CLENBQStCLGtDQUEvQixFQUFtRSxVQUFTLE9BQVQsRUFBa0I7QUFDaEgsb0JBQUksQ0FBQyxPQUFELEVBQVU7QUFDVix5QkFBSyxXQUFMLEdBRFU7QUFFViwyQkFGVTtpQkFBZDtBQUlBLG9CQUFJLGVBQWUsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixNQUFqQixFQUF5QixLQUF6QixDQUErQixRQUFRLFNBQVIsQ0FBL0IsQ0FBZixDQUw0RztBQU1oSCxvQkFBSSxDQUFDLFlBQUQsRUFBZTtBQUNmLDJCQURlO2lCQUFuQjtBQUdBLG9CQUFJLGFBQWEsVUFBYixDQUF3QixFQUF4QixLQUErQixLQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQTBCO0FBQ3pELHlCQUFLLFdBQUwsR0FEeUQ7aUJBQTdEO2FBVDhGLENBWWhHLElBWmdHLENBWTNGLElBWjJGLENBQW5FLENBQS9CLENBSmlCO0FBaUJqQixpQkFBSyxRQUFMLEdBakJpQjtBQWtCakIsaUJBQUssV0FBTCxHQWxCaUI7QUFtQmpCLGdCQUFJLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBcUI7O0FBQ3JCLHdCQUFJLGNBQWMsWUFBWSxZQUFNO0FBQ2hDLDRCQUFJLE9BQUssSUFBTCxDQUFVLFNBQVYsRUFBcUI7QUFDckIsMENBQWMsV0FBZCxFQURxQjtBQUVyQixtQ0FBSyxVQUFMLENBQWdCLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsUUFBcEIsQ0FBaEIsQ0FGcUI7QUFHckIsbUNBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsUUFBcEIsQ0FBNkIsT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixRQUFwQixDQUE3QixDQUhxQjt5QkFBekI7cUJBRDBCLEVBTTNCLEdBTmUsQ0FBZDtxQkFEaUI7YUFBekI7Ozs7K0NBVW1CO0FBQ25CLG1EQUFtQixjQUFuQixDQUFrQyxLQUFLLGVBQUwsQ0FBbEMsQ0FEbUI7QUFFbkIsbURBQW1CLGNBQW5CLENBQWtDLEtBQUssa0JBQUwsQ0FBbEMsQ0FGbUI7QUFHbkIsbURBQW1CLGNBQW5CLENBQWtDLEtBQUssdUJBQUwsQ0FBbEMsQ0FIbUI7QUFJbkIsNkJBQVEsU0FBUixDQUFrQix3QkFBd0IsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUExQyxDQUptQjs7OztzQ0FNVDtBQUNWLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsa0JBQVgsRUFBK0I7QUFDaEMsdUJBRGdDO2FBQXBDO0FBR0EsZ0JBQUksQ0FBQyxLQUFLLFdBQUwsRUFBa0I7QUFDbkIsdUJBRG1CO2FBQXZCO0FBR0EsZ0JBQUksZUFBZSxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLEtBQWpCLENBQWYsQ0FQTTtBQVFWLGdCQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FSSjtBQVNWLGdCQUFJLFlBQVksRUFBWixDQVRNO0FBVVYsZ0JBQUksU0FBUztBQUNULHNCQUFNLEVBQU47QUFDQSw2QkFBYTtBQUNULCtCQUFXLEVBQVg7QUFDQSwwQkFBTSxFQUFOO2lCQUZKO2FBRkEsQ0FWTTtBQWlCVixpQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksUUFBUSxNQUFSLEVBQWdCLEVBQUUsQ0FBRixFQUFLO0FBQ3JDLDBCQUFVLElBQVYsQ0FBZTtBQUNYLDJCQUFPLFFBQVEsQ0FBUixFQUFXLEtBQVg7QUFDUCx5QkFBSyxhQUFhLEtBQWIsQ0FBbUIsUUFBUSxDQUFSLEVBQVcsTUFBWCxDQUFuQixDQUFzQyxTQUF0QyxDQUFnRCxNQUFoRCxDQUFMO2lCQUZKLEVBRHFDO2FBQXpDO0FBTUEsaUJBQUssUUFBTCxDQUFjO0FBQ1Ysd0JBQVEsSUFBUjtBQUNBLHVCQUFPLFNBQVA7QUFDQSw0QkFBWSxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLFlBQWpCLEVBQStCLEtBQS9CLENBQXFDLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBckMsQ0FBK0QsU0FBL0QsQ0FBeUU7QUFDakYsaUNBQWEsRUFBYjtpQkFEUSxDQUFaO2FBSEosRUF2QlU7Ozs7c0NBK0JBOzs7QUFDViwwQkFBSSx3QkFBSixFQUE4QjtBQUMxQiwrQkFBZSxLQUFLLEtBQUwsQ0FBVyxhQUFYO2FBRG5CLEVBR0MsU0FIRCxDQUdXLG9CQUFZO0FBQ25CLHVCQUFLLFFBQUwsQ0FBYztBQUNWLHdDQUFvQixRQUFwQjtpQkFESixFQURtQjtBQUluQix1QkFBSyxXQUFMLEdBSm1CO2FBQVosQ0FIWCxDQVNDLElBVEQsR0FEVTs7OzttQ0FZSDs7O0FBQ1AsMEJBQUksZ0JBQUosRUFBc0I7QUFDbEIsK0JBQWUsS0FBSyxLQUFMLENBQVcsYUFBWDtBQUNmLDBCQUFVO0FBQ04saUNBQWEsRUFBYjtBQUNBLDJCQUFPO0FBQ0gsOEJBQU07QUFDRix5Q0FBYTtBQUNULHNDQUFNLEVBQU47NkJBREo7eUJBREo7cUJBREo7aUJBRko7YUFGSixFQWFDLE9BYkQsQ0FhUyxZQWJULEVBYXVCLEtBQUssS0FBTCxDQUFXLGFBQVgsRUFBMEIsS0FBSyxPQUFMLENBYmpELENBY0MsU0FkRCxDQWNXLFlBQU07QUFDYix1QkFBSyxXQUFMLEdBQW1CLElBQW5CLENBRGE7QUFFYix1QkFBSyxXQUFMLFNBRmE7YUFBTixDQWRYLENBa0JDLElBbEJELEdBRE87Ozs7Ozs7aUNBd0JGLFNBQVM7QUFDZCxvQkFBUSxPQUFSO0FBQ0EscUJBQUssTUFBTDtBQUNJLHlCQUFLLFVBQUwsR0FESjtBQUVJLDBCQUZKO0FBREE7QUFLSSw0QkFBUSxHQUFSLENBQVksa0JBQVosRUFBZ0MsT0FBaEMsRUFESjtBQUpBLGFBRGM7Ozs7Ozs7cUNBWUw7QUFDVCxvQkFBUSxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1IscUJBQUssV0FBTDtBQUNJLDJCQUFPLDJFQUFpQyxPQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBbUIsS0FBSSxZQUFKLEVBQTVELENBQVAsQ0FESjtBQURBLHFCQUdLLGlCQUFMO0FBQ0ksMkJBQU87QUFDSCwrQkFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ1IsdUNBQWdCLEtBQUssS0FBTCxDQUFXLGFBQVg7QUFDaEIsdUNBQWdCLEtBQUssS0FBTCxDQUFXLGFBQVg7QUFDaEIsNkJBQUksWUFBSixFQUpHLENBQVAsQ0FESjtBQUhBLHFCQVNLLE1BQUw7QUFDSSwyQkFBTztBQUNILDZCQUFJLFdBQUo7QUFDQSxnQ0FBUyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFdBQXRCLENBQWtDLElBQWxDLEdBQXlDLElBQXpDLEdBQWdELEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBa0MsSUFBbEM7QUFDekQsZ0NBQVMsZUFBRSxrQ0FBRixDQUFUO0FBQ0EsZ0NBQVMsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixJQUF0QjtBQUNULDhCQUFPLGtFQUF3QixPQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBaEMsQ0FBUCxFQUxHLENBQVAsQ0FESjtBQVRBLHFCQWdCSyxPQUFMO0FBQ0ksMkJBQU8sa0VBQXdCLE9BQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFtQixLQUFJLFlBQUosRUFBbkQsQ0FBUCxDQURKO0FBaEJBO2FBRFM7Ozs7aUNBdUJKOztBQUNMLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsTUFBWCxFQUFtQjtBQUNwQix1QkFBTzs7c0JBQUssV0FBVSxvQkFBVixFQUFMO29CQUFvQyw2Q0FBcEM7aUJBQVAsQ0FEb0I7YUFBeEI7QUFHQSxtQkFBTzs7a0JBQUssV0FBVSxvQkFBVixFQUFMO2dCQUNELEtBQUssVUFBTCxFQURDO2FBQVAsQ0FKSzs7OztxQ0FRc0M7Z0JBQXBDLGlFQUFTLHlDQUEyQjs7QUFDM0MsNEJBQUssUUFBTCxFQUNLLFNBREwsQ0FDZSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFdBQXRCLENBQWtDLElBQWxDLEdBQXlDLElBQXpDLEdBQWdELEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBa0MsSUFBbEMsQ0FEL0QsQ0FFSyxTQUZMLENBRWUsZUFBRSxrQ0FBRixDQUZmLEVBR0ssU0FITCxDQUdlLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsSUFBdEIsQ0FIZixDQUlLLE9BSkwsQ0FJYSxLQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLGtCQUFwQixFQUpiLEVBS0ssUUFMTCxDQUtjLFlBTGQsRUFLNEIsWUFMNUIsRUFLMEMsTUFMMUMsRUFNSyxRQU5MLENBTWMsOERBTmQsRUFNOEUsUUFOOUUsRUFNd0YsTUFOeEYsRUFPSyxRQVBMLENBT2MsOERBUGQsRUFPOEUsU0FQOUUsRUFPeUYsR0FQekYsRUFRSyxRQVJMLENBUWMsWUFSZCxFQVE0QixPQVI1QixFQVFxQyxNQVJyQyxFQVNLLElBVEwsR0FEMkM7Ozs7V0FsS3RDO0VBQTBCLE1BQU0sU0FBTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJ2QyxTQUFTLEVBQVQsR0FBYztBQUNWLFFBQUksT0FBTyxFQUFQLENBRE07QUFFVixTQUFLLElBQUksTUFBTSxDQUFOLEVBQVMsTUFBTSxVQUFVLE1BQVYsRUFBa0IsRUFBRSxHQUFGLEVBQU87QUFDN0MsYUFBSyxJQUFMLENBQVUsVUFBVSxHQUFWLENBQVYsRUFENkM7S0FBakQ7QUFHQSxXQUFPLDRCQUFFLDZCQUE2QixVQUFVLENBQVYsQ0FBN0IsU0FBOEMsS0FBaEQsQ0FBUCxDQUxVO0NBQWQ7O0lBUWE7Ozs7Ozs7Ozs7O3dDQUNPLFVBQVUsVUFBVTtBQUNoQyxnQkFBSSxjQUFjLE9BQVEsUUFBUCxLQUFvQixXQUFwQixJQUFxQyxTQUFTLEdBQVQsQ0FBYSxJQUFiLENBQWtCLEVBQWxCLEtBQXlCLFNBQVMsR0FBVCxDQUFhLElBQWIsQ0FBa0IsRUFBbEIsQ0FEakQ7QUFFaEMsZ0JBQUksQ0FBQyxXQUFELEVBQWM7QUFDZCx1QkFBTyxJQUFQLENBRGM7YUFBbEI7QUFHQSxtQkFBTzs7a0JBQUksS0FBTSxNQUFNLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBaEI7Z0JBQWtDOztzQkFBSSxXQUFVLFdBQVYsRUFBc0IsU0FBUSxHQUFSLEVBQTFCO29CQUNyQzs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQTZCLFNBQVMsR0FBVCxDQUFhLElBQWIsQ0FBa0IsSUFBbEI7cUJBRFE7aUJBQWxDO2FBQVAsQ0FMZ0M7Ozs7a0NBUzFCLEtBQUs7QUFDWCxnQkFBSSxJQUFJLElBQUksR0FBSixDQUFRLFdBQVIsQ0FERztBQUVYLG1CQUFPOztrQkFBSSxLQUFNLE1BQU0sSUFBSSxHQUFKLENBQVEsRUFBUixFQUFoQjtnQkFDSDs7c0JBQUksV0FBVSxXQUFWLEVBQUo7b0JBQTBCOzswQkFBRyxXQUFVLGFBQVYsRUFBSDt3QkFBNkIsSUFBSSxLQUFKLEtBQWMsSUFBZCxHQUFxQixFQUFyQixHQUEwQixJQUFJLEtBQUo7cUJBQWpGO2lCQURHO2dCQUVIOztzQkFBSSxXQUFVLFlBQVYsRUFBSjtvQkFBMkI7OzBCQUFHLFdBQVUsYUFBVixFQUFIO3dCQUE2QixFQUFFLE1BQUY7cUJBQXhEO2lCQUZHO2dCQUdIOztzQkFBSSxXQUFVLE1BQVYsRUFBaUIsU0FBUSxHQUFSLEVBQXJCO29CQUNJOzswQkFBTyxXQUFVLFdBQVYsRUFBUDt3QkFBNkI7Ozs0QkFDdkIsRUFBRSxjQUFGLEdBQW1COzs7Z0NBQUk7O3NDQUFJLFNBQVEsR0FBUixFQUFKO29DQUFnQjs7MENBQUcsV0FBVSxXQUFWLEVBQUg7d0NBQTJCLEVBQUUsY0FBRjtxQ0FBM0M7aUNBQUo7NkJBQW5CLEdBQXFHLElBQXJHOzRCQUNBLEVBQUUsU0FBRixDQUFZLEdBQVosQ0FBZ0IsVUFBQyxDQUFELEVBQUksR0FBSjt1Q0FBWTs7c0NBQUksS0FBTSxHQUFOLEVBQUo7b0NBQzFCOzswQ0FBSSxXQUFVLE1BQVYsRUFBSjt3Q0FBcUI7Ozs0Q0FDZixFQUFFLFNBQUYsR0FBYyxHQUFkLEdBQW9CLEVBQUUsVUFBRjs0Q0FDcEIsRUFBRSxVQUFGLEdBQWU7Ozs7Z0RBQU8sZUFBRSxrQkFBRixDQUFQOzs2Q0FBZixHQUFzRCxJQUF0RDt5Q0FGTjtxQ0FEMEI7b0NBSzFCOzswQ0FBSSxXQUFVLE1BQVYsRUFBSjt3Q0FBcUI7OzhDQUFHLFdBQVUsYUFBVixFQUFIOzRDQUE2QixFQUFFLGFBQUY7eUNBQWxEO3FDQUwwQjs7NkJBQVosQ0FGTzt5QkFBN0I7cUJBREo7aUJBSEc7Z0JBZUg7O3NCQUFJLFdBQVUsV0FBVixFQUFKO29CQUEwQjs7O3dCQUFLLEVBQUUsSUFBRixDQUFPLElBQVA7cUJBQS9CO2lCQWZHO2dCQWdCSDs7c0JBQUksV0FBVSxjQUFWLEVBQUo7b0JBQTZCOzs7d0JBQUssRUFBRSxPQUFGLENBQVUsS0FBVixDQUFnQixHQUFoQixFQUFxQixHQUFyQixDQUF5QixVQUFDLENBQUQ7bUNBQU8sQ0FBQyxFQUFFLElBQUYsRUFBRCxFQUFXLDRCQUFJLEtBQUksR0FBSixFQUFKLENBQVg7eUJBQVAsQ0FBOUI7cUJBQTdCO2lCQWhCRzthQUFQLENBRlc7Ozs7cUNBcUJGO0FBQ1QsZ0JBQUksU0FBUyxFQUFULENBREs7QUFFVCxnQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FGSDtBQUdULGlCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxNQUFNLE1BQU4sRUFBYyxFQUFFLENBQUYsRUFBSztBQUNuQyxvQkFBSSxTQUFTLEtBQUssZUFBTCxDQUFxQixNQUFNLElBQUksQ0FBSixDQUEzQixFQUFtQyxNQUFNLENBQU4sQ0FBbkMsQ0FBVCxDQUQrQjtBQUVuQywwQkFBVSxPQUFPLElBQVAsQ0FBWSxNQUFaLENBQVYsQ0FGbUM7QUFHbkMsdUJBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE1BQU0sQ0FBTixDQUFmLENBQVosRUFIbUM7YUFBdkM7QUFLQSxtQkFBTyxNQUFQLENBUlM7Ozs7aUNBVUo7QUFDTCxtQkFBTzs7a0JBQUssV0FBVSxvQkFBVixFQUFMO2dCQUNIOztzQkFBTyxXQUFVLGdCQUFWLEVBQVA7b0JBQ0k7Ozt3QkFDSTs7OzRCQUNJOztrQ0FBSSxXQUFVLEtBQVYsRUFBSjtnQ0FBb0I7OztvQ0FBSyxHQUFHLHNCQUFILENBQUw7aUNBQXBCOzZCQURKOzRCQUVJOztrQ0FBSSxXQUFVLEtBQVYsRUFBSjtnQ0FBb0I7OztvQ0FBSyxHQUFHLHVCQUFILENBQUw7aUNBQXBCOzZCQUZKOzRCQUdJOztrQ0FBSSxXQUFVLE1BQVYsRUFBSjtnQ0FBcUI7OztvQ0FBSyxHQUFHLDBCQUFILENBQUw7aUNBQXJCOzZCQUhKOzRCQUlJOztrQ0FBSSxXQUFVLEtBQVYsRUFBSjtnQ0FBb0I7OztvQ0FBSyxHQUFHLHdDQUFILENBQUw7aUNBQXBCOzZCQUpKOzRCQUtJOztrQ0FBSSxXQUFVLE1BQVYsRUFBSjtnQ0FBcUI7OztvQ0FBSyxHQUFHLGlDQUFILENBQUw7aUNBQXJCOzZCQUxKOzRCQU1JOztrQ0FBSSxXQUFVLE1BQVYsRUFBSjtnQ0FBcUI7OztvQ0FBSyxHQUFHLG9DQUFILENBQUw7aUNBQXJCOzZCQU5KO3lCQURKO3FCQURKO29CQVdJOzs7d0JBQ00sS0FBSyxVQUFMLEVBRE47cUJBWEo7aUJBREc7YUFBUCxDQURLOzs7O1dBekNBO0VBQStCLE1BQU0sU0FBTjs7SUE4RHRDOzs7QUFDRixhQURFLGtDQUNGLENBQVksS0FBWixFQUFtQjs4QkFEakIsb0NBQ2lCOzs0RUFEakIsK0NBRVEsUUFEUzs7QUFFZixlQUFLLEtBQUwsR0FBYTtBQUNULG9CQUFRLEtBQVI7U0FESixDQUZlOztLQUFuQjs7aUJBREU7O3VDQU9hO0FBQ1gsaUJBQUssUUFBTCxDQUFjO0FBQ1Ysd0JBQVEsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxNQUFYO2FBRGIsRUFEVzs7OztpQ0FLTjtBQUNMLGdCQUFJLElBQUksS0FBSyxLQUFMLENBQVcsV0FBWCxDQURIO0FBRUwsbUJBQU87OzJCQUFPLFdBQVksU0FBVSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFNBQXBCLEdBQWdDLEVBQWhDLENBQVY7bUJBQ1IsMENBQWtCLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFsQixFQURYO2dCQUM0RDs7O29CQUMvRDs7O3dCQUNJOzs4QkFBSSxXQUFVLE9BQVYsRUFBa0IsU0FBUSxHQUFSLEVBQXRCOzRCQUNNLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsSUFBckIsR0FBNEIsRUFBNUIsR0FDRTs7O2dDQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7Z0NBQ0g7O3NDQUFLLFdBQVUsYUFBVixFQUFMO29DQUErQixlQUFFLHdCQUFGLENBQS9CO2lDQURKOzZCQURGO3lCQUZWO3dCQU9JOzs4QkFBSSxXQUFVLFFBQVYsRUFBSjs0QkFBeUIsRUFBRSxNQUFGO3lCQVA3Qjt3QkFRSTs7OEJBQUksV0FBVSxNQUFWLEVBQUo7NEJBQXVCLEVBQUUsSUFBRjt5QkFSM0I7cUJBRCtEO29CQVcvRDs7O3dCQUNJOzs4QkFBSSxXQUFVLE1BQVYsRUFBaUIsU0FBUSxHQUFSLEVBQXJCOzRCQUFtQyxFQUFFLElBQUYsQ0FBTyxJQUFQO3lCQUR2QztxQkFYK0Q7b0JBYy9EOzs7d0JBQ0k7OzhCQUFJLFdBQVUsU0FBVixFQUFvQixTQUFRLEdBQVIsRUFBeEI7NEJBQXNDLEVBQUUsT0FBRjt5QkFEMUM7cUJBZCtEO2lCQUQ1RDthQUFQLENBRks7Ozs7V0FaUDtFQUEyQyxNQUFNLFNBQU47O0lBb0NwQzs7Ozs7Ozs7Ozs7d0NBQ08sVUFBVSxVQUFVO0FBQ2hDLGdCQUFJLGNBQWMsT0FBUSxRQUFQLEtBQW9CLFdBQXBCLElBQXFDLFNBQVMsR0FBVCxDQUFhLElBQWIsQ0FBa0IsRUFBbEIsS0FBeUIsU0FBUyxHQUFULENBQWEsSUFBYixDQUFrQixFQUFsQixDQURqRDtBQUVoQyxnQkFBSSxDQUFDLFdBQUQsRUFBYztBQUNkLHVCQUFPLElBQVAsQ0FEYzthQUFsQjtBQUdBLG1CQUFPOztrQkFBSyxXQUFVLFdBQVYsRUFBc0IsS0FBTSxNQUFNLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBdkM7Z0JBQ0QsU0FBUyxHQUFULENBQWEsSUFBYixDQUFrQixJQUFsQjthQUROLENBTGdDOzs7O2tDQVMxQixLQUFLO0FBQ1gsbUJBQU8sb0JBQUMsa0NBQUQsSUFBb0MsS0FBTSxNQUFNLElBQUksR0FBSixDQUFRLEVBQVI7QUFDWiw2QkFBYyxJQUFJLEdBQUosQ0FBUSxXQUFSO0FBQ2QsdUJBQVEsSUFBSSxLQUFKLEVBRjVDLENBQVAsQ0FEVzs7OztxQ0FLRjtBQUNULGdCQUFJLFNBQVMsRUFBVCxDQURLO0FBRVQsZ0JBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBRkg7QUFHVCxpQkFBSyxJQUFJLElBQUksTUFBTSxNQUFOLEdBQWUsQ0FBZixFQUFrQixLQUFLLENBQUwsRUFBUSxFQUFFLENBQUYsRUFBSztBQUN4QyxvQkFBSSxTQUFTLEtBQUssZUFBTCxDQUFxQixNQUFNLElBQUksQ0FBSixDQUEzQixFQUFtQyxNQUFNLENBQU4sQ0FBbkMsQ0FBVCxDQURvQztBQUV4QywwQkFBVSxPQUFPLElBQVAsQ0FBWSxNQUFaLENBQVYsQ0FGd0M7QUFHeEMsdUJBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE1BQU0sQ0FBTixDQUFmLENBQVosRUFId0M7YUFBNUM7QUFLQSxtQkFBTyxNQUFQLENBUlM7Ozs7aUNBVUo7QUFDTCxtQkFBTzs7O2dCQUNELEtBQUssVUFBTCxFQURDO2FBQVAsQ0FESzs7OztXQXpCQTtFQUF3QyxNQUFNLFNBQU47O0lBZ0MvQzs7Ozs7Ozs7Ozs7aUNBQ087QUFDTCxnQkFBSSxJQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FESDtBQUVMLG1CQUFPOzsyQkFBTyxXQUFZLFNBQVUsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixXQUF0QixHQUFvQyxFQUFwQyxDQUFWO21CQUNSLDBDQUFrQixLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBRDdCO2dCQUNrRDs7O29CQUNyRDs7O3dCQUNJOzs4QkFBSSxXQUFVLE9BQVYsRUFBa0IsU0FBUSxHQUFSLEVBQXRCOzRCQUNNLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsSUFBckIsR0FBNEIsRUFBNUIsR0FDRTs7O2dDQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7Z0NBQ0g7O3NDQUFLLFdBQVUsYUFBVixFQUFMO29DQUErQixlQUFFLHdCQUFGLENBQS9CO2lDQURKOzZCQURGO3lCQUZWO3dCQU9JOzs4QkFBSSxXQUFVLFFBQVYsRUFBSjs0QkFBeUIsRUFBRSxNQUFGO3lCQVA3Qjt3QkFRSTs7OEJBQUksV0FBVSxNQUFWLEVBQUo7NEJBQXVCLEVBQUUsSUFBRjt5QkFSM0I7cUJBRHFEO29CQVdyRDs7O3dCQUNJOzs4QkFBSSxXQUFVLE1BQVYsRUFBaUIsU0FBUSxHQUFSLEVBQXJCOzRCQUFtQyxFQUFFLElBQUYsQ0FBTyxJQUFQO3lCQUR2QztxQkFYcUQ7aUJBRGxEO2FBQVAsQ0FGSzs7OztXQURQO0VBQWdELE1BQU0sU0FBTjs7SUFzQnpDOzs7Ozs7Ozs7Ozt3Q0FDTyxVQUFVLFVBQVU7QUFDaEMsZ0JBQUksY0FBYyxPQUFRLFFBQVAsS0FBb0IsV0FBcEIsSUFBcUMsU0FBUyxHQUFULENBQWEsSUFBYixDQUFrQixFQUFsQixLQUF5QixTQUFTLEdBQVQsQ0FBYSxJQUFiLENBQWtCLEVBQWxCLENBRGpEO0FBRWhDLGdCQUFJLENBQUMsV0FBRCxFQUFjO0FBQ2QsdUJBQU8sSUFBUCxDQURjO2FBQWxCO0FBR0EsbUJBQU87O2tCQUFLLFdBQVUsV0FBVixFQUFzQixLQUFNLE1BQU0sU0FBUyxHQUFULENBQWEsRUFBYixFQUF2QztnQkFDRCxTQUFTLEdBQVQsQ0FBYSxJQUFiLENBQWtCLElBQWxCO2FBRE4sQ0FMZ0M7Ozs7a0NBUzFCLEtBQUssT0FBTzs7O0FBQ2xCLG1CQUFPLG9CQUFDLHVDQUFEO0FBQ0gscUJBQU0sTUFBTSxJQUFJLEdBQUosQ0FBUSxFQUFSO0FBQ1osNkJBQWMsSUFBSSxHQUFKLENBQVEsV0FBUjtBQUNkLHVCQUFRLElBQUksS0FBSjtBQUNSLHlCQUFVOzJCQUFNLE9BQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsS0FBekI7aUJBQU47QUFDViwwQkFBVyxLQUFLLEtBQUwsQ0FBVyxhQUFYLEtBQTZCLElBQTdCLElBQXFDLFNBQVMsS0FBSyxLQUFMLENBQVcsYUFBWCxFQUx0RCxDQUFQLENBRGtCOzs7O3FDQVFUO0FBQ1QsZ0JBQUksU0FBUyxFQUFULENBREs7QUFFVCxnQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FGSDtBQUdULGlCQUFLLElBQUksSUFBSSxNQUFNLE1BQU4sR0FBZSxDQUFmLEVBQWtCLEtBQUssQ0FBTCxFQUFRLEVBQUUsQ0FBRixFQUFLO0FBQ3hDLG9CQUFJLFNBQVMsS0FBSyxlQUFMLENBQXFCLE1BQU0sSUFBSSxDQUFKLENBQTNCLEVBQW1DLE1BQU0sQ0FBTixDQUFuQyxDQUFULENBRG9DO0FBRXhDLDBCQUFVLE9BQU8sSUFBUCxDQUFZLE1BQVosQ0FBVixDQUZ3QztBQUd4Qyx1QkFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsTUFBTSxDQUFOLENBQWYsRUFBeUIsSUFBSSxDQUFKLENBQXJDLEVBSHdDO2FBQTVDO0FBS0EsbUJBQU8sTUFBUCxDQVJTOzs7O2lDQVVKO0FBQ0wsbUJBQU87OztnQkFDRCxLQUFLLFVBQUwsRUFEQzthQUFQLENBREs7Ozs7V0E1QkE7RUFBNkMsTUFBTSxTQUFOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzlKN0M7QUFDVCxhQURTLGNBQ1QsQ0FBWSxZQUFaLEVBQTBCOzs7OEJBRGpCLGdCQUNpQjs7QUFDdEIsYUFBSyxRQUFMLEdBQWdCLFlBQWhCLENBRHNCO0FBRXRCLGFBQUssU0FBTCxHQUFpQixFQUFqQixDQUZzQjtBQUd0QixhQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLE9BQXRCLENBQThCLFVBQUMsSUFBRCxFQUFPLEdBQVA7bUJBQWUsTUFBSyxTQUFMLENBQWUsS0FBSyxFQUFMLENBQWYsR0FBMEIsR0FBMUI7U0FBZixDQUE5QixDQUhzQjtLQUExQjs7aUJBRFM7OzBDQU1TLElBQXNCO2dCQUFsQixtRUFBVyxxQkFBTzs7QUFDcEMsZ0JBQUksU0FBUyxLQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEtBQUssU0FBTCxDQUFlLEVBQWYsQ0FBdEIsQ0FBVCxDQURnQztBQUVwQyxnQkFBSSxDQUFDLE1BQUQsRUFBUztBQUNULG9CQUFJLFVBQUosRUFBZ0I7QUFDWiwyQkFBTyxLQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLENBQXRCLENBQVAsQ0FEWTtpQkFBaEI7QUFHQSx1QkFBTyxLQUFLLG9CQUFMLEVBQVAsQ0FKUzthQUFiO0FBTUEsbUJBQU8sTUFBUCxDQVJvQzs7OzsrQ0FVakI7QUFDbkIsbUJBQU8sS0FBSyxpQkFBTCxDQUF1QixLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXZCLEVBQWlELElBQWpELENBQVAsQ0FEbUI7Ozs7V0FoQmQ7OztJQXNCQTs7Ozs7NEJBQ2M7QUFDbkIsbUJBQU87QUFDSCxnQ0FBZ0IsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2hCLDBCQUFVLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjthQUZkLENBRG1COzs7O0FBTXZCLGFBUFMsTUFPVCxDQUFZLEtBQVosRUFBbUI7OEJBUFYsUUFPVTs7NEVBUFYsbUJBUUMsUUFEUzs7QUFFZixlQUFLLFFBQUwsR0FBZ0IsSUFBSSxjQUFKLENBQW1CLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBbkMsQ0FGZTtBQUdmLGVBQUssS0FBTCxHQUFhO0FBQ1QsNEJBQWdCLE9BQUssUUFBTCxDQUFjLG9CQUFkLEVBQWhCO0FBQ0EseUJBQWEsSUFBYjtTQUZKLENBSGU7QUFPZixlQUFLLFFBQUwsR0FQZTtBQVFmLCtDQUFtQixXQUFuQixDQUErQixXQUEvQixFQUE0QyxPQUFLLGlCQUFMLENBQXVCLElBQXZCLFFBQTVDLEVBUmU7QUFTZiwrQ0FBbUIsV0FBbkIsQ0FBK0IsYUFBL0IsRUFBOEMsT0FBSyxRQUFMLENBQWMsSUFBZCxRQUE5QyxFQVRlOztLQUFuQjs7aUJBUFM7O21DQWtCRTtBQUNQLDBCQUFJLGlCQUFKLEVBQXVCLEVBQUUsZ0JBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsRUFBMkIsVUFBVSxFQUFWLEVBQXBFLEVBQ0ssT0FETCxDQUNhLGFBRGIsRUFDNEIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUQ1QixDQUVLLFNBRkwsQ0FFZSxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBRmYsRUFHSyxJQUhMLEdBRE87Ozs7NENBTVM7QUFDaEIsZ0JBQUksV0FBVyxpQkFBUSxHQUFSLENBQVksYUFBWixFQUEyQixLQUEzQixDQUFpQyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQWpDLENBQTRELFNBQTVELENBQXNFLEVBQXRFLEVBQTBFLFdBQTFFLENBREM7QUFFaEIsZ0JBQUksU0FBUyxTQUFULEtBQXVCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsRUFBMUIsSUFBZ0MsU0FBUyxTQUFULEVBQW9CO0FBQzNFLHFCQUFLLFlBQUwsQ0FBa0IsU0FBUyxTQUFULENBQWxCLENBRDJFO2FBQS9FOzs7OzJDQUllLE1BQU07QUFDckIsbUJBQU8sbUJBQW1CLEtBQUssUUFBTCxHQUFnQixHQUFuQyxHQUF5QyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBRDNCOzs7O3FDQUdaLFFBQVE7QUFDakIsaUJBQUssUUFBTCxDQUFjO0FBQ1YsNkJBQWEsS0FBSyxRQUFMLENBQWMsaUJBQWQsQ0FBZ0MsTUFBaEMsQ0FBYjthQURKLEVBRGlCOzs7O3VDQUtOO0FBQ1gsaUJBQUssUUFBTCxDQUFjO0FBQ1YsZ0NBQWdCLEtBQUssS0FBTCxDQUFXLFdBQVg7QUFDaEIsNkJBQWEsSUFBYjthQUZKLEVBRFc7Ozs7aUNBTU47QUFDTCxtQkFBTzs7a0JBQUssV0FBVSxPQUFWLEVBQUw7Z0JBQ0gsZ0NBQVEsS0FBTSxLQUFLLGtCQUFMLENBQXdCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBOUI7QUFDQSx5QkFBTSxLQUFLLGtCQUFMLENBQXdCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBOUIsRUFEUixDQURHO2dCQUdELEtBQUssS0FBTCxDQUFXLFdBQVgsR0FDSSxnQ0FBUSxLQUFNLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUE5QjtBQUNBLHlCQUFNLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUE5QjtBQUNBLDRCQUFTLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFULEVBRlIsQ0FESixHQUlJLElBSko7YUFITixDQURLOzs7O1dBNUNBO0VBQWUsTUFBTSxTQUFOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDakJ0Qjs7Ozs7Ozs7Ozs7Ozs7NE5BV0YsZUFBZSxVQUFDLE9BQUQsRUFBYTtBQUN4QixrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixPQUFwQixFQUR3QjtTQUFiOzs7aUJBWGI7O3lDQWNlLFlBQVk7OztBQUN6QixtQkFDSTs7a0JBQUssV0FBVSxZQUFWLEVBQXVCLEtBQU0sV0FBVyxFQUFYLEVBQWxDO2dCQUNJOztzQkFBSyxXQUFVLE1BQVYsRUFBTDtvQkFDTSxXQUFXLElBQVg7aUJBRlY7Z0JBSUk7O3NCQUFLLFdBQVUsT0FBVixFQUFMO29CQUNJOzswQkFBSyxXQUFVLE9BQVYsRUFBTDt3QkFDTSxXQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBcUI7bUNBQ25CLG9CQUFDLDhCQUFEO0FBQ0kscUNBQU0sS0FBSyxFQUFMO0FBQ04sc0NBQU8sSUFBUDtBQUNBLCtDQUFnQixPQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ2hCLDBDQUFXLE9BQUssWUFBTCxFQUpmO3lCQURtQixDQUQzQjtxQkFESjtpQkFKSjthQURKLENBRHlCOzs7O2lDQW9CcEI7OztBQUNMLG1CQUNJOztrQkFBSyxXQUFVLGVBQVYsRUFBTDtnQkFDTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLEdBQW5DLENBQXVDOzJCQUNyQyxPQUFLLGdCQUFMLENBQXNCLFVBQXRCO2lCQURxQyxDQUQ3QzthQURKLENBREs7Ozs7NEJBakNjO0FBQ25CLG1CQUFPO0FBQ0gsNkJBQWEsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2IsdUJBQU8sTUFBTSxTQUFOLENBQWdCLFNBQWhCLENBQTBCLENBQzdCLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixDQUFDLElBQUQsQ0FBdEIsQ0FENkIsRUFFN0IsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBRkcsQ0FBUDtBQUlBLDBCQUFVLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjthQU5kLENBRG1COzs7O1dBRHJCO0VBQW1DLE1BQU0sU0FBTjs7SUE2Q25DOzs7Ozs7Ozs7Ozs7Ozt1T0FXRixXQUFXLFlBQU07QUFDYixtQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixPQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEVBQWhCLENBQXBCLENBRGE7U0FBTjs7O2lCQVhUOztpQ0FjTztBQUNMLGdCQUFJLGFBQWEsTUFBYixDQURDO0FBRUwsZ0JBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixFQUFoQixLQUF1QixLQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQTBCO0FBQ2pELDhCQUFjLFdBQWQsQ0FEaUQ7YUFBckQ7QUFHQSxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLE1BQWhCLEVBQXdCO0FBQ3hCLDhCQUFjLFNBQWQsQ0FEd0I7YUFBNUI7QUFHQSxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFNBQWhCLEVBQTJCO0FBQzNCLDhCQUFjLFlBQWQsQ0FEMkI7YUFBL0I7QUFHQSxtQkFDSTs7MkJBQUssV0FBWSxVQUFaLElBQTZCLDBDQUFrQixLQUFLLFFBQUwsRUFBcEQ7Z0JBQ00sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQjthQUZWLENBWEs7Ozs7NEJBYmM7QUFDbkIsbUJBQU87QUFDSCxzQkFBTSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTiwrQkFBZSxNQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FDckMsTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLENBQUMsSUFBRCxDQUF0QixDQURxQyxFQUVyQyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FGVyxDQUFmO0FBSUEsMEJBQVUsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO2FBTmQsQ0FEbUI7Ozs7V0FEckI7RUFBdUMsTUFBTSxTQUFOOztJQWlDdkM7Ozs7Ozs7Ozs7O2lDQVFPOzs7QUFDTCxnQkFBSSxVQUFVLEVBQVYsQ0FEQztBQUVMLGlCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLE9BQW5DLENBQTJDLFVBQUMsVUFBRDt1QkFDdkMsUUFBUSxJQUFSLENBQWE7O3NCQUFRLE9BQVEsV0FBVyxFQUFYLEVBQWdCLEtBQU0sV0FBVyxFQUFYLEVBQXRDO29CQUNQLFdBQVcsSUFBWDtpQkFETjthQUR1QyxDQUEzQyxDQUZLO0FBT0wsbUJBQU87O2tCQUFRLE9BQVEsS0FBSyxLQUFMLENBQVcsS0FBWDtBQUNSLCtCQUFVLGNBQVY7QUFDQSw4QkFBVyxrQkFBQyxDQUFEOytCQUFPLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsRUFBRSxNQUFGLENBQVMsS0FBVCxJQUFrQixJQUFsQjtxQkFBM0IsRUFGbkI7Z0JBR0g7O3NCQUFRLE9BQU0sRUFBTixFQUFSOztpQkFIRztnQkFJRCxPQUpDO2FBQVAsQ0FQSzs7Ozs0QkFQYztBQUNuQixtQkFBTztBQUNILDZCQUFhLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNiLHVCQUFPLE1BQU0sU0FBTixDQUFnQixNQUFoQjtBQUNQLDBCQUFVLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjthQUhkLENBRG1COzs7O1dBRHJCO0VBQThDLE1BQU0sU0FBTjs7SUF3QjlDOzs7Ozs7Ozs7OztpQ0FTTztBQUNMLG1CQUFPOzsyQkFBTyxXQUFZLFVBQVUsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixXQUF0QixHQUFvQyxFQUFwQyxDQUFWO21CQUNkLDBDQUFrQixLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBRHZCO2dCQUVIOzs7b0JBQU87Ozt3QkFDSDs7OEJBQUksV0FBVSxhQUFWLEVBQUo7NEJBQ0k7OztnQ0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYOzZCQURYOzRCQUVJOztrQ0FBSyxXQUFVLFlBQVYsRUFBTDtnQ0FBOEIsZUFBRSw2QkFBRixDQUE5Qjs2QkFGSjt5QkFERzt3QkFLSDs7OEJBQUksV0FBVSxjQUFWLEVBQUo7NEJBQ00sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixHQUFoQixDQUFvQixVQUFDLEdBQUQ7dUNBQ2xCOztzQ0FBSyxXQUFVLGFBQVYsRUFBd0IsS0FBTSxJQUFJLEVBQUosRUFBbkM7b0NBQ0k7OzBDQUFLLFdBQVUsUUFBVixFQUFMO3dDQUEwQixJQUFJLFdBQUosQ0FBZ0IsTUFBaEI7cUNBRDlCO29DQUVJOzswQ0FBSyxXQUFVLE1BQVYsRUFBTDt3Q0FBd0IsSUFBSSxXQUFKLENBQWdCLElBQWhCO3FDQUY1Qjs7NkJBRGtCLENBRDFCO3lCQUxHO3FCQUFQO2lCQUZHO2FBQVAsQ0FESzs7Ozs0QkFSYztBQUNuQixtQkFBTztBQUNILDBCQUFVLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjtBQUNWLHNCQUFNLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNOLHNCQUFNLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixVQUF0QjtBQUNOLHlCQUFTLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjthQUpiLENBRG1COzs7O1dBRHJCO0VBQXNDLE1BQU0sU0FBTjs7SUE4QnRDOzs7Ozs0QkFDcUI7QUFDbkIsbUJBQU87QUFDSCx5QkFBUyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDVCx1QkFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUCw4QkFBYyxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7YUFIbEIsQ0FEbUI7Ozs7QUFPdkIsYUFSRSwwQkFRRixDQUFZLEtBQVosRUFBbUI7OEJBUmpCLDRCQVFpQjs7NEVBUmpCLHVDQVNRLFFBRFM7O0FBRWYsZUFBSyxLQUFMLEdBQWE7QUFDVCxrQkFBTSxJQUFOO1NBREosQ0FGZTs7S0FBbkI7O2lCQVJFOzs2Q0FjbUI7QUFDakIsZ0JBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxLQUF1QixJQUF2QixFQUE2QjtBQUM3Qix1QkFENkI7YUFBakM7QUFHQSxpQkFBSyxPQUFMLEdBQWUsaUJBQVEsU0FBUixDQUFrQixVQUFVLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBM0MsQ0FKaUI7QUFLakIsaUJBQUssZUFBTCxHQUF1Qix1Q0FBbUIsV0FBbkIsQ0FBK0IsYUFBL0IsRUFBOEMsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUE5QyxDQUF2QixDQUxpQjtBQU1qQixpQkFBSyxrQkFBTCxHQUEwQix1Q0FBbUIsV0FBbkIsQ0FBK0IsV0FBL0IsRUFBNEMsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUE1QyxDQUExQixDQU5pQjtBQU9qQixpQkFBSyxRQUFMLEdBUGlCOzs7OytDQVNFO0FBQ25CLGdCQUFJLEtBQUssS0FBTCxDQUFXLE9BQVgsS0FBdUIsSUFBdkIsRUFBNkI7QUFDN0IsdUJBRDZCO2FBQWpDO0FBR0EsbURBQW1CLGNBQW5CLENBQWtDLEtBQUssZUFBTCxDQUFsQyxDQUptQjtBQUtuQixtREFBbUIsY0FBbkIsQ0FBa0MsS0FBSyxrQkFBTCxDQUFsQyxDQUxtQjtBQU1uQiw2QkFBUSxTQUFSLENBQWtCLFVBQVUsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUE1QixDQU5tQjs7Ozs0Q0FRSDtBQUNoQixnQkFBSSxTQUFTO0FBQ1Qsc0JBQU07QUFDRixpQ0FBYSxFQUFiO2lCQURKO2FBREEsQ0FEWTtBQU1oQixnQkFBSSxhQUFhLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsTUFBakIsRUFDWixLQURZLENBQ04sS0FBSyxLQUFMLENBQVcsT0FBWCxDQURNLENBRVosU0FGWSxDQUVGLE1BRkUsQ0FBYixDQU5ZO0FBU2hCLGlCQUFLLFFBQUwsQ0FBYyxFQUFFLE1BQU0sVUFBTixFQUFoQixFQVRnQjs7OzttQ0FXVDtBQUNQLDBCQUFJLFVBQUosRUFBZ0I7QUFDWix5QkFBUyxLQUFLLEtBQUwsQ0FBVyxPQUFYO0FBQ1QsMEJBQVU7QUFDTiwwQkFBTTtBQUNGLHFDQUFhLEVBQWI7cUJBREo7aUJBREo7YUFGSixFQVFDLE9BUkQsQ0FRUyxNQVJULEVBUWlCLEtBQUssS0FBTCxDQUFXLE9BQVgsRUFBb0IsS0FBSyxPQUFMLENBUnJDLENBU0MsU0FURCxDQVNXLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FUWCxFQVVDLElBVkQsR0FETzs7OztpQ0FhRjs7OztBQUNMLGdCQUFJLEtBQUssS0FBTCxDQUFXLE9BQVgsS0FBdUIsSUFBdkIsRUFBNkI7QUFDN0IsdUJBQU8sSUFBUCxDQUQ2QjthQUFqQztBQUdBLGdCQUFJLEtBQUssS0FBTCxDQUFXLElBQVgsS0FBb0IsSUFBcEIsRUFBMEI7QUFDMUIsdUJBQU8sNkNBQVAsQ0FEMEI7YUFBOUI7QUFHQSxnQkFBSSxTQUFTLEVBQVQsQ0FQQztBQVFMLGdCQUFJLFdBQVcsZUFBSyxHQUFMLGlDQUFZLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBeUIsVUFBQyxHQUFEO3VCQUFTLElBQUksSUFBSjthQUFULEVBQXJDLENBQVgsQ0FSQzs7dUNBU0k7QUFDTCx1QkFBTyxJQUFQLENBQVksb0JBQUMsNkJBQUQ7QUFDUix5QkFBTSxJQUFOO0FBQ0EsMEJBQU8sT0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixNQUFyQixDQUE0QixVQUFDLEdBQUQ7K0JBQVMsSUFBSSxJQUFKLEtBQWEsSUFBYjtxQkFBVCxDQUFuQztBQUNBLDBCQUFPLElBQVA7QUFDQSw4QkFBVyxPQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLElBQXJCO0FBQ1gsNkJBQVU7K0JBQU0sT0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixJQUF4QjtxQkFBTixFQUxGLENBQVo7Y0FWQzs7QUFTTCxpQkFBSyxJQUFJLE9BQU8sQ0FBUCxFQUFVLFFBQVEsUUFBUixFQUFrQixFQUFFLElBQUYsRUFBUTtzQkFBcEMsTUFBb0M7YUFBN0M7QUFRQSxtQkFBTzs7a0JBQUssV0FBVSxlQUFWLEVBQUw7Z0JBQ0g7OytCQUFRLFdBQVUsdUNBQVY7QUFDQSw4QkFBSyxRQUFMO3VCQUNLLDBDQUFrQjsrQkFBTSxPQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLElBQXhCO3FCQUFOLEVBRi9CO29CQUdNLGVBQUUsb0NBQUYsQ0FITjtpQkFERztnQkFNRCxNQU5DO2FBQVAsQ0FqQks7Ozs7V0F2RFA7RUFBbUMsTUFBTSxTQUFOOztJQW1GbkM7Ozs7Ozs7Ozs7O2lDQVFPOzs7QUFDTCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxhQUFYLEtBQTZCLElBQTdCLEVBQW1DO0FBQ25DLHVCQUFPLElBQVAsQ0FEbUM7YUFBdkM7QUFHQSxtQkFBTzs7O2dCQUNIOzsrQkFBUSxXQUFVLHdDQUFWO0FBQ0EsOEJBQUssUUFBTDt1QkFDSywwQ0FBa0I7K0JBQU0sUUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixJQUFwQjtxQkFBTixFQUYvQjtvQkFHTSxlQUFFLHFDQUFGLENBSE47aUJBREc7Z0JBTUg7QUFDSSxtQ0FBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDtBQUNoQiw4QkFBUyxpQkFBVDtBQUNBLG1DQUFnQix1QkFBQyxLQUFEOytCQUFXLFFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBcEI7cUJBQVg7QUFDaEIsbUNBQWdCLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDaEIseUJBQU0sS0FBSyxLQUFMLENBQVcsYUFBWCxFQUxWLENBTkc7YUFBUCxDQUpLOzs7OzRCQVBjO0FBQ25CLG1CQUFPO0FBQ0gsK0JBQWUsTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ2YsdUJBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AsMEJBQVUsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO2FBSGQsQ0FEbUI7Ozs7V0FEckI7RUFBb0MsTUFBTSxTQUFOOztJQTRCcEM7Ozs7Ozs7Ozs7O3FDQVFXLFdBQVc7QUFDcEIsZ0JBQUksWUFBWSxrQkFBTSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQWxCLENBRGdCO0FBRXBCLHNCQUFVLE9BQVYsR0FBb0IsU0FBcEIsQ0FGb0I7QUFHcEIsc0JBQVUsSUFBVixHQUFpQixJQUFqQixDQUhvQjtBQUlwQixpQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixTQUFwQixFQUpvQjs7OztxQ0FNWCxXQUFXO0FBQ3BCLGdCQUFJLFlBQVksa0JBQU0sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUFsQixDQURnQjtBQUVwQixzQkFBVSxJQUFWLEdBQWlCLFNBQWpCLENBRm9CO0FBR3BCLGlCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLFNBQXBCLEVBSG9COzs7O2lDQUtmO0FBQ0wsbUJBQU87OztnQkFDSDs7O29CQUFNLGVBQUUsOEJBQUYsQ0FBTjtpQkFERztnQkFFSCxvQkFBQywwQkFBRDtBQUNJLGlDQUFjLEtBQUssS0FBTCxDQUFXLFdBQVg7QUFDZCwyQkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLE9BQTFCO0FBQ1IsOEJBQVcsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQVgsRUFISixDQUZHO2dCQU1IOzs7b0JBQU0sZUFBRSw4QkFBRixDQUFOO2lCQU5HO2dCQU9ILG9CQUFDLDBCQUFEO0FBQ0kseUJBQU0sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixPQUExQjtBQUNOLDZCQUFVLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsT0FBMUI7QUFDViwyQkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLElBQTFCO0FBQ1Isa0NBQWUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQWYsRUFKSixDQVBHO2FBQVAsQ0FESzs7Ozs0QkFsQmM7QUFDbkIsbUJBQU87QUFDSCxnQ0FBZ0IsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2hCLDZCQUFhLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNiLDBCQUFVLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjthQUhkLENBRG1COzs7O1dBRHJCO0VBQXVDLE1BQU0sU0FBTjs7SUFvQ3ZDOzs7Ozs7Ozs7OztxQ0FRVyxXQUFXO0FBQ3BCLGdCQUFJLFlBQVksa0JBQU0sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUFsQixDQURnQjtBQUVwQixzQkFBVSxPQUFWLEdBQW9CLFNBQXBCLENBRm9CO0FBR3BCLGlCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLFNBQXBCLEVBSG9COzs7O2lDQUtmO0FBQ0wsbUJBQU87OztnQkFDSDs7O29CQUFNLGVBQUUsOEJBQUYsQ0FBTjtpQkFERztnQkFFSCxvQkFBQywwQkFBRDtBQUNJLGlDQUFjLEtBQUssS0FBTCxDQUFXLFdBQVg7QUFDZCwyQkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLE9BQTFCO0FBQ1IsOEJBQVcsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQVgsRUFISixDQUZHO2FBQVAsQ0FESzs7Ozs0QkFaYztBQUNuQixtQkFBTztBQUNILGdDQUFnQixNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDaEIsNkJBQWEsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2IsMEJBQVUsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO2FBSGQsQ0FEbUI7Ozs7V0FEckI7RUFBbUMsTUFBTSxTQUFOOztJQXdCbkM7Ozs7Ozs7Ozs7OzJDQVFpQixXQUFXO0FBQzFCLGdCQUFJLFlBQVksa0JBQU0sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUFsQixDQURzQjtBQUUxQixzQkFBVSxhQUFWLEdBQTBCLFNBQTFCLENBRjBCO0FBRzFCLHNCQUFVLEtBQVYsR0FBa0IsSUFBbEIsQ0FIMEI7QUFJMUIsaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsU0FBcEIsRUFKMEI7Ozs7c0NBTWhCLFdBQVc7QUFDckIsZ0JBQUksWUFBWSxrQkFBTSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQWxCLENBRGlCO0FBRXJCLHNCQUFVLEtBQVYsR0FBa0IsU0FBbEIsQ0FGcUI7QUFHckIsaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsU0FBcEIsRUFIcUI7Ozs7aUNBS2hCO0FBQ0wsbUJBQU87OztnQkFDSDs7O29CQUFNLGVBQUUsb0NBQUYsQ0FBTjtpQkFERztnQkFFSCxvQkFBQyxxQ0FBRDtBQUNJLGlDQUFjLEtBQUssS0FBTCxDQUFXLFdBQVg7QUFDZCwyQkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGFBQTFCO0FBQ1IsOEJBQVcsS0FBSyxrQkFBTCxDQUF3QixJQUF4QixDQUE2QixJQUE3QixDQUFYLEVBSEosQ0FGRztnQkFNSDs7O29CQUFNLGVBQUUsZ0NBQUYsQ0FBTjtpQkFORztnQkFPSCxvQkFBQywyQkFBRDtBQUNJLG1DQUFnQixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGFBQTFCO0FBQ2hCLDJCQUFRLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBMUI7QUFDUiw4QkFBVyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBWCxFQUhKLENBUEc7YUFBUCxDQURLOzs7OzRCQWxCYztBQUNuQixtQkFBTztBQUNILGdDQUFnQixNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDaEIsNkJBQWEsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ2IsMEJBQVUsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO2FBSGQsQ0FEbUI7Ozs7V0FEckI7RUFBOEMsTUFBTSxTQUFOOztJQW1DdkM7Ozs7OzRCQUNjO0FBQ25CLG1CQUFPO0FBQ0gsZ0NBQWdCLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNoQiwwQkFBVSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7YUFGZCxDQURtQjs7OztBQU12QixhQVBTLGNBT1QsQ0FBWSxLQUFaLEVBQW1COzhCQVBWLGdCQU9VOzs2RUFQViwyQkFRQyxRQURTOztBQUVmLGdCQUFLLFFBQUwsR0FBZ0IseUJBQW1CLFFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBbkMsQ0FGZTtBQUdmLGdCQUFLLEtBQUwsR0FBYTtBQUNULHlCQUFhLElBQWI7QUFDQSwwQkFBYyxJQUFkO1NBRkosQ0FIZTtBQU9mLGdCQUFLLFFBQUwsR0FQZTtBQVFmLCtDQUFtQixXQUFuQixDQUErQixXQUEvQixFQUE0QyxRQUFLLGlCQUFMLENBQXVCLElBQXZCLFNBQTVDLEVBUmU7QUFTZiwrQ0FBbUIsV0FBbkIsQ0FBK0IsYUFBL0IsRUFBOEMsUUFBSyxRQUFMLENBQWMsSUFBZCxTQUE5QyxFQVRlOztLQUFuQjs7aUJBUFM7O21DQWtCRTtBQUNQLDBCQUFJLGlCQUFKLEVBQXVCLEVBQUUsZ0JBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsRUFBMkIsVUFBVTtBQUMxRSxpQ0FBYTtBQUNULCtCQUFPLEVBQVA7cUJBREo7aUJBRGdFLEVBQXBFLEVBS0ssT0FMTCxDQUthLGFBTGIsRUFLNEIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUw1QixDQU1LLFNBTkwsQ0FNZSxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBTmYsRUFPSyxJQVBMLEdBRE87Ozs7cUNBVUU7OztBQUNULGdCQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsWUFBWCxJQUEyQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBRDdCO0FBRVQsZ0JBQUksQ0FBQyxLQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQUQsRUFBOEI7QUFDOUIsdUJBRDhCO2FBQWxDO0FBR0EsMEJBQUksaUJBQUosRUFBdUI7QUFDbkIsZ0NBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVg7QUFDaEIsc0JBQU0sRUFBRSxhQUFhLEtBQUssS0FBTCxDQUFXLFlBQVgsRUFBckI7YUFGSixFQUdHLFNBSEgsQ0FHYTt1QkFBTSxRQUFLLFFBQUwsQ0FBYztBQUM3QixrQ0FBYyxJQUFkO2lCQURlO2FBQU4sQ0FIYixDQUtJLElBTEosR0FMUzs7OztvQ0FZRDtBQUNSLGlCQUFLLFFBQUwsQ0FBYztBQUNWLDhCQUFjLElBQWQ7YUFESixFQURROzs7OzRDQUtRO0FBQ2hCLGlCQUFLLFFBQUwsQ0FBYztBQUNWLDZCQUFhLGlCQUFRLEdBQVIsQ0FBWSxhQUFaLEVBQ1IsS0FEUSxDQUNGLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FERSxDQUVSLFNBRlEsQ0FFRTtBQUNQLGlDQUFhO0FBQ1QsK0JBQU8sRUFBUDtxQkFESjtpQkFISyxDQUFiO2FBREosRUFEZ0I7Ozs7Z0RBV0ksZUFBZTtBQUNuQyxvQkFBUSxhQUFSO0FBQ0kscUJBQUssTUFBTDtBQUNJLDJCQUFPLEVBQVAsQ0FESjtBQURKLHFCQUdTLFdBQUw7QUFDSSwyQkFBTztBQUNILGlDQUFTLElBQVQ7QUFDQSw4QkFBTSxDQUFOO3FCQUZKLENBREo7QUFISixxQkFRUyxNQUFMO0FBQ0ksMkJBQU87QUFDSCxpQ0FBUyxJQUFUO3FCQURKLENBREo7QUFSSixxQkFZUyxrQkFBTDtBQUNJLDJCQUFPO0FBQ0gsdUNBQWUsSUFBZjtBQUNBLCtCQUFPLElBQVA7cUJBRkosQ0FESjtBQVpKLGFBRG1DOzs7O21DQW9CNUIsU0FBUztBQUNoQixnQkFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLFlBQVgsR0FBMEIsa0JBQU0sS0FBSyxLQUFMLENBQVcsWUFBWCxDQUFoQyxHQUEyRCxrQkFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQWpFLENBREs7QUFFaEIsbUJBQU8sUUFBUSxJQUFSLENBQVAsQ0FGZ0I7QUFHaEIsaUJBQUssUUFBTCxDQUFjO0FBQ1YsOEJBQWMsSUFBZDthQURKLEVBSGdCOzs7O3FDQU9QLFFBQVE7OztBQUNqQixpQkFBSyxVQUFMLENBQWdCLFVBQUMsSUFBRCxFQUFVO0FBQ3RCLG9CQUFJLEtBQUssU0FBTCxLQUFtQixNQUFuQixFQUEyQjtBQUMzQix3QkFBSSxjQUFjLFFBQUssUUFBTCxDQUFjLGlCQUFkLENBQWdDLE1BQWhDLENBQWQsQ0FEdUI7QUFFM0Isd0JBQUksZ0JBQWdCLFlBQVksUUFBWixDQUZPO0FBRzNCLDJCQUFPO0FBQ0gsbUNBQVcsTUFBWDtBQUNBLHdDQUFnQixRQUFLLHVCQUFMLENBQTZCLGFBQTdCLENBQWhCO3FCQUZKLENBSDJCO2lCQUEvQjtBQVFBLHVCQUFPLElBQVAsQ0FUc0I7YUFBVixDQUFoQixDQURpQjs7Ozs4Q0FhQyxXQUFXO0FBQzdCLGlCQUFLLFVBQUwsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIscUJBQUssY0FBTCxHQUFzQixTQUF0QixDQURzQjtBQUV0Qix1QkFBTyxJQUFQLENBRnNCO2FBQVYsQ0FBaEIsQ0FENkI7Ozs7eUNBTWhCLE1BQU07QUFDbkIsZ0JBQUksZ0JBQWdCLEtBQUssUUFBTCxDQUFjLGlCQUFkLENBQWdDLEtBQUssU0FBTCxDQUFoQyxDQUFnRCxRQUFoRCxDQUREO0FBRW5CLG9CQUFRLGFBQVI7QUFDQSxxQkFBSyxNQUFMO0FBQ0ksMkJBQU8sSUFBUCxDQURKO0FBREEscUJBR0ssTUFBTCxDQUhBO0FBSUEscUJBQUssV0FBTDtBQUNJLDJCQUFPLEtBQUssY0FBTCxDQUFvQixPQUFwQixLQUFnQyxJQUFoQyxDQURYO0FBSkEscUJBTUssa0JBQUw7QUFDSSwyQkFBTyxLQUFLLGNBQUwsQ0FBb0IsYUFBcEIsS0FBc0MsSUFBdEMsQ0FEWDtBQU5BLGFBRm1COzs7O3NDQVlULE1BQU07QUFDaEIsZ0JBQUksZ0JBQWdCLEtBQUssUUFBTCxDQUFjLGlCQUFkLENBQWdDLEtBQUssU0FBTCxDQUFoQyxDQUFnRCxRQUFoRCxDQURKO0FBRWhCLG9CQUFRLGFBQVI7QUFDSSxxQkFBSyxNQUFMO0FBQ0ksMkJBQU8sSUFBUCxDQURKO0FBREoscUJBR1MsV0FBTDtBQUNJLDJCQUFPLG9CQUFDLDhCQUFEO0FBQ0gsNkJBQU0sS0FBSyxTQUFMO0FBQ04scUNBQWMsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNkLHdDQUFpQixLQUFLLGNBQUw7QUFDakIsa0NBQVcsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUFnQyxJQUFoQyxDQUFYLEVBSkcsQ0FBUCxDQURKO0FBSEoscUJBU1MsTUFBTDtBQUNJLDJCQUFPLG9CQUFDLDBCQUFEO0FBQ0gsNkJBQU0sS0FBSyxTQUFMO0FBQ04scUNBQWMsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNkLHdDQUFpQixLQUFLLGNBQUw7QUFDakIsa0NBQVcsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUFnQyxJQUFoQyxDQUFYLEVBSkcsQ0FBUCxDQURKO0FBVEoscUJBZVMsa0JBQUw7QUFDSSwyQkFBTyxvQkFBQyxxQ0FBRDtBQUNILDZCQUFNLEtBQUssU0FBTDtBQUNOLHFDQUFjLEtBQUssS0FBTCxDQUFXLFdBQVg7QUFDZCx3Q0FBaUIsS0FBSyxjQUFMO0FBQ2pCLGtDQUFXLEtBQUsscUJBQUwsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FBWCxFQUpHLENBQVAsQ0FESjtBQWZKLGFBRmdCOzs7O2lDQXlCWDs7O0FBQ0wsZ0JBQUksS0FBSyxLQUFMLENBQVcsV0FBWCxLQUEyQixJQUEzQixFQUFpQztBQUNqQyx1QkFBTyw2Q0FBUCxDQURpQzthQUFyQztBQUdBLGdCQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsWUFBWCxJQUEyQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBSmpDO0FBS0wsbUJBQU87O2tCQUFLLFdBQVUsaUJBQVYsRUFBTDtnQkFDSDs7c0JBQUssV0FBVSxVQUFWLEVBQUw7b0JBQ00sS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixPQUF2QixDQUErQixHQUEvQixDQUFtQyxVQUFDLFdBQUQ7K0JBQ2pDOzt1Q0FBSyxXQUFZLFVBQVUsWUFBWSxFQUFaLEtBQW1CLEtBQUssU0FBTCxHQUFpQixTQUFwQyxHQUFnRCxFQUFoRCxDQUFWO0FBQ1oscUNBQU0sWUFBWSxFQUFaOytCQUNGLHVDQUFlO3VDQUFNLFFBQUssWUFBTCxDQUFrQixZQUFZLEVBQVo7NkJBQXhCLEVBRnhCOzRCQUdNLFlBQVksSUFBWjs7cUJBSjJCLENBRHpDO2lCQURHO2dCQVVIOztzQkFBSyxXQUFVLE1BQVYsRUFBTDtvQkFDSTs7MEJBQUssV0FBVSxVQUFWLEVBQUw7d0JBQ00sS0FBSyxhQUFMLENBQW1CLElBQW5CLENBRE47cUJBREo7b0JBSU0sS0FBSyxLQUFMLENBQVcsWUFBWCxHQUNJOzswQkFBSyxXQUFVLFNBQVYsRUFBTDt3QkFDRTs7dUNBQVEsTUFBSyxRQUFMO0FBQ0EsMkNBQVUsZ0JBQVY7K0JBQ0ksdUNBQWUsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQixJQUFwQixDQUFmLEVBRlo7NEJBR00sZUFBRSx3QkFBRixDQUhOO3lCQURGO3dCQU1FOzt1Q0FBUSxNQUFLLFFBQUw7QUFDQSwyQ0FBVSxpQkFBVjtBQUNBLDBDQUFXLENBQUMsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixDQUFEOytCQUNQLHVDQUFlLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixJQUFyQixDQUFmLEVBSFo7NEJBSU0sZUFBRSx1QkFBRixDQUpOO3lCQU5GO3FCQURKLEdBY0ksSUFkSjtpQkFkSDthQUFQLENBTEs7Ozs7V0EzSUE7RUFBdUIsTUFBTSxTQUFOOzs7Ozs7Ozs7Ozs7O0lDN1Y5QjtBQUNGLGFBREUsUUFDRixDQUFZLFFBQVosRUFBc0I7OEJBRHBCLFVBQ29COztBQUNsQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FEa0I7QUFFbEIsYUFBSyxNQUFMLEdBQWMsSUFBZCxDQUZrQjtBQUdsQixhQUFLLE1BQUwsR0FBYyxJQUFkLENBSGtCO0FBSWxCLGFBQUssTUFBTCxHQUFjLElBQWQsQ0FKa0I7QUFLbEIsYUFBSyxNQUFMLEdBQWMsSUFBZCxDQUxrQjtBQU1sQixhQUFLLE9BQUwsR0FBZSxJQUFmLENBTmtCO0FBT2xCLGFBQUssSUFBTCxHQUFZLEVBQVosQ0FQa0I7QUFRbEIsYUFBSyxXQUFMLEdBQW1CLFVBQW5CLENBUmtCO0FBU2xCLGFBQUssTUFBTCxHQUFjO0FBQ1Ysb0JBQVE7QUFDSiw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsb0NBQWY7YUFGSjtBQUlBLHFCQUFTO0FBQ0wsbUNBQW1CLFVBQW5CO0FBQ0EseUJBQVMsTUFBVDthQUZKO0FBSUEsa0JBQU07QUFDRixxQ0FBcUIsT0FBckI7YUFESjtBQUdBLHNCQUFVO0FBQ04sMkJBQVcsU0FBWDthQURKO0FBR0Esc0NBQTBCO0FBQ3RCLG9DQUFvQixPQUFwQjtBQUNBLGlDQUFpQixDQUFqQjthQUZKO0FBSUEsa0JBQU07QUFDRiw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsTUFBZjtBQUNBLDhCQUFjLFFBQWQ7QUFDQSw4QkFBYyxNQUFkO2FBSko7QUFNQSxrQkFBTTtBQUNGLDZCQUFhLE1BQWI7QUFDQSwrQkFBZSxNQUFmO0FBQ0EsOEJBQWMsUUFBZDtBQUNBLDhCQUFjLEtBQWQ7YUFKSjtBQU1BLGtCQUFNO0FBQ0YsNkJBQWEsTUFBYjtBQUNBLCtCQUFlLE1BQWY7QUFDQSw4QkFBYyxRQUFkO0FBQ0EsOEJBQWMsS0FBZDthQUpKO0FBTUEsb0JBQVE7QUFDSiw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsTUFBZjtBQUNBLDBCQUFVLFlBQVY7YUFISjtBQUtBLG9CQUFRO0FBQ0osNkJBQWEsTUFBYjtBQUNBLCtCQUFlLE1BQWY7QUFDQSwwQkFBVSxPQUFWO2FBSEo7QUFLQSx1QkFBVztBQUNQLGlDQUFpQixpQkFBakI7QUFDQSw2QkFBYSxNQUFiO0FBQ0EsK0JBQWUsTUFBZjtBQUNBLDBCQUFVLENBQVY7QUFDQSxrQ0FBa0IsS0FBbEI7QUFDQSxpQ0FBaUIsTUFBakI7QUFDQSw4QkFBYyxRQUFkO2FBUEo7QUFTQSxpQkFBSztBQUNELDBCQUFVLENBQVY7QUFDQSwyQkFBVyxDQUFYO2FBRko7QUFJQSxrQkFBTSxFQUFFLGNBQWMsQ0FBZCxFQUFpQixlQUFlLENBQWYsRUFBekI7QUFDQSx1QkFBVztBQUNQLDZCQUFhLE1BQWI7YUFESjtBQUdBLHVCQUFXO0FBQ1Asa0NBQWtCLEtBQWxCO2FBREo7QUFHQSwwQkFBYyxFQUFFLGNBQWMsTUFBZCxFQUFoQjtBQUNBLDJCQUFlLEVBQUUsY0FBYyxPQUFkLEVBQWpCO0FBQ0EsNEJBQWdCLEVBQUUsY0FBYyxRQUFkLEVBQWxCO0FBQ0Esc0RBQTBDO0FBQ3RDLDBCQUFVLGlCQUFWO2FBREo7U0F0RUosQ0FUa0I7QUFtRmxCLGFBQUssV0FBTCxHQW5Ga0I7S0FBdEI7O2lCQURFOztzQ0FzRlk7QUFDVixpQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLEtBQUssR0FBTCxFQUFVLEVBQUUsQ0FBRixFQUFLO0FBQzNCLHFCQUFLLFFBQUwsQ0FBYyxRQUFRLENBQVIsRUFBVyxPQUF6QixFQUFrQyxJQUFJLEdBQUosQ0FBbEMsQ0FEMkI7YUFBL0I7Ozs7aUNBS0ssVUFBVSxLQUFLLE9BQU87QUFDM0IsZ0JBQUksQ0FBQyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQUQsRUFBd0I7QUFDeEIscUJBQUssTUFBTCxDQUFZLFFBQVosSUFBd0IsRUFBeEIsQ0FEd0I7YUFBNUI7QUFHQSxpQkFBSyxNQUFMLENBQVksUUFBWixFQUFzQixHQUF0QixJQUE2QixLQUE3QixDQUoyQjtBQUszQixtQkFBTyxJQUFQLENBTDJCOzs7O2tDQU9yQixRQUFRO0FBQ2QsaUJBQUssTUFBTCxHQUFjLE1BQWQsQ0FEYztBQUVkLG1CQUFPLElBQVAsQ0FGYzs7OztrQ0FJUixRQUFRO0FBQ2QsaUJBQUssTUFBTCxHQUFjLE1BQWQsQ0FEYztBQUVkLG1CQUFPLElBQVAsQ0FGYzs7OztrQ0FJUixRQUFRO0FBQ2QsaUJBQUssTUFBTCxHQUFjLE1BQWQsQ0FEYztBQUVkLG1CQUFPLElBQVAsQ0FGYzs7OztrQ0FJUixRQUFRO0FBQ2QsaUJBQUssTUFBTCxHQUFjLE1BQWQsQ0FEYztBQUVkLG1CQUFPLElBQVAsQ0FGYzs7OzttQ0FJUCxTQUFTO0FBQ2hCLGlCQUFLLE9BQUwsR0FBZSxPQUFmLENBRGdCO0FBRWhCLG1CQUFPLElBQVAsQ0FGZ0I7Ozs7Z0NBSVosTUFBTTtBQUNWLGlCQUFLLElBQUwsR0FBWSxJQUFaLENBRFU7QUFFVixtQkFBTyxJQUFQLENBRlU7Ozs7dUNBSUMsYUFBYTtBQUN4QixpQkFBSyxXQUFMLEdBQW1CLFdBQW5CLENBRHdCO0FBRXhCLG1CQUFPLElBQVAsQ0FGd0I7Ozs7eUNBS1gsVUFBVSxNQUFNO0FBQzdCLGdCQUFJLFlBQVksT0FBTyxtQkFBUCxDQUEyQixJQUEzQixFQUFpQyxHQUFqQyxDQUFxQyxVQUFDLEdBQUQ7dUJBQVMsTUFBTSxJQUFOLEdBQWEsS0FBSyxHQUFMLENBQWIsR0FBeUIsSUFBekI7YUFBVCxDQUFqRCxDQUR5QjtBQUU3QixtQkFBTyxXQUFXLEtBQVgsR0FBbUIsVUFBVSxJQUFWLENBQWUsR0FBZixDQUFuQixHQUF5QyxJQUF6QyxDQUZzQjs7Ozt1Q0FJbEI7OztBQUNYLGdCQUFJLGFBQWEsT0FBTyxtQkFBUCxDQUEyQixLQUFLLE1BQUwsQ0FBM0IsQ0FBd0MsR0FBeEMsQ0FBNEMsVUFDeEQsUUFBRDt1QkFBYyxNQUFLLGdCQUFMLENBQXNCLFFBQXRCLEVBQWdDLE1BQUssTUFBTCxDQUFZLFFBQVosQ0FBaEM7YUFBZCxDQUNGLElBRjJELENBRXRELElBRnNELENBQTVDLENBQWIsQ0FETztBQUlYLG1CQUFPLFdBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFQLENBSlc7Ozs7cUNBTUY7QUFDVCxnQkFBSSxNQUFNLEtBQUssWUFBTCxFQUFOLENBREs7QUFFVCxnQkFBSSxTQUFTLEtBQUssTUFBTCxHQUFjLHVCQUF1QixLQUFLLE1BQUwsR0FBYyxNQUFyQyxHQUE4QyxFQUE1RCxDQUZKO0FBR1QsZ0JBQUksU0FBUyxLQUFLLE1BQUwsR0FBYyxTQUFTLEtBQUssTUFBTCxHQUFjLE9BQXZCLEdBQWlDLEVBQS9DLENBSEo7QUFJVCxnQkFBSSxTQUFTLEtBQUssTUFBTCxHQUFjLFNBQVMsS0FBSyxNQUFMLEdBQWMsT0FBdkIsR0FBaUMsRUFBL0MsQ0FKSjtBQUtULGdCQUFJLFNBQVMsS0FBSyxNQUFMLEdBQWMsU0FBUyxLQUFLLE1BQUwsR0FBYyxPQUF2QixHQUFpQyxFQUEvQyxDQUxKO0FBTVQsZ0JBQUksU0FBUyxNQUFDLElBQVUsTUFBVixJQUFvQixNQUFwQixJQUE4QixNQUE5QixHQUF3Qyw4QkFBekMsR0FBMEUsRUFBMUUsQ0FOSjtBQU9ULG1CQUFPLHNCQUNILGNBREcsR0FFQywwQkFGRCxHQUdDLFdBSEQsR0FHZSxHQUhmLEdBR3FCLGNBSHJCLEdBSUgsaUJBSkcsR0FLQyxNQUxELEdBTUMsTUFORCxHQU9DLE1BUEQsR0FRQyxNQVJELEdBU0MsTUFURCxHQVVDLEtBQUssSUFBTCxHQUNKLGdCQVhHLENBUEU7Ozs7K0JBcUJOO0FBQ0gsZ0JBQUksT0FBTyxLQUFLLFVBQUwsRUFBUCxDQUREO0FBRUgsZ0JBQUksVUFBVSxLQUFLLE9BQUwsS0FBaUIsS0FBSyxXQUFMLEtBQXFCLFVBQXJCLEdBQWtDLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixDQUFsQyxHQUFxRCxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsQ0FBUixFQUFXLEVBQVgsQ0FBckQsQ0FBakIsQ0FGWDtBQUdILGdCQUFJLFlBQVksU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQ2xDLDZCQUFhLEtBQUssV0FBTDtBQUNiLHlCQUFTO0FBQ0wseUJBQVEsS0FBSyxLQUFMLENBQVcsUUFBUSxDQUFSLElBQWEsTUFBYixDQUFYLENBQWdDLFFBQWhDLEVBQVI7QUFDQSwyQkFBUSxLQUFLLEtBQUwsQ0FBVyxRQUFRLENBQVIsSUFBYSxNQUFiLENBQVgsQ0FBZ0MsUUFBaEMsRUFBUjtBQUNBLDRCQUFRLEtBQUssS0FBTCxDQUFXLFFBQVEsQ0FBUixJQUFhLE1BQWIsQ0FBWCxDQUFnQyxRQUFoQyxFQUFSO0FBQ0EsMEJBQVEsS0FBSyxLQUFMLENBQVcsUUFBUSxDQUFSLElBQWEsTUFBYixDQUFYLENBQWdDLFFBQWhDLEVBQVI7aUJBSko7YUFGWSxDQUFaLENBSEQ7QUFZSCxtQkFBTyxTQUFQLEVBQWtCLEtBQUssUUFBTCxDQUFsQixDQVpHOzs7O1dBL0pMOzs7QUFnTEMsSUFBSSxzQkFBTyxTQUFQLElBQU8sQ0FBQyxFQUFEO1dBQVEsSUFBSSxRQUFKLENBQWEsRUFBYjtDQUFSOzs7Ozs7Ozs7Ozs7O1FDaExGOzs7O0FBQVQsU0FBUyxLQUFULENBQWUsR0FBZixFQUFvQjtBQUN2QixRQUFJLFFBQU8saURBQVAsS0FBZSxRQUFmLEVBQXlCO0FBQ3pCLGVBQU8sR0FBUCxDQUR5QjtLQUE3QjtBQUdBLFdBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFYLENBQVAsQ0FKdUI7Q0FBcEI7O0lBT0Q7QUFDRixhQURFLFlBQ0YsR0FBYzs4QkFEWixjQUNZOztBQUNWLGFBQUssTUFBTCxHQUFjLENBQWQsQ0FEVTtLQUFkOztpQkFERTs7NEJBSUUsR0FBRyxHQUFHO0FBQ04sZ0JBQUksS0FBSyxNQUFMLEtBQWdCLENBQWhCLEVBQW1CO0FBQ25CLG9CQUFJLElBQUksQ0FBSixFQUFPO0FBQ1AseUJBQUssTUFBTCxHQUFjLENBQUMsQ0FBRCxDQURQO2lCQUFYLE1BRU8sSUFBSSxJQUFJLENBQUosRUFBTztBQUNkLHlCQUFLLE1BQUwsR0FBYyxDQUFkLENBRGM7aUJBQVg7YUFIWDtBQU9BLG1CQUFPLElBQVAsQ0FSTTs7Ozs4QkFVSjtBQUNGLG1CQUFPLEtBQUssTUFBTCxDQURMOzs7O1dBZEo7OztBQW1CQyxJQUFJLDhCQUFXLFNBQVgsUUFBVztXQUFNLElBQUksWUFBSjtDQUFOOzs7Ozs7Ozs7Ozs7QUN4QmYsSUFBSSw2QkFBSjtBQUNBLElBQUksa0NBQWEsK0JBQWI7Ozs7Ozs7O1FDSEs7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDaEMsYUFBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLEVBQWpDLEVBQXFDO0FBQ2pDLFlBQUksSUFBSSxJQUFJLEdBQUosQ0FEeUI7QUFFakMsWUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFJLEVBQUosQ0FBWCxLQUF1QixDQUF2QixFQUEwQjtBQUMxQixtQkFBTyxFQUFQLENBRDBCO1NBQTlCO0FBR0EsWUFBSSxJQUFJLEVBQUosS0FBVyxDQUFYLEVBQWM7QUFDZCxtQkFBTyxFQUFQLENBRGM7U0FBbEI7QUFHQSxZQUFJLElBQUksRUFBSixJQUFVLENBQVYsSUFBZSxJQUFJLEVBQUosS0FBVyxDQUFYLEVBQWM7QUFDN0IsbUJBQU8sRUFBUCxDQUQ2QjtTQUFqQztBQUdBLGVBQU8sRUFBUCxDQVhpQztLQUFyQzs7QUFjQSxRQUFJLFVBQVU7QUFDVixpQkFBUztBQUNMLHNCQUFVO0FBQ04seUJBQVMsZUFBQyxPQUFELEVBQVUsSUFBVjsyQkFBbUI7OzBCQUFLLFdBQVUsT0FBVixFQUFMO3dCQUN4Qjs7OzRCQUFHOzs7O2dDQUFjLE9BQWQ7NkJBQUg7O3lCQUR3Qjt3QkFFeEI7Ozs7eUJBRndCO3dCQUd4Qjs7Ozt5QkFId0I7d0JBSXhCOzs7OzRCQUFxQjs7a0NBQUcsTUFBSyx3QkFBTCxFQUE4QixRQUFPLFFBQVAsRUFBakM7OzZCQUFyQjt5QkFKd0I7O2lCQUFuQjtBQU1ULCtDQUErQixrRUFBL0I7QUFDQSwwQ0FBMEIsc0VBQTFCO0FBQ0EsOENBQThCLHFEQUE5QjtBQUNBLGdDQUFnQixtQ0FBaEI7QUFDQSxzQ0FBc0I7OztvQkFDbEI7Ozt3QkFBRzs7Ozt5QkFBSDtxQkFEa0I7b0JBRWxCOzs7O3FCQUZrQjtvQkFLbEI7Ozs7cUJBTGtCO2lCQUF0QjthQVhKO0FBa0JBLDRCQUFnQjtBQUNaLDhCQUFjLFlBQWQ7QUFDQSxzQ0FBc0IsdUJBQXRCO0FBQ0EseUJBQVMsUUFBVDtBQUNBLG1DQUFtQiw4QkFBbkI7QUFDQSx5QkFBUyxnQkFBVDtBQUNBLCtCQUFlLGVBQWY7QUFDQSw2QkFBYSxpQkFBYjtBQUNBLDZCQUFhLGlCQUFiO0FBQ0EsNkJBQWEsbUJBQWI7QUFDQSx5QkFBUyxTQUFUO0FBQ0Esd0JBQVEsRUFBUjtBQUNBLDZCQUFhLG1CQUFiO0FBQ0EsNkJBQWEsaUNBQWI7YUFiSjtBQWVBLHVCQUFXO0FBQ1AsNEJBQVksZUFBWjtBQUNBLG1DQUFtQixzQkFBbkI7QUFDQSw2Q0FBNkIsa0JBQTdCO0FBQ0Esa0NBQWtCLHFCQUFsQjtBQUNBLDZCQUFhLGdCQUFiO0FBQ0EsbUNBQW1CLG9CQUFuQjtBQUNBLDRCQUFZLGNBQVo7QUFDQSxpQ0FBaUIsZUFBakI7QUFDQSw4QkFBYyxlQUFkO0FBQ0EsZ0NBQWdCLGVBQWhCO0FBQ0EsZ0NBQWdCLG1CQUFoQjtBQUNBLDBCQUFVLGdCQUFWO0FBQ0EsMEJBQVUsZUFBVjtBQUNBLHVDQUF1Qiw4QkFBdkI7QUFDQSw2QkFBYSxzQkFBYjtBQUNBLG1DQUFtQiw4QkFBbkI7QUFDQSxrQ0FBa0IscUNBQWxCO0FBQ0Esa0NBQWtCLHlCQUFsQjtBQUNBLHlDQUF5QiwyQkFBekI7QUFDQSxpQ0FBaUIsWUFBakI7QUFDQSxtQ0FBbUIsaUJBQW5CO0FBQ0EsOEJBQWMsc0JBQWQ7YUF0Qko7QUF3QkEsd0JBQVk7QUFDUiwrQkFBZSw0Q0FBZjtBQUNBLHNDQUFzQixtREFBdEI7QUFDQSxxQ0FBcUIsaURBQXJCO0FBQ0EsZ0NBQWdCLDhDQUFoQjtBQUNBLHNDQUFzQixrREFBdEI7QUFDQSxrQ0FBa0IsZ0RBQWxCO0FBQ0EsK0JBQWUsMkNBQWY7QUFDQSxtQ0FBbUIsa0VBQW5CO0FBQ0Esa0NBQWtCLDJEQUFsQjtBQUNBLG1DQUFtQiwyRkFBbkI7YUFWSjtBQVlBLHVCQUFXO0FBQ1AseUJBQVMsYUFBVDtBQUNBLGdDQUFnQix1QkFBaEI7QUFDQSxzQ0FBc0IsdUNBQXRCO0FBQ0EseUJBQVMsaUJBQVQ7QUFDQSxvQ0FBb0Isb0JBQXBCO0FBQ0EsK0JBQWUsd0NBQWY7QUFDQSxpQ0FBaUIsa0JBQWpCO0FBQ0Esb0NBQW9CLHNCQUFwQjtBQUNBLG9DQUFvQix3QkFBcEI7QUFDQSwrQ0FBK0Isd0JBQS9CO0FBQ0Esc0NBQXNCLHVCQUF0QjtBQUNBLHVDQUF1Qix5QkFBdkI7QUFDQSwyQ0FBMkIsMkJBQTNCO0FBQ0EscUNBQXFCLG9DQUFyQjtBQUNBLHNDQUFzQix1QkFBdEI7QUFDQSwwQ0FBMEIseUJBQTFCO0FBQ0EscUNBQXFCLDZDQUFyQjtBQUNBLHVDQUF1Qix1QkFBdkI7QUFDQSxzQ0FBc0Isc0NBQXRCO0FBQ0Esc0NBQXNCLHVCQUF0QjtBQUNBLGlDQUFpQixrQkFBakI7QUFDQSwwQkFBVSxtQkFBVjtBQUNBLHFDQUFxQixvQkFBckI7QUFDQSxtQ0FBbUIscUJBQW5CO0FBQ0EsMkNBQTJCLHdCQUEzQjtBQUNBLGdDQUFnQixnQkFBaEI7QUFDQSxrQ0FBa0Isb0JBQWxCO0FBQ0EsOEJBQWMsZ0JBQWQ7QUFDQSw4QkFBYyxtQkFBZDtBQUNBLGdDQUFnQixpQkFBaEI7QUFDQSxtQ0FBbUIseUJBQW5CO0FBQ0Esa0NBQWtCLHlCQUFsQjthQWhDSjtBQWtDQSxzQkFBVTtBQUNOLHlCQUFTLE9BQVQ7QUFDQSxvQ0FBb0IsaUJBQXBCO0FBQ0Esb0NBQW9CLDJCQUFwQjtBQUNBLDhCQUFjLFlBQWQ7QUFDQSxxQ0FBcUIsb0NBQXJCO0FBQ0EsK0JBQWUsWUFBZjtBQUNBLGtDQUFrQix3QkFBbEI7QUFDQSxzQ0FBc0IscUJBQXRCO0FBQ0EsaUNBQWlCLDBCQUFqQjtBQUNBLDZDQUE2Qiw2Q0FBN0I7QUFDQSx5Q0FBeUIsaUNBQXpCO0FBQ0EsK0NBQStCLDRCQUEvQjtBQUNBLGtDQUFrQiwwQkFBbEI7QUFDQSwwQkFBVSxPQUFWO0FBQ0EscUNBQXFCLGtCQUFyQjtBQUNBLHFDQUFxQix5QkFBckI7QUFDQSxnQ0FBZ0IsV0FBaEI7QUFDQSw4QkFBYyw0Q0FBZDtBQUNBLHdCQUFRLG1CQUFSO0FBQ0EsdUNBQXVCLCtCQUF2QjtBQUNBLGdDQUFnQiw4QkFBaEI7QUFDQSx1QkFBTyxLQUFQO0FBQ0EseUJBQVMsTUFBVDthQXZCSjtBQXlCQSx3QkFBWTtBQUNSLG9DQUFvQixrQ0FBcEI7YUFESjtBQUdBLG9CQUFRO0FBQ0osc0NBQXNCLHVCQUF0QjtBQUNBLHNDQUFzQix1QkFBdEI7QUFDQSxpQ0FBaUIsa0JBQWpCO0FBQ0EsZ0NBQWdCLG9CQUFoQjtBQUNBLDJDQUEyQix3QkFBM0I7QUFDQSxzQ0FBc0IseUJBQXRCO0FBQ0EsaUNBQWlCLG9CQUFqQjtBQUNBLHVDQUF1Qix5QkFBdkI7QUFDQSxnQ0FBZ0IsbUJBQWhCO0FBQ0EsOEJBQWMsZ0JBQWQ7YUFWSjtBQVlBLHVCQUFXO0FBQ1Asa0NBQWtCOzJCQUFLLEVBQUUsUUFBRixLQUFlLFdBQWYsR0FBNkIsYUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCLElBQXpCLENBQTdCO2lCQUFMO0FBQ2xCLCtCQUFlLHFCQUFDLENBQUQsRUFBSSxDQUFKOzJCQUFVLEVBQUUsUUFBRixLQUFlLFlBQWYsR0FBOEIsYUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCLElBQXpCLENBQTlCLElBQWdFLElBQUksQ0FBSixXQUFjLGdCQUFZLGFBQWEsQ0FBYixFQUFnQixJQUFoQixFQUFzQixJQUF0QixFQUE0QixJQUE1QixPQUExQixHQUFrRSxFQUFsRSxDQUFoRTtpQkFBVjtBQUNmLHFDQUFxQiwyQkFBQyxDQUFELEVBQUksQ0FBSjsyQkFBVSxFQUFFLFFBQUYsS0FBZSxZQUFmLEdBQThCLGFBQWEsQ0FBYixFQUFnQixFQUFoQixFQUFvQixHQUFwQixFQUF5QixJQUF6QixDQUE5QixJQUFnRSxJQUFJLENBQUosV0FBYyxZQUFkLEdBQTBCLEVBQTFCLENBQWhFO2lCQUFWO0FBQ3JCLHdDQUF3QjsyQkFBSyxXQUFXLENBQVgsR0FBZSxXQUFmLEdBQTZCLGFBQWEsQ0FBYixFQUFnQixFQUFoQixFQUFvQixHQUFwQixFQUF5QixJQUF6QixDQUE3QjtpQkFBTDthQUo1QjtBQU1BLDRCQUFnQjtBQUNaLDhCQUFjLFlBQWQ7QUFDQSx5QkFBUyxRQUFUO0FBQ0EsNkJBQWEsaUJBQWI7QUFDQSw2QkFBYSxpQkFBYjtBQUNBLDZCQUFhLG1CQUFiO0FBQ0Esc0NBQXNCLHVCQUF0QjthQU5KO1NBdEpKO0FBK0pBLGtCQUFVO0FBQ04scUJBQVM7QUFDTCxxQ0FBcUIsNEJBQXJCO2FBREo7QUFHQSxtQkFBTztBQUNILDBDQUEwQix1REFBMUI7QUFDQSxpQ0FBaUIsdUJBQUMsTUFBRDsyQkFBWSx5QkFBeUIsTUFBekIsR0FBa0MsYUFBbEM7aUJBQVo7YUFGckI7QUFJQSxvQkFBUTtBQUNKLDRDQUE0Qix5REFBNUI7YUFESjtBQUdBLDJCQUFlO0FBQ1gsb0NBQW9CLHlFQUFwQjthQURKO0FBR0EsZ0NBQW9CO0FBQ2hCLGtDQUFrQix3QkFBQyxDQUFEOzJCQUFPLENBQUMsaUNBQUQsb0JBQW9ELHFEQUFwRDtpQkFBUDtBQUNsQiw0Q0FBNEIsK0RBQTVCO2FBRko7QUFJQSwwQkFBYztBQUNWLHFEQUFxQyxtRkFBckM7QUFDQSw0Q0FBNEIsc0RBQTVCO0FBQ0EscUNBQXFCLGdEQUFyQjthQUhKO0FBS0EsZ0NBQW9CO0FBQ2hCLHlDQUF5Qiw4REFBekI7QUFDQSxzQ0FBc0IsNkVBQXRCO0FBQ0EsbUNBQW1CLHlCQUFDLElBQUQ7MkJBQVUsT0FBTywrQ0FBUDtpQkFBVjthQUh2QjtBQUtBLHNCQUFVO0FBQ04seUNBQXlCLENBQUMsbUJBQUQsRUFBc0IsK0JBQXRCLENBQXpCO2FBREo7QUFHQSxxQkFBUztBQUNMLDJDQUEyQixrRkFBM0I7YUFESjtBQUdBLDJCQUFlO0FBQ1gsK0NBQStCLHdGQUEvQjthQURKO0FBR0EsbUJBQU87QUFDSCxtREFBbUMsMERBQW5DO2FBREo7QUFHQSxxQkFBUztBQUNMLG1DQUFtQix1REFBbkI7QUFDQSw0Q0FBNEIsb0RBQTVCO2FBRko7QUFJQSxvQkFBUTtBQUNKLHdDQUF3QixzREFBeEI7QUFDQSxvQ0FBb0IseUNBQXBCO0FBQ0EsOENBQThCLGlFQUE5QjtBQUNBLGtDQUFrQiw2Q0FBbEI7QUFDQSx3Q0FBd0IsNENBQXhCO0FBQ0EsMENBQTBCLHdDQUExQjtBQUNBLHFDQUFxQiwyQkFBQyxDQUFEOzJCQUFPLENBQUMsMENBQUQsa0JBQTJELHdCQUEzRDtpQkFBUDtBQUNyQixxQ0FBcUIsNENBQXJCO0FBQ0EsZ0NBQWdCLCtDQUFoQjtBQUNBLDJDQUEyQixtREFBM0I7QUFDQSxzQ0FBc0IsMENBQXRCO0FBQ0EsbUNBQW1CLDJDQUFuQjtBQUNBLG9DQUFvQixtR0FBcEI7YUFiSjtTQTVDSjtBQTREQSxrQkFBVTtBQUNOLHVCQUFXO0FBQ1AsdUJBQU8sVUFBUDtBQUNBLHlCQUFTLFNBQVQ7QUFDQSxnQ0FBZ0IsV0FBaEI7QUFDQSx3QkFBUSxlQUFSO0FBQ0EsMEJBQVUsU0FBVjtBQUNBLDJCQUFXLFVBQVg7QUFDQSx3QkFBUSxXQUFSO0FBQ0Esd0JBQVEsV0FBUjtBQUNBLDhCQUFjLGFBQWQ7QUFDQSwwQkFBVSxXQUFWO2FBVko7QUFZQSxzQkFBVTtBQUNOLDBCQUFVLFVBQVY7QUFDQSw4QkFBYyxvQkFBZDtBQUNBLHNDQUFzQixrQkFBdEI7QUFDQSx1QkFBTyxJQUFQO0FBQ0Esc0JBQU0sS0FBTjthQUxKO0FBT0Esd0JBQVk7QUFDUixvQ0FBb0Isa0NBQXBCO0FBQ0EsZ0NBQWdCLFFBQWhCO0FBQ0EsMkJBQVcsNEJBQVg7YUFISjtBQUtBLHVCQUFXO0FBQ1AsMEJBQVUsZ0JBQUMsQ0FBRDsyQkFBTyxZQUFZLEVBQUUsUUFBRixFQUFaO2lCQUFQO0FBQ1YsMkJBQVcsaUJBQUMsQ0FBRDsyQkFBTyxxQkFBcUIsRUFBRSxRQUFGLEVBQXJCO2lCQUFQO0FBQ1gsaUNBQWlCLHVCQUFDLENBQUQsRUFBSSxJQUFKLEVBQVUsSUFBVjsyQkFDWixPQUFPLENBQVAsR0FDSyxlQUFlLEVBQUUsUUFBRixFQUFmLElBQStCLE9BQU8sT0FBTyxJQUFQLEdBQWMsRUFBckIsQ0FBL0IsR0FDQSxDQUFDLFNBQVMsQ0FBVCxHQUNHLFFBREgsR0FFRyxZQUZILENBQUQsR0FHRSxFQUFFLFFBQUYsRUFIRjtpQkFITzthQUhyQjtTQXpCSjtBQXNDQSxtQkFBVztBQUNQLHVCQUFXO0FBQ1AsaUNBQWlCLGVBQWpCO0FBQ0EsMkNBQTJCLFVBQTNCO0FBQ0EsNkJBQWEsaUJBQWI7QUFDQSxpQ0FBaUIsZ0JBQWpCO0FBQ0EsNENBQTRCLE9BQTVCO0FBQ0EsaUNBQWlCLG1CQUFqQjtBQUNBLDhCQUFjLFlBQWQ7QUFDQSw2QkFBYSxnQkFBYjthQVJKO0FBVUEsd0JBQVk7QUFDUixpQ0FBaUIsa0RBQWpCO0FBQ0EsNkJBQWEsK0NBQWI7QUFDQSxnQ0FBZ0Isc0VBQWhCO0FBQ0EsaUNBQWlCLDRDQUFqQjtBQUNBLDZCQUFhLDhDQUFiO2FBTEo7QUFPQSx1QkFBVztBQUNQLHVDQUF1Qix5Q0FBdkI7YUFESjtBQUdBLHNCQUFVO0FBQ04sb0NBQW9CLGdCQUFwQjtBQUNBLDRCQUFZLFNBQVo7QUFDQSw4QkFBYyxZQUFkO0FBQ0Esd0JBQVEsTUFBUjtBQUNBLDZCQUFhLGVBQWI7QUFDQSx3QkFBUSxPQUFSO0FBQ0EsNkJBQWEsT0FBYjtBQUNBLDBCQUFVLEdBQVY7QUFDQSw2QkFBYSxNQUFiO0FBQ0Esb0NBQW9CLFVBQXBCO0FBQ0EsNkJBQWEsR0FBYjtBQUNBLCtCQUFlLGNBQWY7YUFaSjtTQXJCSjtBQW9DQSxrQkFBVTtBQUNOLG9CQUFRO0FBQ0osd0JBQVEsZ0JBQVI7QUFDQSx3QkFBUSxPQUFSO0FBQ0EsK0JBQWUsWUFBZjthQUhKO0FBS0EsMkJBQWU7QUFDWCwwQkFBVSxTQUFWO0FBQ0Esd0JBQVEsTUFBUjtBQUNBLHdCQUFRLHlDQUFSO0FBQ0EsbUNBQW1CLFdBQW5CO0FBQ0EsbUNBQW1CLFVBQW5CO0FBQ0Esd0JBQVEsVUFBUjtBQUNBLDZCQUFhLG1CQUFiO2FBUEo7QUFTQSxxQ0FBeUI7QUFDckIsOEJBQWMsWUFBZDtBQUNBLHVDQUF1QixRQUF2QjtBQUNBLHNDQUFzQixjQUF0QjtBQUNBLHdCQUFRLFVBQVI7QUFDQSxzQkFBTSxXQUFOO0FBQ0Esd0JBQVEsS0FBUjtBQUNBLGdDQUFnQixVQUFoQjthQVBKO0FBU0EsMEJBQWM7QUFDVixxQ0FBcUIsT0FBckI7QUFDQSwrQkFBZSxZQUFmO0FBQ0Esd0JBQVEscUJBQVI7QUFDQSxzQkFBTSxXQUFOO2FBSko7QUFNQSxnQ0FBb0I7QUFDaEIseUJBQVM7QUFDTCxrQ0FBYyxHQUFkO0FBQ0EsbUNBQWUsR0FBZjtBQUNBLGtDQUFjLElBQWQ7QUFDQSxrQ0FBYyxLQUFkO2lCQUpKO0FBTUEsZ0NBQ0k7O3NCQUFPLFdBQVUsT0FBVixFQUFQO29CQUF5Qjs7O3dCQUFPOzs7NEJBQzVCOztrQ0FBSSxXQUFVLE1BQVYsRUFBSjs7NkJBRDRCOzRCQUU1Qjs7a0NBQUksV0FBVSxNQUFWLEVBQUo7OzZCQUY0Qjs0QkFHNUI7O2tDQUFJLFdBQVUsTUFBVixFQUFKOzs2QkFINEI7NEJBSTVCOztrQ0FBSSxXQUFVLE1BQVYsRUFBSjs7NkJBSjRCO3lCQUFQO3FCQUF6QjtpQkFESjthQVBKO0FBZ0JBLHFCQUFTO0FBQ0wsNEJBQVksV0FBWjtBQUNBLCtCQUFlLFFBQWY7QUFDQSx3QkFBUSxVQUFSO0FBQ0EsMEJBQVUsT0FBVjtBQUNBLHdCQUFRLGtCQUFSO0FBQ0Esb0NBQW9CLFdBQXBCO0FBQ0Esc0JBQU0sV0FBTjthQVBKO0FBU0EsMkJBQWU7QUFDWCxvQ0FBb0IsZ0JBQXBCO0FBQ0EscUNBQXFCLGlCQUFyQjtBQUNBLDhCQUFjLFFBQWQ7QUFDQSw4QkFBYyxZQUFkO0FBQ0EsNkJBQWEsTUFBYjtBQUNBLDZCQUFhLE9BQWI7QUFDQSwyQkFBVyxTQUFYO0FBQ0EsbUNBQW1CLFlBQW5CO0FBQ0EsOEJBQWMsS0FBZDtBQUNBLDBCQUFVLEtBQVY7QUFDQSw0QkFBWSxHQUFaO0FBQ0EsNEJBQVksR0FBWjtBQUNBLGdDQUFnQixxQkFBaEI7QUFDQSxrQ0FBa0IsMkJBQWxCO0FBQ0EsNkJBQWEsU0FBYjtBQUNBLHdCQUFRLFVBQVI7QUFDQSwwQkFBVSxPQUFWO0FBQ0EsNEJBQVksV0FBWjtBQUNBLDZCQUFhLFdBQWI7QUFDQSw2QkFBYSxZQUFiO0FBQ0EsMkNBQTJCLE1BQTNCO0FBQ0EsZ0NBQWdCLE1BQWhCO0FBQ0EsZ0NBQWdCLE1BQWhCO0FBQ0EsaUNBQWlCLGNBQWpCO0FBQ0EsdUJBQU8sTUFBUDthQXpCSjtBQTJCQSx1QkFBVztBQUNQLCtCQUFlLGNBQWY7QUFDQSx3QkFBUSxvQkFBUjthQUZKO0FBSUEsb0JBQVE7QUFDSixtQ0FBbUIseUJBQW5CO0FBQ0EsZ0NBQWdCLGVBQWhCO0FBQ0Esd0JBQVEsZUFBUjtBQUNBLGdDQUFnQixjQUFoQjtBQUNBLHlDQUF5QixxQkFBekI7QUFDQSx1Q0FBdUIsbUJBQXZCO2FBTko7U0F0Rko7QUErRkEsMkJBQW1CO0FBQ2YsdUJBQVc7QUFDUCw4QkFBYyxxQkFBZDtBQUNBLCtCQUFlLGFBQWY7YUFGSjtBQUlBLHVCQUFXO0FBQ1AsOEJBQWMsWUFBZDtBQUNBLHdCQUFRLE9BQVI7QUFDQSwwQkFBVSxrQkFBVjtBQUNBLHdCQUFRLEtBQVI7YUFKSjtBQU1BLHNCQUFVO0FBQ04seUJBQVMsT0FBVDtBQUNBLHdCQUFRLE9BQVI7YUFGSjtTQVhKO0FBZ0JBLHFCQUFhO0FBQ1QsdUJBQVc7QUFDUCx5QkFBUyxpQkFBVDtBQUNBLHlCQUFTLFFBQVQ7QUFDQSx3QkFBUSxZQUFSO0FBQ0EsMEJBQVUsT0FBVjtBQUNBLHdCQUFRLFdBQVI7QUFDQSwyQkFBVyxZQUFYO2FBTko7QUFRQSxzQkFBVTtBQUNOLDhCQUFjLFlBQWQ7QUFDQSx1Q0FBdUIsUUFBdkI7QUFDQSxzQ0FBc0IsT0FBdEI7QUFDQSxrQ0FBa0Isb0JBQWxCO0FBQ0EseUJBQVMsT0FBVDtBQUNBLHdCQUFRLEtBQVI7YUFOSjtTQVRKO0FBa0JBLG1CQUFXO0FBQ1Asc0JBQVU7QUFDTixpQ0FBaUIsK0NBQWpCO2FBREo7QUFHQSx1QkFBVztBQUNQLHlCQUFTLFFBQVQ7QUFDQSwrQkFBZSxvQkFBZjtBQUNBLGdDQUFnQixtQkFBaEI7YUFISjtTQUpKO0FBVUEsc0JBQWM7QUFDVix1QkFBVztBQUNQLHNDQUFzQix1Q0FBdEI7QUFDQSwrQkFBZSxvQkFBZjthQUZKO0FBSUEsd0JBQVk7QUFDUixtQ0FBbUIsMkJBQW5CO0FBQ0EsZ0RBQWdDLHNDQUFDLElBQUQ7MkJBQVU7Ozs7d0JBRXRDOzs4QkFBRyxNQUFPLElBQVAsRUFBSDs0QkFBbUIsSUFBbkI7eUJBRnNDOztpQkFBVjthQUZwQztBQU9BLHFCQUFTO0FBQ0wsaUNBQWlCLGVBQWpCO0FBQ0EsNkJBQWEsU0FBYjtBQUNBLDBCQUFVLE9BQVY7QUFDQSxtQ0FBbUIsaUJBQW5CO2FBSko7U0FaSjtBQW1CQSxrQkFBVTtBQUNOLHNCQUFVO0FBQ04sMENBQTBCLDREQUExQjthQURKO0FBR0EsdUJBQVc7QUFDUCxpQ0FBaUIsb0JBQWpCO0FBQ0EsZ0RBQWdDLDJDQUFoQztBQUNBLDZCQUFhLGFBQWI7QUFDQSxpQ0FBaUIscUJBQWpCO0FBQ0EsNkJBQWEsNkJBQWI7QUFDQSw2QkFBYSxhQUFiO0FBQ0EsbUNBQW1CLE9BQW5CO0FBQ0EsbUNBQW1CLE9BQW5CO0FBQ0Esa0NBQWtCLE1BQWxCO0FBQ0EsNkJBQWEsZUFBYjtBQUNBLDRDQUE0QiwyQ0FBNUI7QUFDQSxpQ0FBaUIsWUFBakI7YUFaSjtBQWNBLHdCQUFZO0FBQ1IsaUNBQWlCLGtEQUFqQjtBQUNBLGdEQUFnQyw4RUFBaEM7QUFDQSw2QkFBYSw4Q0FBYjtBQUNBLDRDQUE0QixvREFBNUI7YUFKSjtBQU1BLHVCQUFXO0FBQ1AsMEJBQVUsZ0JBQUMsQ0FBRDsyQkFBTyxrQkFBa0IsSUFBSSxDQUFKLENBQWxCO2lCQUFQO0FBQ1Ysd0JBQVEsT0FBUjtBQUNBLDZCQUFhLFNBQWI7QUFDQSwrQkFBZSxVQUFmO2FBSko7QUFNQSx3QkFBWTtBQUNSLDBDQUEwQixnREFBMUI7QUFDQSwyQ0FBMkIsa0NBQTNCO0FBQ0Esb0NBQW9CLDJCQUFwQjtBQUNBLGtDQUFrQixjQUFsQjthQUpKO0FBTUEscUJBQVM7QUFDTCw4QkFBYyxZQUFkO0FBQ0EsMkJBQVcsVUFBWDtBQUNBLHlCQUFTLE9BQVQ7QUFDQSx5QkFBUyxRQUFUO0FBQ0EsMkJBQVcsWUFBWDthQUxKO1NBcENKOztBQTZDQSwyQkFBbUI7QUFDZix1QkFBVztBQUNQLDBCQUFVO0FBQ04sa0NBQWM7QUFDVixxQ0FBYSxlQUFiO3FCQURKO0FBR0EsbUNBQWU7QUFDWCxzQ0FBYyxZQUFkO0FBQ0Esd0NBQWdCLHNCQUFoQjtBQUNBLHVDQUFlLFlBQWY7QUFDQSxzQ0FBYyxxQkFBZDtBQUNBLHNDQUFjLG9CQUFkO0FBQ0EsMENBQWtCLGNBQWxCO0FBQ0EseUNBQWlCLGFBQWpCO0FBQ0EsK0NBQXVCLHVCQUF2QjtBQUNBLDZDQUFxQixxQkFBckI7QUFDQSxrQ0FBVSxvQ0FBVjtBQUNBLG9DQUFZLHNDQUFaO0FBQ0Esc0NBQWMsbUJBQWQ7QUFDQSxrQ0FBVSxRQUFWO0FBQ0EsMENBQWtCLHVCQUFsQjtxQkFkSjtBQWdCQSw4QkFBVTtBQUNOLHVDQUFlLGNBQWY7cUJBREo7QUFHQSxrQ0FBYztBQUNWLCtDQUF1QiwwQkFBdkI7QUFDQSxzQ0FBYyxNQUFkO0FBQ0EsOENBQXNCLHVCQUF0QjtBQUNBLDhCQUFNLElBQU47QUFDQSx3Q0FBZ0Isa0JBQWhCO0FBQ0EsOENBQXNCLG1CQUF0QjtBQUNBLG9DQUFZLEtBQVo7QUFDQSx1Q0FBZSxJQUFmO0FBQ0EsNENBQW9CLElBQXBCO0FBQ0EseUNBQWlCLEtBQWpCO3FCQVZKO0FBWUEsa0NBQWM7QUFDVixzQ0FBYyxlQUFkO0FBQ0Esc0NBQWMsb0JBQUMsQ0FBRDttQ0FBTyxjQUFjLEVBQUUsUUFBRixFQUFkO3lCQUFQO0FBQ2Qsa0NBQVUsY0FBVjtxQkFISjtpQkFuQ0o7QUF5Q0EsMkJBQVc7QUFDUCxpQ0FBYTtBQUNULDZCQUFLLEdBQUw7QUFDQSxrQ0FBVSxnQkFBQyxDQUFEO21DQUFPLE1BQU0sRUFBRSxRQUFGLEVBQU47eUJBQVA7QUFDViw4QkFBTSxJQUFOO0FBQ0EsNkJBQUssR0FBTDtBQUNBLDhCQUFNLElBQU47QUFDQSw4QkFBTSxJQUFOO0FBQ0EsOEJBQU0sR0FBTjtBQUNBLDhCQUFNLEtBQU47QUFDQSw4QkFBTSxLQUFOO0FBQ0EsNkJBQUssSUFBTDtBQUNBLDZCQUFLLElBQUw7QUFDQSw2QkFBSyxHQUFMO0FBQ0EsOEJBQU0sSUFBTjtBQUNBLDZCQUFLLEdBQUw7cUJBZEo7QUFnQkEsK0JBQVc7QUFDUCxpREFBeUIsd0JBQXpCO0FBQ0EscURBQTZCLDJCQUE3QjtBQUNBLHNEQUE4QixjQUE5QjtxQkFISjtBQUtBLDhCQUFVO0FBQ04sc0NBQWMsZ0JBQWQ7QUFDQSxzQ0FBYyxZQUFkO0FBQ0EsOENBQXNCLDBCQUF0QjtBQUNBLGdDQUFRLE9BQVI7QUFDQSxvQ0FBWSxjQUFaO0FBQ0EsMENBQWtCLElBQWxCO0FBQ0EsZ0NBQVEscUJBQVI7QUFDQSxxQ0FBYSxlQUFiO0FBQ0EseUNBQWlCLHFCQUFqQjtBQUNBLGtDQUFVLEdBQVY7QUFDQSw0Q0FBb0IsTUFBcEI7QUFDQSwrQ0FBdUIsU0FBdkI7QUFDQSw0Q0FBb0IsVUFBcEI7QUFDQSxtQ0FBVyxzQkFBWDtBQUNBLGlDQUFTLE9BQVQ7QUFDQSxxQ0FBYSxZQUFiO0FBQ0EsbURBQTJCLE1BQTNCO0FBQ0EsdUNBQWUsTUFBZjtxQkFsQko7aUJBdEJKO2FBMUNKO1NBREo7O0FBeUZBLGlDQUF5QjtBQUNyQix1QkFBVztBQUNQLDZCQUFhLFNBQWI7QUFDQSx3QkFBUSxtQ0FBUjtBQUNBLGlDQUFpQiwwQ0FBakI7QUFDQSwrQkFBZSwyQ0FBZjtBQUNBLDZCQUFhLGtDQUFiO0FBQ0Esa0NBQWtCLGlDQUFsQjtBQUNBLDJCQUFXLGlDQUFYO0FBQ0EsOEJBQWMsb0NBQWQ7YUFSSjtTQURKO0FBWUEsdUJBQWU7QUFDWCxnQkFBSSxHQUFKO0FBQ0EsMEJBQWMsa0JBQWQ7QUFDQSwyQkFBZSxhQUFmO0FBQ0EsMEJBQWMsZUFBZDtBQUNBLDBCQUFjLG1CQUFkO1NBTEo7S0F0bEJBLENBZjRCO0FBNm1CaEMsUUFBSSxPQUFPLElBQUksS0FBSixDQUFVLEdBQVYsQ0FBUCxDQTdtQjRCO0FBOG1CaEMsUUFBSSxhQUFhLE9BQWIsQ0E5bUI0QjtBQSttQmhDLFNBQUssT0FBTCxDQUFhLFVBQUMsS0FBRDtlQUFXLGFBQWEsV0FBVyxLQUFYLENBQWI7S0FBWCxDQUFiLENBL21CZ0M7QUFnbkJoQyxRQUFJLE9BQU8sVUFBUCxLQUFzQixXQUF0QixFQUFtQztBQUNuQyxnQkFBUSxLQUFSLENBQWMsb0NBQW9DLEdBQXBDLENBQWQsQ0FEbUM7QUFFbkMsZUFGbUM7S0FBdkM7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixVQUF0QixFQUFrQztBQUNsQyxZQUFJLE9BQU8sRUFBUCxDQUQ4QjtBQUVsQyxhQUFLLElBQUksTUFBTSxDQUFOLEVBQVMsTUFBTSxVQUFVLE1BQVYsRUFBa0IsRUFBRSxHQUFGLEVBQU87QUFDN0MsaUJBQUssSUFBTCxDQUFVLFVBQVUsR0FBVixDQUFWLEVBRDZDO1NBQWpEO0FBR0EsZUFBTyw0QkFBYyxJQUFkLENBQVAsQ0FMa0M7S0FBdEM7QUFPQSxXQUFPLFVBQVAsQ0EzbkJnQztDQUE3Qjs7QUE4bkJBLElBQUksc0RBQXVCLFNBQXZCLG9CQUF1QjtXQUFNLENBQ3BDLE9BRG9DLEVBRXBDLGVBRm9DLEVBR3BDLGdCQUhvQyxFQUlwQyxZQUpvQyxFQUtwQyxZQUxvQyxFQU1wQyxZQU5vQyxFQU9wQyxhQVBvQyxFQVFwQyxvQkFSb0MsRUFTcEMsbUJBVG9DO0NBQU47Ozs7Ozs7QUMzbkJsQyxTQUFTLE1BQVQsQ0FDSSwwQ0FBcUIsT0FBTyxVQUFQLENBRHpCLEVBRUksT0FBTyxRQUFQLENBQWdCLGNBQWhCLENBQStCLFNBQS9CLENBRko7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNFTTtBQUNGLGFBREUsT0FDRixDQUFZLE1BQVosRUFBb0IsSUFBcEIsRUFBMEI7OEJBRHhCLFNBQ3dCOztBQUN0QixhQUFLLE1BQUwsR0FBYyxNQUFkLENBRHNCO0FBRXRCLGFBQUssSUFBTCxHQUFZLElBQVosQ0FGc0I7QUFHdEIsYUFBSyxVQUFMLEdBQWtCLFlBQU0sRUFBTixDQUhJO0FBSXRCLGFBQUssUUFBTCxHQUFnQixVQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWjttQkFBcUIsd0JBQVUsT0FBTyw0QkFBRSxnQ0FBUyxNQUFYLENBQVAsR0FBMEIsR0FBMUI7U0FBL0IsQ0FKTTtBQUt0QixhQUFLLE9BQUwsR0FBZTs7OzhDQUFJOzs7O21CQUFTLHFCQUFRLEtBQVIsa0JBQWMsbUJBQWUsS0FBN0I7U0FBYixDQUxPO0FBTXRCLGFBQUssT0FBTCxHQUFlLFlBQU0sRUFBTixDQU5PO0FBT3RCLGFBQUssU0FBTCxHQUFpQixZQUFNLEVBQU4sQ0FQSztLQUExQjs7aUJBREU7OytCQVVLLFVBQVU7QUFDYixpQkFBSyxPQUFMLEdBQWUsUUFBZixDQURhO0FBRWIsbUJBQU8sSUFBUCxDQUZhOzs7O2tDQUlQLFVBQVU7QUFDaEIsaUJBQUssVUFBTCxHQUFrQixRQUFsQixDQURnQjtBQUVoQixtQkFBTyxJQUFQLENBRmdCOzs7O2dDQUlaLFVBQVU7QUFDZCxpQkFBSyxRQUFMLEdBQWdCLFFBQWhCLENBRGM7QUFFZCxtQkFBTyxJQUFQLENBRmM7Ozs7K0JBSVgsVUFBVTtBQUNiLGlCQUFLLE9BQUwsR0FBZSxRQUFmLENBRGE7QUFFYixtQkFBTyxJQUFQLENBRmE7Ozs7Z0NBSVQsWUFBWSxVQUFzQjtnQkFBWiwyRkFBWTs7QUFDdEMsaUJBQUssU0FBTCxHQUFpQixVQUFTLFFBQVQsRUFBbUI7QUFDaEMsbUJBQUcsR0FBSCxDQUFPLFVBQVAsRUFBbUIsR0FBbkIsQ0FBdUIsUUFBdkIsRUFBaUMsUUFBakMsRUFEZ0M7YUFBbkIsQ0FEcUI7QUFJdEMsbUJBQU8sSUFBUCxDQUpzQzs7OzsrQkFNbkM7OztBQUNILGdCQUFJLE1BQU0sSUFBSSxjQUFKLEVBQU4sQ0FERDtBQUVILGdCQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLE1BQWpCLEVBQXlCLElBQXpCLEVBRkc7QUFHSCxnQkFBSSxNQUFKLEdBQWEsWUFBTTtBQUNmLHNCQUFLLE9BQUwsR0FEZTtBQUVmLG9CQUFJLElBQUksTUFBSixLQUFlLEdBQWYsRUFBb0I7QUFDcEIsMEJBQUssT0FBTCxHQURvQjtBQUVwQiwyQkFGb0I7aUJBQXhCO0FBSUEsb0JBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxJQUFJLFlBQUosQ0FBdEIsQ0FOVztBQU9mLG9CQUFJLGFBQWEsSUFBYixFQUFtQjtBQUNuQiwwQkFBSyxPQUFMLEdBRG1CO2lCQUF2QixNQUVPLElBQUksU0FBUyxPQUFULEVBQWtCO0FBQ3pCLDBCQUFLLFNBQUwsQ0FBZSxTQUFTLFFBQVQsQ0FBZixDQUR5QjtBQUV6QiwwQkFBSyxVQUFMLENBQWdCLFNBQVMsUUFBVCxDQUFoQixDQUZ5QjtpQkFBdEIsTUFHQTtBQUNILDBCQUFLLFFBQUwsQ0FBYyxTQUFTLE9BQVQsRUFBa0IsU0FBUyxJQUFULEVBQWUsU0FBUyxJQUFULENBQS9DLENBREc7aUJBSEE7YUFURSxDQUhWO0FBbUJILGdCQUFJLE9BQUosR0FBYyxZQUFNO0FBQ2hCLHNCQUFLLE9BQUwsR0FEZ0I7QUFFaEIsc0JBQUssT0FBTCxHQUZnQjthQUFOLENBbkJYO0FBdUJILGdCQUFJLE9BQU8sSUFBSSxRQUFKLEVBQVAsQ0F2QkQ7QUF3QkgsZ0JBQUksT0FBTyxTQUFQLEVBQWtCO0FBQ2xCLHFCQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCLE9BQU8sU0FBUCxDQUF6QixDQURrQjthQUF0QjtBQUdBLGlCQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLEtBQUssU0FBTCxDQUFlLEtBQUssSUFBTCxDQUFuQyxFQTNCRztBQTRCSCxpQkFBSyxNQUFMLENBQVksUUFBWixFQUFzQixLQUFLLE1BQUwsQ0FBdEIsQ0E1Qkc7QUE2QkgsZ0JBQUksSUFBSixDQUFTLElBQVQsRUE3Qkc7Ozs7V0FoQ0w7OztBQWlFQyxJQUFJLG9CQUFNLFNBQU4sR0FBTTt1Q0FBSTs7Ozs4Q0FBYSx1QkFBVztDQUE1QjtrQkFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkVUO0FBQ0YsYUFERSxpQkFDRixHQUFjOzhCQURaLG1CQUNZOztBQUNWLGFBQUssTUFBTCxHQUFjLEtBQWQsQ0FEVTtBQUVWLGFBQUssU0FBTCxHQUFpQixFQUFqQixDQUZVO0FBR1YsYUFBSyxhQUFMLEdBQXFCLENBQXJCLENBSFU7QUFJVixhQUFLLE9BQUwsR0FKVTtLQUFkOztpQkFERTs7a0NBT1E7QUFDTixvQkFBUSxHQUFSLENBQVksNEJBQVosRUFETTtBQUVOLGlCQUFLLEVBQUwsR0FBVSxJQUFJLE1BQUosQ0FBVyxZQUFZLE9BQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixLQUFuQyxDQUFyQixDQUZNO0FBR04saUJBQUssRUFBTCxDQUFRLE1BQVIsR0FBaUIsWUFBVztBQUN4Qiw4Q0FBa0IsS0FBbEIsR0FEd0I7QUFFeEIsd0JBQVEsR0FBUixDQUFZLFlBQVosRUFGd0I7QUFHeEIsb0JBQUksS0FBSyxNQUFMLEVBQWE7QUFDYix5QkFBSyxTQUFMLENBQWU7QUFDWCw4QkFBTSxLQUFLLFNBQUwsQ0FBZTtBQUNqQixzQ0FBVSxDQUFDLENBQUMsYUFBRCxFQUFnQixJQUFoQixDQUFELENBQVY7QUFDQSwyQ0FBZSxFQUFmO3lCQUZFLENBQU47cUJBREosRUFEYTtpQkFBakI7YUFIYSxDQVdmLElBWGUsQ0FXVixJQVhVLENBQWpCLENBSE07QUFlTixpQkFBSyxFQUFMLENBQVEsT0FBUixHQUFrQixZQUFXO0FBQ3pCLDhDQUFrQixPQUFsQixHQUR5QjtBQUV6Qix3QkFBUSxHQUFSLENBQVksb0JBQVosRUFGeUI7QUFHekIscUJBQUssTUFBTCxHQUFjLElBQWQsQ0FIeUI7QUFJekIsMkJBQVcsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFYLEVBQW9DLEdBQXBDLEVBSnlCO2FBQVgsQ0FLaEIsSUFMZ0IsQ0FLWCxJQUxXLENBQWxCLENBZk07QUFxQk4saUJBQUssRUFBTCxDQUFRLFNBQVIsR0FBb0IsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQixJQUFwQixDQUFwQixDQXJCTTs7OztrQ0F1QkEsU0FBUzs7O0FBQ2YsZ0JBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxRQUFRLElBQVIsQ0FBbEIsQ0FEVztBQUVmLGdCQUFJLEtBQUssV0FBTCxDQUFKLEVBQXVCO0FBQ25CLHVCQUFPLFNBQVAsR0FBbUIsS0FBSyxXQUFMLENBQW5CLENBRG1CO0FBRW5CLHVCQUZtQjthQUF2QjtBQUlBLGlCQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLFVBQVMsSUFBVCxFQUFlO0FBQ2pDLG9CQUFJLFdBQVcsS0FBSyxDQUFMLENBQVgsQ0FENkI7QUFFakMsb0JBQUksV0FBVyxLQUFLLENBQUwsQ0FBWCxDQUY2QjtBQUdqQyxvQkFBSSxZQUFZLEtBQUssU0FBTCxDQUFlLFFBQWYsS0FBNEIsRUFBNUIsQ0FIaUI7QUFJakMsb0JBQUksYUFBYSxlQUFiLEVBQThCO0FBQzlCLDJCQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsSUFBdkIsRUFEOEI7aUJBQWxDO0FBR0EsdUJBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLFFBQWYsS0FBNEIsRUFBNUIsQ0FBWixDQUE0QyxPQUE1QyxDQUFvRCxVQUFDLEdBQUQ7MkJBQVMsVUFBVSxHQUFWLEVBQWUsUUFBZjtpQkFBVCxDQUFwRCxDQVBpQzthQUFmLENBUXBCLElBUm9CLENBUWYsSUFSZSxDQUF0QixFQU5lO0FBZWYsZ0JBQUksZUFBZSxLQUFmLENBZlc7QUFnQmYsaUJBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixVQUFDLFVBQUQsRUFBZ0I7QUFDdkMsK0JBQWUsaUJBQVEsV0FBUixDQUFvQixXQUFXLEtBQVgsRUFBa0IsV0FBVyxFQUFYLEVBQWUsV0FBVyxJQUFYLENBQXJELElBQXlFLFlBQXpFLENBRHdCO2FBQWhCLENBQTNCLENBaEJlO0FBbUJmLGdCQUFJLFlBQUosRUFBa0I7O0FBQ2Qsd0JBQUksWUFBWSxNQUFLLFNBQUwsQ0FBZSxXQUFmLEtBQStCLEVBQS9CO0FBQ2hCLDJCQUFPLElBQVAsQ0FBWSxTQUFaLEVBQXVCLE9BQXZCLENBQStCLFVBQUMsR0FBRCxFQUFTO0FBQ3BDLDRCQUFJLFVBQVUsR0FBVixDQUFKLEVBQW9CO0FBQ2hCLHNDQUFVLEdBQVYsSUFEZ0I7eUJBQXBCO3FCQUQyQixDQUEvQjtxQkFGYzthQUFsQjs7Ozt3Q0FTWTtBQUNaLG1CQUFPLEtBQUssYUFBTCxFQUFQLENBRFk7Ozs7b0NBR0osV0FBVyxVQUFVO0FBQzdCLGdCQUFJLEtBQUssS0FBSyxhQUFMLEVBQUwsQ0FEeUI7QUFFN0Isc0JBQVUsS0FBVixDQUFnQixHQUFoQixFQUFxQixPQUFyQixDQUE2QixVQUFTLFFBQVQsRUFBbUI7QUFDNUMsb0JBQUksQ0FBQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQUQsRUFBMkI7QUFDM0IseUJBQUssU0FBTCxDQUFlLFFBQWYsSUFBMkIsRUFBM0IsQ0FEMkI7aUJBQS9CO0FBR0EscUJBQUssU0FBTCxDQUFlLFFBQWYsRUFBeUIsRUFBekIsSUFBK0IsUUFBL0IsQ0FKNEM7YUFBbkIsQ0FLM0IsSUFMMkIsQ0FLdEIsSUFMc0IsQ0FBN0IsRUFGNkI7QUFRN0IsbUJBQU8sRUFBUCxDQVI2Qjs7Ozt1Q0FVbEIsYUFBYTtBQUN4QixtQkFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQVosQ0FBNEIsT0FBNUIsQ0FBb0MsVUFBUyxHQUFULEVBQWM7QUFDOUMsdUJBQU8sS0FBSyxTQUFMLENBQWUsR0FBZixFQUFvQixXQUFwQixDQUFQLENBRDhDO2FBQWQsQ0FFbEMsSUFGa0MsQ0FFN0IsSUFGNkIsQ0FBcEMsRUFEd0I7Ozs7V0F2RTFCOzs7QUErRU4sSUFBSSxDQUFDLE9BQU8sa0JBQVAsRUFBMkI7QUFDNUIsV0FBTyxrQkFBUCxHQUE0QixJQUFJLGlCQUFKLEVBQTVCLENBRDRCO0NBQWhDO0FBR08sSUFBSSxrREFBcUIsT0FBTyxrQkFBUDs7Ozs7Ozs7Ozs7Ozs7O0lDdEYxQjtBQUNGLGFBREUsR0FDRixDQUFZLE9BQVosRUFBcUIsVUFBckIsRUFBaUMsRUFBakMsRUFBcUM7OEJBRG5DLEtBQ21DOztBQUNqQyxhQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FEaUM7QUFFakMsYUFBSyxFQUFMLEdBQVUsRUFBVixDQUZpQztBQUdqQyxhQUFLLE9BQUwsR0FBZSxPQUFmLENBSGlDO0tBQXJDOztpQkFERTs7OEJBTUk7QUFDRixtQkFBTyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLEtBQUssVUFBTCxDQUFqQixDQUFrQyxLQUFsQyxDQUF3QyxLQUFLLEVBQUwsQ0FBL0MsQ0FERTs7OztXQU5KOzs7SUFXQTtBQUNGLGFBREUsS0FDRixDQUFZLE9BQVosRUFBcUIsRUFBckIsRUFBeUIsYUFBekIsRUFBd0M7OEJBRHRDLE9BQ3NDOztBQUNwQyxhQUFLLEVBQUwsR0FBVSxFQUFWLENBRG9DO0FBRXBDLGFBQUssU0FBTCxHQUFpQixPQUFqQixDQUZvQztBQUdwQyxhQUFLLFdBQUwsR0FBbUIsRUFBbkIsQ0FIb0M7QUFJcEMsYUFBSyxlQUFMLEdBQXVCLGFBQXZCLENBSm9DO0tBQXhDOztpQkFERTs7bUNBT1MsS0FBSyxLQUFLO0FBQ2pCLGlCQUFLLEdBQUwsSUFBWSxHQUFaLENBRGlCO0FBRWpCLGlCQUFLLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsR0FBeEIsQ0FGaUI7Ozs7K0JBSWQsTUFBbUI7OztnQkFBYiwrREFBTyxvQkFBTTs7QUFDdEIsaUJBQUssSUFBSSxHQUFKLElBQVcsSUFBaEI7QUFBc0Isb0JBQUksS0FBSyxjQUFMLENBQW9CLEdBQXBCLENBQUosRUFBOEI7QUFDaEQsd0JBQUksSUFBSSxNQUFKLENBQVcsQ0FBWCxNQUFrQixHQUFsQixJQUF5QixJQUFJLE1BQUosQ0FBVyxDQUFYLE1BQWtCLEdBQWxCLEVBQXVCO0FBQ2hELDRCQUFJLENBQUMsTUFBRCxJQUFXLE9BQU8sS0FBSyxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQUwsQ0FBUCxLQUE4QixXQUE5QixFQUEyQztBQUN0RCxxQ0FEc0Q7eUJBQTFEO3FCQURKO0FBS0Esd0JBQUksSUFBSSxNQUFKLENBQVcsQ0FBWCxNQUFrQixHQUFsQixFQUF1Qjs7QUFDdkIsZ0NBQUksTUFBTSxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQU47QUFDSixrQ0FBSyxHQUFMLElBQVksRUFBWjtBQUNBLGdDQUFJLFdBQVcsSUFBSSxHQUFKLENBQVEsTUFBSyxTQUFMLEVBQWdCLE1BQUssZUFBTCxDQUFxQixVQUFyQixFQUFpQyxNQUFLLEVBQUwsQ0FBcEU7QUFDSixnQ0FBSSxlQUFlLEtBQUssR0FBTCxFQUFVLFFBQVY7QUFDbkIsaUNBQUssR0FBTCxFQUFVLFFBQVYsQ0FBbUIsT0FBbkIsQ0FBMkIsVUFBUyxXQUFULEVBQXNCO0FBQzdDLG9DQUFJLFFBQU8sWUFBWSxJQUFaLENBQVAsS0FBNEIsUUFBNUIsRUFBc0M7QUFDdEMseUNBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsWUFBWSxLQUFaLENBQW5CLENBQXNDLEdBQXRDLENBQTBDLFlBQVksRUFBWixFQUFnQixZQUFZLElBQVosQ0FBMUQsQ0FEc0M7aUNBQTFDO0FBR0Esb0NBQUksTUFBTSxJQUFJLEdBQUosQ0FBUSxLQUFLLFNBQUwsRUFBZ0IsWUFBWSxLQUFaLEVBQW1CLFlBQVksRUFBWixDQUFqRCxDQUp5QztBQUs3QyxvQ0FBSSxHQUFKLEdBQVUsVUFBVixDQUFxQixZQUFyQixFQUFtQyxRQUFuQyxFQUw2QztBQU03QyxxQ0FBSyxHQUFMLEVBQVUsSUFBVixDQUFlLEdBQWYsRUFONkM7NkJBQXRCLENBT3pCLElBUHlCLE9BQTNCO0FBUUEsa0NBQUssV0FBTCxDQUFpQixHQUFqQixJQUF3QixHQUF4Qjs2QkFidUI7cUJBQTNCLE1BY08sSUFBSSxJQUFJLE1BQUosQ0FBVyxDQUFYLE1BQWtCLEdBQWxCLEVBQXVCO0FBQzlCLDRCQUFJLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFOLENBRDBCO0FBRTlCLDRCQUFJLGNBQWMsS0FBSyxHQUFMLENBQWQsQ0FGMEI7QUFHOUIsNEJBQUksUUFBTyxpRUFBUCxLQUF1QixRQUF2QixFQUFpQztBQUNqQyxpQ0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixZQUFZLEtBQVosQ0FBbkIsQ0FBc0MsR0FBdEMsQ0FBMEMsWUFBWSxFQUFaLEVBQWdCLFlBQVksSUFBWixDQUExRCxDQURpQzt5QkFBckM7QUFHQSw2QkFBSyxHQUFMLElBQVksSUFBSSxHQUFKLENBQVEsS0FBSyxTQUFMLEVBQWdCLFlBQVksS0FBWixFQUFtQixZQUFZLEVBQVosQ0FBdkQsQ0FOOEI7QUFPOUIsNkJBQUssV0FBTCxDQUFpQixHQUFqQixJQUF3QixHQUF4QixDQVA4QjtxQkFBM0IsTUFRQTtBQUNILDZCQUFLLEdBQUwsSUFBWSxLQUFLLEdBQUwsQ0FBWixDQURHO0FBRUgsNkJBQUssV0FBTCxDQUFpQixHQUFqQixJQUF3QixFQUF4QixDQUZHO3FCQVJBO2lCQXBCVzthQUF0Qjs7OztrQ0FrQ00sUUFBUTs7O0FBQ2QsZ0JBQUksU0FBUyxFQUFULENBRFU7O3VDQUVMO0FBQXlCLG9CQUFJLE9BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxHQUFoQyxDQUFKLEVBQTBDO0FBQ3hFLDRCQUFRLE9BQUssV0FBTCxDQUFpQixHQUFqQixDQUFSO0FBQ0EsNkJBQUssR0FBTDtBQUNJLGdDQUFJLE9BQU8sTUFBUCxFQUFlO0FBQ2YsdUNBQU8sR0FBUCxJQUFjLE9BQUssR0FBTCxFQUFVLEdBQVYsQ0FBYyxVQUFTLEdBQVQsRUFBYztBQUN0QywyQ0FBTyxJQUFJLEdBQUosR0FBVSxTQUFWLENBQW9CLE9BQU8sR0FBUCxDQUFwQixDQUFQLENBRHNDO2lDQUFkLENBQTVCLENBRGU7NkJBQW5CO0FBS0Esa0NBTko7QUFEQSw2QkFRSyxHQUFMO0FBQ0ksZ0NBQUksT0FBTyxNQUFQLEVBQWU7QUFDZix1Q0FBTyxHQUFQLElBQWMsT0FBSyxHQUFMLEVBQVUsR0FBVixHQUFnQixTQUFoQixDQUEwQixPQUFPLEdBQVAsQ0FBMUIsQ0FBZCxDQURlOzZCQUFuQjtBQUdBLGtDQUpKO0FBUkE7QUFjSSxtQ0FBTyxHQUFQLElBQWMsT0FBSyxHQUFMLENBQWQsQ0FESjtBQWJBLHFCQUR3RTtpQkFBMUM7Y0FGcEI7O0FBRWQsaUJBQUssSUFBSSxHQUFKLElBQVcsS0FBSyxXQUFMO3NCQUFQO2FBQVQsTUFrQkEsQ0FBTyxFQUFQLEdBQVksS0FBSyxFQUFMLENBcEJFO0FBcUJkLG1CQUFPLE1BQVAsQ0FyQmM7Ozs7V0E5Q2hCOzs7SUF1RUE7QUFDRixhQURFLGFBQ0YsQ0FBWSxPQUFaLEVBQXFCLFVBQXJCLEVBQWlDOzhCQUQvQixlQUMrQjs7QUFDN0IsYUFBSyxVQUFMLEdBQWtCLFVBQWxCLENBRDZCO0FBRTdCLGFBQUssTUFBTCxHQUFjLEVBQWQsQ0FGNkI7QUFHN0IsYUFBSyxPQUFMLEdBQWUsT0FBZixDQUg2QjtLQUFqQzs7aUJBREU7OzRCQU1FLElBQUksTUFBTTtBQUNWLGdCQUFJLE9BQU8sS0FBSyxNQUFMLENBQVksRUFBWixDQUFQLEtBQTJCLFdBQTNCLEVBQXdDO0FBQ3hDLHFCQUFLLE1BQUwsQ0FBWSxFQUFaLElBQWtCLElBQUksS0FBSixDQUFVLEtBQUssT0FBTCxFQUFjLEVBQXhCLEVBQTRCLElBQTVCLENBQWxCLENBRHdDO2FBQTVDO0FBR0EsaUJBQUssTUFBTCxDQUFZLEVBQVosRUFBZ0IsTUFBaEIsQ0FBdUIsSUFBdkIsRUFKVTs7OzsrQkFNUCxJQUFJLE1BQU07QUFDYixnQkFBSSxLQUFLLE1BQUwsQ0FBWSxFQUFaLENBQUosRUFBcUI7QUFDakIscUJBQUssTUFBTCxDQUFZLEVBQVosRUFBZ0IsTUFBaEIsQ0FBdUIsSUFBdkIsRUFBNkIsS0FBN0IsRUFEaUI7QUFFakIsdUJBQU8sSUFBUCxDQUZpQjthQUFyQjtBQUlBLG1CQUFPLEtBQVAsQ0FMYTs7Ozs4QkFPWCxJQUFJO0FBQ04sbUJBQU8sS0FBSyxNQUFMLENBQVksRUFBWixDQUFQLENBRE07Ozs7OEJBR0o7QUFDRixnQkFBSSxPQUFPLE9BQU8sbUJBQVAsQ0FBMkIsS0FBSyxNQUFMLENBQWxDLENBREY7QUFFRixtQkFBTyxLQUFLLEdBQUwsQ0FBUyxVQUFTLEdBQVQsRUFBYztBQUMxQix1QkFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQVAsQ0FEMEI7YUFBZCxDQUVkLElBRmMsQ0FFVCxJQUZTLENBQVQsQ0FBUCxDQUZFOzs7O1dBdEJKOzs7SUE4QkE7QUFDRixhQURFLE9BQ0YsR0FBYzs4QkFEWixTQUNZOztBQUNWLGFBQUssY0FBTCxHQUFzQixFQUF0QixDQURVO0FBRVYsYUFBSyxPQUFMLEdBQWUsRUFBZixDQUZVO0tBQWQ7O2lCQURFOztrQ0FLUSxRQUFRO0FBQ2QsZ0JBQUksT0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQVAsS0FBZ0MsV0FBaEMsRUFBNkM7QUFDN0MscUJBQUssT0FBTCxDQUFhLE1BQWIsSUFBdUIsSUFBSSxPQUFKLEVBQXZCLENBRDZDO2FBQWpEO0FBR0EsbUJBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixDQUFQLENBSmM7Ozs7a0NBTVIsUUFBUTtBQUNkLG1CQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBUCxDQURjOzs7OzRCQUdkLFlBQVk7QUFDWixnQkFBSSxPQUFPLEtBQUssY0FBTCxDQUFvQixVQUFwQixDQUFQLEtBQTJDLFdBQTNDLEVBQXdEO0FBQ3hELHFCQUFLLGNBQUwsQ0FBb0IsVUFBcEIsSUFBa0MsSUFBSSxhQUFKLENBQWtCLElBQWxCLEVBQXdCLFVBQXhCLENBQWxDLENBRHdEO2FBQTVEO0FBR0EsbUJBQU8sS0FBSyxjQUFMLENBQW9CLFVBQXBCLENBQVAsQ0FKWTs7Ozs0QkFNWixZQUFZO0FBQ1osbUJBQU8sS0FBSyxjQUFMLENBQW9CLFVBQXBCLENBQVAsQ0FEWTs7OztvQ0FHSixZQUFZLFVBQVUsTUFBTTs7OztBQUNwQyxnQkFBSSxlQUFlLEtBQWYsQ0FEZ0M7QUFFcEMsZ0JBQUksS0FBSyxjQUFMLENBQW9CLFVBQXBCLENBQUosRUFBcUM7QUFDakMsK0JBQWUsS0FBSyxHQUFMLENBQVMsVUFBVCxFQUFxQixHQUFyQixDQUF5QixRQUF6QixFQUFtQyxJQUFuQyxLQUE0QyxZQUE1QyxDQURrQjthQUFyQztBQUdBLG1CQUFPLElBQVAsQ0FBWSxLQUFLLE9BQUwsQ0FBWixDQUEwQixPQUExQixDQUFrQyxVQUFDLEdBQUQ7Ozt1QkFDOUIsZUFBZSx1QkFBSyxPQUFMLENBQWEsR0FBYixHQUFrQixXQUFsQixvQ0FBK0MsWUFBL0M7YUFEZSxDQUFsQzs7QUFMb0MsbUJBUTdCLElBQVAsQ0FSb0M7Ozs7V0F2QnRDOzs7QUFtQ0MsSUFBSSw0QkFBVSxJQUFJLE9BQUosRUFBVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNoSkU7Ozs7Ozs7Ozs7O2lDQUNBO0FBQ0wsbUJBQU87O2tCQUFPLE9BQU8sRUFBRSxVQUFVLE1BQVYsRUFBa0IsU0FBUyxNQUFULEVBQTNCLEVBQVA7Z0JBQXFEOzs7b0JBQU87Ozt3QkFDL0Q7OzhCQUFJLE9BQU8sRUFBRSxhQUFhLFFBQWIsRUFBVCxFQUFKOzRCQUNJLDZCQUFLLEtBQUksNkJBQUosRUFBTCxDQURKO3lCQUQrRDtxQkFBUDtpQkFBckQ7YUFBUCxDQURLOzs7O1dBREE7RUFBZSxNQUFNLFNBQU47O0lBVXRCOzs7Ozs7O2dDQUNNOzs7a0NBQ0U7OztXQUZSOzs7SUFLQTs7O0FBQ0YsYUFERSxnQkFDRixDQUFZLEtBQVosRUFBbUI7OEJBRGpCLGtCQUNpQjs7NEVBRGpCLDZCQUVRLFFBRFM7O0FBRWYsZUFBSyxLQUFMLEdBQWE7QUFDVCx5QkFBYSxJQUFiO1NBREosQ0FGZTs7S0FBbkI7O2lCQURFOzsrQ0FPcUI7QUFDbkIsaUJBQUssWUFBTCxHQURtQjs7Ozt3Q0FhUDs7O0FBQ1osZ0JBQUksS0FBSyxRQUFMLEVBQWU7QUFDZix1QkFEZTthQUFuQjtBQUdBLGlCQUFLLFFBQUwsR0FBZ0IsWUFBWSxZQUFNO0FBQzlCLHVCQUFLLFFBQUwsQ0FBYztBQUNWLDBCQUFNLENBQUMsT0FBSyxLQUFMLENBQVcsSUFBWDtpQkFEWCxFQUQ4QjthQUFOLEVBSXpCLEdBSmEsQ0FBaEIsQ0FKWTs7Ozt1Q0FVRDtBQUNYLGdCQUFJLENBQUMsS0FBSyxRQUFMLEVBQWU7QUFDaEIsdUJBRGdCO2FBQXBCO0FBR0EsMEJBQWMsS0FBSyxRQUFMLENBQWQsQ0FKVztBQUtYLGlCQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FMVzs7OztnQ0FPUDtBQUNKLGlCQUFLLFlBQUwsR0FESTtBQUVKLGlCQUFLLFFBQUwsQ0FBYyxFQUFFLFdBQVcsSUFBWCxFQUFpQixNQUFNLEtBQU4sRUFBakMsRUFGSTs7OztrQ0FJRTtBQUNOLGlCQUFLLGFBQUwsR0FETTtBQUVOLGlCQUFLLFFBQUwsQ0FBYyxFQUFFLFdBQVcsS0FBWCxFQUFoQixFQUZNOzs7O2lDQUlEO0FBQ0wsZ0JBQUksS0FBSyxLQUFMLENBQVcsU0FBWCxFQUFzQjtBQUN0Qix1QkFBTyw2QkFBSyxXQUFVLHNCQUFWLEVBQUwsQ0FBUCxDQURzQjthQUExQjtBQUdBLGdCQUFJLEtBQUssS0FBTCxDQUFXLFNBQVgsS0FBeUIsSUFBekIsRUFBK0I7QUFDL0IsdUJBQ0k7O3NCQUFLLFdBQVUsaUNBQVYsRUFBTDtvQkFDTSxlQUFFLDBCQUFGLENBRE47aUJBREosQ0FEK0I7YUFBbkM7QUFPQSxtQkFDSTs7a0JBQUssV0FBWSxvQ0FBb0MsS0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixPQUFsQixHQUE0QixFQUE1QixDQUFwQyxFQUFqQjtnQkFDVSxlQUFFLGtDQUFGLENBRFY7YUFESixDQVhLOzs7OytCQW5DSztBQUNWLGdCQUFJLFVBQVUsT0FBTyxRQUFQLENBQWdCLGNBQWhCLENBQStCLG1CQUEvQixDQUFWLENBRE07QUFFVixnQkFBSSxXQUFXLENBQUMsUUFBUSxhQUFSLEVBQUQsRUFBMEI7QUFDckMsdUJBQU8sU0FBUyxNQUFULENBQ0gsb0JBQUMsZ0JBQUQsT0FERyxFQUVILE9BRkcsQ0FBUCxDQURxQzthQUF6QztBQU1BLG1CQUFPLElBQUksb0JBQUosRUFBUCxDQVJVOzs7O1dBVlo7RUFBeUIsTUFBTSxTQUFOOztBQWdFeEIsSUFBSSxnREFBb0IsaUJBQWlCLElBQWpCLEVBQXBCOzs7Ozs7Ozs7OztRQy9FSztRQVdBOzs7O0FBWFQsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCO0FBQzNCLFFBQUksUUFBUSxRQUFRLGlEQUFQLEtBQWUsUUFBZixHQUEyQixJQUFJLENBQUosQ0FBNUIsR0FBcUMsZUFBRSw4QkFBRixDQUFyQyxDQURlO0FBRTNCLFFBQUksT0FBTyxRQUFRLGlEQUFQLEtBQWUsUUFBZixHQUEyQixJQUFJLENBQUosQ0FBNUIsR0FBcUMsR0FBckMsQ0FGZ0I7QUFHM0IsU0FBSztBQUNELGVBQU8sS0FBUDtBQUNBLGNBQU0sSUFBTjtBQUNBLGNBQU0sT0FBTjtBQUNBLG1CQUFXLEtBQVg7S0FKSixFQUgyQjtDQUF4Qjs7QUFXQSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEIsTUFBOUIsRUFBOEQ7UUFBeEIseUVBQWlCLHFCQUFPOztBQUNqRSxXQUFPLEtBQUs7QUFDUixlQUFPLE9BQVA7QUFDQSxtQkFBVyxLQUFYO0FBQ0EsMEJBQWtCLElBQWxCO0FBQ0EsMkJBQW1CLGVBQUUsbUJBQUYsQ0FBbkI7QUFDQSwwQkFBa0IsZUFBRSxrQkFBRixDQUFsQjtBQUNBLHdCQUFnQixnQkFBaEI7S0FORyxFQU9KLE1BUEksQ0FBUCxDQURpRTtDQUE5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNkTTs7Ozs7Ozs7Ozs7NkNBV1k7QUFDakIsbUJBQU8sS0FBSyxLQUFMLENBQVcsU0FBWCxDQURVOzs7O3VDQUdOO0FBQ1gsbUJBQU8sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQjs7a0JBQUssV0FBVSxVQUFWLEVBQUw7Z0JBQTRCLEtBQUssS0FBTCxDQUFXLE1BQVg7YUFBaEQsR0FBNEUsSUFBNUUsQ0FESTs7Ozt1Q0FHQTtBQUNYLG1CQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0I7OztnQkFBTSxLQUFLLEtBQUwsQ0FBVyxNQUFYO2FBQTFCLEdBQXFELElBQXJELENBREk7Ozs7dUNBR0E7QUFDWCxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9COzs7Z0JBQU0sS0FBSyxLQUFMLENBQVcsTUFBWDthQUExQixHQUFxRCxJQUFyRCxDQURJOzs7O3VDQUdBO0FBQ1gsbUJBQU8sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQjs7O2dCQUFNLEtBQUssS0FBTCxDQUFXLE1BQVg7YUFBMUIsR0FBcUQsSUFBckQsQ0FESTs7OztxQ0FHRjs7O0FBQ1QsbUJBQ0k7OztBQUNJLCtCQUFVLFdBQVY7QUFDQSx5QkFBTTsrQkFBSyxPQUFLLEtBQUwsR0FBYSxDQUFiO3FCQUFMO2lCQUZWO2dCQUlNLEtBQUssS0FBTCxDQUFXLElBQVg7YUFMVixDQURTOzs7O2lDQVVKO0FBQ0wsbUJBQU87O2tCQUFLLFdBQVUsV0FBVixFQUFMO2dCQUNELEtBQUssWUFBTCxFQURDO2dCQUVELEtBQUssWUFBTCxFQUZDO2dCQUdELEtBQUssWUFBTCxFQUhDO2dCQUlELEtBQUssWUFBTCxFQUpDO2dCQUtELEtBQUssVUFBTCxFQUxDO2FBQVAsQ0FESzs7Ozs0QkFuQ2M7QUFDbkIsbUJBQU87QUFDSCx3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUix3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUix3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUix3QkFBUSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUixzQkFBTSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7QUFDTiw0QkFBWSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7YUFOaEIsQ0FEbUI7Ozs7V0FEZDtFQUFrQixNQUFNLFNBQU47Ozs7Ozs7Ozs7Ozs7O1FDR2Y7UUFXQTs7Ozs7Ozs7OztBQVhULFNBQVMsY0FBVCxDQUF3QixPQUF4QixFQUFpQztBQUNwQyxRQUFJLElBQUksU0FBSixDQUFJLENBQUMsS0FBRCxFQUFXO0FBQ2YsY0FBTSxjQUFOLEdBRGU7QUFFZixlQUFPLFFBQVEsS0FBUixDQUFQLENBRmU7S0FBWCxDQUQ0QjtBQUtwQyxXQUFPO0FBQ0gsc0JBQWMsQ0FBZDtBQUNBLGlCQUFTLENBQVQ7S0FGSixDQUxvQztDQUFqQzs7QUFXQSxTQUFTLGlCQUFULENBQTJCLE9BQTNCLEVBQW9DLGVBQXBDLEVBQXFEO0FBQ3hELFFBQUksV0FBVyxvQkFBTSxFQUFOLENBRHlDO0FBRXhELFFBQUksV0FBVyxDQUFYLENBRm9EO0FBR3hELFFBQUksYUFBYSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsQ0FIb0Q7QUFJeEQsUUFBSSxPQUFPLFNBQVAsSUFBTyxDQUFDLEtBQUQsRUFBVztBQUNsQixjQUFNLGNBQU4sR0FEa0I7QUFFbEIsZUFBTyxVQUFQLENBRmtCO0tBQVgsQ0FKNkM7QUFReEQsUUFBSSxVQUFVLFNBQVYsT0FBVSxHQUFNO0FBQ2hCLG1CQUFXLG9CQUFNLEVBQU4sQ0FESztLQUFOLENBUjBDO0FBV3hELFFBQUksT0FBTyxTQUFQLElBQU8sQ0FBQyxLQUFELEVBQVc7QUFDbEIsWUFBSSxjQUFjLENBQUMsTUFBTSxPQUFOLENBQWMsQ0FBZCxFQUFpQixLQUFqQixFQUF3QixNQUFNLE9BQU4sQ0FBYyxDQUFkLEVBQWlCLEtBQWpCLENBQXZDLENBRGM7QUFFbEIsWUFBSSxNQUFNLFNBQU4sR0FBTSxDQUFDLENBQUQ7bUJBQU8sSUFBSSxDQUFKO1NBQVAsQ0FGUTtBQUdsQixvQkFBWSxLQUFLLElBQUwsQ0FBVSxJQUFJLFlBQVksQ0FBWixJQUFpQixXQUFXLENBQVgsQ0FBakIsQ0FBSixHQUFzQyxJQUFJLFlBQVksQ0FBWixJQUFpQixXQUFXLENBQVgsQ0FBakIsQ0FBMUMsQ0FBdEIsQ0FIa0I7QUFJbEIscUJBQWEsV0FBYixDQUprQjtBQUtsQixZQUFJLFdBQVcsRUFBWCxFQUFlO0FBQ2Ysc0JBRGU7U0FBbkI7S0FMTyxDQVg2QztBQW9CeEQsUUFBSSxRQUFRLFNBQVIsS0FBUSxDQUFDLEtBQUQsRUFBVztBQUNuQixtQkFBVyxPQUFYLENBRG1CO0FBRW5CLG1CQUFXLENBQVgsQ0FGbUI7QUFHbkIscUJBQWEsQ0FBQyxNQUFNLE9BQU4sQ0FBYyxDQUFkLEVBQWlCLEtBQWpCLEVBQXdCLE1BQU0sT0FBTixDQUFjLENBQWQsRUFBaUIsS0FBakIsQ0FBdEMsQ0FIbUI7S0FBWCxDQXBCNEM7QUF5QnhELFdBQU87QUFDSCxzQkFBYyxLQUFkO0FBQ0Esb0JBQVksSUFBWjtBQUNBLHFCQUFhLElBQWI7QUFDQSx1QkFBZSxPQUFmO0FBQ0EsaUJBQVMsT0FBVDtLQUxKLENBekJ3RDtDQUFyRDs7SUFrQ007Ozs7OzRCQUNjO0FBQ25CLG1CQUFPO0FBQ0gsc0JBQU0sTUFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ04sMEJBQVUsTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1YsMkJBQVcsTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1gsNEJBQVksTUFBTSxTQUFOLENBQWdCLElBQWhCO2FBSmhCLENBRG1COzs7O0FBUXZCLGFBVFMsTUFTVCxDQUFZLEtBQVosRUFBbUI7OEJBVFYsUUFTVTs7MkVBVFYsbUJBVUMsUUFEUzs7Y0FnRG5CLFVBQVUsVUFBQyxLQUFELEVBQVc7QUFDakIsZ0JBQUksTUFBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixNQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ3hDLHVCQUR3QzthQUE1QztBQUdBLGtCQUFLLFFBQUwsQ0FBYztBQUNWLDBCQUFVLEdBQVY7QUFDQSx1QkFBTyxLQUFQO0FBQ0EsMEJBQVUsSUFBVjthQUhKLEVBSmlCO0FBU2pCLGtCQUFLLEtBQUwsQ0FBVyxVQUFYLEdBVGlCO1NBQVgsQ0FoRFM7O2NBMkRuQixlQUFlLFVBQUMsS0FBRCxFQUFXO0FBQ3RCLGtCQUFNLGNBQU4sR0FEc0I7QUFFdEIsZ0JBQUksTUFBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixNQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ3hDLHVCQUR3QzthQUE1QztBQUdBLGtCQUFLLEdBQUwsR0FBVyxNQUFLLGdCQUFMLENBQXNCLEtBQXRCLENBQVgsQ0FMc0I7QUFNdEIsa0JBQUssUUFBTCxDQUFjO0FBQ1YsMEJBQVUsTUFBSyxZQUFMLENBQWtCLEtBQWxCLENBQVY7QUFDQSx1QkFBTyxJQUFQO2FBRkosRUFOc0I7U0FBWCxDQTNESTs7Y0FzRW5CLGNBQWMsVUFBQyxLQUFELEVBQVc7QUFDckIsa0JBQU0sY0FBTixHQURxQjtBQUVyQixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUI7QUFDeEMsdUJBRHdDO2FBQTVDO0FBR0Esa0JBQUssUUFBTCxDQUFjO0FBQ1YsMEJBQVUsTUFBSyxZQUFMLENBQWtCLEtBQWxCLENBQVY7YUFESixFQUxxQjtTQUFYLENBdEVLOztjQStFbkIsYUFBYSxVQUFDLEtBQUQsRUFBVztBQUNwQixrQkFBTSxjQUFOLEdBRG9CO0FBRXBCLGdCQUFJLE1BQUssS0FBTCxDQUFXLFFBQVgsSUFBdUIsTUFBSyxLQUFMLENBQVcsSUFBWCxFQUFpQjtBQUN4Qyx1QkFEd0M7YUFBNUM7QUFHQSxnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLEtBQXdCLEdBQXhCLEVBQTZCO0FBQzdCLHNCQUFLLFFBQUwsQ0FBYztBQUNWLDhCQUFVLENBQVY7QUFDQSw4QkFBVSxJQUFWO0FBQ0EsMkJBQU8sS0FBUDtpQkFISixFQUQ2QjtBQU03QixzQkFBSyxLQUFMLENBQVcsVUFBWCxHQU42QjthQUFqQyxNQU9PO0FBQ0gsc0JBQUssUUFBTCxDQUFjO0FBQ1YsOEJBQVUsQ0FBVjtBQUNBLDJCQUFPLEtBQVA7aUJBRkosRUFERzthQVBQO1NBTFMsQ0EvRU07O0FBRWYsY0FBSyxLQUFMLEdBQWE7QUFDVCxzQkFBVSxDQUFWO0FBQ0EsbUJBQU8sS0FBUDtBQUNBLHNCQUFVLEtBQVY7U0FISixDQUZlO0FBT2YsY0FBSyxHQUFMLEdBQVcsSUFBWCxDQVBlOztLQUFuQjs7aUJBVFM7OzRDQWtCVyxXQUFXO0FBQzNCLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixVQUFVLElBQVYsRUFBZ0I7QUFDcEMscUJBQUssUUFBTCxDQUFjO0FBQ1YsOEJBQVUsS0FBVjtpQkFESixFQURvQzthQUF4Qzs7OztpQ0FNSztBQUNMLG1CQUFPLENBQUMsS0FBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixDQUFDLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBbUIsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBRDVDOzs7OzhDQUdhO0FBQ2xCLGdCQUFJLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBcUI7QUFDckIsdUJBQU8sQ0FBUCxDQURxQjthQUF6QjtBQUdBLGdCQUFJLFFBQVEsS0FBSyxHQUFMLENBQVMsS0FBSyxHQUFMLENBQVMsTUFBTSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLENBQXBDLENBQVQsRUFBaUQsR0FBakQsQ0FBUixDQUpjO0FBS2xCLG1CQUFPLENBQUMsUUFBUSxHQUFSLENBQUQsQ0FBYyxPQUFkLENBQXNCLENBQXRCLENBQVAsQ0FMa0I7Ozs7eUNBT0wsU0FBUztBQUN0QixnQkFBSSxNQUFNLENBQU4sQ0FEa0I7QUFFdEIsbUJBQU8sT0FBUCxFQUFnQjtBQUNaLHVCQUFPLFFBQVEsVUFBUixJQUFzQixDQUF0QixDQURLO0FBRVosMEJBQVUsUUFBUSxVQUFSLENBRkU7YUFBaEI7QUFJQSxtQkFBTyxHQUFQLENBTnNCOzs7O2lDQVFqQixPQUFPO0FBQ1osZ0JBQUksUUFBUSxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQVIsQ0FEUTtBQUVaLGdCQUFJLFNBQVMsTUFBTSxNQUFOLENBQWEsVUFBYixDQUZEO0FBR1osbUJBQU8sTUFBTSxLQUFOLEdBQWMsS0FBSyxnQkFBTCxDQUFzQixNQUF0QixDQUFkLENBSEs7Ozs7eUNBS0MsT0FBTztBQUNwQixnQkFBSSxRQUFRLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBUixDQURnQjtBQUVwQixnQkFBSSxTQUFTLE1BQU0sTUFBTixDQUZPO0FBR3BCLG1CQUFPLE1BQU0sS0FBTixHQUFjLEtBQUssZ0JBQUwsQ0FBc0IsTUFBdEIsQ0FBZCxDQUhhOzs7O3FDQUtYLE9BQU87QUFDaEIsZ0JBQUksTUFBTSxLQUFLLFFBQUwsQ0FBYyxLQUFkLElBQXVCLEtBQUssR0FBTCxDQURqQjtBQUVoQixtQkFBTyxLQUFLLEdBQUwsQ0FBUyxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsQ0FBZCxDQUFULEVBQTJCLEdBQTNCLENBQVAsQ0FGZ0I7Ozs7aUNBc0RYO0FBQ0wsbUJBQU87O2tCQUFLLFdBQVUsaUJBQVYsRUFBTDtnQkFDSDs7c0JBQUssV0FBVyxXQUFXLEtBQUssTUFBTCxLQUFnQixPQUFoQixHQUEwQixFQUExQixDQUFYO0FBQ1osK0JBQU8sRUFBRSxNQUFNLElBQUMsQ0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQXVCLE9BQTNDLEdBQXFELEtBQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsSUFBdEIsRUFBcEU7QUFDQSxzQ0FBZSxLQUFLLFlBQUw7QUFDZixxQ0FBYyxLQUFLLFdBQUw7QUFDZCxvQ0FBYSxLQUFLLFVBQUw7QUFDYixpQ0FBVSxLQUFLLE9BQUw7cUJBTGQ7O2lCQURHO2dCQVVELEtBQUssS0FBTCxDQUFXLElBQVgsR0FDSTs7O0FBQ0UsK0JBQU8sRUFBRSxPQUFPLGtCQUFQLEVBQVQ7QUFDQSxtQ0FBWSxXQUFaO3FCQUZGO29CQUlRLEtBQUssS0FBTCxDQUFXLFFBQVg7aUJBTFosR0FPSTs7O0FBQ0UsK0JBQU8sRUFBRSxPQUFPLHNCQUFzQixLQUFLLG1CQUFMLEVBQXRCLEdBQW1ELEdBQW5ELEVBQWhCO0FBQ0EsbUNBQVksZ0JBQWdCLEtBQUssTUFBTCxLQUFnQixPQUFoQixHQUEwQixFQUExQixDQUFoQjtxQkFGZDtvQkFJUSxLQUFLLEtBQUwsQ0FBVyxTQUFYO2lCQVhaO2FBVk4sQ0FESzs7OztXQTNHQTtFQUFlLE1BQU0sU0FBTjs7SUF5SWY7Ozs7Ozs7Ozs7OzBDQVVTO0FBQ2QsZ0JBQUksS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixNQUFyQixFQUE2QjtBQUM3Qix1QkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRHNCO2FBQWpDO0FBR0EsbUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixDQUpPOzs7O2dDQU1WLEdBQUc7QUFDUCxpQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixDQUF6QixFQURPOzs7O2lDQUdGOzs7QUFDTCxnQkFBSSxTQUFTLEVBQVQsQ0FEQztBQUVMLGlCQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE9BQW5CLENBQTJCLFVBQUMsRUFBRCxFQUFLLEdBQUwsRUFBYTtBQUNwQyxvQkFBSSxNQUFNLEdBQUcsQ0FBSCxDQUFOLENBRGdDO0FBRXBDLG9CQUFJLE9BQU8sR0FBRyxDQUFILENBQVAsQ0FGZ0M7QUFHcEMsb0JBQUksb0JBQW9CLE1BQUMsQ0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixHQUFyQixHQUE0QixTQUE3QixHQUF5QyxFQUF6QyxDQUhZO0FBSXBDLHVCQUFPLElBQVAsQ0FDSTs7O0FBQ0ksNkJBQU0sR0FBTjt1QkFDSSxlQUFlLE9BQUssT0FBTCxDQUFhLElBQWIsU0FBd0IsR0FBeEIsQ0FBZjtBQUNKLG1DQUFZLG1CQUFtQixpQkFBbkI7c0JBSGhCO29CQUtLLElBTEw7aUJBREosRUFKb0M7QUFZcEMsb0JBQUksT0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixNQUFyQixJQUErQixDQUFDLE1BQU0sQ0FBTixDQUFELEdBQVksT0FBSyxLQUFMLENBQVcsT0FBWCxLQUF1QixDQUFuQyxFQUFzQztBQUNyRSwyQkFBTyxJQUFQLENBQVksNEJBQUksS0FBTSxPQUFPLEdBQVAsRUFBVixDQUFaLEVBRHFFO2lCQUF6RTthQVp1QixDQUEzQixDQUZLO0FBa0JMLGdCQUFJLGVBQWUsSUFBQyxDQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFdBQXJCLEdBQW9DLGlCQUFyQyxHQUF5RCx1QkFBekQsQ0FsQmQ7QUFtQkwsZ0JBQUksaUJBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsSUFBckIsR0FBNEIsRUFBNUIsR0FBaUMsV0FBakMsQ0FuQmhCO0FBb0JMLG1CQUFPOztrQkFBSyxXQUFXLG9CQUFvQixZQUFwQixHQUFtQyxjQUFuQyxHQUFvRCxLQUFwRCxHQUE0RCxLQUFLLGVBQUwsR0FBdUIsUUFBdkIsRUFBNUQsRUFBaEI7Z0JBQWtILE1BQWxIO2FBQVAsQ0FwQks7Ozs7NEJBbEJjO0FBQ25CLG1CQUFPO0FBQ0gsdUJBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AseUJBQVMsTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLFVBQXRCO0FBQ1QseUJBQVMsTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1Qsd0JBQVEsTUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1IsK0JBQWUsTUFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO2FBTG5CLENBRG1COzs7O1dBRGQ7RUFBNEIsTUFBTSxTQUFOOztJQTJDNUI7Ozs7Ozs7Ozs7O29DQU9HLEtBQUssS0FBSztBQUNsQixnQkFBSSxTQUFTLEVBQVQsQ0FEYztBQUVsQixpQkFBSyxJQUFJLE1BQU0sR0FBTixFQUFXLE9BQU8sR0FBUCxFQUFZLEVBQUUsR0FBRixFQUFPO0FBQ25DLHVCQUFPLElBQVAsQ0FBWSxDQUFDLEdBQUQsRUFBTSxJQUFJLFFBQUosRUFBTixDQUFaLEVBRG1DO2FBQXZDO0FBR0EsbUJBQU8sTUFBUCxDQUxrQjs7OztpQ0FPYjtBQUNMLG1CQUNJLG9CQUFDLG1CQUFEO0FBQ0kseUJBQVUsS0FBSyxXQUFMLENBQWlCLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUEzQztlQUNLLEtBQUssS0FBTCxDQUZULENBREosQ0FESzs7Ozs0QkFiYztBQUNuQixtQkFBTztBQUNILHFCQUFLLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNMLHFCQUFLLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjthQUZULENBRG1COzs7O1dBRGQ7RUFBaUMsTUFBTSxTQUFOOztJQXdCakM7Ozs7Ozs7Ozs7O29DQU9HLEtBQUssS0FBSztBQUNsQixnQkFBSSxTQUFTLEVBQVQsQ0FEYztBQUVsQixpQkFBSyxJQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsSUFBSSxHQUFKLENBQWpCLEVBQTJCLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBSSxHQUFKLENBQWxCLEVBQTRCLEVBQUUsR0FBRixFQUFPO0FBQ25FLHVCQUFPLElBQVAsQ0FBWSxDQUFDLE1BQU0sQ0FBTixFQUFTLEdBQUMsR0FBTSxDQUFOLEdBQVcsQ0FBQyxNQUFNLENBQU4sQ0FBRCxDQUFVLE9BQVYsQ0FBa0IsQ0FBbEIsQ0FBWixHQUFtQyxLQUFLLEtBQUwsQ0FBVyxNQUFNLENBQU4sQ0FBWCxDQUFvQixRQUFwQixFQUFuQyxDQUF0QixFQURtRTthQUF2RTtBQUdBLG1CQUFPLE1BQVAsQ0FMa0I7Ozs7aUNBT2I7QUFDTCxtQkFDSSxvQkFBQyxtQkFBRDtBQUNJLHlCQUFVLEtBQUssV0FBTCxDQUFpQixLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBM0M7ZUFDSyxLQUFLLEtBQUwsQ0FGVCxDQURKLENBREs7Ozs7NEJBYmM7QUFDbkIsbUJBQU87QUFDSCxxQkFBSyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTCxxQkFBSyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7YUFGVCxDQURtQjs7OztXQURkO0VBQWdDLE1BQU0sU0FBTjs7SUF3QmhDOzs7Ozs7Ozs7OztrQ0FhQztBQUNOLGdCQUFJLEtBQUssS0FBTCxDQUFXLFVBQVgsRUFBdUI7QUFDdkIscUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsRUFBQyxTQUFTLENBQUMsQ0FBRCxFQUFuQyxFQUR1QjthQUEzQixNQUVPO0FBQ0gscUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixDQUFuQixDQUF6QixDQURHO2FBRlA7Ozs7aUNBTUs7QUFDTCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFYLEVBQXVCO0FBQ3ZCLHFCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLEVBQUMsU0FBUyxDQUFULEVBQTFCLEVBRHVCO2FBQTNCLE1BRU87QUFDSCxxQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixLQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLENBQW5CLENBQXpCLENBREc7YUFGUDs7OztpQ0FNSztBQUNMLG1CQUNJOztrQkFBSyxXQUFVLHNCQUFWLEVBQUw7Z0JBQ0k7OztBQUNJLG1DQUFVLGdCQUFWO3VCQUNJLGVBQWUsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFmLEVBRlI7O2lCQURKO2dCQU9JOztzQkFBSyxXQUFVLE9BQVYsRUFBTDtvQkFDTSxLQUFLLEtBQUwsQ0FBVyxLQUFYO2lCQVJWO2dCQVVJOzs7QUFDSSxtQ0FBVSxlQUFWO3VCQUNJLGVBQWUsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFmLEVBRlI7O2lCQVZKO2FBREosQ0FESzs7Ozs0QkExQmM7QUFDbkIsbUJBQU87QUFDSCx1QkFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDUCwrQkFBZSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7QUFDZiw0QkFBWSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7YUFIaEIsQ0FEbUI7Ozs7NEJBT0c7QUFDdEIsbUJBQU87QUFDSCw0QkFBWSxLQUFaO2FBREosQ0FEc0I7Ozs7V0FSakI7RUFBMkIsTUFBTSxTQUFOOztJQWtEM0I7Ozs7Ozs7Ozs7Ozs7OzROQWNULFVBQVUsWUFBTTtBQUNaLGdCQUFJLE9BQUssS0FBTCxDQUFXLFdBQVgsRUFBd0I7QUFDeEIsdUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsRUFBQyxTQUFTLENBQUMsR0FBRCxFQUFuQyxFQUR3QjthQUE1QixNQUVPO0FBQ0gsdUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsS0FBSyxHQUFMLENBQVMsT0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixHQUFuQixFQUF3QixDQUFqQyxDQUF6QixFQURHO2FBRlA7U0FETSxTQU9WLFNBQVMsWUFBTTtBQUNYLGdCQUFJLE9BQUssS0FBTCxDQUFXLFdBQVgsRUFBd0I7QUFDeEIsdUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsRUFBQyxTQUFTLEdBQVQsRUFBMUIsRUFEd0I7YUFBNUIsTUFFTztBQUNILHVCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLEtBQUssR0FBTCxDQUFTLE9BQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsR0FBbkIsRUFBd0IsT0FBSyxLQUFMLENBQVcsY0FBWCxDQUExRCxFQURHO2FBRlA7U0FESyxTQU9ULFNBQVMsWUFBTTtBQUNYLG1CQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLENBQXpCLEVBRFc7U0FBTixTQUdULFlBQVksWUFBTTtBQUNkLG1CQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBekIsQ0FEYztTQUFOOzs7aUJBL0JIOztpQ0FrQ0E7QUFDTCxnQkFBSSxnQkFBZ0IsS0FBSyxHQUFMLENBQVMsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTVDLENBREM7QUFFTCxtQkFDSTs7a0JBQUssV0FBVSw0QkFBVixFQUFMO2dCQUNJOztzQkFBSyxXQUFVLFNBQVYsRUFBTDtvQkFDSTs7O0FBQ0ksdUNBQVUsZUFBVjtBQUNBLHNDQUFXLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsSUFBbkI7MkJBQ1AsZUFBZSxLQUFLLE1BQUwsRUFIdkI7O3FCQURKO29CQVFJOzs7QUFDSSx1Q0FBVSxrQkFBVjtBQUNBLHNDQUFXLGdCQUFnQixJQUFoQjsyQkFDUCxlQUFlLEtBQUssU0FBTCxFQUh2Qjs7cUJBUko7b0JBZUk7OztBQUNJLHVDQUFVLGdCQUFWO0FBQ0Esc0NBQVcsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixJQUFuQjsyQkFDUCxlQUFlLEtBQUssT0FBTCxFQUh2Qjs7cUJBZko7b0JBc0JJOzs7QUFDSSx1Q0FBVSxlQUFWO0FBQ0Esc0NBQVcsS0FBSyxLQUFMLENBQVcsY0FBWCxHQUE0QixLQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLElBQW5COzJCQUNuQyxlQUFlLEtBQUssTUFBTCxFQUh2Qjs7cUJBdEJKO2lCQURKO2dCQStCSTs7c0JBQUssV0FBVSxPQUFWLEVBQUw7b0JBQ00sZ0JBQ08sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixPQUExQixDQUFrQyxDQUFsQyxZQUEwQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE9BQWpCLENBQXlCLENBQXpCLENBRGpELEdBRUksS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixDQUF6QixDQUZKO2lCQWhDVjthQURKLENBRks7Ozs7NEJBakNjO0FBQ25CLG1CQUFPO0FBQ0gsdUJBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1AsZ0NBQWdCLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNoQiw2QkFBYSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDYiwrQkFBZSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBckI7YUFKbkIsQ0FEbUI7Ozs7NEJBUUc7QUFDdEIsbUJBQU87QUFDSCw2QkFBYSxLQUFiO2FBREosQ0FEc0I7Ozs7V0FUakI7RUFBZ0MsTUFBTSxTQUFOOztBQThFN0MsSUFBSSxjQUFjLEVBQWQ7O0lBRVM7Ozs7OzRCQUNjO0FBQ25CLG1CQUFPO0FBQ0gsMEJBQVUsTUFBTSxTQUFOLENBQWdCLE1BQWhCO2FBRGQsQ0FEbUI7Ozs7QUFLdkIsYUFOUyxTQU1ULENBQVksS0FBWixFQUFtQjs4QkFOVixXQU1VOzs0RUFOVixzQkFPQyxRQURTOztBQUVmLGVBQUssS0FBTCxHQUFhLFlBQVksT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFaLElBQW9DO0FBQzdDLG9CQUFRLEtBQVI7QUFDQSxtQkFBTyxDQUFQO0FBQ0EsdUJBQVcsTUFBWDtBQUNBLHNCQUFVLElBQVY7U0FKUyxDQUZFO0FBUWYsWUFBSSxPQUFLLEtBQUwsQ0FBVyxNQUFYLEVBQW1CO0FBQ25CLG1CQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQXNCLFlBQVksT0FBSyxJQUFMLENBQVUsSUFBVixRQUFaLEVBQWtDLEVBQWxDLENBQXRCO0FBRG1CLFNBQXZCO3NCQVJlO0tBQW5COztpQkFOUzs7K0NBa0JjO0FBQ25CLDBCQUFjLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBZCxDQURtQjtBQUVuQix3QkFBWSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQVosR0FBbUMsS0FBSyxLQUFMLENBRmhCOzs7OzhCQUlqQjtBQUNGLG1CQUFPLElBQUssSUFBSixFQUFELENBQWEsT0FBYixFQUFQLENBREU7Ozs7aUNBR0c7QUFDTCxpQkFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixLQUFLLElBQUwsRUFBcEIsR0FBa0MsS0FBSyxLQUFMLEVBQWxDLENBREs7Ozs7Z0NBR0Q7QUFDSixpQkFBSyxRQUFMLENBQWM7QUFDVix3QkFBUSxJQUFSO0FBQ0EsMEJBQVUsS0FBSyxHQUFMLEtBQWEsS0FBSyxLQUFMLENBQVcsS0FBWDtBQUN2QiwwQkFBVSxZQUFZLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxJQUFmLENBQVosRUFBa0MsRUFBbEMsQ0FBVjthQUhKLEVBREk7Ozs7K0JBT0Q7QUFDSCwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQWQsQ0FERztBQUVILGlCQUFLLFFBQUwsQ0FBYztBQUNWLHdCQUFRLEtBQVI7QUFDQSx1QkFBTyxLQUFLLEtBQUwsRUFBUDthQUZKLEVBRkc7Ozs7Z0NBT0M7QUFDSiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQWQsQ0FESTtBQUVKLGlCQUFLLFFBQUwsQ0FBYztBQUNWLHdCQUFRLEtBQVI7QUFDQSx1QkFBTyxDQUFQO2FBRkosRUFGSTs7OztnQ0FPQTtBQUNKLG1CQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FDQSxLQUFLLEdBQUwsS0FBYSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQ2QsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUhGOzs7OytCQUtEO0FBQ0gsZ0JBQUksWUFBWSxLQUFLLEtBQUwsRUFBWixDQUREO0FBRUgsZ0JBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCO0FBQ2hDLHFCQUFLLFFBQUwsQ0FBYztBQUNWLDJCQUFPLEtBQUssS0FBTCxFQUFQO2lCQURKLEVBRGdDO2FBQXBDOzs7OzRCQU1BLEtBQUssTUFBTTtBQUNYLGdCQUFJLElBQUksU0FBUyxJQUFJLFFBQUosRUFBVCxDQURHO0FBRVgsbUJBQU8sRUFBRSxNQUFGLENBQVMsRUFBRSxNQUFGLEdBQVcsSUFBWCxDQUFoQixDQUZXOzs7O3NDQUlEO0FBQ1YsZ0JBQUksTUFBTSxLQUFLLEtBQUwsRUFBTixDQURNO0FBRVYsZ0JBQUksSUFBSSxDQUFKO2dCQUFPLElBQUksQ0FBSixDQUZEO0FBR1YsZ0JBQUksU0FBUyxFQUFULENBSE07QUFJVixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFPLEtBQUssSUFBTCxDQUFQLENBQWYsQ0FKVTtBQUtWLG1CQUFPLEtBQUssSUFBTCxDQUxHO0FBTVYsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBTSxJQUFOLENBQWYsQ0FOVTtBQU9WLG1CQUFPLEVBQUUsUUFBRixLQUFlLEdBQWYsR0FBcUIsS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFZLENBQVosQ0FBckIsQ0FQRzs7OztpQ0FTTDtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLFdBQVYsRUFBTDtnQkFDSTs7O0FBQ0ksbUNBQVUsZ0NBQVY7dUJBQ0ksZUFBZSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQWYsRUFGUjtvQkFJTSxlQUFFLGdDQUFGLENBSk47aUJBREo7Z0JBT0k7OztBQUNJLG1DQUFZLHFDQUFxQyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFNBQXBCLEdBQWdDLEVBQWhDLENBQXJDO3VCQUNSLGVBQWUsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFmLEVBRlI7b0JBSU0sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixlQUFFLCtCQUFGLENBQXBCLEdBQXlELGVBQUUsZ0NBQUYsQ0FBekQ7aUJBWFY7Z0JBYUk7O3NCQUFLLFdBQVUsTUFBVixFQUFMO29CQUNNLEtBQUssV0FBTCxFQUROO2lCQWJKO2FBREosQ0FESzs7OztXQTNFQTtFQUFrQixNQUFNLFNBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcclxuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIERpc2NpcGxpbmVSZXN1bHRzVGFibGUsXHJcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlLFxyXG4gICAgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlLFxyXG59IGZyb20gXCIuL3Jvc2ZhcnIvZGlzY2lwbGluZV9yZXN1bHRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHNpZ25hbChtZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuICgoKSA9PiB0aGlzLnByb3BzLm9uU2lnbmFsKG1lc3NhZ2UpKS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyB0aGlzLnNpZ25hbChcImRvY3hcIikgfT5cclxuICAgICAgICAgICAgICAgIERPQ1hcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVuZGVyZXI6IFwicGFnZVwiLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXphdGlvblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJ1bnNfbG9hZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZS5nZXREb21haW4oXCJkaXNjaXBsaW5lX3Jlc3VsdHNfXCIgKyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpO1xyXG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZFN0YXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJ0b3VyX3Jlc3VsdHNfY2hhbmdlZCByZWxvYWRfZGF0YVwiLCBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0b3VyX3N0b3JhZ2UgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKS5ieV9pZChtZXNzYWdlW1widG91cl9pZFwiXSk7XHJcbiAgICAgICAgICAgIGlmICghdG91cl9zdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRvdXJfc3RvcmFnZS5kaXNjaXBsaW5lLmlkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5hdXRvRG9jeCkge1xyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxfaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzLnByaW50YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4LmNhbGxiYWNrKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XHJcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJkaXNjaXBsaW5lX3Jlc3VsdHNfXCIgKyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpO1xyXG4gICAgfVxyXG4gICAgcmVsb2FkU3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmRpc2NpcGxpbmVfcmVzdWx0cykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5ydW5zX2xvYWRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdG9yYWdlX3J1bnMgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiUnVuXCIpXHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSB0aGlzLnN0YXRlLmRpc2NpcGxpbmVfcmVzdWx0cztcclxuICAgICAgICBsZXQgbmV3X3N0YXRlID0gW11cclxuICAgICAgICB2YXIgU0NIRU1BID0ge1xyXG4gICAgICAgICAgICB0b3VyOiB7fSxcclxuICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcclxuICAgICAgICAgICAgICAgIHNwb3J0c21lbjoge30sXHJcbiAgICAgICAgICAgICAgICBjbHViOiB7fSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIG5ld19zdGF0ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHBsYWNlOiByZXN1bHRzW2ldLnBsYWNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBzdG9yYWdlX3J1bnMuYnlfaWQocmVzdWx0c1tpXS5ydW5faWQpLnNlcmlhbGl6ZShTQ0hFTUEpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGxvYWRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgdGFibGU6IG5ld19zdGF0ZSxcclxuICAgICAgICAgICAgZGlzY2lwbGluZTogdGhpcy5zdG9yYWdlLmdldChcIkRpc2NpcGxpbmVcIikuYnlfaWQodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKS5zZXJpYWxpemUoe1xyXG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRSZXN1bHRzKCkge1xyXG4gICAgICAgIEFwaShcImRpc2NpcGxpbmUuZ2V0X3Jlc3VsdHNcIiwge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub25TdWNjZXNzKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX3Jlc3VsdHM6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWRTdGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcImRpc2NpcGxpbmUuZ2V0XCIsIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjoge1xyXG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxyXG4gICAgICAgICAgICAgICAgdG91cnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBydW5zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hZGRUb0RCKFwiRGlzY2lwbGluZVwiLCB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQsIHRoaXMuc3RvcmFnZSlcclxuICAgICAgICAub25TdWNjZXNzKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ydW5zX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU3RhdGUodGhpcylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuZXJzXHJcblxyXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZSkge1xyXG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyaW5nXHJcblxyXG4gICAgcmVuZGVyQm9keSgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMucmVuZGVyZXIpIHtcclxuICAgICAgICBjYXNlIFwicHJlc2VudGVyXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSByZWY9XCJtYWluX3RhYmxlXCIgLz5cclxuICAgICAgICBjYXNlIFwic2NyZWVuX29wZXJhdG9yXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlXHJcbiAgICAgICAgICAgICAgICB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQbGFjZT17IHRoaXMucHJvcHMuc2VsZWN0ZWRQbGFjZSB9XHJcbiAgICAgICAgICAgICAgICBvblBsYWNlU2VsZWN0PXsgdGhpcy5wcm9wcy5vblBsYWNlU2VsZWN0IH1cclxuICAgICAgICAgICAgICAgIHJlZj1cIm1haW5fdGFibGVcIiAvPlxyXG4gICAgICAgIGNhc2UgXCJwYWdlXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8UHJpbnRhYmxlXHJcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICB0aXRsZTE9eyBfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUzPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgYm9keT17IDxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9IC8+IH0gLz5cclxuICAgICAgICBjYXNlIFwidGFibGVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9IHJlZj1cIm1haW5fdGFibGVcIiAvPlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvc29ydC1jb21wXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmxvYWRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj48TG9hZGVyIC8+PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHMuZG9jeFwiKSB7XHJcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcclxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUxKF8oXCJhZG1pbi5oZWFkZXJzLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSlcclxuICAgICAgICAgICAgLnNldFRpdGxlMyh0aGlzLnN0YXRlLmRpc2NpcGxpbmUubmFtZSlcclxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5yZWZzLnByaW50YWJsZS5mZXRjaFByaW50YWJsZURhdGEoKSlcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdXItbmFtZVwiLCBcImJhY2tncm91bmRcIiwgXCIjZGRkXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwicGFkZGluZ1wiLCBcIjBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNwb3J0c21lblwiLCBcIndpZHRoXCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAuc2F2ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgb25Ub3VjaEVuZE9yQ2xpY2sgfSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5mdW5jdGlvbiBfXygpIHtcclxuICAgIGxldCBhcmdzID0gW107XHJcbiAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXyhcInNjb3Jpbmdfc3lzdGVtcy5yb3NmYXJyLlwiICsgYXJndW1lbnRzWzBdLCAuLi5hcmdzKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUm93SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xyXG4gICAgICAgIGxldCBuZWVkX3JlbmRlciA9ICh0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIpIHx8IChwcmV2X3Jvdy5ydW4udG91ci5pZCAhPT0gbmV4dF9yb3cucnVuLnRvdXIuaWQpXHJcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9Pjx0aCBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBjb2xTcGFuPVwiNlwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9PC9wPlxyXG4gICAgICAgIDwvdGg+PC90cj47XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3cocm93KSB7XHJcbiAgICAgICAgbGV0IHAgPSByb3cucnVuLnBhcnRpY2lwYW50O1xyXG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJSXCIgKyByb3cucnVuLmlkIH0+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggcGxhY2VcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcm93LnBsYWNlID09PSBudWxsID8gXCJcIiA6IHJvdy5wbGFjZSB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggbnVtYmVyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHAubnVtYmVyIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzZcIiBjb2xTcGFuPVwiMlwiPlxyXG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNwb3J0c21lblwiPjx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICB7IHAuZm9ybWF0aW9uX25hbWUgPyA8dHI+PHRoIGNvbFNwYW49XCIyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBwLmZvcm1hdGlvbl9uYW1lIH08L3A+PC90aD48L3RyPiA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgcC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+IDx0ciBrZXk9eyBpZHggfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNzVcIj48cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHMuc3Vic3RpdHV0ZSA/IDxpPiAoeyBfKFwiYWRtaW4ubGFiZWxzLnN1YlwiKSB9Lik8L2k+IDogbnVsbCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBzLnllYXJfb2ZfYmlydGggfTwvcD48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+ICkgfVxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjbHViXCI+PHA+eyBwLmNsdWIubmFtZSB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI0IGNvYWNoZXNcIj48cD57IHAuY29hY2hlcy5zcGxpdChcIixcIikubWFwKChjKSA9PiBbYy50cmltKCksIDxiciBrZXk9XCJYXCIgLz5dKSB9PC9wPjwvdGQ+XHJcbiAgICAgICAgPC90cj47XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3dzKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgLSAxXSwgdGFibGVbaV0pO1xyXG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yN1wiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5cIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy05XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NvYWNoZXNcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0b2dnbGVBY3RpdmUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogIXRoaXMuc3RhdGUuYWN0aXZlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBwID0gdGhpcy5wcm9wcy5wYXJ0aWNpcGFudDtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT17IFwicm93XCIgKyAoIHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy50b2dnbGVBY3RpdmUuYmluZCh0aGlzKSl9Pjx0Ym9keT5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgcm93U3Bhbj1cIjNcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucGxhY2UgPT09IG51bGwgPyBcIlwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57IHRoaXMucHJvcHMucGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZS1sYWJlbFwiPnsgXyhcInByZXNlbnRlci5sYWJlbHMucGxhY2VcIikgfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gfVxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj57IHAubnVtYmVyIH08L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHAubmFtZSB9PC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIiBjb2xTcGFuPVwiMlwiPnsgcC5jbHViLm5hbWUgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjb2FjaGVzXCIgY29sU3Bhbj1cIjJcIj57IHAuY29hY2hlcyB9PC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcclxuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cucnVuLnRvdXIuaWQgIT09IG5leHRfcm93LnJ1bi50b3VyLmlkKVxyXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGtleT17IFwiSFwiICsgbmV4dF9yb3cucnVuLmlkIH0+XHJcbiAgICAgICAgICAgIHsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3cocm93KSB7XHJcbiAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlUm93IGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcm93LnJ1bi5wYXJ0aWNpcGFudCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlPXsgcm93LnBsYWNlIH0gLz5cclxuICAgIH1cclxuICAgIHJlbmRlclJvd3MoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhYmxlLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpICsgMV0sIHRhYmxlW2ldKTtcclxuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBwID0gdGhpcy5wcm9wcy5wYXJ0aWNpcGFudDtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT17IFwicm93XCIgKyAoIHRoaXMucHJvcHMuc2VsZWN0ZWQgPyBcIiBzZWxlY3RlZFwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMucHJvcHMub25DbGljayl9Pjx0Ym9keT5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgcm93U3Bhbj1cIjJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucGxhY2UgPT09IG51bGwgPyBcIlwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57IHRoaXMucHJvcHMucGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZS1sYWJlbFwiPnsgXyhcInByZXNlbnRlci5sYWJlbHMucGxhY2VcIikgfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gfVxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj57IHAubnVtYmVyIH08L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHAubmFtZSB9PC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIiBjb2xTcGFuPVwiMlwiPnsgcC5jbHViLm5hbWUgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcclxuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cucnVuLnRvdXIuaWQgIT09IG5leHRfcm93LnJ1bi50b3VyLmlkKVxyXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGtleT17IFwiSFwiICsgbmV4dF9yb3cucnVuLmlkIH0+XHJcbiAgICAgICAgICAgIHsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3cocm93LCBwbGFjZSkge1xyXG4gICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlUm93XHJcbiAgICAgICAgICAgIGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9XHJcbiAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcm93LnJ1bi5wYXJ0aWNpcGFudCB9XHJcbiAgICAgICAgICAgIHBsYWNlPXsgcm93LnBsYWNlIH1cclxuICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMub25QbGFjZVNlbGVjdChwbGFjZSkgfVxyXG4gICAgICAgICAgICBzZWxlY3RlZD17IHRoaXMucHJvcHMuc2VsZWN0ZWRQbGFjZSAhPT0gbnVsbCAmJiBwbGFjZSA+PSB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfSAvPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93cygpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGFibGUubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgKyAxXSwgdGFibGVbaV0pO1xyXG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0sIGkgKyAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JlZW5NYW5pZmVzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYXdfbWFuaWZlc3QpIHtcclxuICAgICAgICB0aGlzLnJhd19kYXRhID0gcmF3X21hbmlmZXN0O1xyXG4gICAgICAgIHRoaXMuaWR4X2J5X2lkID0ge307XHJcbiAgICAgICAgdGhpcy5yYXdfZGF0YS5zY3JlZW5zLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4gdGhpcy5pZHhfYnlfaWRbaXRlbS5pZF0gPSBpZHgpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NyZWVuRGF0YUJ5SWQoaWQsIGlzX2RlZmF1bHQ9ZmFsc2UpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5yYXdfZGF0YS5zY3JlZW5zW3RoaXMuaWR4X2J5X2lkW2lkXV07XHJcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKGlzX2RlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd19kYXRhLnNjcmVlbnNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdFNjcmVlbkRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGdldERlZmF1bHRTY3JlZW5EYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNjcmVlbkRhdGFCeUlkKHRoaXMucmF3X2RhdGFbXCJkZWZhdWx0XCJdLCB0cnVlKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JlZW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgbWFuaWZlc3Q6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG5ldyBTY3JlZW5NYW5pZmVzdCh0aGlzLnByb3BzLm1hbmlmZXN0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjdXJyZW50X3NjcmVlbjogdGhpcy5tYW5pZmVzdC5nZXREZWZhdWx0U2NyZWVuRGF0YSgpLFxyXG4gICAgICAgICAgICBuZXh0X3NjcmVlbjogbnVsbCxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5nZXRcIiwgeyBjb21wZXRpdGlvbl9pZDogdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZCwgY2hpbGRyZW46IHt9IH0pXHJcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiQ29tcGV0aXRpb25cIiwgdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZClcclxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcclxuICAgICAgICBsZXQgbmV3X2RhdGEgPSBzdG9yYWdlLmdldChcIkNvbXBldGl0aW9uXCIpLmJ5X2lkKHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpLnNlcmlhbGl6ZSh7fSkuc2NyZWVuX2RhdGE7XHJcbiAgICAgICAgaWYgKG5ld19kYXRhLnNjcmVlbl9pZCAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50X3NjcmVlbi5pZCAmJiBuZXdfZGF0YS5zY3JlZW5faWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY3JlZW4obmV3X2RhdGEuc2NyZWVuX2lkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVcmxCeVNjcmVlbkRhdGEoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBcIi9tZWRpYS9zY3JlZW4vXCIgKyBkYXRhLnRlbXBsYXRlICsgXCIjXCIgKyB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlU2NyZWVuKG5ld19pZCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBuZXh0X3NjcmVlbjogdGhpcy5tYW5pZmVzdC5nZXRTY3JlZW5EYXRhQnlJZChuZXdfaWQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoRnJhbWVzKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjdXJyZW50X3NjcmVlbjogdGhpcy5zdGF0ZS5uZXh0X3NjcmVlbixcclxuICAgICAgICAgICAgbmV4dF9zY3JlZW46IG51bGwsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwib3V0ZXJcIj5cclxuICAgICAgICAgICAgPGlmcmFtZSBzcmM9eyB0aGlzLmdldFVybEJ5U2NyZWVuRGF0YSh0aGlzLnN0YXRlLmN1cnJlbnRfc2NyZWVuKSB9XHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgdGhpcy5nZXRVcmxCeVNjcmVlbkRhdGEodGhpcy5zdGF0ZS5jdXJyZW50X3NjcmVlbikgfSAvPlxyXG4gICAgICAgICAgICB7IHRoaXMuc3RhdGUubmV4dF9zY3JlZW5cclxuICAgICAgICAgICAgICAgID8gPGlmcmFtZSBzcmM9eyB0aGlzLmdldFVybEJ5U2NyZWVuRGF0YSh0aGlzLnN0YXRlLm5leHRfc2NyZWVuKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgdGhpcy5nZXRVcmxCeVNjcmVlbkRhdGEodGhpcy5zdGF0ZS5uZXh0X3NjcmVlbikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTG9hZD17IHRoaXMuc3dpdGNoRnJhbWVzLmJpbmQodGhpcykgfSAvPlxyXG4gICAgICAgICAgICAgICAgOiBudWxsIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgb25Ub3VjaE9yQ2xpY2ssIG9uVG91Y2hFbmRPckNsaWNrIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IGNsb25lIH0gZnJvbSBcImNvbW1vbi90b29sc1wiO1xyXG5pbXBvcnQgeyBTY3JlZW5NYW5pZmVzdCB9IGZyb20gXCJjbGllbnRzL3NjcmVlbi9tYWluXCI7XHJcbmltcG9ydCB7IERpc2NpcGxpbmVSZXN1bHRzIH0gZnJvbSBcImFkbWluL2p1ZGdpbmcvZGlzY2lwbGluZV9yZXN1bHRzXCI7XHJcblxyXG5cclxuY2xhc3MgU2NyZWVuT3BlcmF0b3JUb3VyU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtudWxsXSksXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgb25TZWxlY3RUb3VyID0gKHRvdXJfaWQpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRvdXJfaWQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRGlzY2lwbGluZShkaXNjaXBsaW5lKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lXCIga2V5PXsgZGlzY2lwbGluZS5pZCB9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBkaXNjaXBsaW5lLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvdXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbm5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGRpc2NpcGxpbmUudG91cnMubWFwKHRvdXIgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTY3JlZW5PcGVyYXRvclRvdXJTZWxlY3RvclRvdXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyB0b3VyLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfdG91cj17IHRoaXMucHJvcHMudmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsgdGhpcy5vblNlbGVjdFRvdXIgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXNlbGVjdG9yXCI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY29tcGV0aXRpb24uZGlzY2lwbGluZXMubWFwKGRpc2NpcGxpbmUgPT5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckRpc2NpcGxpbmUoZGlzY2lwbGluZSlcclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNjcmVlbk9wZXJhdG9yVG91clNlbGVjdG9yVG91ciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3VyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkX3RvdXI6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtudWxsXSksXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBvblNlbGVjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblNlbGVjdCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMudG91ci5pZCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGNsYXNzX25hbWUgPSBcInRvdXJcIjtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLmlkID09PSB0aGlzLnByb3BzLnNlbGVjdGVkX3RvdXIpIHtcclxuICAgICAgICAgICAgY2xhc3NfbmFtZSArPSBcIiBzZWxlY3RlZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBjbGFzc19uYW1lICs9IFwiIGFjdGl2ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLmZpbmFsaXplZCkge1xyXG4gICAgICAgICAgICBjbGFzc19uYW1lICs9IFwiIGZpbmFsaXplZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfSB7Li4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy5vblNlbGVjdCl9PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNjcmVlbk9wZXJhdG9yRGlzY2lwbGluZVBsYWNlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnByb3BzLmNvbXBldGl0aW9uLmRpc2NpcGxpbmVzLmZvckVhY2goKGRpc2NpcGxpbmUpID0+XHJcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXsgZGlzY2lwbGluZS5pZCB9IGtleT17IGRpc2NpcGxpbmUuaWQgfT5cclxuICAgICAgICAgICAgICAgIHsgZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgPC9vcHRpb24+KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIDxzZWxlY3QgdmFsdWU9eyB0aGlzLnByb3BzLnZhbHVlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKGUpID0+IHRoaXMucHJvcHMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUgfHwgbnVsbCkgfT5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPi0tLS0tLS0tLS08L29wdGlvbj5cclxuICAgICAgICAgICAgeyBvcHRpb25zIH1cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2NyZWVuT3BlcmF0b3JIZWF0U2VsZWN0b3JSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGhlYXQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcnVuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT17IFwiaGVhdFwiICsgKHRoaXMucHJvcHMuc2VsZWN0ZWQgPyBcIiBzZWxlY3RlZFwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgey4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMucHJvcHMub25DbGljayl9PlxyXG4gICAgICAgICAgICA8dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImhlYXQtbnVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj57IHRoaXMucHJvcHMuaGVhdCB9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWF0LWxhYmVsXCI+eyBfKFwic2NyZWVuX29wZXJhdG9yLmxhYmVscy5oZWF0XCIpIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJ1bnMubWFwKChydW4pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIiBrZXk9eyBydW4uaWQgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBydW4ucGFydGljaXBhbnQubnVtYmVyIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPnsgcnVuLnBhcnRpY2lwYW50Lm5hbWUgfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTY3JlZW5PcGVyYXRvckhlYXRTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3VyX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgb25IZWF0U2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0b3VyOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91cl9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwidG91cl9cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XHJcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91cl9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcclxuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihcInRvdXJfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xyXG4gICAgfVxyXG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UoKSB7XHJcbiAgICAgICAgdmFyIFNDSEVNQSA9IHtcclxuICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHt9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIilcclxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcclxuICAgICAgICAgICAgLnNlcmlhbGl6ZShTQ0hFTUEpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b3VyOiBzZXJpYWxpemVkIH0pO1xyXG4gICAgfVxyXG4gICAgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xyXG4gICAgICAgICAgICB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWQsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiB7XHJcbiAgICAgICAgICAgICAgICBydW5zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHt9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkVG9EQihcIlRvdXJcIiwgdGhpcy5wcm9wcy50b3VyX2lkLCB0aGlzLnN0b3JhZ2UpXHJcbiAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXHJcbiAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyX2lkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgbWF4X2hlYXQgPSBNYXRoLm1heCguLi50aGlzLnN0YXRlLnRvdXIucnVucy5tYXAoKHJ1bikgPT4gcnVuLmhlYXQpKTtcclxuICAgICAgICBmb3IgKGxldCBoZWF0ID0gMTsgaGVhdCA8PSBtYXhfaGVhdDsgKytoZWF0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxTY3JlZW5PcGVyYXRvckhlYXRTZWxlY3RvclJvd1xyXG4gICAgICAgICAgICAgICAga2V5PXsgaGVhdCB9XHJcbiAgICAgICAgICAgICAgICBydW5zPXsgdGhpcy5zdGF0ZS50b3VyLnJ1bnMuZmlsdGVyKChydW4pID0+IHJ1bi5oZWF0ID09PSBoZWF0KSB9XHJcbiAgICAgICAgICAgICAgICBoZWF0PXsgaGVhdCB9XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17IHRoaXMucHJvcHMudmFsdWUgPT09IGhlYXQgfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMub25IZWF0U2VsZWN0KGhlYXQpIH0gLz4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImhlYXQtc2VsZWN0b3JcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi13YXJuaW5nIGJ0bi1yZXNldC1oZWF0XCJcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKCgpID0+IHRoaXMucHJvcHMub25IZWF0U2VsZWN0KG51bGwpKSB9PlxyXG4gICAgICAgICAgICAgICAgeyBfKFwic2NyZWVuX29wZXJhdG9yLmJ1dHRvbnMucmVzZXRfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICB7IHJlc3VsdCB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNjcmVlbk9wZXJhdG9yUGxhY2VTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICAgICAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi13YXJuaW5nIGJ0bi1yZXNldC1wbGFjZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoRW5kT3JDbGljaygoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG51bGwpKSB9PlxyXG4gICAgICAgICAgICAgICAgeyBfKFwic2NyZWVuX29wZXJhdG9yLmJ1dHRvbnMucmVzZXRfcGxhY2VcIikgfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPERpc2NpcGxpbmVSZXN1bHRzXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2lkPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkIH1cclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyPVwic2NyZWVuX29wZXJhdG9yXCJcclxuICAgICAgICAgICAgICAgIG9uUGxhY2VTZWxlY3Q9eyAocGxhY2UpID0+IHRoaXMucHJvcHMub25DaGFuZ2UocGxhY2UpIH1cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGxhY2U9eyB0aGlzLnByb3BzLnZhbHVlIH1cclxuICAgICAgICAgICAgICAgIGtleT17IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCB9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNjcmVlbk9wZXJhdG9yVG91ckhlYXRDb250cm9scyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb250cm9sc19zdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgb25Ub3VyQ2hhbmdlKG5ld192YWx1ZSkge1xyXG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBjbG9uZSh0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlKTtcclxuICAgICAgICBuZXdfc3RhdGUudG91cl9pZCA9IG5ld192YWx1ZTtcclxuICAgICAgICBuZXdfc3RhdGUuaGVhdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgb25IZWF0Q2hhbmdlKG5ld192YWx1ZSkge1xyXG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBjbG9uZSh0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlKTtcclxuICAgICAgICBuZXdfc3RhdGUuaGVhdCA9IG5ld192YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld19zdGF0ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMz57IF8oXCJzY3JlZW5fb3BlcmF0b3IuaGVhZGVycy50b3VyXCIpIH08L2gzPlxyXG4gICAgICAgICAgICA8U2NyZWVuT3BlcmF0b3JUb3VyU2VsZWN0b3JcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbiB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUudG91cl9pZCB9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25Ub3VyQ2hhbmdlLmJpbmQodGhpcykgfSAvPlxyXG4gICAgICAgICAgICA8aDM+eyBfKFwic2NyZWVuX29wZXJhdG9yLmhlYWRlcnMuaGVhdFwiKSB9PC9oMz5cclxuICAgICAgICAgICAgPFNjcmVlbk9wZXJhdG9ySGVhdFNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICBrZXk9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQgfVxyXG4gICAgICAgICAgICAgICAgdG91cl9pZD17IHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUudG91cl9pZCB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUuaGVhdCB9XHJcbiAgICAgICAgICAgICAgICBvbkhlYXRTZWxlY3Q9eyB0aGlzLm9uSGVhdENoYW5nZS5iaW5kKHRoaXMpIH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2NyZWVuT3BlcmF0b3JUb3VyQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIG9uVG91ckNoYW5nZShuZXdfdmFsdWUpIHtcclxuICAgICAgICBsZXQgbmV3X3N0YXRlID0gY2xvbmUodGhpcy5wcm9wcy5jb250cm9sc19zdGF0ZSk7XHJcbiAgICAgICAgbmV3X3N0YXRlLnRvdXJfaWQgPSBuZXdfdmFsdWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8aDM+eyBfKFwic2NyZWVuX29wZXJhdG9yLmhlYWRlcnMudG91clwiKSB9PC9oMz5cclxuICAgICAgICAgICAgPFNjcmVlbk9wZXJhdG9yVG91clNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IHRoaXMucHJvcHMuY29tcGV0aXRpb24gfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQgfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uVG91ckNoYW5nZS5iaW5kKHRoaXMpIH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2NyZWVuT3BlcmF0b3JEaXNjaXBsaW5lUGxhY2VDb250cm9scyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb250cm9sc19zdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgb25EaXNjaXBsaW5lQ2hhbmdlKG5ld192YWx1ZSkge1xyXG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBjbG9uZSh0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlKTtcclxuICAgICAgICBuZXdfc3RhdGUuZGlzY2lwbGluZV9pZCA9IG5ld192YWx1ZTtcclxuICAgICAgICBuZXdfc3RhdGUucGxhY2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3X3N0YXRlKTtcclxuICAgIH1cclxuICAgIG9uUGxhY2VDaGFuZ2UobmV3X3ZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IGNsb25lKHRoaXMucHJvcHMuY29udHJvbHNfc3RhdGUpO1xyXG4gICAgICAgIG5ld19zdGF0ZS5wbGFjZSA9IG5ld192YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld19zdGF0ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMz57IF8oXCJzY3JlZW5fb3BlcmF0b3IuaGVhZGVycy5kaXNjaXBsaW5lXCIpIH08L2gzPlxyXG4gICAgICAgICAgICA8U2NyZWVuT3BlcmF0b3JEaXNjaXBsaW5lUGxhY2VTZWxlY3RvclxyXG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb249eyB0aGlzLnByb3BzLmNvbXBldGl0aW9uIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5jb250cm9sc19zdGF0ZS5kaXNjaXBsaW5lX2lkIH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkRpc2NpcGxpbmVDaGFuZ2UuYmluZCh0aGlzKSB9IC8+XHJcbiAgICAgICAgICAgIDxoMz57IF8oXCJzY3JlZW5fb3BlcmF0b3IuaGVhZGVycy5wbGFjZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgIDxTY3JlZW5PcGVyYXRvclBsYWNlU2VsZWN0b3JcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLmRpc2NpcGxpbmVfaWQgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLmNvbnRyb2xzX3N0YXRlLnBsYWNlIH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vblBsYWNlQ2hhbmdlLmJpbmQodGhpcykgfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NyZWVuT3BlcmF0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgbWFuaWZlc3Q6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG5ldyBTY3JlZW5NYW5pZmVzdCh0aGlzLnByb3BzLm1hbmlmZXN0KVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBwZW5kaW5nX2RhdGE6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLmdldFwiLCB7IGNvbXBldGl0aW9uX2lkOiB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkLCBjaGlsZHJlbjoge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lczoge1xyXG4gICAgICAgICAgICAgICAgdG91cnM6IHt9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0gfSlcclxuICAgICAgICAgICAgLmFkZFRvREIoXCJDb21wZXRpdGlvblwiLCB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkKVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHN1Ym1pdERhdGEoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLnBlbmRpbmdfZGF0YSB8fCB0aGlzLnN0YXRlLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhO1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZUNvbnRyb2xzKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQXBpKFwiY29tcGV0aXRpb24uc2V0XCIsIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgc2NyZWVuX2RhdGE6IHRoaXMuc3RhdGUucGVuZGluZ19kYXRhIH1cclxuICAgICAgICB9KS5vblN1Y2Nlc3MoKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBlbmRpbmdfZGF0YTogbnVsbCxcclxuICAgICAgICB9KSkuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcmVzZXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwZW5kaW5nX2RhdGE6IG51bGwsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IHN0b3JhZ2UuZ2V0KFwiQ29tcGV0aXRpb25cIilcclxuICAgICAgICAgICAgICAgIC5ieV9pZCh0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkKVxyXG4gICAgICAgICAgICAgICAgLnNlcmlhbGl6ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cnM6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXREZWZhdWx0Q29udHJvbHNTdGF0ZShjb250cm9sc190eXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChjb250cm9sc190eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJub25lXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge31cclxuICAgICAgICAgICAgY2FzZSBcInRvdXItaGVhdFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYXQ6IDEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0b3VyXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJkaXNjaXBsaW5lLXBsYWNlXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlRGF0YSh1cGRhdGVyKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLnBlbmRpbmdfZGF0YSA/IGNsb25lKHRoaXMuc3RhdGUucGVuZGluZ19kYXRhKSA6IGNsb25lKHRoaXMuc3RhdGUuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEpO1xyXG4gICAgICAgIGRhdGEgPSB1cGRhdGVyKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwZW5kaW5nX2RhdGE6IGRhdGEsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2hTY3JlZW4obmV3X2lkKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNjcmVlbl9pZCAhPT0gbmV3X2lkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyZWVuX2RhdGEgPSB0aGlzLm1hbmlmZXN0LmdldFNjcmVlbkRhdGFCeUlkKG5ld19pZClcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sc190eXBlID0gc2NyZWVuX2RhdGEuY29udHJvbHM7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbl9pZDogbmV3X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiB0aGlzLmdldERlZmF1bHRDb250cm9sc1N0YXRlKGNvbnRyb2xzX3R5cGUpLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uQ29udHJvbHNTdGF0ZUNoYW5nZShuZXdfdmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZGF0YS5jb250cm9sc19zdGF0ZSA9IG5ld192YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB2YWxpZGF0ZUNvbnRyb2xzKGRhdGEpIHtcclxuICAgICAgICBsZXQgY29udHJvbHNfdHlwZSA9IHRoaXMubWFuaWZlc3QuZ2V0U2NyZWVuRGF0YUJ5SWQoZGF0YS5zY3JlZW5faWQpLmNvbnRyb2xzO1xyXG4gICAgICAgIHN3aXRjaCAoY29udHJvbHNfdHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJub25lXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGNhc2UgXCJ0b3VyXCI6XHJcbiAgICAgICAgY2FzZSBcInRvdXItaGVhdFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkICE9PSBudWxsO1xyXG4gICAgICAgIGNhc2UgXCJkaXNjaXBsaW5lLXBsYWNlXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmNvbnRyb2xzX3N0YXRlLmRpc2NpcGxpbmVfaWQgIT09IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyQ29udG9scyhkYXRhKSB7XHJcbiAgICAgICAgbGV0IGNvbnRyb2xzX3R5cGUgPSB0aGlzLm1hbmlmZXN0LmdldFNjcmVlbkRhdGFCeUlkKGRhdGEuc2NyZWVuX2lkKS5jb250cm9scztcclxuICAgICAgICBzd2l0Y2ggKGNvbnRyb2xzX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIm5vbmVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgIGNhc2UgXCJ0b3VyLWhlYXRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8U2NyZWVuT3BlcmF0b3JUb3VySGVhdENvbnRyb2xzXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgZGF0YS5zY3JlZW5faWQgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgdGhpcy5zdGF0ZS5jb21wZXRpdGlvbiB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU9eyBkYXRhLmNvbnRyb2xzX3N0YXRlIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25Db250cm9sc1N0YXRlQ2hhbmdlLmJpbmQodGhpcykgfSAvPlxyXG4gICAgICAgICAgICBjYXNlIFwidG91clwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxTY3JlZW5PcGVyYXRvclRvdXJDb250cm9sc1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGRhdGEuc2NyZWVuX2lkIH1cclxuICAgICAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IHRoaXMuc3RhdGUuY29tcGV0aXRpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlPXsgZGF0YS5jb250cm9sc19zdGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ29udHJvbHNTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpIH0gLz5cclxuICAgICAgICAgICAgY2FzZSBcImRpc2NpcGxpbmUtcGxhY2VcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8U2NyZWVuT3BlcmF0b3JEaXNjaXBsaW5lUGxhY2VDb250cm9sc1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGRhdGEuc2NyZWVuX2lkIH1cclxuICAgICAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IHRoaXMuc3RhdGUuY29tcGV0aXRpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlPXsgZGF0YS5jb250cm9sc19zdGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ29udHJvbHNTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpIH0gLz5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcGV0aXRpb24gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLnBlbmRpbmdfZGF0YSB8fCB0aGlzLnN0YXRlLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhO1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNjcmVlbi1vcGVyYXRvclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtY29sXCI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMubWFuaWZlc3QucmF3X2RhdGEuc2NyZWVucy5tYXAoKHNjcmVlbl9kYXRhKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJpdGVtXCIgKyAoc2NyZWVuX2RhdGEuaWQgPT09IGRhdGEuc2NyZWVuX2lkID8gXCIgYWN0aXZlXCIgOiBcIlwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHNjcmVlbl9kYXRhLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljaygoKSA9PiB0aGlzLnN3aXRjaFNjcmVlbihzY3JlZW5fZGF0YS5pZCkpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzY3JlZW5fZGF0YS5uYW1lIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2xzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckNvbnRvbHMoZGF0YSkgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUucGVuZGluZ19kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgPyA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMucmVzZXREYXRhLmJpbmQodGhpcykpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5idXR0b25zLmRpc2NhcmRcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgIXRoaXMudmFsaWRhdGVDb250cm9scyhkYXRhKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuc3VibWl0RGF0YS5iaW5kKHRoaXMpKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwuYnV0dG9ucy5zdWJtaXRcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGwgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG4iLCJjbGFzcyBEb2N4SW1wbCB7XG4gICAgY29uc3RydWN0b3IoZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUxID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMyA9IG51bGw7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYm9keSA9IFwiXCI7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBcInBvcnRyYWl0XCI7XG4gICAgICAgIHRoaXMuc3R5bGVzID0ge1xuICAgICAgICAgICAgXCJib2R5XCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtZmFtaWx5XCI6IFwiQ2FsaWJyaSwgVGFob21hLCBBcmlhbCwgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGFibGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IFwiY29sbGFwc2VcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJcIjoge1xuICAgICAgICAgICAgICAgIFwicGFnZS1icmVhay1pbnNpZGVcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGQsIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogXCIxcHQgM3B0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2XCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstYWZ0ZXJcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDFcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDJcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoM1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCI0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImg0IHBcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogXCIxMHB0IDAgNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNSBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEycHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiNnB0IDBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi5oZWFkZXJcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWJvdHRvbVwiOiBcIjFweCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmctYm90dG9tXCI6IFwiMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicFwiOiB7XG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxpXCI6IHsgXCJtYXJnaW4tdG9wXCI6IDAsIFwicGFkZGluZy10b3BcIjogMCB9LFxuICAgICAgICAgICAgXCIuc3BhY2VyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi52YS10b3BcIjoge1xuICAgICAgICAgICAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0b3BcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWxlZnRcIjogeyBcInRleHQtYWxpZ25cIjogXCJsZWZ0XCIgfSxcbiAgICAgICAgICAgIFwiLnRleHQtcmlnaHRcIjogeyBcInRleHQtYWxpZ25cIjogXCJyaWdodFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWNlbnRlclwiOiB7IFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICBcIi5ib3JkZXJlZC10YWJsZSB0ZCwgLmJvcmRlcmVkLXRhYmxlIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFwdCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFdpZHRoQ3NzKCk7XG4gICAgfVxuICAgIGFkZFdpZHRoQ3NzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5hZGRTdHlsZShcIi53LVwiICsgaSwgXCJ3aWR0aFwiLCBpICsgXCIlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkU3R5bGUoc2VsZWN0b3IsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXVtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUxKHRpdGxlMSkge1xuICAgICAgICB0aGlzLnRpdGxlMSA9IHRpdGxlMTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMih0aXRsZTIpIHtcbiAgICAgICAgdGhpcy50aXRsZTIgPSB0aXRsZTI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTModGl0bGUzKSB7XG4gICAgICAgIHRoaXMudGl0bGUzID0gdGl0bGUzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0TWFyZ2lucyhtYXJnaW5zKSB7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRCb2R5KGJvZHkpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgZGF0YSkge1xuICAgICAgICBsZXQgY3NzX3BhaXJzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubWFwKChrZXkpID0+IGtleSArICc6ICcgKyBkYXRhW2tleV0gKyAnOyAnKVxuICAgICAgICByZXR1cm4gc2VsZWN0b3IgKyBcIiB7IFwiICsgY3NzX3BhaXJzLmpvaW4oXCIgXCIpICsgXCIgfVwiO1xuICAgIH1cbiAgICByZW5kZXJTdHlsZXMoKSB7XG4gICAgICAgIGxldCBjc3NfYmxvY2tzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5zdHlsZXMpLm1hcCgoXG4gICAgICAgICAgICAoc2VsZWN0b3IpID0+IHRoaXMucmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgdGhpcy5zdHlsZXNbc2VsZWN0b3JdKVxuICAgICAgICApLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gY3NzX2Jsb2Nrcy5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICByZW5kZXJIVE1MKCkge1xuICAgICAgICBsZXQgY3NzID0gdGhpcy5yZW5kZXJTdHlsZXMoKTtcbiAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMuaGVhZGVyID8gJzxwIGNsYXNzPVwiaGVhZGVyXCI+JyArIHRoaXMuaGVhZGVyICsgJzwvcD4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMSA9IHRoaXMudGl0bGUxID8gJzxoMT4nICsgdGhpcy50aXRsZTEgKyAnPC9oMT4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMiA9IHRoaXMudGl0bGUyID8gJzxoMj4nICsgdGhpcy50aXRsZTIgKyAnPC9oMj4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMyA9IHRoaXMudGl0bGUzID8gJzxoMz4nICsgdGhpcy50aXRsZTMgKyAnPC9oMz4nIDogXCJcIjtcbiAgICAgICAgbGV0IHNwYWNlciA9IChoZWFkZXIgfHwgdGl0bGUxIHx8IHRpdGxlMiB8fCB0aXRsZTMpID8gJzxwIGNsYXNzPVwic3BhY2VyXCI+Jm5ic3A7PC9wPicgOiBcIlwiO1xuICAgICAgICByZXR1cm4gXCI8IURPQ1RZUEUgaHRtbD5cXG5cIiArXG4gICAgICAgICAgICBcIjxodG1sPjxoZWFkPlwiICtcbiAgICAgICAgICAgICAgICBcIjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIj5cIiArXG4gICAgICAgICAgICAgICAgXCI8c3R5bGU+XFxuXCIgKyBjc3MgKyBcIlxcbjwvc3R5bGU+XFxuXCIgK1xuICAgICAgICAgICAgXCI8L2hlYWQ+PGJvZHk+XFxuXCIgK1xuICAgICAgICAgICAgICAgIGhlYWRlciArXG4gICAgICAgICAgICAgICAgdGl0bGUxICtcbiAgICAgICAgICAgICAgICB0aXRsZTIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMyArXG4gICAgICAgICAgICAgICAgc3BhY2VyICtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkgK1xuICAgICAgICAgICAgXCI8L2JvZHk+PC9odG1sPlwiO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJIVE1MKCk7XG4gICAgICAgIGxldCBtYXJnaW5zID0gdGhpcy5tYXJnaW5zIHx8ICh0aGlzLm9yaWVudGF0aW9uID09PSBcInBvcnRyYWl0XCIgPyBbMTAsIDE1LCAxMCwgMTVdIDogWzcsIDEwLCA3LCAxMF0pO1xuICAgICAgICBsZXQgY29udmVydGVkID0gaHRtbERvY3guYXNCbG9iKGh0bWwsIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLm9yaWVudGF0aW9uLFxuICAgICAgICAgICAgbWFyZ2luczoge1xuICAgICAgICAgICAgICAgIHRvcDogICAgTWF0aC5mbG9vcihtYXJnaW5zWzBdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAgTWF0aC5mbG9vcihtYXJnaW5zWzFdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogTWF0aC5mbG9vcihtYXJnaW5zWzJdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICAgTWF0aC5mbG9vcihtYXJnaW5zWzNdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2F2ZUFzKGNvbnZlcnRlZCwgdGhpcy5maWxlbmFtZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCB2YXIgRG9jeCA9IChmbikgPT4gbmV3IERvY3hJbXBsKGZuKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuY2xhc3MgQ21wQ2hhaW5JbXBsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSAwO1xuICAgIH1cbiAgICBjbXAoYSwgYikge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHQgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgQ21wQ2hhaW4gPSAoKSA9PiBuZXcgQ21wQ2hhaW5JbXBsKCk7XG4iLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcclxuXHJcbmV4cG9ydCB2YXIgXyA9IHRyYW5zbGF0ZTtcclxuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC30LDQutGA0YvRgtCw0Y8g0LLQtdGA0YHQuNGPINC00LvRjyDQvtCz0YDQsNC90LjRh9C10L3QvdC+0LPQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjykgJm1kYXNoOyDRgdC40YHRgtC10LzQsCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDRgNC10LfRg9C70YzRgtCw0YLQvtCyINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDQv9C+INCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC+0LzRgyDRgNC+0Lot0L0t0YDQvtC70LvRgy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JDQstGC0L7RgNGB0LrQuNC1INC/0YDQsNCy0LAg0L3QsCDRgdC40YHRgtC10LzRgyBSb2NrSnVkZ2Ug0L/QvtC70L3QvtGB0YLRjNGOINC/0YDQuNC90LDQtNC70LXQttCw0YIg0YDQsNC30YDQsNCx0L7RgtGH0LjQutGDINCQ0YDRgtC10LzRgyDQmtCw0LfQsNC60L7QstGDLiDQodC+0LDQstGC0L7RgCDRgdC40YHRgtC10LzRiyDQkNC90YLQvtC9INCQ0LzQtdC70LjQvS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0KHQuNGB0YLQtdC80LAg0YDQsNGB0L/RgNC+0YHRgtGA0LDQvdGP0LXRgtGB0Y8g0L/QviDQu9C40YbQtdC90LfQuNC4IExpbnVtIGQuby5vIChpbmZvQGxpbnVtLmhyKS4g0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsCBSb2NrSnVkZ2Ug0L3QtdC+0LHRhdC+0LTQuNC80L4g0Lgg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LjQvNC10YLRjCDQv9GA0LDQstC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLIExpbnVtIExQUy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7RhNC40YbQuNCw0LvRjNC90YvQuSDRgdCw0LnRgjogPGEgaHJlZj1cImh0dHBzOi8vcm9ja2p1ZGdlLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwczovL3JvY2tqdWRnZS5jb20vPC9hPjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX25vdF9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQvdC10LTQvtGB0YLRg9C/0L3QsCDQvdCwINGN0YLQvtC8INC60L7QvNC/0YzRgtC10YDQtS5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPtCk0LjQvdCw0LvQuNC30LDRhtC40Y8g0LTQvtC70LbQvdCwINC+0YLQvNC10L3Rj9GC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDQuNGB0LrQu9GO0YfQuNGC0LXQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFITwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcclxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcclxuICAgICAgICAgICAgICAgICAgICDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INC4INC90LUg0L/RgNC+0YjQtdC00YjQuNGFINC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INCx0YPQtNGD0YIg0LHQtdC30LLQvtC30LLRgNCw0YLQvdC+INGD0YLQtdGA0Y/QvdGLITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZVwiOiBcItCe0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NsdWJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQutC70YPQsT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9qdWRnZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YHRg9C00YzRjj9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOINGC0YPRgNCwPyDQktCy0LXQtNC40YLQtSDCq3VuZmluYWxpemXCuywg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiBcItCeINC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LrQu9GD0LHQsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2luZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtGD0YDQvdC40YDQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9uYW1lXCI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc1wiOiBcItCU0LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fcHJvZ3JhbV9sb2FkZWRcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQvdC1INC30LDQs9GA0YPQttC10L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNcIjogXCLQo9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFzdGVfYWNyb1wiOiBcItCS0YHRgtCw0LLRjNGC0LUg0LTQsNC90L3Ri9C1INC40Lcg0LrQsNC70YzQutGD0LvRj9GC0L7RgNCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zcG9ydHNtZW5fb25seVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3VtbWFyeVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDQutC+0LvQuNGH0LXRgdGC0LLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJcIjogXCLQt9Cw0L9cIiwgIC8vIHN1YnN0aXR1dGVcclxuICAgICAgICAgICAgICAgIFwidG91cnNcIjogXCLQotGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9wYXNzY29kZVwiOiBcItCS0LLQtdC00ZHQvSDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQv9C+0YLQstC10YDQttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZW51XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jbHVic1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfZGlzY2lwbGluZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2p1ZGdlc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9wYXJ0aWNpcGFudHNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC/0L7RgNGC0YHQvNC10L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3RvdXJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YLRg9GA0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibl9wYXJ0aWNpcGFudHNcIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuXCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQv9Cw0YHQvSR7IGNob29zZUVuZGluZyhzLCBcItC+0LlcIiwgXCLRi9GFXCIsIFwi0YvRhVwiKSB9KWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5fc2hvcnRcIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/LilgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX25fcGFydGljaXBhbnRzXCI6IG4gPT4gXCLQmNGC0L7Qs9C+IFwiICsgbiArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnaW5nLXRhYnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3VyLWFkbWluXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmUtcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVycm9yc1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3N5bnRheF9lcnJvclwiOiBcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZHVwbGljYXRlZF9leHRlcm5hbF9pZFwiOiBcItCSINC00LDQvdC90YvRhSDQuNC80LXRjtGC0YHRjyDQt9Cw0L/QuNGB0Lgg0YEg0L/QvtCy0YLQvtGA0Y/RjtGJ0LjQvNC40LzRgdGPIGV4dGVybmFsX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuYWJsZV90b19nZXRcIjogKHdhbnRlZCkgPT4gXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C+0LvRg9GH0LjRgtGMIFwiICsgd2FudGVkICsgXCIg0LjQtyDQt9Cw0L/RgNC+0YHQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQutC70YPQsSwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90Ysg0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfbm9uX2VtcHR5XCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1LCDRgdC+0LTQtdGA0LbQsNGJ0LXQtSDQtNC40YHRhtC40L/Qu9C40L3Riywg0LrQu9GD0LHRiyDQuNC70Lgg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b29fbWFueV90b3Vyc1wiOiAoZCkgPT4gW1wi0J7RiNC40LHQutCwINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIiwgYNCSINC00LjRgdGG0LjQv9C70LjQvdC1ICR7ZH0g0YHQvtC00LXRgNC20LjRgtGB0Y8g0LHQvtC70YzRiNC1INGC0YPRgNC+0LIsINGH0LXQvCDRgdC+0LfQtNCw0L3QviDQsiDRgdC40YHRgtC10LzQtWBdLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2Rpc2NpcGxpbmVfZm91bmRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YssINC+0YLRgdGD0YLRgdGC0LLRg9GO0YnQuNC1INCyINGB0LjRgdGC0LXQvNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNoYW5nZV9qdWRnZXNfd2l0aF9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHQvtGB0YLQsNCyINGB0YPQtNC10Lkg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLLCDRgdC+0LTQtdGA0LbQsNGJ0LXQuSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsCwg0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0YXQvtGC0Y8g0LHRiyDQsiDQvtC00L3QvtC8INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Njb3Jpbmdfc3lzdGVtXCI6IFwi0JLRi9Cx0YDQsNC90LAg0L3QtdC00L7Qv9GD0YHRgtC40LzQsNGPINGB0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGluZ1wiOiBcItCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9wcm9ibGVtXCI6IFwi0J/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcclxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fZXJyb3JcIjogXCLQn9C+0YXQvtC20LUsINC40LzQtdGO0YLRgdGPINC/0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBcItCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCk0L7RgNC80LXQudGI0L0g4oSWXCIgKyBuLnRvU3RyaW5nKCkgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCLQo9GH0LDRgdGC0L3QuNC6IOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdpbmdcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQmNC30LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJ1bGVzX3NldFwiOiBcItCh0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcIlRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C7XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGFXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlc19sZWdlbmRcIjogKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LTEwMFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JPQuyDigJQg0LPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KIg4oCUINGB0YPQtNGM0Y8g0YLQsNC90YbQsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JAg4oCUINGB0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60Lg8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiZXgg4oCUINGC0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCLQmtCw0YLQtdCz0L7RgNC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX25hbWVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfZlwiOiBcItCWXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQvtC80LDQvdC00Ysg0YTQvtGA0LzQtdC50YjQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21hblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgi5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFzZV9uYW1lXCI6IFwi0KDQvtGB0KTQkNCg0KBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IFNjcmVlbk9wZXJhdG9yIH0gZnJvbSBcImNsaWVudHMvc2NyZWVuX29wZXJhdG9yL21haW5cIjtcblxuXG5SZWFjdERPTS5yZW5kZXIoXG4gICAgPFNjcmVlbk9wZXJhdG9yIHsgLi4ud2luZG93LnBhZ2VfcHJvcHMgfSAvPixcbiAgICB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXG4pO1xuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5cclxuY2xhc3MgQXBpSW1wbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSAobXNnLCBjb2RlLCBhcmdzKSA9PiBzaG93RXJyb3IoY29kZSA/IF8oY29kZSwgLi4uYXJncykgOiBtc2cpO1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9ICguLi5kYXRhKSA9PiBjb25zb2xlLmVycm9yKFwiQVBJIGZhaWxcIiwgLi4uZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuICAgIG9uRG9uZShjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25TdWNjZXNzKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkVycm9yKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25GYWlsKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhZGRUb0RCKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBzdD1zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBzdC5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2VuZCgpIHtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiL2FwaVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5jbGllbnRfaWQpIHtcclxuICAgICAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XHJcbiAgICAgICAgeGhyLnNlbmQoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgQXBpID0gKC4uLmFyZ3MpID0+IG5ldyBBcGlJbXBsKC4uLmFyZ3MpO1xyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvbl9zdGF0dXMgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc19jbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0Li4uXCIpO1xyXG4gICAgICAgIHRoaXMud3MgPSBuZXcgU29ja0pTKFwiaHR0cDovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi93c1wiKTtcclxuICAgICAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRPaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC5cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtbXCJyZWxvYWRfZGF0YVwiLCBudWxsXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsX3VwZGF0ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRGYWlsKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGFbXCJjbGllbnRfaWRcIl0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsaWVudF9pZCA9IGRhdGFbXCJjbGllbnRfaWRcIl07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1zZ190eXBlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgbGV0IG1zZ19kYXRhID0gZGF0YVsxXTtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKG1zZ190eXBlID09PSBcImZvcmNlX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge30pLmZvckVhY2goKGtleSkgPT4gbGlzdGVuZXJzW2tleV0obXNnX2RhdGEpKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBkYXRhLm1vZGVsX3VwZGF0ZXMuZm9yRWFjaCgobW9kZWxfaW5mbykgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSBzdG9yYWdlLnVwZGF0ZU1vZGVsKG1vZGVsX2luZm8ubW9kZWwsIG1vZGVsX2luZm8uaWQsIG1vZGVsX2luZm8uZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkYXRhX2NoYW5nZWQpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW1wiZGJfdXBkYXRlXCJdIHx8IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TGlzdGVuZXJJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnNfY250Kys7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcihtc2dfdHlwZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRMaXN0ZW5lcklkKCk7XHJcbiAgICAgICAgbXNnX3R5cGVzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZ190eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV1baWRdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcl9pZCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNba2V5XVtsaXN0ZW5lcl9pZF07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmlmICghd2luZG93Lm1lc3NhZ2VfZGlzcGF0Y2hlcikge1xyXG4gICAgd2luZG93Lm1lc3NhZ2VfZGlzcGF0Y2hlciA9IG5ldyBNZXNzYWdlRGlzcGF0Y2hlcigpO1xyXG59XHJcbmV4cG9ydCB2YXIgbWVzc2FnZV9kaXNwYXRjaGVyID0gd2luZG93Lm1lc3NhZ2VfZGlzcGF0Y2hlcjtcclxuIiwiY2xhc3MgUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBpZCwgbW9kZWxfc3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZEJhY2tSZWYoa2V5LCByZWYpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSByZWY7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIgfHwgaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWZfa2V5ID0gZGF0YVtpZHhdLmJhY2tfcmVmO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWYuZ2V0KCkuYWRkQmFja1JlZihiYWNrX3JlZl9rZXksIGJhY2tfcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiKlwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZF9kYXRhID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXJpYWxpemUoc2NoZW1hKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9fa2V5X3R5cGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBcIipcIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0ubWFwKGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl5cIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdID0gbmV3IE1vZGVsKHRoaXMuc3RvcmFnZSwgaWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGJ5X2lkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2lkXTtcclxuICAgIH1cclxuICAgIGFsbCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubW9kZWxzKTtcclxuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzID0ge31cclxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxyXG4gICAgfVxyXG4gICAgZ2V0RG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBkZWxEb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZ2V0KG1vZGVsX25hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIGRlbChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGVNb2RlbChtb2RlbF90eXBlLCBtb2RlbF9pZCwgZGF0YSkge1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIGRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZG9tYWluc1trZXldLnVwZGF0ZU1vZGVsKC4uLmFyZ3VtZW50cykgfHwgZGF0YV9jaGFuZ2VkKTtcclxuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBcInRleHRBbGlnblwiOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzTW9jayB7XHJcbiAgICBzZXRPaygpIHt9XHJcbiAgICBzZXRGYWlsKCkge31cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBcImNvbm5lY3RlZFwiOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uX3N0YXR1c1wiKTtcclxuICAgICAgICBpZiAoZWxlbWVudCAmJiAhZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcclxuICAgICAgICAgICAgICAgIDxDb25uZWN0aW9uU3RhdHVzIC8+LFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25TdGF0dXNNb2NrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRpY2s6ICF0aGlzLnN0YXRlLnRpY2ssXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDc1MCk7XHJcbiAgICB9XHJcbiAgICBzdG9wSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0T2soKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiB0cnVlLCB0aWNrOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHNldEZhaWwoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIG9rXCI+PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW5nXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC1kYW5nZXJcIiArICh0aGlzLnN0YXRlLnRpY2sgPyBcIiB0aWNrXCIgOiBcIlwiKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGlvbl9wcm9ibGVtXCIpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIGNvbm5lY3Rpb25fc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5pbml0KCk7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xyXG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XHJcbiAgICBsZXQgdGV4dCA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1sxXSA6IG1zZztcclxuICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93Q29uZmlybShtZXNzYWdlLCBhY3Rpb24sIGNsb3NlX29uX2NvbmZpcm09ZmFsc2UpIHtcclxuICAgIHJldHVybiBzd2FsKHtcclxuICAgICAgICB0aXRsZTogbWVzc2FnZSxcclxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcclxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKSxcclxuICAgICAgICBjbG9zZU9uQ29uZmlybTogY2xvc2Vfb25fY29uZmlybSxcclxuICAgIH0sIGFjdGlvbik7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFByaW50YWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTE6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZldGNoUHJpbnRhYmxlRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvZHkuaW5uZXJIVE1MO1xuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmhlYWRlciA/IDxkaXYgY2xhc3NOYW1lPVwicC1oZWFkZXJcIj57IHRoaXMucHJvcHMuaGVhZGVyIH08L2Rpdj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMSA/IDxoMT57IHRoaXMucHJvcHMudGl0bGUxIH08L2gxPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUyID8gPGgyPnsgdGhpcy5wcm9wcy50aXRsZTIgfTwvaDI+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTMgPyA8aDM+eyB0aGlzLnByb3BzLnRpdGxlMyB9PC9oMz4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtY29udGVudFwiXG4gICAgICAgICAgICAgICAgcmVmPXsgZSA9PiB0aGlzLl9ib2R5ID0gZSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmJvZHkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcmludGFibGVcIj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUxKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTMoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoT3JDbGljayhoYW5kbGVyKSB7XHJcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBmLFxyXG4gICAgICAgIG9uQ2xpY2s6IGYsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoRW5kT3JDbGljayhoYW5kbGVyLCBwcmV2ZW50X2RlZmF1bHQpIHtcclxuICAgIGxldCBfaGFuZGxlciA9ICgpID0+IHt9O1xyXG4gICAgbGV0IGRpc3RhbmNlID0gMDtcclxuICAgIGxldCBsYXRlc3RfcG9zID0gWzAsIDBdO1xyXG4gICAgbGV0IGZpcmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBfaGFuZGxlcigpO1xyXG4gICAgfVxyXG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XHJcbiAgICAgICAgX2hhbmRsZXIgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xyXG4gICAgICAgIGxldCBzcXIgPSAoeCkgPT4geCAqIHg7XHJcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xyXG4gICAgICAgIGxhdGVzdF9wb3MgPSBjdXJyZW50X3BvcztcclxuICAgICAgICBpZiAoZGlzdGFuY2UgPiAyMCkge1xyXG4gICAgICAgICAgICBkaXNjYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgIGRpc3RhbmNlID0gMDtcclxuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgIG9uVG91Y2hFbmQ6IGZpcmUsXHJcbiAgICAgICAgb25Ub3VjaE1vdmU6IG1vdmUsXHJcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVyLFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvbmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICBkb25lVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgc2xpZGVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBvbkFjdGl2YXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5waW4gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNGcmVlKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS50b3VjaCAmJiAhdGhpcy5wcm9wcy5kb25lICYmICF0aGlzLnN0YXRlLmZpbmlzaGVkO1xyXG4gICAgfVxyXG4gICAgZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5taW4oTWF0aC5tYXgoMTAwIC0gdGhpcy5zdGF0ZS5wb3NpdGlvbiwgMCksIDEwMCk7XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAvIDEwMCkudG9GaXhlZCgzKTtcclxuICAgIH1cclxuICAgIGdldEVsZW1lbnRPZmZzZXQoZWxlbWVudCkge1xyXG4gICAgICAgIGxldCByZXMgPSAwO1xyXG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJlcyArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICAgIGdldFRvdWNoKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XHJcbiAgICB9XHJcbiAgICBnZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2xpZGVyUG9zKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0VG91Y2goZXZlbnQpIC0gdGhpcy5waW47XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIDIwMCk7XHJcbiAgICB9XHJcbiAgICBvbkNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBvc2lzaW9uOiAyMDAsXHJcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICBvblRvdWNoU3RhcnQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcclxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblRvdWNoTW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblRvdWNoRW5kID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wb3NpdGlvbiA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzbGlkZXIgbm9zZWxlY3RcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5uZXJcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIil9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiAodGhpcy5wcm9wcy5kb25lIHx8IHRoaXMuc3RhdGUuZmluaXNoZWQpID8gXCIyMDBweFwiIDogdGhpcy5zdGF0ZS5wb3NpdGlvbiArIFwicHhcIiB9fVxyXG4gICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgdGhpcy5vblRvdWNoU3RhcnQgfVxyXG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9eyB0aGlzLm9uVG91Y2hNb3ZlIH1cclxuICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9eyB0aGlzLm9uVG91Y2hFbmQgfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMub25DbGljayB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIOKGklxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVcclxuICAgICAgICAgICAgICAgID8gPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2IoMTAwLDEwMCwxMDApXCIgfX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImRvbmUtdGV4dFwiIH1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVRleHQgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgOiA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYmEoMTAwLDEwMCwxMDAsXCIgKyB0aGlzLmdldE91dGVyVGV4dE9wYWNpdHkoKSArIFwiKVwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJzbGlkZS10ZXh0XCIgKyAodGhpcy5pc0ZyZWUoKSA/IFwiIGZyZWVcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2xpZGVUZXh0IH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldFNlbGVjdG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIGNob2ljZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByb3dTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm93U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hvaWNlcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBvbkNsaWNrKG4pIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUobik7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2hvaWNlcy5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBlbFswXTtcclxuICAgICAgICAgICAgbGV0IHRleHQgPSBlbFsxXTtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZV9jbGFzc19uYW1lID0gKHRoaXMucHJvcHMudmFsdWUgPT09IGtleSkgPyBcIiBhY3RpdmVcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGtleSB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25DbGljay5iaW5kKHRoaXMsIGtleSkpfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBzY29yZS1idG5cIiArIGFjdGl2ZV9jbGFzc19uYW1lIH1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7dGV4dH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIiAmJiAoaWR4ICsgMSkgJSB0aGlzLnByb3BzLnJvd1NpemUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxiciBrZXk9eyBcImJyXCIgKyBpZHggfSAvPilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsYXlvdXRfY2xhc3MgPSAodGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIikgPyBcInNlbGVjdG9yLWxheW91dFwiIDogXCJzZWxlY3Rvci1sYXlvdXQtMnJvd3NcIjtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRfY2xhc3MgPSB0aGlzLnByb3BzLnZhbHVlID09PSBudWxsID8gXCJcIiA6IFwiIHNlbGVjdGVkXCJcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wic2NvcmluZy1sYXlvdXQgXCIgKyBsYXlvdXRfY2xhc3MgKyBzZWxlY3RlZF9jbGFzcyArIFwiIG4tXCIgKyB0aGlzLmdldEJ1dHRvbnNDb3VudCgpLnRvU3RyaW5nKCkgfT57IHJlc3VsdCB9PC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSBtaW47IGlkeCA8PSBtYXg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHgsIGlkeC50b1N0cmluZygpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IE1hdGgucm91bmQoMiAqIG1pbik7IGlkeCA8PSBNYXRoLnJvdW5kKDIgKiBtYXgpOyArK2lkeCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4IC8gMiwgKGlkeCAlIDIpID8gKGlkeCAvIDIpLnRvRml4ZWQoMSkgOiBNYXRoLmZsb29yKGlkeCAvIDIpLnRvU3RyaW5nKCldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VuZERlbHRhczogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25NaW51cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25QbHVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDF9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1pbnRlZ2VyLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnZhbHVlIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cy5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICArXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0QWNyb092ZXJyaWRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb3JpZ2luYWxfdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2VuZF9kZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZW5kX2RlbHRhczogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25NaW51cyA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kX2RlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTAuNX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShNYXRoLm1heCh0aGlzLnByb3BzLnZhbHVlIC0gMC41LCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25QbHVzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmRfZGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAwLjV9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoTWF0aC5taW4odGhpcy5wcm9wcy52YWx1ZSArIDAuNSwgdGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uWmVybyA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoMCk7XHJcbiAgICB9XHJcbiAgICBvblJlc3RvcmUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZV9jaGFuZ2VkID0gTWF0aC5hYnModGhpcy5wcm9wcy52YWx1ZSAtIHRoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWFjcm8tb3ZlcnJpZGUtaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4temVyb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy52YWx1ZSA8IDAuMDUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblplcm8pfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAg4oaTMFxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcmVzdG9yZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdmFsdWVfY2hhbmdlZCA8IDAuMDUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblJlc3RvcmUpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAg4oaRXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy52YWx1ZSA8IDAuMDUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICZtaW51cztcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUgPCB0aGlzLnByb3BzLnZhbHVlICsgMC4wNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICArXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlX2NoYW5nZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBgJHt0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlLnRvRml4ZWQoMSl9IOKGkiAke3RoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy52YWx1ZS50b0ZpeGVkKDEpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBzdG9wd2F0Y2hlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3BXYXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yZV9pZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdIHx8IHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgIHN0cl92YWx1ZTogXCIwOjAwXCIsXHJcbiAgICAgICAgICAgIGludGVydmFsOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaXJlY3QtbXV0YXRpb24tc3RhdGVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdID0gdGhpcy5zdGF0ZTtcclxuICAgIH1cclxuICAgIG5vdygpIHtcclxuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgIH1cclxuICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA/IHRoaXMuc3RvcCgpIDogdGhpcy5zdGFydCgpO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxyXG4gICAgICAgICAgICBpbnRlcnZhbDogc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlXHJcbiAgICAgICAgICAgID8gKHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnN0YXJ0X2F0KVxyXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aWNrKCkge1xyXG4gICAgICAgIHZhciBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlKCk7XHJcbiAgICAgICAgaWYgKG5ld192YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBhZChudW0sIHNpemUpIHtcclxuICAgICAgICB2YXIgcyA9IFwiMDAwMFwiICsgbnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gc2l6ZSk7XHJcbiAgICB9XHJcbiAgICBnZXRTdHJWYWx1ZSgpIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZSgpO1xyXG4gICAgICAgIHZhciBtID0gMCwgcyA9IDA7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcclxuICAgICAgICB2YWwgJT0gNjAgKiAxMDAwO1xyXG4gICAgICAgIHMgPSBNYXRoLmZsb29yKHZhbCAvIDEwMDApO1xyXG4gICAgICAgIHJldHVybiBtLnRvU3RyaW5nKCkgKyAnOicgKyB0aGlzLnBhZChzLCAyKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3B3YXRjaFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMucmVzZXQuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBidG4tdG9nZ2xlIGlnbm9yZS1yZWFkb25seVwiICsgKHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMudG9nZ2xlLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmUgPyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF9zdG9wd2F0Y2hcIikgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4iXX0=
