import "babel-polyfill";

import PresenterTablet from "PresenterTablet";

ReactDOM.render(
    <PresenterTablet { ...window.page_props } />,
    window.document.getElementById("content")
);
