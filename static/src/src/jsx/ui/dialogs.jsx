import _ from "l10n";


export function showError(msg) {
    let title = (typeof msg === "object") ? msg[0] : _("global.messages.error_header");
    let text = (typeof msg === "object") ? msg[1] : msg;
    swal({
        title: title,
        text: text,
        type: "error",
        animation: false,
    });
}

export function showConfirm(message, action, close_on_confirm=false) {
    return swal({
        title: message,
        animation: false,
        showCancelButton: true,
        confirmButtonText: _("global.labels.yes"),
        cancelButtonText: _("global.labels.no"),
        closeOnConfirm: close_on_confirm,
    }, action);
}
