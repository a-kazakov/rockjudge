import { React } from "HostModules";

import lastOf from "common/tools/lastOf";
import _ from "l10n";
import PT from "prop-types";
import getParticipantDisplay from "common/getParticipantDisplay";

const PENALTIES = [
    "time_penalty",
    "music_violated",
    "entry_exit_violated",
    "dress_violated",
    "cheer_block_violated",
    "accessories_violated",
    "complexity_violations",
    "other_penalties",
];

export default class InfoCell extends React.Component {
    static propTypes = {
        row: PT.shape({
            run: PT.object.isRequired,
            run_result: PT.object.isRequired,
            scores: PT.object.isRequired,
        }).isRequired,
        tour: PT.object.isRequired,
    };

    renderParticipantInfo() {
        return (
            <>
                <p style={{ fontWeight: "bold" }}>
                    {_(
                        "global.phrases.participant_n",
                        this.props.row.run.participant.number,
                        null,
                        this.props.row.run.participant.sportsmen.length,
                    )}
                </p>
                {getParticipantDisplay(this.props.row.run.participant)}
            </>
        );
    }
    renderPenalty() {
        const {
            status,
            penalty,
            accumulated_penalties: acc,
        } = this.props.row.run_result.extra_data;
        if (status !== "OK") {
            return null;
        }
        const explanation = PENALTIES.filter(p => acc[p] !== 0).map(p => {
            const label = _(`score_parts.components.medium.${p}`);
            return (
                <p
                    key={p}
                    style={{ marginLeft: "10pt", fontStyle: "italic" }}
                >{`- ${label} (${acc[p]})`}</p>
            );
        });
        return (
            <>
                <p>
                    <strong>{`${_("results.labels.penalty")}: `}</strong>
                    {penalty}
                </p>
                {explanation}
            </>
        );
    }
    renderTotalScore() {
        if (this.props.row.run_result.extra_data.status !== "OK") {
            return null;
        }
        return (
            <p style={{ fontWeight: "bold" }}>
                {`${_("results.labels.total_score")}: ${
                    this.props.row.run_result.total_score_str
                }`}
            </p>
        );
    }
    renderNotPerformedLabel() {
        if (this.props.row.run_result.extra_data.status !== "NP") {
            return null;
        }
        return (
            <p style={{ fontStyle: "italic" }}>{_("results.labels.not_performed")}</p>
        );
    }
    renderDisqualifiedLabel() {
        if (this.props.row.run_result.extra_data.status !== "DQ") {
            return null;
        }
        return (
            <p style={{ fontStyle: "italic" }}>{_("results.labels.disqualified")}</p>
        );
    }
    renderNextTourLabel() {
        const all_tours = this.props.row.run.tour.discipline.tours;
        const has_next_tour = lastOf(all_tours).id !== this.props.row.run.tour_id;
        if (!has_next_tour) {
            return null;
        }
        return (
            <p>
                <strong>{`${_("results.labels.next_tour")}: `}</strong>
                {this.props.row.run_result.advanced
                    ? _("global.labels.yes")
                    : _("global.labels.no")}
            </p>
        );
    }
    render() {
        return (
            <td className="info-block">
                {this.renderParticipantInfo()}
                {this.renderPenalty()}
                {this.renderTotalScore()}
                {this.renderNotPerformedLabel()}
                {this.renderDisqualifiedLabel()}
                {this.renderNextTourLabel()}
            </td>
        );
    }
}
