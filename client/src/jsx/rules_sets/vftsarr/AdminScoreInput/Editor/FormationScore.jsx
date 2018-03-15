import GeneralEditor from "./GeneralEditor"
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

export default class FormationScore extends React.PureComponent {
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
                    field="df_accuracy"
                    label="DF-Ac"
                    max={ 5 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="df_difficulty"
                    label="DF-D"
                    max={ 4 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="df_art"
                    label="DF-Ar"
                    max={ 1 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="c_ideas"
                    label="C-I"
                    max={ 5 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="c_structure"
                    label="C-S"
                    max={ 4 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="c_bonus"
                    label="C-B"
                    max={ 1 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="fig_execution"
                    label="F-E"
                    max={ 5 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="fig_patterns"
                    label="F-P"
                    max={ 4 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="fig_transitions"
                    label="F-Tr"
                    max={ 1 }
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

