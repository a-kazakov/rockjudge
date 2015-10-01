class Listener {
    constructor() {
        this.filter = function(message) { return true; };
        this.postprocess = function(data, callback) { callback(data) };
        this.callback = function() {};
    }
    setFilter(func) {
        this.filter = func;
        return this;
    }
    fetchObject(api_method, recursive) {
        this.postprocess = function(data, callback) {
            var request = $.extend({}, data);
            request.recursive = recursive;
            (new Api(api_method, request)).onSuccess(callback).send();
        }
        return this;
    }
    setCallback(func) {
        this.callback = func;
        return this;
    }
}

class MessageDispatcher {
    constructor() {
        this.closed = false;
        this.listeners = {};
        this.connect();
    }
    connect() {
        console.log("Connecting to websocket...");
        this.ws = new SockJS("http://" + window.location.host + "/ws");
        this.ws.onopen = function() {
            console.log("Connected.");
            if (this.closed) {
                window.location.reload(true);
            }
        }.bind(this);
        this.ws.onclose = function() {
            console.log("Connection closed.");
            $("#connection-problem").show();
            this.closed = true;
            setTimeout(this.connect.bind(this), 500);
        }.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
    }
    onMessage(message) {
        var data = JSON.parse(message.data);
        var msg_type = data.type;
        var msg_data = data.data;
        console.log("Incoming message", msg_type, msg_data);
        var listeners = (this.listeners[msg_type] || []).filter(function(listener) {
            return listener.filter(msg_data);
        }).forEach(function(listener) {
            listener.postprocess(msg_data, listener.callback);
        });
    }
    addListener(msg_types) {
        var listener = new Listener();
        msg_types.split(" ").forEach(function(msg_type) {
            if (!this.listeners[msg_type]) {
                this.listeners[msg_type] = [];
            }
            this.listeners[msg_type].push(listener);
        }.bind(this));
        return listener;
    }
}

var message_dispatcher = new MessageDispatcher();
