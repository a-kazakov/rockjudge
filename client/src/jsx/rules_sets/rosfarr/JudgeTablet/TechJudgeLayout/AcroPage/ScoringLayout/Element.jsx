import OverrideInput from "./OverrideInput";

export default class Element extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            acro: PT.shape({
                score: PT.number.isRequired,
                original_score: PT.number.isRequired,
                description: PT.string.isRequired,
            }).isRequired,
            idx: PT.number.isRequired,
            readOnly: PT.bool.isRequired,
            onAcroOverride: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onAcroOverride(this.props.idx, value);
    }

    render() {
        return (
            <div className="tech-judge-acro">
                <div className="controls">
                    <OverrideInput
                        originalValue={ this.props.acro.original_score }
                        readOnly={ this.props.readOnly }
                        value={ this.props.acro.score }
                        onChange={ this.handleChange }
                    />
                </div>
                <div className="description">
                    { this.props.acro.description }
                </div>
                <div className="clearfix" />
            </div>
        );
    }
}
