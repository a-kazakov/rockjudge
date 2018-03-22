import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class DancingLayout extends React.PureComponent {
    render() {
        return (
            <GeneralLayout
                layoutClass={ ScoringLayout }
                { ...this.props }
            />
        );
    }
}
