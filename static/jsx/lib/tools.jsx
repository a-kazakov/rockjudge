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
