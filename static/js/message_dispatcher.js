"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = (function () {
    function Listener() {
        _classCallCheck(this, Listener);

        this.filter = function (message) {
            return true;
        };
        this.postprocess = function (data, callback) {
            callback(data);
        };
        this.callback = function () {};
    }

    _createClass(Listener, [{
        key: "setFilter",
        value: function setFilter(func) {
            this.filter = func;
            return this;
        }
    }, {
        key: "fetchObject",
        value: function fetchObject(api_method, recursive) {
            this.postprocess = function (data, callback) {
                var request = $.extend({}, data);
                request.recursive = recursive;
                new Api(api_method, request).onSuccess(callback).send();
            };
            return this;
        }
    }, {
        key: "setCallback",
        value: function setCallback(func) {
            this.callback = func;
            return this;
        }
    }]);

    return Listener;
})();

var MessageDispatcher = (function () {
    function MessageDispatcher() {
        _classCallCheck(this, MessageDispatcher);

        this.closed = false;
        this.listeners = {};
        this.connect();
    }

    _createClass(MessageDispatcher, [{
        key: "connect",
        value: function connect() {
            console.log("Connecting to websocket...");
            this.ws = new SockJS("http://" + window.location.host + "/ws");
            this.ws.onopen = (function () {
                console.log("Connected.");
                if (this.closed) {
                    window.location.reload(true);
                }
            }).bind(this);
            this.ws.onclose = (function () {
                console.log("Connection closed.");
                $("#connection-problem").show();
                this.closed = true;
                setTimeout(this.connect.bind(this), 500);
            }).bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
        }
    }, {
        key: "onMessage",
        value: function onMessage(message) {
            var data = JSON.parse(message.data);
            var msg_type = data.type;
            var msg_data = data.data;
            console.log("Incoming message", msg_type, msg_data);
            var listeners = (this.listeners[msg_type] || []).filter(function (listener) {
                return listener.filter(msg_data);
            }).forEach(function (listener) {
                listener.postprocess(msg_data, listener.callback);
            });
        }
    }, {
        key: "addListener",
        value: function addListener(msg_types) {
            var listener = new Listener();
            msg_types.split(" ").forEach((function (msg_type) {
                if (!this.listeners[msg_type]) {
                    this.listeners[msg_type] = [];
                }
                this.listeners[msg_type].push(listener);
            }).bind(this));
            return listener;
        }
    }]);

    return MessageDispatcher;
})();

var message_dispatcher = new MessageDispatcher();