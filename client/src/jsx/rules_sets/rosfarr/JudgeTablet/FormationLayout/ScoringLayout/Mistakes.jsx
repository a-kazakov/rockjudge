import _ from "l10n";

import IntegerInput from "tablet_ui/IntegerInput";

export default class Mistakes extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            scoreData: PT.shape({
                mistakes: PT.number.isRequired,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onScoreUpdate("mistakes", value);
    }

    render() {
        return (
            <table className="mistakes"><tbody><tr>
                <td>
                    <h3>{ _("tablet.dance_judge.form_mistakes") }</h3>
                    <IntegerInput
                        value={ this.props.scoreData.mistakes }
                        onChange={ this.handleChange }
                    />
                </td>
            </tr></tbody></table>
        );
    }
}
