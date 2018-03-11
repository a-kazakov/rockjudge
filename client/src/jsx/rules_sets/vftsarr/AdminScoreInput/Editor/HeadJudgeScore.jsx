import GeneralEditor from "./GeneralEditor"
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import SelectorBlock from "./GeneralEditor/blocks/SelectorBlock";
import CardReasonsBlock from "./GeneralEditor/blocks/CardReasonsBlock";

export default class HeadJudgeScore extends React.PureComponent {
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
                    field="bonus"
                    label="B"
                    max={ 10 }
                    min={ -10 }
                />
                <SelectorBlock
                    nullable
                    field="card"
                    label="C"
                    options={ [
                        ["OK", "OK"],
                        ["YC", "YC"],
                        ["RC", "RC"],
                    ] }
                />
                <CardReasonsBlock
                    field="card_reasons"
                    label="Card reasons"
                    scoringSystemName={ this.props.tour.scoring_system_name }
                />
            </GeneralEditor>
        );
    }
}

