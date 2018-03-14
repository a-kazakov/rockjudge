import _ from "l10n";

import getScoringType from "common/getScoringType";

import AcrobaticsLayout from "./AcrobaticsLayout";
import DanceLayout from "./DanceLayout";
import FormationLayout from "./FormationLayout";
import SimplifiedLayout from "./SimplifiedLayout";
import SoloLayout from "./SoloLayout";
import HeadJudgeLayout from "./HeadJudgeLayout";
import TechLayout from "./TechLayout";

import { Api } from "HostModules";

export default class JudgeTablet extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    static LAYOUTS = {
        "acro": AcrobaticsLayout,
        "dance": DanceLayout,
        "formation": FormationLayout,
        "simplified": SimplifiedLayout,
        "solo": SoloLayout,
        "head": HeadJudgeLayout,
        "tech": TechLayout,
    };

    handleScoreUpdate = (score_id, new_score, force=false) => {
        const data = {
            score_data: new_score,
            force: false,
        };
        Api("score.set", {score_id, data, force}).send();
    };
    handleHeatConfirm = (heat) => {
        Api("tour.confirm_heat", {
            tour_id: this.props.tour.id,
            discipline_judge_id: this.props.disciplineJudge.id,
            heat: heat,
        }).send();
    };
    handleScoreConfirm = (score_id) => {
        Api("score.confirm", {
            score_id: score_id,
        }).send();
    };

    render() {
        const scoring_type = getScoringType(this.props.disciplineJudge, this.props.tour.scoring_system_name);
        if (scoring_type === null) {
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
