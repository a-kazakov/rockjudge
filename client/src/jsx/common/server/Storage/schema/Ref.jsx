export default class Ref {
    constructor(base_model_name, raw_data, storage) {
        const {name, foreign_key_model, key, backref} = raw_data;
        this.base_model_name = base_model_name;
        this.ref_model_name = foreign_key_model;
        this.id_field_name = name;
        this.ref_name = key;
        this.backref_name = backref;
        this.storage = storage;
    }
    makeIndexKey(model_id) {
        return `${this.base_model_name}_${this.ref_model_name}_${model_id}`;
    }
    getForwardModel(model_id, subscription_storage) {
        if (!subscription_storage.subscription.constructor.MODELS.has(this.ref_model_name)) {
            subscription_storage = this.storage.getSubscriptionStorage(this.ref_model_name);
        }
        return subscription_storage?.get(this.ref_model_name, model_id) || null;
    }
    getBackwardModels(model_id, subscription_storage) {
        if (!subscription_storage.subscription.constructor.MODELS.has(this.base_model_name)) {
            subscription_storage = this.storage.getSubscriptionStorage(this.base_model_name);
        }
        return subscription_storage?.getIndexValue(this, model_id) || [];
    }
}
