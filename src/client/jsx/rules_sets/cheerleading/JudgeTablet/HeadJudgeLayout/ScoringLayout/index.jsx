import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import LineJudgesScores from "./LineJudgesScores";
import StatusSwitch from "./StatusSwitch";
import RunMetrics from "./RunMetrics";

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
        const { number, name, sportsmen } = score.run.participant;
        const header = _(
            "global.phrases.participant_n",
            number,
            name,
            sportsmen.length,
        );
        if (run.status !== "OK") {
            return (
                <div>
                    <div className="participant-header">
                        <div className="title">{header}</div>
                    </div>
                    <StatusSwitch run={this.props.score.run} />
                </div>
            );
        }
        return (
            <>
                <div className="participant-header">
                    <div className="title">{header}</div>
                </div>
                <div className="panes">
                    <div className="left-pane">
                        <LineJudgesScores
                            disciplineJudges={
                                this.props.score.run.tour.discipline.discipline_judges
                            }
                            run={this.props.score.run}
                        />
                    </div>
                    <div className="right-pane">
                        <StatusSwitch run={this.props.score.run} />
                        <br />
                        <RunMetrics run={run} tourResults={run.tour.results} />
                    </div>
                </div>
            </>
        );
    }
}
