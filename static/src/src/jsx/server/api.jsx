import { _ } from "l10n/loader";
import { storage } from "server/storage";
import { showError } from "ui/dialogs";


class ApiImpl {
    constructor(method, data) {
        this.method = method;
        this.data = data;
        this.cb_success = () => {};
        this.cb_error = (msg, code, args) => showError(code ? _(code, ...args) : msg);
        this.cb_fail = (...data) => console.error("API fail", ...data);
        this.cb_done = () => {};
        this.update_db = () => {};
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
    addToDB(model_type, model_id, st=storage) {
        this.update_db = function(response) {
            st.get(model_type).add(model_id, response);
        }
        return this;
    }
    send() {
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
        if (window.client_id) {
            data.append("client_id", window.client_id);
        }
        data.append("data", JSON.stringify(this.data));
        data.append("method", this.method);
        xhr.send(data);
    }
}

export var Api = (...args) => new ApiImpl(...args);
export default Api;
