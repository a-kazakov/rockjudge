import Ref from "./Ref";

const LOWER_KEY = 1;
const UPPER_KEY = 2;
const VALUE_KEY = 3;

export default class Model {
    static getOrCreate(storage, id, model_name) {
        return storage.get(model_name).getModelOrCreate(id);
    }

    constructor(storage, id, model_storage) {
        this.id = id;
        this.__storage = storage;
        this.__key_types = new Map();
        this.__model_storage = model_storage;
        this.__schema = {};
    }

    addBackRef(key, ref) {
        this[key] = ref;
        this.__key_types.set(key, UPPER_KEY);
    }

    mergeSchemas(current_schema, new_schema) {
        for (const key of Object.keys(new_schema)) {
            if (key in current_schema) {
                this.mergeSchemas(current_schema[key], new_schema[key]);
            } else {
                current_schema[key] = new_schema[key];
            }
        }
    }
    updateSchema(schema) {
        this.mergeSchemas(this.__schema, schema);
    }

    add(data, schema) {
        this.updateSchema(schema);
        this.update(data);
    }
    update(data) {
        let data_changed = false;
        const lower_keys = Object.keys(data).filter(key => key[0] === "*").map(key => key.slice(1));
        const upper_keys = Object.keys(data).filter(key => key[0] === "^").map(key => key.slice(1));
        const value_keys = Object.keys(data).filter(key => key[0] !== "^" && key[0] !== "*");
        for (const key of value_keys) {
            data_changed = data_changed || this[key] === data[key];
            this[key] = data[key];
            this.__key_types.set(key, VALUE_KEY);
        }
        for (const key of lower_keys) {
            if (!(key in this.__schema)) {
                continue;
            }
            const key_data = data[`*${key}`];
            const back_ref = new Ref(this.__storage, this.__model_storage.model_name, this.id);
            const back_ref_key = key_data.back_ref;
            this[key] = [];
            for (const child of key_data.children) {
                const child_model = Model.getOrCreate(this.__storage, child.id, child.model);
                child_model.updateSchema(this.__schema[key]);
                child_model.addBackRef(back_ref_key, back_ref);
                const ref = new Ref(this.__storage, child.model, child.id);
                this[key].push(ref);
            }
            this.__key_types.set(key, LOWER_KEY);
            data_changed = true;
        }
        for (const key of upper_keys) {
            if (!(key in this.__schema)) {
                continue;
            }
            const parent = data[`^${key}`];
            const parent_model = Model.getOrCreate(this.__storage, parent.id, parent.model);
            parent_model.updateSchema(this.__schema[key]);
            this[key] = new Ref(this.__storage, parent.model, parent.id);
            this.__key_types.set(key, UPPER_KEY);
            data_changed = true;
        }
        return data_changed;
    }

    unsafeSerialize(schema) {
        let result = {}
        for (const [key, key_type] of this.__key_types.entries()) {
            switch (key_type) {
            case LOWER_KEY:
                if (key in schema) {
                    result[key] = this[key].map(ref => ref.get().unsafeSerialize(schema[key]));
                }
                break;
            case UPPER_KEY:
                if (key in schema) {
                    result[key] = this[key].get().unsafeSerialize(schema[key]);
                }
                break;
            default:
                result[key] = this[key];
            }
        }
        result.id = this.id
        for (const key of Object.keys(schema)) {
            if (!(key in result)) {
                console.warn(schema, result);
                throw ReferenceError("Failed to serialize");
            }
        }
        return result;
    }
    serialize(schema) {
        try {
            return this.unsafeSerialize(schema);
        }
        catch (e) {
            if (e instanceof ReferenceError) {
                return null;
            } else {
                throw e;
            }
        }
    }
}
