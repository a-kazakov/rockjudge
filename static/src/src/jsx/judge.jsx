import { Judge } from "clients/judge/main";


ReactDOM.render(
    <Judge { ...window.page_props } />,
    window.document.getElementById("content")
);
