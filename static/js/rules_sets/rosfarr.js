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

},{"l10n":102}],3:[function(require,module,exports){
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

},{"l10n":102}],13:[function(require,module,exports){
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

},{"./Item":17,"l10n":102}],19:[function(require,module,exports){
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

},{"./AcroScore":11,"./ConfirmationButton":12,"./DanceHalvedScore":13,"./DanceScore":14,"./FormationAcroScore":15,"./FormationScore":16,"./HeadJudgeFormationScore":19,"./HeadJudgeScore":20,"./SimplifiedScore":21,"./TechJudgeFormationScore":22,"./TechJudgeScore":23,"common/getScoringType":100}],26:[function(require,module,exports){
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

},{"l10n":102}],28:[function(require,module,exports){
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

},{"JudgeTablet/GeneralScale":56,"l10n":102}],30:[function(require,module,exports){
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

},{"l10n":102,"tablet_ui/IntegerInput":4}],32:[function(require,module,exports){
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

},{"common/makeClassName":3,"l10n":102,"tablet_ui/Slider":8}],35:[function(require,module,exports){
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

},{"l10n":102,"tablet_ui/IntegerInput":4}],36:[function(require,module,exports){
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

},{"./Mistakes":35,"./ScorePart":36,"JudgeTablet/TotalScore":82,"l10n":102}],38:[function(require,module,exports){
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
},{"dup":35,"l10n":102,"tablet_ui/IntegerInput":4}],40:[function(require,module,exports){
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

},{"./Mistakes":39,"./ScorePart":40,"JudgeTablet/TotalScore":82,"l10n":102}],42:[function(require,module,exports){
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

},{"l10n":102,"tablet_ui/IntegerInput":4}],47:[function(require,module,exports){
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

},{"./Mistakes":46,"./ScorePart":47,"JudgeTablet/TotalScore":82,"l10n":102}],49:[function(require,module,exports){
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

},{"l10n":102,"tablet_ui/IntegerInput":4}],51:[function(require,module,exports){
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

},{"./Mistakes":50,"./ScorePart":51,"JudgeTablet/TotalScore":82,"l10n":102}],53:[function(require,module,exports){
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

},{"JudgeTablet/ConfirmationButton":34,"common/CacheMixin":98,"l10n":102}],55:[function(require,module,exports){
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

},{"./Participant":54,"JudgeTablet/Grid":57,"JudgeTablet/Header":71,"common/CacheMixin":98}],56:[function(require,module,exports){
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

},{"common/CacheMixin":98}],58:[function(require,module,exports){
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

},{"HostModules":28,"common/dialogs/closeDialog":1,"common/dialogs/showConfirm":2,"l10n":102,"tablet_ui/onTouchOrClick":10}],59:[function(require,module,exports){
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

},{"l10n":102}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (LineJudgeScore.__proto__ || Object.getPrototypeOf(LineJudgeScore)).apply(this, arguments));
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

},{"./Item":60,"common/CacheMixin":98,"l10n":102}],62:[function(require,module,exports){
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

},{"HostModules":28,"l10n":102,"tablet_ui/onTouchEndOrClick":9}],63:[function(require,module,exports){
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

},{"l10n":102,"tablet_ui/SelectorInput":7}],64:[function(require,module,exports){
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

},{"l10n":102}],65:[function(require,module,exports){
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

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
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
                this.props.score ? this.props.score.data.total_score.toFixed() : "—"
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                score: PT.shape({
                    confirmed: PT.bool.isRequired,
                    data: PT.shape({
                        total_score: PT.number.isRequired
                    }).isRequired
                })
            };
        }
    }]);

    return Item;
}(React.Component);

exports.default = Item;


