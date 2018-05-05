import GeneralEditor from "./GeneralEditor"
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

export default class Final3dScore extends React.PureComponent {
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
                    nullable
                    field="tech"
                    label="T"
                    max={ 10 }
                    min={ 1 }
                />
                <NumberBlock
                    nullable
                    field="composition"
                    label="C"
                    max={ 10 }
                    min={ 1 }
                />
                <NumberBlock
                    nullable
                    field="art"
                    label="A"
                    max={ 10 }
                    min={ 1 }
                />
                <NumberBlock
                    nullable
                    field="place"
                    label="P"
                    max={ 50 }
                    min={ 1 }
                />
            </GeneralEditor>
        );
    }
}
