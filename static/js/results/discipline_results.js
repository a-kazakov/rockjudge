"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineResultsButtons = (function (_React$Component) {
    _inherits(DisciplineResultsButtons, _React$Component);

    function DisciplineResultsButtons() {
        _classCallCheck(this, DisciplineResultsButtons);

        _get(Object.getPrototypeOf(DisciplineResultsButtons.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(DisciplineResultsButtons, [{
        key: "signal",
        value: function signal(message) {
            var _this = this;

            return (function () {
                console.log(message);_this.props.onSignal(message);
            }).bind(this);
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
})(React.Component);

var DisciplineResults = (function (_React$Component2) {
    _inherits(DisciplineResults, _React$Component2);

    // Initialization

    function DisciplineResults(props) {
        _classCallCheck(this, DisciplineResults);

        _get(Object.getPrototypeOf(DisciplineResults.prototype), "constructor", this).call(this, props);
        this.state = {
            loaded: false
        };
        this.runs_loaded = false;
    }

    _createClass(DisciplineResults, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.storage = storage.getDomain("discipline_results_" + this.props.tour_id);
            this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadState.bind(this));
            this.results_change_listener = message_dispatcher.addListener("tour_results_changed reload_data", (function (message) {
                if (!message) {
                    this.loadResults();
                    return;
                }
                var tour_storage = this.storage.get("Tour").by_id(message["tour_id"]);
                if (!tour_storage) {
                    return;
                }
                if (tour_storage.discipline.id == this.props.discipline_id) {
                    this.loadResults();
                }
            }).bind(this));
            this.loadData();
            this.loadResults();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            message_dispatcher.removeListener(this.reload_listener);
            message_dispatcher.removeListener(this.db_update_listener);
            message_dispatcher.removeListener(this.results_change_listener);
            storage.delDomain("discipline_results_" + this.props.tour_id);
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
            Api("discipline.get_results", {
                discipline_id: this.props.discipline_id
            }).onSuccess((function (response) {
                this.setState({
                    discipline_results: response
                });
                this.reloadState();
            }).bind(this)).send();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("discipline.get", {
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
            }).addToDB("Discipline", this.props.discipline_id, this.storage).onSuccess((function () {
                this.runs_loaded = true;
                this.reloadState(this);
            }).bind(this)).send();
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
        key: "render",
        value: function render() {
            if (!this.state.loaded) {
                return React.createElement(
                    "span",
                    null,
                    "Loading..."
                );
            }
            return React.createElement(
                "div",
                { className: "discipline-results" },
                React.createElement(DisciplineResultsTable, { table: this.state.table, ref: "main_table" })
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("discipline-results").setHeader(this.state.discipline.competition.name + ", " + this.state.discipline.competition.date).setTitle1(_("admin.headers.discipline_results")).setTitle3(this.state.discipline.name).setBody(ReactDOM.findDOMNode(this.refs.main_table).innerHTML).addStyle(".tour-name", "background", "#ddd").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%").save();
        }
    }]);

    return DisciplineResults;
})(React.Component);
//# sourceMappingURL=discipline_results.js.map