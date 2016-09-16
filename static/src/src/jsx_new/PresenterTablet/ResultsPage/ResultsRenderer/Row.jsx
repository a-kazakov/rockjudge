import { _ } from "l10n/loader";

import { onTouchEndOrClick } from "ui/tablet_components";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            participant: PT.shape({
                number: PT.number.isRequired,
                name: PT.string.isRequired,
                club: PT.shape({
                    name: PT.string.isRequired,
                    city: PT.string.isRequired,
                }).isRequired,
                coaches: PT.string.isRequired,
            }).isRequired,
            place: PT.number,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
    }
    handleToggleState = () => {
        this.setState({
            active: !this.state.active,
        });
    }

    getClassName() {
        let result = "row";
        if (this.state.active) {
            result += " active";
        }
        return result;
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
                { ...onTouchEndOrClick(this.handleToggleState) }
            >
                <tbody>
                    <tr>
                        <td className="place" rowSpan="3">
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
                            { `${this.props.participant.club.name}, ${this.props.participant.club.city}` }
                        </td>
                    </tr>
                    <tr>
                        <td className="coaches" colSpan="2">
                            { this.props.participant.coaches }
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

Row.displayName = "PresenterTablet_ResultsPage_ResultsRenderer_Row";
