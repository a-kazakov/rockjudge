import Element from "./Element";

export default class Elements extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            run: PT.shape({
                acrobatics: PT.array.isRequired,
            }).isRequired,
            scoreData: PT.object.isRequired,
            onAcroReductionUpdate: PT.func.isRequired,
        };
    }

    render() {
        return (
            <div>
                { this.props.run.acrobatics.slice(0, 6).map((acro, acro_idx) =>
                    <Element
                        acroIdx={ acro_idx }
                        key={ acro_idx }
                        readOnly={ this.props.readOnly }
                        reduction={ this.props.scoreData[`a${acro_idx + 1}`] }
                        onAcroReductionUpdate={ this.props.onAcroReductionUpdate }
                    />
                ) }
            </div>
        );
    }
}
