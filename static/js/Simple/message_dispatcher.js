var MessageDispatcher = (function () {
    function MessageDispatcher() {
        this.subscribers = {};
        this.ws = new WebSocket("ws://" + location.host + "/ws");
        this.ws.onmessage = this.onMessage.bind(this);
    }
    MessageDispatcher.prototype.onMessage = function (message) {
        console.log(message);
        var data = JSON.parse(message.data);
        (this.subscribers[data["type"]] || []).forEach(function (cb) {
            cb(data["data"]);
        });
    };
    MessageDispatcher.prototype.subscribe = function (msg_type, callback) {
        if (!this.subscribers[msg_type]) {
            this.subscribers[msg_type] = [];
        }
        this.subscribers[msg_type].push(callback);
    };
    return MessageDispatcher;
})();

var message_dispatcher = new MessageDispatcher();
