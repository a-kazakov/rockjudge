import "babel-polyfill";

import Screen from "pages/Screen";

ReactDOM.render(
    <Screen { ...window.page_props } />,
    window.document.getElementById("content")
);
