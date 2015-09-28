var MessageDispatcher = (function () {
    function MessageDispatcher() {
        this.subscribers = {};
        this.ws = new WebSocket("ws://" + window.location.host + "/ws", [], {
            maxReconnectInterval: 3000,
        });
        this.ws.onmessage = this.onMessage.bind(this);
    }
    MessageDispatcher.prototype.DISPATCHERS = {
        competition_update    : "dispatchCompetitionUpdate",
        tour_results_update   : "dispatchResultsUpdate",
        tour_update           : "dispatchTourUpdate",
        run_update            : "dispatchRunUpdate",
        active_tour_update    : "dispatchActiveTourUpdate",
        force_refresh         : "dispatchForceRefresh",
    }
    MessageDispatcher.prototype.VIRTUAL_DEPENDENCIES = {
        "tour_update": ["tour_results_update"],
        "run_update": ["tour_results_update"],
    }
    MessageDispatcher.prototype.dispatchResultsUpdate = function(event_type, message, subscribers) {
        var dispatchWithTourId = function(tour_id) {
            Api.get_tour_results(tour_id, function(new_data) {
                subscribers.forEach(function(cb) {
                    cb(tour_id, new_data);
                });
            }.bind(this));
        }
        var dispatchWithRunId = function(run_id) {
            Api.get_run(run_id, function(run) {
                dispatchWithTourId(run.tour_id);
            });
        }
        switch(event_type) {
        case "tour_update":
            dispatchWithTourId(message.tour_id);
            break;
        case "run_update":
            dispatchWithRunId(message.run_id);
            break;
        }
    }
    MessageDispatcher.prototype.dispatchRunUpdate = function (event_type, message, subscribers) {
        Api.get_run(message.run_id, function(new_data) {
            subscribers.forEach(function(cb) {
                cb(message.run_id, new_data);
            });
        });
    };
    MessageDispatcher.prototype.dispatchActiveTourUpdate = function (event_type, message, subscribers) {
        Api.get_active_tour(function(new_data) {
            subscribers.forEach(function(cb) {
                cb(new_data["tour_id"]);
            });
        });
    };
    MessageDispatcher.prototype.dispatchTourUpdate = function (event_type, message, subscribers) {
        Api.get_tour(message.tour_id, function(new_data) {
            subscribers.forEach(function(cb) {
                cb(message.tour_id, new_data);
            });
        });
    };
    MessageDispatcher.prototype.dispatchCompetitionUpdate = function (event_type, message, subscribers) {
        Api.get_competition(message.competition_id, function(new_data) {
            subscribers.forEach(function(cb) {
                cb(message.comptition_id, new_data);
            });
        });
    };
    MessageDispatcher.prototype.dispatchForceRefresh = function (event_type, message, subscribers) {
        console.log("Reloading...");
        window.location.reload(true);
    };
    MessageDispatcher.prototype.onMessage = function (message) {
        var data = JSON.parse(message.data);
        var msg_type = data.type;
        var msg_data = data.data;
        console.log("Incoming message", msg_type, msg_data);
        var events = (this.VIRTUAL_DEPENDENCIES[msg_type] || []).concat([msg_type]);
        events.forEach(function(evt) {
            if (this.subscribers[evt]) {
                this[this.DISPATCHERS[evt]](msg_type, msg_data, this.subscribers[evt]);
            }
        }.bind(this));
    };
    MessageDispatcher.prototype.subscribe = function (msg_type, callback) {
        if (!this.subscribers[msg_type]) {
            this.subscribers[msg_type] = [];
        }
        this.subscribers[msg_type].push(callback);
    };
    return MessageDispatcher;
})();

var message_dispatcher = new MessageDispatcher();
