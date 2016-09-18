export let Api = null;
export let message_dispatcher = null;
export let storage = null;
export let TourResults = null;
export let DisciplineResults = null;

export function setup(data) {
    Api                = data.Api;
    message_dispatcher = data.message_dispatcher;
    storage            = data.storage;
    TourResults        = data.TourResults;
    DisciplineResults  = data.DisciplineResults;
}
