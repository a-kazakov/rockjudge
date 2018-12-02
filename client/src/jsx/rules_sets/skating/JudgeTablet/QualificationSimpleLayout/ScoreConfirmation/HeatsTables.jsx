import {React} from "HostModules";

import PT from "prop-types";
import HeatsTableItem from "./HeatsTableItem";

export default class HeatsTables extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

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