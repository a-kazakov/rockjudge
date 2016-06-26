import _ from "l10n";

import { TabletIntegerInput } from "ui/tablet_components";

export default class Mistakes extends React.Component {
    onUpdate = (value) => {
        this.props.onScoreUpdate("mistakes", value);
    }
    render() {
        return (
            <div className="mistakes">
                <h3>{ _("tablet.acro_judge.fall_down") }</h3>
                <TabletIntegerInput
                    value={ this.props.mistakes }
                    onValueUpdate={ this.onUpdate } />
            </div>
        );
    }
}
