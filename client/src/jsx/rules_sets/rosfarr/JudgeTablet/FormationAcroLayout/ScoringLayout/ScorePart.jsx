import GeneralScale from "JudgeTablet/GeneralScale";

export default class ScorePart extends React.Component {
    onChange = (value) => {
        this.props.onScoreUpdate(this.props.code, value);
    }
    render() {
        const { header, value, scale, onScoreUpdate, ...other_props } = this.props;
        return (
            <GeneralScale
                header={ header }
                value={ value }
                scale={ scale }
                onChange={ this.onChange }
                {...other_props}
            />
        );
    }
}
