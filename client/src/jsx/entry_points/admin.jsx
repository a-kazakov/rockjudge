import React from "react";
import ReactDOM from "react-dom";

import "@babel/polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet"

import AdminPanel from "pages/AdminPanel";

window.React = React;

waitRulesSet(() =>
    ReactDOM.render(
        <AdminPanel { ...window.page_props } />,
        document.getElementById("content")
    )
);
