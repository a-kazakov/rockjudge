export let Api = null;
export let websocket = null;
export const React = window.React;

export function setup(data) {
    Api       = data.Api;
    websocket = data.websocket;
}
