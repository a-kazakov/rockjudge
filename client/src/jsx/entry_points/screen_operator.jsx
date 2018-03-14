import "@babel/polyfill";
import "common/error_handler";

import ScreenOperator from "pages/ScreenOperator";

ReactDOM.render(
    <ScreenOperator { ...window.page_props } />,
    window.document.getElementById("content")
);
