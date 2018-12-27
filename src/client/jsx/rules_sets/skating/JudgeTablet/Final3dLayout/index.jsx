import { React } from "HostModules";

import PT from "prop-types";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import PlacesPage from "./PlacesPage";
import ScoringLayout from "./ScoringLayout";

export default class Final3dLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static checkScoreCompletion(score) {
        return (
            score.data.tech != null &&
            score.data.composition != null &&
            score.data.art != null
        );
    }

    render() {
        return (
            <GeneralLayout
                lastPageRenderer={PlacesPage}
                participantLayoutRenderer={ScoringLayout}
                scoreCompletionChecker={this.constructor.checkScoreCompletion}
                {...this.props}
            />
        );
    }
}
