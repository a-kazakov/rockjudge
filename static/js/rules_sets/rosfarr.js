(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (message, action) {
    var close_on_confirm = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return swal({
        title: message,
        animation: false,
        showCancelButton: true,
        confirmButtonText: (0, _l10n2.default)("global.labels.yes"),
        cancelButtonText: (0, _l10n2.default)("global.labels.no"),
        closeOnConfirm: close_on_confirm
    }, action);
};

},{"l10n":100}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeClassName;
function makeClassName(data) {
    return Object.keys(data).filter(function (cn) {
        return data[cn];
    }).join(" ");
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeClassName = require("common/makeClassName");

var _makeClassName2 = _interopRequireDefault(_makeClassName);

var _onTouchOrClick = require("./onTouchOrClick");

var _onTouchOrClick2 = _interopRequireDefault(_onTouchOrClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntegerInput = function (_React$Component) {
    _inherits(IntegerInput, _React$Component);

    function IntegerInput() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, IntegerInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(IntegerInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleMinus = function () {
            if (_this.props.readOnly) {
                return;
            }
            if (_this.props.sendDeltas) {
                _this.props.onChange({ "delta": -1 });
            } else {
                _this.props.onChange(_this.props.value - 1);
            }
        }, _this.handlePlus = function () {
            if (_this.props.readOnly) {
                return;
            }
            if (_this.props.sendDeltas) {
                _this.props.onChange({ "delta": 1 });
            } else {
                _this.props.onChange(_this.props.value + 1);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(IntegerInput, [{
        key: "getClassName",
        value: function getClassName() {
            return (0, _makeClassName2.default)({
                "IntegerInput": true,
                "read-only": this.props.readOnly
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.getClassName() },
                React.createElement(
                    "button",
                    _extends({
                        className: "tbtn btn-minus"
                    }, (0, _onTouchOrClick2.default)(this.handleMinus)),
                    "−"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    this.props.value
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: "tbtn btn-plus"
                    }, (0, _onTouchOrClick2.default)(this.handlePlus)),
                    "+"
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                readOnly: PT.bool,
                sendDeltas: PT.bool,
                value: PT.number.isRequired,
                onChange: PT.func.isRequired
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                readOnly: false,
                sendDeltas: false
            };
        }
    }]);

    return IntegerInput;
}(React.Component);

exports.default = IntegerInput;


IntegerInput.displayName = "tablet_ui_IntegerInput";

},{"./onTouchOrClick":9,"common/makeClassName":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SelectorInput = require("./SelectorInput");

var _SelectorInput2 = _interopRequireDefault(_SelectorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberSelectorInput = function (_React$Component) {
    _inherits(NumberSelectorInput, _React$Component);

    function NumberSelectorInput() {
        _classCallCheck(this, NumberSelectorInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberSelectorInput).apply(this, arguments));
    }

    _createClass(NumberSelectorInput, [{
        key: "makeChoices",
        value: function makeChoices(min, max, step, decimal_size) {
            var result = [];
            for (var value = min; value <= max; value += step) {
                var text = value.toFixed(decimal_size);
                result.push([Number(text), text]);
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props;
            var min = _props.min;
            var max = _props.max;
            var step = _props.step;
            var decimalSize = _props.decimalSize;

            var other_props = _objectWithoutProperties(_props, ["min", "max", "step", "decimalSize"]);

            return React.createElement(_SelectorInput2.default, _extends({
                choices: this.makeChoices(min, max, step, decimalSize)
            }, other_props));
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                max: PT.number.isRequired,
                min: PT.number.isRequired,
                step: PT.number,
                decimalSize: PT.number
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                step: 1,
                decimalSize: 0
            };
        }
    }]);

    return NumberSelectorInput;
}(React.Component);

exports.default = NumberSelectorInput;


NumberSelectorInput.displayName = "tablet_ui_NumberSelectorInput";

},{"./SelectorInput":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _onTouchOrClick = require("../onTouchOrClick");

var _onTouchOrClick2 = _interopRequireDefault(_onTouchOrClick);

var _makeClassName = require("common/makeClassName");

var _makeClassName2 = _interopRequireDefault(_makeClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Item)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function () {
            if (_this.props.readOnly) {
                return;
            }
            _this.props.onClick(_this.props.value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Item, [{
        key: "getClassName",
        value: function getClassName() {
            return (0, _makeClassName2.default)({
                "tbtn": true,
                "score-btn": true,
                "active": this.props.active,
                "read-only": this.props.readOnly
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                _extends({
                    className: this.getClassName()
                }, (0, _onTouchOrClick2.default)(this.handleClick)),
                this.props.text
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                active: PT.bool.isRequired,
                readOnly: PT.bool.isRequired,
                text: PT.string.isRequired,
                value: PT.oneOfType([PT.string.isRequired, PT.number.isRequired, PT.bool.isRequired]),
                onClick: PT.func.isRequired
            };
        }
    }]);

    return Item;
}(React.Component);

exports.default = Item;


Item.displayName = "tablet_ui_SelectorInput_Item";

},{"../onTouchOrClick":9,"common/makeClassName":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeClassName2 = require("common/makeClassName");

var _makeClassName3 = _interopRequireDefault(_makeClassName2);

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectorInput = function (_React$Component) {
    _inherits(SelectorInput, _React$Component);

    function SelectorInput() {
        _classCallCheck(this, SelectorInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectorInput).apply(this, arguments));
    }

    _createClass(SelectorInput, [{
        key: "getButtonsCount",
        value: function getButtonsCount() {
            if (this.props.style === "grid") {
                return this.props.rowSize;
            }
            return this.props.choices.length;
        }
    }, {
        key: "getClassName",
        value: function getClassName() {
            return (0, _makeClassName3.default)(_defineProperty({
                "SelectorInput": true,
                "one-row": this.props.style !== "two-lines",
                "two-rows": this.props.style === "two-lines",
                "selected": this.props.value !== null
            }, "n-" + this.getButtonsCount(), true));
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            for (var idx = 0; idx < this.props.choices.length; ++idx) {
                if (this.props.style === "grid" && idx !== 0 && idx % this.props.rowSize === 0) {
                    result.push(React.createElement("br", { key: "br" + idx }));
                }

                var _props$choices$idx = _slicedToArray(this.props.choices[idx], 2);

                var value = _props$choices$idx[0];
                var text = _props$choices$idx[1];

                result.push(React.createElement(_Item2.default, {
                    active: value === this.props.value,
                    key: idx,
                    readOnly: this.props.readOnly,
                    text: text,
                    value: value,
                    onClick: this.props.onChange
                }));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.getClassName() },
                this.renderRows()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                choices: PT.arrayOf(PT.arrayOf(PT.oneOfType([PT.string.isRequired, PT.number.isRequired, PT.bool.isRequired]))).isRequired,
                readOnly: PT.bool,
                rowSize: PT.number,
                style: PT.oneOf(["grid", "one-line", "two-lines"]),
                value: PT.oneOfType([PT.string.isRequired, PT.number.isRequired, PT.bool.isRequired]),
                onChange: PT.func.isRequired
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                readOnly: false,
                rowSize: 10,
                style: "one-line"
            };
        }
    }]);

    return SelectorInput;
}(React.Component);

exports.default = SelectorInput;


SelectorInput.displayName = "tablet_ui_SelectorInput";

},{"./Item":5,"common/makeClassName":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeClassName = require("common/makeClassName");

var _makeClassName2 = _interopRequireDefault(_makeClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_React$Component) {
    _inherits(Slider, _React$Component);

    _createClass(Slider, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                done: PT.bool.isRequired,
                doneText: PT.string.isRequired,
                slideText: PT.string.isRequired,
                onActivate: PT.func.isRequired
            };
        }
    }]);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

        _this.handleClick = function () {
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                posision: 200,
                touch: false,
                finished: true
            });
            _this.props.onActivate();
        };

        _this.handleTouchStart = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.pin = _this.getRelativeTouch(event);
            _this.setState({
                position: _this.getSliderPos(event),
                touch: true
            });
        };

        _this.handleTouchMove = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                position: _this.getSliderPos(event)
            });
        };

        _this.handleTouchEnd = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            if (_this.state.position === 200) {
                _this.setState({
                    position: 0,
                    finished: true,
                    touch: false
                });
                _this.props.onActivate();
            } else {
                _this.setState({
                    position: 0,
                    touch: false
                });
            }
        };

        _this.state = {
            position: 0,
            touch: false,
            finished: false
        };
        _this.pin = null;
        return _this;
    }

    _createClass(Slider, [{
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps) {
            if (!this.props.done && nextProps.done) {
                this.setState({
                    finished: false
                });
            }
        }
    }, {
        key: "isFree",
        value: function isFree() {
            return !this.state.touch && !this.props.done && !this.state.finished;
        }
    }, {
        key: "getOuterTextOpacity",
        value: function getOuterTextOpacity() {
            if (this.state.finished) {
                return 0;
            }
            var value = Math.min(Math.max(100 - this.state.position, 0), 100);
            return (value / 100).toFixed(3);
        }
    }, {
        key: "getElementOffset",
        value: function getElementOffset(element) {
            var res = 0;
            while (element) {
                res += element.offsetLeft || 0;
                element = element.parentNode;
            }
            return res;
        }
    }, {
        key: "getTouch",
        value: function getTouch(event) {
            var touch = event.touches[0];
            var parent = event.target.parentNode;
            return touch.pageX - this.getElementOffset(parent);
        }
    }, {
        key: "getRelativeTouch",
        value: function getRelativeTouch(event) {
            var touch = event.touches[0];
            var parent = event.target;
            return touch.pageX - this.getElementOffset(parent);
        }
    }, {
        key: "getSliderPos",
        value: function getSliderPos(event) {
            var pos = this.getTouch(event) - this.pin;
            return Math.min(Math.max(pos, 0), 200);
        }
    }, {
        key: "renderText",
        value: function renderText() {
            if (this.props.done) {
                return React.createElement(
                    "span",
                    {
                        className: "done-text",
                        style: { color: "rgb(100,100,100)" }
                    },
                    this.props.doneText
                );
            } else {
                return React.createElement(
                    "span",
                    {
                        className: (0, _makeClassName2.default)({ "slide-text": true, "free": this.isFree() }),
                        style: { color: "rgba(100,100,100," + this.getOuterTextOpacity() + ")" }
                    },
                    this.props.slideText
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "Slider" },
                React.createElement(
                    "div",
                    { className: (0, _makeClassName2.default)({ "inner": true, "free": this.isFree() }),
                        style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                        onClick: this.handleClick,
                        onTouchEnd: this.handleTouchEnd,
                        onTouchMove: this.handleTouchMove,
                        onTouchStart: this.handleTouchStart
                    },
                    "→"
                ),
                this.renderText()
            );
        }
    }]);

    return Slider;
}(React.Component);

exports.default = Slider;


Slider.displayName = "tablet_ui_Slider";

},{"common/makeClassName":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onTouchEndOrClick;
function onTouchEndOrClick(handler) {
    var _handler = function _handler() {};
    var distance = 0;
    var latest_pos = [0, 0];
    var fire = function fire(event) {
        event.preventDefault();
        return _handler();
    };
    var discard = function discard() {
        _handler = function _handler() {};
    };
    var move = function move(event) {
        var current_pos = [event.touches[0].pageX, event.touches[0].pageY];
        var sqr = function sqr(x) {
            return x * x;
        };
        distance += Math.sqrt(sqr(current_pos[0] - latest_pos[0]) + sqr(current_pos[1] - latest_pos[1]));
        latest_pos = current_pos;
        if (distance > 20) {
            discard();
        }
    };
    var start = function start(event) {
        _handler = handler;
        distance = 0;
        latest_pos = [event.touches[0].pageX, event.touches[0].pageY];
    };
    return {
        onTouchStart: start,
        onTouchEnd: fire,
        onTouchMove: move,
        onTouchCancel: discard,
        onClick: handler
    };
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onTouchOrClick;
function onTouchOrClick(handler) {
    var f = function f(event) {
        event.preventDefault();
        return handler(event);
    };
    return {
        onTouchStart: f,
        onClick: f
    };
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

var _genScale = require("./genScale");

var _genScale2 = _interopRequireDefault(_genScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DanceScore = function (_React$Component) {
    _inherits(DanceScore, _React$Component);

    function DanceScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DanceScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DanceScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            var reductions = _this.props.score.data.raw_data.reductions.slice(); // clone
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (key[0] === "A") {
                        var s_val = data[key];
                        reductions[parseInt(key.slice(1))] = s_val === "" ? -1 : parseInt(s_val);
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

            _this.props.onSubmit({
                reductions: reductions,
                mistakes: parseInt(data.mistakes)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DanceScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var fields = this.props.score.data.raw_data.reductions.map(function (red, idx) {
                return {
                    key: "A" + idx,
                    label: "A" + (idx + 1) + ":",
                    options: (0, _genScale2.default)("?reduction"),
                    defaultValue: _this2.props.score.data.raw_data.reductions[idx] === null ? "" : _this2.props.score.data.raw_data.reductions[idx].toString()
                };
            });
            fields.push(this.makeField("mistakes", "FD", (0, _genScale2.default)("numbers", { max: 100 })));
            return React.createElement(_GeneralEditor2.default, {
                fields: fields,
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            reductions: PT.arrayOf(PT.number),
                            mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return DanceScore;
}(React.Component);

exports.default = DanceScore;


DanceScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_DanceScore";

},{"./GeneralEditor":17,"./genScale":22}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmationButton = function (_React$Component) {
    _inherits(ConfirmationButton, _React$Component);

    function ConfirmationButton() {
        _classCallCheck(this, ConfirmationButton);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmationButton).apply(this, arguments));
    }

    _createClass(ConfirmationButton, [{
        key: "getClassName",
        value: function getClassName() {
            var result = "confirmation-button";
            result += this.props.confirmed ? " confirmed" : " not-confirmed";
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                {
                    className: this.getClassName(),
                    type: "button",
                    onClick: this.props.onConfirmationToggle
                },
                this.props.confirmed ? (0, _l10n2.default)("admin.buttons.unconfirm_score") : (0, _l10n2.default)("admin.buttons.confirm_score")
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                confirmed: PT.bool.isRequired,
                onConfirmationToggle: PT.func.isRequired
            };
        }
    }]);

    return ConfirmationButton;
}(React.Component);

exports.default = ConfirmationButton;


ConfirmationButton.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_ConfirmationButton";

},{"l10n":100}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

var _genScale = require("./genScale");

var _genScale2 = _interopRequireDefault(_genScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DanceHalvedScore = function (_React$Component) {
    _inherits(DanceHalvedScore, _React$Component);

    function DanceHalvedScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DanceHalvedScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DanceHalvedScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                fw_woman: data["fw_woman"] === "" ? null : parseFloat(data.fw_woman),
                fw_man: data["fw_man"] === "" ? null : parseFloat(data.fw_man),
                dance_figs: data["dance_figs"] === "" ? null : parseFloat(data.dance_figs),
                composition: data["composition"] === "" ? null : parseFloat(data.composition),
                small_mistakes: parseInt(data.small_mistakes),
                big_mistakes: parseInt(data.big_mistakes)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DanceHalvedScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("fw_woman", "FW", (0, _genScale2.default)("?reduction")), this.makeField("fw_man", "FM", (0, _genScale2.default)("?reduction")), this.makeField("dance_figs", "DF", (0, _genScale2.default)("?numbers", { max: 12.5, step: 0.5 })), this.makeField("composition", "C", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("small_mistakes", "SM", (0, _genScale2.default)("numbers", { max: 100 })), this.makeField("big_mistakes", "BM", (0, _genScale2.default)("numbers", { max: 100 }))],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            fw_woman: PT.number,
                            fw_man: PT.number,
                            dance_figs: PT.number,
                            composition: PT.number,
                            small_mistakes: PT.number,
                            big_mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return DanceHalvedScore;
}(React.Component);

exports.default = DanceHalvedScore;


DanceHalvedScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_DanceHalvedScore";

},{"./GeneralEditor":17,"./genScale":22}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

var _genScale = require("./genScale");

var _genScale2 = _interopRequireDefault(_genScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DanceScore = function (_React$Component) {
    _inherits(DanceScore, _React$Component);

    function DanceScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DanceScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DanceScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                fw_woman: data["fw_woman"] === "" ? null : parseInt(data.fw_woman),
                fw_man: data["fw_man"] === "" ? null : parseInt(data.fw_man),
                dance_figs: data["dance_figs"] === "" ? null : parseInt(data.dance_figs),
                composition: data["composition"] === "" ? null : parseInt(data.composition),
                small_mistakes: parseInt(data.small_mistakes),
                big_mistakes: parseInt(data.big_mistakes)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DanceScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("fw_woman", "FW", (0, _genScale2.default)("?reduction")), this.makeField("fw_man", "FM", (0, _genScale2.default)("?reduction")), this.makeField("dance_figs", "DF", (0, _genScale2.default)("?numbers", { max: 25 })), this.makeField("composition", "C", (0, _genScale2.default)("?numbers", { max: 20 })), this.makeField("small_mistakes", "SM", (0, _genScale2.default)("numbers", { max: 100 })), this.makeField("big_mistakes", "BM", (0, _genScale2.default)("numbers", { max: 100 }))],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            fw_woman: PT.number,
                            fw_man: PT.number,
                            dance_figs: PT.number,
                            composition: PT.number,
                            small_mistakes: PT.number,
                            big_mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return DanceScore;
}(React.Component);

exports.default = DanceScore;


DanceScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_DanceScore";

},{"./GeneralEditor":17,"./genScale":22}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

var _genScale = require("./genScale");

var _genScale2 = _interopRequireDefault(_genScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormationScore = function (_React$Component) {
    _inherits(FormationScore, _React$Component);

    function FormationScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, FormationScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FormationScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                acrobatics: data["acrobatics"] === "" ? null : parseFloat(data.acrobatics),
                dance_tech: data["dance_tech"] === "" ? null : parseFloat(data.dance_tech),
                dance_figs: data["dance_figs"] === "" ? null : parseFloat(data.dance_figs),
                impression: data["impression"] === "" ? null : parseFloat(data.impression),
                big_mistakes: parseInt(data.big_mistakes),
                small_mistakes: parseInt(data.small_mistakes)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FormationScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("acrobatics", "A", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("dance_tech", "DT", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("dance_figs", "DF", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("impression", "I", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("small_mistakes", "SM", (0, _genScale2.default)("numbers", { max: 100 })), this.makeField("big_mistakes", "BM", (0, _genScale2.default)("numbers", { max: 100 }))],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            acrobatics: PT.number,
                            dance_tech: PT.number,
                            dance_figs: PT.number,
                            impression: PT.number,
                            small_mistakes: PT.number,
                            big_mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return FormationScore;
}(React.Component);

exports.default = FormationScore;


FormationScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_FormationScore";

},{"./GeneralEditor":17,"./genScale":22}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

var _genScale = require("./genScale");

var _genScale2 = _interopRequireDefault(_genScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormationScore = function (_React$Component) {
    _inherits(FormationScore, _React$Component);

    function FormationScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, FormationScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FormationScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                dance_tech: data["dance_tech"] === "" ? null : parseFloat(data.dance_tech),
                dance_figs: data["dance_figs"] === "" ? null : parseFloat(data.dance_figs),
                impression: data["impression"] === "" ? null : parseFloat(data.impression),
                mistakes: parseInt(data.small_mistakes)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FormationScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("dance_tech", "DT", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("dance_figs", "DF", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("impression", "I", (0, _genScale2.default)("?numbers", { max: 10, step: 0.5 })), this.makeField("mistakes", "M", (0, _genScale2.default)("numbers", { max: 100 }))],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            dance_tech: PT.number,
                            dance_figs: PT.number,
                            impression: PT.number,
                            mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return FormationScore;
}(React.Component);

exports.default = FormationScore;


FormationScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_FormationScore";

},{"./GeneralEditor":17,"./genScale":22}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Item)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (event) {
            _this.props.onChange(_this.props.field.key, event.target.value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Item, [{
        key: "renderValue",
        value: function renderValue() {
            var _this2 = this;

            if (this.props.readOnly) {
                return React.createElement(
                    "div",
                    { className: "score-value" },
                    React.createElement(
                        "div",
                        { className: "read-only" },
                        this.props.field.options.find(function (o) {
                            return o[0] === _this2.props.value;
                        })[1]
                    )
                );
            }
            return React.createElement(
                "div",
                { className: "score-value" },
                React.createElement(
                    "select",
                    {
                        value: this.props.value,
                        onChange: this.handleChange
                    },
                    this.props.field.options.map(function (option) {
                        var _option = _slicedToArray(option, 2);

                        var value = _option[0];
                        var label = _option[1];

                        return React.createElement(
                            "option",
                            { key: value, value: value },
                            label
                        );
                    })
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "div",
                    { className: "score-label" },
                    this.props.field.label
                ),
                this.renderValue()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                field: PT.shape({
                    label: PT.string.isRequired,
                    key: PT.string.isRequired,
                    options: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                value: PT.string.isRequired,
                onChange: PT.func.isRequired
            };
        }
    }]);

    return Item;
}(React.Component);

exports.default = Item;


Item.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_GeneralEditor_Item";

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralEditor = function (_React$Component) {
    _inherits(GeneralEditor, _React$Component);

    _createClass(GeneralEditor, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                fields: PT.arrayOf(PT.shape({
                    key: PT.string.isRequired,
                    label: PT.string.isRequired,
                    options: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired).isRequired,
                    defaultValue: PT.string.isRequired
                }).isRequired).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    function GeneralEditor(props) {
        _classCallCheck(this, GeneralEditor);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralEditor).call(this, props));

        _this.handleChange = function (key, value) {
            var values = Object.assign({}, _this.state.values);
            values[key] = value;
            _this.setState({ values: values });
        };

        _this.handleDiscardClick = function (event) {
            event.stopPropagation();
            _this.props.onDiscard();
        };

        _this.handleSubmission = function (event) {
            event.preventDefault();
            _this.props.onSubmit(_this.state.values);
        };

        var initial_values = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this.props.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var f = _step.value;

                initial_values[f.key] = f.defaultValue;
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

        _this.state = {
            values: initial_values
        };
        return _this;
    }

    _createClass(GeneralEditor, [{
        key: "renderButtons",
        value: function renderButtons() {
            if (this.props.readOnly) {
                return React.createElement(
                    "div",
                    { className: "buttons" },
                    React.createElement(
                        "button",
                        {
                            className: "btn btn-primary",
                            type: "button",
                            onClick: this.handleDiscardClick
                        },
                        (0, _l10n2.default)("global.buttons.close")
                    )
                );
            }
            return React.createElement(
                "div",
                { className: "buttons" },
                React.createElement(
                    "button",
                    {
                        className: "submit-button",
                        type: "submit"
                    },
                    (0, _l10n2.default)("global.buttons.submit")
                ),
                " ",
                React.createElement(
                    "button",
                    {
                        className: "discard-button",
                        type: "button",
                        onClick: this.handleDiscardClick
                    },
                    (0, _l10n2.default)("global.buttons.discard")
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "form",
                {
                    className: "score-editor",
                    onSubmit: this.handleSubmission
                },
                React.createElement(
                    "div",
                    { className: "fields" },
                    this.props.fields.map(function (f, idx) {
                        return React.createElement(_Item2.default, {
                            field: f,
                            key: f.key,
                            readOnly: _this2.props.readOnly,
                            value: _this2.state.values[f.key],
                            onChange: _this2.handleChange
                        });
                    })
                ),
                this.renderButtons()
            );
        }
    }]);

    return GeneralEditor;
}(React.Component);

exports.default = GeneralEditor;


GeneralEditor.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_GeneralEditor";

},{"./Item":16,"l10n":100}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadJudgeFormationScore = function (_React$Component) {
    _inherits(HeadJudgeFormationScore, _React$Component);

    function HeadJudgeFormationScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, HeadJudgeFormationScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HeadJudgeFormationScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                penalty: parseInt(data.penalty),
                nexttour: data.nexttour === "true"
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(HeadJudgeFormationScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("penalty", "P", [["0", "OK"], ["-5", "-5"], ["-15", "-15"]]), this.makeField("nexttour", "NT", [["false", "No"], ["true", "Yes"]])],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            penalty: PT.number,
                            nexttour: PT.bool
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return HeadJudgeFormationScore;
}(React.Component);

exports.default = HeadJudgeFormationScore;


HeadJudgeFormationScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_HeadJudgeFormationScore";

},{"./GeneralEditor":17}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadJudgeScore = function (_React$Component) {
    _inherits(HeadJudgeScore, _React$Component);

    function HeadJudgeScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, HeadJudgeScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HeadJudgeScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                penalty: parseInt(data.penalty),
                nexttour: data.nexttour === "true"
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(HeadJudgeScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("penalty", "P", [["0", "OK"], ["-3", "-3"], ["-30", "-30"], ["-100", "-100"]]), this.makeField("nexttour", "NT", [["false", "No"], ["true", "Yes"]])],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            penalty: PT.number,
                            nexttour: PT.bool
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return HeadJudgeScore;
}(React.Component);

exports.default = HeadJudgeScore;


HeadJudgeScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_HeadJudgeScore";

},{"./GeneralEditor":17}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

var _genScale = require("./genScale");

var _genScale2 = _interopRequireDefault(_genScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimplifiedScore = function (_React$Component) {
    _inherits(SimplifiedScore, _React$Component);

    function SimplifiedScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, SimplifiedScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SimplifiedScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                points: data["points"] === "" ? null : parseInt(data.points)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SimplifiedScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("points", "S", (0, _genScale2.default)("?numbers", { min: 1, max: 40 }))],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            points: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return SimplifiedScore;
}(React.Component);

exports.default = SimplifiedScore;


SimplifiedScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_SimplifiedScore";

},{"./GeneralEditor":17,"./genScale":22}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralEditor = require("./GeneralEditor");

var _GeneralEditor2 = _interopRequireDefault(_GeneralEditor);

var _genScale = require("./genScale");

var _genScale2 = _interopRequireDefault(_genScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TechJudgeScore = function (_React$Component) {
    _inherits(TechJudgeScore, _React$Component);

    function TechJudgeScore() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TechJudgeScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TechJudgeScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                jump_steps: parseInt(data.jump_steps),
                timing_violation: data.timing_violation === "" ? null : data.timing_violation === "true"
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TechJudgeScore, [{
        key: "makeField",
        value: function makeField(key, label, scale) {
            var value = this.props.score.data.raw_data[key];
            return {
                key: key,
                label: label + ":",
                options: scale,
                defaultValue: value === null ? "" : value.toString()
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(_GeneralEditor2.default, {
                fields: [this.makeField("jump_steps", "JS", (0, _genScale2.default)("numbers", { max: 100 })), this.makeField("timing_violation", "T", [["", "?"], ["false", "✓"], ["true", "✗"]])],
                readOnly: this.props.readOnly,
                onDiscard: this.props.onDiscard,
                onSubmit: this.handleSubmission
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            jump_steps: PT.number,
                            timing_violation: PT.bool
                        }).isRequired
                    }).isRequired
                }).isRequired,
                readOnly: PT.bool.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return TechJudgeScore;
}(React.Component);

exports.default = TechJudgeScore;


TechJudgeScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_TechJudgeScore";

},{"./GeneralEditor":17,"./genScale":22}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function genScale(type, user_params) {
    var optional = type[0] === "?";
    if (optional) {
        type = type.slice(1);
    }
    var result = [];
    switch (type) {
        case "reduction":
            result = [100, 75, 50, 25, 10, 5, 0].map(function (s) {
                return [s.toString(), "-" + s + "%"];
            });
            break;
        case "numbers":
            var params = Object.assign({
                min: 0,
                max: 10,
                step: 1
            }, user_params);
            var fraction_size = Math.abs(params.step - Math.round(params.step)) < 1e-5 ? 0 : 1;
            for (var score = params.min; score < params.max + 1e-5; score += params.step) {
                var str = score.toFixed(fraction_size);
                result.push([str, str]);
            }
            break;
        default:
            console.error("Unknown scale type: " + type);
    }
    if (optional) {
        result = [["", "—"]].concat(result);
    }
    return result;
}

exports.default = genScale;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

var _ConfirmationButton = require("./ConfirmationButton");

var _ConfirmationButton2 = _interopRequireDefault(_ConfirmationButton);

var _AcroScore = require("./AcroScore");

var _AcroScore2 = _interopRequireDefault(_AcroScore);

var _DanceScore = require("./DanceScore");

var _DanceScore2 = _interopRequireDefault(_DanceScore);

var _DanceHalvedScore = require("./DanceHalvedScore");

var _DanceHalvedScore2 = _interopRequireDefault(_DanceHalvedScore);

var _FormationScore = require("./FormationScore");

var _FormationScore2 = _interopRequireDefault(_FormationScore);

var _FormationAcroScore = require("./FormationAcroScore");

var _FormationAcroScore2 = _interopRequireDefault(_FormationAcroScore);

var _SimplifiedScore = require("./SimplifiedScore");

var _SimplifiedScore2 = _interopRequireDefault(_SimplifiedScore);

var _HeadJudgeScore = require("./HeadJudgeScore");

var _HeadJudgeScore2 = _interopRequireDefault(_HeadJudgeScore);

var _HeadJudgeFormationScore = require("./HeadJudgeFormationScore");

var _HeadJudgeFormationScore2 = _interopRequireDefault(_HeadJudgeFormationScore);

var _TechJudgeScore = require("./TechJudgeScore");

var _TechJudgeScore2 = _interopRequireDefault(_TechJudgeScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_React$Component) {
    _inherits(Editor, _React$Component);

    function Editor() {
        _classCallCheck(this, Editor);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
    }

    _createClass(Editor, [{
        key: "renderBody",
        value: function renderBody(scoring_type) {
            if (scoring_type === "head" && ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0) {
                scoring_type = "head_formation";
            }
            var score_props = {
                score: this.props.score,
                readOnly: this.props.readOnly,
                onSubmit: this.props.onSubmit,
                onDiscard: this.props.onDiscard
            };
            switch (scoring_type) {
                case "acro":
                    return React.createElement(_AcroScore2.default, score_props);
                case "dance":
                    return React.createElement(_DanceScore2.default, score_props);
                case "dance_halved":
                    return React.createElement(_DanceHalvedScore2.default, score_props);
                case "formation":
                    return React.createElement(_FormationScore2.default, score_props);
                case "formation_acro":
                    return React.createElement(_FormationAcroScore2.default, score_props);
                case "simplified":
                    return React.createElement(_SimplifiedScore2.default, score_props);
                case "head":
                    return React.createElement(_HeadJudgeScore2.default, score_props);
                case "head_formation":
                    return React.createElement(_HeadJudgeFormationScore2.default, score_props);
                case "tech":
                    return React.createElement(_TechJudgeScore2.default, score_props);
                default:
                    console.error("Unknown scoring type: " + scoring_type);
            }
        }
    }, {
        key: "renderConfirmationButton",
        value: function renderConfirmationButton(scoring_type) {
            if (this.props.readOnly || scoring_type === "head") {
                return null;
            }
            return React.createElement(_ConfirmationButton2.default, {
                confirmed: this.props.score.confirmed,
                onConfirmationToggle: this.props.onConfirmationToggle
            });
        }
    }, {
        key: "render",
        value: function render() {
            var scoring_type = (0, _getScoringType2.default)(this.props.disciplineJudge, this.props.tour.scoring_system_name);
            return React.createElement(
                "div",
                { className: "AdminScoreInput" },
                this.renderBody(scoring_type),
                this.renderConfirmationButton(scoring_type)
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudge: PT.object.isRequired,
                readOnly: PT.bool.isRequired,
                score: PT.object.isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired
                }).isRequired,
                onConfirmationToggle: PT.func.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return Editor;
}(React.Component);

exports.default = Editor;


Editor.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor";

},{"./AcroScore":10,"./ConfirmationButton":11,"./DanceHalvedScore":12,"./DanceScore":13,"./FormationAcroScore":14,"./FormationScore":15,"./HeadJudgeFormationScore":18,"./HeadJudgeScore":19,"./SimplifiedScore":20,"./TechJudgeScore":21,"common/getScoringType":98}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Editor = require("./Editor");

var _Editor2 = _interopRequireDefault(_Editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminScoreInput = function (_React$Component) {
    _inherits(AdminScoreInput, _React$Component);

    function AdminScoreInput() {
        _classCallCheck(this, AdminScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AdminScoreInput).apply(this, arguments));
    }

    _createClass(AdminScoreInput, [{
        key: "render",
        value: function render() {
            if (!this.props.editing) {
                if (this.props.disciplineJudge.role === "head_judge" && this.props.score.data.raw_data.nexttour) {
                    return React.createElement(
                        "span",
                        null,
                        "[" + this.props.score.data.total_score.toFixed(2) + "]"
                    );
                }
                if (this.props.disciplineJudge.role === "tech_judge") {
                    var tv_str = this.props.score.data.raw_data.timing_violation === null ? "?" : this.props.score.data.raw_data.timing_violation ? "✗" : "✓";
                    return React.createElement(
                        "span",
                        null,
                        this.props.score.data.raw_data.jump_steps + " " + tv_str
                    );
                }
                return React.createElement(
                    "span",
                    null,
                    this.props.score.data.total_score.toFixed(2)
                );
            } else {
                return React.createElement(_Editor2.default, {
                    disciplineJudge: this.props.disciplineJudge,
                    readOnly: this.props.readOnly,
                    score: this.props.score,
                    tour: this.props.tour,
                    onConfirmationToggle: this.props.onConfirmationToggle,
                    onDiscard: this.props.onDiscard,
                    onSubmit: this.props.onSubmit
                });
            }
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudge: PT.shape({
                    role: PT.string.isRequired
                }).isRequired,
                editing: PT.bool.isRequired,
                readOnly: PT.bool.isRequired,
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.object.isRequired,
                        total_score: PT.number.isRequired
                    }).isRequired
                }).isRequired,
                tour: PT.object.isRequired,
                onConfirmationToggle: PT.func.isRequired,
                onDiscard: PT.func.isRequired,
                onSubmit: PT.func.isRequired
            };
        }
    }]);

    return AdminScoreInput;
}(React.Component);

exports.default = AdminScoreInput;


AdminScoreInput.displayName = "rules_sets_rosfarr_AdminScoreInput";

},{"./Editor":23}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineResultsTable = function (_React$Component) {
    _inherits(DisciplineResultsTable, _React$Component);

    function DisciplineResultsTable() {
        _classCallCheck(this, DisciplineResultsTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResultsTable).apply(this, arguments));
    }

    _createClass(DisciplineResultsTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
            var need_render = typeof prev_row === "undefined" || prev_row.tour.id !== next_row.tour.id;
            if (!need_render) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "H" + next_row.run.id },
                React.createElement(
                    "th",
                    { className: "tour-name", colSpan: "6" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        next_row.tour.name
                    )
                )
            );
        }
    }, {
        key: "renderRow",
        value: function renderRow(row) {
            var p = row.run.participant;
            return React.createElement(
                "tr",
                { key: "R" + row.run.id },
                React.createElement(
                    "td",
                    { className: "w-8 place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        row.place === null ? "" : row.place
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-8 number" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        p.number
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-36", colSpan: "2" },
                    React.createElement(
                        "table",
                        { className: "sportsmen" },
                        React.createElement(
                            "tbody",
                            null,
                            p.formation_name ? React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    { colSpan: "2" },
                                    React.createElement(
                                        "p",
                                        { className: "text-left" },
                                        p.formation_name
                                    )
                                )
                            ) : null,
                            p.sportsmen.map(function (s, idx) {
                                return React.createElement(
                                    "tr",
                                    { key: idx },
                                    React.createElement(
                                        "td",
                                        { className: "w-75" },
                                        React.createElement(
                                            "p",
                                            null,
                                            s.last_name + " " + s.first_name,
                                            s.substitute ? React.createElement(
                                                "i",
                                                null,
                                                " (",
                                                (0, _l10n2.default)("results.labels.sub"),
                                                ".)"
                                            ) : null
                                        )
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "w-25" },
                                        React.createElement(
                                            "p",
                                            { className: "text-center" },
                                            s.year_of_birth
                                        )
                                    )
                                );
                            })
                        )
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-24 club" },
                    React.createElement(
                        "p",
                        null,
                        p.club.name
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-24 coaches" },
                    React.createElement(
                        "p",
                        null,
                        p.coaches.split(",").map(function (c) {
                            return [c.trim(), React.createElement("br", { key: "X" })];
                        })
                    )
                )
            );
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = 0; i < table.length; ++i) {
                var header = this.renderRowHeader(table[i - 1], table[i]);
                if (header !== null) {
                    result.push(header);
                }
                result.push(this.renderRow(table[i]));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "DisciplineResultsTable" },
                React.createElement(
                    "table",
                    { className: "bordered-table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "w-8" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.place")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-8" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.number")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-27" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.sportsmen")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-9" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.sportsmen_year_of_birth")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-24" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.participant_club")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-24" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.participant_coaches")
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.renderRows()
                    )
                )
            );
        }
    }], [{
        key: "transformDocx",
        value: function transformDocx(docx) {
            docx.addStyle(".tour-name", "background", "#ddd").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%");
        }
    }, {
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                table: PT.arrayOf(PT.shape({
                    place: PT.number,
                    run: PT.shape({
                        participant: PT.shape({
                            number: PT.number.isRequired,
                            coaches: PT.string.isRequired,
                            sportsmen: PT.arrayOf(PT.shape({
                                last_name: PT.string.isRequired,
                                first_name: PT.string.isRequired,
                                year_of_birth: PT.number.isRequired,
                                substitute: PT.bool.isRequired
                            })),
                            club: PT.shape({
                                city: PT.string.isRequired,
                                name: PT.string.isRequired
                            }).isRequired
                        }).isRequired
                    }).isRequired,
                    tour: PT.shape({
                        name: PT.string.isRequired
                    }).isRequired
                }).isRequired).isRequired
            };
        }
    }]);

    return DisciplineResultsTable;
}(React.Component);

exports.default = DisciplineResultsTable;


DisciplineResultsTable.displayName = "rules_sets_rosfarr_DisciplineResultsTable";

},{"l10n":100}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_React$Component) {
    _inherits(Element, _React$Component);

    function Element() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Element);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Element)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onAcroReductionUpdate(_this.props.acroIdx, value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Element, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralScale2.default, {
                header: (0, _l10n2.default)("tablet.acro_judge.acro_n", this.props.acroIdx),
                readOnly: this.props.readOnly,
                scale: "reduction",
                value: this.props.reduction,
                onChange: this.handleChange
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                acroIdx: PT.number.isRequired,
                reduction: PT.number,
                onAcroReductionUpdate: PT.func.isRequired
            };
        }
    }]);

    return Element;
}(React.Component);

exports.default = Element;

},{"JudgeTablet/GeneralScale":54,"l10n":100}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = require("./Element");

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Elements = function (_React$Component) {
    _inherits(Elements, _React$Component);

    function Elements() {
        _classCallCheck(this, Elements);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Elements).apply(this, arguments));
    }

    _createClass(Elements, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                this.props.reductions.map(function (reduction, acro_idx) {
                    return React.createElement(_Element2.default, {
                        key: acro_idx,
                        readOnly: _this2.props.readOnly,
                        reduction: reduction,
                        acroIdx: acro_idx,
                        onAcroReductionUpdate: _this2.props.onAcroReductionUpdate
                    });
                })
            );
        }
    }]);

    return Elements;
}(React.Component);

exports.default = Elements;

},{"./Element":27}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _IntegerInput = require("tablet_ui/IntegerInput");

var _IntegerInput2 = _interopRequireDefault(_IntegerInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onScoreUpdate("mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mistakes" },
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.acro_judge.fall_down")
                ),
                React.createElement(_IntegerInput2.default, {
                    readOnly: this.props.readOnly,
                    value: this.props.mistakes,
                    onChange: this.handleChange
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                mistakes: PT.number.isRequired,
                onScoreUpdate: PT.func.isRequired
            };
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":100,"tablet_ui/IntegerInput":3}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Elements = require("./Elements");

var _Elements2 = _interopRequireDefault(_Elements);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

var _TotalScore = require("JudgeTablet/TotalScore");

var _TotalScore2 = _interopRequireDefault(_TotalScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleAcroReductionUpdate = function (acro_idx, value) {
            var reductions = _this.props.scoreData.reductions.map(function () {
                return null;
            });
            reductions[acro_idx] = value;
            _this.props.onScoreUpdate("reductions", reductions);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(_Elements2.default, {
                    readOnly: this.props.readOnly,
                    reductions: this.props.scoreData.reductions,
                    onAcroReductionUpdate: this.handleAcroReductionUpdate
                }),
                React.createElement(_Mistakes2.default, {
                    mistakes: this.props.scoreData.mistakes,
                    readOnly: this.props.readOnly,
                    onScoreUpdate: this.props.onScoreUpdate
                }),
                React.createElement(_TotalScore2.default, {
                    score: this.props.score
                })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Elements":28,"./Mistakes":29,"JudgeTablet/TotalScore":80}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralLayout = require("JudgeTablet/GeneralLayout");

var _GeneralLayout2 = _interopRequireDefault(_GeneralLayout);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcrobaticsLayout = function (_React$Component) {
    _inherits(AcrobaticsLayout, _React$Component);

    function AcrobaticsLayout() {
        _classCallCheck(this, AcrobaticsLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AcrobaticsLayout).apply(this, arguments));
    }

    _createClass(AcrobaticsLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralLayout2.default, _extends({
                layoutClass: _ScoringLayout2.default
            }, this.props));
        }
    }]);

    return AcrobaticsLayout;
}(React.Component);

exports.default = AcrobaticsLayout;

},{"./ScoringLayout":30,"JudgeTablet/GeneralLayout":53}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _makeClassName = require("common/makeClassName");

var _makeClassName2 = _interopRequireDefault(_makeClassName);

var _Slider = require("tablet_ui/Slider");

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmationButton = function (_React$Component) {
    _inherits(ConfirmationButton, _React$Component);

    function ConfirmationButton() {
        _classCallCheck(this, ConfirmationButton);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmationButton).apply(this, arguments));
    }

    _createClass(ConfirmationButton, [{
        key: "getClassName",
        value: function getClassName() {
            return (0, _makeClassName2.default)({
                "confirm": true,
                "hidden": !this.props.canConfirm
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.getClassName() },
                React.createElement(_Slider2.default, {
                    done: this.props.confirmed,
                    slideText: (0, _l10n2.default)("tablet.global.confirm_score"),
                    doneText: (0, _l10n2.default)("tablet.global.confirmed"),
                    onActivate: this.props.onConfirm
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                canConfirm: PT.bool.isRequired,
                confirmed: PT.bool.isRequired,
                onConfirm: PT.func.isRequired
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                canConfirm: true
            };
        }
    }]);

    return ConfirmationButton;
}(React.Component);

exports.default = ConfirmationButton;

},{"common/makeClassName":2,"l10n":100,"tablet_ui/Slider":7}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _IntegerInput = require("tablet_ui/IntegerInput");

var _IntegerInput2 = _interopRequireDefault(_IntegerInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSmallMistakesChange = function (value) {
            _this.props.onScoreUpdate("small_mistakes", value);
        }, _this.handleBigMistakesChange = function (value) {
            _this.props.onScoreUpdate("big_mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "mistakes full-width" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.small_mistakes")
                            ),
                            React.createElement(_IntegerInput2.default, {
                                value: this.props.scoreData.small_mistakes,
                                readOnly: this.props.readOnly,
                                onChange: this.handleSmallMistakesChange
                            })
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.big_mistakes")
                            ),
                            React.createElement(_IntegerInput2.default, {
                                value: this.props.scoreData.big_mistakes,
                                readOnly: this.props.readOnly,
                                onChange: this.handleBigMistakesChange
                            })
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                scoreData: PT.shape({
                    small_mistakes: PT.number.isRequired,
                    big_mistakes: PT.number.isRequired
                }).isRequired,
                onScoreUpdate: PT.func.isRequired
            };
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":100,"tablet_ui/IntegerInput":3}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScorePart = function (_React$Component) {
    _inherits(ScorePart, _React$Component);

    function ScorePart() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScorePart)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onScoreUpdate(_this.props.code, value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScorePart, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var header = _props.header;
            var value = _props.value;
            var scale = _props.scale;
            var onScoreUpdate = _props.onScoreUpdate;

            var other_props = _objectWithoutProperties(_props, ["header", "value", "scale", "onScoreUpdate"]);

            return React.createElement(_GeneralScale2.default, _extends({
                header: header,
                readOnly: this.props.readOnly,
                scale: scale,
                value: value,
                onChange: this.handleChange
            }, other_props));
        }
    }]);

    return ScorePart;
}(React.Component);

exports.default = ScorePart;

},{"JudgeTablet/GeneralScale":54}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

var _TotalScore = require("JudgeTablet/TotalScore");

var _TotalScore2 = _interopRequireDefault(_TotalScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                readOnly: this.props.readOnly,
                scale: scale,
                value: this.props.scoreData[code],
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("fw_woman", "reduction"),
                this.renderPart("fw_man", "reduction"),
                this.renderPart("dance_figs", "point5", { min: 0, max: 12.5 }),
                this.renderPart("composition", "point5", { min: 0, max: 10 }),
                React.createElement(_Mistakes2.default, {
                    readOnly: this.props.readOnly,
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate
                }),
                React.createElement(_TotalScore2.default, {
                    score: this.props.score
                })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":33,"./ScorePart":34,"JudgeTablet/TotalScore":80,"l10n":100}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralLayout = require("JudgeTablet/GeneralLayout");

var _GeneralLayout2 = _interopRequireDefault(_GeneralLayout);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DancingLayout = function (_React$Component) {
    _inherits(DancingLayout, _React$Component);

    function DancingLayout() {
        _classCallCheck(this, DancingLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DancingLayout).apply(this, arguments));
    }

    _createClass(DancingLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralLayout2.default, _extends({
                layoutClass: _ScoringLayout2.default
            }, this.props));
        }
    }]);

    return DancingLayout;
}(React.Component);

exports.default = DancingLayout;

},{"./ScoringLayout":35,"JudgeTablet/GeneralLayout":53}],37:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33,"l10n":100,"tablet_ui/IntegerInput":3}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScorePart = function (_React$Component) {
    _inherits(ScorePart, _React$Component);

    function ScorePart() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScorePart)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onScoreUpdate(_this.props.code, value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScorePart, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var header = _props.header;
            var value = _props.value;
            var scale = _props.scale;
            var onScoreUpdate = _props.onScoreUpdate;

            var other_props = _objectWithoutProperties(_props, ["header", "value", "scale", "onScoreUpdate"]);

            return React.createElement(_GeneralScale2.default, _extends({
                readOnly: this.props.readOnly,
                header: header,
                scale: scale,
                value: value,
                onChange: this.handleChange
            }, other_props));
        }
    }]);

    return ScorePart;
}(React.Component);

exports.default = ScorePart;

},{"JudgeTablet/GeneralScale":54}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

var _TotalScore = require("JudgeTablet/TotalScore");

var _TotalScore2 = _interopRequireDefault(_TotalScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                readOnly: this.props.readOnly,
                scale: scale,
                value: this.props.scoreData[code],
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("fw_woman", "reduction"),
                this.renderPart("fw_man", "reduction"),
                this.renderPart("dance_figs", "integer", { min: 0, max: 25 }),
                this.renderPart("composition", "integer", { min: 0, max: 20 }),
                React.createElement(_Mistakes2.default, {
                    readOnly: this.props.readOnly,
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate
                }),
                React.createElement(_TotalScore2.default, {
                    score: this.props.score
                })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":37,"./ScorePart":38,"JudgeTablet/TotalScore":80,"l10n":100}],40:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"./ScoringLayout":39,"JudgeTablet/GeneralLayout":53,"dup":36}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _onTouchOrClick = require("tablet_ui/onTouchOrClick");

var _onTouchOrClick2 = _interopRequireDefault(_onTouchOrClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onClick = function () {
            _this.props.onClick(_this.props.mkey);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Button, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                _extends({
                    className: "btn" + (this.props.active ? " active" : "")
                }, (0, _onTouchOrClick2.default)(this.onClick)),
                this.props.label
            );
        }
    }]);

    return Button;
}(React.Component);

exports.default = Button;

},{"tablet_ui/onTouchOrClick":9}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterItem = function (_React$Component) {
    _inherits(FooterItem, _React$Component);

    function FooterItem() {
        _classCallCheck(this, FooterItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FooterItem).apply(this, arguments));
    }

    _createClass(FooterItem, [{
        key: "render",
        value: function render() {
            return null;
        }
    }]);

    return FooterItem;
}(React.Component);

exports.default = FooterItem;

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Footer;

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer(props) {
    return React.createElement(
        "footer",
        null,
        React.Children.map(props.children, function (btn) {
            return React.createElement(_Button2.default, _extends({
                key: btn.props.mkey,
                active: props.value === btn.props.mkey,
                onClick: props.onChange
            }, btn.props));
        })
    );
}

},{"./Button":41}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _IntegerInput = require("tablet_ui/IntegerInput");

var _IntegerInput2 = _interopRequireDefault(_IntegerInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSmallMistakesChange = function (value) {
            _this.props.onScoreUpdate("small_mistakes", value);
        }, _this.handleBigMistakesChange = function (value) {
            _this.props.onScoreUpdate("big_mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "mistakes full-width" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.form_small_mistakes")
                            ),
                            React.createElement(_IntegerInput2.default, {
                                readOnly: this.props.readOnly,
                                value: this.props.scoreData.small_mistakes,
                                onChange: this.handleSmallMistakesChange
                            })
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.form_big_mistakes")
                            ),
                            React.createElement(_IntegerInput2.default, {
                                readOnly: this.props.readOnly,
                                value: this.props.scoreData.big_mistakes,
                                onChange: this.handleBigMistakesChange
                            })
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                scoreData: PT.shape({
                    small_mistakes: PT.number.isRequired,
                    big_mistakes: PT.number.isRequired
                }).isRequired,
                onScoreUpdate: PT.func.isRequired
            };
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":100,"tablet_ui/IntegerInput":3}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScorePart = function (_React$Component) {
    _inherits(ScorePart, _React$Component);

    function ScorePart() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScorePart)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (value) {
            _this.props.onScoreUpdate(_this.props.code, value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScorePart, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var header = _props.header;
            var value = _props.value;
            var scale = _props.scale;
            var onScoreUpdate = _props.onScoreUpdate;

            var other_props = _objectWithoutProperties(_props, ["header", "value", "scale", "onScoreUpdate"]);

            return React.createElement(_GeneralScale2.default, _extends({
                header: header,
                value: value,
                scale: scale,
                onChange: this.onChange
            }, other_props));
        }
    }]);

    return ScorePart;
}(React.Component);

exports.default = ScorePart;

},{"JudgeTablet/GeneralScale":54}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

var _TotalScore = require("JudgeTablet/TotalScore");

var _TotalScore2 = _interopRequireDefault(_TotalScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                readOnly: this.props.readOnly,
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                value: this.props.scoreData[code],
                scale: scale,
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("acrobatics", "point5", { min: 0, max: 10 }),
                this.renderPart("dance_tech", "point5", { min: 0, max: 10 }),
                this.renderPart("dance_figs", "point5", { min: 0, max: 10 }),
                this.renderPart("impression", "point5", { min: 0, max: 10 }),
                React.createElement(_Mistakes2.default, {
                    readOnly: this.props.readOnly,
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate
                }),
                React.createElement(_TotalScore2.default, {
                    readOnly: this.props.readOnly,
                    score: this.props.score
                })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":44,"./ScorePart":45,"JudgeTablet/TotalScore":80,"l10n":100}],47:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"./ScoringLayout":46,"JudgeTablet/GeneralLayout":53,"dup":36}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _IntegerInput = require("tablet_ui/IntegerInput");

var _IntegerInput2 = _interopRequireDefault(_IntegerInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onScoreUpdate("mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mistakes" },
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.dance_judge.form_mistakes")
                ),
                React.createElement(_IntegerInput2.default, {
                    readOnly: this.props.readOnly,
                    value: this.props.scoreData.mistakes,
                    onChange: this.handleChange
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                scoreData: PT.shape({
                    mistakes: PT.number.isRequired
                }).isRequired,
                onScoreUpdate: PT.func.isRequired
            };
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":100,"tablet_ui/IntegerInput":3}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScorePart = function (_React$Component) {
    _inherits(ScorePart, _React$Component);

    function ScorePart() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScorePart)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onScoreUpdate(_this.props.code, value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScorePart, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var header = _props.header;
            var value = _props.value;
            var scale = _props.scale;
            var onScoreUpdate = _props.onScoreUpdate;

            var other_props = _objectWithoutProperties(_props, ["header", "value", "scale", "onScoreUpdate"]); // eslint-disable-line no-unused-vars


            return React.createElement(_GeneralScale2.default, _extends({
                header: header,
                scale: scale,
                value: value,
                onChange: this.handleChange
            }, other_props));
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                code: PT.string.isRequired,
                header: PT.string.isRequired,
                scale: PT.string.isRequired,
                value: PT.string.isRequired,
                onScoreUpdate: PT.func.isRequired
            };
        }
    }]);

    return ScorePart;
}(React.Component);

exports.default = ScorePart;

},{"JudgeTablet/GeneralScale":54}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

var _TotalScore = require("JudgeTablet/TotalScore");

var _TotalScore2 = _interopRequireDefault(_TotalScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                readOnly: this.props.readOnly,
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                value: this.props.scoreData[code],
                scale: scale,
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("dance_tech", "point5", { min: 0, max: 10 }),
                this.renderPart("dance_figs", "point5", { min: 0, max: 10 }),
                this.renderPart("impression", "point5", { min: 0, max: 10 }),
                React.createElement(_Mistakes2.default, {
                    readOnly: this.props.readOnly,
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate
                }),
                React.createElement(_TotalScore2.default, {
                    score: this.props.score
                })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":48,"./ScorePart":49,"JudgeTablet/TotalScore":80,"l10n":100}],51:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"./ScoringLayout":50,"JudgeTablet/GeneralLayout":53,"dup":36}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _ConfirmationButton = require("JudgeTablet/ConfirmationButton");

var _ConfirmationButton2 = _interopRequireDefault(_ConfirmationButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Participant = function (_CacheMixin) {
    _inherits(Participant, _CacheMixin);

    function Participant() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Participant);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Participant)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onConfirm = function () {
            _this.props.onScoreConfirm(_this.score.id);
        }, _this.onScoreUpdate = function (key, value) {
            if (_this.score.confirmed) {
                return;
            }
            var score_data = {};
            score_data[key] = value;
            _this.props.onScoreUpdate(_this.score.id, score_data);
        }, _this.onAcroReductionUpdate = function (acro_idx, value) {
            if (_this.score.confirmed) {
                return;
            }
            var reductions = _this.score.data.raw_data.reductions.map(function () {
                return null;
            });
            reductions[acro_idx] = value;
            _this.onScoreUpdate("reductions", reductions);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Participant, [{
        key: "canConfirm",
        value: function canConfirm() {
            var score_data = this.score.data.raw_data;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(score_data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var value = score_data[key];
                    if (Array.isArray(value)) {
                        if (value.filter(function (a) {
                            return a === null;
                        }).length !== 0) {
                            return false;
                        }
                    } else {
                        if (value === null) {
                            return false;
                        }
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
        key: "renderScoringLayout",
        value: function renderScoringLayout() {
            var score_data = this.score.data.raw_data;
            var ScoringComponent = this.props.layoutClass;
            return React.createElement(
                "div",
                null,
                React.createElement(ScoringComponent, {
                    readOnly: this.score.confirmed,
                    score: this.score,
                    scoreData: score_data,
                    onScoreUpdate: this.onScoreUpdate
                }),
                React.createElement(_ConfirmationButton2.default, {
                    confirmed: this.score.confirmed,
                    canConfirm: this.canConfirm(),
                    onConfirm: this.onConfirm
                })
            );
        }
    }, {
        key: "renderNotPerformingMessage",
        value: function renderNotPerformingMessage() {
            return React.createElement(
                "div",
                { className: "not-performing" },
                (0, _l10n2.default)("tablet.global.not_performing")
            );
        }
    }, {
        key: "render",
        value: function render() {
            var header = (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, this.props.run.participant.name, this.props.run.participant.sportsmen.length);
            return React.createElement(
                "div",
                { className: "layout-participant" },
                React.createElement(
                    "h2",
                    null,
                    header
                ),
                this.props.run.performed ? this.renderScoringLayout() : this.renderNotPerformingMessage()
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this2 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this2.props.run.scores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var score = _step2.value;

                        if (score.discipline_judge_id === _this2.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return Participant;
}((0, _CacheMixin3.default)(React.Component));

exports.default = Participant;

},{"JudgeTablet/ConfirmationButton":32,"common/CacheMixin":96,"l10n":100}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Header = require("JudgeTablet/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Participant = require("./Participant");

var _Participant2 = _interopRequireDefault(_Participant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralLayout = function (_CacheMixin) {
    _inherits(GeneralLayout, _CacheMixin);

    function GeneralLayout(props) {
        _classCallCheck(this, GeneralLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralLayout).call(this, props));

        _this.onPrevHeatClick = function () {
            _this.updateHeat(_this.state.heat - 1);
        };

        _this.onNextHeatClick = function () {
            _this.updateHeat(_this.state.heat + 1);
        };

        _this.state = {
            heat: _this.first_non_confirmed_heat
        };
        return _this;
    }

    _createClass(GeneralLayout, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.tour.id !== this.props.tour.id) {
                var prev_props = this.props;
                this.props = next_props;
                this.resetCache();
                this.setState({
                    heat: this.first_non_confirmed_heat
                });
                this.props = prev_props;
            }
        }
    }, {
        key: "updateHeat",
        value: function updateHeat(value) {
            this.setState({
                heat: value
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "rosfarr-JudgeTablet GeneralLayout" },
                React.createElement(_Header2.default, {
                    judge: this.props.disciplineJudge.judge,
                    tour: this.props.tour,
                    heat: this.state.heat,
                    heatsCount: this.heats_count,
                    maxHeat: this.first_non_confirmed_heat,
                    onPrevHeatClick: this.onPrevHeatClick,
                    onNextHeatClick: this.onNextHeatClick
                }),
                React.createElement(
                    "div",
                    { className: "body" },
                    React.createElement(
                        _Grid2.default,
                        null,
                        this.props.tour.runs.filter(function (run) {
                            return run.heat === _this2.state.heat;
                        }).map(function (run) {
                            return React.createElement(_Participant2.default, {
                                key: run.id,
                                run: run,
                                layoutClass: _this2.props.layoutClass,
                                disciplineJudge: _this2.props.disciplineJudge,
                                onScoreUpdate: _this2.props.onScoreUpdate,
                                onScoreConfirm: _this2.props.onScoreConfirm
                            });
                        })
                    )
                )
            );
        }
    }, {
        key: "heats_count",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("heats_count", function () {
                var _Math;

                return (_Math = Math).max.apply(_Math, _toConsumableArray(_this3.props.tour.runs.map(function (run) {
                    return run.heat;
                })));
            });
        }
    }, {
        key: "runs",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("runs", function () {
                return _this4.props.tour.runs.filter(function (run) {
                    return run.heat === _this4.state.heat;
                });
            });
        }
    }, {
        key: "first_non_confirmed_heat",
        get: function get() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.tour.runs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var run = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = run.scores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var score = _step2.value;

                            if (score.discipline_judge_id === this.props.disciplineJudge.id && !score.confirmed && run.performed) {
                                return run.heat;
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

            return this.heats_count;
        }
    }]);

    return GeneralLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = GeneralLayout;

},{"./Participant":52,"JudgeTablet/Grid":55,"JudgeTablet/Header":69,"common/CacheMixin":96}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NumberSelectorInput = require("tablet_ui/NumberSelectorInput");

var _NumberSelectorInput2 = _interopRequireDefault(_NumberSelectorInput);

var _SelectorInput = require("tablet_ui/SelectorInput");

var _SelectorInput2 = _interopRequireDefault(_SelectorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralScale = function (_React$Component) {
    _inherits(GeneralScale, _React$Component);

    function GeneralScale() {
        _classCallCheck(this, GeneralScale);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralScale).apply(this, arguments));
    }

    _createClass(GeneralScale, [{
        key: "renderHeader",
        value: function renderHeader() {
            if (this.props.header === null) {
                return null;
            }
            return React.createElement(
                "h3",
                null,
                this.props.header
            );
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            var _props = this.props;
            var scale = _props.scale;

            var other_props = _objectWithoutProperties(_props, ["scale"]);

            switch (scale) {
                case "point5":
                    return React.createElement(_NumberSelectorInput2.default, _extends({
                        decimalSize: 1,
                        step: 0.5,
                        style: "two-lines"
                    }, other_props));
                case "integer":
                    return React.createElement(_NumberSelectorInput2.default, _extends({
                        style: "two-lines"
                    }, other_props));
                case "grid":
                    return React.createElement(_NumberSelectorInput2.default, _extends({
                        style: "grid"
                    }, other_props));
                case "reduction":
                    return React.createElement(_SelectorInput2.default, _extends({
                        choices: this.POSSIBLIE_REDUCTIONS,
                        style: "one-line"
                    }, this.props));
                default:
                    console.error("Unknowd scale type: " + scale);
                    return null;
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderHeader(),
                this.renderBody()
            );
        }
    }, {
        key: "POSSIBLIE_REDUCTIONS",
        get: function get() {
            return [[100, "-100%"], [75, "-75%"], [50, "-50%"], [25, "-25%"], [10, "-10%"], [5, "-5%"], [0, "-0%"]];
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                header: PT.string,
                scale: PT.oneOf(["point5", "integer", "grid", "reduction"]).isRequired
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                header: null
            };
        }
    }]);

    return GeneralScale;
}(React.Component);

exports.default = GeneralScale;

},{"tablet_ui/NumberSelectorInput":4,"tablet_ui/SelectorInput":6}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_CacheMixin) {
    _inherits(Grid, _CacheMixin);

    function Grid() {
        _classCallCheck(this, Grid);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
        key: "renderRow",
        value: function renderRow(elements, is_second_row) {
            var _this2 = this;

            if (elements === null) {
                return null;
            }
            var row_width = (elements.length * this.width_value).toFixed(5) + "%";
            var class_name = "grid-row";
            if (!this.asym_layout) {
                class_name += " align-center";
            } else if (is_second_row) {
                class_name += " align-right";
            } else {
                class_name += " align-left";
            }
            return React.createElement(
                "table",
                { className: class_name, style: { width: row_width } },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        elements.map(function (e, idx) {
                            return React.createElement(
                                "td",
                                {
                                    className: "item",
                                    key: idx,
                                    style: { width: _this2.width }
                                },
                                e
                            );
                        })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var class_name = this.two_rows ? "Grid two-rows" : "Grid";
            var first_row = this.two_rows ? this.children.filter(function (x, idx) {
                return idx % 2 === 0;
            }) : this.children;
            var second_row = this.two_rows ? this.children.filter(function (x, idx) {
                return idx % 2 === 1;
            }) : null;
            return React.createElement(
                "div",
                { className: class_name, style: { maxWidth: this.max_width } },
                this.renderRow(first_row, false),
                this.renderRow(second_row, true)
            );
        }
    }, {
        key: "children",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("children", function () {
                return Array.isArray(_this3.props.children) ? _this3.props.children : [_this3.props.children];
            });
        }
    }, {
        key: "two_rows",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("two_rows", function () {
                return _this4.children.length >= 4;
            });
        }
    }, {
        key: "width_value",
        get: function get() {
            var _this5 = this;

            return this.fetchFromCache("width_value", function () {
                return _this5.two_rows ? 99.9 / (_this5.children.length + 1) * 2 : 99.9 / _this5.children.length;
            });
        }
    }, {
        key: "width",
        get: function get() {
            var _this6 = this;

            return this.fetchFromCache("width", function () {
                return _this6.width_value.toFixed(5) + "%";
            });
        }
    }, {
        key: "max_width",
        get: function get() {
            var _this7 = this;

            return this.fetchFromCache("max_width", function () {
                var line_size = _this7.two_rows ? Math.floor((_this7.children.length + 1) / 2 + 0.001) : _this7.children.length;
                return 600 * line_size + "px";
            });
        }
    }, {
        key: "asym_layout",
        get: function get() {
            var _this8 = this;

            return this.fetchFromCache("asym_layout", function () {
                return _this8.two_rows && _this8.children.length % 2 === 0;
            });
        }
    }]);

    return Grid;
}((0, _CacheMixin3.default)(React.Component));

exports.default = Grid;

},{"common/CacheMixin":96}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _onTouchOrClick = require("tablet_ui/onTouchOrClick");

var _onTouchOrClick2 = _interopRequireDefault(_onTouchOrClick);

var _showConfirm = require("common/dialogs/showConfirm");

var _showConfirm2 = _interopRequireDefault(_showConfirm);

var _HostModules = require("HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // FIXME

var ActionsPage = function (_React$Component) {
    _inherits(ActionsPage, _React$Component);

    function ActionsPage() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ActionsPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ActionsPage)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.stopTour = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.stop_tour"), function () {
                if (_this.props.tour) {
                    (0, _HostModules.Api)("tour.stop", { tour_id: _this.props.tour.id }).onSuccess(function () {
                        return swal.close();
                    }).send();
                }
            });
        }, _this.finalizeTour = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.finalize_tour"), function () {
                if (_this.props.tour) {
                    (0, _HostModules.Api)("tour.finalize", { tour_id: _this.props.tour.id }).onSuccess(function () {
                        return swal.close();
                    }).send();
                }
            });
        }, _this.stopTourAndStartNext = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.stop_tour_and_start_next"), function () {
                if (_this.props.tour) {
                    (function () {
                        var tour_id = _this.props.tour.id;
                        (0, _HostModules.Api)("tour.stop", { tour_id: tour_id }).onSuccess(function () {
                            (0, _HostModules.Api)("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                                return swal.close();
                            }).send();
                        }).send();
                    })();
                }
            });
        }, _this.finalizeTourAndStartNext = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.finalize_tour_and_start_next"), function () {
                if (_this.props.tour) {
                    (function () {
                        var tour_id = _this.props.tour.id;
                        (0, _HostModules.Api)("tour.finalize", { tour_id: tour_id }).onSuccess(function () {
                            (0, _HostModules.Api)("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                                return swal.close();
                            }).send();
                        }).send();
                    })();
                }
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ActionsPage, [{
        key: "hasUnconfirmedScores",
        value: function hasUnconfirmedScores() {
            var runs = this.props.tour.runs;
            var latest_heat = runs[runs.length - 1].heat;
            if (latest_heat === runs[0].heat) {
                return false;
            }
            var latest_runs = runs.filter(function (r) {
                return r.heat === latest_heat;
            });
            var prev_runs = runs.filter(function (r) {
                return r.heat === latest_heat - 1;
            });
            var scores = new Map();
            var process_run = function process_run(run, type) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        var dj_id = score.discipline_judge_id;
                        if (!scores.has(dj_id)) {
                            scores.set(dj_id, {
                                latest: 0,
                                prev: 0
                            });
                        }
                        if (score.confirmed) {
                            ++scores.get(dj_id)[type];
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
            };
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = latest_runs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var run = _step2.value;

                    process_run(run, "latest");
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = prev_runs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var run = _step3.value;

                    process_run(run, "prev");
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

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = scores.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var stats = _step4.value;

                    if (stats.prev > 0 && stats.latest < latest_runs.length) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return false;
        }
    }, {
        key: "renderWarning",
        value: function renderWarning() {
            if (!this.hasUnconfirmedScores()) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "warning" },
                React.createElement(
                    "div",
                    { className: "content" },
                    (0, _l10n2.default)("tablet.alerts.has_unconfirmed_scores")
                )
            );
        }
    }, {
        key: "renderButton",
        value: function renderButton(code, callback) {
            return React.createElement(
                "button",
                _extends({
                    type: "button"
                }, (0, _onTouchOrClick2.default)(callback)),
                (0, _l10n2.default)("tablet.buttons." + code)
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body actions" },
                this.renderWarning(),
                this.renderButton("stop_tour", this.stopTour),
                this.renderButton("finalize_tour", this.finalizeTour),
                this.renderButton("stop_tour_and_start_next", this.stopTourAndStartNext),
                this.renderButton("finalize_tour_and_start_next", this.finalizeTourAndStartNext)
            );
        }
    }]);

    return ActionsPage;
}(React.Component);

exports.default = ActionsPage;

},{"HostModules":26,"common/dialogs/showConfirm":1,"l10n":100,"tablet_ui/onTouchOrClick":9}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActobaticOverrides = function (_React$Component) {
    _inherits(ActobaticOverrides, _React$Component);

    function ActobaticOverrides() {
        _classCallCheck(this, ActobaticOverrides);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ActobaticOverrides).apply(this, arguments));
    }

    _createClass(ActobaticOverrides, [{
        key: "getAcrobaticOverrides",
        value: function getAcrobaticOverrides() {
            return this.props.run.acrobatics.map(function (acro, idx) {
                return { idx: idx + 1, acrobatic: acro };
            }).filter(function (acro) {
                return acro.acrobatic.original_score !== acro.acrobatic.score;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var acrobatic_overrides = this.getAcrobaticOverrides();
            if (acrobatic_overrides.length === 0) {
                return null;
            }
            return React.createElement(
                "div",
                null,
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.head_judge.acrobatic_overrides")
                ),
                React.createElement(
                    "table",
                    { className: "full-width" },
                    React.createElement(
                        "tbody",
                        null,
                        acrobatic_overrides.map(function (acro) {
                            return React.createElement(
                                "tr",
                                { key: acro.idx },
                                React.createElement(
                                    "td",
                                    { className: "w-5" },
                                    acro.idx
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    acro.acrobatic.description
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 text-right" },
                                    acro.acrobatic.original_score.toFixed(1)
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-5 text-center" },
                                    "→"
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 text-left" },
                                    acro.acrobatic.score.toFixed(1)
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return ActobaticOverrides;
}(React.Component);

exports.default = ActobaticOverrides;

},{"l10n":100}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Item;
function Item(props) {
    var confirmed = props.score && props.score.confirmed;
    return React.createElement(
        "td",
        { className: confirmed ? "confirmed" : "" },
        props.score ? props.score.data.total_score.toFixed(2) : "—"
    );
}

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineJudgeScore = function (_CacheMixin) {
    _inherits(LineJudgeScore, _CacheMixin);

    function LineJudgeScore() {
        _classCallCheck(this, LineJudgeScore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LineJudgeScore).apply(this, arguments));
    }

    _createClass(LineJudgeScore, [{
        key: "renderNumbers",
        value: function renderNumbers() {
            var _this2 = this;

            return this.scores.map(function (score) {
                var dj = _this2.line_judges_index.get(score.discipline_judge_id);
                return React.createElement(
                    "td",
                    { key: score.id },
                    "" + dj.judge.number + (dj.role === "acro_judge" ? " (A)" : "")
                );
            });
        }
    }, {
        key: "renderScores",
        value: function renderScores() {
            var _this3 = this;

            return this.scores.map(function (score) {
                var dj = _this3.line_judges_index.get(score.discipline_judge_id);
                return React.createElement(_Item2.default, {
                    judge: dj.judge,
                    key: dj.id,
                    score: score
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.head_judge.dance_judge_scores")
                ),
                React.createElement(
                    "table",
                    { className: "line-judge-scores" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            { className: "numbers" },
                            this.renderNumbers()
                        ),
                        React.createElement(
                            "tr",
                            { className: "scores" },
                            this.renderScores()
                        )
                    )
                )
            );
        }
    }, {
        key: "line_judges",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("line_judges", function () {
                return _this4.props.disciplineJudges.filter(function (dj) {
                    return dj.role === "dance_judge" || dj.role === "acro_judge";
                });
            });
        }
    }, {
        key: "line_judges_index",
        get: function get() {
            var _this5 = this;

            return this.fetchFromCache("line_judges_index", function () {
                var result = new Map();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this5.line_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dj = _step.value;

                        result.set(dj.id, dj);
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

                return result;
            });
        }
    }, {
        key: "scores",
        get: function get() {
            var _this6 = this;

            return this.fetchFromCache("scores", function () {
                return _this6.props.run.scores.filter(function (score) {
                    return _this6.line_judges_index.has(score.discipline_judge_id);
                });
            });
        }
    }]);

    return LineJudgeScore;
}((0, _CacheMixin3.default)(React.Component));

exports.default = LineJudgeScore;

},{"./Item":58,"common/CacheMixin":96,"l10n":100}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _onTouchEndOrClick = require("tablet_ui/onTouchEndOrClick");

var _onTouchEndOrClick2 = _interopRequireDefault(_onTouchEndOrClick);

var _HostModules = require("HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotPerformedSwitch = function (_React$Component) {
    _inherits(NotPerformedSwitch, _React$Component);

    function NotPerformedSwitch() {
        _classCallCheck(this, NotPerformedSwitch);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotPerformedSwitch).apply(this, arguments));
    }

    _createClass(NotPerformedSwitch, [{
        key: "markNotPerformed",
        value: function markNotPerformed() {
            (0, _HostModules.Api)("run.mark_not_performed", { run_id: this.props.run.id }).send();
        }
    }, {
        key: "markPerformed",
        value: function markPerformed() {
            (0, _HostModules.Api)("run.mark_performed", { run_id: this.props.run.id }).send();
        }
    }, {
        key: "renderButton",
        value: function renderButton() {
            if (this.props.run.performed) {
                return React.createElement(
                    "button",
                    _extends({
                        type: "button",
                        className: "not-performed"
                    }, (0, _onTouchEndOrClick2.default)(this.markNotPerformed.bind(this))),
                    (0, _l10n2.default)("tablet.global.mark_not_performed")
                );
            } else {
                return React.createElement(
                    "button",
                    _extends({
                        type: "button",
                        className: "performed"
                    }, (0, _onTouchEndOrClick2.default)(this.markPerformed.bind(this))),
                    (0, _l10n2.default)("tablet.global.discard_not_performed")
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "not-performed-switch" },
                this.renderButton()
            );
        }
    }]);

    return NotPerformedSwitch;
}(React.Component);

exports.default = NotPerformedSwitch;

},{"HostModules":26,"l10n":100,"tablet_ui/onTouchEndOrClick":8}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _SelectorInput = require("tablet_ui/SelectorInput");

var _SelectorInput2 = _interopRequireDefault(_SelectorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PenaltyInput = function (_React$Component) {
    _inherits(PenaltyInput, _React$Component);

    function PenaltyInput() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, PenaltyInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PenaltyInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onScoreUpdate("penalty", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PenaltyInput, [{
        key: "render",
        value: function render() {
            var penalties = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.scoringSystemName) >= 0 ? [[0, (0, _l10n2.default)("tablet.head_judge.ok")], [-5, (0, _l10n2.default)("tablet.head_judge.form_yellow_card")], [-15, (0, _l10n2.default)("tablet.head_judge.form_red_card")]] : [[0, (0, _l10n2.default)("tablet.head_judge.ok")], [-3, (0, _l10n2.default)("tablet.head_judge.yellow_card")], [-30, (0, _l10n2.default)("tablet.head_judge.red_card")], [-100, (0, _l10n2.default)("tablet.head_judge.black_card")]];
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.head_judge.penalty_type")
                ),
                React.createElement(_SelectorInput2.default, {
                    choices: penalties,
                    value: this.props.score.data.raw_data.penalty,
                    onChange: this.handleChange
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    data: PT.shape({
                        raw_data: PT.shape({
                            penalty: PT.number.isRequired
                        }).isRequired
                    }).isRequired
                }).isRequired,
                scoringSystemName: PT.string.isRequired,
                onScoreUpdate: PT.func.isRequired
            };
        }
    }]);

    return PenaltyInput;
}(React.Component);

exports.default = PenaltyInput;

},{"l10n":100,"tablet_ui/SelectorInput":6}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = PreviousPenalties;

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreviousPenalties(props) {
    if (!props.run.inherited_data.penalties || props.run.inherited_data.penalties.length === 0) {
        return React.createElement("div", null);
    }
    return React.createElement(
        "div",
        null,
        React.createElement("div", { className: "spacer" }),
        React.createElement(
            "h3",
            null,
            (0, _l10n2.default)("tablet.head_judge.previous_run.inherited_data.penalties")
        ),
        React.createElement(
            "table",
            { className: "full-width" },
            React.createElement(
                "tbody",
                null,
                " ",
                props.run.inherited_data.penalties.map(function (d, idx) {
                    return React.createElement(
                        "tr",
                        { key: idx },
                        React.createElement(
                            "td",
                            { className: "w-10 text-center" },
                            React.createElement(
                                "strong",
                                null,
                                d.penalty
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            d.tour
                        )
                    );
                })
            )
        )
    );
}

},{"l10n":100}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
    }

    _createClass(Item, [{
        key: "getTimingData",
        value: function getTimingData() {
            if (!this.props.score) {
                return ["-", ""];
            }
            var tv_raw_value = this.props.score.data.raw_data.timing_violation;
            if (tv_raw_value === null) {
                return ["—", ""];
            } else if (tv_raw_value) {
                return ["X", " fail"];
            } else {
                return ["OK", " ok"];
            }
        }
    }, {
        key: "render",
        value: function render() {
            var timing_data = this.getTimingData();
            var jump_steps = this.props.score ? this.props.score.data.raw_data.jump_steps : 0;
            var confirmed = this.props.score && this.props.score.confirmed;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    { className: confirmed ? "confirmed" : "" },
                    this.props.judge.name
                ),
                React.createElement(
                    "table",
                    { className: "tech-judge-info" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { className: "title" },
                                (0, _l10n2.default)("tablet.tech_judge.jump_steps")
                            ),
                            React.createElement(
                                "td",
                                { className: "value" },
                                React.createElement(
                                    "div",
                                    { className: "inner" },
                                    jump_steps
                                )
                            ),
                            React.createElement(
                                "td",
                                { className: "title" },
                                (0, _l10n2.default)("tablet.tech_judge.timing")
                            ),
                            React.createElement(
                                "td",
                                { className: "value" },
                                React.createElement(
                                    "div",
                                    { className: "inner" + timing_data[1] },
                                    timing_data[0]
                                )
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                score: React.PropTypes.object.isRequired,
                judge: React.PropTypes.object.isRequired
            };
        }
    }]);

    return Item;
}(React.Component);

exports.default = Item;

},{"l10n":100}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TechJudgesScores = function (_CacheMixin) {
    _inherits(TechJudgesScores, _CacheMixin);

    function TechJudgesScores() {
        _classCallCheck(this, TechJudgesScores);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TechJudgesScores).apply(this, arguments));
    }

    _createClass(TechJudgesScores, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                this.scores.map(function (score) {
                    return React.createElement(_Item2.default, {
                        key: score.id,
                        score: score,
                        judge: _this2.tech_judges_index.get(score.discipline_judge_id).judge
                    });
                })
            );
        }
    }, {
        key: "tech_judges",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("tech_judges", function () {
                return _this3.props.disciplineJudges.filter(function (dj) {
                    return dj.role === "tech_judge";
                });
            });
        }
    }, {
        key: "tech_judges_index",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("tech_judges_index", function () {
                var result = new Map();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this4.tech_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dj = _step.value;

                        result.set(dj.id, dj);
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

                return result;
            });
        }
    }, {
        key: "scores",
        get: function get() {
            var _this5 = this;

            return this.fetchFromCache("scores", function () {
                return _this5.props.run.scores.filter(function (score) {
                    return _this5.tech_judges_index.has(score.discipline_judge_id);
                });
            });
        }
    }]);

    return TechJudgesScores;
}((0, _CacheMixin3.default)(React.Component));

exports.default = TechJudgesScores;

},{"./Item":63,"common/CacheMixin":96}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _PenaltyInput = require("./PenaltyInput");

var _PenaltyInput2 = _interopRequireDefault(_PenaltyInput);

var _TechJudgesScores = require("./TechJudgesScores");

var _TechJudgesScores2 = _interopRequireDefault(_TechJudgesScores);

var _LineJudgesScores = require("./LineJudgesScores");

var _LineJudgesScores2 = _interopRequireDefault(_LineJudgesScores);

var _AcrobaticOverrides = require("./AcrobaticOverrides");

var _AcrobaticOverrides2 = _interopRequireDefault(_AcrobaticOverrides);

var _PreviousPenalties = require("./PreviousPenalties");

var _PreviousPenalties2 = _interopRequireDefault(_PreviousPenalties);

var _NotPerformedSwitch = require("./NotPerformedSwitch");

var _NotPerformedSwitch2 = _interopRequireDefault(_NotPerformedSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_CacheMixin) {
    _inherits(ScoringLayout, _CacheMixin);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onScoreUpdate = function (key, value) {
            var score_data = {};
            score_data[key] = value;
            _this.props.onScoreUpdate(_this.score.id, score_data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            var header = (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, this.props.run.participant.name, this.props.run.participant.sportsmen.length);
            if (!this.props.run.performed) {
                return React.createElement(
                    "div",
                    { className: "layout-participant" },
                    React.createElement(
                        "h2",
                        null,
                        header
                    ),
                    React.createElement(_NotPerformedSwitch2.default, {
                        run: this.props.run
                    })
                );
            }
            return React.createElement(
                "div",
                { className: "layout-participant" },
                React.createElement(
                    "h2",
                    null,
                    header
                ),
                React.createElement(_PenaltyInput2.default, {
                    score: this.score,
                    onScoreUpdate: this.onScoreUpdate,
                    scoringSystemName: this.props.tour.scoring_system_name
                }),
                React.createElement(_TechJudgesScores2.default, {
                    run: this.props.run,
                    disciplineJudges: this.props.tour.discipline.discipline_judges
                }),
                React.createElement(_LineJudgesScores2.default, {
                    run: this.props.run,
                    disciplineJudges: this.props.tour.discipline.discipline_judges
                }),
                React.createElement(_AcrobaticOverrides2.default, {
                    run: this.props.run
                }),
                React.createElement(_PreviousPenalties2.default, {
                    run: this.props.run
                }),
                React.createElement(_NotPerformedSwitch2.default, {
                    run: this.props.run
                })
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this2 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this2.props.run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        if (score.discipline_judge_id === _this2.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return ScoringLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = ScoringLayout;

},{"./AcrobaticOverrides":57,"./LineJudgesScores":59,"./NotPerformedSwitch":60,"./PenaltyInput":61,"./PreviousPenalties":62,"./TechJudgesScores":64,"common/CacheMixin":96,"l10n":100}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsPage = function (_CacheMixin) {
    _inherits(HeatsPage, _CacheMixin);

    function HeatsPage() {
        _classCallCheck(this, HeatsPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HeatsPage).apply(this, arguments));
    }

    _createClass(HeatsPage, [{
        key: "renderScores",
        value: function renderScores() {
            var _this2 = this;

            return this.runs.map(function (run) {
                return React.createElement(_ScoringLayout2.default, {
                    key: run.id,
                    run: run,
                    tour: _this2.props.tour,
                    disciplineJudge: _this2.props.disciplineJudge,
                    onScoreUpdate: _this2.props.onScoreUpdate
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body heats" },
                React.createElement(
                    _Grid2.default,
                    null,
                    this.renderScores()
                )
            );
        }
    }, {
        key: "runs",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("runs", function () {
                return _this3.props.tour.runs.filter(function (run) {
                    return run.heat === _this3.props.heat;
                });
            });
        }
    }]);

    return HeatsPage;
}((0, _CacheMixin3.default)(React.Component));

exports.default = HeatsPage;

},{"./ScoringLayout":65,"JudgeTablet/Grid":55,"common/CacheMixin":96}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HostModules = require("HostModules");

var _ResultsTable = require("ResultsTable2");

var _ResultsTable2 = _interopRequireDefault(_ResultsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsPage = function (_React$Component) {
    _inherits(ResultsPage, _React$Component);

    function ResultsPage() {
        _classCallCheck(this, ResultsPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsPage).apply(this, arguments));
    }

    _createClass(ResultsPage, [{
        key: "render",


        // Initialization

        value: function render() {
            return React.createElement(
                "div",
                { className: "body results" },
                React.createElement(_HostModules.TourResults, {
                    renderer: _ResultsTable2.default,
                    tourId: this.props.tour.id
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                tour: PT.shape({
                    id: PT.number.isRequired
                }).isRequired
            };
        }
    }]);

    return ResultsPage;
}(React.Component);

exports.default = ResultsPage;

},{"HostModules":26,"ResultsTable2":86}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Header = require("JudgeTablet/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("JudgeTablet/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _FooterItem = require("JudgeTablet/Footer/FooterItem");

var _FooterItem2 = _interopRequireDefault(_FooterItem);

var _HeatsPage = require("./HeatsPage");

var _HeatsPage2 = _interopRequireDefault(_HeatsPage);

var _ResultsPage = require("./ResultsPage");

var _ResultsPage2 = _interopRequireDefault(_ResultsPage);

var _ActionsPage = require("./ActionsPage");

var _ActionsPage2 = _interopRequireDefault(_ActionsPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadJudgeLayout = function (_React$Component) {
    _inherits(HeadJudgeLayout, _React$Component);

    function HeadJudgeLayout(props) {
        _classCallCheck(this, HeadJudgeLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HeadJudgeLayout).call(this, props));

        _this.onPrevHeatClick = function () {
            _this.updateHeat(_this.state.heat - 1);
        };

        _this.onNextHeatClick = function () {
            _this.updateHeat(_this.state.heat + 1);
        };

        _this.onPageChange = function (page) {
            _this.setState({ page: page });
        };

        _this.state = {
            heat: 1,
            page: "heats"
        };
        return _this;
    }

    _createClass(HeadJudgeLayout, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.tour.id !== this.props.tour.id) {
                this.setState({
                    heat: 1,
                    page: "heats"
                });
            }
        }
    }, {
        key: "updateHeat",
        value: function updateHeat(value) {
            this.setState({
                heat: value
            });
        }
    }, {
        key: "renderHeats",
        value: function renderHeats() {
            return React.createElement(_HeatsPage2.default, {
                disciplineJudge: this.props.disciplineJudge,
                heat: this.state.heat,
                tour: this.props.tour,
                onScoreUpdate: this.props.onScoreUpdate
            });
        }
    }, {
        key: "renderResults",
        value: function renderResults() {
            return React.createElement(_ResultsPage2.default, {
                tour: this.props.tour
            });
        }
    }, {
        key: "renderActions",
        value: function renderActions() {
            return React.createElement(_ActionsPage2.default, {
                tour: this.props.tour
            });
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var heats_count = this.heats_count;
            return React.createElement(_Header2.default, {
                judge: this.props.disciplineJudge.judge,
                tour: this.props.tour,
                heat: this.state.heat,
                heatsCount: heats_count,
                maxHeat: heats_count,
                onPrevHeatClick: this.onPrevHeatClick,
                onNextHeatClick: this.onNextHeatClick
            });
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            switch (this.state.page) {
                case "heats":
                    return this.renderHeats();
                case "results":
                    return this.renderResults();
                case "actions":
                    return this.renderActions();
            }
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            return React.createElement(
                _Footer2.default,
                { value: this.state.page, onChange: this.onPageChange },
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.heats"),
                    mkey: "heats"
                }),
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.results"),
                    mkey: "results"
                }),
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.actions"),
                    mkey: "actions"
                })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "rosfarr-JudgeTablet HeadJudgeLayout" },
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            );
        }
    }, {
        key: "heats_count",
        get: function get() {
            var _Math;

            return (_Math = Math).max.apply(_Math, _toConsumableArray(this.props.tour.runs.map(function (run) {
                return run.heat;
            })));
        }
    }]);

    return HeadJudgeLayout;
}(React.Component);

exports.default = HeadJudgeLayout;

},{"./ActionsPage":56,"./HeatsPage":66,"./ResultsPage":67,"JudgeTablet/Footer":43,"JudgeTablet/Footer/FooterItem":42,"JudgeTablet/Header":69,"l10n":100}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _onTouchEndOrClick = require("tablet_ui/onTouchEndOrClick");

var _onTouchEndOrClick2 = _interopRequireDefault(_onTouchEndOrClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "renderPrevHeatButton",
        value: function renderPrevHeatButton() {
            if (this.props.heat <= 1) {
                return React.createElement("div", { className: "button-container" });
            }
            return React.createElement(
                "div",
                { className: "button-container left" },
                React.createElement(
                    "button",
                    (0, _onTouchEndOrClick2.default)(this.props.onPrevHeatClick),
                    (0, _l10n2.default)("tablet.buttons.prev_heat")
                )
            );
        }
    }, {
        key: "renderNextHeatButton",
        value: function renderNextHeatButton() {
            if (this.props.heat >= this.props.maxHeat) {
                return React.createElement("div", { className: "button-container" });
            }
            return React.createElement(
                "div",
                { className: "button-container right" },
                React.createElement(
                    "button",
                    (0, _onTouchEndOrClick2.default)(this.props.onNextHeatClick),
                    (0, _l10n2.default)("tablet.buttons.next_heat")
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var judge_number = this.props.judge.role_description || (0, _l10n2.default)("global.phrases.judge_n", this.props.judge.number);
            return React.createElement(
                "header",
                null,
                this.renderPrevHeatButton(),
                React.createElement(
                    "div",
                    { className: "data" },
                    React.createElement(
                        "div",
                        { className: "box" },
                        React.createElement(
                            "h1",
                            null,
                            judge_number
                        ),
                        React.createElement(
                            "h2",
                            null,
                            this.props.judge.name
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "box" },
                        React.createElement(
                            "h1",
                            null,
                            this.props.tour.discipline.name
                        ),
                        React.createElement(
                            "h2",
                            null,
                            this.props.tour.name,
                            "       ",
                            (0, _l10n2.default)("tablet.global.heat_number", this.props.heat, this.props.heatsCount)
                        )
                    )
                ),
                this.renderNextHeatButton()
            );
        }
    }]);

    return Header;
}(React.Component);

exports.default = Header;

},{"l10n":100,"tablet_ui/onTouchEndOrClick":8}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (value) {
            _this.props.onScoreUpdate("points", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralScale2.default, {
                value: this.props.scoreData.points,
                scale: "grid",
                onChange: this.onChange,
                min: 1,
                max: 40,
                rowSize: 10
            });
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"JudgeTablet/GeneralScale":54,"l10n":100}],71:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"./ScoringLayout":70,"JudgeTablet/GeneralLayout":53,"dup":36}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OverrideInput = require("./OverrideInput");

var _OverrideInput2 = _interopRequireDefault(_OverrideInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_React$Component) {
    _inherits(Element, _React$Component);

    function Element() {
        _classCallCheck(this, Element);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Element).apply(this, arguments));
    }

    _createClass(Element, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "tech-judge-acro" },
                React.createElement(
                    "div",
                    { className: "controls pull-right" },
                    React.createElement(
                        "div",
                        { className: "setter" },
                        React.createElement(_OverrideInput2.default, {
                            readOnly: this.props.readOnly,
                            onChange: this.props.onAcroOverride,
                            originalValue: this.props.acro.original_score,
                            value: this.props.acro.score
                        })
                    )
                ),
                React.createElement(
                    "h3",
                    null,
                    this.props.acro.description
                ),
                React.createElement("div", { className: "clearfix" })
            );
        }
    }]);

    return Element;
}(React.Component);

exports.default = Element;

},{"./OverrideInput":73}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _onTouchOrClick = require("tablet_ui/onTouchOrClick");

var _onTouchOrClick2 = _interopRequireDefault(_onTouchOrClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OverrideInput = function (_React$Component) {
    _inherits(OverrideInput, _React$Component);

    function OverrideInput() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, OverrideInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(OverrideInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleMinus = function () {
            if (_this.props.readOnly) {
                return;
            }
            _this.props.onChange(Math.max(_this.props.value - 0.5, 0));
        }, _this.handlePlus = function () {
            if (_this.props.readOnly) {
                return;
            }
            _this.props.onChange(Math.min(_this.props.value + 0.5, _this.props.originalValue));
        }, _this.handleZero = function () {
            if (_this.props.readOnly) {
                return;
            }
            _this.props.onChange(0);
        }, _this.handleRestore = function () {
            if (_this.props.readOnly) {
                return;
            }
            _this.props.onChange(_this.props.originalValue);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OverrideInput, [{
        key: "render",
        value: function render() {
            var value_changed = Math.abs(this.props.value - this.props.originalValue);
            return React.createElement(
                "div",
                { className: "tablet-acro-override-input" },
                React.createElement(
                    "div",
                    { className: "buttons" },
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn-zero",
                            disabled: this.props.value < 0.05 || this.props.readOnly
                        }, (0, _onTouchOrClick2.default)(this.handleZero)),
                        "↓0"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn-restore",
                            disabled: value_changed < 0.05 || this.props.readOnly
                        }, (0, _onTouchOrClick2.default)(this.handleRestore)),
                        "↑"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn-minus",
                            disabled: this.props.value < 0.05 || this.props.readOnly
                        }, (0, _onTouchOrClick2.default)(this.handleMinus)),
                        "−"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn-plus",
                            disabled: this.props.originalValue < this.props.value + 0.05 || this.props.readOnly
                        }, (0, _onTouchOrClick2.default)(this.handlePlus)),
                        "+"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    value_changed ? this.props.originalValue.toFixed(1) + " → " + this.props.value.toFixed(1) : this.props.value.toFixed(1)
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                originalValue: PT.number.isRequired,
                value: PT.number.isRequired,
                onChange: PT.func.isRequired
            };
        }
    }]);

    return OverrideInput;
}(React.Component);

exports.default = OverrideInput;


OverrideInput.displayName = "rules_sets_rosfarr_JudgeTablet_TechJudgeLayout_AcroPage_ScoringLayout_OverrideInput";

},{"tablet_ui/onTouchOrClick":9}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _HostModules = require("HostModules");

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _ConfirmationButton = require("JudgeTablet/ConfirmationButton");

var _ConfirmationButton2 = _interopRequireDefault(_ConfirmationButton);

var _Element = require("./Element");

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_CacheMixin) {
    _inherits(ScoringLayout, _CacheMixin);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onConfirm = function () {
            _this.props.onScoreConfirm(_this.score.id);
        }, _this.onAcroOverride = function (acro_idx, value) {
            if (_this.score.confirmed) {
                return;
            }
            (0, _HostModules.Api)("acrobatic_override.set", {
                run_id: _this.props.run.id,
                acrobatic_idx: acro_idx,
                score: value
            }).send();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "genOnAcroOverride",
        value: function genOnAcroOverride(acro_idx) {
            var _this2 = this;

            return function (new_value) {
                return _this2.onAcroOverride(acro_idx, new_value);
            };
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            var _this3 = this;

            return this.props.run.acrobatics.map(function (acro, idx) {
                return React.createElement(_Element2.default, {
                    readOnly: _this3.score.confirmed,
                    key: idx,
                    acro: acro,
                    onAcroOverride: _this3.genOnAcroOverride(idx)
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var header = (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, this.props.run.participant.name, this.props.run.participant.sportsmen.length);
            return React.createElement(
                "div",
                { className: "layout-participant" },
                React.createElement(
                    "h2",
                    null,
                    header
                ),
                this.renderContent(),
                React.createElement(_ConfirmationButton2.default, {
                    confirmed: this.score.confirmed,
                    onConfirm: this.onConfirm
                })
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this4.props.run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        if (score.discipline_judge_id === _this4.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return ScoringLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = ScoringLayout;

},{"./Element":72,"HostModules":26,"JudgeTablet/ConfirmationButton":32,"common/CacheMixin":96,"l10n":100}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcroPage = function (_React$Component) {
    _inherits(AcroPage, _React$Component);

    function AcroPage() {
        _classCallCheck(this, AcroPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AcroPage).apply(this, arguments));
    }

    _createClass(AcroPage, [{
        key: "renderScores",
        value: function renderScores() {
            var _this2 = this;

            return this.props.runs.map(function (run) {
                return React.createElement(_ScoringLayout2.default, {
                    key: run.id,
                    run: run,
                    tour: _this2.props.tour,
                    disciplineJudge: _this2.props.disciplineJudge,
                    onAcroOverride: _this2.props.onAcroOverride,
                    onScoreConfirm: _this2.props.onScoreConfirm
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body" },
                React.createElement(
                    _Grid2.default,
                    null,
                    this.renderScores()
                )
            );
        }
    }]);

    return AcroPage;
}(React.Component);

exports.default = AcroPage;

},{"./ScoringLayout":74,"JudgeTablet/Grid":55}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _SelectorInput = require("tablet_ui/SelectorInput");

var _SelectorInput2 = _interopRequireDefault(_SelectorInput);

var _IntegerInput = require("tablet_ui/IntegerInput");

var _IntegerInput2 = _interopRequireDefault(_IntegerInput);

var _ConfirmationButton = require("JudgeTablet/ConfirmationButton");

var _ConfirmationButton2 = _interopRequireDefault(_ConfirmationButton);

var _StopWatch = require("./StopWatch");

var _StopWatch2 = _interopRequireDefault(_StopWatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_CacheMixin) {
    _inherits(ScoringLayout, _CacheMixin);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleConfirmation = function () {
            _this.props.onScoreConfirm(_this.score.id);
        }, _this.handleScoreChange = function (part, value) {
            var data = {};
            data[part] = value;
            _this.props.onScoreUpdate(_this.score.id, data);
        }, _this.handleJumpStepsChange = function (value) {
            return _this.handleScoreChange("jump_steps", value);
        }, _this.handleTimingViolationChange = function (value) {
            return _this.handleScoreChange("timing_violation", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "genOnScoreUpdate",
        value: function genOnScoreUpdate(score_part) {
            var _this2 = this;

            return function (new_value) {
                return _this2.onScoreUpdate(score_part, new_value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            var score = this.score.data;
            var header = (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, this.props.run.participant.name, this.props.run.participant.sportsmen.length);
            return React.createElement(
                "div",
                { className: "layout-participant" },
                React.createElement(
                    "h2",
                    null,
                    header
                ),
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.tech_judge.jump_steps")
                ),
                React.createElement(_IntegerInput2.default, {
                    sendDeltas: true,
                    readOnly: this.score.confirmed,
                    value: score.raw_data.jump_steps,
                    onChange: this.handleJumpStepsChange
                }),
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.tech_judge.timing")
                ),
                React.createElement(_StopWatch2.default, {
                    scoreId: this.score.id
                }),
                React.createElement(_SelectorInput2.default, {
                    choices: [[true, "X"], [null, "-"], [false, "OK"]],
                    readOnly: this.score.confirmed,
                    value: score.raw_data.timing_violation,
                    onChange: this.handleTimingViolationChange
                }),
                React.createElement(_ConfirmationButton2.default, {
                    confirmed: this.score.confirmed,
                    onConfirm: this.handleConfirmation
                })
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this3.props.run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        if (score.discipline_judge_id === _this3.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return ScoringLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = ScoringLayout;

},{"./StopWatch":77,"JudgeTablet/ConfirmationButton":32,"common/CacheMixin":96,"l10n":100,"tablet_ui/IntegerInput":3,"tablet_ui/SelectorInput":6}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _makeClassName = require("common/makeClassName");

var _makeClassName2 = _interopRequireDefault(_makeClassName);

var _onTouchOrClick = require("tablet_ui/onTouchOrClick");

var _onTouchOrClick2 = _interopRequireDefault(_onTouchOrClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stopwatches = {};

var StopWatch = function (_React$Component) {
    _inherits(StopWatch, _React$Component);

    _createClass(StopWatch, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                scoreId: PT.number.isRequired
            };
        }
    }]);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StopWatch).call(this, props));

        _this.handleToggle = function () {
            if (_this.state.active) {
                _this.stop();
            } else {
                _this.start();
            }
        };

        _this.handleReset = function () {
            clearInterval(_this.state.interval);
            _this.setState({
                active: false,
                value: 0
            });
        };

        _this.handleTick = function () {
            var new_value = _this.value();
            if (new_value !== _this.state.value) {
                _this.setState({
                    value: _this.value()
                });
            }
        };

        var state = stopwatches[_this.props.scoreId] || {
            active: false,
            value: 0,
            str_value: "0:00",
            interval: null
        };
        if (state.active) {
            state.interval = setInterval(_this.handleTick, 10);
        }
        _this.state = state;
        return _this;
    }

    _createClass(StopWatch, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.state.interval);
            stopwatches[this.props.scoreId] = this.state;
        }
    }, {
        key: "now",
        value: function now() {
            return new Date().getTime();
        }
    }, {
        key: "start",
        value: function start() {
            this.setState({
                active: true,
                start_at: this.now() - this.state.value,
                interval: setInterval(this.handleTick, 10)
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.state.interval);
            this.setState({
                active: false,
                value: this.value()
            });
        }
    }, {
        key: "value",
        value: function value() {
            return this.state.active ? this.now() - this.state.start_at : this.state.value;
        }
    }, {
        key: "pad",
        value: function pad(num, size) {
            var s = "0000" + num;
            return s.substr(s.length - size);
        }
    }, {
        key: "getStrValue",
        value: function getStrValue() {
            var val = this.value();
            var m = 0,
                s = 0;
            m = Math.floor(val / (60 * 1000));
            val %= 60 * 1000;
            s = Math.floor(val / 1000);
            return m + ":" + this.pad(s, 2);
        }
    }, {
        key: "getToggleButtonClassName",
        value: function getToggleButtonClassName() {
            return (0, _makeClassName2.default)({
                "tbtn": true,
                "btn-toggle": true,
                "ignore-readonly": true,
                "active": this.state.active
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "stopwatch" },
                React.createElement(
                    "button",
                    _extends({
                        className: "tbtn btn-reset ignore-readonly"
                    }, (0, _onTouchOrClick2.default)(this.handleReset)),
                    (0, _l10n2.default)("tablet.buttons.reset_stopwatch")
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: this.getToggleButtonClassName()
                    }, (0, _onTouchOrClick2.default)(this.handleToggle)),
                    this.state.active ? (0, _l10n2.default)("tablet.buttons.stop_stopwatch") : (0, _l10n2.default)("tablet.buttons.start_stopwatch")
                ),
                React.createElement(
                    "div",
                    { className: "time" },
                    this.getStrValue()
                )
            );
        }
    }]);

    return StopWatch;
}(React.Component);

exports.default = StopWatch;

},{"common/makeClassName":2,"l10n":100,"tablet_ui/onTouchOrClick":9}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DancingPage = function (_React$Component) {
    _inherits(DancingPage, _React$Component);

    function DancingPage() {
        _classCallCheck(this, DancingPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DancingPage).apply(this, arguments));
    }

    _createClass(DancingPage, [{
        key: "renderScores",
        value: function renderScores() {
            var _this2 = this;

            return this.props.runs.map(function (run) {
                return React.createElement(_ScoringLayout2.default, {
                    key: run.id,
                    run: run,
                    tour: _this2.props.tour,
                    disciplineJudge: _this2.props.disciplineJudge,
                    onScoreUpdate: _this2.props.onScoreUpdate,
                    onScoreConfirm: _this2.props.onScoreConfirm
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body" },
                React.createElement(
                    _Grid2.default,
                    null,
                    this.renderScores()
                )
            );
        }
    }]);

    return DancingPage;
}(React.Component);

exports.default = DancingPage;

},{"./ScoringLayout":76,"JudgeTablet/Grid":55}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Header = require("JudgeTablet/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("JudgeTablet/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _FooterItem = require("JudgeTablet/Footer/FooterItem");

var _FooterItem2 = _interopRequireDefault(_FooterItem);

var _DancingPage = require("./DancingPage");

var _DancingPage2 = _interopRequireDefault(_DancingPage);

var _AcroPage = require("./AcroPage");

var _AcroPage2 = _interopRequireDefault(_AcroPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TechJudgeLayout = function (_CacheMixin) {
    _inherits(TechJudgeLayout, _CacheMixin);

    function TechJudgeLayout(props) {
        _classCallCheck(this, TechJudgeLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TechJudgeLayout).call(this, props));

        _this.onPrevHeatClick = function () {
            _this.updateHeat(_this.state.heat - 1);
        };

        _this.onNextHeatClick = function () {
            _this.updateHeat(_this.state.heat + 1);
        };

        _this.onPageChange = function (page) {
            _this.setState({ page: page });
        };

        _this.state = {
            heat: _this.first_non_confirmed_heat,
            page: "dancing"
        };
        return _this;
    }

    _createClass(TechJudgeLayout, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.tour.id !== this.props.tour.id) {
                var prev_props = this.props;
                this.props = next_props;
                this.resetCache();
                this.setState({
                    heat: this.first_non_confirmed_heat,
                    page: "dancing"
                });
                this.props = prev_props;
            }
        }
    }, {
        key: "updateHeat",
        value: function updateHeat(value) {
            this.setState({
                heat: value
            });
        }
    }, {
        key: "renderDancing",
        value: function renderDancing() {
            return React.createElement(_DancingPage2.default, {
                runs: this.runs,
                disciplineJudge: this.props.disciplineJudge,
                onScoreUpdate: this.props.onScoreUpdate,
                onScoreConfirm: this.props.onScoreConfirm
            });
        }
    }, {
        key: "renderAcro",
        value: function renderAcro() {
            return React.createElement(_AcroPage2.default, {
                runs: this.runs,
                disciplineJudge: this.props.disciplineJudge,
                onScoreUpdate: this.props.onScoreUpdate,
                onScoreConfirm: this.props.onScoreConfirm
            });
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var heats_count = this.heats_count;
            return React.createElement(_Header2.default, {
                judge: this.props.disciplineJudge.judge,
                tour: this.props.tour,
                heat: this.state.heat,
                heatsCount: heats_count,
                maxHeat: this.first_non_confirmed_heat,
                onPrevHeatClick: this.onPrevHeatClick,
                onNextHeatClick: this.onNextHeatClick
            });
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            switch (this.state.page) {
                case "dancing":
                    return this.renderDancing();
                case "acro":
                    return this.renderAcro();
            }
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            if (["rosfarr.acro", "rosfarr.am_final_acro"].indexOf(this.props.tour.scoring_system_name) < 0) {
                return null;
            }
            return React.createElement(
                _Footer2.default,
                { value: this.state.page, onChange: this.onPageChange },
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.dancing"),
                    mkey: "dancing" }),
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.acro"),
                    mkey: "acro" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "rosfarr-JudgeTablet TechJudgeLayout" },
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            );
        }
    }, {
        key: "heats_count",
        get: function get() {
            var _this2 = this;

            return this.fetchFromCache("heats_count", function () {
                var _Math;

                return (_Math = Math).max.apply(_Math, _toConsumableArray(_this2.props.tour.runs.map(function (run) {
                    return run.heat;
                })));
            });
        }
    }, {
        key: "runs",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("runs", function () {
                return _this3.props.tour.runs.filter(function (run) {
                    return run.heat === _this3.state.heat;
                });
            });
        }
    }, {
        key: "first_non_confirmed_heat",
        get: function get() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.tour.runs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var run = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = run.scores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var score = _step2.value;

                            if (score.discipline_judge_id === this.props.disciplineJudge.id && !score.confirmed && run.performed) {
                                return run.heat;
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

            return this.heats_count;
        }
    }]);

    return TechJudgeLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = TechJudgeLayout;

},{"./AcroPage":75,"./DancingPage":78,"JudgeTablet/Footer":43,"JudgeTablet/Footer/FooterItem":42,"JudgeTablet/Header":69,"common/CacheMixin":96,"l10n":100}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return React.createElement(
        "div",
        { className: "total-score" },
        (0, _l10n2.default)("tablet.global.total_score"),
        ": ",
        props.score.data.total_score
    );
};

},{"l10n":100}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

var _AcrobaticsLayout = require("./AcrobaticsLayout");

var _AcrobaticsLayout2 = _interopRequireDefault(_AcrobaticsLayout);

var _DanceLayout = require("./DanceLayout");

var _DanceLayout2 = _interopRequireDefault(_DanceLayout);

var _DanceHalvedLayout = require("./DanceHalvedLayout");

var _DanceHalvedLayout2 = _interopRequireDefault(_DanceHalvedLayout);

var _FormationLayout = require("./FormationLayout");

var _FormationLayout2 = _interopRequireDefault(_FormationLayout);

var _FormationAcroLayout = require("./FormationAcroLayout");

var _FormationAcroLayout2 = _interopRequireDefault(_FormationAcroLayout);

var _SimplifiedLayout = require("./SimplifiedLayout");

var _SimplifiedLayout2 = _interopRequireDefault(_SimplifiedLayout);

var _HeadJudgeLayout = require("./HeadJudgeLayout");

var _HeadJudgeLayout2 = _interopRequireDefault(_HeadJudgeLayout);

var _TechJudgeLayout = require("./TechJudgeLayout");

var _TechJudgeLayout2 = _interopRequireDefault(_TechJudgeLayout);

var _HostModules = require("HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeTablet = function (_React$Component) {
    _inherits(JudgeTablet, _React$Component);

    function JudgeTablet() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, JudgeTablet);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(JudgeTablet)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onScoreUpdate = function (score_id, new_score) {
            var request = {
                score_data: new_score,
                force: false
            };
            (0, _HostModules.Api)("score.set", { score_id: score_id, data: request }).send();
        }, _this.onScoreConfirm = function (score_id) {
            (0, _HostModules.Api)("score.confirm", { score_id: score_id }).send();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(JudgeTablet, [{
        key: "render",
        value: function render() {
            var scoring_type = (0, _getScoringType2.default)(this.props.disciplineJudge, this.props.tour.scoring_system_name);
            var LayoutClass = JudgeTablet.LAYOUTS[scoring_type];
            if (!LayoutClass) {
                return React.createElement(
                    "div",
                    null,
                    "Not implemented!"
                );
            }
            return React.createElement(
                "div",
                { className: "rosfarr-JudgeTablet" },
                React.createElement(LayoutClass, {
                    disciplineJudge: this.props.disciplineJudge,
                    tour: this.props.tour,
                    onScoreConfirm: this.onScoreConfirm,
                    onScoreUpdate: this.onScoreUpdate
                })
            );
        }
    }]);

    return JudgeTablet;
}(React.Component);

JudgeTablet.LAYOUTS = {
    "acro": _AcrobaticsLayout2.default,
    "dance": _DanceLayout2.default,
    "dance_halved": _DanceHalvedLayout2.default,
    "formation": _FormationLayout2.default,
    "formation_acro": _FormationAcroLayout2.default,
    "simplified": _SimplifiedLayout2.default,
    "head": _HeadJudgeLayout2.default,
    "tech": _TechJudgeLayout2.default
};
exports.default = JudgeTablet;

},{"./AcrobaticsLayout":31,"./DanceHalvedLayout":36,"./DanceLayout":40,"./FormationAcroLayout":47,"./FormationLayout":51,"./HeadJudgeLayout":68,"./SimplifiedLayout":71,"./TechJudgeLayout":79,"HostModules":26,"common/getScoringType":98}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getParticipantDisplay = require("common/getParticipantDisplay");

var _getParticipantDisplay2 = _interopRequireDefault(_getParticipantDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "getCard",
        value: function getCard() {
            var _this2 = this;

            if (!this.props.row.run.performed) {
                return "—";
            }
            var head_judge_score = this.props.row.run.scores.find(function (score) {
                return _this2.props.disciplineJudgesMap.get(score.discipline_judge_id).role === "head_judge";
            });
            if (!head_judge_score) {
                return "0";
            }
            return head_judge_score.data.total_score.toFixed();
        }
    }, {
        key: "renderTotalScoreCell",
        value: function renderTotalScoreCell() {
            if (!this.props.showTotalScore) {
                return null;
            }
            var content = "—";
            if (this.props.row.run.performed) {
                content = React.createElement(
                    "span",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        this.props.row.run.verbose_total_score.primary_score.toFixed(2)
                    ),
                    " ",
                    "/ ",
                    this.props.row.run.verbose_total_score.secondary_score.toFixed(2)
                );
            }
            return React.createElement(
                "td",
                { className: "w-18 score" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    content
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "w-7 place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.row.place
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-6 number" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.row.run.participant.number
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-30 participant" },
                    (0, _getParticipantDisplay2.default)(this.props.row.run.participant)
                ),
                React.createElement(
                    "td",
                    { className: "club" },
                    React.createElement(
                        "p",
                        null,
                        this.props.row.run.participant.club.name
                    )
                ),
                this.renderTotalScoreCell(),
                React.createElement(
                    "td",
                    { className: "w-8 card" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.getCard()
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudgesMap: PT.instanceOf(Map).isRequired,
                row: PT.shape({
                    place: PT.number,
                    run: PT.shape({
                        performed: PT.bool.isRequired,
                        participant: PT.shape({
                            number: PT.number.isRequired,
                            club: PT.shape({
                                name: PT.string.isRequired
                            }).isRequired
                        }).isRequired,
                        scores: PT.arrayOf(PT.shape({
                            discipline_judge_id: PT.number.isRequired
                        }).isRequired).isRequired,
                        verbose_total_score: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                            previous_tour: PT.shape({
                                primary_score: PT.number,
                                secondary_score: PT.number
                            })
                        })
                    }).isRequired
                }).isRequired,
                showTotalScore: PT.bool.isRequired
            };
        }
    }]);

    return Row;
}(React.Component);

exports.default = Row;


Row.displayName = "rules_sets_rosfarr_ResultsTable1_Row";

},{"common/getParticipantDisplay":97}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsTable1 = function (_React$Component) {
    _inherits(ResultsTable1, _React$Component);

    function ResultsTable1() {
        _classCallCheck(this, ResultsTable1);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsTable1).apply(this, arguments));
    }

    _createClass(ResultsTable1, [{
        key: "getRowStatus",
        value: function getRowStatus(row) {
            if (!row) {
                return "none";
            }
            if (!row.run.performed) {
                return "not_performed";
            }
            return row.advances ? "advanced" : "not_advanced";
        }
    }, {
        key: "getStatusHeader",
        value: function getStatusHeader(row_status) {
            return (0, _l10n2.default)("results.headers.participants_" + row_status);
        }
    }, {
        key: "renderAdvancesHeader",
        value: function renderAdvancesHeader(prev_row, next_row, has_next_tour, n_cols) {
            var prev_status = this.getRowStatus(prev_row);
            var next_status = this.getRowStatus(next_row);
            if (prev_status === next_status) {
                return null;
            }
            if (next_status !== "not_performed" && !has_next_tour) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "AH" + next_row.run.id },
                React.createElement(
                    "th",
                    { className: "advances-header", colSpan: n_cols },
                    React.createElement(
                        "p",
                        { className: "text-left" },
                        this.getStatusHeader(next_status)
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var has_next_tour = this.props.tour.next_tour_id !== null;
            var show_total_score = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) < 0;
            var djs_map = new Map(this.props.tour.discipline.discipline_judges.map(function (dj) {
                return [dj.id, dj];
            }));
            var rows = [];
            for (var idx = 0; idx < this.props.table.length; ++idx) {
                rows.push(this.renderAdvancesHeader(this.props.table[idx - 1], this.props.table[idx], has_next_tour, 5 + show_total_score));
                var row = this.props.table[idx];
                rows.push(React.createElement(_Row2.default, {
                    disciplineJudgesMap: djs_map,
                    key: row.run.id,
                    row: row,
                    showTotalScore: show_total_score
                }));
            }
            return React.createElement(
                "div",
                { className: "ResultsTable1" },
                React.createElement(
                    "table",
                    { className: "bordered-table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "w-7 place" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.place")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-6 number" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.number")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-30 participant" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.participant_name")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "club" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.participant_club")
                                )
                            ),
                            show_total_score ? React.createElement(
                                "th",
                                { className: "w-18 score" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.total_score")
                                )
                            ) : null,
                            React.createElement(
                                "th",
                                { className: "w-8 card" },
                                React.createElement(
                                    "p",
                                    { className: "text-center" },
                                    (0, _l10n2.default)("results.labels.card")
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        rows
                    )
                )
            );
        }
    }], [{
        key: "transformDocx",
        value: function transformDocx(docx) {
            docx.addStyle(".bordered-table", "font-size", "12pt").addStyle(".advances-header", "background-color", "#ddd");
        }
    }, {
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                table: PT.arrayOf(PT.shape({
                    advances: PT.bool.isRequired,
                    run: PT.shape({
                        id: PT.number.isRequired,
                        performed: PT.bool.isRequired
                    }).isRequired
                }).isRequired).isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired,
                    next_tour_id: PT.number,
                    discipline: PT.shape({
                        discipline_judges: PT.arrayOf(PT.shape({
                            role: PT.string.isRequired
                        }).isRequired).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return ResultsTable1;
}(React.Component);

exports.default = ResultsTable1;


ResultsTable1.displayName = "rules_sets_rosfarr_ResultsTable1";

},{"./Row":82,"l10n":100}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnsWidths = function () {
    function ColumnsWidths(n_judges, has_total_score) {
        _classCallCheck(this, ColumnsWidths);

        this.judge_width = Math.round(55 / (n_judges + 1));
        this.total_score_width = has_total_score ? 14 : 0;
        this.place_width = 6;
        this.number_width = 3;
        this.name_width = 100 - this.judge_width * (n_judges + 1) - this.total_score_width - this.place_width - this.number_width;
    }

    _createClass(ColumnsWidths, [{
        key: "genPlaceStyle",
        value: function genPlaceStyle() {
            return {
                width: this.place_width + "%"
            };
        }
    }, {
        key: "genNumberStyle",
        value: function genNumberStyle() {
            return {
                width: this.number_width + "%"
            };
        }
    }, {
        key: "genNameStyle",
        value: function genNameStyle() {
            return {
                width: this.name_width + "%"
            };
        }
    }, {
        key: "genTotalScoreStyle",
        value: function genTotalScoreStyle() {
            return {
                width: this.total_score_width + "%"
            };
        }
    }, {
        key: "genJudgeStyle",
        value: function genJudgeStyle() {
            return {
                width: this.judge_width + "%"
            };
        }
    }]);

    return ColumnsWidths;
}();

exports.default = ColumnsWidths;

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _getParticipantDisplay = require("common/getParticipantDisplay");

var _getParticipantDisplay2 = _interopRequireDefault(_getParticipantDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "isFormation",
        value: function isFormation() {
            return ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0;
        }
    }, {
        key: "getCard",
        value: function getCard() {
            var _this2 = this;

            if (!this.props.row.run.performed) {
                return "—";
            }
            var head_judge_score = this.props.row.run.scores.find(function (score) {
                return _this2.props.disciplineJudgesMap.get(score.discipline_judge_id).role === "head_judge";
            });
            if (!head_judge_score) {
                return "0";
            }
            return head_judge_score.data.total_score.toFixed();
        }
    }, {
        key: "renderFormationScore",
        value: function renderFormationScore(score) {
            return React.createElement(
                "p",
                { className: "text-center" },
                React.createElement(
                    "strong",
                    null,
                    this.props.row.additional_data.places[score.id]
                ),
                " (" + score.data.total_score.toFixed(1) + ")"
            );
        }
    }, {
        key: "renderScore",
        value: function renderScore(discipline_judge, score) {
            if (!this.props.row.run.performed) {
                return React.createElement(
                    "p",
                    { className: "text-center" },
                    "—"
                );
            }
            if (discipline_judge.role === "dance_judge" && this.isFormation()) {
                return this.renderFormationScore(score);
            }
            return React.createElement(
                "p",
                { className: "text-center" },
                score.data.total_score.toFixed(2)
            );
        }
    }, {
        key: "renderTotalScoreCell",
        value: function renderTotalScoreCell() {
            var total_score = this.props.row.run.verbose_total_score;
            if (!this.props.showTotalScore) {
                return null;
            }
            if (!this.props.row.run.performed) {
                return React.createElement(
                    "td",
                    { className: "total-score" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        "—"
                    )
                );
            }
            if (this.props.tour.scoring_system_name === "rosfarr.am_final_acro") {
                var p_score = total_score.previous_tour.primary_score.toFixed(2);
                var s_score = total_score.previous_tour.secondary_score.toFixed(2);
                return React.createElement(
                    "td",
                    { className: "total-score" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        React.createElement(
                            "em",
                            null,
                            (0, _l10n2.default)("results.labels.fw_score_short") + ": " + p_score + " / " + s_score
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "strong",
                            null,
                            total_score.primary_score.toFixed(2)
                        ),
                        " ",
                        "/ ",
                        total_score.secondary_score.toFixed(2)
                    )
                );
            }
            return React.createElement(
                "td",
                { className: "total-score" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    React.createElement(
                        "strong",
                        null,
                        total_score.primary_score.toFixed(2)
                    ),
                    " ",
                    "/ ",
                    total_score.secondary_score.toFixed(2)
                )
            );
        }
    }, {
        key: "renderJudgesScores",
        value: function renderJudgesScores() {
            var _this3 = this;

            var scores_map = new Map(this.props.row.run.scores.map(function (score) {
                return [score.discipline_judge_id, score];
            }));
            return this.props.lineDisciplineJudges.map(function (dj, idx) {
                return React.createElement(
                    "td",
                    { key: dj ? dj.id : "I" + idx },
                    _this3.renderScore(dj, scores_map.get(dj.id))
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.row.place
                    )
                ),
                React.createElement(
                    "td",
                    { className: "number" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.row.run.participant.number
                    )
                ),
                React.createElement(
                    "td",
                    { className: "participant" },
                    (0, _getParticipantDisplay2.default)(this.props.row.run.participant)
                ),
                this.renderTotalScoreCell(),
                this.renderJudgesScores(),
                React.createElement(
                    "td",
                    { className: "card" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.getCard()
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudgesMap: PT.instanceOf(Map).isRequired,
                lineDisciplineJudges: PT.arrayOf(PT.shape({
                    role: PT.string.isRequired
                }).isRequired).isRequired,
                row: PT.shape({
                    additional_data: PT.object.isRequired,
                    place: PT.number,
                    run: PT.shape({
                        performed: PT.bool.isRequired,
                        participant: PT.shape({
                            number: PT.number.isRequired,
                            club: PT.shape({
                                name: PT.string.isRequired
                            }).isRequired
                        }).isRequired,
                        scores: PT.arrayOf(PT.shape({
                            discipline_judge_id: PT.number.isRequired
                        }).isRequired).isRequired,
                        verbose_total_score: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                            previous_tour: PT.shape({
                                primary_score: PT.number,
                                secondary_score: PT.number
                            })
                        })
                    }).isRequired
                }).isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired
                }).isRequired,
                showTotalScore: PT.bool.isRequired
            };
        }
    }]);

    return Row;
}(React.Component);

exports.default = Row;


Row.displayName = "rules_sets_rosfarr_ResultsTable2_Row";

},{"common/getParticipantDisplay":97,"l10n":100}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

var _ColumnsWidths = require("./ColumnsWidths");

var _ColumnsWidths2 = _interopRequireDefault(_ColumnsWidths);

var _getJudgeTableMark = require("getJudgeTableMark");

var _getJudgeTableMark2 = _interopRequireDefault(_getJudgeTableMark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsTable2 = function (_React$Component) {
    _inherits(ResultsTable2, _React$Component);

    function ResultsTable2() {
        _classCallCheck(this, ResultsTable2);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsTable2).apply(this, arguments));
    }

    _createClass(ResultsTable2, [{
        key: "getRowStatus",
        value: function getRowStatus(row) {
            if (!row) {
                return "none";
            }
            if (!row.run.performed) {
                return "not_performed";
            }
            return row.advances ? "advanced" : "not_advanced";
        }
    }, {
        key: "getStatusHeader",
        value: function getStatusHeader(row_status) {
            return (0, _l10n2.default)("results.headers.participants_" + row_status);
        }
    }, {
        key: "renderAdvancesHeader",
        value: function renderAdvancesHeader(prev_row, next_row, has_next_tour, n_cols) {
            var prev_status = this.getRowStatus(prev_row);
            var next_status = this.getRowStatus(next_row);
            if (prev_status === next_status) {
                return null;
            }
            if (next_status !== "not_performed" && !has_next_tour) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "AH" + next_row.run.id },
                React.createElement(
                    "th",
                    { className: "advances-header", colSpan: n_cols },
                    React.createElement(
                        "p",
                        { className: "text-left" },
                        this.getStatusHeader(next_status)
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var show_total_score = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) < 0;
            var line_judges = this.props.tour.discipline.discipline_judges.filter(function (dj) {
                return ["acro_judge", "dance_judge"].indexOf(dj.role) >= 0;
            });
            var has_next_tour = this.props.tour.next_tour_id !== null;
            var widths = new _ColumnsWidths2.default(line_judges.length, show_total_score);
            var djs_map = new Map(this.props.tour.discipline.discipline_judges.map(function (dj) {
                return [dj.id, dj];
            }));
            var rows = [];
            for (var idx = 0; idx < this.props.table.length; ++idx) {
                rows.push(this.renderAdvancesHeader(this.props.table[idx - 1], this.props.table[idx], has_next_tour, 4 + line_judges.length + show_total_score));
                rows.push(React.createElement(_Row2.default, {
                    disciplineJudgesMap: djs_map,
                    key: this.props.table[idx].run.id,
                    lineDisciplineJudges: line_judges,
                    row: this.props.table[idx],
                    showTotalScore: show_total_score,
                    tour: this.props.tour
                }));
            }
            return React.createElement(
                "div",
                { className: "ResultsTable2" },
                React.createElement(
                    "table",
                    { className: "bordered-table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "place", style: widths.genPlaceStyle() },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.place")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "number", style: widths.genNumberStyle() },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.number")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "participant", style: widths.genNameStyle() },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.participant_name")
                                )
                            ),
                            show_total_score ? React.createElement(
                                "th",
                                { className: "total-score", style: widths.genTotalScoreStyle() },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.total_score")
                                )
                            ) : null,
                            line_judges.map(function (dj) {
                                return React.createElement(
                                    "th",
                                    { key: dj.id, style: widths.genJudgeStyle() },
                                    React.createElement(
                                        "p",
                                        null,
                                        (0, _getJudgeTableMark2.default)(dj)
                                    )
                                );
                            }),
                            React.createElement(
                                "th",
                                { className: "card", style: widths.genJudgeStyle() },
                                React.createElement(
                                    "p",
                                    { className: "text-center" },
                                    (0, _l10n2.default)("results.labels.card")
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        rows
                    )
                )
            );
        }
    }], [{
        key: "transformDocx",
        value: function transformDocx(docx) {
            docx.addStyle(".bordered-table", "font-size", "9pt").addStyle(".advances-header", "background-color", "#ddd").addStyle(".total-score", "font-weight", "bold");
        }
    }, {
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                table: PT.arrayOf(PT.shape({
                    advances: PT.bool.isRequired,
                    run: PT.shape({
                        id: PT.number.isRequired,
                        performed: PT.bool.isRequired
                    }).isRequired
                }).isRequired).isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired,
                    next_tour_id: PT.number,
                    discipline: PT.shape({
                        discipline_judges: PT.arrayOf(PT.shape({
                            role: PT.string.isRequired
                        }).isRequired).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return ResultsTable2;
}(React.Component);

exports.default = ResultsTable2;


ResultsTable2.displayName = "rules_sets_rosfarr_ResultsTable2";

},{"./ColumnsWidths":84,"./Row":85,"getJudgeTableMark":99,"l10n":100}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnsWidths = function () {
    function ColumnsWidths(n_judges) {
        _classCallCheck(this, ColumnsWidths);

        this.judge_width = Math.round(70 / n_judges);
        this.place_width = 7;
        this.info_width = 100 - this.judge_width * n_judges - this.place_width;
    }

    _createClass(ColumnsWidths, [{
        key: "genPlaceStyle",
        value: function genPlaceStyle() {
            return {
                width: this.place_width + "%"
            };
        }
    }, {
        key: "genInfoStyle",
        value: function genInfoStyle() {
            return {
                width: this.info_width + "%"
            };
        }
    }, {
        key: "genJudgeStyle",
        value: function genJudgeStyle() {
            return {
                width: this.judge_width + "%"
            };
        }
    }]);

    return ColumnsWidths;
}();

exports.default = ColumnsWidths;

},{}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _formatScore = require("./formatScore");

var _formatScore2 = _interopRequireDefault(_formatScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcroScore = function (_React$Component) {
    _inherits(AcroScore, _React$Component);

    function AcroScore() {
        _classCallCheck(this, AcroScore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AcroScore).apply(this, arguments));
    }

    _createClass(AcroScore, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
                    null,
                    this.props.score.data.raw_data.reductions.map(function (score, idx) {
                        return React.createElement(
                            "tr",
                            { key: idx },
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.breakdown.acro_n", idx + 1),
                                    ":"
                                )
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _formatScore2.default)(score, "-$%")
                                )
                            )
                        );
                    }),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.fd"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                this.props.score.data.total_score
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    id: PT.number.isRequired,
                    data: PT.shape({
                        total_score: PT.number.isRequired,
                        raw_data: PT.shape({
                            reductions: PT.arrayOf(PT.number).isRequired,
                            mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return AcroScore;
}(React.Component);

exports.default = AcroScore;


AcroScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_AcroScore";

},{"./formatScore":93,"l10n":100}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _formatScore = require("./formatScore");

var _formatScore2 = _interopRequireDefault(_formatScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DanceScore = function (_React$Component) {
    _inherits(DanceScore, _React$Component);

    function DanceScore() {
        _classCallCheck(this, DanceScore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DanceScore).apply(this, arguments));
    }

    _createClass(DanceScore, [{
        key: "render",
        value: function render() {
            var score_format = this.props.scoringType === "dance_halved" ? "@" : "$";
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.fw"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.fw_woman, "-$%")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.fm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.fw_man, "-$%")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.dance_figs, score_format)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.c"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.composition, score_format)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.sm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.small_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.bm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.big_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                this.props.score.data.total_score
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    id: PT.number.isRequired,
                    data: PT.shape({
                        total_score: PT.number.isRequired,
                        raw_data: PT.shape({
                            fw_woman: PT.number,
                            fw_man: PT.number,
                            dance_figs: PT.number,
                            composition: PT.number,
                            small_mistakes: PT.number,
                            big_mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired,
                scoringType: PT.string.isRequired
            };
        }
    }]);

    return DanceScore;
}(React.Component);

exports.default = DanceScore;


DanceScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_DanceScore";

},{"./formatScore":93,"l10n":100}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _formatScore = require("./formatScore");

var _formatScore2 = _interopRequireDefault(_formatScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormationAcroScore = function (_React$Component) {
    _inherits(FormationAcroScore, _React$Component);

    function FormationAcroScore() {
        _classCallCheck(this, FormationAcroScore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FormationAcroScore).apply(this, arguments));
    }

    _createClass(FormationAcroScore, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.a"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.acrobatics, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.dt"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.dance_tech, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.dance_figs, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.i"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.impression, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.sm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.small_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.bm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.big_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                this.props.score.data.total_score
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.p"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                this.props.row.additional_data.places[this.props.score.id]
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                row: PT.shape({
                    additional_data: PT.shape({
                        places: PT.object.isRequired
                    }).isRequired
                }).isRequired,
                score: PT.shape({
                    id: PT.number.isRequired,
                    data: PT.shape({
                        total_score: PT.number.isRequired,
                        raw_data: PT.shape({
                            acrobatics: PT.number,
                            dance_tech: PT.number,
                            dance_figs: PT.number,
                            impression: PT.number,
                            small_mistakes: PT.number,
                            big_mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return FormationAcroScore;
}(React.Component);

exports.default = FormationAcroScore;


FormationAcroScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_FormationAcroScore";

},{"./formatScore":93,"l10n":100}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _formatScore = require("./formatScore");

var _formatScore2 = _interopRequireDefault(_formatScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormationScore = function (_React$Component) {
    _inherits(FormationScore, _React$Component);

    function FormationScore() {
        _classCallCheck(this, FormationScore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FormationScore).apply(this, arguments));
    }

    _createClass(FormationScore, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.dt"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.dance_tech, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.dance_figs, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.i"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.impression, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.m"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                this.props.score.data.total_score
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.p"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                this.props.row.additional_data.places[this.props.score.id]
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                row: PT.shape({
                    additional_data: PT.shape({
                        places: PT.object.isRequired
                    }).isRequired
                }).isRequired,
                score: PT.shape({
                    id: PT.number.isRequired,
                    data: PT.shape({
                        total_score: PT.number.isRequired,
                        raw_data: PT.shape({
                            dance_tech: PT.number,
                            dance_figs: PT.number,
                            impression: PT.number,
                            mistakes: PT.number
                        }).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return FormationScore;
}(React.Component);

exports.default = FormationScore;


FormationScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_FormationScore";

},{"./formatScore":93,"l10n":100}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _getParticipantDisplay = require("common/getParticipantDisplay");

var _getParticipantDisplay2 = _interopRequireDefault(_getParticipantDisplay);

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoCell = function (_React$Component) {
    _inherits(InfoCell, _React$Component);

    function InfoCell() {
        _classCallCheck(this, InfoCell);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(InfoCell).apply(this, arguments));
    }

    _createClass(InfoCell, [{
        key: "renderParticipantInfo",
        value: function renderParticipantInfo() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        (0, _l10n2.default)("global.phrases.participant_n", this.props.row.run.participant.number, null, this.props.row.run.participant.sportsmen.length)
                    )
                ),
                (0, _getParticipantDisplay2.default)(this.props.row.run.participant)
            );
        }
    }, {
        key: "renderHeadJudgePenalty",
        value: function renderHeadJudgePenalty() {
            var _this2 = this;

            if (!this.props.row.run.performed) {
                return null;
            }
            var head_judge_score = this.props.row.run.scores.find(function (score) {
                return _this2.props.disciplineJudgesMap.get(score.discipline_judge_id).role === "head_judge";
            });
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.penalty") + ": "
                ),
                head_judge_score ? head_judge_score.data.total_score.toFixed() : "—"
            );
        }
    }, {
        key: "renderAcroTable",
        value: function renderAcroTable() {
            if (!this.props.row.run.performed) {
                return null;
            }
            if (["rosfarr.acro", "rosfarr.am_final_acro"].indexOf(this.props.tour.scoring_system_name) < 0) {
                return null;
            }
            if (this.props.row.run.acrobatics.length === 0) {
                return null;
            }
            var has_acro_overrides = this.props.row.run.acrobatics.findIndex(function (element) {
                return element.score !== element.original_score;
            }) > 0;
            var acro_cell_width = 100 / this.props.row.run.acrobatics.length + "%";
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        has_acro_overrides ? (0, _l10n2.default)("results.labels.acrobatics_verbose") : (0, _l10n2.default)("results.labels.acrobatics"),
                        ":"
                    )
                ),
                React.createElement(
                    "table",
                    { className: "acro-table" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            this.props.row.run.acrobatics.map(function (acro, idx) {
                                return React.createElement(
                                    "td",
                                    { key: idx, style: { width: acro_cell_width } },
                                    React.createElement(
                                        "p",
                                        { className: "text-center" },
                                        acro.original_score.toFixed(1)
                                    )
                                );
                            })
                        ),
                        has_acro_overrides ? React.createElement(
                            "tr",
                            null,
                            this.props.row.run.acrobatics.map(function (acro, idx) {
                                return React.createElement(
                                    "td",
                                    { key: idx, style: { width: acro_cell_width } },
                                    React.createElement(
                                        "p",
                                        { className: "text-center" },
                                        acro.score.toFixed(1)
                                    )
                                );
                            })
                        ) : null
                    )
                )
            );
        }
    }, {
        key: "renderAmClassFwScore",
        value: function renderAmClassFwScore() {
            if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
                return null;
            }
            var p_score = this.props.row.run.verbose_total_score.previous_tour.primary_score.toFixed(2);
            var s_score = this.props.row.run.verbose_total_score.previous_tour.secondary_score.toFixed(2);
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.fw_score")
                ),
                ": " + p_score + " / " + s_score
            );
        }
    }, {
        key: "renderAmClassAcroScore",
        value: function renderAmClassAcroScore() {
            if (!this.props.row.run.performed) {
                return null;
            }
            if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
                return null;
            }
            var p_score = this.props.row.run.verbose_total_score.current_tour.primary_score.toFixed(2);
            var s_score = this.props.row.run.verbose_total_score.current_tour.secondary_score.toFixed(2);
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.acro_score")
                ),
                ": " + p_score + " / " + s_score
            );
        }
    }, {
        key: "renderTotalScore",
        value: function renderTotalScore() {
            if (!this.props.row.run.performed) {
                return null;
            }
            if (["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0) {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.total_score") + ": " + this.props.row.run.total_score
                )
            );
        }
    }, {
        key: "renderNotPerformedLabel",
        value: function renderNotPerformedLabel() {
            if (this.props.row.run.performed) {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "em",
                    null,
                    (0, _l10n2.default)("results.labels.not_performed")
                )
            );
        }
    }, {
        key: "renderNextTourLabel",
        value: function renderNextTourLabel() {
            if (this.props.tour.next_tour_id === null) {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.next_tour") + ": "
                ),
                this.props.row.advances ? (0, _l10n2.default)("global.labels.yes") : (0, _l10n2.default)("global.labels.no")
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "info-block" },
                this.renderParticipantInfo(),
                this.renderHeadJudgePenalty(),
                this.renderAcroTable(),
                this.renderAmClassFwScore(),
                this.renderAmClassAcroScore(),
                this.renderTotalScore(),
                this.renderNotPerformedLabel(),
                this.renderNextTourLabel()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudgesMap: PT.instanceOf(Map).isRequired,
                row: PT.shape({
                    additional_data: PT.object.isRequired,
                    advances: PT.bool.isRequired,
                    place: PT.number,
                    run: PT.shape({
                        performed: PT.bool.isRequired,
                        total_score: PT.string.isRequired,
                        acrobatics: PT.arrayOf(PT.shape({
                            original_score: PT.number.isRequired,
                            score: PT.number.isRequired
                        }).isRequired).isRequired,
                        participant: PT.shape({
                            number: PT.number.isRequired,
                            formation_name: PT.string.isRequired,
                            sportsmen: PT.arrayOf(PT.shape({
                                first_name: PT.string.isRequired,
                                last_name: PT.string.isRequired
                            }).isRequired).isRequired,
                            club: PT.shape({
                                name: PT.string.isRequired
                            }).isRequired
                        }).isRequired,
                        scores: PT.arrayOf(PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                            data: PT.shape({
                                total_score: PT.number.isRequired
                            })
                        }).isRequired).isRequired,
                        verbose_total_score: PT.shape({
                            previous_tour: PT.shape({
                                primary_score: PT.number,
                                secondary_score: PT.number
                            }),
                            current_tour: PT.shape({
                                primary_score: PT.number,
                                secondary_score: PT.number
                            })
                        })
                    }).isRequired
                }).isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired,
                    next_tour_id: PT.number
                }).isRequired
            };
        }
    }]);

    return InfoCell;
}(React.Component);

exports.default = InfoCell;


InfoCell.displayName = "rules_sets_rosfarr_ResultsTable3_InfoCell";

},{"common/getParticipantDisplay":97,"common/getScoringType":98,"l10n":100}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = formatScore;
function formatScore(score) {
    var template = arguments.length <= 1 || arguments[1] === undefined ? "$" : arguments[1];

    if (score === null) {
        return "—";
    }
    return template.replace("$", score).replace("@", score.toFixed(1));
}

},{}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

var _InfoCell = require("./InfoCell");

var _InfoCell2 = _interopRequireDefault(_InfoCell);

var _AcroScore = require("./AcroScore");

var _AcroScore2 = _interopRequireDefault(_AcroScore);

var _DanceScore = require("./DanceScore");

var _DanceScore2 = _interopRequireDefault(_DanceScore);

var _FormationAcroScore = require("./FormationAcroScore");

var _FormationAcroScore2 = _interopRequireDefault(_FormationAcroScore);

var _FormationScore = require("./FormationScore");

var _FormationScore2 = _interopRequireDefault(_FormationScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "renderScore",
        value: function renderScore(discipline_judge, score) {
            if (!this.props.row.run.performed) {
                return React.createElement(
                    "p",
                    { className: "text-center" },
                    "—"
                );
            }
            var ScoreComponent = null;
            var scoring_type = (0, _getScoringType2.default)(discipline_judge, this.props.tour.scoring_system_name);
            switch (scoring_type) {
                case "dance":
                case "dance_halved":
                    ScoreComponent = _DanceScore2.default;
                    break;
                case "acro":
                    ScoreComponent = _AcroScore2.default;
                    break;
                case "formation":
                    ScoreComponent = _FormationScore2.default;
                    break;
                case "formation_acro":
                    ScoreComponent = _FormationAcroScore2.default;
                    break;
                default:
                    return React.createElement(
                        "p",
                        { className: "text-center" },
                        score.data.total_score.toFixed(2)
                    );
            }
            var props = {
                score: score,
                row: this.props.row,
                scoringType: scoring_type
            };
            return React.createElement(ScoreComponent, props);
        }
    }, {
        key: "renderJudgesScores",
        value: function renderJudgesScores() {
            var _this2 = this;

            var scores_map = new Map(this.props.row.run.scores.map(function (score) {
                return [score.discipline_judge_id, score];
            }));
            return this.props.lineDisciplineJudges.map(function (dj, idx) {
                return React.createElement(
                    "td",
                    { key: dj ? dj.id : "I" + idx },
                    _this2.renderScore(dj, scores_map.get(dj.id))
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.row.place
                    )
                ),
                React.createElement(_InfoCell2.default, {
                    disciplineJudgesMap: this.props.disciplineJudgesMap,
                    row: this.props.row,
                    tour: this.props.tour
                }),
                this.renderJudgesScores()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudgesMap: PT.instanceOf(Map).isRequired,
                lineDisciplineJudges: PT.arrayOf(PT.shape({
                    role: PT.string.isRequired
                }).isRequired).isRequired,
                row: PT.shape({
                    additional_data: PT.object.isRequired,
                    place: PT.number,
                    run: PT.shape({
                        performed: PT.bool.isRequired,
                        scores: PT.arrayOf(PT.shape({
                            discipline_judge_id: PT.number.isRequired
                        }).isRequired).isRequired,
                        verbose_total_score: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                            previous_tour: PT.shape({
                                primary_score: PT.number,
                                secondary_score: PT.number
                            })
                        })
                    }).isRequired
                }).isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired
                }).isRequired
            };
        }
    }]);

    return Row;
}(React.Component);

exports.default = Row;


Row.displayName = "rules_sets_rosfarr_ResultsTable3_Row";

},{"./AcroScore":88,"./DanceScore":89,"./FormationAcroScore":90,"./FormationScore":91,"./InfoCell":92,"common/getScoringType":98,"l10n":100}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

var _ColumnsWidths = require("./ColumnsWidths");

var _ColumnsWidths2 = _interopRequireDefault(_ColumnsWidths);

var _getJudgeTableMark = require("getJudgeTableMark");

var _getJudgeTableMark2 = _interopRequireDefault(_getJudgeTableMark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsTable3 = function (_React$Component) {
    _inherits(ResultsTable3, _React$Component);

    function ResultsTable3() {
        _classCallCheck(this, ResultsTable3);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsTable3).apply(this, arguments));
    }

    _createClass(ResultsTable3, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var line_judges = this.props.tour.discipline.discipline_judges.filter(function (dj) {
                return ["acro_judge", "dance_judge"].indexOf(dj.role) >= 0;
            });
            var widths = new _ColumnsWidths2.default(line_judges.length);
            var djs_map = new Map(this.props.tour.discipline.discipline_judges.map(function (dj) {
                return [dj.id, dj];
            }));

            return React.createElement(
                "div",
                { className: "ResultsTable3" },
                React.createElement(
                    "table",
                    { className: "bordered-table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "place", style: widths.genPlaceStyle() },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.place")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "participant", style: widths.genInfoStyle() },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.info")
                                )
                            ),
                            line_judges.map(function (dj) {
                                return React.createElement(
                                    "th",
                                    { key: dj.id, style: widths.genJudgeStyle() },
                                    React.createElement(
                                        "p",
                                        null,
                                        (0, _getJudgeTableMark2.default)(dj)
                                    )
                                );
                            })
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.props.table.map(function (row) {
                            return React.createElement(_Row2.default, {
                                disciplineJudgesMap: djs_map,
                                key: row.run.id,
                                lineDisciplineJudges: line_judges,
                                row: row,
                                tour: _this2.props.tour
                            });
                        })
                    )
                )
            );
        }
    }], [{
        key: "transformDocx",
        value: function transformDocx(docx) {
            docx.addStyle(".bordered-table", "font-size", "9pt").addStyle(".bordered-table .acro-table td", "font-size", "9pt").addStyle(".bordered-table .acro-table td", "padding", "0 3pt").addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none").addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0").addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt").addStyle(".score-breakdown th", "text-align", "right").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown", "width", "50pt").addStyle(".advances-header", "background-color", "#ddd").addStyle(".total-score", "font-weight", "bold");
        }
    }, {
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                table: PT.arrayOf(PT.shape({
                    advances: PT.bool.isRequired,
                    run: PT.shape({
                        id: PT.number.isRequired,
                        performed: PT.bool.isRequired
                    }).isRequired
                }).isRequired).isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired,
                    next_tour_id: PT.number,
                    discipline: PT.shape({
                        discipline_judges: PT.arrayOf(PT.shape({
                            role: PT.string.isRequired
                        }).isRequired).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return ResultsTable3;
}(React.Component);

exports.default = ResultsTable3;


ResultsTable3.displayName = "rules_sets_rosfarr_ResultsTable3";

},{"./ColumnsWidths":87,"./Row":94,"getJudgeTableMark":99,"l10n":100}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CacheMixin = function CacheMixin(Base) {
    return function (_Base) {
        _inherits(_class, _Base);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
        }

        _createClass(_class, [{
            key: "resetCache",
            value: function resetCache() {
                this._cache = {};
            }
        }, {
            key: "componentWillUpdate",
            value: function componentWillUpdate() {
                this.resetCache();
            }
        }, {
            key: "fetchFromCache",
            value: function fetchFromCache(key, generator) {
                if (!this._cache) {
                    this._cache = {};
                }
                if (!(key in this._cache)) {
                    this._cache[key] = generator();
                }
                return this._cache[key];
            }
        }]);

        return _class;
    }(Base);
};

exports.default = CacheMixin;

},{}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getParticipantDisplay;
function getParticipantDisplay(participant) {
    // eslint-disable-line react/display-name
    if (participant.formation_name !== "") {
        return React.createElement(
            "p",
            null,
            participant.formation_name
        );
    }
    return participant.sportsmen.map(function (s, idx) {
        return React.createElement(
            "p",
            { key: idx },
            s.last_name + " " + s.first_name
        );
    });
}

},{}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScoringType;
function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
        case "dance_judge":
            switch (scoring_system_name) {
                case "rosfarr.formation":
                    return "formation";
                case "rosfarr.formation_acro":
                    return "formation_acro";
                case "rosfarr.simplified":
                    return "simplified";
                case "rosfarr.am_final_fw":
                case "rosfarr.am_final_acro":
                    return "dance_halved";
                default:
                    return "dance";
            }
        case "acro_judge":
            switch (scoring_system_name) {
                case "rosfarr.am_final_fw":
                    return "dance_halved";
                default:
                    return "acro";
            }
        case "tech_judge":
            return "tech";
        case "head_judge":
            return "head";
    }
}

},{}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getJudgeTableMark(discipline_judge) {
    var result = discipline_judge.judge.number;
    if (discipline_judge.role === "acro_judge") {
        result += " (A)";
    }
    return result;
}

exports.default = getJudgeTableMark;

},{}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ru = require("./ru");

var _ru2 = _interopRequireDefault(_ru);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _ru2.default;

exports.default = _;

},{"./ru":101}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = translate;
function translate(src) {
    var PHRASES = {
        "admin": {
            "buttons": {
                "add_club": "Добавить клуб",
                "add_competition": "Создать соревнование",
                "add_competition_plan_item": "Добавить элемент",
                "add_discipline": "Добавить дисциплину",
                "add_judge": "Добавить судью",
                "add_participant": "Добавить участника",
                "add_tour": "Добавить тур",
                "confirm_score": "Зафиксировать",
                "docx_heats": "Заходы в DOCX",
                "docx_numbers": "Номера в DOCX",
                "docx_results": "Результаты в DOCX",
                "export": "Экспортировать",
                "import": "Импортировать",
                "launch_auto_printer": "Запуск автоматической печати",
                "load_acro": "Загрузить акробатику",
                "refresh_clients": "Перезагрузить все устройства",
                "reload_clients": "Обновить данные на всех устройствах",
                "switch_to_plan": "Сортировка по программе",
                "switch_to_disciplines": "Сортировка по дисциплинам",
                "to_start_page": "На главную",
                "unconfirm_score": "Отмена фиксации",
                "unfinalize": "Отменить финализацию"
            }
        },
        "tablet": {
            "acro_judge": {
                "fall_down": "Падения (-30)",
                "acro_n": function acro_n(n) {
                    return "Акробатика " + (n + 1);
                }
            },
            "alerts": {
                "has_unconfirmed_scores": "Имеются незафиксированные оценки судей в последнем заходе."
            },
            "buttons": {
                "finalize_tour": "Финализировать тур",
                "finalize_tour_and_start_next": "Финализировать тур и перейти к следующему",
                "next_heat": "След. заход",
                "not_performed": "Невыход на площадку",
                "performed": "Отмена невыхода на площадку",
                "prev_heat": "Пред. заход",
                "reset_stopwatch": "Сброс",
                "start_stopwatch": "Старт",
                "stop_stopwatch": "Стоп",
                "stop_tour": "Завершить тур",
                "stop_tour_and_start_next": "Завершить тур и перейти к следующему туру",
                "to_start_page": "На главную"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "finalize_tour_and_start_next": "Вы действительно хотите финализировать этот тур и перейти к следующему туру?",
                "stop_tour": "Вы действительно хотите остановить этот тур?",
                "stop_tour_and_start_next": "Вы действительно хотите перейти к следующему туру?"
            },
            "dance_judge": {
                "acrobatics": "Акробатика",
                "big_mistakes": "Большие ошибки (-30)",
                "composition": "Композиция",
                "dance_figs": "Танцевальные фигуры",
                "dance_tech": "Техника танцевания",
                "form_fall_down": "Падения (-3)",
                "form_mistakes": "Ошибки (-2)",
                "form_small_mistakes": "Маленькие ошибки (-2)",
                "form_big_mistakes": "Большие ошибки (-3)",
                "fw_man": "Основной ход, партнёр (сбавка в %)",
                "fw_woman": "Основной ход, партнёрша (сбавка в %)",
                "impression": "Общее впечатление",
                "points": "Оценка",
                "small_mistakes": "Маленькие ошибки (-5)"
            },
            "global": {
                "total_score": "Сумма баллов",
                "not_performing": "Не выступает",
                "judge_number": function judge_number(n) {
                    return "Судья №" + n;
                },
                "heat_number": function heat_number(n, t) {
                    return "Заход " + n + " из " + t;
                },
                "confirm_score": "Зафиксировать",
                "confirmed": "Зафиксировано",
                "mark_not_performed": "Невыход на площадку",
                "discard_not_performed": "Отмена невыхода на площадку"
            },
            "head_judge": {
                "acrobatic_overrides": "Корректировки акробатики",
                "black_card": "-100",
                "dance_judge_scores": "Оценки линейных судей",
                "ok": "OK",
                "penalty_type": "Штрафные санкции",
                "previous_penalties": "Предыдущие штрафы",
                "red_card": "-30",
                "yellow_card": "-3",
                "form_yellow_card": "-5",
                "form_red_card": "-15"
            },
            "tech_judge": {
                "jump_steps": "Основные ходы",
                "reset_to_n": function reset_to_n(n) {
                    return "Сброс на " + n;
                },
                "timing": "Длительность"
            },
            "pages": {
                "heats": "Заходы",
                "results": "Результаты",
                "actions": "Действия",
                "dancing": "Танец",
                "acro": "Акробатика"
            }
        },
        "results": {
            "breakdown": {
                "a": "A",
                "acro_n": function acro_n(n) {
                    return "A" + n;
                },
                "bm": "БО",
                "c": "К",
                "df": "ТФ",
                "dt": "ТT",
                "fd": "П",
                "fm": "ОХм",
                "fw": "ОХж",
                "i": "ОВ",
                "m": "Ош",
                "p": "М",
                "sm": "МО",
                "t": "Σ"
            },
            "headers": {
                "participants_advanced": "Прошли в следующий тур",
                "participants_not_advanced": "Не прошли в следующий тур",
                "participants_not_performed": "Не выступали"
            },
            "labels": {
                "acro_score": "Результат акро",
                "acrobatics": "Акробатика",
                "acrobatics_verbose": "Акробатика (заявка/факт)",
                "card": "Штраф",
                "fw_score": "Результат ТН",
                "fw_score_short": "ТН",
                "info": "Участник, результат",
                "next_tour": "Следующий тур",
                "not_performed": "Не принимал участие",
                "number": "№",
                "participant_club": "Клуб",
                "participant_coaches": "Тренеры",
                "participant_name": "Участник",
                "penalty": "Штраф главного судьи",
                "place": "Место",
                "sportsmen": "Спортсмены",
                "sportsmen_year_of_birth": "Г.р.",
                "sub": "зап",
                "total_score": "Итог"
            }
        },
        "global": {
            "buttons": {
                "submit": "Сохранить",
                "discard": "Отменить",
                "close": "Закрыть"
            },
            "labels": {
                "yes": "Да",
                "no": "Нет"
            },
            "phrases": {
                "participant_n": function participant_n(n, name, n_sp) {
                    if (n_sp > 2) {
                        var result = "Формейшн №" + n;
                        if (name) {
                            result += ": " + name;
                        }
                        return result;
                    }
                    return n_sp === 2 ? "Пара №" + n : "Участник №" + n;
                },
                "judge_n": function judge_n(n) {
                    return "Линейный судья №" + n;
                }
            }
        },
        "scoring_systems_names": {
            "rosfarr": {
                "base_name": "РосФАРР",
                "acro": "РосФАРР, акробатические программы",
                "am_final_acro": "РосФАРР, A и M классы, финал, акробатика",
                "am_final_fw": "РосФАРР, A и M классы, финал, техника ног",
                "formation": "РосФАРР, формейшн без акробатики",
                "formation_acro": "РосФАРР, формейшн с акробатикой",
                "no_acro": "РосФАРР, танцевальные программы",
                "simplified": "РосФАРР, упрощенная система (1–40)"
            }
        },
        "judge_roles": {
            "": "-",
            "acro_judge": "Судья акробатики",
            "dance_judge": "Судья танца",
            "head_judge": "Главный судья",
            "tech_judge": "Технический судья"
        }
    };

    var path = src.split(".");
    var phrase_ptr = PHRASES;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var chunk = _step.value;

            phrase_ptr = phrase_ptr[chunk];
            if (typeof phrase_ptr === "undefined") {
                console.error("Unable to find translation for " + src);
                return "";
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

    if (typeof phrase_ptr === "function") {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return phrase_ptr.apply(undefined, args);
    }
    return phrase_ptr;
}

translate.tour_name_suggestions = ["Финал", "Тур «Надежды»", "Отборочный тур", "1/2 финала", "1/4 финала", "1/8 финала", "1/16 финала", "Финал, техника ног", "Финал, акробатика"];

},{}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var meta = {
    "judge_roles": ["dance_judge", "acro_judge", "head_judge", "tech_judge"],
    "scoring_systems": ["rosfarr.no_acro", "rosfarr.acro", "rosfarr.formation", "rosfarr.formation_acro", "rosfarr.simplified", "rosfarr.am_final_fw", "rosfarr.am_final_acro"],
    "suggested_programs": ["default", "qualification", "quarterfinal", "final"]

};

exports.default = meta;

},{}],103:[function(require,module,exports){
"use strict";

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ResultsTable = require("ResultsTable1");

var _ResultsTable2 = _interopRequireDefault(_ResultsTable);

var _ResultsTable3 = require("ResultsTable2");

var _ResultsTable4 = _interopRequireDefault(_ResultsTable3);

var _ResultsTable5 = require("ResultsTable3");

var _ResultsTable6 = _interopRequireDefault(_ResultsTable5);

var _DisciplineResultsTable = require("DisciplineResultsTable");

var _DisciplineResultsTable2 = _interopRequireDefault(_DisciplineResultsTable);

var _JudgeTablet = require("JudgeTablet");

var _JudgeTablet2 = _interopRequireDefault(_JudgeTablet);

var _AdminScoreInput = require("AdminScoreInput");

var _AdminScoreInput2 = _interopRequireDefault(_AdminScoreInput);

var _getJudgeTableMark = require("getJudgeTableMark");

var _getJudgeTableMark2 = _interopRequireDefault(_getJudgeTableMark);

var _meta = require("meta");

var _meta2 = _interopRequireDefault(_meta);

var _HostModules = require("HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var response = window.registerRulesSet("RosFARR", {
    meta: _meta2.default,
    translate: _l10n2.default,
    tour_results_table_1: _ResultsTable2.default,
    tour_results_table_2: _ResultsTable4.default,
    tour_results_table_3: _ResultsTable6.default,
    discipline_results_table: _DisciplineResultsTable2.default,
    judge_tablet: _JudgeTablet2.default,
    admin_score_input: _AdminScoreInput2.default,
    get_judge_table_mark: _getJudgeTableMark2.default
});

(0, _HostModules.setup)(response);

},{"AdminScoreInput":24,"DisciplineResultsTable":25,"HostModules":26,"JudgeTablet":81,"ResultsTable1":83,"ResultsTable2":86,"ResultsTable3":95,"getJudgeTableMark":99,"l10n":100,"meta":102}]},{},[103])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcbGliXFxjb21tb25cXGRpYWxvZ3NcXHNob3dDb25maXJtLmpzeCIsInNyY1xcanN4XFxsaWJcXGNvbW1vblxcbWFrZUNsYXNzTmFtZS5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXEludGVnZXJJbnB1dC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXE51bWJlclNlbGVjdG9ySW5wdXQuanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxTZWxlY3RvcklucHV0XFxJdGVtLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcU2VsZWN0b3JJbnB1dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxTbGlkZXIuanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxvblRvdWNoRW5kT3JDbGljay5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXG9uVG91Y2hPckNsaWNrLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcQWNyb1Njb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcQ29uZmlybWF0aW9uQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcRGFuY2VIYWx2ZWRTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXERhbmNlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxGb3JtYXRpb25BY3JvU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxGb3JtYXRpb25TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEdlbmVyYWxFZGl0b3JcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxHZW5lcmFsRWRpdG9yXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEhlYWRKdWRnZUZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcSGVhZEp1ZGdlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxTaW1wbGlmaWVkU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxUZWNoSnVkZ2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXGdlblNjYWxlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXERpc2NpcGxpbmVSZXN1bHRzVGFibGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEhvc3RNb2R1bGVzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcRWxlbWVudHNcXEVsZW1lbnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxFbGVtZW50c1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxDb25maXJtYXRpb25CdXR0b24uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUhhbHZlZExheW91dFxcU2NvcmluZ0xheW91dFxcTWlzdGFrZXMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUhhbHZlZExheW91dFxcU2NvcmluZ0xheW91dFxcU2NvcmVQYXJ0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9vdGVyXFxGb290ZXJJdGVtLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9vdGVyXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uQWNyb0xheW91dFxcU2NvcmluZ0xheW91dFxcU2NvcmVQYXJ0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uQWNyb0xheW91dFxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxTY29yZVBhcnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcR2VuZXJhbExheW91dFxcUGFydGljaXBhbnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHZW5lcmFsTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdlbmVyYWxTY2FsZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdyaWQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEFjdGlvbnNQYWdlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXEFjcm9iYXRpY092ZXJyaWRlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTGluZUp1ZGdlc1Njb3Jlc1xcSXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxMaW5lSnVkZ2VzU2NvcmVzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxOb3RQZXJmb3JtZWRTd2l0Y2hcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXFBlbmFsdHlJbnB1dC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxQcmV2aW91c1BlbmFsdGllc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcVGVjaEp1ZGdlc1Njb3Jlc1xcSXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxUZWNoSnVkZ2VzU2NvcmVzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcUmVzdWx0c1BhZ2UuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZGVyLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcU2ltcGxpZmllZExheW91dFxcU2NvcmluZ0xheW91dC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcQWNyb1BhZ2VcXFNjb3JpbmdMYXlvdXRcXEVsZW1lbnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxTY29yaW5nTGF5b3V0XFxPdmVycmlkZUlucHV0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcRGFuY2luZ1BhZ2VcXFNjb3JpbmdMYXlvdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxTdG9wV2F0Y2guanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUb3RhbFNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTFcXFJvdy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlMVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTJcXENvbHVtbnNXaWR0aHMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTJcXFJvdy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlMlxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTNcXENvbHVtbnNXaWR0aHMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTNcXFJvd1xcQWNyb1Njb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXERhbmNlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTNcXFJvd1xcRm9ybWF0aW9uQWNyb1Njb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEluZm9DZWxsLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXGZvcm1hdFNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxDYWNoZU1peGluLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxjb21tb25cXGdldFBhcnRpY2lwYW50RGlzcGxheS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxnZXRTY29yaW5nVHlwZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcZ2V0SnVkZ2VUYWJsZU1hcmsuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGwxMG5cXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxsMTBuXFxydS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcbWV0YS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxccm9vdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7a0JDRWUsVUFBQyxPQUFELEVBQVUsTUFBVixFQUE2QztRQUEzQix5RUFBaUIscUJBQVU7O0FBQ3hELFdBQU8sS0FBSztBQUNSLGVBQU8sT0FBUDtBQUNBLG1CQUFXLEtBQVg7QUFDQSwwQkFBa0IsSUFBbEI7QUFDQSwyQkFBbUIsb0JBQUUsbUJBQUYsQ0FBbkI7QUFDQSwwQkFBa0Isb0JBQUUsa0JBQUYsQ0FBbEI7QUFDQSx3QkFBZ0IsZ0JBQWhCO0tBTkcsRUFPSixNQVBJLENBQVAsQ0FEd0Q7Q0FBN0M7Ozs7Ozs7O2tCQ0ZTO0FBQVQsU0FBUyxhQUFULENBQXVCLElBQXZCLEVBQTZCO0FBQ3hDLFdBQU8sT0FBTyxJQUFQLENBQVksSUFBWixFQUNGLE1BREUsQ0FDSztlQUFNLEtBQUssRUFBTDtLQUFOLENBREwsQ0FFRixJQUZFLENBRUcsR0FGSCxDQUFQLENBRHdDO0NBQTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0lNOzs7Ozs7Ozs7Ozs7Ozs4TUFpQmpCLGNBQWMsWUFBTTtBQUNoQixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLHVCQURxQjthQUF6QjtBQUdBLGdCQUFJLE1BQUssS0FBTCxDQUFXLFVBQVgsRUFBdUI7QUFDdkIsc0JBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsRUFBQyxTQUFTLENBQUMsQ0FBRCxFQUE5QixFQUR1QjthQUEzQixNQUVPO0FBQ0gsc0JBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixDQUFuQixDQUFwQixDQURHO2FBRlA7U0FKVSxRQVVkLGFBQWEsWUFBTTtBQUNmLGdCQUFJLE1BQUssS0FBTCxDQUFXLFFBQVgsRUFBcUI7QUFDckIsdUJBRHFCO2FBQXpCO0FBR0EsZ0JBQUksTUFBSyxLQUFMLENBQVcsVUFBWCxFQUF1QjtBQUN2QixzQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixFQUFDLFNBQVMsQ0FBVCxFQUFyQixFQUR1QjthQUEzQixNQUVPO0FBQ0gsc0JBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixDQUFuQixDQUFwQixDQURHO2FBRlA7U0FKUzs7O2lCQTNCSTs7dUNBdUNGO0FBQ1gsbUJBQU8sNkJBQWM7QUFDakIsZ0NBQWdCLElBQWhCO0FBQ0EsNkJBQWEsS0FBSyxLQUFMLENBQVcsUUFBWDthQUZWLENBQVAsQ0FEVzs7OztpQ0FNTjtBQUNMLG1CQUNJOztrQkFBSyxXQUFZLEtBQUssWUFBTCxFQUFaLEVBQUw7Z0JBQ0k7OztBQUNJLG1DQUFVLGdCQUFWO3VCQUNLLDhCQUFlLEtBQUssV0FBTCxFQUZ4Qjs7aUJBREo7Z0JBT0k7O3NCQUFLLFdBQVUsT0FBVixFQUFMO29CQUNNLEtBQUssS0FBTCxDQUFXLEtBQVg7aUJBUlY7Z0JBVUk7OztBQUNJLG1DQUFVLGVBQVY7dUJBQ0ssOEJBQWUsS0FBSyxVQUFMLEVBRnhCOztpQkFWSjthQURKLENBREs7Ozs7NEJBNUNjO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCwwQkFBVSxHQUFHLElBQUg7QUFDViw0QkFBWSxHQUFHLElBQUg7QUFDWix1QkFBTyxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1AsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjthQUpkLENBRm1COzs7OzRCQVNHO0FBQ3RCLG1CQUFPO0FBQ0gsMEJBQVUsS0FBVjtBQUNBLDRCQUFZLEtBQVo7YUFGSixDQURzQjs7OztXQVZUO0VBQXFCLE1BQU0sU0FBTjs7a0JBQXJCOzs7QUFvRXJCLGFBQWEsV0FBYixHQUEyQix3QkFBM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3RFcUI7Ozs7Ozs7Ozs7O29DQWlCTCxLQUFLLEtBQUssTUFBTSxjQUFjO0FBQ3RDLGdCQUFJLFNBQVMsRUFBVCxDQURrQztBQUV0QyxpQkFBSyxJQUFJLFFBQVEsR0FBUixFQUFhLFNBQVMsR0FBVCxFQUFjLFNBQVMsSUFBVCxFQUFlO0FBQy9DLG9CQUFNLE9BQU8sTUFBTSxPQUFOLENBQWMsWUFBZCxDQUFQLENBRHlDO0FBRS9DLHVCQUFPLElBQVAsQ0FBWSxDQUFDLE9BQU8sSUFBUCxDQUFELEVBQWUsSUFBZixDQUFaLEVBRitDO2FBQW5EO0FBSUEsbUJBQU8sTUFBUCxDQU5zQzs7OztpQ0FTakM7eUJBQ21ELEtBQUssS0FBTCxDQURuRDtnQkFDRyxpQkFESDtnQkFDUSxpQkFEUjtnQkFDYSxtQkFEYjtnQkFDbUIsaUNBRG5COztnQkFDbUMsc0ZBRG5DOztBQUVMLG1CQUNJO0FBQ0kseUJBQVUsS0FBSyxXQUFMLENBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLEVBQTJCLElBQTNCLEVBQWlDLFdBQWpDLENBQVY7ZUFDSyxZQUZULENBREosQ0FGSzs7Ozs0QkF6QmM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHFCQUFLLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDTCxxQkFBSyxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ0wsc0JBQU0sR0FBRyxNQUFIO0FBQ04sNkJBQWEsR0FBRyxNQUFIO2FBSmpCLENBRm1COzs7OzRCQVNHO0FBQ3RCLG1CQUFPO0FBQ0gsc0JBQU0sQ0FBTjtBQUNBLDZCQUFhLENBQWI7YUFGSixDQURzQjs7OztXQVZUO0VBQTRCLE1BQU0sU0FBTjs7a0JBQTVCOzs7QUFxQ3JCLG9CQUFvQixXQUFwQixHQUFrQywrQkFBbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkNxQjs7Ozs7Ozs7Ozs7Ozs7c01BZ0JqQixjQUFjLFlBQU07QUFDaEIsZ0JBQUksTUFBSyxLQUFMLENBQVcsUUFBWCxFQUFxQjtBQUNyQix1QkFEcUI7YUFBekI7QUFHQSxrQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQW5CLENBSmdCO1NBQU47OztpQkFoQkc7O3VDQXVCRjtBQUNYLG1CQUFPLDZCQUFjO0FBQ2pCLHdCQUFRLElBQVI7QUFDQSw2QkFBYSxJQUFiO0FBQ0EsMEJBQVUsS0FBSyxLQUFMLENBQVcsTUFBWDtBQUNWLDZCQUFhLEtBQUssS0FBTCxDQUFXLFFBQVg7YUFKVixDQUFQLENBRFc7Ozs7aUNBUU47QUFDTCxtQkFDSTs7O0FBQ0ksK0JBQVksS0FBSyxZQUFMLEVBQVo7bUJBQ0ssOEJBQWUsS0FBSyxXQUFMLEVBRnhCO2dCQUlNLEtBQUssS0FBTCxDQUFXLElBQVg7YUFMVixDQURLOzs7OzRCQTlCYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsd0JBQVEsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNSLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDVixzQkFBTSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ04sdUJBQU8sR0FBRyxTQUFILENBQWEsQ0FDaEIsR0FBRyxNQUFILENBQVUsVUFBVixFQUNBLEdBQUcsTUFBSCxDQUFVLFVBQVYsRUFDQSxHQUFHLElBQUgsQ0FBUSxVQUFSLENBSEcsQ0FBUDtBQUtBLHlCQUFTLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFUYixDQUZtQjs7OztXQUROO0VBQWEsTUFBTSxTQUFOOztrQkFBYjs7O0FBMkNyQixLQUFLLFdBQUwsR0FBbUIsOEJBQW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDM0NxQjs7Ozs7Ozs7Ozs7MENBZ0NDO0FBQ2QsZ0JBQUksS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixNQUFyQixFQUE2QjtBQUM3Qix1QkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRHNCO2FBQWpDO0FBR0EsbUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixDQUpPOzs7O3VDQU9IO0FBQ1gsbUJBQU87QUFDSCxpQ0FBaUIsSUFBakI7QUFDQSwyQkFBVyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFdBQXJCO0FBQ1gsNEJBQVksS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixXQUFyQjtBQUNaLDRCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsSUFBckI7c0JBQ04sS0FBSyxlQUFMLElBQTJCLEtBTDlCLENBQVAsQ0FEVzs7OztxQ0FTRjtBQUNULGdCQUFJLFNBQVMsRUFBVCxDQURLO0FBRVQsaUJBQUssSUFBSSxNQUFNLENBQU4sRUFBUyxNQUFNLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsRUFBMkIsRUFBRSxHQUFGLEVBQU87QUFDdEQsb0JBQ0ksS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixNQUFyQixJQUNBLFFBQVEsQ0FBUixJQUNBLE1BQU0sS0FBSyxLQUFMLENBQVcsT0FBWCxLQUF1QixDQUE3QixFQUNGO0FBQ0UsMkJBQU8sSUFBUCxDQUNJLDRCQUFJLFlBQVcsR0FBWCxFQUFKLENBREosRUFERjtpQkFKRjs7d0RBU3NCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsR0FBbkIsTUFWZ0M7O29CQVUvQyw4QkFWK0M7b0JBVXhDLDZCQVZ3Qzs7QUFXdEQsdUJBQU8sSUFBUCxDQUNJO0FBQ0ksNEJBQVMsVUFBVSxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ25CLHlCQUFNLEdBQU47QUFDQSw4QkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsMEJBQU8sSUFBUDtBQUNBLDJCQUFRLEtBQVI7QUFDQSw2QkFBVSxLQUFLLEtBQUwsQ0FBVyxRQUFYO2lCQU5kLENBREosRUFYc0Q7YUFBMUQ7QUFzQkEsbUJBQU8sTUFBUCxDQXhCUzs7OztpQ0EwQko7QUFDTCxtQkFDSTs7a0JBQUssV0FBWSxLQUFLLFlBQUwsRUFBWixFQUFMO2dCQUNNLEtBQUssVUFBTCxFQUROO2FBREosQ0FESzs7Ozs0QkF6RWM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHlCQUFTLEdBQUcsT0FBSCxDQUNMLEdBQUcsT0FBSCxDQUNJLEdBQUcsU0FBSCxDQUFhLENBQ1QsR0FBRyxNQUFILENBQVUsVUFBVixFQUNBLEdBQUcsTUFBSCxDQUFVLFVBQVYsRUFDQSxHQUFHLElBQUgsQ0FBUSxVQUFSLENBSEosQ0FESixDQURLLEVBUVAsVUFSTztBQVNULDBCQUFVLEdBQUcsSUFBSDtBQUNWLHlCQUFTLEdBQUcsTUFBSDtBQUNULHVCQUFPLEdBQUcsS0FBSCxDQUFTLENBQUMsTUFBRCxFQUFTLFVBQVQsRUFBcUIsV0FBckIsQ0FBVCxDQUFQO0FBQ0EsdUJBQU8sR0FBRyxTQUFILENBQWEsQ0FDaEIsR0FBRyxNQUFILENBQVUsVUFBVixFQUNBLEdBQUcsTUFBSCxDQUFVLFVBQVYsRUFDQSxHQUFHLElBQUgsQ0FBUSxVQUFSLENBSEcsQ0FBUDtBQUtBLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFsQmQsQ0FGbUI7Ozs7NEJBdUJHO0FBQ3RCLG1CQUFPO0FBQ0gsMEJBQVUsS0FBVjtBQUNBLHlCQUFTLEVBQVQ7QUFDQSx1QkFBTyxVQUFQO2FBSEosQ0FEc0I7Ozs7V0F4QlQ7RUFBc0IsTUFBTSxTQUFOOztrQkFBdEI7OztBQW1GckIsY0FBYyxXQUFkLEdBQTRCLHlCQUE1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNyRnNCOzs7Ozs0QkFDSztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsc0JBQU0sR0FBRyxJQUFILENBQVEsVUFBUjtBQUNOLDBCQUFVLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDViwyQkFBVyxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1gsNEJBQVksR0FBRyxJQUFILENBQVEsVUFBUjthQUpoQixDQUZtQjs7OztBQVV2QixhQVhrQixNQVdsQixDQUFZLEtBQVosRUFBbUI7OEJBWEQsUUFXQzs7MkVBWEQsbUJBWVIsUUFEUzs7Y0FvRG5CLGNBQWMsWUFBTTtBQUNoQixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUI7QUFDeEMsdUJBRHdDO2FBQTVDO0FBR0Esa0JBQUssUUFBTCxDQUFjO0FBQ1YsMEJBQVUsR0FBVjtBQUNBLHVCQUFPLEtBQVA7QUFDQSwwQkFBVSxJQUFWO2FBSEosRUFKZ0I7QUFTaEIsa0JBQUssS0FBTCxDQUFXLFVBQVgsR0FUZ0I7U0FBTixDQXBESzs7Y0ErRG5CLG1CQUFtQixVQUFDLEtBQUQsRUFBVztBQUMxQixrQkFBTSxjQUFOLEdBRDBCO0FBRTFCLGdCQUFJLE1BQUssS0FBTCxDQUFXLFFBQVgsSUFBdUIsTUFBSyxLQUFMLENBQVcsSUFBWCxFQUFpQjtBQUN4Qyx1QkFEd0M7YUFBNUM7QUFHQSxrQkFBSyxHQUFMLEdBQVcsTUFBSyxnQkFBTCxDQUFzQixLQUF0QixDQUFYLENBTDBCO0FBTTFCLGtCQUFLLFFBQUwsQ0FBYztBQUNWLDBCQUFVLE1BQUssWUFBTCxDQUFrQixLQUFsQixDQUFWO0FBQ0EsdUJBQU8sSUFBUDthQUZKLEVBTjBCO1NBQVgsQ0EvREE7O2NBMEVuQixrQkFBa0IsVUFBQyxLQUFELEVBQVc7QUFDekIsa0JBQU0sY0FBTixHQUR5QjtBQUV6QixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUI7QUFDeEMsdUJBRHdDO2FBQTVDO0FBR0Esa0JBQUssUUFBTCxDQUFjO0FBQ1YsMEJBQVUsTUFBSyxZQUFMLENBQWtCLEtBQWxCLENBQVY7YUFESixFQUx5QjtTQUFYLENBMUVDOztjQW1GbkIsaUJBQWlCLFVBQUMsS0FBRCxFQUFXO0FBQ3hCLGtCQUFNLGNBQU4sR0FEd0I7QUFFeEIsZ0JBQUksTUFBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixNQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ3hDLHVCQUR3QzthQUE1QztBQUdBLGdCQUFJLE1BQUssS0FBTCxDQUFXLFFBQVgsS0FBd0IsR0FBeEIsRUFBNkI7QUFDN0Isc0JBQUssUUFBTCxDQUFjO0FBQ1YsOEJBQVUsQ0FBVjtBQUNBLDhCQUFVLElBQVY7QUFDQSwyQkFBTyxLQUFQO2lCQUhKLEVBRDZCO0FBTTdCLHNCQUFLLEtBQUwsQ0FBVyxVQUFYLEdBTjZCO2FBQWpDLE1BT087QUFDSCxzQkFBSyxRQUFMLENBQWM7QUFDViw4QkFBVSxDQUFWO0FBQ0EsMkJBQU8sS0FBUDtpQkFGSixFQURHO2FBUFA7U0FMYSxDQW5GRTs7QUFFZixjQUFLLEtBQUwsR0FBYTtBQUNULHNCQUFVLENBQVY7QUFDQSxtQkFBTyxLQUFQO0FBQ0Esc0JBQVUsS0FBVjtTQUhKLENBRmU7QUFPZixjQUFLLEdBQUwsR0FBVyxJQUFYLENBUGU7O0tBQW5COztpQkFYa0I7OzRDQXFCRSxXQUFXO0FBQzNCLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixVQUFVLElBQVYsRUFBZ0I7QUFDcEMscUJBQUssUUFBTCxDQUFjO0FBQ1YsOEJBQVUsS0FBVjtpQkFESixFQURvQzthQUF4Qzs7OztpQ0FPSztBQUNMLG1CQUFPLENBQUMsS0FBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixDQUFDLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBbUIsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBRDVDOzs7OzhDQUlhO0FBQ2xCLGdCQUFJLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBcUI7QUFDckIsdUJBQU8sQ0FBUCxDQURxQjthQUF6QjtBQUdBLGdCQUFJLFFBQVEsS0FBSyxHQUFMLENBQVMsS0FBSyxHQUFMLENBQVMsTUFBTSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLENBQXBDLENBQVQsRUFBaUQsR0FBakQsQ0FBUixDQUpjO0FBS2xCLG1CQUFPLENBQUMsUUFBUSxHQUFSLENBQUQsQ0FBYyxPQUFkLENBQXNCLENBQXRCLENBQVAsQ0FMa0I7Ozs7eUNBT0wsU0FBUztBQUN0QixnQkFBSSxNQUFNLENBQU4sQ0FEa0I7QUFFdEIsbUJBQU8sT0FBUCxFQUFnQjtBQUNaLHVCQUFPLFFBQVEsVUFBUixJQUFzQixDQUF0QixDQURLO0FBRVosMEJBQVUsUUFBUSxVQUFSLENBRkU7YUFBaEI7QUFJQSxtQkFBTyxHQUFQLENBTnNCOzs7O2lDQVFqQixPQUFPO0FBQ1osZ0JBQUksUUFBUSxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQVIsQ0FEUTtBQUVaLGdCQUFJLFNBQVMsTUFBTSxNQUFOLENBQWEsVUFBYixDQUZEO0FBR1osbUJBQU8sTUFBTSxLQUFOLEdBQWMsS0FBSyxnQkFBTCxDQUFzQixNQUF0QixDQUFkLENBSEs7Ozs7eUNBS0MsT0FBTztBQUNwQixnQkFBSSxRQUFRLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBUixDQURnQjtBQUVwQixnQkFBSSxTQUFTLE1BQU0sTUFBTixDQUZPO0FBR3BCLG1CQUFPLE1BQU0sS0FBTixHQUFjLEtBQUssZ0JBQUwsQ0FBc0IsTUFBdEIsQ0FBZCxDQUhhOzs7O3FDQUtYLE9BQU87QUFDaEIsZ0JBQUksTUFBTSxLQUFLLFFBQUwsQ0FBYyxLQUFkLElBQXVCLEtBQUssR0FBTCxDQURqQjtBQUVoQixtQkFBTyxLQUFLLEdBQUwsQ0FBUyxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsQ0FBZCxDQUFULEVBQTJCLEdBQTNCLENBQVAsQ0FGZ0I7Ozs7cUNBd0RQO0FBQ1QsZ0JBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQjtBQUNqQix1QkFDSTs7O0FBQ0ksbUNBQVksV0FBWjtBQUNBLCtCQUFRLEVBQUUsT0FBTyxrQkFBUCxFQUFWO3FCQUZKO29CQUlNLEtBQUssS0FBTCxDQUFXLFFBQVg7aUJBTFYsQ0FEaUI7YUFBckIsTUFTTztBQUNILHVCQUNJOzs7QUFDSSxtQ0FBWSw2QkFBYyxFQUFFLGNBQWUsSUFBZixFQUFxQixRQUFRLEtBQUssTUFBTCxFQUFSLEVBQXJDLENBQVo7QUFDQSwrQkFBUSxFQUFFLDZCQUEyQixLQUFLLG1CQUFMLFFBQTNCLEVBQVY7cUJBRko7b0JBSU0sS0FBSyxLQUFMLENBQVcsU0FBWDtpQkFMVixDQURHO2FBVFA7Ozs7aUNBb0JLO0FBQ0wsbUJBQ0k7O2tCQUFLLFdBQVUsUUFBVixFQUFMO2dCQUNJOztzQkFBSyxXQUFZLDZCQUFjLEVBQUUsU0FBUyxJQUFULEVBQWUsUUFBUSxLQUFLLE1BQUwsRUFBUixFQUEvQixDQUFaO0FBQ0QsK0JBQVEsRUFBRSxNQUFNLElBQUMsQ0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQXVCLE9BQTNDLEdBQXdELEtBQUssS0FBTCxDQUFXLFFBQVgsT0FBeEQsRUFBaEI7QUFDQSxpQ0FBVSxLQUFLLFdBQUw7QUFDVixvQ0FBYSxLQUFLLGNBQUw7QUFDYixxQ0FBYyxLQUFLLGVBQUw7QUFDZCxzQ0FBZSxLQUFLLGdCQUFMO3FCQUxuQjs7aUJBREo7Z0JBVU0sS0FBSyxVQUFMLEVBVk47YUFESixDQURLOzs7O1dBdklTO0VBQWUsTUFBTSxTQUFOOztrQkFBZjs7O0FBeUp0QixPQUFPLFdBQVAsR0FBcUIsa0JBQXJCOzs7Ozs7OztrQkMzSndCO0FBQVQsU0FBUyxpQkFBVCxDQUEyQixPQUEzQixFQUFvQztBQUMvQyxRQUFJLFdBQVcsb0JBQU0sRUFBTixDQURnQztBQUUvQyxRQUFJLFdBQVcsQ0FBWCxDQUYyQztBQUcvQyxRQUFJLGFBQWEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFiLENBSDJDO0FBSS9DLFFBQUksT0FBTyxTQUFQLElBQU8sQ0FBQyxLQUFELEVBQVc7QUFDbEIsY0FBTSxjQUFOLEdBRGtCO0FBRWxCLGVBQU8sVUFBUCxDQUZrQjtLQUFYLENBSm9DO0FBUS9DLFFBQUksVUFBVSxTQUFWLE9BQVUsR0FBTTtBQUNoQixtQkFBVyxvQkFBTSxFQUFOLENBREs7S0FBTixDQVJpQztBQVcvQyxRQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ2xCLFlBQUksY0FBYyxDQUFDLE1BQU0sT0FBTixDQUFjLENBQWQsRUFBaUIsS0FBakIsRUFBd0IsTUFBTSxPQUFOLENBQWMsQ0FBZCxFQUFpQixLQUFqQixDQUF2QyxDQURjO0FBRWxCLFlBQUksTUFBTSxTQUFOLEdBQU0sQ0FBQyxDQUFEO21CQUFPLElBQUksQ0FBSjtTQUFQLENBRlE7QUFHbEIsb0JBQVksS0FBSyxJQUFMLENBQVUsSUFBSSxZQUFZLENBQVosSUFBaUIsV0FBVyxDQUFYLENBQWpCLENBQUosR0FBc0MsSUFBSSxZQUFZLENBQVosSUFBaUIsV0FBVyxDQUFYLENBQWpCLENBQTFDLENBQXRCLENBSGtCO0FBSWxCLHFCQUFhLFdBQWIsQ0FKa0I7QUFLbEIsWUFBSSxXQUFXLEVBQVgsRUFBZTtBQUNmLHNCQURlO1NBQW5CO0tBTE8sQ0FYb0M7QUFvQi9DLFFBQUksUUFBUSxTQUFSLEtBQVEsQ0FBQyxLQUFELEVBQVc7QUFDbkIsbUJBQVcsT0FBWCxDQURtQjtBQUVuQixtQkFBVyxDQUFYLENBRm1CO0FBR25CLHFCQUFhLENBQUMsTUFBTSxPQUFOLENBQWMsQ0FBZCxFQUFpQixLQUFqQixFQUF3QixNQUFNLE9BQU4sQ0FBYyxDQUFkLEVBQWlCLEtBQWpCLENBQXRDLENBSG1CO0tBQVgsQ0FwQm1DO0FBeUIvQyxXQUFPO0FBQ0gsc0JBQWMsS0FBZDtBQUNBLG9CQUFZLElBQVo7QUFDQSxxQkFBYSxJQUFiO0FBQ0EsdUJBQWUsT0FBZjtBQUNBLGlCQUFTLE9BQVQ7S0FMSixDQXpCK0M7Q0FBcEM7Ozs7Ozs7O2tCQ0FTO0FBQVQsU0FBUyxjQUFULENBQXdCLE9BQXhCLEVBQWlDO0FBQzVDLFFBQUksSUFBSSxTQUFKLENBQUksQ0FBQyxLQUFELEVBQVc7QUFDZixjQUFNLGNBQU4sR0FEZTtBQUVmLGVBQU8sUUFBUSxLQUFSLENBQVAsQ0FGZTtLQUFYLENBRG9DO0FBSzVDLFdBQU87QUFDSCxzQkFBYyxDQUFkO0FBQ0EsaUJBQVMsQ0FBVDtLQUZKLENBTDRDO0NBQWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNHTTs7Ozs7Ozs7Ozs7Ozs7NE1Ba0JqQixtQkFBbUIsVUFBQyxJQUFELEVBQVU7QUFDekIsZ0JBQUksYUFBYSxNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLFVBQS9CLENBQTBDLEtBQTFDLEVBQWI7QUFEcUI7Ozs7O0FBRXpCLHFDQUFrQixPQUFPLElBQVAsQ0FBWSxJQUFaLDJCQUFsQixvR0FBcUM7d0JBQTFCLGtCQUEwQjs7QUFDakMsd0JBQUksSUFBSSxDQUFKLE1BQVcsR0FBWCxFQUFnQjtBQUNoQiw0QkFBTSxRQUFRLEtBQUssR0FBTCxDQUFSLENBRFU7QUFFaEIsbUNBQVcsU0FBUyxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQVQsQ0FBWCxJQUFxQyxVQUFVLEVBQVYsR0FBZSxDQUFDLENBQUQsR0FBSyxTQUFTLEtBQVQsQ0FBcEIsQ0FGckI7cUJBQXBCO2lCQURKOzs7Ozs7Ozs7Ozs7OzthQUZ5Qjs7QUFRekIsa0JBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0I7QUFDaEIsNEJBQVksVUFBWjtBQUNBLDBCQUFZLFNBQVMsS0FBSyxRQUFMLENBQXJCO2FBRkosRUFSeUI7U0FBVjs7O2lCQWxCRjs7a0NBZ0NQLEtBQUssT0FBTyxPQUFPO0FBQ3pCLGdCQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixHQUEvQixDQUFSLENBRG1CO0FBRXpCLG1CQUFPO0FBQ0gscUJBQUssR0FBTDtBQUNBLHVCQUFVLFdBQVY7QUFDQSx5QkFBUyxLQUFUO0FBQ0EsOEJBQWMsVUFBVSxJQUFWLEdBQWlCLEVBQWpCLEdBQXNCLE1BQU0sUUFBTixFQUF0QjthQUpsQixDQUZ5Qjs7OztpQ0FTcEI7OztBQUNMLGdCQUFJLFNBQVMsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixVQUEvQixDQUEwQyxHQUExQyxDQUE4QyxVQUFDLEdBQUQsRUFBTSxHQUFOO3VCQUFlO0FBQ3RFLCtCQUFTLEdBQVQ7QUFDQSxrQ0FBVyxNQUFNLENBQU4sT0FBWDtBQUNBLDZCQUFTLHdCQUFTLFlBQVQsQ0FBVDtBQUNBLGtDQUFjLE9BQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsVUFBL0IsQ0FBMEMsR0FBMUMsTUFBbUQsSUFBbkQsR0FDUixFQURRLEdBRVIsT0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixVQUEvQixDQUEwQyxHQUExQyxFQUErQyxRQUEvQyxFQUZROzthQUp5QyxDQUF2RCxDQURDO0FBU0wsbUJBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsRUFBaUMsd0JBQVMsU0FBVCxFQUFvQixFQUFFLEtBQUssR0FBTCxFQUF0QixDQUFqQyxDQUFaLEVBVEs7QUFVTCxtQkFDSTtBQUNJLHdCQUFTLE1BQVQ7QUFDQSwwQkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsMkJBQVksS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNaLDBCQUFXLEtBQUssZ0JBQUw7YUFKZixDQURKLENBVks7Ozs7NEJBeENjO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCx1QkFBTyxHQUFHLEtBQUgsQ0FBUztBQUNaLDBCQUFNLEdBQUcsS0FBSCxDQUFTO0FBQ1gsa0NBQVUsR0FBRyxLQUFILENBQVM7QUFDZix3Q0FBWSxHQUFHLE9BQUgsQ0FBVyxHQUFHLE1BQUgsQ0FBdkI7QUFDQSxzQ0FBWSxHQUFHLE1BQUg7eUJBRk4sRUFHUCxVQUhPO3FCQURSLEVBS0gsVUFMRztpQkFESCxFQU9KLFVBUEk7QUFRUCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YsMkJBQVcsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNYLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFYZCxDQUZtQjs7OztXQUROO0VBQW1CLE1BQU0sU0FBTjs7a0JBQW5COzs7QUE4RHJCLFdBQVcsV0FBWCxHQUF5QixzREFBekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDL0RxQjs7Ozs7Ozs7Ozs7dUNBUUY7QUFDWCxnQkFBSSxTQUFTLHFCQUFULENBRE87QUFFWCxzQkFBVSxLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLFlBQXZCLEdBQXNDLGdCQUF0QyxDQUZDO0FBR1gsbUJBQU8sTUFBUCxDQUhXOzs7O2lDQUtOO0FBQ0wsbUJBQ0k7OztBQUNJLCtCQUFZLEtBQUssWUFBTCxFQUFaO0FBQ0EsMEJBQUssUUFBTDtBQUNBLDZCQUFVLEtBQUssS0FBTCxDQUFXLG9CQUFYO2lCQUhkO2dCQUtNLEtBQUssS0FBTCxDQUFXLFNBQVgsR0FDSSxvQkFBRSwrQkFBRixDQURKLEdBRUksb0JBQUUsNkJBQUYsQ0FGSjthQU5WLENBREs7Ozs7NEJBWmM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILDJCQUFXLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDWCxzQ0FBc0IsR0FBRyxJQUFILENBQVEsVUFBUjthQUYxQixDQUZtQjs7OztXQUROO0VBQTJCLE1BQU0sU0FBTjs7a0JBQTNCOzs7QUE0QnJCLG1CQUFtQixXQUFuQixHQUFpQyw4REFBakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzNCcUI7Ozs7Ozs7Ozs7Ozs7O2tOQXFCakIsbUJBQW1CLFVBQUMsSUFBRCxFQUFVO0FBQ3pCLGtCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CO0FBQ2hCLDBCQUFnQixLQUFLLFVBQUwsTUFBd0IsRUFBeEIsR0FBNkIsSUFBN0IsR0FBb0MsV0FBVyxLQUFLLFFBQUwsQ0FBL0M7QUFDaEIsd0JBQWdCLEtBQUssUUFBTCxNQUF3QixFQUF4QixHQUE2QixJQUE3QixHQUFvQyxXQUFXLEtBQUssTUFBTCxDQUEvQztBQUNoQiw0QkFBZ0IsS0FBSyxZQUFMLE1BQXdCLEVBQXhCLEdBQTZCLElBQTdCLEdBQW9DLFdBQVcsS0FBSyxVQUFMLENBQS9DO0FBQ2hCLDZCQUFnQixLQUFLLGFBQUwsTUFBd0IsRUFBeEIsR0FBNkIsSUFBN0IsR0FBb0MsV0FBVyxLQUFLLFdBQUwsQ0FBL0M7QUFDaEIsZ0NBQWdCLFNBQVMsS0FBSyxjQUFMLENBQXpCO0FBQ0EsOEJBQWdCLFNBQVMsS0FBSyxZQUFMLENBQXpCO2FBTkosRUFEeUI7U0FBVjs7O2lCQXJCRjs7a0NBZ0NQLEtBQUssT0FBTyxPQUFPO0FBQ3pCLGdCQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixHQUEvQixDQUFSLENBRG1CO0FBRXpCLG1CQUFPO0FBQ0gscUJBQUssR0FBTDtBQUNBLHVCQUFVLFdBQVY7QUFDQSx5QkFBUyxLQUFUO0FBQ0EsOEJBQWMsVUFBVSxJQUFWLEdBQWlCLEVBQWpCLEdBQXNCLE1BQU0sUUFBTixFQUF0QjthQUpsQixDQUZ5Qjs7OztpQ0FVcEI7QUFDTCxtQkFDSTtBQUNJLHdCQUFTLENBQ0wsS0FBSyxTQUFMLENBQWUsVUFBZixFQUFpQyxJQUFqQyxFQUF1Qyx3QkFBUyxZQUFULENBQXZDLENBREssRUFFTCxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQWlDLElBQWpDLEVBQXVDLHdCQUFTLFlBQVQsQ0FBdkMsQ0FGSyxFQUdMLEtBQUssU0FBTCxDQUFlLFlBQWYsRUFBaUMsSUFBakMsRUFBdUMsd0JBQVMsVUFBVCxFQUFxQixFQUFFLEtBQUssSUFBTCxFQUFXLE1BQU0sR0FBTixFQUFsQyxDQUF2QyxDQUhLLEVBSUwsS0FBSyxTQUFMLENBQWUsYUFBZixFQUFpQyxHQUFqQyxFQUF1Qyx3QkFBUyxVQUFULEVBQXFCLEVBQUUsS0FBSyxFQUFMLEVBQVcsTUFBTSxHQUFOLEVBQWxDLENBQXZDLENBSkssRUFLTCxLQUFLLFNBQUwsQ0FBZSxnQkFBZixFQUFpQyxJQUFqQyxFQUF1Qyx3QkFBUyxTQUFULEVBQXFCLEVBQUUsS0FBSyxHQUFMLEVBQXZCLENBQXZDLENBTEssRUFNTCxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQWlDLElBQWpDLEVBQXVDLHdCQUFTLFNBQVQsRUFBcUIsRUFBRSxLQUFLLEdBQUwsRUFBdkIsQ0FBdkMsQ0FOSyxDQUFUO0FBUUEsMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDJCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWiwwQkFBVyxLQUFLLGdCQUFMO2FBWGYsQ0FESixDQURLOzs7OzRCQXpDYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2Ysc0NBQWdCLEdBQUcsTUFBSDtBQUNoQixvQ0FBZ0IsR0FBRyxNQUFIO0FBQ2hCLHdDQUFnQixHQUFHLE1BQUg7QUFDaEIseUNBQWdCLEdBQUcsTUFBSDtBQUNoQiw0Q0FBZ0IsR0FBRyxNQUFIO0FBQ2hCLDBDQUFnQixHQUFHLE1BQUg7eUJBTlYsRUFPUCxVQVBPO3FCQURSLEVBU0gsVUFURztpQkFESCxFQVdKLFVBWEk7QUFZUCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YsMkJBQVcsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNYLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFmZCxDQUZtQjs7OztXQUROO0VBQXlCLE1BQU0sU0FBTjs7a0JBQXpCOzs7QUE2RHJCLGlCQUFpQixXQUFqQixHQUErQiw0REFBL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzdEcUI7Ozs7Ozs7Ozs7Ozs7OzRNQXFCakIsbUJBQW1CLFVBQUMsSUFBRCxFQUFVO0FBQ3pCLGtCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CO0FBQ2hCLDBCQUFnQixLQUFLLFVBQUwsTUFBd0IsRUFBeEIsR0FBNkIsSUFBN0IsR0FBb0MsU0FBUyxLQUFLLFFBQUwsQ0FBN0M7QUFDaEIsd0JBQWdCLEtBQUssUUFBTCxNQUF3QixFQUF4QixHQUE2QixJQUE3QixHQUFvQyxTQUFTLEtBQUssTUFBTCxDQUE3QztBQUNoQiw0QkFBZ0IsS0FBSyxZQUFMLE1BQXdCLEVBQXhCLEdBQTZCLElBQTdCLEdBQW9DLFNBQVMsS0FBSyxVQUFMLENBQTdDO0FBQ2hCLDZCQUFnQixLQUFLLGFBQUwsTUFBd0IsRUFBeEIsR0FBNkIsSUFBN0IsR0FBb0MsU0FBUyxLQUFLLFdBQUwsQ0FBN0M7QUFDaEIsZ0NBQWdCLFNBQVMsS0FBSyxjQUFMLENBQXpCO0FBQ0EsOEJBQWdCLFNBQVMsS0FBSyxZQUFMLENBQXpCO2FBTkosRUFEeUI7U0FBVjs7O2lCQXJCRjs7a0NBZ0NQLEtBQUssT0FBTyxPQUFPO0FBQ3pCLGdCQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixHQUEvQixDQUFSLENBRG1CO0FBRXpCLG1CQUFPO0FBQ0gscUJBQUssR0FBTDtBQUNBLHVCQUFVLFdBQVY7QUFDQSx5QkFBUyxLQUFUO0FBQ0EsOEJBQWMsVUFBVSxJQUFWLEdBQWlCLEVBQWpCLEdBQXNCLE1BQU0sUUFBTixFQUF0QjthQUpsQixDQUZ5Qjs7OztpQ0FVcEI7QUFDTCxtQkFDSTtBQUNJLHdCQUFTLENBQ0wsS0FBSyxTQUFMLENBQWUsVUFBZixFQUFpQyxJQUFqQyxFQUF1Qyx3QkFBUyxZQUFULENBQXZDLENBREssRUFFTCxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQWlDLElBQWpDLEVBQXVDLHdCQUFTLFlBQVQsQ0FBdkMsQ0FGSyxFQUdMLEtBQUssU0FBTCxDQUFlLFlBQWYsRUFBaUMsSUFBakMsRUFBdUMsd0JBQVMsVUFBVCxFQUFxQixFQUFFLEtBQUssRUFBTCxFQUF2QixDQUF2QyxDQUhLLEVBSUwsS0FBSyxTQUFMLENBQWUsYUFBZixFQUFpQyxHQUFqQyxFQUF1Qyx3QkFBUyxVQUFULEVBQXFCLEVBQUUsS0FBSyxFQUFMLEVBQXZCLENBQXZDLENBSkssRUFLTCxLQUFLLFNBQUwsQ0FBZSxnQkFBZixFQUFpQyxJQUFqQyxFQUF1Qyx3QkFBUyxTQUFULEVBQXFCLEVBQUUsS0FBSyxHQUFMLEVBQXZCLENBQXZDLENBTEssRUFNTCxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQWlDLElBQWpDLEVBQXVDLHdCQUFTLFNBQVQsRUFBcUIsRUFBRSxLQUFLLEdBQUwsRUFBdkIsQ0FBdkMsQ0FOSyxDQUFUO0FBUUEsMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDJCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWiwwQkFBVyxLQUFLLGdCQUFMO2FBWGYsQ0FESixDQURLOzs7OzRCQXpDYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2Ysc0NBQWdCLEdBQUcsTUFBSDtBQUNoQixvQ0FBZ0IsR0FBRyxNQUFIO0FBQ2hCLHdDQUFnQixHQUFHLE1BQUg7QUFDaEIseUNBQWdCLEdBQUcsTUFBSDtBQUNoQiw0Q0FBZ0IsR0FBRyxNQUFIO0FBQ2hCLDBDQUFnQixHQUFHLE1BQUg7eUJBTlYsRUFPUCxVQVBPO3FCQURSLEVBU0gsVUFURztpQkFESCxFQVdKLFVBWEk7QUFZUCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YsMkJBQVcsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNYLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFmZCxDQUZtQjs7OztXQUROO0VBQW1CLE1BQU0sU0FBTjs7a0JBQW5COzs7QUE2RHJCLFdBQVcsV0FBWCxHQUF5QixzREFBekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzdEcUI7Ozs7Ozs7Ozs7Ozs7O2dOQXNCakIsbUJBQW1CLFVBQUMsSUFBRCxFQUFVO0FBQ3pCLGtCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CO0FBQ2hCLDRCQUFnQixLQUFLLFlBQUwsTUFBdUIsRUFBdkIsR0FBNEIsSUFBNUIsR0FBbUMsV0FBVyxLQUFLLFVBQUwsQ0FBOUM7QUFDaEIsNEJBQWdCLEtBQUssWUFBTCxNQUF1QixFQUF2QixHQUE0QixJQUE1QixHQUFtQyxXQUFXLEtBQUssVUFBTCxDQUE5QztBQUNoQiw0QkFBZ0IsS0FBSyxZQUFMLE1BQXVCLEVBQXZCLEdBQTRCLElBQTVCLEdBQW1DLFdBQVcsS0FBSyxVQUFMLENBQTlDO0FBQ2hCLDRCQUFnQixLQUFLLFlBQUwsTUFBdUIsRUFBdkIsR0FBNEIsSUFBNUIsR0FBbUMsV0FBVyxLQUFLLFVBQUwsQ0FBOUM7QUFDaEIsOEJBQWdCLFNBQVMsS0FBSyxZQUFMLENBQXpCO0FBQ0EsZ0NBQWdCLFNBQVMsS0FBSyxjQUFMLENBQXpCO2FBTkosRUFEeUI7U0FBVjs7O2lCQXRCRjs7a0NBaUNQLEtBQUssT0FBTyxPQUFPO0FBQ3pCLGdCQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixHQUEvQixDQUFSLENBRG1CO0FBRXpCLG1CQUFPO0FBQ0gscUJBQUssR0FBTDtBQUNBLHVCQUFVLFdBQVY7QUFDQSx5QkFBUyxLQUFUO0FBQ0EsOEJBQWMsVUFBVSxJQUFWLEdBQWlCLEVBQWpCLEdBQXNCLE1BQU0sUUFBTixFQUF0QjthQUpsQixDQUZ5Qjs7OztpQ0FVcEI7QUFDTCxtQkFDSTtBQUNJLHdCQUFTLENBQ0wsS0FBSyxTQUFMLENBQWUsWUFBZixFQUFpQyxHQUFqQyxFQUF1Qyx3QkFBUyxVQUFULEVBQXFCLEVBQUUsS0FBSyxFQUFMLEVBQVMsTUFBTSxHQUFOLEVBQWhDLENBQXZDLENBREssRUFFTCxLQUFLLFNBQUwsQ0FBZSxZQUFmLEVBQWlDLElBQWpDLEVBQXVDLHdCQUFTLFVBQVQsRUFBcUIsRUFBRSxLQUFLLEVBQUwsRUFBUyxNQUFNLEdBQU4sRUFBaEMsQ0FBdkMsQ0FGSyxFQUdMLEtBQUssU0FBTCxDQUFlLFlBQWYsRUFBaUMsSUFBakMsRUFBdUMsd0JBQVMsVUFBVCxFQUFxQixFQUFFLEtBQUssRUFBTCxFQUFTLE1BQU0sR0FBTixFQUFoQyxDQUF2QyxDQUhLLEVBSUwsS0FBSyxTQUFMLENBQWUsWUFBZixFQUFpQyxHQUFqQyxFQUF1Qyx3QkFBUyxVQUFULEVBQXFCLEVBQUUsS0FBSyxFQUFMLEVBQVMsTUFBTSxHQUFOLEVBQWhDLENBQXZDLENBSkssRUFLTCxLQUFLLFNBQUwsQ0FBZSxnQkFBZixFQUFpQyxJQUFqQyxFQUF1Qyx3QkFBUyxTQUFULEVBQXFCLEVBQUUsS0FBSyxHQUFMLEVBQXZCLENBQXZDLENBTEssRUFNTCxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQWlDLElBQWpDLEVBQXVDLHdCQUFTLFNBQVQsRUFBcUIsRUFBRSxLQUFLLEdBQUwsRUFBdkIsQ0FBdkMsQ0FOSyxDQUFUO0FBUUEsMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDJCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWiwwQkFBVyxLQUFLLGdCQUFMO2FBWGYsQ0FESixDQURLOzs7OzRCQTFDYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2Ysd0NBQWdCLEdBQUcsTUFBSDtBQUNoQix3Q0FBZ0IsR0FBRyxNQUFIO0FBQ2hCLHdDQUFnQixHQUFHLE1BQUg7QUFDaEIsd0NBQWdCLEdBQUcsTUFBSDtBQUNoQiw0Q0FBZ0IsR0FBRyxNQUFIO0FBQ2hCLDBDQUFnQixHQUFHLE1BQUg7eUJBTlYsRUFPUCxVQVBPO3FCQURSLEVBU0gsVUFURztpQkFESCxFQVdKLFVBWEk7QUFZUCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YsMkJBQVcsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNYLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFmZCxDQUZtQjs7OztXQUROO0VBQXVCLE1BQU0sU0FBTjs7a0JBQXZCOzs7QUE4RHJCLGVBQWUsV0FBZixHQUE2QiwwREFBN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzlEcUI7Ozs7Ozs7Ozs7Ozs7O2dOQW9CakIsbUJBQW1CLFVBQUMsSUFBRCxFQUFVO0FBQ3pCLGtCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CO0FBQ2hCLDRCQUFZLEtBQUssWUFBTCxNQUF1QixFQUF2QixHQUE0QixJQUE1QixHQUFtQyxXQUFXLEtBQUssVUFBTCxDQUE5QztBQUNaLDRCQUFZLEtBQUssWUFBTCxNQUF1QixFQUF2QixHQUE0QixJQUE1QixHQUFtQyxXQUFXLEtBQUssVUFBTCxDQUE5QztBQUNaLDRCQUFZLEtBQUssWUFBTCxNQUF1QixFQUF2QixHQUE0QixJQUE1QixHQUFtQyxXQUFXLEtBQUssVUFBTCxDQUE5QztBQUNaLDBCQUFZLFNBQVMsS0FBSyxjQUFMLENBQXJCO2FBSkosRUFEeUI7U0FBVjs7O2lCQXBCRjs7a0NBNkJQLEtBQUssT0FBTyxPQUFPO0FBQ3pCLGdCQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixHQUEvQixDQUFSLENBRG1CO0FBRXpCLG1CQUFPO0FBQ0gscUJBQUssR0FBTDtBQUNBLHVCQUFVLFdBQVY7QUFDQSx5QkFBUyxLQUFUO0FBQ0EsOEJBQWMsVUFBVSxJQUFWLEdBQWlCLEVBQWpCLEdBQXNCLE1BQU0sUUFBTixFQUF0QjthQUpsQixDQUZ5Qjs7OztpQ0FVcEI7QUFDTCxtQkFDSTtBQUNJLHdCQUFTLENBQ0wsS0FBSyxTQUFMLENBQWUsWUFBZixFQUE2QixJQUE3QixFQUFtQyx3QkFBUyxVQUFULEVBQXFCLEVBQUUsS0FBSyxFQUFMLEVBQVMsTUFBTSxHQUFOLEVBQWhDLENBQW5DLENBREssRUFFTCxLQUFLLFNBQUwsQ0FBZSxZQUFmLEVBQTZCLElBQTdCLEVBQW1DLHdCQUFTLFVBQVQsRUFBcUIsRUFBRSxLQUFLLEVBQUwsRUFBUyxNQUFNLEdBQU4sRUFBaEMsQ0FBbkMsQ0FGSyxFQUdMLEtBQUssU0FBTCxDQUFlLFlBQWYsRUFBNkIsR0FBN0IsRUFBbUMsd0JBQVMsVUFBVCxFQUFxQixFQUFFLEtBQUssRUFBTCxFQUFTLE1BQU0sR0FBTixFQUFoQyxDQUFuQyxDQUhLLEVBSUwsS0FBSyxTQUFMLENBQWUsVUFBZixFQUE2QixHQUE3QixFQUFtQyx3QkFBUyxTQUFULEVBQXFCLEVBQUUsS0FBSyxHQUFMLEVBQXZCLENBQW5DLENBSkssQ0FBVDtBQU1BLDBCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCwyQkFBWSxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ1osMEJBQVcsS0FBSyxnQkFBTDthQVRmLENBREosQ0FESzs7Ozs0QkF0Q2M7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHVCQUFPLEdBQUcsS0FBSCxDQUFTO0FBQ1osMEJBQU0sR0FBRyxLQUFILENBQVM7QUFDWCxrQ0FBVSxHQUFHLEtBQUgsQ0FBUztBQUNmLHdDQUFZLEdBQUcsTUFBSDtBQUNaLHdDQUFZLEdBQUcsTUFBSDtBQUNaLHdDQUFZLEdBQUcsTUFBSDtBQUNaLHNDQUFZLEdBQUcsTUFBSDt5QkFKTixFQUtQLFVBTE87cUJBRFIsRUFPSCxVQVBHO2lCQURILEVBU0osVUFUSTtBQVVQLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDViwyQkFBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1gsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjthQWJkLENBRm1COzs7O1dBRE47RUFBdUIsTUFBTSxTQUFOOztrQkFBdkI7OztBQXdEckIsZUFBZSxXQUFmLEdBQTZCLDBEQUE3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzNEcUI7Ozs7Ozs7Ozs7Ozs7O3NNQWlCakIsZUFBZSxVQUFDLEtBQUQsRUFBVztBQUN0QixrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLE1BQU0sTUFBTixDQUFhLEtBQWIsQ0FBMUMsQ0FEc0I7U0FBWDs7O2lCQWpCRTs7c0NBcUJIOzs7QUFDVixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLHVCQUNJOztzQkFBSyxXQUFVLGFBQVYsRUFBTDtvQkFDSTs7MEJBQUssV0FBVSxXQUFWLEVBQUw7d0JBQ00sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixJQUF6QixDQUE4QjttQ0FBSyxFQUFFLENBQUYsTUFBUyxPQUFLLEtBQUwsQ0FBVyxLQUFYO3lCQUFkLENBQTlCLENBQThELENBQTlELENBRE47cUJBREo7aUJBREosQ0FEcUI7YUFBekI7QUFTQSxtQkFDSTs7a0JBQUssV0FBVSxhQUFWLEVBQUw7Z0JBQ0k7OztBQUNJLCtCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDUixrQ0FBVyxLQUFLLFlBQUw7cUJBRmY7b0JBSU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixHQUF6QixDQUE2QixrQkFBVTtxREFDZCxXQURjOzs0QkFDOUIsbUJBRDhCOzRCQUN2QixtQkFEdUI7O0FBRXJDLCtCQUNJOzs4QkFBUSxLQUFNLEtBQU4sRUFBYyxPQUFRLEtBQVIsRUFBdEI7NEJBQ00sS0FETjt5QkFESixDQUZxQztxQkFBVixDQUpuQztpQkFESjthQURKLENBVlU7Ozs7aUNBNEJMO0FBQ0wsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNJOztzQkFBSyxXQUFVLGFBQVYsRUFBTDtvQkFDTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO2lCQUZWO2dCQUlNLEtBQUssV0FBTCxFQUpOO2FBREosQ0FESzs7Ozs0QkFoRGM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHVCQUFPLEdBQUcsS0FBSCxDQUFTO0FBQ1osMkJBQU8sR0FBRyxNQUFILENBQVUsVUFBVjtBQUNQLHlCQUFLLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDTCw2QkFBUyxHQUFHLE9BQUgsQ0FDTCxHQUFHLE9BQUgsQ0FBVyxHQUFHLE1BQUgsQ0FBVSxVQUFWLENBQVgsQ0FBaUMsVUFBakMsQ0FESyxDQUVQLFVBRk87aUJBSE4sRUFNSixVQU5JO0FBT1AsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNWLHVCQUFPLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDUCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBVmQsQ0FGbUI7Ozs7V0FETjtFQUFhLE1BQU0sU0FBTjs7a0JBQWI7OztBQTZEckIsS0FBSyxXQUFMLEdBQW1CLDhEQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDekRxQjs7Ozs7NEJBQ007QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHdCQUFRLEdBQUcsT0FBSCxDQUNKLEdBQUcsS0FBSCxDQUFTO0FBQ0wseUJBQUssR0FBRyxNQUFILENBQVUsVUFBVjtBQUNMLDJCQUFPLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDUCw2QkFBUyxHQUFHLE9BQUgsQ0FDTCxHQUFHLE9BQUgsQ0FBVyxHQUFHLE1BQUgsQ0FBVSxVQUFWLENBQVgsQ0FBaUMsVUFBakMsQ0FESyxDQUVQLFVBRk87QUFHVCxrQ0FBYyxHQUFHLE1BQUgsQ0FBVSxVQUFWO2lCQU5sQixFQU9HLFVBUEgsQ0FESSxDQVNOLFVBVE07QUFVUiwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YsMkJBQVcsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNYLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFiZCxDQUZtQjs7OztBQW1CdkIsYUFwQmlCLGFBb0JqQixDQUFZLEtBQVosRUFBbUI7OEJBcEJGLGVBb0JFOzsyRUFwQkYsMEJBcUJQLFFBRFM7O2NBV25CLGVBQWUsVUFBQyxHQUFELEVBQU0sS0FBTixFQUFnQjtBQUMzQixnQkFBSSxTQUFTLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsTUFBSyxLQUFMLENBQVcsTUFBWCxDQUEzQixDQUR1QjtBQUUzQixtQkFBTyxHQUFQLElBQWMsS0FBZCxDQUYyQjtBQUczQixrQkFBSyxRQUFMLENBQWMsRUFBRSxjQUFGLEVBQWQsRUFIMkI7U0FBaEIsQ0FYSTs7Y0FnQm5CLHFCQUFxQixVQUFDLEtBQUQsRUFBVztBQUM1QixrQkFBTSxlQUFOLEdBRDRCO0FBRTVCLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLEdBRjRCO1NBQVgsQ0FoQkY7O2NBb0JuQixtQkFBbUIsVUFBQyxLQUFELEVBQVc7QUFDMUIsa0JBQU0sY0FBTixHQUQwQjtBQUUxQixrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixNQUFLLEtBQUwsQ0FBVyxNQUFYLENBQXBCLENBRjBCO1NBQVgsQ0FwQkE7O0FBRWYsWUFBSSxpQkFBaUIsRUFBakIsQ0FGVzs7Ozs7O0FBR2YsaUNBQWdCLE1BQUssS0FBTCxDQUFXLE1BQVgsMEJBQWhCLG9HQUFtQztvQkFBeEIsZ0JBQXdCOztBQUMvQiwrQkFBZSxFQUFFLEdBQUYsQ0FBZixHQUF3QixFQUFFLFlBQUYsQ0FETzthQUFuQzs7Ozs7Ozs7Ozs7Ozs7U0FIZTs7QUFNZixjQUFLLEtBQUwsR0FBYTtBQUNULG9CQUFRLGNBQVI7U0FESixDQU5lOztLQUFuQjs7aUJBcEJpQjs7d0NBNkNEO0FBQ1osZ0JBQUksS0FBSyxLQUFMLENBQVcsUUFBWCxFQUFxQjtBQUNyQix1QkFDSTs7c0JBQUssV0FBVSxTQUFWLEVBQUw7b0JBQ0k7OztBQUNJLHVDQUFVLGlCQUFWO0FBQ0Esa0NBQUssUUFBTDtBQUNBLHFDQUFVLEtBQUssa0JBQUw7eUJBSGQ7d0JBS0Usb0JBQUUsc0JBQUYsQ0FMRjtxQkFESjtpQkFESixDQURxQjthQUF6QjtBQWFBLG1CQUNJOztrQkFBSyxXQUFVLFNBQVYsRUFBTDtnQkFDSTs7O0FBQ0ksbUNBQVUsZUFBVjtBQUNBLDhCQUFLLFFBQUw7cUJBRko7b0JBSU0sb0JBQUUsdUJBQUYsQ0FKTjtpQkFESjs7Z0JBUUk7OztBQUNJLG1DQUFVLGdCQUFWO0FBQ0EsOEJBQUssUUFBTDtBQUNBLGlDQUFVLEtBQUssa0JBQUw7cUJBSGQ7b0JBS00sb0JBQUUsd0JBQUYsQ0FMTjtpQkFSSjthQURKLENBZFk7Ozs7aUNBaUNQOzs7QUFDTCxtQkFDSTs7O0FBQ0ksK0JBQVUsY0FBVjtBQUNBLDhCQUFXLEtBQUssZ0JBQUw7aUJBRmY7Z0JBSUk7O3NCQUFLLFdBQVUsUUFBVixFQUFMO29CQUNNLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsR0FBbEIsQ0FBc0IsVUFBQyxDQUFELEVBQUksR0FBSjsrQkFDcEI7QUFDSSxtQ0FBUSxDQUFSO0FBQ0EsaUNBQU0sRUFBRSxHQUFGO0FBQ04sc0NBQVcsT0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLG1DQUFRLE9BQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsRUFBRSxHQUFGLENBQTFCO0FBQ0Esc0NBQVcsT0FBSyxZQUFMO3lCQUxmO3FCQURvQixDQUQ1QjtpQkFKSjtnQkFlTSxLQUFLLGFBQUwsRUFmTjthQURKLENBREs7Ozs7V0E5RVE7RUFBc0IsTUFBTSxTQUFOOztrQkFBdEI7OztBQXFHckIsY0FBYyxXQUFkLEdBQTRCLHlEQUE1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2R3FCOzs7Ozs7Ozs7Ozs7Ozt5TkFrQmpCLG1CQUFtQixVQUFDLElBQUQsRUFBVTtBQUN6QixrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQjtBQUNoQix5QkFBVSxTQUFTLEtBQUssT0FBTCxDQUFuQjtBQUNBLDBCQUFVLEtBQUssUUFBTCxLQUFrQixNQUFsQjthQUZkLEVBRHlCO1NBQVY7OztpQkFsQkY7O2tDQXlCUCxLQUFLLE9BQU8sT0FBTztBQUN6QixnQkFBTSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsR0FBL0IsQ0FBUixDQURtQjtBQUV6QixtQkFBTztBQUNILHFCQUFLLEdBQUw7QUFDQSx1QkFBVSxXQUFWO0FBQ0EseUJBQVMsS0FBVDtBQUNBLDhCQUFjLFVBQVUsSUFBVixHQUFpQixFQUFqQixHQUFzQixNQUFNLFFBQU4sRUFBdEI7YUFKbEIsQ0FGeUI7Ozs7aUNBVXBCO0FBQ0wsbUJBQ0k7QUFDSSx3QkFBUyxDQUNMLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsR0FBMUIsRUFBK0IsQ0FDM0IsQ0FBQyxHQUFELEVBQU0sSUFBTixDQUQyQixFQUUzQixDQUFDLElBQUQsRUFBTyxJQUFQLENBRjJCLEVBRzNCLENBQUMsS0FBRCxFQUFRLEtBQVIsQ0FIMkIsQ0FBL0IsQ0FESyxFQU1MLEtBQUssU0FBTCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsRUFBaUMsQ0FDN0IsQ0FBQyxPQUFELEVBQVUsSUFBVixDQUQ2QixFQUU3QixDQUFDLE1BQUQsRUFBVSxLQUFWLENBRjZCLENBQWpDLENBTkssQ0FBVDtBQVdBLDBCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCwyQkFBWSxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ1osMEJBQVcsS0FBSyxnQkFBTDthQWRmLENBREosQ0FESzs7Ozs0QkFsQ2M7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHVCQUFPLEdBQUcsS0FBSCxDQUFTO0FBQ1osMEJBQU0sR0FBRyxLQUFILENBQVM7QUFDWCxrQ0FBVSxHQUFHLEtBQUgsQ0FBUztBQUNmLHFDQUFTLEdBQUcsTUFBSDtBQUNULHNDQUFVLEdBQUcsSUFBSDt5QkFGSixFQUdQLFVBSE87cUJBRFIsRUFLSCxVQUxHO2lCQURILEVBT0osVUFQSTtBQVFQLDBCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDViwyQkFBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1gsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjthQVhkLENBRm1COzs7O1dBRE47RUFBZ0MsTUFBTSxTQUFOOztrQkFBaEM7OztBQXlEckIsd0JBQXdCLFdBQXhCLEdBQXNDLG1FQUF0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN6RHFCOzs7Ozs7Ozs7Ozs7OztnTkFrQmpCLG1CQUFtQixVQUFDLElBQUQsRUFBVTtBQUN6QixrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQjtBQUNoQix5QkFBVSxTQUFTLEtBQUssT0FBTCxDQUFuQjtBQUNBLDBCQUFVLEtBQUssUUFBTCxLQUFrQixNQUFsQjthQUZkLEVBRHlCO1NBQVY7OztpQkFsQkY7O2tDQXlCUCxLQUFLLE9BQU8sT0FBTztBQUN6QixnQkFBTSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsR0FBL0IsQ0FBUixDQURtQjtBQUV6QixtQkFBTztBQUNILHFCQUFLLEdBQUw7QUFDQSx1QkFBVSxXQUFWO0FBQ0EseUJBQVMsS0FBVDtBQUNBLDhCQUFjLFVBQVUsSUFBVixHQUFpQixFQUFqQixHQUFzQixNQUFNLFFBQU4sRUFBdEI7YUFKbEIsQ0FGeUI7Ozs7aUNBVXBCO0FBQ0wsbUJBQ0k7QUFDSSx3QkFBUyxDQUNMLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsR0FBMUIsRUFBK0IsQ0FDM0IsQ0FBQyxHQUFELEVBQU0sSUFBTixDQUQyQixFQUUzQixDQUFDLElBQUQsRUFBTyxJQUFQLENBRjJCLEVBRzNCLENBQUMsS0FBRCxFQUFRLEtBQVIsQ0FIMkIsRUFJM0IsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUoyQixDQUEvQixDQURLLEVBT0wsS0FBSyxTQUFMLENBQWUsVUFBZixFQUEyQixJQUEzQixFQUFpQyxDQUM3QixDQUFDLE9BQUQsRUFBVSxJQUFWLENBRDZCLEVBRTdCLENBQUMsTUFBRCxFQUFVLEtBQVYsQ0FGNkIsQ0FBakMsQ0FQSyxDQUFUO0FBWUEsMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDJCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWiwwQkFBVyxLQUFLLGdCQUFMO2FBZmYsQ0FESixDQURLOzs7OzRCQWxDYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2YscUNBQVMsR0FBRyxNQUFIO0FBQ1Qsc0NBQVUsR0FBRyxJQUFIO3lCQUZKLEVBR1AsVUFITztxQkFEUixFQUtILFVBTEc7aUJBREgsRUFPSixVQVBJO0FBUVAsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNWLDJCQUFXLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDWCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBWGQsQ0FGbUI7Ozs7V0FETjtFQUF1QixNQUFNLFNBQU47O2tCQUF2Qjs7O0FBMERyQixlQUFlLFdBQWYsR0FBNkIsMERBQTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN6RHFCOzs7Ozs7Ozs7Ozs7OztpTkFpQmpCLG1CQUFtQixVQUFDLElBQUQsRUFBVTtBQUN6QixrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQjtBQUNoQix3QkFBUSxLQUFLLFFBQUwsTUFBbUIsRUFBbkIsR0FBd0IsSUFBeEIsR0FBK0IsU0FBUyxLQUFLLE1BQUwsQ0FBeEM7YUFEWixFQUR5QjtTQUFWOzs7aUJBakJGOztrQ0F1QlAsS0FBSyxPQUFPLE9BQU87QUFDekIsZ0JBQU0sUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLEdBQS9CLENBQVIsQ0FEbUI7QUFFekIsbUJBQU87QUFDSCxxQkFBSyxHQUFMO0FBQ0EsdUJBQVUsV0FBVjtBQUNBLHlCQUFTLEtBQVQ7QUFDQSw4QkFBYyxVQUFVLElBQVYsR0FBaUIsRUFBakIsR0FBc0IsTUFBTSxRQUFOLEVBQXRCO2FBSmxCLENBRnlCOzs7O2lDQVVwQjtBQUNMLG1CQUNJO0FBQ0ksd0JBQVMsQ0FDTCxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCLEVBQThCLHdCQUFTLFVBQVQsRUFBcUIsRUFBRSxLQUFLLENBQUwsRUFBUSxLQUFLLEVBQUwsRUFBL0IsQ0FBOUIsQ0FESyxDQUFUO0FBR0EsMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDJCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWiwwQkFBVyxLQUFLLGdCQUFMO2FBTmYsQ0FESixDQURLOzs7OzRCQWhDYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2Ysb0NBQVEsR0FBRyxNQUFIO3lCQURGLEVBRVAsVUFGTztxQkFEUixFQUlILFVBSkc7aUJBREgsRUFNSixVQU5JO0FBT1AsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNWLDJCQUFXLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDWCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBVmQsQ0FGbUI7Ozs7V0FETjtFQUF3QixNQUFNLFNBQU47O2tCQUF4Qjs7O0FBK0NyQixnQkFBZ0IsV0FBaEIsR0FBOEIsMkRBQTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUMvQ3FCOzs7Ozs7Ozs7Ozs7OztnTkFrQmpCLG1CQUFtQixVQUFDLElBQUQsRUFBVTtBQUN6QixrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQjtBQUNoQiw0QkFBa0IsU0FBUyxLQUFLLFVBQUwsQ0FBM0I7QUFDQSxrQ0FBa0IsS0FBSyxnQkFBTCxLQUEwQixFQUExQixHQUErQixJQUEvQixHQUFzQyxLQUFLLGdCQUFMLEtBQTBCLE1BQTFCO2FBRjVELEVBRHlCO1NBQVY7OztpQkFsQkY7O2tDQXlCUCxLQUFLLE9BQU8sT0FBTztBQUN6QixnQkFBTSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsR0FBL0IsQ0FBUixDQURtQjtBQUV6QixtQkFBTztBQUNILHFCQUFLLEdBQUw7QUFDQSx1QkFBVSxXQUFWO0FBQ0EseUJBQVMsS0FBVDtBQUNBLDhCQUFjLFVBQVUsSUFBVixHQUFpQixFQUFqQixHQUFzQixNQUFNLFFBQU4sRUFBdEI7YUFKbEIsQ0FGeUI7Ozs7aUNBVXBCO0FBQ0wsbUJBQ0k7QUFDSSx3QkFBUyxDQUNMLEtBQUssU0FBTCxDQUFlLFlBQWYsRUFBNkIsSUFBN0IsRUFBbUMsd0JBQVMsU0FBVCxFQUFvQixFQUFFLEtBQUssR0FBTCxFQUF0QixDQUFuQyxDQURLLEVBRUwsS0FBSyxTQUFMLENBQWUsa0JBQWYsRUFBbUMsR0FBbkMsRUFBd0MsQ0FDcEMsQ0FBQyxFQUFELEVBQVUsR0FBVixDQURvQyxFQUVwQyxDQUFDLE9BQUQsRUFBVSxHQUFWLENBRm9DLEVBR3BDLENBQUMsTUFBRCxFQUFVLEdBQVYsQ0FIb0MsQ0FBeEMsQ0FGSyxDQUFUO0FBUUEsMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDJCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWiwwQkFBVyxLQUFLLGdCQUFMO2FBWGYsQ0FESixDQURLOzs7OzRCQWxDYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2Ysd0NBQWtCLEdBQUcsTUFBSDtBQUNsQiw4Q0FBa0IsR0FBRyxJQUFIO3lCQUZaLEVBR1AsVUFITztxQkFEUixFQUtILFVBTEc7aUJBREgsRUFPSixVQVBJO0FBUVAsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNWLDJCQUFXLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDWCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBWGQsQ0FGbUI7Ozs7V0FETjtFQUF1QixNQUFNLFNBQU47O2tCQUF2Qjs7O0FBdURyQixlQUFlLFdBQWYsR0FBNkIsMERBQTdCOzs7Ozs7OztBQzFEQSxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBd0IsV0FBeEIsRUFBcUM7QUFDakMsUUFBTSxXQUFXLEtBQUssQ0FBTCxNQUFZLEdBQVosQ0FEZ0I7QUFFakMsUUFBSSxRQUFKLEVBQWM7QUFDVixlQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBUCxDQURVO0tBQWQ7QUFHQSxRQUFJLFNBQVMsRUFBVCxDQUw2QjtBQU1qQyxZQUFRLElBQVI7QUFDQSxhQUFLLFdBQUw7QUFDSSxxQkFBUyxDQUFDLEdBQUQsRUFBTSxFQUFOLEVBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsR0FBNUIsQ0FDTDt1QkFBSyxDQUFDLEVBQUUsUUFBRixFQUFELFFBQW1CLE9BQW5CO2FBQUwsQ0FESixDQURKO0FBSUksa0JBSko7QUFEQSxhQU1LLFNBQUw7QUFDSSxnQkFBTSxTQUFTLE9BQU8sTUFBUCxDQUFjO0FBQ3pCLHFCQUFLLENBQUw7QUFDQSxxQkFBSyxFQUFMO0FBQ0Esc0JBQU0sQ0FBTjthQUhXLEVBSVosV0FKWSxDQUFULENBRFY7QUFNSSxnQkFBTSxnQkFBZ0IsS0FBSyxHQUFMLENBQVMsT0FBTyxJQUFQLEdBQWMsS0FBSyxLQUFMLENBQVcsT0FBTyxJQUFQLENBQXpCLENBQVQsR0FBa0QsSUFBbEQsR0FBeUQsQ0FBekQsR0FBNkQsQ0FBN0QsQ0FOMUI7QUFPSSxpQkFBSyxJQUFJLFFBQVEsT0FBTyxHQUFQLEVBQVksUUFBUyxPQUFPLEdBQVAsR0FBYSxJQUFiLEVBQW9CLFNBQVMsT0FBTyxJQUFQLEVBQWE7QUFDNUUsb0JBQU0sTUFBTSxNQUFNLE9BQU4sQ0FBYyxhQUFkLENBQU4sQ0FEc0U7QUFFNUUsdUJBQU8sSUFBUCxDQUFZLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBWixFQUY0RTthQUFoRjtBQUlBLGtCQVhKO0FBTkE7QUFtQkksb0JBQVEsS0FBUiwwQkFBcUMsSUFBckMsRUFESjtBQWxCQSxLQU5pQztBQTJCakMsUUFBSSxRQUFKLEVBQWM7QUFDVixpQkFBUyxDQUFDLENBQUMsRUFBRCxFQUFLLEdBQUwsQ0FBRCxFQUFZLE1BQVosQ0FBbUIsTUFBbkIsQ0FBVCxDQURVO0tBQWQ7QUFHQSxXQUFPLE1BQVAsQ0E5QmlDO0NBQXJDOztrQkFpQ2U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3BCTTs7Ozs7Ozs7Ozs7bUNBZU4sY0FBYztBQUNyQixnQkFDSSxpQkFBaUIsTUFBakIsSUFDQSxDQUFDLG1CQUFELEVBQXNCLHdCQUF0QixFQUFnRCxPQUFoRCxDQUF3RCxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixDQUF4RCxJQUFnRyxDQUFoRyxFQUNGO0FBQ0UsK0JBQWUsZ0JBQWYsQ0FERjthQUhGO0FBTUEsZ0JBQU0sY0FBYztBQUNoQix1QkFBVyxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ1gsMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDBCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCwyQkFBVyxLQUFLLEtBQUwsQ0FBVyxTQUFYO2FBSlQsQ0FQZTtBQWFyQixvQkFBUSxZQUFSO0FBQ0EscUJBQUssTUFBTDtBQUNJLDJCQUNJLHlDQUFnQixXQUFoQixDQURKLENBREo7QUFEQSxxQkFLSyxPQUFMO0FBQ0ksMkJBQ0ksMENBQWlCLFdBQWpCLENBREosQ0FESjtBQUxBLHFCQVNLLGNBQUw7QUFDSSwyQkFDSSxnREFBdUIsV0FBdkIsQ0FESixDQURKO0FBVEEscUJBYUssV0FBTDtBQUNJLDJCQUNJLDhDQUFxQixXQUFyQixDQURKLENBREo7QUFiQSxxQkFpQkssZ0JBQUw7QUFDSSwyQkFDSSxrREFBeUIsV0FBekIsQ0FESixDQURKO0FBakJBLHFCQXFCSyxZQUFMO0FBQ0ksMkJBQ0ksK0NBQXNCLFdBQXRCLENBREosQ0FESjtBQXJCQSxxQkF5QkssTUFBTDtBQUNJLDJCQUNJLDhDQUFxQixXQUFyQixDQURKLENBREo7QUF6QkEscUJBNkJLLGdCQUFMO0FBQ0ksMkJBQ0ksdURBQThCLFdBQTlCLENBREosQ0FESjtBQTdCQSxxQkFpQ0ssTUFBTDtBQUNJLDJCQUNJLDhDQUFxQixXQUFyQixDQURKLENBREo7QUFqQ0E7QUFzQ0ksNEJBQVEsS0FBUiw0QkFBdUMsWUFBdkMsRUFESjtBQXJDQSxhQWJxQjs7OztpREFzREEsY0FBYztBQUNuQyxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLGlCQUFpQixNQUFqQixFQUF5QjtBQUNoRCx1QkFBTyxJQUFQLENBRGdEO2FBQXBEO0FBR0EsbUJBQ0k7QUFDSSwyQkFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLFNBQWpCO0FBQ1osc0NBQXVCLEtBQUssS0FBTCxDQUFXLG9CQUFYO2FBRjNCLENBREosQ0FKbUM7Ozs7aUNBVzlCO0FBQ0wsZ0JBQU0sZUFBZSw4QkFBZSxLQUFLLEtBQUwsQ0FBVyxlQUFYLEVBQTRCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsbUJBQWhCLENBQTFELENBREQ7QUFFTCxtQkFDSTs7a0JBQUssV0FBVSxpQkFBVixFQUFMO2dCQUNNLEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUROO2dCQUVNLEtBQUssd0JBQUwsQ0FBOEIsWUFBOUIsQ0FGTjthQURKLENBRks7Ozs7NEJBL0VjO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCxpQ0FBaUIsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNqQiwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YsdUJBQU8sR0FBRyxNQUFILENBQVUsVUFBVjtBQUNQLHNCQUFNLEdBQUcsS0FBSCxDQUFTO0FBQ1gseUNBQXFCLEdBQUcsTUFBSCxDQUFVLFVBQVY7aUJBRG5CLEVBRUgsVUFGRztBQUdOLHNDQUFzQixHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ3RCLDJCQUFXLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDWCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBVGQsQ0FGbUI7Ozs7V0FETjtFQUFlLE1BQU0sU0FBTjs7a0JBQWY7OztBQTJGckIsT0FBTyxXQUFQLEdBQXFCLDJDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN0R3FCOzs7Ozs7Ozs7OztpQ0FxQlI7QUFDTCxnQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLE9BQVgsRUFBb0I7QUFDckIsb0JBQ0ksS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixJQUEzQixLQUFvQyxZQUFwQyxJQUNBLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsUUFBL0IsRUFDRjtBQUNFLDJCQUNJOzs7OEJBQ1UsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixXQUF0QixDQUFrQyxPQUFsQyxDQUEwQyxDQUExQyxPQURWO3FCQURKLENBREY7aUJBSEY7QUFVQSxvQkFBSSxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLElBQTNCLEtBQW9DLFlBQXBDLEVBQWtEO0FBQ2xELHdCQUFNLFNBQVMsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixnQkFBL0IsS0FBb0QsSUFBcEQsR0FDVCxHQURTLEdBQ0gsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixnQkFBL0IsR0FDRixHQURFLEdBQ0ksR0FESixDQUZzQztBQUlsRCwyQkFDSTs7O3dCQUNTLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsVUFBL0IsU0FBNkMsTUFEdEQ7cUJBREosQ0FKa0Q7aUJBQXREO0FBVUEsdUJBQ0k7OztvQkFDTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFdBQXRCLENBQWtDLE9BQWxDLENBQTBDLENBQTFDLENBRE47aUJBREosQ0FyQnFCO2FBQXpCLE1BMEJPO0FBQ0gsdUJBQ0k7QUFDSSxxQ0FBa0IsS0FBSyxLQUFMLENBQVcsZUFBWDtBQUNsQiw4QkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsMkJBQVEsS0FBSyxLQUFMLENBQVcsS0FBWDtBQUNSLDBCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDUCwwQ0FBdUIsS0FBSyxLQUFMLENBQVcsb0JBQVg7QUFDdkIsK0JBQVksS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNaLDhCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7aUJBUGYsQ0FESixDQURHO2FBMUJQOzs7OzRCQXJCbUI7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILGlDQUFpQixHQUFHLEtBQUgsQ0FBUztBQUN0QiwwQkFBTSxHQUFHLE1BQUgsQ0FBVSxVQUFWO2lCQURPLEVBRWQsVUFGYztBQUdqQix5QkFBUyxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1QsMEJBQVUsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNWLHVCQUFPLEdBQUcsS0FBSCxDQUFTO0FBQ1osMEJBQU0sR0FBRyxLQUFILENBQVM7QUFDWCxrQ0FBVSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1YscUNBQWEsR0FBRyxNQUFILENBQVUsVUFBVjtxQkFGWCxFQUdILFVBSEc7aUJBREgsRUFLSixVQUxJO0FBTVAsc0JBQU0sR0FBRyxNQUFILENBQVUsVUFBVjtBQUNOLHNDQUFzQixHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ3RCLDJCQUFXLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDWCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBZmQsQ0FGbUI7Ozs7V0FETjtFQUF3QixNQUFNLFNBQU47O2tCQUF4Qjs7O0FBZ0VyQixnQkFBZ0IsV0FBaEIsR0FBOEIsb0NBQTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2hFcUI7Ozs7Ozs7Ozs7O3dDQXlDRCxVQUFVLFVBQVU7QUFDaEMsZ0JBQU0sY0FDRixPQUFPLFFBQVAsS0FBb0IsV0FBcEIsSUFDQSxTQUFTLElBQVQsQ0FBYyxFQUFkLEtBQXFCLFNBQVMsSUFBVCxDQUFjLEVBQWQsQ0FITztBQUloQyxnQkFBSSxDQUFDLFdBQUQsRUFBYztBQUNkLHVCQUFPLElBQVAsQ0FEYzthQUFsQjtBQUdBLG1CQUNJOztrQkFBSSxXQUFVLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBZDtnQkFDSTs7c0JBQUksV0FBVSxXQUFWLEVBQXNCLFNBQVEsR0FBUixFQUExQjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sU0FBUyxJQUFULENBQWMsSUFBZDtxQkFGVjtpQkFESjthQURKLENBUGdDOzs7O2tDQWlCMUIsS0FBSztBQUNYLGdCQUFJLElBQUksSUFBSSxHQUFKLENBQVEsV0FBUixDQURHO0FBRVgsbUJBQ0k7O2tCQUFJLFdBQVUsSUFBSSxHQUFKLENBQVEsRUFBUixFQUFkO2dCQUNJOztzQkFBSSxXQUFVLFdBQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sSUFBSSxLQUFKLEtBQWMsSUFBZCxHQUFxQixFQUFyQixHQUEwQixJQUFJLEtBQUo7cUJBRnBDO2lCQURKO2dCQU1JOztzQkFBSSxXQUFVLFlBQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sRUFBRSxNQUFGO3FCQUZWO2lCQU5KO2dCQVdJOztzQkFBSSxXQUFVLE1BQVYsRUFBaUIsU0FBUSxHQUFSLEVBQXJCO29CQUNJOzswQkFBTyxXQUFVLFdBQVYsRUFBUDt3QkFBNkI7Ozs0QkFDdkIsRUFBRSxjQUFGLEdBQ0U7OztnQ0FDSTs7c0NBQUksU0FBUSxHQUFSLEVBQUo7b0NBQ0k7OzBDQUFHLFdBQVUsV0FBVixFQUFIO3dDQUNNLEVBQUUsY0FBRjtxQ0FGVjtpQ0FESjs2QkFERixHQVFFLElBUkY7NEJBU0EsRUFBRSxTQUFGLENBQVksR0FBWixDQUFnQixVQUFDLENBQUQsRUFBSSxHQUFKO3VDQUNkOztzQ0FBSSxLQUFNLEdBQU4sRUFBSjtvQ0FDSTs7MENBQUksV0FBVSxNQUFWLEVBQUo7d0NBQ0k7Ozs0Q0FDUyxFQUFFLFNBQUYsU0FBZSxFQUFFLFVBQUY7NENBQ2xCLEVBQUUsVUFBRixHQUFlOzs7O2dEQUFPLG9CQUFFLG9CQUFGLENBQVA7OzZDQUFmLEdBQXdELElBQXhEO3lDQUhWO3FDQURKO29DQU9JOzswQ0FBSSxXQUFVLE1BQVYsRUFBSjt3Q0FDSTs7OENBQUcsV0FBVSxhQUFWLEVBQUg7NENBQ00sRUFBRSxhQUFGO3lDQUZWO3FDQVBKOzs2QkFEYyxDQVZPO3lCQUE3QjtxQkFESjtpQkFYSjtnQkF1Q0k7O3NCQUFJLFdBQVUsV0FBVixFQUFKO29CQUNJOzs7d0JBQ00sRUFBRSxJQUFGLENBQU8sSUFBUDtxQkFGVjtpQkF2Q0o7Z0JBNENJOztzQkFBSSxXQUFVLGNBQVYsRUFBSjtvQkFDSTs7O3dCQUNNLEVBQUUsT0FBRixDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0FBeUI7bUNBQUssQ0FBQyxFQUFFLElBQUYsRUFBRCxFQUFXLDRCQUFJLEtBQUksR0FBSixFQUFKLENBQVg7eUJBQUwsQ0FEL0I7cUJBREo7aUJBNUNKO2FBREosQ0FGVzs7OztxQ0F1REY7QUFDVCxnQkFBSSxTQUFTLEVBQVQsQ0FESztBQUVULGdCQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUZMO0FBR1QsaUJBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLE1BQU0sTUFBTixFQUFjLEVBQUUsQ0FBRixFQUFLO0FBQ25DLG9CQUFNLFNBQVMsS0FBSyxlQUFMLENBQXFCLE1BQU0sSUFBSSxDQUFKLENBQTNCLEVBQW1DLE1BQU0sQ0FBTixDQUFuQyxDQUFULENBRDZCO0FBRW5DLG9CQUFJLFdBQVcsSUFBWCxFQUFpQjtBQUNqQiwyQkFBTyxJQUFQLENBQVksTUFBWixFQURpQjtpQkFBckI7QUFHQSx1QkFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsTUFBTSxDQUFOLENBQWYsQ0FBWixFQUxtQzthQUF2QztBQU9BLG1CQUFPLE1BQVAsQ0FWUzs7OztpQ0FZSjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLHdCQUFWLEVBQUw7Z0JBQ0k7O3NCQUFPLFdBQVUsZ0JBQVYsRUFBUDtvQkFDSTs7O3dCQUNJOzs7NEJBQ0k7O2tDQUFJLFdBQVUsS0FBVixFQUFKO2dDQUNJOzs7b0NBQ00sb0JBQUUsc0JBQUYsQ0FETjtpQ0FESjs2QkFESjs0QkFNSTs7a0NBQUksV0FBVSxLQUFWLEVBQUo7Z0NBQ0k7OztvQ0FDTSxvQkFBRSx1QkFBRixDQUROO2lDQURKOzZCQU5KOzRCQVdJOztrQ0FBSSxXQUFVLE1BQVYsRUFBSjtnQ0FDSTs7O29DQUNNLG9CQUFFLDBCQUFGLENBRE47aUNBREo7NkJBWEo7NEJBZ0JJOztrQ0FBSSxXQUFVLEtBQVYsRUFBSjtnQ0FDSTs7O29DQUNNLG9CQUFFLHdDQUFGLENBRE47aUNBREo7NkJBaEJKOzRCQXFCSTs7a0NBQUksV0FBVSxNQUFWLEVBQUo7Z0NBQ0k7OztvQ0FDTSxvQkFBRSxpQ0FBRixDQUROO2lDQURKOzZCQXJCSjs0QkEwQkk7O2tDQUFJLFdBQVUsTUFBVixFQUFKO2dDQUNJOzs7b0NBQ00sb0JBQUUsb0NBQUYsQ0FETjtpQ0FESjs2QkExQko7eUJBREo7cUJBREo7b0JBbUNJOzs7d0JBQ00sS0FBSyxVQUFMLEVBRE47cUJBbkNKO2lCQURKO2FBREosQ0FESzs7OztzQ0E1RlksTUFBTTtBQUN2QixpQkFDSyxRQURMLENBQ2MsWUFEZCxFQUM0QixZQUQ1QixFQUMwQyxNQUQxQyxFQUVLLFFBRkwsQ0FFYyw4REFGZCxFQUU4RSxRQUY5RSxFQUV3RixNQUZ4RixFQUdLLFFBSEwsQ0FHYyw4REFIZCxFQUc4RSxTQUg5RSxFQUd5RixHQUh6RixFQUlLLFFBSkwsQ0FJYyxZQUpkLEVBSTRCLE9BSjVCLEVBSXFDLE1BSnJDLEVBRHVCOzs7OzRCQWhDSjtBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxPQUFILENBQ0gsR0FBRyxLQUFILENBQVM7QUFDTCwyQkFBTyxHQUFHLE1BQUg7QUFDUCx5QkFBSyxHQUFHLEtBQUgsQ0FBUztBQUNWLHFDQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLG9DQUFRLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDUixxQ0FBUyxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1QsdUNBQVcsR0FBRyxPQUFILENBQ1AsR0FBRyxLQUFILENBQVM7QUFDTCwyQ0FBVyxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1gsNENBQVksR0FBRyxNQUFILENBQVUsVUFBVjtBQUNaLCtDQUFlLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDZiw0Q0FBWSxHQUFHLElBQUgsQ0FBUSxVQUFSOzZCQUpoQixDQURPLENBQVg7QUFRQSxrQ0FBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLHNDQUFNLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDTixzQ0FBTSxHQUFHLE1BQUgsQ0FBVSxVQUFWOzZCQUZKLEVBR0gsVUFIRzt5QkFYRyxFQWVWLFVBZlU7cUJBRFosRUFpQkYsVUFqQkU7QUFrQkwsMEJBQU0sR0FBRyxLQUFILENBQVM7QUFDWCw4QkFBTSxHQUFHLE1BQUgsQ0FBVSxVQUFWO3FCQURKLEVBRUgsVUFGRztpQkFwQlYsRUF1QkcsVUF2QkgsQ0FERyxDQXlCTCxVQXpCSzthQURYLENBRm1COzs7O1dBRE47RUFBK0IsTUFBTSxTQUFOOztrQkFBL0I7OztBQTRLckIsdUJBQXVCLFdBQXZCLEdBQXFDLDJDQUFyQzs7Ozs7Ozs7UUN4S2dCO0FBTlQsSUFBSSxvQkFBTSxJQUFOO0FBQ0osSUFBSSxrREFBcUIsSUFBckI7QUFDSixJQUFJLDRCQUFVLElBQVY7QUFDSixJQUFJLGdEQUFvQixJQUFwQjtBQUNKLElBQUksNERBQTBCLElBQTFCOztBQUVKLFNBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFDeEIsWUFQTyxNQU9QLE1BQTJCLEtBQUssR0FBTCxDQURIO0FBRXhCLFlBUE8scUJBT1AscUJBQTJCLEtBQUssa0JBQUwsQ0FGSDtBQUd4QixZQVBPLFVBT1AsVUFBMkIsS0FBSyxPQUFMLENBSEg7QUFJeEIsWUFQTyxvQkFPUCxvQkFBMkIsS0FBSyxpQkFBTCxDQUpIO0FBS3hCLFlBUE8sMEJBT1AsMEJBQTJCLEtBQUssdUJBQUwsQ0FMSDtDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRmM7Ozs7Ozs7Ozs7Ozs7O3lNQVVqQixlQUFlLFVBQUMsS0FBRCxFQUFXO0FBQ3RCLGtCQUFLLEtBQUwsQ0FBVyxxQkFBWCxDQUFpQyxNQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CLEtBQXJELEVBRHNCO1NBQVg7OztpQkFWRTs7aUNBY1I7QUFDTCxtQkFDSTtBQUNJLHdCQUFTLG9CQUFFLDBCQUFGLEVBQThCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBdkM7QUFDQSwwQkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsdUJBQU0sV0FBTjtBQUNBLHVCQUFRLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDUiwwQkFBVyxLQUFLLFlBQUw7YUFMZixDQURKLENBREs7Ozs7NEJBYmM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHlCQUFTLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDVCwyQkFBVyxHQUFHLE1BQUg7QUFDWCx1Q0FBdUIsR0FBRyxJQUFILENBQVEsVUFBUjthQUgzQixDQUZtQjs7OztXQUROO0VBQWdCLE1BQU0sU0FBTjs7a0JBQWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0ZBOzs7Ozs7Ozs7OztpQ0FDUjs7O0FBQ0wsbUJBQ0k7OztnQkFDTSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEdBQXRCLENBQTBCLFVBQUMsU0FBRCxFQUFZLFFBQVo7MkJBQ3hCO0FBQ0ksNkJBQU0sUUFBTjtBQUNBLGtDQUFXLE9BQUssS0FBTCxDQUFXLFFBQVg7QUFDWCxtQ0FBWSxTQUFaO0FBQ0EsaUNBQVUsUUFBVjtBQUNBLCtDQUF3QixPQUFLLEtBQUwsQ0FBVyxxQkFBWDtxQkFMNUI7aUJBRHdCLENBRGhDO2FBREosQ0FESzs7OztXQURRO0VBQWlCLE1BQU0sU0FBTjs7a0JBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNFQTs7Ozs7Ozs7Ozs7Ozs7ME1BU2pCLGVBQWUsVUFBQyxLQUFELEVBQVc7QUFDdEIsa0JBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsVUFBekIsRUFBcUMsS0FBckMsRUFEc0I7U0FBWDs7O2lCQVRFOztpQ0FhUjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLFVBQVYsRUFBTDtnQkFDSTs7O29CQUFNLG9CQUFFLDZCQUFGLENBQU47aUJBREo7Z0JBRUk7QUFDSSw4QkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsMkJBQVEsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNSLDhCQUFXLEtBQUssWUFBTDtpQkFIZixDQUZKO2FBREosQ0FESzs7Ozs0QkFaYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsMEJBQVUsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNWLCtCQUFlLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFGbkIsQ0FGbUI7Ozs7V0FETjtFQUFpQixNQUFNLFNBQU47O2tCQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBOzs7Ozs7Ozs7Ozs7OzsrTUFDakIsNEJBQTRCLFVBQUMsUUFBRCxFQUFXLEtBQVgsRUFBcUI7QUFDN0MsZ0JBQUksYUFBYSxNQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLFVBQXJCLENBQWdDLEdBQWhDLENBQW9DO3VCQUFNO2FBQU4sQ0FBakQsQ0FEeUM7QUFFN0MsdUJBQVcsUUFBWCxJQUF1QixLQUF2QixDQUY2QztBQUc3QyxrQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixZQUF6QixFQUF1QyxVQUF2QyxFQUg2QztTQUFyQjs7O2lCQURYOztpQ0FPUjtBQUNMLG1CQUNJOzs7Z0JBQ0k7QUFDSSw4QkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsZ0NBQWEsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixVQUFyQjtBQUNiLDJDQUF3QixLQUFLLHlCQUFMO2lCQUg1QixDQURKO2dCQU1JO0FBQ0ksOEJBQVcsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixRQUFyQjtBQUNYLDhCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCxtQ0FBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDtpQkFIcEIsQ0FOSjtnQkFXSTtBQUNJLDJCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7aUJBRFosQ0FYSjthQURKLENBREs7Ozs7V0FQUTtFQUFzQixNQUFNLFNBQU47O2tCQUF0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNEQTs7Ozs7Ozs7Ozs7aUNBQ1I7QUFDTCxtQkFDSTtBQUNJO2VBQ0ssS0FBSyxLQUFMLENBRlQsQ0FESixDQURLOzs7O1dBRFE7RUFBeUIsTUFBTSxTQUFOOztrQkFBekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNFQTs7Ozs7Ozs7Ozs7dUNBZ0JGO0FBQ1gsbUJBQU8sNkJBQWM7QUFDakIsMkJBQVcsSUFBWDtBQUNBLDBCQUFVLENBQUMsS0FBSyxLQUFMLENBQVcsVUFBWDthQUZSLENBQVAsQ0FEVzs7OztpQ0FNTjtBQUNMLG1CQUNJOztrQkFBSyxXQUFZLEtBQUssWUFBTCxFQUFaLEVBQUw7Z0JBQ0k7QUFDSSwwQkFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ1AsK0JBQVksb0JBQUUsNkJBQUYsQ0FBWjtBQUNBLDhCQUFXLG9CQUFFLHlCQUFGLENBQVg7QUFDQSxnQ0FBYSxLQUFLLEtBQUwsQ0FBVyxTQUFYO2lCQUpqQixDQURKO2FBREosQ0FESzs7Ozs0QkFyQmM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILDRCQUFZLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDWiwyQkFBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1gsMkJBQVcsR0FBRyxJQUFILENBQVEsVUFBUjthQUhmLENBRm1COzs7OzRCQVNHO0FBQ3RCLG1CQUFPO0FBQ0gsNEJBQVksSUFBWjthQURKLENBRHNCOzs7O1dBVlQ7RUFBMkIsTUFBTSxTQUFOOztrQkFBM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0RBOzs7Ozs7Ozs7Ozs7OzswTUFZakIsNEJBQTRCLFVBQUMsS0FBRCxFQUFXO0FBQ25DLGtCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGdCQUF6QixFQUEyQyxLQUEzQyxFQURtQztTQUFYLFFBRzVCLDBCQUEwQixVQUFDLEtBQUQsRUFBVztBQUNqQyxrQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixjQUF6QixFQUF5QyxLQUF6QyxFQURpQztTQUFYOzs7aUJBZlQ7O2lDQWtCUjtBQUNMLG1CQUNJOztrQkFBTyxXQUFVLHFCQUFWLEVBQVA7Z0JBQXVDOzs7b0JBQU87Ozt3QkFDMUM7Ozs0QkFDSTs7O2dDQUFNLG9CQUFFLG1DQUFGLENBQU47NkJBREo7NEJBRUk7QUFDSSx1Q0FBUSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLGNBQXJCO0FBQ1IsMENBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDBDQUFXLEtBQUsseUJBQUw7NkJBSGYsQ0FGSjt5QkFEMEM7d0JBUXJDOzs7NEJBQ0Q7OztnQ0FBTSxvQkFBRSxpQ0FBRixDQUFOOzZCQURDOzRCQUVEO0FBQ0ksdUNBQVEsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixZQUFyQjtBQUNSLDBDQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCwwQ0FBVyxLQUFLLHVCQUFMOzZCQUhmLENBRkM7eUJBUnFDO3FCQUFQO2lCQUF2QzthQURKLENBREs7Ozs7NEJBakJjO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCwyQkFBVyxHQUFHLEtBQUgsQ0FBUztBQUNoQixvQ0FBZ0IsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNoQixrQ0FBYyxHQUFHLE1BQUgsQ0FBVSxVQUFWO2lCQUZQLEVBR1IsVUFIUTtBQUlYLCtCQUFlLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFMbkIsQ0FGbUI7Ozs7V0FETjtFQUFpQixNQUFNLFNBQU47O2tCQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRkE7Ozs7Ozs7Ozs7Ozs7OzJNQUNqQixlQUFlLFVBQUMsS0FBRCxFQUFXO0FBQ3RCLGtCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsS0FBMUMsRUFEc0I7U0FBWDs7O2lCQURFOztpQ0FLUjt5QkFDMkQsS0FBSyxLQUFMLENBRDNEO2dCQUNHLHVCQURIO2dCQUNXLHFCQURYO2dCQUNrQixxQkFEbEI7Z0JBQ3lCLHFDQUR6Qjs7Z0JBQzJDLDhGQUQzQzs7QUFFTCxtQkFDSTtBQUNJLHdCQUFTLE1BQVQ7QUFDQSwwQkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsdUJBQVEsS0FBUjtBQUNBLHVCQUFRLEtBQVI7QUFDQSwwQkFBVyxLQUFLLFlBQUw7ZUFDTixZQU5ULENBREosQ0FGSzs7OztXQUxRO0VBQWtCLE1BQU0sU0FBTjs7a0JBQWxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSUE7Ozs7Ozs7Ozs7O21DQUNOLE1BQU0sT0FBNEI7Z0JBQXJCLHlFQUFpQixrQkFBSTs7QUFDekMsbUJBQ0k7QUFDSSxzQkFBTyxJQUFQO0FBQ0Esd0JBQVMsNENBQXdCLElBQXhCLENBQVQ7QUFDQSwwQkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsdUJBQVEsS0FBUjtBQUNBLHVCQUFRLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsSUFBckIsQ0FBUjtBQUNBLCtCQUFnQixLQUFLLEtBQUwsQ0FBVyxhQUFYO2VBQ1osaUJBUFIsQ0FESixDQUR5Qzs7OztpQ0FhcEM7QUFDTCxtQkFDSTs7O2dCQUNNLEtBQUssVUFBTCxDQUFnQixVQUFoQixFQUE0QixXQUE1QixDQUROO2dCQUVNLEtBQUssVUFBTCxDQUFnQixRQUFoQixFQUEwQixXQUExQixDQUZOO2dCQUdNLEtBQUssVUFBTCxDQUFnQixZQUFoQixFQUE4QixRQUE5QixFQUF3QyxFQUFFLEtBQUssQ0FBTCxFQUFRLEtBQUssSUFBTCxFQUFsRCxDQUhOO2dCQUlNLEtBQUssVUFBTCxDQUFnQixhQUFoQixFQUErQixRQUEvQixFQUF5QyxFQUFFLEtBQUssQ0FBTCxFQUFRLEtBQUssRUFBTCxFQUFuRCxDQUpOO2dCQUtJO0FBQ0ksOEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLCtCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWixtQ0FBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDtpQkFIcEIsQ0FMSjtnQkFVSTtBQUNJLDJCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7aUJBRFosQ0FWSjthQURKLENBREs7Ozs7V0FkUTtFQUFzQixNQUFNLFNBQU47O2tCQUF0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQTs7Ozs7Ozs7Ozs7aUNBQ1I7QUFDTCxtQkFDSTtBQUNJO2VBQ0ksS0FBSyxLQUFMLENBRlIsQ0FESixDQURLOzs7O1dBRFE7RUFBc0IsTUFBTSxTQUFOOztrQkFBdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDREE7Ozs7Ozs7Ozs7Ozs7OzJNQUNqQixlQUFlLFVBQUMsS0FBRCxFQUFXO0FBQ3RCLGtCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsS0FBMUMsRUFEc0I7U0FBWDs7O2lCQURFOztpQ0FLUjt5QkFDMkQsS0FBSyxLQUFMLENBRDNEO2dCQUNHLHVCQURIO2dCQUNXLHFCQURYO2dCQUNrQixxQkFEbEI7Z0JBQ3lCLHFDQUR6Qjs7Z0JBQzJDLDhGQUQzQzs7QUFFTCxtQkFDSTtBQUNJLDBCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCx3QkFBUyxNQUFUO0FBQ0EsdUJBQVEsS0FBUjtBQUNBLHVCQUFRLEtBQVI7QUFDQSwwQkFBVyxLQUFLLFlBQUw7ZUFDTixZQU5ULENBREosQ0FGSzs7OztXQUxRO0VBQWtCLE1BQU0sU0FBTjs7a0JBQWxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSUE7Ozs7Ozs7Ozs7O21DQUNOLE1BQU0sT0FBNEI7Z0JBQXJCLHlFQUFpQixrQkFBSTs7QUFDekMsbUJBQ0k7QUFDSSxzQkFBTyxJQUFQO0FBQ0Esd0JBQVMsNENBQXdCLElBQXhCLENBQVQ7QUFDQSwwQkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsdUJBQVEsS0FBUjtBQUNBLHVCQUFRLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsSUFBckIsQ0FBUjtBQUNBLCtCQUFnQixLQUFLLEtBQUwsQ0FBVyxhQUFYO2VBQ1gsaUJBUFQsQ0FESixDQUR5Qzs7OztpQ0FhcEM7QUFDTCxtQkFDSTs7O2dCQUNNLEtBQUssVUFBTCxDQUFnQixVQUFoQixFQUE0QixXQUE1QixDQUROO2dCQUVNLEtBQUssVUFBTCxDQUFnQixRQUFoQixFQUEwQixXQUExQixDQUZOO2dCQUdNLEtBQUssVUFBTCxDQUFnQixZQUFoQixFQUE4QixTQUE5QixFQUF5QyxFQUFFLEtBQUssQ0FBTCxFQUFRLEtBQUssRUFBTCxFQUFuRCxDQUhOO2dCQUlNLEtBQUssVUFBTCxDQUFnQixhQUFoQixFQUErQixTQUEvQixFQUEwQyxFQUFFLEtBQUssQ0FBTCxFQUFRLEtBQUssRUFBTCxFQUFwRCxDQUpOO2dCQUtJO0FBQ0ksOEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLCtCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWixtQ0FBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDtpQkFIcEIsQ0FMSjtnQkFVSTtBQUNJLDJCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7aUJBRFosQ0FWSjthQURKLENBREs7Ozs7V0FkUTtFQUFzQixNQUFNLFNBQU47O2tCQUF0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSkE7Ozs7Ozs7Ozs7Ozs7O3dNQUNqQixVQUFVLFlBQU07QUFDWixrQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFLLEtBQUwsQ0FBVyxJQUFYLENBQW5CLENBRFk7U0FBTjs7O2lCQURPOztpQ0FJUjtBQUNMLG1CQUNJOzs7QUFDSSwrQkFBWSxTQUFTLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBVDttQkFDUCw4QkFBZSxLQUFLLE9BQUwsRUFGeEI7Z0JBR1UsS0FBSyxLQUFMLENBQVcsS0FBWDthQUpkLENBREs7Ozs7V0FKUTtFQUFlLE1BQU0sU0FBTjs7a0JBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRkE7Ozs7Ozs7Ozs7O2lDQUNSO0FBQ0wsbUJBQU8sSUFBUCxDQURLOzs7O1dBRFE7RUFBbUIsTUFBTSxTQUFOOztrQkFBbkI7Ozs7Ozs7Ozs7O2tCQ0VHOzs7Ozs7OztBQUFULFNBQVMsTUFBVCxDQUFnQixLQUFoQixFQUF1QjtBQUNsQyxXQUNJOzs7UUFDTSxNQUFNLFFBQU4sQ0FBZSxHQUFmLENBQW1CLE1BQU0sUUFBTixFQUFnQixVQUFDLEdBQUQ7bUJBQ2pDO0FBQ0kscUJBQU0sSUFBSSxLQUFKLENBQVUsSUFBVjtBQUNOLHdCQUFTLE1BQU0sS0FBTixLQUFnQixJQUFJLEtBQUosQ0FBVSxJQUFWO0FBQ3pCLHlCQUFVLE1BQU0sUUFBTjtlQUNMLElBQUksS0FBSixDQUpUO1NBRGlDLENBRHpDO0tBREosQ0FEa0M7Q0FBdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0VNOzs7Ozs7Ozs7Ozs7OzswTUFZakIsNEJBQTRCLFVBQUMsS0FBRCxFQUFXO0FBQ25DLGtCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGdCQUF6QixFQUEyQyxLQUEzQyxFQURtQztTQUFYLFFBRzVCLDBCQUEwQixVQUFDLEtBQUQsRUFBVztBQUNqQyxrQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixjQUF6QixFQUF5QyxLQUF6QyxFQURpQztTQUFYOzs7aUJBZlQ7O2lDQW1CUjtBQUNMLG1CQUNJOztrQkFBTyxXQUFVLHFCQUFWLEVBQVA7Z0JBQXVDOzs7b0JBQU87Ozt3QkFDMUM7Ozs0QkFDSTs7O2dDQUFNLG9CQUFFLHdDQUFGLENBQU47NkJBREo7NEJBRUk7QUFDSSwwQ0FBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsdUNBQVEsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixjQUFyQjtBQUNSLDBDQUFXLEtBQUsseUJBQUw7NkJBSGYsQ0FGSjt5QkFEMEM7d0JBUXJDOzs7NEJBQ0Q7OztnQ0FBTSxvQkFBRSxzQ0FBRixDQUFOOzZCQURDOzRCQUVEO0FBQ0ksMENBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLHVDQUFRLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsWUFBckI7QUFDUiwwQ0FBVyxLQUFLLHVCQUFMOzZCQUhmLENBRkM7eUJBUnFDO3FCQUFQO2lCQUF2QzthQURKLENBREs7Ozs7NEJBbEJjO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCwyQkFBVyxHQUFHLEtBQUgsQ0FBUztBQUNoQixvQ0FBZ0IsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNoQixrQ0FBYyxHQUFHLE1BQUgsQ0FBVSxVQUFWO2lCQUZQLEVBR1IsVUFIUTtBQUlYLCtCQUFlLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFMbkIsQ0FGbUI7Ozs7V0FETjtFQUFpQixNQUFNLFNBQU47O2tCQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRkE7Ozs7Ozs7Ozs7Ozs7OzJNQUNqQixXQUFXLFVBQUMsS0FBRCxFQUFXO0FBQ2xCLGtCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsS0FBMUMsRUFEa0I7U0FBWDs7O2lCQURNOztpQ0FJUjt5QkFDMkQsS0FBSyxLQUFMLENBRDNEO2dCQUNHLHVCQURIO2dCQUNXLHFCQURYO2dCQUNrQixxQkFEbEI7Z0JBQ3lCLHFDQUR6Qjs7Z0JBQzJDLDhGQUQzQzs7QUFFTCxtQkFDSTtBQUNJLHdCQUFTLE1BQVQ7QUFDQSx1QkFBUSxLQUFSO0FBQ0EsdUJBQVEsS0FBUjtBQUNBLDBCQUFXLEtBQUssUUFBTDtlQUNQLFlBTFIsQ0FESixDQUZLOzs7O1dBSlE7RUFBa0IsTUFBTSxTQUFOOztrQkFBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNJQTs7Ozs7Ozs7Ozs7bUNBQ04sTUFBTSxPQUE0QjtnQkFBckIseUVBQWlCLGtCQUFJOztBQUN6QyxtQkFDSTtBQUNJLDBCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCxzQkFBTyxJQUFQO0FBQ0Esd0JBQVMsNENBQXdCLElBQXhCLENBQVQ7QUFDQSx1QkFBUSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLElBQXJCLENBQVI7QUFDQSx1QkFBUSxLQUFSO0FBQ0EsK0JBQWdCLEtBQUssS0FBTCxDQUFXLGFBQVg7ZUFDWixpQkFQUixDQURKLENBRHlDOzs7O2lDQWFwQztBQUNMLG1CQUNJOzs7Z0JBQ00sS0FBSyxVQUFMLENBQWdCLFlBQWhCLEVBQThCLFFBQTlCLEVBQXdDLEVBQUUsS0FBSyxDQUFMLEVBQVEsS0FBSyxFQUFMLEVBQWxELENBRE47Z0JBRU0sS0FBSyxVQUFMLENBQWdCLFlBQWhCLEVBQThCLFFBQTlCLEVBQXdDLEVBQUUsS0FBSyxDQUFMLEVBQVEsS0FBSyxFQUFMLEVBQWxELENBRk47Z0JBR00sS0FBSyxVQUFMLENBQWdCLFlBQWhCLEVBQThCLFFBQTlCLEVBQXdDLEVBQUUsS0FBSyxDQUFMLEVBQVEsS0FBSyxFQUFMLEVBQWxELENBSE47Z0JBSU0sS0FBSyxVQUFMLENBQWdCLFlBQWhCLEVBQThCLFFBQTlCLEVBQXdDLEVBQUUsS0FBSyxDQUFMLEVBQVEsS0FBSyxFQUFMLEVBQWxELENBSk47Z0JBS0k7QUFDSSw4QkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsK0JBQVksS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNaLG1DQUFnQixLQUFLLEtBQUwsQ0FBVyxhQUFYO2lCQUhwQixDQUxKO2dCQVVJO0FBQ0ksOEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLDJCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7aUJBRlosQ0FWSjthQURKLENBREs7Ozs7V0FkUTtFQUFzQixNQUFNLFNBQU47O2tCQUF0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNGQTs7Ozs7Ozs7Ozs7Ozs7ME1BV2pCLGVBQWUsVUFBQyxLQUFELEVBQVc7QUFDdEIsa0JBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsVUFBekIsRUFBcUMsS0FBckMsRUFEc0I7U0FBWDs7O2lCQVhFOztpQ0FlUjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLFVBQVYsRUFBTDtnQkFDSTs7O29CQUFNLG9CQUFFLGtDQUFGLENBQU47aUJBREo7Z0JBRUk7QUFDSSw4QkFBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ1gsMkJBQVEsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixRQUFyQjtBQUNSLDhCQUFXLEtBQUssWUFBTDtpQkFIZixDQUZKO2FBREosQ0FESzs7Ozs0QkFkYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsMkJBQVcsR0FBRyxLQUFILENBQVM7QUFDaEIsOEJBQVUsR0FBRyxNQUFILENBQVUsVUFBVjtpQkFESCxFQUVSLFVBRlE7QUFHWCwrQkFBZSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBSm5CLENBRm1COzs7O1dBRE47RUFBaUIsTUFBTSxTQUFOOztrQkFBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0ZBOzs7Ozs7Ozs7Ozs7OzsyTUFZakIsZUFBZSxVQUFDLEtBQUQsRUFBVztBQUN0QixrQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixNQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLEtBQTFDLEVBRHNCO1NBQVg7OztpQkFaRTs7aUNBZ0JSO3lCQUMyRCxLQUFLLEtBQUwsQ0FEM0Q7Z0JBQ0csdUJBREg7Z0JBQ1cscUJBRFg7Z0JBQ2tCLHFCQURsQjtnQkFDeUIscUNBRHpCOztnQkFDMkM7QUFEM0M7O0FBRUwsbUJBQ0k7QUFDSSx3QkFBUyxNQUFUO0FBQ0EsdUJBQVEsS0FBUjtBQUNBLHVCQUFRLEtBQVI7QUFDQSwwQkFBVyxLQUFLLFlBQUw7ZUFDTixZQUxULENBREosQ0FGSzs7Ozs0QkFmYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsc0JBQU0sR0FBRyxNQUFILENBQVUsVUFBVjtBQUNOLHdCQUFRLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDUix1QkFBTyxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1AsdUJBQU8sR0FBRyxNQUFILENBQVUsVUFBVjtBQUNQLCtCQUFlLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFMbkIsQ0FGbUI7Ozs7V0FETjtFQUFrQixNQUFNLFNBQU47O2tCQUFsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0lBOzs7Ozs7Ozs7OzttQ0FDTixNQUFNLE9BQTRCO2dCQUFyQix5RUFBaUIsa0JBQUk7O0FBQ3pDLG1CQUNJO0FBQ0ksMEJBQVcsS0FBSyxLQUFMLENBQVcsUUFBWDtBQUNYLHNCQUFPLElBQVA7QUFDQSx3QkFBUyw0Q0FBd0IsSUFBeEIsQ0FBVDtBQUNBLHVCQUFRLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsSUFBckIsQ0FBUjtBQUNBLHVCQUFRLEtBQVI7QUFDQSwrQkFBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDtlQUNaLGlCQVBSLENBREosQ0FEeUM7Ozs7aUNBYXBDO0FBQ0wsbUJBQ0k7OztnQkFDTSxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsRUFBOEIsUUFBOUIsRUFBd0MsRUFBRSxLQUFLLENBQUwsRUFBUSxLQUFLLEVBQUwsRUFBbEQsQ0FETjtnQkFFTSxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsRUFBOEIsUUFBOUIsRUFBd0MsRUFBRSxLQUFLLENBQUwsRUFBUSxLQUFLLEVBQUwsRUFBbEQsQ0FGTjtnQkFHTSxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsRUFBOEIsUUFBOUIsRUFBd0MsRUFBRSxLQUFLLENBQUwsRUFBUSxLQUFLLEVBQUwsRUFBbEQsQ0FITjtnQkFJSTtBQUNJLDhCQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCwrQkFBWSxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ1osbUNBQWdCLEtBQUssS0FBTCxDQUFXLGFBQVg7aUJBSHBCLENBSko7Z0JBU0k7QUFDSSwyQkFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYO2lCQURaLENBVEo7YUFESixDQURLOzs7O1dBZFE7RUFBc0IsTUFBTSxTQUFOOztrQkFBdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBOzs7Ozs7Ozs7Ozs7Ozs2TUEyQmpCLFlBQVksWUFBTTtBQUNkLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLE1BQUssS0FBTCxDQUFXLEVBQVgsQ0FBMUIsQ0FEYztTQUFOLFFBR1osZ0JBQWdCLFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDNUIsZ0JBQUksTUFBSyxLQUFMLENBQVcsU0FBWCxFQUFzQjtBQUN0Qix1QkFEc0I7YUFBMUI7QUFHQSxnQkFBSSxhQUFhLEVBQWIsQ0FKd0I7QUFLNUIsdUJBQVcsR0FBWCxJQUFrQixLQUFsQixDQUw0QjtBQU01QixrQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixNQUFLLEtBQUwsQ0FBVyxFQUFYLEVBQWUsVUFBeEMsRUFONEI7U0FBaEIsUUFRaEIsd0JBQXdCLFVBQUMsUUFBRCxFQUFXLEtBQVgsRUFBcUI7QUFDekMsZ0JBQUksTUFBSyxLQUFMLENBQVcsU0FBWCxFQUFzQjtBQUN0Qix1QkFEc0I7YUFBMUI7QUFHQSxnQkFBSSxhQUFhLE1BQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsUUFBaEIsQ0FBeUIsVUFBekIsQ0FBb0MsR0FBcEMsQ0FBd0M7dUJBQU07YUFBTixDQUFyRCxDQUpxQztBQUt6Qyx1QkFBVyxRQUFYLElBQXVCLEtBQXZCLENBTHlDO0FBTXpDLGtCQUFLLGFBQUwsQ0FBbUIsWUFBbkIsRUFBaUMsVUFBakMsRUFOeUM7U0FBckI7OztpQkF0Q1A7O3FDQVdKO0FBQ1QsZ0JBQU0sYUFBYSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFFBQWhCLENBRFY7Ozs7OztBQUVULHFDQUFrQixPQUFPLElBQVAsQ0FBWSxVQUFaLDJCQUFsQixvR0FBMkM7d0JBQWhDLGtCQUFnQzs7QUFDdkMsd0JBQU0sUUFBUSxXQUFXLEdBQVgsQ0FBUixDQURpQztBQUV2Qyx3QkFBSSxNQUFNLE9BQU4sQ0FBYyxLQUFkLENBQUosRUFBMEI7QUFDdEIsNEJBQUksTUFBTSxNQUFOLENBQWE7bUNBQUssTUFBTSxJQUFOO3lCQUFMLENBQWIsQ0FBOEIsTUFBOUIsS0FBeUMsQ0FBekMsRUFBNEM7QUFDNUMsbUNBQU8sS0FBUCxDQUQ0Qzt5QkFBaEQ7cUJBREosTUFJTztBQUNILDRCQUFJLFVBQVUsSUFBVixFQUFnQjtBQUNoQixtQ0FBTyxLQUFQLENBRGdCO3lCQUFwQjtxQkFMSjtpQkFGSjs7Ozs7Ozs7Ozs7Ozs7YUFGUzs7QUFjVCxtQkFBTyxJQUFQLENBZFM7Ozs7OENBbUNTO0FBQ2xCLGdCQUFNLGFBQWEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixRQUFoQixDQUREO0FBRWxCLGdCQUFNLG1CQUFtQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBRlA7QUFHbEIsbUJBQ0k7OztnQkFDSSxvQkFBQyxnQkFBRDtBQUNJLDhCQUFXLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWCwyQkFBUSxLQUFLLEtBQUw7QUFDUiwrQkFBWSxVQUFaO0FBQ0EsbUNBQWdCLEtBQUssYUFBTDtpQkFKcEIsQ0FESjtnQkFPSTtBQUNJLCtCQUFZLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWixnQ0FBYSxLQUFLLFVBQUwsRUFBYjtBQUNBLCtCQUFZLEtBQUssU0FBTDtpQkFIaEIsQ0FQSjthQURKLENBSGtCOzs7O3FEQW1CTztBQUN6QixtQkFDSTs7a0JBQUssV0FBVSxnQkFBVixFQUFMO2dCQUNNLG9CQUFFLDhCQUFGLENBRE47YUFESixDQUR5Qjs7OztpQ0FPcEI7QUFDTCxnQkFBTSxTQUFTLG9CQUFFLDhCQUFGLEVBQ1gsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFdBQWYsQ0FBMkIsTUFBM0IsRUFDQSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixDQUEyQixJQUEzQixFQUNBLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLENBQTJCLFNBQTNCLENBQXFDLE1BQXJDLENBSEUsQ0FERDtBQUtMLG1CQUNJOztrQkFBSyxXQUFVLG9CQUFWLEVBQUw7Z0JBQ0k7OztvQkFDTSxNQUROO2lCQURKO2dCQUlNLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxTQUFmLEdBQ0ksS0FBSyxtQkFBTCxFQURKLEdBRUksS0FBSywwQkFBTCxFQUZKO2FBTFYsQ0FMSzs7Ozs0QkF2RUc7OztBQUNSLG1CQUFPLEtBQUssY0FBTCxDQUFvQixPQUFwQixFQUE2QixZQUFNOzs7Ozs7QUFDdEMsMENBQW9CLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxNQUFmLDJCQUFwQix3R0FBMkM7NEJBQWhDLHFCQUFnQzs7QUFDdkMsNEJBQUksTUFBTSxtQkFBTixLQUE4QixPQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEVBQTNCLEVBQStCO0FBQzdELG1DQUFPLEtBQVAsQ0FENkQ7eUJBQWpFO3FCQURKOzs7Ozs7Ozs7Ozs7OztpQkFEc0M7O0FBTXRDLHVCQUFPLElBQVAsQ0FOc0M7YUFBTixDQUFwQyxDQURROzs7O1dBREs7RUFBb0IsMEJBQVcsTUFBTSxTQUFOOztrQkFBL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBQTs7O0FBQ2pCLGFBRGlCLGFBQ2pCLENBQVksS0FBWixFQUFtQjs4QkFERixlQUNFOzsyRUFERiwwQkFFUCxRQURTOztjQTBDbkIsa0JBQWtCLFlBQU07QUFDcEIsa0JBQUssVUFBTCxDQUFnQixNQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLENBQWxCLENBQWhCLENBRG9CO1NBQU4sQ0ExQ0M7O2NBNkNuQixrQkFBa0IsWUFBTTtBQUNwQixrQkFBSyxVQUFMLENBQWdCLE1BQUssS0FBTCxDQUFXLElBQVgsR0FBa0IsQ0FBbEIsQ0FBaEIsQ0FEb0I7U0FBTixDQTdDQzs7QUFFZixjQUFLLEtBQUwsR0FBYTtBQUNULGtCQUFNLE1BQUssd0JBQUw7U0FEVixDQUZlOztLQUFuQjs7aUJBRGlCOztrREFPUyxZQUFZO0FBQ2xDLGdCQUFJLFdBQVcsSUFBWCxDQUFnQixFQUFoQixLQUF1QixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEVBQWhCLEVBQW9CO0FBQzNDLG9CQUFNLGFBQWEsS0FBSyxLQUFMLENBRHdCO0FBRTNDLHFCQUFLLEtBQUwsR0FBYSxVQUFiLENBRjJDO0FBRzNDLHFCQUFLLFVBQUwsR0FIMkM7QUFJM0MscUJBQUssUUFBTCxDQUFjO0FBQ1YsMEJBQU0sS0FBSyx3QkFBTDtpQkFEVixFQUoyQztBQU8zQyxxQkFBSyxLQUFMLEdBQWEsVUFBYixDQVAyQzthQUEvQzs7OzttQ0E4Qk8sT0FBTztBQUNkLGlCQUFLLFFBQUwsQ0FBYztBQUNWLHNCQUFNLEtBQU47YUFESixFQURjOzs7O2lDQVdUOzs7QUFDTCxtQkFDSTs7a0JBQUssV0FBVSxtQ0FBVixFQUFMO2dCQUNJO0FBQ0ksMkJBQVEsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixLQUEzQjtBQUNSLDBCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDUCwwQkFBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ1AsZ0NBQWEsS0FBSyxXQUFMO0FBQ2IsNkJBQVUsS0FBSyx3QkFBTDtBQUNWLHFDQUFrQixLQUFLLGVBQUw7QUFDbEIscUNBQWtCLEtBQUssZUFBTDtpQkFQdEIsQ0FESjtnQkFVSTs7c0JBQUssV0FBVSxNQUFWLEVBQUw7b0JBQ0k7Ozt3QkFDTSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQXFCLE1BQXJCLENBQTRCO21DQUFPLElBQUksSUFBSixLQUFhLE9BQUssS0FBTCxDQUFXLElBQVg7eUJBQXBCLENBQTVCLENBQWlFLEdBQWpFLENBQXFFO21DQUNuRTtBQUNJLHFDQUFNLElBQUksRUFBSjtBQUNOLHFDQUFNLEdBQU47QUFDQSw2Q0FBYyxPQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2QsaURBQWtCLE9BQUssS0FBTCxDQUFXLGVBQVg7QUFDbEIsK0NBQWdCLE9BQUssS0FBTCxDQUFXLGFBQVg7QUFDaEIsZ0RBQWlCLE9BQUssS0FBTCxDQUFXLGNBQVg7NkJBTnJCO3lCQURtRSxDQUQzRTtxQkFESjtpQkFWSjthQURKLENBREs7Ozs7NEJBL0JTOzs7QUFDZCxtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsYUFBcEIsRUFBbUM7Ozt1QkFDdEMsZUFBSyxHQUFMLGlDQUFZLE9BQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBeUI7MkJBQU8sSUFBSSxJQUFKO2lCQUFQLEVBQXJDO2FBRHNDLENBQTFDLENBRGM7Ozs7NEJBS1A7OztBQUNQLG1CQUFPLEtBQUssY0FBTCxDQUFvQixNQUFwQixFQUE0Qjt1QkFDL0IsT0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixNQUFyQixDQUE0QjsyQkFBTyxJQUFJLElBQUosS0FBYSxPQUFLLEtBQUwsQ0FBVyxJQUFYO2lCQUFwQjthQURHLENBQW5DLENBRE87Ozs7NEJBS29COzs7Ozs7QUFDM0IscUNBQWtCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsMEJBQWxCLG9HQUF3Qzt3QkFBN0Isa0JBQTZCOzs7Ozs7QUFDcEMsOENBQW9CLElBQUksTUFBSiwyQkFBcEIsd0dBQWdDO2dDQUFyQixxQkFBcUI7O0FBQzVCLGdDQUFJLE1BQU0sbUJBQU4sS0FBOEIsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixFQUEzQixJQUFpQyxDQUFDLE1BQU0sU0FBTixJQUFtQixJQUFJLFNBQUosRUFBZTtBQUNsRyx1Q0FBTyxJQUFJLElBQUosQ0FEMkY7NkJBQXRHO3lCQURKOzs7Ozs7Ozs7Ozs7OztxQkFEb0M7aUJBQXhDOzs7Ozs7Ozs7Ozs7OzthQUQyQjs7QUFRM0IsbUJBQU8sS0FBSyxXQUFMLENBUm9COzs7O1dBNUJkO0VBQXNCLDBCQUFXLE1BQU0sU0FBTjs7a0JBQWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSEE7Ozs7Ozs7Ozs7O3VDQTJCRjtBQUNYLGdCQUFJLEtBQUssS0FBTCxDQUFXLE1BQVgsS0FBc0IsSUFBdEIsRUFBNEI7QUFDNUIsdUJBQU8sSUFBUCxDQUQ0QjthQUFoQztBQUdBLG1CQUNJOzs7Z0JBQ00sS0FBSyxLQUFMLENBQVcsTUFBWDthQUZWLENBSlc7Ozs7cUNBV0Y7eUJBQ3lCLEtBQUssS0FBTCxDQUR6QjtnQkFDRCxxQkFEQzs7Z0JBQ1MsMERBRFQ7O0FBRVQsb0JBQVEsS0FBUjtBQUNBLHFCQUFLLFFBQUw7QUFDSSwyQkFDSTtBQUNJLHFDQUFjLENBQWQ7QUFDQSw4QkFBTyxHQUFQO0FBQ0EsK0JBQU0sV0FBTjt1QkFDSyxZQUpULENBREosQ0FESjtBQURBLHFCQVVLLFNBQUw7QUFDSSwyQkFDSTtBQUNJLCtCQUFNLFdBQU47dUJBQ0ssWUFGVCxDQURKLENBREo7QUFWQSxxQkFpQkssTUFBTDtBQUNJLDJCQUNJO0FBQ0ksK0JBQU0sTUFBTjt1QkFDSyxZQUZULENBREosQ0FESjtBQWpCQSxxQkF3QkssV0FBTDtBQUNJLDJCQUNJO0FBQ0ksaUNBQVUsS0FBSyxvQkFBTDtBQUNWLCtCQUFNLFVBQU47dUJBQ0ssS0FBSyxLQUFMLENBSFQsQ0FESixDQURKO0FBeEJBO0FBaUNJLDRCQUFRLEtBQVIsMEJBQXFDLEtBQXJDLEVBREo7QUFFSSwyQkFBTyxJQUFQLENBRko7QUFoQ0EsYUFGUzs7OztpQ0F1Q0o7QUFDTCxtQkFDSTs7O2dCQUNNLEtBQUssWUFBTCxFQUROO2dCQUVNLEtBQUssVUFBTCxFQUZOO2FBREosQ0FESzs7Ozs0QkE5RGtCO0FBQ3ZCLG1CQUFPLENBQ0gsQ0FBQyxHQUFELEVBQU0sT0FBTixDQURHLEVBRUgsQ0FBQyxFQUFELEVBQU0sTUFBTixDQUZHLEVBR0gsQ0FBQyxFQUFELEVBQU0sTUFBTixDQUhHLEVBSUgsQ0FBQyxFQUFELEVBQU0sTUFBTixDQUpHLEVBS0gsQ0FBQyxFQUFELEVBQU0sTUFBTixDQUxHLEVBTUgsQ0FBQyxDQUFELEVBQU0sS0FBTixDQU5HLEVBT0gsQ0FBQyxDQUFELEVBQU0sS0FBTixDQVBHLENBQVAsQ0FEdUI7Ozs7NEJBZEo7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHdCQUFRLEdBQUcsTUFBSDtBQUNSLHVCQUFPLEdBQUcsS0FBSCxDQUFTLENBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsTUFBdEIsRUFBOEIsV0FBOUIsQ0FBVCxFQUFxRCxVQUFyRDthQUZYLENBRm1COzs7OzRCQVFHO0FBQ3RCLG1CQUFPO0FBQ0gsd0JBQVEsSUFBUjthQURKLENBRHNCOzs7O1dBVFQ7RUFBcUIsTUFBTSxTQUFOOztrQkFBckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDREE7Ozs7Ozs7Ozs7O2tDQXNDUCxVQUFVLGVBQWU7OztBQUMvQixnQkFBSSxhQUFhLElBQWIsRUFBbUI7QUFDbkIsdUJBQU8sSUFBUCxDQURtQjthQUF2QjtBQUdBLGdCQUFNLFlBQWUsQ0FBQyxTQUFTLE1BQVQsR0FBa0IsS0FBSyxXQUFMLENBQW5CLENBQXFDLE9BQXJDLENBQTZDLENBQTdDLE9BQWYsQ0FKeUI7QUFLL0IsZ0JBQUksYUFBYSxVQUFiLENBTDJCO0FBTS9CLGdCQUFJLENBQUMsS0FBSyxXQUFMLEVBQWtCO0FBQ25CLDhCQUFjLGVBQWQsQ0FEbUI7YUFBdkIsTUFFTyxJQUFJLGFBQUosRUFBbUI7QUFDdEIsOEJBQWMsY0FBZCxDQURzQjthQUFuQixNQUVBO0FBQ0gsOEJBQWMsYUFBZCxDQURHO2FBRkE7QUFLUCxtQkFDSTs7a0JBQU8sV0FBWSxVQUFaLEVBQXlCLE9BQVEsRUFBRSxPQUFPLFNBQVAsRUFBVixFQUFoQztnQkFBK0Q7OztvQkFDM0Q7Ozt3QkFDTSxTQUFTLEdBQVQsQ0FBYSxVQUFDLENBQUQsRUFBSSxHQUFKO21DQUNYOzs7QUFDSSwrQ0FBVSxNQUFWO0FBQ0EseUNBQU0sR0FBTjtBQUNBLDJDQUFRLEVBQUUsT0FBTyxPQUFLLEtBQUwsRUFBakI7aUNBSEo7Z0NBS00sQ0FMTjs7eUJBRFcsQ0FEbkI7cUJBRDJEO2lCQUEvRDthQURKLENBYitCOzs7O2lDQTZCMUI7QUFDTCxnQkFBTSxhQUFhLEtBQUssUUFBTCxHQUFnQixlQUFoQixHQUFrQyxNQUFsQyxDQURkO0FBRUwsZ0JBQU0sWUFBWSxLQUFLLFFBQUwsR0FDWixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLFVBQUMsQ0FBRCxFQUFJLEdBQUo7dUJBQVksTUFBTSxDQUFOLEtBQVksQ0FBWjthQUFaLENBRFQsR0FFWixLQUFLLFFBQUwsQ0FKRDtBQUtMLGdCQUFNLGFBQWEsS0FBSyxRQUFMLEdBQ2IsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixVQUFDLENBQUQsRUFBSSxHQUFKO3VCQUFZLE1BQU0sQ0FBTixLQUFZLENBQVo7YUFBWixDQURSLEdBRWIsSUFGYSxDQUxkO0FBUUwsbUJBQ0k7O2tCQUFLLFdBQVksVUFBWixFQUF5QixPQUFRLEVBQUUsVUFBVSxLQUFLLFNBQUwsRUFBcEIsRUFBOUI7Z0JBQ00sS0FBSyxTQUFMLENBQWUsU0FBZixFQUEwQixLQUExQixDQUROO2dCQUVNLEtBQUssU0FBTCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FGTjthQURKLENBUks7Ozs7NEJBbEVNOzs7QUFDWCxtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0M7dUJBQ25DLE1BQU0sT0FBTixDQUFjLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBZCxHQUNNLE9BQUssS0FBTCxDQUFXLFFBQVgsR0FDQSxDQUFDLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FGUDthQURtQyxDQUF2QyxDQURXOzs7OzRCQU9BOzs7QUFDWCxtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0M7dUJBQ25DLE9BQUssUUFBTCxDQUFjLE1BQWQsSUFBd0IsQ0FBeEI7YUFEbUMsQ0FBdkMsQ0FEVzs7Ozs0QkFLRzs7O0FBQ2QsbUJBQU8sS0FBSyxjQUFMLENBQW9CLGFBQXBCLEVBQW1DO3VCQUN0QyxPQUFLLFFBQUwsR0FDTSxRQUFRLE9BQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsQ0FBdkIsQ0FBUixHQUFvQyxDQUFwQyxHQUNBLE9BQU8sT0FBSyxRQUFMLENBQWMsTUFBZDthQUh5QixDQUExQyxDQURjOzs7OzRCQU9OOzs7QUFDUixtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkI7dUJBQzVCLE9BQUssV0FBTCxDQUFpQixPQUFqQixDQUF5QixDQUF6QjthQUQ0QixDQUFwQyxDQURROzs7OzRCQUtJOzs7QUFDWixtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsV0FBcEIsRUFBaUMsWUFBTTtBQUMxQyxvQkFBTSxZQUFZLE9BQUssUUFBTCxHQUNaLEtBQUssS0FBTCxDQUFXLENBQUMsT0FBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUF2QixDQUFELEdBQTZCLENBQTdCLEdBQWlDLEtBQWpDLENBREMsR0FFWixPQUFLLFFBQUwsQ0FBYyxNQUFkLENBSG9DO0FBSTFDLHVCQUFVLE1BQU0sU0FBTixPQUFWLENBSjBDO2FBQU4sQ0FBeEMsQ0FEWTs7Ozs0QkFRRTs7O0FBQ2QsbUJBQU8sS0FBSyxjQUFMLENBQW9CLGFBQXBCLEVBQW1DO3VCQUN0QyxPQUFLLFFBQUwsSUFBaUIsT0FBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUF2QixLQUE2QixDQUE3QjthQURxQixDQUExQyxDQURjOzs7O1dBakNEO0VBQWEsMEJBQVcsTUFBTSxTQUFOOztrQkFBeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDS0E7Ozs7Ozs7Ozs7Ozs7OzZNQUNqQixXQUFXLFlBQU07QUFDYix1Q0FBWSxvQkFBRSwyQkFBRixDQUFaLEVBQTRDLFlBQU07QUFDOUMsb0JBQUksTUFBSyxLQUFMLENBQVcsSUFBWCxFQUFpQjtBQUNqQiwwQ0FBSSxXQUFKLEVBQWlCLEVBQUUsU0FBUyxNQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEVBQWhCLEVBQTVCLEVBQWtELFNBQWxELENBQTREOytCQUFNLEtBQUssS0FBTDtxQkFBTixDQUE1RCxDQUFnRixJQUFoRixHQURpQjtpQkFBckI7YUFEd0MsQ0FBNUMsQ0FEYTtTQUFOLFFBT1gsZUFBZSxZQUFNO0FBQ2pCLHVDQUFZLG9CQUFFLCtCQUFGLENBQVosRUFBZ0QsWUFBTTtBQUNsRCxvQkFBSSxNQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ2pCLDBDQUFJLGVBQUosRUFBcUIsRUFBRSxTQUFTLE1BQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsRUFBaEIsRUFBaEMsRUFBc0QsU0FBdEQsQ0FBZ0U7K0JBQU0sS0FBSyxLQUFMO3FCQUFOLENBQWhFLENBQW9GLElBQXBGLEdBRGlCO2lCQUFyQjthQUQ0QyxDQUFoRCxDQURpQjtTQUFOLFFBT2YsdUJBQXVCLFlBQU07QUFDekIsdUNBQVksb0JBQUUsMENBQUYsQ0FBWixFQUEyRCxZQUFNO0FBQzdELG9CQUFJLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUI7O0FBQ2pCLDRCQUFJLFVBQVUsTUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixFQUFoQjtBQUNkLDhDQUFJLFdBQUosRUFBaUIsRUFBRSxnQkFBRixFQUFqQixFQUE4QixTQUE5QixDQUF3QyxZQUFNO0FBQzFDLGtEQUFJLHVCQUFKLEVBQTZCLEVBQUUsZ0JBQUYsRUFBN0IsRUFBMEMsU0FBMUMsQ0FBb0Q7dUNBQU0sS0FBSyxLQUFMOzZCQUFOLENBQXBELENBQXdFLElBQXhFLEdBRDBDO3lCQUFOLENBQXhDLENBRUcsSUFGSDt5QkFGaUI7aUJBQXJCO2FBRHVELENBQTNELENBRHlCO1NBQU4sUUFVdkIsMkJBQTJCLFlBQU07QUFDN0IsdUNBQVksb0JBQUUsOENBQUYsQ0FBWixFQUErRCxZQUFNO0FBQ2pFLG9CQUFJLE1BQUssS0FBTCxDQUFXLElBQVgsRUFBaUI7O0FBQ2pCLDRCQUFJLFVBQVUsTUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixFQUFoQjtBQUNkLDhDQUFJLGVBQUosRUFBcUIsRUFBRSxnQkFBRixFQUFyQixFQUFrQyxTQUFsQyxDQUE0QyxZQUFNO0FBQzlDLGtEQUFJLHVCQUFKLEVBQTZCLEVBQUUsZ0JBQUYsRUFBN0IsRUFBMEMsU0FBMUMsQ0FBb0Q7dUNBQU0sS0FBSyxLQUFMOzZCQUFOLENBQXBELENBQXdFLElBQXhFLEdBRDhDO3lCQUFOLENBQTVDLENBRUcsSUFGSDt5QkFGaUI7aUJBQXJCO2FBRDJELENBQS9ELENBRDZCO1NBQU47OztpQkF6QlY7OytDQW1DTTtBQUNuQixnQkFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FETTtBQUVuQixnQkFBTSxjQUFjLEtBQUssS0FBSyxNQUFMLEdBQWMsQ0FBZCxDQUFMLENBQXNCLElBQXRCLENBRkQ7QUFHbkIsZ0JBQUksZ0JBQWdCLEtBQUssQ0FBTCxFQUFRLElBQVIsRUFBYztBQUM5Qix1QkFBTyxLQUFQLENBRDhCO2FBQWxDO0FBR0EsZ0JBQU0sY0FBYyxLQUFLLE1BQUwsQ0FBWTt1QkFBSyxFQUFFLElBQUYsS0FBVyxXQUFYO2FBQUwsQ0FBMUIsQ0FOYTtBQU9uQixnQkFBTSxZQUFZLEtBQUssTUFBTCxDQUFZO3VCQUFLLEVBQUUsSUFBRixLQUFXLGNBQWMsQ0FBZDthQUFoQixDQUF4QixDQVBhO0FBUW5CLGdCQUFJLFNBQVMsSUFBSSxHQUFKLEVBQVQsQ0FSZTtBQVNuQixnQkFBTSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQWU7Ozs7OztBQUMvQix5Q0FBb0IsSUFBSSxNQUFKLDBCQUFwQixvR0FBZ0M7NEJBQXJCLG9CQUFxQjs7QUFDNUIsNEJBQU0sUUFBUSxNQUFNLG1CQUFOLENBRGM7QUFFNUIsNEJBQUksQ0FBQyxPQUFPLEdBQVAsQ0FBVyxLQUFYLENBQUQsRUFBb0I7QUFDcEIsbUNBQU8sR0FBUCxDQUFXLEtBQVgsRUFBa0I7QUFDZCx3Q0FBUSxDQUFSO0FBQ0Esc0NBQU0sQ0FBTjs2QkFGSixFQURvQjt5QkFBeEI7QUFNQSw0QkFBSSxNQUFNLFNBQU4sRUFBaUI7QUFDakIsOEJBQUUsT0FBTyxHQUFQLENBQVcsS0FBWCxFQUFrQixJQUFsQixDQUFGLENBRGlCO3lCQUFyQjtxQkFSSjs7Ozs7Ozs7Ozs7Ozs7aUJBRCtCO2FBQWYsQ0FURDs7Ozs7O0FBdUJuQixzQ0FBa0Isc0NBQWxCLHdHQUErQjt3QkFBcEIsbUJBQW9COztBQUMzQixnQ0FBWSxHQUFaLEVBQWlCLFFBQWpCLEVBRDJCO2lCQUEvQjs7Ozs7Ozs7Ozs7Ozs7YUF2Qm1COzs7Ozs7O0FBMEJuQixzQ0FBa0Isb0NBQWxCLHdHQUE2Qjt3QkFBbEIsbUJBQWtCOztBQUN6QixnQ0FBWSxHQUFaLEVBQWlCLE1BQWpCLEVBRHlCO2lCQUE3Qjs7Ozs7Ozs7Ozs7Ozs7YUExQm1COzs7Ozs7O0FBNkJuQixzQ0FBb0IsT0FBTyxNQUFQLDZCQUFwQix3R0FBcUM7d0JBQTFCLHFCQUEwQjs7QUFDakMsd0JBQUksTUFBTSxJQUFOLEdBQWEsQ0FBYixJQUFrQixNQUFNLE1BQU4sR0FBZSxZQUFZLE1BQVosRUFBb0I7QUFDckQsK0JBQU8sSUFBUCxDQURxRDtxQkFBekQ7aUJBREo7Ozs7Ozs7Ozs7Ozs7O2FBN0JtQjs7QUFrQ25CLG1CQUFPLEtBQVAsQ0FsQ21COzs7O3dDQW9DUDtBQUNaLGdCQUFJLENBQUMsS0FBSyxvQkFBTCxFQUFELEVBQThCO0FBQzlCLHVCQUFPLElBQVAsQ0FEOEI7YUFBbEM7QUFHQSxtQkFDSTs7a0JBQUssV0FBVSxTQUFWLEVBQUw7Z0JBQ0k7O3NCQUFLLFdBQVUsU0FBVixFQUFMO29CQUNNLG9CQUFFLHNDQUFGLENBRE47aUJBREo7YUFESixDQUpZOzs7O3FDQVlILE1BQU0sVUFBVTtBQUN6QixtQkFDSTs7O0FBQ0ksMEJBQUssUUFBTDttQkFDSyw4QkFBZSxRQUFmLEVBRlQ7Z0JBSU0sd0NBQW9CLElBQXBCLENBSk47YUFESixDQUR5Qjs7OztpQ0FVcEI7QUFDTCxtQkFDSTs7a0JBQUssV0FBVSxjQUFWLEVBQUw7Z0JBQ00sS0FBSyxhQUFMLEVBRE47Z0JBRU0sS0FBSyxZQUFMLENBQWtCLFdBQWxCLEVBQStCLEtBQUssUUFBTCxDQUZyQztnQkFHTSxLQUFLLFlBQUwsQ0FBa0IsZUFBbEIsRUFBbUMsS0FBSyxZQUFMLENBSHpDO2dCQUlNLEtBQUssWUFBTCxDQUFrQiwwQkFBbEIsRUFBOEMsS0FBSyxvQkFBTCxDQUpwRDtnQkFLTSxLQUFLLFlBQUwsQ0FBa0IsOEJBQWxCLEVBQWtELEtBQUssd0JBQUwsQ0FMeEQ7YUFESixDQURLOzs7O1dBN0ZRO0VBQW9CLE1BQU0sU0FBTjs7a0JBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0xBOzs7Ozs7Ozs7OztnREFDTztBQUNwQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsVUFBZixDQUNGLEdBREUsQ0FDRSxVQUFDLElBQUQsRUFBTyxHQUFQO3VCQUFnQixFQUFFLEtBQUssTUFBTSxDQUFOLEVBQVMsV0FBVyxJQUFYO2FBQWhDLENBREYsQ0FFRixNQUZFLENBRUssVUFBQyxJQUFEO3VCQUFVLEtBQUssU0FBTCxDQUFlLGNBQWYsS0FBa0MsS0FBSyxTQUFMLENBQWUsS0FBZjthQUE1QyxDQUZaLENBRG9COzs7O2lDQUtmO0FBQ0wsZ0JBQUksc0JBQXNCLEtBQUsscUJBQUwsRUFBdEIsQ0FEQztBQUVMLGdCQUFJLG9CQUFvQixNQUFwQixLQUErQixDQUEvQixFQUFrQztBQUNsQyx1QkFBTyxJQUFQLENBRGtDO2FBQXRDO0FBR0EsbUJBQ0k7OztnQkFDSSw2QkFBSyxXQUFVLFFBQVYsRUFBTCxDQURKO2dCQUVJOzs7b0JBQU0sb0JBQUUsdUNBQUYsQ0FBTjtpQkFGSjtnQkFHSTs7c0JBQU8sV0FBVSxZQUFWLEVBQVA7b0JBQThCOzs7d0JBQ3hCLG9CQUFvQixHQUFwQixDQUF3QixVQUFDLElBQUQ7bUNBQ3RCOztrQ0FBSSxLQUFNLEtBQUssR0FBTCxFQUFWO2dDQUNJOztzQ0FBSSxXQUFVLEtBQVYsRUFBSjtvQ0FBc0IsS0FBSyxHQUFMO2lDQUQxQjtnQ0FFSTs7O29DQUFNLEtBQUssU0FBTCxDQUFlLFdBQWY7aUNBRlY7Z0NBR0k7O3NDQUFJLFdBQVUsaUJBQVYsRUFBSjtvQ0FBa0MsS0FBSyxTQUFMLENBQWUsY0FBZixDQUE4QixPQUE5QixDQUFzQyxDQUF0QyxDQUFsQztpQ0FISjtnQ0FJSTs7c0NBQUksV0FBVSxpQkFBVixFQUFKOztpQ0FKSjtnQ0FLSTs7c0NBQUksV0FBVSxnQkFBVixFQUFKO29DQUFpQyxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLE9BQXJCLENBQTZCLENBQTdCLENBQWpDO2lDQUxKOzt5QkFEc0IsQ0FEQTtxQkFBOUI7aUJBSEo7YUFESixDQUxLOzs7O1dBTlE7RUFBMkIsTUFBTSxTQUFOOztrQkFBM0I7Ozs7Ozs7O2tCQ0ZHO0FBQVQsU0FBUyxJQUFULENBQWMsS0FBZCxFQUFxQjtBQUNoQyxRQUFNLFlBQVksTUFBTSxLQUFOLElBQWUsTUFBTSxLQUFOLENBQVksU0FBWixDQUREO0FBRWhDLFdBQ0k7O1VBQUksV0FBWSxZQUFZLFdBQVosR0FBMEIsRUFBMUIsRUFBaEI7UUFDTSxNQUFNLEtBQU4sR0FDSSxNQUFNLEtBQU4sQ0FBWSxJQUFaLENBQWlCLFdBQWpCLENBQTZCLE9BQTdCLENBQXFDLENBQXJDLENBREosR0FFSSxHQUZKO0tBRlYsQ0FGZ0M7Q0FBckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNNTTs7Ozs7Ozs7Ozs7d0NBa0JEOzs7QUFDWixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGlCQUFTO0FBQzVCLG9CQUFNLEtBQUssT0FBSyxpQkFBTCxDQUF1QixHQUF2QixDQUEyQixNQUFNLG1CQUFOLENBQWhDLENBRHNCO0FBRTVCLHVCQUNJOztzQkFBSSxLQUFNLE1BQU0sRUFBTixFQUFWO3lCQUNTLEdBQUcsS0FBSCxDQUFTLE1BQVQsSUFBb0IsR0FBRyxJQUFILEtBQVksWUFBWixHQUEyQixNQUEzQixHQUFvQyxFQUFwQyxDQUQ3QjtpQkFESixDQUY0QjthQUFULENBQXZCLENBRFk7Ozs7dUNBVUQ7OztBQUNYLG1CQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsaUJBQVM7QUFDNUIsb0JBQU0sS0FBSyxPQUFLLGlCQUFMLENBQXVCLEdBQXZCLENBQTJCLE1BQU0sbUJBQU4sQ0FBaEMsQ0FEc0I7QUFFNUIsdUJBQ0k7QUFDSSwyQkFBUSxHQUFHLEtBQUg7QUFDUix5QkFBTSxHQUFHLEVBQUg7QUFDTiwyQkFBUSxLQUFSO2lCQUhKLENBREosQ0FGNEI7YUFBVCxDQUF2QixDQURXOzs7O2lDQVlOO0FBQ0wsbUJBQ0k7OztnQkFDSTs7O29CQUFNLG9CQUFFLHNDQUFGLENBQU47aUJBREo7Z0JBRUk7O3NCQUFPLFdBQVUsbUJBQVYsRUFBUDtvQkFBcUM7Ozt3QkFDakM7OzhCQUFJLFdBQVUsU0FBVixFQUFKOzRCQUNNLEtBQUssYUFBTCxFQUROO3lCQURpQzt3QkFJakM7OzhCQUFJLFdBQVUsUUFBVixFQUFKOzRCQUNNLEtBQUssWUFBTCxFQUROO3lCQUppQztxQkFBckM7aUJBRko7YUFESixDQURLOzs7OzRCQXZDUzs7O0FBQ2QsbUJBQU8sS0FBSyxjQUFMLENBQW9CLGFBQXBCLEVBQW1DO3VCQUN0QyxPQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixNQUE1QixDQUFtQzsyQkFBTSxHQUFHLElBQUgsS0FBWSxhQUFaLElBQTZCLEdBQUcsSUFBSCxLQUFZLFlBQVo7aUJBQW5DO2FBREcsQ0FBMUMsQ0FEYzs7Ozs0QkFJTTs7O0FBQ3BCLG1CQUFPLEtBQUssY0FBTCxDQUFvQixtQkFBcEIsRUFBeUMsWUFBTTtBQUNsRCxvQkFBSSxTQUFTLElBQUksR0FBSixFQUFULENBRDhDOzs7Ozs7QUFFbEQseUNBQWlCLE9BQUssV0FBTCwwQkFBakIsb0dBQW1DOzRCQUF4QixpQkFBd0I7O0FBQy9CLCtCQUFPLEdBQVAsQ0FBVyxHQUFHLEVBQUgsRUFBTyxFQUFsQixFQUQrQjtxQkFBbkM7Ozs7Ozs7Ozs7Ozs7O2lCQUZrRDs7QUFLbEQsdUJBQU8sTUFBUCxDQUxrRDthQUFOLENBQWhELENBRG9COzs7OzRCQVNYOzs7QUFDVCxtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsUUFBcEIsRUFBOEI7dUJBQ2pDLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxNQUFmLENBQXNCLE1BQXRCLENBQTZCOzJCQUFTLE9BQUssaUJBQUwsQ0FBdUIsR0FBdkIsQ0FBMkIsTUFBTSxtQkFBTjtpQkFBcEM7YUFESSxDQUFyQyxDQURTOzs7O1dBZEk7RUFBdUIsMEJBQVcsTUFBTSxTQUFOOztrQkFBbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBQTs7Ozs7Ozs7Ozs7MkNBQ0U7QUFDZixrQ0FBSSx3QkFBSixFQUE4QixFQUFFLFFBQVEsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEVBQWYsRUFBeEMsRUFBNkQsSUFBN0QsR0FEZTs7Ozt3Q0FHSDtBQUNaLGtDQUFJLG9CQUFKLEVBQTBCLEVBQUUsUUFBUSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBZixFQUFwQyxFQUF5RCxJQUF6RCxHQURZOzs7O3VDQUdEO0FBQ1gsZ0JBQUksS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFNBQWYsRUFBMEI7QUFDMUIsdUJBQ0k7OztBQUNJLDhCQUFLLFFBQUw7QUFDQSxtQ0FBVSxlQUFWO3VCQUNLLGlDQUFrQixLQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQTJCLElBQTNCLENBQWxCLEVBSFQ7b0JBS00sb0JBQUUsa0NBQUYsQ0FMTjtpQkFESixDQUQwQjthQUE5QixNQVVPO0FBQ0gsdUJBQ0k7OztBQUNJLDhCQUFLLFFBQUw7QUFDQSxtQ0FBVSxXQUFWO3VCQUNLLGlDQUFrQixLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBbEIsRUFIVDtvQkFLTSxvQkFBRSxxQ0FBRixDQUxOO2lCQURKLENBREc7YUFWUDs7OztpQ0FzQks7QUFDTCxtQkFDSTs7a0JBQUssV0FBVSxzQkFBVixFQUFMO2dCQUNNLEtBQUssWUFBTCxFQUROO2FBREosQ0FESzs7OztXQTlCUTtFQUEyQixNQUFNLFNBQU47O2tCQUEzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRkE7Ozs7Ozs7Ozs7Ozs7OzhNQWdCakIsZUFBZSxVQUFDLEtBQUQsRUFBVztBQUN0QixrQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixTQUF6QixFQUFvQyxLQUFwQyxFQURzQjtTQUFYOzs7aUJBaEJFOztpQ0FvQlI7QUFDTCxnQkFBTSxZQUFZLENBQUMsbUJBQUQsRUFBc0Isd0JBQXRCLEVBQWdELE9BQWhELENBQXdELEtBQUssS0FBTCxDQUFXLGlCQUFYLENBQXhELElBQXlGLENBQXpGLEdBQ1osQ0FDRSxDQUFDLENBQUQsRUFBTyxvQkFBRSxzQkFBRixDQUFQLENBREYsRUFFRSxDQUFDLENBQUMsQ0FBRCxFQUFNLG9CQUFFLG9DQUFGLENBQVAsQ0FGRixFQUdFLENBQUMsQ0FBQyxFQUFELEVBQU0sb0JBQUUsaUNBQUYsQ0FBUCxDQUhGLENBRFksR0FNWixDQUNFLENBQUMsQ0FBRCxFQUFPLG9CQUFFLHNCQUFGLENBQVAsQ0FERixFQUVFLENBQUMsQ0FBQyxDQUFELEVBQU0sb0JBQUUsK0JBQUYsQ0FBUCxDQUZGLEVBR0UsQ0FBQyxDQUFDLEVBQUQsRUFBTSxvQkFBRSw0QkFBRixDQUFQLENBSEYsRUFJRSxDQUFDLENBQUMsR0FBRCxFQUFNLG9CQUFFLDhCQUFGLENBQVAsQ0FKRixDQU5ZLENBRGI7QUFhTCxtQkFDSTs7O2dCQUNJOzs7b0JBQ00sb0JBQUUsZ0NBQUYsQ0FETjtpQkFESjtnQkFJSTtBQUNJLDZCQUFVLFNBQVY7QUFDQSwyQkFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLE9BQS9CO0FBQ1IsOEJBQVcsS0FBSyxZQUFMO2lCQUhmLENBSko7YUFESixDQWJLOzs7OzRCQW5CYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2YscUNBQVMsR0FBRyxNQUFILENBQVUsVUFBVjt5QkFESCxFQUVQLFVBRk87cUJBRFIsRUFJSCxVQUpHO2lCQURILEVBTUosVUFOSTtBQU9QLG1DQUFtQixHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ25CLCtCQUFlLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFUbkIsQ0FGbUI7Ozs7V0FETjtFQUFxQixNQUFNLFNBQU47O2tCQUFyQjs7Ozs7Ozs7a0JDRkc7Ozs7Ozs7O0FBQVQsU0FBUyxpQkFBVCxDQUEyQixLQUEzQixFQUFrQztBQUM3QyxRQUFJLENBQUMsTUFBTSxHQUFOLENBQVUsY0FBVixDQUF5QixTQUF6QixJQUFzQyxNQUFNLEdBQU4sQ0FBVSxjQUFWLENBQXlCLFNBQXpCLENBQW1DLE1BQW5DLEtBQThDLENBQTlDLEVBQWlEO0FBQ3hGLGVBQU8sZ0NBQVAsQ0FEd0Y7S0FBNUY7QUFHQSxXQUNJOzs7UUFDSSw2QkFBSyxXQUFVLFFBQVYsRUFBTCxDQURKO1FBRUk7OztZQUFNLG9CQUFFLHlEQUFGLENBQU47U0FGSjtRQUdJOztjQUFPLFdBQVUsWUFBVixFQUFQO1lBQThCOzs7O2dCQUMxQixNQUFNLEdBQU4sQ0FBVSxjQUFWLENBQXlCLFNBQXpCLENBQW1DLEdBQW5DLENBQXVDLFVBQUMsQ0FBRCxFQUFJLEdBQUo7MkJBQ25DOzswQkFBSSxLQUFNLEdBQU4sRUFBSjt3QkFDSTs7OEJBQUksV0FBVSxrQkFBVixFQUFKOzRCQUFpQzs7O2dDQUFVLEVBQUUsT0FBRjs2QkFBM0M7eUJBREo7d0JBRUk7Ozs0QkFBTSxFQUFFLElBQUY7eUJBRlY7O2lCQURtQyxDQURiO2FBQTlCO1NBSEo7S0FESixDQUo2QztDQUFsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBTTs7Ozs7Ozs7Ozs7d0NBT0Q7QUFDWixnQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0I7QUFDbkIsdUJBQU8sQ0FBQyxHQUFELEVBQU0sRUFBTixDQUFQLENBRG1CO2FBQXZCO0FBR0EsZ0JBQUksZUFBZSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLGdCQUEvQixDQUpQO0FBS1osZ0JBQUksaUJBQWlCLElBQWpCLEVBQXVCO0FBQ3ZCLHVCQUFPLENBQUMsR0FBRCxFQUFNLEVBQU4sQ0FBUCxDQUR1QjthQUEzQixNQUVPLElBQUksWUFBSixFQUFrQjtBQUNyQix1QkFBTyxDQUFDLEdBQUQsRUFBTSxPQUFOLENBQVAsQ0FEcUI7YUFBbEIsTUFFQTtBQUNILHVCQUFPLENBQUMsSUFBRCxFQUFPLEtBQVAsQ0FBUCxDQURHO2FBRkE7Ozs7aUNBTUY7QUFDTCxnQkFBSSxjQUFjLEtBQUssYUFBTCxFQUFkLENBREM7QUFFTCxnQkFBSSxhQUFhLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FDWCxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLFVBQS9CLEdBQ0EsQ0FGVyxDQUZaO0FBS0wsZ0JBQUksWUFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsU0FBakIsQ0FML0I7QUFNTCxtQkFDSTs7O2dCQUNJOztzQkFBSSxXQUFZLFlBQVksV0FBWixHQUEwQixFQUExQixFQUFoQjtvQkFBaUQsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQjtpQkFEckQ7Z0JBRUk7O3NCQUFPLFdBQVUsaUJBQVYsRUFBUDtvQkFBbUM7Ozt3QkFBTzs7OzRCQUN0Qzs7a0NBQUksV0FBVSxPQUFWLEVBQUo7Z0NBQ00sb0JBQUUsOEJBQUYsQ0FETjs2QkFEc0M7NEJBSXRDOztrQ0FBSSxXQUFVLE9BQVYsRUFBSjtnQ0FDSTs7c0NBQUssV0FBVSxPQUFWLEVBQUw7b0NBQ00sVUFETjtpQ0FESjs2QkFKc0M7NEJBU3RDOztrQ0FBSSxXQUFVLE9BQVYsRUFBSjtnQ0FDTSxvQkFBRSwwQkFBRixDQUROOzZCQVRzQzs0QkFZdEM7O2tDQUFJLFdBQVUsT0FBVixFQUFKO2dDQUNJOztzQ0FBSyxXQUFZLFVBQVUsWUFBWSxDQUFaLENBQVYsRUFBakI7b0NBQ00sWUFBWSxDQUFaLENBRE47aUNBREo7NkJBWnNDO3lCQUFQO3FCQUFuQztpQkFGSjthQURKLENBTks7Ozs7NEJBbkJjO0FBQ25CLG1CQUFPO0FBQ0gsdUJBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1AsdUJBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO2FBRlgsQ0FEbUI7Ozs7V0FETjtFQUFhLE1BQU0sU0FBTjs7a0JBQWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0VBOzs7Ozs7Ozs7OztpQ0FrQlI7OztBQUNMLG1CQUNJOzs7Z0JBQ00sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQjsyQkFDZDtBQUNJLDZCQUFNLE1BQU0sRUFBTjtBQUNOLCtCQUFRLEtBQVI7QUFDQSwrQkFBUSxPQUFLLGlCQUFMLENBQXVCLEdBQXZCLENBQTJCLE1BQU0sbUJBQU4sQ0FBM0IsQ0FBc0QsS0FBdEQ7cUJBSFo7aUJBRGMsQ0FEdEI7YUFESixDQURLOzs7OzRCQWpCUzs7O0FBQ2QsbUJBQU8sS0FBSyxjQUFMLENBQW9CLGFBQXBCLEVBQW1DO3VCQUN0QyxPQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixNQUE1QixDQUFtQzsyQkFBTSxHQUFHLElBQUgsS0FBWSxZQUFaO2lCQUFOO2FBREcsQ0FBMUMsQ0FEYzs7Ozs0QkFJTTs7O0FBQ3BCLG1CQUFPLEtBQUssY0FBTCxDQUFvQixtQkFBcEIsRUFBeUMsWUFBTTtBQUNsRCxvQkFBSSxTQUFTLElBQUksR0FBSixFQUFULENBRDhDOzs7Ozs7QUFFbEQseUNBQWlCLE9BQUssV0FBTCwwQkFBakIsb0dBQW1DOzRCQUF4QixpQkFBd0I7O0FBQy9CLCtCQUFPLEdBQVAsQ0FBVyxHQUFHLEVBQUgsRUFBTyxFQUFsQixFQUQrQjtxQkFBbkM7Ozs7Ozs7Ozs7Ozs7O2lCQUZrRDs7QUFLbEQsdUJBQU8sTUFBUCxDQUxrRDthQUFOLENBQWhELENBRG9COzs7OzRCQVNYOzs7QUFDVCxtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsUUFBcEIsRUFBOEI7dUJBQ2pDLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxNQUFmLENBQXNCLE1BQXRCLENBQTZCOzJCQUFTLE9BQUssaUJBQUwsQ0FBdUIsR0FBdkIsQ0FBMkIsTUFBTSxtQkFBTjtpQkFBcEM7YUFESSxDQUFyQyxDQURTOzs7O1dBZEk7RUFBeUIsMEJBQVcsTUFBTSxTQUFOOztrQkFBcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ09BOzs7Ozs7Ozs7Ozs7OzsrTUFXakIsZ0JBQWdCLFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDNUIsZ0JBQUksYUFBYSxFQUFiLENBRHdCO0FBRTVCLHVCQUFXLEdBQVgsSUFBa0IsS0FBbEIsQ0FGNEI7QUFHNUIsa0JBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsTUFBSyxLQUFMLENBQVcsRUFBWCxFQUFlLFVBQXhDLEVBSDRCO1NBQWhCOzs7aUJBWEM7O2lDQWdCUjtBQUNMLGdCQUFNLFNBQVMsb0JBQUUsOEJBQUYsRUFDWCxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixDQUEyQixNQUEzQixFQUNBLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLENBQTJCLElBQTNCLEVBQ0EsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFdBQWYsQ0FBMkIsU0FBM0IsQ0FBcUMsTUFBckMsQ0FIRSxDQUREO0FBS0wsZ0JBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsU0FBZixFQUEwQjtBQUMzQix1QkFDSTs7c0JBQUssV0FBVSxvQkFBVixFQUFMO29CQUNJOzs7d0JBQ00sTUFETjtxQkFESjtvQkFJSTtBQUNJLDZCQUFNLEtBQUssS0FBTCxDQUFXLEdBQVg7cUJBRFYsQ0FKSjtpQkFESixDQUQyQjthQUEvQjtBQVlBLG1CQUNJOztrQkFBSyxXQUFVLG9CQUFWLEVBQUw7Z0JBQ0k7OztvQkFDTSxNQUROO2lCQURKO2dCQUlJO0FBQ0ksMkJBQVEsS0FBSyxLQUFMO0FBQ1IsbUNBQWdCLEtBQUssYUFBTDtBQUNoQix1Q0FBb0IsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixtQkFBaEI7aUJBSHhCLENBSko7Z0JBU0k7QUFDSSx5QkFBTSxLQUFLLEtBQUwsQ0FBVyxHQUFYO0FBQ04sc0NBQW1CLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBMkIsaUJBQTNCO2lCQUZ2QixDQVRKO2dCQWFJO0FBQ0kseUJBQU0sS0FBSyxLQUFMLENBQVcsR0FBWDtBQUNOLHNDQUFtQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFVBQWhCLENBQTJCLGlCQUEzQjtpQkFGdkIsQ0FiSjtnQkFpQkk7QUFDSSx5QkFBTSxLQUFLLEtBQUwsQ0FBVyxHQUFYO2lCQURWLENBakJKO2dCQW9CSTtBQUNJLHlCQUFNLEtBQUssS0FBTCxDQUFXLEdBQVg7aUJBRFYsQ0FwQko7Z0JBdUJJO0FBQ0kseUJBQU0sS0FBSyxLQUFMLENBQVcsR0FBWDtpQkFEVixDQXZCSjthQURKLENBakJLOzs7OzRCQWZHOzs7QUFDUixtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBTTs7Ozs7O0FBQ3RDLHlDQUFvQixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsTUFBZiwwQkFBcEIsb0dBQTJDOzRCQUFoQyxvQkFBZ0M7O0FBQ3ZDLDRCQUFJLE1BQU0sbUJBQU4sS0FBOEIsT0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixFQUEzQixFQUErQjtBQUM3RCxtQ0FBTyxLQUFQLENBRDZEO3lCQUFqRTtxQkFESjs7Ozs7Ozs7Ozs7Ozs7aUJBRHNDOztBQU10Qyx1QkFBTyxJQUFQLENBTnNDO2FBQU4sQ0FBcEMsQ0FEUTs7OztXQURLO0VBQXNCLDBCQUFXLE1BQU0sU0FBTjs7a0JBQWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDTEE7Ozs7Ozs7Ozs7O3VDQUtGOzs7QUFDWCxtQkFBTyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWM7dUJBQ2pCO0FBQ0kseUJBQU0sSUFBSSxFQUFKO0FBQ04seUJBQU0sR0FBTjtBQUNBLDBCQUFPLE9BQUssS0FBTCxDQUFXLElBQVg7QUFDUCxxQ0FBa0IsT0FBSyxLQUFMLENBQVcsZUFBWDtBQUNsQixtQ0FBZ0IsT0FBSyxLQUFMLENBQVcsYUFBWDtpQkFMcEI7YUFEaUIsQ0FBckIsQ0FEVzs7OztpQ0FXTjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLFlBQVYsRUFBTDtnQkFDSTs7O29CQUNNLEtBQUssWUFBTCxFQUROO2lCQURKO2FBREosQ0FESzs7Ozs0QkFmRTs7O0FBQ1AsbUJBQU8sS0FBSyxjQUFMLENBQW9CLE1BQXBCLEVBQTRCO3VCQUMvQixPQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQXFCLE1BQXJCLENBQTRCOzJCQUFPLElBQUksSUFBSixLQUFhLE9BQUssS0FBTCxDQUFXLElBQVg7aUJBQXBCO2FBREcsQ0FBbkMsQ0FETzs7OztXQURNO0VBQWtCLDBCQUFXLE1BQU0sU0FBTjs7a0JBQTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRkE7Ozs7Ozs7Ozs7Ozs7OztpQ0FZUjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLGNBQVYsRUFBTDtnQkFDSTtBQUNJO0FBQ0EsNEJBQVMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixFQUFoQjtpQkFGYixDQURKO2FBREosQ0FESzs7Ozs0QkFYYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsc0JBQU0sR0FBRyxLQUFILENBQVM7QUFDWCx3QkFBSSxHQUFHLE1BQUgsQ0FBVSxVQUFWO2lCQURGLEVBRUgsVUFGRzthQURWLENBRm1COzs7O1dBRE47RUFBb0IsTUFBTSxTQUFOOztrQkFBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNNQTs7O0FBQ2pCLGFBRGlCLGVBQ2pCLENBQVksS0FBWixFQUFtQjs4QkFERixpQkFDRTs7MkVBREYsNEJBRVAsUUFEUzs7Y0F1Qm5CLGtCQUFrQixZQUFNO0FBQ3BCLGtCQUFLLFVBQUwsQ0FBZ0IsTUFBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixDQUFsQixDQUFoQixDQURvQjtTQUFOLENBdkJDOztjQTBCbkIsa0JBQWtCLFlBQU07QUFDcEIsa0JBQUssVUFBTCxDQUFnQixNQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLENBQWxCLENBQWhCLENBRG9CO1NBQU4sQ0ExQkM7O2NBNkJuQixlQUFlLFVBQUMsSUFBRCxFQUFVO0FBQ3JCLGtCQUFLLFFBQUwsQ0FBYyxFQUFFLFVBQUYsRUFBZCxFQURxQjtTQUFWLENBN0JJOztBQUVmLGNBQUssS0FBTCxHQUFhO0FBQ1Qsa0JBQU0sQ0FBTjtBQUNBLGtCQUFNLE9BQU47U0FGSixDQUZlOztLQUFuQjs7aUJBRGlCOztrREFRUyxZQUFZO0FBQ2xDLGdCQUFJLFdBQVcsSUFBWCxDQUFnQixFQUFoQixLQUF1QixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEVBQWhCLEVBQW9CO0FBQzNDLHFCQUFLLFFBQUwsQ0FBYztBQUNWLDBCQUFNLENBQU47QUFDQSwwQkFBTSxPQUFOO2lCQUZKLEVBRDJDO2FBQS9DOzs7O21DQVVPLE9BQU87QUFDZCxpQkFBSyxRQUFMLENBQWM7QUFDVixzQkFBTSxLQUFOO2FBREosRUFEYzs7OztzQ0FjSjtBQUNWLG1CQUNJO0FBQ0ksaUNBQWtCLEtBQUssS0FBTCxDQUFXLGVBQVg7QUFDbEIsc0JBQU8sS0FBSyxLQUFMLENBQVcsSUFBWDtBQUNQLHNCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDUCwrQkFBZ0IsS0FBSyxLQUFMLENBQVcsYUFBWDthQUpwQixDQURKLENBRFU7Ozs7d0NBVUU7QUFDWixtQkFDSTtBQUNJLHNCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7YUFEWCxDQURKLENBRFk7Ozs7d0NBT0E7QUFDWixtQkFDSTtBQUNJLHNCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7YUFEWCxDQURKLENBRFk7Ozs7dUNBT0Q7QUFDWCxnQkFBTSxjQUFjLEtBQUssV0FBTCxDQURUO0FBRVgsbUJBQ0k7QUFDSSx1QkFBUSxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEtBQTNCO0FBQ1Isc0JBQU8sS0FBSyxLQUFMLENBQVcsSUFBWDtBQUNQLHNCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDUCw0QkFBYSxXQUFiO0FBQ0EseUJBQVUsV0FBVjtBQUNBLGlDQUFrQixLQUFLLGVBQUw7QUFDbEIsaUNBQWtCLEtBQUssZUFBTDthQVB0QixDQURKLENBRlc7Ozs7cUNBY0Y7QUFDVCxvQkFBUSxLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ1IscUJBQUssT0FBTDtBQUNJLDJCQUFPLEtBQUssV0FBTCxFQUFQLENBREo7QUFEQSxxQkFHSyxTQUFMO0FBQ0ksMkJBQU8sS0FBSyxhQUFMLEVBQVAsQ0FESjtBQUhBLHFCQUtLLFNBQUw7QUFDSSwyQkFBTyxLQUFLLGFBQUwsRUFBUCxDQURKO0FBTEEsYUFEUzs7Ozt1Q0FVRTtBQUNYLG1CQUNJOztrQkFBUSxPQUFRLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBa0IsVUFBVyxLQUFLLFlBQUwsRUFBN0M7Z0JBQ0k7QUFDSSwyQkFBUSxvQkFBRSxvQkFBRixDQUFSO0FBQ0EsMEJBQUssT0FBTDtpQkFGSixDQURKO2dCQUtJO0FBQ0ksMkJBQVEsb0JBQUUsc0JBQUYsQ0FBUjtBQUNBLDBCQUFLLFNBQUw7aUJBRkosQ0FMSjtnQkFTSTtBQUNJLDJCQUFRLG9CQUFFLHNCQUFGLENBQVI7QUFDQSwwQkFBSyxTQUFMO2lCQUZKLENBVEo7YUFESixDQURXOzs7O2lDQWtCTjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLHFDQUFWLEVBQUw7Z0JBQ00sS0FBSyxZQUFMLEVBRE47Z0JBRU0sS0FBSyxVQUFMLEVBRk47Z0JBR00sS0FBSyxZQUFMLEVBSE47YUFESixDQURLOzs7OzRCQW5GUzs7O0FBQ2QsbUJBQU8sZUFBSyxHQUFMLGlDQUFZLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBeUI7dUJBQU8sSUFBSSxJQUFKO2FBQVAsRUFBckMsQ0FBUCxDQURjOzs7O1dBaEJEO0VBQXdCLE1BQU0sU0FBTjs7a0JBQXhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNOQTs7Ozs7Ozs7Ozs7K0NBQ007QUFDbkIsZ0JBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixDQUFuQixFQUFzQjtBQUN0Qix1QkFDSSw2QkFBSyxXQUFVLGtCQUFWLEVBQUwsQ0FESixDQURzQjthQUExQjtBQUtBLG1CQUNJOztrQkFBSyxXQUFVLHVCQUFWLEVBQUw7Z0JBQ0k7O29CQUFhLGlDQUFrQixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQS9CO29CQUNNLG9CQUFFLDBCQUFGLENBRE47aUJBREo7YUFESixDQU5tQjs7OzsrQ0FjQTtBQUNuQixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLElBQW1CLEtBQUssS0FBTCxDQUFXLE9BQVgsRUFBb0I7QUFDdkMsdUJBQ0ksNkJBQUssV0FBVSxrQkFBVixFQUFMLENBREosQ0FEdUM7YUFBM0M7QUFLQSxtQkFDSTs7a0JBQUssV0FBVSx3QkFBVixFQUFMO2dCQUNJOztvQkFBYSxpQ0FBa0IsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEvQjtvQkFDTSxvQkFBRSwwQkFBRixDQUROO2lCQURKO2FBREosQ0FObUI7Ozs7aUNBY2Q7QUFDTCxnQkFBTSxlQUFlLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsZ0JBQWpCLElBQXFDLG9CQUFFLHdCQUFGLEVBQTRCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsTUFBakIsQ0FBakUsQ0FEaEI7QUFFTCxtQkFDSTs7O2dCQUNNLEtBQUssb0JBQUwsRUFETjtnQkFFSTs7c0JBQUssV0FBVSxNQUFWLEVBQUw7b0JBQ0k7OzBCQUFLLFdBQVUsS0FBVixFQUFMO3dCQUNJOzs7NEJBQU0sWUFBTjt5QkFESjt3QkFFSTs7OzRCQUFNLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakI7eUJBRlY7cUJBREo7b0JBS0k7OzBCQUFLLFdBQVUsS0FBVixFQUFMO3dCQUNJOzs7NEJBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixVQUFoQixDQUEyQixJQUEzQjt5QkFEVjt3QkFFSTs7OzRCQUNNLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEI7cUNBRE47NEJBR00sb0JBQUUsMkJBQUYsRUFBK0IsS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBSHREO3lCQUZKO3FCQUxKO2lCQUZKO2dCQWdCTSxLQUFLLG9CQUFMLEVBaEJOO2FBREosQ0FGSzs7OztXQTdCUTtFQUFlLE1BQU0sU0FBTjs7a0JBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBOzs7Ozs7Ozs7Ozs7OzsrTUFDakIsV0FBVyxVQUFDLEtBQUQsRUFBVztBQUNsQixrQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixRQUF6QixFQUFtQyxLQUFuQyxFQURrQjtTQUFYOzs7aUJBRE07O2lDQUlSO0FBQ0wsbUJBQ0k7QUFDSSx1QkFBUSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLE1BQXJCO0FBQ1IsdUJBQU0sTUFBTjtBQUNBLDBCQUFXLEtBQUssUUFBTDtBQUNYLHFCQUFNLENBQU47QUFDQSxxQkFBTSxFQUFOO0FBQ0EseUJBQVUsRUFBVjthQU5KLENBREosQ0FESzs7OztXQUpRO0VBQXNCLE1BQU0sU0FBTjs7a0JBQXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRkE7Ozs7Ozs7Ozs7O2lDQUNSO0FBQ0wsbUJBQ0k7O2tCQUFLLFdBQVUsaUJBQVYsRUFBTDtnQkFDSTs7c0JBQUssV0FBVSxxQkFBVixFQUFMO29CQUNJOzswQkFBSyxXQUFVLFFBQVYsRUFBTDt3QkFDSTtBQUNJLHNDQUFXLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDWCxzQ0FBVyxLQUFLLEtBQUwsQ0FBVyxjQUFYO0FBQ1gsMkNBQWdCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsY0FBaEI7QUFDaEIsbUNBQVEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixLQUFoQjt5QkFKWixDQURKO3FCQURKO2lCQURKO2dCQVdJOzs7b0JBQ00sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixXQUFoQjtpQkFaVjtnQkFjSSw2QkFBSyxXQUFVLFVBQVYsRUFBTCxDQWRKO2FBREosQ0FESzs7OztXQURRO0VBQWdCLE1BQU0sU0FBTjs7a0JBQWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQUE7Ozs7Ozs7Ozs7Ozs7OytNQVVqQixjQUFjLFlBQU07QUFDaEIsZ0JBQUksTUFBSyxLQUFMLENBQVcsUUFBWCxFQUFxQjtBQUNyQix1QkFEcUI7YUFBekI7QUFHQSxrQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLEdBQUwsQ0FBUyxNQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLEdBQW5CLEVBQXdCLENBQWpDLENBQXBCLEVBSmdCO1NBQU4sUUFNZCxhQUFhLFlBQU07QUFDZixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLHVCQURxQjthQUF6QjtBQUdBLGtCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQUssR0FBTCxDQUFTLE1BQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsR0FBbkIsRUFBd0IsTUFBSyxLQUFMLENBQVcsYUFBWCxDQUFyRCxFQUplO1NBQU4sUUFNYixhQUFhLFlBQU07QUFDZixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLHVCQURxQjthQUF6QjtBQUdBLGtCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLENBQXBCLEVBSmU7U0FBTixRQU1iLGdCQUFnQixZQUFNO0FBQ2xCLGdCQUFJLE1BQUssS0FBTCxDQUFXLFFBQVgsRUFBcUI7QUFDckIsdUJBRHFCO2FBQXpCO0FBR0Esa0JBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBSyxLQUFMLENBQVcsYUFBWCxDQUFwQixDQUprQjtTQUFOOzs7aUJBNUJDOztpQ0FtQ1I7QUFDTCxnQkFBTSxnQkFBZ0IsS0FBSyxHQUFMLENBQVMsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQTVDLENBREQ7QUFFTCxtQkFDSTs7a0JBQUssV0FBVSw0QkFBVixFQUFMO2dCQUNJOztzQkFBSyxXQUFVLFNBQVYsRUFBTDtvQkFDSTs7O0FBQ0ksdUNBQVUsVUFBVjtBQUNBLHNDQUFXLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsSUFBbkIsSUFBMkIsS0FBSyxLQUFMLENBQVcsUUFBWDsyQkFDakMsOEJBQWUsS0FBSyxVQUFMLEVBSHhCOztxQkFESjtvQkFRSTs7O0FBQ0ksdUNBQVUsYUFBVjtBQUNBLHNDQUFXLGdCQUFnQixJQUFoQixJQUF3QixLQUFLLEtBQUwsQ0FBVyxRQUFYOzJCQUM5Qiw4QkFBZSxLQUFLLGFBQUwsRUFIeEI7O3FCQVJKO29CQWVJOzs7QUFDSSx1Q0FBVSxXQUFWO0FBQ0Esc0NBQVcsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixJQUFuQixJQUEyQixLQUFLLEtBQUwsQ0FBVyxRQUFYOzJCQUNqQyw4QkFBZSxLQUFLLFdBQUwsRUFIeEI7O3FCQWZKO29CQXNCSTs7O0FBQ0ksdUNBQVUsVUFBVjtBQUNBLHNDQUFXLEtBQUssS0FBTCxDQUFXLGFBQVgsR0FBMkIsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixJQUFuQixJQUEyQixLQUFLLEtBQUwsQ0FBVyxRQUFYOzJCQUM1RCw4QkFBZSxLQUFLLFVBQUwsRUFIeEI7O3FCQXRCSjtpQkFESjtnQkErQkk7O3NCQUFLLFdBQVUsT0FBVixFQUFMO29CQUNNLGdCQUNPLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsT0FBekIsQ0FBaUMsQ0FBakMsWUFBeUMsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixDQUF6QixDQURoRCxHQUVJLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsT0FBakIsQ0FBeUIsQ0FBekIsQ0FGSjtpQkFoQ1Y7YUFESixDQUZLOzs7OzRCQWxDYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsK0JBQWUsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNmLHVCQUFPLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDUCwwQkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO2FBSGQsQ0FGbUI7Ozs7V0FETjtFQUFzQixNQUFNLFNBQU47O2tCQUF0Qjs7O0FBK0VyQixjQUFjLFdBQWQsR0FBNEIscUZBQTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdkVxQjs7Ozs7Ozs7Ozs7Ozs7K01BV2pCLFlBQVksWUFBTTtBQUNkLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLE1BQUssS0FBTCxDQUFXLEVBQVgsQ0FBMUIsQ0FEYztTQUFOLFFBR1osaUJBQWlCLFVBQUMsUUFBRCxFQUFXLEtBQVgsRUFBcUI7QUFDbEMsZ0JBQUksTUFBSyxLQUFMLENBQVcsU0FBWCxFQUFzQjtBQUN0Qix1QkFEc0I7YUFBMUI7QUFHQSxrQ0FBSSx3QkFBSixFQUE4QjtBQUMxQix3QkFBUSxNQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBZjtBQUNSLCtCQUFlLFFBQWY7QUFDQSx1QkFBTyxLQUFQO2FBSEosRUFJRyxJQUpILEdBSmtDO1NBQXJCOzs7aUJBZEE7OzBDQXdCQyxVQUFVOzs7QUFDeEIsbUJBQU8sVUFBQyxTQUFEO3VCQUFlLE9BQUssY0FBTCxDQUFvQixRQUFwQixFQUE4QixTQUE5QjthQUFmLENBRGlCOzs7O3dDQUdaOzs7QUFDWixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsVUFBZixDQUEwQixHQUExQixDQUE4QixVQUFDLElBQUQsRUFBTyxHQUFQO3VCQUNqQztBQUNJLDhCQUFXLE9BQUssS0FBTCxDQUFXLFNBQVg7QUFDWCx5QkFBTSxHQUFOO0FBQ0EsMEJBQU8sSUFBUDtBQUNBLG9DQUFpQixPQUFLLGlCQUFMLENBQXVCLEdBQXZCLENBQWpCO2lCQUpKO2FBRGlDLENBQXJDLENBRFk7Ozs7aUNBVVA7QUFDTCxnQkFBTSxTQUFTLG9CQUFFLDhCQUFGLEVBQ1gsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFdBQWYsQ0FBMkIsTUFBM0IsRUFDQSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixDQUEyQixJQUEzQixFQUNBLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLENBQTJCLFNBQTNCLENBQXFDLE1BQXJDLENBSEUsQ0FERDtBQUtMLG1CQUNJOztrQkFBSyxXQUFVLG9CQUFWLEVBQUw7Z0JBQ0k7OztvQkFBTSxNQUFOO2lCQURKO2dCQUVNLEtBQUssYUFBTCxFQUZOO2dCQUdJO0FBQ0ksK0JBQVksS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNaLCtCQUFZLEtBQUssU0FBTDtpQkFGaEIsQ0FISjthQURKLENBTEs7Ozs7NEJBcENHOzs7QUFDUixtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBTTs7Ozs7O0FBQ3RDLHlDQUFvQixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsTUFBZiwwQkFBcEIsb0dBQTJDOzRCQUFoQyxvQkFBZ0M7O0FBQ3ZDLDRCQUFJLE1BQU0sbUJBQU4sS0FBOEIsT0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixFQUEzQixFQUErQjtBQUM3RCxtQ0FBTyxLQUFQLENBRDZEO3lCQUFqRTtxQkFESjs7Ozs7Ozs7Ozs7Ozs7aUJBRHNDOztBQU10Qyx1QkFBTyxJQUFQLENBTnNDO2FBQU4sQ0FBcEMsQ0FEUTs7OztXQURLO0VBQXNCLDBCQUFXLE1BQU0sU0FBTjs7a0JBQWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNOQTs7Ozs7Ozs7Ozs7dUNBQ0Y7OztBQUNYLG1CQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsR0FBaEIsQ0FBb0I7dUJBQ3ZCO0FBQ0kseUJBQU0sSUFBSSxFQUFKO0FBQ04seUJBQU0sR0FBTjtBQUNBLDBCQUFPLE9BQUssS0FBTCxDQUFXLElBQVg7QUFDUCxxQ0FBa0IsT0FBSyxLQUFMLENBQVcsZUFBWDtBQUNsQixvQ0FBaUIsT0FBSyxLQUFMLENBQVcsY0FBWDtBQUNqQixvQ0FBaUIsT0FBSyxLQUFMLENBQVcsY0FBWDtpQkFOckI7YUFEdUIsQ0FBM0IsQ0FEVzs7OztpQ0FZTjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDSTs7O29CQUNNLEtBQUssWUFBTCxFQUROO2lCQURKO2FBREosQ0FESzs7OztXQWJRO0VBQWlCLE1BQU0sU0FBTjs7a0JBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDTUE7Ozs7Ozs7Ozs7Ozs7OytNQVlqQixxQkFBcUIsWUFBTTtBQUN2QixrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixNQUFLLEtBQUwsQ0FBVyxFQUFYLENBQTFCLENBRHVCO1NBQU4sUUFHckIsb0JBQW9CLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDakMsZ0JBQUksT0FBTyxFQUFQLENBRDZCO0FBRWpDLGlCQUFLLElBQUwsSUFBYSxLQUFiLENBRmlDO0FBR2pDLGtCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLE1BQUssS0FBTCxDQUFXLEVBQVgsRUFBZSxJQUF4QyxFQUhpQztTQUFqQixRQU1wQix3QkFBd0IsVUFBQyxLQUFEO21CQUFXLE1BQUssaUJBQUwsQ0FBdUIsWUFBdkIsRUFBcUMsS0FBckM7U0FBWCxRQUN4Qiw4QkFBOEIsVUFBQyxLQUFEO21CQUFXLE1BQUssaUJBQUwsQ0FBdUIsa0JBQXZCLEVBQTJDLEtBQTNDO1NBQVg7OztpQkF0QmI7O3lDQXdCQSxZQUFZOzs7QUFDekIsbUJBQU8sVUFBQyxTQUFEO3VCQUFlLE9BQUssYUFBTCxDQUFtQixVQUFuQixFQUErQixTQUEvQjthQUFmLENBRGtCOzs7O2lDQUdwQjtBQUNMLGdCQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQURUO0FBRUwsZ0JBQU0sU0FBUyxvQkFBRSw4QkFBRixFQUNYLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLENBQTJCLE1BQTNCLEVBQ0EsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFdBQWYsQ0FBMkIsSUFBM0IsRUFDQSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixDQUEyQixTQUEzQixDQUFxQyxNQUFyQyxDQUhFLENBRkQ7QUFNTCxtQkFDSTs7a0JBQUssV0FBVSxvQkFBVixFQUFMO2dCQUNJOzs7b0JBQ00sTUFETjtpQkFESjtnQkFJSTs7O29CQUFNLG9CQUFFLDhCQUFGLENBQU47aUJBSko7Z0JBS0k7QUFDSTtBQUNBLDhCQUFXLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWCwyQkFBUSxNQUFNLFFBQU4sQ0FBZSxVQUFmO0FBQ1IsOEJBQVcsS0FBSyxxQkFBTDtpQkFKZixDQUxKO2dCQVdJLDZCQUFLLFdBQVUsUUFBVixFQUFMLENBWEo7Z0JBWUk7OztvQkFDTSxvQkFBRSwwQkFBRixDQUROO2lCQVpKO2dCQWVJO0FBQ0ksNkJBQVUsS0FBSyxLQUFMLENBQVcsRUFBWDtpQkFEZCxDQWZKO2dCQWtCSTtBQUNJLDZCQUFVLENBQUMsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFELEVBQWMsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFkLEVBQTJCLENBQUMsS0FBRCxFQUFRLElBQVIsQ0FBM0IsQ0FBVjtBQUNBLDhCQUFXLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWCwyQkFBUSxNQUFNLFFBQU4sQ0FBZSxnQkFBZjtBQUNSLDhCQUFXLEtBQUssMkJBQUw7aUJBSmYsQ0FsQko7Z0JBd0JJO0FBQ0ksK0JBQVksS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNaLCtCQUFZLEtBQUssa0JBQUw7aUJBRmhCLENBeEJKO2FBREosQ0FOSzs7Ozs0QkExQkc7OztBQUNSLG1CQUFPLEtBQUssY0FBTCxDQUFvQixPQUFwQixFQUE2QixZQUFNOzs7Ozs7QUFDdEMseUNBQW9CLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxNQUFmLDBCQUFwQixvR0FBMkM7NEJBQWhDLG9CQUFnQzs7QUFDdkMsNEJBQUksTUFBTSxtQkFBTixLQUE4QixPQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEVBQTNCLEVBQStCO0FBQzdELG1DQUFPLEtBQVAsQ0FENkQ7eUJBQWpFO3FCQURKOzs7Ozs7Ozs7Ozs7OztpQkFEc0M7O0FBTXRDLHVCQUFPLElBQVAsQ0FOc0M7YUFBTixDQUFwQyxDQURROzs7O1dBREs7RUFBc0IsMEJBQVcsTUFBTSxTQUFOOztrQkFBakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xyQixJQUFJLGNBQWMsRUFBZDs7SUFFaUI7Ozs7OzRCQUNNO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCx5QkFBUyxHQUFHLE1BQUgsQ0FBVSxVQUFWO2FBRGIsQ0FGbUI7Ozs7QUFPdkIsYUFSaUIsU0FRakIsQ0FBWSxLQUFaLEVBQW1COzhCQVJGLFdBUUU7OzJFQVJGLHNCQVNQLFFBRFM7O2NBc0NuQixlQUFlLFlBQU07QUFDakIsZ0JBQUksTUFBSyxLQUFMLENBQVcsTUFBWCxFQUFtQjtBQUNuQixzQkFBSyxJQUFMLEdBRG1CO2FBQXZCLE1BRU87QUFDSCxzQkFBSyxLQUFMLEdBREc7YUFGUDtTQURXLENBdENJOztjQTZDbkIsY0FBYyxZQUFNO0FBQ2hCLDBCQUFjLE1BQUssS0FBTCxDQUFXLFFBQVgsQ0FBZCxDQURnQjtBQUVoQixrQkFBSyxRQUFMLENBQWM7QUFDVix3QkFBUSxLQUFSO0FBQ0EsdUJBQU8sQ0FBUDthQUZKLEVBRmdCO1NBQU4sQ0E3Q0s7O2NBb0RuQixhQUFhLFlBQU07QUFDZixnQkFBTSxZQUFZLE1BQUssS0FBTCxFQUFaLENBRFM7QUFFZixnQkFBSSxjQUFjLE1BQUssS0FBTCxDQUFXLEtBQVgsRUFBa0I7QUFDaEMsc0JBQUssUUFBTCxDQUFjO0FBQ1YsMkJBQU8sTUFBSyxLQUFMLEVBQVA7aUJBREosRUFEZ0M7YUFBcEM7U0FGUyxDQXBETTs7QUFFZixZQUFJLFFBQVEsWUFBWSxNQUFLLEtBQUwsQ0FBVyxPQUFYLENBQVosSUFBbUM7QUFDM0Msb0JBQVEsS0FBUjtBQUNBLG1CQUFPLENBQVA7QUFDQSx1QkFBVyxNQUFYO0FBQ0Esc0JBQVUsSUFBVjtTQUpRLENBRkc7QUFRZixZQUFJLE1BQU0sTUFBTixFQUFjO0FBQ2Qsa0JBQU0sUUFBTixHQUFpQixZQUFZLE1BQUssVUFBTCxFQUFpQixFQUE3QixDQUFqQixDQURjO1NBQWxCO0FBR0EsY0FBSyxLQUFMLEdBQWEsS0FBYixDQVhlOztLQUFuQjs7aUJBUmlCOzsrQ0FzQk07QUFDbkIsMEJBQWMsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFkLENBRG1CO0FBRW5CLHdCQUFZLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBWixHQUFrQyxLQUFLLEtBQUwsQ0FGZjs7Ozs4QkFLakI7QUFDRixtQkFBTyxJQUFLLElBQUosRUFBRCxDQUFhLE9BQWIsRUFBUCxDQURFOzs7O2dDQUlFO0FBQ0osaUJBQUssUUFBTCxDQUFjO0FBQ1Ysd0JBQVEsSUFBUjtBQUNBLDBCQUFVLEtBQUssR0FBTCxLQUFhLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDdkIsMEJBQVUsWUFBWSxLQUFLLFVBQUwsRUFBaUIsRUFBN0IsQ0FBVjthQUhKLEVBREk7Ozs7K0JBT0Q7QUFDSCwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQWQsQ0FERztBQUVILGlCQUFLLFFBQUwsQ0FBYztBQUNWLHdCQUFRLEtBQVI7QUFDQSx1QkFBTyxLQUFLLEtBQUwsRUFBUDthQUZKLEVBRkc7Ozs7Z0NBK0JDO0FBQ0osbUJBQU8sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUNBLEtBQUssR0FBTCxLQUFhLEtBQUssS0FBTCxDQUFXLFFBQVgsR0FDZCxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBSEY7Ozs7NEJBTUosS0FBSyxNQUFNO0FBQ1gsZ0JBQU0sYUFBVyxHQUFYLENBREs7QUFFWCxtQkFBTyxFQUFFLE1BQUYsQ0FBUyxFQUFFLE1BQUYsR0FBVyxJQUFYLENBQWhCLENBRlc7Ozs7c0NBSUQ7QUFDVixnQkFBSSxNQUFNLEtBQUssS0FBTCxFQUFOLENBRE07QUFFVixnQkFBSSxJQUFJLENBQUo7Z0JBQU8sSUFBSSxDQUFKLENBRkQ7QUFHVixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFPLEtBQUssSUFBTCxDQUFQLENBQWYsQ0FIVTtBQUlWLG1CQUFPLEtBQUssSUFBTCxDQUpHO0FBS1YsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBTSxJQUFOLENBQWYsQ0FMVTtBQU1WLG1CQUFVLFVBQUssS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFZLENBQVosQ0FBZixDQU5VOzs7O21EQVNhO0FBQ3ZCLG1CQUFPLDZCQUFjO0FBQ2pCLHdCQUFRLElBQVI7QUFDQSw4QkFBYyxJQUFkO0FBQ0EsbUNBQW1CLElBQW5CO0FBQ0EsMEJBQVUsS0FBSyxLQUFMLENBQVcsTUFBWDthQUpQLENBQVAsQ0FEdUI7Ozs7aUNBUWxCO0FBQ0wsbUJBQ0k7O2tCQUFLLFdBQVUsV0FBVixFQUFMO2dCQUNJOzs7QUFDSSxtQ0FBVSxnQ0FBVjt1QkFDSyw4QkFBZSxLQUFLLFdBQUwsRUFGeEI7b0JBSU0sb0JBQUUsZ0NBQUYsQ0FKTjtpQkFESjtnQkFPSTs7O0FBQ0ksbUNBQVksS0FBSyx3QkFBTCxFQUFaO3VCQUNLLDhCQUFlLEtBQUssWUFBTCxFQUZ4QjtvQkFJTSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQ0ksb0JBQUUsK0JBQUYsQ0FESixHQUVJLG9CQUFFLGdDQUFGLENBRko7aUJBWFY7Z0JBZ0JJOztzQkFBSyxXQUFVLE1BQVYsRUFBTDtvQkFDTSxLQUFLLFdBQUwsRUFETjtpQkFoQko7YUFESixDQURLOzs7O1dBaEdRO0VBQWtCLE1BQU0sU0FBTjs7a0JBQWxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQTs7Ozs7Ozs7Ozs7dUNBQ0Y7OztBQUNYLG1CQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsR0FBaEIsQ0FBb0I7dUJBQ3ZCO0FBQ0kseUJBQU0sSUFBSSxFQUFKO0FBQ04seUJBQU0sR0FBTjtBQUNBLDBCQUFPLE9BQUssS0FBTCxDQUFXLElBQVg7QUFDUCxxQ0FBa0IsT0FBSyxLQUFMLENBQVcsZUFBWDtBQUNsQixtQ0FBZ0IsT0FBSyxLQUFMLENBQVcsYUFBWDtBQUNoQixvQ0FBaUIsT0FBSyxLQUFMLENBQVcsY0FBWDtpQkFOckI7YUFEdUIsQ0FBM0IsQ0FEVzs7OztpQ0FZTjtBQUNMLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDSTs7O29CQUNNLEtBQUssWUFBTCxFQUROO2lCQURKO2FBREosQ0FESzs7OztXQWJRO0VBQW9CLE1BQU0sU0FBTjs7a0JBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDT0E7OztBQUNqQixhQURpQixlQUNqQixDQUFZLEtBQVosRUFBbUI7OEJBREYsaUJBQ0U7OzJFQURGLDRCQUVQLFFBRFM7O2NBNENuQixrQkFBa0IsWUFBTTtBQUNwQixrQkFBSyxVQUFMLENBQWdCLE1BQUssS0FBTCxDQUFXLElBQVgsR0FBa0IsQ0FBbEIsQ0FBaEIsQ0FEb0I7U0FBTixDQTVDQzs7Y0ErQ25CLGtCQUFrQixZQUFNO0FBQ3BCLGtCQUFLLFVBQUwsQ0FBZ0IsTUFBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixDQUFsQixDQUFoQixDQURvQjtTQUFOLENBL0NDOztjQWtEbkIsZUFBZSxVQUFDLElBQUQsRUFBVTtBQUNyQixrQkFBSyxRQUFMLENBQWMsRUFBRSxVQUFGLEVBQWQsRUFEcUI7U0FBVixDQWxESTs7QUFFZixjQUFLLEtBQUwsR0FBYTtBQUNULGtCQUFNLE1BQUssd0JBQUw7QUFDTixrQkFBTSxTQUFOO1NBRkosQ0FGZTs7S0FBbkI7O2lCQURpQjs7a0RBUVMsWUFBWTtBQUNsQyxnQkFBSSxXQUFXLElBQVgsQ0FBZ0IsRUFBaEIsS0FBdUIsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixFQUFoQixFQUFvQjtBQUMzQyxvQkFBTSxhQUFhLEtBQUssS0FBTCxDQUR3QjtBQUUzQyxxQkFBSyxLQUFMLEdBQWEsVUFBYixDQUYyQztBQUczQyxxQkFBSyxVQUFMLEdBSDJDO0FBSTNDLHFCQUFLLFFBQUwsQ0FBYztBQUNWLDBCQUFNLEtBQUssd0JBQUw7QUFDTiwwQkFBTSxTQUFOO2lCQUZKLEVBSjJDO0FBUTNDLHFCQUFLLEtBQUwsR0FBYSxVQUFiLENBUjJDO2FBQS9DOzs7O21DQStCTyxPQUFPO0FBQ2QsaUJBQUssUUFBTCxDQUFjO0FBQ1Ysc0JBQU0sS0FBTjthQURKLEVBRGM7Ozs7d0NBY0Y7QUFDWixtQkFDSTtBQUNJLHNCQUFPLEtBQUssSUFBTDtBQUNQLGlDQUFrQixLQUFLLEtBQUwsQ0FBVyxlQUFYO0FBQ2xCLCtCQUFnQixLQUFLLEtBQUwsQ0FBVyxhQUFYO0FBQ2hCLGdDQUFpQixLQUFLLEtBQUwsQ0FBVyxjQUFYO2FBSnJCLENBREosQ0FEWTs7OztxQ0FVSDtBQUNULG1CQUNJO0FBQ0ksc0JBQU8sS0FBSyxJQUFMO0FBQ1AsaUNBQWtCLEtBQUssS0FBTCxDQUFXLGVBQVg7QUFDbEIsK0JBQWdCLEtBQUssS0FBTCxDQUFXLGFBQVg7QUFDaEIsZ0NBQWlCLEtBQUssS0FBTCxDQUFXLGNBQVg7YUFKckIsQ0FESixDQURTOzs7O3VDQVVFO0FBQ1gsZ0JBQU0sY0FBYyxLQUFLLFdBQUwsQ0FEVDtBQUVYLG1CQUNJO0FBQ0ksdUJBQVEsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixLQUEzQjtBQUNSLHNCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDUCxzQkFBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ1AsNEJBQWEsV0FBYjtBQUNBLHlCQUFVLEtBQUssd0JBQUw7QUFDVixpQ0FBa0IsS0FBSyxlQUFMO0FBQ2xCLGlDQUFrQixLQUFLLGVBQUw7YUFQdEIsQ0FESixDQUZXOzs7O3FDQWNGO0FBQ1Qsb0JBQVEsS0FBSyxLQUFMLENBQVcsSUFBWDtBQUNSLHFCQUFLLFNBQUw7QUFDSSwyQkFBTyxLQUFLLGFBQUwsRUFBUCxDQURKO0FBREEscUJBR0ssTUFBTDtBQUNJLDJCQUFPLEtBQUssVUFBTCxFQUFQLENBREo7QUFIQSxhQURTOzs7O3VDQVFFO0FBQ1gsZ0JBQUksQ0FBQyxjQUFELEVBQWlCLHVCQUFqQixFQUEwQyxPQUExQyxDQUFrRCxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixDQUFsRCxHQUF5RixDQUF6RixFQUE0RjtBQUM1Rix1QkFBTyxJQUFQLENBRDRGO2FBQWhHO0FBR0EsbUJBQ0k7O2tCQUFRLE9BQVEsS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFrQixVQUFXLEtBQUssWUFBTCxFQUE3QztnQkFDSTtBQUNJLDJCQUFRLG9CQUFFLHNCQUFGLENBQVI7QUFDQSwwQkFBSyxTQUFMLEVBRkosQ0FESjtnQkFJSTtBQUNJLDJCQUFRLG9CQUFFLG1CQUFGLENBQVI7QUFDQSwwQkFBSyxNQUFMLEVBRkosQ0FKSjthQURKLENBSlc7Ozs7aUNBZU47QUFDTCxtQkFDSTs7a0JBQUssV0FBVSxxQ0FBVixFQUFMO2dCQUNNLEtBQUssWUFBTCxFQUROO2dCQUVNLEtBQUssVUFBTCxFQUZOO2dCQUdNLEtBQUssWUFBTCxFQUhOO2FBREosQ0FESzs7Ozs0QkEzRlM7OztBQUNkLG1CQUFPLEtBQUssY0FBTCxDQUFvQixhQUFwQixFQUFtQzs7O3VCQUN0QyxlQUFLLEdBQUwsaUNBQVksT0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixHQUFyQixDQUF5QjsyQkFBTyxJQUFJLElBQUo7aUJBQVAsRUFBckM7YUFEc0MsQ0FBMUMsQ0FEYzs7Ozs0QkFLUDs7O0FBQ1AsbUJBQU8sS0FBSyxjQUFMLENBQW9CLE1BQXBCLEVBQTRCO3VCQUMvQixPQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQXFCLE1BQXJCLENBQTRCOzJCQUFPLElBQUksSUFBSixLQUFhLE9BQUssS0FBTCxDQUFXLElBQVg7aUJBQXBCO2FBREcsQ0FBbkMsQ0FETzs7Ozs0QkFLb0I7Ozs7OztBQUMzQixxQ0FBa0IsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQiwwQkFBbEIsb0dBQXdDO3dCQUE3QixrQkFBNkI7Ozs7OztBQUNwQyw4Q0FBb0IsSUFBSSxNQUFKLDJCQUFwQix3R0FBZ0M7Z0NBQXJCLHFCQUFxQjs7QUFDNUIsZ0NBQUksTUFBTSxtQkFBTixLQUE4QixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEVBQTNCLElBQWlDLENBQUMsTUFBTSxTQUFOLElBQW1CLElBQUksU0FBSixFQUFlO0FBQ2xHLHVDQUFPLElBQUksSUFBSixDQUQyRjs2QkFBdEc7eUJBREo7Ozs7Ozs7Ozs7Ozs7O3FCQURvQztpQkFBeEM7Ozs7Ozs7Ozs7Ozs7O2FBRDJCOztBQVEzQixtQkFBTyxLQUFLLFdBQUwsQ0FSb0I7Ozs7V0E5QmQ7RUFBd0IsMEJBQVcsTUFBTSxTQUFOOztrQkFBbkM7Ozs7Ozs7Ozs7Ozs7OztrQkNUTixVQUFDLEtBQUQ7V0FDWDs7VUFBSyxXQUFVLGFBQVYsRUFBTDtRQUNNLG9CQUFFLDJCQUFGLENBRE47O1FBQzBDLE1BQU0sS0FBTixDQUFZLElBQVosQ0FBaUIsV0FBakI7O0NBRi9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNXTTs7Ozs7Ozs7Ozs7Ozs7Nk1BV2pCLGdCQUFnQixVQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXlCO0FBQ3JDLGdCQUFJLFVBQVU7QUFDViw0QkFBWSxTQUFaO0FBQ0EsdUJBQU8sS0FBUDthQUZBLENBRGlDO0FBS3JDLGtDQUFJLFdBQUosRUFBaUIsRUFBRSxVQUFVLFFBQVYsRUFBb0IsTUFBTSxPQUFOLEVBQXZDLEVBQXdELElBQXhELEdBTHFDO1NBQXpCLFFBT2hCLGlCQUFpQixVQUFDLFFBQUQsRUFBYztBQUMzQixrQ0FBSSxlQUFKLEVBQXFCLEVBQUUsVUFBVSxRQUFWLEVBQXZCLEVBQTZDLElBQTdDLEdBRDJCO1NBQWQ7OztpQkFsQkE7O2lDQXFCUjtBQUNMLGdCQUFNLGVBQWUsOEJBQWUsS0FBSyxLQUFMLENBQVcsZUFBWCxFQUE0QixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixDQUExRCxDQUREO0FBRUwsZ0JBQUksY0FBYyxZQUFZLE9BQVosQ0FBb0IsWUFBcEIsQ0FBZCxDQUZDO0FBR0wsZ0JBQUksQ0FBQyxXQUFELEVBQWM7QUFDZCx1QkFDSTs7OztpQkFESixDQURjO2FBQWxCO0FBS0EsbUJBQ0k7O2tCQUFLLFdBQVUscUJBQVYsRUFBTDtnQkFDSSxvQkFBQyxXQUFEO0FBQ0kscUNBQWtCLEtBQUssS0FBTCxDQUFXLGVBQVg7QUFDbEIsMEJBQU8sS0FBSyxLQUFMLENBQVcsSUFBWDtBQUNQLG9DQUFpQixLQUFLLGNBQUw7QUFDakIsbUNBQWdCLEtBQUssYUFBTDtpQkFKcEIsQ0FESjthQURKLENBUks7Ozs7V0FyQlE7RUFBb0IsTUFBTSxTQUFOOztBQUFwQixZQUNWLFVBQVU7QUFDYixzQ0FEYTtBQUViLGtDQUZhO0FBR2IsK0NBSGE7QUFJYiwwQ0FKYTtBQUtiLG1EQUxhO0FBTWIsNENBTmE7QUFPYixxQ0FQYTtBQVFiLHFDQVJhOztrQkFEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNYQTs7Ozs7Ozs7Ozs7a0NBaUNQOzs7QUFDTixnQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFNBQW5CLEVBQThCO0FBQy9CLHVCQUFPLEdBQVAsQ0FEK0I7YUFBbkM7QUFHQSxnQkFBTSxtQkFBbUIsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsTUFBbkIsQ0FBMEIsSUFBMUIsQ0FDckI7dUJBQVMsT0FBSyxLQUFMLENBQVcsbUJBQVgsQ0FBK0IsR0FBL0IsQ0FBbUMsTUFBTSxtQkFBTixDQUFuQyxDQUE4RCxJQUE5RCxLQUF1RSxZQUF2RTthQUFULENBREUsQ0FKQTtBQU1OLGdCQUFJLENBQUMsZ0JBQUQsRUFBbUI7QUFDbkIsdUJBQU8sR0FBUCxDQURtQjthQUF2QjtBQUdBLG1CQUFPLGlCQUFpQixJQUFqQixDQUFzQixXQUF0QixDQUFrQyxPQUFsQyxFQUFQLENBVE07Ozs7K0NBV2E7QUFDbkIsZ0JBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxjQUFYLEVBQTJCO0FBQzVCLHVCQUFPLElBQVAsQ0FENEI7YUFBaEM7QUFHQSxnQkFBSSxVQUFVLEdBQVYsQ0FKZTtBQUtuQixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixTQUFuQixFQUE4QjtBQUM5QiwwQkFDSTs7O29CQUNJOzs7d0JBQ00sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsbUJBQW5CLENBQXVDLGFBQXZDLENBQXFELE9BQXJELENBQTZELENBQTdELENBRE47cUJBREo7O29CQUlZLElBSlo7b0JBS00sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsbUJBQW5CLENBQXVDLGVBQXZDLENBQXVELE9BQXZELENBQStELENBQS9ELENBTE47aUJBREosQ0FEOEI7YUFBbEM7QUFXQSxtQkFDSTs7a0JBQUksV0FBVSxZQUFWLEVBQUo7Z0JBQ0k7O3NCQUFHLFdBQVUsYUFBVixFQUFIO29CQUNNLE9BRE47aUJBREo7YUFESixDQWhCbUI7Ozs7aUNBd0JkO0FBQ0wsbUJBQ0k7OztnQkFDSTs7c0JBQUksV0FBVSxXQUFWLEVBQUo7b0JBQ0k7OzBCQUFHLFdBQVUsYUFBVixFQUFIO3dCQUNNLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxLQUFmO3FCQUZWO2lCQURKO2dCQU1JOztzQkFBSSxXQUFVLFlBQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsV0FBbkIsQ0FBK0IsTUFBL0I7cUJBRlY7aUJBTko7Z0JBV0k7O3NCQUFJLFdBQVUsa0JBQVYsRUFBSjtvQkFDTSxxQ0FBc0IsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsV0FBbkIsQ0FENUI7aUJBWEo7Z0JBY0k7O3NCQUFJLFdBQVUsTUFBVixFQUFKO29CQUNJOzs7d0JBQ00sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsV0FBbkIsQ0FBK0IsSUFBL0IsQ0FBb0MsSUFBcEM7cUJBRlY7aUJBZEo7Z0JBbUJNLEtBQUssb0JBQUwsRUFuQk47Z0JBb0JJOztzQkFBSSxXQUFVLFVBQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sS0FBSyxPQUFMLEVBRE47cUJBREo7aUJBcEJKO2FBREosQ0FESzs7Ozs0QkFuRWM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHFDQUFxQixHQUFHLFVBQUgsQ0FBYyxHQUFkLEVBQW1CLFVBQW5CO0FBQ3JCLHFCQUFLLEdBQUcsS0FBSCxDQUFTO0FBQ1YsMkJBQU8sR0FBRyxNQUFIO0FBQ1AseUJBQUssR0FBRyxLQUFILENBQVM7QUFDVixtQ0FBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1gscUNBQWEsR0FBRyxLQUFILENBQVM7QUFDbEIsb0NBQVEsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNSLGtDQUFNLEdBQUcsS0FBSCxDQUFTO0FBQ1gsc0NBQU0sR0FBRyxNQUFILENBQVUsVUFBVjs2QkFESixFQUVILFVBRkc7eUJBRkcsRUFLVixVQUxVO0FBTWIsZ0NBQVEsR0FBRyxPQUFILENBQ0osR0FBRyxLQUFILENBQVM7QUFDTCxpREFBcUIsR0FBRyxNQUFILENBQVUsVUFBVjt5QkFEekIsRUFFRyxVQUZILENBREksQ0FJTixVQUpNO0FBS1IsNkNBQXFCLEdBQUcsS0FBSCxDQUFTO0FBQzFCLDJDQUFlLEdBQUcsTUFBSDtBQUNmLDZDQUFpQixHQUFHLE1BQUg7QUFDakIsMkNBQWUsR0FBRyxLQUFILENBQVM7QUFDcEIsK0NBQWUsR0FBRyxNQUFIO0FBQ2YsaURBQWlCLEdBQUcsTUFBSDs2QkFGTixDQUFmO3lCQUhpQixDQUFyQjtxQkFiQyxFQXFCRixVQXJCRTtpQkFGSixFQXdCRixVQXhCRTtBQXlCTCxnQ0FBZ0IsR0FBRyxJQUFILENBQVEsVUFBUjthQTNCcEIsQ0FGbUI7Ozs7V0FETjtFQUFZLE1BQU0sU0FBTjs7a0JBQVo7OztBQW9HckIsSUFBSSxXQUFKLEdBQWtCLHNDQUFsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbEdxQjs7Ozs7Ozs7Ozs7cUNBaUNKLEtBQUs7QUFDZCxnQkFBSSxDQUFDLEdBQUQsRUFBTTtBQUNOLHVCQUFPLE1BQVAsQ0FETTthQUFWO0FBR0EsZ0JBQUksQ0FBQyxJQUFJLEdBQUosQ0FBUSxTQUFSLEVBQW1CO0FBQ3BCLHVCQUFPLGVBQVAsQ0FEb0I7YUFBeEI7QUFHQSxtQkFBTyxJQUFJLFFBQUosR0FBZSxVQUFmLEdBQTRCLGNBQTVCLENBUE87Ozs7d0NBU0YsWUFBWTtBQUN4QixtQkFBTyxzREFBa0MsVUFBbEMsQ0FBUCxDQUR3Qjs7Ozs2Q0FHUCxVQUFVLFVBQVUsZUFBZSxRQUFRO0FBQzVELGdCQUFNLGNBQWMsS0FBSyxZQUFMLENBQWtCLFFBQWxCLENBQWQsQ0FEc0Q7QUFFNUQsZ0JBQU0sY0FBYyxLQUFLLFlBQUwsQ0FBa0IsUUFBbEIsQ0FBZCxDQUZzRDtBQUc1RCxnQkFBSSxnQkFBZ0IsV0FBaEIsRUFBNkI7QUFDN0IsdUJBQU8sSUFBUCxDQUQ2QjthQUFqQztBQUdBLGdCQUFJLGdCQUFnQixlQUFoQixJQUFtQyxDQUFDLGFBQUQsRUFBZ0I7QUFDbkQsdUJBQU8sSUFBUCxDQURtRDthQUF2RDtBQUdBLG1CQUNJOztrQkFBSSxZQUFXLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBZjtnQkFDSTs7c0JBQUksV0FBVSxpQkFBVixFQUE0QixTQUFVLE1BQVYsRUFBaEM7b0JBQ0k7OzBCQUFHLFdBQVUsV0FBVixFQUFIO3dCQUNNLEtBQUssZUFBTCxDQUFxQixXQUFyQixDQUROO3FCQURKO2lCQURKO2FBREosQ0FUNEQ7Ozs7aUNBbUJ2RDtBQUNMLGdCQUFNLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFlBQWhCLEtBQWlDLElBQWpDLENBRGpCO0FBRUwsZ0JBQU0sbUJBQW1CLENBQUMsbUJBQUQsRUFBc0Isd0JBQXRCLEVBQWdELE9BQWhELENBQ3JCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsbUJBQWhCLENBRHFCLEdBQ2tCLENBRGxCLENBRnBCO0FBSUwsZ0JBQU0sVUFBVSxJQUFJLEdBQUosQ0FBUSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFVBQWhCLENBQTJCLGlCQUEzQixDQUE2QyxHQUE3QyxDQUFpRDt1QkFBTSxDQUFDLEdBQUcsRUFBSCxFQUFPLEVBQVI7YUFBTixDQUF6RCxDQUFWLENBSkQ7QUFLTCxnQkFBSSxPQUFPLEVBQVAsQ0FMQztBQU1MLGlCQUFLLElBQUksTUFBTSxDQUFOLEVBQVMsTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE1BQWpCLEVBQXlCLEVBQUUsR0FBRixFQUFPO0FBQ3BELHFCQUFLLElBQUwsQ0FBVSxLQUFLLG9CQUFMLENBQ04sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixNQUFNLENBQU4sQ0FEWCxFQUVOLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FGTSxFQUdOLGFBSE0sRUFJTixJQUFJLGdCQUFKLENBSkosRUFEb0Q7QUFPcEQsb0JBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBQU4sQ0FQOEM7QUFRcEQscUJBQUssSUFBTCxDQUNJO0FBQ0kseUNBQXNCLE9BQXRCO0FBQ0EseUJBQU0sSUFBSSxHQUFKLENBQVEsRUFBUjtBQUNOLHlCQUFNLEdBQU47QUFDQSxvQ0FBaUIsZ0JBQWpCO2lCQUpKLENBREosRUFSb0Q7YUFBeEQ7QUFpQkEsbUJBQ0k7O2tCQUFLLFdBQVUsZUFBVixFQUFMO2dCQUNJOztzQkFBTyxXQUFVLGdCQUFWLEVBQVA7b0JBQ0k7Ozt3QkFDSTs7OzRCQUNJOztrQ0FBSSxXQUFVLFdBQVYsRUFBSjtnQ0FDSTs7O29DQUNNLG9CQUFFLHNCQUFGLENBRE47aUNBREo7NkJBREo7NEJBTUk7O2tDQUFJLFdBQVUsWUFBVixFQUFKO2dDQUNJOzs7b0NBQ00sb0JBQUUsdUJBQUYsQ0FETjtpQ0FESjs2QkFOSjs0QkFXSTs7a0NBQUksV0FBVSxrQkFBVixFQUFKO2dDQUNJOzs7b0NBQ00sb0JBQUUsaUNBQUYsQ0FETjtpQ0FESjs2QkFYSjs0QkFnQkk7O2tDQUFJLFdBQVUsTUFBVixFQUFKO2dDQUNJOzs7b0NBQ00sb0JBQUUsaUNBQUYsQ0FETjtpQ0FESjs2QkFoQko7NEJBcUJNLG1CQUNFOztrQ0FBSSxXQUFVLFlBQVYsRUFBSjtnQ0FDSTs7O29DQUNNLG9CQUFFLDRCQUFGLENBRE47aUNBREo7NkJBREYsR0FNRSxJQU5GOzRCQU9GOztrQ0FBSSxXQUFVLFVBQVYsRUFBSjtnQ0FDSTs7c0NBQUcsV0FBVSxhQUFWLEVBQUg7b0NBQ00sb0JBQUUscUJBQUYsQ0FETjtpQ0FESjs2QkE1Qko7eUJBREo7cUJBREo7b0JBcUNJOzs7d0JBQ00sSUFETjtxQkFyQ0o7aUJBREo7YUFESixDQXZCSzs7OztzQ0FyQ1ksTUFBTTtBQUN2QixpQkFDSyxRQURMLENBQ2MsaUJBRGQsRUFDaUMsV0FEakMsRUFDOEMsTUFEOUMsRUFFSyxRQUZMLENBRWMsa0JBRmQsRUFFa0Msa0JBRmxDLEVBRXNELE1BRnRELEVBRHVCOzs7OzRCQTFCSjtBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxPQUFILENBQ0gsR0FBRyxLQUFILENBQVM7QUFDTCw4QkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YseUJBQUssR0FBRyxLQUFILENBQVM7QUFDViw0QkFBSSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ0osbUNBQVcsR0FBRyxJQUFILENBQVEsVUFBUjtxQkFGVixFQUdGLFVBSEU7aUJBRlQsRUFNRyxVQU5ILENBREcsQ0FRTCxVQVJLO0FBU1Asc0JBQU0sR0FBRyxLQUFILENBQVM7QUFDWCx5Q0FBcUIsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNyQixrQ0FBYyxHQUFHLE1BQUg7QUFDZCxnQ0FBWSxHQUFHLEtBQUgsQ0FBUztBQUNqQiwyQ0FBbUIsR0FBRyxPQUFILENBQ2YsR0FBRyxLQUFILENBQVM7QUFDTCxrQ0FBTSxHQUFHLE1BQUgsQ0FBVSxVQUFWO3lCQURWLEVBRUcsVUFGSCxDQURlLENBSWpCLFVBSmlCO3FCQURYLEVBTVQsVUFOUztpQkFIVixFQVVILFVBVkc7YUFWVixDQUZtQjs7OztXQUROO0VBQXNCLE1BQU0sU0FBTjs7a0JBQXRCOzs7QUF1SXJCLGNBQWMsV0FBZCxHQUE0QixrQ0FBNUI7Ozs7Ozs7Ozs7Ozs7SUMzSXFCO0FBQ2pCLGFBRGlCLGFBQ2pCLENBQVksUUFBWixFQUFzQixlQUF0QixFQUF1Qzs4QkFEdEIsZUFDc0I7O0FBQ25DLGFBQUssV0FBTCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxNQUFNLFdBQVcsQ0FBWCxDQUFOLENBQTlCLENBRG1DO0FBRW5DLGFBQUssaUJBQUwsR0FBeUIsa0JBQWtCLEVBQWxCLEdBQXVCLENBQXZCLENBRlU7QUFHbkMsYUFBSyxXQUFMLEdBQW1CLENBQW5CLENBSG1DO0FBSW5DLGFBQUssWUFBTCxHQUFvQixDQUFwQixDQUptQztBQUtuQyxhQUFLLFVBQUwsR0FBa0IsTUFBTSxLQUFLLFdBQUwsSUFBb0IsV0FBVyxDQUFYLENBQXBCLEdBQ3BCLEtBQUssaUJBQUwsR0FBeUIsS0FBSyxXQUFMLEdBQW1CLEtBQUssWUFBTCxDQU5iO0tBQXZDOztpQkFEaUI7O3dDQVNEO0FBQ1osbUJBQU87QUFDSCx1QkFBVSxLQUFLLFdBQUwsTUFBVjthQURKLENBRFk7Ozs7eUNBS0M7QUFDYixtQkFBTztBQUNILHVCQUFVLEtBQUssWUFBTCxNQUFWO2FBREosQ0FEYTs7Ozt1Q0FLRjtBQUNYLG1CQUFPO0FBQ0gsdUJBQVUsS0FBSyxVQUFMLE1BQVY7YUFESixDQURXOzs7OzZDQUtNO0FBQ2pCLG1CQUFPO0FBQ0gsdUJBQVUsS0FBSyxpQkFBTCxNQUFWO2FBREosQ0FEaUI7Ozs7d0NBS0w7QUFDWixtQkFBTztBQUNILHVCQUFVLEtBQUssV0FBTCxNQUFWO2FBREosQ0FEWTs7OztXQTdCQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSUE7Ozs7Ozs7Ozs7O3NDQTJDSDtBQUNWLG1CQUFPLENBQUMsbUJBQUQsRUFBc0Isd0JBQXRCLEVBQWdELE9BQWhELENBQXdELEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsbUJBQWhCLENBQXhELElBQWdHLENBQWhHLENBREc7Ozs7a0NBSUo7OztBQUNOLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEI7QUFDL0IsdUJBQU8sR0FBUCxDQUQrQjthQUFuQztBQUdBLGdCQUFNLG1CQUFtQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixNQUFuQixDQUEwQixJQUExQixDQUNyQjt1QkFBUyxPQUFLLEtBQUwsQ0FBVyxtQkFBWCxDQUErQixHQUEvQixDQUFtQyxNQUFNLG1CQUFOLENBQW5DLENBQThELElBQTlELEtBQXVFLFlBQXZFO2FBQVQsQ0FERSxDQUpBO0FBTU4sZ0JBQUksQ0FBQyxnQkFBRCxFQUFtQjtBQUNuQix1QkFBTyxHQUFQLENBRG1CO2FBQXZCO0FBR0EsbUJBQU8saUJBQWlCLElBQWpCLENBQXNCLFdBQXRCLENBQWtDLE9BQWxDLEVBQVAsQ0FUTTs7Ozs2Q0FXVyxPQUFPO0FBQ3hCLG1CQUNJOztrQkFBRyxXQUFVLGFBQVYsRUFBSDtnQkFDSTs7O29CQUNNLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxlQUFmLENBQStCLE1BQS9CLENBQXNDLE1BQU0sRUFBTixDQUQ1QztpQkFESjt1QkFJVyxNQUFNLElBQU4sQ0FBVyxXQUFYLENBQXVCLE9BQXZCLENBQStCLENBQS9CLE9BSlg7YUFESixDQUR3Qjs7OztvQ0FVaEIsa0JBQWtCLE9BQU87QUFDakMsZ0JBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixTQUFuQixFQUE4QjtBQUMvQix1QkFDSTs7c0JBQUcsV0FBVSxhQUFWLEVBQUg7O2lCQURKLENBRCtCO2FBQW5DO0FBT0EsZ0JBQUksaUJBQWlCLElBQWpCLEtBQTBCLGFBQTFCLElBQTJDLEtBQUssV0FBTCxFQUEzQyxFQUErRDtBQUMvRCx1QkFBTyxLQUFLLG9CQUFMLENBQTBCLEtBQTFCLENBQVAsQ0FEK0Q7YUFBbkU7QUFHQSxtQkFDSTs7a0JBQUcsV0FBVSxhQUFWLEVBQUg7Z0JBQ00sTUFBTSxJQUFOLENBQVcsV0FBWCxDQUF1QixPQUF2QixDQUErQixDQUEvQixDQUROO2FBREosQ0FYaUM7Ozs7K0NBaUJkO0FBQ25CLGdCQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsbUJBQW5CLENBREQ7QUFFbkIsZ0JBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxjQUFYLEVBQTJCO0FBQzVCLHVCQUFPLElBQVAsQ0FENEI7YUFBaEM7QUFHQSxnQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFNBQW5CLEVBQThCO0FBQy9CLHVCQUNJOztzQkFBSSxXQUFVLGFBQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7O3FCQURKO2lCQURKLENBRCtCO2FBQW5DO0FBU0EsZ0JBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixtQkFBaEIsS0FBd0MsdUJBQXhDLEVBQWlFO0FBQ2pFLG9CQUFNLFVBQVUsWUFBWSxhQUFaLENBQTBCLGFBQTFCLENBQXdDLE9BQXhDLENBQWdELENBQWhELENBQVYsQ0FEMkQ7QUFFakUsb0JBQU0sVUFBVSxZQUFZLGFBQVosQ0FBMEIsZUFBMUIsQ0FBMEMsT0FBMUMsQ0FBa0QsQ0FBbEQsQ0FBVixDQUYyRDtBQUdqRSx1QkFDSTs7c0JBQUksV0FBVSxhQUFWLEVBQUo7b0JBQ0k7OzBCQUFHLFdBQVUsYUFBVixFQUFIO3dCQUNJOzs7NEJBQ1Msb0JBQUUsK0JBQUYsV0FBd0Msa0JBQWEsT0FEOUQ7eUJBREo7d0JBSUksK0JBSko7d0JBS0k7Ozs0QkFDTSxZQUFZLGFBQVosQ0FBMEIsT0FBMUIsQ0FBa0MsQ0FBbEMsQ0FETjt5QkFMSjs7d0JBUVksSUFSWjt3QkFTTSxZQUFZLGVBQVosQ0FBNEIsT0FBNUIsQ0FBb0MsQ0FBcEMsQ0FUTjtxQkFESjtpQkFESixDQUhpRTthQUFyRTtBQW1CQSxtQkFDSTs7a0JBQUksV0FBVSxhQUFWLEVBQUo7Z0JBQ0k7O3NCQUFHLFdBQVUsYUFBVixFQUFIO29CQUNJOzs7d0JBQ00sWUFBWSxhQUFaLENBQTBCLE9BQTFCLENBQWtDLENBQWxDLENBRE47cUJBREo7O29CQUlZLElBSlo7b0JBS00sWUFBWSxlQUFaLENBQTRCLE9BQTVCLENBQW9DLENBQXBDLENBTE47aUJBREo7YUFESixDQWpDbUI7Ozs7NkNBNkNGOzs7QUFDakIsZ0JBQU0sYUFBYSxJQUFJLEdBQUosQ0FBUSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixNQUFuQixDQUEwQixHQUExQixDQUE4Qjt1QkFBUyxDQUFDLE1BQU0sbUJBQU4sRUFBMkIsS0FBNUI7YUFBVCxDQUF0QyxDQUFiLENBRFc7QUFFakIsbUJBQU8sS0FBSyxLQUFMLENBQVcsb0JBQVgsQ0FBZ0MsR0FBaEMsQ0FBb0MsVUFBQyxFQUFELEVBQUssR0FBTDt1QkFDdkM7O3NCQUFJLEtBQU0sS0FBSyxHQUFHLEVBQUgsU0FBWSxHQUFqQixFQUFWO29CQUNNLE9BQUssV0FBTCxDQUFpQixFQUFqQixFQUFxQixXQUFXLEdBQVgsQ0FBZSxHQUFHLEVBQUgsQ0FBcEMsQ0FETjs7YUFEdUMsQ0FBM0MsQ0FGaUI7Ozs7aUNBUVo7QUFDTCxtQkFDSTs7O2dCQUNJOztzQkFBSSxXQUFVLE9BQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWY7cUJBRlY7aUJBREo7Z0JBTUk7O3NCQUFJLFdBQVUsUUFBVixFQUFKO29CQUNJOzswQkFBRyxXQUFVLGFBQVYsRUFBSDt3QkFDTSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixXQUFuQixDQUErQixNQUEvQjtxQkFGVjtpQkFOSjtnQkFXSTs7c0JBQUksV0FBVSxhQUFWLEVBQUo7b0JBQ00scUNBQXNCLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFdBQW5CLENBRDVCO2lCQVhKO2dCQWNNLEtBQUssb0JBQUwsRUFkTjtnQkFlTSxLQUFLLGtCQUFMLEVBZk47Z0JBZ0JJOztzQkFBSSxXQUFVLE1BQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sS0FBSyxPQUFMLEVBRE47cUJBREo7aUJBaEJKO2FBREosQ0FESzs7Ozs0QkF6SWM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHFDQUFxQixHQUFHLFVBQUgsQ0FBYyxHQUFkLEVBQW1CLFVBQW5CO0FBQ3JCLHNDQUFzQixHQUFHLE9BQUgsQ0FDbEIsR0FBRyxLQUFILENBQVM7QUFDTCwwQkFBTSxHQUFHLE1BQUgsQ0FBVSxVQUFWO2lCQURWLEVBRUcsVUFGSCxDQURrQixDQUlwQixVQUpvQjtBQUt0QixxQkFBSyxHQUFHLEtBQUgsQ0FBUztBQUNWLHFDQUFpQixHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ2pCLDJCQUFPLEdBQUcsTUFBSDtBQUNQLHlCQUFLLEdBQUcsS0FBSCxDQUFTO0FBQ1YsbUNBQVcsR0FBRyxJQUFILENBQVEsVUFBUjtBQUNYLHFDQUFhLEdBQUcsS0FBSCxDQUFTO0FBQ2xCLG9DQUFRLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDUixrQ0FBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLHNDQUFNLEdBQUcsTUFBSCxDQUFVLFVBQVY7NkJBREosRUFFSCxVQUZHO3lCQUZHLEVBS1YsVUFMVTtBQU1iLGdDQUFRLEdBQUcsT0FBSCxDQUNKLEdBQUcsS0FBSCxDQUFTO0FBQ0wsaURBQXFCLEdBQUcsTUFBSCxDQUFVLFVBQVY7eUJBRHpCLEVBRUcsVUFGSCxDQURJLENBSU4sVUFKTTtBQUtSLDZDQUFxQixHQUFHLEtBQUgsQ0FBUztBQUMxQiwyQ0FBZSxHQUFHLE1BQUg7QUFDZiw2Q0FBaUIsR0FBRyxNQUFIO0FBQ2pCLDJDQUFlLEdBQUcsS0FBSCxDQUFTO0FBQ3BCLCtDQUFlLEdBQUcsTUFBSDtBQUNmLGlEQUFpQixHQUFHLE1BQUg7NkJBRk4sQ0FBZjt5QkFIaUIsQ0FBckI7cUJBYkMsRUFxQkYsVUFyQkU7aUJBSEosRUF5QkYsVUF6QkU7QUEwQkwsc0JBQU0sR0FBRyxLQUFILENBQVM7QUFDWCx5Q0FBcUIsR0FBRyxNQUFILENBQVUsVUFBVjtpQkFEbkIsRUFFSCxVQUZHO0FBR04sZ0NBQWdCLEdBQUcsSUFBSCxDQUFRLFVBQVI7YUFwQ3BCLENBRm1COzs7O1dBRE47RUFBWSxNQUFNLFNBQU47O2tCQUFaOzs7QUFzS3JCLElBQUksV0FBSixHQUFrQixzQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbktxQjs7Ozs7Ozs7Ozs7cUNBa0NKLEtBQUs7QUFDZCxnQkFBSSxDQUFDLEdBQUQsRUFBTTtBQUNOLHVCQUFPLE1BQVAsQ0FETTthQUFWO0FBR0EsZ0JBQUksQ0FBQyxJQUFJLEdBQUosQ0FBUSxTQUFSLEVBQW1CO0FBQ3BCLHVCQUFPLGVBQVAsQ0FEb0I7YUFBeEI7QUFHQSxtQkFBTyxJQUFJLFFBQUosR0FBZSxVQUFmLEdBQTRCLGNBQTVCLENBUE87Ozs7d0NBU0YsWUFBWTtBQUN4QixtQkFBTyxzREFBa0MsVUFBbEMsQ0FBUCxDQUR3Qjs7Ozs2Q0FHUCxVQUFVLFVBQVUsZUFBZSxRQUFRO0FBQzVELGdCQUFNLGNBQWMsS0FBSyxZQUFMLENBQWtCLFFBQWxCLENBQWQsQ0FEc0Q7QUFFNUQsZ0JBQU0sY0FBYyxLQUFLLFlBQUwsQ0FBa0IsUUFBbEIsQ0FBZCxDQUZzRDtBQUc1RCxnQkFBSSxnQkFBZ0IsV0FBaEIsRUFBNkI7QUFDN0IsdUJBQU8sSUFBUCxDQUQ2QjthQUFqQztBQUdBLGdCQUFJLGdCQUFnQixlQUFoQixJQUFtQyxDQUFDLGFBQUQsRUFBZ0I7QUFDbkQsdUJBQU8sSUFBUCxDQURtRDthQUF2RDtBQUdBLG1CQUNJOztrQkFBSSxZQUFXLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBZjtnQkFDSTs7c0JBQUksV0FBVSxpQkFBVixFQUE0QixTQUFVLE1BQVYsRUFBaEM7b0JBQ0k7OzBCQUFHLFdBQVUsV0FBVixFQUFIO3dCQUNNLEtBQUssZUFBTCxDQUFxQixXQUFyQixDQUROO3FCQURKO2lCQURKO2FBREosQ0FUNEQ7Ozs7aUNBb0J2RDtBQUNMLGdCQUFNLG1CQUFtQixDQUFDLG1CQUFELEVBQXNCLHdCQUF0QixFQUFnRCxPQUFoRCxDQUNyQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixDQURxQixHQUNrQixDQURsQixDQURwQjtBQUdMLGdCQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixVQUFoQixDQUEyQixpQkFBM0IsQ0FBNkMsTUFBN0MsQ0FDaEI7dUJBQU0sQ0FBQyxZQUFELEVBQWUsYUFBZixFQUE4QixPQUE5QixDQUFzQyxHQUFHLElBQUgsQ0FBdEMsSUFBa0QsQ0FBbEQ7YUFBTixDQURFLENBSEQ7QUFLTCxnQkFBTSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixZQUFoQixLQUFpQyxJQUFqQyxDQUxqQjtBQU1MLGdCQUFNLFNBQVMsNEJBQWtCLFlBQVksTUFBWixFQUFvQixnQkFBdEMsQ0FBVCxDQU5EO0FBT0wsZ0JBQU0sVUFBVSxJQUFJLEdBQUosQ0FBUSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFVBQWhCLENBQTJCLGlCQUEzQixDQUE2QyxHQUE3QyxDQUFpRDt1QkFBTSxDQUFDLEdBQUcsRUFBSCxFQUFPLEVBQVI7YUFBTixDQUF6RCxDQUFWLENBUEQ7QUFRTCxnQkFBSSxPQUFPLEVBQVAsQ0FSQztBQVNMLGlCQUFLLElBQUksTUFBTSxDQUFOLEVBQVMsTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE1BQWpCLEVBQXlCLEVBQUUsR0FBRixFQUFPO0FBQ3BELHFCQUFLLElBQUwsQ0FBVSxLQUFLLG9CQUFMLENBQ04sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixNQUFNLENBQU4sQ0FEWCxFQUVOLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FGTSxFQUdOLGFBSE0sRUFJTixJQUFJLFlBQVksTUFBWixHQUFxQixnQkFBekIsQ0FKSixFQURvRDtBQU9wRCxxQkFBSyxJQUFMLENBQ0k7QUFDSSx5Q0FBc0IsT0FBdEI7QUFDQSx5QkFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLENBQTBCLEVBQTFCO0FBQ04sMENBQXVCLFdBQXZCO0FBQ0EseUJBQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixHQUFqQixDQUFOO0FBQ0Esb0NBQWlCLGdCQUFqQjtBQUNBLDBCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7aUJBTlgsQ0FESixFQVBvRDthQUF4RDtBQWtCQSxtQkFDSTs7a0JBQUssV0FBVSxlQUFWLEVBQUw7Z0JBQ0k7O3NCQUFPLFdBQVUsZ0JBQVYsRUFBUDtvQkFDSTs7O3dCQUNJOzs7NEJBQ0k7O2tDQUFJLFdBQVUsT0FBVixFQUFrQixPQUFRLE9BQU8sYUFBUCxFQUFSLEVBQXRCO2dDQUNJOzs7b0NBQ00sb0JBQUUsc0JBQUYsQ0FETjtpQ0FESjs2QkFESjs0QkFNSTs7a0NBQUksV0FBVSxRQUFWLEVBQW1CLE9BQVEsT0FBTyxjQUFQLEVBQVIsRUFBdkI7Z0NBQ0k7OztvQ0FDTSxvQkFBRSx1QkFBRixDQUROO2lDQURKOzZCQU5KOzRCQVdJOztrQ0FBSSxXQUFVLGFBQVYsRUFBd0IsT0FBUSxPQUFPLFlBQVAsRUFBUixFQUE1QjtnQ0FDSTs7O29DQUNNLG9CQUFFLGlDQUFGLENBRE47aUNBREo7NkJBWEo7NEJBZ0JNLG1CQUNFOztrQ0FBSSxXQUFVLGFBQVYsRUFBd0IsT0FBUSxPQUFPLGtCQUFQLEVBQVIsRUFBNUI7Z0NBQ0k7OztvQ0FDTSxvQkFBRSw0QkFBRixDQUROO2lDQURKOzZCQURGLEdBTUUsSUFORjs0QkFPQSxZQUFZLEdBQVosQ0FBZ0I7dUNBQ2Q7O3NDQUFJLEtBQU0sR0FBRyxFQUFILEVBQVEsT0FBUSxPQUFPLGFBQVAsRUFBUixFQUFsQjtvQ0FDSTs7O3dDQUNNLGlDQUFrQixFQUFsQixDQUROO3FDQURKOzs2QkFEYyxDQXZCdEI7NEJBOEJJOztrQ0FBSSxXQUFVLE1BQVYsRUFBaUIsT0FBUSxPQUFPLGFBQVAsRUFBUixFQUFyQjtnQ0FDSTs7c0NBQUcsV0FBVSxhQUFWLEVBQUg7b0NBQ00sb0JBQUUscUJBQUYsQ0FETjtpQ0FESjs2QkE5Qko7eUJBREo7cUJBREo7b0JBdUNJOzs7d0JBQ00sSUFETjtxQkF2Q0o7aUJBREo7YUFESixDQTNCSzs7OztzQ0F2Q1ksTUFBTTtBQUN2QixpQkFDSyxRQURMLENBQ2MsaUJBRGQsRUFDaUMsV0FEakMsRUFDOEMsS0FEOUMsRUFFSyxRQUZMLENBRWMsa0JBRmQsRUFFa0Msa0JBRmxDLEVBRXNELE1BRnRELEVBR0ssUUFITCxDQUdjLGNBSGQsRUFHOEIsYUFIOUIsRUFHNkMsTUFIN0MsRUFEdUI7Ozs7NEJBMUJKO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCx1QkFBTyxHQUFHLE9BQUgsQ0FDSCxHQUFHLEtBQUgsQ0FBUztBQUNMLDhCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDVix5QkFBSyxHQUFHLEtBQUgsQ0FBUztBQUNWLDRCQUFJLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDSixtQ0FBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO3FCQUZWLEVBR0YsVUFIRTtpQkFGVCxFQU1HLFVBTkgsQ0FERyxDQVFMLFVBUks7QUFTUCxzQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLHlDQUFxQixHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ3JCLGtDQUFjLEdBQUcsTUFBSDtBQUNkLGdDQUFZLEdBQUcsS0FBSCxDQUFTO0FBQ2pCLDJDQUFtQixHQUFHLE9BQUgsQ0FDZixHQUFHLEtBQUgsQ0FBUztBQUNMLGtDQUFNLEdBQUcsTUFBSCxDQUFVLFVBQVY7eUJBRFYsRUFFRyxVQUZILENBRGUsQ0FJakIsVUFKaUI7cUJBRFgsRUFNVCxVQU5TO2lCQUhWLEVBVUgsVUFWRzthQVZWLENBRm1COzs7O1dBRE47RUFBc0IsTUFBTSxTQUFOOztrQkFBdEI7OztBQStJckIsY0FBYyxXQUFkLEdBQTRCLGtDQUE1Qjs7Ozs7Ozs7Ozs7OztJQ3RKcUI7QUFDakIsYUFEaUIsYUFDakIsQ0FBWSxRQUFaLEVBQXNCOzhCQURMLGVBQ0s7O0FBQ2xCLGFBQUssV0FBTCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxLQUFLLFFBQUwsQ0FBOUIsQ0FEa0I7QUFFbEIsYUFBSyxXQUFMLEdBQW1CLENBQW5CLENBRmtCO0FBR2xCLGFBQUssVUFBTCxHQUFrQixNQUFNLEtBQUssV0FBTCxHQUFtQixRQUFuQixHQUE4QixLQUFLLFdBQUwsQ0FIcEM7S0FBdEI7O2lCQURpQjs7d0NBTUQ7QUFDWixtQkFBTztBQUNILHVCQUFVLEtBQUssV0FBTCxNQUFWO2FBREosQ0FEWTs7Ozt1Q0FLRDtBQUNYLG1CQUFPO0FBQ0gsdUJBQVUsS0FBSyxVQUFMLE1BQVY7YUFESixDQURXOzs7O3dDQUtDO0FBQ1osbUJBQU87QUFDSCx1QkFBVSxLQUFLLFdBQUwsTUFBVjthQURKLENBRFk7Ozs7V0FoQkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0lBOzs7Ozs7Ozs7OztpQ0FpQlI7QUFDTCxtQkFDSTs7a0JBQU8sV0FBVSxpQkFBVixFQUFQO2dCQUFtQzs7O29CQUM3QixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLFVBQS9CLENBQTBDLEdBQTFDLENBQThDLFVBQUMsS0FBRCxFQUFRLEdBQVI7K0JBQzVDOzs4QkFBSSxLQUFNLEdBQU4sRUFBSjs0QkFDSTs7O2dDQUNJOzs7b0NBQUssb0JBQUUsMEJBQUYsRUFBOEIsTUFBTSxDQUFOLENBQW5DOztpQ0FESjs2QkFESjs0QkFJSTs7O2dDQUNJOzs7b0NBQUssMkJBQVksS0FBWixFQUFtQixLQUFuQixDQUFMO2lDQURKOzZCQUpKOztxQkFENEMsQ0FEakI7b0JBVy9COzs7d0JBQ0k7Ozs0QkFDSTs7O2dDQUFLLG9CQUFFLHNCQUFGLENBQUw7OzZCQURKO3lCQURKO3dCQUlJOzs7NEJBQ0k7OztnQ0FBSywyQkFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLFFBQS9CLENBQWpCOzZCQURKO3lCQUpKO3FCQVgrQjtvQkFtQi9COzs7d0JBQ0k7Ozs0QkFDSTs7O2dDQUFLLG9CQUFFLHFCQUFGLENBQUw7OzZCQURKO3lCQURKO3dCQUlJOzs4QkFBSSxXQUFVLGFBQVYsRUFBSjs0QkFDSTs7O2dDQUFLLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsV0FBdEI7NkJBRFQ7eUJBSko7cUJBbkIrQjtpQkFBbkM7YUFESixDQURLOzs7OzRCQWhCYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWix3QkFBSSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ0osMEJBQU0sR0FBRyxLQUFILENBQVM7QUFDWCxxQ0FBYSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ2Isa0NBQVUsR0FBRyxLQUFILENBQVM7QUFDZix3Q0FBWSxHQUFHLE9BQUgsQ0FBVyxHQUFHLE1BQUgsQ0FBWCxDQUFzQixVQUF0QjtBQUNaLHNDQUFVLEdBQUcsTUFBSDt5QkFGSixFQUdQLFVBSE87cUJBRlIsRUFNSCxVQU5HO2lCQUZILEVBU0osVUFUSTthQURYLENBRm1COzs7O1dBRE47RUFBa0IsTUFBTSxTQUFOOztrQkFBbEI7OztBQW1EckIsVUFBVSxXQUFWLEdBQXdCLGdEQUF4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkRxQjs7Ozs7Ozs7Ozs7aUNBc0JSO0FBQ0wsZ0JBQU0sZUFBZSxLQUFLLEtBQUwsQ0FBVyxXQUFYLEtBQTJCLGNBQTNCLEdBQTRDLEdBQTVDLEdBQWtELEdBQWxELENBRGhCO0FBRUwsbUJBQ0k7O2tCQUFPLFdBQVUsaUJBQVYsRUFBUDtnQkFBbUM7OztvQkFDL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUsc0JBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsUUFBL0IsRUFBeUMsS0FBckQsQ0FBTDs2QkFESjt5QkFKSjtxQkFEK0I7b0JBUy9COzs7d0JBQ0k7Ozs0QkFDSTs7O2dDQUFLLG9CQUFFLHNCQUFGLENBQUw7OzZCQURKO3lCQURKO3dCQUlJOzs7NEJBQ0k7OztnQ0FBSywyQkFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLE1BQS9CLEVBQXVDLEtBQW5ELENBQUw7NkJBREo7eUJBSko7cUJBVCtCO29CQWlCL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUsc0JBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsVUFBL0IsRUFBMkMsWUFBdkQsQ0FBTDs2QkFESjt5QkFKSjtxQkFqQitCO29CQXlCL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUscUJBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsV0FBL0IsRUFBNEMsWUFBeEQsQ0FBTDs2QkFESjt5QkFKSjtxQkF6QitCO29CQWlDL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUsc0JBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsY0FBL0IsQ0FBakI7NkJBREo7eUJBSko7cUJBakMrQjtvQkF5Qy9COzs7d0JBQ0k7Ozs0QkFDSTs7O2dDQUFLLG9CQUFFLHNCQUFGLENBQUw7OzZCQURKO3lCQURKO3dCQUlJOzs7NEJBQ0k7OztnQ0FBSywyQkFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBQWpCOzZCQURKO3lCQUpKO3FCQXpDK0I7b0JBaUQvQjs7O3dCQUNJOzs7NEJBQ0k7OztnQ0FBSyxvQkFBRSxxQkFBRixDQUFMOzs2QkFESjt5QkFESjt3QkFJSTs7OEJBQUksV0FBVSxhQUFWLEVBQUo7NEJBQ0k7OztnQ0FBSyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFdBQXRCOzZCQURUO3lCQUpKO3FCQWpEK0I7aUJBQW5DO2FBREosQ0FGSzs7Ozs0QkFyQmM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHVCQUFPLEdBQUcsS0FBSCxDQUFTO0FBQ1osd0JBQUksR0FBRyxNQUFILENBQVUsVUFBVjtBQUNKLDBCQUFNLEdBQUcsS0FBSCxDQUFTO0FBQ1gscUNBQWEsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNiLGtDQUFVLEdBQUcsS0FBSCxDQUFTO0FBQ2Ysc0NBQVUsR0FBRyxNQUFIO0FBQ1Ysb0NBQVEsR0FBRyxNQUFIO0FBQ1Isd0NBQVksR0FBRyxNQUFIO0FBQ1oseUNBQWEsR0FBRyxNQUFIO0FBQ2IsNENBQWdCLEdBQUcsTUFBSDtBQUNoQiwwQ0FBYyxHQUFHLE1BQUg7eUJBTlIsRUFPUCxVQVBPO3FCQUZSLEVBVUgsVUFWRztpQkFGSCxFQWFKLFVBYkk7QUFjUCw2QkFBYSxHQUFHLE1BQUgsQ0FBVSxVQUFWO2FBZmpCLENBRm1COzs7O1dBRE47RUFBbUIsTUFBTSxTQUFOOztrQkFBbkI7OztBQXVGckIsV0FBVyxXQUFYLEdBQXlCLGlEQUF6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdkZxQjs7Ozs7Ozs7Ozs7aUNBMEJSO0FBQ0wsbUJBQ0k7O2tCQUFPLFdBQVUsaUJBQVYsRUFBUDtnQkFBbUM7OztvQkFDL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUscUJBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsVUFBL0IsRUFBMkMsR0FBdkQsQ0FBTDs2QkFESjt5QkFKSjtxQkFEK0I7b0JBUy9COzs7d0JBQ0k7Ozs0QkFDSTs7O2dDQUFLLG9CQUFFLHNCQUFGLENBQUw7OzZCQURKO3lCQURKO3dCQUlJOzs7NEJBQ0k7OztnQ0FBSywyQkFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLFVBQS9CLEVBQTJDLEdBQXZELENBQUw7NkJBREo7eUJBSko7cUJBVCtCO29CQWlCL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUsc0JBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsVUFBL0IsRUFBMkMsR0FBdkQsQ0FBTDs2QkFESjt5QkFKSjtxQkFqQitCO29CQXlCL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUscUJBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsVUFBL0IsRUFBMkMsR0FBdkQsQ0FBTDs2QkFESjt5QkFKSjtxQkF6QitCO29CQWlDL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUsc0JBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsY0FBL0IsQ0FBakI7NkJBREo7eUJBSko7cUJBakMrQjtvQkF5Qy9COzs7d0JBQ0k7Ozs0QkFDSTs7O2dDQUFLLG9CQUFFLHNCQUFGLENBQUw7OzZCQURKO3lCQURKO3dCQUlJOzs7NEJBQ0k7OztnQ0FBSywyQkFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBQWpCOzZCQURKO3lCQUpKO3FCQXpDK0I7b0JBaUQvQjs7O3dCQUNJOzs7NEJBQ0k7OztnQ0FBSyxvQkFBRSxxQkFBRixDQUFMOzs2QkFESjt5QkFESjt3QkFJSTs7OEJBQUksV0FBVSxhQUFWLEVBQUo7NEJBQ0k7OztnQ0FBSyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLENBQXNCLFdBQXRCOzZCQURUO3lCQUpKO3FCQWpEK0I7b0JBeUQvQjs7O3dCQUNJOzs7NEJBQ0k7OztnQ0FBSyxvQkFBRSxxQkFBRixDQUFMOzs2QkFESjt5QkFESjt3QkFJSTs7OEJBQUksV0FBVSxhQUFWLEVBQUo7NEJBQ0k7OztnQ0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsZUFBZixDQUErQixNQUEvQixDQUFzQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEVBQWpCLENBQTNDOzZCQURKO3lCQUpKO3FCQXpEK0I7aUJBQW5DO2FBREosQ0FESzs7Ozs0QkF6QmM7QUFDbkIsZ0JBQU0sS0FBSyxNQUFNLFNBQU4sQ0FEUTtBQUVuQixtQkFBTztBQUNILHFCQUFLLEdBQUcsS0FBSCxDQUFTO0FBQ1YscUNBQWlCLEdBQUcsS0FBSCxDQUFTO0FBQ3RCLGdDQUFRLEdBQUcsTUFBSCxDQUFVLFVBQVY7cUJBREssRUFFZCxVQUZjO2lCQURoQixFQUlGLFVBSkU7QUFLTCx1QkFBTyxHQUFHLEtBQUgsQ0FBUztBQUNaLHdCQUFJLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDSiwwQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLHFDQUFhLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDYixrQ0FBVSxHQUFHLEtBQUgsQ0FBUztBQUNmLHdDQUFZLEdBQUcsTUFBSDtBQUNaLHdDQUFZLEdBQUcsTUFBSDtBQUNaLHdDQUFZLEdBQUcsTUFBSDtBQUNaLHdDQUFZLEdBQUcsTUFBSDtBQUNaLDRDQUFnQixHQUFHLE1BQUg7QUFDaEIsMENBQWMsR0FBRyxNQUFIO3lCQU5SLEVBT1AsVUFQTztxQkFGUixFQVVILFVBVkc7aUJBRkgsRUFhSixVQWJJO2FBTlgsQ0FGbUI7Ozs7V0FETjtFQUEyQixNQUFNLFNBQU47O2tCQUEzQjs7O0FBa0dyQixtQkFBbUIsV0FBbkIsR0FBaUMseURBQWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNsR3FCOzs7Ozs7Ozs7OztpQ0F3QlI7QUFDTCxtQkFDSTs7a0JBQU8sV0FBVSxpQkFBVixFQUFQO2dCQUFtQzs7O29CQUMvQjs7O3dCQUNJOzs7NEJBQ0k7OztnQ0FBSyxvQkFBRSxzQkFBRixDQUFMOzs2QkFESjt5QkFESjt3QkFJSTs7OzRCQUNJOzs7Z0NBQUssMkJBQVksS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixVQUEvQixFQUEyQyxHQUF2RCxDQUFMOzZCQURKO3lCQUpKO3FCQUQrQjtvQkFTL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUsc0JBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7Ozs0QkFDSTs7O2dDQUFLLDJCQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBK0IsVUFBL0IsRUFBMkMsR0FBdkQsQ0FBTDs2QkFESjt5QkFKSjtxQkFUK0I7b0JBaUIvQjs7O3dCQUNJOzs7NEJBQ0k7OztnQ0FBSyxvQkFBRSxxQkFBRixDQUFMOzs2QkFESjt5QkFESjt3QkFJSTs7OzRCQUNJOzs7Z0NBQUssMkJBQVksS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixVQUEvQixFQUEyQyxHQUF2RCxDQUFMOzZCQURKO3lCQUpKO3FCQWpCK0I7b0JBeUIvQjs7O3dCQUNJOzs7NEJBQ0k7OztnQ0FBSyxvQkFBRSxxQkFBRixDQUFMOzs2QkFESjt5QkFESjt3QkFJSTs7OzRCQUNJOzs7Z0NBQUssMkJBQVksS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUErQixRQUEvQixDQUFqQjs2QkFESjt5QkFKSjtxQkF6QitCO29CQWlDL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUscUJBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7OzhCQUFJLFdBQVUsYUFBVixFQUFKOzRCQUNJOzs7Z0NBQUssS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixXQUF0Qjs2QkFEVDt5QkFKSjtxQkFqQytCO29CQXlDL0I7Ozt3QkFDSTs7OzRCQUNJOzs7Z0NBQUssb0JBQUUscUJBQUYsQ0FBTDs7NkJBREo7eUJBREo7d0JBSUk7OzhCQUFJLFdBQVUsYUFBVixFQUFKOzRCQUNJOzs7Z0NBQUssS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLGVBQWYsQ0FBK0IsTUFBL0IsQ0FBc0MsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixFQUFqQixDQUEzQzs2QkFESjt5QkFKSjtxQkF6QytCO2lCQUFuQzthQURKLENBREs7Ozs7NEJBdkJjO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSCxxQkFBSyxHQUFHLEtBQUgsQ0FBUztBQUNWLHFDQUFpQixHQUFHLEtBQUgsQ0FBUztBQUN0QixnQ0FBUSxHQUFHLE1BQUgsQ0FBVSxVQUFWO3FCQURLLEVBRWQsVUFGYztpQkFEaEIsRUFJRixVQUpFO0FBS0wsdUJBQU8sR0FBRyxLQUFILENBQVM7QUFDWix3QkFBSSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ0osMEJBQU0sR0FBRyxLQUFILENBQVM7QUFDWCxxQ0FBYSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ2Isa0NBQVUsR0FBRyxLQUFILENBQVM7QUFDZix3Q0FBWSxHQUFHLE1BQUg7QUFDWix3Q0FBWSxHQUFHLE1BQUg7QUFDWix3Q0FBWSxHQUFHLE1BQUg7QUFDWixzQ0FBVSxHQUFHLE1BQUg7eUJBSkosRUFLUCxVQUxPO3FCQUZSLEVBUUgsVUFSRztpQkFGSCxFQVdKLFVBWEk7YUFOWCxDQUZtQjs7OztXQUROO0VBQXVCLE1BQU0sU0FBTjs7a0JBQXZCOzs7QUFnRnJCLGVBQWUsV0FBZixHQUE2QixxREFBN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUMvRXFCOzs7Ozs7Ozs7OztnREEwRE87QUFDcEIsbUJBQ0k7OztnQkFDSTs7O29CQUNJOzs7d0JBQ00sb0JBQUUsOEJBQUYsRUFDRSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixXQUFuQixDQUErQixNQUEvQixFQUNBLElBRkYsRUFHRSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixXQUFuQixDQUErQixTQUEvQixDQUF5QyxNQUF6QyxDQUpSO3FCQURKO2lCQURKO2dCQVVNLHFDQUFzQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixXQUFuQixDQVY1QjthQURKLENBRG9COzs7O2lEQWdCQzs7O0FBQ3JCLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEI7QUFDL0IsdUJBQU8sSUFBUCxDQUQrQjthQUFuQztBQUdBLGdCQUFNLG1CQUFtQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixNQUFuQixDQUEwQixJQUExQixDQUNyQjt1QkFBUyxPQUFLLEtBQUwsQ0FBVyxtQkFBWCxDQUErQixHQUEvQixDQUFtQyxNQUFNLG1CQUFOLENBQW5DLENBQThELElBQTlELEtBQXVFLFlBQXZFO2FBQVQsQ0FERSxDQUplO0FBTXJCLG1CQUNJOzs7Z0JBQ0k7OztvQkFDUyxvQkFBRSx3QkFBRixRQURUO2lCQURKO2dCQUlNLG1CQUNLLGlCQUFpQixJQUFqQixDQUFzQixXQUF0QixDQUFrQyxPQUFsQyxFQURMLEdBRUksR0FGSjthQUxWLENBTnFCOzs7OzBDQWtCUDtBQUNkLGdCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEI7QUFDL0IsdUJBQU8sSUFBUCxDQUQrQjthQUFuQztBQUdBLGdCQUFJLENBQUMsY0FBRCxFQUFpQix1QkFBakIsRUFBMEMsT0FBMUMsQ0FBa0QsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixtQkFBaEIsQ0FBbEQsR0FBeUYsQ0FBekYsRUFBNEY7QUFDNUYsdUJBQU8sSUFBUCxDQUQ0RjthQUFoRztBQUdBLGdCQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFVBQW5CLENBQThCLE1BQTlCLEtBQXlDLENBQXpDLEVBQTRDO0FBQzVDLHVCQUFPLElBQVAsQ0FENEM7YUFBaEQ7QUFHQSxnQkFBTSxxQkFBcUIsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsVUFBbkIsQ0FBOEIsU0FBOUIsQ0FDdkI7dUJBQVcsUUFBUSxLQUFSLEtBQWtCLFFBQVEsY0FBUjthQUE3QixDQUR1QixHQUV2QixDQUZ1QixDQVZiO0FBYWQsZ0JBQU0sa0JBQXNCLE1BQU0sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsVUFBbkIsQ0FBOEIsTUFBOUIsTUFBNUIsQ0FiUTtBQWNkLG1CQUNJOzs7Z0JBQ0k7OztvQkFDSTs7O3dCQUNNLHFCQUNJLG9CQUFFLG1DQUFGLENBREosR0FFSSxvQkFBRSwyQkFBRixDQUZKOzJCQUROO3FCQURKO2lCQURKO2dCQVNJOztzQkFBTyxXQUFVLFlBQVYsRUFBUDtvQkFBOEI7Ozt3QkFDMUI7Ozs0QkFDTSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixVQUFuQixDQUE4QixHQUE5QixDQUFrQyxVQUFDLElBQUQsRUFBTyxHQUFQO3VDQUNoQzs7c0NBQUksS0FBTSxHQUFOLEVBQVksT0FBUSxFQUFFLE9BQU8sZUFBUCxFQUFWLEVBQWhCO29DQUNJOzswQ0FBRyxXQUFVLGFBQVYsRUFBSDt3Q0FDTSxLQUFLLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBNEIsQ0FBNUIsQ0FETjtxQ0FESjs7NkJBRGdDLENBRHhDO3lCQUQwQjt3QkFVeEIscUJBQ0U7Ozs0QkFDTSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixVQUFuQixDQUE4QixHQUE5QixDQUFrQyxVQUFDLElBQUQsRUFBTyxHQUFQO3VDQUNoQzs7c0NBQUksS0FBTSxHQUFOLEVBQVksT0FBUSxFQUFFLE9BQU8sZUFBUCxFQUFWLEVBQWhCO29DQUNJOzswQ0FBRyxXQUFVLGFBQVYsRUFBSDt3Q0FDTSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLENBRE47cUNBREo7OzZCQURnQyxDQUR4Qzt5QkFERixHQVVFLElBVkY7cUJBVk47aUJBVEo7YUFESixDQWRjOzs7OytDQWlESztBQUNuQixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixLQUF3Qyx1QkFBeEMsRUFBaUU7QUFDakUsdUJBQU8sSUFBUCxDQURpRTthQUFyRTtBQUdBLGdCQUFNLFVBQVUsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsbUJBQW5CLENBQXVDLGFBQXZDLENBQXFELGFBQXJELENBQW1FLE9BQW5FLENBQTJFLENBQTNFLENBQVYsQ0FKYTtBQUtuQixnQkFBTSxVQUFVLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLG1CQUFuQixDQUF1QyxhQUF2QyxDQUFxRCxlQUFyRCxDQUFxRSxPQUFyRSxDQUE2RSxDQUE3RSxDQUFWLENBTGE7QUFNbkIsbUJBQ0k7OztnQkFDSTs7O29CQUNNLG9CQUFFLHlCQUFGLENBRE47aUJBREo7dUJBSVcsa0JBQWEsT0FKeEI7YUFESixDQU5tQjs7OztpREFlRTtBQUNyQixnQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFNBQW5CLEVBQThCO0FBQy9CLHVCQUFPLElBQVAsQ0FEK0I7YUFBbkM7QUFHQSxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixLQUF3Qyx1QkFBeEMsRUFBaUU7QUFDakUsdUJBQU8sSUFBUCxDQURpRTthQUFyRTtBQUdBLGdCQUFNLFVBQVUsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsbUJBQW5CLENBQXVDLFlBQXZDLENBQW9ELGFBQXBELENBQWtFLE9BQWxFLENBQTBFLENBQTFFLENBQVYsQ0FQZTtBQVFyQixnQkFBTSxVQUFVLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLG1CQUFuQixDQUF1QyxZQUF2QyxDQUFvRCxlQUFwRCxDQUFvRSxPQUFwRSxDQUE0RSxDQUE1RSxDQUFWLENBUmU7QUFTckIsbUJBQ0k7OztnQkFDSTs7O29CQUNNLG9CQUFFLDJCQUFGLENBRE47aUJBREo7dUJBSVcsa0JBQWEsT0FKeEI7YUFESixDQVRxQjs7OzsyQ0FrQk47QUFDZixnQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFNBQW5CLEVBQThCO0FBQy9CLHVCQUFPLElBQVAsQ0FEK0I7YUFBbkM7QUFHQSxnQkFBSSxDQUFDLG1CQUFELEVBQXNCLHdCQUF0QixFQUFnRCxPQUFoRCxDQUF3RCxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixDQUF4RCxJQUFnRyxDQUFoRyxFQUFtRztBQUNuRyx1QkFBTyxJQUFQLENBRG1HO2FBQXZHO0FBR0EsbUJBQ0k7OztnQkFDSTs7O29CQUNTLG9CQUFFLDRCQUFGLFdBQW9DLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFdBQW5CO2lCQUZqRDthQURKLENBUGU7Ozs7a0RBZU87QUFDdEIsZ0JBQUksS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEI7QUFDOUIsdUJBQU8sSUFBUCxDQUQ4QjthQUFsQztBQUdBLG1CQUNJOzs7Z0JBQ0k7OztvQkFDTSxvQkFBRSw4QkFBRixDQUROO2lCQURKO2FBREosQ0FKc0I7Ozs7OENBWUo7QUFDbEIsZ0JBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixZQUFoQixLQUFpQyxJQUFqQyxFQUF1QztBQUN2Qyx1QkFBTyxJQUFQLENBRHVDO2FBQTNDO0FBR0EsbUJBQ0k7OztnQkFDSTs7O29CQUNTLG9CQUFFLDBCQUFGLFFBRFQ7aUJBREo7Z0JBSU0sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFFBQWYsR0FDSSxvQkFBRSxtQkFBRixDQURKLEdBRUksb0JBQUUsa0JBQUYsQ0FGSjthQUxWLENBSmtCOzs7O2lDQWdCYjtBQUNMLG1CQUNJOztrQkFBSSxXQUFVLFlBQVYsRUFBSjtnQkFDTSxLQUFLLHFCQUFMLEVBRE47Z0JBRU0sS0FBSyxzQkFBTCxFQUZOO2dCQUdNLEtBQUssZUFBTCxFQUhOO2dCQUlNLEtBQUssb0JBQUwsRUFKTjtnQkFLTSxLQUFLLHNCQUFMLEVBTE47Z0JBTU0sS0FBSyxnQkFBTCxFQU5OO2dCQU9NLEtBQUssdUJBQUwsRUFQTjtnQkFRTSxLQUFLLG1CQUFMLEVBUk47YUFESixDQURLOzs7OzRCQXhOYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gscUNBQXFCLEdBQUcsVUFBSCxDQUFjLEdBQWQsRUFBbUIsVUFBbkI7QUFDckIscUJBQUssR0FBRyxLQUFILENBQVM7QUFDVixxQ0FBaUIsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNqQiw4QkFBVSxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1YsMkJBQU8sR0FBRyxNQUFIO0FBQ1AseUJBQUssR0FBRyxLQUFILENBQVM7QUFDVixtQ0FBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1gscUNBQWEsR0FBRyxNQUFILENBQVUsVUFBVjtBQUNiLG9DQUFZLEdBQUcsT0FBSCxDQUNSLEdBQUcsS0FBSCxDQUFTO0FBQ0wsNENBQWdCLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDaEIsbUNBQU8sR0FBRyxNQUFILENBQVUsVUFBVjt5QkFGWCxFQUdHLFVBSEgsQ0FEUSxDQUtWLFVBTFU7QUFNWixxQ0FBYSxHQUFHLEtBQUgsQ0FBUztBQUNsQixvQ0FBUSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1IsNENBQWdCLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDaEIsdUNBQVcsR0FBRyxPQUFILENBQ1AsR0FBRyxLQUFILENBQVM7QUFDTCw0Q0FBWSxHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ1osMkNBQVcsR0FBRyxNQUFILENBQVUsVUFBVjs2QkFGZixFQUdHLFVBSEgsQ0FETyxDQUtULFVBTFM7QUFNWCxrQ0FBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLHNDQUFNLEdBQUcsTUFBSCxDQUFVLFVBQVY7NkJBREosRUFFSCxVQUZHO3lCQVRHLEVBWVYsVUFaVTtBQWFiLGdDQUFRLEdBQUcsT0FBSCxDQUNKLEdBQUcsS0FBSCxDQUFTO0FBQ0wsaURBQXFCLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDckIsa0NBQU0sR0FBRyxLQUFILENBQVM7QUFDWCw2Q0FBYSxHQUFHLE1BQUgsQ0FBVSxVQUFWOzZCQURYLENBQU47eUJBRkosRUFLRyxVQUxILENBREksQ0FPTixVQVBNO0FBUVIsNkNBQXFCLEdBQUcsS0FBSCxDQUFTO0FBQzFCLDJDQUFlLEdBQUcsS0FBSCxDQUFTO0FBQ3BCLCtDQUFlLEdBQUcsTUFBSDtBQUNmLGlEQUFpQixHQUFHLE1BQUg7NkJBRk4sQ0FBZjtBQUlBLDBDQUFjLEdBQUcsS0FBSCxDQUFTO0FBQ25CLCtDQUFlLEdBQUcsTUFBSDtBQUNmLGlEQUFpQixHQUFHLE1BQUg7NkJBRlAsQ0FBZDt5QkFMaUIsQ0FBckI7cUJBOUJDLEVBd0NGLFVBeENFO2lCQUpKLEVBNkNGLFVBN0NFO0FBOENMLHNCQUFNLEdBQUcsS0FBSCxDQUFTO0FBQ1gseUNBQXFCLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDckIsa0NBQWMsR0FBRyxNQUFIO2lCQUZaLEVBR0gsVUFIRzthQWhEVixDQUZtQjs7OztXQUROO0VBQWlCLE1BQU0sU0FBTjs7a0JBQWpCOzs7QUF5T3JCLFNBQVMsV0FBVCxHQUF1QiwyQ0FBdkI7Ozs7Ozs7O2tCQzlPd0I7QUFBVCxTQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBMEM7UUFBZCxpRUFBUyxtQkFBSzs7QUFDckQsUUFBSSxVQUFVLElBQVYsRUFBZ0I7QUFDaEIsZUFBTyxHQUFQLENBRGdCO0tBQXBCO0FBR0EsV0FBTyxTQUNGLE9BREUsQ0FDTSxHQUROLEVBQ1csS0FEWCxFQUVGLE9BRkUsQ0FFTSxHQUZOLEVBRVcsTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUZYLENBQVAsQ0FKcUQ7Q0FBMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDVU07Ozs7Ozs7Ozs7O29DQW9DTCxrQkFBa0IsT0FBTztBQUNqQyxnQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLENBQW1CLFNBQW5CLEVBQThCO0FBQy9CLHVCQUNJOztzQkFBRyxXQUFVLGFBQVYsRUFBSDs7aUJBREosQ0FEK0I7YUFBbkM7QUFPQSxnQkFBSSxpQkFBaUIsSUFBakIsQ0FSNkI7QUFTakMsZ0JBQU0sZUFBZSw4QkFBZSxnQkFBZixFQUFpQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLG1CQUFoQixDQUFoRCxDQVQyQjtBQVVqQyxvQkFBUSxZQUFSO0FBQ0EscUJBQUssT0FBTCxDQURBO0FBRUEscUJBQUssY0FBTDtBQUNJLDBEQURKO0FBRUksMEJBRko7QUFGQSxxQkFLSyxNQUFMO0FBQ0kseURBREo7QUFFSSwwQkFGSjtBQUxBLHFCQVFLLFdBQUw7QUFDSSw4REFESjtBQUVJLDBCQUZKO0FBUkEscUJBV0ssZ0JBQUw7QUFDSSxrRUFESjtBQUVJLDBCQUZKO0FBWEE7QUFlSSwyQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sTUFBTSxJQUFOLENBQVcsV0FBWCxDQUF1QixPQUF2QixDQUErQixDQUEvQixDQUROO3FCQURKLENBREo7QUFkQSxhQVZpQztBQStCakMsZ0JBQU0sUUFBUTtBQUNWLHVCQUFPLEtBQVA7QUFDQSxxQkFBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYO0FBQ0wsNkJBQWEsWUFBYjthQUhFLENBL0IyQjtBQW9DakMsbUJBQ0ksb0JBQUMsY0FBRCxFQUFxQixLQUFyQixDQURKLENBcENpQzs7Ozs2Q0F3Q2hCOzs7QUFDakIsZ0JBQU0sYUFBYSxJQUFJLEdBQUosQ0FBUSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixNQUFuQixDQUEwQixHQUExQixDQUE4Qjt1QkFBUyxDQUFDLE1BQU0sbUJBQU4sRUFBMkIsS0FBNUI7YUFBVCxDQUF0QyxDQUFiLENBRFc7QUFFakIsbUJBQU8sS0FBSyxLQUFMLENBQVcsb0JBQVgsQ0FBZ0MsR0FBaEMsQ0FBb0MsVUFBQyxFQUFELEVBQUssR0FBTDt1QkFDdkM7O3NCQUFJLEtBQU0sS0FBSyxHQUFHLEVBQUgsU0FBWSxHQUFqQixFQUFWO29CQUNNLE9BQUssV0FBTCxDQUFpQixFQUFqQixFQUFxQixXQUFXLEdBQVgsQ0FBZSxHQUFHLEVBQUgsQ0FBcEMsQ0FETjs7YUFEdUMsQ0FBM0MsQ0FGaUI7Ozs7aUNBUVo7QUFDTCxtQkFDSTs7O2dCQUNJOztzQkFBSSxXQUFVLE9BQVYsRUFBSjtvQkFDSTs7MEJBQUcsV0FBVSxhQUFWLEVBQUg7d0JBQ00sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWY7cUJBRlY7aUJBREo7Z0JBTUk7QUFDSSx5Q0FBc0IsS0FBSyxLQUFMLENBQVcsbUJBQVg7QUFDdEIseUJBQU0sS0FBSyxLQUFMLENBQVcsR0FBWDtBQUNOLDBCQUFPLEtBQUssS0FBTCxDQUFXLElBQVg7aUJBSFgsQ0FOSjtnQkFXTSxLQUFLLGtCQUFMLEVBWE47YUFESixDQURLOzs7OzRCQW5GYztBQUNuQixnQkFBTSxLQUFLLE1BQU0sU0FBTixDQURRO0FBRW5CLG1CQUFPO0FBQ0gscUNBQXFCLEdBQUcsVUFBSCxDQUFjLEdBQWQsRUFBbUIsVUFBbkI7QUFDckIsc0NBQXNCLEdBQUcsT0FBSCxDQUNsQixHQUFHLEtBQUgsQ0FBUztBQUNMLDBCQUFNLEdBQUcsTUFBSCxDQUFVLFVBQVY7aUJBRFYsRUFFRyxVQUZILENBRGtCLENBSXBCLFVBSm9CO0FBS3RCLHFCQUFLLEdBQUcsS0FBSCxDQUFTO0FBQ1YscUNBQWlCLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDakIsMkJBQU8sR0FBRyxNQUFIO0FBQ1AseUJBQUssR0FBRyxLQUFILENBQVM7QUFDVixtQ0FBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO0FBQ1gsZ0NBQVEsR0FBRyxPQUFILENBQ0osR0FBRyxLQUFILENBQVM7QUFDTCxpREFBcUIsR0FBRyxNQUFILENBQVUsVUFBVjt5QkFEekIsRUFFRyxVQUZILENBREksQ0FJTixVQUpNO0FBS1IsNkNBQXFCLEdBQUcsS0FBSCxDQUFTO0FBQzFCLDJDQUFlLEdBQUcsTUFBSDtBQUNmLDZDQUFpQixHQUFHLE1BQUg7QUFDakIsMkNBQWUsR0FBRyxLQUFILENBQVM7QUFDcEIsK0NBQWUsR0FBRyxNQUFIO0FBQ2YsaURBQWlCLEdBQUcsTUFBSDs2QkFGTixDQUFmO3lCQUhpQixDQUFyQjtxQkFQQyxFQWVGLFVBZkU7aUJBSEosRUFtQkYsVUFuQkU7QUFvQkwsc0JBQU0sR0FBRyxLQUFILENBQVM7QUFDWCx5Q0FBcUIsR0FBRyxNQUFILENBQVUsVUFBVjtpQkFEbkIsRUFFSCxVQUZHO2FBM0JWLENBRm1COzs7O1dBRE47RUFBWSxNQUFNLFNBQU47O2tCQUFaOzs7QUF1R3JCLElBQUksV0FBSixHQUFrQixzQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDMUdxQjs7Ozs7Ozs7Ozs7aUNBNkNSOzs7QUFDTCxnQkFBTSxjQUFjLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBMkIsaUJBQTNCLENBQTZDLE1BQTdDLENBQ2hCO3VCQUFNLENBQUMsWUFBRCxFQUFlLGFBQWYsRUFBOEIsT0FBOUIsQ0FBc0MsR0FBRyxJQUFILENBQXRDLElBQWtELENBQWxEO2FBQU4sQ0FERSxDQUREO0FBR0wsZ0JBQU0sU0FBUyw0QkFBa0IsWUFBWSxNQUFaLENBQTNCLENBSEQ7QUFJTCxnQkFBTSxVQUFVLElBQUksR0FBSixDQUFRLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBMkIsaUJBQTNCLENBQTZDLEdBQTdDLENBQWlEO3VCQUFNLENBQUMsR0FBRyxFQUFILEVBQU8sRUFBUjthQUFOLENBQXpELENBQVYsQ0FKRDs7QUFNTCxtQkFDSTs7a0JBQUssV0FBVSxlQUFWLEVBQUw7Z0JBQ0k7O3NCQUFPLFdBQVUsZ0JBQVYsRUFBUDtvQkFDSTs7O3dCQUNJOzs7NEJBQ0k7O2tDQUFJLFdBQVUsT0FBVixFQUFrQixPQUFRLE9BQU8sYUFBUCxFQUFSLEVBQXRCO2dDQUNJOzs7b0NBQ00sb0JBQUUsc0JBQUYsQ0FETjtpQ0FESjs2QkFESjs0QkFNSTs7a0NBQUksV0FBVSxhQUFWLEVBQXdCLE9BQVEsT0FBTyxZQUFQLEVBQVIsRUFBNUI7Z0NBQ0k7OztvQ0FDTSxvQkFBRSxxQkFBRixDQUROO2lDQURKOzZCQU5KOzRCQVdNLFlBQVksR0FBWixDQUFnQjt1Q0FDZDs7c0NBQUksS0FBTSxHQUFHLEVBQUgsRUFBUSxPQUFRLE9BQU8sYUFBUCxFQUFSLEVBQWxCO29DQUNJOzs7d0NBQ00saUNBQWtCLEVBQWxCLENBRE47cUNBREo7OzZCQURjLENBWHRCO3lCQURKO3FCQURKO29CQXNCSTs7O3dCQUNNLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBcUI7bUNBQ25CO0FBQ0kscURBQXNCLE9BQXRCO0FBQ0EscUNBQU0sSUFBSSxHQUFKLENBQVEsRUFBUjtBQUNOLHNEQUF1QixXQUF2QjtBQUNBLHFDQUFNLEdBQU47QUFDQSxzQ0FBTyxPQUFLLEtBQUwsQ0FBVyxJQUFYOzZCQUxYO3lCQURtQixDQUQzQjtxQkF0Qko7aUJBREo7YUFESixDQU5LOzs7O3NDQWxCWSxNQUFNO0FBQ3ZCLGlCQUNLLFFBREwsQ0FDYyxpQkFEZCxFQUNpQyxXQURqQyxFQUM4QyxLQUQ5QyxFQUVLLFFBRkwsQ0FFYyxnQ0FGZCxFQUVnRCxXQUZoRCxFQUU2RCxLQUY3RCxFQUdLLFFBSEwsQ0FHYyxnQ0FIZCxFQUdnRCxTQUhoRCxFQUcyRCxPQUgzRCxFQUlLLFFBSkwsQ0FJYyxnQ0FKZCxFQUlnRCxRQUpoRCxFQUkwRCxtQkFKMUQsRUFLSyxRQUxMLENBS2MsMEVBTGQsRUFLMEYsV0FMMUYsRUFLdUcsS0FMdkcsRUFNSyxRQU5MLENBTWMsMEVBTmQsRUFNMEYsUUFOMUYsRUFNb0csTUFOcEcsRUFPSyxRQVBMLENBT2MscUNBUGQsRUFPcUQsU0FQckQsRUFPZ0UsV0FQaEUsRUFRSyxRQVJMLENBUWMscUNBUmQsRUFRcUQsU0FSckQsRUFRZ0UsV0FSaEUsRUFTSyxRQVRMLENBU2MscUJBVGQsRUFTcUMsWUFUckMsRUFTbUQsT0FUbkQsRUFVSyxRQVZMLENBVWMscUJBVmQsRUFVcUMsWUFWckMsRUFVbUQsTUFWbkQsRUFXSyxRQVhMLENBV2MscUJBWGQsRUFXcUMsWUFYckMsRUFXbUQsTUFYbkQsRUFZSyxRQVpMLENBWWMsa0JBWmQsRUFZa0MsT0FabEMsRUFZMkMsTUFaM0MsRUFhSyxRQWJMLENBYWMsa0JBYmQsRUFha0Msa0JBYmxDLEVBYXNELE1BYnRELEVBY0ssUUFkTCxDQWNjLGNBZGQsRUFjOEIsYUFkOUIsRUFjNkMsTUFkN0MsRUFEdUI7Ozs7NEJBMUJKO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxTQUFOLENBRFE7QUFFbkIsbUJBQU87QUFDSix1QkFBTyxHQUFHLE9BQUgsQ0FDRixHQUFHLEtBQUgsQ0FBUztBQUNMLDhCQUFVLEdBQUcsSUFBSCxDQUFRLFVBQVI7QUFDVix5QkFBSyxHQUFHLEtBQUgsQ0FBUztBQUNWLDRCQUFJLEdBQUcsTUFBSCxDQUFVLFVBQVY7QUFDSixtQ0FBVyxHQUFHLElBQUgsQ0FBUSxVQUFSO3FCQUZWLEVBR0YsVUFIRTtpQkFGVCxFQU1HLFVBTkgsQ0FERSxDQVFKLFVBUkk7QUFTTixzQkFBTSxHQUFHLEtBQUgsQ0FBUztBQUNYLHlDQUFxQixHQUFHLE1BQUgsQ0FBVSxVQUFWO0FBQ3JCLGtDQUFjLEdBQUcsTUFBSDtBQUNkLGdDQUFZLEdBQUcsS0FBSCxDQUFTO0FBQ2pCLDJDQUFtQixHQUFHLE9BQUgsQ0FDZixHQUFHLEtBQUgsQ0FBUztBQUNMLGtDQUFNLEdBQUcsTUFBSCxDQUFVLFVBQVY7eUJBRFYsRUFFRyxVQUZILENBRGUsQ0FJakIsVUFKaUI7cUJBRFgsRUFNVCxVQU5TO2lCQUhWLEVBVUgsVUFWRzthQVZWLENBRm1COzs7O1dBRE47RUFBc0IsTUFBTSxTQUFOOztrQkFBdEI7OztBQTRGckIsY0FBYyxXQUFkLEdBQTRCLGtDQUE1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR0EsSUFBSSxhQUFhLFNBQWIsVUFBYTs7Ozs7Ozs7Ozs7O3lDQUNBO0FBQ1QscUJBQUssTUFBTCxHQUFjLEVBQWQsQ0FEUzs7OztrREFHUztBQUNsQixxQkFBSyxVQUFMLEdBRGtCOzs7OzJDQUdQLEtBQUssV0FBVztBQUMzQixvQkFBSSxDQUFDLEtBQUssTUFBTCxFQUFhO0FBQ2QseUJBQUssTUFBTCxHQUFjLEVBQWQsQ0FEYztpQkFBbEI7QUFHQSxvQkFBSSxFQUFFLE9BQU8sS0FBSyxNQUFMLENBQVQsRUFBdUI7QUFDdkIseUJBQUssTUFBTCxDQUFZLEdBQVosSUFBbUIsV0FBbkIsQ0FEdUI7aUJBQTNCO0FBR0EsdUJBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFQLENBUDJCOzs7OztNQVBJO0NBQXRCOztrQkFrQkY7Ozs7Ozs7O2tCQ2xCUztBQUFULFNBQVMscUJBQVQsQ0FBK0IsV0FBL0IsRUFBNEM7O0FBQ3ZELFFBQUksWUFBWSxjQUFaLEtBQStCLEVBQS9CLEVBQW1DO0FBQ25DLGVBQ0k7OztZQUNNLFlBQVksY0FBWjtTQUZWLENBRG1DO0tBQXZDO0FBT0EsV0FBTyxZQUFZLFNBQVosQ0FBc0IsR0FBdEIsQ0FBMEIsVUFBQyxDQUFELEVBQUksR0FBSjtlQUM3Qjs7Y0FBRyxLQUFNLEdBQU4sRUFBSDtZQUNNLEVBQUUsU0FBRixHQUFjLEdBQWQsR0FBb0IsRUFBRSxVQUFGOztLQUZHLENBQWpDLENBUnVEO0NBQTVDOzs7Ozs7OztrQkNBUztBQUFULFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsRUFBMEMsbUJBQTFDLEVBQStEO0FBQzFFLFlBQVEsaUJBQWlCLElBQWpCO0FBQ1IsYUFBSyxhQUFMO0FBQ0ksb0JBQVEsbUJBQVI7QUFDQSxxQkFBSyxtQkFBTDtBQUNJLDJCQUFPLFdBQVAsQ0FESjtBQURBLHFCQUdLLHdCQUFMO0FBQ0ksMkJBQU8sZ0JBQVAsQ0FESjtBQUhBLHFCQUtLLG9CQUFMO0FBQ0ksMkJBQU8sWUFBUCxDQURKO0FBTEEscUJBT0sscUJBQUwsQ0FQQTtBQVFBLHFCQUFLLHVCQUFMO0FBQ0ksMkJBQU8sY0FBUCxDQURKO0FBUkE7QUFXSSwyQkFBTyxPQUFQLENBREo7QUFWQSxhQURKO0FBREEsYUFlSyxZQUFMO0FBQ0ksb0JBQVEsbUJBQVI7QUFDQSxxQkFBSyxxQkFBTDtBQUNJLDJCQUFPLGNBQVAsQ0FESjtBQURBO0FBSUksMkJBQU8sTUFBUCxDQURKO0FBSEEsYUFESjtBQWZBLGFBc0JLLFlBQUw7QUFDSSxtQkFBTyxNQUFQLENBREo7QUF0QkEsYUF3QkssWUFBTDtBQUNJLG1CQUFPLE1BQVAsQ0FESjtBQXhCQSxLQUQwRTtDQUEvRDs7Ozs7Ozs7QUNBZixTQUFTLGlCQUFULENBQTJCLGdCQUEzQixFQUE2QztBQUN6QyxRQUFJLFNBQVMsaUJBQWlCLEtBQWpCLENBQXVCLE1BQXZCLENBRDRCO0FBRXpDLFFBQUksaUJBQWlCLElBQWpCLEtBQTBCLFlBQTFCLEVBQXdDO0FBQ3hDLGtCQUFVLE1BQVYsQ0FEd0M7S0FBNUM7QUFHQSxXQUFPLE1BQVAsQ0FMeUM7Q0FBN0M7O2tCQVFlOzs7Ozs7Ozs7Ozs7Ozs7QUNOZixJQUFNLGdCQUFOOztrQkFFZTs7Ozs7Ozs7a0JDSlM7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBaUM7QUFDNUMsUUFBSSxVQUFVO0FBQ1YsaUJBQVM7QUFDTCx1QkFBVztBQUNQLDRCQUFZLGVBQVo7QUFDQSxtQ0FBbUIsc0JBQW5CO0FBQ0EsNkNBQTZCLGtCQUE3QjtBQUNBLGtDQUFrQixxQkFBbEI7QUFDQSw2QkFBYSxnQkFBYjtBQUNBLG1DQUFtQixvQkFBbkI7QUFDQSw0QkFBWSxjQUFaO0FBQ0EsaUNBQWlCLGVBQWpCO0FBQ0EsOEJBQWMsZUFBZDtBQUNBLGdDQUFnQixlQUFoQjtBQUNBLGdDQUFnQixtQkFBaEI7QUFDQSwwQkFBVSxnQkFBVjtBQUNBLDBCQUFVLGVBQVY7QUFDQSx1Q0FBdUIsOEJBQXZCO0FBQ0EsNkJBQWEsc0JBQWI7QUFDQSxtQ0FBbUIsOEJBQW5CO0FBQ0Esa0NBQWtCLHFDQUFsQjtBQUNBLGtDQUFrQix5QkFBbEI7QUFDQSx5Q0FBeUIsMkJBQXpCO0FBQ0EsaUNBQWlCLFlBQWpCO0FBQ0EsbUNBQW1CLGlCQUFuQjtBQUNBLDhCQUFjLHNCQUFkO2FBdEJKO1NBREo7QUEwQkEsa0JBQVU7QUFDTiwwQkFBYztBQUNWLDZCQUFhLGVBQWI7QUFDQSwwQkFBVSxnQkFBQyxDQUFEOzRDQUFxQixJQUFJLENBQUo7aUJBQXJCO2FBRmQ7QUFJQSxzQkFBVTtBQUNOLDBDQUEwQiw0REFBMUI7YUFESjtBQUdBLHVCQUFXO0FBQ1AsaUNBQWlCLG9CQUFqQjtBQUNBLGdEQUFnQywyQ0FBaEM7QUFDQSw2QkFBYSxhQUFiO0FBQ0EsaUNBQWlCLHFCQUFqQjtBQUNBLDZCQUFhLDZCQUFiO0FBQ0EsNkJBQWEsYUFBYjtBQUNBLG1DQUFtQixPQUFuQjtBQUNBLG1DQUFtQixPQUFuQjtBQUNBLGtDQUFrQixNQUFsQjtBQUNBLDZCQUFhLGVBQWI7QUFDQSw0Q0FBNEIsMkNBQTVCO0FBQ0EsaUNBQWlCLFlBQWpCO2FBWko7QUFjQSx3QkFBWTtBQUNSLGlDQUFpQixrREFBakI7QUFDQSxnREFBZ0MsOEVBQWhDO0FBQ0EsNkJBQWEsOENBQWI7QUFDQSw0Q0FBNEIsb0RBQTVCO2FBSko7QUFNQSwyQkFBZTtBQUNYLDhCQUFjLFlBQWQ7QUFDQSxnQ0FBZ0Isc0JBQWhCO0FBQ0EsK0JBQWUsWUFBZjtBQUNBLDhCQUFjLHFCQUFkO0FBQ0EsOEJBQWMsb0JBQWQ7QUFDQSxrQ0FBa0IsY0FBbEI7QUFDQSxpQ0FBaUIsYUFBakI7QUFDQSx1Q0FBdUIsdUJBQXZCO0FBQ0EscUNBQXFCLHFCQUFyQjtBQUNBLDBCQUFVLG9DQUFWO0FBQ0EsNEJBQVksc0NBQVo7QUFDQSw4QkFBYyxtQkFBZDtBQUNBLDBCQUFVLFFBQVY7QUFDQSxrQ0FBa0IsdUJBQWxCO2FBZEo7QUFnQkEsc0JBQVU7QUFDTiwrQkFBZSxjQUFmO0FBQ0Esa0NBQWtCLGNBQWxCO0FBQ0EsZ0NBQWdCLHNCQUFDLENBQUQ7dUNBQWlCO2lCQUFqQjtBQUNoQiwrQkFBZSxxQkFBQyxDQUFELEVBQUksQ0FBSjtzQ0FBbUIsYUFBUTtpQkFBM0I7QUFDZixpQ0FBaUIsZUFBakI7QUFDQSw2QkFBYSxlQUFiO0FBQ0Esc0NBQXNCLHFCQUF0QjtBQUNBLHlDQUF5Qiw2QkFBekI7YUFSSjtBQVVBLDBCQUFjO0FBQ1YsdUNBQXVCLDBCQUF2QjtBQUNBLDhCQUFjLE1BQWQ7QUFDQSxzQ0FBc0IsdUJBQXRCO0FBQ0Esc0JBQU0sSUFBTjtBQUNBLGdDQUFnQixrQkFBaEI7QUFDQSxzQ0FBc0IsbUJBQXRCO0FBQ0EsNEJBQVksS0FBWjtBQUNBLCtCQUFlLElBQWY7QUFDQSxvQ0FBb0IsSUFBcEI7QUFDQSxpQ0FBaUIsS0FBakI7YUFWSjtBQVlBLDBCQUFjO0FBQ1YsOEJBQWMsZUFBZDtBQUNBLDhCQUFjLG9CQUFDLENBQUQ7eUNBQW1CO2lCQUFuQjtBQUNkLDBCQUFVLGNBQVY7YUFISjtBQUtBLHFCQUFTO0FBQ0wseUJBQVMsUUFBVDtBQUNBLDJCQUFXLFlBQVg7QUFDQSwyQkFBVyxVQUFYO0FBQ0EsMkJBQVcsT0FBWDtBQUNBLHdCQUFRLFlBQVI7YUFMSjtTQXZFSjtBQStFQSxtQkFBVztBQUNQLHlCQUFhO0FBQ1QscUJBQUssR0FBTDtBQUNBLDBCQUFVLGdCQUFDLENBQUQ7aUNBQVc7aUJBQVg7QUFDVixzQkFBTSxJQUFOO0FBQ0EscUJBQUssR0FBTDtBQUNBLHNCQUFNLElBQU47QUFDQSxzQkFBTSxJQUFOO0FBQ0Esc0JBQU0sR0FBTjtBQUNBLHNCQUFNLEtBQU47QUFDQSxzQkFBTSxLQUFOO0FBQ0EscUJBQUssSUFBTDtBQUNBLHFCQUFLLElBQUw7QUFDQSxxQkFBSyxHQUFMO0FBQ0Esc0JBQU0sSUFBTjtBQUNBLHFCQUFLLEdBQUw7YUFkSjtBQWdCQSx1QkFBVztBQUNQLHlDQUF5Qix3QkFBekI7QUFDQSw2Q0FBNkIsMkJBQTdCO0FBQ0EsOENBQThCLGNBQTlCO2FBSEo7QUFLQSxzQkFBVTtBQUNOLDhCQUFjLGdCQUFkO0FBQ0EsOEJBQWMsWUFBZDtBQUNBLHNDQUFzQiwwQkFBdEI7QUFDQSx3QkFBUSxPQUFSO0FBQ0EsNEJBQVksY0FBWjtBQUNBLGtDQUFrQixJQUFsQjtBQUNBLHdCQUFRLHFCQUFSO0FBQ0EsNkJBQWEsZUFBYjtBQUNBLGlDQUFpQixxQkFBakI7QUFDQSwwQkFBVSxHQUFWO0FBQ0Esb0NBQW9CLE1BQXBCO0FBQ0EsdUNBQXVCLFNBQXZCO0FBQ0Esb0NBQW9CLFVBQXBCO0FBQ0EsMkJBQVcsc0JBQVg7QUFDQSx5QkFBUyxPQUFUO0FBQ0EsNkJBQWEsWUFBYjtBQUNBLDJDQUEyQixNQUEzQjtBQUNBLHVCQUFPLEtBQVA7QUFDQSwrQkFBZSxNQUFmO2FBbkJKO1NBdEJKO0FBNENBLGtCQUFVO0FBQ04sdUJBQVc7QUFDUCwwQkFBVSxXQUFWO0FBQ0EsMkJBQVcsVUFBWDtBQUNBLHlCQUFTLFNBQVQ7YUFISjtBQUtBLHNCQUFVO0FBQ04sdUJBQU8sSUFBUDtBQUNBLHNCQUFNLEtBQU47YUFGSjtBQUlBLHVCQUFXO0FBQ1AsaUNBQWlCLHVCQUFDLENBQUQsRUFBSSxJQUFKLEVBQVUsSUFBVixFQUFtQjtBQUNoQyx3QkFBSSxPQUFPLENBQVAsRUFBVTtBQUNWLDRCQUFJLHdCQUFzQixDQUF0QixDQURNO0FBRVYsNEJBQUksSUFBSixFQUFVO0FBQ04sNkNBQWUsSUFBZixDQURNO3lCQUFWO0FBR0EsK0JBQU8sTUFBUCxDQUxVO3FCQUFkO0FBT0EsMkJBQU8sSUFBQyxLQUFTLENBQVQsY0FDTyxDQURSLGtCQUVZLENBRlosQ0FSeUI7aUJBQW5CO0FBWWpCLDJCQUFXLGlCQUFDLENBQUQ7Z0RBQTBCO2lCQUExQjthQWJmO1NBVko7QUEwQkEsaUNBQXlCO0FBQ3JCLHVCQUFXO0FBQ1AsNkJBQWEsU0FBYjtBQUNBLHdCQUFRLG1DQUFSO0FBQ0EsaUNBQWlCLDBDQUFqQjtBQUNBLCtCQUFlLDJDQUFmO0FBQ0EsNkJBQWEsa0NBQWI7QUFDQSxrQ0FBa0IsaUNBQWxCO0FBQ0EsMkJBQVcsaUNBQVg7QUFDQSw4QkFBYyxvQ0FBZDthQVJKO1NBREo7QUFZQSx1QkFBZTtBQUNYLGdCQUFJLEdBQUo7QUFDQSwwQkFBYyxrQkFBZDtBQUNBLDJCQUFlLGFBQWY7QUFDQSwwQkFBYyxlQUFkO0FBQ0EsMEJBQWMsbUJBQWQ7U0FMSjtLQTVMQSxDQUR3Qzs7QUFzTTVDLFFBQU0sT0FBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQVAsQ0F0TXNDO0FBdU01QyxRQUFJLGFBQWEsT0FBYixDQXZNd0M7Ozs7OztBQXdNNUMsNkJBQW9CLDhCQUFwQixvR0FBMEI7Z0JBQWYsb0JBQWU7O0FBQ3RCLHlCQUFhLFdBQVcsS0FBWCxDQUFiLENBRHNCO0FBRXRCLGdCQUFJLE9BQU8sVUFBUCxLQUFzQixXQUF0QixFQUFtQztBQUNuQyx3QkFBUSxLQUFSLHFDQUFnRCxHQUFoRCxFQURtQztBQUVuQyx1QkFBTyxFQUFQLENBRm1DO2FBQXZDO1NBRko7Ozs7Ozs7Ozs7Ozs7O0tBeE00Qzs7QUErTTVDLFFBQUksT0FBTyxVQUFQLEtBQXNCLFVBQXRCLEVBQWtDOzBDQS9NQTs7U0ErTUE7O0FBQ2xDLGVBQU8sNEJBQWMsSUFBZCxDQUFQLENBRGtDO0tBQXRDO0FBR0EsV0FBTyxVQUFQLENBbE40QztDQUFqQzs7QUFxTmYsVUFBVSxxQkFBVixHQUFrQyxDQUM5QixPQUQ4QixFQUU5QixlQUY4QixFQUc5QixnQkFIOEIsRUFJOUIsWUFKOEIsRUFLOUIsWUFMOEIsRUFNOUIsWUFOOEIsRUFPOUIsYUFQOEIsRUFROUIsb0JBUjhCLEVBUzlCLG1CQVQ4QixDQUFsQzs7Ozs7Ozs7QUNyTkEsSUFBTSxPQUFPO0FBQ1QsbUJBQWUsQ0FDWCxhQURXLEVBRVgsWUFGVyxFQUdYLFlBSFcsRUFJWCxZQUpXLENBQWY7QUFNQSx1QkFBbUIsQ0FDZixpQkFEZSxFQUVmLGNBRmUsRUFHZixtQkFIZSxFQUlmLHdCQUplLEVBS2Ysb0JBTGUsRUFNZixxQkFOZSxFQU9mLHVCQVBlLENBQW5CO0FBU0EsMEJBQXNCLENBQ2xCLFNBRGtCLEVBRWxCLGVBRmtCLEVBR2xCLGNBSGtCLEVBSWxCLE9BSmtCLENBQXRCOztDQWhCRTs7a0JBeUJTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiZixJQUFNLFdBQVcsT0FBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQztBQUNoRCx3QkFEZ0Q7QUFFaEQsNkJBRmdEO0FBR2hELGdEQUhnRDtBQUloRCxnREFKZ0Q7QUFLaEQsZ0RBTGdEO0FBTWhELDhEQU5nRDtBQU9oRCx1Q0FQZ0Q7QUFRaEQsZ0RBUmdEO0FBU2hELHFEQVRnRDtDQUFuQyxDQUFYOztBQVlOLHdCQUFNLFFBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkgPT4ge1xuICAgIHJldHVybiBzd2FsKHtcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxuICAgICAgICBjbG9zZU9uQ29uZmlybTogY2xvc2Vfb25fY29uZmlybSxcbiAgICB9LCBhY3Rpb24pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZUNsYXNzTmFtZShkYXRhKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAgIC5maWx0ZXIoY24gPT4gZGF0YVtjbl0pXG4gICAgICAgIC5qb2luKFwiIFwiKTtcbn1cbiIsImltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5pbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcIi4vb25Ub3VjaE9yQ2xpY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFBULmJvb2wsXG4gICAgICAgICAgICB2YWx1ZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTWludXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XCJkZWx0YVwiOiAtMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLnZhbHVlIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlUGx1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHtcImRlbHRhXCI6IDF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy52YWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwiSW50ZWdlcklucHV0XCI6IHRydWUsXG4gICAgICAgICAgICBcInJlYWQtb25seVwiOiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVNaW51cykgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlUGx1cykgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbkludGVnZXJJbnB1dC5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX0ludGVnZXJJbnB1dFwiO1xuIiwiaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcIi4vU2VsZWN0b3JJbnB1dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOdW1iZXJTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXg6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWluOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHN0ZXA6IFBULm51bWJlcixcbiAgICAgICAgICAgIGRlY2ltYWxTaXplOiBQVC5udW1iZXIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIGRlY2ltYWxTaXplOiAwLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG1ha2VDaG9pY2VzKG1pbiwgbWF4LCBzdGVwLCBkZWNpbWFsX3NpemUpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSA9IG1pbjsgdmFsdWUgPD0gbWF4OyB2YWx1ZSArPSBzdGVwKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdmFsdWUudG9GaXhlZChkZWNpbWFsX3NpemUpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW051bWJlcih0ZXh0KSwgdGV4dF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwLCBkZWNpbWFsU2l6ZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLm1ha2VDaG9pY2VzKG1pbiwgbWF4LCBzdGVwLCBkZWNpbWFsU2l6ZSkgfVxuICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuTnVtYmVyU2VsZWN0b3JJbnB1dC5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX051bWJlclNlbGVjdG9ySW5wdXRcIjtcbiIsImltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwiLi4vb25Ub3VjaE9yQ2xpY2tcIjtcblxuaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRleHQ6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBvbkNsaWNrOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMudmFsdWUpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xuICAgICAgICAgICAgXCJ0YnRuXCI6IHRydWUsXG4gICAgICAgICAgICBcInNjb3JlLWJ0blwiOiB0cnVlLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdGhpcy5wcm9wcy5hY3RpdmUsXG4gICAgICAgICAgICBcInJlYWQtb25seVwiOiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfVxuICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVDbGljaykgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50ZXh0IH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSXRlbS5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX1NlbGVjdG9ySW5wdXRfSXRlbVwiO1xuIiwiaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5cbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hvaWNlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICBQVC5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLFxuICAgICAgICAgICAgcm93U2l6ZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgc3R5bGU6IFBULm9uZU9mKFtcImdyaWRcIiwgXCJvbmUtbGluZVwiLCBcInR3by1saW5lc1wiXSksXG4gICAgICAgICAgICB2YWx1ZTogUFQub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgcm93U2l6ZTogMTAsXG4gICAgICAgICAgICBzdHlsZTogXCJvbmUtbGluZVwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dTaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xuICAgICAgICAgICAgXCJTZWxlY3RvcklucHV0XCI6IHRydWUsXG4gICAgICAgICAgICBcIm9uZS1yb3dcIjogdGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIixcbiAgICAgICAgICAgIFwidHdvLXJvd3NcIjogdGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJ0d28tbGluZXNcIixcbiAgICAgICAgICAgIFwic2VsZWN0ZWRcIjogdGhpcy5wcm9wcy52YWx1ZSAhPT0gbnVsbCxcbiAgICAgICAgICAgIFtgbi0ke3RoaXMuZ2V0QnV0dG9uc0NvdW50KCl9YF06IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcHMuY2hvaWNlcy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiZcbiAgICAgICAgICAgICAgICBpZHggIT09IDAgJiZcbiAgICAgICAgICAgICAgICBpZHggJSB0aGlzLnByb3BzLnJvd1NpemUgPT09IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICA8YnIga2V5PXsgYGJyJHtpZHh9YCB9IC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgdGV4dF0gPSB0aGlzLnByb3BzLmNob2ljZXNbaWR4XTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17IHZhbHVlID09PSB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dD17IHRleHQgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMucHJvcHMub25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5nZXRDbGFzc05hbWUoKSB9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TZWxlY3RvcklucHV0LmRpc3BsYXlOYW1lID0gXCJ0YWJsZXRfdWlfU2VsZWN0b3JJbnB1dFwiO1xuIiwiaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbmU6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGRvbmVUZXh0OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkFjdGl2YXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGluID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZyZWUoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS50b3VjaCAmJiAhdGhpcy5wcm9wcy5kb25lICYmICF0aGlzLnN0YXRlLmZpbmlzaGVkO1xuICAgIH1cblxuICAgIGdldE91dGVyVGV4dE9wYWNpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCgxMDAgLSB0aGlzLnN0YXRlLnBvc2l0aW9uLCAwKSwgMTAwKTtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAvIDEwMCkudG9GaXhlZCgzKTtcbiAgICB9XG4gICAgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIGxldCByZXMgPSAwO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmVzICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBnZXRUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRTbGlkZXJQb3MoZXZlbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0VG91Y2goZXZlbnQpIC0gdGhpcy5waW47XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCAyMDApO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2lzaW9uOiAyMDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xuICAgIH1cbiAgICBoYW5kbGVUb3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVUb3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlVG91Y2hFbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucG9zaXRpb24gPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVGV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImRvbmUtdGV4dFwiIH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7IGNvbG9yOiBcInJnYigxMDAsMTAwLDEwMClcIiB9IH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgbWFrZUNsYXNzTmFtZSh7IFwic2xpZGUtdGV4dFwiIDogdHJ1ZSwgXCJmcmVlXCI6IHRoaXMuaXNGcmVlKCkgfSkgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHsgY29sb3I6IGByZ2JhKDEwMCwxMDAsMTAwLCR7dGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCl9KWAgfSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2xpZGVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU2xpZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBtYWtlQ2xhc3NOYW1lKHsgXCJpbm5lclwiOiB0cnVlLCBcImZyZWVcIjogdGhpcy5pc0ZyZWUoKSB9KSB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXsgeyBsZWZ0OiAodGhpcy5wcm9wcy5kb25lIHx8IHRoaXMuc3RhdGUuZmluaXNoZWQpID8gXCIyMDBweFwiIDogYCR7dGhpcy5zdGF0ZS5wb3NpdGlvbn1weGAgfSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsaWNrIH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMuaGFuZGxlVG91Y2hFbmQgfVxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMuaGFuZGxlVG91Y2hNb3ZlIH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0IH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKGklxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUZXh0KCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TbGlkZXIuZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9TbGlkZXJcIjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uVG91Y2hFbmRPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICBsZXQgZGlzdGFuY2UgPSAwO1xuICAgIGxldCBsYXRlc3RfcG9zID0gWzAsIDBdO1xuICAgIGxldCBmaXJlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBfaGFuZGxlcigpO1xuICAgIH1cbiAgICBsZXQgZGlzY2FyZCA9ICgpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICB9XG4gICAgbGV0IG1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnRfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgICAgICBsZXQgc3FyID0gKHgpID0+IHggKiB4O1xuICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnNxcnQoc3FyKGN1cnJlbnRfcG9zWzBdIC0gbGF0ZXN0X3Bvc1swXSkgKyBzcXIoY3VycmVudF9wb3NbMV0gLSBsYXRlc3RfcG9zWzFdKSk7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBjdXJyZW50X3BvcztcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMjApIHtcbiAgICAgICAgICAgIGRpc2NhcmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICBkaXN0YW5jZSA9IDA7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogc3RhcnQsXG4gICAgICAgIG9uVG91Y2hFbmQ6IGZpcmUsXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBtb3ZlLFxuICAgICAgICBvblRvdWNoQ2FuY2VsOiBkaXNjYXJkLFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVyLFxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXG4gICAgICAgIG9uQ2xpY2s6IGYsXG4gICAgfVxufVxuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb25zOiBQVC5hcnJheU9mKFBULm51bWJlciksXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLnNsaWNlKCk7IC8vIGNsb25lXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgICAgICAgICBpZiAoa2V5WzBdID09PSBcIkFcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNfdmFsID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIHJlZHVjdGlvbnNbcGFyc2VJbnQoa2V5LnNsaWNlKDEpKV0gPSBzX3ZhbCA9PT0gXCJcIiA/IC0xIDogcGFyc2VJbnQoc192YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcmVkdWN0aW9uczogcmVkdWN0aW9ucyxcbiAgICAgICAgICAgIG1pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEubWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMubWFwKChyZWQsIGlkeCkgPT4gKHtcbiAgICAgICAgICAgIGtleTogYEEke2lkeH1gLFxuICAgICAgICAgICAgbGFiZWw6IGBBJHtpZHggKyAxfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9uc1tpZHhdID09PSBudWxsXG4gICAgICAgICAgICAgICAgPyBcIlwiXG4gICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9uc1tpZHhdLnRvU3RyaW5nKCksXG4gICAgICAgIH0pKTtcbiAgICAgICAgZmllbGRzLnB1c2godGhpcy5tYWtlRmllbGQoXCJtaXN0YWtlc1wiLCBcIkZEXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCB7IG1heDogMTAwIH0pKSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgZmllbGRzIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfRGFuY2VTY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybWF0aW9uQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb25maXJtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiY29uZmlybWF0aW9uLWJ1dHRvblwiO1xuICAgICAgICByZXN1bHQgKz0gdGhpcy5wcm9wcy5jb25maXJtZWQgPyBcIiBjb25maXJtZWRcIiA6IFwiIG5vdC1jb25maXJtZWRcIjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnByb3BzLm9uQ29uZmlybWF0aW9uVG9nZ2xlIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY29uZmlybWVkXG4gICAgICAgICAgICAgICAgICAgID8gXyhcImFkbWluLmJ1dHRvbnMudW5jb25maXJtX3Njb3JlXCIpXG4gICAgICAgICAgICAgICAgICAgIDogXyhcImFkbWluLmJ1dHRvbnMuY29uZmlybV9zY29yZVwiKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNvbmZpcm1hdGlvbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfQ29uZmlybWF0aW9uQnV0dG9uXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZUhhbHZlZFNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmd19tYW46ICAgICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBkYXRhW1wiZndfd29tYW5cIl0gICAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmZ3X3dvbWFuKSxcbiAgICAgICAgICAgIGZ3X21hbjogICAgICAgICBkYXRhW1wiZndfbWFuXCJdICAgICAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmZ3X21hbiksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgZGF0YVtcImRhbmNlX2ZpZ3NcIl0gID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBkYXRhW1wiY29tcG9zaXRpb25cIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmNvbXBvc2l0aW9uKSxcbiAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBwYXJzZUludChkYXRhLnNtYWxsX21pc3Rha2VzKSxcbiAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBwYXJzZUludChkYXRhLmJpZ19taXN0YWtlcyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImZ3X3dvbWFuXCIsICAgICAgIFwiRldcIiwgZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJmd19tYW5cIiwgICAgICAgICBcIkZNXCIsIGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfZmlnc1wiLCAgICAgXCJERlwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMi41LCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImNvbXBvc2l0aW9uXCIsICAgIFwiQ1wiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsICAgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJzbWFsbF9taXN0YWtlc1wiLCBcIlNNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiYmlnX21pc3Rha2VzXCIsICAgXCJCTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EYW5jZUhhbHZlZFNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9EYW5jZUhhbHZlZFNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmd19tYW46ICAgICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBkYXRhW1wiZndfd29tYW5cIl0gICAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5md193b21hbiksXG4gICAgICAgICAgICBmd19tYW46ICAgICAgICAgZGF0YVtcImZ3X21hblwiXSAgICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuZndfbWFuKSxcbiAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBkYXRhW1wiZGFuY2VfZmlnc1wiXSAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBkYXRhW1wiY29tcG9zaXRpb25cIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5jb21wb3NpdGlvbiksXG4gICAgICAgICAgICBzbWFsbF9taXN0YWtlczogcGFyc2VJbnQoZGF0YS5zbWFsbF9taXN0YWtlcyksXG4gICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5iaWdfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJmd193b21hblwiLCAgICAgICBcIkZXXCIsIGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZndfbWFuXCIsICAgICAgICAgXCJGTVwiLCBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIikpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX2ZpZ3NcIiwgICAgIFwiREZcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImNvbXBvc2l0aW9uXCIsICAgIFwiQ1wiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMjAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInNtYWxsX21pc3Rha2VzXCIsIFwiU01cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJiaWdfbWlzdGFrZXNcIiwgICBcIkJNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRhbmNlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0RhbmNlU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdGlvblNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV90ZWNoOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgYWNyb2JhdGljczogICAgIGRhdGFbXCJhY3JvYmF0aWNzXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5hY3JvYmF0aWNzKSxcbiAgICAgICAgICAgIGRhbmNlX3RlY2g6ICAgICBkYXRhW1wiZGFuY2VfdGVjaFwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfdGVjaCksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgZGF0YVtcImRhbmNlX2ZpZ3NcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmRhbmNlX2ZpZ3MpLFxuICAgICAgICAgICAgaW1wcmVzc2lvbjogICAgIGRhdGFbXCJpbXByZXNzaW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5pbXByZXNzaW9uKSxcbiAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBwYXJzZUludChkYXRhLmJpZ19taXN0YWtlcyksXG4gICAgICAgICAgICBzbWFsbF9taXN0YWtlczogcGFyc2VJbnQoZGF0YS5zbWFsbF9taXN0YWtlcyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImFjcm9iYXRpY3NcIiwgICAgIFwiQVwiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfdGVjaFwiLCAgICAgXCJEVFwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV9maWdzXCIsICAgICBcIkRGXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImltcHJlc3Npb25cIiwgICAgIFwiSVwiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwic21hbGxfbWlzdGFrZXNcIiwgXCJTTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImJpZ19taXN0YWtlc1wiLCAgIFwiQk1cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0Zvcm1hdGlvblNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV90ZWNoOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXByZXNzaW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGRhbmNlX3RlY2g6IGRhdGFbXCJkYW5jZV90ZWNoXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV90ZWNoKSxcbiAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IGRhdGFbXCJkYW5jZV9maWdzXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGltcHJlc3Npb246IGRhdGFbXCJpbXByZXNzaW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5pbXByZXNzaW9uKSxcbiAgICAgICAgICAgIG1pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEuc21hbGxfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV90ZWNoXCIsIFwiRFRcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfZmlnc1wiLCBcIkRGXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImltcHJlc3Npb25cIiwgXCJJXCIsICBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJtaXN0YWtlc1wiLCAgIFwiTVwiLCAgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0Zvcm1hdGlvblNjb3JlXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWVsZDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBrZXk6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgIFBULmFycmF5T2YoUFQuc3RyaW5nLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5maWVsZC5rZXksIGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NvcmUtdmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFkLW9ubHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5maWVsZC5vcHRpb25zLmZpbmQobyA9PiBvWzBdID09PSB0aGlzLnByb3BzLnZhbHVlKVsxXSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY29yZS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZmllbGQub3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgbGFiZWxdID0gb3B0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17IHZhbHVlIH0gdmFsdWU9eyB2YWx1ZSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pIH1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjb3JlLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5maWVsZC5sYWJlbCB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclZhbHVlKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5JdGVtLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9HZW5lcmFsRWRpdG9yX0l0ZW1cIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhbEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmllbGRzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuYXJyYXlPZihQVC5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIGxldCBpbml0aWFsX3ZhbHVlcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5wcm9wcy5maWVsZHMpIHtcbiAgICAgICAgICAgIGluaXRpYWxfdmFsdWVzW2Yua2V5XSA9IGYuZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZXM6IGluaXRpYWxfdmFsdWVzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLnZhbHVlcyk7XG4gICAgICAgIHZhbHVlc1trZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZXMgfSk7XG4gICAgfVxuICAgIGhhbmRsZURpc2NhcmRDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRpc2NhcmQoKTtcbiAgICB9XG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHRoaXMuc3RhdGUudmFsdWVzKTtcbiAgICB9XG5cbiAgICByZW5kZXJCdXR0b25zKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlRGlzY2FyZENsaWNrIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwuYnV0dG9ucy5jbG9zZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdWJtaXQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwuYnV0dG9ucy5zdWJtaXRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGlzY2FyZC1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlRGlzY2FyZENsaWNrIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5idXR0b25zLmRpc2NhcmRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2NvcmUtZWRpdG9yXCJcbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmZpZWxkcy5tYXAoKGYsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ9eyBmIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBmLmtleSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMuc3RhdGUudmFsdWVzW2Yua2V5XSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9ucygpIH1cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkdlbmVyYWxFZGl0b3IuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0dlbmVyYWxFZGl0b3JcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkSnVkZ2VGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5hbHR5OiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0dG91cjogUFQuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcGVuYWx0eTogIHBhcnNlSW50KGRhdGEucGVuYWx0eSksXG4gICAgICAgICAgICBuZXh0dG91cjogZGF0YS5uZXh0dG91ciA9PT0gXCJ0cnVlXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInBlbmFsdHlcIiwgXCJQXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIjBcIiwgXCJPS1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi01XCIsIFwiLTVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItMTVcIiwgXCItMTVcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcIm5leHR0b3VyXCIsIFwiTlRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiZmFsc2VcIiwgXCJOb1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcInRydWVcIiwgIFwiWWVzXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0hlYWRKdWRnZUZvcm1hdGlvblNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZEp1ZGdlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHRvdXI6IFBULmJvb2wsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBlbmFsdHk6ICBwYXJzZUludChkYXRhLnBlbmFsdHkpLFxuICAgICAgICAgICAgbmV4dHRvdXI6IGRhdGEubmV4dHRvdXIgPT09IFwidHJ1ZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwZW5hbHR5XCIsIFwiUFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCIwXCIsIFwiT0tcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItM1wiLCBcIi0zXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTMwXCIsIFwiLTMwXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTEwMFwiLCBcIi0xMDBcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcIm5leHR0b3VyXCIsIFwiTlRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiZmFsc2VcIiwgXCJOb1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcInRydWVcIiwgIFwiWWVzXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSGVhZEp1ZGdlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0hlYWRKdWRnZVNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGlmaWVkU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBvaW50czogZGF0YVtcInBvaW50c1wiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLnBvaW50cyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInBvaW50c1wiLCBcIlNcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1pbjogMSwgbWF4OiA0MCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNpbXBsaWZpZWRTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfU2ltcGxpZmllZFNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNoSnVkZ2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdW1wX3N0ZXBzOiAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmdfdmlvbGF0aW9uOiBQVC5ib29sLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBqdW1wX3N0ZXBzOiAgICAgICBwYXJzZUludChkYXRhLmp1bXBfc3RlcHMpLFxuICAgICAgICAgICAgdGltaW5nX3Zpb2xhdGlvbjogZGF0YS50aW1pbmdfdmlvbGF0aW9uID09PSBcIlwiID8gbnVsbCA6IGRhdGEudGltaW5nX3Zpb2xhdGlvbiA9PT0gXCJ0cnVlXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImp1bXBfc3RlcHNcIiwgXCJKU1wiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwidGltaW5nX3Zpb2xhdGlvblwiLCBcIlRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiXCIsICAgICAgXCI/XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiZmFsc2VcIiwgXCLinJNcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJ0cnVlXCIsICBcIuKcl1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuVGVjaEp1ZGdlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX1RlY2hKdWRnZVNjb3JlXCI7XG4iLCJmdW5jdGlvbiBnZW5TY2FsZSh0eXBlLCB1c2VyX3BhcmFtcykge1xuICAgIGNvbnN0IG9wdGlvbmFsID0gdHlwZVswXSA9PT0gXCI/XCI7XG4gICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgIHR5cGUgPSB0eXBlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInJlZHVjdGlvblwiOlxuICAgICAgICByZXN1bHQgPSBbMTAwLCA3NSwgNTAsIDI1LCAxMCwgNSwgMF0ubWFwKFxuICAgICAgICAgICAgcyA9PiBbcy50b1N0cmluZygpLCBgLSR7c30lYF1cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm51bWJlcnNcIjpcbiAgICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgfSwgdXNlcl9wYXJhbXMpO1xuICAgICAgICBjb25zdCBmcmFjdGlvbl9zaXplID0gTWF0aC5hYnMocGFyYW1zLnN0ZXAgLSBNYXRoLnJvdW5kKHBhcmFtcy5zdGVwKSkgPCAxZS01ID8gMCA6IDE7XG4gICAgICAgIGZvciAobGV0IHNjb3JlID0gcGFyYW1zLm1pbjsgc2NvcmUgPCAocGFyYW1zLm1heCArIDFlLTUpOyBzY29yZSArPSBwYXJhbXMuc3RlcCkge1xuICAgICAgICAgICAgY29uc3Qgc3RyID0gc2NvcmUudG9GaXhlZChmcmFjdGlvbl9zaXplKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtzdHIsIHN0cl0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd24gc2NhbGUgdHlwZTogJHt0eXBlfWApO1xuICAgIH1cbiAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgcmVzdWx0ID0gW1tcIlwiLCBcIuKAlFwiXV0uY29uY2F0KHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlblNjYWxlO1xuIiwiaW1wb3J0IGdldFNjb3JpbmdUeXBlIGZyb20gXCJjb21tb24vZ2V0U2NvcmluZ1R5cGVcIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiLi9Db25maXJtYXRpb25CdXR0b25cIjtcbmltcG9ydCBBY3JvU2NvcmUgZnJvbSBcIi4vQWNyb1Njb3JlXCI7XG5pbXBvcnQgRGFuY2VTY29yZSBmcm9tIFwiLi9EYW5jZVNjb3JlXCI7XG5pbXBvcnQgRGFuY2VIYWx2ZWRTY29yZSBmcm9tIFwiLi9EYW5jZUhhbHZlZFNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uU2NvcmUgZnJvbSBcIi4vRm9ybWF0aW9uU2NvcmVcIjtcbmltcG9ydCBGb3JtYXRpb25BY3JvU2NvcmUgZnJvbSBcIi4vRm9ybWF0aW9uQWNyb1Njb3JlXCI7XG5pbXBvcnQgU2ltcGxpZmllZFNjb3JlIGZyb20gXCIuL1NpbXBsaWZpZWRTY29yZVwiO1xuaW1wb3J0IEhlYWRKdWRnZVNjb3JlIGZyb20gXCIuL0hlYWRKdWRnZVNjb3JlXCI7XG5pbXBvcnQgSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUgZnJvbSBcIi4vSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmVcIjtcbmltcG9ydCBUZWNoSnVkZ2VTY29yZSBmcm9tIFwiLi9UZWNoSnVkZ2VTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmU6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlckJvZHkoc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHNjb3JpbmdfdHlwZSA9PT0gXCJoZWFkXCIgJiZcbiAgICAgICAgICAgIFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgICAgc2NvcmluZ190eXBlID0gXCJoZWFkX2Zvcm1hdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjb3JlX3Byb3BzID0ge1xuICAgICAgICAgICAgc2NvcmU6ICAgICB0aGlzLnByb3BzLnNjb3JlLFxuICAgICAgICAgICAgcmVhZE9ubHk6ICB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgICAgICAgb25TdWJtaXQ6ICB0aGlzLnByb3BzLm9uU3VibWl0LFxuICAgICAgICAgICAgb25EaXNjYXJkOiB0aGlzLnByb3BzLm9uRGlzY2FyZCxcbiAgICAgICAgfTtcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3R5cGUpIHtcbiAgICAgICAgY2FzZSBcImFjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEFjcm9TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJkYW5jZVwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RGFuY2VTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJkYW5jZV9oYWx2ZWRcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPERhbmNlSGFsdmVkU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxGb3JtYXRpb25TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25fYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Rm9ybWF0aW9uQWNyb1Njb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcInNpbXBsaWZpZWRcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFNpbXBsaWZpZWRTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJoZWFkXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxIZWFkSnVkZ2VTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJoZWFkX2Zvcm1hdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwidGVjaFwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VGVjaEp1ZGdlU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93biBzY29yaW5nIHR5cGU6ICR7c2NvcmluZ190eXBlfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckNvbmZpcm1hdGlvbkJ1dHRvbihzY29yaW5nX3R5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkgfHwgc2NvcmluZ190eXBlID09PSBcImhlYWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb25maXJtYXRpb25CdXR0b25cbiAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnByb3BzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgb25Db25maXJtYXRpb25Ub2dnbGU9eyB0aGlzLnByb3BzLm9uQ29uZmlybWF0aW9uVG9nZ2xlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBZG1pblNjb3JlSW5wdXRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keShzY29yaW5nX3R5cGUpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQ29uZmlybWF0aW9uQnV0dG9uKHNjb3JpbmdfdHlwZSkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5FZGl0b3IuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yXCI7XG4iLCJpbXBvcnQgRWRpdG9yIGZyb20gXCIuL0VkaXRvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaW5TY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGVkaXRpbmc6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmVkaXRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2Uucm9sZSA9PT0gXCJoZWFkX2p1ZGdlXCIgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5uZXh0dG91clxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYFske3RoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpfV1gIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5yb2xlID09PSBcInRlY2hfanVkZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHZfc3RyID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb24gPT09IG51bGxcclxuICAgICAgICAgICAgICAgICAgICA/IFwiP1wiIDogdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIuKcl1wiIDogXCLinJNcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYCR7dGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmp1bXBfc3RlcHN9ICR7dHZfc3RyfWAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8RWRpdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZT17IHRoaXMucHJvcHMub25Db25maXJtYXRpb25Ub2dnbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cclxuICAgICAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMucHJvcHMub25TdWJtaXQgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkFkbWluU2NvcmVJbnB1dC5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dFwiO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvYWNoZXM6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3J0c21lbjogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcl9vZl9iaXJ0aDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHViOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHk6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1Eb2N4KGRvY3gpIHtcbiAgICAgICAgZG9jeFxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdXItbmFtZVwiLCBcImJhY2tncm91bmRcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJwYWRkaW5nXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNwb3J0c21lblwiLCBcIndpZHRoXCIsIFwiMTAwJVwiKTtcbiAgICB9XG5cbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGNvbnN0IG5lZWRfcmVuZGVyID1cbiAgICAgICAgICAgIHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fFxuICAgICAgICAgICAgcHJldl9yb3cudG91ci5pZCAhPT0gbmV4dF9yb3cudG91ci5pZDtcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgSCR7bmV4dF9yb3cucnVuLmlkfWAgfT5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidG91ci1uYW1lXCIgY29sU3Bhbj1cIjZcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmV4dF9yb3cudG91ci5uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSb3cocm93KSB7XG4gICAgICAgIGxldCBwID0gcm93LnJ1bi5wYXJ0aWNpcGFudDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgUiR7cm93LnJ1bi5pZH1gIH0+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3cucGxhY2UgPT09IG51bGwgPyBcIlwiIDogcm93LnBsYWNlIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5udW1iZXIgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zNlwiIGNvbFNwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzcG9ydHNtZW5cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuZm9ybWF0aW9uX25hbWUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY29sU3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5mb3JtYXRpb25fbmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy03NVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBgJHtzLmxhc3RfbmFtZX0gJHtzLmZpcnN0X25hbWV9YCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLnN1YnN0aXR1dGUgPyA8aT4gKHsgXyhcInJlc3VsdHMubGFiZWxzLnN1YlwiKSB9Lik8L2k+IDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcy55ZWFyX29mX2JpcnRoIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI0IGNsdWJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuY2x1Yi5uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY29hY2hlc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5jb2FjaGVzLnNwbGl0KFwiLFwiKS5tYXAoYyA9PiBbYy50cmltKCksIDxiciBrZXk9XCJYXCIgLz5dKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBjb25zdCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgLSAxXSwgdGFibGVbaV0pO1xuICAgICAgICAgICAgaWYgKGhlYWRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGhlYWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRGlzY2lwbGluZVJlc3VsdHNUYWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jbHViXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jb2FjaGVzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EaXNjaXBsaW5lUmVzdWx0c1RhYmxlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfRGlzY2lwbGluZVJlc3VsdHNUYWJsZVwiO1xuIiwiZXhwb3J0IGxldCBBcGkgPSBudWxsO1xuZXhwb3J0IGxldCBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBudWxsO1xuZXhwb3J0IGxldCBzdG9yYWdlID0gbnVsbDtcbmV4cG9ydCBsZXQgVG91clJlc3VsdHNMb2FkZXIgPSBudWxsO1xuZXhwb3J0IGxldCBEaXNjaXBsaW5lUmVzdWx0c0xvYWRlciA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cChkYXRhKSB7XG4gICAgQXBpICAgICAgICAgICAgICAgICAgICAgID0gZGF0YS5BcGk7XG4gICAgbWVzc2FnZV9kaXNwYXRjaGVyICAgICAgID0gZGF0YS5tZXNzYWdlX2Rpc3BhdGNoZXI7XG4gICAgc3RvcmFnZSAgICAgICAgICAgICAgICAgID0gZGF0YS5zdG9yYWdlO1xuICAgIFRvdXJSZXN1bHRzTG9hZGVyICAgICAgICA9IGRhdGEuVG91clJlc3VsdHNMb2FkZXI7XG4gICAgRGlzY2lwbGluZVJlc3VsdHNMb2FkZXIgID0gZGF0YS5EaXNjaXBsaW5lUmVzdWx0c0xvYWRlcjtcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWNyb0lkeDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJlZHVjdGlvbjogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25BY3JvUmVkdWN0aW9uVXBkYXRlKHRoaXMucHJvcHMuYWNyb0lkeCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKFwidGFibGV0LmFjcm9fanVkZ2UuYWNyb19uXCIsIHRoaXMucHJvcHMuYWNyb0lkeCkgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5yZWR1Y3Rpb24gfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yZWR1Y3Rpb25zLm1hcCgocmVkdWN0aW9uLCBhY3JvX2lkeCkgPT5cclxuICAgICAgICAgICAgICAgICAgICA8RWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBhY3JvX2lkeCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZHVjdGlvbj17IHJlZHVjdGlvbiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjcm9JZHg9eyBhY3JvX2lkeCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZT17IHRoaXMucHJvcHMub25BY3JvUmVkdWN0aW9uVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwibWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmFjcm9fanVkZ2UuZmFsbF9kb3duXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEVsZW1lbnRzIGZyb20gXCIuL0VsZW1lbnRzXCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBoYW5kbGVBY3JvUmVkdWN0aW9uVXBkYXRlID0gKGFjcm9faWR4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGxldCByZWR1Y3Rpb25zID0gdGhpcy5wcm9wcy5zY29yZURhdGEucmVkdWN0aW9ucy5tYXAoKCkgPT4gbnVsbCk7XHJcbiAgICAgICAgcmVkdWN0aW9uc1thY3JvX2lkeF0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJyZWR1Y3Rpb25zXCIsIHJlZHVjdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb25zPXsgdGhpcy5wcm9wcy5zY29yZURhdGEucmVkdWN0aW9ucyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlPXsgdGhpcy5oYW5kbGVBY3JvUmVkdWN0aW9uVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICBtaXN0YWtlcz17IHRoaXMucHJvcHMuc2NvcmVEYXRhLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxMYXlvdXQgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxMYXlvdXRcIjtcclxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNyb2JhdGljc0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxMYXlvdXRcclxuICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgU2NvcmluZ0xheW91dCB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XHJcblxyXG5pbXBvcnQgU2xpZGVyIGZyb20gXCJ0YWJsZXRfdWkvU2xpZGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtYXRpb25CdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuQ29uZmlybTogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBjb25maXJtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25Db25maXJtOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYW5Db25maXJtOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xyXG4gICAgICAgICAgICBcImNvbmZpcm1cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJoaWRkZW5cIjogIXRoaXMucHJvcHMuY2FuQ29uZmlybSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfT5cclxuICAgICAgICAgICAgICAgIDxTbGlkZXJcclxuICAgICAgICAgICAgICAgICAgICBkb25lPXsgdGhpcy5wcm9wcy5jb25maXJtZWQgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlVGV4dD17IF8oXCJ0YWJsZXQuZ2xvYmFsLmNvbmZpcm1fc2NvcmVcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRvbmVUZXh0PXsgXyhcInRhYmxldC5nbG9iYWwuY29uZmlybWVkXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkFjdGl2YXRlPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm0gfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEludGVnZXJJbnB1dCBmcm9tIFwidGFibGV0X3VpL0ludGVnZXJJbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmVEYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTbWFsbE1pc3Rha2VzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwic21hbGxfbWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlQmlnTWlzdGFrZXNDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJiaWdfbWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtaXN0YWtlcyBmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLnNtYWxsX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5zbWFsbF9taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVTbWFsbE1pc3Rha2VzQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD48dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5iaWdfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLmJpZ19taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVCaWdNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlUGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyLCB2YWx1ZSwgc2NhbGUsIG9uU2NvcmVVcGRhdGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBTY29yZVBhcnQgZnJvbSBcIi4vU2NvcmVQYXJ0XCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJQYXJ0KGNvZGUsIHNjYWxlLCBhZGRpdGlvbmFsX3Byb3BzPXt9KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFNjb3JlUGFydFxyXG4gICAgICAgICAgICAgICAgY29kZT17IGNvZGUgfVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhgdGFibGV0LmRhbmNlX2p1ZGdlLiR7Y29kZX1gKSB9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhW2NvZGVdIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgey4uLmFkZGl0aW9uYWxfcHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd193b21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImZ3X21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTIuNSB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImNvbXBvc2l0aW9uXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgdGhpcy5wcm9wcy5zY29yZURhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxMYXlvdXQgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxMYXlvdXRcIjtcclxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2luZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxMYXlvdXRcclxuICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgU2NvcmluZ0xheW91dCB9XHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZVBhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5jb2RlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsgLi4uYWRkaXRpb25hbF9wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd193b21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImZ3X21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJpbnRlZ2VyXCIsIHsgbWluOiAwLCBtYXg6IDI1IH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiY29tcG9zaXRpb25cIiwgXCJpbnRlZ2VyXCIsIHsgbWluOiAwLCBtYXg6IDIwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgdGhpcy5wcm9wcy5zY29yZURhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaE9yQ2xpY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBvbkNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5ta2V5KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5wcm9wcy5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25DbGljaykgfT5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxhYmVsIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vdGVySXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgQnV0dG9uIGZyb20gXCIuL0J1dHRvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb290ZXIocHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgICAgeyBSZWFjdC5DaGlsZHJlbi5tYXAocHJvcHMuY2hpbGRyZW4sIChidG4pID0+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBidG4ucHJvcHMubWtleSB9XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17IHByb3BzLnZhbHVlID09PSBidG4ucHJvcHMubWtleSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyBwcm9wcy5vbkNoYW5nZSB9XG4gICAgICAgICAgICAgICAgICAgIHsgLi4uYnRuLnByb3BzIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9mb290ZXI+XG4gICAgKVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlRGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInNtYWxsX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGhhbmRsZUJpZ01pc3Rha2VzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwiYmlnX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1pc3Rha2VzIGZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9zbWFsbF9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEuc21hbGxfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+PHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9iaWdfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLmJpZ19taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVCaWdNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlUGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgb25DaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMucHJvcHMuY29kZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyLCB2YWx1ZSwgc2NhbGUsIG9uU2NvcmVVcGRhdGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICB7Li4ub3RoZXJfcHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiYWNyb2JhdGljc1wiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX3RlY2hcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiaW1wcmVzc2lvblwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlRGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJtaXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWlzdGFrZXNcIj5cclxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEubWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVQYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGhlYWRlcjogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY2FsZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyLCB2YWx1ZSwgc2NhbGUsIG9uU2NvcmVVcGRhdGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBTY29yZVBhcnQgZnJvbSBcIi4vU2NvcmVQYXJ0XCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJQYXJ0KGNvZGUsIHNjYWxlLCBhZGRpdGlvbmFsX3Byb3BzPXt9KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFNjb3JlUGFydFxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgey4uLmFkZGl0aW9uYWxfcHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV90ZWNoXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfZmlnc1wiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImltcHJlc3Npb25cIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyB0aGlzLnByb3BzLnNjb3JlRGF0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvdGFsU2NvcmVcclxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiSnVkZ2VUYWJsZXQvQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2lwYW50IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2FuQ29uZmlybSgpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVfZGF0YSA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NvcmVfZGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc2NvcmVfZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmZpbHRlcihhID0+IGEgPT09IG51bGwpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb25Db25maXJtID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtKHRoaXMuc2NvcmUuaWQpO1xuICAgIH1cbiAgICBvblNjb3JlVXBkYXRlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUuY29uZmlybWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB7fTtcbiAgICAgICAgc2NvcmVfZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBzY29yZV9kYXRhKTtcbiAgICB9XG4gICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlID0gKGFjcm9faWR4LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgoKSA9PiBudWxsKTtcbiAgICAgICAgcmVkdWN0aW9uc1thY3JvX2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vblNjb3JlVXBkYXRlKFwicmVkdWN0aW9uc1wiLCByZWR1Y3Rpb25zKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmluZ0xheW91dCgpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVfZGF0YSA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgY29uc3QgU2NvcmluZ0NvbXBvbmVudCA9IHRoaXMucHJvcHMubGF5b3V0Q2xhc3M7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxTY29yaW5nQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMuc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyBzY29yZV9kYXRhIH1cbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZD17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgY2FuQ29uZmlybT17IHRoaXMuY2FuQ29uZmlybSgpIH1cbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtPXsgdGhpcy5vbkNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWluZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtaW5nXCI+XG4gICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5ub3RfcGVyZm9ybWluZ1wiKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJTY29yaW5nTGF5b3V0KClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnJlbmRlck5vdFBlcmZvcm1pbmdNZXNzYWdlKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRlclwiO1xuaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcbmltcG9ydCBQYXJ0aWNpcGFudCBmcm9tIFwiLi9QYXJ0aWNpcGFudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBoZWF0OiB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmIChuZXh0X3Byb3BzLnRvdXIuaWQgIT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgY29uc3QgcHJldl9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gbmV4dF9wcm9wcztcbiAgICAgICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBwcmV2X3Byb3BzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBoZWF0c19jb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJoZWF0c19jb3VudFwiLCAoKSA9PlxuICAgICAgICAgICAgTWF0aC5tYXgoLi4udGhpcy5wcm9wcy50b3VyLnJ1bnMubWFwKHJ1biA9PiBydW4uaGVhdCkpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuaGVhdClcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGZpcnN0X25vbl9jb25maXJtZWRfaGVhdCgpIHtcbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgdGhpcy5wcm9wcy50b3VyLnJ1bnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgcnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCAmJiAhc2NvcmUuY29uZmlybWVkICYmIHJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bi5oZWF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5oZWF0c19jb3VudDtcbiAgICB9XG4gICAgdXBkYXRlSGVhdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGhlYXQ6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25QcmV2SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0IC0gMSk7XG4gICAgfVxuICAgIG9uTmV4dEhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCArIDEpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXQgR2VuZXJhbExheW91dFwiPlxuICAgICAgICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICAgICAgaGVhdHNDb3VudD17IHRoaXMuaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgICAgICBtYXhIZWF0PXsgdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQgfVxuICAgICAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLm9uUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgICAgIG9uTmV4dEhlYXRDbGljaz17IHRoaXMub25OZXh0SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLnJ1bnMuZmlsdGVyKHJ1biA9PiBydW4uaGVhdCA9PT0gdGhpcy5zdGF0ZS5oZWF0KS5tYXAocnVuID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBhcnRpY2lwYW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgdGhpcy5wcm9wcy5sYXlvdXRDbGFzcyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBOdW1iZXJTZWxlY3RvcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvTnVtYmVyU2VsZWN0b3JJbnB1dFwiO1xyXG5pbXBvcnQgU2VsZWN0b3JJbnB1dCBmcm9tIFwidGFibGV0X3VpL1NlbGVjdG9ySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxTY2FsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXI6IFBULnN0cmluZyxcclxuICAgICAgICAgICAgc2NhbGU6IFBULm9uZU9mKFtcInBvaW50NVwiLCBcImludGVnZXJcIiwgXCJncmlkXCIsIFwicmVkdWN0aW9uXCJdKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBPU1NJQkxJRV9SRURVQ1RJT05TKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFsxMDAsIFwiLTEwMCVcIl0sXHJcbiAgICAgICAgICAgIFs3NSwgIFwiLTc1JVwiXSxcclxuICAgICAgICAgICAgWzUwLCAgXCItNTAlXCJdLFxyXG4gICAgICAgICAgICBbMjUsICBcIi0yNSVcIl0sXHJcbiAgICAgICAgICAgIFsxMCwgIFwiLTEwJVwiXSxcclxuICAgICAgICAgICAgWzUsICAgXCItNSVcIl0sXHJcbiAgICAgICAgICAgIFswLCAgIFwiLTAlXCJdLFxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJIZWFkZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aDM+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuaGVhZGVyIH1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgY29uc3QgeyBzY2FsZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3dpdGNoIChzY2FsZSkge1xyXG4gICAgICAgIGNhc2UgXCJwb2ludDVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxOdW1iZXJTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFNpemU9eyAxIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGVwPXsgMC41IH1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInR3by1saW5lc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TnVtYmVyU2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidHdvLWxpbmVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcImdyaWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxOdW1iZXJTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJncmlkXCJcclxuICAgICAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcInJlZHVjdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5QT1NTSUJMSUVfUkVEVUNUSU9OUyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJvbmUtbGluZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93ZCBzY2FsZSB0eXBlOiAke3NjYWxlfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xyXG4gICAgZ2V0IGNoaWxkcmVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiY2hpbGRyZW5cIiwgKCkgPT5cclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICA6IFt0aGlzLnByb3BzLmNoaWxkcmVuXVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXQgdHdvX3Jvd3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ0d29fcm93c1wiLCAoKSA9PlxyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+PSA0XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGdldCB3aWR0aF92YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcIndpZHRoX3ZhbHVlXCIsICgpID0+XHJcbiAgICAgICAgICAgIHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgICAgID8gOTkuOSAvICh0aGlzLmNoaWxkcmVuLmxlbmd0aCArIDEpICogMlxyXG4gICAgICAgICAgICAgICAgOiA5OS45IC8gdGhpcy5jaGlsZHJlbi5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0IHdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwid2lkdGhcIiwgKCkgPT5cclxuICAgICAgICAgICAgYCR7IHRoaXMud2lkdGhfdmFsdWUudG9GaXhlZCg1KSB9JWBcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICBnZXQgbWF4X3dpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwibWF4X3dpZHRoXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGluZV9zaXplID0gdGhpcy50d29fcm93c1xyXG4gICAgICAgICAgICAgICAgPyBNYXRoLmZsb29yKCh0aGlzLmNoaWxkcmVuLmxlbmd0aCArIDEpIC8gMiArIDAuMDAxKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIGAkezYwMCAqIGxpbmVfc2l6ZX1weGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgYXN5bV9sYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJhc3ltX2xheW91dFwiLCAoKSA9PlxyXG4gICAgICAgICAgICB0aGlzLnR3b19yb3dzICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoICUgMiA9PT0gMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3coZWxlbWVudHMsIGlzX3NlY29uZF9yb3cpIHtcclxuICAgICAgICBpZiAoZWxlbWVudHMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJvd193aWR0aCA9IGAkeyhlbGVtZW50cy5sZW5ndGggKiB0aGlzLndpZHRoX3ZhbHVlKS50b0ZpeGVkKDUpfSVgO1xyXG4gICAgICAgIGxldCBjbGFzc19uYW1lID0gXCJncmlkLXJvd1wiO1xyXG4gICAgICAgIGlmICghdGhpcy5hc3ltX2xheW91dCkge1xyXG4gICAgICAgICAgICBjbGFzc19uYW1lICs9IFwiIGFsaWduLWNlbnRlclwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNfc2Vjb25kX3Jvdykge1xyXG4gICAgICAgICAgICBjbGFzc19uYW1lICs9IFwiIGFsaWduLXJpZ2h0XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xhc3NfbmFtZSArPSBcIiBhbGlnbi1sZWZ0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0gc3R5bGU9eyB7IHdpZHRoOiByb3dfd2lkdGggfSB9Pjx0Ym9keT5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICB7IGVsZW1lbnRzLm1hcCgoZSwgaWR4KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIml0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsgeyB3aWR0aDogdGhpcy53aWR0aCB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NfbmFtZSA9IHRoaXMudHdvX3Jvd3MgPyBcIkdyaWQgdHdvLXJvd3NcIiA6IFwiR3JpZFwiO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0X3JvdyA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgPyB0aGlzLmNoaWxkcmVuLmZpbHRlcigoeCwgaWR4KSA9PiBpZHggJSAyID09PSAwKVxyXG4gICAgICAgICAgICA6IHRoaXMuY2hpbGRyZW47XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kX3JvdyA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgPyB0aGlzLmNoaWxkcmVuLmZpbHRlcigoeCwgaWR4KSA9PiBpZHggJSAyID09PSAxKVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0gc3R5bGU9eyB7IG1heFdpZHRoOiB0aGlzLm1heF93aWR0aCB9IH0+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93KGZpcnN0X3JvdywgZmFsc2UpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3coc2Vjb25kX3JvdywgdHJ1ZSkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaE9yQ2xpY2tcIjtcbmltcG9ydCBzaG93Q29uZmlybSBmcm9tIFwiY29tbW9uL2RpYWxvZ3Mvc2hvd0NvbmZpcm1cIjsgLy8gRklYTUVcblxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbnNQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdG9wVG91ciA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5zdG9wX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwgeyB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXIuaWQgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxpemVUb3VyID0gKCkgPT4ge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLmZpbmFsaXplX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLmZpbmFsaXplXCIsIHsgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyLmlkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3BUb3VyQW5kU3RhcnROZXh0ID0gKCkgPT4ge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLnN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91cikge1xuICAgICAgICAgICAgICAgIGxldCB0b3VyX2lkID0gdGhpcy5wcm9wcy50b3VyLmlkO1xuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuc3RvcFwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgICAgICAgICAgfSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxpemVUb3VyQW5kU3RhcnROZXh0ID0gKCkgPT4ge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLmZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG91cl9pZCA9IHRoaXMucHJvcHMudG91ci5pZDtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLmZpbmFsaXplXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwgeyB0b3VyX2lkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9KS5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYXNVbmNvbmZpcm1lZFNjb3JlcygpIHtcbiAgICAgICAgY29uc3QgcnVucyA9IHRoaXMucHJvcHMudG91ci5ydW5zO1xuICAgICAgICBjb25zdCBsYXRlc3RfaGVhdCA9IHJ1bnNbcnVucy5sZW5ndGggLSAxXS5oZWF0O1xuICAgICAgICBpZiAobGF0ZXN0X2hlYXQgPT09IHJ1bnNbMF0uaGVhdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGF0ZXN0X3J1bnMgPSBydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gbGF0ZXN0X2hlYXQpO1xuICAgICAgICBjb25zdCBwcmV2X3J1bnMgPSBydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gbGF0ZXN0X2hlYXQgLSAxKTtcbiAgICAgICAgbGV0IHNjb3JlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc19ydW4gPSAocnVuLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkal9pZCA9IHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29yZXMuaGFzKGRqX2lkKSkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZXMuc2V0KGRqX2lkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3Q6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2OiAwLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICArK3Njb3Jlcy5nZXQoZGpfaWQpW3R5cGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgbGF0ZXN0X3J1bnMpIHtcbiAgICAgICAgICAgIHByb2Nlc3NfcnVuKHJ1biwgXCJsYXRlc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgcHJldl9ydW5zKSB7XG4gICAgICAgICAgICBwcm9jZXNzX3J1bihydW4sIFwicHJldlwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHN0YXRzIG9mIHNjb3Jlcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKHN0YXRzLnByZXYgPiAwICYmIHN0YXRzLmxhdGVzdCA8IGxhdGVzdF9ydW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmVuZGVyV2FybmluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1VuY29uZmlybWVkU2NvcmVzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhcm5pbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmFsZXJ0cy5oYXNfdW5jb25maXJtZWRfc2NvcmVzXCIpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJCdXR0b24oY29kZSwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKGNhbGxiYWNrKSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyBfKGB0YWJsZXQuYnV0dG9ucy4ke2NvZGV9YCkgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keSBhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlcldhcm5pbmcoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbihcInN0b3BfdG91clwiLCB0aGlzLnN0b3BUb3VyKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbihcImZpbmFsaXplX3RvdXJcIiwgdGhpcy5maW5hbGl6ZVRvdXIpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCIsIHRoaXMuc3RvcFRvdXJBbmRTdGFydE5leHQpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiLCB0aGlzLmZpbmFsaXplVG91ckFuZFN0YXJ0TmV4dCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b2JhdGljT3ZlcnJpZGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZXRBY3JvYmF0aWNPdmVycmlkZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzXG4gICAgICAgICAgICAubWFwKChhY3JvLCBpZHgpID0+ICh7IGlkeDogaWR4ICsgMSwgYWNyb2JhdGljOiBhY3JvIH0pKVxuICAgICAgICAgICAgLmZpbHRlcigoYWNybykgPT4gYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUgIT09IGFjcm8uYWNyb2JhdGljLnNjb3JlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgYWNyb2JhdGljX292ZXJyaWRlcyA9IHRoaXMuZ2V0QWNyb2JhdGljT3ZlcnJpZGVzKCk7XG4gICAgICAgIGlmIChhY3JvYmF0aWNfb3ZlcnJpZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UuYWNyb2JhdGljX292ZXJyaWRlc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgeyBhY3JvYmF0aWNfb3ZlcnJpZGVzLm1hcCgoYWNybykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBhY3JvLmlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTVcIj57IGFjcm8uaWR4IH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57IGFjcm8uYWNyb2JhdGljLmRlc2NyaXB0aW9uIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTEwIHRleHQtcmlnaHRcIj57IGFjcm8uYWNyb2JhdGljLm9yaWdpbmFsX3Njb3JlLnRvRml4ZWQoMSkgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNSB0ZXh0LWNlbnRlclwiPuKGkjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1sZWZ0XCI+eyBhY3JvLmFjcm9iYXRpYy5zY29yZS50b0ZpeGVkKDEpIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEl0ZW0ocHJvcHMpIHtcbiAgICBjb25zdCBjb25maXJtZWQgPSBwcm9wcy5zY29yZSAmJiBwcm9wcy5zY29yZS5jb25maXJtZWQ7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHRkIGNsYXNzTmFtZT17IGNvbmZpcm1lZCA/IFwiY29uZmlybWVkXCIgOiBcIlwiIH0+XG4gICAgICAgICAgICB7IHByb3BzLnNjb3JlXG4gICAgICAgICAgICAgICAgPyBwcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICA6IFwi4oCUXCIgfVxuICAgICAgICA8L3RkPlxuICAgICk7XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEl0ZW0gZnJvbSBcIi4vSXRlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lSnVkZ2VTY29yZSBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IGxpbmVfanVkZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImxpbmVfanVkZ2VzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZXMuZmlsdGVyKGRqID0+IGRqLnJvbGUgPT09IFwiZGFuY2VfanVkZ2VcIiB8fCBkai5yb2xlID09PSBcImFjcm9fanVkZ2VcIikpO1xuICAgIH1cbiAgICBnZXQgbGluZV9qdWRnZXNfaW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwibGluZV9qdWRnZXNfaW5kZXhcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZGogb2YgdGhpcy5saW5lX2p1ZGdlcykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZGouaWQsIGRqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgc2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3Jlc1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4uc2NvcmVzLmZpbHRlcihzY29yZSA9PiB0aGlzLmxpbmVfanVkZ2VzX2luZGV4LmhhcyhzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKSkpO1xuICAgIH1cbiAgICByZW5kZXJOdW1iZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMubWFwKHNjb3JlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRqID0gdGhpcy5saW5lX2p1ZGdlc19pbmRleC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9eyBzY29yZS5pZCB9PlxuICAgICAgICAgICAgICAgICAgICB7IGAke2RqLmp1ZGdlLm51bWJlciB9JHsgZGoucm9sZSA9PT0gXCJhY3JvX2p1ZGdlXCIgPyBcIiAoQSlcIiA6IFwiXCIgfWAgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMubWFwKHNjb3JlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRqID0gdGhpcy5saW5lX2p1ZGdlc19pbmRleC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlPXsgZGouanVkZ2UgfVxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBkai5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgc2NvcmUgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UuZGFuY2VfanVkZ2Vfc2NvcmVzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJsaW5lLWp1ZGdlLXNjb3Jlc1wiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cIm51bWJlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOdW1iZXJzKCkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwic2NvcmVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBvblRvdWNoRW5kT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hFbmRPckNsaWNrXCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RQZXJmb3JtZWRTd2l0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG1hcmtOb3RQZXJmb3JtZWQoKSB7XG4gICAgICAgIEFwaShcInJ1bi5tYXJrX25vdF9wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuLmlkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgbWFya1BlcmZvcm1lZCgpIHtcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfcGVyZm9ybWVkXCIsIHsgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCB9KS5zZW5kKCk7XG4gICAgfVxuICAgIHJlbmRlckJ1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJub3QtcGVyZm9ybWVkXCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLm1hcmtOb3RQZXJmb3JtZWQuYmluZCh0aGlzKSkgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5tYXJrX25vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGVyZm9ybWVkXCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLm1hcmtQZXJmb3JtZWQuYmluZCh0aGlzKSkgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5kaXNjYXJkX25vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtZWQtc3dpdGNoXCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbigpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBTZWxlY3RvcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvU2VsZWN0b3JJbnB1dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZW5hbHR5SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yaW5nU3lzdGVtTmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInBlbmFsdHlcIiwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgcGVuYWx0aWVzID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zY29yaW5nU3lzdGVtTmFtZSkgPj0gMFxuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgWzAsICAgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5va1wiKV0sXG4gICAgICAgICAgICAgICAgWy01LCAgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5mb3JtX3llbGxvd19jYXJkXCIpXSxcbiAgICAgICAgICAgICAgICBbLTE1LCAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLmZvcm1fcmVkX2NhcmRcIildLFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgWzAsICAgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5va1wiKV0sXG4gICAgICAgICAgICAgICAgWy0zLCAgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS55ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0zMCwgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5yZWRfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xMDAsIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5ibGFja19jYXJkXCIpXSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmhlYWRfanVkZ2UucGVuYWx0eV90eXBlXCIpIH1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBwZW5hbHRpZXMgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5wZW5hbHR5IH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByZXZpb3VzUGVuYWx0aWVzKHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcy5ydW4uaW5oZXJpdGVkX2RhdGEucGVuYWx0aWVzIHx8IHByb3BzLnJ1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IC8+O1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5wcmV2aW91c19ydW4uaW5oZXJpdGVkX2RhdGEucGVuYWx0aWVzXCIpIH08L2gzPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIj48dGJvZHk+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy5ydW4uaW5oZXJpdGVkX2RhdGEucGVuYWx0aWVzLm1hcCgoZCwgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LWNlbnRlclwiPjxzdHJvbmc+eyBkLnBlbmFsdHkgfTwvc3Ryb25nPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+eyBkLnRvdXIgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBqdWRnZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRUaW1pbmdEYXRhKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2NvcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBbXCItXCIsIFwiXCJdO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0dl9yYXdfdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEudGltaW5nX3Zpb2xhdGlvbjtcbiAgICAgICAgaWYgKHR2X3Jhd192YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcIuKAlFwiLCBcIlwiXTtcbiAgICAgICAgfSBlbHNlIGlmICh0dl9yYXdfdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJYXCIsIFwiIGZhaWxcIl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiT0tcIiwgXCIgb2tcIl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdGltaW5nX2RhdGEgPSB0aGlzLmdldFRpbWluZ0RhdGEoKTtcbiAgICAgICAgbGV0IGp1bXBfc3RlcHMgPSB0aGlzLnByb3BzLnNjb3JlXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5qdW1wX3N0ZXBzXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIGxldCBjb25maXJtZWQgPSB0aGlzLnByb3BzLnNjb3JlICYmIHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPXsgY29uZmlybWVkID8gXCJjb25maXJtZWRcIiA6IFwiXCIgfT57IHRoaXMucHJvcHMuanVkZ2UubmFtZSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGVjaC1qdWRnZS1pbmZvXCI+PHRib2R5Pjx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQudGVjaF9qdWRnZS5qdW1wX3N0ZXBzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBqdW1wX3N0ZXBzIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC50ZWNoX2p1ZGdlLnRpbWluZ1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImlubmVyXCIgKyB0aW1pbmdfZGF0YVsxXSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGltaW5nX2RhdGFbMF0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEl0ZW0gZnJvbSBcIi4vSXRlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNoSnVkZ2VzU2NvcmVzIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgdGVjaF9qdWRnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwidGVjaF9qdWRnZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlcy5maWx0ZXIoZGogPT4gZGoucm9sZSA9PT0gXCJ0ZWNoX2p1ZGdlXCIpKTtcbiAgICB9XG4gICAgZ2V0IHRlY2hfanVkZ2VzX2luZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInRlY2hfanVkZ2VzX2luZGV4XCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRqIG9mIHRoaXMudGVjaF9qdWRnZXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGRqLmlkLCBkaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJzY29yZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnNjb3Jlcy5maWx0ZXIoc2NvcmUgPT4gdGhpcy50ZWNoX2p1ZGdlc19pbmRleC5oYXMoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCkpKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMuc2NvcmVzLm1hcChzY29yZSA9PlxuICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgc2NvcmUuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyBzY29yZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBqdWRnZT17IHRoaXMudGVjaF9qdWRnZXNfaW5kZXguZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBQZW5hbHR5SW5wdXQgZnJvbSBcIi4vUGVuYWx0eUlucHV0XCI7XG5pbXBvcnQgVGVjaEp1ZGdlc1Njb3JlcyBmcm9tIFwiLi9UZWNoSnVkZ2VzU2NvcmVzXCI7XG5pbXBvcnQgTGluZUp1ZGdlc1Njb3JlcyBmcm9tIFwiLi9MaW5lSnVkZ2VzU2NvcmVzXCI7XG5pbXBvcnQgQWNyb2JhdGljT3ZlcnJpZGVzIGZyb20gXCIuL0Fjcm9iYXRpY092ZXJyaWRlc1wiO1xuaW1wb3J0IFByZXZpb3VzUGVuYWx0aWVzIGZyb20gXCIuL1ByZXZpb3VzUGVuYWx0aWVzXCI7XG5pbXBvcnQgTm90UGVyZm9ybWVkU3dpdGNoIGZyb20gXCIuL05vdFBlcmZvcm1lZFN3aXRjaFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25TY29yZVVwZGF0ZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBzY29yZV9kYXRhID0ge307XG4gICAgICAgIHNjb3JlX2RhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5zY29yZS5pZCwgc2NvcmVfZGF0YSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8Tm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8UGVuYWx0eUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgICAgICBzY29yaW5nU3lzdGVtTmFtZT17IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxUZWNoSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlcz17IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxMaW5lSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlcz17IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxBY3JvYmF0aWNPdmVycmlkZXNcbiAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFByZXZpb3VzUGVuYWx0aWVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxOb3RQZXJmb3JtZWRTd2l0Y2hcbiAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcblxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWF0c1BhZ2UgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMucHJvcHMuaGVhdCkpO1xuICAgIH1cbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGhlYXRzXCI+XG4gICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVG91clJlc3VsdHMgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuaW1wb3J0IFJlc3VsdHNUYWJsZTIgZnJvbSBcIlJlc3VsdHNUYWJsZTJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemF0aW9uXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHkgcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxUb3VyUmVzdWx0c1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcj17IFJlc3VsdHNUYWJsZTIgfVxuICAgICAgICAgICAgICAgICAgICB0b3VySWQ9eyB0aGlzLnByb3BzLnRvdXIuaWQgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyXCI7XG5pbXBvcnQgRm9vdGVySXRlbSBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyL0Zvb3Rlckl0ZW1cIjtcblxuaW1wb3J0IEhlYXRzUGFnZSBmcm9tIFwiLi9IZWF0c1BhZ2VcIjtcbmltcG9ydCBSZXN1bHRzUGFnZSBmcm9tIFwiLi9SZXN1bHRzUGFnZVwiO1xuaW1wb3J0IEFjdGlvbnNQYWdlIGZyb20gXCIuL0FjdGlvbnNQYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRKdWRnZUxheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaGVhdDogMSxcbiAgICAgICAgICAgIHBhZ2U6IFwiaGVhdHNcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmIChuZXh0X3Byb3BzLnRvdXIuaWQgIT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaGVhdDogMSxcbiAgICAgICAgICAgICAgICBwYWdlOiBcImhlYXRzXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnByb3BzLnRvdXIucnVucy5tYXAocnVuID0+IHJ1bi5oZWF0KSk7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgb25QYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2UgfSk7XG4gICAgfVxuICAgIHJlbmRlckhlYXRzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYXRzUGFnZVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJlc3VsdHMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVzdWx0c1BhZ2VcbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QWN0aW9uc1BhZ2VcbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhdHNfY291bnQgPSB0aGlzLmhlYXRzX2NvdW50O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuanVkZ2UgfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGhlYXQ9eyB0aGlzLnN0YXRlLmhlYXQgfVxuICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyBoZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAgbWF4SGVhdD17IGhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLm9uUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgb25OZXh0SGVhdENsaWNrPXsgdGhpcy5vbk5leHRIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBhZ2UpIHtcbiAgICAgICAgY2FzZSBcImhlYXRzXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJIZWF0cygpO1xuICAgICAgICBjYXNlIFwicmVzdWx0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyUmVzdWx0cygpO1xuICAgICAgICBjYXNlIFwiYWN0aW9uc1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb290ZXIgdmFsdWU9eyB0aGlzLnN0YXRlLnBhZ2UgfSBvbkNoYW5nZT17IHRoaXMub25QYWdlQ2hhbmdlIH0+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmhlYXRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImhlYXRzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cInJlc3VsdHNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmFjdGlvbnNcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiYWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9vdGVyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXQgSGVhZEp1ZGdlTGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyRm9vdGVyKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBvblRvdWNoRW5kT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hFbmRPckNsaWNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUHJldkhlYXRCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhdCA8PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXJcIiAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXIgbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMucHJvcHMub25QcmV2SGVhdENsaWNrKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnByZXZfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlck5leHRIZWF0QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYXQgPj0gdGhpcy5wcm9wcy5tYXhIZWF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXJcIiAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXIgcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24geyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uTmV4dEhlYXRDbGljaykgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5uZXh0X2hlYXRcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QganVkZ2VfbnVtYmVyID0gdGhpcy5wcm9wcy5qdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIHx8IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIHRoaXMucHJvcHMuanVkZ2UubnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclByZXZIZWF0QnV0dG9uKCkgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsganVkZ2VfbnVtYmVyIH08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+eyB0aGlzLnByb3BzLmp1ZGdlLm5hbWUgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsgdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUubmFtZSB9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwuaGVhdF9udW1iZXJcIiwgdGhpcy5wcm9wcy5oZWF0LCB0aGlzLnByb3BzLmhlYXRzQ291bnQgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0SGVhdEJ1dHRvbigpIH1cclxuICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIG9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwicG9pbnRzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnBvaW50cyB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cImdyaWRcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgIG1pbj17IDEgfVxyXG4gICAgICAgICAgICAgICAgbWF4PXsgNDAgfVxyXG4gICAgICAgICAgICAgICAgcm93U2l6ZT17IDEwIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBPdmVycmlkZUlucHV0IGZyb20gXCIuL092ZXJyaWRlSW5wdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZWNoLWp1ZGdlLWFjcm9cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2xzIHB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXR0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxPdmVycmlkZUlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMucHJvcHMub25BY3JvT3ZlcnJpZGUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWU9eyB0aGlzLnByb3BzLmFjcm8ub3JpZ2luYWxfc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5hY3JvLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjcm8uZGVzY3JpcHRpb24gfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaE9yQ2xpY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3ZlcnJpZGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZU1pbnVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoTWF0aC5tYXgodGhpcy5wcm9wcy52YWx1ZSAtIDAuNSwgMCkpO1xuICAgIH1cbiAgICBoYW5kbGVQbHVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoTWF0aC5taW4odGhpcy5wcm9wcy52YWx1ZSArIDAuNSwgdGhpcy5wcm9wcy5vcmlnaW5hbFZhbHVlKSk7XG4gICAgfVxuICAgIGhhbmRsZVplcm8gPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSgwKTtcbiAgICB9XG4gICAgaGFuZGxlUmVzdG9yZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMub3JpZ2luYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB2YWx1ZV9jaGFuZ2VkID0gTWF0aC5hYnModGhpcy5wcm9wcy52YWx1ZSAtIHRoaXMucHJvcHMub3JpZ2luYWxWYWx1ZSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1hY3JvLW92ZXJyaWRlLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi16ZXJvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy52YWx1ZSA8IDAuMDUgfHwgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlWmVybykgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICDihpMwXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tcmVzdG9yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHZhbHVlX2NoYW5nZWQgPCAwLjA1IHx8IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVJlc3RvcmUpIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg4oaRXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tbWludXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLnZhbHVlIDwgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVNaW51cykgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMub3JpZ2luYWxWYWx1ZSA8IHRoaXMucHJvcHMudmFsdWUgKyAwLjA1IHx8IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVBsdXMpIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWVfY2hhbmdlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBgJHt0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUudG9GaXhlZCgxKX0g4oaSICR7dGhpcy5wcm9wcy52YWx1ZS50b0ZpeGVkKDEpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy52YWx1ZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5PdmVycmlkZUlucHV0LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfSnVkZ2VUYWJsZXRfVGVjaEp1ZGdlTGF5b3V0X0Fjcm9QYWdlX1Njb3JpbmdMYXlvdXRfT3ZlcnJpZGVJbnB1dFwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgQ29uZmlybWF0aW9uQnV0dG9uIGZyb20gXCJKdWRnZVRhYmxldC9Db25maXJtYXRpb25CdXR0b25cIjtcblxuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Db25maXJtID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtKHRoaXMuc2NvcmUuaWQpO1xuICAgIH1cbiAgICBvbkFjcm9PdmVycmlkZSA9IChhY3JvX2lkeCwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUuY29uZmlybWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgQXBpKFwiYWNyb2JhdGljX292ZXJyaWRlLnNldFwiLCB7XG4gICAgICAgICAgICBydW5faWQ6IHRoaXMucHJvcHMucnVuLmlkLFxuICAgICAgICAgICAgYWNyb2JhdGljX2lkeDogYWNyb19pZHgsXG4gICAgICAgICAgICBzY29yZTogdmFsdWUsXG4gICAgICAgIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgZ2VuT25BY3JvT3ZlcnJpZGUoYWNyb19pZHgpIHtcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMub25BY3JvT3ZlcnJpZGUoYWNyb19pZHgsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PlxuICAgICAgICAgICAgPEVsZW1lbnRcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICBrZXk9eyBpZHggfVxuICAgICAgICAgICAgICAgIGFjcm89eyBhY3JvIH1cbiAgICAgICAgICAgICAgICBvbkFjcm9PdmVycmlkZT17IHRoaXMuZ2VuT25BY3JvT3ZlcnJpZGUoaWR4KSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxoMj57IGhlYWRlciB9PC9oMj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQ29udGVudCgpIH1cbiAgICAgICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZD17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtPXsgdGhpcy5vbkNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9TZWxlY3RvcklucHV0XCI7XG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIkp1ZGdlVGFibGV0L0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuXG5pbXBvcnQgU3RvcFdhdGNoIGZyb20gXCIuL1N0b3BXYXRjaFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb25maXJtYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0odGhpcy5zY29yZS5pZCk7XG4gICAgfVxuICAgIGhhbmRsZVNjb3JlQ2hhbmdlID0gKHBhcnQsIHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGRhdGFbcGFydF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMuc2NvcmUuaWQsIGRhdGEpO1xuICAgIH1cblxuICAgIGhhbmRsZUp1bXBTdGVwc0NoYW5nZSA9ICh2YWx1ZSkgPT4gdGhpcy5oYW5kbGVTY29yZUNoYW5nZShcImp1bXBfc3RlcHNcIiwgdmFsdWUpO1xuICAgIGhhbmRsZVRpbWluZ1Zpb2xhdGlvbkNoYW5nZSA9ICh2YWx1ZSkgPT4gdGhpcy5oYW5kbGVTY29yZUNoYW5nZShcInRpbWluZ192aW9sYXRpb25cIiwgdmFsdWUpO1xuXG4gICAgZ2VuT25TY29yZVVwZGF0ZShzY29yZV9wYXJ0KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLm9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY29yZSA9IHRoaXMuc2NvcmUuZGF0YTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LnRlY2hfanVkZ2UuanVtcF9zdGVwc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XG4gICAgICAgICAgICAgICAgICAgIHNlbmREZWx0YXNcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmUucmF3X2RhdGEuanVtcF9zdGVwcyB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVKdW1wU3RlcHNDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIiAvPlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LnRlY2hfanVkZ2UudGltaW5nXCIpIH1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxTdG9wV2F0Y2hcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVJZD17IHRoaXMuc2NvcmUuaWQgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IFtbdHJ1ZSwgXCJYXCJdLCBbbnVsbCwgXCItXCJdLCBbZmFsc2UsIFwiT0tcIl1dIH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmUucmF3X2RhdGEudGltaW5nX3Zpb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVUaW1pbmdWaW9sYXRpb25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17IHRoaXMuaGFuZGxlQ29uZmlybWF0aW9uIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5pbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcInRhYmxldF91aS9vblRvdWNoT3JDbGlja1wiO1xuXG5sZXQgc3RvcHdhdGNoZXMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZUlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIGxldCBzdGF0ZSA9IHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVJZF0gfHwge1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgc3RyX3ZhbHVlOiBcIjA6MDBcIixcbiAgICAgICAgICAgIGludGVydmFsOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgICAgICBzdGF0ZS5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuaGFuZGxlVGljaywgMTApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZUlkXSA9IHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgbm93KCkge1xuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBzdGFydF9hdDogdGhpcy5ub3coKSAtIHRoaXMuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICBpbnRlcnZhbDogc2V0SW50ZXJ2YWwodGhpcy5oYW5kbGVUaWNrLCAxMCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb2dnbGUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlUmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlVGljayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICBpZiAobmV3X3ZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlXG4gICAgICAgICAgICA/ICh0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS5zdGFydF9hdClcbiAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICB9XG5cbiAgICBwYWQobnVtLCBzaXplKSB7XG4gICAgICAgIGNvbnN0IHMgPSBgMDAwMCR7bnVtfWA7XG4gICAgICAgIHJldHVybiBzLnN1YnN0cihzLmxlbmd0aCAtIHNpemUpO1xuICAgIH1cbiAgICBnZXRTdHJWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgbGV0IG0gPSAwLCBzID0gMDtcbiAgICAgICAgbSA9IE1hdGguZmxvb3IodmFsIC8gKDYwICogMTAwMCkpO1xuICAgICAgICB2YWwgJT0gNjAgKiAxMDAwO1xuICAgICAgICBzID0gTWF0aC5mbG9vcih2YWwgLyAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGAke219OiR7dGhpcy5wYWQocywgMil9YDtcbiAgICB9XG5cbiAgICBnZXRUb2dnbGVCdXR0b25DbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwidGJ0blwiOiB0cnVlLFxuICAgICAgICAgICAgXCJidG4tdG9nZ2xlXCI6IHRydWUsXG4gICAgICAgICAgICBcImlnbm9yZS1yZWFkb25seVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdGhpcy5zdGF0ZS5hY3RpdmUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3B3YXRjaFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcmVzZXQgaWdub3JlLXJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVJlc2V0KSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5yZXNldF9zdG9wd2F0Y2hcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5nZXRUb2dnbGVCdXR0b25DbGFzc05hbWUoKSB9XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVUb2dnbGUpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXyhcInRhYmxldC5idXR0b25zLnN0b3Bfc3RvcHdhdGNoXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdGFydF9zdG9wd2F0Y2hcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RyVmFsdWUoKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gXCJKdWRnZVRhYmxldC9HcmlkXCI7XG5cbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2luZ1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucnVucy5tYXAocnVuID0+XG4gICAgICAgICAgICA8U2NvcmluZ0xheW91dFxuICAgICAgICAgICAgICAgIGtleT17IHJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3RlclwiO1xuaW1wb3J0IEZvb3Rlckl0ZW0gZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3Rlci9Gb290ZXJJdGVtXCI7XG5cbmltcG9ydCBEYW5jaW5nUGFnZSBmcm9tIFwiLi9EYW5jaW5nUGFnZVwiO1xuaW1wb3J0IEFjcm9QYWdlIGZyb20gXCIuL0Fjcm9QYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlY2hKdWRnZUxheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgICAgICBwYWdlOiBcImRhbmNpbmdcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmIChuZXh0X3Byb3BzLnRvdXIuaWQgIT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgY29uc3QgcHJldl9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gbmV4dF9wcm9wcztcbiAgICAgICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgICAgICAgICAgcGFnZTogXCJkYW5jaW5nXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBwcmV2X3Byb3BzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBoZWF0c19jb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJoZWF0c19jb3VudFwiLCAoKSA9PlxuICAgICAgICAgICAgTWF0aC5tYXgoLi4udGhpcy5wcm9wcy50b3VyLnJ1bnMubWFwKHJ1biA9PiBydW4uaGVhdCkpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuaGVhdClcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGZpcnN0X25vbl9jb25maXJtZWRfaGVhdCgpIHtcbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgdGhpcy5wcm9wcy50b3VyLnJ1bnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgcnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCAmJiAhc2NvcmUuY29uZmlybWVkICYmIHJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bi5oZWF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5oZWF0c19jb3VudDtcbiAgICB9XG4gICAgdXBkYXRlSGVhdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGhlYXQ6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25QcmV2SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0IC0gMSk7XG4gICAgfVxuICAgIG9uTmV4dEhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCArIDEpO1xuICAgIH1cbiAgICBvblBhZ2VDaGFuZ2UgPSAocGFnZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcGFnZSB9KTtcbiAgICB9XG4gICAgcmVuZGVyRGFuY2luZygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxEYW5jaW5nUGFnZVxuICAgICAgICAgICAgICAgIHJ1bnM9eyB0aGlzLnJ1bnMgfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQWNybygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBY3JvUGFnZVxuICAgICAgICAgICAgICAgIHJ1bnM9eyB0aGlzLnJ1bnMgfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBjb25zdCBoZWF0c19jb3VudCA9IHRoaXMuaGVhdHNfY291bnQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgaGVhdD17IHRoaXMuc3RhdGUuaGVhdCB9XG4gICAgICAgICAgICAgICAgaGVhdHNDb3VudD17IGhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICBtYXhIZWF0PXsgdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQgfVxuICAgICAgICAgICAgICAgIG9uUHJldkhlYXRDbGljaz17IHRoaXMub25QcmV2SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICBvbk5leHRIZWF0Q2xpY2s9eyB0aGlzLm9uTmV4dEhlYXRDbGljayB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUucGFnZSkge1xuICAgICAgICBjYXNlIFwiZGFuY2luZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGFuY2luZygpO1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWNybygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKFtcInJvc2ZhcnIuYWNyb1wiLCBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9vdGVyIHZhbHVlPXsgdGhpcy5zdGF0ZS5wYWdlIH0gb25DaGFuZ2U9eyB0aGlzLm9uUGFnZUNoYW5nZSB9PlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5kYW5jaW5nXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImRhbmNpbmdcIiAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5hY3JvXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImFjcm9cIiAvPlxuICAgICAgICAgICAgPC9Gb290ZXI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9zZmFyci1KdWRnZVRhYmxldCBUZWNoSnVkZ2VMYXlvdXRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJGb290ZXIoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCAocHJvcHMpID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwudG90YWxfc2NvcmVcIikgfTogeyBwcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH1cbiAgICA8L2Rpdj5cbik7XG4iLCJpbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xyXG5cclxuaW1wb3J0IEFjcm9iYXRpY3NMYXlvdXQgZnJvbSBcIi4vQWNyb2JhdGljc0xheW91dFwiO1xyXG5pbXBvcnQgRGFuY2VMYXlvdXQgZnJvbSBcIi4vRGFuY2VMYXlvdXRcIjtcclxuaW1wb3J0IERhbmNlSGFsdmVkTGF5b3V0IGZyb20gXCIuL0RhbmNlSGFsdmVkTGF5b3V0XCI7XHJcbmltcG9ydCBGb3JtYXRpb25MYXlvdXQgZnJvbSBcIi4vRm9ybWF0aW9uTGF5b3V0XCI7XHJcbmltcG9ydCBGb3JtYXRpb25BY3JvTGF5b3V0IGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9MYXlvdXRcIjtcclxuaW1wb3J0IFNpbXBsaWZpZWRMYXlvdXQgZnJvbSBcIi4vU2ltcGxpZmllZExheW91dFwiO1xyXG5pbXBvcnQgSGVhZEp1ZGdlTGF5b3V0IGZyb20gXCIuL0hlYWRKdWRnZUxheW91dFwiO1xyXG5pbXBvcnQgVGVjaEp1ZGdlTGF5b3V0IGZyb20gXCIuL1RlY2hKdWRnZUxheW91dFwiO1xyXG5cclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdWRnZVRhYmxldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgTEFZT1VUUyA9IHtcclxuICAgICAgICBcImFjcm9cIjogQWNyb2JhdGljc0xheW91dCxcclxuICAgICAgICBcImRhbmNlXCI6IERhbmNlTGF5b3V0LFxyXG4gICAgICAgIFwiZGFuY2VfaGFsdmVkXCI6IERhbmNlSGFsdmVkTGF5b3V0LFxyXG4gICAgICAgIFwiZm9ybWF0aW9uXCI6IEZvcm1hdGlvbkxheW91dCxcclxuICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IEZvcm1hdGlvbkFjcm9MYXlvdXQsXHJcbiAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFNpbXBsaWZpZWRMYXlvdXQsXHJcbiAgICAgICAgXCJoZWFkXCI6IEhlYWRKdWRnZUxheW91dCxcclxuICAgICAgICBcInRlY2hcIjogVGVjaEp1ZGdlTGF5b3V0LFxyXG4gICAgfTtcclxuICAgIG9uU2NvcmVVcGRhdGUgPSAoc2NvcmVfaWQsIG5ld19zY29yZSkgPT4ge1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBzY29yZV9kYXRhOiBuZXdfc2NvcmUsXHJcbiAgICAgICAgICAgIGZvcmNlOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwaShcInNjb3JlLnNldFwiLCB7IHNjb3JlX2lkOiBzY29yZV9pZCwgZGF0YTogcmVxdWVzdCB9KS5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICBvblNjb3JlQ29uZmlybSA9IChzY29yZV9pZCkgPT4ge1xyXG4gICAgICAgIEFwaShcInNjb3JlLmNvbmZpcm1cIiwgeyBzY29yZV9pZDogc2NvcmVfaWQgfSkuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNjb3JpbmdfdHlwZSA9IGdldFNjb3JpbmdUeXBlKHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSk7XHJcbiAgICAgICAgbGV0IExheW91dENsYXNzID0gSnVkZ2VUYWJsZXQuTEFZT1VUU1tzY29yaW5nX3R5cGVdO1xyXG4gICAgICAgIGlmICghTGF5b3V0Q2xhc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+Tm90IGltcGxlbWVudGVkITwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXRcIj5cclxuICAgICAgICAgICAgICAgIDxMYXlvdXRDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cclxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMub25TY29yZUNvbmZpcm0gfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgZ2V0UGFydGljaXBhbnREaXNwbGF5IGZyb20gXCJjb21tb24vZ2V0UGFydGljaXBhbnREaXNwbGF5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcjogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NlX3RvdGFsX3Njb3JlOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldENhcmQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIuKAlFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoZWFkX2p1ZGdlX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnNjb3Jlcy5maW5kKFxyXG4gICAgICAgICAgICBzY29yZSA9PiB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZXNNYXAuZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpLnJvbGUgPT09IFwiaGVhZF9qdWRnZVwiKTtcclxuICAgICAgICBpZiAoIWhlYWRfanVkZ2Vfc2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoKTtcclxuICAgIH1cclxuICAgIHJlbmRlclRvdGFsU2NvcmVDZWxsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93VG90YWxTY29yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBcIuKAlFwiO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSAoXHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgJm5ic3A7eyBcIi8gXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xOCBzY29yZVwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IGNvbnRlbnQgfVxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy02IG51bWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50Lm51bWJlciB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50KVxyXG4gICAgICAgICAgICAgICAgIH08L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQuY2x1Yi5uYW1lIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmVDZWxsKCkgfVxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldENhcmQoKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5Sb3cuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUxX1Jvd1wiO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdHNUYWJsZTEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRhYmxlOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZXM6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbmV4dF90b3VyX2lkOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1Eb2N4KGRvY3gpIHtcbiAgICAgICAgZG9jeFxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFkdmFuY2VzLWhlYWRlclwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpO1xuICAgIH1cblxuICAgIGdldFJvd1N0YXR1cyhyb3cpIHtcbiAgICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub3RfcGVyZm9ybWVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvdy5hZHZhbmNlcyA/IFwiYWR2YW5jZWRcIiA6IFwibm90X2FkdmFuY2VkXCI7XG4gICAgfVxuICAgIGdldFN0YXR1c0hlYWRlcihyb3dfc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiBfKGByZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzXyR7cm93X3N0YXR1c31gKTtcbiAgICB9XG4gICAgcmVuZGVyQWR2YW5jZXNIZWFkZXIocHJldl9yb3csIG5leHRfcm93LCBoYXNfbmV4dF90b3VyLCBuX2NvbHMpIHtcbiAgICAgICAgY29uc3QgcHJldl9zdGF0dXMgPSB0aGlzLmdldFJvd1N0YXR1cyhwcmV2X3Jvdyk7XG4gICAgICAgIGNvbnN0IG5leHRfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMobmV4dF9yb3cpO1xuICAgICAgICBpZiAocHJldl9zdGF0dXMgPT09IG5leHRfc3RhdHVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dF9zdGF0dXMgIT09IFwibm90X3BlcmZvcm1lZFwiICYmICFoYXNfbmV4dF90b3VyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyIGtleT17IGBBSCR7bmV4dF9yb3cucnVuLmlkfWAgfT5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdGF0dXNIZWFkZXIobmV4dF9zdGF0dXMpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGNvbnN0IHNob3dfdG90YWxfc2NvcmUgPSBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZihcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA8IDA7XG4gICAgICAgIGNvbnN0IGRqc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLm1hcChkaiA9PiBbZGouaWQsIGRqXSkpO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLnByb3BzLnRhYmxlLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4IC0gMV0sXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50YWJsZVtpZHhdLFxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXIsXG4gICAgICAgICAgICAgICAgNSArIHNob3dfdG90YWxfc2NvcmVcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5wcm9wcy50YWJsZVtpZHhdO1xuICAgICAgICAgICAgcm93cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxSb3dcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcD17IGRqc19tYXAgfVxuICAgICAgICAgICAgICAgICAgICBrZXk9eyByb3cucnVuLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgcm93PXsgcm93IH1cbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvdGFsU2NvcmU9eyBzaG93X3RvdGFsX3Njb3JlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJSZXN1bHRzVGFibGUxXCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy03IHBsYWNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy02IG51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJjbHViXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc2hvd190b3RhbF9zY29yZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5jYXJkXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvd3MgfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlc3VsdHNUYWJsZTEuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUxXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5zV2lkdGhzIHtcclxuICAgIGNvbnN0cnVjdG9yKG5fanVkZ2VzLCBoYXNfdG90YWxfc2NvcmUpIHtcclxuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg1NSAvIChuX2p1ZGdlcyArIDEpKTtcclxuICAgICAgICB0aGlzLnRvdGFsX3Njb3JlX3dpZHRoID0gaGFzX3RvdGFsX3Njb3JlID8gMTQgOiAwO1xyXG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA2O1xyXG4gICAgICAgIHRoaXMubnVtYmVyX3dpZHRoID0gMztcclxuICAgICAgICB0aGlzLm5hbWVfd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogKG5fanVkZ2VzICsgMSkgLVxyXG4gICAgICAgICAgICB0aGlzLnRvdGFsX3Njb3JlX3dpZHRoIC0gdGhpcy5wbGFjZV93aWR0aCAtIHRoaXMubnVtYmVyX3dpZHRoO1xyXG4gICAgfVxyXG4gICAgZ2VuUGxhY2VTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wbGFjZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5OdW1iZXJTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5udW1iZXJfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuTmFtZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLm5hbWVfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuVG90YWxTY29yZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnRvdGFsX3Njb3JlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgZ2V0UGFydGljaXBhbnREaXNwbGF5IGZyb20gXCJjb21tb24vZ2V0UGFydGljaXBhbnREaXNwbGF5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGxpbmVEaXNjaXBsaW5lSnVkZ2VzOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbF9kYXRhOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZV9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyYm9zZV90b3RhbF9zY29yZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c190b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2hvd1RvdGFsU2NvcmU6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlzRm9ybWF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXJkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCLigJRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGVhZF9qdWRnZV9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMuZmluZChcclxuICAgICAgICAgICAgc2NvcmUgPT4gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwLmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKS5yb2xlID09PSBcImhlYWRfanVkZ2VcIik7XHJcbiAgICAgICAgaWYgKCFoZWFkX2p1ZGdlX3Njb3JlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cuYWRkaXRpb25hbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfVxyXG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICB7IGAgKCR7c2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDEpfSlgIH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJTY29yZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAmbWRhc2g7XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUgPT09IFwiZGFuY2VfanVkZ2VcIiAmJiB0aGlzLmlzRm9ybWF0aW9uKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgeyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlclRvdGFsU2NvcmVDZWxsKCkge1xyXG4gICAgICAgIGNvbnN0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmU7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNob3dUb3RhbFNjb3JlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICZtZGFzaDtcclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgcF9zY29yZSA9IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBjb25zdCBzX3Njb3JlID0gdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYCR7XyhcInJlc3VsdHMubGFiZWxzLmZ3X3Njb3JlX3Nob3J0XCIpIH06ICR7cF9zY29yZX0gLyAke3Nfc2NvcmV9YCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7eyBcIi8gXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICZuYnNwO3sgXCIvIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVySnVkZ2VzU2NvcmVzKCkge1xyXG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMubWFwKHNjb3JlID0+IFtzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzY29yZV0pKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5saW5lRGlzY2lwbGluZUp1ZGdlcy5tYXAoKGRqLCBpZHgpID0+XHJcbiAgICAgICAgICAgIDx0ZCBrZXk9eyBkaiA/IGRqLmlkIDogYEkke2lkeH1gIH0+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUoZGosIHNjb3Jlc19tYXAuZ2V0KGRqLmlkKSkgfVxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5wbGFjZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQpIH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVG90YWxTY29yZUNlbGwoKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySnVkZ2VzU2NvcmVzKCkgfVxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0Q2FyZCgpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJvdy5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTJfUm93XCI7XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5pbXBvcnQgQ29sdW1uc1dpZHRocyBmcm9tIFwiLi9Db2x1bW5zV2lkdGhzXCI7XHJcblxyXG5pbXBvcnQgZ2V0SnVkZ2VUYWJsZU1hcmsgZnJvbSBcImdldEp1ZGdlVGFibGVNYXJrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRhYmxlOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG5leHRfdG91cl9pZDogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XHJcbiAgICAgICAgZG9jeFxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFkdmFuY2VzLWhlYWRlclwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3RhbC1zY29yZVwiLCBcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSb3dTdGF0dXMocm93KSB7XHJcbiAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9wZXJmb3JtZWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdy5hZHZhbmNlcyA/IFwiYWR2YW5jZWRcIiA6IFwibm90X2FkdmFuY2VkXCI7XHJcbiAgICB9XHJcbiAgICBnZXRTdGF0dXNIZWFkZXIocm93X3N0YXR1cykge1xyXG4gICAgICAgIHJldHVybiBfKGByZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzXyR7cm93X3N0YXR1c31gKTtcclxuICAgIH1cclxuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKHByZXZfcm93LCBuZXh0X3JvdywgaGFzX25leHRfdG91ciwgbl9jb2xzKSB7XHJcbiAgICAgICAgY29uc3QgcHJldl9zdGF0dXMgPSB0aGlzLmdldFJvd1N0YXR1cyhwcmV2X3Jvdyk7XHJcbiAgICAgICAgY29uc3QgbmV4dF9zdGF0dXMgPSB0aGlzLmdldFJvd1N0YXR1cyhuZXh0X3Jvdyk7XHJcbiAgICAgICAgaWYgKHByZXZfc3RhdHVzID09PSBuZXh0X3N0YXR1cykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5leHRfc3RhdHVzICE9PSBcIm5vdF9wZXJmb3JtZWRcIiAmJiAhaGFzX25leHRfdG91cikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyIGtleT17IGBBSCR7bmV4dF9yb3cucnVuLmlkfWAgfT5cclxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdGF0dXNIZWFkZXIobmV4dF9zdGF0dXMpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qgc2hvd190b3RhbF9zY29yZSA9IFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPCAwO1xyXG4gICAgICAgIGNvbnN0IGxpbmVfanVkZ2VzID0gdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKFxyXG4gICAgICAgICAgICBkaiA9PiBbXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIl0uaW5kZXhPZihkai5yb2xlKSA+PSAwKTtcclxuICAgICAgICBjb25zdCBoYXNfbmV4dF90b3VyID0gdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbDtcclxuICAgICAgICBjb25zdCB3aWR0aHMgPSBuZXcgQ29sdW1uc1dpZHRocyhsaW5lX2p1ZGdlcy5sZW5ndGgsIHNob3dfdG90YWxfc2NvcmUpO1xyXG4gICAgICAgIGNvbnN0IGRqc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLm1hcChkaiA9PiBbZGouaWQsIGRqXSkpO1xyXG4gICAgICAgIGxldCByb3dzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wcy50YWJsZS5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50YWJsZVtpZHggLSAxXSxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4XSxcclxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXIsXHJcbiAgICAgICAgICAgICAgICA0ICsgbGluZV9qdWRnZXMubGVuZ3RoICsgc2hvd190b3RhbF9zY29yZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgcm93cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cclxuICAgICAgICAgICAgICAgICAgICBrZXk9eyB0aGlzLnByb3BzLnRhYmxlW2lkeF0ucnVuLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlcz17IGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICByb3c9eyB0aGlzLnByb3BzLnRhYmxlW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlPXsgc2hvd190b3RhbF9zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlJlc3VsdHNUYWJsZTJcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cIm51bWJlclwiIHN0eWxlPXsgd2lkdGhzLmdlbk51bWJlclN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuTmFtZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc2hvd190b3RhbF9zY29yZSA/IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIiBzdHlsZT17IHdpZHRocy5nZW5Ub3RhbFNjb3JlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxpbmVfanVkZ2VzLm1hcChkaiA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBrZXk9eyBkai5pZCB9IHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZ2V0SnVkZ2VUYWJsZU1hcmsoZGopIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUmVzdWx0c1RhYmxlMi5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTJcIjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uc1dpZHRocyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcykge1xyXG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDcwIC8gbl9qdWRnZXMpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA3XHJcbiAgICAgICAgdGhpcy5pbmZvX3dpZHRoID0gMTAwIC0gdGhpcy5qdWRnZV93aWR0aCAqIG5fanVkZ2VzIC0gdGhpcy5wbGFjZV93aWR0aDtcclxuICAgIH1cclxuICAgIGdlblBsYWNlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuSW5mb1N0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmluZm9fd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuSnVkZ2VTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5qdWRnZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGZvcm1hdFNjb3JlIGZyb20gXCIuL2Zvcm1hdFNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb25zOiBQVC5hcnJheU9mKFBULm51bWJlcikuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmFjcm9fblwiLCBpZHggKyAxKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZShzY29yZSwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5mZFwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEubWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkFjcm9TY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93X0Fjcm9TY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGZvcm1hdFNjb3JlIGZyb20gXCIuL2Zvcm1hdFNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZndfd29tYW46IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X21hbjogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRpb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNjb3JpbmdUeXBlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlX2Zvcm1hdCA9IHRoaXMucHJvcHMuc2NvcmluZ1R5cGUgPT09IFwiZGFuY2VfaGFsdmVkXCIgPyBcIkBcIiA6IFwiJFwiXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZndcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmZ3X3dvbWFuLCBcIi0kJVwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5mbVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuZndfbWFuLCBcIi0kJVwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfZmlncywgc2NvcmVfZm9ybWF0KSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5jXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuY29tcG9zaXRpb24sIHNjb3JlX2Zvcm1hdCkgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uc21cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnNtYWxsX21pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5ibVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuYmlnX21pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EYW5jZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19Sb3dfRGFuY2VTY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGZvcm1hdFNjb3JlIGZyb20gXCIuL2Zvcm1hdFNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdGlvbkFjcm9TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbF9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlczogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuYWNyb2JhdGljcywgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuaW1wcmVzc2lvbiwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24ucFwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0aGlzLnByb3BzLnJvdy5hZGRpdGlvbmFsX2RhdGEucGxhY2VzW3RoaXMucHJvcHMuc2NvcmUuaWRdIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkZvcm1hdGlvbkFjcm9TY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93X0Zvcm1hdGlvbkFjcm9TY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGZvcm1hdFNjb3JlIGZyb20gXCIuL2Zvcm1hdFNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdGlvblNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VzOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfdGVjaDogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wcmVzc2lvbjogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZHRcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX3RlY2gsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfZmlncywgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5pbXByZXNzaW9uLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24ubVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEubWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnBcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5yb3cuYWRkaXRpb25hbF9kYXRhLnBsYWNlc1t0aGlzLnByb3BzLnNjb3JlLmlkXSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Gb3JtYXRpb25TY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93X0Zvcm1hdGlvblNjb3JlXCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgZ2V0UGFydGljaXBhbnREaXNwbGF5IGZyb20gXCJjb21tb24vZ2V0UGFydGljaXBhbnREaXNwbGF5XCI7XG5pbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZvQ2VsbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgYWNyb2JhdGljczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0aW9uX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BvcnRzbWVuOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyUGFydGljaXBhbnRJbmZvKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhlYWRfanVkZ2Vfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLmZpbmQoXG4gICAgICAgICAgICBzY29yZSA9PiB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZXNNYXAuZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpLnJvbGUgPT09IFwiaGVhZF9qdWRnZVwiKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIHsgYCR7XyhcInJlc3VsdHMubGFiZWxzLnBlbmFsdHlcIil9OiBgIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7IGhlYWRfanVkZ2Vfc2NvcmVcbiAgICAgICAgICAgICAgICAgICAgPyAgaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoKVxuICAgICAgICAgICAgICAgICAgICA6IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoW1wicm9zZmFyci5hY3JvXCIsIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFzX2Fjcm9fb3ZlcnJpZGVzID0gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MuZmluZEluZGV4KFxuICAgICAgICAgICAgZWxlbWVudCA9PiBlbGVtZW50LnNjb3JlICE9PSBlbGVtZW50Lm9yaWdpbmFsX3Njb3JlXG4gICAgICAgICkgPiAwO1xuICAgICAgICBjb25zdCBhY3JvX2NlbGxfd2lkdGggPSBgJHsoMTAwIC8gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MubGVuZ3RoKX0lYDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NfdmVyYm9zZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH06XG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYWNyby10YWJsZVwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLm9yaWdpbmFsX3Njb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlcyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8uc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NGd1Njb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKTtcbiAgICAgICAgY29uc3Qgc19zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyBgOiAke3Bfc2NvcmV9IC8gJHtzX3Njb3JlfWAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcF9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IHNfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5hY3JvX3Njb3JlXCIpIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7IGA6ICR7cF9zY29yZX0gLyAke3Nfc2NvcmV9YCB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIil9OiAke3RoaXMucHJvcHMucm93LnJ1bi50b3RhbF9zY29yZX1gIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPGVtPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5ub3RfcGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2VtPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlck5leHRUb3VyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpfTogYCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgICAgICA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKVxuICAgICAgICAgICAgICAgICAgICA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiaW5mby1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0aWNpcGFudEluZm8oKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRKdWRnZVBlbmFsdHkoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQW1DbGFzc0Z3U2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0VG91ckxhYmVsKCkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkluZm9DZWxsLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19JbmZvQ2VsbFwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U2NvcmUoc2NvcmUsIHRlbXBsYXRlPVwiJFwiKSB7XG4gICAgaWYgKHNjb3JlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIuKAlFwiO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCIkXCIsIHNjb3JlKVxuICAgICAgICAucmVwbGFjZShcIkBcIiwgc2NvcmUudG9GaXhlZCgxKSk7XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xuXG5pbXBvcnQgSW5mb0NlbGwgZnJvbSBcIi4vSW5mb0NlbGxcIjtcbmltcG9ydCBBY3JvU2NvcmUgZnJvbSBcIi4vQWNyb1Njb3JlXCI7XG5pbXBvcnQgRGFuY2VTY29yZSBmcm9tIFwiLi9EYW5jZVNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uQWNyb1Njb3JlIGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9TY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0Zvcm1hdGlvblNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NlX3RvdGFsX3Njb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclNjb3JlKGRpc2NpcGxpbmVfanVkZ2UsIHNjb3JlKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAmbWRhc2g7XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgU2NvcmVDb21wb25lbnQgPSBudWxsO1xuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSk7XG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYW5jZVwiOlxuICAgICAgICBjYXNlIFwiZGFuY2VfaGFsdmVkXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IERhbmNlU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFjcm9cIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gQWNyb1Njb3JlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gRm9ybWF0aW9uU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IEZvcm1hdGlvbkFjcm9TY29yZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgIHJvdzogdGhpcy5wcm9wcy5yb3csXG4gICAgICAgICAgICBzY29yaW5nVHlwZTogc2NvcmluZ190eXBlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNjb3JlQ29tcG9uZW50IHsgLi4ucHJvcHMgfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJKdWRnZXNTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMubWFwKHNjb3JlID0+IFtzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzY29yZV0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluZURpc2NpcGxpbmVKdWRnZXMubWFwKChkaiwgaWR4KSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGRqID8gZGouaWQgOiBgSSR7aWR4fWAgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUoZGosIHNjb3Jlc19tYXAuZ2V0KGRqLmlkKSkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDxJbmZvQ2VsbFxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwIH1cbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5yb3cgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJKdWRnZXNTY29yZXMoKSB9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19Sb3dcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5pbXBvcnQgQ29sdW1uc1dpZHRocyBmcm9tIFwiLi9Db2x1bW5zV2lkdGhzXCI7XHJcblxyXG5pbXBvcnQgZ2V0SnVkZ2VUYWJsZU1hcmsgZnJvbSBcImdldEp1ZGdlVGFibGVNYXJrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZXM6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgbmV4dF90b3VyX2lkOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XHJcbiAgICAgICAgZG9jeFxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcInBhZGRpbmdcIiwgXCIwIDNwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duXCIsIFwid2lkdGhcIiwgXCI1MHB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmVfanVkZ2VzID0gdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKFxyXG4gICAgICAgICAgICBkaiA9PiBbXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIl0uaW5kZXhPZihkai5yb2xlKSA+PSAwKTtcclxuICAgICAgICBjb25zdCB3aWR0aHMgPSBuZXcgQ29sdW1uc1dpZHRocyhsaW5lX2p1ZGdlcy5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGRqc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLm1hcChkaiA9PiBbZGouaWQsIGRqXSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlJlc3VsdHNUYWJsZTNcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuSW5mb1N0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGluZV9qdWRnZXMubWFwKGRqID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBnZXRKdWRnZVRhYmxlTWFyayhkaikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudGFibGUubWFwKHJvdyA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyByb3cucnVuLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlcz17IGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9eyByb3cgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlc3VsdHNUYWJsZTMuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzXCI7XHJcbiIsInZhciBDYWNoZU1peGluID0gQmFzZSA9PiBjbGFzcyBleHRlbmRzIEJhc2Uge1xuICAgIHJlc2V0Q2FjaGUoKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgIH1cbiAgICBmZXRjaEZyb21DYWNoZShrZXksIGdlbmVyYXRvcikge1xuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jYWNoZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBnZW5lcmF0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVba2V5XTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWNoZU1peGluO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnREaXNwbGF5KHBhcnRpY2lwYW50KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZGlzcGxheS1uYW1lXHJcbiAgICBpZiAocGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgIHsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJ0aWNpcGFudC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+XHJcbiAgICAgICAgPHAga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgIHsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICBzd2l0Y2ggKGRpc2NpcGxpbmVfanVkZ2Uucm9sZSkge1xyXG4gICAgY2FzZSBcImRhbmNlX2p1ZGdlXCI6XHJcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvblwiO1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvbl9hY3JvXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuc2ltcGxpZmllZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJzaW1wbGlmaWVkXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlX2hhbHZlZFwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcImFjcm9fanVkZ2VcIjpcclxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9md1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZV9oYWx2ZWRcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJhY3JvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcInRlY2hfanVkZ2VcIjpcclxuICAgICAgICByZXR1cm4gXCJ0ZWNoXCI7XHJcbiAgICBjYXNlIFwiaGVhZF9qdWRnZVwiOlxyXG4gICAgICAgIHJldHVybiBcImhlYWRcIjtcclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiBnZXRKdWRnZVRhYmxlTWFyayhkaXNjaXBsaW5lX2p1ZGdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGRpc2NpcGxpbmVfanVkZ2UuanVkZ2UubnVtYmVyO1xuICAgIGlmIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSB7XG4gICAgICAgIHJlc3VsdCArPSBcIiAoQSlcIjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0SnVkZ2VUYWJsZU1hcms7XG4iLCJpbXBvcnQgdHJhbnNsYXRlX3J1IGZyb20gXCIuL3J1XCI7XHJcblxyXG5jb25zdCBfID0gdHJhbnNsYXRlX3J1XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCAuLi5hcmdzKSB7XHJcbiAgICBsZXQgUEhSQVNFUyA9IHtcclxuICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NsdWJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC60LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvblwiOiBcItCh0L7Qt9C00LDRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfZGlzY2lwbGluZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YNcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2p1ZGdlXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgdGD0LTRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF90b3VyXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X251bWJlcnNcIjogXCLQndC+0LzQtdGA0LAg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0XCI6IFwi0JjQvNC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibGF1bmNoX2F1dG9fcHJpbnRlclwiOiBcItCX0LDQv9GD0YHQuiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC5INC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0J/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0LLRgdC1INGD0YHRgtGA0L7QudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0J7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBg0JDQutGA0L7QsdCw0YLQuNC60LAgJHtuICsgMX1gLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhhc191bmNvbmZpcm1lZF9zY29yZXNcIjogXCLQmNC80LXRjtGC0YHRjyDQvdC10LfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L3Ri9C1INC+0YbQtdC90LrQuCDRgdGD0LTQtdC5INCyINC/0L7RgdC70LXQtNC90LXQvCDQt9Cw0YXQvtC00LUuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfc3RvcHdhdGNoXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcG9zaXRpb25cIjogXCLQmtC+0LzQv9C+0LfQuNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybV9mYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1fYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMylcIixcclxuICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wcmVzc2lvblwiOiBcItCe0LHRidC10LUg0LLQv9C10YfQsNGC0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfbnVtYmVyXCI6IChuKSA9PiBg0KHRg9C00YzRjyDihJYke259YCxcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9udW1iZXJcIjogKG4sIHQpID0+IGDQl9Cw0YXQvtC0ICR7bn0g0LjQtyAke3R9YCxcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmtfbm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkX25vdF9wZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlX3Njb3Jlc1wiOiBcItCe0YbQtdC90LrQuCDQu9C40L3QtdC50L3Ri9GFINGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZW5hbHR5X3R5cGVcIjogXCLQqNGC0YDQsNGE0L3Ri9C1INGB0LDQvdC60YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWxsb3dfY2FyZFwiOiBcIi0zXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1feWVsbG93X2NhcmRcIjogXCItNVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IGDQodCx0YDQvtGBINC90LAgJHtufWAsXHJcbiAgICAgICAgICAgICAgICBcInRpbWluZ1wiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhbmNpbmdcIjogXCLQotCw0L3QtdGGXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IGBBJHtufWAsXHJcbiAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjXCI6IFwi0JpcIixcclxuICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXHJcbiAgICAgICAgICAgICAgICBcImZkXCI6IFwi0J9cIixcclxuICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcclxuICAgICAgICAgICAgICAgIFwiaVwiOiBcItCe0JJcIixcclxuICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICBcInNtXCI6IFwi0JzQnlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0JjRgtC+0LNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25cIjogKG4sIG5hbWUsIG5fc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobl9zcCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGDQpNC+0YDQvNC10LnRiNC9IOKEliR7bn1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGA6ICR7bmFtZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobl9zcCA9PT0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBg0J/QsNGA0LAg4oSWJHtufWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBg0KPRh9Cw0YHRgtC90LjQuiDihJYke259YFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gYNCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJYke259YCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFzZV9uYW1lXCI6IFwi0KDQvtGB0KTQkNCg0KBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdlX3JvbGVzXCI6IHtcclxuICAgICAgICAgICAgXCJcIjogXCItXCIsXHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0YLQsNC90YbQsFwiLFxyXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHBhdGggPSBzcmMuc3BsaXQoXCIuXCIpO1xyXG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBwYXRoKSB7XHJcbiAgICAgICAgcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgJHtzcmN9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHBocmFzZV9wdHIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGhyYXNlX3B0cjtcclxufVxyXG5cclxudHJhbnNsYXRlLnRvdXJfbmFtZV9zdWdnZXN0aW9ucyA9IFtcclxuICAgIFwi0KTQuNC90LDQu1wiLFxyXG4gICAgXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICBcItCe0YLQsdC+0YDQvtGH0L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgXCIxLzIg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvNCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS84INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzE2INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgIFwi0KTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuXTtcclxuIiwiY29uc3QgbWV0YSA9IHtcbiAgICBcImp1ZGdlX3JvbGVzXCI6IFtcbiAgICAgICAgXCJkYW5jZV9qdWRnZVwiLFxuICAgICAgICBcImFjcm9fanVkZ2VcIixcbiAgICAgICAgXCJoZWFkX2p1ZGdlXCIsXG4gICAgICAgIFwidGVjaF9qdWRnZVwiLFxuICAgIF0sXG4gICAgXCJzY29yaW5nX3N5c3RlbXNcIjogW1xuICAgICAgICBcInJvc2ZhcnIubm9fYWNyb1wiLFxuICAgICAgICBcInJvc2ZhcnIuYWNyb1wiLFxuICAgICAgICBcInJvc2ZhcnIuZm9ybWF0aW9uXCIsXG4gICAgICAgIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiLFxuICAgICAgICBcInJvc2ZhcnIuc2ltcGxpZmllZFwiLFxuICAgICAgICBcInJvc2ZhcnIuYW1fZmluYWxfZndcIixcbiAgICAgICAgXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIixcbiAgICBdLFxuICAgIFwic3VnZ2VzdGVkX3Byb2dyYW1zXCI6IFtcbiAgICAgICAgXCJkZWZhdWx0XCIsXG4gICAgICAgIFwicXVhbGlmaWNhdGlvblwiLFxuICAgICAgICBcInF1YXJ0ZXJmaW5hbFwiLFxuICAgICAgICBcImZpbmFsXCIsXG4gICAgXSxcblxufVxuXG5leHBvcnQgZGVmYXVsdCBtZXRhO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuaW1wb3J0IFJlc3VsdHNUYWJsZTEgZnJvbSBcIlJlc3VsdHNUYWJsZTFcIjtcclxuaW1wb3J0IFJlc3VsdHNUYWJsZTIgZnJvbSBcIlJlc3VsdHNUYWJsZTJcIjtcclxuaW1wb3J0IFJlc3VsdHNUYWJsZTMgZnJvbSBcIlJlc3VsdHNUYWJsZTNcIjtcclxuaW1wb3J0IERpc2NpcGxpbmVSZXN1bHRzVGFibGUgZnJvbSBcIkRpc2NpcGxpbmVSZXN1bHRzVGFibGVcIjtcclxuaW1wb3J0IEp1ZGdlVGFibGV0IGZyb20gXCJKdWRnZVRhYmxldFwiO1xyXG5pbXBvcnQgQWRtaW5TY29yZUlucHV0IGZyb20gXCJBZG1pblNjb3JlSW5wdXRcIjtcclxuaW1wb3J0IGdldEp1ZGdlVGFibGVNYXJrIGZyb20gXCJnZXRKdWRnZVRhYmxlTWFya1wiO1xyXG5pbXBvcnQgbWV0YSBmcm9tIFwibWV0YVwiO1xyXG5cclxuaW1wb3J0IHsgc2V0dXAgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcclxuXHJcbmNvbnN0IHJlc3BvbnNlID0gd2luZG93LnJlZ2lzdGVyUnVsZXNTZXQoXCJSb3NGQVJSXCIsIHtcclxuICAgIG1ldGE6IG1ldGEsXHJcbiAgICB0cmFuc2xhdGU6IF8sXHJcbiAgICB0b3VyX3Jlc3VsdHNfdGFibGVfMTogUmVzdWx0c1RhYmxlMSxcclxuICAgIHRvdXJfcmVzdWx0c190YWJsZV8yOiBSZXN1bHRzVGFibGUyLFxyXG4gICAgdG91cl9yZXN1bHRzX3RhYmxlXzM6IFJlc3VsdHNUYWJsZTMsXHJcbiAgICBkaXNjaXBsaW5lX3Jlc3VsdHNfdGFibGU6IERpc2NpcGxpbmVSZXN1bHRzVGFibGUsXHJcbiAgICBqdWRnZV90YWJsZXQ6IEp1ZGdlVGFibGV0LFxyXG4gICAgYWRtaW5fc2NvcmVfaW5wdXQ6IEFkbWluU2NvcmVJbnB1dCxcclxuICAgIGdldF9qdWRnZV90YWJsZV9tYXJrOiBnZXRKdWRnZVRhYmxlTWFyayxcclxufSk7XHJcblxyXG5zZXR1cChyZXNwb25zZSk7XHJcbiJdfQ==
