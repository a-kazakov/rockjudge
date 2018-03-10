import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayoutDance from "./ScoringLayoutDance";
import TechAcroLayout from "./TechAcroLayout";
import checkSS from "common/checkSS";

export default class TechLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

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
