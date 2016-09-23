import OverrideInput from "./OverrideInput";

export default class Element extends React.Component {
    render() {
        return (
            <div className="tech-judge-acro">
                <div className="controls">
                    <OverrideInput
                        readOnly={ this.props.readOnly }
                        onChange={ this.props.onAcroOverride }
                        originalValue={ this.props.acro.original_score }
                        value={ this.props.acro.score }
                    />
                </div>
                <div className="description">
                    { this.props.acro.description }
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}
