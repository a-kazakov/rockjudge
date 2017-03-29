import "babel-polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet"

import AdminPanel from "pages/AdminPanel";

waitRulesSet(() =>
    ReactDOM.render(
        <AdminPanel { ...window.page_props } />,
        document.getElementById("content")
    )
);
