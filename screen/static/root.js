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
                row.place + " \u043C\u0435\u0441\u0442\u043E"
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
                "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: " + score
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
                "\u0417\u0430\u0445\u043E\u0434 " + this.controls.heat + "/" + num_heats
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
                "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: " + score
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
                    "\u0417\u0430\u0445\u043E\u0434 " + run.heat + "/" + num_heats
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
                        "\u0414\u0430"
                    ) : "Нет"
                ) : null
            );
        };

        _this.state = {
            page: 0
        };
        return _this;
    }

    _createClass(Renderer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this._interval = setInterval(function () {
                return _this2.setState({
                    page: _this2.state.page + 1
                });
            }, REFRESH_INTERVAL);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this._interval);
        }
    }, {
        key: "renderEmptyRow",
        value: function renderEmptyRow(key) {
            return React.createElement(
                "tr",
                { className: "empty", key: "ER-" + key },
                React.createElement(
                    "td",
                    null,
                    "\xA0"
                ),
                React.createElement(
                    "td",
                    null,
                    "\xA0"
                ),
                React.createElement(
                    "td",
                    null,
                    "\xA0"
                ),
                React.createElement(
                    "td",
                    null,
                    "\xA0"
                ),
                this.props.tour.next_tour_id !== null ? React.createElement(
                    "td",
                    null,
                    "\xA0"
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
                    "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0442\u0443\u0440\u0430"
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
                                "\u041C"
                            ),
                            React.createElement(
                                "th",
                                { className: "number" },
                                "\u2116"
                            ),
                            React.createElement(
                                "th",
                                { className: "participant" },
                                "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A"
                            ),
                            React.createElement(
                                "th",
                                { className: "score" },
                                "\u0411\u0430\u043B\u043B\u044B"
                            ),
                            this.props.tour.next_tour_id !== null ? React.createElement(
                                "th",
                                { className: "next-tour" },
                                "\u0421\u043B. \u0442\u0443\u0440"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc3hcXEF3YXJkaW5nXFxSZW5kZXJlci5qc3giLCJqc3hcXEF3YXJkaW5nXFxpbmRleC5qc3giLCJqc3hcXEhlYXRzRm9ybWF0aW9uLmpzeCIsImpzeFxcSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cy5qc3giLCJqc3hcXEhlYXRzT25lUGFydGljaXBhbnQuanN4IiwianN4XFxIb3N0TW9kdWxlcy5qc3giLCJqc3hcXFNwbGFzaFNjcmVlbi5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxSZW5kZXJlci5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxpbmRleC5qc3giLCJqc3hcXHJvb3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNBcUIsUTs7Ozs7Ozs7Ozs7c0NBd0JIO0FBQ1YsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBQ00seUJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0I7QUFENUI7QUFESixhQURKO0FBT0g7OztvQ0FDVyxHLEVBQUs7QUFDYixnQkFBSSxJQUFJLEtBQUosS0FBYyxJQUFsQixFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQ1Msb0JBQUksS0FEYjtBQUFBLGFBREo7QUFLSDs7O2lDQUNRO0FBQ0wsZ0JBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQUssS0FBTCxDQUFXLFFBQTVCLENBQVo7QUFDQSxnQkFBSSxDQUFDLEdBQUwsRUFBVTtBQUNOLHVCQUFPLEtBQUssV0FBTCxFQUFQO0FBQ0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsaUJBQWY7QUFDTSx5QkFBSyxLQUFMLENBQVcsVUFB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LG1CQUNJLG9CQUFDLGFBQUQ7QUFDSSw2QkFBYyxLQUFLLEtBQUwsQ0FBVztBQUQ3QixjQURKO0FBS0g7Ozs0QkF4QnNCO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFqQjtBQUNBLG1CQUFPO0FBQ0gsNkJBQWEsR0FBRyxLQUFILENBQVM7QUFDbEIsaUNBQWEsR0FBRyxLQUFILENBQVM7QUFDbEIsbUNBQVcsR0FBRztBQURJLHFCQUFULEVBRVY7QUFIZSxpQkFBVCxFQUlWO0FBTEEsYUFBUDtBQU9IOzs7O0VBVmdCLE1BQU0sUzs7QUE0QjNCLE9BQU8sV0FBUCxHQUFxQixRQUFyQjs7QUFFQSxJQUFNLFdBQVcsT0FBTyxjQUFQLENBQXNCLE1BQXRCLENBQWpCO0FBQ0Esd0JBQU0sUUFBTiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcG9zaXRpb246IFBULm51bWJlcixcclxuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRW1wdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBd2FyZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUGxhY2Uocm93KSB7XHJcbiAgICAgICAgaWYgKHJvdy5wbGFjZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZVwiPlxyXG4gICAgICAgICAgICAgICAgeyBgJHtyb3cucGxhY2V9INC80LXRgdGC0L5gIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLnByb3BzLnRhYmxlW3RoaXMucHJvcHMucG9zaXRpb25dO1xyXG4gICAgICAgIGlmICghcm93KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXdhcmRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRpc2NpcGxpbmUubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQbGFjZShyb3cpIH1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1jbHViXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUmVuZGVyZXIuZGlzcGxheU5hbWUgPSBcIkF3YXJkaW5nX1JlbmRlcmVyXCI7XHJcbiIsImltcG9ydCB7IERpc2NpcGxpbmVSZXN1bHRzTG9hZGVyIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vUmVuZGVyZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzT25lUGFydGljaXBhbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxEaXNjaXBsaW5lUmVzdWx0c0xvYWRlclxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUlkPXsgdGhpcy5jb250cm9scy5kaXNjaXBsaW5lX2lkIH1cclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uPXsgdGhpcy5jb250cm9scy5wb3NpdGlvbiB9XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcj17IFJlbmRlcmVyIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5IZWF0c09uZVBhcnRpY2lwYW50LmRpc3BsYXlOYW1lID0gXCJIZWF0c09uZVBhcnRpY2lwYW50XCI7XHJcbiIsImltcG9ydCBIZWF0c09uZVBhcnRpY2lwYW50IGZyb20gXCIuL0hlYXRzT25lUGFydGljaXBhbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYXRzRm9ybWF0aW9uKHByb3BzKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxIZWF0c09uZVBhcnRpY2lwYW50XHJcbiAgICAgICAgICAgIHNob3dTY29yZT17IGZhbHNlIH1cclxuICAgICAgICAgICAgeyAuLi5wcm9wcyB9XHJcbiAgICAgICAgLz5cclxuICAgICk7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBpLCBzdG9yYWdlLCBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYXQ6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZV9kaXNwYXRjaGVycyA9IFtcclxuICAgICAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpLFxyXG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0ZVwiLCB0aGlzLmxvYWREYXRhKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xyXG4gICAgICAgIGlmIChuZXh0X3Byb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQgIT09IHRoaXMuY29udHJvbHMudG91cl9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XHJcbiAgICAgICAgaWYgKHByZXZfcHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGUudG91cl9pZCAhPT0gdGhpcy5jb250cm9scy50b3VyX2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG1kIG9mIHRoaXMuX21lc3NhZ2VfZGlzcGF0Y2hlcnMpIHtcclxuICAgICAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKG1kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFNDSEVNQSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge30sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJ1bnM6IHtcclxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7fSxcclxuICAgICAgICAgICAgICAgIHNjb3Jlczoge30sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHtcclxuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5jb250cm9scy50b3VyX2lkLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMuY29udHJvbHMudG91cl9pZCwgc3RvcmFnZSlcclxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlKVxyXG4gICAgICAgICAgICAuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZCA9IHN0b3JhZ2VcclxuICAgICAgICAgICAgLmdldChcIlRvdXJcIilcclxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMuY29udHJvbHMudG91cl9pZClcclxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlNDSEVNQSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHRvdXI6IHNlcmlhbGl6ZWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRyb2xzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhblNob3dTY29yZXMocnVuKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVzX21hcCA9IG5ldyBNYXAocnVuLnNjb3Jlcy5tYXAocyA9PiBbcy5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzXSkpO1xyXG4gICAgICAgIGZvciAoY29uc3QgZGogb2YgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMpIHtcclxuICAgICAgICAgICAgaWYgKFtcImRhbmNlX2p1ZGdlXCIsIFwiYWNyb19qdWRnZVwiXS5pbmRleE9mKGRqLnJvbGUpID49IDAgJiYgIXNjb3Jlc19tYXAuZ2V0KGRqLmlkKS5jb25maXJtZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJlbmRlckVtcHR5KCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50c1wiIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlclJlc3VsdChydW4pIHtcclxuICAgICAgICBjb25zdCBzY29yZV9jbGFzcyA9IHRoaXMuY2FuU2hvd1Njb3JlcyhydW4pID8gXCJzY29yZVwiIDogXCJzY29yZSBoaWRkZW5cIjtcclxuICAgICAgICBjb25zdCBzY29yZSA9IHR5cGVvZiBydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICAgID8gcnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHNjb3JlX2NsYXNzIH0+XHJcbiAgICAgICAgICAgICAgICB7IGDQoNC10LfRg9C70YzRgtCw0YI6ICR7c2NvcmV9YCB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUnVuKHJ1bikge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSBydW4ucGVyZm9ybWVkID8gXCJydW5cIiA6IFwicnVuIGhpZGRlblwiO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBydW4ucGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgPT09IFwiXCJcclxuICAgICAgICAgICAgPyBydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLm1hcChzID0+IGAke3MubGFzdF9uYW1lfSAke3MuZmlyc3RfbmFtZX1gKS5qb2luKFwiXFxuXCIpXHJcbiAgICAgICAgICAgIDogcnVuLnBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NfbmFtZSB9IGtleT17IHJ1bi5pZCB9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1udW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUmVzdWx0KHJ1bikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUnVucygpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9scy5oZWF0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBydW5zID0gdGhpcy5zdGF0ZS50b3VyLnJ1bnMuZmlsdGVyKHIgPT4gci5oZWF0ID09PSB0aGlzLmNvbnRyb2xzLmhlYXQpO1xyXG4gICAgICAgIGNvbnN0IHR3b19yb3dzID0gcnVucy5sZW5ndGggPiA0O1xyXG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSB0d29fcm93cyA/IFwicnVucyB0d28tcm93c1wiIDogXCJydW5zXCI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0+XHJcbiAgICAgICAgICAgICAgICB7IHJ1bnMubWFwKHJ1biA9PiB0aGlzLnJlbmRlclJ1bihydW4pKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJIZWF0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmhlYXQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG51bV9oZWF0cyA9IE1hdGgubWF4KC4uLnRoaXMuc3RhdGUudG91ci5ydW5zLm1hcChyID0+IHIuaGVhdCkpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhdFwiPlxyXG4gICAgICAgICAgICAgICAgeyBg0JfQsNGF0L7QtCAke3RoaXMuY29udHJvbHMuaGVhdH0vJHtudW1faGVhdHN9YCB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJFbXB0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudG91ci5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYXQoKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUnVucygpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cy5kaXNwbGF5TmFtZSA9IFwiSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50c1wiO1xyXG4iLCJpbXBvcnQgeyBBcGksIHN0b3JhZ2UsIG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhdHNPbmVQYXJ0aWNpcGFudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuX2RhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc19zdGF0ZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhdDogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzaG93U2NvcmU6IFBULmJvb2wsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNob3dTY29yZTogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZV9kaXNwYXRjaGVycyA9IFtcclxuICAgICAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpLFxyXG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0ZVwiLCB0aGlzLmxvYWREYXRhKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xyXG4gICAgICAgIGlmIChuZXh0X3Byb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQgIT09IHRoaXMuY29udHJvbHMudG91cl9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XHJcbiAgICAgICAgaWYgKHByZXZfcHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGUudG91cl9pZCAhPT0gdGhpcy5jb250cm9scy50b3VyX2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG1kIG9mIHRoaXMuX21lc3NhZ2VfZGlzcGF0Y2hlcnMpIHtcclxuICAgICAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKG1kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFNDSEVNQSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge30sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJ1bnM6IHtcclxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2NvcmVzOiB7fSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xyXG4gICAgICAgICAgICB0b3VyX2lkOiB0aGlzLmNvbnRyb2xzLnRvdXJfaWQsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0aGlzLlNDSEVNQSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkVG9EQihcIlRvdXJcIiwgdGhpcy5jb250cm9scy50b3VyX2lkLCBzdG9yYWdlKVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWRGcm9tU3RvcmFnZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gc3RvcmFnZVxyXG4gICAgICAgICAgICAuZ2V0KFwiVG91clwiKVxyXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5jb250cm9scy50b3VyX2lkKVxyXG4gICAgICAgICAgICAuc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuU2hvd1Njb3JlcyhydW4pIHtcclxuICAgICAgICBjb25zdCBzY29yZXNfbWFwID0gbmV3IE1hcChydW4uc2NvcmVzLm1hcChzID0+IFtzLmRpc2NpcGxpbmVfanVkZ2VfaWQsIHNdKSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcykge1xyXG4gICAgICAgICAgICBpZiAoW1wiZGFuY2VfanVkZ2VcIiwgXCJhY3JvX2p1ZGdlXCJdLmluZGV4T2YoZGoucm9sZSkgPj0gMCAmJiAhc2NvcmVzX21hcC5nZXQoZGouaWQpLmNvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRW1wdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c09uZVBhcnRpY2lwYW50XCIgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUmVzdWx0KHJ1bikge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93U2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNjb3JlX2NsYXNzID0gdGhpcy5jYW5TaG93U2NvcmVzKHJ1bikgPyBcInNjb3JlXCIgOiBcInNjb3JlIGhpZGRlblwiO1xyXG4gICAgICAgIGNvbnN0IHNjb3JlID0gcnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZVxyXG4gICAgICAgICAgICA/IHJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICA6IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBzY29yZV9jbGFzcyB9PlxyXG4gICAgICAgICAgICAgICAgeyBg0KDQtdC30YPQu9GM0YLQsNGCOiAke3Njb3JlfWAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUnVuKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250cm9scy5oZWF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBydW4gPSB0aGlzLnN0YXRlLnRvdXIucnVucy5maW5kKHIgPT4gci5oZWF0ID09PSB0aGlzLmNvbnRyb2xzLmhlYXQpO1xyXG4gICAgICAgIGlmICghcnVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBudW1faGVhdHMgPSBNYXRoLm1heCguLi50aGlzLnN0YXRlLnRvdXIucnVucy5tYXAociA9PiByLmhlYXQpKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ1blwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBg0JfQsNGF0L7QtCAke3J1bi5oZWF0fS8ke251bV9oZWF0c31gIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1udW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1jbHViLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUmVzdWx0KHJ1bikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRW1wdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c09uZVBhcnRpY2lwYW50XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSdW4oKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkhlYXRzT25lUGFydGljaXBhbnQuZGlzcGxheU5hbWUgPSBcIkhlYXRzT25lUGFydGljaXBhbnRcIjtcclxuIiwiZXhwb3J0IGxldCBBcGkgPSBudWxsO1xyXG5leHBvcnQgbGV0IG1lc3NhZ2VfZGlzcGF0Y2hlciA9IG51bGw7XHJcbmV4cG9ydCBsZXQgc3RvcmFnZSA9IG51bGw7XHJcbmV4cG9ydCBsZXQgVG91clJlc3VsdHNMb2FkZXIgPSBudWxsO1xyXG5leHBvcnQgbGV0IERpc2NpcGxpbmVSZXN1bHRzTG9hZGVyID0gbnVsbDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cChkYXRhKSB7XHJcbiAgICBBcGkgICAgICAgICAgICAgICAgICAgICAgPSBkYXRhLkFwaTtcclxuICAgIG1lc3NhZ2VfZGlzcGF0Y2hlciAgICAgICA9IGRhdGEubWVzc2FnZV9kaXNwYXRjaGVyO1xyXG4gICAgc3RvcmFnZSAgICAgICAgICAgICAgICAgID0gZGF0YS5zdG9yYWdlO1xyXG4gICAgVG91clJlc3VsdHNMb2FkZXIgICAgICAgID0gZGF0YS5Ub3VyUmVzdWx0c0xvYWRlcjtcclxuICAgIERpc2NpcGxpbmVSZXN1bHRzTG9hZGVyICA9IGRhdGEuRGlzY2lwbGluZVJlc3VsdHNMb2FkZXI7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BsYXNoU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3BsYXNoU2NyZWVuXCI+XHJcbiAgICAgICAgICAgICAgICA8aDE+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNvbXBldGl0aW9uLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9oMT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuU3BsYXNoU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTcGxhc2hTY3JlZW5cIjtcclxuIiwiY29uc3QgUEFSVElDSVBBTlRTX1BFUl9QQUdFID0gMTU7XHJcbmNvbnN0IFJFRlJFU0hfSU5URVJWQUwgPSA3MDAwO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG5leHRfdG91cl9pZDogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHBhZ2U6IDAsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UgKyAxLFxyXG4gICAgICAgIH0pLCBSRUZSRVNIX0lOVEVSVkFMKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJvdyA9IChyb3cpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHIga2V5PXsgcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyByb3cucGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4ucGFydGljaXBhbnQubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnRvdGFsX3Njb3JlIH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGwgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5leHQtdG91clwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvdy5hZHZhbmNlcyA/IDxiPtCU0LA8L2I+IDogXCLQndC10YJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICkgOiBudWxsIH1cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRW1wdHlSb3coa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImVtcHR5XCIga2V5PXsgYEVSLSR7a2V5fWAgfT5cclxuICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsID8gPHRkPiZuYnNwOzwvdGQ+IDogbnVsbCB9XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlclJvd3Mocm93cywgcGFnZV9zaXplKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHJvd3MubWFwKHRoaXMucmVuZGVyUm93KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gcm93cy5sZW5ndGg7IGkgPCBwYWdlX3NpemU7ICsraSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlckVtcHR5Um93KGkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBuX3BhZ2VzID0gTWF0aC5tYXgoMSxcclxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLnByb3BzLnRhYmxlLmxlbmd0aCAvIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSkgK1xyXG4gICAgICAgICAgICAhISh0aGlzLnByb3BzLnRhYmxlLmxlbmd0aCAlIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSkpO1xyXG4gICAgICAgIGNvbnN0IHBhZ2Vfc2l6ZSA9IE1hdGgubWluKFBBUlRJQ0lQQU5UU19QRVJfUEFHRSwgdGhpcy5wcm9wcy50YWJsZS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGNvcnJfcGFnZSA9IHRoaXMuc3RhdGUucGFnZSAlIG5fcGFnZXM7XHJcbiAgICAgICAgY29uc3Qgcm93cyA9IHRoaXMucHJvcHMudGFibGUuc2xpY2UoY29ycl9wYWdlICogUEFSVElDSVBBTlRTX1BFUl9QQUdFLCAoY29ycl9wYWdlICsgMSkgKiBQQVJUSUNJUEFOVFNfUEVSX1BBR0UpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiVG91clJlc3VsdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICDQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dGFibGU+PHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwibnVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDihJZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQo9GH0LDRgdGC0L3QuNC6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJzY29yZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg0JHQsNC70LvRi1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGwgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwibmV4dC10b3VyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0KHQuy4g0YLRg9GAXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cyhyb3dzLCBwYWdlX3NpemUpIH1cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUmVuZGVyZXIuZGlzcGxheU5hbWUgPSBcIlRvdXJSZXN1bHRzX1JlbmRlcmVyXCI7XHJcbiIsImltcG9ydCB7IFRvdXJSZXN1bHRzTG9hZGVyIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vUmVuZGVyZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvdXJSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW5fZGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUb3VyUmVzdWx0c0xvYWRlclxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI9eyBSZW5kZXJlciB9XHJcbiAgICAgICAgICAgICAgICBzaG93TG9hZGVyPXsgZmFsc2UgfVxyXG4gICAgICAgICAgICAgICAgdG91cklkPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5Ub3VyUmVzdWx0cy5kaXNwbGF5TmFtZSA9IFwiVG91clJlc3VsdHNcIjtcclxuIiwiaW1wb3J0IFNwbGFzaFNjcmVlbiBmcm9tIFwiLi9TcGxhc2hTY3JlZW5cIjtcclxuaW1wb3J0IEhlYXRzT25lUGFydGljaXBhbnQgZnJvbSBcIi4vSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xyXG5pbXBvcnQgSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cyBmcm9tIFwiLi9IZWF0c011bHRpcGxlUGFydGljaXBhbnRzXCI7XHJcbmltcG9ydCBIZWF0c0Zvcm1hdGlvbiBmcm9tIFwiLi9IZWF0c0Zvcm1hdGlvblwiO1xyXG5pbXBvcnQgVG91clJlc3VsdHMgZnJvbSBcIi4vVG91clJlc3VsdHNcIjtcclxuaW1wb3J0IEF3YXJkaW5nIGZyb20gXCIuL0F3YXJkaW5nXCI7XHJcblxyXG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gXCIuL0hvc3RNb2R1bGVzXCI7XHJcblxyXG5jbGFzcyBTY3JlZW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuX2lkOiBQVC5zdHJpbmcsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgUGFnZUNvbXBvbmVudCA9IHtcclxuICAgICAgICAgICAgXCJzcGxhc2hcIjogU3BsYXNoU2NyZWVuLFxyXG4gICAgICAgICAgICBcImhlYXRzX29uZV9wYXJ0aWNpcGFudFwiOiBIZWF0c09uZVBhcnRpY2lwYW50LFxyXG4gICAgICAgICAgICBcImhlYXRzX211bHRpcGxlX3BhcnRpY2lwYW50c1wiOiBIZWF0c011bHRpcGxlUGFydGljaXBhbnRzLFxyXG4gICAgICAgICAgICBcImhlYXRzX2Zvcm1hdGlvblwiOiBIZWF0c0Zvcm1hdGlvbixcclxuICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogVG91clJlc3VsdHMsXHJcbiAgICAgICAgICAgIFwiYXdhcmRpbmdcIjogQXdhcmRpbmcsXHJcbiAgICAgICAgfVt0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLnNjcmVlbl9pZF0gfHwgU3BsYXNoU2NyZWVuO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQYWdlQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IHRoaXMucHJvcHMuY29tcGV0aXRpb24gfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblNjcmVlbi5kaXNwbGF5TmFtZSA9IFwiU2NyZWVuXCI7XHJcblxyXG5jb25zdCByZXNwb25zZSA9IHdpbmRvdy5yZWdpc3RlclNjcmVlbihTY3JlZW4pO1xyXG5zZXR1cChyZXNwb25zZSk7XHJcbiJdfQ==
