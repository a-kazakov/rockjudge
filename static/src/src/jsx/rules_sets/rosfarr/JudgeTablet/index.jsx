import getScoringType from "common/getScoringType";

import AcrobaticsLayout from "./AcrobaticsLayout";
import DanceLayout from "./DanceLayout";
import DanceHalvedLayout from "./DanceHalvedLayout";
import FormationLayout from "./FormationLayout";
import FormationAcroLayout from "./FormationAcroLayout";
import SimplifiedLayout from "./SimplifiedLayout";
import HeadJudgeLayout from "./HeadJudgeLayout";
import TechJudgeLayout from "./TechJudgeLayout";

import { Api } from "server/api";

export default class JudgeTablet extends React.Component {
    static LAYOUTS = {
        "acro": AcrobaticsLayout,
        "dance": DanceLayout,
        "dance_halved": DanceHalvedLayout,
        "formation": FormationLayout,
        "formation_acro": FormationAcroLayout,
        "simplified": SimplifiedLayout,
        "head": HeadJudgeLayout,
        "tech": TechJudgeLayout,
    };
    onScoreUpdate = (score_id, new_score) => {
        let request = {
            score_data: new_score,
            force: false,
        };
        Api("score.set", { score_id: score_id, data: request }).send();
    }
    onScoreConfirm = (score_id) => {
        Api("score.confirm", { score_id: score_id }).send();
    }
    render() {
        const scoring_type = getScoringType(this.props.disciplineJudge, this.props.tour.scoring_system_name);
        let LayoutClass = JudgeTablet.LAYOUTS[scoring_type];
        if (!LayoutClass) {
            return (
                <div>Not implemented!</div>
            );
        }
        return (
            <LayoutClass
                disciplineJudge={ this.props.disciplineJudge }
                tour={ this.props.tour }
                onScoreUpdate={ this.onScoreUpdate }
                onScoreConfirm={ this.onScoreConfirm }
            />
        );
    }
}
