import _ from "l10n";

import Button from "./Button";

export default class JudgingPositionSelector extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            numOptions: PT.number.isRequired,
            onSelected: PT.func.isRequired,
        };
    }

    renderButtons() {
        let result = [];
        for (let idx = 0; idx < this.props.numOptions; ++idx) {
            result.push(
                <Button
                    key={ idx }
                    numOptions={ this.props.numOptions }
                    position={ idx }
                    onSelected={ this.props.onSelected }
                />
            );
        }
        return result;
    }
    render() {
        return (
            <div className="body position-selector">
                <div className="prompt">
                    { _("tablet.tech_judge.judging_position_prompt") }
                </div>
                <div className="buttons">
                    { this.renderButtons() }
                </div>
            </div>
        );
    }
}