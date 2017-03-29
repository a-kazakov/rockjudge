import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class TechJudgeScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        jump_steps: PT.number.isRequired,
                        card: PT.oneOf(["OK", "YC", "RC"]),
                        time: PT.number,
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
            card:       data.card === "" ? null : data.card,
            jump_steps: parseInt(data.jump_steps),
        });
    }

    makeField(key, label, scale, read_only=false) {
        const value = this.props.score.data.raw_data[key];
        return {
            key: key,
            label: `${label}:`,
            options: scale,
            defaultValue: value === null ? "" : value.toString(),
            readOnly: read_only,
        }
    }

    pad(num, size) {
        const s = `0000${num}`;
        return s.substr(s.length - size);
    }
    getTime() {
        let val = this.props.score.data.raw_data.time;
        if (val === null) {
            return "—"
        }
        let m = 0, s = 0;
        m = Math.floor(val / 60);
        val %= 60;
        s = Math.floor(val);
        return `${m}:${this.pad(s, 2)}`;
    }

    render() {
        const time_field = (
            this.props.score.data.raw_data.time === null
                ? [["", "—"]]
                : [[this.props.score.data.raw_data.time.toString(), this.getTime()]]
        );
        return (
            <GeneralEditor
                fields={ [
                    this.makeField("card", "C", [
                        ["", "—"],
                        ["OK", "OK"],
                        ["YC", "YC"],
                        ["RC", "RC"],
                    ]),
                    this.makeField("jump_steps", "JS", genScale("numbers", { max: 100 })),
                    this.makeField("time", "T", time_field, true),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}


TechJudgeScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_TechJudgeScore";
