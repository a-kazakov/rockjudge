import React from "react";
import ReactDOM from "react-dom";

import "@babel/polyfill";
import "common/error_handler";

import StartPage from "pages/StartPage";

ReactDOM.render(
    <StartPage {...window.page_props} />,
    window.document.getElementById("content"),
);
