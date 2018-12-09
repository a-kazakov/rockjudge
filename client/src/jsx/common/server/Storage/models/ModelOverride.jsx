import lastOf from "common/tools/lastOf";

export default class ModelOverride {
    _overrides = new Map();

    push(request_key, data) {
        this._overrides.set(request_key, data);
    }
    pop(request_key) {
        this._overrides.delete(request_key);
    }
    applyTo(base_value, model_key) {
        const all_overrides = Array.from(this._overrides.values())
            .filter(v => v.hasOwnProperty(model_key))
            .map(v => v[model_key]);
        if (all_overrides.length === 0) {
            return base_value;
        }
        return typeof(base_value) === "object" && all_overrides.every(v => typeof(v) === "object")
            ? Object.assign({}, base_value, ...all_overrides)
            : lastOf(all_overrides);
    }
    isEmpty() {
        return this._overrides.size === 0;
    }
}
