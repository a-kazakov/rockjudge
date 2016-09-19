import _ from "l10n";

import GeneralScale from "JudgeTablet/GeneralScale";

export default class Element extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            acroIdx: PT.number.isRequired,
            reduction: PT.number.isRequired,
            onAcroReductionUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onAcroReductionUpdate(this.props.acroIdx, value);
    }

    render() {
        return (
            <GeneralScale
                header={ _("tablet.acro_judge.acro_n", this.props.acroIdx) }
                scale="reduction"
                value={ this.props.reduction }
                onChange={ this.handleChange }
            />
        );
    }
}
