(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderer = function (_React$Component) {
    _inherits(Renderer, _React$Component);

    function Renderer() {
        _classCallCheck(this, Renderer);

        return _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).apply(this, arguments));
    }

    _createClass(Renderer, [{
        key: "renderEmpty",
        value: function renderEmpty() {
            return React.createElement(
                "div",
                { className: "Awarding" },
                React.createElement(
                    "div",
                    { className: "discipline-name" },
                    this.props.discipline.name
                )
            );
        }
    }, {
        key: "renderPlace",
        value: function renderPlace(row) {
            if (row.place === null) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "place" },
                row.place + " место"
            );
        }
    }, {
        key: "render",
        value: function render() {
            var row = this.props.table[this.props.position];
            if (!row) {
                return this.renderEmpty();
            }
            return React.createElement(
                "div",
                { className: "Awarding" },
                React.createElement(
                    "div",
                    { className: "discipline-name" },
                    this.props.discipline.name
                ),
                this.renderPlace(row),
                React.createElement(
                    "div",
                    { className: "participant-name" },
                    row.run.participant.name
                ),
                React.createElement(
                    "div",
                    { className: "participant-club" },
                    row.run.participant.club.name
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                discipline: PT.shape({
                    name: PT.string.isRequired
                }).isRequired,
                position: PT.number,
                table: PT.arrayOf(PT.shape({
                    place: PT.number,
                    run: PT.shape({
                        participant: PT.shape({
                            name: PT.string.isRequired,
                            club: PT.shape({
                                name: PT.string.isRequired
                            }).isRequired
                        }).isRequired
                    }).isRequired
                }).isRequired).isRequired
            };
        }
    }]);

    return Renderer;
}(React.Component);

exports.default = Renderer;


Renderer.displayName = "Awarding_Renderer";

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HostModules = require("HostModules");

