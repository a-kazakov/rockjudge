import React from "react";

import _ from "l10n";
import PT from "prop-types";
import Row from "./Row";

export default class SportsmenList extends React.Component {
    static propTypes = {
        sportsmen: PT.arrayOf(PT.object).isRequired,
        onChange: PT.func.isRequired,
    };
    handleSportsmanAddition = () => {
        let list = this.props.sportsmen.slice(); // clone
        list.push({
            "last_name": "",
            "first_name": "",
            "year_of_birth": "0",
            "gender": "F",
            "substitute": false,
        });
        this.props.onChange(list);
    };
    handleSportsmanChange = (idx, value) => {
        let list = this.props.sportsmen.slice(); // clone
        list[idx] = value;
        this.props.onChange(list);
    };
    handleSportsmanDeletion = (idx) => {
        let list = this.props.sportsmen.slice(); // clone
        list.splice(idx, 1);
        this.props.onChange(list);
    };

    renderRow = (sportsman, idx) => {
        return (
            <Row
                idx={ idx }
                key={ idx }
                sportsman={ sportsman }
                onChange={ this.handleSportsmanChange }
                onDelete={ this.handleSportsmanDeletion }
            />
        );
    };
    render() {
        return (
            <div className="sportsmen">
                <label>
                    { _("models.participant.sportsmen") }
                </label>
                { this.props.sportsmen.map(this.renderRow) }
                <button
                    className="add"
                    type="button"
                    onClick={ this.handleSportsmanAddition }
                >
                    { _("global.buttons.add") }
                </button>
            </div>
        );
    }
}

