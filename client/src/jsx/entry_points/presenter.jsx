import React from "react";
import ReactDOM from "react-dom";

import "@babel/polyfill";
import "common/error_handler";

import PresenterTablet from "pages/PresenterTablet";

ReactDOM.render(
    <PresenterTablet { ...window.page_props } />,
    window.document.getElementById("content")
);
