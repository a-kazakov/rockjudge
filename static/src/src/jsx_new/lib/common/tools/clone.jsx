export default function clone(obj) {
    if (typeof obj !== "object") {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}
