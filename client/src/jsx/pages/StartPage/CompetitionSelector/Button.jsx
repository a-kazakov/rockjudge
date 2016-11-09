export default class Button extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionInfo: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
            onSelect: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onSelect(this.props.competitionInfo.id);
    }

    render() {
        return (
            <div
                className="button"
                onClick={ this.handleClick }
            >
                { this.props.competitionInfo.name }
            </div>
        );
    }
}

Button.displayName = "StartPage_CompetitionSelector_Button";
