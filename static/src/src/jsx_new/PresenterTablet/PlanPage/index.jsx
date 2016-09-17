import _ from "l10n";

import Item from "./Item";

export default class PlanPage extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        tours: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                            }).isRequired
                        ).isRequired,
                    }).isRequired
                ).isRequired,
                plan: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    getTours() {
        let result = new Map();
        for (const discipline of this.props.competition.disciplines) {
            for (const tour of discipline.tours) {
                result.set(tour.id, {
                    discipline: discipline,
                    tour: tour,
                });
            }
        }
        return result;
    }

    renderItems() {
        const tours = this.getTours();
        return this.props.competition.plan.map(item =>
            <Item
                item={ item }
                key={ item.id }
                tours={ tours }
            />
        )
    }
    render() {
        return (
            <div className="plan">
                <table><tbody>
                    <tr>
                        <th className="estimated-beginning">
                            { _("presenter.labels.estimated_beginning") }
                        </th>
                        <th className="discipline">
                            { _("presenter.labels.discipline") }
                        </th>
                        <th className="tour">
                            { _("presenter.labels.tour") }
                        </th>
                        <th className="estimated-duration">
                            { _("presenter.labels.estimated_duration") }
                        </th>
                    </tr>
                    { this.renderItems() }
                </tbody></table>
            </div>
        );
    }
}

PlanPage.displayName = "PresenterTablet_PlanPage";
