import React from "react";
import ReactDOM from "react-dom";

import "@babel/polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet";

import AutoPrinter from "pages/AdminPanel/Service/AutoPrinter";

window.React = React;

waitRulesSet(() =>
    ReactDOM.render(
        <AutoPrinter {...window.page_props} />,
        document.getElementById("content"),
    ),
);
