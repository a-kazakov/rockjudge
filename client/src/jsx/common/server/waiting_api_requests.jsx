class WaitingApiRequests {
    constructor() {
        this._apis = {};
    }
    add(key, api) {
        this._apis[key] = api;
    }
    push_response(key, response) {
        this._apis[key].processResponse(response);
        delete this._apis[key];
    }
}

const waiting_api_request = new WaitingApiRequests();
export default waiting_api_request;
