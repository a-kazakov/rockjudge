import _ from "l10n";

export default class AddButton extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            afterId: PT.number,
            onClick: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onClick(this.props.afterId);
    }

    render() {
        return (
            <button
                className="add-tour-button"
                type="button"
                onClick={ this.handleClick }
            >
                { _("admin.buttons.add_tour") }
            </button>
        );
    }
}

AddButton.displayName = "AdminPanel_Management_Tours_AddButton";
