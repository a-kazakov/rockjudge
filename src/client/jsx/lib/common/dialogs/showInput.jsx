import swal from "sweetalert2";
import showError from "./showError";

export default function showInput(title, text, callback, validator = null) {
    swal({
        title: title,
        text: text,
        showCancelButton: true,
        input: "text",
        inputValidator: validator,
    })
        .then(callback)
        .catch(error => showError(error));
}
