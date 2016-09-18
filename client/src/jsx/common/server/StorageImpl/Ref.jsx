export default class Ref {
    constructor(storage, model_name, id) {
        this.model_name = model_name;
        this.id = id;
        this.storage = storage;
    }
    get() {
        return this.storage.get(this.model_name).by_id(this.id);
    }
}
