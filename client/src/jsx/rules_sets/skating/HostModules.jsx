export let Api = null;
export let websocket = null;
export let storage = null;

export function setup(data) {
    Api       = data.Api;
    websocket = data.websocket;
    storage   = data.storage;
}
