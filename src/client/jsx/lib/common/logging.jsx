const DEV_MODE =
    localStorage.getItem("developer") === "true" || window.location.hash === "#debug";

export function consoleLog(...args) {
    if (!DEV_MODE) {
        return;
    }
    console.log(...args);
}

export function consoleError(...args) {
    console.error(...args);
}
