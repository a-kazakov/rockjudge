export default class Button extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            className: PT.string,
            label: PT.string.isRequired,
            signalMessage: PT.any.isRequired,
            onSignal: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            className: "",
        };
    }

    handleClick = () => {
        this.props.onSignal(this.props.signalMessage);
    }

    render() {
        return (
            <button
                className={ this.props.className }
                onClick={ this.handleClick }
            >
                { this.props.label }
            </button>
        );
    }
}

Button.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Buttons_Button";
