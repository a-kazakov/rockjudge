(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HostModules = require("HostModules");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderer = function (_React$Component) {
    _inherits(Renderer, _React$Component);

    _createClass(Renderer, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineId: PT.number.isRequired,
                position: PT.number
            };
        }
    }]);

    function Renderer(props) {
        _classCallCheck(this, Renderer);

        var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

        _this.reloadFromStorage = function () {
            var serialized = _this.storage.get("Discipline").by_id(_this.props.disciplineId).serialize(_this.SCHEMA);
            _this.setState({
                discipline: serialized
            });
        };

        _this.loadData = function () {
            (0, _HostModules.Api)("discipline.get", {
                discipline_id: _this.props.disciplineId,
                children: _this.SCHEMA
            }).addToDB("Discipline", _this.props.disciplineId, _this.storage).onSuccess(_this.reloadFromStorage).send();
        };

        _this.state = {
            discipline: null
        };
        return _this;
    }

    _createClass(Renderer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setupStorage();
            this.reload_listener = _HostModules.message_dispatcher.addListener("reload_data", this.loadData);
            this.db_update_listener = _HostModules.message_dispatcher.addListener("db_update", this.reloadFromStorage);
            this.loadData();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (this.props.disciplineId !== next_props.disciplineId) {
                this.setState({
                    discipline: null
                });
                this.freeStorage(this.props.disciplineId);
                this.setupStorage(next_props.disciplineId);
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props) {
            if (prev_props.disciplineId !== this.props.disciplineId) {
                this.loadData();
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _HostModules.message_dispatcher.removeListener(this.reload_listener);
            _HostModules.message_dispatcher.removeListener(this.db_update_listener);
            this.freeStorage();
        }
    }, {
        key: "setupStorage",
        value: function setupStorage() {
            var discipline_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (discipline_id === null) {
                discipline_id = this.props.disciplineId;
            }
            this.storage = _HostModules.storage.getDomain("juding_scores_" + discipline_id);
        }
    }, {
        key: "freeStorage",
        value: function freeStorage() {
            var discipline_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (discipline_id === null) {
                discipline_id = this.props.disciplineId;
            }
            _HostModules.storage.delDomain("juding_scores_" + discipline_id);
        }
    }, {
        key: "renderEmpty",
        value: function renderEmpty() {
            return React.createElement(
                "div",
                { className: "Awarding" },
                React.createElement(
                    "div",
                    { className: "discipline-name" },
                    this.state.discipline.name
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
            if (this.state.discipline === null) {
                return null;
            }
            var table = (0, _HostModules.makeDisciplineResultsTable)(this.state.discipline);
            var row = table[this.props.position];
            if (!row) {
                return this.renderEmpty();
            }
            return React.createElement(
                "div",
                { className: "Awarding" },
                React.createElement(
                    "div",
                    { className: "discipline-name" },
                    this.state.discipline.name
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
    }, {
        key: "SCHEMA",
        get: function get() {
            return {
                results: {},
                competition: {},
                discipline_judges: {
                    judge: {}
                },
                tours: {
                    runs: {
                        participant: {
                            club: {}
                        }
                    }
                }
            };
        }
    }]);

    return Renderer;
}(React.Component);

exports.default = Renderer;


Renderer.displayName = "Awarding_Renderer";

},{"HostModules":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            return React.createElement(
                "div",
                { className: "discipline-results" },
                React.createElement(_Renderer2.default, {
                    disciplineId: this.controls.discipline_id,
                    position: this.controls.position
                })
            );
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

},{"./Renderer":1}],3:[function(require,module,exports){
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
var makeTourResultsTable = exports.makeTourResultsTable = null;
var makeDisciplineResultsTable = exports.makeDisciplineResultsTable = null;

function setup(data) {
    exports.Api = Api = data.Api;
    exports.message_dispatcher = message_dispatcher = data.message_dispatcher;
    exports.storage = storage = data.storage;
    exports.makeTourResultsTable = makeTourResultsTable = data.makeTourResultsTable;
    exports.makeDisciplineResultsTable = makeDisciplineResultsTable = data.makeDisciplineResultsTable;
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

var _HostModules = require("HostModules");

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
                tourId: PT.number.isRequired
            };
        }
    }]);

    function Renderer(props) {
        _classCallCheck(this, Renderer);

        var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

        _this.reloadFromStorage = function () {
            var serialized = _this.storage.get("Tour").by_id(_this.props.tourId).serialize(_this.SCHEMA);
            _this.setState({
                tour: serialized
            });
        };

        _this.loadData = function () {
            (0, _HostModules.Api)("tour.get", {
                tour_id: _this.props.tourId,
                children: _this.SCHEMA
            }).addToDB("Tour", _this.props.tourId, _this.storage).onSuccess(_this.reloadFromStorage).send();
        };

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
                _this.state.tour.next_tour_id !== null ? React.createElement(
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
            page: 0,
            tour: null
        };
        return _this;
    }

    _createClass(Renderer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this._interval = setInterval(function () {
                return _this2.setState({
                    page: _this2.state.page + 1
                });
            }, REFRESH_INTERVAL);
            this.setupStorage();
            this.reload_listener = _HostModules.message_dispatcher.addListener("reload_data", this.loadData);
            this.db_update_listener = _HostModules.message_dispatcher.addListener("db_update", this.reloadFromStorage);
            this.loadData();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            var _this3 = this;

            if (this.props.tourId !== next_props.tourId) {
                this.setState({
                    page: 0,
                    tour: null
                });
                this.freeStorage(this.props.tourId);
                this.setupStorage(next_props.tourId);
                clearInterval(this._interval);
                this._interval = setInterval(function () {
                    return _this3.setState({
                        page: _this3.state.page + 1
                    });
                }, REFRESH_INTERVAL);
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props) {
            if (prev_props.tourId !== this.props.tourId) {
                this.loadData();
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _HostModules.message_dispatcher.removeListener(this.reload_listener);
            _HostModules.message_dispatcher.removeListener(this.db_update_listener);
            this.freeStorage();
            clearInterval(this._interval);
        }
    }, {
        key: "setupStorage",
        value: function setupStorage() {
            var tour_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (tour_id === null) {
                tour_id = this.props.tourId;
            }
            this.storage = _HostModules.storage.getDomain("juding_scores_" + tour_id);
        }
    }, {
        key: "freeStorage",
        value: function freeStorage() {
            var tour_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (tour_id === null) {
                tour_id = this.props.tourId;
            }
            _HostModules.storage.delDomain("juding_scores_" + tour_id);
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
                this.state.tour.next_tour_id !== null ? React.createElement(
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
            if (this.state.tour === null) {
                return null;
            }
            var table = (0, _HostModules.makeTourResultsTable)(this.state.tour);
            var n_pages = Math.max(1, Math.floor(table.length / PARTICIPANTS_PER_PAGE) + !!(table.length % PARTICIPANTS_PER_PAGE));
            var page_size = Math.min(PARTICIPANTS_PER_PAGE, table.length);
            var corr_page = this.state.page % n_pages;
            var rows = table.slice(corr_page * PARTICIPANTS_PER_PAGE, (corr_page + 1) * PARTICIPANTS_PER_PAGE);
            return React.createElement(
                "div",
                { className: "TourResults tour-results" },
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
                            this.state.tour.next_tour_id !== null ? React.createElement(
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
    }, {
        key: "SCHEMA",
        get: function get() {
            return {
                results: {},
                discipline: {},
                runs: {
                    participant: {
                        club: {}
                    }
                }
            };
        }
    }]);

    return Renderer;
}(React.Component);

exports.default = Renderer;


Renderer.displayName = "TourResults_Renderer";

},{"HostModules":6}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            return React.createElement(_Renderer2.default, {
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

},{"./Renderer":8}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc3hcXEF3YXJkaW5nXFxSZW5kZXJlci5qc3giLCJqc3hcXEF3YXJkaW5nXFxpbmRleC5qc3giLCJqc3hcXEhlYXRzRm9ybWF0aW9uLmpzeCIsImpzeFxcSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cy5qc3giLCJqc3hcXEhlYXRzT25lUGFydGljaXBhbnQuanN4IiwianN4XFxIb3N0TW9kdWxlcy5qc3giLCJqc3hcXFNwbGFzaFNjcmVlbi5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxSZW5kZXJlci5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxpbmRleC5qc3giLCJqc3hcXHJvb3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFcUIsUTs7Ozs7NEJBQ007QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQWpCO0FBQ0EsbUJBQU87QUFDSCw4QkFBYyxHQUFHLE1BQUgsQ0FBVSxVQURyQjtBQUVILDBCQUFVLEdBQUc7QUFGVixhQUFQO0FBSUg7OztBQUVELHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx3SEFDVCxLQURTOztBQUFBLGNBK0RuQixpQkEvRG1CLEdBK0RDLFlBQU07QUFDdEIsZ0JBQU0sYUFBYSxNQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLFlBQWpCLEVBQ2QsS0FEYyxDQUNSLE1BQUssS0FBTCxDQUFXLFlBREgsRUFFZCxTQUZjLENBRUosTUFBSyxNQUZELENBQW5CO0FBR0Esa0JBQUssUUFBTCxDQUFjO0FBQ1YsNEJBQVk7QUFERixhQUFkO0FBR0gsU0F0RWtCOztBQUFBLGNBdUVuQixRQXZFbUIsR0F1RVIsWUFBTTtBQUNiLGtDQUFJLGdCQUFKLEVBQXNCO0FBQ2xCLCtCQUFlLE1BQUssS0FBTCxDQUFXLFlBRFI7QUFFbEIsMEJBQVUsTUFBSztBQUZHLGFBQXRCLEVBSUssT0FKTCxDQUlhLFlBSmIsRUFJMkIsTUFBSyxLQUFMLENBQVcsWUFKdEMsRUFJb0QsTUFBSyxPQUp6RCxFQUtLLFNBTEwsQ0FLZSxNQUFLLGlCQUxwQixFQU1LLElBTkw7QUFPSCxTQS9Fa0I7O0FBRWYsY0FBSyxLQUFMLEdBQWE7QUFDVCx3QkFBWTtBQURILFNBQWI7QUFGZTtBQUtsQjs7Ozs2Q0FFb0I7QUFDakIsaUJBQUssWUFBTDtBQUNBLGlCQUFLLGVBQUwsR0FBdUIsZ0NBQW1CLFdBQW5CLENBQStCLGFBQS9CLEVBQThDLEtBQUssUUFBbkQsQ0FBdkI7QUFDQSxpQkFBSyxrQkFBTCxHQUEwQixnQ0FBbUIsV0FBbkIsQ0FBK0IsV0FBL0IsRUFBNEMsS0FBSyxpQkFBakQsQ0FBMUI7QUFDQSxpQkFBSyxRQUFMO0FBQ0g7OztrREFDeUIsVSxFQUFZO0FBQ2xDLGdCQUFJLEtBQUssS0FBTCxDQUFXLFlBQVgsS0FBNEIsV0FBVyxZQUEzQyxFQUF5RDtBQUNyRCxxQkFBSyxRQUFMLENBQWM7QUFDVixnQ0FBWTtBQURGLGlCQUFkO0FBR0EscUJBQUssV0FBTCxDQUFpQixLQUFLLEtBQUwsQ0FBVyxZQUE1QjtBQUNBLHFCQUFLLFlBQUwsQ0FBa0IsV0FBVyxZQUE3QjtBQUNIO0FBQ0o7OzsyQ0FDa0IsVSxFQUFZO0FBQzNCLGdCQUFJLFdBQVcsWUFBWCxLQUE0QixLQUFLLEtBQUwsQ0FBVyxZQUEzQyxFQUF5RDtBQUNyRCxxQkFBSyxRQUFMO0FBQ0g7QUFDSjs7OytDQUNzQjtBQUNuQiw0Q0FBbUIsY0FBbkIsQ0FBa0MsS0FBSyxlQUF2QztBQUNBLDRDQUFtQixjQUFuQixDQUFrQyxLQUFLLGtCQUF2QztBQUNBLGlCQUFLLFdBQUw7QUFDSDs7O3VDQW1CZ0M7QUFBQSxnQkFBcEIsYUFBb0IsdUVBQU4sSUFBTTs7QUFDN0IsZ0JBQUksa0JBQWtCLElBQXRCLEVBQTRCO0FBQ3hCLGdDQUFnQixLQUFLLEtBQUwsQ0FBVyxZQUEzQjtBQUNIO0FBQ0QsaUJBQUssT0FBTCxHQUFlLHFCQUFRLFNBQVIsb0JBQW1DLGFBQW5DLENBQWY7QUFDSDs7O3NDQUMrQjtBQUFBLGdCQUFwQixhQUFvQix1RUFBTixJQUFNOztBQUM1QixnQkFBSSxrQkFBa0IsSUFBdEIsRUFBNEI7QUFDeEIsZ0NBQWdCLEtBQUssS0FBTCxDQUFXLFlBQTNCO0FBQ0g7QUFDRCxpQ0FBUSxTQUFSLG9CQUFtQyxhQUFuQztBQUNIOzs7c0NBb0JhO0FBQ1YsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBQ00seUJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0I7QUFENUI7QUFESixhQURKO0FBT0g7OztvQ0FDVyxHLEVBQUs7QUFDYixnQkFBSSxJQUFJLEtBQUosS0FBYyxJQUFsQixFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQ1Msb0JBQUksS0FEYjtBQUFBLGFBREo7QUFLSDs7O2lDQUNRO0FBQ0wsZ0JBQUksS0FBSyxLQUFMLENBQVcsVUFBWCxLQUEwQixJQUE5QixFQUFvQztBQUNoQyx1QkFBTyxJQUFQO0FBQ0g7QUFDRCxnQkFBTSxRQUFRLDZDQUEyQixLQUFLLEtBQUwsQ0FBVyxVQUF0QyxDQUFkO0FBQ0EsZ0JBQU0sTUFBTSxNQUFNLEtBQUssS0FBTCxDQUFXLFFBQWpCLENBQVo7QUFDQSxnQkFBSSxDQUFDLEdBQUwsRUFBVTtBQUNOLHVCQUFPLEtBQUssV0FBTCxFQUFQO0FBQ0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsaUJBQWY7QUFDTSx5QkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQjtBQUQ1QixpQkFESjtBQUlNLHFCQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FKTjtBQUtJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGtCQUFmO0FBQ00sd0JBQUksR0FBSixDQUFRLFdBQVIsQ0FBb0I7QUFEMUIsaUJBTEo7QUFRSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxrQkFBZjtBQUNNLHdCQUFJLEdBQUosQ0FBUSxXQUFSLENBQW9CLElBQXBCLENBQXlCO0FBRC9CO0FBUkosYUFESjtBQWNIOzs7NEJBMUZZO0FBQ1QsbUJBQU87QUFDSCx5QkFBUyxFQUROO0FBRUgsNkJBQWEsRUFGVjtBQUdILG1DQUFtQjtBQUNmLDJCQUFPO0FBRFEsaUJBSGhCO0FBTUgsdUJBQU87QUFDSCwwQkFBTTtBQUNGLHFDQUFhO0FBQ1Qsa0NBQU07QUFERztBQURYO0FBREg7QUFOSixhQUFQO0FBY0g7Ozs7RUF6RGlDLE1BQU0sUzs7a0JBQXZCLFE7OztBQXVJckIsU0FBUyxXQUFULEdBQXVCLG1CQUF2Qjs7Ozs7Ozs7Ozs7QUN6SUE7Ozs7Ozs7Ozs7OztJQUVxQixtQjs7Ozs7Ozs7Ozs7aUNBbUJSO0FBQ0wsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsb0JBQWY7QUFDSTtBQUNJLGtDQUFlLEtBQUssUUFBTCxDQUFjLGFBRGpDO0FBRUksOEJBQVcsS0FBSyxRQUFMLENBQWM7QUFGN0I7QUFESixhQURKO0FBUUg7Ozs0QkFiYztBQUNYLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsY0FBMUM7QUFDSDs7OzRCQWhCc0I7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQWpCO0FBQ0EsbUJBQU87QUFDSCw2QkFBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQixpQ0FBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQix3Q0FBZ0IsR0FBRyxLQUFILENBQVM7QUFDckIsMkNBQWUsR0FBRyxNQUFILENBQVUsVUFESjtBQUVyQixzQ0FBVSxHQUFHO0FBRlEseUJBQVQsRUFHYjtBQUplLHFCQUFULEVBS1Y7QUFOZSxpQkFBVCxFQU9WO0FBUkEsYUFBUDtBQVVIOzs7O0VBYjRDLE1BQU0sUzs7a0JBQWxDLG1COzs7QUErQnJCLG9CQUFvQixXQUFwQixHQUFrQyxxQkFBbEM7Ozs7Ozs7Ozs7O2tCQy9Cd0IsYzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsY0FBVCxDQUF3QixLQUF4QixFQUErQjtBQUMxQyxXQUNJO0FBQ0ksbUJBQVk7QUFEaEIsT0FFUyxLQUZULEVBREo7QUFNSDs7Ozs7Ozs7Ozs7QUNURDs7Ozs7Ozs7OztJQUVxQix5Qjs7Ozs7NEJBQ007QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQWpCO0FBQ0EsbUJBQU87QUFDSCw2QkFBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQixpQ0FBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQix3Q0FBZ0IsR0FBRyxLQUFILENBQVM7QUFDckIscUNBQVMsR0FBRyxNQUFILENBQVUsVUFERTtBQUVyQixrQ0FBTSxHQUFHO0FBRlkseUJBQVQsRUFHYjtBQUplLHFCQUFULEVBS1Y7QUFOZSxpQkFBVCxFQU9WO0FBUkEsYUFBUDtBQVVIOzs7QUFFRCx1Q0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEpBQ1QsS0FEUzs7QUFBQSxjQTRDbkIsUUE1Q21CLEdBNENSLFlBQU07QUFDYixrQ0FBSSxVQUFKLEVBQWdCO0FBQ1oseUJBQVMsTUFBSyxRQUFMLENBQWMsT0FEWDtBQUVaLDBCQUFVLE1BQUs7QUFGSCxhQUFoQixFQUlLLE9BSkwsQ0FJYSxNQUpiLEVBSXFCLE1BQUssUUFBTCxDQUFjLE9BSm5DLHdCQUtLLFNBTEwsQ0FLZSxNQUFLLGlCQUxwQixFQU1LLElBTkw7QUFPSCxTQXBEa0I7O0FBQUEsY0FxRG5CLGlCQXJEbUIsR0FxREMsWUFBTTtBQUN0QixnQkFBTSxhQUFhLHFCQUNkLEdBRGMsQ0FDVixNQURVLEVBRWQsS0FGYyxDQUVSLE1BQUssUUFBTCxDQUFjLE9BRk4sRUFHZCxTQUhjLENBR0osTUFBSyxNQUhELENBQW5CO0FBSUEsa0JBQUssUUFBTCxDQUFjO0FBQ1Ysc0JBQU07QUFESSxhQUFkO0FBR0gsU0E3RGtCOztBQUVmLGNBQUssS0FBTCxHQUFhO0FBQ1Qsa0JBQU07QUFERyxTQUFiO0FBRmU7QUFLbEI7Ozs7NkNBRW9CO0FBQ2pCLGlCQUFLLG9CQUFMLEdBQTRCLENBQ3hCLGdDQUFtQixXQUFuQixDQUErQixXQUEvQixFQUE0QyxLQUFLLGlCQUFqRCxDQUR3QixFQUV4QixnQ0FBbUIsV0FBbkIsQ0FBK0IsYUFBL0IsRUFBOEMsS0FBSyxRQUFuRCxDQUZ3QixDQUE1QjtBQUlBLGlCQUFLLFFBQUw7QUFDSDs7O2tEQUN5QixVLEVBQVk7QUFDbEMsZ0JBQUksV0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLGNBQW5DLENBQWtELE9BQWxELEtBQThELEtBQUssUUFBTCxDQUFjLE9BQWhGLEVBQXlGO0FBQ3JGLHFCQUFLLFFBQUwsQ0FBYztBQUNWLDBCQUFNO0FBREksaUJBQWQ7QUFHSDtBQUNKOzs7MkNBQ2tCLFUsRUFBWTtBQUMzQixnQkFBSSxXQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsY0FBbkMsQ0FBa0QsT0FBbEQsS0FBOEQsS0FBSyxRQUFMLENBQWMsT0FBaEYsRUFBeUY7QUFDckYscUJBQUssUUFBTDtBQUNIO0FBQ0o7OzsrQ0FDc0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDbkIscUNBQWlCLEtBQUssb0JBQXRCLDhIQUE0QztBQUFBLHdCQUFqQyxFQUFpQzs7QUFDeEMsb0RBQW1CLGNBQW5CLENBQWtDLEVBQWxDO0FBQ0g7QUFIa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUl0Qjs7O3NDQXFDYSxHLEVBQUs7QUFDZixnQkFBTSxhQUFhLElBQUksR0FBSixDQUFRLElBQUksTUFBSixDQUFXLEdBQVgsQ0FBZTtBQUFBLHVCQUFLLENBQUMsRUFBRSxtQkFBSCxFQUF3QixDQUF4QixDQUFMO0FBQUEsYUFBZixDQUFSLENBQW5CO0FBRGU7QUFBQTtBQUFBOztBQUFBO0FBRWYsc0NBQWlCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBMkIsaUJBQTVDLG1JQUErRDtBQUFBLHdCQUFwRCxFQUFvRDs7QUFDM0Qsd0JBQUksQ0FBQyxhQUFELEVBQWdCLFlBQWhCLEVBQThCLE9BQTlCLENBQXNDLEdBQUcsSUFBekMsS0FBa0QsQ0FBbEQsSUFBdUQsQ0FBQyxXQUFXLEdBQVgsQ0FBZSxHQUFHLEVBQWxCLEVBQXNCLFNBQWxGLEVBQTZGO0FBQ3pGLCtCQUFPLEtBQVA7QUFDSDtBQUNKO0FBTmM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPZixtQkFBTyxJQUFQO0FBQ0g7OztzQ0FDYTtBQUNWLG1CQUNJLDZCQUFLLFdBQVUsMkJBQWYsR0FESjtBQUdIOzs7cUNBQ1ksRyxFQUFLO0FBQ2QsZ0JBQU0sY0FBYyxLQUFLLGFBQUwsQ0FBbUIsR0FBbkIsSUFBMEIsT0FBMUIsR0FBb0MsY0FBeEQ7QUFDQSxnQkFBTSxRQUFRLE9BQU8sSUFBSSxtQkFBSixDQUF3QixhQUEvQixLQUFpRCxXQUFqRCxHQUNSLElBQUksbUJBQUosQ0FBd0IsYUFBeEIsQ0FBc0MsT0FBdEMsQ0FBOEMsQ0FBOUMsQ0FEUSxHQUVSLEVBRk47QUFHQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBWSxXQUFqQjtBQUFBLDZFQUNvQjtBQURwQixhQURKO0FBS0g7OztrQ0FFUyxHLEVBQUs7QUFDWCxnQkFBTSxhQUFhLElBQUksU0FBSixHQUFnQixLQUFoQixHQUF3QixZQUEzQztBQUNBLGdCQUFNLE9BQU8sSUFBSSxXQUFKLENBQWdCLGNBQWhCLEtBQW1DLEVBQW5DLEdBQ1AsSUFBSSxXQUFKLENBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCO0FBQUEsdUJBQVEsRUFBRSxTQUFWLFNBQXVCLEVBQUUsVUFBekI7QUFBQSxhQUE5QixFQUFxRSxJQUFyRSxDQUEwRSxJQUExRSxDQURPLEdBRVAsSUFBSSxXQUFKLENBQWdCLGNBRnRCO0FBR0EsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVksVUFBakIsRUFBOEIsS0FBTSxJQUFJLEVBQXhDO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsb0JBQWY7QUFDTSx3QkFBSSxXQUFKLENBQWdCO0FBRHRCLGlCQURKO0FBSUk7QUFBQTtBQUFBLHNCQUFLLFdBQVUsa0JBQWY7QUFDTTtBQUROLGlCQUpKO0FBT00scUJBQUssWUFBTCxDQUFrQixHQUFsQjtBQVBOLGFBREo7QUFXSDs7O3FDQUNZO0FBQUE7O0FBQ1QsZ0JBQUksS0FBSyxRQUFMLENBQWMsSUFBZCxLQUF1QixJQUEzQixFQUFpQztBQUM3Qix1QkFBTyxJQUFQO0FBQ0g7QUFDRCxnQkFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckIsQ0FBNEI7QUFBQSx1QkFBSyxFQUFFLElBQUYsS0FBVyxPQUFLLFFBQUwsQ0FBYyxJQUE5QjtBQUFBLGFBQTVCLENBQWI7QUFDQSxnQkFBTSxXQUFXLEtBQUssTUFBTCxHQUFjLENBQS9CO0FBQ0EsZ0JBQU0sYUFBYSxXQUFXLGVBQVgsR0FBNkIsTUFBaEQ7QUFDQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBWSxVQUFqQjtBQUNNLHFCQUFLLEdBQUwsQ0FBUztBQUFBLDJCQUFPLE9BQUssU0FBTCxDQUFlLEdBQWYsQ0FBUDtBQUFBLGlCQUFUO0FBRE4sYUFESjtBQUtIOzs7cUNBQ1k7QUFDVCxnQkFBSSxLQUFLLFFBQUwsQ0FBYyxJQUFkLEtBQXVCLElBQTNCLEVBQWlDO0FBQzdCLHVCQUFPLElBQVA7QUFDSDtBQUNELGdCQUFNLFlBQVksS0FBSyxHQUFMLGdDQUFZLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBeUI7QUFBQSx1QkFBSyxFQUFFLElBQVA7QUFBQSxhQUF6QixDQUFaLEVBQWxCO0FBQ0EsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsTUFBZjtBQUFBLG9EQUNlLEtBQUssUUFBTCxDQUFjLElBRDdCLFNBQ3FDO0FBRHJDLGFBREo7QUFLSDs7O2lDQUNRO0FBQ0wsZ0JBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFvQixJQUF4QixFQUE4QjtBQUMxQix1QkFBTyxLQUFLLFdBQUwsRUFBUDtBQUNIO0FBQ0QsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsMkJBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxpQkFBZjtBQUNNLHlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFVBQWhCLENBQTJCO0FBRGpDLGlCQURKO0FBSUk7QUFBQTtBQUFBLHNCQUFLLFdBQVUsV0FBZjtBQUNNLHlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCO0FBRHRCLGlCQUpKO0FBT00scUJBQUssVUFBTCxFQVBOO0FBUU0scUJBQUssVUFBTDtBQVJOLGFBREo7QUFZSDs7OzRCQXRIWTtBQUNULG1CQUFPO0FBQ0gsNEJBQVk7QUFDUix1Q0FBbUI7QUFEWCxpQkFEVDtBQUlILHNCQUFNO0FBQ0YsaUNBQWEsRUFEWDtBQUVGLDRCQUFRO0FBRk47QUFKSCxhQUFQO0FBU0g7Ozs0QkFxQmM7QUFDWCxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLGNBQTFDO0FBQ0g7Ozs7RUFoRmtELE1BQU0sUzs7a0JBQXhDLHlCOzs7QUF3S3JCLDBCQUEwQixXQUExQixHQUF3QywyQkFBeEM7Ozs7Ozs7Ozs7O0FDMUtBOzs7Ozs7Ozs7O0lBRXFCLG1COzs7Ozs0QkFDTTtBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBakI7QUFDQSxtQkFBTztBQUNILDZCQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLGlDQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLHdDQUFnQixHQUFHLEtBQUgsQ0FBUztBQUNyQixxQ0FBUyxHQUFHLE1BQUgsQ0FBVSxVQURFO0FBRXJCLGtDQUFNLEdBQUc7QUFGWSx5QkFBVCxFQUdiO0FBSmUscUJBQVQsRUFLVjtBQU5lLGlCQUFULEVBT1YsVUFSQTtBQVNILDJCQUFXLEdBQUc7QUFUWCxhQUFQO0FBV0g7Ozs0QkFDeUI7QUFDdEIsbUJBQU87QUFDSCwyQkFBVztBQURSLGFBQVA7QUFHSDs7O0FBRUQsaUNBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDhJQUNULEtBRFM7O0FBQUEsY0E4Q25CLFFBOUNtQixHQThDUixZQUFNO0FBQ2Isa0NBQUksVUFBSixFQUFnQjtBQUNaLHlCQUFTLE1BQUssUUFBTCxDQUFjLE9BRFg7QUFFWiwwQkFBVSxNQUFLO0FBRkgsYUFBaEIsRUFJSyxPQUpMLENBSWEsTUFKYixFQUlxQixNQUFLLFFBQUwsQ0FBYyxPQUpuQyx3QkFLSyxTQUxMLENBS2UsTUFBSyxpQkFMcEIsRUFNSyxJQU5MO0FBT0gsU0F0RGtCOztBQUFBLGNBdURuQixpQkF2RG1CLEdBdURDLFlBQU07QUFDdEIsZ0JBQU0sYUFBYSxxQkFDZCxHQURjLENBQ1YsTUFEVSxFQUVkLEtBRmMsQ0FFUixNQUFLLFFBQUwsQ0FBYyxPQUZOLEVBR2QsU0FIYyxDQUdKLE1BQUssTUFIRCxDQUFuQjtBQUlBLGtCQUFLLFFBQUwsQ0FBYztBQUNWLHNCQUFNO0FBREksYUFBZDtBQUdILFNBL0RrQjs7QUFFZixjQUFLLEtBQUwsR0FBYTtBQUNULGtCQUFNO0FBREcsU0FBYjtBQUZlO0FBS2xCOzs7OzZDQUVvQjtBQUNqQixpQkFBSyxvQkFBTCxHQUE0QixDQUN4QixnQ0FBbUIsV0FBbkIsQ0FBK0IsV0FBL0IsRUFBNEMsS0FBSyxpQkFBakQsQ0FEd0IsRUFFeEIsZ0NBQW1CLFdBQW5CLENBQStCLGFBQS9CLEVBQThDLEtBQUssUUFBbkQsQ0FGd0IsQ0FBNUI7QUFJQSxpQkFBSyxRQUFMO0FBQ0g7OztrREFDeUIsVSxFQUFZO0FBQ2xDLGdCQUFJLFdBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFtQyxjQUFuQyxDQUFrRCxPQUFsRCxLQUE4RCxLQUFLLFFBQUwsQ0FBYyxPQUFoRixFQUF5RjtBQUNyRixxQkFBSyxRQUFMLENBQWM7QUFDViwwQkFBTTtBQURJLGlCQUFkO0FBR0g7QUFDSjs7OzJDQUNrQixVLEVBQVk7QUFDM0IsZ0JBQUksV0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLGNBQW5DLENBQWtELE9BQWxELEtBQThELEtBQUssUUFBTCxDQUFjLE9BQWhGLEVBQXlGO0FBQ3JGLHFCQUFLLFFBQUw7QUFDSDtBQUNKOzs7K0NBQ3NCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ25CLHFDQUFpQixLQUFLLG9CQUF0Qiw4SEFBNEM7QUFBQSx3QkFBakMsRUFBaUM7O0FBQ3hDLG9EQUFtQixjQUFuQixDQUFrQyxFQUFsQztBQUNIO0FBSGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJdEI7OztzQ0F1Q2EsRyxFQUFLO0FBQ2YsZ0JBQU0sYUFBYSxJQUFJLEdBQUosQ0FBUSxJQUFJLE1BQUosQ0FBVyxHQUFYLENBQWU7QUFBQSx1QkFBSyxDQUFDLEVBQUUsbUJBQUgsRUFBd0IsQ0FBeEIsQ0FBTDtBQUFBLGFBQWYsQ0FBUixDQUFuQjtBQURlO0FBQUE7QUFBQTs7QUFBQTtBQUVmLHNDQUFpQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFVBQWhCLENBQTJCLGlCQUE1QyxtSUFBK0Q7QUFBQSx3QkFBcEQsRUFBb0Q7O0FBQzNELHdCQUFJLENBQUMsYUFBRCxFQUFnQixZQUFoQixFQUE4QixPQUE5QixDQUFzQyxHQUFHLElBQXpDLEtBQWtELENBQWxELElBQXVELENBQUMsV0FBVyxHQUFYLENBQWUsR0FBRyxFQUFsQixFQUFzQixTQUFsRixFQUE2RjtBQUN6RiwrQkFBTyxLQUFQO0FBQ0g7QUFDSjtBQU5jO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT2YsbUJBQU8sSUFBUDtBQUNIOzs7c0NBQ2E7QUFDVixtQkFDSSw2QkFBSyxXQUFVLHFCQUFmLEdBREo7QUFHSDs7O3FDQUNZLEcsRUFBSztBQUNkLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsU0FBaEIsRUFBMkI7QUFDdkIsdUJBQU8sSUFBUDtBQUNIO0FBQ0QsZ0JBQU0sY0FBYyxLQUFLLGFBQUwsQ0FBbUIsR0FBbkIsSUFBMEIsT0FBMUIsR0FBb0MsY0FBeEQ7QUFDQSxnQkFBTSxRQUFRLElBQUksbUJBQUosQ0FBd0IsYUFBeEIsR0FDUixJQUFJLG1CQUFKLENBQXdCLGFBQXhCLENBQXNDLE9BQXRDLENBQThDLENBQTlDLENBRFEsR0FFUixFQUZOO0FBR0EsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVksV0FBakI7QUFBQSw2RUFDb0I7QUFEcEIsYUFESjtBQUtIOzs7b0NBQ1c7QUFBQTs7QUFDUixnQkFBSSxDQUFDLEtBQUssUUFBTCxDQUFjLElBQW5CLEVBQXlCO0FBQ3JCLHVCQUFPLElBQVA7QUFDSDtBQUNELGdCQUFNLE1BQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixJQUFyQixDQUEwQjtBQUFBLHVCQUFLLEVBQUUsSUFBRixLQUFXLE9BQUssUUFBTCxDQUFjLElBQTlCO0FBQUEsYUFBMUIsQ0FBWjtBQUNBLGdCQUFJLENBQUMsR0FBTCxFQUFVO0FBQ04sdUJBQU8sSUFBUDtBQUNIO0FBQ0QsZ0JBQU0sWUFBWSxLQUFLLEdBQUwsZ0NBQVksS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixHQUFyQixDQUF5QjtBQUFBLHVCQUFLLEVBQUUsSUFBUDtBQUFBLGFBQXpCLENBQVosRUFBbEI7QUFDQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsTUFBZjtBQUFBLHdEQUNlLElBQUksSUFEbkIsU0FDMkI7QUFEM0IsaUJBREo7QUFJSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxvQkFBZjtBQUNNLHdCQUFJLFdBQUosQ0FBZ0I7QUFEdEIsaUJBSko7QUFPSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxrQkFBZjtBQUNNLHdCQUFJLFdBQUosQ0FBZ0I7QUFEdEIsaUJBUEo7QUFVSTtBQUFBO0FBQUEsc0JBQUssV0FBVSx1QkFBZjtBQUNNLHdCQUFJLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBcUI7QUFEM0IsaUJBVko7QUFhTSxxQkFBSyxZQUFMLENBQWtCLEdBQWxCO0FBYk4sYUFESjtBQWlCSDs7O2lDQUNRO0FBQ0wsZ0JBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFvQixJQUF4QixFQUE4QjtBQUMxQix1QkFBTyxLQUFLLFdBQUwsRUFBUDtBQUNIO0FBQ0QsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUscUJBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxpQkFBZjtBQUNNLHlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFVBQWhCLENBQTJCO0FBRGpDLGlCQURKO0FBSUk7QUFBQTtBQUFBLHNCQUFLLFdBQVUsV0FBZjtBQUNNLHlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCO0FBRHRCLGlCQUpKO0FBT00scUJBQUssU0FBTDtBQVBOLGFBREo7QUFXSDs7OzRCQTNHWTtBQUNULG1CQUFPO0FBQ0gsNEJBQVk7QUFDUix1Q0FBbUI7QUFEWCxpQkFEVDtBQUlILHNCQUFNO0FBQ0YsaUNBQWE7QUFDVCw4QkFBTTtBQURHLHFCQURYO0FBSUYsNEJBQVE7QUFKTjtBQUpILGFBQVA7QUFXSDs7OzRCQXFCYztBQUNYLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsY0FBMUM7QUFDSDs7OztFQXhGNEMsTUFBTSxTOztrQkFBbEMsbUI7OztBQW1LckIsb0JBQW9CLFdBQXBCLEdBQWtDLHFCQUFsQzs7Ozs7Ozs7UUMvSmdCLEssR0FBQSxLO0FBTlQsSUFBSSxvQkFBTSxJQUFWO0FBQ0EsSUFBSSxrREFBcUIsSUFBekI7QUFDQSxJQUFJLDRCQUFVLElBQWQ7QUFDQSxJQUFJLHNEQUF1QixJQUEzQjtBQUNBLElBQUksa0VBQTZCLElBQWpDOztBQUVBLFNBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFDeEIsWUFQTyxHQU9QLFNBQTZCLEtBQUssR0FBbEM7QUFDQSxZQVBPLGtCQU9QLHdCQUE2QixLQUFLLGtCQUFsQztBQUNBLFlBUE8sT0FPUCxhQUE2QixLQUFLLE9BQWxDO0FBQ0EsWUFQTyxvQkFPUCwwQkFBNkIsS0FBSyxvQkFBbEM7QUFDQSxZQVBPLDBCQU9QLGdDQUE2QixLQUFLLDBCQUFsQztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztJQ1pvQixZOzs7Ozs7Ozs7OztpQ0FTUjtBQUNMLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGNBQWY7QUFDSTtBQUFBO0FBQUE7QUFDTSx5QkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QjtBQUQ3QjtBQURKLGFBREo7QUFPSDs7OzRCQWhCc0I7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQWpCO0FBQ0EsbUJBQU87QUFDSCw2QkFBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQiwwQkFBTSxHQUFHLE1BQUgsQ0FBVTtBQURFLGlCQUFULEVBRVY7QUFIQSxhQUFQO0FBS0g7Ozs7RUFScUMsTUFBTSxTOztrQkFBM0IsWTs7O0FBb0JyQixhQUFhLFdBQWIsR0FBMkIsY0FBM0I7Ozs7Ozs7Ozs7O0FDcEJBOzs7Ozs7OztBQUVBLElBQU0sd0JBQXdCLEVBQTlCO0FBQ0EsSUFBTSxtQkFBbUIsSUFBekI7O0lBRXFCLFE7Ozs7OzRCQUNNO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFqQjtBQUNBLG1CQUFPO0FBQ0gsd0JBQVEsR0FBRyxNQUFILENBQVU7QUFEZixhQUFQO0FBR0g7OztBQUVELHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx3SEFDVCxLQURTOztBQUFBLGNBb0VuQixpQkFwRW1CLEdBb0VDLFlBQU07QUFDdEIsZ0JBQU0sYUFBYSxNQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLE1BQWpCLEVBQ2QsS0FEYyxDQUNSLE1BQUssS0FBTCxDQUFXLE1BREgsRUFFZCxTQUZjLENBRUosTUFBSyxNQUZELENBQW5CO0FBR0Esa0JBQUssUUFBTCxDQUFjO0FBQ1Ysc0JBQU07QUFESSxhQUFkO0FBR0gsU0EzRWtCOztBQUFBLGNBNEVuQixRQTVFbUIsR0E0RVIsWUFBTTtBQUNiLGtDQUFJLFVBQUosRUFBZ0I7QUFDWix5QkFBUyxNQUFLLEtBQUwsQ0FBVyxNQURSO0FBRVosMEJBQVUsTUFBSztBQUZILGFBQWhCLEVBSUssT0FKTCxDQUlhLE1BSmIsRUFJcUIsTUFBSyxLQUFMLENBQVcsTUFKaEMsRUFJd0MsTUFBSyxPQUo3QyxFQUtLLFNBTEwsQ0FLZSxNQUFLLGlCQUxwQixFQU1LLElBTkw7QUFPSCxTQXBGa0I7O0FBQUEsY0FzRm5CLFNBdEZtQixHQXNGUCxVQUFDLEdBQUQsRUFBUztBQUNqQixtQkFDSTtBQUFBO0FBQUEsa0JBQUksS0FBTSxJQUFJLEdBQUosQ0FBUSxFQUFsQjtBQUNJO0FBQUE7QUFBQSxzQkFBSSxXQUFVLE9BQWQ7QUFDTSx3QkFBSTtBQURWLGlCQURKO0FBSUk7QUFBQTtBQUFBLHNCQUFJLFdBQVUsUUFBZDtBQUNNLHdCQUFJLEdBQUosQ0FBUSxXQUFSLENBQW9CO0FBRDFCLGlCQUpKO0FBT0k7QUFBQTtBQUFBLHNCQUFJLFdBQVUsYUFBZDtBQUNNLHdCQUFJLEdBQUosQ0FBUSxXQUFSLENBQW9CO0FBRDFCLGlCQVBKO0FBVUk7QUFBQTtBQUFBLHNCQUFJLFdBQVUsT0FBZDtBQUNNLHdCQUFJLEdBQUosQ0FBUTtBQURkLGlCQVZKO0FBYU0sc0JBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsWUFBaEIsS0FBaUMsSUFBakMsR0FDRTtBQUFBO0FBQUEsc0JBQUksV0FBVSxXQUFkO0FBQ00sd0JBQUksUUFBSixHQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWYsR0FBMkI7QUFEakMsaUJBREYsR0FJRTtBQWpCUixhQURKO0FBcUJILFNBNUdrQjs7QUFFZixjQUFLLEtBQUwsR0FBYTtBQUNULGtCQUFNLENBREc7QUFFVCxrQkFBTTtBQUZHLFNBQWI7QUFGZTtBQU1sQjs7Ozs2Q0FFb0I7QUFBQTs7QUFDakIsaUJBQUssU0FBTCxHQUFpQixZQUFZO0FBQUEsdUJBQU0sT0FBSyxRQUFMLENBQWM7QUFDN0MsMEJBQU0sT0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQjtBQURxQixpQkFBZCxDQUFOO0FBQUEsYUFBWixFQUViLGdCQUZhLENBQWpCO0FBR0EsaUJBQUssWUFBTDtBQUNBLGlCQUFLLGVBQUwsR0FBdUIsZ0NBQW1CLFdBQW5CLENBQStCLGFBQS9CLEVBQThDLEtBQUssUUFBbkQsQ0FBdkI7QUFDQSxpQkFBSyxrQkFBTCxHQUEwQixnQ0FBbUIsV0FBbkIsQ0FBK0IsV0FBL0IsRUFBNEMsS0FBSyxpQkFBakQsQ0FBMUI7QUFDQSxpQkFBSyxRQUFMO0FBQ0g7OztrREFDeUIsVSxFQUFZO0FBQUE7O0FBQ2xDLGdCQUFJLEtBQUssS0FBTCxDQUFXLE1BQVgsS0FBc0IsV0FBVyxNQUFyQyxFQUE2QztBQUN6QyxxQkFBSyxRQUFMLENBQWM7QUFDViwwQkFBTSxDQURJO0FBRVYsMEJBQU07QUFGSSxpQkFBZDtBQUlBLHFCQUFLLFdBQUwsQ0FBaUIsS0FBSyxLQUFMLENBQVcsTUFBNUI7QUFDQSxxQkFBSyxZQUFMLENBQWtCLFdBQVcsTUFBN0I7QUFDQSw4QkFBYyxLQUFLLFNBQW5CO0FBQ0EscUJBQUssU0FBTCxHQUFpQixZQUFZO0FBQUEsMkJBQU0sT0FBSyxRQUFMLENBQWM7QUFDN0MsOEJBQU0sT0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQjtBQURxQixxQkFBZCxDQUFOO0FBQUEsaUJBQVosRUFFYixnQkFGYSxDQUFqQjtBQUdIO0FBQ0o7OzsyQ0FDa0IsVSxFQUFZO0FBQzNCLGdCQUFJLFdBQVcsTUFBWCxLQUFzQixLQUFLLEtBQUwsQ0FBVyxNQUFyQyxFQUE2QztBQUN6QyxxQkFBSyxRQUFMO0FBQ0g7QUFDSjs7OytDQUNzQjtBQUNuQiw0Q0FBbUIsY0FBbkIsQ0FBa0MsS0FBSyxlQUF2QztBQUNBLDRDQUFtQixjQUFuQixDQUFrQyxLQUFLLGtCQUF2QztBQUNBLGlCQUFLLFdBQUw7QUFDQSwwQkFBYyxLQUFLLFNBQW5CO0FBQ0g7Ozt1Q0FjMEI7QUFBQSxnQkFBZCxPQUFjLHVFQUFOLElBQU07O0FBQ3ZCLGdCQUFJLFlBQVksSUFBaEIsRUFBc0I7QUFDbEIsMEJBQVUsS0FBSyxLQUFMLENBQVcsTUFBckI7QUFDSDtBQUNELGlCQUFLLE9BQUwsR0FBZSxxQkFBUSxTQUFSLG9CQUFtQyxPQUFuQyxDQUFmO0FBQ0g7OztzQ0FDeUI7QUFBQSxnQkFBZCxPQUFjLHVFQUFOLElBQU07O0FBQ3RCLGdCQUFJLFlBQVksSUFBaEIsRUFBc0I7QUFDbEIsMEJBQVUsS0FBSyxLQUFMLENBQVcsTUFBckI7QUFDSDtBQUNELGlDQUFRLFNBQVIsb0JBQW1DLE9BQW5DO0FBQ0g7Ozt1Q0EyQ2MsRyxFQUFLO0FBQ2hCLG1CQUNJO0FBQUE7QUFBQSxrQkFBSSxXQUFVLE9BQWQsRUFBc0IsYUFBWSxHQUFsQztBQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREo7QUFFSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUZKO0FBR0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFISjtBQUlJO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBSko7QUFLTSxxQkFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixZQUFoQixLQUFpQyxJQUFqQyxHQUF3QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF4QyxHQUEwRDtBQUxoRSxhQURKO0FBU0g7OzttQ0FDVSxJLEVBQU0sUyxFQUFXO0FBQ3hCLGdCQUFJLFNBQVMsS0FBSyxHQUFMLENBQVMsS0FBSyxTQUFkLENBQWI7QUFDQSxpQkFBSyxJQUFJLElBQUksS0FBSyxNQUFsQixFQUEwQixJQUFJLFNBQTlCLEVBQXlDLEVBQUUsQ0FBM0MsRUFBOEM7QUFDMUMsdUJBQU8sSUFBUCxDQUFZLEtBQUssY0FBTCxDQUFvQixDQUFwQixDQUFaO0FBQ0g7QUFDRCxtQkFBTyxNQUFQO0FBQ0g7OztpQ0FDUTtBQUNMLGdCQUFJLEtBQUssS0FBTCxDQUFXLElBQVgsS0FBb0IsSUFBeEIsRUFBOEI7QUFDMUIsdUJBQU8sSUFBUDtBQUNIO0FBQ0QsZ0JBQU0sUUFBUSx1Q0FBcUIsS0FBSyxLQUFMLENBQVcsSUFBaEMsQ0FBZDtBQUNBLGdCQUFNLFVBQVUsS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUNaLEtBQUssS0FBTCxDQUFXLE1BQU0sTUFBTixHQUFlLHFCQUExQixJQUNBLENBQUMsRUFBRSxNQUFNLE1BQU4sR0FBZSxxQkFBakIsQ0FGVyxDQUFoQjtBQUdBLGdCQUFNLFlBQVksS0FBSyxHQUFMLENBQVMscUJBQVQsRUFBZ0MsTUFBTSxNQUF0QyxDQUFsQjtBQUNBLGdCQUFNLFlBQVksS0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixPQUFwQztBQUNBLGdCQUFNLE9BQU8sTUFBTSxLQUFOLENBQVksWUFBWSxxQkFBeEIsRUFBK0MsQ0FBQyxZQUFZLENBQWIsSUFBa0IscUJBQWpFLENBQWI7QUFDQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSwwQkFBZjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBQ00seUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBMkI7QUFEakMsaUJBREo7QUFJSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxXQUFmO0FBQ00seUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0I7QUFEdEIsaUJBSko7QUFPSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxRQUFmO0FBQUE7QUFBQSxpQkFQSjtBQVVJO0FBQUE7QUFBQTtBQUFPO0FBQUE7QUFBQTtBQUNIO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxrQ0FBSSxXQUFVLE9BQWQ7QUFBQTtBQUFBLDZCQURKO0FBSUk7QUFBQTtBQUFBLGtDQUFJLFdBQVUsUUFBZDtBQUFBO0FBQUEsNkJBSko7QUFPSTtBQUFBO0FBQUEsa0NBQUksV0FBVSxhQUFkO0FBQUE7QUFBQSw2QkFQSjtBQVVJO0FBQUE7QUFBQSxrQ0FBSSxXQUFVLE9BQWQ7QUFBQTtBQUFBLDZCQVZKO0FBYU0saUNBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsWUFBaEIsS0FBaUMsSUFBakMsR0FDRTtBQUFBO0FBQUEsa0NBQUksV0FBVSxXQUFkO0FBQUE7QUFBQSw2QkFERixHQUlFO0FBakJSLHlCQURHO0FBb0JELDZCQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0IsU0FBdEI7QUFwQkM7QUFBUDtBQVZKLGFBREo7QUFtQ0g7Ozs0QkFsSVk7QUFDVCxtQkFBTztBQUNILHlCQUFTLEVBRE47QUFFSCw0QkFBWSxFQUZUO0FBR0gsc0JBQU07QUFDRixpQ0FBYTtBQUNULDhCQUFNO0FBREc7QUFEWDtBQUhILGFBQVA7QUFTSDs7OztFQTdEaUMsTUFBTSxTOztrQkFBdkIsUTs7O0FBd0xyQixTQUFTLFdBQVQsR0FBdUIsc0JBQXZCOzs7Ozs7Ozs7OztBQzdMQTs7Ozs7Ozs7Ozs7O0lBRXFCLFc7Ozs7Ozs7Ozs7O2lDQWNSO0FBQ0wsbUJBQ0k7QUFDSSx3QkFBUyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLGNBQW5DLENBQWtEO0FBRC9ELGNBREo7QUFLSDs7OzRCQW5Cc0I7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQWpCO0FBQ0EsbUJBQU87QUFDSCw2QkFBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQixpQ0FBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQix3Q0FBZ0IsR0FBRyxLQUFILENBQVM7QUFDckIscUNBQVMsR0FBRyxNQUFILENBQVU7QUFERSx5QkFBVCxFQUViO0FBSGUscUJBQVQsRUFJVjtBQUxlLGlCQUFULEVBTVY7QUFQQSxhQUFQO0FBU0g7Ozs7RUFab0MsTUFBTSxTOztrQkFBMUIsVzs7O0FBdUJyQixZQUFZLFdBQVosR0FBMEIsYUFBMUI7Ozs7Ozs7QUN6QkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFTSxNOzs7Ozs7Ozs7OztpQ0FXTztBQUNMLGdCQUFNLGdCQUFnQjtBQUNsQixnREFEa0I7QUFFbEIsc0VBRmtCO0FBR2xCLGtGQUhrQjtBQUlsQiwyREFKa0I7QUFLbEIscURBTGtCO0FBTWxCO0FBTmtCLGNBT3BCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsU0FQZiwyQkFBdEI7QUFRQSxtQkFDSSxvQkFBQyxhQUFEO0FBQ0ksNkJBQWMsS0FBSyxLQUFMLENBQVc7QUFEN0IsY0FESjtBQUtIOzs7NEJBeEJzQjtBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBakI7QUFDQSxtQkFBTztBQUNILDZCQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLGlDQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLG1DQUFXLEdBQUc7QUFESSxxQkFBVCxFQUVWO0FBSGUsaUJBQVQsRUFJVjtBQUxBLGFBQVA7QUFPSDs7OztFQVZnQixNQUFNLFM7O0FBNEIzQixPQUFPLFdBQVAsR0FBcUIsUUFBckI7O0FBRUEsSUFBTSxXQUFXLE9BQU8sY0FBUCxDQUFzQixNQUF0QixDQUFqQjtBQUNBLHdCQUFNLFFBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQXBpLCBzdG9yYWdlLCBtZXNzYWdlX2Rpc3BhdGNoZXIsIG1ha2VEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lSWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcG9zaXRpb246IFBULm51bWJlcixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2NpcGxpbmVJZCAhPT0gbmV4dF9wcm9wcy5kaXNjaXBsaW5lSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZnJlZVN0b3JhZ2UodGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UobmV4dF9wcm9wcy5kaXNjaXBsaW5lSWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XG4gICAgICAgIGlmIChwcmV2X3Byb3BzLmRpc2NpcGxpbmVJZCAhPT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5mcmVlU3RvcmFnZSgpO1xuICAgIH1cblxuICAgIGdldCBTQ0hFTUEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN1bHRzOiB7fSxcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XG4gICAgICAgICAgICAgICAganVkZ2U6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvdXJzOiB7XG4gICAgICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0dXBTdG9yYWdlKGRpc2NpcGxpbmVfaWQ9bnVsbCkge1xuICAgICAgICBpZiAoZGlzY2lwbGluZV9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZGlzY2lwbGluZV9pZCA9IHRoaXMucHJvcHMuZGlzY2lwbGluZUlkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKGBqdWRpbmdfc2NvcmVzXyR7ZGlzY2lwbGluZV9pZH1gKTtcbiAgICB9XG4gICAgZnJlZVN0b3JhZ2UoZGlzY2lwbGluZV9pZD1udWxsKSB7XG4gICAgICAgIGlmIChkaXNjaXBsaW5lX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkID0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQ7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oYGp1ZGluZ19zY29yZXNfJHtkaXNjaXBsaW5lX2lkfWApO1xuICAgIH1cblxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIkRpc2NpcGxpbmVcIilcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLnByb3BzLmRpc2NpcGxpbmVJZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHNlcmlhbGl6ZWQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgICAgQXBpKFwiZGlzY2lwbGluZS5nZXRcIiwge1xuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQsXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIkRpc2NpcGxpbmVcIiwgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkF3YXJkaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUGxhY2Uocm93KSB7XG4gICAgICAgIGlmIChyb3cucGxhY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlXCI+XG4gICAgICAgICAgICAgICAgeyBgJHtyb3cucGxhY2V9INC80LXRgdGC0L5gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2NpcGxpbmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhYmxlID0gbWFrZURpc2NpcGxpbmVSZXN1bHRzVGFibGUodGhpcy5zdGF0ZS5kaXNjaXBsaW5lKVxuICAgICAgICBjb25zdCByb3cgPSB0YWJsZVt0aGlzLnByb3BzLnBvc2l0aW9uXTtcbiAgICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXdhcmRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGxhY2Uocm93KSB9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LWNsdWJcIj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlbmRlcmVyLmRpc3BsYXlOYW1lID0gXCJBd2FyZGluZ19SZW5kZXJlclwiO1xuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL1JlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzT25lUGFydGljaXBhbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NyZWVuX2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgPFJlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVJZD17IHRoaXMuY29udHJvbHMuZGlzY2lwbGluZV9pZCB9XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPXsgdGhpcy5jb250cm9scy5wb3NpdGlvbiB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSGVhdHNPbmVQYXJ0aWNpcGFudC5kaXNwbGF5TmFtZSA9IFwiSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xuIiwiaW1wb3J0IEhlYXRzT25lUGFydGljaXBhbnQgZnJvbSBcIi4vSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWF0c0Zvcm1hdGlvbihwcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxIZWF0c09uZVBhcnRpY2lwYW50XG4gICAgICAgICAgICBzaG93U2NvcmU9eyBmYWxzZSB9XG4gICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgLz5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgQXBpLCBzdG9yYWdlLCBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGV0aXRpb246IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY3JlZW5fZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sc19zdGF0ZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWF0OiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VfZGlzcGF0Y2hlcnMgPSBbXG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSksXG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0ZVwiLCB0aGlzLmxvYWREYXRhKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRfcHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGUudG91cl9pZCAhPT0gdGhpcy5jb250cm9scy50b3VyX2lkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZfcHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGUudG91cl9pZCAhPT0gdGhpcy5jb250cm9scy50b3VyX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgbWQgb2YgdGhpcy5fbWVzc2FnZV9kaXNwYXRjaGVycykge1xuICAgICAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKG1kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBTQ0hFTUEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge30sXG4gICAgICAgICAgICAgICAgc2NvcmVzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5jb250cm9scy50b3VyX2lkLFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuU0NIRU1BLFxuICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMuY29udHJvbHMudG91cl9pZCwgc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gc3RvcmFnZVxuICAgICAgICAgICAgLmdldChcIlRvdXJcIilcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLmNvbnRyb2xzLnRvdXJfaWQpXG4gICAgICAgICAgICAuc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b3VyOiBzZXJpYWxpemVkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlO1xuICAgIH1cblxuICAgIGNhblNob3dTY29yZXMocnVuKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHJ1bi5zY29yZXMubWFwKHMgPT4gW3MuZGlzY2lwbGluZV9qdWRnZV9pZCwgc10pKTtcbiAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcykge1xuICAgICAgICAgICAgaWYgKFtcImRhbmNlX2p1ZGdlXCIsIFwiYWNyb19qdWRnZVwiXS5pbmRleE9mKGRqLnJvbGUpID49IDAgJiYgIXNjb3Jlc19tYXAuZ2V0KGRqLmlkKS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJlbmRlckVtcHR5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c011bHRpcGxlUGFydGljaXBhbnRzXCIgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUmVzdWx0KHJ1bikge1xuICAgICAgICBjb25zdCBzY29yZV9jbGFzcyA9IHRoaXMuY2FuU2hvd1Njb3JlcyhydW4pID8gXCJzY29yZVwiIDogXCJzY29yZSBoaWRkZW5cIjtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSB0eXBlb2YgcnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgPyBydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgICAgIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgc2NvcmVfY2xhc3MgfT5cbiAgICAgICAgICAgICAgICB7IGDQoNC10LfRg9C70YzRgtCw0YI6ICR7c2NvcmV9YCB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJSdW4ocnVuKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSBydW4ucGVyZm9ybWVkID8gXCJydW5cIiA6IFwicnVuIGhpZGRlblwiO1xuICAgICAgICBjb25zdCBuYW1lID0gcnVuLnBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lID09PSBcIlwiXG4gICAgICAgICAgICA/IHJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubWFwKHMgPT4gYCR7cy5sYXN0X25hbWV9ICR7cy5maXJzdF9uYW1lfWApLmpvaW4oXCJcXG5cIilcbiAgICAgICAgICAgIDogcnVuLnBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0ga2V5PXsgcnVuLmlkIH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1udW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBydW4ucGFydGljaXBhbnQubnVtYmVyIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUmVzdWx0KHJ1bikgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJ1bnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmhlYXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJ1bnMgPSB0aGlzLnN0YXRlLnRvdXIucnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IHRoaXMuY29udHJvbHMuaGVhdCk7XG4gICAgICAgIGNvbnN0IHR3b19yb3dzID0gcnVucy5sZW5ndGggPiA0O1xuICAgICAgICBjb25zdCBjbGFzc19uYW1lID0gdHdvX3Jvd3MgPyBcInJ1bnMgdHdvLXJvd3NcIiA6IFwicnVuc1wiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0+XG4gICAgICAgICAgICAgICAgeyBydW5zLm1hcChydW4gPT4gdGhpcy5yZW5kZXJSdW4ocnVuKSkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmhlYXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG51bV9oZWF0cyA9IE1hdGgubWF4KC4uLnRoaXMuc3RhdGUudG91ci5ydW5zLm1hcChyID0+IHIuaGVhdCkpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWF0XCI+XG4gICAgICAgICAgICAgICAgeyBg0JfQsNGF0L7QtCAke3RoaXMuY29udHJvbHMuaGVhdH0vJHtudW1faGVhdHN9YCB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJFbXB0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWF0KCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSdW5zKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5IZWF0c011bHRpcGxlUGFydGljaXBhbnRzLmRpc3BsYXlOYW1lID0gXCJIZWF0c011bHRpcGxlUGFydGljaXBhbnRzXCI7XG4iLCJpbXBvcnQgeyBBcGksIHN0b3JhZ2UsIG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWF0c09uZVBhcnRpY2lwYW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYXQ6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNob3dTY29yZTogUFQuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaG93U2NvcmU6IHRydWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VfZGlzcGF0Y2hlcnMgPSBbXG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSksXG4gICAgICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0ZVwiLCB0aGlzLmxvYWREYXRhKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRfcHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGUudG91cl9pZCAhPT0gdGhpcy5jb250cm9scy50b3VyX2lkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZfcHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGUudG91cl9pZCAhPT0gdGhpcy5jb250cm9scy50b3VyX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgbWQgb2YgdGhpcy5fbWVzc2FnZV9kaXNwYXRjaGVycykge1xuICAgICAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKG1kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBTQ0hFTUEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjb3Jlczoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZERhdGEgPSAoKSA9PiB7XG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHtcbiAgICAgICAgICAgIHRvdXJfaWQ6IHRoaXMuY29udHJvbHMudG91cl9pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0aGlzLlNDSEVNQSxcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLmNvbnRyb2xzLnRvdXJfaWQsIHN0b3JhZ2UpXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZCA9IHN0b3JhZ2VcbiAgICAgICAgICAgIC5nZXQoXCJUb3VyXCIpXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5jb250cm9scy50b3VyX2lkKVxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlNDSEVNQSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRyb2xzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZTtcbiAgICB9XG5cbiAgICBjYW5TaG93U2NvcmVzKHJ1bikge1xuICAgICAgICBjb25zdCBzY29yZXNfbWFwID0gbmV3IE1hcChydW4uc2NvcmVzLm1hcChzID0+IFtzLmRpc2NpcGxpbmVfanVkZ2VfaWQsIHNdKSk7XG4gICAgICAgIGZvciAoY29uc3QgZGogb2YgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMpIHtcbiAgICAgICAgICAgIGlmIChbXCJkYW5jZV9qdWRnZVwiLCBcImFjcm9fanVkZ2VcIl0uaW5kZXhPZihkai5yb2xlKSA+PSAwICYmICFzY29yZXNfbWFwLmdldChkai5pZCkuY29uZmlybWVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZW5kZXJFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhdHNPbmVQYXJ0aWNpcGFudFwiIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJlc3VsdChydW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNob3dTY29yZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2NvcmVfY2xhc3MgPSB0aGlzLmNhblNob3dTY29yZXMocnVuKSA/IFwic2NvcmVcIiA6IFwic2NvcmUgaGlkZGVuXCI7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gcnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZVxuICAgICAgICAgICAgPyBydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgICAgIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgc2NvcmVfY2xhc3MgfT5cbiAgICAgICAgICAgICAgICB7IGDQoNC10LfRg9C70YzRgtCw0YI6ICR7c2NvcmV9YCB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUnVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbHMuaGVhdCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcnVuID0gdGhpcy5zdGF0ZS50b3VyLnJ1bnMuZmluZChyID0+IHIuaGVhdCA9PT0gdGhpcy5jb250cm9scy5oZWF0KTtcbiAgICAgICAgaWYgKCFydW4pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG51bV9oZWF0cyA9IE1hdGgubWF4KC4uLnRoaXMuc3RhdGUudG91ci5ydW5zLm1hcChyID0+IHIuaGVhdCkpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYXRcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBg0JfQsNGF0L7QtCAke3J1bi5oZWF0fS8ke251bV9oZWF0c31gIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LWNsdWItbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSZXN1bHQocnVuKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJFbXB0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYXRzT25lUGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSdW4oKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkhlYXRzT25lUGFydGljaXBhbnQuZGlzcGxheU5hbWUgPSBcIkhlYXRzT25lUGFydGljaXBhbnRcIjtcbiIsImV4cG9ydCBsZXQgQXBpID0gbnVsbDtcbmV4cG9ydCBsZXQgbWVzc2FnZV9kaXNwYXRjaGVyID0gbnVsbDtcbmV4cG9ydCBsZXQgc3RvcmFnZSA9IG51bGw7XG5leHBvcnQgbGV0IG1ha2VUb3VyUmVzdWx0c1RhYmxlID0gbnVsbDtcbmV4cG9ydCBsZXQgbWFrZURpc2NpcGxpbmVSZXN1bHRzVGFibGUgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoZGF0YSkge1xuICAgIEFwaSAgICAgICAgICAgICAgICAgICAgICAgID0gZGF0YS5BcGk7XG4gICAgbWVzc2FnZV9kaXNwYXRjaGVyICAgICAgICAgPSBkYXRhLm1lc3NhZ2VfZGlzcGF0Y2hlcjtcbiAgICBzdG9yYWdlICAgICAgICAgICAgICAgICAgICA9IGRhdGEuc3RvcmFnZTtcbiAgICBtYWtlVG91clJlc3VsdHNUYWJsZSAgICAgICA9IGRhdGEubWFrZVRvdXJSZXN1bHRzVGFibGU7XG4gICAgbWFrZURpc2NpcGxpbmVSZXN1bHRzVGFibGUgPSBkYXRhLm1ha2VEaXNjaXBsaW5lUmVzdWx0c1RhYmxlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BsYXNoU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTcGxhc2hTY3JlZW5cIj5cbiAgICAgICAgICAgICAgICA8aDE+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TcGxhc2hTY3JlZW4uZGlzcGxheU5hbWUgPSBcIlNwbGFzaFNjcmVlblwiO1xuIiwiaW1wb3J0IHsgQXBpLCBzdG9yYWdlLCBtZXNzYWdlX2Rpc3BhdGNoZXIsIG1ha2VUb3VyUmVzdWx0c1RhYmxlIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmNvbnN0IFBBUlRJQ0lQQU5UU19QRVJfUEFHRSA9IDE1O1xuY29uc3QgUkVGUkVTSF9JTlRFUlZBTCA9IDcwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3VySWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IDAsXG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuc3RhdGUucGFnZSArIDEsXG4gICAgICAgIH0pLCBSRUZSRVNIX0lOVEVSVkFMKTtcbiAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXJJZCAhPT0gbmV4dF9wcm9wcy50b3VySWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhZ2U6IDAsXG4gICAgICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5mcmVlU3RvcmFnZSh0aGlzLnByb3BzLnRvdXJJZCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwU3RvcmFnZShuZXh0X3Byb3BzLnRvdXJJZCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGFnZTogdGhpcy5zdGF0ZS5wYWdlICsgMSxcbiAgICAgICAgICAgIH0pLCBSRUZSRVNIX0lOVEVSVkFMKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldl9wcm9wcykge1xuICAgICAgICBpZiAocHJldl9wcm9wcy50b3VySWQgIT09IHRoaXMucHJvcHMudG91cklkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XG4gICAgICAgIHRoaXMuZnJlZVN0b3JhZ2UoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgZ2V0IFNDSEVNQSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdHM6IHt9LFxuICAgICAgICAgICAgZGlzY2lwbGluZToge30sXG4gICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0dXBTdG9yYWdlKHRvdXJfaWQ9bnVsbCkge1xuICAgICAgICBpZiAodG91cl9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdG91cl9pZCA9IHRoaXMucHJvcHMudG91cklkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKGBqdWRpbmdfc2NvcmVzXyR7dG91cl9pZH1gKTtcbiAgICB9XG4gICAgZnJlZVN0b3JhZ2UodG91cl9pZD1udWxsKSB7XG4gICAgICAgIGlmICh0b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICB0b3VyX2lkID0gdGhpcy5wcm9wcy50b3VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oYGp1ZGluZ19zY29yZXNfJHt0b3VyX2lkfWApO1xuICAgIH1cblxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIilcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLnByb3BzLnRvdXJJZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRvdXI6IHNlcmlhbGl6ZWQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VySWQsXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIlRvdXJcIiwgdGhpcy5wcm9wcy50b3VySWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyUm93ID0gKHJvdykgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyIGtleT17IHJvdy5ydW4uaWQgfT5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3cucGxhY2UgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4ucGFydGljaXBhbnQubmFtZSB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwic2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnRvdGFsX3Njb3JlIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5leHQtdG91clwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3cuYWR2YW5jZXMgPyA8Yj7QlNCwPC9iPiA6IFwi0J3QtdGCXCIgfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICkgOiBudWxsIH1cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckVtcHR5Um93KGtleSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImVtcHR5XCIga2V5PXsgYEVSLSR7a2V5fWAgfT5cbiAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGwgPyA8dGQ+Jm5ic3A7PC90ZD4gOiBudWxsIH1cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJvd3Mocm93cywgcGFnZV9zaXplKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSByb3dzLm1hcCh0aGlzLnJlbmRlclJvdyk7XG4gICAgICAgIGZvciAobGV0IGkgPSByb3dzLmxlbmd0aDsgaSA8IHBhZ2Vfc2l6ZTsgKytpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlckVtcHR5Um93KGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhYmxlID0gbWFrZVRvdXJSZXN1bHRzVGFibGUodGhpcy5zdGF0ZS50b3VyKTtcbiAgICAgICAgY29uc3Qgbl9wYWdlcyA9IE1hdGgubWF4KDEsXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRhYmxlLmxlbmd0aCAvIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSkgK1xuICAgICAgICAgICAgISEodGFibGUubGVuZ3RoICUgUEFSVElDSVBBTlRTX1BFUl9QQUdFKSk7XG4gICAgICAgIGNvbnN0IHBhZ2Vfc2l6ZSA9IE1hdGgubWluKFBBUlRJQ0lQQU5UU19QRVJfUEFHRSwgdGFibGUubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgY29ycl9wYWdlID0gdGhpcy5zdGF0ZS5wYWdlICUgbl9wYWdlcztcbiAgICAgICAgY29uc3Qgcm93cyA9IHRhYmxlLnNsaWNlKGNvcnJfcGFnZSAqIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSwgKGNvcnJfcGFnZSArIDEpICogUEFSVElDSVBBTlRTX1BFUl9QQUdFKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiVG91clJlc3VsdHMgdG91ci1yZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvdXItbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudG91ci5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICDQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx0YWJsZT48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgINCcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cIm51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKEllxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgINCj0YfQsNGB0YLQvdC40LpcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwic2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQkdCw0LvQu9GLXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJuZXh0LXRvdXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0KHQuy4g0YLRg9GAXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3Mocm93cywgcGFnZV9zaXplKSB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SZW5kZXJlci5kaXNwbGF5TmFtZSA9IFwiVG91clJlc3VsdHNfUmVuZGVyZXJcIjtcbiIsImltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9SZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VyUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGV0aXRpb246IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY3JlZW5fZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sc19zdGF0ZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlbmRlcmVyXG4gICAgICAgICAgICAgICAgdG91cklkPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Ub3VyUmVzdWx0cy5kaXNwbGF5TmFtZSA9IFwiVG91clJlc3VsdHNcIjtcbiIsImltcG9ydCBTcGxhc2hTY3JlZW4gZnJvbSBcIi4vU3BsYXNoU2NyZWVuXCI7XG5pbXBvcnQgSGVhdHNPbmVQYXJ0aWNpcGFudCBmcm9tIFwiLi9IZWF0c09uZVBhcnRpY2lwYW50XCI7XG5pbXBvcnQgSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cyBmcm9tIFwiLi9IZWF0c011bHRpcGxlUGFydGljaXBhbnRzXCI7XG5pbXBvcnQgSGVhdHNGb3JtYXRpb24gZnJvbSBcIi4vSGVhdHNGb3JtYXRpb25cIjtcbmltcG9ydCBUb3VyUmVzdWx0cyBmcm9tIFwiLi9Ub3VyUmVzdWx0c1wiO1xuaW1wb3J0IEF3YXJkaW5nIGZyb20gXCIuL0F3YXJkaW5nXCI7XG5cbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vSG9zdE1vZHVsZXNcIjtcblxuY2xhc3MgU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbl9pZDogUFQuc3RyaW5nLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IFBhZ2VDb21wb25lbnQgPSB7XG4gICAgICAgICAgICBcInNwbGFzaFwiOiBTcGxhc2hTY3JlZW4sXG4gICAgICAgICAgICBcImhlYXRzX29uZV9wYXJ0aWNpcGFudFwiOiBIZWF0c09uZVBhcnRpY2lwYW50LFxuICAgICAgICAgICAgXCJoZWF0c19tdWx0aXBsZV9wYXJ0aWNpcGFudHNcIjogSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cyxcbiAgICAgICAgICAgIFwiaGVhdHNfZm9ybWF0aW9uXCI6IEhlYXRzRm9ybWF0aW9uLFxuICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogVG91clJlc3VsdHMsXG4gICAgICAgICAgICBcImF3YXJkaW5nXCI6IEF3YXJkaW5nLFxuICAgICAgICB9W3RoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuc2NyZWVuX2lkXSB8fCBTcGxhc2hTY3JlZW47XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGFnZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcblxuY29uc3QgcmVzcG9uc2UgPSB3aW5kb3cucmVnaXN0ZXJTY3JlZW4oU2NyZWVuKTtcbnNldHVwKHJlc3BvbnNlKTtcbiJdfQ==
