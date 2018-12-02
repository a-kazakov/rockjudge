(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDisciplineResultsTable;

function makeDisciplineResultsTable(discipline) {
  // Build runs index
  var global_storage = discipline.global_storage;
  return discipline.results.rows.map(function (row) {
    return {
      run: global_storage.get("Run", row.run_id),
      place: row.place
    };
  });
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTourResultsTable;

var notNull = function notNull(x) {
  return x != null;
};

function makeTourResultsTable(tour) {
  var tour_result = tour.results;
  return {
    tour: tour,
    tour_result: tour_result,
    rows: tour_result.results_order.map(function (run_id) {
      var run = tour.global_storage.get("Run", run_id);

      if (!run) {
        return null;
      }

      var run_result = tour_result.runs_results[run_id];
      var scores = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var score = _step.value;
          scores[score.discipline_judge_id] = {
            score: score,
            result: tour_result.scores_results[score.id]
          };
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return {
        run: run,
        run_result: run_result,
        scores: scores
      };
    }).filter(notNull)
  };
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastOf;

function lastOf(arr) {
  return arr[arr.length - 1];
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HostModules = require("HostModules");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _makeDisciplineResultsTable = _interopRequireDefault(require("common/makeDisciplineResultsTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Renderer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Renderer, _React$Component);

  function Renderer() {
    _classCallCheck(this, Renderer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Renderer).apply(this, arguments));
  }

  _createClass(Renderer, [{
    key: "renderEmpty",
    value: function renderEmpty() {
      return _HostModules.React.createElement("div", {
        className: "Awarding"
      }, _HostModules.React.createElement("div", {
        className: "discipline-name"
      }, this.props.discipline.name));
    }
  }, {
    key: "renderPlace",
    value: function renderPlace(row) {
      console.log(row);

      if (row.place == null) {
        return null;
      }

      return _HostModules.React.createElement("div", {
        className: "place"
      }, "".concat(row.place, " \u043C\u0435\u0441\u0442\u043E"));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.discipline == null) {
        return null;
      }

      var table = (0, _makeDisciplineResultsTable.default)(this.props.discipline);
      var row = table[this.props.position];

      if (!row) {
        return this.renderEmpty();
      }

      return _HostModules.React.createElement("div", {
        className: "Awarding"
      }, _HostModules.React.createElement("div", {
        className: "discipline-name"
      }, this.props.discipline.name), this.renderPlace(row), _HostModules.React.createElement("div", {
        className: "participant-name"
      }, row.run.participant.name), _HostModules.React.createElement("div", {
        className: "participant-club"
      }, row.run.participant.club.name));
    }
  }]);

  return Renderer;
}(_HostModules.React.Component);

exports.default = Renderer;

_defineProperty(Renderer, "propTypes", {
  discipline: _propTypes.default.object.isRequired,
  position: _propTypes.default.number
});

Renderer.displayName = "Awarding_Renderer";

},{"HostModules":9,"common/makeDisciplineResultsTable":1,"prop-types":18}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HostModules = require("HostModules");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Renderer = _interopRequireDefault(require("./Renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Awarding =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Awarding, _React$Component);

  function Awarding() {
    _classCallCheck(this, Awarding);

    return _possibleConstructorReturn(this, _getPrototypeOf(Awarding).apply(this, arguments));
  }

  _createClass(Awarding, [{
    key: "render",
    value: function render() {
      var _this$controls = this.controls,
          position = _this$controls.position,
          discipline_id = _this$controls.discipline_id;
      return _HostModules.React.createElement("div", {
        className: "discipline-results"
      }, _HostModules.React.createElement(_Renderer.default, {
        discipline: this.props.competition.subscription_storage.get("Discipline", discipline_id),
        position: position
      }));
    }
  }, {
    key: "controls",
    get: function get() {
      return this.props.competition.screen_data.controls_state;
    }
  }]);

  return Awarding;
}(_HostModules.React.Component);

exports.default = Awarding;

_defineProperty(Awarding, "propTypes", {
  competition: _propTypes.default.object.isRequired
});

Awarding.displayName = "Awarding";

},{"./Renderer":4,"HostModules":9,"prop-types":18}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeatsFormation;

var _HostModules = require("HostModules");

var _HeatsOneParticipant = _interopRequireDefault(require("./HeatsOneParticipant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function HeatsFormation(props) {
  return _HostModules.React.createElement(_HeatsOneParticipant.default, _extends({
    showScore: false
  }, props));
}

},{"./HeatsOneParticipant":8,"HostModules":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HostModules = require("HostModules");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeatsMultipleParticipants =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeatsMultipleParticipants, _React$Component);

  function HeatsMultipleParticipants() {
    _classCallCheck(this, HeatsMultipleParticipants);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeatsMultipleParticipants).apply(this, arguments));
  }

  _createClass(HeatsMultipleParticipants, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ensureCorrectTour();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.ensureCorrectTour();
    }
  }, {
    key: "ensureCorrectTour",
    value: function ensureCorrectTour() {
      var _this = this;

      if (!this.is_tour_loaded) {
        setTimeout(function () {
          return _this.props.onActiveTourIdChange(_this.controls.tour_id || null);
        });
      }
    }
  }, {
    key: "canShowScores",
    value: function canShowScores(run) {
      var scores_map = new Map(run.scores.map(function (s) {
        return [s.discipline_judge_id, s];
      }));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.activeTour.discipline.discipline_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dj = _step.value;

          if (["dance_judge", "acro_judge"].includes(dj.role) && !scores_map.get(dj.id).confirmed) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
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
      return _HostModules.React.createElement("div", {
        className: "HeatsMultipleParticipants"
      });
    }
  }, {
    key: "renderResult",
    value: function renderResult(run) {
      var _ref, _run$tour$results$run;

      if (!this.props.showScore) {
        return null;
      }

      var score_class = this.canShowScores(run) ? "score" : "score hidden";
      var score = (_ref = (_run$tour$results$run = run.tour.results.runs_results[run.id]) === null || _run$tour$results$run === void 0 ? void 0 : _run$tour$results$run.total_score_str) !== null && _ref !== void 0 ? _ref : "";
      return _HostModules.React.createElement("div", {
        className: score_class
      }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ".concat(score));
    }
  }, {
    key: "renderRun",
    value: function renderRun(run) {
      var class_name = run.status === "OK" ? "run" : "run hidden";
      var name = run.participant.formation_name === "" ? run.participant.sportsmen.map(function (s) {
        return "".concat(s.last_name, " ").concat(s.first_name);
      }).join("\n") : run.participant.formation_name;
      return _HostModules.React.createElement("div", {
        className: class_name,
        key: run.id
      }, _HostModules.React.createElement("div", {
        className: "participant-number"
      }, run.participant.number), _HostModules.React.createElement("div", {
        className: "participant-name"
      }, name), this.renderResult(run));
    }
  }, {
    key: "renderRuns",
    value: function renderRuns() {
      var _this2 = this;

      if (this.controls.heat == null) {
        return null;
      }

      var runs = this.props.activeTour.runs.filter(function (r) {
        return r.heat === _this2.controls.heat;
      });
      var two_rows = runs.length >= 4;
      var class_name = two_rows ? "runs two-rows" : "runs";
      return _HostModules.React.createElement("div", {
        className: class_name
      }, runs.map(function (run) {
        return _this2.renderRun(run);
      }));
    }
  }, {
    key: "renderHeat",
    value: function renderHeat() {
      if (this.controls.heat == null) {
        return null;
      }

      var num_heats = Math.max.apply(Math, [0].concat(_toConsumableArray(this.props.activeTour.runs.map(function (r) {
        return r.heat;
      }))));
      return _HostModules.React.createElement("div", {
        className: "heat"
      }, "\u0417\u0430\u0445\u043E\u0434 ".concat(this.controls.heat, "/").concat(num_heats));
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.is_tour_loaded || this.props.activeTour == null) {
        return this.renderEmpty();
      }

      return _HostModules.React.createElement("div", {
        className: "HeatsMultipleParticipants"
      }, _HostModules.React.createElement("div", {
        className: "discipline-name"
      }, this.props.activeTour.discipline.name), _HostModules.React.createElement("div", {
        className: "tour-name"
      }, this.props.activeTour.name), this.renderHeat(), this.renderRuns());
    }
  }, {
    key: "controls",
    get: function get() {
      return this.props.competition.screen_data.controls_state;
    }
  }, {
    key: "is_tour_loaded",
    get: function get() {
      var _this$props$activeTou;

      return (((_this$props$activeTou = this.props.activeTour) === null || _this$props$activeTou === void 0 ? void 0 : _this$props$activeTou.id) || null) === (this.controls.tour_id || null);
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        showScore: true
      };
    }
  }]);

  return HeatsMultipleParticipants;
}(_HostModules.React.Component);

