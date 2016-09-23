import _ from "l10n";

export default function showError(msg) {
    const title = (typeof msg === "object") ? msg[0] : _("global.messages.error_header");
    const text = (typeof msg === "object") ? msg[1] : msg;
    swal({
        title: title,
        text: text,
        type: "error",
        animation: false,
    });
}
