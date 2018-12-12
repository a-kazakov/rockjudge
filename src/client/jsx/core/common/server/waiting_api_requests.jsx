class WaitingApiRequests {
    constructor() {
        this._apis = new Map();
    }
    add(key, api_obj, resolve, reject) {
        this._apis.set(key, [api_obj, resolve, reject]);
    }
    pushResponse(key, response) {
        const request = this._apis.get(key);
        if (request == null) {
            return;
        }
        const [api_obj, resolve, _reject] = request;
        api_obj.processResponse(response);
        resolve();
    }
    rejectAll() {
        this._apis.forEach(([_api_obj, _reslove, reject]) => reject());
        this._apis.clear();
    }
}

const waiting_api_request = new WaitingApiRequests();
export default waiting_api_request;
