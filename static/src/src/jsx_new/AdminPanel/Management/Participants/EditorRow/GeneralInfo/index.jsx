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
                <h4>
                    { _("models.participant.general_info") }
                </h4>
                <TextInput
                    mkey="number"
                    placeholder={ _("models.participant.number") }
                    value={ this.props.participantData.number }
                    onChange={ this.props.onChange }
                />
                <ClubSelector
                    clubs={ this.props.competition.clubs }
                    participantData={ this.props.participantData }
                    onChange={ this.props.onChange }
                />
                <TextInput
                    mkey="coaches"
                    placeholder={ _("models.participant.coaches") }
                    value={ this.props.participantData.coaches }
                    onChange={ this.props.onChange }
                />
                <TextInput
                    mkey="formation_name"
                    placeholder={ _("models.participant.formation_name") }
                    value={ this.props.participantData.formation_name }
                    onChange={ this.props.onChange }
                />
            </div>
        );
    }
}

GeneralInfo.displayName = "AdminPanel_Management_Participants_EditorRow_GeneralInfo";
