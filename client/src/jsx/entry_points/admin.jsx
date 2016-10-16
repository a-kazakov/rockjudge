import "babel-polyfill";
import "common/error_handler";

import AdminPanel from "pages/AdminPanel";

ReactDOM.render(
    <AdminPanel { ...window.page_props } />,
    document.getElementById("content")
);
