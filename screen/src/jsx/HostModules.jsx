export let Api = null;
export let websocket = null;
export let storage = null;
export let makeTourResultsTable = null;
export let makeDisciplineResultsTable = null;

export function setup(data) {
    Api                        = data.Api;
    websocket                  = data.websocket;
    storage                    = data.storage;
    makeTourResultsTable       = data.makeTourResultsTable;
    makeDisciplineResultsTable = data.makeDisciplineResultsTable;
}
