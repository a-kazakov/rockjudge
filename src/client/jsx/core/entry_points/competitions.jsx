import React from "react";
import ReactDOM from "react-dom";

import "@babel/polyfill";
import "common/error_handler";

import CompetitionsManager from "pages/CompetitionsManager";

ReactDOM.render(
    <CompetitionsManager {...window.page_props} />,
    document.getElementById("content"),
);
