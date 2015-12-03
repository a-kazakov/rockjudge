"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function onTouchEndOrClick(handler) {
    var _handler = function _handler() {};
    var distance = 0;
    var latest_pos = [0, 0];
    var fire = function fire(event) {
        event.preventDefault();
        return _handler();
    };
    var discard = function discard() {
        _handler = function () {};
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

var Slider = (function (_React$Component) {
    _inherits(Slider, _React$Component);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

        _this.state = {
            position: 0,
            touch: false,
            finished: false
        };
        _this.pin = null;
        return _this;
    }

    _createClass(Slider, [{
        key: "isFree",
        value: function isFree() {
            return !this.state.touch && !this.props.done && !this.state.finished;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (!prevProps.done && this.props.done) {
                this.setState({
                    finished: false
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "slider noselect" },
                React.createElement(
                    "div",
                    { className: "inner" + (this.isFree() ? " free" : ""),
                        style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                        onTouchStart: this.onTouchStart.bind(this),
                        onTouchMove: this.onTouchMove.bind(this),
                        onTouchEnd: this.onTouchEnd.bind(this),
                        onClick: this.onClick.bind(this) },
                    "→"
                ),
                this.props.done ? React.createElement(
                    "span",
                    {
                        style: { color: "rgb(100,100,100)" },
                        className: "done-text" },
                    this.props.doneText
                ) : React.createElement(
                    "span",
                    {
                        style: { color: "rgba(100,100,100," + this.getOuterTextOpacity() + ")" },
                        className: "slide-text" + (this.isFree() ? " free" : "") },
                    this.props.slideText
                )
            );
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
        key: "onClick",
        value: function onClick(event) {
            if (this.state.finished || this.props.done) {
                return;
            }
            this.setState({
                posision: 200,
                touch: false,
                finished: true
            });
            this.props.onActivate();
        }
    }, {
        key: "onTouchStart",
        value: function onTouchStart(event) {
            event.preventDefault();
            if (this.state.finished || this.props.done) {
                return;
            }
            this.pin = this.getRelativeTouch(event);
            this.setState({
                position: this.getSliderPos(event),
                touch: true
            });
        }
    }, {
        key: "onTouchMove",
        value: function onTouchMove(event) {
            event.preventDefault();
            if (this.state.finished || this.props.done) {
                return;
            }
            this.setState({
                position: this.getSliderPos(event)
            });
        }
    }, {
        key: "onTouchEnd",
        value: function onTouchEnd(event) {
            event.preventDefault();
            if (this.state.finished || this.props.done) {
                return;
            }
            if (this.state.position == 200) {
                this.setState({
                    position: 0,
                    finished: true,
                    touch: false
                });
                this.props.onActivate();
            } else {
                this.setState({
                    position: 0,
                    touch: false
                });
            }
        }
    }]);

    return Slider;
})(React.Component);

var TabletSelectorInput = (function (_React$Component2) {
    _inherits(TabletSelectorInput, _React$Component2);

    function TabletSelectorInput() {
        _classCallCheck(this, TabletSelectorInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletSelectorInput).apply(this, arguments));
    }

    _createClass(TabletSelectorInput, [{
        key: "getButtonsCount",
        value: function getButtonsCount() {
            if (this.props.style === "grid") {
                return this.props.row_size;
            }
            return this.props.choices.length;
        }
    }, {
        key: "renderLine",
        value: function renderLine() {
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var result = [];
            this.props.choices.forEach(function (el, idx) {
                var key = el[0];
                var text = el[1];
                var active_class_name = _this3.props.active === key ? " active" : "";
                result.push(React.createElement(
                    "button",
                    _extends({
                        key: key
                    }, onTouchOrClick(_this3.onClick.bind(_this3, key)), {
                        className: "tbtn score-btn" + active_class_name
                    }),
                    text
                ));
                if (_this3.props.style === "grid" && (idx + 1) % _this3.props.row_size === 0) {
                    result.push(React.createElement("br", { key: "br" + idx }));
                }
            });
            var layout_class = this.props.style !== "two-lines" ? "selector-layout" : "selector-layout-2rows";
            var selected_class = this.props.active === null ? "" : " selected";
            return React.createElement(
                "div",
                { className: "scoring-layout " + layout_class + selected_class + " n-" + this.getButtonsCount().toString() },
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

var TabletIntegerSelectInput = (function (_React$Component3) {
    _inherits(TabletIntegerSelectInput, _React$Component3);

    function TabletIntegerSelectInput() {
        _classCallCheck(this, TabletIntegerSelectInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletIntegerSelectInput).apply(this, arguments));
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
            return React.createElement(TabletSelectorInput, _extends({}, this.props, { choices: this.createArray(this.props.min, this.props.max) }));
        }
    }]);

    return TabletIntegerSelectInput;
})(React.Component);

var TabletPointFiveSelectInput = (function (_React$Component4) {
    _inherits(TabletPointFiveSelectInput, _React$Component4);

    function TabletPointFiveSelectInput() {
        _classCallCheck(this, TabletPointFiveSelectInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletPointFiveSelectInput).apply(this, arguments));
    }

    _createClass(TabletPointFiveSelectInput, [{
        key: "createArray",
        value: function createArray(min, max) {
            var result = [];
            for (var idx = Math.round(2 * min); idx <= Math.round(2 * max); ++idx) {
                result.push([idx / 2, idx % 2 ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(TabletSelectorInput, _extends({}, this.props, { choices: this.createArray(this.props.min, this.props.max) }));
        }
    }]);

    return TabletPointFiveSelectInput;
})(React.Component);

var TabletIntegerInput = (function (_React$Component5) {
    _inherits(TabletIntegerInput, _React$Component5);

    function TabletIntegerInput() {
        _classCallCheck(this, TabletIntegerInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletIntegerInput).apply(this, arguments));
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
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": -1 });
            } else {
                this.props.onValueUpdate(this.props.value - 1);
            }
        }
    }, {
        key: "onPlus",
        value: function onPlus() {
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": 1 });
            } else {
                this.props.onValueUpdate(this.props.value + 1);
            }
        }
    }]);

    return TabletIntegerInput;
})(React.Component);

