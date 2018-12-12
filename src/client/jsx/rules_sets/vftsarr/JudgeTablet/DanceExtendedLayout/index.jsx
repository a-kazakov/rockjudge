import { React } from "HostModules";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class DanceExtendedLayout extends React.Component {
    render() {
        return <GeneralLayout layoutClass={ScoringLayout} {...this.props} />;
    }
}
