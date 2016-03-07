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
                "competition_date": "Дата проведения",
                "competition_name": "Наименование соревнования",
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_clubs": "Включить данные о клубах",
                "include_extended_info": "Включить расширенную информацию",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "include_judges": "Включить данные о судьях",
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

var ConnectionStatus = function (_React$Component2) {
    _inherits(ConnectionStatus, _React$Component2);

    ConnectionStatus.init = function init() {
        var element = window.document.getElementById("connection_status");
        if (element) {
            return ReactDOM.render(React.createElement(ConnectionStatus, null), element);
        }
    };

    function ConnectionStatus(props) {
        _classCallCheck(this, ConnectionStatus);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = {
            "connected": null
        };
        return _this2;
    }

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

    ConnectionStatus.prototype.componentWillUnmount = function componentWillUnmount() {
        this.stopInterval();
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

},{"i10n/loader":11}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGF1dG9fcHJpbnRlclxcbWFpbi5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGRpc2NpcGxpbmVfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXGhlYXRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xccm9zZmFyclxcZGlzY2lwbGluZV9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xccm9zZmFyclxcdG91cl9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhZG1pblxcanVkZ2luZ1xcdG91cl9yZXN1bHRzLmpzeCIsInNyY1xcanN4XFxhdXRvX3ByaW50ZXIuanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcZG9jeC5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFxyb3NmYXJyXFxiYXNlLmpzeCIsInNyY1xcanN4XFxjb21tb25cXHRvb2xzLmpzeCIsInNyY1xcanN4XFxpMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGkxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxccHJpbnRhYmxlLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDYU07Ozs7Ozs7OzttQ0FDRiwyQkFBUzs7O0FBQ0wsZUFBTzs7Y0FBSSxXQUFVLE9BQVYsRUFBSjtZQUNIO0FBQ0ksc0JBQUss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QUFDSSwrQkFBVSxnQ0FBVjttQkFDSSxlQUFlLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBZixFQUZSO2dCQUlNLGVBQUUsZ0NBQUYsQ0FKTjthQURKO1lBT0k7OztBQUNJLCtCQUFZLHFDQUFxQyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFNBQXBCLEdBQWdDLEVBQWhDLENBQXJDO21CQUNSLGVBQWUsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFmLEVBRlI7Z0JBSU0sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixlQUFFLCtCQUFGLENBQXBCLEdBQXlELGVBQUUsZ0NBQUYsQ0FBekQ7YUFYVjtZQWFJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDTSxLQUFLLFdBQUwsRUFETjthQWJKO1NBREosQ0FESzs7O1dBN0VBO0VBQWtCLE1BQU0sU0FBTiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBzaG93Q29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBjbG9uZSB9IGZyb20gXCJjb21tb24vdG9vbHNcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcbmltcG9ydCB7IEhlYXRzQm9keSB9IGZyb20gXCIuLi9qdWRnaW5nL2hlYXRzXCI7XG5pbXBvcnQgeyBUb3VyUmVzdWx0c0JvZHkgfSBmcm9tIFwiLi4vanVkZ2luZy90b3VyX3Jlc3VsdHNcIjtcbmltcG9ydCB7IERpc2NpcGxpbmVSZXN1bHRzIH0gZnJvbSBcIi4uL2p1ZGdpbmcvZGlzY2lwbGluZV9yZXN1bHRzXCI7XG5cblxuY2xhc3MgQXV0b1ByaW50ZXJUYWJsZUNlbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbnB1dFwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyAoZSkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZShwYXJzZUludChlLnRhcmdldC52YWx1ZS5yZXBsYWNlKC9bXlxcZF0vLCBcIlwiKSkgfHwgMCkgfSAvPlxuICAgICAgICA8L3RkPlxuICAgIH1cbn1cblxuY2xhc3MgQXV0b1ByaW50ZXJUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgb25DaGFuZ2UoYWN0aW9uLCBuZXdfdmFsdWUpIHtcbiAgICAgICAgbGV0IG5ld19yb3cgPSBjbG9uZSh0aGlzLnByb3BzLnJvdyk7XG4gICAgICAgIG5ld19yb3dbYWN0aW9uXSA9IG5ld192YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfcm93KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImRpc2NpcGxpbmVcIj57IGAke3RoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLm5hbWV9IOKAlCAke3RoaXMucHJvcHMudG91ci5uYW1lfWAgfTwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMucG9zc2libGVBY3Rpb25zLm1hcCgoYWN0aW9uKSA9PlxuICAgICAgICAgICAgICAgIDxBdXRvUHJpbnRlclRhYmxlQ2VsbFxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBhY3Rpb24gfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMucm93W2FjdGlvbl0gfHwgXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGFjdGlvbikgfSAvPlxuICAgICAgICAgICAgKSB9XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5jbGFzcyBBdXRvUHJpbnRlclRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBvbkNoYW5nZSh0b3VyX2lkLCBuZXdfdmFsdWUpIHtcbiAgICAgICAgbGV0IG5ld19hY3Rpb25zID0gY2xvbmUodGhpcy5wcm9wcy5hY3Rpb25zKTtcbiAgICAgICAgbmV3X2FjdGlvbnNbdG91cl9pZF0gPSBuZXdfdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3X2FjdGlvbnMpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwidG91cnMtdGFibGVcIj48dGJvZHk+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImRpc2NpcGxpbmVcIj57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIuZGlzY2lwbGluZVwiKSB9PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLmhlYXRzXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18xXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18yXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18zXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIuZGlzY2lwbGluZV9yZXN1bHRzXCIpIH08L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3Vycy5tYXAoKHRvdXIpID0+XG4gICAgICAgICAgICAgICAgPEF1dG9QcmludGVyVGFibGVSb3dcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgdG91ci5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0b3VyIH1cbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5hY3Rpb25zW3RvdXIuaWRdIHx8IHt9IH1cbiAgICAgICAgICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zPXsgdGhpcy5wcm9wcy5wb3NzaWJsZUFjdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB0b3VyLmlkKSB9IC8+XG4gICAgICAgICAgICApIH1cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgQXV0b1ByaW50ZXJKb2JRdWV1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcXVldWU6IFtdLFxuICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XG4gICAgfVxuICAgIGFkZEpvYihqb2JfdHlwZSwgdG91ciwgY29waWVzKSB7XG4gICAgICAgIGxldCBuZXdfcXVldWUgPSBjbG9uZSh0aGlzLnN0YXRlLnF1ZXVlKTtcbiAgICAgICAgbmV3X3F1ZXVlLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogam9iX3R5cGUsXG4gICAgICAgICAgICB0b3VyOiB0b3VyLFxuICAgICAgICAgICAgY29waWVzOiBjb3BpZXMsXG4gICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IG5ld19xdWV1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNjaGVkdWxlSm9iKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc0pvYigpLCAxMDAwKTtcbiAgICB9XG4gICAgcHJvY2Vzc0pvYigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubm93UmVuZGVyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGpvYiA9IHRoaXMuc3RhdGUucXVldWVbMF07XG4gICAgICAgIGlmICgham9iKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQodGhpcy5yZXRyeUpvYi5iaW5kKHRoaXMpLCAxMDAwMCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IHRoaXMuc3RhdGUucXVldWUuc2xpY2UoMSksXG4gICAgICAgICAgICBub3dSZW5kZXJpbmc6IGpvYixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHJ5Sm9iKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiBbdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmddLmNvbmNhdCh0aGlzLnN0YXRlLnF1ZXVlKSxcbiAgICAgICAgICAgIG5vd1JlbmRlcmluZzogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVKb2IoKTtcbiAgICB9XG4gICAgY29udGludWVKb2IoZmlsZW5hbWUpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBqb2IgPSB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZztcbiAgICAgICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gYGh0dHA6Ly8xMjcuMC4wLjE6NTk0OS9wcmludC1kb2N4P2ZpbGVuYW1lPSR7IGZpbGVuYW1lIH0mY29waWVzPSR7IGpvYi5jb3BpZXMgfWA7XG4gICAgICAgICAgICB4aHIub3BlbihcIkdFVFwiLCBhZGRyZXNzLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7fTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4gdGhpcy5hZGRKb2Ioam9iLnR5cGUsIGpvYi50b3VyLCBqb2IuY29waWVzKTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBub3dSZW5kZXJpbmc6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVKb2IoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICAgIGNyZWF0ZUZpbGVuYW1lKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnJlcGxhY2UoL1teMC05XS8sIFwiXCIpICsgXCIudG1wXCI7XG4gICAgfVxuICAgIHJlbmRlckFjdGl2ZUpvYigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLm5vd1JlbmRlcmluZykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLm5vd1JlbmRlcmluZy50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJoZWF0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxIZWF0c0JvZHlcbiAgICAgICAgICAgICAgICB0b3VyX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5pZH1cbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXzFcIjpcbiAgICAgICAgICAgIHJldHVybiA8VG91clJlc3VsdHNCb2R5XG4gICAgICAgICAgICAgICAgdG91cl9pZD17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nLnRvdXIuaWR9XG4gICAgICAgICAgICAgICAgdmVyYm9zaXR5PVwiMVwiXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9e3sgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgY2FsbGJhY2s6IHRoaXMuY29udGludWVKb2IuYmluZCh0aGlzKSB9fSAvPlxuICAgICAgICBjYXNlIFwicmVzdWx0c18yXCI6XG4gICAgICAgICAgICByZXR1cm4gPFRvdXJSZXN1bHRzQm9keVxuICAgICAgICAgICAgICAgIHRvdXJfaWQ9eyB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZy50b3VyLmlkfVxuICAgICAgICAgICAgICAgIHZlcmJvc2l0eT1cIjJcIlxuICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXt7IGZpbGVuYW1lOiB0aGlzLmNyZWF0ZUZpbGVuYW1lKCksIGNhbGxiYWNrOiB0aGlzLmNvbnRpbnVlSm9iLmJpbmQodGhpcykgfX0gLz5cbiAgICAgICAgY2FzZSBcInJlc3VsdHNfM1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxUb3VyUmVzdWx0c0JvZHlcbiAgICAgICAgICAgICAgICB0b3VyX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5pZH1cbiAgICAgICAgICAgICAgICB2ZXJib3NpdHk9XCIzXCJcbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGNhc2UgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2lkPXsgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudG91ci5kaXNjaXBsaW5lLmlkIH1cbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGNhc2UgXCJ0ZXN0XCI6XG4gICAgICAgICAgICByZXR1cm4gPEF1dG9QcmludGVyVGVzdFBhZ2VcbiAgICAgICAgICAgICAgICBhdXRvRG9jeD17eyBmaWxlbmFtZTogdGhpcy5jcmVhdGVGaWxlbmFtZSgpLCBjYWxsYmFjazogdGhpcy5jb250aW51ZUpvYi5iaW5kKHRoaXMpIH19IC8+XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBqb2IgdHlwZTpcIiwgdGhpcy5zdGF0ZS5ub3dSZW5kZXJpbmcudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJxdWV1ZSBxdWV1ZS1lbXB0eVwiPlxuICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5xdWV1ZV9lbXB0eVwiKSB9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBY3RpdmVKb2IoKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJxdWV1ZVwiPlxuICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnF1ZXVlLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGtleT17IGl0ZW0uaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGl0ZW0udHlwZSA9PT0gXCJ0ZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIudGVzdF9wYWdlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtpdGVtLnRvdXIuZGlzY2lwbGluZS5uYW1lfSDigJQgJHtpdGVtLnRvdXIubmFtZX1gIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLlwiICsgaXRlbS50eXBlKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcGllc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpdGVtLmNvcGllcyB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQWN0aXZlSm9iKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1dG9QcmludGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGFjdGlvbnM6IHt9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLlNDSEVNQSA9IHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgdG91cnM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5QT1NTSUJMRV9BQ1RJT05TID0gW1wiaGVhdHNcIiwgXCJyZXN1bHRzXzFcIiwgXCJyZXN1bHRzXzJcIiwgXCJyZXN1bHRzXzNcIiwgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIl07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJlbG9hZF9kYXRhX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9kYXRhX2xpc3RlbmVyKTtcbiAgICB9XG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLmdldFwiLCB7IGNvbXBldGl0aW9uX2lkOiB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkLCBjaGlsZHJlbjogdGhpcy5TQ0hFTUEgfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiQ29tcGV0aXRpb25cIiwgdGhpcy5wcm9wcy5jb21wZXRpdGlvbl9pZClcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgIGxldCBuZXdfY29tcGV0aXRpb24gPSBzdG9yYWdlLmdldChcIkNvbXBldGl0aW9uXCIpLmJ5X2lkKHRoaXMucHJvcHMuY29tcGV0aXRpb25faWQpO1xuICAgICAgICBpZiAoIW5ld19jb21wZXRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5ld19jb21wZXRpdGlvbiA9IG5ld19jb21wZXRpdGlvbi5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wZXRpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaENvbXBldGl0aW9uVXBkYXRlKHRoaXMuc3RhdGUuY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogbmV3X2NvbXBldGl0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpbnRUZXN0UGFnZSgpIHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcImFkbWluLmF1dG9fcHJpbnRlci5wcmludF90ZXN0X3BhZ2VcIiksICgpID0+IHtcbiAgICAgICAgICAgIHNhdmVBcyhuZXcgQmxvYihbXCJkdW1teVwiXSwge3R5cGUgOiAndGV4dC9wbGFpbid9KSwgYGR1bW15XyR7TWF0aC5yYW5kb20oKX0udG1wYCk7XG4gICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBkdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xuICAgICAgICAgICAgc2F2ZUFzKG5ldyBCbG9iKFtcImR1bW15XCJdLCB7dHlwZSA6ICd0ZXh0L3BsYWluJ30pLCBgZHVtbXlfJHtNYXRoLnJhbmRvbSgpfS50bXBgKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5xdWV1ZS5hZGRKb2IoXCJ0ZXN0XCIsIG51bGwsIDEpO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0VG91cnNGcm9tQ29tcGV0aXRpb24oY29tcGV0aXRpb24pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBjb21wZXRpdGlvbi5kaXNjaXBsaW5lcy5mb3JFYWNoKChkaXNjaXBsaW5lKSA9PlxuICAgICAgICAgICAgZGlzY2lwbGluZS50b3Vycy5mb3JFYWNoKCh0b3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSBjbG9uZSh0b3VyKTtcbiAgICAgICAgICAgICAgICByLmRpc2NpcGxpbmUgPSBkaXNjaXBsaW5lO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHIpO1xuICAgICAgICAgICAgfSApXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZ2V0VG91cnNNYXAodG91cnMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICB0b3Vycy5mb3JFYWNoKCh0b3VyKSA9PiByZXN1bHRbdG91ci5pZF0gPSB0b3VyKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZGlzcGF0Y2hDb21wZXRpdGlvblVwZGF0ZShvbGRfY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbikge1xuICAgICAgICBsZXQgb2xkX3RvdXJzID0gdGhpcy5nZXRUb3Vyc01hcCh0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKG9sZF9jb21wZXRpdGlvbikpO1xuICAgICAgICBsZXQgbmV3X3RvdXJzID0gdGhpcy5nZXRUb3Vyc01hcCh0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKG5ld19jb21wZXRpdGlvbikpO1xuICAgICAgICBPYmplY3Qua2V5cyhvbGRfdG91cnMpLmZvckVhY2goKHRvdXJfaWQpID0+IHtcbiAgICAgICAgICAgIGlmICghbmV3X3RvdXJzW3RvdXJfaWRdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvbGRfdG91cnNbdG91cl9pZF0uZmluYWxpemVkICYmIG5ld190b3Vyc1t0b3VyX2lkXS5maW5hbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQWN0aW9uc0ZvclRvdXIobmV3X3RvdXJzW3RvdXJfaWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5leHRUb3VyKHRvdXIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGUuY29tcGV0aXRpb24uZGlzY2lwbGluZXMuZm9yRWFjaCgoZGlzY2lwbGluZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBkaXNjaXBsaW5lLnRvdXJzLmZvckVhY2goKGRfdG91cikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkX3RvdXIuaWQgPT09IHRvdXIuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHIgPSBjbG9uZShkX3RvdXIpO1xuICAgICAgICAgICAgICAgICAgICByLmRpc2NpcGxpbmUgPSBkaXNjaXBsaW5lO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gKVxuICAgICAgICB9IClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZG9UaGVKb2IodG91ciwgYWN0aW9uX3R5cGUsIGNvcGllcykge1xuICAgICAgICBpZiAoYWN0aW9uX3R5cGUgPT09IFwiaGVhdHNcIikge1xuICAgICAgICAgICAgdG91ciA9IHRoaXMuZ2V0TmV4dFRvdXIodG91cik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b3VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZzLnF1ZXVlLmFkZEpvYihhY3Rpb25fdHlwZSwgdG91ciwgY29waWVzKTtcbiAgICB9XG4gICAgZG9BY3Rpb25zRm9yVG91cih0b3VyKSB7XG4gICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5zdGF0ZS5hY3Rpb25zW3RvdXIuaWRdO1xuICAgICAgICBpZiAoIWFjdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlBPU1NJQkxFX0FDVElPTlMuZm9yRWFjaCgoYWN0aW9uX3R5cGUpID0+IHtcbiAgICAgICAgICAgIGlmIChhY3Rpb25zW2FjdGlvbl90eXBlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9UaGVKb2IodG91ciwgYWN0aW9uX3R5cGUsIGFjdGlvbnNbYWN0aW9uX3R5cGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5jb21wZXRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRvLXByaW50ZXJcIj5cbiAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgPGgxPnsgXyhcImFkbWluLmhlYWRlcnMuYXV0b19wcmludGVyXCIpIH08L2gxPlxuICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJ1bGVzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8QXV0b1ByaW50ZXJUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cnM9eyB0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKHRoaXMuc3RhdGUuY29tcGV0aXRpb24pIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM9eyB0aGlzLnN0YXRlLmFjdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyAobmV3X2FjdGlvbnMpID0+IHRoaXMuc2V0U3RhdGUoeyBhY3Rpb25zOiBuZXdfYWN0aW9ucyB9KSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZUFjdGlvbnM9eyB0aGlzLlBPU1NJQkxFX0FDVElPTlMgfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi1xdWV1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnF1ZXVlXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8QXV0b1ByaW50ZXJKb2JRdWV1ZSByZWY9XCJxdWV1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdC1wYWdlLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17IHRoaXMucHJpbnRUZXN0UGFnZS5iaW5kKHRoaXMpIH0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg0J/QtdGH0LDRgtGMINGC0LXRgdGC0L7QstC+0Lkg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgQXV0b1ByaW50ZXJUZXN0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICB9XG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgcmV0dXJuIDxkaXYgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgPHA+eyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnRlc3RfdGV4dFwiKSB9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgY3JlYXRlRG9jeChmaWxlbmFtZT1cInRvdXItcmVzdWx0cy5kb2N4XCIpIHtcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcbiAgICAgICAgICAgIC5zZXRCb2R5KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jb250ZW50KS5pbm5lckhUTUwpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcblxuaW1wb3J0IHtcbiAgICBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxuICAgIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUsXG4gICAgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlLFxufSBmcm9tIFwiLi9yb3NmYXJyL2Rpc2NpcGxpbmVfcmVzdWx0c1wiO1xuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzaWduYWwobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gKCgpID0+IHRoaXMucHJvcHMub25TaWduYWwobWVzc2FnZSkpLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyB0aGlzLnNpZ25hbChcImRvY3hcIikgfT5cbiAgICAgICAgICAgICAgICBET0NYXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW5kZXJlcjogXCJwYWdlXCIsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ydW5zX2xvYWRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwiZGlzY2lwbGluZV9yZXN1bHRzX1wiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZFN0YXRlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0b3VyX3N0b3JhZ2UgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKS5ieV9pZChtZXNzYWdlW1widG91cl9pZFwiXSk7XG4gICAgICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuZGlzY2lwbGluZS5pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzLnByaW50YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4LmNhbGxiYWNrKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyKTtcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJkaXNjaXBsaW5lX3Jlc3VsdHNfXCIgKyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQpO1xuICAgIH1cbiAgICByZWxvYWRTdGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmRpc2NpcGxpbmVfcmVzdWx0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5ydW5zX2xvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdG9yYWdlX3J1bnMgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiUnVuXCIpXG4gICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX3Jlc3VsdHM7XG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBbXVxuICAgICAgICB2YXIgU0NIRU1BID0ge1xuICAgICAgICAgICAgdG91cjoge30sXG4gICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgIHNwb3J0c21lbjoge30sXG4gICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbmV3X3N0YXRlLnB1c2goe1xuICAgICAgICAgICAgICAgIHBsYWNlOiByZXN1bHRzW2ldLnBsYWNlLFxuICAgICAgICAgICAgICAgIHJ1bjogc3RvcmFnZV9ydW5zLmJ5X2lkKHJlc3VsdHNbaV0ucnVuX2lkKS5zZXJpYWxpemUoU0NIRU1BKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbG9hZGVkOiB0cnVlLFxuICAgICAgICAgICAgdGFibGU6IG5ld19zdGF0ZSxcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHRoaXMuc3RvcmFnZS5nZXQoXCJEaXNjaXBsaW5lXCIpLmJ5X2lkKHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCkuc2VyaWFsaXplKHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWRSZXN1bHRzKCkge1xuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldF9yZXN1bHRzXCIsIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uU3VjY2VzcyhyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX3Jlc3VsdHM6IHJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZFN0YXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldFwiLCB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQsXG4gICAgICAgICAgICBjaGlsZHJlbjoge1xuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgICAgICB0b3Vyczoge1xuICAgICAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFkZFRvREIoXCJEaXNjaXBsaW5lXCIsIHRoaXMucHJvcHMuZGlzY2lwbGluZV9pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucnVuc19sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRTdGF0ZSh0aGlzKVxuICAgICAgICB9KVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cblxuICAgIC8vIExpc3RlbmVyc1xuXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbmRlcmluZ1xuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnJlbmRlcmVyKSB7XG4gICAgICAgIGNhc2UgXCJwcmVzZW50ZXJcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSByZWY9XCJtYWluX3RhYmxlXCIgLz5cbiAgICAgICAgY2FzZSBcInNjcmVlbl9vcGVyYXRvclwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGVcbiAgICAgICAgICAgICAgICB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGxhY2U9eyB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfVxuICAgICAgICAgICAgICAgIG9uUGxhY2VTZWxlY3Q9eyB0aGlzLnByb3BzLm9uUGxhY2VTZWxlY3QgfVxuICAgICAgICAgICAgICAgIHJlZj1cIm1haW5fdGFibGVcIiAvPlxuICAgICAgICBjYXNlIFwicGFnZVwiOlxuICAgICAgICAgICAgcmV0dXJuIDxQcmludGFibGVcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSB9XG4gICAgICAgICAgICAgICAgdGl0bGUzPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgICAgIGJvZHk9eyA8RGlzY2lwbGluZVJlc3VsdHNUYWJsZSB0YWJsZT17IHRoaXMuc3RhdGUudGFibGUgfSAvPiB9IC8+XG4gICAgICAgIGNhc2UgXCJ0YWJsZVwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIHRhYmxlPXsgdGhpcy5zdGF0ZS50YWJsZSB9IHJlZj1cIm1haW5fdGFibGVcIiAvPlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmxvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+PExvYWRlciAvPjwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlKVxuICAgICAgICAgICAgLnNldFRpdGxlMShfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikpXG4gICAgICAgICAgICAuc2V0VGl0bGUzKHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lKVxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5yZWZzLnByaW50YWJsZS5mZXRjaFByaW50YWJsZURhdGEoKSlcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3VyLW5hbWVcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwicGFkZGluZ1wiLCBcIjBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zcG9ydHNtZW5cIiwgXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgIC5zYXZlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBIZWF0c0J1dHRvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHNpZ25hbChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17IHRoaXMuc2lnbmFsKFwiZG9jeFwiKSB9PlxuICAgICAgICAgICAgICAgIERPQ1hcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBIZWF0c0JvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZS5nZXREb21haW4oXCJoZWF0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hdXRvRG9jeCkge1xuICAgICAgICAgICAgbGV0IGludGVydmFsX2lkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZnMucHJpbnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJoZWF0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgU0NIRU1BID0ge1xuICAgICAgICAgICAgZGlzY2lwbGluZToge1xuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VyaWFsaXplZCA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy50b3VyX2lkKVxuICAgICAgICAgICAgLnNlcmlhbGl6ZShTQ0hFTUEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRvdXI6IHNlcmlhbGl6ZWQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyX2lkLFxuICAgICAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMucHJvcHMudG91cl9pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgb25TaWduYWwobWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJIZWF0SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xuICAgICAgICBsZXQgbmVlZF9yZW5kZXIgPSAodHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiKSB8fCAocHJldl9yb3cuaGVhdCAhPT0gbmV4dF9yb3cuaGVhdClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIkhcIiArIG5leHRfcm93LmhlYXQgfT48dGggY2xhc3NOYW1lPVwiaGVhdC1udW1iZXJcIiBjb2xTcGFuPVwiM1wiPlxuICAgICAgICAgICAgPHA+eyBfKFwiZ2xvYmFsLnBocmFzZXMuaGVhdF9uXCIsIG5leHRfcm93LmhlYXQpIH08L3A+XG4gICAgICAgIDwvdGg+PC90cj47XG5cbiAgICB9XG4gICAgcmVuZGVySGVhdFJvdyhyb3cpIHtcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIlJcIiArIHJvdy5pZCB9PlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyByb3cucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZD48cD57IHJvdy5wYXJ0aWNpcGFudC5uYW1lIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZD48cD57IHJvdy5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfTwvcD48L3RkPlxuICAgICAgICA8L3RyPjtcbiAgICB9XG4gICAgcmVuZGVySGVhdFJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0aGlzLnN0YXRlLnRvdXIucnVucztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydW5zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJIZWF0SGVhZGVyKHJ1bnNbaSAtIDFdLCBydW5zW2ldKTtcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJIZWF0Um93KHJ1bnNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gPExvYWRlciAvPlxuICAgICAgICB9XG4gICAgICAgIGxldCBib2R5ID0gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLWhlYXRzXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj48dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+PHA+eyBfKFwianVkZ2luZy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPjxwPnsgXyhcImp1ZGdpbmcubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+PHA+eyBfKFwianVkZ2luZy5sYWJlbHMuY2x1YlwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+PHRib2R5PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWF0Um93cygpIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+O1xuICAgICAgICByZXR1cm4gPFByaW50YWJsZVxuICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxuICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMudG91cl9oZWF0c1wiKSB9XG4gICAgICAgICAgICB0aXRsZTI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUudG91ci5uYW1lIH1cbiAgICAgICAgICAgIGJvZHk9eyBib2R5IH1cbiAgICAgICAgICAgIHJlZj1cInByaW50YWJsZVwiIC8+XG4gICAgfVxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0b3VyLWhlYXRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9oZWF0c1wiKSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXG4gICAgICAgICAgICAuc2V0Qm9keSh0aGlzLnJlZnMucHJpbnRhYmxlLmZldGNoUHJpbnRhYmxlRGF0YSgpKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmhlYXQtbnVtYmVyXCIsIFwiYmFja2dyb3VuZFwiLCBcIiNjY2NcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWF0LW51bWJlclwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCJ0ZCwgdGhcIiwgXCJmb250LXNpemVcIiwgXCIxMnB0XCIpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IG9uVG91Y2hFbmRPckNsaWNrIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XG5cblxuZnVuY3Rpb24gX18oKSB7XG4gICAgbGV0IGFyZ3MgPSBbXTtcbiAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xuICAgIH1cbiAgICByZXR1cm4gXyhcInNjb3Jpbmdfc3lzdGVtcy5yb3NmYXJyLlwiICsgYXJndW1lbnRzWzBdLCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIkhcIiArIG5leHRfcm93LnJ1bi5pZCB9Pjx0aCBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBjb2xTcGFuPVwiNlwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IG5leHRfcm93LnJ1bi50b3VyLm5hbWUgfTwvcD5cbiAgICAgICAgPC90aD48L3RyPjtcbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdykge1xuICAgICAgICBsZXQgcCA9IHJvdy5ydW4ucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJSXCIgKyByb3cucnVuLmlkIH0+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IHBsYWNlXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHJvdy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOiByb3cucGxhY2UgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgcC5udW1iZXIgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzZcIiBjb2xTcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzcG9ydHNtZW5cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHsgcC5mb3JtYXRpb25fbmFtZSA/IDx0cj48dGggY29sU3Bhbj1cIjJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IHAuZm9ybWF0aW9uX25hbWUgfTwvcD48L3RoPjwvdHI+IDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgIHsgcC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+IDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTc1XCI+PHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLmxhc3RfbmFtZSArIFwiIFwiICsgcy5maXJzdF9uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHMuc3Vic3RpdHV0ZSA/IDxpPiAoeyBfKFwiYWRtaW4ubGFiZWxzLnN1YlwiKSB9Lik8L2k+IDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHMueWVhcl9vZl9iaXJ0aCB9PC9wPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+ICkgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjbHViXCI+PHA+eyBwLmNsdWIubmFtZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjb2FjaGVzXCI+PHA+eyBwLmNvYWNoZXMuc3BsaXQoXCIsXCIpLm1hcCgoYykgPT4gW2MudHJpbSgpLCA8YnIga2V5PVwiWFwiIC8+XSkgfTwvcD48L3RkPlxuICAgICAgICA8L3RyPjtcbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSAtIDFdLCB0YWJsZVtpXSk7XG4gICAgICAgICAgICBoZWFkZXIgJiYgcmVzdWx0LnB1c2goaGVhZGVyKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yN1wiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5cIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOVwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jbHViXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NvYWNoZXNcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cblxuY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2dnbGVBY3RpdmUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiAhdGhpcy5zdGF0ZS5hY3RpdmUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wcm9wcy5wYXJ0aWNpcGFudDtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnRvZ2dsZUFjdGl2ZS5iaW5kKHRoaXMpKX0+PHRib2R5PlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIzXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57IHRoaXMucHJvcHMucGxhY2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibmFtZVwiPnsgcC5uYW1lIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiIGNvbFNwYW49XCIyXCI+eyBwLmNsdWIubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNvYWNoZXNcIiBjb2xTcGFuPVwiMlwiPnsgcC5jb2FjaGVzIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzUHJlc2VudGVyVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT5cbiAgICAgICAgICAgIHsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJSb3cocm93KSB7XG4gICAgICAgIHJldHVybiA8RGlzY2lwbGluZVJlc3VsdHNQcmVzZW50ZXJUYWJsZVJvdyBrZXk9eyBcIlJcIiArIHJvdy5ydW4uaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ9eyByb3cucnVuLnBhcnRpY2lwYW50IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlPXsgcm93LnBsYWNlIH0gLz5cbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gdGFibGUubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpICsgMV0sIHRhYmxlW2ldKTtcbiAgICAgICAgICAgIGhlYWRlciAmJiByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNTY3JlZW5PcGVyYXRvclRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wcm9wcy5wYXJ0aWNpcGFudDtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9eyBcInJvd1wiICsgKCB0aGlzLnByb3BzLnNlbGVjdGVkID8gXCIgc2VsZWN0ZWRcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy5wcm9wcy5vbkNsaWNrKX0+PHRib2R5PlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHJvd1NwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57IHRoaXMucHJvcHMucGxhY2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2UtbGFiZWxcIj57IF8oXCJwcmVzZW50ZXIubGFiZWxzLnBsYWNlXCIpIH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+eyBwLm51bWJlciB9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibmFtZVwiPnsgcC5uYW1lIH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiIGNvbFNwYW49XCIyXCI+eyBwLmNsdWIubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1NjcmVlbk9wZXJhdG9yVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgbGV0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LnJ1bi50b3VyLmlkICE9PSBuZXh0X3Jvdy5ydW4udG91ci5pZClcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCIga2V5PXsgXCJIXCIgKyBuZXh0X3Jvdy5ydW4uaWQgfT5cbiAgICAgICAgICAgIHsgbmV4dF9yb3cucnVuLnRvdXIubmFtZSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJSb3cocm93LCBwbGFjZSkge1xuICAgICAgICByZXR1cm4gPERpc2NpcGxpbmVSZXN1bHRzU2NyZWVuT3BlcmF0b3JUYWJsZVJvd1xuICAgICAgICAgICAga2V5PXsgXCJSXCIgKyByb3cucnVuLmlkIH1cbiAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcm93LnJ1bi5wYXJ0aWNpcGFudCB9XG4gICAgICAgICAgICBwbGFjZT17IHJvdy5wbGFjZSB9XG4gICAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gdGhpcy5wcm9wcy5vblBsYWNlU2VsZWN0KHBsYWNlKSB9XG4gICAgICAgICAgICBzZWxlY3RlZD17IHRoaXMucHJvcHMuc2VsZWN0ZWRQbGFjZSAhPT0gbnVsbCAmJiBwbGFjZSA+PSB0aGlzLnByb3BzLnNlbGVjdGVkUGxhY2UgfSAvPlxuICAgIH1cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XG4gICAgICAgIGZvciAobGV0IGkgPSB0YWJsZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgKyAxXSwgdGFibGVbaV0pO1xuICAgICAgICAgICAgaGVhZGVyICYmIHJlc3VsdC5wdXNoKGhlYWRlcik7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSwgaSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IFRvdXJTY29yZXNXcmFwcGVyLCBnZXRQYXJ0aWNpcGFudERpc3BsYXksIGdldFNjb3JpbmdUeXBlIH0gZnJvbSBcImNvbW1vbi9yb3NmYXJyL2Jhc2VcIjtcblxuXG5mdW5jdGlvbiBfXygpIHtcbiAgICBsZXQgYXJncyA9IFtdO1xuICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XG4gICAgfVxuICAgIHJldHVybiBfKFwic2NvcmluZ19zeXN0ZW1zLnJvc2ZhcnIuXCIgKyBhcmd1bWVudHNbMF0sIC4uLmFyZ3MpO1xufVxuXG5jbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZUNvbHVtbldpZHRocyB7XG4gICAgY29uc3RydWN0b3Iobl9qdWRnZXMpIHtcbiAgICAgICAgdGhpcy5qdWRnZV93aWR0aCA9IE1hdGgucm91bmQoNzAgLyBuX2p1ZGdlcyk7XG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA3XG4gICAgICAgIHRoaXMuaW5mb193aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtIHRoaXMucGxhY2Vfd2lkdGg7XG4gICAgfVxuICAgIGdlblBsYWNlU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wbGFjZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5JbmZvU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5pbmZvX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5qdWRnZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGZvcm1hdFNjb3JlKHNjb3JlLCB0ZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IFwiJFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29yZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxzcGFuPiZtZGFzaDs8L3NwYW4+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoXCIkXCIsIHNjb3JlKS5yZXBsYWNlKFwiQFwiLCBzY29yZS50b0ZpeGVkKDEpKTtcbiAgICB9XG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX3RlY2gsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEubWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvcD48L3RkPjwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG4gICAgcmVuZGVyRm9ybWF0aW9uQWNyb1Njb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5hXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmFjcm9iYXRpY3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX3RlY2gsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLnNtYWxsX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnBcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBhZGRpdGlvbGFsX2RhdGEucGxhY2VzW3Njb3JlLmlkXSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJEYW5jZVNjb3JlKHNjb3JlKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZndcIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZndfd29tYW4sIFwiLSQlXCIpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZndfbWFuLCBcIi0kJVwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uY1wiKSAgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuY29tcG9zaXRpb24pIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uc21cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuc21hbGxfbWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuYmlnX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxuICAgIHJlbmRlckFjcm9TY29yZShzY29yZSkge1xuICAgICAgICBsZXQgYWNyb19zY29yZXMgPSBzY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMubWFwKGZ1bmN0aW9uKHNjb3JlLCBpZHgpIHtcbiAgICAgICAgICAgIHJldHVybiA8dHIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgPHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5hY3JvX25cIiwgaWR4ICsgMSkgfTo8L3A+PC90aD5cbiAgICAgICAgICAgICAgICA8dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLCBcIi0kJVwiKSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgIHsgYWNyb19zY29yZXMgfVxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZmRcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxuICAgIHJlbmRlclNjb3JlKGp1ZGdlLCBzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XG4gICAgICAgIHN3aXRjaCAoZ2V0U2NvcmluZ1R5cGUoanVkZ2UsIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSkge1xuICAgICAgICBjYXNlIFwiZGFuY2VcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRhbmNlU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvbkFjcm9TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH08L3A+O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlclBhcnRpY2lwYW50SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8cD48c3Ryb25nPnsgXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoXG4gICAgICAgICAgICApfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgIHsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50KSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBlbmFsdHlcIikgfTogPC9zdHJvbmc+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZSA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj4gfTwvcD5cbiAgICB9XG4gICAgcmVuZGVyQWNyb1RhYmxlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhhc19hY3JvX292ZXJyaWRlcyA9IGZhbHNlO1xuICAgICAgICBsZXQgcmVuZGVyX2Fjcm9fdGFibGUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFjcm9cIiB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCI7XG4gICAgICAgIGlmICghcmVuZGVyX2Fjcm9fdGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MuZm9yRWFjaChmdW5jdGlvbihhY3JvKSB7XG4gICAgICAgICAgICBpZiAoYWNyby5zY29yZSAhPT0gYWNyby5vcmlnaW5hbF9zY29yZSkge1xuICAgICAgICAgICAgICAgIGhhc19hY3JvX292ZXJyaWRlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhY3JvX2NlbGxfd2lkdGggPSAoMTAwIC8gdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5sZW5ndGgpICsgXCIlXCI7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPHA+PHN0cm9uZz57IGhhc19hY3JvX292ZXJyaWRlcyA/IF9fKFwicmVzdWx0cy5sYWJlbHMuYWNyb2JhdGljc192ZXJib3NlXCIpIDogX18oXCJyZXN1bHRzLmxhYmVscy5hY3JvYmF0aWNzXCIpIH06PC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImFjcm8tdGFibGVcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyPntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT4gPHRkIGtleT17IGlkeCB9IHN0eWxlPXt7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfX0+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5vcmlnaW5hbF9zY29yZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+KVxuICAgICAgICAgICAgICAgIH08L3RyPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzX2Fjcm9fb3ZlcnJpZGVzID8gPHRyPntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17eyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH19PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLnNjb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+KVxuICAgICAgICAgICAgICAgICAgICB9PC90cj4gOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyQW1DbGFzc0Z3U2NvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLmZ3X3Njb3JlXCIpIH08L3N0cm9uZz46IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgKyBcIiAvIFwiICtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICB9IDwvcD5cbiAgICB9XG4gICAgcmVuZGVyQW1DbGFzc0Fjcm9TY29yZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLmFjcm9fc2NvcmVcIikgfTwvc3Ryb25nPjoge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpICsgXCIgLyBcIiArXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICB9IDwvcD5cbiAgICB9XG4gICAgcmVuZGVyVG90YWxTY29yZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHA+PHN0cm9uZz57IF9fKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfTogeyB0aGlzLnByb3BzLnJ1bi50b3RhbF9zY29yZSB9PC9zdHJvbmc+PC9wPjtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48ZW0+XG4gICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMubm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgIDwvZW0+PC9wPlxuICAgIH1cbiAgICByZW5kZXJOZXh0VG91ckxhYmVsKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaGFzX25leHRfdG91cikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgPHA+PHN0cm9uZz57IF9fKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpIH06IDwvc3Ryb25nPntcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVzdWx0c19pbmZvLmFkdmFuY2VzID8gXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpIDogXyhcImdsb2JhbC5sYWJlbHMubm9cIilcbiAgICAgICAgfTwvcD5cbiAgICB9XG4gICAgcmVuZGVySW5mb0Jsb2NrKCkge1xuICAgICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT1cImluZm8tYmxvY2tcIiBzdHlsZT17IHRoaXMucHJvcHMud2lkdGhzLmdlbkluZm9TdHlsZSgpIH0+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydGljaXBhbnRJbmZvKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRKdWRnZVBlbmFsdHkoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQWNyb1RhYmxlKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NGd1Njb3JlKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVG90YWxTY29yZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb3RQZXJmb3JtZWRMYWJlbCgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0VG91ckxhYmVsKCkgfVxuICAgICAgICA8L3RkPlxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlKHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZXNbaWR4XSwgc2NvcmUsIHRoaXMucHJvcHMucmVzdWx0c19pbmZvLmFkZGl0aW9uYWxfZGF0YSkgfVxuICAgICAgICAgICAgPC90ZD4pO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5KdWRnZVN0eWxlKCkgfSBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjwvdGQ+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5QbGFjZVN0eWxlKCkgfT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8ucGxhY2UgfTwvcD5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySW5mb0Jsb2NrKCkgfVxuICAgICAgICAgICAgeyBqdWRnZXNfc2NvcmVzIH1cbiAgICAgICAgPC90cj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VzID0gdG91cl93cmFwcGVyLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xuICAgICAgICBsZXQgc2NvcmVzX3RhYmxlID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGxldCByb3dzID0gW107XG4gICAgICAgIGxldCB3aWR0aHMgPSBuZXcgVG91clJlc3VsdHNWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMoZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlUm93XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuc1tpZHhdLmlkIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxuICAgICAgICAgICAgICAgIHNjb3Jlcz17IHNjb3Jlc190YWJsZVtpZHhdIH1cbiAgICAgICAgICAgICAgICB3aWR0aHM9eyB3aWR0aHMgfVxuICAgICAgICAgICAgICAgIGhlYWRfanVkZ2Vfc2NvcmU9eyBoZWFkX2p1ZGdlX3Njb3Jlc1tpZHhdIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm89eyByZXN1bHRzX2luZm9baWR4XSB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM9eyBkaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgaGFzX25leHRfdG91cj17IGhhc19uZXh0X3RvdXIgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGp1ZGdlc19oZWFkZXIgPSBkaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZnVuY3Rpb24oZGopIHtcbiAgICAgICAgICAgIHJldHVybiA8dGgga2V5PXsgZGouaWQgfSB3aWR0aD17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT48cD57IGRqLmp1ZGdlLm51bWJlciB9PC9wPjwvdGg+XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCIgc3R5bGU9e3sgd2lkdGg6IFwiMTAwJVwiIH19PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgd2lkdGg9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgd2lkdGg9eyB3aWR0aHMuZ2VuSW5mb1N0eWxlKCkgfT48cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgX18oXCJyZXN1bHRzLmxhYmVscy5pbmZvXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIHsganVkZ2VzX2hlYWRlciB9XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgeyByb3dzIH1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgfVxufVxuXG5jbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMge1xuICAgIGNvbnN0cnVjdG9yKG5fanVkZ2VzKSB7XG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDU1IC8gbl9qdWRnZXMpO1xuICAgICAgICB0aGlzLnRvdGFsX3Njb3JlX3dpZHRoID0gMTQ7XG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA2O1xuICAgICAgICB0aGlzLm51bWJlcl93aWR0aCA9IDM7XG4gICAgICAgIHRoaXMubmFtZV93aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtXG4gICAgICAgICAgICB0aGlzLnRvdGFsX3Njb3JlX3dpZHRoIC0gdGhpcy5wbGFjZV93aWR0aCAtIHRoaXMubnVtYmVyX3dpZHRoO1xuICAgIH1cbiAgICBnZW5QbGFjZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuTnVtYmVyU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5udW1iZXJfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuTmFtZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubmFtZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5Ub3RhbFNjb3JlU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy50b3RhbF9zY29yZV93aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5KdWRnZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48c3Ryb25nPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvc3Ryb25nPiAoeyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMSkgfSk8L3A+XG4gICAgfVxuICAgIHJlbmRlclNjb3JlKGp1ZGdlLCBzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XG4gICAgICAgIGlmIChqdWRnZS5yb2xlID09PSBcImRhbmNlX2p1ZGdlXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiIHx8IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfTwvcD47XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTY29yZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2VzW2lkeF0sIHNjb3JlLCB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZGRpdGlvbmFsX2RhdGEpXG4gICAgICAgIH0gPC90ZD4pO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjwvdGQ+KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlO1xuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucmVzdWx0c19pbmZvLnBsYWNlIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiPnsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50KSB9PC90ZD5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJcbiAgICAgICAgICAgICAgICA/IDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICB7ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPiZtZGFzaDs8L3A+O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgX18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZV9zaG9ydFwiKSB9e1wiOiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfXtcIiAvIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH08YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9lbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57IHRvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOy97XCIgXCJ9eyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+eyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOy97XCIgXCJ9eyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+O1xuICAgICAgICAgICAgICAgICAgICB9KSgpIH1cbiAgICAgICAgICAgICAgICA8L3RkPiA6IG51bGwgfVxuICAgICAgICAgICAgeyBqdWRnZXNfc2NvcmVzIH1cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkX2p1ZGdlX3Njb3JlICYmIHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlXG4gICAgICAgICAgICAgICAgICAgIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj5cbiAgICAgICAgICAgIH08L3A+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKGhhc19uZXh0X3RvdXIgLHByZXZfcm93LCBuZXh0X3JvdywgcHJldl9ydW4sIG5leHRfcnVuLCBpZHgsIG5fY29scykge1xuICAgICAgICBsZXQgcHJldl9zdGF0dXMgPSBwcmV2X3Jvd1xuICAgICAgICAgICAgPyBwcmV2X3J1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICA/IHByZXZfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCJcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IG5leHRfc3RhdHVzID0gbmV4dF9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICA/IG5leHRfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCI7XG4gICAgICAgIGxldCByZXN1bHQgPSBwcmV2X3N0YXR1cyAhPT0gbmV4dF9zdGF0dXNcbiAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgOiBoYXNfbmV4dF90b3VyXG4gICAgICAgICAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiTlRcIiArIGlkeCB9Pjx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XG4gICAgICAgICAgICB7IHJlc3VsdCB9XG4gICAgICAgIDwvdGg+PC90cj5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VzID0gdG91cl93cmFwcGVyLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xuICAgICAgICBsZXQgc2NvcmVzX3RhYmxlID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGxldCBoYXNfdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiICYmIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjtcbiAgICAgICAgbGV0IHdpZHRocyA9IG5ldyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMoZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoICsgMSk7XG4gICAgICAgIGxldCBqdWRnZXNfaGVhZGVyID0gZGlzY2lwbGluZV9qdWRnZXMubWFwKGZ1bmN0aW9uKGRqKSB7XG4gICAgICAgICAgICBsZXQgc3VmZml4ID0gZ2V0U2NvcmluZ1R5cGUoZGosIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA9PT0gXCJhY3JvXCIgPyBcIiAoQSlcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgKyBzdWZmaXggfTwvcD48L3RoPlxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBydW5zLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXIsXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHhdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4IC0gMV0sXG4gICAgICAgICAgICAgICAgcnVuc1tpZHhdLFxuICAgICAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgICAgICA0ICsgZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoICsgaGFzX3RvdGFsX3Njb3JlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIHJvd3MucHVzaCg8VG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlUm93XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuc1tpZHhdLmlkIH1cbiAgICAgICAgICAgICAgICBoZWFkX2p1ZGdlX3Njb3JlPXsgaGVhZF9qdWRnZV9zY29yZXNbaWR4XSB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvPXsgcmVzdWx0c19pbmZvW2lkeF0gfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1bnNbaWR4XSB9XG4gICAgICAgICAgICAgICAgc2NvcmVzPXsgc2NvcmVzX3RhYmxlW2lkeF0gfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzPXsgZGlzY2lwbGluZV9qdWRnZXMgfVxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH1cbiAgICAgICAgICAgICAgICBoYXNfdG90YWxfc2NvcmU9eyBoYXNfdG90YWxfc2NvcmUgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cIm51bWJlclwiIHN0eWxlPXsgd2lkdGhzLmdlbk51bWJlclN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuTmFtZVN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIHsgaGFzX3RvdGFsX3Njb3JlID8gPHRoIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuVG90YWxTY29yZVN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfTwvcD48L3RoPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICB7IGp1ZGdlc19oZWFkZXIgfVxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgVG91clJlc3VsdHNUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgY2FyZCA9IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmVcbiAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlXG4gICAgICAgICAgICAgICAgOiBcIjBcIlxuICAgICAgICAgICAgOiA8c3Bhbj4mbWRhc2g7PC9zcGFuPjtcbiAgICAgICAgbGV0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5oYXNfdG90YWxfc2NvcmUgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnsgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDogPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPlxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICByZXR1cm4gPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy02IG51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzAgcGFydGljaXBhbnRcIj57IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiPjxwPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuY2x1Yi5uYW1lIH08L3A+PC90ZD5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5oYXNfdG90YWxfc2NvcmUgPyA8dGQgY2xhc3NOYW1lPVwidy0xOCBzY29yZVwiPnsgdG90YWxfc2NvcmUgfTwvdGQ+IDogbnVsbCB9XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IGNhcmRcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgY2FyZCB9PC9wPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyQWR2YW5jZXNIZWFkZXIoaGFzX25leHRfdG91ciwgcHJldl9yb3csIG5leHRfcm93LCBwcmV2X3J1biwgbmV4dF9ydW4sIGlkeCwgbl9jb2xzKSB7XG4gICAgICAgIGxldCBwcmV2X3N0YXR1cyA9IHByZXZfcm93XG4gICAgICAgICAgICA/IHByZXZfcnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgID8gcHJldl9yb3cuYWR2YW5jZXNcbiAgICAgICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgOiBcIm5vdF9wZXJmb3JtZWRcIlxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBsZXQgbmV4dF9zdGF0dXMgPSBuZXh0X3J1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgID8gbmV4dF9yb3cuYWR2YW5jZXNcbiAgICAgICAgICAgICAgICA/IFwiYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgOiBcIm5vdF9wZXJmb3JtZWRcIjtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHByZXZfc3RhdHVzICE9PSBuZXh0X3N0YXR1c1xuICAgICAgICAgICAgPyBuZXh0X3N0YXR1cyA9PT0gXCJub3RfcGVyZm9ybWVkXCJcbiAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIikgfTwvcD5cbiAgICAgICAgICAgICAgICA6IGhhc19uZXh0X3RvdXJcbiAgICAgICAgICAgICAgICAgICAgPyBuZXh0X3N0YXR1cyA9PT0gXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDogPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfYWR2YW5jZWRcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJOVFwiICsgaWR4IH0+PHRoIGNsYXNzTmFtZT1cImFkdmFuY2VzLWhlYWRlclwiIGNvbFNwYW49eyBuX2NvbHMgfT5cbiAgICAgICAgICAgIHsgcmVzdWx0IH1cbiAgICAgICAgPC90aD48L3RyPlxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCB0b3VyX3dyYXBwZXIgPSBuZXcgVG91clNjb3Jlc1dyYXBwZXIodGhpcy5wcm9wcy50b3VyLCB0aGlzLnByb3BzLnJlc3VsdHMpO1xuICAgICAgICBsZXQgaGVhZF9qdWRnZV9zY29yZXMgPSB0b3VyX3dyYXBwZXIuZ2V0U2NvcmVzVGFibGVCeVJvbGVzKFwiaGVhZF9qdWRnZVwiKS5tYXAoKHJvdykgPT4gcm93WzBdKTtcbiAgICAgICAgbGV0IHJlc3VsdHNfaW5mbyA9IHRvdXJfd3JhcHBlci5nZXRSZXN1bHRzSW5mbygpO1xuICAgICAgICBsZXQgcnVucyA9IHRvdXJfd3JhcHBlci5nZXRSdW5zKCk7XG4gICAgICAgIGxldCBoYXNfbmV4dF90b3VyID0gdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbDtcbiAgICAgICAgbGV0IGhhc190b3RhbF9zY29yZSA9IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgJiYgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBydW5zLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXIsXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHhdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4IC0gMV0sXG4gICAgICAgICAgICAgICAgcnVuc1tpZHhdLFxuICAgICAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgICAgICA1ICsgaGFzX3RvdGFsX3Njb3JlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIHJvd3MucHVzaCg8VG91clJlc3VsdHNUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH1cbiAgICAgICAgICAgICAgICBoYXNfdG90YWxfc2NvcmU9eyBoYXNfdG90YWxfc2NvcmUgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYnJpZWYtdGFibGVcIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy02IG51bWJlclwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMzAgcGFydGljaXBhbnRcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2x1YlwiPjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jbHViXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaGFzX3RvdGFsX3Njb3JlID8gPHRoIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfTwvcD48L3RoPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IF9fKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcblxuaW1wb3J0IHsgVG91clJlc3VsdHNUYWJsZSwgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlLCBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSB9IGZyb20gXCIuL3Jvc2ZhcnIvdG91cl9yZXN1bHRzXCI7XG5cblxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuICgoKSA9PiB0aGlzLnByb3BzLm9uU2lnbmFsKG1lc3NhZ2UpKS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XG4gICAgICAgICAgICAgICAgRE9DWFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgICAgIHJlc3VsdHM6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5UT1VSX1NDSEVNQSA9IHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbjoge30sXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IHtcbiAgICAgICAgICAgICAgICAgICAganVkZ2U6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6IHt9LFxuICAgICAgICAgICAgICAgIHNjb3Jlczoge30sXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZS5nZXREb21haW4oXCJyZXN1bHRzX1wiICsgdGhpcy5wcm9wcy50b3VyX2lkKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlIHx8IG1lc3NhZ2UudG91cl9pZCA9PT0gdGhpcy5wcm9wcy50b3VyX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3gpIHtcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbF9pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5jYWxsYmFjayh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5kYl91cGRhdGVfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKFwicmVzdWx0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgc2VyaWFsaXplZCA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy50b3VyX2lkKVxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlRPVVJfU0NIRU1BKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b3VyOiBzZXJpYWxpemVkLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZFJlc3VsdHMoKSB7XG4gICAgICAgIEFwaShcInRvdXIuZ2V0X3Jlc3VsdHNcIiwge3RvdXJfaWQ6IHRoaXMucHJvcHMudG91cl9pZH0pXG4gICAgICAgIC5vblN1Y2Nlc3MoZnVuY3Rpb24obmV3X3Jlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBuZXdfcmVzdWx0cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSgpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJ0b3VyLmdldFwiLCB7IHRvdXJfaWQ6IHRoaXMucHJvcHMudG91cl9pZCwgY2hpbGRyZW46IHRoaXMuVE9VUl9TQ0hFTUF9KVxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMucHJvcHMudG91cl9pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgIH1cblxuICAgIC8vIExpc3RlbmVyc1xuXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbmRlcmluZ1xuXG4gICAgcmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnRvdXIuZmluYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIj57IF8oXCJyZXN1bHRzLmFsZXJ0cy5ub3RfZmluYWxpemVkXCIpIH08L2Rpdj5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsIHx8IHRoaXMuc3RhdGUucmVzdWx0cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFibGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy52ZXJib3NpdHkgPT09IFwiM1wiKSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSB7Li4udGhpcy5zdGF0ZX0gLz5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIyXCIpIHtcbiAgICAgICAgICAgIHRhYmxlID0gPFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZSB7Li4udGhpcy5zdGF0ZX0gLz5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhYmxlID0gPFRvdXJSZXN1bHRzVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRhYmxlT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG91ci1yZXN1bHRzXCIgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb25GaW5hbGl6ZWRXYXJuaW5nKCkgfVxuICAgICAgICAgICAgICAgIHsgdGFibGUgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJvZHkgPSA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0cyBwLWNvbnRlbnRcIiByZWY9XCJjb250ZW50XCI+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIH1cbiAgICAgICAgICAgIHsgdGFibGUgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucHJpbnRhYmxlXG4gICAgICAgICAgICA/IDxQcmludGFibGVcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLm5hbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlIH1cbiAgICAgICAgICAgICAgICB0aXRsZTE9eyBfKFwiYWRtaW4uaGVhZGVycy50b3VyX3Jlc3VsdHNcIikgfVxuICAgICAgICAgICAgICAgIHRpdGxlMj17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgICAgIHRpdGxlMz17IHRoaXMuc3RhdGUudG91ci5uYW1lIH1cbiAgICAgICAgICAgICAgICBib2R5PXsgYm9keSB9IC8+XG4gICAgICAgICAgICA6IGJvZHk7XG4gICAgfVxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0b3VyLXJlc3VsdHMuZG9jeFwiKSB7XG4gICAgICAgIERvY3goZmlsZW5hbWUpXG4gICAgICAgICAgICAuc2V0TWFyZ2lucyhbMTAsIDEwLCAxNSwgMTBdKVxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpKVxuICAgICAgICAgICAgLnNldFRpdGxlMih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lKVxuICAgICAgICAgICAgLnNldFRpdGxlMyh0aGlzLnN0YXRlLnRvdXIubmFtZSlcbiAgICAgICAgICAgIC5zZXRCb2R5KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jb250ZW50KS5pbm5lckhUTUwpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgdGhpcy5wcm9wcy52ZXJib3NpdHkgPT09IFwiMVwiID8gXCIxMnB0XCIgOiBcIjlwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAzcHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImJvcmRlclwiLCBcIjAuNXB0IHNvbGlkIGJsYWNrXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwicGFkZGluZ1wiLCBcIjAgMXB0IDAgMFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwidGV4dC1hbGlnblwiLCBcInJpZ2h0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93blwiLCBcIndpZHRoXCIsIFwiNTBwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFkdmFuY2VzLWhlYWRlclwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWFkX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI1JVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmRhbmNlX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI4JVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFjcm9fanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjglXCIpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEF1dG9QcmludGVyIH0gZnJvbSBcImFkbWluL2F1dG9fcHJpbnRlci9tYWluXCI7XG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxBdXRvUHJpbnRlciB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXG4pO1xuIiwiY2xhc3MgRG9jeEltcGwge1xuICAgIGNvbnN0cnVjdG9yKGZpbGVuYW1lKSB7XG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMSA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUyID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTMgPSBudWxsO1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmJvZHkgPSBcIlwiO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJwb3J0cmFpdFwiO1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHtcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LWZhbWlseVwiOiBcIkNhbGlicmksIFRhaG9tYSwgQXJpYWwsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRhYmxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xsYXBzZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstaW5zaWRlXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRkLCB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IFwiMXB0IDNwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDEsIGgyLCBoMywgaDQsIGg1LCBoNlwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgxXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDNcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNCBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiMTBwdCAwIDZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDUgcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjZwdCAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIuaGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nLWJvdHRvbVwiOiBcIjJwdFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBcIjoge1xuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsaVwiOiB7IFwibWFyZ2luLXRvcFwiOiAwLCBcInBhZGRpbmctdG9wXCI6IDAgfSxcbiAgICAgICAgICAgIFwiLnNwYWNlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudmEtdG9wXCI6IHtcbiAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwidG9wXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudGV4dC1sZWZ0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LXJpZ2h0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIiB9LFxuICAgICAgICAgICAgXCIudGV4dC1jZW50ZXJcIjogeyBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgXCIuYm9yZGVyZWQtdGFibGUgdGQsIC5ib3JkZXJlZC10YWJsZSB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXJcIjogXCIxcHQgc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRXaWR0aENzcygpO1xuICAgIH1cbiAgICBhZGRXaWR0aENzcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTAwOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU3R5bGUoXCIudy1cIiArIGksIFwid2lkdGhcIiwgaSArIFwiJVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFN0eWxlKHNlbGVjdG9yLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZXNbc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl1ba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMSh0aXRsZTEpIHtcbiAgICAgICAgdGhpcy50aXRsZTEgPSB0aXRsZTE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTIodGl0bGUyKSB7XG4gICAgICAgIHRoaXMudGl0bGUyID0gdGl0bGUyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUzKHRpdGxlMykge1xuICAgICAgICB0aGlzLnRpdGxlMyA9IHRpdGxlMztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE1hcmdpbnMobWFyZ2lucykge1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Qm9keShib2R5KSB7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIGRhdGEpIHtcbiAgICAgICAgbGV0IGNzc19wYWlycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLm1hcCgoa2V5KSA9PiBrZXkgKyAnOiAnICsgZGF0YVtrZXldICsgJzsgJylcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yICsgXCIgeyBcIiArIGNzc19wYWlycy5qb2luKFwiIFwiKSArIFwiIH1cIjtcbiAgICB9XG4gICAgcmVuZGVyU3R5bGVzKCkge1xuICAgICAgICBsZXQgY3NzX2Jsb2NrcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuc3R5bGVzKS5tYXAoKFxuICAgICAgICAgICAgKHNlbGVjdG9yKSA9PiB0aGlzLnJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSlcbiAgICAgICAgKS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIGNzc19ibG9ja3Muam9pbihcIlxcblwiKTtcbiAgICB9XG4gICAgcmVuZGVySFRNTCgpIHtcbiAgICAgICAgbGV0IGNzcyA9IHRoaXMucmVuZGVyU3R5bGVzKCk7XG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLmhlYWRlciA/ICc8cCBjbGFzcz1cImhlYWRlclwiPicgKyB0aGlzLmhlYWRlciArICc8L3A+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTEgPSB0aGlzLnRpdGxlMSA/ICc8aDE+JyArIHRoaXMudGl0bGUxICsgJzwvaDE+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTIgPSB0aGlzLnRpdGxlMiA/ICc8aDI+JyArIHRoaXMudGl0bGUyICsgJzwvaDI+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTMgPSB0aGlzLnRpdGxlMyA/ICc8aDM+JyArIHRoaXMudGl0bGUzICsgJzwvaDM+JyA6IFwiXCI7XG4gICAgICAgIGxldCBzcGFjZXIgPSAoaGVhZGVyIHx8IHRpdGxlMSB8fCB0aXRsZTIgfHwgdGl0bGUzKSA/ICc8cCBjbGFzcz1cInNwYWNlclwiPiZuYnNwOzwvcD4nIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIFwiPCFET0NUWVBFIGh0bWw+XFxuXCIgK1xuICAgICAgICAgICAgXCI8aHRtbD48aGVhZD5cIiArXG4gICAgICAgICAgICAgICAgXCI8bWV0YSBjaGFyc2V0PVxcXCJ1dGYtOFxcXCI+XCIgK1xuICAgICAgICAgICAgICAgIFwiPHN0eWxlPlxcblwiICsgY3NzICsgXCJcXG48L3N0eWxlPlxcblwiICtcbiAgICAgICAgICAgIFwiPC9oZWFkPjxib2R5PlxcblwiICtcbiAgICAgICAgICAgICAgICBoZWFkZXIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMSArXG4gICAgICAgICAgICAgICAgdGl0bGUyICtcbiAgICAgICAgICAgICAgICB0aXRsZTMgK1xuICAgICAgICAgICAgICAgIHNwYWNlciArXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5ICtcbiAgICAgICAgICAgIFwiPC9ib2R5PjwvaHRtbD5cIjtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVySFRNTCgpO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IHRoaXMubWFyZ2lucyB8fCAodGhpcy5vcmllbnRhdGlvbiA9PT0gXCJwb3J0cmFpdFwiID8gWzEwLCAxNSwgMTAsIDE1XSA6IFs3LCAxMCwgNywgMTBdKTtcbiAgICAgICAgbGV0IGNvbnZlcnRlZCA9IGh0bWxEb2N4LmFzQmxvYihodG1sLCB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbjogdGhpcy5vcmllbnRhdGlvbixcbiAgICAgICAgICAgIG1hcmdpbnM6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICAgIE1hdGguZmxvb3IobWFyZ2luc1swXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICByaWdodDogIE1hdGguZmxvb3IobWFyZ2luc1sxXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBib3R0b206IE1hdGguZmxvb3IobWFyZ2luc1syXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAgIE1hdGguZmxvb3IobWFyZ2luc1szXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNhdmVBcyhjb252ZXJ0ZWQsIHRoaXMuZmlsZW5hbWUpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgdmFyIERvY3ggPSAoZm4pID0+IG5ldyBEb2N4SW1wbChmbik7XG4iLCJleHBvcnQgY2xhc3MgUnVuU2NvcmVzV3JhcHBlciB7XG4gICAgY29uc3RydWN0b3IocnVuLCBkaXNjaXBsaW5lX2p1ZGdlcykge1xuICAgICAgICB0aGlzLnJ1biA9IHJ1bjtcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlcyA9IGRpc2NpcGxpbmVfanVkZ2VzO1xuICAgICAgICB0aGlzLnNjb3Jlc19ieV9kaXNjaXBsaW5lX2p1ZGdlX2lkID0ge31cbiAgICAgICAgcnVuLnNjb3Jlcy5mb3JFYWNoKGZ1bmN0aW9uKHNjb3JlKSB7XG4gICAgICAgICAgICBsZXQgZGpfaWQgPSBzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkO1xuICAgICAgICAgICAgdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0gPSBzY29yZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgZ2V0U2NvcmVzQnlKdWRnZUlkcyhkaXNjaXBsaW5lX2p1ZGdlX2lkcykge1xuICAgICAgICByZXR1cm4gZGlzY2lwbGluZV9qdWRnZV9pZHMubWFwKCgoZGpfaWQpID0+IHRoaXMuc2NvcmVzX2J5X2Rpc2NpcGxpbmVfanVkZ2VfaWRbZGpfaWRdKS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyU2NvcmVzV3JhcHBlciB7XG4gICAgY29uc3RydWN0b3IodG91ciwgcmVzdWx0cykge1xuICAgICAgICB0aGlzLnJ1bl93cmFwcGVycyA9IHRvdXIucnVucy5tYXAoKHJ1bikgPT4gbmV3IFJ1blNjb3Jlc1dyYXBwZXIocnVuLCB0b3VyLmRpc2NpcGxpbmVfanVkZ2VzKSk7XG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMgPSB0b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXM7XG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXMgPSB7fTtcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRqLCBpZHgpIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2RqLnJvbGVdIHx8IFtdO1xuICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkeDogaWR4LFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2U6IGRqLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2RqLnJvbGVdID0gYXJyO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfYnlfcnVuX2lkcyA9IHt9O1xuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXMpID0+XG4gICAgICAgICAgICAgICAgcmVzdWx0c19ieV9ydW5faWRzW3Jlcy5ydW5faWRdID0gcmVzKTtcbiAgICAgICAgICAgIHRoaXMucnVuX3dyYXBwZXJzLmZvckVhY2goKHcpID0+XG4gICAgICAgICAgICAgICAgdy5yZXN1bHRzX2luZm8gPSByZXN1bHRzX2J5X3J1bl9pZHNbdy5ydW4uaWRdKTtcbiAgICAgICAgICAgIHRoaXMucnVuX3dyYXBwZXJzLnNvcnQoKGEsIGIpID0+IGEucmVzdWx0c19pbmZvLnBsYWNlIC0gYi5yZXN1bHRzX2luZm8ucGxhY2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbYXJndW1lbnRzWzBdXVxuICAgICAgICAgICAgICAgID8gdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1thcmd1bWVudHNbMF1dLm1hcCgoYikgPT4gYi5kaXNjaXBsaW5lX2p1ZGdlKVxuICAgICAgICAgICAgICAgIDogW107XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcmVzID0gcmVzLmNvbmNhdCh0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1tpXV0gfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zb3J0KChhLCBiKSA9PiBhLmlkeCAtIGIuaWR4KTtcbiAgICAgICAgcmV0dXJuIHJlcy5tYXAoKGIpID0+IGIuZGlzY2lwbGluZV9qdWRnZSk7XG4gICAgfVxuICAgIGdldFNjb3Jlc1RhYmxlQnlSb2xlcygpIHtcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VfaWRzID0gdGhpcy5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyguLi5hcmd1bWVudHMpLm1hcCgoZGopID0+IGRqLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuX3dyYXBwZXJzLm1hcCgodykgPT4gdy5nZXRTY29yZXNCeUp1ZGdlSWRzKGRpc2NpcGxpbmVfanVkZ2VfaWRzKSk7XG4gICAgfVxuICAgIGdldFJlc3VsdHNJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5fd3JhcHBlcnMubWFwKCh3KSA9PiB3LnJlc3VsdHNfaW5mbyk7XG4gICAgfVxuICAgIGdldFJ1bnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bl93cmFwcGVycy5tYXAoKHcpID0+IHcucnVuKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJ0aWNpcGFudERpc3BsYXkocGFydGljaXBhbnQpIHtcbiAgICBpZiAocGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgIT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuIDxwPnsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfTwvcD47XG4gICAgfVxuICAgIHJldHVybiBwYXJ0aWNpcGFudC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+IDxwIGtleT17IGlkeCB9Pnsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9PC9wPik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yaW5nX3N5c3RlbV9uYW1lKSB7XG4gICAgc3dpdGNoIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUpIHtcbiAgICBjYXNlIFwiZGFuY2VfanVkZ2VcIjpcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiZm9ybWF0aW9uXCI7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25fYWNyb1wiO1xuICAgICAgICBjYXNlIFwicm9zZmFyci5zaW1wbGlmaWVkXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJzaW1wbGlmaWVkXCI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZVwiO1xuICAgICAgICB9XG4gICAgY2FzZSBcImFjcm9fanVkZ2VcIjpcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCI6XG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZVwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwiYWNyb1wiO1xuICAgICAgICB9XG4gICAgY2FzZSBcInRlY2hfanVkZ2VcIjpcbiAgICAgICAgcmV0dXJuIFwidGVjaFwiO1xuICAgIGNhc2UgXCJoZWFkX2p1ZGdlXCI6XG4gICAgICAgIHJldHVybiBcImhlYWRcIjtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbmNsYXNzIENtcENoYWluSW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gMDtcbiAgICB9XG4gICAgY21wKGEsIGIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIENtcENoYWluID0gKCkgPT4gbmV3IENtcENoYWluSW1wbCgpO1xuIiwiaW1wb3J0IHsgdHJhbnNsYXRlLCBnZXRQb3NzaWJsZVRvdXJOYW1lcyB9IGZyb20gXCIuL3J1XCI7XG5cbmV4cG9ydCB2YXIgXyA9IHRyYW5zbGF0ZTtcbmV4cG9ydCB2YXIgdG91cl9uYW1lcyA9IGdldFBvc3NpYmxlVG91ck5hbWVzKCk7XG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xyXG4gICAgICAgIGxldCB4ID0gbiAlIDEwMDtcclxuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogKHZlcnNpb24sIGRhdGUpID0+IDxkaXYgY2xhc3NOYW1lPVwiYWJvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48Yj5Sb2NrSnVkZ2Uge3ZlcnNpb259PC9iPiAo0L7RgiB7ZGF0ZX0pICZtZGFzaDsg0YHQuNGB0YLQtdC80LAg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0L/QviDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQvtC80YMg0YDQvtC6LdC9LdGA0L7Qu9C70YMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCQ0LLRgtC+0YDRgdC60LjQtSDQv9GA0LDQstCwINC90LAg0YHQuNGB0YLQtdC80YMgUm9ja0p1ZGdlINC/0L7Qu9C90L7RgdGC0YzRjiDQv9GA0LjQvdCw0LTQu9C10LbQsNGCINGA0LDQt9GA0LDQsdC+0YLRh9C40LrRgyDQkNGA0YLQtdC80YMg0JrQsNC30LDQutC+0LLRgy4g0KHQvtCw0LLRgtC+0YAg0YHQuNGB0YLQtdC80Ysg0JDQvdGC0L7QvSDQkNC80LXQu9C40L0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCh0LjRgdGC0LXQvNCwINGA0LDRgdC/0YDQvtGB0YLRgNCw0L3Rj9C10YLRgdGPINC/0L4g0LvQuNGG0LXQvdC30LjQuCBMaW51bSBkLm8ubyAoaW5mb0BsaW51bS5ocikuINCU0LvRjyDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LAgUm9ja0p1ZGdlINC90LXQvtCx0YXQvtC00LjQvNC+INC4INC00L7RgdGC0LDRgtC+0YfQvdC+INC40LzQtdGC0Ywg0L/RgNCw0LLQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyBMaW51bSBMUFMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCe0YTQuNGG0LjQsNC70YzQvdGL0Lkg0YHQsNC50YI6IDxhIGhyZWY9XCJodHRwczovL3JvY2tqdWRnZS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+aHR0cHM6Ly9yb2NranVkZ2UuY29tLzwvYT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wcm9ncmFtc19hZnRlcl9jcmVhdGlvblwiOiBcItCf0YDQvtCz0YDQsNC80LzRiyDQvNC+0LbQvdC+INCx0YPQtNC10YIg0LTQvtCx0LDQstC40YLRjCDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRgdC+0YXRgNCw0L3QtdC90LjRjyDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC60L7RgNGA0LXQutGC0L3QviDQvdCw0YHRgtGA0L7QtdC90LAg0Lgg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LAuXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9ub3RfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0L3QtdC00L7RgdGC0YPQv9C90LAg0L3QsCDRjdGC0L7QvCDQutC+0LzQv9GM0YLQtdGA0LUuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbmFsaXplZFwiOiBcItCe0YLRgdGD0YLRgdGC0LLRg9GO0YIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV93YXJuaW5nXCI6IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz7QpNC40L3QsNC70LjQt9Cw0YbQuNGPINC00L7Qu9C20L3QsCDQvtGC0LzQtdC90Y/RgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0LjRgdC60LvRjtGH0LjRgtC10LvRjNC90YvRhSDRgdC70YPRh9Cw0Y/RhSE8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JXRgdC70Lgg0LbQtSDRjdGC0L4g0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0L3QtdC+0LHRhdC+0LTQuNC80L4sINC+0LHRgNCw0YLQuNGC0LUg0LLQvdC40LzQsNC90LjQtSwg0YfRgtC+INC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YHQv9C40YHQvtC6INGD0YfQsNGB0YLQvdC40LrQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAg0YHQu9C10LTRg9GO0YnQtdCz0L4g0YLRg9GA0LAg0LHRg9C00LXRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQv9C10YDQtdGB0L7Qt9C00LDQvS4g0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YPRh9Cw0YHRgtC90LjQutC+0LIsINC/0YDQvtGI0LXQtNGI0LjRhSDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC/0L7RgdC70LUg0L/QtdGA0LLQvtC5XHJcbiAgICAgICAgICAgICAgICAgICAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDQuCDQvdC1INC/0YDQvtGI0LXQtNGI0LjRhSDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDQsdGD0LTRg9GCINCx0LXQt9Cy0L7Qt9Cy0YDQsNGC0L3QviDRg9GC0LXRgNGP0L3RiyE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0Jgg0L3QtSDQt9Cw0LHRg9C00YzRgtC1INC30LDQvdC+0LLQviDQvdCw0L/QtdGH0LDRgtCw0YLRjCDQstGB0LUg0YLQsdC70LjRhtGLLjwvcD48L2Rpdj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGB0LsuwqDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVcIjogXCLQntGH0LXRgNC10LTRjCDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jbHViXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0LrQu9GD0LE/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jb21wZXRpdGlvblwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQviDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LU/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9kaXNjaXBsaW5lXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC00LjRgdGG0LjQv9C70LjQvdGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfanVkZ2VcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGB0YPQtNGM0Y4/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQv9GA0L7Qs9GA0LDQvNC80YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDRgdGC0YDQsNC90LjRhtGDINC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjiDRgtGD0YDQsD8g0JLQstC10LTQuNGC0LUgwqt1bmZpbmFsaXplwrssINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogXCLQniDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xpZW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90L3Ri9C80Lgg0YPRgdGC0YDQvtC50YHRgtCy0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9tYW5hZ2VtZW50XCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC00LjRgdGG0LjQv9C70LjQvdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9jb21wZXRpdGlvblwiOiBcItCY0LzQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbWVudVwiOiBcItCh0LXRgNCy0LjRgdC90L7QtSDQvNC10L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fZGF0ZVwiOiBcItCU0LDRgtCwINC/0YDQvtCy0LXQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX25hbWVcIjogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmlsZXNfc2VsZWN0ZWRcIjogXCLQktGL0LHQtdGA0LjRgtC1INGE0LDQudC7Li4uXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3Nwb3J0c21lblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L/QvtGA0YLRgdC80LXQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuX3BhcnRpY2lwYW50c1wiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5cIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogbiA9PiBcItCY0YLQvtCz0L4gXCIgKyBuICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvdXItYWRtaW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcclxuICAgICAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhcGlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcclxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLIFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGluZ1wiOiBcItCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9wcm9ibGVtXCI6IFwi0J/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcclxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fZXJyb3JcIjogXCLQn9C+0YXQvtC20LUsINC40LzQtdGO0YLRgdGPINC/0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBcItCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCk0L7RgNC80LXQudGI0L0g4oSWXCIgKyBuLnRvU3RyaW5nKCkgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCLQo9GH0LDRgdGC0L3QuNC6IOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdpbmdcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0J/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfYWNyb2JhdGljX292ZXJyaWRlXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0J/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3RvdXJcIjogXCLQndCw0YfQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCe0YHRgtCw0L3QvtCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0L/RgNC+0LPRgNCw0LzQvNGDINC00LvRjyDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRiz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LHQsNC30L7QstGL0YUg0L7RhtC10L3QvtC6INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2lkeFwiOiBcIuKEliDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybWVkXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibmV3X3Njb3JlXCI6IFwi0JrQvtGA0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgXCJvbGRfc2NvcmVcIjogXCLQkdCw0LfQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQklwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vZGVsc1wiOiB7XHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60LvRg9Cx0LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZlXCI6IFwi0JDQutGC0LjQstC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcItCU0LDRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPINC00LvRjyDQv9GA0L7RgtC+0LrQvtC70LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3RpdGxlXCI6IFwi0JfQsNCz0L7Qu9C+0LLQvtC6XCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV92YWx1ZVwiOiBcItCX0L3QsNGH0LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQpC4g0JguINCeLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZV9kZXNjcmlwdGlvblwiOiBcItCU0L7Qu9C20L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfbmFtZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5lcmFsX2luZm9cIjogXCLQntGB0L3QvtCy0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV9uXCI6IFwi0J7RgdC9LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX3lcIjogXCLQl9Cw0L8uXCIsXHJcbiAgICAgICAgICAgICAgICBcInllYXJfb2ZfYmlydGhcIjogXCLQk9C+0LQg0YDQvtC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ5b2JcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9ncmFtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdF9mb3JcIjogXCLQn9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdF9wcm9ncmFtXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaXNfaG9wZV90b3VyXCI6IFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1fYWR2YW5jZXNcIjogXCLQmtCy0L7RgtCwINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfcGVyX2hlYXRcIjogXCLQo9GH0LDRgdGC0L3QuNC60L7QsiDQsiDQt9Cw0YXQvtC00LVcIixcclxuICAgICAgICAgICAgICAgIFwic2NvcmluZ19zeXN0ZW1fbmFtZVwiOiBcItCh0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9oZWF0XCI6IFwi0KHQsdGA0L7RgSDQvdC+0LzQtdGA0LAg0LfQsNGF0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3BsYWNlXCI6IFwi0KHQsdGA0L7RgSDQvNC10YHRgtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZXNcIjogXCLQnNC10YHRgtCwINC00LvRjyDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwcmVzZW50ZXJcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2FjdGl2ZV90b3VyXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2ZpbmFsaXplZFwiOiBcItCU0LDQvdC90YvQtSDRgNC10LfRg9C70YzRgtCw0YLRiyDQvdC1INGP0LLQu9GP0Y7RgtGB0Y8g0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdGL0LzQuC5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicHJpbnRcIjogXCLQn9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxlX3ZpZXdcIjogXCLQo9C/0YDQvtGJ0LXQvdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX3ZpZXdcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic3RhcnRfcGFnZVwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9jb21wZXRpdGlvblwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1INC00LvRjyDQv9GA0L7QtNC+0LvQttC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9yb2xlXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdCy0L7RjiDRgNC+0LvRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fY29tcGV0aXRpb25zXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdGL0YUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50X2xpbmtcIjogKGxpbmspID0+IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgINCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80Lgg0L3QsNGF0L7QtNC40YLRgdGPINC/0L4g0LDQtNGA0LXRgdGDJm5ic3A7XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17IGxpbmsgfT57IGxpbmsgfTwvYT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZG1pbmlzdHJhdG9yXCI6IFwi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuXCI6IFwi0K3QutGA0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjogXCLQntC/0LXRgNCw0YLQvtGAINGN0LrRgNCw0L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0J/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YNcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg4oSWXCIgKyAobiArIDEpLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfcGFnZVwiOiBcItCh0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIjogXCLQktGLINC90LUg0YPRh9Cw0YHRgtCy0YPQtdGC0LUg0LIg0YHRg9C00LXQudGB0YLQstC1INC00LDQvdC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ190b3VyXCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtGCINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uc1wiOiBcItCU0LXQudGB0YLQstC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VcIjogXCLQotCw0L3QtdGGXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wb3NpdGlvblwiOiBcItCa0L7QvNC/0L7Qt9C40YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2ZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9iaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbXByZXNzaW9uXCI6IFwi0J7QsdGJ0LXQtSDQstC/0LXRh9Cw0YLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INC70LjQvdC10LnQvdGL0YUg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5X3R5cGVcIjogXCLQqNGC0YDQsNGE0L3Ri9C1INGB0LDQvdC60YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldmlvdXNfcGVuYWx0aWVzXCI6IFwi0J/RgNC10LTRi9C00YPRidC40LUg0YjRgtGA0LDRhNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5ZWxsb3dfY2FyZFwiOiBcIi0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IFwi0KHQsdGA0L7RgSDQvdCwIFwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpbWluZ1wiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJyZWFrZG93blwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwiQVwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNcIjogXCLQmlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmRcIjogXCLQn1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpXCI6IFwi0J7QklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21cIjogXCLQnNCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQu9C4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQsNC60YDQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FyZFwiOiBcItCo0YLRgNCw0YRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCj0YfQsNGB0YLQvdC40LosINGA0LXQt9GD0LvRjNGC0LDRglwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdlX3JvbGVzXCI6IHtcclxuICAgICAgICAgICAgXCJcIjogXCItXCIsXHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0YLQsNC90YbQsFwiLFxyXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgbGV0IHBhdGggPSBzcmMuc3BsaXQoXCIuXCIpO1xyXG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xyXG4gICAgcGF0aC5mb3JFYWNoKChjaHVuaykgPT4gcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdKTtcclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgXCIgKyBzcmMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGhyYXNlX3B0ciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGdldFBvc3NpYmxlVG91ck5hbWVzID0gKCkgPT4gW1xyXG4gICAgXCLQpNC40L3QsNC7XCIsXHJcbiAgICBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgIFwi0J7RgtCx0L7RgNC+0YfQvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICBcIjEvMiDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS80INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzgg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvMTYg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG5dO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5cbmNsYXNzIEFwaUltcGwge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGF0YSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gKCkgPT4ge307XG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSAobXNnLCBjb2RlLCBhcmdzKSA9PiBzaG93RXJyb3IoY29kZSA/IF8oY29kZSwgLi4uYXJncykgOiBtc2cpO1xuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xuICAgICAgICB0aGlzLmNiX2RvbmUgPSAoKSA9PiB7fTtcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSAoKSA9PiB7fTtcbiAgICB9XG4gICAgb25Eb25lKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2JfZG9uZSA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb25TdWNjZXNzKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb25FcnJvcihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNiX2Vycm9yID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvbkZhaWwoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRUb0RCKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBzdD1zdG9yYWdlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHN0LmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2VuZCgpIHtcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvYXBpXCIsIHRydWUpO1xuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfZGIocmVzcG9uc2UucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2Jfc3VjY2VzcyhyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2JfZXJyb3IocmVzcG9uc2UubWVzc2FnZSwgcmVzcG9uc2UuY29kZSwgcmVzcG9uc2UuYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJtZXRob2RcIiwgdGhpcy5tZXRob2QpO1xuICAgICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgQXBpID0gKC4uLmFyZ3MpID0+IG5ldyBBcGlJbXBsKC4uLmFyZ3MpO1xuIiwiaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uX3N0YXR1cyB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZURpc3BhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzX2NudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGluZyB0byB3ZWJzb2NrZXQuLi5cIik7XHJcbiAgICAgICAgdGhpcy53cyA9IG5ldyBTb2NrSlMoXCJodHRwOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL3dzXCIpO1xyXG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldE9rKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkLlwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1tcInJlbG9hZF9kYXRhXCIsIG51bGxdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxfdXBkYXRlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldEZhaWwoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QuYmluZCh0aGlzKSwgNTAwKTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBpZiAoZGF0YVtcImNsaWVudF9pZFwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xpZW50X2lkID0gZGF0YVtcImNsaWVudF9pZFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXNnX3R5cGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICBsZXQgbXNnX2RhdGEgPSBkYXRhWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAobXNnX3R5cGUgPT09IFwiZm9yY2VfcmVmcmVzaFwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fSkuZm9yRWFjaCgoa2V5KSA9PiBsaXN0ZW5lcnNba2V5XShtc2dfZGF0YSkpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEubW9kZWxfdXBkYXRlcy5mb3JFYWNoKChtb2RlbF9pbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHN0b3JhZ2UudXBkYXRlTW9kZWwobW9kZWxfaW5mby5tb2RlbCwgbW9kZWxfaW5mby5pZCwgbW9kZWxfaW5mby5kYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRhdGFfY2hhbmdlZCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbXCJkYl91cGRhdGVcIl0gfHwge307XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcklkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc19jbnQrKztcclxuICAgIH1cclxuICAgIGFkZExpc3RlbmVyKG1zZ190eXBlcywgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldExpc3RlbmVySWQoKTtcclxuICAgICAgICBtc2dfdHlwZXMuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24obXNnX3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXVtpZF0gPSBjYWxsYmFjaztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyX2lkKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1trZXldW2xpc3RlbmVyX2lkXTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIG1lc3NhZ2VfZGlzcGF0Y2hlciA9IG5ldyBNZXNzYWdlRGlzcGF0Y2hlcigpO1xyXG4iLCJjbGFzcyBSZWYge1xuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB9XG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xuICAgIH1cbn1cblxuY2xhc3MgTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkLCBtb2RlbF9zdG9yYWdlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzID0ge307XG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcbiAgICB9XG4gICAgYWRkQmFja1JlZihrZXksIHJlZikge1xuICAgICAgICB0aGlzW2tleV0gPSByZWY7XG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xuICAgIH1cbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIiB8fCBpZHguY2hhckF0KDApID09PSBcIl5cIikge1xuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZl9rZXkgPSBkYXRhW2lkeF0uYmFja19yZWY7XG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlZi5nZXQoKS5hZGRCYWNrUmVmKGJhY2tfcmVmX2tleSwgYmFja19yZWYpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCIqXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkX2RhdGEgPSBkYXRhW2lkeF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlcmlhbGl6ZShzY2hlbWEpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX19rZXlfdHlwZXNba2V5XSkge1xuICAgICAgICAgICAgY2FzZSBcIipcIjpcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5tYXAoZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB9XG4gICAgYWRkKGlkLCBkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0gPSBuZXcgTW9kZWwodGhpcy5zdG9yYWdlLCBpZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcbiAgICB9XG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBieV9pZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaWRdO1xuICAgIH1cbiAgICBhbGwoKSB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tb2RlbHMpO1xuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cbn1cblxuY2xhc3MgU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXMgPSB7fVxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxuICAgIH1cbiAgICBnZXREb21haW4oZG9tYWluKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XG4gICAgfVxuICAgIGRlbERvbWFpbihkb21haW4pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xuICAgIH1cbiAgICBnZXQobW9kZWxfbmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcbiAgICB9XG4gICAgZGVsKG1vZGVsX25hbWUpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XG4gICAgfVxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBkYXRhKSB7XG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5kb21haW5zW2tleV0udXBkYXRlTW9kZWwoLi4uYXJndW1lbnRzKSB8fCBkYXRhX2NoYW5nZWQpO1xuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBcInRleHRBbGlnblwiOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbl9zdGF0dXNcIik7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcclxuICAgICAgICAgICAgICAgIDxDb25uZWN0aW9uU3RhdHVzIC8+LFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFwiY29ubmVjdGVkXCI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG4gICAgc2V0T2soKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiB0cnVlLCB0aWNrOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHNldEZhaWwoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIG9rXCI+PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW5nXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC1kYW5nZXJcIiArICh0aGlzLnN0YXRlLnRpY2sgPyBcIiB0aWNrXCIgOiBcIlwiKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGlvbl9wcm9ibGVtXCIpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIGNvbm5lY3Rpb25fc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5pbml0KCk7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xuICAgIGxldCB0aXRsZSA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1swXSA6IF8oXCJnbG9iYWwubWVzc2FnZXMuZXJyb3JfaGVhZGVyXCIpO1xuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xuICAgIHN3YWwoe1xuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xuICAgIHJldHVybiBzd2FsKHtcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxuICAgICAgICBjbG9zZU9uQ29uZmlybTogY2xvc2Vfb25fY29uZmlybSxcbiAgICB9LCBhY3Rpb24pO1xufVxuIiwiZXhwb3J0IGNsYXNzIFByaW50YWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTE6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZldGNoUHJpbnRhYmxlRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvZHkuaW5uZXJIVE1MO1xuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmhlYWRlciA/IDxkaXYgY2xhc3NOYW1lPVwicC1oZWFkZXJcIj57IHRoaXMucHJvcHMuaGVhZGVyIH08L2Rpdj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMSA/IDxoMT57IHRoaXMucHJvcHMudGl0bGUxIH08L2gxPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUyID8gPGgyPnsgdGhpcy5wcm9wcy50aXRsZTIgfTwvaDI+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTMgPyA8aDM+eyB0aGlzLnByb3BzLnRpdGxlMyB9PC9oMz4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtY29udGVudFwiXG4gICAgICAgICAgICAgICAgcmVmPXsgZSA9PiB0aGlzLl9ib2R5ID0gZSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmJvZHkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcmludGFibGVcIj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUxKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTMoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoT3JDbGljayhoYW5kbGVyKSB7XG4gICAgbGV0IGYgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBmLFxuICAgICAgICBvbkNsaWNrOiBmLFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hFbmRPckNsaWNrKGhhbmRsZXIsIHByZXZlbnRfZGVmYXVsdCkge1xuICAgIGxldCBfaGFuZGxlciA9ICgpID0+IHt9O1xuICAgIGxldCBkaXN0YW5jZSA9IDA7XG4gICAgbGV0IGxhdGVzdF9wb3MgPSBbMCwgMF07XG4gICAgbGV0IGZpcmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyKCk7XG4gICAgfVxuICAgIGxldCBkaXNjYXJkID0gKCkgPT4ge1xuICAgICAgICBfaGFuZGxlciA9ICgpID0+IHt9O1xuICAgIH1cbiAgICBsZXQgbW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XG4gICAgICAgIGxldCBzcXIgPSAoeCkgPT4geCAqIHg7XG4gICAgICAgIGRpc3RhbmNlICs9IE1hdGguc3FydChzcXIoY3VycmVudF9wb3NbMF0gLSBsYXRlc3RfcG9zWzBdKSArIHNxcihjdXJyZW50X3Bvc1sxXSAtIGxhdGVzdF9wb3NbMV0pKTtcbiAgICAgICAgbGF0ZXN0X3BvcyA9IGN1cnJlbnRfcG9zO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPiAyMCkge1xuICAgICAgICAgICAgZGlzY2FyZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBfaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIGRpc3RhbmNlID0gMDtcbiAgICAgICAgbGF0ZXN0X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBzdGFydCxcbiAgICAgICAgb25Ub3VjaEVuZDogZmlyZSxcbiAgICAgICAgb25Ub3VjaE1vdmU6IG1vdmUsXG4gICAgICAgIG9uVG91Y2hDYW5jZWw6IGRpc2NhcmQsXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZXIsXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgZG9uZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBzbGlkZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBvbkFjdGl2YXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGluID0gbnVsbDtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvbmUgJiYgbmV4dFByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzRnJlZSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLnRvdWNoICYmICF0aGlzLnByb3BzLmRvbmUgJiYgIXRoaXMuc3RhdGUuZmluaXNoZWQ7XG4gICAgfVxuICAgIGdldE91dGVyVGV4dE9wYWNpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCgxMDAgLSB0aGlzLnN0YXRlLnBvc2l0aW9uLCAwKSwgMTAwKTtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAvIDEwMCkudG9GaXhlZCgzKTtcbiAgICB9XG4gICAgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIGxldCByZXMgPSAwO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmVzICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBnZXRUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRTbGlkZXJQb3MoZXZlbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0VG91Y2goZXZlbnQpIC0gdGhpcy5waW47XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCAyMDApO1xuICAgIH1cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXNpb246IDIwMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgfVxuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBpbiA9IHRoaXMuZ2V0UmVsYXRpdmVUb3VjaChldmVudCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgICAgIHRvdWNoOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Ub3VjaEVuZChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wb3NpdGlvbiA9PT0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzbGlkZXIgbm9zZWxlY3RcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImlubmVyXCIgKyAodGhpcy5pc0ZyZWUoKSA/IFwiIGZyZWVcIiA6IFwiXCIpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6ICh0aGlzLnByb3BzLmRvbmUgfHwgdGhpcy5zdGF0ZS5maW5pc2hlZCkgPyBcIjIwMHB4XCIgOiB0aGlzLnN0YXRlLnBvc2l0aW9uICsgXCJweFwiIH19XG4gICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKSB9XG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9eyB0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9eyB0aGlzLm9uVG91Y2hFbmQuYmluZCh0aGlzKSB9XG4gICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMub25DbGljay5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDihpJcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVcbiAgICAgICAgICAgICAgICA/IDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYigxMDAsMTAwLDEwMClcIiB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImRvbmUtdGV4dFwiIH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDogPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiYSgxMDAsMTAwLDEwMCxcIiArIHRoaXMuZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpICsgXCIpXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJzbGlkZS10ZXh0XCIgKyAodGhpcy5pc0ZyZWUoKSA/IFwiIGZyZWVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zbGlkZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgY2hvaWNlczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcm93X3NpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICBhY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRCdXR0b25zQ291bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm93X3NpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hvaWNlcy5sZW5ndGg7XG4gICAgfVxuICAgIG9uQ2xpY2sobikge1xuICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUobik7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLnByb3BzLmNob2ljZXMuZm9yRWFjaCgoZWwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgbGV0IGtleSA9IGVsWzBdO1xuICAgICAgICAgICAgbGV0IHRleHQgPSBlbFsxXTtcbiAgICAgICAgICAgIGxldCBhY3RpdmVfY2xhc3NfbmFtZSA9ICh0aGlzLnByb3BzLmFjdGl2ZSA9PT0ga2V5KSA/IFwiIGFjdGl2ZVwiIDogXCJcIjtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXsga2V5IH1cbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25DbGljay5iaW5kKHRoaXMsIGtleSkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gc2NvcmUtYnRuXCIgKyBhY3RpdmVfY2xhc3NfbmFtZSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj4pO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiICYmIChpZHggKyAxKSAlIHRoaXMucHJvcHMucm93X3NpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCg8YnIga2V5PXsgXCJiclwiICsgaWR4IH0gLz4pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbGF5b3V0X2NsYXNzID0gKHRoaXMucHJvcHMuc3R5bGUgIT09IFwidHdvLWxpbmVzXCIpID8gXCJzZWxlY3Rvci1sYXlvdXRcIiA6IFwic2VsZWN0b3ItbGF5b3V0LTJyb3dzXCI7XG4gICAgICAgIGxldCBzZWxlY3RlZF9jbGFzcyA9IHRoaXMucHJvcHMuYWN0aXZlID09PSBudWxsID8gXCJcIiA6IFwiIHNlbGVjdGVkXCJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcInNjb3JpbmctbGF5b3V0IFwiICsgbGF5b3V0X2NsYXNzICsgc2VsZWN0ZWRfY2xhc3MgKyBcIiBuLVwiICsgdGhpcy5nZXRCdXR0b25zQ291bnQoKS50b1N0cmluZygpIH0+eyByZXN1bHQgfTwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IG1pbjsgaWR4IDw9IG1heDsgKytpZHgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHgsIGlkeC50b1N0cmluZygpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxldFBvaW50NVNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gTWF0aC5yb3VuZCgyICogbWluKTsgaWR4IDw9IE1hdGgucm91bmQoMiAqIG1heCk7ICsraWR4KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4IC8gMiwgKGlkeCAlIDIpID8gKGlkeCAvIDIpLnRvRml4ZWQoMSkgOiBNYXRoLmZsb29yKGlkeCAvIDIpLnRvU3RyaW5nKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VuZERlbHRhczogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25NaW51cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0xfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uUGx1cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxldFBvaW50NUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VuZERlbHRhczogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25NaW51cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0wLjV9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlIC0gMC41KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblBsdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAwLjV9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlICsgMC41KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1pbnRlZ2VyLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG52YXIgc3RvcHdhdGNoZXMgPSB7fTtcblxuZXhwb3J0IGNsYXNzIFN0b3BXYXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZV9pZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZV9pZF0gfHwge1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgc3RyX3ZhbHVlOiBcIjA6MDBcIixcbiAgICAgICAgICAgIGludGVydmFsOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaXJlY3QtbXV0YXRpb24tc3RhdGVcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZV9pZF0gPSB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBub3coKSB7XG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIH1cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID8gdGhpcy5zdG9wKCkgOiB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXJ0X2F0OiB0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgICAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hY3RpdmVcbiAgICAgICAgICAgID8gKHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnN0YXJ0X2F0KVxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICB0aWNrKCkge1xuICAgICAgICB2YXIgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICBpZiAobmV3X3ZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFkKG51bSwgc2l6ZSkge1xuICAgICAgICB2YXIgcyA9IFwiMDAwMFwiICsgbnVtLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBzLnN1YnN0cihzLmxlbmd0aCAtIHNpemUpO1xuICAgIH1cbiAgICBnZXRTdHJWYWx1ZSgpIHtcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgdmFyIG0gPSAwLCBzID0gMDtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICBtID0gTWF0aC5mbG9vcih2YWwgLyAoNjAgKiAxMDAwKSk7XG4gICAgICAgIHZhbCAlPSA2MCAqIDEwMDA7XG4gICAgICAgIHMgPSBNYXRoLmZsb29yKHZhbCAvIDEwMDApO1xuICAgICAgICByZXR1cm4gbS50b1N0cmluZygpICsgJzonICsgdGhpcy5wYWQocywgMik7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RvcHdhdGNoXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXNldCBpZ25vcmUtcmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5yZXNldC5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnJlc2V0X3N0b3B3YXRjaFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gYnRuLXRvZ2dsZSBpZ25vcmUtcmVhZG9ubHlcIiArICh0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy50b2dnbGUuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlID8gXyhcInRhYmxldC5idXR0b25zLnN0b3Bfc3RvcHdhdGNoXCIpIDogXyhcInRhYmxldC5idXR0b25zLnN0YXJ0X3N0b3B3YXRjaFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdHJWYWx1ZSgpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuIl19
