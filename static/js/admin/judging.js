"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionSchema = (function (_React$Component) {
    _inherits(CompetitionSchema, _React$Component);

    function CompetitionSchema(props) {
        _classCallCheck(this, CompetitionSchema);

        _get(Object.getPrototypeOf(CompetitionSchema.prototype), "constructor", this).call(this, props);
    }

    _createClass(CompetitionSchema, [{
        key: "activateTour",
        value: function activateTour(tour_id) {
            this.props.updateTourId(tour_id);
        }
    }, {
        key: "renderTour",
        value: function renderTour(tour) {
            var className = "level-2" + (tour.finalized ? " grey" : "") + (tour.id == this.props.current_tour_id ? " active" : "");
            return React.createElement(
                "div",
                { className: className, onClick: this.activateTour.bind(this, tour.id), key: tour.id },
                tour.name
            );
        }
    }, {
        key: "renderDiscipline",
        value: function renderDiscipline(ic) {
            return React.createElement(
                "details",
                { className: "block", key: ic.id },
                React.createElement(
                    "summary",
                    { className: "level-1" },
                    ic.name
                ),
                ic.tours.map(this.renderTour.bind(this))
            );
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.props.disciplines.map((function (ic) {
                return this.renderDiscipline(ic);
            }).bind(this));
            return React.createElement(
                "div",
                { className: "noselect" },
                data
            );
        }
    }]);

    return CompetitionSchema;
})(React.Component);

var JudgingUI = (function (_React$Component2) {
    _inherits(JudgingUI, _React$Component2);

    function JudgingUI(props) {
        _classCallCheck(this, JudgingUI);

        _get(Object.getPrototypeOf(JudgingUI.prototype), "constructor", this).call(this, props);
        this.state = {
            tour_id: this.getTourIdFromHash()
        };
    }

    _createClass(JudgingUI, [{
        key: "updateTourId",
        value: function updateTourId(new_tour_id) {
            this.setState({
                tour_id: new_tour_id
            });
            window.location.hash = "#judging/" + new_tour_id;
        }
    }, {
        key: "getTourIdFromHash",
        value: function getTourIdFromHash(app) {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[1] && /^\d$/.test(chunks[1])) {
                return parseInt(chunks[1]);
            }
            return null;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "app-content" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "side-panel" },
                            React.createElement(
                                "div",
                                { className: "scroller" },
                                React.createElement(CompetitionSchema, {
                                    disciplines: this.props.disciplines,
                                    updateTourId: this.updateTourId.bind(this),
                                    current_tour_id: this.state.tour_id })
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            this.state.tour_id === null ? React.createElement("br", null) : React.createElement("iframe", { className: "judging-frame", src: "/tour/" + this.state.tour_id })
                        )
                    )
                )
            );
        }
    }]);

    return JudgingUI;
})(React.Component);
//# sourceMappingURL=judging.js.map