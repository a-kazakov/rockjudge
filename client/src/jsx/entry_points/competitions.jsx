import "babel-polyfill";

import CompetitionsManager from "pages/CompetitionsManager";

ReactDOM.render(
    <CompetitionsManager { ...window.page_props } />,
    document.getElementById("content")
);
