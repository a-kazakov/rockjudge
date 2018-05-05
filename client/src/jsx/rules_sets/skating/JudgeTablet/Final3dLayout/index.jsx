import _ from "l10n";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import PlacesPage from "./PlacesPage";
import ScoringLayout from "./ScoringLayout";

export default class Final3dLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                num_advances: PT.number.isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                        scores: PT.arrayOf(
                            PT.shape({
                                discipline_judge_id: PT.number.isRequired,
                            }).isRequired,
                        ).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
        };
    }

    render() {
        return (
            <GeneralLayout
                confirmationClass={ PlacesPage }
                layoutClass={ ScoringLayout }
                { ...this.props }
            />
        );
    }
}
