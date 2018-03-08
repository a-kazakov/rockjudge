import Element from "./Element";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            run: PT.object.isRequired,
            score: PT.object.isRequired,
            scoreData: PT.object.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    static canConfirm(score_data, run) {
        for (let idx = 1; idx <= Math.min(run.acrobatics.length, 6); ++idx) {
            if (score_data[`a${idx}`] === null) {
                return false;
            }
        }
        return true;
    }

    handleAcroReductionUpdate = (acro_idx, value) => {
        this.props.onScoreUpdate(`a${acro_idx + 1}`, value);
    };

    render() {
        return (
            <div>
                { this.props.run.acrobatics.slice(0, 6).map((acro, acro_idx) =>
                    <Element
                        acroIdx={ acro_idx }
                        key={ acro_idx }
                        readOnly={ this.props.readOnly }
                        reduction={ this.props.scoreData[`a${acro_idx + 1}`] }
                        onAcroReductionUpdate={ this.handleAcroReductionUpdate }
                    />
                ) }
            </div>
        );
    }
}
