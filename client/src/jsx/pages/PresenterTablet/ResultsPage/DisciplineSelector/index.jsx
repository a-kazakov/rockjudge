import React from "react";

import PT from "prop-types";
import Item from "./Item";

export default class DisciplineSelector extends React.Component {
    static propTypes = {
        competition: PT.object.isRequired,
        value: PT.number,
        onDisciplineChange: PT.func.isRequired,
    };

    render() {
        return (
            <div className="disciplines">
                { this.props.competition.disciplines.map(discipline =>
                    <Item
                        active={ discipline.id === this.props.value }
                        discipline={ discipline }
                        key={ discipline.id }
                        onDisciplineChange={ this.props.onDisciplineChange }
                    />
                ) }
            </div>
        );
    }
}
