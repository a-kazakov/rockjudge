import "babel-polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet"

import PresenterTablet from "pages/PresenterTablet";

waitRulesSet(() =>
    ReactDOM.render(
        <PresenterTablet { ...window.page_props } />,
        window.document.getElementById("content")
    )
);
