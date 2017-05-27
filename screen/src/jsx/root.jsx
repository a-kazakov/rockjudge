import SplashScreen from "./SplashScreen";
import HeatsOneParticipant from "./HeatsOneParticipant";
import HeatsMultipleParticipants from "./HeatsMultipleParticipants";
import HeatsFormation from "./HeatsFormation";
import TourResults from "./TourResults";
import Awarding from "./Awarding";

import { setup } from "./HostModules";

class Screen extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                screen_data: PT.shape({
                    screen_id: PT.string,
                }).isRequired,
            }).isRequired,
        };
    }
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
            <PageComponent
                competition={ this.props.competition }
            />
        );
    }
}

Screen.displayName = "Screen";

const response = window.registerScreen(Screen);
setup(response);
