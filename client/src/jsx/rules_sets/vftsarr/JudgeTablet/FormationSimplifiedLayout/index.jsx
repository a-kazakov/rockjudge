import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class FormationSimplifiedLayout extends React.PureComponent {
    render() {
        return (
            <GeneralLayout
                layoutClass={ ScoringLayout }
                { ...this.props }
            />
        );
    }
}
