export default class Button extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            text: PT.string.isRequired,
            onClick: PT.func.isRequired,
        };
    }

    handleClick = (event) => {
        event.stopPropagation();
        this.props.onClick();
    }

    render() {
        return (
            <button
                className="button"
                onClick={ this.handleClick }
            >
                { this.props.text }
            </button>
        );
    }
}

Button.displayName = "pages_AdminPanel_Judging_TourPanel_ScoresTab_Row_ActionsCell_Button";
