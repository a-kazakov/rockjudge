import BaseSubscription from "./BaseSubscription";
import Api from "common/server/Api";

export default class AllCompetitionsSubscription extends BaseSubscription {
    static MODELS = new Map([
        ["Competition", 10],
    ]);
    checkMutation(mutation) {
        return mutation.model_name === "Competition";
    }
    subscribe() {
        return new Promise(this._subscribe)
    }
    _subscribe = (resolve, reject) => {
        Api("model/subscribe_all_competitions", {subscription_id: this.subscription_id})
            .onSuccess(resolve)
            .onError(reject)
            .send(true /* skip_queue */);
    }
}
