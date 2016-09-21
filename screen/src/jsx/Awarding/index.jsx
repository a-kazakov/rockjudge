import { DisciplineResultsLoader } from "HostModules";

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
            <DisciplineResultsLoader
                disciplineId={ this.controls.discipline_id }
                position={ this.controls.position }
                renderer={ Renderer }
            />
        );
    }
}

HeatsOneParticipant.displayName = "HeatsOneParticipant";
