"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
        value: function activateTour(tour) {
            this.props.updateTour(tour.id);
        }
    }, {
        key: "renderTour",
        value: function renderTour(tour) {
            var className = "level-2" + (tour.finalized ? " grey" : "") + (tour.id == this.props.current_tour_id ? " active" : "");
            return React.createElement(
                "div",
                { className: className, onClick: this.activateTour.bind(this, tour), key: tour.id },
                tour.name
            );
        }
    }, {
        key: "renderDiscipline",
        value: function renderDiscipline(ic) {
            return React.createElement(
                "details",
                { className: "block", key: ic.id, open: !!parseInt(sessionStorage.getItem("D_J_" + ic.id)) },
                React.createElement(
                    "summary",
                    { className: "level-1", onClick: function (e) {
                            return sessionStorage.setItem("D_J_" + ic.id, e.target.parentNode.open ? 0 : 1);
                        } },
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
            active_tour_id: this.getTourIdFromHash(),
            page: this.getPageFromHash()
        };
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
            var _this = this;

            var result = null;
            this.props.disciplines.forEach(function (discipline) {
                discipline.tours.forEach(function (tour) {
                    if (tour.id == _this.state.active_tour_id) {
                        result = discipline;
                    }
                });
            });
            return result;
        }
    }, {
        key: "getPage",
        value: function getPage() {
            return this.state.page === "tour-admin" && this.getActiveTour().finalized ? "results-1" : this.state.page;
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
            switch (this.getPage()) {
                case "tour-admin":
                    if (this.getActiveTour().finalized) {
                        return null;
                    }
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
                    console.log("Unknown page:", this.getPage());
            }
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            if (this.state.active_tour_id === null) {
                return null;
            }
            var props = {
                tour_id: this.state.active_tour_id,
                ref: "active_body",
                key: this.state.active_tour_id
            };
            switch (this.getPage()) {
                case "tour-admin":
                    return React.createElement(TourAdminBody, props);
                case "heats":
                    return React.createElement(HeatsBody, props);
                case "results-1":
                    return React.createElement(TourResultsBody, _extends({ verbosity: "1" }, props));
                case "results-2":
                    return React.createElement(TourResultsBody, _extends({ verbosity: "2" }, props));
                case "results-3":
                    return React.createElement(TourResultsBody, _extends({ verbosity: "3" }, props));
                case "discipline-results":
                    return React.createElement(DisciplineResults, { discipline_id: this.getActiveDiscipline().id, ref: "active_body" });
                default:
                    console.log("Unknown page:", this.getPage());
            }
        }
    }, {
        key: "render",
        value: function render() {
            var active_tour = this.getActiveTour();
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
                            { className: "side-panel", rowSpan: "2" },
                            React.createElement(
                                "div",
                                { className: "scroller" },
                                React.createElement(CompetitionSchema, {
                                    updateTour: this.switchActiveTour.bind(this),
                                    current_tour_id: this.state.active_tour_id,
                                    disciplines: this.props.disciplines })
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "header" },
                            active_tour ? React.createElement(
                                "header",
                                { className: "with-tabs" },
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
                                    !active_tour.finalized ? React.createElement(
                                        "li",
                                        { className: this.getPage() == "tour-admin" ? "active" : "" },
                                        React.createElement(
                                            "a",
                                            { href: "#", onClick: this.switchPage.bind(this, "tour-admin") },
                                            _("admin.judging-tabs.tour-admin")
                                        )
                                    ) : null,
                                    React.createElement(
                                        "li",
                                        { className: this.getPage() == "heats" ? "active" : "" },
                                        React.createElement(
                                            "a",
                                            { href: "#", onClick: this.switchPage.bind(this, "heats") },
                                            _("admin.judging-tabs.heats")
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { className: this.getPage() == "results-1" ? "active" : "" },
                                        React.createElement(
                                            "a",
                                            { href: "#", onClick: this.switchPage.bind(this, "results-1") },
                                            _("admin.judging-tabs.results-1")
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { className: this.getPage() == "results-2" ? "active" : "" },
                                        React.createElement(
                                            "a",
                                            { href: "#", onClick: this.switchPage.bind(this, "results-2") },
                                            _("admin.judging-tabs.results-2")
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { className: this.getPage() == "results-3" ? "active" : "" },
                                        React.createElement(
                                            "a",
                                            { href: "#", onClick: this.switchPage.bind(this, "results-3") },
                                            _("admin.judging-tabs.results-3")
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { className: this.getPage() == "discipline-results" ? "active" : "" },
                                        React.createElement(
                                            "a",
                                            { href: "#", onClick: this.switchPage.bind(this, "discipline-results") },
                                            _("admin.judging-tabs.discipline-results")
                                        )
                                    )
                                ),
                                React.createElement("div", { className: "clearfix" })
                            ) : null
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "body" },
                            React.createElement(
                                "div",
                                { className: "scroller" },
                                this.renderBody()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return JudgingUI;
})(React.Component);
//# sourceMappingURL=judging.js.map