import HeatsTableItem from "./HeatsTableItem";

export default class HeatsTables extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                num_advances: PT.number.isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                        scores: PT.arrayOf(
                            PT.shape({
                                discipline_judge_id: PT.number.isRequired,
                            }).isRequired,
                        ).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
        };
    }

    getHeats() {
        let buffer = [];
        let result = [];
        for (const run of this.props.tour.runs) {
            if (buffer.length > 0 && buffer[0].heat !== run.heat) {
                result.push(buffer);
                buffer = [];
            }
            buffer.push(run);
        }
        if (buffer.length > 0) {
            result.push(buffer);
        }
        return result;
    }
    render() {
        return (
            <div className="heats-tables">
                { this.getHeats().map((heat_runs, idx) =>
                    <HeatsTableItem
                        disciplineJudge={ this.props.disciplineJudge }
                        heatRuns={ heat_runs }
                        key={ idx }
                    />
                ) }
            </div>
        )
    }
}
