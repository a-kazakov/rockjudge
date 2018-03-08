import _ from "l10n";

import IntegerInput from "tablet_ui/IntegerInput";

export default class Mistakes extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            formation: PT.bool.isRequired,
            readOnly: PT.bool.isRequired,
            scoreData: PT.shape({
                small_mistakes: PT.number.isRequired,
                big_mistakes: PT.number.isRequired,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            formation: false,
        }
    }

    handleSmallMistakesChange = (value) => {
        this.props.onScoreUpdate("small_mistakes", value);
    };
    handleBigMistakesChange = (value) => {
        this.props.onScoreUpdate("big_mistakes", value);
    };

    render() {
        const prefix = this.props.formation
            ? "tablet.dance_judge.form_"
            : "tablet.dance_judge.";
        return (
            <table className="mistakes full-width"><tbody><tr>
                <td>
                    <h3>{ _(`${prefix}small_mistakes`) }</h3>
                    <IntegerInput
                        jumbo
                        readOnly={ this.props.readOnly }
                        value={ this.props.scoreData.small_mistakes }
                        onChange={ this.handleSmallMistakesChange }
                    />
                </td><td>
                    <h3>{ _(`${prefix}big_mistakes`) }</h3>
                    <IntegerInput
                        jumbo
                        readOnly={ this.props.readOnly }
                        value={ this.props.scoreData.big_mistakes }
                        onChange={ this.handleBigMistakesChange }
                    />
                </td>
            </tr></tbody></table>
        );
    }
}
