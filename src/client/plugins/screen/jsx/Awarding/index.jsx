import {React} from "HostModules";

import PT from "prop-types";
import Renderer from "./Renderer";

export default class Awarding extends React.Component {
    static propTypes = {
        competition: PT.object.isRequired,
    };

    get controls() {
        return this.props.competition.screen_data.controls_state;
    }

    render() {
        const {position, discipline_id} = this.controls;
        return (
            <div className="discipline-results">
                <Renderer
                    discipline={ this.props.competition.subscription_storage.get("Discipline", discipline_id) }
                    position={ position }
                />
            </div>
        );
    }
}

Awarding.displayName = "Awarding";