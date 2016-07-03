var CacheMixin = Base => class extends Base {
    resetCache() {
        this._cache = {};
    }
    componentWillReceiveProps() {
        this.resetCache();
    }
    fetchFromCache(key, generator) {
        if (!this._cache) {
            this._cache = {};
        }
        if (!(key in this._cache)) {
            this._cache[key] = generator();
        }
        return this._cache[key];
    }
};

export default CacheMixin;
