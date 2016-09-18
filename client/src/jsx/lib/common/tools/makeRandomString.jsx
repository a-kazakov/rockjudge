export default function makeRandomString() {
    const date = new Date();
    const time = date.getTime() * 1000 + date.getUTCMilliseconds();
    const random = Math.floor(Math.random() * 10000000000000000);
    return `${time.toString(36)}_${random.toString(36)}`;
}
