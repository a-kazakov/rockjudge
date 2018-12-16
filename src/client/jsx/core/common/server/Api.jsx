import md5 from "js-md5";

import _ from "l10n";
import keys_storage from "common/keys_storage";
import websocket from "common/server/websocket";
import makeRandomString from "common/tools/makeRandomString";
import showError from "common/dialogs/showError";
import waiting_api_requests from "common/server/waiting_api_requests";
import Enum from "common/Enum";

class ApiQueue {
    static State = new Enum({
        EMPTY: [],
        SUBMITTING: ["api_obj"],
        WAIT_RETRY: ["api_obj", "timer_id"],
        INTERMEDIATE: [],
    });

    static _instance = null;
    static instance() {
        return ApiQueue._instance ?? (ApiQueue._instance = new ApiQueue());
    }

    queue = [];
    current_state = ApiQueue.State.EMPTY();

    submit(api_object) {
        this.queue.push(api_object);
        this._sendNextRequest();
    }

    _popQueue() {
        let [result, ...next_queue] = this.queue;
        this.queue = next_queue;
        return result;
    }
    _sendNextRequest = () => {
        let next_api_obj = this.current_state.match({
            EMPTY: () => this._popQueue(),
            SUBMITTING: null,
            WAIT_RETRY: ({ api_obj, timer_id }) => {
                clearTimeout(timer_id);
                return api_obj;
            },
            INTERMEDIATE: () => {
                if (this.queue.length === 0) {
                    this.current_state = this.constructor.State.EMPTY();
                    return null;
                }
                return this._popQueue();
            },
        });
        if (next_api_obj == null) {
            return;
        }
        this.current_state = this.constructor.State.SUBMITTING({
            api_obj: next_api_obj,
        });
        next_api_obj
            ._sendImpl()
            .then(this._handleRequestSuccess)
            .catch(this._handleRequestFailure);
    };
    _handleRequestSuccess = () => {
        if (!this.current_state.check("SUBMITTING")) {
            console.error("Invalid ApiQueue state", this.current_state);
        }
        this.current_state = this.constructor.State.INTERMEDIATE();
        this._sendNextRequest();
    };
    _handleRequestFailure = () => {
        const enum_data = this.current_state.unpack("SUBMITTING");
        if (enum_data == null) {
            console.error("Invalid ApiQueue state", this.current_state);
            return;
        }
        let { api_obj } = enum_data;
        this.current_state = this.constructor.State.WAIT_RETRY({
            api_obj,
            timer_id: setTimeout(this._sendNextRequest, 1000),
        });
    };
}

class ApiObject {
    static defaultErrorAction = (msg, code, args) =>
        showError(code ? _(code, ...(args || [])) : msg);

    cb_success = () => {};
    cb_error = ApiObject.defaultErrorAction;
    cb_done = () => {};
    update_db = () => {};
    _response_key = makeRandomString();
    _signature_required = true;
    _pending_mutations = [];

    constructor(method, data) {
        this.method = method;
        this.data = data;
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
        this._signature_required = false;
        return this;
    }
    setPendingMutation(storage, model_name, model_id, data) {
        this._pending_mutations.push([storage, model_name, model_id, data]);
        return this;
    }
    send(skip_queue = false) {
        for (const [storage, model_name, model_id, data] of this._pending_mutations) {
            storage.addOverride(this._response_key, model_name, model_id, data);
        }
        if (skip_queue) {
            this._sendImpl(true);
            return;
        }
        ApiQueue.instance().submit(this);
    }
    _sendImpl = (out_of_queue = false) => {
        if (this._signature_required && !keys_storage.has_keys) {
            return new Promise((resolve, reject) => {
                keys_storage
                    .obtainKeys()
                    .then(this._sendImpl)
                    .then(resolve)
                    .catch(reject);
            });
        }
        const rand_str = makeRandomString();
        if (window.location.hash === "#debug") {
            console.log("-> Api call", this.method, this.data);
        }
        const str_data = JSON.stringify({
            method: this.method,
            params: this.data,
            client_id: keys_storage.client_id,
            random: rand_str,
            response_key: this._response_key,
        });
        const signature = this._signature_required
            ? md5(
                  `${keys_storage.client_id}|${this.method}|${str_data}|${rand_str}|${
                      keys_storage.secret
                  }`,
              )
            : "";
        return new Promise((resolve, reject) => {
            if (websocket.closed && !out_of_queue) {
                return reject("Websocket is closed");
            }
            websocket.send(`${signature}|${str_data}`);
            waiting_api_requests.add(this._response_key, this, resolve, reject);
        });
    };
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
                keys_storage.resetKeys();
                window.location.reload();
                return;
            }
            this.cb_error(response.message, response.error_code, response.error_args);
        }
        for (const [storage, model_name, model_id, _data] of this._pending_mutations) {
            storage.removeOverride(this._response_key, model_name, model_id);
        }
    }
}

const Api = (...args) => new ApiObject(...args);
Api.defaultErrorAction = ApiObject.defaultErrorAction;
export default Api;
