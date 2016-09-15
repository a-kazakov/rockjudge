import StartPage from "StartPage";


ReactDOM.render(
    <StartPage { ...window.page_props } />,
    window.document.getElementById("content")
);
