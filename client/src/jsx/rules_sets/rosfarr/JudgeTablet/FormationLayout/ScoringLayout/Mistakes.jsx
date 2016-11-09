import _ from "l10n";

import IntegerInput from "tablet_ui/IntegerInput";

export default class Mistakes extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
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
            <div className="mistakes">
                <h3>{ _("tablet.dance_judge.form_mistakes") }</h3>
                <IntegerInput
                    readOnly={ this.props.readOnly }
                    value={ this.props.scoreData.mistakes }
                    onChange={ this.handleChange }
                />
            </div>
        );
    }
}
