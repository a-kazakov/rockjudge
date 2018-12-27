import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import LineJudgesScores from "./LineJudgesScores";
import StatusSwitch from "./StatusSwitch";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    render() {
        const { score } = this.props;
        if (score == null) {
            return <div className="not-performing">{_("tablet.global.no_score")}</div>;
        }
        const { run } = score;
        if (run.status !== "OK") {
            return <StatusSwitch run={this.props.score.run} />;
        }
        return (
            <>
                <div className="spacer" />
                <LineJudgesScores
                    disciplineJudges={
                        this.props.score.run.tour.discipline.discipline_judges
                    }
                    run={this.props.score.run}
                />
                <StatusSwitch run={this.props.score.run} />
            </>
        );
    }
}
