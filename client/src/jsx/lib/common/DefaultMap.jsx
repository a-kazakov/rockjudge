export default class DefaultMap extends Map {
    constructor(def_callable, ...args) {
        super(...args);
        this._def_callable = def_callable;
    }

    get(key) {
        if (!super.has(key)) {
            super.set(key, this._def_callable(key));
        }
        return super.get(key);
    }
    getNoCreate(key) {
        return super.get(key);
    }
}
