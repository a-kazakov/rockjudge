class EnumInstance {
    constructor(key, values, enum_cls) {
        this._key = key;
        this._values = values;
        this._enum_cls = enum_cls;
    }

    match(handles) {
        const handles_keys = Object.keys(handles).sort();
        if (
            handles_keys.length !== this._enum_cls._keys.length ||
            handles_keys.some((v, i) => v !== this._enum_cls._keys[i])
        ) {
            console.error(`Match handles don't match enum definition`);
        }
        return handles[this._key]?.(this._values);
    }

    check(key) {
        if (!this._enum_cls._keys.includes(key)) {
            console.error(`Checking enum against invalid value ${key}`);
        }
        return this._key === key;
    }

    unpack(key) {
        return this.check(key) ? this._values : null;
    }
}

export default class Enum {
    constructor(options) {
        this._keys = Object.keys(options).sort();
        for (const [key, vars] of Object.entries(options)) {
            this[key] = this._makeInstance.bind(this, key, vars.sort());
        }
    }

    _makeInstance(key, vars, values = null) {
        if (vars.length === 0) {
            return new EnumInstance(key, {}, this);
        }
        if (values == null) {
            console.error(`Values for enum value ${key} are not specified`);
            return null;
        }
        const values_keys = Object.keys(values).sort();
        if (
            vars.length !== values_keys.length ||
            values_keys.some((v, i) => v !== vars[i])
        ) {
            console.error(
                `Values for enum value ${key} don't match ones from definition`,
            );
        }
        return new EnumInstance(key, values ?? {}, this);
    }
}
