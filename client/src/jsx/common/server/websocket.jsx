import waiting_api_requests from "common/server/waiting_api_requests";

import connection_status from "common/connection_status";

import storage from "common/server/storage";

class WebSocketHandler {
    constructor() {
        this.closed = false;
        this.opened = false;
        this.listeners = {};
        this.listeners_cnt = 0;
        this.send_queue = [];
        this.connect();
    }
    connect = () => {
        console.log("Connecting to websocket...");
        this.ws = new WebSocket(`ws://${window.location.host}/ws`);
        this.ws.onopen = () => {
            this.opened = true;
            connection_status.setOk();
            console.log("Connected to websocket.");
            for (const message of this.send_queue) {
                this.ws.send(message);
            }
            this.send_queue = [];
            if (this.closed) {
                this.handleMessage({
                    raw_data: {
                        messages: [["reload_data", null]],
                        model_updates: [],
                        api_responses: {},
                    },
                })
            }
            this.closed = false;
        };
        this.ws.onclose = () => {
            connection_status.setFail();
            console.log("Connection to websocket closed.");
            this.closed = true;
            this.opened = false;
            setTimeout(this.connect, 500);
        };
        this.ws.onmessage = this.handleMessage;
    };
    send = (message) => {
        if (!this.opened) {
            this.send_queue.push(message);
            return;
        }
        this.ws.send(message);
    };
    handleMessage = (message) => {
        let data = message.raw_data;
        if (!data) {
            data = JSON.parse(message.data);
        }
        for (const data_message of data.messages) {
            const [msg_type, msg_data] = data_message;
            const listeners = this.listeners[msg_type] || {};
            if (msg_type === "force_refresh") {
                window.location.reload(true);
            }
            for (const key of Object.keys(this.listeners[msg_type] || {})) {
                listeners[key](msg_data);
            }
        }
        for (const model_info of data.model_updates) {
            storage.updateModel(model_info.model, model_info.id, model_info.data);
        }
        for (const api_response_key of Object.keys(data.api_responses)) {
            const api_response_body = data.api_responses[api_response_key];
            waiting_api_requests.push_response(api_response_key, api_response_body);
        }
    }
    getListenerId() {
        return this.listeners_cnt++;
    }
    addListener(msg_types, callback) {
        let id = this.getListenerId();
        for (const msg_type of msg_types.split(" ")) {
            if (!this.listeners[msg_type]) {
                this.listeners[msg_type] = {};
            }
            this.listeners[msg_type][id] = callback;
        }
        return id;
    }
    removeListener(listener_id) {
        for (const key of Object.keys(this.listeners)) {
            delete this.listeners[key][listener_id];
        }
    }
}


const websocket = new WebSocketHandler();
export default websocket;
