export let Api = null;
export let message_dispatcher = null;
export let storage = null;

export function setup(data) {
    Api                      = data.Api;
    message_dispatcher       = data.message_dispatcher;
    storage                  = data.storage;
}
