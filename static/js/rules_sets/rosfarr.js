(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = closeDialog;
function closeDialog() {
    swal.close();
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = showConfirm;

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showConfirm(message, action) {
    var close_on_confirm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return swal({
        title: message,
        animation: false,
        showCancelButton: true,
        confirmButtonText: (0, _l10n2.default)("global.labels.yes"),
        cancelButtonText: (0, _l10n2.default)("global.labels.no"),
        closeOnConfirm: close_on_confirm
    }, action);
}

},{"l10n":104}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, IntegerInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IntegerInput.__proto__ || Object.getPrototypeOf(IntegerInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleMinus = function () {
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
                    "\u2212"
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

},{"./onTouchOrClick":10,"common/makeClassName":3}],5:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (NumberSelectorInput.__proto__ || Object.getPrototypeOf(NumberSelectorInput)).apply(this, arguments));
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

},{"./SelectorInput":7}],6:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
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

},{"../onTouchOrClick":10,"common/makeClassName":3}],7:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (SelectorInput.__proto__ || Object.getPrototypeOf(SelectorInput)).apply(this, arguments));
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

},{"./Item":6,"common/makeClassName":3}],8:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

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
                    "\u2192"
                ),
                this.renderText()
            );
        }
    }]);

    return Slider;
}(React.Component);

exports.default = Slider;


Slider.displayName = "tablet_ui_Slider";

},{"common/makeClassName":3}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DanceScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DanceScore.__proto__ || Object.getPrototypeOf(DanceScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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

},{"./GeneralEditor":18,"./genScale":24}],12:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ConfirmationButton.__proto__ || Object.getPrototypeOf(ConfirmationButton)).apply(this, arguments));
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

},{"l10n":104}],13:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DanceHalvedScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DanceHalvedScore.__proto__ || Object.getPrototypeOf(DanceHalvedScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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

},{"./GeneralEditor":18,"./genScale":24}],14:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DanceScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DanceScore.__proto__ || Object.getPrototypeOf(DanceScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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

},{"./GeneralEditor":18,"./genScale":24}],15:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FormationScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormationScore.__proto__ || Object.getPrototypeOf(FormationScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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

},{"./GeneralEditor":18,"./genScale":24}],16:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FormationScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormationScore.__proto__ || Object.getPrototypeOf(FormationScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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

},{"./GeneralEditor":18,"./genScale":24}],17:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
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

},{}],18:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (GeneralEditor.__proto__ || Object.getPrototypeOf(GeneralEditor)).call(this, props));

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
                "\xA0",
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

},{"./Item":17,"l10n":104}],19:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, HeadJudgeFormationScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeadJudgeFormationScore.__proto__ || Object.getPrototypeOf(HeadJudgeFormationScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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
                fields: [this.makeField("penalty", "P", [["", "—"], ["0", "OK"], ["-5", "-5"], ["-15", "-15"]]), this.makeField("nexttour", "NT", [["false", "No"], ["true", "Yes"]])],
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

},{"./GeneralEditor":18}],20:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, HeadJudgeScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeadJudgeScore.__proto__ || Object.getPrototypeOf(HeadJudgeScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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
                fields: [this.makeField("penalty", "P", [["", "—"], ["0", "OK"], ["-3", "-3"], ["-30", "-30"], ["-100", "-100"]]), this.makeField("nexttour", "NT", [["false", "No"], ["true", "Yes"]])],
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

},{"./GeneralEditor":18}],21:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SimplifiedScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimplifiedScore.__proto__ || Object.getPrototypeOf(SimplifiedScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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

},{"./GeneralEditor":18,"./genScale":24}],22:[function(require,module,exports){
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

var TechFormationJudgeScore = function (_React$Component) {
    _inherits(TechFormationJudgeScore, _React$Component);

    function TechFormationJudgeScore() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TechFormationJudgeScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TechFormationJudgeScore.__proto__ || Object.getPrototypeOf(TechFormationJudgeScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                penalty: data.penalty === "" ? null : parseInt(data.penalty),
                jump_steps: parseInt(data.jump_steps),
                timing_violation: data.timing_violation === "" ? null : data.timing_violation === "true"
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TechFormationJudgeScore, [{
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
                fields: [this.makeField("penalty", "P", [["0", "OK"], ["-5", "-5"], ["-15", "-15"]]), this.makeField("jump_steps", "JS", (0, _genScale2.default)("numbers", { max: 100 })), this.makeField("timing_violation", "T", [["", "?"], ["false", "✓"], ["true", "✗"]])],
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
                            penalty: PT.number,
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

    return TechFormationJudgeScore;
}(React.Component);

exports.default = TechFormationJudgeScore;


TechFormationJudgeScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_TechFormationJudgeScore";

},{"./GeneralEditor":18,"./genScale":24}],23:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TechJudgeScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TechJudgeScore.__proto__ || Object.getPrototypeOf(TechJudgeScore)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmission = function (data) {
            _this.props.onSubmit({
                penalty: data.penalty === "" ? null : parseInt(data.penalty),
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
                fields: [this.makeField("penalty", "P", [["0", "OK"], ["-3", "-3"], ["-30", "-30"], ["-100", "-100"]]), this.makeField("jump_steps", "JS", (0, _genScale2.default)("numbers", { max: 100 })), this.makeField("timing_violation", "T", [["", "?"], ["false", "✓"], ["true", "✗"]])],
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
                            penalty: PT.number,
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

},{"./GeneralEditor":18,"./genScale":24}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

var _TechJudgeFormationScore = require("./TechJudgeFormationScore");

var _TechJudgeFormationScore2 = _interopRequireDefault(_TechJudgeFormationScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_React$Component) {
    _inherits(Editor, _React$Component);

    function Editor() {
        _classCallCheck(this, Editor);

        return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
    }

    _createClass(Editor, [{
        key: "renderBody",
        value: function renderBody(scoring_type) {
            if (scoring_type === "head" && ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0) {
                scoring_type = "head_formation";
            }
            if (scoring_type === "tech" && ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0) {
                scoring_type = "tech_formation";
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
                case "tech_formation":
                    return React.createElement(_TechJudgeFormationScore2.default, score_props);
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

},{"./AcroScore":11,"./ConfirmationButton":12,"./DanceHalvedScore":13,"./DanceScore":14,"./FormationAcroScore":15,"./FormationScore":16,"./HeadJudgeFormationScore":19,"./HeadJudgeScore":20,"./SimplifiedScore":21,"./TechJudgeFormationScore":22,"./TechJudgeScore":23,"common/getScoringType":102}],26:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (AdminScoreInput.__proto__ || Object.getPrototypeOf(AdminScoreInput)).apply(this, arguments));
    }

    _createClass(AdminScoreInput, [{
        key: "render",
        value: function render() {
            if (!this.props.editing) {
                if (this.props.disciplineJudge.role === "head_judge") {
                    var result = this.props.score.data.raw_data.penalty === null ? "—" : this.props.score.data.total_score.toFixed();
                    if (this.props.score.data.raw_data.nexttour) {
                        result += "/NT";
                    }
                    return React.createElement(
                        "span",
                        null,
                        result
                    );
                }
                if (this.props.disciplineJudge.role === "tech_judge") {
                    return React.createElement(
                        "span",
                        null,
                        this.props.score.data.total_score.toFixed()
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

},{"./Editor":25}],27:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (DisciplineResultsTable.__proto__ || Object.getPrototypeOf(DisciplineResultsTable)).apply(this, arguments));
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

},{"l10n":104}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Element);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Element.__proto__ || Object.getPrototypeOf(Element)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
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

},{"JudgeTablet/GeneralScale":56,"l10n":104}],30:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (Elements.__proto__ || Object.getPrototypeOf(Elements)).apply(this, arguments));
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

},{"./Element":29}],31:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mistakes.__proto__ || Object.getPrototypeOf(Mistakes)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
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

},{"l10n":104,"tablet_ui/IntegerInput":4}],32:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).call.apply(_ref, [this].concat(args))), _this), _this.handleAcroReductionUpdate = function (acro_idx, value) {
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

},{"./Elements":30,"./Mistakes":31,"JudgeTablet/TotalScore":82}],33:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (AcrobaticsLayout.__proto__ || Object.getPrototypeOf(AcrobaticsLayout)).apply(this, arguments));
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

},{"./ScoringLayout":32,"JudgeTablet/GeneralLayout":55}],34:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ConfirmationButton.__proto__ || Object.getPrototypeOf(ConfirmationButton)).apply(this, arguments));
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

},{"common/makeClassName":3,"l10n":104,"tablet_ui/Slider":8}],35:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mistakes.__proto__ || Object.getPrototypeOf(Mistakes)).call.apply(_ref, [this].concat(args))), _this), _this.handleSmallMistakesChange = function (value) {
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

},{"l10n":104,"tablet_ui/IntegerInput":4}],36:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScorePart.__proto__ || Object.getPrototypeOf(ScorePart)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
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

},{"JudgeTablet/GeneralScale":56}],37:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

},{"./Mistakes":35,"./ScorePart":36,"JudgeTablet/TotalScore":82,"l10n":104}],38:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (DancingLayout.__proto__ || Object.getPrototypeOf(DancingLayout)).apply(this, arguments));
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

},{"./ScoringLayout":37,"JudgeTablet/GeneralLayout":55}],39:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35,"l10n":104,"tablet_ui/IntegerInput":4}],40:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScorePart.__proto__ || Object.getPrototypeOf(ScorePart)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
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

},{"JudgeTablet/GeneralScale":56}],41:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

},{"./Mistakes":39,"./ScorePart":40,"JudgeTablet/TotalScore":82,"l10n":104}],42:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (DancingLayout.__proto__ || Object.getPrototypeOf(DancingLayout)).apply(this, arguments));
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

},{"./ScoringLayout":41,"JudgeTablet/GeneralLayout":55}],43:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
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

},{"tablet_ui/onTouchOrClick":10}],44:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (FooterItem.__proto__ || Object.getPrototypeOf(FooterItem)).apply(this, arguments));
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

},{}],45:[function(require,module,exports){
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

},{"./Button":43}],46:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mistakes.__proto__ || Object.getPrototypeOf(Mistakes)).call.apply(_ref, [this].concat(args))), _this), _this.handleSmallMistakesChange = function (value) {
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

},{"l10n":104,"tablet_ui/IntegerInput":4}],47:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScorePart.__proto__ || Object.getPrototypeOf(ScorePart)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (value) {
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

},{"JudgeTablet/GeneralScale":56}],48:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

},{"./Mistakes":46,"./ScorePart":47,"JudgeTablet/TotalScore":82,"l10n":104}],49:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./ScoringLayout":48,"JudgeTablet/GeneralLayout":55,"dup":38}],50:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mistakes.__proto__ || Object.getPrototypeOf(Mistakes)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
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

},{"l10n":104,"tablet_ui/IntegerInput":4}],51:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScorePart.__proto__ || Object.getPrototypeOf(ScorePart)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
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

},{"JudgeTablet/GeneralScale":56}],52:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

},{"./Mistakes":50,"./ScorePart":51,"JudgeTablet/TotalScore":82,"l10n":104}],53:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./ScoringLayout":52,"JudgeTablet/GeneralLayout":55,"dup":38}],54:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Participant);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Participant.__proto__ || Object.getPrototypeOf(Participant)).call.apply(_ref, [this].concat(args))), _this), _this.onConfirm = function () {
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
            if (this.score === null) {
                return React.createElement("div", null);
            }
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

},{"JudgeTablet/ConfirmationButton":34,"common/CacheMixin":93,"l10n":104}],55:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (GeneralLayout.__proto__ || Object.getPrototypeOf(GeneralLayout)).call(this, props));

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
                return Math.max.apply(Math, _toConsumableArray(_this3.props.tour.runs.map(function (run) {
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

},{"./Participant":54,"JudgeTablet/Grid":57,"JudgeTablet/Header":71,"common/CacheMixin":93}],56:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (GeneralScale.__proto__ || Object.getPrototypeOf(GeneralScale)).apply(this, arguments));
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

},{"tablet_ui/NumberSelectorInput":5,"tablet_ui/SelectorInput":7}],57:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
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

},{"common/CacheMixin":93}],58:[function(require,module,exports){
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

var _closeDialog = require("common/dialogs/closeDialog");

var _closeDialog2 = _interopRequireDefault(_closeDialog);

var _HostModules = require("HostModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionsPage = function (_React$Component) {
    _inherits(ActionsPage, _React$Component);

    function ActionsPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ActionsPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionsPage.__proto__ || Object.getPrototypeOf(ActionsPage)).call.apply(_ref, [this].concat(args))), _this), _this.stopTour = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.stop_tour"), function () {
                if (_this.props.tour) {
                    (0, _HostModules.Api)("tour.stop", {
                        tour_id: _this.props.tour.id
                    }).onSuccess(_closeDialog2.default).send();
                }
            });
        }, _this.finalizeTour = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.finalize_tour"), function () {
                if (_this.props.tour) {
                    (0, _HostModules.Api)("tour.finalize", {
                        tour_id: _this.props.tour.id
                    }).onSuccess(_closeDialog2.default).send();
                }
            });
        }, _this.stopTourAndStartNext = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.stop_tour_and_start_next"), function () {
                if (_this.props.tour) {
                    (function () {
                        var tour_id = _this.props.tour.id;
                        (0, _HostModules.Api)("tour.stop", { tour_id: tour_id }).onSuccess(function () {
                            (0, _HostModules.Api)("tour.start_next_after", {
                                tour_id: tour_id
                            }).onSuccess(_closeDialog2.default).send();
                        }).send();
                    })();
                }
            });
        }, _this.finalizeTourAndStartNext = function () {
            (0, _showConfirm2.default)((0, _l10n2.default)("tablet.confirms.finalize_tour_and_start_next"), function () {
                if (_this.props.tour) {
                    (function () {
                        var tour_id = _this.props.tour.id;
                        (0, _HostModules.Api)("tour.finalize", {
                            tour_id: tour_id
                        }).onSuccess(function () {
                            (0, _HostModules.Api)("tour.start_next_after", {
                                tour_id: tour_id
                            }).onSuccess(_closeDialog2.default).send();
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
                    var _run = _step3.value;

                    process_run(_run, "prev");
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
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                tour: PT.shape({
                    id: PT.number.isRequired,
                    runs: PT.arrayOf(PT.shape({
                        heat: PT.number.isRequired,
                        scores: PT.arrayOf(PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                            confirmed: PT.bool.isRequired
                        }).isRequired).isRequired
                    }).isRequired).isRequired
                })
            };
        }
    }]);

    return ActionsPage;
}(React.Component);

exports.default = ActionsPage;

},{"HostModules":28,"common/dialogs/closeDialog":1,"common/dialogs/showConfirm":2,"l10n":104,"tablet_ui/onTouchOrClick":10}],59:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ActobaticOverrides.__proto__ || Object.getPrototypeOf(ActobaticOverrides)).apply(this, arguments));
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
                { className: "acrobatic-overrides" },
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.head_judge.acrobatic_overrides")
                ),
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tbody",
                        null,
                        acrobatic_overrides.map(function (acro) {
                            return React.createElement(
                                "tr",
                                { key: acro.idx },
                                React.createElement(
                                    "td",
                                    { className: "w-5 idx" },
                                    acro.idx
                                ),
                                React.createElement(
                                    "td",
                                    { className: "description" },
                                    acro.acrobatic.description
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 original-score" },
                                    acro.acrobatic.original_score.toFixed(1)
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-5 arrow" },
                                    "\u2192"
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 score" },
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

},{"l10n":104}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerboseJudgeScore = require("common/VerboseJudgeScore");

var _VerboseJudgeScore2 = _interopRequireDefault(_VerboseJudgeScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$PureComponent) {
    _inherits(Item, _React$PureComponent);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
        key: "renderVerboseScore",
        value: function renderVerboseScore() {
            if (!this.props.showVerbose) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "verbose-score" },
                React.createElement(
                    "div",
                    { className: "judge-name" },
                    this.props.judge.name
                ),
                React.createElement(_VerboseJudgeScore2.default, {
                    performed: true,
                    disciplineJudge: this.props.disciplineJudge,
                    score: this.props.score,
                    tour: this.props.tour
                }),
                React.createElement("div", { className: "triangle" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            var confirmed = this.props.score && this.props.score.confirmed;
            return React.createElement(
                "td",
                { className: confirmed ? "confirmed" : "" },
                this.props.score ? this.props.score.data.total_score.toFixed(2) : "—",
                this.renderVerboseScore()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudge: PT.object.isRequired,
                judge: PT.shape({
                    name: PT.string.isRequired
                }).isRequired,
                score: PT.shape({
                    confirmed: PT.bool.isRequired,
                    data: PT.shape({
                        total_score: PT.number.isRequired
                    }).isRequired
                }).isRequired,
                showVerbose: PT.bool.isRequired,
                tour: PT.object.isRequired
            };
        }
    }]);

    return Item;
}(React.PureComponent);

exports.default = Item;

},{"common/VerboseJudgeScore":100}],61:[function(require,module,exports){
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

    function LineJudgeScore(props) {
        _classCallCheck(this, LineJudgeScore);

        var _this = _possibleConstructorReturn(this, (LineJudgeScore.__proto__ || Object.getPrototypeOf(LineJudgeScore)).call(this, props));

        _this.makeScoresRowRef = function (ref) {
            return _this._scores_row = ref;
        };

        _this.handleShowVerboseScore = function (event) {
            event.preventDefault();
            var position_obj = event.touches ? event.touches[0] : event;
            var target = _this._scores_row;
            var rect = target.getBoundingClientRect();
            var offset = position_obj.clientX - rect.left;
            var selected_idx = Math.floor(offset / (target.offsetWidth / _this.scores.length));
            _this.setState({
                verboseIdx: selected_idx
            });
        };

        _this.handleHideVerboseScore = function () {
            return _this.setState({ verboseIdx: null });
        };

        _this.state = {
            verboseIdx: null
        };
        return _this;
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

            return this.scores.map(function (score, idx) {
                var dj = _this3.line_judges_index.get(score.discipline_judge_id);
                return React.createElement(_Item2.default, {
                    disciplineJudge: dj,
                    judge: dj.judge,
                    key: dj.id,
                    score: score,
                    showVerbose: _this3.state.verboseIdx === idx,
                    tour: _this3.props.tour
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
                            {
                                className: "scores",
                                ref: this.makeScoresRowRef,
                                onMouseMove: this.handleShowVerboseScore,
                                onMouseOut: this.handleHideVerboseScore,
                                onTouchCancel: this.handleHideVerboseScore,
                                onTouchEnd: this.handleHideVerboseScore,
                                onTouchMove: this.handleShowVerboseScore,
                                onTouchStart: this.handleShowVerboseScore
                            },
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

},{"./Item":60,"common/CacheMixin":93,"l10n":104}],62:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (NotPerformedSwitch.__proto__ || Object.getPrototypeOf(NotPerformedSwitch)).apply(this, arguments));
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

},{"HostModules":28,"l10n":104,"tablet_ui/onTouchEndOrClick":9}],63:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PenaltyInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PenaltyInput.__proto__ || Object.getPrototypeOf(PenaltyInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
            _this.props.onScoreUpdate("penalty", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PenaltyInput, [{
        key: "render",
        value: function render() {
            var penalties = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.scoringSystemName) >= 0 ? [[null, "—"], [0, (0, _l10n2.default)("tablet.head_judge.ok")], [-5, (0, _l10n2.default)("tablet.head_judge.form_yellow_card")], [-15, (0, _l10n2.default)("tablet.head_judge.form_red_card")]] : [[null, "—"], [0, (0, _l10n2.default)("tablet.head_judge.ok")], [-3, (0, _l10n2.default)("tablet.head_judge.yellow_card")], [-30, (0, _l10n2.default)("tablet.head_judge.red_card")], [-100, (0, _l10n2.default)("tablet.head_judge.black_card")]];
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
                            penalty: PT.number
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

},{"l10n":104,"tablet_ui/SelectorInput":7}],64:[function(require,module,exports){
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
            (0, _l10n2.default)("tablet.head_judge.previous_penalties")
        ),
        React.createElement(
            "table",
            { className: "full-width" },
            React.createElement(
                "tbody",
                null,
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

},{"l10n":104}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeClassName = require("common/makeClassName");

var _makeClassName2 = _interopRequireDefault(_makeClassName);

var _VerboseJudgeScore = require("common/VerboseJudgeScore");

var _VerboseJudgeScore2 = _interopRequireDefault(_VerboseJudgeScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
        key: "renderVerboseScore",
        value: function renderVerboseScore() {
            if (!this.props.showVerbose) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "verbose-score" },
                React.createElement(
                    "div",
                    { className: "judge-name" },
                    this.props.judge.name
                ),
                React.createElement(_VerboseJudgeScore2.default, {
                    performed: true,
                    disciplineJudge: this.props.disciplineJudge,
                    score: this.props.score,
                    tour: this.props.tour
                }),
                React.createElement("div", { className: "triangle" })
            );
        }
    }, {
        key: "getClassName",
        value: function getClassName() {
            var total_score = this.props.score ? this.props.score.data.total_score : 0;
            return (0, _makeClassName2.default)({
                "confirmed": this.props.score && this.props.score.confirmed,
                "green": -total_score < 1,
                "yellow": 1 <= -total_score && -total_score < 10,
                "red": 10 <= -total_score && -total_score < 50,
                "black": 50 <= -total_score
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: this.getClassName() },
                this.props.score ? this.props.score.data.total_score.toFixed() : "—",
                this.renderVerboseScore()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineJudge: PT.object.isRequired,
                judge: PT.shape({
                    name: PT.string.isRequired
                }).isRequired,
                score: PT.shape({
                    confirmed: PT.bool.isRequired,
                    data: PT.shape({
                        total_score: PT.number.isRequired
                    }).isRequired
                }).isRequired,
                showVerbose: PT.bool.isRequired,
                tour: PT.object.isRequired
            };
        }
    }]);

    return Item;
}(React.Component);

exports.default = Item;


Item.displayName = "rules_sets_rosfarr_JudgeTablet_HeadJudgeLayout_HeatsPage_ScoringLayout_TechJudgesScores_Item";

},{"common/VerboseJudgeScore":100,"common/makeClassName":3}],66:[function(require,module,exports){
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

var TechJudgeScore = function (_CacheMixin) {
    _inherits(TechJudgeScore, _CacheMixin);

    function TechJudgeScore(props) {
        _classCallCheck(this, TechJudgeScore);

        var _this = _possibleConstructorReturn(this, (TechJudgeScore.__proto__ || Object.getPrototypeOf(TechJudgeScore)).call(this, props));

        _this.makeScoresRowRef = function (ref) {
            return _this._scores_row = ref;
        };

        _this.handleShowVerboseScore = function (event) {
            event.preventDefault();
            var position_obj = event.touches ? event.touches[0] : event;
            var target = _this._scores_row;
            var rect = target.getBoundingClientRect();
            var offset = position_obj.clientX - rect.left;
            var selected_idx = Math.floor(offset / (target.offsetWidth / _this.scores.length));
            _this.setState({
                verboseIdx: selected_idx
            });
        };

        _this.handleHideVerboseScore = function () {
            return _this.setState({ verboseIdx: null });
        };

        _this.state = {
            verboseIdx: null
        };
        return _this;
    }

    _createClass(TechJudgeScore, [{
        key: "getStyle",
        value: function getStyle() {
            return {
                maxWidth: 150 * this.tech_judges.length + "px"
            };
        }
    }, {
        key: "renderNumbers",
        value: function renderNumbers() {
            var _this2 = this;

            return this.scores.map(function (score) {
                var dj = _this2.tech_judges_index.get(score.discipline_judge_id);
                return React.createElement(
                    "td",
                    { key: score.id },
                    dj.judge.number
                );
            });
        }
    }, {
        key: "renderScores",
        value: function renderScores() {
            var _this3 = this;

            return this.scores.map(function (score, idx) {
                var dj = _this3.tech_judges_index.get(score.discipline_judge_id);
                return React.createElement(_Item2.default, {
                    disciplineJudge: dj,
                    judge: dj.judge,
                    key: dj.id,
                    score: score,
                    showVerbose: _this3.state.verboseIdx === idx,
                    tour: _this3.props.tour
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
                    (0, _l10n2.default)("tablet.head_judge.tech_judge_scores")
                ),
                React.createElement(
                    "table",
                    { className: "tech-judge-scores", style: this.getStyle() },
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
                            {
                                className: "scores",
                                ref: this.makeScoresRowRef,
                                onMouseMove: this.handleShowVerboseScore,
                                onMouseOut: this.handleHideVerboseScore,
                                onTouchCancel: this.handleHideVerboseScore,
                                onTouchEnd: this.handleHideVerboseScore,
                                onTouchMove: this.handleShowVerboseScore,
                                onTouchStart: this.handleShowVerboseScore
                            },
                            this.renderScores()
                        )
                    )
                )
            );
        }
    }, {
        key: "tech_judges",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("tech_judges", function () {
                return _this4.props.disciplineJudges.filter(function (dj) {
                    return dj.role === "tech_judge";
                });
            });
        }
    }, {
        key: "tech_judges_index",
        get: function get() {
            var _this5 = this;

            return this.fetchFromCache("tech_judges_index", function () {
                var result = new Map();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this5.tech_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                    return _this6.tech_judges_index.has(score.discipline_judge_id);
                });
            });
        }
    }]);

    return TechJudgeScore;
}((0, _CacheMixin3.default)(React.Component));

