export let Api = null;
export let message_dispatcher = null;
export let storage = null;
export let makeTourResultsTable = null;
export let makeDisciplineResultsTable = null;

export function setup(data) {
    Api                        = data.Api;
    message_dispatcher         = data.message_dispatcher;
    storage                    = data.storage;
    makeTourResultsTable       = data.makeTourResultsTable;
    makeDisciplineResultsTable = data.makeDisciplineResultsTable;
}
