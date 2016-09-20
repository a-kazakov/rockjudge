import GeneralScale from "JudgeTablet/GeneralScale";

export default class ScorePart extends React.Component {
    handleChange = (value) => {
        this.props.onScoreUpdate(this.props.code, value);
    }

    render() {
        const { header, value, scale, onScoreUpdate, ...other_props } = this.props;
        return (
            <GeneralScale
                readOnly={ this.props.readOnly }
                header={ header }
                scale={ scale }
                value={ value }
                onChange={ this.handleChange }
                { ...other_props }
            />
        );
    }
}
