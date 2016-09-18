import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            discipline: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
            onDisciplineChange: PT.func.isRequired,
        };
    }

    handleClick = () => {
        this.props.onDisciplineChange(this.props.discipline.id);
    }

    getClassName() {
        let result = "item";
        if (this.props.active) {
            result += " active";
        }
        return result;
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                { ...onTouchOrClick(this.handleClick) }
            >
                { this.props.discipline.name }
            </div>
        );
    }
}

Item.displayName = "PresenterTablet_ResultsPage_DisciplineSelector_Item";
