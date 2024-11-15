import React from "react";

import PT from "prop-types";
import _ from "l10n";

import Api from "common/server/Api";

export default class StatusCell extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        run: PT.shape({
            id: PT.number.isRequired,
            status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
        }).isRequired,
    };

    changeStatus(new_status) {
        if (this.props.readOnly) {
            return;
        }
        Api("model/update", {
            model_name: "Run",
            model_id: this.props.run.id,
            data: {
                status: new_status,
            },
        }).send();
    }

    handleSetStatusOK = () => this.changeStatus("OK");
    handleSetStatusNP = () => this.changeStatus("NP");
    handleSetStatusDQ = () => this.changeStatus("DQ");

    render() {
        return (
            <td className="status">
                <div className="status-controls">
                    <input
                        checked={this.props.run.status === "OK"}
                        className="status-ok"
                        title={_("global.statuses.OK")}
                        type="radio"
                        onChange={this.handleSetStatusOK}
                    />
                    <input
                        checked={this.props.run.status === "NP"}
                        className="status-np"
                        title={_("global.statuses.NP")}
                        type="radio"
                        onChange={this.handleSetStatusNP}
                    />
                    <input
                        checked={this.props.run.status === "DQ"}
                        className="status-dq"
                        title={_("global.statuses.DQ")}
                        type="radio"
                        onChange={this.handleSetStatusDQ}
                    />
                </div>
            </td>
        );
    }
}
