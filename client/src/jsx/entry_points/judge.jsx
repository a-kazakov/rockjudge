import "babel-polyfill";
import "common/error_handler";

import JudgeTablet from "pages/JudgeTablet";

ReactDOM.render(
    <JudgeTablet { ...window.page_props } />,
    window.document.getElementById("content")
);
