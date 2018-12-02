import React from "react";

import _ from "l10n";
import PT from "prop-types";

export default class ElementRow extends React.Component {
    static propTypes = {
        element: PT.shape({
            description: PT.string.isRequired,
            score: PT.oneOfType([PT.number, PT.string]).isRequired,
        }).isRequired,
        idx: PT.number.isRequired,
        loading: PT.bool.isRequired,
        onChange: PT.func.isRequired,
        onDelete: PT.func.isRequired,
    };

    handleChange(field, value) {
        let new_element = Object.assign({}, this.props.element); // clone
        new_element[field] = value;
        this.props.onChange(this.props.idx, new_element);
    }
    handleDescriptionChange = (event) => this.handleChange("description", event.target.value);
    handleScoreChange       = (event) => this.handleChange("score",       event.target.value);
    handleDeletion = () => {
        this.props.onDelete(this.props.idx);
    };

    render() {
        return (
            <div className="acrobatic">
                <input
                    className="description"
                    disabled={ this.props.loading }
                    placeholder={ _("models.participant.acro_description") }
                    type="text"
                    value={ this.props.element.description }
                    onChange={ this.handleDescriptionChange }
                />
                <input
                    className="score"
                    disabled={ this.props.loading }
                    placeholder={ _("models.participant.acro_score") }
                    type="text"
                    value={ this.props.element.score }
                    onChange={ this.handleScoreChange }
                />
                <button
                    className="delete"
                    disabled={ this.props.loading }
                    type="button"
                    onClick={ this.handleDeletion }
                >
                    X
                </button>
            </div>
        );
    }
}

