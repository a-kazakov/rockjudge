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
        subscription_storage = this.storage.getSubscriptionStorageByModel(
            this.ref_model_name,
            this.ref_model_name,
            model_id,
        );
        return subscription_storage?.get(this.ref_model_name, model_id) || null;
    }
    getBackwardModels(model_id, subscription_storage) {
        subscription_storage = this.storage.getSubscriptionStorageByModel(
            this.base_model_name,
            this.ref_model_name,
            model_id,
        );
        return subscription_storage?.getIndexValue(this, model_id) ?? [];
    }
}
