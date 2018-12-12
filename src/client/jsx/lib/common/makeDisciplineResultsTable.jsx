export default function makeDisciplineResultsTable(discipline) {
    // Build runs index
    const global_storage = discipline.global_storage;
    return discipline.results.rows.map(row => ({
        run: global_storage.get("Run", row.run_id),
        place: row.place,
    }));
}