Item.displayName = "rules_sets_rosfarr_JudgeTablet_HeadJudgeLayout_HeatsPage_ScoringLayout_TechJudgesScores_Item";

},{"common/makeClassName":3}],66:[function(require,module,exports){
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

    function TechJudgeScore() {
        _classCallCheck(this, TechJudgeScore);

        return _possibleConstructorReturn(this, (TechJudgeScore.__proto__ || Object.getPrototypeOf(TechJudgeScore)).apply(this, arguments));
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

            return this.scores.map(function (score) {
                var dj = _this3.tech_judges_index.get(score.discipline_judge_id);
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
                            { className: "scores" },
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

},{"./Item":65,"common/CacheMixin":98,"l10n":102}],67:[function(require,module,exports){
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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScoringLayout.__proto__ || Object.getPrototypeOf(ScoringLayout)).call.apply(_ref, [this].concat(args))), _this), _this.onScoreUpdate = function (key, value) {
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

},{"./AcrobaticOverrides":59,"./LineJudgesScores":61,"./NotPerformedSwitch":62,"./PenaltyInput":63,"./PreviousPenalties":64,"./TechJudgesScores":66,"common/CacheMixin":98,"l10n":102}],68:[function(require,module,exports){
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

},{"./ScoringLayout":67,"JudgeTablet/Grid":57,"common/CacheMixin":98}],69:[function(require,module,exports){
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

},{"./ActionsPage":58,"./HeatsPage":68,"./ResultsPage":69,"JudgeTablet/Footer":45,"JudgeTablet/Footer/FooterItem":44,"JudgeTablet/Header":71,"l10n":102}],71:[function(require,module,exports){
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

},{"l10n":102,"tablet_ui/onTouchEndOrClick":9}],72:[function(require,module,exports){
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

},{"JudgeTablet/GeneralScale":56,"l10n":102}],73:[function(require,module,exports){
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

},{"./Element":74,"HostModules":28,"JudgeTablet/ConfirmationButton":34,"common/CacheMixin":98,"l10n":102}],77:[function(require,module,exports){
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

},{"./StopWatch":79,"JudgeTablet/ConfirmationButton":34,"JudgeTablet/HeadJudgeLayout/HeatsPage/ScoringLayout/PreviousPenalties":64,"common/CacheMixin":98,"l10n":102,"tablet_ui/IntegerInput":4,"tablet_ui/SelectorInput":7}],79:[function(require,module,exports){
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

},{"common/makeClassName":3,"l10n":102,"tablet_ui/onTouchOrClick":10}],80:[function(require,module,exports){
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

},{"./AcroPage":77,"./DancingPage":80,"JudgeTablet/Footer":45,"JudgeTablet/Footer/FooterItem":44,"JudgeTablet/Header":71,"common/CacheMixin":98,"l10n":102}],82:[function(require,module,exports){
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

},{"l10n":102}],83:[function(require,module,exports){
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

},{"./AcrobaticsLayout":33,"./DanceHalvedLayout":38,"./DanceLayout":42,"./FormationAcroLayout":49,"./FormationLayout":53,"./HeadJudgeLayout":70,"./SimplifiedLayout":73,"./TechJudgeLayout":81,"HostModules":28,"common/getScoringType":100}],84:[function(require,module,exports){
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

},{"common/getParticipantDisplay":99}],85:[function(require,module,exports){
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

},{"./Row":84,"l10n":102}],86:[function(require,module,exports){
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

},{"common/getParticipantDisplay":99,"l10n":102}],88:[function(require,module,exports){
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

},{"./ColumnsWidths":86,"./Row":87,"getJudgeTableMark":101,"l10n":102}],89:[function(require,module,exports){
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

},{"./formatScore":95,"l10n":102}],91:[function(require,module,exports){
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

},{"./formatScore":95,"l10n":102}],92:[function(require,module,exports){
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

},{"./formatScore":95,"l10n":102}],93:[function(require,module,exports){
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

},{"./formatScore":95,"l10n":102}],94:[function(require,module,exports){
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

},{"common/getParticipantDisplay":99,"l10n":102}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "renderScore",
        value: function renderScore(discipline_judge, score) {
            if (!this.props.row.run.performed) {
                return React.createElement(
                    "p",
                    { className: "text-center" },
                    "\u2014"
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

},{"./AcroScore":90,"./DanceScore":91,"./FormationAcroScore":92,"./FormationScore":93,"./InfoCell":94,"common/getScoringType":100}],97:[function(require,module,exports){
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

},{"./ColumnsWidths":89,"./Row":96,"getJudgeTableMark":101,"l10n":102}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ru = require("./ru");

var _ru2 = _interopRequireDefault(_ru);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _ru2.default;

exports.default = _;

},{"./ru":103}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"AdminScoreInput":26,"DisciplineResultsTable":27,"HostModules":28,"JudgeTablet":83,"ResultsTable1":85,"ResultsTable2":88,"ResultsTable3":97,"getJudgeTableMark":101,"l10n":102,"meta":104}]},{},[105])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcbGliXFxjb21tb25cXGRpYWxvZ3NcXGNsb3NlRGlhbG9nLmpzeCIsInNyY1xcanN4XFxsaWJcXGNvbW1vblxcZGlhbG9nc1xcc2hvd0NvbmZpcm0uanN4Iiwic3JjXFxqc3hcXGxpYlxcY29tbW9uXFxtYWtlQ2xhc3NOYW1lLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcSW50ZWdlcklucHV0LmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcTnVtYmVyU2VsZWN0b3JJbnB1dC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXFNlbGVjdG9ySW5wdXRcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxTZWxlY3RvcklucHV0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXFNsaWRlci5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXG9uVG91Y2hFbmRPckNsaWNrLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcb25Ub3VjaE9yQ2xpY2suanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxBY3JvU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxDb25maXJtYXRpb25CdXR0b24uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxEYW5jZUhhbHZlZFNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcRGFuY2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEZvcm1hdGlvbkFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcR2VuZXJhbEVkaXRvclxcSXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEdlbmVyYWxFZGl0b3JcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxIZWFkSnVkZ2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXFNpbXBsaWZpZWRTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXFRlY2hKdWRnZUZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcVGVjaEp1ZGdlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxnZW5TY2FsZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxIb3N0TW9kdWxlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXEVsZW1lbnRzXFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcRWxlbWVudHNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcTWlzdGFrZXMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQ29uZmlybWF0aW9uQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxTY29yZVBhcnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUxheW91dFxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUxheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb290ZXJcXEJ1dHRvbi5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcRm9vdGVySXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25BY3JvTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkxheW91dFxcU2NvcmluZ0xheW91dFxcU2NvcmVQYXJ0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdlbmVyYWxMYXlvdXRcXFBhcnRpY2lwYW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcR2VuZXJhbExheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHZW5lcmFsU2NhbGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHcmlkLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxBY3Rpb25zUGFnZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxBY3JvYmF0aWNPdmVycmlkZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXExpbmVKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTGluZUp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTm90UGVyZm9ybWVkU3dpdGNoXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxQZW5hbHR5SW5wdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcUHJldmlvdXNQZW5hbHRpZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXFRlY2hKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcVGVjaEp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXFJlc3VsdHNQYWdlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRlci5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFNpbXBsaWZpZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxTY29yaW5nTGF5b3V0XFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcU2NvcmluZ0xheW91dFxcT3ZlcnJpZGVJbnB1dC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcQWNyb1BhZ2VcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxTY29yaW5nTGF5b3V0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxEYW5jaW5nUGFnZVxcU3RvcFdhdGNoLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxEYW5jaW5nUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVG90YWxTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUxXFxSb3cuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTFcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUyXFxDb2x1bW5zV2lkdGhzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUyXFxSb3cuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTJcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxDb2x1bW5zV2lkdGhzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxEYW5jZVNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEZvcm1hdGlvbkFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxGb3JtYXRpb25TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxJbmZvQ2VsbC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxmb3JtYXRTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcQ2FjaGVNaXhpbi5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxnZXRQYXJ0aWNpcGFudERpc3BsYXkuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcZ2V0U2NvcmluZ1R5cGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGdldEp1ZGdlVGFibGVNYXJrLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxsMTBuXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcbDEwblxccnUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXG1ldGEuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXHJvb3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLFc7QUFBVCxTQUFTLFdBQVQsR0FBdUI7QUFDbEMsU0FBSyxLQUFMO0FBQ0g7Ozs7Ozs7O2tCQ0F1QixXOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCLE1BQTlCLEVBQThEO0FBQUEsUUFBeEIsZ0JBQXdCLHVFQUFQLEtBQU87O0FBQ3pFLFdBQU8sS0FBSztBQUNSLGVBQU8sT0FEQztBQUVSLG1CQUFXLEtBRkg7QUFHUiwwQkFBa0IsSUFIVjtBQUlSLDJCQUFtQixvQkFBRSxtQkFBRixDQUpYO0FBS1IsMEJBQWtCLG9CQUFFLGtCQUFGLENBTFY7QUFNUix3QkFBZ0I7QUFOUixLQUFMLEVBT0osTUFQSSxDQUFQO0FBUUg7Ozs7Ozs7O2tCQ1h1QixhO0FBQVQsU0FBUyxhQUFULENBQXVCLElBQXZCLEVBQTZCO0FBQ3hDLFdBQU8sT0FBTyxJQUFQLENBQVksSUFBWixFQUNG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Z0Q7QUFFaEQsNkJBRmdEO0FBR2hELGdEQUhnRDtBQUloRCxnREFKZ0Q7QUFLaEQsZ0RBTGdEO0FBTWhELDhEQU5nRDtBQU9oRCx1Q0FQZ0Q7QUFRaEQsZ0RBUmdEO0FBU2hEO0FBVGdELENBQW5DLENBQWpCOztBQVlBLHdCQUFNLFFBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvc2VEaWFsb2coKSB7XG4gICAgc3dhbC5jbG9zZSgpO1xufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XG4gICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxuICAgIH0sIGFjdGlvbik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlQ2xhc3NOYW1lKGRhdGEpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgICAgLmZpbHRlcihjbiA9PiBkYXRhW2NuXSlcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xufVxuIiwiaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5cbmltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwiLi9vblRvdWNoT3JDbGlja1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUFQuYm9vbCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgc2VuZERlbHRhczogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNaW51cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHtcImRlbHRhXCI6IC0xfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMudmFsdWUgLSAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVQbHVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2Uoe1wiZGVsdGFcIjogMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLnZhbHVlICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xuICAgICAgICAgICAgXCJJbnRlZ2VySW5wdXRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwicmVhZC1vbmx5XCI6IHRoaXMucHJvcHMucmVhZE9ubHksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZU1pbnVzKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVQbHVzKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuSW50ZWdlcklucHV0LmRpc3BsYXlOYW1lID0gXCJ0YWJsZXRfdWlfSW50ZWdlcklucHV0XCI7XG4iLCJpbXBvcnQgU2VsZWN0b3JJbnB1dCBmcm9tIFwiLi9TZWxlY3RvcklucHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlclNlbGVjdG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1heDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtaW46IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc3RlcDogUFQubnVtYmVyLFxuICAgICAgICAgICAgZGVjaW1hbFNpemU6IFBULm51bWJlcixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgZGVjaW1hbFNpemU6IDAsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbWFrZUNob2ljZXMobWluLCBtYXgsIHN0ZXAsIGRlY2ltYWxfc2l6ZSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IHZhbHVlID0gbWluOyB2YWx1ZSA8PSBtYXg7IHZhbHVlICs9IHN0ZXApIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSB2YWx1ZS50b0ZpeGVkKGRlY2ltYWxfc2l6ZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChbTnVtYmVyKHRleHQpLCB0ZXh0XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHN0ZXAsIGRlY2ltYWxTaXplLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMubWFrZUNob2ljZXMobWluLCBtYXgsIHN0ZXAsIGRlY2ltYWxTaXplKSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5OdW1iZXJTZWxlY3RvcklucHV0LmRpc3BsYXlOYW1lID0gXCJ0YWJsZXRfdWlfTnVtYmVyU2VsZWN0b3JJbnB1dFwiO1xuIiwiaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCIuLi9vblRvdWNoT3JDbGlja1wiO1xuXG5pbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aXZlOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdGV4dDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUFQub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XG4gICAgICAgICAgICBcInRidG5cIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic2NvcmUtYnRuXCI6IHRydWUsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0aGlzLnByb3BzLmFjdGl2ZSxcbiAgICAgICAgICAgIFwicmVhZC1vbmx5XCI6IHRoaXMucHJvcHMucmVhZE9ubHksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5nZXRDbGFzc05hbWUoKSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZUNsaWNrKSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRleHQgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5JdGVtLmRpc3BsYXlOYW1lID0gXCJ0YWJsZXRfdWlfU2VsZWN0b3JJbnB1dF9JdGVtXCI7XG4iLCJpbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcblxuaW1wb3J0IEl0ZW0gZnJvbSBcIi4vSXRlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjaG9pY2VzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgIFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgIFBULm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wsXG4gICAgICAgICAgICByb3dTaXplOiBQVC5udW1iZXIsXG4gICAgICAgICAgICBzdHlsZTogUFQub25lT2YoW1wiZ3JpZFwiLCBcIm9uZS1saW5lXCIsIFwidHdvLWxpbmVzXCJdKSxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgIFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICByb3dTaXplOiAxMCxcbiAgICAgICAgICAgIHN0eWxlOiBcIm9uZS1saW5lXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0QnV0dG9uc0NvdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvd1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hvaWNlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XG4gICAgICAgICAgICBcIlNlbGVjdG9ySW5wdXRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwib25lLXJvd1wiOiB0aGlzLnByb3BzLnN0eWxlICE9PSBcInR3by1saW5lc1wiLFxuICAgICAgICAgICAgXCJ0d28tcm93c1wiOiB0aGlzLnByb3BzLnN0eWxlID09PSBcInR3by1saW5lc1wiLFxuICAgICAgICAgICAgXCJzZWxlY3RlZFwiOiB0aGlzLnByb3BzLnZhbHVlICE9PSBudWxsLFxuICAgICAgICAgICAgW2BuLSR7dGhpcy5nZXRCdXR0b25zQ291bnQoKX1gXTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIiAmJlxuICAgICAgICAgICAgICAgIGlkeCAhPT0gMCAmJlxuICAgICAgICAgICAgICAgIGlkeCAlIHRoaXMucHJvcHMucm93U2l6ZSA9PT0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDxiciBrZXk9eyBgYnIke2lkeH1gIH0gLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgW3ZhbHVlLCB0ZXh0XSA9IHRoaXMucHJvcHMuY2hvaWNlc1tpZHhdO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlPXsgdmFsdWUgPT09IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBpZHggfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0PXsgdGV4dCB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5wcm9wcy5vbkNoYW5nZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNlbGVjdG9ySW5wdXQuZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9TZWxlY3RvcklucHV0XCI7XG4iLCJpbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgIGNsYXNzIFNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgZG9uZVRleHQ6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2xpZGVUZXh0OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5waW4gPSBudWxsO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kb25lICYmIG5leHRQcm9wcy5kb25lKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRnJlZSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLnRvdWNoICYmICF0aGlzLnByb3BzLmRvbmUgJiYgIXRoaXMuc3RhdGUuZmluaXNoZWQ7XG4gICAgfVxuXG4gICAgZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KDEwMCAtIHRoaXMuc3RhdGUucG9zaXRpb24sIDApLCAxMDApO1xuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xuICAgIH1cbiAgICBnZXRFbGVtZW50T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXMgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGdldFRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFNsaWRlclBvcyhldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIDIwMCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXNpb246IDIwMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgfVxuICAgIGhhbmRsZVRvdWNoU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waW4gPSB0aGlzLmdldFJlbGF0aXZlVG91Y2goZXZlbnQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgICAgICB0b3VjaDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZVRvdWNoTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVUb3VjaEVuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wb3NpdGlvbiA9PT0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiZG9uZS10ZXh0XCIgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHsgY29sb3I6IFwicmdiKDEwMCwxMDAsMTAwKVwiIH0gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBtYWtlQ2xhc3NOYW1lKHsgXCJzbGlkZS10ZXh0XCIgOiB0cnVlLCBcImZyZWVcIjogdGhpcy5pc0ZyZWUoKSB9KSB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXsgeyBjb2xvcjogYHJnYmEoMTAwLDEwMCwxMDAsJHt0aGlzLmdldE91dGVyVGV4dE9wYWNpdHkoKX0pYCB9IH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zbGlkZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTbGlkZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IG1ha2VDbGFzc05hbWUoeyBcImlubmVyXCI6IHRydWUsIFwiZnJlZVwiOiB0aGlzLmlzRnJlZSgpIH0pIH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7IGxlZnQ6ICh0aGlzLnByb3BzLmRvbmUgfHwgdGhpcy5zdGF0ZS5maW5pc2hlZCkgPyBcIjIwMHB4XCIgOiBgJHt0aGlzLnN0YXRlLnBvc2l0aW9ufXB4YCB9IH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlQ2xpY2sgfVxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5oYW5kbGVUb3VjaEVuZCB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5oYW5kbGVUb3VjaE1vdmUgfVxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLmhhbmRsZVRvdWNoU3RhcnQgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4oaSXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRleHQoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNsaWRlci5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX1NsaWRlclwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25Ub3VjaEVuZE9yQ2xpY2soaGFuZGxlcikge1xuICAgIGxldCBfaGFuZGxlciA9ICgpID0+IHt9O1xuICAgIGxldCBkaXN0YW5jZSA9IDA7XG4gICAgbGV0IGxhdGVzdF9wb3MgPSBbMCwgMF07XG4gICAgbGV0IGZpcmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyKCk7XG4gICAgfVxuICAgIGxldCBkaXNjYXJkID0gKCkgPT4ge1xuICAgICAgICBfaGFuZGxlciA9ICgpID0+IHt9O1xuICAgIH1cbiAgICBsZXQgbW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XG4gICAgICAgIGxldCBzcXIgPSAoeCkgPT4geCAqIHg7XG4gICAgICAgIGRpc3RhbmNlICs9IE1hdGguc3FydChzcXIoY3VycmVudF9wb3NbMF0gLSBsYXRlc3RfcG9zWzBdKSArIHNxcihjdXJyZW50X3Bvc1sxXSAtIGxhdGVzdF9wb3NbMV0pKTtcbiAgICAgICAgbGF0ZXN0X3BvcyA9IGN1cnJlbnRfcG9zO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPiAyMCkge1xuICAgICAgICAgICAgZGlzY2FyZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBfaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIGRpc3RhbmNlID0gMDtcbiAgICAgICAgbGF0ZXN0X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBzdGFydCxcbiAgICAgICAgb25Ub3VjaEVuZDogZmlyZSxcbiAgICAgICAgb25Ub3VjaE1vdmU6IG1vdmUsXG4gICAgICAgIG9uVG91Y2hDYW5jZWw6IGRpc2NhcmQsXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZXIsXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25Ub3VjaE9yQ2xpY2soaGFuZGxlcikge1xuICAgIGxldCBmID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBoYW5kbGVyKGV2ZW50KTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogZixcbiAgICAgICAgb25DbGljazogZixcbiAgICB9XG59XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZHVjdGlvbnM6IFBULmFycmF5T2YoUFQubnVtYmVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIGxldCByZWR1Y3Rpb25zID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMuc2xpY2UoKTsgLy8gY2xvbmVcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICAgICAgICAgIGlmIChrZXlbMF0gPT09IFwiQVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc192YWwgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgcmVkdWN0aW9uc1twYXJzZUludChrZXkuc2xpY2UoMSkpXSA9IHNfdmFsID09PSBcIlwiID8gLTEgOiBwYXJzZUludChzX3ZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICByZWR1Y3Rpb25zOiByZWR1Y3Rpb25zLFxuICAgICAgICAgICAgbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5taXN0YWtlcyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBmaWVsZHMgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoKHJlZCwgaWR4KSA9PiAoe1xuICAgICAgICAgICAga2V5OiBgQSR7aWR4fWAsXG4gICAgICAgICAgICBsYWJlbDogYEEke2lkeCArIDF9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIiksXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zW2lkeF0gPT09IG51bGxcbiAgICAgICAgICAgICAgICA/IFwiXCJcbiAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zW2lkeF0udG9TdHJpbmcoKSxcbiAgICAgICAgfSkpO1xuICAgICAgICBmaWVsZHMucHVzaCh0aGlzLm1ha2VGaWVsZChcIm1pc3Rha2VzXCIsIFwiRkRcIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsIHsgbWF4OiAxMDAgfSkpKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBmaWVsZHMgfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EYW5jZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9EYW5jZVNjb3JlXCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtYXRpb25CdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbmZpcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25Db25maXJtYXRpb25Ub2dnbGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJjb25maXJtYXRpb24tYnV0dG9uXCI7XG4gICAgICAgIHJlc3VsdCArPSB0aGlzLnByb3BzLmNvbmZpcm1lZCA/IFwiIGNvbmZpcm1lZFwiIDogXCIgbm90LWNvbmZpcm1lZFwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5nZXRDbGFzc05hbWUoKSB9XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMucHJvcHMub25Db25maXJtYXRpb25Ub2dnbGUgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jb25maXJtZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfKFwiYWRtaW4uYnV0dG9ucy51bmNvbmZpcm1fc2NvcmVcIilcbiAgICAgICAgICAgICAgICAgICAgOiBfKFwiYWRtaW4uYnV0dG9ucy5jb25maXJtX3Njb3JlXCIpIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ29uZmlybWF0aW9uQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9Db25maXJtYXRpb25CdXR0b25cIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNlSGFsdmVkU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZndfd29tYW46ICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X21hbjogICAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRpb246ICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgZndfd29tYW46ICAgICAgIGRhdGFbXCJmd193b21hblwiXSAgICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZndfd29tYW4pLFxuICAgICAgICAgICAgZndfbWFuOiAgICAgICAgIGRhdGFbXCJmd19tYW5cIl0gICAgICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZndfbWFuKSxcbiAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBkYXRhW1wiZGFuY2VfZmlnc1wiXSAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmRhbmNlX2ZpZ3MpLFxuICAgICAgICAgICAgY29tcG9zaXRpb246ICAgIGRhdGFbXCJjb21wb3NpdGlvblwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuY29tcG9zaXRpb24pLFxuICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IHBhcnNlSW50KGRhdGEuc21hbGxfbWlzdGFrZXMpLFxuICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEuYmlnX21pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZndfd29tYW5cIiwgICAgICAgXCJGV1wiLCBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIikpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImZ3X21hblwiLCAgICAgICAgIFwiRk1cIiwgZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV9maWdzXCIsICAgICBcIkRGXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEyLjUsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiY29tcG9zaXRpb25cIiwgICAgXCJDXCIsICBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgICBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInNtYWxsX21pc3Rha2VzXCIsIFwiU01cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJiaWdfbWlzdGFrZXNcIiwgICBcIkJNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRhbmNlSGFsdmVkU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0RhbmNlSGFsdmVkU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZndfd29tYW46ICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X21hbjogICAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRpb246ICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgZndfd29tYW46ICAgICAgIGRhdGFbXCJmd193b21hblwiXSAgICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLmZ3X3dvbWFuKSxcbiAgICAgICAgICAgIGZ3X21hbjogICAgICAgICBkYXRhW1wiZndfbWFuXCJdICAgICAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5md19tYW4pLFxuICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIGRhdGFbXCJkYW5jZV9maWdzXCJdICA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLmRhbmNlX2ZpZ3MpLFxuICAgICAgICAgICAgY29tcG9zaXRpb246ICAgIGRhdGFbXCJjb21wb3NpdGlvblwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLmNvbXBvc2l0aW9uKSxcbiAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBwYXJzZUludChkYXRhLnNtYWxsX21pc3Rha2VzKSxcbiAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBwYXJzZUludChkYXRhLmJpZ19taXN0YWtlcyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImZ3X3dvbWFuXCIsICAgICAgIFwiRldcIiwgZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJmd19tYW5cIiwgICAgICAgICBcIkZNXCIsIGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfZmlnc1wiLCAgICAgXCJERlwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAyNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiY29tcG9zaXRpb25cIiwgICAgXCJDXCIsICBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAyMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwic21hbGxfbWlzdGFrZXNcIiwgXCJTTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImJpZ19taXN0YWtlc1wiLCAgIFwiQk1cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfRGFuY2VTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybWF0aW9uU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNyb2JhdGljczogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wcmVzc2lvbjogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBhY3JvYmF0aWNzOiAgICAgZGF0YVtcImFjcm9iYXRpY3NcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmFjcm9iYXRpY3MpLFxuICAgICAgICAgICAgZGFuY2VfdGVjaDogICAgIGRhdGFbXCJkYW5jZV90ZWNoXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV90ZWNoKSxcbiAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBkYXRhW1wiZGFuY2VfZmlnc1wiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfZmlncyksXG4gICAgICAgICAgICBpbXByZXNzaW9uOiAgICAgZGF0YVtcImltcHJlc3Npb25cIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmltcHJlc3Npb24pLFxuICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEuYmlnX21pc3Rha2VzKSxcbiAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBwYXJzZUludChkYXRhLnNtYWxsX21pc3Rha2VzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiYWNyb2JhdGljc1wiLCAgICAgXCJBXCIsICBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV90ZWNoXCIsICAgICBcIkRUXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX2ZpZ3NcIiwgICAgIFwiREZcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiaW1wcmVzc2lvblwiLCAgICAgXCJJXCIsICBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJzbWFsbF9taXN0YWtlc1wiLCBcIlNNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiYmlnX21pc3Rha2VzXCIsICAgXCJCTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Gb3JtYXRpb25TY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfRm9ybWF0aW9uU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdGlvblNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgZGFuY2VfdGVjaDogZGF0YVtcImRhbmNlX3RlY2hcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmRhbmNlX3RlY2gpLFxuICAgICAgICAgICAgZGFuY2VfZmlnczogZGF0YVtcImRhbmNlX2ZpZ3NcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmRhbmNlX2ZpZ3MpLFxuICAgICAgICAgICAgaW1wcmVzc2lvbjogZGF0YVtcImltcHJlc3Npb25cIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmltcHJlc3Npb24pLFxuICAgICAgICAgICAgbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5zbWFsbF9taXN0YWtlcyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX3RlY2hcIiwgXCJEVFwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV9maWdzXCIsIFwiREZcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiaW1wcmVzc2lvblwiLCBcIklcIiwgIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcIm1pc3Rha2VzXCIsICAgXCJNXCIsICBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Gb3JtYXRpb25TY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfRm9ybWF0aW9uU2NvcmVcIjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpZWxkOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGtleTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgUFQuYXJyYXlPZihQVC5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLmZpZWxkLmtleSwgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY29yZS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWQtb25seVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmZpZWxkLm9wdGlvbnMuZmluZChvID0+IG9bMF0gPT09IHRoaXMucHJvcHMudmFsdWUpWzFdIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjb3JlLXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5maWVsZC5vcHRpb25zLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3ZhbHVlLCBsYWJlbF0gPSBvcHRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXsgdmFsdWUgfSB2YWx1ZT17IHZhbHVlIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGFiZWwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NvcmUtbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmZpZWxkLmxhYmVsIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVmFsdWUoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkl0ZW0uZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0dlbmVyYWxFZGl0b3JfSXRlbVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IEl0ZW0gZnJvbSBcIi4vSXRlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWVsZHM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5hcnJheU9mKFBULnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgbGV0IGluaXRpYWxfdmFsdWVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiB0aGlzLnByb3BzLmZpZWxkcykge1xuICAgICAgICAgICAgaW5pdGlhbF92YWx1ZXNbZi5rZXldID0gZi5kZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlczogaW5pdGlhbF92YWx1ZXMsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUudmFsdWVzKTtcbiAgICAgICAgdmFsdWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlcyB9KTtcbiAgICB9XG4gICAgaGFuZGxlRGlzY2FyZENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnByb3BzLm9uRGlzY2FyZCgpO1xuICAgIH1cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQodGhpcy5zdGF0ZS52YWx1ZXMpO1xuICAgIH1cblxuICAgIHJlbmRlckJ1dHRvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVEaXNjYXJkQ2xpY2sgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5idXR0b25zLmNsb3NlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN1Ym1pdC1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5idXR0b25zLnN1Ym1pdFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkaXNjYXJkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVEaXNjYXJkQ2xpY2sgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmJ1dHRvbnMuZGlzY2FyZFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzY29yZS1lZGl0b3JcIlxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkc1wiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZmllbGRzLm1hcCgoZiwgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZD17IGYgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IGYua2V5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5zdGF0ZS52YWx1ZXNbZi5rZXldIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b25zKCkgfVxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuR2VuZXJhbEVkaXRvci5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfR2VuZXJhbEVkaXRvclwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRKdWRnZUZvcm1hdGlvblNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmFsdHk6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHR0b3VyOiBQVC5ib29sLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBwZW5hbHR5OiAgcGFyc2VJbnQoZGF0YS5wZW5hbHR5KSxcbiAgICAgICAgICAgIG5leHR0b3VyOiBkYXRhLm5leHR0b3VyID09PSBcInRydWVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwicGVuYWx0eVwiLCBcIlBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiXCIsIFwi4oCUXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiMFwiLCBcIk9LXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTVcIiwgXCItNVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0xNVwiLCBcIi0xNVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwibmV4dHRvdXJcIiwgXCJOVFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJmYWxzZVwiLCBcIk5vXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1widHJ1ZVwiLCAgXCJZZXNcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5IZWFkSnVkZ2VGb3JtYXRpb25TY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkSnVkZ2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5hbHR5OiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0dG91cjogUFQuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcGVuYWx0eTogIHBhcnNlSW50KGRhdGEucGVuYWx0eSksXG4gICAgICAgICAgICBuZXh0dG91cjogZGF0YS5uZXh0dG91ciA9PT0gXCJ0cnVlXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInBlbmFsdHlcIiwgXCJQXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIlwiLCBcIuKAlFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIjBcIiwgXCJPS1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0zXCIsIFwiLTNcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItMzBcIiwgXCItMzBcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItMTAwXCIsIFwiLTEwMFwiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwibmV4dHRvdXJcIiwgXCJOVFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJmYWxzZVwiLCBcIk5vXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1widHJ1ZVwiLCAgXCJZZXNcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5IZWFkSnVkZ2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfSGVhZEp1ZGdlU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsaWZpZWRTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcG9pbnRzOiBkYXRhW1wicG9pbnRzXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEucG9pbnRzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwicG9pbnRzXCIsIFwiU1wiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWluOiAxLCBtYXg6IDQwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2ltcGxpZmllZFNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9TaW1wbGlmaWVkU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlY2hGb3JtYXRpb25KdWRnZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1bXBfc3RlcHM6ICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmFsdHk6ICAgICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWluZ192aW9sYXRpb246IFBULmJvb2wsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBlbmFsdHk6ICAgICAgICAgIGRhdGEucGVuYWx0eSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLnBlbmFsdHkpLFxuICAgICAgICAgICAganVtcF9zdGVwczogICAgICAgcGFyc2VJbnQoZGF0YS5qdW1wX3N0ZXBzKSxcbiAgICAgICAgICAgIHRpbWluZ192aW9sYXRpb246IGRhdGEudGltaW5nX3Zpb2xhdGlvbiA9PT0gXCJcIiA/IG51bGwgOiBkYXRhLnRpbWluZ192aW9sYXRpb24gPT09IFwidHJ1ZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwZW5hbHR5XCIsIFwiUFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCIwXCIsIFwiT0tcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItNVwiLCBcIi01XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTE1XCIsIFwiLTE1XCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJqdW1wX3N0ZXBzXCIsIFwiSlNcIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInRpbWluZ192aW9sYXRpb25cIiwgXCJUXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIlwiLCAgICAgIFwiP1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcImZhbHNlXCIsIFwi4pyTXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1widHJ1ZVwiLCAgXCLinJdcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblRlY2hGb3JtYXRpb25KdWRnZVNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9UZWNoRm9ybWF0aW9uSnVkZ2VTY29yZVwiO1xuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVjaEp1ZGdlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAganVtcF9zdGVwczogICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogICAgICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltaW5nX3Zpb2xhdGlvbjogUFQuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcGVuYWx0eTogICAgICAgICAgZGF0YS5wZW5hbHR5ID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEucGVuYWx0eSksXG4gICAgICAgICAgICBqdW1wX3N0ZXBzOiAgICAgICBwYXJzZUludChkYXRhLmp1bXBfc3RlcHMpLFxuICAgICAgICAgICAgdGltaW5nX3Zpb2xhdGlvbjogZGF0YS50aW1pbmdfdmlvbGF0aW9uID09PSBcIlwiID8gbnVsbCA6IGRhdGEudGltaW5nX3Zpb2xhdGlvbiA9PT0gXCJ0cnVlXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInBlbmFsdHlcIiwgXCJQXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIjBcIiwgXCJPS1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0zXCIsIFwiLTNcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItMzBcIiwgXCItMzBcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItMTAwXCIsIFwiLTEwMFwiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwianVtcF9zdGVwc1wiLCBcIkpTXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJ0aW1pbmdfdmlvbGF0aW9uXCIsIFwiVFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJcIiwgICAgICBcIj9cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJmYWxzZVwiLCBcIuKck1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcInRydWVcIiwgIFwi4pyXXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5UZWNoSnVkZ2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfVGVjaEp1ZGdlU2NvcmVcIjtcbiIsImZ1bmN0aW9uIGdlblNjYWxlKHR5cGUsIHVzZXJfcGFyYW1zKSB7XG4gICAgY29uc3Qgb3B0aW9uYWwgPSB0eXBlWzBdID09PSBcIj9cIjtcbiAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgdHlwZSA9IHR5cGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicmVkdWN0aW9uXCI6XG4gICAgICAgIHJlc3VsdCA9IFsxMDAsIDc1LCA1MCwgMjUsIDEwLCA1LCAwXS5tYXAoXG4gICAgICAgICAgICBzID0+IFtzLnRvU3RyaW5nKCksIGAtJHtzfSVgXVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwibnVtYmVyc1wiOlxuICAgICAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICB9LCB1c2VyX3BhcmFtcyk7XG4gICAgICAgIGNvbnN0IGZyYWN0aW9uX3NpemUgPSBNYXRoLmFicyhwYXJhbXMuc3RlcCAtIE1hdGgucm91bmQocGFyYW1zLnN0ZXApKSA8IDFlLTUgPyAwIDogMTtcbiAgICAgICAgZm9yIChsZXQgc2NvcmUgPSBwYXJhbXMubWluOyBzY29yZSA8IChwYXJhbXMubWF4ICsgMWUtNSk7IHNjb3JlICs9IHBhcmFtcy5zdGVwKSB7XG4gICAgICAgICAgICBjb25zdCBzdHIgPSBzY29yZS50b0ZpeGVkKGZyYWN0aW9uX3NpemUpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW3N0ciwgc3RyXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93biBzY2FsZSB0eXBlOiAke3R5cGV9YCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICByZXN1bHQgPSBbW1wiXCIsIFwi4oCUXCJdXS5jb25jYXQocmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VuU2NhbGU7XG4iLCJpbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xuXG5pbXBvcnQgQ29uZmlybWF0aW9uQnV0dG9uIGZyb20gXCIuL0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuaW1wb3J0IEFjcm9TY29yZSBmcm9tIFwiLi9BY3JvU2NvcmVcIjtcbmltcG9ydCBEYW5jZVNjb3JlIGZyb20gXCIuL0RhbmNlU2NvcmVcIjtcbmltcG9ydCBEYW5jZUhhbHZlZFNjb3JlIGZyb20gXCIuL0RhbmNlSGFsdmVkU2NvcmVcIjtcbmltcG9ydCBGb3JtYXRpb25TY29yZSBmcm9tIFwiLi9Gb3JtYXRpb25TY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvbkFjcm9TY29yZSBmcm9tIFwiLi9Gb3JtYXRpb25BY3JvU2NvcmVcIjtcbmltcG9ydCBTaW1wbGlmaWVkU2NvcmUgZnJvbSBcIi4vU2ltcGxpZmllZFNjb3JlXCI7XG5pbXBvcnQgSGVhZEp1ZGdlU2NvcmUgZnJvbSBcIi4vSGVhZEp1ZGdlU2NvcmVcIjtcbmltcG9ydCBIZWFkSnVkZ2VGb3JtYXRpb25TY29yZSBmcm9tIFwiLi9IZWFkSnVkZ2VGb3JtYXRpb25TY29yZVwiO1xuaW1wb3J0IFRlY2hKdWRnZVNjb3JlIGZyb20gXCIuL1RlY2hKdWRnZVNjb3JlXCI7XG5pbXBvcnQgVGVjaEp1ZGdlRm9ybWF0aW9uU2NvcmUgZnJvbSBcIi4vVGVjaEp1ZGdlRm9ybWF0aW9uU2NvcmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNjb3JlOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXJCb2R5KHNjb3JpbmdfdHlwZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBzY29yaW5nX3R5cGUgPT09IFwiaGVhZFwiICYmXG4gICAgICAgICAgICBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPj0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNjb3JpbmdfdHlwZSA9IFwiaGVhZF9mb3JtYXRpb25cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBzY29yaW5nX3R5cGUgPT09IFwidGVjaFwiICYmXG4gICAgICAgICAgICBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPj0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNjb3JpbmdfdHlwZSA9IFwidGVjaF9mb3JtYXRpb25cIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY29yZV9wcm9wcyA9IHtcbiAgICAgICAgICAgIHNjb3JlOiAgICAgdGhpcy5wcm9wcy5zY29yZSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiAgdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgICAgICAgIG9uU3VibWl0OiAgdGhpcy5wcm9wcy5vblN1Ym1pdCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogdGhpcy5wcm9wcy5vbkRpc2NhcmQsXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxBY3JvU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZGFuY2VcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPERhbmNlU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZGFuY2VfaGFsdmVkXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxEYW5jZUhhbHZlZFNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Rm9ybWF0aW9uU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEZvcm1hdGlvbkFjcm9TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJzaW1wbGlmaWVkXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxTaW1wbGlmaWVkU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiaGVhZFwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SGVhZEp1ZGdlU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwiaGVhZF9mb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEhlYWRKdWRnZUZvcm1hdGlvblNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcInRlY2hcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRlY2hKdWRnZVNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcInRlY2hfZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUZWNoSnVkZ2VGb3JtYXRpb25TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIHNjb3JpbmcgdHlwZTogJHtzY29yaW5nX3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyQ29uZmlybWF0aW9uQnV0dG9uKHNjb3JpbmdfdHlwZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSB8fCBzY29yaW5nX3R5cGUgPT09IFwiaGVhZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGNvbmZpcm1lZD17IHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICBvbkNvbmZpcm1hdGlvblRvZ2dsZT17IHRoaXMucHJvcHMub25Db25maXJtYXRpb25Ub2dnbGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNjb3JpbmdfdHlwZSA9IGdldFNjb3JpbmdUeXBlKHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFkbWluU2NvcmVJbnB1dFwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KHNjb3JpbmdfdHlwZSkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb25maXJtYXRpb25CdXR0b24oc2NvcmluZ190eXBlKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkVkaXRvci5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JcIjtcbiIsImltcG9ydCBFZGl0b3IgZnJvbSBcIi4vRWRpdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZG1pblNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgZWRpdGluZzogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB0b3VyOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25Db25maXJtYXRpb25Ub2dnbGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZWRpdGluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2Uucm9sZSA9PT0gXCJoZWFkX2p1ZGdlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucGVuYWx0eSA9PT0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgID8gXCLigJRcIlxyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEubmV4dHRvdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIvTlRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcmVzdWx0IH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5yb2xlID09PSBcInRlY2hfanVkZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEVkaXRvclxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtYXRpb25Ub2dnbGU9eyB0aGlzLnByb3BzLm9uQ29uZmlybWF0aW9uVG9nZ2xlIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLnByb3BzLm9uU3VibWl0IH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5BZG1pblNjb3JlSW5wdXQuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRcIjtcclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBwbGFjZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2FjaGVzOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG9ydHNtZW46IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXJfb2ZfYmlydGg6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XG4gICAgICAgIGRvY3hcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi50b3VyLW5hbWVcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwicGFkZGluZ1wiLCBcIjBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zcG9ydHNtZW5cIiwgXCJ3aWR0aFwiLCBcIjEwMCVcIik7XG4gICAgfVxuXG4gICAgcmVuZGVyUm93SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xuICAgICAgICBjb25zdCBuZWVkX3JlbmRlciA9XG4gICAgICAgICAgICB0eXBlb2YgcHJldl9yb3cgPT09IFwidW5kZWZpbmVkXCIgfHxcbiAgICAgICAgICAgIHByZXZfcm93LnRvdXIuaWQgIT09IG5leHRfcm93LnRvdXIuaWQ7XG4gICAgICAgIGlmICghbmVlZF9yZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIga2V5PXsgYEgke25leHRfcm93LnJ1bi5pZH1gIH0+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRvdXItbmFtZVwiIGNvbFNwYW49XCI2XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5leHRfcm93LnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUm93KHJvdykge1xuICAgICAgICBsZXQgcCA9IHJvdy5ydW4ucGFydGljaXBhbnQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIga2V5PXsgYFIke3Jvdy5ydW4uaWR9YCB9PlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggcGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm93LnBsYWNlID09PSBudWxsID8gXCJcIiA6IHJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAubnVtYmVyIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzZcIiBjb2xTcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwic3BvcnRzbWVuXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwLmZvcm1hdGlvbl9uYW1lID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNvbFNwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHAuZm9ybWF0aW9uX25hbWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNzVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYCR7cy5sYXN0X25hbWV9ICR7cy5maXJzdF9uYW1lfWAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcy5zdWJzdGl0dXRlID8gPGk+ICh7IF8oXCJyZXN1bHRzLmxhYmVscy5zdWJcIikgfS4pPC9pPiA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHMueWVhcl9vZl9iaXJ0aCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjbHViXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwLmNsdWIubmFtZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI0IGNvYWNoZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHAuY29hY2hlcy5zcGxpdChcIixcIikubWFwKGMgPT4gW2MudHJpbSgpLCA8YnIga2V5PVwiWFwiIC8+XSkgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgY29uc3QgdGFibGUgPSB0aGlzLnByb3BzLnRhYmxlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLnJlbmRlclJvd0hlYWRlcih0YWJsZVtpIC0gMV0sIHRhYmxlW2ldKTtcbiAgICAgICAgICAgIGlmIChoZWFkZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChoZWFkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yZW5kZXJSb3codGFibGVbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRpc2NpcGxpbmVSZXN1bHRzVGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yN1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnNwb3J0c21lblwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY29hY2hlc1wiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvd3MoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGlzY2lwbGluZVJlc3VsdHNUYWJsZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0Rpc2NpcGxpbmVSZXN1bHRzVGFibGVcIjtcbiIsImV4cG9ydCBsZXQgQXBpID0gbnVsbDtcbmV4cG9ydCBsZXQgbWVzc2FnZV9kaXNwYXRjaGVyID0gbnVsbDtcbmV4cG9ydCBsZXQgc3RvcmFnZSA9IG51bGw7XG5leHBvcnQgbGV0IFRvdXJSZXN1bHRzTG9hZGVyID0gbnVsbDtcbmV4cG9ydCBsZXQgRGlzY2lwbGluZVJlc3VsdHNMb2FkZXIgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoZGF0YSkge1xuICAgIEFwaSAgICAgICAgICAgICAgICAgICAgICA9IGRhdGEuQXBpO1xuICAgIG1lc3NhZ2VfZGlzcGF0Y2hlciAgICAgICA9IGRhdGEubWVzc2FnZV9kaXNwYXRjaGVyO1xuICAgIHN0b3JhZ2UgICAgICAgICAgICAgICAgICA9IGRhdGEuc3RvcmFnZTtcbiAgICBUb3VyUmVzdWx0c0xvYWRlciAgICAgICAgPSBkYXRhLlRvdXJSZXN1bHRzTG9hZGVyO1xuICAgIERpc2NpcGxpbmVSZXN1bHRzTG9hZGVyICA9IGRhdGEuRGlzY2lwbGluZVJlc3VsdHNMb2FkZXI7XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFjcm9JZHg6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByZWR1Y3Rpb246IFBULm51bWJlcixcclxuICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZSh0aGlzLnByb3BzLmFjcm9JZHgsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhcInRhYmxldC5hY3JvX2p1ZGdlLmFjcm9fblwiLCB0aGlzLnByb3BzLmFjcm9JZHgpIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInJlZHVjdGlvblwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMucmVkdWN0aW9uIH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucmVkdWN0aW9ucy5tYXAoKHJlZHVjdGlvbiwgYWNyb19pZHgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgYWNyb19pZHggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb249eyByZWR1Y3Rpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvSWR4PXsgYWNyb19pZHggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU9eyB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcIm1pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaXN0YWtlc1wiPlxyXG4gICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5hY3JvX2p1ZGdlLmZhbGxfZG93blwiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBFbGVtZW50cyBmcm9tIFwiLi9FbGVtZW50c1wiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgaGFuZGxlQWNyb1JlZHVjdGlvblVwZGF0ZSA9IChhY3JvX2lkeCwgdmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMucHJvcHMuc2NvcmVEYXRhLnJlZHVjdGlvbnMubWFwKCgpID0+IG51bGwpO1xyXG4gICAgICAgIHJlZHVjdGlvbnNbYWNyb19pZHhdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwicmVkdWN0aW9uc1wiLCByZWR1Y3Rpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxFbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9ucz17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnJlZHVjdGlvbnMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZT17IHRoaXMuaGFuZGxlQWNyb1JlZHVjdGlvblVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgbWlzdGFrZXM9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsTGF5b3V0IGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsTGF5b3V0XCI7XHJcbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9iYXRpY3NMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsTGF5b3V0XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IFNjb3JpbmdMYXlvdXQgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcbmltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xyXG5cclxuaW1wb3J0IFNsaWRlciBmcm9tIFwidGFibGV0X3VpL1NsaWRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybWF0aW9uQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgY29uZmlybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uQ29uZmlybTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuQ29uZmlybTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcclxuICAgICAgICAgICAgXCJjb25maXJtXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiaGlkZGVuXCI6ICF0aGlzLnByb3BzLmNhbkNvbmZpcm0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH0+XHJcbiAgICAgICAgICAgICAgICA8U2xpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZT17IHRoaXMucHJvcHMuY29uZmlybWVkIH1cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZVRleHQ9eyBfKFwidGFibGV0Lmdsb2JhbC5jb25maXJtX3Njb3JlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICBkb25lVGV4dD17IF8oXCJ0YWJsZXQuZ2xvYmFsLmNvbmZpcm1lZFwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25BY3RpdmF0ZT17IHRoaXMucHJvcHMub25Db25maXJtIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBJbnRlZ2VySW5wdXQgZnJvbSBcInRhYmxldF91aS9JbnRlZ2VySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlRGF0YTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc21hbGxfbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInNtYWxsX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGhhbmRsZUJpZ01pc3Rha2VzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwiYmlnX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWlzdGFrZXMgZnVsbC13aWR0aFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5zbWFsbF9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEuc21hbGxfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlU21hbGxNaXN0YWtlc0NoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+PHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuYmlnX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5iaWdfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQmlnTWlzdGFrZXNDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZVBhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5jb2RlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZndfd29tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd19tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEyLjUgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJjb21wb3NpdGlvblwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsTGF5b3V0IGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsTGF5b3V0XCI7XHJcbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsTGF5b3V0XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IFNjb3JpbmdMYXlvdXQgfVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVQYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMucHJvcHMuY29kZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXIsIHZhbHVlLCBzY2FsZSwgb25TY29yZVVwZGF0ZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcbmltcG9ydCBUb3RhbFNjb3JlIGZyb20gXCJKdWRnZVRhYmxldC9Ub3RhbFNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLmFkZGl0aW9uYWxfcHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZndfd29tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd19tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwiaW50ZWdlclwiLCB7IG1pbjogMCwgbWF4OiAyNSB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImNvbXBvc2l0aW9uXCIsIFwiaW50ZWdlclwiLCB7IG1pbjogMCwgbWF4OiAyMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsTGF5b3V0IGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsTGF5b3V0XCI7XHJcbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbmNpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsTGF5b3V0XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IFNjb3JpbmdMYXlvdXQgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgb25DbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMubWtleSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImJ0blwiICsgKHRoaXMucHJvcHMuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uQ2xpY2spIH0+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5sYWJlbCB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb3Rlckl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi9CdXR0b25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKHByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICAgIHsgUmVhY3QuQ2hpbGRyZW4ubWFwKHByb3BzLmNoaWxkcmVuLCAoYnRuKSA9PlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgYnRuLnByb3BzLm1rZXkgfVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU9eyBwcm9wcy52YWx1ZSA9PT0gYnRuLnByb3BzLm1rZXkgfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgcHJvcHMub25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgICAgICB7IC4uLmJ0bi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZm9vdGVyPlxuICAgIClcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yZURhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNtYWxsTWlzdGFrZXNDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJzbWFsbF9taXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVCaWdNaXN0YWtlc0NoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcImJpZ19taXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtaXN0YWtlcyBmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fc21hbGxfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnNtYWxsX21pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVNtYWxsTWlzdGFrZXNDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPjx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fYmlnX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5iaWdfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQmlnTWlzdGFrZXNDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZVBhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZSB9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyX3Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcbmltcG9ydCBUb3RhbFNjb3JlIGZyb20gXCJKdWRnZVRhYmxldC9Ub3RhbFNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgY29kZT17IGNvZGUgfVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhgdGFibGV0LmRhbmNlX2p1ZGdlLiR7Y29kZX1gKSB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhW2NvZGVdIH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxyXG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICB7Li4uYWRkaXRpb25hbF9wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImFjcm9iYXRpY3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV90ZWNoXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfZmlnc1wiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImltcHJlc3Npb25cIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyB0aGlzLnByb3BzLnNjb3JlRGF0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvdGFsU2NvcmVcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yZURhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwibWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlUGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBoZWFkZXI6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NhbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5jb2RlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuaW1wb3J0IFRvdGFsU2NvcmUgZnJvbSBcIkp1ZGdlVGFibGV0L1RvdGFsU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfdGVjaFwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJpbXByZXNzaW9uXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgdGhpcy5wcm9wcy5zY29yZURhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIkp1ZGdlVGFibGV0L0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNpcGFudCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhbkNvbmZpcm0oKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlX2RhdGEgPSB0aGlzLnNjb3JlLmRhdGEucmF3X2RhdGE7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNjb3JlX2RhdGEpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHNjb3JlX2RhdGFba2V5XTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5maWx0ZXIoYSA9PiBhID09PSBudWxsKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSh0aGlzLnNjb3JlLmlkKTtcbiAgICB9XG4gICAgb25TY29yZVVwZGF0ZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzY29yZV9kYXRhID0ge307XG4gICAgICAgIHNjb3JlX2RhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5zY29yZS5pZCwgc2NvcmVfZGF0YSk7XG4gICAgfVxuICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZSA9IChhY3JvX2lkeCwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUuY29uZmlybWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlZHVjdGlvbnMgPSB0aGlzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoKCkgPT4gbnVsbCk7XG4gICAgICAgIHJlZHVjdGlvbnNbYWNyb19pZHhdID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25TY29yZVVwZGF0ZShcInJlZHVjdGlvbnNcIiwgcmVkdWN0aW9ucyk7XG4gICAgfVxuICAgIHJlbmRlclNjb3JpbmdMYXlvdXQoKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlX2RhdGEgPSB0aGlzLnNjb3JlLmRhdGEucmF3X2RhdGE7XG4gICAgICAgIGNvbnN0IFNjb3JpbmdDb21wb25lbnQgPSB0aGlzLnByb3BzLmxheW91dENsYXNzO1xuICAgICAgICBpZiAodGhpcy5zY29yZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxTY29yaW5nQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMuc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyBzY29yZV9kYXRhIH1cbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZD17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgY2FuQ29uZmlybT17IHRoaXMuY2FuQ29uZmlybSgpIH1cbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtPXsgdGhpcy5vbkNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWluZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtaW5nXCI+XG4gICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5ub3RfcGVyZm9ybWluZ1wiKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJTY29yaW5nTGF5b3V0KClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnJlbmRlck5vdFBlcmZvcm1pbmdNZXNzYWdlKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRlclwiO1xuaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcbmltcG9ydCBQYXJ0aWNpcGFudCBmcm9tIFwiLi9QYXJ0aWNpcGFudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBoZWF0OiB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmIChuZXh0X3Byb3BzLnRvdXIuaWQgIT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgY29uc3QgcHJldl9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gbmV4dF9wcm9wcztcbiAgICAgICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBwcmV2X3Byb3BzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBoZWF0c19jb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJoZWF0c19jb3VudFwiLCAoKSA9PlxuICAgICAgICAgICAgTWF0aC5tYXgoLi4udGhpcy5wcm9wcy50b3VyLnJ1bnMubWFwKHJ1biA9PiBydW4uaGVhdCkpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuaGVhdClcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGZpcnN0X25vbl9jb25maXJtZWRfaGVhdCgpIHtcbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgdGhpcy5wcm9wcy50b3VyLnJ1bnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgcnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCAmJiAhc2NvcmUuY29uZmlybWVkICYmIHJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bi5oZWF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5oZWF0c19jb3VudDtcbiAgICB9XG4gICAgdXBkYXRlSGVhdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGhlYXQ6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25QcmV2SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0IC0gMSk7XG4gICAgfVxuICAgIG9uTmV4dEhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCArIDEpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXQgR2VuZXJhbExheW91dFwiPlxuICAgICAgICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICAgICAgaGVhdHNDb3VudD17IHRoaXMuaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgICAgICBtYXhIZWF0PXsgdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQgfVxuICAgICAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLm9uUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgICAgIG9uTmV4dEhlYXRDbGljaz17IHRoaXMub25OZXh0SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLnJ1bnMuZmlsdGVyKHJ1biA9PiBydW4uaGVhdCA9PT0gdGhpcy5zdGF0ZS5oZWF0KS5tYXAocnVuID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBhcnRpY2lwYW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgdGhpcy5wcm9wcy5sYXlvdXRDbGFzcyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBOdW1iZXJTZWxlY3RvcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvTnVtYmVyU2VsZWN0b3JJbnB1dFwiO1xyXG5pbXBvcnQgU2VsZWN0b3JJbnB1dCBmcm9tIFwidGFibGV0X3VpL1NlbGVjdG9ySW5wdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxTY2FsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXI6IFBULnN0cmluZyxcclxuICAgICAgICAgICAgc2NhbGU6IFBULm9uZU9mKFtcInBvaW50NVwiLCBcImludGVnZXJcIiwgXCJncmlkXCIsIFwicmVkdWN0aW9uXCJdKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBPU1NJQkxJRV9SRURVQ1RJT05TKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFsxMDAsIFwiLTEwMCVcIl0sXHJcbiAgICAgICAgICAgIFs3NSwgIFwiLTc1JVwiXSxcclxuICAgICAgICAgICAgWzUwLCAgXCItNTAlXCJdLFxyXG4gICAgICAgICAgICBbMjUsICBcIi0yNSVcIl0sXHJcbiAgICAgICAgICAgIFsxMCwgIFwiLTEwJVwiXSxcclxuICAgICAgICAgICAgWzUsICAgXCItNSVcIl0sXHJcbiAgICAgICAgICAgIFswLCAgIFwiLTAlXCJdLFxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJIZWFkZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aDM+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuaGVhZGVyIH1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgY29uc3QgeyBzY2FsZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3dpdGNoIChzY2FsZSkge1xyXG4gICAgICAgIGNhc2UgXCJwb2ludDVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxOdW1iZXJTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFNpemU9eyAxIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGVwPXsgMC41IH1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInR3by1saW5lc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TnVtYmVyU2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidHdvLWxpbmVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcImdyaWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxOdW1iZXJTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJncmlkXCJcclxuICAgICAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcInJlZHVjdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5QT1NTSUJMSUVfUkVEVUNUSU9OUyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJvbmUtbGluZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93ZCBzY2FsZSB0eXBlOiAke3NjYWxlfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xyXG4gICAgZ2V0IGNoaWxkcmVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiY2hpbGRyZW5cIiwgKCkgPT5cclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICA6IFt0aGlzLnByb3BzLmNoaWxkcmVuXVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXQgdHdvX3Jvd3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ0d29fcm93c1wiLCAoKSA9PlxyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+PSA0XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGdldCB3aWR0aF92YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcIndpZHRoX3ZhbHVlXCIsICgpID0+XHJcbiAgICAgICAgICAgIHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgICAgID8gOTkuOSAvICh0aGlzLmNoaWxkcmVuLmxlbmd0aCArIDEpICogMlxyXG4gICAgICAgICAgICAgICAgOiA5OS45IC8gdGhpcy5jaGlsZHJlbi5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0IHdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwid2lkdGhcIiwgKCkgPT5cclxuICAgICAgICAgICAgYCR7IHRoaXMud2lkdGhfdmFsdWUudG9GaXhlZCg1KSB9JWBcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICBnZXQgbWF4X3dpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwibWF4X3dpZHRoXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGluZV9zaXplID0gdGhpcy50d29fcm93c1xyXG4gICAgICAgICAgICAgICAgPyBNYXRoLmZsb29yKCh0aGlzLmNoaWxkcmVuLmxlbmd0aCArIDEpIC8gMiArIDAuMDAxKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIGAkezYwMCAqIGxpbmVfc2l6ZX1weGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgYXN5bV9sYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJhc3ltX2xheW91dFwiLCAoKSA9PlxyXG4gICAgICAgICAgICB0aGlzLnR3b19yb3dzICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoICUgMiA9PT0gMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3coZWxlbWVudHMsIGlzX3NlY29uZF9yb3cpIHtcclxuICAgICAgICBpZiAoZWxlbWVudHMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJvd193aWR0aCA9IGAkeyhlbGVtZW50cy5sZW5ndGggKiB0aGlzLndpZHRoX3ZhbHVlKS50b0ZpeGVkKDUpfSVgO1xyXG4gICAgICAgIGxldCBjbGFzc19uYW1lID0gXCJncmlkLXJvd1wiO1xyXG4gICAgICAgIGlmICghdGhpcy5hc3ltX2xheW91dCkge1xyXG4gICAgICAgICAgICBjbGFzc19uYW1lICs9IFwiIGFsaWduLWNlbnRlclwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNfc2Vjb25kX3Jvdykge1xyXG4gICAgICAgICAgICBjbGFzc19uYW1lICs9IFwiIGFsaWduLXJpZ2h0XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xhc3NfbmFtZSArPSBcIiBhbGlnbi1sZWZ0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0gc3R5bGU9eyB7IHdpZHRoOiByb3dfd2lkdGggfSB9Pjx0Ym9keT5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICB7IGVsZW1lbnRzLm1hcCgoZSwgaWR4KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIml0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsgeyB3aWR0aDogdGhpcy53aWR0aCB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NfbmFtZSA9IHRoaXMudHdvX3Jvd3MgPyBcIkdyaWQgdHdvLXJvd3NcIiA6IFwiR3JpZFwiO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0X3JvdyA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgPyB0aGlzLmNoaWxkcmVuLmZpbHRlcigoeCwgaWR4KSA9PiBpZHggJSAyID09PSAwKVxyXG4gICAgICAgICAgICA6IHRoaXMuY2hpbGRyZW47XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kX3JvdyA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgPyB0aGlzLmNoaWxkcmVuLmZpbHRlcigoeCwgaWR4KSA9PiBpZHggJSAyID09PSAxKVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0gc3R5bGU9eyB7IG1heFdpZHRoOiB0aGlzLm1heF93aWR0aCB9IH0+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93KGZpcnN0X3JvdywgZmFsc2UpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3coc2Vjb25kX3JvdywgdHJ1ZSkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IG9uVG91Y2hPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaE9yQ2xpY2tcIjtcbmltcG9ydCBzaG93Q29uZmlybSBmcm9tIFwiY29tbW9uL2RpYWxvZ3Mvc2hvd0NvbmZpcm1cIjtcbmltcG9ydCBjbG9zZURpYWxvZyBmcm9tIFwiY29tbW9uL2RpYWxvZ3MvY2xvc2VEaWFsb2dcIjtcblxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbnNQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHJ1bnM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYXQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZV9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RvcFRvdXIgPSAoKSA9PiB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuc3RvcF90b3VyXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdG9wXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyLmlkLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5vblN1Y2Nlc3MoY2xvc2VEaWFsb2cpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5hbGl6ZVRvdXIgPSAoKSA9PiB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuZmluYWxpemVfdG91clwiKSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91cikge1xuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuZmluYWxpemVcIiwge1xuICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXIuaWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm9uU3VjY2VzcyhjbG9zZURpYWxvZylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3BUb3VyQW5kU3RhcnROZXh0ID0gKCkgPT4ge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLnN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91cikge1xuICAgICAgICAgICAgICAgIGxldCB0b3VyX2lkID0gdGhpcy5wcm9wcy50b3VyLmlkO1xuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuc3RvcFwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHRvdXJfaWQsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAub25TdWNjZXNzKGNsb3NlRGlhbG9nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9KS5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5hbGl6ZVRvdXJBbmRTdGFydE5leHQgPSAoKSA9PiB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91cikge1xuICAgICAgICAgICAgICAgIGxldCB0b3VyX2lkID0gdGhpcy5wcm9wcy50b3VyLmlkO1xuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuZmluYWxpemVcIiwge1xuICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiB0b3VyX2lkLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5vblN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiB0b3VyX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25TdWNjZXNzKGNsb3NlRGlhbG9nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFzVW5jb25maXJtZWRTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHJ1bnMgPSB0aGlzLnByb3BzLnRvdXIucnVucztcbiAgICAgICAgY29uc3QgbGF0ZXN0X2hlYXQgPSBydW5zW3J1bnMubGVuZ3RoIC0gMV0uaGVhdDtcbiAgICAgICAgaWYgKGxhdGVzdF9oZWF0ID09PSBydW5zWzBdLmhlYXQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhdGVzdF9ydW5zID0gcnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IGxhdGVzdF9oZWF0KTtcbiAgICAgICAgY29uc3QgcHJldl9ydW5zID0gcnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IGxhdGVzdF9oZWF0IC0gMSk7XG4gICAgICAgIGxldCBzY29yZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NfcnVuID0gKHJ1biwgdHlwZSkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiBydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGpfaWQgPSBzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkO1xuICAgICAgICAgICAgICAgIGlmICghc2NvcmVzLmhhcyhkal9pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzLnNldChkal9pZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldjogMCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgKytzY29yZXMuZ2V0KGRqX2lkKVt0eXBlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIGxhdGVzdF9ydW5zKSB7XG4gICAgICAgICAgICBwcm9jZXNzX3J1bihydW4sIFwibGF0ZXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHByZXZfcnVucykge1xuICAgICAgICAgICAgcHJvY2Vzc19ydW4ocnVuLCBcInByZXZcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzdGF0cyBvZiBzY29yZXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChzdGF0cy5wcmV2ID4gMCAmJiBzdGF0cy5sYXRlc3QgPCBsYXRlc3RfcnVucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVuZGVyV2FybmluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1VuY29uZmlybWVkU2NvcmVzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhcm5pbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmFsZXJ0cy5oYXNfdW5jb25maXJtZWRfc2NvcmVzXCIpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJCdXR0b24oY29kZSwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKGNhbGxiYWNrKSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyBfKGB0YWJsZXQuYnV0dG9ucy4ke2NvZGV9YCkgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keSBhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlcldhcm5pbmcoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbihcInN0b3BfdG91clwiLCB0aGlzLnN0b3BUb3VyKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbihcImZpbmFsaXplX3RvdXJcIiwgdGhpcy5maW5hbGl6ZVRvdXIpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCIsIHRoaXMuc3RvcFRvdXJBbmRTdGFydE5leHQpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiLCB0aGlzLmZpbmFsaXplVG91ckFuZFN0YXJ0TmV4dCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b2JhdGljT3ZlcnJpZGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZXRBY3JvYmF0aWNPdmVycmlkZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzXG4gICAgICAgICAgICAubWFwKChhY3JvLCBpZHgpID0+ICh7IGlkeDogaWR4ICsgMSwgYWNyb2JhdGljOiBhY3JvIH0pKVxuICAgICAgICAgICAgLmZpbHRlcigoYWNybykgPT4gYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUgIT09IGFjcm8uYWNyb2JhdGljLnNjb3JlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgYWNyb2JhdGljX292ZXJyaWRlcyA9IHRoaXMuZ2V0QWNyb2JhdGljT3ZlcnJpZGVzKCk7XG4gICAgICAgIGlmIChhY3JvYmF0aWNfb3ZlcnJpZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWNyb2JhdGljLW92ZXJyaWRlc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCIgLz5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UuYWNyb2JhdGljX292ZXJyaWRlc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8dGFibGU+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IGFjcm9iYXRpY19vdmVycmlkZXMubWFwKGFjcm8gPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBhY3JvLmlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTUgaWR4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5pZHggfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5hY3JvYmF0aWMuZGVzY3JpcHRpb24gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgb3JpZ2luYWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLmFjcm9iYXRpYy5vcmlnaW5hbF9zY29yZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTUgYXJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4oaSXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCBzY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8uYWNyb2JhdGljLnNjb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSXRlbShwcm9wcykge1xuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHByb3BzLnNjb3JlICYmIHByb3BzLnNjb3JlLmNvbmZpcm1lZDtcbiAgICByZXR1cm4gKFxuICAgICAgICA8dGQgY2xhc3NOYW1lPXsgY29uZmlybWVkID8gXCJjb25maXJtZWRcIiA6IFwiXCIgfT5cbiAgICAgICAgICAgIHsgcHJvcHMuc2NvcmVcbiAgICAgICAgICAgICAgICA/IHByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgIDogXCLigJRcIiB9XG4gICAgICAgIDwvdGQ+XG4gICAgKTtcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVKdWRnZVNjb3JlIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgbGluZV9qdWRnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwibGluZV9qdWRnZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlcy5maWx0ZXIoZGogPT4gZGoucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiIHx8IGRqLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSk7XG4gICAgfVxuICAgIGdldCBsaW5lX2p1ZGdlc19pbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJsaW5lX2p1ZGdlc19pbmRleFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLmxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChkai5pZCwgZGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5zY29yZXMuZmlsdGVyKHNjb3JlID0+IHRoaXMubGluZV9qdWRnZXNfaW5kZXguaGFzKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpKSk7XG4gICAgfVxuICAgIHJlbmRlck51bWJlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLmxpbmVfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17IHNjb3JlLmlkIH0+XG4gICAgICAgICAgICAgICAgICAgIHsgYCR7ZGouanVkZ2UubnVtYmVyIH0keyBkai5yb2xlID09PSBcImFjcm9fanVkZ2VcIiA/IFwiIChBKVwiIDogXCJcIiB9YCB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLmxpbmVfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAganVkZ2U9eyBkai5qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIGtleT17IGRqLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyBzY29yZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5kYW5jZV9qdWRnZV9zY29yZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImxpbmUtanVkZ2Utc2NvcmVzXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwibnVtYmVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck51bWJlcnMoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJzY29yZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IG9uVG91Y2hFbmRPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaEVuZE9yQ2xpY2tcIjtcblxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdFBlcmZvcm1lZFN3aXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgbWFya05vdFBlcmZvcm1lZCgpIHtcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfbm90X3BlcmZvcm1lZFwiLCB7IHJ1bl9pZDogdGhpcy5wcm9wcy5ydW4uaWQgfSkuc2VuZCgpO1xuICAgIH1cbiAgICBtYXJrUGVyZm9ybWVkKCkge1xuICAgICAgICBBcGkoXCJydW4ubWFya19wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuLmlkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgcmVuZGVyQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtZWRcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMubWFya05vdFBlcmZvcm1lZC5iaW5kKHRoaXMpKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLm1hcmtfbm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwZXJmb3JtZWRcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMubWFya1BlcmZvcm1lZC5iaW5kKHRoaXMpKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLmRpc2NhcmRfbm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90LXBlcmZvcm1lZC1zd2l0Y2hcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9TZWxlY3RvcklucHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlbmFsdHlJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5hbHR5OiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yaW5nU3lzdGVtTmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInBlbmFsdHlcIiwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgcGVuYWx0aWVzID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zY29yaW5nU3lzdGVtTmFtZSkgPj0gMFxuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgW251bGwsIFwi4oCUXCJdLFxuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LmhlYWRfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstNSwgICBfKFwidGFibGV0LmhlYWRfanVkZ2UuZm9ybV95ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xNSwgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5mb3JtX3JlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgIFtudWxsLCBcIuKAlFwiXSxcbiAgICAgICAgICAgICAgICBbMCwgICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLm9rXCIpXSxcbiAgICAgICAgICAgICAgICBbLTMsICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnllbGxvd19jYXJkXCIpXSxcbiAgICAgICAgICAgICAgICBbLTMwLCAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnJlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgICAgICBbLTEwMCwgXyhcInRhYmxldC5oZWFkX2p1ZGdlLmJsYWNrX2NhcmRcIildLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5wZW5hbHR5X3R5cGVcIikgfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IHBlbmFsdGllcyB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnBlbmFsdHkgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJldmlvdXNQZW5hbHRpZXMocHJvcHMpIHtcbiAgICBpZiAoIXByb3BzLnJ1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXMgfHwgcHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiIC8+XG4gICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UucHJldmlvdXNfcGVuYWx0aWVzXCIpIH08L2gzPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgeyBwcm9wcy5ydW4uaW5oZXJpdGVkX2RhdGEucGVuYWx0aWVzLm1hcCgoZCwgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LWNlbnRlclwiPjxzdHJvbmc+eyBkLnBlbmFsdHkgfTwvc3Ryb25nPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+eyBkLnRvdXIgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBjb25maXJtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICBjb25zdCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMuc2NvcmUgPyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUgOiAwO1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XG4gICAgICAgICAgICBcImNvbmZpcm1lZFwiOiB0aGlzLnByb3BzLnNjb3JlICYmIHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkLFxuICAgICAgICAgICAgXCJncmVlblwiOiAtdG90YWxfc2NvcmUgPCAxLFxuICAgICAgICAgICAgXCJ5ZWxsb3dcIjogMSA8PSAtdG90YWxfc2NvcmUgJiYgLXRvdGFsX3Njb3JlIDwgMTAsXG4gICAgICAgICAgICBcInJlZFwiOiAxMCA8PSAtdG90YWxfc2NvcmUgJiYgLXRvdGFsX3Njb3JlIDwgNTAsXG4gICAgICAgICAgICBcImJsYWNrXCI6IDUwIDw9IC10b3RhbF9zY29yZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoKVxuICAgICAgICAgICAgICAgICAgICA6IFwi4oCUXCIgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkl0ZW0uZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9KdWRnZVRhYmxldF9IZWFkSnVkZ2VMYXlvdXRfSGVhdHNQYWdlX1Njb3JpbmdMYXlvdXRfVGVjaEp1ZGdlc1Njb3Jlc19JdGVtXCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEl0ZW0gZnJvbSBcIi4vSXRlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNoSnVkZ2VTY29yZSBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHRlY2hfanVkZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInRlY2hfanVkZ2VzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZXMuZmlsdGVyKGRqID0+IGRqLnJvbGUgPT09IFwidGVjaF9qdWRnZVwiKSk7XG4gICAgfVxuICAgIGdldCB0ZWNoX2p1ZGdlc19pbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ0ZWNoX2p1ZGdlc19pbmRleFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLnRlY2hfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChkai5pZCwgZGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5zY29yZXMuZmlsdGVyKHNjb3JlID0+IHRoaXMudGVjaF9qdWRnZXNfaW5kZXguaGFzKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpKSk7XG4gICAgfVxuICAgIGdldFN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4V2lkdGg6IGAkezE1MCAqIHRoaXMudGVjaF9qdWRnZXMubGVuZ3RofXB4YCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVuZGVyTnVtYmVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmVzLm1hcChzY29yZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaiA9IHRoaXMudGVjaF9qdWRnZXNfaW5kZXguZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dGQga2V5PXsgc2NvcmUuaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgeyBkai5qdWRnZS5udW1iZXIgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMubWFwKHNjb3JlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRqID0gdGhpcy50ZWNoX2p1ZGdlc19pbmRleC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlPXsgZGouanVkZ2UgfVxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBkai5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgc2NvcmUgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UudGVjaF9qdWRnZV9zY29yZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRlY2gtanVkZ2Utc2NvcmVzXCIgc3R5bGU9eyB0aGlzLmdldFN0eWxlKCkgfT48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJudW1iZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTnVtYmVycygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cInNjb3Jlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlcygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IFBlbmFsdHlJbnB1dCBmcm9tIFwiLi9QZW5hbHR5SW5wdXRcIjtcbmltcG9ydCBUZWNoSnVkZ2VzU2NvcmVzIGZyb20gXCIuL1RlY2hKdWRnZXNTY29yZXNcIjtcbmltcG9ydCBMaW5lSnVkZ2VzU2NvcmVzIGZyb20gXCIuL0xpbmVKdWRnZXNTY29yZXNcIjtcbmltcG9ydCBBY3JvYmF0aWNPdmVycmlkZXMgZnJvbSBcIi4vQWNyb2JhdGljT3ZlcnJpZGVzXCI7XG5pbXBvcnQgUHJldmlvdXNQZW5hbHRpZXMgZnJvbSBcIi4vUHJldmlvdXNQZW5hbHRpZXNcIjtcbmltcG9ydCBOb3RQZXJmb3JtZWRTd2l0Y2ggZnJvbSBcIi4vTm90UGVyZm9ybWVkU3dpdGNoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBzY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJzY29yZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHRoaXMucHJvcHMucnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblNjb3JlVXBkYXRlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB7fTtcbiAgICAgICAgc2NvcmVfZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBzY29yZV9kYXRhKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY29yZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aCk7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPE5vdFBlcmZvcm1lZFN3aXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPFBlbmFsdHlJbnB1dFxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMuc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmluZ1N5c3RlbU5hbWU9eyB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VGVjaEp1ZGdlc1Njb3Jlc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXM9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8TGluZUp1ZGdlc1Njb3Jlc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXM9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8QWNyb2JhdGljT3ZlcnJpZGVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxQcmV2aW91c1BlbmFsdGllc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Tm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBHcmlkIGZyb20gXCJKdWRnZVRhYmxldC9HcmlkXCI7XG5cbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhdHNQYWdlIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgcnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJydW5zXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIucnVucy5maWx0ZXIocnVuID0+IHJ1bi5oZWF0ID09PSB0aGlzLnByb3BzLmhlYXQpKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5zLm1hcChydW4gPT5cbiAgICAgICAgICAgIDxTY29yaW5nTGF5b3V0XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuLmlkIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keSBoZWF0c1wiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFRvdXJSZXN1bHRzTG9hZGVyIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmltcG9ydCBSZXN1bHRzVGFibGUyIGZyb20gXCJSZXN1bHRzVGFibGUyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdHNQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IHJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICA8VG91clJlc3VsdHNMb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI9eyBSZXN1bHRzVGFibGUyIH1cbiAgICAgICAgICAgICAgICAgICAgdG91cklkPXsgdGhpcy5wcm9wcy50b3VyLmlkIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3RlclwiO1xuaW1wb3J0IEZvb3Rlckl0ZW0gZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3Rlci9Gb290ZXJJdGVtXCI7XG5cbmltcG9ydCBIZWF0c1BhZ2UgZnJvbSBcIi4vSGVhdHNQYWdlXCI7XG5pbXBvcnQgUmVzdWx0c1BhZ2UgZnJvbSBcIi4vUmVzdWx0c1BhZ2VcIjtcbmltcG9ydCBBY3Rpb25zUGFnZSBmcm9tIFwiLi9BY3Rpb25zUGFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkSnVkZ2VMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYXQ6IDEsXG4gICAgICAgICAgICBwYWdlOiBcImhlYXRzXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IDEsXG4gICAgICAgICAgICAgICAgcGFnZTogXCJoZWF0c1wiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGhlYXRzX2NvdW50KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoLi4udGhpcy5wcm9wcy50b3VyLnJ1bnMubWFwKHJ1biA9PiBydW4uaGVhdCkpO1xuICAgIH1cbiAgICB1cGRhdGVIZWF0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaGVhdDogdmFsdWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblByZXZIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgLSAxKTtcbiAgICB9XG4gICAgb25OZXh0SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0ICsgMSk7XG4gICAgfVxuICAgIG9uUGFnZUNoYW5nZSA9IChwYWdlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlIH0pO1xuICAgIH1cbiAgICByZW5kZXJIZWF0cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIZWF0c1BhZ2VcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgaGVhdD17IHRoaXMuc3RhdGUuaGVhdCB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSZXN1bHRzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlc3VsdHNQYWdlXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFjdGlvbnNQYWdlXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYXRzX2NvdW50ID0gdGhpcy5oZWF0c19jb3VudDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICBoZWF0c0NvdW50PXsgaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgIGhpZGVIZWF0c0J1dHRvbnM9eyB0aGlzLnN0YXRlLnBhZ2UgIT09IFwiaGVhdHNcIiB9XG4gICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgbWF4SGVhdD17IGhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBvbk5leHRIZWF0Q2xpY2s9eyB0aGlzLm9uTmV4dEhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgb25QcmV2SGVhdENsaWNrPXsgdGhpcy5vblByZXZIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBhZ2UpIHtcbiAgICAgICAgY2FzZSBcImhlYXRzXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJIZWF0cygpO1xuICAgICAgICBjYXNlIFwicmVzdWx0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyUmVzdWx0cygpO1xuICAgICAgICBjYXNlIFwiYWN0aW9uc1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb290ZXIgdmFsdWU9eyB0aGlzLnN0YXRlLnBhZ2UgfSBvbkNoYW5nZT17IHRoaXMub25QYWdlQ2hhbmdlIH0+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmhlYXRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImhlYXRzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cInJlc3VsdHNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmFjdGlvbnNcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiYWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9vdGVyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXQgSGVhZEp1ZGdlTGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyRm9vdGVyKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBvblRvdWNoRW5kT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hFbmRPckNsaWNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhdDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGhlYXRzQ291bnQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBoaWRlSGVhdHNCdXR0b25zOiBQVC5ib29sLFxyXG4gICAgICAgICAgICBqdWRnZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICByb2xlX2Rlc2NyaXB0aW9uOiBQVC5zdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBudW1iZXI6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtYXhIZWF0OiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbk5leHRIZWF0Q2xpY2s6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25QcmV2SGVhdENsaWNrOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoaWRlSGVhdHNCdXR0b25zOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclByZXZIZWF0QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpZGVIZWF0c0J1dHRvbnMgfHwgdGhpcy5wcm9wcy5oZWF0IDw9IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWNvbnRhaW5lclwiIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWNvbnRhaW5lciBsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHsgLi4ub25Ub3VjaEVuZE9yQ2xpY2sodGhpcy5wcm9wcy5vblByZXZIZWF0Q2xpY2spIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucHJldl9oZWF0XCIpIH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyTmV4dEhlYXRCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGlkZUhlYXRzQnV0dG9ucyB8fCB0aGlzLnByb3BzLmhlYXQgPj0gdGhpcy5wcm9wcy5tYXhIZWF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXJcIiAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXIgcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24geyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uTmV4dEhlYXRDbGljaykgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5uZXh0X2hlYXRcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QganVkZ2VfbnVtYmVyID0gdGhpcy5wcm9wcy5qdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIHx8IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIHRoaXMucHJvcHMuanVkZ2UubnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclByZXZIZWF0QnV0dG9uKCkgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsganVkZ2VfbnVtYmVyIH08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+eyB0aGlzLnByb3BzLmp1ZGdlLm5hbWUgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsgdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUubmFtZSB9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwuaGVhdF9udW1iZXJcIiwgdGhpcy5wcm9wcy5oZWF0LCB0aGlzLnByb3BzLmhlYXRzQ291bnQgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0SGVhdEJ1dHRvbigpIH1cclxuICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIG9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwicG9pbnRzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXHJcbiAgICAgICAgICAgICAgICBtYXg9eyA0MCB9XHJcbiAgICAgICAgICAgICAgICBtaW49eyAxIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICByb3dTaXplPXsgMTAgfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJncmlkXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEucG9pbnRzIH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZSB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgT3ZlcnJpZGVJbnB1dCBmcm9tIFwiLi9PdmVycmlkZUlucHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVjaC1qdWRnZS1hY3JvXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250cm9sc1wiPlxuICAgICAgICAgICAgICAgICAgICA8T3ZlcnJpZGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFZhbHVlPXsgdGhpcy5wcm9wcy5hY3JvLm9yaWdpbmFsX3Njb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5hY3JvLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5hY3JvLmRlc2NyaXB0aW9uIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcInRhYmxldF91aS9vblRvdWNoT3JDbGlja1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdmVycmlkZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW5hbFZhbHVlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlTWludXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShNYXRoLm1heCh0aGlzLnByb3BzLnZhbHVlIC0gMC41LCAwKSk7XG4gICAgfVxuICAgIGhhbmRsZVBsdXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShNYXRoLm1pbih0aGlzLnByb3BzLnZhbHVlICsgMC41LCB0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUpKTtcbiAgICB9XG4gICAgaGFuZGxlWmVybyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKDApO1xuICAgIH1cbiAgICBoYW5kbGVSZXN0b3JlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5vcmlnaW5hbFZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlX2NoYW5nZWQgPSBNYXRoLmFicyh0aGlzLnByb3BzLnZhbHVlIC0gdGhpcy5wcm9wcy5vcmlnaW5hbFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWFjcm8tb3ZlcnJpZGUtaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXplcm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLnZhbHVlIDwgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVaZXJvKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkzBcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1yZXN0b3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdmFsdWVfY2hhbmdlZCA8IDAuMDUgfHwgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlUmVzdG9yZSkgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICDihpFcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IHx8IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZU1pbnVzKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy5vcmlnaW5hbFZhbHVlIDwgdGhpcy5wcm9wcy52YWx1ZSArIDAuMDUgfHwgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlUGx1cykgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZV9jaGFuZ2VkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGAke3RoaXMucHJvcHMub3JpZ2luYWxWYWx1ZS50b0ZpeGVkKDEpfSDihpIgJHt0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbk92ZXJyaWRlSW5wdXQuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9KdWRnZVRhYmxldF9UZWNoSnVkZ2VMYXlvdXRfQWNyb1BhZ2VfU2NvcmluZ0xheW91dF9PdmVycmlkZUlucHV0XCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIkp1ZGdlVGFibGV0L0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuXG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBzY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJzY29yZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHRoaXMucHJvcHMucnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkNvbmZpcm0gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0odGhpcy5zY29yZS5pZCk7XG4gICAgfVxuICAgIG9uQWNyb092ZXJyaWRlID0gKGFjcm9faWR4LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcGkoXCJhY3JvYmF0aWNfb3ZlcnJpZGUuc2V0XCIsIHtcbiAgICAgICAgICAgIHJ1bl9pZDogdGhpcy5wcm9wcy5ydW4uaWQsXG4gICAgICAgICAgICBhY3JvYmF0aWNfaWR4OiBhY3JvX2lkeCxcbiAgICAgICAgICAgIHNjb3JlOiB2YWx1ZSxcbiAgICAgICAgfSkuc2VuZCgpO1xuICAgIH1cbiAgICBnZW5PbkFjcm9PdmVycmlkZShhY3JvX2lkeCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5vbkFjcm9PdmVycmlkZShhY3JvX2lkeCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+XG4gICAgICAgICAgICA8RWxlbWVudFxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgIGtleT17IGlkeCB9XG4gICAgICAgICAgICAgICAgYWNybz17IGFjcm8gfVxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5nZW5PbkFjcm9PdmVycmlkZShpZHgpIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+eyBoZWFkZXIgfTwvaDI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckNvbnRlbnQoKSB9XG4gICAgICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17IHRoaXMub25Db25maXJtIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcblxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3JvUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW5zLm1hcChydW4gPT5cbiAgICAgICAgICAgIDxTY29yaW5nTGF5b3V0XG4gICAgICAgICAgICAgICAga2V5PXsgcnVuLmlkIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBvbkFjcm9PdmVycmlkZT17IHRoaXMucHJvcHMub25BY3JvT3ZlcnJpZGUgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlcygpIH1cbiAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcbmltcG9ydCBTZWxlY3RvcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvU2VsZWN0b3JJbnB1dFwiO1xuaW1wb3J0IEludGVnZXJJbnB1dCBmcm9tIFwidGFibGV0X3VpL0ludGVnZXJJbnB1dFwiO1xuXG5pbXBvcnQgQ29uZmlybWF0aW9uQnV0dG9uIGZyb20gXCJKdWRnZVRhYmxldC9Db25maXJtYXRpb25CdXR0b25cIjtcblxuaW1wb3J0IFByZXZpb3VzUGVuYWx0aWVzIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkSnVkZ2VMYXlvdXQvSGVhdHNQYWdlL1Njb3JpbmdMYXlvdXQvUHJldmlvdXNQZW5hbHRpZXNcIjtcblxuaW1wb3J0IFN0b3BXYXRjaCBmcm9tIFwiLi9TdG9wV2F0Y2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29uZmlybWF0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtKHRoaXMuc2NvcmUuaWQpO1xuICAgIH1cbiAgICBoYW5kbGVTY29yZUNoYW5nZSA9IChwYXJ0LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhW3BhcnRdID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBkYXRhKTtcbiAgICB9XG5cbiAgICBoYW5kbGVKdW1wU3RlcHNDaGFuZ2UgPSAodmFsdWUpID0+IHRoaXMuaGFuZGxlU2NvcmVDaGFuZ2UoXCJqdW1wX3N0ZXBzXCIsIHZhbHVlKTtcbiAgICBoYW5kbGVUaW1pbmdWaW9sYXRpb25DaGFuZ2UgPSAodmFsdWUpID0+IHRoaXMuaGFuZGxlU2NvcmVDaGFuZ2UoXCJ0aW1pbmdfdmlvbGF0aW9uXCIsIHZhbHVlKTtcbiAgICBoYW5kbGVQZW5hbHR5Q2hhbmdlID0gKHZhbHVlKSA9PiB0aGlzLmhhbmRsZVNjb3JlQ2hhbmdlKFwicGVuYWx0eVwiLCB2YWx1ZSk7XG5cbiAgICBnZW5PblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQpIHtcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMub25TY29yZVVwZGF0ZShzY29yZV9wYXJ0LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2NvcmUgPSB0aGlzLnNjb3JlLmRhdGE7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHBlbmFsdGllcyA9IFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBbMCwgICAgXyhcInRhYmxldC50ZWNoX2p1ZGdlLm9rXCIpXSxcbiAgICAgICAgICAgICAgICBbLTUsICAgXyhcInRhYmxldC50ZWNoX2p1ZGdlLmZvcm1feWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTUsICBfKFwidGFibGV0LnRlY2hfanVkZ2UuZm9ybV9yZWRfY2FyZFwiKV0sXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICBbMCwgICAgXyhcInRhYmxldC50ZWNoX2p1ZGdlLm9rXCIpXSxcbiAgICAgICAgICAgICAgICBbLTMsICAgXyhcInRhYmxldC50ZWNoX2p1ZGdlLnllbGxvd19jYXJkXCIpXSxcbiAgICAgICAgICAgICAgICBbLTMwLCAgXyhcInRhYmxldC50ZWNoX2p1ZGdlLnJlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgICAgICBbLTEwMCwgXyhcInRhYmxldC50ZWNoX2p1ZGdlLmJsYWNrX2NhcmRcIildLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnBlbmFsdHlfdHlwZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgcGVuYWx0aWVzIH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmUucmF3X2RhdGEucGVuYWx0eSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVQZW5hbHR5Q2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxQcmV2aW91c1BlbmFsdGllc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiIC8+XG4gICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC50ZWNoX2p1ZGdlLmp1bXBfc3RlcHNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICBzZW5kRGVsdGFzXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlLnJhd19kYXRhLmp1bXBfc3RlcHMgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlSnVtcFN0ZXBzQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCIgLz5cbiAgICAgICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC50ZWNoX2p1ZGdlLnRpbWluZ1wiKSB9XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8U3RvcFdhdGNoXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlSWQ9eyB0aGlzLnNjb3JlLmlkIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBbW3RydWUsIFwiWFwiXSwgW251bGwsIFwiLVwiXSwgW2ZhbHNlLCBcIk9LXCJdXSB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb24gfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlVGltaW5nVmlvbGF0aW9uQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCIgLz5cbiAgICAgICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZD17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtPXsgdGhpcy5oYW5kbGVDb25maXJtYXRpb24gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcbmltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5cbmxldCBzdG9wd2F0Y2hlcyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9wV2F0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlSWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgbGV0IHN0YXRlID0gc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZUlkXSB8fCB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChzdGF0ZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHN0YXRlLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5oYW5kbGVUaWNrLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlSWRdID0gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBub3coKSB7XG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXJ0X2F0OiB0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgICAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCh0aGlzLmhhbmRsZVRpY2ssIDEwKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVRvZ2dsZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVSZXNldCA9ICgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVUaWNrID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hY3RpdmVcbiAgICAgICAgICAgID8gKHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnN0YXJ0X2F0KVxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cblxuICAgIHBhZChudW0sIHNpemUpIHtcbiAgICAgICAgY29uc3QgcyA9IGAwMDAwJHtudW19YDtcbiAgICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gc2l6ZSk7XG4gICAgfVxuICAgIGdldFN0clZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICBsZXQgbSA9IDAsIHMgPSAwO1xuICAgICAgICBtID0gTWF0aC5mbG9vcih2YWwgLyAoNjAgKiAxMDAwKSk7XG4gICAgICAgIHZhbCAlPSA2MCAqIDEwMDA7XG4gICAgICAgIHMgPSBNYXRoLmZsb29yKHZhbCAvIDEwMDApO1xuICAgICAgICByZXR1cm4gYCR7bX06JHt0aGlzLnBhZChzLCAyKX1gO1xuICAgIH1cblxuICAgIGdldFRvZ2dsZUJ1dHRvbkNsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xuICAgICAgICAgICAgXCJ0YnRuXCI6IHRydWUsXG4gICAgICAgICAgICBcImJ0bi10b2dnbGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaWdub3JlLXJlYWRvbmx5XCI6IHRydWUsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0aGlzLnN0YXRlLmFjdGl2ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RvcHdhdGNoXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXNldCBpZ25vcmUtcmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlUmVzZXQpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnJlc2V0X3N0b3B3YXRjaFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyB0aGlzLmdldFRvZ2dsZUJ1dHRvbkNsYXNzTmFtZSgpIH1cbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVRvZ2dsZSkgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF9zdG9wd2F0Y2hcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXyhcInRhYmxldC5idXR0b25zLnN0YXJ0X3N0b3B3YXRjaFwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdHJWYWx1ZSgpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcblxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jaW5nUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW5zLm1hcChydW4gPT5cbiAgICAgICAgICAgIDxTY29yaW5nTGF5b3V0XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIGtleT17IHJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyXCI7XG5pbXBvcnQgRm9vdGVySXRlbSBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyL0Zvb3Rlckl0ZW1cIjtcblxuaW1wb3J0IERhbmNpbmdQYWdlIGZyb20gXCIuL0RhbmNpbmdQYWdlXCI7XG5pbXBvcnQgQWNyb1BhZ2UgZnJvbSBcIi4vQWNyb1BhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVjaEp1ZGdlTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBoZWF0OiB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCxcbiAgICAgICAgICAgIHBhZ2U6IFwiZGFuY2luZ1wiLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRfcHJvcHMudG91ci5pZCAhPT0gdGhpcy5wcm9wcy50b3VyLmlkKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2X3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBuZXh0X3Byb3BzO1xuICAgICAgICAgICAgdGhpcy5yZXNldENhY2hlKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBoZWF0OiB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCxcbiAgICAgICAgICAgICAgICBwYWdlOiBcImRhbmNpbmdcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHByZXZfcHJvcHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGhlYXRzX2NvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImhlYXRzX2NvdW50XCIsICgpID0+XG4gICAgICAgICAgICBNYXRoLm1heCguLi50aGlzLnByb3BzLnRvdXIucnVucy5tYXAocnVuID0+IHJ1bi5oZWF0KSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IHJ1bnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwicnVuc1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnJ1bnMuZmlsdGVyKHJ1biA9PiBydW4uaGVhdCA9PT0gdGhpcy5zdGF0ZS5oZWF0KVxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0KCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJ1biBvZiB0aGlzLnByb3BzLnRvdXIucnVucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiBydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkICYmICFzY29yZS5jb25maXJtZWQgJiYgcnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVuLmhlYXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhlYXRzX2NvdW50O1xuICAgIH1cbiAgICB1cGRhdGVIZWF0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaGVhdDogdmFsdWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVQcmV2SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0IC0gMSk7XG4gICAgfVxuICAgIGhhbmRsZU5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgaGFuZGxlUGFnZUNoYW5nZSA9IChwYWdlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlIH0pO1xuICAgIH1cbiAgICByZW5kZXJEYW5jaW5nKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERhbmNpbmdQYWdlXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIHJ1bnM9eyB0aGlzLnJ1bnMgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBY3JvKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFjcm9QYWdlXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIHJ1bnM9eyB0aGlzLnJ1bnMgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYXRzX2NvdW50ID0gdGhpcy5oZWF0c19jb3VudDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICBoZWF0c0NvdW50PXsgaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuanVkZ2UgfVxuICAgICAgICAgICAgICAgIG1heEhlYXQ9eyB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgb25OZXh0SGVhdENsaWNrPXsgdGhpcy5oYW5kbGVOZXh0SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLmhhbmRsZVByZXZIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBhZ2UpIHtcbiAgICAgICAgY2FzZSBcImRhbmNpbmdcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRhbmNpbmcoKTtcbiAgICAgICAgY2FzZSBcImFjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFjcm8oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmIChbXCJyb3NmYXJyLmFjcm9cIiwgXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvb3RlciB2YWx1ZT17IHRoaXMuc3RhdGUucGFnZSB9IG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVQYWdlQ2hhbmdlIH0+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmRhbmNpbmdcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiZGFuY2luZ1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMuYWNyb1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIG1rZXk9XCJhY3JvXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Gb290ZXI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9zZmFyci1KdWRnZVRhYmxldCBUZWNoSnVkZ2VMYXlvdXRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJGb290ZXIoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCAocHJvcHMpID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwudG90YWxfc2NvcmVcIikgfTogeyBwcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH1cbiAgICA8L2Rpdj5cbik7XG4iLCJpbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xuXG5pbXBvcnQgQWNyb2JhdGljc0xheW91dCBmcm9tIFwiLi9BY3JvYmF0aWNzTGF5b3V0XCI7XG5pbXBvcnQgRGFuY2VMYXlvdXQgZnJvbSBcIi4vRGFuY2VMYXlvdXRcIjtcbmltcG9ydCBEYW5jZUhhbHZlZExheW91dCBmcm9tIFwiLi9EYW5jZUhhbHZlZExheW91dFwiO1xuaW1wb3J0IEZvcm1hdGlvbkxheW91dCBmcm9tIFwiLi9Gb3JtYXRpb25MYXlvdXRcIjtcbmltcG9ydCBGb3JtYXRpb25BY3JvTGF5b3V0IGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9MYXlvdXRcIjtcbmltcG9ydCBTaW1wbGlmaWVkTGF5b3V0IGZyb20gXCIuL1NpbXBsaWZpZWRMYXlvdXRcIjtcbmltcG9ydCBIZWFkSnVkZ2VMYXlvdXQgZnJvbSBcIi4vSGVhZEp1ZGdlTGF5b3V0XCI7XG5pbXBvcnQgVGVjaEp1ZGdlTGF5b3V0IGZyb20gXCIuL1RlY2hKdWRnZUxheW91dFwiO1xuXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVkZ2VUYWJsZXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBMQVlPVVRTID0ge1xuICAgICAgICBcImFjcm9cIjogQWNyb2JhdGljc0xheW91dCxcbiAgICAgICAgXCJkYW5jZVwiOiBEYW5jZUxheW91dCxcbiAgICAgICAgXCJkYW5jZV9oYWx2ZWRcIjogRGFuY2VIYWx2ZWRMYXlvdXQsXG4gICAgICAgIFwiZm9ybWF0aW9uXCI6IEZvcm1hdGlvbkxheW91dCxcbiAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBGb3JtYXRpb25BY3JvTGF5b3V0LFxuICAgICAgICBcInNpbXBsaWZpZWRcIjogU2ltcGxpZmllZExheW91dCxcbiAgICAgICAgXCJoZWFkXCI6IEhlYWRKdWRnZUxheW91dCxcbiAgICAgICAgXCJ0ZWNoXCI6IFRlY2hKdWRnZUxheW91dCxcbiAgICB9O1xuICAgIG9uU2NvcmVVcGRhdGUgPSAoc2NvcmVfaWQsIG5ld19zY29yZSkgPT4ge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgc2NvcmVfZGF0YTogbmV3X3Njb3JlLFxuICAgICAgICAgICAgZm9yY2U6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICBBcGkoXCJzY29yZS5zZXRcIiwgeyBzY29yZV9pZDogc2NvcmVfaWQsIGRhdGE6IHJlcXVlc3QgfSkuc2VuZCgpO1xuICAgIH1cbiAgICBvblNjb3JlQ29uZmlybSA9IChzY29yZV9pZCkgPT4ge1xuICAgICAgICBBcGkoXCJzY29yZS5jb25maXJtXCIsIHsgc2NvcmVfaWQ6IHNjb3JlX2lkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpO1xuICAgICAgICBsZXQgTGF5b3V0Q2xhc3MgPSBKdWRnZVRhYmxldC5MQVlPVVRTW3Njb3JpbmdfdHlwZV07XG4gICAgICAgIGlmICghTGF5b3V0Q2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdj5Ob3QgaW1wbGVtZW50ZWQhPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXRcIj5cbiAgICAgICAgICAgICAgICA8TGF5b3V0Q2xhc3NcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBnZXRQYXJ0aWNpcGFudERpc3BsYXkgZnJvbSBcImNvbW1vbi9nZXRQYXJ0aWNpcGFudERpc3BsYXlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwOiBQVC5pbnN0YW5jZU9mKE1hcCkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcm93OiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBwbGFjZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBzY29yZXM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxfcGVuYWx0eTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c190b3VyOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzaG93VG90YWxTY29yZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRDYXJkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCLigJRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnRvdGFsX3BlbmFsdHkudG9GaXhlZCgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyVG90YWxTY29yZUNlbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNob3dUb3RhbFNjb3JlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudCA9IFwi4oCUXCI7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IChcclxuICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAmbmJzcDt7IFwiLyBcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgY29udGVudCB9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy03IHBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5wbGFjZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTYgbnVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMzAgcGFydGljaXBhbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQpXHJcbiAgICAgICAgICAgICAgICAgfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2x1YlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVG90YWxTY29yZUNlbGwoKSB9XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IGNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0Q2FyZCgpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJvdy5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTFfUm93XCI7XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBSb3cgZnJvbSBcIi4vUm93XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1RhYmxlMSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBhZHZhbmNlczogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYW5zZm9ybURvY3goZG9jeCkge1xuICAgICAgICBkb2N4XG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgXCIxMnB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYWR2YW5jZXMtaGVhZGVyXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIik7XG4gICAgfVxuXG4gICAgZ2V0Um93U3RhdHVzKHJvdykge1xuICAgICAgICBpZiAoIXJvdykge1xuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9wZXJmb3JtZWRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93LmFkdmFuY2VzID8gXCJhZHZhbmNlZFwiIDogXCJub3RfYWR2YW5jZWRcIjtcbiAgICB9XG4gICAgZ2V0U3RhdHVzSGVhZGVyKHJvd19zdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIF8oYHJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfJHtyb3dfc3RhdHVzfWApO1xuICAgIH1cbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3csIGhhc19uZXh0X3RvdXIsIG5fY29scykge1xuICAgICAgICBjb25zdCBwcmV2X3N0YXR1cyA9IHRoaXMuZ2V0Um93U3RhdHVzKHByZXZfcm93KTtcbiAgICAgICAgY29uc3QgbmV4dF9zdGF0dXMgPSB0aGlzLmdldFJvd1N0YXR1cyhuZXh0X3Jvdyk7XG4gICAgICAgIGlmIChwcmV2X3N0YXR1cyA9PT0gbmV4dF9zdGF0dXMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0X3N0YXR1cyAhPT0gXCJub3RfcGVyZm9ybWVkXCIgJiYgIWhhc19uZXh0X3RvdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIga2V5PXsgYEFIJHtuZXh0X3Jvdy5ydW4uaWR9YCB9PlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0YXR1c0hlYWRlcihuZXh0X3N0YXR1cykgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoYXNfbmV4dF90b3VyID0gdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbDtcbiAgICAgICAgY29uc3Qgc2hvd190b3RhbF9zY29yZSA9IFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMDtcbiAgICAgICAgY29uc3QgZGpzX21hcCA9IG5ldyBNYXAodGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMubWFwKGRqID0+IFtkai5pZCwgZGpdKSk7XG4gICAgICAgIGxldCByb3dzID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcHMudGFibGUubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICAgICAgcm93cy5wdXNoKHRoaXMucmVuZGVyQWR2YW5jZXNIZWFkZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50YWJsZVtpZHggLSAxXSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRhYmxlW2lkeF0sXG4gICAgICAgICAgICAgICAgaGFzX25leHRfdG91cixcbiAgICAgICAgICAgICAgICA1ICsgc2hvd190b3RhbF9zY29yZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLnByb3BzLnRhYmxlW2lkeF07XG4gICAgICAgICAgICByb3dzLnB1c2goXG4gICAgICAgICAgICAgICAgPFJvd1xuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgZGpzX21hcCB9XG4gICAgICAgICAgICAgICAgICAgIGtleT17IHJvdy5ydW4uaWQgfVxuICAgICAgICAgICAgICAgICAgICByb3c9eyByb3cgfVxuICAgICAgICAgICAgICAgICAgICBzaG93VG90YWxTY29yZT17IHNob3dfdG90YWxfc2NvcmUgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlJlc3VsdHNUYWJsZTFcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTYgbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMzAgcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9uYW1lXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNsdWJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9jbHViXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzaG93X3RvdGFsX3Njb3JlID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0xOCBzY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04IGNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVzdWx0c1RhYmxlMS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTFcIjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbHVtbnNXaWR0aHMge1xyXG4gICAgY29uc3RydWN0b3Iobl9qdWRnZXMsIGhhc190b3RhbF9zY29yZSkge1xyXG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDU1IC8gKG5fanVkZ2VzICsgMSkpO1xyXG4gICAgICAgIHRoaXMudG90YWxfc2NvcmVfd2lkdGggPSBoYXNfdG90YWxfc2NvcmUgPyAxNCA6IDA7XHJcbiAgICAgICAgdGhpcy5wbGFjZV93aWR0aCA9IDY7XHJcbiAgICAgICAgdGhpcy5udW1iZXJfd2lkdGggPSAzO1xyXG4gICAgICAgIHRoaXMubmFtZV93aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiAobl9qdWRnZXMgKyAxKSAtXHJcbiAgICAgICAgICAgIHRoaXMudG90YWxfc2NvcmVfd2lkdGggLSB0aGlzLnBsYWNlX3dpZHRoIC0gdGhpcy5udW1iZXJfd2lkdGg7XHJcbiAgICB9XHJcbiAgICBnZW5QbGFjZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbk51bWJlclN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLm51bWJlcl93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5OYW1lU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubmFtZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5Ub3RhbFNjb3JlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMudG90YWxfc2NvcmVfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuSnVkZ2VTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5qdWRnZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbGluZURpc2NpcGxpbmVKdWRnZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NlX3RvdGFsX3Njb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2hvd1RvdGFsU2NvcmU6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpc0Zvcm1hdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwO1xuICAgIH1cblxuICAgIGdldENhcmQoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwi4oCUXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnRvdGFsX3BlbmFsdHkudG9GaXhlZCgpO1xuICAgIH1cbiAgICByZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LmFkZGl0aW9uYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7IGAgKCR7c2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDEpfSlgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmUoZGlzY2lwbGluZV9qdWRnZSwgc2NvcmUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICZtZGFzaDtcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUgPT09IFwiZGFuY2VfanVkZ2VcIiAmJiB0aGlzLmlzRm9ybWF0aW9uKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICB7IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmVDZWxsKCkge1xuICAgICAgICBjb25zdCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1RvdGFsU2NvcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICZtZGFzaDtcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgY29uc3QgcF9zY29yZSA9IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgY29uc3Qgc19zY29yZSA9IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYCR7XyhcInJlc3VsdHMubGFiZWxzLmZ3X3Njb3JlX3Nob3J0XCIpIH06ICR7cF9zY29yZX0gLyAke3Nfc2NvcmV9YCB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2VtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7eyBcIi8gXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwO3sgXCIvIFwiIH1cbiAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySnVkZ2VzU2NvcmVzKCkge1xuICAgICAgICBjb25zdCBzY29yZXNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLm1hcChzY29yZSA9PiBbc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCwgc2NvcmVdKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmxpbmVEaXNjaXBsaW5lSnVkZ2VzLm1hcCgoZGosIGlkeCkgPT5cbiAgICAgICAgICAgIDx0ZCBrZXk9eyBkaiA/IGRqLmlkIDogYEkke2lkeH1gIH0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlKGRqLCBzY29yZXNfbWFwLmdldChkai5pZCkpIH1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucGxhY2UgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50KSB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVG90YWxTY29yZUNlbGwoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckp1ZGdlc1Njb3JlcygpIH1cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldENhcmQoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJvdy5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTJfUm93XCI7XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIjtcclxuaW1wb3J0IENvbHVtbnNXaWR0aHMgZnJvbSBcIi4vQ29sdW1uc1dpZHRoc1wiO1xyXG5cclxuaW1wb3J0IGdldEp1ZGdlVGFibGVNYXJrIGZyb20gXCJnZXRKdWRnZVRhYmxlTWFya1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1RhYmxlMiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBhZHZhbmNlczogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyYW5zZm9ybURvY3goZG9jeCkge1xyXG4gICAgICAgIGRvY3hcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Um93U3RhdHVzKHJvdykge1xyXG4gICAgICAgIGlmICghcm93KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJub3RfcGVyZm9ybWVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3cuYWR2YW5jZXMgPyBcImFkdmFuY2VkXCIgOiBcIm5vdF9hZHZhbmNlZFwiO1xyXG4gICAgfVxyXG4gICAgZ2V0U3RhdHVzSGVhZGVyKHJvd19zdGF0dXMpIHtcclxuICAgICAgICByZXR1cm4gXyhgcmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c18ke3Jvd19zdGF0dXN9YCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3csIGhhc19uZXh0X3RvdXIsIG5fY29scykge1xyXG4gICAgICAgIGNvbnN0IHByZXZfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMocHJldl9yb3cpO1xyXG4gICAgICAgIGNvbnN0IG5leHRfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMobmV4dF9yb3cpO1xyXG4gICAgICAgIGlmIChwcmV2X3N0YXR1cyA9PT0gbmV4dF9zdGF0dXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXh0X3N0YXR1cyAhPT0gXCJub3RfcGVyZm9ybWVkXCIgJiYgIWhhc19uZXh0X3RvdXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgQUgke25leHRfcm93LnJ1bi5pZH1gIH0+XHJcbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RhdHVzSGVhZGVyKG5leHRfc3RhdHVzKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNob3dfdG90YWxfc2NvcmUgPSBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZihcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMDtcclxuICAgICAgICBjb25zdCBsaW5lX2p1ZGdlcyA9IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLmZpbHRlcihcclxuICAgICAgICAgICAgZGogPT4gW1wiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCJdLmluZGV4T2YoZGoucm9sZSkgPj0gMCk7XHJcbiAgICAgICAgY29uc3QgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XHJcbiAgICAgICAgY29uc3Qgd2lkdGhzID0gbmV3IENvbHVtbnNXaWR0aHMobGluZV9qdWRnZXMubGVuZ3RoLCBzaG93X3RvdGFsX3Njb3JlKTtcclxuICAgICAgICBjb25zdCBkanNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZGogPT4gW2RqLmlkLCBkal0pKTtcclxuICAgICAgICBsZXQgcm93cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcHMudGFibGUubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4IC0gMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRhYmxlW2lkeF0sXHJcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxyXG4gICAgICAgICAgICAgICAgNCArIGxpbmVfanVkZ2VzLmxlbmd0aCArIHNob3dfdG90YWxfc2NvcmVcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaChcclxuICAgICAgICAgICAgICAgIDxSb3dcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgZGpzX21hcCB9XHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgdGhpcy5wcm9wcy50YWJsZVtpZHhdLnJ1bi5pZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZURpc2NpcGxpbmVKdWRnZXM9eyBsaW5lX2p1ZGdlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy50YWJsZVtpZHhdIH1cclxuICAgICAgICAgICAgICAgICAgICBzaG93VG90YWxTY29yZT17IHNob3dfdG90YWxfc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJSZXN1bHRzVGFibGUyXCI+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIiBzdHlsZT17IHdpZHRocy5nZW5OdW1iZXJTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHN0eWxlPXsgd2lkdGhzLmdlbk5hbWVTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNob3dfdG90YWxfc2NvcmUgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuVG90YWxTY29yZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsaW5lX2p1ZGdlcy5tYXAoZGogPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGgga2V5PXsgZGouaWQgfSBzdHlsZT17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGdldEp1ZGdlVGFibGVNYXJrKGRqKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm93cyB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlc3VsdHNUYWJsZTIuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUyXCI7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbHVtbnNXaWR0aHMge1xyXG4gICAgY29uc3RydWN0b3Iobl9qdWRnZXMpIHtcclxuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg3MCAvIG5fanVkZ2VzKTtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gN1xyXG4gICAgICAgIHRoaXMuaW5mb193aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtIHRoaXMucGxhY2Vfd2lkdGg7XHJcbiAgICB9XHJcbiAgICBnZW5QbGFjZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkluZm9TdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5pbmZvX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3JvU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9uczogUFQuYXJyYXlPZihQVC5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5hY3JvX25cIiwgaWR4ICsgMSkgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUoc2NvcmUsIFwiLSQlXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZmRcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5BY3JvU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19BY3JvU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X3dvbWFuOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmd19tYW46IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yaW5nVHlwZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY29yZV9mb3JtYXQgPSB0aGlzLnByb3BzLnNjb3JpbmdUeXBlID09PSBcImRhbmNlX2hhbHZlZFwiID8gXCJAXCIgOiBcIiRcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmZ3XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5md193b21hbiwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmZ3X21hbiwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIHNjb3JlX2Zvcm1hdCkgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uY1wiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmNvbXBvc2l0aW9uLCBzY29yZV9mb3JtYXQpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93X0RhbmNlU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25BY3JvU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBwbGFjZXM6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV90ZWNoOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXByZXNzaW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmFcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmFjcm9iYXRpY3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfdGVjaCwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uaVwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuc21hbGxfbWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnBcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5yb3cuYWRkaXRpb25hbF9kYXRhLnBsYWNlc1t0aGlzLnByb3BzLnNjb3JlLmlkXSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Gb3JtYXRpb25BY3JvU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25BY3JvU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbF9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlczogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuaW1wcmVzc2lvbiwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMucm93LmFkZGl0aW9uYWxfZGF0YS5wbGFjZXNbdGhpcy5wcm9wcy5zY29yZS5pZF0gfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZvQ2VsbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgYWNyb2JhdGljczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0aW9uX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BvcnRzbWVuOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0Q2FyZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCLigJRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUudG90YWxfcGVuYWx0eS50b0ZpeGVkKCk7XG4gICAgfVxuICAgIHJlbmRlclBhcnRpY2lwYW50SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50KSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoZWFkX2p1ZGdlX3Njb3JlID0gdGhpcy5wcm9wcy5yb3cucnVuLnNjb3Jlcy5maW5kKFxuICAgICAgICAgICAgc2NvcmUgPT4gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwLmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKS5yb2xlID09PSBcImhlYWRfanVkZ2VcIik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IGAke18oXCJyZXN1bHRzLmxhYmVscy5wZW5hbHR5XCIpfTogYCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyB0aGlzLmdldENhcmQoKSB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoW1wicm9zZmFyci5hY3JvXCIsIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFzX2Fjcm9fb3ZlcnJpZGVzID0gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MuZmluZEluZGV4KFxuICAgICAgICAgICAgZWxlbWVudCA9PiBlbGVtZW50LnNjb3JlICE9PSBlbGVtZW50Lm9yaWdpbmFsX3Njb3JlXG4gICAgICAgICkgPiAwO1xuICAgICAgICBjb25zdCBhY3JvX2NlbGxfd2lkdGggPSBgJHsoMTAwIC8gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MubGVuZ3RoKX0lYDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NfdmVyYm9zZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH06XG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYWNyby10YWJsZVwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLm9yaWdpbmFsX3Njb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlcyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8uc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NGd1Njb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKTtcbiAgICAgICAgY29uc3Qgc19zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyBgOiAke3Bfc2NvcmV9IC8gJHtzX3Njb3JlfWAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcF9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IHNfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5hY3JvX3Njb3JlXCIpIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7IGA6ICR7cF9zY29yZX0gLyAke3Nfc2NvcmV9YCB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIil9OiAke3RoaXMucHJvcHMucm93LnJ1bi50b3RhbF9zY29yZX1gIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPGVtPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5ub3RfcGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2VtPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlck5leHRUb3VyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpfTogYCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgICAgICA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKVxuICAgICAgICAgICAgICAgICAgICA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiaW5mby1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0aWNpcGFudEluZm8oKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRKdWRnZVBlbmFsdHkoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQW1DbGFzc0Z3U2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0VG91ckxhYmVsKCkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkluZm9DZWxsLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19JbmZvQ2VsbFwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U2NvcmUoc2NvcmUsIHRlbXBsYXRlPVwiJFwiKSB7XG4gICAgaWYgKHNjb3JlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIuKAlFwiO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCIkXCIsIHNjb3JlKVxuICAgICAgICAucmVwbGFjZShcIkBcIiwgc2NvcmUudG9GaXhlZCgxKSk7XG59XG4iLCJpbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xuXG5pbXBvcnQgSW5mb0NlbGwgZnJvbSBcIi4vSW5mb0NlbGxcIjtcbmltcG9ydCBBY3JvU2NvcmUgZnJvbSBcIi4vQWNyb1Njb3JlXCI7XG5pbXBvcnQgRGFuY2VTY29yZSBmcm9tIFwiLi9EYW5jZVNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uQWNyb1Njb3JlIGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9TY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0Zvcm1hdGlvblNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NlX3RvdGFsX3Njb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclNjb3JlKGRpc2NpcGxpbmVfanVkZ2UsIHNjb3JlKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAmbWRhc2g7XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgU2NvcmVDb21wb25lbnQgPSBudWxsO1xuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSk7XG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYW5jZVwiOlxuICAgICAgICBjYXNlIFwiZGFuY2VfaGFsdmVkXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IERhbmNlU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFjcm9cIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gQWNyb1Njb3JlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gRm9ybWF0aW9uU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IEZvcm1hdGlvbkFjcm9TY29yZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgIHJvdzogdGhpcy5wcm9wcy5yb3csXG4gICAgICAgICAgICBzY29yaW5nVHlwZTogc2NvcmluZ190eXBlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNjb3JlQ29tcG9uZW50IHsgLi4ucHJvcHMgfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJKdWRnZXNTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMubWFwKHNjb3JlID0+IFtzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzY29yZV0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluZURpc2NpcGxpbmVKdWRnZXMubWFwKChkaiwgaWR4KSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGRqID8gZGouaWQgOiBgSSR7aWR4fWAgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUoZGosIHNjb3Jlc19tYXAuZ2V0KGRqLmlkKSkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDxJbmZvQ2VsbFxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwIH1cbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5yb3cgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJKdWRnZXNTY29yZXMoKSB9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19Sb3dcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5pbXBvcnQgQ29sdW1uc1dpZHRocyBmcm9tIFwiLi9Db2x1bW5zV2lkdGhzXCI7XHJcblxyXG5pbXBvcnQgZ2V0SnVkZ2VUYWJsZU1hcmsgZnJvbSBcImdldEp1ZGdlVGFibGVNYXJrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZXM6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgbmV4dF90b3VyX2lkOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XHJcbiAgICAgICAgZG9jeFxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcInBhZGRpbmdcIiwgXCIwIDNwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duXCIsIFwid2lkdGhcIiwgXCI1MHB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmVfanVkZ2VzID0gdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKFxyXG4gICAgICAgICAgICBkaiA9PiBbXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIl0uaW5kZXhPZihkai5yb2xlKSA+PSAwKTtcclxuICAgICAgICBjb25zdCB3aWR0aHMgPSBuZXcgQ29sdW1uc1dpZHRocyhsaW5lX2p1ZGdlcy5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGRqc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLm1hcChkaiA9PiBbZGouaWQsIGRqXSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlJlc3VsdHNUYWJsZTNcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuSW5mb1N0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGluZV9qdWRnZXMubWFwKGRqID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBnZXRKdWRnZVRhYmxlTWFyayhkaikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudGFibGUubWFwKHJvdyA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyByb3cucnVuLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlcz17IGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9eyByb3cgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlc3VsdHNUYWJsZTMuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzXCI7XHJcbiIsInZhciBDYWNoZU1peGluID0gQmFzZSA9PiBjbGFzcyBleHRlbmRzIEJhc2Uge1xuICAgIHJlc2V0Q2FjaGUoKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgIH1cbiAgICBmZXRjaEZyb21DYWNoZShrZXksIGdlbmVyYXRvcikge1xuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jYWNoZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBnZW5lcmF0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVba2V5XTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWNoZU1peGluO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnREaXNwbGF5KHBhcnRpY2lwYW50KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZGlzcGxheS1uYW1lXHJcbiAgICBpZiAocGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgIHsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJ0aWNpcGFudC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+XHJcbiAgICAgICAgPHAga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgIHsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICBzd2l0Y2ggKGRpc2NpcGxpbmVfanVkZ2Uucm9sZSkge1xyXG4gICAgY2FzZSBcImRhbmNlX2p1ZGdlXCI6XHJcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvblwiO1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvbl9hY3JvXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuc2ltcGxpZmllZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJzaW1wbGlmaWVkXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlX2hhbHZlZFwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcImFjcm9fanVkZ2VcIjpcclxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9md1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZV9oYWx2ZWRcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJhY3JvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcInRlY2hfanVkZ2VcIjpcclxuICAgICAgICByZXR1cm4gXCJ0ZWNoXCI7XHJcbiAgICBjYXNlIFwiaGVhZF9qdWRnZVwiOlxyXG4gICAgICAgIHJldHVybiBcImhlYWRcIjtcclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiBnZXRKdWRnZVRhYmxlTWFyayhkaXNjaXBsaW5lX2p1ZGdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGRpc2NpcGxpbmVfanVkZ2UuanVkZ2UubnVtYmVyO1xuICAgIGlmIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSB7XG4gICAgICAgIHJlc3VsdCArPSBcIiAoQSlcIjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0SnVkZ2VUYWJsZU1hcms7XG4iLCJpbXBvcnQgdHJhbnNsYXRlX3J1IGZyb20gXCIuL3J1XCI7XHJcblxyXG5jb25zdCBfID0gdHJhbnNsYXRlX3J1XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCAuLi5hcmdzKSB7XG4gICAgbGV0IFBIUkFTRVMgPSB7XG4gICAgICAgIFwiYWRtaW5cIjoge1xuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInRhYmxldFwiOiB7XG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjoge1xuICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gYNCQ0LrRgNC+0LHQsNGC0LjQutCwICR7biArIDF9YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRg1wiLFxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3N0b3B3YXRjaFwiOiBcItCh0YLQsNGA0YJcIixcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YNcIixcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IHtcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxuICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXG4gICAgICAgICAgICAgICAgXCJjb21wb3NpdGlvblwiOiBcItCa0L7QvNC/0L7Qt9C40YbQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxuICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtX2ZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMylcIixcbiAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV9iaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zKVwiLFxuICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcbiAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXG4gICAgICAgICAgICAgICAgXCJpbXByZXNzaW9uXCI6IFwi0J7QsdGJ0LXQtSDQstC/0LXRh9Cw0YLQu9C10L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcbiAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1pbmdcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LXRglwiLFxuICAgICAgICAgICAgICAgIFwianVkZ2VfbnVtYmVyXCI6IChuKSA9PiBg0KHRg9C00YzRjyDihJYke259YCxcbiAgICAgICAgICAgICAgICBcImhlYXRfbnVtYmVyXCI6IChuLCB0KSA9PiBg0JfQsNGF0L7QtCAke259INC40LcgJHt0fWAsXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJrX25vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRfbm90X3BlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcbiAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXG4gICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcbiAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcbiAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcbiAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxuICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcbiAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INGC0LXRhdC90LjRh9C10YHQutC40YUg0YHRg9C00LXQuVwiLFxuICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXG4gICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxuICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxuICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxuICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcbiAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IGDQodCx0YDQvtGBINC90LAgJHtufWAsXG4gICAgICAgICAgICAgICAgXCJ0aW1pbmdcIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcbiAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXG4gICAgICAgICAgICAgICAgXCJkYW5jaW5nXCI6IFwi0KLQsNC90LXRhlwiLFxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBcInJlc3VsdHNcIjoge1xuICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xuICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gYEEke259YCxcbiAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxuICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXG4gICAgICAgICAgICAgICAgXCJkZlwiOiBcItCi0KRcIixcbiAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXG4gICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXG4gICAgICAgICAgICAgICAgXCJmbVwiOiBcItCe0KXQvFwiLFxuICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcbiAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXG4gICAgICAgICAgICAgICAgXCJtXCI6IFwi0J7RiFwiLFxuICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXG4gICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcbiAgICAgICAgICAgICAgICBcInRcIjogXCLOo1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfYWR2YW5jZWRcIjogXCLQn9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXG4gICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxuICAgICAgICAgICAgICAgIFwiZndfc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0KLQnVwiLFxuICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXG4gICAgICAgICAgICAgICAgXCJuZXh0X3RvdXJcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NsdWJcIjogXCLQmtC70YPQsVwiLFxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxuICAgICAgICAgICAgICAgIFwicGVuYWx0eVwiOiBcItCo0YLRgNCw0YRcIixcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXG4gICAgICAgICAgICAgICAgXCJzdWJcIjogXCLQt9Cw0L9cIixcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0JjRgtC+0LNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobl9zcCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBg0KTQvtGA0LzQtdC50YjQvSDihJYke259YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGA6ICR7bmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG5fc3AgPT09IDIpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGDQn9Cw0YDQsCDihJYke259YFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBg0KPRh9Cw0YHRgtC90LjQuiDihJYke259YFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBg0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEliR7bn1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNfbmFtZXNcIjoge1xuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcbiAgICAgICAgICAgICAgICBcImJhc2VfbmFtZVwiOiBcItCg0L7RgdCk0JDQoNCgXCIsXG4gICAgICAgICAgICAgICAgXCJhY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvblwiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INCx0LXQtyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcbiAgICAgICAgICAgICAgICBcInNpbXBsaWZpZWRcIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YPQv9GA0L7RidC10L3QvdCw0Y8g0YHQuNGB0YLQtdC80LAgKDHigJM0MClcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xuICAgICAgICAgICAgXCJcIjogXCItXCIsXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xuICAgIGZvciAoY29uc3QgY2h1bmsgb2YgcGF0aCkge1xuICAgICAgICBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua107XG4gICAgICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yICR7c3JjfWApO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHBocmFzZV9wdHIoLi4uYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xufVxuXG50cmFuc2xhdGUudG91cl9uYW1lX3N1Z2dlc3Rpb25zID0gW1xuICAgIFwi0KTQuNC90LDQu1wiLFxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxuICAgIFwi0J7RgtCx0L7RgNC+0YfQvdGL0Lkg0YLRg9GAXCIsXG4gICAgXCIxLzIg0YTQuNC90LDQu9CwXCIsXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXG4gICAgXCIxLzgg0YTQuNC90LDQu9CwXCIsXG4gICAgXCIxLzE2INGE0LjQvdCw0LvQsFwiLFxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXG4gICAgXCLQpNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxuXTtcbiIsImNvbnN0IG1ldGEgPSB7XG4gICAgXCJqdWRnZV9yb2xlc1wiOiBbXG4gICAgICAgIFwiZGFuY2VfanVkZ2VcIixcbiAgICAgICAgXCJhY3JvX2p1ZGdlXCIsXG4gICAgICAgIFwiaGVhZF9qdWRnZVwiLFxuICAgICAgICBcInRlY2hfanVkZ2VcIixcbiAgICBdLFxuICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IFtcbiAgICAgICAgXCJyb3NmYXJyLm5vX2Fjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLmFjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLmZvcm1hdGlvblwiLFxuICAgICAgICBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIixcbiAgICAgICAgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCIsXG4gICAgICAgIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIsXG4gICAgXSxcbiAgICBcInN1Z2dlc3RlZF9wcm9ncmFtc1wiOiBbXG4gICAgICAgIFwiZGVmYXVsdFwiLFxuICAgICAgICBcInF1YWxpZmljYXRpb25cIixcbiAgICAgICAgXCJxdWFydGVyZmluYWxcIixcbiAgICAgICAgXCJmaW5hbFwiLFxuICAgIF0sXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWV0YTtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUxIGZyb20gXCJSZXN1bHRzVGFibGUxXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUyIGZyb20gXCJSZXN1bHRzVGFibGUyXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUzIGZyb20gXCJSZXN1bHRzVGFibGUzXCI7XHJcbmltcG9ydCBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGZyb20gXCJEaXNjaXBsaW5lUmVzdWx0c1RhYmxlXCI7XHJcbmltcG9ydCBKdWRnZVRhYmxldCBmcm9tIFwiSnVkZ2VUYWJsZXRcIjtcclxuaW1wb3J0IEFkbWluU2NvcmVJbnB1dCBmcm9tIFwiQWRtaW5TY29yZUlucHV0XCI7XHJcbmltcG9ydCBnZXRKdWRnZVRhYmxlTWFyayBmcm9tIFwiZ2V0SnVkZ2VUYWJsZU1hcmtcIjtcclxuaW1wb3J0IG1ldGEgZnJvbSBcIm1ldGFcIjtcclxuXHJcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5jb25zdCByZXNwb25zZSA9IHdpbmRvdy5yZWdpc3RlclJ1bGVzU2V0KFwiUm9zRkFSUlwiLCB7XHJcbiAgICBtZXRhOiBtZXRhLFxyXG4gICAgdHJhbnNsYXRlOiBfLFxyXG4gICAgdG91cl9yZXN1bHRzX3RhYmxlXzE6IFJlc3VsdHNUYWJsZTEsXHJcbiAgICB0b3VyX3Jlc3VsdHNfdGFibGVfMjogUmVzdWx0c1RhYmxlMixcclxuICAgIHRvdXJfcmVzdWx0c190YWJsZV8zOiBSZXN1bHRzVGFibGUzLFxyXG4gICAgZGlzY2lwbGluZV9yZXN1bHRzX3RhYmxlOiBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxyXG4gICAganVkZ2VfdGFibGV0OiBKdWRnZVRhYmxldCxcclxuICAgIGFkbWluX3Njb3JlX2lucHV0OiBBZG1pblNjb3JlSW5wdXQsXHJcbiAgICBnZXRfanVkZ2VfdGFibGVfbWFyazogZ2V0SnVkZ2VUYWJsZU1hcmssXHJcbn0pO1xyXG5cclxuc2V0dXAocmVzcG9uc2UpO1xyXG4iXX0=
