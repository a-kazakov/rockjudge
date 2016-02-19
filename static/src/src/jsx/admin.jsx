import { Admin } from "admin/main";


ReactDOM.render(
    <Admin { ...window.page_props } />,
    document.getElementById("content")
);
