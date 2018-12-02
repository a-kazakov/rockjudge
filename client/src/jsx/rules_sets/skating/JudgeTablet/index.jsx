import {Api, React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import getScoringType from "common/getScoringType";

import FinalSimpleLayout from "./FinalSimpleLayout";
import HeadJudgeLayout from "./HeadJudgeLayout";
import QualificationSimpleLayout from "./QualificationSimpleLayout";
import Final3dLayout from "./Final3dLayout";

export default class JudgeTablet extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static LAYOUTS = {
        "qualification_simple": QualificationSimpleLayout,
        "final_simple": FinalSimpleLayout,
        "final_3d": Final3dLayout,
        "head": HeadJudgeLayout,
    };

    handleScoreUpdate = (score_id, score_data) => {
        const data = {
            data: score_data,
        };
        Api("model/update", {
            model_name: "Score",
            model_id: score_id,
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

    render() {
        const scoring_type = getScoringType(
            this.props.disciplineJudge.role,
            this.props.tour.scoring_system_name,
        );
        if (scoring_type == null) {
            return (
                <div className="skating-JudgeTablet">
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
            <div className="skating-JudgeTablet">
                <LayoutClass
                    disciplineJudge={ this.props.disciplineJudge }
                    tour={ this.props.tour }
                    onHeatConfirm={ this.handleHeatConfirm }
                    onScoreUpdate={ this.handleScoreUpdate }
                />
            </div>
        );
    }
}