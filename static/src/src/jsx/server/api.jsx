import md5 from "js-md5";

import { _ } from "l10n/loader";
import { storage } from "server/storage";
import { showError } from "ui/dialogs";

import keys_storage from "common/keys_storage";

let queue = [];
let obtaining_keys = false;

class ApiImpl {
    constructor(method, data) {
        this.method = method;
        this.data = data;
        this.cb_success = () => {};
        this.cb_error = (msg, code, args) => showError(code ? _(code, ...args) : msg);
        this.cb_fail = (...data) => console.error("API fail", ...data);
        this.cb_done = () => {};
        this.update_db = () => {};
        this.sign = true;
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
    onFail(callback) {
        this.cb_fail = callback;
        return this;
    }
    disableSignature() {
        this.sign = false;
        return this;
    }
    addToDB(model_type, model_id, st=storage) {
        this.update_db = function(response) {
            st.get(model_type).add(model_id, response);
        }
        return this;
    }
    makeRandomStr() {
        const date = new Date();
        const time = date.getTime() * 1000 + date.getUTCMilliseconds();
        const random = Math.floor(Math.random() * 10000000000000000);
        return `${time.toString(36)}_${random.toString(36)}`;
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
        })
    }
    checkKeys() {
        if (!keys_storage.has_keys) {
            queue.push(this);
            this.obtainKeys()
            return false;
        }
        return true;
    }
    send() {
        if (this.sign && !this.checkKeys()) {
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api", true);
        xhr.onload = () => {
            this.cb_done();
            if (xhr.status !== 200) {
                this.cb_fail();
                return;
            }
            let response = JSON.parse(xhr.responseText);
            if (response === null) {
                this.cb_fail();
            } else if (response.success) {
                this.update_db(response.response);
                this.cb_success(response.response);
            } else {
                this.cb_error(response.message, response.code, response.args);
            }
        };
        xhr.onerror = () => {
            this.cb_done();
            this.cb_fail();
        };
        let data = new FormData();
        const str_data = JSON.stringify(this.data);
        data.append("data", str_data);
        data.append("method", this.method);
        if (window.ws_client_id) {
            data.append("ws_client_id", window.ws_client_id);
        }
        if (this.sign) {
            const rand_str = this.makeRandomStr();
            data.append("client_id", keys_storage.client_id)
            data.append("random", rand_str)
            data.append("signature", md5(`${keys_storage.client_id}|${this.method}|${str_data}|${rand_str}|${keys_storage.secret}`));
        }
        xhr.send(data);
    }
}

export const Api = (...args) => new ApiImpl(...args);
export default Api;
