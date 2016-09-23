export default function showSuccess(title, text) {
    swal({
        title: title,
        text: text,
        type: "success",
        animation: false,
    });
}
