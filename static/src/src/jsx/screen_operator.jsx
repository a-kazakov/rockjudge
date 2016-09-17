import "babel-polyfill";

import ScreenOperator from "ScreenOperator";

ReactDOM.render(
    <ScreenOperator { ...window.page_props } />,
    window.document.getElementById("content")
);
