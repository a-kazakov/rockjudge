import md5 from "js-md5";

import _ from "l10n";
import keys_storage from "common/keys_storage";
import makeRandomString from "common/tools/makeRandomString";
import showError from "common/dialogs/showError";
import storage from "common/server/storage";

let queue = [];
let obtaining_keys = false;

class ApiImpl {
    constructor(method, data) {
        this.method = method;
        this.data = data;
        this.cb_success = () => {};
        this.cb_error = (msg, code, args) => showError(code ? _(code, ...args) : msg);
        this.cb_fail = (...fail_info) => console.error("API fail", ...fail_info);
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
        this.update_db = response => {
            st.addModel(model_type, model_id, response, this.data.children || {});
        }
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
        })
    }
    resetKeys() {
        keys_storage.resetKeys();
        window.location.reload();
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
                if (response.code === "errors.auth.invalid_signature") {
                    this.resetKeys();
                    return;
                }
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
            const rand_str = makeRandomString();
            data.append("client_id", keys_storage.client_id)
            data.append("random", rand_str)
            data.append("signature", md5(`${keys_storage.client_id}|${this.method}|${str_data}|${rand_str}|${keys_storage.secret}`));
        }
        xhr.send(data);
    }
}

const Api = (...args) => new ApiImpl(...args);
export default Api;
