import { Presenter } from "clients/presenter/main";


ReactDOM.render(
    <Presenter { ...window.page_props } />,
    window.document.getElementById("content")
);
