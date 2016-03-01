var ActiveTourResultsWatcher = (function () {
    function ActiveTourResultsWatcher(rockjudge, competition_id, screen_id) {
        this.inited = false;
        this.current_tour_id = null;
        this.current_tour = null;
        this.current_results = null;
        this.results_tour_id = null;
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
    ActiveTourResultsWatcher.prototype.init = function () {
        this.rockjudge.message_dispatcher.addListener("db_update", this.dispatchUpdate.bind(this));
        this.rockjudge.message_dispatcher.addListener("reload_data", this.init.bind(this));
        this.rockjudge.message_dispatcher.addListener("tour_results_changed", this.dispatchResultsUpdate.bind(this));
        this.rockjudge.api("competition.get", { competition_id: this.competition_id, children: {} })
            .addToDB("Competition", this.competition_id)
            .onSuccess(this.dispatchInit.bind(this))
            .onError(console.error.bind(console))
            .send();
    };
    ActiveTourResultsWatcher.prototype.getCurrentCompetition = function () {
        var competition = this.rockjudge.storage.get("Competition").by_id(this.competition_id);
        if (!competition) {
            return null;
        }
        return competition.serialize({});
    };
    ActiveTourResultsWatcher.prototype.getTourFromStorage = function (tour_id) {
        var tour = this.rockjudge.storage.get("Tour").by_id(tour_id);
        if (!tour) {
            return null;
        }
        return tour.serialize(this.TOUR_SCHEMA);
    };
    ActiveTourResultsWatcher.prototype.fetchActiveTour = function (callback) {
        var _this = this;
        var competition = this.getCurrentCompetition();
        if (competition === null) {
            return callback(null);
        }
        if (competition.screen_data.screen_id !== this.screen_id) {
            return callback(null);
        }
        var tour_id = competition.screen_data.controls_state.tour_id;
        if (tour_id === null) {
            return callback(null);
        }
        if (this.current_tour_id === tour_id) {
            return callback(this.getTourFromStorage(this.current_tour_id), competition.screen_data.controls_state.heat || null);
        }
        this.rockjudge.api("tour.get", { tour_id: tour_id, children: this.TOUR_SCHEMA })
            .addToDB("Tour", tour_id)
            .onSuccess(function () {
            _this.current_tour_id = tour_id;
            _this.loadTourResults();
            var tour = _this.getTourFromStorage(tour_id);
            callback(tour, competition.screen_data.controls_state.heat || null);
        })
            .send();
    };
    ActiveTourResultsWatcher.prototype.loadTourResults = function () {
        var _this = this;
        var tour_id = this.current_tour_id;
        this.rockjudge.api("tour.get_results", { tour_id: tour_id })
            .onSuccess(function (results) {
            _this.current_results = results;
            _this.results_tour_id = tour_id;
            _this.sendUpdate();
        })
            .send();
    };
    ActiveTourResultsWatcher.prototype.dispatchResultsUpdate = function (message) {
        if (!message || message.tour_id == this.current_tour_id) {
            this.loadTourResults();
        }
    };
    ActiveTourResultsWatcher.prototype.dispatchUpdate = function () {
        var _this = this;
        if (!this.inited) {
            return;
        }
        this.fetchActiveTour(function (tour) {
            _this.current_tour = tour;
            _this.sendUpdate();
        });
    };
    ActiveTourResultsWatcher.prototype.dispatchInit = function () {
        this.inited = true;
        this.on_ready();
        this.dispatchUpdate();
    };
    ActiveTourResultsWatcher.prototype.sendUpdate = function () {
        if (this.current_tour_id == this.results_tour_id) {
            this.on_update(this.current_tour, this.current_results);
        }
    };
    ActiveTourResultsWatcher.prototype.onReady = function (listener) {
        this.on_ready = listener;
    };
    ActiveTourResultsWatcher.prototype.onUpdate = function (listener) {
        this.on_update = listener;
    };
    return ActiveTourResultsWatcher;
}());
