import "babel-polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet"

import ScreenOperator from "pages/ScreenOperator";

waitRulesSet(() =>
    ReactDOM.render(
        <ScreenOperator { ...window.page_props } />,
        window.document.getElementById("content")
    )
);
