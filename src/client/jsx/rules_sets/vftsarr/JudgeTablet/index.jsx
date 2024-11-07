import { Api, React } from "HostModules";

import getScoringType from "common/getScoringType";
import _ from "l10n";
import PT from "prop-types";
import AcrobaticsLayout from "./AcrobaticsLayout";
import DanceExtendedLayout from "./DanceExtendedLayout";
import DanceLayout from "./DanceLayout";
import FormationLayout from "./FormationLayout";
import FormationSimplifiedLayout from "./FormationSimplifiedLayout";
import HeadJudgeLayout from "./HeadJudgeLayout";
import SimplifiedLayout from "./SimplifiedLayout";
import SoloLayout from "./SoloLayout";
import SoloFinalLayout from "./SoloFinalLayout";
import TechLayout from "./TechLayout";

export default class JudgeTablet extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static LAYOUTS = {
        acro: AcrobaticsLayout,
        dance: DanceLayout,
        dance_extended: DanceExtendedLayout,
        formation: FormationLayout,
        formation_simplified: FormationSimplifiedLayout,
        simplified: SimplifiedLayout,
        solo: SoloLayout,
        solo_final: SoloFinalLayout,
        head: HeadJudgeLayout,
        tech: TechLayout,
    };

    handleScoreUpdate = (score_id, score_data, force_submit = false) => {
        const data = {
            force: force_submit,
            data: score_data,
        };
        Api("model/update", {
            model_name: "Score",
            model_id: score_id,
            data,
        })
            .setPendingMutation(this.props.tour.global_storage, "Score", score_id, {
                data: score_data,
            })
            .send();
    };
    handleHeatConfirm = heat => {
        const api = Api("tour/confirm_heat", {
            tour_id: this.props.tour.id,
            discipline_judge_id: this.props.disciplineJudge.id,
            heat: heat,
        });
        this.props.tour.runs
            .filter(run => run.heat === heat)
            .map(run =>
                run.scores.find(
                    score =>
                        score.discipline_judge_id === this.props.disciplineJudge.id,
                ),
            )
            .filter(score => score != null)
            .forEach(score =>
                api.setPendingMutation(
                    this.props.tour.global_storage,
                    "Score",
                    score.id,
                    { confirmed: true },
                ),
            );
        api.send();
    };
    handleScoreConfirm = score_id => {
        const data = {
            confirmed: true,
        };
        Api("model/update", {
            model_name: "Score",
            model_id: score_id,
            data: data,
        })
            .setPendingMutation(this.props.tour.global_storage, "Score", score_id, {
                confirmed: true,
            })
            .send();
    };

    render() {
        const scoring_type = getScoringType(
            this.props.disciplineJudge.role,
            this.props.tour.scoring_system_name,
        );
        if (scoring_type == null) {
            return (
                <div className="vftsarr-JudgeTablet">
                    <div className="error-message">
                        {_("tablet.global.wrong_judge_role")}
                    </div>
                </div>
            );
        }
        let LayoutClass = JudgeTablet.LAYOUTS[scoring_type];
        if (!LayoutClass) {
            return <div>Not implemented!</div>;
        }
        return (
            <div className="vftsarr-JudgeTablet">
                <LayoutClass
                    disciplineJudge={this.props.disciplineJudge}
                    tour={this.props.tour}
                    onHeatConfirm={this.handleHeatConfirm}
                    onScoreConfirm={this.handleScoreConfirm}
                    onScoreUpdate={this.handleScoreUpdate}
                />
            </div>
        );
    }
}
