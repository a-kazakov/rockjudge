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
        let data = JSON.parse(message.data);
        console.log("Incoming message", data);
        data.messages.forEach(function(data) {
            let msg_type = data[0];
            let msg_data = data[1];
            (this.listeners[msg_type] || []).forEach(function(listener) {
                listener(msg_data);
            });
        }.bind(this));
        let data_changed = false;
        data.model_updates.forEach(function(data) {
            let model = storage.get(data.model).by_id(data.id);
            if (model) {
                model.update(data.data);
            }
            data_changed = true;
        });
        if (data_changed) {
            (this.listeners["db_update"] || []).forEach(function(listener) {
                listener();
            });
        }
    }
    addListener(msg_types, callback) {
        msg_types.split(" ").forEach(function(msg_type) {
            if (!this.listeners[msg_type]) {
                this.listeners[msg_type] = [];
            }
            this.listeners[msg_type].push(callback);
        }.bind(this));
    }
}

var message_dispatcher = new MessageDispatcher();
