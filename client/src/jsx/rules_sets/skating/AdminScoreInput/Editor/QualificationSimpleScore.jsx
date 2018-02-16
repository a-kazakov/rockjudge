import GeneralEditor from "./GeneralEditor"
import genScale from "../../../rosfarr/AdminScoreInput/Editor/genScale";

export default class QualificationSimpleScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        cross: PT.bool,
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
            cross: data.cross === "" ? null : (data.cross === "true"),
            note_number: data.note_number === "" ? null : parseInt(data.note_number),
        });
    };

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
                    this.makeField("cross", "X", [
                        ["", "?"],
                        ["true", "X"],
                        ["false", "—"],
                    ]),
                    this.makeField("note_number", "N", genScale("?numbers", { min: 1, max: 5 })),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}
