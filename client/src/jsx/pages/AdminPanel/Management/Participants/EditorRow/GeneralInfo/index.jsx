import _ from "l10n";

import ClubSelector from "./ClubSelector";
import TextInput from "./TextInput";

export default class GeneralInfo extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clubs: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
            participantData: PT.shape({
                number: PT.string.isRequired,
                coaches: PT.string.isRequired,
                formation_name: PT.string.isRequired,
            }).isRequired,
            onChange: PT.func.isRequired,
        };
    }

    render() {
        return (
            <div>
                <label>
                    { _("models.participant.number") }
                    <TextInput
                        mkey="number"
                        type="number"
                        value={ this.props.participantData.number }
                        onChange={ this.props.onChange }
                    />
                </label>
                <label>
                    { _("models.participant.club_name") }
                    <ClubSelector
                        clubs={ this.props.competition.clubs }
                        participantData={ this.props.participantData }
                        onChange={ this.props.onChange }
                    />
                </label>
                <label>
                    { _("models.participant.coaches") }
                    <TextInput
                        mkey="coaches"
                        value={ this.props.participantData.coaches }
                        onChange={ this.props.onChange }
                    />
                </label>
                <label>
                    { _("models.participant.formation_name") }
                    <TextInput
                        mkey="formation_name"
                        value={ this.props.participantData.formation_name }
                        onChange={ this.props.onChange }
                    />
                </label>
            </div>
        );
    }
}

GeneralInfo.displayName = "AdminPanel_Management_Participants_EditorRow_GeneralInfo";
