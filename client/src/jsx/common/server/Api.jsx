import md5 from "js-md5";

import _ from "l10n";
import keys_storage from "common/keys_storage";
import websocket from "common/server/websocket";
import makeRandomString from "common/tools/makeRandomString";
import showError from "common/dialogs/showError";
import waiting_api_requests from "common/server/waiting_api_requests";

let queue = [];
let obtaining_keys = false;

class ApiImpl {
    static defaultErrorAction = (msg, code, args) => showError(code ? _(code, ...(args || [])) : msg);

    constructor(method, data) {
        this.method = method;
        this.data = data;
        this.cb_success = () => {};
        this.cb_error = this.constructor.defaultErrorAction;
        this.cb_done = () => {};
        this.update_db = () => {};
        this.sign = true;
        this.response_key = makeRandomString()
    }
    onDone(callback) {
        this.cb_done = callback;
        return this;
    }
    onSuccess(callback) {
        this.cb_success = callback;
        return this;
    }
    onError(callback) {
        this.cb_error = callback;
        return this;
    }
    disableSignature() {
        this.sign = false;
        return this;
    }
    obtainKeys() {
        if (obtaining_keys) {
            return;
        }
        obtaining_keys = true;
        keys_storage.obtainKeys(() => {
            for (const request of queue) {
                request.send();
            }
            queue = [];
        });
    }
    resetKeys() {
        keys_storage.resetKeys();
        window.location.reload();
    }
    checkKeys() {
        if (!keys_storage.has_keys) {
            queue.push(this);
            this.obtainKeys();
            return false;
        }
        return true;
    }
    send() {
        if (this.sign && !this.checkKeys()) {
            return;
        }
        const rand_str = makeRandomString();
        if (window.location.hash === "#debug") {
            console.log("-> Api call", this.method, this.data);
        }
        const str_data = JSON.stringify({
            "method": this.method,
            "params": this.data,
            "client_id": keys_storage.client_id,
            "random": rand_str,
            "response_key": this.response_key,
        });
        const signature = this.sign
            ? md5(`${keys_storage.client_id}|${this.method}|${str_data}|${rand_str}|${keys_storage.secret}`)
            : "";
        websocket.send(`${signature}|${str_data}`);
        if (this.response_key != null) {
            waiting_api_requests.add(this.response_key, this);
        }
    }
    processResponse(response) {
        if (window.location.hash === "#debug") {
            console.log("<- Api response", this.method, response);
        }
        this.cb_done();
        if (response.success) {
            this.update_db(response.response);
            this.cb_success(response.response);
        } else {
            if (response.error_code === "errors.auth.invalid_signature") {
                this.resetKeys();
                return;
            }
            this.cb_error(response.message, response.error_code, response.error_args);
        }
    }
}

const Api = (...args) => new ApiImpl(...args);
Api.defaultErrorAction = ApiImpl.defaultErrorAction;
export default Api;
