import Api from "common/server/Api";
import makeRandomString from "common/tools/makeRandomString";

export default class BaseSubscription {
    static MODELS = new Map();

    constructor() {
        this.subscription_id = makeRandomString();
    }
    checkMutation(/* mutation */) {
        throw new Error("Not implemented");
    }
    subscribe() {
        throw new Error("Not implemented");
    }
    unsubscribe() {
        return new Promise(this._unsubscribe)
    }
    _unsubscribe = (resolve, reject) => {
        Api("model/unsubscribe", {
            subscription_id: this.subscription_id,
        })
            .onSuccess(resolve)
            .onError(reject)
            .send(true /* skip_queue */);
    };
    shouldApplyTourResultsMutation() {
        return false;
    }
    shouldApplyDisciplineResultsMutation() {
        return false;
    }
}