exports.default = HeatsMultipleParticipants;

_defineProperty(HeatsMultipleParticipants, "propTypes", {
  activeTour: _propTypes.default.object,
  competition: _propTypes.default.object.isRequired,
  showScore: _propTypes.default.bool,
  onActiveTourIdChange: _propTypes.default.func.isRequired
});

},{"HostModules":9,"prop-types":18}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HostModules = require("HostModules");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeatsOneParticipant =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeatsOneParticipant, _React$Component);

  function HeatsOneParticipant() {
    _classCallCheck(this, HeatsOneParticipant);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeatsOneParticipant).apply(this, arguments));
  }

  _createClass(HeatsOneParticipant, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ensureCorrectTour();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.ensureCorrectTour();
    }
  }, {
    key: "ensureCorrectTour",
    value: function ensureCorrectTour() {
      var _this = this;

      if (!this.is_tour_loaded) {
        setTimeout(function () {
          return _this.props.onActiveTourIdChange(_this.controls.tour_id || null);
        });
      }
    }
  }, {
    key: "canShowScores",
    value: function canShowScores(run) {
      var scores_map = new Map(run.scores.map(function (s) {
        return [s.discipline_judge_id, s];
      }));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.activeTour.discipline.discipline_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dj = _step.value;

          if (["dance_judge", "acro_judge"].includes(dj.role) && !scores_map.get(dj.id).confirmed) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
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
      return _HostModules.React.createElement("div", {
        className: "HeatsOneParticipant"
      });
    }
  }, {
    key: "renderResult",
    value: function renderResult(run) {
      var _run$tour$results$run;

      if (!this.props.showScore) {
        return null;
      }

      var score_class = this.canShowScores(run) ? "score" : "score hidden";
      var score = ((_run$tour$results$run = run.tour.results.runs_results[run.id]) === null || _run$tour$results$run === void 0 ? void 0 : _run$tour$results$run.total_score_str) || "";
      return _HostModules.React.createElement("div", {
        className: score_class
      }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ".concat(score));
    }
  }, {
    key: "renderRun",
    value: function renderRun() {
      var _this2 = this;

      if (!this.controls.heat) {
        return null;
      }

      var run = this.props.activeTour.runs.find(function (r) {
        return r.heat === _this2.controls.heat;
      });

      if (!run) {
        return null;
      }

      var num_heats = Math.max.apply(Math, [0].concat(_toConsumableArray(this.props.activeTour.runs.map(function (r) {
        return r.heat;
      }))));
      return _HostModules.React.createElement("div", {
        className: "run"
      }, _HostModules.React.createElement("div", {
        className: "heat"
      }, "\u0417\u0430\u0445\u043E\u0434 ".concat(run.heat, "/").concat(num_heats)), _HostModules.React.createElement("div", {
        className: "participant-number"
      }, run.participant.number), _HostModules.React.createElement("div", {
        className: "participant-name"
      }, run.participant.name), _HostModules.React.createElement("div", {
        className: "participant-club-name"
      }, run.participant.club.name), this.renderResult(run));
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.is_tour_loaded || this.props.activeTour == null) {
        return this.renderEmpty();
      }

      return _HostModules.React.createElement("div", {
        className: "HeatsOneParticipant"
      }, _HostModules.React.createElement("div", {
        className: "discipline-name"
      }, this.props.activeTour.discipline.name), _HostModules.React.createElement("div", {
        className: "tour-name"
      }, this.props.activeTour.name), this.renderRun());
    }
  }, {
    key: "controls",
    get: function get() {
      return this.props.competition.screen_data.controls_state;
    }
  }, {
    key: "is_tour_loaded",
    get: function get() {
      var _this$props$activeTou;

      return (((_this$props$activeTou = this.props.activeTour) === null || _this$props$activeTou === void 0 ? void 0 : _this$props$activeTou.id) || null) === (this.controls.tour_id || null);
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        showScore: true
      };
    }
  }]);

  return HeatsOneParticipant;
}(_HostModules.React.Component);

