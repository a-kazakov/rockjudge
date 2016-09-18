import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class DanceScore extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        reductions: PT.arrayOf(PT.number),
                        mistakes:   PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
            readOnly: PT.bool.isRequired,
            onDiscard: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }

    handleSubmission = (data) => {
        let reductions = this.props.score.data.raw_data.reductions.slice(); // clone
        for (const key of Object.keys(data)) {
            if (key[0] === "A") {
                const s_val = data[key];
                reductions[parseInt(key.slice(1))] = s_val === "" ? -1 : parseInt(s_val);
            }
        }
        this.props.onSubmit({
            reductions: reductions,
            mistakes:   parseInt(data.mistakes),
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
        let fields = this.props.score.data.raw_data.reductions.map((red, idx) => ({
            key: `A${idx}`,
            label: `A${idx + 1}:`,
            options: genScale("?reduction"),
            defaultValue: this.props.score.data.raw_data.reductions[idx] === null
                ? ""
                : this.props.score.data.raw_data.reductions[idx].toString(),
        }));
        fields.push(this.makeField("mistakes", "FD", genScale("numbers", { max: 100 })))
        return (
            <GeneralEditor
                fields={ fields }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}

DanceScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_DanceScore";
