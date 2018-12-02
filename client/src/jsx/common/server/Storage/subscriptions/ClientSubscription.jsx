import BaseSubscription from "./BaseSubscription";
import Api from "common/server/Api";

export default class ClientSubscription extends BaseSubscription {
    static MODELS = new Map([
        ["Client", 10],
        ["ClientAuth", 10],
    ]);
    constructor(client_id) {
        super();
        this.client_id = client_id;
    }
    checkMutation(mutation) {
        if (this.client_id !== mutation.client_id) {
            return false;
        }
        return this.constructor.MODELS.has(mutation.model_name);
    }
    subscribe() {
        return new Promise(this._subscribe)
    }
    _subscribe = (resolve, reject) => {
        Api("model/subscribe", {
            model_name: "Client",
            model_id: this.client_id,
            subscription_id: this.subscription_id,
        })
            .onSuccess(resolve)
            .onError(reject)
            .send();
    }
}
