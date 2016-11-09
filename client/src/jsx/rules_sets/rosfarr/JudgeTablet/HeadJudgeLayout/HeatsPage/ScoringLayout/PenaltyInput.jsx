import _ from "l10n";

import SelectorInput from "tablet_ui/SelectorInput";

export default class PenaltyInput extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        penalty: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
            scoringSystemName: PT.string.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onScoreUpdate("penalty", value);
    }

    render() {
        const penalties = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.scoringSystemName) >= 0
            ? [
                [null, "—"],
                [0,    _("tablet.head_judge.ok")],
                [-5,   _("tablet.head_judge.form_yellow_card")],
                [-15,  _("tablet.head_judge.form_red_card")],
            ]
            : [
                [null, "—"],
                [0,    _("tablet.head_judge.ok")],
                [-3,   _("tablet.head_judge.yellow_card")],
                [-30,  _("tablet.head_judge.red_card")],
                [-100, _("tablet.head_judge.black_card")],
            ];
        return (
            <div>
                <h3>
                    { _("tablet.head_judge.penalty_type") }
                </h3>
                <SelectorInput
                    choices={ penalties }
                    value={ this.props.score.data.raw_data.penalty }
                    onChange={ this.handleChange }
                />
            </div>
        );
    }
}
