import _ from "l10n";

import swal from "sweetalert2"

export default function showConfirm(message, action) {
    return swal({
        title: Array.isArray(message) ? message[0] : message,
        text: Array.isArray(message) ? message[1] : null,
        showCancelButton: true,
        confirmButtonText: _("global.labels.yes"),
        cancelButtonText: _("global.labels.no"),
    }).then((data) => {
        if (data.value) {
            action();
        }
    );
}
