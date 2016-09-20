import _ from "l10n";

import IntegerInput from "tablet_ui/IntegerInput";

export default class Mistakes extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            scoreData: PT.shape({
                small_mistakes: PT.number.isRequired,
                big_mistakes: PT.number.isRequired,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleSmallMistakesChange = (value) => {
        this.props.onScoreUpdate("small_mistakes", value);
    }
    handleBigMistakesChange = (value) => {
        this.props.onScoreUpdate("big_mistakes", value);
    }

    render() {
        return (
            <table className="mistakes full-width"><tbody><tr>
                <td>
                    <h3>{ _("tablet.dance_judge.form_small_mistakes") }</h3>
                    <IntegerInput
                        readOnly={ this.props.readOnly }
                        value={ this.props.scoreData.small_mistakes }
                        onChange={ this.handleSmallMistakesChange }
                    />
                </td><td>
                    <h3>{ _("tablet.dance_judge.form_big_mistakes") }</h3>
                    <IntegerInput
                        readOnly={ this.props.readOnly }
                        value={ this.props.scoreData.big_mistakes }
                        onChange={ this.handleBigMistakesChange }
                    />
                </td>
            </tr></tbody></table>
        );
    }
}
