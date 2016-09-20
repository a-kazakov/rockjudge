import _ from "l10n";

import onTouchOrClick from "tablet_ui/onTouchOrClick";
import showConfirm from "common/dialogs/showConfirm"; // FIXME

import { Api } from "HostModules";

export default class ActionsPage extends React.Component {
    stopTour = () => {
        showConfirm(_("tablet.confirms.stop_tour"), () => {
            if (this.props.tour) {
                Api("tour.stop", { tour_id: this.props.tour.id }).onSuccess(() => swal.close()).send();
            }
        });
    }
    finalizeTour = () => {
        showConfirm(_("tablet.confirms.finalize_tour"), () => {
            if (this.props.tour) {
                Api("tour.finalize", { tour_id: this.props.tour.id }).onSuccess(() => swal.close()).send();
            }
        });
    }
    stopTourAndStartNext = () => {
        showConfirm(_("tablet.confirms.stop_tour_and_start_next"), () => {
            if (this.props.tour) {
                let tour_id = this.props.tour.id;
                Api("tour.stop", { tour_id }).onSuccess(() => {
                    Api("tour.start_next_after", { tour_id }).onSuccess(() => swal.close()).send();
                }).send();
            }
        });
    }
    finalizeTourAndStartNext = () => {
        showConfirm(_("tablet.confirms.finalize_tour_and_start_next"), () => {
            if (this.props.tour) {
                let tour_id = this.props.tour.id;
                Api("tour.finalize", { tour_id }).onSuccess(() => {
                    Api("tour.start_next_after", { tour_id }).onSuccess(() => swal.close()).send();
                }).send();
            }
        });
    }
    hasUnconfirmedScores() {
        const runs = this.props.tour.runs;
        const latest_heat = runs[runs.length - 1].heat;
        if (latest_heat === runs[0].heat) {
            return false
        }
        const latest_runs = runs.filter(r => r.heat === latest_heat);
        const prev_runs = runs.filter(r => r.heat === latest_heat - 1);
        let scores = new Map();
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
                    { _("tablet.alerts.has_unconfirmed_scores") }
                </div>
            </div>
        );
    }
    renderButton(code, callback) {
        return (
            <button
                type="button"
                { ...onTouchOrClick(callback) }
            >
                { _(`tablet.buttons.${code}`) }
            </button>
        );
    }
    render() {
        return (
            <div className="body actions">
                { this.renderWarning() }
                { this.renderButton("stop_tour", this.stopTour) }
                { this.renderButton("finalize_tour", this.finalizeTour) }
                { this.renderButton("stop_tour_and_start_next", this.stopTourAndStartNext) }
                { this.renderButton("finalize_tour_and_start_next", this.finalizeTourAndStartNext) }
            </div>
        );
    }
}
