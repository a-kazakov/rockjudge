import GeneralEditor from "./GeneralEditor"
import checkSS from "common/checkSS";
import range from "common/range";
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";

export default class DanceScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.object.isRequired,
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
            readOnly: PT.bool.isRequired,
            onDiscard: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }

    render() {
        const ssn = this.props.tour.scoring_system_name;
        const acro_count = checkSS(ssn, "acro_6") ? 6 : checkSS(ssn, "acro_8") ? 8 : 5;
        return (
            <GeneralEditor
                initialData={ this.props.score.data.raw_data }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.props.onSubmit }
            >
                { range(1, acro_count + 1).map(idx => (
                    <ReductionBlock
                        nullable
                        field={ `a${idx}` }
                        key={ idx }
                        label={ `A${idx}` }
                    />
                )) }
            </GeneralEditor>
        );
    }
}

