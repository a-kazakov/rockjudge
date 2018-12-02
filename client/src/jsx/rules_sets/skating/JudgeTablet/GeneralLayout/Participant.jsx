import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

export default class Participant extends React.Component {
    static propTypes = {
        layoutClass: PT.func.isRequired,
        run: PT.object.isRequired,
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleScoreUpdate = (key, value) => {
        if (this.props.score.confirmed) {
            return;
        }
        let score_data = {};
        score_data[key] = value;
        this.props.onScoreUpdate(this.props.score.id, score_data);
    };

    renderScoringLayout() {
        if (this.props.score == null) {
            return (
                <div className="not-performing">
                    { _("tablet.global.no_score") }
                </div>
            );
        }
        const score_data = this.props.score.data;
        const ScoringComponent = this.props.layoutClass;
        return (
            <ScoringComponent
                readOnly={ this.props.score.confirmed }
                run={ this.props.run }
                score={ this.props.score }
                scoreData={ score_data }
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
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
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