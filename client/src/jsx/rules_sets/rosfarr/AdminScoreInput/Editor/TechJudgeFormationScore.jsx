import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class TechFormationJudgeScore extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        jump_steps:       PT.number,
                        penalty:          PT.number,
                        timing_violation: PT.bool,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
            readOnly: PT.bool.isRequired,
            onDiscard: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }

    handleSubmission = (data) => {
        this.props.onSubmit({
            penalty:          data.penalty === "" ? null : parseInt(data.penalty),
            jump_steps:       parseInt(data.jump_steps),
            timing_violation: data.timing_violation === "" ? null : data.timing_violation === "true",
        });
    }

    makeField(key, label, scale) {
        const value = this.props.score.data.raw_data[key];
        return {
            key: key,
            label: `${label}:`,
            options: scale,
            defaultValue: value === null ? "" : value.toString(),
        }
    }

    render() {
        return (
            <GeneralEditor
                fields={ [
                    this.makeField("penalty", "P", [
                        ["0", "OK"],
                        ["-5", "-5"],
                        ["-15", "-15"],
                    ]),
                    this.makeField("jump_steps", "JS", genScale("numbers", { max: 100 })),
                    this.makeField("timing_violation", "T", [
                        ["",      "?"],
                        ["false", "✓"],
                        ["true",  "✗"],
                    ]),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}


TechFormationJudgeScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_TechFormationJudgeScore";
