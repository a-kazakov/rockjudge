"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsButtons = (function (_React$Component) {
    _inherits(TourResultsButtons, _React$Component);

    function TourResultsButtons() {
        _classCallCheck(this, TourResultsButtons);

        _get(Object.getPrototypeOf(TourResultsButtons.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourResultsButtons, [{
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

    return TourResultsButtons;
})(React.Component);

var TourResultsBody = (function (_React$Component2) {
    _inherits(TourResultsBody, _React$Component2);

    // Initialization

    function TourResultsBody(props) {
        _classCallCheck(this, TourResultsBody);

        _get(Object.getPrototypeOf(TourResultsBody.prototype), "constructor", this).call(this, props);
        this.state = {
            tour: null,
            results: null
        };
        this.TOUR_SCHEMA = {
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
    }

    _createClass(TourResultsBody, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.storage = storage.getDomain("results_" + this.props.tour_id);
            this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.results_change_listener = message_dispatcher.addListener("tour_results_changed reload_data", (function (message) {
                if (!message || message.tour_id == this.props.tour_id) {
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
            storage.delDomain("results_" + this.props.tour_id);
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
            Api("tour.get_results", { tour_id: this.props.tour_id }).onSuccess((function (new_results) {
                this.setState({
                    "results": new_results
                });
                this.reloadFromStorage();
            }).bind(this)).send();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tour.get", { tour_id: this.props.tour_id, children: this.TOUR_SCHEMA }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
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
                    _("results.alerts.not_finalized")
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.tour === null || this.state.results === null) {
                return React.createElement(
                    "span",
                    null,
                    "Loading ..."
                );
            }
            var table = null;
            if (this.props.verbosity == "3") {
                table = React.createElement(TourResultsVerboseTable, this.state);
            } else if (this.props.verbosity == "2") {
                table = React.createElement(TourSemiVerboseResultsTable, this.state);
            } else {
                table = React.createElement(TourResultsTable, this.state);
            }
            return React.createElement(
                "div",
                { className: "tour-results", ref: "content" },
                this.renderNonFinalizedWarning(),
                table
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("tour-results").setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1(_("admin.headers.tour_results")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML).addStyle(".bordered-table", "font-size", this.props.verbosity == "1" ? "12pt" : "9pt").addStyle(".bordered-table .acro-table td", "font-size", "9pt").addStyle(".bordered-table .acro-table td", "padding", "0 3pt").addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none").addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0").addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt").addStyle(".score-breakdown th", "text-align", "right").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown", "width", "50pt").addStyle(".total-score", "font-weight", "bold").addStyle(".advances-header", "background-color", "#ddd").addStyle(".head_judge", "width", "5%").addStyle(".dance_judge", "width", "8%").addStyle(".acro_judge", "width", "8%").save();
        }
    }]);

    return TourResultsBody;
})(React.Component);
//# sourceMappingURL=results.js.map