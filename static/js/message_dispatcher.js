"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
                    this.onMessage({
                        data: JSON.stringify({
                            messages: [["reload_data", null]],
                            model_updates: []
                        })
                    });
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
            data.messages.forEach((function (data) {
                var msg_type = data[0];
                var msg_data = data[1];
                if (msg_type == "force_refresh") {
                    window.location.reload(true);
                }
                (this.listeners[msg_type] || []).forEach(function (listener) {
                    listener(msg_data);
                });
            }).bind(this));
            var data_changed = false;
            data.model_updates.forEach(function (data) {
                var model = storage.get(data.model).by_id(data.id);
                if (model) {
                    model.update(data.data);
                }
                data_changed = true;
            });
            if (data_changed) {
                (this.listeners["db_update"] || []).forEach(function (listener) {
                    listener();
                });
            }
        }
    }, {
        key: "addListener",
        value: function addListener(msg_types, callback) {
            msg_types.split(" ").forEach((function (msg_type) {
                if (!this.listeners[msg_type]) {
                    this.listeners[msg_type] = [];
                }
                this.listeners[msg_type].push(callback);
            }).bind(this));
        }
    }]);

    return MessageDispatcher;
})();

var message_dispatcher = new MessageDispatcher();
//# sourceMappingURL=message_dispatcher.js.map