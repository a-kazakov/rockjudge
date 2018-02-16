import Ref from "./Ref";

const LOWER_KEY = 1;
const UPPER_KEY = 2;
const VALUE_KEY = 3;

export default class Model {
    static getOrCreate(storage, id, model_name) {
        return storage.get(model_name).getModelOrCreate(id);
    }
    static compareValues(x, y) {
        if (x === y) {
            return true;
        }
        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }
        for (let p in x) {
            if (!x.hasOwnProperty(p)) {
                continue;
            }
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            if (x[p] === y[p]) {
                continue;
            }
            if (!Model.compareValues(x[p], y[p])) {
                return false;
            }
        }
        for (let p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    }

    constructor(storage, id, model_storage) {
        this.id = id;
        this.__storage = storage;
        this.__key_types = new Map();
        this.__model_storage = model_storage;
        this.__schema = {};
    }

    addBackRef(key, ref) {
        if (ref.equals(this[key]) && this.__key_types.get(key) === UPPER_KEY) {
            return false;
        }
        this[key] = ref;
        this.__key_types.set(key, UPPER_KEY);
        return true;
    }

    mergeSchemas(current_schema, new_schema) {
        let modified = false;
        for (const key of Object.keys(new_schema)) {
            if (key in current_schema) {
                this.mergeSchemas(current_schema[key], new_schema[key]);
            } else {
                modified = true;
                current_schema[key] = new_schema[key];
            }
        }
        return modified;
    }
    updateSchema(schema) {
        return this.mergeSchemas(this.__schema, schema);
    }

    add(data, schema) {
        let modified = false;
        modified = this.updateSchema(schema) || modified;
        modified = this.update(data) || modified;
        return modified;
    }
    update(data) {
        let data_changed = false;
        const lower_keys = Object.keys(data).filter(key => key[0] === "*").map(key => key.slice(1));
        const upper_keys = Object.keys(data).filter(key => key[0] === "^").map(key => key.slice(1));
        const value_keys = Object.keys(data).filter(key => key[0] !== "^" && key[0] !== "*");
        for (const key of value_keys) {
            data_changed = data_changed || !Model.compareValues(this[key], data[key]) || this.__key_types.get(key) !== VALUE_KEY;
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
            const prev_values = this[key];
            this[key] = [];
            for (const child of key_data.children) {
                const [child_model, created] = Model.getOrCreate(this.__storage, child.id, child.model);
                data_changed = data_changed || created;
                data_changed = child_model.updateSchema(this.__schema[key]) || data_changed;
                data_changed = child_model.addBackRef(back_ref_key, back_ref) || data_changed;
                const ref = new Ref(this.__storage, child.model, child.id);
                this[key].push(ref);
            }
            if (!data_changed) {
                if (prev_values && this[key].length === prev_values.length) {
                    for (let i = 0; i < prev_values.length; ++i) {
                        if (!prev_values[i].equals(this[key][i])) {
                            data_changed = true;
                            break;
                        }
                    }
                } else {
                    data_changed = true;
                }
                if (this.__key_types.get(key) !== LOWER_KEY) {
                    data_changed = true;
                }
            }
            this.__key_types.set(key, LOWER_KEY);
        }
        for (const key of upper_keys) {
            if (!(key in this.__schema)) {
                continue;
            }
            const parent = data[`^${key}`];
            const [parent_model, created] = Model.getOrCreate(this.__storage, parent.id, parent.model);
            data_changed = data_changed || created;
            data_changed = parent_model.updateSchema(this.__schema[key]) || data_changed;
            const next_ref = new Ref(this.__storage, parent.model, parent.id);
            if (!next_ref.equals(this[key])) {
                this[key] = next_ref;
                data_changed = true;
            }
            if (this.__key_types.get(key) !== UPPER_KEY) {
                data_changed = true;
            }
            this.__key_types.set(key, UPPER_KEY);
        }
        return data_changed;
    }

    unsafeSerialize(schema) {
        let result = {};
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
        result.id = this.id;
        for (const key of Object.keys(schema)) {
            if (!(key in result)) {
                console.warn("Failed to serialize result: Shema:", schema, "Fetched data:", result);
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
