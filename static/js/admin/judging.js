"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionSchema = (function (_React$Component) {
    _inherits(CompetitionSchema, _React$Component);

    function CompetitionSchema(props) {
        _classCallCheck(this, CompetitionSchema);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CompetitionSchema).call(this, props));

        _this.state = {
            sort_by_plan: !!parseInt(sessionStorage["sort_by_plan"])
        };
        return _this;
    }

    _createClass(CompetitionSchema, [{
        key: "activateTour",
        value: function activateTour(tour) {
            this.props.updateTour(tour.id);
        }
    }, {
        key: "switchToPlan",
        value: function switchToPlan() {
            this.setState({
                sort_by_plan: true
            });
            sessionStorage["sort_by_plan"] = "1";
        }
    }, {
        key: "switchToDisciplines",
        value: function switchToDisciplines() {
            this.setState({
                sort_by_plan: false
            });
            sessionStorage["sort_by_plan"] = "0";
        }
    }, {
        key: "renderTour",
        value: function renderTour(tour) {
            var discipline_name = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var className = "level-2" + (tour.finalized ? " grey" : "") + (tour.id == this.props.current_tour_id ? " active" : "");
            return React.createElement(
                "div",
                { className: className, onClick: this.activateTour.bind(this, tour), key: tour.id },
                discipline_name ? React.createElement(
                    "small",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        discipline_name
                    ),
                    React.createElement("br", null)
                ) : null,
                tour.name
            );
        }
    }, {
        key: "renderDiscipline",
        value: function renderDiscipline(ic) {
            var _this2 = this;

            return React.createElement(
                "details",
                { className: "block", key: ic.id, open: !!parseInt(sessionStorage.getItem("D_J_" + ic.id)) },
                React.createElement(
                    "summary",
                    { className: "level-1", onClick: function onClick(e) {
                            return sessionStorage.setItem("D_J_" + ic.id, e.target.parentNode.open ? 0 : 1);
                        } },
                    ic.name
                ),
                ic.tours.map(function (tour) {
                    return _this2.renderTour(tour);
                })
            );
        }
    }, {
        key: "renderByDiscipline",
        value: function renderByDiscipline() {
            var data = this.props.disciplines.map((function (ic) {
                return this.renderDiscipline(ic);
            }).bind(this));
            return React.createElement(
                "div",
                { className: "noselect" },
                data
            );
        }
    }, {
        key: "renderByPlan",
        value: function renderByPlan() {
            var _this3 = this;

            var tours = {};
            this.props.disciplines.forEach(function (discipline) {
                return discipline.tours.forEach(function (tour) {
                    return tours[tour.id] = {
                        tour: tour,
                        discipline_name: discipline.name
                    };
                });
            });
            var result = this.props.competition_plan.filter(function (item) {
                return item.tour_id !== null;
            }).map(function (item) {
                return _this3.renderTour(tours[item.tour_id].tour, tours[item.tour_id].discipline_name);
            });
            return React.createElement(
                "div",
                null,
                result
            );
        }
    }, {
        key: "renderList",
        value: function renderList() {
            return React.createElement(
                "div",
                null,
                this.state.sort_by_plan ? this.renderByPlan() : this.renderByDiscipline()
            );
        }
    }, {
        key: "renderButton",
        value: function renderButton() {
            return this.state.sort_by_plan ? React.createElement(
                "button",
                { className: "btn btn-default btn-sm full-width", onClick: this.switchToDisciplines.bind(this) },
                _("admin.buttons.switch_to_disciplines")
            ) : React.createElement(
                "button",
                { className: "btn btn-default btn-sm full-width", onClick: this.switchToPlan.bind(this) },
                _("admin.buttons.switch_to_plan")
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "competition-schema" },
                this.renderList(),
                this.renderButton()
            );
        }
    }]);

    return CompetitionSchema;
})(React.Component);

