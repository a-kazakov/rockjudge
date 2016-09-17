import "babel-polyfill";

import Screen from "Screen";

ReactDOM.render(
    <Screen { ...window.page_props } />,
    window.document.getElementById("content")
);
