import { Api, React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import getScoringType from "common/getScoringType";

import HeadJudgeLayout from "./HeadJudgeLayout";
import JazzGroupLayout from "./JazzGroupLayout";
import TechJudgeLayout from "./TechJudgeLayout";
import CoupleLayout from "./CoupleLayout";
import FreestyleGroupLayout from "./FreestyleGroupLayout";
import HiphopGroupLayout from "./HiphopGroupLayout";
import ClGroupLayout from "./ClGroupLayout";
import ClStuntLayout from "./ClStuntLayout";

export default class JudgeTablet extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static LAYOUTS = {
        jazz_group: JazzGroupLayout,
        freestyle_group: FreestyleGroupLayout,
        hiphop_group: HiphopGroupLayout,
        couple: CoupleLayout,
        cl_group: ClGroupLayout,
        cl_stunt: ClStuntLayout,
        head: HeadJudgeLayout,
        tech: TechJudgeLayout,
    };

    handleScoreUpdate = (score_id, score_data) => {
        const data = {
            data: score_data,
        };
        Api("model/update", {
            model_name: "Score",
            model_id: score_id,
            data: data,
        })
            .setPendingMutation(this.props.tour.global_storage, "Score", score_id, data)
            .send();
    };
    handleScoreConfirm = score_id => {
        const data = { confirmed: true };
        Api("model/update", {
            model_name: "Score",
            model_id: score_id,
            data,
        })
            .setPendingMutation(this.props.tour.global_storage, "Score", score_id, data)
            .send();
    };

    render() {
        const scoring_type = getScoringType(
            this.props.disciplineJudge.role,
            this.props.tour.scoring_system_name,
        );
        if (scoring_type == null) {
            return (
                <div className="cheerleading-JudgeTablet">
                    <div className="error-message">
                        {_("tablet.global.wrong_judge_role")}
                    </div>
                </div>
            );
        }
        let LayoutClass = JudgeTablet.LAYOUTS[scoring_type];
        if (LayoutClass == null) {
            return <div>Not implemented!</div>;
        }
        return (
            <div className="cheerleading-JudgeTablet">
                <LayoutClass
                    disciplineJudge={this.props.disciplineJudge}
                    tour={this.props.tour}
                    onScoreConfirm={this.handleScoreConfirm}
                    onScoreUpdate={this.handleScoreUpdate}
                />
            </div>
        );
    }
}
