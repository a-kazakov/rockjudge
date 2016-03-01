var ActiveTourWatcher = (function () {
    function ActiveTourWatcher(rockjudge, competition_id, screen_id) {
        this.inited = false;
        this.current_tour_id = null;
        this.TOUR_SCHEMA = {
            discipline: {
                discipline_judges: {},
            },
            runs: {
                participant: {
                    club: {},
                },
                scores: {},
            },
        };
        this.competition_id = competition_id;
        this.rockjudge = rockjudge;
        this.screen_id = screen_id;
    }
    ActiveTourWatcher.prototype.init = function () {
        this.rockjudge.message_dispatcher.addListener("db_update", this.dispatchUpdate.bind(this));
        this.rockjudge.message_dispatcher.addListener("reload_data", this.init.bind(this));
        this.rockjudge.api("competition.get", { competition_id: this.competition_id, children: {} })
            .addToDB("Competition", this.competition_id)
            .onSuccess(this.dispatchInit.bind(this))
            .onError(console.error.bind(console))
            .send();
    };
    ActiveTourWatcher.prototype.getCurrentCompetition = function () {
        var competition = this.rockjudge.storage.get("Competition").by_id(this.competition_id);
        if (!competition) {
            return null;
        }
        return competition.serialize({});
    };
    ActiveTourWatcher.prototype.getTourFromStorage = function (tour_id) {
        var tour = this.rockjudge.storage.get("Tour").by_id(tour_id);
        if (!tour) {
            return null;
        }
        return tour.serialize(this.TOUR_SCHEMA);
    };
    ActiveTourWatcher.prototype.fetchActiveTour = function (callback) {
        var _this = this;
        var competition = this.getCurrentCompetition();
        if (competition === null) {
            return callback(null, null);
        }
        if (competition.screen_data.screen_id !== this.screen_id) {
            return callback(null, null);
        }
        var tour_id = competition.screen_data.controls_state.tour_id;
        if (tour_id === null) {
            return callback(null, null);
        }
        if (this.current_tour_id === tour_id) {
            return callback(this.getTourFromStorage(this.current_tour_id), competition.screen_data.controls_state.heat || null);
        }
        this.rockjudge.api("tour.get", { tour_id: tour_id, children: this.TOUR_SCHEMA })
            .addToDB("Tour", tour_id)
            .onSuccess(function () {
            _this.current_tour_id = tour_id;
            var tour = _this.getTourFromStorage(tour_id);
            callback(tour, competition.screen_data.controls_state.heat || null);
        })
            .send();
    };
    ActiveTourWatcher.prototype.dispatchUpdate = function () {
        if (!this.inited) {
            return;
        }
        this.fetchActiveTour(this.on_update);
    };
    ActiveTourWatcher.prototype.dispatchInit = function () {
        this.inited = true;
        this.on_ready();
        this.dispatchUpdate();
    };
    ActiveTourWatcher.prototype.onReady = function (listener) {
        this.on_ready = listener;
    };
    ActiveTourWatcher.prototype.onUpdate = function (listener) {
        this.on_update = listener;
    };
    return ActiveTourWatcher;
}());
