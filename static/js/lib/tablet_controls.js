"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

React.initializeTouchEvents(true);

function onTouchOrClick(handler) {
    var f = function f(event) {
        event.preventDefault();
        return handler();
    };
    return {
        onTouchStart: f,
        onClick: f
    };
}

var TabletSelectorInput = (function (_React$Component) {
    _inherits(TabletSelectorInput, _React$Component);

    function TabletSelectorInput() {
        _classCallCheck(this, TabletSelectorInput);

        _get(Object.getPrototypeOf(TabletSelectorInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TabletSelectorInput, [{
        key: "getButtonsCount",
        value: function getButtonsCount() {
            return this.props.choices.length;
        }
    }, {
        key: "render",
        value: function render() {
            var result = [];
            this.props.choices.forEach((function (el) {
                var key = el[0];
                var text = el[1];
                var active_class_name = this.props.active === key ? " active" : "";
                result.push(React.createElement(
                    "button",
                    _extends({
                        key: key
                    }, onTouchOrClick(this.onClick.bind(this, key)), {
                        className: "tbtn score-btn" + active_class_name
                    }),
                    text
                ));
            }).bind(this));
            var layout_class = this.getButtonsCount() <= 10 ? "selector-layout" : "selector-layout-2rows";
            return React.createElement(
                "div",
                { className: "scoring-layout " + layout_class + " n-" + this.getButtonsCount().toString() },
                result
            );
        }
    }, {
        key: "onClick",
        value: function onClick(n) {
            this.props.onValueUpdate(n);
        }
    }]);

    return TabletSelectorInput;
})(React.Component);

var TabletIntegerSelectInput = (function (_React$Component2) {
    _inherits(TabletIntegerSelectInput, _React$Component2);

    function TabletIntegerSelectInput() {
        _classCallCheck(this, TabletIntegerSelectInput);

        _get(Object.getPrototypeOf(TabletIntegerSelectInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TabletIntegerSelectInput, [{
        key: "createArray",
        value: function createArray(min, max) {
            var result = [];
            for (var idx = min; idx <= max; ++idx) {
                result.push([idx, idx.toString()]);
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props;
            var min = _props.min;
            var max = _props.max;

            var other = _objectWithoutProperties(_props, ["min", "max"]);

            return React.createElement(TabletSelectorInput, _extends({}, other, { choices: this.createArray(min, max) }));
        }
    }, {
        key: "onClick",
        value: function onClick(n) {
            this.props.onValueUpdate(n);
        }
    }]);

    return TabletIntegerSelectInput;
})(React.Component);

var TabletIntegerInput = (function (_React$Component3) {
    _inherits(TabletIntegerInput, _React$Component3);

    function TabletIntegerInput() {
        _classCallCheck(this, TabletIntegerInput);

        _get(Object.getPrototypeOf(TabletIntegerInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TabletIntegerInput, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "tablet-integer-input" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-minus" }, onTouchOrClick(this.onMinus.bind(this))),
                    "−"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    this.props.value
                ),
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-plus" }, onTouchOrClick(this.onPlus.bind(this))),
                    "+"
                )
            );
        }
    }, {
        key: "onMinus",
        value: function onMinus() {
            if (this.props.value > 0) {
                this.props.onValueUpdate(this.props.value - 1);
            }
        }
    }, {
        key: "onPlus",
        value: function onPlus() {
            this.props.onValueUpdate(this.props.value + 1);
        }
    }]);

    return TabletIntegerInput;
})(React.Component);

var StopWatch = (function (_React$Component4) {
    _inherits(StopWatch, _React$Component4);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        _get(Object.getPrototypeOf(StopWatch.prototype), "constructor", this).call(this, props);
        this.state = {
            active: false,
            value: 0,
            str_value: "0:00"
        };
    }

    _createClass(StopWatch, [{
        key: "now",
        value: function now() {
            return new Date().getTime();
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.state.active ? this.stop() : this.start();
        }
    }, {
        key: "start",
        value: function start() {
            this.setState({
                active: true,
                start_at: this.now() - this.state.value,
                interval: setInterval(this.tick.bind(this), 10)
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
        key: "reset",
        value: function reset() {
            if (this.state.active) {
                this.setState({
                    start_at: this.now()
                });
            } else {
                this.setState({
                    value: 0
                });
            }
        }
    }, {
        key: "value",
        value: function value() {
            return this.state.active ? this.now() - this.state.start_at : this.state.value;
        }
    }, {
        key: "tick",
        value: function tick() {
            var new_value = this.value();
            if (new_value != this.state.value) {
                this.setState({
                    value: this.value()
                });
            }
        }
    }, {
        key: "pad",
        value: function pad(num, size) {
            var s = "0000" + num.toString();
            return s.substr(s.length - size);
        }
    }, {
        key: "getStrValue",
        value: function getStrValue() {
            var val = this.value();
            var m = 0,
                s = 0;
            var result = '';
            m = Math.floor(val / (60 * 1000));
            val %= 60 * 1000;
            s = Math.floor(val / 1000);
            return m.toString() + ':' + this.pad(s, 2);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "stopwatch" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-toggle" }, onTouchOrClick(this.toggle.bind(this))),
                    this.state.active ? "Stop" : "Start"
                ),
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-reset" }, onTouchOrClick(this.reset.bind(this))),
                    "Reset"
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
})(React.Component);