exports.default = TechJudgeScore;

},{"./Item":65,"common/CacheMixin":93,"l10n":104}],67:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).call.apply(_ref, [this].concat(args))), _this), _this.handleScoreUpdate = function (key, value) {
            var score_data = {};
            score_data[key] = value;
            _this.props.onScoreUpdate(_this.score.id, score_data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            if (this.score === null) {
                return React.createElement("div", null);
            }
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
                    scoringSystemName: this.props.tour.scoring_system_name,
                    onScoreUpdate: this.handleScoreUpdate
                }),
                React.createElement(_PreviousPenalties2.default, {
                    run: this.props.run
                }),
                React.createElement(_TechJudgesScores2.default, {
                    disciplineJudges: this.props.tour.discipline.discipline_judges,
                    run: this.props.run,
                    tour: this.props.tour
                }),
                React.createElement(_LineJudgesScores2.default, {
                    disciplineJudges: this.props.tour.discipline.discipline_judges,
                    run: this.props.run,
                    tour: this.props.tour
                }),
                React.createElement(_AcrobaticOverrides2.default, {
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

},{"./AcrobaticOverrides":59,"./LineJudgesScores":61,"./NotPerformedSwitch":62,"./PenaltyInput":63,"./PreviousPenalties":64,"./TechJudgesScores":66,"common/CacheMixin":93,"l10n":104}],68:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (HeatsPage.__proto__ || Object.getPrototypeOf(HeatsPage)).apply(this, arguments));
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

},{"./ScoringLayout":67,"JudgeTablet/Grid":57,"common/CacheMixin":93}],69:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ResultsPage.__proto__ || Object.getPrototypeOf(ResultsPage)).apply(this, arguments));
    }

    _createClass(ResultsPage, [{
        key: "render",


        // Initialization

        value: function render() {
            return React.createElement(
                "div",
                { className: "body results" },
                React.createElement(_HostModules.TourResultsLoader, {
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

},{"HostModules":28,"ResultsTable2":88}],70:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (HeadJudgeLayout.__proto__ || Object.getPrototypeOf(HeadJudgeLayout)).call(this, props));

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
                heat: this.state.heat,
                heatsCount: heats_count,
                hideHeatsButtons: this.state.page !== "heats",
                judge: this.props.disciplineJudge.judge,
                maxHeat: heats_count,
                tour: this.props.tour,
                onNextHeatClick: this.onNextHeatClick,
                onPrevHeatClick: this.onPrevHeatClick
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
            return Math.max.apply(Math, _toConsumableArray(this.props.tour.runs.map(function (run) {
                return run.heat;
            })));
        }
    }]);

    return HeadJudgeLayout;
}(React.Component);

exports.default = HeadJudgeLayout;

},{"./ActionsPage":58,"./HeatsPage":68,"./ResultsPage":69,"JudgeTablet/Footer":45,"JudgeTablet/Footer/FooterItem":44,"JudgeTablet/Header":71,"l10n":104}],71:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "renderPrevHeatButton",
        value: function renderPrevHeatButton() {
            if (this.props.hideHeatsButtons || this.props.heat <= 1) {
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
            if (this.props.hideHeatsButtons || this.props.heat >= this.props.maxHeat) {
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
                            "\xA0\xA0\xA0\xA0\xA0\xA0\xA0",
                            (0, _l10n2.default)("tablet.global.heat_number", this.props.heat, this.props.heatsCount)
                        )
                    )
                ),
                this.renderNextHeatButton()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                heat: PT.number.isRequired,
                heatsCount: PT.number.isRequired,
                hideHeatsButtons: PT.bool,
                judge: PT.shape({
                    name: PT.string.isRequired,
                    role_description: PT.string,
                    number: PT.string.isRequired
                }).isRequired,
                maxHeat: PT.number.isRequired,
                tour: PT.shape({
                    name: PT.string.isRequired,
                    discipline: PT.shape({
                        name: PT.string.isRequired
                    }).isRequired
                }).isRequired,
                onNextHeatClick: PT.func.isRequired,
                onPrevHeatClick: PT.func.isRequired
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                hideHeatsButtons: false
            };
        }
    }]);

    return Header;
}(React.Component);

exports.default = Header;

},{"l10n":104,"tablet_ui/onTouchEndOrClick":9}],72:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (value) {
            _this.props.onScoreUpdate("points", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralScale2.default, {
                max: 40,
                min: 1,
                readOnly: this.props.readOnly,
                rowSize: 10,
                scale: "grid",
                value: this.props.scoreData.points,
                onChange: this.onChange
            });
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"JudgeTablet/GeneralScale":56,"l10n":104}],73:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./ScoringLayout":72,"JudgeTablet/GeneralLayout":55,"dup":38}],74:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).apply(this, arguments));
    }

    _createClass(Element, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "tech-judge-acro" },
                React.createElement(
                    "div",
                    { className: "controls" },
                    React.createElement(_OverrideInput2.default, {
                        readOnly: this.props.readOnly,
                        onChange: this.props.onAcroOverride,
                        originalValue: this.props.acro.original_score,
                        value: this.props.acro.score
                    })
                ),
                React.createElement(
                    "div",
                    { className: "description" },
                    this.props.acro.description
                ),
                React.createElement("div", { className: "clearfix" })
            );
        }
    }]);

    return Element;
}(React.Component);

exports.default = Element;

},{"./OverrideInput":75}],75:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OverrideInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OverrideInput.__proto__ || Object.getPrototypeOf(OverrideInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleMinus = function () {
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
                        "\u21930"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn-restore",
                            disabled: value_changed < 0.05 || this.props.readOnly
                        }, (0, _onTouchOrClick2.default)(this.handleRestore)),
                        "\u2191"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn-minus",
                            disabled: this.props.value < 0.05 || this.props.readOnly
                        }, (0, _onTouchOrClick2.default)(this.handleMinus)),
                        "\u2212"
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
                    value_changed ? this.props.originalValue.toFixed(1) + " \u2192 " + this.props.value.toFixed(1) : this.props.value.toFixed(1)
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

},{"tablet_ui/onTouchOrClick":10}],76:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).call.apply(_ref, [this].concat(args))), _this), _this.onConfirm = function () {
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
            if (this.score === null) {
                return React.createElement("div", null);
            }
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

},{"./Element":74,"HostModules":28,"JudgeTablet/ConfirmationButton":34,"common/CacheMixin":93,"l10n":104}],77:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (AcroPage.__proto__ || Object.getPrototypeOf(AcroPage)).apply(this, arguments));
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

},{"./ScoringLayout":76,"JudgeTablet/Grid":57}],78:[function(require,module,exports){
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

var _PreviousPenalties = require("JudgeTablet/HeadJudgeLayout/HeatsPage/ScoringLayout/PreviousPenalties");

var _PreviousPenalties2 = _interopRequireDefault(_PreviousPenalties);

var _StopWatch = require("./StopWatch");

var _StopWatch2 = _interopRequireDefault(_StopWatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_CacheMixin) {
    _inherits(ScoringLayout, _CacheMixin);

    function ScoringLayout() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).call.apply(_ref, [this].concat(args))), _this), _this.handleConfirmation = function () {
            _this.props.onScoreConfirm(_this.score.id);
        }, _this.handleScoreChange = function (part, value) {
            var data = {};
            data[part] = value;
            _this.props.onScoreUpdate(_this.score.id, data);
        }, _this.handleJumpStepsChange = function (value) {
            return _this.handleScoreChange("jump_steps", value);
        }, _this.handleTimingViolationChange = function (value) {
            return _this.handleScoreChange("timing_violation", value);
        }, _this.handlePenaltyChange = function (value) {
            return _this.handleScoreChange("penalty", value);
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
            if (this.score === null) {
                return React.createElement("div", null);
            }
            var score = this.score.data;
            var header = (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, this.props.run.participant.name, this.props.run.participant.sportsmen.length);
            var penalties = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0 ? [[0, (0, _l10n2.default)("tablet.tech_judge.ok")], [-5, (0, _l10n2.default)("tablet.tech_judge.form_yellow_card")], [-15, (0, _l10n2.default)("tablet.tech_judge.form_red_card")]] : [[0, (0, _l10n2.default)("tablet.tech_judge.ok")], [-3, (0, _l10n2.default)("tablet.tech_judge.yellow_card")], [-30, (0, _l10n2.default)("tablet.tech_judge.red_card")], [-100, (0, _l10n2.default)("tablet.tech_judge.black_card")]];
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
                    (0, _l10n2.default)("tablet.head_judge.penalty_type")
                ),
                React.createElement(_SelectorInput2.default, {
                    choices: penalties,
                    readOnly: this.score.confirmed,
                    value: score.raw_data.penalty,
                    onChange: this.handlePenaltyChange
                }),
                React.createElement(_PreviousPenalties2.default, {
                    run: this.props.run
                }),
                React.createElement("div", { className: "spacer" }),
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
                React.createElement("div", { className: "spacer" }),
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

},{"./StopWatch":79,"JudgeTablet/ConfirmationButton":34,"JudgeTablet/HeadJudgeLayout/HeatsPage/ScoringLayout/PreviousPenalties":64,"common/CacheMixin":93,"l10n":104,"tablet_ui/IntegerInput":4,"tablet_ui/SelectorInput":7}],79:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

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

},{"common/makeClassName":3,"l10n":104,"tablet_ui/onTouchOrClick":10}],80:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (DancingPage.__proto__ || Object.getPrototypeOf(DancingPage)).apply(this, arguments));
    }

    _createClass(DancingPage, [{
        key: "renderScores",
        value: function renderScores() {
            var _this2 = this;

            return this.props.runs.map(function (run) {
                return React.createElement(_ScoringLayout2.default, {
                    disciplineJudge: _this2.props.disciplineJudge,
                    key: run.id,
                    run: run,
                    tour: _this2.props.tour,
                    onScoreConfirm: _this2.props.onScoreConfirm,
                    onScoreUpdate: _this2.props.onScoreUpdate
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

},{"./ScoringLayout":78,"JudgeTablet/Grid":57}],81:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (TechJudgeLayout.__proto__ || Object.getPrototypeOf(TechJudgeLayout)).call(this, props));

        _this.handlePrevHeatClick = function () {
            _this.updateHeat(_this.state.heat - 1);
        };

        _this.handleNextHeatClick = function () {
            _this.updateHeat(_this.state.heat + 1);
        };

        _this.handlePageChange = function (page) {
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
                disciplineJudge: this.props.disciplineJudge,
                tour: this.props.tour,
                runs: this.runs,
                onScoreConfirm: this.props.onScoreConfirm,
                onScoreUpdate: this.props.onScoreUpdate
            });
        }
    }, {
        key: "renderAcro",
        value: function renderAcro() {
            return React.createElement(_AcroPage2.default, {
                disciplineJudge: this.props.disciplineJudge,
                runs: this.runs,
                onScoreConfirm: this.props.onScoreConfirm,
                onScoreUpdate: this.props.onScoreUpdate
            });
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var heats_count = this.heats_count;
            return React.createElement(_Header2.default, {
                heat: this.state.heat,
                heatsCount: heats_count,
                judge: this.props.disciplineJudge.judge,
                maxHeat: this.first_non_confirmed_heat,
                tour: this.props.tour,
                onNextHeatClick: this.handleNextHeatClick,
                onPrevHeatClick: this.handlePrevHeatClick
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
                { value: this.state.page, onChange: this.handlePageChange },
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.dancing"),
                    mkey: "dancing"
                }),
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.acro"),
                    mkey: "acro"
                })
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
                return Math.max.apply(Math, _toConsumableArray(_this2.props.tour.runs.map(function (run) {
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

},{"./AcroPage":77,"./DancingPage":80,"JudgeTablet/Footer":45,"JudgeTablet/Footer/FooterItem":44,"JudgeTablet/Header":71,"common/CacheMixin":93,"l10n":104}],82:[function(require,module,exports){
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

},{"l10n":104}],83:[function(require,module,exports){
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, JudgeTablet);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JudgeTablet.__proto__ || Object.getPrototypeOf(JudgeTablet)).call.apply(_ref, [this].concat(args))), _this), _this.onScoreUpdate = function (score_id, new_score) {
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

},{"./AcrobaticsLayout":33,"./DanceHalvedLayout":38,"./DanceLayout":42,"./FormationAcroLayout":49,"./FormationLayout":53,"./HeadJudgeLayout":70,"./SimplifiedLayout":73,"./TechJudgeLayout":81,"HostModules":28,"common/getScoringType":102}],84:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "getCard",
        value: function getCard() {
            if (!this.props.row.run.performed) {
                return "—";
            }
            return this.props.row.run.verbose_total_score.total_penalty.toFixed();
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
                    "\xA0",
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
                            total_penalty: PT.number,
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

},{"common/getParticipantDisplay":101}],85:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ResultsTable1.__proto__ || Object.getPrototypeOf(ResultsTable1)).apply(this, arguments));
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

},{"./Row":84,"l10n":104}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "isFormation",
        value: function isFormation() {
            return ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0;
        }
    }, {
        key: "getCard",
        value: function getCard() {
            if (!this.props.row.run.performed) {
                return "—";
            }
            return this.props.row.run.verbose_total_score.total_penalty.toFixed();
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
                    "\u2014"
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
                        "\u2014"
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
                        "\xA0",
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
                    "\xA0",
                    "/ ",
                    total_score.secondary_score.toFixed(2)
                )
            );
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

},{"common/getParticipantDisplay":101,"l10n":104}],88:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ResultsTable2.__proto__ || Object.getPrototypeOf(ResultsTable2)).apply(this, arguments));
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

},{"./ColumnsWidths":86,"./Row":87,"getJudgeTableMark":103,"l10n":104}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