exports.default = HeatsOneParticipant;

_defineProperty(HeatsOneParticipant, "propTypes", {
  activeTour: _propTypes.default.object,
  competition: _propTypes.default.object.isRequired,
  showScore: _propTypes.default.bool,
  onActiveTourIdChange: _propTypes.default.func.isRequired
});

},{"HostModules":9,"prop-types":18}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.React = void 0;
var React = window.React;
exports.React = React;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HostModules = require("HostModules");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SplashScreen =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SplashScreen, _React$Component);

  function SplashScreen() {
    _classCallCheck(this, SplashScreen);

    return _possibleConstructorReturn(this, _getPrototypeOf(SplashScreen).apply(this, arguments));
  }

  _createClass(SplashScreen, [{
    key: "render",
    value: function render() {
      return _HostModules.React.createElement("div", {
        className: "SplashScreen"
      }, _HostModules.React.createElement("h1", null, this.props.competition.name));
    }
  }]);

  return SplashScreen;
}(_HostModules.React.Component);

exports.default = SplashScreen;

_defineProperty(SplashScreen, "propTypes", {
  competition: _propTypes.default.object.isRequired
});

SplashScreen.displayName = "SplashScreen";

},{"HostModules":9,"prop-types":18}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HostModules = require("HostModules");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _makeTourResultsTable = _interopRequireDefault(require("common/makeTourResultsTable"));

var _lastOf = _interopRequireDefault(require("common/tools/lastOf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PARTICIPANTS_PER_PAGE = 15;
var REFRESH_INTERVAL = 7000;

var TourResults =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TourResults, _React$Component);

  function TourResults() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TourResults);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TourResults)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      page: 0,
      interval: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderRow", function (row) {
      var _ref, _row$run$tour$results;

      var is_last_tour = (0, _lastOf.default)(_this.props.activeTour.discipline.tours).id === _this.props.activeTour.id;

      var total_score = (_ref = (_row$run$tour$results = row.run.tour.results.runs_results[row.run.id]) === null || _row$run$tour$results === void 0 ? void 0 : _row$run$tour$results.total_score_str) !== null && _ref !== void 0 ? _ref : "";
      return _HostModules.React.createElement("tr", {
        key: row.run.id
      }, _HostModules.React.createElement("td", {
        className: "place"
      }, row.place), _HostModules.React.createElement("td", {
        className: "number"
      }, row.run.participant.number), _HostModules.React.createElement("td", {
        className: "participant"
      }, row.run.participant.name), _HostModules.React.createElement("td", {
        className: "score"
      }, total_score), is_last_tour ? _HostModules.React.createElement("td", {
        className: "next-tour"
      }, row.advances ? _HostModules.React.createElement("b", null, "\u0414\u0430") : "Нет") : null);
    });

    return _this;
  }

  _createClass(TourResults, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ensureCorrectTour();
      this.maybeUpdateLoop();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.ensureCorrectTour();
      this.maybeUpdateLoop();
    }
  }, {
    key: "ensureCorrectTour",
    value: function ensureCorrectTour() {
      var _this2 = this;

      if (!this.is_tour_loaded) {
        setTimeout(function () {
          return _this2.props.onActiveTourIdChange(_this2.controls.tour_id || null);
        });
      }
    }
  }, {
    key: "maybeUpdateLoop",
    value: function maybeUpdateLoop() {
      var _this3 = this;

      var no_tour = this.props.activeTour == null;
      var no_loop = this.state.interval == null;

      if (no_tour === no_loop) {
        return;
      }

      if (no_tour) {
        clearInterval(this.state.interval);
        this.setState({
          interval: null
        });
      } else {
        var interval = setInterval(function () {
          return _this3.setState(function (state) {
            return {
              page: state.page + 1
            };
          });
        }, REFRESH_INTERVAL);
        this.setState({
          interval: interval,
          page: 0
        });
      }
    }
  }, {
    key: "sliceComputedTour",
    value: function sliceComputedTour(computedTour) {
      var tour = computedTour.tour,
          tour_result = computedTour.tour_result,
          rows = computedTour.rows;
      var n_pages = Math.max(1, Math.floor(rows.length / PARTICIPANTS_PER_PAGE) + !!(rows.length % PARTICIPANTS_PER_PAGE));
      var corr_page = this.state.page % n_pages;
      rows = rows.slice(corr_page * PARTICIPANTS_PER_PAGE, (corr_page + 1) * PARTICIPANTS_PER_PAGE);
      return {
        tour: tour,
        tour_result: tour_result,
        rows: rows
      };
    }
  }, {
    key: "renderEmptyRow",
    value: function renderEmptyRow(key) {
      var is_last_tour = (0, _lastOf.default)(this.props.activeTour.discipline.tours).id === this.props.activeTour.id;
      return _HostModules.React.createElement("tr", {
        className: "empty",
        key: "ER-".concat(key)
      }, _HostModules.React.createElement("td", null, "\xA0"), _HostModules.React.createElement("td", null, "\xA0"), _HostModules.React.createElement("td", null, "\xA0"), _HostModules.React.createElement("td", null, "\xA0"), is_last_tour ? _HostModules.React.createElement("td", null, "\xA0") : null);
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
      if (!this.is_tour_loaded) {
        return null;
      }

      console.log(1);
      var computed_tour = (0, _makeTourResultsTable.default)(this.props.activeTour);
      console.log(2);
      var sliced_computed_tour = this.sliceComputedTour(computed_tour);
      console.log(3);
      var page_size = Math.min(PARTICIPANTS_PER_PAGE, computed_tour.rows.length);
      console.log(4);
      var is_last_tour = (0, _lastOf.default)(this.props.activeTour.discipline.tours).id === this.props.activeTour.id;
      console.log(5);
      return _HostModules.React.createElement("div", {
        className: "TourResults tour-results"
      }, _HostModules.React.createElement("div", {
        className: "discipline-name"
      }, this.props.activeTour.discipline.name), _HostModules.React.createElement("div", {
        className: "tour-name"
      }, this.props.activeTour.name), _HostModules.React.createElement("div", {
        className: "header"
      }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0442\u0443\u0440\u0430"), _HostModules.React.createElement("table", null, _HostModules.React.createElement("tbody", null, _HostModules.React.createElement("tr", null, _HostModules.React.createElement("th", {
        className: "place"
      }, "\u041C"), _HostModules.React.createElement("th", {
        className: "number"
      }, "\u2116"), _HostModules.React.createElement("th", {
        className: "participant"
      }, "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A"), _HostModules.React.createElement("th", {
        className: "score"
      }, "\u0411\u0430\u043B\u043B\u044B"), is_last_tour ? _HostModules.React.createElement("th", {
        className: "next-tour"
      }, "\u0421\u043B. \u0442\u0443\u0440") : null), this.renderRows(sliced_computed_tour.rows, page_size, is_last_tour))));
    }
  }, {
    key: "controls",
    get: function get() {
      return this.props.competition.screen_data.controls_state;
    }
  }, {
    key: "is_tour_loaded",
    get: function get() {
      var _this$props$activeTou;

      return (((_this$props$activeTou = this.props.activeTour) === null || _this$props$activeTou === void 0 ? void 0 : _this$props$activeTou.id) || null) === (this.controls.tour_id || null);
    }
  }]);

  return TourResults;
}(_HostModules.React.Component);

