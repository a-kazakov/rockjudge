import Model from "./Model";
import { consoleError } from "common/logging";

export default class SubscriptionStorage {
    constructor(global_storage, subscription) {
        this.global_storage = global_storage;
        this.subscription = subscription;
        this.ready = false;
        this.models = new Map();
        this.tour_results = new Map();
        this.discipline_results = new Map();
        this.fk_index = new Map();
        this.list_fk_index = new Map();
    }
    static getKey(model_name, model_id) {
        return `${model_name}_${model_id}`;
    }
    static compareSortingKeyItem(a, b) {
        if (typeof a === "number") {
            return a - b;
        }
        if (typeof a === "string") {
            return a.localeCompare(b);
        }
        consoleError("Unknown value type for sorting key", typeof a);
        return 0;
    }
    static compareSortingKey(a_model, b_model) {
        const a = a_model._sorting_key;
        const b = b_model._sorting_key;
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; ++i) {
            if (a[i] === b[i]) {
                continue;
            }
            return SubscriptionStorage.compareSortingKeyItem(a[i], b[i]);
        }
        return 0;
    }
    static sameFunc = x => x;

    get global_schema() {
        return this.global_storage.global_schema;
    }
    applyModelMutation = mutation => {
        if (!this.subscription.checkMutation(mutation)) {
            return false;
        }
        const key = this.constructor.getKey(mutation.model_name, mutation.id);
        switch (mutation.action) {
            case "C": {
                const model = Model.create(this.global_schema, mutation, this);
                this.models.set(key, model);
                this.addModelToIndex(model);
                break;
            }
            case "U": {
                const model = this.models.get(key);
                if (!model) {
                    consoleError(
                        `Trying to update for unknown model ${mutation.model_name}/${
                            mutation.id
                        }`,
                    );
                    return false;
                }
                model.update(mutation);
                break;
            }
            case "D": {
                const model = this.models.get(key);
                if (!model) {
                    consoleError(
                        `Trying to delete for unknown model ${mutation.model_name}/${
                            mutation.id
                        }`,
                    );
                    return false;
                }
                this.deleteModelFromIndex(model);
                this.models.delete(key);
                break;
            }
            default:
                consoleError("Unknown mutation action", mutation.action);
                return false;
        }
        return true;
    };
    applyTourResultMutation = mutation => {
        if (!this.subscription.shouldApplyTourResultsMutation(mutation)) {
            return false;
        }
        this.tour_results.set(mutation.tour_id, mutation.data);
        return true;
    };
    applyDisciplineResultMutation = mutation => {
        if (!this.subscription.shouldApplyDisciplineResultsMutation(mutation)) {
            return false;
        }
        this.discipline_results.set(mutation.discipline_id, mutation.data);
        return true;
    };
    applyMutations(mutations, is_initial = false) {
        if (is_initial) {
            this.ready = true;
        } else if (!this.ready) {
            return;
        }
        const models_changed = mutations.models_mutations
            .map(this.applyModelMutation)
            .some(this.constructor.sameFunc);
        const tours_changed = mutations.tour_results_updates
            .map(this.applyTourResultMutation)
            .some(this.constructor.sameFunc);
        const disciplines_changed = mutations.discipline_results_updates
            .map(this.applyDisciplineResultMutation)
            .some(this.constructor.sameFunc);
        if (is_initial) {
            this.global_storage.rebuildSubscriptionStorageIndex();
        }
        return models_changed || tours_changed || disciplines_changed;
    }
    get(model_name, model_id) {
        return this.models.get(this.constructor.getKey(model_name, model_id)) ?? null;
    }
    has(model_name, model_id) {
        return this.models.has(this.constructor.getKey(model_name, model_id));
    }
    getSame(model) {
        return this.get(model.schema.model_name, model.id);
    }
    getType(model_name) {
        return Array.from(this.models.values())
            .filter(m => m.schema.model_name === model_name)
            .sort(this.constructor.compareSortingKey);
    }
    clear() {
        this.ready = false;
        this.models.clear();
        this.fk_index.clear();
        this.list_fk_index.clear();
    }
    _getIndexBucket(index_key) {
        const existing_result = this.fk_index.get(index_key);
        if (existing_result) {
            return existing_result;
        }
        const new_result = new Set();
        this.fk_index.set(index_key, new_result);
        return new_result;
    }
    addModelToIndex(model) {
        for (const index_key of model.getIndexKeys()) {
            this._getIndexBucket(index_key).add(model);
            this.list_fk_index.delete(index_key);
        }
    }
    deleteModelFromIndex(model) {
        for (const index_key of model.getIndexKeys()) {
            this._getIndexBucket(index_key).delete(model);
            this.list_fk_index.delete(index_key);
        }
    }
    getIndexValue(ref, model_id) {
        const index_key = ref.makeIndexKey(model_id);
        const cached_result = this.list_fk_index.get(index_key);
        if (cached_result) {
            return cached_result.sort(this.constructor.compareSortingKey);
        }
        const computed_result = this.fk_index.get(index_key);
        if (computed_result) {
            const result = Array.from(computed_result.values());
            result.sort(this.constructor.compareSortingKey);
            this.list_fk_index.set(index_key, result);
            return result;
        }
        return [];
    }
    resubscribe() {
        this.ready = false;
        return this.subscription.subscribe();
    }
}
