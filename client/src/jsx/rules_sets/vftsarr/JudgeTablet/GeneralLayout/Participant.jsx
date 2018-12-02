import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

export default class Participant extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        layoutClass: PT.func.isRequired,
        run: PT.object.isRequired,
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleScoreUpdate = (key, value, force=false) => {
        if (this.props.score.confirmed && !force) {
            return;
        }
        const score_data = key == null
            ? value
            : {[key]: value};
        this.props.onScoreUpdate(this.props.score.id, score_data, force);
    };

    renderScoringLayout() {
        if (this.props.score == null) {
            return (
                <div className="not-performing">
                    { _("tablet.global.no_score") }
                </div>
            );
        }
        const ScoringComponent = this.props.layoutClass;
        return (
            <ScoringComponent
                score={ this.props.score }
                onScoreUpdate={ this.handleScoreUpdate }
            />
        );
    }
    renderNotOkStatusMessage() {
        return (
            <div className="not-performing">
                { this.props.run.status === "NP"
                    ? _("tablet.global.not_performing")
                    : _("tablet.global.disqualified") }
            </div>
        );
    }
    render() {
        const participant = this.props.run.participant;
        const header = _("global.phrases.participant_n",
            participant.number,
            participant.name,
            participant.sportsmen.length,
        );
        return (
            <div className="layout-participant">
                <h2>
                    { header }
                </h2>
                { this.props.run.status === "OK"
                    ? this.renderScoringLayout()
                    : this.renderNotOkStatusMessage() }
            </div>
        );
    }
}
