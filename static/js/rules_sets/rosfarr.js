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
    var close_on_confirm = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

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
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TechFormationJudgeScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TechFormationJudgeScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TechJudgeScore);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TechJudgeScore)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmission = function (data) {
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AdminScoreInput).apply(this, arguments));
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

},{"./Mistakes":39,"./ScorePart":40,"JudgeTablet/TotalScore":82,"l10n":102}],42:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./ScoringLayout":41,"JudgeTablet/GeneralLayout":55,"dup":38}],43:[function(require,module,exports){
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
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ActionsPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ActionsPage)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.stopTour = function () {
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
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                tour: PT.shape.isRequired
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TechJudgeScore).apply(this, arguments));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsPage).apply(this, arguments));
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

},{"./StopWatch":79,"JudgeTablet/ConfirmationButton":34,"common/CacheMixin":98,"l10n":102,"tablet_ui/IntegerInput":4,"tablet_ui/SelectorInput":7}],79:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DancingPage).apply(this, arguments));
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TechJudgeLayout).call(this, props));

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
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

},{"common/getParticipantDisplay":99,"l10n":102}],95:[function(require,module,exports){
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
                    return "Сброс на " + n;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcbGliXFxjb21tb25cXGRpYWxvZ3NcXGNsb3NlRGlhbG9nLmpzeCIsInNyY1xcanN4XFxsaWJcXGNvbW1vblxcZGlhbG9nc1xcc2hvd0NvbmZpcm0uanN4Iiwic3JjXFxqc3hcXGxpYlxcY29tbW9uXFxtYWtlQ2xhc3NOYW1lLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcSW50ZWdlcklucHV0LmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcTnVtYmVyU2VsZWN0b3JJbnB1dC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXFNlbGVjdG9ySW5wdXRcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXGxpYlxcdGFibGV0X3VpXFxTZWxlY3RvcklucHV0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXFNsaWRlci5qc3giLCJzcmNcXGpzeFxcbGliXFx0YWJsZXRfdWlcXG9uVG91Y2hFbmRPckNsaWNrLmpzeCIsInNyY1xcanN4XFxsaWJcXHRhYmxldF91aVxcb25Ub3VjaE9yQ2xpY2suanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxBY3JvU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxDb25maXJtYXRpb25CdXR0b24uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxEYW5jZUhhbHZlZFNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcRGFuY2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEZvcm1hdGlvbkFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcR2VuZXJhbEVkaXRvclxcSXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXEdlbmVyYWxFZGl0b3JcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxIZWFkSnVkZ2VTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXFNpbXBsaWZpZWRTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXFRlY2hKdWRnZUZvcm1hdGlvblNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXEVkaXRvclxcVGVjaEp1ZGdlU2NvcmUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEFkbWluU2NvcmVJbnB1dFxcRWRpdG9yXFxnZW5TY2FsZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxFZGl0b3JcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxBZG1pblNjb3JlSW5wdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxIb3N0TW9kdWxlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXEVsZW1lbnRzXFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcRWxlbWVudHNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcTWlzdGFrZXMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQ29uZmlybWF0aW9uQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxTY29yZVBhcnQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxEYW5jZUxheW91dFxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb290ZXJcXEJ1dHRvbi5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcRm9vdGVySXRlbS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25BY3JvTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxNaXN0YWtlcy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkxheW91dFxcU2NvcmluZ0xheW91dFxcU2NvcmVQYXJ0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdlbmVyYWxMYXlvdXRcXFBhcnRpY2lwYW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcR2VuZXJhbExheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHZW5lcmFsU2NhbGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHcmlkLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxBY3Rpb25zUGFnZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxBY3JvYmF0aWNPdmVycmlkZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXExpbmVKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTGluZUp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTm90UGVyZm9ybWVkU3dpdGNoXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxQZW5hbHR5SW5wdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcUHJldmlvdXNQZW5hbHRpZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXFRlY2hKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcVGVjaEp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXFJlc3VsdHNQYWdlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRlci5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFNpbXBsaWZpZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxTY29yaW5nTGF5b3V0XFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcU2NvcmluZ0xheW91dFxcT3ZlcnJpZGVJbnB1dC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcQWNyb1BhZ2VcXFNjb3JpbmdMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxTY29yaW5nTGF5b3V0LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxEYW5jaW5nUGFnZVxcU3RvcFdhdGNoLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxEYW5jaW5nUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVG90YWxTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUxXFxSb3cuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTFcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUyXFxDb2x1bW5zV2lkdGhzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUyXFxSb3cuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXFJlc3VsdHNUYWJsZTJcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxDb2x1bW5zV2lkdGhzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxEYW5jZVNjb3JlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxSb3dcXEZvcm1hdGlvbkFjcm9TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxGb3JtYXRpb25TY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxJbmZvQ2VsbC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxmb3JtYXRTY29yZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcQ2FjaGVNaXhpbi5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxnZXRQYXJ0aWNpcGFudERpc3BsYXkuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcZ2V0U2NvcmluZ1R5cGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGdldEp1ZGdlVGFibGVNYXJrLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxsMTBuXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcbDEwblxccnUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXG1ldGEuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXHJvb3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCO0FBQVQsU0FBUyxXQUFULEdBQXVCO0FBQ2xDLFNBQUssS0FBTCxHQURrQztDQUF2Qjs7Ozs7Ozs7a0JDRVM7Ozs7Ozs7O0FBQVQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCLE1BQTlCLEVBQThEO1FBQXhCLHlFQUFpQixxQkFBTzs7QUFDekUsV0FBTyxLQUFLO0FBQ1IsZUFBTyxPQUFQO0FBQ0EsbUJBQVcsS0FBWDtBQUNBLDBCQUFrQixJQUFsQjtBQUNBLDJCQUFtQixvQkFBRSxtQkFBRixDQUFuQjtBQUNBLDBCQUFrQixvQkFBRSxrQkFBRixDQUFsQjtBQUNBLHdCQUFnQixnQkFBaEI7S0FORyxFQU9KLE1BUEksQ0FBUCxDQUR5RTtDQUE5RDs7Ozs7Ozs7a0JDRlM7QUFBVCxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsRUFBNkI7QUFDeEMsV0FBTyxPQUFPLElBQVAsQ0FBWSxJQUFaLEVBQ0YsTUFERSxDQUNLO2VBQU0sS0FBSyxFQUFMO0tBQU4sQ0FETCxDQUVGLElBRkUsQ0FFRyxHQUZILENBQVAsQ0FEd0M7Q0FBN0I7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TztBQUNULG1CQUFlLENBQ1gsYUFEVyxFQUVYLFlBRlcsRUFHWCxZQUhXLEVBSVgsWUFKVyxDQUFmO0FBTUEsdUJBQW1CLENBQ2YsaUJBRGUsRUFFZixjQUZlLEVBR2YsbUJBSGUsRUFJZix3QkFKZSxFQUtmLG9CQUxlLEVBTWYscUJBTmUsRUFPZix1QkFQZSxDQUFuQjtBQVNBLDBCQUFzQixDQUNsQixTQURrQixFQUVsQixlQUZrQixFQUdsQixjQUhrQixFQUlsQixPQUprQixDQUF0Qjs7Q0FoQkU7O2tCQXlCUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmYsSUFBTSxXQUFXLE9BQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUM7QUFDaEQsd0JBRGdEO0FBRWhELDZCQUZnRDtBQUdoRCxnREFIZ0Q7QUFJaEQsZ0RBSmdEO0FBS2hELGdEQUxnRDtBQU1oRCw4REFOZ0Q7QUFPaEQsdUNBUGdEO0FBUWhELGdEQVJnRDtBQVNoRCxxREFUZ0Q7Q0FBbkMsQ0FBWDs7QUFZTix3QkFBTSxRQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb3NlRGlhbG9nKCkge1xuICAgIHN3YWwuY2xvc2UoKTtcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xuICAgIHJldHVybiBzd2FsKHtcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxuICAgICAgICBjbG9zZU9uQ29uZmlybTogY2xvc2Vfb25fY29uZmlybSxcbiAgICB9LCBhY3Rpb24pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZUNsYXNzTmFtZShkYXRhKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAgIC5maWx0ZXIoY24gPT4gZGF0YVtjbl0pXG4gICAgICAgIC5qb2luKFwiIFwiKTtcbn1cbiIsImltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5pbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcIi4vb25Ub3VjaE9yQ2xpY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFBULmJvb2wsXG4gICAgICAgICAgICB2YWx1ZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkNoYW5nZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTWludXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XCJkZWx0YVwiOiAtMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLnZhbHVlIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlUGx1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHtcImRlbHRhXCI6IDF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy52YWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwiSW50ZWdlcklucHV0XCI6IHRydWUsXG4gICAgICAgICAgICBcInJlYWQtb25seVwiOiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyB0aGlzLmdldENsYXNzTmFtZSgpIH0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVNaW51cykgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlUGx1cykgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbkludGVnZXJJbnB1dC5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX0ludGVnZXJJbnB1dFwiO1xuIiwiaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcIi4vU2VsZWN0b3JJbnB1dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOdW1iZXJTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXg6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWluOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHN0ZXA6IFBULm51bWJlcixcbiAgICAgICAgICAgIGRlY2ltYWxTaXplOiBQVC5udW1iZXIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIGRlY2ltYWxTaXplOiAwLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG1ha2VDaG9pY2VzKG1pbiwgbWF4LCBzdGVwLCBkZWNpbWFsX3NpemUpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSA9IG1pbjsgdmFsdWUgPD0gbWF4OyB2YWx1ZSArPSBzdGVwKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdmFsdWUudG9GaXhlZChkZWNpbWFsX3NpemUpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW051bWJlcih0ZXh0KSwgdGV4dF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwLCBkZWNpbWFsU2l6ZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLm1ha2VDaG9pY2VzKG1pbiwgbWF4LCBzdGVwLCBkZWNpbWFsU2l6ZSkgfVxuICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuTnVtYmVyU2VsZWN0b3JJbnB1dC5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX051bWJlclNlbGVjdG9ySW5wdXRcIjtcbiIsImltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwiLi4vb25Ub3VjaE9yQ2xpY2tcIjtcblxuaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRleHQ6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBvbkNsaWNrOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMudmFsdWUpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xuICAgICAgICAgICAgXCJ0YnRuXCI6IHRydWUsXG4gICAgICAgICAgICBcInNjb3JlLWJ0blwiOiB0cnVlLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdGhpcy5wcm9wcy5hY3RpdmUsXG4gICAgICAgICAgICBcInJlYWQtb25seVwiOiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfVxuICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVDbGljaykgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50ZXh0IH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSXRlbS5kaXNwbGF5TmFtZSA9IFwidGFibGV0X3VpX1NlbGVjdG9ySW5wdXRfSXRlbVwiO1xuIiwiaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5cbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hvaWNlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICBQVC5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLFxuICAgICAgICAgICAgcm93U2l6ZTogUFQubnVtYmVyLFxuICAgICAgICAgICAgc3R5bGU6IFBULm9uZU9mKFtcImdyaWRcIiwgXCJvbmUtbGluZVwiLCBcInR3by1saW5lc1wiXSksXG4gICAgICAgICAgICB2YWx1ZTogUFQub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgcm93U2l6ZTogMTAsXG4gICAgICAgICAgICBzdHlsZTogXCJvbmUtbGluZVwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dTaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc05hbWUoe1xuICAgICAgICAgICAgXCJTZWxlY3RvcklucHV0XCI6IHRydWUsXG4gICAgICAgICAgICBcIm9uZS1yb3dcIjogdGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIixcbiAgICAgICAgICAgIFwidHdvLXJvd3NcIjogdGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJ0d28tbGluZXNcIixcbiAgICAgICAgICAgIFwic2VsZWN0ZWRcIjogdGhpcy5wcm9wcy52YWx1ZSAhPT0gbnVsbCxcbiAgICAgICAgICAgIFtgbi0ke3RoaXMuZ2V0QnV0dG9uc0NvdW50KCl9YF06IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcHMuY2hvaWNlcy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiZcbiAgICAgICAgICAgICAgICBpZHggIT09IDAgJiZcbiAgICAgICAgICAgICAgICBpZHggJSB0aGlzLnByb3BzLnJvd1NpemUgPT09IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICA8YnIga2V5PXsgYGJyJHtpZHh9YCB9IC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgdGV4dF0gPSB0aGlzLnByb3BzLmNob2ljZXNbaWR4XTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17IHZhbHVlID09PSB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dD17IHRleHQgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMucHJvcHMub25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5nZXRDbGFzc05hbWUoKSB9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TZWxlY3RvcklucHV0LmRpc3BsYXlOYW1lID0gXCJ0YWJsZXRfdWlfU2VsZWN0b3JJbnB1dFwiO1xuIiwiaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbmU6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGRvbmVUZXh0OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkFjdGl2YXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGluID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZyZWUoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS50b3VjaCAmJiAhdGhpcy5wcm9wcy5kb25lICYmICF0aGlzLnN0YXRlLmZpbmlzaGVkO1xuICAgIH1cblxuICAgIGdldE91dGVyVGV4dE9wYWNpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCgxMDAgLSB0aGlzLnN0YXRlLnBvc2l0aW9uLCAwKSwgMTAwKTtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAvIDEwMCkudG9GaXhlZCgzKTtcbiAgICB9XG4gICAgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIGxldCByZXMgPSAwO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmVzICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBnZXRUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRTbGlkZXJQb3MoZXZlbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0VG91Y2goZXZlbnQpIC0gdGhpcy5waW47XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCAyMDApO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2lzaW9uOiAyMDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xuICAgIH1cbiAgICBoYW5kbGVUb3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVUb3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlVG91Y2hFbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucG9zaXRpb24gPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVGV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImRvbmUtdGV4dFwiIH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7IGNvbG9yOiBcInJnYigxMDAsMTAwLDEwMClcIiB9IH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgbWFrZUNsYXNzTmFtZSh7IFwic2xpZGUtdGV4dFwiIDogdHJ1ZSwgXCJmcmVlXCI6IHRoaXMuaXNGcmVlKCkgfSkgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHsgY29sb3I6IGByZ2JhKDEwMCwxMDAsMTAwLCR7dGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCl9KWAgfSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2xpZGVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU2xpZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBtYWtlQ2xhc3NOYW1lKHsgXCJpbm5lclwiOiB0cnVlLCBcImZyZWVcIjogdGhpcy5pc0ZyZWUoKSB9KSB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXsgeyBsZWZ0OiAodGhpcy5wcm9wcy5kb25lIHx8IHRoaXMuc3RhdGUuZmluaXNoZWQpID8gXCIyMDBweFwiIDogYCR7dGhpcy5zdGF0ZS5wb3NpdGlvbn1weGAgfSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsaWNrIH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMuaGFuZGxlVG91Y2hFbmQgfVxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMuaGFuZGxlVG91Y2hNb3ZlIH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0IH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKGklxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUZXh0KCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TbGlkZXIuZGlzcGxheU5hbWUgPSBcInRhYmxldF91aV9TbGlkZXJcIjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uVG91Y2hFbmRPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICBsZXQgZGlzdGFuY2UgPSAwO1xuICAgIGxldCBsYXRlc3RfcG9zID0gWzAsIDBdO1xuICAgIGxldCBmaXJlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBfaGFuZGxlcigpO1xuICAgIH1cbiAgICBsZXQgZGlzY2FyZCA9ICgpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICB9XG4gICAgbGV0IG1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnRfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgICAgICBsZXQgc3FyID0gKHgpID0+IHggKiB4O1xuICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnNxcnQoc3FyKGN1cnJlbnRfcG9zWzBdIC0gbGF0ZXN0X3Bvc1swXSkgKyBzcXIoY3VycmVudF9wb3NbMV0gLSBsYXRlc3RfcG9zWzFdKSk7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBjdXJyZW50X3BvcztcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMjApIHtcbiAgICAgICAgICAgIGRpc2NhcmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICBkaXN0YW5jZSA9IDA7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogc3RhcnQsXG4gICAgICAgIG9uVG91Y2hFbmQ6IGZpcmUsXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBtb3ZlLFxuICAgICAgICBvblRvdWNoQ2FuY2VsOiBkaXNjYXJkLFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVyLFxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXG4gICAgICAgIG9uQ2xpY2s6IGYsXG4gICAgfVxufVxuIiwiaW1wb3J0IEdlbmVyYWxFZGl0b3IgZnJvbSBcIi4vR2VuZXJhbEVkaXRvclwiXG5pbXBvcnQgZ2VuU2NhbGUgZnJvbSBcIi4vZ2VuU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb25zOiBQVC5hcnJheU9mKFBULm51bWJlciksXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLnNsaWNlKCk7IC8vIGNsb25lXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgICAgICAgICBpZiAoa2V5WzBdID09PSBcIkFcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNfdmFsID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIHJlZHVjdGlvbnNbcGFyc2VJbnQoa2V5LnNsaWNlKDEpKV0gPSBzX3ZhbCA9PT0gXCJcIiA/IC0xIDogcGFyc2VJbnQoc192YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcmVkdWN0aW9uczogcmVkdWN0aW9ucyxcbiAgICAgICAgICAgIG1pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEubWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMubWFwKChyZWQsIGlkeCkgPT4gKHtcbiAgICAgICAgICAgIGtleTogYEEke2lkeH1gLFxuICAgICAgICAgICAgbGFiZWw6IGBBJHtpZHggKyAxfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9uc1tpZHhdID09PSBudWxsXG4gICAgICAgICAgICAgICAgPyBcIlwiXG4gICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9uc1tpZHhdLnRvU3RyaW5nKCksXG4gICAgICAgIH0pKTtcbiAgICAgICAgZmllbGRzLnB1c2godGhpcy5tYWtlRmllbGQoXCJtaXN0YWtlc1wiLCBcIkZEXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCB7IG1heDogMTAwIH0pKSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgZmllbGRzIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfRGFuY2VTY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybWF0aW9uQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb25maXJtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiY29uZmlybWF0aW9uLWJ1dHRvblwiO1xuICAgICAgICByZXN1bHQgKz0gdGhpcy5wcm9wcy5jb25maXJtZWQgPyBcIiBjb25maXJtZWRcIiA6IFwiIG5vdC1jb25maXJtZWRcIjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnByb3BzLm9uQ29uZmlybWF0aW9uVG9nZ2xlIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY29uZmlybWVkXG4gICAgICAgICAgICAgICAgICAgID8gXyhcImFkbWluLmJ1dHRvbnMudW5jb25maXJtX3Njb3JlXCIpXG4gICAgICAgICAgICAgICAgICAgIDogXyhcImFkbWluLmJ1dHRvbnMuY29uZmlybV9zY29yZVwiKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNvbmZpcm1hdGlvbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfQ29uZmlybWF0aW9uQnV0dG9uXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZUhhbHZlZFNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmd19tYW46ICAgICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBkYXRhW1wiZndfd29tYW5cIl0gICAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmZ3X3dvbWFuKSxcbiAgICAgICAgICAgIGZ3X21hbjogICAgICAgICBkYXRhW1wiZndfbWFuXCJdICAgICAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmZ3X21hbiksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgZGF0YVtcImRhbmNlX2ZpZ3NcIl0gID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBkYXRhW1wiY29tcG9zaXRpb25cIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmNvbXBvc2l0aW9uKSxcbiAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBwYXJzZUludChkYXRhLnNtYWxsX21pc3Rha2VzKSxcbiAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBwYXJzZUludChkYXRhLmJpZ19taXN0YWtlcyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImZ3X3dvbWFuXCIsICAgICAgIFwiRldcIiwgZ2VuU2NhbGUoXCI/cmVkdWN0aW9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJmd19tYW5cIiwgICAgICAgICBcIkZNXCIsIGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfZmlnc1wiLCAgICAgXCJERlwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMi41LCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImNvbXBvc2l0aW9uXCIsICAgIFwiQ1wiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsICAgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJzbWFsbF9taXN0YWtlc1wiLCBcIlNNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiYmlnX21pc3Rha2VzXCIsICAgXCJCTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxuICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXNzaW9uIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EYW5jZUhhbHZlZFNjb3JlLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9EYW5jZUhhbHZlZFNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmd19tYW46ICAgICAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGZ3X3dvbWFuOiAgICAgICBkYXRhW1wiZndfd29tYW5cIl0gICAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5md193b21hbiksXG4gICAgICAgICAgICBmd19tYW46ICAgICAgICAgZGF0YVtcImZ3X21hblwiXSAgICAgID09PSBcIlwiID8gbnVsbCA6IHBhcnNlSW50KGRhdGEuZndfbWFuKSxcbiAgICAgICAgICAgIGRhbmNlX2ZpZ3M6ICAgICBkYXRhW1wiZGFuY2VfZmlnc1wiXSAgPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiAgICBkYXRhW1wiY29tcG9zaXRpb25cIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5jb21wb3NpdGlvbiksXG4gICAgICAgICAgICBzbWFsbF9taXN0YWtlczogcGFyc2VJbnQoZGF0YS5zbWFsbF9taXN0YWtlcyksXG4gICAgICAgICAgICBiaWdfbWlzdGFrZXM6ICAgcGFyc2VJbnQoZGF0YS5iaWdfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJmd193b21hblwiLCAgICAgICBcIkZXXCIsIGdlblNjYWxlKFwiP3JlZHVjdGlvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZndfbWFuXCIsICAgICAgICAgXCJGTVwiLCBnZW5TY2FsZShcIj9yZWR1Y3Rpb25cIikpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImRhbmNlX2ZpZ3NcIiwgICAgIFwiREZcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImNvbXBvc2l0aW9uXCIsICAgIFwiQ1wiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMjAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInNtYWxsX21pc3Rha2VzXCIsIFwiU01cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJiaWdfbWlzdGFrZXNcIiwgICBcIkJNXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCAgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRhbmNlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0RhbmNlU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdGlvblNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV90ZWNoOiAgICAgUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFuY2VfZmlnczogICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246ICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgYWNyb2JhdGljczogICAgIGRhdGFbXCJhY3JvYmF0aWNzXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5hY3JvYmF0aWNzKSxcbiAgICAgICAgICAgIGRhbmNlX3RlY2g6ICAgICBkYXRhW1wiZGFuY2VfdGVjaFwiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUZsb2F0KGRhdGEuZGFuY2VfdGVjaCksXG4gICAgICAgICAgICBkYW5jZV9maWdzOiAgICAgZGF0YVtcImRhbmNlX2ZpZ3NcIl0gPT09IFwiXCIgPyBudWxsIDogcGFyc2VGbG9hdChkYXRhLmRhbmNlX2ZpZ3MpLFxuICAgICAgICAgICAgaW1wcmVzc2lvbjogICAgIGRhdGFbXCJpbXByZXNzaW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5pbXByZXNzaW9uKSxcbiAgICAgICAgICAgIGJpZ19taXN0YWtlczogICBwYXJzZUludChkYXRhLmJpZ19taXN0YWtlcyksXG4gICAgICAgICAgICBzbWFsbF9taXN0YWtlczogcGFyc2VJbnQoZGF0YS5zbWFsbF9taXN0YWtlcyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImFjcm9iYXRpY3NcIiwgICAgIFwiQVwiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfdGVjaFwiLCAgICAgXCJEVFwiLCBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV9maWdzXCIsICAgICBcIkRGXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImltcHJlc3Npb25cIiwgICAgIFwiSVwiLCAgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwic21hbGxfbWlzdGFrZXNcIiwgXCJTTVwiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgIHsgbWF4OiAxMDAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImJpZ19taXN0YWtlc1wiLCAgIFwiQk1cIiwgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0Zvcm1hdGlvblNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV90ZWNoOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXByZXNzaW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXN0YWtlczogICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIGRhbmNlX3RlY2g6IGRhdGFbXCJkYW5jZV90ZWNoXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV90ZWNoKSxcbiAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IGRhdGFbXCJkYW5jZV9maWdzXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5kYW5jZV9maWdzKSxcbiAgICAgICAgICAgIGltcHJlc3Npb246IGRhdGFbXCJpbXByZXNzaW9uXCJdID09PSBcIlwiID8gbnVsbCA6IHBhcnNlRmxvYXQoZGF0YS5pbXByZXNzaW9uKSxcbiAgICAgICAgICAgIG1pc3Rha2VzOiAgIHBhcnNlSW50KGRhdGEuc21hbGxfbWlzdGFrZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJkYW5jZV90ZWNoXCIsIFwiRFRcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1heDogMTAsIHN0ZXA6IDAuNSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwiZGFuY2VfZmlnc1wiLCBcIkRGXCIsIGdlblNjYWxlKFwiP251bWJlcnNcIiwgeyBtYXg6IDEwLCBzdGVwOiAwLjUgfSkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImltcHJlc3Npb25cIiwgXCJJXCIsICBnZW5TY2FsZShcIj9udW1iZXJzXCIsIHsgbWF4OiAxMCwgc3RlcDogMC41IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJtaXN0YWtlc1wiLCAgIFwiTVwiLCAgZ2VuU2NhbGUoXCJudW1iZXJzXCIsICB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0Zvcm1hdGlvblNjb3JlXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWVsZDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBrZXk6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgIFBULmFycmF5T2YoUFQuc3RyaW5nLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5maWVsZC5rZXksIGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NvcmUtdmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFkLW9ubHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5maWVsZC5vcHRpb25zLmZpbmQobyA9PiBvWzBdID09PSB0aGlzLnByb3BzLnZhbHVlKVsxXSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY29yZS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZmllbGQub3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgbGFiZWxdID0gb3B0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17IHZhbHVlIH0gdmFsdWU9eyB2YWx1ZSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pIH1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjb3JlLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5maWVsZC5sYWJlbCB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclZhbHVlKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5JdGVtLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0X0VkaXRvcl9HZW5lcmFsRWRpdG9yX0l0ZW1cIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhbEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmllbGRzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuYXJyYXlPZihQVC5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIGxldCBpbml0aWFsX3ZhbHVlcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5wcm9wcy5maWVsZHMpIHtcbiAgICAgICAgICAgIGluaXRpYWxfdmFsdWVzW2Yua2V5XSA9IGYuZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZXM6IGluaXRpYWxfdmFsdWVzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLnZhbHVlcyk7XG4gICAgICAgIHZhbHVlc1trZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZXMgfSk7XG4gICAgfVxuICAgIGhhbmRsZURpc2NhcmRDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRpc2NhcmQoKTtcbiAgICB9XG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHRoaXMuc3RhdGUudmFsdWVzKTtcbiAgICB9XG5cbiAgICByZW5kZXJCdXR0b25zKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlRGlzY2FyZENsaWNrIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwuYnV0dG9ucy5jbG9zZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdWJtaXQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwuYnV0dG9ucy5zdWJtaXRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGlzY2FyZC1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlRGlzY2FyZENsaWNrIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5idXR0b25zLmRpc2NhcmRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2NvcmUtZWRpdG9yXCJcbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmZpZWxkcy5tYXAoKGYsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ9eyBmIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBmLmtleSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMuc3RhdGUudmFsdWVzW2Yua2V5XSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9ucygpIH1cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkdlbmVyYWxFZGl0b3IuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0dlbmVyYWxFZGl0b3JcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkSnVkZ2VGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5hbHR5OiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0dG91cjogUFQuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU3VibWl0OiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWlzc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgcGVuYWx0eTogIHBhcnNlSW50KGRhdGEucGVuYWx0eSksXG4gICAgICAgICAgICBuZXh0dG91cjogZGF0YS5uZXh0dG91ciA9PT0gXCJ0cnVlXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInBlbmFsdHlcIiwgXCJQXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIlwiLCBcIuKAlFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIjBcIiwgXCJPS1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi01XCIsIFwiLTVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItMTVcIiwgXCItMTVcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcIm5leHR0b3VyXCIsIFwiTlRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiZmFsc2VcIiwgXCJOb1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcInRydWVcIiwgIFwiWWVzXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0hlYWRKdWRnZUZvcm1hdGlvblNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZEp1ZGdlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuYWx0eTogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHRvdXI6IFBULmJvb2wsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBlbmFsdHk6ICBwYXJzZUludChkYXRhLnBlbmFsdHkpLFxuICAgICAgICAgICAgbmV4dHRvdXI6IGRhdGEubmV4dHRvdXIgPT09IFwidHJ1ZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwZW5hbHR5XCIsIFwiUFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJcIiwgXCLigJRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCIwXCIsIFwiT0tcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItM1wiLCBcIi0zXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTMwXCIsIFwiLTMwXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTEwMFwiLCBcIi0xMDBcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcIm5leHR0b3VyXCIsIFwiTlRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiZmFsc2VcIiwgXCJOb1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcInRydWVcIiwgIFwiWWVzXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSGVhZEp1ZGdlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX0hlYWRKdWRnZVNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGlmaWVkU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBvaW50czogZGF0YVtcInBvaW50c1wiXSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLnBvaW50cyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VGaWVsZChrZXksIGxhYmVsLCBzY2FsZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBsYWJlbDogYCR7bGFiZWx9OmAsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2FsZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsRWRpdG9yXG4gICAgICAgICAgICAgICAgZmllbGRzPXsgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcInBvaW50c1wiLCBcIlNcIiwgZ2VuU2NhbGUoXCI/bnVtYmVyc1wiLCB7IG1pbjogMSwgbWF4OiA0MCB9KSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNpbXBsaWZpZWRTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfU2ltcGxpZmllZFNjb3JlXCI7XG4iLCJpbXBvcnQgR2VuZXJhbEVkaXRvciBmcm9tIFwiLi9HZW5lcmFsRWRpdG9yXCJcbmltcG9ydCBnZW5TY2FsZSBmcm9tIFwiLi9nZW5TY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNoRm9ybWF0aW9uSnVkZ2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdW1wX3N0ZXBzOiAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5hbHR5OiAgICAgICAgICBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmdfdmlvbGF0aW9uOiBQVC5ib29sLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXNzaW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBwZW5hbHR5OiAgICAgICAgICBkYXRhLnBlbmFsdHkgPT09IFwiXCIgPyBudWxsIDogcGFyc2VJbnQoZGF0YS5wZW5hbHR5KSxcbiAgICAgICAgICAgIGp1bXBfc3RlcHM6ICAgICAgIHBhcnNlSW50KGRhdGEuanVtcF9zdGVwcyksXG4gICAgICAgICAgICB0aW1pbmdfdmlvbGF0aW9uOiBkYXRhLnRpbWluZ192aW9sYXRpb24gPT09IFwiXCIgPyBudWxsIDogZGF0YS50aW1pbmdfdmlvbGF0aW9uID09PSBcInRydWVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZUZpZWxkKGtleSwgbGFiZWwsIHNjYWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYWJlbH06YCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjYWxlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZS50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxFZGl0b3JcbiAgICAgICAgICAgICAgICBmaWVsZHM9eyBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwicGVuYWx0eVwiLCBcIlBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiMFwiLCBcIk9LXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTVcIiwgXCItNVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi0xNVwiLCBcIi0xNVwiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwianVtcF9zdGVwc1wiLCBcIkpTXCIsIGdlblNjYWxlKFwibnVtYmVyc1wiLCB7IG1heDogMTAwIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJ0aW1pbmdfdmlvbGF0aW9uXCIsIFwiVFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJcIiwgICAgICBcIj9cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJmYWxzZVwiLCBcIuKck1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcInRydWVcIiwgIFwi4pyXXCJdLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIG9uRGlzY2FyZD17IHRoaXMucHJvcHMub25EaXNjYXJkIH1cbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWlzc2lvbiB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5UZWNoRm9ybWF0aW9uSnVkZ2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0FkbWluU2NvcmVJbnB1dF9FZGl0b3JfVGVjaEZvcm1hdGlvbkp1ZGdlU2NvcmVcIjtcbiIsImltcG9ydCBHZW5lcmFsRWRpdG9yIGZyb20gXCIuL0dlbmVyYWxFZGl0b3JcIlxuaW1wb3J0IGdlblNjYWxlIGZyb20gXCIuL2dlblNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlY2hKdWRnZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1bXBfc3RlcHM6ICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmFsdHk6ICAgICAgICAgIFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWluZ192aW9sYXRpb246IFBULmJvb2wsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZWFkT25seTogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25EaXNjYXJkOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgICAgICAgIHBlbmFsdHk6ICAgICAgICAgIGRhdGEucGVuYWx0eSA9PT0gXCJcIiA/IG51bGwgOiBwYXJzZUludChkYXRhLnBlbmFsdHkpLFxuICAgICAgICAgICAganVtcF9zdGVwczogICAgICAgcGFyc2VJbnQoZGF0YS5qdW1wX3N0ZXBzKSxcbiAgICAgICAgICAgIHRpbWluZ192aW9sYXRpb246IGRhdGEudGltaW5nX3Zpb2xhdGlvbiA9PT0gXCJcIiA/IG51bGwgOiBkYXRhLnRpbWluZ192aW9sYXRpb24gPT09IFwidHJ1ZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlRmllbGQoa2V5LCBsYWJlbCwgc2NhbGUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGAke2xhYmVsfTpgLFxuICAgICAgICAgICAgb3B0aW9uczogc2NhbGUsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlID09PSBudWxsID8gXCJcIiA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbEVkaXRvclxuICAgICAgICAgICAgICAgIGZpZWxkcz17IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlRmllbGQoXCJwZW5hbHR5XCIsIFwiUFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCIwXCIsIFwiT0tcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCItM1wiLCBcIi0zXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTMwXCIsIFwiLTMwXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiLTEwMFwiLCBcIi0xMDBcIl0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VGaWVsZChcImp1bXBfc3RlcHNcIiwgXCJKU1wiLCBnZW5TY2FsZShcIm51bWJlcnNcIiwgeyBtYXg6IDEwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUZpZWxkKFwidGltaW5nX3Zpb2xhdGlvblwiLCBcIlRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1wiXCIsICAgICAgXCI/XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiZmFsc2VcIiwgXCLinJNcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJ0cnVlXCIsICBcIuKcl1wiXSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICBvbkRpc2NhcmQ9eyB0aGlzLnByb3BzLm9uRGlzY2FyZCB9XG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pc3Npb24gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuVGVjaEp1ZGdlU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yX1RlY2hKdWRnZVNjb3JlXCI7XG4iLCJmdW5jdGlvbiBnZW5TY2FsZSh0eXBlLCB1c2VyX3BhcmFtcykge1xuICAgIGNvbnN0IG9wdGlvbmFsID0gdHlwZVswXSA9PT0gXCI/XCI7XG4gICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgIHR5cGUgPSB0eXBlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInJlZHVjdGlvblwiOlxuICAgICAgICByZXN1bHQgPSBbMTAwLCA3NSwgNTAsIDI1LCAxMCwgNSwgMF0ubWFwKFxuICAgICAgICAgICAgcyA9PiBbcy50b1N0cmluZygpLCBgLSR7c30lYF1cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm51bWJlcnNcIjpcbiAgICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgfSwgdXNlcl9wYXJhbXMpO1xuICAgICAgICBjb25zdCBmcmFjdGlvbl9zaXplID0gTWF0aC5hYnMocGFyYW1zLnN0ZXAgLSBNYXRoLnJvdW5kKHBhcmFtcy5zdGVwKSkgPCAxZS01ID8gMCA6IDE7XG4gICAgICAgIGZvciAobGV0IHNjb3JlID0gcGFyYW1zLm1pbjsgc2NvcmUgPCAocGFyYW1zLm1heCArIDFlLTUpOyBzY29yZSArPSBwYXJhbXMuc3RlcCkge1xuICAgICAgICAgICAgY29uc3Qgc3RyID0gc2NvcmUudG9GaXhlZChmcmFjdGlvbl9zaXplKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtzdHIsIHN0cl0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd24gc2NhbGUgdHlwZTogJHt0eXBlfWApO1xuICAgIH1cbiAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgcmVzdWx0ID0gW1tcIlwiLCBcIuKAlFwiXV0uY29uY2F0KHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlblNjYWxlO1xuIiwiaW1wb3J0IGdldFNjb3JpbmdUeXBlIGZyb20gXCJjb21tb24vZ2V0U2NvcmluZ1R5cGVcIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiLi9Db25maXJtYXRpb25CdXR0b25cIjtcbmltcG9ydCBBY3JvU2NvcmUgZnJvbSBcIi4vQWNyb1Njb3JlXCI7XG5pbXBvcnQgRGFuY2VTY29yZSBmcm9tIFwiLi9EYW5jZVNjb3JlXCI7XG5pbXBvcnQgRGFuY2VIYWx2ZWRTY29yZSBmcm9tIFwiLi9EYW5jZUhhbHZlZFNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uU2NvcmUgZnJvbSBcIi4vRm9ybWF0aW9uU2NvcmVcIjtcbmltcG9ydCBGb3JtYXRpb25BY3JvU2NvcmUgZnJvbSBcIi4vRm9ybWF0aW9uQWNyb1Njb3JlXCI7XG5pbXBvcnQgU2ltcGxpZmllZFNjb3JlIGZyb20gXCIuL1NpbXBsaWZpZWRTY29yZVwiO1xuaW1wb3J0IEhlYWRKdWRnZVNjb3JlIGZyb20gXCIuL0hlYWRKdWRnZVNjb3JlXCI7XG5pbXBvcnQgSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmUgZnJvbSBcIi4vSGVhZEp1ZGdlRm9ybWF0aW9uU2NvcmVcIjtcbmltcG9ydCBUZWNoSnVkZ2VTY29yZSBmcm9tIFwiLi9UZWNoSnVkZ2VTY29yZVwiO1xuaW1wb3J0IFRlY2hKdWRnZUZvcm1hdGlvblNjb3JlIGZyb20gXCIuL1RlY2hKdWRnZUZvcm1hdGlvblNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yZTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25Db25maXJtYXRpb25Ub2dnbGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25TdWJtaXQ6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVuZGVyQm9keShzY29yaW5nX3R5cGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc2NvcmluZ190eXBlID09PSBcImhlYWRcIiAmJlxuICAgICAgICAgICAgW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpID49IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzY29yaW5nX3R5cGUgPSBcImhlYWRfZm9ybWF0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc2NvcmluZ190eXBlID09PSBcInRlY2hcIiAmJlxuICAgICAgICAgICAgW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpID49IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzY29yaW5nX3R5cGUgPSBcInRlY2hfZm9ybWF0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2NvcmVfcHJvcHMgPSB7XG4gICAgICAgICAgICBzY29yZTogICAgIHRoaXMucHJvcHMuc2NvcmUsXG4gICAgICAgICAgICByZWFkT25seTogIHRoaXMucHJvcHMucmVhZE9ubHksXG4gICAgICAgICAgICBvblN1Ym1pdDogIHRoaXMucHJvcHMub25TdWJtaXQsXG4gICAgICAgICAgICBvbkRpc2NhcmQ6IHRoaXMucHJvcHMub25EaXNjYXJkLFxuICAgICAgICB9O1xuICAgICAgICBzd2l0Y2ggKHNjb3JpbmdfdHlwZSkge1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8QWNyb1Njb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImRhbmNlXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxEYW5jZVNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImRhbmNlX2hhbHZlZFwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RGFuY2VIYWx2ZWRTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEZvcm1hdGlvblNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxGb3JtYXRpb25BY3JvU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwic2ltcGxpZmllZFwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8U2ltcGxpZmllZFNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImhlYWRcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEhlYWRKdWRnZVNjb3JlIHsgLi4uc2NvcmVfcHJvcHMgfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImhlYWRfZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxIZWFkSnVkZ2VGb3JtYXRpb25TY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJ0ZWNoXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUZWNoSnVkZ2VTY29yZSB7IC4uLnNjb3JlX3Byb3BzIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJ0ZWNoX2Zvcm1hdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VGVjaEp1ZGdlRm9ybWF0aW9uU2NvcmUgeyAuLi5zY29yZV9wcm9wcyB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93biBzY29yaW5nIHR5cGU6ICR7c2NvcmluZ190eXBlfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckNvbmZpcm1hdGlvbkJ1dHRvbihzY29yaW5nX3R5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkgfHwgc2NvcmluZ190eXBlID09PSBcImhlYWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb25maXJtYXRpb25CdXR0b25cbiAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnByb3BzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgb25Db25maXJtYXRpb25Ub2dnbGU9eyB0aGlzLnByb3BzLm9uQ29uZmlybWF0aW9uVG9nZ2xlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBZG1pblNjb3JlSW5wdXRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keShzY29yaW5nX3R5cGUpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQ29uZmlybWF0aW9uQnV0dG9uKHNjb3JpbmdfdHlwZSkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5FZGl0b3IuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9BZG1pblNjb3JlSW5wdXRfRWRpdG9yXCI7XG4iLCJpbXBvcnQgRWRpdG9yIGZyb20gXCIuL0VkaXRvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaW5TY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGVkaXRpbmc6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uRGlzY2FyZDogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblN1Ym1pdDogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmVkaXRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLnJvbGUgPT09IFwiaGVhZF9qdWRnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnBlbmFsdHkgPT09IG51bGxcclxuICAgICAgICAgICAgICAgICAgICA/IFwi4oCUXCJcclxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLm5leHR0b3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiL05UXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJlc3VsdCB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2Uucm9sZSA9PT0gXCJ0ZWNoX2p1ZGdlXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxFZGl0b3JcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybWF0aW9uVG9nZ2xlPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm1hdGlvblRvZ2dsZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25EaXNjYXJkPXsgdGhpcy5wcm9wcy5vbkRpc2NhcmQgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXsgdGhpcy5wcm9wcy5vblN1Ym1pdCB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQWRtaW5TY29yZUlucHV0LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfQWRtaW5TY29yZUlucHV0XCI7XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRhYmxlOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcjogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29hY2hlczogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvcnRzbWVuOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyX29mX2JpcnRoOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGU6IFBULmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYW5zZm9ybURvY3goZG9jeCkge1xuICAgICAgICBkb2N4XG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG91ci1uYW1lXCIsIFwiYmFja2dyb3VuZFwiLCBcIiNkZGRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcInBhZGRpbmdcIiwgXCIwXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc3BvcnRzbWVuXCIsIFwid2lkdGhcIiwgXCIxMDAlXCIpO1xuICAgIH1cblxuICAgIHJlbmRlclJvd0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3cpIHtcbiAgICAgICAgY29uc3QgbmVlZF9yZW5kZXIgPVxuICAgICAgICAgICAgdHlwZW9mIHByZXZfcm93ID09PSBcInVuZGVmaW5lZFwiIHx8XG4gICAgICAgICAgICBwcmV2X3Jvdy50b3VyLmlkICE9PSBuZXh0X3Jvdy50b3VyLmlkO1xuICAgICAgICBpZiAoIW5lZWRfcmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyIGtleT17IGBIJHtuZXh0X3Jvdy5ydW4uaWR9YCB9PlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ0b3VyLW5hbWVcIiBjb2xTcGFuPVwiNlwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuZXh0X3Jvdy50b3VyLm5hbWUgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJvdyhyb3cpIHtcbiAgICAgICAgbGV0IHAgPSByb3cucnVuLnBhcnRpY2lwYW50O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyIGtleT17IGBSJHtyb3cucnVuLmlkfWAgfT5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IHBsYWNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvdy5wbGFjZSA9PT0gbnVsbCA/IFwiXCIgOiByb3cucGxhY2UgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04IG51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwLm51bWJlciB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTM2XCIgY29sU3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNwb3J0c21lblwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5mb3JtYXRpb25fbmFtZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjb2xTcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBwLmZvcm1hdGlvbl9uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwLnNwb3J0c21lbi5tYXAoKHMsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTc1XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGAke3MubGFzdF9uYW1lfSAke3MuZmlyc3RfbmFtZX1gIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHMuc3Vic3RpdHV0ZSA/IDxpPiAoeyBfKFwicmVzdWx0cy5sYWJlbHMuc3ViXCIpIH0uKTwvaT4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzLnllYXJfb2ZfYmlydGggfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjQgY2x1YlwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcC5jbHViLm5hbWUgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNCBjb2FjaGVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwLmNvYWNoZXMuc3BsaXQoXCIsXCIpLm1hcChjID0+IFtjLnRyaW0oKSwgPGJyIGtleT1cIlhcIiAvPl0pIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy5wcm9wcy50YWJsZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5yZW5kZXJSb3dIZWFkZXIodGFibGVbaSAtIDFdLCB0YWJsZVtpXSk7XG4gICAgICAgICAgICBpZiAoaGVhZGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaGVhZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucmVuZGVyUm93KHRhYmxlW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJEaXNjaXBsaW5lUmVzdWx0c1RhYmxlXCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMjdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5zcG9ydHNtZW5cIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy05XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuc3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0yNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NvYWNoZXNcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRpc2NpcGxpbmVSZXN1bHRzVGFibGUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9EaXNjaXBsaW5lUmVzdWx0c1RhYmxlXCI7XG4iLCJleHBvcnQgbGV0IEFwaSA9IG51bGw7XG5leHBvcnQgbGV0IG1lc3NhZ2VfZGlzcGF0Y2hlciA9IG51bGw7XG5leHBvcnQgbGV0IHN0b3JhZ2UgPSBudWxsO1xuZXhwb3J0IGxldCBUb3VyUmVzdWx0c0xvYWRlciA9IG51bGw7XG5leHBvcnQgbGV0IERpc2NpcGxpbmVSZXN1bHRzTG9hZGVyID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwKGRhdGEpIHtcbiAgICBBcGkgICAgICAgICAgICAgICAgICAgICAgPSBkYXRhLkFwaTtcbiAgICBtZXNzYWdlX2Rpc3BhdGNoZXIgICAgICAgPSBkYXRhLm1lc3NhZ2VfZGlzcGF0Y2hlcjtcbiAgICBzdG9yYWdlICAgICAgICAgICAgICAgICAgPSBkYXRhLnN0b3JhZ2U7XG4gICAgVG91clJlc3VsdHNMb2FkZXIgICAgICAgID0gZGF0YS5Ub3VyUmVzdWx0c0xvYWRlcjtcbiAgICBEaXNjaXBsaW5lUmVzdWx0c0xvYWRlciAgPSBkYXRhLkRpc2NpcGxpbmVSZXN1bHRzTG9hZGVyO1xufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhY3JvSWR4OiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcmVkdWN0aW9uOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFjcm9SZWR1Y3Rpb25VcGRhdGUodGhpcy5wcm9wcy5hY3JvSWR4LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oXCJ0YWJsZXQuYWNyb19qdWRnZS5hY3JvX25cIiwgdGhpcy5wcm9wcy5hY3JvSWR4KSB9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJyZWR1Y3Rpb25cIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnJlZHVjdGlvbiB9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuL0VsZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJlZHVjdGlvbnMubWFwKChyZWR1Y3Rpb24sIGFjcm9faWR4KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IGFjcm9faWR4IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9uPXsgcmVkdWN0aW9uIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNyb0lkeD17IGFjcm9faWR4IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlPXsgdGhpcy5wcm9wcy5vbkFjcm9SZWR1Y3Rpb25VcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEludGVnZXJJbnB1dCBmcm9tIFwidGFibGV0X3VpL0ludGVnZXJJbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJtaXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWlzdGFrZXNcIj5cclxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuYWNyb19qdWRnZS5mYWxsX2Rvd25cIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMubWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcbmltcG9ydCBUb3RhbFNjb3JlIGZyb20gXCJKdWRnZVRhYmxldC9Ub3RhbFNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGhhbmRsZUFjcm9SZWR1Y3Rpb25VcGRhdGUgPSAoYWNyb19pZHgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlZHVjdGlvbnMgPSB0aGlzLnByb3BzLnNjb3JlRGF0YS5yZWR1Y3Rpb25zLm1hcCgoKSA9PiBudWxsKTtcclxuICAgICAgICByZWR1Y3Rpb25zW2Fjcm9faWR4XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInJlZHVjdGlvbnNcIiwgcmVkdWN0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8RWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlZHVjdGlvbnM9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5yZWR1Y3Rpb25zIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU9eyB0aGlzLmhhbmRsZUFjcm9SZWR1Y3Rpb25VcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzPXsgdGhpcy5wcm9wcy5zY29yZURhdGEubWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvdGFsU2NvcmVcclxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbExheW91dCBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbExheW91dFwiO1xyXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3JvYmF0aWNzTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbExheW91dFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3M9eyBTY29yaW5nTGF5b3V0IH1cclxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5pbXBvcnQgbWFrZUNsYXNzTmFtZSBmcm9tIFwiY29tbW9uL21ha2VDbGFzc05hbWVcIjtcclxuXHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcInRhYmxldF91aS9TbGlkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1hdGlvbkJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYW5Db25maXJtOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGNvbmZpcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvbkNvbmZpcm06IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENsYXNzTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gbWFrZUNsYXNzTmFtZSh7XHJcbiAgICAgICAgICAgIFwiY29uZmlybVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImhpZGRlblwiOiAhdGhpcy5wcm9wcy5jYW5Db25maXJtLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5nZXRDbGFzc05hbWUoKSB9PlxyXG4gICAgICAgICAgICAgICAgPFNsaWRlclxyXG4gICAgICAgICAgICAgICAgICAgIGRvbmU9eyB0aGlzLnByb3BzLmNvbmZpcm1lZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVUZXh0PXsgXyhcInRhYmxldC5nbG9iYWwuY29uZmlybV9zY29yZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZVRleHQ9eyBfKFwidGFibGV0Lmdsb2JhbC5jb25maXJtZWRcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWN0aXZhdGU9eyB0aGlzLnByb3BzLm9uQ29uZmlybSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yZURhdGE6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNtYWxsX21pc3Rha2VzOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIGJpZ19taXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNtYWxsTWlzdGFrZXNDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJzbWFsbF9taXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVCaWdNaXN0YWtlc0NoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcImJpZ19taXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1pc3Rha2VzIGZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuZGFuY2VfanVkZ2Uuc21hbGxfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnNtYWxsX21pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVNtYWxsTWlzdGFrZXNDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPjx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmJpZ19taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEuYmlnX21pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUJpZ01pc3Rha2VzQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVQYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMucHJvcHMuY29kZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXIsIHZhbHVlLCBzY2FsZSwgb25TY29yZVVwZGF0ZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcbmltcG9ydCBUb3RhbFNjb3JlIGZyb20gXCJKdWRnZVRhYmxldC9Ub3RhbFNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICB7Li4uYWRkaXRpb25hbF9wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImZ3X3dvbWFuXCIsIFwicmVkdWN0aW9uXCIpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZndfbWFuXCIsIFwicmVkdWN0aW9uXCIpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfZmlnc1wiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMi41IH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiY29tcG9zaXRpb25cIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyB0aGlzLnByb3BzLnNjb3JlRGF0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvdGFsU2NvcmVcclxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbExheW91dCBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbExheW91dFwiO1xyXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbExheW91dFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3M9eyBTY29yaW5nTGF5b3V0IH1cclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlUGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyLCB2YWx1ZSwgc2NhbGUsIG9uU2NvcmVVcGRhdGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBTY29yZVBhcnQgZnJvbSBcIi4vU2NvcmVQYXJ0XCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJQYXJ0KGNvZGUsIHNjYWxlLCBhZGRpdGlvbmFsX3Byb3BzPXt9KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFNjb3JlUGFydFxyXG4gICAgICAgICAgICAgICAgY29kZT17IGNvZGUgfVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhgdGFibGV0LmRhbmNlX2p1ZGdlLiR7Y29kZX1gKSB9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhW2NvZGVdIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi5hZGRpdGlvbmFsX3Byb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImZ3X3dvbWFuXCIsIFwicmVkdWN0aW9uXCIpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZndfbWFuXCIsIFwicmVkdWN0aW9uXCIpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfZmlnc1wiLCBcImludGVnZXJcIiwgeyBtaW46IDAsIG1heDogMjUgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJjb21wb3NpdGlvblwiLCBcImludGVnZXJcIiwgeyBtaW46IDAsIG1heDogMjAgfSkgfVxyXG4gICAgICAgICAgICAgICAgPE1pc3Rha2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyB0aGlzLnByb3BzLnNjb3JlRGF0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvdGFsU2NvcmVcclxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcInRhYmxldF91aS9vblRvdWNoT3JDbGlja1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLm1rZXkpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJidG5cIiArICh0aGlzLnByb3BzLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrKSB9PlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMubGFiZWwgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIClcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb290ZXJJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCBCdXR0b24gZnJvbSBcIi4vQnV0dG9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvb3Rlcihwcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgICB7IFJlYWN0LkNoaWxkcmVuLm1hcChwcm9wcy5jaGlsZHJlbiwgKGJ0bikgPT5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGJ0bi5wcm9wcy5ta2V5IH1cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlPXsgcHJvcHMudmFsdWUgPT09IGJ0bi5wcm9wcy5ta2V5IH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHByb3BzLm9uQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAgICAgeyAuLi5idG4ucHJvcHMgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Zvb3Rlcj5cbiAgICApXG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEludGVnZXJJbnB1dCBmcm9tIFwidGFibGV0X3VpL0ludGVnZXJJbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmVEYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBiaWdfbWlzdGFrZXM6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTbWFsbE1pc3Rha2VzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwic21hbGxfbWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlQmlnTWlzdGFrZXNDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJiaWdfbWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWlzdGFrZXMgZnVsbC13aWR0aFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX3NtYWxsX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5zbWFsbF9taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVTbWFsbE1pc3Rha2VzQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD48dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX2JpZ19taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEuYmlnX21pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUJpZ01pc3Rha2VzQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVQYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBvbkNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5jb2RlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXIsIHZhbHVlLCBzY2FsZSwgb25TY29yZVVwZGF0ZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgIHsuLi5vdGhlcl9wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBTY29yZVBhcnQgZnJvbSBcIi4vU2NvcmVQYXJ0XCI7XHJcbmltcG9ydCBNaXN0YWtlcyBmcm9tIFwiLi9NaXN0YWtlc1wiO1xyXG5pbXBvcnQgVG90YWxTY29yZSBmcm9tIFwiSnVkZ2VUYWJsZXQvVG90YWxTY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJQYXJ0KGNvZGUsIHNjYWxlLCBhZGRpdGlvbmFsX3Byb3BzPXt9KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFNjb3JlUGFydFxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgey4uLmFkZGl0aW9uYWxfcHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJhY3JvYmF0aWNzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfdGVjaFwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJpbXByZXNzaW9uXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgdGhpcy5wcm9wcy5zY29yZURhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnByb3BzLnJlYWRPbmx5IH1cclxuICAgICAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEludGVnZXJJbnB1dCBmcm9tIFwidGFibGV0X3VpL0ludGVnZXJJbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmVEYXRhOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBtaXN0YWtlczogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcIm1pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaXN0YWtlc1wiPlxyXG4gICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgPEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXsgdGhpcy5wcm9wcy5yZWFkT25seSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZVBhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvZGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgaGVhZGVyOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNjYWxlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMucHJvcHMuY29kZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXIsIHZhbHVlLCBzY2FsZSwgb25TY29yZVVwZGF0ZSwgLi4ub3RoZXJfcHJvcHMgfSA9IHRoaXMucHJvcHM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcbmltcG9ydCBUb3RhbFNjb3JlIGZyb20gXCJKdWRnZVRhYmxldC9Ub3RhbFNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgY29kZT17IGNvZGUgfVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhgdGFibGV0LmRhbmNlX2p1ZGdlLiR7Y29kZX1gKSB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhW2NvZGVdIH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxyXG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICB7Li4uYWRkaXRpb25hbF9wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX3RlY2hcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiaW1wcmVzc2lvblwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG90YWxTY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgQ29uZmlybWF0aW9uQnV0dG9uIGZyb20gXCJKdWRnZVRhYmxldC9Db25maXJtYXRpb25CdXR0b25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljaXBhbnQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBzY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJzY29yZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHRoaXMucHJvcHMucnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYW5Db25maXJtKCkge1xuICAgICAgICBjb25zdCBzY29yZV9kYXRhID0gdGhpcy5zY29yZS5kYXRhLnJhd19kYXRhO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzY29yZV9kYXRhKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzY29yZV9kYXRhW2tleV07XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuZmlsdGVyKGEgPT4gYSA9PT0gbnVsbCkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBvbkNvbmZpcm0gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0odGhpcy5zY29yZS5pZCk7XG4gICAgfVxuICAgIG9uU2NvcmVVcGRhdGUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHt9O1xuICAgICAgICBzY29yZV9kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMuc2NvcmUuaWQsIHNjb3JlX2RhdGEpO1xuICAgIH1cbiAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGUgPSAoYWNyb19pZHgsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZWR1Y3Rpb25zID0gdGhpcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMubWFwKCgpID0+IG51bGwpO1xuICAgICAgICByZWR1Y3Rpb25zW2Fjcm9faWR4XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uU2NvcmVVcGRhdGUoXCJyZWR1Y3Rpb25zXCIsIHJlZHVjdGlvbnMpO1xuICAgIH1cbiAgICByZW5kZXJTY29yaW5nTGF5b3V0KCkge1xuICAgICAgICBjb25zdCBzY29yZV9kYXRhID0gdGhpcy5zY29yZS5kYXRhLnJhd19kYXRhO1xuICAgICAgICBjb25zdCBTY29yaW5nQ29tcG9uZW50ID0gdGhpcy5wcm9wcy5sYXlvdXRDbGFzcztcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8U2NvcmluZ0NvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgc2NvcmVfZGF0YSB9XG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIGNhbkNvbmZpcm09eyB0aGlzLmNhbkNvbmZpcm0oKSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17IHRoaXMub25Db25maXJtIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlck5vdFBlcmZvcm1pbmdNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3QtcGVyZm9ybWluZ1wiPlxuICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwubm90X3BlcmZvcm1pbmdcIikgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyU2NvcmluZ0xheW91dCgpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5yZW5kZXJOb3RQZXJmb3JtaW5nTWVzc2FnZSgpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkZXJcIjtcbmltcG9ydCBHcmlkIGZyb20gXCJKdWRnZVRhYmxldC9HcmlkXCI7XG5pbXBvcnQgUGFydGljaXBhbnQgZnJvbSBcIi4vUGFydGljaXBhbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhbExheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IG5leHRfcHJvcHM7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gcHJldl9wcm9wcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiaGVhdHNfY291bnRcIiwgKCkgPT5cbiAgICAgICAgICAgIE1hdGgubWF4KC4uLnRoaXMucHJvcHMudG91ci5ydW5zLm1hcChydW4gPT4gcnVuLmhlYXQpKVxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgcnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJydW5zXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIucnVucy5maWx0ZXIocnVuID0+IHJ1bi5oZWF0ID09PSB0aGlzLnN0YXRlLmhlYXQpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBmaXJzdF9ub25fY29uZmlybWVkX2hlYXQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHRoaXMucHJvcHMudG91ci5ydW5zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQgJiYgIXNjb3JlLmNvbmZpcm1lZCAmJiBydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW4uaGVhdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhdHNfY291bnQ7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3NmYXJyLUp1ZGdlVGFibGV0IEdlbmVyYWxMYXlvdXRcIj5cbiAgICAgICAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuanVkZ2UgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAgICAgaGVhdD17IHRoaXMuc3RhdGUuaGVhdCB9XG4gICAgICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyB0aGlzLmhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICAgICAgbWF4SGVhdD17IHRoaXMuZmlyc3Rfbm9uX2NvbmZpcm1lZF9oZWF0IH1cbiAgICAgICAgICAgICAgICAgICAgb25QcmV2SGVhdENsaWNrPXsgdGhpcy5vblByZXZIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgICAgICAgICBvbk5leHRIZWF0Q2xpY2s9eyB0aGlzLm9uTmV4dEhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuaGVhdCkubWFwKHJ1biA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQYXJ0aWNpcGFudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IHRoaXMucHJvcHMubGF5b3V0Q2xhc3MgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTnVtYmVyU2VsZWN0b3JJbnB1dCBmcm9tIFwidGFibGV0X3VpL051bWJlclNlbGVjdG9ySW5wdXRcIjtcclxuaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9TZWxlY3RvcklucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsU2NhbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyOiBQVC5zdHJpbmcsXHJcbiAgICAgICAgICAgIHNjYWxlOiBQVC5vbmVPZihbXCJwb2ludDVcIiwgXCJpbnRlZ2VyXCIsIFwiZ3JpZFwiLCBcInJlZHVjdGlvblwiXSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBQT1NTSUJMSUVfUkVEVUNUSU9OUygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbMTAwLCBcIi0xMDAlXCJdLFxyXG4gICAgICAgICAgICBbNzUsICBcIi03NSVcIl0sXHJcbiAgICAgICAgICAgIFs1MCwgIFwiLTUwJVwiXSxcclxuICAgICAgICAgICAgWzI1LCAgXCItMjUlXCJdLFxyXG4gICAgICAgICAgICBbMTAsICBcIi0xMCVcIl0sXHJcbiAgICAgICAgICAgIFs1LCAgIFwiLTUlXCJdLFxyXG4gICAgICAgICAgICBbMCwgICBcIi0wJVwiXSxcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVySGVhZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGgzPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmhlYWRlciB9XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcbiAgICByZW5kZXJCb2R5KCkge1xyXG4gICAgICAgIGNvbnN0IHsgc2NhbGUsIC4uLm90aGVyX3Byb3BzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHN3aXRjaCAoc2NhbGUpIHtcclxuICAgICAgICBjYXNlIFwicG9pbnQ1XCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TnVtYmVyU2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxTaXplPXsgMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcD17IDAuNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ0d28tbGluZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub3RoZXJfcHJvcHMgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwiaW50ZWdlclwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPE51bWJlclNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInR3by1saW5lc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNhc2UgXCJncmlkXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TnVtYmVyU2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiZ3JpZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNhc2UgXCJyZWR1Y3Rpb25cIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuUE9TU0lCTElFX1JFRFVDVElPTlMgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwib25lLWxpbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd2Qgc2NhbGUgdHlwZTogJHtzY2FsZX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcclxuICAgIGdldCBjaGlsZHJlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImNoaWxkcmVuXCIsICgpID0+XHJcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgOiBbdGhpcy5wcm9wcy5jaGlsZHJlbl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0IHR3b19yb3dzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwidHdvX3Jvd3NcIiwgKCkgPT5cclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPj0gNFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXQgd2lkdGhfdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ3aWR0aF92YWx1ZVwiLCAoKSA9PlxyXG4gICAgICAgICAgICB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgICAgICA/IDk5LjkgLyAodGhpcy5jaGlsZHJlbi5sZW5ndGggKyAxKSAqIDJcclxuICAgICAgICAgICAgICAgIDogOTkuOSAvIHRoaXMuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGdldCB3aWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcIndpZHRoXCIsICgpID0+XHJcbiAgICAgICAgICAgIGAkeyB0aGlzLndpZHRoX3ZhbHVlLnRvRml4ZWQoNSkgfSVgXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgZ2V0IG1heF93aWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcIm1heF93aWR0aFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVfc2l6ZSA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgICAgID8gTWF0aC5mbG9vcigodGhpcy5jaGlsZHJlbi5sZW5ndGggKyAxKSAvIDIgKyAwLjAwMSlcclxuICAgICAgICAgICAgICAgIDogdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHs2MDAgKiBsaW5lX3NpemV9cHhgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IGFzeW1fbGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwiYXN5bV9sYXlvdXRcIiwgKCkgPT5cclxuICAgICAgICAgICAgdGhpcy50d29fcm93cyAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCAlIDIgPT09IDBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KGVsZW1lbnRzLCBpc19zZWNvbmRfcm93KSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnRzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByb3dfd2lkdGggPSBgJHsoZWxlbWVudHMubGVuZ3RoICogdGhpcy53aWR0aF92YWx1ZSkudG9GaXhlZCg1KX0lYDtcclxuICAgICAgICBsZXQgY2xhc3NfbmFtZSA9IFwiZ3JpZC1yb3dcIjtcclxuICAgICAgICBpZiAoIXRoaXMuYXN5bV9sYXlvdXQpIHtcclxuICAgICAgICAgICAgY2xhc3NfbmFtZSArPSBcIiBhbGlnbi1jZW50ZXJcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzX3NlY29uZF9yb3cpIHtcclxuICAgICAgICAgICAgY2xhc3NfbmFtZSArPSBcIiBhbGlnbi1yaWdodFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsYXNzX25hbWUgKz0gXCIgYWxpZ24tbGVmdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXsgY2xhc3NfbmFtZSB9IHN0eWxlPXsgeyB3aWR0aDogcm93X3dpZHRoIH0gfT48dGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBlbGVtZW50cy5tYXAoKGUsIGlkeCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IGlkeCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHsgd2lkdGg6IHRoaXMud2lkdGggfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSB0aGlzLnR3b19yb3dzID8gXCJHcmlkIHR3by1yb3dzXCIgOiBcIkdyaWRcIjtcclxuICAgICAgICBjb25zdCBmaXJzdF9yb3cgPSB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgID8gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKHgsIGlkeCkgPT4gaWR4ICUgMiA9PT0gMClcclxuICAgICAgICAgICAgOiB0aGlzLmNoaWxkcmVuO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZF9yb3cgPSB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgID8gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKHgsIGlkeCkgPT4gaWR4ICUgMiA9PT0gMSlcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NfbmFtZSB9IHN0eWxlPXsgeyBtYXhXaWR0aDogdGhpcy5tYXhfd2lkdGggfSB9PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvdyhmaXJzdF9yb3csIGZhbHNlKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93KHNlY29uZF9yb3csIHRydWUpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5pbXBvcnQgc2hvd0NvbmZpcm0gZnJvbSBcImNvbW1vbi9kaWFsb2dzL3Nob3dDb25maXJtXCI7XG5pbXBvcnQgY2xvc2VEaWFsb2cgZnJvbSBcImNvbW1vbi9kaWFsb2dzL2Nsb3NlRGlhbG9nXCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb25zUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdG9wVG91ciA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5zdG9wX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwge1xuICAgICAgICAgICAgICAgICAgICB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXIuaWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm9uU3VjY2VzcyhjbG9zZURpYWxvZylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ciA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHRoaXMucHJvcHMudG91ci5pZCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAub25TdWNjZXNzKGNsb3NlRGlhbG9nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RvcFRvdXJBbmRTdGFydE5leHQgPSAoKSA9PiB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuc3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdG9wXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG91cl9pZDogdG91cl9pZCxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vblN1Y2Nlc3MoY2xvc2VEaWFsb2cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgIH0pLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ckFuZFN0YXJ0TmV4dCA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHRvdXJfaWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm9uU3VjY2VzcygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHRvdXJfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vblN1Y2Nlc3MoY2xvc2VEaWFsb2cpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYXNVbmNvbmZpcm1lZFNjb3JlcygpIHtcbiAgICAgICAgY29uc3QgcnVucyA9IHRoaXMucHJvcHMudG91ci5ydW5zO1xuICAgICAgICBjb25zdCBsYXRlc3RfaGVhdCA9IHJ1bnNbcnVucy5sZW5ndGggLSAxXS5oZWF0O1xuICAgICAgICBpZiAobGF0ZXN0X2hlYXQgPT09IHJ1bnNbMF0uaGVhdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGF0ZXN0X3J1bnMgPSBydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gbGF0ZXN0X2hlYXQpO1xuICAgICAgICBjb25zdCBwcmV2X3J1bnMgPSBydW5zLmZpbHRlcihyID0+IHIuaGVhdCA9PT0gbGF0ZXN0X2hlYXQgLSAxKTtcbiAgICAgICAgbGV0IHNjb3JlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc19ydW4gPSAocnVuLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkal9pZCA9IHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29yZXMuaGFzKGRqX2lkKSkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZXMuc2V0KGRqX2lkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3Q6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2OiAwLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICArK3Njb3Jlcy5nZXQoZGpfaWQpW3R5cGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgbGF0ZXN0X3J1bnMpIHtcbiAgICAgICAgICAgIHByb2Nlc3NfcnVuKHJ1biwgXCJsYXRlc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgcHJldl9ydW5zKSB7XG4gICAgICAgICAgICBwcm9jZXNzX3J1bihydW4sIFwicHJldlwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHN0YXRzIG9mIHNjb3Jlcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKHN0YXRzLnByZXYgPiAwICYmIHN0YXRzLmxhdGVzdCA8IGxhdGVzdF9ydW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXJXYXJuaW5nKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzVW5jb25maXJtZWRTY29yZXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FybmluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYWxlcnRzLmhhc191bmNvbmZpcm1lZF9zY29yZXNcIikgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckJ1dHRvbihjb2RlLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2soY2FsbGJhY2spIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IF8oYHRhYmxldC5idXR0b25zLiR7Y29kZX1gKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyV2FybmluZygpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwic3RvcF90b3VyXCIsIHRoaXMuc3RvcFRvdXIpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwiZmluYWxpemVfdG91clwiLCB0aGlzLmZpbmFsaXplVG91cikgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIiwgdGhpcy5zdG9wVG91ckFuZFN0YXJ0TmV4dCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIsIHRoaXMuZmluYWxpemVUb3VyQW5kU3RhcnROZXh0KSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvYmF0aWNPdmVycmlkZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdldEFjcm9iYXRpY092ZXJyaWRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3NcbiAgICAgICAgICAgIC5tYXAoKGFjcm8sIGlkeCkgPT4gKHsgaWR4OiBpZHggKyAxLCBhY3JvYmF0aWM6IGFjcm8gfSkpXG4gICAgICAgICAgICAuZmlsdGVyKChhY3JvKSA9PiBhY3JvLmFjcm9iYXRpYy5vcmlnaW5hbF9zY29yZSAhPT0gYWNyby5hY3JvYmF0aWMuc2NvcmUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhY3JvYmF0aWNfb3ZlcnJpZGVzID0gdGhpcy5nZXRBY3JvYmF0aWNPdmVycmlkZXMoKTtcbiAgICAgICAgaWYgKGFjcm9iYXRpY19vdmVycmlkZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5hY3JvYmF0aWNfb3ZlcnJpZGVzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IGFjcm9iYXRpY19vdmVycmlkZXMubWFwKChhY3JvKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGFjcm8uaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNVwiPnsgYWNyby5pZHggfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnsgYWNyby5hY3JvYmF0aWMuZGVzY3JpcHRpb24gfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1yaWdodFwiPnsgYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy01IHRleHQtY2VudGVyXCI+4oaSPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LWxlZnRcIj57IGFjcm8uYWNyb2JhdGljLnNjb3JlLnRvRml4ZWQoMSkgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSXRlbShwcm9wcykge1xuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHByb3BzLnNjb3JlICYmIHByb3BzLnNjb3JlLmNvbmZpcm1lZDtcbiAgICByZXR1cm4gKFxuICAgICAgICA8dGQgY2xhc3NOYW1lPXsgY29uZmlybWVkID8gXCJjb25maXJtZWRcIiA6IFwiXCIgfT5cbiAgICAgICAgICAgIHsgcHJvcHMuc2NvcmVcbiAgICAgICAgICAgICAgICA/IHByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgIDogXCLigJRcIiB9XG4gICAgICAgIDwvdGQ+XG4gICAgKTtcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVKdWRnZVNjb3JlIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgbGluZV9qdWRnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwibGluZV9qdWRnZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlcy5maWx0ZXIoZGogPT4gZGoucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiIHx8IGRqLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSk7XG4gICAgfVxuICAgIGdldCBsaW5lX2p1ZGdlc19pbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJsaW5lX2p1ZGdlc19pbmRleFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLmxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChkai5pZCwgZGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5zY29yZXMuZmlsdGVyKHNjb3JlID0+IHRoaXMubGluZV9qdWRnZXNfaW5kZXguaGFzKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpKSk7XG4gICAgfVxuICAgIHJlbmRlck51bWJlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLmxpbmVfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17IHNjb3JlLmlkIH0+XG4gICAgICAgICAgICAgICAgICAgIHsgYCR7ZGouanVkZ2UubnVtYmVyIH0keyBkai5yb2xlID09PSBcImFjcm9fanVkZ2VcIiA/IFwiIChBKVwiIDogXCJcIiB9YCB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLmxpbmVfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAganVkZ2U9eyBkai5qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIGtleT17IGRqLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyBzY29yZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5kYW5jZV9qdWRnZV9zY29yZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImxpbmUtanVkZ2Utc2NvcmVzXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwibnVtYmVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck51bWJlcnMoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJzY29yZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IG9uVG91Y2hFbmRPckNsaWNrIGZyb20gXCJ0YWJsZXRfdWkvb25Ub3VjaEVuZE9yQ2xpY2tcIjtcblxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdFBlcmZvcm1lZFN3aXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgbWFya05vdFBlcmZvcm1lZCgpIHtcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfbm90X3BlcmZvcm1lZFwiLCB7IHJ1bl9pZDogdGhpcy5wcm9wcy5ydW4uaWQgfSkuc2VuZCgpO1xuICAgIH1cbiAgICBtYXJrUGVyZm9ybWVkKCkge1xuICAgICAgICBBcGkoXCJydW4ubWFya19wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuLmlkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgcmVuZGVyQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtZWRcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMubWFya05vdFBlcmZvcm1lZC5iaW5kKHRoaXMpKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLm1hcmtfbm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwZXJmb3JtZWRcIlxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMubWFya1BlcmZvcm1lZC5iaW5kKHRoaXMpKSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLmRpc2NhcmRfbm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90LXBlcmZvcm1lZC1zd2l0Y2hcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9TZWxlY3RvcklucHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlbmFsdHlJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5hbHR5OiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yaW5nU3lzdGVtTmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInBlbmFsdHlcIiwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgcGVuYWx0aWVzID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zY29yaW5nU3lzdGVtTmFtZSkgPj0gMFxuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgW251bGwsIFwi4oCUXCJdLFxuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LmhlYWRfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstNSwgICBfKFwidGFibGV0LmhlYWRfanVkZ2UuZm9ybV95ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xNSwgIF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5mb3JtX3JlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgIFtudWxsLCBcIuKAlFwiXSxcbiAgICAgICAgICAgICAgICBbMCwgICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLm9rXCIpXSxcbiAgICAgICAgICAgICAgICBbLTMsICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnllbGxvd19jYXJkXCIpXSxcbiAgICAgICAgICAgICAgICBbLTMwLCAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnJlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgICAgICBbLTEwMCwgXyhcInRhYmxldC5oZWFkX2p1ZGdlLmJsYWNrX2NhcmRcIildLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5wZW5hbHR5X3R5cGVcIikgfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IHBlbmFsdGllcyB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnBlbmFsdHkgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJldmlvdXNQZW5hbHRpZXMocHJvcHMpIHtcbiAgICBpZiAoIXByb3BzLnJ1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXMgfHwgcHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5oZWFkX2p1ZGdlLnByZXZpb3VzX3J1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXNcIikgfTwvaDM+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPjx0Ym9keT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnJ1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXMubWFwKChkLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTEwIHRleHQtY2VudGVyXCI+PHN0cm9uZz57IGQucGVuYWx0eSB9PC9zdHJvbmc+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57IGQudG91ciB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCBtYWtlQ2xhc3NOYW1lIGZyb20gXCJjb21tb24vbWFrZUNsYXNzTmFtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGNvbmZpcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5zY29yZSA/IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSA6IDA7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwiY29uZmlybWVkXCI6IHRoaXMucHJvcHMuc2NvcmUgJiYgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQsXG4gICAgICAgICAgICBcImdyZWVuXCI6IC10b3RhbF9zY29yZSA8IDEsXG4gICAgICAgICAgICBcInllbGxvd1wiOiAxIDw9IC10b3RhbF9zY29yZSAmJiAtdG90YWxfc2NvcmUgPCAxMCxcbiAgICAgICAgICAgIFwicmVkXCI6IDEwIDw9IC10b3RhbF9zY29yZSAmJiAtdG90YWxfc2NvcmUgPCA1MCxcbiAgICAgICAgICAgIFwiYmxhY2tcIjogNTAgPD0gLXRvdGFsX3Njb3JlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17IHRoaXMuZ2V0Q2xhc3NOYW1lKCkgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmVcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgpXG4gICAgICAgICAgICAgICAgICAgIDogXCLigJRcIiB9XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuSXRlbS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0p1ZGdlVGFibGV0X0hlYWRKdWRnZUxheW91dF9IZWF0c1BhZ2VfU2NvcmluZ0xheW91dF9UZWNoSnVkZ2VzU2NvcmVzX0l0ZW1cIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlY2hKdWRnZVNjb3JlIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgdGVjaF9qdWRnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwidGVjaF9qdWRnZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlcy5maWx0ZXIoZGogPT4gZGoucm9sZSA9PT0gXCJ0ZWNoX2p1ZGdlXCIpKTtcbiAgICB9XG4gICAgZ2V0IHRlY2hfanVkZ2VzX2luZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInRlY2hfanVkZ2VzX2luZGV4XCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRqIG9mIHRoaXMudGVjaF9qdWRnZXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGRqLmlkLCBkaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJzY29yZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnNjb3Jlcy5maWx0ZXIoc2NvcmUgPT4gdGhpcy50ZWNoX2p1ZGdlc19pbmRleC5oYXMoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCkpKTtcbiAgICB9XG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXhXaWR0aDogYCR7MTUwICogdGhpcy50ZWNoX2p1ZGdlcy5sZW5ndGh9cHhgLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXJOdW1iZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMubWFwKHNjb3JlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRqID0gdGhpcy50ZWNoX2p1ZGdlc19pbmRleC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9eyBzY29yZS5pZCB9PlxuICAgICAgICAgICAgICAgICAgICB7IGRqLmp1ZGdlLm51bWJlciB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLnRlY2hfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAganVkZ2U9eyBkai5qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIGtleT17IGRqLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyBzY29yZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS50ZWNoX2p1ZGdlX3Njb3Jlc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGVjaC1qdWRnZS1zY29yZXNcIiBzdHlsZT17IHRoaXMuZ2V0U3R5bGUoKSB9Pjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cIm51bWJlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOdW1iZXJzKCkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwic2NvcmVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgUGVuYWx0eUlucHV0IGZyb20gXCIuL1BlbmFsdHlJbnB1dFwiO1xuaW1wb3J0IFRlY2hKdWRnZXNTY29yZXMgZnJvbSBcIi4vVGVjaEp1ZGdlc1Njb3Jlc1wiO1xuaW1wb3J0IExpbmVKdWRnZXNTY29yZXMgZnJvbSBcIi4vTGluZUp1ZGdlc1Njb3Jlc1wiO1xuaW1wb3J0IEFjcm9iYXRpY092ZXJyaWRlcyBmcm9tIFwiLi9BY3JvYmF0aWNPdmVycmlkZXNcIjtcbmltcG9ydCBQcmV2aW91c1BlbmFsdGllcyBmcm9tIFwiLi9QcmV2aW91c1BlbmFsdGllc1wiO1xuaW1wb3J0IE5vdFBlcmZvcm1lZFN3aXRjaCBmcm9tIFwiLi9Ob3RQZXJmb3JtZWRTd2l0Y2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uU2NvcmVVcGRhdGUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHt9O1xuICAgICAgICBzY29yZV9kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMuc2NvcmUuaWQsIHNjb3JlX2RhdGEpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8Tm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0LXBhcnRpY2lwYW50XCI+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8UGVuYWx0eUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgICAgICBzY29yaW5nU3lzdGVtTmFtZT17IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxUZWNoSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlcz17IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxMaW5lSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlcz17IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxBY3JvYmF0aWNPdmVycmlkZXNcbiAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFByZXZpb3VzUGVuYWx0aWVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxOb3RQZXJmb3JtZWRTd2l0Y2hcbiAgICAgICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IEdyaWQgZnJvbSBcIkp1ZGdlVGFibGV0L0dyaWRcIjtcblxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWF0c1BhZ2UgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMucHJvcHMuaGVhdCkpO1xuICAgIH1cbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGhlYXRzXCI+XG4gICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVG91clJlc3VsdHNMb2FkZXIgfSBmcm9tIFwiSG9zdE1vZHVsZXNcIjtcblxuaW1wb3J0IFJlc3VsdHNUYWJsZTIgZnJvbSBcIlJlc3VsdHNUYWJsZTJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemF0aW9uXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHkgcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxUb3VyUmVzdWx0c0xvYWRlclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcj17IFJlc3VsdHNUYWJsZTIgfVxuICAgICAgICAgICAgICAgICAgICB0b3VySWQ9eyB0aGlzLnByb3BzLnRvdXIuaWQgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyXCI7XG5pbXBvcnQgRm9vdGVySXRlbSBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyL0Zvb3Rlckl0ZW1cIjtcblxuaW1wb3J0IEhlYXRzUGFnZSBmcm9tIFwiLi9IZWF0c1BhZ2VcIjtcbmltcG9ydCBSZXN1bHRzUGFnZSBmcm9tIFwiLi9SZXN1bHRzUGFnZVwiO1xuaW1wb3J0IEFjdGlvbnNQYWdlIGZyb20gXCIuL0FjdGlvbnNQYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRKdWRnZUxheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaGVhdDogMSxcbiAgICAgICAgICAgIHBhZ2U6IFwiaGVhdHNcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmIChuZXh0X3Byb3BzLnRvdXIuaWQgIT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaGVhdDogMSxcbiAgICAgICAgICAgICAgICBwYWdlOiBcImhlYXRzXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnByb3BzLnRvdXIucnVucy5tYXAocnVuID0+IHJ1bi5oZWF0KSk7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgb25QYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2UgfSk7XG4gICAgfVxuICAgIHJlbmRlckhlYXRzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYXRzUGFnZVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclJlc3VsdHMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVzdWx0c1BhZ2VcbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QWN0aW9uc1BhZ2VcbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhdHNfY291bnQgPSB0aGlzLmhlYXRzX2NvdW50O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuanVkZ2UgfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGhlYXQ9eyB0aGlzLnN0YXRlLmhlYXQgfVxuICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyBoZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAgbWF4SGVhdD17IGhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLm9uUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgb25OZXh0SGVhdENsaWNrPXsgdGhpcy5vbk5leHRIZWF0Q2xpY2sgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBhZ2UpIHtcbiAgICAgICAgY2FzZSBcImhlYXRzXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJIZWF0cygpO1xuICAgICAgICBjYXNlIFwicmVzdWx0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyUmVzdWx0cygpO1xuICAgICAgICBjYXNlIFwiYWN0aW9uc1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb290ZXIgdmFsdWU9eyB0aGlzLnN0YXRlLnBhZ2UgfSBvbkNoYW5nZT17IHRoaXMub25QYWdlQ2hhbmdlIH0+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmhlYXRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImhlYXRzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cInJlc3VsdHNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmFjdGlvbnNcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiYWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9vdGVyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXQgSGVhZEp1ZGdlTGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyRm9vdGVyKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBvblRvdWNoRW5kT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hFbmRPckNsaWNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUHJldkhlYXRCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhdCA8PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXJcIiAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXIgbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB7IC4uLm9uVG91Y2hFbmRPckNsaWNrKHRoaXMucHJvcHMub25QcmV2SGVhdENsaWNrKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnByZXZfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlck5leHRIZWF0QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYXQgPj0gdGhpcy5wcm9wcy5tYXhIZWF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXJcIiAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXIgcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24geyAuLi5vblRvdWNoRW5kT3JDbGljayh0aGlzLnByb3BzLm9uTmV4dEhlYXRDbGljaykgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5uZXh0X2hlYXRcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QganVkZ2VfbnVtYmVyID0gdGhpcy5wcm9wcy5qdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIHx8IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIHRoaXMucHJvcHMuanVkZ2UubnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclByZXZIZWF0QnV0dG9uKCkgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsganVkZ2VfbnVtYmVyIH08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+eyB0aGlzLnByb3BzLmp1ZGdlLm5hbWUgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsgdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUubmFtZSB9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5nbG9iYWwuaGVhdF9udW1iZXJcIiwgdGhpcy5wcm9wcy5oZWF0LCB0aGlzLnByb3BzLmhlYXRzQ291bnQgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0SGVhdEJ1dHRvbigpIH1cclxuICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIG9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwicG9pbnRzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnBvaW50cyB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cImdyaWRcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgIG1pbj17IDEgfVxyXG4gICAgICAgICAgICAgICAgbWF4PXsgNDAgfVxyXG4gICAgICAgICAgICAgICAgcm93U2l6ZT17IDEwIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBPdmVycmlkZUlucHV0IGZyb20gXCIuL092ZXJyaWRlSW5wdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZWNoLWp1ZGdlLWFjcm9cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2xzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxPdmVycmlkZUlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLnByb3BzLm9uQWNyb092ZXJyaWRlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWU9eyB0aGlzLnByb3BzLmFjcm8ub3JpZ2luYWxfc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLmFjcm8uc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjcm8uZGVzY3JpcHRpb24gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBvblRvdWNoT3JDbGljayBmcm9tIFwidGFibGV0X3VpL29uVG91Y2hPckNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE92ZXJyaWRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yaWdpbmFsVmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVNaW51cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKE1hdGgubWF4KHRoaXMucHJvcHMudmFsdWUgLSAwLjUsIDApKTtcbiAgICB9XG4gICAgaGFuZGxlUGx1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKE1hdGgubWluKHRoaXMucHJvcHMudmFsdWUgKyAwLjUsIHRoaXMucHJvcHMub3JpZ2luYWxWYWx1ZSkpO1xuICAgIH1cbiAgICBoYW5kbGVaZXJvID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoMCk7XG4gICAgfVxuICAgIGhhbmRsZVJlc3RvcmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgdmFsdWVfY2hhbmdlZCA9IE1hdGguYWJzKHRoaXMucHJvcHMudmFsdWUgLSB0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtYWNyby1vdmVycmlkZS1pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4temVyb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IHx8IHRoaXMucHJvcHMucmVhZE9ubHkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVplcm8pIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg4oaTMFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXJlc3RvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB2YWx1ZV9jaGFuZ2VkIDwgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVSZXN0b3JlKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy52YWx1ZSA8IDAuMDUgfHwgdGhpcy5wcm9wcy5yZWFkT25seSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMuaGFuZGxlTWludXMpIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLm9yaWdpbmFsVmFsdWUgPCB0aGlzLnByb3BzLnZhbHVlICsgMC4wNSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVQbHVzKSB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlX2NoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5wcm9wcy5vcmlnaW5hbFZhbHVlLnRvRml4ZWQoMSl9IOKGkiAke3RoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKX1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuT3ZlcnJpZGVJbnB1dC5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX0p1ZGdlVGFibGV0X1RlY2hKdWRnZUxheW91dF9BY3JvUGFnZV9TY29yaW5nTGF5b3V0X092ZXJyaWRlSW5wdXRcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiSnVkZ2VUYWJsZXQvQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuL0VsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSh0aGlzLnNjb3JlLmlkKTtcbiAgICB9XG4gICAgb25BY3JvT3ZlcnJpZGUgPSAoYWNyb19pZHgsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFwaShcImFjcm9iYXRpY19vdmVycmlkZS5zZXRcIiwge1xuICAgICAgICAgICAgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCxcbiAgICAgICAgICAgIGFjcm9iYXRpY19pZHg6IGFjcm9faWR4LFxuICAgICAgICAgICAgc2NvcmU6IHZhbHVlLFxuICAgICAgICB9KS5zZW5kKCk7XG4gICAgfVxuICAgIGdlbk9uQWNyb092ZXJyaWRlKGFjcm9faWR4KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLm9uQWNyb092ZXJyaWRlKGFjcm9faWR4LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgIDxFbGVtZW50XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cbiAgICAgICAgICAgICAgICBhY3JvPXsgYWNybyB9XG4gICAgICAgICAgICAgICAgb25BY3JvT3ZlcnJpZGU9eyB0aGlzLmdlbk9uQWNyb092ZXJyaWRlKGlkeCkgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xuICAgICAgICBpZiAodGhpcy5zY29yZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgIDxoMj57IGhlYWRlciB9PC9oMj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQ29udGVudCgpIH1cbiAgICAgICAgICAgICAgICA8Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZD17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgb25Db25maXJtPXsgdGhpcy5vbkNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuaW1wb3J0IFNlbGVjdG9ySW5wdXQgZnJvbSBcInRhYmxldF91aS9TZWxlY3RvcklucHV0XCI7XG5pbXBvcnQgSW50ZWdlcklucHV0IGZyb20gXCJ0YWJsZXRfdWkvSW50ZWdlcklucHV0XCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIkp1ZGdlVGFibGV0L0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuXG5pbXBvcnQgU3RvcFdhdGNoIGZyb20gXCIuL1N0b3BXYXRjaFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb25maXJtYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0odGhpcy5zY29yZS5pZCk7XG4gICAgfVxuICAgIGhhbmRsZVNjb3JlQ2hhbmdlID0gKHBhcnQsIHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGRhdGFbcGFydF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMuc2NvcmUuaWQsIGRhdGEpO1xuICAgIH1cblxuICAgIGhhbmRsZUp1bXBTdGVwc0NoYW5nZSA9ICh2YWx1ZSkgPT4gdGhpcy5oYW5kbGVTY29yZUNoYW5nZShcImp1bXBfc3RlcHNcIiwgdmFsdWUpO1xuICAgIGhhbmRsZVRpbWluZ1Zpb2xhdGlvbkNoYW5nZSA9ICh2YWx1ZSkgPT4gdGhpcy5oYW5kbGVTY29yZUNoYW5nZShcInRpbWluZ192aW9sYXRpb25cIiwgdmFsdWUpO1xuICAgIGhhbmRsZVBlbmFsdHlDaGFuZ2UgPSAodmFsdWUpID0+IHRoaXMuaGFuZGxlU2NvcmVDaGFuZ2UoXCJwZW5hbHR5XCIsIHZhbHVlKTtcblxuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5vblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY29yZSA9IHRoaXMuc2NvcmUuZGF0YTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgcGVuYWx0aWVzID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpID49IDBcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LnRlY2hfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstNSwgICBfKFwidGFibGV0LnRlY2hfanVkZ2UuZm9ybV95ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xNSwgIF8oXCJ0YWJsZXQudGVjaF9qdWRnZS5mb3JtX3JlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LnRlY2hfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstMywgICBfKFwidGFibGV0LnRlY2hfanVkZ2UueWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMzAsICBfKFwidGFibGV0LnRlY2hfanVkZ2UucmVkX2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTAwLCBfKFwidGFibGV0LnRlY2hfanVkZ2UuYmxhY2tfY2FyZFwiKV0sXG4gICAgICAgICAgICBdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmhlYWRfanVkZ2UucGVuYWx0eV90eXBlXCIpIH1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBwZW5hbHRpZXMgfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZS5yYXdfZGF0YS5wZW5hbHR5IH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVBlbmFsdHlDaGFuZ2UgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIiAvPlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQudGVjaF9qdWRnZS5qdW1wX3N0ZXBzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDxJbnRlZ2VySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgc2VuZERlbHRhc1xuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZS5yYXdfZGF0YS5qdW1wX3N0ZXBzIH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUp1bXBTdGVwc0NoYW5nZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiIC8+XG4gICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQudGVjaF9qdWRnZS50aW1pbmdcIikgfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPFN0b3BXYXRjaFxuICAgICAgICAgICAgICAgICAgICBzY29yZUlkPXsgdGhpcy5zY29yZS5pZCB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgW1t0cnVlLCBcIlhcIl0sIFtudWxsLCBcIi1cIl0sIFtmYWxzZSwgXCJPS1wiXV0gfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IHRoaXMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZS5yYXdfZGF0YS50aW1pbmdfdmlvbGF0aW9uIH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVRpbWluZ1Zpb2xhdGlvbkNoYW5nZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiIC8+XG4gICAgICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17IHRoaXMuaGFuZGxlQ29uZmlybWF0aW9uIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IG1ha2VDbGFzc05hbWUgZnJvbSBcImNvbW1vbi9tYWtlQ2xhc3NOYW1lXCI7XG5pbXBvcnQgb25Ub3VjaE9yQ2xpY2sgZnJvbSBcInRhYmxldF91aS9vblRvdWNoT3JDbGlja1wiO1xuXG5sZXQgc3RvcHdhdGNoZXMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZUlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIGxldCBzdGF0ZSA9IHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVJZF0gfHwge1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgc3RyX3ZhbHVlOiBcIjA6MDBcIixcbiAgICAgICAgICAgIGludGVydmFsOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgICAgICBzdGF0ZS5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuaGFuZGxlVGljaywgMTApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZUlkXSA9IHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgbm93KCkge1xuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBzdGFydF9hdDogdGhpcy5ub3coKSAtIHRoaXMuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICBpbnRlcnZhbDogc2V0SW50ZXJ2YWwodGhpcy5oYW5kbGVUaWNrLCAxMCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb2dnbGUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlUmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlVGljayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICBpZiAobmV3X3ZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlXG4gICAgICAgICAgICA/ICh0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS5zdGFydF9hdClcbiAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICB9XG5cbiAgICBwYWQobnVtLCBzaXplKSB7XG4gICAgICAgIGNvbnN0IHMgPSBgMDAwMCR7bnVtfWA7XG4gICAgICAgIHJldHVybiBzLnN1YnN0cihzLmxlbmd0aCAtIHNpemUpO1xuICAgIH1cbiAgICBnZXRTdHJWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgbGV0IG0gPSAwLCBzID0gMDtcbiAgICAgICAgbSA9IE1hdGguZmxvb3IodmFsIC8gKDYwICogMTAwMCkpO1xuICAgICAgICB2YWwgJT0gNjAgKiAxMDAwO1xuICAgICAgICBzID0gTWF0aC5mbG9vcih2YWwgLyAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGAke219OiR7dGhpcy5wYWQocywgMil9YDtcbiAgICB9XG5cbiAgICBnZXRUb2dnbGVCdXR0b25DbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NOYW1lKHtcbiAgICAgICAgICAgIFwidGJ0blwiOiB0cnVlLFxuICAgICAgICAgICAgXCJidG4tdG9nZ2xlXCI6IHRydWUsXG4gICAgICAgICAgICBcImlnbm9yZS1yZWFkb25seVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdGhpcy5zdGF0ZS5hY3RpdmUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3B3YXRjaFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcmVzZXQgaWdub3JlLXJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLmhhbmRsZVJlc2V0KSB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5yZXNldF9zdG9wd2F0Y2hcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5nZXRUb2dnbGVCdXR0b25DbGFzc05hbWUoKSB9XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5oYW5kbGVUb2dnbGUpIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXyhcInRhYmxldC5idXR0b25zLnN0b3Bfc3RvcHdhdGNoXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdGFydF9zdG9wd2F0Y2hcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RyVmFsdWUoKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gXCJKdWRnZVRhYmxldC9HcmlkXCI7XG5cbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2luZ1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucnVucy5tYXAocnVuID0+XG4gICAgICAgICAgICA8U2NvcmluZ0xheW91dFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3RlclwiO1xuaW1wb3J0IEZvb3Rlckl0ZW0gZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3Rlci9Gb290ZXJJdGVtXCI7XG5cbmltcG9ydCBEYW5jaW5nUGFnZSBmcm9tIFwiLi9EYW5jaW5nUGFnZVwiO1xuaW1wb3J0IEFjcm9QYWdlIGZyb20gXCIuL0Fjcm9QYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlY2hKdWRnZUxheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgICAgICBwYWdlOiBcImRhbmNpbmdcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzKSB7XG4gICAgICAgIGlmIChuZXh0X3Byb3BzLnRvdXIuaWQgIT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgY29uc3QgcHJldl9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gbmV4dF9wcm9wcztcbiAgICAgICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaGVhdDogdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQsXG4gICAgICAgICAgICAgICAgcGFnZTogXCJkYW5jaW5nXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBwcmV2X3Byb3BzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBoZWF0c19jb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJoZWF0c19jb3VudFwiLCAoKSA9PlxuICAgICAgICAgICAgTWF0aC5tYXgoLi4udGhpcy5wcm9wcy50b3VyLnJ1bnMubWFwKHJ1biA9PiBydW4uaGVhdCkpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuaGVhdClcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGZpcnN0X25vbl9jb25maXJtZWRfaGVhdCgpIHtcbiAgICAgICAgZm9yIChjb25zdCBydW4gb2YgdGhpcy5wcm9wcy50b3VyLnJ1bnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgcnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCAmJiAhc2NvcmUuY29uZmlybWVkICYmIHJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bi5oZWF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5oZWF0c19jb3VudDtcbiAgICB9XG4gICAgdXBkYXRlSGVhdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGhlYXQ6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBoYW5kbGVOZXh0SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0ICsgMSk7XG4gICAgfVxuICAgIGhhbmRsZVBhZ2VDaGFuZ2UgPSAocGFnZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcGFnZSB9KTtcbiAgICB9XG4gICAgcmVuZGVyRGFuY2luZygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxEYW5jaW5nUGFnZVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBydW5zPXsgdGhpcy5ydW5zIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQWNybygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBY3JvUGFnZVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBydW5zPXsgdGhpcy5ydW5zIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBjb25zdCBoZWF0c19jb3VudCA9IHRoaXMuaGVhdHNfY291bnQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICAgICAgaGVhdD17IHRoaXMuc3RhdGUuaGVhdCB9XG4gICAgICAgICAgICAgICAgaGVhdHNDb3VudD17IGhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICBqdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICBtYXhIZWF0PXsgdGhpcy5maXJzdF9ub25fY29uZmlybWVkX2hlYXQgfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIG9uTmV4dEhlYXRDbGljaz17IHRoaXMuaGFuZGxlTmV4dEhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgb25QcmV2SGVhdENsaWNrPXsgdGhpcy5oYW5kbGVQcmV2SGVhdENsaWNrIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS5wYWdlKSB7XG4gICAgICAgIGNhc2UgXCJkYW5jaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEYW5jaW5nKCk7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3JvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAoW1wicm9zZmFyci5hY3JvXCIsIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb290ZXIgdmFsdWU9eyB0aGlzLnN0YXRlLnBhZ2UgfSBvbkNoYW5nZT17IHRoaXMuaGFuZGxlUGFnZUNoYW5nZSB9PlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5kYW5jaW5nXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImRhbmNpbmdcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmFjcm9cIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiYWNyb1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9vdGVyPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvc2ZhcnItSnVkZ2VUYWJsZXQgVGVjaEp1ZGdlTGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyRm9vdGVyKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgKHByb3BzKSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLnRvdGFsX3Njb3JlXCIpIH06IHsgcHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9XG4gICAgPC9kaXY+XG4pO1xuIiwiaW1wb3J0IGdldFNjb3JpbmdUeXBlIGZyb20gXCJjb21tb24vZ2V0U2NvcmluZ1R5cGVcIjtcclxuXHJcbmltcG9ydCBBY3JvYmF0aWNzTGF5b3V0IGZyb20gXCIuL0Fjcm9iYXRpY3NMYXlvdXRcIjtcclxuaW1wb3J0IERhbmNlTGF5b3V0IGZyb20gXCIuL0RhbmNlTGF5b3V0XCI7XHJcbmltcG9ydCBEYW5jZUhhbHZlZExheW91dCBmcm9tIFwiLi9EYW5jZUhhbHZlZExheW91dFwiO1xyXG5pbXBvcnQgRm9ybWF0aW9uTGF5b3V0IGZyb20gXCIuL0Zvcm1hdGlvbkxheW91dFwiO1xyXG5pbXBvcnQgRm9ybWF0aW9uQWNyb0xheW91dCBmcm9tIFwiLi9Gb3JtYXRpb25BY3JvTGF5b3V0XCI7XHJcbmltcG9ydCBTaW1wbGlmaWVkTGF5b3V0IGZyb20gXCIuL1NpbXBsaWZpZWRMYXlvdXRcIjtcclxuaW1wb3J0IEhlYWRKdWRnZUxheW91dCBmcm9tIFwiLi9IZWFkSnVkZ2VMYXlvdXRcIjtcclxuaW1wb3J0IFRlY2hKdWRnZUxheW91dCBmcm9tIFwiLi9UZWNoSnVkZ2VMYXlvdXRcIjtcclxuXHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJIb3N0TW9kdWxlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVkZ2VUYWJsZXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIExBWU9VVFMgPSB7XHJcbiAgICAgICAgXCJhY3JvXCI6IEFjcm9iYXRpY3NMYXlvdXQsXHJcbiAgICAgICAgXCJkYW5jZVwiOiBEYW5jZUxheW91dCxcclxuICAgICAgICBcImRhbmNlX2hhbHZlZFwiOiBEYW5jZUhhbHZlZExheW91dCxcclxuICAgICAgICBcImZvcm1hdGlvblwiOiBGb3JtYXRpb25MYXlvdXQsXHJcbiAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBGb3JtYXRpb25BY3JvTGF5b3V0LFxyXG4gICAgICAgIFwic2ltcGxpZmllZFwiOiBTaW1wbGlmaWVkTGF5b3V0LFxyXG4gICAgICAgIFwiaGVhZFwiOiBIZWFkSnVkZ2VMYXlvdXQsXHJcbiAgICAgICAgXCJ0ZWNoXCI6IFRlY2hKdWRnZUxheW91dCxcclxuICAgIH07XHJcbiAgICBvblNjb3JlVXBkYXRlID0gKHNjb3JlX2lkLCBuZXdfc2NvcmUpID0+IHtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgc2NvcmVfZGF0YTogbmV3X3Njb3JlLFxyXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBBcGkoXCJzY29yZS5zZXRcIiwgeyBzY29yZV9pZDogc2NvcmVfaWQsIGRhdGE6IHJlcXVlc3QgfSkuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgb25TY29yZUNvbmZpcm0gPSAoc2NvcmVfaWQpID0+IHtcclxuICAgICAgICBBcGkoXCJzY29yZS5jb25maXJtXCIsIHsgc2NvcmVfaWQ6IHNjb3JlX2lkIH0pLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpO1xyXG4gICAgICAgIGxldCBMYXlvdXRDbGFzcyA9IEp1ZGdlVGFibGV0LkxBWU9VVFNbc2NvcmluZ190eXBlXTtcclxuICAgICAgICBpZiAoIUxheW91dENsYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2Pk5vdCBpbXBsZW1lbnRlZCE8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3NmYXJyLUp1ZGdlVGFibGV0XCI+XHJcbiAgICAgICAgICAgICAgICA8TGF5b3V0Q2xhc3NcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLm9uU2NvcmVDb25maXJtIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHBsYWNlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZV9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyYm9zZV90b3RhbF9zY29yZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbF9wZW5hbHR5OiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldENhcmQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIuKAlFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3cucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUudG90YWxfcGVuYWx0eS50b0ZpeGVkKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1RvdGFsU2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gXCLigJRcIjtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gKFxyXG4gICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICZuYnNwO3sgXCIvIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBjb250ZW50IH1cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnBsYWNlIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucm93LnJ1bi5wYXJ0aWNpcGFudClcclxuICAgICAgICAgICAgICAgICB9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjbHViXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIH1cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRDYXJkKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlMV9Sb3dcIjtcclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIG5leHRfdG91cl9pZDogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XG4gICAgICAgIGRvY3hcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZVwiLCBcImZvbnQtc2l6ZVwiLCBcIjEycHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKTtcbiAgICB9XG5cbiAgICBnZXRSb3dTdGF0dXMocm93KSB7XG4gICAgICAgIGlmICghcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X3BlcmZvcm1lZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3cuYWR2YW5jZXMgPyBcImFkdmFuY2VkXCIgOiBcIm5vdF9hZHZhbmNlZFwiO1xuICAgIH1cbiAgICBnZXRTdGF0dXNIZWFkZXIocm93X3N0YXR1cykge1xuICAgICAgICByZXR1cm4gXyhgcmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c18ke3Jvd19zdGF0dXN9YCk7XG4gICAgfVxuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKHByZXZfcm93LCBuZXh0X3JvdywgaGFzX25leHRfdG91ciwgbl9jb2xzKSB7XG4gICAgICAgIGNvbnN0IHByZXZfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMocHJldl9yb3cpO1xuICAgICAgICBjb25zdCBuZXh0X3N0YXR1cyA9IHRoaXMuZ2V0Um93U3RhdHVzKG5leHRfcm93KTtcbiAgICAgICAgaWYgKHByZXZfc3RhdHVzID09PSBuZXh0X3N0YXR1cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRfc3RhdHVzICE9PSBcIm5vdF9wZXJmb3JtZWRcIiAmJiAhaGFzX25leHRfdG91cikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgQUgke25leHRfcm93LnJ1bi5pZH1gIH0+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImFkdmFuY2VzLWhlYWRlclwiIGNvbFNwYW49eyBuX2NvbHMgfT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RhdHVzSGVhZGVyKG5leHRfc3RhdHVzKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBjb25zdCBzaG93X3RvdGFsX3Njb3JlID0gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YoXG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPCAwO1xuICAgICAgICBjb25zdCBkanNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZGogPT4gW2RqLmlkLCBkal0pKTtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wcy50YWJsZS5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRhYmxlW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4XSxcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIDUgKyBzaG93X3RvdGFsX3Njb3JlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucHJvcHMudGFibGVbaWR4XTtcbiAgICAgICAgICAgIHJvd3MucHVzaChcbiAgICAgICAgICAgICAgICA8Um93XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgcm93LnJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgICAgIHJvdz17IHJvdyB9XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlPXsgc2hvd190b3RhbF9zY29yZSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUmVzdWx0c1RhYmxlMVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNyBwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5udW1iZXJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2x1YlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNob3dfdG90YWxfc2NvcmUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SZXN1bHRzVGFibGUxLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlMVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uc1dpZHRocyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcywgaGFzX3RvdGFsX3Njb3JlKSB7XHJcbiAgICAgICAgdGhpcy5qdWRnZV93aWR0aCA9IE1hdGgucm91bmQoNTUgLyAobl9qdWRnZXMgKyAxKSk7XHJcbiAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCA9IGhhc190b3RhbF9zY29yZSA/IDE0IDogMDtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gNjtcclxuICAgICAgICB0aGlzLm51bWJlcl93aWR0aCA9IDM7XHJcbiAgICAgICAgdGhpcy5uYW1lX3dpZHRoID0gMTAwIC0gdGhpcy5qdWRnZV93aWR0aCAqIChuX2p1ZGdlcyArIDEpIC1cclxuICAgICAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCAtIHRoaXMucGxhY2Vfd2lkdGggLSB0aGlzLm51bWJlcl93aWR0aDtcclxuICAgIH1cclxuICAgIGdlblBsYWNlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuTnVtYmVyU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubnVtYmVyX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbk5hbWVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5uYW1lX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlblRvdGFsU2NvcmVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy50b3RhbF9zY29yZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5KdWRnZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmp1ZGdlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA6IFBULmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBwbGFjZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBzY29yZXM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeV9zY29yZTogUFQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNob3dUb3RhbFNjb3JlOiBQVC5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Zvcm1hdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gW1wicm9zZmFyci5mb3JtYXRpb25cIiwgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FyZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwi4oCUXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWRfanVkZ2Vfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLmZpbmQoXHJcbiAgICAgICAgICAgIHNjb3JlID0+IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlc01hcC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCkucm9sZSA9PT0gXCJoZWFkX2p1ZGdlXCIpO1xyXG4gICAgICAgIGlmICghaGVhZF9qdWRnZV9zY29yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZWFkX2p1ZGdlX3Njb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LmFkZGl0aW9uYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH1cclxuICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgeyBgICgke3Njb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgxKX0pYCB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyU2NvcmUoZGlzY2lwbGluZV9qdWRnZSwgc2NvcmUpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJm1kYXNoO1xyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImRhbmNlX2p1ZGdlXCIgJiYgdGhpcy5pc0Zvcm1hdGlvbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIHsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUb3RhbFNjb3JlQ2VsbCgpIHtcclxuICAgICAgICBjb25zdCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlO1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93VG90YWxTY29yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmbWRhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBfc2NvcmUgPSB0b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgY29uc3Qgc19zY29yZSA9IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGAke18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZV9zaG9ydFwiKSB9OiAke3Bfc2NvcmV9IC8gJHtzX3Njb3JlfWAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2VtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwO3sgXCIvIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAmbmJzcDt7IFwiLyBcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlckp1ZGdlc1Njb3JlcygpIHtcclxuICAgICAgICBjb25zdCBzY29yZXNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLm1hcChzY29yZSA9PiBbc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCwgc2NvcmVdKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluZURpc2NpcGxpbmVKdWRnZXMubWFwKChkaiwgaWR4KSA9PlxyXG4gICAgICAgICAgICA8dGQga2V5PXsgZGogPyBkai5pZCA6IGBJJHtpZHh9YCB9PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlKGRqLCBzY29yZXNfbWFwLmdldChkai5pZCkpIH1cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5yb3cucGxhY2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50KSB9XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmVDZWxsKCkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckp1ZGdlc1Njb3JlcygpIH1cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldENhcmQoKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5Sb3cuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUyX1Jvd1wiO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIjtcclxuaW1wb3J0IENvbHVtbnNXaWR0aHMgZnJvbSBcIi4vQ29sdW1uc1dpZHRoc1wiO1xyXG5cclxuaW1wb3J0IGdldEp1ZGdlVGFibGVNYXJrIGZyb20gXCJnZXRKdWRnZVRhYmxlTWFya1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1RhYmxlMiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YWJsZTogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBhZHZhbmNlczogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZDogUFQuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczogUFQuYXJyYXlPZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyYW5zZm9ybURvY3goZG9jeCkge1xyXG4gICAgICAgIGRvY3hcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Um93U3RhdHVzKHJvdykge1xyXG4gICAgICAgIGlmICghcm93KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3cucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJub3RfcGVyZm9ybWVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3cuYWR2YW5jZXMgPyBcImFkdmFuY2VkXCIgOiBcIm5vdF9hZHZhbmNlZFwiO1xyXG4gICAgfVxyXG4gICAgZ2V0U3RhdHVzSGVhZGVyKHJvd19zdGF0dXMpIHtcclxuICAgICAgICByZXR1cm4gXyhgcmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c18ke3Jvd19zdGF0dXN9YCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihwcmV2X3JvdywgbmV4dF9yb3csIGhhc19uZXh0X3RvdXIsIG5fY29scykge1xyXG4gICAgICAgIGNvbnN0IHByZXZfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMocHJldl9yb3cpO1xyXG4gICAgICAgIGNvbnN0IG5leHRfc3RhdHVzID0gdGhpcy5nZXRSb3dTdGF0dXMobmV4dF9yb3cpO1xyXG4gICAgICAgIGlmIChwcmV2X3N0YXR1cyA9PT0gbmV4dF9zdGF0dXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXh0X3N0YXR1cyAhPT0gXCJub3RfcGVyZm9ybWVkXCIgJiYgIWhhc19uZXh0X3RvdXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0ciBrZXk9eyBgQUgke25leHRfcm93LnJ1bi5pZH1gIH0+XHJcbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RhdHVzSGVhZGVyKG5leHRfc3RhdHVzKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNob3dfdG90YWxfc2NvcmUgPSBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZihcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMDtcclxuICAgICAgICBjb25zdCBsaW5lX2p1ZGdlcyA9IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLmZpbHRlcihcclxuICAgICAgICAgICAgZGogPT4gW1wiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCJdLmluZGV4T2YoZGoucm9sZSkgPj0gMCk7XHJcbiAgICAgICAgY29uc3QgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XHJcbiAgICAgICAgY29uc3Qgd2lkdGhzID0gbmV3IENvbHVtbnNXaWR0aHMobGluZV9qdWRnZXMubGVuZ3RoLCBzaG93X3RvdGFsX3Njb3JlKTtcclxuICAgICAgICBjb25zdCBkanNfbWFwID0gbmV3IE1hcCh0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZGogPT4gW2RqLmlkLCBkal0pKTtcclxuICAgICAgICBsZXQgcm93cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcHMudGFibGUubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGFibGVbaWR4IC0gMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRhYmxlW2lkeF0sXHJcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxyXG4gICAgICAgICAgICAgICAgNCArIGxpbmVfanVkZ2VzLmxlbmd0aCArIHNob3dfdG90YWxfc2NvcmVcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaChcclxuICAgICAgICAgICAgICAgIDxSb3dcclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgZGpzX21hcCB9XHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgdGhpcy5wcm9wcy50YWJsZVtpZHhdLnJ1bi5pZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZURpc2NpcGxpbmVKdWRnZXM9eyBsaW5lX2p1ZGdlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy50YWJsZVtpZHhdIH1cclxuICAgICAgICAgICAgICAgICAgICBzaG93VG90YWxTY29yZT17IHNob3dfdG90YWxfc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJSZXN1bHRzVGFibGUyXCI+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIiBzdHlsZT17IHdpZHRocy5nZW5OdW1iZXJTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHN0eWxlPXsgd2lkdGhzLmdlbk5hbWVTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNob3dfdG90YWxfc2NvcmUgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuVG90YWxTY29yZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsaW5lX2p1ZGdlcy5tYXAoZGogPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGgga2V5PXsgZGouaWQgfSBzdHlsZT17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGdldEp1ZGdlVGFibGVNYXJrKGRqKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm93cyB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlc3VsdHNUYWJsZTIuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUyXCI7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbHVtbnNXaWR0aHMge1xyXG4gICAgY29uc3RydWN0b3Iobl9qdWRnZXMpIHtcclxuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg3MCAvIG5fanVkZ2VzKTtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gN1xyXG4gICAgICAgIHRoaXMuaW5mb193aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtIHRoaXMucGxhY2Vfd2lkdGg7XHJcbiAgICB9XHJcbiAgICBnZW5QbGFjZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkluZm9TdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5pbmZvX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3JvU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9uczogUFQuYXJyYXlPZihQVC5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5hY3JvX25cIiwgaWR4ICsgMSkgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUoc2NvcmUsIFwiLSQlXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZmRcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5BY3JvU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19BY3JvU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW5jZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ3X3dvbWFuOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmd19tYW46IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yaW5nVHlwZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY29yZV9mb3JtYXQgPSB0aGlzLnByb3BzLnNjb3JpbmdUeXBlID09PSBcImRhbmNlX2hhbHZlZFwiID8gXCJAXCIgOiBcIiRcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmZ3XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5md193b21hbiwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmZ3X21hbiwgXCItJCVcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIHNjb3JlX2Zvcm1hdCkgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uY1wiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmNvbXBvc2l0aW9uLCBzY29yZV9mb3JtYXQpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRGFuY2VTY29yZS5kaXNwbGF5TmFtZSA9IFwicnVsZXNfc2V0c19yb3NmYXJyX1Jlc3VsdHNUYWJsZTNfUm93X0RhbmNlU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25BY3JvU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBwbGFjZXM6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3RhbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHJhd19kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV90ZWNoOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW5jZV9maWdzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXByZXNzaW9uOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbF9taXN0YWtlczogUFQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnX21pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmFcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmFjcm9iYXRpY3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfdGVjaCwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uaVwiKSAgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuc21hbGxfbWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnBcIikgIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5wcm9wcy5yb3cuYWRkaXRpb25hbF9kYXRhLnBsYWNlc1t0aGlzLnByb3BzLnNjb3JlLmlkXSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Gb3JtYXRpb25BY3JvU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25BY3JvU2NvcmVcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBmb3JtYXRTY29yZSBmcm9tIFwiLi9mb3JtYXRTY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb25TY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbF9kYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlczogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzY29yZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgcmF3X2RhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX3RlY2g6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbmNlX2ZpZ3M6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcHJlc3Npb246IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmR0XCIpIH06PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IGZvcm1hdFNjb3JlKHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyBmb3JtYXRTY29yZSh0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuaW1wcmVzc2lvbiwgXCJAXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLm1cIikgfTo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnsgZm9ybWF0U2NvcmUodGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57IHRoaXMucHJvcHMucm93LmFkZGl0aW9uYWxfZGF0YS5wbGFjZXNbdGhpcy5wcm9wcy5zY29yZS5pZF0gfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRm9ybWF0aW9uU2NvcmUuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzX1Jvd19Gb3JtYXRpb25TY29yZVwiO1xuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZvQ2VsbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3c6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGFkdmFuY2VzOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsX3Njb3JlOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgYWNyb2JhdGljczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9zY29yZTogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0aW9uX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BvcnRzbWVuOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiBQVC5hcnJheU9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxfc2NvcmU6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2VfdG90YWxfc2NvcmU6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfdG91cjogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBuZXh0X3RvdXJfaWQ6IFBULm51bWJlcixcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyUGFydGljaXBhbnRJbmZvKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yb3cucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJvdy5ydW4ucGFydGljaXBhbnQpIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhlYWRfanVkZ2Vfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4uc2NvcmVzLmZpbmQoXG4gICAgICAgICAgICBzY29yZSA9PiB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZXNNYXAuZ2V0KHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpLnJvbGUgPT09IFwiaGVhZF9qdWRnZVwiKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIHsgYCR7XyhcInJlc3VsdHMubGFiZWxzLnBlbmFsdHlcIil9OiBgIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7IGhlYWRfanVkZ2Vfc2NvcmVcbiAgICAgICAgICAgICAgICAgICAgPyAgaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoKVxuICAgICAgICAgICAgICAgICAgICA6IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoW1wicm9zZmFyci5hY3JvXCIsIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFzX2Fjcm9fb3ZlcnJpZGVzID0gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MuZmluZEluZGV4KFxuICAgICAgICAgICAgZWxlbWVudCA9PiBlbGVtZW50LnNjb3JlICE9PSBlbGVtZW50Lm9yaWdpbmFsX3Njb3JlXG4gICAgICAgICkgPiAwO1xuICAgICAgICBjb25zdCBhY3JvX2NlbGxfd2lkdGggPSBgJHsoMTAwIC8gdGhpcy5wcm9wcy5yb3cucnVuLmFjcm9iYXRpY3MubGVuZ3RoKX0lYDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NfdmVyYm9zZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH06XG4gICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYWNyby10YWJsZVwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLm9yaWdpbmFsX3Njb3JlLnRvRml4ZWQoMSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICB7IGhhc19hY3JvX292ZXJyaWRlcyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucm93LnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gc3R5bGU9eyB7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8uc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NGd1Njb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKTtcbiAgICAgICAgY29uc3Qgc19zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyBgOiAke3Bfc2NvcmV9IC8gJHtzX3Njb3JlfWAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucm93LnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcF9zY29yZSA9IHRoaXMucHJvcHMucm93LnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IHNfc2NvcmUgPSB0aGlzLnByb3BzLnJvdy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5hY3JvX3Njb3JlXCIpIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7IGA6ICR7cF9zY29yZX0gLyAke3Nfc2NvcmV9YCB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFtcInJvc2ZhcnIuZm9ybWF0aW9uXCIsIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXS5pbmRleE9mKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIil9OiAke3RoaXMucHJvcHMucm93LnJ1bi50b3RhbF9zY29yZX1gIH1cbiAgICAgICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvdy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPGVtPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5ub3RfcGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgICAgICA8L2VtPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlck5leHRUb3VyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgeyBgJHtfKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpfTogYCB9XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgICAgICA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKVxuICAgICAgICAgICAgICAgICAgICA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiaW5mby1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0aWNpcGFudEluZm8oKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRKdWRnZVBlbmFsdHkoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQW1DbGFzc0Z3U2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0VG91ckxhYmVsKCkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkluZm9DZWxsLmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19JbmZvQ2VsbFwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U2NvcmUoc2NvcmUsIHRlbXBsYXRlPVwiJFwiKSB7XG4gICAgaWYgKHNjb3JlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIuKAlFwiO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCIkXCIsIHNjb3JlKVxuICAgICAgICAucmVwbGFjZShcIkBcIiwgc2NvcmUudG9GaXhlZCgxKSk7XG59XG4iLCJpbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xuXG5pbXBvcnQgSW5mb0NlbGwgZnJvbSBcIi4vSW5mb0NlbGxcIjtcbmltcG9ydCBBY3JvU2NvcmUgZnJvbSBcIi4vQWNyb1Njb3JlXCI7XG5pbXBvcnQgRGFuY2VTY29yZSBmcm9tIFwiLi9EYW5jZVNjb3JlXCI7XG5pbXBvcnQgRm9ybWF0aW9uQWNyb1Njb3JlIGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9TY29yZVwiO1xuaW1wb3J0IEZvcm1hdGlvblNjb3JlIGZyb20gXCIuL0Zvcm1hdGlvblNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlc01hcDogUFQuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvdzogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogUFQub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgcGxhY2U6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkOiBQVC5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlczogUFQuYXJyYXlPZihcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NlX3RvdGFsX3Njb3JlOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlfc2NvcmU6IFBULm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX3RvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5X3Njb3JlOiBQVC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclNjb3JlKGRpc2NpcGxpbmVfanVkZ2UsIHNjb3JlKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yb3cucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAmbWRhc2g7XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgU2NvcmVDb21wb25lbnQgPSBudWxsO1xuICAgICAgICBjb25zdCBzY29yaW5nX3R5cGUgPSBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSk7XG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ190eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYW5jZVwiOlxuICAgICAgICBjYXNlIFwiZGFuY2VfaGFsdmVkXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IERhbmNlU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFjcm9cIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gQWNyb1Njb3JlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcbiAgICAgICAgICAgIFNjb3JlQ29tcG9uZW50ID0gRm9ybWF0aW9uU2NvcmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICBTY29yZUNvbXBvbmVudCA9IEZvcm1hdGlvbkFjcm9TY29yZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgIHJvdzogdGhpcy5wcm9wcy5yb3csXG4gICAgICAgICAgICBzY29yaW5nVHlwZTogc2NvcmluZ190eXBlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNjb3JlQ29tcG9uZW50IHsgLi4ucHJvcHMgfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJKdWRnZXNTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHNjb3Jlc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMucm93LnJ1bi5zY29yZXMubWFwKHNjb3JlID0+IFtzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkLCBzY29yZV0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluZURpc2NpcGxpbmVKdWRnZXMubWFwKChkaiwgaWR4KSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGRqID8gZGouaWQgOiBgSSR7aWR4fWAgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUoZGosIHNjb3Jlc19tYXAuZ2V0KGRqLmlkKSkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnJvdy5wbGFjZSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDxJbmZvQ2VsbFxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2VzTWFwPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzTWFwIH1cbiAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5yb3cgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJKdWRnZXNTY29yZXMoKSB9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUm93LmRpc3BsYXlOYW1lID0gXCJydWxlc19zZXRzX3Jvc2ZhcnJfUmVzdWx0c1RhYmxlM19Sb3dcIjtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5pbXBvcnQgQ29sdW1uc1dpZHRocyBmcm9tIFwiLi9Db2x1bW5zV2lkdGhzXCI7XHJcblxyXG5pbXBvcnQgZ2V0SnVkZ2VUYWJsZU1hcmsgZnJvbSBcImdldEp1ZGdlVGFibGVNYXJrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZXM6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQ6IFBULmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgbmV4dF90b3VyX2lkOiBQVC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtRG9jeChkb2N4KSB7XHJcbiAgICAgICAgZG9jeFxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGVcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcInBhZGRpbmdcIiwgXCIwIDNwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duXCIsIFwid2lkdGhcIiwgXCI1MHB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmVfanVkZ2VzID0gdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKFxyXG4gICAgICAgICAgICBkaiA9PiBbXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIl0uaW5kZXhPZihkai5yb2xlKSA+PSAwKTtcclxuICAgICAgICBjb25zdCB3aWR0aHMgPSBuZXcgQ29sdW1uc1dpZHRocyhsaW5lX2p1ZGdlcy5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGRqc19tYXAgPSBuZXcgTWFwKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzLm1hcChkaiA9PiBbZGouaWQsIGRqXSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlJlc3VsdHNUYWJsZTNcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuSW5mb1N0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGluZV9qdWRnZXMubWFwKGRqID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBnZXRKdWRnZVRhYmxlTWFyayhkaikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudGFibGUubWFwKHJvdyA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXNNYXA9eyBkanNfbWFwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyByb3cucnVuLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGlzY2lwbGluZUp1ZGdlcz17IGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9eyByb3cgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlc3VsdHNUYWJsZTMuZGlzcGxheU5hbWUgPSBcInJ1bGVzX3NldHNfcm9zZmFycl9SZXN1bHRzVGFibGUzXCI7XHJcbiIsInZhciBDYWNoZU1peGluID0gQmFzZSA9PiBjbGFzcyBleHRlbmRzIEJhc2Uge1xuICAgIHJlc2V0Q2FjaGUoKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDYWNoZSgpO1xuICAgIH1cbiAgICBmZXRjaEZyb21DYWNoZShrZXksIGdlbmVyYXRvcikge1xuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jYWNoZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBnZW5lcmF0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVba2V5XTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWNoZU1peGluO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnREaXNwbGF5KHBhcnRpY2lwYW50KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZGlzcGxheS1uYW1lXHJcbiAgICBpZiAocGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgIHsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJ0aWNpcGFudC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+XHJcbiAgICAgICAgPHAga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgIHsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICBzd2l0Y2ggKGRpc2NpcGxpbmVfanVkZ2Uucm9sZSkge1xyXG4gICAgY2FzZSBcImRhbmNlX2p1ZGdlXCI6XHJcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvblwiO1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvbl9hY3JvXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuc2ltcGxpZmllZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJzaW1wbGlmaWVkXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlX2hhbHZlZFwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcImFjcm9fanVkZ2VcIjpcclxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9md1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZV9oYWx2ZWRcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJhY3JvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcInRlY2hfanVkZ2VcIjpcclxuICAgICAgICByZXR1cm4gXCJ0ZWNoXCI7XHJcbiAgICBjYXNlIFwiaGVhZF9qdWRnZVwiOlxyXG4gICAgICAgIHJldHVybiBcImhlYWRcIjtcclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiBnZXRKdWRnZVRhYmxlTWFyayhkaXNjaXBsaW5lX2p1ZGdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGRpc2NpcGxpbmVfanVkZ2UuanVkZ2UubnVtYmVyO1xuICAgIGlmIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSB7XG4gICAgICAgIHJlc3VsdCArPSBcIiAoQSlcIjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0SnVkZ2VUYWJsZU1hcms7XG4iLCJpbXBvcnQgdHJhbnNsYXRlX3J1IGZyb20gXCIuL3J1XCI7XHJcblxyXG5jb25zdCBfID0gdHJhbnNsYXRlX3J1XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCAuLi5hcmdzKSB7XHJcbiAgICBsZXQgUEhSQVNFUyA9IHtcclxuICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NsdWJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC60LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvblwiOiBcItCh0L7Qt9C00LDRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfZGlzY2lwbGluZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YNcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2p1ZGdlXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgdGD0LTRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF90b3VyXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X251bWJlcnNcIjogXCLQndC+0LzQtdGA0LAg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0XCI6IFwi0JjQvNC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibGF1bmNoX2F1dG9fcHJpbnRlclwiOiBcItCX0LDQv9GD0YHQuiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC5INC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0J/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0LLRgdC1INGD0YHRgtGA0L7QudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0J7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBg0JDQutGA0L7QsdCw0YLQuNC60LAgJHtuICsgMX1gLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhhc191bmNvbmZpcm1lZF9zY29yZXNcIjogXCLQmNC80LXRjtGC0YHRjyDQvdC10LfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L3Ri9C1INC+0YbQtdC90LrQuCDRgdGD0LTQtdC5INCyINC/0L7RgdC70LXQtNC90LXQvCDQt9Cw0YXQvtC00LUuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfc3RvcHdhdGNoXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcG9zaXRpb25cIjogXCLQmtC+0LzQv9C+0LfQuNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybV9mYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1fYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMylcIixcclxuICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wcmVzc2lvblwiOiBcItCe0LHRidC10LUg0LLQv9C10YfQsNGC0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfbnVtYmVyXCI6IChuKSA9PiBg0KHRg9C00YzRjyDihJYke259YCxcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9udW1iZXJcIjogKG4sIHQpID0+IGDQl9Cw0YXQvtC0ICR7bn0g0LjQtyAke3R9YCxcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmtfbm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkX25vdF9wZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlX3Njb3Jlc1wiOiBcItCe0YbQtdC90LrQuCDQu9C40L3QtdC50L3Ri9GFINGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZW5hbHR5X3R5cGVcIjogXCLQqNGC0YDQsNGE0L3Ri9C1INGB0LDQvdC60YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlX3Njb3Jlc1wiOiBcItCe0YbQtdC90LrQuCDRgtC10YXQvdC40YfQtdGB0LrQuNGFINGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1feWVsbG93X2NhcmRcIjogXCItNVwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJva1wiOiBcIk9LXCIsXHJcbiAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gYNCh0LHRgNC+0YEg0L3QsCAke259YCxcclxuICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jaW5nXCI6IFwi0KLQsNC90LXRhlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBgQSR7bn1gLFxyXG4gICAgICAgICAgICAgICAgXCJibVwiOiBcItCR0J5cIixcclxuICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkdFwiOiBcItCiVFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3XCI6IFwi0J7QpdC2XCIsXHJcbiAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXHJcbiAgICAgICAgICAgICAgICBcInBcIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIjogXCLQndC1INC/0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzX3ZlcmJvc2VcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCAo0LfQsNGP0LLQutCwL9GE0LDQutGCKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X3Njb3JlX3Nob3J0XCI6IFwi0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0L/RgNC40L3QuNC80LDQuyDRg9GH0LDRgdGC0LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5fc3AgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBg0KTQvtGA0LzQtdC50YjQvSDihJYke259YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOiAke25hbWV9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG5fc3AgPT09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYNCf0LDRgNCwIOKEliR7bn1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYNCj0YfQsNGB0YLQvdC40Log4oSWJHtufWBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IGDQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWJHtufWAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJhc2VfbmFtZVwiOiBcItCg0L7RgdCk0JDQoNCgXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnZV9yb2xlc1wiOiB7XHJcbiAgICAgICAgICAgIFwiXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCLQodGD0LTRjNGPINGC0LDQvdGG0LBcIixcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcclxuICAgIGxldCBwaHJhc2VfcHRyID0gUEhSQVNFUztcclxuICAgIGZvciAoY29uc3QgY2h1bmsgb2YgcGF0aCkge1xyXG4gICAgICAgIHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXTtcclxuICAgICAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yICR7c3JjfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbnRyYW5zbGF0ZS50b3VyX25hbWVfc3VnZ2VzdGlvbnMgPSBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImNvbnN0IG1ldGEgPSB7XG4gICAgXCJqdWRnZV9yb2xlc1wiOiBbXG4gICAgICAgIFwiZGFuY2VfanVkZ2VcIixcbiAgICAgICAgXCJhY3JvX2p1ZGdlXCIsXG4gICAgICAgIFwiaGVhZF9qdWRnZVwiLFxuICAgICAgICBcInRlY2hfanVkZ2VcIixcbiAgICBdLFxuICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IFtcbiAgICAgICAgXCJyb3NmYXJyLm5vX2Fjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLmFjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLmZvcm1hdGlvblwiLFxuICAgICAgICBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIixcbiAgICAgICAgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIixcbiAgICAgICAgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCIsXG4gICAgICAgIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIsXG4gICAgXSxcbiAgICBcInN1Z2dlc3RlZF9wcm9ncmFtc1wiOiBbXG4gICAgICAgIFwiZGVmYXVsdFwiLFxuICAgICAgICBcInF1YWxpZmljYXRpb25cIixcbiAgICAgICAgXCJxdWFydGVyZmluYWxcIixcbiAgICAgICAgXCJmaW5hbFwiLFxuICAgIF0sXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWV0YTtcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUxIGZyb20gXCJSZXN1bHRzVGFibGUxXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUyIGZyb20gXCJSZXN1bHRzVGFibGUyXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUzIGZyb20gXCJSZXN1bHRzVGFibGUzXCI7XHJcbmltcG9ydCBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlIGZyb20gXCJEaXNjaXBsaW5lUmVzdWx0c1RhYmxlXCI7XHJcbmltcG9ydCBKdWRnZVRhYmxldCBmcm9tIFwiSnVkZ2VUYWJsZXRcIjtcclxuaW1wb3J0IEFkbWluU2NvcmVJbnB1dCBmcm9tIFwiQWRtaW5TY29yZUlucHV0XCI7XHJcbmltcG9ydCBnZXRKdWRnZVRhYmxlTWFyayBmcm9tIFwiZ2V0SnVkZ2VUYWJsZU1hcmtcIjtcclxuaW1wb3J0IG1ldGEgZnJvbSBcIm1ldGFcIjtcclxuXHJcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIkhvc3RNb2R1bGVzXCI7XHJcblxyXG5jb25zdCByZXNwb25zZSA9IHdpbmRvdy5yZWdpc3RlclJ1bGVzU2V0KFwiUm9zRkFSUlwiLCB7XHJcbiAgICBtZXRhOiBtZXRhLFxyXG4gICAgdHJhbnNsYXRlOiBfLFxyXG4gICAgdG91cl9yZXN1bHRzX3RhYmxlXzE6IFJlc3VsdHNUYWJsZTEsXHJcbiAgICB0b3VyX3Jlc3VsdHNfdGFibGVfMjogUmVzdWx0c1RhYmxlMixcclxuICAgIHRvdXJfcmVzdWx0c190YWJsZV8zOiBSZXN1bHRzVGFibGUzLFxyXG4gICAgZGlzY2lwbGluZV9yZXN1bHRzX3RhYmxlOiBEaXNjaXBsaW5lUmVzdWx0c1RhYmxlLFxyXG4gICAganVkZ2VfdGFibGV0OiBKdWRnZVRhYmxldCxcclxuICAgIGFkbWluX3Njb3JlX2lucHV0OiBBZG1pblNjb3JlSW5wdXQsXHJcbiAgICBnZXRfanVkZ2VfdGFibGVfbWFyazogZ2V0SnVkZ2VUYWJsZU1hcmssXHJcbn0pO1xyXG5cclxuc2V0dXAocmVzcG9uc2UpO1xyXG4iXX0=
