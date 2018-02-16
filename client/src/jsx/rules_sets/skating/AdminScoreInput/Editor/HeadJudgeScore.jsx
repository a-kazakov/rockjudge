import GeneralEditor from "./GeneralEditor"
import genScale from "./genScale";

export default class HeadJudgeScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            score: PT.shape({
                data: PT.shape({
                    raw_data: PT.shape({
                        bonus: PT.number.isRequired,
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
            bonus: parseInt(data.bonus),
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
                    this.makeField("bonus", "B", genScale("?numbers", {min: -10, max: 10})),
                ] }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.handleSubmission }
            />
        );
    }
}
