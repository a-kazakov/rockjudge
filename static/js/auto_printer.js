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

},{"server/storage":15,"ui/components":16}],15:[function(require,module,exports){
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

},{"i10n/loader":11}],17:[function(require,module,exports){
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
exports.StopWatch = exports.TabletAcroOverrideInput = exports.TabletIntegerInput = exports.TabletPoint5SelectInput = exports.TabletIntegerSelectInput = exports.TabletSelectorInput = exports.Slider = undefined;

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

    Slider.prototype.render = function render() {
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
                choices: React.PropTypes.array.isRequired,
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

var TabletAcroOverrideInput = exports.TabletAcroOverrideInput = function (_React$Component6) {
    _inherits(TabletAcroOverrideInput, _React$Component6);

    function TabletAcroOverrideInput() {
        var _temp, _this7, _ret;

        _classCallCheck(this, TabletAcroOverrideInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this7 = _possibleConstructorReturn(this, _React$Component6.call.apply(_React$Component6, [this].concat(args))), _this7), _this7.onMinus = function () {
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

    TabletAcroOverrideInput.prototype.render = function render() {
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
    };

    _createClass(TabletAcroOverrideInput, null, [{
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

},{"i10n/loader":11}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGF1dG9fcHJpbnRlclxcbWFpbi5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGhlYXRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xccm9zZmFyclxcZGlzY2lwbGluZV9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xccm9zZmFyclxcdG91cl9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xcdG91cl9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhdXRvX3ByaW50ZXIuanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcZG9jeC5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFxyb3NmYXJyXFxiYXNlLmpzeCIsInNyY1xcanN4XFxjb21tb25cXHRvb2xzLmpzeCIsInNyY1xcanN4XFxpMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGkxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxccHJpbnRhYmxlLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDYU07Ozs7Ozs7OzttQ0FDRiwyQkFBUzs7O0FBQ0wsZUFBTzs7Y0FBSSxXQUFVLE9BQVYsRUFBSjtZQUNIO0FBQ0ksc0JBQUss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SSwrQkFBWSxxQ0FBcUMsS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixTQUFwQixHQUFnQyxFQUFoQyxDQUFyQzttQkFDUixlQUFlLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBZixFQUZSO2dCQUlNLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsZUFBRSwrQkFBRixDQUFwQixHQUF5RCxlQUFFLGdDQUFGLENBQXpEO2FBWFY7WUFhSTs7a0JBQUssV0FBVSxNQUFWLEVBQUw7Z0JBQ00sS0FBSyxXQUFMLEVBRE47YUFiSjtTQURKLENBREs7OztXQTNFQTtFQUFrQixNQUFNLFNBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgc2hvd0NvbmZpcm0gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgY2xvbmUgfSBmcm9tIFwiY29tbW9uL3Rvb2xzXCI7XG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XG5pbXBvcnQgeyBIZWF0c0JvZHkgfSBmcm9tIFwiLi4vanVkZ2luZy9oZWF0c1wiO1xuaW1wb3J0IHsgVG91clJlc3VsdHNCb2R5IH0gZnJvbSBcIi4uL2p1ZGdpbmcvdG91cl9yZXN1bHRzXCI7XG5pbXBvcnQgeyBEaXNjaXBsaW5lUmVzdWx0cyB9IGZyb20gXCIuLi9qdWRnaW5nL2Rpc2NpcGxpbmVfcmVzdWx0c1wiO1xuXG5cbmNsYXNzIEF1dG9QcmludGVyVGFibGVDZWxsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dGQgY2xhc3NOYW1lPVwiaW5wdXRcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKGUpID0+IHRoaXMucHJvcHMub25DaGFuZ2UocGFyc2VJbnQoZS50YXJnZXQudmFsdWUucmVwbGFjZSgvW15cXGRdLywgXCJcIikpIHx8IDApIH0gLz5cbiAgICAgICAgPC90ZD5cbiAgICB9XG59XG5cbmNsYXNzIEF1dG9QcmludGVyVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG9uQ2hhbmdlKGFjdGlvbiwgbmV3X3ZhbHVlKSB7XG4gICAgICAgIGxldCBuZXdfcm93ID0gY2xvbmUodGhpcy5wcm9wcy5yb3cpO1xuICAgICAgICBuZXdfcm93W2FjdGlvbl0gPSBuZXdfdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3X3Jvdyk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJkaXNjaXBsaW5lXCI+eyBgJHt0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5uYW1lfSDigJQgJHt0aGlzLnByb3BzLnRvdXIubmFtZX1gIH08L3RkPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBvc3NpYmxlQWN0aW9ucy5tYXAoKGFjdGlvbikgPT5cbiAgICAgICAgICAgICAgICA8QXV0b1ByaW50ZXJUYWJsZUNlbGxcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgYWN0aW9uIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnJvd1thY3Rpb25dIHx8IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBhY3Rpb24pIH0gLz5cbiAgICAgICAgICAgICkgfVxuICAgICAgICA8L3RyPlxuICAgIH1cbn1cblxuY2xhc3MgQXV0b1ByaW50ZXJUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgb25DaGFuZ2UodG91cl9pZCwgbmV3X3ZhbHVlKSB7XG4gICAgICAgIGxldCBuZXdfYWN0aW9ucyA9IGNsb25lKHRoaXMucHJvcHMuYWN0aW9ucyk7XG4gICAgICAgIG5ld19hY3Rpb25zW3RvdXJfaWRdID0gbmV3X3ZhbHVlO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld19hY3Rpb25zKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInRvdXJzLXRhYmxlXCI+PHRib2R5PlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJkaXNjaXBsaW5lXCI+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLmRpc2NpcGxpbmVcIikgfTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5oZWF0c1wiKSB9PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJlc3VsdHNfMVwiKSB9PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJlc3VsdHNfMlwiKSB9PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJlc3VsdHNfM1wiKSB9PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSB9PC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudG91cnMubWFwKCh0b3VyKSA9PlxuICAgICAgICAgICAgICAgIDxBdXRvUHJpbnRlclRhYmxlUm93XG4gICAgICAgICAgICAgICAgICAgIGtleT17IHRvdXIuaWQgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdG91ciB9XG4gICAgICAgICAgICAgICAgICAgIHJvdz17IHRoaXMucHJvcHMuYWN0aW9uc1t0b3VyLmlkXSB8fCB7fSB9XG4gICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlQWN0aW9ucz17IHRoaXMucHJvcHMucG9zc2libGVBY3Rpb25zIH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgdG91ci5pZCkgfSAvPlxuICAgICAgICAgICAgKSB9XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG59XG5cbmNsYXNzIEF1dG9QcmludGVySm9iUXVldWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHF1ZXVlOiBbXSxcbiAgICAgICAgICAgIG5vd1JlbmRlcmluZzogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xuICAgIH1cbiAgICBhZGRKb2Ioam9iX3R5cGUsIHRvdXIsIGNvcGllcykge1xuICAgICAgICBsZXQgbmV3X3F1ZXVlID0gY2xvbmUodGhpcy5zdGF0ZS5xdWV1ZSk7XG4gICAgICAgIG5ld19xdWV1ZS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IGpvYl90eXBlLFxuICAgICAgICAgICAgdG91cjogdG91cixcbiAgICAgICAgICAgIGNvcGllczogY29waWVzLFxuICAgICAgICAgICAgaWQ6IE1hdGgucmFuZG9tKCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiBuZXdfcXVldWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzY2hlZHVsZUpvYigpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb2Nlc3NKb2IoKSwgMTAwMCk7XG4gICAgfVxuICAgIHByb2Nlc3NKb2IoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLm5vd1JlbmRlcmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBqb2IgPSB0aGlzLnN0YXRlLnF1ZXVlWzBdO1xuICAgICAgICBpZiAoIWpvYikge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMucmV0cnlKb2IuYmluZCh0aGlzKSwgMTAwMDApO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiB0aGlzLnN0YXRlLnF1ZXVlLnNsaWNlKDEpLFxuICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBqb2IsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXRyeUpvYigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWV1ZTogW3RoaXMuc3RhdGUubm93UmVuZGVyaW5nXS5jb25jYXQodGhpcy5zdGF0ZS5xdWV1ZSksXG4gICAgICAgICAgICBub3dSZW5kZXJpbmc6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XG4gICAgfVxuICAgIGNvbnRpbnVlSm9iKGZpbGVuYW1lKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgam9iID0gdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmc7XG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IGBodHRwOi8vMTI3LjAuMC4xOjU5NDkvcHJpbnQtZG9jeD9maWxlbmFtZT0keyBmaWxlbmFtZSB9JmNvcGllcz0keyBqb2IuY29waWVzIH1gO1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgYWRkcmVzcywgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge307XG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHRoaXMuYWRkSm9iKGpvYi50eXBlLCBqb2IudG91ciwgam9iLmNvcGllcyk7XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBudWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICBjcmVhdGVGaWxlbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vLCBcIlwiKSArIFwiLnRtcFwiO1xuICAgIH1cbiAgICByZW5kZXJBY3RpdmVKb2IoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudHlwZSkge1xuICAgICAgICBjYXNlIFwiaGVhdHNcIjpcbiAgICAgICAgICAgIHJldHVybiA8SGVhdHNCb2R5XG4gICAgICAgICAgICAgICAgdG91cl9pZD17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnRvdXIuaWR9XG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9e3sgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgY2FsbGJhY2s6IHRoaXMuY29udGludWVKb2IuYmluZCh0aGlzKSB9fSAvPlxuICAgICAgICBjYXNlIFwicmVzdWx0c18xXCI6XG4gICAgICAgICAgICByZXR1cm4gPFRvdXJSZXN1bHRzQm9keVxuICAgICAgICAgICAgICAgIHRvdXJfaWQ9eyB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZy50b3VyLmlkfVxuICAgICAgICAgICAgICAgIHZlcmJvc2l0eT1cIjFcIlxuICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXt7IGZpbGVuYW1lOiB0aGlzLmNyZWF0ZUZpbGVuYW1lKCksIGNhbGxiYWNrOiB0aGlzLmNvbnRpbnVlSm9iLmJpbmQodGhpcykgfX0gLz5cbiAgICAgICAgY2FzZSBcInJlc3VsdHNfMlwiOlxuICAgICAgICAgICAgcmV0dXJuIDxUb3VyUmVzdWx0c0JvZHlcbiAgICAgICAgICAgICAgICB0b3VyX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5pZH1cbiAgICAgICAgICAgICAgICB2ZXJib3NpdHk9XCIyXCJcbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXzNcIjpcbiAgICAgICAgICAgIHJldHVybiA8VG91clJlc3VsdHNCb2R5XG4gICAgICAgICAgICAgICAgdG91cl9pZD17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnRvdXIuaWR9XG4gICAgICAgICAgICAgICAgdmVyYm9zaXR5PVwiM1wiXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9e3sgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgY2FsbGJhY2s6IHRoaXMuY29udGludWVKb2IuYmluZCh0aGlzKSB9fSAvPlxuICAgICAgICBjYXNlIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6XG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9pZD17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnRvdXIuZGlzY2lwbGluZS5pZCB9XG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9e3sgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgY2FsbGJhY2s6IHRoaXMuY29udGludWVKb2IuYmluZCh0aGlzKSB9fSAvPlxuICAgICAgICBjYXNlIFwidGVzdFwiOlxuICAgICAgICAgICAgcmV0dXJuIDxBdXRvUHJpbnRlclRlc3RQYWdlXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9e3sgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgY2FsbGJhY2s6IHRoaXMuY29udGludWVKb2IuYmluZCh0aGlzKSB9fSAvPlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgam9iIHR5cGU6XCIsIHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicXVldWUgcXVldWUtZW1wdHlcIj5cbiAgICAgICAgICAgICAgICB7IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucXVldWVfZW1wdHlcIikgfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQWN0aXZlSm9iKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicXVldWVcIj5cbiAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5xdWV1ZS5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBrZXk9eyBpdGVtLmlkIH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpdGVtLnR5cGUgPT09IFwidGVzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnRlc3RfcGFnZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7aXRlbS50b3VyLmRpc2NpcGxpbmUubmFtZX0g4oCUICR7aXRlbS50b3VyLm5hbWV9YCB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5cIiArIGl0ZW0udHlwZSkgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3BpZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaXRlbS5jb3BpZXMgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjdGl2ZUpvYigpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRvUHJpbnRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29tcGV0aXRpb246IG51bGwsXG4gICAgICAgICAgICBhY3Rpb25zOiB7fSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5TQ0hFTUEgPSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lczoge1xuICAgICAgICAgICAgICAgIHRvdXJzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuUE9TU0lCTEVfQUNUSU9OUyA9IFtcImhlYXRzXCIsIFwicmVzdWx0c18xXCIsIFwicmVzdWx0c18yXCIsIFwicmVzdWx0c18zXCIsIFwiZGlzY2lwbGluZV9yZXN1bHRzXCJdO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfZGF0YV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5kYl91cGRhdGVfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfZGF0YV9saXN0ZW5lcik7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5nZXRcIiwgeyBjb21wZXRpdGlvbl9pZDogdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZCwgY2hpbGRyZW46IHRoaXMuU0NIRU1BIH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIkNvbXBldGl0aW9uXCIsIHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgbmV3X2NvbXBldGl0aW9uID0gc3RvcmFnZS5nZXQoXCJDb21wZXRpdGlvblwiKS5ieV9pZCh0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkKTtcbiAgICAgICAgaWYgKCFuZXdfY29tcGV0aXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdfY29tcGV0aXRpb24gPSBuZXdfY29tcGV0aXRpb24uc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcGV0aXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hDb21wZXRpdGlvblVwZGF0ZSh0aGlzLnN0YXRlLmNvbXBldGl0aW9uLCBuZXdfY29tcGV0aXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29tcGV0aXRpb246IG5ld19jb21wZXRpdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaW50VGVzdFBhZ2UoKSB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucHJpbnRfdGVzdF9wYWdlXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBkdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xuICAgICAgICAgICAgc2F2ZUFzKG5ldyBCbG9iKFtcImR1bW15XCJdLCB7dHlwZSA6ICd0ZXh0L3BsYWluJ30pLCBgZHVtbXlfJHtNYXRoLnJhbmRvbSgpfS50bXBgKTtcbiAgICAgICAgICAgIHNhdmVBcyhuZXcgQmxvYihbXCJkdW1teVwiXSwge3R5cGUgOiAndGV4dC9wbGFpbid9KSwgYGR1bW15XyR7TWF0aC5yYW5kb20oKX0udG1wYCk7XG4gICAgICAgICAgICB0aGlzLnJlZnMucXVldWUuYWRkSm9iKFwidGVzdFwiLCBudWxsLCAxKTtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldFRvdXJzRnJvbUNvbXBldGl0aW9uKGNvbXBldGl0aW9uKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgY29tcGV0aXRpb24uZGlzY2lwbGluZXMuZm9yRWFjaCgoZGlzY2lwbGluZSkgPT5cbiAgICAgICAgICAgIGRpc2NpcGxpbmUudG91cnMuZm9yRWFjaCgodG91cikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByID0gY2xvbmUodG91cik7XG4gICAgICAgICAgICAgICAgci5kaXNjaXBsaW5lID0gZGlzY2lwbGluZTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChyKTtcbiAgICAgICAgICAgIH0gKVxuICAgICAgICApXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGdldFRvdXJzTWFwKHRvdXJzKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgdG91cnMuZm9yRWFjaCgodG91cikgPT4gcmVzdWx0W3RvdXIuaWRdID0gdG91cik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGRpc3BhdGNoQ29tcGV0aXRpb25VcGRhdGUob2xkX2NvbXBldGl0aW9uLCBuZXdfY29tcGV0aXRpb24pIHtcbiAgICAgICAgbGV0IG9sZF90b3VycyA9IHRoaXMuZ2V0VG91cnNNYXAodGhpcy5nZXRUb3Vyc0Zyb21Db21wZXRpdGlvbihvbGRfY29tcGV0aXRpb24pKTtcbiAgICAgICAgbGV0IG5ld190b3VycyA9IHRoaXMuZ2V0VG91cnNNYXAodGhpcy5nZXRUb3Vyc0Zyb21Db21wZXRpdGlvbihuZXdfY29tcGV0aXRpb24pKTtcbiAgICAgICAgT2JqZWN0LmtleXMob2xkX3RvdXJzKS5mb3JFYWNoKCh0b3VyX2lkKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW5ld190b3Vyc1t0b3VyX2lkXSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghb2xkX3RvdXJzW3RvdXJfaWRdLmZpbmFsaXplZCAmJiBuZXdfdG91cnNbdG91cl9pZF0uZmluYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0FjdGlvbnNGb3JUb3VyKG5ld190b3Vyc1t0b3VyX2lkXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXROZXh0VG91cih0b3VyKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlLmNvbXBldGl0aW9uLmRpc2NpcGxpbmVzLmZvckVhY2goKGRpc2NpcGxpbmUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgZGlzY2lwbGluZS50b3Vycy5mb3JFYWNoKChkX3RvdXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZF90b3VyLmlkID09PSB0b3VyLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByID0gY2xvbmUoZF90b3VyKTtcbiAgICAgICAgICAgICAgICAgICAgci5kaXNjaXBsaW5lID0gZGlzY2lwbGluZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcjtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IClcbiAgICAgICAgfSApXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGRvVGhlSm9iKHRvdXIsIGFjdGlvbl90eXBlLCBjb3BpZXMpIHtcbiAgICAgICAgaWYgKGFjdGlvbl90eXBlID09PSBcImhlYXRzXCIpIHtcbiAgICAgICAgICAgIHRvdXIgPSB0aGlzLmdldE5leHRUb3VyKHRvdXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdG91cikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmcy5xdWV1ZS5hZGRKb2IoYWN0aW9uX3R5cGUsIHRvdXIsIGNvcGllcyk7XG4gICAgfVxuICAgIGRvQWN0aW9uc0ZvclRvdXIodG91cikge1xuICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuc3RhdGUuYWN0aW9uc1t0b3VyLmlkXTtcbiAgICAgICAgaWYgKCFhY3Rpb25zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5QT1NTSUJMRV9BQ1RJT05TLmZvckVhY2goKGFjdGlvbl90eXBlKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uc1thY3Rpb25fdHlwZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvVGhlSm9iKHRvdXIsIGFjdGlvbl90eXBlLCBhY3Rpb25zW2FjdGlvbl90eXBlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuY29tcGV0aXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYXV0by1wcmludGVyXCI+XG4gICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgIDxoMT57IF8oXCJhZG1pbi5oZWFkZXJzLmF1dG9fcHJpbnRlclwiKSB9PC9oMT5cbiAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb24tdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5ydWxlc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPEF1dG9QcmludGVyVGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJzPXsgdGhpcy5nZXRUb3Vyc0Zyb21Db21wZXRpdGlvbih0aGlzLnN0YXRlLmNvbXBldGl0aW9uKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zPXsgdGhpcy5zdGF0ZS5hY3Rpb25zIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKG5ld19hY3Rpb25zKSA9PiB0aGlzLnNldFN0YXRlKHsgYWN0aW9uczogbmV3X2FjdGlvbnMgfSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zPXsgdGhpcy5QT1NTSUJMRV9BQ1RJT05TIH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb24tcXVldWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5xdWV1ZVwiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPEF1dG9QcmludGVySm9iUXVldWUgcmVmPVwicXVldWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3QtcGFnZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyB0aGlzLnByaW50VGVzdFBhZ2UuYmluZCh0aGlzKSB9IGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0LXRh9Cw0YLRjCDRgtC10YHRgtC+0LLQvtC5INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIEF1dG9QcmludGVyVGVzdFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvc29ydC1jb21wXG4gICAgICAgIHJldHVybiA8ZGl2IHJlZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxwPnsgXyhcImFkbWluLmF1dG9fcHJpbnRlci50ZXN0X3RleHRcIikgfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0b3VyLXJlc3VsdHMuZG9jeFwiKSB7XG4gICAgICAgIERvY3goZmlsZW5hbWUpXG4gICAgICAgICAgICAuc2V0Qm9keShSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY29udGVudCkuaW5uZXJIVE1MKVxuICAgICAgICAgICAgLnNhdmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBQcmludGFibGUgfSBmcm9tIFwidWkvcHJpbnRhYmxlXCI7XG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XG5cbmltcG9ydCB7XG4gICAgRGlzY2lwbGluZVJlc3VsdHNUYWJsZSxcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlLFxuICAgIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZSxcbn0gZnJvbSBcIi4vcm9zZmFyci9kaXNjaXBsaW5lX3Jlc3VsdHNcIjtcblxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuICgoKSA9PiB0aGlzLnByb3BzLm9uU2lnbmFsKG1lc3NhZ2UpKS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XG4gICAgICAgICAgICAgICAgRE9DWFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVuZGVyZXI6IFwicGFnZVwiLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucnVuc19sb2FkZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlLmdldERvbWFpbihcImRpc2NpcGxpbmVfcmVzdWx0c19cIiArIHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCk7XG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInRvdXJfcmVzdWx0c19jaGFuZ2VkIHJlbG9hZF9kYXRhXCIsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdG91cl9zdG9yYWdlID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIikuYnlfaWQobWVzc2FnZVtcInRvdXJfaWRcIl0pO1xuICAgICAgICAgICAgaWYgKCF0b3VyX3N0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG91cl9zdG9yYWdlLmRpc2NpcGxpbmUuaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9Eb2N4KSB7XG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxfaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmcy5wcmludGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbF9pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5kYl91cGRhdGVfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcbiAgICB9XG4gICAgcmVsb2FkU3RhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucnVuc19sb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3RvcmFnZV9ydW5zID0gdGhpcy5zdG9yYWdlLmdldChcIlJ1blwiKVxuICAgICAgICBsZXQgcmVzdWx0cyA9IHRoaXMuc3RhdGUuZGlzY2lwbGluZV9yZXN1bHRzO1xuICAgICAgICBsZXQgbmV3X3N0YXRlID0gW11cbiAgICAgICAgdmFyIFNDSEVNQSA9IHtcbiAgICAgICAgICAgIHRvdXI6IHt9LFxuICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICBzcG9ydHNtZW46IHt9LFxuICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIG5ld19zdGF0ZS5wdXNoKHtcbiAgICAgICAgICAgICAgICBwbGFjZTogcmVzdWx0c1tpXS5wbGFjZSxcbiAgICAgICAgICAgICAgICBydW46IHN0b3JhZ2VfcnVucy5ieV9pZChyZXN1bHRzW2ldLnJ1bl9pZCkuc2VyaWFsaXplKFNDSEVNQSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxvYWRlZDogdHJ1ZSxcbiAgICAgICAgICAgIHRhYmxlOiBuZXdfc3RhdGUsXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB0aGlzLnN0b3JhZ2UuZ2V0KFwiRGlzY2lwbGluZVwiKS5ieV9pZCh0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkUmVzdWx0cygpIHtcbiAgICAgICAgQXBpKFwiZGlzY2lwbGluZS5nZXRfcmVzdWx0c1wiLCB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQsXG4gICAgICAgIH0pXG4gICAgICAgIC5vblN1Y2Nlc3MocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9yZXN1bHRzOiByZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRTdGF0ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwiZGlzY2lwbGluZS5nZXRcIiwge1xuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkLFxuICAgICAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICAgICAgdG91cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5hZGRUb0RCKFwiRGlzY2lwbGluZVwiLCB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgLm9uU3VjY2VzcygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJ1bnNfbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU3RhdGUodGhpcylcbiAgICAgICAgfSlcbiAgICAgICAgLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW5lcnNcblxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW5kZXJpbmdcblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5yZW5kZXJlcikge1xuICAgICAgICBjYXNlIFwicHJlc2VudGVyXCI6XG4gICAgICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH0gcmVmPVwibWFpbl90YWJsZVwiIC8+XG4gICAgICAgIGNhc2UgXCJzY3JlZW5fb3BlcmF0b3JcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlXG4gICAgICAgICAgICAgICAgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZFBsYWNlPXsgdGhpcy5wcm9wcy5zZWxlY3RlZFBsYWNlIH1cbiAgICAgICAgICAgICAgICBvblBsYWNlU2VsZWN0PXsgdGhpcy5wcm9wcy5vblBsYWNlU2VsZWN0IH1cbiAgICAgICAgICAgICAgICByZWY9XCJtYWluX3RhYmxlXCIgLz5cbiAgICAgICAgY2FzZSBcInBhZ2VcIjpcbiAgICAgICAgICAgIHJldHVybiA8UHJpbnRhYmxlXG4gICAgICAgICAgICAgICAgcmVmPVwicHJpbnRhYmxlXCJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlIH1cbiAgICAgICAgICAgICAgICB0aXRsZTE9eyBfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikgfVxuICAgICAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICBib2R5PXsgPERpc2NpcGxpbmVSZXN1bHRzVGFibGUgdGFibGU9eyB0aGlzLnN0YXRlLnRhYmxlIH0gLz4gfSAvPlxuICAgICAgICBjYXNlIFwidGFibGVcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSByZWY9XCJtYWluX3RhYmxlXCIgLz5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvc29ydC1jb21wXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5sb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPjxMb2FkZXIgLz48L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgY3JlYXRlRG9jeChmaWxlbmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0cy5kb2N4XCIpIHtcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMuZGlzY2lwbGluZV9yZXN1bHRzXCIpKVxuICAgICAgICAgICAgLnNldFRpdGxlMyh0aGlzLnN0YXRlLmRpc2NpcGxpbmUubmFtZSlcbiAgICAgICAgICAgIC5zZXRCb2R5KHRoaXMucmVmcy5wcmludGFibGUuZmV0Y2hQcmludGFibGVEYXRhKCkpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG91ci1uYW1lXCIsIFwiYmFja2dyb3VuZFwiLCBcIiNkZGRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcInBhZGRpbmdcIiwgXCIwXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc3BvcnRzbWVuXCIsIFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcblxuXG5leHBvcnQgY2xhc3MgSGVhdHNCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzaWduYWwobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gKCgpID0+IHRoaXMucHJvcHMub25TaWduYWwobWVzc2FnZSkpLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyB0aGlzLnNpZ25hbChcImRvY3hcIikgfT5cbiAgICAgICAgICAgICAgICBET0NYXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSGVhdHNCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwiaGVhdHNfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xuICAgICAgICB0aGlzLnJlbG9hZF9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzLnByaW50YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4LmNhbGxiYWNrKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKFwiaGVhdHNfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbGV0IFNDSEVNQSA9IHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlcmlhbGl6ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKVxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUoU0NIRU1BKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b3VyOiBzZXJpYWxpemVkLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHtcbiAgICAgICAgICAgIHRvdXJfaWQ6IHRoaXMucHJvcHMudG91cl9pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZToge1xuICAgICAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJfaWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVySGVhdEhlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LmhlYXQgIT09IG5leHRfcm93LmhlYXQpXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5oZWF0IH0+PHRoIGNsYXNzTmFtZT1cImhlYXQtbnVtYmVyXCIgY29sU3Bhbj1cIjNcIj5cbiAgICAgICAgICAgIDxwPnsgXyhcImdsb2JhbC5waHJhc2VzLmhlYXRfblwiLCBuZXh0X3Jvdy5oZWF0KSB9PC9wPlxuICAgICAgICA8L3RoPjwvdHI+O1xuXG4gICAgfVxuICAgIHJlbmRlckhlYXRSb3cocm93KSB7XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJSXCIgKyByb3cuaWQgfT5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LThcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcm93LnBhcnRpY2lwYW50Lm51bWJlciB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+PHA+eyByb3cucGFydGljaXBhbnQubmFtZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+PHA+eyByb3cucGFydGljaXBhbnQuY2x1Yi5uYW1lIH08L3A+PC90ZD5cbiAgICAgICAgPC90cj47XG4gICAgfVxuICAgIHJlbmRlckhlYXRSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBydW5zID0gdGhpcy5zdGF0ZS50b3VyLnJ1bnM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVySGVhdEhlYWRlcihydW5zW2kgLSAxXSwgcnVuc1tpXSk7XG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVySGVhdFJvdyhydW5zW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cbiAgICAgICAgfVxuICAgICAgICBsZXQgYm9keSA9IDxkaXYgY2xhc3NOYW1lPVwidG91ci1oZWF0c1wiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+PHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgXyhcImp1ZGdpbmcubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD48cD57IF8oXCJqdWRnaW5nLmxhYmVscy5wYXJ0aWNpcGFudF9uYW1lXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPjxwPnsgXyhcImp1ZGdpbmcubGFiZWxzLmNsdWJcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPjx0Ym9keT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhdFJvd3MoKSB9XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgIDwvZGl2PjtcbiAgICAgICAgcmV0dXJuIDxQcmludGFibGVcbiAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlIH1cbiAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfaGVhdHNcIikgfVxuICAgICAgICAgICAgdGl0bGUyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICBib2R5PXsgYm9keSB9XG4gICAgICAgICAgICByZWY9XCJwcmludGFibGVcIiAvPlxuICAgIH1cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1oZWF0cy5kb2N4XCIpIHtcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXG4gICAgICAgICAgICAuc2V0VGl0bGUxKF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfaGVhdHNcIikpXG4gICAgICAgICAgICAuc2V0VGl0bGUyKHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUpXG4gICAgICAgICAgICAuc2V0VGl0bGUzKHRoaXMuc3RhdGUudG91ci5uYW1lKVxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5yZWZzLnByaW50YWJsZS5mZXRjaFByaW50YWJsZURhdGEoKSlcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWF0LW51bWJlclwiLCBcImJhY2tncm91bmRcIiwgXCIjY2NjXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhdC1udW1iZXJcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwidGQsIHRoXCIsIFwiZm9udC1zaXplXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLnNhdmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBvblRvdWNoRW5kT3JDbGljayB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuXG5cbmZ1bmN0aW9uIF9fKCkge1xuICAgIGxldCBhcmdzID0gW107XG4gICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcbiAgICB9XG4gICAgcmV0dXJuIF8oXCJzY29yaW5nX3N5c3RlbXMucm9zZmFyci5cIiArIGFyZ3VtZW50c1swXSwgLi4uYXJncyk7XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGxldCBuZWVkX3JlbmRlciA9ICh0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIpIHx8IChwcmV2X3Jvdy5ydW4udG91ci5pZCAhPT0gbmV4dF9yb3cucnVuLnRvdXIuaWQpXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT48dGggY2xhc3NOYW1lPVwidG91ci1uYW1lXCIgY29sU3Bhbj1cIjZcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBuZXh0X3Jvdy5ydW4udG91ci5uYW1lIH08L3A+XG4gICAgICAgIDwvdGg+PC90cj47XG4gICAgfVxuICAgIHJlbmRlclJvdyhyb3cpIHtcbiAgICAgICAgbGV0IHAgPSByb3cucnVuLnBhcnRpY2lwYW50O1xuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9PlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyByb3cucGxhY2UgPT09IG51bGwgPyBcIlwiIDogcm93LnBsYWNlIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggbnVtYmVyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHAubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTM2XCIgY29sU3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic3BvcnRzbWVuXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IHAuZm9ybWF0aW9uX25hbWUgPyA8dHI+PHRoIGNvbFNwYW49XCIyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBwLmZvcm1hdGlvbl9uYW1lIH08L3A+PC90aD48L3RyPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICB7IHAuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PiA8dHIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy03NVwiPjxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLnN1YnN0aXR1dGUgPyA8aT4gKHsgXyhcImFkbWluLmxhYmVscy5zdWJcIikgfS4pPC9pPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBzLnllYXJfb2ZfYmlydGggfTwvcD48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPiApIH1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY2x1YlwiPjxwPnsgcC5jbHViLm5hbWUgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY29hY2hlc1wiPjxwPnsgcC5jb2FjaGVzLnNwbGl0KFwiLFwiKS5tYXAoKGMpID0+IFtjLnRyaW0oKSwgPGJyIGtleT1cIlhcIiAvPl0pIH08L3A+PC90ZD5cbiAgICAgICAgPC90cj47XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgLSAxXSwgdGFibGVbaV0pO1xuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjdcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTlcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jb2FjaGVzXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG5cbmNsYXNzIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9nZ2xlQWN0aXZlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogIXRoaXMuc3RhdGUuYWN0aXZlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPXsgXCJyb3dcIiArICggdGhpcy5zdGF0ZS5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy50b2dnbGVBY3RpdmUuYmluZCh0aGlzKSl9Pjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGxhY2VcIiByb3dTcGFuPVwiM1wiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucGxhY2UgPT09IG51bGwgPyBcIlwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlLWxhYmVsXCI+eyBfKFwicHJlc2VudGVyLmxhYmVscy5wbGFjZVwiKSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm51bWJlclwiPnsgcC5udW1iZXIgfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHAubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIiBjb2xTcGFuPVwiMlwiPnsgcC5jbHViLm5hbWUgfTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjb2FjaGVzXCIgY29sU3Bhbj1cIjJcIj57IHAuY29hY2hlcyB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1ByZXNlbnRlclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGxldCBuZWVkX3JlbmRlciA9ICh0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIpIHx8IChwcmV2X3Jvdy5ydW4udG91ci5pZCAhPT0gbmV4dF9yb3cucnVuLnRvdXIuaWQpXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGtleT17IFwiSFwiICsgbmV4dF9yb3cucnVuLmlkIH0+XG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdykge1xuICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGVSb3cga2V5PXsgXCJSXCIgKyByb3cucnVuLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcm93LnJ1bi5wYXJ0aWNpcGFudCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9IC8+XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhYmxlLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSArIDFdLCB0YWJsZVtpXSk7XG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPXsgXCJyb3dcIiArICggdGhpcy5wcm9wcy5zZWxlY3RlZCA/IFwiIHNlbGVjdGVkXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMucHJvcHMub25DbGljayl9Pjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGxhY2VcIiByb3dTcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucGxhY2UgPT09IG51bGwgPyBcIlwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+eyB0aGlzLnByb3BzLnBsYWNlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlLWxhYmVsXCI+eyBfKFwicHJlc2VudGVyLmxhYmVscy5wbGFjZVwiKSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm51bWJlclwiPnsgcC5udW1iZXIgfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHAubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIiBjb2xTcGFuPVwiMlwiPnsgcC5jbHViLm5hbWUgfTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGxldCBuZWVkX3JlbmRlciA9ICh0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIpIHx8IChwcmV2X3Jvdy5ydW4udG91ci5pZCAhPT0gbmV4dF9yb3cucnVuLnRvdXIuaWQpXG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGtleT17IFwiSFwiICsgbmV4dF9yb3cucnVuLmlkIH0+XG4gICAgICAgICAgICB7IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdywgcGxhY2UpIHtcbiAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGVSb3dcbiAgICAgICAgICAgIGtleT17IFwiUlwiICsgcm93LnJ1bi5pZCB9XG4gICAgICAgICAgICBwYXJ0aWNpcGFudD17IHJvdy5ydW4ucGFydGljaXBhbnQgfVxuICAgICAgICAgICAgcGxhY2U9eyByb3cucGxhY2UgfVxuICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMub25QbGFjZVNlbGVjdChwbGFjZSkgfVxuICAgICAgICAgICAgc2VsZWN0ZWQ9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgIT09IG51bGwgJiYgcGxhY2UgPj0gdGhpcy5wcm9wcy5zZWxlY3RlZFBsYWNlIH0gLz5cbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gdGFibGUubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpICsgMV0sIHRhYmxlW2ldKTtcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0sIGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBUb3VyU2NvcmVzV3JhcHBlciwgZ2V0UGFydGljaXBhbnREaXNwbGF5LCBnZXRTY29yaW5nVHlwZSB9IGZyb20gXCJjb21tb24vcm9zZmFyci9iYXNlXCI7XG5cblxuZnVuY3Rpb24gX18oKSB7XG4gICAgbGV0IGFyZ3MgPSBbXTtcbiAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xuICAgIH1cbiAgICByZXR1cm4gXyhcInNjb3Jpbmdfc3lzdGVtcy5yb3NmYXJyLlwiICsgYXJndW1lbnRzWzBdLCAuLi5hcmdzKTtcbn1cblxuY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMge1xuICAgIGNvbnN0cnVjdG9yKG5fanVkZ2VzKSB7XG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDcwIC8gbl9qdWRnZXMpO1xuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gN1xuICAgICAgICB0aGlzLmluZm9fd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogbl9qdWRnZXMgLSB0aGlzLnBsYWNlX3dpZHRoO1xuICAgIH1cbiAgICBnZW5QbGFjZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuSW5mb1N0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuaW5mb193aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5KdWRnZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBmb3JtYXRTY29yZShzY29yZSwgdGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgPSBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8c3Bhbj4mbWRhc2g7PC9zcGFuPlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKFwiJFwiLCBzY29yZSkucmVwbGFjZShcIkBcIiwgc2NvcmUudG9GaXhlZCgxKSk7XG4gICAgfVxuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5pbXByZXNzaW9uLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5tXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24ucFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IGFkZGl0aW9sYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH08L3A+PC90ZD48L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxuICAgIHJlbmRlckZvcm1hdGlvbkFjcm9TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5hY3JvYmF0aWNzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5pbXByZXNzaW9uLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5ibVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvcD48L3RkPjwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG4gICAgcmVuZGVyRGFuY2VTY29yZShzY29yZSkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZ3XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmZ3X3dvbWFuLCBcIi0kJVwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmZ3X21hbiwgXCItJCVcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmNcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmNvbXBvc2l0aW9uKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLnNtYWxsX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJBY3JvU2NvcmUoc2NvcmUpIHtcbiAgICAgICAgbGV0IGFjcm9fc2NvcmVzID0gc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcChmdW5jdGlvbihzY29yZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgIDx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYWNyb19uXCIsIGlkeCArIDEpIH06PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgPHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZSwgXCItJCVcIikgfTwvcD48L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICB7IGFjcm9fc2NvcmVzIH1cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZkXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJTY29yZShqdWRnZSwgc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICBzd2l0Y2ggKGdldFNjb3JpbmdUeXBlKGp1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkpIHtcbiAgICAgICAgY2FzZSBcImRhbmNlXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEYW5jZVNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWNyb1Njb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25BY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9PC9wPjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJQYXJ0aWNpcGFudEluZm8oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPHA+PHN0cm9uZz57IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aFxuICAgICAgICAgICAgKX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wZW5hbHR5XCIpIH06IDwvc3Ryb25nPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZSA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+IH08L3A+XG4gICAgfVxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoYXNfYWNyb19vdmVycmlkZXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJlbmRlcl9hY3JvX3RhYmxlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5hY3JvXCIgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiO1xuICAgICAgICBpZiAoIXJlbmRlcl9hY3JvX3RhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLmZvckVhY2goZnVuY3Rpb24oYWNybykge1xuICAgICAgICAgICAgaWYgKGFjcm8uc2NvcmUgIT09IGFjcm8ub3JpZ2luYWxfc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBoYXNfYWNyb19vdmVycmlkZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYWNyb19jZWxsX3dpZHRoID0gKDEwMCAvIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoKSArIFwiJVwiO1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxwPjxzdHJvbmc+eyBoYXNfYWNyb19vdmVycmlkZXMgPyBfXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NfdmVyYm9zZVwiKSA6IF9fKFwicmVzdWx0cy5sYWJlbHMuYWNyb2JhdGljc1wiKSB9Ojwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJhY3JvLXRhYmxlXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17eyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH19PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8ub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD48L3RkPilcbiAgICAgICAgICAgICAgICB9PC90cj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhhc19hY3JvX292ZXJyaWRlcyA/IDx0cj57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0gc3R5bGU9e3sgd2lkdGg6IGFjcm9fY2VsbF93aWR0aCB9fT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5zY29yZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD48L3RkPilcbiAgICAgICAgICAgICAgICAgICAgfTwvdHI+IDogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NGd1Njb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZVwiKSB9PC9zdHJvbmc+OiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpICsgXCIgLyBcIiArXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgfSA8L3A+XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5hY3JvX3Njb3JlXCIpIH08L3N0cm9uZz46IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuY3VycmVudF90b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSArIFwiIC8gXCIgK1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgfSA8L3A+XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH06IHsgdGhpcy5wcm9wcy5ydW4udG90YWxfc2NvcmUgfTwvc3Ryb25nPjwvcD47XG4gICAgfVxuICAgIHJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHA+PGVtPlxuICAgICAgICAgICAgeyBfXyhcInJlc3VsdHMubGFiZWxzLm5vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICA8L2VtPjwvcD5cbiAgICB9XG4gICAgcmVuZGVyTmV4dFRvdXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhhc19uZXh0X3RvdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLm5leHRfdG91clwiKSB9OiA8L3N0cm9uZz57XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZHZhbmNlcyA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpXG4gICAgICAgIH08L3A+XG4gICAgfVxuICAgIHJlbmRlckluZm9CbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbmZvLWJsb2NrXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5JbmZvU3R5bGUoKSB9PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnRpY2lwYW50SW5mbygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBbUNsYXNzRndTY29yZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTmV4dFRvdXJMYWJlbCgpIH1cbiAgICAgICAgPC90ZD5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgIDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17IHRoaXMucHJvcHMud2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2VzW2lkeF0sIHNjb3JlLCB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZGRpdGlvbmFsX2RhdGEpIH1cbiAgICAgICAgICAgIDwvdGQ+KTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0ga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD48L3RkPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucmVzdWx0c19pbmZvLnBsYWNlIH08L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckluZm9CbG9jaygpIH1cbiAgICAgICAgICAgIHsganVkZ2VzX3Njb3JlcyB9XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXJfd3JhcHBlci5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IHNjb3Jlc190YWJsZSA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIik7XG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XG4gICAgICAgIGxldCBydW5zID0gdG91cl93cmFwcGVyLmdldFJ1bnMoKTtcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBsZXQgd2lkdGhzID0gbmV3IFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzKGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHJ1bnMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICAgICAgcm93cy5wdXNoKDxUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuc1tpZHhdIH1cbiAgICAgICAgICAgICAgICBzY29yZXM9eyBzY29yZXNfdGFibGVbaWR4XSB9XG4gICAgICAgICAgICAgICAgd2lkdGhzPXsgd2lkdGhzIH1cbiAgICAgICAgICAgICAgICBoZWFkX2p1ZGdlX3Njb3JlPXsgaGVhZF9qdWRnZV9zY29yZXNbaWR4XSB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvPXsgcmVzdWx0c19pbmZvW2lkeF0gfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzPXsgZGlzY2lwbGluZV9qdWRnZXMgfVxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBqdWRnZXNfaGVhZGVyID0gZGlzY2lwbGluZV9qdWRnZXMubWFwKGZ1bmN0aW9uKGRqKSB7XG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gd2lkdGg9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgfTwvcD48L3RoPlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiB9fT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHdpZHRoPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHdpZHRoPXsgd2lkdGhzLmdlbkluZm9TdHlsZSgpIH0+PHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICB7IGp1ZGdlc19oZWFkZXIgfVxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzIHtcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcykge1xuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg1NSAvIG5fanVkZ2VzKTtcbiAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCA9IDE0O1xuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gNjtcbiAgICAgICAgdGhpcy5udW1iZXJfd2lkdGggPSAzO1xuICAgICAgICB0aGlzLm5hbWVfd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogbl9qdWRnZXMgLVxuICAgICAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCAtIHRoaXMucGxhY2Vfd2lkdGggLSB0aGlzLm51bWJlcl93aWR0aDtcbiAgICB9XG4gICAgZ2VuUGxhY2VTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbk51bWJlclN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubnVtYmVyX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbk5hbWVTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLm5hbWVfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuVG90YWxTY29yZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMudG90YWxfc2NvcmVfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuSnVkZ2VTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmp1ZGdlX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PHN0cm9uZz57IGFkZGl0aW9sYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH08L3N0cm9uZz4gKHsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDEpIH0pPC9wPlxuICAgIH1cbiAgICByZW5kZXJTY29yZShqdWRnZSwgc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICBpZiAoanVkZ2Uucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIiB8fCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH08L3A+O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2NvcmUodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlc1tpZHhdLCBzY29yZSwgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8uYWRkaXRpb25hbF9kYXRhKVxuICAgICAgICB9IDwvdGQ+KTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD48L3RkPik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZTtcbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlciB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj57IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfTwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgJiYgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXG4gICAgICAgICAgICAgICAgPyA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMuZndfc2NvcmVfc2hvcnRcIikgfXtcIjogXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH17XCIgLyBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9PGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+eyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjtcbiAgICAgICAgICAgICAgICAgICAgfSkoKSB9XG4gICAgICAgICAgICAgICAgPC90ZD4gOiBudWxsIH1cbiAgICAgICAgICAgIHsganVkZ2VzX3Njb3JlcyB9XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZSAmJiB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxuICAgICAgICAgICAgICAgICAgICA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+XG4gICAgICAgICAgICB9PC9wPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihoYXNfbmV4dF90b3VyICxwcmV2X3JvdywgbmV4dF9yb3csIHByZXZfcnVuLCBuZXh0X3J1biwgaWR4LCBuX2NvbHMpIHtcbiAgICAgICAgbGV0IHByZXZfc3RhdHVzID0gcHJldl9yb3dcbiAgICAgICAgICAgID8gcHJldl9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgPyBwcmV2X3Jvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgICAgICA/IFwiYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGxldCBuZXh0X3N0YXR1cyA9IG5leHRfcnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgPyBuZXh0X3Jvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiO1xuICAgICAgICBsZXQgcmVzdWx0ID0gcHJldl9zdGF0dXMgIT09IG5leHRfc3RhdHVzXG4gICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9wZXJmb3JtZWRcIlxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgIDogaGFzX25leHRfdG91clxuICAgICAgICAgICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19hZHZhbmNlZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIk5UXCIgKyBpZHggfT48dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxuICAgICAgICAgICAgeyByZXN1bHQgfVxuICAgICAgICA8L3RoPjwvdHI+XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXJfd3JhcHBlci5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IHNjb3Jlc190YWJsZSA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIik7XG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XG4gICAgICAgIGxldCBydW5zID0gdG91cl93cmFwcGVyLmdldFJ1bnMoKTtcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBsZXQgaGFzX3RvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI7XG4gICAgICAgIGxldCB3aWR0aHMgPSBuZXcgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzKGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIDEpO1xuICAgICAgICBsZXQganVkZ2VzX2hlYWRlciA9IGRpc2NpcGxpbmVfanVkZ2VzLm1hcChmdW5jdGlvbihkaikge1xuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IGdldFNjb3JpbmdUeXBlKGRqLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPT09IFwiYWNyb1wiID8gXCIgKEEpXCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIDx0aCBrZXk9eyBkai5pZCB9IHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PjxwPnsgZGouanVkZ2UubnVtYmVyICsgc3VmZml4IH08L3A+PC90aD5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHggLSAxXSxcbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm9baWR4XSxcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4XSxcbiAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgNCArIGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIGhhc190b3RhbF9zY29yZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxuICAgICAgICAgICAgICAgIHNjb3Jlcz17IHNjb3Jlc190YWJsZVtpZHhdIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlcz17IGRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XG4gICAgICAgICAgICAgICAgaGFzX3RvdGFsX3Njb3JlPXsgaGFzX3RvdGFsX3Njb3JlIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIiBzdHlsZT17IHdpZHRocy5nZW5OdW1iZXJTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHN0eWxlPXsgd2lkdGhzLmdlbk5hbWVTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiIHN0eWxlPXsgd2lkdGhzLmdlblRvdGFsU2NvcmVTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH08L3A+PC90aD4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgeyBqdWRnZXNfaGVhZGVyIH1cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgX18oXCJyZXN1bHRzLmxhYmVscy5jYXJkXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7IHJvd3MgfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGNhcmQgPSB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5oZWFkX2p1ZGdlX3Njb3JlXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxuICAgICAgICAgICAgICAgIDogXCIwXCJcbiAgICAgICAgICAgIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj47XG4gICAgICAgIGxldCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgJm5ic3A7L3tcIiBcIn17IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD5cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8ucGxhY2UgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+eyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQpIH08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID8gPHRkIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj57IHRvdGFsX3Njb3JlIH08L3RkPiA6IG51bGwgfVxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IGNhcmQgfTwvcD48L3RkPlxuICAgICAgICA8L3RyPlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKGhhc19uZXh0X3RvdXIsIHByZXZfcm93LCBuZXh0X3JvdywgcHJldl9ydW4sIG5leHRfcnVuLCBpZHgsIG5fY29scykge1xuICAgICAgICBsZXQgcHJldl9zdGF0dXMgPSBwcmV2X3Jvd1xuICAgICAgICAgICAgPyBwcmV2X3J1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICA/IHByZXZfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCJcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IG5leHRfc3RhdHVzID0gbmV4dF9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICA/IG5leHRfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCI7XG4gICAgICAgIGxldCByZXN1bHQgPSBwcmV2X3N0YXR1cyAhPT0gbmV4dF9zdGF0dXNcbiAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgOiBoYXNfbmV4dF90b3VyXG4gICAgICAgICAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiTlRcIiArIGlkeCB9Pjx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XG4gICAgICAgICAgICB7IHJlc3VsdCB9XG4gICAgICAgIDwvdGg+PC90cj5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGxldCBoYXNfdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiICYmIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHggLSAxXSxcbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm9baWR4XSxcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4XSxcbiAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgNSArIGhhc190b3RhbF9zY29yZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzVGFibGVSb3dcbiAgICAgICAgICAgICAgICBrZXk9eyBydW5zW2lkeF0uaWQgfVxuICAgICAgICAgICAgICAgIGhlYWRfanVkZ2Vfc2NvcmU9eyBoZWFkX2p1ZGdlX3Njb3Jlc1tpZHhdIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm89eyByZXN1bHRzX2luZm9baWR4XSB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuc1tpZHhdIH1cbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XG4gICAgICAgICAgICAgICAgaGFzX3RvdGFsX3Njb3JlPXsgaGFzX3RvdGFsX3Njb3JlIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImJyaWVmLXRhYmxlXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH08L3A+PC90aD4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IHJvd3MgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBQcmludGFibGUgfSBmcm9tIFwidWkvcHJpbnRhYmxlXCI7XG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XG5cbmltcG9ydCB7IFRvdXJSZXN1bHRzVGFibGUsIFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZSwgVG91clJlc3VsdHNWZXJib3NlVGFibGUgfSBmcm9tIFwiLi9yb3NmYXJyL3RvdXJfcmVzdWx0c1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c0J1dHRvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHNpZ25hbChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17IHRoaXMuc2lnbmFsKFwiZG9jeFwiKSB9PlxuICAgICAgICAgICAgICAgIERPQ1hcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c0JvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICByZXN1bHRzOiBudWxsLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuVE9VUl9TQ0hFTUEgPSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiB7fSxcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwicmVzdWx0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInRvdXJfcmVzdWx0c19jaGFuZ2VkIHJlbG9hZF9kYXRhXCIsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSB8fCBtZXNzYWdlLnRvdXJfaWQgPT09IHRoaXMucHJvcHMudG91cl9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9Eb2N4KSB7XG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxfaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihcInJlc3VsdHNfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbGV0IHNlcmlhbGl6ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKVxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5UT1VSX1NDSEVNQSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWRSZXN1bHRzKCkge1xuICAgICAgICBBcGkoXCJ0b3VyLmdldF9yZXN1bHRzXCIsIHt0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWR9KVxuICAgICAgICAub25TdWNjZXNzKGZ1bmN0aW9uKG5ld19yZXN1bHRzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogbmV3X3Jlc3VsdHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwgeyB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWQsIGNoaWxkcmVuOiB0aGlzLlRPVVJfU0NIRU1BfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJfaWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW5lcnNcblxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW5kZXJpbmdcblxuICAgIHJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS50b3VyLmZpbmFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+eyBfKFwicmVzdWx0cy5hbGVydHMubm90X2ZpbmFsaXplZFwiKSB9PC9kaXY+XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCB8fCB0aGlzLnN0YXRlLnJlc3VsdHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhYmxlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmVyYm9zaXR5ID09PSBcIjNcIikge1xuICAgICAgICAgICAgdGFibGUgPSA8VG91clJlc3VsdHNWZXJib3NlVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy52ZXJib3NpdHkgPT09IFwiMlwiKSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1RhYmxlIHsuLi50aGlzLnN0YXRlfSAvPlxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50YWJsZU9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0c1wiIHJlZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIH1cbiAgICAgICAgICAgICAgICB7IHRhYmxlIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIGxldCBib2R5ID0gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXJlc3VsdHMgcC1jb250ZW50XCIgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcoKSB9XG4gICAgICAgICAgICB7IHRhYmxlIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnByaW50YWJsZVxuICAgICAgICAgICAgPyA8UHJpbnRhYmxlXG4gICAgICAgICAgICAgICAgcmVmPVwicHJpbnRhYmxlXCJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSB9XG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICB0aXRsZTI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgYm9keT17IGJvZHkgfSAvPlxuICAgICAgICAgICAgOiBib2R5O1xuICAgIH1cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1yZXN1bHRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldE1hcmdpbnMoWzEwLCAxMCwgMTUsIDEwXSlcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXG4gICAgICAgICAgICAuc2V0VGl0bGUxKF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfcmVzdWx0c1wiKSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXG4gICAgICAgICAgICAuc2V0Qm9keShSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY29udGVudCkuaW5uZXJIVE1MKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIHRoaXMucHJvcHMudmVyYm9zaXR5ID09PSBcIjFcIiA/IFwiMTJwdFwiIDogXCI5cHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImZvbnQtc2l6ZVwiLCBcIjlwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgM3B0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgMCAwIDFwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInRleHQtYWxpZ25cIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd25cIiwgXCJ3aWR0aFwiLCBcIjUwcHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdGFsLXNjb3JlXCIsIFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhZF9qdWRnZVwiLCBcIndpZHRoXCIsIFwiNSVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5kYW5jZV9qdWRnZVwiLCBcIndpZHRoXCIsIFwiOCVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hY3JvX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI4JVwiKVxuICAgICAgICAgICAgLnNhdmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBdXRvUHJpbnRlciB9IGZyb20gXCJhZG1pbi9hdXRvX3ByaW50ZXIvbWFpblwiO1xuXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8QXV0b1ByaW50ZXIgeyAuLi53aW5kb3cucGFnZV9wcm9wcyB9IC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKVxuKTtcbiIsImNsYXNzIERvY3hJbXBsIHtcbiAgICBjb25zdHJ1Y3RvcihmaWxlbmFtZSkge1xuICAgICAgICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTEgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMiA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUzID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXJnaW5zID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib2R5ID0gXCJcIjtcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IFwicG9ydHJhaXRcIjtcbiAgICAgICAgdGhpcy5zdHlsZXMgPSB7XG4gICAgICAgICAgICBcImJvZHlcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC1mYW1pbHlcIjogXCJDYWxpYnJpLCBUYWhvbWEsIEFyaWFsLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0YWJsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXItY29sbGFwc2VcIjogXCJjb2xsYXBzZVwiLFxuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWluc2lkZVwiOiBcImF2b2lkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0ZCwgdGhcIjoge1xuICAgICAgICAgICAgICAgIFwicGFkZGluZ1wiOiBcIjFwdCAzcHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgxLCBoMiwgaDMsIGg0LCBoNSwgaDZcIjoge1xuICAgICAgICAgICAgICAgIFwicGFnZS1icmVhay1hZnRlclwiOiBcImF2b2lkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoMVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIyMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCIxMHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoMlwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCI2cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgzXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjRwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDQgcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjEwcHQgMCA2cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImg1IHBcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTJwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogXCI2cHQgMFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiLmhlYWRlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXItYm90dG9tXCI6IFwiMXB4IHNvbGlkIGJsYWNrXCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiAwLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZy1ib3R0b21cIjogXCIycHRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogXCIyMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwXCI6IHtcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiAwLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1wiOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibGlcIjogeyBcIm1hcmdpbi10b3BcIjogMCwgXCJwYWRkaW5nLXRvcFwiOiAwIH0sXG4gICAgICAgICAgICBcIi5zcGFjZXJcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiLnZhLXRvcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInRvcFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiLnRleHQtbGVmdFwiOiB7IFwidGV4dC1hbGlnblwiOiBcImxlZnRcIiB9LFxuICAgICAgICAgICAgXCIudGV4dC1yaWdodFwiOiB7IFwidGV4dC1hbGlnblwiOiBcInJpZ2h0XCIgfSxcbiAgICAgICAgICAgIFwiLnRleHQtY2VudGVyXCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgIFwiLmJvcmRlcmVkLXRhYmxlIHRkLCAuYm9yZGVyZWQtdGFibGUgdGhcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB0IHNvbGlkIGJsYWNrXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkV2lkdGhDc3MoKTtcbiAgICB9XG4gICAgYWRkV2lkdGhDc3MoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwMDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFN0eWxlKFwiLnctXCIgKyBpLCBcIndpZHRoXCIsIGkgKyBcIiVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRTdHlsZShzZWxlY3Rvciwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuc3R5bGVzW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZXNbc2VsZWN0b3JdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdHlsZXNbc2VsZWN0b3JdW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTEodGl0bGUxKSB7XG4gICAgICAgIHRoaXMudGl0bGUxID0gdGl0bGUxO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUyKHRpdGxlMikge1xuICAgICAgICB0aGlzLnRpdGxlMiA9IHRpdGxlMjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMyh0aXRsZTMpIHtcbiAgICAgICAgdGhpcy50aXRsZTMgPSB0aXRsZTM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRNYXJnaW5zKG1hcmdpbnMpIHtcbiAgICAgICAgdGhpcy5tYXJnaW5zID0gbWFyZ2lucztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEJvZHkoYm9keSkge1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pIHtcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZW5kZXJTdHlsZUJsb2NrKHNlbGVjdG9yLCBkYXRhKSB7XG4gICAgICAgIGxldCBjc3NfcGFpcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5tYXAoKGtleSkgPT4ga2V5ICsgJzogJyArIGRhdGFba2V5XSArICc7ICcpXG4gICAgICAgIHJldHVybiBzZWxlY3RvciArIFwiIHsgXCIgKyBjc3NfcGFpcnMuam9pbihcIiBcIikgKyBcIiB9XCI7XG4gICAgfVxuICAgIHJlbmRlclN0eWxlcygpIHtcbiAgICAgICAgbGV0IGNzc19ibG9ja3MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLnN0eWxlcykubWFwKChcbiAgICAgICAgICAgIChzZWxlY3RvcikgPT4gdGhpcy5yZW5kZXJTdHlsZUJsb2NrKHNlbGVjdG9yLCB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pXG4gICAgICAgICkuYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiBjc3NfYmxvY2tzLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuICAgIHJlbmRlckhUTUwoKSB7XG4gICAgICAgIGxldCBjc3MgPSB0aGlzLnJlbmRlclN0eWxlcygpO1xuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5oZWFkZXIgPyAnPHAgY2xhc3M9XCJoZWFkZXJcIj4nICsgdGhpcy5oZWFkZXIgKyAnPC9wPicgOiBcIlwiO1xuICAgICAgICBsZXQgdGl0bGUxID0gdGhpcy50aXRsZTEgPyAnPGgxPicgKyB0aGlzLnRpdGxlMSArICc8L2gxPicgOiBcIlwiO1xuICAgICAgICBsZXQgdGl0bGUyID0gdGhpcy50aXRsZTIgPyAnPGgyPicgKyB0aGlzLnRpdGxlMiArICc8L2gyPicgOiBcIlwiO1xuICAgICAgICBsZXQgdGl0bGUzID0gdGhpcy50aXRsZTMgPyAnPGgzPicgKyB0aGlzLnRpdGxlMyArICc8L2gzPicgOiBcIlwiO1xuICAgICAgICBsZXQgc3BhY2VyID0gKGhlYWRlciB8fCB0aXRsZTEgfHwgdGl0bGUyIHx8IHRpdGxlMykgPyAnPHAgY2xhc3M9XCJzcGFjZXJcIj4mbmJzcDs8L3A+JyA6IFwiXCI7XG4gICAgICAgIHJldHVybiBcIjwhRE9DVFlQRSBodG1sPlxcblwiICtcbiAgICAgICAgICAgIFwiPGh0bWw+PGhlYWQ+XCIgK1xuICAgICAgICAgICAgICAgIFwiPG1ldGEgY2hhcnNldD1cXFwidXRmLThcXFwiPlwiICtcbiAgICAgICAgICAgICAgICBcIjxzdHlsZT5cXG5cIiArIGNzcyArIFwiXFxuPC9zdHlsZT5cXG5cIiArXG4gICAgICAgICAgICBcIjwvaGVhZD48Ym9keT5cXG5cIiArXG4gICAgICAgICAgICAgICAgaGVhZGVyICtcbiAgICAgICAgICAgICAgICB0aXRsZTEgK1xuICAgICAgICAgICAgICAgIHRpdGxlMiArXG4gICAgICAgICAgICAgICAgdGl0bGUzICtcbiAgICAgICAgICAgICAgICBzcGFjZXIgK1xuICAgICAgICAgICAgICAgIHRoaXMuYm9keSArXG4gICAgICAgICAgICBcIjwvYm9keT48L2h0bWw+XCI7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlckhUTUwoKTtcbiAgICAgICAgbGV0IG1hcmdpbnMgPSB0aGlzLm1hcmdpbnMgfHwgKHRoaXMub3JpZW50YXRpb24gPT09IFwicG9ydHJhaXRcIiA/IFsxMCwgMTUsIDEwLCAxNV0gOiBbNywgMTAsIDcsIDEwXSk7XG4gICAgICAgIGxldCBjb252ZXJ0ZWQgPSBodG1sRG9jeC5hc0Jsb2IoaHRtbCwge1xuICAgICAgICAgICAgb3JpZW50YXRpb246IHRoaXMub3JpZW50YXRpb24sXG4gICAgICAgICAgICBtYXJnaW5zOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAgICBNYXRoLmZsb29yKG1hcmdpbnNbMF0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICBNYXRoLmZsb29yKG1hcmdpbnNbMV0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgYm90dG9tOiBNYXRoLmZsb29yKG1hcmdpbnNbMl0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgbGVmdDogICBNYXRoLmZsb29yKG1hcmdpbnNbM10gKiA1Ni42NTkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzYXZlQXMoY29udmVydGVkLCB0aGlzLmZpbGVuYW1lKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHZhciBEb2N4ID0gKGZuKSA9PiBuZXcgRG9jeEltcGwoZm4pO1xuIiwiZXhwb3J0IGNsYXNzIFJ1blNjb3Jlc1dyYXBwZXIge1xuICAgIGNvbnN0cnVjdG9yKHJ1biwgZGlzY2lwbGluZV9qdWRnZXMpIHtcbiAgICAgICAgdGhpcy5ydW4gPSBydW47XG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMgPSBkaXNjaXBsaW5lX2p1ZGdlcztcbiAgICAgICAgdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZCA9IHt9XG4gICAgICAgIHJ1bi5zY29yZXMuZm9yRWFjaChmdW5jdGlvbihzY29yZSkge1xuICAgICAgICAgICAgbGV0IGRqX2lkID0gc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVzX2J5X2Rpc2NpcGxpbmVfanVkZ2VfaWRbZGpfaWRdID0gc2NvcmU7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIGdldFNjb3Jlc0J5SnVkZ2VJZHMoZGlzY2lwbGluZV9qdWRnZV9pZHMpIHtcbiAgICAgICAgcmV0dXJuIGRpc2NpcGxpbmVfanVkZ2VfaWRzLm1hcCgoKGRqX2lkKSA9PiB0aGlzLnNjb3Jlc19ieV9kaXNjaXBsaW5lX2p1ZGdlX2lkW2RqX2lkXSkuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clNjb3Jlc1dyYXBwZXIge1xuICAgIGNvbnN0cnVjdG9yKHRvdXIsIHJlc3VsdHMpIHtcbiAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMgPSB0b3VyLnJ1bnMubWFwKChydW4pID0+IG5ldyBSdW5TY29yZXNXcmFwcGVyKHJ1biwgdG91ci5kaXNjaXBsaW5lX2p1ZGdlcykpO1xuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzID0gdG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzO1xuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzID0ge307XG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMuZm9yRWFjaChmdW5jdGlvbihkaiwgaWR4KSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1tkai5yb2xlXSB8fCBbXTtcbiAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZHg6IGlkeCxcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlOiBkaixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1tkai5yb2xlXSA9IGFycjtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHRzX2J5X3J1bl9pZHMgPSB7fTtcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzKSA9PlxuICAgICAgICAgICAgICAgIHJlc3VsdHNfYnlfcnVuX2lkc1tyZXMucnVuX2lkXSA9IHJlcyk7XG4gICAgICAgICAgICB0aGlzLnJ1bl93cmFwcGVycy5mb3JFYWNoKCh3KSA9PlxuICAgICAgICAgICAgICAgIHcucmVzdWx0c19pbmZvID0gcmVzdWx0c19ieV9ydW5faWRzW3cucnVuLmlkXSk7XG4gICAgICAgICAgICB0aGlzLnJ1bl93cmFwcGVycy5zb3J0KChhLCBiKSA9PiBhLnJlc3VsdHNfaW5mby5wbGFjZSAtIGIucmVzdWx0c19pbmZvLnBsYWNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcygpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1swXV1cbiAgICAgICAgICAgICAgICA/IHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbYXJndW1lbnRzWzBdXS5tYXAoKGIpID0+IGIuZGlzY2lwbGluZV9qdWRnZSlcbiAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlcyA9IHJlcy5jb25jYXQodGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1thcmd1bWVudHNbaV1dIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc29ydCgoYSwgYikgPT4gYS5pZHggLSBiLmlkeCk7XG4gICAgICAgIHJldHVybiByZXMubWFwKChiKSA9PiBiLmRpc2NpcGxpbmVfanVkZ2UpO1xuICAgIH1cbiAgICBnZXRTY29yZXNUYWJsZUJ5Um9sZXMoKSB7XG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlX2lkcyA9IHRoaXMuZ2V0RGlzY2lwbGluZUp1ZGdlc0J5Um9sZXMoLi4uYXJndW1lbnRzKS5tYXAoKGRqKSA9PiBkai5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bl93cmFwcGVycy5tYXAoKHcpID0+IHcuZ2V0U2NvcmVzQnlKdWRnZUlkcyhkaXNjaXBsaW5lX2p1ZGdlX2lkcykpO1xuICAgIH1cbiAgICBnZXRSZXN1bHRzSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuX3dyYXBwZXJzLm1hcCgodykgPT4gdy5yZXN1bHRzX2luZm8pO1xuICAgIH1cbiAgICBnZXRSdW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5fd3JhcHBlcnMubWFwKCh3KSA9PiB3LnJ1bik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnREaXNwbGF5KHBhcnRpY2lwYW50KSB7XG4gICAgaWYgKHBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lICE9PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiA8cD57IHBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lIH08L3A+O1xuICAgIH1cbiAgICByZXR1cm4gcGFydGljaXBhbnQuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PiA8cCBrZXk9eyBpZHggfT57IHMubGFzdF9uYW1lICsgXCIgXCIgKyBzLmZpcnN0X25hbWUgfTwvcD4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NvcmluZ1R5cGUoZGlzY2lwbGluZV9qdWRnZSwgc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xuICAgIHN3aXRjaCAoZGlzY2lwbGluZV9qdWRnZS5yb2xlKSB7XG4gICAgY2FzZSBcImRhbmNlX2p1ZGdlXCI6XG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvblwiO1xuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwiZm9ybWF0aW9uX2Fjcm9cIjtcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuc2ltcGxpZmllZFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwic2ltcGxpZmllZFwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwiZGFuY2VcIjtcbiAgICAgICAgfVxuICAgIGNhc2UgXCJhY3JvX2p1ZGdlXCI6XG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9md1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwiZGFuY2VcIjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBcImFjcm9cIjtcbiAgICAgICAgfVxuICAgIGNhc2UgXCJ0ZWNoX2p1ZGdlXCI6XG4gICAgICAgIHJldHVybiBcInRlY2hcIjtcbiAgICBjYXNlIFwiaGVhZF9qdWRnZVwiOlxuICAgICAgICByZXR1cm4gXCJoZWFkXCI7XG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG5jbGFzcyBDbXBDaGFpbkltcGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IDA7XG4gICAgfVxuICAgIGNtcChhLCBiKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBDbXBDaGFpbiA9ICgpID0+IG5ldyBDbXBDaGFpbkltcGwoKTtcbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xuXG5leHBvcnQgdmFyIF8gPSB0cmFuc2xhdGU7XG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC+0YIge2RhdGV9KSAmbWRhc2g7INGB0LjRgdGC0LXQvNCwINC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INC/0L4g0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60L7QvNGDINGA0L7Qui3QvS3RgNC+0LvQu9GDLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QkNCy0YLQvtGA0YHQutC40LUg0L/RgNCw0LLQsCDQvdCwINGB0LjRgdGC0LXQvNGDIFJvY2tKdWRnZSDQv9C+0LvQvdC+0YHRgtGM0Y4g0L/RgNC40L3QsNC00LvQtdC20LDRgiDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60YMg0JDRgNGC0LXQvNGDINCa0LDQt9Cw0LrQvtCy0YMuINCh0L7QsNCy0YLQvtGAINGB0LjRgdGC0LXQvNGLINCQ0L3RgtC+0L0g0JDQvNC10LvQuNC9LjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QodC40YHRgtC10LzQsCDRgNCw0YHQv9GA0L7RgdGC0YDQsNC90Y/QtdGC0YHRjyDQv9C+INC70LjRhtC10L3Qt9C40LggTGludW0gZC5vLm8gKGluZm9AbGludW0uaHIpLiDQlNC70Y8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwIFJvY2tKdWRnZSDQvdC10L7QsdGF0L7QtNC40LzQviDQuCDQtNC+0YHRgtCw0YLQvtGH0L3QviDQuNC80LXRgtGMINC/0YDQsNCy0L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80YsgTGludW0gTFBTLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QntGE0LjRhtC40LDQu9GM0L3Ri9C5INGB0LDQudGCOiA8YSBocmVmPVwiaHR0cHM6Ly9yb2NranVkZ2UuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPmh0dHBzOi8vcm9ja2p1ZGdlLmNvbS88L2E+PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcHJvZ3JhbXNfYWZ0ZXJfY3JlYXRpb25cIjogXCLQn9GA0L7Qs9GA0LDQvNC80Ysg0LzQvtC20L3QviDQsdGD0LTQtdGCINC00L7QsdCw0LLQuNGC0Ywg0YLQvtC70YzQutC+INC/0L7RgdC70LUg0YHQvtGF0YDQsNC90LXQvdC40Y8g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQutC+0YDRgNC10LrRgtC90L4g0L3QsNGB0YLRgNC+0LXQvdCwINC4INC80L7QttC10YIg0LHRi9GC0Ywg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdCwLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfbm90X2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC90LXQtNC+0YHRgtGD0L/QvdCwINC90LAg0Y3RgtC+0Lwg0LrQvtC80L/RjNGC0LXRgNC1LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maW5hbGl6ZWRcIjogXCLQntGC0YHRg9GC0YHRgtCy0YPRjtGCINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfd2FybmluZ1wiOiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+0KTQuNC90LDQu9C40LfQsNGG0LjRjyDQtNC+0LvQttC90LAg0L7RgtC80LXQvdGP0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINC40YHQutC70Y7Rh9C40YLQtdC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YUhPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCV0YHQu9C4INC20LUg0Y3RgtC+INC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INC90LXQvtCx0YXQvtC00LjQvNC+LCDQvtCx0YDQsNGC0LjRgtC1INCy0L3QuNC80LDQvdC40LUsINGH0YLQviDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QslxyXG4gICAgICAgICAgICAgICAgICAgINGB0LvQtdC00YPRjtGJ0LXQs9C+INGC0YPRgNCwINCx0YPQtNC10YIg0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60Lgg0L/QtdGA0LXRgdC+0LfQtNCw0L0uINCg0LXQt9GD0LvRjNGC0LDRgtGLINGD0YfQsNGB0YLQvdC40LrQvtCyLCDQv9GA0L7RiNC10LTRiNC40YUg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQv9C+0YHQu9C1INC/0LXRgNCy0L7QuVxyXG4gICAgICAgICAgICAgICAgICAgINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0Lgg0L3QtSDQv9GA0L7RiNC10LTRiNC40YUg0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0LHRg9C00YPRgiDQsdC10LfQstC+0LfQstGA0LDRgtC90L4g0YPRgtC10YDRj9C90YshPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCYINC90LUg0LfQsNCx0YPQtNGM0YLQtSDQt9Cw0L3QvtCy0L4g0L3QsNC/0LXRh9Cw0YLQsNGC0Ywg0LLRgdC1INGC0LHQu9C40YbRiy48L3A+PC9kaXY+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRgdC7LsKg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmNvbmZpcm1fc2NvcmVcIjogXCLQntGC0LzQtdC90LAg0YTQuNC60YHQsNGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY2x1YlwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINC60LvRg9CxP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY29tcGV0aXRpb25cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L4g0YHQvtGA0LXQstC90L7QstCw0L3QuNC1P1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZGlzY2lwbGluZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQtNC40YHRhtC40L/Qu9C40L3Rgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2p1ZGdlXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRgdGD0LTRjNGOP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcGFydGljaXBhbnRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0L/RgNC+0LPRgNCw0LzQvNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y4g0YLRg9GA0LA/INCS0LLQtdC00LjRgtC1IMKrdW5maW5hbGl6ZcK7LCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6IFwi0J4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsaWVudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQvNC4INGD0YHRgtGA0L7QudGB0YLQstCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2luZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtGD0YDQvdC40YDQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9uYW1lXCI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc1wiOiBcItCU0LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzXCI6IFwi0KPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3BvcnRzbWVuX29ubHlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgICAgICBcInRvdXJzXCI6IFwi0KLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfcGFzc2NvZGVcIjogXCLQktCy0LXQtNGR0L0g0L3QtdCy0LXRgNC90YvQuSDQutC+0LQg0L/QvtGC0LLQtdGA0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVudVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY2x1YnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2Rpc2NpcGxpbmVzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9qdWRnZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2Vfc3BvcnRzbWVuXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQv9C+0YDRgtGB0LzQtdC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV90b3Vyc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGC0YPRgNCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5fcGFydGljaXBhbnRzXCI6IG4gPT4gbi50b1N0cmluZygpICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lblwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L/QsNGB0L0keyBjaG9vc2VFbmRpbmcocywgXCLQvtC5XCIsIFwi0YvRhVwiLCBcItGL0YVcIikgfSlgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuX3Nob3J0XCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQvy4pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9uX3BhcnRpY2lwYW50c1wiOiBuID0+IFwi0JjRgtC+0LPQviBcIiArIG4gKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2luZy10YWJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG91ci1hZG1pblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lLXJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlcnJvcnNcIjoge1xyXG4gICAgICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibG9hZF9zeW50YXhfZXJyb3JcIjogXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC00LDQvdC90YvRhVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFwaVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImR1cGxpY2F0ZWRfZXh0ZXJuYWxfaWRcIjogXCLQkiDQtNCw0L3QvdGL0YUg0LjQvNC10Y7RgtGB0Y8g0LfQsNC/0LjRgdC4INGBINC/0L7QstGC0L7RgNGP0Y7RidC40LzQuNC80YHRjyBleHRlcm5hbF9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmFibGVfdG9fZ2V0XCI6ICh3YW50ZWQpID0+IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QvtC70YPRh9C40YLRjCBcIiArIHdhbnRlZCArIFwiINC40Lcg0LfQsNC/0YDQvtGB0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LrQu9GD0LEsINC6INC60L7RgtC+0YDQvtC80YMg0L/RgNC40LLRj9C30LDQvdGLINGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX25vbl9lbXB0eVwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSwg0YHQvtC00LXRgNC20LDRidC10LUg0LTQuNGB0YbQuNC/0LvQuNC90YssINC60LvRg9Cx0Ysg0LjQu9C4INGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG9vX21hbnlfdG91cnNcIjogKGQpID0+IFtcItCe0YjQuNCx0LrQsCDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsIGDQkiDQtNC40YHRhtC40L/Qu9C40L3QtSAke2R9INGB0L7QtNC10YDQttC40YLRgdGPINCx0L7Qu9GM0YjQtSDRgtGD0YDQvtCyLCDRh9C10Lwg0YHQvtC30LTQsNC90L4g0LIg0YHQuNGB0YLQtdC80LVgXSxcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9kaXNjaXBsaW5lX2ZvdW5kXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLLCDQvtGC0YHRg9GC0YHRgtCy0YPRjtGJ0LjQtSDQsiDRgdC40YHRgtC10LzQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjaGFuZ2VfanVkZ2VzX3dpdGhfZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0L7RgdGC0LDQsiDRgdGD0LTQtdC5INC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Riywg0YHQvtC00LXRgNC20LDRidC10Lkg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINGDINC60L7RgNC+0LPQviDQtdGB0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfc2NvcmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVwZWF0aW5nX2p1ZGdlXCI6IChuYW1lKSA9PiBuYW1lICsgXCIg0LLRgdGC0YDQtdGH0LDQtdGC0YHRjyDQsiDRgdC/0LjRgdC60LUg0YHRg9C00LXQuSDQsdC+0LvQtdC1INC+0LTQvdC+0LPQviDRgNCw0LfQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludGVybmFsX3NlcnZlcl9lcnJvclwiOiBbXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtVwiLCBcItC/0YDQvtCy0LXRgNGM0YLQtSDQu9C+0LPQuCDQtNC70Y8g0LjQvdGE0L7RgNC80LDRhtC40LhcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9kaXNjaXBsaW5lc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINCy0YXQvtC00Y/RidC10LPQviDQsiDRgdGD0LTQtdC50YHQutGD0Y4g0LHRgNC40LPQsNC00YMg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRg9GH0LDRgdGC0L3QuNC60LAsINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INGF0L7RgtGPINCx0Ysg0LIg0L7QtNC90L7QvCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicnVuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2V0X3BlcmZvcm1lZF9mbGFnX29uX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHRgtCw0YLRg9GBINC30LDRhdC+0LTQsCDRhNC40L3QsNC70LjQt9C40L3QvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2NvcmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzY29yZV9ub3RfZXhpc3RcIjogXCLQn9C+0L/Ri9GC0LrQsCDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LUg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQuSDQvtGG0LXQvdC60Lgg0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfb25fZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINC+0YbQtdC90LrRgyDQsiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfYmVmb3JlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0L3QvtCy0YvQuSDRgtGD0YAg0L/QtdGA0LXQtCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YLRg9GALCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YnQuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF9maW5haWx6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2FkZF9hZnRlcl9pZFwiOiBcItCf0L7Qv9GL0YLQutCwINC00L7QsdCw0LjRgtGMINGC0YPRgCDQsiDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC1INC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF90b19ub25fZW1wdHlcIjogKGQpID0+IFtcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCDRgtGD0YDRiyDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YtcIiwgYNCU0LjRgdGG0LjQv9C70LjQvdCwICR7ZH0g0YPQttC1INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YtgXSxcclxuICAgICAgICAgICAgICAgIFwibmV4dF9pc19maW5haWx6ZWRcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX25leHRfdG91clwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L/QvtGB0LvQtdC00L3QuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X25vdF9maW5haWx6ZWRcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgtGD0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQv9GD0YHRgtC40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX2ZpbmFsaXplZFwiOiBcItCU0LvRjyDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwINC90LUg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyDQuNC30LzQtdC90LXQvdC40LUg0LrQstC+0YLRiyDQstGL0LLQvtC00LAsINGC0LjQv9CwINGC0YPRgNCwINC40LvQuCDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkXCI6IFwi0JTQvtCx0LDQstC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2VsZWN0X2FsbFwiOiBcItCh0L3Rj9GC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImVkaXRcIjogXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVcIjogXCLQo9C00LDQu9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNhdmVcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2FsbFwiOiBcItCS0YvQsdGA0LDRgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJicm93c2VcIjogXCLQntCx0LfQvtGALi4uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3RpbmdcIjogXCLQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fcHJvYmxlbVwiOiBcItCf0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX2Vycm9yXCI6IFwi0J/QvtGF0L7QttC1LCDQuNC80LXRjtGC0YHRjyDQv9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiZXJyb3JfaGVhZGVyXCI6IFwi0J7RiNC40LHQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogXCLQntC/0LXRgNCw0YbQuNGPINGD0YHQv9C10YjQvdC+INC30LDQstC10YDRiNC10L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoZWF0X25cIjogKG4pID0+IFwi0JfQsNGF0L7QtCDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gXCLQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25cIjogKG4sIG5hbWUsIG5fc3ApID0+XHJcbiAgICAgICAgICAgICAgICAgICAgKG5fc3AgPiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQpNC+0YDQvNC10LnRiNC9IOKEllwiICsgbi50b1N0cmluZygpICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAobl9zcCA9PT0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCf0LDRgNCwIOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi0KPRh9Cw0YHRgtC90LjQuiDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnaW5nXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0JBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LtcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJvbGVzX2xlZ2VuZFwiOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctMTAwXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7Qk9C7IOKAlCDQs9C70LDQstC90YvQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QoiDigJQg0YHRg9C00YzRjyDRgtCw0L3RhtCwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QkCDigJQg0YHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KJleCDigJQg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQpC4g0JguINCeLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZV9kZXNjcmlwdGlvblwiOiBcItCU0L7Qu9C20L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfbmFtZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5lcmFsX2luZm9cIjogXCLQntGB0L3QvtCy0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWFuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvbl9zdGF0dXMgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc19jbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0Li4uXCIpO1xyXG4gICAgICAgIHRoaXMud3MgPSBuZXcgU29ja0pTKFwiaHR0cDovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi93c1wiKTtcclxuICAgICAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRPaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC5cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtbXCJyZWxvYWRfZGF0YVwiLCBudWxsXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsX3VwZGF0ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRGYWlsKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGFbXCJjbGllbnRfaWRcIl0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsaWVudF9pZCA9IGRhdGFbXCJjbGllbnRfaWRcIl07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1zZ190eXBlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgbGV0IG1zZ19kYXRhID0gZGF0YVsxXTtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKG1zZ190eXBlID09PSBcImZvcmNlX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge30pLmZvckVhY2goKGtleSkgPT4gbGlzdGVuZXJzW2tleV0obXNnX2RhdGEpKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBkYXRhLm1vZGVsX3VwZGF0ZXMuZm9yRWFjaCgobW9kZWxfaW5mbykgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSBzdG9yYWdlLnVwZGF0ZU1vZGVsKG1vZGVsX2luZm8ubW9kZWwsIG1vZGVsX2luZm8uaWQsIG1vZGVsX2luZm8uZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkYXRhX2NoYW5nZWQpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW1wiZGJfdXBkYXRlXCJdIHx8IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TGlzdGVuZXJJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnNfY250Kys7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcihtc2dfdHlwZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRMaXN0ZW5lcklkKCk7XHJcbiAgICAgICAgbXNnX3R5cGVzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZ190eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV1baWRdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcl9pZCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNba2V5XVtsaXN0ZW5lcl9pZF07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBuZXcgTWVzc2FnZURpc3BhdGNoZXIoKTtcclxuIiwiY2xhc3MgUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBpZCwgbW9kZWxfc3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZEJhY2tSZWYoa2V5LCByZWYpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSByZWY7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIgfHwgaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWZfa2V5ID0gZGF0YVtpZHhdLmJhY2tfcmVmO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWYuZ2V0KCkuYWRkQmFja1JlZihiYWNrX3JlZl9rZXksIGJhY2tfcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiKlwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZF9kYXRhID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXJpYWxpemUoc2NoZW1hKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9fa2V5X3R5cGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBcIipcIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0ubWFwKGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl5cIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdID0gbmV3IE1vZGVsKHRoaXMuc3RvcmFnZSwgaWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGJ5X2lkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2lkXTtcclxuICAgIH1cclxuICAgIGFsbCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubW9kZWxzKTtcclxuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzID0ge31cclxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxyXG4gICAgfVxyXG4gICAgZ2V0RG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBkZWxEb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZ2V0KG1vZGVsX25hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIGRlbChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGVNb2RlbChtb2RlbF90eXBlLCBtb2RlbF9pZCwgZGF0YSkge1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIGRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZG9tYWluc1trZXldLnVwZGF0ZU1vZGVsKC4uLmFyZ3VtZW50cykgfHwgZGF0YV9jaGFuZ2VkKTtcclxuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBcInRleHRBbGlnblwiOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzTW9jayB7XHJcbiAgICBzZXRPaygpIHt9XHJcbiAgICBzZXRGYWlsKCkge31cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBcImNvbm5lY3RlZFwiOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uX3N0YXR1c1wiKTtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XG4gICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XG4gICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxuICAgIH0sIGFjdGlvbik7XG59XG4iLCJleHBvcnQgY2xhc3MgUHJpbnRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZmV0Y2hQcmludGFibGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVhZGVyID8gPGRpdiBjbGFzc05hbWU9XCJwLWhlYWRlclwiPnsgdGhpcy5wcm9wcy5oZWFkZXIgfTwvZGl2PiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUxID8gPGgxPnsgdGhpcy5wcm9wcy50aXRsZTEgfTwvaDE+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTIgPyA8aDI+eyB0aGlzLnByb3BzLnRpdGxlMiB9PC9oMj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMyA/IDxoMz57IHRoaXMucHJvcHMudGl0bGUzIH08L2gzPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICByZWY9eyBlID0+IHRoaXMuX2JvZHkgPSBlIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYm9keSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByaW50YWJsZVwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTEoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUyKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXG4gICAgICAgIG9uQ2xpY2s6IGYsXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaEVuZE9yQ2xpY2soaGFuZGxlciwgcHJldmVudF9kZWZhdWx0KSB7XG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcbiAgICB9XG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgfVxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XG4gICAgICAgICAgICBkaXNjYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBkb25lVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5waW4gPSBudWxsO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNGcmVlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcbiAgICB9XG4gICAgZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KDEwMCAtIHRoaXMuc3RhdGUucG9zaXRpb24sIDApLCAxMDApO1xuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xuICAgIH1cbiAgICBnZXRFbGVtZW50T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXMgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGdldFRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFNsaWRlclBvcyhldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIDIwMCk7XG4gICAgfVxuICAgIG9uQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICB9XG4gICAgb25Ub3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlciBub3NlbGVjdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5uZXJcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIil9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IHRoaXMuc3RhdGUucG9zaXRpb24gKyBcInB4XCIgfX1cbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLm9uVG91Y2hTdGFydCB9XG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9eyB0aGlzLm9uVG91Y2hNb3ZlIH1cbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5vblRvdWNoRW5kIH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vbkNsaWNrIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDihpJcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVcbiAgICAgICAgICAgICAgICA/IDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYigxMDAsMTAwLDEwMClcIiB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImRvbmUtdGV4dFwiIH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDogPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiYSgxMDAsMTAwLDEwMCxcIiArIHRoaXMuZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpICsgXCIpXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJzbGlkZS10ZXh0XCIgKyAodGhpcy5pc0ZyZWUoKSA/IFwiIGZyZWVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zbGlkZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgY2hvaWNlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3dfc2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dfc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcbiAgICB9XG4gICAgb25DbGljayhuKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShuKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMucHJvcHMuY2hvaWNlcy5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0gZWxbMF07XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGVsWzFdO1xuICAgICAgICAgICAgbGV0IGFjdGl2ZV9jbGFzc19uYW1lID0gKHRoaXMucHJvcHMuYWN0aXZlID09PSBrZXkpID8gXCIgYWN0aXZlXCIgOiBcIlwiO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBrZXkgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrLmJpbmQodGhpcywga2V5KSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBzY29yZS1idG5cIiArIGFjdGl2ZV9jbGFzc19uYW1lIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiYgKGlkeCArIDEpICUgdGhpcy5wcm9wcy5yb3dfc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxiciBrZXk9eyBcImJyXCIgKyBpZHggfSAvPilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBsYXlvdXRfY2xhc3MgPSAodGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIikgPyBcInNlbGVjdG9yLWxheW91dFwiIDogXCJzZWxlY3Rvci1sYXlvdXQtMnJvd3NcIjtcbiAgICAgICAgbGV0IHNlbGVjdGVkX2NsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmUgPT09IG51bGwgPyBcIlwiIDogXCIgc2VsZWN0ZWRcIlxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wic2NvcmluZy1sYXlvdXQgXCIgKyBsYXlvdXRfY2xhc3MgKyBzZWxlY3RlZF9jbGFzcyArIFwiIG4tXCIgKyB0aGlzLmdldEJ1dHRvbnNDb3VudCgpLnRvU3RyaW5nKCkgfT57IHJlc3VsdCB9PC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlclNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gbWluOyBpZHggPD0gbWF4OyArK2lkeCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCwgaWR4LnRvU3RyaW5nKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSBNYXRoLnJvdW5kKDIgKiBtaW4pOyBpZHggPD0gTWF0aC5yb3VuZCgyICogbWF4KTsgKytpZHgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHggLyAyLCAoaWR4ICUgMikgPyAoaWR4IC8gMikudG9GaXhlZCgxKSA6IE1hdGguZmxvb3IoaWR4IC8gMikudG9TdHJpbmcoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1pbnRlZ2VyLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0QWNyb092ZXJyaWRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9yaWdpbmFsX3ZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kX2RlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbmRfZGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kX2RlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0wLjV9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShNYXRoLm1heCh0aGlzLnByb3BzLnZhbHVlIC0gMC41LCAwKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kX2RlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDAuNX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKE1hdGgubWluKHRoaXMucHJvcHMudmFsdWUgKyAwLjUsIHRoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblplcm8gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSgwKTtcbiAgICB9XG4gICAgb25SZXN0b3JlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHZhbHVlX2NoYW5nZWQgPSBNYXRoLmFicyh0aGlzLnByb3BzLnZhbHVlIC0gdGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1hY3JvLW92ZXJyaWRlLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXplcm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLnZhbHVlIDwgMC4wNSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblplcm8pfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICDihpMwXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXN0b3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdmFsdWVfY2hhbmdlZCA8IDAuMDUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25SZXN0b3JlKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg4oaRXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSA8IHRoaXMucHJvcHMudmFsdWUgKyAwLjA1IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cyl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlX2NoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZS50b0ZpeGVkKDEpfSDihpIgJHt0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbnZhciBzdG9wd2F0Y2hlcyA9IHt9O1xuXG5leHBvcnQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSB8fCB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpcmVjdC1tdXRhdGlvbi1zdGF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSA9IHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIG5vdygpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPyB0aGlzLnN0b3AoKSA6IHRoaXMuc3RhcnQoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuICAgIHRpY2soKSB7XG4gICAgICAgIHZhciBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYWQobnVtLCBzaXplKSB7XG4gICAgICAgIHZhciBzID0gXCIwMDAwXCIgKyBudW0udG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gc2l6ZSk7XG4gICAgfVxuICAgIGdldFN0clZhbHVlKCkge1xuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICB2YXIgbSA9IDAsIHMgPSAwO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XG4gICAgICAgIHJldHVybiBtLnRvU3RyaW5nKCkgKyAnOicgKyB0aGlzLnBhZChzLCAyKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBidG4tdG9nZ2xlIGlnbm9yZS1yZWFkb25seVwiICsgKHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmUgPyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF9zdG9wd2F0Y2hcIikgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=
