import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class SoloLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            rough: PT.bool.isRequired,
        };
    }
    render() {
        const { rough, ...other_props } = this.props;
        return (
            <GeneralLayout
                layoutClass={ ScoringLayout }
                { ...other_props }
            />
        );
    }
}
