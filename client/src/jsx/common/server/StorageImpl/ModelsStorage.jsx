import FakeModel from "./FakeModel";
import Model from "./Model";

export default class ModelsStorage {
    constructor(storage, model_name) {
        this.model_name = model_name;
        this.models = new Map();
        this.storage = storage;
    }
    getModelOrCreate(id) {
        if (!this.models.has(id)) {
            this.models.set(id, new Model(this.storage, id, this));
        }
        return this.models.get(id);
    }
    update(id, data) {
        const model = this.models.get(id);
        if (!model) {
            return false;
        }
        model.update(data);
        return true;
    }
    by_id(id) {
        const result = this.models.get(id);
        return result || new FakeModel();
    }
    all() {
        return Array.from(this.models.values());
    }
}
