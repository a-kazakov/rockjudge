(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutoPrinter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _dialogs = require("ui/dialogs");

var _tools = require("common/tools");

var _docx = require("common/docx");

var _heats = require("../judging/heats");

var _tour_results = require("../judging/tour_results");

var _discipline_results = require("../judging/discipline_results");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoPrinterTableCell = function (_React$Component) {
    _inherits(AutoPrinterTableCell, _React$Component);

    function AutoPrinterTableCell() {
        _classCallCheck(this, AutoPrinterTableCell);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterTableCell).apply(this, arguments));
    }

    _createClass(AutoPrinterTableCell, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "td",
                { className: "input" },
                React.createElement("input", {
                    type: "text",
                    value: this.props.value,
                    onChange: function onChange(e) {
                        return _this2.props.onChange(parseInt(e.target.value.replace(/[^\d]/, "")) || 0);
                    } })
            );
        }
    }]);

    return AutoPrinterTableCell;
}(React.Component);

var AutoPrinterTableRow = function (_React$Component2) {
    _inherits(AutoPrinterTableRow, _React$Component2);

    function AutoPrinterTableRow() {
        _classCallCheck(this, AutoPrinterTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterTableRow).apply(this, arguments));
    }

    _createClass(AutoPrinterTableRow, [{
        key: "onChange",
        value: function onChange(action, new_value) {
            var new_row = (0, _tools.clone)(this.props.row);
            new_row[action] = new_value;
            this.props.onChange(new_row);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "discipline" },
                    this.props.tour.discipline.name + " — " + this.props.tour.name
                ),
                this.props.possibleActions.map(function (action) {
                    return React.createElement(AutoPrinterTableCell, {
                        key: action,
                        value: _this4.props.row[action] || "",
                        onChange: _this4.onChange.bind(_this4, action) });
                })
            );
        }
    }]);

    return AutoPrinterTableRow;
}(React.Component);

var AutoPrinterTable = function (_React$Component3) {
    _inherits(AutoPrinterTable, _React$Component3);

    function AutoPrinterTable() {
        _classCallCheck(this, AutoPrinterTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterTable).apply(this, arguments));
    }

    _createClass(AutoPrinterTable, [{
        key: "onChange",
        value: function onChange(tour_id, new_value) {
            var new_actions = (0, _tools.clone)(this.props.actions);
            new_actions[tour_id] = new_value;
            this.props.onChange(new_actions);
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "table",
                { className: "tours-table" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "discipline" },
                            (0, _loader._)("admin.auto_printer.discipline")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.heats")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.results_1")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.results_2")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.results_3")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.discipline_results")
                        )
                    ),
                    this.props.tours.map(function (tour) {
                        return React.createElement(AutoPrinterTableRow, {
                            key: tour.id,
                            tour: tour,
                            row: _this6.props.actions[tour.id] || {},
                            possibleActions: _this6.props.possibleActions,
                            onChange: _this6.onChange.bind(_this6, tour.id) });
                    })
                )
            );
        }
    }]);

    return AutoPrinterTable;
}(React.Component);

