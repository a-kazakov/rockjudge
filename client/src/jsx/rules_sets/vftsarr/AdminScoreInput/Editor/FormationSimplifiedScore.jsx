import GeneralEditor from "./GeneralEditor"
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

export default class FormationSimplifiedScore extends React.PureComponent {
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
                <ReductionBlock
                    nullable
                    field="fw"
                    label="FW"
                />
                <NumberBlock
                    nullable
                    field="dance_figs"
                    label="DF"
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="composition"
                    label="C"
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="figures"
                    label="F"
                    step={ 0.5 }
                />
                <NumberBlock
                    field="small_mistakes"
                    label="SM"
                    max={ 100 }
                />
                <NumberBlock
                    field="big_mistakes"
                    label="BM"
                    max={ 100 }
                />
            </GeneralEditor>
        );
    }
}