var TabletPoint5Input = (function (_React$Component6) {
    _inherits(TabletPoint5Input, _React$Component6);

    function TabletPoint5Input() {
        _classCallCheck(this, TabletPoint5Input);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletPoint5Input).apply(this, arguments));
    }

    _createClass(TabletPoint5Input, [{
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
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": -0.5 });
            } else {
                this.props.onValueUpdate(this.props.value - 0.5);
            }
        }
    }, {
        key: "onPlus",
        value: function onPlus() {
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": 0.5 });
            } else {
                this.props.onValueUpdate(this.props.value + 0.5);
            }
        }
    }]);

    return TabletPoint5Input;
})(React.Component);

var stopwatches = {};

var StopWatch = (function (_React$Component7) {
    _inherits(StopWatch, _React$Component7);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(StopWatch).call(this, props));

        _this8.state = stopwatches[props.score_id] || {
            active: false,
            value: 0,
            str_value: "0:00"
        };
        if (_this8.state.active) {
            _this8.state.interval = setInterval(_this8.tick.bind(_this8), 10);
        }
        return _this8;
    }

    _createClass(StopWatch, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.state.interval);
            stopwatches[this.props.score_id] = this.state;
        }
    }, {
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
                    _extends({ className: "tbtn btn-reset ignore-readonly" }, onTouchOrClick(this.reset.bind(this))),
                    _("tablet.buttons.reset_stopwatch")
                ),
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-toggle ignore-readonly" + (this.state.active ? " active" : "") }, onTouchOrClick(this.toggle.bind(this))),
                    this.state.active ? _("tablet.buttons.stop_stopwatch") : _("tablet.buttons.start_stopwatch")
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
//# sourceMappingURL=tablet_controls.js.map