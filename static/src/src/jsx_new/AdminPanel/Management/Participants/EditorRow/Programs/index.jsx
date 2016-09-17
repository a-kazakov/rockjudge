import _ from "l10n";

import Program from "./Program";
import Creator from "./Creator";

export default class Programs extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            newParticipant: PT.bool,
            participant: PT.object.isRequired,
            programs: PT.arrayOf(PT.shape({
                id: PT.number.isRequired,
            }).isRequired),
        };
    }
    static get defaultProps() {
        return {
            newParticipant: false,
        };
    }
    render() {
        return (
            <div>
                <h4>{ _("models.participant.programs") }</h4>
                { this.props.programs.map(p =>
                    <Program
                        key={ p.id }
                        program={ p }
                    />
                ) }
                { this.props.newParticipant ? (
                    <div className="alert alert-info">
                        { _("admin.alerts.add_programs_after_creation") }
                    </div>
                ) : (
                    <Creator
                        participant={ this.props.participant }
                    />
                ) }
            </div>
        );
    }
}

Programs.displayName = "AdminPanel_Management_Participants_EditorRow_Programs";
