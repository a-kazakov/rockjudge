import "babel-polyfill";

import AutoPrinter from "AdminPanel/Service/AutoPrinter";

ReactDOM.render(
    <AutoPrinter { ...window.page_props } />,
    document.getElementById("content")
);
