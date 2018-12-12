export default function makeRandomString() {
    const date = new Date();
    const time = date.getTime() * 1000 + date.getUTCMilliseconds();
    const random1 = Math.floor(Math.random() * 10000000000000000);
    const random2 = Math.floor(Math.random() * 10000000000000000);
    return `${random1.toString(36)}${time.toString(36)}${random2.toString(36)}`;
}
