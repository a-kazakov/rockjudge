class Api {
    constructor(method, data) {
        this.method = method;
        this.data = data;
        this.cb_success = null;
        this.cb_error = null;
        this.cb_fail = null;
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
    send() {
        $.ajax({
            url: "/api",
            method: "post",
            dataType: "json",
            data: {
                method: this.method,
                data: JSON.stringify(this.data),
            },
            success: function(response) {
                if (response.success) {
                    this.cb_success && this.cb_success(response.response);
                } else {
                    console.error("Api error:", response.message);
                    this.cb_error && this.cb_error(response.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                alert("API ERROR!");
                console.error(xhr, status, err.toString());
                this.cb_fail && this.cb_fail(xhr, status, err);
            },
        });
    }
}
