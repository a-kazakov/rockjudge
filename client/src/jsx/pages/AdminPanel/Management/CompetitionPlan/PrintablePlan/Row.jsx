export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            item: PT.shape({
                id: PT.number.isRequired,
                estimated_beginning: PT.string.isRequired,
                estimated_duration: PT.string.isRequired,
                verbose_name: PT.string.isRequired,
                tour_id: PT.number,
            }).isRequired,
            tours: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                    discipline_name: PT.string.isRequired,
                    tour_name: PT.string.isRequired,
                }).isRequired
            ).isRequired,
        };
    }
    renderName() {
        if (this.props.item.verbose_name) {
            return (
                <td colSpan="2">
                    <p><strong>{ this.props.item.verbose_name }</strong></p>
                </td>
            );
        }
        const tour = this.props.tours.find(t => t.id === this.props.item.tour_id);
        if (!tour) {
            return (
                <td colSpan="2" />
            );
        }
        return [
            <td key="D">
                <p>{ tour.discipline_name }</p>
            </td>,
            <td className="text-center" key="T">
                <p>{ tour.tour_name }</p>
            </td>,
        ];
    }
    render() {
        return (
            <tr>
                <td>
                    <p className="text-center">
                        { this.props.item.estimated_beginning || <span>&nbsp;</span> }
                    </p>
                </td>
                { this.renderName() }
                <td>
                    <p className="text-center">
                        { this.props.item.estimated_duration || <span>&nbsp;</span> }
                    </p>
                </td>
            </tr>
        );
    }
}

Row.displayName = "AdminPanel_Management_CompetitionPlan_PrintablePlan_Row";
