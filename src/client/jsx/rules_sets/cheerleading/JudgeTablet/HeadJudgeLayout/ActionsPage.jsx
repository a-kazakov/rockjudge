import { Api, React } from "HostModules";

import lastOf from "common/tools/lastOf";
import PT from "prop-types";
import _ from "l10n";

import onTouchOrClick from "tablet_ui/onTouchOrClick";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";

export default class ActionsPage extends React.Component {
    static propTypes = {
        tour: PT.object.isRequired,
    };

    stopTour = () => {
        showConfirm(_("tablet.confirms.stop_tour"), () => {
            if (this.props.tour) {
                Api("tour/stop", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        });
    };
    finalizeTour = () => {
        showConfirm(_("tablet.confirms.finalize_tour"), () => {
            if (this.props.tour) {
                Api("tour/finalize", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        });
    };
    stopTourAndStartNext = () => {
        showConfirm(_("tablet.confirms.stop_tour_and_start_next"), () => {
            if (this.props.tour) {
                let tour_id = this.props.tour.id;
                Api("tour/stop", { tour_id })
                    .onSuccess(() => {
                        Api("tour/start_next", { tour_id })
                            .onSuccess(closeDialog)
                            .send();
                    })
                    .send();
            }
        });
    };
    finalizeTourAndStartNext = () => {
        showConfirm(_("tablet.confirms.finalize_tour_and_start_next"), () => {
            if (this.props.tour) {
                let tour_id = this.props.tour.id;
                Api("tour/finalize", { tour_id })
                    .onSuccess(() => {
                        Api("tour/start_next", { tour_id })
                            .onSuccess(closeDialog)
                            .send();
                    })
                    .send();
            }
        });
    };


    /*
     * Returns true if there are unconfirmed scores in the latest heat.
     * Only works for tours with at least two heats. Otherwise, returns false.
     * Only judges scored the second to last heat are considered. This is needed to consider
     * the case when a judge is absent in that tour (e.g., extra tech judge roles were added).
     */
    hasUnconfirmedScores() {
        const runs = this.props.tour.runs;
        if (runs.length === 0) {
            return false;  // No runs at all, so no unconfirmed scores.
        }
        const latest_heat = lastOf(runs).heat;
        if (latest_heat === runs[0].heat) {
            return false;  // Only one heat, unable to determine who is judging.
        }
        const latest_runs = runs.filter(r => r.heat === latest_heat);
        const prev_runs = runs.filter(r => r.heat === latest_heat - 1);
        let scores = new Map();  // Map<discipline_judge_id, {latest: number, prev: number}>
        const process_run = (run, type) => {
            for (const score of run.scores) {
                const dj_id = score.discipline_judge_id;
                if (!scores.has(dj_id)) {
                    scores.set(dj_id, {
                        latest: 0,
                        prev: 0,
                    });
                }
                if (score.confirmed) {
                    ++scores.get(dj_id)[type];
                }
            }
        };
        for (const run of latest_runs) {
            process_run(run, "latest");
        }
        for (const run of prev_runs) {
            process_run(run, "prev");
        }
        for (const stats of scores.values()) {
            // If the judge scored anything in the second to last heat, but not everything
            // in the latest heat, then there are unconfirmed scores.
            if (stats.prev > 0 && stats.latest < latest_runs.length) {
                return true;
            }
        }
        return false;
    }

    renderWarning() {
        if (!this.hasUnconfirmedScores()) {
            return null;
        }
        return (
            <div className="warning">
                <div className="content">
                    {_("tablet.alerts.has_unconfirmed_scores")}
                </div>
            </div>
        );
    }
    renderButton(code, callback) {
        return (
            <button type="button" {...onTouchOrClick(callback)}>
                {_(`tablet.buttons.${code}`)}
            </button>
        );
    }
    render() {
        return (
            <div className="body actions">
                {this.renderWarning()}
                {this.renderButton("stop_tour", this.stopTour)}
                {this.renderButton("finalize_tour", this.finalizeTour)}
                {this.renderButton(
                    "stop_tour_and_start_next",
                    this.stopTourAndStartNext,
                )}
                {this.renderButton(
                    "finalize_tour_and_start_next",
                    this.finalizeTourAndStartNext,
                )}
            </div>
        );
    }
}
