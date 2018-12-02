import BaseSubscription from "./BaseSubscription";
import Api from "common/server/Api";

export default class TourSubscription extends BaseSubscription {
    static MODELS = new Map([
        ["Tour", 20],
        ["Run", 20],
        ["Score", 20],
        ["RunAcrobatic", 20],
    ]);
    constructor(tour_id) {
        super();
        this.tour_id = tour_id;
    }
    checkMutation(mutation) {
        if (this.tour_id !== mutation.tour_id) {
            return false;
        }
        return this.constructor.MODELS.has(mutation.model_name);
    }
    subscribe() {
        return new Promise(this._subscribe)
    }
    _subscribe = (resolve, reject) => {
        Api("model/subscribe", {
            model_name: "Tour",
            model_id: this.tour_id,
            subscription_id: this.subscription_id,
        })
            .onSuccess(resolve)
            .onError(reject)
            .send();
    };
    shouldApplyTourResultsMutation(mutation) {
        return mutation.tour_id === this.tour_id;
    }
}
