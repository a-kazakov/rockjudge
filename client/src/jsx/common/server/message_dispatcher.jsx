import lz4 from "lz4-asm";
import { TextDecoder } from "text-encoding";

import connection_status from "common/connection_status";

import storage from "common/server/storage";

class MessageDispatcher {
    constructor() {
        this.closed = false;
        this.listeners = {};
        this.listeners_cnt = 0;
        this.connect();
    }
    connect = () => {
        console.log("Connecting to websocket...");
        this.ws = new SockJS(`http://${window.location.host}/ws`);
        this.ws.onopen = () => {
            connection_status.setOk();
            console.log("Connected to websocket.");
            if (this.closed) {
                this.handleMessage({
                    raw_data: {
                        messages: [["reload_data", null]],
                        model_updates: [],
                    },
                })
            }
        };
        this.ws.onclose = () => {
            connection_status.setFail();
            console.log("Connection to websocket closed.");
            this.closed = true;
            setTimeout(this.connect, 500);
        };
        this.ws.onmessage = this.handleMessage;
    }
    handleMessage = (message) => {
        let data = message.raw_data;
        if (!data) {
            const lz4_blob = Uint8Array.from(atob(message.data), c => c.charCodeAt(0));
            const json_blob = lz4.decompress(lz4_blob);
            const json_str = (new TextDecoder("utf-8")).decode(json_blob);
            data = JSON.parse(json_str);
        }
        if (data["ws_client_id"]) {
            window.ws_client_id = data["ws_client_id"];
            return;
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
        let data_changed = false;
        for (const model_info of data.model_updates) {
            data_changed = storage.updateModel(model_info.model, model_info.id, model_info.data) || data_changed;
        }
        if (data_changed) {
            const listeners = this.listeners["db_update"] || {};
            for (const key of Object.keys(listeners)) {
                if (listeners[key]) {
                    listeners[key]();
                }
            }
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


const message_dispatcher = new MessageDispatcher();
export default message_dispatcher;
