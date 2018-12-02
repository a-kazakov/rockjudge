export default function floatToFixed(value, signs=3) {
    if (value == null) {
        return null;
    }
    return value.toFixed(signs).replace(/0+$/g, "").replace(/\.$/g, "");
}
