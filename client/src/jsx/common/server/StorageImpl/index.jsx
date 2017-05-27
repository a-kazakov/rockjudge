import ModelsStorage from "./ModelsStorage";

export default class StorageImpl {
    constructor() {
        this.model_storages = new Map();
        this.domains = new Map();
        this._listeners = new Map();
        this._next_listener_id = 0;
    }
    addListener(callback) {
        const listener_id = this._next_listener_id;
        this._listeners.set(listener_id, callback);
        return listener_id;
    }
    removeListener(listener_id) {
        this._listeners.delete(listener_id);
    }
    triggerListeners() {
        for (const callback of this._listeners.values()) {
            callback();
        }
    }
    getDomain(domain) {
        if (!this.domains.has(domain)) {
            this.domains.set(domain, new StorageImpl());
        }
        return this.domains.get(domain);
    }
    delDomain(domain) {
        this.domains.delete(domain);
    }
    get(model_name) {
        if (!this.model_storages.has(model_name)) {
            this.model_storages.set(model_name, new ModelsStorage(this, model_name));
        }
        return this.model_storages.get(model_name);
    }
    del(model_name) {
        this.model_storages.delete(model_name);
    }
    updateModelNode(model_type, model_id, data) {
        let data_changed = false;
        if (this.model_storages.has(model_type)) {
            const changed = this.get(model_type).by_id(model_id).update(data);
            data_changed = data_changed || changed;
        }
        const lower_keys = Object.keys(data).filter(key => key[0] === "*");
        const upper_keys = Object.keys(data).filter(key => key[0] === "^");
        for (const key of lower_keys) {
            for (const child of data[key].children) {
                const changed = this.updateModelNode(child.model, child.id, child.data);
                data_changed = changed || data_changed;
            }
        }
        for (const key of upper_keys) {
            const changed = this.updateModelNode(data[key].model, data[key].id, data[key].data);
            data_changed = changed || data_changed;
        }
        return data_changed;
    }
    updateModel(model_type, model_id, data) {
        const data_changed = this.updateModelNode(model_type, model_id, data);
        if (data_changed) {
            this.triggerListeners();
        }
        for (const domain of this.domains.values()) {
            domain.updateModel(model_type, model_id, data);
        }
    }
    addModel(model_type, model_id, data, schema) {
        const [model, created] = this.get(model_type).getModelOrCreate(model_id);
        model.updateSchema(schema);
        this.updateModelNode(model_type, model_id, data);
        this.triggerListeners();
    }
}
