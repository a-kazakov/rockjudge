import "babel-polyfill";
import "common/error_handler";

import Screen from "pages/Screen";

ReactDOM.render(
    <Screen { ...window.page_props } />,
    window.document.getElementById("content")
);
