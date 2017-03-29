import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class SoloLayout extends React.PureComponent {
    render() {
        return (
            <GeneralLayout
                layoutClass={ ScoringLayout }
                { ...this.props }
            />
        );
    }
}
