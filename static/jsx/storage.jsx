class Ref {
    constructor(model_name, id) {
        this.model_name = model_name;
        this.id = id;
    }
    get() {
        return storage.get(this.model_name).by_id(this.id);
    }
}

class Model {
    constructor(id) {
        this.id = id;
        this.__key_types = {};
    }
    update(data) {
        for (let idx in data) if (data.hasOwnProperty(idx)) {
            if (idx.charAt(0) === "*") {
                let key = idx.slice(1);
                this[key] = []
                data[idx].forEach(function(nested_data) {
                    if (typeof nested_data.data == "object") {
                        storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                    }
                    this[key].push(new Ref(nested_data.model, nested_data.id));
                }.bind(this));
                this.__key_types[key] = "*";
            } else if (idx.charAt(0) === "^") {
                let key = idx.slice(1);
                let nested_data = data[idx];
                if (typeof nested_data == "object") {
                    storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                }
                this[key] = new Ref(nested_data.model, nested_data.id);
                this.__key_types[key] = "^"
            } else {
                this[idx] = data[idx];
                this.__key_types[idx] = "";
            }
        }
    }
    serialize() {
        let result = {}
        for (let key in this.__key_types) if (this.__key_types.hasOwnProperty(key)) {
            switch (this.__key_types[key]) {
            case "*":
                result[key] = this[key].map(function(ref) {
                    return ref.get().serialize();
                });
                break;
            case "^":
                result[key] = this[key].get().serialize();
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
    constructor() {
        this.models = {}
    }
    add(id, data) {
        if (typeof this.models[id] === "undefined") {
            this.models[id] = new Model(id);
        }
        this.models[id].update(data);
    }
    by_id(id) {
        return this.models[id];
    }
}

class Storage {
    constructor() {
        this.model_storages = {}
    }
    register_model(model_name) {
        this.model_storages[model_name] = new ModelsStorage();
    }
    get(model_name) {
        let result = this.model_storages[model_name];
        if (typeof result === "undefined") {
            storage.register_model(model_name);
            result = this.model_storages[model_name];
        }
        return result;
    }
    del(model_name) {
        delete this.model_storages[model_name];
    }
}

var storage = new Storage()
