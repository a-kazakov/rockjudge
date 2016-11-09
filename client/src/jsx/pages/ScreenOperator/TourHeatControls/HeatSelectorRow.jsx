import _ from "l10n";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import makeClassName from "common/makeClassName";

export default class HeatSelectorRow extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            heat: PT.number.isRequired,
            runs: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                    participant: PT.shape({
                        number: PT.number.isRequired,
                        name: PT.string.isRequired,
                    }).isRequired,
                }).isRequired,
            ).isRequired,
            selected: PT.bool.isRequired,
            onHeatSelect: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onHeatSelect(this.props.heat);
    }

    getClassName() {
        return makeClassName({
            heat: true,
            selected: this.props.selected,
        });
    }
    render() {
        return (
            <table
                className={ this.getClassName() }
                { ...onTouchEndOrClick(this.handleClick) }
            >
                <tbody>
                    <tr>
                        <td className="heat-number">
                            <div>
                                { this.props.heat }
                            </div>
                            <div className="heat-label">
                                { _("screen_operator.labels.heat") }
                            </div>
                        </td>
                        <td className="participants">
                            { this.props.runs.map(run =>
                                <div className="participant" key={ run.id }>
                                    <div className="number">
                                        { run.participant.number }
                                    </div>
                                    <div className="name">
                                        { run.participant.name }
                                    </div>
                                </div>
                            ) }
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

HeatSelectorRow.displayName = "ScreenOperator_TourHeatControls_HeatSelectorRow";
