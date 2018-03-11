import GeneralEditor from "./GeneralEditor"
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import SelectorBlock from "./GeneralEditor/blocks/SelectorBlock";
import CardReasonsBlock from "./GeneralEditor/blocks/CardReasonsBlock";
import TimeBlock from "./GeneralEditor/blocks/TimeBlock";
import checkSS from "../../common/checkSS";

export default class TechJudgeScore extends React.PureComponent {
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

    renderFallDown() {
        if (!checkSS(this.props.tour.scoring_system_name, "acro")) {
            return null;
        }
        return (
            <NumberBlock
                field="fall_down"
                label="FD"
                max={ 100 }
            />
        );
    }
    renderUndercount() {
        if (!checkSS(this.props.tour.scoring_system_name, "formation")) {
            return null;
        }
        return (
            <NumberBlock
                field="undercount"
                label="UC"
                max={ 100 }
            />
        );
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
                    field="jump_steps"
                    label="BS"
                    max={ 100 }
                />
                <TimeBlock
                    nullable
                    field="time"
                    label="T"
                />
                { this.renderFallDown() }
                { this.renderUndercount() }
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

