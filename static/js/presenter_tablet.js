"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresenterTabletLeftBar = (function (_React$Component) {
    _inherits(PresenterTabletLeftBar, _React$Component);

    function PresenterTabletLeftBar() {
        _classCallCheck(this, PresenterTabletLeftBar);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletLeftBar).apply(this, arguments));
    }

    _createClass(PresenterTabletLeftBar, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "left-bar" },
                React.createElement(
                    "div",
                    _extends({ className: "item" + (this.props.active == "info" ? " active" : "")
                    }, onTouchOrClick(function () {
                        return _this2.props.onPageSwitch("info");
                    })),
                    React.createElement(
                        "span",
                        null,
                        _("presenter.headers.info")
                    )
                ),
                React.createElement(
                    "div",
                    _extends({ className: "item" + (this.props.active == "heats" ? " active" : "")
                    }, onTouchOrClick(function () {
                        return _this2.props.onPageSwitch("heats");
                    })),
                    React.createElement(
                        "span",
                        null,
                        _("presenter.headers.heats")
                    )
                ),
                React.createElement(
                    "div",
                    _extends({ className: "item" + (this.props.active == "results" ? " active" : "")
                    }, onTouchOrClick(function () {
                        return _this2.props.onPageSwitch("results");
                    })),
                    React.createElement(
                        "span",
                        null,
                        _("presenter.headers.results")
                    )
                )
            );
        }
    }]);

    return PresenterTabletLeftBar;
})(React.Component);

var PresenterTabletInfoCompetitionInfo = (function (_React$Component2) {
    _inherits(PresenterTabletInfoCompetitionInfo, _React$Component2);

    function PresenterTabletInfoCompetitionInfo() {
        _classCallCheck(this, PresenterTabletInfoCompetitionInfo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletInfoCompetitionInfo).apply(this, arguments));
    }

    _createClass(PresenterTabletInfoCompetitionInfo, [{
        key: "renderRow",
        value: function renderRow(row, idx) {
            return React.createElement(
                "tr",
                { key: idx },
                React.createElement(
                    "th",
                    null,
                    row[0]
                ),
                React.createElement(
                    "td",
                    null,
                    row[1]
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "competition-info" },
                React.createElement(
                    "tbody",
                    null,
                    this.props.competition.info.map(this.renderRow.bind(this))
                )
            );
        }
    }]);

    return PresenterTabletInfoCompetitionInfo;
})(React.Component);

var PresenterTabletInfoJudges = (function (_React$Component3) {
    _inherits(PresenterTabletInfoJudges, _React$Component3);

    function PresenterTabletInfoJudges() {
        _classCallCheck(this, PresenterTabletInfoJudges);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletInfoJudges).apply(this, arguments));
    }

    _createClass(PresenterTabletInfoJudges, [{
        key: "renderRow",
        value: function renderRow(judge) {
            return React.createElement(
                "tr",
                { key: judge.id },
                React.createElement(
                    "th",
                    null,
                    judge.role_description || _("global.phrases.judge_n", judge.number)
                ),
                React.createElement(
                    "td",
                    null,
                    judge.name,
                    " — ",
                    judge.category
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "judges" },
                React.createElement(
                    "tbody",
                    null,
                    this.props.judges.map(this.renderRow.bind(this))
                )
            );
        }
    }]);

    return PresenterTabletInfoJudges;
})(React.Component);

var PresenterTabletInfoClubs = (function (_React$Component4) {
    _inherits(PresenterTabletInfoClubs, _React$Component4);

    function PresenterTabletInfoClubs() {
        _classCallCheck(this, PresenterTabletInfoClubs);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletInfoClubs).apply(this, arguments));
    }

    _createClass(PresenterTabletInfoClubs, [{
        key: "renderRow",
        value: function renderRow(city) {
            return React.createElement(
                "tr",
                { key: city.name },
                React.createElement(
                    "th",
                    null,
                    city.name
                ),
                React.createElement(
                    "td",
                    null,
                    city.clubs.map(function (club) {
                        return React.createElement(
                            "div",
                            { key: club.id },
                            club.name
                        );
                    })
                )
            );
        }
    }, {
        key: "regroupClubs",
        value: function regroupClubs() {
            var cities = {};
            this.props.clubs.forEach(function (club) {
                if (!cities[club.city]) {
                    cities[club.city] = [];
                }
                cities[club.city].push(club);
            });
            return Object.keys(cities).map(function (city) {
                return {
                    name: city,
                    clubs: cities[city]
                };
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "judges" },
                React.createElement(
                    "tbody",
                    null,
                    this.regroupClubs().map(this.renderRow.bind(this))
                )
            );
        }
    }]);

    return PresenterTabletInfoClubs;
})(React.Component);

