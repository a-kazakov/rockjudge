import {React} from "HostModules";

import PT from "prop-types";
import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayoutDance from "./ScoringLayoutDance";
import TechAcroLayout from "./TechAcroLayout";
import checkSS from "common/checkSS";

export default class TechLayout extends React.Component {
    static propTypes = {
        tour: PT.object.isRequired,
    };

    renderAcroLayout() {
        return (
            <TechAcroLayout { ...this.props } />
        )
    }
    renderDanceLayout() {
        return (
            <GeneralLayout
                smallBlocks
                layoutClass={ ScoringLayoutDance }
                { ...this.props }
            />
        );
    }
    render() {
        return checkSS(this.props.tour.scoring_system_name, "acro")
            ? this.renderAcroLayout()
            : this.renderDanceLayout();
    }
}