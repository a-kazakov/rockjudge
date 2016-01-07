"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsButtons = (function (_React$Component) {
    _inherits(HeatsButtons, _React$Component);

    function HeatsButtons() {
        _classCallCheck(this, HeatsButtons);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HeatsButtons).apply(this, arguments));
    }

    _createClass(HeatsButtons, [{
        key: "signal",
        value: function signal(message) {
            var _this2 = this;

            return (function () {
                return _this2.props.onSignal(message);
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

    return HeatsButtons;
})(React.Component);

var HeatsBody = (function (_React$Component2) {
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

            this.storage = storage.getDomain("heats_" + this.props.tour_id);
            this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.loadData();
            if (this.props.autoDocx) {
                (function () {
                    var interval_id = setInterval(function () {
                        if (_this4.refs.printable_heats) {
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
            message_dispatcher.removeListener(this.reload_listener);
            message_dispatcher.removeListener(this.db_update_listener);
            storage.delDomain("heats_" + this.props.tour_id);
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
            Api("tour.get", {
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
            var need_render = typeof prev_row == "undefined" || prev_row.heat != next_row.heat;
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
                        _("global.phrases.heat_n", next_row.heat)
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
            if (this.state.tour === null) {
                return React.createElement(Loader, null);
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
                                    _("judging.labels.number")
                                )
                            ),
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.participant_name")
                                )
                            ),
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.club")
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
            return React.createElement(Printable, {
                header: this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date,
                title1: _("admin.headers.tour_heats"),
                title2: this.state.tour.discipline.name,
                title3: this.state.tour.name,
                body: body,
                ref: "printable" });
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-heats.docx" : arguments[0];

            Docx(filename).setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1(_("admin.headers.tour_heats")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(this.refs.printable.fetchPrintableData()).addStyle(".heat-number", "background", "#ccc").addStyle(".heat-number", "text-align", "left").addStyle("td, th", "font-size", "12pt").save();
        }
    }]);

    return HeatsBody;
})(React.Component);
//# sourceMappingURL=heats.js.map