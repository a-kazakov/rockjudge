export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            item: PT.shape({
                estimated_beginning: PT.string.isRequired,
                estimated_duration: PT.string.isRequired,
                tour_id: PT.number,
                verbose_name: PT.string.isRequired,
            }).isRequired,
            tours: PT.object.isRequired,
        };
    }

    makeRowRef = (ref) => {
        if (this._scrolled || !ref) {
            return;
        }
        this._scrolled = true;
        const tour_info = this.props.tours.get(this.props.item.tour_id);
        if (tour_info.tour.active) {
            ref.scrollIntoView();
        }
    }

    renderVerbose() {
        return (
            <tr>
                <td className="estimated-beginning">
                    { this.props.item.estimated_beginning }
                </td>
                <td className="verbose-name" colSpan="2">
                    { this.props.item.verbose_name }
                </td>
                <td className="estimated-duration">
                    { this.props.item.estimated_duration }
                </td>
            </tr>
        );
    }
    renderNormal() {
        if (this.props.item.tour_id === null) {
            return this.renderVerbose();
        }
        const { tour, discipline } = this.props.tours.get(this.props.item.tour_id);
        const class_name =
            tour.finalized ? "finalized" :
            tour.active ? "active" : "";
        return (
            <tr className={ class_name } ref={ this.makeRowRef }>
                <td className="estimated-beginning">
                    { this.props.item.estimated_beginning }
                </td>
                <td className="discipline">
                    { discipline.name }
                </td>
                <td className="tour">
                    { tour.name }
                </td>
                <td className="estimated-duration">
                    { this.props.item.estimated_duration }
                </td>
            </tr>
        );
    }
    render() {
        return this.props.item.verbose_name !== ""
            ? this.renderVerbose()
            : this.renderNormal();
    }
}

Item.displayName = "PresenterTablet_PlanPage_Item";
