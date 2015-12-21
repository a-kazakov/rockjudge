class MessageDispatcher {
    constructor() {
        this.closed = false;
        this.listeners = {};
        this.listeners_cnt = 0;
        this.connect();
    }
    connect() {
        console.log("Connecting to websocket...");
        this.ws = new SockJS("http://" + window.location.host + "/ws");
        this.ws.onopen = function() {
            console.log("Connected.");
            if (this.closed) {
                this.onMessage({
                    data: JSON.stringify({
                        messages: [["reload_data", null]],
                        model_updates: [],
                    })
                })
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
        if (data["client_id"]) {
            window.client_id = data["client_id"];
            return;
        }
        data.messages.forEach(function(data) {
            let msg_type = data[0];
            let msg_data = data[1];
            let listeners = this.listeners[msg_type] || {};
            if (msg_type == "force_refresh") {
                window.location.reload(true);
            }
            Object.keys(this.listeners[msg_type] || {}).forEach((key) => listeners[key](msg_data));
        }.bind(this));
        let data_changed = false;
        data.model_updates.forEach((model_info) => {
            data_changed = storage.updateModel(model_info.model, model_info.id, model_info.data) || data_changed;
        });
        if (data_changed) {
            let listeners = this.listeners["db_update"] || {};
            Object.keys(listeners).forEach((key) => {
                if (listeners[key]) {
                    listeners[key]();
                }
            });
        }
    }
    getListenerId() {
        return this.listeners_cnt++;
    }
    addListener(msg_types, callback) {
        let id = this.getListenerId();
        msg_types.split(" ").forEach(function(msg_type) {
            if (!this.listeners[msg_type]) {
                this.listeners[msg_type] = {};
            }
            this.listeners[msg_type][id] = callback;
        }.bind(this));
        return id;
    }
    removeListener(listener_id) {
        Object.keys(this.listeners).forEach(function(key) {
            delete this.listeners[key][listener_id];
        }.bind(this));
    }
}

var message_dispatcher = new MessageDispatcher();
