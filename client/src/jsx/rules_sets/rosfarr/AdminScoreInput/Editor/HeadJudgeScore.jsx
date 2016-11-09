import GeneralEditor from "./GeneralEditor"

export default class HeadJudgeScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        penalty: PT.number,
                        nexttour: PT.bool,
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
            penalty:  parseInt(data.penalty),
            nexttour: data.nexttour === "true",
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
                        ["", "—"],
                        ["0", "OK"],
                        ["-3", "-3"],
                        ["-30", "-30"],
                        ["-100", "-100"],
                    ]),
                    this.makeField("nexttour", "NT", [
                        ["false", "No"],
                        ["true",  "Yes"],
                    ]),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}

HeadJudgeScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_HeadJudgeScore";
