import _ from "l10n";

import SelectorInput from "tablet_ui/SelectorInput";

export default class CardInput extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        card: PT.string,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
            scoringSystemName: PT.string.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onScoreUpdate("card", value);
    }

    render() {
        const cards = [
            ["OK", _("tablet.head_judge.ok")],
            ["YC", _("tablet.head_judge.yellow_card")],
            ["RC", _("tablet.head_judge.red_card")],
        ];
        return (
            <div>
                <h3>
                    { _("tablet.head_judge.card") }
                </h3>
                <SelectorInput
                    choices={ cards }
                    value={ this.props.score.data.raw_data.card }
                    onChange={ this.handleChange }
                />
            </div>
        );
    }
}
