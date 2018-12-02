import BaseSubscription from "./BaseSubscription";
import Api from "common/server/Api";

export default class CompetitionSubscription extends BaseSubscription {
    static MODELS = new Map([
        ["Competition", 10],
        ["Discipline", 10],
        ["Tour", 10],
        ["Run", 10],
        ["Participant", 10],
        ["Program", 10],
        ["Discipline", 10],
        ["Judge", 10],
        ["DisciplineJudge", 10],
        ["Club", 10],
        ["CompetitionPlanItem", 10],
        ["ClientAuth", 10],
    ]);
    constructor(competition_id) {
        super();
        this.competition_id = competition_id;
    }
    checkMutation(mutation) {
        if (this.competition_id !== mutation.competition_id) {
            return false;
        }
        return this.constructor.MODELS.has(mutation.model_name);
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
            .send();
    };
    shouldApplyDisciplineResultsMutation(mutation) {
        return mutation.competition_id === this.competition_id;
    }
}
