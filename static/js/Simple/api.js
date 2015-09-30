var Api = {
    _call_method: function(method, data, callback) {
        $.ajax({
            url: "/api",
            method: "post",
            dataType: "json",
            data: {
                request: JSON.stringify({
                    method: method,
                    data: data
                })
            },
            success: callback,
            error: function(xhr, status, err) {
                alert("API ERROR!");
                console.error(xhr, status, err.toString());
            }
        });
    },

    set_judge_score: function(run_id, judge_id, score, callback) {
        Api._call_method("set_judge_score", {
            "run_id": run_id,
            "judge_id": judge_id,
            "score": score
        }, callback);
    },

    get_judge_score: function(run_id, judge_id, callback) {
        Api._call_method("get_judge_score", {
            "run_id": run_id,
            "judge_id": judge_id
        }, callback);
    },

    get_run: function(run_id, callback) {
        Api._call_method("get_run", {
            "run_id": run_id
        }, callback);
    },

    set_run_heat: function(run_id, heat, callback) {
        Api._call_method("set_run_heat", {
            "run_id": run_id,
            "heat": heat
        }, callback);
    },

    get_active_tour: function(callback) {
        Api._call_method("get_active_tour", {}, callback);
    },

    get_tour: function(tour_id, callback) {
        Api._call_method("get_tour", {
            "tour_id": tour_id
        }, callback);
    },

    shuffle_heats: function(tour_id, callback) {
        Api._call_method("shuffle_heats", {
            "tour_id": tour_id
        }, callback);
    },

    get_competition: function(competition_id, callback) {
        Api._call_method("get_competition", {
            "competition_id": competition_id
        }, callback);
    },

    init_tour: function(tour_id, callback) {
        Api._call_method("init_tour", {
            "tour_id": tour_id
        }, callback);
    },

    finalize_tour: function(tour_id, callback) {
        Api._call_method("finalize_tour", {
            "tour_id": tour_id
        }, callback);
    },

    start_tour: function(tour_id, callback) {
        Api._call_method("start_tour", {
            "tour_id": tour_id
        }, callback);
    },

    stop_tour: function(tour_id, callback) {
        Api._call_method("stop_tour", {
            "tour_id": tour_id
        }, callback);
    },

    get_judge: function(judge_id, callback) {
        Api._call_method("get_judge", {
            "judge_id": judge_id
        }, callback);
    },

    get_judges: function(competition_id, callback) {
        Api._call_method("get_judges", {
            "competition_id": competition_id
        }, callback);
    },

    get_tour_results: function(tour_id, callback) {
        Api._call_method("get_tour_results", {
            "tour_id": tour_id,
        }, callback);
    }
};
