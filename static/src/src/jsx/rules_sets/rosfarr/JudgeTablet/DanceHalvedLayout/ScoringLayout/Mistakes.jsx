import _ from "l10n";

import { TabletIntegerInput } from "ui/tablet_components";

export default class Mistakes extends React.Component {
    onSmallMistakesUpdate = (value) => {
        this.props.onScoreUpdate("small_mistakes", value);
    }
    onBigMistakesUpdate = (value) => {
        this.props.onScoreUpdate("big_mistakes", value);
    }
    render() {
        return (
            <table className="mistakes full-width"><tbody><tr>
                <td>
                    <h3>{ _("tablet.dance_judge.small_mistakes") }</h3>
                    <TabletIntegerInput
                        value={ this.props.scoreData.small_mistakes }
                        onValueUpdate={ this.onSmallMistakesUpdate } />
                </td><td>
                    <h3>{ _("tablet.dance_judge.big_mistakes") }</h3>
                    <TabletIntegerInput
                        value={ this.props.scoreData.big_mistakes }
                        onValueUpdate={ this.onBigMistakesUpdate } />
                </td>
            </tr></tbody></table>
        );
    }
}
