import GeneralScale from "JudgeTablet/GeneralScale";

export default class ScorePart extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            code: PT.string.isRequired,
            header: PT.string.isRequired,
            scale: PT.string.isRequired,
            value: PT.string.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleChange = (value) => {
        this.props.onScoreUpdate(this.props.code, value);
    }

    render() {
        const { header, value, scale, onScoreUpdate, ...other_props } = this.props; // eslint-disable-line no-unused-vars
        return (
            <GeneralScale
                header={ header }
                scale={ scale }
                value={ value }
                onChange={ this.handleChange }
                { ...other_props }
            />
        );
    }
}
