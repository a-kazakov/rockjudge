import Renderer from "./Renderer";

export default class HeatsOneParticipant extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                screen_data: PT.shape({
                    controls_state: PT.shape({
                        discipline_id: PT.number.isRequired,
                        position: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    get controls() {
        return this.props.competition.screen_data.controls_state;
    }

    render() {
        return (
            <div className="discipline-results">
                <Renderer
                    disciplineId={ this.controls.discipline_id }
                    position={ this.controls.position }
                />
            </div>
        );
    }
}

HeatsOneParticipant.displayName = "HeatsOneParticipant";