exports.default = TourResults;

_defineProperty(TourResults, "propTypes", {
  activeTour: _propTypes.default.object,
  competition: _propTypes.default.object.isRequired,
  onActiveTourIdChange: _propTypes.default.func.isRequired
});

},{"HostModules":9,"common/makeTourResultsTable":2,"common/tools/lastOf":3,"prop-types":18}],12:[function(require,module,exports){
"use strict";

var _HostModules = require("HostModules");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SplashScreen = _interopRequireDefault(require("./SplashScreen"));

var _HeatsOneParticipant = _interopRequireDefault(require("./HeatsOneParticipant"));

var _HeatsMultipleParticipants = _interopRequireDefault(require("./HeatsMultipleParticipants"));

var _HeatsFormation = _interopRequireDefault(require("./HeatsFormation"));

var _TourResults = _interopRequireDefault(require("./TourResults"));

var _Awarding = _interopRequireDefault(require("./Awarding"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Screen =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Screen, _React$Component);

  function Screen() {
    _classCallCheck(this, Screen);

    return _possibleConstructorReturn(this, _getPrototypeOf(Screen).apply(this, arguments));
  }

  _createClass(Screen, [{
    key: "render",
    value: function render() {
      var PageComponent = {
        "splash": _SplashScreen.default,
        "heats_one_participant": _HeatsOneParticipant.default,
        "heats_multiple_participants": _HeatsMultipleParticipants.default,
        "heats_formation": _HeatsFormation.default,
        "tour_results": _TourResults.default,
        "awarding": _Awarding.default
      }[this.props.competition.screen_data.screen_id] || _SplashScreen.default;
      return _HostModules.React.createElement(PageComponent, this.props);
    }
  }]);

  return Screen;
}(_HostModules.React.Component);

_defineProperty(Screen, "propTypes", {
  activeTour: _propTypes.default.object,
  competition: _propTypes.default.object.isRequired,
  onActiveTourIdChange: _propTypes.default.func.isRequired
});

window.registerScreen(Screen);

},{"./Awarding":5,"./HeatsFormation":6,"./HeatsMultipleParticipants":7,"./HeatsOneParticipant":8,"./SplashScreen":10,"./TourResults":11,"HostModules":9,"prop-types":18}],13:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],14:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],15:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))

},{"./lib/ReactPropTypesSecret":19,"_process":14}],16:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":19}],17:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))

},{"./checkPropTypes":15,"./lib/ReactPropTypesSecret":19,"_process":14,"object-assign":13}],18:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))

},{"./factoryWithThrowingShims":16,"./factoryWithTypeCheckers":17,"_process":14}],19:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9jbGllbnQvc3JjL2pzeC9saWIvY29tbW9uL21ha2VEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLmpzeCIsIi4uLy4uL2NsaWVudC9zcmMvanN4L2xpYi9jb21tb24vbWFrZVRvdXJSZXN1bHRzVGFibGUuanN4IiwiLi4vLi4vY2xpZW50L3NyYy9qc3gvbGliL2NvbW1vbi90b29scy9sYXN0T2YuanN4IiwianN4L0F3YXJkaW5nL1JlbmRlcmVyLmpzeCIsImpzeC9Bd2FyZGluZy9pbmRleC5qc3giLCJqc3gvSGVhdHNGb3JtYXRpb24uanN4IiwianN4L0hlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMuanN4IiwianN4L0hlYXRzT25lUGFydGljaXBhbnQuanN4IiwianN4L0hvc3RNb2R1bGVzLmpzeCIsImpzeC9TcGxhc2hTY3JlZW4uanN4IiwianN4L1RvdXJSZXN1bHRzLmpzeCIsImpzeC9yb290LmpzeCIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBZSxTQUFTLDBCQUFULENBQW9DLFVBQXBDLEVBQWdEO0FBQzNEO0FBQ0EsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLGNBQWxDO0FBQ0EsU0FBTyxV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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM2lCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZURpc2NpcGxpbmVSZXN1bHRzVGFibGUoZGlzY2lwbGluZSkge1xuICAgIC8vIEJ1aWxkIHJ1bnMgaW5kZXhcbiAgICBjb25zdCBnbG9iYWxfc3RvcmFnZSA9IGRpc2NpcGxpbmUuZ2xvYmFsX3N0b3JhZ2U7XG4gICAgcmV0dXJuIGRpc2NpcGxpbmUucmVzdWx0cy5yb3dzLm1hcChyb3cgPT4gKHtcbiAgICAgICAgcnVuOiBnbG9iYWxfc3RvcmFnZS5nZXQoXCJSdW5cIiwgcm93LnJ1bl9pZCksXG4gICAgICAgIHBsYWNlOiByb3cucGxhY2UsXG4gICAgfSkpO1xufVxuIiwiY29uc3Qgbm90TnVsbCA9ICh4KSA9PiB4ICE9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VUb3VyUmVzdWx0c1RhYmxlKHRvdXIpIHtcbiAgICBjb25zdCB0b3VyX3Jlc3VsdCA9IHRvdXIucmVzdWx0cztcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3VyOiB0b3VyLFxuICAgICAgICB0b3VyX3Jlc3VsdDogdG91cl9yZXN1bHQsXG4gICAgICAgIHJvd3M6IHRvdXJfcmVzdWx0LnJlc3VsdHNfb3JkZXIubWFwKHJ1bl9pZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBydW4gPSB0b3VyLmdsb2JhbF9zdG9yYWdlLmdldChcIlJ1blwiLCBydW5faWQpO1xuICAgICAgICAgICAgaWYgKCFydW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJ1bl9yZXN1bHQgPSB0b3VyX3Jlc3VsdC5ydW5zX3Jlc3VsdHNbcnVuX2lkXTtcbiAgICAgICAgICAgIGxldCBzY29yZXMgPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgcnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIHNjb3Jlc1tzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHRvdXJfcmVzdWx0LnNjb3Jlc19yZXN1bHRzW3Njb3JlLmlkXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtydW4sIHJ1bl9yZXN1bHQsIHNjb3Jlc307XG4gICAgICAgIH0pLmZpbHRlcihub3ROdWxsKSxcbiAgICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGFzdE9mKGFycikge1xuICAgIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xufVxuIiwiaW1wb3J0IHtSZWFjdH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5pbXBvcnQgUFQgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IG1ha2VEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGZyb20gXCJjb21tb24vbWFrZURpc2NpcGxpbmVSZXN1bHRzVGFibGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgZGlzY2lwbGluZTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgcG9zaXRpb246IFBULm51bWJlcixcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyRW1wdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBd2FyZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUGxhY2Uocm93KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocm93KTtcclxuICAgICAgICBpZiAocm93LnBsYWNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2VcIj5cclxuICAgICAgICAgICAgICAgIHsgYCR7cm93LnBsYWNlfSDQvNC10YHRgtC+YCB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzY2lwbGluZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0YWJsZSA9IG1ha2VEaXNjaXBsaW5lUmVzdWx0c1RhYmxlKHRoaXMucHJvcHMuZGlzY2lwbGluZSk7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gdGFibGVbdGhpcy5wcm9wcy5wb3NpdGlvbl07XHJcbiAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRW1wdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBd2FyZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBsYWNlKHJvdykgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyByb3cucnVuLnBhcnRpY2lwYW50Lm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LWNsdWJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4ucGFydGljaXBhbnQuY2x1Yi5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZW5kZXJlci5kaXNwbGF5TmFtZSA9IFwiQXdhcmRpbmdfUmVuZGVyZXJcIjsiLCJpbXBvcnQge1JlYWN0fSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcclxuXHJcbmltcG9ydCBQVCBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vUmVuZGVyZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF3YXJkaW5nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgY29tcGV0aXRpb246IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgfTtcclxuXHJcbiAgICBnZXQgY29udHJvbHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbiwgZGlzY2lwbGluZV9pZH0gPSB0aGlzLmNvbnRyb2xzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1yZXN1bHRzXCI+XHJcbiAgICAgICAgICAgICAgICA8UmVuZGVyZXJcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lPXsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5zdWJzY3JpcHRpb25fc3RvcmFnZS5nZXQoXCJEaXNjaXBsaW5lXCIsIGRpc2NpcGxpbmVfaWQpIH1cclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbj17IHBvc2l0aW9uIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkF3YXJkaW5nLmRpc3BsYXlOYW1lID0gXCJBd2FyZGluZ1wiOyIsImltcG9ydCB7UmVhY3R9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xyXG5cclxuaW1wb3J0IEhlYXRzT25lUGFydGljaXBhbnQgZnJvbSBcIi4vSGVhdHNPbmVQYXJ0aWNpcGFudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVhdHNGb3JtYXRpb24ocHJvcHMpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEhlYXRzT25lUGFydGljaXBhbnRcclxuICAgICAgICAgICAgc2hvd1Njb3JlPXsgZmFsc2UgfVxyXG4gICAgICAgICAgICB7IC4uLnByb3BzIH1cclxuICAgICAgICAvPlxyXG4gICAgKTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHtSZWFjdH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5pbXBvcnQgUFQgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBhY3RpdmVUb3VyOiBQVC5vYmplY3QsXHJcbiAgICAgICAgY29tcGV0aXRpb246IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIHNob3dTY29yZTogUFQuYm9vbCxcclxuICAgICAgICBvbkFjdGl2ZVRvdXJJZENoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgfTtcclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNob3dTY29yZTogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlQ29ycmVjdFRvdXIoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUNvcnJlY3RUb3VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5zdXJlQ29ycmVjdFRvdXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3RvdXJfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkFjdGl2ZVRvdXJJZENoYW5nZSh0aGlzLmNvbnRyb2xzLnRvdXJfaWQgfHwgbnVsbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGU7XHJcbiAgICB9XHJcbiAgICBnZXQgaXNfdG91cl9sb2FkZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnByb3BzLmFjdGl2ZVRvdXI/LmlkIHx8IG51bGwpID09PSAodGhpcy5jb250cm9scy50b3VyX2lkIHx8IG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhblNob3dTY29yZXMocnVuKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVzX21hcCA9IG5ldyBNYXAocnVuLnNjb3Jlcy5tYXAocyA9PiBbcy5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzXSkpO1xyXG4gICAgICAgIGZvciAoY29uc3QgZGogb2YgdGhpcy5wcm9wcy5hY3RpdmVUb3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMpIHtcclxuICAgICAgICAgICAgaWYgKFtcImRhbmNlX2p1ZGdlXCIsIFwiYWNyb19qdWRnZVwiXS5pbmNsdWRlcyhkai5yb2xlKSAmJiAhc2NvcmVzX21hcC5nZXQoZGouaWQpLmNvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRW1wdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c011bHRpcGxlUGFydGljaXBhbnRzXCIgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUmVzdWx0KHJ1bikge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93U2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNjb3JlX2NsYXNzID0gdGhpcy5jYW5TaG93U2NvcmVzKHJ1bikgPyBcInNjb3JlXCIgOiBcInNjb3JlIGhpZGRlblwiO1xyXG4gICAgICAgIGNvbnN0IHNjb3JlID0gcnVuLnRvdXIucmVzdWx0cy5ydW5zX3Jlc3VsdHNbcnVuLmlkXT8udG90YWxfc2NvcmVfc3RyID8/IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBzY29yZV9jbGFzcyB9PlxyXG4gICAgICAgICAgICAgICAgeyBg0KDQtdC30YPQu9GM0YLQsNGCOiAke3Njb3JlfWAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJ1bihydW4pIHtcclxuICAgICAgICBjb25zdCBjbGFzc19uYW1lID0gcnVuLnN0YXR1cyA9PT0gXCJPS1wiID8gXCJydW5cIiA6IFwicnVuIGhpZGRlblwiO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBydW4ucGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgPT09IFwiXCJcclxuICAgICAgICAgICAgPyBydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLm1hcChzID0+IGAke3MubGFzdF9uYW1lfSAke3MuZmlyc3RfbmFtZX1gKS5qb2luKFwiXFxuXCIpXHJcbiAgICAgICAgICAgIDogcnVuLnBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NfbmFtZSB9IGtleT17IHJ1bi5pZCB9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1udW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUmVzdWx0KHJ1bikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUnVucygpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9scy5oZWF0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJ1bnMgPSB0aGlzLnByb3BzLmFjdGl2ZVRvdXIucnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IHRoaXMuY29udHJvbHMuaGVhdCk7XHJcbiAgICAgICAgY29uc3QgdHdvX3Jvd3MgPSBydW5zLmxlbmd0aCA+PSA0O1xyXG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSB0d29fcm93cyA/IFwicnVucyB0d28tcm93c1wiIDogXCJydW5zXCI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0+XHJcbiAgICAgICAgICAgICAgICB7IHJ1bnMubWFwKHJ1biA9PiB0aGlzLnJlbmRlclJ1bihydW4pKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJIZWF0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmhlYXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbnVtX2hlYXRzID0gTWF0aC5tYXgoMCwgLi4udGhpcy5wcm9wcy5hY3RpdmVUb3VyLnJ1bnMubWFwKHIgPT4gci5oZWF0KSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWF0XCI+XHJcbiAgICAgICAgICAgICAgICB7IGDQl9Cw0YXQvtC0ICR7dGhpcy5jb250cm9scy5oZWF0fS8ke251bV9oZWF0c31gIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNfdG91cl9sb2FkZWQgfHwgdGhpcy5wcm9wcy5hY3RpdmVUb3VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRW1wdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c011bHRpcGxlUGFydGljaXBhbnRzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5hY3RpdmVUb3VyLmRpc2NpcGxpbmUubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG91ci1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjdGl2ZVRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWF0KCkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJ1bnMoKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtSZWFjdH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5pbXBvcnQgUFQgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzT25lUGFydGljaXBhbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBhY3RpdmVUb3VyOiBQVC5vYmplY3QsXHJcbiAgICAgICAgY29tcGV0aXRpb246IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIHNob3dTY29yZTogUFQuYm9vbCxcclxuICAgICAgICBvbkFjdGl2ZVRvdXJJZENoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgfTtcclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNob3dTY29yZTogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlQ29ycmVjdFRvdXIoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUNvcnJlY3RUb3VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5zdXJlQ29ycmVjdFRvdXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3RvdXJfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkFjdGl2ZVRvdXJJZENoYW5nZSh0aGlzLmNvbnRyb2xzLnRvdXJfaWQgfHwgbnVsbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udHJvbHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuY29udHJvbHNfc3RhdGU7XHJcbiAgICB9XHJcbiAgICBnZXQgaXNfdG91cl9sb2FkZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnByb3BzLmFjdGl2ZVRvdXI/LmlkIHx8IG51bGwpID09PSAodGhpcy5jb250cm9scy50b3VyX2lkIHx8IG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhblNob3dTY29yZXMocnVuKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVzX21hcCA9IG5ldyBNYXAocnVuLnNjb3Jlcy5tYXAocyA9PiBbcy5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzXSkpO1xyXG4gICAgICAgIGZvciAoY29uc3QgZGogb2YgdGhpcy5wcm9wcy5hY3RpdmVUb3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMpIHtcclxuICAgICAgICAgICAgaWYgKFtcImRhbmNlX2p1ZGdlXCIsIFwiYWNyb19qdWRnZVwiXS5pbmNsdWRlcyhkai5yb2xlKSAmJiAhc2NvcmVzX21hcC5nZXQoZGouaWQpLmNvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRW1wdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJIZWF0c09uZVBhcnRpY2lwYW50XCIgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUmVzdWx0KHJ1bikge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93U2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNjb3JlX2NsYXNzID0gdGhpcy5jYW5TaG93U2NvcmVzKHJ1bikgPyBcInNjb3JlXCIgOiBcInNjb3JlIGhpZGRlblwiO1xyXG4gICAgICAgIGNvbnN0IHNjb3JlID0gcnVuLnRvdXIucmVzdWx0cy5ydW5zX3Jlc3VsdHNbcnVuLmlkXT8udG90YWxfc2NvcmVfc3RyIHx8IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBzY29yZV9jbGFzcyB9PlxyXG4gICAgICAgICAgICAgICAgeyBg0KDQtdC30YPQu9GM0YLQsNGCOiAke3Njb3JlfWAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUnVuKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250cm9scy5oZWF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBydW4gPSB0aGlzLnByb3BzLmFjdGl2ZVRvdXIucnVucy5maW5kKHIgPT4gci5oZWF0ID09PSB0aGlzLmNvbnRyb2xzLmhlYXQpO1xyXG4gICAgICAgIGlmICghcnVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBudW1faGVhdHMgPSBNYXRoLm1heCgwLCAuLi50aGlzLnByb3BzLmFjdGl2ZVRvdXIucnVucy5tYXAociA9PiByLmhlYXQpKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ1blwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBg0JfQsNGF0L7QtCAke3J1bi5oZWF0fS8ke251bV9oZWF0c31gIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1udW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnRpY2lwYW50LW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudC1jbHViLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJ1bi5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUmVzdWx0KHJ1bikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc190b3VyX2xvYWRlZCB8fCB0aGlzLnByb3BzLmFjdGl2ZVRvdXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJFbXB0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYXRzT25lUGFydGljaXBhbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjdGl2ZVRvdXIuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYWN0aXZlVG91ci5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJ1bigpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7IiwiaW1wb3J0IHtSZWFjdH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcbmltcG9ydCBQVCBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BsYXNoU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgY29tcGV0aXRpb246IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgfTtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlNwbGFzaFNjcmVlblwiPlxyXG4gICAgICAgICAgICAgICAgPGgxPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblNwbGFzaFNjcmVlbi5kaXNwbGF5TmFtZSA9IFwiU3BsYXNoU2NyZWVuXCI7IiwiaW1wb3J0IHtSZWFjdH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5pbXBvcnQgUFQgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IG1ha2VUb3VyUmVzdWx0c1RhYmxlIGZyb20gXCJjb21tb24vbWFrZVRvdXJSZXN1bHRzVGFibGVcIjtcclxuaW1wb3J0IGxhc3RPZiBmcm9tIFwiY29tbW9uL3Rvb2xzL2xhc3RPZlwiO1xyXG5cclxuY29uc3QgUEFSVElDSVBBTlRTX1BFUl9QQUdFID0gMTU7XHJcbmNvbnN0IFJFRlJFU0hfSU5URVJWQUwgPSA3MDAwO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91clJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBhY3RpdmVUb3VyOiBQVC5vYmplY3QsXHJcbiAgICAgICAgY29tcGV0aXRpb246IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG9uQWN0aXZlVG91cklkQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIHBhZ2U6IDAsXHJcbiAgICAgICAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlQ29ycmVjdFRvdXIoKTtcclxuICAgICAgICB0aGlzLm1heWJlVXBkYXRlTG9vcCgpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlQ29ycmVjdFRvdXIoKTtcclxuICAgICAgICB0aGlzLm1heWJlVXBkYXRlTG9vcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuc3VyZUNvcnJlY3RUb3VyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc190b3VyX2xvYWRlZCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvcHMub25BY3RpdmVUb3VySWRDaGFuZ2UodGhpcy5jb250cm9scy50b3VyX2lkIHx8IG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRyb2xzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLnNjcmVlbl9kYXRhLmNvbnRyb2xzX3N0YXRlO1xyXG4gICAgfVxyXG4gICAgZ2V0IGlzX3RvdXJfbG9hZGVkKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5wcm9wcy5hY3RpdmVUb3VyPy5pZCB8fCBudWxsKSA9PT0gKHRoaXMuY29udHJvbHMudG91cl9pZCB8fCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBtYXliZVVwZGF0ZUxvb3AoKSB7XHJcbiAgICAgICAgY29uc3Qgbm9fdG91ciA9IHRoaXMucHJvcHMuYWN0aXZlVG91ciA9PSBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5vX2xvb3AgPSB0aGlzLnN0YXRlLmludGVydmFsID09IG51bGw7XHJcbiAgICAgICAgaWYgKG5vX3RvdXIgPT09IG5vX2xvb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9fdG91cikge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGludGVydmFsOiBudWxsLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiAoe3BhZ2U6IHN0YXRlLnBhZ2UgKyAxfSkpLFxyXG4gICAgICAgICAgICAgICAgUkVGUkVTSF9JTlRFUlZBTCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW50ZXJ2YWwsIHBhZ2U6IDB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzbGljZUNvbXB1dGVkVG91cihjb21wdXRlZFRvdXIpIHtcclxuICAgICAgICBsZXQge3RvdXIsIHRvdXJfcmVzdWx0LCByb3dzfSA9IGNvbXB1dGVkVG91cjtcclxuICAgICAgICBjb25zdCBuX3BhZ2VzID0gTWF0aC5tYXgoMSxcclxuICAgICAgICAgICAgTWF0aC5mbG9vcihyb3dzLmxlbmd0aCAvIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSkgK1xyXG4gICAgICAgICAgICAhIShyb3dzLmxlbmd0aCAlIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGNvcnJfcGFnZSA9IHRoaXMuc3RhdGUucGFnZSAlIG5fcGFnZXM7XHJcbiAgICAgICAgcm93cyA9IHJvd3Muc2xpY2UoXHJcbiAgICAgICAgICAgIGNvcnJfcGFnZSAqIFBBUlRJQ0lQQU5UU19QRVJfUEFHRSxcclxuICAgICAgICAgICAgKGNvcnJfcGFnZSArIDEpICogUEFSVElDSVBBTlRTX1BFUl9QQUdFXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4ge3RvdXIsIHRvdXJfcmVzdWx0LCByb3dzfTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSb3cgPSAocm93KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXNfbGFzdF90b3VyID0gbGFzdE9mKHRoaXMucHJvcHMuYWN0aXZlVG91ci5kaXNjaXBsaW5lLnRvdXJzKS5pZCA9PT0gdGhpcy5wcm9wcy5hY3RpdmVUb3VyLmlkO1xyXG4gICAgICAgIGNvbnN0IHRvdGFsX3Njb3JlID0gcm93LnJ1bi50b3VyLnJlc3VsdHMucnVuc19yZXN1bHRzW3Jvdy5ydW4uaWRdPy50b3RhbF9zY29yZV9zdHIgPz8gXCJcIjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHIga2V5PXsgcm93LnJ1bi5pZCB9PlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyByb3cucGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJvdy5ydW4ucGFydGljaXBhbnQubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZSB9XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgeyBpc19sYXN0X3RvdXIgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5leHQtdG91clwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvdy5hZHZhbmNlcyA/IDxiPtCU0LA8L2I+IDogXCLQndC10YJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICkgOiBudWxsIH1cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuICAgIHJlbmRlckVtcHR5Um93KGtleSkge1xyXG4gICAgICAgIGNvbnN0IGlzX2xhc3RfdG91ciA9IGxhc3RPZih0aGlzLnByb3BzLmFjdGl2ZVRvdXIuZGlzY2lwbGluZS50b3VycykuaWQgPT09IHRoaXMucHJvcHMuYWN0aXZlVG91ci5pZDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiZW1wdHlcIiBrZXk9eyBgRVItJHtrZXl9YCB9PlxyXG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XHJcbiAgICAgICAgICAgICAgICB7IGlzX2xhc3RfdG91ciA/IDx0ZD4mbmJzcDs8L3RkPiA6IG51bGwgfVxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3dzKHJvd3MsIHBhZ2Vfc2l6ZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSByb3dzLm1hcCh0aGlzLnJlbmRlclJvdyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHJvd3MubGVuZ3RoOyBpIDwgcGFnZV9zaXplOyArK2kpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJFbXB0eVJvdyhpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3RvdXJfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygxKTtcclxuICAgICAgICBjb25zdCBjb21wdXRlZF90b3VyID0gbWFrZVRvdXJSZXN1bHRzVGFibGUodGhpcy5wcm9wcy5hY3RpdmVUb3VyKTtcclxuICAgICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgICBjb25zdCBzbGljZWRfY29tcHV0ZWRfdG91ciA9IHRoaXMuc2xpY2VDb21wdXRlZFRvdXIoY29tcHV0ZWRfdG91cik7XHJcbiAgICAgICAgY29uc29sZS5sb2coMyk7XHJcbiAgICAgICAgY29uc3QgcGFnZV9zaXplID0gTWF0aC5taW4oUEFSVElDSVBBTlRTX1BFUl9QQUdFLCBjb21wdXRlZF90b3VyLnJvd3MubGVuZ3RoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyg0KTtcclxuICAgICAgICBjb25zdCBpc19sYXN0X3RvdXIgPSBsYXN0T2YodGhpcy5wcm9wcy5hY3RpdmVUb3VyLmRpc2NpcGxpbmUudG91cnMpLmlkID09PSB0aGlzLnByb3BzLmFjdGl2ZVRvdXIuaWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coNSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJUb3VyUmVzdWx0cyB0b3VyLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2lwbGluZS1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjdGl2ZVRvdXIuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYWN0aXZlVG91ci5uYW1lIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICDQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dGFibGU+PHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwibnVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDihJZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDQo9GH0LDRgdGC0L3QuNC6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJzY29yZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg0JHQsNC70LvRi1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlzX2xhc3RfdG91ciA/IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJuZXh0LXRvdXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQodC7LiDRgtGD0YBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKHNsaWNlZF9jb21wdXRlZF90b3VyLnJvd3MsIHBhZ2Vfc2l6ZSwgaXNfbGFzdF90b3VyKSB9XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7UmVhY3R9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xyXG5cclxuaW1wb3J0IFBUIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBTcGxhc2hTY3JlZW4gZnJvbSBcIi4vU3BsYXNoU2NyZWVuXCI7XHJcbmltcG9ydCBIZWF0c09uZVBhcnRpY2lwYW50IGZyb20gXCIuL0hlYXRzT25lUGFydGljaXBhbnRcIjtcclxuaW1wb3J0IEhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMgZnJvbSBcIi4vSGVhdHNNdWx0aXBsZVBhcnRpY2lwYW50c1wiO1xyXG5pbXBvcnQgSGVhdHNGb3JtYXRpb24gZnJvbSBcIi4vSGVhdHNGb3JtYXRpb25cIjtcclxuaW1wb3J0IFRvdXJSZXN1bHRzIGZyb20gXCIuL1RvdXJSZXN1bHRzXCI7XHJcbmltcG9ydCBBd2FyZGluZyBmcm9tIFwiLi9Bd2FyZGluZ1wiO1xyXG5cclxuY2xhc3MgU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgYWN0aXZlVG91cjogUFQub2JqZWN0LFxyXG4gICAgICAgIGNvbXBldGl0aW9uOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICBvbkFjdGl2ZVRvdXJJZENoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgfTtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBQYWdlQ29tcG9uZW50ID0ge1xyXG4gICAgICAgICAgICBcInNwbGFzaFwiOiBTcGxhc2hTY3JlZW4sXHJcbiAgICAgICAgICAgIFwiaGVhdHNfb25lX3BhcnRpY2lwYW50XCI6IEhlYXRzT25lUGFydGljaXBhbnQsXHJcbiAgICAgICAgICAgIFwiaGVhdHNfbXVsdGlwbGVfcGFydGljaXBhbnRzXCI6IEhlYXRzTXVsdGlwbGVQYXJ0aWNpcGFudHMsXHJcbiAgICAgICAgICAgIFwiaGVhdHNfZm9ybWF0aW9uXCI6IEhlYXRzRm9ybWF0aW9uLFxyXG4gICAgICAgICAgICBcInRvdXJfcmVzdWx0c1wiOiBUb3VyUmVzdWx0cyxcclxuICAgICAgICAgICAgXCJhd2FyZGluZ1wiOiBBd2FyZGluZyxcclxuICAgICAgICB9W3RoaXMucHJvcHMuY29tcGV0aXRpb24uc2NyZWVuX2RhdGEuc2NyZWVuX2lkXSB8fCBTcGxhc2hTY3JlZW47XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFBhZ2VDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cucmVnaXN0ZXJTY3JlZW4oU2NyZWVuKTtcclxuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgIClcblxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBzaGltKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgaWYgKHNlY3JldCA9PT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgIC8vIEl0IGlzIHN0aWxsIHNhZmUgd2hlbiBjYWxsZWQgZnJvbSBSZWFjdC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICdVc2UgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKCkgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICk7XG4gICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgdGhyb3cgZXJyO1xuICB9O1xuICBzaGltLmlzUmVxdWlyZWQgPSBzaGltO1xuICBmdW5jdGlvbiBnZXRTaGltKCkge1xuICAgIHJldHVybiBzaGltO1xuICB9O1xuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IHNoaW0sXG4gICAgYm9vbDogc2hpbSxcbiAgICBmdW5jOiBzaGltLFxuICAgIG51bWJlcjogc2hpbSxcbiAgICBvYmplY3Q6IHNoaW0sXG4gICAgc3RyaW5nOiBzaGltLFxuICAgIHN5bWJvbDogc2hpbSxcblxuICAgIGFueTogc2hpbSxcbiAgICBhcnJheU9mOiBnZXRTaGltLFxuICAgIGVsZW1lbnQ6IHNoaW0sXG4gICAgaW5zdGFuY2VPZjogZ2V0U2hpbSxcbiAgICBub2RlOiBzaGltLFxuICAgIG9iamVjdE9mOiBnZXRTaGltLFxuICAgIG9uZU9mOiBnZXRTaGltLFxuICAgIG9uZU9mVHlwZTogZ2V0U2hpbSxcbiAgICBzaGFwZTogZ2V0U2hpbSxcbiAgICBleGFjdDogZ2V0U2hpbVxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gZW1wdHlGdW5jdGlvbjtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiJdfQ==
