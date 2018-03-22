import _ from "l10n";

import GeneralScale from "JudgeTablet/components/GeneralScale";

export default class Element extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            acroIdx: PT.number.isRequired,
            readOnly: PT.bool.isRequired,
            reduction: PT.number,
            onAcroReductionUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onAcroReductionUpdate(this.props.acroIdx, value);
    };

    render() {
        return (
            <GeneralScale
                header={ _("tablet.acro_judge.acro_n", this.props.acroIdx) }
                readOnly={ this.props.readOnly }
                scale="reduction"
                value={ this.props.reduction }
                onChange={ this.handleChange }
            />
        );
    }
}
