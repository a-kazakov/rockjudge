export default function deepCompare(a, b) {
    if (a === b) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((v, i) => deepCompare(v, b[i]));
    }
    if (typeof a === "object" && typeof b === "object") {
        return (
            deepCompare(Object.keys(a), Object.keys(b)) &&
            Object.keys(a).every(k => deepCompare(a[k] === b[k]))
        );
    }
    return false;
}
