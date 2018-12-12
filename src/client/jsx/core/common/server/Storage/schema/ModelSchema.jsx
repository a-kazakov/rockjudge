import Ref from "./Ref";

export default class ModelSchema {
    static SPECIAL_FIELDS = new Set(["_sorting_key"]);

    constructor(model_schema, storage) {
        this.storage = storage;
        this.model_name = model_schema.name;
        this.ordinary_fields = new Set();
        this.refs = new Map();
        this.backrefs = new Map();
        for (const field_schema of model_schema.fields) {
            if (field_schema.foreign_key_model != null) {
                const ref = new Ref(this.model_name, field_schema, storage);
                this.refs.set(ref.ref_name, ref);
            } else {
                this.ordinary_fields.add(field_schema.name);
            }
        }
    }
    finishInit(global_schema) {
        for (const ref of this.refs.values()) {
            global_schema.get(ref.ref_model_name)._addBackRef(ref);
        }
    }
    _addBackRef(ref) {
        this.backrefs.set(ref.backref_name, ref);
    }
    getRef(key) {
        return this.refs.get(key) || null;
    }
    getBackRef(key) {
        return this.backrefs.get(key) || null;
    }
    getValue(key, model_data, subscription_storage, overrides) {
        const ref = this.getRef(key);
        if (ref != null) {
            return ref.getForwardModel(
                model_data[ref.id_field_name],
                subscription_storage,
            );
        }
        const backref = this.getBackRef(key);
        if (backref != null) {
            return backref.getBackwardModels(model_data.id, subscription_storage);
        }
        if (overrides != null) {
            return overrides.applyTo(model_data[key], key);
        }
        return model_data[key];
    }
}
