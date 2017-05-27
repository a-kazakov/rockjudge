(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LoadingComponent2 = require("LoadingComponent");

var _LoadingComponent3 = _interopRequireDefault(_LoadingComponent2);

var _HostModules = require("HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderer = function (_LoadingComponent) {
    _inherits(Renderer, _LoadingComponent);

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

        _initialiseProps.call(_this);

        _this.state = {
            discipline: null
        };
        return _this;
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
    }]);

    return Renderer;
}(_LoadingComponent3.default);

var _initialiseProps = function _initialiseProps() {
    this.CLASS_ID = "screen_awarding";
    this.API_MODELS = {
        discipline: {
            model_type: "Discipline",
            model_id_getter: function model_id_getter(props) {
                return props.disciplineId;
            },
            schema: {
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
            }
        }
    };
};

exports.default = Renderer;


Renderer.displayName = "Awarding_Renderer";

},{"HostModules":6,"LoadingComponent":8}],2:[function(require,module,exports){
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

var Awarding = function (_React$Component) {
    _inherits(Awarding, _React$Component);

    function Awarding() {
        _classCallCheck(this, Awarding);

        return _possibleConstructorReturn(this, (Awarding.__proto__ || Object.getPrototypeOf(Awarding)).apply(this, arguments));
    }

    _createClass(Awarding, [{
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

    return Awarding;
}(React.Component);

exports.default = Awarding;


Awarding.displayName = "Awarding";

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

var _LoadingComponent2 = require("LoadingComponent");

var _LoadingComponent3 = _interopRequireDefault(_LoadingComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsMultipleParticipants = function (_LoadingComponent) {
    _inherits(HeatsMultipleParticipants, _LoadingComponent);

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

        _initialiseProps.call(_this);

        _this.state = {
            tour: null
        };
        return _this;
    }

    _createClass(HeatsMultipleParticipants, [{
        key: "canShowScores",
        value: function canShowScores(run) {
            var scores_map = new Map(run.scores.map(function (s) {
                return [s.discipline_judge_id, s];
            }));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.tour.discipline.discipline_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dj = _step.value;

                    if (["dance_judge", "acro_judge"].indexOf(dj.role) >= 0 && !scores_map.get(dj.id).confirmed) {
                        return false;
                    }
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
        key: "controls",
        get: function get() {
            return this.props.competition.screen_data.controls_state;
        }
    }]);

    return HeatsMultipleParticipants;
}(_LoadingComponent3.default);

var _initialiseProps = function _initialiseProps() {
    this.CLASS_ID = "screen_heat_mult_participants";
    this.API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: function model_id_getter(props) {
                return props.competition.screen_data.controls_state.tour_id;
            },
            schema: {
                discipline: {
                    discipline_judges: {}
                },
                runs: {
                    participant: {},
                    scores: {}
                }
            }
        }
    };
};

exports.default = HeatsMultipleParticipants;


HeatsMultipleParticipants.displayName = "HeatsMultipleParticipants";

},{"LoadingComponent":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LoadingComponent2 = require("LoadingComponent");

var _LoadingComponent3 = _interopRequireDefault(_LoadingComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsOneParticipant = function (_LoadingComponent) {
    _inherits(HeatsOneParticipant, _LoadingComponent);

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

        _initialiseProps.call(_this);

        _this.state = {
            tour: null
        };
        return _this;
    }

    _createClass(HeatsOneParticipant, [{
        key: "canShowScores",
        value: function canShowScores(run) {
            var scores_map = new Map(run.scores.map(function (s) {
                return [s.discipline_judge_id, s];
            }));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.tour.discipline.discipline_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dj = _step.value;

                    if (["dance_judge", "acro_judge"].indexOf(dj.role) >= 0 && !scores_map.get(dj.id).confirmed) {
                        return false;
                    }
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
        key: "controls",
        get: function get() {
            return this.props.competition.screen_data.controls_state;
        }
    }]);

    return HeatsOneParticipant;
}(_LoadingComponent3.default);

var _initialiseProps = function _initialiseProps() {
    this.CLASS_ID = "screen_heat_one_participant";
    this.API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: function model_id_getter(props) {
                return props.competition.screen_data.controls_state.tour_id;
            },
            schema: {
                discipline: {
                    discipline_judges: {}
                },
                runs: {
                    participant: {
                        club: {}
                    },
                    scores: {}
                }
            }
        }
    };
};

exports.default = HeatsOneParticipant;


HeatsOneParticipant.displayName = "HeatsOneParticipant";

},{"LoadingComponent":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setup = setup;
var Api = exports.Api = null;
var websocket = exports.websocket = null;
var storage = exports.storage = null;
var makeTourResultsTable = exports.makeTourResultsTable = null;
var makeDisciplineResultsTable = exports.makeDisciplineResultsTable = null;

function setup(data) {
    exports.Api = Api = data.Api;
    exports.websocket = websocket = data.websocket;
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

var _HostModules = require("HostModules");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataLoader = function () {
    function DataLoader(callback, method, model_type, model_id, schema, class_id) {
        var _this = this;

        _classCallCheck(this, DataLoader);

        this.loadData = function () {
            var _Api;

            if (_this._destroyed) {
                return;
            }
            (0, _HostModules.Api)(_this._method, (_Api = {}, _defineProperty(_Api, _this._id_name, _this._model_id), _defineProperty(_Api, "children", _this._schema), _Api)).addToDB(_this._model_type, _this._model_id, _this._storage).onSuccess(_this.handleDataLoaded).send();
        };

        this.handleDataLoaded = function () {
            if (_this._destroyed) {
                return;
            }
            if (_this._reload_listener === null) {
                _this._reload_listener = _HostModules.websocket.addListener("reload_data", _this.loadData);
            }
            if (_this._update_listener === null) {
                _this._update_listener = _this._storage.addListener(_this.reloadFromStorage);
            }
            _this.reloadFromStorage();
        };

        this.reloadFromStorage = function () {
            if (_this._destroyed) {
                return;
            }
            var serialized = _this._storage.get(_this._model_type).by_id(_this._model_id).serialize(_this._schema);
            _this._callback(serialized);
        };

        this._callback = callback;
        this._method = model_type.toLowerCase() + ".get";
        this._id_name = model_type.toLowerCase() + "_id";
        this._model_type = model_type;
        this._model_id = model_id;
        this._schema = schema;
        this._storage_domain = class_id + "_" + model_type + "_" + model_id;
        this._storage = _HostModules.storage.getDomain(this._storage_domain);
        this._update_listener = null;
        this._reload_listener = null;
        this._destroyed = false;
        this._callback(null);
        this.loadData();
    }

    _createClass(DataLoader, [{
        key: "destroy",
        value: function destroy() {
            this._destroyed = true;
            _HostModules.storage.delDomain(this._storage_domain);
            if (this._reload_listener !== null) {
                _HostModules.websocket.removeListener(this._reload_listener);
            }
            if (this._update_listener !== null) {
                this._storage.removeListener(this._update_listener);
            }
        }
    }]);

    return DataLoader;
}();

exports.default = DataLoader;

},{"HostModules":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataLoader = require("./DataLoader");

var _DataLoader2 = _interopRequireDefault(_DataLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingComponent = function (_React$PureComponent) {
    _inherits(LoadingComponent, _React$PureComponent);

    function LoadingComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, LoadingComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingComponent.__proto__ || Object.getPrototypeOf(LoadingComponent)).call.apply(_ref, [this].concat(args))), _this), _this._handleStateUpdate = function (key, data) {
            var upd = _defineProperty({}, key, data);
            var add = {};
            if (_this.getAdditionalStateUpdate) {
                add = _this.getAdditionalStateUpdate(Object.assign({}, _this.state, upd));
            }
            _this.setState(Object.assign({}, upd, add));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LoadingComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this._loaders = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var key = _step.value;

                    var params = _this2.API_MODELS[key];
                    var model_id = params.model_id_getter(_this2.props);
                    if (model_id !== null) {
                        _this2._loaders[key] = new _DataLoader2.default(function (data) {
                            return _this2._handleStateUpdate(key, data);
                        }, params.method, params.model_type, model_id, params.schema, _this2.CLASS_ID);
                    } else {
                        _this2._loaders[key] = null;
                    }
                };

                for (var _iterator = Object.keys(this.API_MODELS)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
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
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var key = _step2.value;

                    var params = _this3.API_MODELS[key];
                    var this_model_id = params.model_id_getter(_this3.props);
                    var next_model_id = params.model_id_getter(nextProps);
                    if (this_model_id !== next_model_id) {
                        if (_this3._loaders[key] !== null) {
                            _this3._loaders[key].destroy();
                        }
                        _this3.setState(_defineProperty({}, key, null));
                        if (next_model_id !== null) {
                            _this3._loaders[key] = new _DataLoader2.default(function (data) {
                                return _this3._handleStateUpdate(key, data);
                            }, params.method, params.model_type, next_model_id, params.schema, _this3.CLASS_ID);
                        } else {
                            _this3._loaders[key] = null;
                        }
                        if (_this3.onIdChanged) {
                            _this3.onIdChanged(key, next_model_id, nextProps);
                        }
                    }
                };

                for (var _iterator2 = Object.keys(this.API_MODELS)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop2();
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
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.keys(this.API_MODELS)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _key2 = _step3.value;

                    if (this._loaders[_key2] !== null) {
                        this._loaders[_key2].destroy();
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return LoadingComponent;
}(React.PureComponent);

exports.default = LoadingComponent;

},{"./DataLoader":7}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LoadingComponent2 = require("LoadingComponent");

var _LoadingComponent3 = _interopRequireDefault(_LoadingComponent2);

var _HostModules = require("HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PARTICIPANTS_PER_PAGE = 15;
var REFRESH_INTERVAL = 7000;

var Renderer = function (_LoadingComponent) {
    _inherits(Renderer, _LoadingComponent);

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

        _initialiseProps.call(_this);

        _this.state = {
            page: 0,
            tour: null
        };
        return _this;
    }

    _createClass(Renderer, [{
        key: "onIdChanged",
        value: function onIdChanged() {
            var _this2 = this;

            this.setState({
                page: 0
            });
            clearInterval(this._interval);
            this._interval = setInterval(function () {
                return _this2.setState({
                    page: _this2.state.page + 1
                });
            }, REFRESH_INTERVAL);
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
    }]);

    return Renderer;
}(_LoadingComponent3.default);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.CLASS_ID = "screen_tour_results";
    this.API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: function model_id_getter(props) {
                return props.tourId;
            },
            schema: {
                results: {},
                discipline: {},
                runs: {
                    participant: {
                        club: {}
                    }
                }
            }
        }
    };

    this.renderRow = function (row) {
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
            _this3.state.tour.next_tour_id !== null ? React.createElement(
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
};

exports.default = Renderer;


Renderer.displayName = "TourResults_Renderer";

},{"HostModules":6,"LoadingComponent":8}],11:[function(require,module,exports){
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

},{"./Renderer":10}],12:[function(require,module,exports){
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

var Screen = function (_React$PureComponent) {
    _inherits(Screen, _React$PureComponent);

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
}(React.PureComponent);

Screen.displayName = "Screen";

var response = window.registerScreen(Screen);
(0, _HostModules.setup)(response);

},{"./Awarding":2,"./HeatsFormation":3,"./HeatsMultipleParticipants":4,"./HeatsOneParticipant":5,"./HostModules":6,"./SplashScreen":9,"./TourResults":11}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc3hcXEF3YXJkaW5nXFxSZW5kZXJlci5qc3giLCJqc3hcXEF3YXJkaW5nXFxpbmRleC5qc3giLCJqc3hcXEhlYXRzRm9ybWF0aW9uLmpzeCIsImpzeFxcSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50cy5qc3giLCJqc3hcXEhlYXRzT25lUGFydGljaXBhbnQuanN4IiwianN4XFxIb3N0TW9kdWxlcy5qc3giLCJqc3hcXExvYWRpbmdDb21wb25lbnRcXERhdGFMb2FkZXIuanN4IiwianN4XFxMb2FkaW5nQ29tcG9uZW50XFxpbmRleC5qc3giLCJqc3hcXFNwbGFzaFNjcmVlbi5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxSZW5kZXJlci5qc3giLCJqc3hcXFRvdXJSZXN1bHRzXFxpbmRleC5qc3giLCJqc3hcXHJvb3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCLFE7Ozs7OzRCQUNNO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFqQjtBQUNBLG1CQUFPO0FBQ0gsOEJBQWMsR0FBRyxNQUFILENBQVUsVUFEckI7QUFFSCwwQkFBVSxHQUFHO0FBRlYsYUFBUDtBQUlIOzs7QUFFRCxzQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0hBQ1QsS0FEUzs7QUFBQTs7QUFFZixjQUFLLEtBQUwsR0FBYTtBQUNULHdCQUFZO0FBREgsU0FBYjtBQUZlO0FBS2xCOzs7O3NDQXdCYTtBQUNWLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFVBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxpQkFBZjtBQUNNLHlCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCO0FBRDVCO0FBREosYUFESjtBQU9IOzs7b0NBQ1csRyxFQUFLO0FBQ2IsZ0JBQUksSUFBSSxLQUFKLEtBQWMsSUFBbEIsRUFBd0I7QUFDcEIsdUJBQU8sSUFB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a0I7QUFLbEIscURBTGtCO0FBTWxCO0FBTmtCLGNBT3BCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsU0FQZiwyQkFBdEI7QUFRQSxtQkFDSSxvQkFBQyxhQUFEO0FBQ0ksNkJBQWMsS0FBSyxLQUFMLENBQVc7QUFEN0IsY0FESjtBQUtIOzs7NEJBeEJzQjtBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBakI7QUFDQSxtQkFBTztBQUNILDZCQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLGlDQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLG1DQUFXLEdBQUc7QUFESSxxQkFBVCxFQUVWO0FBSGUsaUJBQVQsRUFJVjtBQUxBLGFBQVA7QUFPSDs7OztFQVZnQixNQUFNLGE7O0FBNEIzQixPQUFPLFdBQVAsR0FBcUIsUUFBckI7O0FBRUEsSUFBTSxXQUFXLE9BQU8sY0FBUCxDQUFzQixNQUF0QixDQUFqQjtBQUNBLHdCQUFNLFFBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IExvYWRpbmdDb21wb25lbnQgZnJvbSBcIkxvYWRpbmdDb21wb25lbnRcIjtcbmltcG9ydCB7IG1ha2VEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIGV4dGVuZHMgTG9hZGluZ0NvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBQVC5udW1iZXIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGlzY2lwbGluZTogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBDTEFTU19JRCA9IFwic2NyZWVuX2F3YXJkaW5nXCI7XG4gICAgQVBJX01PREVMUyA9IHtcbiAgICAgICAgZGlzY2lwbGluZToge1xuICAgICAgICAgICAgbW9kZWxfdHlwZTogXCJEaXNjaXBsaW5lXCIsXG4gICAgICAgICAgICBtb2RlbF9pZF9nZXR0ZXI6IHByb3BzID0+IHByb3BzLmRpc2NpcGxpbmVJZCxcbiAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHt9LFxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge1xuICAgICAgICAgICAgICAgICAgICBqdWRnZToge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b3Vyczoge1xuICAgICAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgcmVuZGVyRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkF3YXJkaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUGxhY2Uocm93KSB7XG4gICAgICAgIGlmIChyb3cucGxhY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlXCI+XG4gICAgICAgICAgICAgICAgeyBgJHtyb3cucGxhY2V9INC80LXRgdGC0L5gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2NpcGxpbmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhYmxlID0gbWFrZURpc2NpcGxpbmVSZXN1bHRzVGFibGUodGhpcy5zdGF0ZS5kaXNjaXBsaW5lKVxuICAgICAgICBjb25zdCByb3cgPSB0YWJsZVt0aGlzLnByb3BzLnBvc2l0aW9uXTtcbiAgICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXdhcmRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGxhY2Uocm93KSB9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LWNsdWJcIj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlbmRlcmVyLmRpc3BsYXlOYW1lID0gXCJBd2FyZGluZ19SZW5kZXJlclwiO1xuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL1JlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF3YXJkaW5nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRyb2xzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSWQ9eyB0aGlzLmNvbnRyb2xzLmRpc2NpcGxpbmVfaWQgfVxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbj17IHRoaXMuY29udHJvbHMucG9zaXRpb24gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkF3YXJkaW5nLmRpc3BsYXlOYW1lID0gXCJBd2FyZGluZ1wiO1xuIiwiaW1wb3J0IEhlYXRzT25lUGFydGljaXBhbnQgZnJvbSBcIi4vSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWF0c0Zvcm1hdGlvbihwcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxIZWF0c09uZVBhcnRpY2lwYW50XG4gICAgICAgICAgICBzaG93U2NvcmU9eyBmYWxzZSB9XG4gICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgLz5cbiAgICApO1xufVxuXG4iLCJpbXBvcnQgTG9hZGluZ0NvbXBvbmVudCBmcm9tIFwiTG9hZGluZ0NvbXBvbmVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWF0c011bHRpcGxlUGFydGljaXBhbnRzIGV4dGVuZHMgTG9hZGluZ0NvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGV0aXRpb246IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY3JlZW5fZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sc19zdGF0ZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWF0OiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgQ0xBU1NfSUQgPSBcInNjcmVlbl9oZWF0X211bHRfcGFydGljaXBhbnRzXCI7XG4gICAgQVBJX01PREVMUyA9IHtcbiAgICAgICAgdG91cjoge1xuICAgICAgICAgICAgbW9kZWxfdHlwZTogXCJUb3VyXCIsXG4gICAgICAgICAgICBtb2RlbF9pZF9nZXR0ZXI6IHByb3BzID0+IHByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlLnRvdXJfaWQsXG4gICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHt9LFxuICAgICAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBjb250cm9scygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGU7XG4gICAgfVxuXG4gICAgY2FuU2hvd1Njb3JlcyhydW4pIHtcbiAgICAgICAgY29uc3Qgc2NvcmVzX21hcCA9IG5ldyBNYXAocnVuLnNjb3Jlcy5tYXAocyA9PiBbcy5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzXSkpO1xuICAgICAgICBmb3IgKGNvbnN0IGRqIG9mIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICBpZiAoW1wiZGFuY2VfanVkZ2VcIiwgXCJhY3JvX2p1ZGdlXCJdLmluZGV4T2YoZGoucm9sZSkgPj0gMCAmJiAhc2NvcmVzX21hcC5nZXQoZGouaWQpLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmVuZGVyRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHNcIiAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSZXN1bHQocnVuKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlX2NsYXNzID0gdGhpcy5jYW5TaG93U2NvcmVzKHJ1bikgPyBcInNjb3JlXCIgOiBcInNjb3JlIGhpZGRlblwiO1xuICAgICAgICBjb25zdCBzY29yZSA9IHR5cGVvZiBydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICA/IHJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBzY29yZV9jbGFzcyB9PlxuICAgICAgICAgICAgICAgIHsgYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtzY29yZX1gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclJ1bihydW4pIHtcbiAgICAgICAgY29uc3QgY2xhc3NfbmFtZSA9IHJ1bi5wZXJmb3JtZWQgPyBcInJ1blwiIDogXCJydW4gaGlkZGVuXCI7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBydW4ucGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgPT09IFwiXCJcbiAgICAgICAgICAgID8gcnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5tYXAocyA9PiBgJHtzLmxhc3RfbmFtZX0gJHtzLmZpcnN0X25hbWV9YCkuam9pbihcIlxcblwiKVxuICAgICAgICAgICAgOiBydW4ucGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfSBrZXk9eyBydW4uaWQgfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IG5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSZXN1bHQocnVuKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUnVucygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbHMuaGVhdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcnVucyA9IHRoaXMuc3RhdGUudG91ci5ydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gdGhpcy5jb250cm9scy5oZWF0KTtcbiAgICAgICAgY29uc3QgdHdvX3Jvd3MgPSBydW5zLmxlbmd0aCA+IDQ7XG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSB0d29fcm93cyA/IFwicnVucyB0d28tcm93c1wiIDogXCJydW5zXCI7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfT5cbiAgICAgICAgICAgICAgICB7IHJ1bnMubWFwKHJ1biA9PiB0aGlzLnJlbmRlclJ1bihydW4pKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbHMuaGVhdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbnVtX2hlYXRzID0gTWF0aC5tYXgoLi4udGhpcy5zdGF0ZS50b3VyLnJ1bnMubWFwKHIgPT4gci5oZWF0KSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYXRcIj5cbiAgICAgICAgICAgICAgICB7IGDQl9Cw0YXQvtC0ICR7dGhpcy5jb250cm9scy5oZWF0fS8ke251bV9oZWF0c31gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYXQoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJ1bnMoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMuZGlzcGxheU5hbWUgPSBcIkhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHNcIjtcbiIsImltcG9ydCBMb2FkaW5nQ29tcG9uZW50IGZyb20gXCJMb2FkaW5nQ29tcG9uZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzT25lUGFydGljaXBhbnQgZXh0ZW5kcyBMb2FkaW5nQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjcmVlbl9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzX3N0YXRlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYXQ6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNob3dTY29yZTogUFQuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaG93U2NvcmU6IHRydWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgQ0xBU1NfSUQgPSBcInNjcmVlbl9oZWF0X29uZV9wYXJ0aWNpcGFudFwiO1xuICAgIEFQSV9NT0RFTFMgPSB7XG4gICAgICAgIHRvdXI6IHtcbiAgICAgICAgICAgIG1vZGVsX3R5cGU6IFwiVG91clwiLFxuICAgICAgICAgICAgbW9kZWxfaWRfZ2V0dGVyOiBwcm9wcyA9PiBwcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5jb250cm9sc19zdGF0ZS50b3VyX2lkLFxuICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlO1xuICAgIH1cblxuICAgIGNhblNob3dTY29yZXMocnVuKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHJ1bi5zY29yZXMubWFwKHMgPT4gW3MuZGlzY2lwbGluZV9qdWRnZV9pZCwgc10pKTtcbiAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcykge1xuICAgICAgICAgICAgaWYgKFtcImRhbmNlX2p1ZGdlXCIsIFwiYWNyb19qdWRnZVwiXS5pbmRleE9mKGRqLnJvbGUpID49IDAgJiYgIXNjb3Jlc19tYXAuZ2V0KGRqLmlkKS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJlbmRlckVtcHR5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c09uZVBhcnRpY2lwYW50XCIgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUmVzdWx0KHJ1bikge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1Njb3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY29yZV9jbGFzcyA9IHRoaXMuY2FuU2hvd1Njb3JlcyhydW4pID8gXCJzY29yZVwiIDogXCJzY29yZSBoaWRkZW5cIjtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlXG4gICAgICAgICAgICA/IHJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBzY29yZV9jbGFzcyB9PlxuICAgICAgICAgICAgICAgIHsgYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtzY29yZX1gIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSdW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9scy5oZWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBydW4gPSB0aGlzLnN0YXRlLnRvdXIucnVucy5maW5kKHIgPT4gci5oZWF0ID09PSB0aGlzLmNvbnRyb2xzLmhlYXQpO1xuICAgICAgICBpZiAoIXJ1bikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbnVtX2hlYXRzID0gTWF0aC5tYXgoLi4udGhpcy5zdGF0ZS50b3VyLnJ1bnMubWFwKHIgPT4gci5oZWF0KSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ1blwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhdFwiPlxuICAgICAgICAgICAgICAgICAgICB7IGDQl9Cw0YXQvtC0ICR7cnVuLmhlYXR9LyR7bnVtX2hlYXRzfWAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcnVuLnBhcnRpY2lwYW50Lm51bWJlciB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcnVuLnBhcnRpY2lwYW50Lm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydGljaXBhbnQtY2x1Yi1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJlc3VsdChydW4pIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhdHNPbmVQYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJ1bigpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSGVhdHNPbmVQYXJ0aWNpcGFudC5kaXNwbGF5TmFtZSA9IFwiSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xuIiwiZXhwb3J0IGxldCBBcGkgPSBudWxsO1xuZXhwb3J0IGxldCB3ZWJzb2NrZXQgPSBudWxsO1xuZXhwb3J0IGxldCBzdG9yYWdlID0gbnVsbDtcbmV4cG9ydCBsZXQgbWFrZVRvdXJSZXN1bHRzVGFibGUgPSBudWxsO1xuZXhwb3J0IGxldCBtYWtlRGlzY2lwbGluZVJlc3VsdHNUYWJsZSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cChkYXRhKSB7XG4gICAgQXBpICAgICAgICAgICAgICAgICAgICAgICAgPSBkYXRhLkFwaTtcbiAgICB3ZWJzb2NrZXQgICAgICAgICAgICAgICAgICA9IGRhdGEud2Vic29ja2V0O1xuICAgIHN0b3JhZ2UgICAgICAgICAgICAgICAgICAgID0gZGF0YS5zdG9yYWdlO1xuICAgIG1ha2VUb3VyUmVzdWx0c1RhYmxlICAgICAgID0gZGF0YS5tYWtlVG91clJlc3VsdHNUYWJsZTtcbiAgICBtYWtlRGlzY2lwbGluZVJlc3VsdHNUYWJsZSA9IGRhdGEubWFrZURpc2NpcGxpbmVSZXN1bHRzVGFibGU7XG59XG4iLCJpbXBvcnQgeyBBcGksIHN0b3JhZ2UsIHdlYnNvY2tldCB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhTG9hZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgbWV0aG9kLCBtb2RlbF90eXBlLCBtb2RlbF9pZCwgc2NoZW1hLCBjbGFzc19pZCkge1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9tZXRob2QgPSBgJHttb2RlbF90eXBlLnRvTG93ZXJDYXNlKCl9LmdldGA7XG4gICAgICAgIHRoaXMuX2lkX25hbWUgPSBgJHttb2RlbF90eXBlLnRvTG93ZXJDYXNlKCl9X2lkYDtcbiAgICAgICAgdGhpcy5fbW9kZWxfdHlwZSA9IG1vZGVsX3R5cGU7XG4gICAgICAgIHRoaXMuX21vZGVsX2lkID0gbW9kZWxfaWQ7XG4gICAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5fc3RvcmFnZV9kb21haW4gPSBgJHtjbGFzc19pZH1fJHttb2RlbF90eXBlfV8ke21vZGVsX2lkfWA7XG4gICAgICAgIHRoaXMuX3N0b3JhZ2UgPSBzdG9yYWdlLmdldERvbWFpbih0aGlzLl9zdG9yYWdlX2RvbWFpbik7XG4gICAgICAgIHRoaXMuX3VwZGF0ZV9saXN0ZW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlbG9hZF9saXN0ZW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jYWxsYmFjayhudWxsKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFwaSh0aGlzLl9tZXRob2QsIHtbdGhpcy5faWRfbmFtZV06IHRoaXMuX21vZGVsX2lkLCBjaGlsZHJlbjogdGhpcy5fc2NoZW1hfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKHRoaXMuX21vZGVsX3R5cGUsIHRoaXMuX21vZGVsX2lkLCB0aGlzLl9zdG9yYWdlKVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLmhhbmRsZURhdGFMb2FkZWQpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICBoYW5kbGVEYXRhTG9hZGVkID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbG9hZF9saXN0ZW5lciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVsb2FkX2xpc3RlbmVyID0gd2Vic29ja2V0LmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0ZV9saXN0ZW5lciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlX2xpc3RlbmVyID0gdGhpcy5fc3RvcmFnZS5hZGRMaXN0ZW5lcih0aGlzLnJlbG9hZEZyb21TdG9yYWdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbG9hZEZyb21TdG9yYWdlKCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZCA9IHRoaXMuX3N0b3JhZ2VcbiAgICAgICAgICAgIC5nZXQodGhpcy5fbW9kZWxfdHlwZSlcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLl9tb2RlbF9pZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5fc2NoZW1hKTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2soc2VyaWFsaXplZCk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKHRoaXMuX3N0b3JhZ2VfZG9tYWluKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlbG9hZF9saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgd2Vic29ja2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMuX3JlbG9hZF9saXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0ZV9saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVMaXN0ZW5lcih0aGlzLl91cGRhdGVfbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IERhdGFMb2FkZXIgZnJvbSBcIi4vRGF0YUxvYWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRlcnMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5BUElfTU9ERUxTKSkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5BUElfTU9ERUxTW2tleV07XG4gICAgICAgICAgICBjb25zdCBtb2RlbF9pZCA9IHBhcmFtcy5tb2RlbF9pZF9nZXR0ZXIodGhpcy5wcm9wcyk7XG4gICAgICAgICAgICBpZiAobW9kZWxfaWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXJzW2tleV0gPSBuZXcgRGF0YUxvYWRlcihcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB0aGlzLl9oYW5kbGVTdGF0ZVVwZGF0ZShrZXksIGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMubWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMubW9kZWxfdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxfaWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zY2hlbWEsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ0xBU1NfSUQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyc1trZXldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfaGFuZGxlU3RhdGVVcGRhdGUgPSAoa2V5LCBkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHVwZCA9IHtba2V5XTogZGF0YX07XG4gICAgICAgIGxldCBhZGQgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QWRkaXRpb25hbFN0YXRlVXBkYXRlKSB7XG4gICAgICAgICAgICBhZGQgPSB0aGlzLmdldEFkZGl0aW9uYWxTdGF0ZVVwZGF0ZShPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLCB1cGQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIHVwZCwgYWRkKSk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuQVBJX01PREVMUykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuQVBJX01PREVMU1trZXldO1xuICAgICAgICAgICAgY29uc3QgdGhpc19tb2RlbF9pZCA9IHBhcmFtcy5tb2RlbF9pZF9nZXR0ZXIodGhpcy5wcm9wcyk7XG4gICAgICAgICAgICBjb25zdCBuZXh0X21vZGVsX2lkID0gcGFyYW1zLm1vZGVsX2lkX2dldHRlcihuZXh0UHJvcHMpO1xuICAgICAgICAgICAgaWYgKHRoaXNfbW9kZWxfaWQgIT09IG5leHRfbW9kZWxfaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGVyc1trZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlcnNba2V5XS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1trZXldOiBudWxsfSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRfbW9kZWxfaWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyc1trZXldID0gbmV3IERhdGFMb2FkZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMuX2hhbmRsZVN0YXRlVXBkYXRlKGtleSwgZGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMubWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm1vZGVsX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0X21vZGVsX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNjaGVtYSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ0xBU1NfSUQsXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXJzW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbklkQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSWRDaGFuZ2VkKGtleSwgbmV4dF9tb2RlbF9pZCwgbmV4dFByb3BzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuQVBJX01PREVMUykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkZXJzW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXJzW2tleV0uZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BsYXNoU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTcGxhc2hTY3JlZW5cIj5cbiAgICAgICAgICAgICAgICA8aDE+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TcGxhc2hTY3JlZW4uZGlzcGxheU5hbWUgPSBcIlNwbGFzaFNjcmVlblwiO1xuIiwiaW1wb3J0IExvYWRpbmdDb21wb25lbnQgZnJvbSBcIkxvYWRpbmdDb21wb25lbnRcIjtcbmltcG9ydCB7IG1ha2VUb3VyUmVzdWx0c1RhYmxlIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmNvbnN0IFBBUlRJQ0lQQU5UU19QRVJfUEFHRSA9IDE1O1xuY29uc3QgUkVGUkVTSF9JTlRFUlZBTCA9IDcwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIGV4dGVuZHMgTG9hZGluZ0NvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG91cklkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBDTEFTU19JRCA9IFwic2NyZWVuX3RvdXJfcmVzdWx0c1wiO1xuICAgIEFQSV9NT0RFTFMgPSB7XG4gICAgICAgIHRvdXI6IHtcbiAgICAgICAgICAgIG1vZGVsX3R5cGU6IFwiVG91clwiLFxuICAgICAgICAgICAgbW9kZWxfaWRfZ2V0dGVyOiBwcm9wcyA9PiBwcm9wcy50b3VySWQsXG4gICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICByZXN1bHRzOiB7fSxcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiB7fSxcbiAgICAgICAgICAgICAgICBydW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGFnZTogMCxcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25JZENoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcGFnZTogMCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcGFnZTogdGhpcy5zdGF0ZS5wYWdlICsgMSxcbiAgICAgICAgfSksIFJFRlJFU0hfSU5URVJWQUwpO1xuICAgIH1cblxuICAgIHJlbmRlclJvdyA9IChyb3cpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyByb3cucnVuLmlkIH0+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnBsYWNlIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnBhcnRpY2lwYW50Lm51bWJlciB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnBhcnRpY2lwYW50Lm5hbWUgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93LnJ1bi50b3RhbF9zY29yZSB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuZXh0LXRvdXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm93LmFkdmFuY2VzID8gPGI+0JTQsDwvYj4gOiBcItCd0LXRglwiIH1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJFbXB0eVJvdyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJlbXB0eVwiIGtleT17IGBFUi0ke2tleX1gIH0+XG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsID8gPHRkPiZuYnNwOzwvdGQ+IDogbnVsbCB9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSb3dzKHJvd3MsIHBhZ2Vfc2l6ZSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gcm93cy5tYXAodGhpcy5yZW5kZXJSb3cpO1xuICAgICAgICBmb3IgKGxldCBpID0gcm93cy5sZW5ndGg7IGkgPCBwYWdlX3NpemU7ICsraSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJFbXB0eVJvdyhpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YWJsZSA9IG1ha2VUb3VyUmVzdWx0c1RhYmxlKHRoaXMuc3RhdGUudG91cik7XG4gICAgICAgIGNvbnN0IG5fcGFnZXMgPSBNYXRoLm1heCgxLFxuICAgICAgICAgICAgTWF0aC5mbG9vcih0YWJsZS5sZW5ndGggLyBQQVJUSUNJUEFOVFNfUEVSX1BBR0UpICtcbiAgICAgICAgICAgICEhKHRhYmxlLmxlbmd0aCAlIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSkpO1xuICAgICAgICBjb25zdCBwYWdlX3NpemUgPSBNYXRoLm1pbihQQVJUSUNJUEFOVFNfUEVSX1BBR0UsIHRhYmxlLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGNvcnJfcGFnZSA9IHRoaXMuc3RhdGUucGFnZSAlIG5fcGFnZXM7XG4gICAgICAgIGNvbnN0IHJvd3MgPSB0YWJsZS5zbGljZShjb3JyX3BhZ2UgKiBQQVJUSUNJUEFOVFNfUEVSX1BBR0UsIChjb3JyX3BhZ2UgKyAxKSAqIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlRvdXJSZXN1bHRzIHRvdXItcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAg0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGFibGU+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDihJZcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQo9GH0LDRgdGC0L3QuNC6XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg0JHQsNC70LvRi1xuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwibmV4dC10b3VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCh0LsuINGC0YPRgFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKHJvd3MsIHBhZ2Vfc2l6ZSkgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVuZGVyZXIuZGlzcGxheU5hbWUgPSBcIlRvdXJSZXN1bHRzX1JlbmRlcmVyXCI7XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91clJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NyZWVuX2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfc3RhdGU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZW5kZXJlclxuICAgICAgICAgICAgICAgIHRvdXJJZD17IHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGUudG91cl9pZCB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVG91clJlc3VsdHMuZGlzcGxheU5hbWUgPSBcIlRvdXJSZXN1bHRzXCI7XG4iLCJpbXBvcnQgU3BsYXNoU2NyZWVuIGZyb20gXCIuL1NwbGFzaFNjcmVlblwiO1xuaW1wb3J0IEhlYXRzT25lUGFydGljaXBhbnQgZnJvbSBcIi4vSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xuaW1wb3J0IEhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMgZnJvbSBcIi4vSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50c1wiO1xuaW1wb3J0IEhlYXRzRm9ybWF0aW9uIGZyb20gXCIuL0hlYXRzRm9ybWF0aW9uXCI7XG5pbXBvcnQgVG91clJlc3VsdHMgZnJvbSBcIi4vVG91clJlc3VsdHNcIjtcbmltcG9ydCBBd2FyZGluZyBmcm9tIFwiLi9Bd2FyZGluZ1wiO1xuXG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gXCIuL0hvc3RNb2R1bGVzXCI7XG5cbmNsYXNzIFNjcmVlbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NyZWVuX2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuX2lkOiBQVC5zdHJpbmcsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgUGFnZUNvbXBvbmVudCA9IHtcbiAgICAgICAgICAgIFwic3BsYXNoXCI6IFNwbGFzaFNjcmVlbixcbiAgICAgICAgICAgIFwiaGVhdHNfb25lX3BhcnRpY2lwYW50XCI6IEhlYXRzT25lUGFydGljaXBhbnQsXG4gICAgICAgICAgICBcImhlYXRzX211bHRpcGxlX3BhcnRpY2lwYW50c1wiOiBIZWF0c011bHRpcGxlUGFydGljaXBhbnRzLFxuICAgICAgICAgICAgXCJoZWF0c19mb3JtYXRpb25cIjogSGVhdHNGb3JtYXRpb24sXG4gICAgICAgICAgICBcInRvdXJfcmVzdWx0c1wiOiBUb3VyUmVzdWx0cyxcbiAgICAgICAgICAgIFwiYXdhcmRpbmdcIjogQXdhcmRpbmcsXG4gICAgICAgIH1bdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5zY3JlZW5fZGF0YS5zY3JlZW5faWRdIHx8IFNwbGFzaFNjcmVlbjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYWdlQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb249eyB0aGlzLnByb3BzLmNvbXBldGl0aW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TY3JlZW4uZGlzcGxheU5hbWUgPSBcIlNjcmVlblwiO1xuXG5jb25zdCByZXNwb25zZSA9IHdpbmRvdy5yZWdpc3RlclNjcmVlbihTY3JlZW4pO1xuc2V0dXAocmVzcG9uc2UpO1xuIl19
