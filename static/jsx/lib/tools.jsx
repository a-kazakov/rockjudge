function clone(obj) {
    if (typeof obj !== "object") {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}

function showError(msg) {
    let title = (typeof msg === "object") ? msg[0] : _("global.messages.error_header");
    let text = (typeof msg === "object") ? msg[1] : msg;
    swal({
        title: title,
        text: text,
        type: "error",
        animation: false,
    })
}

class CmpChainImpl {
    constructor() {
        this.result = 0;
    }
    cmp(a, b) {
        if (this.result == 0) {
            if (a < b) {
                this.result = -1;
            } else if (a > b) {
                this.result = 1;
            }
        }
        return this;
    }
    end() {
        return this.result;
    }
}

var CmpChain = () => new CmpChainImpl();