import _ from "l10n";

import {
    onTouchOrClick,
    TabletIntegerInput,
    TabletIntegerSelectInput,
    TabletSelectorInput,
    TabletPoint5SelectInput,
    TabletAcroOverrideInput,
    StopWatch,
    Slider,
} from "ui/tablet_components";

export default class PenaltyInput extends React.Component {
    onUpdate = (value) => {
        this.props.onScoreUpdate("penalty", value);
    }
    render() {
        const penalties = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.scoringSystemName) >= 0
            ? [
                [0,    _("tablet.head_judge.ok")],
                [-5,   _("tablet.head_judge.form_yellow_card")],
                [-15,  _("tablet.head_judge.form_red_card")]
            ]
            : [
                [0,    _("tablet.head_judge.ok")],
                [-3,   _("tablet.head_judge.yellow_card")],
                [-30,  _("tablet.head_judge.red_card")],
                [-100, _("tablet.head_judge.black_card")]
            ];
        return (
            <div>
                <h3>{ _("tablet.head_judge.penalty_type") }</h3>
                <TabletSelectorInput
                    choices={ penalties }
                    value={ this.props.score.data.raw_data.penalty }
                    onValueUpdate={ this.onUpdate }
                />
            </div>
        );
    }
}
