(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.AutoPrinter = undefined;

var _loader = require("i10n/loader");

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

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    AutoPrinterTableCell.prototype.render = function render() {
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
    };

    return AutoPrinterTableCell;
}(React.Component);

var AutoPrinterTableRow = function (_React$Component2) {
    _inherits(AutoPrinterTableRow, _React$Component2);

    function AutoPrinterTableRow() {
        _classCallCheck(this, AutoPrinterTableRow);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    AutoPrinterTableRow.prototype.onChange = function onChange(action, new_value) {
        var new_row = (0, _tools.clone)(this.props.row);
        new_row[action] = new_value;
        this.props.onChange(new_row);
    };

    AutoPrinterTableRow.prototype.render = function render() {
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
    };

    return AutoPrinterTableRow;
}(React.Component);

var AutoPrinterTable = function (_React$Component3) {
    _inherits(AutoPrinterTable, _React$Component3);

    function AutoPrinterTable() {
        _classCallCheck(this, AutoPrinterTable);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    AutoPrinterTable.prototype.onChange = function onChange(tour_id, new_value) {
        var new_actions = (0, _tools.clone)(this.props.actions);
        new_actions[tour_id] = new_value;
        this.props.onChange(new_actions);
    };

    AutoPrinterTable.prototype.render = function render() {
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
    };

    return AutoPrinterTable;
}(React.Component);

var AutoPrinterJobQueue = function (_React$Component4) {
    _inherits(AutoPrinterJobQueue, _React$Component4);

    function AutoPrinterJobQueue(props) {
        _classCallCheck(this, AutoPrinterJobQueue);

        var _this7 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

        _this7.state = {
            queue: [],
            nowRendering: null
        };
        _this7.scheduleJob();
        return _this7;
    }

    AutoPrinterJobQueue.prototype.addJob = function addJob(job_type, tour, copies) {
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
    };

    AutoPrinterJobQueue.prototype.scheduleJob = function scheduleJob() {
        var _this8 = this;

        setTimeout(function () {
            return _this8.processJob();
        }, 1000);
    };

    AutoPrinterJobQueue.prototype.processJob = function processJob() {
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
    };

    AutoPrinterJobQueue.prototype.retryJob = function retryJob() {
        this.setState({
            queue: [this.state.nowRendering].concat(this.state.queue),
            nowRendering: null
        });
        this.scheduleJob();
    };

    AutoPrinterJobQueue.prototype.continueJob = function continueJob(filename) {
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
    };

    AutoPrinterJobQueue.prototype.createFilename = function createFilename() {
        return Math.random().toString().replace(/[^0-9]/, "") + ".tmp";
    };

    AutoPrinterJobQueue.prototype.renderActiveJob = function renderActiveJob() {
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
    };

    AutoPrinterJobQueue.prototype.render = function render() {
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
    };

    return AutoPrinterJobQueue;
}(React.Component);

var AutoPrinter = exports.AutoPrinter = function (_React$Component5) {
    _inherits(AutoPrinter, _React$Component5);

    function AutoPrinter(props) {
        _classCallCheck(this, AutoPrinter);

        var _this10 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

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

    AutoPrinter.prototype.componentWillMount = function componentWillMount() {
        this.loadData();
        this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.reload_data_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
    };

    AutoPrinter.prototype.componentWillUnmount = function componentWillUnmount() {
        _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.reload_data_listener);
    };

    AutoPrinter.prototype.loadData = function loadData() {
        (0, _api.Api)("competition.get", { competition_id: this.props.competition_id, children: this.SCHEMA }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    AutoPrinter.prototype.reloadFromStorage = function reloadFromStorage() {
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
    };

    AutoPrinter.prototype.printTestPage = function printTestPage() {
        var _this11 = this;

        (0, _dialogs.showConfirm)((0, _loader._)("admin.auto_printer.print_test_page"), function () {
            saveAs(new Blob(["dummy"], { type: 'text/plain' }), "dummy_" + Math.random() + ".tmp");
            saveAs(new Blob(["dummy"], { type: 'text/plain' }), "dummy_" + Math.random() + ".tmp");
            saveAs(new Blob(["dummy"], { type: 'text/plain' }), "dummy_" + Math.random() + ".tmp");
            _this11.refs.queue.addJob("test", null, 1);
        }, true);
    };

    AutoPrinter.prototype.getToursFromCompetition = function getToursFromCompetition(competition) {
        var result = [];
        competition.disciplines.forEach(function (discipline) {
            return discipline.tours.forEach(function (tour) {
                var r = (0, _tools.clone)(tour);
                r.discipline = discipline;
                result.push(r);
            });
        });
        return result;
    };

    AutoPrinter.prototype.getToursMap = function getToursMap(tours) {
        var result = {};
        tours.forEach(function (tour) {
            return result[tour.id] = tour;
        });
        return result;
    };

    AutoPrinter.prototype.dispatchCompetitionUpdate = function dispatchCompetitionUpdate(old_competition, new_competition) {
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
    };

    AutoPrinter.prototype.getNextTour = function getNextTour(tour) {
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
    };

    AutoPrinter.prototype.doTheJob = function doTheJob(tour, action_type, copies) {
        if (action_type === "heats") {
            tour = this.getNextTour(tour);
        }
        if (!tour) {
            return;
        }
        this.refs.queue.addJob(action_type, tour, copies);
    };

    AutoPrinter.prototype.doActionsForTour = function doActionsForTour(tour) {
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
    };

    AutoPrinter.prototype.render = function render() {
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
    };

    return AutoPrinter;
}(React.Component);

var AutoPrinterTestPage = function (_React$Component6) {
    _inherits(AutoPrinterTestPage, _React$Component6);

    function AutoPrinterTestPage() {
        _classCallCheck(this, AutoPrinterTestPage);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    AutoPrinterTestPage.prototype.componentDidMount = function componentDidMount() {
        this.createDocx(this.props.autoDocx.filename);
        this.props.autoDocx.callback(this.props.autoDocx.filename);
    };

    AutoPrinterTestPage.prototype.render = function render() {
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
    };

    AutoPrinterTestPage.prototype.createDocx = function createDocx() {
        var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-results.docx" : arguments[0];

        (0, _docx.Docx)(filename).setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML).save();
    };

    return AutoPrinterTestPage;
}(React.Component);

},{"../judging/discipline_results":2,"../judging/heats":3,"../judging/tour_results":6,"common/docx":8,"common/tools":10,"i10n/loader":11,"server/api":13,"server/message_dispatcher":14,"server/storage":15,"ui/components":16,"ui/dialogs":17}],2:[function(require,module,exports){
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

},{"./rosfarr/discipline_results":4,"common/docx":8,"i10n/loader":11,"server/api":13,"server/message_dispatcher":14,"server/storage":15,"ui/components":16,"ui/printable":18}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.HeatsBody = exports.HeatsButtons = undefined;

var _loader = require("i10n/loader");

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

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    HeatsButtons.prototype.signal = function signal(message) {
        var _this2 = this;

        return function () {
            return _this2.props.onSignal(message);
        }.bind(this);
    };

    HeatsButtons.prototype.render = function render() {
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

    return HeatsButtons;
}(React.Component);

var HeatsBody = exports.HeatsBody = function (_React$Component2) {
    _inherits(HeatsBody, _React$Component2);

    function HeatsBody(props) {
        _classCallCheck(this, HeatsBody);

        var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this3.state = {
            tour: null
        };
        return _this3;
    }

    HeatsBody.prototype.componentWillMount = function componentWillMount() {
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
    };

    HeatsBody.prototype.componentWillUnmount = function componentWillUnmount() {
        _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
        _storage.storage.delDomain("heats_" + this.props.tour_id);
    };

    HeatsBody.prototype.reloadFromStorage = function reloadFromStorage() {
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
    };

    HeatsBody.prototype.loadData = function loadData() {
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
    };

    HeatsBody.prototype.onSignal = function onSignal(message) {
        switch (message) {
            case "docx":
                this.createDocx();
                break;
            default:
                console.log("Unknown message:", message);
        }
    };

    HeatsBody.prototype.renderHeatHeader = function renderHeatHeader(prev_row, next_row) {
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
    };

    HeatsBody.prototype.renderHeatRow = function renderHeatRow(row) {
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
    };

    HeatsBody.prototype.renderHeatRows = function renderHeatRows() {
        var result = [];
        var runs = this.state.tour.runs;
        for (var i = 0; i < runs.length; ++i) {
            var header = this.renderHeatHeader(runs[i - 1], runs[i]);
            header && result.push(header);
            result.push(this.renderHeatRow(runs[i]));
        }
        return result;
    };

    HeatsBody.prototype.render = function render() {
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
    };

    HeatsBody.prototype.createDocx = function createDocx() {
        var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-heats.docx" : arguments[0];

        (0, _docx.Docx)(filename).setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.tour_heats")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(this.refs.printable.fetchPrintableData()).addStyle(".heat-number", "background", "#ccc").addStyle(".heat-number", "text-align", "left").addStyle("td, th", "font-size", "12pt").save();
    };

    return HeatsBody;
}(React.Component);

},{"common/docx":8,"i10n/loader":11,"server/api":13,"server/message_dispatcher":14,"server/storage":15,"ui/components":16,"ui/printable":18}],4:[function(require,module,exports){
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

},{"i10n/loader":11,"ui/tablet_components":19}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.TourResultsTable = exports.TourResultsSemiVerboseTable = exports.TourResultsVerboseTable = undefined;

var _loader = require("i10n/loader");

var _base = require("common/rosfarr/base");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _loader._.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

var TourResultsVerboseTableColumnWidths = function () {
    function TourResultsVerboseTableColumnWidths(n_judges) {
        _classCallCheck(this, TourResultsVerboseTableColumnWidths);

        this.judge_width = Math.round(70 / n_judges);
        this.place_width = 7;
        this.info_width = 100 - this.judge_width * n_judges - this.place_width;
    }

    TourResultsVerboseTableColumnWidths.prototype.genPlaceStyle = function genPlaceStyle() {
        return {
            width: this.place_width + "%"
        };
    };

    TourResultsVerboseTableColumnWidths.prototype.genInfoStyle = function genInfoStyle() {
        return {
            width: this.info_width + "%"
        };
    };

    TourResultsVerboseTableColumnWidths.prototype.genJudgeStyle = function genJudgeStyle() {
        return {
            width: this.judge_width + "%"
        };
    };

    return TourResultsVerboseTableColumnWidths;
}();

var TourResultsVerboseTableRow = function (_React$Component) {
    _inherits(TourResultsVerboseTableRow, _React$Component);

    function TourResultsVerboseTableRow() {
        _classCallCheck(this, TourResultsVerboseTableRow);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    TourResultsVerboseTableRow.prototype.formatScore = function formatScore(score, template) {
        if (!template) {
            template = "$";
        }
        if (score === null) {
            return React.createElement(
                "span",
                null,
                "—"
            );
        }
        return template.replace("$", score).replace("@", score.toFixed(1));
    };

    TourResultsVerboseTableRow.prototype.renderFormationScore = function renderFormationScore(score, additiolal_data) {
        return React.createElement(
            "table",
            { className: "score-breakdown" },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.dt"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.dance_tech, "@")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.df"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.dance_figs, "@")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.i"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.impression, "@")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.m"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.mistakes)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.t"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "total-score" },
                        React.createElement(
                            "p",
                            null,
                            score.data.total_score
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.p"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "total-score" },
                        React.createElement(
                            "p",
                            null,
                            additiolal_data.places[score.id]
                        )
                    )
                )
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderFormationAcroScore = function renderFormationAcroScore(score, additiolal_data) {
        return React.createElement(
            "table",
            { className: "score-breakdown" },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.a"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.acrobatics, "@")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.dt"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.dance_tech, "@")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.df"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.dance_figs, "@")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.i"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.impression, "@")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.sm"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.small_mistakes)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.bm"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.big_mistakes)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.t"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "total-score" },
                        React.createElement(
                            "p",
                            null,
                            score.data.total_score
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.p"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "total-score" },
                        React.createElement(
                            "p",
                            null,
                            additiolal_data.places[score.id]
                        )
                    )
                )
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderDanceScore = function renderDanceScore(score) {
        return React.createElement(
            "table",
            { className: "score-breakdown" },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.fw"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.fw_woman, "-$%")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.fm"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.fw_man, "-$%")
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.df"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.dance_figs)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.c"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.composition)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.sm"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.small_mistakes)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.bm"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.big_mistakes)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.t"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "total-score" },
                        React.createElement(
                            "p",
                            null,
                            score.data.total_score
                        )
                    )
                )
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderAcroScore = function renderAcroScore(score) {
        var acro_scores = score.data.raw_data.reductions.map(function (score, idx) {
            return React.createElement(
                "tr",
                { key: idx },
                React.createElement(
                    "th",
                    null,
                    React.createElement(
                        "p",
                        null,
                        __("results.breakdown.acro_n", idx + 1),
                        ":"
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "p",
                        null,
                        this.formatScore(score, "-$%")
                    )
                )
            );
        }.bind(this));
        return React.createElement(
            "table",
            { className: "score-breakdown" },
            React.createElement(
                "tbody",
                null,
                acro_scores,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.fd"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.mistakes)
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.t"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "total-score" },
                        React.createElement(
                            "p",
                            null,
                            score.data.total_score
                        )
                    )
                )
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderScore = function renderScore(judge, score, additiolal_data) {
        switch ((0, _base.getScoringType)(judge, this.props.tour.scoring_system_name)) {
            case "dance":
                return this.renderDanceScore(score, additiolal_data);
            case "acro":
                return this.renderAcroScore(score, additiolal_data);
            case "formation":
                return this.renderFormationScore(score, additiolal_data);
            case "formation_acro":
                return this.renderFormationAcroScore(score, additiolal_data);
            default:
                return React.createElement(
                    "p",
                    { className: "text-center" },
                    score.data.total_score.toFixed(2)
                );
        }
    };

    TourResultsVerboseTableRow.prototype.renderParticipantInfo = function renderParticipantInfo() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _loader._)("global.phrases.participant_n", this.props.run.participant.number, null, this.props.run.participant.sportsmen.length)
                )
            ),
            (0, _base.getParticipantDisplay)(this.props.run.participant)
        );
    };

    TourResultsVerboseTableRow.prototype.renderHeadJudgePenalty = function renderHeadJudgePenalty() {
        if (!this.props.run.performed) {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.penalty"),
                ": "
            ),
            this.props.head_judge_score ? this.props.head_judge_score.data.total_score : React.createElement(
                "span",
                null,
                "—"
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderAcroTable = function renderAcroTable() {
        if (!this.props.run.performed) {
            return null;
        }
        var has_acro_overrides = false;
        var render_acro_table = this.props.tour.scoring_system_name === "rosfarr.acro" || this.props.tour.scoring_system_name === "rosfarr.am_final_acro";
        if (!render_acro_table) {
            return null;
        }
        this.props.run.acrobatics.forEach(function (acro) {
            if (acro.score !== acro.original_score) {
                has_acro_overrides = true;
            }
        });
        if (this.props.run.acrobatics.length === 0) {
            return null;
        }
        var acro_cell_width = 100 / this.props.run.acrobatics.length + "%";
        return React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    has_acro_overrides ? __("results.labels.acrobatics_verbose") : __("results.labels.acrobatics"),
                    ":"
                )
            ),
            React.createElement(
                "table",
                { className: "acro-table" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        this.props.run.acrobatics.map(function (acro, idx) {
                            return React.createElement(
                                "td",
                                { key: idx, style: { width: acro_cell_width } },
                                React.createElement(
                                    "p",
                                    { className: "text-center" },
                                    acro.original_score.toFixed(1)
                                )
                            );
                        })
                    ),
                    has_acro_overrides ? React.createElement(
                        "tr",
                        null,
                        this.props.run.acrobatics.map(function (acro, idx) {
                            return React.createElement(
                                "td",
                                { key: idx, style: { width: acro_cell_width } },
                                React.createElement(
                                    "p",
                                    { className: "text-center" },
                                    acro.score.toFixed(1)
                                )
                            );
                        })
                    ) : null
                )
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderAmClassFwScore = function renderAmClassFwScore() {
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.fw_score")
            ),
            ": ",
            this.props.run.verbose_total_score.previous_tour.primary_score.toFixed(2) + " / " + this.props.run.verbose_total_score.previous_tour.secondary_score.toFixed(2),
            " "
        );
    };

    TourResultsVerboseTableRow.prototype.renderAmClassAcroScore = function renderAmClassAcroScore() {
        if (!this.props.run.performed) {
            return null;
        }
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.acro_score")
            ),
            ": ",
            this.props.run.verbose_total_score.current_tour.primary_score.toFixed(2) + " / " + this.props.run.verbose_total_score.current_tour.secondary_score.toFixed(2),
            " "
        );
    };

    TourResultsVerboseTableRow.prototype.renderTotalScore = function renderTotalScore() {
        if (!this.props.run.performed) {
            return null;
        }
        if (this.props.tour.scoring_system_name === "rosfarr.formation") {
            return null;
        }
        if (this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.total_score"),
                ": ",
                this.props.run.total_score
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderNotPerformedLabel = function renderNotPerformedLabel() {
        if (this.props.run.performed) {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "em",
                null,
                __("results.labels.not_performed")
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderNextTourLabel = function renderNextTourLabel() {
        if (!this.props.has_next_tour) {
            return null;
        }
        React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.next_tour"),
                ": "
            ),
            this.props.results_info.advances ? (0, _loader._)("global.labels.yes") : (0, _loader._)("global.labels.no")
        );
    };

    TourResultsVerboseTableRow.prototype.renderInfoBlock = function renderInfoBlock() {
        return React.createElement(
            "td",
            { className: "info-block", style: this.props.widths.genInfoStyle() },
            this.renderParticipantInfo(),
            this.renderHeadJudgePenalty(),
            this.renderAcroTable(),
            this.renderAmClassFwScore(),
            this.renderAmClassAcroScore(),
            this.renderTotalScore(),
            this.renderNotPerformedLabel(),
            this.renderNextTourLabel()
        );
    };

    TourResultsVerboseTableRow.prototype.render = function render() {
        var _this2 = this;

        var judges_scores = this.props.scores.map(function (score, idx) {
            return React.createElement(
                "td",
                { key: idx, style: _this2.props.widths.genJudgeStyle() },
                _this2.renderScore(_this2.props.discipline_judges[idx], score, _this2.props.results_info.additional_data)
            );
        });
        if (!this.props.run.performed) {
            judges_scores = this.props.scores.map(function (score, idx) {
                return React.createElement(
                    "td",
                    { style: _this2.props.widths.genJudgeStyle(), key: idx },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        "—"
                    )
                );
            });
        }
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                { className: "place", style: this.props.widths.genPlaceStyle() },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.results_info.place
                )
            ),
            this.renderInfoBlock(),
            judges_scores
        );
    };

    return TourResultsVerboseTableRow;
}(React.Component);

