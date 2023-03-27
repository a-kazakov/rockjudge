import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Api from "common/server/Api";

import showInput from "common/dialogs/showInput";
import showSuccess from "common/dialogs/showSuccess";

export default class Unfinalize extends React.Component {
    static propTypes = {
        competition: PT.shape({
            disciplines: PT.arrayOf(
                PT.shape({
                    name: PT.string.isRequired,
                    tours: PT.arrayOf(
                        PT.shape({
                            id: PT.number.isRequired,
                            finalized: PT.bool.isRequired,
                            name: PT.string.isRequired,
                        }).isRequired,
                    ).isRequired,
                }).isRequired,
            ).isRequired,
        }).isRequired,
    };

    makeSelectRef = ref => (this._select = ref);

    handleFormSubmit = event => {
        event.preventDefault();
        showInput(
            _("admin.headers.unfinalize_tour"),
            _("admin.confirms.unfinalize_tour"),
            result => {
                if (result.dismiss) {
                    return;
                }
                Api("tour/unfinalize", {
                    tour_id: Number(this._select.value),
                })
                    .onSuccess(() => {
                        showSuccess(_("global.messages.success"));
                    })
                    .send();
            },
            value => {
                return new Promise((resolve, reject) => {
                    if (localStorage.getItem("developer") === "true") {
                        return resolve();
                    }
                    if (value !== "unfinalize") {
                        return reject(_("admin.messages.invalid_passcode"));
                    }
                    resolve();
                });
            },
        );
    };

    render() {
        let eligible_tours = [];
        for (const discipline of this.props.competition.disciplines) {
            for (let idx = discipline.tours.length - 1; idx >= 0; --idx) {
                const tour = discipline.tours[idx];
                if (tour.finalized) {
                    eligible_tours.push(
                        <option key={tour.id} value={tour.id}>
                            {`${discipline.name} — ${tour.name}`}
                        </option>,
                    );
                    break;
                }
            }
        }
        if (eligible_tours.length === 0) {
            return (
                <div className="unfinalize-warning">
                    {_("admin.alerts.no_finalized")}
                </div>
            );
        }
        return (
            <div>
                <div className="unfinalize-warning">
                    {_("admin.alerts.unfinalize_warning")}
                </div>
                <form className="unfinalization" onSubmit={this.handleFormSubmit}>
                    <select ref={this.makeSelectRef}>{eligible_tours}</select>
                    <button type="submit">{_("admin.buttons.unfinalize")}</button>
                </form>
            </div>
        );
    }
}
