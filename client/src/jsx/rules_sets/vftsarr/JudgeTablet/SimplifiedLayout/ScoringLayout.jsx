import GeneralScale from "JudgeTablet/components/GeneralScale";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            scoreData: PT.shape({
                points: PT.number,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
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
                onChange={ this.handleChange }
            />
        );
    }
}
