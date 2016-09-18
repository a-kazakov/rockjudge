import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class DancingLayout extends React.Component {
    render() {
        return (
            <GeneralLayout
                layoutClass={ ScoringLayout }
                {...this.props}
            />
        );
    }
}
