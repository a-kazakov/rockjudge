export default class DisciplineSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        name: PT.string.isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            value: PT.number,
            onChange: PT.func.isRequired,
        };
    }

    handleChange = (event) => {
        this.props.onChange(event.target.value === "" ? null : Number(event.target.value));
    }

    render() {
        return (
            <select
                className="form-control"
                value={ this.props.value || "" }
                onChange={ this.handleChange }
            >
                <option value="">----------</option>
                { this.props.competition.disciplines.map(discipline =>
                    <option key={ discipline.id } value={ discipline.id }>
                        { discipline.name }
                    </option>
                ) }
            </select>
        );
    }
}

DisciplineSelector.displayName = "ScreenOperator_DisciplinePlaceControls_DisciplineSelector";
