import { StartPage } from "clients/start_page";


ReactDOM.render(
    <StartPage { ...window.page_props } />,
    window.document.getElementById("content")
);
