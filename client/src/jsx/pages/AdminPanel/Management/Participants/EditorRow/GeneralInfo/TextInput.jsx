export default class TextInput extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            mkey: PT.string.isRequired,
            onChange: PT.func.isRequired,
        };
    }
    handleChange = (e) => {
        this.props.onChange(this.props.mkey, e.target.value);
    }
    render() {
        const { mkey, onChange, ...props } = this.props; // eslint-disable-line no-unused-vars
        return (
            <input
                className="full-width"
                onChange={ this.handleChange }
                { ...props }
            />
        );
    }
}

TextInput.displayName = "AdminPanel_Management_Participants_EditorRow_GeneralInfo_TextInput";
