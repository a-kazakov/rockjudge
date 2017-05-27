import LoadingComponent from "common/server/LoadingComponent";

import Loader from "common/components/Loader";

import makeDisciplineResultsTable from "common/makeDisciplineResultsTable";

import Row from "./Row";

export default class ResultsRenderer extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineId: PT.number.isRequired,
        };
    }

    CLASS_ID = "presenter_tablet_results";
    API_MODELS = {
        discipline: {
            model_type: "Discipline",
            model_id_getter: props => props.disciplineId,
            schema: {
                results: {},
                discipline_judges: {
                    judge: {},
                },
                tours: {
                    runs: {
                        participant: {
                            club: {},
                        },
                    },
                },
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            discipline: null,
        };
    }

    renderRowHeader(prev_row, next_row) {
        if (
            typeof prev_row !== "undefined" &&
            prev_row.tour.id === next_row.tour.id
        ) {
            return null;
        }
        return (
            <div
                className="tour-name"
                key={ `H${next_row.run.id}` }
            >
                { next_row.tour.name }
            </div>
        );
    }
    renderRow(row) {
        return (
            <Row
                key={ `R${row.run.id}` }
                participant={ row.run.participant }
                place={ row.place }
            />
        );
    }
    renderRows() {
        const table = makeDisciplineResultsTable(this.state.discipline);
        let result = [];
        for (let i = table.length - 1; i >= 0; --i) {
            const header = this.renderRowHeader(table[i + 1], table[i]);
            if (header) {
                result.push(header);
            }
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        if (this.state.discipline === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="discipline-results">
                { this.renderRows() }
            </div>
        );
    }
}

ResultsRenderer.displayName = "PresenterTablet_ResultsPage_ResultsRenderer";
