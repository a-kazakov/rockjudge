"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresenterTablet = (function (_React$Component) {
    _inherits(PresenterTablet, _React$Component);

    // Intiialization

    function PresenterTablet(props) {
        _classCallCheck(this, PresenterTablet);

        _get(Object.getPrototypeOf(PresenterTablet.prototype), "constructor", this).call(this, props);
        this.state = {
            tour: null,
            current_heat: 1,
            active_tour_id: null
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("active_tour_update", this.dispatchActiveTourUpdate.bind(this));
        this.loadData();
    }

    _createClass(PresenterTablet, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var active_tour_id = this.state.active_tour_id;
            if (active_tour_id === null) {
                this.setState({
                    tour: null
                });
                return;
            }
            var active_tour_model = storage.get("Tour").by_id(active_tour_id);
            if (!active_tour_model) {
                this.setState({
                    tour: null
                });
                return;
            }
            this.setState({
                tour: active_tour_model.serialize({
                    runs: {
                        participant: {
                            "club": {},
                            "sportsmen": {}
                        }
                    },
                    discipline: {}
                })
            });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tour.find_active", {}).onSuccess((function (response) {
                this.dispatchActiveTourUpdate(response);
            }).bind(this)).send();
        }

        // Dispatchers

    }, {
        key: "dispatchActiveTourUpdate",
        value: function dispatchActiveTourUpdate(response) {
            var tour_id = response.tour_id;
            if (this.state.tour === null && tour_id === null || this.state.tour !== null && this.state.tour.id == tour_id) {
                return;
            }
            this.setState({
                "active_tour_id": tour_id
            });
            if (tour_id === null) {
                storage.del("Tour");
                storage.del("Run");
                storage.del("Participant");
                storage.del("Sportsman");
                storage.del("Club");
                storage.del("Discipline");
                this.setState({
                    tour: null,
                    current_heat: 1
                });
                return;
            }
            Api("tour.get", { tour_id: tour_id, children: {
                    runs: {
                        participant: {
                            "club": {}
                        }
                    },
                    discipline: {}
                } }).updateDB("Tour", tour_id).onSuccess((function () {
                this.reloadFromStorage(tour_id);
                this.setState({
                    current_heat: 1
                });
            }).bind(this)).send();
        }

        // Actions

    }, {
        key: "toPrevHeat",
        value: function toPrevHeat() {
            this.setState({
                current_heat: this.state.current_heat - 1
            });
        }
    }, {
        key: "toNextHeat",
        value: function toNextHeat() {
            this.setState({
                current_heat: this.state.current_heat + 1
            });
        }

        // Helpers

    }, {
        key: "getHeatsCount",
        value: function getHeatsCount() {
            return Math.max.apply(Math, _toConsumableArray(this.state.tour.runs.map(function (run) {
                return run.heat;
            })));
        }

        // Rendering

    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var btn_prev = null;
            var btn_next = null;
            if (this.state.tour !== null) {
                if (this.state.current_heat > 1) {
                    btn_prev = React.createElement(
                        "button",
                        _extends({ className: "btn btn-primary pull-left" }, onTouchOrClick(this.toPrevHeat.bind(this))),
                        _("tablet.buttons.prev_heat")
                    );
                }
                if (this.state.current_heat < this.getHeatsCount()) {
                    btn_next = React.createElement(
                        "button",
                        _extends({ className: "btn btn-primary pull-right" }, onTouchOrClick(this.toNextHeat.bind(this))),
                        _("tablet.buttons.next_heat")
                    );
                }
            }
            var current_tour = this.state.tour === null ? null : React.createElement(
                "div",
                { className: "header" },
                React.createElement(
                    "h1",
                    null,
                    this.state.tour.discipline.name,
                    ": ",
                    this.state.tour.name
                ),
                React.createElement(
                    "h2",
                    null,
                    _("tablet.headers.heat"),
                    ": ",
                    this.state.current_heat,
                    " / ",
                    this.getHeatsCount()
                )
            );
            return React.createElement(
                "header",
                null,
                btn_prev,
                btn_next,
                current_tour
            );
        }
    }, {
        key: "renderSplashScreen",
        value: function renderSplashScreen() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "a",
                        { className: "btn btn-primary pull-left", href: "/" },
                        _("tablet.buttons.to_start_page")
                    ),
                    React.createElement("div", { className: "clearfix" })
                ),
                React.createElement(
                    "div",
                    { className: "presenter-splash" },
                    _("tablet.headers.presenter")
                )
            );
        }
    }, {
        key: "renderHeat",
        value: function renderHeat(heat, is_current) {
            var runs = this.state.tour.runs.filter(function (run) {
                return run.heat == heat;
            });
            return React.createElement(
                "div",
                { className: "heat" + (is_current ? " current-heat" : "") },
                React.createElement(
                    "table",
                    { className: "outer" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            runs.map(function (run) {
                                return React.createElement(
                                    "td",
                                    { key: run.id },
                                    React.createElement(
                                        "table",
                                        null,
                                        React.createElement(
                                            "tbody",
                                            null,
                                            React.createElement(
                                                "tr",
                                                null,
                                                React.createElement(
                                                    "td",
                                                    { className: "number" },
                                                    run.participant.number
                                                )
                                            ),
                                            React.createElement(
                                                "tr",
                                                null,
                                                React.createElement(
                                                    "td",
                                                    { className: "name" },
                                                    run.participant.name
                                                )
                                            ),
                                            React.createElement(
                                                "tr",
                                                null,
                                                React.createElement(
                                                    "td",
                                                    { className: "club" },
                                                    run.participant.club.name
                                                )
                                            ),
                                            React.createElement(
                                                "tr",
                                                null,
                                                React.createElement(
                                                    "td",
                                                    { className: "city" },
                                                    run.participant.club.city
                                                )
                                            )
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            return React.createElement(
                "div",
                null,
                this.renderHeat(this.state.current_heat - 1, false),
                this.renderHeat(this.state.current_heat, true),
                this.renderHeat(this.state.current_heat + 1, false)
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.judge === null) {
                return React.createElement(
                    "p",
                    null,
                    "Loading ..."
                );
            }
            if (this.state.tour === null) {
                return this.renderSplashScreen();
            }
            return React.createElement(
                "div",
                null,
                this.renderHeader(),
                this.renderBody()
            );
        }
    }]);

    return PresenterTablet;
})(React.Component);
//# sourceMappingURL=presenter_tablet.js.map