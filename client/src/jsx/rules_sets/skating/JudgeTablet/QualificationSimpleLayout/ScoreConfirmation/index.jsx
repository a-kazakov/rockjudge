import _ from "l10n";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import { Api } from "HostModules";

import HeatsTables from "./HeatsTables";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
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

    handleConfirm = () => {
        Api("tour.confirm_all", {
            discipline_judge_id: this.props.disciplineJudge.id,
            tour_id: this.props.tour.id,
        })
            .send();
    };

    renderCantConfirmMessage(can_confirm, crosses) {
        if (can_confirm) {
            return null;
        }
        return (
            <div className="cant-confirm">
                { _("tablet.dance_judge.cant_confirm", crosses, this.props.tour.num_advances) }
            </div>
        )
    }
    render() {
        const scores = this.props.tour.runs
            .filter(run => run.status === "OK")
            .map(run => run.scores.find(score => score?.discipline_judge_id === this.props.disciplineJudge.id))
            .filter(score => score);  // Case if score not found
        const confirmed = scores.every(score => score.confirmed);
        const crosses = scores.filter(score => score.data.raw_data.cross).length;
        const can_confirm = confirmed || crosses === this.props.tour.num_advances;
        return (
            <div className="body score-confirmation">
                <h2>
                    { _("tablet.dance_judge.confirmation_page") }
                </h2>
                <div className="spacer" />
                <HeatsTables
                    disciplineJudge={ this.props.disciplineJudge }
                    tour={ this.props.tour }
                />
                { this.renderCantConfirmMessage(can_confirm, crosses) }
                <ConfirmationButton
                    canConfirm={ can_confirm }
                    confirmed={ confirmed }
                    onConfirm={ this.handleConfirm }
                />
            </div>
        );
    }
}
