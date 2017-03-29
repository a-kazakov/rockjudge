import getScoringType from "common/getScoringType";

import AcrobaticsLayout from "./AcrobaticsLayout";
import DanceLayout from "./DanceLayout";
import FormationLayout from "./FormationLayout";
import FormationAcroLayout from "./FormationAcroLayout";
import SimplifiedLayout from "./SimplifiedLayout";
import SoloLayout from "./SoloLayout";
import HeadJudgeLayout from "./HeadJudgeLayout";
import TechJudgeLayout from "./TechJudgeLayout";

import { Api } from "HostModules";

export default class JudgeTablet extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    static LAYOUTS = {
        "acro": AcrobaticsLayout,
        "dance": DanceLayout,
        "formation": FormationLayout,
        "formation_acro": FormationAcroLayout,
        "simplified": SimplifiedLayout,
        "solo": SoloLayout,
        "head": HeadJudgeLayout,
        "tech": TechJudgeLayout,
    };

    handleScoreUpdate = (score_id, new_score) => {
        const request = {
            score_data: new_score,
            force: false,
        };
        Api("score.set", { score_id: score_id, data: request }).send();
    }
    handleScoreConfirm = (score_id) => {
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
            <div className="rosfarr-JudgeTablet">
                <LayoutClass
                    disciplineJudge={ this.props.disciplineJudge }
                    tour={ this.props.tour }
                    onScoreConfirm={ this.handleScoreConfirm }
                    onScoreUpdate={ this.handleScoreUpdate }
                />
            </div>
        );
    }
}