var AutoPrinterJobQueue = function (_React$Component4) {
    _inherits(AutoPrinterJobQueue, _React$Component4);

    function AutoPrinterJobQueue(props) {
        _classCallCheck(this, AutoPrinterJobQueue);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterJobQueue).call(this, props));

        _this7.state = {
            queue: [],
            nowRendering: null
        };
        _this7.scheduleJob();
        return _this7;
    }

    _createClass(AutoPrinterJobQueue, [{
        key: "addJob",
        value: function addJob(job_type, tour, copies) {
            var new_queue = (0, _tools.clone)(this.state.queue);
            new_queue.push({
                type: job_type,
                tour: tour,
                copies: copies,
                id: Math.random()
            });
            this.setState({
                queue: new_queue
            });
        }
    }, {
        key: "scheduleJob",
        value: function scheduleJob() {
            var _this8 = this;

            setTimeout(function () {
                return _this8.processJob();
            }, 1000);
        }
    }, {
        key: "processJob",
        value: function processJob() {
            if (this.state.nowRendering) {
                return;
            }
            var job = this.state.queue[0];
            if (!job) {
                this.scheduleJob();
                return;
            }
            this.timer = setTimeout(this.retryJob.bind(this), 10000);
            this.setState({
                queue: this.state.queue.slice(1),
                nowRendering: job
            });
        }
    }, {
        key: "retryJob",
        value: function retryJob() {
            this.setState({
                queue: [this.state.nowRendering].concat(this.state.queue),
                nowRendering: null
            });
            this.scheduleJob();
        }
    }, {
        key: "continueJob",
        value: function continueJob(filename) {
            var _this9 = this;

            clearTimeout(this.timer);
            setTimeout(function () {
                var job = _this9.state.nowRendering;
                var xhr = new XMLHttpRequest();
                var address = "http://127.0.0.1:5949/print-docx?filename=" + filename + "&copies=" + job.copies;
                xhr.open("GET", address, true);
                xhr.onload = function () {};
                xhr.onerror = function () {
                    return _this9.addJob(job.type, job.tour, job.copies);
                };
                xhr.send();
                _this9.setState({
                    nowRendering: null
                });
                _this9.scheduleJob();
            }, 1000);
        }
    }, {
        key: "createFilename",
        value: function createFilename() {
            return Math.random().toString().replace(/[^0-9]/, "") + ".tmp";
        }
    }, {
        key: "renderActiveJob",
        value: function renderActiveJob() {
            if (!this.state.nowRendering) {
                return null;
            }
            switch (this.state.nowRendering.type) {
                case "heats":
                    return React.createElement(_heats.HeatsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "results_1":
                    return React.createElement(_tour_results.TourResultsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        verbosity: "1",
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "results_2":
                    return React.createElement(_tour_results.TourResultsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        verbosity: "2",
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "results_3":
                    return React.createElement(_tour_results.TourResultsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        verbosity: "3",
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "discipline_results":
                    return React.createElement(_discipline_results.DisciplineResults, {
                        discipline_id: this.state.nowRendering.tour.discipline.id,
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "test":
                    return React.createElement(AutoPrinterTestPage, {
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                default:
                    console.error("Invalid job type:", this.state.nowRendering.type);
            }
            return null;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.queue.length === 0) {
                return React.createElement(
                    "div",
                    { className: "queue queue-empty" },
                    (0, _loader._)("admin.auto_printer.queue_empty"),
                    React.createElement(
                        "div",
                        { className: "hidden-container" },
                        this.renderActiveJob()
                    )
                );
            }
            return React.createElement(
                "div",
                { className: "queue" },
                this.state.queue.map(function (item) {
                    return React.createElement(
                        "div",
                        { className: "row", key: item.id },
                        React.createElement(
                            "div",
                            { className: "name" },
                            item.type === "test" ? (0, _loader._)("admin.auto_printer.test_page") : item.tour.discipline.name + " — " + item.tour.name
                        ),
                        React.createElement(
                            "div",
                            { className: "type" },
                            (0, _loader._)("admin.auto_printer." + item.type)
                        ),
                        React.createElement(
                            "div",
                            { className: "copies" },
                            item.copies
                        )
                    );
                }),
                React.createElement(
                    "div",
                    { className: "hidden-container" },
                    this.renderActiveJob()
                )
            );
        }
    }]);

    return AutoPrinterJobQueue;
}(React.Component);

var AutoPrinter = exports.AutoPrinter = function (_React$Component5) {
    _inherits(AutoPrinter, _React$Component5);

    function AutoPrinter(props) {
        _classCallCheck(this, AutoPrinter);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinter).call(this, props));

        _this10.state = {
            competition: null,
            actions: {}
        };
        _this10.SCHEMA = {
            disciplines: {
                tours: {}
            }
        };
        _this10.POSSIBLE_ACTIONS = ["heats", "results_1", "results_2", "results_3", "discipline_results"];
        return _this10;
    }

    _createClass(AutoPrinter, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.loadData();
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.reload_data_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.reload_data_listener);
        }
    }, {
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("competition.get", { competition_id: this.props.competition_id, children: this.SCHEMA }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var new_competition = _storage.storage.get("Competition").by_id(this.props.competition_id);
            if (!new_competition) {
                return;
            }
            new_competition = new_competition.serialize(this.SCHEMA);
            if (this.state.competition) {
                this.dispatchCompetitionUpdate(this.state.competition, new_competition);
            }
            this.setState({
                competition: new_competition
            });
        }
    }, {
        key: "printTestPage",
        value: function printTestPage() {
            var _this11 = this;

            (0, _dialogs.showConfirm)((0, _loader._)("admin.auto_printer.print_test_page"), function () {
                saveAs(new Blob(["dummy"], { type: 'text/plain' }), "dummy_" + Math.random() + ".tmp");
                saveAs(new Blob(["dummy"], { type: 'text/plain' }), "dummy_" + Math.random() + ".tmp");
                saveAs(new Blob(["dummy"], { type: 'text/plain' }), "dummy_" + Math.random() + ".tmp");
                _this11.refs.queue.addJob("test", null, 1);
            }, true);
        }
    }, {
        key: "getToursFromCompetition",
        value: function getToursFromCompetition(competition) {
            var result = [];
            competition.disciplines.forEach(function (discipline) {
                return discipline.tours.forEach(function (tour) {
                    var r = (0, _tools.clone)(tour);
                    r.discipline = discipline;
                    result.push(r);
                });
            });
            return result;
        }
    }, {
        key: "getToursMap",
        value: function getToursMap(tours) {
            var result = {};
            tours.forEach(function (tour) {
                return result[tour.id] = tour;
            });
            return result;
        }
    }, {
        key: "dispatchCompetitionUpdate",
        value: function dispatchCompetitionUpdate(old_competition, new_competition) {
            var _this12 = this;

            var old_tours = this.getToursMap(this.getToursFromCompetition(old_competition));
            var new_tours = this.getToursMap(this.getToursFromCompetition(new_competition));
            Object.keys(old_tours).forEach(function (tour_id) {
                if (!new_tours[tour_id]) {
                    return;
                }
                if (!old_tours[tour_id].finalized && new_tours[tour_id].finalized) {
                    _this12.doActionsForTour(new_tours[tour_id]);
                }
            });
        }
    }, {
        key: "getNextTour",
        value: function getNextTour(tour) {
            var result = null;
            this.state.competition.disciplines.forEach(function (discipline) {
                var found = false;
                discipline.tours.forEach(function (d_tour) {
                    if (d_tour.id === tour.id) {
                        found = true;
                    } else if (found) {
                        var r = (0, _tools.clone)(d_tour);
                        r.discipline = discipline;
                        result = r;
                        found = false;
                    }
                });
            });
            return result;
        }
    }, {
        key: "doTheJob",
        value: function doTheJob(tour, action_type, copies) {
            if (action_type === "heats") {
                tour = this.getNextTour(tour);
            }
            if (!tour) {
                return;
            }
            this.refs.queue.addJob(action_type, tour, copies);
        }
    }, {
        key: "doActionsForTour",
        value: function doActionsForTour(tour) {
            var _this13 = this;

            var actions = this.state.actions[tour.id];
            if (!actions) {
                return;
            }
            this.POSSIBLE_ACTIONS.forEach(function (action_type) {
                if (actions[action_type]) {
                    _this13.doTheJob(tour, action_type, actions[action_type]);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this14 = this;

            if (!this.state.competition) {
                return React.createElement(_components.Loader, null);
            }
            return React.createElement(
                "div",
                { className: "auto-printer" },
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        (0, _loader._)("admin.headers.auto_printer")
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "section-table" },
                        React.createElement(
                            "h3",
                            null,
                            (0, _loader._)("admin.auto_printer.rules")
                        ),
                        React.createElement(AutoPrinterTable, {
                            tours: this.getToursFromCompetition(this.state.competition),
                            actions: this.state.actions,
                            onChange: function onChange(new_actions) {
                                return _this14.setState({ actions: new_actions });
                            },
                            possibleActions: this.POSSIBLE_ACTIONS })
                    ),
                    React.createElement(
                        "div",
                        { className: "section-queue" },
                        React.createElement(
                            "h3",
                            null,
                            (0, _loader._)("admin.auto_printer.queue")
                        ),
                        React.createElement(AutoPrinterJobQueue, { ref: "queue" }),
                        React.createElement(
                            "div",
                            { className: "test-page-button" },
                            React.createElement(
                                "button",
                                { type: "button", onClick: this.printTestPage.bind(this), className: "btn btn-primary" },
                                "Печать тестовой страницы"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AutoPrinter;
}(React.Component);

var AutoPrinterTestPage = function (_React$Component6) {
    _inherits(AutoPrinterTestPage, _React$Component6);

    function AutoPrinterTestPage() {
        _classCallCheck(this, AutoPrinterTestPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterTestPage).apply(this, arguments));
    }

    _createClass(AutoPrinterTestPage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.callback(this.props.autoDocx.filename);
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            return React.createElement(
                "div",
                { ref: "content" },
                React.createElement(
                    "p",
                    null,
                    (0, _loader._)("admin.auto_printer.test_text")
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-results.docx" : arguments[0];

            (0, _docx.Docx)(filename).setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML).save();
        }
    }]);

    return AutoPrinterTestPage;
}(React.Component);

},{"../judging/discipline_results":2,"../judging/heats":3,"../judging/tour_results":5,"common/docx":7,"common/tools":8,"l10n/loader":9,"server/api":12,"server/message_dispatcher":13,"server/storage":14,"ui/components":15,"ui/dialogs":16}],2:[function(require,module,exports){
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

},{"./rosfarr/discipline_results":4,"common/docx":7,"l10n/loader":9,"server/api":12,"server/message_dispatcher":13,"server/storage":14,"ui/components":15,"ui/printable":17}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeatsBody = exports.HeatsButtons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _printable = require("ui/printable");

var _docx = require("common/docx");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsButtons = exports.HeatsButtons = function (_React$Component) {
    _inherits(HeatsButtons, _React$Component);

    function HeatsButtons() {
        _classCallCheck(this, HeatsButtons);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HeatsButtons).apply(this, arguments));
    }

    _createClass(HeatsButtons, [{
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

    return HeatsButtons;
}(React.Component);

var HeatsBody = exports.HeatsBody = function (_React$Component2) {
    _inherits(HeatsBody, _React$Component2);

    function HeatsBody(props) {
        _classCallCheck(this, HeatsBody);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(HeatsBody).call(this, props));

        _this3.state = {
            tour: null
        };
        return _this3;
    }

    _createClass(HeatsBody, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this4 = this;

            this.storage = _storage.storage.getDomain("heats_" + this.props.tour_id);
            this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.loadData();
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
            _storage.storage.delDomain("heats_" + this.props.tour_id);
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                discipline: {
                    competition: {}
                },
                runs: {
                    participant: {
                        club: {}
                    }
                }
            };
            var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(SCHEMA);
            this.setState({
                tour: serialized
            });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("tour.get", {
                tour_id: this.props.tour_id,
                children: {
                    discipline: {
                        competition: {}
                    },
                    runs: {
                        participant: {
                            club: {}
                        }
                    }
                }
            }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
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
    }, {
        key: "renderHeatHeader",
        value: function renderHeatHeader(prev_row, next_row) {
            var need_render = typeof prev_row === "undefined" || prev_row.heat !== next_row.heat;
            if (!need_render) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "H" + next_row.heat },
                React.createElement(
                    "th",
                    { className: "heat-number", colSpan: "3" },
                    React.createElement(
                        "p",
                        null,
                        (0, _loader._)("global.phrases.heat_n", next_row.heat)
                    )
                )
            );
        }
    }, {
        key: "renderHeatRow",
        value: function renderHeatRow(row) {
            return React.createElement(
                "tr",
                { key: "R" + row.id },
                React.createElement(
                    "td",
                    { className: "w-8" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        row.participant.number
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "p",
                        null,
                        row.participant.name
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "p",
                        null,
                        row.participant.club.name
                    )
                )
            );
        }
    }, {
        key: "renderHeatRows",
        value: function renderHeatRows() {
            var result = [];
            var runs = this.state.tour.runs;
            for (var i = 0; i < runs.length; ++i) {
                var header = this.renderHeatHeader(runs[i - 1], runs[i]);
                header && result.push(header);
                result.push(this.renderHeatRow(runs[i]));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            if (this.state.tour === null) {
                return React.createElement(_components.Loader, null);
            }
            var body = React.createElement(
                "div",
                { className: "tour-heats" },
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
                                    (0, _loader._)("judging.labels.number")
                                )
                            ),
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _loader._)("judging.labels.participant_name")
                                )
                            ),
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _loader._)("judging.labels.club")
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.renderHeatRows()
                    )
                )
            );
            return React.createElement(_printable.Printable, {
                header: this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date,
                title1: (0, _loader._)("admin.headers.tour_heats"),
                title2: this.state.tour.discipline.name,
                title3: this.state.tour.name,
                body: body,
                ref: "printable" });
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-heats.docx" : arguments[0];

            (0, _docx.Docx)(filename).setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.tour_heats")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(this.refs.printable.fetchPrintableData()).addStyle(".heat-number", "background", "#ccc").addStyle(".heat-number", "text-align", "left").addStyle("td, th", "font-size", "12pt").save();
        }
    }]);

    return HeatsBody;
}(React.Component);

},{"common/docx":7,"l10n/loader":9,"server/api":12,"server/message_dispatcher":13,"server/storage":14,"ui/components":15,"ui/printable":17}],4:[function(require,module,exports){
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

},{"l10n/loader":9,"ui/tablet_components":18}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TourResultsBody = exports.TourResultsButtons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _printable = require("ui/printable");

var _docx = require("common/docx");

var _loader2 = require("rules_sets/loader");

var _loader3 = _interopRequireDefault(_loader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsButtons = exports.TourResultsButtons = function (_React$Component) {
    _inherits(TourResultsButtons, _React$Component);

    function TourResultsButtons() {
        _classCallCheck(this, TourResultsButtons);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsButtons).apply(this, arguments));
    }

    _createClass(TourResultsButtons, [{
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

    return TourResultsButtons;
}(React.Component);

var TourResultsBody = exports.TourResultsBody = function (_React$Component2) {
    _inherits(TourResultsBody, _React$Component2);

    // Initialization

    function TourResultsBody(props) {
        _classCallCheck(this, TourResultsBody);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsBody).call(this, props));

        _this3.state = {
            tour: null,
            results: null
        };
        _this3.TOUR_SCHEMA = {
            discipline: {
                competition: {},
                discipline_judges: {
                    judge: {}
                }
            },
            runs: {
                acrobatics: {},
                scores: {},
                participant: {
                    club: {}
                }
            }
        };
        return _this3;
    }

    _createClass(TourResultsBody, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this4 = this;

            this.storage = _storage.storage.getDomain("results_" + this.props.tour_id);
            this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.results_change_listener = _message_dispatcher.message_dispatcher.addListener("tour_results_changed reload_data", function (message) {
                if (!message || message.tour_id === this.props.tour_id) {
                    this.loadResults();
                }
            }.bind(this));
            this.loadData();
            this.loadResults();
            if (this.props.autoDocx) {
                (function () {
                    var interval_id = setInterval(function () {
                        if (_this4.refs.content) {
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
            _storage.storage.delDomain("results_" + this.props.tour_id);
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(this.TOUR_SCHEMA);
            this.setState({
                tour: serialized
            });
        }
    }, {
        key: "loadResults",
        value: function loadResults() {
            (0, _api.Api)("tour.get_results", { tour_id: this.props.tour_id }).onSuccess(function (new_results) {
                this.setState({
                    "results": new_results
                });
                this.reloadFromStorage();
            }.bind(this)).send();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("tour.get", { tour_id: this.props.tour_id, children: this.TOUR_SCHEMA }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
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
        key: "renderNonFinalizedWarning",
        value: function renderNonFinalizedWarning() {
            if (!this.state.tour.finalized) {
                return React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    (0, _loader._)("results.alerts.not_finalized")
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            if (this.state.tour === null || this.state.results === null) {
                return React.createElement(_components.Loader, null);
            }
            var table = null;
            if (this.props.verbosity === "3") {
                var ResultsComponent = _loader3.default.tour_results_table_3;
                table = React.createElement(ResultsComponent, this.state);
            } else if (this.props.verbosity === "2") {
                var ResultsComponent = _loader3.default.tour_results_table_2;
                table = React.createElement(ResultsComponent, this.state);
            } else {
                var ResultsComponent = _loader3.default.tour_results_table_1;
                table = React.createElement(ResultsComponent, this.state);
            }
            this.rendered = true;
            if (this.props.tableOnly) {
                return React.createElement(
                    "div",
                    { className: "tour-results", ref: "content" },
                    this.renderNonFinalizedWarning(),
                    table
                );
            }
            var body = React.createElement(
                "div",
                { className: "tour-results p-content", ref: "content" },
                this.renderNonFinalizedWarning(),
                table
            );
            return this.props.printable ? React.createElement(_printable.Printable, {
                ref: "printable",
                header: this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date,
                title1: (0, _loader._)("admin.headers.tour_results"),
                title2: this.state.tour.discipline.name,
                title3: this.state.tour.name,
                body: body }) : body;
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-results.docx" : arguments[0];

            (0, _docx.Docx)(filename).setMargins([10, 10, 15, 10]).setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.tour_results")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML).addStyle(".bordered-table", "font-size", this.props.verbosity === "1" ? "12pt" : "9pt").addStyle(".bordered-table .acro-table td", "font-size", "9pt").addStyle(".bordered-table .acro-table td", "padding", "0 3pt").addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none").addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0").addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt").addStyle(".score-breakdown th", "text-align", "right").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown", "width", "50pt").addStyle(".advances-header", "background-color", "#ddd").addStyle(".total-score", "font-weight", "bold").addStyle(".head_judge", "width", "5%").addStyle(".dance_judge", "width", "8%").addStyle(".acro_judge", "width", "8%").save();
        }
    }]);

    return TourResultsBody;
}(React.Component);

},{"common/docx":7,"l10n/loader":9,"rules_sets/loader":11,"server/api":12,"server/message_dispatcher":13,"server/storage":14,"ui/components":15,"ui/printable":17}],6:[function(require,module,exports){
"use strict";

var _main = require("admin/auto_printer/main");

ReactDOM.render(React.createElement(_main.AutoPrinter, window.page_props), document.getElementById("content"));

},{"admin/auto_printer/main":1}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RulesSetLoader = function () {
    function RulesSetLoader() {
        _classCallCheck(this, RulesSetLoader);

        this._loaded = false;
    }

    _createClass(RulesSetLoader, [{
        key: "load",
        value: function load(module_name, data) {
            var KEYS = ["tour_results_table_1", "tour_results_table_2", "tour_results_table_2", "judge_tablet", "admin_score_input"];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = KEYS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (!(key in data)) {
                        throw new Error("Module " + module_name + " doesn't export " + key + " class.");
                    }
                    this["_" + key] = data[key];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._loaded = true;
            console.log("Added scoring system: " + module_name);
        }
    }, {
        key: "_checkIfLoaded",
        value: function _checkIfLoaded() {
            if (!this._loaded) {
                throw new Error("No scoring system was loaded");
            }
        }
    }, {
        key: "tour_results_table_1",
        get: function get() {
            this._checkIfLoaded();
            return this._tour_results_table_1;
        }
    }, {
        key: "tour_results_table_2",
        get: function get() {
            this._checkIfLoaded();
            return this._tour_results_table_2;
        }
    }, {
        key: "tour_results_table_3",
        get: function get() {
            this._checkIfLoaded();
            return this._tour_results_table_3;
        }
    }, {
        key: "judge_tablet",
        get: function get() {
            this._checkIfLoaded();
            return this._judge_tablet;
        }
    }, {
        key: "admin_score_input",
        get: function get() {
            this._checkIfLoaded();
            return this._admin_score_input;
        }
    }]);

    return RulesSetLoader;
}();

var loader = new RulesSetLoader();

window.registerRulesSet = function () {
    loader.load.apply(loader, arguments);
};

exports.default = loader;

},{}],12:[function(require,module,exports){
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
            data.append("client_id", window.client_id);
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

},{"l10n/loader":9,"server/storage":14,"ui/dialogs":16}],13:[function(require,module,exports){
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

},{"server/storage":14,"ui/components":15}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"l10n/loader":9}],16:[function(require,module,exports){
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

},{"l10n/loader":9}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"l10n/loader":9}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGF1dG9fcHJpbnRlclxcbWFpbi5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGhlYXRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xccm9zZmFyclxcZGlzY2lwbGluZV9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xcdG91cl9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhdXRvX3ByaW50ZXIuanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcZG9jeC5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFx0b29scy5qc3giLCJzcmNcXGpzeFxcbDEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxsMTBuXFxydS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxccHJpbnRhYmxlLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2FNOzs7Ozs7Ozs7OztpQ0FDTzs7O0FBQ0wsbUJBQU87O2tCQUFJLFdBQVUsT0FBVixFQUFKO2dCQUNIO0FBQ0ksMEJBQUssTUFBTDtBQUNBLDJCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDUiw4QkFBVyxrQkFBQyxD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QUFyQixDQVBHOzs7O2lDQVNMO0FBQ0wsbUJBQ0k7O2tCQUFLLFdBQVUsV0FBVixFQUFMO2dCQUNJOzs7QUFDSSxtQ0FBVSxnQ0FBVjt1QkFDSSxlQUFlLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBZixFQUZSO29CQUlNLGVBQUUsZ0NBQUYsQ0FKTjtpQkFESjtnQkFPSTs7O0FBQ0ksbUNBQVkscUNBQXFDLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBckM7dUJBQ1IsZUFBZSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQWYsRUFGUjtvQkFJTSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLGVBQUUsK0JBQUYsQ0FBcEIsR0FBeUQsZUFBRSxnQ0FBRixDQUF6RDtpQkFYVjtnQkFhSTs7c0JBQUssV0FBVSxNQUFWLEVBQUw7b0JBQ00sS0FBSyxXQUFMLEVBRE47aUJBYko7YUFESixDQURLOzs7O1dBM0VBO0VBQWtCLE1BQU0sU0FBTiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgc2hvd0NvbmZpcm0gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBjbG9uZSB9IGZyb20gXCJjb21tb24vdG9vbHNcIjtcclxuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xyXG5pbXBvcnQgeyBIZWF0c0JvZHkgfSBmcm9tIFwiLi4vanVkZ2luZy9oZWF0c1wiO1xyXG5pbXBvcnQgeyBUb3VyUmVzdWx0c0JvZHkgfSBmcm9tIFwiLi4vanVkZ2luZy90b3VyX3Jlc3VsdHNcIjtcclxuaW1wb3J0IHsgRGlzY2lwbGluZVJlc3VsdHMgfSBmcm9tIFwiLi4vanVkZ2luZy9kaXNjaXBsaW5lX3Jlc3VsdHNcIjtcclxuXHJcblxyXG5jbGFzcyBBdXRvUHJpbnRlclRhYmxlQ2VsbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy52YWx1ZSB9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IChlKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1teXFxkXS8sIFwiXCIpKSB8fCAwKSB9IC8+XHJcbiAgICAgICAgPC90ZD5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQXV0b1ByaW50ZXJUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBvbkNoYW5nZShhY3Rpb24sIG5ld192YWx1ZSkge1xyXG4gICAgICAgIGxldCBuZXdfcm93ID0gY2xvbmUodGhpcy5wcm9wcy5yb3cpO1xyXG4gICAgICAgIG5ld19yb3dbYWN0aW9uXSA9IG5ld192YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld19yb3cpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dHI+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJkaXNjaXBsaW5lXCI+eyBgJHt0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5uYW1lfSDigJQgJHt0aGlzLnByb3BzLnRvdXIubmFtZX1gIH08L3RkPlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMucG9zc2libGVBY3Rpb25zLm1hcCgoYWN0aW9uKSA9PlxyXG4gICAgICAgICAgICAgICAgPEF1dG9QcmludGVyVGFibGVDZWxsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgYWN0aW9uIH1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMucm93W2FjdGlvbl0gfHwgXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgYWN0aW9uKSB9IC8+XHJcbiAgICAgICAgICAgICkgfVxyXG4gICAgICAgIDwvdHI+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEF1dG9QcmludGVyVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgb25DaGFuZ2UodG91cl9pZCwgbmV3X3ZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG5ld19hY3Rpb25zID0gY2xvbmUodGhpcy5wcm9wcy5hY3Rpb25zKTtcclxuICAgICAgICBuZXdfYWN0aW9uc1t0b3VyX2lkXSA9IG5ld192YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld19hY3Rpb25zKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInRvdXJzLXRhYmxlXCI+PHRib2R5PlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiZGlzY2lwbGluZVwiPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5kaXNjaXBsaW5lXCIpIH08L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5oZWF0c1wiKSB9PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18xXCIpIH08L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5yZXN1bHRzXzJcIikgfTwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGg+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJlc3VsdHNfM1wiKSB9PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIuZGlzY2lwbGluZV9yZXN1bHRzXCIpIH08L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudG91cnMubWFwKCh0b3VyKSA9PlxyXG4gICAgICAgICAgICAgICAgPEF1dG9QcmludGVyVGFibGVSb3dcclxuICAgICAgICAgICAgICAgICAgICBrZXk9eyB0b3VyLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5hY3Rpb25zW3RvdXIuaWRdIHx8IHt9IH1cclxuICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZUFjdGlvbnM9eyB0aGlzLnByb3BzLnBvc3NpYmxlQWN0aW9ucyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgdG91ci5pZCkgfSAvPlxyXG4gICAgICAgICAgICApIH1cclxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEF1dG9QcmludGVySm9iUXVldWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcXVldWU6IFtdLFxyXG4gICAgICAgICAgICBub3dSZW5kZXJpbmc6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XHJcbiAgICB9XHJcbiAgICBhZGRKb2Ioam9iX3R5cGUsIHRvdXIsIGNvcGllcykge1xyXG4gICAgICAgIGxldCBuZXdfcXVldWUgPSBjbG9uZSh0aGlzLnN0YXRlLnF1ZXVlKTtcclxuICAgICAgICBuZXdfcXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IGpvYl90eXBlLFxyXG4gICAgICAgICAgICB0b3VyOiB0b3VyLFxyXG4gICAgICAgICAgICBjb3BpZXM6IGNvcGllcyxcclxuICAgICAgICAgICAgaWQ6IE1hdGgucmFuZG9tKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHF1ZXVlOiBuZXdfcXVldWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzY2hlZHVsZUpvYigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc0pvYigpLCAxMDAwKTtcclxuICAgIH1cclxuICAgIHByb2Nlc3NKb2IoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubm93UmVuZGVyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGpvYiA9IHRoaXMuc3RhdGUucXVldWVbMF07XHJcbiAgICAgICAgaWYgKCFqb2IpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMucmV0cnlKb2IuYmluZCh0aGlzKSwgMTAwMDApO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBxdWV1ZTogdGhpcy5zdGF0ZS5xdWV1ZS5zbGljZSgxKSxcclxuICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBqb2IsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXRyeUpvYigpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcXVldWU6IFt0aGlzLnN0YXRlLm5vd1JlbmRlcmluZ10uY29uY2F0KHRoaXMuc3RhdGUucXVldWUpLFxyXG4gICAgICAgICAgICBub3dSZW5kZXJpbmc6IG51bGwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xyXG4gICAgfVxyXG4gICAgY29udGludWVKb2IoZmlsZW5hbWUpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBqb2IgPSB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZztcclxuICAgICAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IGBodHRwOi8vMTI3LjAuMC4xOjU5NDkvcHJpbnQtZG9jeD9maWxlbmFtZT0keyBmaWxlbmFtZSB9JmNvcGllcz0keyBqb2IuY29waWVzIH1gO1xyXG4gICAgICAgICAgICB4aHIub3BlbihcIkdFVFwiLCBhZGRyZXNzLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHt9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHRoaXMuYWRkSm9iKGpvYi50eXBlLCBqb2IudG91ciwgam9iLmNvcGllcyk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBudWxsLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRmlsZW5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vLCBcIlwiKSArIFwiLnRtcFwiO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQWN0aXZlSm9iKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJoZWF0c1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gPEhlYXRzQm9keVxyXG4gICAgICAgICAgICAgICAgdG91cl9pZD17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnRvdXIuaWR9XHJcbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XHJcbiAgICAgICAgY2FzZSBcInJlc3VsdHNfMVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPFRvdXJSZXN1bHRzQm9keVxyXG4gICAgICAgICAgICAgICAgdG91cl9pZD17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnRvdXIuaWR9XHJcbiAgICAgICAgICAgICAgICB2ZXJib3NpdHk9XCIxXCJcclxuICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXt7IGZpbGVuYW1lOiB0aGlzLmNyZWF0ZUZpbGVuYW1lKCksIGNhbGxiYWNrOiB0aGlzLmNvbnRpbnVlSm9iLmJpbmQodGhpcykgfX0gLz5cclxuICAgICAgICBjYXNlIFwicmVzdWx0c18yXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8VG91clJlc3VsdHNCb2R5XHJcbiAgICAgICAgICAgICAgICB0b3VyX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5pZH1cclxuICAgICAgICAgICAgICAgIHZlcmJvc2l0eT1cIjJcIlxyXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9e3sgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgY2FsbGJhY2s6IHRoaXMuY29udGludWVKb2IuYmluZCh0aGlzKSB9fSAvPlxyXG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXzNcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxUb3VyUmVzdWx0c0JvZHlcclxuICAgICAgICAgICAgICAgIHRvdXJfaWQ9eyB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZy50b3VyLmlkfVxyXG4gICAgICAgICAgICAgICAgdmVyYm9zaXR5PVwiM1wiXHJcbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XHJcbiAgICAgICAgY2FzZSBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5kaXNjaXBsaW5lLmlkIH1cclxuICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXt7IGZpbGVuYW1lOiB0aGlzLmNyZWF0ZUZpbGVuYW1lKCksIGNhbGxiYWNrOiB0aGlzLmNvbnRpbnVlSm9iLmJpbmQodGhpcykgfX0gLz5cclxuICAgICAgICBjYXNlIFwidGVzdFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPEF1dG9QcmludGVyVGVzdFBhZ2VcclxuICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXt7IGZpbGVuYW1lOiB0aGlzLmNyZWF0ZUZpbGVuYW1lKCksIGNhbGxiYWNrOiB0aGlzLmNvbnRpbnVlSm9iLmJpbmQodGhpcykgfX0gLz5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBqb2IgdHlwZTpcIiwgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnF1ZXVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJxdWV1ZSBxdWV1ZS1lbXB0eVwiPlxyXG4gICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnF1ZXVlX2VtcHR5XCIpIH1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBY3RpdmVKb2IoKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInF1ZXVlXCI+XHJcbiAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5xdWV1ZS5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGtleT17IGl0ZW0uaWQgfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpdGVtLnR5cGUgPT09IFwidGVzdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIudGVzdF9wYWdlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2l0ZW0udG91ci5kaXNjaXBsaW5lLm5hbWV9IOKAlCAke2l0ZW0udG91ci5uYW1lfWAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHlwZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIuXCIgKyBpdGVtLnR5cGUpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcGllc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGl0ZW0uY29waWVzIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQWN0aXZlSm9iKCkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1dG9QcmludGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiB7fSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuU0NIRU1BID0ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lczoge1xyXG4gICAgICAgICAgICAgICAgdG91cnM6IHt9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5QT1NTSUJMRV9BQ1RJT05TID0gW1wiaGVhdHNcIiwgXCJyZXN1bHRzXzFcIiwgXCJyZXN1bHRzXzJcIiwgXCJyZXN1bHRzXzNcIiwgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIl07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yZWxvYWRfZGF0YV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5kYl91cGRhdGVfbGlzdGVuZXIpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9kYXRhX2xpc3RlbmVyKTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLmdldFwiLCB7IGNvbXBldGl0aW9uX2lkOiB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkLCBjaGlsZHJlbjogdGhpcy5TQ0hFTUEgfSlcclxuICAgICAgICAgICAgLmFkZFRvREIoXCJDb21wZXRpdGlvblwiLCB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkKVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xyXG4gICAgICAgIGxldCBuZXdfY29tcGV0aXRpb24gPSBzdG9yYWdlLmdldChcIkNvbXBldGl0aW9uXCIpLmJ5X2lkKHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpO1xyXG4gICAgICAgIGlmICghbmV3X2NvbXBldGl0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3X2NvbXBldGl0aW9uID0gbmV3X2NvbXBldGl0aW9uLnNlcmlhbGl6ZSh0aGlzLlNDSEVNQSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcGV0aXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaENvbXBldGl0aW9uVXBkYXRlKHRoaXMuc3RhdGUuY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogbmV3X2NvbXBldGl0aW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpbnRUZXN0UGFnZSgpIHtcclxuICAgICAgICBzaG93Q29uZmlybShfKFwiYWRtaW4uYXV0b19wcmludGVyLnByaW50X3Rlc3RfcGFnZVwiKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBkdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xyXG4gICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBkdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xyXG4gICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBkdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnMucXVldWUuYWRkSm9iKFwidGVzdFwiLCBudWxsLCAxKTtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgIH1cclxuICAgIGdldFRvdXJzRnJvbUNvbXBldGl0aW9uKGNvbXBldGl0aW9uKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGNvbXBldGl0aW9uLmRpc2NpcGxpbmVzLmZvckVhY2goKGRpc2NpcGxpbmUpID0+XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmUudG91cnMuZm9yRWFjaCgodG91cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHIgPSBjbG9uZSh0b3VyKTtcclxuICAgICAgICAgICAgICAgIHIuZGlzY2lwbGluZSA9IGRpc2NpcGxpbmU7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChyKTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgKVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBnZXRUb3Vyc01hcCh0b3Vycykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcclxuICAgICAgICB0b3Vycy5mb3JFYWNoKCh0b3VyKSA9PiByZXN1bHRbdG91ci5pZF0gPSB0b3VyKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZGlzcGF0Y2hDb21wZXRpdGlvblVwZGF0ZShvbGRfY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbikge1xyXG4gICAgICAgIGxldCBvbGRfdG91cnMgPSB0aGlzLmdldFRvdXJzTWFwKHRoaXMuZ2V0VG91cnNGcm9tQ29tcGV0aXRpb24ob2xkX2NvbXBldGl0aW9uKSk7XHJcbiAgICAgICAgbGV0IG5ld190b3VycyA9IHRoaXMuZ2V0VG91cnNNYXAodGhpcy5nZXRUb3Vyc0Zyb21Db21wZXRpdGlvbihuZXdfY29tcGV0aXRpb24pKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvbGRfdG91cnMpLmZvckVhY2goKHRvdXJfaWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFuZXdfdG91cnNbdG91cl9pZF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW9sZF90b3Vyc1t0b3VyX2lkXS5maW5hbGl6ZWQgJiYgbmV3X3RvdXJzW3RvdXJfaWRdLmZpbmFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb0FjdGlvbnNGb3JUb3VyKG5ld190b3Vyc1t0b3VyX2lkXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldE5leHRUb3VyKHRvdXIpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXRlLmNvbXBldGl0aW9uLmRpc2NpcGxpbmVzLmZvckVhY2goKGRpc2NpcGxpbmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmUudG91cnMuZm9yRWFjaCgoZF90b3VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZF90b3VyLmlkID09PSB0b3VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByID0gY2xvbmUoZF90b3VyKTtcclxuICAgICAgICAgICAgICAgICAgICByLmRpc2NpcGxpbmUgPSBkaXNjaXBsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgfSApXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGRvVGhlSm9iKHRvdXIsIGFjdGlvbl90eXBlLCBjb3BpZXMpIHtcclxuICAgICAgICBpZiAoYWN0aW9uX3R5cGUgPT09IFwiaGVhdHNcIikge1xyXG4gICAgICAgICAgICB0b3VyID0gdGhpcy5nZXROZXh0VG91cih0b3VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0b3VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWZzLnF1ZXVlLmFkZEpvYihhY3Rpb25fdHlwZSwgdG91ciwgY29waWVzKTtcclxuICAgIH1cclxuICAgIGRvQWN0aW9uc0ZvclRvdXIodG91cikge1xyXG4gICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5zdGF0ZS5hY3Rpb25zW3RvdXIuaWRdO1xyXG4gICAgICAgIGlmICghYWN0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUE9TU0lCTEVfQUNUSU9OUy5mb3JFYWNoKChhY3Rpb25fdHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uc1thY3Rpb25fdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9UaGVKb2IodG91ciwgYWN0aW9uX3R5cGUsIGFjdGlvbnNbYWN0aW9uX3R5cGVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuY29tcGV0aXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYXV0by1wcmludGVyXCI+XHJcbiAgICAgICAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8aDE+eyBfKFwiYWRtaW4uaGVhZGVycy5hdXRvX3ByaW50ZXJcIikgfTwvaDE+XHJcbiAgICAgICAgICAgIDwvaGVhZGVyPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uLXRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5ydWxlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8QXV0b1ByaW50ZXJUYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3Vycz17IHRoaXMuZ2V0VG91cnNGcm9tQ29tcGV0aXRpb24odGhpcy5zdGF0ZS5jb21wZXRpdGlvbikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zPXsgdGhpcy5zdGF0ZS5hY3Rpb25zIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyAobmV3X2FjdGlvbnMpID0+IHRoaXMuc2V0U3RhdGUoeyBhY3Rpb25zOiBuZXdfYWN0aW9ucyB9KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlQWN0aW9ucz17IHRoaXMuUE9TU0lCTEVfQUNUSU9OUyB9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi1xdWV1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucXVldWVcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEF1dG9QcmludGVySm9iUXVldWUgcmVmPVwicXVldWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdC1wYWdlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsgdGhpcy5wcmludFRlc3RQYWdlLmJpbmQodGhpcykgfSBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0LXRh9Cw0YLRjCDRgtC10YHRgtC+0LLQvtC5INGB0YLRgNCw0L3QuNGG0YtcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEF1dG9QcmludGVyVGVzdFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG4gICAgICAgIHJldHVybiA8ZGl2IHJlZj1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPHA+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnRlc3RfdGV4dFwiKSB9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgY3JlYXRlRG9jeChmaWxlbmFtZT1cInRvdXItcmVzdWx0cy5kb2N4XCIpIHtcclxuICAgICAgICBEb2N4KGZpbGVuYW1lKVxyXG4gICAgICAgICAgICAuc2V0Qm9keShSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY29udGVudCkuaW5uZXJIVE1MKVxyXG4gICAgICAgICAgICAuc2F2ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBQcmludGFibGUgfSBmcm9tIFwidWkvcHJpbnRhYmxlXCI7XHJcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxyXG4gICAgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSxcclxuICAgIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZSxcclxufSBmcm9tIFwiLi9yb3NmYXJyL2Rpc2NpcGxpbmVfcmVzdWx0c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XHJcbiAgICAgICAgICAgICAgICBET0NYXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyOiBcInBhZ2VcIixcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBsb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ydW5zX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcclxuICAgICAgICB0aGlzLnJlbG9hZF9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRTdGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdG91cl9zdG9yYWdlID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIikuYnlfaWQobWVzc2FnZVtcInRvdXJfaWRcIl0pO1xyXG4gICAgICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuZGlzY2lwbGluZS5pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsX2lkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmcy5wcmludGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xyXG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcclxuICAgIH1cclxuICAgIHJlbG9hZFN0YXRlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMucnVuc19sb2FkZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RvcmFnZV9ydW5zID0gdGhpcy5zdG9yYWdlLmdldChcIlJ1blwiKVxyXG4gICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHM7XHJcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IFtdXHJcbiAgICAgICAgdmFyIFNDSEVNQSA9IHtcclxuICAgICAgICAgICAgdG91cjoge30sXHJcbiAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICBzcG9ydHNtZW46IHt9LFxyXG4gICAgICAgICAgICAgICAgY2x1Yjoge30sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBuZXdfc3RhdGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwbGFjZTogcmVzdWx0c1tpXS5wbGFjZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogc3RvcmFnZV9ydW5zLmJ5X2lkKHJlc3VsdHNbaV0ucnVuX2lkKS5zZXJpYWxpemUoU0NIRU1BKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBsb2FkZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHRhYmxlOiBuZXdfc3RhdGUsXHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHRoaXMuc3RvcmFnZS5nZXQoXCJEaXNjaXBsaW5lXCIpLmJ5X2lkKHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCkuc2VyaWFsaXplKHtcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2FkUmVzdWx0cygpIHtcclxuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldF9yZXN1bHRzXCIsIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uU3VjY2VzcyhyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9yZXN1bHRzOiByZXNwb25zZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU3RhdGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldFwiLCB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IHtcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcclxuICAgICAgICAgICAgICAgIHRvdXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkVG9EQihcIkRpc2NpcGxpbmVcIiwgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLCB0aGlzLnN0b3JhZ2UpXHJcbiAgICAgICAgLm9uU3VjY2VzcygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuc19sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFN0YXRlKHRoaXMpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExpc3RlbmVyc1xyXG5cclxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcclxuICAgICAgICBjYXNlIFwiZG9jeFwiOlxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbmRlcmluZ1xyXG5cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnJlbmRlcmVyKSB7XHJcbiAgICAgICAgY2FzZSBcInByZXNlbnRlclwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH0gcmVmPVwibWFpbl90YWJsZVwiIC8+XHJcbiAgICAgICAgY2FzZSBcInNjcmVlbl9vcGVyYXRvclwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVxyXG4gICAgICAgICAgICAgICAgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH1cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGxhY2U9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgb25QbGFjZVNlbGVjdD17IHRoaXMucHJvcHMub25QbGFjZVNlbGVjdCB9XHJcbiAgICAgICAgICAgICAgICByZWY9XCJtYWluX3RhYmxlXCIgLz5cclxuICAgICAgICBjYXNlIFwicGFnZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPFByaW50YWJsZVxyXG4gICAgICAgICAgICAgICAgcmVmPVwicHJpbnRhYmxlXCJcclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMuZGlzY2lwbGluZV9yZXN1bHRzXCIpIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIGJvZHk9eyA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSAvPiB9IC8+XHJcbiAgICAgICAgY2FzZSBcInRhYmxlXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSByZWY9XCJtYWluX3RhYmxlXCIgLz5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5sb2FkZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+PExvYWRlciAvPjwvZGl2PlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcclxuICAgICAgICAgICAgLnNldFRpdGxlMShfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS5kaXNjaXBsaW5lLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRCb2R5KHRoaXMucmVmcy5wcmludGFibGUuZmV0Y2hQcmludGFibGVEYXRhKCkpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3VyLW5hbWVcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcInBhZGRpbmdcIiwgXCIwXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zcG9ydHNtZW5cIiwgXCJ3aWR0aFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgLnNhdmUoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xyXG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEhlYXRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XHJcbiAgICAgICAgICAgICAgICBET0NYXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVhdHNCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlLmdldERvbWFpbihcImhlYXRzX1wiICsgdGhpcy5wcm9wcy50b3VyX2lkKTtcclxuICAgICAgICB0aGlzLnJlbG9hZF9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsX2lkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmcy5wcmludGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XHJcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJoZWF0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcclxuICAgICAgICBsZXQgU0NIRU1BID0ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XHJcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJ1bnM6IHtcclxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIilcclxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcclxuICAgICAgICAgICAgLnNlcmlhbGl6ZShTQ0hFTUEpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB0b3VyOiBzZXJpYWxpemVkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xyXG4gICAgICAgICAgICB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWQsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJ1bnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkVG9EQihcIlRvdXJcIiwgdGhpcy5wcm9wcy50b3VyX2lkLCB0aGlzLnN0b3JhZ2UpXHJcbiAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXHJcbiAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcclxuICAgICAgICBjYXNlIFwiZG9jeFwiOlxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhdEhlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcclxuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cuaGVhdCAhPT0gbmV4dF9yb3cuaGVhdClcclxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiSFwiICsgbmV4dF9yb3cuaGVhdCB9Pjx0aCBjbGFzc05hbWU9XCJoZWF0LW51bWJlclwiIGNvbFNwYW49XCIzXCI+XHJcbiAgICAgICAgICAgIDxwPnsgXyhcImdsb2JhbC5waHJhc2VzLmhlYXRfblwiLCBuZXh0X3Jvdy5oZWF0KSB9PC9wPlxyXG4gICAgICAgIDwvdGg+PC90cj47XHJcblxyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhdFJvdyhyb3cpIHtcclxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiUlwiICsgcm93LmlkIH0+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LThcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcm93LnBhcnRpY2lwYW50Lm51bWJlciB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48cD57IHJvdy5wYXJ0aWNpcGFudC5uYW1lIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgPHRkPjxwPnsgcm93LnBhcnRpY2lwYW50LmNsdWIubmFtZSB9PC9wPjwvdGQ+XHJcbiAgICAgICAgPC90cj47XHJcbiAgICB9XHJcbiAgICByZW5kZXJIZWF0Um93cygpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHJ1bnMgPSB0aGlzLnN0YXRlLnRvdXIucnVucztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVySGVhdEhlYWRlcihydW5zW2kgLSAxXSwgcnVuc1tpXSk7XHJcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlckhlYXRSb3cocnVuc1tpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBib2R5ID0gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLWhlYXRzXCI+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPjx0aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+PHA+eyBfKFwianVkZ2luZy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+PHA+eyBfKFwianVkZ2luZy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPjxwPnsgXyhcImp1ZGdpbmcubGFiZWxzLmNsdWJcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD48dGJvZHk+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhdFJvd3MoKSB9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICAgICAgcmV0dXJuIDxQcmludGFibGVcclxuICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICB0aXRsZTE9eyBfKFwiYWRtaW4uaGVhZGVycy50b3VyX2hlYXRzXCIpIH1cclxuICAgICAgICAgICAgdGl0bGUyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XHJcbiAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUudG91ci5uYW1lIH1cclxuICAgICAgICAgICAgYm9keT17IGJvZHkgfVxyXG4gICAgICAgICAgICByZWY9XCJwcmludGFibGVcIiAvPlxyXG4gICAgfVxyXG4gICAgY3JlYXRlRG9jeChmaWxlbmFtZT1cInRvdXItaGVhdHMuZG9jeFwiKSB7XHJcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcclxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcclxuICAgICAgICAgICAgLnNldFRpdGxlMShfKFwiYWRtaW4uaGVhZGVycy50b3VyX2hlYXRzXCIpKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUyKHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRCb2R5KHRoaXMucmVmcy5wcmludGFibGUuZmV0Y2hQcmludGFibGVEYXRhKCkpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWF0LW51bWJlclwiLCBcImJhY2tncm91bmRcIiwgXCIjY2NjXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWF0LW51bWJlclwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcInRkLCB0aFwiLCBcImZvbnQtc2l6ZVwiLCBcIjEycHRcIilcclxuICAgICAgICAgICAgLnNhdmUoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IG9uVG91Y2hFbmRPckNsaWNrIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcblxyXG5cclxuZnVuY3Rpb24gX18oKSB7XHJcbiAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF8oXCJzY29yaW5nX3N5c3RlbXMucm9zZmFyci5cIiArIGFyZ3VtZW50c1swXSwgLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcclxuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cucnVuLnRvdXIuaWQgIT09IG5leHRfcm93LnJ1bi50b3VyLmlkKVxyXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT48dGggY2xhc3NOYW1lPVwidG91ci1uYW1lXCIgY29sU3Bhbj1cIjZcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfTwvcD5cclxuICAgICAgICA8L3RoPjwvdHI+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KHJvdykge1xyXG4gICAgICAgIGxldCBwID0gcm93LnJ1bi5wYXJ0aWNpcGFudDtcclxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IHBsYWNlXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHJvdy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOiByb3cucGxhY2UgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IG51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBwLm51bWJlciB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTM2XCIgY29sU3Bhbj1cIjJcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzcG9ydHNtZW5cIj48dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBwLmZvcm1hdGlvbl9uYW1lID8gPHRyPjx0aCBjb2xTcGFuPVwiMlwiPjxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgcC5mb3JtYXRpb25fbmFtZSB9PC9wPjwvdGg+PC90cj4gOiBudWxsIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHAuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PiA8dHIga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTc1XCI+PHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHMubGFzdF9uYW1lICsgXCIgXCIgKyBzLmZpcnN0X25hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLnN1YnN0aXR1dGUgPyA8aT4gKHsgXyhcImFkbWluLmxhYmVscy5zdWJcIikgfS4pPC9pPiA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcy55ZWFyX29mX2JpcnRoIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPiApIH1cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY2x1YlwiPjxwPnsgcC5jbHViLm5hbWUgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjb2FjaGVzXCI+PHA+eyBwLmNvYWNoZXMuc3BsaXQoXCIsXCIpLm1hcCgoYykgPT4gW2MudHJpbSgpLCA8YnIga2V5PVwiWFwiIC8+XSkgfTwvcD48L3RkPlxyXG4gICAgICAgIDwvdHI+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93cygpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpIC0gMV0sIHRhYmxlW2ldKTtcclxuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjdcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOVwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jb2FjaGVzXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9nZ2xlQWN0aXZlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6ICF0aGlzLnN0YXRlLmFjdGl2ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMudG9nZ2xlQWN0aXZlLmJpbmQodGhpcykpfT48dGJvZHk+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBsYWNlID09PSBudWxsID8gXCJcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBwLm5hbWUgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCIgY29sU3Bhbj1cIjJcIj57IHAuY2x1Yi5uYW1lIH08L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY29hY2hlc1wiIGNvbFNwYW49XCIyXCI+eyBwLmNvYWNoZXMgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XHJcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcclxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KHJvdykge1xyXG4gICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZVJvdyBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudD17IHJvdy5ydW4ucGFydGljaXBhbnQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9IC8+XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3dzKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0YWJsZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSArIDFdLCB0YWJsZVtpXSk7XHJcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnByb3BzLnNlbGVjdGVkID8gXCIgc2VsZWN0ZWRcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uQ2xpY2spfT48dGJvZHk+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBsYWNlID09PSBudWxsID8gXCJcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBwLm5hbWUgfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCIgY29sU3Bhbj1cIjJcIj57IHAuY2x1Yi5uYW1lIH08L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XHJcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcclxuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KHJvdywgcGxhY2UpIHtcclxuICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVJvd1xyXG4gICAgICAgICAgICBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfVxyXG4gICAgICAgICAgICBwYXJ0aWNpcGFudD17IHJvdy5ydW4ucGFydGljaXBhbnQgfVxyXG4gICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLm9uUGxhY2VTZWxlY3QocGxhY2UpIH1cclxuICAgICAgICAgICAgc2VsZWN0ZWQ9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgIT09IG51bGwgJiYgcGxhY2UgPj0gdGhpcy5wcm9wcy5zZWxlY3RlZFBsYWNlIH0gLz5cclxuICAgIH1cclxuICAgIHJlbmRlclJvd3MoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhYmxlLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpICsgMV0sIHRhYmxlW2ldKTtcclxuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldLCBpICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xyXG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XHJcblxyXG5pbXBvcnQgcnVsZV9zZXQgZnJvbSBcInJ1bGVzX3NldHMvbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XHJcbiAgICAgICAgICAgICAgICBET0NYXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBJbml0aWFsaXphdGlvblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6IG51bGwsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVE9VUl9TQ0hFTUEgPSB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAganVkZ2U6IHt9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgYWNyb2JhdGljczoge30sXHJcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlLmdldERvbWFpbihcInJlc3VsdHNfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xyXG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJ0b3VyX3Jlc3VsdHNfY2hhbmdlZCByZWxvYWRfZGF0YVwiLCBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSB8fCBtZXNzYWdlLnRvdXJfaWQgPT09IHRoaXMucHJvcHMudG91cl9pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9Eb2N4KSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZnMuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4LmNhbGxiYWNrKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XHJcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJyZXN1bHRzX1wiICsgdGhpcy5wcm9wcy50b3VyX2lkKTtcclxuICAgIH1cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xyXG4gICAgICAgIGxldCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIilcclxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcclxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlRPVVJfU0NIRU1BKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRSZXN1bHRzKCkge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0X3Jlc3VsdHNcIiwge3RvdXJfaWQ6IHRoaXMucHJvcHMudG91cl9pZH0pXHJcbiAgICAgICAgLm9uU3VjY2VzcyhmdW5jdGlvbihuZXdfcmVzdWx0cykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBuZXdfcmVzdWx0cyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHsgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyX2lkLCBjaGlsZHJlbjogdGhpcy5UT1VSX1NDSEVNQX0pXHJcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJfaWQsIHRoaXMuc3RvcmFnZSlcclxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuZXJzXHJcblxyXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZSkge1xyXG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyaW5nXHJcblxyXG4gICAgcmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUudG91ci5maW5hbGl6ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+eyBfKFwicmVzdWx0cy5hbGVydHMubm90X2ZpbmFsaXplZFwiKSB9PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsIHx8IHRoaXMuc3RhdGUucmVzdWx0cyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPExvYWRlciAvPlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGFibGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIzXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgUmVzdWx0c0NvbXBvbmVudCA9IHJ1bGVfc2V0LnRvdXJfcmVzdWx0c190YWJsZV8zXHJcbiAgICAgICAgICAgIHRhYmxlID0gPFJlc3VsdHNDb21wb25lbnQgey4uLnRoaXMuc3RhdGV9IC8+XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIyXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgUmVzdWx0c0NvbXBvbmVudCA9IHJ1bGVfc2V0LnRvdXJfcmVzdWx0c190YWJsZV8yXHJcbiAgICAgICAgICAgIHRhYmxlID0gPFJlc3VsdHNDb21wb25lbnQgey4uLnRoaXMuc3RhdGV9IC8+XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgUmVzdWx0c0NvbXBvbmVudCA9IHJ1bGVfc2V0LnRvdXJfcmVzdWx0c190YWJsZV8xXHJcbiAgICAgICAgICAgIHRhYmxlID0gPFJlc3VsdHNDb21wb25lbnQgey4uLnRoaXMuc3RhdGV9IC8+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRhYmxlT25seSkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXJlc3VsdHNcIiByZWY9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIH1cclxuICAgICAgICAgICAgICAgIHsgdGFibGUgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJvZHkgPSA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0cyBwLWNvbnRlbnRcIiByZWY9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb25GaW5hbGl6ZWRXYXJuaW5nKCkgfVxyXG4gICAgICAgICAgICB7IHRhYmxlIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5wcmludGFibGVcclxuICAgICAgICAgICAgPyA8UHJpbnRhYmxlXHJcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMj17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUzPXsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgYm9keT17IGJvZHkgfSAvPlxyXG4gICAgICAgICAgICA6IGJvZHk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1yZXN1bHRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRNYXJnaW5zKFsxMCwgMTAsIDE1LCAxMF0pXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUyKHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRCb2R5KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jb250ZW50KS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZVwiLCBcImZvbnQtc2l6ZVwiLCB0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIxXCIgPyBcIjEycHRcIiA6IFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImZvbnQtc2l6ZVwiLCBcIjlwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAzcHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiYm9yZGVyXCIsIFwiMC41cHQgc29saWQgYmxhY2tcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJwYWRkaW5nXCIsIFwiMCAxcHQgMCAwXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgMCAwIDFwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwidGV4dC1hbGlnblwiLCBcInJpZ2h0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93blwiLCBcIndpZHRoXCIsIFwiNTBwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYWR2YW5jZXMtaGVhZGVyXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdGFsLXNjb3JlXCIsIFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWFkX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI1JVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuZGFuY2VfanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjglXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hY3JvX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI4JVwiKVxyXG4gICAgICAgICAgICAuc2F2ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF1dG9QcmludGVyIH0gZnJvbSBcImFkbWluL2F1dG9fcHJpbnRlci9tYWluXCI7XG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxBdXRvUHJpbnRlciB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXG4pO1xuIiwiY2xhc3MgRG9jeEltcGwge1xuICAgIGNvbnN0cnVjdG9yKGZpbGVuYW1lKSB7XG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMSA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUyID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTMgPSBudWxsO1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmJvZHkgPSBcIlwiO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJwb3J0cmFpdFwiO1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHtcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LWZhbWlseVwiOiBcIkNhbGlicmksIFRhaG9tYSwgQXJpYWwsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRhYmxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xsYXBzZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstaW5zaWRlXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRkLCB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IFwiMXB0IDNwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDEsIGgyLCBoMywgaDQsIGg1LCBoNlwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgxXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDNcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNCBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiMTBwdCAwIDZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDUgcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjZwdCAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIuaGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nLWJvdHRvbVwiOiBcIjJwdFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBcIjoge1xuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsaVwiOiB7IFwibWFyZ2luLXRvcFwiOiAwLCBcInBhZGRpbmctdG9wXCI6IDAgfSxcbiAgICAgICAgICAgIFwiLnNwYWNlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudmEtdG9wXCI6IHtcbiAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwidG9wXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudGV4dC1sZWZ0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LXJpZ2h0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIiB9LFxuICAgICAgICAgICAgXCIudGV4dC1jZW50ZXJcIjogeyBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgXCIuYm9yZGVyZWQtdGFibGUgdGQsIC5ib3JkZXJlZC10YWJsZSB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXJcIjogXCIxcHQgc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRXaWR0aENzcygpO1xuICAgIH1cbiAgICBhZGRXaWR0aENzcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTAwOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU3R5bGUoXCIudy1cIiArIGksIFwid2lkdGhcIiwgaSArIFwiJVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFN0eWxlKHNlbGVjdG9yLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZXNbc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl1ba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMSh0aXRsZTEpIHtcbiAgICAgICAgdGhpcy50aXRsZTEgPSB0aXRsZTE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTIodGl0bGUyKSB7XG4gICAgICAgIHRoaXMudGl0bGUyID0gdGl0bGUyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUzKHRpdGxlMykge1xuICAgICAgICB0aGlzLnRpdGxlMyA9IHRpdGxlMztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE1hcmdpbnMobWFyZ2lucykge1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Qm9keShib2R5KSB7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIGRhdGEpIHtcbiAgICAgICAgbGV0IGNzc19wYWlycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLm1hcCgoa2V5KSA9PiBrZXkgKyAnOiAnICsgZGF0YVtrZXldICsgJzsgJylcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yICsgXCIgeyBcIiArIGNzc19wYWlycy5qb2luKFwiIFwiKSArIFwiIH1cIjtcbiAgICB9XG4gICAgcmVuZGVyU3R5bGVzKCkge1xuICAgICAgICBsZXQgY3NzX2Jsb2NrcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuc3R5bGVzKS5tYXAoKFxuICAgICAgICAgICAgKHNlbGVjdG9yKSA9PiB0aGlzLnJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSlcbiAgICAgICAgKS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIGNzc19ibG9ja3Muam9pbihcIlxcblwiKTtcbiAgICB9XG4gICAgcmVuZGVySFRNTCgpIHtcbiAgICAgICAgbGV0IGNzcyA9IHRoaXMucmVuZGVyU3R5bGVzKCk7XG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLmhlYWRlciA/ICc8cCBjbGFzcz1cImhlYWRlclwiPicgKyB0aGlzLmhlYWRlciArICc8L3A+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTEgPSB0aGlzLnRpdGxlMSA/ICc8aDE+JyArIHRoaXMudGl0bGUxICsgJzwvaDE+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTIgPSB0aGlzLnRpdGxlMiA/ICc8aDI+JyArIHRoaXMudGl0bGUyICsgJzwvaDI+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTMgPSB0aGlzLnRpdGxlMyA/ICc8aDM+JyArIHRoaXMudGl0bGUzICsgJzwvaDM+JyA6IFwiXCI7XG4gICAgICAgIGxldCBzcGFjZXIgPSAoaGVhZGVyIHx8IHRpdGxlMSB8fCB0aXRsZTIgfHwgdGl0bGUzKSA/ICc8cCBjbGFzcz1cInNwYWNlclwiPiZuYnNwOzwvcD4nIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIFwiPCFET0NUWVBFIGh0bWw+XFxuXCIgK1xuICAgICAgICAgICAgXCI8aHRtbD48aGVhZD5cIiArXG4gICAgICAgICAgICAgICAgXCI8bWV0YSBjaGFyc2V0PVxcXCJ1dGYtOFxcXCI+XCIgK1xuICAgICAgICAgICAgICAgIFwiPHN0eWxlPlxcblwiICsgY3NzICsgXCJcXG48L3N0eWxlPlxcblwiICtcbiAgICAgICAgICAgIFwiPC9oZWFkPjxib2R5PlxcblwiICtcbiAgICAgICAgICAgICAgICBoZWFkZXIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMSArXG4gICAgICAgICAgICAgICAgdGl0bGUyICtcbiAgICAgICAgICAgICAgICB0aXRsZTMgK1xuICAgICAgICAgICAgICAgIHNwYWNlciArXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5ICtcbiAgICAgICAgICAgIFwiPC9ib2R5PjwvaHRtbD5cIjtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVySFRNTCgpO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IHRoaXMubWFyZ2lucyB8fCAodGhpcy5vcmllbnRhdGlvbiA9PT0gXCJwb3J0cmFpdFwiID8gWzEwLCAxNSwgMTAsIDE1XSA6IFs3LCAxMCwgNywgMTBdKTtcbiAgICAgICAgbGV0IGNvbnZlcnRlZCA9IGh0bWxEb2N4LmFzQmxvYihodG1sLCB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbjogdGhpcy5vcmllbnRhdGlvbixcbiAgICAgICAgICAgIG1hcmdpbnM6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICAgIE1hdGguZmxvb3IobWFyZ2luc1swXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICByaWdodDogIE1hdGguZmxvb3IobWFyZ2luc1sxXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBib3R0b206IE1hdGguZmxvb3IobWFyZ2luc1syXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAgIE1hdGguZmxvb3IobWFyZ2luc1szXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNhdmVBcyhjb252ZXJ0ZWQsIHRoaXMuZmlsZW5hbWUpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgdmFyIERvY3ggPSAoZm4pID0+IG5ldyBEb2N4SW1wbChmbik7XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbmNsYXNzIENtcENoYWluSW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gMDtcbiAgICB9XG4gICAgY21wKGEsIGIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIENtcENoYWluID0gKCkgPT4gbmV3IENtcENoYWluSW1wbCgpO1xuIiwiaW1wb3J0IHsgdHJhbnNsYXRlLCBnZXRQb3NzaWJsZVRvdXJOYW1lcyB9IGZyb20gXCIuL3J1XCI7XHJcblxyXG5leHBvcnQgdmFyIF8gPSB0cmFuc2xhdGU7XHJcbmV4cG9ydCB2YXIgdG91cl9uYW1lcyA9IGdldFBvc3NpYmxlVG91ck5hbWVzKCk7XHJcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCBhcmcpIHtcclxuICAgIGZ1bmN0aW9uIGNob29zZUVuZGluZyhuLCBlMSwgZTIsIGU1KSB7XHJcbiAgICAgICAgbGV0IHggPSBuICUgMTAwO1xyXG4gICAgICAgIGlmIChNYXRoLmZsb29yKHggLyAxMCkgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA+PSA1IHx8IHggJSAxMCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlMjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgUEhSQVNFUyA9IHtcclxuICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiAodmVyc2lvbiwgZGF0ZSkgPT4gPGRpdiBjbGFzc05hbWU9XCJhYm91dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxiPlJvY2tKdWRnZSB7dmVyc2lvbn08L2I+ICjQt9Cw0LrRgNGL0YLQsNGPINCy0LXRgNGB0LjRjyDQtNC70Y8g0L7Qs9GA0LDQvdC40YfQtdC90L3QvtCz0L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8pICZtZGFzaDsg0YHQuNGB0YLQtdC80LAg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0L/QviDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQvtC80YMg0YDQvtC6LdC9LdGA0L7Qu9C70YMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCQ0LLRgtC+0YDRgdC60LjQtSDQv9GA0LDQstCwINC90LAg0YHQuNGB0YLQtdC80YMgUm9ja0p1ZGdlINC/0L7Qu9C90L7RgdGC0YzRjiDQv9GA0LjQvdCw0LTQu9C10LbQsNGCINGA0LDQt9GA0LDQsdC+0YLRh9C40LrRgyDQkNGA0YLQtdC80YMg0JrQsNC30LDQutC+0LLRgy4g0KHQvtCw0LLRgtC+0YAg0YHQuNGB0YLQtdC80Ysg0JDQvdGC0L7QvSDQkNC80LXQu9C40L0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCh0LjRgdGC0LXQvNCwINGA0LDRgdC/0YDQvtGB0YLRgNCw0L3Rj9C10YLRgdGPINC/0L4g0LvQuNGG0LXQvdC30LjQuCBMaW51bSBkLm8ubyAoaW5mb0BsaW51bS5ocikuINCU0LvRjyDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LAgUm9ja0p1ZGdlINC90LXQvtCx0YXQvtC00LjQvNC+INC4INC00L7RgdGC0LDRgtC+0YfQvdC+INC40LzQtdGC0Ywg0L/RgNCw0LLQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyBMaW51bSBMUFMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCe0YTQuNGG0LjQsNC70YzQvdGL0Lkg0YHQsNC50YI6IDxhIGhyZWY9XCJodHRwczovL3JvY2tqdWRnZS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+aHR0cHM6Ly9yb2NranVkZ2UuY29tLzwvYT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wcm9ncmFtc19hZnRlcl9jcmVhdGlvblwiOiBcItCf0YDQvtCz0YDQsNC80LzRiyDQvNC+0LbQvdC+INCx0YPQtNC10YIg0LTQvtCx0LDQstC40YLRjCDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRgdC+0YXRgNCw0L3QtdC90LjRjyDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC60L7RgNGA0LXQutGC0L3QviDQvdCw0YHRgtGA0L7QtdC90LAg0Lgg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LAuXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9ub3RfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0L3QtdC00L7RgdGC0YPQv9C90LAg0L3QsCDRjdGC0L7QvCDQutC+0LzQv9GM0YLQtdGA0LUuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbmFsaXplZFwiOiBcItCe0YLRgdGD0YLRgdGC0LLRg9GO0YIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV93YXJuaW5nXCI6IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz7QpNC40L3QsNC70LjQt9Cw0YbQuNGPINC00L7Qu9C20L3QsCDQvtGC0LzQtdC90Y/RgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0LjRgdC60LvRjtGH0LjRgtC10LvRjNC90YvRhSDRgdC70YPRh9Cw0Y/RhSE8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JXRgdC70Lgg0LbQtSDRjdGC0L4g0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0L3QtdC+0LHRhdC+0LTQuNC80L4sINC+0LHRgNCw0YLQuNGC0LUg0LLQvdC40LzQsNC90LjQtSwg0YfRgtC+INC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YHQv9C40YHQvtC6INGD0YfQsNGB0YLQvdC40LrQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAg0YHQu9C10LTRg9GO0YnQtdCz0L4g0YLRg9GA0LAg0LHRg9C00LXRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQv9C10YDQtdGB0L7Qt9C00LDQvS4g0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YPRh9Cw0YHRgtC90LjQutC+0LIsINC/0YDQvtGI0LXQtNGI0LjRhSDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC/0L7RgdC70LUg0L/QtdGA0LLQvtC5XHJcbiAgICAgICAgICAgICAgICAgICAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDQuCDQvdC1INC/0YDQvtGI0LXQtNGI0LjRhSDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDQsdGD0LTRg9GCINCx0LXQt9Cy0L7Qt9Cy0YDQsNGC0L3QviDRg9GC0LXRgNGP0L3RiyE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0Jgg0L3QtSDQt9Cw0LHRg9C00YzRgtC1INC30LDQvdC+0LLQviDQvdCw0L/QtdGH0LDRgtCw0YLRjCDQstGB0LUg0YLQsdC70LjRhtGLLjwvcD48L2Rpdj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGB0LsuwqDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVcIjogXCLQntGH0LXRgNC10LTRjCDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmNvbmZpcm1fc2NvcmVcIjogXCLQntGC0LzQtdC90LAg0YTQuNC60YHQsNGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY2x1YlwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINC60LvRg9CxP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY29tcGV0aXRpb25cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L4g0YHQvtGA0LXQstC90L7QstCw0L3QuNC1P1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZGlzY2lwbGluZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQtNC40YHRhtC40L/Qu9C40L3Rgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2p1ZGdlXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRgdGD0LTRjNGOP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcGFydGljaXBhbnRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0L/RgNC+0LPRgNCw0LzQvNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y4g0YLRg9GA0LA/INCS0LLQtdC00LjRgtC1IMKrdW5maW5hbGl6ZcK7LCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6IFwi0J4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsaWVudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQvNC4INGD0YHRgtGA0L7QudGB0YLQstCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQutC70YPQsdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25faW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINC+INGC0YPRgNC90LjRgNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5fbWFuYWdlbWVudFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC00LjRgdGG0LjQv9C70LjQvdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9jb21wZXRpdGlvblwiOiBcItCY0LzQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbWVudVwiOiBcItCh0LXRgNCy0LjRgdC90L7QtSDQvNC10L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5fbGlzdFwiOiBcItCh0L/QuNGB0L7QuiDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQntGC0LzQtdC90LAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bnBpY2tlZF90b3Vyc1wiOiBcItCd0LUg0LLQutC70Y7Rh9C10L3RiyDQsiDQv9GA0L7Qs9GA0LDQvNC80YNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0YtcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fZGF0ZVwiOiBcItCU0LDRgtCwINC/0YDQvtCy0LXQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX25hbWVcIjogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCg0LDRgdC/0YDQtdC00LXQu9C10L3QuNC1INGB0YPQtNC10Lkg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZ3JvdXBfYnlfY2x1YnNcIjogXCLQk9GA0YPQv9C/0LjRgNC+0LLQsNGC0Ywg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9hY3JvYmF0aWNzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2NsdWJzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0LrQu9GD0LHQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdC/0YDQtdC00LXQu9C10L3QuNC1INGB0YPQtNC10Lkg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZXh0ZW5kZWRfaW5mb1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0YjQuNGA0LXQvdC90YPRjiDQuNC90YTQvtGA0LzQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Zvcm1hdGlvbl9zcG9ydHNtZW5cIjogXCLQktC60LvRjtGH0LjRgtGMINGB0L7RgdGC0LDQsiDRhNC+0YDQvNC10LnRiNC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2p1ZGdlc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INGB0YPQtNGM0Y/RhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbGVzX3NlbGVjdGVkXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRhNCw0LnQuy4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNcIjogXCLQo9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFzdGVfYWNyb1wiOiBcItCS0YHRgtCw0LLRjNGC0LUg0LTQsNC90L3Ri9C1INC40Lcg0LrQsNC70YzQutGD0LvRj9GC0L7RgNCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zcG9ydHNtZW5fb25seVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3VtbWFyeVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDQutC+0LvQuNGH0LXRgdGC0LLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJcIjogXCLQt9Cw0L9cIiwgIC8vIHN1YnN0aXR1dGVcclxuICAgICAgICAgICAgICAgIFwidG91cnNcIjogXCLQotGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9wYXNzY29kZVwiOiBcItCS0LLQtdC00ZHQvSDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQv9C+0YLQstC10YDQttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZW51XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jbHVic1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfZGlzY2lwbGluZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2p1ZGdlc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9zcG9ydHNtZW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC/0L7RgNGC0YHQvNC10L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3RvdXJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YLRg9GA0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibl9wYXJ0aWNpcGFudHNcIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuXCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQv9Cw0YHQvSR7IGNob29zZUVuZGluZyhzLCBcItC+0LlcIiwgXCLRi9GFXCIsIFwi0YvRhVwiKSB9KWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5fc2hvcnRcIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/LilgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX25fcGFydGljaXBhbnRzXCI6IG4gPT4gXCLQmNGC0L7Qs9C+IFwiICsgbiArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnaW5nLXRhYnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3VyLWFkbWluXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmUtcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVycm9yc1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3N5bnRheF9lcnJvclwiOiBcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZHVwbGljYXRlZF9leHRlcm5hbF9pZFwiOiBcItCSINC00LDQvdC90YvRhSDQuNC80LXRjtGC0YHRjyDQt9Cw0L/QuNGB0Lgg0YEg0L/QvtCy0YLQvtGA0Y/RjtGJ0LjQvNC40LzRgdGPIGV4dGVybmFsX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuYWJsZV90b19nZXRcIjogKHdhbnRlZCkgPT4gXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C+0LvRg9GH0LjRgtGMIFwiICsgd2FudGVkICsgXCIg0LjQtyDQt9Cw0L/RgNC+0YHQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQutC70YPQsSwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90Ysg0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfbm9uX2VtcHR5XCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1LCDRgdC+0LTQtdGA0LbQsNGJ0LXQtSDQtNC40YHRhtC40L/Qu9C40L3Riywg0LrQu9GD0LHRiyDQuNC70Lgg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b29fbWFueV90b3Vyc1wiOiAoZCkgPT4gW1wi0J7RiNC40LHQutCwINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIiwgYNCSINC00LjRgdGG0LjQv9C70LjQvdC1ICR7ZH0g0YHQvtC00LXRgNC20LjRgtGB0Y8g0LHQvtC70YzRiNC1INGC0YPRgNC+0LIsINGH0LXQvCDRgdC+0LfQtNCw0L3QviDQsiDRgdC40YHRgtC10LzQtWBdLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2Rpc2NpcGxpbmVfZm91bmRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YssINC+0YLRgdGD0YLRgdGC0LLRg9GO0YnQuNC1INCyINGB0LjRgdGC0LXQvNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNoYW5nZV9qdWRnZXNfd2l0aF9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHQvtGB0YLQsNCyINGB0YPQtNC10Lkg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLLCDRgdC+0LTQtdGA0LbQsNGJ0LXQuSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsCwg0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0YXQvtGC0Y8g0LHRiyDQsiDQvtC00L3QvtC8INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGluZ1wiOiBcItCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9wcm9ibGVtXCI6IFwi0J/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcclxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fZXJyb3JcIjogXCLQn9C+0YXQvtC20LUsINC40LzQtdGO0YLRgdGPINC/0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBcItCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCk0L7RgNC80LXQudGI0L0g4oSWXCIgKyBuLnRvU3RyaW5nKCkgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCLQo9GH0LDRgdGC0L3QuNC6IOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdpbmdcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0J/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfYWNyb2JhdGljX292ZXJyaWRlXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0J/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3RvdXJcIjogXCLQndCw0YfQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCe0YHRgtCw0L3QvtCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0L/RgNC+0LPRgNCw0LzQvNGDINC00LvRjyDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRiz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LHQsNC30L7QstGL0YUg0L7RhtC10L3QvtC6INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2lkeFwiOiBcIuKEliDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybWVkXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibmV3X3Njb3JlXCI6IFwi0JrQvtGA0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgXCJvbGRfc2NvcmVcIjogXCLQkdCw0LfQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQklwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vZGVsc1wiOiB7XHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60LvRg9Cx0LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZlXCI6IFwi0JDQutGC0LjQstC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcItCU0LDRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPINC00LvRjyDQv9GA0L7RgtC+0LrQvtC70LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3RpdGxlXCI6IFwi0JfQsNCz0L7Qu9C+0LLQvtC6XCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV92YWx1ZVwiOiBcItCX0L3QsNGH0LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQkFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicm9sZXNfbGVnZW5kXCI6IChcclxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy0xMDBcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCT0Lsg4oCUINCz0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y88L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiIOKAlCDRgdGD0LTRjNGPINGC0LDQvdGG0LA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCQIOKAlCDRgdGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QomV4IOKAlCDRgtC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y88L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IFwi0JrQsNGC0LXQs9C+0YDQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvS4gSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCkLiDQmC4g0J4uXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcItCg0L7Qu9GMINCyINGB0YPQtNC10LnRgdGC0LLQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlX2Rlc2NyaXB0aW9uXCI6IFwi0JTQvtC70LbQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25zXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9uYW1lXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9jaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9uYW1lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcItCY0LzRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJcIjogXCLQn9C+0LtcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX2ZcIjogXCLQllwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfbVwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmVyYWxfaW5mb1wiOiBcItCe0YHQvdC+0LLQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60L7QvNCw0L3QtNGLINGE0L7RgNC80LXQudGI0L1cIixcclxuICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwi0KTQsNC80LjQu9C40Y9cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9ncmFtc1wiOiBcItCf0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtYW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L1cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV9uXCI6IFwi0J7RgdC9LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX3lcIjogXCLQl9Cw0L8uXCIsXHJcbiAgICAgICAgICAgICAgICBcInllYXJfb2ZfYmlydGhcIjogXCLQk9C+0LQg0YDQvtC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ5b2JcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9ncmFtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdF9mb3JcIjogXCLQn9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdF9wcm9ncmFtXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaXNfaG9wZV90b3VyXCI6IFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1fYWR2YW5jZXNcIjogXCLQmtCy0L7RgtCwINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfcGVyX2hlYXRcIjogXCLQo9GH0LDRgdGC0L3QuNC60L7QsiDQsiDQt9Cw0YXQvtC00LVcIixcclxuICAgICAgICAgICAgICAgIFwic2NvcmluZ19zeXN0ZW1fbmFtZVwiOiBcItCh0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9oZWF0XCI6IFwi0KHQsdGA0L7RgSDQvdC+0LzQtdGA0LAg0LfQsNGF0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3BsYWNlXCI6IFwi0KHQsdGA0L7RgSDQvNC10YHRgtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZXNcIjogXCLQnNC10YHRgtCwINC00LvRjyDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwcmVzZW50ZXJcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YIuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2FjdGl2ZV90b3VyXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfZmluYWxpemVkXCI6IFwi0JTQsNC90L3Ri9C1INGA0LXQt9GD0LvRjNGC0LDRgtGLINC90LUg0Y/QstC70Y/RjtGC0YHRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90YvQvNC4LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwcmludFwiOiBcItCf0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGVfdmlld1wiOiBcItCj0L/RgNC+0YnQtdC90L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2Vfdmlld1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzdGFydF9wYWdlXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2NvbXBldGl0aW9uXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUg0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3JvbGVcIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0LLQvtGOINGA0L7Qu9GMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19jb21wZXRpdGlvbnNcIjogXCLQndC10YIg0LDQutGC0LjQstC90YvRhSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRfbGlua1wiOiAobGluaykgPT4gPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAg0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuCDQvdCw0YXQvtC00LjRgtGB0Y8g0L/QviDQsNC00YDQtdGB0YMmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgbGluayB9PnsgbGluayB9PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkbWluaXN0cmF0b3JcIjogXCLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5cIjogXCLQrdC60YDQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiBcItCe0L/QtdGA0LDRgtC+0YAg0Y3QutGA0LDQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGFzX3VuY29uZmlybWVkX3Njb3Jlc1wiOiBcItCY0LzQtdGO0YLRgdGPINC90LXQt9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvdGL0LUg0L7RhtC10L3QutC4INGB0YPQtNC10Lkg0LIg0L/QvtGB0LvQtdC00L3QtdC8INC30LDRhdC+0LTQtS5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2hlYXRcIjogXCLQodC70LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtdCy0YvRhdC+0LQg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X2hlYXRcIjogXCLQn9GA0LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9zdG9wd2F0Y2hcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3N0b3B3YXRjaFwiOiBcItCh0YLQsNGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF9zdG9wd2F0Y2hcIjogXCLQodGC0L7Qv1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YNcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg4oSWXCIgKyAobiArIDEpLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfcGFnZVwiOiBcItCh0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIjogXCLQktGLINC90LUg0YPRh9Cw0YHRgtCy0YPQtdGC0LUg0LIg0YHRg9C00LXQudGB0YLQstC1INC00LDQvdC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ190b3VyXCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtGCINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uc1wiOiBcItCU0LXQudGB0YLQstC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VcIjogXCLQotCw0L3QtdGGXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wb3NpdGlvblwiOiBcItCa0L7QvNC/0L7Qt9C40YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2ZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9iaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbXByZXNzaW9uXCI6IFwi0J7QsdGJ0LXQtSDQstC/0LXRh9Cw0YLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INC70LjQvdC10LnQvdGL0YUg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5X3R5cGVcIjogXCLQqNGC0YDQsNGE0L3Ri9C1INGB0LDQvdC60YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldmlvdXNfcGVuYWx0aWVzXCI6IFwi0J/RgNC10LTRi9C00YPRidC40LUg0YjRgtGA0LDRhNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5ZWxsb3dfY2FyZFwiOiBcIi0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IFwi0KHQsdGA0L7RgSDQvdCwIFwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpbWluZ1wiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJyZWFrZG93blwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwiQVwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNcIjogXCLQmlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmRcIjogXCLQn1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpXCI6IFwi0J7QklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21cIjogXCLQnNCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQu9C4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQsNC60YDQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FyZFwiOiBcItCo0YLRgNCw0YRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCj0YfQsNGB0YLQvdC40LosINGA0LXQt9GD0LvRjNGC0LDRglwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdlX3JvbGVzXCI6IHtcclxuICAgICAgICAgICAgXCJcIjogXCItXCIsXHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0YLQsNC90YbQsFwiLFxyXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgbGV0IHBhdGggPSBzcmMuc3BsaXQoXCIuXCIpO1xyXG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xyXG4gICAgcGF0aC5mb3JFYWNoKChjaHVuaykgPT4gcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdKTtcclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgXCIgKyBzcmMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGhyYXNlX3B0ciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGdldFBvc3NpYmxlVG91ck5hbWVzID0gKCkgPT4gW1xyXG4gICAgXCLQpNC40L3QsNC7XCIsXHJcbiAgICBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgIFwi0J7RgtCx0L7RgNC+0YfQvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICBcIjEvMiDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS80INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzgg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvMTYg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG5dO1xyXG4iLCJjbGFzcyBSdWxlc1NldExvYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKG1vZHVsZV9uYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgS0VZUyA9IFtcInRvdXJfcmVzdWx0c190YWJsZV8xXCIsIFwidG91cl9yZXN1bHRzX3RhYmxlXzJcIiwgXCJ0b3VyX3Jlc3VsdHNfdGFibGVfMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJqdWRnZV90YWJsZXRcIiwgXCJhZG1pbl9zY29yZV9pbnB1dFwiXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBLRVlTKSB7XHJcbiAgICAgICAgICAgIGlmICghKGtleSBpbiBkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgJHttb2R1bGVfbmFtZX0gZG9lc24ndCBleHBvcnQgJHtrZXl9IGNsYXNzLmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXNbYF8ke2tleX1gXSA9IGRhdGFba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQWRkZWQgc2NvcmluZyBzeXN0ZW06ICR7bW9kdWxlX25hbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NoZWNrSWZMb2FkZWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2FkZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc2NvcmluZyBzeXN0ZW0gd2FzIGxvYWRlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvdXJfcmVzdWx0c190YWJsZV8xKCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG91cl9yZXN1bHRzX3RhYmxlXzE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvdXJfcmVzdWx0c190YWJsZV8yKCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG91cl9yZXN1bHRzX3RhYmxlXzI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvdXJfcmVzdWx0c190YWJsZV8zKCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG91cl9yZXN1bHRzX3RhYmxlXzM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGp1ZGdlX3RhYmxldCgpIHtcclxuICAgICAgICB0aGlzLl9jaGVja0lmTG9hZGVkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2p1ZGdlX3RhYmxldDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWRtaW5fc2NvcmVfaW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZG1pbl9zY29yZV9pbnB1dDtcclxuICAgIH1cclxufVxyXG5cclxudmFyIGxvYWRlciA9IG5ldyBSdWxlc1NldExvYWRlcigpO1xyXG5cclxud2luZG93LnJlZ2lzdGVyUnVsZXNTZXQgPSBmdW5jdGlvbigpIHtcclxuICAgIGxvYWRlci5sb2FkKC4uLmFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRlcjtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5cclxuY2xhc3MgQXBpSW1wbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSAobXNnLCBjb2RlLCBhcmdzKSA9PiBzaG93RXJyb3IoY29kZSA/IF8oY29kZSwgLi4uYXJncykgOiBtc2cpO1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9ICguLi5kYXRhKSA9PiBjb25zb2xlLmVycm9yKFwiQVBJIGZhaWxcIiwgLi4uZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuICAgIG9uRG9uZShjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25TdWNjZXNzKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkVycm9yKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25GYWlsKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhZGRUb0RCKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBzdD1zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBzdC5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2VuZCgpIHtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiL2FwaVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuIiwiaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uX3N0YXR1cyB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZURpc3BhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzX2NudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGluZyB0byB3ZWJzb2NrZXQuLi5cIik7XHJcbiAgICAgICAgdGhpcy53cyA9IG5ldyBTb2NrSlMoXCJodHRwOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL3dzXCIpO1xyXG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldE9rKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkLlwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1tcInJlbG9hZF9kYXRhXCIsIG51bGxdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxfdXBkYXRlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldEZhaWwoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QuYmluZCh0aGlzKSwgNTAwKTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBpZiAoZGF0YVtcImNsaWVudF9pZFwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xpZW50X2lkID0gZGF0YVtcImNsaWVudF9pZFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXNnX3R5cGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICBsZXQgbXNnX2RhdGEgPSBkYXRhWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAobXNnX3R5cGUgPT09IFwiZm9yY2VfcmVmcmVzaFwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fSkuZm9yRWFjaCgoa2V5KSA9PiBsaXN0ZW5lcnNba2V5XShtc2dfZGF0YSkpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEubW9kZWxfdXBkYXRlcy5mb3JFYWNoKChtb2RlbF9pbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHN0b3JhZ2UudXBkYXRlTW9kZWwobW9kZWxfaW5mby5tb2RlbCwgbW9kZWxfaW5mby5pZCwgbW9kZWxfaW5mby5kYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRhdGFfY2hhbmdlZCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbXCJkYl91cGRhdGVcIl0gfHwge307XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcklkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc19jbnQrKztcclxuICAgIH1cclxuICAgIGFkZExpc3RlbmVyKG1zZ190eXBlcywgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldExpc3RlbmVySWQoKTtcclxuICAgICAgICBtc2dfdHlwZXMuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24obXNnX3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXVtpZF0gPSBjYWxsYmFjaztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyX2lkKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1trZXldW2xpc3RlbmVyX2lkXTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuaWYgKCF3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyKSB7XHJcbiAgICB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbn1cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyO1xyXG4iLCJjbGFzcyBSZWYge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSwgaWQpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubW9kZWxfbmFtZSkuYnlfaWQodGhpcy5pZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkLCBtb2RlbF9zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX19zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzID0ge307XHJcbiAgICAgICAgdGhpcy5fX21vZGVsX3N0b3JhZ2UgPSBtb2RlbF9zdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkQmFja1JlZihrZXksIHJlZikge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHJlZjtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkYXRhLCBjcmVhdGU9dHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIiB8fCBpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUgJiYgdHlwZW9mIHRoaXNbaWR4LnNsaWNlKDEpXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IFtdXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCB0aGlzLl9fbW9kZWxfc3RvcmFnZS5tb2RlbF9uYW1lLCB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZl9rZXkgPSBkYXRhW2lkeF0uYmFja19yZWY7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2lkeF0uY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihuZXN0ZWRfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEuZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZi5nZXQoKS5hZGRCYWNrUmVmKGJhY2tfcmVmX2tleSwgYmFja19yZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHJlZik7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCIqXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkX2RhdGEgPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpZHhdID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1tpZHhdID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNlcmlhbGl6ZShzY2hlbWEpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge31cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fX2tleV90eXBlcykgaWYgKHRoaXMuX19rZXlfdHlwZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX19rZXlfdHlwZXNba2V5XSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5tYXAoZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiXlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQuaWQgPSB0aGlzLmlkXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWxzU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGQoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxzW2lkXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0gPSBuZXcgTW9kZWwodGhpcy5zdG9yYWdlLCBpZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbHNbaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYnlfaWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaWRdO1xyXG4gICAgfVxyXG4gICAgYWxsKCkge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tb2RlbHMpO1xyXG4gICAgICAgIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2tleV07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZG9tYWlucyA9IHt9XHJcbiAgICB9XHJcbiAgICBnZXREb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvbWFpbnNbZG9tYWluXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRvbWFpbnNbZG9tYWluXSA9IG5ldyBTdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGRlbERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBnZXQobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID0gbmV3IE1vZGVsc1N0b3JhZ2UodGhpcywgbW9kZWxfbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgZGVsKG1vZGVsX25hbWUpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX3R5cGVdKSB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmRvbWFpbnMpLmZvckVhY2goKGtleSkgPT5cclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5kb21haW5zW2tleV0udXBkYXRlTW9kZWwoLi4uYXJndW1lbnRzKSB8fCBkYXRhX2NoYW5nZWQpO1xyXG4gICAgICAgIC8vIHJldHVybiBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgc3R5bGU9e3sgXCJoZWlnaHRcIjogXCIxMDAlXCIsIFwid2lkdGhcIjogXCIxMDAlXCIgfX0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL2FqYXgtbG9hZGVyLmdpZlwiIC8+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXNNb2NrIHtcclxuICAgIHNldE9rKCkge31cclxuICAgIHNldEZhaWwoKSB7fVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFwiY29ubmVjdGVkXCI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3Rpb25fc3RhdHVzXCIpO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmICFlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XHJcbiAgICBsZXQgdGl0bGUgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMF0gOiBfKFwiZ2xvYmFsLm1lc3NhZ2VzLmVycm9yX2hlYWRlclwiKTtcclxuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xyXG4gICAgcmV0dXJuIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxyXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxyXG4gICAgfSwgYWN0aW9uKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUHJpbnRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZmV0Y2hQcmludGFibGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVhZGVyID8gPGRpdiBjbGFzc05hbWU9XCJwLWhlYWRlclwiPnsgdGhpcy5wcm9wcy5oZWFkZXIgfTwvZGl2PiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUxID8gPGgxPnsgdGhpcy5wcm9wcy50aXRsZTEgfTwvaDE+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTIgPyA8aDI+eyB0aGlzLnByb3BzLnRpdGxlMiB9PC9oMj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMyA/IDxoMz57IHRoaXMucHJvcHMudGl0bGUzIH08L2gzPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICByZWY9eyBlID0+IHRoaXMuX2JvZHkgPSBlIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYm9keSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByaW50YWJsZVwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTEoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUyKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcclxuICAgIGxldCBmID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXHJcbiAgICAgICAgb25DbGljazogZixcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hFbmRPckNsaWNrKGhhbmRsZXIsIHByZXZlbnRfZGVmYXVsdCkge1xyXG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XHJcbiAgICBsZXQgZGlzdGFuY2UgPSAwO1xyXG4gICAgbGV0IGxhdGVzdF9wb3MgPSBbMCwgMF07XHJcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgICBsZXQgZGlzY2FyZCA9ICgpID0+IHtcclxuICAgICAgICBfaGFuZGxlciA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgbGV0IG1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgY3VycmVudF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XHJcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcclxuICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnNxcnQoc3FyKGN1cnJlbnRfcG9zWzBdIC0gbGF0ZXN0X3Bvc1swXSkgKyBzcXIoY3VycmVudF9wb3NbMV0gLSBsYXRlc3RfcG9zWzFdKSk7XHJcbiAgICAgICAgbGF0ZXN0X3BvcyA9IGN1cnJlbnRfcG9zO1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XHJcbiAgICAgICAgICAgIGRpc2NhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc3RhcnQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBfaGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIGxhdGVzdF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uVG91Y2hTdGFydDogc3RhcnQsXHJcbiAgICAgICAgb25Ub3VjaEVuZDogZmlyZSxcclxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcclxuICAgICAgICBvblRvdWNoQ2FuY2VsOiBkaXNjYXJkLFxyXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZXIsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZG9uZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgIGRvbmVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBzbGlkZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBpbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kb25lICYmIG5leHRQcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpc0ZyZWUoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLnRvdWNoICYmICF0aGlzLnByb3BzLmRvbmUgJiYgIXRoaXMuc3RhdGUuZmluaXNoZWQ7XHJcbiAgICB9XHJcbiAgICBnZXRPdXRlclRleHRPcGFjaXR5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCgxMDAgLSB0aGlzLnN0YXRlLnBvc2l0aW9uLCAwKSwgMTAwKTtcclxuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xyXG4gICAgfVxyXG4gICAgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmVzICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgZ2V0VG91Y2goZXZlbnQpIHtcclxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcclxuICAgIH1cclxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcclxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XHJcbiAgICB9XHJcbiAgICBnZXRTbGlkZXJQb3MoZXZlbnQpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcclxuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgMjAwKTtcclxuICAgIH1cclxuICAgIG9uQ2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXNpb246IDIwMCxcclxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5waW4gPSB0aGlzLmdldFJlbGF0aXZlVG91Y2goZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxyXG4gICAgICAgICAgICB0b3VjaDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hFbmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlciBub3NlbGVjdFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpbm5lclwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6ICh0aGlzLnByb3BzLmRvbmUgfHwgdGhpcy5zdGF0ZS5maW5pc2hlZCkgPyBcIjIwMHB4XCIgOiB0aGlzLnN0YXRlLnBvc2l0aW9uICsgXCJweFwiIH19XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLm9uVG91Y2hTdGFydCB9XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMub25Ub3VjaE1vdmUgfVxyXG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMub25Ub3VjaEVuZCB9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vbkNsaWNrIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAg4oaSXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVxyXG4gICAgICAgICAgICAgICAgPyA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYigxMDAsMTAwLDEwMClcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiZG9uZS10ZXh0XCIgfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lVGV4dCB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA6IDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiYSgxMDAsMTAwLDEwMCxcIiArIHRoaXMuZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpICsgXCIpXCIgfX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInNsaWRlLXRleHRcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zbGlkZVRleHQgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0U2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgY2hvaWNlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJvd1NpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0QnV0dG9uc0NvdW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIG9uQ2xpY2sobikge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShuKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jaG9pY2VzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGVsWzBdO1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IGVsWzFdO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlX2NsYXNzX25hbWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0ga2V5KSA/IFwiIGFjdGl2ZVwiIDogXCJcIjtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsga2V5IH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrLmJpbmQodGhpcywga2V5KSl9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIHNjb3JlLWJ0blwiICsgYWN0aXZlX2NsYXNzX25hbWUgfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0fVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiICYmIChpZHggKyAxKSAlIHRoaXMucHJvcHMucm93U2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goPGJyIGtleT17IFwiYnJcIiArIGlkeCB9IC8+KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGxheW91dF9jbGFzcyA9ICh0aGlzLnByb3BzLnN0eWxlICE9PSBcInR3by1saW5lc1wiKSA/IFwic2VsZWN0b3ItbGF5b3V0XCIgOiBcInNlbGVjdG9yLWxheW91dC0ycm93c1wiO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZF9jbGFzcyA9IHRoaXMucHJvcHMudmFsdWUgPT09IG51bGwgPyBcIlwiIDogXCIgc2VsZWN0ZWRcIlxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJzY29yaW5nLWxheW91dCBcIiArIGxheW91dF9jbGFzcyArIHNlbGVjdGVkX2NsYXNzICsgXCIgbi1cIiArIHRoaXMuZ2V0QnV0dG9uc0NvdW50KCkudG9TdHJpbmcoKSB9PnsgcmVzdWx0IH08L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IG1pbjsgaWR4IDw9IG1heDsgKytpZHgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCwgaWR4LnRvU3RyaW5nKCldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldFBvaW50NVNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gTWF0aC5yb3VuZCgyICogbWluKTsgaWR4IDw9IE1hdGgucm91bmQoMiAqIG1heCk7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHggLyAyLCAoaWR4ICUgMikgPyAoaWR4IC8gMikudG9GaXhlZCgxKSA6IE1hdGguZmxvb3IoaWR4IC8gMikudG9TdHJpbmcoKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cclxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbk1pbnVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0xfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblBsdXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICtcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRBY3JvT3ZlcnJpZGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvcmlnaW5hbF92YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzZW5kX2RlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbmRfZGVsdGFzOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbk1pbnVzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmRfZGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMC41fSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKE1hdGgubWF4KHRoaXMucHJvcHMudmFsdWUgLSAwLjUsIDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblBsdXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZF9kZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDAuNX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShNYXRoLm1pbih0aGlzLnByb3BzLnZhbHVlICsgMC41LCB0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25aZXJvID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSgwKTtcclxuICAgIH1cclxuICAgIG9uUmVzdG9yZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlX2NoYW5nZWQgPSBNYXRoLmFicyh0aGlzLnByb3BzLnZhbHVlIC0gdGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtYWNyby1vdmVycmlkZS1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi16ZXJvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLnZhbHVlIDwgMC4wNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uWmVybyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDihpMwXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXN0b3JlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB2YWx1ZV9jaGFuZ2VkIDwgMC4wNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUmVzdG9yZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDihpFcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLnZhbHVlIDwgMC4wNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSA8IHRoaXMucHJvcHMudmFsdWUgKyAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICtcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWVfY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGAke3RoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUudG9GaXhlZCgxKX0g4oaSICR7dGhpcy5wcm9wcy52YWx1ZS50b0ZpeGVkKDEpfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSkgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxudmFyIHN0b3B3YXRjaGVzID0ge307XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZV9pZF0gfHwge1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgc3RyX3ZhbHVlOiBcIjA6MDBcIixcclxuICAgICAgICAgICAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpcmVjdC1tdXRhdGlvbi1zdGF0ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XHJcbiAgICAgICAgc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZV9pZF0gPSB0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG4gICAgbm93KCkge1xyXG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID8gdGhpcy5zdG9wKCkgOiB0aGlzLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBzdGFydF9hdDogdGhpcy5ub3coKSAtIHRoaXMuc3RhdGUudmFsdWUsXHJcbiAgICAgICAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hY3RpdmVcclxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXHJcbiAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZTtcclxuICAgIH1cclxuICAgIHRpY2soKSB7XHJcbiAgICAgICAgdmFyIG5ld192YWx1ZSA9IHRoaXMudmFsdWUoKTtcclxuICAgICAgICBpZiAobmV3X3ZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGFkKG51bSwgc2l6ZSkge1xyXG4gICAgICAgIHZhciBzID0gXCIwMDAwXCIgKyBudW0udG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcclxuICAgIH1cclxuICAgIGdldFN0clZhbHVlKCkge1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlKCk7XHJcbiAgICAgICAgdmFyIG0gPSAwLCBzID0gMDtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgbSA9IE1hdGguZmxvb3IodmFsIC8gKDYwICogMTAwMCkpO1xyXG4gICAgICAgIHZhbCAlPSA2MCAqIDEwMDA7XHJcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XHJcbiAgICAgICAgcmV0dXJuIG0udG9TdHJpbmcoKSArICc6JyArIHRoaXMucGFkKHMsIDIpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RvcHdhdGNoXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcmVzZXQgaWdub3JlLXJlYWRvbmx5XCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5yZXNldC5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5yZXNldF9zdG9wd2F0Y2hcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIGJ0bi10b2dnbGUgaWdub3JlLXJlYWRvbmx5XCIgKyAodGhpcy5zdGF0ZS5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy50b2dnbGUuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmFjdGl2ZSA/IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3N0b3B3YXRjaFwiKSA6IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdGFydF9zdG9wd2F0Y2hcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RyVmFsdWUoKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
