import Row from "./Row";

export default class ResultsRenderer extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            table: PT.arrayOf(
                PT.shape({
                    place: PT.number,
                    run: PT.shape({
                        id: PT.number.isRequired,
                        participant: PT.object.isRequired,
                    }).isRequired,
                }).isRequired
            ).isRequired,
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
        let result = [];
        for (let i = this.props.table.length - 1; i >= 0; --i) {
            const header = this.renderRowHeader(this.props.table[i + 1], this.props.table[i]);
            if (header) {
                result.push(header);
            }
            result.push(this.renderRow(this.props.table[i]));
        }
        return result;
    }
    render() {
        return (
            <div>
                { this.renderRows() }
            </div>
        );
    }
}

ResultsRenderer.displayName = "PresenterTablet_ResultsPage_ResultsRenderer";
