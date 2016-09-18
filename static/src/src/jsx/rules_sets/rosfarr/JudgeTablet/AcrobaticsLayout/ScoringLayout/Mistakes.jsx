import _ from "l10n";

import IntegerInput from "tablet_ui/IntegerInput";

export default class Mistakes extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            mistakes: PT.number.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onScoreUpdate("mistakes", value);
    }

    render() {
        return (
            <div className="mistakes">
                <h3>{ _("tablet.acro_judge.fall_down") }</h3>
                <IntegerInput
                    value={ this.props.mistakes }
                    onChange={ this.handleChange }
                />
            </div>
        );
    }
}
