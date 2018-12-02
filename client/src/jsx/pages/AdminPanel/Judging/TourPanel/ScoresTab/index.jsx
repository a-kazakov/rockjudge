import React from "react";

import closeDialog from "common/dialogs/closeDialog";
import showConfirm from "common/dialogs/showConfirm";
import Api from "common/server/Api";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import JudgeHeaderCell from "./JudgeHeaderCell";
import Row from "./Row";

export default class ScoresTab extends React.Component {
    static propTypes = {
        tour: PT.instanceOf(Model).isRequired,
        onPageSwitch: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            nowEditing: {},
        };
    }

    // Listeners

    initTour() {
        showConfirm(
            _("judging.confirms.init_tour"),
            () => {
                Api("tour/init", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        );
    }
    finalizeTour() {
        showConfirm(
            _("judging.confirms.finalize_tour"),
            () => {
                Api("tour/finalize", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(() => {
                        closeDialog();
                        this.props.onPageSwitch("results-1");
                    })
                    .send();
            }
        );
    }
    shuffleHeats() {
        showConfirm(
            _("judging.confirms.shuffle_heats"),
            () => {
                Api("tour/shuffle_heats", {
                    tour_id: this.props.tour.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        );
    }
    startTour() {
        Api("tour/start", {
            tour_id: this.props.tour.id,
        })
            .send();
    }
    stopTour() {
        Api("tour/stop", {
            tour_id: this.props.tour.id,
        })
            .send();
    }

    handleSignal = (message) => {
        switch (message) {
        case "init_tour":     return this.initTour();
        case "finalize_tour": return this.finalizeTour();
        case "shuffle_heats": return this.shuffleHeats();
        case "start_tour":    return this.startTour();
        case "stop_tour":     return this.stopTour();
        default:
            console.error("Unknown signal received:", message);
        }
    };
    handleEditRequest = (info) => {
        this.setState({
            nowEditing: info,
        });
    };
    handleStopEditing = () => {
        this.setState({
            nowEditing: {},
        });
    };
    handlePositionMove = (heat, old_pos, new_pos) => {
        const heat_runs = this.props.tour.runs.filter(r => r.heat === heat);
        const old_ids = heat_runs.map(r => r.id)
        const new_ids = old_pos <= new_pos
            ? [].concat(
                old_ids.slice(0, old_pos),
                old_ids.slice(old_pos + 1, new_pos + 1),
                [old_ids[old_pos]],
                old_ids.slice(new_pos + 1)
            )
            : [].concat(
                old_ids.slice(0, new_pos),
                [old_ids[old_pos]],
                old_ids.slice(new_pos, old_pos),
                old_ids.slice(old_pos + 1)
            );
        Api("tour/permute_heat", {
            "tour_id": this.props.tour.id,
            "run_ids": new_ids,
        })
            .send();
    };

    // Rendering

    renderTableHeaderCell(code) {
        return (
            <th className={ code }>
                { _(`judging.labels.${code}`) }
            </th>
        );
    }
    renderRuns() {
        const runs = this.props.tour.runs;
        let heat_positions = runs.map(() => 0);
        let heat_sizes = runs.map(() => 0);
        for (let i = 1; i < runs.length; ++i) {
            heat_positions[i] = runs[i].heat === runs[i - 1].heat
                ? heat_positions[i - 1] + 1
                : 0;
        }
        for (let i = runs.length - 1; i >= 0; --i) {
            heat_sizes[i] = i === runs.length - 1 || heat_positions[i + 1] <= heat_positions[i]
                ? heat_positions[i] + 1
                : heat_sizes[i + 1];
        }
        let result = [];
        for (let i = 0; i < runs.length; ++i) {
            result.push(
                <Row
                    heatPosition={ heat_positions[i] }
                    heatSize={ heat_sizes[i] }
                    key={ runs[i].id }
                    nowEditing={ this.state.nowEditing }
                    readOnly={ this.props.tour.finalized }
                    run={ runs[i] }
                    onEditRequest={ this.handleEditRequest }
                    onPositionMove={ this.handlePositionMove }
                    onStopEditing={ this.handleStopEditing }
                />
            );
        }
        return result;
    }
    render() {
        const discipline_judges = this.props.tour.discipline.discipline_judges;
        return (
            <div className="ScoresTab">
                <table className="scores-table">
                    <tbody>
                        <tr>
                            { this.renderTableHeaderCell("heat") }
                            { this.renderTableHeaderCell("number") }
                            { this.renderTableHeaderCell("participant_name") }
                            { this.renderTableHeaderCell("acrobatics") }
                            { this.renderTableHeaderCell("status") }
                            { this.renderTableHeaderCell("total_score") }
                            { discipline_judges.map(discipline_judge =>
                                <JudgeHeaderCell
                                    disciplineJudge={ discipline_judge }
                                    key={ discipline_judge.id }
                                    opened={
                                        this.state.nowEditing.type === "judge_actions" &&
                                        this.state.nowEditing.discipline_judge_id === discipline_judge.id
                                    }
                                    tour={ this.props.tour }
                                    onEditRequest={ this.handleEditRequest }
                                    onStopEditing={ this.handleStopEditing }
                                />
                            ) }
                            { this.props.tour.finalized
                                ? null
                                : this.renderTableHeaderCell("actions") }
                        </tr>
                        { this.renderRuns() }
                    </tbody>
                </table>
            </div>
        );
    }
}

