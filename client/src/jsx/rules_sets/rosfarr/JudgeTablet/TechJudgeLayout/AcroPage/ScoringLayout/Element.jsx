import OverrideInput from "./OverrideInput";

export default class Element extends React.Component {
    render() {
        return (
            <div className="tech-judge-acro">
                <div className="controls pull-right">
                    <div className="setter">
                        <OverrideInput
                            onChange={ this.props.onAcroOverride }
                            originalValue={ this.props.acro.original_score }
                            value={ this.props.acro.score }
                        />
                    </div>
                </div>
                <h3>
                    { this.props.acro.description }
                </h3>
                <div className="clearfix"></div>
            </div>
        );
    }
}
