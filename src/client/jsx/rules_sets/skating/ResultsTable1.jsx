import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import CustomTable from "common/CustomTable";
import lastOf from "common/tools/lastOf";

export default class ResultsTable1 extends React.Component {
    static propTypes = {
        computedTour: PT.shape({
            tour: PT.object.isRequired,
            tour_result: PT.object.isRequired,
            rows: PT.arrayOf(
                PT.shape({
                    run: PT.object.isRequired,
                    run_result: PT.object.isRequired,
                    scores: PT.object.isRequired,
                }).isRequired,
            ).isRequired,
        }).isRequired,
    };

    static getRowStatus(row) {
        if (!row) {
            return "none";
        }
        if (row.run.status !== "OK") {
            return row.run.status;
        }
        return row.run_result.advanced ? "advanced" : "not_advanced";
    }

    setupCache() {
        const { tour } = this.props.computedTour;
        const all_tours = tour.discipline.tours;
        this.is_final = tour.scoring_system_name.includes("final");
        this.show_total_score = !this.is_final;
        this.has_next_tour = lastOf(all_tours).id !== tour.id;
    }

    getCols() {
        let result = [
            {
                key: "place",
                title: _("results.labels.place"),
                textAlign: "center",
                lines: ["right"],
                width: 7,
            },
            {
                key: "number",
                title: _("results.labels.number"),
                textAlign: "center",
                fontWeight: "bold",
                width: 6,
            },
            {
                key: "participant_name",
                title: _("results.labels.participant_name"),
                width: "flex",
            },
            {
                key: "participant_club",
                title: _("results.labels.participant_club"),
                width: "flex",
            },
        ];
        if (this.show_total_score) {
            result.push({
                key: "total_score",
                title: _("results.labels.total_score"),
                width: 10,
            });
        }
        return result;
    }

    getAdvancesRow(prev_row, next_row) {
        const prev_status = this.constructor.getRowStatus(prev_row);
        const next_status = this.constructor.getRowStatus(next_row);
        if (prev_status === next_status) {
            return null;
        }
        if (!["NP", "DQ"].includes(next_status) && !this.has_next_tour) {
            return null;
        }
        return _(`results.headers.participants_${next_status}`);
    }

    getRows() {
        let result = [];
        const { rows } = this.props.computedTour;
        for (let idx = 0; idx < rows.length; ++idx) {
            const row = rows[idx];
            const prev_row = rows[idx - 1];
            const adv_text = this.getAdvancesRow(prev_row, row);
            if (adv_text != null) {
                result.push({
                    _type: "section_header",
                    title: adv_text,
                });
            }
            result.push({
                run_id: row.run.id,
                place: row.run_result.place,
                number: row.run.participant.number,
                participant_name: row.run.participant.name,
                participant_club: row.run.participant.club.name,
                total_score: row.run_result.extra_data.user_score,
            });
        }
        return result;
    }

    render() {
        this.setupCache();
        return (
            <div className="ResultsTable1">
                <CustomTable
                    cols={this.getCols()}
                    fontSize="12pt"
                    rowKey="run_id"
                    rows={this.getRows()}
                />
            </div>
        );
    }
}
