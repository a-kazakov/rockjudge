import _ from "l10n";

import GeneralScale from "JudgeTablet/GeneralScale";

export default class ScoringLayout extends React.Component {
    onChange = (value) => {
        this.props.onScoreUpdate("points", value);
    }
    render() {
        return (
            <GeneralScale
                max={ 40 }
                min={ 1 }
                readOnly={ this.props.readOnly }
                rowSize={ 10 }
                scale="grid"
                value={ this.props.scoreData.points }
                onChange={ this.onChange }
            />
        );
    }
}
