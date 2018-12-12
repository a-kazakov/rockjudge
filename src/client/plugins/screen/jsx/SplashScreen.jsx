import {React} from "HostModules";
import PT from "prop-types";

export default class SplashScreen extends React.Component {
    static propTypes = {
        competition: PT.object.isRequired,
    };
    render() {
        return (
            <div className="SplashScreen">
                <h1>
                    { this.props.competition.name }
                </h1>
            </div>
        );
    }
}

SplashScreen.displayName = "SplashScreen";