import getScoringType from "common/getScoringType";

import AcrobaticsLayout from "./AcrobaticsLayout";
import DanceLayout from "./DanceLayout";

import { Api } from "server/api";

export default class JudgeTablet extends React.Component {
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
        let LayoutClass;
        switch (scoring_type) {
        case "acro":
            LayoutClass = AcrobaticsLayout;
            break;
        case "dance":
            LayoutClass = DanceLayout;
            break;
        default:
            return (
                <div>Not implemented!</div>
            );
        }
        return (
            <LayoutClass
                disciplineJudge={ this.props.disciplineJudge }
                tour={ this.props.tour }
                onScoreUpdate={ this.onScoreUpdate }
                onScoreConfirm={ this.onScoreConfirm } />
        );
    }
}
