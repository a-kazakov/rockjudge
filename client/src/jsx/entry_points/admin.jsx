import "babel-polyfill";

import AdminPanel from "pages/AdminPanel";

ReactDOM.render(
    <AdminPanel { ...window.page_props } />,
    document.getElementById("content")
);
