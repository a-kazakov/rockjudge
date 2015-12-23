"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrinterTableCell = (function (_React$Component) {
    _inherits(PrinterTableCell, _React$Component);

    function PrinterTableCell() {
        _classCallCheck(this, PrinterTableCell);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PrinterTableCell).apply(this, arguments));
    }

    _createClass(PrinterTableCell, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "td",
                null,
                React.createElement("input", {
                    type: "text",
                    value: this.props.value,
                    onChange: function onChange(e) {
                        return _this2.props.onChange(e.target.value.replace(/[^\d]/, ""));
                    } })
            );
        }
    }]);

    return PrinterTableCell;
})(React.Component);

var PrinterTableRow = (function (_React$Component2) {
    _inherits(PrinterTableRow, _React$Component2);

    function PrinterTableRow() {
        _classCallCheck(this, PrinterTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PrinterTableRow).apply(this, arguments));
    }

    _createClass(PrinterTableRow, [{
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
                this.props.possibleActions.map(function (action) {
                    return React.createElement(PrinterTableCell, {
                        value: _this4.props.row[action] || "",
                        onChange: _this4.onChange.bind(_this4, action) });
                })
            );
        }
    }]);

    return PrinterTableRow;
})(React.Component);

var PrinterTable = (function (_React$Component3) {
    _inherits(PrinterTable, _React$Component3);

    function PrinterTable() {
        _classCallCheck(this, PrinterTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PrinterTable).apply(this, arguments));
    }

    _createClass(PrinterTable, [{
        key: "onChange",
        value: function onChange(idx, new_value) {
            var new_tours = clone(this.props.tours);
            new_tours[idx] = new_value;
            this.props.onChange(new_tours);
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
                    this.props.tours.forEach(function (tour, idx) {
                        return React.createElement(PrinterTableRow, {
                            row: actions[tour.id] || {},
                            possibleActions: _this6.props.possibleActions,
                            onChange: _this6.onChange.bind(_this6, idx) });
                    })
                )
            );
        }
    }]);

    return PrinterTable;
})(React.Component);

var Printer = (function (_React$Component4) {
    _inherits(Printer, _React$Component4);

    function Printer(props) {
        _classCallCheck(this, Printer);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Printer).call(this, props));

        _this7.state = {
            competition: null
        };
        _this7.SCHEMA = {
            disciplines: {
                tours: {}
            }
        };
        return _this7;
    }

    _createClass(Printer, [{
        key: "loadData",
        value: function loadData() {
            Api("competition.get", { competition_id: this.props.competition_id, children: this.SCHEMA }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var new_competition = storage.get("Competition").by_id(competition);
            if (!new_competition) {
                return;
            }
            new_competition = new_competition.serialize(this.SCHEMA);
            this.dispatchCompetitionUpdate(this.state.competition, new_competition);
            this.setState({
                competition: new_competition
            });
        }
    }, {
        key: "getToursFromCompetition",
        value: function getToursFromCompetition(competition) {
            var result = {};
            competition.disciplines.forEach(function (discipline) {
                return discipline.tours.forEach(function (tour) {
                    return result[tour.id] = tour;
                });
            });
        }
    }, {
        key: "dispatchCompetitionUpdate",
        value: function dispatchCompetitionUpdate(old_competition, new_competition) {
            var _this8 = this;

            var old_tours = this.getToursFromCompetition(old_competition);
            var new_tours = this.getToursFromCompetition(new_competition);
            Object.keys(old_tours).forEach(function (tour_id) {
                if (!new_tours[tour_id]) {
                    return;
                }
                if (!old_tours[tour_id].finalized && new_tours[tour_id].finalized) {
                    _this8.doActionsForTour(new_tours[tour_id]);
                }
            });
        }
    }, {
        key: "doActionsForTour",
        value: function doActionsForTour(tour) {
            console.log("PRINT", tour);
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.competition) {
                return React.createElement(Loader, null);
            }
            return React.createElement("div", { className: "autoprinter" });
        }
    }]);

    return Printer;
})(React.Component);
//# sourceMappingURL=printer.js.map