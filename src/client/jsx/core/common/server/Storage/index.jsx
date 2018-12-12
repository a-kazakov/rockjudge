import Api from "common/server/Api";
import websocket from "common/server/websocket";

import GlobalSchema from "./schema/GlobalSchema";
import SubscriptionStorage from "./models/SubscriptionStorage";
import DefaultMap from "common/DefaultMap";
import ModelOverride from "common/server/Storage/models/ModelOverride";
import connection_status from "common/connection_status";

export default class Storage {
    constructor() {
        this.init_started = false;
        this.ready = false;
        this.postponed_subscriptions = new Map();
        this.subscription_storage_index = new DefaultMap(() => []);
        this.overrides = new DefaultMap(() => new ModelOverride());
    }
    init(mutation_callback) {
        if (this.init_started) {
            throw new Error("Attempt to init storage multiple times");
        }
        this.init_started = true;
        this.mutation_callback = mutation_callback;
        return new Promise(this._init);
    }
    _init = (resolve, reject) => {
        Api("service/get_db_schema", {})
            .onSuccess(response => resolve(this.finishInit(response)))
            .onError(reject)
            .send();
    };
    finishInit = response => {
        this.global_schema = new GlobalSchema(response, this);
        this.subscription_storages = new Map();
        this.ready = true;
        websocket.setStorage(this);
        this.subscribePostponed();
    };
    rebuildSubscriptionStorageIndex() {
        this.subscription_storage_index.clear();
        for (const sub_storage of this.subscription_storages.values()) {
            for (const model_name of sub_storage.subscription.constructor.MODELS) {
                this.subscription_storage_index.get(model_name).push(sub_storage);
            }
        }
    }
    getSubscriptionStorageByModel(
        for_model_name,
        existing_model_name,
        existing_model_id,
    ) {
        const options = this.subscription_storage_index.get(for_model_name);
        return options.find(sub_storage =>
            sub_storage.has(existing_model_name, existing_model_id),
        );
    }
    getAllSubscriptionStorages(model_name) {
        return this.subscription_storage_index.get(model_name);
    }
    get(model_name, model_id) {
        for (const sub_storage of this.subscription_storages.values()) {
            const model = sub_storage.get(model_name, model_id);
            if (model == null) {
                continue;
            }
            return model;
        }
        return null;
    }
    subscribe(subscription) {
        if (!this.ready) {
            return this.postponeSubscription(subscription);
        }
        const subscription_storage = new SubscriptionStorage(this, subscription);
        this.subscription_storages.set(subscription, subscription_storage);
        return subscription.subscribe().then(() => subscription_storage);
        // Index is rebuild once initial mutation is acquired
    }
    unsubscribe(subscription) {
        if (!this.ready) {
            this.postponed_subscriptions.delete(subscription);
            return;
        }
        this.subscription_storages.delete(subscription);
        this.rebuildSubscriptionStorageIndex();
        subscription.unsubscribe();
    }
    resubscribeAll() {
        const promises = Array.from(this.subscription_storages.values()).map(ms =>
            ms.resubscribe(),
        );
        return Promise.all(promises);
    }
    postponeSubscription(subscription) {
        return new Promise((resolve, reject) =>
            this._postponeSubscription(subscription, resolve, reject),
        );
    }
    _postponeSubscription = (subscription, resolve, reject) => {
        this.postponed_subscriptions.set(subscription, [resolve, reject]);
    };
    subscribePostponed() {
        for (const [
            subscription,
            [resolve, reject],
        ] of this.postponed_subscriptions.entries()) {
            this.subscribe(subscription)
                .then(resolve)
                .catch(reject);
        }
        this.postponed_subscriptions.clear();
    }
    handleMutations(mutations, is_initial = false, subscription_id = null) {
        if (!is_initial && !this.ready) {
            return;
        }
        let changed = false;
        for (const mst of this.subscription_storages.values()) {
            if (is_initial) {
                if (mst.subscription.subscription_id !== subscription_id) {
                    continue;
                }
                mst.clear();
            }
            changed = mst.applyMutations(mutations, is_initial) || changed;
        }

        if (changed) {
            this.mutation_callback();
        }
    }
    addOverride(response_key, model_name, model_id, data) {
        this.overrides.get(`${model_name}/${model_id}`).push(response_key, data);
        this.mutation_callback();
        connection_status.setPendingData();
    }
    removeOverride(response_key, model_name, model_id) {
        const override = this.overrides.get(`${model_name}/${model_id}`);
        override.pop(response_key);
        if (override.isEmpty()) {
            this.overrides.delete(`${model_name}/${model_id}`);
        }
        if (!this.hasOverrides()) {
            connection_status.setNoPendingData();
        }
        this.mutation_callback();
    }
    hasOverrides() {
        return this.overrides.size > 0;
    }
}
