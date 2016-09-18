import "babel-polyfill";

import AutoPrinter from "pages/AdminPanel/Service/AutoPrinter";

ReactDOM.render(
    <AutoPrinter { ...window.page_props } />,
    document.getElementById("content")
);
