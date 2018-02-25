import _ from "l10n";

import Row from "./Row";

export default class PrintablePlan extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                plan: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            tours: PT.arrayOf(PT.object.isRequired).isRequired,
        };
    }

    render() {
        return (
            <div className="print-only">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <p>{ _("models.competition_plan_item.estimated_beginning") }</p>
                            </th>
                            <th>
                                <p className="text-left">{ _("models.competition_plan_item.discipline") }</p>
                            </th>
                            <th>
                                <p>{ _("models.competition_plan_item.tour") }</p>
                            </th>
                            <th>
                                <p>{ _("models.competition_plan_item.estimated_duration") }</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.competition.plan.map(item =>
                            <Row
                                item={ item }
                                key={ item.id }
                                tours={ this.props.tours }
                            />
                        ) }
                    </tbody>
                </table>
            </div>
        );
    }
}
