"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResults = (function (_React$Component) {
    _inherits(TourResults, _React$Component);

    // Initialization

    function TourResults(props) {
        _classCallCheck(this, TourResults);

        _get(Object.getPrototypeOf(TourResults.prototype), "constructor", this).call(this, props);
        this.state = {
            name: "",
            results: [],
            finalized: true,
            judges: [],
            verbose: false
        };
        message_dispatcher.addListener("tour_results_changed reload_data", (function (message) {
            if (message.tour_id == this.props.tour_id) {
                this.loadData();
            }
        }).bind(this));
        this.loadData();
    }

    _createClass(TourResults, [{
        key: "loadData",
        value: function loadData() {
            Api("tournaments.tour.get_results", { tour_id: this.props.tour_id }).onSuccess((function (new_results) {
                this.setState(new_results);
            }).bind(this)).send();
        }

        // Control

    }, {
        key: "toggleVerbose",
        value: function toggleVerbose() {
            this.setState({
                verbose: !this.state.verbose
            });
        }

        // Rendering

    }, {
        key: "renderVerboseButton",
        value: function renderVerboseButton() {
            if (this.state.verbose) {
                return React.createElement(
                    "button",
                    { className: "btn btn-primary", onClick: this.toggleVerbose.bind(this) },
                    _("results.buttons.simple_view")
                );
            } else {
                return React.createElement(
                    "button",
                    { className: "btn btn-primary", onClick: this.toggleVerbose.bind(this) },
                    _("results.buttons.verbose_view")
                );
            }
        }
    }, {
        key: "renderNonFinalizedWarning",
        value: function renderNonFinalizedWarning() {
            if (!this.state.finalized) {
                return React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    _("results.alerts.not_finalized")
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            var active_judges = this.state.judges.filter(function (judge) {
                return judge.role !== "" && judge.role != "tech_judge"; // TODO: move this to scoring system
            });
            var table = null;
            if (this.state.verbose) {
                table = React.createElement(TourResultsVerboseTable, {
                    judges: active_judges,
                    data: this.state.results,
                    has_next_tour: this.state.next_tour_id != null,
                    scoring_system: this.state.scoring_system });
            } else {
                table = React.createElement(TourResultsTable, {
                    data: this.state.results,
                    has_next_tour: this.state.next_tour_id != null });
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
                        this.renderVerboseButton(),
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.createDocx.bind(this) },
                            "DOCX"
                        )
                    ),
                    React.createElement(
                        "h1",
                        null,
                        this.state.discipline_name
                    ),
                    React.createElement(
                        "h2",
                        null,
                        this.state.name
                    )
                ),
                React.createElement(
                    "div",
                    { className: "tour-results", ref: "content" },
                    this.renderNonFinalizedWarning(),
                    table
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("tour-results").setOrientation(this.state.verbose ? "landscape" : "portrait").setHeader(this.state.discipline_name).setSubheader(this.state.name).setBody(React.findDOMNode(this.refs.content).innerHTML).addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none").addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0").addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt").addStyle(".score-breakdown th", "text-align", "right").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown", "width", "50pt").addStyle(".total-score", "font-weight", "bold").save();
        }
    }]);

    return TourResults;
})(React.Component);
//# sourceMappingURL=tour_results.js.map