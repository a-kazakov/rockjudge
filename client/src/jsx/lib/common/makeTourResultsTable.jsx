const notNull = (x) => x != null;

export default function makeTourResultsTable(tour) {
    const tour_result = tour.results;
    return {
        tour: tour,
        tour_result: tour_result,
        rows: tour_result.results_order.map(run_id => {
            const run = tour.global_storage.get("Run", run_id);
            if (!run) {
                return null;
            }
            const run_result = tour_result.runs_results[run_id];
            let scores = {};
            for (const score of run.scores) {
                scores[score.discipline_judge_id] = {
                    score: score,
                    result: tour_result.scores_results[score.id],
                };
            }
            return {run, run_result, scores};
        }).filter(notNull),
    };
}
