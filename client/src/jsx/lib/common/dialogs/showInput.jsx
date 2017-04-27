import swal from "sweetalert2"

export default function showInput(title, text, callback, validator=null) {
    swal({
        title: title,
        text: text,
        showCancelButton: true,
        input: "text",
        inputValidator: validator,
    }).then(callback);
}
