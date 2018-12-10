export default class Model {
    static create(global_schema, mutation, subscription_storage) {
        const obj = new Model(12345, global_schema, mutation, subscription_storage);
        return new Proxy(obj, {
            get: (target, name) => {
                if (name in target) {
                    return target[name];
                }
                return target.getValue(name);
            },
        });
    }
    constructor(_sentinel_DO_NOT_USE, global_schema, mutation, subscription_storage) {
        if (_sentinel_DO_NOT_USE !== 12345) {
            throw new Error("Model class shouldn't be created directly. Use create static method.");
        }
        this.subscription_storage = subscription_storage;
        this.schema = global_schema.get(mutation.model_name);
        this._raw_data = mutation.data;
    }
    get global_storage() {
        return this.subscription_storage.global_storage;
    }
    get results() {
        const id = this.getValue("id");
        const {model_name} = this.schema;
        const subscription_storages = this.global_storage.getAllSubscriptionStorages(model_name);
        for (const sub_storage of subscription_storages) {
            let result = null;
            switch (model_name) {
                case "Tour":
                    result = sub_storage.tour_results.get(id);
                    break;
                case "Discipline":
                    result = sub_storage.discipline_results.get(id);
                    break;
            }
            if (result != null) {
                return result;
            }
        }
        console.error(`Unable to get results of ${model_name} with ID = ${id}`);
        return null;
    }
    getValue(key) {
        return this.schema.getValue(
            key,
            this._raw_data,
            this.subscription_storage,
            this.global_storage.overrides.getNoCreate(`${this.schema.model_name}/${this._raw_data.id}`),
        );
    }
    _checkIndexUpdateNeeded(mutation) {
        for (const ref of this.schema.refs.values()) {
            if (this._raw_data[ref.id_field_name] !== mutation.data[ref.id_field_name]) {
                return true;
            }
        }
        return false;
    }
    update(mutation) {
        const upd_index = this._checkIndexUpdateNeeded(mutation);
        if (upd_index) {
            this.subscription_storage.deleteModelFromIndex(this)
        }
        this._raw_data = mutation.data;
        if (upd_index) {
            this.subscription_storage.addModelToIndex(this)
        }
    }
    getIndexKeys() {
        const result = [];
        for (const ref of this.schema.refs.values()) {
            result.push(ref.makeIndexKey(this.getValue(ref.id_field_name)));
        }
        return result;
    }
}
