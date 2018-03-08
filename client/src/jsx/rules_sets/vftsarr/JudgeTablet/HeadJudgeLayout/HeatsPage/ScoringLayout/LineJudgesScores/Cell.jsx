const SCALE_SIZES = {
    "dance_figs": 25,
    "composition": 20,
    "figures": 20,
    "mistakes": 30,
};

export default class Cell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            criteria: PT.string.isRequired,
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            medians: PT.instanceOf(Map).isRequired,
            run: PT.shape({
                acrobatics: PT.arrayOf(
                    PT.shape({
                        score: PT.number.isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            score: PT.shape({
                confirmed: PT.bool.isRequired,
                data: PT.shape({
                    raw_data: PT.object.isRequired,
                    criterias_values: PT.object.isRequired,
                }).isRequired,
            }).isRequired,
            table: PT.instanceOf(Map).isRequired,
        };
    }

    static formatNumber(number) {
        if (number === null) {
            return "—";
        }
        return number.toFixed(5).replace(/0+$/, "").replace(/\.$/, "");
    }

    getClassName(cell_data) {
        if (!cell_data.all_set) {
            return "";
        }
        const median = this.props.medians.get(this.props.criteria);
        let scale_size = SCALE_SIZES[this.props.criteria] || 10;
        if (this.props.criteria.length === 2 && this.props.criteria[0] === "a") {
            const acro_idx = parseInt(this.props.criteria.slice(1)) - 1;
            const acro_score = this.props.run.acrobatics[acro_idx].score;
            scale_size = Math.max(0.5, acro_score)
        }
        const diff = Math.abs(median - cell_data.criteria_value) / scale_size - 1e-5;
        let result = diff < 0.15
            ? "green"
            : diff < 0.3
                ? "yellow"
                : "red";
        if (this.props.score.confirmed) {
            result += " confirmed";
        }
        return result;
    }

    render() {
        const key = `${this.props.disciplineJudge.id}/${this.props.criteria}`;
        if (!this.props.table.has(key)) {
            return (
                <td className="no-score" />
            );
        }
        const cell_data = this.props.table.get(key);
        return (
            <td className={ this.getClassName(cell_data) }>
                { cell_data.components.map(([comp, value]) =>
                    <div key={ comp }>
                        { this.constructor.formatNumber(value) }
                    </div>
                ) }
            </td>
        );
    }
}
