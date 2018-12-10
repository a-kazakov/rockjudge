import BaseSubscription from "./BaseSubscription";
import Api from "common/server/Api";

export default class CompetitionSubscription extends BaseSubscription {
    static MODELS = [
        "Competition",
        "Discipline",
        "Tour",
        "Run",
        "Participant",
        "Program",
        "Discipline",
        "Judge",
        "DisciplineJudge",
        "Club",
        "CompetitionPlanItem",
        "ClientAuth",
    ];
    constructor(competition_id) {
        super();
        this.competition_id = competition_id;
    }
    checkMutation(mutation) {
        if (this.competition_id !== mutation.competition_id) {
            return false;
        }
        return this.constructor.MODELS.includes(mutation.model_name);
    }
    subscribe() {
        return new Promise(this._subscribe)
    }
    _subscribe = (resolve, reject) => {
        Api("model/subscribe", {
            model_name: "Competition",
            model_id: this.competition_id,
            subscription_id: this.subscription_id,
        })
            .onSuccess(resolve)
            .onError(reject)
            .send(true /* skip_queue */);
    };
    shouldApplyDisciplineResultsMutation(mutation) {
        return mutation.competition_id === this.competition_id;
    }
}
