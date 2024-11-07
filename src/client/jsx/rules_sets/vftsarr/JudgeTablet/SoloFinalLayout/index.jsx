import { React } from "HostModules";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class SoloFinalLayout extends React.Component {
    render() {
        return <GeneralLayout layoutClass={ScoringLayout} {...this.props} />;
    }
}
