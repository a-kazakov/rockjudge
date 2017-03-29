import "babel-polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet"

import Screen from "pages/Screen";

waitRulesSet(() =>
    ReactDOM.render(
        <Screen { ...window.page_props } />,
        window.document.getElementById("content")
    )
);