var PresenterTabletInfo = (function (_React$Component5) {
    _inherits(PresenterTabletInfo, _React$Component5);

    function PresenterTabletInfo() {
        _classCallCheck(this, PresenterTabletInfo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletInfo).apply(this, arguments));
    }

    _createClass(PresenterTabletInfo, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "info" },
                React.createElement(
                    "h2",
                    null,
                    this.props.competition.name
                ),
                React.createElement(PresenterTabletInfoCompetitionInfo, { competition: this.props.competition }),
                React.createElement(
                    "h3",
                    null,
                    _("presenter.headers.judges")
                ),
                React.createElement(PresenterTabletInfoJudges, { judges: this.props.competition.judges }),
                React.createElement(
                    "h3",
                    null,
                    _("presenter.headers.clubs")
                ),
                React.createElement(PresenterTabletInfoClubs, { clubs: this.props.competition.clubs })
            );
        }
    }]);

    return PresenterTabletInfo;
})(React.Component);

var PresenterTabletHeats = (function (_React$Component6) {
    _inherits(PresenterTabletHeats, _React$Component6);

    // Intiialization

    function PresenterTabletHeats(props) {
        _classCallCheck(this, PresenterTabletHeats);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletHeats).call(this, props));

        _this7.state = {
            tour: null,
            current_heat: 1,
            active_tour_id: null
        };
        message_dispatcher.addListener("db_update", _this7.reloadFromStorage.bind(_this7));
        message_dispatcher.addListener("reload_data", _this7.loadData.bind(_this7));
        message_dispatcher.addListener("active_tour_update", _this7.dispatchActiveTourUpdate.bind(_this7));
        _this7.loadData();
        return _this7;
    }

    _createClass(PresenterTabletHeats, [{
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
                } }).addToDB("Tour", tour_id).onSuccess((function () {
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
            var _Math;

            return (_Math = Math).max.apply(_Math, _toConsumableArray(this.state.tour.runs.map(function (run) {
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
                    this.state.tour.discipline.name
                ),
                React.createElement(
                    "h2",
                    null,
                    this.state.tour.name
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
                { className: "splash-screen" },
                React.createElement(
                    "div",
                    null,
                    _("presenter.labels.no_active_tour")
                ),
                React.createElement("div", { className: "spacer" })
            );
        }
    }, {
        key: "renderHeat",
        value: function renderHeat() {
            var _this8 = this;

            var runs = this.state.tour.runs.filter(function (run) {
                return run.heat == _this8.state.current_heat;
            });
            return React.createElement(
                "div",
                { className: "heat" },
                React.createElement(
                    "h3",
                    null,
                    _("tablet.headers.heat"),
                    ": ",
                    this.state.current_heat,
                    " / ",
                    this.getHeatsCount()
                ),
                runs.map(function (run) {
                    return React.createElement(
                        "table",
                        { key: run.id },
                        React.createElement(
                            "tbody",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    { className: "number", rowSpan: "2" },
                                    run.participant.number
                                ),
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
                                    run.participant.club.name,
                                    ", ",
                                    run.participant.club.city
                                )
                            )
                        )
                    );
                }),
                React.createElement("div", { className: "spacer" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.judge === null) {
                return React.createElement(Loader, null);
            }
            if (this.state.tour === null) {
                return React.createElement(
                    "div",
                    { className: "heats" },
                    this.renderSplashScreen()
                );
            }
            return React.createElement(
                "div",
                { className: "heats" },
                this.renderHeader(),
                this.renderHeat()
            );
        }
    }]);

    return PresenterTabletHeats;
})(React.Component);

