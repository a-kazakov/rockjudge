import _ from "l10n";

import getScoringType from "common/getScoringType";

import HeadJudgeLayout from "./HeadJudgeLayout";
import QualificationSimpleLayout from "./QualificationSimpleLayout";

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
        "qualification_simple": QualificationSimpleLayout,
        "head": HeadJudgeLayout,
    };

    handleScoreUpdate = (score_id, new_score) => {
        const request = {
            score_data: new_score,
            force: false,
        };
        Api("score.set", { score_id: score_id, data: request }).send();
    };
    handleHeatConfirm = (heat) => {
        Api("tour.confirm_heat", {
            tour_id: this.props.tour.id,
            discipline_judge_id: this.props.disciplineJudge.id,
            heat: heat,
        }).send();
    };

    render() {
        const scoring_type = getScoringType(this.props.disciplineJudge, this.props.tour.scoring_system_name);
        if (scoring_type === null) {
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
