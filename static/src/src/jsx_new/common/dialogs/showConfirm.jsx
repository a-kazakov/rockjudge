import _ from "l10n";

export default (message, action, close_on_confirm=false) => {
    return swal({
        title: message,
        animation: false,
        showCancelButton: true,
        confirmButtonText: _("global.labels.yes"),
        cancelButtonText: _("global.labels.no"),
        closeOnConfirm: close_on_confirm,
    }, action);
}
