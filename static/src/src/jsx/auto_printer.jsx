import { AutoPrinter } from "admin/auto_printer/main";


ReactDOM.render(
    <AutoPrinter { ...window.page_props } />,
    document.getElementById("content")
);
