import Api from "common/server/Api";
import storage from "common/server/storage";
import websocket from "common/server/websocket";

export default class DataLoader {
    constructor(callback, method, model_type, model_id, schema, class_id) {
        this._callback = callback;
        this._method = `${model_type.toLowerCase()}.get`;
        this._id_name = `${model_type.toLowerCase()}_id`;
        this._model_type = model_type;
        this._model_id = model_id;
        this._schema = schema;
        this._storage_domain = `${class_id}_${model_type}_${model_id}`;
        this._storage = storage.getDomain(this._storage_domain);
        this._update_listener = null;
        this._reload_listener = null;
        this._destroyed = false;
        this._callback(null);
        this.loadData();
    }
    loadData = () => {
        if (this._destroyed) {
            return;
        }
        Api(this._method, {[this._id_name]: this._model_id, children: this._schema})
            .addToDB(this._model_type, this._model_id, this._storage)
            .onSuccess(this.handleDataLoaded)
            .send();
    }
    handleDataLoaded = () => {
        if (this._destroyed) {
            return;
        }
        if (this._reload_listener === null) {
            this._reload_listener = websocket.addListener("reload_data", this.loadData);
        }
        if (this._update_listener === null) {
            this._update_listener = this._storage.addListener(this.reloadFromStorage);
        }
        this.reloadFromStorage();
    }
    reloadFromStorage = () => {
        if (this._destroyed) {
            return;
        }
        const serialized = this._storage
            .get(this._model_type)
            .by_id(this._model_id)
            .serialize(this._schema);
        this._callback(serialized);
    }
    destroy() {
        this._destroyed = true;
        storage.delDomain(this._storage_domain);
        if (this._reload_listener !== null) {
            websocket.removeListener(this._reload_listener);
        }
        if (this._update_listener !== null) {
            this._storage.removeListener(this._update_listener);
        }
    }
}
