import { Screen } from "clients/screen/main";


ReactDOM.render(
    <Screen { ...window.page_props } />,
    window.document.getElementById("content")
);
