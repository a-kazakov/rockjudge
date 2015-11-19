class ApiImpl {
    constructor(method, data) {
        this.method = method;
        this.data = data;
        this.cb_success = null;
        this.cb_error = (msg, code, args) => showError(code ? _(code, ...args) : msg);
        this.cb_fail = null;
        this.update_db = null;
    }
    onSuccess(callback) {
        this.cb_success = callback;
        return this;
    }
    onError(callback) {
        this.cb_error = callback;
        return this;
    }
    onFail(callback) {
        this.cb_fail = callback;
        return this;
    }
    addToDB(model_type, model_id, st=storage) {
        this.update_db = function(response) {
            st.get(model_type).add(model_id, response);
        }
        return this;
    }
    send() {
        $.ajax({
            url: "/api",
            method: "post",
            dataType: "json",
            data: {
                method: this.method,
                data: JSON.stringify(this.data),
                client_id: window.client_id,
            },
            success: function(response) {
                if (response.success) {
                    this.update_db && this.update_db(response.response);
                    this.cb_success && this.cb_success(response.response);
                } else {
                    console.error("Api error:", response.message);
                    this.cb_error && this.cb_error(response.message, response.code, response.args);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(xhr, status, err.toString());
                this.cb_fail && this.cb_fail(xhr, status, err);
            },
        });
    }
}

function Api(method, data) {
    return new ApiImpl(method, data);
}
