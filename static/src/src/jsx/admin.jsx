import "babel-polyfill";

import AdminPanel from "AdminPanel";

ReactDOM.render(
    <AdminPanel { ...window.page_props } />,
    document.getElementById("content")
);
