import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";

export default class AcroJudgeTabletBody extends React.Component {
    render() {
        return (
            <GeneralLayout
                layoutClass={ ScoringLayout }
                {...this.props}
            />
        );
    }
}