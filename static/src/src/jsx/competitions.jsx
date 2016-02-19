import { Competitions } from "admin/competitions/main";


ReactDOM.render(
    <Competitions { ...window.page_props } />,
    document.getElementById("content")
);
