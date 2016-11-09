import _ from "l10n";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import makeClassName from "common/makeClassName";

export default class RendererRow extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            participant: PT.shape({
                number: PT.number.isRequired,
                name: PT.string.isRequired,
                club: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            place: PT.number,
            position: PT.number.isRequired,
            selected: PT.bool.isRequired,
            onPositionSelect: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onPositionSelect(this.props.position);
    }

    getClassName() {
        return makeClassName({
            "row": true,
            "selected": this.props.selected,
        });
    }
    renderPlace() {
        if (this.props.place === null) {
            return null;
        }
        return (
            <div>
                { this.props.place }
                <div className="place-label">
                    { _("presenter.labels.place") }
                </div>
            </div>
        );
    }
    render() {
        return (
            <table
                className={ this.getClassName() }
                { ...onTouchEndOrClick(this.handleClick) }
            >
                <tbody>
                    <tr>
                        <td className="place" rowSpan="2">
                            { this.renderPlace() }
                        </td>
                        <td className="number">
                            { this.props.participant.number }
                        </td>
                        <td className="name">
                            { this.props.participant.name }
                        </td>
                    </tr>
                    <tr>
                        <td className="club" colSpan="2">
                            { this.props.participant.club.name }
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

RendererRow.displayName = "ScreenOperator_DisciplinePlaceControls_DisciplineSelector_RendererRow";