var TourResultsVerboseTable = exports.TourResultsVerboseTable = function (_React$Component2) {
    _inherits(TourResultsVerboseTable, _React$Component2);

    function TourResultsVerboseTable() {
        _classCallCheck(this, TourResultsVerboseTable);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    TourResultsVerboseTable.prototype.render = function render() {
        var tour_wrapper = new _base.TourScoresWrapper(this.props.tour, this.props.results);
        var discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        var scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
            return row[0];
        });
        var results_info = tour_wrapper.getResultsInfo();
        var runs = tour_wrapper.getRuns();
        var has_next_tour = this.props.tour.next_tour_id !== null;
        var rows = [];
        var widths = new TourResultsVerboseTableColumnWidths(discipline_judges.length);
        for (var idx = 0; idx < runs.length; ++idx) {
            rows.push(React.createElement(TourResultsVerboseTableRow, {
                key: runs[idx].id,
                tour: this.props.tour,
                run: runs[idx],
                scores: scores_table[idx],
                widths: widths,
                head_judge_score: head_judge_scores[idx],
                results_info: results_info[idx],
                discipline_judges: discipline_judges,
                has_next_tour: has_next_tour }));
        };
        var judges_header = discipline_judges.map(function (dj) {
            return React.createElement(
                "th",
                { key: dj.id, width: widths.genJudgeStyle() },
                React.createElement(
                    "p",
                    null,
                    dj.judge.number
                )
            );
        });
        return React.createElement(
            "table",
            { className: "bordered-table", style: { width: "100%" } },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { className: "place", width: widths.genPlaceStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.place")
                        )
                    ),
                    React.createElement(
                        "th",
                        { className: "participant", width: widths.genInfoStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.info")
                        )
                    ),
                    judges_header
                )
            ),
            React.createElement(
                "tbody",
                null,
                rows
            )
        );
    };

    return TourResultsVerboseTable;
}(React.Component);

var TourResultsSemiVerboseTableColumnWidths = function () {
    function TourResultsSemiVerboseTableColumnWidths(n_judges) {
        _classCallCheck(this, TourResultsSemiVerboseTableColumnWidths);

        this.judge_width = Math.round(55 / n_judges);
        this.total_score_width = 14;
        this.place_width = 6;
        this.number_width = 3;
        this.name_width = 100 - this.judge_width * n_judges - this.total_score_width - this.place_width - this.number_width;
    }

    TourResultsSemiVerboseTableColumnWidths.prototype.genPlaceStyle = function genPlaceStyle() {
        return {
            width: this.place_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genNumberStyle = function genNumberStyle() {
        return {
            width: this.number_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genNameStyle = function genNameStyle() {
        return {
            width: this.name_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genTotalScoreStyle = function genTotalScoreStyle() {
        return {
            width: this.total_score_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genJudgeStyle = function genJudgeStyle() {
        return {
            width: this.judge_width + "%"
        };
    };

    return TourResultsSemiVerboseTableColumnWidths;
}();

var TourResultsSemiVerboseTableRow = function (_React$Component3) {
    _inherits(TourResultsSemiVerboseTableRow, _React$Component3);

    function TourResultsSemiVerboseTableRow() {
        _classCallCheck(this, TourResultsSemiVerboseTableRow);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    TourResultsSemiVerboseTableRow.prototype.renderFormationScore = function renderFormationScore(score, additiolal_data) {
        return React.createElement(
            "p",
            { className: "text-center" },
            React.createElement(
                "strong",
                null,
                additiolal_data.places[score.id]
            ),
            " (",
            score.data.total_score.toFixed(1),
            ")"
        );
    };

    TourResultsSemiVerboseTableRow.prototype.renderScore = function renderScore(judge, score, additiolal_data) {
        if (judge.role === "dance_judge") {
            if (this.props.tour.scoring_system_name === "rosfarr.formation" || this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
                return this.renderFormationScore(score, additiolal_data);
            }
        }
        return React.createElement(
            "p",
            { className: "text-center" },
            score.data.total_score.toFixed(2)
        );
    };

    TourResultsSemiVerboseTableRow.prototype.render = function render() {
        var _this5 = this;

        var judges_scores = this.props.scores.map(function (score, idx) {
            return React.createElement(
                "td",
                { key: idx },
                " ",
                _this5.renderScore(_this5.props.discipline_judges[idx], score, _this5.props.results_info.additional_data),
                " "
            );
        });
        if (!this.props.run.performed) {
            judges_scores = this.props.scores.map(function (score, idx) {
                return React.createElement(
                    "td",
                    { key: idx },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        "—"
                    )
                );
            });
        }
        var total_score = this.props.run.verbose_total_score;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                { className: "place" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.results_info.place
                )
            ),
            React.createElement(
                "td",
                { className: "number" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.run.participant.number
                )
            ),
            React.createElement(
                "td",
                { className: "participant" },
                (0, _base.getParticipantDisplay)(this.props.run.participant)
            ),
            this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro" ? React.createElement(
                "td",
                { className: "total-score" },
                function () {
                    if (!_this5.props.run.performed) {
                        return React.createElement(
                            "p",
                            { className: "text-center" },
                            "—"
                        );
                    }
                    if (_this5.props.tour.scoring_system_name === "rosfarr.am_final_acro") {
                        return React.createElement(
                            "p",
                            { className: "text-center" },
                            React.createElement(
                                "em",
                                null,
                                __("results.labels.fw_score_short"),
                                ": ",
                                total_score.previous_tour.primary_score.toFixed(2),
                                " / ",
                                total_score.previous_tour.secondary_score.toFixed(2),
                                React.createElement("br", null)
                            ),
                            React.createElement(
                                "strong",
                                null,
                                total_score.primary_score.toFixed(2)
                            ),
                            " /",
                            " ",
                            total_score.secondary_score.toFixed(2)
                        );
                    }
                    return React.createElement(
                        "p",
                        { className: "text-center" },
                        React.createElement(
                            "strong",
                            null,
                            total_score.primary_score.toFixed(2)
                        ),
                        " /",
                        " ",
                        total_score.secondary_score.toFixed(2)
                    );
                }()
            ) : null,
            judges_scores,
            React.createElement(
                "td",
                { className: "card" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.head_judge_score && this.props.run.performed ? this.props.head_judge_score.data.total_score : React.createElement(
                        "span",
                        null,
                        "—"
                    )
                )
            )
        );
    };

    return TourResultsSemiVerboseTableRow;
}(React.Component);

var TourResultsSemiVerboseTable = exports.TourResultsSemiVerboseTable = function (_React$Component4) {
    _inherits(TourResultsSemiVerboseTable, _React$Component4);

    function TourResultsSemiVerboseTable() {
        _classCallCheck(this, TourResultsSemiVerboseTable);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    TourResultsSemiVerboseTable.prototype.renderAdvancesHeader = function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
        var prev_status = prev_row ? prev_run.performed ? prev_row.advances ? "advanced" : "not_advanced" : "not_performed" : null;
        var next_status = next_run.performed ? next_row.advances ? "advanced" : "not_advanced" : "not_performed";
        var result = prev_status !== next_status ? next_status === "not_performed" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_performed")
        ) : has_next_tour ? next_status === "not_advanced" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_advanced")
        ) : React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_advanced")
        ) : null : null;
        if (result === null) {
            return null;
        }
        return React.createElement(
            "tr",
            { key: "NT" + idx },
            React.createElement(
                "th",
                { className: "advances-header", colSpan: n_cols },
                result
            )
        );
    };

    TourResultsSemiVerboseTable.prototype.render = function render() {
        var tour_wrapper = new _base.TourScoresWrapper(this.props.tour, this.props.results);
        var discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        var scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
            return row[0];
        });
        var results_info = tour_wrapper.getResultsInfo();
        var runs = tour_wrapper.getRuns();
        var has_next_tour = this.props.tour.next_tour_id !== null;
        var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        var widths = new TourResultsSemiVerboseTableColumnWidths(discipline_judges.length + 1);
        var judges_header = discipline_judges.map(function (dj) {
            var suffix = (0, _base.getScoringType)(dj, this.props.tour.scoring_system_name) === "acro" ? " (A)" : "";
            return React.createElement(
                "th",
                { key: dj.id, style: widths.genJudgeStyle() },
                React.createElement(
                    "p",
                    null,
                    dj.judge.number + suffix
                )
            );
        }.bind(this));
        var rows = [];
        for (var idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(has_next_tour, results_info[idx - 1], results_info[idx], runs[idx - 1], runs[idx], idx, 4 + discipline_judges.length + has_total_score));
            rows.push(React.createElement(TourResultsSemiVerboseTableRow, {
                key: runs[idx].id,
                head_judge_score: head_judge_scores[idx],
                results_info: results_info[idx],
                tour: this.props.tour,
                run: runs[idx],
                scores: scores_table[idx],
                discipline_judges: discipline_judges,
                has_next_tour: has_next_tour,
                has_total_score: has_total_score }));
        };
        return React.createElement(
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
                        { className: "place", style: widths.genPlaceStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.place")
                        )
                    ),
                    React.createElement(
                        "th",
                        { className: "number", style: widths.genNumberStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.number")
                        )
                    ),
                    React.createElement(
                        "th",
                        { className: "participant", style: widths.genNameStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.participant_name")
                        )
                    ),
                    has_total_score ? React.createElement(
                        "th",
                        { className: "total-score", style: widths.genTotalScoreStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.total_score")
                        )
                    ) : null,
                    judges_header,
                    React.createElement(
                        "th",
                        { className: "card", style: widths.genJudgeStyle() },
                        React.createElement(
                            "p",
                            { className: "text-center" },
                            __("results.labels.card")
                        )
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                rows
            )
        );
    };

    return TourResultsSemiVerboseTable;
}(React.Component);

var TourResultsTableRow = function (_React$Component5) {
    _inherits(TourResultsTableRow, _React$Component5);

    function TourResultsTableRow() {
        _classCallCheck(this, TourResultsTableRow);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    TourResultsTableRow.prototype.render = function render() {
        var card = this.props.run.performed ? this.props.head_judge_score ? this.props.head_judge_score.data.total_score : "0" : React.createElement(
            "span",
            null,
            "—"
        );
        var total_score = this.props.has_total_score ? this.props.run.performed ? React.createElement(
            "p",
            { className: "text-center" },
            React.createElement(
                "strong",
                null,
                this.props.run.verbose_total_score.primary_score.toFixed(2)
            ),
            " /",
            " ",
            this.props.run.verbose_total_score.secondary_score.toFixed(2)
        ) : React.createElement(
            "p",
            { className: "text-center" },
            "—"
        ) : null;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                { className: "w-7 place" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.results_info.place
                )
            ),
            React.createElement(
                "td",
                { className: "w-6 number" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.run.participant.number
                )
            ),
            React.createElement(
                "td",
                { className: "w-30 participant" },
                (0, _base.getParticipantDisplay)(this.props.run.participant)
            ),
            React.createElement(
                "td",
                { className: "club" },
                React.createElement(
                    "p",
                    null,
                    this.props.run.participant.club.name
                )
            ),
            this.props.has_total_score ? React.createElement(
                "td",
                { className: "w-18 score" },
                total_score
            ) : null,
            React.createElement(
                "td",
                { className: "w-8 card" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    card
                )
            )
        );
    };

    return TourResultsTableRow;
}(React.Component);

var TourResultsTable = exports.TourResultsTable = function (_React$Component6) {
    _inherits(TourResultsTable, _React$Component6);

    function TourResultsTable() {
        _classCallCheck(this, TourResultsTable);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    TourResultsTable.prototype.renderAdvancesHeader = function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
        var prev_status = prev_row ? prev_run.performed ? prev_row.advances ? "advanced" : "not_advanced" : "not_performed" : null;
        var next_status = next_run.performed ? next_row.advances ? "advanced" : "not_advanced" : "not_performed";
        var result = prev_status !== next_status ? next_status === "not_performed" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_performed")
        ) : has_next_tour ? next_status === "not_advanced" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_advanced")
        ) : React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_advanced")
        ) : null : null;
        if (result === null) {
            return null;
        }
        return React.createElement(
            "tr",
            { key: "NT" + idx },
            React.createElement(
                "th",
                { className: "advances-header", colSpan: n_cols },
                result
            )
        );
    };

    TourResultsTable.prototype.render = function render() {
        var tour_wrapper = new _base.TourScoresWrapper(this.props.tour, this.props.results);
        var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
            return row[0];
        });
        var results_info = tour_wrapper.getResultsInfo();
        var runs = tour_wrapper.getRuns();
        var has_next_tour = this.props.tour.next_tour_id !== null;
        var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        var rows = [];
        for (var idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(has_next_tour, results_info[idx - 1], results_info[idx], runs[idx - 1], runs[idx], idx, 5 + has_total_score));
            rows.push(React.createElement(TourResultsTableRow, {
                key: runs[idx].id,
                head_judge_score: head_judge_scores[idx],
                results_info: results_info[idx],
                run: runs[idx],
                has_next_tour: has_next_tour,
                has_total_score: has_total_score }));
        };
        return React.createElement(
            "div",
            { className: "brief-table" },
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
                            { className: "w-7 place" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.place")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-6 number" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.number")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-30 participant" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.participant_name")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "club" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.participant_club")
                            )
                        ),
                        has_total_score ? React.createElement(
                            "th",
                            { className: "w-18 score" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.total_score")
                            )
                        ) : null,
                        React.createElement(
                            "th",
                            { className: "w-8 card" },
                            React.createElement(
                                "p",
                                { className: "text-center" },
                                __("results.labels.card")
                            )
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    rows
                )
            )
        );
    };

    return TourResultsTable;
}(React.Component);

},{"common/rosfarr/base":9,"i10n/loader":11}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.TourResultsBody = exports.TourResultsButtons = undefined;

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _printable = require("ui/printable");

var _docx = require("common/docx");

