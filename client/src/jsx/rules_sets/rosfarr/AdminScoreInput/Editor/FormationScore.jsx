import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class FormationScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        dance_tech: PT.number,
                        dance_figs: PT.number,
                        impression: PT.number,
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
        this.props.onSubmit({
            dance_tech: data["dance_tech"] === "" ? null : parseFloat(data.dance_tech),
            dance_figs: data["dance_figs"] === "" ? null : parseFloat(data.dance_figs),
            impression: data["impression"] === "" ? null : parseFloat(data.impression),
            mistakes:   parseInt(data.mistakes),
        });
    }

    makeField(key, label, scale, float=false) {
        const value = this.props.score.data.raw_data[key];
        return {
            key: key,
            label: `${label}:`,
            options: scale,
            defaultValue: value === null ? "" : float ? value.toFixed(1) : value.toString(),
        }
    }

    render() {
        return (
            <GeneralEditor
                fields={ [
                    this.makeField("dance_tech", "DT", genScale("?numbers", { max: 10, step: 0.5 }), true),
                    this.makeField("dance_figs", "DF", genScale("?numbers", { max: 10, step: 0.5 }), true),
                    this.makeField("impression", "I",  genScale("?numbers", { max: 10, step: 0.5 }), true),
                    this.makeField("mistakes",   "M",  genScale("numbers",  { max: 100 })),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}

FormationScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_FormationScore";
