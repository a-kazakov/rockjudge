import BaseSubscription from "./BaseSubscription";
import Api from "common/server/Api";

export default class ClientSubscription extends BaseSubscription {
    static MODELS = ["Client", "ClientAuth"];
    constructor(client_id) {
        super();
        this.client_id = client_id;
    }
    checkMutation(mutation) {
        if (this.client_id !== mutation.client_id) {
            return false;
        }
        return this.constructor.MODELS.includes(mutation.model_name);
    }
    subscribe() {
        return new Promise(this._subscribe);
    }
    _subscribe = (resolve, reject) => {
        Api("model/subscribe", {
            model_name: "Client",
            model_id: this.client_id,
            subscription_id: this.subscription_id,
        })
            .onSuccess(resolve)
            .onError(reject)
            .send(true /* skip_queue */);
    };
}
