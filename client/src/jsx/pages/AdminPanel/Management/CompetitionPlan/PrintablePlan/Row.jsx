import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        item: PT.instanceOf(Model).isRequired,
    };

    renderName() {
        if (this.props.item.verbose_name) {
            return (
                <td colSpan="2">
                    <p>
                        <strong>{this.props.item.verbose_name}</strong>
                    </p>
                </td>
            );
        }
        const tour = this.props.item.tour;
        if (!tour) {
            return <td colSpan="2" />;
        }
        return [
            <td key="D">
                <p>{tour.discipline.name}</p>
            </td>,
            <td className="text-center" key="T">
                <p>{tour.name}</p>
            </td>,
        ];
    }
    render() {
        return (
            <tr>
                <td>
                    <p className="text-center">
                        {this.props.item.estimated_beginning || <span>&nbsp;</span>}
                    </p>
                </td>
                {this.renderName()}
                <td>
                    <p className="text-center">
                        {this.props.item.estimated_duration || <span>&nbsp;</span>}
                    </p>
                </td>
            </tr>
        );
    }
}