var _Renderer = require("./Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsOneParticipant = function (_React$Component) {
    _inherits(HeatsOneParticipant, _React$Component);

    function HeatsOneParticipant() {
        _classCallCheck(this, HeatsOneParticipant);

        return _possibleConstructorReturn(this, (HeatsOneParticipant.__proto__ || Object.getPrototypeOf(HeatsOneParticipant)).apply(this, arguments));
    }

    _createClass(HeatsOneParticipant, [{
        key: "render",
        value: function render() {
            return React.createElement(_HostModules.DisciplineResultsLoader, {
                disciplineId: this.controls.discipline_id,
                position: this.controls.position,
                renderer: _Renderer2.default
            });
        }
    }, {
        key: "controls",
        get: function get() {
            return this.props.competition.screen_data.controls_state;
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                competition: PT.shape({
                    screen_data: PT.shape({
                        controls_state: PT.shape({
                            discipline_id: PT.number.isRequired,
                            position: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return HeatsOneParticipant;
}(React.Component);

exports.default = HeatsOneParticipant;


HeatsOneParticipant.displayName = "HeatsOneParticipant";

},{"./Renderer":1,"HostModules":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HeatsFormation;

var _HeatsOneParticipant = require("./HeatsOneParticipant");

var _HeatsOneParticipant2 = _interopRequireDefault(_HeatsOneParticipant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeatsFormation(props) {
    return React.createElement(_HeatsOneParticipant2.default, _extends({
        showScore: false
    }, props));
}

},{"./HeatsOneParticipant":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HostModules = require("HostModules");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsMultipleParticipants = function (_React$Component) {
    _inherits(HeatsMultipleParticipants, _React$Component);

    _createClass(HeatsMultipleParticipants, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                competition: PT.shape({
                    screen_data: PT.shape({
                        controls_state: PT.shape({
                            tour_id: PT.number.isRequired,
                            heat: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    function HeatsMultipleParticipants(props) {
        _classCallCheck(this, HeatsMultipleParticipants);

        var _this = _possibleConstructorReturn(this, (HeatsMultipleParticipants.__proto__ || Object.getPrototypeOf(HeatsMultipleParticipants)).call(this, props));

        _this.loadData = function () {
            (0, _HostModules.Api)("tour.get", {
                tour_id: _this.controls.tour_id,
                children: _this.SCHEMA
            }).addToDB("Tour", _this.controls.tour_id, _HostModules.storage).onSuccess(_this.reloadFromStorage).send();
        };

        _this.reloadFromStorage = function () {
            var serialized = _HostModules.storage.get("Tour").by_id(_this.controls.tour_id).serialize(_this.SCHEMA);
            _this.setState({
                tour: serialized
            });
        };

        _this.state = {
            tour: null
        };
        return _this;
    }

    _createClass(HeatsMultipleParticipants, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this._message_dispatchers = [_HostModules.message_dispatcher.addListener("db_update", this.reloadFromStorage), _HostModules.message_dispatcher.addListener("reload_date", this.loadData)];
            this.loadData();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.competition.screen_data.controls_state.tour_id !== this.controls.tour_id) {
                this.setState({
                    tour: null
                });
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props) {
            if (prev_props.competition.screen_data.controls_state.tour_id !== this.controls.tour_id) {
                this.loadData();
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._message_dispatchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var md = _step.value;

                    _HostModules.message_dispatcher.removeListener(md);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "canShowScores",
        value: function canShowScores(run) {
            var scores_map = new Map(run.scores.map(function (s) {
                return [s.discipline_judge_id, s];
            }));
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.state.tour.discipline.discipline_judges[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var dj = _step2.value;

                    if (["dance_judge", "acro_judge"].indexOf(dj.role) >= 0 && !scores_map.get(dj.id).confirmed) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return true;
        }
    }, {
        key: "renderEmpty",
        value: function renderEmpty() {
            return React.createElement("div", { className: "HeatsMultipleParticipants" });
        }
    }, {
        key: "renderResult",
        value: function renderResult(run) {
            var score_class = this.canShowScores(run) ? "score" : "score hidden";
            var score = typeof run.verbose_total_score.primary_score !== "undefined" ? run.verbose_total_score.primary_score.toFixed(2) : "";
            return React.createElement(
                "div",
                { className: score_class },
                "Результат: " + score
            );
        }
    }, {
        key: "renderRun",
        value: function renderRun(run) {
            var class_name = run.performed ? "run" : "run hidden";
            var name = run.participant.formation_name === "" ? run.participant.sportsmen.map(function (s) {
                return s.last_name + " " + s.first_name;
            }).join("\n") : run.participant.formation_name;
            return React.createElement(
                "div",
                { className: class_name, key: run.id },
                React.createElement(
                    "div",
                    { className: "participant-number" },
                    run.participant.number
                ),
                React.createElement(
                    "div",
                    { className: "participant-name" },
                    name
                ),
                this.renderResult(run)
            );
        }
    }, {
        key: "renderRuns",
        value: function renderRuns() {
            var _this2 = this;

            if (this.controls.heat === null) {
                return null;
            }
            var runs = this.state.tour.runs.filter(function (r) {
                return r.heat === _this2.controls.heat;
            });
            var two_rows = runs.length > 4;
            var class_name = two_rows ? "runs two-rows" : "runs";
            return React.createElement(
                "div",
                { className: class_name },
                runs.map(function (run) {
                    return _this2.renderRun(run);
                })
            );
        }
    }, {
        key: "renderHeat",
        value: function renderHeat() {
            if (this.controls.heat === null) {
                return null;
            }
            var num_heats = Math.max.apply(Math, _toConsumableArray(this.state.tour.runs.map(function (r) {
                return r.heat;
            })));
            return React.createElement(
                "div",
                { className: "heat" },
                "Заход " + this.controls.heat + "/" + num_heats
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.tour === null) {
                return this.renderEmpty();
            }
            return React.createElement(
                "div",
                { className: "HeatsMultipleParticipants" },
                React.createElement(
                    "div",
                    { className: "discipline-name" },
                    this.state.tour.discipline.name
                ),
                React.createElement(
                    "div",
                    { className: "tour-name" },
                    this.state.tour.name
                ),
                this.renderHeat(),
                this.renderRuns()
            );
        }
    }, {
        key: "SCHEMA",
        get: function get() {
            return {
                discipline: {
                    discipline_judges: {}
                },
                runs: {
                    participant: {},
                    scores: {}
                }
            };
        }
    }, {
        key: "controls",
        get: function get() {
            return this.props.competition.screen_data.controls_state;
        }
    }]);

    return HeatsMultipleParticipants;
}(React.Component);

exports.default = HeatsMultipleParticipants;


HeatsMultipleParticipants.displayName = "HeatsMultipleParticipants";

},{"HostModules":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HostModules = require("HostModules");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsOneParticipant = function (_React$Component) {
    _inherits(HeatsOneParticipant, _React$Component);

    _createClass(HeatsOneParticipant, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                competition: PT.shape({
                    screen_data: PT.shape({
                        controls_state: PT.shape({
                            tour_id: PT.number.isRequired,
                            heat: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                showScore: PT.bool
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                showScore: true
            };
        }
    }]);

    function HeatsOneParticipant(props) {
        _classCallCheck(this, HeatsOneParticipant);

        var _this = _possibleConstructorReturn(this, (HeatsOneParticipant.__proto__ || Object.getPrototypeOf(HeatsOneParticipant)).call(this, props));

        _this.loadData = function () {
            (0, _HostModules.Api)("tour.get", {
                tour_id: _this.controls.tour_id,
                children: _this.SCHEMA
            }).addToDB("Tour", _this.controls.tour_id, _HostModules.storage).onSuccess(_this.reloadFromStorage).send();
        };

        _this.reloadFromStorage = function () {
            var serialized = _HostModules.storage.get("Tour").by_id(_this.controls.tour_id).serialize(_this.SCHEMA);
            _this.setState({
                tour: serialized
            });
        };

        _this.state = {
            tour: null
        };
        return _this;
    }

    _createClass(HeatsOneParticipant, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this._message_dispatchers = [_HostModules.message_dispatcher.addListener("db_update", this.reloadFromStorage), _HostModules.message_dispatcher.addListener("reload_date", this.loadData)];
            this.loadData();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.competition.screen_data.controls_state.tour_id !== this.controls.tour_id) {
                this.setState({
                    tour: null
                });
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props) {
            if (prev_props.competition.screen_data.controls_state.tour_id !== this.controls.tour_id) {
                this.loadData();
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._message_dispatchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var md = _step.value;

                    _HostModules.message_dispatcher.removeListener(md);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "canShowScores",
        value: function canShowScores(run) {
            var scores_map = new Map(run.scores.map(function (s) {
                return [s.discipline_judge_id, s];
            }));
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.state.tour.discipline.discipline_judges[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var dj = _step2.value;

                    if (["dance_judge", "acro_judge"].indexOf(dj.role) >= 0 && !scores_map.get(dj.id).confirmed) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return true;
        }
    }, {
        key: "renderEmpty",
        value: function renderEmpty() {
            return React.createElement("div", { className: "HeatsOneParticipant" });
        }
    }, {
        key: "renderResult",
        value: function renderResult(run) {
            if (!this.props.showScore) {
                return null;
            }
            var score_class = this.canShowScores(run) ? "score" : "score hidden";
            var score = run.verbose_total_score.primary_score ? run.verbose_total_score.primary_score.toFixed(2) : "";
            return React.createElement(
                "div",
                { className: score_class },
                "Результат: " + score
            );
        }
    }, {
        key: "renderRun",
        value: function renderRun() {
            var _this2 = this;

            if (!this.controls.heat) {
                return null;
            }
            var run = this.state.tour.runs.find(function (r) {
                return r.heat === _this2.controls.heat;
            });
            if (!run) {
                return null;
            }
            var num_heats = Math.max.apply(Math, _toConsumableArray(this.state.tour.runs.map(function (r) {
                return r.heat;
            })));
            return React.createElement(
                "div",
                { className: "run" },
                React.createElement(
                    "div",
                    { className: "heat" },
                    "Заход " + run.heat + "/" + num_heats
                ),
                React.createElement(
                    "div",
                    { className: "participant-number" },
                    run.participant.number
                ),
                React.createElement(
                    "div",
                    { className: "participant-name" },
                    run.participant.name
                ),
                React.createElement(
                    "div",
                    { className: "participant-club-name" },
                    run.participant.club.name
                ),
                this.renderResult(run)
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.tour === null) {
                return this.renderEmpty();
            }
            return React.createElement(
                "div",
                { className: "HeatsOneParticipant" },
                React.createElement(
                    "div",
                    { className: "discipline-name" },
                    this.state.tour.discipline.name
                ),
                React.createElement(
                    "div",
                    { className: "tour-name" },
                    this.state.tour.name
                ),
                this.renderRun()
            );
        }
    }, {
        key: "SCHEMA",
        get: function get() {
            return {
                discipline: {
                    discipline_judges: {}
                },
                runs: {
                    participant: {
                        club: {}
                    },
                    scores: {}
                }
            };
        }
    }, {
        key: "controls",
        get: function get() {
            return this.props.competition.screen_data.controls_state;
        }
    }]);

    return HeatsOneParticipant;
}(React.Component);

exports.default = HeatsOneParticipant;


HeatsOneParticipant.displayName = "HeatsOneParticipant";

},{"HostModules":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setup = setup;
var Api = exports.Api = null;
var message_dispatcher = exports.message_dispatcher = null;
var storage = exports.storage = null;
var TourResultsLoader = exports.TourResultsLoader = null;
var DisciplineResultsLoader = exports.DisciplineResultsLoader = null;

function setup(data) {
    exports.Api = Api = data.Api;
    exports.message_dispatcher = message_dispatcher = data.message_dispatcher;
    exports.storage = storage = data.storage;
    exports.TourResultsLoader = TourResultsLoader = data.TourResultsLoader;
    exports.DisciplineResultsLoader = DisciplineResultsLoader = data.DisciplineResultsLoader;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplashScreen = function (_React$Component) {
    _inherits(SplashScreen, _React$Component);

    function SplashScreen() {
        _classCallCheck(this, SplashScreen);

        return _possibleConstructorReturn(this, (SplashScreen.__proto__ || Object.getPrototypeOf(SplashScreen)).apply(this, arguments));
    }

    _createClass(SplashScreen, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "SplashScreen" },
                React.createElement(
                    "h1",
                    null,
                    this.props.competition.name
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                competition: PT.shape({
                    name: PT.string.isRequired
                }).isRequired
            };
        }
    }]);

    return SplashScreen;
}(React.Component);

exports.default = SplashScreen;


SplashScreen.displayName = "SplashScreen";

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PARTICIPANTS_PER_PAGE = 15;
var REFRESH_INTERVAL = 7000;

var Renderer = function (_React$Component) {
    _inherits(Renderer, _React$Component);

    _createClass(Renderer, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                table: PT.arrayOf(PT.shape({
                    place: PT.number.isRequired,
                    advances: PT.bool.isRequired,
                    run: PT.shape({
                        participant: PT.shape({
                            number: PT.number.isRequired,
                            name: PT.string.isRequired
                        }).isRequired,
                        total_score: PT.string.isRequired
                    }).isRequired
                }).isRequired).isRequired,
                tour: PT.shape({
                    name: PT.string.isRequired,
                    next_tour_id: PT.number,
                    discipline: PT.shape({
                        name: PT.string.isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    function Renderer(props) {
        _classCallCheck(this, Renderer);

        var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

        _this.renderRow = function (row) {
            return React.createElement(
                "tr",
                { key: row.run.id },
                React.createElement(
                    "td",
                    { className: "place" },
                    row.place
                ),
                React.createElement(
                    "td",
                    { className: "number" },
                    row.run.participant.number
                ),
                React.createElement(
                    "td",
                    { className: "participant" },
                    row.run.participant.name
                ),
                React.createElement(
                    "td",
                    { className: "score" },
                    row.run.total_score
                ),
                _this.props.tour.next_tour_id !== null ? React.createElement(
                    "td",
                    { className: "next-tour" },
                    row.advances ? React.createElement(
                        "b",
                        null,
                        "Да"
                    ) : "Нет"
                ) : null
            );
        };

        _this.state = {
            page: 0
        };
        setInterval(function () {
            return _this.setState({
                page: _this.state.page + 1
            });
        }, REFRESH_INTERVAL);
        return _this;
    }

    _createClass(Renderer, [{
        key: "renderEmptyRow",
        value: function renderEmptyRow(key) {
            return React.createElement(
                "tr",
                { className: "empty", key: "ER-" + key },
                React.createElement(
                    "td",
                    null,
                    " "
                ),
                React.createElement(
                    "td",
                    null,
                    " "
                ),
                React.createElement(
                    "td",
                    null,
                    " "
                ),
                React.createElement(
                    "td",
                    null,
                    " "
                ),
                this.props.tour.next_tour_id !== null ? React.createElement(
                    "td",
                    null,
                    " "
                ) : null
            );
        }
    }, {
        key: "renderRows",
        value: function renderRows(rows, page_size) {
            var result = rows.map(this.renderRow);
            for (var i = rows.length; i < page_size; ++i) {
                result.push(this.renderEmptyRow(i));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            var n_pages = Math.max(1, Math.floor(this.props.table.length / PARTICIPANTS_PER_PAGE) + !!(this.props.table.length % PARTICIPANTS_PER_PAGE));
            var page_size = Math.min(PARTICIPANTS_PER_PAGE, this.props.table.length);
            var corr_page = this.state.page % n_pages;
            var rows = this.props.table.slice(corr_page * PARTICIPANTS_PER_PAGE, (corr_page + 1) * PARTICIPANTS_PER_PAGE);
            return React.createElement(
                "div",
                { className: "TourResults" },
                React.createElement(
                    "div",
                    { className: "discipline-name" },
                    this.props.tour.discipline.name
                ),
                React.createElement(
                    "div",
                    { className: "tour-name" },
                    this.props.tour.name
                ),
                React.createElement(
                    "div",
                    { className: "header" },
                    "Результаты тура"
                ),
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
                                "th",
                                { className: "place" },
                                "М"
                            ),
                            React.createElement(
                                "th",
                                { className: "number" },
                                "№"
                            ),
                            React.createElement(
                                "th",
                                { className: "participant" },
                                "Участник"
                            ),
                            React.createElement(
                                "th",
                                { className: "score" },
                                "Баллы"
                            ),
                            this.props.tour.next_tour_id !== null ? React.createElement(
                                "th",
                                { className: "next-tour" },
                                "Сл. тур"
                            ) : null
                        ),
                        this.renderRows(rows, page_size)
                    )
                )
            );
        }
    }]);

    return Renderer;
}(React.Component);

exports.default = Renderer;


Renderer.displayName = "TourResults_Renderer";

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HostModules = require("HostModules");

var _Renderer = require("./Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResults = function (_React$Component) {
    _inherits(TourResults, _React$Component);

    function TourResults() {
        _classCallCheck(this, TourResults);

        return _possibleConstructorReturn(this, (TourResults.__proto__ || Object.getPrototypeOf(TourResults)).apply(this, arguments));
    }

    _createClass(TourResults, [{
        key: "render",
        value: function render() {
            return React.createElement(_HostModules.TourResultsLoader, {
                renderer: _Renderer2.default,
                showLoader: false,
                tourId: this.props.competition.screen_data.controls_state.tour_id
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                competition: PT.shape({
                    screen_data: PT.shape({
                        controls_state: PT.shape({
                            tour_id: PT.number.isRequired
                        }).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return TourResults;
}(React.Component);

exports.default = TourResults;


TourResults.displayName = "TourResults";

},{"./Renderer":8,"HostModules":6}],10:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SplashScreen = require("./SplashScreen");

var _SplashScreen2 = _interopRequireDefault(_SplashScreen);

var _HeatsOneParticipant = require("./HeatsOneParticipant");

var _HeatsOneParticipant2 = _interopRequireDefault(_HeatsOneParticipant);

var _HeatsMultipleParticipants = require("./HeatsMultipleParticipants");

var _HeatsMultipleParticipants2 = _interopRequireDefault(_HeatsMultipleParticipants);

var _HeatsFormation = require("./HeatsFormation");

var _HeatsFormation2 = _interopRequireDefault(_HeatsFormation);

var _TourResults = require("./TourResults");

var _TourResults2 = _interopRequireDefault(_TourResults);

var _Awarding = require("./Awarding");

var _Awarding2 = _interopRequireDefault(_Awarding);

var _HostModules = require("./HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Screen = function (_React$Component) {
    _inherits(Screen, _React$Component);

    function Screen() {
        _classCallCheck(this, Screen);

        return _possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).apply(this, arguments));
    }

    _createClass(Screen, [{
        key: "render",
        value: function render() {
            var PageComponent = {
                "splash": _SplashScreen2.default,
                "heats_one_participant": _HeatsOneParticipant2.default,
                "heats_multiple_participants": _HeatsMultipleParticipants2.default,
                "heats_formation": _HeatsFormation2.default,
                "tour_results": _TourResults2.default,
                "awarding": _Awarding2.default
            }[this.props.competition.screen_data.screen_id] || _SplashScreen2.default;
            return React.createElement(PageComponent, {
                competition: this.props.competition
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                competition: PT.shape({
                    screen_data: PT.shape({
                        screen_id: PT.string
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return Screen;
}(React.Component);

Screen.displayName = "Screen";

var response = window.registerScreen(Screen);
(0, _HostModules.setup)(response);

},{"./Awarding":2,"./HeatsFormation":3,"./HeatsMultipleParticipants":4,"./HeatsOneParticipant":5,"./HostModules":6,"./SplashScreen":7,"./TourResults":9}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc3hcXEF3YXJkaW5nXFxSZW5kZXJlci5qc3giLCJqc3hcXEF3YXJkaW5nXFxpbmRleC5qc3giLCJqc3hcXEhlYXRzRm9ybWF0aW9uLmpzeCIsImpzeFxcSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cy5qc3giLCJqc3hcXEhlYXRzT25lUGFydGljaXBhbnQuanN4IiwianN4XFxIb3N0TW9kdWxlcy5qc3giLCJqc3hcXFNwbGFzaFNjcmVlbi5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxSZW5kZXJlci5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxpbmRleC5qc3giLCJqc3hcXHJvb3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNBcUIsUTs7Ozs7Ozs7Ozs7c0NBd0JIO0FBQ1YsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBQ00seUJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0I7QUFENUI7QUFESixhQURKO0FBT0g7OztvQ0FDVyxHLEVBQUs7QUFDYixnQkFBSSxJQUFJLEtBQUosS0FBYyxJQUFsQixFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQ1Msb0JBQUksS0FEYjtBQUFBLGFBREo7QUFLSDs7O2lDQUNRO0FBQ0wsZ0JBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQUssS0FBTCxDQUFXLFFBQTVCLENBQVo7QUFDQSxnQkFBSSxDQUFDLEdBQUwsRUFBVTtBQUNOLHVCQUFPLEtBQUssV0FBTCxFQUFQO0FBQ0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsaUJBQWY7QUFDTSx5QkFBSyxLQUFMLENBQVcsVUFB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SyxNQUFNLFNBQWpCO0FBQ0EsbUJBQU87QUFDSCw2QkFBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQixpQ0FBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQixtQ0FBVyxHQUFHO0FBREkscUJBQVQsRUFFVjtBQUhlLGlCQUFULEVBSVY7QUFMQSxhQUFQO0FBT0g7Ozs7RUFWZ0IsTUFBTSxTOztBQTRCM0IsT0FBTyxXQUFQLEdBQXFCLFFBQXJCOztBQUVBLElBQU0sV0FBVyxPQUFPLGNBQVAsQ0FBc0IsTUFBdEIsQ0FBakI7QUFDQSx3QkFBTSxRQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcG9zaXRpb246IFBULm51bWJlcixcbiAgICAgICAgICAgIHRhYmxlOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXdhcmRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJQbGFjZShyb3cpIHtcbiAgICAgICAgaWYgKHJvdy5wbGFjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2VcIj5cbiAgICAgICAgICAgICAgICB7IGAke3Jvdy5wbGFjZX0g0LzQtdGB0YLQvmAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5wcm9wcy50YWJsZVt0aGlzLnByb3BzLnBvc2l0aW9uXTtcbiAgICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXdhcmRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGxhY2Uocm93KSB9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LWNsdWJcIj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlbmRlcmVyLmRpc3BsYXlOYW1lID0gXCJBd2FyZGluZ19SZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgRGlzY2lwbGluZVJlc3VsdHNMb2FkZXIgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL1JlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzT25lUGFydGljaXBhbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NyZWVuX2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxEaXNjaXBsaW5lUmVzdWx0c0xvYWRlclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVJZD17IHRoaXMuY29udHJvbHMuZGlzY2lwbGluZV9pZCB9XG4gICAgICAgICAgICAgICAgcG9zaXRpb249eyB0aGlzLmNvbnRyb2xzLnBvc2l0aW9uIH1cbiAgICAgICAgICAgICAgICByZW5kZXJlcj17IFJlbmRlcmVyIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5IZWF0c09uZVBhcnRpY2lwYW50LmRpc3BsYXlOYW1lID0gXCJIZWF0c09uZVBhcnRpY2lwYW50XCI7XG4iLCJpbXBvcnQgSGVhdHNPbmVQYXJ0aWNpcGFudCBmcm9tIFwiLi9IZWF0c09uZVBhcnRpY2lwYW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYXRzRm9ybWF0aW9uKHByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEhlYXRzT25lUGFydGljaXBhbnRcbiAgICAgICAgICAgIHNob3dTY29yZT17IGZhbHNlIH1cbiAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAvPlxuICAgICk7XG59XG4iLCJpbXBvcnQgeyBBcGksIHN0b3JhZ2UsIG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWF0c011bHRpcGxlUGFydGljaXBhbnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYXQ6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZV9kaXNwYXRjaGVycyA9IFtcbiAgICAgICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlKSxcbiAgICAgICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRlXCIsIHRoaXMubG9hZERhdGEpLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkICE9PSB0aGlzLmNvbnRyb2xzLnRvdXJfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldl9wcm9wcykge1xuICAgICAgICBpZiAocHJldl9wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkICE9PSB0aGlzLmNvbnRyb2xzLnRvdXJfaWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgZm9yIChjb25zdCBtZCBvZiB0aGlzLl9tZXNzYWdlX2Rpc3BhdGNoZXJzKSB7XG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIobWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IFNDSEVNQSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7fSxcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWREYXRhID0gKCkgPT4ge1xuICAgICAgICBBcGkoXCJ0b3VyLmdldFwiLCB7XG4gICAgICAgICAgICB0b3VyX2lkOiB0aGlzLmNvbnRyb2xzLnRvdXJfaWQsXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIlRvdXJcIiwgdGhpcy5jb250cm9scy50b3VyX2lkLCBzdG9yYWdlKVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSBzdG9yYWdlXG4gICAgICAgICAgICAuZ2V0KFwiVG91clwiKVxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMuY29udHJvbHMudG91cl9pZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRvdXI6IHNlcmlhbGl6ZWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBjb250cm9scygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGU7XG4gICAgfVxuXG4gICAgY2FuU2hvd1Njb3JlcyhydW4pIHtcbiAgICAgICAgY29uc3Qgc2NvcmVzX21hcCA9IG5ldyBNYXAocnVuLnNjb3Jlcy5tYXAocyA9PiBbcy5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzXSkpO1xuICAgICAgICBmb3IgKGNvbnN0IGRqIG9mIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICBpZiAoW1wiZGFuY2VfanVkZ2VcIiwgXCJhY3JvX2p1ZGdlXCJdLmluZGV4T2YoZGoucm9sZSkgPj0gMCAmJiAhc2NvcmVzX21hcC5nZXQoZGouaWQpLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmVuZGVyRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHNcIiAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSZXN1bHQocnVuKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlX2NsYXNzID0gdGhpcy5jYW5TaG93U2NvcmVzKHJ1bikgPyBcInNjb3JlXCIgOiBcInNjb3JlIGhpZGRlblwiO1xuICAgICAgICBjb25zdCBzY29yZSA9IHR5cGVvZiBydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICA/IHJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBzY29yZV9jbGFzcyB9PlxuICAgICAgICAgICAgICAgIHsgYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtzY29yZX1gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclJ1bihydW4pIHtcbiAgICAgICAgY29uc3QgY2xhc3NfbmFtZSA9IHJ1bi5wZXJmb3JtZWQgPyBcInJ1blwiIDogXCJydW4gaGlkZGVuXCI7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBydW4ucGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgPT09IFwiXCJcbiAgICAgICAgICAgID8gcnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5tYXAocyA9PiBgJHtzLmxhc3RfbmFtZX0gJHtzLmZpcnN0X25hbWV9YCkuam9pbihcIlxcblwiKVxuICAgICAgICAgICAgOiBydW4ucGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfSBrZXk9eyBydW4uaWQgfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IG5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSZXN1bHQocnVuKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUnVucygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbHMuaGVhdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcnVucyA9IHRoaXMuc3RhdGUudG91ci5ydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gdGhpcy5jb250cm9scy5oZWF0KTtcbiAgICAgICAgY29uc3QgdHdvX3Jvd3MgPSBydW5zLmxlbmd0aCA+IDQ7XG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSB0d29fcm93cyA/IFwicnVucyB0d28tcm93c1wiIDogXCJydW5zXCI7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfT5cbiAgICAgICAgICAgICAgICB7IHJ1bnMubWFwKHJ1biA9PiB0aGlzLnJlbmRlclJ1bihydW4pKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbHMuaGVhdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbnVtX2hlYXRzID0gTWF0aC5tYXgoLi4udGhpcy5zdGF0ZS50b3VyLnJ1bnMubWFwKHIgPT4gci5oZWF0KSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYXRcIj5cbiAgICAgICAgICAgICAgICB7IGDQl9Cw0YXQvtC0ICR7dGhpcy5jb250cm9scy5oZWF0fS8ke251bV9oZWF0c31gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYXQoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJ1bnMoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMuZGlzcGxheU5hbWUgPSBcIkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHNcIjtcbiIsImltcG9ydCB7IEFwaSwgc3RvcmFnZSwgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzT25lUGFydGljaXBhbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NyZWVuX2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhdDogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2hvd1Njb3JlOiBQVC5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNob3dTY29yZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZV9kaXNwYXRjaGVycyA9IFtcbiAgICAgICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlKSxcbiAgICAgICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRlXCIsIHRoaXMubG9hZERhdGEpLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkICE9PSB0aGlzLmNvbnRyb2xzLnRvdXJfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldl9wcm9wcykge1xuICAgICAgICBpZiAocHJldl9wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkICE9PSB0aGlzLmNvbnRyb2xzLnRvdXJfaWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgZm9yIChjb25zdCBtZCBvZiB0aGlzLl9tZXNzYWdlX2Rpc3BhdGNoZXJzKSB7XG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIobWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IFNDSEVNQSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcmVzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5jb250cm9scy50b3VyX2lkLFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuU0NIRU1BLFxuICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMuY29udHJvbHMudG91cl9pZCwgc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gc3RvcmFnZVxuICAgICAgICAgICAgLmdldChcIlRvdXJcIilcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLmNvbnRyb2xzLnRvdXJfaWQpXG4gICAgICAgICAgICAuc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b3VyOiBzZXJpYWxpemVkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlO1xuICAgIH1cblxuICAgIGNhblNob3dTY29yZXMocnVuKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHJ1bi5zY29yZXMubWFwKHMgPT4gW3MuZGlzY2lwbGluZV9qdWRnZV9pZCwgc10pKTtcbiAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcykge1xuICAgICAgICAgICAgaWYgKFtcImRhbmNlX2p1ZGdlXCIsIFwiYWNyb19qdWRnZVwiXS5pbmRleE9mKGRqLnJvbGUpID49IDAgJiYgIXNjb3Jlc19tYXAuZ2V0KGRqLmlkKS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJlbmRlckVtcHR5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c09uZVBhcnRpY2lwYW50XCIgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUmVzdWx0KHJ1bikge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1Njb3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY29yZV9jbGFzcyA9IHRoaXMuY2FuU2hvd1Njb3JlcyhydW4pID8gXCJzY29yZVwiIDogXCJzY29yZSBoaWRkZW5cIjtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlXG4gICAgICAgICAgICA/IHJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBzY29yZV9jbGFzcyB9PlxuICAgICAgICAgICAgICAgIHsgYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtzY29yZX1gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSdW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9scy5oZWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBydW4gPSB0aGlzLnN0YXRlLnRvdXIucnVucy5maW5kKHIgPT4gci5oZWF0ID09PSB0aGlzLmNvbnRyb2xzLmhlYXQpO1xuICAgICAgICBpZiAoIXJ1bikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbnVtX2hlYXRzID0gTWF0aC5tYXgoLi4udGhpcy5zdGF0ZS50b3VyLnJ1bnMubWFwKHIgPT4gci5oZWF0KSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ1blwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhdFwiPlxuICAgICAgICAgICAgICAgICAgICB7IGDQl9Cw0YXQvtC0ICR7cnVuLmhlYXR9LyR7bnVtX2hlYXRzfWAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcnVuLnBhcnRpY2lwYW50Lm51bWJlciB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcnVuLnBhcnRpY2lwYW50Lm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtY2x1Yi1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJlc3VsdChydW4pIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhdHNPbmVQYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJ1bigpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSGVhdHNPbmVQYXJ0aWNpcGFudC5kaXNwbGF5TmFtZSA9IFwiSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xuIiwiZXhwb3J0IGxldCBBcGkgPSBudWxsO1xuZXhwb3J0IGxldCBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBudWxsO1xuZXhwb3J0IGxldCBzdG9yYWdlID0gbnVsbDtcbmV4cG9ydCBsZXQgVG91clJlc3VsdHNMb2FkZXIgPSBudWxsO1xuZXhwb3J0IGxldCBEaXNjaXBsaW5lUmVzdWx0c0xvYWRlciA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cChkYXRhKSB7XG4gICAgQXBpICAgICAgICAgICAgICAgICAgICAgID0gZGF0YS5BcGk7XG4gICAgbWVzc2FnZV9kaXNwYXRjaGVyICAgICAgID0gZGF0YS5tZXNzYWdlX2Rpc3BhdGNoZXI7XG4gICAgc3RvcmFnZSAgICAgICAgICAgICAgICAgID0gZGF0YS5zdG9yYWdlO1xuICAgIFRvdXJSZXN1bHRzTG9hZGVyICAgICAgICA9IGRhdGEuVG91clJlc3VsdHNMb2FkZXI7XG4gICAgRGlzY2lwbGluZVJlc3VsdHNMb2FkZXIgID0gZGF0YS5EaXNjaXBsaW5lUmVzdWx0c0xvYWRlcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwbGFzaFNjcmVlbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGV0aXRpb246IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3BsYXNoU2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgPGgxPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY29tcGV0aXRpb24ubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU3BsYXNoU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTcGxhc2hTY3JlZW5cIjtcbiIsImNvbnN0IFBBUlRJQ0lQQU5UU19QRVJfUEFHRSA9IDE1O1xuY29uc3QgUkVGUkVTSF9JTlRFUlZBTCA9IDcwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZXM6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcjogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbmV4dF90b3VyX2lkOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYWdlOiAwLFxuICAgICAgICB9O1xuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuc3RhdGUucGFnZSArIDEsXG4gICAgICAgIH0pLCBSRUZSRVNIX0lOVEVSVkFMKTtcbiAgICB9XG5cbiAgICByZW5kZXJSb3cgPSAocm93KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIga2V5PXsgcm93LnJ1bi5pZCB9PlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJzY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4udG90YWxfc2NvcmUgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsID8gKFxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibmV4dC10b3VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvdy5hZHZhbmNlcyA/IDxiPtCU0LA8L2I+IDogXCLQndC10YJcIiB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgKSA6IG51bGwgfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyRW1wdHlSb3coa2V5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiZW1wdHlcIiBrZXk9eyBgRVItJHtrZXl9YCB9PlxuICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbCA/IDx0ZD4mbmJzcDs8L3RkPiA6IG51bGwgfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUm93cyhyb3dzLCBwYWdlX3NpemUpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHJvd3MubWFwKHRoaXMucmVuZGVyUm93KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHJvd3MubGVuZ3RoOyBpIDwgcGFnZV9zaXplOyArK2kpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyRW1wdHlSb3coaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgbl9wYWdlcyA9IE1hdGgubWF4KDEsXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMucHJvcHMudGFibGUubGVuZ3RoIC8gUEFSVElDSVBBTlRTX1BFUl9QQUdFKSArXG4gICAgICAgICAgICAhISh0aGlzLnByb3BzLnRhYmxlLmxlbmd0aCAlIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSkpO1xuICAgICAgICBjb25zdCBwYWdlX3NpemUgPSBNYXRoLm1pbihQQVJUSUNJUEFOVFNfUEVSX1BBR0UsIHRoaXMucHJvcHMudGFibGUubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgY29ycl9wYWdlID0gdGhpcy5zdGF0ZS5wYWdlICUgbl9wYWdlcztcbiAgICAgICAgY29uc3Qgcm93cyA9IHRoaXMucHJvcHMudGFibGUuc2xpY2UoY29ycl9wYWdlICogUEFSVElDSVBBTlRTX1BFUl9QQUdFLCAoY29ycl9wYWdlICsgMSkgKiBQQVJUSUNJUEFOVFNfUEVSX1BBR0UpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJUb3VyUmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAg0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGFibGU+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDihJZcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQo9GH0LDRgdGC0L3QuNC6XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg0JHQsNC70LvRi1xuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwibmV4dC10b3VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCh0LsuINGC0YPRgFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKHJvd3MsIHBhZ2Vfc2l6ZSkgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVuZGVyZXIuZGlzcGxheU5hbWUgPSBcIlRvdXJSZXN1bHRzX1JlbmRlcmVyXCI7XG4iLCJpbXBvcnQgeyBUb3VyUmVzdWx0c0xvYWRlciB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91clJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NyZWVuX2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUb3VyUmVzdWx0c0xvYWRlclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyPXsgUmVuZGVyZXIgfVxuICAgICAgICAgICAgICAgIHNob3dMb2FkZXI9eyBmYWxzZSB9XG4gICAgICAgICAgICAgICAgdG91cklkPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Ub3VyUmVzdWx0cy5kaXNwbGF5TmFtZSA9IFwiVG91clJlc3VsdHNcIjtcbiIsImltcG9ydCBTcGxhc2hTY3JlZW4gZnJvbSBcIi4vU3BsYXNoU2NyZWVuXCI7XG5pbXBvcnQgSGVhdHNPbmVQYXJ0aWNpcGFudCBmcm9tIFwiLi9IZWF0c09uZVBhcnRpY2lwYW50XCI7XG5pbXBvcnQgSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cyBmcm9tIFwiLi9IZWF0c011bHRpcGxlUGFydGljaXBhbnRzXCI7XG5pbXBvcnQgSGVhdHNGb3JtYXRpb24gZnJvbSBcIi4vSGVhdHNGb3JtYXRpb25cIjtcbmltcG9ydCBUb3VyUmVzdWx0cyBmcm9tIFwiLi9Ub3VyUmVzdWx0c1wiO1xuaW1wb3J0IEF3YXJkaW5nIGZyb20gXCIuL0F3YXJkaW5nXCI7XG5cbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vSG9zdE1vZHVsZXNcIjtcblxuY2xhc3MgU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbl9pZDogUFQuc3RyaW5nLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IFBhZ2VDb21wb25lbnQgPSB7XG4gICAgICAgICAgICBcInNwbGFzaFwiOiBTcGxhc2hTY3JlZW4sXG4gICAgICAgICAgICBcImhlYXRzX29uZV9wYXJ0aWNpcGFudFwiOiBIZWF0c09uZVBhcnRpY2lwYW50LFxuICAgICAgICAgICAgXCJoZWF0c19tdWx0aXBsZV9wYXJ0aWNpcGFudHNcIjogSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cyxcbiAgICAgICAgICAgIFwiaGVhdHNfZm9ybWF0aW9uXCI6IEhlYXRzRm9ybWF0aW9uLFxuICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogVG91clJlc3VsdHMsXG4gICAgICAgICAgICBcImF3YXJkaW5nXCI6IEF3YXJkaW5nLFxuICAgICAgICB9W3RoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuc2NyZWVuX2lkXSB8fCBTcGxhc2hTY3JlZW47XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGFnZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcblxuY29uc3QgcmVzcG9uc2UgPSB3aW5kb3cucmVnaXN0ZXJTY3JlZW4oU2NyZWVuKTtcbnNldHVwKHJlc3BvbnNlKTtcbiJdfQ==