var PresenterTabletResultsDisciplineSelector = (function (_React$Component7) {
    _inherits(PresenterTabletResultsDisciplineSelector, _React$Component7);

    function PresenterTabletResultsDisciplineSelector() {
        _classCallCheck(this, PresenterTabletResultsDisciplineSelector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletResultsDisciplineSelector).apply(this, arguments));
    }

    _createClass(PresenterTabletResultsDisciplineSelector, [{
        key: "render",
        value: function render() {
            var _this10 = this;

            return React.createElement(
                "div",
                { className: "disciplines" },
                this.props.disciplines.map(function (discipline) {
                    return React.createElement(
                        "div",
                        _extends({ className: "item" + (_this10.props.active === discipline.id ? " active" : ""),
                            key: discipline.id
                        }, onTouchOrClick(function () {
                            return _this10.props.onDisciplineChange(discipline.id);
                        })),
                        discipline.name
                    );
                })
            );
        }
    }]);

    return PresenterTabletResultsDisciplineSelector;
})(React.Component);

var PresenterTabletResults = (function (_React$Component8) {
    _inherits(PresenterTabletResults, _React$Component8);

    function PresenterTabletResults(props) {
        _classCallCheck(this, PresenterTabletResults);

        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTabletResults).call(this, props));

        _this11.state = {
            active_discipline: null
        };
        return _this11;
    }

    _createClass(PresenterTabletResults, [{
        key: "render",
        value: function render() {
            var _this12 = this;

            return React.createElement(
                "div",
                { className: "results" },
                React.createElement(PresenterTabletResultsDisciplineSelector, {
                    active: this.state.active_discipline,
                    disciplines: this.props.competition.disciplines,
                    onDisciplineChange: function onDisciplineChange(new_discipline) {
                        return _this12.setState({ active_discipline: new_discipline });
                    } }),
                this.state.active_discipline !== null ? React.createElement(DisciplineResults, { discipline_id: this.state.active_discipline,
                    renderer: "presenter",
                    key: this.state.active_discipline }) : React.createElement("div", { className: "discipline-results" })
            );
        }
    }]);

    return PresenterTabletResults;
})(React.Component);

var PresenterTablet = (function (_React$Component9) {
    _inherits(PresenterTablet, _React$Component9);

    function PresenterTablet(props) {
        _classCallCheck(this, PresenterTablet);

        var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(PresenterTablet).call(this, props));

        _this13.state = {
            page: "info",
            competition: null
        };
        message_dispatcher.addListener("db_update", _this13.reloadFromStorage.bind(_this13));
        message_dispatcher.addListener("reload_data", _this13.loadData.bind(_this13));
        _this13.loadData();
        return _this13;
    }

    _createClass(PresenterTablet, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            this.setState({
                "competition": storage.get("Competition").by_id(this.props.competition_id).serialize({
                    clubs: {},
                    disciplines: {},
                    judges: {}
                })
            });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("competition.get", { competition_id: this.props.competition_id, children: {
                    clubs: {},
                    disciplines: {},
                    judges: {}
                } }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "switchPage",
        value: function switchPage(new_page) {
            this.setState({
                page: new_page
            });
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            if (this.state.competition === null) {
                return React.createElement(Loader, null);
            }
            switch (this.state.page) {
                case "info":
                    return React.createElement(PresenterTabletInfo, { competition: this.state.competition });
                case "heats":
                    return React.createElement(PresenterTabletHeats, null);
                case "results":
                    return React.createElement(PresenterTabletResults, { competition: this.state.competition });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "presenter-tablet" },
                React.createElement(PresenterTabletLeftBar, {
                    active: this.state.page,
                    onPageSwitch: this.switchPage.bind(this) }),
                React.createElement(
                    "div",
                    { className: "content" },
                    this.renderBody()
                )
            );
        }
    }]);

    return PresenterTablet;
})(React.Component);
//# sourceMappingURL=presenter_tablet.js.map