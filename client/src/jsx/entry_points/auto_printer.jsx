import "babel-polyfill";
import "common/error_handler";

import AutoPrinter from "pages/AdminPanel/Service/AutoPrinter";

ReactDOM.render(
    <AutoPrinter { ...window.page_props } />,
    document.getElementById("content")
);
