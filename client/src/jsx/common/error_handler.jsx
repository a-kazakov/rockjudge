import FastApi from "common/server/FastApi";

window.onerror = function(message, url, line, col, err_obj) {
    setTimeout(() => {
        window.location.reload(true);
    }, 2000);
    window.document.write("<center><h2 style='font-family: sans-serif'>Internal error occured.<br>The page will be reloaded soon.</h2></center>");
    FastApi("service.report_js_error", {
        message, url, line, col,
        stack: err_obj && err_obj.stack && err_obj.stack.split("\n"),
        page: window.location.href,
    })
        .send()
}
