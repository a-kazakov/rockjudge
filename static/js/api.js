"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiImpl = (function () {
    function ApiImpl(method, data) {
        _classCallCheck(this, ApiImpl);

        this.method = method;
        this.data = data;
        this.cb_success = null;
        this.cb_error = null;
        this.cb_fail = null;
        this.update_db = null;
    }

    _createClass(ApiImpl, [{
        key: "onSuccess",
        value: function onSuccess(callback) {
            this.cb_success = callback;
            return this;
        }
    }, {
        key: "onError",
        value: function onError(callback) {
            this.cb_error = callback;
            return this;
        }
    }, {
        key: "onFail",
        value: function onFail(callback) {
            this.cb_fail = callback;
            return this;
        }
    }, {
        key: "updateDB",
        value: function updateDB(model_type, model_id) {
            this.update_db = function (response) {
                storage.get(model_type).add(model_id, response);
            };
            return this;
        }
    }, {
        key: "send",
        value: function send() {
            $.ajax({
                url: "/api",
                method: "post",
                dataType: "json",
                data: {
                    method: this.method,
                    data: JSON.stringify(this.data)
                },
                success: (function (response) {
                    if (response.success) {
                        this.update_db && this.update_db(response.response);
                        this.cb_success && this.cb_success(response.response);
                    } else {
                        console.error("Api error:", response.message);
                        this.cb_error && this.cb_error(response.message);
                    }
                }).bind(this),
                error: function error(xhr, status, err) {
                    alert("API ERROR!");
                    console.error(xhr, status, err.toString());
                    this.cb_fail && this.cb_fail(xhr, status, err);
                }
            });
        }
    }]);

    return ApiImpl;
})();

function Api(method, data) {
    return new ApiImpl(method, data);
}
//# sourceMappingURL=api.js.map