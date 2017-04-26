import _ from "l10n";

export default function showConfirm(message, action, close_on_confirm=false) {
    return swal({
        title: Array.isArray(message) ? message[0] : message,
        text: Array.isArray(message) ? message[1] : null,
        animation: false,
        showCancelButton: true,
        confirmButtonText: _("global.labels.yes"),
        cancelButtonText: _("global.labels.no"),
        closeOnConfirm: close_on_confirm,
    }, action);
}
