import Element from "./Element";

export default class Elements extends React.Component {
    render() {
        return (
            <div>
                { this.props.reductions.map((reduction, acro_idx) =>
                    <Element
                        key={ acro_idx }
                        readOnly={ this.props.readOnly }
                        reduction={ reduction }
                        acroIdx={ acro_idx }
                        onAcroReductionUpdate={ this.props.onAcroReductionUpdate }
                    />
                ) }
            </div>
        );
    }
}
