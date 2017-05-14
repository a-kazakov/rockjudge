export let Api = null;
export let FastApi = null;
export let websocket = null;
export let storage = null;

export function setup(data) {
    Api       = data.Api;
    FastApi   = data.FastApi;
    websocket = data.websocket;
    storage   = data.storage;
}