var InfoCell = function (_React$Component) {
    _inherits(InfoCell, _React$Component);

    function InfoCell() {
        _classCallCheck(this, InfoCell);

        return _possibleConstructorReturn(this, (InfoCell.__proto__ || Object.getPrototypeOf(InfoCell)).apply(this, arguments));
    }

    _createClass(InfoCell, [{
        key: "getCard",
        value: function getCard() {
            if (!this.props.row.run.performed) {
                return "—";
            }
            return this.props.row.run.verbose_total_score.total_penalty.toFixed();
        }
    }, {
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
                this.getCard()
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

},{"common/getParticipantDisplay":101,"l10n":104}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerboseJudgeScore = require("common/VerboseJudgeScore");

var _VerboseJudgeScore2 = _interopRequireDefault(_VerboseJudgeScore);

var _InfoCell = require("./InfoCell");

var _InfoCell2 = _interopRequireDefault(_InfoCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "renderScore",
        value: function renderScore(discipline_judge, score) {
            return React.createElement(_VerboseJudgeScore2.default, {
                additionalData: this.props.row.additional_data,
                disciplineJudge: discipline_judge,
                performed: this.props.row.run.performed,
                score: score,
                tour: this.props.tour
            });
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

},{"./InfoCell":90,"common/VerboseJudgeScore":100}],92:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (ResultsTable3.__proto__ || Object.getPrototypeOf(ResultsTable3)).apply(this, arguments));
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

},{"./ColumnsWidths":89,"./Row":91,"getJudgeTableMark":103,"l10n":104}],93:[function(require,module,exports){
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

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
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

},{}],94:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (AcroScore.__proto__ || Object.getPrototypeOf(AcroScore)).apply(this, arguments));
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
                            { className: "mistakes" },
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

},{"./formatScore":99,"l10n":104}],95:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (DanceScore.__proto__ || Object.getPrototypeOf(DanceScore)).apply(this, arguments));
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
                            { className: "mistakes" },
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
                            { className: "mistakes" },
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

},{"./formatScore":99,"l10n":104}],96:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (FormationAcroScore.__proto__ || Object.getPrototypeOf(FormationAcroScore)).apply(this, arguments));
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
                            { className: "mistakes" },
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
                            { className: "mistakes" },
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
                    this.props.additionalData ? React.createElement(
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
                                this.props.additionalData.places[this.props.score.id]
                            )
                        )
                    ) : null
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                additionalData: PT.shape({
                    places: PT.object.isRequired
                }),
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

},{"./formatScore":99,"l10n":104}],97:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (FormationScore.__proto__ || Object.getPrototypeOf(FormationScore)).apply(this, arguments));
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
                            { className: "mistakes" },
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
                    this.props.additionalData ? React.createElement(
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
                                this.props.additionalData.places[this.props.score.id]
                            )
                        )
                    ) : null
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                additionalData: PT.shape({
                    places: PT.object.isRequired
                }),
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

},{"./formatScore":99,"l10n":104}],98:[function(require,module,exports){
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

var TechScore = function (_React$PureComponent) {
    _inherits(TechScore, _React$PureComponent);

    function TechScore() {
        _classCallCheck(this, TechScore);

        return _possibleConstructorReturn(this, (TechScore.__proto__ || Object.getPrototypeOf(TechScore)).apply(this, arguments));
    }

    _createClass(TechScore, [{
        key: "render",
        value: function render() {
            var tv = this.props.score.data.raw_data.timing_violation;
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
                                (0, _l10n2.default)("results.breakdown.js"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.jump_steps, "$")
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
                                (0, _l10n2.default)("results.breakdown.tv"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                tv === true ? "✗" : tv === false ? "✓" : "?"
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
                                (0, _l10n2.default)("results.breakdown.penalty"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                (0, _formatScore2.default)(this.props.score.data.raw_data.penalty, "$")
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
                            jump_steps: PT.number,
                            penalty: PT.number,
                            timing_violation: PT.bool
                        }).isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return TechScore;
}(React.PureComponent);

exports.default = TechScore;


TechScore.displayName = "rules_sets_rosfarr_ResultsTable3_Row_TechScore";

},{"./formatScore":99,"l10n":104}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = formatScore;
function formatScore(score) {
    var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "$";

    if (score === null) {
        return "—";
    }
    return template.replace("$", score).replace("@", score.toFixed(1));
}

},{}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

var _AcroScore = require("./AcroScore");

var _AcroScore2 = _interopRequireDefault(_AcroScore);

var _DanceScore = require("./DanceScore");

var _DanceScore2 = _interopRequireDefault(_DanceScore);

var _FormationAcroScore = require("./FormationAcroScore");

var _FormationAcroScore2 = _interopRequireDefault(_FormationAcroScore);

var _FormationScore = require("./FormationScore");

var _FormationScore2 = _interopRequireDefault(_FormationScore);

var _TechScore = require("./TechScore");

var _TechScore2 = _interopRequireDefault(_TechScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerboseJudgeScore = function (_React$PureComponent) {
    _inherits(VerboseJudgeScore, _React$PureComponent);

    function VerboseJudgeScore() {
        _classCallCheck(this, VerboseJudgeScore);

        return _possibleConstructorReturn(this, (VerboseJudgeScore.__proto__ || Object.getPrototypeOf(VerboseJudgeScore)).apply(this, arguments));
    }

    _createClass(VerboseJudgeScore, [{
        key: "render",
        value: function render() {
            if (!this.props.performed) {
                return React.createElement(
                    "p",
                    { className: "text-center" },
                    "\u2014"
                );
            }
            var ScoreComponent = null;
            var scoring_type = (0, _getScoringType2.default)(this.props.disciplineJudge, this.props.tour.scoring_system_name);
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
                case "tech":
                    ScoreComponent = _TechScore2.default;
                    break;
                default:
                    return React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.score.data.total_score.toFixed(2)
                    );
            }
            var props = {
                score: this.props.score,
                additionalData: this.props.additionalData,
                scoringType: scoring_type
            };
            return React.createElement(ScoreComponent, props);
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                additionalData: PT.object,
                disciplineJudge: PT.object.isRequired,
                performed: PT.bool.isRequired,
                score: PT.shape({
                    data: PT.shape({
                        total_score: PT.number.isRequired
                    }).isRequired
                }).isRequired,
                tour: PT.shape({
                    scoring_system_name: PT.string.isRequired
                }).isRequired
            };
        }
    }]);

    return VerboseJudgeScore;
}(React.PureComponent);

exports.default = VerboseJudgeScore;


VerboseJudgeScore.displayName = "rules_sets_rosfarr_common_VerboseJudgeScore";

},{"./AcroScore":94,"./DanceScore":95,"./FormationAcroScore":96,"./FormationScore":97,"./TechScore":98,"common/getScoringType":102}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ru = require("./ru");

var _ru2 = _interopRequireDefault(_ru);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _ru2.default;

exports.default = _;

},{"./ru":105}],105:[function(require,module,exports){
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
                    return "\u0410\u043A\u0440\u043E\u0431\u0430\u0442\u0438\u043A\u0430 " + (n + 1);
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
                    return "\u0421\u0443\u0434\u044C\u044F \u2116" + n;
                },
                "heat_number": function heat_number(n, t) {
                    return "\u0417\u0430\u0445\u043E\u0434 " + n + " \u0438\u0437 " + t;
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
                "form_red_card": "-15",
                "form_yellow_card": "-5",
                "ok": "OK",
                "penalty_type": "Штрафные санкции",
                "previous_penalties": "Предыдущие штрафы",
                "red_card": "-30",
                "tech_judge_scores": "Оценки технических судей",
                "yellow_card": "-3"
            },
            "tech_judge": {
                "black_card": "-100",
                "form_red_card": "-15",
                "form_yellow_card": "-5",
                "jump_steps": "Основные ходы",
                "ok": "OK",
                "penalty_type": "Штрафные санкции",
                "red_card": "-30",
                "reset_to_n": function reset_to_n(n) {
                    return "\u0421\u0431\u0440\u043E\u0441 \u043D\u0430 " + n;
                },
                "timing": "Длительность",
                "yellow_card": "-3"
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
                "js": "ОХ",
                "tv": "Время",
                "penalty": "Штраф",
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
                "penalty": "Штраф",
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
                        var result = "\u0424\u043E\u0440\u043C\u0435\u0439\u0448\u043D \u2116" + n;
                        if (name) {
                            result += ": " + name;
                        }
                        return result;
                    }
                    return n_sp === 2 ? "\u041F\u0430\u0440\u0430 \u2116" + n : "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u2116" + n;
                },
                "judge_n": function judge_n(n) {
                    return "\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 \u0441\u0443\u0434\u044C\u044F \u2116" + n;
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"AdminScoreInput":26,"DisciplineResultsTable":27,"HostModules":28,"JudgeTablet":83,"ResultsTable1":85,"ResultsTable2":88,"ResultsTable3":92,"getJudgeTableMark":103,"l10n":104,"meta":106}]},{},[107])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcbGliXFxjb21tb25cXGRpYWxvZ3NcXGNsb3NlRGlhbG9nLmpzeCIsInNyY1xcanN4XFxsaWJcXGNvbW1vblxcZGlhbG9nc1xcc2hvd0NvbmZpcm0uanN4Iiwic3JjXFxqc3hcXGxpYlxcY29tbW9uXFxtYWtlQ2xhc3NOYW1lLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcSW50ZWdlcklucHV0LmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcTnVtYmVyU2VsZWN0b3JJbnB1dC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXFNlbGVjdG9ySW5wdXRcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxTZWxlY3RvcklucHV0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXFNsaWRlci5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXG9uVG91Y2hFbmRPckNsaWNrLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcb25Ub3VjaE9yQ2xpY2suanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxBY3JvU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxDb25maXJtYXRpb25CdXR0b24uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxEYW5jZUhhbHZlZFNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcRGFuY2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEZvcm1hdGlvbkFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcR2VuZXJhbEVkaXRvclxcSXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEdlbmVyYWxFZGl0b3JcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxIZWFkSnVkZ2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXFNpbXBsaWZpZWRTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXFRlY2hKdWRnZUZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcVGVjaEp1ZGdlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxnZW5TY2FsZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxIb3N0TW9kdWxlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXEVsZW1lbnRzXFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcRWxlbWVudHNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcTWlzdGFrZXMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQ29uZmlybWF0aW9uQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxTY29yZVBhcnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUxheW91dFxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUxheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb290ZXJcXEJ1dHRvbi5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcRm9vdGVySXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25BY3JvTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkxheW91dFxcU2NvcmluZ0xheW91dFxcU2NvcmVQYXJ0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdlbmVyYWxMYXlvdXRcXFBhcnRpY2lwYW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcR2VuZXJhbExheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHZW5lcmFsU2NhbGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHcmlkLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxBY3Rpb25zUGFnZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxBY3JvYmF0aWNPdmVycmlkZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXExpbmVKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTGluZUp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTm90UGVyZm9ybWVkU3dpdGNoXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxQZW5hbHR5SW5wdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcUHJldmlvdXNQZW5hbHRpZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXFRlY2hKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcVGVjaEp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXFJlc3VsdHNQYWdlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRlci5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFNpbXBsaWZpZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxTY29yaW5nTGF5b3V0XFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcU2NvcmluZ0xheW91dFxcT3ZlcnJpZGVJbnB1dC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcQWNyb1BhZ2VcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxTY29yaW5nTGF5b3V0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxEYW5jaW5nUGFnZVxcU3RvcFdhdGNoLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxEYW5jaW5nUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVG90YWxTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUxXFxSb3cuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTFcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUyXFxDb2x1bW5zV2lkdGhzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUyXFxSb3cuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTJcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxDb2x1bW5zV2lkdGhzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEluZm9DZWxsLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxDYWNoZU1peGluLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxjb21tb25cXFZlcmJvc2VKdWRnZVNjb3JlXFxBY3JvU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcVmVyYm9zZUp1ZGdlU2NvcmVcXERhbmNlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcVmVyYm9zZUp1ZGdlU2NvcmVcXEZvcm1hdGlvbkFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxWZXJib3NlSnVkZ2VTY29yZVxcRm9ybWF0aW9uU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcVmVyYm9zZUp1ZGdlU2NvcmVcXFRlY2hTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxWZXJib3NlSnVkZ2VTY29yZVxcZm9ybWF0U2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcVmVyYm9zZUp1ZGdlU2NvcmVcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxjb21tb25cXGdldFBhcnRpY2lwYW50RGlzcGxheS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxnZXRTY29yaW5nVHlwZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcZ2V0SnVkZ2VUYWJsZU1hcmsuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGwxMG5cXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxsMTBuXFxydS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcbWV0YS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxccm9vdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkNBd0IsVztBQUFULFNBQVMsV0FBVCxHQUF1QjtBQUNsQyxTQUFLLEtBQUw7QUFDSDs7Ozs7Ozs7a0JDQXVCLFc7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEIsTUFBOUIsRUFBOEQ7QUFBQSxRQUF4QixnQkFBd0IsdUVBQVAsS0FBTzs7QUFDekUsV0FBTyxLQUFLO0FBQ1IsZUFBTyxPQURDO0FBRVIsbUJBQVcsS0FGSDtBQUdSLDBCQUFrQixJQUhWO0FBSVIs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O0FBQ0E7Ozs7QUFFQTs7OztBQUVBLElBQU0sV0FBVyxPQUFPLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DO0FBQ2hELHdCQURnRDtBQUVoRCw2QkFGZ0Q7QUFHaEQsZ0RBSGdEO0FBSWhELGdEQUpnRDtBQUtoRCxnREFMZ0Q7QUFNaEQsOERBTmdEO0FBT2hELHVDQVBnRDtBQVFoRCxnREFSZ0Q7QUFTaEQ7QUFUZ0QsQ0FBbkMsQ0FBakI7O0FBWUEsd0JBQU0sUUFBTiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9zZURpYWxvZygpIHtcbiAgICBzd2FsLmNsb3NlKCk7XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaG93Q29uZmlybShtZXNzYWdlLCBhY3Rpb24sIGNsb3NlX29uX2NvbmZpcm09ZmFsc2UpIHtcbiAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKSxcbiAgICAgICAgY2xvc2VPbkNvbmZpcm06IGNsb3NlX29uX2NvbmZpcm0sXG4gICAgfSwgYWN0aW9uKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VDbGFzc05hbWUoZGF0YSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgICAuZmlsdGVyKGNuID0+IGRhdGFbY25dKVxuICAgICAgICAuam9pbihcIiBcIik7XG59XG4iLCJpbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcblxuaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCIuL29uVG91Y2hPckNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVnZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBQVC5ib29sLFxuICAgICAgICAgICAgdmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1pbnVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2Uoe1wiZGVsdGFcIjogLTF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy52YWx1ZSAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVBsdXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XCJkZWx0YVwiOiAxfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XG4gICAgICAgICAgICBcIkludGVnZXJJbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJyZWFkLW9ubHlcIjogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5nZXRDbGFzc05hbWUoKSB9PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlTWludXMpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVBsdXMpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5JbnRlZ2VySW5wdXQuZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9JbnRlZ2VySW5wdXRcIjtcbiIsImltcG9ydCBTZWxlY3RvcklucHV0IGZyb20gXCIuL1NlbGVjdG9ySW5wdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyU2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4OiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1pbjogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzdGVwOiBQVC5udW1iZXIsXG4gICAgICAgICAgICBkZWNpbWFsU2l6ZTogUFQubnVtYmVyLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICBkZWNpbWFsU2l6ZTogMCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBtYWtlQ2hvaWNlcyhtaW4sIG1heCwgc3RlcCwgZGVjaW1hbF9zaXplKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgPSBtaW47IHZhbHVlIDw9IG1heDsgdmFsdWUgKz0gc3RlcCkge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHZhbHVlLnRvRml4ZWQoZGVjaW1hbF9zaXplKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtOdW1iZXIodGV4dCksIHRleHRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgc3RlcCwgZGVjaW1hbFNpemUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5tYWtlQ2hvaWNlcyhtaW4sIG1heCwgc3RlcCwgZGVjaW1hbFNpemUpIH1cbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbk51bWJlclNlbGVjdG9ySW5wdXQuZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9OdW1iZXJTZWxlY3RvcklucHV0XCI7XG4iLCJpbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcIi4uL29uVG91Y2hPckNsaWNrXCI7XG5cbmltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmU6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0ZXh0OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgIFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgb25DbGljazogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwidGJ0blwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzY29yZS1idG5cIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRoaXMucHJvcHMuYWN0aXZlLFxuICAgICAgICAgICAgXCJyZWFkLW9ubHlcIjogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH1cbiAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlQ2xpY2spIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudGV4dCB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkl0ZW0uZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9TZWxlY3RvcklucHV0X0l0ZW1cIjtcbiIsImltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNob2ljZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgUFQub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbCxcbiAgICAgICAgICAgIHJvd1NpemU6IFBULm51bWJlcixcbiAgICAgICAgICAgIHN0eWxlOiBQVC5vbmVPZihbXCJncmlkXCIsIFwib25lLWxpbmVcIiwgXCJ0d28tbGluZXNcIl0pLFxuICAgICAgICAgICAgdmFsdWU6IFBULm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBvbkNoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIHJvd1NpemU6IDEwLFxuICAgICAgICAgICAgc3R5bGU6IFwib25lLWxpbmVcIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRCdXR0b25zQ291bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm93U2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwiU2VsZWN0b3JJbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJvbmUtcm93XCI6IHRoaXMucHJvcHMuc3R5bGUgIT09IFwidHdvLWxpbmVzXCIsXG4gICAgICAgICAgICBcInR3by1yb3dzXCI6IHRoaXMucHJvcHMuc3R5bGUgPT09IFwidHdvLWxpbmVzXCIsXG4gICAgICAgICAgICBcInNlbGVjdGVkXCI6IHRoaXMucHJvcHMudmFsdWUgIT09IG51bGwsXG4gICAgICAgICAgICBbYG4tJHt0aGlzLmdldEJ1dHRvbnNDb3VudCgpfWBdOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiICYmXG4gICAgICAgICAgICAgICAgaWR4ICE9PSAwICYmXG4gICAgICAgICAgICAgICAgaWR4ICUgdGhpcy5wcm9wcy5yb3dTaXplID09PSAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGJyIGtleT17IGBiciR7aWR4fWAgfSAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHRleHRdID0gdGhpcy5wcm9wcy5jaG9pY2VzW2lkeF07XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU9eyB2YWx1ZSA9PT0gdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIGtleT17IGlkeCB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgIHRleHQ9eyB0ZXh0IH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnByb3BzLm9uQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2VsZWN0b3JJbnB1dC5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX1NlbGVjdG9ySW5wdXRcIjtcbiIsImltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCAgY2xhc3MgU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb25lOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBkb25lVGV4dDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzbGlkZVRleHQ6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25BY3RpdmF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBpbiA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvbmUgJiYgbmV4dFByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNGcmVlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcbiAgICB9XG5cbiAgICBnZXRPdXRlclRleHRPcGFjaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5taW4oTWF0aC5tYXgoMTAwIC0gdGhpcy5zdGF0ZS5wb3NpdGlvbiwgMCksIDEwMCk7XG4gICAgICAgIHJldHVybiAodmFsdWUgLyAxMDApLnRvRml4ZWQoMyk7XG4gICAgfVxuICAgIGdldEVsZW1lbnRPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICBsZXQgcmVzID0gMDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJlcyArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZ2V0VG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0UmVsYXRpdmVUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0U2xpZGVyUG9zKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldFRvdWNoKGV2ZW50KSAtIHRoaXMucGluO1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgMjAwKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICB9XG4gICAgaGFuZGxlVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBpbiA9IHRoaXMuZ2V0UmVsYXRpdmVUb3VjaChldmVudCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgICAgIHRvdWNoOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZVRvdWNoRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRleHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXsgeyBjb2xvcjogXCJyZ2IoMTAwLDEwMCwxMDApXCIgfSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IG1ha2VDbGFzc05hbWUoeyBcInNsaWRlLXRleHRcIiA6IHRydWUsIFwiZnJlZVwiOiB0aGlzLmlzRnJlZSgpIH0pIH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7IGNvbG9yOiBgcmdiYSgxMDAsMTAwLDEwMCwke3RoaXMuZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpfSlgIH0gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlNsaWRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgbWFrZUNsYXNzTmFtZSh7IFwiaW5uZXJcIjogdHJ1ZSwgXCJmcmVlXCI6IHRoaXMuaXNGcmVlKCkgfSkgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHsgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IGAke3RoaXMuc3RhdGUucG9zaXRpb259cHhgIH0gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGljayB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9eyB0aGlzLmhhbmRsZVRvdWNoRW5kIH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9eyB0aGlzLmhhbmRsZVRvdWNoTW92ZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMuaGFuZGxlVG91Y2hTdGFydCB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICDihpJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVGV4dCgpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2xpZGVyLmRpc3BsYXlOYW1lID0gXCJ0YWJsZXRfdWlfU2xpZGVyXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvblRvdWNoRW5kT3JDbGljayhoYW5kbGVyKSB7XG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcbiAgICB9XG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgfVxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XG4gICAgICAgICAgICBkaXNjYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvblRvdWNoT3JDbGljayhoYW5kbGVyKSB7XG4gICAgbGV0IGYgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBmLFxuICAgICAgICBvbkNsaWNrOiBmLFxuICAgIH1cbn1cbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9uczogUFQuYXJyYXlPZihQVC5udW1iZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWlzdGFrZXM6ICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IHJlZHVjdGlvbnMgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5zbGljZSgpOyAvLyBjbG9uZVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgICAgICAgaWYgKGtleVswXSA9PT0gXCJBXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzX3ZhbCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICByZWR1Y3Rpb25zW3BhcnNlSW50KGtleS5zbGljZSgxKSldID0gc192YWwgPT09IFwiXCIgPyAtMSA6IHBhcnNlSW50KHNfdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHJlZHVjdGlvbnM6IHJlZHVjdGlvbnMsXG4gICAgICAgICAgICBtaXN0YWtlczogICBwYXJzZUludChkYXRhLm1pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgocmVkLCBpZHgpID0+ICh7XG4gICAgICAgICAgICBrZXk6IGBBJHtpZHh9YCxcbiAgICAgICAgICAgIGxhYmVsOiBgQSR7aWR4ICsgMX06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnNbaWR4XSA9PT0gbnVsbFxuICAgICAgICAgICAgICAgID8gXCJcIlxuICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnNbaWR4XS50b1N0cmluZygpLFxuICAgICAgICB9KSk7XG4gICAgICAgIGZpZWxkcy5wdXNoKHRoaXMubWFrZUZpZWxkKFwibWlzdGFrZXNcIiwgXCJGRFwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgeyBtYXg6IDEwMCB9KSkpXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IGZpZWxkcyB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRhbmNlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0RhbmNlU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1hdGlvbkJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uZmlybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBcImNvbmZpcm1hdGlvbi1idXR0b25cIjtcbiAgICAgICAgcmVzdWx0ICs9IHRoaXMucHJvcHMuY29uZmlybWVkID8gXCIgY29uZmlybWVkXCIgOiBcIiBub3QtY29uZmlybWVkXCI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm1hdGlvblRvZ2dsZSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNvbmZpcm1lZFxuICAgICAgICAgICAgICAgICAgICA/IF8oXCJhZG1pbi5idXR0b25zLnVuY29uZmlybV9zY29yZVwiKVxuICAgICAgICAgICAgICAgICAgICA6IF8oXCJhZG1pbi5idXR0b25zLmNvbmZpcm1fc2NvcmVcIikgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Db25maXJtYXRpb25CdXR0b24uZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2VIYWx2ZWRTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmd193b21hbjogICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZndfbWFuOiAgICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbjogICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBmd193b21hbjogICAgICAgZGF0YVtcImZ3X3dvbWFuXCJdICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5md193b21hbiksXG4gICAgICAgICAgICBmd19tYW46ICAgICAgICAgZGF0YVtcImZ3X21hblwiXSAgICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5md19tYW4pLFxuICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIGRhdGFbXCJkYW5jZV9maWdzXCJdICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfZmlncyksXG4gICAgICAgICAgICBjb21wb3NpdGlvbjogICAgZGF0YVtcImNvbXBvc2l0aW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5jb21wb3NpdGlvbiksXG4gICAgICAgICAgICBzbWFsbF9taXN0YWtlczogcGFyc2VJbnQoZGF0YS5zbWFsbF9taXN0YWtlcyksXG4gICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5iaWdfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJmd193b21hblwiLCAgICAgICBcIkZXXCIsIGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZndfbWFuXCIsICAgICAgICAgXCJGTVwiLCBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIikpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX2ZpZ3NcIiwgICAgIFwiREZcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTIuNSwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJjb21wb3NpdGlvblwiLCAgICBcIkNcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCAgIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwic21hbGxfbWlzdGFrZXNcIiwgXCJTTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImJpZ19taXN0YWtlc1wiLCAgIFwiQk1cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VIYWx2ZWRTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfRGFuY2VIYWx2ZWRTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmd193b21hbjogICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZndfbWFuOiAgICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbjogICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBmd193b21hbjogICAgICAgZGF0YVtcImZ3X3dvbWFuXCJdICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuZndfd29tYW4pLFxuICAgICAgICAgICAgZndfbWFuOiAgICAgICAgIGRhdGFbXCJmd19tYW5cIl0gICAgICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLmZ3X21hbiksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgZGF0YVtcImRhbmNlX2ZpZ3NcIl0gID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuZGFuY2VfZmlncyksXG4gICAgICAgICAgICBjb21wb3NpdGlvbjogICAgZGF0YVtcImNvbXBvc2l0aW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuY29tcG9zaXRpb24pLFxuICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IHBhcnNlSW50KGRhdGEuc21hbGxfbWlzdGFrZXMpLFxuICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEuYmlnX21pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZndfd29tYW5cIiwgICAgICAgXCJGV1wiLCBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIikpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImZ3X21hblwiLCAgICAgICAgIFwiRk1cIiwgZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV9maWdzXCIsICAgICBcIkRGXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDI1IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJjb21wb3NpdGlvblwiLCAgICBcIkNcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDIwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJzbWFsbF9taXN0YWtlc1wiLCBcIlNNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiYmlnX21pc3Rha2VzXCIsICAgXCJCTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EYW5jZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9EYW5jZVNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfdGVjaDogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXByZXNzaW9uOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGFjcm9iYXRpY3M6ICAgICBkYXRhW1wiYWNyb2JhdGljc1wiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuYWNyb2JhdGljcyksXG4gICAgICAgICAgICBkYW5jZV90ZWNoOiAgICAgZGF0YVtcImRhbmNlX3RlY2hcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmRhbmNlX3RlY2gpLFxuICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIGRhdGFbXCJkYW5jZV9maWdzXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGltcHJlc3Npb246ICAgICBkYXRhW1wiaW1wcmVzc2lvblwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuaW1wcmVzc2lvbiksXG4gICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5iaWdfbWlzdGFrZXMpLFxuICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IHBhcnNlSW50KGRhdGEuc21hbGxfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJhY3JvYmF0aWNzXCIsICAgICBcIkFcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX3RlY2hcIiwgICAgIFwiRFRcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfZmlnc1wiLCAgICAgXCJERlwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJpbXByZXNzaW9uXCIsICAgICBcIklcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInNtYWxsX21pc3Rha2VzXCIsIFwiU01cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJiaWdfbWlzdGFrZXNcIiwgICBcIkJNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkZvcm1hdGlvblNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9Gb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybWF0aW9uU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfdGVjaDogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wcmVzc2lvbjogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWlzdGFrZXM6ICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBkYW5jZV90ZWNoOiBkYXRhW1wiZGFuY2VfdGVjaFwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfdGVjaCksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiBkYXRhW1wiZGFuY2VfZmlnc1wiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfZmlncyksXG4gICAgICAgICAgICBpbXByZXNzaW9uOiBkYXRhW1wiaW1wcmVzc2lvblwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuaW1wcmVzc2lvbiksXG4gICAgICAgICAgICBtaXN0YWtlczogICBwYXJzZUludChkYXRhLnNtYWxsX21pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfdGVjaFwiLCBcIkRUXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX2ZpZ3NcIiwgXCJERlwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJpbXByZXNzaW9uXCIsIFwiSVwiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwibWlzdGFrZXNcIiwgICBcIk1cIiwgIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkZvcm1hdGlvblNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9Gb3JtYXRpb25TY29yZVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmllbGQ6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAga2V5OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICBQVC5hcnJheU9mKFBULnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMuZmllbGQua2V5LCBldmVudC50YXJnZXQudmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlclZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjb3JlLXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhZC1vbmx5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZmllbGQub3B0aW9ucy5maW5kKG8gPT4gb1swXSA9PT0gdGhpcy5wcm9wcy52YWx1ZSlbMV0gfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NvcmUtdmFsdWVcIj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmZpZWxkLm9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbdmFsdWUsIGxhYmVsXSA9IG9wdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9eyB2YWx1ZSB9IHZhbHVlPXsgdmFsdWUgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsYWJlbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KSB9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY29yZS1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZmllbGQubGFiZWwgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJWYWx1ZSgpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSXRlbS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfR2VuZXJhbEVkaXRvcl9JdGVtXCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxFZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpZWxkczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULmFycmF5T2YoUFQuc3RyaW5nLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICBsZXQgaW5pdGlhbF92YWx1ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIHRoaXMucHJvcHMuZmllbGRzKSB7XG4gICAgICAgICAgICBpbml0aWFsX3ZhbHVlc1tmLmtleV0gPSBmLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdmFsdWVzOiBpbml0aWFsX3ZhbHVlcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS52YWx1ZXMpO1xuICAgICAgICB2YWx1ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWVzIH0pO1xuICAgIH1cbiAgICBoYW5kbGVEaXNjYXJkQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25EaXNjYXJkKCk7XG4gICAgfVxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh0aGlzLnN0YXRlLnZhbHVlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyQnV0dG9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZURpc2NhcmRDbGljayB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmJ1dHRvbnMuY2xvc2VcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3VibWl0LWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmJ1dHRvbnMuc3VibWl0XCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRpc2NhcmQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZURpc2NhcmRDbGljayB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwuYnV0dG9ucy5kaXNjYXJkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNjb3JlLWVkaXRvclwiXG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmllbGRzXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5maWVsZHMubWFwKChmLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkPXsgZiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgZi5rZXkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnN0YXRlLnZhbHVlc1tmLmtleV0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbnMoKSB9XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5HZW5lcmFsRWRpdG9yLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9HZW5lcmFsRWRpdG9yXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHRvdXI6IFBULmJvb2wsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBlbmFsdHk6ICBwYXJzZUludChkYXRhLnBlbmFsdHkpLFxuICAgICAgICAgICAgbmV4dHRvdXI6IGRhdGEubmV4dHRvdXIgPT09IFwidHJ1ZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwZW5hbHR5XCIsIFwiUFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJcIiwgXCLigJRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCIwXCIsIFwiT0tcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItNVwiLCBcIi01XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTE1XCIsIFwiLTE1XCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJuZXh0dG91clwiLCBcIk5UXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcImZhbHNlXCIsIFwiTm9cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJ0cnVlXCIsICBcIlllc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkhlYWRKdWRnZUZvcm1hdGlvblNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9IZWFkSnVkZ2VGb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRKdWRnZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmFsdHk6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHR0b3VyOiBQVC5ib29sLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBwZW5hbHR5OiAgcGFyc2VJbnQoZGF0YS5wZW5hbHR5KSxcbiAgICAgICAgICAgIG5leHR0b3VyOiBkYXRhLm5leHR0b3VyID09PSBcInRydWVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwicGVuYWx0eVwiLCBcIlBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiXCIsIFwi4oCUXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiMFwiLCBcIk9LXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTNcIiwgXCItM1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0zMFwiLCBcIi0zMFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0xMDBcIiwgXCItMTAwXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJuZXh0dG91clwiLCBcIk5UXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcImZhbHNlXCIsIFwiTm9cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJ0cnVlXCIsICBcIlllc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkhlYWRKdWRnZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9IZWFkSnVkZ2VTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxpZmllZFNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBwb2ludHM6IGRhdGFbXCJwb2ludHNcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5wb2ludHMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwb2ludHNcIiwgXCJTXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtaW46IDEsIG1heDogNDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TaW1wbGlmaWVkU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX1NpbXBsaWZpZWRTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVjaEZvcm1hdGlvbkp1ZGdlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAganVtcF9zdGVwczogICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogICAgICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltaW5nX3Zpb2xhdGlvbjogUFQuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcGVuYWx0eTogICAgICAgICAgZGF0YS5wZW5hbHR5ID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEucGVuYWx0eSksXG4gICAgICAgICAgICBqdW1wX3N0ZXBzOiAgICAgICBwYXJzZUludChkYXRhLmp1bXBfc3RlcHMpLFxuICAgICAgICAgICAgdGltaW5nX3Zpb2xhdGlvbjogZGF0YS50aW1pbmdfdmlvbGF0aW9uID09PSBcIlwiID8gbnVsbCA6IGRhdGEudGltaW5nX3Zpb2xhdGlvbiA9PT0gXCJ0cnVlXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInBlbmFsdHlcIiwgXCJQXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIjBcIiwgXCJPS1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi01XCIsIFwiLTVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItMTVcIiwgXCItMTVcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImp1bXBfc3RlcHNcIiwgXCJKU1wiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwidGltaW5nX3Zpb2xhdGlvblwiLCBcIlRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiXCIsICAgICAgXCI/XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiZmFsc2VcIiwgXCLinJNcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJ0cnVlXCIsICBcIuKcl1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuVGVjaEZvcm1hdGlvbkp1ZGdlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX1RlY2hGb3JtYXRpb25KdWRnZVNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNoSnVkZ2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdW1wX3N0ZXBzOiAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5hbHR5OiAgICAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmdfdmlvbGF0aW9uOiBQVC5ib29sLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBwZW5hbHR5OiAgICAgICAgICBkYXRhLnBlbmFsdHkgPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5wZW5hbHR5KSxcbiAgICAgICAgICAgIGp1bXBfc3RlcHM6ICAgICAgIHBhcnNlSW50KGRhdGEuanVtcF9zdGVwcyksXG4gICAgICAgICAgICB0aW1pbmdfdmlvbGF0aW9uOiBkYXRhLnRpbWluZ192aW9sYXRpb24gPT09IFwiXCIgPyBudWxsIDogZGF0YS50aW1pbmdfdmlvbGF0aW9uID09PSBcInRydWVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwicGVuYWx0eVwiLCBcIlBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiMFwiLCBcIk9LXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTNcIiwgXCItM1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0zMFwiLCBcIi0zMFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0xMDBcIiwgXCItMTAwXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJqdW1wX3N0ZXBzXCIsIFwiSlNcIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInRpbWluZ192aW9sYXRpb25cIiwgXCJUXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIlwiLCAgICAgIFwiP1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcImZhbHNlXCIsIFwi4pyTXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1widHJ1ZVwiLCAgXCLinJdcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblRlY2hKdWRnZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9UZWNoSnVkZ2VTY29yZVwiO1xuIiwiZnVuY3Rpb24gZ2VuU2NhbGUodHlwZSwgdXNlcl9wYXJhbXMpIHtcbiAgICBjb25zdCBvcHRpb25hbCA9IHR5cGVbMF0gPT09IFwiP1wiO1xuICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICB0eXBlID0gdHlwZS5zbGljZSgxKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJyZWR1Y3Rpb25cIjpcbiAgICAgICAgcmVzdWx0ID0gWzEwMCwgNzUsIDUwLCAyNSwgMTAsIDUsIDBdLm1hcChcbiAgICAgICAgICAgIHMgPT4gW3MudG9TdHJpbmcoKSwgYC0ke3N9JWBdXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJudW1iZXJzXCI6XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgIH0sIHVzZXJfcGFyYW1zKTtcbiAgICAgICAgY29uc3QgZnJhY3Rpb25fc2l6ZSA9IE1hdGguYWJzKHBhcmFtcy5zdGVwIC0gTWF0aC5yb3VuZChwYXJhbXMuc3RlcCkpIDwgMWUtNSA/IDAgOiAxO1xuICAgICAgICBmb3IgKGxldCBzY29yZSA9IHBhcmFtcy5taW47IHNjb3JlIDwgKHBhcmFtcy5tYXggKyAxZS01KTsgc2NvcmUgKz0gcGFyYW1zLnN0ZXApIHtcbiAgICAgICAgICAgIGNvbnN0IHN0ciA9IHNjb3JlLnRvRml4ZWQoZnJhY3Rpb25fc2l6ZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChbc3RyLCBzdHJdKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIHNjYWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgIHJlc3VsdCA9IFtbXCJcIiwgXCLigJRcIl1dLmNvbmNhdChyZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5TY2FsZTtcbiIsImltcG9ydCBnZXRTY29yaW5nVHlwZSBmcm9tIFwiY29tbW9uL2dldFNjb3JpbmdUeXBlXCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIi4vQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5pbXBvcnQgQWNyb1Njb3JlIGZyb20gXCIuL0Fjcm9TY29yZVwiO1xuaW1wb3J0IERhbmNlU2NvcmUgZnJvbSBcIi4vRGFuY2VTY29yZVwiO1xuaW1wb3J0IERhbmNlSGFsdmVkU2NvcmUgZnJvbSBcIi4vRGFuY2VIYWx2ZWRTY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0Zvcm1hdGlvblNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uQWNyb1Njb3JlIGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9TY29yZVwiO1xuaW1wb3J0IFNpbXBsaWZpZWRTY29yZSBmcm9tIFwiLi9TaW1wbGlmaWVkU2NvcmVcIjtcbmltcG9ydCBIZWFkSnVkZ2VTY29yZSBmcm9tIFwiLi9IZWFkSnVkZ2VTY29yZVwiO1xuaW1wb3J0IEhlYWRKdWRnZUZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0hlYWRKdWRnZUZvcm1hdGlvblNjb3JlXCI7XG5pbXBvcnQgVGVjaEp1ZGdlU2NvcmUgZnJvbSBcIi4vVGVjaEp1ZGdlU2NvcmVcIjtcbmltcG9ydCBUZWNoSnVkZ2VGb3JtYXRpb25TY29yZSBmcm9tIFwiLi9UZWNoSnVkZ2VGb3JtYXRpb25TY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmU6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlckJvZHkoc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHNjb3JpbmdfdHlwZSA9PT0gXCJoZWFkXCIgJiZcbiAgICAgICAgICAgIFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgICAgc2NvcmluZ190eXBlID0gXCJoZWFkX2Zvcm1hdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHNjb3JpbmdfdHlwZSA9PT0gXCJ0ZWNoXCIgJiZcbiAgICAgICAgICAgIFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgICAgc2NvcmluZ190eXBlID0gXCJ0ZWNoX2Zvcm1hdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjb3JlX3Byb3BzID0ge1xuICAgICAgICAgICAgc2NvcmU6ICAgICB0aGlzLnByb3BzLnNjb3JlLFxuICAgICAgICAgICAgcmVhZE9ubHk6ICB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgICAgICAgb25TdWJtaXQ6ICB0aGlzLnByb3BzLm9uU3VibWl0LFxuICAgICAgICAgICAgb25EaXNjYXJkOiB0aGlzLnByb3BzLm9uRGlzY2FyZCxcbiAgICAgICAgfTtcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3R5cGUpIHtcbiAgICAgICAgY2FzZSBcImFjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEFjcm9TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJkYW5jZVwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RGFuY2VTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJkYW5jZV9oYWx2ZWRcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPERhbmNlSGFsdmVkU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxGb3JtYXRpb25TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25fYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Rm9ybWF0aW9uQWNyb1Njb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcInNpbXBsaWZpZWRcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFNpbXBsaWZpZWRTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJoZWFkXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxIZWFkSnVkZ2VTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJoZWFkX2Zvcm1hdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwidGVjaFwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VGVjaEp1ZGdlU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwidGVjaF9mb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRlY2hKdWRnZUZvcm1hdGlvblNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd24gc2NvcmluZyB0eXBlOiAke3Njb3JpbmdfdHlwZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJDb25maXJtYXRpb25CdXR0b24oc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5IHx8IHNjb3JpbmdfdHlwZSA9PT0gXCJoZWFkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgY29uZmlybWVkPXsgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm1hdGlvblRvZ2dsZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2NvcmluZ190eXBlID0gZ2V0U2NvcmluZ1R5cGUodGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UsIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQWRtaW5TY29yZUlucHV0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoc2NvcmluZ190eXBlKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckNvbmZpcm1hdGlvbkJ1dHRvbihzY29yaW5nX3R5cGUpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRWRpdG9yLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvclwiO1xuIiwiaW1wb3J0IEVkaXRvciBmcm9tIFwiLi9FZGl0b3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkbWluU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBlZGl0aW5nOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5lZGl0aW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5yb2xlID09PSBcImhlYWRfanVkZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5wZW5hbHR5ID09PSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcIuKAlFwiXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5uZXh0dG91cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi9OVFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyByZXN1bHQgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLnJvbGUgPT09IFwidGVjaF9qdWRnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8RWRpdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZT17IHRoaXMucHJvcHMub25Db25maXJtYXRpb25Ub2dnbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cclxuICAgICAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMucHJvcHMub25TdWJtaXQgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkFkbWluU2NvcmVJbnB1dC5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dFwiO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvYWNoZXM6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3J0c21lbjogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcl9vZl9iaXJ0aDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHViOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHk6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1Eb2N4KGRvY3gpIHtcbiAgICAgICAgZG9jeFxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdXItbmFtZVwiLCBcImJhY2tncm91bmRcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJwYWRkaW5nXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNwb3J0c21lblwiLCBcIndpZHRoXCIsIFwiMTAwJVwiKTtcbiAgICB9XG5cbiAgICByZW5kZXJSb3dIZWFkZXIocHJldl9yb3csIG5leHRfcm93KSB7XG4gICAgICAgIGNvbnN0IG5lZWRfcmVuZGVyID1cbiAgICAgICAgICAgIHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fFxuICAgICAgICAgICAgcHJldl9yb3cudG91ci5pZCAhPT0gbmV4dF9yb3cudG91ci5pZDtcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgSCR7bmV4dF9yb3cucnVuLmlkfWAgfT5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidG91ci1uYW1lXCIgY29sU3Bhbj1cIjZcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmV4dF9yb3cudG91ci5uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSb3cocm93KSB7XG4gICAgICAgIGxldCBwID0gcm93LnJ1bi5wYXJ0aWNpcGFudDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgUiR7cm93LnJ1bi5pZH1gIH0+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3cucGxhY2UgPT09IG51bGwgPyBcIlwiIDogcm93LnBsYWNlIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5udW1iZXIgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zNlwiIGNvbFNwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzcG9ydHNtZW5cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuZm9ybWF0aW9uX25hbWUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY29sU3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5mb3JtYXRpb25fbmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy03NVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBgJHtzLmxhc3RfbmFtZX0gJHtzLmZpcnN0X25hbWV9YCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLnN1YnN0aXR1dGUgPyA8aT4gKHsgXyhcInJlc3VsdHMubGFiZWxzLnN1YlwiKSB9Lik8L2k+IDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcy55ZWFyX29mX2JpcnRoIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI0IGNsdWJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuY2x1Yi5uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY29hY2hlc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5jb2FjaGVzLnNwbGl0KFwiLFwiKS5tYXAoYyA9PiBbYy50cmltKCksIDxiciBrZXk9XCJYXCIgLz5dKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUm93cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBjb25zdCB0YWJsZSA9IHRoaXMucHJvcHMudGFibGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMucmVuZGVyUm93SGVhZGVyKHRhYmxlW2kgLSAxXSwgdGFibGVbaV0pO1xuICAgICAgICAgICAgaWYgKGhlYWRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGhlYWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJlbmRlclJvdyh0YWJsZVtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRGlzY2lwbGluZVJlc3VsdHNUYWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jbHViXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jb2FjaGVzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93cygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EaXNjaXBsaW5lUmVzdWx0c1RhYmxlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfRGlzY2lwbGluZVJlc3VsdHNUYWJsZVwiO1xuIiwiZXhwb3J0IGxldCBBcGkgPSBudWxsO1xuZXhwb3J0IGxldCBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBudWxsO1xuZXhwb3J0IGxldCBzdG9yYWdlID0gbnVsbDtcbmV4cG9ydCBsZXQgVG91clJlc3VsdHNMb2FkZXIgPSBudWxsO1xuZXhwb3J0IGxldCBEaXNjaXBsaW5lUmVzdWx0c0xvYWRlciA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cChkYXRhKSB7XG4gICAgQXBpICAgICAgICAgICAgICAgICAgICAgID0gZGF0YS5BcGk7XG4gICAgbWVzc2FnZV9kaXNwYXRjaGVyICAgICAgID0gZGF0YS5tZXNzYWdlX2Rpc3BhdGNoZXI7XG4gICAgc3RvcmFnZSAgICAgICAgICAgICAgICAgID0gZGF0YS5zdG9yYWdlO1xuICAgIFRvdXJSZXN1bHRzTG9hZGVyICAgICAgICA9IGRhdGEuVG91clJlc3VsdHNMb2FkZXI7XG4gICAgRGlzY2lwbGluZVJlc3VsdHNMb2FkZXIgID0gZGF0YS5EaXNjaXBsaW5lUmVzdWx0c0xvYWRlcjtcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWNyb0lkeDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJlZHVjdGlvbjogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25BY3JvUmVkdWN0aW9uVXBkYXRlKHRoaXMucHJvcHMuYWNyb0lkeCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKFwidGFibGV0LmFjcm9fanVkZ2UuYWNyb19uXCIsIHRoaXMucHJvcHMuYWNyb0lkeCkgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5yZWR1Y3Rpb24gfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yZWR1Y3Rpb25zLm1hcCgocmVkdWN0aW9uLCBhY3JvX2lkeCkgPT5cclxuICAgICAgICAgICAgICAgICAgICA8RWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBhY3JvX2lkeCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZHVjdGlvbj17IHJlZHVjdGlvbiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjcm9JZHg9eyBhY3JvX2lkeCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZT17IHRoaXMucHJvcHMub25BY3JvUmVkdWN0aW9uVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwibWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmFjcm9fanVkZ2UuZmFsbF9kb3duXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEVsZW1lbnRzIGZyb20gXCIuL0VsZW1lbnRzXCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBoYW5kbGVBY3JvUmVkdWN0aW9uVXBkYXRlID0gKGFjcm9faWR4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGxldCByZWR1Y3Rpb25zID0gdGhpcy5wcm9wcy5zY29yZURhdGEucmVkdWN0aW9ucy5tYXAoKCkgPT4gbnVsbCk7XHJcbiAgICAgICAgcmVkdWN0aW9uc1thY3JvX2lkeF0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJyZWR1Y3Rpb25zXCIsIHJlZHVjdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb25zPXsgdGhpcy5wcm9wcy5zY29yZURhdGEucmVkdWN0aW9ucyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlPXsgdGhpcy5oYW5kbGVBY3JvUmVkdWN0aW9uVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICBtaXN0YWtlcz17IHRoaXMucHJvcHMuc2NvcmVEYXRhLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxMYXlvdXQgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxMYXlvdXRcIjtcclxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNyb2JhdGljc0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxMYXlvdXRcclxuICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgU2NvcmluZ0xheW91dCB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XHJcblxyXG5pbXBvcnQgU2xpZGVyIGZyb20gXCJ0YWJsZXRfdWkvU2xpZGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtYXRpb25CdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuQ29uZmlybTogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBjb25maXJtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25Db25maXJtOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYW5Db25maXJtOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xyXG4gICAgICAgICAgICBcImNvbmZpcm1cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJoaWRkZW5cIjogIXRoaXMucHJvcHMuY2FuQ29uZmlybSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfT5cclxuICAgICAgICAgICAgICAgIDxTbGlkZXJcclxuICAgICAgICAgICAgICAgICAgICBkb25lPXsgdGhpcy5wcm9wcy5jb25maXJtZWQgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlVGV4dD17IF8oXCJ0YWJsZXQuZ2xvYmFsLmNvbmZpcm1fc2NvcmVcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRvbmVUZXh0PXsgXyhcInRhYmxldC5nbG9iYWwuY29uZmlybWVkXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkFjdGl2YXRlPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm0gfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEludGVnZXJJbnB1dCBmcm9tIFwidGFibGV0X3VpL0ludGVnZXJJbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmVEYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTbWFsbE1pc3Rha2VzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwic21hbGxfbWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlQmlnTWlzdGFrZXNDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJiaWdfbWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtaXN0YWtlcyBmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLnNtYWxsX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5zbWFsbF9taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVTbWFsbE1pc3Rha2VzQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD48dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5iaWdfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLmJpZ19taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVCaWdNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlUGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyLCB2YWx1ZSwgc2NhbGUsIG9uU2NvcmVVcGRhdGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBTY29yZVBhcnQgZnJvbSBcIi4vU2NvcmVQYXJ0XCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJQYXJ0KGNvZGUsIHNjYWxlLCBhZGRpdGlvbmFsX3Byb3BzPXt9KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFNjb3JlUGFydFxyXG4gICAgICAgICAgICAgICAgY29kZT17IGNvZGUgfVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhgdGFibGV0LmRhbmNlX2p1ZGdlLiR7Y29kZX1gKSB9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhW2NvZGVdIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgey4uLmFkZGl0aW9uYWxfcHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd193b21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImZ3X21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTIuNSB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImNvbXBvc2l0aW9uXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgdGhpcy5wcm9wcy5zY29yZURhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxMYXlvdXQgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxMYXlvdXRcIjtcclxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2luZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxMYXlvdXRcclxuICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgU2NvcmluZ0xheW91dCB9XHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZVBhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5jb2RlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsgLi4uYWRkaXRpb25hbF9wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd193b21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImZ3X21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJpbnRlZ2VyXCIsIHsgbWluOiAwLCBtYXg6IDI1IH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiY29tcG9zaXRpb25cIiwgXCJpbnRlZ2VyXCIsIHsgbWluOiAwLCBtYXg6IDIwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgdGhpcy5wcm9wcy5zY29yZURhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxMYXlvdXQgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxMYXlvdXRcIjtcclxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2luZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxMYXlvdXRcclxuICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgU2NvcmluZ0xheW91dCB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaE9yQ2xpY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBvbkNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5ta2V5KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5wcm9wcy5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25DbGljaykgfT5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxhYmVsIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vdGVySXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgQnV0dG9uIGZyb20gXCIuL0J1dHRvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb290ZXIocHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgICAgeyBSZWFjdC5DaGlsZHJlbi5tYXAocHJvcHMuY2hpbGRyZW4sIChidG4pID0+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBidG4ucHJvcHMubWtleSB9XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17IHByb3BzLnZhbHVlID09PSBidG4ucHJvcHMubWtleSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyBwcm9wcy5vbkNoYW5nZSB9XG4gICAgICAgICAgICAgICAgICAgIHsgLi4uYnRuLnByb3BzIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9mb290ZXI+XG4gICAgKVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlRGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInNtYWxsX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGhhbmRsZUJpZ01pc3Rha2VzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwiYmlnX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1pc3Rha2VzIGZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9zbWFsbF9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEuc21hbGxfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+PHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9iaWdfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLmJpZ19taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVCaWdNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlUGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgb25DaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMucHJvcHMuY29kZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyLCB2YWx1ZSwgc2NhbGUsIG9uU2NvcmVVcGRhdGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICB7Li4ub3RoZXJfcHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiYWNyb2JhdGljc1wiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX3RlY2hcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiaW1wcmVzc2lvblwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlRGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJtaXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWlzdGFrZXNcIj5cclxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEubWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVQYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGhlYWRlcjogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY2FsZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyLCB2YWx1ZSwgc2NhbGUsIG9uU2NvcmVVcGRhdGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBTY29yZVBhcnQgZnJvbSBcIi4vU2NvcmVQYXJ0XCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJQYXJ0KGNvZGUsIHNjYWxlLCBhZGRpdGlvbmFsX3Byb3BzPXt9KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFNjb3JlUGFydFxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgey4uLmFkZGl0aW9uYWxfcHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV90ZWNoXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfZmlnc1wiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImltcHJlc3Npb25cIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyB0aGlzLnByb3BzLnNjb3JlRGF0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvdGFsU2NvcmVcclxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiSnVkZ2VUYWJsZXQvQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2lwYW50IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2FuQ29uZmlybSgpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVfZGF0YSA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NvcmVfZGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc2NvcmVfZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmZpbHRlcihhID0+IGEgPT09IG51bGwpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb25Db25maXJtID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtKHRoaXMuc2NvcmUuaWQpO1xuICAgIH1cbiAgICBvblNjb3JlVXBkYXRlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUuY29uZmlybWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB7fTtcbiAgICAgICAgc2NvcmVfZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBzY29yZV9kYXRhKTtcbiAgICB9XG4gICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlID0gKGFjcm9faWR4LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgoKSA9PiBudWxsKTtcbiAgICAgICAgcmVkdWN0aW9uc1thY3JvX2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vblNjb3JlVXBkYXRlKFwicmVkdWN0aW9uc1wiLCByZWR1Y3Rpb25zKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmluZ0xheW91dCgpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVfZGF0YSA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgY29uc3QgU2NvcmluZ0NvbXBvbmVudCA9IHRoaXMucHJvcHMubGF5b3V0Q2xhc3M7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFNjb3JpbmdDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHNjb3JlX2RhdGEgfVxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxDb25maXJtYXRpb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgY29uZmlybWVkPXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICBjYW5Db25maXJtPXsgdGhpcy5jYW5Db25maXJtKCkgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm09eyB0aGlzLm9uQ29uZmlybSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJOb3RQZXJmb3JtaW5nTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90LXBlcmZvcm1pbmdcIj5cbiAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLm5vdF9wZXJmb3JtaW5nXCIpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlclNjb3JpbmdMYXlvdXQoKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMucmVuZGVyTm90UGVyZm9ybWluZ01lc3NhZ2UoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEhlYWRlciBmcm9tIFwiSnVkZ2VUYWJsZXQvSGVhZGVyXCI7XG5pbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuaW1wb3J0IFBhcnRpY2lwYW50IGZyb20gXCIuL1BhcnRpY2lwYW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxMYXlvdXQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYXQ6IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRfcHJvcHMudG91ci5pZCAhPT0gdGhpcy5wcm9wcy50b3VyLmlkKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2X3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBuZXh0X3Byb3BzO1xuICAgICAgICAgICAgdGhpcy5yZXNldENhY2hlKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBoZWF0OiB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHByZXZfcHJvcHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGhlYXRzX2NvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImhlYXRzX2NvdW50XCIsICgpID0+XG4gICAgICAgICAgICBNYXRoLm1heCguLi50aGlzLnByb3BzLnRvdXIucnVucy5tYXAocnVuID0+IHJ1bi5oZWF0KSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IHJ1bnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwicnVuc1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnJ1bnMuZmlsdGVyKHJ1biA9PiBydW4uaGVhdCA9PT0gdGhpcy5zdGF0ZS5oZWF0KVxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0KCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJ1biBvZiB0aGlzLnByb3BzLnRvdXIucnVucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiBydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkICYmICFzY29yZS5jb25maXJtZWQgJiYgcnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVuLmhlYXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhlYXRzX2NvdW50O1xuICAgIH1cbiAgICB1cGRhdGVIZWF0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaGVhdDogdmFsdWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblByZXZIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgLSAxKTtcbiAgICB9XG4gICAgb25OZXh0SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0ICsgMSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9zZmFyci1KdWRnZVRhYmxldCBHZW5lcmFsTGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgICAgICBqdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgICAgIGhlYXQ9eyB0aGlzLnN0YXRlLmhlYXQgfVxuICAgICAgICAgICAgICAgICAgICBoZWF0c0NvdW50PXsgdGhpcy5oZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAgICAgIG1heEhlYXQ9eyB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCB9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJldkhlYXRDbGljaz17IHRoaXMub25QcmV2SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICAgICAgb25OZXh0SGVhdENsaWNrPXsgdGhpcy5vbk5leHRIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIucnVucy5maWx0ZXIocnVuID0+IHJ1bi5oZWF0ID09PSB0aGlzLnN0YXRlLmhlYXQpLm1hcChydW4gPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGFydGljaXBhbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgcnVuLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuPXsgcnVuIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3M9eyB0aGlzLnByb3BzLmxheW91dENsYXNzIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE51bWJlclNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9OdW1iZXJTZWxlY3RvcklucHV0XCI7XHJcbmltcG9ydCBTZWxlY3RvcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvU2VsZWN0b3JJbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhbFNjYWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcjogUFQuc3RyaW5nLFxyXG4gICAgICAgICAgICBzY2FsZTogUFQub25lT2YoW1wicG9pbnQ1XCIsIFwiaW50ZWdlclwiLCBcImdyaWRcIiwgXCJyZWR1Y3Rpb25cIl0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUE9TU0lCTElFX1JFRFVDVElPTlMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgWzEwMCwgXCItMTAwJVwiXSxcclxuICAgICAgICAgICAgWzc1LCAgXCItNzUlXCJdLFxyXG4gICAgICAgICAgICBbNTAsICBcIi01MCVcIl0sXHJcbiAgICAgICAgICAgIFsyNSwgIFwiLTI1JVwiXSxcclxuICAgICAgICAgICAgWzEwLCAgXCItMTAlXCJdLFxyXG4gICAgICAgICAgICBbNSwgICBcIi01JVwiXSxcclxuICAgICAgICAgICAgWzAsICAgXCItMCVcIl0sXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckhlYWRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxoMz5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5oZWFkZXIgfVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfVxyXG4gICAgcmVuZGVyQm9keSgpIHtcclxuICAgICAgICBjb25zdCB7IHNjYWxlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBzd2l0Y2ggKHNjYWxlKSB7XHJcbiAgICAgICAgY2FzZSBcInBvaW50NVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPE51bWJlclNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBkZWNpbWFsU2l6ZT17IDEgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9eyAwLjUgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidHdvLWxpbmVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcImludGVnZXJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxOdW1iZXJTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ0d28tbGluZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwiZ3JpZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPE51bWJlclNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImdyaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwicmVkdWN0aW9uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8U2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLlBPU1NJQkxJRV9SRURVQ1RJT05TIH1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIm9uZS1saW5lXCJcclxuICAgICAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3dkIHNjYWxlIHR5cGU6ICR7c2NhbGV9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XHJcbiAgICBnZXQgY2hpbGRyZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJjaGlsZHJlblwiLCAoKSA9PlxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIDogW3RoaXMucHJvcHMuY2hpbGRyZW5dXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGdldCB0d29fcm93cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInR3b19yb3dzXCIsICgpID0+XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID49IDRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0IHdpZHRoX3ZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwid2lkdGhfdmFsdWVcIiwgKCkgPT5cclxuICAgICAgICAgICAgdGhpcy50d29fcm93c1xyXG4gICAgICAgICAgICAgICAgPyA5OS45IC8gKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICsgMSkgKiAyXHJcbiAgICAgICAgICAgICAgICA6IDk5LjkgLyB0aGlzLmNoaWxkcmVuLmxlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ3aWR0aFwiLCAoKSA9PlxyXG4gICAgICAgICAgICBgJHsgdGhpcy53aWR0aF92YWx1ZS50b0ZpeGVkKDUpIH0lYFxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIGdldCBtYXhfd2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJtYXhfd2lkdGhcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lX3NpemUgPSB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgICAgICA/IE1hdGguZmxvb3IoKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICsgMSkgLyAyICsgMC4wMDEpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7NjAwICogbGluZV9zaXplfXB4YDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCBhc3ltX2xheW91dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImFzeW1fbGF5b3V0XCIsICgpID0+XHJcbiAgICAgICAgICAgIHRoaXMudHdvX3Jvd3MgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggJSAyID09PSAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlclJvdyhlbGVtZW50cywgaXNfc2Vjb25kX3Jvdykge1xyXG4gICAgICAgIGlmIChlbGVtZW50cyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgcm93X3dpZHRoID0gYCR7KGVsZW1lbnRzLmxlbmd0aCAqIHRoaXMud2lkdGhfdmFsdWUpLnRvRml4ZWQoNSl9JWA7XHJcbiAgICAgICAgbGV0IGNsYXNzX25hbWUgPSBcImdyaWQtcm93XCI7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFzeW1fbGF5b3V0KSB7XHJcbiAgICAgICAgICAgIGNsYXNzX25hbWUgKz0gXCIgYWxpZ24tY2VudGVyXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc19zZWNvbmRfcm93KSB7XHJcbiAgICAgICAgICAgIGNsYXNzX25hbWUgKz0gXCIgYWxpZ24tcmlnaHRcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGFzc19uYW1lICs9IFwiIGFsaWduLWxlZnRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfSBzdHlsZT17IHsgd2lkdGg6IHJvd193aWR0aCB9IH0+PHRib2R5PlxyXG4gICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgZWxlbWVudHMubWFwKChlLCBpZHgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBpZHggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7IHdpZHRoOiB0aGlzLndpZHRoIH0gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBjbGFzc19uYW1lID0gdGhpcy50d29fcm93cyA/IFwiR3JpZCB0d28tcm93c1wiIDogXCJHcmlkXCI7XHJcbiAgICAgICAgY29uc3QgZmlyc3Rfcm93ID0gdGhpcy50d29fcm93c1xyXG4gICAgICAgICAgICA/IHRoaXMuY2hpbGRyZW4uZmlsdGVyKCh4LCBpZHgpID0+IGlkeCAlIDIgPT09IDApXHJcbiAgICAgICAgICAgIDogdGhpcy5jaGlsZHJlbjtcclxuICAgICAgICBjb25zdCBzZWNvbmRfcm93ID0gdGhpcy50d29fcm93c1xyXG4gICAgICAgICAgICA/IHRoaXMuY2hpbGRyZW4uZmlsdGVyKCh4LCBpZHgpID0+IGlkeCAlIDIgPT09IDEpXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfSBzdHlsZT17IHsgbWF4V2lkdGg6IHRoaXMubWF4X3dpZHRoIH0gfT5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3coZmlyc3Rfcm93LCBmYWxzZSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvdyhzZWNvbmRfcm93LCB0cnVlKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcInRhYmxldF91aS9vblRvdWNoT3JDbGlja1wiO1xuaW1wb3J0IHNob3dDb25maXJtIGZyb20gXCJjb21tb24vZGlhbG9ncy9zaG93Q29uZmlybVwiO1xuaW1wb3J0IGNsb3NlRGlhbG9nIGZyb20gXCJjb21tb24vZGlhbG9ncy9jbG9zZURpYWxvZ1wiO1xuXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uc1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcnVuczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhdDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdG9wVG91ciA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5zdG9wX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwge1xuICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXIuaWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm9uU3VjY2VzcyhjbG9zZURpYWxvZylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ciA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHRoaXMucHJvcHMudG91ci5pZCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAub25TdWNjZXNzKGNsb3NlRGlhbG9nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RvcFRvdXJBbmRTdGFydE5leHQgPSAoKSA9PiB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuc3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdG9wXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogdG91cl9pZCxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vblN1Y2Nlc3MoY2xvc2VEaWFsb2cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgIH0pLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ckFuZFN0YXJ0TmV4dCA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHRvdXJfaWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm9uU3VjY2VzcygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHRvdXJfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vblN1Y2Nlc3MoY2xvc2VEaWFsb2cpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYXNVbmNvbmZpcm1lZFNjb3JlcygpIHtcbiAgICAgICAgY29uc3QgcnVucyA9IHRoaXMucHJvcHMudG91ci5ydW5zO1xuICAgICAgICBjb25zdCBsYXRlc3RfaGVhdCA9IHJ1bnNbcnVucy5sZW5ndGggLSAxXS5oZWF0O1xuICAgICAgICBpZiAobGF0ZXN0X2hlYXQgPT09IHJ1bnNbMF0uaGVhdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGF0ZXN0X3J1bnMgPSBydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gbGF0ZXN0X2hlYXQpO1xuICAgICAgICBjb25zdCBwcmV2X3J1bnMgPSBydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gbGF0ZXN0X2hlYXQgLSAxKTtcbiAgICAgICAgbGV0IHNjb3JlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc19ydW4gPSAocnVuLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkal9pZCA9IHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29yZXMuaGFzKGRqX2lkKSkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZXMuc2V0KGRqX2lkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3Q6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2OiAwLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICArK3Njb3Jlcy5nZXQoZGpfaWQpW3R5cGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgbGF0ZXN0X3J1bnMpIHtcbiAgICAgICAgICAgIHByb2Nlc3NfcnVuKHJ1biwgXCJsYXRlc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgcHJldl9ydW5zKSB7XG4gICAgICAgICAgICBwcm9jZXNzX3J1bihydW4sIFwicHJldlwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHN0YXRzIG9mIHNjb3Jlcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKHN0YXRzLnByZXYgPiAwICYmIHN0YXRzLmxhdGVzdCA8IGxhdGVzdF9ydW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXJXYXJuaW5nKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzVW5jb25maXJtZWRTY29yZXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FybmluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYWxlcnRzLmhhc191bmNvbmZpcm1lZF9zY29yZXNcIikgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckJ1dHRvbihjb2RlLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2soY2FsbGJhY2spIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IF8oYHRhYmxldC5idXR0b25zLiR7Y29kZX1gKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyV2FybmluZygpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwic3RvcF90b3VyXCIsIHRoaXMuc3RvcFRvdXIpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwiZmluYWxpemVfdG91clwiLCB0aGlzLmZpbmFsaXplVG91cikgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIiwgdGhpcy5zdG9wVG91ckFuZFN0YXJ0TmV4dCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIsIHRoaXMuZmluYWxpemVUb3VyQW5kU3RhcnROZXh0KSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvYmF0aWNPdmVycmlkZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdldEFjcm9iYXRpY092ZXJyaWRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3NcbiAgICAgICAgICAgIC5tYXAoKGFjcm8sIGlkeCkgPT4gKHsgaWR4OiBpZHggKyAxLCBhY3JvYmF0aWM6IGFjcm8gfSkpXG4gICAgICAgICAgICAuZmlsdGVyKChhY3JvKSA9PiBhY3JvLmFjcm9iYXRpYy5vcmlnaW5hbF9zY29yZSAhPT0gYWNyby5hY3JvYmF0aWMuc2NvcmUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhY3JvYmF0aWNfb3ZlcnJpZGVzID0gdGhpcy5nZXRBY3JvYmF0aWNPdmVycmlkZXMoKTtcbiAgICAgICAgaWYgKGFjcm9iYXRpY19vdmVycmlkZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3JvYmF0aWMtb3ZlcnJpZGVzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIiAvPlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5hY3JvYmF0aWNfb3ZlcnJpZGVzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDx0YWJsZT48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHsgYWNyb2JhdGljX292ZXJyaWRlcy5tYXAoYWNybyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGFjcm8uaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNSBpZHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLmlkeCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLmFjcm9iYXRpYy5kZXNjcmlwdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCBvcmlnaW5hbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8uYWNyb2JhdGljLm9yaWdpbmFsX3Njb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNSBhcnJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDihpJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTEwIHNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5hY3JvYmF0aWMuc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQgVmVyYm9zZUp1ZGdlU2NvcmUgZnJvbSBcImNvbW1vbi9WZXJib3NlSnVkZ2VTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGp1ZGdlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBjb25maXJtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNob3dWZXJib3NlOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJWZXJib3NlU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93VmVyYm9zZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmVyYm9zZS1zY29yZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwianVkZ2UtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuanVkZ2UubmFtZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPFZlcmJvc2VKdWRnZVNjb3JlXG4gICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZFxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmlhbmdsZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBjb25maXJtZWQgPSB0aGlzLnByb3BzLnNjb3JlICYmIHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17IGNvbmZpcm1lZCA/IFwiY29uZmlybWVkXCIgOiBcIlwiIH0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgOiBcIuKAlFwiIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVmVyYm9zZVNjb3JlKCkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEl0ZW0gZnJvbSBcIi4vSXRlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lSnVkZ2VTY29yZSBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdmVyYm9zZUlkeDogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgbGluZV9qdWRnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwibGluZV9qdWRnZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlcy5maWx0ZXIoZGogPT4gZGoucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiIHx8IGRqLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSk7XG4gICAgfVxuICAgIGdldCBsaW5lX2p1ZGdlc19pbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJsaW5lX2p1ZGdlc19pbmRleFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLmxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChkai5pZCwgZGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5zY29yZXMuZmlsdGVyKHNjb3JlID0+IHRoaXMubGluZV9qdWRnZXNfaW5kZXguaGFzKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpKSk7XG4gICAgfVxuXG4gICAgbWFrZVNjb3Jlc1Jvd1JlZiA9IChyZWYpID0+IHRoaXMuX3Njb3Jlc19yb3cgPSByZWY7XG5cbiAgICBoYW5kbGVTaG93VmVyYm9zZVNjb3JlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uX29iaiA9IGV2ZW50LnRvdWNoZXMgPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnQ7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuX3Njb3Jlc19yb3c7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHBvc2l0aW9uX29iai5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCBzZWxlY3RlZF9pZHggPSBNYXRoLmZsb29yKG9mZnNldCAvICh0YXJnZXQub2Zmc2V0V2lkdGggLyB0aGlzLnNjb3Jlcy5sZW5ndGgpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB2ZXJib3NlSWR4OiBzZWxlY3RlZF9pZHgsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVIaWRlVmVyYm9zZVNjb3JlID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7IHZlcmJvc2VJZHg6IG51bGwgfSk7XG5cbiAgICByZW5kZXJOdW1iZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMubWFwKHNjb3JlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRqID0gdGhpcy5saW5lX2p1ZGdlc19pbmRleC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9eyBzY29yZS5pZCB9PlxuICAgICAgICAgICAgICAgICAgICB7IGAke2RqLmp1ZGdlLm51bWJlciB9JHsgZGoucm9sZSA9PT0gXCJhY3JvX2p1ZGdlXCIgPyBcIiAoQSlcIiA6IFwiXCIgfWAgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaiA9IHRoaXMubGluZV9qdWRnZXNfaW5kZXguZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyBkaiB9XG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlPXsgZGouanVkZ2UgfVxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBkai5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICBzaG93VmVyYm9zZT17IHRoaXMuc3RhdGUudmVyYm9zZUlkeCA9PT0gaWR4IH1cbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5kYW5jZV9qdWRnZV9zY29yZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImxpbmUtanVkZ2Utc2NvcmVzXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwibnVtYmVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck51bWJlcnMoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2NvcmVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZVNjb3Jlc1Jvd1JlZiB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTW92ZT17IHRoaXMuaGFuZGxlU2hvd1ZlcmJvc2VTY29yZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3V0PXsgdGhpcy5oYW5kbGVIaWRlVmVyYm9zZVNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hDYW5jZWw9eyB0aGlzLmhhbmRsZUhpZGVWZXJib3NlU2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMuaGFuZGxlSGlkZVZlcmJvc2VTY29yZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMuaGFuZGxlU2hvd1ZlcmJvc2VTY29yZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLmhhbmRsZVNob3dWZXJib3NlU2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBvblRvdWNoRW5kT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hFbmRPckNsaWNrXCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RQZXJmb3JtZWRTd2l0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG1hcmtOb3RQZXJmb3JtZWQoKSB7XG4gICAgICAgIEFwaShcInJ1bi5tYXJrX25vdF9wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuLmlkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgbWFya1BlcmZvcm1lZCgpIHtcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfcGVyZm9ybWVkXCIsIHsgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCB9KS5zZW5kKCk7XG4gICAgfVxuICAgIHJlbmRlckJ1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJub3QtcGVyZm9ybWVkXCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLm1hcmtOb3RQZXJmb3JtZWQuYmluZCh0aGlzKSkgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5tYXJrX25vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGVyZm9ybWVkXCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLm1hcmtQZXJmb3JtZWQuYmluZCh0aGlzKSkgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5kaXNjYXJkX25vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtZWQtc3dpdGNoXCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbigpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBTZWxlY3RvcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvU2VsZWN0b3JJbnB1dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZW5hbHR5SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmluZ1N5c3RlbU5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJwZW5hbHR5XCIsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHBlbmFsdGllcyA9IFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMuc2NvcmluZ1N5c3RlbU5hbWUpID49IDBcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIFtudWxsLCBcIuKAlFwiXSxcbiAgICAgICAgICAgICAgICBbMCwgICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLm9rXCIpXSxcbiAgICAgICAgICAgICAgICBbLTUsICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLmZvcm1feWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTUsICBfKFwidGFibGV0LmhlYWRfanVkZ2UuZm9ybV9yZWRfY2FyZFwiKV0sXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICBbbnVsbCwgXCLigJRcIl0sXG4gICAgICAgICAgICAgICAgWzAsICAgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5va1wiKV0sXG4gICAgICAgICAgICAgICAgWy0zLCAgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS55ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0zMCwgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5yZWRfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xMDAsIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5ibGFja19jYXJkXCIpXSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmhlYWRfanVkZ2UucGVuYWx0eV90eXBlXCIpIH1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBwZW5hbHRpZXMgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5wZW5hbHR5IH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByZXZpb3VzUGVuYWx0aWVzKHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcy5ydW4uaW5oZXJpdGVkX2RhdGEucGVuYWx0aWVzIHx8IHByb3BzLnJ1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IC8+O1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIiAvPlxuICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnByZXZpb3VzX3BlbmFsdGllc1wiKSB9PC9oMz5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIHsgcHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcy5tYXAoKGQsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1jZW50ZXJcIj48c3Ryb25nPnsgZC5wZW5hbHR5IH08L3N0cm9uZz48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnsgZC50b3VyIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5pbXBvcnQgVmVyYm9zZUp1ZGdlU2NvcmUgZnJvbSBcImNvbW1vbi9WZXJib3NlSnVkZ2VTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAganVkZ2U6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGNvbmZpcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2hvd1ZlcmJvc2U6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclZlcmJvc2VTY29yZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNob3dWZXJib3NlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2ZXJib3NlLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJqdWRnZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5qdWRnZS5uYW1lIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8VmVyYm9zZUp1ZGdlU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyaWFuZ2xlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5zY29yZSA/IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSA6IDA7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwiY29uZmlybWVkXCI6IHRoaXMucHJvcHMuc2NvcmUgJiYgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQsXG4gICAgICAgICAgICBcImdyZWVuXCI6IC10b3RhbF9zY29yZSA8IDEsXG4gICAgICAgICAgICBcInllbGxvd1wiOiAxIDw9IC10b3RhbF9zY29yZSAmJiAtdG90YWxfc2NvcmUgPCAxMCxcbiAgICAgICAgICAgIFwicmVkXCI6IDEwIDw9IC10b3RhbF9zY29yZSAmJiAtdG90YWxfc2NvcmUgPCA1MCxcbiAgICAgICAgICAgIFwiYmxhY2tcIjogNTAgPD0gLXRvdGFsX3Njb3JlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmVcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgpXG4gICAgICAgICAgICAgICAgICAgIDogXCLigJRcIiB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclZlcmJvc2VTY29yZSgpIH1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5JdGVtLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfSnVkZ2VUYWJsZXRfSGVhZEp1ZGdlTGF5b3V0X0hlYXRzUGFnZV9TY29yaW5nTGF5b3V0X1RlY2hKdWRnZXNTY29yZXNfSXRlbVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVjaEp1ZGdlU2NvcmUgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZlcmJvc2VJZHg6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IHRlY2hfanVkZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInRlY2hfanVkZ2VzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZXMuZmlsdGVyKGRqID0+IGRqLnJvbGUgPT09IFwidGVjaF9qdWRnZVwiKSk7XG4gICAgfVxuICAgIGdldCB0ZWNoX2p1ZGdlc19pbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ0ZWNoX2p1ZGdlc19pbmRleFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLnRlY2hfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChkai5pZCwgZGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5zY29yZXMuZmlsdGVyKHNjb3JlID0+IHRoaXMudGVjaF9qdWRnZXNfaW5kZXguaGFzKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpKSk7XG4gICAgfVxuXG4gICAgbWFrZVNjb3Jlc1Jvd1JlZiA9IChyZWYpID0+IHRoaXMuX3Njb3Jlc19yb3cgPSByZWY7XG5cbiAgICBoYW5kbGVTaG93VmVyYm9zZVNjb3JlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uX29iaiA9IGV2ZW50LnRvdWNoZXMgPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnQ7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuX3Njb3Jlc19yb3c7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHBvc2l0aW9uX29iai5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCBzZWxlY3RlZF9pZHggPSBNYXRoLmZsb29yKG9mZnNldCAvICh0YXJnZXQub2Zmc2V0V2lkdGggLyB0aGlzLnNjb3Jlcy5sZW5ndGgpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB2ZXJib3NlSWR4OiBzZWxlY3RlZF9pZHgsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVIaWRlVmVyYm9zZVNjb3JlID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7IHZlcmJvc2VJZHg6IG51bGwgfSk7XG5cbiAgICBnZXRTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1heFdpZHRoOiBgJHsxNTAgKiB0aGlzLnRlY2hfanVkZ2VzLmxlbmd0aH1weGAsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlck51bWJlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLnRlY2hfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17IHNjb3JlLmlkIH0+XG4gICAgICAgICAgICAgICAgICAgIHsgZGouanVkZ2UubnVtYmVyIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlclNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLnRlY2hfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgZGogfVxuICAgICAgICAgICAgICAgICAgICBqdWRnZT17IGRqLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgZGouaWQgfVxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgc2hvd1ZlcmJvc2U9eyB0aGlzLnN0YXRlLnZlcmJvc2VJZHggPT09IGlkeCB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UudGVjaF9qdWRnZV9zY29yZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRlY2gtanVkZ2Utc2NvcmVzXCIgc3R5bGU9eyB0aGlzLmdldFN0eWxlKCkgfT48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJudW1iZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTnVtYmVycygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzY29yZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsgdGhpcy5tYWtlU2NvcmVzUm93UmVmIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXsgdGhpcy5oYW5kbGVTaG93VmVyYm9zZVNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ9eyB0aGlzLmhhbmRsZUhpZGVWZXJib3NlU2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaENhbmNlbD17IHRoaXMuaGFuZGxlSGlkZVZlcmJvc2VTY29yZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5oYW5kbGVIaWRlVmVyYm9zZVNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5oYW5kbGVTaG93VmVyYm9zZVNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMuaGFuZGxlU2hvd1ZlcmJvc2VTY29yZSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBQZW5hbHR5SW5wdXQgZnJvbSBcIi4vUGVuYWx0eUlucHV0XCI7XG5pbXBvcnQgVGVjaEp1ZGdlc1Njb3JlcyBmcm9tIFwiLi9UZWNoSnVkZ2VzU2NvcmVzXCI7XG5pbXBvcnQgTGluZUp1ZGdlc1Njb3JlcyBmcm9tIFwiLi9MaW5lSnVkZ2VzU2NvcmVzXCI7XG5pbXBvcnQgQWNyb2JhdGljT3ZlcnJpZGVzIGZyb20gXCIuL0Fjcm9iYXRpY092ZXJyaWRlc1wiO1xuaW1wb3J0IFByZXZpb3VzUGVuYWx0aWVzIGZyb20gXCIuL1ByZXZpb3VzUGVuYWx0aWVzXCI7XG5pbXBvcnQgTm90UGVyZm9ybWVkU3dpdGNoIGZyb20gXCIuL05vdFBlcmZvcm1lZFN3aXRjaFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlU2NvcmVVcGRhdGUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHt9O1xuICAgICAgICBzY29yZV9kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMuc2NvcmUuaWQsIHNjb3JlX2RhdGEpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8Tm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8UGVuYWx0eUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JpbmdTeXN0ZW1OYW1lPXsgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgfVxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5oYW5kbGVTY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8UHJldmlvdXNQZW5hbHRpZXNcbiAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRlY2hKdWRnZXNTY29yZXNcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlcz17IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxMaW5lSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXM9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8QWNyb2JhdGljT3ZlcnJpZGVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxOb3RQZXJmb3JtZWRTd2l0Y2hcbiAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcblxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWF0c1BhZ2UgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMucHJvcHMuaGVhdCkpO1xuICAgIH1cbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGhlYXRzXCI+XG4gICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVG91clJlc3VsdHNMb2FkZXIgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuaW1wb3J0IFJlc3VsdHNUYWJsZTIgZnJvbSBcIlJlc3VsdHNUYWJsZTJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemF0aW9uXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHkgcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxUb3VyUmVzdWx0c0xvYWRlclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcj17IFJlc3VsdHNUYWJsZTIgfVxuICAgICAgICAgICAgICAgICAgICB0b3VySWQ9eyB0aGlzLnByb3BzLnRvdXIuaWQgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyXCI7XG5pbXBvcnQgRm9vdGVySXRlbSBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyL0Zvb3Rlckl0ZW1cIjtcblxuaW1wb3J0IEhlYXRzUGFnZSBmcm9tIFwiLi9IZWF0c1BhZ2VcIjtcbmltcG9ydCBSZXN1bHRzUGFnZSBmcm9tIFwiLi9SZXN1bHRzUGFnZVwiO1xuaW1wb3J0IEFjdGlvbnNQYWdlIGZyb20gXCIuL0FjdGlvbnNQYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRKdWRnZUxheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaGVhdDogMSxcbiAgICAgICAgICAgIHBhZ2U6IFwiaGVhdHNcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmIChuZXh0X3Byb3BzLnRvdXIuaWQgIT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaGVhdDogMSxcbiAgICAgICAgICAgICAgICBwYWdlOiBcImhlYXRzXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnByb3BzLnRvdXIucnVucy5tYXAocnVuID0+IHJ1bi5oZWF0KSk7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgb25QYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2UgfSk7XG4gICAgfVxuICAgIHJlbmRlckhlYXRzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYXRzUGFnZVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJlc3VsdHMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVzdWx0c1BhZ2VcbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QWN0aW9uc1BhZ2VcbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhdHNfY291bnQgPSB0aGlzLmhlYXRzX2NvdW50O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgIGhlYXQ9eyB0aGlzLnN0YXRlLmhlYXQgfVxuICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyBoZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAgaGlkZUhlYXRzQnV0dG9ucz17IHRoaXMuc3RhdGUucGFnZSAhPT0gXCJoZWF0c1wiIH1cbiAgICAgICAgICAgICAgICBqdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICBtYXhIZWF0PXsgaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIG9uTmV4dEhlYXRDbGljaz17IHRoaXMub25OZXh0SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLm9uUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUucGFnZSkge1xuICAgICAgICBjYXNlIFwiaGVhdHNcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckhlYXRzKCk7XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJSZXN1bHRzKCk7XG4gICAgICAgIGNhc2UgXCJhY3Rpb25zXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvb3RlciB2YWx1ZT17IHRoaXMuc3RhdGUucGFnZSB9IG9uQ2hhbmdlPXsgdGhpcy5vblBhZ2VDaGFuZ2UgfT5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMuaGVhdHNcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiaGVhdHNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLnJlc3VsdHNcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwicmVzdWx0c1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMuYWN0aW9uc1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIG1rZXk9XCJhY3Rpb25zXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Gb290ZXI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9zZmFyci1KdWRnZVRhYmxldCBIZWFkSnVkZ2VMYXlvdXRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJGb290ZXIoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IG9uVG91Y2hFbmRPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaEVuZE9yQ2xpY2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWF0OiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgaGVhdHNDb3VudDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGhpZGVIZWF0c0J1dHRvbnM6IFBULmJvb2wsXHJcbiAgICAgICAgICAgIGp1ZGdlOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIHJvbGVfZGVzY3JpcHRpb246IFBULnN0cmluZyxcclxuICAgICAgICAgICAgICAgIG51bWJlcjogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG1heEhlYXQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uTmV4dEhlYXRDbGljazogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhpZGVIZWF0c0J1dHRvbnM6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUHJldkhlYXRCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGlkZUhlYXRzQnV0dG9ucyB8fCB0aGlzLnByb3BzLmhlYXQgPD0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tY29udGFpbmVyXCIgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tY29udGFpbmVyIGxlZnRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24geyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uUHJldkhlYXRDbGljaykgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5wcmV2X2hlYXRcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJOZXh0SGVhdEJ1dHRvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaWRlSGVhdHNCdXR0b25zIHx8IHRoaXMucHJvcHMuaGVhdCA+PSB0aGlzLnByb3BzLm1heEhlYXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWNvbnRhaW5lclwiIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWNvbnRhaW5lciByaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMucHJvcHMub25OZXh0SGVhdENsaWNrKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLm5leHRfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBqdWRnZV9udW1iZXIgPSB0aGlzLnByb3BzLmp1ZGdlLnJvbGVfZGVzY3JpcHRpb24gfHwgXyhcImdsb2JhbC5waHJhc2VzLmp1ZGdlX25cIiwgdGhpcy5wcm9wcy5qdWRnZS5udW1iZXIpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUHJldkhlYXRCdXR0b24oKSB9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+eyBqdWRnZV9udW1iZXIgfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj57IHRoaXMucHJvcHMuanVkZ2UubmFtZSB9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5uYW1lIH08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5uYW1lIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5oZWF0X251bWJlclwiLCB0aGlzLnByb3BzLmhlYXQsIHRoaXMucHJvcHMuaGVhdHNDb3VudCApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5leHRIZWF0QnV0dG9uKCkgfVxyXG4gICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgb25DaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJwb2ludHNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcclxuICAgICAgICAgICAgICAgIG1heD17IDQwIH1cclxuICAgICAgICAgICAgICAgIG1pbj17IDEgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIHJvd1NpemU9eyAxMCB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cImdyaWRcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5wb2ludHMgfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBPdmVycmlkZUlucHV0IGZyb20gXCIuL092ZXJyaWRlSW5wdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZWNoLWp1ZGdlLWFjcm9cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2xzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxPdmVycmlkZUlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLnByb3BzLm9uQWNyb092ZXJyaWRlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWU9eyB0aGlzLnByb3BzLmFjcm8ub3JpZ2luYWxfc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLmFjcm8uc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjcm8uZGVzY3JpcHRpb24gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE92ZXJyaWRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yaWdpbmFsVmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVNaW51cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKE1hdGgubWF4KHRoaXMucHJvcHMudmFsdWUgLSAwLjUsIDApKTtcbiAgICB9XG4gICAgaGFuZGxlUGx1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKE1hdGgubWluKHRoaXMucHJvcHMudmFsdWUgKyAwLjUsIHRoaXMucHJvcHMub3JpZ2luYWxWYWx1ZSkpO1xuICAgIH1cbiAgICBoYW5kbGVaZXJvID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoMCk7XG4gICAgfVxuICAgIGhhbmRsZVJlc3RvcmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgdmFsdWVfY2hhbmdlZCA9IE1hdGguYWJzKHRoaXMucHJvcHMudmFsdWUgLSB0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtYWNyby1vdmVycmlkZS1pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4temVyb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IHx8IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVplcm8pIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg4oaTMFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXJlc3RvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB2YWx1ZV9jaGFuZ2VkIDwgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVSZXN0b3JlKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy52YWx1ZSA8IDAuMDUgfHwgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlTWludXMpIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUgPCB0aGlzLnByb3BzLnZhbHVlICsgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVQbHVzKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlX2NoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5wcm9wcy5vcmlnaW5hbFZhbHVlLnRvRml4ZWQoMSl9IOKGkiAke3RoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKX1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuT3ZlcnJpZGVJbnB1dC5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0p1ZGdlVGFibGV0X1RlY2hKdWRnZUxheW91dF9BY3JvUGFnZV9TY29yaW5nTGF5b3V0X092ZXJyaWRlSW5wdXRcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiSnVkZ2VUYWJsZXQvQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuL0VsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSh0aGlzLnNjb3JlLmlkKTtcbiAgICB9XG4gICAgb25BY3JvT3ZlcnJpZGUgPSAoYWNyb19pZHgsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFwaShcImFjcm9iYXRpY19vdmVycmlkZS5zZXRcIiwge1xuICAgICAgICAgICAgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCxcbiAgICAgICAgICAgIGFjcm9iYXRpY19pZHg6IGFjcm9faWR4LFxuICAgICAgICAgICAgc2NvcmU6IHZhbHVlLFxuICAgICAgICB9KS5zZW5kKCk7XG4gICAgfVxuICAgIGdlbk9uQWNyb092ZXJyaWRlKGFjcm9faWR4KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLm9uQWNyb092ZXJyaWRlKGFjcm9faWR4LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgIDxFbGVtZW50XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cbiAgICAgICAgICAgICAgICBhY3JvPXsgYWNybyB9XG4gICAgICAgICAgICAgICAgb25BY3JvT3ZlcnJpZGU9eyB0aGlzLmdlbk9uQWNyb092ZXJyaWRlKGlkeCkgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xuICAgICAgICBpZiAodGhpcy5zY29yZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxoMj57IGhlYWRlciB9PC9oMj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQ29udGVudCgpIH1cbiAgICAgICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZD17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtPXsgdGhpcy5vbkNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9TZWxlY3RvcklucHV0XCI7XG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIkp1ZGdlVGFibGV0L0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuXG5pbXBvcnQgUHJldmlvdXNQZW5hbHRpZXMgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRKdWRnZUxheW91dC9IZWF0c1BhZ2UvU2NvcmluZ0xheW91dC9QcmV2aW91c1BlbmFsdGllc1wiO1xuXG5pbXBvcnQgU3RvcFdhdGNoIGZyb20gXCIuL1N0b3BXYXRjaFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb25maXJtYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0odGhpcy5zY29yZS5pZCk7XG4gICAgfVxuICAgIGhhbmRsZVNjb3JlQ2hhbmdlID0gKHBhcnQsIHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGRhdGFbcGFydF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMuc2NvcmUuaWQsIGRhdGEpO1xuICAgIH1cblxuICAgIGhhbmRsZUp1bXBTdGVwc0NoYW5nZSA9ICh2YWx1ZSkgPT4gdGhpcy5oYW5kbGVTY29yZUNoYW5nZShcImp1bXBfc3RlcHNcIiwgdmFsdWUpO1xuICAgIGhhbmRsZVRpbWluZ1Zpb2xhdGlvbkNoYW5nZSA9ICh2YWx1ZSkgPT4gdGhpcy5oYW5kbGVTY29yZUNoYW5nZShcInRpbWluZ192aW9sYXRpb25cIiwgdmFsdWUpO1xuICAgIGhhbmRsZVBlbmFsdHlDaGFuZ2UgPSAodmFsdWUpID0+IHRoaXMuaGFuZGxlU2NvcmVDaGFuZ2UoXCJwZW5hbHR5XCIsIHZhbHVlKTtcblxuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5vblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY29yZSA9IHRoaXMuc2NvcmUuZGF0YTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgcGVuYWx0aWVzID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpID49IDBcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LnRlY2hfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstNSwgICBfKFwidGFibGV0LnRlY2hfanVkZ2UuZm9ybV95ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xNSwgIF8oXCJ0YWJsZXQudGVjaF9qdWRnZS5mb3JtX3JlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LnRlY2hfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstMywgICBfKFwidGFibGV0LnRlY2hfanVkZ2UueWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMzAsICBfKFwidGFibGV0LnRlY2hfanVkZ2UucmVkX2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTAwLCBfKFwidGFibGV0LnRlY2hfanVkZ2UuYmxhY2tfY2FyZFwiKV0sXG4gICAgICAgICAgICBdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmhlYWRfanVkZ2UucGVuYWx0eV90eXBlXCIpIH1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBwZW5hbHRpZXMgfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZS5yYXdfZGF0YS5wZW5hbHR5IH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVBlbmFsdHlDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFByZXZpb3VzUGVuYWx0aWVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCIgLz5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LnRlY2hfanVkZ2UuanVtcF9zdGVwc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XG4gICAgICAgICAgICAgICAgICAgIHNlbmREZWx0YXNcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmUucmF3X2RhdGEuanVtcF9zdGVwcyB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVKdW1wU3RlcHNDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIiAvPlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LnRlY2hfanVkZ2UudGltaW5nXCIpIH1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxTdG9wV2F0Y2hcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVJZD17IHRoaXMuc2NvcmUuaWQgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IFtbdHJ1ZSwgXCJYXCJdLCBbbnVsbCwgXCItXCJdLCBbZmFsc2UsIFwiT0tcIl1dIH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmUucmF3X2RhdGEudGltaW5nX3Zpb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVUaW1pbmdWaW9sYXRpb25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIiAvPlxuICAgICAgICAgICAgICAgIDxDb25maXJtYXRpb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgY29uZmlybWVkPXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm09eyB0aGlzLmhhbmRsZUNvbmZpcm1hdGlvbiB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaE9yQ2xpY2tcIjtcblxubGV0IHN0b3B3YXRjaGVzID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3BXYXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmVJZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICBsZXQgc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlSWRdIHx8IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIHN0cl92YWx1ZTogXCIwOjAwXCIsXG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZSkge1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLmhhbmRsZVRpY2ssIDEwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVJZF0gPSB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5vdygpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMuaGFuZGxlVGljaywgMTApLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlVG9nZ2xlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZVRpY2sgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld192YWx1ZSA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgaWYgKG5ld192YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuXG4gICAgcGFkKG51bSwgc2l6ZSkge1xuICAgICAgICBjb25zdCBzID0gYDAwMDAke251bX1gO1xuICAgICAgICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcbiAgICB9XG4gICAgZ2V0U3RyVmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIGxldCBtID0gMCwgcyA9IDA7XG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XG4gICAgICAgIHJldHVybiBgJHttfToke3RoaXMucGFkKHMsIDIpfWA7XG4gICAgfVxuXG4gICAgZ2V0VG9nZ2xlQnV0dG9uQ2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XG4gICAgICAgICAgICBcInRidG5cIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYnRuLXRvZ2dsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJpZ25vcmUtcmVhZG9ubHlcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRoaXMuc3RhdGUuYWN0aXZlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVSZXNldCkgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IHRoaXMuZ2V0VG9nZ2xlQnV0dG9uQ2xhc3NOYW1lKCkgfVxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlVG9nZ2xlKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3N0b3B3YXRjaFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNpbmdQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuLmlkIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlcygpIH1cbiAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEhlYWRlciBmcm9tIFwiSnVkZ2VUYWJsZXQvSGVhZGVyXCI7XG5pbXBvcnQgRm9vdGVyIGZyb20gXCJKdWRnZVRhYmxldC9Gb290ZXJcIjtcbmltcG9ydCBGb290ZXJJdGVtIGZyb20gXCJKdWRnZVRhYmxldC9Gb290ZXIvRm9vdGVySXRlbVwiO1xuXG5pbXBvcnQgRGFuY2luZ1BhZ2UgZnJvbSBcIi4vRGFuY2luZ1BhZ2VcIjtcbmltcG9ydCBBY3JvUGFnZSBmcm9tIFwiLi9BY3JvUGFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNoSnVkZ2VMYXlvdXQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYXQ6IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0LFxuICAgICAgICAgICAgcGFnZTogXCJkYW5jaW5nXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IG5leHRfcHJvcHM7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0LFxuICAgICAgICAgICAgICAgIHBhZ2U6IFwiZGFuY2luZ1wiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gcHJldl9wcm9wcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiaGVhdHNfY291bnRcIiwgKCkgPT5cbiAgICAgICAgICAgIE1hdGgubWF4KC4uLnRoaXMucHJvcHMudG91ci5ydW5zLm1hcChydW4gPT4gcnVuLmhlYXQpKVxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgcnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJydW5zXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIucnVucy5maWx0ZXIocnVuID0+IHJ1bi5oZWF0ID09PSB0aGlzLnN0YXRlLmhlYXQpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBmaXJzdF9ub25fY29uZmlybWVkX2hlYXQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHRoaXMucHJvcHMudG91ci5ydW5zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQgJiYgIXNjb3JlLmNvbmZpcm1lZCAmJiBydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW4uaGVhdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhdHNfY291bnQ7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZVByZXZIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgLSAxKTtcbiAgICB9XG4gICAgaGFuZGxlTmV4dEhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCArIDEpO1xuICAgIH1cbiAgICBoYW5kbGVQYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2UgfSk7XG4gICAgfVxuICAgIHJlbmRlckRhbmNpbmcoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RGFuY2luZ1BhZ2VcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgcnVucz17IHRoaXMucnVucyB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjcm8oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QWNyb1BhZ2VcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgcnVucz17IHRoaXMucnVucyB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhdHNfY291bnQgPSB0aGlzLmhlYXRzX2NvdW50O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgIGhlYXQ9eyB0aGlzLnN0YXRlLmhlYXQgfVxuICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyBoZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgbWF4SGVhdD17IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0IH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBvbk5leHRIZWF0Q2xpY2s9eyB0aGlzLmhhbmRsZU5leHRIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgICAgIG9uUHJldkhlYXRDbGljaz17IHRoaXMuaGFuZGxlUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUucGFnZSkge1xuICAgICAgICBjYXNlIFwiZGFuY2luZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGFuY2luZygpO1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWNybygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKFtcInJvc2ZhcnIuYWNyb1wiLCBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9vdGVyIHZhbHVlPXsgdGhpcy5zdGF0ZS5wYWdlIH0gb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVBhZ2VDaGFuZ2UgfT5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMuZGFuY2luZ1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIG1rZXk9XCJkYW5jaW5nXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5hY3JvXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImFjcm9cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0Zvb3Rlcj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3NmYXJyLUp1ZGdlVGFibGV0IFRlY2hKdWRnZUxheW91dFwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckZvb3RlcigpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChwcm9wcykgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC50b3RhbF9zY29yZVwiKSB9OiB7IHByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUgfVxuICAgIDwvZGl2PlxuKTtcbiIsImltcG9ydCBnZXRTY29yaW5nVHlwZSBmcm9tIFwiY29tbW9uL2dldFNjb3JpbmdUeXBlXCI7XG5cbmltcG9ydCBBY3JvYmF0aWNzTGF5b3V0IGZyb20gXCIuL0Fjcm9iYXRpY3NMYXlvdXRcIjtcbmltcG9ydCBEYW5jZUxheW91dCBmcm9tIFwiLi9EYW5jZUxheW91dFwiO1xuaW1wb3J0IERhbmNlSGFsdmVkTGF5b3V0IGZyb20gXCIuL0RhbmNlSGFsdmVkTGF5b3V0XCI7XG5pbXBvcnQgRm9ybWF0aW9uTGF5b3V0IGZyb20gXCIuL0Zvcm1hdGlvbkxheW91dFwiO1xuaW1wb3J0IEZvcm1hdGlvbkFjcm9MYXlvdXQgZnJvbSBcIi4vRm9ybWF0aW9uQWNyb0xheW91dFwiO1xuaW1wb3J0IFNpbXBsaWZpZWRMYXlvdXQgZnJvbSBcIi4vU2ltcGxpZmllZExheW91dFwiO1xuaW1wb3J0IEhlYWRKdWRnZUxheW91dCBmcm9tIFwiLi9IZWFkSnVkZ2VMYXlvdXRcIjtcbmltcG9ydCBUZWNoSnVkZ2VMYXlvdXQgZnJvbSBcIi4vVGVjaEp1ZGdlTGF5b3V0XCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdWRnZVRhYmxldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIExBWU9VVFMgPSB7XG4gICAgICAgIFwiYWNyb1wiOiBBY3JvYmF0aWNzTGF5b3V0LFxuICAgICAgICBcImRhbmNlXCI6IERhbmNlTGF5b3V0LFxuICAgICAgICBcImRhbmNlX2hhbHZlZFwiOiBEYW5jZUhhbHZlZExheW91dCxcbiAgICAgICAgXCJmb3JtYXRpb25cIjogRm9ybWF0aW9uTGF5b3V0LFxuICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IEZvcm1hdGlvbkFjcm9MYXlvdXQsXG4gICAgICAgIFwic2ltcGxpZmllZFwiOiBTaW1wbGlmaWVkTGF5b3V0LFxuICAgICAgICBcImhlYWRcIjogSGVhZEp1ZGdlTGF5b3V0LFxuICAgICAgICBcInRlY2hcIjogVGVjaEp1ZGdlTGF5b3V0LFxuICAgIH07XG4gICAgb25TY29yZVVwZGF0ZSA9IChzY29yZV9pZCwgbmV3X3Njb3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBzY29yZV9kYXRhOiBuZXdfc2NvcmUsXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIEFwaShcInNjb3JlLnNldFwiLCB7IHNjb3JlX2lkOiBzY29yZV9pZCwgZGF0YTogcmVxdWVzdCB9KS5zZW5kKCk7XG4gICAgfVxuICAgIG9uU2NvcmVDb25maXJtID0gKHNjb3JlX2lkKSA9PiB7XG4gICAgICAgIEFwaShcInNjb3JlLmNvbmZpcm1cIiwgeyBzY29yZV9pZDogc2NvcmVfaWQgfSkuc2VuZCgpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNjb3JpbmdfdHlwZSA9IGdldFNjb3JpbmdUeXBlKHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSk7XG4gICAgICAgIGxldCBMYXlvdXRDbGFzcyA9IEp1ZGdlVGFibGV0LkxBWU9VVFNbc2NvcmluZ190eXBlXTtcbiAgICAgICAgaWYgKCFMYXlvdXRDbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2Pk5vdCBpbXBsZW1lbnRlZCE8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9zZmFyci1KdWRnZVRhYmxldFwiPlxuICAgICAgICAgICAgICAgIDxMYXlvdXRDbGFzc1xuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZV9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyYm9zZV90b3RhbF9zY29yZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbF9wZW5hbHR5OiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldENhcmQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIuKAlFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUudG90YWxfcGVuYWx0eS50b0ZpeGVkKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1RvdGFsU2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gXCLigJRcIjtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gKFxyXG4gICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICZuYnNwO3sgXCIvIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBjb250ZW50IH1cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnBsYWNlIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudClcclxuICAgICAgICAgICAgICAgICB9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIH1cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRDYXJkKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlMV9Sb3dcIjtcclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIG5leHRfdG91cl9pZDogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XG4gICAgICAgIGRvY3hcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZVwiLCBcImZvbnQtc2l6ZVwiLCBcIjEycHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKTtcbiAgICB9XG5cbiAgICBnZXRSb3dTdGF0dXMocm93KSB7XG4gICAgICAgIGlmICghcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X3BlcmZvcm1lZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3cuYWR2YW5jZXMgPyBcImFkdmFuY2VkXCIgOiBcIm5vdF9hZHZhbmNlZFwiO1xuICAgIH1cbiAgICBnZXRTdGF0dXNIZWFkZXIocm93X3N0YXR1cykge1xuICAgICAgICByZXR1cm4gXyhgcmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c18ke3Jvd19zdGF0dXN9YCk7XG4gICAgfVxuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKHByZXZfcm93LCBuZXh0X3JvdywgaGFzX25leHRfdG91ciwgbl9jb2xzKSB7XG4gICAgICAgIGNvbnN0IHByZXZfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMocHJldl9yb3cpO1xuICAgICAgICBjb25zdCBuZXh0X3N0YXR1cyA9IHRoaXMuZ2V0Um93U3RhdHVzKG5leHRfcm93KTtcbiAgICAgICAgaWYgKHByZXZfc3RhdHVzID09PSBuZXh0X3N0YXR1cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRfc3RhdHVzICE9PSBcIm5vdF9wZXJmb3JtZWRcIiAmJiAhaGFzX25leHRfdG91cikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgQUgke25leHRfcm93LnJ1bi5pZH1gIH0+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImFkdmFuY2VzLWhlYWRlclwiIGNvbFNwYW49eyBuX2NvbHMgfT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RhdHVzSGVhZGVyKG5leHRfc3RhdHVzKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBjb25zdCBzaG93X3RvdGFsX3Njb3JlID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YoXG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPCAwO1xuICAgICAgICBjb25zdCBkanNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZGogPT4gW2RqLmlkLCBkal0pKTtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wcy50YWJsZS5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRhYmxlW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4XSxcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIDUgKyBzaG93X3RvdGFsX3Njb3JlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucHJvcHMudGFibGVbaWR4XTtcbiAgICAgICAgICAgIHJvd3MucHVzaChcbiAgICAgICAgICAgICAgICA8Um93XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgcm93LnJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHJvdz17IHJvdyB9XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlPXsgc2hvd190b3RhbF9zY29yZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUmVzdWx0c1RhYmxlMVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2x1YlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNob3dfdG90YWxfc2NvcmUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SZXN1bHRzVGFibGUxLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlMVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uc1dpZHRocyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcywgaGFzX3RvdGFsX3Njb3JlKSB7XHJcbiAgICAgICAgdGhpcy5qdWRnZV93aWR0aCA9IE1hdGgucm91bmQoNTUgLyAobl9qdWRnZXMgKyAxKSk7XHJcbiAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCA9IGhhc190b3RhbF9zY29yZSA/IDE0IDogMDtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gNjtcclxuICAgICAgICB0aGlzLm51bWJlcl93aWR0aCA9IDM7XHJcbiAgICAgICAgdGhpcy5uYW1lX3dpZHRoID0gMTAwIC0gdGhpcy5qdWRnZV93aWR0aCAqIChuX2p1ZGdlcyArIDEpIC1cclxuICAgICAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCAtIHRoaXMucGxhY2Vfd2lkdGggLSB0aGlzLm51bWJlcl93aWR0aDtcclxuICAgIH1cclxuICAgIGdlblBsYWNlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuTnVtYmVyU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubnVtYmVyX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbk5hbWVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5uYW1lX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlblRvdGFsU2NvcmVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy50b3RhbF9zY29yZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5KdWRnZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmp1ZGdlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgZ2V0UGFydGljaXBhbnREaXNwbGF5IGZyb20gXCJjb21tb24vZ2V0UGFydGljaXBhbnREaXNwbGF5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzaG93VG90YWxTY29yZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzRm9ybWF0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpID49IDA7XG4gICAgfVxuXG4gICAgZ2V0Q2FyZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCLigJRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUudG90YWxfcGVuYWx0eS50b0ZpeGVkKCk7XG4gICAgfVxuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cuYWRkaXRpb25hbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfVxuICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIHsgYCAoJHtzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMSl9KWAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJTY29yZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yZSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgJm1kYXNoO1xuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc2NpcGxpbmVfanVkZ2Uucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiICYmIHRoaXMuaXNGb3JtYXRpb24oKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyVG90YWxTY29yZUNlbGwoKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmU7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93VG90YWxTY29yZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgJm1kYXNoO1xuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XG4gICAgICAgICAgICBjb25zdCBwX3Njb3JlID0gdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgICAgICBjb25zdCBzX3Njb3JlID0gdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMuZndfc2NvcmVfc2hvcnRcIikgfTogJHtwX3Njb3JlfSAvICR7c19zY29yZX1gIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDt7IFwiLyBcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgJm5ic3A7eyBcIi8gXCIgfVxuICAgICAgICAgICAgICAgICAgICB7IHRvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJKdWRnZXNTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMubWFwKHNjb3JlID0+IFtzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzY29yZV0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluZURpc2NpcGxpbmVKdWRnZXMubWFwKChkaiwgaWR4KSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGRqID8gZGouaWQgOiBgSSR7aWR4fWAgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUoZGosIHNjb3Jlc19tYXAuZ2V0KGRqLmlkKSkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50Lm51bWJlciB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQpIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySnVkZ2VzU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0Q2FyZCgpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlMl9Sb3dcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5pbXBvcnQgQ29sdW1uc1dpZHRocyBmcm9tIFwiLi9Db2x1bW5zV2lkdGhzXCI7XHJcblxyXG5pbXBvcnQgZ2V0SnVkZ2VUYWJsZU1hcmsgZnJvbSBcImdldEp1ZGdlVGFibGVNYXJrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRhYmxlOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG5leHRfdG91cl9pZDogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiBQVC5hcnJheU9mKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XHJcbiAgICAgICAgZG9jeFxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFkdmFuY2VzLWhlYWRlclwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3RhbC1zY29yZVwiLCBcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSb3dTdGF0dXMocm93KSB7XHJcbiAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9wZXJmb3JtZWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdy5hZHZhbmNlcyA/IFwiYWR2YW5jZWRcIiA6IFwibm90X2FkdmFuY2VkXCI7XHJcbiAgICB9XHJcbiAgICBnZXRTdGF0dXNIZWFkZXIocm93X3N0YXR1cykge1xyXG4gICAgICAgIHJldHVybiBfKGByZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzXyR7cm93X3N0YXR1c31gKTtcclxuICAgIH1cclxuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKHByZXZfcm93LCBuZXh0X3JvdywgaGFzX25leHRfdG91ciwgbl9jb2xzKSB7XHJcbiAgICAgICAgY29uc3QgcHJldl9zdGF0dXMgPSB0aGlzLmdldFJvd1N0YXR1cyhwcmV2X3Jvdyk7XHJcbiAgICAgICAgY29uc3QgbmV4dF9zdGF0dXMgPSB0aGlzLmdldFJvd1N0YXR1cyhuZXh0X3Jvdyk7XHJcbiAgICAgICAgaWYgKHByZXZfc3RhdHVzID09PSBuZXh0X3N0YXR1cykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5leHRfc3RhdHVzICE9PSBcIm5vdF9wZXJmb3JtZWRcIiAmJiAhaGFzX25leHRfdG91cikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyIGtleT17IGBBSCR7bmV4dF9yb3cucnVuLmlkfWAgfT5cclxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdGF0dXNIZWFkZXIobmV4dF9zdGF0dXMpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qgc2hvd190b3RhbF9zY29yZSA9IFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPCAwO1xyXG4gICAgICAgIGNvbnN0IGxpbmVfanVkZ2VzID0gdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKFxyXG4gICAgICAgICAgICBkaiA9PiBbXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIl0uaW5kZXhPZihkai5yb2xlKSA+PSAwKTtcclxuICAgICAgICBjb25zdCBoYXNfbmV4dF90b3VyID0gdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbDtcclxuICAgICAgICBjb25zdCB3aWR0aHMgPSBuZXcgQ29sdW1uc1dpZHRocyhsaW5lX2p1ZGdlcy5sZW5ndGgsIHNob3dfdG90YWxfc2NvcmUpO1xyXG4gICAgICAgIGNvbnN0IGRqc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLm1hcChkaiA9PiBbZGouaWQsIGRqXSkpO1xyXG4gICAgICAgIGxldCByb3dzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wcy50YWJsZS5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50YWJsZVtpZHggLSAxXSxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4XSxcclxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXIsXHJcbiAgICAgICAgICAgICAgICA0ICsgbGluZV9qdWRnZXMubGVuZ3RoICsgc2hvd190b3RhbF9zY29yZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgcm93cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cclxuICAgICAgICAgICAgICAgICAgICBrZXk9eyB0aGlzLnByb3BzLnRhYmxlW2lkeF0ucnVuLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlcz17IGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICByb3c9eyB0aGlzLnByb3BzLnRhYmxlW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlPXsgc2hvd190b3RhbF9zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlJlc3VsdHNUYWJsZTJcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cIm51bWJlclwiIHN0eWxlPXsgd2lkdGhzLmdlbk51bWJlclN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuTmFtZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc2hvd190b3RhbF9zY29yZSA/IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIiBzdHlsZT17IHdpZHRocy5nZW5Ub3RhbFNjb3JlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxpbmVfanVkZ2VzLm1hcChkaiA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBrZXk9eyBkai5pZCB9IHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZ2V0SnVkZ2VUYWJsZU1hcmsoZGopIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUmVzdWx0c1RhYmxlMi5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTJcIjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uc1dpZHRocyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcykge1xyXG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDcwIC8gbl9qdWRnZXMpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA3XHJcbiAgICAgICAgdGhpcy5pbmZvX3dpZHRoID0gMTAwIC0gdGhpcy5qdWRnZV93aWR0aCAqIG5fanVkZ2VzIC0gdGhpcy5wbGFjZV93aWR0aDtcclxuICAgIH1cclxuICAgIGdlblBsYWNlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuSW5mb1N0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmluZm9fd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuSnVkZ2VTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5qdWRnZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZvQ2VsbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgYWNyb2JhdGljczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0aW9uX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BvcnRzbWVuOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0Q2FyZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCLigJRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUudG90YWxfcGVuYWx0eS50b0ZpeGVkKCk7XG4gICAgfVxuICAgIHJlbmRlclBhcnRpY2lwYW50SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50KSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoZWFkX2p1ZGdlX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnNjb3Jlcy5maW5kKFxuICAgICAgICAgICAgc2NvcmUgPT4gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwLmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKS5yb2xlID09PSBcImhlYWRfanVkZ2VcIik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IGAke18oXCJyZXN1bHRzLmxhYmVscy5wZW5hbHR5XCIpfTogYCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyB0aGlzLmdldENhcmQoKSB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoW1wicm9zZmFyci5hY3JvXCIsIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFzX2Fjcm9fb3ZlcnJpZGVzID0gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MuZmluZEluZGV4KFxuICAgICAgICAgICAgZWxlbWVudCA9PiBlbGVtZW50LnNjb3JlICE9PSBlbGVtZW50Lm9yaWdpbmFsX3Njb3JlXG4gICAgICAgICkgPiAwO1xuICAgICAgICBjb25zdCBhY3JvX2NlbGxfd2lkdGggPSBgJHsoMTAwIC8gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MubGVuZ3RoKX0lYDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NfdmVyYm9zZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH06XG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYWNyby10YWJsZVwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLm9yaWdpbmFsX3Njb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlcyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8uc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NGd1Njb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKTtcbiAgICAgICAgY29uc3Qgc19zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyBgOiAke3Bfc2NvcmV9IC8gJHtzX3Njb3JlfWAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcF9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IHNfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5hY3JvX3Njb3JlXCIpIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7IGA6ICR7cF9zY29yZX0gLyAke3Nfc2NvcmV9YCB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIil9OiAke3RoaXMucHJvcHMucm93LnJ1bi50b3RhbF9zY29yZX1gIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPGVtPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5ub3RfcGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2VtPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlck5leHRUb3VyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpfTogYCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgICAgICA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKVxuICAgICAgICAgICAgICAgICAgICA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiaW5mby1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0aWNpcGFudEluZm8oKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRKdWRnZVBlbmFsdHkoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQW1DbGFzc0Z3U2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0VG91ckxhYmVsKCkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkluZm9DZWxsLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19JbmZvQ2VsbFwiO1xuIiwiaW1wb3J0IFZlcmJvc2VKdWRnZVNjb3JlIGZyb20gXCJjb21tb24vVmVyYm9zZUp1ZGdlU2NvcmVcIjtcblxuaW1wb3J0IEluZm9DZWxsIGZyb20gXCIuL0luZm9DZWxsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NlX3RvdGFsX3Njb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclNjb3JlKGRpc2NpcGxpbmVfanVkZ2UsIHNjb3JlKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VmVyYm9zZUp1ZGdlU2NvcmVcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YT17IHRoaXMucHJvcHMucm93LmFkZGl0aW9uYWxfZGF0YSB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgZGlzY2lwbGluZV9qdWRnZSB9XG4gICAgICAgICAgICAgICAgcGVyZm9ybWVkPXsgdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCB9XG4gICAgICAgICAgICAgICAgc2NvcmU9eyBzY29yZSB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJKdWRnZXNTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMubWFwKHNjb3JlID0+IFtzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzY29yZV0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluZURpc2NpcGxpbmVKdWRnZXMubWFwKChkaiwgaWR4KSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGRqID8gZGouaWQgOiBgSSR7aWR4fWAgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUoZGosIHNjb3Jlc19tYXAuZ2V0KGRqLmlkKSkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDxJbmZvQ2VsbFxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwIH1cbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5yb3cgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJKdWRnZXNTY29yZXMoKSB9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19Sb3dcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5pbXBvcnQgQ29sdW1uc1dpZHRocyBmcm9tIFwiLi9Db2x1bW5zV2lkdGhzXCI7XHJcblxyXG5pbXBvcnQgZ2V0SnVkZ2VUYWJsZU1hcmsgZnJvbSBcImdldEp1ZGdlVGFibGVNYXJrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZXM6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgbmV4dF90b3VyX2lkOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XHJcbiAgICAgICAgZG9jeFxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcInBhZGRpbmdcIiwgXCIwIDNwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duXCIsIFwid2lkdGhcIiwgXCI1MHB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmVfanVkZ2VzID0gdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKFxyXG4gICAgICAgICAgICBkaiA9PiBbXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIl0uaW5kZXhPZihkai5yb2xlKSA+PSAwKTtcclxuICAgICAgICBjb25zdCB3aWR0aHMgPSBuZXcgQ29sdW1uc1dpZHRocyhsaW5lX2p1ZGdlcy5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGRqc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLm1hcChkaiA9PiBbZGouaWQsIGRqXSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlJlc3VsdHNUYWJsZTNcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuSW5mb1N0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGluZV9qdWRnZXMubWFwKGRqID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBnZXRKdWRnZVRhYmxlTWFyayhkaikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudGFibGUubWFwKHJvdyA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyByb3cucnVuLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlcz17IGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9eyByb3cgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlc3VsdHNUYWJsZTMuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzXCI7XHJcbiIsInZhciBDYWNoZU1peGluID0gQmFzZSA9PiBjbGFzcyBleHRlbmRzIEJhc2Uge1xuICAgIHJlc2V0Q2FjaGUoKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgIH1cbiAgICBmZXRjaEZyb21DYWNoZShrZXksIGdlbmVyYXRvcikge1xuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jYWNoZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBnZW5lcmF0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVba2V5XTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWNoZU1peGluO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGZvcm1hdFNjb3JlIGZyb20gXCIuL2Zvcm1hdFNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb25zOiBQVC5hcnJheU9mKFBULm51bWJlcikuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmFjcm9fblwiLCBpZHggKyAxKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZShzY29yZSwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5mZFwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQWNyb1Njb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19Sb3dfQWNyb1Njb3JlXCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgZm9ybWF0U2NvcmUgZnJvbSBcIi4vZm9ybWF0U2NvcmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmd193b21hbjogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZndfbWFuOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbjogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmluZ1R5cGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVfZm9ybWF0ID0gdGhpcy5wcm9wcy5zY29yaW5nVHlwZSA9PT0gXCJkYW5jZV9oYWx2ZWRcIiA/IFwiQFwiIDogXCIkXCJcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5md1wiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuZndfd29tYW4sIFwiLSQlXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmZtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5md19tYW4sIFwiLSQlXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBzY29yZV9mb3JtYXQpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmNcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5jb21wb3NpdGlvbiwgc2NvcmVfZm9ybWF0KSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJtaXN0YWtlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuYmlnX21pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EYW5jZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19Sb3dfRGFuY2VTY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGZvcm1hdFNjb3JlIGZyb20gXCIuL2Zvcm1hdFNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdGlvbkFjcm9TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkaXRpb25hbERhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwbGFjZXM6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuYWNyb2JhdGljcywgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuaW1wcmVzc2lvbiwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibWlzdGFrZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnNtYWxsX21pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5ibVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYWRkaXRpb25hbERhdGFcbiAgICAgICAgICAgICAgICAgICAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuYWRkaXRpb25hbERhdGEucGxhY2VzW3RoaXMucHJvcHMuc2NvcmUuaWRdIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Gb3JtYXRpb25BY3JvU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25BY3JvU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkaXRpb25hbERhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwbGFjZXM6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuaW1wcmVzc2lvbiwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJtaXN0YWtlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEubWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYWRkaXRpb25hbERhdGFcbiAgICAgICAgICAgICAgICAgICAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuYWRkaXRpb25hbERhdGEucGxhY2VzW3RoaXMucHJvcHMuc2NvcmUuaWRdIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGZvcm1hdFNjb3JlIGZyb20gXCIuL2Zvcm1hdFNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlY2hTY29yZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAganVtcF9zdGVwczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltaW5nX3Zpb2xhdGlvbjogUFQuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHR2ID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb247XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uanNcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmp1bXBfc3RlcHMsIFwiJFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50dlwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0diA9PT0gdHJ1ZSA/IFwi4pyXXCIgOiB0diA9PT0gZmFsc2UgPyBcIuKck1wiIDogXCI/XCIgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24ucGVuYWx0eVwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucGVuYWx0eSwgXCIkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblRlY2hTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93X1RlY2hTY29yZVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U2NvcmUoc2NvcmUsIHRlbXBsYXRlPVwiJFwiKSB7XG4gICAgaWYgKHNjb3JlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIuKAlFwiO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCIkXCIsIHNjb3JlKVxuICAgICAgICAucmVwbGFjZShcIkBcIiwgc2NvcmUudG9GaXhlZCgxKSlcbn1cbiIsImltcG9ydCBnZXRTY29yaW5nVHlwZSBmcm9tIFwiY29tbW9uL2dldFNjb3JpbmdUeXBlXCI7XG5cbmltcG9ydCBBY3JvU2NvcmUgZnJvbSBcIi4vQWNyb1Njb3JlXCI7XG5pbXBvcnQgRGFuY2VTY29yZSBmcm9tIFwiLi9EYW5jZVNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uQWNyb1Njb3JlIGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9TY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0Zvcm1hdGlvblNjb3JlXCI7XG5pbXBvcnQgVGVjaFNjb3JlIGZyb20gXCIuL1RlY2hTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJib3NlSnVkZ2VTY29yZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBQVC5vYmplY3QsXG4gICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgJm1kYXNoO1xuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IFNjb3JlQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgY29uc3Qgc2NvcmluZ190eXBlID0gZ2V0U2NvcmluZ1R5cGUodGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UsIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKTtcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3R5cGUpIHtcbiAgICAgICAgY2FzZSBcImRhbmNlXCI6XG4gICAgICAgIGNhc2UgXCJkYW5jZV9oYWx2ZWRcIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gRGFuY2VTY29yZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgU2NvcmVDb21wb25lbnQgPSBBY3JvU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvblwiOlxuICAgICAgICAgICAgU2NvcmVDb21wb25lbnQgPSBGb3JtYXRpb25TY29yZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gRm9ybWF0aW9uQWNyb1Njb3JlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0ZWNoXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IFRlY2hTY29yZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgICAgICAgc2NvcmU6IHRoaXMucHJvcHMuc2NvcmUsXG4gICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogdGhpcy5wcm9wcy5hZGRpdGlvbmFsRGF0YSxcbiAgICAgICAgICAgIHNjb3JpbmdUeXBlOiBzY29yaW5nX3R5cGUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2NvcmVDb21wb25lbnQgeyAuLi5wcm9wcyB9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5WZXJib3NlSnVkZ2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX2NvbW1vbl9WZXJib3NlSnVkZ2VTY29yZVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnREaXNwbGF5KHBhcnRpY2lwYW50KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZGlzcGxheS1uYW1lXHJcbiAgICBpZiAocGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgIHsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJ0aWNpcGFudC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+XHJcbiAgICAgICAgPHAga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgIHsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICBzd2l0Y2ggKGRpc2NpcGxpbmVfanVkZ2Uucm9sZSkge1xyXG4gICAgY2FzZSBcImRhbmNlX2p1ZGdlXCI6XHJcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvblwiO1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvbl9hY3JvXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuc2ltcGxpZmllZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJzaW1wbGlmaWVkXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlX2hhbHZlZFwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcImFjcm9fanVkZ2VcIjpcclxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9md1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZV9oYWx2ZWRcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJhY3JvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcInRlY2hfanVkZ2VcIjpcclxuICAgICAgICByZXR1cm4gXCJ0ZWNoXCI7XHJcbiAgICBjYXNlIFwiaGVhZF9qdWRnZVwiOlxyXG4gICAgICAgIHJldHVybiBcImhlYWRcIjtcclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiBnZXRKdWRnZVRhYmxlTWFyayhkaXNjaXBsaW5lX2p1ZGdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGRpc2NpcGxpbmVfanVkZ2UuanVkZ2UubnVtYmVyO1xuICAgIGlmIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSB7XG4gICAgICAgIHJlc3VsdCArPSBcIiAoQSlcIjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0SnVkZ2VUYWJsZU1hcms7XG4iLCJpbXBvcnQgdHJhbnNsYXRlX3J1IGZyb20gXCIuL3J1XCI7XHJcblxyXG5jb25zdCBfID0gdHJhbnNsYXRlX3J1XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCAuLi5hcmdzKSB7XG4gICAgbGV0IFBIUkFTRVMgPSB7XG4gICAgICAgIFwiYWRtaW5cIjoge1xuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInRhYmxldFwiOiB7XG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjoge1xuICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gYNCQ0LrRgNC+0LHQsNGC0LjQutCwICR7biArIDF9YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRg1wiLFxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3N0b3B3YXRjaFwiOiBcItCh0YLQsNGA0YJcIixcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YNcIixcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXG4gICAgICAgICAgICAgICAgXCJjb21wb3NpdGlvblwiOiBcItCa0L7QvNC/0L7Qt9C40YbQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxuICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtX2ZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMylcIixcbiAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV9iaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zKVwiLFxuICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcbiAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXG4gICAgICAgICAgICAgICAgXCJpbXByZXNzaW9uXCI6IFwi0J7QsdGJ0LXQtSDQstC/0LXRh9Cw0YLQu9C10L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcbiAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1pbmdcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LXRglwiLFxuICAgICAgICAgICAgICAgIFwianVkZ2VfbnVtYmVyXCI6IChuKSA9PiBg0KHRg9C00YzRjyDihJYke259YCxcbiAgICAgICAgICAgICAgICBcImhlYXRfbnVtYmVyXCI6IChuLCB0KSA9PiBg0JfQsNGF0L7QtCAke259INC40LcgJHt0fWAsXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJrX25vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRfbm90X3BlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcbiAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcbiAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcbiAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcbiAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxuICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcbiAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INGC0LXRhdC90LjRh9C10YHQutC40YUg0YHRg9C00LXQuVwiLFxuICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXG4gICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxuICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxuICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxuICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcbiAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IGDQodCx0YDQvtGBINC90LAgJHtufWAsXG4gICAgICAgICAgICAgICAgXCJ0aW1pbmdcIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcbiAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJkYW5jaW5nXCI6IFwi0KLQsNC90LXRhlwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInJlc3VsdHNcIjoge1xuICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xuICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gYEEke259YCxcbiAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxuICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXG4gICAgICAgICAgICAgICAgXCJkZlwiOiBcItCi0KRcIixcbiAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXG4gICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXG4gICAgICAgICAgICAgICAgXCJmbVwiOiBcItCe0KXQvFwiLFxuICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcbiAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXG4gICAgICAgICAgICAgICAgXCJtXCI6IFwi0J7RiFwiLFxuICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXG4gICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcbiAgICAgICAgICAgICAgICBcImpzXCI6IFwi0J7QpVwiLFxuICAgICAgICAgICAgICAgIFwidHZcIjogXCLQktGA0LXQvNGPXCIsXG4gICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhFwiLFxuICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcbiAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXG4gICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXG4gICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcbiAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXG4gICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhFwiLFxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLFxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgXCJnbG9iYWxcIjoge1xuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZFwiOiBcItCe0YLQvNC10L3QuNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuX3NwID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGDQpNC+0YDQvNC10LnRiNC9IOKEliR7bn1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYDogJHtuYW1lfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobl9zcCA9PT0gMilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYNCf0LDRgNCwIOKEliR7bn1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGDQo9GH0LDRgdGC0L3QuNC6IOKEliR7bn1gXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IGDQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWJHtufWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xuICAgICAgICAgICAgICAgIFwiYmFzZV9uYW1lXCI6IFwi0KDQvtGB0KTQkNCg0KBcIixcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INGBINCw0LrRgNC+0LHQsNGC0LjQutC+0LlcIixcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgXCJqdWRnZV9yb2xlc1wiOiB7XG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60LhcIixcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCLQodGD0LTRjNGPINGC0LDQvdGG0LBcIixcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRj1wiLFxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBwYXRoKSB7XG4gICAgICAgIHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXTtcbiAgICAgICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgJHtzcmN9YCk7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gcGhyYXNlX3B0ciguLi5hcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XG59XG5cbnRyYW5zbGF0ZS50b3VyX25hbWVfc3VnZ2VzdGlvbnMgPSBbXG4gICAgXCLQpNC40L3QsNC7XCIsXG4gICAgXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcbiAgICBcIjEvMiDRhNC40L3QsNC70LBcIixcbiAgICBcIjEvNCDRhNC40L3QsNC70LBcIixcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcbiAgICBcIjEvMTYg0YTQuNC90LDQu9CwXCIsXG4gICAgXCLQpNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXG5dO1xuIiwiY29uc3QgbWV0YSA9IHtcbiAgICBcImp1ZGdlX3JvbGVzXCI6IFtcbiAgICAgICAgXCJkYW5jZV9qdWRnZVwiLFxuICAgICAgICBcImFjcm9fanVkZ2VcIixcbiAgICAgICAgXCJoZWFkX2p1ZGdlXCIsXG4gICAgICAgIFwidGVjaF9qdWRnZVwiLFxuICAgIF0sXG4gICAgXCJzY29yaW5nX3N5c3RlbXNcIjogW1xuICAgICAgICBcInJvc2ZhcnIubm9fYWNyb1wiLFxuICAgICAgICBcInJvc2ZhcnIuYWNyb1wiLFxuICAgICAgICBcInJvc2ZhcnIuZm9ybWF0aW9uXCIsXG4gICAgICAgIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiLFxuICAgICAgICBcInJvc2ZhcnIuc2ltcGxpZmllZFwiLFxuICAgICAgICBcInJvc2ZhcnIuYW1fZmluYWxfZndcIixcbiAgICAgICAgXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIixcbiAgICBdLFxuICAgIFwic3VnZ2VzdGVkX3Byb2dyYW1zXCI6IFtcbiAgICAgICAgXCJkZWZhdWx0XCIsXG4gICAgICAgIFwicXVhbGlmaWNhdGlvblwiLFxuICAgICAgICBcInF1YXJ0ZXJmaW5hbFwiLFxuICAgICAgICBcImZpbmFsXCIsXG4gICAgXSxcblxufVxuXG5leHBvcnQgZGVmYXVsdCBtZXRhO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuaW1wb3J0IFJlc3VsdHNUYWJsZTEgZnJvbSBcIlJlc3VsdHNUYWJsZTFcIjtcclxuaW1wb3J0IFJlc3VsdHNUYWJsZTIgZnJvbSBcIlJlc3VsdHNUYWJsZTJcIjtcclxuaW1wb3J0IFJlc3VsdHNUYWJsZTMgZnJvbSBcIlJlc3VsdHNUYWJsZTNcIjtcclxuaW1wb3J0IERpc2NpcGxpbmVSZXN1bHRzVGFibGUgZnJvbSBcIkRpc2NpcGxpbmVSZXN1bHRzVGFibGVcIjtcclxuaW1wb3J0IEp1ZGdlVGFibGV0IGZyb20gXCJKdWRnZVRhYmxldFwiO1xyXG5pbXBvcnQgQWRtaW5TY29yZUlucHV0IGZyb20gXCJBZG1pblNjb3JlSW5wdXRcIjtcclxuaW1wb3J0IGdldEp1ZGdlVGFibGVNYXJrIGZyb20gXCJnZXRKdWRnZVRhYmxlTWFya1wiO1xyXG5pbXBvcnQgbWV0YSBmcm9tIFwibWV0YVwiO1xyXG5cclxuaW1wb3J0IHsgc2V0dXAgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcclxuXHJcbmNvbnN0IHJlc3BvbnNlID0gd2luZG93LnJlZ2lzdGVyUnVsZXNTZXQoXCJSb3NGQVJSXCIsIHtcclxuICAgIG1ldGE6IG1ldGEsXHJcbiAgICB0cmFuc2xhdGU6IF8sXHJcbiAgICB0b3VyX3Jlc3VsdHNfdGFibGVfMTogUmVzdWx0c1RhYmxlMSxcclxuICAgIHRvdXJfcmVzdWx0c190YWJsZV8yOiBSZXN1bHRzVGFibGUyLFxyXG4gICAgdG91cl9yZXN1bHRzX3RhYmxlXzM6IFJlc3VsdHNUYWJsZTMsXHJcbiAgICBkaXNjaXBsaW5lX3Jlc3VsdHNfdGFibGU6IERpc2NpcGxpbmVSZXN1bHRzVGFibGUsXHJcbiAgICBqdWRnZV90YWJsZXQ6IEp1ZGdlVGFibGV0LFxyXG4gICAgYWRtaW5fc2NvcmVfaW5wdXQ6IEFkbWluU2NvcmVJbnB1dCxcclxuICAgIGdldF9qdWRnZV90YWJsZV9tYXJrOiBnZXRKdWRnZVRhYmxlTWFyayxcclxufSk7XHJcblxyXG5zZXR1cChyZXNwb25zZSk7XHJcbiJdfQ==
