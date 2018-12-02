import {Api, React} from "HostModules";

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
import TechLayout from "./TechLayout";

export default class JudgeTablet extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static LAYOUTS = {
        "acro": AcrobaticsLayout,
        "dance": DanceLayout,
        "dance_extended": DanceExtendedLayout,
        "formation": FormationLayout,
        "formation_simplified": FormationSimplifiedLayout,
        "simplified": SimplifiedLayout,
        "solo": SoloLayout,
        "head": HeadJudgeLayout,
        "tech": TechLayout,
    };

    handleScoreUpdate = (score_id, score_data) => {
        const data = {
            model_id: score_id,
            data: score_data,
        };
        Api("model/update", {
            model_name: "Score",
            data: data,
        }).send();
    };
    handleHeatConfirm = (heat) => {
        Api("tour/confirm_heat", {
            tour_id: this.props.tour.id,
            discipline_judge_id: this.props.disciplineJudge.id,
            heat: heat,
        }).send();
    };
    handleScoreConfirm = (score_id) => {
        const data = {
            confirmed: true,
        };
        Api("model/update", {
            model_name: "Score",
            model_id: score_id,
            data: data,
        }).send();
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
                        { _("tablet.global.wrong_judge_role") }
                    </div>
                </div>
            );
        }
        let LayoutClass = JudgeTablet.LAYOUTS[scoring_type];
        if (!LayoutClass) {
            return (
                <div>Not implemented!</div>
            );
        }
        return (
            <div className="vftsarr-JudgeTablet">
                <LayoutClass
                    disciplineJudge={ this.props.disciplineJudge }
                    tour={ this.props.tour }
                    onHeatConfirm={ this.handleHeatConfirm }
                    onScoreConfirm={ this.handleScoreConfirm }
                    onScoreUpdate={ this.handleScoreUpdate }
                />
            </div>
        );
    }
}
