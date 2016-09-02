import { TabletAcroOverrideInput } from "ui/tablet_components";

export default class Element extends React.Component {
    render() {
        return (
            <div className="tech-judge-acro">
                <div className="controls pull-right">
                    <div className="setter">
                        <TabletAcroOverrideInput
                            original_value={ this.props.acro.original_score }
                            value={ this.props.acro.score }
                            onValueUpdate={ this.props.onAcroOverride } />
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
