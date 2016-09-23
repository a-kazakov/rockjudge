export default function showInput(title, text, callback) {
    swal({
        title: title,
        text: text,
        showCancelButton: true,
        closeOnConfirm: false,
        type: "input",
        animation: false,
    }, callback);
}
