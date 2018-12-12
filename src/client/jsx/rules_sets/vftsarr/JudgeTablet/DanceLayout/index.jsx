import { React } from "HostModules";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class DanceLayout extends React.Component {
    render() {
        return <GeneralLayout layoutClass={ScoringLayout} {...this.props} />;
    }
}
