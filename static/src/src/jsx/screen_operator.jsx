import "babel-polyfill";

import { ScreenOperator } from "clients/screen_operator/main";

ReactDOM.render(
    <ScreenOperator { ...window.page_props } />,
    window.document.getElementById("content")
);
