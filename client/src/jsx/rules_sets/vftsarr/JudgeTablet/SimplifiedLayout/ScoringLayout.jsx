import {React} from "HostModules";

import PT from "prop-types";
import GeneralScale from "JudgeTablet/components/GeneralScale";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleChange = (value) => {
        this.props.onScoreUpdate("points", value);
    };

    render() {
        return (
            <GeneralScale
                max={ 40 }
                min={ 1 }
                readOnly={ this.props.score.confirmed }
                rowSize={ 10 }
                scale="grid"
                value={ this.props.score.data.points }
                onChange={ this.handleChange }
            />
        );
    }
}