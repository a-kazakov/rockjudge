import Item from "./Item";

export default class DisciplineSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplines: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                }).isRequired
            ).isRequired,
            value: PT.string,
            onDisciplineChange: PT.func.isRequired,
        };
    }

    render() {
        return (
            <div className="disciplines">
                { this.props.disciplines.map(discipline =>
                    <Item
                        active={ discipline.id === this.props.value }
                        discipline={ discipline }
                        key={ discipline.id }
                        onDisciplineChange={ this.props.onDisciplineChange }
                    />
                ) }
            </div>
        );
    }
}

DisciplineSelector.displayName = "PresenterTablet_ResultsPage_DisciplineSelector";
