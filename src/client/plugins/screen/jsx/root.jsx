import {React} from "HostModules";

import PT from "prop-types";
import SplashScreen from "./SplashScreen";
import HeatsOneParticipant from "./HeatsOneParticipant";
import HeatsMultipleParticipants from "./HeatsMultipleParticipants";
import HeatsFormation from "./HeatsFormation";
import TourResults from "./TourResults";
import Awarding from "./Awarding";

class Screen extends React.Component {
    static propTypes = {
        activeTour: PT.object,
        competition: PT.object.isRequired,
        onActiveTourIdChange: PT.func.isRequired,
    };
    render() {
        const PageComponent = {
            "splash": SplashScreen,
            "heats_one_participant": HeatsOneParticipant,
            "heats_multiple_participants": HeatsMultipleParticipants,
            "heats_formation": HeatsFormation,
            "tour_results": TourResults,
            "awarding": Awarding,
        }[this.props.competition.screen_data.screen_id] || SplashScreen;
        return (
            <PageComponent { ...this.props } />
        );
    }
}

window.registerScreen(Screen);
