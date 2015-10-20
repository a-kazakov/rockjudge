"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ref = (function () {
    function Ref(model_name, id) {
        _classCallCheck(this, Ref);

        this.model_name = model_name;
        this.id = id;
    }

    _createClass(Ref, [{
        key: "get",
        value: function get() {
            return storage.get(this.model_name).by_id(this.id);
        }
    }]);

    return Ref;
})();

var Model = (function () {
    function Model(id, model_storage) {
        _classCallCheck(this, Model);

        this.id = id;
        this.__key_types = {};
        this.__model_storage = model_storage;
    }

    _createClass(Model, [{
        key: "addBackRef",
        value: function addBackRef(key, ref) {
            this[key] = ref;
            this.__key_types[key] = "^";
        }
    }, {
        key: "update",
        value: function update(data) {
            var _this = this;

            for (var idx in data) {
                if (data.hasOwnProperty(idx)) {
                    if (idx.charAt(0) === "*") {
                        (function () {
                            var key = idx.slice(1);
                            _this[key] = [];
                            var back_ref = new Ref(_this.__model_storage.model_name, _this.id);
                            var back_ref_key = data[idx].back_ref;
                            data[idx].children.forEach((function (nested_data) {
                                if (typeof nested_data.data == "object") {
                                    storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                                }
                                var ref = new Ref(nested_data.model, nested_data.id);
                                ref.get().addBackRef(back_ref_key, back_ref);
                                this[key].push(ref);
                            }).bind(_this));
                            _this.__key_types[key] = "*";
                        })();
                    } else if (idx.charAt(0) === "^") {
                        var key = idx.slice(1);
                        var nested_data = data[idx];
                        if (typeof nested_data == "object") {
                            storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                        }
                        this[key] = new Ref(nested_data.model, nested_data.id);
                        this.__key_types[key] = "^";
                    } else {
                        this[idx] = data[idx];
                        this.__key_types[idx] = "";
                    }
                }
            }
        }
    }, {
        key: "serialize",
        value: function serialize(schema) {
            var _this2 = this;

            var result = {};

            var _loop = function (key) {
                if (_this2.__key_types.hasOwnProperty(key)) {
                    switch (_this2.__key_types[key]) {
                        case "*":
                            if (key in schema) {
                                result[key] = _this2[key].map(function (ref) {
                                    return ref.get().serialize(schema[key]);
                                });
                            }
                            break;
                        case "^":
                            if (key in schema) {
                                result[key] = _this2[key].get().serialize(schema[key]);
                            }
                            break;
                        default:
                            result[key] = _this2[key];
                    }
                }
            };

            for (var key in this.__key_types) {
                _loop(key);
            }result.id = this.id;
            return result;
        }
    }]);

    return Model;
})();

var ModelsStorage = (function () {
    function ModelsStorage(model_name) {
        _classCallCheck(this, ModelsStorage);

        this.model_name = model_name;
        this.models = {};
    }

    _createClass(ModelsStorage, [{
        key: "add",
        value: function add(id, data) {
            if (typeof this.models[id] === "undefined") {
                this.models[id] = new Model(id, this);
            }
            this.models[id].update(data);
        }
    }, {
        key: "by_id",
        value: function by_id(id) {
            return this.models[id];
        }
    }, {
        key: "all",
        value: function all() {
            var keys = Object.getOwnPropertyNames(this.models);
            return keys.map((function (key) {
                return this.models[key];
            }).bind(this));
        }
    }]);

    return ModelsStorage;
})();

var Storage = (function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.model_storages = {};
    }

    _createClass(Storage, [{
        key: "register_model",
        value: function register_model(model_name) {
            this.model_storages[model_name] = new ModelsStorage(model_name);
        }
    }, {
        key: "get",
        value: function get(model_name) {
            var result = this.model_storages[model_name];
            if (typeof result === "undefined") {
                storage.register_model(model_name);
                result = this.model_storages[model_name];
            }
            return result;
        }
    }, {
        key: "del",
        value: function del(model_name) {
            delete this.model_storages[model_name];
        }
    }]);

    return Storage;
})();

var storage = new Storage();
//# sourceMappingURL=storage.js.map