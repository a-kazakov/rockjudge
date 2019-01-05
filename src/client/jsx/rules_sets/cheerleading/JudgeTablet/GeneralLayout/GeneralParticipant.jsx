import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

export default class GeneralParticipant extends React.Component {
    static propTypes = {
        alwaysRenderParticipantLayout: PT.bool,
        participantLayoutRenderer: PT.func.isRequired,
        score: PT.object,
        onScoreUpdate: PT.func.isRequired,
    };

    static defaultProps = {
        alwaysRenderParticipantLayout: false,
    };

    handleScoreUpdate = (key, value) => {
        if (this.props.score.confirmed) {
            return;
        }
        this.props.onScoreUpdate(
            this.props.score.id,
            key == null ? value : { [key]: value },
        );
    };

    renderScoringLayout() {
        const {
            score: _unused_1,
            onScoreUpdate: _unused_2,
            participantLayoutRenderer: Renderer,
            ...other_props
        } = this.props;
        return (
            <Renderer
                readOnly={this.props.score?.confirmed ?? true}
                score={this.props.score}
                onScoreUpdate={this.handleScoreUpdate}
                {...other_props}
            />
        );
    }
    renderNotOkStatusMessage() {
        return (
            <div className="not-performing">
                {this.props.score.run.status === "NP"
                    ? _("tablet.global.not_performing")
                    : _("tablet.global.disqualified")}
            </div>
        );
    }
    render() {
        const { score } = this.props;
        if (score == null) {
            return <div className="not-performing">{_("tablet.global.no_score")}</div>;
        }
        const { run } = score;
        return (
            <div className="layout-participant">
                {run.status === "OK" || this.props.alwaysRenderParticipantLayout
                    ? this.renderScoringLayout()
                    : this.renderNotOkStatusMessage()}
            </div>
        );
    }
}
