import _ from "l10n";

import { TabletIntegerInput } from "ui/tablet_components";

export default class Mistakes extends React.Component {
    onMistakesUpdate = (value) => {
        this.props.onScoreUpdate("mistakes", value);
    }
    render() {
        return (
            <table className="mistakes full-width"><tbody><tr>
                <td>
                    <h3>{ _("tablet.dance_judge.form_mistakes") }</h3>
                    <TabletIntegerInput
                        value={ this.props.scoreData.mistakes }
                        onValueUpdate={ this.onMistakesUpdate } />
                </td>
            </tr></tbody></table>
        );
    }
}
