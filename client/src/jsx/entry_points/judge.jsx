import "@babel/polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet"

import JudgeTablet from "pages/JudgeTablet";

waitRulesSet(() =>
    ReactDOM.render(
        <JudgeTablet { ...window.page_props } />,
        window.document.getElementById("content")
    )
);
