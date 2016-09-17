import RendererRow from "./RendererRow";

export default class Renderer extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            table: PT.arrayOf(
                PT.shape({
                    tour: PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired,
                    run: PT.shape({
                        participant: PT.object.isRequired,
                    }).isRequired,
                    place: PT.number,
                }).isRequired,
            ).isRequired,
            value: PT.number,
            onPositionSelect: PT.func.isRequired,
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
            <div className="tour-name" key={ `H${next_row.run.id}` }>
                { next_row.tour.name }
            </div>
        );
    }
    renderRow(row, position) {
        return (
            <RendererRow
                key={ `R${row.run.id}` }
                participant={ row.run.participant }
                place={ row.place }
                position={ position }
                selected={ this.props.value !== null && position >= this.props.value }
                onPositionSelect={ this.props.onPositionSelect }
            />
        );
    }
    renderRows() {
        let result = [];
        const table = this.props.table;
        for (let i = table.length - 1; i >= 0; --i) {
            const header = this.renderRowHeader(table[i + 1], table[i]);
            if (header) {
                result.push(header);
            }
            result.push(this.renderRow(table[i], i));
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

Renderer.displayName = "ScreenOperator_DisciplinePlaceControls_DisciplineSelector_Renderer";
