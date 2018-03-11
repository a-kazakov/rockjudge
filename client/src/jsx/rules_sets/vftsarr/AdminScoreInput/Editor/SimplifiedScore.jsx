import GeneralEditor from "./GeneralEditor"
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import checkSS from "../../common/checkSS";

export default class SimplifiedScore extends React.PureComponent {
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
        return (
            <GeneralEditor
                initialData={ this.props.score.data.raw_data }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.props.onSubmit }
            >
                <NumberBlock
                    field="points"
                    label="P"
                    max={ 40 }
                />
            </GeneralEditor>
        );
    }
}

