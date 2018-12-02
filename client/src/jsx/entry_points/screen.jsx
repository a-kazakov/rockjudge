import React from "react";
import ReactDOM from "react-dom";

import "@babel/polyfill";
import "common/error_handler";

import Screen from "pages/Screen";

window.React = React;

ReactDOM.render(
    <Screen { ...window.page_props } />,
    window.document.getElementById("content")
);
