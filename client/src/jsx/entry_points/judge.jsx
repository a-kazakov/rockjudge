import "babel-polyfill";

import JudgeTablet from "pages/JudgeTablet";

ReactDOM.render(
    <JudgeTablet { ...window.page_props } />,
    window.document.getElementById("content")
);
