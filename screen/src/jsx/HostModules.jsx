export let Api = null;
export let message_dispatcher = null;
export let storage = null;
export let TourResultsLoader = null;
export let DisciplineResultsLoader = null;

export function setup(data) {
    Api                      = data.Api;
    message_dispatcher       = data.message_dispatcher;
    storage                  = data.storage;
    TourResultsLoader        = data.TourResultsLoader;
    DisciplineResultsLoader  = data.DisciplineResultsLoader;
}
