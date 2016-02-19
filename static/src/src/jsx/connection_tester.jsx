import { ConnectionTester } from "clients/connection_tester/main";


ReactDOM.render(
    <ConnectionTester { ...window.page_props } />,
    window.document.getElementById("content")
);
