export default function makeTourResultsTable(discipline) {
    // Build runs index
    let tours_index = new Map();
    let runs_index = new Map();
    for (const tour of discipline.tours) {
        for (const run of tour.runs) {
            tours_index.set(run.id, tour)
            runs_index.set(run.id, run);
        }
    }
    // Merge results
    const result = discipline.results.map(row => ({
        place: row.place,
        tour: tours_index.get(row.run_id),
        run: runs_index.get(row.run_id),
    }));
    return result;
}
