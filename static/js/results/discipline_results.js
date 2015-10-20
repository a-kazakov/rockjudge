"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineResults = (function (_React$Component) {
    _inherits(DisciplineResults, _React$Component);

    // Initialization

    function DisciplineResults(props) {
        _classCallCheck(this, DisciplineResults);

        _get(Object.getPrototypeOf(DisciplineResults.prototype), "constructor", this).call(this, props);
        this.state = {
            loaded: false
        };
        this.runs_loaded = false;
        message_dispatcher.addListener("db_update", this.reloadState.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("tour_results_changed", (function (data) {
            var tour_storage = storage.get("Tour").by_id(data["tour_id"]);
            if (!tour_storage) {
                return;
            }
            if (tour_storage.discipline.id == this.props.discipline_id) {
                this.loadResults();
            }
        }).bind(this));
        this.loadData();
    }

    _createClass(DisciplineResults, [{
        key: "reloadState",
        value: function reloadState() {
            if (!this.state.discipline_results) {
                return;
            }
            if (!this.runs_loaded) {
                return;
            }
            var storage_runs = storage.get("Run");
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
                discipline: storage.get("Discipline").by_id(this.props.discipline_id).serialize({})
            });
        }
    }, {
        key: "loadResults",
        value: function loadResults() {
            Api("tournaments.discipline.get_results", {
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
            Api("tournaments.discipline.get", {
                discipline_id: this.props.discipline_id,
                children: {
                    tours: {
                        runs: {
                            participant: {
                                sportsmen: {},
                                club: {}
                            }
                        }
                    }
                }
            }).updateDB("Discipline", this.props.discipline_id).onSuccess((function () {
                this.runs_loaded = true;
                this.reloadState(this);
            }).bind(this)).send();
            this.loadResults();
        }
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
            if (this.props.table_only) {
                return React.createElement(DisciplineResultsTable, { table: this.state.table });
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "div",
                        { className: "controls" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.createDocx.bind(this) },
                            "DOCX"
                        )
                    ),
                    React.createElement(
                        "h1",
                        null,
                        this.state.discipline.name
                    )
                ),
                React.createElement(DisciplineResultsTable, { table: this.state.table, ref: "main_table" })
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("discipline-results").setHeader(this.state.discipline.name).setSubheader(_("admin.headers.discipline_results")).setBody(React.findDOMNode(this.refs.main_table).innerHTML).addStyle(".tour-name", "background", "#ccc").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%").save();
        }
    }]);

    return DisciplineResults;
})(React.Component);
//# sourceMappingURL=discipline_results.js.map