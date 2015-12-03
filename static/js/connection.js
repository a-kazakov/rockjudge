"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConnectionTester = (function (_React$Component) {
    _inherits(ConnectionTester, _React$Component);

    function ConnectionTester(props) {
        _classCallCheck(this, ConnectionTester);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectionTester).call(this, props));

        _this.state = {
            payload_size: 1000,
            ping_interval: 1000,
            active_pings: {},
            finished_pings: [],
            lastest_latency: 0
        };
        message_dispatcher.addListener("ping_reply", _this.onPingReply.bind(_this));
        _this.resetJob();
        return _this;
    }

    _createClass(ConnectionTester, [{
        key: "resetJob",
        value: function resetJob(interval) {
            if (this.job) {
                clearInterval(this.job);
            }
            this.job = setInterval(this.ping.bind(this), interval || this.state.ping_interval);
        }
    }, {
        key: "ping",
        value: function ping() {
            var ping_id = Math.random().toString();
            var new_state = $.extend({}, this.state.active_pings);
            new_state[ping_id] = new Date().getTime();
            this.setState({
                active_pings: new_state,
                latest_sent: new Date().getTime()
            });
            Api("service.ping", { ping_id: ping_id, payload_size: this.state.payload_size }).send();
        }
    }, {
        key: "onPingReply",
        value: function onPingReply(response) {
            var ping_id = response.ping_id;
            if (!this.state.active_pings[ping_id]) {
                return;
            }
            var time = new Date().getTime() - this.state.active_pings[ping_id];
            var active_pings = $.extend({}, this.state.active_pings);
            var finished_pings = $.extend([], this.state.finished_pings);
            finished_pings.push({
                received: new Date().getTime(),
                latency: time
            });
            if (finished_pings.length > 1100) {
                finished_pings = finished_pings.slice(-1000);
            }
            delete active_pings[ping_id];
            this.setState({
                active_pings: active_pings,
                finished_pings: finished_pings
            });
        }
    }, {
        key: "setPayloadSize",
        value: function setPayloadSize(new_size) {
            this.setState({
                payload_size: new_size
            });
        }
    }, {
        key: "setPingInterval",
        value: function setPingInterval(interval) {
            this.setState({
                ping_interval: interval
            });
            this.resetJob(interval);
        }
    }, {
        key: "calcStatistics",
        value: function calcStatistics(source) {
            var arr = source.map(function (p) {
                return parseInt(p.latency);
            });
            arr.sort(function (a, b) {
                return a - b;
            });
            return {
                min: (arr[0] / 1000).toFixed(2),
                max: (arr[arr.length - 1] / 1000).toFixed(2),
                p50: (arr[Math.round((arr.length - 1) * 0.50)] / 1000).toFixed(2),
                p80: (arr[Math.round((arr.length - 1) * 0.80)] / 1000).toFixed(2),
                p95: (arr[Math.round((arr.length - 1) * 0.95)] / 1000).toFixed(2),
                p99: (arr[Math.round((arr.length - 1) * 0.99)] / 1000).toFixed(2)
            };
        }
    }, {
        key: "renderStat",
        value: function renderStat(stat) {
            return React.createElement(
                "div",
                { className: "stat" },
                React.createElement(
                    "div",
                    { className: "title" },
                    "Min:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.min
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P50:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p50
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P80:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p80
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P95:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p95
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P99:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p99
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "Max:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.max
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var stat100 = this.calcStatistics(this.state.finished_pings.slice(-100));
            var stat1000 = this.calcStatistics(this.state.finished_pings.slice(-1000));
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "Connection tester"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "container-fluid" },
                    React.createElement(
                        "div",
                        { className: "row connection-tester" },
                        React.createElement(
                            "div",
                            { className: "col-md-6" },
                            React.createElement(
                                "h3",
                                null,
                                "Payload size"
                            ),
                            React.createElement(TabletSelectorInput, {
                                choices: [[100, "100 b"], [1000, "1 KB"], [10000, "10 KB"], [100000, "100 KB"], [1000000, "1 MB"]],
                                active: this.state.payload_size,
                                onValueUpdate: this.setPayloadSize.bind(this) }),
                            React.createElement(
                                "h3",
                                null,
                                "Ping interval"
                            ),
                            React.createElement(TabletSelectorInput, {
                                choices: [[100, "100ms"], [200, "200ms"], [500, "500ms"], [1000, "1s"], [2000, "2s"], [5000, "5s"], [10000, "10s"]],
                                active: this.state.ping_interval,
                                onValueUpdate: this.setPingInterval.bind(this) })
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-6" },
                            React.createElement(
                                "b",
                                null,
                                "Active pings:"
                            ),
                            " ",
                            Object.keys(this.state.active_pings).length,
                            React.createElement("br", null),
                            React.createElement(
                                "h3",
                                null,
                                "Lastest latencies"
                            ),
                            React.createElement(
                                "table",
                                { className: "latency-chart" },
                                React.createElement(
                                    "tbody",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        this.state.finished_pings.slice(-10).map(function (ping, idx) {
                                            return React.createElement(
                                                "td",
                                                { key: idx, className: "chart-cell" },
                                                React.createElement("div", { className: "bar" + (ping.latency > 2000 ? " red" : ""), style: { height: Math.min(Math.round(ping.latency / 10), 200) + "px" } }),
                                                Math.round(ping.latency / 10) / 100
                                            );
                                        }),
                                        React.createElement("td", null)
                                    )
                                )
                            ),
                            React.createElement(
                                "h3",
                                null,
                                "Statiscics out of 100:"
                            ),
                            this.renderStat(stat100),
                            React.createElement(
                                "h3",
                                null,
                                "Statiscics out of 1000:"
                            ),
                            this.renderStat(stat1000)
                        )
                    )
                )
            );
        }
    }]);

    return ConnectionTester;
})(React.Component);
//# sourceMappingURL=connection.js.map