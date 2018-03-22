import _ from "l10n";

import makeTourResultsTable from "common/makeTourResultsTable";
import CustomTable from "common/CustomTable";

export default class ResultsTable1 extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
                next_tour_id: PT.number,
                results: PT.arrayOf(
                    PT.shape({
                        place: PT.number,
                        advances: PT.bool.isRequired,
                        run_id: PT.number.isRequired,
                        additional_data: PT.object.isRequired,
                    }).isRequired,
                ).isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    }).isRequired,
                ).isRequired,
                discipline: PT.shape({
                    discipline_judges: PT.arrayOf(
                        PT.shape({
                            role: PT.string.isRequired,
                        }).isRequired
                    ).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    static getRowStatus(row) {
        if (!row) {
            return "none";
        }
        if (row.run.status !== "OK") {
            return row.run.status;
        }
        return row.advances ? "advanced" : "not_advanced";
    }

    setupCache() {
        this.is_final = this.props.tour.scoring_system_name.includes("final");
        this.show_total_score = !this.is_final;
        this.has_next_tour = this.props.tour.next_tour_id !== null;
        this.table = makeTourResultsTable(this.props.tour);
    }

    getCols() {
        let result = [{
            "key": "place",
            "title":  _("results.labels.place"),
            "textAlign": "center",
            "lines": ["right"],
            "width": 7,
        }, {
            "key": "number",
            "title":  _("results.labels.number"),
            "textAlign": "center",
            "fontWeight": "bold",
            "width": 6,
        }, {
            "key": "participant_name",
            "title":  _("results.labels.participant_name"),
            "width": 35,
        }, {
            "key": "participant_club",
            "title":  _("results.labels.participant_club"),
        }];
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
        for (let idx = 0; idx < this.table.length; ++idx) {
            const adv_text = this.getAdvancesRow(this.table[idx - 1], this.table[idx]);
            if (adv_text !== null) {
                result.push({
                    _type: "section_header",
                    "title": adv_text,
                })
            }
            const row = this.table[idx];
            result.push({
                "run_id": row.run.id,
                "place": row.place,
                "number": row.run.participant.number,
                "participant_name": row.run.participant.name,
                "participant_club": row.run.participant.club.name,
                "total_score": row.run.total_score,
            });
        }
        return result;
    }

    render() {
        this.setupCache();
        return (
            <div className="ResultsTable1">
                <CustomTable
                    cols={ this.getCols() }
                    fontSize="12pt"
                    rowKey="run_id"
                    rows={ this.getRows() }
                />
            </div>
        );
    }
}


