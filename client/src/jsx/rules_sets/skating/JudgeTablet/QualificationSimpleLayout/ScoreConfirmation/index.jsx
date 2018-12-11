import { Api, React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import HeatsTables from "./HeatsTables";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    handleConfirm = () => {
        Api("tour/confirm_judge", {
            discipline_judge_id: this.props.disciplineJudge.id,
            tour_id: this.props.tour.id,
        }).send();
    };

    renderCantConfirmMessage(can_confirm, crosses) {
        if (can_confirm) {
            return null;
        }
        return (
            <div className="cant-confirm">
                {_(
                    "tablet.dance_judge.cant_confirm",
                    crosses,
                    this.props.tour.num_advances,
                )}
            </div>
        );
    }
    render() {
        const scores = this.props.tour.runs
            .filter(run => run.status === "OK")
            .map(run =>
                run.scores.find(
                    score =>
                        score?.discipline_judge_id === this.props.disciplineJudge.id,
                ),
            )
            .filter(score => score != null); // Case if score not found
        const confirmed = scores.every(score => score.confirmed);
        const crosses = scores.filter(score => score.data.cross).length;
        const can_confirm = confirmed || crosses === this.props.tour.num_advances;
        return (
            <div className="body score-confirmation">
                <h2>{_("tablet.dance_judge.confirmation_page")}</h2>
                <div className="spacer" />
                <HeatsTables
                    disciplineJudge={this.props.disciplineJudge}
                    tour={this.props.tour}
                />
                {this.renderCantConfirmMessage(can_confirm, crosses)}
                <ConfirmationButton
                    canConfirm={can_confirm}
                    confirmed={confirmed}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}
