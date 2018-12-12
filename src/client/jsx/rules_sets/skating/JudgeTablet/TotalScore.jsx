import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

export default class TotalScore extends React.Component {
    static propTypes = {
        score: PT.shape({
            data: PT.shape({
                total_score: PT.number.isRequired,
            }).isRequired,
        }).isRequired,
    };

    render() {
        return (
            <div className="total-score">
                {_("tablet.global.total_score")}:{" "}
                {this.props.score.data.total_score.toFixed(3).replace(/\.?0*$/, "")}
            </div>
        );
    }
}
