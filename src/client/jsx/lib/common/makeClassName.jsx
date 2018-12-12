export default function makeClassName(data) {
    return Object.keys(data)
        .filter(cn => data[cn])
        .sort()
        .join(" ");
}
