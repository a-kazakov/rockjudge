import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayoutDance from "./ScoringLayoutDance";
import TechAcroLayout from "./TechAcroLayout";

const ACRO_DISCIPLINES = [
    "vftsarr.acro",
    "vftsarr.formation_acro",
    "vftsarr.am_final_acro",
    "vftsarr.am_qual",
];

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
        return ACRO_DISCIPLINES.includes(this.props.tour.scoring_system_name)
            ? this.renderAcroLayout()
            : this.renderDanceLayout();
    }
}
