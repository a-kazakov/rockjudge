export default function makeResultsTable(tour) {
    // Build runs index
    let runs_index = new Map();
    for (const run of tour.runs) {
        runs_index.set(run.id, run);
    }
    // Merge results
    const result = tour.results.map(row => ({
        place: row.place,
        advances: row.advances,
        additional_data: row.additional_data,
        run: runs_index.get(row.run_id),
    }));
    return result;
}
