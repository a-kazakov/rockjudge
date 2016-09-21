import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class FormationScore extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        acrobatics:     PT.number,
                        dance_tech:     PT.number,
                        dance_figs:     PT.number,
                        impression:     PT.number,
                        small_mistakes: PT.number,
                        big_mistakes:   PT.number,
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
            acrobatics:     data["acrobatics"] === "" ? null : parseFloat(data.acrobatics),
            dance_tech:     data["dance_tech"] === "" ? null : parseFloat(data.dance_tech),
            dance_figs:     data["dance_figs"] === "" ? null : parseFloat(data.dance_figs),
            impression:     data["impression"] === "" ? null : parseFloat(data.impression),
            big_mistakes:   parseInt(data.big_mistakes),
            small_mistakes: parseInt(data.small_mistakes),
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
                    this.makeField("acrobatics",     "A",  genScale("?numbers", { max: 10, step: 0.5 })),
                    this.makeField("dance_tech",     "DT", genScale("?numbers", { max: 10, step: 0.5 })),
                    this.makeField("dance_figs",     "DF", genScale("?numbers", { max: 10, step: 0.5 })),
                    this.makeField("impression",     "I",  genScale("?numbers", { max: 10, step: 0.5 })),
                    this.makeField("small_mistakes", "SM", genScale("numbers",  { max: 100 })),
                    this.makeField("big_mistakes",   "BM", genScale("numbers",  { max: 100 })),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}

FormationScore.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_FormationScore";