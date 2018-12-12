import loader from "rules_sets/loader";

export default function waitRulesSet(callback) {
    if (loader.ready) {
        callback();
    } else {
        setTimeout(() => waitRulesSet(callback), 250);
    }
}
