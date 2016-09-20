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
var TourResults = exports.TourResults = null;
var DisciplineResults = exports.DisciplineResults = null;

function setup(data) {
    exports.Api = Api = data.Api;
    exports.message_dispatcher = message_dispatcher = data.message_dispatcher;
    exports.storage = storage = data.storage;
    exports.TourResults = TourResults = data.TourResults;
    exports.DisciplineResults = DisciplineResults = data.DisciplineResults;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcbGliXFxjb21tb25cXGRpYWxvZ3NcXHNob3dDb25maXJtLmpzeCIsInNyY1xcanN4XFxsaWJcXGNvbW1vblxcbWFrZUNsYXNzTmFtZS5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXEludGVnZXJJbnB1dC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXE51bWJlclNlbGVjdG9ySW5wdXQuanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxTZWxlY3RvcklucHV0XFxJdGVtLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcU2VsZWN0b3JJbnB1dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxTbGlkZXIuanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxvblRvdWNoRW5kT3JDbGljay5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXG9uVG91Y2hPckNsaWNrLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcQWNyb1Njb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcQ29uZmlybWF0aW9uQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcRGFuY2VIYWx2ZWRTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXERhbmNlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxGb3JtYXRpb25BY3JvU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxGb3JtYXRpb25TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEdlbmVyYWxFZGl0b3JcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxHZW5lcmFsRWRpdG9yXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEhlYWRKdWRnZUZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcSGVhZEp1ZGdlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxTaW1wbGlmaWVkU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxUZWNoSnVkZ2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXGdlblNjYWxlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXERpc2NpcGxpbmVSZXN1bHRzVGFibGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEhvc3RNb2R1bGVzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcRWxlbWVudHNcXEVsZW1lbnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxFbGVtZW50c1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxDb25maXJtYXRpb25CdXR0b24uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUhhbHZlZExheW91dFxcU2NvcmluZ0xheW91dFxcTWlzdGFrZXMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUhhbHZlZExheW91dFxcU2NvcmluZ0xheW91dFxcU2NvcmVQYXJ0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9vdGVyXFxGb290ZXJJdGVtLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9vdGVyXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uQWNyb0xheW91dFxcU2NvcmluZ0xheW91dFxcU2NvcmVQYXJ0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uQWNyb0xheW91dFxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxTY29yZVBhcnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcR2VuZXJhbExheW91dFxcUGFydGljaXBhbnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHZW5lcmFsTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdlbmVyYWxTY2FsZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdyaWQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEFjdGlvbnNQYWdlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXEFjcm9iYXRpY092ZXJyaWRlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTGluZUp1ZGdlc1Njb3Jlc1xcSXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxMaW5lSnVkZ2VzU2NvcmVzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxOb3RQZXJmb3JtZWRTd2l0Y2hcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXFBlbmFsdHlJbnB1dC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxQcmV2aW91c1BlbmFsdGllc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcVGVjaEp1ZGdlc1Njb3Jlc1xcSXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxUZWNoSnVkZ2VzU2NvcmVzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcUmVzdWx0c1BhZ2UuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZGVyLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcU2ltcGxpZmllZExheW91dFxcU2NvcmluZ0xheW91dC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcQWNyb1BhZ2VcXFNjb3JpbmdMYXlvdXRcXEVsZW1lbnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxTY29yaW5nTGF5b3V0XFxPdmVycmlkZUlucHV0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcRGFuY2luZ1BhZ2VcXFNjb3JpbmdMYXlvdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxTdG9wV2F0Y2guanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUb3RhbFNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTFcXFJvdy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlMVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTJcXENvbHVtbnNXaWR0aHMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTJcXFJvdy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlMlxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTNcXENvbHVtbnNXaWR0aHMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTNcXFJvd1xcQWNyb1Njb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXERhbmNlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTNcXFJvd1xcRm9ybWF0aW9uQWNyb1Njb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEluZm9DZWxsLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXGZvcm1hdFNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxDYWNoZU1peGluLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxjb21tb25cXGdldFBhcnRpY2lwYW50RGlzcGxheS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxnZXRTY29yaW5nVHlwZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcZ2V0SnVkZ2VUYWJsZU1hcmsuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGwxMG5cXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxsMTBuXFxydS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcbWV0YS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxccm9vdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7a0JDRWUsVUFBQyxPQUFELEVBQVUsTUFBVixFQUE2QztRQUEzQix5RUFBaUIscUJBQVU7O0FBQ3hELFdBQU8sS0FBSztBQUNSLGVBQU8sT0FBUDtBQUNBLG1CQUFXLEtBQVg7QUFDQSwwQkFBa0IsSUFBbEI7QUFDQSwyQkFBbUIsb0JBQUUsbUJBQUYsQ0FBbkI7QUFDQSwwQkFBa0Isb0JBQUUsa0JBQUYsQ0FBbEI7QUFDQSx3QkFBZ0IsZ0JBQWhCO0tBTkcsRUFPSixNQVBJLENBQVAsQ0FEd0Q7Q0FBN0M7Ozs7Ozs7O2tCQ0ZTO0FBQVQsU0FBUyxhQUFULENBQXVCLElBQXZCLEVBQTZCO0FBQ3hDLFdBQU8sT0FBTyxJQUFQLENBQVksSUFBWixFQUNGLE1BREUsQ0FDSztlQUFNLEtBQUssRUFBTDtLQUFOLENBREwsQ0FFRixJQUZFLENBRUcsR0FGSCxDQUFQLENBRHdDO0NBQTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0lNOzs7Ozs7Ozs7Ozs7Ozs4TUFpQmpCLGNBQWMsWUFBTTtBQUNoQixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLHVCQURxQjthQUF6QjtBQUdBLGdCQUFJLE1BQUssS0FBTCxDQUFXLFVBQVgsRUFBdUI7QUFDdkIsc0JBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsRUFBQyxTQUFTLENBQUMsQ0FBRCxFQUE5QixF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LDRCQUFjLElBQWQsQ0FBUCxDQURrQztLQUF0QztBQUdBLFdBQU8sVUFBUCxDQWxONEM7Q0FBakM7O0FBcU5mLFVBQVUscUJBQVYsR0FBa0MsQ0FDOUIsT0FEOEIsRUFFOUIsZUFGOEIsRUFHOUIsZ0JBSDhCLEVBSTlCLFlBSjhCLEVBSzlCLFlBTDhCLEVBTTlCLFlBTjhCLEVBTzlCLGFBUDhCLEVBUTlCLG9CQVI4QixFQVM5QixtQkFUOEIsQ0FBbEM7Ozs7Ozs7O0FDck5BLElBQU0sT0FBTztBQUNULG1CQUFlLENBQ1gsYUFEVyxFQUVYLFlBRlcsRUFHWCxZQUhXLEVBSVgsWUFKVyxDQUFmO0FBTUEsdUJBQW1CLENBQ2YsaUJBRGUsRUFFZixjQUZlLEVBR2YsbUJBSGUsRUFJZix3QkFKZSxFQUtmLG9CQUxlLEVBTWYscUJBTmUsRUFPZix1QkFQZSxDQUFuQjtBQVNBLDBCQUFzQixDQUNsQixTQURrQixFQUVsQixlQUZrQixFQUdsQixjQUhrQixFQUlsQixPQUprQixDQUF0Qjs7Q0FoQkU7O2tCQXlCUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmYsSUFBTSxXQUFXLE9BQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUM7QUFDaEQsd0JBRGdEO0FBRWhELDZCQUZnRDtBQUdoRCxnREFIZ0Q7QUFJaEQsZ0RBSmdEO0FBS2hELGdEQUxnRDtBQU1oRCw4REFOZ0Q7QUFPaEQsdUNBUGdEO0FBUWhELGdEQVJnRDtBQVNoRCxxREFUZ0Q7Q0FBbkMsQ0FBWDs7QUFZTix3QkFBTSxRQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChtZXNzYWdlLCBhY3Rpb24sIGNsb3NlX29uX2NvbmZpcm09ZmFsc2UpID0+IHtcbiAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKSxcbiAgICAgICAgY2xvc2VPbkNvbmZpcm06IGNsb3NlX29uX2NvbmZpcm0sXG4gICAgfSwgYWN0aW9uKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VDbGFzc05hbWUoZGF0YSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgICAuZmlsdGVyKGNuID0+IGRhdGFbY25dKVxuICAgICAgICAuam9pbihcIiBcIik7XG59XG4iLCJpbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcblxuaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCIuL29uVG91Y2hPckNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVnZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBQVC5ib29sLFxuICAgICAgICAgICAgdmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1pbnVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2Uoe1wiZGVsdGFcIjogLTF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy52YWx1ZSAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVBsdXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XCJkZWx0YVwiOiAxfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XG4gICAgICAgICAgICBcIkludGVnZXJJbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJyZWFkLW9ubHlcIjogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5nZXRDbGFzc05hbWUoKSB9PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlTWludXMpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVBsdXMpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5JbnRlZ2VySW5wdXQuZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9JbnRlZ2VySW5wdXRcIjtcbiIsImltcG9ydCBTZWxlY3RvcklucHV0IGZyb20gXCIuL1NlbGVjdG9ySW5wdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyU2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4OiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1pbjogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzdGVwOiBQVC5udW1iZXIsXG4gICAgICAgICAgICBkZWNpbWFsU2l6ZTogUFQubnVtYmVyLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICBkZWNpbWFsU2l6ZTogMCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBtYWtlQ2hvaWNlcyhtaW4sIG1heCwgc3RlcCwgZGVjaW1hbF9zaXplKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgPSBtaW47IHZhbHVlIDw9IG1heDsgdmFsdWUgKz0gc3RlcCkge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHZhbHVlLnRvRml4ZWQoZGVjaW1hbF9zaXplKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtOdW1iZXIodGV4dCksIHRleHRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgc3RlcCwgZGVjaW1hbFNpemUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5tYWtlQ2hvaWNlcyhtaW4sIG1heCwgc3RlcCwgZGVjaW1hbFNpemUpIH1cbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbk51bWJlclNlbGVjdG9ySW5wdXQuZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9OdW1iZXJTZWxlY3RvcklucHV0XCI7XG4iLCJpbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcIi4uL29uVG91Y2hPckNsaWNrXCI7XG5cbmltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmU6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0ZXh0OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgIFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgb25DbGljazogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwidGJ0blwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzY29yZS1idG5cIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRoaXMucHJvcHMuYWN0aXZlLFxuICAgICAgICAgICAgXCJyZWFkLW9ubHlcIjogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH1cbiAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlQ2xpY2spIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudGV4dCB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkl0ZW0uZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9TZWxlY3RvcklucHV0X0l0ZW1cIjtcbiIsImltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNob2ljZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgUFQub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbCxcbiAgICAgICAgICAgIHJvd1NpemU6IFBULm51bWJlcixcbiAgICAgICAgICAgIHN0eWxlOiBQVC5vbmVPZihbXCJncmlkXCIsIFwib25lLWxpbmVcIiwgXCJ0d28tbGluZXNcIl0pLFxuICAgICAgICAgICAgdmFsdWU6IFBULm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBvbkNoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIHJvd1NpemU6IDEwLFxuICAgICAgICAgICAgc3R5bGU6IFwib25lLWxpbmVcIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRCdXR0b25zQ291bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm93U2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwiU2VsZWN0b3JJbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJvbmUtcm93XCI6IHRoaXMucHJvcHMuc3R5bGUgIT09IFwidHdvLWxpbmVzXCIsXG4gICAgICAgICAgICBcInR3by1yb3dzXCI6IHRoaXMucHJvcHMuc3R5bGUgPT09IFwidHdvLWxpbmVzXCIsXG4gICAgICAgICAgICBcInNlbGVjdGVkXCI6IHRoaXMucHJvcHMudmFsdWUgIT09IG51bGwsXG4gICAgICAgICAgICBbYG4tJHt0aGlzLmdldEJ1dHRvbnNDb3VudCgpfWBdOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiICYmXG4gICAgICAgICAgICAgICAgaWR4ICE9PSAwICYmXG4gICAgICAgICAgICAgICAgaWR4ICUgdGhpcy5wcm9wcy5yb3dTaXplID09PSAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGJyIGtleT17IGBiciR7aWR4fWAgfSAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHRleHRdID0gdGhpcy5wcm9wcy5jaG9pY2VzW2lkeF07XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU9eyB2YWx1ZSA9PT0gdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIGtleT17IGlkeCB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgIHRleHQ9eyB0ZXh0IH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnByb3BzLm9uQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2VsZWN0b3JJbnB1dC5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX1NlbGVjdG9ySW5wdXRcIjtcbiIsImltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCAgY2xhc3MgU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb25lOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBkb25lVGV4dDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzbGlkZVRleHQ6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25BY3RpdmF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBpbiA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvbmUgJiYgbmV4dFByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNGcmVlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcbiAgICB9XG5cbiAgICBnZXRPdXRlclRleHRPcGFjaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5taW4oTWF0aC5tYXgoMTAwIC0gdGhpcy5zdGF0ZS5wb3NpdGlvbiwgMCksIDEwMCk7XG4gICAgICAgIHJldHVybiAodmFsdWUgLyAxMDApLnRvRml4ZWQoMyk7XG4gICAgfVxuICAgIGdldEVsZW1lbnRPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICBsZXQgcmVzID0gMDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJlcyArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZ2V0VG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0UmVsYXRpdmVUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0U2xpZGVyUG9zKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldFRvdWNoKGV2ZW50KSAtIHRoaXMucGluO1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgMjAwKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICB9XG4gICAgaGFuZGxlVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBpbiA9IHRoaXMuZ2V0UmVsYXRpdmVUb3VjaChldmVudCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgICAgIHRvdWNoOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZVRvdWNoRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRleHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXsgeyBjb2xvcjogXCJyZ2IoMTAwLDEwMCwxMDApXCIgfSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IG1ha2VDbGFzc05hbWUoeyBcInNsaWRlLXRleHRcIiA6IHRydWUsIFwiZnJlZVwiOiB0aGlzLmlzRnJlZSgpIH0pIH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7IGNvbG9yOiBgcmdiYSgxMDAsMTAwLDEwMCwke3RoaXMuZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpfSlgIH0gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlNsaWRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgbWFrZUNsYXNzTmFtZSh7IFwiaW5uZXJcIjogdHJ1ZSwgXCJmcmVlXCI6IHRoaXMuaXNGcmVlKCkgfSkgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHsgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IGAke3RoaXMuc3RhdGUucG9zaXRpb259cHhgIH0gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGljayB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9eyB0aGlzLmhhbmRsZVRvdWNoRW5kIH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9eyB0aGlzLmhhbmRsZVRvdWNoTW92ZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMuaGFuZGxlVG91Y2hTdGFydCB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICDihpJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVGV4dCgpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2xpZGVyLmRpc3BsYXlOYW1lID0gXCJ0YWJsZXRfdWlfU2xpZGVyXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvblRvdWNoRW5kT3JDbGljayhoYW5kbGVyKSB7XG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcbiAgICB9XG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgfVxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XG4gICAgICAgICAgICBkaXNjYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvblRvdWNoT3JDbGljayhoYW5kbGVyKSB7XG4gICAgbGV0IGYgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBmLFxuICAgICAgICBvbkNsaWNrOiBmLFxuICAgIH1cbn1cbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9uczogUFQuYXJyYXlPZihQVC5udW1iZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWlzdGFrZXM6ICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IHJlZHVjdGlvbnMgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5zbGljZSgpOyAvLyBjbG9uZVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgICAgICAgaWYgKGtleVswXSA9PT0gXCJBXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzX3ZhbCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICByZWR1Y3Rpb25zW3BhcnNlSW50KGtleS5zbGljZSgxKSldID0gc192YWwgPT09IFwiXCIgPyAtMSA6IHBhcnNlSW50KHNfdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHJlZHVjdGlvbnM6IHJlZHVjdGlvbnMsXG4gICAgICAgICAgICBtaXN0YWtlczogICBwYXJzZUludChkYXRhLm1pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgocmVkLCBpZHgpID0+ICh7XG4gICAgICAgICAgICBrZXk6IGBBJHtpZHh9YCxcbiAgICAgICAgICAgIGxhYmVsOiBgQSR7aWR4ICsgMX06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnNbaWR4XSA9PT0gbnVsbFxuICAgICAgICAgICAgICAgID8gXCJcIlxuICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnNbaWR4XS50b1N0cmluZygpLFxuICAgICAgICB9KSk7XG4gICAgICAgIGZpZWxkcy5wdXNoKHRoaXMubWFrZUZpZWxkKFwibWlzdGFrZXNcIiwgXCJGRFwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgeyBtYXg6IDEwMCB9KSkpXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IGZpZWxkcyB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRhbmNlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0RhbmNlU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1hdGlvbkJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uZmlybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBcImNvbmZpcm1hdGlvbi1idXR0b25cIjtcbiAgICAgICAgcmVzdWx0ICs9IHRoaXMucHJvcHMuY29uZmlybWVkID8gXCIgY29uZmlybWVkXCIgOiBcIiBub3QtY29uZmlybWVkXCI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm1hdGlvblRvZ2dsZSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNvbmZpcm1lZFxuICAgICAgICAgICAgICAgICAgICA/IF8oXCJhZG1pbi5idXR0b25zLnVuY29uZmlybV9zY29yZVwiKVxuICAgICAgICAgICAgICAgICAgICA6IF8oXCJhZG1pbi5idXR0b25zLmNvbmZpcm1fc2NvcmVcIikgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Db25maXJtYXRpb25CdXR0b24uZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2VIYWx2ZWRTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmd193b21hbjogICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZndfbWFuOiAgICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbjogICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBmd193b21hbjogICAgICAgZGF0YVtcImZ3X3dvbWFuXCJdICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5md193b21hbiksXG4gICAgICAgICAgICBmd19tYW46ICAgICAgICAgZGF0YVtcImZ3X21hblwiXSAgICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5md19tYW4pLFxuICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIGRhdGFbXCJkYW5jZV9maWdzXCJdICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfZmlncyksXG4gICAgICAgICAgICBjb21wb3NpdGlvbjogICAgZGF0YVtcImNvbXBvc2l0aW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5jb21wb3NpdGlvbiksXG4gICAgICAgICAgICBzbWFsbF9taXN0YWtlczogcGFyc2VJbnQoZGF0YS5zbWFsbF9taXN0YWtlcyksXG4gICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5iaWdfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJmd193b21hblwiLCAgICAgICBcIkZXXCIsIGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZndfbWFuXCIsICAgICAgICAgXCJGTVwiLCBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIikpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX2ZpZ3NcIiwgICAgIFwiREZcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTIuNSwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJjb21wb3NpdGlvblwiLCAgICBcIkNcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCAgIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwic21hbGxfbWlzdGFrZXNcIiwgXCJTTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImJpZ19taXN0YWtlc1wiLCAgIFwiQk1cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VIYWx2ZWRTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfRGFuY2VIYWx2ZWRTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmd193b21hbjogICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZndfbWFuOiAgICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbjogICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBmd193b21hbjogICAgICAgZGF0YVtcImZ3X3dvbWFuXCJdICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuZndfd29tYW4pLFxuICAgICAgICAgICAgZndfbWFuOiAgICAgICAgIGRhdGFbXCJmd19tYW5cIl0gICAgICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLmZ3X21hbiksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgZGF0YVtcImRhbmNlX2ZpZ3NcIl0gID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuZGFuY2VfZmlncyksXG4gICAgICAgICAgICBjb21wb3NpdGlvbjogICAgZGF0YVtcImNvbXBvc2l0aW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuY29tcG9zaXRpb24pLFxuICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IHBhcnNlSW50KGRhdGEuc21hbGxfbWlzdGFrZXMpLFxuICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEuYmlnX21pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZndfd29tYW5cIiwgICAgICAgXCJGV1wiLCBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIikpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImZ3X21hblwiLCAgICAgICAgIFwiRk1cIiwgZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV9maWdzXCIsICAgICBcIkRGXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDI1IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJjb21wb3NpdGlvblwiLCAgICBcIkNcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDIwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJzbWFsbF9taXN0YWtlc1wiLCBcIlNNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiYmlnX21pc3Rha2VzXCIsICAgXCJCTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EYW5jZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9EYW5jZVNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfdGVjaDogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXByZXNzaW9uOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGFjcm9iYXRpY3M6ICAgICBkYXRhW1wiYWNyb2JhdGljc1wiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuYWNyb2JhdGljcyksXG4gICAgICAgICAgICBkYW5jZV90ZWNoOiAgICAgZGF0YVtcImRhbmNlX3RlY2hcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmRhbmNlX3RlY2gpLFxuICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIGRhdGFbXCJkYW5jZV9maWdzXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGltcHJlc3Npb246ICAgICBkYXRhW1wiaW1wcmVzc2lvblwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuaW1wcmVzc2lvbiksXG4gICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5iaWdfbWlzdGFrZXMpLFxuICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IHBhcnNlSW50KGRhdGEuc21hbGxfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJhY3JvYmF0aWNzXCIsICAgICBcIkFcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX3RlY2hcIiwgICAgIFwiRFRcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfZmlnc1wiLCAgICAgXCJERlwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJpbXByZXNzaW9uXCIsICAgICBcIklcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInNtYWxsX21pc3Rha2VzXCIsIFwiU01cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJiaWdfbWlzdGFrZXNcIiwgICBcIkJNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkZvcm1hdGlvblNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9Gb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybWF0aW9uU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfdGVjaDogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wcmVzc2lvbjogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWlzdGFrZXM6ICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBkYW5jZV90ZWNoOiBkYXRhW1wiZGFuY2VfdGVjaFwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfdGVjaCksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiBkYXRhW1wiZGFuY2VfZmlnc1wiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfZmlncyksXG4gICAgICAgICAgICBpbXByZXNzaW9uOiBkYXRhW1wiaW1wcmVzc2lvblwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuaW1wcmVzc2lvbiksXG4gICAgICAgICAgICBtaXN0YWtlczogICBwYXJzZUludChkYXRhLnNtYWxsX21pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfdGVjaFwiLCBcIkRUXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX2ZpZ3NcIiwgXCJERlwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJpbXByZXNzaW9uXCIsIFwiSVwiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwibWlzdGFrZXNcIiwgICBcIk1cIiwgIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkZvcm1hdGlvblNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9Gb3JtYXRpb25TY29yZVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmllbGQ6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAga2V5OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICBQVC5hcnJheU9mKFBULnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMuZmllbGQua2V5LCBldmVudC50YXJnZXQudmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlclZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjb3JlLXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhZC1vbmx5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZmllbGQub3B0aW9ucy5maW5kKG8gPT4gb1swXSA9PT0gdGhpcy5wcm9wcy52YWx1ZSlbMV0gfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NvcmUtdmFsdWVcIj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmZpZWxkLm9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbdmFsdWUsIGxhYmVsXSA9IG9wdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9eyB2YWx1ZSB9IHZhbHVlPXsgdmFsdWUgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsYWJlbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KSB9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY29yZS1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZmllbGQubGFiZWwgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJWYWx1ZSgpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSXRlbS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfR2VuZXJhbEVkaXRvcl9JdGVtXCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxFZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpZWxkczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULmFycmF5T2YoUFQuc3RyaW5nLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICBsZXQgaW5pdGlhbF92YWx1ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIHRoaXMucHJvcHMuZmllbGRzKSB7XG4gICAgICAgICAgICBpbml0aWFsX3ZhbHVlc1tmLmtleV0gPSBmLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdmFsdWVzOiBpbml0aWFsX3ZhbHVlcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS52YWx1ZXMpO1xuICAgICAgICB2YWx1ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWVzIH0pO1xuICAgIH1cbiAgICBoYW5kbGVEaXNjYXJkQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25EaXNjYXJkKCk7XG4gICAgfVxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh0aGlzLnN0YXRlLnZhbHVlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyQnV0dG9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZURpc2NhcmRDbGljayB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmJ1dHRvbnMuY2xvc2VcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3VibWl0LWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmJ1dHRvbnMuc3VibWl0XCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRpc2NhcmQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZURpc2NhcmRDbGljayB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwuYnV0dG9ucy5kaXNjYXJkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNjb3JlLWVkaXRvclwiXG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmllbGRzXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5maWVsZHMubWFwKChmLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkPXsgZiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgZi5rZXkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnN0YXRlLnZhbHVlc1tmLmtleV0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbnMoKSB9XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5HZW5lcmFsRWRpdG9yLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9HZW5lcmFsRWRpdG9yXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHRvdXI6IFBULmJvb2wsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBlbmFsdHk6ICBwYXJzZUludChkYXRhLnBlbmFsdHkpLFxuICAgICAgICAgICAgbmV4dHRvdXI6IGRhdGEubmV4dHRvdXIgPT09IFwidHJ1ZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwZW5hbHR5XCIsIFwiUFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCIwXCIsIFwiT0tcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItNVwiLCBcIi01XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTE1XCIsIFwiLTE1XCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJuZXh0dG91clwiLCBcIk5UXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcImZhbHNlXCIsIFwiTm9cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJ0cnVlXCIsICBcIlllc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkhlYWRKdWRnZUZvcm1hdGlvblNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9IZWFkSnVkZ2VGb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRKdWRnZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmFsdHk6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHR0b3VyOiBQVC5ib29sLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBwZW5hbHR5OiAgcGFyc2VJbnQoZGF0YS5wZW5hbHR5KSxcbiAgICAgICAgICAgIG5leHR0b3VyOiBkYXRhLm5leHR0b3VyID09PSBcInRydWVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwicGVuYWx0eVwiLCBcIlBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiMFwiLCBcIk9LXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTNcIiwgXCItM1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0zMFwiLCBcIi0zMFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0xMDBcIiwgXCItMTAwXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJuZXh0dG91clwiLCBcIk5UXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcImZhbHNlXCIsIFwiTm9cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJ0cnVlXCIsICBcIlllc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkhlYWRKdWRnZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9IZWFkSnVkZ2VTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxpZmllZFNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBwb2ludHM6IGRhdGFbXCJwb2ludHNcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5wb2ludHMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwb2ludHNcIiwgXCJTXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtaW46IDEsIG1heDogNDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TaW1wbGlmaWVkU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX1NpbXBsaWZpZWRTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVjaEp1ZGdlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAganVtcF9zdGVwczogICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltaW5nX3Zpb2xhdGlvbjogUFQuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAganVtcF9zdGVwczogICAgICAgcGFyc2VJbnQoZGF0YS5qdW1wX3N0ZXBzKSxcbiAgICAgICAgICAgIHRpbWluZ192aW9sYXRpb246IGRhdGEudGltaW5nX3Zpb2xhdGlvbiA9PT0gXCJcIiA/IG51bGwgOiBkYXRhLnRpbWluZ192aW9sYXRpb24gPT09IFwidHJ1ZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJqdW1wX3N0ZXBzXCIsIFwiSlNcIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInRpbWluZ192aW9sYXRpb25cIiwgXCJUXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIlwiLCAgICAgIFwiP1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcImZhbHNlXCIsIFwi4pyTXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1widHJ1ZVwiLCAgXCLinJdcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblRlY2hKdWRnZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9UZWNoSnVkZ2VTY29yZVwiO1xuIiwiZnVuY3Rpb24gZ2VuU2NhbGUodHlwZSwgdXNlcl9wYXJhbXMpIHtcbiAgICBjb25zdCBvcHRpb25hbCA9IHR5cGVbMF0gPT09IFwiP1wiO1xuICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICB0eXBlID0gdHlwZS5zbGljZSgxKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJyZWR1Y3Rpb25cIjpcbiAgICAgICAgcmVzdWx0ID0gWzEwMCwgNzUsIDUwLCAyNSwgMTAsIDUsIDBdLm1hcChcbiAgICAgICAgICAgIHMgPT4gW3MudG9TdHJpbmcoKSwgYC0ke3N9JWBdXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJudW1iZXJzXCI6XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgIH0sIHVzZXJfcGFyYW1zKTtcbiAgICAgICAgY29uc3QgZnJhY3Rpb25fc2l6ZSA9IE1hdGguYWJzKHBhcmFtcy5zdGVwIC0gTWF0aC5yb3VuZChwYXJhbXMuc3RlcCkpIDwgMWUtNSA/IDAgOiAxO1xuICAgICAgICBmb3IgKGxldCBzY29yZSA9IHBhcmFtcy5taW47IHNjb3JlIDwgKHBhcmFtcy5tYXggKyAxZS01KTsgc2NvcmUgKz0gcGFyYW1zLnN0ZXApIHtcbiAgICAgICAgICAgIGNvbnN0IHN0ciA9IHNjb3JlLnRvRml4ZWQoZnJhY3Rpb25fc2l6ZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChbc3RyLCBzdHJdKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIHNjYWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgIHJlc3VsdCA9IFtbXCJcIiwgXCLigJRcIl1dLmNvbmNhdChyZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5TY2FsZTtcbiIsImltcG9ydCBnZXRTY29yaW5nVHlwZSBmcm9tIFwiY29tbW9uL2dldFNjb3JpbmdUeXBlXCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIi4vQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5pbXBvcnQgQWNyb1Njb3JlIGZyb20gXCIuL0Fjcm9TY29yZVwiO1xuaW1wb3J0IERhbmNlU2NvcmUgZnJvbSBcIi4vRGFuY2VTY29yZVwiO1xuaW1wb3J0IERhbmNlSGFsdmVkU2NvcmUgZnJvbSBcIi4vRGFuY2VIYWx2ZWRTY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0Zvcm1hdGlvblNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uQWNyb1Njb3JlIGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9TY29yZVwiO1xuaW1wb3J0IFNpbXBsaWZpZWRTY29yZSBmcm9tIFwiLi9TaW1wbGlmaWVkU2NvcmVcIjtcbmltcG9ydCBIZWFkSnVkZ2VTY29yZSBmcm9tIFwiLi9IZWFkSnVkZ2VTY29yZVwiO1xuaW1wb3J0IEhlYWRKdWRnZUZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0hlYWRKdWRnZUZvcm1hdGlvblNjb3JlXCI7XG5pbXBvcnQgVGVjaEp1ZGdlU2NvcmUgZnJvbSBcIi4vVGVjaEp1ZGdlU2NvcmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNjb3JlOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXJCb2R5KHNjb3JpbmdfdHlwZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBzY29yaW5nX3R5cGUgPT09IFwiaGVhZFwiICYmXG4gICAgICAgICAgICBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPj0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNjb3JpbmdfdHlwZSA9IFwiaGVhZF9mb3JtYXRpb25cIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY29yZV9wcm9wcyA9IHtcbiAgICAgICAgICAgIHNjb3JlOiAgICAgdGhpcy5wcm9wcy5zY29yZSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiAgdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgICAgICAgIG9uU3VibWl0OiAgdGhpcy5wcm9wcy5vblN1Ym1pdCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogdGhpcy5wcm9wcy5vbkRpc2NhcmQsXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxBY3JvU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZGFuY2VcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPERhbmNlU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZGFuY2VfaGFsdmVkXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxEYW5jZUhhbHZlZFNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Rm9ybWF0aW9uU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEZvcm1hdGlvbkFjcm9TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJzaW1wbGlmaWVkXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxTaW1wbGlmaWVkU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiaGVhZFwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SGVhZEp1ZGdlU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiaGVhZF9mb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEhlYWRKdWRnZUZvcm1hdGlvblNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcInRlY2hcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRlY2hKdWRnZVNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd24gc2NvcmluZyB0eXBlOiAke3Njb3JpbmdfdHlwZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJDb25maXJtYXRpb25CdXR0b24oc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5IHx8IHNjb3JpbmdfdHlwZSA9PT0gXCJoZWFkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgY29uZmlybWVkPXsgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm1hdGlvblRvZ2dsZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2NvcmluZ190eXBlID0gZ2V0U2NvcmluZ1R5cGUodGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UsIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQWRtaW5TY29yZUlucHV0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoc2NvcmluZ190eXBlKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckNvbmZpcm1hdGlvbkJ1dHRvbihzY29yaW5nX3R5cGUpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRWRpdG9yLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvclwiO1xuIiwiaW1wb3J0IEVkaXRvciBmcm9tIFwiLi9FZGl0b3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkbWluU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBlZGl0aW5nOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5lZGl0aW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLnJvbGUgPT09IFwiaGVhZF9qdWRnZVwiICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEubmV4dHRvdXJcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGBbJHt0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKX1dYCB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2Uucm9sZSA9PT0gXCJ0ZWNoX2p1ZGdlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR2X3N0ciA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS50aW1pbmdfdmlvbGF0aW9uID09PSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcIj9cIiA6IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS50aW1pbmdfdmlvbGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLinJdcIiA6IFwi4pyTXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGAke3RoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5qdW1wX3N0ZXBzfSAke3R2X3N0cn1gIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEVkaXRvclxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtYXRpb25Ub2dnbGU9eyB0aGlzLnByb3BzLm9uQ29uZmlybWF0aW9uVG9nZ2xlIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLnByb3BzLm9uU3VibWl0IH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5BZG1pblNjb3JlSW5wdXQuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRcIjtcclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBwbGFjZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2FjaGVzOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG9ydHNtZW46IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXJfb2ZfYmlydGg6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XG4gICAgICAgIGRvY3hcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3VyLW5hbWVcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwicGFkZGluZ1wiLCBcIjBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zcG9ydHNtZW5cIiwgXCJ3aWR0aFwiLCBcIjEwMCVcIik7XG4gICAgfVxuXG4gICAgcmVuZGVyUm93SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xuICAgICAgICBjb25zdCBuZWVkX3JlbmRlciA9XG4gICAgICAgICAgICB0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIgfHxcbiAgICAgICAgICAgIHByZXZfcm93LnRvdXIuaWQgIT09IG5leHRfcm93LnRvdXIuaWQ7XG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIga2V5PXsgYEgke25leHRfcm93LnJ1bi5pZH1gIH0+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGNvbFNwYW49XCI2XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5leHRfcm93LnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdykge1xuICAgICAgICBsZXQgcCA9IHJvdy5ydW4ucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIga2V5PXsgYFIke3Jvdy5ydW4uaWR9YCB9PlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggcGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm93LnBsYWNlID09PSBudWxsID8gXCJcIiA6IHJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAubnVtYmVyIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzZcIiBjb2xTcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic3BvcnRzbWVuXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwLmZvcm1hdGlvbl9uYW1lID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNvbFNwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHAuZm9ybWF0aW9uX25hbWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNzVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYCR7cy5sYXN0X25hbWV9ICR7cy5maXJzdF9uYW1lfWAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcy5zdWJzdGl0dXRlID8gPGk+ICh7IF8oXCJyZXN1bHRzLmxhYmVscy5zdWJcIikgfS4pPC9pPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHMueWVhcl9vZl9iaXJ0aCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjbHViXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwLmNsdWIubmFtZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI0IGNvYWNoZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuY29hY2hlcy5zcGxpdChcIixcIikubWFwKGMgPT4gW2MudHJpbSgpLCA8YnIga2V5PVwiWFwiIC8+XSkgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgY29uc3QgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpIC0gMV0sIHRhYmxlW2ldKTtcbiAgICAgICAgICAgIGlmIChoZWFkZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRpc2NpcGxpbmVSZXN1bHRzVGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yN1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnNwb3J0c21lblwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY29hY2hlc1wiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGlzY2lwbGluZVJlc3VsdHNUYWJsZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0Rpc2NpcGxpbmVSZXN1bHRzVGFibGVcIjtcbiIsImV4cG9ydCBsZXQgQXBpID0gbnVsbDtcbmV4cG9ydCBsZXQgbWVzc2FnZV9kaXNwYXRjaGVyID0gbnVsbDtcbmV4cG9ydCBsZXQgc3RvcmFnZSA9IG51bGw7XG5leHBvcnQgbGV0IFRvdXJSZXN1bHRzID0gbnVsbDtcbmV4cG9ydCBsZXQgRGlzY2lwbGluZVJlc3VsdHMgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoZGF0YSkge1xuICAgIEFwaSAgICAgICAgICAgICAgICA9IGRhdGEuQXBpO1xuICAgIG1lc3NhZ2VfZGlzcGF0Y2hlciA9IGRhdGEubWVzc2FnZV9kaXNwYXRjaGVyO1xuICAgIHN0b3JhZ2UgICAgICAgICAgICA9IGRhdGEuc3RvcmFnZTtcbiAgICBUb3VyUmVzdWx0cyAgICAgICAgPSBkYXRhLlRvdXJSZXN1bHRzO1xuICAgIERpc2NpcGxpbmVSZXN1bHRzICA9IGRhdGEuRGlzY2lwbGluZVJlc3VsdHM7XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFjcm9JZHg6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByZWR1Y3Rpb246IFBULm51bWJlcixcclxuICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZSh0aGlzLnByb3BzLmFjcm9JZHgsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhcInRhYmxldC5hY3JvX2p1ZGdlLmFjcm9fblwiLCB0aGlzLnByb3BzLmFjcm9JZHgpIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInJlZHVjdGlvblwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMucmVkdWN0aW9uIH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucmVkdWN0aW9ucy5tYXAoKHJlZHVjdGlvbiwgYWNyb19pZHgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgYWNyb19pZHggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb249eyByZWR1Y3Rpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvSWR4PXsgYWNyb19pZHggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU9eyB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcIm1pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaXN0YWtlc1wiPlxyXG4gICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5hY3JvX2p1ZGdlLmZhbGxfZG93blwiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBFbGVtZW50cyBmcm9tIFwiLi9FbGVtZW50c1wiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgaGFuZGxlQWNyb1JlZHVjdGlvblVwZGF0ZSA9IChhY3JvX2lkeCwgdmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMucHJvcHMuc2NvcmVEYXRhLnJlZHVjdGlvbnMubWFwKCgpID0+IG51bGwpO1xyXG4gICAgICAgIHJlZHVjdGlvbnNbYWNyb19pZHhdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwicmVkdWN0aW9uc1wiLCByZWR1Y3Rpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxFbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9ucz17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnJlZHVjdGlvbnMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZT17IHRoaXMuaGFuZGxlQWNyb1JlZHVjdGlvblVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgbWlzdGFrZXM9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsTGF5b3V0IGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsTGF5b3V0XCI7XHJcbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9iYXRpY3NMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsTGF5b3V0XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IFNjb3JpbmdMYXlvdXQgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcbmltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xyXG5cclxuaW1wb3J0IFNsaWRlciBmcm9tIFwidGFibGV0X3VpL1NsaWRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybWF0aW9uQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgY29uZmlybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uQ29uZmlybTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuQ29uZmlybTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcclxuICAgICAgICAgICAgXCJjb25maXJtXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiaGlkZGVuXCI6ICF0aGlzLnByb3BzLmNhbkNvbmZpcm0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH0+XHJcbiAgICAgICAgICAgICAgICA8U2xpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZT17IHRoaXMucHJvcHMuY29uZmlybWVkIH1cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZVRleHQ9eyBfKFwidGFibGV0Lmdsb2JhbC5jb25maXJtX3Njb3JlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICBkb25lVGV4dD17IF8oXCJ0YWJsZXQuZ2xvYmFsLmNvbmZpcm1lZFwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25BY3RpdmF0ZT17IHRoaXMucHJvcHMub25Db25maXJtIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlRGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInNtYWxsX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGhhbmRsZUJpZ01pc3Rha2VzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwiYmlnX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWlzdGFrZXMgZnVsbC13aWR0aFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5zbWFsbF9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEuc21hbGxfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+PHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuYmlnX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5iaWdfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQmlnTWlzdGFrZXNDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZVBhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5jb2RlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZndfd29tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd19tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEyLjUgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJjb21wb3NpdGlvblwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsTGF5b3V0IGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsTGF5b3V0XCI7XHJcbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsTGF5b3V0XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IFNjb3JpbmdMYXlvdXQgfVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVQYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMucHJvcHMuY29kZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXIsIHZhbHVlLCBzY2FsZSwgb25TY29yZVVwZGF0ZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcbmltcG9ydCBUb3RhbFNjb3JlIGZyb20gXCJKdWRnZVRhYmxldC9Ub3RhbFNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLmFkZGl0aW9uYWxfcHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZndfd29tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd19tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwiaW50ZWdlclwiLCB7IG1pbjogMCwgbWF4OiAyNSB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImNvbXBvc2l0aW9uXCIsIFwiaW50ZWdlclwiLCB7IG1pbjogMCwgbWF4OiAyMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgb25DbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMubWtleSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImJ0blwiICsgKHRoaXMucHJvcHMuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uQ2xpY2spIH0+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5sYWJlbCB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb3Rlckl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi9CdXR0b25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKHByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICAgIHsgUmVhY3QuQ2hpbGRyZW4ubWFwKHByb3BzLmNoaWxkcmVuLCAoYnRuKSA9PlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgYnRuLnByb3BzLm1rZXkgfVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU9eyBwcm9wcy52YWx1ZSA9PT0gYnRuLnByb3BzLm1rZXkgfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgcHJvcHMub25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgICAgICB7IC4uLmJ0bi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZm9vdGVyPlxuICAgIClcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yZURhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNtYWxsTWlzdGFrZXNDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJzbWFsbF9taXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVCaWdNaXN0YWtlc0NoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcImJpZ19taXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtaXN0YWtlcyBmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fc21hbGxfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnNtYWxsX21pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVNtYWxsTWlzdGFrZXNDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPjx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fYmlnX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5iaWdfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQmlnTWlzdGFrZXNDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZVBhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZSB9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyX3Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcbmltcG9ydCBUb3RhbFNjb3JlIGZyb20gXCJKdWRnZVRhYmxldC9Ub3RhbFNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgY29kZT17IGNvZGUgfVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhgdGFibGV0LmRhbmNlX2p1ZGdlLiR7Y29kZX1gKSB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhW2NvZGVdIH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxyXG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICB7Li4uYWRkaXRpb25hbF9wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImFjcm9iYXRpY3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV90ZWNoXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfZmlnc1wiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImltcHJlc3Npb25cIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyB0aGlzLnByb3BzLnNjb3JlRGF0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvdGFsU2NvcmVcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yZURhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwibWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlUGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBoZWFkZXI6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NhbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5jb2RlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfdGVjaFwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJpbXByZXNzaW9uXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgdGhpcy5wcm9wcy5zY29yZURhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIkp1ZGdlVGFibGV0L0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNpcGFudCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhbkNvbmZpcm0oKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlX2RhdGEgPSB0aGlzLnNjb3JlLmRhdGEucmF3X2RhdGE7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNjb3JlX2RhdGEpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHNjb3JlX2RhdGFba2V5XTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5maWx0ZXIoYSA9PiBhID09PSBudWxsKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSh0aGlzLnNjb3JlLmlkKTtcbiAgICB9XG4gICAgb25TY29yZVVwZGF0ZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzY29yZV9kYXRhID0ge307XG4gICAgICAgIHNjb3JlX2RhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5zY29yZS5pZCwgc2NvcmVfZGF0YSk7XG4gICAgfVxuICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZSA9IChhY3JvX2lkeCwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUuY29uZmlybWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlZHVjdGlvbnMgPSB0aGlzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoKCkgPT4gbnVsbCk7XG4gICAgICAgIHJlZHVjdGlvbnNbYWNyb19pZHhdID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25TY29yZVVwZGF0ZShcInJlZHVjdGlvbnNcIiwgcmVkdWN0aW9ucyk7XG4gICAgfVxuICAgIHJlbmRlclNjb3JpbmdMYXlvdXQoKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlX2RhdGEgPSB0aGlzLnNjb3JlLmRhdGEucmF3X2RhdGE7XG4gICAgICAgIGNvbnN0IFNjb3JpbmdDb21wb25lbnQgPSB0aGlzLnByb3BzLmxheW91dENsYXNzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8U2NvcmluZ0NvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgc2NvcmVfZGF0YSB9XG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIGNhbkNvbmZpcm09eyB0aGlzLmNhbkNvbmZpcm0oKSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17IHRoaXMub25Db25maXJtIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlck5vdFBlcmZvcm1pbmdNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3QtcGVyZm9ybWluZ1wiPlxuICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwubm90X3BlcmZvcm1pbmdcIikgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyU2NvcmluZ0xheW91dCgpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5yZW5kZXJOb3RQZXJmb3JtaW5nTWVzc2FnZSgpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkZXJcIjtcbmltcG9ydCBHcmlkIGZyb20gXCJKdWRnZVRhYmxldC9HcmlkXCI7XG5pbXBvcnQgUGFydGljaXBhbnQgZnJvbSBcIi4vUGFydGljaXBhbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhbExheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IG5leHRfcHJvcHM7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gcHJldl9wcm9wcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiaGVhdHNfY291bnRcIiwgKCkgPT5cbiAgICAgICAgICAgIE1hdGgubWF4KC4uLnRoaXMucHJvcHMudG91ci5ydW5zLm1hcChydW4gPT4gcnVuLmhlYXQpKVxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgcnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJydW5zXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIucnVucy5maWx0ZXIocnVuID0+IHJ1bi5oZWF0ID09PSB0aGlzLnN0YXRlLmhlYXQpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBmaXJzdF9ub25fY29uZmlybWVkX2hlYXQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHRoaXMucHJvcHMudG91ci5ydW5zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQgJiYgIXNjb3JlLmNvbmZpcm1lZCAmJiBydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW4uaGVhdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhdHNfY291bnQ7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3NmYXJyLUp1ZGdlVGFibGV0IEdlbmVyYWxMYXlvdXRcIj5cbiAgICAgICAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuanVkZ2UgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAgICAgaGVhdD17IHRoaXMuc3RhdGUuaGVhdCB9XG4gICAgICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyB0aGlzLmhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICAgICAgbWF4SGVhdD17IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0IH1cbiAgICAgICAgICAgICAgICAgICAgb25QcmV2SGVhdENsaWNrPXsgdGhpcy5vblByZXZIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgICAgICAgICBvbk5leHRIZWF0Q2xpY2s9eyB0aGlzLm9uTmV4dEhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuaGVhdCkubWFwKHJ1biA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQYXJ0aWNpcGFudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IHRoaXMucHJvcHMubGF5b3V0Q2xhc3MgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTnVtYmVyU2VsZWN0b3JJbnB1dCBmcm9tIFwidGFibGV0X3VpL051bWJlclNlbGVjdG9ySW5wdXRcIjtcclxuaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9TZWxlY3RvcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsU2NhbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyOiBQVC5zdHJpbmcsXHJcbiAgICAgICAgICAgIHNjYWxlOiBQVC5vbmVPZihbXCJwb2ludDVcIiwgXCJpbnRlZ2VyXCIsIFwiZ3JpZFwiLCBcInJlZHVjdGlvblwiXSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBQT1NTSUJMSUVfUkVEVUNUSU9OUygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbMTAwLCBcIi0xMDAlXCJdLFxyXG4gICAgICAgICAgICBbNzUsICBcIi03NSVcIl0sXHJcbiAgICAgICAgICAgIFs1MCwgIFwiLTUwJVwiXSxcclxuICAgICAgICAgICAgWzI1LCAgXCItMjUlXCJdLFxyXG4gICAgICAgICAgICBbMTAsICBcIi0xMCVcIl0sXHJcbiAgICAgICAgICAgIFs1LCAgIFwiLTUlXCJdLFxyXG4gICAgICAgICAgICBbMCwgICBcIi0wJVwiXSxcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVySGVhZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGgzPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmhlYWRlciB9XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcbiAgICByZW5kZXJCb2R5KCkge1xyXG4gICAgICAgIGNvbnN0IHsgc2NhbGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHN3aXRjaCAoc2NhbGUpIHtcclxuICAgICAgICBjYXNlIFwicG9pbnQ1XCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TnVtYmVyU2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxTaXplPXsgMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcD17IDAuNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ0d28tbGluZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwiaW50ZWdlclwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPE51bWJlclNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInR3by1saW5lc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNhc2UgXCJncmlkXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TnVtYmVyU2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiZ3JpZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNhc2UgXCJyZWR1Y3Rpb25cIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuUE9TU0lCTElFX1JFRFVDVElPTlMgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwib25lLWxpbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd2Qgc2NhbGUgdHlwZTogJHtzY2FsZX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcclxuICAgIGdldCBjaGlsZHJlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImNoaWxkcmVuXCIsICgpID0+XHJcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgOiBbdGhpcy5wcm9wcy5jaGlsZHJlbl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0IHR3b19yb3dzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwidHdvX3Jvd3NcIiwgKCkgPT5cclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPj0gNFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXQgd2lkdGhfdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ3aWR0aF92YWx1ZVwiLCAoKSA9PlxyXG4gICAgICAgICAgICB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgICAgICA/IDk5LjkgLyAodGhpcy5jaGlsZHJlbi5sZW5ndGggKyAxKSAqIDJcclxuICAgICAgICAgICAgICAgIDogOTkuOSAvIHRoaXMuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGdldCB3aWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcIndpZHRoXCIsICgpID0+XHJcbiAgICAgICAgICAgIGAkeyB0aGlzLndpZHRoX3ZhbHVlLnRvRml4ZWQoNSkgfSVgXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgZ2V0IG1heF93aWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcIm1heF93aWR0aFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVfc2l6ZSA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgICAgID8gTWF0aC5mbG9vcigodGhpcy5jaGlsZHJlbi5sZW5ndGggKyAxKSAvIDIgKyAwLjAwMSlcclxuICAgICAgICAgICAgICAgIDogdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHs2MDAgKiBsaW5lX3NpemV9cHhgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IGFzeW1fbGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiYXN5bV9sYXlvdXRcIiwgKCkgPT5cclxuICAgICAgICAgICAgdGhpcy50d29fcm93cyAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCAlIDIgPT09IDBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KGVsZW1lbnRzLCBpc19zZWNvbmRfcm93KSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnRzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByb3dfd2lkdGggPSBgJHsoZWxlbWVudHMubGVuZ3RoICogdGhpcy53aWR0aF92YWx1ZSkudG9GaXhlZCg1KX0lYDtcclxuICAgICAgICBsZXQgY2xhc3NfbmFtZSA9IFwiZ3JpZC1yb3dcIjtcclxuICAgICAgICBpZiAoIXRoaXMuYXN5bV9sYXlvdXQpIHtcclxuICAgICAgICAgICAgY2xhc3NfbmFtZSArPSBcIiBhbGlnbi1jZW50ZXJcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzX3NlY29uZF9yb3cpIHtcclxuICAgICAgICAgICAgY2xhc3NfbmFtZSArPSBcIiBhbGlnbi1yaWdodFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsYXNzX25hbWUgKz0gXCIgYWxpZ24tbGVmdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXsgY2xhc3NfbmFtZSB9IHN0eWxlPXsgeyB3aWR0aDogcm93X3dpZHRoIH0gfT48dGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBlbGVtZW50cy5tYXAoKGUsIGlkeCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IGlkeCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHsgd2lkdGg6IHRoaXMud2lkdGggfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSB0aGlzLnR3b19yb3dzID8gXCJHcmlkIHR3by1yb3dzXCIgOiBcIkdyaWRcIjtcclxuICAgICAgICBjb25zdCBmaXJzdF9yb3cgPSB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgID8gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKHgsIGlkeCkgPT4gaWR4ICUgMiA9PT0gMClcclxuICAgICAgICAgICAgOiB0aGlzLmNoaWxkcmVuO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZF9yb3cgPSB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgID8gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKHgsIGlkeCkgPT4gaWR4ICUgMiA9PT0gMSlcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NfbmFtZSB9IHN0eWxlPXsgeyBtYXhXaWR0aDogdGhpcy5tYXhfd2lkdGggfSB9PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvdyhmaXJzdF9yb3csIGZhbHNlKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93KHNlY29uZF9yb3csIHRydWUpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5pbXBvcnQgc2hvd0NvbmZpcm0gZnJvbSBcImNvbW1vbi9kaWFsb2dzL3Nob3dDb25maXJtXCI7IC8vIEZJWE1FXG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb25zUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RvcFRvdXIgPSAoKSA9PiB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuc3RvcF90b3VyXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdG9wXCIsIHsgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyLmlkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ciA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7IHRvdXJfaWQ6IHRoaXMucHJvcHMudG91ci5pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wVG91ckFuZFN0YXJ0TmV4dCA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5zdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG91cl9pZCA9IHRoaXMucHJvcHMudG91ci5pZDtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwgeyB0b3VyX2lkIH0pLm9uU3VjY2VzcygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEFwaShcInRvdXIuc3RhcnRfbmV4dF9hZnRlclwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xuICAgICAgICAgICAgICAgIH0pLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ckFuZFN0YXJ0TmV4dCA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgICAgICAgICAgfSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFzVW5jb25maXJtZWRTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHJ1bnMgPSB0aGlzLnByb3BzLnRvdXIucnVucztcbiAgICAgICAgY29uc3QgbGF0ZXN0X2hlYXQgPSBydW5zW3J1bnMubGVuZ3RoIC0gMV0uaGVhdDtcbiAgICAgICAgaWYgKGxhdGVzdF9oZWF0ID09PSBydW5zWzBdLmhlYXQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhdGVzdF9ydW5zID0gcnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IGxhdGVzdF9oZWF0KTtcbiAgICAgICAgY29uc3QgcHJldl9ydW5zID0gcnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IGxhdGVzdF9oZWF0IC0gMSk7XG4gICAgICAgIGxldCBzY29yZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NfcnVuID0gKHJ1biwgdHlwZSkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiBydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGpfaWQgPSBzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkO1xuICAgICAgICAgICAgICAgIGlmICghc2NvcmVzLmhhcyhkal9pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzLnNldChkal9pZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldjogMCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgKytzY29yZXMuZ2V0KGRqX2lkKVt0eXBlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIGxhdGVzdF9ydW5zKSB7XG4gICAgICAgICAgICBwcm9jZXNzX3J1bihydW4sIFwibGF0ZXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHByZXZfcnVucykge1xuICAgICAgICAgICAgcHJvY2Vzc19ydW4ocnVuLCBcInByZXZcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzdGF0cyBvZiBzY29yZXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChzdGF0cy5wcmV2ID4gMCAmJiBzdGF0cy5sYXRlc3QgPCBsYXRlc3RfcnVucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJlbmRlcldhcm5pbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNVbmNvbmZpcm1lZFNjb3JlcygpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YXJuaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5hbGVydHMuaGFzX3VuY29uZmlybWVkX3Njb3Jlc1wiKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQnV0dG9uKGNvZGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayhjYWxsYmFjaykgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgXyhgdGFibGV0LmJ1dHRvbnMuJHtjb2RlfWApIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHkgYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJXYXJuaW5nKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJzdG9wX3RvdXJcIiwgdGhpcy5zdG9wVG91cikgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJmaW5hbGl6ZV90b3VyXCIsIHRoaXMuZmluYWxpemVUb3VyKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbihcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiLCB0aGlzLnN0b3BUb3VyQW5kU3RhcnROZXh0KSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbihcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIiwgdGhpcy5maW5hbGl6ZVRvdXJBbmRTdGFydE5leHQpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9iYXRpY092ZXJyaWRlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgZ2V0QWNyb2JhdGljT3ZlcnJpZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljc1xuICAgICAgICAgICAgLm1hcCgoYWNybywgaWR4KSA9PiAoeyBpZHg6IGlkeCArIDEsIGFjcm9iYXRpYzogYWNybyB9KSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGFjcm8pID0+IGFjcm8uYWNyb2JhdGljLm9yaWdpbmFsX3Njb3JlICE9PSBhY3JvLmFjcm9iYXRpYy5zY29yZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGFjcm9iYXRpY19vdmVycmlkZXMgPSB0aGlzLmdldEFjcm9iYXRpY092ZXJyaWRlcygpO1xuICAgICAgICBpZiAoYWNyb2JhdGljX292ZXJyaWRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5oZWFkX2p1ZGdlLmFjcm9iYXRpY19vdmVycmlkZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHsgYWNyb2JhdGljX292ZXJyaWRlcy5tYXAoKGFjcm8pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXsgYWNyby5pZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy01XCI+eyBhY3JvLmlkeCB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+eyBhY3JvLmFjcm9iYXRpYy5kZXNjcmlwdGlvbiB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LXJpZ2h0XCI+eyBhY3JvLmFjcm9iYXRpYy5vcmlnaW5hbF9zY29yZS50b0ZpeGVkKDEpIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTUgdGV4dC1jZW50ZXJcIj7ihpI8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTEwIHRleHQtbGVmdFwiPnsgYWNyby5hY3JvYmF0aWMuc2NvcmUudG9GaXhlZCgxKSB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJdGVtKHByb3BzKSB7XG4gICAgY29uc3QgY29uZmlybWVkID0gcHJvcHMuc2NvcmUgJiYgcHJvcHMuc2NvcmUuY29uZmlybWVkO1xuICAgIHJldHVybiAoXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9eyBjb25maXJtZWQgPyBcImNvbmZpcm1lZFwiIDogXCJcIiB9PlxuICAgICAgICAgICAgeyBwcm9wcy5zY29yZVxuICAgICAgICAgICAgICAgID8gcHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpXG4gICAgICAgICAgICAgICAgOiBcIuKAlFwiIH1cbiAgICAgICAgPC90ZD5cbiAgICApO1xufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUp1ZGdlU2NvcmUgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBsaW5lX2p1ZGdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJsaW5lX2p1ZGdlc1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzLmZpbHRlcihkaiA9PiBkai5yb2xlID09PSBcImRhbmNlX2p1ZGdlXCIgfHwgZGoucm9sZSA9PT0gXCJhY3JvX2p1ZGdlXCIpKTtcbiAgICB9XG4gICAgZ2V0IGxpbmVfanVkZ2VzX2luZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImxpbmVfanVkZ2VzX2luZGV4XCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRqIG9mIHRoaXMubGluZV9qdWRnZXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGRqLmlkLCBkaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJzY29yZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnNjb3Jlcy5maWx0ZXIoc2NvcmUgPT4gdGhpcy5saW5lX2p1ZGdlc19pbmRleC5oYXMoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCkpKTtcbiAgICB9XG4gICAgcmVuZGVyTnVtYmVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmVzLm1hcChzY29yZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaiA9IHRoaXMubGluZV9qdWRnZXNfaW5kZXguZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dGQga2V5PXsgc2NvcmUuaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtkai5qdWRnZS5udW1iZXIgfSR7IGRqLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiID8gXCIgKEEpXCIgOiBcIlwiIH1gIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlclNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmVzLm1hcChzY29yZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaiA9IHRoaXMubGluZV9qdWRnZXNfaW5kZXguZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICBqdWRnZT17IGRqLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgZGouaWQgfVxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHNjb3JlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5oZWFkX2p1ZGdlLmRhbmNlX2p1ZGdlX3Njb3Jlc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibGluZS1qdWRnZS1zY29yZXNcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJudW1iZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTnVtYmVycygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cInNjb3Jlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlcygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgb25Ub3VjaEVuZE9yQ2xpY2sgZnJvbSBcInRhYmxldF91aS9vblRvdWNoRW5kT3JDbGlja1wiO1xuXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90UGVyZm9ybWVkU3dpdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBtYXJrTm90UGVyZm9ybWVkKCkge1xuICAgICAgICBBcGkoXCJydW4ubWFya19ub3RfcGVyZm9ybWVkXCIsIHsgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCB9KS5zZW5kKCk7XG4gICAgfVxuICAgIG1hcmtQZXJmb3JtZWQoKSB7XG4gICAgICAgIEFwaShcInJ1bi5tYXJrX3BlcmZvcm1lZFwiLCB7IHJ1bl9pZDogdGhpcy5wcm9wcy5ydW4uaWQgfSkuc2VuZCgpO1xuICAgIH1cbiAgICByZW5kZXJCdXR0b24oKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibm90LXBlcmZvcm1lZFwiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy5tYXJrTm90UGVyZm9ybWVkLmJpbmQodGhpcykpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwubWFya19ub3RfcGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBlcmZvcm1lZFwiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy5tYXJrUGVyZm9ybWVkLmJpbmQodGhpcykpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwuZGlzY2FyZF9ub3RfcGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3QtcGVyZm9ybWVkLXN3aXRjaFwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgU2VsZWN0b3JJbnB1dCBmcm9tIFwidGFibGV0X3VpL1NlbGVjdG9ySW5wdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVuYWx0eUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmFsdHk6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmluZ1N5c3RlbU5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJwZW5hbHR5XCIsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHBlbmFsdGllcyA9IFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMuc2NvcmluZ1N5c3RlbU5hbWUpID49IDBcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LmhlYWRfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstNSwgICBfKFwidGFibGV0LmhlYWRfanVkZ2UuZm9ybV95ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xNSwgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5mb3JtX3JlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LmhlYWRfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstMywgICBfKFwidGFibGV0LmhlYWRfanVkZ2UueWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMzAsICBfKFwidGFibGV0LmhlYWRfanVkZ2UucmVkX2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTAwLCBfKFwidGFibGV0LmhlYWRfanVkZ2UuYmxhY2tfY2FyZFwiKV0sXG4gICAgICAgICAgICBdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnBlbmFsdHlfdHlwZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgcGVuYWx0aWVzIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucGVuYWx0eSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcmV2aW91c1BlbmFsdGllcyhwcm9wcykge1xuICAgIGlmICghcHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcyB8fCBwcm9wcy5ydW4uaW5oZXJpdGVkX2RhdGEucGVuYWx0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gPGRpdiAvPjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UucHJldmlvdXNfcnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllc1wiKSB9PC9oMz5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5PiB7XG4gICAgICAgICAgICAgICAgcHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcy5tYXAoKGQsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1jZW50ZXJcIj48c3Ryb25nPnsgZC5wZW5hbHR5IH08L3N0cm9uZz48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnsgZC50b3VyIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAganVkZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0VGltaW5nRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNjb3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiLVwiLCBcIlwiXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHZfcmF3X3ZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb247XG4gICAgICAgIGlmICh0dl9yYXdfdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBbXCLigJRcIiwgXCJcIl07XG4gICAgICAgIH0gZWxzZSBpZiAodHZfcmF3X3ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiWFwiLCBcIiBmYWlsXCJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtcIk9LXCIsIFwiIG9rXCJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRpbWluZ19kYXRhID0gdGhpcy5nZXRUaW1pbmdEYXRhKCk7XG4gICAgICAgIGxldCBqdW1wX3N0ZXBzID0gdGhpcy5wcm9wcy5zY29yZVxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuanVtcF9zdGVwc1xuICAgICAgICAgICAgOiAwO1xuICAgICAgICBsZXQgY29uZmlybWVkID0gdGhpcy5wcm9wcy5zY29yZSAmJiB0aGlzLnByb3BzLnNjb3JlLmNvbmZpcm1lZDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17IGNvbmZpcm1lZCA/IFwiY29uZmlybWVkXCIgOiBcIlwiIH0+eyB0aGlzLnByb3BzLmp1ZGdlLm5hbWUgfTwvaDM+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRlY2gtanVkZ2UtaW5mb1wiPjx0Ym9keT48dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LnRlY2hfanVkZ2UuanVtcF9zdGVwc1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsganVtcF9zdGVwcyB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQudGVjaF9qdWRnZS50aW1pbmdcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJpbm5lclwiICsgdGltaW5nX2RhdGFbMV0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRpbWluZ19kYXRhWzBdIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVjaEp1ZGdlc1Njb3JlcyBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHRlY2hfanVkZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInRlY2hfanVkZ2VzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZXMuZmlsdGVyKGRqID0+IGRqLnJvbGUgPT09IFwidGVjaF9qdWRnZVwiKSk7XG4gICAgfVxuICAgIGdldCB0ZWNoX2p1ZGdlc19pbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ0ZWNoX2p1ZGdlc19pbmRleFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLnRlY2hfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChkai5pZCwgZGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5zY29yZXMuZmlsdGVyKHNjb3JlID0+IHRoaXMudGVjaF9qdWRnZXNfaW5kZXguaGFzKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpKSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT5cbiAgICAgICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHNjb3JlLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnRlY2hfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgUGVuYWx0eUlucHV0IGZyb20gXCIuL1BlbmFsdHlJbnB1dFwiO1xuaW1wb3J0IFRlY2hKdWRnZXNTY29yZXMgZnJvbSBcIi4vVGVjaEp1ZGdlc1Njb3Jlc1wiO1xuaW1wb3J0IExpbmVKdWRnZXNTY29yZXMgZnJvbSBcIi4vTGluZUp1ZGdlc1Njb3Jlc1wiO1xuaW1wb3J0IEFjcm9iYXRpY092ZXJyaWRlcyBmcm9tIFwiLi9BY3JvYmF0aWNPdmVycmlkZXNcIjtcbmltcG9ydCBQcmV2aW91c1BlbmFsdGllcyBmcm9tIFwiLi9QcmV2aW91c1BlbmFsdGllc1wiO1xuaW1wb3J0IE5vdFBlcmZvcm1lZFN3aXRjaCBmcm9tIFwiLi9Ob3RQZXJmb3JtZWRTd2l0Y2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uU2NvcmVVcGRhdGUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHt9O1xuICAgICAgICBzY29yZV9kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMuc2NvcmUuaWQsIHNjb3JlX2RhdGEpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aCk7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPE5vdFBlcmZvcm1lZFN3aXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPFBlbmFsdHlJbnB1dFxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMuc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmluZ1N5c3RlbU5hbWU9eyB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VGVjaEp1ZGdlc1Njb3Jlc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXM9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8TGluZUp1ZGdlc1Njb3Jlc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXM9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8QWNyb2JhdGljT3ZlcnJpZGVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxQcmV2aW91c1BlbmFsdGllc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Tm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBHcmlkIGZyb20gXCJKdWRnZVRhYmxldC9HcmlkXCI7XG5cbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhdHNQYWdlIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgcnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJydW5zXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIucnVucy5maWx0ZXIocnVuID0+IHJ1bi5oZWF0ID09PSB0aGlzLnByb3BzLmhlYXQpKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5zLm1hcChydW4gPT5cbiAgICAgICAgICAgIDxTY29yaW5nTGF5b3V0XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuLmlkIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keSBoZWF0c1wiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFRvdXJSZXN1bHRzIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmltcG9ydCBSZXN1bHRzVGFibGUyIGZyb20gXCJSZXN1bHRzVGFibGUyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdHNQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IHJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICA8VG91clJlc3VsdHNcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI9eyBSZXN1bHRzVGFibGUyIH1cbiAgICAgICAgICAgICAgICAgICAgdG91cklkPXsgdGhpcy5wcm9wcy50b3VyLmlkIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3RlclwiO1xuaW1wb3J0IEZvb3Rlckl0ZW0gZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3Rlci9Gb290ZXJJdGVtXCI7XG5cbmltcG9ydCBIZWF0c1BhZ2UgZnJvbSBcIi4vSGVhdHNQYWdlXCI7XG5pbXBvcnQgUmVzdWx0c1BhZ2UgZnJvbSBcIi4vUmVzdWx0c1BhZ2VcIjtcbmltcG9ydCBBY3Rpb25zUGFnZSBmcm9tIFwiLi9BY3Rpb25zUGFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkSnVkZ2VMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYXQ6IDEsXG4gICAgICAgICAgICBwYWdlOiBcImhlYXRzXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IDEsXG4gICAgICAgICAgICAgICAgcGFnZTogXCJoZWF0c1wiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGhlYXRzX2NvdW50KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoLi4udGhpcy5wcm9wcy50b3VyLnJ1bnMubWFwKHJ1biA9PiBydW4uaGVhdCkpO1xuICAgIH1cbiAgICB1cGRhdGVIZWF0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaGVhdDogdmFsdWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblByZXZIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgLSAxKTtcbiAgICB9XG4gICAgb25OZXh0SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0ICsgMSk7XG4gICAgfVxuICAgIG9uUGFnZUNoYW5nZSA9IChwYWdlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlIH0pO1xuICAgIH1cbiAgICByZW5kZXJIZWF0cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIZWF0c1BhZ2VcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgaGVhdD17IHRoaXMuc3RhdGUuaGVhdCB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSZXN1bHRzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlc3VsdHNQYWdlXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFjdGlvbnNQYWdlXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYXRzX2NvdW50ID0gdGhpcy5oZWF0c19jb3VudDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgICAgICBqdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICBoZWF0c0NvdW50PXsgaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgIG1heEhlYXQ9eyBoZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAgb25QcmV2SGVhdENsaWNrPXsgdGhpcy5vblByZXZIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgICAgIG9uTmV4dEhlYXRDbGljaz17IHRoaXMub25OZXh0SGVhdENsaWNrIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS5wYWdlKSB7XG4gICAgICAgIGNhc2UgXCJoZWF0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVySGVhdHMoKTtcbiAgICAgICAgY2FzZSBcInJlc3VsdHNcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclJlc3VsdHMoKTtcbiAgICAgICAgY2FzZSBcImFjdGlvbnNcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFjdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9vdGVyIHZhbHVlPXsgdGhpcy5zdGF0ZS5wYWdlIH0gb25DaGFuZ2U9eyB0aGlzLm9uUGFnZUNoYW5nZSB9PlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5oZWF0c1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIG1rZXk9XCJoZWF0c1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMucmVzdWx0c1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIG1rZXk9XCJyZXN1bHRzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5hY3Rpb25zXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImFjdGlvbnNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0Zvb3Rlcj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3NmYXJyLUp1ZGdlVGFibGV0IEhlYWRKdWRnZUxheW91dFwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckZvb3RlcigpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgb25Ub3VjaEVuZE9yQ2xpY2sgZnJvbSBcInRhYmxldF91aS9vblRvdWNoRW5kT3JDbGlja1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclByZXZIZWF0QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYXQgPD0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tY29udGFpbmVyXCIgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tY29udGFpbmVyIGxlZnRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24geyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uUHJldkhlYXRDbGljaykgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5wcmV2X2hlYXRcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJOZXh0SGVhdEJ1dHRvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWF0ID49IHRoaXMucHJvcHMubWF4SGVhdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tY29udGFpbmVyXCIgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tY29udGFpbmVyIHJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHsgLi4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy5wcm9wcy5vbk5leHRIZWF0Q2xpY2spIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMubmV4dF9oZWF0XCIpIH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGp1ZGdlX251bWJlciA9IHRoaXMucHJvcHMuanVkZ2Uucm9sZV9kZXNjcmlwdGlvbiB8fCBfKFwiZ2xvYmFsLnBocmFzZXMuanVkZ2VfblwiLCB0aGlzLnByb3BzLmp1ZGdlLm51bWJlcik7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGhlYWRlcj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQcmV2SGVhdEJ1dHRvbigpIH1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0YVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT57IGp1ZGdlX251bWJlciB9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPnsgdGhpcy5wcm9wcy5qdWRnZS5uYW1lIH08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT57IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLm5hbWUgfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLmhlYXRfbnVtYmVyXCIsIHRoaXMucHJvcHMuaGVhdCwgdGhpcy5wcm9wcy5oZWF0c0NvdW50ICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTmV4dEhlYXRCdXR0b24oKSB9XHJcbiAgICAgICAgIDwvaGVhZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBvbkNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInBvaW50c1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5wb2ludHMgfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJncmlkXCJcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICBtaW49eyAxIH1cclxuICAgICAgICAgICAgICAgIG1heD17IDQwIH1cclxuICAgICAgICAgICAgICAgIHJvd1NpemU9eyAxMCB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgT3ZlcnJpZGVJbnB1dCBmcm9tIFwiLi9PdmVycmlkZUlucHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVjaC1qdWRnZS1hY3JvXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250cm9scyBwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0dGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8T3ZlcnJpZGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLnByb3BzLm9uQWNyb092ZXJyaWRlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFZhbHVlPXsgdGhpcy5wcm9wcy5hY3JvLm9yaWdpbmFsX3Njb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuYWNyby5zY29yZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5hY3JvLmRlc2NyaXB0aW9uIH1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE92ZXJyaWRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yaWdpbmFsVmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVNaW51cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKE1hdGgubWF4KHRoaXMucHJvcHMudmFsdWUgLSAwLjUsIDApKTtcbiAgICB9XG4gICAgaGFuZGxlUGx1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKE1hdGgubWluKHRoaXMucHJvcHMudmFsdWUgKyAwLjUsIHRoaXMucHJvcHMub3JpZ2luYWxWYWx1ZSkpO1xuICAgIH1cbiAgICBoYW5kbGVaZXJvID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoMCk7XG4gICAgfVxuICAgIGhhbmRsZVJlc3RvcmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgdmFsdWVfY2hhbmdlZCA9IE1hdGguYWJzKHRoaXMucHJvcHMudmFsdWUgLSB0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtYWNyby1vdmVycmlkZS1pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4temVyb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IHx8IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVplcm8pIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg4oaTMFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXJlc3RvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB2YWx1ZV9jaGFuZ2VkIDwgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVSZXN0b3JlKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy52YWx1ZSA8IDAuMDUgfHwgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlTWludXMpIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUgPCB0aGlzLnByb3BzLnZhbHVlICsgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVQbHVzKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlX2NoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5wcm9wcy5vcmlnaW5hbFZhbHVlLnRvRml4ZWQoMSl9IOKGkiAke3RoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKX1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuT3ZlcnJpZGVJbnB1dC5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0p1ZGdlVGFibGV0X1RlY2hKdWRnZUxheW91dF9BY3JvUGFnZV9TY29yaW5nTGF5b3V0X092ZXJyaWRlSW5wdXRcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiSnVkZ2VUYWJsZXQvQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuL0VsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSh0aGlzLnNjb3JlLmlkKTtcbiAgICB9XG4gICAgb25BY3JvT3ZlcnJpZGUgPSAoYWNyb19pZHgsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFwaShcImFjcm9iYXRpY19vdmVycmlkZS5zZXRcIiwge1xuICAgICAgICAgICAgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCxcbiAgICAgICAgICAgIGFjcm9iYXRpY19pZHg6IGFjcm9faWR4LFxuICAgICAgICAgICAgc2NvcmU6IHZhbHVlLFxuICAgICAgICB9KS5zZW5kKCk7XG4gICAgfVxuICAgIGdlbk9uQWNyb092ZXJyaWRlKGFjcm9faWR4KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLm9uQWNyb092ZXJyaWRlKGFjcm9faWR4LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgIDxFbGVtZW50XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cbiAgICAgICAgICAgICAgICBhY3JvPXsgYWNybyB9XG4gICAgICAgICAgICAgICAgb25BY3JvT3ZlcnJpZGU9eyB0aGlzLmdlbk9uQWNyb092ZXJyaWRlKGlkeCkgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+eyBoZWFkZXIgfTwvaDI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckNvbnRlbnQoKSB9XG4gICAgICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17IHRoaXMub25Db25maXJtIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcblxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3JvUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW5zLm1hcChydW4gPT5cbiAgICAgICAgICAgIDxTY29yaW5nTGF5b3V0XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuLmlkIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBvbkFjcm9PdmVycmlkZT17IHRoaXMucHJvcHMub25BY3JvT3ZlcnJpZGUgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlcygpIH1cbiAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcbmltcG9ydCBTZWxlY3RvcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvU2VsZWN0b3JJbnB1dFwiO1xuaW1wb3J0IEludGVnZXJJbnB1dCBmcm9tIFwidGFibGV0X3VpL0ludGVnZXJJbnB1dFwiO1xuXG5pbXBvcnQgQ29uZmlybWF0aW9uQnV0dG9uIGZyb20gXCJKdWRnZVRhYmxldC9Db25maXJtYXRpb25CdXR0b25cIjtcblxuaW1wb3J0IFN0b3BXYXRjaCBmcm9tIFwiLi9TdG9wV2F0Y2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29uZmlybWF0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtKHRoaXMuc2NvcmUuaWQpO1xuICAgIH1cbiAgICBoYW5kbGVTY29yZUNoYW5nZSA9IChwYXJ0LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhW3BhcnRdID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBkYXRhKTtcbiAgICB9XG5cbiAgICBoYW5kbGVKdW1wU3RlcHNDaGFuZ2UgPSAodmFsdWUpID0+IHRoaXMuaGFuZGxlU2NvcmVDaGFuZ2UoXCJqdW1wX3N0ZXBzXCIsIHZhbHVlKTtcbiAgICBoYW5kbGVUaW1pbmdWaW9sYXRpb25DaGFuZ2UgPSAodmFsdWUpID0+IHRoaXMuaGFuZGxlU2NvcmVDaGFuZ2UoXCJ0aW1pbmdfdmlvbGF0aW9uXCIsIHZhbHVlKTtcblxuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5vblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSB0aGlzLnNjb3JlLmRhdGE7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC50ZWNoX2p1ZGdlLmp1bXBfc3RlcHNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICBzZW5kRGVsdGFzXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlLnJhd19kYXRhLmp1bXBfc3RlcHMgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlSnVtcFN0ZXBzQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCIgLz5cbiAgICAgICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC50ZWNoX2p1ZGdlLnRpbWluZ1wiKSB9XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8U3RvcFdhdGNoXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlSWQ9eyB0aGlzLnNjb3JlLmlkIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBbW3RydWUsIFwiWFwiXSwgW251bGwsIFwiLVwiXSwgW2ZhbHNlLCBcIk9LXCJdXSB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb24gfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlVGltaW5nVmlvbGF0aW9uQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxDb25maXJtYXRpb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgY29uZmlybWVkPXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm09eyB0aGlzLmhhbmRsZUNvbmZpcm1hdGlvbiB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaE9yQ2xpY2tcIjtcblxubGV0IHN0b3B3YXRjaGVzID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3BXYXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmVJZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICBsZXQgc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlSWRdIHx8IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIHN0cl92YWx1ZTogXCIwOjAwXCIsXG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZSkge1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLmhhbmRsZVRpY2ssIDEwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVJZF0gPSB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5vdygpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMuaGFuZGxlVGljaywgMTApLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlVG9nZ2xlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZVRpY2sgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld192YWx1ZSA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgaWYgKG5ld192YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuXG4gICAgcGFkKG51bSwgc2l6ZSkge1xuICAgICAgICBjb25zdCBzID0gYDAwMDAke251bX1gO1xuICAgICAgICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcbiAgICB9XG4gICAgZ2V0U3RyVmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIGxldCBtID0gMCwgcyA9IDA7XG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XG4gICAgICAgIHJldHVybiBgJHttfToke3RoaXMucGFkKHMsIDIpfWA7XG4gICAgfVxuXG4gICAgZ2V0VG9nZ2xlQnV0dG9uQ2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XG4gICAgICAgICAgICBcInRidG5cIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYnRuLXRvZ2dsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJpZ25vcmUtcmVhZG9ubHlcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRoaXMuc3RhdGUuYWN0aXZlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVSZXNldCkgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IHRoaXMuZ2V0VG9nZ2xlQnV0dG9uQ2xhc3NOYW1lKCkgfVxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlVG9nZ2xlKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3N0b3B3YXRjaFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNpbmdQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlcygpIH1cbiAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEhlYWRlciBmcm9tIFwiSnVkZ2VUYWJsZXQvSGVhZGVyXCI7XG5pbXBvcnQgRm9vdGVyIGZyb20gXCJKdWRnZVRhYmxldC9Gb290ZXJcIjtcbmltcG9ydCBGb290ZXJJdGVtIGZyb20gXCJKdWRnZVRhYmxldC9Gb290ZXIvRm9vdGVySXRlbVwiO1xuXG5pbXBvcnQgRGFuY2luZ1BhZ2UgZnJvbSBcIi4vRGFuY2luZ1BhZ2VcIjtcbmltcG9ydCBBY3JvUGFnZSBmcm9tIFwiLi9BY3JvUGFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNoSnVkZ2VMYXlvdXQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYXQ6IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0LFxuICAgICAgICAgICAgcGFnZTogXCJkYW5jaW5nXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IG5leHRfcHJvcHM7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0LFxuICAgICAgICAgICAgICAgIHBhZ2U6IFwiZGFuY2luZ1wiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gcHJldl9wcm9wcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiaGVhdHNfY291bnRcIiwgKCkgPT5cbiAgICAgICAgICAgIE1hdGgubWF4KC4uLnRoaXMucHJvcHMudG91ci5ydW5zLm1hcChydW4gPT4gcnVuLmhlYXQpKVxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgcnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJydW5zXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIucnVucy5maWx0ZXIocnVuID0+IHJ1bi5oZWF0ID09PSB0aGlzLnN0YXRlLmhlYXQpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBmaXJzdF9ub25fY29uZmlybWVkX2hlYXQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHRoaXMucHJvcHMudG91ci5ydW5zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQgJiYgIXNjb3JlLmNvbmZpcm1lZCAmJiBydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW4uaGVhdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhdHNfY291bnQ7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgb25QYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2UgfSk7XG4gICAgfVxuICAgIHJlbmRlckRhbmNpbmcoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RGFuY2luZ1BhZ2VcbiAgICAgICAgICAgICAgICBydW5zPXsgdGhpcy5ydW5zIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjcm8oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QWNyb1BhZ2VcbiAgICAgICAgICAgICAgICBydW5zPXsgdGhpcy5ydW5zIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhdHNfY291bnQgPSB0aGlzLmhlYXRzX2NvdW50O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuanVkZ2UgfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGhlYXQ9eyB0aGlzLnN0YXRlLmhlYXQgfVxuICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyBoZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAgbWF4SGVhdD17IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0IH1cbiAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLm9uUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgb25OZXh0SGVhdENsaWNrPXsgdGhpcy5vbk5leHRIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRhbmNpbmdcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRhbmNpbmcoKTtcbiAgICAgICAgY2FzZSBcImFjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFjcm8oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmIChbXCJyb3NmYXJyLmFjcm9cIiwgXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvb3RlciB2YWx1ZT17IHRoaXMuc3RhdGUucGFnZSB9IG9uQ2hhbmdlPXsgdGhpcy5vblBhZ2VDaGFuZ2UgfT5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMuZGFuY2luZ1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIG1rZXk9XCJkYW5jaW5nXCIgLz5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMuYWNyb1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIG1rZXk9XCJhY3JvXCIgLz5cbiAgICAgICAgICAgIDwvRm9vdGVyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXQgVGVjaEp1ZGdlTGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyRm9vdGVyKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgKHByb3BzKSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLnRvdGFsX3Njb3JlXCIpIH06IHsgcHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9XG4gICAgPC9kaXY+XG4pO1xuIiwiaW1wb3J0IGdldFNjb3JpbmdUeXBlIGZyb20gXCJjb21tb24vZ2V0U2NvcmluZ1R5cGVcIjtcclxuXHJcbmltcG9ydCBBY3JvYmF0aWNzTGF5b3V0IGZyb20gXCIuL0Fjcm9iYXRpY3NMYXlvdXRcIjtcclxuaW1wb3J0IERhbmNlTGF5b3V0IGZyb20gXCIuL0RhbmNlTGF5b3V0XCI7XHJcbmltcG9ydCBEYW5jZUhhbHZlZExheW91dCBmcm9tIFwiLi9EYW5jZUhhbHZlZExheW91dFwiO1xyXG5pbXBvcnQgRm9ybWF0aW9uTGF5b3V0IGZyb20gXCIuL0Zvcm1hdGlvbkxheW91dFwiO1xyXG5pbXBvcnQgRm9ybWF0aW9uQWNyb0xheW91dCBmcm9tIFwiLi9Gb3JtYXRpb25BY3JvTGF5b3V0XCI7XHJcbmltcG9ydCBTaW1wbGlmaWVkTGF5b3V0IGZyb20gXCIuL1NpbXBsaWZpZWRMYXlvdXRcIjtcclxuaW1wb3J0IEhlYWRKdWRnZUxheW91dCBmcm9tIFwiLi9IZWFkSnVkZ2VMYXlvdXRcIjtcclxuaW1wb3J0IFRlY2hKdWRnZUxheW91dCBmcm9tIFwiLi9UZWNoSnVkZ2VMYXlvdXRcIjtcclxuXHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVkZ2VUYWJsZXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIExBWU9VVFMgPSB7XHJcbiAgICAgICAgXCJhY3JvXCI6IEFjcm9iYXRpY3NMYXlvdXQsXHJcbiAgICAgICAgXCJkYW5jZVwiOiBEYW5jZUxheW91dCxcclxuICAgICAgICBcImRhbmNlX2hhbHZlZFwiOiBEYW5jZUhhbHZlZExheW91dCxcclxuICAgICAgICBcImZvcm1hdGlvblwiOiBGb3JtYXRpb25MYXlvdXQsXHJcbiAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBGb3JtYXRpb25BY3JvTGF5b3V0LFxyXG4gICAgICAgIFwic2ltcGxpZmllZFwiOiBTaW1wbGlmaWVkTGF5b3V0LFxyXG4gICAgICAgIFwiaGVhZFwiOiBIZWFkSnVkZ2VMYXlvdXQsXHJcbiAgICAgICAgXCJ0ZWNoXCI6IFRlY2hKdWRnZUxheW91dCxcclxuICAgIH07XHJcbiAgICBvblNjb3JlVXBkYXRlID0gKHNjb3JlX2lkLCBuZXdfc2NvcmUpID0+IHtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgc2NvcmVfZGF0YTogbmV3X3Njb3JlLFxyXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBBcGkoXCJzY29yZS5zZXRcIiwgeyBzY29yZV9pZDogc2NvcmVfaWQsIGRhdGE6IHJlcXVlc3QgfSkuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgb25TY29yZUNvbmZpcm0gPSAoc2NvcmVfaWQpID0+IHtcclxuICAgICAgICBBcGkoXCJzY29yZS5jb25maXJtXCIsIHsgc2NvcmVfaWQ6IHNjb3JlX2lkIH0pLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpO1xyXG4gICAgICAgIGxldCBMYXlvdXRDbGFzcyA9IEp1ZGdlVGFibGV0LkxBWU9VVFNbc2NvcmluZ190eXBlXTtcclxuICAgICAgICBpZiAoIUxheW91dENsYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2Pk5vdCBpbXBsZW1lbnRlZCE8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3NmYXJyLUp1ZGdlVGFibGV0XCI+XHJcbiAgICAgICAgICAgICAgICA8TGF5b3V0Q2xhc3NcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLm9uU2NvcmVDb25maXJtIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZV9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyYm9zZV90b3RhbF9zY29yZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c190b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzaG93VG90YWxTY29yZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRDYXJkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCLigJRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGVhZF9qdWRnZV9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMuZmluZChcclxuICAgICAgICAgICAgc2NvcmUgPT4gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwLmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKS5yb2xlID09PSBcImhlYWRfanVkZ2VcIik7XHJcbiAgICAgICAgaWYgKCFoZWFkX2p1ZGdlX3Njb3JlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1RvdGFsU2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gXCLigJRcIjtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gKFxyXG4gICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICZuYnNwO3sgXCIvIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBjb250ZW50IH1cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnBsYWNlIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudClcclxuICAgICAgICAgICAgICAgICB9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIH1cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRDYXJkKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlMV9Sb3dcIjtcclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIG5leHRfdG91cl9pZDogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XG4gICAgICAgIGRvY3hcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZVwiLCBcImZvbnQtc2l6ZVwiLCBcIjEycHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKTtcbiAgICB9XG5cbiAgICBnZXRSb3dTdGF0dXMocm93KSB7XG4gICAgICAgIGlmICghcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X3BlcmZvcm1lZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3cuYWR2YW5jZXMgPyBcImFkdmFuY2VkXCIgOiBcIm5vdF9hZHZhbmNlZFwiO1xuICAgIH1cbiAgICBnZXRTdGF0dXNIZWFkZXIocm93X3N0YXR1cykge1xuICAgICAgICByZXR1cm4gXyhgcmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c18ke3Jvd19zdGF0dXN9YCk7XG4gICAgfVxuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKHByZXZfcm93LCBuZXh0X3JvdywgaGFzX25leHRfdG91ciwgbl9jb2xzKSB7XG4gICAgICAgIGNvbnN0IHByZXZfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMocHJldl9yb3cpO1xuICAgICAgICBjb25zdCBuZXh0X3N0YXR1cyA9IHRoaXMuZ2V0Um93U3RhdHVzKG5leHRfcm93KTtcbiAgICAgICAgaWYgKHByZXZfc3RhdHVzID09PSBuZXh0X3N0YXR1cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRfc3RhdHVzICE9PSBcIm5vdF9wZXJmb3JtZWRcIiAmJiAhaGFzX25leHRfdG91cikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgQUgke25leHRfcm93LnJ1bi5pZH1gIH0+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImFkdmFuY2VzLWhlYWRlclwiIGNvbFNwYW49eyBuX2NvbHMgfT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RhdHVzSGVhZGVyKG5leHRfc3RhdHVzKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBjb25zdCBzaG93X3RvdGFsX3Njb3JlID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YoXG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPCAwO1xuICAgICAgICBjb25zdCBkanNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZGogPT4gW2RqLmlkLCBkal0pKTtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wcy50YWJsZS5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRhYmxlW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4XSxcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIDUgKyBzaG93X3RvdGFsX3Njb3JlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucHJvcHMudGFibGVbaWR4XTtcbiAgICAgICAgICAgIHJvd3MucHVzaChcbiAgICAgICAgICAgICAgICA8Um93XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgcm93LnJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHJvdz17IHJvdyB9XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlPXsgc2hvd190b3RhbF9zY29yZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUmVzdWx0c1RhYmxlMVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2x1YlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNob3dfdG90YWxfc2NvcmUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SZXN1bHRzVGFibGUxLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlMVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uc1dpZHRocyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcywgaGFzX3RvdGFsX3Njb3JlKSB7XHJcbiAgICAgICAgdGhpcy5qdWRnZV93aWR0aCA9IE1hdGgucm91bmQoNTUgLyAobl9qdWRnZXMgKyAxKSk7XHJcbiAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCA9IGhhc190b3RhbF9zY29yZSA/IDE0IDogMDtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gNjtcclxuICAgICAgICB0aGlzLm51bWJlcl93aWR0aCA9IDM7XHJcbiAgICAgICAgdGhpcy5uYW1lX3dpZHRoID0gMTAwIC0gdGhpcy5qdWRnZV93aWR0aCAqIChuX2p1ZGdlcyArIDEpIC1cclxuICAgICAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCAtIHRoaXMucGxhY2Vfd2lkdGggLSB0aGlzLm51bWJlcl93aWR0aDtcclxuICAgIH1cclxuICAgIGdlblBsYWNlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuTnVtYmVyU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubnVtYmVyX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbk5hbWVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5uYW1lX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlblRvdGFsU2NvcmVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy50b3RhbF9zY29yZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5KdWRnZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmp1ZGdlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBwbGFjZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBzY29yZXM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Zvcm1hdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FyZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwi4oCUXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWRfanVkZ2Vfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLmZpbmQoXHJcbiAgICAgICAgICAgIHNjb3JlID0+IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlc01hcC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCkucm9sZSA9PT0gXCJoZWFkX2p1ZGdlXCIpO1xyXG4gICAgICAgIGlmICghaGVhZF9qdWRnZV9zY29yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZWFkX2p1ZGdlX3Njb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LmFkZGl0aW9uYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH1cclxuICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgeyBgICgke3Njb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgxKX0pYCB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyU2NvcmUoZGlzY2lwbGluZV9qdWRnZSwgc2NvcmUpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJm1kYXNoO1xyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImRhbmNlX2p1ZGdlXCIgJiYgdGhpcy5pc0Zvcm1hdGlvbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIHsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIHtcclxuICAgICAgICBjb25zdCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlO1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93VG90YWxTY29yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmbWRhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBfc2NvcmUgPSB0b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgY29uc3Qgc19zY29yZSA9IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGAke18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZV9zaG9ydFwiKSB9OiAke3Bfc2NvcmV9IC8gJHtzX3Njb3JlfWAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2VtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwO3sgXCIvIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAmbmJzcDt7IFwiLyBcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlckp1ZGdlc1Njb3JlcygpIHtcclxuICAgICAgICBjb25zdCBzY29yZXNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLm1hcChzY29yZSA9PiBbc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCwgc2NvcmVdKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluZURpc2NpcGxpbmVKdWRnZXMubWFwKChkaiwgaWR4KSA9PlxyXG4gICAgICAgICAgICA8dGQga2V5PXsgZGogPyBkai5pZCA6IGBJJHtpZHh9YCB9PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlKGRqLCBzY29yZXNfbWFwLmdldChkai5pZCkpIH1cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50KSB9XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmVDZWxsKCkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckp1ZGdlc1Njb3JlcygpIH1cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldENhcmQoKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5Sb3cuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUyX1Jvd1wiO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIjtcclxuaW1wb3J0IENvbHVtbnNXaWR0aHMgZnJvbSBcIi4vQ29sdW1uc1dpZHRoc1wiO1xyXG5cclxuaW1wb3J0IGdldEp1ZGdlVGFibGVNYXJrIGZyb20gXCJnZXRKdWRnZVRhYmxlTWFya1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1RhYmxlMiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBhZHZhbmNlczogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyYW5zZm9ybURvY3goZG9jeCkge1xyXG4gICAgICAgIGRvY3hcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Um93U3RhdHVzKHJvdykge1xyXG4gICAgICAgIGlmICghcm93KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJub3RfcGVyZm9ybWVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3cuYWR2YW5jZXMgPyBcImFkdmFuY2VkXCIgOiBcIm5vdF9hZHZhbmNlZFwiO1xyXG4gICAgfVxyXG4gICAgZ2V0U3RhdHVzSGVhZGVyKHJvd19zdGF0dXMpIHtcclxuICAgICAgICByZXR1cm4gXyhgcmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c18ke3Jvd19zdGF0dXN9YCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3csIGhhc19uZXh0X3RvdXIsIG5fY29scykge1xyXG4gICAgICAgIGNvbnN0IHByZXZfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMocHJldl9yb3cpO1xyXG4gICAgICAgIGNvbnN0IG5leHRfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMobmV4dF9yb3cpO1xyXG4gICAgICAgIGlmIChwcmV2X3N0YXR1cyA9PT0gbmV4dF9zdGF0dXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXh0X3N0YXR1cyAhPT0gXCJub3RfcGVyZm9ybWVkXCIgJiYgIWhhc19uZXh0X3RvdXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgQUgke25leHRfcm93LnJ1bi5pZH1gIH0+XHJcbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RhdHVzSGVhZGVyKG5leHRfc3RhdHVzKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNob3dfdG90YWxfc2NvcmUgPSBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZihcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMDtcclxuICAgICAgICBjb25zdCBsaW5lX2p1ZGdlcyA9IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLmZpbHRlcihcclxuICAgICAgICAgICAgZGogPT4gW1wiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCJdLmluZGV4T2YoZGoucm9sZSkgPj0gMCk7XHJcbiAgICAgICAgY29uc3QgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XHJcbiAgICAgICAgY29uc3Qgd2lkdGhzID0gbmV3IENvbHVtbnNXaWR0aHMobGluZV9qdWRnZXMubGVuZ3RoLCBzaG93X3RvdGFsX3Njb3JlKTtcclxuICAgICAgICBjb25zdCBkanNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZGogPT4gW2RqLmlkLCBkal0pKTtcclxuICAgICAgICBsZXQgcm93cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcHMudGFibGUubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4IC0gMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRhYmxlW2lkeF0sXHJcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxyXG4gICAgICAgICAgICAgICAgNCArIGxpbmVfanVkZ2VzLmxlbmd0aCArIHNob3dfdG90YWxfc2NvcmVcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaChcclxuICAgICAgICAgICAgICAgIDxSb3dcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgZGpzX21hcCB9XHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgdGhpcy5wcm9wcy50YWJsZVtpZHhdLnJ1bi5pZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZURpc2NpcGxpbmVKdWRnZXM9eyBsaW5lX2p1ZGdlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy50YWJsZVtpZHhdIH1cclxuICAgICAgICAgICAgICAgICAgICBzaG93VG90YWxTY29yZT17IHNob3dfdG90YWxfc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJSZXN1bHRzVGFibGUyXCI+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIiBzdHlsZT17IHdpZHRocy5nZW5OdW1iZXJTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHN0eWxlPXsgd2lkdGhzLmdlbk5hbWVTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNob3dfdG90YWxfc2NvcmUgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuVG90YWxTY29yZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsaW5lX2p1ZGdlcy5tYXAoZGogPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGgga2V5PXsgZGouaWQgfSBzdHlsZT17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGdldEp1ZGdlVGFibGVNYXJrKGRqKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm93cyB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlc3VsdHNUYWJsZTIuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUyXCI7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbHVtbnNXaWR0aHMge1xyXG4gICAgY29uc3RydWN0b3Iobl9qdWRnZXMpIHtcclxuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg3MCAvIG5fanVkZ2VzKTtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gN1xyXG4gICAgICAgIHRoaXMuaW5mb193aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtIHRoaXMucGxhY2Vfd2lkdGg7XHJcbiAgICB9XHJcbiAgICBnZW5QbGFjZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkluZm9TdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5pbmZvX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3JvU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9uczogUFQuYXJyYXlPZihQVC5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5hY3JvX25cIiwgaWR4ICsgMSkgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUoc2NvcmUsIFwiLSQlXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZmRcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5BY3JvU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19BY3JvU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X3dvbWFuOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmd19tYW46IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yaW5nVHlwZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY29yZV9mb3JtYXQgPSB0aGlzLnByb3BzLnNjb3JpbmdUeXBlID09PSBcImRhbmNlX2hhbHZlZFwiID8gXCJAXCIgOiBcIiRcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmZ3XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5md193b21hbiwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmZ3X21hbiwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIHNjb3JlX2Zvcm1hdCkgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uY1wiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmNvbXBvc2l0aW9uLCBzY29yZV9mb3JtYXQpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93X0RhbmNlU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25BY3JvU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBwbGFjZXM6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV90ZWNoOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXByZXNzaW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmFcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmFjcm9iYXRpY3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfdGVjaCwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uaVwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuc21hbGxfbWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnBcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5yb3cuYWRkaXRpb25hbF9kYXRhLnBsYWNlc1t0aGlzLnByb3BzLnNjb3JlLmlkXSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Gb3JtYXRpb25BY3JvU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25BY3JvU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbF9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlczogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuaW1wcmVzc2lvbiwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMucm93LmFkZGl0aW9uYWxfZGF0YS5wbGFjZXNbdGhpcy5wcm9wcy5zY29yZS5pZF0gfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xuaW1wb3J0IGdldFNjb3JpbmdUeXBlIGZyb20gXCJjb21tb24vZ2V0U2NvcmluZ1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mb0NlbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcm93OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbF9kYXRhOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBhZHZhbmNlczogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdGlvbl9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3J0c21lbjogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NlX3RvdGFsX3Njb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c190b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeV9zY29yZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50X3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbmV4dF90b3VyX2lkOiBQVC5udW1iZXIsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclBhcnRpY2lwYW50SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50KSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoZWFkX2p1ZGdlX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnNjb3Jlcy5maW5kKFxuICAgICAgICAgICAgc2NvcmUgPT4gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwLmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKS5yb2xlID09PSBcImhlYWRfanVkZ2VcIik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IGAke18oXCJyZXN1bHRzLmxhYmVscy5wZW5hbHR5XCIpfTogYCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyBoZWFkX2p1ZGdlX3Njb3JlXG4gICAgICAgICAgICAgICAgICAgID8gIGhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKClcbiAgICAgICAgICAgICAgICAgICAgOiBcIuKAlFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBY3JvVGFibGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFtcInJvc2ZhcnIuYWNyb1wiLCBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvdy5ydW4uYWNyb2JhdGljcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhc19hY3JvX292ZXJyaWRlcyA9IHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLmZpbmRJbmRleChcbiAgICAgICAgICAgIGVsZW1lbnQgPT4gZWxlbWVudC5zY29yZSAhPT0gZWxlbWVudC5vcmlnaW5hbF9zY29yZVxuICAgICAgICApID4gMDtcbiAgICAgICAgY29uc3QgYWNyb19jZWxsX3dpZHRoID0gYCR7KDEwMCAvIHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLmxlbmd0aCl9JWA7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBoYXNfYWNyb19vdmVycmlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJyZXN1bHRzLmxhYmVscy5hY3JvYmF0aWNzX3ZlcmJvc2VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF8oXCJyZXN1bHRzLmxhYmVscy5hY3JvYmF0aWNzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9OlxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImFjcm8tdGFibGVcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IHN0eWxlPXsgeyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5vcmlnaW5hbF9zY29yZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgeyBoYXNfYWNyb19vdmVycmlkZXMgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IHN0eWxlPXsgeyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLnNjb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBbUNsYXNzRndTY29yZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IHNfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuZndfc2NvcmVcIikgfVxuICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIHsgYDogJHtwX3Njb3JlfSAvICR7c19zY29yZX1gIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQW1DbGFzc0Fjcm9TY29yZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpO1xuICAgICAgICBjb25zdCBzX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuY3VycmVudF90b3VyLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuYWNyb19zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyBgOiAke3Bfc2NvcmV9IC8gJHtzX3Njb3JlfWAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJUb3RhbFNjb3JlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIHsgYCR7XyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpfTogJHt0aGlzLnByb3BzLnJvdy5ydW4udG90YWxfc2NvcmV9YCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxlbT5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMubm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgICAgICAgICAgPC9lbT5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXJOZXh0VG91ckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIHsgYCR7XyhcInJlc3VsdHMubGFiZWxzLm5leHRfdG91clwiKX06IGAgfVxuICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cuYWR2YW5jZXNcbiAgICAgICAgICAgICAgICAgICAgPyBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIilcbiAgICAgICAgICAgICAgICAgICAgOiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImluZm8tYmxvY2tcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydGljaXBhbnRJbmZvKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBY3JvVGFibGUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NGd1Njb3JlKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUb3RhbFNjb3JlKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb3RQZXJmb3JtZWRMYWJlbCgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTmV4dFRvdXJMYWJlbCgpIH1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5JbmZvQ2VsbC5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfSW5mb0NlbGxcIjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdFNjb3JlKHNjb3JlLCB0ZW1wbGF0ZT1cIiRcIikge1xuICAgIGlmIChzY29yZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCLigJRcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwiJFwiLCBzY29yZSlcbiAgICAgICAgLnJlcGxhY2UoXCJAXCIsIHNjb3JlLnRvRml4ZWQoMSkpO1xufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGdldFNjb3JpbmdUeXBlIGZyb20gXCJjb21tb24vZ2V0U2NvcmluZ1R5cGVcIjtcblxuaW1wb3J0IEluZm9DZWxsIGZyb20gXCIuL0luZm9DZWxsXCI7XG5pbXBvcnQgQWNyb1Njb3JlIGZyb20gXCIuL0Fjcm9TY29yZVwiO1xuaW1wb3J0IERhbmNlU2NvcmUgZnJvbSBcIi4vRGFuY2VTY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvbkFjcm9TY29yZSBmcm9tIFwiLi9Gb3JtYXRpb25BY3JvU2NvcmVcIjtcbmltcG9ydCBGb3JtYXRpb25TY29yZSBmcm9tIFwiLi9Gb3JtYXRpb25TY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbGluZURpc2NpcGxpbmVKdWRnZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBzY29yZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZV9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdmVyYm9zZV90b3RhbF9zY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeV9zY29yZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c190b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeV9zY29yZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJTY29yZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yZSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgJm1kYXNoO1xuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IFNjb3JlQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgY29uc3Qgc2NvcmluZ190eXBlID0gZ2V0U2NvcmluZ1R5cGUoZGlzY2lwbGluZV9qdWRnZSwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpO1xuICAgICAgICBzd2l0Y2ggKHNjb3JpbmdfdHlwZSkge1xuICAgICAgICBjYXNlIFwiZGFuY2VcIjpcbiAgICAgICAgY2FzZSBcImRhbmNlX2hhbHZlZFwiOlxuICAgICAgICAgICAgU2NvcmVDb21wb25lbnQgPSBEYW5jZVNjb3JlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IEFjcm9TY29yZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IEZvcm1hdGlvblNjb3JlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25fYWNyb1wiOlxuICAgICAgICAgICAgU2NvcmVDb21wb25lbnQgPSBGb3JtYXRpb25BY3JvU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgICAgICByb3c6IHRoaXMucHJvcHMucm93LFxuICAgICAgICAgICAgc2NvcmluZ1R5cGU6IHNjb3JpbmdfdHlwZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTY29yZUNvbXBvbmVudCB7IC4uLnByb3BzIH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySnVkZ2VzU2NvcmVzKCkge1xuICAgICAgICBjb25zdCBzY29yZXNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLm1hcChzY29yZSA9PiBbc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCwgc2NvcmVdKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmxpbmVEaXNjaXBsaW5lSnVkZ2VzLm1hcCgoZGosIGlkeCkgPT5cbiAgICAgICAgICAgIDx0ZCBrZXk9eyBkaiA/IGRqLmlkIDogYEkke2lkeH1gIH0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlKGRqLCBzY29yZXNfbWFwLmdldChkai5pZCkpIH1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucGxhY2UgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8SW5mb0NlbGxcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcD17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlc01hcCB9XG4gICAgICAgICAgICAgICAgICAgIHJvdz17IHRoaXMucHJvcHMucm93IH1cbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySnVkZ2VzU2NvcmVzKCkgfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJvdy5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93XCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIjtcclxuaW1wb3J0IENvbHVtbnNXaWR0aHMgZnJvbSBcIi4vQ29sdW1uc1dpZHRoc1wiO1xyXG5cclxuaW1wb3J0IGdldEp1ZGdlVGFibGVNYXJrIGZyb20gXCJnZXRKdWRnZVRhYmxlTWFya1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1RhYmxlMyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgIHRhYmxlOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG5leHRfdG91cl9pZDogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyYW5zZm9ybURvY3goZG9jeCkge1xyXG4gICAgICAgIGRvY3hcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImZvbnQtc2l6ZVwiLCBcIjlwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAzcHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiYm9yZGVyXCIsIFwiMC41cHQgc29saWQgYmxhY2tcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJwYWRkaW5nXCIsIFwiMCAxcHQgMCAwXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgMCAwIDFwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwidGV4dC1hbGlnblwiLCBcInJpZ2h0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93blwiLCBcIndpZHRoXCIsIFwiNTBwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYWR2YW5jZXMtaGVhZGVyXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdGFsLXNjb3JlXCIsIFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBsaW5lX2p1ZGdlcyA9IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLmZpbHRlcihcclxuICAgICAgICAgICAgZGogPT4gW1wiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCJdLmluZGV4T2YoZGoucm9sZSkgPj0gMCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGhzID0gbmV3IENvbHVtbnNXaWR0aHMobGluZV9qdWRnZXMubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBkanNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZGogPT4gW2RqLmlkLCBkal0pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJSZXN1bHRzVGFibGUzXCI+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHN0eWxlPXsgd2lkdGhzLmdlbkluZm9TdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLmluZm9cIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxpbmVfanVkZ2VzLm1hcChkaiA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBrZXk9eyBkai5pZCB9IHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZ2V0SnVkZ2VUYWJsZU1hcmsoZGopIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRhYmxlLm1hcChyb3cgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgZGpzX21hcCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgcm93LnJ1bi5pZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZURpc2NpcGxpbmVKdWRnZXM9eyBsaW5lX2p1ZGdlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93PXsgcm93IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZXN1bHRzVGFibGUzLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM1wiO1xyXG4iLCJ2YXIgQ2FjaGVNaXhpbiA9IEJhc2UgPT4gY2xhc3MgZXh0ZW5kcyBCYXNlIHtcbiAgICByZXNldENhY2hlKCkge1xuICAgICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2V0Q2FjaGUoKTtcbiAgICB9XG4gICAgZmV0Y2hGcm9tQ2FjaGUoa2V5LCBnZW5lcmF0b3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY2FjaGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVtrZXldID0gZ2VuZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlW2tleV07XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FjaGVNaXhpbjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcnRpY2lwYW50RGlzcGxheShwYXJ0aWNpcGFudCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2Rpc3BsYXktbmFtZVxyXG4gICAgaWYgKHBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICB7IHBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lIH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFydGljaXBhbnQuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PlxyXG4gICAgICAgIDxwIGtleT17IGlkeCB9PlxyXG4gICAgICAgICAgICB7IHMubGFzdF9uYW1lICsgXCIgXCIgKyBzLmZpcnN0X25hbWUgfVxyXG4gICAgICAgIDwvcD5cclxuICAgICk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2NvcmluZ1R5cGUoZGlzY2lwbGluZV9qdWRnZSwgc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xyXG4gICAgc3dpdGNoIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUpIHtcclxuICAgIGNhc2UgXCJkYW5jZV9qdWRnZVwiOlxyXG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25cIjtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25fYWNyb1wiO1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwic2ltcGxpZmllZFwiO1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCI6XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZV9oYWx2ZWRcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZVwiO1xyXG4gICAgICAgIH1cclxuICAgIGNhc2UgXCJhY3JvX2p1ZGdlXCI6XHJcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiZGFuY2VfaGFsdmVkXCI7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwiYWNyb1wiO1xyXG4gICAgICAgIH1cclxuICAgIGNhc2UgXCJ0ZWNoX2p1ZGdlXCI6XHJcbiAgICAgICAgcmV0dXJuIFwidGVjaFwiO1xyXG4gICAgY2FzZSBcImhlYWRfanVkZ2VcIjpcclxuICAgICAgICByZXR1cm4gXCJoZWFkXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiZnVuY3Rpb24gZ2V0SnVkZ2VUYWJsZU1hcmsoZGlzY2lwbGluZV9qdWRnZSkge1xuICAgIGxldCByZXN1bHQgPSBkaXNjaXBsaW5lX2p1ZGdlLmp1ZGdlLm51bWJlcjtcbiAgICBpZiAoZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImFjcm9fanVkZ2VcIikge1xuICAgICAgICByZXN1bHQgKz0gXCIgKEEpXCI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEp1ZGdlVGFibGVNYXJrO1xuIiwiaW1wb3J0IHRyYW5zbGF0ZV9ydSBmcm9tIFwiLi9ydVwiO1xyXG5cclxuY29uc3QgXyA9IHRyYW5zbGF0ZV9ydVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgXztcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgLi4uYXJncykge1xyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmNvbmZpcm1fc2NvcmVcIjogXCLQntGC0LzQtdC90LAg0YTQuNC60YHQsNGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gYNCQ0LrRgNC+0LHQsNGC0LjQutCwICR7biArIDF9YCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX251bWJlclwiOiAobikgPT4gYNCh0YPQtNGM0Y8g4oSWJHtufWAsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRfbnVtYmVyXCI6IChuLCB0KSA9PiBg0JfQsNGF0L7QtCAke259INC40LcgJHt0fWAsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJrX25vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZF9ub3RfcGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF90b19uXCI6IChuKSA9PiBg0KHQsdGA0L7RgSDQvdCwICR7bn1gLFxyXG4gICAgICAgICAgICAgICAgXCJ0aW1pbmdcIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jaW5nXCI6IFwi0KLQsNC90LXRhlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBgQSR7bn1gLFxyXG4gICAgICAgICAgICAgICAgXCJibVwiOiBcItCR0J5cIixcclxuICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkdFwiOiBcItCiVFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3XCI6IFwi0J7QpdC2XCIsXHJcbiAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXHJcbiAgICAgICAgICAgICAgICBcInBcIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIjogXCLQndC1INC/0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzX3ZlcmJvc2VcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCAo0LfQsNGP0LLQutCwL9GE0LDQutGCKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X3Njb3JlX3Nob3J0XCI6IFwi0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0L/RgNC40L3QuNC80LDQuyDRg9GH0LDRgdGC0LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5fc3AgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBg0KTQvtGA0LzQtdC50YjQvSDihJYke259YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOiAke25hbWV9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG5fc3AgPT09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYNCf0LDRgNCwIOKEliR7bn1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYNCj0YfQsNGB0YLQvdC40Log4oSWJHtufWBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IGDQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWJHtufWAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJhc2VfbmFtZVwiOiBcItCg0L7RgdCk0JDQoNCgXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnZV9yb2xlc1wiOiB7XHJcbiAgICAgICAgICAgIFwiXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCLQodGD0LTRjNGPINGC0LDQvdGG0LBcIixcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcclxuICAgIGxldCBwaHJhc2VfcHRyID0gUEhSQVNFUztcclxuICAgIGZvciAoY29uc3QgY2h1bmsgb2YgcGF0aCkge1xyXG4gICAgICAgIHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXTtcclxuICAgICAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yICR7c3JjfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbnRyYW5zbGF0ZS50b3VyX25hbWVfc3VnZ2VzdGlvbnMgPSBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImNvbnN0IG1ldGEgPSB7XG4gICAgXCJqdWRnZV9yb2xlc1wiOiBbXG4gICAgICAgIFwiZGFuY2VfanVkZ2VcIixcbiAgICAgICAgXCJhY3JvX2p1ZGdlXCIsXG4gICAgICAgIFwiaGVhZF9qdWRnZVwiLFxuICAgICAgICBcInRlY2hfanVkZ2VcIixcbiAgICBdLFxuICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IFtcbiAgICAgICAgXCJyb3NmYXJyLm5vX2Fjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLmFjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLmZvcm1hdGlvblwiLFxuICAgICAgICBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIixcbiAgICAgICAgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCIsXG4gICAgICAgIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIsXG4gICAgXSxcbiAgICBcInN1Z2dlc3RlZF9wcm9ncmFtc1wiOiBbXG4gICAgICAgIFwiZGVmYXVsdFwiLFxuICAgICAgICBcInF1YWxpZmljYXRpb25cIixcbiAgICAgICAgXCJxdWFydGVyZmluYWxcIixcbiAgICAgICAgXCJmaW5hbFwiLFxuICAgIF0sXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWV0YTtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUxIGZyb20gXCJSZXN1bHRzVGFibGUxXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUyIGZyb20gXCJSZXN1bHRzVGFibGUyXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUzIGZyb20gXCJSZXN1bHRzVGFibGUzXCI7XHJcbmltcG9ydCBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGZyb20gXCJEaXNjaXBsaW5lUmVzdWx0c1RhYmxlXCI7XHJcbmltcG9ydCBKdWRnZVRhYmxldCBmcm9tIFwiSnVkZ2VUYWJsZXRcIjtcclxuaW1wb3J0IEFkbWluU2NvcmVJbnB1dCBmcm9tIFwiQWRtaW5TY29yZUlucHV0XCI7XHJcbmltcG9ydCBnZXRKdWRnZVRhYmxlTWFyayBmcm9tIFwiZ2V0SnVkZ2VUYWJsZU1hcmtcIjtcclxuaW1wb3J0IG1ldGEgZnJvbSBcIm1ldGFcIjtcclxuXHJcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5jb25zdCByZXNwb25zZSA9IHdpbmRvdy5yZWdpc3RlclJ1bGVzU2V0KFwiUm9zRkFSUlwiLCB7XHJcbiAgICBtZXRhOiBtZXRhLFxyXG4gICAgdHJhbnNsYXRlOiBfLFxyXG4gICAgdG91cl9yZXN1bHRzX3RhYmxlXzE6IFJlc3VsdHNUYWJsZTEsXHJcbiAgICB0b3VyX3Jlc3VsdHNfdGFibGVfMjogUmVzdWx0c1RhYmxlMixcclxuICAgIHRvdXJfcmVzdWx0c190YWJsZV8zOiBSZXN1bHRzVGFibGUzLFxyXG4gICAgZGlzY2lwbGluZV9yZXN1bHRzX3RhYmxlOiBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxyXG4gICAganVkZ2VfdGFibGV0OiBKdWRnZVRhYmxldCxcclxuICAgIGFkbWluX3Njb3JlX2lucHV0OiBBZG1pblNjb3JlSW5wdXQsXHJcbiAgICBnZXRfanVkZ2VfdGFibGVfbWFyazogZ2V0SnVkZ2VUYWJsZU1hcmssXHJcbn0pO1xyXG5cclxuc2V0dXAocmVzcG9uc2UpO1xyXG4iXX0=
