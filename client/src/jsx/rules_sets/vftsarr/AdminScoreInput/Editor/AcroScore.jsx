import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class DanceScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
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
            a1: data["a1"] === "" ? null : parseInt(data.a1),
            a2: data["a2"] === "" ? null : parseInt(data.a2),
            a3: data["a3"] === "" ? null : parseInt(data.a3),
            a4: data["a4"] === "" ? null : parseInt(data.a4),
            a5: data["a5"] === "" ? null : parseInt(data.a5),
            a6: data["a6"] === "" ? null : parseInt(data.a6),
            mistakes: parseInt(data.mistakes),
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
                    this.makeField("a1", "A1", genScale("?reduction")),
                    this.makeField("a2", "A2", genScale("?reduction")),
                    this.makeField("a3", "A3", genScale("?reduction")),
                    this.makeField("a4", "A4", genScale("?reduction")),
                    this.makeField("a5", "A5", genScale("?reduction")),
                    this.makeField("a6", "A6", genScale("?reduction")),
                    this.makeField("mistakes", "FD", genScale("numbers",  { max: 100 })),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}

