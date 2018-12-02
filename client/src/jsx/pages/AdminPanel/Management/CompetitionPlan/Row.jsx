import React from "react";

import makeClassName from "common/makeClassName";
import Model from "common/server/Storage/models/Model";
import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        context: PT.shape({
            errors: PT.instanceOf(Set).isRequired,
        }).isRequired,
        entry: PT.instanceOf(Model).isRequired,
        loading: PT.bool.isRequired,
        onDelete: PT.func.isRequired,
        onStartEditing: PT.func.isRequired,
    };

    getClassName() {
        return makeClassName({
            "viewer": true,
            "error": this.props.context.errors.has(this.props.entry.id),
        });
    }
    renderName() {
        if (this.props.entry.verbose_name) {
            return (
                <td colSpan="2">
                    <b>{ this.props.entry.verbose_name }</b>
                </td>
            );
        }
        const tour = this.props.entry.tour;
        if (!tour) {
            return (
                <td colSpan="2" />
            );
        }
        return [
            <td key="D">
                { tour.discipline.name }
            </td>,
            <td key="T">
                { tour.name }
            </td>,
        ];
    }
    render() {
        return (
            <tr
                className={ this.getClassName() }
                onClick={ this.props.onStartEditing }
            >
                <td className="sp">
                    { this.props.entry.sp }
                </td>
                { this.renderName() }
                <td className="estimated_beginning">
                    { this.props.entry.estimated_beginning }
                </td>
                <td className="estimated_duration">
                    { this.props.entry.estimated_duration }
                </td>
                <td className="delete">
                    <button onClick={ this.props.onDelete }>
                        X
                    </button>
                </td>
            </tr>
        );
    }
}

