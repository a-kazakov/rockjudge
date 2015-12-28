"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoPrinterTableCell = (function (_React$Component) {
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
})(React.Component);

var AutoPrinterTableRow = (function (_React$Component2) {
    _inherits(AutoPrinterTableRow, _React$Component2);

    function AutoPrinterTableRow() {
        _classCallCheck(this, AutoPrinterTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterTableRow).apply(this, arguments));
    }

    _createClass(AutoPrinterTableRow, [{
        key: "onChange",
        value: function onChange(action, new_value) {
            var new_row = clone(this.props.row);
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
})(React.Component);

var AutoPrinterTable = (function (_React$Component3) {
    _inherits(AutoPrinterTable, _React$Component3);

    function AutoPrinterTable() {
        _classCallCheck(this, AutoPrinterTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinterTable).apply(this, arguments));
    }

    _createClass(AutoPrinterTable, [{
        key: "onChange",
        value: function onChange(tour_id, new_value) {
            var new_actions = clone(this.props.actions);
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
                            _("admin.auto_printer.discipline")
                        ),
                        React.createElement(
                            "th",
                            null,
                            _("admin.auto_printer.heats")
                        ),
                        React.createElement(
                            "th",
                            null,
                            _("admin.auto_printer.results_1")
                        ),
                        React.createElement(
                            "th",
                            null,
                            _("admin.auto_printer.results_2")
                        ),
                        React.createElement(
                            "th",
                            null,
                            _("admin.auto_printer.results_3")
                        ),
                        React.createElement(
                            "th",
                            null,
                            _("admin.auto_printer.discipline_results")
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
})(React.Component);

var AutoPrinterJobQueue = (function (_React$Component4) {
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
            var new_queue = clone(this.state.queue);
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
            this.setState({
                queue: this.state.queue.slice(1),
                nowRendering: job
            });
            this.timer = setTimeout(this.retryJob.bind(this), 10000);
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
            var job = this.state.nowRendering;
            var xhr = new XMLHttpRequest();
            var address = "http://127.0.0.1:5949/print-docx?filename=" + filename + "&copies=" + job.copies;
            xhr.open("GET", address, true);
            xhr.onload = function () {};
            xhr.onerror = function () {
                return _this9.addJob(job.type, job.tour, job.copies);
            };
            xhr.send();
            this.setState({
                nowRendering: null
            });
            this.scheduleJob();
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
                    return React.createElement(HeatsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "results_1":
                    return React.createElement(TourResultsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        verbosity: "1",
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "results_2":
                    return React.createElement(TourResultsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        verbosity: "2",
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "results_3":
                    return React.createElement(TourResultsBody, {
                        tour_id: this.state.nowRendering.tour.id,
                        verbosity: "3",
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                case "discipline_results":
                    return React.createElement(DisciplineResults, {
                        discipline_id: this.state.nowRendering.tour.discipline.id,
                        autoDocx: { filename: this.createFilename(), callback: this.continueJob.bind(this) } });
                default:
                    console.error("Invalid job type:", this.state.nowRendering.type);
            }
            return null;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.queue.length == 0) {
                return React.createElement(
                    "div",
                    { className: "queue queue-empty" },
                    _("admin.auto_printer.queue_empty"),
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
                            item.tour.discipline.name + " — " + item.tour.name
                        ),
                        React.createElement(
                            "div",
                            { className: "type" },
                            _("admin.auto_printer." + item.type)
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
})(React.Component);

var AutoPrinter = (function (_React$Component5) {
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
            this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.reload_data_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            message_dispatcher.removeListener(this.db_update_listener);
            message_dispatcher.removeListener(this.reload_data_listener);
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("competition.get", { competition_id: this.props.competition_id, children: this.SCHEMA }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var new_competition = storage.get("Competition").by_id(this.props.competition_id);
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
        key: "getToursFromCompetition",
        value: function getToursFromCompetition(competition) {
            var result = [];
            competition.disciplines.forEach(function (discipline) {
                return discipline.tours.forEach(function (tour) {
                    var r = clone(tour);
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
            var _this11 = this;

            var old_tours = this.getToursMap(this.getToursFromCompetition(old_competition));
            var new_tours = this.getToursMap(this.getToursFromCompetition(new_competition));
            Object.keys(old_tours).forEach(function (tour_id) {
                if (!new_tours[tour_id]) {
                    return;
                }
                if (!old_tours[tour_id].finalized && new_tours[tour_id].finalized) {
                    _this11.doActionsForTour(new_tours[tour_id]);
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
                    if (d_tour.id == tour.id) {
                        found = true;
                    } else if (found) {
                        var r = clone(d_tour);
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
            if (action_type == "heats") {
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
            var _this12 = this;

            var actions = this.state.actions[tour.id];
            if (!actions) {
                return;
            }
            this.POSSIBLE_ACTIONS.forEach(function (action_type) {
                if (actions[action_type]) {
                    _this12.doTheJob(tour, action_type, actions[action_type]);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this13 = this;

            if (!this.state.competition) {
                return React.createElement(Loader, null);
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
                        _("admin.headers.auto_printer")
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
                            _("admin.auto_printer.rules")
                        ),
                        React.createElement(AutoPrinterTable, {
                            tours: this.getToursFromCompetition(this.state.competition),
                            actions: this.state.actions,
                            onChange: function onChange(new_actions) {
                                return _this13.setState({ actions: new_actions });
                            },
                            possibleActions: this.POSSIBLE_ACTIONS })
                    ),
                    React.createElement(
                        "div",
                        { className: "section-queue" },
                        React.createElement(
                            "h3",
                            null,
                            _("admin.auto_printer.queue")
                        ),
                        React.createElement(AutoPrinterJobQueue, { ref: "queue" })
                    )
                )
            );
        }
    }]);

    return AutoPrinter;
})(React.Component);
//# sourceMappingURL=auto_printer.js.map