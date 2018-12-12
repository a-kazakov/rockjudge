import BaseSubscription from "./BaseSubscription";
import Api from "common/server/Api";

export default class TourSubscription extends BaseSubscription {
    static MODELS = ["Tour", "Run", "Score", "RunAcrobatic"];
    constructor(tour_id) {
        super();
        this.tour_id = tour_id;
    }
    checkMutation(mutation) {
        if (this.tour_id !== mutation.tour_id) {
            return false;
        }
        return this.constructor.MODELS.includes(mutation.model_name);
    }
    subscribe() {
        return new Promise(this._subscribe);
    }
    _subscribe = (resolve, reject) => {
        Api("model/subscribe", {
            model_name: "Tour",
            model_id: this.tour_id,
            subscription_id: this.subscription_id,
        })
            .onSuccess(resolve)
            .onError(reject)
            .send(true /* skip_queue */);
    };
    shouldApplyTourResultsMutation(mutation) {
        return mutation.tour_id === this.tour_id;
    }
}
