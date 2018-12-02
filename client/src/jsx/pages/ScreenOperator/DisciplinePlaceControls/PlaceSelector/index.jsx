import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import _ from "l10n";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import Renderer from "./Renderer";

export default class PlaceSelector extends React.Component {
    static propTypes = {
        discipline: PT.instanceOf(Model),
        value: PT.number,
        onChange: PT.func.isRequired,
    };

    handlePlaceReset = () => {
        this.props.onChange(null);
    };

    render() {
        if (this.props.disciplineId == null) {
            return null;
        }
        return (
            <div>
                <button
                    className="reset-button"
                    type="button"
                    { ...onTouchEndOrClick(this.handlePlaceReset) }
                >
                    { _("screen_operator.buttons.reset_place") }
                </button>
                <Renderer
                    discipline={ this.props.discipline }
                    key={ this.props.disciplineId }
                    value={ this.props.value }
                    onPositionSelect={ this.props.onChange }
                />
            </div>
        );
    }
}
