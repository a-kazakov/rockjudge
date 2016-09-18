import _ from "l10n";

import GeneralScale from "JudgeTablet/GeneralScale";

export default class ScoringLayout extends React.Component {
    onChange = (value) => {
        this.props.onScoreUpdate("points", value);
    }
    render() {
        return (
            <GeneralScale
                value={ this.props.scoreData.points }
                scale="grid"
                onChange={ this.onChange }
                min={ 1 }
                max={ 40 }
                rowSize={ 10 }
            />
        );
    }
}
