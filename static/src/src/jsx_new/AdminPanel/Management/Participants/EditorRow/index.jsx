import { _ } from "l10n/loader";

import GeneralInfo from "./GeneralInfo";
import SportsmenList from "./SportsmenList";
import Programs from "./Programs";

export default class EditorRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clubs: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
            newParticipant: PT.bool,
            participant: PT.shape({
                id: PT.number.isRequired,
                number: PT.oneOfType([
                    PT.number.isRequired,
                    PT.string.isRequired,
                ]).isRequired,
                club: PT.shape({
                    id: PT.number.isRequired,
                }).isRequired,
                coaches: PT.string.isRequired,
                formation_name: PT.string.isRequired,
                sportsmen: PT.arrayOf(PT.object.isRequired).isRequired,
                programs: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            newParticipant: false,
        };
    }
    constructor(props) {
        super(props);
        const participant_data = {
            number:         this.props.participant.number.toString(),
            club_id:        this.props.participant.club.id,
            coaches:        this.props.participant.coaches,
            formation_name: this.props.participant.formation_name,
            sportsmen:      this.props.participant.sportsmen.map(sp => {
                let { year_of_birth, ...result } = sp;
                Object.assign(result, {
                    year_of_birth: year_of_birth.toString(),
                });
                return result;
            }),
        };
        this.state = {
            participantData: participant_data,
        };
    }

    handleChange = (field, value) => {
        let participant = Object.assign({}, this.state.participantData); // clone
        participant[field] = value;
        this.setState({
            participantData: participant,
        });
    }
    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.serialize());
    }

    serialize() {
        let { number, sportsmen, ...result } = this.state.participantData;
        Object.assign(result, {
            number: parseInt(number, 10) || 0,
            sportsmen: sportsmen.map(sp => {
                let { year_of_birth, ...inner_result } = sp;
                Object.assign(inner_result, {
                    year_of_birth: parseInt(year_of_birth, 10) || 0,
                });
                return inner_result;
            }),
        });
        return result;
    }

    getClassName() {
        let result = "editor";
        if (this.props.newParticipant) {
            result += " create";
        }
        return result;
    }
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="6">
                    <div className="row">
                        <div className="col-md-7">
                            <form
                                className="row"
                                onSubmit={ this.handleSubmission }
                            >
                                <div className="col-md-5 general-info">
                                    <GeneralInfo
                                        competition={ this.props.competition }
                                        participantData={ this.state.participantData }
                                        onChange={ this.handleChange }
                                    />
                                    <div className="buttons">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            { _("global.buttons.submit") }</button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={ this.props.onStopEditing }
                                        >
                                            { _("global.buttons.discard") }
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <SportsmenList
                                        sportsmen={ this.state.participantData.sportsmen }
                                        onChange={ this.handleChange }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5">
                            <Programs
                                newParticipant={ this.props.newParticipant }
                                participant={ this.props.participant }
                                programs={ this.props.participant.programs }
                                onChange={ this.handleChange }
                            />
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

EditorRow.displayName = "AdminPanel_Management_Participants_EditorRow";
