import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import Row from "./Row";

export default class PrintablePlan extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    renderRow = item => {
        return <Row item={item} key={item.id} />;
    };
    render() {
        return (
            <div className="print-only">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <p>
                                    {_(
                                        "models.competition_plan_item.estimated_beginning",
                                    )}
                                </p>
                            </th>
                            <th>
                                <p className="text-left">
                                    {_("models.competition_plan_item.discipline")}
                                </p>
                            </th>
                            <th>
                                <p>{_("models.competition_plan_item.tour")}</p>
                            </th>
                            <th>
                                <p>
                                    {_(
                                        "models.competition_plan_item.estimated_duration",
                                    )}
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.props.competition.plan.map(this.renderRow)}</tbody>
                </table>
            </div>
        );
    }
}
