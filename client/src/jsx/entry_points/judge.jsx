import React from "react";
import ReactDOM from "react-dom";

import "@babel/polyfill";
import "common/error_handler";

import waitRulesSet from "common/waitRulesSet";

import JudgeTablet from "pages/JudgeTablet";

window.React = React;

waitRulesSet(() =>
    ReactDOM.render(
        <JudgeTablet {...window.page_props} />,
        window.document.getElementById("content"),
    ),
);
