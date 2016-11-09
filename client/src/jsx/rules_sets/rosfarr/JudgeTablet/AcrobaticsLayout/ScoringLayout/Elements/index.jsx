import Element from "./Element";

export default class Elements extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            reductions: PT.array.isRequired,
            onAcroReductionUpdate: PT.func.isRequired,
        };
    }

    render() {
        return (
            <div>
                { this.props.reductions.map((reduction, acro_idx) =>
                    <Element
                        acroIdx={ acro_idx }
                        key={ acro_idx }
                        readOnly={ this.props.readOnly }
                        reduction={ reduction }
                        onAcroReductionUpdate={ this.props.onAcroReductionUpdate }
                    />
                ) }
            </div>
        );
    }
}
