class Ref {
    constructor(storage, model_name, id) {
        this.model_name = model_name;
        this.id = id;
        this.storage = storage;
    }
    get() {
        return this.storage.get(this.model_name).by_id(this.id);
    }
}

class Model {
    constructor(storage, id, model_storage) {
        this.id = id;
        this.__storage = storage;
        this.__key_types = {};
        this.__model_storage = model_storage;
    }
    addBackRef(key, ref) {
        this[key] = ref;
        this.__key_types[key] = "^";
    }
    update(data, create=true) {
        for (let idx in data) if (data.hasOwnProperty(idx)) {
            if (idx.charAt(0) === "*" || idx.charAt(0) === "^") {
                if (!create && typeof this[idx.slice(1)] === "undefined") {
                    continue;
                }
            }
            if (idx.charAt(0) === "*") {
                let key = idx.slice(1);
                this[key] = []
                let back_ref = new Ref(this.__storage, this.__model_storage.model_name, this.id);
                let back_ref_key = data[idx].back_ref;
                data[idx].children.forEach(function(nested_data) {
                    if (typeof nested_data.data == "object") {
                        this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                    }
                    let ref = new Ref(this.__storage, nested_data.model, nested_data.id);
                    ref.get().addBackRef(back_ref_key, back_ref);
                    this[key].push(ref);
                }.bind(this));
                this.__key_types[key] = "*";
            } else if (idx.charAt(0) === "^") {
                let key = idx.slice(1);
                let nested_data = data[idx];
                if (typeof nested_data == "object") {
                    this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                }
                this[key] = new Ref(this.__storage, nested_data.model, nested_data.id);
                this.__key_types[key] = "^"
            } else {
                this[idx] = data[idx];
                this.__key_types[idx] = "";
            }
        }
    }
    serialize(schema) {
        let result = {}
        for (let key in this.__key_types) if (this.__key_types.hasOwnProperty(key)) {
            switch (this.__key_types[key]) {
            case "*":
                if (key in schema) {
                    result[key] = this[key].map(function(ref) {
                        return ref.get().serialize(schema[key]);
                    });
                }
                break;
            case "^":
                if (key in schema) {
                    result[key] = this[key].get().serialize(schema[key]);
                }
                break;
            default:
                result[key] = this[key];
            }
        }
        result.id = this.id
        return result;
    }
}

class ModelsStorage {
    constructor(storage, model_name) {
        this.model_name = model_name;
        this.models = {};
        this.storage = storage;
    }
    add(id, data) {
        if (typeof this.models[id] === "undefined") {
            this.models[id] = new Model(this.storage, id, this);
        }
        this.models[id].update(data);
    }
    update(id, data) {
        if (this.models[id]) {
            this.models[id].update(data, false);
            return true;
        }
        return false;
    }
    by_id(id) {
        return this.models[id];
    }
    all() {
        let keys = Object.getOwnPropertyNames(this.models);
        return keys.map(function(key) {
            return this.models[key];
        }.bind(this))
    }
}

class Storage {
    constructor() {
        this.model_storages = {}
        this.domains = {}
    }
    getDomain(domain) {
        if (typeof this.domains[domain] === "undefined") {
            this.domains[domain] = new Storage();
        }
        return this.domains[domain];
    }
    delDomain(domain) {
        delete this.domains[domain];
    }
    get(model_name) {
        if (typeof this.model_storages[model_name] === "undefined") {
            this.model_storages[model_name] = new ModelsStorage(this, model_name);
        }
        return this.model_storages[model_name];
    }
    del(model_name) {
        delete this.model_storages[model_name];
    }
    updateModel(model_type, model_id, data) {
        let data_changed = false;
        if (this.model_storages[model_type]) {
            data_changed = this.get(model_type).update(model_id, data) || data_changed;
        }
        Object.keys(this.domains).forEach((key) =>
            data_changed = this.domains[key].updateModel(...arguments) || data_changed);
        return data_changed;
    }
}

var storage = new Storage()