var JudgingUI = (function (_React$Component2) {
    _inherits(JudgingUI, _React$Component2);

    function JudgingUI(props) {
        _classCallCheck(this, JudgingUI);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(JudgingUI).call(this, props));

        _this4.state = {
            active_tour_id: _this4.getTourIdFromHash(),
            page: _this4.getPageFromHash()
        };
        return _this4;
    }

    _createClass(JudgingUI, [{
        key: "switchActiveTour",
        value: function switchActiveTour(new_tour_id) {
            this.setState({
                active_tour_id: new_tour_id,
                page: this.getActiveTour(new_tour_id).finalized ? "results-1" : "tour-admin"
            });
            window.location.hash = "#judging/" + new_tour_id;
        }
    }, {
        key: "switchPage",
        value: function switchPage(new_page, event) {
            event.preventDefault();
            this.setState({
                page: new_page
            });
            window.location.hash = "#judging/" + this.state.active_tour_id + "/" + new_page;
        }
    }, {
        key: "getTourIdFromHash",
        value: function getTourIdFromHash() {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[1] && /^\d+$/.test(chunks[1])) {
                return parseInt(chunks[1]);
            }
            return null;
        }
    }, {
        key: "getPageFromHash",
        value: function getPageFromHash() {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[2]) {
                return chunks[2];
            }
            var active_tour = this.getActiveTour(this.getTourIdFromHash());
            return active_tour && active_tour.finalized ? "results-1" : "tour-admin";
        }
    }, {
        key: "getActiveTour",
        value: function getActiveTour() {
            var active_tour_id = arguments.length <= 0 || arguments[0] === undefined ? this.state.active_tour_id : arguments[0];

            if (active_tour_id === null) {
                return null;
            }
            var result = null;
            this.props.disciplines.forEach(function (discipline) {
                discipline.tours.forEach(function (tour) {
                    if (tour.id == active_tour_id) {
                        result = tour;
                    }
                });
            });
            return result;
        }
    }, {
        key: "getActiveDiscipline",
        value: function getActiveDiscipline() {
            var _this5 = this;

            var result = null;
            this.props.disciplines.forEach(function (discipline) {
                discipline.tours.forEach(function (tour) {
                    if (tour.id == _this5.state.active_tour_id) {
                        result = discipline;
                    }
                });
            });
            return result;
        }
    }, {
        key: "passSignal",
        value: function passSignal(message) {
            if (this.refs.active_body) {
                this.refs.active_body.onSignal(message);
            }
        }
    }, {
        key: "renderButtons",
        value: function renderButtons() {
            if (this.state.active_tour_id === null) {
                return null;
            }
            var props = {
                tour: this.getActiveTour(),
                onSignal: this.passSignal.bind(this),
                key: this.state.active_tour_id
            };
            switch (this.state.page) {
                case "tour-admin":
                    return React.createElement(TourAdminButtons, props);
                case "heats":
                    return React.createElement(HeatsButtons, props);
                case "results-1":
                case "results-2":
                case "results-3":
                    return React.createElement(TourResultsButtons, props);
                case "discipline-results":
                    return React.createElement(DisciplineResultsButtons, props);
                default:
                    console.log("Unknown page:", this.state.page);
            }
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            var _this6 = this;

            if (this.state.active_tour_id === null) {
                return null;
            }
            var props = {
                tour_id: this.state.active_tour_id,
                ref: "active_body",
                switchPage: function switchPage(page) {
                    return _this6.setState({ page: page });
                },
                key: this.state.active_tour_id
            };
            switch (this.state.page) {
                case "tour-admin":
                    return React.createElement(TourAdminBody, props);
                case "heats":
                    return React.createElement(HeatsBody, props);
                case "results-1":
                    return React.createElement(TourResultsBody, _extends({ printable: true, verbosity: "1" }, props));
                case "results-2":
                    return React.createElement(TourResultsBody, _extends({ printable: true, verbosity: "2" }, props));
                case "results-3":
                    return React.createElement(TourResultsBody, _extends({ printable: true, verbosity: "3" }, props));
                case "discipline-results":
                    return React.createElement(DisciplineResults, {
                        discipline_id: this.getActiveDiscipline().id,
                        ref: "active_body",
                        renderer: "page" });
                default:
                    console.log("Unknown page:", this.state.page);
            }
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var active_tour = this.getActiveTour();
            if (!active_tour) {
                return null;
            }
            return React.createElement(
                "header",
                { className: "app-header with-tabs" },
                React.createElement(
                    "div",
                    { className: "controls" },
                    this.renderButtons()
                ),
                React.createElement(
                    "h1",
                    null,
                    this.getActiveDiscipline().name
                ),
                React.createElement(
                    "h2",
                    null,
                    active_tour.name
                ),
                React.createElement("div", { className: "clearfix" }),
                React.createElement(
                    "ul",
                    { className: "pull-right nav nav-tabs" },
                    React.createElement(
                        "li",
                        { className: this.state.page == "tour-admin" ? "active" : "" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.switchPage.bind(this, "tour-admin") },
                            _("admin.judging-tabs.tour-admin")
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: this.state.page == "heats" ? "active" : "" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.switchPage.bind(this, "heats") },
                            _("admin.judging-tabs.heats")
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: this.state.page == "results-1" ? "active" : "" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.switchPage.bind(this, "results-1") },
                            _("admin.judging-tabs.results-1")
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: this.state.page == "results-2" ? "active" : "" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.switchPage.bind(this, "results-2") },
                            _("admin.judging-tabs.results-2")
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: this.state.page == "results-3" ? "active" : "" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.switchPage.bind(this, "results-3") },
                            _("admin.judging-tabs.results-3")
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: this.state.page == "discipline-results" ? "active" : "" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.switchPage.bind(this, "discipline-results") },
                            _("admin.judging-tabs.discipline-results")
                        )
                    )
                ),
                React.createElement("div", { className: "clearfix" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "app" },
                React.createElement(
                    "div",
                    { className: "side-menu" },
                    React.createElement(CompetitionSchema, {
                        updateTour: this.switchActiveTour.bind(this),
                        current_tour_id: this.state.active_tour_id,
                        competition_plan: this.props.competition_plan,
                        disciplines: this.props.disciplines })
                ),
                React.createElement(
                    "div",
                    { className: "app-content" },
                    this.renderHeader(),
                    React.createElement(
                        "div",
                        { className: "app-body" },
                        this.renderBody()
                    )
                )
            );
        }
    }]);

    return JudgingUI;
})(React.Component);
//# sourceMappingURL=judging.js.map