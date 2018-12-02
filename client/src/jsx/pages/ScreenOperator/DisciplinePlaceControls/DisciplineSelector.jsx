import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";

export default class DisciplineSelector extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        value: PT.number,
        onChange: PT.func.isRequired,
    };

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
