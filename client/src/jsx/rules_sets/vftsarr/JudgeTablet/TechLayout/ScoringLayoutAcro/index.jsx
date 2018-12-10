import {Api, React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Element from "./Element";
import IntegerInput from "tablet_ui/IntegerInput";

export default class ScoringLayoutAcro extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleAcroOverride = (acrobatic, value) => {
        if (this.props.score.confirmed) {
            return;
        }
        Api("model/update", {
            model_name: "RunAcrobatic",
            model_id: acrobatic.id,
            data: { score: value },
        }).send();
    };
    handleFallDownChange = (value) => {
        this.props.onScoreUpdate("fall_down", value);
    };

    renderScoringLayout() {
        return (
            <div>
                { this.props.score.run.acrobatics.map(acro =>
                    <Element
                        acrobatic={ acro }
                        key={ acro.id }
                        readOnly={ this.props.score.confirmed }
                        onAcroOverride={ this.handleAcroOverride }
                    />
                ) }
            </div>
        )
    }
    render() {
        const participant = this.props.score.run.participant;
        const header = _("global.phrases.participant_n",
            participant.number,
            participant.name,
            participant.sportsmen.length);
        return (
            <div className="layout-participant">
                <h2>
                    { header }
                </h2>
                { this.renderScoringLayout() }
                <div className="mistakes">
                    <h3>
                        { _("tablet.tech_judge.fall_down") }
                    </h3>
                    <IntegerInput
                        jumbo
                        readOnly={ this.props.score.confirmed }
                        value={ this.props.score.data.fall_down }
                        onChange={ this.handleFallDownChange }
                    />
                </div>
            </div>
        );
    }
}