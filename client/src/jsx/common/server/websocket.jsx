import waiting_api_requests from "common/server/waiting_api_requests";

import connection_status from "common/connection_status";

class WebSocketHandler {
    constructor() {
        this.closed = false;
        this.opened = false;
        this.send_queue = [];
        this.storage = null;
        this.connect();
    }
    connect = () => {
        console.log("Connecting to websocket...");
        this.ws = new WebSocket(`ws://${window.location.host}/ws`);
        this.ws.onopen = () => {
            this.opened = true;
            if (this.closed) {
                // eslint-disable-next-line no-unused-expressions
                this.storage?.resubscribeAll();
                this.closed = false;
            }
            connection_status.setOk();
            console.log("Connected to websocket.");
            for (const message of this.send_queue) {
                this.ws.send(message);
            }
            this.send_queue = [];
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
        const {message_type, body, ...extra} = data;
        switch (message_type) {
            case "api_response": {
                const {response_key} = extra;
                waiting_api_requests.push_response(response_key, body);
                break;
            }
            case "mutations_push": {
                const {is_initial, subscription_id} = extra;
                // eslint-disable-next-line no-unused-expressions
                this.storage?.handleMutations(
                    body,
                    is_initial,
                    subscription_id,
                );
                break;
            }
            case "broadcast": {
                switch (body) {
                    case "refresh": {
                       window.location.reload(true);
                       break;
                    }
                }
            }
        }
    };
    setStorage(storage) {
        this.storage = storage;
    }
}


const websocket = new WebSocketHandler();
export default websocket;
