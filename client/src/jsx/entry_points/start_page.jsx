import "babel-polyfill";

import StartPage from "pages/StartPage";

ReactDOM.render(
    <StartPage { ...window.page_props } />,
    window.document.getElementById("content")
);
