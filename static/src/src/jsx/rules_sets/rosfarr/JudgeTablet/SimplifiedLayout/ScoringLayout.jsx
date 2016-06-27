import _ from "l10n";

import GeneralScale from "JudgeTablet/GeneralScale";

export default class ScoringLayout extends React.Component {
    onValueUpdate = (value) => {
        this.props.onScoreUpdate("points", value);
    }
    render() {
        return (
            <GeneralScale
                value={ this.props.scoreData.points }
                scale="grid"
                onValueUpdate={ this.onValueUpdate }
                min={ 1 }
                max={ 40 }
                rowSize={ 10 } />
        );
    }
}
