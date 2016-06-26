import _ from "l10n";

import GeneralScale from "JudgeTablet/GeneralScale";

export default class Element extends React.Component {
    onUpdate = (value) => {
        this.props.onAcroReductionUpdate(this.props.acroIdx, value);
    }
    render() {
        return (
            <GeneralScale
                header={ _("tablet.acro_judge.acro_n", this.props.acroIdx) }
                scale="reduction"
                value={ this.props.reduction }
                onValueUpdate={ this.onUpdate } />
        );
    }
}
