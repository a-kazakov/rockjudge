"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsTable = (function (_React$Component) {
    _inherits(HeatsTable, _React$Component);

    function HeatsTable() {
        _classCallCheck(this, HeatsTable);

        _get(Object.getPrototypeOf(HeatsTable.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HeatsTable, [{
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
                    { className: "w-50" },
                    React.createElement(
                        "p",
                        null,
                        row.participant.name
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-42" },
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
            var runs = this.props.runs;
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
            return React.createElement(
                "div",
                { className: "print-only", ref: "printable_heats" },
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
                                { className: "w-46" },
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.participant_name")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-46" },
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
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            console.log(this.props.discipline);
            Docx("tour-heats").setHeader(this.props.discipline.competition.name + ", " + this.props.discipline.competition.date).setTitle1(_("admin.headers.tour_heats")).setTitle2(this.props.discipline.name).setTitle3(this.props.name).setBody(ReactDOM.findDOMNode(this.refs.printable_heats).innerHTML).addStyle(".heat-number", "background", "#ccc").addStyle(".heat-number", "text-align", "left").addStyle("td, th", "font-size", "12pt").save();
        }
    }]);

    return HeatsTable;
})(React.Component);
//# sourceMappingURL=heats.js.map