var _tour_results = require("./rosfarr/tour_results");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsButtons = exports.TourResultsButtons = function (_React$Component) {
    _inherits(TourResultsButtons, _React$Component);

    function TourResultsButtons() {
        _classCallCheck(this, TourResultsButtons);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    TourResultsButtons.prototype.signal = function signal(message) {
        var _this2 = this;

        return function () {
            return _this2.props.onSignal(message);
        }.bind(this);
    };

    TourResultsButtons.prototype.render = function render() {
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

    return TourResultsButtons;
}(React.Component);

var TourResultsBody = exports.TourResultsBody = function (_React$Component2) {
    _inherits(TourResultsBody, _React$Component2);

    // Initialization

    function TourResultsBody(props) {
        _classCallCheck(this, TourResultsBody);

        var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

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

    TourResultsBody.prototype.componentWillMount = function componentWillMount() {
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
    };

    TourResultsBody.prototype.componentWillUnmount = function componentWillUnmount() {
        _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.results_change_listener);
        _storage.storage.delDomain("results_" + this.props.tour_id);
    };

    TourResultsBody.prototype.reloadFromStorage = function reloadFromStorage() {
        var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(this.TOUR_SCHEMA);
        this.setState({
            tour: serialized
        });
    };

    TourResultsBody.prototype.loadResults = function loadResults() {
        (0, _api.Api)("tour.get_results", { tour_id: this.props.tour_id }).onSuccess(function (new_results) {
            this.setState({
                "results": new_results
            });
            this.reloadFromStorage();
        }.bind(this)).send();
    };

    TourResultsBody.prototype.loadData = function loadData() {
        (0, _api.Api)("tour.get", { tour_id: this.props.tour_id, children: this.TOUR_SCHEMA }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    // Listeners

    TourResultsBody.prototype.onSignal = function onSignal(message) {
        switch (message) {
            case "docx":
                this.createDocx();
                break;
            default:
                console.log("Unknown message:", message);
        }
    };

    // Rendering

    TourResultsBody.prototype.renderNonFinalizedWarning = function renderNonFinalizedWarning() {
        if (!this.state.tour.finalized) {
            return React.createElement(
                "div",
                { className: "alert alert-danger" },
                (0, _loader._)("results.alerts.not_finalized")
            );
        }
    };

    TourResultsBody.prototype.render = function render() {
        // eslint-disable-line react/sort-comp
        if (this.state.tour === null || this.state.results === null) {
            return React.createElement(_components.Loader, null);
        }
        var table = null;
        if (this.props.verbosity === "3") {
            table = React.createElement(_tour_results.TourResultsVerboseTable, this.state);
        } else if (this.props.verbosity === "2") {
            table = React.createElement(_tour_results.TourResultsSemiVerboseTable, this.state);
        } else {
            table = React.createElement(_tour_results.TourResultsTable, this.state);
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
    };

    TourResultsBody.prototype.createDocx = function createDocx() {
        var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-results.docx" : arguments[0];

        (0, _docx.Docx)(filename).setMargins([10, 10, 15, 10]).setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.tour_results")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML).addStyle(".bordered-table", "font-size", this.props.verbosity === "1" ? "12pt" : "9pt").addStyle(".bordered-table .acro-table td", "font-size", "9pt").addStyle(".bordered-table .acro-table td", "padding", "0 3pt").addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none").addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0").addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt").addStyle(".score-breakdown th", "text-align", "right").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown", "width", "50pt").addStyle(".advances-header", "background-color", "#ddd").addStyle(".total-score", "font-weight", "bold").addStyle(".head_judge", "width", "5%").addStyle(".dance_judge", "width", "8%").addStyle(".acro_judge", "width", "8%").save();
    };

    return TourResultsBody;
}(React.Component);

},{"./rosfarr/tour_results":5,"common/docx":8,"i10n/loader":11,"server/api":13,"server/message_dispatcher":14,"server/storage":15,"ui/components":16,"ui/printable":18}],7:[function(require,module,exports){
"use strict";

var _main = require("admin/auto_printer/main");

ReactDOM.render(React.createElement(_main.AutoPrinter, window.page_props), document.getElementById("content"));

},{"admin/auto_printer/main":1}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getParticipantDisplay = getParticipantDisplay;
exports.getScoringType = getScoringType;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunScoresWrapper = exports.RunScoresWrapper = function () {
    function RunScoresWrapper(run, discipline_judges) {
        _classCallCheck(this, RunScoresWrapper);

        this.run = run;
        this.discipline_judges = discipline_judges;
        this.scores_by_discipline_judge_id = {};
        run.scores.forEach(function (score) {
            var dj_id = score.discipline_judge_id;
            this.scores_by_discipline_judge_id[dj_id] = score;
        }.bind(this));
    }

    RunScoresWrapper.prototype.getScoresByJudgeIds = function getScoresByJudgeIds(discipline_judge_ids) {
        var _this = this;

        return discipline_judge_ids.map(function (dj_id) {
            return _this.scores_by_discipline_judge_id[dj_id];
        }.bind(this));
    };

    return RunScoresWrapper;
}();

var TourScoresWrapper = exports.TourScoresWrapper = function () {
    function TourScoresWrapper(tour, results) {
        var _this2 = this;

        _classCallCheck(this, TourScoresWrapper);

        this.run_wrappers = tour.runs.map(function (run) {
            return new RunScoresWrapper(run, tour.discipline_judges);
        });
        this.discipline_judges = tour.discipline.discipline_judges;
        this.discipline_judges_by_roles = {};
        this.discipline_judges.forEach(function (dj, idx) {
            var arr = this.discipline_judges_by_roles[dj.role] || [];
            arr.push({
                idx: idx,
                discipline_judge: dj
            });
            this.discipline_judges_by_roles[dj.role] = arr;
        }.bind(this));
        if (results) {
            (function () {
                var results_by_run_ids = {};
                results.forEach(function (res) {
                    return results_by_run_ids[res.run_id] = res;
                });
                _this2.run_wrappers.forEach(function (w) {
                    return w.results_info = results_by_run_ids[w.run.id];
                });
                _this2.run_wrappers.sort(function (a, b) {
                    return a.results_info.place - b.results_info.place;
                });
            })();
        }
    }

    TourScoresWrapper.prototype.getDisciplineJudgesByRoles = function getDisciplineJudgesByRoles() {
        if (arguments.length === 1) {
            return this.discipline_judges_by_roles[arguments[0]] ? this.discipline_judges_by_roles[arguments[0]].map(function (b) {
                return b.discipline_judge;
            }) : [];
        }
        var res = [];
        for (var i = 0; i < arguments.length; ++i) {
            res = res.concat(this.discipline_judges_by_roles[arguments[i]] || []);
        }
        res.sort(function (a, b) {
            return a.idx - b.idx;
        });
        return res.map(function (b) {
            return b.discipline_judge;
        });
    };

    TourScoresWrapper.prototype.getScoresTableByRoles = function getScoresTableByRoles() {
        var discipline_judge_ids = this.getDisciplineJudgesByRoles.apply(this, arguments).map(function (dj) {
            return dj.id;
        });
        return this.run_wrappers.map(function (w) {
            return w.getScoresByJudgeIds(discipline_judge_ids);
        });
    };

    TourScoresWrapper.prototype.getResultsInfo = function getResultsInfo() {
        return this.run_wrappers.map(function (w) {
            return w.results_info;
        });
    };

    TourScoresWrapper.prototype.getRuns = function getRuns() {
        return this.run_wrappers.map(function (w) {
            return w.run;
        });
    };

    return TourScoresWrapper;
}();

function getParticipantDisplay(participant) {
    if (participant.formation_name !== "") {
        return React.createElement(
            "p",
            null,
            participant.formation_name
        );
    }
    return participant.sportsmen.map(function (s, idx) {
        return React.createElement(
            "p",
            { key: idx },
            s.last_name + " " + s.first_name
        );
    });
}

function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
        case "dance_judge":
            switch (scoring_system_name) {
                case "rosfarr.formation":
                    return "formation";
                case "rosfarr.formation_acro":
                    return "formation_acro";
                case "rosfarr.simplified":
                    return "simplified";
                default:
                    return "dance";
            }
        case "acro_judge":
            switch (scoring_system_name) {
                case "rosfarr.am_final_fw":
                    return "dance";
                default:
                    return "acro";
            }
        case "tech_judge":
            return "tech";
        case "head_judge":
            return "head";
    }
}

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":12}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"i10n/loader":11,"server/storage":15,"ui/dialogs":17}],14:[function(require,module,exports){
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

},{"server/storage":15}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"i10n/loader":11}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"i10n/loader":11}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGF1dG9fcHJpbnRlclxcbWFpbi5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGhlYXRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xccm9zZmFyclxcZGlzY2lwbGluZV9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xccm9zZmFyclxcdG91cl9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xcdG91cl9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhdXRvX3ByaW50ZXIuanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcZG9jeC5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFxyb3NmYXJyXFxiYXNlLmpzeCIsInNyY1xcanN4XFxjb21tb25cXHRvb2xzLmpzeCIsInNyY1xcanN4XFxpMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGkxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxccHJpbnRhYmxlLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDYU07Ozs7Ozs7OzttQ0FDRiwyQkFBUzs7O0FBQ0wsZUFBTzs7Y0FBSSxXQUFVLE9BQVYsRUFBSjtZQUNIO0FBQ0ksc0JBQUss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ImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBzaG93Q29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBjbG9uZSB9IGZyb20gXCJjb21tb24vdG9vbHNcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcbmltcG9ydCB7IEhlYXRzQm9keSB9IGZyb20gXCIuLi9qdWRnaW5nL2hlYXRzXCI7XG5pbXBvcnQgeyBUb3VyUmVzdWx0c0JvZHkgfSBmcm9tIFwiLi4vanVkZ2luZy90b3VyX3Jlc3VsdHNcIjtcbmltcG9ydCB7IERpc2NpcGxpbmVSZXN1bHRzIH0gZnJvbSBcIi4uL2p1ZGdpbmcvZGlzY2lwbGluZV9yZXN1bHRzXCI7XG5cblxuY2xhc3MgQXV0b1ByaW50ZXJUYWJsZUNlbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbnB1dFwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyAoZSkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZShwYXJzZUludChlLnRhcmdldC52YWx1ZS5yZXBsYWNlKC9bXlxcZF0vLCBcIlwiKSkgfHwgMCkgfSAvPlxuICAgICAgICA8L3RkPlxuICAgIH1cbn1cblxuY2xhc3MgQXV0b1ByaW50ZXJUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgb25DaGFuZ2UoYWN0aW9uLCBuZXdfdmFsdWUpIHtcbiAgICAgICAgbGV0IG5ld19yb3cgPSBjbG9uZSh0aGlzLnByb3BzLnJvdyk7XG4gICAgICAgIG5ld19yb3dbYWN0aW9uXSA9IG5ld192YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfcm93KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImRpc2NpcGxpbmVcIj57IGAke3RoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLm5hbWV9IOKAlCAke3RoaXMucHJvcHMudG91ci5uYW1lfWAgfTwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMucG9zc2libGVBY3Rpb25zLm1hcCgoYWN0aW9uKSA9PlxuICAgICAgICAgICAgICAgIDxBdXRvUHJpbnRlclRhYmxlQ2VsbFxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBhY3Rpb24gfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMucm93W2FjdGlvbl0gfHwgXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGFjdGlvbikgfSAvPlxuICAgICAgICAgICAgKSB9XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5jbGFzcyBBdXRvUHJpbnRlclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBvbkNoYW5nZSh0b3VyX2lkLCBuZXdfdmFsdWUpIHtcbiAgICAgICAgbGV0IG5ld19hY3Rpb25zID0gY2xvbmUodGhpcy5wcm9wcy5hY3Rpb25zKTtcbiAgICAgICAgbmV3X2FjdGlvbnNbdG91cl9pZF0gPSBuZXdfdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3X2FjdGlvbnMpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwidG91cnMtdGFibGVcIj48dGJvZHk+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImRpc2NpcGxpbmVcIj57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIuZGlzY2lwbGluZVwiKSB9PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLmhlYXRzXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18xXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18yXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18zXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIuZGlzY2lwbGluZV9yZXN1bHRzXCIpIH08L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3Vycy5tYXAoKHRvdXIpID0+XG4gICAgICAgICAgICAgICAgPEF1dG9QcmludGVyVGFibGVSb3dcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgdG91ci5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0b3VyIH1cbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5hY3Rpb25zW3RvdXIuaWRdIHx8IHt9IH1cbiAgICAgICAgICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zPXsgdGhpcy5wcm9wcy5wb3NzaWJsZUFjdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB0b3VyLmlkKSB9IC8+XG4gICAgICAgICAgICApIH1cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgQXV0b1ByaW50ZXJKb2JRdWV1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcXVldWU6IFtdLFxuICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XG4gICAgfVxuICAgIGFkZEpvYihqb2JfdHlwZSwgdG91ciwgY29waWVzKSB7XG4gICAgICAgIGxldCBuZXdfcXVldWUgPSBjbG9uZSh0aGlzLnN0YXRlLnF1ZXVlKTtcbiAgICAgICAgbmV3X3F1ZXVlLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogam9iX3R5cGUsXG4gICAgICAgICAgICB0b3VyOiB0b3VyLFxuICAgICAgICAgICAgY29waWVzOiBjb3BpZXMsXG4gICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IG5ld19xdWV1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNjaGVkdWxlSm9iKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc0pvYigpLCAxMDAwKTtcbiAgICB9XG4gICAgcHJvY2Vzc0pvYigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubm93UmVuZGVyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGpvYiA9IHRoaXMuc3RhdGUucXVldWVbMF07XG4gICAgICAgIGlmICgham9iKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQodGhpcy5yZXRyeUpvYi5iaW5kKHRoaXMpLCAxMDAwMCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IHRoaXMuc3RhdGUucXVldWUuc2xpY2UoMSksXG4gICAgICAgICAgICBub3dSZW5kZXJpbmc6IGpvYixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHJ5Sm9iKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiBbdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmddLmNvbmNhdCh0aGlzLnN0YXRlLnF1ZXVlKSxcbiAgICAgICAgICAgIG5vd1JlbmRlcmluZzogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVKb2IoKTtcbiAgICB9XG4gICAgY29udGludWVKb2IoZmlsZW5hbWUpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBqb2IgPSB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZztcbiAgICAgICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gYGh0dHA6Ly8xMjcuMC4wLjE6NTk0OS9wcmludC1kb2N4P2ZpbGVuYW1lPSR7IGZpbGVuYW1lIH0mY29waWVzPSR7IGpvYi5jb3BpZXMgfWA7XG4gICAgICAgICAgICB4aHIub3BlbihcIkdFVFwiLCBhZGRyZXNzLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7fTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4gdGhpcy5hZGRKb2Ioam9iLnR5cGUsIGpvYi50b3VyLCBqb2IuY29waWVzKTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBub3dSZW5kZXJpbmc6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVKb2IoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICAgIGNyZWF0ZUZpbGVuYW1lKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnJlcGxhY2UoL1teMC05XS8sIFwiXCIpICsgXCIudG1wXCI7XG4gICAgfVxuICAgIHJlbmRlckFjdGl2ZUpvYigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLm5vd1JlbmRlcmluZykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLm5vd1JlbmRlcmluZy50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJoZWF0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxIZWF0c0JvZHlcbiAgICAgICAgICAgICAgICB0b3VyX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5pZH1cbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXzFcIjpcbiAgICAgICAgICAgIHJldHVybiA8VG91clJlc3VsdHNCb2R5XG4gICAgICAgICAgICAgICAgdG91cl9pZD17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnRvdXIuaWR9XG4gICAgICAgICAgICAgICAgdmVyYm9zaXR5PVwiMVwiXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9e3sgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgY2FsbGJhY2s6IHRoaXMuY29udGludWVKb2IuYmluZCh0aGlzKSB9fSAvPlxuICAgICAgICBjYXNlIFwicmVzdWx0c18yXCI6XG4gICAgICAgICAgICByZXR1cm4gPFRvdXJSZXN1bHRzQm9keVxuICAgICAgICAgICAgICAgIHRvdXJfaWQ9eyB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZy50b3VyLmlkfVxuICAgICAgICAgICAgICAgIHZlcmJvc2l0eT1cIjJcIlxuICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXt7IGZpbGVuYW1lOiB0aGlzLmNyZWF0ZUZpbGVuYW1lKCksIGNhbGxiYWNrOiB0aGlzLmNvbnRpbnVlSm9iLmJpbmQodGhpcykgfX0gLz5cbiAgICAgICAgY2FzZSBcInJlc3VsdHNfM1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxUb3VyUmVzdWx0c0JvZHlcbiAgICAgICAgICAgICAgICB0b3VyX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5pZH1cbiAgICAgICAgICAgICAgICB2ZXJib3NpdHk9XCIzXCJcbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGNhc2UgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5kaXNjaXBsaW5lLmlkIH1cbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGNhc2UgXCJ0ZXN0XCI6XG4gICAgICAgICAgICByZXR1cm4gPEF1dG9QcmludGVyVGVzdFBhZ2VcbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBqb2IgdHlwZTpcIiwgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJxdWV1ZSBxdWV1ZS1lbXB0eVwiPlxuICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5xdWV1ZV9lbXB0eVwiKSB9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBY3RpdmVKb2IoKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJxdWV1ZVwiPlxuICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnF1ZXVlLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGtleT17IGl0ZW0uaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGl0ZW0udHlwZSA9PT0gXCJ0ZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIudGVzdF9wYWdlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtpdGVtLnRvdXIuZGlzY2lwbGluZS5uYW1lfSDigJQgJHtpdGVtLnRvdXIubmFtZX1gIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLlwiICsgaXRlbS50eXBlKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcGllc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpdGVtLmNvcGllcyB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQWN0aXZlSm9iKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1dG9QcmludGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGFjdGlvbnM6IHt9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLlNDSEVNQSA9IHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgdG91cnM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5QT1NTSUJMRV9BQ1RJT05TID0gW1wiaGVhdHNcIiwgXCJyZXN1bHRzXzFcIiwgXCJyZXN1bHRzXzJcIiwgXCJyZXN1bHRzXzNcIiwgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIl07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJlbG9hZF9kYXRhX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9kYXRhX2xpc3RlbmVyKTtcbiAgICB9XG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLmdldFwiLCB7IGNvbXBldGl0aW9uX2lkOiB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkLCBjaGlsZHJlbjogdGhpcy5TQ0hFTUEgfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiQ29tcGV0aXRpb25cIiwgdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZClcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgIGxldCBuZXdfY29tcGV0aXRpb24gPSBzdG9yYWdlLmdldChcIkNvbXBldGl0aW9uXCIpLmJ5X2lkKHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpO1xuICAgICAgICBpZiAoIW5ld19jb21wZXRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5ld19jb21wZXRpdGlvbiA9IG5ld19jb21wZXRpdGlvbi5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wZXRpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaENvbXBldGl0aW9uVXBkYXRlKHRoaXMuc3RhdGUuY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogbmV3X2NvbXBldGl0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpbnRUZXN0UGFnZSgpIHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcImFkbWluLmF1dG9fcHJpbnRlci5wcmludF90ZXN0X3BhZ2VcIiksICgpID0+IHtcbiAgICAgICAgICAgIHNhdmVBcyhuZXcgQmxvYihbXCJkdW1teVwiXSwge3R5cGUgOiAndGV4dC9wbGFpbid9KSwgYGR1bW15XyR7TWF0aC5yYW5kb20oKX0udG1wYCk7XG4gICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBkdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xuICAgICAgICAgICAgc2F2ZUFzKG5ldyBCbG9iKFtcImR1bW15XCJdLCB7dHlwZSA6ICd0ZXh0L3BsYWluJ30pLCBgZHVtbXlfJHtNYXRoLnJhbmRvbSgpfS50bXBgKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5xdWV1ZS5hZGRKb2IoXCJ0ZXN0XCIsIG51bGwsIDEpO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0VG91cnNGcm9tQ29tcGV0aXRpb24oY29tcGV0aXRpb24pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBjb21wZXRpdGlvbi5kaXNjaXBsaW5lcy5mb3JFYWNoKChkaXNjaXBsaW5lKSA9PlxuICAgICAgICAgICAgZGlzY2lwbGluZS50b3Vycy5mb3JFYWNoKCh0b3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSBjbG9uZSh0b3VyKTtcbiAgICAgICAgICAgICAgICByLmRpc2NpcGxpbmUgPSBkaXNjaXBsaW5lO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHIpO1xuICAgICAgICAgICAgfSApXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZ2V0VG91cnNNYXAodG91cnMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICB0b3Vycy5mb3JFYWNoKCh0b3VyKSA9PiByZXN1bHRbdG91ci5pZF0gPSB0b3VyKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZGlzcGF0Y2hDb21wZXRpdGlvblVwZGF0ZShvbGRfY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbikge1xuICAgICAgICBsZXQgb2xkX3RvdXJzID0gdGhpcy5nZXRUb3Vyc01hcCh0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKG9sZF9jb21wZXRpdGlvbikpO1xuICAgICAgICBsZXQgbmV3X3RvdXJzID0gdGhpcy5nZXRUb3Vyc01hcCh0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKG5ld19jb21wZXRpdGlvbikpO1xuICAgICAgICBPYmplY3Qua2V5cyhvbGRfdG91cnMpLmZvckVhY2goKHRvdXJfaWQpID0+IHtcbiAgICAgICAgICAgIGlmICghbmV3X3RvdXJzW3RvdXJfaWRdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvbGRfdG91cnNbdG91cl9pZF0uZmluYWxpemVkICYmIG5ld190b3Vyc1t0b3VyX2lkXS5maW5hbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQWN0aW9uc0ZvclRvdXIobmV3X3RvdXJzW3RvdXJfaWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5leHRUb3VyKHRvdXIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGUuY29tcGV0aXRpb24uZGlzY2lwbGluZXMuZm9yRWFjaCgoZGlzY2lwbGluZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBkaXNjaXBsaW5lLnRvdXJzLmZvckVhY2goKGRfdG91cikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkX3RvdXIuaWQgPT09IHRvdXIuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHIgPSBjbG9uZShkX3RvdXIpO1xuICAgICAgICAgICAgICAgICAgICByLmRpc2NpcGxpbmUgPSBkaXNjaXBsaW5lO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gKVxuICAgICAgICB9IClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZG9UaGVKb2IodG91ciwgYWN0aW9uX3R5cGUsIGNvcGllcykge1xuICAgICAgICBpZiAoYWN0aW9uX3R5cGUgPT09IFwiaGVhdHNcIikge1xuICAgICAgICAgICAgdG91ciA9IHRoaXMuZ2V0TmV4dFRvdXIodG91cik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b3VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZzLnF1ZXVlLmFkZEpvYihhY3Rpb25fdHlwZSwgdG91ciwgY29waWVzKTtcbiAgICB9XG4gICAgZG9BY3Rpb25zRm9yVG91cih0b3VyKSB7XG4gICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5zdGF0ZS5hY3Rpb25zW3RvdXIuaWRdO1xuICAgICAgICBpZiAoIWFjdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlBPU1NJQkxFX0FDVElPTlMuZm9yRWFjaCgoYWN0aW9uX3R5cGUpID0+IHtcbiAgICAgICAgICAgIGlmIChhY3Rpb25zW2FjdGlvbl90eXBlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9UaGVKb2IodG91ciwgYWN0aW9uX3R5cGUsIGFjdGlvbnNbYWN0aW9uX3R5cGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5jb21wZXRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRvLXByaW50ZXJcIj5cbiAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgPGgxPnsgXyhcImFkbWluLmhlYWRlcnMuYXV0b19wcmludGVyXCIpIH08L2gxPlxuICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJ1bGVzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8QXV0b1ByaW50ZXJUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cnM9eyB0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKHRoaXMuc3RhdGUuY29tcGV0aXRpb24pIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM9eyB0aGlzLnN0YXRlLmFjdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyAobmV3X2FjdGlvbnMpID0+IHRoaXMuc2V0U3RhdGUoeyBhY3Rpb25zOiBuZXdfYWN0aW9ucyB9KSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZUFjdGlvbnM9eyB0aGlzLlBPU1NJQkxFX0FDVElPTlMgfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi1xdWV1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnF1ZXVlXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8QXV0b1ByaW50ZXJKb2JRdWV1ZSByZWY9XCJxdWV1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdC1wYWdlLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17IHRoaXMucHJpbnRUZXN0UGFnZS5iaW5kKHRoaXMpIH0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg0J/QtdGH0LDRgtGMINGC0LXRgdGC0L7QstC+0Lkg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgQXV0b1ByaW50ZXJUZXN0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICB9XG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgcmV0dXJuIDxkaXYgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgPHA+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnRlc3RfdGV4dFwiKSB9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgY3JlYXRlRG9jeChmaWxlbmFtZT1cInRvdXItcmVzdWx0cy5kb2N4XCIpIHtcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcbiAgICAgICAgICAgIC5zZXRCb2R5KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jb250ZW50KS5pbm5lckhUTUwpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcblxuaW1wb3J0IHtcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxuICAgIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUsXG4gICAgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlLFxufSBmcm9tIFwiLi9yb3NmYXJyL2Rpc2NpcGxpbmVfcmVzdWx0c1wiO1xuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzaWduYWwobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gKCgpID0+IHRoaXMucHJvcHMub25TaWduYWwobWVzc2FnZSkpLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyB0aGlzLnNpZ25hbChcImRvY3hcIikgfT5cbiAgICAgICAgICAgICAgICBET0NYXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW5kZXJlcjogXCJwYWdlXCIsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ydW5zX2xvYWRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZFN0YXRlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0b3VyX3N0b3JhZ2UgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKS5ieV9pZChtZXNzYWdlW1widG91cl9pZFwiXSk7XG4gICAgICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuZGlzY2lwbGluZS5pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzLnByaW50YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4LmNhbGxiYWNrKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyKTtcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJkaXNjaXBsaW5lX3Jlc3VsdHNfXCIgKyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpO1xuICAgIH1cbiAgICByZWxvYWRTdGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmRpc2NpcGxpbmVfcmVzdWx0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5ydW5zX2xvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdG9yYWdlX3J1bnMgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiUnVuXCIpXG4gICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHM7XG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBbXVxuICAgICAgICB2YXIgU0NIRU1BID0ge1xuICAgICAgICAgICAgdG91cjoge30sXG4gICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgIHNwb3J0c21lbjoge30sXG4gICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbmV3X3N0YXRlLnB1c2goe1xuICAgICAgICAgICAgICAgIHBsYWNlOiByZXN1bHRzW2ldLnBsYWNlLFxuICAgICAgICAgICAgICAgIHJ1bjogc3RvcmFnZV9ydW5zLmJ5X2lkKHJlc3VsdHNbaV0ucnVuX2lkKS5zZXJpYWxpemUoU0NIRU1BKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbG9hZGVkOiB0cnVlLFxuICAgICAgICAgICAgdGFibGU6IG5ld19zdGF0ZSxcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHRoaXMuc3RvcmFnZS5nZXQoXCJEaXNjaXBsaW5lXCIpLmJ5X2lkKHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCkuc2VyaWFsaXplKHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWRSZXN1bHRzKCkge1xuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldF9yZXN1bHRzXCIsIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uU3VjY2VzcyhyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX3Jlc3VsdHM6IHJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZFN0YXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldFwiLCB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQsXG4gICAgICAgICAgICBjaGlsZHJlbjoge1xuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgICAgICB0b3Vyczoge1xuICAgICAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFkZFRvREIoXCJEaXNjaXBsaW5lXCIsIHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucnVuc19sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRTdGF0ZSh0aGlzKVxuICAgICAgICB9KVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cblxuICAgIC8vIExpc3RlbmVyc1xuXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbmRlcmluZ1xuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnJlbmRlcmVyKSB7XG4gICAgICAgIGNhc2UgXCJwcmVzZW50ZXJcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSByZWY9XCJtYWluX3RhYmxlXCIgLz5cbiAgICAgICAgY2FzZSBcInNjcmVlbl9vcGVyYXRvclwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGVcbiAgICAgICAgICAgICAgICB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGxhY2U9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfVxuICAgICAgICAgICAgICAgIG9uUGxhY2VTZWxlY3Q9eyB0aGlzLnByb3BzLm9uUGxhY2VTZWxlY3QgfVxuICAgICAgICAgICAgICAgIHJlZj1cIm1haW5fdGFibGVcIiAvPlxuICAgICAgICBjYXNlIFwicGFnZVwiOlxuICAgICAgICAgICAgcmV0dXJuIDxQcmludGFibGVcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSB9XG4gICAgICAgICAgICAgICAgdGl0bGUzPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgICAgIGJvZHk9eyA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSAvPiB9IC8+XG4gICAgICAgIGNhc2UgXCJ0YWJsZVwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9IHJlZj1cIm1haW5fdGFibGVcIiAvPlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmxvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+PExvYWRlciAvPjwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlKVxuICAgICAgICAgICAgLnNldFRpdGxlMShfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikpXG4gICAgICAgICAgICAuc2V0VGl0bGUzKHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lKVxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5yZWZzLnByaW50YWJsZS5mZXRjaFByaW50YWJsZURhdGEoKSlcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3VyLW5hbWVcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwicGFkZGluZ1wiLCBcIjBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zcG9ydHNtZW5cIiwgXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgIC5zYXZlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBIZWF0c0J1dHRvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHNpZ25hbChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17IHRoaXMuc2lnbmFsKFwiZG9jeFwiKSB9PlxuICAgICAgICAgICAgICAgIERPQ1hcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBIZWF0c0JvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZS5nZXREb21haW4oXCJoZWF0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hdXRvRG9jeCkge1xuICAgICAgICAgICAgbGV0IGludGVydmFsX2lkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZnMucHJpbnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJoZWF0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgU0NIRU1BID0ge1xuICAgICAgICAgICAgZGlzY2lwbGluZToge1xuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VyaWFsaXplZCA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy50b3VyX2lkKVxuICAgICAgICAgICAgLnNlcmlhbGl6ZShTQ0hFTUEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRvdXI6IHNlcmlhbGl6ZWQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyX2lkLFxuICAgICAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMucHJvcHMudG91cl9pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgb25TaWduYWwobWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJIZWF0SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cuaGVhdCAhPT0gbmV4dF9yb3cuaGVhdClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIkhcIiArIG5leHRfcm93LmhlYXQgfT48dGggY2xhc3NOYW1lPVwiaGVhdC1udW1iZXJcIiBjb2xTcGFuPVwiM1wiPlxuICAgICAgICAgICAgPHA+eyBfKFwiZ2xvYmFsLnBocmFzZXMuaGVhdF9uXCIsIG5leHRfcm93LmhlYXQpIH08L3A+XG4gICAgICAgIDwvdGg+PC90cj47XG5cbiAgICB9XG4gICAgcmVuZGVySGVhdFJvdyhyb3cpIHtcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIlJcIiArIHJvdy5pZCB9PlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyByb3cucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZD48cD57IHJvdy5wYXJ0aWNpcGFudC5uYW1lIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZD48cD57IHJvdy5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfTwvcD48L3RkPlxuICAgICAgICA8L3RyPjtcbiAgICB9XG4gICAgcmVuZGVySGVhdFJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0aGlzLnN0YXRlLnRvdXIucnVucztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydW5zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJIZWF0SGVhZGVyKHJ1bnNbaSAtIDFdLCBydW5zW2ldKTtcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJIZWF0Um93KHJ1bnNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gPExvYWRlciAvPlxuICAgICAgICB9XG4gICAgICAgIGxldCBib2R5ID0gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLWhlYXRzXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj48dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+PHA+eyBfKFwianVkZ2luZy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPjxwPnsgXyhcImp1ZGdpbmcubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+PHA+eyBfKFwianVkZ2luZy5sYWJlbHMuY2x1YlwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+PHRib2R5PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWF0Um93cygpIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+O1xuICAgICAgICByZXR1cm4gPFByaW50YWJsZVxuICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxuICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMudG91cl9oZWF0c1wiKSB9XG4gICAgICAgICAgICB0aXRsZTI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUudG91ci5uYW1lIH1cbiAgICAgICAgICAgIGJvZHk9eyBib2R5IH1cbiAgICAgICAgICAgIHJlZj1cInByaW50YWJsZVwiIC8+XG4gICAgfVxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0b3VyLWhlYXRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9oZWF0c1wiKSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXG4gICAgICAgICAgICAuc2V0Qm9keSh0aGlzLnJlZnMucHJpbnRhYmxlLmZldGNoUHJpbnRhYmxlRGF0YSgpKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmhlYXQtbnVtYmVyXCIsIFwiYmFja2dyb3VuZFwiLCBcIiNjY2NcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWF0LW51bWJlclwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCJ0ZCwgdGhcIiwgXCJmb250LXNpemVcIiwgXCIxMnB0XCIpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IG9uVG91Y2hFbmRPckNsaWNrIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XG5cblxuZnVuY3Rpb24gX18oKSB7XG4gICAgbGV0IGFyZ3MgPSBbXTtcbiAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xuICAgIH1cbiAgICByZXR1cm4gXyhcInNjb3Jpbmdfc3lzdGVtcy5yb3NmYXJyLlwiICsgYXJndW1lbnRzWzBdLCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9Pjx0aCBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBjb2xTcGFuPVwiNlwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfTwvcD5cbiAgICAgICAgPC90aD48L3RyPjtcbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdykge1xuICAgICAgICBsZXQgcCA9IHJvdy5ydW4ucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJSXCIgKyByb3cucnVuLmlkIH0+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IHBsYWNlXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHJvdy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOiByb3cucGxhY2UgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcC5udW1iZXIgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzZcIiBjb2xTcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzcG9ydHNtZW5cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHsgcC5mb3JtYXRpb25fbmFtZSA/IDx0cj48dGggY29sU3Bhbj1cIjJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IHAuZm9ybWF0aW9uX25hbWUgfTwvcD48L3RoPjwvdHI+IDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgIHsgcC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+IDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTc1XCI+PHA+eyBzLmxhc3RfbmFtZSArIFwiIFwiICsgcy5maXJzdF9uYW1lIH08L3A+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHMueWVhcl9vZl9iaXJ0aCB9PC9wPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+ICkgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjbHViXCI+PHA+eyBwLmNsdWIubmFtZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjb2FjaGVzXCI+PHA+eyBwLmNvYWNoZXMuc3BsaXQoXCIsXCIpLm1hcCgoYykgPT4gW2MudHJpbSgpLCA8YnIga2V5PVwiWFwiIC8+XSkgfTwvcD48L3RkPlxuICAgICAgICA8L3RyPjtcbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSAtIDFdLCB0YWJsZVtpXSk7XG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yN1wiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5cIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOVwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jbHViXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NvYWNoZXNcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cblxuY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2dnbGVBY3RpdmUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiAhdGhpcy5zdGF0ZS5hY3RpdmUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wcm9wcy5wYXJ0aWNpcGFudDtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnRvZ2dsZUFjdGl2ZS5iaW5kKHRoaXMpKX0+PHRib2R5PlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIzXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57IHRoaXMucHJvcHMucGxhY2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibmFtZVwiPnsgcC5uYW1lIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiIGNvbFNwYW49XCIyXCI+eyBwLmNsdWIubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNvYWNoZXNcIiBjb2xTcGFuPVwiMlwiPnsgcC5jb2FjaGVzIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT5cbiAgICAgICAgICAgIHsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJSb3cocm93KSB7XG4gICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZVJvdyBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ9eyByb3cucnVuLnBhcnRpY2lwYW50IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlPXsgcm93LnBsYWNlIH0gLz5cbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gdGFibGUubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpICsgMV0sIHRhYmxlW2ldKTtcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wcm9wcy5wYXJ0aWNpcGFudDtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnByb3BzLnNlbGVjdGVkID8gXCIgc2VsZWN0ZWRcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy5wcm9wcy5vbkNsaWNrKX0+PHRib2R5PlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57IHRoaXMucHJvcHMucGxhY2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibmFtZVwiPnsgcC5uYW1lIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiIGNvbFNwYW49XCIyXCI+eyBwLmNsdWIubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT5cbiAgICAgICAgICAgIHsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJSb3cocm93LCBwbGFjZSkge1xuICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVJvd1xuICAgICAgICAgICAga2V5PXsgXCJSXCIgKyByb3cucnVuLmlkIH1cbiAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcm93LnJ1bi5wYXJ0aWNpcGFudCB9XG4gICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9XG4gICAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gdGhpcy5wcm9wcy5vblBsYWNlU2VsZWN0KHBsYWNlKSB9XG4gICAgICAgICAgICBzZWxlY3RlZD17IHRoaXMucHJvcHMuc2VsZWN0ZWRQbGFjZSAhPT0gbnVsbCAmJiBwbGFjZSA+PSB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfSAvPlxuICAgIH1cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XG4gICAgICAgIGZvciAobGV0IGkgPSB0YWJsZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgKyAxXSwgdGFibGVbaV0pO1xuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSwgaSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IFRvdXJTY29yZXNXcmFwcGVyLCBnZXRQYXJ0aWNpcGFudERpc3BsYXksIGdldFNjb3JpbmdUeXBlIH0gZnJvbSBcImNvbW1vbi9yb3NmYXJyL2Jhc2VcIjtcblxuXG5mdW5jdGlvbiBfXygpIHtcbiAgICBsZXQgYXJncyA9IFtdO1xuICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XG4gICAgfVxuICAgIHJldHVybiBfKFwic2NvcmluZ19zeXN0ZW1zLnJvc2ZhcnIuXCIgKyBhcmd1bWVudHNbMF0sIC4uLmFyZ3MpO1xufVxuXG5jbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZUNvbHVtbldpZHRocyB7XG4gICAgY29uc3RydWN0b3Iobl9qdWRnZXMpIHtcbiAgICAgICAgdGhpcy5qdWRnZV93aWR0aCA9IE1hdGgucm91bmQoNzAgLyBuX2p1ZGdlcyk7XG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA3XG4gICAgICAgIHRoaXMuaW5mb193aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtIHRoaXMucGxhY2Vfd2lkdGg7XG4gICAgfVxuICAgIGdlblBsYWNlU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wbGFjZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5JbmZvU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5pbmZvX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5qdWRnZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGZvcm1hdFNjb3JlKHNjb3JlLCB0ZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IFwiJFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29yZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxzcGFuPiZtZGFzaDs8L3NwYW4+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoXCIkXCIsIHNjb3JlKS5yZXBsYWNlKFwiQFwiLCBzY29yZS50b0ZpeGVkKDEpKTtcbiAgICB9XG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX3RlY2gsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEubWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvcD48L3RkPjwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG4gICAgcmVuZGVyRm9ybWF0aW9uQWNyb1Njb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5hXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmFjcm9iYXRpY3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX3RlY2gsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLnNtYWxsX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnBcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBhZGRpdGlvbGFsX2RhdGEucGxhY2VzW3Njb3JlLmlkXSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJEYW5jZVNjb3JlKHNjb3JlKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZndcIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZndfd29tYW4sIFwiLSQlXCIpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZndfbWFuLCBcIi0kJVwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uY1wiKSAgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuY29tcG9zaXRpb24pIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uc21cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuc21hbGxfbWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuYmlnX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxuICAgIHJlbmRlckFjcm9TY29yZShzY29yZSkge1xuICAgICAgICBsZXQgYWNyb19zY29yZXMgPSBzY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMubWFwKGZ1bmN0aW9uKHNjb3JlLCBpZHgpIHtcbiAgICAgICAgICAgIHJldHVybiA8dHIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgPHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5hY3JvX25cIiwgaWR4ICsgMSkgfTo8L3A+PC90aD5cbiAgICAgICAgICAgICAgICA8dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLCBcIi0kJVwiKSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgIHsgYWNyb19zY29yZXMgfVxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZmRcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxuICAgIHJlbmRlclNjb3JlKGp1ZGdlLCBzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XG4gICAgICAgIHN3aXRjaCAoZ2V0U2NvcmluZ1R5cGUoanVkZ2UsIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSkge1xuICAgICAgICBjYXNlIFwiZGFuY2VcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRhbmNlU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvbkFjcm9TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH08L3A+O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlclBhcnRpY2lwYW50SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8cD48c3Ryb25nPnsgXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoXG4gICAgICAgICAgICApfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgIHsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50KSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBlbmFsdHlcIikgfTogPC9zdHJvbmc+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZSA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj4gfTwvcD5cbiAgICB9XG4gICAgcmVuZGVyQWNyb1RhYmxlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhhc19hY3JvX292ZXJyaWRlcyA9IGZhbHNlO1xuICAgICAgICBsZXQgcmVuZGVyX2Fjcm9fdGFibGUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFjcm9cIiB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCI7XG4gICAgICAgIGlmICghcmVuZGVyX2Fjcm9fdGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MuZm9yRWFjaChmdW5jdGlvbihhY3JvKSB7XG4gICAgICAgICAgICBpZiAoYWNyby5zY29yZSAhPT0gYWNyby5vcmlnaW5hbF9zY29yZSkge1xuICAgICAgICAgICAgICAgIGhhc19hY3JvX292ZXJyaWRlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhY3JvX2NlbGxfd2lkdGggPSAoMTAwIC8gdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5sZW5ndGgpICsgXCIlXCI7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPHA+PHN0cm9uZz57IGhhc19hY3JvX292ZXJyaWRlcyA/IF9fKFwicmVzdWx0cy5sYWJlbHMuYWNyb2JhdGljc192ZXJib3NlXCIpIDogX18oXCJyZXN1bHRzLmxhYmVscy5hY3JvYmF0aWNzXCIpIH06PC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImFjcm8tdGFibGVcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyPntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT4gPHRkIGtleT17IGlkeCB9IHN0eWxlPXt7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfX0+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5vcmlnaW5hbF9zY29yZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+KVxuICAgICAgICAgICAgICAgIH08L3RyPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzX2Fjcm9fb3ZlcnJpZGVzID8gPHRyPntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17eyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH19PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLnNjb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+KVxuICAgICAgICAgICAgICAgICAgICB9PC90cj4gOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyQW1DbGFzc0Z3U2NvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLmZ3X3Njb3JlXCIpIH08L3N0cm9uZz46IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgKyBcIiAvIFwiICtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICB9IDwvcD5cbiAgICB9XG4gICAgcmVuZGVyQW1DbGFzc0Fjcm9TY29yZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLmFjcm9fc2NvcmVcIikgfTwvc3Ryb25nPjoge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpICsgXCIgLyBcIiArXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICB9IDwvcD5cbiAgICB9XG4gICAgcmVuZGVyVG90YWxTY29yZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHA+PHN0cm9uZz57IF9fKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfTogeyB0aGlzLnByb3BzLnJ1bi50b3RhbF9zY29yZSB9PC9zdHJvbmc+PC9wPjtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48ZW0+XG4gICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMubm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgIDwvZW0+PC9wPlxuICAgIH1cbiAgICByZW5kZXJOZXh0VG91ckxhYmVsKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaGFzX25leHRfdG91cikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgPHA+PHN0cm9uZz57IF9fKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpIH06IDwvc3Ryb25nPntcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVzdWx0c19pbmZvLmFkdmFuY2VzID8gXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpIDogXyhcImdsb2JhbC5sYWJlbHMubm9cIilcbiAgICAgICAgfTwvcD5cbiAgICB9XG4gICAgcmVuZGVySW5mb0Jsb2NrKCkge1xuICAgICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT1cImluZm8tYmxvY2tcIiBzdHlsZT17IHRoaXMucHJvcHMud2lkdGhzLmdlbkluZm9TdHlsZSgpIH0+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydGljaXBhbnRJbmZvKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRKdWRnZVBlbmFsdHkoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQWNyb1RhYmxlKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NGd1Njb3JlKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVG90YWxTY29yZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb3RQZXJmb3JtZWRMYWJlbCgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0VG91ckxhYmVsKCkgfVxuICAgICAgICA8L3RkPlxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlKHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZXNbaWR4XSwgc2NvcmUsIHRoaXMucHJvcHMucmVzdWx0c19pbmZvLmFkZGl0aW9uYWxfZGF0YSkgfVxuICAgICAgICAgICAgPC90ZD4pO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5KdWRnZVN0eWxlKCkgfSBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjwvdGQ+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5QbGFjZVN0eWxlKCkgfT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8ucGxhY2UgfTwvcD5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySW5mb0Jsb2NrKCkgfVxuICAgICAgICAgICAgeyBqdWRnZXNfc2NvcmVzIH1cbiAgICAgICAgPC90cj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VzID0gdG91cl93cmFwcGVyLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xuICAgICAgICBsZXQgc2NvcmVzX3RhYmxlID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGxldCByb3dzID0gW107XG4gICAgICAgIGxldCB3aWR0aHMgPSBuZXcgVG91clJlc3VsdHNWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMoZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlUm93XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuc1tpZHhdLmlkIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxuICAgICAgICAgICAgICAgIHNjb3Jlcz17IHNjb3Jlc190YWJsZVtpZHhdIH1cbiAgICAgICAgICAgICAgICB3aWR0aHM9eyB3aWR0aHMgfVxuICAgICAgICAgICAgICAgIGhlYWRfanVkZ2Vfc2NvcmU9eyBoZWFkX2p1ZGdlX3Njb3Jlc1tpZHhdIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm89eyByZXN1bHRzX2luZm9baWR4XSB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM9eyBkaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgaGFzX25leHRfdG91cj17IGhhc19uZXh0X3RvdXIgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGp1ZGdlc19oZWFkZXIgPSBkaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZnVuY3Rpb24oZGopIHtcbiAgICAgICAgICAgIHJldHVybiA8dGgga2V5PXsgZGouaWQgfSB3aWR0aD17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT48cD57IGRqLmp1ZGdlLm51bWJlciB9PC9wPjwvdGg+XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCIgc3R5bGU9e3sgd2lkdGg6IFwiMTAwJVwiIH19PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgd2lkdGg9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgd2lkdGg9eyB3aWR0aHMuZ2VuSW5mb1N0eWxlKCkgfT48cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgX18oXCJyZXN1bHRzLmxhYmVscy5pbmZvXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIHsganVkZ2VzX2hlYWRlciB9XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgeyByb3dzIH1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgfVxufVxuXG5jbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMge1xuICAgIGNvbnN0cnVjdG9yKG5fanVkZ2VzKSB7XG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDU1IC8gbl9qdWRnZXMpO1xuICAgICAgICB0aGlzLnRvdGFsX3Njb3JlX3dpZHRoID0gMTQ7XG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA2O1xuICAgICAgICB0aGlzLm51bWJlcl93aWR0aCA9IDM7XG4gICAgICAgIHRoaXMubmFtZV93aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtXG4gICAgICAgICAgICB0aGlzLnRvdGFsX3Njb3JlX3dpZHRoIC0gdGhpcy5wbGFjZV93aWR0aCAtIHRoaXMubnVtYmVyX3dpZHRoO1xuICAgIH1cbiAgICBnZW5QbGFjZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuTnVtYmVyU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5udW1iZXJfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuTmFtZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubmFtZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5Ub3RhbFNjb3JlU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy50b3RhbF9zY29yZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5KdWRnZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48c3Ryb25nPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvc3Ryb25nPiAoeyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMSkgfSk8L3A+XG4gICAgfVxuICAgIHJlbmRlclNjb3JlKGp1ZGdlLCBzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XG4gICAgICAgIGlmIChqdWRnZS5yb2xlID09PSBcImRhbmNlX2p1ZGdlXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiIHx8IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfTwvcD47XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTY29yZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2VzW2lkeF0sIHNjb3JlLCB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZGRpdGlvbmFsX2RhdGEpXG4gICAgICAgIH0gPC90ZD4pO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjwvdGQ+KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlO1xuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucmVzdWx0c19pbmZvLnBsYWNlIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiPnsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50KSB9PC90ZD5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJcbiAgICAgICAgICAgICAgICA/IDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICB7ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPiZtZGFzaDs8L3A+O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgX18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZV9zaG9ydFwiKSB9e1wiOiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfXtcIiAvIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH08YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9lbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57IHRvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOy97XCIgXCJ9eyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+eyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOy97XCIgXCJ9eyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+O1xuICAgICAgICAgICAgICAgICAgICB9KSgpIH1cbiAgICAgICAgICAgICAgICA8L3RkPiA6IG51bGwgfVxuICAgICAgICAgICAgeyBqdWRnZXNfc2NvcmVzIH1cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkX2p1ZGdlX3Njb3JlICYmIHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlXG4gICAgICAgICAgICAgICAgICAgIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj5cbiAgICAgICAgICAgIH08L3A+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKGhhc19uZXh0X3RvdXIgLHByZXZfcm93LCBuZXh0X3JvdywgcHJldl9ydW4sIG5leHRfcnVuLCBpZHgsIG5fY29scykge1xuICAgICAgICBsZXQgcHJldl9zdGF0dXMgPSBwcmV2X3Jvd1xuICAgICAgICAgICAgPyBwcmV2X3J1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICA/IHByZXZfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCJcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IG5leHRfc3RhdHVzID0gbmV4dF9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICA/IG5leHRfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCI7XG4gICAgICAgIGxldCByZXN1bHQgPSBwcmV2X3N0YXR1cyAhPT0gbmV4dF9zdGF0dXNcbiAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgOiBoYXNfbmV4dF90b3VyXG4gICAgICAgICAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiTlRcIiArIGlkeCB9Pjx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XG4gICAgICAgICAgICB7IHJlc3VsdCB9XG4gICAgICAgIDwvdGg+PC90cj5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VzID0gdG91cl93cmFwcGVyLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xuICAgICAgICBsZXQgc2NvcmVzX3RhYmxlID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGxldCBoYXNfdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiICYmIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjtcbiAgICAgICAgbGV0IHdpZHRocyA9IG5ldyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMoZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoICsgMSk7XG4gICAgICAgIGxldCBqdWRnZXNfaGVhZGVyID0gZGlzY2lwbGluZV9qdWRnZXMubWFwKGZ1bmN0aW9uKGRqKSB7XG4gICAgICAgICAgICBsZXQgc3VmZml4ID0gZ2V0U2NvcmluZ1R5cGUoZGosIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA9PT0gXCJhY3JvXCIgPyBcIiAoQSlcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgKyBzdWZmaXggfTwvcD48L3RoPlxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBydW5zLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXIsXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHhdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4IC0gMV0sXG4gICAgICAgICAgICAgICAgcnVuc1tpZHhdLFxuICAgICAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgICAgICA0ICsgZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoICsgaGFzX3RvdGFsX3Njb3JlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIHJvd3MucHVzaCg8VG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlUm93XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuc1tpZHhdLmlkIH1cbiAgICAgICAgICAgICAgICBoZWFkX2p1ZGdlX3Njb3JlPXsgaGVhZF9qdWRnZV9zY29yZXNbaWR4XSB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvPXsgcmVzdWx0c19pbmZvW2lkeF0gfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1bnNbaWR4XSB9XG4gICAgICAgICAgICAgICAgc2NvcmVzPXsgc2NvcmVzX3RhYmxlW2lkeF0gfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzPXsgZGlzY2lwbGluZV9qdWRnZXMgfVxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH1cbiAgICAgICAgICAgICAgICBoYXNfdG90YWxfc2NvcmU9eyBoYXNfdG90YWxfc2NvcmUgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cIm51bWJlclwiIHN0eWxlPXsgd2lkdGhzLmdlbk51bWJlclN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuTmFtZVN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIHsgaGFzX3RvdGFsX3Njb3JlID8gPHRoIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuVG90YWxTY29yZVN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfTwvcD48L3RoPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICB7IGp1ZGdlc19oZWFkZXIgfVxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgVG91clJlc3VsdHNUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgY2FyZCA9IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmVcbiAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlXG4gICAgICAgICAgICAgICAgOiBcIjBcIlxuICAgICAgICAgICAgOiA8c3Bhbj4mbWRhc2g7PC9zcGFuPjtcbiAgICAgICAgbGV0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5oYXNfdG90YWxfc2NvcmUgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnsgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDogPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPlxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy02IG51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzAgcGFydGljaXBhbnRcIj57IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiPjxwPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuY2x1Yi5uYW1lIH08L3A+PC90ZD5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5oYXNfdG90YWxfc2NvcmUgPyA8dGQgY2xhc3NOYW1lPVwidy0xOCBzY29yZVwiPnsgdG90YWxfc2NvcmUgfTwvdGQ+IDogbnVsbCB9XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IGNhcmRcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgY2FyZCB9PC9wPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyQWR2YW5jZXNIZWFkZXIoaGFzX25leHRfdG91ciwgcHJldl9yb3csIG5leHRfcm93LCBwcmV2X3J1biwgbmV4dF9ydW4sIGlkeCwgbl9jb2xzKSB7XG4gICAgICAgIGxldCBwcmV2X3N0YXR1cyA9IHByZXZfcm93XG4gICAgICAgICAgICA/IHByZXZfcnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgID8gcHJldl9yb3cuYWR2YW5jZXNcbiAgICAgICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgOiBcIm5vdF9wZXJmb3JtZWRcIlxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBsZXQgbmV4dF9zdGF0dXMgPSBuZXh0X3J1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgID8gbmV4dF9yb3cuYWR2YW5jZXNcbiAgICAgICAgICAgICAgICA/IFwiYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgOiBcIm5vdF9wZXJmb3JtZWRcIjtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHByZXZfc3RhdHVzICE9PSBuZXh0X3N0YXR1c1xuICAgICAgICAgICAgPyBuZXh0X3N0YXR1cyA9PT0gXCJub3RfcGVyZm9ybWVkXCJcbiAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIikgfTwvcD5cbiAgICAgICAgICAgICAgICA6IGhhc19uZXh0X3RvdXJcbiAgICAgICAgICAgICAgICAgICAgPyBuZXh0X3N0YXR1cyA9PT0gXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDogPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfYWR2YW5jZWRcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJOVFwiICsgaWR4IH0+PHRoIGNsYXNzTmFtZT1cImFkdmFuY2VzLWhlYWRlclwiIGNvbFNwYW49eyBuX2NvbHMgfT5cbiAgICAgICAgICAgIHsgcmVzdWx0IH1cbiAgICAgICAgPC90aD48L3RyPlxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCB0b3VyX3dyYXBwZXIgPSBuZXcgVG91clNjb3Jlc1dyYXBwZXIodGhpcy5wcm9wcy50b3VyLCB0aGlzLnByb3BzLnJlc3VsdHMpO1xuICAgICAgICBsZXQgaGVhZF9qdWRnZV9zY29yZXMgPSB0b3VyX3dyYXBwZXIuZ2V0U2NvcmVzVGFibGVCeVJvbGVzKFwiaGVhZF9qdWRnZVwiKS5tYXAoKHJvdykgPT4gcm93WzBdKTtcbiAgICAgICAgbGV0IHJlc3VsdHNfaW5mbyA9IHRvdXJfd3JhcHBlci5nZXRSZXN1bHRzSW5mbygpO1xuICAgICAgICBsZXQgcnVucyA9IHRvdXJfd3JhcHBlci5nZXRSdW5zKCk7XG4gICAgICAgIGxldCBoYXNfbmV4dF90b3VyID0gdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbDtcbiAgICAgICAgbGV0IGhhc190b3RhbF9zY29yZSA9IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgJiYgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBydW5zLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXIsXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHhdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4IC0gMV0sXG4gICAgICAgICAgICAgICAgcnVuc1tpZHhdLFxuICAgICAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgICAgICA1ICsgaGFzX3RvdGFsX3Njb3JlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIHJvd3MucHVzaCg8VG91clJlc3VsdHNUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH1cbiAgICAgICAgICAgICAgICBoYXNfdG90YWxfc2NvcmU9eyBoYXNfdG90YWxfc2NvcmUgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYnJpZWYtdGFibGVcIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy02IG51bWJlclwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMzAgcGFydGljaXBhbnRcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2x1YlwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jbHViXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaGFzX3RvdGFsX3Njb3JlID8gPHRoIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfTwvcD48L3RoPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IF9fKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcblxuaW1wb3J0IHsgVG91clJlc3VsdHNUYWJsZSwgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlLCBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSB9IGZyb20gXCIuL3Jvc2ZhcnIvdG91cl9yZXN1bHRzXCI7XG5cblxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuICgoKSA9PiB0aGlzLnByb3BzLm9uU2lnbmFsKG1lc3NhZ2UpKS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XG4gICAgICAgICAgICAgICAgRE9DWFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgICAgIHJlc3VsdHM6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5UT1VSX1NDSEVNQSA9IHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IHtcbiAgICAgICAgICAgICAgICAgICAganVkZ2U6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6IHt9LFxuICAgICAgICAgICAgICAgIHNjb3Jlczoge30sXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZS5nZXREb21haW4oXCJyZXN1bHRzX1wiICsgdGhpcy5wcm9wcy50b3VyX2lkKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlIHx8IG1lc3NhZ2UudG91cl9pZCA9PT0gdGhpcy5wcm9wcy50b3VyX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbF9pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5kYl91cGRhdGVfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKFwicmVzdWx0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgc2VyaWFsaXplZCA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy50b3VyX2lkKVxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlRPVVJfU0NIRU1BKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b3VyOiBzZXJpYWxpemVkLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZFJlc3VsdHMoKSB7XG4gICAgICAgIEFwaShcInRvdXIuZ2V0X3Jlc3VsdHNcIiwge3RvdXJfaWQ6IHRoaXMucHJvcHMudG91cl9pZH0pXG4gICAgICAgIC5vblN1Y2Nlc3MoZnVuY3Rpb24obmV3X3Jlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBuZXdfcmVzdWx0cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSgpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJ0b3VyLmdldFwiLCB7IHRvdXJfaWQ6IHRoaXMucHJvcHMudG91cl9pZCwgY2hpbGRyZW46IHRoaXMuVE9VUl9TQ0hFTUF9KVxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMucHJvcHMudG91cl9pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgIH1cblxuICAgIC8vIExpc3RlbmVyc1xuXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbmRlcmluZ1xuXG4gICAgcmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnRvdXIuZmluYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIj57IF8oXCJyZXN1bHRzLmFsZXJ0cy5ub3RfZmluYWxpemVkXCIpIH08L2Rpdj5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsIHx8IHRoaXMuc3RhdGUucmVzdWx0cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFibGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy52ZXJib3NpdHkgPT09IFwiM1wiKSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSB7Li4udGhpcy5zdGF0ZX0gLz5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIyXCIpIHtcbiAgICAgICAgICAgIHRhYmxlID0gPFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZSB7Li4udGhpcy5zdGF0ZX0gLz5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhYmxlID0gPFRvdXJSZXN1bHRzVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRhYmxlT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG91ci1yZXN1bHRzXCIgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb25GaW5hbGl6ZWRXYXJuaW5nKCkgfVxuICAgICAgICAgICAgICAgIHsgdGFibGUgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJvZHkgPSA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0cyBwLWNvbnRlbnRcIiByZWY9XCJjb250ZW50XCI+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIH1cbiAgICAgICAgICAgIHsgdGFibGUgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucHJpbnRhYmxlXG4gICAgICAgICAgICA/IDxQcmludGFibGVcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlIH1cbiAgICAgICAgICAgICAgICB0aXRsZTE9eyBfKFwiYWRtaW4uaGVhZGVycy50b3VyX3Jlc3VsdHNcIikgfVxuICAgICAgICAgICAgICAgIHRpdGxlMj17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUudG91ci5uYW1lIH1cbiAgICAgICAgICAgICAgICBib2R5PXsgYm9keSB9IC8+XG4gICAgICAgICAgICA6IGJvZHk7XG4gICAgfVxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0b3VyLXJlc3VsdHMuZG9jeFwiKSB7XG4gICAgICAgIERvY3goZmlsZW5hbWUpXG4gICAgICAgICAgICAuc2V0TWFyZ2lucyhbMTAsIDEwLCAxNSwgMTBdKVxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpKVxuICAgICAgICAgICAgLnNldFRpdGxlMih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lKVxuICAgICAgICAgICAgLnNldFRpdGxlMyh0aGlzLnN0YXRlLnRvdXIubmFtZSlcbiAgICAgICAgICAgIC5zZXRCb2R5KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jb250ZW50KS5pbm5lckhUTUwpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgdGhpcy5wcm9wcy52ZXJib3NpdHkgPT09IFwiMVwiID8gXCIxMnB0XCIgOiBcIjlwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAzcHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImJvcmRlclwiLCBcIjAuNXB0IHNvbGlkIGJsYWNrXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwicGFkZGluZ1wiLCBcIjAgMXB0IDAgMFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwidGV4dC1hbGlnblwiLCBcInJpZ2h0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93blwiLCBcIndpZHRoXCIsIFwiNTBwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFkdmFuY2VzLWhlYWRlclwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWFkX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI1JVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmRhbmNlX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI4JVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFjcm9fanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjglXCIpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEF1dG9QcmludGVyIH0gZnJvbSBcImFkbWluL2F1dG9fcHJpbnRlci9tYWluXCI7XG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxBdXRvUHJpbnRlciB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXG4pO1xuIiwiY2xhc3MgRG9jeEltcGwge1xuICAgIGNvbnN0cnVjdG9yKGZpbGVuYW1lKSB7XG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMSA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUyID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTMgPSBudWxsO1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmJvZHkgPSBcIlwiO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJwb3J0cmFpdFwiO1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHtcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LWZhbWlseVwiOiBcIkNhbGlicmksIFRhaG9tYSwgQXJpYWwsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRhYmxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xsYXBzZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstaW5zaWRlXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRkLCB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IFwiMXB0IDNwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDEsIGgyLCBoMywgaDQsIGg1LCBoNlwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgxXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDNcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNCBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiMTBwdCAwIDZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDUgcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjZwdCAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIuaGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nLWJvdHRvbVwiOiBcIjJwdFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBcIjoge1xuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIuc3BhY2VyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi52YS10b3BcIjoge1xuICAgICAgICAgICAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0b3BcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWxlZnRcIjogeyBcInRleHQtYWxpZ25cIjogXCJsZWZ0XCIgfSxcbiAgICAgICAgICAgIFwiLnRleHQtcmlnaHRcIjogeyBcInRleHQtYWxpZ25cIjogXCJyaWdodFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWNlbnRlclwiOiB7IFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICBcIi5ib3JkZXJlZC10YWJsZSB0ZCwgLmJvcmRlcmVkLXRhYmxlIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFwdCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFdpZHRoQ3NzKCk7XG4gICAgfVxuICAgIGFkZFdpZHRoQ3NzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5hZGRTdHlsZShcIi53LVwiICsgaSwgXCJ3aWR0aFwiLCBpICsgXCIlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkU3R5bGUoc2VsZWN0b3IsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXVtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUxKHRpdGxlMSkge1xuICAgICAgICB0aGlzLnRpdGxlMSA9IHRpdGxlMTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMih0aXRsZTIpIHtcbiAgICAgICAgdGhpcy50aXRsZTIgPSB0aXRsZTI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTModGl0bGUzKSB7XG4gICAgICAgIHRoaXMudGl0bGUzID0gdGl0bGUzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0TWFyZ2lucyhtYXJnaW5zKSB7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRCb2R5KGJvZHkpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgZGF0YSkge1xuICAgICAgICBsZXQgY3NzX3BhaXJzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubWFwKChrZXkpID0+IGtleSArICc6ICcgKyBkYXRhW2tleV0gKyAnOyAnKVxuICAgICAgICByZXR1cm4gc2VsZWN0b3IgKyBcIiB7IFwiICsgY3NzX3BhaXJzLmpvaW4oXCIgXCIpICsgXCIgfVwiO1xuICAgIH1cbiAgICByZW5kZXJTdHlsZXMoKSB7XG4gICAgICAgIGxldCBjc3NfYmxvY2tzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5zdHlsZXMpLm1hcCgoXG4gICAgICAgICAgICAoc2VsZWN0b3IpID0+IHRoaXMucmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgdGhpcy5zdHlsZXNbc2VsZWN0b3JdKVxuICAgICAgICApLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gY3NzX2Jsb2Nrcy5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICByZW5kZXJIVE1MKCkge1xuICAgICAgICBsZXQgY3NzID0gdGhpcy5yZW5kZXJTdHlsZXMoKTtcbiAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMuaGVhZGVyID8gJzxwIGNsYXNzPVwiaGVhZGVyXCI+JyArIHRoaXMuaGVhZGVyICsgJzwvcD4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMSA9IHRoaXMudGl0bGUxID8gJzxoMT4nICsgdGhpcy50aXRsZTEgKyAnPC9oMT4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMiA9IHRoaXMudGl0bGUyID8gJzxoMj4nICsgdGhpcy50aXRsZTIgKyAnPC9oMj4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMyA9IHRoaXMudGl0bGUzID8gJzxoMz4nICsgdGhpcy50aXRsZTMgKyAnPC9oMz4nIDogXCJcIjtcbiAgICAgICAgbGV0IHNwYWNlciA9IChoZWFkZXIgfHwgdGl0bGUxIHx8IHRpdGxlMiB8fCB0aXRsZTMpID8gJzxwIGNsYXNzPVwic3BhY2VyXCI+Jm5ic3A7PC9wPicgOiBcIlwiO1xuICAgICAgICByZXR1cm4gXCI8IURPQ1RZUEUgaHRtbD5cXG5cIiArXG4gICAgICAgICAgICBcIjxodG1sPjxoZWFkPlwiICtcbiAgICAgICAgICAgICAgICBcIjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIj5cIiArXG4gICAgICAgICAgICAgICAgXCI8c3R5bGU+XFxuXCIgKyBjc3MgKyBcIlxcbjwvc3R5bGU+XFxuXCIgK1xuICAgICAgICAgICAgXCI8L2hlYWQ+PGJvZHk+XFxuXCIgK1xuICAgICAgICAgICAgICAgIGhlYWRlciArXG4gICAgICAgICAgICAgICAgdGl0bGUxICtcbiAgICAgICAgICAgICAgICB0aXRsZTIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMyArXG4gICAgICAgICAgICAgICAgc3BhY2VyICtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkgK1xuICAgICAgICAgICAgXCI8L2JvZHk+PC9odG1sPlwiO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJIVE1MKCk7XG4gICAgICAgIGxldCBtYXJnaW5zID0gdGhpcy5tYXJnaW5zIHx8ICh0aGlzLm9yaWVudGF0aW9uID09PSBcInBvcnRyYWl0XCIgPyBbMTAsIDE1LCAxMCwgMTVdIDogWzcsIDEwLCA3LCAxMF0pO1xuICAgICAgICBsZXQgY29udmVydGVkID0gaHRtbERvY3guYXNCbG9iKGh0bWwsIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLm9yaWVudGF0aW9uLFxuICAgICAgICAgICAgbWFyZ2luczoge1xuICAgICAgICAgICAgICAgIHRvcDogICAgTWF0aC5mbG9vcihtYXJnaW5zWzBdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAgTWF0aC5mbG9vcihtYXJnaW5zWzFdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogTWF0aC5mbG9vcihtYXJnaW5zWzJdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICAgTWF0aC5mbG9vcihtYXJnaW5zWzNdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2F2ZUFzKGNvbnZlcnRlZCwgdGhpcy5maWxlbmFtZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCB2YXIgRG9jeCA9IChmbikgPT4gbmV3IERvY3hJbXBsKGZuKTtcbiIsImV4cG9ydCBjbGFzcyBSdW5TY29yZXNXcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3RvcihydW4sIGRpc2NpcGxpbmVfanVkZ2VzKSB7XG4gICAgICAgIHRoaXMucnVuID0gcnVuO1xuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzID0gZGlzY2lwbGluZV9qdWRnZXM7XG4gICAgICAgIHRoaXMuc2NvcmVzX2J5X2Rpc2NpcGxpbmVfanVkZ2VfaWQgPSB7fVxuICAgICAgICBydW4uc2NvcmVzLmZvckVhY2goZnVuY3Rpb24oc2NvcmUpIHtcbiAgICAgICAgICAgIGxldCBkal9pZCA9IHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQ7XG4gICAgICAgICAgICB0aGlzLnNjb3Jlc19ieV9kaXNjaXBsaW5lX2p1ZGdlX2lkW2RqX2lkXSA9IHNjb3JlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBnZXRTY29yZXNCeUp1ZGdlSWRzKGRpc2NpcGxpbmVfanVkZ2VfaWRzKSB7XG4gICAgICAgIHJldHVybiBkaXNjaXBsaW5lX2p1ZGdlX2lkcy5tYXAoKChkal9pZCkgPT4gdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0pLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvdXJTY29yZXNXcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0b3VyLCByZXN1bHRzKSB7XG4gICAgICAgIHRoaXMucnVuX3dyYXBwZXJzID0gdG91ci5ydW5zLm1hcCgocnVuKSA9PiBuZXcgUnVuU2NvcmVzV3JhcHBlcihydW4sIHRvdXIuZGlzY2lwbGluZV9qdWRnZXMpKTtcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcztcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlcyA9IHt9O1xuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzLmZvckVhY2goZnVuY3Rpb24oZGosIGlkeCkge1xuICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbZGoucm9sZV0gfHwgW107XG4gICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgaWR4OiBpZHgsXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZTogZGosXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbZGoucm9sZV0gPSBhcnI7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0c19ieV9ydW5faWRzID0ge307XG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlcykgPT5cbiAgICAgICAgICAgICAgICByZXN1bHRzX2J5X3J1bl9pZHNbcmVzLnJ1bl9pZF0gPSByZXMpO1xuICAgICAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMuZm9yRWFjaCgodykgPT5cbiAgICAgICAgICAgICAgICB3LnJlc3VsdHNfaW5mbyA9IHJlc3VsdHNfYnlfcnVuX2lkc1t3LnJ1bi5pZF0pO1xuICAgICAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMuc29ydCgoYSwgYikgPT4gYS5yZXN1bHRzX2luZm8ucGxhY2UgLSBiLnJlc3VsdHNfaW5mby5wbGFjZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RGlzY2lwbGluZUp1ZGdlc0J5Um9sZXMoKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1thcmd1bWVudHNbMF1dXG4gICAgICAgICAgICAgICAgPyB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1swXV0ubWFwKChiKSA9PiBiLmRpc2NpcGxpbmVfanVkZ2UpXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICByZXMgPSByZXMuY29uY2F0KHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbYXJndW1lbnRzW2ldXSB8fCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnNvcnQoKGEsIGIpID0+IGEuaWR4IC0gYi5pZHgpO1xuICAgICAgICByZXR1cm4gcmVzLm1hcCgoYikgPT4gYi5kaXNjaXBsaW5lX2p1ZGdlKTtcbiAgICB9XG4gICAgZ2V0U2NvcmVzVGFibGVCeVJvbGVzKCkge1xuICAgICAgICBsZXQgZGlzY2lwbGluZV9qdWRnZV9pZHMgPSB0aGlzLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKC4uLmFyZ3VtZW50cykubWFwKChkaikgPT4gZGouaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5fd3JhcHBlcnMubWFwKCh3KSA9PiB3LmdldFNjb3Jlc0J5SnVkZ2VJZHMoZGlzY2lwbGluZV9qdWRnZV9pZHMpKTtcbiAgICB9XG4gICAgZ2V0UmVzdWx0c0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bl93cmFwcGVycy5tYXAoKHcpID0+IHcucmVzdWx0c19pbmZvKTtcbiAgICB9XG4gICAgZ2V0UnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuX3dyYXBwZXJzLm1hcCgodykgPT4gdy5ydW4pO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpY2lwYW50RGlzcGxheShwYXJ0aWNpcGFudCkge1xuICAgIGlmIChwYXJ0aWNpcGFudC5mb3JtYXRpb25fbmFtZSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm4gPHA+eyBwYXJ0aWNpcGFudC5mb3JtYXRpb25fbmFtZSB9PC9wPjtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnRpY2lwYW50LnNwb3J0c21lbi5tYXAoKHMsIGlkeCkgPT4gPHAga2V5PXsgaWR4IH0+eyBzLmxhc3RfbmFtZSArIFwiIFwiICsgcy5maXJzdF9uYW1lIH08L3A+KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjb3JpbmdUeXBlKGRpc2NpcGxpbmVfanVkZ2UsIHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcbiAgICBzd2l0Y2ggKGRpc2NpcGxpbmVfanVkZ2Uucm9sZSkge1xuICAgIGNhc2UgXCJkYW5jZV9qdWRnZVwiOlxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25cIjtcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvbl9hY3JvXCI7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIjpcbiAgICAgICAgICAgIHJldHVybiBcInNpbXBsaWZpZWRcIjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XG4gICAgICAgIH1cbiAgICBjYXNlIFwiYWNyb19qdWRnZVwiOlxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJhY3JvXCI7XG4gICAgICAgIH1cbiAgICBjYXNlIFwidGVjaF9qdWRnZVwiOlxuICAgICAgICByZXR1cm4gXCJ0ZWNoXCI7XG4gICAgY2FzZSBcImhlYWRfanVkZ2VcIjpcbiAgICAgICAgcmV0dXJuIFwiaGVhZFwiO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuY2xhc3MgQ21wQ2hhaW5JbXBsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSAwO1xuICAgIH1cbiAgICBjbXAoYSwgYikge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHQgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgQ21wQ2hhaW4gPSAoKSA9PiBuZXcgQ21wQ2hhaW5JbXBsKCk7XG4iLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcblxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCBhcmcpIHtcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKHggLyAxMCkgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBlNTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAlIDEwID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggJSAxMCA+PSA1IHx8IHggJSAxMCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGU1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlMjtcbiAgICB9XG5cbiAgICBsZXQgUEhSQVNFUyA9IHtcbiAgICAgICAgXCJhZG1pblwiOiB7XG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRfcHJvZ3JhbXNfYWZ0ZXJfY3JlYXRpb25cIjogXCLQn9GA0L7Qs9GA0LDQvNC80Ysg0LzQvtC20L3QviDQsdGD0LTQtdGCINC00L7QsdCw0LLQuNGC0Ywg0YLQvtC70YzQutC+INC/0L7RgdC70LUg0YHQvtGF0YDQsNC90LXQvdC40Y8g0YPRh9Cw0YHRgtC90LjQutCwXCIsXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9ub3RfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0L3QtdC00L7RgdGC0YPQv9C90LAg0L3QsCDRjdGC0L7QvCDQutC+0LzQv9GM0YLQtdGA0LUuXCIsXG4gICAgICAgICAgICAgICAgXCJub19maW5hbGl6ZWRcIjogXCLQntGC0YHRg9GC0YHRgtCy0YPRjtGCINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz7QpNC40L3QsNC70LjQt9Cw0YbQuNGPINC00L7Qu9C20L3QsCDQvtGC0LzQtdC90Y/RgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0LjRgdC60LvRjtGH0LjRgtC10LvRjNC90YvRhSDRgdC70YPRh9Cw0Y/RhSE8L3N0cm9uZz48L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPtCV0YHQu9C4INC20LUg0Y3RgtC+INC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INC90LXQvtCx0YXQvtC00LjQvNC+LCDQvtCx0YDQsNGC0LjRgtC1INCy0L3QuNC80LDQvdC40LUsINGH0YLQviDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QslxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcbiAgICAgICAgICAgICAgICAgICAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDQuCDQvdC1INC/0YDQvtGI0LXQtNGI0LjRhSDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDQsdGD0LTRg9GCINCx0LXQt9Cy0L7Qt9Cy0YDQsNGC0L3QviDRg9GC0LXRgNGP0L3RiyE8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPtCYINC90LUg0LfQsNCx0YPQtNGM0YLQtSDQt9Cw0L3QvtCy0L4g0L3QsNC/0LXRh9Cw0YLQsNGC0Ywg0LLRgdC1INGC0LHQu9C40YbRiy48L3A+PC9kaXY+LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXG4gICAgICAgICAgICAgICAgXCJxdWV1ZV9lbXB0eVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0YPRgdGC0LBcIixcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3BhZ2VcIjogXCLQotC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LBcIixcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jbHViXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0LrQu9GD0LE/XCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY29tcGV0aXRpb25cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L4g0YHQvtGA0LXQstC90L7QstCw0L3QuNC1P1wiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfanVkZ2VcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGB0YPQtNGM0Y4/XCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcGFydGljaXBhbnRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjiDRgtGD0YDQsD8g0JLQstC10LTQuNGC0LUgwqt1bmZpbmFsaXplwrssINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YxcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImNsaWVudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQvNC4INGD0YHRgtGA0L7QudGB0YLQstCw0LzQuFwiLFxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxuICAgICAgICAgICAgICAgIFwiY2x1YnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9tYW5hZ2VtZW50XCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuFwiLFxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvYmF0aWNzXCI6IFwi0JfQsNCz0YDRg9C30LrQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcbiAgICAgICAgICAgICAgICBcInRvdXJfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINGC0YPRgNCwXCIsXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQntGC0LzQtdC90LAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgtGD0YDQsFwiLFxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9hY3JvYmF0aWNzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbGVzX3NlbGVjdGVkXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRhNCw0LnQuy4uLlwiLFxuICAgICAgICAgICAgICAgIFwicGFzdGVfYWNyb1wiOiBcItCS0YHRgtCw0LLRjNGC0LUg0LTQsNC90L3Ri9C1INC40Lcg0LrQsNC70YzQutGD0LvRj9GC0L7RgNCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibWVudVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2Rpc2NpcGxpbmVzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9zcG9ydHNtZW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC/0L7RgNGC0YHQvNC10L3QsNC80LhcIixcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV90b3Vyc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGC0YPRgNCw0LzQuFwiLFxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9uX3BhcnRpY2lwYW50c1wiOiAobikgPT4gXCLQmNGC0L7Qs9C+IFwiICsgbiArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0b3VyLWFkbWluXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LVcIixcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcbiAgICAgICAgICAgIFwiYWRtaW5cIjoge1xuICAgICAgICAgICAgICAgIFwibG9hZF9zeW50YXhfZXJyb3JcIjogXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC00LDQvdC90YvRhVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYXBpXCI6IHtcbiAgICAgICAgICAgICAgICBcImR1cGxpY2F0ZWRfZXh0ZXJuYWxfaWRcIjogXCLQkiDQtNCw0L3QvdGL0YUg0LjQvNC10Y7RgtGB0Y8g0LfQsNC/0LjRgdC4INGBINC/0L7QstGC0L7RgNGP0Y7RidC40LzQuNC80YHRjyBleHRlcm5hbF9pZFwiLFxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjbHViXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IHtcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLIFwiLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgtGD0YDRi1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDRgyDQutC+0YDQvtCz0L4g0LXRgdGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC1INGC0YPRgNGLXCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxuICAgICAgICAgICAgICAgIFwicmVwZWF0aW5nX2p1ZGdlXCI6IChuYW1lKSA9PiBuYW1lICsgXCIg0LLRgdGC0YDQtdGH0LDQtdGC0YHRjyDQsiDRgdC/0LjRgdC60LUg0YHRg9C00LXQuSDQsdC+0LvQtdC1INC+0LTQvdC+0LPQviDRgNCw0LfQsFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcbiAgICAgICAgICAgICAgICBcImludGVybmFsX3NlcnZlcl9lcnJvclwiOiBbXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtVwiLCBcItC/0YDQvtCy0LXRgNGM0YLQtSDQu9C+0LPQuCDQtNC70Y8g0LjQvdGE0L7RgNC80LDRhtC40LhcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9kaXNjaXBsaW5lc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINCy0YXQvtC00Y/RidC10LPQviDQsiDRgdGD0LTQtdC50YHQutGD0Y4g0LHRgNC40LPQsNC00YMg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJydW5cIjoge1xuICAgICAgICAgICAgICAgIFwic2V0X3BlcmZvcm1lZF9mbGFnX29uX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHRgtCw0YLRg9GBINC30LDRhdC+0LTQsCDRhNC40L3QsNC70LjQt9C40L3QvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJzY29yZV9ub3RfZXhpc3RcIjogXCLQn9C+0L/Ri9GC0LrQsCDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LUg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQuSDQvtGG0LXQvdC60Lgg0YHRg9C00YzQuFwiLFxuICAgICAgICAgICAgICAgIFwidXBkYXRlX29uX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDQvtGG0LXQvdC60YMg0LIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRvdXJcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkX2JlZm9yZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQtNC+0LHQsNCy0LjRgtGMINC90L7QstGL0Lkg0YLRg9GAINC/0LXRgNC10LQg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LxcIixcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YLRg9GALCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YnQuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcbiAgICAgICAgICAgICAgICBcImluaXRfZmluYWlsemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxuICAgICAgICAgICAgICAgIFwibG9hZF90b19ub25fZW1wdHlcIjogKGQpID0+IFtcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCDRgtGD0YDRiyDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YtcIiwgYNCU0LjRgdGG0LjQv9C70LjQvdCwICR7ZH0g0YPQttC1INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YtgXSxcbiAgICAgICAgICAgICAgICBcIm5leHRfaXNfZmluYWlsemVkXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQvdC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxuICAgICAgICAgICAgICAgIFwibm90X2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxuICAgICAgICAgICAgICAgIFwicHJldl9ub3RfZmluYWlsemVkXCI6IFwi0J/RgNC10LTRi9C00YPRidC40Lkg0YLRg9GAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxuICAgICAgICAgICAgICAgIFwidXBkYXRlX2ZpbmFsaXplZFwiOiBcItCU0LvRjyDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwINC90LUg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyDQuNC30LzQtdC90LXQvdC40LUg0LrQstC+0YLRiyDQstGL0LLQvtC00LAsINGC0LjQv9CwINGC0YPRgNCwINC40LvQuCDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJkZXNlbGVjdF9hbGxcIjogXCLQodC90Y/RgtGMINCy0YHQtVwiLFxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJkZWxldGVcIjogXCLQo9C00LDQu9C40YLRjFwiLFxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZFwiOiBcItCe0YLQvNC10L3QuNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcbiAgICAgICAgICAgICAgICBcInNhdmVcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9hbGxcIjogXCLQktGL0LHRgNCw0YLRjCDQstGB0LVcIixcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX2Vycm9yXCI6IFwi0J/QvtGF0L7QttC1LCDQuNC80LXRjtGC0YHRjyDQv9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcbiAgICAgICAgICAgICAgICBcImVycm9yX2hlYWRlclwiOiBcItCe0YjQuNCx0LrQsFwiLFxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gXCLQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWXCIgKyBuLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQpNC+0YDQvNC10LnRiNC9IOKEllwiICsgbi50b1N0cmluZygpICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi0KPRh9Cw0YHRgtC90LjQuiDihJZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImp1ZGdpbmdcIjoge1xuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0J/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJyZXNldF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQodCx0YDQvtGBXCIsXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0J/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLXCIsXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0J7RgdGC0LDQvdC+0LLQuNGC0Ywg0YLRg9GAXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLP1wiLFxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LHQsNC30L7QstGL0YUg0L7RhtC10L3QvtC6INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXG4gICAgICAgICAgICAgICAgXCJjbHViXCI6IFwi0JrQu9GD0LFcIixcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxuICAgICAgICAgICAgICAgIFwibmV3X3Njb3JlXCI6IFwi0JrQvtGA0YAuXCIsXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcbiAgICAgICAgICAgICAgICBcIm9sZF9zY29yZVwiOiBcItCR0LDQt9CwXCIsXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwibW9kZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xuICAgICAgICAgICAgICAgIFwiYWN0aXZlXCI6IFwi0JDQutGC0LjQstC90L5cIixcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LTQu9GPINC/0YDQvtGC0L7QutC+0LvQsFwiLFxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3RpdGxlXCI6IFwi0JfQsNCz0L7Qu9C+0LLQvtC6XCIsXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcbiAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IFwi0JrQsNGC0LXQs9C+0YDQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXG4gICAgICAgICAgICAgICAgXCJjb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX2ZcIjogXCLQllwiLFxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60L7QvNCw0L3QtNGLINGE0L7RgNC80LXQudGI0L1cIixcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJ5b2JcIjogXCLQky7RgC5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdF9mb3JcIjogXCLQn9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDRgtGD0YDQsFwiLFxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxuICAgICAgICAgICAgICAgIFwic2NvcmluZ19zeXN0ZW1fbmFtZVwiOiBcItCh0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjoge1xuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcbiAgICAgICAgICAgICAgICBcInJlc2V0X3BsYWNlXCI6IFwi0KHQsdGA0L7RgSDQvNC10YHRgtCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXN1bHRzXCI6IHtcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJzaW1wbGVfdmlld1wiOiBcItCj0L/RgNC+0YnQtdC90L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX3ZpZXdcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RhcnRfcGFnZVwiOiB7XG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xuICAgICAgICAgICAgICAgIFwic2VsZWN0X2NvbXBldGl0aW9uXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUg0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y9cIixcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9yb2xlXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdCy0L7RjiDRgNC+0LvRjFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xuICAgICAgICAgICAgICAgIFwibm9fY29tcGV0aXRpb25zXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdGL0YUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAg0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuCDQvdCw0YXQvtC00LjRgtGB0Y8g0L/QviDQsNC00YDQtdGB0YMmbmJzcDtcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17IGxpbmsgfT57IGxpbmsgfTwvYT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicm9sZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxuICAgICAgICAgICAgICAgIFwic2NyZWVuXCI6IFwi0K3QutGA0LDQvVwiLFxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwidGFibGV0XCI6IHtcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRg1wiLFxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3N0b3B3YXRjaFwiOiBcItCh0YLQsNGA0YJcIixcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCf0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDXCIsXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfdG91clwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7RgiDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYWN0aW9uc1wiOiBcItCU0LXQudGB0YLQstC40Y9cIixcbiAgICAgICAgICAgICAgICBcImRhbmNlXCI6IFwi0KLQsNC90LXRhlwiLFxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc1wiOiB7XG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xuICAgICAgICAgICAgICAgIFwidGFibGV0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcG9zaXRpb25cIjogXCLQmtC+0LzQv9C+0LfQuNGG0LjRj1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9mYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMylcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1wcmVzc2lvblwiOiBcItCe0LHRidC10LUg0LLQv9C10YfQsNGC0LvQtdC90LjQtVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXNldF90b19uXCI6IChuKSA9PiBcItCh0LHRgNC+0YEg0L3QsCBcIiArIG4udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImJyZWFrZG93blwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIjogXCJBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjXCI6IFwi0JpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZkXCI6IFwi0J9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaVwiOiBcItCe0JJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtXCI6IFwi0JzQnlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfZndcIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxuICAgICAgICAgICAgICAgIFwibm9fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRgtCw0L3RhtC10LLQsNC70YzQvdGL0LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xuICAgICAgICAgICAgXCJcIjogXCItXCIsXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGxldCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XG4gICAgcGF0aC5mb3JFYWNoKChjaHVuaykgPT4gcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdKTtcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBocmFzZV9wdHIoLi4uYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xufVxuXG5leHBvcnQgdmFyIGdldFBvc3NpYmxlVG91ck5hbWVzID0gKCkgPT4gW1xuICAgIFwi0KTQuNC90LDQu1wiLFxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxuICAgIFwi0J7RgtCx0L7RgNC+0YfQvdGL0Lkg0YLRg9GAXCIsXG4gICAgXCIxLzIg0YTQuNC90LDQu9CwXCIsXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXG4gICAgXCIxLzgg0YTQuNC90LDQu9CwXCIsXG4gICAgXCIxLzE2INGE0LjQvdCw0LvQsFwiLFxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXG4gICAgXCLQpNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxuXTtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cblxuY2xhc3MgQXBpSW1wbCB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IChtc2csIGNvZGUsIGFyZ3MpID0+IHNob3dFcnJvcihjb2RlID8gXyhjb2RlLCAuLi5hcmdzKSA6IG1zZyk7XG4gICAgICAgIHRoaXMuY2JfZmFpbCA9ICguLi5kYXRhKSA9PiBjb25zb2xlLmVycm9yKFwiQVBJIGZhaWxcIiwgLi4uZGF0YSk7XG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9ICgpID0+IHt9O1xuICAgIH1cbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYl9kb25lID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvbkVycm9yKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9uRmFpbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNiX2ZhaWwgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFRvREIobW9kZWxfdHlwZSwgbW9kZWxfaWQsIHN0PXN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZW5kKCkge1xuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYl9zdWNjZXNzKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBkYXRhLmFwcGVuZChcImNsaWVudF9pZFwiLCB3aW5kb3cuY2xpZW50X2lkKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xuICAgICAgICBkYXRhLmFwcGVuZChcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XG4gICAgICAgIHhoci5zZW5kKGRhdGEpO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5cblxuY2xhc3MgTWVzc2FnZURpc3BhdGNoZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLmxpc3RlbmVyc19jbnQgPSAwO1xuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcbiAgICAgICAgdGhpcy53cyA9IG5ldyBTb2NrSlMoXCJodHRwOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL3dzXCIpO1xuICAgICAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1tcInJlbG9hZF9kYXRhXCIsIG51bGxdXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsX3VwZGF0ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gY2xvc2VkLlwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LmJpbmQodGhpcyksIDUwMCk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBvbk1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICAgICAgaWYgKGRhdGFbXCJjbGllbnRfaWRcIl0pIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGllbnRfaWQgPSBkYXRhW1wiY2xpZW50X2lkXCJdO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbXNnX3R5cGUgPSBkYXRhWzBdO1xuICAgICAgICAgICAgbGV0IG1zZ19kYXRhID0gZGF0YVsxXTtcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge307XG4gICAgICAgICAgICBpZiAobXNnX3R5cGUgPT09IFwiZm9yY2VfcmVmcmVzaFwiKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fSkuZm9yRWFjaCgoa2V5KSA9PiBsaXN0ZW5lcnNba2V5XShtc2dfZGF0YSkpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGRhdGEubW9kZWxfdXBkYXRlcy5mb3JFYWNoKChtb2RlbF9pbmZvKSA9PiB7XG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSBzdG9yYWdlLnVwZGF0ZU1vZGVsKG1vZGVsX2luZm8ubW9kZWwsIG1vZGVsX2luZm8uaWQsIG1vZGVsX2luZm8uZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRhdGFfY2hhbmdlZCkge1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW1wiZGJfdXBkYXRlXCJdIHx8IHt9O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRMaXN0ZW5lcklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnNfY250Kys7XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKG1zZ190eXBlcywgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRMaXN0ZW5lcklkKCk7XG4gICAgICAgIG1zZ190eXBlcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihtc2dfdHlwZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXVtpZF0gPSBjYWxsYmFjaztcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcl9pZCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1trZXldW2xpc3RlbmVyX2lkXTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgbWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XG4iLCJjbGFzcyBSZWYge1xuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB9XG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xuICAgIH1cbn1cblxuY2xhc3MgTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkLCBtb2RlbF9zdG9yYWdlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzID0ge307XG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcbiAgICB9XG4gICAgYWRkQmFja1JlZihrZXksIHJlZikge1xuICAgICAgICB0aGlzW2tleV0gPSByZWY7XG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xuICAgIH1cbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIiB8fCBpZHguY2hhckF0KDApID09PSBcIl5cIikge1xuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZl9rZXkgPSBkYXRhW2lkeF0uYmFja19yZWY7XG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlZi5nZXQoKS5hZGRCYWNrUmVmKGJhY2tfcmVmX2tleSwgYmFja19yZWYpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCIqXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkX2RhdGEgPSBkYXRhW2lkeF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlcmlhbGl6ZShzY2hlbWEpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX19rZXlfdHlwZXNba2V5XSkge1xuICAgICAgICAgICAgY2FzZSBcIipcIjpcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5tYXAoZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB9XG4gICAgYWRkKGlkLCBkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0gPSBuZXcgTW9kZWwodGhpcy5zdG9yYWdlLCBpZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcbiAgICB9XG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBieV9pZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaWRdO1xuICAgIH1cbiAgICBhbGwoKSB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tb2RlbHMpO1xuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cbn1cblxuY2xhc3MgU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXMgPSB7fVxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxuICAgIH1cbiAgICBnZXREb21haW4oZG9tYWluKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XG4gICAgfVxuICAgIGRlbERvbWFpbihkb21haW4pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xuICAgIH1cbiAgICBnZXQobW9kZWxfbmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcbiAgICB9XG4gICAgZGVsKG1vZGVsX25hbWUpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XG4gICAgfVxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBkYXRhKSB7XG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5kb21haW5zW2tleV0udXBkYXRlTW9kZWwoLi4uYXJndW1lbnRzKSB8fCBkYXRhX2NoYW5nZWQpO1xuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcbiIsImV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBzdHlsZT17eyBcImhlaWdodFwiOiBcIjEwMCVcIiwgXCJ3aWR0aFwiOiBcIjEwMCVcIiB9fT48dGJvZHk+PHRyPlxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XG4gICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XG4gICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxuICAgIH0sIGFjdGlvbik7XG59XG4iLCJleHBvcnQgY2xhc3MgUHJpbnRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZmV0Y2hQcmludGFibGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVhZGVyID8gPGRpdiBjbGFzc05hbWU9XCJwLWhlYWRlclwiPnsgdGhpcy5wcm9wcy5oZWFkZXIgfTwvZGl2PiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUxID8gPGgxPnsgdGhpcy5wcm9wcy50aXRsZTEgfTwvaDE+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTIgPyA8aDI+eyB0aGlzLnByb3BzLnRpdGxlMiB9PC9oMj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMyA/IDxoMz57IHRoaXMucHJvcHMudGl0bGUzIH08L2gzPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICByZWY9eyBlID0+IHRoaXMuX2JvZHkgPSBlIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYm9keSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByaW50YWJsZVwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTEoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUyKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXG4gICAgICAgIG9uQ2xpY2s6IGYsXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaEVuZE9yQ2xpY2soaGFuZGxlciwgcHJldmVudF9kZWZhdWx0KSB7XG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcbiAgICB9XG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgfVxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XG4gICAgICAgICAgICBkaXNjYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBkb25lVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5waW4gPSBudWxsO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNGcmVlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcbiAgICB9XG4gICAgZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KDEwMCAtIHRoaXMuc3RhdGUucG9zaXRpb24sIDApLCAxMDApO1xuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xuICAgIH1cbiAgICBnZXRFbGVtZW50T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXMgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGdldFRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFNsaWRlclBvcyhldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIDIwMCk7XG4gICAgfVxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICB9XG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlciBub3NlbGVjdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5uZXJcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIil9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IHRoaXMuc3RhdGUucG9zaXRpb24gKyBcInB4XCIgfX1cbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKSB9XG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKGklxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVxuICAgICAgICAgICAgICAgID8gPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiKDEwMCwxMDAsMTAwKVwiIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiZG9uZS10ZXh0XCIgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgOiA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2JhKDEwMCwxMDAsMTAwLFwiICsgdGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCkgKyBcIilcIiB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInNsaWRlLXRleHRcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRhYmxldFNlbGVjdG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBjaG9pY2VzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3dfc2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dfc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcbiAgICB9XG4gICAgb25DbGljayhuKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShuKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMucHJvcHMuY2hvaWNlcy5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0gZWxbMF07XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGVsWzFdO1xuICAgICAgICAgICAgbGV0IGFjdGl2ZV9jbGFzc19uYW1lID0gKHRoaXMucHJvcHMuYWN0aXZlID09PSBrZXkpID8gXCIgYWN0aXZlXCIgOiBcIlwiO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBrZXkgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrLmJpbmQodGhpcywga2V5KSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBzY29yZS1idG5cIiArIGFjdGl2ZV9jbGFzc19uYW1lIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiYgKGlkeCArIDEpICUgdGhpcy5wcm9wcy5yb3dfc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxiciBrZXk9eyBcImJyXCIgKyBpZHggfSAvPilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBsYXlvdXRfY2xhc3MgPSAodGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIikgPyBcInNlbGVjdG9yLWxheW91dFwiIDogXCJzZWxlY3Rvci1sYXlvdXQtMnJvd3NcIjtcbiAgICAgICAgbGV0IHNlbGVjdGVkX2NsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmUgPT09IG51bGwgPyBcIlwiIDogXCIgc2VsZWN0ZWRcIlxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wic2NvcmluZy1sYXlvdXQgXCIgKyBsYXlvdXRfY2xhc3MgKyBzZWxlY3RlZF9jbGFzcyArIFwiIG4tXCIgKyB0aGlzLmdldEJ1dHRvbnNDb3VudCgpLnRvU3RyaW5nKCkgfT57IHJlc3VsdCB9PC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlclNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gbWluOyBpZHggPD0gbWF4OyArK2lkeCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCwgaWR4LnRvU3RyaW5nKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSBNYXRoLnJvdW5kKDIgKiBtaW4pOyBpZHggPD0gTWF0aC5yb3VuZCgyICogbWF4KTsgKytpZHgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHggLyAyLCAoaWR4ICUgMikgPyAoaWR4IC8gMikudG9GaXhlZCgxKSA6IE1hdGguZmxvb3IoaWR4IC8gMikudG9TdHJpbmcoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1pbnRlZ2VyLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTAuNX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAwLjUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uUGx1cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDAuNX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAwLjUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbnZhciBzdG9wd2F0Y2hlcyA9IHt9O1xuXG5leHBvcnQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSB8fCB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHRoaXMuc3RhdGUuYWN0aXZlXG4gICAgICAgICAgICAgICAgPyBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApXG4gICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZV9pZF0gPSB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBub3coKSB7XG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIH1cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID8gdGhpcy5zdG9wKCkgOiB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXJ0X2F0OiB0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgICAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hY3RpdmVcbiAgICAgICAgICAgID8gKHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnN0YXJ0X2F0KVxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICB0aWNrKCkge1xuICAgICAgICB2YXIgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICBpZiAobmV3X3ZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFkKG51bSwgc2l6ZSkge1xuICAgICAgICB2YXIgcyA9IFwiMDAwMFwiICsgbnVtLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBzLnN1YnN0cihzLmxlbmd0aCAtIHNpemUpO1xuICAgIH1cbiAgICBnZXRTdHJWYWx1ZSgpIHtcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgdmFyIG0gPSAwLCBzID0gMDtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICBtID0gTWF0aC5mbG9vcih2YWwgLyAoNjAgKiAxMDAwKSk7XG4gICAgICAgIHZhbCAlPSA2MCAqIDEwMDA7XG4gICAgICAgIHMgPSBNYXRoLmZsb29yKHZhbCAvIDEwMDApO1xuICAgICAgICByZXR1cm4gbS50b1N0cmluZygpICsgJzonICsgdGhpcy5wYWQocywgMik7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RvcHdhdGNoXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXNldCBpZ25vcmUtcmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5yZXNldC5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnJlc2V0X3N0b3B3YXRjaFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gYnRuLXRvZ2dsZSBpZ25vcmUtcmVhZG9ubHlcIiArICh0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy50b2dnbGUuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlID8gXyhcInRhYmxldC5idXR0b25zLnN0b3Bfc3RvcHdhdGNoXCIpIDogXyhcInRhYmxldC5idXR0b25zLnN0YXJ0X3N0b3B3YXRjaFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdHJWYWx1ZSgpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuIl19
