import _ from "l10n";

import Program from "./Program";
import Creator from "./Creator";

export default class Programs extends React.PureComponent {
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
            <div className="programs">
                <label>
                    { _("models.participant.programs") }
                </label>
                { this.props.programs.map(p =>
                    <Program
                        key={ p.id }
                        program={ p }
                    />
                ) }
                { this.props.newParticipant ? (
                    <div className="add-programs-after-creation-alert">
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
