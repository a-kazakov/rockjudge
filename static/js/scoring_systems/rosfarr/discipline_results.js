"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

var DisciplineResultsTable = (function (_React$Component) {
    _inherits(DisciplineResultsTable, _React$Component);

    function DisciplineResultsTable() {
        _classCallCheck(this, DisciplineResultsTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsTable).apply(this, arguments));
    }

    _createClass(DisciplineResultsTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
            var need_render = typeof prev_row == "undefined" || prev_row.run.tour.id != next_row.run.tour.id;
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
        }
    }, {
        key: "renderRow",
        value: function renderRow(row) {
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
                            return [c.trim(), React.createElement("br", null)];
                        })
                    )
                )
            );
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = 0; i < table.length; ++i) {
                var header = this.renderRowHeader(table[i - 1], table[i]);
                header && result.push(header);
                result.push(this.renderRow(table[i]));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ic-results" },
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
        }
    }]);

    return DisciplineResultsTable;
})(React.Component);

var DisciplineResultsPresenterTableRow = (function (_React$Component2) {
    _inherits(DisciplineResultsPresenterTableRow, _React$Component2);

    function DisciplineResultsPresenterTableRow(props) {
        _classCallCheck(this, DisciplineResultsPresenterTableRow);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsPresenterTableRow).call(this, props));

        _this2.state = {
            active: false
        };
        return _this2;
    }

    _createClass(DisciplineResultsPresenterTableRow, [{
        key: "toggleActive",
        value: function toggleActive() {
            this.setState({
                active: !this.state.active
            });
        }
    }, {
        key: "render",
        value: function render() {
            var p = this.props.participant;
            return React.createElement(
                "table",
                _extends({ className: "row" + (this.state.active ? " active" : "")
                }, onTouchEndOrClick(this.toggleActive.bind(this))),
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
                                    _("presenter.labels.place")
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
        }
    }]);

    return DisciplineResultsPresenterTableRow;
})(React.Component);

var DisciplineResultsPresenterTable = (function (_React$Component3) {
    _inherits(DisciplineResultsPresenterTable, _React$Component3);

    function DisciplineResultsPresenterTable() {
        _classCallCheck(this, DisciplineResultsPresenterTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsPresenterTable).apply(this, arguments));
    }

    _createClass(DisciplineResultsPresenterTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
            var need_render = typeof prev_row == "undefined" || prev_row.run.tour.id != next_row.run.tour.id;
            if (!need_render) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "tour-name", key: "H" + next_row.run.id },
                next_row.run.tour.name
            );
        }
    }, {
        key: "renderRow",
        value: function renderRow(row) {
            return React.createElement(DisciplineResultsPresenterTableRow, { key: "R" + row.run.id,
                participant: row.run.participant,
                place: row.place });
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = table.length - 1; i >= 0; --i) {
                var header = this.renderRowHeader(table[i + 1], table[i]);
                header && result.push(header);
                result.push(this.renderRow(table[i]));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderRows()
            );
        }
    }]);

    return DisciplineResultsPresenterTable;
})(React.Component);

var DisciplineResultsScreenOperatorTableRow = (function (_React$Component4) {
    _inherits(DisciplineResultsScreenOperatorTableRow, _React$Component4);

    function DisciplineResultsScreenOperatorTableRow() {
        _classCallCheck(this, DisciplineResultsScreenOperatorTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsScreenOperatorTableRow).apply(this, arguments));
    }

    _createClass(DisciplineResultsScreenOperatorTableRow, [{
        key: "render",
        value: function render() {
            var p = this.props.participant;
            return React.createElement(
                "table",
                _extends({ className: "row" + (this.props.selected ? " selected" : "")
                }, onTouchEndOrClick(this.props.onClick)),
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
                                    _("presenter.labels.place")
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
        }
    }]);

    return DisciplineResultsScreenOperatorTableRow;
})(React.Component);

var DisciplineResultsScreenOperatorTable = (function (_React$Component5) {
    _inherits(DisciplineResultsScreenOperatorTable, _React$Component5);

    function DisciplineResultsScreenOperatorTable() {
        _classCallCheck(this, DisciplineResultsScreenOperatorTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsScreenOperatorTable).apply(this, arguments));
    }

    _createClass(DisciplineResultsScreenOperatorTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
            var need_render = typeof prev_row == "undefined" || prev_row.run.tour.id != next_row.run.tour.id;
            if (!need_render) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "tour-name", key: "H" + next_row.run.id },
                next_row.run.tour.name
            );
        }
    }, {
        key: "renderRow",
        value: function renderRow(row, place) {
            var _this6 = this;

            return React.createElement(DisciplineResultsScreenOperatorTableRow, {
                key: "R" + row.run.id,
                participant: row.run.participant,
                place: row.place,
                onClick: function onClick() {
                    return _this6.props.onPlaceSelect(place);
                },
                selected: this.props.selectedPlace !== null && place >= this.props.selectedPlace });
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = table.length - 1; i >= 0; --i) {
                var header = this.renderRowHeader(table[i + 1], table[i]);
                header && result.push(header);
                result.push(this.renderRow(table[i], i + 1));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderRows()
            );
        }
    }]);

    return DisciplineResultsScreenOperatorTable;
})(React.Component);
//# sourceMappingURL=discipline_results.js.map