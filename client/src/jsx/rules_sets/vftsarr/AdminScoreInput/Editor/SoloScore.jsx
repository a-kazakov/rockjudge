import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class SoloScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        fw:             PT.number,
                        dance_figs:     PT.number,
                        composition:    PT.number,
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
            fw:             data["fw"]          === "" ? null : parseInt(data.fw),
            dance_figs:     data["dance_figs"]  === "" ? null : parseFloat(data.dance_figs),
            composition:    data["composition"] === "" ? null : parseFloat(data.composition),
            small_mistakes: parseInt(data.small_mistakes),
            big_mistakes:   parseInt(data.big_mistakes),
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
                    this.makeField("fw",             "FW", genScale("?reduction")),
                    this.makeField("dance_figs",     "DF", genScale("?numbers", { max: 10, step: 0.5 }), true),
                    this.makeField("composition",    "C",  genScale("?numbers", { max: 10, step: 0.5 }), true),
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

