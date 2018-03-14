import _ from "l10n";

export default class Participant extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            layoutClass: PT.func.isRequired,
            run: PT.shape({
                status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                participant: PT.shape({
                    number: PT.number.isRequired,
                    name: PT.string.isRequired,
                    sportsmen: PT.array.isRequired,
                }).isRequired,
            }).isRequired,
            score: PT.shape({
                id: PT.number.isRequired,
                confirmed: PT.bool.isRequired,
                data: PT.shape({
                    raw_data: PT.object.isRequired,
                }).isRequired,
                discipline_judge_id: PT.number.isRequired,
            }),
            tour: PT.object.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleScoreUpdate = (key, value, force=false) => {
        if (this.props.score.confirmed && !force) {
            return;
        }
        const score_data = key === null
            ? value
            : {[key]: value};
        this.props.onScoreUpdate(this.props.score.id, score_data, force);
    };

    renderScoringLayout() {
        if (this.props.score === null) {
            return (
                <div className="not-performing">
                    { _("tablet.global.no_score") }
                </div>
            );
        }
        const score_data = this.props.score.data.raw_data;
        const ScoringComponent = this.props.layoutClass;
        return (
            <ScoringComponent
                readOnly={ this.props.score.confirmed }
                run={ this.props.run }
                score={ this.props.score }
                scoreData={ score_data }
                tour={ this.props.tour }
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
