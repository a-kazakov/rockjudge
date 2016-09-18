import Tour from "./Tour";

export default class TourSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        name: PT.string.isRequired,
                        tours: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                            }).isRequired,
                        ),
                    }).isRequired,
                ),
            }).isRequired,
            value: PT.number,
            onChange: PT.func.isRequired,
        };
    }

    renderDiscipline(discipline) {
        return (
            <div className="discipline" key={ discipline.id }>
                <div className="name">
                    { discipline.name }
                </div>
                <div className="tours">
                    <div className="inner">
                        { discipline.tours.map(tour =>
                            <Tour
                                key={ tour.id }
                                selected={ this.props.value === tour.id }
                                tour={ tour }
                                onTourSelect={ this.props.onChange }
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="tour-selector">
                { this.props.competition.disciplines.map(discipline =>
                    this.renderDiscipline(discipline)
                )}
            </div>
        );
    }
}

TourSelector.displayName = "ScreenOperator_TourSelector";
