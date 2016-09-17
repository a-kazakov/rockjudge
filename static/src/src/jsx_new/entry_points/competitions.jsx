import "babel-polyfill";

import CompetitionsManager from "CompetitionsManager";

ReactDOM.render(
    <CompetitionsManager { ...window.page_props } />,
    document.getElementById("content")
);
