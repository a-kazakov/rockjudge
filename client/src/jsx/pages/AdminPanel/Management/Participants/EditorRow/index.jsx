import React from "react";

import makeClassName from "common/makeClassName";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";

import GeneralInfo from "./GeneralInfo";
import Programs from "./Programs";
import SportsmenList from "./SportsmenList";

export default class EditorRow extends React.Component {
    static propTypes = {
        context: PT.shape({
            competition: PT.instanceOf(Model).isRequired,
        }).isRequired,
        creating: PT.bool.isRequired,
        entry: PT.instanceOf(Model),
        formData: PT.shape({
            number: PT.string.isRequired,
            club_id: PT.string.isRequired,
            coaches: PT.string.isRequired,
            formation_name: PT.string.isRequired,
            sportsmen: PT.arrayOf(PT.object.isRequired).isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleSportsmenChange = (value) => this.props.onFieldChange("sportsmen", value);
    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit();
    };

    getClassName() {
        return makeClassName({
            "editor": true,
            "create": this.props.creating,
        });
    }
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="6">
                    <div className="col-15 wrapper">
                        <form onSubmit={ this.handleSubmission }>
                            <div className="col-10">
                                <GeneralInfo
                                    competition={ this.props.context.competition }
                                    formData={ this.props.formData }
                                    loading={ this.props.loading }
                                    onFieldChange={ this.props.onFieldChange }
                                />
                                <div className="buttons horizontal">
                                    <button type="submit">
                                        { _("global.buttons.submit") }
                                    </button>
                                    <button
                                        type="button"
                                        onClick={ this.props.onDiscard }
                                    >
                                        { _("global.buttons.discard") }
                                    </button>
                                </div>
                            </div>
                            <div className="col-14">
                                <SportsmenList
                                    sportsmen={ this.props.formData.sportsmen }
                                    onChange={ this.handleSportsmenChange }
                                />
                            </div>
                        </form>
                    </div>
                    <div className="col-9">
                        <Programs participant={ this.props.entry } />
                    </div>
                </td>
            </tr>
        );
    }
}
