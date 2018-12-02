import React from "react";

import PT from "prop-types";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import Api from "common/server/Api";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";

export default class Loader extends React.Component {
    static propTypes = {
        participant: PT.instanceOf(Model).isRequired,
        run: PT.instanceOf(Model).isRequired,
    };

    makeSelectorRef = (ref) => this._selector = ref;

    handleSubmission = (e) => {
        e.preventDefault();
        const program_id_str = this._selector.value;
        const program_id = program_id_str === ""
            ? null
            : Number(program_id_str);
        showConfirm(
            _("judging.confirms.load_program"),
            () => {
                Api("run/load_program", {
                    program_id: program_id,
                    run_id: this.props.run.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        );
    }

    renderSelector() {
        return (
            <select
                defaultValue=""
                ref={ this.makeSelectorRef }
            >
                <option value="">&mdash;</option>
                { this.props.participant.programs.map(program =>
                    <option key={ program.id }  value={ program.id }>
                        { program.name }
                    </option>
                ) }
            </select>
        );
    }
    render() {
        return (
            <form
                className="acro-loader pull-left"
                onSubmit={ this.handleSubmission }
            >
                { this.renderSelector() }
                <button
                    className="btn btn-primary btn-sm"
                    type="submit"
                >
                    { _("global.buttons.load") }
                </button>
            </form>
        );
    }
}
